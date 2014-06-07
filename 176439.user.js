// ==UserScript==
// @name        VLCMultiTube
// @namespace   0d92f6be108e4fbee9a6a0ee4366b72e
// @include     *://www.putlocker.com/embed/*
// @include     *://www.sockshare.com/embed/*
// @include     *://mooshare.biz/embed/*
// @include     *://www.vidxden.com/*
// @include     *://www.vidbux.com/*
// @include     *://vidbull.com/*
// @include     *://*.vidbull.com/*
// @include     *://stagevu.com/embed*
// @include     *://embed.nowvideo.*/*
// @include     *://embed.movshare.net/*
// @include     *://embed.videoweed.es/*
// @include     *://embed.novamov.com/*
// @include     *://embed.divxstage.eu/*
// @include     *://play.flashx.tv/player/*
// @include     *://movreel.com/*
// @include     *://*.movreel.com/*
// @include     *://motherless.com/*
// @include     *://muchshare.net/*
// @include     *://billionuploads.com/*
// @include     *://180upload.com/*
// @include     *://gorillavid.in/*
// @include     *://www.youporn.com/*
// @include     *://xhamster.com/movies/*
// @include     *://www.twitch.tv/*
// @include     *://drive.google.com/*
// @include     *://vk.com/*
// @include     *://mp4upload.com/embed*
// @version     14
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @updateURL      https://userscripts.org/scripts/source/176439.meta.js
// @downloadURL    https://userscripts.org/scripts/source/176439.user.js

// ==/UserScript==

// If set, this.containerHeight is used for calculating player size. Otherwise window.innerHeight is used.

var stateUpdateFreq = 250;// 250ms
var vlc_id = 'mymovie';
var VLC_status = ["Idle", "Opening", "Buffering", "Playing", "Paused", "Stopped", "ended", "Error"];

var headers = {'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'};

var headersPost = {'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Content-Type': 'application/x-www-form-urlencoded'};

// Ich olen international.
// TODO Add formats too?
var gLang = GM_getValue('vlc-lang', "en");
var gLangs = {
	"en": {
		'LANG'  : 'English',
		'NONE'  : 'None',
		'PLAY'  : 'Play',
		'PAUSE' : 'Pause',
		'STOP'  : 'Stop',
		'FS'    : 'Fullscreen',
		'WIDE'  : 'Wide',
		'DND'   : 'Drag and drop to rearrange.',
		'LINKSAVE' : 'Right click and save.',
		'DOWNLOAD' : 'Download',
		'WATCHYT'  : 'Watch on YT',
		'POSITION' : 'Position',
		'VOLUME'   : 'Volume',
		'PLAYBACKRATE': 'Playback rate',
		'RESETRATE': 'Reset playback rate',
		'MINRATE'  : 'Minimum rate',
		'MAXRATE'  : 'Maximum rate',
		'vlc-config-autoplay' : ['Autoplay', ''],
		'vlc-config-priomap' : ['Always use format priority map', 'Otherwise uses last selected format or prio. map as fallback'],
		'vlc-config-resume'  : ['Resume on format change', ''],
		'vlc-config-forcews' : ['Force 16:9 aspect ratio', '4:3 videos get black bars duh'],
		'vlc-config-forcewide' : ['Always in wide mode', ''],
		'vlc-config-add3d'   : ['Add 3D formats', 'If you wanna watch cross-eyed'],
		'vlc-config-hover'   : ['Hover controls for embedded', ''],
		'vlc-config-loadembed'     : ['Load embedded video info', 'Load video title etc.'],
		'vlc-config-embedcontrols' : ['Less controls on embedded video', 'Not so compact for now'],
		'vlc-config-vertvolume'    : ['Vertical volume bar', 'Experimental'],
		'vlc-config-forcepl' : ['Playlist in wide mode', 'Does nothing for now'],
		'vlc-config-thumb'   : ['Use thumbnail image', ''],
		'vlc-config-rate'    : ['Show playback rate scrollbar', ''],
		//version 32
		'vlc-config-repeat'  : ['Enable repeat', ''],
		'vlc-config-repeat-wait' : ['Wait before repeating:', 'In seconds'],
		//v33
		'vlc-config-wide-posbar' : ['Wider playback position scrollbar', ''],//seekbar, whatever
		//v34
		'POPUP' : 'Popup',
		'vlc-config-popup' : ['Show popup button', ''],
		'vlc-config-popup-autoplay' : ['Autoplay in popup window', ''],
		'vlc-config-popup-separate' : ['Allow multiple popup windows', 'Otherwise popups open in one window'],
		'vlc-config-cache' : ['Buffer length:', 'In seconds. Maximum is 60s.'],
		'vlc-config-volume-max' : ['Maximum volume:', 'Volume restore gets limited to 100% still'],
		//v35+
		'vlc-config-scrolltoplayer' : ['Scroll to player', ''],
		'vlc-config-wide-width' : ['Wide player width:', 'Add "%" for percentage of current window size. Otherwise it is width in pixels.'],
		'vlc-config-dropdown' : ['Config as dropdown', 'Configuration div more like a dropdown menu'],
		'BUFFERINDICATOR' : 'Buffering indicator',
		'vlc-config-uri-fallback' : ['Use fallback host for URIs', 'Use alternative server for videos if available.'],
		'vlc-config-discard-flvs' : ['Discard FLV formats', 'Don\'t add FLV formats as selectable.'],
		//8.2+ / v43+
		'MUTE' : 'Mute',
		'vlc-config-mute-button' : ['Show mute button', ''],
		},
	"et": {
		'LANG'  : 'Eesti',
		'NONE'  : 'Midagi',
		'PLAY'  : 'Mängi',
		'PAUSE' : 'Paus',
		'STOP'  : 'Stop',
		'FS'    : 'Täisekraan',
		'WIDE'  : 'Lai',
		'DND'   : 'Lohista ümber.',
		'LINKSAVE' : 'Parem klikk ja salvesta',
		'DOWNLOAD' : 'Lae alla',
		'WATCHYT' : 'Vaata YT-s',
		'RESETRATE': 'Taasesituskiirus normaalseks tagasi',
		'vlc-config-autoplay' : ['Mängi automaatselt', ''],
		'vlc-config-priomap' : ['Alati kasuta formaadi tähtsuse järjekorda', 'Muidu kasutab viimati valitut või siis prio. mapi jälle'],
		'vlc-config-resume'  : ['Jätka samast kohast formaadi vahetusel', 'Mõni formaat/video ei taha vahest seekida eriti.'],
		'vlc-config-forcews' : ['Jõuga suru pilt 16:9 mõõtudesse', '4:3 saab mustad jutid äärtesse'],
		'vlc-config-forcewide' : ['Alati lai režiim', ''],
		'vlc-config-add3d'   : ['Lisa 3D formaadid valikusse', 'Veidi mõttetud, kui sa just kõõrdi ei taha vaadata.'],
		'vlc-config-hover'   : ['Hõljuvad juhtnupud manustatud videotel', 'OMG, i can\'t translate this. fo\' shame'],
		'vlc-config-loadembed'     : ['Laadi manustatud videote info.', 'Krdil ei paista olevat javascriptis kirjas kuskil :('],
		'vlc-config-embedcontrols' : ['Vähem juhtnuppe manustatud videol', 'Noo ainult downloadi link'],
		'vlc-config-vertvolume'    : ['Vertikaalne helivaljususe slaider', 'Eksperimentaalne'],
		'vlc-config-forcepl' : ['Playlist ka laias režiimis', 'Veel ei tee midagi'],
		'vlc-config-thumb'   : ['Näita pisipilti', ''],
		'vlc-config-rate'   : ['Näita taasesituse kiiruse kerimisriba', ''],
		'vlc-config-repeat'  : ['Kordus', ''],
		'vlc-config-repeat-wait' : ['Oota enne kordusesitust:', 'Sekundites'],
		'vlc-config-wide-posbar' : ['Laiem positsiooni kerimisriba', ''],//hmm
		'POPUP' : 'Hüpikaken',
		'vlc-config-popup' : ['Näita popupi nuppu', ''],
		'vlc-config-popup-autoplay' : ['Automaatesitus hüpikaknas', ''],
		'vlc-config-popup-separate' : ['Luba mitu hüpikakent', 'Muidu avab ainult ühes aknas'],
		'vlc-config-cache' : ['Puhverduse pikkus:', 'Sekundites. Maksimum on 60s.'],
		'vlc-config-volume-max' : ['Maksimum helivaljusus:', 'Limiteeritakse 100% peale video lõppedes'],
		'vlc-config-scrolltoplayer' : ['Keri pleier vaatesse', ''],
		'vlc-config-wide-width' : ['Laia pleieri laius:', 'Laius pikselites või lisa protsendi märk, et seada proportsionaalselt akna laiusega.'],
		},
	"fi": {
		'LANG'  : 'Suomi',
		'NONE'  : 'Ei mitään',
		'PLAY'  : 'Pelaa',
		'PAUSE' : 'Paussi',
		'STOP'  : 'Stop', //'Pysäyttää',
		'FS'    : 'Koko näyttö',
		'WIDE'  : 'Laaja',
		'DND'   : 'Vedä siitä ja pudota tuonne.',
		'LINKSAVE' : 'Lataa koneellesi oikealla klikkauksella',
		'DOWNLOAD' : 'Lataa',
		'WATCHYT' : 'Katso YT-ssa',
		'RESETRATE': 'Palauta toiston nopeus',
		},
	/// By MegaPokemon3 [http://userscripts.org/users/BOTCoder]
	"tr": {
		'LANG'  : 'Türkçe',
		'NONE'  : 'Hiç',
		'PLAY'  : 'Oynat',
		'PAUSE' : 'Duraklat',
		'STOP'  : 'Durdur',
		'FS'    : 'Tam Ekran',
		'WIDE'  : 'Geniş',
		'DND'   : 'Sürükle ve Yeniden Düzenlemek İçin Bırakın',
		'LINKSAVE' : 'Sağ Tıklayıp Kaydet',
		'DOWNLOAD' : 'Indir',
		'WATCHYT'  : 'YTde izle',
		'POSITION' : 'Pozisyon',
		'VOLUME'   : 'Ses',
		'PLAYBACKRATE': 'Oynatma Oranı',
		'RESETRATE': 'Oynatma Oranı Sıfırla',
		'MINRATE'  : 'Minimum Oran',
		'MAXRATE'  : 'Maximum Oran',
		'vlc-config-autoplay' : ['Otomatik Oynat', ''],
		'vlc-config-priomap' : ['Her zaman biçimi öncelikli haritayı kullanabilirsiniz', 'Aksi takdirde son seçilen biçimi veya prio kullanır. son çare olarak haritası'],
		'vlc-config-resume'  : ['Biçim değişikliği Devam', ''],
		'vlc-config-forcews' : ['16:9 en boy oranı zorla', '4:03 video siyah çubuklar yaa olsun'],
		'vlc-config-forcewide' : ['Her zaman geniş modda', ''],
		'vlc-config-add3d'   : ['3D formatları ekle', 'Eğer siz seyretmek istiyorum şaşı gözlü bir'],
		'vlc-config-hover'   : ['Gömülü için denetimler gezdirin', ''],
		'vlc-config-loadembed'     : ['Gömülü video bilgi yüklemek', 'Video başlığı vb Yük'],
		'vlc-config-embedcontrols' : ['Gömülü video üzerinde daha az kontrolleri', 'Şimdilik bu kadar kompakt değil'],
		'vlc-config-vertvolume'    : ['Dikey hacmi bar', 'deneysel'],
		'vlc-config-forcepl' : ['Geniş modunda Playlist', 'Şimdilik bir şey yok'],
		'vlc-config-thumb'   : ['Küçük resim kullanın', ''],
		'vlc-config-rate'    : ['Oynatma hızını kaydırma göster', ''],
		//end of v32
		},
	/// By decembre [http://userscripts.org/users/5161]
	"fr": {
		'LANG'  : 'Français',
		'NONE'  : 'None',
		'PLAY'  : 'Play',
		'PAUSE' : 'Pause',
		'STOP'  : 'Stop',
		'FS'    : 'Plein Ecran',
		'WIDE'  : 'Large',
		'DND'   : 'Réorganiser par Drag and Drop',
		'LINKSAVE' : 'Click Droit et Enregistrer',
		'DOWNLOAD' : 'Télécharger',
		'WATCHYT'  : 'Regarder sur YT',
		'POSITION' : 'Position',
		'VOLUME'   : 'Volume',
		'PLAYBACKRATE': 'Vitesse de Lecture',
		'RESETRATE': 'Reset Vitesse de Lecture',
		'MINRATE'  : 'Vitesse de Lecture Minimum',
		'MAXRATE'  : 'Vitesse de Lecture Maximum',
		'vlc-config-autoplay' : ['Lecture Auto', ''],
		'vlc-config-priomap' : ['Toujours Utiliser le Format Prioritaire', ''],
		'vlc-config-resume'  : ['Reprendre au chamgement de format', ''],
		'vlc-config-forcews' : ['Forcer 16:9 aspect ratio', 'Les videos en 4:3 auront des barres noires'],
		'vlc-config-forcewide' : ['Toujours en Grand Ecran', ''],
		'vlc-config-add3d'   : ['Ajouter 3D formats', ''],
		'vlc-config-hover'   : ['Contôles visibles par Hover', ''],
		'vlc-config-loadembed'     : ['Charger les Infos Intégrées de la Vidéo', 'Titre etc.'],
		'vlc-config-embedcontrols' : ['Moins de Contrôles dans la Vidéo', 'Pas si compact pour l\'instant'],
		'vlc-config-vertvolume'    : ['Barre de Volume Verticale', 'Experimental'],
		'vlc-config-forcepl' : ['Playlist en Mode Large', 'Ne fait rien pour l\'instant'],
		'vlc-config-thumb'   : ['Utiliser les Vignettes', ''],
		'vlc-config-rate'    : ['Vitesse de Lecture dans la Barre de Défilement ', ''],
		'vlc-config-repeat'  : ['Activer la Répétition', ''],
		'vlc-config-repeat-wait' : ['Patienter avant de Répéter:', 'En seconds'],
		'vlc-config-wide-posbar' : ['Position de Lecture Plus Large dans la Barre de Défilement', ''],
		'POPUP' : 'Popup',
		'vlc-config-popup' : ['Montrer le bouton Popup', ''],
		'vlc-config-popup-autoplay' : ['Autoplay Popup dans une fenêtre', ''],
		'vlc-config-popup-separate' : ['Popups Séparés', 'Sinon les Popups s\'ouvrent dans une autre fenêtre'],
		//end of v34
		},
	};

