// ==UserScript==
// @name           TLR Script
// @namespace      TLR
// @include        http://www.thelostrunes.com/game.php
// ==/UserScript==




var SamTimer;
var playername = document.getElementById("mcname").innerHTML;
var chatinput = document.getElementById("chatinput");

chatinput.setAttribute('autocomplete','off');

function excSam() {
	document.title = "The Lost Runes";
}


	
function Start() 
{	
excSam();
	var butt = document.getElementById("battlebutton").value;
	var Gtimer = document.getElementById("actiontimer");

	if (Gtimer.innerHTML == "0.0") {
		setTimeout(function(){nextLevel()},500);	
	}
		
	clearTimeout(SamTimer);		
	opt = document.getElementById("autoType").value;
	
	if(butt == "Submit")
	{
		clearTimeout(SamTimer);		
		document.getElementById("status").value = "Security Check";
		document.getElementById("recaptcha_response_field").focus();
		checkBox();
		document.title = "The Lost Runes - Check";
	}
	else
	{
		if(opt == 'Attack')
		{
			SamTimer = setTimeout(function(){Start()},500);		
			if(Gtimer.innerHTML == "0.0") 
			{
				document.getElementById("battlebutton").click();
				document.getElementById("status").value = "Thinking...";
			} else {
				document.getElementById("status").value = "Working...";			
			}
		}
		else if(opt == 'Forage')
		{
			SamTimer = setTimeout(function(){Start()},11000);	
				aaa = document.getElementById("for10");
				evt = document.createEvent("MouseEvents");
				evt.initEvent("click", true, true);
				aaa.dispatchEvent(evt);
				document.getElementById("status").value = "Foraging...";
		}
		else if(opt == 'Woodcut')
		{
			aaa = document.getElementById("wood10");
			evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			aaa.dispatchEvent(evt);
			SamTimer = setTimeout(function(){Start()},11000);	
			document.getElementById("status").value = "Woodcutting...";
		}
		else if(opt == 'Mine')
		{
			aaa = document.getElementById("mine10");
			evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			aaa.dispatchEvent(evt);
			SamTimer = setTimeout(function(){Start()},11000);	
			document.getElementById("status").value = "Mining...";
		}
		else if(opt == 'Quarry')
		{
			aaa = document.getElementById("quar10");
			evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			aaa.dispatchEvent(evt);
			SamTimer = setTimeout(function(){Start()},11000);	
			document.getElementById("status").value = "Quarrying...";
		}
		else
		{
			clearTimeout(SamTimer);		
			document.getElementById("status").value = "Idle";
		}
	}
}

function Stop()
{
	document.getElementById("status").value = "Stopped";
	clearTimeout(SamTimer);
}

function checkBox() 
{
	al = document.getElementById("check");
		if (al.checked == 1) {
			alert('Wakey Wakey ;)');			
		}
}

function chatDisabled() {
	checkb = document.getElementById("check2");
		if (checkb.checked == 1) {
			document.getElementById("chatform").style.display = "none";
			document.getElementById("chat").style.display = "none";
			
		} else {
			document.getElementById("chatform").style.display = "block";	
			document.getElementById("chat").style.display = "block";	
		}
}

function banDisabled() {
	bancheck = document.getElementById("bancheck");
		if (bancheck.checked == 1) {
			document.getElementById("header_banner").style.display = "none";
		} else {
			document.getElementById("header_banner").style.display = "block";	
		}
}

function hideMonkey() {
chatinput.value = "I'm using a bot created by Sammeh located at: http://userscripts.org/scripts/show/108798";

var divs = document.getElementsByTagName('input');
var div;
var i = divs.length;

while (i--) {
  div = divs[i];

  if (div.getAttribute('value') == 'Chat') {
    div.click();
  }
}
}
setTimeout(hideMonkey, 2000);
	
	
function nextLevel() {
	var currexp = document.getElementById("mexp").innerHTML;
	var currlvl = document.getElementById("mlevel").innerHTML;
	var nextexp = document.getElementById("mexplvl").innerHTML;

	var currexp = currexp.replace(/,/gi, "");
	var currlvl = currlvl.replace(/,/gi, "");
	var nextexp = nextexp.replace(/,/gi, "");
	var levelIn = parseInt(nextexp) - parseInt(currexp);
	var levelUp = parseInt(currlvl) + 1;

		levelIn += '';
		x = levelIn.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		var levelIn = x1 + x2;

	var set1 = document.getElementById("exp1");

	
	if (!set1) {	
		var exp1 = document.createElement('div');
			exp1.style.width =  "100%";
			exp1.setAttribute('id','exp1');
			exp1.style.textAlign =  "center";
			exp1.style.fontWeight =  "bold";
			exp1.style.color =  "#F656C5";
			exp1.innerHTML =  levelIn + " experience for level " + levelUp + ".";
			document.getElementById("content").appendChild(exp1);	
	} else {
			set1.innerHTML = levelIn + " experience for level " + levelUp + ".";
	}	
	
}
nextLevel();






