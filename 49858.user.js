// ==UserScript==
// @name           F_W Chat
// @namespace      IR
// @include        http://s*.ikariam.gr/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
//--- Starts Ika Chat

var version= '1.0';

var limit = GM_getValue('msg_limit', 30); //Number of messages displayed

var domain = top.location.host.split(".")[2];

var chatURL = GM_getValue('chatURL', 'http://www.shoutmix.com/?ikafw');

var locationParts = top.location.href.split("?");

var params = "";



if(locationParts.length > 1) params = locationParts[1].split("&");

var isCityView = (document.getElementById('city') != null);

var isEmbassyView = (document.getElementById('embassy') != null);



/*

 * Words dictionary

 */

var lang={

  gr: {'send': 'αποστέλω', 'sh': 'Εμφάνιση Απόκρυψη', 'msg': 'Μήνυμα...', 'cnf': 'Επιλογές', 'switch': 'Αλλαγή Δωματίου', 'dele': 'Διαγραφή', 'add': 'Προσθήκη Δωματίου', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

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

 


/*

  * Definition for base html elements

  */

var baseElements = '<h3 class="header" id="chHeader">';

baseElements += '<span id="chAllayLink" style="margin-right: 2em"><a href="' + playerAllyLink + '" target="_blank">' + playerAllyTag + '</a></span>';

baseElements += '<span id="chScriptName">F_W Chat</span>'; 

baseElements += '<span id="chIconify" style="margin-left: 2em">';

baseElements += '<img id="chIconyIcon" style="display: inline; position: absolute; margin-top: 3px; align: right;" src="http://www.gameplay.gr/various/ikariam/animated/Various/Chat/plus.jpg" title="' + lang[local]['sh'] + '">';

baseElements += '</span></h3>';

baseElements += '';

baseElements += '';

baseElements += '';

baseElements += '\n';

baseElements += '<div id="chMsgAndCfg" style="display: none">';

baseElements += '<div style="width:245px; height:310px; padding:1px 0;font-size:12px; margin-left: 6px; scrolling: 0;">';

baseElements += '<div id="chMessagesList" style="height: 310px;overflow:auto;margin-right: 2em;border: 1px solid #CB9B6B;"><iframe src="http://www.shoutmix.com/?ikafw" frameborder="0" allowtransparency="true" scrolling="no" height="300" width="215"></iframe></div></div>';



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

      document.getElementById('chIconyIcon').src = "http://www.gameplay.gr/various/ikariam/animated/Various/Chat/plus.jpg";

    }

    else

    {

      document.getElementById('chMsgAndCfg').style.display = 'block';

      document.getElementById('chIconyIcon').src = "http://www.gameplay.gr/various/ikariam/animated/Various/Chat/minus.jpg";

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


//--- Ends Ikariam Chat