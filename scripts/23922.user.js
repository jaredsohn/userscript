// ==UserScript==
// @name          Last.fm + Encyclopaedia Metallum 
// @author 	    Sepehr Lajevardi
// @namespace  http://lajevardi.persiangig.com/code/gm/
// @description   Shows a link to Encyclopaedia Metallum (metal-archives.com) on (new)Last.fm metal artist and group pages.
// @identifier      http://userscripts.org/scripts/source/23922.user.js
// @include        http*://*last.fm/music/*
// @include        http*://*last.fm/group/*
// @include        http*://*lastfm*/music/*
// @include        http*://*lastfm*/group/*
// ==/UserScript==

//This script is in need of a whole rewrite! it can perform a little bit faster.

(function (){
	function isGroupPage(){
		if(location.href.indexOf("/group/") != -1)
			return true;
		else return false;
	}
	
	function getArtistName(){
			//On Group Pages
			var catalogueHead = document.getElementById("catalogueHead");
			//pos = location.href.indexOf("/group/");
			//if(pos != -1){
			if(isGroupPage()){
				var divsArray = document.getElementsByTagName("div");
				for(var i in divsArray)
					  if(divsArray[i].className == "groupHead")
						  return divsArray[i].childNodes[1].firstChild.childNodes[1].nodeValue;
			}
			
			//On Album or Track pages, Terminate Process.
			pos = location.href.indexOf("/music/"); 
			url = location.href.substring("/music/".length+pos);
			pos = url.indexOf("/"); 
			if(pos!=-1 && url.substring(pos).length>1) return false; 
			
			//On Artist Pages
			if(catalogueHead.childNodes[1].firstChild) 
				 return catalogueHead.childNodes[1].firstChild.nodeValue;
	}
	
	function createLink(artistName){
			return "http://metal-archives.com/search.php?string=" + artistName + "&type=band";
	}
	
	function insertLink(artistLink){
			//Creating New Link Element
			var newLinkElement = document.createElement('a');	
			//Setting Required Attributes
			newLinkElement.setAttribute("href", artistLink);
			newLinkElement.setAttribute("id", "artistMetalArchivesLink"); //To work with other scripts
			newLinkElement.setAttribute("style", "font-family:verdana,sans !important;font-size:8pt !important;font-weight:normal !important;color:#0187c5;");
			//Creating Text Link	
			newLinkElement.innerHTML = "<cite style='text-decoration:none;color:#000;'>@</cite>Encyclopaedia Metallum";
			
			//Inserting Link Element
			if(!isGroupPage()){ //on an artist page
				var pArray = document.getElementsByTagName("p");
				for(var i in pArray)
					  if(pArray[i].className == "stats")
						 break;
				pArray[i].appendChild( document.createTextNode("  ") ); //Need some space here!
				pArray[i].appendChild(newLinkElement); //Append in <h1> tag
				}
			else{ //on a group page
				var tmp;
				var divsArray = document.getElementsByTagName("div");
				for(var i in divsArray)
					  if(divsArray[i].className == "groupHead"){
						  tmp = divsArray[i].childNodes[1];
						  break;
						  }
				tmp.appendChild( document.createTextNode(" ") );				
				tmp.appendChild(newLinkElement);
			}
	}
	
	function processResponse(responseDetails){
			if(responseDetails.responseText.indexOf("No results found.") == -1 && responseDetails.responseText.indexOf("did not match") == -1) //Artist profile is available on Metal Archives or Google Search Page.
				insertLink( createLink(getArtistName()) );
	}
	
	function checkForUpdate(){
		/* To Update Automatically
		thanks to "Seifer" for following stand-alone autoupdater: "http://userscripts.org/scripts/show/12193" */
		scriptName='Last.fm + Encyclopaedia Metallum';
		scriptId='23922';
		scriptVersion=0.32;
		scriptUpdateText='* Minor Bug Fix at group pages!';
	
		var lastCheck = GM_getValue('lastCheck',0);
		var lastVersion = GM_getValue('lastVersion',0);
		var d = new Date();
		var currentTime = Math.round(d.getTime()/1000); // Unix time in seconds
		if (parseInt(navigator.appVersion)>3){
			if (navigator.appName=="Netscape") {
				winW = window.innerWidth;
				winH = window.innerHeight;
			}
			if (navigator.appName.indexOf("Microsoft")!=-1){
				winW = document.body.offsetWidth;
				winH = document.body.offsetHeight;
			}
		}
		if (currentTime > (lastCheck + 86400)) { //24 hours after last check
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
				headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
				onload: function(responseDetails) {
					var text = responseDetails.responseText;
					var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
						var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
						if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion){
							GM_addStyle('#gm_update_alert{'
						+'	position: fixed;'						
						+'	z-index:100000;'
						+'	top: '+((winH/2)-60)+'px;'
						+'	left: '+((winW/2)-275)+'px;'
						+'	width: 550px;'
						+'	background-color: #efefef;'
						+'	-moz-opacity:0.9;'
						+'	-moz-border-radius:5px;'
						+'	text-align: center;'
						+'	font-size: 8pt;'
						+'	font-family: verdana,sans;'
						+'}'
						+'#gm_update_alert_buttons{'
						+'	position: relative;'
						+'	line-height:16px;'
						+'	top: -5px;'
						+'	margin: 7px;'
						+'}'
						+'#gm_update_alert_button_close{'
						+'	position: absolute;'
						+'	right: 4px;'
						+'	top: 4px;'
						+'	border: 1px solid #000;'
						+'	-moz-border-radius:2px;'
						+'	padding: 3px 5px 3px 5px;'
						+'	border-style: outset;'
						+'	border-width: thin;'
						+'	z-index: inherit;'
						+'	background-color: #000;'
						+'	color: #FFFFFF;'
						+'	cursor:pointer'
						+'}'
						+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a {'
						+'	text-decoration:underline;'
						+'	color: #003399;'
						+'	text-decoration:none;'
						+'	padding-bottom:2px;'
						+'	padding-top:2px;'						
						+'	font-weight: normal;'
						+'	cursor:pointer'
						+'}'
						+'#gm_update_alert_buttons span a:hover{'
						+'	text-decoration:none;'
						+'	font-weight: normal;'
						+'	border-bottom:1px solid #003399;'
						+'	cursor:pointer'
						+'}');
							newversion = document.createElement("div");
							newversion.setAttribute('id', 'gm_update_alert');
							newversion.innerHTML = ''
						+'	GreaseMonkey UserScript Update Notification<br /><br />'
						+'	There is an update available for &quot;<b>'+scriptName+'</b>&quot; <br />'
						+'	<em>You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.</em><br />'
						+'	<br />'
						+'	<div id="gm_update_alert_button_close">'
						+'		Close</div>'
						+'	<b>What do you want to do?</b><br />'
						+'	<div id="gm_update_alert_buttons">'
						+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
						+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
						+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js"><b>Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</b></a></span>&nbsp;&nbsp;'
						+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
						+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
						document.body.insertBefore(newversion, document.body.firstChild);
						document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
						document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
								document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
						document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
						}
					}
			});
		}
	}//checkForUpdate()
	
	function init(){
			checkForUpdate();
			if(!GM_xmlhttpRequest){ //Checking for artist availablity on Metal Archives.
				GM_log("Please upgrade to the latest version of Greasemonkey. The installed version does not support 'GM_xmlhttpRequest()' API.");
			    alert("Please upgrade to the latest version of Greasemonkey.\nThe installed version does not support 'GM_xmlhttpRequest()' API.");
			    return;
			  }
			 
			 var artistName = getArtistName(); 
			 if(artistName)
				GM_xmlhttpRequest({method:"GET", url:createLink(artistName), headers:{"User-agent":"Mozilla/4.0 Greasemonkey", "Accept":"text/html",}, onload:processResponse});			
	}
	
	init(); //Fire up!
	
 })(); 