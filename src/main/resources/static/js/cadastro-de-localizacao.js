const openModal = document.querySelector('.button-add-novo');
const modalCadLocalizacao = document.querySelector('.cad-localizacao-modal-content-group');

openModal.addEventListener('click', function() {
    modalCadLocalizacao .style.display = 'block';
})

const closeModal = document.querySelector('.bx-x');

closeModal.addEventListener('click', function() {
    modalCadLocalizacao .style.display = 'none';
})


