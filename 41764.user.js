// ==UserScript==
 
// @name         twitter tool store

// @namespace    http://userscripts.org/

// @description  Tools links to the Twitter sidebar. If you do better one I'll delete.

// @include      http://twitter.com/*

// @include      https://twitter.com/*
// @version 	2.0

// @author       innit4theminute

// ==/UserScript==

// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved

CheckScriptForUpdate = {

  // Config values, change these to match your script

 id: '41764', // Script id on Userscripts.org

 days: 2, // Days to wait between update checks



 // Don't edit after this line, unless you know what you're doing ;-)

 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],

 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],

 time: new Date().getTime() | 0,

 call: function(response) {

    GM_xmlhttpRequest({

      method: 'GET',

	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',

	  headers: {

	  'User-agent': window.navigator.userAgent,

	    'Accept': 'application/atom+xml,application/xml,text/xml',

	    },

	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}

      });

  },

 compare: function(xpr,response) {

    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];

    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];

    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {

      GM_setValue('updated', this.time);

      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');

    } else if ( (this.xversion) && (this.xversion != this.version) ) {

      if(confirm('Do you want to turn off auto updating for this script?')) {

	GM_setValue('updated', 'off');

	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});

	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');

      } else {

	GM_setValue('updated', this.time);

      }

    } else {

      if(response) alert('No updates available for '+this.name);

      GM_setValue('updated', this.time);

    }

  },

 check: function() {

if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);

if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {

      this.call();

	  tnt_twitter.clear_cache();

    } else if (GM_getValue('updated', 0) == 'off') {

      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});

    } else {

      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});

    }

    }

};

if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();


// Based in Twitter Search Box by Sebastian Celis via Hannibal Smith



var usenam = document.getElementsByTagName('title')[0].text.replace(/Twitter \/ /g,'');

if (usenam == 'Home') usenam = document.getElementById('profile_link').href.replace(/.*\//,'');



var friendsNode = document.getElementById('friends');

if (typeof(friendsNode) != "undefined" && friendsNode != null)

{

	var html = [];

	html[html.length] = '<h1>Tool Store</h1>';

	html[html.length] = '</div>';
	html[html.length] = '<a href="http://search.twitter.com/search?q=%40' + usenam + '">ˀ✉twtr </a>';
	html[html.length] = '<a href="http://twittercounter.com/?username=' + usenam + '"'; 		

	html[html.length] = ' style="margin-left:30px;"> tCntr </a>';

	html[html.length] = '<a href="http://twitfave.com/' + usenam + '"> tFav </a>';
	html[html.length] = '<a href="http://twitter-friends.com/index.php?user=' + usenam + '"> tFnds </a>';
	html[html.length] = '<a href="http://twitter.grader.com/' + usenam + '"> tGrdr </a>';
	html[html.length] = '<a href="http://twitterholic.com/' + usenam + '/"> tHol </a>';
//	html[html.length] = '<br>';

	html[html.length] = '<a href="http://tweetrush.com/' + usenam + '/"> tRush </a>';

	html[html.length] = '<a href="http://www.twittersheep.com/?' + usenam + '"> tShp </a>';
	html[html.length] = '<a href="http://tweetstats.com/graphs/' + usenam +'"> tSts </a>';
	html[html.length] = '<a href="http://www.twellow.com/search.php?q=' + usenam +'"> ☏twlw </a>';  
	html[html.length] = '<a href="http://twitter100.com/' + usenam +'"'; 			

	html[html.length] = ' style="margin-left:30px;"> t100</a>';

	var div = document.createElement('div');

	div.className = 'section last';

	div.innerHTML = html.join('');

	followingNode = friendsNode.parentNode;

	followingNode.parentNode.insertBefore(div, followingNode);
}store