// ==UserScript==
// @name        chattt
// @namespace   art-kak.pl/chat.user.js
// @include     http://pl68.plemiona.pl/*
// @version     1
// ==/UserScript==



var pokaz = document.getElementById('footer_left');
pokaz.appendChild(document.createTextNode(' - '));
var link = document.createElement('a');
link.appendChild(document.createTextNode('Pokaż czat!'));
link.setAttribute("href", "#");
link.setAttribute("onclick", "pokazczat();return false;");
link.id='jestczat';
pokaz.appendChild(link);

var body = document.getElementById('footer');
var ramka = document.createElement('div');
   with (ramka.style) {
        backgroundColor='#f0e2be';
        borderColor = 'gray';
        borderWidth = '2px';
        borderStyle = 'solid';
        fontFamily = 'Tahoma, Arial';
        lineHeight = '11px';
        fontSize = '10px';
        color = '#603000';
        width = '300px';
        height = '200px';
        textAlign = 'left';
        position = 'fixed';
        bottom = '-204px';
       	right = '0px';
    } 
ramka.id = 'ChatPlemiona';
var content = document.createElement('div');
content.id = 'chatTresc';
content.appendChild(document.createTextNode('Trwa ładowanie...'));
   with (content.style) {
        padding = '5px';
        backgroundColor='#fff5da';
        width = '290px';
        height = '170px';
        overflowY = 'scroll';
		overflowX = 'hidden';
    }
ramka.appendChild(content);
var forma = document.createElement('div');
var chatForm = document.createElement("form");
chatForm.action = "";
chatForm.setAttribute("onsubmit", "wyslij();return false;");
chatForm.name = 'MyForm';

  var name = 'chatPlemiona';
  var str = '; '+ document.cookie +';';
  var index = str.indexOf('; '+ escape(name) +'=');
  if (index != -1) {
    index += name.length+3;
    var value = str.slice(index, str.indexOf(';', index));
    value = unescape(value);
     if (value == '')
         value = 'nick';
  }


 var newElement = document.createElement('input');
 newElement.type = 'text';
 newElement.name = 'autor';
 newElement.value = value;
 newElement.id = 'nick_p';
 newElement.setAttribute('onchange','zmien_nick()');
 newElement.style.width = '50px';
 chatForm.appendChild(newElement);

 newElement = document.createElement('input');
 newElement.type = 'text';
 newElement.name = 'tresc';
 newElement.id = 'wiadomosc';
 newElement.value = '';
 chatForm.appendChild(newElement);


 newElement = document.createElement('input');
 newElement.type = 'submit';
 newElement.value = 'Wyślij!';
 chatForm.appendChild(newElement);


forma.appendChild(chatForm);
forma.id = 'chatForma';

ramka.appendChild(forma);
body.appendChild(ramka);

newElement = document.createElement('script');
newElement.setAttribute("src", "http://art-kak.pl/skrypty.js");
body.appendChild(newElement);

chat();

setInterval (chat, 2000);

function chat(){ 
    if (link.text != "Ukryj czat!")
        return;
    var xmlHttp;
    
    if (window.XMLHttpRequest)
  {// dla IE7+, Firefox, Chrome, Opera, Safari
  xmlHttp = new XMLHttpRequest();
  }
    else
  {// dla IE6, IE5
  xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0){
      xmlHttp.open("GET", "http://art-kak.pl/chat.php", true);  
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
              xmlResponse = xmlHttp.responseXML;
              xmlDocumentElement = xmlResponse.documentElement;
              odpowiedz = xmlDocumentElement.firstChild.data;
              divTre = document.getElementById("chatTresc")
              divTre.innerHTML = odpowiedz;
              divTre.scrollTop = divTre.scrollHeight;
          } 
      }
      xmlHttp.send(null);
    }
}
