scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           Skip Share
// @namespace      Boupjof
// @description    Permet de regarder une vidéo sans avoir besoin de la partager à tout sont mur Facebook
// @include        http://www.humha.info/*
// @include        http://www.2424buzz.com/*
// @include        http://www.top100videos.fr/*
// @include        http://paf-le-buzz.fr/*
// @include        http://megavideoz.net/*
// @include        http://www.devilbuzz.net/*
// @include        http://www.salameche.com/*
// @include        http://docteur-lol.net/*
// @include        http://info-deroutante.info/*
// @include        http://www.lejournalduweb.fr/*
// @include        http://www.video-buzz-fb.fr/*
// @include        http://www.videos2ouf.biz/*
// @include        http://videos2ouf.biz/*
// @include        http://www.stopandbuzz.fr/*
// @include        http://buzzbook.tv/*
// @include        http://buzz.affiliacademie.fr/*
// @include        http://docteur-buzz.com/*
// @include        http://www.docteur-buzz.com/*
// @include        http://www.big-buzz.net/*
// @include        http://www.paf-le-buzz.fr/*
// @include        http://mwimwi.com/*
// @include        http://www.palkia.fr/*
// @include        http://excellentissime.com/*
// @include        http://www.buzz4ever.fr/*
// @include        http://www.buzzacademy.fr/*
// @include        http://www.ultrafunvid.info/*
// @include        http://www.video-zap.fr/*
// @include        http://www.fatf8ce.net/*
// @include        http://www.figuevideo.eu/*
// @include        http://zirar.in/*
// @version        2.2
// URL : http://userscripts.org/scripts/show/104734
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below metadata

if ( document.domain == "www.2424buzz.com" ) {
	document.getElementById('fb2_infos').style.display = 'none';
	document.getElementById('lecteur').style.display = 'block';
}

if( document.domain == "www.top100videos.fr" ){
	setTimeout( 'load_vid();', 1000 );
}

if( document.domain == "paf-le-buzz.fr" ){
	setTimeout( 'load_vid();', 1000 );
}

if( document.domain == "megavideoz.net" ){
	setTimeout( 'playvideo();', 1000 );
}

if( document.domain == "www.devilbuzz.net" ){
	setTimeout( 'playlavideo(2);', 1000 );
}

if( document.domain == "www.humha.info" ){
	setTimeout( 'load_vid2();', 1000 );
}

if( document.domain == "www.salameche.com" ){
	setTimeout( 'done();', 1000 );
}

if( document.domain == "docteur-lol.net" ){
	setTimeout( 'playvideo();', 1000 );
}

if( document.domain == "info-deroutante.info" ){
	window.open('http://actualite-revoltante.info/video.php','_self');
}

if( document.domain == "www.lejournalduweb.fr" ){
	setTimeout( 'playlavideo(2);', 1000 );
}

if( document.domain == "www.video-buzz-fb.fr" ){
	setTimeout( 'playvideo();', 1000 );
}

if( document.domain == "www.videos2ouf.biz" ){
	setTimeout( 'playvideo();', 1000 );
}

if( document.domain == "videos2ouf.biz" ){
	setTimeout( 'playvideo();', 1000 );
}

if( document.domain == "www.stopandbuzz.fr" ){
	setTimeout( 'playlavideo(2);', 1000 );
}

if( document.domain == "buzzbook.tv" ){
	setTimeout( 'lecture();', 1000 );
}

if( document.domain == "buzz.affiliacademie.fr" ){
	unsafeWindow.b58587 = true;
	unsafeWindow.ab1 = true;
	setTimeout( 'lecture();', 1000 );
}

if( document.domain == "docteur-buzz.com" ){
	setTimeout( 'playvideo();', 1000 );
	setTimeout( 'playlavideo(2);', 1000 );
}

if( document.domain == "www.docteur-buzz.com" ){
	setTimeout( 'playvideo();', 1000 );
	setTimeout( 'playlavideo(2);', 1000 );
}

if( document.domain == "www.big-buzz.net" ){
	setTimeout( 'lecture();', 1000 );
}

if( document.domain == "www.paf-le-buzz.fr" ){
	setTimeout( 'load_vid();', 1000 );
}

if( document.domain == "mwimwi.com" ){
	unsafeWindow.$('.player').hide();
	unsafeWindow.$('.video').show();
	setTimeout( 'allwooo();', 1000 );
	setTimeout( 'load_vid();', 7000 );
}

if( document.domain == "excellentissime.com" ){
	unsafeWindow.$('.player').hide();
	unsafeWindow.$('.video').show();
	setTimeout( 'allwooo();', 1000 );
	setTimeout( 'load_vid();', 7000 );
}

if( document.domain == "www.palkia.fr" ){
	unsafeWindow.var_fb2_share = true;
	setTimeout( 'afficher_lecteur2();', 1000 );
}

if( document.domain == "www.buzz4ever.fr" ){
	unsafeWindow.$('#confirme_jaime').empty().hide();
	unsafeWindow.$('#lecteur').show();
}

if( document.domain == "www.buzzacademy.fr" ){
	setTimeout( 'playlavideo(2);', 1000 );
}

if( document.domain == "www.ultrafunvid.info" ){
	setTimeout( 'play_vid();', 1000 );
}

if( document.domain == "www.fatf8ce.net" ){
	unsafeWindow.$("#lec").val(1);
	setTimeout( 'playvideo();', 1000 );
}

if( document.domain == "www.video-zap.fr" ){
	unsafeWindow.cookname = document.location.href.substring(document.location.href.lastIndexOf('video-'),document.location.href.lastIndexOf('.html')); 
	var expireDate = new Date();
	expireDate.setTime(expireDate.getTime()+800*24*3600*1000);
	document.cookie=unsafeWindow.cookname+"="+escape('OK')+";expires="+expireDate.toGMTString();
	location.replace(href+'?ref=unlock');
}

if( document.domain == "www.figuevideo.eu" ){
	unsafeWindow.lec = 1;
	setTimeout( 'lecture();', 1000 );
}

if( document.domain == "zirar.in" ){
	unsafeWindow.$('.player').hide();
	unsafeWindow.$('.video').show();
	setTimeout( 'allwooo();', 1000 );
	setTimeout( 'load_vid();', 7000 );
}

var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '104734', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
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
