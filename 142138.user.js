// ==UserScript==
// @name           Kill/Death Counter
// @namespace      Kinetic
// @description    Keeps track of certain stats gained during battle.
// @include        http://thelostrunes.com/game.php
// @include	http://www.thelostrunes.com/game.php
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

document.getElementById("chatform").innerHTML = '<form style="margin-top: 0px; margin-bottom: 0px;" action="javascript:submitChat();"> <input type="text" onblur="chatfocused=0" onfocus="chatfocused=1" size="100" id="chatinput"> <input  type="submit" value="Chat"><br /><font color="#ffffff">Kills:</font> <span id="add_killinc" style="color: #ffffff;">0</span> / <font color="#ffffff">Defeated:</font> <span id="add_deathinc" style="color: #ffffff;">0</span> <a href="javascript:addCounterReset();" style="color: #ffffff;">[Reset]</a></form>';

addGlobalJS("function addCounterReset() { document.getElementById('add_killinc').innerHTML = '0'; document.getElementById('add_deathinc').innerHTML = '0'; }");

addGlobalJS("function addThouCommas (num) {var array = num.toString().split('');var index = -3;while (array.length + index > 0) {array.splice(index, 0, ',');index -= 4;}return array.join('');}");

addGlobalJS("function handleResponse1(){if((http.readyState == 4 && whichHandle == 1) || (recap.readyState == 4 && whichHandle == 2)){ccheck = 0;if(whichHandle == 1){var response = http.responseText;}else{var response = recap.responseText;}var update = new Array();if(response.indexOf('|' != -1)){update = response.split('|');var totalUpdates = (update.length / 2);var currentUpdate = 1;var var1 = 0;var var2 = 1;while(currentUpdate <= totalUpdates){if(update[var1] == 'at'){actioninprogress = 1;actiontimer(update[var2]);}else if(update[var1] == 'special'){if(update[var2] == 'aterror'){alert('Please wait until your previous action is complete!');if(document.getElementById('battlebutton')){document.getElementById('battlebutton').disabled = false;}}if(update[var2] == 'banned'){alert('Your account is currently banned. Check your e-mail for further details.');window.location = 'http://www.thelostrunes.com/';}if(update[var2] == 'autoattack'){autoattack = 1;}if(update[var2] == 'disautoattack'){autoattack = 0;}if(update[var2] == 'secchkfail'){alert('You have failed too many security checks and have been logged out.');window.location = 'http://www.thelostrunes.com/index.php?logout';}}else if(update[var1] == 'specialmobid'){autoattackid = update[var2];}else if(update[var1] == 'tradeskills'){actioninprogress = 0;init_tradeskill(update[var2]);}else if(update[var1] == 'securitycheck'){actiontimer(2000);showRecaptcha('recaptcha_div');}else{document.getElementById(update[var1]).innerHTML = update[var2];/*check for battle win text*/var mysearchtxt = 'You defeated the';var wheretosearch = update[var2];var mysearchtest = wheretosearch.search(mysearchtxt);if (mysearchtest != -1){/*win, add to kill counter*/var mykillinc = document.getElementById('add_killinc').innerHTML;var mykillinc_int = mykillinc.replace(/,/gi,'');mykillinc_int = parseFloat(mykillinc_int); document.getElementById('add_killinc').innerHTML = addThouCommas(mykillinc_int + parseFloat(1)); }/*check for battle defeat text*/mysearchtxt2 = 'You were defeated';var mysearchtest2 = wheretosearch.search(mysearchtxt2);if(mysearchtest2 != -1){/*defeat, add to counter*/var mydeathinc = document.getElementById('add_deathinc').innerHTML;var mydeathinc_int = mydeathinc.replace(/,/gi, '');mydeathinc_int = parseFloat(mydeathinc_int);document.getElementById('add_deathinc').innerHTML = mydeathinc_int + 1;}}currentUpdate = currentUpdate + 1;var1 = var1 + 2;var2 = var2 + 2;}if (actioninprogress == 0){document.getElementById('actiontimer').innerHTML = '0.0';}}}}");