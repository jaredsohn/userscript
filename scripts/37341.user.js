// ==UserScript==
// @name               PirateChatFENIXcompat
// @namespace          rileydutton.com
// @description        Adds a simple chat to AstroEmpires. Remotely-hosted, AJAX-based.
// @include            http://*.astroempires.com/*
// @include           http://corentin.jarnoux.free.fr/aecproject/*
// @exclude            http://forum.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// ==/UserScript==
/*
Copyright (C) 2008 Riley Dutton (edited by 787 for dmtnt for fenix)

The original layout for this script was originally inspired by AstroEmpires Extras.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
For a full copy of the GNU General Public License, see <http://www.gnu.org/licenses/<.
*/

/*

*/
var scriptName='Pirate Chat';
var scriptId='27703';
var scriptVersion=1.0;

/*
==========================================
Debug Setup
==========================================
*/
var DEBUG_KEY = "config_debug";
var LOG_LEVEL_KEY = "config_logLevel";

var LOG_LEVEL_DEBUG = 1;
var LOG_LEVEL_INFO = 2;
var LOG_LEVEL_WARN = 3;
var LOG_LEVEL_ERROR = 4;

var LOG_LEVEL = parseInt(getSetting(LOG_LEVEL_KEY,"1"));

if(!getSetting(DEBUG_KEY,true))
	LOG_LEVEL = 1;
	
if(unsafeWindow.console)
{
    console =
    {
        log : function (text) {
			if( LOG_LEVEL == 1 ) unsafeWindow.console.log( text );
        }
        ,
        info : function (text) {
            if( LOG_LEVEL <= 2 ) unsafeWindow.console.info( text );
        }
        ,
        warn : function (text) {
            if( LOG_LEVEL <= 3 ) unsafeWindow.console.warn( text );
        }
        ,
        error : function (text) {
            if( LOG_LEVEL <= 4 ) unsafeWindow.console.error( text );
        }
    }
}

console.log("Log level: "+LOG_LEVEL);

/*
==========================================
---------Common Functions-----------
==========================================
*/
function getPlayerName(name){
    var regex = /(\[.*?\])(.*)/;
    result = regex.exec(name);
    if(result != null)
    return result[2].substring(1);
    else
    return name;
}
function getGuild(name){
    var regex = /\[.*?\]/;
    result = regex.exec(name);
    //console.log(result);
    if(result)
    return result[0];
    else return name;
}

