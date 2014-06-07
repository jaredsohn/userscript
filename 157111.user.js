// ==UserScript==
// @name        ryby-chat
// @namespace   xxx
// @description poprawienie czatu na rybkach
// @include     http://naryby.onet.pl/naryby
// @include     http://lets-fish.com/naryby

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1.4
// ==/UserScript==
//alert("wylogowany")

var akt = "1.4"
var aktPriv=0;
var id;
var listItem = document.createElement("li");
var menuPriv = document.createElement("li");
var komunikat = document.createElement("a");
var trescCzata = '';

$(document).ready(function() {  

   var $;
   try { $ = unsafeWindow.$; }
   catch(e) { $ = window.$; }


var idTab = document.getElementsByTagName("span");

 for (var i=0;i<idTab.length;i++){
	if(idTab[i].className=="user-name")id=idTab[i].innerHTML;

 }

listItem.style.backgroundColor="none";
listItem.innerHTML="Wiadomości do mnie na czacie: <b><span>0</span></b>";
document.getElementById("shoutbox-tabs").insertBefore(listItem,document.getElementById("shoutbox-tabs").getElementsByTagName("li")[0]); 
czyAkt(akt);

menuPriv.id="priv-tab";
menuPriv.className="tab tab-game-chat "
menuPriv.innerHTML='Priv';
document.getElementById("shoutbox-tabs").appendChild(menuPriv); 

menuPriv.addEventListener("click", function() {pokazPriv()}, false); 

 setInterval(function() {
	if(trescCzata!=document.getElementsByTagName("ol")[0].innerHTML){
		mojeWiadomosci();
//		if (liczbaWiadomosci>0) listItem.style.backgroundColor="#00ffff";
//		else listItem.style.backgroundColor="none";
	}
	trescCzata = document.getElementsByTagName("ol")[0].innerHTML;
 }, 500);
 
 
});

function napiszDo(nick){
	document.getElementsByTagName("textarea")[0].value=nick.substring(0,nick.length-1)+" ► ";
	setSelRange(document.getElementsByTagName("textarea")[0], (nick.length+1), (nick.length+1))
}

function pokazPriv(){
	if(aktPriv==0) {
		aktPriv=1;
		menuPriv.style.color='red';
		mojeWiadomosci()
	}
	else {
		menuPriv.style.color='#443A30';
		aktPriv=0;
	}
}

function mojeWiadomosci(){
 var tresc;
 var temp;
 var temp1;
 var chat = document.getElementsByTagName("ol")[0].getElementsByTagName("li")
 var liczbaWiadomosci=0;
 if(aktPriv==1){
	for (var i=0;i<chat.length;i++){
		if(aktPriv==1) chat[i].style.visibility="hidden";
	}
}
		for (var i=(chat.length-1);i>=0;i--){
			chat[i].addEventListener("click", function() {napiszDo(this.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML)}, false);	
			tresc = chat[i].getElementsByTagName("p");
			id = id.toLowerCase();
//			id="janeczek";
//			temp1 = tresc[1].innerHTML.toLowerCase();
			temp = chat[i].innerHTML.toLowerCase();
//			alert(temp)
			if(temp.indexOf(id)!=-1) {
//				tresc[1].style.backgroundColor="#00ffff";
				temp1=tresc[0].getElementsByTagName("span")[0].innerHTML;
				if(temp1.indexOf(id)==-1) {
					liczbaWiadomosci++;
					tresc[1].style.backgroundColor="#00ffff";
				} else tresc[1].style.backgroundColor="#FFFF00";
				if(aktPriv==1) chat[i].style.visibility="visible";
			} else {
				if(aktPriv==1){
					chat[i].parentNode.removeChild(chat[i]);
				}
			}
		}
	listItem.innerHTML="Wiadomości do mnie na czacie: <b><span>"+liczbaWiadomosci+"</span></b>";
	if (liczbaWiadomosci!=0) listItem.style.backgroundColor="#00ffff";
	if (liczbaWiadomosci==0) {listItem.style.backgroundColor="transparent";}
//	else listItem.style.backgroundColor="none";
}

function setSelRange(inputEl, selStart, selEnd) { 
 if (inputEl.setSelectionRange) { 
  inputEl.focus(); 
  inputEl.setSelectionRange(selStart, selEnd); 
 } else if (inputEl.createTextRange) { 
  var range = inputEl.createTextRange(); 
  range.collapse(true); 
  range.moveEnd('character', selEnd); 
  range.moveStart('character', selStart); 
  range.select(); 
 } 
}

function czyAkt(akt){
	komunikat.href="http://userscripts.org/scripts/show/157111";
	komunikat.target="_blank";
	komunikat.innerHTML='"CzatPriv" wersja '+akt;
	var div = document.getElementsByTagName("div"); 
	for (var i=0;i<div.length;i++){
		if(div[i].className=="right-col chat-container right-side") {
			div[i].appendChild(komunikat);
			return;
		}
	}
}