function _(id)
{
	if(gLang in gLangs && id in gLangs[gLang])
		return gLangs[gLang][id];
	else
	{
		//console.log("Missing translation for " + id + " in " + gLang);
		if(id in gLangs["en"])
			return gLangs["en"][id];
		else
			return id;
	}
}

//Recursively remove node and node's children
function removeChildren(node, notself)
{
	if(node == undefined ||
		node == null)
	{
		return;
	}

	while (node.hasChildNodes())
	{
		removeChildren(node.firstChild);
	}
	if(!notself)
		node.parentNode.removeChild(node);
}

function loadPlayer(win, doc)
{
	//win.addEventListener('load', function(e){
		var inst = new ScriptInstance(win, doc);
	//}, false);
}

/// Script instance to allow popup windows live separately. Works?
function ScriptInstance(_win, popup)
{
	if(popup === undefined) popup = false;
	this.isPopup = popup;
	this.win = _win;
	this.doc = _win.document;
	//Is on embedded iframe page?
	this.matchEmbed = this.win.location.href.match(/\/embed\//i);
	this.initVars();

	this.putCSS();
	//if(!popup) this.exterminate();

	if(!popup)
		this.parsePage();
	else
	{
		this.setupVLC(this.doc.body, null, _win.vlc_urlmap);
	}
}

ScriptInstance.prototype = {
	gTimeout: null,
	width: 640 - 2, // 2px of border width
	widthWide: GM_getValue('vlc-wide-width', '86%'), //854; //Supports plain numbers as pixels or string as percentages
	minWidthWide: 854, //min width with percentages
	height: 480,
	window: null, doc: null, myvlc: null, playlist: null,
	yt: null, ytplayer: null, swf_args: null, matchEmbed: false,
	scroll1: null, scroll2: null, scroll3:null,
	isPopup: false,
	// User didn't change format etc so don't save the settings
	fmtChanged: false,
	isWide: false,
	usingSubs: false,
	nextFailed: false, //Failed to get next video in playlist
	thumb: null, //thumbnail node
};

ScriptInstance.prototype.initVars = function(){
	///User configurable booleans
	//Some formats don't seek so well :(
	this.setDefault("bresumePlay", false);
	//Maybe obsolete, // TODO should make controls take up just one "line"
	this.setDefault("bembedControls", false);
	this.setDefault("buseHoverControls", false);
	// Preloads video info, set to false if things get too slow
	this.setDefault("bforceLoadEmbed", true);
	this.setDefault("badd3DFormats", false);
	// Force player div to use widescreen size. Can be helpful with smaller screens.
	this.setDefault("bforceWS", false);
	// Consider this a WIP
	this.setDefault("bcompactVolume", false);
	this.setDefault("balwaysBestFormat", false);
	this.setDefault("bforceWide", false);
	this.setDefault("bforceWidePL", false);
	this.setDefault("buseThumbnail", true);
	this.setDefault("bshowRate", false);
	this.setDefault("buseRepeat", false);
	this.setDefault("buseWidePosBar", false);
	this.setDefault("busePopups", true);
	this.setDefault("bpopupAutoplay", true);
	this.setDefault("bpopupSeparate", false);
	//this.setDefault("bignoreVol", false); //well, 'Always reset audio level to' doesn't appear to work with the plugin :/
	//this.setDefault("bnormVol", false); //security, ignored
	this.setDefault("bscrollToPlayer", false);
	this.setDefault("bconfigDropdown", false);
	this.setDefault("buseFallbackHost", false);
	//flv sucks at seeking
	this.setDefault("bdiscardFLVs", true);
	this.setDefault("bshowMute", false);
};

/// Helpers
ScriptInstance.prototype.setDefault = function(key, def)
{
	if(GM_getValue(key, undefined) == undefined) GM_setValue(key, def);
	this[key] = this.win[key] = GM_getValue(key, def);
};

ScriptInstance.prototype.$ = function(id){ return this.doc.getElementById(id); };
ScriptInstance.prototype.$$ = function(id){ return this.doc.getElementsByClassName(id); };

function tryParseFloat(v, def)
{
	v = parseFloat(v);
	return isNaN(v) ? def : v;
}

function getArg(args, idx, def){
	 return idx in args ? args[idx] : (def ? def : '');
}

function ft(i){ if (i>=10) return i; return '0'+i;}
function fmttime(time)
{
	if(time < 0) time = 0;
	var ms  = Math.floor(time % 1000 / 10);
	var s   = Math.floor(time % 60000 / 1000);
	var m   = Math.floor(time % 3600000 / 60000);
	//var m = Math.floor(time / 60000);
	var h   = Math.floor(time / 3600000);
	//return ft(m) +':'+ ft(s) + '.' + ft(ms);
	return (h>0?ft(h)+':':'') + ft(m) +':'+ ft(s);
}

//eh, vlc not restoring volume so brute force it. timing issues?
ScriptInstance.prototype.saveVolume = function(sbVol)
{
	if(this.myvlc && this.myvlc.vlc && this.myvlc.vlc.audio)
	{
		var vol = this.myvlc.vlc.audio.volume;
		if(vol > -1)
			GM_setValue('vlc_vol', vol);
		else if(sbVol)
			GM_setValue('vlc_vol', Math.round(sbVol));
	}
};

ScriptInstance.prototype.restoreVolume = function(stopped)
{
	if(!this.myvlc.vlc.audio) return;
	var that = this;
	//Desktop app might have volume over 100%
	var volSaved = Math.min(GM_getValue('vlc_vol', 100), 100);
	if(volSaved < 0) GM_setValue('vlc_vol', 100); //fix bad save
	//if(!bignoreVol)
		this.myvlc.vlc.audio.volume = volSaved;

	function setVol(v)
	{
		if(that.bcompactVolume) that.scroll2.bar.style.display = 'block'; //otherwise knob's position doesn't get updated
		that.scroll2.setValue(v);
		that.scroll2.bar.children.namedItem('vlcvol').innerHTML = v;
		if(that.bcompactVolume) that.scroll2.bar.style.display = '';
	}

	if(this.scroll2)
	{
		setVol(volSaved); //New strategy, just keep hammering vlc with saved volume
		if(/*!stopped && */this.myvlc.vlc.input.state == 3 &&
			(this.myvlc.vlc.audio.volume < 0 || this.myvlc.vlc.audio.volume!=volSaved)){
			setTimeout(function(e){that.restoreVolume();}, 250);
		}
	}
};

ScriptInstance.prototype.restoreSettings = function(ev){
	this.restoreVolume();

	return true;
};

ScriptInstance.prototype.saveSettings = function(ev){
	this.saveVolume();
};

function getMatches(string, regex, index) {
	if(index === undefined) index = 1; // default to the first capturing group
	var matches = [];
	var match;
	while ((match = regex.exec(string)) != null) {
		matches.push(match[index]);
	}
	return matches;
}

ScriptInstance.prototype.insertYTmessage = function(message){

	var baseDiv,container,msg;
	msg = this.$('iytmsg');

	if(!msg){
		baseDiv = this.doc.firstChild;
		container = this.doc.createElement('div');
		msg = this.doc.createElement('pre');
		msg.id = "iytmsg";
		container.setAttribute("style","position:relative;background: #FFA0A0; color: #800000; border: 1px solid; border-color: #F00;");
		msg.setAttribute("style","text-align:center; margin-top:1em; margin-bottom:1em;");
		container.appendChild(msg);
		baseDiv.appendChild(container);
		//baseDiv.insertBefore(container,/*baseDiv.childNodes[2]*/
		//    document.getElementById( /*'watch-vid-title'*/ 'content'));

	}else{
		message = "\r\n" + message;
	}

	msg.appendChild(this.doc.createTextNode(message));
};

ScriptInstance.prototype.replaceYTmessage = function(message){
	this.$('iytmsg').innerHTML=message;
};

ScriptInstance.prototype.addScriptSrc = function(src) {
	var head, script;
	head = this.doc.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = this.doc.createElement('script');
	script.type = 'text/javascript';
	script.setAttribute('src', src);
	head.appendChild(script);
};

ScriptInstance.prototype.addScript = function(src) {
	var head, script;
	head = this.doc.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = this.doc.createElement('script');
	script.type = 'text/javascript';
	script.appendChild(document.createTextNode(src));
	head.appendChild(script);
};

ScriptInstance.prototype.putCSS = function(){

	//default youtube css
	this.addCSS("\
		html,body {margin:0; padding:0; font-family: 'Dejavu Sans', Arial; font-size: 12px;}\
		.yt-uix-button {border: 1px solid transparent;border-radius: 2px 2px 2px 2px;box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);cursor: pointer;display: inline-block;\
			font-size: 10px;font-weight: bold;height: 26px;line-height: normal;outline: 0 none;padding: 0 5px;text-decoration: none; vertical-align: middle; white-space: nowrap; word-wrap: normal;}\
		.yt-uix-button-default, .yt-uix-button-default[disabled], .yt-uix-button-default[disabled]:hover, .yt-uix-button-default[disabled]:active, .yt-uix-button-default[disabled]:focus {background: none repeat scroll 0 0 #333;border-color: #D3D3D3;color: #EEE;}\
	");

	var css = "#"+ vlc_id + "-holder {overflow: hidden;}\
	#movie_player * {margin: 0; padding: 0;}\
	#movie_player select {padding: 5px 0;}\
	a.vlclink { color:#438BC5; margin-right:2px; line-height: 26px; height:24px;}\
	.hid, .vlc_hidden { display:none; }\
	.vlccontrols {padding:0px 5px; color: #EEE; text-align:left;}\
	#movie_player .vlccontrols div {margin-left:2px;}\
	.vlc-scrollbar{\
		line-height: 15px;\
		cursor: default /*ew-resize*/;\
		position: relative;\
		width: 90%; \
		height: 15px;\
		border: 1px solid #EEE;\
		display: inline-block; \
		text-align: center;\
		margin-right: 5px;\
		border-radius: 3px;\
		background: #333;\
		color: #EEE;\
	}\
	/*.vlc-scrollbar span {position:absolute;}*/\
	/* volume and rate bar need absolute sizes */ \
	#scrollbar2 { width: 80px; } \
	#ratebar { width: 150px; } \
	.vlc-scrollbar .knob {\
		left: 0px;\
		top: 0px;\
		position: absolute;\
		width: 10px;\
		height: 15px;\
		background: rgba(175,43,38,0.8);\
	}\
	#scrollbar2 .knob {background: rgba(0,51,153,0.8);}\
	#ratebar .knob {background: rgba(0,153,51,0.8);}\
	.vlc-volume-holder { display:inline-block; } \
	#vlcvol:after {content: '%';}\
	#movie_player { background: black; position:relative; }\
	.progress-radial { /*would like without float :/ */ \
		background-repeat: no-repeat; \
		margin-right:5px; line-height: 16px; text-align: center; color: #EEE; font-size: 12px; margin-top: 0px;\
		float:left; display: inline-block; width: 16px; height: 16px; border-radius: 50%; border: 2px solid #2f3439; background-color: tomato;}\
	#vlc-thumbnail { width: 100%; height: 100%; cursor: pointer; }\
	#vlc_buttons_div {text-align:left; padding: 2px 5px; color:#333333; clear:both;}\
	#vlc_buttons_div button, #vlc_buttons_div select { margin-right: 2px;}\
	#vlc_buttons_div input[type='checkbox']{vertical-align: middle;}\
	#watch7-playlist-tray { border-bottom: 1px solid #1B1B1B !important;}\
	#vlcstate {text-align:left; display: inline-block; width: 50px;}\
	#vlc-config .row { padding: 5px 0; border-bottom: 1px dotted #CCC; text-align: center; cursor: move; }\
	#vlc-config .row.over { border: 2px dashed #000; }\
	#vlc-config { text-align: left; color: #1b1b1b; background: white; overflow: auto; display:none;}\
	#vlc-config > div { padding: 5px; float: left; border: 3px double #CCC;}\
	#vlc-config-drag {font-size: 12px; border: 1px solid #CCC; width: 150px; padding-bottom: -1px;}\
	#vlc-config-ok { clear: both; float: right; }\
	#vlc-config-btn  span {width:24px; height: 24px; display: block; padding: 0px;\
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsRAAALEQF%2FZF%2BRAAAAB3RJTUUH1gcRDxwh83SzRgAABEdJREFUSMe9lV1sk1UYx39vO7Yxx9hYNlgnjgUNIyi0bMEESqgOUDY%2BFENkookgiyBXOo2AM8c3JCt4YyKIgFwsuAuGJAZCYiBTXHSgTNeR8rEJc9Ru%2FVo3YOyr7fYeL2iXruumJuq5OTnP%2B57%2F7%2Fyfc55z4D9uSrygEEIAH4WH7wNNqqrW%2FWtUIYT0eT0yEBiSLS03pRBCVlRUlE60oJgF66IDugl%2BNHx2%2BHOkppFrMFBWtpnU1NRzgJwIUlRek%2FPSnpNaUXnNiYkAihDCCKCqqhswWPcfIDA0SH5%2B%2FqRpLSqvMQKu01Uv8%2BbagllF5TV1sQClsrJSBWxCiH0RiNlsRlHGmdTiGLA1HttCe3s7Sx%2BfWpyeklAc%2BZAQ7qfo9foPd%2B4oR6dPfA%2BoXLhwIQUF85BSQ1EUgoH%2Bn4UQRlVVm6OVF2%2BrNgJ0dHTQ3d3NzmOtAIZxdo8ePWrfsH7dkykpUwkFg0gpkVKOCqWlZ1BVZQUwhFPI%2FBf2GZNnPGq7fLiMpbtOoSgKI8MBU3P19uZxACFETnJy8o3nVxenz1%2FwFIqijO5p7727DyHT06my7gcwHP7q8szsBStt5z95hbUffMPwUO%2Bqa7UVdZPWgRDCmJeXd9zhcBRGYkuWLAmtXFk85cH9e0gpeWRaGgcOfMyXP%2FTw6TvP8e4Xv3Lf0WRyN59pjqMtlb%2BohxxgOVC7d%2B%2BeUSeZWTNRVZXqi256bv1oeuC%2BEVf8nxSeUQghNU2TXV637PK6paZpUgghI0d7oiM8qYOi8pocn6PNNRzoJfjAy651cxFC0N3lHeMkvPE%2BYCRWQz%2BZuL%2FT6XqxeC4lywvIToPqszYGfTdZU1LK4EA%2FgwP9rCkppb6%2BvsJisXxdX1%2Fv%2BVuAiPim1fN4bb0Zl9NBQsp0tMBdzl72MuC%2BGg%2Byw2KxnImF6CYS375xEds2ruDbuu9ovOkkIzuXtIwsEtNmAZhUVSUzayYA3V1eHl7A2GL2ZCwgIr7nDTNbSpdy6kwdv9y4g3mFhTt%2FuNHp9eiTpuH1ev3BYLAwHiQpKWkMRBd9Yfk7nS71rWfYtLqQE6fP0%2B50sap0Pa2tbXicbfx0W0ei1v3EkSNH7lqt1t88Ho85AgkEg2zd%2Bjq7d%2B8GsI0D%2BDudtrdffZoNlkXUnv2edqeL5c8W09JyG5fjFg2tGiFfk2nA70gDZgCZdrs9ZLfbS1VVxZA7m0OHDtHb2ztGOyE6RXlzZjOiSXyd7ePE%2B36%2FYPG3XAyFJ2YAukuXLg0D7r6%2Bvs0HDx482dPTg6ZpV0KhkDVSAqN1MKfEKtcuM2AqNDE3J52r129zpbGRhlaNAcfFZb7rF%2FwxrrWo%2BSNAAOgHhoDhcGxk1MGMWTmLzzW4miIJHBzoo6FVI0nXb9Eycu8B%2FqjijAhHXjgtLDgcJS7HVfLibdWmHo%2B7KTJOnZb42LXaCk%2FMvaLE6WWUKy08lvwf7U9RNAWyAew0pQAAAABJRU5ErkJggg%3D%3D') no-repeat;}\
	/* Faenza 16px lpi_translate.png */ \
	#vlc-config-lang-icon { margin-right: 5px; display: inline-block; width: 16px; height: 16px; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHiSURBVDiNlZPPi1JRFMc/570pXjbYKmo1Wbka4TUx4kIQEbGN0t6dSDxo4aK/oI3UP9C0a92uAodMN26ynJBsIdIiQ2ZwMCuY0cjpB50WPsXeCNUXDvde7j3fe873nCOqigfirsculmFlYW8CZ107AnaB7x6i4+SqiqqeS6VSdyzLeg7sG4bxNh6P31XVC6pqqKqoqqmqa6p6yT2jqoiqCrAhIo+Br+6vJrBqWdae4zgPbdvuVyqV9VKpdH0ymRSA17MoZgRXRWRrSYoWcAYwgJ/ASFVvAK0ZgbHw+Mg0zS/ZbLZZrVZfjMfjnXa7Xcvlck9FpAvsAYcLWsgigQCTcrn8JhKJnHAc54rf778WjUZjwWDQajabrVAo1LUs68D1WQMuAoIryCbwSFVvAa+AKvAE2AZ2AoHAs1qtdn8wGNzL5/O3fT5fVVU3VVXmZUwmk7vAR+CdR4dRr9dbTSQSYaZl/+a++0PEy8A6sC8iN5eIeQyqugW0VlymLvAe2GDaRP+MWQqL3fZfBIbnLOl0elSv1z8Nh8Nhp9M5zGQyBy6p1+YazJ2ZlsYGXgIj4BQQazQaoUKh8KPf74tt27+KxeLJcDj8APggnmlcNokCnAdiwGngM9AAht4I/gZZ2M+dfgPB0dbgsnwagQAAAABJRU5ErkJggg==') no-repeat;}\
	.vlc-config-checkbox-div { /*min-width: 200px;*/ } \
	.vlc-config-checkbox-div label:hover { background: #F8F8F8; border: 1px solid #D3D3D3; }\
	#vlc-config-checkboxes { /*height: 255px; overflow-x: hidden; overflow-y: auto;*/ } \
	/* custom checkboxes */\
	#vlc-config-checkboxes label { width:100%;} \
	#vlc-config-checkboxes label input { display:none; } \
	#vlc-config-checkboxes label input + span { line-height: 120%; text-indent: 16px; width: 100%; display:inline-block;} \
	.vlc-wl-state {padding-left: 16px !important;}\
	/*Faenza 16px gtk-delete.png */\
	.vlc-boo-bg {background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG7SURBVDiNpZOxSwJhGMaf5NPrwigiooQLokiChsh0a6klbmpoCiJKcrz/IjBoCqItkKChQZzEhhIuWiybAilOxQ7Dq9TCwC4v3wYt7iSXfOFdnu97Hnh/7/d1ERE6KVtH7jYBPADvH7q3eWYtIjI3H93yB7d5LqXKsvijq7IsbvNcKrrlDxIRb/ZYzLGAP7jrQDXEgXZ4pqiyLKqyLO7wTAlxoF0HqrGANaTLBNF75B49HCio0zYA73VABUsDgABj3GkD6gBKw8Lt2t3DJoArAJYA1F6epMTi3PrHozoLAJV6Q+9tkup2CTe+s+uQfXBorx0D9vmsSQmPkLwYAZk74RGSn8+aRETM7GndglHKKNm8rvc4HIC587reU8ooWQCG2WAZ4SVxIUaWF/YmOWO8j1mT3wzgXmfp5ci5NOibj/4V4D2e6A2N2d6n+u0NwT4s3ABArdBg8loDsnVnalWprP9AtKyxfHpykPGwSnoGlFsSkkZRk4yiJuWWhGR6BpTxsEr59OTAvMZWiK5qPLyvrbgvv4q/wNhXUZO0FfdlNR7eJyJXu4f0G0JEGy20WVNztd63QPxPdfwbvwG5Z15mC93/JQAAAABJRU5ErkJggg=='); background-repeat: no-repeat; background-position: 0 50%;} \
	/*FIXME deduplicate :P*/ \
	.vlc-boo-bg:hover {background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG7SURBVDiNpZOxSwJhGMaf5NPrwigiooQLokiChsh0a6klbmpoCiJKcrz/IjBoCqItkKChQZzEhhIuWiybAilOxQ7Dq9TCwC4v3wYt7iSXfOFdnu97Hnh/7/d1ERE6KVtH7jYBPADvH7q3eWYtIjI3H93yB7d5LqXKsvijq7IsbvNcKrrlDxIRb/ZYzLGAP7jrQDXEgXZ4pqiyLKqyLO7wTAlxoF0HqrGANaTLBNF75B49HCio0zYA73VABUsDgABj3GkD6gBKw8Lt2t3DJoArAJYA1F6epMTi3PrHozoLAJV6Q+9tkup2CTe+s+uQfXBorx0D9vmsSQmPkLwYAZk74RGSn8+aRETM7GndglHKKNm8rvc4HIC587reU8ooWQCG2WAZ4SVxIUaWF/YmOWO8j1mT3wzgXmfp5ci5NOibj/4V4D2e6A2N2d6n+u0NwT4s3ABArdBg8loDsnVnalWprP9AtKyxfHpykPGwSnoGlFsSkkZRk4yiJuWWhGR6BpTxsEr59OTAvMZWiK5qPLyvrbgvv4q/wNhXUZO0FfdlNR7eJyJXu4f0G0JEGy20WVNztd63QPxPdfwbvwG5Z15mC93/JQAAAABJRU5ErkJggg=='); background-repeat: no-repeat; background-position: 0 50%;} \
	/*Faenza 16px ok.png */\
	#vlc-config-checkboxes label input:checked + span { background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF9SURBVDiNpZM/SAJhGMafO/O48vMzt4hoaFIcnFqsJhEcW1qcWiuIVrnGhggajNK9rYiIIoegorxDO8Sg7cRbazW5pQielgS7/ucL7/J9/H4fH+/zKiTRT6l90f8UKP8WuK6bsixr9h1H8lfdarVSQohrTdPqpmnOkVRJfhDoJAf8sOu6U0KIcwB3AG6j0egVyZRfMGQYRr5UKi2QDHbPHceZllKeAagBuNB1/bRSqWySHOoVDBqGkVcU5SYQCFSLxeISSa3ZbM5IKcsALgGc6Lq+b9v2Bsmx7gNdwWQsFjsCcADgUFXVq0KhkI9EIscAygD2QqHQbr1eX++FSULpBqndbq+k0+nxRqMxDEADMAHgAcCjEOLZNM12MpncAnD/bqY9SQx2Op3FTCYzYtu2eJs3w+Hwc7VafUokEtt+2C8AgKDneYvZbDZqWZYupXyp1WpKPB7f+Qz+KgdBz/OWc7ncquM4ayRHv8vHVxcDJOdJjvwUMP8X/lx9b+Mr7eRSRxf/zIkAAAAASUVORK5CYII=') no-repeat 0 50%; } \
	input.tiny { width: 45px; } \
	#vlc-subtitle {background: #333; color: #eee; border: 1px solid #eee; width:35px; height: 20px;}\
	#vlc-subtitle:focus {width:135px;}\
	#vlc-config-midcol div { margin-bottom: 1px 2px;}\
	#vlc-spacer #vlc_controls_div { display:none; }\
	#vlc-spacer:hover #vlc_controls_div { display:block; }\
	#vlc-spacer { background-image: linear-gradient(bottom, rgb(175,42,38) 50%, rgb(0,0,0) 100%);\
				background-image: -moz-linear-gradient(bottom, rgb(175,42,38) 50%, rgb(0,0,0) 100%);}" +
	(this.bembedControls && this.matchEmbed ? '.yt-uix-button{padding:0 0.3em;}':'');

	this.addCSS(css);

	if(this.bcompactVolume)
	{
		css = "#scrollbar2 { position: relative; top: -65px; width: 100%; height: 80px; display: none; }\
			#scrollbar2 .knob {width: 100%; left: 0px;} \
			.vlc-volume-holder { margin-right: 2px; height: 26px; /* hm otherwise 2px higher than buttons */}\
			.vlc-volume-holder > span { \
			/* Faenza 16px audio-volume-medium.png */ \
			background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIWSURBVDiNpZM/aFNRFIe/k/ceRWqymfqyhIYMWsqrVGPAJQpditKhYDJKt24d6ya2kxQ7lgx2S0DCGwNODkKlCCIS6tTSxTYxpFZMyZ9H+jwu70ms7VC8cIZzz7nf/d17zhFV5X9W5DLJInJNRKaG98wLcg3AH/Kv7+7uJoGrwBURqatqCwBVPWsJVZ0K/aOjoxtjY2MV27Zf5/P5CeAR8ACIqOo/T7DHx8dfBMoiW1tbuWq1+rDVaqUbjUbacZw7hmH8BEYBO1QQUVVHVTOpVGoT+Kiqd4vFYt40zfcLCwvrs7Oz68DbZDL5anp6ejJQcTNUMGma5qaIlPf39yeAJkCpVMqcnp52K5VKslAoHAL94+Nj5ufnQ9WxsAqW7/vfgB2gAXiAv7Ky8gU46fV6Zi6X8wCv2+1G5+bmrGFAWIWTs2XY29vzgP7IyIjX6XR8oG9ZVm8wGPyVFwEGtm3/CG4OzSoWi7cAL5vNfi+VSjHAS6fTTdd1Q0I7BOzU6/XPqlpbXV39GgDMxcXFw2g02l5aWuq4rhsHPMdx2uVy2R8GnO2Be2tra89V9baq2gcHB09d130mImXTNF/WarUnhmHkgiokVBU5ZxayQCf41NHt7e37y8vLmZmZmUGz2XyzsbGRCOLvVPXXeQAAAcKA5Xne43a73Y/H4x3AAj6ErXwR4DygiEgKiKnqpz+By46ziIgOHfoN2CIPv8Rm1e4AAAAASUVORK5CYII=') no-repeat scroll 50% 50%; \
			display: block; width: 16px; height: 26px;} \
			.vlc-volume-holder:hover #scrollbar2 { display:block; } \
			#vlcvol {display: block; position: relative; top: 40%; transform: rotate(-90deg); }";

		this.addCSS(css);
	}

	if(!this.buseWidePosBar)
		this.addCSS("#scrollbar1 { width: 250px; }");
	else if(this.bshowRate)
		this.addCSS("#scrollbar1 { width: 60%; }");

	//if(!bdarkTheme)
	this.addCSS("#player-api-legacy {background: white; border: 1px solid rgba(0, 0, 0, 0.098);}");
	//blurry shadow was assome
	this.addCSS(".yt-uix-button:focus, .yt-uix-button:focus:hover, .yt-uix-button-focused, .yt-uix-button-focused:hover {box-shadow: 0 0 2px 1px rgba(27, 127, 204, 0.4);}");

	/* configuration div to be more like a drop-down menu */
	//if(this.bconfigDropdown)
	//  this.addCSS("#vlc-config { position: absolute; z-index: 9999; border: 1px solid #CCC;}");
	if(!this.isPopup)
		this.addCSS("#vlc-config { position: absolute; bottom: 50px;}");
	this.addCSS("#vlc-config { height: 250px;z-index: 9999; border: 1px solid #CCC;}");

};

ScriptInstance.prototype.addCSS = function(css){

	/*if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else */{
		var heads = this.doc.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = this.doc.createElement("style");
			node.type = "text/css";
			node.appendChild(this.doc.createTextNode(css));
			heads[0].appendChild(node);
		}
	}
};

