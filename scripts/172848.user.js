// ==UserScript==
// @name Facebook ChatPlus
// @include http://www.facebook.com/*
// @include http://apps.facebook.com/*
// @version 1.4.3
// @author Koezzt
// @description This script add a nice emoticons bar to your Facebook Chat.
// @icon
// ==/UserScript==
//



// Lista delle emoticons di FB
/*
standard: :) , :D , :( , :p , >:( , -_- , :/ , :\ , o.O , >:O , :V , 3:) , :O , :3 , ;) , :* , 8) , ? , 8| , ^_^ , O:)
extra: :putnam: , (^^^) , <(") , :42: , :|], <(")
*/


var emoticonsListS = new Array();
var emoticonsListE = new Array();
var emoticonsListC = new Array();
var debugMode = false;
// standard emoticons
emoticonsListS[0] = ":)";
emoticonsListS[1] = ":(";
emoticonsListS[2] = ":p";
emoticonsListS[3] = ":D";
emoticonsListS[4] = ":o";
emoticonsListS[5] = ";)";
emoticonsListS[6] = "8)";
emoticonsListS[7] = "8|";
emoticonsListS[8] = ">:(";
emoticonsListS[9] = ":/";
emoticonsListS[10] = ":'(";
emoticonsListS[11] = "3:)";
emoticonsListS[12] = "O:)";
emoticonsListS[13] = ":*";
emoticonsListS[14] = "?";
emoticonsListS[15] = "^_^";
emoticonsListS[16] = "-_-";
emoticonsListS[17] = "o.O";
emoticonsListS[18] = ">:O";
emoticonsListS[19] = ":v";
emoticonsListS[20] = ":3";
emoticonsListS[21] = "(y)";
// extra emoticons
emoticonsListE[0] = ":putnam:";
emoticonsListE[1] = "putnam";
emoticonsListE[2] = "(^^^)";
emoticonsListE[3] = "shark";
emoticonsListE[4] = ":42:";
emoticonsListE[5] = "42";
emoticonsListE[6] = ":|]";
emoticonsListE[7] = "robot";
emoticonsListE[8] = "<(\")";
emoticonsListE[9] = "penguin";
// code emoticons
//emoticonsListC[0] = "[[peennissee]]";
emoticonsListC[0] = "[[tiimide]]";
emoticonsListC[1] = "[[tiiimidee]]";
emoticonsListC[2] = "[[Coeur130]]";
emoticonsListC[3] = "[[295390167186206]]";
emoticonsListC[4] = "[[coeur233]]";
emoticonsListC[5] = "[[coeur12]]";
emoticonsListC[6] = "[[315721781819711]]";
emoticonsListC[7] = "[[134823553281107]]";


function initListeners(){

if( document.addEventListener ){
document.addEventListener( 'DOMNodeInserted', creaBarra, false );
document.addEventListener( 'DOMNodeInsertedIntoDocument', creaBarra, false );
debug("aggiunto addeventlistener");
}
else if( document.attachEvent ){
document.attachEvent( 'DOMNodeInserted', creaBarra );
document.attachEvent( 'DOMNodeInsertedIntoDocument', creaBarra );
debug("aggiunto attachevent");
}
}

function creaBarra(event){ //prima di chiamare questo metodo controllo la presenza della barra
try{

var classeChat = 'fbnubflyoutfooter';

var pchild = event.target.getElementsByTagName('div');

var cf = null;
var atmp = pchild;
for(i=0;i<atmp.length;i++){

if(atmp[i].className.toLowerCase().indexOf(classeChat)>=0 && atmp[i].nodeType === 1){

if(atmp[i].id.toLowerCase()=='barra_emoticons'){

return;
}else{
cf = atmp[i];
/*var fbnubflyoutbody = atmp[i].previousSibling;
fbnubflyoutbody.addEventListener('resize',riposizionaBarra,false);*/
break;

}
}

}

if(cf==null){return;}
//inserisco il div
var barra = document.createElement('div');
barra.setAttribute('id','barra_emoticons');
barra.setAttribute('style','background-color: #ffffff; padding-top: 0px; height:17px;');
popolaBarra(barra);
var cop = document.createElement('div');
//<div style="clear: both;"><span style="color:blue;">Facebook ChatPlus by </span><span style="color:red; font-size:8px;"> Giuseppe Maria D'Elia</span></div>
cop.setAttribute('style', 'clear: both;');
cop.setAttribute('id', 'facebook_chatplus_copy');
var cops1 = document.createElement('span');
cops1.setAttribute('style', 'color:blue;');
cops1.innerHTML="Facebook ChatPlus by";
var cops2 = document.createElement('span');
cops2.setAttribute('style', 'color:red; font-size:10px;');
cops2.innerHTML=' <a href="http://gmdelia.eu/" target="_blank" style="text-decoration:none;"> Giuseppe Maria D\'Elia </a>';
cop.appendChild(cops1);
cop.appendChild(cops2);
barra.appendChild(cop);
cf.appendChild(barra);

}catch(e){
debug(e);
}

}



