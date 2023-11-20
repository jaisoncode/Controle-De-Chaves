const openModal = document.querySelector('.button-add-novo');
const modalCadChave = document.querySelector('.cad-chave-modal-content-group');

openModal.addEventListener('click', function() {
    modalCadChave.style.display = 'block';
})

const closeModal = document.querySelector('.bx-x');

closeModal.addEventListener('click', function() {
modalCadChave.style.display = 'none';
})



