// ==UserScript==
// @name           BeeMP3 Plus+
// @include        http://*beemp3.com/*
// @description   Removes download timer and lets you play songs directly from search results on www.beemp3.com
// @credits       This is a modification of the BeeMP3 Plus script. All credit for the original leg work goes to Toph All I did was add the embedded music players so you can play all files directly from search results without having to open new tabs.
// ==/UserScript==

var captchainserted = 0;

if(document.location.toString().indexOf('download.php?file=') != -1){
	var url = document.body.innerHTML;
	if(url.indexOf("show_url('") != -1){
		url = url.substring(url.indexOf("show_url('") + 10);
		url = url.substring(0, url.indexOf("')"));
		document.location = url;
	} else if(url.indexOf("cod_ck") != -1){
		document.getElementById('cod_ck').getElementsByTagName('form')[0].addEventListener("submit", validateForm2, true);
	}
} else{
	proclinks();
}

function proclinks(){
	captchainserted = 0;
	var els = document.getElementsByTagName('span');
	for (var i=0; i<els.length; i++) {
		if(els[i].innerHTML.toString().indexOf("Song:") != -1){
			var mparent = els[i].parentNode.parentNode;
			var link = document.createTextNode(mparent.getElementsByClassName('link')[0].innerHTML.replace(" mp3",""));
			var link2 = mparent.getElementsByClassName('link')[1];
			link2.innerHTML = link2.innerHTML.replace(" mp3","");
			var info = mparent.getElementsByClassName('info')[0];
			mparent.innerHTML = "";
			mparent.appendChild(link);
			mparent.appendChild(document.createElement("br"));
			mparent.appendChild(link2);


	
			mparent.appendChild(info);
		}
	}
	var rel = document.getElementsByClassName('right')[0];
	if(rel){
		rel.parentNode.removeChild(rel);
	}
	var allLinks = document.links;
	for (var i=0; i<allLinks.length; i++) {
		var url = allLinks[i].href.toString();
		if(url.indexOf("/download.php?file=") != -1){
			if(true){
				ajaxsubmit(url, i);
			}
			else{
				allLinks[i].addEventListener('click', ajaxsubmit2, true);
			}
		}
	}




}

function pagecomplete2(text){
	if(text.indexOf("show_url('") != -1){
		text = text.substring(text.indexOf("show_url('") + 10);
		text = text.substring(0, text.indexOf("')"));
		document.location = text;
	}
	else if(captchainserted != 1 && text.indexOf("cod_ck") != -1){
		var newtext = text;
		var newtext2 = text;
		newtext2 = newtext2.substring(newtext2.indexOf("file=") + 5);
		newtext2 = newtext2.substring(0, newtext2.indexOf("&"));
		newtext = newtext.substring(newtext.indexOf("cod_ck"));
		newtext = newtext.substring(newtext.indexOf("<p"));
		newtext = newtext.substring(0, newtext.indexOf("';"));
		newtext = newtext.replace("<form ", "<form id='captchaform' action='/chk_cd.php'><input type='hidden' id='filee' name='file' value='" + newtext2 + "'><nothing ").replace('codeb', 'code').replace('Download mp3', 'Verify').replace('to download mp3',':');
		var newdiv = document.createElement("div");
		newdiv.id = 'newdiv';
		newdiv.innerHTML = newtext;
		document.getElementById('block_menu').parentNode.appendChild(newdiv);
		document.getElementById('captchaform').addEventListener("submit", validateForm2, true);
		captchainserted = 1;
	}
}

