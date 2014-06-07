// ==UserScript==
// @name           The West_-_Dernier Message
// @description    Derniere page du forum
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.27
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows

(function(){
	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements);
	}
	
	c = getElementsByClassName(document,"table","forum_table")[0];
	trs = c.getElementsByTagName("tr");
	for(i=1;i<=trs.length;i++) {		
		tds=trs[i].getElementsByTagName("td");
		themelink = tds[0].getElementsByTagName("a")[0].getAttribute('href');
		answers = tds[4].childNodes[0].nodeValue;
		lastpostauthor = tds[3].getElementsByTagName("a")[0];
		lastpostauthorparent = lastpostauthor.parentNode;
		temp = document.createElement('div');
		author = document.createElement('a');
		author.setAttribute('href',lastpostauthor.getAttribute('href'));
		author.innerHTML=lastpostauthor.childNodes[0].nodeValue+" ";
		temp.appendChild(author);
		page = Math.floor(answers/10);
		jump = document.createElement('a');
		jump.setAttribute('href',themelink+"&page_current="+page);
		jump.innerHTML="<img src='http://forum.the-west.fr/the-west/buttons/lastpost.gif'/>";
		temp.appendChild(jump);
		lastpostauthorparent.replaceChild(temp,lastpostauthor); 
		lastpostauthorparent.removeChild(lastpostauthorparent.getElementsByTagName("br")[0]);
	}
})();
/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_69', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_69', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=69&version=0.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();