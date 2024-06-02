
const btnTrocarTema = document.querySelector('#botao_editar_titulo');

const btnNovaTarefaAFazer = document.querySelector('#nova_tarefa_a_fazer');
const btnNovaTarefaFazendo = document.querySelector('#nova_tarefa_fazendo');
const btnNovaTarefaFeito = document.querySelector('#nova_tarefa_feito');
const btnCancelarNovaAFazer = document.querySelector('#cancelar_nova_a_fazer');
const btnCancelarNovaFazendo = document.querySelector('#cancelar_nova_fazendo');
const btnCancelarNovaFeito = document.querySelector('#cancelar_nova_feito');
const btnAdicionarNovaAFazer = document.querySelector('#adicionar_nova_a_fazer');
const btnAdicionarNovaFazendo = document.querySelector('#adicionar_nova_fazendo');
const btnAdicionarNovaFeito = document.querySelector('#adicionar_nova_feito');

const btnLimparTarefasAFazer = document.querySelector('#botao_limpar_quadro_a_fazer');
const btnLimparTarefasFazendo = document.querySelector('#botao_limpar_quadro_fazendo');
const btnLimparTarefasFeito = document.querySelector('#botao_limpar_quadro_feito');

const txtNomeTarefaAFazer = document.querySelector('#nome_nova_a_fazer');
const txtNomeTarefaFazendo = document.querySelector('#nome_nova_fazendo');
const txtNomeTarefaFeito = document.querySelector('#nome_nova_feito');

const quadroEditarNovaTarefaAFazer = document.querySelector('#nova_a_fazer');
const quadroEditarNovaTarefaFazendo = document.querySelector('#nova_fazendo');
const quadroEditarNovaFeito = document.querySelector('#nova_feito');

const listaTarefasAFazer = document.querySelector('#tarefas_a_fazer');
const listaTarefasFazendo = document.querySelector('#tarefas_fazendo');
const listaTarefasFeito = document.querySelector('#tarefas_feito');


const txtNomeQuadro = document.querySelector('#nome_quadro');


let nomeQuadro = localStorage.getItem('nomeQuadro') || 'Tarefas do Dia';

let tarefasAFazer = JSON.parse(localStorage.getItem('tarefas_af')) || [];
let tarefasFazendo = JSON.parse(localStorage.getItem('tarefas_fa')) || [];
let tarefasFeitas = JSON.parse(localStorage.getItem('tarefas_fe')) || [];

function atualizarTarefas(){

    localStorage.setItem('tarefas_af', JSON.stringify(tarefasAFazer));
    localStorage.setItem('tarefas_fa', JSON.stringify(tarefasFazendo));
    localStorage.setItem('tarefas_fe', JSON.stringify(tarefasFeitas));

}



function mudarNomeQuadro()
{
    const novoNome = prompt("Qual é o novo nome do quadro?");
    if(novoNome){
        nomeQuadro = novoNome;
        atualizarNomeQuadro();
        atualizarTextoNome();
    }
}

function atualizarNomeQuadro()
{
    localStorage.setItem('nomeQuadro', nomeQuadro);
}


function editarNovaTarefa(tipo)
{
    switch (tipo){
        case 'a_fazer':
            btnNovaTarefaAFazer.classList.add('hidden');
            quadroEditarNovaTarefaAFazer.classList.remove('hidden');
        break;

        case 'fazendo':
            btnNovaTarefaFazendo.classList.add('hidden');
            quadroEditarNovaTarefaFazendo.classList.remove('hidden');
        break;

        case 'feito':
            btnNovaTarefaFeito.classList.add('hidden');
            quadroEditarNovaFeito.classList.remove('hidden');
        break;
    }
}

function cancelarNovaTarefa(tipo){
    switch (tipo){
        case 'a_fazer':
            quadroEditarNovaTarefaAFazer.querySelector('.campo_nome_tarefa').value = '';
            btnNovaTarefaAFazer.classList.remove('hidden');
            quadroEditarNovaTarefaAFazer.classList.add('hidden');
        break;

        case 'fazendo':
            quadroEditarNovaTarefaFazendo.querySelector('.campo_nome_tarefa').value = '';
            btnNovaTarefaFazendo.classList.remove('hidden');
            quadroEditarNovaTarefaFazendo.classList.add('hidden');
        break;

        case 'feito':
            quadroEditarNovaFeito.querySelector('.campo_nome_tarefa').value = '';
            btnNovaTarefaFeito.classList.remove('hidden');
            quadroEditarNovaFeito.classList.add('hidden');
        break;
    }
}

