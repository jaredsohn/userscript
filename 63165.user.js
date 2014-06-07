// ==UserScript==
// @name           Craque da Galera - Conca 2.0
// @namespace      -
// @include        *globoesporte.globo.com/Esportes/Futebol/Brasileirao/Serie_A/Craque_da_Galera/0,,16386,00*
// ==/UserScript==

/*var votacao = document.getElementById("inicio-votacao")
var continuar = votacao.getElementsByClassName("bt-continuar")[0]
clicar(continuar)*/

var input = document.getElementById("answer")
var lista = input.parentNode.parentNode
var codigo = lista.childNodes[1].childNodes[1]

var item = lista.appendChild(document.createElement('li'))
var votos = item.appendChild(document.createTextNode(""))
var br = item.appendChild(document.createElement('br'))
var tempo = item.appendChild(document.createTextNode(""))
    item.id = 'itemContagem'
    item.votos = 0
    item.tempo = {'horas':0, 'minutos':0, 'segundos':0}
    item.aumentar = function(){ item.votos++; item.registrar() }
    item.registrar = function()
        { votos.data = item.votos + ' voto(s)' }
    item.style.margin = '10px'
    item.style.minWidth = '250px'
    item.registrar()

var erro = item.insertBefore(document.createElement('span'), br)
    erro.innerHTML = 'Erro!'
    erro.style.font = 'inherit'
    erro.style.display = 'inline'
    erro.style.marginLeft = '7px'
    erro.style.color = 'red'
    erro.value = function(value)
    {
        if(value) this.style.visibility = 'visible'
        else this.style.visibility = 'hidden'
    }
    erro.value(false)

var validacao = document.getElementsByClassName('validacao')[0]
var formulario = document.getElementById('formulario')
var janela = document.createElement('iframe')
    formulario.target = janela.name = 'janelaResultado'
    janela.style.border = '1px solid black'
    janela.style.display = 'none'
validacao.appendChild(janela)


    janela.addEventListener('load', function()
    {
       janela.removeEventListener('load', arguments.callee, true)
       janela.addEventListener('load', votado, true)
    }, true)


    input.addEventListener('keypress', function(e)
    {
       temporizar(true)
       parar(true)
    }, true)

    votado.tentativas = 0
	
    config('1')

    input.value = ''
    //setInterval(temporizar, 1000)


// Corrigir Clique do Submeter
var ancora = validacao.getElementsByClassName('botao')[0].childNodes[1]
    ancora.addEventListener('click', function(e)
    {
       temporizar(true)
       parar(false)
       location.href = ancora.href + 'void(0)'
       e.preventDefault()
    }, true)


// Corrigir Bug do F5 firefox
document.addEventListener('keypress', function(e)
{
    var F5 = 116
    if(e.keyCode == F5)
        location.href = location.href,
        e.preventDefault()
}, true)



function clicar(target)
{
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent('click', true, true,window, 1, 1, 1, 1, 1, 	false, false, false, false, 0, target);
    target.dispatchEvent(e);
}

function votado()
{
    var href = janela.contentWindow.location.href
    var exito = (href.indexOf("p-2-1,00")!=-1)? false:
        (href.indexOf("p-1,00")!=-1)? true: null
    if(exito==null) return alert(''+
        'Ocorreu um erro ao votar\n'+
        'Envie os detalhes abaixo para o criador do script\n\n'+
        'Erro Desconhecido\n'+
        'URL: ' + href
    )
    erro.value(!exito)
    if(exito) item.aumentar()

    var src = 'http://votacaotv.globo.com/envotacao/word.jpg?'
    codigo.src = src + votado.tentativas++
    input.value = ''
    parar(true)
}

function config(n)
{
    var x = document.getElementById('formulario')
    var inp = x.getElementsByTagName('input')
    inp = Array.prototype.slice.call(inp)
    for(var i=0; i<inp.length; i++)
        if(inp[i].name=='opt') opt(inp[i])
    
    function opt(opt)
    {
        opt.value = n
        opt.addEventListener('click', function()
        { input.focus() }, true)
    }
}

function temporizar(habilitado, loop)
{
    if(!habilitado)
    {
       clearTimeout(temporizar.time)
       return temporizar.time = null
    }
    else if(temporizar.time && !loop) return

    item.tempo.segundos++
    if(item.tempo.segundos>=60) item.tempo.segundos = 0,    	 item.tempo.minutos++
    if(item.tempo.minutos>=60) item.tempo.minutos = 0,
       item.tempo.horas++

    var msg = ''
    if(item.tempo.horas>0) msg+= item.tempo.horas + ' hora(s) '
    if(item.tempo.minutos>0) msg+= item.tempo.minutos + ' minuto(s) '
    if(item.tempo.segundos>0) msg+= item.tempo.segundos + ' segundo(s)'
    tempo.data = msg

    if(habilitado) temporizar.time = setTimeout(function()
    { temporizar(true, true) }, 1000)
}

function parar(habilitado)
{
    if(parar.time) clearTimeout(parar.time)
    if(habilitado) parar.time = setTimeout(function()
    { temporizar(false) }, 2000)
}
