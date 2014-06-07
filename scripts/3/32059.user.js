// ==UserScript==
// @name           dark-fux
// @namespace      h&H
// @description    Set every form input to use a dark background and a light text colour.
// @include        *
// ==/UserScript==

// updated:  2008-09-02

var _style_background_colour = '#0a0a0f';
var _style_text_colour = '#f0fafa';
// var _style_background_url = 'http://x.hell-and-heaven.org/web-readability/black.png';   // there's a white.png also.
//  black.png : 		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFAQMAAABPQU9RAAAAA1BMVEUKCg/AvU0XAAAAFElEQVR4XlXAIQEAAACAIP+vNkMaAA8AAbpPjLEAAAAASUVORK5CYII=);



// don't edit below this line. unless you know what are you doing.
// don't edit below this line. unless you know what are you doing.
// don't edit below this line. unless you know what are you doing.


Array.prototype.concatCollection  =  function _concat(collection){
	var len = collection.length;
	while(len){
	    this.push(collection[--len]);	
	}
}
function dummy()  {
    this.data = '';
 }; 



var _style_ = 'background: none; background-color: ' +  _style_background_colour  +  ' !important; color:' + _style_text_colour +  ' !important;';

GM_addStyle('textarea , textarea:hover, textarea:focus, input, input:hover, input:focus, select, select:hover, select:focus, option, option:hover, option:focus {  '+   _style_  + '  }');


var elements = Array();
 elements.concatCollection(document.getElementsByTagName('input'));
 elements.concatCollection(document.getElementsByTagName('textarea'));
 elements.concatCollection(document.getElementsByTagName('select'));
 
/* uncomment for debug
var d = document.createElement('div');
 d.setAttribute('id','zing');
 d.setAttribute('style','float:left; position:absolute; top:0px; padding: 10px; background-color: #000; color:#999;');
 d.addEventListener('click',function(){  d.innerHTML = '';  },false);
 document.getElementsByTagName('body')[0].appendChild(d);
*/
 
 
 
var _data = new dummy(); 
var len = elements.length;
while(len){	
	e=elements[--len];
//	e.setAttribute('style','background-color:#0a0a0f; color:#f0fafa;'); 
	e.addEventListener('click', function(event) {  		
		window.setTimeout(  function(_t){ 
			d.innerHTML += 'before:<br/>';
			d.innerHTML += (e.id != undefined && e.id != '' ? e.id+': ' : '') + 'bg: ' +  e.style.background  + ' bgColour:'  +  e.style.backgroundColor  + ' colour: ' +  e.style.color  + '<br/>';
			d.innerHTML +=  e.style.backgroundImage + '<br/>';
			d.innerHTML += 'class:' + e.className + '<br/>';
			d.innerHTML += '<br />';
//		    e.removeAttribute('class');
			e.setAttribute('style','background-image:url(http://im-net.hell-and-heaven.org/img.gif) !important;');
			e.style.removeProperty('background');			
//			e.style.removeProperty('background-color');
			e.style.removeProperty('backgroundImage');
//			e.style.background = null;
			e.style.backgroundColor = _style_background_colour;			
			e.style.color = _style_background_colour;
//			e.style.background = _style_background_colour;		
		} , 10);
	} , false);
 //	d.innerHTML += typeof e + ' ' + e + '<br />';  // uncomment for debug
}