function adicionarNovaTarefa(tipo, tarefa){
    
    const div = document.createElement('div');
    div.classList.add('item');
    div.classList.add('tarefas_tarefa');

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('titulo_tarefa');
    paragrafo.textContent = tarefa.nome;

    const division_buttons = document.createElement('div');
    division_buttons.classList.add('botoes_tarefa');

    const botaoRetroceder = document.createElement('button');
    botaoRetroceder.classList.add('botao_acao_tarefa');
    botaoRetroceder.innerHTML = `
        <img src="./img/Ícone Retroceder.png" class="icone_retroceder_tarefa" alt="Ícone Retroceder Tarefa">`;

    const botaoAvancar = document.createElement('button');
    botaoAvancar.classList.add('botao_acao_tarefa');
    botaoAvancar.innerHTML = `
        <img src="./img/Ícone Avancar.png" class="icone_avancar_tarefa" alt="Ícone Avançar Tarefa">`;


    const botaoEdicao = document.createElement('button');
    botaoEdicao.classList.add('botao_acao_tarefa');
    botaoEdicao.classList.add('icone_expandir_opcoes');
    botaoEdicao.innerHTML = `
        <img src="./img/Ícone Expandir.png" alt="Ícone Opções">`;


    const opcoes = document.createElement('div');
    opcoes.classList.add('hidden');
    opcoes.classList.add('quadro_opcoes_tarefa');

    const botaoEditarTarefa = document.createElement('button');
    botaoEditarTarefa.innerHTML = `
        <p>Editar</p>`;

    const botaoApagarTarefa = document.createElement('button');
    botaoApagarTarefa.innerHTML = `
        <p>Apagar</p>`;

    opcoes.append(botaoEditarTarefa);
    opcoes.append(botaoApagarTarefa);

    botaoEdicao.onclick = () =>{
        editarTarefa(tarefa);
    };

    adicionarFuncaoBotoesTarefa(div, botaoRetroceder, botaoAvancar, botaoEditarTarefa, botaoApagarTarefa, opcoes, tipo, tarefa);

    div.append(paragrafo);
    division_buttons.append(botaoRetroceder);
    division_buttons.append(botaoAvancar);
    division_buttons.append(botaoEdicao);
    division_buttons.append(opcoes);
    div.append(division_buttons);

    return div;
}

function adicionarFuncaoBotoesTarefa(div, botaoRetroceder, botaoAvancar, botaoEditarTarefa, botaoApagarTarefa, opcoes, tipo, tarefa){
    switch (tipo) {
        //TO-DO -> Adicionar as funções dos botões de editar e de mover as tarefas de um lado ao outro
        case 'a_fazer':
            div.classList.add('tarefa_a_fazer');
            botaoRetroceder.classList.add('hidden');
            botaoAvancar.onclick = () =>{
                moverTarefa(tarefa, 'a_fazer', 'fazendo');
            };
            opcoes.classList.add('quadro_opcoes_tarefa_a_fazer');
            botaoEditarTarefa.classList.add('conteudo_opcao_botao_tarefa_a_fazer');
            botaoEditarTarefa.onclick = () => {
                editarTarefa('a_fazer', tarefa);
            };
            botaoApagarTarefa.classList.add('conteudo_opcao_botao_tarefa_a_fazer');
            botaoApagarTarefa.onclick = () =>{
                apagarTarefa('a_fazer', tarefa);
            };
            break;
        case 'fazendo':
            div.classList.add('tarefa_fazendo');
            botaoRetroceder.onclick = () =>{
                moverTarefa(tarefa, 'fazendo', 'a_fazer');
            };
            botaoAvancar.onclick = () =>{
                moverTarefa(tarefa, 'fazendo', 'feito');
            };
            opcoes.classList.add('quadro_opcoes_tarefa_fazendo');
            botaoEditarTarefa.classList.add('conteudo_opcao_botao_tarefa_fazendo');
            botaoEditarTarefa.onclick = () => {
                editarTarefa('fazendo', tarefa);
            };
            botaoApagarTarefa.classList.add('conteudo_opcao_botao_tarefa_fazendo');
            botaoApagarTarefa.onclick = () =>{
                apagarTarefa('fazendo', tarefa);
            };
            break;
        case 'feito':
            div.classList.add('tarefa_feito');
            botaoRetroceder.onclick = () =>{
                moverTarefa(tarefa, 'feito', 'fazendo');
            };
            botaoAvancar.classList.add('hidden');
            opcoes.classList.add('quadro_opcoes_tarefa_feito');
            botaoEditarTarefa.classList.add('conteudo_opcao_botao_tarefa_feito');
            botaoEditarTarefa.onclick = () => {
                editarTarefa('feito', tarefa);
            };
            botaoApagarTarefa.classList.add('conteudo_opcao_botao_tarefa_feito');
            botaoApagarTarefa.onclick = () =>{
                apagarTarefa('feito', tarefa);
            };
            break;
    }
}

