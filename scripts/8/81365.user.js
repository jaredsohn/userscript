//  Team Spoils script for Conquer Club
//  version 1.0
//  2010-07-13
//  Copyright (c) 2010, Daniel Pavlyuchkov (dako.lrd@gmail.com)
//  Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Conquer Club - Chat Filter
// @description    Allows users to filter chat in various ways
// @namespace      userscripts.org
// @version        1.0
// @include        http://*conquerclub.com/game.php?game=*
// ==/UserScript==


//---------   Global variables   ---------//

var Chat;
var Chat_Size;


//---------   Helper functions   ---------//

/**
 * Get chat <h3> header
 * 
 * @return DOM Node element
 */
function getGameChatHeader() {
  var tagIndex, tags;
  var tags = document.getElementsByTagName("h3");
  
  for(tagIndex = 0; tagIndex < tags.length; tagIndex++)
    if(tags[tagIndex].innerHTML == "Game Chat")
      return tags[tagIndex];
}

/**
 * Refresh gamepage handler to react on chat changes
 * 
 */
function gameRefresh() {
  var chatSize;
  
  chatSize = Chat.childNodes.length;

  if (chatSize > Chat_Size)
    parseChat(chatSize - Chat_Size);
}

/**
 * Parse last chat lines
 * 
 * @param int lineCount - how many last lines to parse
 */
function parseChat(lineCount) {
  var i, wrapper;
  
  for (i = 0; i < lineCount; i++) {
    wrapper = document.createElement('div');
    wrapper.className = 'other';
    if (/<b>\[self|team\]<\/b>/.test(Chat.childNodes[Chat_Size + i].innerHTML))
      wrapper.className = 'team';
    
    wrapper.innerHTML = Chat.childNodes[Chat_Size + i].innerHTML;
    Chat.replaceChild(wrapper, Chat.childNodes[Chat_Size + i]);
  }
  
  // Set new chat size
  Chat_Size = Chat.childNodes.length;
}

/**
 * Toggle chat view based on input parameters
 * 
 * @param string link - link identifier
 * @param string className - current link classname
 */
function toggleLink(link, className) {
  var i, action;
  
  action = (className == 'selected') ? 'block' : 'none';
  
  for (i in Chat.childNodes) {
    if (Chat.childNodes[i].className == link)
      Chat.childNodes[i].style.display = action;
  }
  Chat.scrollTop = Chat.scrollHeight;
}


//---------   Init functions   ---------//

/**
 * Add script styles
 * 
 */
function addStyles() {
  
  // Link styles
  GM_addStyle('span.chat-control {font-size: 13px; font-weight: normal; padding: 0 5px;}');
  GM_addStyle('span.chat-control.team {padding-left: 10px;}');
  GM_addStyle('span.chat-control a.selected {color: #0a0;}');
}

/**
 * Wrap the chat into handy HTML div elements and set proper classes
 * 
 */
function initChatParser() {
  var i, length, className, newChat, wrapper;
  
  newChat = [];
  wrapper = undefined;
  
  for (i = Chat.childNodes.length - 1; i >= 0; i--) {
    if (wrapper == undefined) {
      wrapper = document.createElement('div');
      wrapper.className = 'other';
    }
    
    if (!/\n[\s]*[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} - /.test(Chat.childNodes[i].nodeValue)) {
      if (Chat.childNodes[i].nodeName == 'B')
        wrapper.className = 'team';
      
      wrapper.insertBefore(Chat.childNodes[i].cloneNode(true), wrapper.firstChild);
    } else {
      wrapper.insertBefore(Chat.childNodes[i].cloneNode(true), wrapper.firstChild);
      newChat.push(wrapper);
      wrapper = undefined;
    }
    
    Chat.removeChild(Chat.childNodes[i]);
  }
  
  length = newChat.length;
  for (i = length - 1; i >= 0; i--)
    Chat.appendChild(newChat[i]);
  
  // Set new chat size
  Chat_Size = Chat.childNodes.length;
}

/**
 * Init control links, draw them and attach event handlers
 * 
 */
function initLinks() {
  var teamOnly, teamSpan, othersOnly, othersSpan;
  
  teamOnly = document.createElement('a');
  teamOnly.id = 'team-chat-filter';
  teamOnly.appendChild(document.createTextNode('show team only'));
  teamOnly.addEventListener('click', function () {
    toggleLink('other', this.className);
    
    if (this.className == '') {
      toggleLink('team', 'selected');
      document.getElementById('other-chat-filter').className = '';
    }
    
    this.className = (this.className == 'selected') ? '' : 'selected';
    return false;
  }, false);
  
  teamSpan = document.createElement('span');
  teamSpan.className = 'chat-control team';
  teamSpan.appendChild(document.createTextNode('[')).parentNode.appendChild(teamOnly).parentNode.appendChild(document.createTextNode(']'));
  
  othersOnly = document.createElement('a');
  othersOnly.id = 'other-chat-filter';
  othersOnly.appendChild(document.createTextNode('show others only'));
  othersOnly.addEventListener('click', function () {
    toggleLink('team', this.className);
    
    if (this.className == '') {
      toggleLink('other', 'selected');
      document.getElementById('team-chat-filter').className = '';
    }
    
    this.className = (this.className == 'selected') ? '' : 'selected';
    return false;
  }, false);
  
  othersSpan = document.createElement('span');
  othersSpan.className = 'chat-control others';
  othersSpan.appendChild(document.createTextNode('[')).parentNode.appendChild(othersOnly).parentNode.appendChild(document.createTextNode(']'));
  
  getGameChatHeader().appendChild(teamSpan).parentNode.appendChild(othersSpan);
}

/**
 * Starting point
 * 
 */
function initScript() {
  
  // Exit in no-team game
//  if (document.getElementById('players').childNodes[1].textContent != 'Team 1:')
//    return;
  
  // Add event listener
  document.getElementsByTagName('body')[0].addEventListener('CCGameRefresh', gameRefresh, false);
  
  // Init global vars
  Chat = document.getElementById('chat');
  
  initLinks();
  initChatParser();
  
  addStyles();
}

// Start the script
initScript();