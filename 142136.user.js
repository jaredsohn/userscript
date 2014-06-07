// ==UserScript==
// @name        Rank Changer
// @namespace   Leeterthanyou
// @description Changes your rank after each chat post.
// @include     http://thelostrunes.com/game.php
// @include     http://www.thelostrunes.com/game.php
// @version     1
// ==/UserScript==

function addGlobalJS(js)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

addGlobalJS("function sendData3(url,newrank){http.open(\"GET\",url,true);http.setRequestHeader(\"X-Requested-With\", \"tlrreq\");http.send(null);http.onreadystatechange=function(){ document.getElementById('mrank').innerHTML = newrank; };}");

addGlobalJS("function submitChat(){var randTxt;var getRank = document.getElementById('mrank').innerHTML;var rankChoose = Math.floor(Math.random()*5) + 1;if (rankChoose == 1) { rankTxt = 'Earl'; rankChoose = 7; } else if (rankChoose == 2) { rankTxt = 'Squire'; } else if (rankChoose == 3) { rankTxt = 'Knight'; } else if (rankChoose == 4) { rankTxt = 'Baron'; } else if (rankChoose == 5) { rankTxt = 'Duke'; rankChoose = 9; } var cmsg = document.getElementById('chatinput').value;if (cmsg.match(/(\\\||#)/g)){alert('Messages cannot contain the characters | or #.');}else if(cmsg.match(/^\\\/view/)){document.getElementById('chatinput').value = '';viewPlayer(cmsg.substring(6));}else if(chatsubmitted == 1){alert('Please wait until your previous message has been sent.');}else{chatsubmitted = 1;disablechattimer = setTimeout('chatsubmitted = 0;', 3000);sendChat2('misc.php?mod=chat', 'msg='+cmsg);setTimeout(function(){sendData3('g_content.php?mod=pref&chgrnk='+rankChoose,rankTxt)},1000);}}");