function editarTarefa(listaAtual, tarefa){
    const novoNome = prompt("Qual é o novo nome da tarefa?");
    if(novoNome){
        switch(listaAtual){
            case 'a_fazer':
                tarefasAFazer[tarefasAFazer.indexOf(tarefa)].nome = novoNome;
                atualizarTarefasAFazerVisualmente();
                break;
            case 'fazendo':
                tarefasFazendo[tarefasFazendo.indexOf(tarefa)].nome = novoNome;
                atualizarTarefasFazendoVisualmente();
                break;
            case 'feito':
                tarefasFeitas[tarefasFeitas.indexOf(tarefa)].nome = novoNome;
                atualizarTarefasFeitoVisualmente();
                break;
        }
        atualizarTarefas();
    }
}

function moverTarefa(tarefa, listaAtual, alvo)
{
    switch(alvo){
        case 'a_fazer':
            atualizarTarefasAFazerVisualmente();
            break;
        case 'fazendo':
            atualizarTarefasFazendoVisualmente();
            break;
        case 'feito':
            atualizarTarefasFeitoVisualmente();
            break;
    }
}

function apagarTarefa(listaAtual, tarefa)
{
    let confirmacao = confirm("Tem certeza que deseja apagar esta tarefa?"); 
    if (!confirmacao) return;
    let tarefaADeletar = -1;
    switch (listaAtual){
        case 'a_fazer':
            tarefaADeletar = tarefasAFazer.indexOf(tarefa);
            tarefasAFazer.splice(tarefaADeletar);
            seletor = ".tarefa_a_fazer";
            document.querySelectorAll(seletor).forEach(elemento => {
                elemento.remove();
            });
            atualizarTarefasAFazerVisualmente();
            break;
        case 'fazendo':
            tarefaADeletar = tarefasFazendo.indexOf(tarefa);
            tarefasFazendo.splice(tarefaADeletar);
            seletor = ".tarefa_fazendo";
            document.querySelectorAll(seletor).forEach(elemento => {
                elemento.remove();
            });
            atualizarTarefasFazendoVisualmente();
            break;
        case 'feito':
            tarefaADeletar = tarefasFeitas.indexOf(tarefa);
            tarefasFeitas.splice(tarefa);
            seletor = ".tarefa_feito";
            document.querySelectorAll(seletor).forEach(elemento => {
                elemento.remove();
            });
            atualizarTarefasFeitoVisualmente();
            break;
    }
    atualizarTarefas();
}

btnLimparTarefasAFazer.addEventListener('click', (evento) => {
    limparQuadro(evento, 'a_fazer');
});

btnLimparTarefasFazendo.addEventListener('click', (evento) => {
    limparQuadro(evento, 'fazendo');
});

btnLimparTarefasFeito.addEventListener('click', (evento) => {
    limparQuadro(evento, 'feito');
});


function limparQuadro(evento, tipo){
    //Impede o comportamento padrão do botão recarregar a página
    evento.preventDefault();
    let confirmacao = false;
    switch (tipo){
        case 'a_fazer':
            confirmacao = confirm("Deseja limpar todas as Tarefas A Fazer?");
            break;
        case 'fazendo':
            confirmacao = confirm("Deseja limpar todas as Tarefas Fazendo?");
            break;
        case 'feito':
            confirmacao = confirm("Deseja limpar todas as Tarefas Feitas?");
            break;
    }
    if(!confirmacao){
        return;
    }

    let seletor = null;
    switch(tipo){
        case 'a_fazer':
            tarefasAFazer = [];
            seletor = ".tarefa_a_fazer";
            break;
        case 'fazendo':
            tarefasFazendo = [];
            seletor = ".tarefa_fazendo";
            break;
        case 'feito':
            tarefasFeitas = [];
            seletor = ".tarefa_feito";
            break;
    }
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    
    atualizarTarefas();
}




