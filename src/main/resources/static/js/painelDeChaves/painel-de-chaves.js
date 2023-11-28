buscarChavesCadastradas();

const tabelaChave = document.querySelector('.table-list');
const modalCadChave = document.querySelector('.cad-chave-modal-content-group');
const formChave = document.querySelector('#cadastro-de-chave')

const inputNomeDoResponsavel = document.querySelector('#input-responsavel-nome')
const selectSetor = document.querySelector('#select-setor')
const selectLocalizacao = document.querySelector('#select-localizacao')


const submitChave = document.querySelector('#button-adicionar-chave')
const closeModal = document.querySelector('#fechar-modal');




closeModal.addEventListener('click', function () {
    modalCadChave.style.display = 'none';

});



let modoEdicao = false;
let idChave = null;

const agora = new Date();

const dataSaidaFormatada = agora.toISOString().split('T')[0]; // Obtém a data no formato 'yyyy-MM-dd'

const horas = agora.getHours().toString().padStart(2, '0'); // Obtém as horas no formato 'HH'
const minutos = agora.getMinutes().toString().padStart(2, '0'); // Obtém os minutos no formato 'mm'
const segundos = agora.getSeconds().toString().padStart(2, '0'); // Obtém os segundos no formato 'ss'

const horarioSaidaFormatado = `${horas}:${minutos}:${segundos}`; // Formata a hora no formato 'HH:mm:ss'

console.log(dataSaidaFormatada)
console.log(horarioSaidaFormatado)
submitChave.addEventListener('click', function () {

    const objetoJson = {
        nomeDoResponsavel: inputNomeDoResponsavel.value,
        dataSaida: dataSaidaFormatada,
        horarioSaida: horarioSaidaFormatado,
        status: "Em uso"
    };
    console.log(objetoJson);
    fazerEmprestimoDeChave(idChave, objetoJson); // Chame a função para cadastrar a localização

    modalCadChave.style.display = 'none';
    //inputNomeDaChave.value = "";
    // selectSetor.value = "";
    // selectLocalizacao.value = "";
})

formChave.addEventListener("submit", function (event) {
    event.preventDefault();
})


function exibirChaves(data) {
    let novaChave = `
    <table id="table-main" class="display" style="width:100%">
        <thead class="title-table">
            <tr>
                <th>Nome</th>
                <th>Setor</th>
                <th>Localização</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>`;
    data.forEach(chaves => {
        novaChave += `
            <tr>
                <td>${chaves.nome}</td>
                <td>${chaves.setor.nome}</td>
                <td>${chaves.localizacao.nomePredio}</td>
                <td class="acao">
                    <button id="btn-solicitar-uso-${chaves.id}" class="editar">Solicitar uso</button>
                </td>
            </tr>`;
    });

    novaChave += `</tbody>
</table>`;

    tabelaChave.innerHTML = novaChave;

    //datables 
    $(document).ready(function () {
        const table = $('#table-main').DataTable({
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
            $('.info-text').text('Chaves cadastradas');
            $('.custom-button').html('').appendTo('.top-section-direita');
        });
    });

    data.forEach(chaves => {

        const buttonSolicitarUso = document.querySelector(`#btn-solicitar-uso-${chaves.id}`)
        const tituloDeConfirmacao = document.querySelector('#titulo-de-chave')

        buttonSolicitarUso.onclick = function () {
            modalCadChave.style.display = 'block';
            tituloDeConfirmacao.innerHTML = chaves.nome;
            inputNomeDoResponsavel.value = "";

            idChave = chaves.id;


            closeModal.onclick = function () {
                modoEdicao = null;
                idChave = null;
                console.log(idChave + "resetou");
            }

        }


    })

}

// Função para buscar e exibir as localizações já cadastradas
function buscarChavesCadastradas() {
    fetch("http://localhost:8080/cadastro-de-chaves/")
        .then(response => response.json())
        .then(data => {

            exibirChaves(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Erro ao buscar as chaves:', error);
        });
}

function fazerEmprestimoDeChave(idChave, objetoJson) {
    fetch(`http://localhost:8080/emprestimos/${idChave}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(objetoJson)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);

        })
        .catch(function (response) { console.log(response) });
}










