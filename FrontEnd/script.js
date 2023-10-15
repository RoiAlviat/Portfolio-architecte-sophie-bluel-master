

document.querySelector(".log").addEventListener("click", () => {
  window.location.href = "login.html"
})

const response = await fetch("http://localhost:5678/api/works");
let travaux = await response.json();

async function projets() {

  for(let i = 0; i < travaux.length; i++){
    let figure = document.createElement("figure")
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    figure.classList.add("actif")

    img.src = travaux[i].imageUrl;
    figure.dataset.id = travaux[i].categoryId
    figcaption.innerHTML = travaux[i].title;


    document.querySelector(".gallery").appendChild(figure)
    figure.appendChild(figcaption);
    figure.appendChild(img);
  }
    

    const objets = document.querySelector(".objets");
    const appart = document.querySelector(".appart")
    const hotels = document.querySelector(".hotels")
    const tous = document.querySelector(".tous")

    let dataid = document.querySelectorAll('.gallery [data-id]')
    let dataid1 = document.querySelectorAll('.gallery [data-id="1"]')
    let dataid2 = document.querySelectorAll('.gallery [data-id="2"]')
    let dataid3 = document.querySelectorAll('.gallery [data-id="3"]')

    objets.addEventListener("click", () => {
      if(objets.dataset.id === "1") {

        dataid1.forEach((datacat) => {
          datacat.classList.replace("inactif", "actif")
        })

        dataid2.forEach((datacat) => {
          datacat.classList.replace("actif", "inactif")
        })
        dataid3.forEach((datacat) => {
          datacat.classList.replace("actif", "inactif")
        })
      }
    })

    appart.addEventListener("click", () => {
      if(appart.dataset.id === "2") {

        dataid2.forEach((datacat) => {
          datacat.classList.replace("inactif", "actif")
        })

        dataid1.forEach((datacat) => {
          datacat.classList.replace("actif", "inactif")
        })
        dataid3.forEach((datacat) => {
          datacat.classList.replace("actif", "inactif")
        })
      }
    })

    hotels.addEventListener("click", () => {
      if(hotels.dataset.id === "3") {

        dataid3.forEach((datacat) => {
          datacat.classList.replace("inactif", "actif")
        })

        dataid1.forEach((datacat) => {
          datacat.classList.replace("actif", "inactif")
        })
        dataid2.forEach((datacat) => {
          datacat.classList.replace("actif", "inactif")
        })
      }
    })
    
    tous.addEventListener("click", () => {
      dataid.forEach((datacat) => {
        datacat.classList.replace("inactif", "actif")
      })
      
    })

  


}

async function connexion() {

  const tokenauth = sessionStorage.getItem("token")

  if(tokenauth) {
    document.querySelector(".edition-container").classList.replace("inactif", "actif")
    document.querySelector(".Filtres").classList.replace("disparition", "inactif")
    document.querySelector(".modifinside-container").classList.replace("inactif", "actif")
    document.querySelector(".log").innerHTML = "logout"

    document.querySelector(".modifinside-container").addEventListener("click", () => {
      document.querySelector(".overlay").classList.replace("inactif", "actif")
    })

    document.querySelector(".fa-xmark").addEventListener("click", () => {
      document.querySelector(".overlay").classList.replace("actif", "inactif")
    })

    const modalimgscontainer = document.querySelector(".modalimgs-container ")
    
    for(let i = 0; i < travaux.length; i++) {
      let imgmodal = document.createElement("img")
      let modaldiv = document.createElement("div")
      let spanmodal = document.createElement("span")
      let imodal = document.createElement("i")

      imodal.classList.add("fa-trash-can")
      imodal.classList.add("fa-solid")

      imgmodal.src = travaux[i].imageUrl

      modalimgscontainer.appendChild(modaldiv)
      modaldiv.appendChild(imgmodal)
      modaldiv.appendChild(spanmodal)
      spanmodal.appendChild(imodal)     
      
    }
  }

  document.querySelector(".log").addEventListener("click", () => {
    sessionStorage.removeItem("token")
  })
  
}

