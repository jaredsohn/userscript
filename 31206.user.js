// ==UserScript==
// @name           Oggole
// @namespace      oggole
// @include        http://oggole.pl/index.php?szukaj=*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function remove(el){
  el.parentNode.removeChild(el);
}
function byId(id){
  return document.getElementById(id);
}
function removeArray(ars){
  for(var i=ars.length-1; i>=0; i--){
    remove(ars[i]);
  }
}

window.addEventListener("load", function(){

var header = byId("header");
var cont = byId("main").getElementsByTagName("div")[0];
  cont.setAttribute("id", "cont");
  cont.removeAttribute("align");
document.body.appendChild(header);
document.body.appendChild(cont);

var szukaj = document.createElement("div");
  szukaj.setAttribute("id", "szukaj");
var pytanie = document.createElement("div");
  pytanie.setAttribute("id", "pytanie");
var fraza = document.createElement("span");
  fraza.setAttribute("id", "fraza");

szukaj.appendChild(cont.getElementsByTagName("form")[0]);
if(cont.getElementsByTagName("h1")[0]){
pytanie.appendChild(document.createTextNode("Wyniki wyszukiwań: "));
fraza.innerHTML = cont.getElementsByTagName("h1")[0].innerHTML.replace("Wyniki wyszukiwań: ", "")
}

pytanie.appendChild(fraza);
szukaj.appendChild(pytanie);
document.body.insertBefore(szukaj, cont);
if(cont.getElementsByTagName("h2")[0]){
var h2strony = cont.getElementsByTagName("h2")[cont.getElementsByTagName("h2").length-1];
var strony = document.createElement("div");
strony.setAttribute("id", "strony");
strony.innerHTML=h2strony.innerHTML;
document.body.appendChild(strony);

remove(cont.getElementsByTagName("h1")[0]);
remove(h2strony);
}
removeArray(document.getElementsByTagName("br"));
removeArray(document.getElementsByTagName("center"));
removeArray(document.getElementsByTagName("script"));
removeArray(document.getElementsByTagName("style"));
removeArray(document.getElementsByTagName("link"));

var bajzel = cont.childNodes  //.getElementsByTagName("*");
var kontener = document.createElement("div");
  kontener.setAttribute("class", "kontener");
var l = bajzel.length;
var licz = 0;
for(var i=0; i<l-1; i++){
  //GM_log(i);
  if(bajzel[0].tagName != "IMG"){
    kontener.appendChild(bajzel[0]);
  }
  else{
    remove(bajzel[0]);
    cont.appendChild(kontener);
    kontener = document.createElement("div");
      kontener.setAttribute("class", "kontener");
    licz++;
    if(licz == 3){
      kontener.setAttribute("class", "kontener linia");
      licz = 0;
    }
  }
}


addGlobalStyle("*{  font-family:'Lucida Sans Unicode','Lucida Grande','LucidaGrande','Lucida Sans','Verdana',sans-serif important;}#header, #szukaj, #strony{  width:520px;  margin:20px auto;  text-align:center}#header{  background:#FFFFFF url(http://oggole.pl/image/background_header.jpg) no-repeat scroll center center;  height:150px;}input{  padding:5px;}input[name='szukaj']:active, input[name='szukaj']:focus{  outline:2px #DA0000 solid;}#fraza{  color:#0500E7;  font-weight:bold;  text-decoration:underline;}#cont{  width:900px;  margin:0 auto;} #cont h2{  font-size:11px;  margin:0px;  font-style:italic;} #cont h2:first-child{  font-style:normal;  font-size:15px;}.kontener{  width:300px;  margin-bottom:20px;  float:left;}.linia{  clear:both;}.kontener a img{  border:0px;}#strony{ clear:both;}#strony a{  color:#0070B8;  font-weight:bold;  text-decoration:none;}#strony a:hover{  color:#01A5EC;}");
}, false);
