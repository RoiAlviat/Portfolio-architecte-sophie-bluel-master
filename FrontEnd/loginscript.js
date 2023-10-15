
async function Login() {
    
    
    const form = document.querySelector('#form')
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        
        const useradmin = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        
            const useradminpost = JSON.stringify(useradmin);
            fetch('http://localhost:5678/api/users/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: useradminpost
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if(response.status === 404) {
                        console.error("Vos identifiants n'ont pas été reconnus.");
                        document.querySelector(".erreurlog-span").innerHTML = "Votre mail n'a pas été reconnu."
                    } else if(response.status === 401) {
                        document.querySelector(".erreurlog-span").innerHTML = "Votre mot de passe n'est pas correspondant"
                    }
                })
                .then((responseData) => {
                    sessionStorage.setItem("token", responseData.token)
                    window.location.href = "index.html";
                  
                })
                .catch((error) => {
                    
                });
            
            })
    }

    

 Login()
    
    