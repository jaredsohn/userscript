// ==UserScript==

// @name 		1235567ettyureertyy

// @description	Have a chat in ikariam's game field

// @version		1.0

// @author 		Luca Saba (lucasaba at gmail dot com)

// @namespace	MMXForge

// @include		http://s*.ae.ikariam.*/*

// @exclude		http://board.ikariam.*/*

// ==/UserScript==



var version= '1.0';

var limit = GM_getValue('msg_limit', 35); //Number of messages displayed

var domain = top.location.host.split(".")[2];

var chatURL = GM_getValue('chatURL', 'http://wata1.com/index.html/');

var locationParts = top.location.href.split("?");

var params = "";



if(locationParts.length > 1) params = locationParts[1].split("&");

var isCityView = (document.getElementById('city') != null);

var isEmbassyView = (document.getElementById('embassy') != null);



/*

 * Words dictionary

 */

var lang={

  cr: {'send': 'slati', 'sh': 'Prikaži/Sakrij', 'msg': 'Poruka...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  de: {'send': 'Senden', 'sh': 'Zeigen/Ausblenden', 'msg': 'Nachricht...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  dk: {'send': 'sende', 'sh': 'Vis/Skjul', 'msg': 'Besked...', 'cnf': 'Configuration', 'switch': 'Skift Chatrum', 'dele': 'Slet Chatrum', 'add': 'Tilføj Chatrum', 'err_noname': 'Tekst er påkrævet!', 'room_alredy_present': 'Chatrummet findes allerede'},

  en: {'send': 'Send', 'sh': 'Show/Hide', 'msg': 'Message...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  es: {'send': 'enviar', 'sh': 'Mostrar/Ocultar', 'msg': 'Mensaje...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  fr: {'send': 'envoyer', 'sh': 'Afficher/Masquer', 'msg': 'Message...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  it: {'send': 'Invia', 'sh': 'Visualizza/Nascondi', 'msg': 'Messaggio...', 'cnf': 'Configurazione', 'switch': 'Cambia Chat Room', 'dele': 'Elimina Chat Room', 'add': 'Aggiungi Chat Room', 'err_noname': 'Testo necessario!', 'room_alredy_present': 'Chat Room già presente'},

  gr: {'send': 'αποστέλω', 'sh': 'Εμφάνιση Απόκρυψη', 'msg': 'Μήνυμα...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  jp: {'send': '送る', 'sh': '表示/非表示', 'msg': 'メッセージ...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  no: {'send': 'Sende', 'sh': 'Vise/Skjule', 'msg': 'Melding...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  pl: {'send': 'Wysłać', 'sh': 'Pokaż/Ukryj', 'msg': 'Wiadomość...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  pt: {'send': 'Emita', 'sh': 'Mostra/couro cru', 'msg': 'Mensagem...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  ro: {'send': 'Trimite', 'sh': 'Vedere/Ascunde', 'msg': 'Mesaj...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  ru: {'send': 'Отправить', 'sh': 'Показать/Скрыть', 'msg': 'Сообщение...', 'cnf': 'Настройки', 'switch': 'Изменить чат', 'dele': 'Удалить чат', 'add': 'Добавить чат', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Такой чат уже сущевствует'},

  se: {'send': 'Skicka', 'sh': 'Visa/dölj', 'msg': 'Meddelande...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  sf: {'send': 'lähettää', 'sh': 'Näytä/Piilota', 'msg': 'Viesti...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  tr: {'send': 'göndermek', 'sh': 'göstermek/gizlemek', 'msg': 'haber...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

}

var local = 'en'; //For i18n

//If domain id in the dictionary, use domain's dictionary

if(domain in lang) local = domain;



var playerAllyName = GM_getValue('allyname', '');

var playerAllyTag = GM_getValue('allytag', '');

var playerAllyLink = GM_getValue('allylink', '');



var chatrooms = GM_getValue('chatrooms', local).split(',');



var chatroom = GM_getValue('selected_chatroom', local);





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

var playerName = "anonymous";

// Get the player's name

var nameElement = getElementsByClass(document,"owner");

if(nameElement.length > 0) 

{

  listParts = nameElement[0].innerHTML.split(">")

  listParts[2] = listParts[2].split("<")[0];

  playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name

}

/* ... to here */ 



/*

  * Get's ally name, ally tag and ally external page when in embassy

  */

function getAllyInfo()

{

  var tb = document.getElementById("allyinfo");

  playerAllyTag = tb.rows[0].cells[0].innerHTML;

	playerAllyName = tb.rows[0].cells[1].innerHTML;

	playerAllyLink = tb.rows[4].cells[1].childNodes[0].href;

	

  GM_setValue('allytag', playerAllyTag);

  GM_setValue('allylink', playerAllyLink);

  GM_setValue('allyname', playerAllyName);

}





/*

  * Definition for base html elements

  */

var baseElements = '<h3 class="header" id="chHeader">';

baseElements += '<span id="chAllayLink" style="margin-right: 2em"><a href="' + playerAllyLink + '" target="_blank">' + playerAllyTag + '</a></span>';

baseElements += '<span id="chScriptName">Ikariam Chat</span>'; 

baseElements += '<span id="chIconify" style="margin-left: 2em">';

baseElements += '<img id="chIconyIcon" style="display: inline; position: absolute; margin-top: 3px; align: right;" src="http://img440.imageshack.us/img440/5046/menobb0.jpg" title="' + lang[local]['sh'] + '">';

baseElements += '</span></h3>';

baseElements += '<input type="text" name="chatbarText" id="chatbarText" value="' + lang[local]['msg'] + '" style="margin-left: 1em; margin-top: 1em;"';

baseElements += ' onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" ';

baseElements += ' onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" />';

baseElements += '<input type="button" class="button" id="chSendMessage" value="' + lang[local]['send'] + '">\n';

baseElements += '<div id="chMsgAndCfg">';

baseElements += '<div id="chMessagesListBox" style="width:240px;height:250px; padding:1px 0;font-size:12px; margin-left: 6px;">';

baseElements += '<div id="chMessagesList" style="height: 240px;overflow:auto;margin-right: 2em;border: 1px solid #CB9B6B;"></div></div>';

baseElements += '<h3 class="header" id="chConfigHeader">';

baseElements += '<span id="chScriptName">' + lang[local]['cnf'] + '</span>'; 

baseElements += '<span id="chConfigIconify" style="margin-left: 2em">';

baseElements += '<img id="chConfiCloseIcon" ';

baseElements += 'style="display: inline; position: absolute; margin-top: 3px; align: right;" ';

baseElements += 'src="http://';

if(GM_getValue('show_config', 0) == 0) baseElements += 'img440.imageshack.us/img440/6110/piusr5.jpg"';

else baseElements += 'img440.imageshack.us/img440/5046/menobb0.jpg"';

baseElements += ' title="' + lang[local]['sh'] + '">';

baseElements += '</span></h3><div id="chConfigDiv"';

if(GM_getValue('show_config', 0) == 0) baseElements += ' style="display: none">';

else baseElements += ' style="display: block">';

baseElements += "<select id='chRoomsSelect' style='margin: 1em 1em 1em 1em;'>";

for(i=0; i < chatrooms.length; i++) {

  if(chatrooms[i] != '') 

  {

    var striln = chatrooms[i].length;

    baseElements += "<option";

	if(chatrooms[i] == chatroom)

	{

	  baseElements += " selected";

	}

    baseElements += ">" + chatrooms[i] + "</option>";

  }

}

baseElements += "</select>";

baseElements += "<input type='button' class='button' id='chSwitchToBtn' value='" + lang[local]['switch'] + "' />";

baseElements += "<input type='button' class='button' id='chDeleteBtn' value='" + lang[local]['dele'] + "' /><hr/>";

baseElements += "<input type='text' id='chTxtNewChatRoom' style='margin: 1em 1em 1em 1em;' />";

baseElements += "<input type='button' class='button' id='chAddBtn' value='" + lang[local]['add'] + "'>";

baseElements += "</div></div>";



function getChatData()

{

  GM_xmlhttpRequest({

    'method': 'GET',

    'url': chatURL + 'getChatData.php?limit=' + limit + '&ally=' + chatroom,

    'headers': { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' },

    'onload': function(responseDetails) { diplayData(responseDetails.responseText); }

  });

}



function postChatData(message)

{

  var postParam = 'n=' + playerName + '&c=' + message + '&ally=' + chatroom;

  GM_xmlhttpRequest({

    'method': 'POST',

    'url': chatURL + 'sendChatData.php',

    'headers': { 'Content-type': 'application/x-www-form-urlencoded' },

    'data': encodeURI(postParam),

	  'onload': function(res) { getChatData(); }

  });

}



function chSendMessage()

{

  var chMessage = document.getElementById("chatbarText");

  if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)

  	return alert(lang[local]['err_noname']);

  postChatData(chMessage.value);

}



function diplayData(chatText)

{

  if(document.getElementById('information') == null) return;

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

	  if(document.getElementById('information') == null) return;

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



if(isCityView) startChat();

else if(isEmbassyView) getAllyInfo();



/*

 * Events handling:

 * chSendMessage button clicked;

 * chIconify link clicked

 * chatbarText input return pressed

 */

document.addEventListener('click',function(event) {

  //Send Message Button

  if (event.target.id=='chSendMessage') {

    var chMessage = document.getElementById("chatbarText");

    if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)

  	  return alert(lang[local]['err_noname']);

    postChatData(chMessage.value);

    document.getElementById("chatbarText").value = document.getElementById("chatbarText").defaultValue;

  }

  //Hide/Show Chat Board

  else if(event.target.id=='chIconyIcon'){

    if(document.getElementById('chMsgAndCfg').style.display != 'none')

    {

      document.getElementById('chMsgAndCfg').style.display = 'none';

      document.getElementById('chIconyIcon').src = "http://img440.imageshack.us/img440/6110/piusr5.jpg";

    }

    else

    {

      document.getElementById('chMsgAndCfg').style.display = 'block';

      document.getElementById('chIconyIcon').src = "http://img440.imageshack.us/img440/5046/menobb0.jpg";

    }

  }

  //Hide/Show Config Board

  else if(event.target.id=='chConfiCloseIcon'){

    if(document.getElementById('chConfigDiv').style.display != 'none')

    {

      document.getElementById('chConfigDiv').style.display = 'none';

      document.getElementById('chConfiCloseIcon').src = "http://img440.imageshack.us/img440/6110/piusr5.jpg";

      GM_setValue('show_config', 0);

    }

    else

    {

      document.getElementById('chConfigDiv').style.display = 'block';

      document.getElementById('chConfiCloseIcon').src = "http://img440.imageshack.us/img440/5046/menobb0.jpg";

      GM_setValue('show_config', 1);

    }

  }

  //Delete ChatRoom

  else if(event.target.id=='chDeleteBtn')

  {

    var slct = document.getElementById('chRoomsSelect');

	  slct.removeChild(slct.options[slct.selectedIndex]);

	  if(slct.selectedIndex >= 0)

	    chatroom = slct.options[slct.selectedIndex];

	  else

	  {

	    //If all chatrooms where deleted, force local chatroom

	    chatroom = local;

	    var slctOpt = document.createElement('option');

	    slctOpt.value=chatroom;

	    slctOpt.text=chatroom;

	    slct.appendChild(slctOpt);

	  }

	  var chatRoomsString = '';

	  for(i=0; i<slct.options.length; i++)

	  {

	    if(i > 0) chatRoomsString += ",";

	    chatRoomsString += slct.options[i].text;

	  }

	  GM_setValue('chatrooms', chatRoomsString);

	  getChatData();

  }

  //Add ChatRoom

  else if(event.target.id=='chAddBtn')

  {

    var newChatInput = document.getElementById('chTxtNewChatRoom');

	  newChatInput.value = newChatInput.value.replace(/^\s+|\s+$/g, '_');

	  if(newChatInput.value=='')

	  {

	    alert(lang[local]['err_noname']);

	    return;

	  }

	  chatroom = newChatInput.value;

	  GM_setValue('selected_chatroom', chatroom);

	  var newSelectedValue = chatrooms.indexOf(chatroom);

	  var slct = document.getElementById('chRoomsSelect');

	  //Check if the name is already present

	  if(newSelectedValue >= 0)

    {

	    alert(lang[local]['room_alredy_present']);

	    return;

	  }

	  //if not... create a new select option

    chatrooms[chatrooms.length] = chatroom;

	  var slctOpt = document.createElement('option');

	  slctOpt.value=chatroom;

	  slctOpt.text=chatroom;

	  slct.appendChild(slctOpt);

	  newSelectedValue = slct.length - 1;

	

	  slct.selectedIndex = newSelectedValue;

	  var chatRoomsString = '';

	  for(i=0; i<chatrooms.length; i++)

	  {

	    if(i > 0) chatRoomsString += ",";

	      chatRoomsString += chatrooms[i];

	  }

	  GM_setValue('chatrooms', chatRoomsString);

	  newChatInput.value='';

	  getChatData();

  }

  //Change ChatRoom

  else if(event.target.id=='chSwitchToBtn')

  {

    var slct = document.getElementById('chRoomsSelect');

  	chatroom = slct.value;

	  getChatData();

	  GM_setValue('selected_chatroom', chatroom);

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
