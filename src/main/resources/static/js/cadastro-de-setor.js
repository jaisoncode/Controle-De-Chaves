const openModal = document.querySelector('.button-add-novo');
const modalCadsetor = document.querySelector('.cad-setor-modal-content-group');

openModal.addEventListener('click', function() {
    modalCadsetor.style.display = 'block';
})

const closeModal = document.querySelector('.bx-x');

closeModal.addEventListener('click', function() {
modalCadsetor.style.display = 'none';
})



