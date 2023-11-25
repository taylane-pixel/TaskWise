//constante para armazenar os nomes dos elemntos da lista
const localStorageKey = 'task-wise'

//função para validar se existe ou não um item com o mesmo nome na lista
function validarSeExistirNovaTask()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey)|| "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true
}
// função add nova tarefa
function newTask()
{
    let input = document.getElementById('input-new-task');
     //input começar com uma borda sem cor
     input.style.border='';
    // validação
    if(!input.value)
    {
        // cor da borda musa cado não digite nada ao clicar o btn
        input.style.border = '1px solid red';

        alert('Digite a tarefa que deseja inserir em sua lista');
    }
   // evitar inserir dois elementos iguais na lista 
   else if(validarSeExistirNovaTask())
   {
     alert('Já existe uma tarefa com esse nome')

   }
   else
   {
    // incrementar no localStorage o que foi digitado
    /*utilizar um JSON.parse para gerar uma array no que está sendo
    guardado do localStorage com o objetivo de transfomar um string em array*/

    //"[]" é a string a ser convertida

    let values = JSON.parse(localStorage.getItem(localStorageKey)|| "[]");

    // inserir valores no array
    values.push({
        name: input.value
    })
    // para atualizar o valorno localStorage
    // no caso pegar uma array e transformar em uma string
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    showValues();

   }
    // limpar o que foi digitado
    input.value=''
}

// função para mostrar na tela os valores da lista e seus botões

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey)|| "[]");
    // pegara listapara add os elementos
    let list = document.getElementById('list-task');

     // para a lista iniciar sempre vazia
     list.innerHTML = '';
     // laço de repetição
     for(let i = 0; i < values.length; i++)
     {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
      </svg></button></li>`

     }
}
// função deletar intem da lista
function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey)|| "[]");

    // para saber a posição do elemento na array para excluir

    let index = values.findIndex(x => x.name == data);
    // deletar
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    showValues();
}
// função para manter os itens da lista msm se atualizar a página
showValues(); 