// Controls
function ScrollBar (instance) { this.instance = instance; }
//https://developer.mozilla.org/en-US/docs/XPConnect_wrappers
ScrollBar.__exposedProps__ = { };
ScrollBar.prototype = {
	instance: null, //greasemonkey script instance
	formatter: null,
	offX: 0,
	offY: 0,
	value: 0,
	minValue: 0.0,
	maxValue: 100.0,
	type: 0,/*0 - hor, 1 - vert*/
	bar: null,
	knob: null,
	userSeeking: false,
	instant: false,
	events: [],
	$: function(id){ return this.instance.doc.getElementById(id); },
	init: function(barId, knobId, type, minval, maxval, insta, formatter){
		this.bar = this.instance.doc.querySelector(barId);
		this.bar.wrappedJSObject.ScrollBar = this;
		this.knob = this.instance.doc.querySelector(knobId);
		this.knob.wrappedJSObject.ScrollBar = this;
		this.instant = insta;
		this.formatter = formatter;

		this.bar.unselectable = "on";
		this.knob.unselectable = "on";
		this.bar.style.MozUserSelect='none';
		this.knob.style.MozUserSelect='none';
		//this.knob.style.KhtmlUserSelect='none';

		this.type = type;
		this.minValue = minval;
		this.maxValue = maxval;
		//this.knob.onmousedown = ScrollBar.eventHandlers.mouseDown;
		this.knob.addEventListener('mousedown',ScrollBar.eventHandlers.mouseDown,true);
		this.bar.addEventListener('mousedown',ScrollBar.eventHandlers.mouseDownBar,true);
	},
	register: function(ev)
	{
		this.events.push(ev);
	},
	emitValue:function(instant){
		for(var i in this.events){
			this.events[i].emitValue(this, this.value, instant);
		}
		if(this.formatter) this.formatter(this.value);
	},
	setValue: function(val){//FIXME minValue
		if(val<0) val=0;
		if(this.userSeeking || (ScrollBar._ScrollBarDragData && ScrollBar._ScrollBarDragData.Scrollbar == this)) return;
		this.value = val;
		if(this.type == 0)
			this.knob.style.left = Math.round( ((this.value - this.minValue)/(this.maxValue - this.minValue)) * (this.bar.clientWidth - this.knob.clientWidth)) + "px";
		if(this.type == 1)
			this.knob.style.top = Math.round(((this.maxValue - this.value)/this.maxValue) * (this.bar.clientHeight - this.knob.clientHeight)) + "px";
		if(this.formatter) this.formatter(this.value);
	},
	getValue: function(){ return this.value; },
	setMaxValue: function(max){ this.maxValue = max; },
	setMinValue: function(min){ this.minValue = min; },
};

