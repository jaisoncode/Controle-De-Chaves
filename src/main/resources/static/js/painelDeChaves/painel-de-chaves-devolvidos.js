buscarEmprestimosEmUso();
buscarEmprestimosDevolvidos();
buscarEmprestimosPendentes();

const tabelaChave = document.querySelector('.table-list');
const modalConfirmDevolucao = document.querySelector('.confirm-devolucao-modal-content-group');
const formChave = document.querySelector('#cadastro-de-chave')

const inputNomeDoResponsavel = document.querySelector('#input-responsavel-nome')
const selectSetor = document.querySelector('#select-setor')
const selectLocalizacao = document.querySelector('#select-localizacao')

const btnCancelDevolucao = document.querySelector('#btn-cancel-devolucao')
const btnConfirmDevoluco = document.querySelector('#btn-confirm-devolucao')
const closeModal = document.querySelector('#fechar-modal');




closeModal.addEventListener('click', function () {
    modalConfirmDevolucao.style.display = 'none';

});


const agora = new Date();

const dataSaidaFormatada = agora.toISOString().split('T')[0]; // Obtém a data no formato 'yyyy-MM-dd'

const horas = agora.getHours().toString().padStart(2, '0'); // Obtém as horas no formato 'HH'
const minutos = agora.getMinutes().toString().padStart(2, '0'); // Obtém os minutos no formato 'mm'
const segundos = agora.getSeconds().toString().padStart(2, '0'); // Obtém os segundos no formato 'ss'

const horarioSaidaFormatado = `${horas}:${minutos}:${segundos}`; // Formata a hora no formato 'HH:mm:ss'

console.log(dataSaidaFormatada)
console.log(horarioSaidaFormatado)

//formChave.addEventListener("submit", function (event) {
// event.preventDefault();
//})


function exibirEmprestimosDevolvidos(data) {
    let novoEmprestimo = `
    <table id="table-main" class="display" style="width:100%">
        <thead class="title-table">
            <tr>
                <th>Responsável</th>
                <th>Chave</th>
                <th>Retirada</th>
                <th>Devolução</th>
                <th>Status</th>
                
            </tr>
        </thead>
        <tbody>`;
    data.forEach(emprestimo => {
        novoEmprestimo += `
            <tr>
                <td>${emprestimo.nomeDoResponsavel}</td>
                <td>${emprestimo.chave.nome}</td>
                <td>${emprestimo.dataSaida}</td>
                <td>${emprestimo.DataDevolucao}</td>
                <td class="acao">
                    <div class="status-devolvido">
                    <span>${emprestimo.status}</span>
                    </div>
                    
                </td>
                
            </tr>`;
    });

    novoEmprestimo += `</tbody>
</table>`;

    tabelaChave.innerHTML = novoEmprestimo;

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
            $('.info-text').text('Retirada de chave');
            $('.custom-button').html('').appendTo('.top-section-direita');
        });
    });

    data.forEach(emprestimo => {

        const btnDevolucao = document.querySelector(`#btn-fazer-devolucao-${emprestimo.id}`)

        const responsavelDaDevolucao = document.querySelector('#responsavel-por-chave')
        const chaveDevolvida = document.querySelector('#chave-da-devolucao')

        btnDevolucao.onclick = function () {
            modalConfirmDevolucao.style.display = 'block';
            responsavelDaDevolucao.innerHTML = emprestimo.nomeDoResponsavel;
            chaveDevolvida.innerHTML = emprestimo.chave.nome;
            idEmprestimo = emprestimo.id;

            btnCancelDevolucao.onclick = function () {
                modalConfirmDevolucao.style.display = "none";
                idEmprestimo = null;
            }

            btnConfirmDevoluco.onclick = function () {
                if (idEmprestimo != null){
                    const objetoJson = {
                        DataDevolucao: dataSaidaFormatada,
                        horarioDevolucao: horarioSaidaFormatado,
                        status: "Devolvido"
                    }
                    console.log(objetoJson);
                    console.log(idEmprestimo);
                    fazerDevolução(idEmprestimo, objetoJson);
                    modalConfirmDevolucao.style.display = "none";
                }
                idEmprestimo = null;
                console.log(idEmprestimo);
                
            }

            closeModal.onclick = function () {
                modoEdicao = null;
                idEmprestimo = null;
                console.log(idEmprestimo + "resetou");
            }
        }
    })
    const EmUso = document.querySelector('#count-em-uso')
    EmUso.innerHTML = data.length;
}

// Função para buscar e exibir as localizações já cadastradas
function buscarEmprestimosEmUso() {
    fetch("http://localhost:8080/emprestimos/status/Em%20uso")
        .then(response => response.json())
        .then(data => {

            exibirEmprestimosEmUso(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Erro ao buscar as chaves:', error);
        });
}

function buscarEmprestimosDevolvidos() {
    fetch("http://localhost:8080/emprestimos/status/Devolvido")
        .then(response => response.json())
        .then(data => {
            console.log(data.length);
            document.querySelector("#count-devolvidos").innerHTML = data.length;
            exibirEmprestimosDevolvidos(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Erro ao buscar as chaves:', error);
        });
}

function buscarEmprestimosPendentes() {
    fetch("http://localhost:8080/emprestimos/status/Pendente")
        .then(response => response.json())
        .then(data => {
            console.log(data.length);
            document.querySelector("#count-pendentes").innerHTML = data.length;
            //exibirEmprestimos(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Erro ao buscar as chaves:', error);
        });
}














