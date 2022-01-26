
var altura = 0
var largura = 0
var vidas = 1 
var tempo = 10

//Logica para recuperar o nivel selecionado e configurar o tempo de criação dos mosquitos
var criaMosquitoTempo = 1500
var nivelJogo = window.location.search 
nivelJogo = nivelJogo.replace('?','')

if (nivelJogo === 'normal') {
    criaMosquitoTempo = 1500
    
} else if (nivelJogo === 'dificil') {
    criaMosquitoTempo = 1000
    
} else if (nivelJogo === 'chucknorris') {
    criaMosquitoTempo = 750    
}

//Logica pra identificar o tamanho da tela, essa informação será usada para posicionar os mosquitos
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth   

}
ajustaTamanhoPalcoJogo() 


//Cria o mosquito
function posicaoRandomica() {

    // remove os mosquitos criado antes de criar um novo e controla as vidas restantes
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            
            window.location.href = "fim_de_jogo.html"

        } 
        else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas ++
        }
                
    }
    
    // Logica randomica para decidir a posição do mosquito 
    var posicaoX = Math.floor( Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY


    //Logica pra criar o mosquito no elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()        
    }

    document.body.appendChild(mosquito)

}

//Logica para controlar o cronometro de jogo e decidir se houve a vitoria
var cronometro = setInterval (function (){
    if (tempo <= 0) {
        clearInterval (cronometro)
        clearInterval (mosquito)
        window.location.href = "vitoria.html"      
    }
    else {
        tempo -= 1
        document.getElementById('cronometro').innerHTML = tempo
    } 
}, 1000)

// define o tamanho da mosca
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random()* 3)
    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'    
        case 2:
            return 'mosquito3'          
    }    
}

//define o lado do mosquito no eixo x
function ladoAleatorio() {
    var classe = Math.floor(Math.random()* 2)
    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'         
    }    
}

//Logica para verificar se o nivel foi selecionado e passa o valor do nivel selecionado
function iniciarJogo() {
    var nivel = document.getElementById('nivel').value

    if (nivel === '') {
        alert('Selecione um nivel para iniciar o jogo')
        return false    }

    window.location.href = "app.html?" + nivel
}