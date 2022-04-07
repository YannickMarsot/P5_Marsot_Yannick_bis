function getParameter(parameterName) {
  //fonction pour récupérer le paramétre d'une URL
  let parameter = new URLSearchParams(window.location.search);
  return parameter.get(parameterName);
}

function getArticleById() {
  //fonction pour afficher l'article souhaiter avec le parametre URL
  const id = getParameter("id");

  fetch("http://localhost:3000/api/cameras/" + id)
    .then((res) => res.json())
    .then((res) => {
      writeProduct(res);
    });
}

function writeProduct(product) {
  //fonction pour afficher le produit
  document.querySelector(".list-product").innerHTML = `
      <div class="col-4 mx-auto grandConteneur" id="${product._id}">
        <div class="image">
          <img src="${product.imageUrl}">
        </div>
        <div class="lensesConteneur">
          <label for="lenses">Choisissé vôtre lentille</label>
            <select name="Lenses" id="lensesSelect" onChange="select_lenses();">  
            <option value="0" selected="selected" disabled>selectionné une option</option>        
            </select>
        </div>
        <div class="quantityConteneur">
          <label for="quantity">Selectionné la quantitée</label>
            <select id="quantity" onchange="select_quantity();">
              <option value="0"selected="selected" disabled>selectionné une option</option>
              <option value="1" class="quantity_choices">1</option>
              <option value="2" class="quantity_choices">2</option>
              <option value="3" class="quantity_choices">3</option>
              <option value="4" class="quantity_choices">4</option>
              <option value="5" class="quantity_choices">5</option>
          </select>
        </div>
        <div class="petitConteneur">
          <p class="name">${product.name}</p>
          <p class="price">${product.price}</p>
          <p class="description">${product.description}</p>
          <button id="addToCart-btn" href="#" onclick="addToCart();">
          Ajouter au panier
          </button>  
        </div>
      </div>
        `;

  product.lenses.forEach(function (item) {
    //dropdown menu
    document.querySelector(
      "#lensesSelect"
    ).innerHTML += `<option value="${item}" class="quantity_choices">${item}</option>`;
  });
}

//ajout au panier
const cart = JSON.parse(localStorage.getItem("cameras")) || [];

//fonction dajout au panier
function addToCart() {
  let id_product = document.getElementsByClassName("grandConteneur"); //id dans "grand conteneur"
  let price_product = document.getElementsByClassName("price");
  let quantity = document.getElementById("quantity");
  let value_quantity = quantity.options[quantity.selectedIndex].value;
  let lenses_selected = document.getElementById("lensesSelect");
  let sizelenses_selected =
    lenses_selected.options[lenses_selected.selectedIndex].value;
  let selected_product = {
    id: id_product[0].id,
    size: sizelenses_selected,
    price: price_product[0].innerText,
    qte: value_quantity,
  };

  if (cart.length < 1) {
    cart.push(selected_product);
    localStorage.setItem("cameras", JSON.stringify(cart));
  } else {
    cart.push(selected_product);
    localStorage.setItem("cameras", JSON.stringify(cart));
  }
  alert("vôtre commande a été ajouté au panier");
}

getArticleById();
