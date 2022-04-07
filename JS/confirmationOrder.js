function getParameter(parameterName) {
  //fonction pour récupérer le paramétre d'une URL
  //et afficher numéro de commande
  let parameter = new URLSearchParams(window.location.search);
  document.querySelector("#confirmation-text").innerHTML = `
    Merci d'avoir commandé chez nous, <br> vôtre commande numéro ${parameter} d'un montant de 
    <span id="display_total_here"></span>
    arrivera bientôt chez vous! 
    `;
  return parameter.get(parameterName);
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

getParameter();
writeTotalCart();
