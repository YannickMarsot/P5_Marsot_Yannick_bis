function getParameter(parameterName) {
  //fonction pour récupérer le paramétre d'une URL
  //et afficher numéro de commande
  let parameter = new URLSearchParams(window.location.search);
  document.querySelector("#confirmation-text").innerHTML = `
    Merci d'avoir commandé chez nous, <br> vôtre commande numéro ${parameter}
    arrivera bientôt chez vous! 
    `;
  return parameter.get(parameterName);
}

getParameter();
