$(document).ready(function () {
    const table = $('#table-chaves').DataTable({
        info: true,
        ordering: false,
        paging: true,
        searching: true,
        dom: "<'top-section'<'info-text'><'top-section-direita'<'custom-button'>f>><t><'bottom'ip>", // Nova ordem: texto, filtro e botão
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json',
            "search": ""
        }
    });

    table.on('draw.dt', function () {
        $('.info-text').text('Chaves');
        $('.custom-button').html('<div id="btn-nova-chave" class="button-add-novo"><span><i class="bx bx-plus"></i>Nova chave</span></div>').appendTo('.top-section-direita');

        const openModal = document.querySelector('.custom-button');
        const modalCadChave = document.querySelector('.cad-chave-modal-content-group');

        openModal.addEventListener('click', function () {
            modalCadChave.style.display = 'block';
        });

        const closeModal = document.querySelector('.bx-x');

        closeModal.addEventListener('click', function () {
            modalCadChave.style.display = 'none';
        });
    });
});
