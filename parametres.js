
const lire = () => JSON.parse(localStorage.getItem('projects') || '[]');
const ecrire = (liste) => localStorage.setItem('projects', JSON.stringify(liste));
const boite = document.createElement('div'); 

boite.innerHTML = `<div id="hokage" class="hidden fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-xl border p-6 w-full max-w-md">
    <h2 class="text-xl font-bold">Paramètres IA</h2>
    <p class="text-sm text-gray-500 mt-1">Saisissez votre clé API ci-dessous :</p>
    <input id="chakra" type="password" placeholder="Clé API (ex: sk-...)"
      class="w-full border-2 rounded-lg p-2 mt-3 focus:border-black focus:outline-none">
    <p id="sakura" class="text-sm text-green-600 mt-2 min-h-5"></p>
    <div class="flex items-center justify-between mt-4">
      <button id="clone" class="text-sm text-gray-500 underline">Mode démo</button>
      <div class="flex gap-3">
        <button id="kunai" class="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300">Fermer</button>
        <button id="rasengan" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700">Enregistrer</button>
      </div>
    </div>
  </div>
</div>`; 
document.body.appendChild(boite);              



const hokage = document.getElementById('hokage');
const chakra = document.getElementById('chakra');
const sakura = document.getElementById('sakura');
let boutonNinja = document.getElementById('ninja');

boutonNinja.addEventListener('click', function () {
  
  sakura.textContent = '';
  chakra.value = '';

  let cle = localStorage.getItem('apiKey');
  if (cle !== null) {
    chakra.value = cle;
  }

  
  hokage.classList.remove('hidden');
});

function enregistrerCle() {
  let valeur = chakra.value.trim();

  if (valeur === '') {
    sakura.textContent = 'Écris une clé API avant d’enregistrer.';
  } else {
    localStorage.setItem('apiKey', valeur);
    sakura.textContent = 'Clé enregistrée !';
  }
}


function fermerFenetre() {
  hokage.classList.add('hidden');
}


let btnEnregistrer = document.getElementById('rasengan');
btnEnregistrer.addEventListener('click', enregistrerCle);

let btnFermer = document.getElementById('kunai');
btnFermer.addEventListener('click', fermerFenetre);