function upload() {
  const inputElement = document.getElementById("upload");
  let tokendata = window.sessionStorage.getItem("token")

  document.querySelector(".modal-button-container button").addEventListener("click", () => {
    document.querySelector(".modal-container").classList.replace("actif", "invisible")
    document.querySelector(".modal2-container").classList.replace("inactif", "actif")
  })

  document.querySelector(".fa-xmark2").addEventListener("click", () => {
    document.querySelector(".overlay").classList.replace("actif", "inactif")
  })

  document.querySelector(".fa-arrow-left").addEventListener("click", () => {
    document.querySelector(".modal-container").classList.replace("invisible", "actif")
    document.querySelector(".modal2-container").classList.replace("actif", "inactif")
  })


  document.querySelector(".form").addEventListener('change', () => {
    document.querySelector(".background-upload i").classList.replace("actif", "inactif")
    document.querySelector(".background-upload input").classList.replace("actif", "inactif")
    document.querySelector(".background-upload span").classList.replace("actif", "inactif")
    document.querySelector(".background-upload label").classList.replace("actif", "invisible")

    const imgupload = document.createElement("img");
    imgupload.classList.add("userpic");
    

    
    if (inputElement.files.length > 0) {
      imgupload.src = window.URL.createObjectURL(inputElement.files[0]);
      document.querySelector(".background-upload").appendChild(imgupload)
    }
  })


  document.querySelector(".form").addEventListener('submit', (e) => {
    e.preventDefault();
    
    let messageupload = document.querySelector(".erreur-span")
    messageupload.style.color = "blue";
    

    let title = document.getElementById("title").value;
    let categorie = document.getElementById("categorie").value;
    let fichier = document.getElementById("upload").files[0];
  
    if (!fichier) {
      // Affiche un message d'erreur à l'utilisateur
      document.querySelector(".erreur-span").innerHTML = "Veuillez sélectionner un fichier.";
       // Sort de la fonction pour empêcher l'envoi de la requête
      document.querySelector(".background-upload i").classList.replace("inactif", "actif")
    document.querySelector(".background-upload input").classList.replace("inactif", "actif")
    document.querySelector(".background-upload span").classList.replace("inactif", "actif")
    document.querySelector(".background-upload label").classList.replace("invisible", "actif")
    return;
    }
  
    let formData = new FormData();
    formData.append("image", fichier);
    formData.append("title", title);
    formData.append("category", categorie);

    if(fichier) {
      console.log("salut")
      fetch('http://localhost:5678/api/works', {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": "Bearer " + tokendata,
        }
      })
      .then((response) => {
        if (response.ok) {
          document.querySelector(".background-upload i").classList.replace("inactif", "actif")
    document.querySelector(".background-upload input").classList.replace("inactif", "actif")
    document.querySelector(".background-upload span").classList.replace("inactif", "actif")
    document.querySelector(".background-upload label").classList.replace("invisible", "actif")
          messageupload.classList.add = "vert"
          document.querySelector(".background-upload").remove
          document.querySelector(".erreur-span").innerHTML = "Votre image a bien été ajouté.";
          return response.json();
        } else if (response.status === 500) {
          messageupload.classList.add = "rouge"
          messageupload = "Une erreur est survenue, veuillez actualiser la page.";
        }
    
        // Gérer d'autres erreurs ici si nécessaire
      });

    }
  });
}  
async function supprimer() {
  let tokendata = window.sessionStorage.getItem("token");
  document.querySelectorAll(".fa-trash-can").forEach((poubelle, index) => {
    poubelle.addEventListener('click', (e) => {
      e.preventDefault(); 

      let poubellescontainer = poubelle.parentElement
      poubellescontainer.parentElement.classList.add("inactif")
      const id = travaux[index].id;
      console.log(id);
      fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + tokendata
        }
      });
      
 
    });
  });
}



connexion()
projets();
upload();
supprimer()