function pagecomplete(text, i){
	if(text.indexOf("show_url('") != -1){
		text = text.substring(text.indexOf("show_url('") + 10);
		text = text.substring(0, text.indexOf("')"));
		document.links[i].href = text;
		document.links[i].target = "_blank";

var player = document.createElement('div');

player.innerHTML = '<audio controls="controls"><source src="' + text + '" type="audio/mpeg" /></audio>';
player.style.marginTop = '.5em';
		document.links[i].parentNode.appendChild(player);
		
	} else if(captchainserted != 1 && text.indexOf("cod_ck") != -1){
		text = text.substring(text.indexOf("cod_ck"));
		text = text.substring(text.indexOf("<p"));
		text = text.substring(0, text.indexOf("';"));
		text = text.replace("<form ", "<form id='captchaform' action='/chk_cd.php'").replace('onsubmit','null').replace('codeb', 'code').replace('Download mp3', 'Verify').replace('to download mp3',':');
		var newdiv = document.createElement("div");
		newdiv.id = 'newdiv';
		newdiv.innerHTML = text;
		document.getElementById('block_menu').parentNode.appendChild(newdiv);
		document.getElementById('captchaform').addEventListener("submit", validateForm, true);
		captchainserted = 1;
	}
}

function validateForm(eventObject){
	var mygetrequest=new ajaxRequest();
	mygetrequest.onreadystatechange=function(){
		if (mygetrequest.readyState==4){
			if (mygetrequest.status==200){
				document.getElementById('newdiv').parentNode.removeChild(document.getElementById('newdiv'));
				proclinks();
			}
		}
	}
	mygetrequest.open("GET", "/chk_cd.php?code=" + document.getElementById('code_scuka').value, true);
	mygetrequest.send(null);

	if (eventObject.stopPropagation) eventObject.stopPropagation();
	if (eventObject.preventDefault) eventObject.preventDefault();
	if (eventObject.preventCapture) eventObject.preventCapture();
   	if (eventObject.preventBubble) eventObject.preventBubble();
}

function validateForm2(eventObject){
	var mygetrequest=new ajaxRequest();
	mygetrequest.onreadystatechange=function(){
		if (mygetrequest.readyState==4){
			if (mygetrequest.status==200){
				if(captchainserted != 0){
					document.getElementById('newdiv').parentNode.removeChild(document.getElementById('newdiv'));
				}
				var theurl = mygetrequest.responseText;
				theurl = theurl.substring(theurl.indexOf('http'));
				document.location = theurl;
			}
		}
	}
	mygetrequest.open("GET", "/chk_cd.php?id=" + document.getElementById('filee').value + "&code=" + document.getElementById('code_scuka').value, true);
	mygetrequest.send(null);

	if (eventObject.stopPropagation) eventObject.stopPropagation();
	if (eventObject.preventDefault) eventObject.preventDefault();
	if (eventObject.preventCapture) eventObject.preventCapture();
   	if (eventObject.preventBubble) eventObject.preventBubble();
}

function ajaxsubmit(url, i)
{
	var mygetrequest=new ajaxRequest();
	mygetrequest.onreadystatechange=function(){
		if (mygetrequest.readyState==4){
			if (mygetrequest.status==200){
				pagecomplete(mygetrequest.responseText, i);
			}
		}
	}
	mygetrequest.open("GET", url, true);
	mygetrequest.send(null);
}

function ajaxsubmit2(eventObject)
{
	var mygetrequest=new ajaxRequest();
	mygetrequest.onreadystatechange=function(){
		if (mygetrequest.readyState==4){
			if (mygetrequest.status==200){
				pagecomplete2(mygetrequest.responseText);
			}
		}
	}
	mygetrequest.open("GET", eventObject.target.href.toString(), true);
	mygetrequest.send(null);
	if (eventObject.stopPropagation) eventObject.stopPropagation();
	if (eventObject.preventDefault) eventObject.preventDefault();
	if (eventObject.preventCapture) eventObject.preventCapture();
   	if (eventObject.preventBubble) eventObject.preventBubble();
}

function ajaxRequest(){
 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
 if (window.ActiveXObject){
  for (var i=0; i<activexmodes.length; i++){
   try{
    return new ActiveXObject(activexmodes[i]);
   }
   catch(e){
   }
  }
 }
 else if (window.XMLHttpRequest)
  return new XMLHttpRequest();
 else
  return false;
}