function popolaBarra(barra){
try{

//creo il bottone per minimizzare o massimizzare
var minimize = document.createElement('div');
minimize.setAttribute('id','fbcp_minimize');
minimize.setAttribute('style','cursor:pointer;margin:0px 0 5px;background-color:#3B5998;color:white;font-weight:bold; width:auto;text-align:center;');
minimize.innerHTML="Open Facebook ChatPlus";
minimize.addEventListener('click',showBarra,false);
barra.appendChild(minimize);
// inizio la lista di emoticons
var lista = document.createElement('li');
lista.setAttribute('id' , 'listaEmoticons');
lista.setAttribute ('style', 'display:inline; visibility:hidden;');
//inserisco prima le emoticons standard
var posX = 0;
var posY = 0;
var cont = 1;
for(i=0;i<emoticonsListS.length;i++){
emm = document.createElement('ul');
emm.setAttribute('id','ul_emoticon_'+cont);
emm.setAttribute('style','display:inline;');
imag = document.createElement('img');
imag.setAttribute('id','img_emoticon_'+cont);
imag.setAttribute('alt', emoticonsListS[i]);
imag.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
imag.setAttribute('style',"cursor: pointer; background: url('') no-repeat scroll " + posX +"px "+ posY +"px transparent; height:16px; width:16px; ");

emm.appendChild(imag);
lista.appendChild(emm);
posX -=16;
imag.addEventListener('click', handleImg, false);
cont++;

}
//inserisco le emoticons extra
for(i =0; i<emoticonsListE.length ; i += 2){
emm = document.createElement('ul');
emm.setAttribute('id','ul_emoticon_'+cont);
emm.setAttribute('style','display:inline; cursor: pointer;');
imag = document.createElement('img');
imag.setAttribute('id','img_emoticon_'+cont);
imag.setAttribute('alt', emoticonsListE[i]);
imag.setAttribute('src','http://static.ak.fbcdn.net/images/emote/'+ emoticonsListE[i+1] + '.gif');

emm.appendChild(imag);
lista.appendChild(emm);
imag.addEventListener('click', handleImg, false);
cont++;
}
//inserisco le emoticons code
for(i =0; i<emoticonsListC.length ; i++){
emm = document.createElement('ul');
emm.setAttribute('id','ul_emoticon_'+cont);
emm.setAttribute('style','display:inline; cursor: pointer;');
imag = document.createElement('img');
imag.setAttribute('id','img_emoticon_'+cont);
imag.setAttribute('alt', emoticonsListC[i]);
imag.setAttribute('height', '16px');
var nameEmo = emoticonsListC[i].substring(2,emoticonsListC[i].length-2);
imag.setAttribute('src','http://graph.facebook.com/'+ nameEmo + '/picture');
emm.appendChild(imag);
lista.appendChild(emm);
imag.addEventListener('click', handleImg, false);
cont++;
}


barra.appendChild(lista);
}catch(e){
debug(e);
}
}

function handleImg(event){
inserisciInChat(event.target);
}

function inserisciInChat(elem){
var listaemoticons = elem.parentNode.parentNode;
var barra = listaemoticons.parentNode;
var inputcontainer = barra.previousSibling;
while(inputcontainer.className.toLowerCase().indexOf('inputcontainer')<0){
inputcontainer = inputcontainer.previousSibling;
}
var arrayInput = inputcontainer.getElementsByTagName('textarea');

var str = elem.getAttribute('alt');

for (i =0;i<arrayInput.length; i++){
if (arrayInput[i].className.toLowerCase().indexOf('input')>=0){
arrayInput[i].value += " " + str + " ";
arrayInput[i].focus();

break;
}
}


}


function showBarra(event){


var fbnubflyoutfooter = event.target.parentNode.parentNode;
var fbnubflyoutbody = fbnubflyoutfooter.previousSibling;
var fbnubflyoutheader = fbnubflyoutbody.previousSibling;
var fbnubflyoutinner = fbnubflyoutheader.parentNode;
var fbnubflyoutouter = fbnubflyoutinner.parentNode;
var fbnubflyout = fbnubflyoutouter.parentNode;
var vbnubchattab = fbnubflyout.parentNode;
var barra = event.target.parentNode;
var minimize = event.target;
var listaemoticons = minimize.nextSibling;

hgt = parseInt(fbnubflyoutbody.style.height);

var altezzaemo = 75;
if(listaemoticons.style.visibility == "hidden"){
listaemoticons.style.visibility = "visible";

minimize.innerHTML= "Close Facebook ChatPlus";
fbnubflyoutfooter.style.height= "120px";
fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";


}else{
listaemoticons.style.visibility = "hidden";


minimize.innerHTML= "Open Facebook ChatPlus";
fbnubflyoutfooter.style.height= "auto";
fbnubflyoutbody.style.height=(hgt+altezzaemo)+"px";

}


}


function debug(e){
if(debugMode){
alert(e);
}
}
//aggiungo il listener per il click sulla chattab nella dock bar
initListeners();