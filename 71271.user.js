// ==UserScript==
// @name           my 4chan antispam
// @namespace      ee
// @description    removes all current spam posts
// Author: ee
// @include        *4chan.org*
// @include        http://img.4chan.org/*
// @include        http://zip.4chan.org/*
// @include        http://cgi.4chan.org/*
// @include        http://orz.4chan.org/*
// @include        http://boards.4chan.org/*
// @license        Copyright (c) 2010 ee
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		if (          
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=0EOc6y3Wd6U") != -1 || 
posts[i].innerHTML.indexOf("scapegoat is awesome --- subwar") != -1 ||
posts[i].innerHTML.indexOf("This thread completly fails , call me at") != -1)
		{
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
		if (posts[i].innerHTML.indexOf("&gt;&gt;") != -1)
		{
			if(posts[i].innerHTML.length == 44 || posts[i].innerHTML.length == 43)
			{
				posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				i = i - 1;
			}
		}
  		if(posts[i].innerHTML == "Recently upgraded to windows 7, got Q") //
  		{
    			posts[i].innerHTML = "<span style='color:#ff0000>I am a huge spamming faggot!</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://usertest.10001mb.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("lela.has.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://videoupload.eniac.at/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://ufy.me/xchat" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://thebest.owns.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Pic Related: It's me and my bitch" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Pic related... its the iPod Touch I got today from Lockerz." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.craves.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("lelastar.has.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Full video of 2 sixteen year old drunk lesbians having sex in the shower! L-i-n-k i-n p-i-c" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("im so close to getting my copy" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("look what I found lol, pic related" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://t1n[]y.net/f6c4k" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Locâ€¬kerz is an invite-only website where you eaâ€¬rn Pâ€¬TZ (poiâ€¬ntz)." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("u413.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://thebest.owns.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://bwins.eniac.at/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://catastropheblog.webs.com/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("My name is John, and I hate every single one of you. All of you are fat, retarded, no-lifes who spend every second of their day looking at stupid ass pictures. You are everything " ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("now so get in on it while it works. http://fsturl.com/Ft" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://best.swims.it/48.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("main.prospects.at/lela_vid_45285.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("last one 404'd, heres that vid tho. http://videos.relaxed.at/sunday_school_sex.html pic related of course" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.viewing.at/90.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.viewing.at/78.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.dizzy.at/79.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucher-king.com/?join=4972" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("vids.viewing.at/asian_loves_giant_dick.htm" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("last one 404'd, heres that vid tho. videos.rules.it/perfect_tits_and_tight_pussy.htm pic related of course" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.viewing.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("quick tip but you have to perfect the method yourselves." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexyteenvideos.vintagecomputers.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://usertest.66ghz.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://fsturl.com/G1" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexychanvideos.zor.org/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("right now so get in on it before it goes down. http://hurl.no/nTV" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexychanvideosxxx.commodore64.at/html.65" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("www.b.cname.at/39.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("There is an invite limit, so be fast." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("The last thread was removed before I could deliver so heres the vid I promised." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("HER,P0RNO video http://w95.us/videos47" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Links leading to themoneykid or other referral scams will result in your permanent banishment." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  newfags can't red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("www.themoneykid.net" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Make $1000 a week or more." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("And btw the only reason im even sharing this with you nerdy faggots is cos I get points when you do." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Added this week: Free HD BangBus, and Big Tits Round Asses Videos!!! " ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("HER,P0RN VIDE0 http://w95.us/videos47" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherwizard.org?join=2" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easyvouch.c0m?join=1224 (replace c0m with com)" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Step 3. PROFIT!!" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherwizard.org?join=1" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easyvouch" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherwizard.org?join=1" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easy" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easyv0uch.com?join=1239 (replace v0uch with vouch)" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("money.simpler.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexychanvideos.zor.org" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Full video of 2 sixteen year old drunk lesbians having sex in the shower! L-i-n-k i-n p-i-c" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Make $1000 a week or more." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://bandits.66ghz.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherbounty.com/?join=42175" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucher" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("I make 70-120 dollars a day from this site." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("ok /b/ i have something good for you so get in quick." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.square" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("realjb.com?" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Make $1000 a week or more." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("realjb.com " ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("I heard you faggots of 4chan are broke and dont know how to make any money." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("I make 80 dollars a day from this website." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("site is fearmoney.com by the way. sign up do like 5 surveys or w/e and then record you doing surveys with an autoclicker or some shit then afk for a few weeks then profit?" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("fearmoney.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Young Money. Fearmoney.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("www.keshcash.com/?herp=derp" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://thebandits.talk4fun.net/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("1) Sign up and login" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b-bandits.talk4fun.net" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b_bandits.66ghz.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("month, you get it!" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://models.verycool.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Help an anon unlock the secret vid." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
		}
	}
})()		


//



var regexp=/61 KB, 270x366/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/4 KB, 126x112/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


//

(function() {
	var posts = document.getElementsByTagName("embed");
	for (i = 0; i < posts.length; i++)
	{
posts[i].parentNode.removeChild(posts[i]);
		i = i - 1;
	}
})()

//


CheckScriptForUpdate = {
              // 
 id: '71271', // 
 days: 1,     // 
 
 // 
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
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
    if ( (+this.xversion > +this.version) && (confirm('There is a new update to '+this.xname+' . Do you want to update? Please give a positive review if you like it.')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Are you sure you want to turn off auto updating for this script?')) {
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
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();

document.getElementsByName("email", "input")[0].value = "noko";

