const boite = document.createElement('div');

boite.innerHTML = `<div id="hokage" class="hidden fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-xl border p-6 w-full max-w-md">
    <h2 class="text-xl font-bold">Paramètres IA</h2>
    <p class="text-sm text-gray-500 mt-1">Saisissez votre clé API ci-dessous :</p>
    <input id="chakra" type="password" placeholder="Clé API (ex: sk-...)"
      class="w-full border-2 rounded-lg p-2 mt-3 focus:border-black focus:outline-none">
    <p id="sakura" class="text-sm text-green-600 mt-2 min-h-5"></p>
    <div class="flex items-center justify-between mt-4">
      <a id="clone" href="projets.html" class="text-sm text-indigo-600 underline font-medium">Mode démo</a>
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
const boutonNinja = document.getElementById('ninja');
const btnDemo = document.getElementById('clone');

if (boutonNinja) {
  boutonNinja.addEventListener('click', function () {
    sakura.textContent = '';
    chakra.value = localStorage.getItem('apiKey') || '';
    hokage.classList.remove('hidden');
  });
}


if (btnDemo) {
  btnDemo.addEventListener('click', function () {
    localStorage.setItem('activeMode', 'demo');
    localStorage.removeItem('demoDone');
  });
}

function enregistrerCle() {
  const valeur = chakra.value.trim();
  if (valeur === '') {
    sakura.className = 'text-sm text-red-600 mt-2 min-h-5';
    sakura.textContent = 'Écris une clé API avant d’enregistrer.';
  } else {
    localStorage.setItem('apiKey', valeur);
    sakura.className = 'text-sm text-green-600 mt-2 min-h-5';
    sakura.textContent = 'Clé enregistrée !';
  }
}

function fermerFenetre() {
  hokage.classList.add('hidden');
}

document.getElementById('rasengan').addEventListener('click', enregistrerCle);
document.getElementById('kunai').addEventListener('click', fermerFenetre);