ScrollBar.eventHandlers = {
	mouseDownBar: function(ev){
		var s = ev.target.wrappedJSObject.ScrollBar || ev.target.parentNode.wrappedJSObject.ScrollBar;
		if(ev.explicitOriginalTarget == s.knob) return;
		s.userSeeking = true;
		var off = 0;
		var node = s.bar;
		while(node.offsetParent)    // bar's position is relative so loop through parent nodes
		{                           // maybe there's some better tricks
			off += node.offsetLeft;
			node = node.offsetParent;
		}
		if(s.type == 0)
			s.knob.style.left = ev.pageX - off - s.knob.clientWidth / 2 + "px";
		else
			s.knob.style.top = ev.pageY - off - s.knob.clientHeight / 2 + "px";
		//Simulate events
		ScrollBar.eventHandlers.mouseDown(ev);
		ScrollBar.eventHandlers.mouseMove(ev);
	},
	mouseDown: function(ev){
		var s = ev.target.wrappedJSObject.ScrollBar || ev.target.parentNode.wrappedJSObject.ScrollBar;
		s.instance.doc.addEventListener('mouseup',ScrollBar.eventHandlers.mouseUp,true);
		s.instance.doc.addEventListener('mousemove',ScrollBar.eventHandlers.mouseMove,true);
		s.userSeeking = true;
		ScrollBar._currentScrollBar = s;
		//Maybe pageX, clientX is affected by page scroll?
		s.offX = ev.clientX - s.knob.offsetLeft;
		s.offY = ev.clientY - s.knob.offsetTop;
		ScrollBar._ScrollBarDragData = {
				screenX:    ev.screenX,
				screenY:    ev.screenY,
				dx:         ev.screenX - s.knob.offsetLeft,
				dy:         ev.screenY - s.knob.offsetTop,
				startValue: s.value,
				ScrollBar:  s
			};
	},
	mouseUp: function(ev){
		var s = ScrollBar._currentScrollBar;
		s.userSeeking = false;
		ScrollBar._ScrollBarDragData = null;
		s.instance.doc.removeEventListener('mouseup',ScrollBar.eventHandlers.mouseUp,true);
		s.instance.doc.removeEventListener('mousemove',ScrollBar.eventHandlers.mouseMove,true);
		s.emitValue(false);
	},
	mouseMove: function(ev){
		var s = ScrollBar._currentScrollBar;
		switch(s.type){
			case 0:
				var x = ev.screenX - ScrollBar._ScrollBarDragData.dx;
				var w = s.bar.clientWidth - s.knob.clientWidth;
				if( x < 0 ) x = 0;
				if( x > w ) x = w;
				s.knob.style.left = x + "px";
				if(w != 0) //eh weird, otherwise NaN sometimes if user drags 'over the edge'
					s.value = x/w * (s.maxValue - s.minValue) + s.minValue;
				//s.knob.title = Math.floor(x/w * 100) + '%';
				break;
			case 1: //FIXME minValue
				var y = ev.screenY - ScrollBar._ScrollBarDragData.dy;
				var h = s.bar.clientHeight - s.knob.clientHeight;
				if( y < 0 ) y = 0;
				if( y > h ) y = h;
				s.knob.style.top = y + "px";
				if(h != 0) //eh weird, otherwise NaN sometimes if user drags 'over the edge'
					s.value = s.maxValue - (y/h * s.maxValue);
				break;
		}
		if(s.instant) s.emitValue(true);
	},
};

