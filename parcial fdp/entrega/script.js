let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex - 1].style.display = "block";  
  setTimeout(showSlides, 3000); // Cambia de imagen cada 3 segundos
}


// Cambiar nombre de usuario
const editNameBtn = document.getElementById('edit-name-btn');
const saveNameBtn = document.getElementById('save-name-btn');
const username = document.getElementById('username');
const editNameInput = document.getElementById('edit-name-input');

editNameBtn.addEventListener('click', () => {
    username.style.display = 'none';
    editNameInput.style.display = 'inline';
    saveNameBtn.style.display = 'inline';
    editNameBtn.style.display = 'none';
});

saveNameBtn.addEventListener('click', () => {
    const newName = editNameInput.value;
    username.textContent = newName;
    username.style.display = 'inline';
    editNameInput.style.display = 'none';
    saveNameBtn.style.display = 'none';
    editNameBtn.style.display = 'inline';
});

// Desplegar más información de seguridad
const securityOption = document.getElementById('security-option');
const securityInfo = document.getElementById('security-info');

securityOption.addEventListener('click', () => {
    if (securityInfo.style.display === 'none') {
        securityInfo.style.display = 'block';
    } else {
        securityInfo.style.display = 'none';
    }
});

// Cambiar imagen de perfil
const cameraIcon = document.getElementById('camera-icon');
const uploadPhoto = document.getElementById('upload-photo');
const profilePhoto = document.getElementById('profile-photo');

cameraIcon.addEventListener('click', () => {
    uploadPhoto.click();
});

uploadPhoto.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        profilePhoto.style.backgroundImage = `url(${e.target.result})`;
        profilePhoto.textContent = ''; // Quita las iniciales
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('searchBar').addEventListener('input', event => {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = products.filter(agente =>
      agente.nombre.toLowerCase().includes(searchText) || 
      agente.rol.toLowerCase().includes(searchText) 
    );
    renderAgentes(filteredAgents); 
  });