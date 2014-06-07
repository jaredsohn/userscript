// ==UserScript==
// @name           TLR Kinterface V3.0
// @namespace      Kinetic
// @description    Friends list, chat-colour toggle, chat-mode switcher, command links.
// @include        http://thelostrunes.com/game.php
// @include        http://www.thelostrunes.com/game.php
// ==/UserScript==

function addGlobalJS(js) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}


function addDiv(html){
    var body, script;
    body = document.getElementById('left1');
    if (!body) { return; }
    div = document.createElement('div');
    div.id = "div1";
    div.innerHTML = html;
    body.appendChild(div);
}

addGlobalJS("var chatcolor = 1; function togglechatcolor() { if (chatcolor == 1) { chatcolor = 2; document.getElementById('chat').style.background = '#000000'; } else if (chatcolor == 2) { chatcolor = 1; document.getElementById('chat').style.background = 'url(\"images/template/backdown2.png\")'; } }");

addGlobalJS("function customsubmitchat() { var message = document.getElementById('chatinput').value; var messagetype = document.getElementById('customtype').value; if (message.match(/(\\||#)/g)) { alert('Messages cannot contain the characters | or #.'); } else if (chatsubmitted == 1) { alert('Please wait until your previous message has been sent.'); } else { if(messagetype == 1) { var cmsg = message; } else if(messagetype == 2) { var cmsg = '/c '+message; } else if(messagetype == 3) { var cmsg = '/me '+message; } if (message == '/togglechatcolor') { togglechatcolor() } else { chatsubmitted = 1; disablechattimer = setTimeout('chatsubmitted = 0;', 3000); sendChat2('misc.php?mod=chat', 'msg='+cmsg); } } }");

document.getElementById("chatform").innerHTML = '<form style="margin-top: 0px; margin-bottom: 0px;" action="javascript:customsubmitchat();"><input type="text" onblur="chatfocused=0" onfocus="chatfocused=1" size="100" id="chatinput"> <select name="type" id="customtype"><option value="1">Normal</option><option value="2">Clan</option><option value="3">Emote</option> <input type="submit" value="Chat"></form><span id="presetbar"><font color="#FFFFFF"><b>Commands:</b> <a href="javascript:togglechatcolor()" style="color:#83A8AF;">Toggle Chat Color</a> / <a href="javascript:sendChat2(\'misc.php?mod=chat\', \'msg=/pot\')" style="color:#83A8AF;">Pot</a> / <a href="javascript:sendChat2(\'misc.php?mod=chat\', \'msg=/stats\')" style="color:#83A8AF;">Stats</a> / <a href="javascript:sendChat2(\'misc.php?mod=chat\', \'msg=/double\')" style="color:#83A8AF;">Double</a> / <a href="javascript:sendChat2(\'misc.php?mod=chat\', \'msg=/ref\')" style="color:#83A8AF;">Ref Link</a></span>';

addGlobalJS('function newDiv() { var friendDiv = document.createElement("DIV"); friendDiv.setAttribute(\'id\',\'friends\'); document.getElementById("friends").innerHTML = "TESTING"; }');

addGlobalJS('function createCookie(name,value,days) { if (days) { var date = new Date(); date.setTime(date.getTime()+(days*24*60*60*1000)); var expires = "; expires="+date.toGMTString(); } else var expires = ""; document.cookie = name+"="+value+expires+"; path=/"; }');

addGlobalJS('function splitCookie(cookieString,online) { var friendArray = cookieString.split(","); var fList = ""; var n=0; while(n<friendArray.length) { var fA = friendArray[n]; if (fA != "[Blank]") { if(online.search(fA)==-1){ var status = " <font color=#FF0000>[OFFLINE]</font>"; } else { var status = " <font color=#00FF00>[ONLINE]</font>"; } var fLength = 0; var nameArray = fA.split(" "); if (nameArray.length > 1) { var fList = fList+"-<a href=javascript:m(\'"+nameArray[0]+"%20"+nameArray[1]+"\')>"+fA+"</a>"+status+"<br>";  } else { var fList = fList+"-<a href=javascript:m(\'"+fA+"\')>"+fA+"</a>"+status+"<br>"; } } n++; } document.getElementById("friendsList").innerHTML = fList; }');

addGlobalJS('function getFriend(name,online) { var nameEQ = name + "="; var ca = document.cookie.split(";"); for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==" ") c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) splitCookie(c.substring(nameEQ.length,c.length),online); } return }');

addGlobalJS('function addFriend(name,fname) { fname = fname.substr(0,1).toUpperCase()+fname.substr(1); var nameEQ = name + "="; var ca = document.cookie.split(";"); for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==" ") { c = c.substring(1,c.length); } if (c.indexOf(nameEQ) == 0) { var oldCookie = c.substring(nameEQ.length,c.length); } } if (oldCookie=="undefined") { createCookie("tlrfriends",fname,365); } else { document.getElementById("friendInput").value = ""; var co = oldCookie.split(","); var check = 0; for(var j=0;j < co.length;j++) { if (co[j] == fname) { var newCookie = oldCookie.split(","+fname).join(""); var check = 1; }  }  if (check == 0) { var newCookie = oldCookie+","+fname; } createCookie("tlrfriends",newCookie,365); } return }');

addGlobalJS('function hR1() { if(misc.readyState == 4) { var response = misc.responseText; var loadList = getFriend(\'tlrfriends\',response); } }');

addGlobalJS('function checkOnline() { document.getElementById("friendsList").innerHTML = "Loading..."; var url = "mainnav.php?mod=ponline"; misc.open("GET",url,true); misc.setRequestHeader("X-Requested-With", "tlrreq"); misc.send(null); misc.onreadystatechange=hR1; }');

addGlobalJS('function resetFriends() { createCookie("tlrfriends","",-1); createCookie("tlrfriends","[Blank]",1); }');

addDiv('---------------------------------<br><br><b>Friends List:</b> (<a href="javascript:checkOnline()">Load Friends</a>) (<a href="javascript:document.getElementById(\'friendsList\').innerHTML=\'(Temporarily Hidden)\';void(0);">Hide</a>)<br><span id="friendsList"></span><br><br><b>Name:</b> <input id="friendInput" type="text" size="5" style="border: 1px solid #373737; background-color: #52534E; color: #ffffff;" /> <input type="submit" value="Add/Remove" onClick="addFriend(\'tlrfriends\',document.getElementById(\'friendInput\').value);" style="border: 1px solid #373737; background-color: #52534E; color: #ffffff;" /><br><a href="javascript:resetFriends()">[Reset Friends]</a>');


