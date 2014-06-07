// ==UserScript==
// @name           Gow Chat
// @namespace      Jack_Sparrow
// @description    Script for GOW Alliance
// @include        http://s*.ikariam.de/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://s*.ikariam.*/index.php?*view=island*
// ==/UserScript==

var version= '0.4';
var limit=30; //Number of messages displayed
var forumLink='http://gow.forumfree.it';  //Link to ally site
var domain = top.location.host.split(".")[2];

/*
 * Words dictionary
 */
var lang={
  it: {'send': 'Invia', 'sh': 'Visualizza/Nascondi', 'msg': 'Messaggio...'},
  en: {'send': 'Send', 'sh': 'Show/Hide', 'msg': 'Message...'},
  de: {'send': 'Senden', 'sh': 'Zeigen/Ausblenden', 'msg': 'Nachricht...'},
  es: {'send': 'Enviar', 'sh': 'Mostrar', 'msg': 'Mensaje...'},
}
var local = 'de'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//var chatroom = 'corsachat';
var chatroom = 'gow';


/*
 *
 * Taken from ikariam-inline-score from here...
 *
 */
getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};

var listParts = "";
// Get the player's name
listParts = getElementsByClass(document,"owner")[0].innerHTML.split(">");
listParts[2] = listParts[2].split("<")[0];
var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name
// Get the player's Allay
listParts = getElementsByClass(document,"ally")[0].innerHTML.split(">");
listParts[3] = listParts[3].split("<")[0];
var playerAllay = listParts[3].replace(/^\s+|\s+$/g, ''); // trim up the Player's Allay
/* ... to here */

//Defines one-time elemets
var baseElements = '<h3 class="header" id="chHeader">';
    baseElements += '<span id="chAllayLink" style="margin-right: 2em"><a href="' + forumLink + '" target="_blank">' + playerAllay + '</a></span>';
    baseElements += '<span id="chScriptName">Ikariam Chat</span>';
    baseElements += '<span id="chIconify" style="margin-left: 2em"><a href="#" id="chIconifyLink">';
    baseElements += '<img id="chIconyIcon" style="display: inline; position: absolute; margin-top: 3px; align: right;" src="http://img440.imageshack.us/img440/5046/menobb0.jpg" title="' + lang[local]['sh'] + '">';
    baseElements += '</a></span></h3>';
    baseElements += '<input type="text" name="chatbarText" id="chatbarText" value="' + lang[local]['msg'] + '" style="margin-left: 1em; margin-top: 1em;"';
    baseElements += ' onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" ';
    baseElements += ' onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" />';
    baseElements += '<input type="button" class="button" id="chSendMessage" value="' + lang[local]['send'] + '">\n';
    baseElements += '<div id="chMessagesListBox" style="width:240px;height:250px; padding:1px 0;font-size:12px; margin-left: 6px;">';
    baseElements += '<div id="chMessagesList" style="height: 240px;overflow:auto;margin-right: 2em;border: 1px solid #CB9B6B;"></div></div>';

/*
var baseElements = <><input type="text" name="chatbarText" id="chatbarText" value="Messaggio..." style="margin-left: 1em; margin-top: 1em;"
     onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';"
     onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;">
    <input type="button" class="button" id="chSendMessage" value="Invia">
    <div id="chMessagesList"></div></>;
*/

function getChatData()
{
  //alert('http://chat.mmxforge.net/getChatData.php?limit=' + limit + '&ally=' + chatroom);
  GM_xmlhttpRequest({
    'method': 'GET',
    'url': 'http://chat.mmxforge.net/getChatData.php?limit=' + limit + '&ally=' + chatroom,
    'headers': { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' },
    'onload': function(responseDetails) { diplayData(responseDetails.responseText); }
  });
}

function postChatData(message)
{
  var postParam = 'n=' + playerName + '&c=' + message + '&ally=' + chatroom;
  GM_xmlhttpRequest({
    'method': 'POST',
    'url': 'http://chat.mmxforge.net/sendChatData.php',
    'headers': { 'Content-type': 'application/x-www-form-urlencoded' },
    'data': encodeURI(postParam),
	'onload': function(res) { getChatData(); }
  });
}

function chSendMessage()
{
  var chMessage = document.getElementById("chatbarText");
  if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)
  	return alert("Inserire un messaggio.");
  postChatData(chMessage.value);
}

function diplayData(chatText)
{
  var results = chatText.split('---');
  //If no message is present... just open and close ul
  var unordList = '<ul></ul>';
  if (results.length > 2) {
  	unordList = '<ul>';
    for(i=0;i < results.length - 2;i=i+2) { //goes through the result one message at a time
      unordList += "<li><b>" + results[i] + ":</b> " + results[i+1] + "</li>\n"; //inserts the new content into the page
    }
    unordList += '</ul>\n';
  }
  if(document.getElementById('ikachat') == null)
  {
    var divContainer = document.createElement('div');
      divContainer.setAttribute('id','ikachat');
      divContainer.innerHTML = baseElements;
      document.getElementById('information').appendChild(divContainer);
      document.getElementById('chMessagesList').appendChild(document.createElement("p"));
  }
    
  document.getElementById('chMessagesList').firstChild.innerHTML = unordList;
}

function startChat()
{
  getChatData();
  window.setTimeout(startChat, 10000);
}

var divDreated = false;
startChat();


/*
 * Events handling:
 * chSendMessage button clicked;
 * chIconify link clicked
 * chatbarText input return pressed
 */
document.addEventListener('click',function(event) {
  //alert(event.target.id);
  if (event.target.id=='chSendMessage') {
    var chMessage = document.getElementById("chatbarText");
    if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)
  	  return alert("Inserire un messaggio.");
    postChatData(chMessage.value);
    document.getElementById("chatbarText").value = document.getElementById("chatbarText").defaultValue;
  }
  else if(event.target.id=='chIconyIcon'){
    if(document.getElementById('chMessagesListBox').style.display != 'none')
    {
      document.getElementById('chMessagesListBox').style.display = 'none';
      document.getElementById('chIconyIcon').src = "http://img440.imageshack.us/img440/6110/piusr5.jpg";
    }
    else
    {
      document.getElementById('chMessagesListBox').style.display = 'block';
      document.getElementById('chIconyIcon').src = "http://img440.imageshack.us/img440/5046/menobb0.jpg";
    }
  }
}, true);

function sendMessageOnReturn(e)
{
  if(e.target.id == 'chatbarText' && e.keyCode == 13)
  {
    chSendMessage();
    document.getElementById('chatbarText').value = '';
  }
}

addEventListener("keyup", sendMessageOnReturn, false);
