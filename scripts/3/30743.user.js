//
// ==UserScript==
// @name         Improve Youtube Embed Code
// @namespace     http://cyberfang.uni.cc/
// @description Replace the Youtube html code with a shorter better code, includes the title of the video in the html. also copies the html automatically
// @include        http://*youtube.com/watch?*
// ==/UserScript==

(function()
{


function customOptions() {
var value="&hl=en&fs=1&rel=0&autoplay=1";

return value;
}



	function copyToClipboard(texttocopy) {
		// if you would like to host the file  _clipboard.swf in you own server you need to change is location address
		  var clipboardswfpath="http://www.gialloporpora.netsons.org/script/_clipboard.swf";
		 var flashcopier = 'flashcopier';
		if(!document.getElementById(flashcopier)) {
			var divholder = document.createElement('div');
			divholder.id = flashcopier;
			document.body.appendChild(divholder);
    }
		document.getElementById(flashcopier).innerHTML = '';
		var divinfo = '<embed src="'+clipboardswfpath+'"  FlashVars="clipboard='+encodeURIComponent(texttocopy)+'" width="0" height="0"></embed>';
		document.getElementById(flashcopier).innerHTML = divinfo;
}
function Valid_HTML_Listener()
{
	this.select();
	copyToClipboard(this.value);
}
function g(n)
{
	var rg="[\\?&]"+n+"=([^&#]*)";
	var r=new RegExp(rg);
	 var s = r.exec(window.location.href);
	 if(s==null)return "Ã‚Â§";else return s[1];
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

var m=g("v");
var pageTitle = document.title;
var videoTitle = pageTitle.replace('YouTube - ', '');
var options=customOptions();
if (m!=""){
	var S="<center><a href=\"http://www.youtube.com/watch?v="+m+"\" target=\"_blank\"><font size=\"+1\"><b>"+videoTitle+"</b></font></a><br><object type=\"application/x-shockwave-flash\" data=\"http://www.youtube.com/v/"+m+options+"\" height=\"350\" width=\"425\"></object></center><br>";
	var x=document.getElementById('embed_code');
	x.value=S;
	x.id='valid_html_code';
	x.name='valid_html_code';
	x.addEventListener('click',Valid_HTML_Listener,false);

	}

var embedbox = document.getElementById("watch-embed-div");
var customizer = document.createElement("div");
customizer.innerHTML = "<center>Options For Embed SOON!<br><small>For now, you can find the options inside the scripts source.</small></center>";
insertAfter(customizer, embedbox);

}


)();