function ccTimer(){}
ccTimer.prototype =
{
	ccObj : null,
	ccOffset : 0,
	lastTime : 0,
	nodeCount : 0,
	reset : true,

	init : function(cc)
	{
		this.ccObj = cc;
		this.nodeCount = this.ccObj.childNodes.length;

		this.update(0);
	},
	getStart : function(offset)
	{
		if(offset>-1 && offset < this.nodeCount)
			return this.ccObj.childNodes[offset].getAttribute("start");
		return 0;
	},
	getDur : function(offset)
	{
		if(offset>-1 && offset < this.nodeCount)
			return this.ccObj.childNodes[offset].getAttribute("dur");
		return 0;
	},
	getLastStart : function()
	{
		return this.getStart(this.ccOffset);
	},
	getLastDur : function()
	{
		return this.getDur(this.ccOffset);
	},
	resetState: function()
	{
		this.ccOffset = -1;
		this.lastTime = 0;
		this.resetCC();
	},
	update: function(time, vlc)
	{
		//sanity check of testing code, wrap back to start
		if(this.ccOffset >= this.nodeCount || this.lastTime >= time)
		{
			this.resetState();
		}

		if(this.lastTime < time)
		{
			var newOff = this.ccOffset+1;
			while(newOff < this.nodeCount
				&& this.getStart(newOff) <= time)
			{
				newOff++;
			}
			newOff--;
			if( newOff > this.ccOffset  //is indeed a new one
				//&& time < this.getStart(newOff) + this.getDur(newOff)
			)
			{
				this.setCC(newOff, time, vlc);
				this.lastTime = this.getLastStart();
			}
		}

		//console.log(time);
	},

	setCC : function(offset, time, vlc)
	{

		vlc.video.marquee.disable();//brute forcing, sometimes it fails to show
		vlc.video.marquee.enable();
		//Hmm no likey unicode ???
		vlc.video.marquee.text = this._unescape(this.ccObj.childNodes[offset].innerHTML);
		vlc.video.marquee.timeout = 1000 * this.getDur(offset);

		this.ccOffset = offset;
		this.reset = false;
	},

	resetCC : function()
	{
		this.reset = true;
	},

	_unescape: function(str)
	{
		//str = str.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
		str = this.htmlDecode(str);
		str = this.htmlDecode(str);
		//str = decodeURIComponent(str);
		var m = getMatches(str, /&#(\d+);/g, 1);
		for(var i in m)
		{
			str = str.replace("&#" + m[i] + ";", String.fromCharCode(m[i]));
		}
		return str;
	},
	htmlDecode: function(input)
	{
		if(this._e === undefined) this._e = document.createElement('div');
		this._e.innerHTML = input;
		return this._e.childNodes.length === 0 ? "" : this._e.childNodes[0].nodeValue;
	}
};

function VLCObj (instance, cbs){
	this.instance = instance; //greasemonkey script instance
	this.prevState = 0;
	this.ccObj = null;
	this.vlc = null;
	this.controls = null;
	this.scrollbarPos = null;
	this.scrollbarVol = null;
	this.scrollbarRate = null;
	this.uri = null;
	this.updateTimer = null; //probably can do without but whatever
	this.repeatTimer = null;
	this.stopUpdate = true; //true by default so that stateUpdate() would update only once
	this.cbs = cbs;
}

//https://developer.mozilla.org/en-US/docs/XPConnect_wrappers???
VLCObj.__exposedProps__ = { };
VLCObj.prototype = {
	$: function(id){
		return this.instance.doc.getElementById(id);
	},
	_getBtn: function(id)
	{
		return this.$(vlc_id + id);
	},
	_setupEvent: function(id, fn)
	{
		var btn = this._getBtn(id);
		if(btn){
			btn.wrappedJSObject.VLCObj = this;
			btn.addEventListener('click', fn, true);
		}
	},
	init: function (sbPos, sbVol, sbRate){
		this.vlc = this.$(vlc_id).wrappedJSObject;
		this.vlc.VLCObj = this;
		if(!this.vlc || !this.vlc.playlist)
			return false;
		//this.vlc.video.marquee.color = 0xEEEE00;

		this.scrollbarPos = sbPos;
		this.scrollbarPos.register(this);
		this.scrollbarVol = sbVol;
		this.scrollbarVol.register(this);
		if(sbRate)
		{
			this.scrollbarRate = sbRate;
			this.scrollbarRate.register(this);
		}

		this.controls = this.$(vlc_id + "_controls");
		this._setupEvent("_play", VLCObj.prototype.play);
		//this._setupEvent("_pause", VLCObj.prototype.pause);
		this._setupEvent("_stop", VLCObj.prototype.stop);
		this._setupEvent("_fs", VLCObj.prototype.fs);

		var that = this;
		this.vlc.addEventListener('MediaPlayerPlaying', function(e){that.eventPlaying();},false);
		this.vlc.addEventListener('MediaPlayerPaused', function(e){that.eventPaused();},false);
		this.vlc.addEventListener('MediaPlayerStopped', function(e){that.eventStopped();},false);
		this.vlc.addEventListener('MediaPlayerNothingSpecial', function(e){that.eventStopped();},false);
		this.vlc.addEventListener('MediaPlayerEndReached', function(e){that.eventEnded();},false);
		this.vlc.addEventListener('MediaPlayerEncounteredError', function(e){that.eventStopped();},false);
		this.vlc.addEventListener('MediaPlayerBuffering', function(e){that.eventBuffering(e);},false);
		//this.vlc.addEventListener('MediaPlayerPositionChanged', function(e){that.eventPos(e);},false);

		if(this.$(vlc_id+'_select'))
		{
			this.$(vlc_id+'_select').VLCObj = this;
			this.$(vlc_id+'_select').addEventListener('change', function(e){that.instance.onFmtChange(e);}, false);
		}
		this.stateUpdate(); //initial update
		return true;
	},
	setupMarquee: function(x,y)
	{
		//try{
			//this.vlc.video.marquee.size = 24;
			this.vlc.video.marquee.size = Math.max(Math.floor(this.vlc.video.width / 38), 12);
			//this.vlc.video.marquee.position = 8;
			//this.vlc.video.marquee.opacity = 200;
			this.vlc.video.marquee.refresh = 100;
			this.vlc.video.marquee.timeout = 0;
			if(x && y)
			{
				this.vlc.video.marquee.x = Math.floor(x);
				this.vlc.video.marquee.y = Math.floor(y);
			}
			else
			{
				this.vlc.video.marquee.x = 65;
				this.vlc.video.marquee.y = Math.floor(this.vlc.video.height - (this.vlc.video.width/34) - 45);
			}
			this.vlc.video.marquee.disable();
			this.vlc.video.marquee.enable();
			//vlc.video.marquee.color = 0;
		//}catch(e){console.log(e);}
	},
	eventPos: function(e){
		//e is normalized 0..1
	},
	eventBuffering: function(e){
		if(e != undefined) this.instance.setBuffer(e);
		mute = this.$(vlc_id + '_mute');
		if(mute && mute.muteStyleToggle) mute.muteStyleToggle();
		if(this.prevState == 3 || this.prevState == 2 || 
				this.prevState == 4)
			this.prevState = 2;
		else
			this.prevState = 7;
	},
	eventStopped: function(s){
		var play = this._getBtn("_play");
		if(play) play.innerHTML = _("PLAY");
		this.instance.setThumbnailVisible(true);
		if(this.vlc && this.vlc.audio /*&& this.vlc.audio.volume > 100*/ && !this.instance.buseRepeat)
			this.instance.restoreVolume();
		this.clearUpdate();
		if(!s) this.prevState = 5;
		if('stopped' in this.cbs)
			this.cbs.stopped();
	},
	eventEnded: function(){
		this.eventStopped(true);
		if(this.instance.buseRepeat)
		{
			var wait = tryParseFloat(GM_getValue('vlc-repeat-wait', "0"));
			var that = this;
			this.repeatTimer = that.instance.win.setTimeout(function(e){that.repeatTimer = null; that.playVideo();}, wait*1000);
		}
		console.log(this.prevState);
		if('ended' in this.cbs && this.vlc.input.state > 3 )
			this.cbs.ended();
		this.prevState = 6;
		
	},
	eventPlaying: function(){
		if(this.instance.usingSubs) this.setupMarquee();
		if(this.prevState != 4 && this.prevState != 2)
			this.instance.restoreVolume();
		this.instance.setThumbnailVisible(false);
		var play = this._getBtn("_play");
		if(play) play.innerHTML = _("PAUSE");
		this.startUpdate();
		if(this.repeatTimer)
		{
			this.instance.win.clearTimeout(this.repeatTimer);
			this.repeatTimer = null;
		}
		mute = this.$(vlc_id + '_mute');
		if(mute && mute.muteStyleToggle) mute.muteStyleToggle();
		this.prevState = 3;
	},
	eventPaused: function(){
		var play = this._getBtn("_play");
		if(play) play.innerHTML = _("PLAY");
		this.prevState = 4;
	},
	doAdd: function(src, waitCount){
		if(!this.vlc.playlist) return;
		if(waitCount === undefined) waitCount = 0;
		this.vlc.playlist.items.clear();
		var instance = this;
		if(this.vlc.playlist.items.count>0 && waitCount < 5){//Old crap in playlist, do not want
			//FIXME what if double clicked? hahaa
			this.instance.win.setTimeout(function(){instance.doAdd(src, ++waitCount);}, 250);
			return;
		}

		var caching = tryParseFloat(GM_getValue('vlc-cache', '5'), 5) * 1000;
		var options = [':http-caching=' + caching, //pre v2.0?, in v2.0 'unsafe option "http-caching" has been ignored for security reasons'
								':network-caching=' + caching,
								':live-caching=' + caching,
								':freetype-color=' + 0xEEEE00, //16776960'
								':freetype2-color=' + 0xEEEE00,
								':font-color=' + 0xEEEE00
								//, ':aspect-ratio=4:3'
					];

		if(this.instance.subtitle)
			options.push(':sub-file=' + this.instance.subtitle);

		//unsafe option "audio-filter" has been ignored for security reasons, dammit
		/*if(this.instance.bnormVol)
		{
			//--audio-filter normvol,equalizer --equalizer-preset largehall
			options.push(":audio-filter=volnorm", ":norm-max-level=" + GM_getValue('vlc-volume-norm', 2.0));
		}*/

		var id = this.vlc.playlist.add(src, 'muuvi', options),
		vsTxt = false;

		if(this.instance.fmtChanged || // user changed format
			((GM_getValue('vlc_autoplay', true) || (this.instance.isPopup && this.instance.bpopupAutoplay))
				/*&& !this.instance.matchEmbed*/)) //on embedded, ignore autoplay
		{
			this.vlc.playlist.playItem(id);
			if(this.instance.usingSubs) this.setupMarquee();
			this.stateUpdate();
		}
	},
	add: function(src, fmt){
		//Format changed, resume play
		var time = this.getCurrentTime();
		this.doAdd(src, 0);
		if(this.$('vlclink'))
		{
			this.$('vlclink').href = src;
			//Just in case firefox respects the html5 "download" attribute
			//but content-disposition probably overrides this with useless "videoplayback" anyway
			try{
				//this.$('vlclink').setAttribute("download", "Some title" + "-" + fmt.replace("/", "."));
			}catch(e){}
		}
		if(this.instance.bresumePlay) this.seekTo(time);//craps out probably if doAdd loops
	},
	emitValue:function(sb, pos, instant){
		//try{
			if(this.scrollbarPos == sb)
			{
				if(instant)
					this.setTimes(this.vlc.input.length * (pos/sb.maxValue), this.vlc.input.length);
				else
				{
					pos = pos/sb.maxValue;
					//workaround for NPVariant type being INT32 if pos is 0 or 1
					//and then npapi plugin returning invalid value error
					if(pos < 0.000001) pos = 0.000001;
					else if(pos > 0.999999) pos = 0.999999;
					this.vlc.input.position = pos;
				}
			}
			else if(this.scrollbarVol == sb)
			{
				this.vlc.audio.volume = pos;
				this.instance.saveVolume(pos);
				//this.scrollbarVol.bar.children.namedItem('vlcvol').innerHTML = Math.round(pos);
			}
			else if(this.scrollbarRate == sb)
			{
				this.vlc.input.rate = pos;
				//this.scrollbarRate.bar.children.namedItem('vlcrate').innerHTML = pos.toFixed(3);
			}

		/*}catch(e){
			if(console) console.log("emitValue:"+e);
		}*/
	},
	//Button click events
	play: function(){
		var _vlcobj = this.wrappedJSObject.VLCObj;
		if(_vlcobj.vlc.input.state == 3)
			_vlcobj.vlc.playlist.pause();
		else
			_vlcobj.vlc.playlist.play();

		_vlcobj.stateUpdate();
	},
	pause: function(){
		this.wrappedJSObject.VLCObj.vlc.playlist.togglePause();
	},
	stop: function(){
		var _vlcobj = this.wrappedJSObject.VLCObj;
		_vlcobj.vlc.playlist.stop();
		//if(_vlcobj.instance.matchEmbed)
		//  _vlcobj.$('cued-embed').classList.remove('hid');
	},
	fs: function(){
		this.wrappedJSObject.VLCObj.vlc.video.toggleFullscreen();
	},
	//Youtube stuff
	addEventListener: function(event, func, bubble){
		console.log("Tried to add event listener for:", event);
	},
	seekTo: function(pos){ //Make yuutuub comments 'time links' work
		if(this.vlc.input)
			this.vlc.input.time = pos * 1000;
	},
	getCurrentTime: function(){ //Make yuutuub share work, randomly stops :/
		if(this.vlc.input)
			return this.vlc.input.time / 1000;
		else
			return 0;
	},
	pauseVideo: function(){
		this.vlc.playlist.pause();
	},
	playVideo: function(){
		this.vlc.playlist.play();
		this.stateUpdate();
	},
	stopVideo: function(){
		this.vlc.playlist.stop();
	},
	getDuration: function(){
		return this.vlc.input.length / 1000;
	},
	getPlaybackQuality: function() //random at the moment
	{
		console.log("getPlaybackQuality");
		return "44";
	},
	//End of Youtube stuff
	setTimes: function(cur, dur){
		this.scrollbarPos.bar.children.namedItem('vlctime').innerHTML = fmttime(cur) + ( dur != undefined ? " / " + fmttime(dur) : "");
	},
	startUpdate: function(){
		this.stopUpdate = false;
		this.updateTick();
	},
	clearUpdate: function(){
		this.stopUpdate = true;
		this.instance.win.clearTimeout(this.updateTimer);
		this.stateUpdate(); //final update
	},
	updateTick: function(){
		this.stateUpdate();
		var that = this;
		if(!this.stopUpdate)
			that.updateTimer = that.instance.win.setTimeout(function(e){that.updateTick();}, stateUpdateFreq);
	},
	stateUpdate: function(){
		try{
			if(this.vlc.input && !this.scrollbarPos.userSeeking){
				this.scrollbarPos.setValue(this.vlc.input.position*this.scrollbarPos.maxValue);
				//this.controls.children.namedItem('vlcstate').innerHTML = VLC_status[this.vlc.input.state];
				var el = this.instance.doc.querySelector('#progress-radial');
				el.innerHTML = VLC_status[this.vlc.input.state][0];
				el.title = VLC_status[this.vlc.input.state];
				this.setTimes(this.vlc.input.time,
					this.vlc.input.length > 0 ? this.vlc.input.length : (this.instance.ytplayer ? 1000*this.instance.ytplayer.config.args.length_seconds : 0));
			}

		}catch(e){
			if(console) console.log('stateUpdate: '+e);
		}
	},
};

// FIXME pls
ScriptInstance.prototype.setPlayerSize = function()
{
	var vlc = this.$("movie_player");
	//this.doc.body.style.height = "100%";
	vlc.style.width = "100%";
	var controls = this.$('vlc_controls_div');

	var spacerH = 0;
	var spacer = this.$('vlc-spacer');
	if(spacer) spacerH = spacer.clientHeight;

	if(this.containerHeight !== undefined)
		this.$(vlc_id+'-holder').style.height = (this.containerHeight - controls.clientHeight - spacerH)  + 'px';
	else
		this.$(vlc_id+'-holder').style.height = (this.win.innerHeight - controls.clientHeight - spacerH)  + 'px';

	var tmp = controls.style.display;
	controls.style.display = 'block';
	controls.style.top = -controls.clientHeight + 'px';

	if(this.isPopup)
	{
		this.$(vlc_id).style.width =  "100%";
		this.$(vlc_id).style.height = "100%";
	}

	var w = vlc.parentNode.clientWidth, h = vlc.parentNode.clientHeight;
	//this.$(vlc_id).style.width = w + 'px';
	//this.$(vlc_id).style.height = (h - controls.clientHeight) + 'px';
	//this.$(vlc_id+'-holder').style.width = window.innerWidth + 'px';

	/// Calculate position seekbar's width
	// Fixed-width CSS should work also for now if you want
	if(/*buseWidePosBar && */ this.$('scrollbar1'))
	{
		// Hardcoded for 50px wide #vlcstate
		// Mystery 22/7/2px (margins+paddings+border sizes?) and 5px for margin
		var cw = w /*- this.$('vlcstate').clientWidth*/ - 22 - 26*2;
		if(!this.buseWidePosBar && !this.bcompactVolume) cw -= this.$('scrollbar2').clientWidth + 7 + 5;
		if(this.bshowRate) cw -= this.$('ratebar').clientWidth + 2 + 5;
		this.$('scrollbar1').style.width = cw + 'px';
	}
	controls.style.display = tmp;
};

ScriptInstance.prototype.setBuffer = function(i)
{
	var val, b = "#2f3439",f = "#ff6347",el = document.querySelector('#'+vlc_id+'_controls .progress-radial');
	var step = 1, loops = Math.round(100/ step), increment = (360 / loops), half = Math.round(loops / 2);
	if (i < half)
	{
		val = 90 + ( increment * i ); el.style.backgroundImage = "linear-gradient(90deg, "+b+" 50%, transparent 50%, transparent), linear-gradient("+val+"deg, "+f+" 50%, "+b+" 50%, "+b+")";
	}
	else
	{
		val = -90 + ( increment * ( i - half ) ); el.style.backgroundImage = "linear-gradient("+val+"deg, "+f+" 50%, transparent 50%, transparent), linear-gradient(270deg, "+f+" 50%, "+b+" 50%, "+b+")";
	}
};

ScriptInstance.prototype.setUriHost = function(uri, host)
{
	if(this._tmp_uri == undefined) this._tmp_uri = this.doc.createElement('a');
	this._tmp_uri.href = uri;
	this._tmp_uri.host = host;
	return this._tmp_uri.href;
};

ScriptInstance.prototype.onFmtChange = function(ev, opt)
{
	var n = opt || ev.target.options[ev.target.selectedIndex];

	if(ev) this.fmtChanged = true;//so doAdd would play only if user changed format
	//this.VLCObj.add(n.value);
	//if(this.buseFallbackHost && n.getAttribute("fallback"))
	//  n.value = this.setUriHost(n.value, n.getAttribute("fallback"));
	this.myvlc.add(n.value, n.getAttribute("name"));
};

ScriptInstance.prototype.onWideClick = function(ev)
{
	this.isWide = !this.isWide; //TODO rely isWide being correct always?
	this.setPlayerSize(this.isWide);
};

ScriptInstance.prototype._makeButton = function(id, text, prefix)
{
	if(prefix === undefined) prefix = true;
	var btn = this.doc.createElement("button"),
	span = this.doc.createElement("span");
	btn.id = (prefix ? vlc_id : '') + id;
	btn.className = "yt-uix-button yt-uix-button-default";
	span.className = "yt-uix-button-content";
	span.innerHTML = text;
	btn.appendChild(span);
	return btn;
};

ScriptInstance.prototype._makeCheckbox = function(id, setting, text, title)
{
	var el = this.doc.createElement("div");
	el.id = id + "-div";
	el.className = "vlc-config-checkbox-div";
	if(title || (_(id) != id && _(id).length > 1)) el.title = title || _(id)[1];
	var ck = this.doc.createElement("input");
	ck.type = "checkbox";
	ck.id = id;
	var lbl = this.doc.createElement("label");
	lbl.appendChild(ck);
	var span = this.doc.createElement("span");
	span.appendChild(document.createTextNode(text || (_(id) != id ? _(id)[0] : _(id)) ));
	lbl.appendChild(span);
	el.appendChild(lbl);

	if(setting)
	{
		ck.checked = GM_getValue(setting, false);
		var that = this;
		ck.addEventListener('click', function(ev)
			{
				if(setting in that)
					that[setting] = ev.target.checked;
				GM_setValue(setting, ev.target.checked);
			}, false);
	}
	return el;
};

ScriptInstance.prototype.setThumbnailVisible = function(b)
{
	var thumb = this.$("vlc-thumbnail");
	if(!thumb) return;

	if(b)
		thumb.classList.remove("hid");
	else
		thumb.classList.add("hid");
};

ScriptInstance.prototype.openPopup = function(w, h)
{
	if(w === undefined) w = 854;
	if(h === undefined) h = 480;
	if(this.bpopupSeparate) popupID = '';
	else popupID = 'vlc-popup-window';

	var win = window.open('', popupID, 'width=' +w+ ',height=' +h+ ',resizeable,scrollbars');
	win.document.body.innerHTML = '';

	//Set few global variables
	var map = [];
	var sel = this.$(vlc_id+'_select');
	for(i = 0; i<sel.options.length; i++)
		map.push([sel.options[i].getAttribute('name'), sel.options[i].getAttribute('value')]);

	win['vlc_urlmap'] =  map;

	/*win["yt"] = this.yt;
	win["ytplayer"] = this.ytplayer;

	//Copy CSS styles
	var styles = this.doc.getElementsByTagName("style");
	var links = this.doc.getElementsByTagName("link");
	var heads = win.document.getElementsByTagName("head");
	for (var i=0; i<styles.length; i++) {
		var node = styles[i].cloneNode(true);
		heads[0].appendChild(node);
	}

	for (var i=0; i<styles.length; i++) {
		if(links[i].rel == "stylesheet")
		{
			var node = links[i].cloneNode(true);
			heads[0].appendChild(node);
		}
	}*/

	win.document.title = '**VLCMultiTube**';

	//if(this.thumb) win.document.body.appendChild(this.thumb.parentNode.cloneNode(true));

	var s = new ScriptInstance(win, true);
	s.win["vlc-instance"] = s; //Keep reference alive. Might be overkill. Seems to work without it too.
};

function gd(o, v, d){if(v in o) return o[v]; else return d;}

ScriptInstance.prototype.generateDOM = function(options)
{
	if(options === undefined) options = {};
	var wide = gd(options, 'wide', true), fs = gd(options, 'fs', true), pause = gd(options, 'pause', true),
		auto = gd(options, 'auto', true), dl = gd(options, 'dl', true), popup = gd(options, 'popup', this.busePopups);

	var that = this;
	var vlc = this.doc.createElement('div');
	vlc.id = "movie_player";

	var holder = this.doc.createElement("div");
	holder.id = vlc_id + "-holder";
	//set controls="yes" to show plugins controls by default
	holder.innerHTML = '<img id="vlc-thumbnail"><embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" \
						version="VideoLAN.VLCPlugin.2" controls="no" autoplay="no" \
						width="100%" height="100%" id="'+ vlc_id +'" name="'+ vlc_id +'"/>';

	if(options.thumb /*&& this.buseThumbnail*/)
	{
		holder.childNodes[0].setAttribute('src', options.thumb);
		holder.childNodes[0].addEventListener('click', function(ev){ that.myvlc.playVideo(); }, false);
	}
	else
		holder.childNodes[0].classList.add("vlc_hidden");//perma hide


	var controls = this.doc.createElement("div");
	{
		controls.id = "vlc_controls_div";

		var volbar;
		var sliders = this.doc.createElement("div");
		{
			sliders.id = vlc_id + "_controls";
			sliders.className = "vlccontrols";

			var el;
			el = this.doc.createElement("div");
			el.className = "progress-radial";
			el.id = "progress-radial";
			el.title = _("BUFFERINDICATOR");
			sliders.appendChild(el);

			el = this.doc.createElement("div");
			el.id = 'scrollbar1';
			el.className = 'vlc-scrollbar';
			el.title = _("POSITION");
			if(this.bembedControls && this.matchEmbed) el.style.width = '125px';
			el.innerHTML = '<div class="knob"></div><span id="vlctime">00:00/00:00</span>';
			sliders.appendChild(el);

			volbar = this.doc.createElement("div");
			volbar.className = 'vlc-volume-holder';
			volbar.title = _("VOLUME");
			volbar.innerHTML = '<span class="yt-uix-button-content"><div id="scrollbar2" class="vlc-scrollbar"><span id="vlcvol">0</span><div class="knob"/></div></span>';

			if(!this.bcompactVolume && !this.buseWidePosBar)
				sliders.appendChild(volbar);

			if(this.bshowRate)
			{
				el = this.doc.createElement("div"); el.id = 'ratebar';
				el.className = 'vlc-scrollbar';
				el.title = _("PLAYBACKRATE");
				el.innerHTML = '<div class="knob"></div><span id="vlcrate">1.0</span>';
				sliders.appendChild(el);
			}

			//TODO make #vlcstate use icons or something
			//#vlcstate was meant for debugging-only in the first place anyway :P
			/*el = this.doc.createElement("div");
			el.id = 'vlcstate';
			sliders.appendChild(el);
			el = this.doc.createElement("div");
			el.id = 'vlc-video-size';
			sliders.appendChild(el);*/
		}

		controls.appendChild(sliders);

		/// Buttons
		var buttons = this.doc.createElement("div");
		{
			buttons.id = "vlc_buttons_div";
			buttons.appendChild(this._makeButton('_play', _("PLAY")));
			//if(pause) buttons.appendChild(this._makeButton('_pause', "Pause"));
			buttons.appendChild(this._makeButton('_stop', _("STOP")));
			buttons.appendChild(this._makeButton('_fs', _("FS")));
			//if(wide) buttons.appendChild(this._makeButton('_wide', _("WIDE")));
			if(popup && !this.isPopup /*&& !this.matchEmbed*/)
			{
				var pop_pop = this._makeButton('_popup', _("POPUP"));
				pop_pop.addEventListener('click', function(e){
					that.openPopup();
					that.myvlc.pauseVideo();
				}, false);
				buttons.appendChild(pop_pop);
			}

			if(this.bcompactVolume)
			{
				volbar.classList.add('yt-uix-button');
				volbar.classList.add('yt-uix-button-default');
				buttons.appendChild(volbar);
			} //else added after download/YT link

			if(this.bshowRate)
			{
				var nrm = this._makeButton('_rate', "1.0");
				nrm.title = _("RESETRATE");
				nrm.addEventListener('click', function(e){that.scroll3.setValue(1.0); that.myvlc.emitValue(that.scroll3, 1.0);}, false);
				buttons.appendChild(nrm);
			}
		}

		/// Mute
		if(this.bshowMute) {
			btn = this._makeButton('_mute', _('MUTE'), true);
			btn.muteStyleToggle = function() {
				try {
					if(that.myvlc && that.myvlc.vlc && that.myvlc.vlc.audio.mute) {
						this.classList.add('vlc-boo-bg');
						this.classList.add('vlc-wl-state');
					} else {
						this.classList.remove('vlc-boo-bg');
						this.classList.remove('vlc-wl-state');
					}
				} catch(e) {}
			}
			btn.addEventListener('click', function(ev) {
				that.myvlc.vlc.audio.toggleMute();
				//wait for vlc to change state
				that.win.setTimeout(function(){ev.target.muteStyleToggle();}, 100);
			}, false);
			btn.muteStyleToggle();
			buttons.appendChild(btn);
		}

		/// Format select
		var _fmtsel = this.doc.createElement("select");
		_fmtsel.id = vlc_id + '_select';
		_fmtsel.className = "yt-uix-button yt-uix-button-default";
		buttons.appendChild(_fmtsel);

		/// CC select
		var ccsel = this.doc.createElement("select");
		{
			ccsel.id = vlc_id + '_ccselect';
			ccsel.className = "vlc_hidden yt-uix-button yt-uix-button-default";

			var nullopt = this.doc.createElement("option");
			nullopt.setAttribute("name", "lang");
			nullopt.setAttribute("value", "null");
			nullopt.innerHTML = _("NONE");
			ccsel.appendChild(nullopt);
			buttons.appendChild(ccsel);
		}

		var configbtn = this._makeButton('vlc-config-btn', '', false);
		configbtn.addEventListener('click', function(ev)
			{
				var el = that.doc.getElementById("vlc-config");
				if(el.style.display == 'block')
					el.style.display = 'none';
				else
					el.style.display = 'block'
			},
		false);

		buttons.appendChild(configbtn);

		/// Download link
		var link = this.doc.createElement("A");
		{
			link.id = "vlclink";
			link.className = "vlclink yt-uix-button yt-uix-button-default";//#player a overrides
			link.title = _("LINKSAVE");
			link.setAttribute("href", "#");
			link.setAttribute("target", "_new");
			link.innerHTML = '<span class="yt-uix-button-content">' + _("DOWNLOAD") + '</span>';
			//https://bugzilla.mozilla.org/show_bug.cgi?id=676619
			//if(!this.matchEmbed) link.setAttribute("download", this.ytplayer.config.args.title + ".mp4"); //TODO link filename
			if(dl)// && matchEmbed)
				buttons.appendChild(link);
		}

		//el = this.doc.createElement("div");
		{
			//el.id = "vlc-subtitle";
			var inp = this.doc.createElement("input");
			inp.id = "vlc-subtitle";
			inp.title = "Paste full path or url to subtitle here";
			inp.addEventListener('change', function(e){
				that.subtitle = e.target.value;
				that.onFmtChange(null, that.$(vlc_id+"_select").options[0]);
			}, false);

			//el.appendChild(inp);
			buttons.appendChild(inp);
			/*btn = this.doc.createElement("input");
			btn.type = "file";
			btn.style.width = "100px";
			btn.addEventListener('change', function(e){console.log(e); inp.value = that.subtitle = e.target.value;}, false);
			buttons.appendChild(btn);*/
		}

		controls.appendChild(buttons);
	}
	//Configurator comes here
	// appearance is kinda ugly :P
	var config = this.doc.createElement("div");
	{
		config.id = "vlc-config";

		//Merge random configs into one div
		var midcolumn = this.doc.createElement("div");
		midcolumn.id = "vlc-config-midcol";
		config.appendChild(midcolumn);

		var langs = this.doc.createElement("div");
		{
			langs.id = "vlc-config-lang";

			var s = this.doc.createElement("span");
			s.id = "vlc-config-lang-icon";
			langs.appendChild(s);
			var sel = this.doc.createElement("select");
			sel.id = vlc_id + '_lang_select';
			sel.className = "yt-uix-button yt-uix-button-default";
			for(i in gLangs)
			{
				var opt = this.doc.createElement("option");
				opt.setAttribute("value", i);
				opt.textContent = gLangs[i]['LANG'];
				if(gLang == i) opt.selected = true;
				sel.appendChild(opt);
			}
			sel.addEventListener('change', function(ev){
				gLang = ev.target.value;
				GM_setValue('vlc-lang', gLang);
				that.reloadPlayer();
			}, false);
			langs.appendChild(sel);
			midcolumn.appendChild(langs);
		}

		/// Download link
		/*el = this.doc.createElement("div");
		el.id = "vlc-config-link";
		el.appendChild(link);
		config.appendChild(el);*/

		///Playback rate
		el = this.doc.createElement("div");
		{
			el.id = "vlc-config-rate-values";
			var inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-rate-min', '0.25'), 0.25);
			inp.title = _("MINRATE");
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				GM_setValue('vlc-rate-min', e.target.value);
				var f = parseFloat(e.target.value);
				that.scroll3.setMinValue(f); that.scroll3.setValue(Math.max(that.scroll3.getValue(), f));
			}, false);
			el.appendChild(inp);

			inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-rate-max', '2'), 2);
			inp.title = _("MAXRATE");
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				GM_setValue('vlc-rate-max', e.target.value);
				var f = parseFloat(e.target.value);
				that.scroll3.setMaxValue(f); that.scroll3.setValue(Math.min(that.scroll3.getValue(), f));
			}, false);
			el.appendChild(inp);

			var lbl;
			lbl = this.doc.createElement("div");
			lbl.innerHTML = _("PLAYBACKRATE") + "(min / max):";
			midcolumn.appendChild(lbl);
			midcolumn.appendChild(el);
		}

		///Repeat wait timeout
		el = this.doc.createElement("div");
		{
			el.id = "vlc-config-repeat";
			var inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-repeat-wait', "0"));
			inp.title = _("vlc-config-repeat-wait")[1];
			inp.className = "tiny";
			inp.addEventListener('change', function(e){ GM_setValue('vlc-repeat-wait', e.target.value);}, false);
			//el.appendChild(inp);

			var lbl;
			lbl = this.doc.createElement("div");
			lbl.innerHTML = _("vlc-config-repeat-wait")[0];
			el.appendChild(lbl);
			el.appendChild(inp);

			midcolumn.appendChild(el);
		}

		///Max volume
		el = this.doc.createElement("div");
		{
			el.id = "vlc-config-volume-max";
			var inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-volume-max', "100"), 100.0).toFixed(0);
			inp.title = _("vlc-config-volume-max")[1];
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				GM_setValue('vlc-volume-max', e.target.value);
				var f = parseFloat(e.target.value);
				that.scroll2.setMaxValue(f); that.scroll2.setValue(Math.min(that.scroll2.getValue(), f));
				}, false);
			//el.appendChild(inp);

			var lbl;
			lbl = this.doc.createElement("div");
			lbl.innerHTML = _("vlc-config-volume-max")[0];
			el.appendChild(lbl);
			el.appendChild(inp);

			midcolumn.appendChild(el);
		}

		///Buffer length
		el = this.doc.createElement("div");
		{
			el.id = "vlc-config-cache";
			var inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-cache', "5"));
			inp.title = _("vlc-config-cache")[1];
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				var cache = tryParseFloat(e.target.value, 5);
				if(cache < 0) cache = 0;
				else if(cache > 60) cache = 60; //max 60 seconds according to vlc help
				GM_setValue('vlc-cache', cache);
				}, false);

			var lbl;
			lbl = this.doc.createElement("div");
			lbl.innerHTML = _("vlc-config-cache")[0];
			el.appendChild(lbl);
			el.appendChild(inp);

			midcolumn.appendChild(el);
		}

		///Wide size
		/*el = this.doc.createElement("div");
		{
			el.id = "vlc-config-wide-width";
			var inp = this.doc.createElement("input");
			inp.value = GM_getValue('vlc-wide-width', this.widthWide);
			inp.title = _("vlc-config-wide-width")[1];
			inp.className = "tiny";
			inp.addEventListener('change', function(e){ that.widthWide = e.target.value; GM_setValue('vlc-wide-width', e.target.value);}, false);
			//el.appendChild(inp);

			var lbl;
			lbl = this.doc.createElement("div");
			lbl.innerHTML = _("vlc-config-wide-width")[0];
			el.appendChild(lbl);
			el.appendChild(inp);

			midcolumn.appendChild(el);
		}*/

		// Floating checkboxes look nasty and don't play nicely with language selector
		var chkboxes = this.doc.createElement("div");
		chkboxes.id = "vlc-config-checkboxes";
		/// Autoplay button
		chkboxes.appendChild(this._makeCheckbox("vlc-config-autoplay", 'vlc_autoplay'));
		/// menu settings
		chkboxes.appendChild(this._makeCheckbox("vlc-config-repeat",   'buseRepeat'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-resume",   'bresumePlay'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-rate",   'bshowRate'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-popup", 'busePopups'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-popup-separate", 'bpopupSeparate'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-popup-autoplay", 'bpopupAutoplay'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-mute-button", 'bshowMute'));
		//a bit iffy right now
		//chkboxes.appendChild(this._makeCheckbox("vlc-config-hover",    'buseHoverControls'));
		config.appendChild(chkboxes);
		btn = this._makeButton('-config-close','Close');
		btn.style.position = "absolute";
		btn.style.left = btn.style.bottom = "0px";
		btn.addEventListener('click', function(e){config.style.display='none';},false);
		config.appendChild(btn);
		config.appendChild(chkboxes);

	}

	vlc.appendChild(holder);

	var spacer;
	//TODO Caveat is that controls don't get updated when hidden so prepare for inconsistencies
	if(this.buseHoverControls && this.matchEmbed)
	{
		spacer = this.doc.createElement("div");
		spacer.id = "vlc-spacer";
		spacer.style.height = "15px";
		//spacer.style.background = "rgb(175,43,38)";//YT red
		spacer.innerHTML = "Hover on this bar for controls.";
		controls.style.background = "white";//Hm, div needs to be 'solid' or it gets hidden behind the plugin
		controls.style.position = "relative";
		//controls.style.display = "none";
		spacer.appendChild(controls);
		vlc.appendChild(spacer);
	}
	else
	{
		vlc.appendChild(controls);
		vlc.appendChild(config);
	}
	return vlc;
};

