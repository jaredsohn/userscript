// ==UserScript==
// @name        KiriliMod
// @namespace   KiriliMod
// @include     http://whalemaidgames.net/kirili/forum*
// @include     http://91.121.109.140/kirili/forum*
// @exclude     http://whalemaidgames.net/kirili/forum/index.php?action=post*
// @exclude     http://91.121.109.140/kirili/forum/index.php?action=post*
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue  
// @version     20120827
// ==/UserScript==

//ajout du support des fonctions GM_ pour chrome
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

var cookieTestor = readCookie('SMFCookie11')
if( cookieTestor )
{
	var showChat = GM_getValue("showChat",false)

	var allUnread = '<a href="http://91.121.109.140/kirili/forum/index.php?action=unread;all;start=0">Tous les messages non lus.</a>';
	var allUnreadLink = '<a class="button_strip_print active" href="http://91.121.109.140/kirili/forum/index.php?action=unread;all;start=0" rel="new_win nofollow"><span class="last">Tous les messages non lus</span></a>';

	//remplacement du "Messages non lus depuis votre dernière visite" en "Tous les messages non lus"
	document.body.innerHTML= document.body.innerHTML.replace('<a href="http://91.121.109.140/kirili/forum/index.php?action=unread">Messages non lus depuis votre dernière visite.</a>',allUnread);

	//Ajout d'un bouton "Tous les messages non lus" en haut et en bas des fils de discussion
	var printButton = document.evaluate("//li/a[@class='button_strip_reply active']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for (i=0; i<printButton.snapshotLength; i++)
	{
		var sp1 = document.createElement("li"); // on crée une balise li	
		sp1.innerHTML = allUnreadLink;

		printButton.snapshotItem(i).parentNode.parentNode.insertBefore(sp1, printButton.snapshotItem(i).nextSibling);
	}

	//Ajout d'un bouton "Tous les messages non lus" en haut et en bas des forums
	printButton = document.evaluate("//li/a[@class='button_strip_new_topic active']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for (i=0; i<printButton.snapshotLength; i++)
	{
		var sp1 = document.createElement("li"); // on crée une balise li	
		sp1.innerHTML = allUnreadLink;

		printButton.snapshotItem(i).parentNode.parentNode.insertBefore(sp1, printButton.snapshotItem(i).nextSibling);
	}

	//Ajout pour le chat
	if( window.location.search.indexOf("action=unread") != -1 || window.location.search=="") //on n'affiche le chat que sur l'accueil et la page des non lus
	{
		var refUpperSection = document.getElementById("upper_section");
		var ShowHide = document.createElement("a");
		ShowHide.innerHTML = 'Show/Hide Chat';
		ShowHide.setAttribute("id","ShowHide");
		ShowHide.setAttribute("style","font-weight:bold;");
		ShowHide.setAttribute("href","#");

		refUpperSection.appendChild(ShowHide);

		document.getElementById('ShowHide').addEventListener("click", toggle_chat, false);

		var refUpperSection = document.getElementById("upper_section");
			
		if(showChat)
		{	
			var divChat = document.createElement("div");
			divChat.innerHTML = '<iframe src="http://91.121.109.140/kirili/forum/chat/" width="100%" height="400" frameborder=0></iframe>';
			divChat.id = "divChat";

			refUpperSection.appendChild(divChat);
		}
		else
		{	
			var node = document.getElementById("divChat");
			if (node.parentNode) {
			  node.parentNode.removeChild(node);
			}	
		}
	}
}
function toggle_chat(){

	var refUpperSection = document.getElementById("upper_section");
	
	if(document.getElementById('divChat'))// Si le Chat est affiché on le cache
	{		
		var node = document.getElementById("divChat");
		if (node.parentNode) {
		  node.parentNode.removeChild(node);
		}
		showChat=false;
	}
	else // Si le Chat est caché on l'affiche
	{
		var divChat = document.createElement("div");
		divChat.innerHTML = '<iframe src="http://91.121.109.140/kirili/forum/chat/" width="100%" height="400" frameborder=0></iframe>';
		divChat.id = "divChat";

		refUpperSection.appendChild(divChat);
		showChat=true;
	}
	
	GM_setValue("showChat",showChat);
}


function readCookie(name) {

	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return 1;
	}
	return 0;
}
