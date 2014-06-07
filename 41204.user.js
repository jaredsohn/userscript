// ==UserScript==
// @name           QuizzifyWikipedia
// @namespace      blah
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

function init() {
var but = document.createElement('button');
but.innerHTML = "<b>quiz</b>";
but.setAttribute('style',"font-size:12px;margin:0px 10px 0px 10px;");
var but2 = document.createElement('button');
but2.innerHTML = "<b>reset</b>";
but2.setAttribute('style',"font-size:12px;margin:0px 10px 0px 10px;display:none;");
var h1s = document.getElementsByTagName('h1');
for (var i=0;i<h1s.length;i++) {
var h1 = h1s[i];
if (h1.getAttribute('class') == 'firstHeading') {
h1.appendChild(but);
h1.appendChild(but2);
break;
}
}
//var top = document.getElementById('top');
//var h1 = top.nextSibling.nextSibling.getElementsByTagName('h1')[0];

//h1.parentNode.insertBefore(but,h1.nextSibling);
//document.body.insertBefore(but,document.body.childNodes[0]);
but.setAttribute('quiz','false');
var onclickstring = "if (this.getAttribute('quiz') == 'false') { this.nextSibling.setAttribute('style','font-size:12px;margin:0px 10px 0px 10px;');this.setAttribute('quiz','true');var quizdivs = document.getElementsByTagName('quizdiv');for (var i=0;i<quizdivs.length;i++) {var qd=quizdivs[i];var a=qd.getElementsByTagName('a')[0];var textarea=qd.getElementsByTagName('input')[0];a.setAttribute('style','display:none;');var style = textarea.getAttribute('style');var ind = style.indexOf('display');ind=ind+8;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'inline'+style.substring(ind2,style.length);textarea.setAttribute('style',style);}} else { this.nextSibling.setAttribute('style','font-size:12px;margin:0px 10px 0px 10px;display:none;');this.setAttribute('quiz','false');var quizdivs = document.getElementsByTagName('quizdiv');for (var i=0;i<quizdivs.length;i++) {var qd=quizdivs[i];var a=qd.getElementsByTagName('a')[0];var textarea=qd.getElementsByTagName('input')[0];a.setAttribute('style','');var style = textarea.getAttribute('style');var ind = style.indexOf('display');ind=ind+8;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'none'+";
onclickstring = onclickstring + "style.substring(ind2,style.length);textarea.setAttribute('style',style);}}"
but.setAttribute('onclick',onclickstring);
but2.setAttribute('onclick',"var quizdivs = document.getElementsByTagName('quizdiv');for (var i=0;i<quizdivs.length;i++) {var qd=quizdivs[i];var textarea=qd.getElementsByTagName('input')[0];textarea.value='';var a=qd.getElementsByTagName('a')[0];a.setAttribute('style','display:none;');var style = textarea.getAttribute('style');var ind = style.indexOf('display');ind=ind+8;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'inline'+style.substring(ind2,style.length);textarea.setAttribute('style',style);}");
var content = document.getElementById('bodyContent');
var links = content.getElementsByTagName('a');
var quizdivnum = 0;
var bool = true;


for (var i=0;i<links.length;i++) {
var link = links[i];
if (link.textContent == "show") {
window.location = link.getAttribute('href');
}
}

for (var i=0;i<links.length;i++) {
var link = links[i];

var answer = links[i].textContent;
if (link.id == "See_also") {
bool = false;
}
if (bool) {
var href = link.getAttribute('href');
if (href) {
if (href.indexOf("#") != 0) {
if (link.innerHTML.indexOf("<img") == -1) {

if (answer.indexOf("[") == -1) {
if ((answer != "edit")&&(answer != "hide")&&(answer != "show")&&(answer != "v")&&(answer != "d")&&(answer != "e")) {
quizdivnum++;
var quizdiv = document.createElement('quizdiv');
var textarea = document.createElement('input');
textarea.setAttribute('type','text');
//textarea.setAttribute('value',answer);
textarea.setAttribute('answer',answer);
textarea.setAttribute('id','quiz_div_'+String(quizdivnum));
textarea.setAttribute('nextid','quiz_div_'+String(quizdivnum+1));
textarea.setAttribute('onKeyUp',"var value=this.value.toLowerCase();var answer=this.getAttribute('answer');this.value=answer.substring(0,value.length);value=this.value.toLowerCase();answer=answer.toLowerCase();if ((answer == value)) {try{document.getElementById(this.getAttribute('nextid')).focus();}catch(e){}var style = this.getAttribute('style');var ind = style.indexOf('border-color');ind=ind+13;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'green'+style.substring(ind2,style.length);this.setAttribute('style',style);var link=this.parentNode.getElementsByTagName('a')[0];var textarea=this;var buttons=this.parentNode.getElementsByTagName('span')[0];link.setAttribute('style','');var style = textarea.getAttribute('style');var ind = style.indexOf('display');ind=ind+8;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'none'+style.substring(ind2,style.length);textarea.setAttribute('style',style);buttons.setAttribute('style','display:none;');} else {var style = this.getAttribute('style');var ind = style.indexOf('border-color');ind=ind+13;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'red'+style.substring(ind2,style.length);this.setAttribute('style',style);}");
//textarea.setAttribute('onchange',"var value=this.value.toLowerCase();var answer=this.getAttribute('answer').toLowerCase();if (answer == value) {try{document.getElementById(this.getAttribute('nextid')).focus();}catch(e){}var link=this.parentNode.getElementsByTagName('a')[0];var textarea=this;var buttons=this.parentNode.getElementsByTagName('span')[0];link.setAttribute('style','');textarea.setAttribute('style','display:none;');buttons.setAttribute('style','display:none;');}");
textarea.setAttribute('onchange',"try{document.getElementById(this.getAttribute('nextid')).focus();}catch(e){}var value=this.value.toLowerCase();var answer=this.getAttribute('answer').toLowerCase();var link=this.parentNode.getElementsByTagName('a')[0];this.value=this.getAttribute('answer');var textarea=this;var buttons=this.parentNode.getElementsByTagName('span')[0];link.setAttribute('style','');var style = textarea.getAttribute('style');var ind = style.indexOf('display');ind=ind+8;var ind2=style.indexOf(';',ind);style=style.substring(0,ind)+'none'+style.substring(ind2,style.length);textarea.setAttribute('style',style);buttons.setAttribute('style','display:none;');");
var wid = link.offsetWidth;
wid=0;
if (wid == 0) {
wid = answer.length*4.5;
}
wid+=6;
textarea.setAttribute('style',"border-color:red;font-size:10px;height:12px;display:none;width:"+String(wid)+"px;");
quizdiv.appendChild(textarea);
link.parentNode.insertBefore(quizdiv,link);
quizdiv.appendChild(link);
var buttons = document.createElement('span');
quizdiv.appendChild(buttons);
}
}
}
}
}
}
}

}


init();