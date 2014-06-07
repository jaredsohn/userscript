// ==UserScript==
// @name D2JSP custom bbcode button
// @namespace MEH
// @description adds custom bbcode buttons
// @author ikusus
// @license wtfpl
// @include http://forums.d2jsp.org/*.php*
// @version  1
// ==/UserScript==

function __insf() {
var buttons = [
{
"name": "color",
"html": "<img src='http://forums.d2jsp.org/html/emoticons/ph34r.gif' />",
"code": {
 "click": function() {
  bbcode_in("[B][COLOR=Purple]", "[/COLOR][/B]");
 }
}
}
]

var box = document.createElement("div");
box.setAttribute("class", "bbcodebox" );

for( i in buttons ) {
var a = document.createElement("a");
qc = buttons[i]["code"];
for( j in qc )
a.addEventListener( j, qc[j], false );
a.innerHTML = buttons[i]["html"];
a.title = buttons[i]["name"];
box.appendChild( a );
}

document.body.appendChild( box );
}

function bbcode_in(_o,_c) {
_t = "";
var ppx = document.getElementsByName('Post');
if (ppx.length == 0) {
ppx = document.getElementsByName("note");
}
for(iq in ppx) {
p = ppx[iq];
if( p )
 p.focus();

ms=_o.length;
if(document.selection && document.selection.createRange) {
 var s = document.selection.createRange();
 _x=s.text!=""?s.text:_t;
 s.text = txt = _o+_x+_c;
 s.moveStart('character',-txt.length+ms);
 s.moveEnd('character',-txt.length+ms+_x.length);
 s.select();
} else if(p.selectionStart!='undefined') {
 _s=p.selectionStart;
 _e=p.selectionEnd;
 _x=p.value.substring(_s,_e);
 if(_x=="")_x=_t;
 txt = _o+_x+_c;
 p.value=p.value.substr(0,_s)+txt+p.value.substr(_e);
 p.selectionEnd=p.selectionStart=_s+ms;
 p.selectionEnd+=_x.length;
} else{
 p.value+=_o+_c;
}
}
}

function link_in(url) {
document.location = url;
}


var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "div.bbcodebox{ color: #000; width: 30px; position: fixed; top: 0px; left: 0px; opacity: 0.1; z-index: 9999999; }\n";
style.innerHTML += "div.bbcodebox:hover{ opacity: 1; }\n";
style.innerHTML += "div.bbcodebox a{ color: #fff;cursor: pointer; display: block;}\n";
document.getElementsByTagName("head")[0].appendChild(style);


var __insb = document.createElement("script");
__insb.textContent = "\n" + bbcode_in + "\n" + link_in + "\n" + __insf + "\n\n__insf();";
__insb.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(__insb);