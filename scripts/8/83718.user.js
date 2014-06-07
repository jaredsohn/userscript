// ==UserScript==
// @name           Move new GMail left menu
// @author         szrudi
// @namespace      pano360.hu/movegmailmenu
// @description    Move new gmail left menu under list of folders
// @version        1.4.4
// @license        CC by-nc-sa  http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==

//Based on 1nfected's scripts
//http://userscripts.org/scripts/show/82105
//http://userscripts.org/scripts/show/75047
(function() {

const LOG_PREFIX = 'MoveLeftMenu: ';
isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
log = isGM ? GM_log : window.opera ? function(msg) { opera.postError(LOG_PREFIX+msg); } : function(msg) { try { console.log(msg); } catch(e) {} }

var canvas = document.getElementById('canvas_frame');
if (canvas && canvas.contentDocument) var gmail = canvas.contentDocument;
if (!gmail) return;	

var runCount = 0;
var wasContacts = undefined; // we need this to check if Mail/Contacts switching completed
log('Moving menu..');
moveMenu();

function moveMenu() {
	if (runCount++ > 20) {
		//just a safeguard, so we do not get an infinite cycle if something goes wrong
		log('I give up...');		
		return;
	}
	if (gmail.URL == 'about:blank'){
		// every once in a while this happens in FF for me..
		log('Lost gmail iframe.'); 
		gmail = canvas.contentDocument;
	}
	var sidebar_divs=[], sidebar_nav=null, contacts_btn=null, mail_btn=null;
	// searching for nodes that we need to start moving stuff
	var sidebar = $('//div[contains(@class,"pp")]',gmail,true);
	if (sidebar) {
		sidebar = sidebar.parentNode;
    	sidebar_divs =	$('./div',gmail,false,sidebar);
    	sidebar_nav =	$('.//div[@role="navigation"]',gmail,true,sidebar);
   	}
	//if (nav) nav.style.backgroundColor = 'red'; else log('Nav not found');

	var contacts =	$('.//div[contains(@class,"vI8oZc cM")]',gmail,true);
	if (sidebar && sidebar_divs[0] && sidebar_nav && (Boolean(contacts) != wasContacts)) {
		log('Sidebar and nav found, moving stuff..');
    	
    	// finding div that contains the nav stuff
    	while ( sidebar != sidebar_nav.parentNode) {
    		sidebar_nav = sidebar_nav.parentNode;
		}
		nav_sibling = sidebar_nav.nextSibling;
		
		// moving every div to below nav until we reach nav
		var i;
		for ( i = 0; sidebar_divs[i] != sidebar_nav && i < sidebar_divs.length; i++) {
			sidebar.insertBefore(sidebar_divs[i], nav_sibling);
		}
		
		// modifing css to look better
		sidebar_divs[i-1].className = sidebar_divs[i-1].className.replace(/\bT4\b/,'');
		sidebar_nav.className += " T4";
		var Z9ClassDivs = $('.//div[contains(@class,"z9")]',gmail,false,sidebar);
		for ( var int = 0; int < Z9ClassDivs.length; int++) {
			var div = Z9ClassDivs[int];
			div.style.margin = 0;
			div.style.padding = "1px 5px 2px 25px";
		}
		
		// adding listeners to mail/contacts buttons, to handle switching between them
    	mail_btn =		$('.//div[contains(@class,"CX pp")]/div[1]',gmail,true,sidebar);
    	contacts_btn =	$('.//div[contains(@class,"CX pp")]/div[2]',gmail,true,sidebar);
		if (contacts) {
			mail_btn.addEventListener('click',moveMenu,false);
			contacts_btn.removeEventListener('click',moveMenu,false);
			log('Added Mail button listener.');
			wasContacts = true;
		} else {
			mail_btn.removeEventListener('click',moveMenu,false);
			contacts_btn.addEventListener('click',moveMenu,false);
			log('Added Contacts button listener.');
			wasContacts = false;
		}
		
		runCount = 0;
		log('Everything should be ok, stuff moved. :)');
	} else {
		// gmail did not fully load yet, so we need to retry
		nextTry = runCount*50<500?runCount*50:500;
		if (!sidebar) log('Sidebar not found, I\'ll retry in '+nextTry+'ms..'); else 
		if (!(sidebar_divs[0])) log('Sidebar divs not found, I\'ll retry in '+nextTry+'ms..'); else 
		if (!sidebar_nav) log('Nav not found, I\'ll retry in '+nextTry+'ms..'); else
		if (Boolean(contacts) == wasContacts) log('Waiting for Contacts-Mail switch, I\'ll retry in '+nextTry+'ms..');
		setTimeout(moveMenu,nextTry);
	}	
}

//All in one function to get elements
function $(q,root,single,context) {
	root = root || document;
	context = context || root;
	if(q[0] == '#') return root.getElementById(q.substr(1));
	else if(q.match(/^\/|^\.\//)) {
		if(single) return root.evaluate(q,context,null,9,null).singleNodeValue;
		var arr = []; var xpr = root.evaluate(q,context,null,7,null);
		for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
		return arr;
	}
	else if(q[0] == '.') return root.getElementsByClassName(q.substr(1));
	return root.getElementsByTagName(q);
}

var AnotherAutoUpdater = {
	// Config values, change these to match your script
	version: '1.4.4', // Changer version manually with each update. Important!
	name: 'Move new GMail left menu',
	id: '83718', // Script id on Userscripts.org
	days: 2, // Days to wait between update checks
	
	// Don't edit after this line, unless you know what you're doing ;-)
	time: new Date().getTime(),
	call: function(response) {
	    GM_xmlhttpRequest({
	        method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
	        });
	    },
	   compare: function(xpr,response) {
	      this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
	  this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
	  if ( (this.xversion) && (this.xname[1] == this.name) ) {
	    this.xversion = this.xversion[1].replace(/\./g, '');
	    this.xname = this.xname[1];
	  } else {
	    if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
	    return false;
	  }
	  if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
	    GM_setValue('updated_'+this.id, this.time+'');
	    top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
	  } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
	    if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
	    } else {
	GM_setValue('updated_'+this.id, this.time+'');
	    }
	  } else {
	    if(response) alert('No updates available for '+this.name);
	    GM_setValue('updated_'+this.id, this.time+'');
	  }
	},
	check: function() {
	  if (GM_getValue('updated_'+this.id, 0) == "off")
	    GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
	  else {
	    if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
	      GM_setValue('updated_'+this.id, this.time+'');
	      this.call();
	    }
	    GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
	      }
	    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();


})();
