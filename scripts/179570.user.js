// ==UserScript==
// @name        ChatController
// @version     1.1
// @author      Giuseppe De Rito
// @namespace   http://toolsdb.altervista.org/
// @include     http://s*.ikariam.*/index.php*
// @updateURL   http://toolsdb.altervista.org/tools/updaters/ChatController.meta.js
// @description Ikariam Controller extension.
// @run-at      document-end
// ==/UserScript==

var suspend = setInterval(checkLoader, 1000);

function checkLoader() {
  if(!unsafeWindow.db) return;
  clearTimeout(suspend);
  startScript();
}

function startScript() { // <--- StartScript

eval(unsafeWindow.loader);

db.addToolName('chat');

var chat = null;
var chatBox = null;
var timer = null;
var boxTesto = null;
var testoChat = null;
var mousex = 0;
var mousey = 0;
var chatOpened = db.load('chatOpened'); if (chatOpened == null | chatOpened == 'null') chatOpened = 'false';
var userOpened = db.load('userOpened'); if (userOpened == null | userOpened == 'null') userOpened = 'false';
var w = 6;
var h = 0;
if (chatOpened == 'true') w = 360;
if (userOpened == 'true') h = 242;
var textField = null;
var submitButton = null;
var usersList = null;
var listaUtenti = null;
var prevHtml = '';
var atFirst = true;
var chatButton = null;
var sheet = document.createElement('style');
var enableBeep = true;
document.body.appendChild(sheet);
sheet.innerHTML = "#resizablepanel_chat {visibility: hidden;}";

var findChat = function() {
  chat = getById('resizablepanel_chat');
  if (!chat) return;
  clearInterval(timer);
  advancedChat();
}

timer = setInterval(findChat,1500);

function advancedChat() {
  var worldview = getById('worldview');
  boxTesto = getById('js_ResizeMessages');
  usersList = getByClass('userlist_chat message_chat')[0];
  var testo = boxTesto.innerHTML;
  testo = replaceSmiles(testo);
  chatMenu = document.createElement('div');
  chatMenu.id = 'chatMenu';
  document.body.appendChild(chatMenu);
  chatBox = document.createElement('div');
  chatBox.id = 'chatBox';
  document.body.appendChild(chatBox);
  textField = getById('js_chatInput');
  listaUtenti = document.createElement('div');
  listaUtenti.id = 'listaUtenti';
  document.body.appendChild(listaUtenti);
  sheet.innerHTML += "#chatBox {position:fixed; bottom:0px; left:24px; width:"+w+"px; height: 242px; background:#000000;" +   //360
                     "visibility: visible; display: block; overflow: hidden; z-index: 90;" +
                     "color: white; font-weight: bold; padding:0px; opacity: 0.8;" +
                     "border-radius: 0px 8px 0px 0px;" +
                     "transition: width 0.5s; -moz-transition: width 0.5s; -webkit-transition: width 0.5s;}" +
                     "#testoChat {overflow-y: scroll; height:220; width:372px; margin-left: 6px; height: 218px;}" +
                     "#chatting:hover {opacity: 1;}" +
                     "#chatting {width:360px; height:220px; overflow: hidden; margin-top: 0px; }" +
                     "#chatTitle {color: gold; font-weight:bold; border-bottom: solid 1px gold; margin-bottom: 4px;}" +
                     "#chatTextField {width: 346px; margin-left: 5px; margin-bottom:4px; padding-top:4px; border: solid 1px;}" +
                     "#chatMenu { position:fixed; bottom:0px; left:0px; width:24px; height:242px; background:black;"+
                     "visibility: visible; display: block; overflow: hidden; z-index: 90; opacity: 0.8; " + 
                     "}" +
                     ".chatButton {position: relative; margin-left: 3px; margin-top: 6px; }" +
                     "#listaUtenti {position:fixed; bottom:0px; left:"+(40+w)+"px; width:160px; height: "+h+"px; background:black;" + //394-242
                     "visibility: visible; display: block; overflow: hidden; z-index: 90; opacity: 0.8; color: #66CDAA;"+
                     "border-radius: 8px 8px 0px 0px; font-weight: bold; "+
                     "transition: height 0.5s, left 0.5s; -moz-transition: height 0.5s, left 0.5s; -webkit-transition: height 0.5s, left 0.5s;"+
                     "overflow-y: auto;}" +
                     "#elencoUtenti {padding:4px;}";
  chatBox.innerHTML = '<div id="chatting"><p id="chatTitle" align="center" style="margin-left:6px;">IkariamAdvancedChat</p><div id="testoChat">' +
                      testo + '<br><br></div></div>' +
                      '<input type="textfield" id="chatfield" style="width:346px; margin-left: 6px; margin-bottom: 4px; border:solid 1px;"/>';
  chatMenu.innerHTML = '<a href="javascript: openChat();" title="open/close chat"> <img src="http://toolsdb.altervista.org/images/icons/chat.png" class="chatButton"/> </a>' +
                       '<a href="javascript: showOnline();" title="show online users"> <img src="http://toolsdb.altervista.org/images/icons/people.png" class="chatButton"/> </a>'+
                       '<a href="javascript: upChat();" title="go to the top"> <img src="http://toolsdb.altervista.org/images/icons/up.png" class="chatButton"/> </a>' +
                       '<a href="javascript: downChat();" title="go to the bottom"> <img src="http://toolsdb.altervista.org/images/icons/down.png" class="chatButton"/> </a>';
  listaUtenti.innerHTML = '<p id="chatTitle" align="center">UsersList</p><div id="elencoUtenti"></div>';
  fieldTesto = getById('chatfield');
  fieldTesto.onkeyup = function(event){submitMex(event);};
  submitButton = getById('js_btnChatInput');

  testoChat = getById('testoChat');
  testoChat.scrollTop=testoChat.scrollHeight;
  prevHTML = boxTesto.innerHTML;
  chatButton = getByClass('chatButton')[0];
  timer = setInterval(aggiornaChat, 2000);
}

function aggiornaChat() {
  if (boxTesto.innerHTML != prevHtml) {
    if (atFirst) {
      atFirst = false;
    } else newMessage();
    prevHtml = boxTesto.innerHTML;
  }
  var testo = boxTesto.innerHTML+'<br><br>';
  testo = replaceSmiles(testo);
  var bool = (testoChat.scrollTop == (testoChat.scrollHeight-218));
  testoChat.innerHTML = testo;
  if (bool) testoChat.scrollTop=testoChat.scrollHeight;
  // Aggiorno utenti online:
  var list = usersList.innerHTML;
  getById('elencoUtenti').innerHTML = list;
  return void(0);
}

var blink_timer = null;

function newMessage() {
  //alert('ricevuto:' + chatBox.style.width )
  if (chatBox.style.width == 6+'px') blink_timer = setInterval(startBlink, 500);
  else stopBlink();
}

function stopBlink() {
  clearTimeout(blink_timer);
  chatButton.style.visibility = 'visible';
}

function startBlink() {
  if (chatButton.style.visibility == 'hidden') chatButton.style.visibility = 'visible';
  else chatButton.style.visibility = 'hidden';
  if (enableBeep) ; // TODO...
}

unsafeWindow.openChat = function () {
  if (w==6) {
    w = 360;
    localStorage.setItem('chatOpened', 'true');
  }
  else {
    w = 6;
    localStorage.setItem('chatOpened', 'false');
  }
  chatBox.style.width = w + 'px';
  listaUtenti.style.left = (w + 34) + 'px';
  stopBlink();
}
var submitMex = function (evt) {
  if (!evt) evt = window.event;
  if (evt.keyCode == 13) {
    textField.value = fieldTesto.value;
    submitButton.click();
    textField.value = '';
    fieldTesto.value = '';
    aggiornaChat();
  }
  return void(0);
}
unsafeWindow.showOnline = function() {
  var list = usersList.innerHTML;
  getById('elencoUtenti').innerHTML = list;
  if (h==0) {
    h = 242;
    db.save('userOpened', 'true');
  }
  else {
    h = 0;
    db.save('userOpened', 'false');
  }
  listaUtenti.style.height = h+'px';
}
unsafeWindow.upChat = function() {
  testoChat.scrollTop=0;
}
unsafeWindow.downChat = function() {
  testoChat.scrollTop=testoChat.scrollHeight;
}
function replaceSmiles(txt) {
  txt = txt.replace(/:\)/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/smile.png">'); // :)
  txt = txt.replace(/:-\)/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/squint.png">'); // :-)
  txt = txt.replace(/:\(/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/sad.png">'); // :(
  txt = txt.replace(/;\)/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/wink.png">'); // ;)
  txt = txt.replace(/:P/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/tongue.png">'); // :P
  txt = txt.replace(/:D/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/biggrin.png">'); // :D
  txt = txt.replace(/:O/g, '<img src="http://board.fr.ikariam.gameforge.com/wcf/images/smilies/w00t.png">'); // :o
  txt = txt.replace(/\[((.|[^.])*?):((.|[^.])*?):((.|[^.])*?)\]((.|[^.])*?):/g, '<font color="#DC143C">[$1:$3:$5]</font><font color="#00d664">$7:</font>'); // :D
  // ((.|[^.])*?)
  return txt;
}

} // <--- EndScript