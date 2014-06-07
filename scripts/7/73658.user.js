// No licence, found without any info, uploaded for my convenience :)

// ==UserScript==
// @name           Hit-a-hint
// @namespace      none
// @description    Press f to highlight links with a number, type number to follow link (like in vimperator) 
// @include       *
// ==/UserScript==

var bgcolor = '#FF0'
var color = '#000'
var hintlist = new Array()
var hintedlinks = new Array()
var map = new Array()
var mapindex = 0
var choice = ''
var keycodemapping = {
    '48':'0','49':'1','50':'2',
    '51':'3','52':'4','53':'5','54':'6',
    '55':'7','56':'8','57':'9',
    '13':'Enter','27':'Esc','8':'Bkspc'
    }
var originalTitle = document.title
function drawHints(){
    document.addEventListener('keypress',interpretKeyStroke,true)
    document.title+=' - '
    var allLinks = document.getElementsByTagName('a')
    var viewportStart = window.pageYOffset - 5
    var viewportEnd = viewportStart + window.innerHeight + 10
    for (var i=0;i<allLinks.length; i++){
        linkYcoord = getAbsoluteY(allLinks[i])
        if (linkYcoord > viewportStart && linkYcoord < viewportEnd && allLinks[i].href != ''){
            hintedlinks.push(allLinks[i])
        }
    }
    for (var i = 0;i<hintedlinks.length; i++){
        var hint = document.createElement('span')
        hintlist.push(hint)
        hint.style.backgroundColor=bgcolor
        hint.style.color=color
        hint.style.position='absolute'
        hint.innerHTML = mapindex
        map[mapindex]=hintedlinks[i].href
        mapindex++
        hintedlinks[i].appendChild(hint,hintedlinks[i])
    }
}
function getAbsoluteY(element){
    var y = 0
    while (element) {
        y += element.offsetTop
        element = element.offsetParent
    }
    return y
}
function removeHints(){
    for (var i=0; i<hintedlinks.length; i++){
        hintedlinks[i].removeChild(hintlist[i],hintedlinks[i])
    }
    choice=''
    document.title=originalTitle
    document.removeEventListener('keypress',interpretKeyStroke,true)
    delete map
    delete hintlist
    delete hintedlinks
}
function getURLchoice(){return (map[choice]==undefined) ? False : map[choice]}
function interpretKeyStroke(e){
    e.preventDefault()
    var key=keycodemapping[(typeof event!='undefined')?window.event.keyCode:e.keyCode]
    if(key=='Enter'){
        location.href=getURLchoice()
        removeHints()
    }else if(key=='Esc'){
        removeHints()
    }else if(key=='Bkspc'){
        choice=choice.slice(0,-1)
        document.title=document.title.slice(0,-1)
    }else if(key == undefined){
        removeHints()
    }else{
        choice+=key
        document.title+=key
        if((''+choice).length>=(''+mapindex).length){
            location.href=getURLchoice()
            removeHints()
        }
    }
}

drawHints()