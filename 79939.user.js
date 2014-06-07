// ==UserScript==
// @name          Glasanje za kongres
// @namespace     http://www.jebotepatak.patka2
// @description	  Proveravanje glasanja za kongres
// @include       http://ww*.erepublik.com/*/elections/*
// @resource      GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript==
//


var xmlhttp;
var currURL = location.href;
var arrURL = currURL.split('/');
var lawNr = arrURL[6];
var law_curr_result="";

function embedSound() {
	bgEmbed = document.createElement("embed");
	bgEmbed.src = "http://www.wyomingwebdesign.com/files/sound_files/scream.wav";
	bgEmbed.autostart = 'false';
	bgEmbed.width=0;
	bgEmbed.height=0;
	bgEmbed.id="sound1";
	bgEmbed.enablejavascript = 'true';
	document.body.appendChild(bgEmbed);
}

var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 3 * ONEMIN ;			// How often is page refreshed (in ms)
var TENSEC = 10 * ONESEC;



function getValues() {
	var yes = document.getElementById('numberOfVotesPro').innerHTML;
	var no = document.getElementById('numberOfVotesAgainst').innerHTML;
	law_curr_result = "YES: "+yes+" NO: "+no;
	var vote_change=0;
	if (yes!=GM_getValue('vote_yes'+lawNr)) {
		GM_setValue('vote_yes'+lawNr, yes);
		//alert(yes);
		vote_change=1;
	}
	if (no!=GM_getValue('vote_no'+lawNr)) {
		GM_setValue('vote_no'+lawNr, no);
		//alert(no);
		vote_change=1;
	}
	if (vote_change==1) {
		callPHP();
		vote_change=0;
	} else {
		vote_change=0;
	}
}


/*if (GM_getValue('vote_yes'+lawNr, -1)==-1) {
	GM_setValue('vote_yes'+lawNr, 0);
}
if (GM_getValue('vote_no'+lawNr, -1)==-1) {
	GM_setValue('vote_no'+lawNr, 0);
}*/


//AJAX
function callPHP() {
	/*xmlhttp=GetXmlHttpObject();
	if (xmlhttp==null) {
	  	alert ("Browser does not support HTTP Request");
	  	return;
  	}
	var url1="http://localhost/erep/Srbija/getJSON.php?";
	url1=url1+"&sid="+Math.random();
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);*/
	
	var url1="http://localhost/erep/Srbija/getJSON.php?";
	url1=url1+"&law="+lawNr;
	url1=url1+"&lawcurrresult="+law_curr_result;
	url1=url1+"&sid="+Math.random();
	GM_xmlhttpRequest({
	  method:"GET",
	  url: url1,
	  headers:{
	    "User-Agent":"monkeyagent",
	    "Accept":"text/monkey,text/xml",
	    },
	  onload:function(details) {
	    alert(details.responseText)
	  }
	});
	
	
}




function stateChanged() {
	if (xmlhttp.readyState==4) {
		//document.getElementById("miniprofile").innerHTML=xmlhttp.responseText;
		//document.getElementById("miniprofile").innerHTML="uspelo";
		alert(xmlhttp.responseText);
	}
}

function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}

//end AJAX

getValues();


	
/*window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	TENSEC
) ;*/
