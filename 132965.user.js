// ==UserScript==
// @name           Google Hangout Fullscreen
// @namespace      nonw
// @include        *plus.google.com/hangouts*
// @description	  Places a button and keyboard shortcut (f) to toggle fullscreen 
// ==/UserScript==
console.log("it worked!");


function toggleFullscreen(evt) {
    if (evt.keyCode != 70)return;
    var el = document.getElementById("talk_roster").nextSibling.firstChild.firstChild.firstChild.children[2];
    if(el==null)return;

   // if(this.originalHeight==null)this.originalHeight = window.getComputedStyle(el).height;

    var fullHeight = window.innerHeight+"px";//screen.availHeight
    

   // if(window.getComputedStyle(el).height==this.originalHeight){
    if(el.style.height==null||el.style.height==""){
        el.style.height = fullHeight;
        window.scroll(0, getOffset(el).top);
    }
    else {
        el.style.height = null;//originalHeight;
        window.scroll(0,0);
    }

 }

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.parentNode;
    }
    return { top: _y, left: _x };
}

window.addEventListener('keydown', toggleFullscreen, false);

function clicked() {
    toggleFullscreen({keyCode:70});
}

this.btn = document.createElement( 'input' );
with( this.btn ) {
  addEventListener('click', clicked, false);
  setAttribute( 'value', 'Toggle Fullscreen' );
  setAttribute( 'type', 'button' );
}

function waitforit() {
    console.log("waiting for page to load...");
    if(document.getElementById( ":tp.Ij" )==null){
        setTimeout(waitforit,1500);
        return;
    }
    document.getElementById( ":tp.Ij" ).appendChild( this.btn );
}
    

waitforit();
