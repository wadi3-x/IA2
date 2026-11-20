if (!localStorage.getItem("papa") && !localStorage.getItem("demoDone")) {
  fetch("prompt.json")
    .then(response => {
      if (!response.ok) throw new Error("Échec du chargement de prompt.json");
      return response.json();
    })
    .then(data => {
      localStorage.setItem("papa", JSON.stringify(data));
      console.log("Projet démo initialisé");
      
    })
    .catch(error => console.error(error));
}