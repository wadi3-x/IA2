import { generatePlan } from './dashbord1.js';

const form = document.getElementById("naruto");
const submitBtn = document.getElementById("sasuke");

if (form) {
    
    form.addEventListener("input", () => {
        const name = document.getElementById("name").value.trim();
        const description = document.getElementById("description").value.trim();
        submitBtn.disabled = !(name && description); 
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const brief = document.getElementById("brief").value;
        const duration = document.getElementById("duration").value || 1;
        const devs = document.getElementById("devs").value || 1;
        const techs = document.getElementById("techs").value;
        const level = document.getElementById("level").value;

    
        const prompt = `
            Tu es un chef de projet technique expert. Génère un plan de développement au format JSON STRICT.
            Ne renvoie AUCUN texte avant ou après le JSON.
            
            Détails du projet :
            - Nom : ${name}
            - Description : ${description}
            - Brief : ${brief}
            - Durée : ${duration} jours
            - Développeurs : ${devs}
            - Stack Technique : ${techs}
            - Complexité : ${level}

            Format JSON OBLIGATOIRE (adapte les valeurs aux détails ci-dessus) :
            {
              "projectName": "${name}",
              "description": "${description}",
              "totalEstimatedHours": (calcule les heures selon la durée et le nb de devs),
              "tasks": [
                {
                  "id": "TASK-001",
                  "title": "Titre de la tâche",
                  "description": "Description détaillée",
                  "userStories": ["En tant que... je veux... afin de..."],
                  "acceptanceCriteria": ["Critère 1", "Critère 2"],
                  "priority": "Low | Medium | High | Critical",
                  "importance": "Low | Medium | High",
                  "size": "XS | S | M | L | XL",
                  "estimatedTime": (en heures),
                  "deadline": "Day X",
                  "status": "To Do",
                  "dependencies": []
                }
              ]
            }
        `;

        try {
           
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Génération par l'IA en cours... ⏳";
            submitBtn.disabled = true;

            
            await generatePlan(prompt);

            
            window.location.href = "index.html";

        } catch (error) {
            console.error(error);
            alert("Erreur lors de la génération : " + error.message + "\nVérifiez que votre clé API est bien enregistrée dans les paramètres.");
            
           
            submitBtn.textContent = "Générer le plan de développement";
            submitBtn.disabled = false;
        }
    });
}