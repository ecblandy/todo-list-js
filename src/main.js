const estado = {
    tarefas: [
        
    ]
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button').addEventListener('click', () => {
        criaLista()
        filtroSelect()
        verificaCheck()
        contadorTarefasPendentes()
    })
})

// Pega as tarefas pelo filtro.
function filtroSelect() {
    const filtro = document.getElementById('filtro')
    const listasLi = document.querySelectorAll('.list-group-item',)

    filtro.addEventListener('change', () => {
        const valorFiltro = filtro.value
        listasLi.forEach(lista => {
            const checkbox = lista.querySelector('.checkbox')
            const finalizada = checkbox.checked
            if (valorFiltro == 'todas') {
                lista.style.display = 'block'
            } else if (valorFiltro == 'pendentes' && !finalizada) {
                lista.style.display = 'block'
            } else if (valorFiltro == 'finalizadas' && finalizada) {
                lista.style.display = 'block'
            } else {
                lista.style.display = 'none'
            }
        })
    })
}

function criaLista() {
    const nomeTarefa = document.getElementById('tarefaValue').value
    estado.tarefas.push({ nome: nomeTarefa, finalizada: false })
    const ul = document.getElementById('ulLista')
    const li = document.createElement('li')
    ul.appendChild(li)
    li.classList.add('list-group-item', 'mb-1')
    li.innerHTML = `<input type="checkbox" class="checkbox">
    <label class="ms-2 labelText">${nomeTarefa}</label>`
 
}

function verificaCheck(){
    const todosCheckbox = document.getElementsByClassName('checkbox')
    const todasLabel = document.getElementsByClassName('labelText')
    for(let i = 0; i < todosCheckbox.length; i++){
        const checkbox = todosCheckbox[i]
        const label = todasLabel[i]

        checkbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked
            const indiceTarefa = estado.tarefas[i]
            const finish = indiceTarefa.finalizada = isChecked
            finish ? label.classList.add('line') : label.classList.remove('line')
            contadorTarefasPendentes()
        })
    }
}

function contadorTarefasPendentes(){
    const spanContador = document.getElementById('quantidadeTarefa')
    const tarefaFiltrada = filtraNaoFinalizada()
    spanContador.innerHTML = `Você tem um total de ${tarefaFiltrada.length} tarefas pendentes.`

}

function filtraNaoFinalizada(){
    return estado.tarefas.filter(tarefa => !tarefa.finalizada)
}