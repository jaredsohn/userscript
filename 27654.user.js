// ==UserScript==
// @name           textarea autoresize
// @namespace      http://eldar.cz/myf/firefox/
// @include        http://*
// ==/UserScript==

var className = '____namespace____'
, els
, el
, i
;


els = document.getElementsByTagName('textarea');
i = -1;
while ( el = els[++i] ) {
 el.className += ' '+className;
//  txr.apply(el);
 el.addEventListener('focus', txr, true);
 el.addEventListener('keyup', txr, true);
 el.addEventListener('blur'
 , function(){this.style.height = '' ; this.style.width = '';}
 , true
 );
}

function txr () {
 if ( this.value ) {
  if ( this.clientHeight < this.scrollHeight ) {
   this.style.height = this.scrollHeight+'px';
  }
  if ( this.clientWidth < this.scrollWidth ) {
   this.style.width = this.scrollWidth+'px';
  }
 } else {
  this.style.height = '';
  this.style.width = '';
 }
}

els = document.getElementsByTagName('input');
i = -1;
while ( el = els[++i] ) {
 if( !el.type || el.type == 'text' ) {
  el.className += ' ' + className;
//   itr.apply(el);
  el.addEventListener('focus', itr, true);
  el.addEventListener('keyup', itr, true);
  el.addEventListener('keydown', itr, true);
  el.addEventListener('blur'
  , function(){this.removeAttribute('size')}
  , true
  );
 }
}

function itr () {
//  if ( this.clientWidth < this.scrollWidth ) {
//    alert( this.clientWidth +' '+ this.scrollWidth );
  this.size = this.value.length+2;
//   this.style.width = this.scrollWidth+'px';
//  }
}

var css
= 'textarea.'+className+':focus'
+ '{'
+ 'overflow: hidden !important;'
+ 'padding: 0 !important;'
+ 'border: none !important;'
// + 'background-color: #000 !important;'
// + 'color: #fff !important;'
+ 'font-family: monospace !important;'
+ 'font-size: 10pt !important;'
+ '}'
+ 'input.'+className+':focus'
+ '{'
// + 'padding: 0 !important;'
// + 'border: none !important;'
+ 'font-family: monospace !important;'
+ 'font-size: 10pt !important;'
+ 'width: auto !important;'
+ '}'
;
if ( typeof GM_addStyle != "undefined" ) {
	GM_addStyle(css);
} else if ( typeof addStyle != "undefined" ) {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if ( heads.length > 0 ) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node);
	}
}


/* EOF */