ScriptInstance.prototype.setupVLC = function(parentNode, thumb, urls, resize, callbacks)
{
	var that = this;
	if(this.myvlc) {
		that.addUrls(urls, true);
		return;
	}
	var vlcNode = this.generateDOM({thumb : thumb});
	parentNode.appendChild(vlcNode);
	this.player = parentNode;
	this.myvlc = new VLCObj(this, callbacks);
	this.scroll1 = new ScrollBar(this);
	this.scroll1.init('#scrollbar1', '#scrollbar1 div.knob', 0, 0, 1, true);

	var maxvolume = tryParseFloat(GM_getValue('vlc-volume-max', "100"), 100.0).toFixed(0);
	if(maxvolume < 100) maxvolume = 100;

	this.scroll2 = new ScrollBar(this);
	this.scroll2.init('#scrollbar2', '#scrollbar2 div.knob', bcompactVolume?1:0, 0, maxvolume, true, function(pos){this.bar.children.namedItem('vlcvol').innerHTML = Math.round(pos);});

	if(this.bshowRate)
	{
		this.scroll3 = new ScrollBar(this);
		//scroll3.init('#ratebar', '#ratebar div.knob', 0, -1, 3, true);
		//Limiting default range to 0.25 to 2 so that 150px bar still has some precision
		var ratemin = tryParseFloat(GM_getValue('vlc-rate-min', "0.25"), 0.25);
		var ratemax = tryParseFloat(GM_getValue('vlc-rate-max', "2"), 2);
		this.scroll3.init('#ratebar', '#ratebar div.knob', 0, ratemin, ratemax, true, function(pos){this.bar.children.namedItem('vlcrate').innerHTML = pos.toFixed(3);});
		this.scroll3.setValue(1.0);
	}

	function waitForIt(){
		if(that.myvlc.init(that.scroll1, that.scroll2, that.scroll3))
		{
			//this.myvlc.add("");//Or else 'no mediaplayer' error
			that.restoreSettings();
			that.addUrls(urls, true);
		} else {
			// chrome: wait for user to allow plugin
			setTimeout(waitForIt, 1000);
		}
	}

	waitForIt();
	this.setBuffer(0);
	this.setPlayerSize(true);
	if(resize||this.isPopup){
		//Trouble setting size through CSS so just force it for now atleast
		var that = this;
		//if(popup)
		this.win.addEventListener('resize', function(e){ that.setPlayerSize(); }, false);
	}
};

