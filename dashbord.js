let projectList = document.querySelector("#konoha");
const apa = document.getElementById("genin");
const apa1 = document.getElementById("chunin");
const apa2 = document.getElementById("jonin");
const demo = JSON.parse(localStorage.getItem("papa"));
const tasks = JSON.parse(localStorage.getItem("tasks")) || (demo ? demo.tasks : []);

function renderDashboard() {

  if (projectList) {
    if (tasks.length === 0) {
      projectList.innerHTML = '<p class="text-slate-400">Aucun projet pour le moment, créez-en un pour générer votre premier plan.</p>';
      return;
    }


    const total = tasks.length;
    const done = tasks.filter(t => t.status === "Done").length;
    const remaining = total - done;
    

   
    const title = (demo && (demo.projectName || demo.title)) ? (demo.projectName || demo.title) : "Projet démo";
    const description = (demo && demo.description) ? demo.description : "Plan chargé depuis prompt.json";

    projectList.innerHTML = `
      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">${title}</h2>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">${description}</p>
        </div>

        <div>
          <p class="text-xs font-medium text-gray-700 mb-2">
            ${total} tâches · ${done} terminées · ${remaining} restantes
          </p>

         

          

          <div class="flex items-center gap-3">
            <a href="projets.html" class="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Ouvrir
            </a>
            <button onclick="supprimerProjet()" class="bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    `;
  }
  if (apa && apa1 && apa2) {
    apa.innerHTML = "";
    apa1.innerHTML = "";
    apa2.innerHTML = "";

    tasks.forEach((item, index) => {
      const p = document.createElement("p");
      p.className = "bg-gray-100 p-3 rounded-lg shadow-sm ";

      p.innerHTML = `Task: ${item.title} - \nPriority: ${item.priority}
        <br>
        <button onclick="changeStatus(${index})" class="text-indigo-600 text-xs underline mr-3 mt-2">Changer statut</button>
      `;

      if (item.status === "To Do") {
        apa.appendChild(p);
      } else if (item.status === "In Progress") {
        apa1.appendChild(p);
      } else if (item.status === "Done") {
        apa2.appendChild(p);
      }
    });
  }
}

function changeStatus(index) {
  if (tasks[index].status === "To Do") {
    tasks[index].status = "In Progress";
  } else if (tasks[index].status === "In Progress") {
    tasks[index].status = "Done";
  } else {
    tasks[index].status = "To Do";
  }
  saveAndRefresh();
}

function supprimerProjet() {
  localStorage.removeItem("papa");
  localStorage.removeItem("tasks");
  localStorage.setItem("demoDone", "1");
  location.reload();
}

function saveAndRefresh() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderDashboard();
}

renderDashboard();