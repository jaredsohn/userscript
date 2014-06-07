// ==UserScript==
// @name           Prostokvashino
// @namespace      habrahabr.ru
// @description    habrahabr.ru/post/213263
// @include        http://*.habrahabr.ru/post/*
// @include        http://habrahabr.ru/post/*

var MARKER = '[also]';
var floatingDiv = null;

function showMarkedComments () {
	var commentsBlock = document.getElementById('comments');
	var eltList = commentsBlock.getElementsByTagName('div');
	var found = [];
	
	for(var j=0; j<eltList.length; ++j) {
		var elt = eltList[j];
		if(elt.className != 'comment_body' ) continue;

// now elt has two sub-divs - info with author and div with text
// in version 0.1 we're ignoring authors and other technical stuff - just use div with text

		for(var k=0; k < elt.childNodes.length; ++k) {
			if(elt.childNodes[k].nodeName.toLowerCase() == "div") {
				divtxt = elt.childNodes[k].innerHTML;
				if(divtxt.indexOf(MARKER) < 0) continue;
				xlog('div['+j+']['+k+'] FOUND IN class: ' + elt.childNodes[k].className + ', text = ' + divtxt.length);
				found.push(divtxt);
				break;
			}
		}
	}

// in found, we have list of HTML texts together with marker. 
// All we need is to place it in floating div and make it visible
	if(found.length < 1) return;
	
	var buf = new StringBuffer();
	for(var j = 0; j < found.length; ++j) {
		buf.append('<div id="comment_"'+j+' class="comment_item">\n');
		buf.append('<div class="comment_body">');
		buf.append('<div class="message html_format "><hr/>');
		buf.append(found[j]);
		buf.append('</div>');
		buf.append('</div>\n');
		buf.append('</div>\n');
	}
	buf.append('<hr/>');
	floatingDiv.innerHTML = buf.toString();
	floatingDiv.style.top = (window.pageYOffset + 10) + 'px';
	floatingDiv.style.display = '';
}

// couple of utilities
// simple string buffer
function StringBuffer() { 
    this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string) { 
    this.buffer.push(string); 
    return this; 
}; 

StringBuffer.prototype.toString = function toString() { 
    return this.buffer.join(""); 
}; 

// ... and wrappers
function xlog(o) {
	console.log('...prostokvashino: ' + o);
}

function makeFloatingDiv() {
    if(!floatingDiv) {
        floatingDiv = document.createElement('div');
        
        floatingDiv.style.backgroundColor = '#f2f2f2';
        floatingDiv.style.borderColor = 'red';
        floatingDiv.style.borderWidth = '2px';
        floatingDiv.style.borderStyle = 'groove';
        floatingDiv.style.padding = '2px';
        floatingDiv.valign = 'top';
        floatingDiv.align = 'left';
        floatingDiv.style.display = 'none';

        floatingDiv.textAlign = 'left';
        floatingDiv.style.overflow = 'auto';

        floatingDiv.style.display = 'none';
        floatingDiv.innerHTML = "...";
    }
    return floatingDiv;
}

// such code to register handlers, create links etc.

function mk_Link(code, label) {
    var newElt = document.createElement('a');
    newElt.appendChild(document.createTextNode('[' + label + ']'));
    newElt.href= 'javascript:void(-' + code + ')';
    return newElt;
}

function makeDivWExtraLinks() {
    var xdiv = document.createElement('span');
    xdiv.appendChild(document.createElement('br'));
    xdiv.appendChild(document.createElement('br'));
    xdiv.appendChild(mk_Link(1, 'See additions to post'));
    return xdiv;
}

function goLoad() {
	// starting here: extra links plus other stuff
	var commentsBlock = document.getElementById('comments');
        commentsBlock.parentNode.insertBefore(makeFloatingDiv(), commentsBlock);
	commentsBlock.parentNode.insertBefore(makeDivWExtraLinks(), floatingDiv);
	floatingDiv.addEventListener('click', goHide, true);
}

function goHide(event) {
    if(event.target.style.display != 'none') 
    	event.target.style.display = 'none';
}

function goClick(event) {
    if(event.target.href) {
        var j = event.target.href.indexOf('javascript:void(-');
        if( j >=0 ) {
// kind is group of operations' prefix: 0..9
            var kind = event.target.href.substring(j + 16, j + 18);
            gmclick(kind, event.target.href);
        }
    }
}

function gmclick(kind, lnk) {
    if(kind == '-1') showMarkedComments();
}

window.addEventListener("load", goLoad, true);
document.addEventListener('click', goClick, true);

// ==/UserScript==