ScriptInstance.prototype.addUrls = function(stream_map, clean)
{
	var selectNode = this.$(vlc_id+"_select");
	var idx = 0;
	if(clean) {
		idx = selectNode.selectedIndex;
		removeChildren(selectNode, true);
	}
	for(var i=0; i<stream_map.length; i++)
	{
		var option = this.doc.createElement("option");
		option.setAttribute("name",     stream_map[i][0])
		option.setAttribute("value",    stream_map[i][1]);
		option.innerHTML = stream_map[i][0];
		selectNode.appendChild(option);
	}

	if(selectNode.options.length <= idx || idx < 0) idx = 0;
	selectNode.selectedIndex = idx;
	this.onFmtChange(null, selectNode.options[idx]);
};

function getXML(url, callback)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: headers,
		onload: function(r){
			if(r.status==200){
				if(r.responseText){
					callback(r.responseText);
				}
			}
		}
	});
}

//Not too reliable and probably works only with the unpacker functions
function cutParameters(str)
{
	params = [];
	prevDelim = null;
	j = 0;
	for(i=0;i<str.length;i++)
	{
		//cut string between single or double quotes
		if((str[i] == "'" || str[i] == "\"") &&
			str.slice(i-1, i) != "\\")
		{
			if(!prevDelim)
			{
				prevDelim = str[i];
				j = i;
			}
			else if(prevDelim == str[i])
			{
				for(i++;i<str.length;i++)
				{
					if(str[i] == ',')
						break;
				}
				params.push(str.slice(j, i < str.length ? i-1 : str.length));
				prevDelim = null;
				i--; //dial back so next argument wont get skipped
			}
		}
		//cut between commas (numbers mostly)
		else if(str[i] == ',' && prevDelim == null)
		{
			j = i+1;
			for(i++;i<str.length;i++)
			{
				if(str[i] == ',')
					break;
			}
			params.push(str.slice(j,i < str.length ? i : str.length));
			i--; //dial back so next argument wont get skipped
		}
	}
	return params;
}

function unpack(p,a,c,k,e,d){while(c--)if(k[c])p=p.replace(new RegExp('\\b'+c.toString(a)+'\\b','g'),k[c]);return p}

