// ==UserScript==
// @name PomoPaymo
// @description Add a button to use Paymo with the Pomodoro technique
// @match https://*.paymo.biz/timetracker/client.html
// ==/UserScript==

counterBar = document.getElementById('time_counter');

var pomoButton=document.createElement('button');
pomoButton.type = 'button';
pomoButton.id = 'pomopaymo';
pomoButton.innerHTML = 'Start a Pomodoro';

counterBar.appendChild(pomoButton);
document.getElementById ("pomopaymo").addEventListener ("click", ButtonClickAction, false);


function endPomodoro(){
	document.getElementsByTagName('button')[0].click();
	alert('Pomodoro finished!! Take a little break and start a new one!');
}

function ButtonClickAction (zEvent)
{
	document.getElementsByTagName('button')[0].click();
	setTimeout(endPomodoro,1000*60*25+1000);
}

