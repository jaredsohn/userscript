// ==UserScript==
// @name			AdderPro
// @description		Displays projected soldiers to be gained from player's morale, as well as officers
// @include         http://*kingsofchaos.com/*
// @exclude         http://*.kingsofchaos.com/index.php*
// @exclude         http://*.kingsofchaos.com/error.php*	
// @exclude			http://*.yieldmanager.com/*
// ==/UserScript==

var sHTML = document.body.innerHTML;

(function(){

if(document.URL.match("kingsofchaos.com/base.php")) 
	{
	base();
	}
else if(document.URL.match("kingsofchaos.com/train.php"))
	{
	training();
	}

})();

function base()
{
	var sUsername = FindText(document.title,"Kings of Chaos :: ","'s "); //returns user's name
	var sUserMorale = FindText(sHTML,'Army Morale', "td>");  
	var sUserCapture = FindText(sUserMorale,">", "<");
	var sUserTotalMorale = removeComma(sUserCapture);
	DisplayMessage("Hello, " + sUsername + "<br>Your morale is: " + sUserTotalMorale);
	// alert(sHTML);
	alert(sUserMorale);
}		
	
function training()
{
	alert('You are now on the training page, captain!');
}



// None KoC Functions
function FindText(str, str1, str2)
{
  var pos1 = str.indexOf(str1);
  if (pos1 == -1) return '';
  
  pos1 += str1.length;
  
  var pos2 = str.indexOf(str2, pos1);
  if (pos2 == -1) return '';
  
  return str.substring(pos1, pos2);
}

// Removes comma's in gold/morale/soldiers
function removeComma(num) {
	return num.replace(/,/g, "");
}

function DisplayMessage(message)
{

var gm_button = document.getElementById("myMsg");
	if(gm_button){
		gm_button.innerHTML = message;
	}else{
		var gm_button=document.createElement('div');
		gm_button.setAttribute('name','myMsg');
		gm_button.setAttribute('id','myMsg');
		gm_button.setAttribute('style','position:fixed;bottom:10px;right:10px;background-color:#FFFFFF;border:2px solid #000000;padding:5px;text-align:center;');
		var gm_paragraph=document.createElement('p');
		gm_paragraph.setAttribute('id','gmMyMsg');
		gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
		gm_paragraph.innerHTML = message;

		var gm_span_1=document.createElement('span');
		gm_span_1.setAttribute('id','gmMsgspan');
		gm_span_1.setAttribute('style','cursor:pointer;');

		document.getElementsByTagName('body')[0].appendChild(gm_button);
		gm_button.appendChild(gm_paragraph);
		gm_paragraph.appendChild(gm_span_1);
	}
}