ScriptInstance.prototype.parsePage = function()
{
	var that = this;
	var page_url = this.win.location.href;

	if(/putlocker\.com\/embed/.test(page_url) ||
		/sockshare\.com\/embed/.test(page_url))
	{
		var captcha = this.doc.querySelector("input[name='captcha_code']");
		var confirm = this.doc.querySelector("input[name='confirm']");
		var form = this.doc.querySelector("form");
		if(captcha)
		{
			//Needs debugging
			/*form.onsubmit = function(){ return false; }
			confirm.addEventListener('click', function(e){
					form.submit();
					that.location.reload();
				}, false);*/
			return;
		}

		var hidden = this.doc.querySelector("input[name='fuck_you']");
		if(!hidden)
		{
			console.log("putlocker.com: no form element");
			return;
		}

		//Do any clean up that is needed, here it nukes it all
		this.doc.body.innerHTML = "";

		//called from POST request
		function getStream(rssUri)
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: that.doc.location.protocol + "//" + that.doc.location.host + rssUri,
				headers: headers,
				onload: function(r){
					if(r.status==200){
						if(r.responseText){
							var map = [];
							var parser=new DOMParser();
							xmlDoc=parser.parseFromString(r.responseText, "text/xml");
							var c = xmlDoc.querySelectorAll("content");
							for(i=0;i<c.length;i++)
							{
								if(c[i].getAttribute('type').indexOf('video/')>-1) //currently has only 1 stream
									map.push(['Default', c[i].getAttribute('url')]);
							}

							if(map.length)
							{
								//Pass a node to which to append VLC
								that.setupVLC(that.doc.body, null, map);
							}
							else
								console.log("No urls");
						}
					}
				}
			});
		}

		//POST that we have 'seen' the ads
		GM_xmlhttpRequest({
			method: 'POST',
			url: this.doc.location.href,
			headers: headersPost,
			data: hidden.getAttribute('name') + "=" + hidden.getAttribute('value') + "&confirm=Close+Ad+and+Watch+as+Free+User",
			onload: function(r){
				if(r.status==200){
					if(r.responseText){

						var parser=new DOMParser();
						htmlDoc=parser.parseFromString(r.responseText, "text/html");
						var scripts = htmlDoc.body.getElementsByTagName('script');
						for(i=0;i<scripts.length;i++)
						{
							var m = scripts[i].innerHTML.match(/playlist:\s*'(.*?)'/);
							if(m) { getStream(m[1]); return;}
						}
						console.log("Failed to find stream url.");
					}
				}
			}
		});
	}

	//http://www.vidxden.com/embed-xxxxxxx.html
	else if(/vidxden\.com/.test(page_url) ||
		/vidbux\.com/.test(page_url) ||
		/muchshare\.net/.test(page_url) ||
		/vidbull\.com/.test(page_url) ||
		/movreel\.com\/embed/.test(page_url))
	{
		var submit = this.doc.querySelector("input[type='submit']");
		var form = this.doc.querySelector("form");
		//var flvplayer = this.doc.querySelector("#flvplayer");

		captcha = this.doc.querySelector('#captchaForm');
		//console.log('captcha',captcha);
		plydiv = this.doc.querySelector('#contmvshre') || this.doc.querySelector('div.mid_content') ||
					this.doc.querySelector("#flvplayer");
		//console.log('element', form, submit, flvplayer, plydiv, captcha);

		//ah, skip it and error out later
		/*if((form && submit && !flvplayer) && (captcha && !plydiv))
		{
			console.log('exiting...');
			return;
		}*/

		var scripts = this.doc.querySelectorAll("script");
		for(sc=0;sc<scripts.length;sc++)
		{
			if(scripts[sc].innerHTML.indexOf('eval')>-1 && scripts[sc].innerHTML.match(/p,a,c,k,e,d/))
			{

				//try{
					var m, params = scripts[sc].innerHTML.match(/}(.*)\)/)[1];

					//trying to get parameters so we could avoid using eval
					params = cutParameters(params.slice(1,-1));
					if(params[params.length-1].indexOf('split')) {
						params[params.length-1] = params[params.length-1].split(/['"]/)[1].split('|');
					}

					//console.log(params);
					//FIXME Eeeeeviiilll, also if cutParameters fail, use this
					//eval("var ret = unpack" + params);
					var ret = unpack.apply(this, params);

					if(ret) {
						ret = ret.replace(/\\"|\\'/g, '"');
						m = ret.match(/file:['"](.*?)['"]/) ||
							ret.match(/['"]file['"]\s*,\s*['"](.*?)['"]/) ||
							ret.match(/param\s+name="src"\s*value="(.*?)"/);
					}

					//console.log('script', sc, m, ret);
					if(m) {
						if(!/embed/.test(page_url)) {
							this.containerHeight = 500;
							if(plydiv) plydiv.style.height = '500px';
						}else
							plydiv = this.doc.body;
						plydiv.innerHTML = "";
						this.setupVLC(plydiv, null, [['Default', m[1]]]);
						return;
					}
				//}catch(e){console.log(e);}
			}
		}
	}

	else if(/stagevu\.com\/embed/.test(page_url))
	{
		var src = this.doc.querySelector("param[name='src']");
		if(src)
		{
			this.doc.body.innerHTML = "";
			this.setupVLC(this.doc.body, null, [['Default', src.getAttribute('value')]]);
			return;
		}
	}

	else if(/embed\.nowvideo\./.test(page_url) ||
		/embed\.movshare\.net/.test(page_url) ||
		/embed\.novamov\.com/.test(page_url) ||
		/*/embed\.divxstage\.eu/.test(page_url) ||*//*triple-double obfuscate my a***/
		/embed\.videoweed\.es/.test(page_url))
	{
		var host = 'http://' + this.win.location.host.replace('embed.', 'www.');
		var key, file, scripts = this.doc.querySelectorAll("script");

		for(i=0;i<scripts.length;i++)
		{
			file = scripts[i].innerHTML.match(/flashvars.file="(.*?)"/);
			key = scripts[i].innerHTML.match(/flashvars.filekey="?(.*?)"?;/);
			if(key){
				rKey = new RegExp(key[1]+'="(.*?)";');
				if(ret = rKey.test(scripts[i].innerHTML))
					key = rKey.exec(scripts[i].innerHTML);
			}
			domain = scripts[i].innerHTML.match(/flashvars.domain="(.*?)"/);
			if(key && file && domain) {key = key[1]; file = file[1]; host = domain[1]; break;}
		}

		GM_xmlhttpRequest({
			method: 'GET',
			url: host+'/api/player.api.php?key=' + key + '&file=' + file,
			headers: headers,
			onload: function(r){
				if(r.status==200){
					if(r.responseText){
						var split = r.responseText.split('&');
						var params = {};
						split.forEach(function(p){
							var t = p.split('=');
							params[t[0]] = unescape(t[1]);
						});
						if('url' in params)
						{
							that.doc.body.innerHTML = "";
							that.setupVLC(that.doc.body, null, [['Default', params['url']]]);
							return;
						}
					}
				}
			}
		});
	}

	else if(/play\.flashx\.tv\/player\/embed\.php/.test(page_url))
	{
		var anchors = this.doc.querySelectorAll("a");

		for(i=0;i<anchors.length;i++)
		{
			if(anchors[i].href.match(/fxtv\.php/))
			{
				this.win.location = anchors[i].href;
				break;
			}
		}
	}
	else if(/play\.flashx\.tv\/player\/fxtv\.php/.test(page_url))
	{
		var link, scripts = this.doc.querySelectorAll("script");

		for(i=0;i<scripts.length;i++)
		{
			if((link = scripts[i].innerHTML.match(/data=".*?config=(.*?)"/)))
			{
				GM_xmlhttpRequest({
					method: 'GET',
					url: link[1],
					headers: headers,
					onload: function(r){
						if(r.status==200){
							if(r.responseText){
								var parser=new DOMParser();
								xmlDoc=parser.parseFromString(r.responseText, "text/xml");
								var file = xmlDoc.querySelector("file").innerHTML;
								that.doc.body.innerHTML = "";
								that.setupVLC(that.doc.body, null, [['Default', file]]);
							}
						}
					}
				});
				return;
			}
		}
	}

	else if(/movreel\.com\/embed/.test(page_url))
	{
		form = this.doc.querySelector("form");
		console.log('submit', form);
		//if(form) form.submit();

		var src = this.doc.querySelector("param[name='src']");
		if(src)
		{
			this.doc.body.innerHTML = "";
			this.setupVLC(this.doc.body, null, [['Default', src.getAttribute('value')]]);
		}
	}

	else if(/motherless\.com/.test(page_url))
	{
		var m, div = this.doc.querySelector("#media-media");
		m = div.innerHTML.match(/"file"\s*:\s*"(.*?)"/);

		if(div && m)
		{
			div.innerHTML = "";
			this.setupVLC(div, this.doc.querySelector('link[rel="image_src"]').href, [['Default', m[1]]]);
		}
	}

	else if(/billionuploads\.com\/embed/.test(page_url))
	{
		var el = this.doc.querySelector("param[name='src']") || this.doc.querySelector("input#dl");

		if(el)
		{
			this.doc.body.innerHTML = "";
			this.setupVLC(this.doc.body, null, [['Default', el.value]]);
		}
		else if((el = this.doc.querySelector("form")))
		{
			el.submit();
		}
	}

	else if(/180upload\.com\/embed/.test(page_url))
	{
		var el;

		if((el = this.doc.querySelector("form")))
		{
			el.submit();
		}
		else
		{
			var scripts = this.doc.querySelectorAll("script");
			for(i=scripts.length-1;i>=0;i--)
			{
				if(scripts[i].innerHTML.indexOf('eval')>-1 && scripts[i].innerHTML.match(/p,a,c,k,e,d/))
				{
					//function unpack(p,a,c,k,e,d){while(c--)if(k[c])p=p.replace(new RegExp('\\b'+c.toString(a)+'\\b','g'),k[c]);return p}
					var m, params = scripts[i].innerHTML.match(/}(.*)\)/)[1];
					//FIXME Eeeeeviiilll
					eval("var ret = unpack" + params);
					if(ret && (m = ret.match(/'file'\s*,\s*'(.*?)'/)))
					{
						this.doc.body.innerHTML = "";
						this.setupVLC(this.doc.body, null, [['Default', m[1]]]);
						return;
					}
				}
			}
		}
	}

	else if(/gorillavid\.in\/embed/.test(page_url))
	{
		var scripts = this.doc.querySelectorAll("script");
		for(i=scripts.length-1;i>=0;i--)
		{
			var m = scripts[i].innerHTML.match(/file\s*:\s*"(.*?)"/);
			if(m)
			{
				this.doc.body.innerHTML = "";
				this.setupVLC(this.doc.body, null, [['Default', m[1]]]);
				return;
			}
			//else if() // a more obfuscated variant
		}
	}

	else if(/youporn\.com/.test(page_url))
	{
		var scripts = this.doc.querySelectorAll("script");
		for(i=scripts.length-1;i>=0;i--)
		{
			var m = scripts[i].innerHTML.match(/video\.src\s*=\s*'(.*?)'/);
			if(m)
			{
				video = this.doc.querySelector('#videoWrapper');
				video.style.height = "480px";
				this.containerHeight = video.clientHeight;
				video.id = "videoWrapper1";
				//video.style.height = "auto";
				video.innerHTML = "";
				thumb = this.doc.querySelector('#galleria a:first-child');
				this.setupVLC(video, thumb ? thumb.href : undefined, [['Default', m[1]]]);
				return;
			}
		}
	}

	else if(/xhamster\.com/.test(page_url))
	{
		vars = unsafeWindow['flashvars'];
		if(vars.srv != '')
			url = vars.srv + '/key=' + vars.file;
		else
			url = unescape(vars.file);

		video = this.doc.querySelector('#playerSwf');
		this.containerHeight = video.clientHeight;
		video.style.overflow = 'hidden';
		video.innerHTML = "";
		this.setupVLC(video, vars.image, [['Default', url]]);
		return;
	}

	//Just supporting mobile links for now. Can't get librtmp to work :P
	else if(/twitch\.tv\/\w+/.test(page_url))
	{
		that = this;
		function twitch_it(player) {
			//removeChildren(player);
			if(player.id != "vlc-player") {
				player.id = "vlc-player";
				player.innerHTML = "";
			}

			channel = that.win.location.href.match(/twitch\.tv\/(\w+)/)[1];
			//METADATA_URL = "http://www.justin.tv/meta/"+ PP["channel"] +".xml?on_site=true";
			TOKEN_URL = "https://api.twitch.tv/api/channels/"+ channel +"/access_token";

			function setupTwitch(urls)
			{
				//hardcode height until setPlayerSize is better
				that.containerHeight =  player.clientWidth / (16/9); //'480';
				stats = that.doc.querySelector('#stats_and_actions');
				//live = that.doc.querySelector('#live_player');
				//video.style.height = that.containerHeight + 'px';
				//live.style.height = that.containerHeight + stats.clientHeight + 'px';
				player.style.overflow = 'hidden';
				that.setupVLC(player, null, urls, false, {'ended': function(){twitch_it(player);}});
			}

			function parsePlaylist(pl)
			{
				urls = [];
				console.log(pl);
				tokenized = pl.split('\n');
				for(i=0;i<tokenized.length-1;i++)
				{
					if((m = /#EXT-X-STREAM-INF.*?VIDEO="(\w+)"/.exec(tokenized[i])) &&
						/http/i.test(tokenized[i+1]))
					{
						urls.push([m[1], tokenized[i+1]]);
					}
				}
				console.log('twitch urls', urls);
				setupTwitch(urls);
			}

			getXML(TOKEN_URL, function(r){
				j = JSON.parse(r);
				//TWITCH_HLS_PLAYLIST = "http://usher.twitch.tv/api/channel/hls/"+ channel +
				//	".m3u8?allow_source=true&token="+ j.token +"&sig=" + j.sig;
				TWITCH_HLS_PLAYLIST = "http://usher.twitch.tv/select/"+ channel +
					".json?allow_source=true&nauth="+ j.token +"&nauthsig=" + j.sig;
				console.log(TWITCH_HLS_PLAYLIST);
				getXML(TWITCH_HLS_PLAYLIST, parsePlaylist);
			});
		}
		var domObserver;
		function DOMevent(mutations)
		{
			mutations.forEach(function(mutation) {
				//console.log(mutation.type, mutation.target.id);
				/*if(mutation.target.id == 'twitch_chat')
					removeChildren(mutation.target);
				else*/ if(mutation.target.id == 'player') {
					//FIXME set to null to bypass setupVLC check
					that.myvlc = null;
					//domObserver.disconnect();
					twitch_it(mutation.target);
				}
			});
		}
		domObserver = new MutationObserver(DOMevent);
		domObserver.observe(document, {subtree:true, childList:true});

		return;
	}

	else if(/vk\.com\/video_ext\.php/.test(page_url))
	{
		vars = window.wrappedJSObject.vars || unsafeWindow.vars;
		if(vars)
		{
			urls = [];
			for(i in vars)
				if(/url\d+/.test(i))
					urls.push([i, vars[i]]);
			if(urls.length)
			{
				document.body.innerHTML = "";
				this.setupVLC(document.body, vars.jpg, urls);
			}
		}
	}
	else if(/mp4upload\.com/.test(page_url))
	{
		var scripts = this.doc.querySelectorAll("script");
		for(sc=0;sc<scripts.length;sc++)
		{
			m = scripts[sc].innerHTML.match(/file\s*:\s*['"](.*?)['"]/);
			if(m) {
				this.doc.body.innerHTML = "";
				this.setupVLC(this.doc.body, null, [['Default', m[1]]]);
				return;
			}
		}
	}
	
	/*else if(/drive\.google\.com/.test(page_url))
	{
		var domObserver;
		function DOMevent(mutations)
		{
			mutations.forEach(function(mutation) {
				console.log('google', mutation.type, mutation.target.id);
				//console.log(document.querySelector('div.drive-viewer-carousel'));
				//tps = mutation.target.querySelectorAll('div.drive-viewer-toolstrip-metadata div.drive-viewer-toolstrip-name');
				//if(tps.length)console.log(tps);
				//div = mutation.target.querySelector('div.drive-viewer-unknown-no-preview-msg');
				//Array.prototype.forEach.call(mutation.target.childNodes, function(e) {

				//}

				//document.querySelector('a span[title="clip.flac"]').parentNode
				//document.querySelector('div.drive-viewer-toolstrip-metadata div.drive-viewer-toolstrip-name')
				//https:/\docs.google.com\/uc?authuser=0&id=IDIDIDID&export=download ;//&revid=IDIDIDID
			});
		}
		//domObserver = new MutationObserver(DOMevent);
		//domObserver.observe(document, {subtree:true, childList:true});
	}*/
};// parsePage


loadPlayer(window, false);

