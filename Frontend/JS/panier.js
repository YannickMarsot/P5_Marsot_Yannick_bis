//REGEX

function validatefirstName() {
  //fonction pour valider le prenom saisi
  let text = document.getElementById("text_prenom");
  if (/^([A-Za-z]{2,20})+$/.test(text.value)) {
    return true;
  }
  alert("le prenom saisi n'est pas valide");
  return false;
}

function validateLastName() {
  //fonction pour valider le nom saisi
  let text = document.getElementById("text_nom");
  if (/^([A-Za-z]{2,20})+$/.test(text.value)) {
    return true;
  }
  alert("le nom saisi n'est pas valide");
  return false;
}

function validateCity() {
  //fonction pour valider la ville saisi
  let text = document.getElementById("City");
  if (/^([a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\'])+$/.test(text.value)) {
    return true;
  }
  alert("la ville saisi n'est pas valide");
  return false;
}

function validateAdress() {
  //fonction pour valider l'adresse saisi
  let adress = document.getElementById("adress");
  if (/^\w+([A-Za-z0-9'\.\-\s\,]{5,50})+$/.test(adress.value)) {
    return true;
  }
  alert("l'adresse n'est pas valide");
  return false;
}

function validateEmail() {
  //fonction pour valider l'e-mail saisi
  let mail = document.getElementById("e-mail");
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return true;
  }
  alert("l'email n'est pas valide");
  return false;
}

function getLocalStorage() {
  const getProduct = JSON.parse(localStorage.getItem("cameras"));
  if (getProduct) {
    return getProduct;
  } else {
    return false;
  }
}
const elementObjet = JSON.parse(localStorage.getItem("cameras"));
//avec JSON.parse on transforme un element JSON en objet javascript!!!
function writeCart() {
  //fonction qui affiche le panier
  if (elementObjet === null) {
    //affichage panier vide:
    document.querySelector("#petitContainerAffichagePanier").innerHTML = `
            <p>Pour l'instant vôtre panier est vide</p>
        `;
  } else {
    //affichage panier rempli:
    elementObjet.forEach((element) => {
      const indexProduct = elementObjet.indexOf(element);
      console.log("indexProduct", indexProduct);
      let total = element.qte * element.price;
      document.querySelector("#affPanier").innerHTML += `
        <tr>
          <th scope="row">${indexProduct + 1}</th>
          <td>${element.id}</td>
          <td>${element.size}</td>
          <td class="align-middle productQuantity">
            <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}" onclick="delProduct(event)">
              <span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span>
            </button>
            <span class="mx-0 mx-lg-3 index"> ${element.qte}</span>
            <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}" onclick="addProduct(event)">
              <span class="fas fa-plus-square text-success" data-index="${indexProduct}"></span>
            </button>
          </td>
          <td>${total}</td>
        </tr>
        `;
    });
  }
}

//fonction pour ajouter un produit depuis le panier
function addProduct(event) {
  const index = event.target.getAttribute("data-index");
  elementObjet[index].qte++;
  localStorage.setItem("cameras", JSON.stringify(elementObjet));
  location.reload();
}

//fonction pour supprimer un produit depuis le panier
function delProduct(event) {
  const index = event.target.getAttribute("data-index");
  if (elementObjet[index].qte > 1) {
    elementObjet[index].qte--;
  } else {
    elementObjet.splice(index, 1);
  }
  localStorage.setItem("cameras", JSON.stringify(elementObjet));
  location.reload();
}

// calcul du total
const cart = JSON.parse(localStorage.getItem("cameras")) || [];
function displayTotalCart() {
  let totalCart = 0;
  cart.forEach((cameras) => {
    totalCart = totalCart + cameras.price * cameras.qte;
  });
  return totalCart;
}

function writeTotalCart() {
  //fonction pour afficher le total du panier
  totalCart = displayTotalCart();
  console.log(totalCart);
  document.querySelector("#display_total_here").innerHTML = `${totalCart}`;
}

writeTotalCart();
writeCart();

//envoyer les données à l'api

function sendContact() {
  let firstName = document.getElementById("text_prenom").value;
  let lastName = document.getElementById("text_nom").value;
  let city = document.getElementById("City").value;
  let address = document.getElementById("adress").value;
  let email = document.getElementById("e-mail").value;
  let contact = {
    firstName,
    lastName,
    city,
    address,
    email,
  };
  const produits = getLocalStorage();
  let products = [];
  produits.forEach((element) => products.push(element.id));
  const data = {
    contact,
    products,
  };
  //utilisation de la methode "POST" afin d'envoyer les données à l'api
  fetch("http://127.0.0.1:3000/api/cameras/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.orderId);
      const orderId = res.orderId;
      window.location = "confirmation.html?order=" + orderId;
    });
}
