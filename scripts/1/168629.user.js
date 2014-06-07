// ==UserScript==
// @name	bitcoin_qr
// @description	display QR codes for bitcoin addresses in the website
// @include	*
// ==/UserScript==

/**
 * written by prof7bit - bitcoin:1MHCqXWPiZDQiiKHsEZXfNGNFU7tWdUZoe
 */

function dbg(x){
    // uncomment this to see log messages in the console
    // GM_log(x);
}

function qr_show(event, addr){
    dbg(addr)
    
    var x = event.pageX + 5;
    var y = event.pageY + 5;
    if (event.clientX > 290) {
        x -= 290
    }
    if (event.clientY > 290) {
        y -= 290
    }
    
    var div = document.getElementById("qr_popup");
    if (!div) {
        div = document.createElement("div");
        div.id = "qr_popup";
        div.style.background = "white";
        div.style.border = "none";
        div.style.padding = "10px";
        div.style.position = "absolute";
        div.style.zIndex = "99999"
        div.style.boxShadow = "0px 0px 50px 10px #999";
        document.body.appendChild(div);
    }
    div.innerHTML = '<img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chld=L|0&chl=bitcoin:' + addr + '">';
    div.style.left = x  + "px";
    div.style.top = y + "px";
}

function qr_hide(){
    var div = document.getElementById("qr_popup");
    if (div){
        document.body.removeChild(div);
    }
}

function qr_mousemove(e){
    if (!e){
        e = window.event;
    }
    var range;
    var textNode;
    var offset;
    
    // standard
    if (document.caretPositionFromPoint) {
        range = document.caretPositionFromPoint(e.clientX, e.clientY);
        textNode = range.offsetNode;
        offset = range.offset;
         
    // WebKit
    } else if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(e.clientX, e.clientY);
        textNode = range.startContainer;
        offset = range.startOffset;
    }
    
    // find the word at this offset
    if (textNode && textNode.nodeType == 3) {
        var text = textNode.textContent
        
        var start = offset;
        while (start > 0 && text[start - 1].match(/[0-9A-Za-z]/)) {
            start--;
        }        
        
        var end = offset;
        while (end < text.length && text[end].match(/[0-9A-Za-z]/)) {
            end++;
        }        
        
        var word = text.substring(start, end)
        if (word.match(/^[1|3][1-9A-HJ-NP-Za-km-z]{26,33}$/)) {
            qr_show(e, word);
        }else{
            qr_hide()
        }
    }else{
        qr_hide()
    }
}

window.addEventListener('mousemove', qr_mousemove, true);
dbg('bitcoin_qr initialized');