btnAdicionarNovaAFazer.addEventListener('click', (evento) => {
    chamarFuncaoNovaTarefaPorBotao(evento, 'a_fazer');    
});

btnAdicionarNovaFazendo.addEventListener('click', (evento) => {
    chamarFuncaoNovaTarefaPorBotao(evento, 'fazendo');
});

btnAdicionarNovaFeito.addEventListener('click', (evento) => {
    chamarFuncaoNovaTarefaPorBotao(evento, 'feito');
});

function chamarFuncaoNovaTarefaPorBotao(evento, tipo){
    //Impede o comportamento padrão do botão recarregar a página
    evento.preventDefault();

    switch (tipo){
        case 'a_fazer':
            if(!txtNomeTarefaAFazer.value){
                return;
            }
            const tarefaAF = {
                nome: txtNomeTarefaAFazer.value
            }
            
            tarefasAFazer.push(tarefaAF);
        
            const elementoTarefaA = adicionarNovaTarefa('a_fazer', tarefaAF);
            mostrarNovaTarefaNaPagina('a_fazer', elementoTarefaA);
            cancelarNovaTarefa('a_fazer');
            break;
        case 'fazendo':
            if (!txtNomeTarefaFazendo.value){
                return;
            }
            const tarefaFA = {
                nome: txtNomeTarefaFazendo.value
            }
            tarefasFazendo.push(tarefaFA);
        
            const elementoTarefaFA = adicionarNovaTarefa('fazendo', tarefaFA);
            mostrarNovaTarefaNaPagina('fazendo', elementoTarefaFA);
            cancelarNovaTarefa('fazendo');
            break;
        case 'feito':
            if (!txtNomeTarefaFeito.value){
                return;
            }
            const tarefaFE = {
                nome: txtNomeTarefaFeito.value
            }
            tarefasFeitas.push(tarefaFE);
        
            const elementoTarefaFE = adicionarNovaTarefa('feito', tarefaFE);
            mostrarNovaTarefaNaPagina('feito', elementoTarefaFE);
            cancelarNovaTarefa('feito');
            break;
    }
    atualizarTarefas();
}


function mostrarNovaTarefaNaPagina(tipo, elementoTarefa){
    switch (tipo){
        case 'a_fazer':
            listaTarefasAFazer.append(elementoTarefa);
            break;
        case 'fazendo':
            listaTarefasFazendo.append(elementoTarefa);
            break;
        case 'feito':
            listaTarefasFeito.append(elementoTarefa);
            break;
    }
}

function atualizarTarefasAFazerVisualmente(){
    const seletor = ".tarefa_a_fazer";
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    tarefasAFazer.forEach(element => {
        const elementoTarefa = adicionarNovaTarefa('a_fazer', element);
        listaTarefasAFazer.append(elementoTarefa);
    });
}

function atualizarTarefasFazendoVisualmente(){
    const seletor = ".tarefa_fazendo";
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    tarefasFazendo.forEach(element => {
        const elementoTarefa = adicionarNovaTarefa('fazendo', element);
        listaTarefasFazendo.append(elementoTarefa);
    });
}

function atualizarTarefasFeitoVisualmente(){
    const seletor = ".tarefa_feito";
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    tarefasFeitas.forEach(element => {
        const elementoTarefa = adicionarNovaTarefa('feito', element);
        listaTarefasFeito.append(elementoTarefa);
    });
}


btnTrocarTema.addEventListener('click', () => {
    mudarNomeQuadro();
});


btnNovaTarefaAFazer.addEventListener('click', () => {
    editarNovaTarefa('a_fazer');
});

btnCancelarNovaAFazer.addEventListener('click', () => {
    cancelarNovaTarefa('a_fazer');
});

btnNovaTarefaFazendo.addEventListener('click', () => {
    editarNovaTarefa('fazendo');
});

btnCancelarNovaFazendo.addEventListener('click', () => {
    cancelarNovaTarefa('fazendo');
});

btnNovaTarefaFeito.addEventListener('click', () => {
    editarNovaTarefa('feito');
});

btnCancelarNovaFeito.addEventListener('click', () => {
    cancelarNovaTarefa('feito');
});


function atualizarTextoNome(){
    txtNomeQuadro.textContent = nomeQuadro;
}

atualizarTarefasAFazerVisualmente();
atualizarTarefasFazendoVisualmente();
atualizarTarefasFeitoVisualmente();

atualizarTextoNome();