//From http://www.web-source.net/web_development/currency_formatting.htm
function commaFormat(amount){
	var delimiter = unescape(getSetting(NUMBER_DELIMETER_KEY,","));
    //console.log("Delimeter:" +delimiter);
    amount = ""+amount;
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d==undefined || d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

/*
==========================================
Get/Set Functions
Prefixes server name to settings
==========================================
*/
function getSetting(key,defaultValue){
		return GM_getValue(getServer()+"_"+key,defaultValue);
}

function setSetting(key,value){
		return GM_setValue(getServer()+"_"+key,value);
}	



/*
==========================================
Returns the full server name
==========================================
*/

	GM_getValue('numOnline', 0);
	
    var html = '';
	var currentNick = false;
	
	//Build our divs and prepare to insert them into the page.
	var tables = document.evaluate(
    "//div[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0)
    return;
    var topTable = tables.snapshotItem(0);
	
	var whosOnline = document.createElement('div');
	whosOnline.setAttribute('style', 'width: 200px; height: 75px; position: fixed; bottom: 5px; right: 5px; border: 1px solid white; z-index: 1000; background-color: #026873;');
	whosOnline.innerHTML = '<div style="text-align: center; font-size: 8pt;"><strong>Who\'s Online</strong></div>';
	
	var whosOnlineContent = document.createElement('div');
	whosOnlineContent.setAttribute('style', 'width: 200px; height: 75px; font-weight: normal; font-size: 8pt; overflow: auto;');
	whosOnlineContent.innerHTML = 'finding out who\'s online...';
    
    var empireChat = document.createElement('div');
	empireChat.setAttribute('style', 'width: 200px; height: 300px; position: fixed; bottom: 80px; right: 5px; border: 1px solid white; z-index: 1000;');
	//empireChat.setAttribute('z-index', '1000');
	empireChat.innerHTML = html;
	
	var chatToolbar = document.createElement('div');
	chatToolbar.setAttribute('style', 'width: 200px; height: 20px; background-color: #011C40;');
	chatToolbar.innerHTML = '<div id="chatToolbarMinimizer" style="width: 100px; text-align: right; float: right;"><span style="font-size: 6pt; font-weight: normal;">(Click to minimize)</span></div><div style="width: 150px; text-align: middle;">PirateChat</div>';
	
	var chatContent = document.createElement('div');
	chatContent.setAttribute('style', 'width: 200px; height: 260px; background-color: white; color: black; overflow: auto;');
	chatContent.innerHTML = 'initializing...';
	
	//toggle hiding/showing AstroChat.
	function toggleHide() {
		if(chatContent.style.display == '') {
			chatContent.style.display = 'none';	
			chatInput.style.display = 'none';
			empireChat.style.height = '20px';
			whosOnline.style.display = 'none';
			empireChat.style.bottom = '5px';
			chatToolbar.innerHTML = '<div id="chatToolbarMinimizer" style="width: 100px; text-align: right; float: right; padding-right: 3px;"><span style="font-size: 9pt; font-weight: normal;"><strong>'+GM_getValue('numOnline')+'</strong> online</span></div><div style="width: 150px; text-align: middle;">PirateChat</div>'
			GM_setValue('minimized', 1);
		}
		
		else {
			chatContent.style.display = '';
			chatInput.style.display = '';
			whosOnline.style.display = '';
			empireChat.style.height = '300px';
			empireChat.style.bottom = '80px';
			chatToolbar.innerHTML = '<div id="chatToolbarMinimizer" style="width: 100px; text-align: right; float: right;"><span style="font-size: 6pt; font-weight: normal;">(Click to minimize)</span></div><div style="width: 150px; text-align: middle;">PirateChat</div>';
			chatToolbar.style.background = '#011C40';
			GM_setValue('waitingMessages', 0);
			GM_setValue('minimized', 0);
			chatContent.scrollTop = chatContent.scrollHeight;
			//chatToolbar.innerHTML
		}
	}
	
	//Add an event listener to the Toolbar to toggleHide.
	chatToolbar.addEventListener("click", toggleHide, true);
	
	
	var chatInput = document.createElement('div');
	chatInput.setAttribute('style', 'width: 200px; height: 20px; background-color: white; color: black; text-align: center;');
	chatInput.innerHTML = '';
	
	//Add an event listener to the window for when they press a key.
	window.addEventListener('keydown', keyHandler, false);
	
	var chatInputText = document.createElement('input');
	chatInputText.setAttribute('type', 'text');
	chatInputText.setAttribute('name', 'chatInputText');
	chatInputText.setAttribute('style', 'width: 190px; background-color: #023373; color: white; border: 1px solid white;');
	chatInputText.setAttribute('value', 'Type message...');
	chatInputText.setAttribute('onClick', 'if(this.value=="Type message...") this.value="";');
	
	//chatInputText.setAttribute('onKeyPress', 'checkEnter(event);');
	
	//Check to see if we should start up minimized....
	if(GM_getValue('minimized')) {
		toggleHide();	
	}
	
	//Get chat messages.
	function read_chat() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://astrotools.newspringmedia.com/chat_read.php?lastupdate=' + lastupdate,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function(responseDetails) {
				var resultarray = responseDetails.responseText.split("|~|");
				if(resultarray[1] == lastupdate) {
					//up-to-date, do nothing.	
				}
				else {
					chatContent.innerHTML = resultarray[0];
					chatContent.scrollTop = chatContent.scrollHeight;
					lastupdate = resultarray[1];
					//if we're minimized, turn orange!
					if(GM_getValue('minimized')) {
						chatToolbar.style.background = 'orange';	
						var waitingMessages = GM_getValue("waitingMessages", 0) + 1;
						chatToolbar.innerHTML = '<div id="chatToolbarMinimizer" style="width: 120px; text-align: right; float: right; padding-right: 3px;"><span style="font-size: 9pt; font-weight: normal;"><strong>'+waitingMessages+'</strong> new messages</span></div><div style="width: 150px; text-align: middle;">PirateChat</div>';
						GM_setValue("waitingMessages", waitingMessages);
					}
				}
			}
		});
	
	}
	
	function init_chat() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://astrotools.newspringmedia.com/chat_read.php?lastupdate=' + lastupdate,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function(responseDetails) {
				var resultarray = responseDetails.responseText.split("|~|");
				if(resultarray[1] == lastupdate) {
					//up-to-date, do nothing.	
				}
				else {
					chatContent.innerHTML = resultarray[0];
					chatContent.scrollTop = chatContent.scrollHeight;
					lastupdate = resultarray[1];
					//if we're minimized, turn orange!
					if(GM_getValue('minimized') && (GM_getValue('waitingMessages') > 0)) {
						chatToolbar.style.background = 'orange';	
						var waitingMessages = GM_getValue("waitingMessages", 0);
						chatToolbar.innerHTML = '<div id="chatToolbarMinimizer" style="width: 120px; text-align: right; float: right; padding-right: 3px;"><span style="font-size: 9pt; font-weight: normal;"><strong>'+waitingMessages+'</strong> new messages</span></div><div style="width: 150px; text-align: middle;">PirateChat</div>';
					}
				}
			}
		});
	
	}

	
	//return who's online
	function check_whosOnline() {
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://astrotools.newspringmedia.com/chat_whosonline.php?',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function(responseDetails) {
				var responseArray = responseDetails.responseText.split("|~|");
				whosOnlineContent.innerHTML = responseArray[0];
				GM_setValue('numOnline', responseArray[1]);
			}
		});
		
	
	}
	
	//Do stuff when they press "Enter".
	
	function keyHandler(event) {
	  
	  var k = event.keyCode;
	  
	  //alert('Keycode: ' + k);
	  
	  if(k == 13 && chatInputText.value != '' && chatInputText.value != 'Type message...')
	  { //if generated character code is equal to ascii 13 (if enter key)
	  		if(!currentNick) {
				//We must be at the log in form, so send that instead.
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://astrotools.newspringmedia.com/chat_login.php?nick=' + chatInputText.value,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					},
					onload: function(responseDetails) {
						//chatInputText.value = '';
						//Run it.
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://astrotools.newspringmedia.com/chat_init.php',
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							},
							onload: function(responseDetails) {
								chatInputText.value = '';
								var resultarray = responseDetails.responseText.split("|~|");
								if(resultarray[0] == "loggedin") {
									currentNick = resultarray[1];
									window.setInterval(function() {
									read_chat();
									}, 2 * 1000);
									window.setInterval(function() {
										check_whosOnline();
									}, 5 * 1000);
								}
								else {
									//show a login form.
									chatContent.innerHTML = "<strong>You are not currently logged in. Please type a nickname in the box to log in, and press 'Enter':</strong>";
								}
							}
						});
					}
				});
			
			}
			
			else {
				
				//Check for slash commands.
				
				var chatarray = chatInputText.value.split(" ");
				if(chatarray[0] == "/nick") {
					currentNick = chatarray[1];
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://astrotools.newspringmedia.com/chat_login.php?nick=' + currentNick,
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						},
						onload: function(responseDetails) {
							chatInputText.value = '';
						}
					});
				
				}
				
				//This is an actual chat message! Send it along...
				else {
					chatContent.innerHTML = chatContent.innerHTML + "<p style='font-weight: normal'><strong>" + currentNick + "</strong>: " + chatInputText.value + "</p>";
					chatContent.scrollTop = chatContent.scrollHeight;
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://astrotools.newspringmedia.com/chat_post.php?message=' + chatInputText.value + '&nick=' + currentNick,
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						},
						onload: function(responseDetails) {
							//Re-enable input.
							//chatInputText.disabled = false;
						}
					});
					chatInputText.value = '';
					//chatInputText.disabled=true;
				}
			return true;
			
			}
		
		}
	  
	  return false;
	}
	
	//Insert our div's into the page...
	if(topTable)
    {
        topTable.parentNode.insertBefore(empireChat,topTable);
		topTable.parentNode.insertBefore(whosOnline, empireChat);
		whosOnline.appendChild(whosOnlineContent);
		empireChat.appendChild(chatToolbar);
		//chatToolbar.appendChild(chatToolbarMinimizer);
		empireChat.appendChild(chatContent);
		empireChat.appendChild(chatInput);
		chatInput.appendChild(chatInputText);
    }
	
	//A simple check to see if we need to be sent the whole chat log, or if we're up-to-date.
	var lastupdate = 0;
	
	GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://astrotools.newspringmedia.com/chat_init.php',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function(responseDetails) {
				var resultarray = responseDetails.responseText.split("|~|");
				if(resultarray[0] == "loggedin") {
					currentNick = resultarray[1];
					init_chat();
					check_whosOnline();
					
					window.setInterval(function() {
					read_chat();
					}, 2 * 1000);
					
					window.setInterval(function() {
						check_whosOnline();
					}, 5 * 1000);
				}
				else {
					//show a login form.
					chatContent.innerHTML = "<br /><br /><strong>Welcome to PirateChat!</strong><br /><br />You are not currently logged in. Please type a nickname in the box to log in, and press 'Enter':</strong>";
				}
			}
		});