var hr = document.createElement('hr');
		document.getElementById("content").appendChild(hr);

var welcome = document.createElement('span');
		welcome.innerHTML = "Hi " + playername + ", thanks for using my script :) <br /><br />";		
		document.getElementById("content").appendChild(welcome);

		
		
var status = document.createElement('input');
		status.setAttribute('id','status');
		status.setAttribute('title','status');
		status.setAttribute('align','center');
		status.setAttribute('value','Idle');
		status.className = "box";
		status.disabled = true;				
		document.getElementById("content").appendChild(status);

	
var br = document.createElement('br');
		document.getElementById("content").appendChild(br);
		
var br = document.createElement('br');
		document.getElementById("content").appendChild(br);
	
				
document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + '<select id="autoType"><option value="Attack">Attack</option><option value="Forage">Forage</option><option value="Woodcut">Woodcut</option><option value="Mine">Mine</option><option value="Quarry">Quarry</option></select><a id="for10" onclick="tsNav(2, 1);"></a><a id="wood10" onclick="tsNav(2, 2);"></a><a id="mine10" onclick="tsNav(2, 3);"></a><a id="quar10" onclick="tsNav(2, 4);"></a>';

var br = document.createElement('br');
		document.getElementById("content").appendChild(br);

	
var go = document.createElement('input');
		go.id = "go";
		go.setAttribute('type','submit');
		go.addEventListener("click", Start, false);
		go.value = "Start Script";	
		go.style.width = "100px";			
		document.getElementById("content").appendChild(go);
		
var stop = document.createElement('input');
		stop.setAttribute('type','submit');
		stop.addEventListener("click", Stop, false);
		stop.value = "Stop Script";	
		stop.style.width = "100px";				
		document.getElementById("content").appendChild(stop);

		
		
		
		
		

		
		
// Floating div


var newdiv = document.createElement('div');
		newdiv.setAttribute('id','div1');
		newdiv.style.position = "absolute";
		newdiv.style.left = "0px";
		newdiv.style.top = "0px";
		newdiv.style.border = "1px solid #333333";
		newdiv.style.backgroundColor = "#444444";
		newdiv.style.width = "150px";
		newdiv.style.height = "150px";	
		newdiv.style.color = "orange";	
		document.getElementById("page").appendChild(newdiv);

		

var title = document.createElement('div'); 
		title.style.width = "100%";		
		title.setAttribute('align','center');
		title.style.borderBottom = "1px solid #333333";
		title.style.fontSize = "16px";
		title.style.color = "white";
		title.innerHTML = "Options";		
		newdiv.appendChild(title);
		
var o1m = document.createElement('span'); // Option 1 message
		o1m.innerHTML = " Disable Banner:";		
		newdiv.appendChild(o1m);

var check1 = document.createElement('input');
		check1.addEventListener("click", banDisabled, false);
		check1.setAttribute('id','bancheck');
		check1.setAttribute('type','checkbox');
		newdiv.appendChild(check1);


		
		
var message2 = document.createElement('span');
		message2.innerHTML = " <br />Show/hide Chat:";		
		newdiv.appendChild(message2);

var check2 = document.createElement('input');
		check2.addEventListener("click", chatDisabled, false);
		check2.setAttribute('id','check2');
		check2.setAttribute('type','checkbox');
		check2.setAttribute('title','Works during an action');
		newdiv.appendChild(check2);
			
var message1 = document.createElement('span');
		message1.innerHTML = " Botcheck Alert:";		
		newdiv.appendChild(message1);

var check = document.createElement('input');
		check.setAttribute('id','check');
		check.setAttribute('type','checkbox');
		newdiv.appendChild(check);
		
	
excSam();