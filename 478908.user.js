// ==UserScript==
// @name        JSNaker
// @namespace   jsnaker
// @description Shows the javascript of a web page with just one click
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

divLayer = document.createElement("div")
divOpener = document.createElement("div")
divInformer = document.createElement("div")
codeInformer = document.createElement("code")

divLayer.style.width = "100%"

divOpener.style.background = "black"
divOpener.style.color = "rgb(0,250,0)"
divOpener.style.display = "fixed"
divOpener.style.left = "15"
divOpener.style.top = "15"
divOpener.style.width = "50px"
divOpener.style.height = "20px"
divOpener.innerHTML = " + "

divInformer.style.width = "100%"
divInformer.style.background = "white"
divInformer.style.color = "black"
divInformer.style.padding = "10px"
divInformer.style.display = "none"
divInformer.style.fontSize = "12px"
divInformer.style.zIndex = "1000"
divInformer.style.textAlign = "left"

codeInformer.setAttribute("class" , "language-javascript")
codeInformer.contentEditable = true

//La "chicha"
scripts = document.getElementsByTagName("script")
for ( i=0 ; i<scripts.length ; i++ ) {
    fuente = scripts[i].src
    contenido = scripts[i].innerHTML
    codeInformer.appendChild(document.createElement("hr"))
    codeInformer.appendChild(document.createTextNode("//Number of Script: "+i))
    codeInformer.appendChild(document.createElement("br"))
    codeInformer.appendChild(document.createTextNode("//Source: " + fuente))
    codeInformer.appendChild(document.createElement("br"))
    codeInformer.appendChild(document.createTextNode("//Content: "))
    codeInformer.appendChild(document.createElement("br"))
    codeInformer.appendChild(document.createTextNode(contenido))
}

divOpener.onclick = function() { 
    console.log("Displaying/Hiding JavaScript")
    if ( divInformer.style.display === "block" ) { divInformer.style.display = "none" }
    else { divInformer.style.display = "block" }
}

divInformer.appendChild(codeInformer)

divLayer.appendChild(divOpener)
divLayer.appendChild(document.createElement("br"))
divLayer.appendChild(divInformer)

document.body.insertBefore(divLayer, document.body.children[0])