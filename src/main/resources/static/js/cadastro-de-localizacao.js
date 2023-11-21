buscarLocalizacoesCadastradas();

const tabelaLocalizacao = document.querySelector('.table-list');

// Função para buscar e exibir as localizações já cadastradas
function buscarLocalizacoesCadastradas() {
    fetch("http://localhost:8080/cadastro-de-localizacao/")
        .then(response => response.json())
        .then(data => {

            exibirLocalizacao(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Erro ao buscar as localizações:', error);
        });
}


function exibirLocalizacao(data) {
    let novaLocalizacao = `<table id="table-chaves" class="display" style="width:100%">
    <thead class="title-table">
        <tr>
            <th>Setor</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>`;
    data.forEach(localizacao => {
        novaLocalizacao += `
            <tr>
                <td>${localizacao.nome}</td>
                <td class="acao">
                    <button class="editar">Editar</button>
                    <button class="excluir">Excluir</button>
                </td>
            </tr>`;
    });

    novaLocalizacao += `</tbody>
</table>`;

    tabelaLocalizacao.innerHTML = novaLocalizacao;

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
            $('.info-text').text('Localizações');
            $('.custom-button').html('<div id="btn-nova-chave" class="button-add-novo"><span><i class="bx bx-plus"></i>Adicione</span></div>').appendTo('.top-section-direita');

            const openModal = document.querySelector('.custom-button');
            const modalCadlocalizacao = document.querySelector('.cad-localizacao-modal-content-group');

            openModal.addEventListener('click', function () {
                modalCadlocalizacao.style.display = 'block';
            });

            const closeModal = document.querySelector('.bx-x');

            closeModal.addEventListener('click', function () {
                modalCadlocalizacao.style.display = 'none';
            });
        });
    });
}

const modalCadlocalizacao = document.querySelector('.cad-localizacao-modal-content-group');
const formLocalizacao = document.querySelector('cadastro-localizacao')
const inputNomeDaLocalizacao = document.querySelector("#nome-localizacao")
const submitLocalizacao = document.querySelector('#button-adicionar-localizacao')



submitLocalizacao.addEventListener('click', function () {
    const objetoJson = {
        nomePredio: inputNomeDaLocalizacao.value
    }
   // cadastrarLocalizacao(objetoJson); // Chame a função para cadastrar a localização
    modalCadlocalizacao.style.display = 'none';
})

submitLocalizacao.addEventListener("submit", function (event) {
    event.preventDefault();
})


function cadastrarLocalizacao(objetoJson) {
    fetch("http://localhost:8080/cadastro-de-localizacao", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(objetoJson)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            buscarLocalizacoesCadastradas();
        })
        .catch(function (response) { console.log(response) });
}