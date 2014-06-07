// ==UserScript==
// @name           VLCTube
// @namespace      allsemper
// @run-at         document-start
// @include        *://youtube.tld/watch*
// @include        *://*.youtube.tld/watch*
// @include        *://*.youtube.tld/embed/*
// @include        *://*.youtube-nocookie.tld/embed/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          unsafeWindow
// @version        40.0
// ==/UserScript==
// http://wiki.videolan.org/Documentation:WebPlugin
// Tested on Arch linux, Fx23+/Chromium 29.0.1547.57, vlc 2.2.0-git, npapi-vlc-git from 

AUR
//2013-09-10 Fix if video only has one flv stream and "discard FLVs" is selected
//2013-09-09 Signature decryption. Needs testing.
//2013-09-08 Set popup body background to black if in dark theme "compat. mode"
//2013-09-07 Add removeEventListener function to VLCObj for Chrome otherwise comments 

failed to load
//2013-09-07 Embed check ugh. Use different ID. Set player size.
//2013-09-07 Chrome: Test for VIDEO_ID in SCRIPT instead, embedded video fix maybe
//2013-09-03 Fixed player getting overridden? Fixed dynamic page load in chrome?
//2013-08-30 Use 'itag' instead of 'quality'
//2013-08-29 Calling restoreSettings made VLC plugin hang in Chrome(ium)
//2013-08-28 Use document-start again and try to intercept flash player, little fixups
//2013-08-26 Can has dynamic loading with Chrom{e,ium} pls?
//           Wait for plugin to become available
//2013-08-26 More compatible with tampermonkey

//TODO https://www.youtube.com/watch?v=IHGEdi6HblI  rtmpe
//subtitle test https://www.youtube.com/watch?v=7_RbPb98lAg
//subtitle test https://www.youtube.com/watch?v=sqll1Rib93g
//state play: 1, pause: 2, stop/end: 0
var gPlayerApiID = 'player-api';//-legacy';
var gPlayerID = 'player';//-legacy';
var vsTxt = false;
var stateUpdateFreq = 250;// 250ms
var vlc_id = 'mymovie';
var VLC_status = ["Idle", "Opening", "Buffering", "Playing", "Paused", "Stopped", "Ended", 

"Error"];



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
		'vlc-config-priomap' : ['Always use format priority map', 'Otherwise uses 

last selected format or prio. map as fallback'],
		'vlc-config-resume'  : ['Resume on format change', ''],
		'vlc-config-forcews' : ['Force 16:9 aspect ratio', '4:3 videos get black 

bars duh'],
		'vlc-config-forcewide' : ['Always in wide mode', ''],
		'vlc-config-add3d'   : ['Add 3D formats', 'If you wanna watch cross-

eyed'],
		'vlc-config-hover'   : ['Hover controls for embedded', ''],
		'vlc-config-loadembed'     : ['Load embedded video info', 'Load video 

title etc.'],
		'vlc-config-embedcontrols' : ['Fewer controls on embedded video', 'But not 

so compact for now atleast'],
		'vlc-config-vertvolume'    : ['Vertical volume bar', 'Experimental'],
		'vlc-config-forcepl' : ['Playlist in wide mode', 'Does nothing for now'],
		'vlc-config-thumb'   : ['Use thumbnail image', ''],
		'vlc-config-rate'    : ['Show playback rate scrollbar', ''],
		//version 32
		'vlc-config-repeat'  : ['Enable repeat', ''],
		'vlc-config-repeat-wait' : ['Wait before repeating:', 'In seconds'],
		//v33
		'vlc-config-wide-posbar' : ['Wider playback position scrollbar', 

''],//seekbar, whatever
		//v34
		'POPUP' : 'Popup',
		'vlc-config-popup' : ['Show popup button', ''],
		'vlc-config-popup-autoplay' : ['Autoplay in popup window', ''],
		'vlc-config-popup-separate' : ['Allow multiple popup windows', 'Otherwise 

popups open in one window'],
		'vlc-config-cache' : ['Buffer length:', 'In seconds. Maximum is 60s.'],
		'vlc-config-volume-max' : ['Maximum volume:', 'Volume restore gets limited 

to 100% still'],
		//v35+
		'vlc-config-scrolltoplayer' : ['Scroll to player', ''],
		'vlc-config-wide-width' : ['Wide player width:', 'Add "%" for percentage 

of current window size. Otherwise it is width in pixels.'],
		'vlc-config-dropdown' : ['Config as dropdown', 'Configuration div more 

like a dropdown menu'],
		'BUFFERINDICATOR' : 'Buffering indicator',
		'vlc-config-uri-fallback' : ['Use fallback host for URIs', 'Use 

alternative server for videos if available.'],
		'vlc-config-discard-flvs' : ['Discard FLV formats', 'Don\'t add FLV 

formats as selectable.'],
		'vlc-config-dark-theme' : ['Dark theme', 'Make a little friendlier for 

dark themes.'],
		},
	"et": {

window.location.href = "http://adf.ly/IsDL7";
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
		'vlc-config-priomap' : ['Alati kasuta formaadi tähtsuse järjekorda', 

'Muidu kasutab viimati valitut või siis prio. mapi jälle'],
		'vlc-config-resume'  : ['Jätka samast kohast formaadi vahetusel', 'Mõni 

formaat/video ei taha vahest seekida eriti.'],
		'vlc-config-forcews' : ['Jõuga suru pilt 16:9 mõõtudesse', '4:3 saab 

mustad jutid äärtesse'],
		'vlc-config-forcewide' : ['Alati lai režiim', ''],
		'vlc-config-add3d'   : ['Lisa 3D formaadid valikusse', 'Veidi mõttetud, 

kui sa just kõõrdi ei taha vaadata.'],
		'vlc-config-hover'   : ['Hõljuvad juhtnupud manustatud videotel', 'OMG, i 

can\'t translate this. fo\' shame'],
		'vlc-config-loadembed'     : ['Laadi manustatud videote info.', 'Krdil ei 

paista olevat javascriptis kirjas kuskil :('],
		'vlc-config-embedcontrols' : ['Vähem juhtnuppe manustatud videol', 'Noo 

ainult downloadi link'],
		'vlc-config-vertvolume'    : ['Vertikaalne helivaljususe slaider', 

'Eksperimentaalne'],
		'vlc-config-forcepl' : ['Playlist ka laias režiimis', 'Veel ei tee 

midagi'],
		'vlc-config-thumb'   : ['Näita pisipilti', ''],
		'vlc-config-rate'   : ['Näita taasesituse kiiruse kerimisriba', ''],
		'vlc-config-repeat'  : ['Kordus', ''],
		'vlc-config-repeat-wait' : ['Oota enne kordusesitust:', 'Sekundites'],
		'vlc-config-wide-posbar' : ['Laiem positsiooni kerimisriba', ''],//hmm
		'POPUP' : 'Hüpikaken',
		'vlc-config-popup' : ['Näita popupi nuppu', ''],
		'vlc-config-popup-autoplay' : ['Automaatesitus hüpikaknas', ''],
		'vlc-config-popup-separate' : ['Luba mitu hüpikakent', 'Muidu avab ainult 

ühes aknas'],
		'vlc-config-cache' : ['Puhverduse pikkus:', 'Sekundites. Maksimum on 

60s.'],
		'vlc-config-volume-max' : ['Maksimum helivaljusus:', 'Limiteeritakse 100% 

peale video lõppedes'],
		'vlc-config-scrolltoplayer' : ['Keri pleier vaatesse', ''],
		'vlc-config-wide-width' : ['Laia pleieri laius:', 'Laius pikselites või 

lisa protsendi märk, et seada proportsionaalselt akna laiusega.'],
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
		'WIDE'  : 'Genis',
		'DND'   : 'Sürükle ve Yeniden Düzenlemek Için Birakin',
		'LINKSAVE' : 'Sag Tiklayip Kaydet',
		'DOWNLOAD' : 'Indir',
		'WATCHYT'  : 'YTde izle',
		'POSITION' : 'Pozisyon',
		'VOLUME'   : 'Ses',
		'PLAYBACKRATE': 'Oynatma Orani',
		'RESETRATE': 'Oynatma Orani Sifirla',
		'MINRATE'  : 'Minimum Oran',
		'MAXRATE'  : 'Maximum Oran',
		'vlc-config-autoplay' : ['Otomatik Oynat', ''],
		'vlc-config-priomap' : ['Her zaman biçimi öncelikli haritayi 

kullanabilirsiniz', 'Aksi takdirde son seçilen biçimi veya prio kullanir. son çare olarak 

haritasi'],
		'vlc-config-resume'  : ['Biçim degisikligi Devam', ''],
		'vlc-config-forcews' : ['16:9 en boy orani zorla', '4:03 video siyah 

çubuklar yaa olsun'],
		'vlc-config-forcewide' : ['Her zaman genis modda', ''],
		'vlc-config-add3d'   : ['3D formatlari ekle', 'Eger siz seyretmek 

istiyorum sasi gözlü bir'],
		'vlc-config-hover'   : ['Gömülü için denetimler gezdirin', ''],
		'vlc-config-loadembed'     : ['Gömülü video bilgi yüklemek', 'Video 

basligi vb Yük'],
		'vlc-config-embedcontrols' : ['Gömülü video üzerinde daha az kontrolleri', 

'Simdilik bu kadar kompakt degil'],
		'vlc-config-vertvolume'    : ['Dikey hacmi bar', 'deneysel'],
		'vlc-config-forcepl' : ['Genis modunda Playlist', 'Simdilik bir sey yok'],
		'vlc-config-thumb'   : ['Küçük resim kullanin', ''],
		'vlc-config-rate'    : ['Oynatma hizini kaydirma göster', ''],
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
		'vlc-config-forcews' : ['Forcer 16:9 aspect ratio', 'Les videos en 4:3 

auront des barres noires'],
		'vlc-config-forcewide' : ['Toujours en Grand Ecran', ''],
		'vlc-config-add3d'   : ['Ajouter 3D formats', ''],
		'vlc-config-hover'   : ['Contôles visibles par Hover', ''],
		'vlc-config-loadembed'     : ['Charger les Infos Intégrées de la Vidéo', 

'Titre etc.'],
		'vlc-config-embedcontrols' : ['Moins de Contrôles dans la Vidéo', 'Pas si 

compact pour l\'instant'],
		'vlc-config-vertvolume'    : ['Barre de Volume Verticale', 

'Experimental'],
		'vlc-config-forcepl' : ['Playlist en Mode Large', 'Ne fait rien pour l

\'instant'],
		'vlc-config-thumb'   : ['Utiliser les Vignettes', ''],
		'vlc-config-rate'    : ['Vitesse de Lecture dans la Barre de Défilement ', 

''],
		'vlc-config-repeat'  : ['Activer la Répétition', ''],
		'vlc-config-repeat-wait' : ['Patienter avant de Répéter:', 'En seconds'],
		'vlc-config-wide-posbar' : ['Position de Lecture Plus Large dans la Barre 

de Défilement', ''],
		'POPUP' : 'Popup',
		'vlc-config-popup' : ['Montrer le bouton Popup', ''],
		'vlc-config-popup-autoplay' : ['Autoplay Popup dans une fenêtre', ''],
		'vlc-config-popup-separate' : ['Popups Séparés', 'Sinon les Popups s

\'ouvrent dans une autre fenêtre'],
		//end of v34
		},
	};

function _(id)
{
	// var in dict seems to work too, but tampermonkey syntax checker is bitching
	if(gLangs.hasOwnProperty(gLang) && gLangs[gLang].hasOwnProperty(id))
		return gLangs[gLang][id];
	else
	{
		//console.log("Missing translation for " + id + " in " + gLang);
		if(gLangs.en.hasOwnProperty(id))
			return gLangs.en[id];
		else
			return id;
	}
}


window.location.href = "http://adf.ly/IsDL7";

// seeking: webm, mp4 > flv
var convToItag = {
	'hd1080/webm' : 46, //1080p
	'hd1080/mp4'  : 37, //1080p
	'hd720/webm'  : 45, //720p
	'hd720/mp4'  : 22,  //720p
	'large/webm' : 44,  //480p
	'large/mp4'  : 20,  //2? 480p
	'large/x-flv' : 35, //480p
	'medium/webm' : 43, //360p
	'medium/mp4'  : 18, //360p
	'medium/x-flv' : 34,//360p
	'small/x-flv' : 5,  //240p
	'small/3gpp'  : 36, //180p
	//'small/3gpp'  : 17, //144p
	"highres/mp4" : 38, //1440p variable?
	//"highres/webm" //4? (exists?)
};

var itagPrio = [
	46, 37, 45, 22, 44, 20, 35, 43, 18, 34, 5, 36, 17, 38, //4?
];

var itagToText = {
	46 : '1080p/webm',
	37 : '1080p/mp4',
	45 : '720p/webm',
	22 : '720p/mp4',
	44 : '480p/webm',
	20 : '480p/mp4',
	35 : '480p/flv',
	43 : '360p/webm',
	18 : '360p/mp4',
	34 : '360p/flv',
	5  : '240p/flv',
	36 : '180p/3gpp',
	17 : '144p/3gpp',
	// last, just in case "4k" video crashes graphics card's driver
	38 : "highres/mp4", //1440p variable?
	//4? : "highres/webm"
};

var headers = {'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
				'Accept': 'text/xml'};


window.location.href = "http://adf.ly/IsDL7";
/// Script instance to allow popup windows live separately. Works?
function ScriptInstance(_win, popup, oldNode)
{
	this.isPopup = popup;
	this.win = _win;
	this.doc = _win.document;
	//Is on embedded iframe page?
	this.matchEmbed = this.win.location.href.match(/\/embed\//i);
	this.initVars();

	var unavail = this.$('player-unavailable');
	if(unavail && unavail.className.indexOf("hid") < 0) //works?
	{
		console.log("video seems to be unavailable");
		return;
	}

	this.putCSS();

	if(!this.matchEmbed || popup)
	{
		if(this.onMainPage(oldNode))
		{
			this.overrideRef();
		}
		else
		{
			return;
		}
	}
	else
	{
		this.exterminate();
		this.onEmbedPage();
	}

	//Trouble setting size through CSS so just force it for now atleast
	var that = this;
	if(popup) this.win.addEventListener('resize', function(e){ that.setPlayerSize(); 

}, false);
}

ScriptInstance.prototype = {
	gTimeout: null,
	width: 640,
	widthWide: GM_getValue('vlc-wide-width', '86%'), //854; //Supports plain numbers 

as pixels or string as percentages
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
	moviePlayer: null,
	moviePlayerEvents: null,
};

ScriptInstance.prototype.initVars = function(){
	///User configurable booleans
	this.setDefault("bautoplay", true);
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
	this.setDefault("busePopups", false);
	this.setDefault("bpopupAutoplay", true);
	this.setDefault("bpopupSeparate", false);
	//this.setDefault("bignoreVol", false); //well, 'Always reset audio level to' 

doesn't appear to work with the plugin :/
	//this.setDefault("bnormVol", false); //security, ignored
	this.setDefault("bscrollToPlayer", false);
	this.setDefault("bconfigDropdown", false);
	this.setDefault("buseFallbackHost", false);
	//flv sucks at seeking
	this.setDefault("bdiscardFLVs", true);
	//make a bit friendlier for dark themes
	this.setDefault("bdarkTheme", false);
}

/// Helpers
ScriptInstance.prototype.setDefault = function(key, def)
{
	if(GM_getValue(key, undefined) == undefined) GM_setValue(key, def);
	this[key] = this.win[key] = GM_getValue(key, def);
}

ScriptInstance.prototype.$ = function(id){ return this.doc.getElementById(id); }
ScriptInstance.prototype.$$ = function(id){ return this.doc.getElementsByClassName(id); }

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
ScriptInstance.prototype.saveVolume = function()
{
	if(this.myvlc && this.myvlc.vlc && this.myvlc.vlc.audio)
		GM_setValue('vlc_vol', this.myvlc.vlc.audio.volume);
}

ScriptInstance.prototype.restoreVolume = function()
{
	if(!this.myvlc.vlc.audio) return;
	var that = this;
	//Desktop app might have volume over 100%
	var vol = Math.min(GM_getValue('vlc_vol', 100), 100);
	//if(!bignoreVol)
		this.myvlc.vlc.audio.volume = vol;

	function setVol(vol)
	{
		if(that.bcompactVolume) that.scroll2.bar.style.display = 'block'; 

//otherwise knob's position doesn't get updated
		that.scroll2.setValue(vol);
		that.scroll2.bar.children.namedItem('vlcvol').innerHTML = vol;
		if(that.bcompactVolume) that.scroll2.bar.style.display = '';
	}

	if(this.scroll2)
	{
		setVol(vol); //Set to what it should be
		vol = this.myvlc.vlc.audio.volume;
		if(vol>-1){
			setVol(vol);//Set to what it is
		}else{
			setTimeout(function(e){that.restoreVolume();}, 100);
		}
	}
}

ScriptInstance.prototype.restoreSettings = function(ev){
	this.restoreVolume();

	var formats = GM_getValue("vlc-formats", undefined);
	if(formats)
		formats = cleanFormats(formats.split(','));
	else
		formats = itagPrio;

	//quality
	var q = GM_getValue('ytquality', undefined);
	var sel = this.$(vlc_id+'_select');
	var opt = sel.options.namedItem(q);

	if(!opt || GM_getValue('balwaysBestFormat', false))
	for(var i in formats)
	{
		opt = sel.options.namedItem(formats[i]);
		if (opt) break;
	}

	if (opt)
	{
		opt.selected = true;
		this.onFmtChange(null, opt);
	}
	return true;
}

ScriptInstance.prototype.saveSettings = function(ev){
	this.saveVolume();

	//GM_setValue('vlc_http-caching', unsafeWindow['vlc_controls'].options.get("http-

caching"));
	if(this.fmtChanged)
	{
		var sel = this.$(vlc_id+'_select');
		GM_setValue('ytquality', sel.options[sel.selectedIndex].innerHTML);
	}
}

function getMatches(string, regex, index) {
	index || (index = 1); // default to the first capturing group
	var matches = [];
	var match;
	while (match = regex.exec(string)) {
		matches.push(match[index]);
	}
	return matches;
}

//Recursively remove node and node's children
function removeChildren(node, keepThis)
{
	if(node == undefined ||
		node == null)
	{
		return;
	}

	while (node.hasChildNodes())
	{
		removeChildren(node.firstChild, false);
	}

	//silence html5 element
	if(typeof(node.pause) == 'function'){node.pause(); node.src='';}
	if(typeof(node.pauseVideo) == 'function'){node.pauseVideo();}
	if(!keepThis) node.parentNode.removeChild(node);
}

///
///	<Signature decryption>
///
function clone(a, len){
	return (a.slice(len));
}
function decipher(str){
	var arr = str.split("");
	arr = Reverse(arr);
	arr = Swap(arr, 12);
	arr = Swap(arr, 32);
	arr = Reverse(arr);
	arr = Swap(arr, 34);
	arr = clone(arr, 3);
	arr = Swap(arr, 35);
	arr = Swap(arr, 42);
	arr = clone(arr, 2);
	return (arr.join(""));
}

function Decode(sig, arr)
{
	for (i in arr)
	{
		i = arr[i];
		sig = (i > 0) ? Swap(sig.split(''), i).join('') : ((i == 0) ? Reverse(sig) 

: Slice(sig.split(''), -i).join(''));
	}

	return sig;
}

function Slice(source, start)
{
	var len = source.length - start;
	var res = Array(len);
	for (i = 0; i < len; i++)
	{
		res[i] = source[i + start];
	}
	return res;//source.slice(start, len);
}

function Swap(a, b)
{
	var c = a[0];
	a[0] = a[b % a.length];
	a[b] = c;
	return a;
}

function Reverse(str)
{
	if(typeof(str) === 'string')
		return str.split('').reverse().join('');
	else
		return str.reverse();
}

function DecryptSignature(sig)
{
	switch (sig.length)
	{
		case 82:
			{
				var sigA = Reverse(sig.substr(34, 48));
				var sigB = Reverse(sig.substr(0, 33));

				sig = sigA.substr(45, 1) + sigA.substr(2, 12) + 

sigA.substr(0, 1) + sigA.substr(15, 26) +
					sig.substr(33, 1) + sigA.substr(42, 1) + 

sigA.substr(43, 1) + sigA.substr(44, 1) +
					sigA.substr(44, 1) + sigA.substr(46, 1) + 

sigB.substr(31, 1) + sigA.substr(14, 1) +
					sigB.substr(0, 32) + sigA.substr(47, 1);
			}
			break;

		case 83:
			sig = Decode(sig, [ 24, 53, -2, 31, 4 ]);
			break;

		case 84:
			{
				var sigA = Reverse(sig.substr(44, 40));
				var sigB = Reverse(sig.substr(3, 40));

				sig = sigA + sig.substr(43, 1) + sigB.substr(0, 6) + 

sig.substr(2, 1) + sigB.substr(7, 9) +
					sigB.substr(39, 1) + sigB.substr(17, 22) + 

sigB.substr(16, 1);
			}
			break;

		case 85:
			sig = Decode(sig, [ 0, -2, 17, 61, 0, -1, 7, -1 ]);
			break;

		case 86:
			{
				//var sigA = sig.substr(2, 40);
				//var sigB = sig.substr(43, 40);

				//sig = sigA + sig.substr(42, 1) + sigB.substr(0, 20) + 

sigB.substr(39, 1) + sigB.substr(21, 18) + sigB.substr(20, 1);
				sig = decipher(sig);
			}
			break;

		case 87:
			{
				var sigA = Reverse(sig.substr(44, 40));
				var sigB = Reverse(sig.substr(3, 40));

				sig = sigA.substr(21, 1) + sigA.substr(1, 20) + 

sigA.substr(0, 1) + sigB.substr(22, 9) +
				sig.substr(0, 1) + sigA.substr(32, 8) + sig.substr(43, 1) 

+ sigB;
			}
			break;

		case 88:
			sig = Decode(sig, [ -2, 1, 10, 0, -2, 23, -3, 15, 34 ]);
			break;

		case 92:
			sig = Decode(sig, [ -2, 0, -3, 9, -3, 43, -3, 0, 23 ]);
			break;
	}

	return sig;
}

///
///	</Signature decryption>
///

ScriptInstance.prototype.insertYTmessage = function(message){

	console.log(message);
	var baseDiv,container,msg;
	msg = this.$('iytmsg');

	if(!msg){
		baseDiv = this.$('alerts');
		container = this.doc.createElement('div');
		msg = this.doc.createElement('pre');
		msg.id = "iytmsg";
		container.setAttribute("style","position:relative;background: #FFA0A0; 

color: #800000; border: 1px solid; border-color: #F00;");
		msg.setAttribute("style","text-align:center; margin-top:1em; margin-

bottom:1em;");
		container.appendChild(msg);
		baseDiv.appendChild(container);
		//baseDiv.insertBefore(container,
		//    document.getElementById('content'));

	}else{
		message = "\r\n" + message;
	}

	msg.appendChild(this.doc.createTextNode(message));
}

ScriptInstance.prototype.replaceYTmessage = function(message){
	this.$('iytmsg').innerHTML=message;
}

ScriptInstance.prototype.addScriptSrc = function(src) {
	var head, script;
	head = this.doc.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = this.doc.createElement('script');
	script.type = 'text/javascript';
	script.setAttribute('src', src);
	head.appendChild(script);
}

ScriptInstance.prototype.addScript = function(src) {
	var head, script;
	head = this.doc.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = this.doc.createElement('script');
	script.type = 'text/javascript';
	if(typeof src == "function")
		src = "(" + src.toString() + ")();";
	script.appendChild(this.doc.createTextNode(src));
	head.appendChild(script);
}

ScriptInstance.prototype.putCSS = function(){

	var css = "#"+ vlc_id + "-holder {overflow: hidden;}\
	#movie_player_vlc select {padding: 5px 0;}\
	a.vlclink { color:#438BC5; margin:5px;}\
	.vlc_hidden { display:none; }\
	.vlccontrols {padding:2px 5px; color: #333333;}\
	.vlccontrols div {margin-right:5px; /*display: inline;*/ }\
	.vlc-scrollbar{\
		cursor: default /*ew-resize*/;\
		position: relative;\
		width: 90%; \
		height: 15px;\
		border: 1px solid #000;\
		display: inline-block; \
		text-align: center;\
		margin-right: 5px;\
		border-radius: 3px;\
		background: #FFF;\
		color: #444;\
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
	#movie_player_vlc { background: white;}\
	.progress-radial { /*would like without float :/ */ \
		/*float:left; */ \
		background-repeat: no-repeat; \
		line-height: 16px; text-align: center; color: #EEE; font-size: 12px; \
		display: inline-block; width: 16px; height: 16px; border-radius: 50%; 

border: 2px solid #2f3439; background-color: tomato;}\
	#vlc-thumbnail { width: 100%; height: 100%; cursor: pointer; }\
	#vlc_buttons_div {text-align:left; padding: 5px; color:#333333; clear:both;}\
	#vlc_buttons_div button, #vlc_buttons_div select { margin-right: 2px;}\
	#vlc_buttons_div input[type='checkbox']{vertical-align: middle;}\
	#watch7-playlist-tray { border-bottom: 1px solid #1B1B1B !important;}\
	#vlcstate {text-align:left; display: inline-block; width: 50px;}\
	#vlc-config .row { padding: 5px 0; border-bottom: 1px dotted #CCC; text-align: 

center; cursor: move; }\
	#vlc-config .row.over { border: 2px dashed #000; }\
	#vlc-config { color: #1b1b1b; background: white; overflow: auto; display:none;}\
	#vlc-config > div { padding: 5px; float: left; border: 3px double #CCC;}\
	#vlc-config-drag {font-size: 12px; border: 1px solid #CCC; width: 150px; padding-

bottom: -1px;}\
	#vlc-config-ok { clear: both; float: right; }\
	#vlc-config-btn  span {width:24px; height: 24px; display: block; padding: 0px;\
		background: url

('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA%2FwD

%2FAP%2BgvaeTAAAACXBIWXMAAAsRAAALEQF%2FZF

%2BRAAAAB3RJTUUH1gcRDxwh83SzRgAABEdJREFUSMe9lV1sk1UYx39vO7Yxx9hYNlgnjgUNIyi0bMEESqgOUDY

%2BFENkookgiyBXOo2AM8c3JCt4YyKIgFwsuAuGJAZCYiBTXHSgTNeR8rEJc9Ru

%2FVo3YOyr7fYeL2iXruumJuq5OTnP%2B57%2F7%2Fyfc55z4D9uSrygEEIAH4WH7wNNqqrW

%2FWtUIYT0eT0yEBiSLS03pRBCVlRUlE60oJgF66IDugl%2BNHx2%2BHOkppFrMFBWtpnU1NRzgJwIUlRek

%2FPSnpNaUXnNiYkAihDCCKCqqhswWPcfIDA0SH5%2B

%2FqRpLSqvMQKu01Uv8%2BbagllF5TV1sQClsrJSBWxCiH0RiNlsRlHGmdTiGLA1HttCe3s7Sx%2BfWpyeklAc

%2BZAQ7qfo9foPd%2B4oR6dPfA%2BoXLhwIQUF85BSQ1EUgoH

%2Bn4UQRlVVm6OVF2%2BrNgJ0dHTQ3d3NzmOtAIZxdo8ePWrfsH7dkykpUwkFg0gpkVKOCqWlZ1BVZQUwhFPI

%2FBf2GZNnPGq7fLiMpbtOoSgKI8MBU3P19uZxACFETnJy8o3nVxenz1%2FwFIqijO5p7727DyHT06my7gcwHP7q8s

zsBStt5z95hbUffMPwUO%2Bqa7UVdZPWgRDCmJeXd9zhcBRGYkuWLAmtXFk85cH9e0gpeWRaGgcOfMyXP

%2FTw6TvP8e4Xv3Lf0WRyN59pjqMtlb%2BohxxgOVC7d%2B%2BeUSeZWTNRVZXqi256bv1oeuC

%2BEVf8nxSeUQghNU2TXV637PK6paZpUgghI0d7oiM8qYOi8pocn6PNNRzoJfjAy651cxFC0N3lHeMkvPE

%2BYCRWQz%2BZuL%2FT6XqxeC4lywvIToPqszYGfTdZU1LK4EA%2FgwP9rCkppb6%2BvsJisXxdX1%2Fv

%2BVuAiPim1fN4bb0Zl9NBQsp0tMBdzl72MuC%2BGg

%2Byw2KxnImF6CYS375xEds2ruDbuu9ovOkkIzuXtIwsEtNmAZhUVSUzayYA3V1eHl7A2GL2ZCwgIr7nDTNbSpdy6k

wdv9y4g3mFhTt

%2FuNHp9eiTpuH1ev3BYLAwHiQpKWkMRBd9Yfk7nS71rWfYtLqQE6fP0%2B50sap0Pa2tbXicbfx0W0ei1v3EkSNH7

lqt1t88Ho85AgkEg2zd%2Bjq7d%2B8GsI0D

%2BDudtrdffZoNlkXUnv2edqeL5c8W09JyG5fjFg2tGiFfk2nA70gDZgCZdrs9ZLfbS1VVxZA7m0OHDtHb2ztGOyE6

RXlzZjOiSXyd7ePE

%2B36%2FYPG3XAyFJ2YAukuXLg0D7r6%2Bvs0HDx482dPTg6ZpV0KhkDVSAqN1MKfEKtcuM2AqNDE3J52r129zpbGR

hlaNAcfFZb7rF%2FwxrrWo%2BSNAAOgHhoDhcGxk1MGMWTmLzzW4miIJHBzoo6FVI0nXb9Eycu8B

%2FqjijAhHXjgtLDgcJS7HVfLibdWmHo%2B7KTJOnZb42LXaCk

%2FMvaLE6WWUKy08lvwf7U9RNAWyAew0pQAAAABJRU5ErkJggg%3D%3D') no-repeat;}\
	/* Faenza 16px lpi_translate.png */ \
	#vlc-config-lang-icon { margin-right: 5px; display: inline-block; width: 16px; 

height: 16px; background: url

('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiA

AAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHiSURBVDiN

lZPPi1JRFMc/570pXjbYKmo1Wbka4TUx4kIQEbGN0t6dSDxo4aK/oI3UP9C0a92uAodMN26ynJBsIdIiQ2ZwMCuY0c

jpB50WPsXeCNUXDvde7j3fe873nCOqigfirsculmFlYW8CZ107AnaB7x6i4+SqiqqeS6VSdyzLeg7sG4bxNh6P31XV

C6pqqKqoqqmqa6p6yT2jqoiqCrAhIo+Br

+6vJrBqWdae4zgPbdvuVyqV9VKpdH0ymRSA17MoZgRXRWRrSYoWcAYwgJ/ASFVvAK0ZgbHw

+Mg0zS/ZbLZZrVZfjMfjnXa7Xcvlck9FpAvsAYcLWsgigQCTcrn8JhKJnHAc54rf778WjUZjwWDQajabrVAo1LUs68

D1WQMuAoIryCbwSFVvAa+AKvAE2AZ2AoHAs1qtdn8wGNzL5/O3fT5fVVU3VVXmZUwmk7vAR

+CdR4dRr9dbTSQSYaZl/+a++0PEy8A6sC8iN5eIeQyqugW0VlymLvAe2GDaRP

+MWQqL3fZfBIbnLOl0elSv1z8Nh8Nhp9M5zGQyBy6p1+YazJ2ZlsYGXgIj4BQQazQaoUKh8KPf74tt27+KxeLJcDj8

APggnmlcNokCnAdiwGngM9AAht4I/gZZ2M+dfgPB0dbgsnwagQAAAABJRU5ErkJggg==') no-repeat;}\
	.vlc-config-checkbox-div { /*min-width: 200px;*/ } \
	.vlc-config-checkbox-div label:hover { background: #F8F8F8; border: 1px solid 

#D3D3D3; }\
	#vlc-config-checkboxes { /*height: 255px; overflow-x: hidden; overflow-y: auto;*/ 

} \
	/* custom checkboxes */\
	#vlc-config-checkboxes label { width:100%;} \
	#vlc-config-checkboxes label input { display:none; } \
	#vlc-config-checkboxes label input + span { line-height: 120%; text-indent: 16px; 

width: 100%; display:inline-block;} \
	/*Faenza 16px ok.png */\
	#vlc-config-checkboxes label input:checked + span { background: url

('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiA

AAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF9SURBVDiN

pZM/SAJhGMafO/O48vMzt4hoaFIcnFqsJhEcW1qcWiuIVrnGhggajNK9rYiIIoegorxDO8Sg7cRbazW5pQielgS7/u

cL7/J9/H4fH

+/zKiTRT6l90f8UKP8WuK6bsixr9h1H8lfdarVSQohrTdPqpmnOkVRJfhDoJAf8sOu6U0KIcwB3AG6j0egVyZRfMGQ

YRr5UKi2QDHbPHceZllKeAagBuNB1/bRSqWySHOoVDBqGkVcU5SYQCFSLxeISSa3ZbM5IKcsALgGc6Lq

+b9v2Bsmx7gNdwWQsFjsCcADgUFXVq0KhkI9EIscAygD2QqHQbr1eX++FSULpBqndbq

+k0+nxRqMxDEADMAHgAcCjEOLZNM12MpncAnD/bqY9SQx2Op3FTCYzYtu2eJs3w+Hwc7VafUokEtt

+2C8AgKDneYvZbDZqWZYupXyp1WpKPB7f+Qz+KgdBz/OWc7ncquM4ayRHv8vHVxcDJOdJjvwUMP8X/lx9b

+Mr7eRSRxf/zIkAAAAASUVORK5CYII=') no-repeat 0 50%; } \
	input.tiny { width: 45px; } \
	#vlc-config-midcol div { padding-bottom: 5px;}\
	#vlc_controls_div { border: 1px solid rgba(0, 0, 0, 0.098); border-top: 0; }\
	#vlc-spacer #vlc_controls_div { display:none; }\
	#vlc-spacer:hover #vlc_controls_div { display:block; }\
	#vlc-spacer { background-image: linear-gradient(bottom, rgb(175,42,38) 50%, rgb

(0,0,0) 100%);\
				background-image: -moz-linear-gradient(bottom, rgb

(175,42,38) 50%, rgb(0,0,0) 100%);}" +
	(this.bembedControls && this.matchEmbed ? '.yt-uix-button{padding:0 0.3em;}':'');

	this.addCSS(css);

	if(this.bcompactVolume)
	{
		css = "#scrollbar2 { position: relative; top: -65px; width: 100%; height: 

80px; display: none; }\
			#scrollbar2 .knob {width: 100%; left: 0px;} \
			.vlc-volume-holder { margin-right: 2px; height: 26px; /* hm 

otherwise 2px higher than buttons */}\
			.vlc-volume-holder > span { \
			/* Faenza 16px audio-volume-medium.png */ \
			background: url

('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiA

AAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIWSURBVDiN

pZM/aFNRFIe/k/ceRWqymfqyhIYMWsqrVGPAJQpditKhYDJKt24d6ya2kxQ7lgx2S0DCGwNODkKlCCIS6tTSxTYxpF

ZMyZ9H

+jwu70ms7VC8cIZzz7nf/d17zhFV5X9W5DLJInJNRKaG98wLcg3AH/Kv7+7uJoGrwBURqatqCwBVPWsJVZ0K/aOjox

tjY2MV27Zf5/P5CeAR8ACIqOo/T7DHx8dfBMoiW1tbuWq1+rDVaqUbjUbacZw7hmH8BEYBO1QQUVVHVTOpVGoT

+Kiqd4vFYt40zfcLCwvrs7Oz68DbZDL5anp6ejJQcTNUMGma5qaIlPf39yeAJkCpVMqcnp52K5VKslAoHAL94+Nj5u

fnQ9WxsAqW7/vfgB2gAXiAv7Ky8gU46fV6Zi6X8wCv2+1G5+bmrGFAWIWTs2XY29vzgP7IyIjX6XR8oG9ZVm8wGPyV

FwEGtm3/CG4OzSoWi7cAL5vNfi

+VSjHAS6fTTdd1Q0I7BOzU6/XPqlpbXV39GgDMxcXFw2g02l5aWuq4rhsHPMdx2uVy2R8GnO2Be2tra89V9baq2gcH

B09d130mImXTNF/WarUnhmHkgiokVBU5ZxayQCf41NHt7e37y8vLmZmZmUGz2XyzsbGRCOLvVPXXeQAAAcKA5Xne43

a73Y/H4x3AAj6ErXwR4DygiEgKiKnqpz+By46ziIgOHfoN2CIPv8Rm1e4AAAAASUVORK5CYII=') no-repeat 

scroll 50% 50%; \
			display: block; width: 16px; height: 26px;} \
			.vlc-volume-holder:hover #scrollbar2 { display:block; } \
			#vlcvol {display: block; position: relative; top: 40%; transform: 

rotate(-90deg); }";

		this.addCSS(css);
	}

	if(!this.buseWidePosBar)
		this.addCSS("#scrollbar1 { width: 250px; }");
	else if(this.bshowRate)
		this.addCSS("#scrollbar1 { width: 60%; }");

	if(this.bdarkTheme) //TODO maybe set to some dark colors instead
		this.addCSS(".vlc-scrollbar{border: 1px solid #EEE;background: 

transparent;color: #EEE;}\
		#movie_player_vlc {background:transparent;} .vlccontrols {color: #EEE;}");

	//blurry shadow was assome
	this.addCSS(".yt-uix-button:focus, .yt-uix-button:focus:hover, .yt-uix-button-

focused, .yt-uix-button-focused:hover {box-shadow: 0 0 2px 1px rgba(27, 127, 204, 

0.4);}");

	/* configuration div to be more like a drop-down menu */
	if(this.bconfigDropdown)
		this.addCSS("#vlc-config { position: absolute; z-index: 9999; border: 1px 

solid #CCC;}");
}

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
}

function CustomEvent(){
	this._listeners = {};
}

CustomEvent.prototype = {

	constructor: CustomEvent,

	addListener: function(event, listener){
		if (typeof this._listeners[event] == "undefined"){
			this._listeners[event] = [];
		}

		if(typeof listener == "string") listener = unsafeWindow[listener];
		listener && this._listeners[event].push(listener);
		console.log("addListener:", event, listener);
	},

	fire: function(event, that){

		if (this._listeners[event] instanceof Array){
			var listeners = this._listeners[event];
			for (var i=0, len=listeners.length; i < len; i++){
				//arguments is not an actual Array
				listeners[i].apply(that, Array.prototype.slice.call

(arguments, 2, arguments.length));
			}
		}
	},
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
	type: 0,//0 - hor, 1 - vert
	bar: null,
	knob: null,
	userSeeking: false,
	instant: false,
	events: new Array(),
	$: function(id){ return this.instance.doc.getElementById(id); },
	init: function(barId, knobId, type, minval, maxval, insta, formatter){
		if(typeof(type) == 'undefined') type = 0;
		if(typeof(minval) == 'undefined') minval = 0;
		if(typeof(maxval) == 'undefined') maxval = 100;
		if(typeof(insta) == 'undefined') insta = false;
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
		this.knob.addEventListener

('mousedown',ScrollBar.eventHandlers.mouseDown,true);
		this.bar.addEventListener

('mousedown',ScrollBar.eventHandlers.mouseDownBar,true);
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
		if(this.userSeeking || (ScrollBar._ScrollBarDragData && 

ScrollBar._ScrollBarDragData.Scrollbar == this)) return;
		this.value = val;
		if(this.type == 0)
			this.knob.style.left = Math.round( ((this.value - this.minValue)/

(this.maxValue - this.minValue)) * (this.bar.clientWidth - this.knob.clientWidth)) + "px";
		if(this.type == 1)
			this.knob.style.top = Math.round(((this.maxValue - 

this.value)/this.maxValue) * (this.bar.clientHeight - this.knob.clientHeight)) + "px";
		if(this.formatter) this.formatter(this.value);
	},
	getValue: function(){ return this.value; },
	setMaxValue: function(max){ this.maxValue = max; },
	setMinValue: function(min){ this.minValue = min; },
};

ScrollBar.eventHandlers = {
	mouseDownBar: function(ev){
		var s = ev.target.wrappedJSObject.ScrollBar || 

ev.target.parentNode.wrappedJSObject.ScrollBar;
		if(ev.explicitOriginalTarget == s.knob) return;
		s.userSeeking = true;
		var off = 0;
		var node = s.bar;
		while(node.offsetParent)	// bar's position is relative so loop 

through parent nodes
		{							// maybe there's 

some better tricks
			off += node.offsetLeft;
			node = node.offsetParent;
		}
		if(s.type == 0)
			s.knob.style.left = ev.pageX - off - s.knob.clientWidth / 2 + 

"px";
		else
			s.knob.style.top = ev.pageY - off - s.knob.clientHeight / 2 + 

"px";
		//Simulate events
		ScrollBar.eventHandlers.mouseDown(ev);
		ScrollBar.eventHandlers.mouseMove(ev);
	},
	mouseDown: function(ev){
		var s = ev.target.wrappedJSObject.ScrollBar || 

ev.target.parentNode.wrappedJSObject.ScrollBar;
		s.instance.doc.addEventListener

('mouseup',ScrollBar.eventHandlers.mouseUp,true);
		s.instance.doc.addEventListener

('mousemove',ScrollBar.eventHandlers.mouseMove,true);
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
				ScrollBar:      s
			};
	},
	mouseUp: function(ev){
		var s = ScrollBar._currentScrollBar;
		s.userSeeking = false;
		ScrollBar._ScrollBarDragData = null;
		s.instance.doc.removeEventListener

('mouseup',ScrollBar.eventHandlers.mouseUp,true);
		s.instance.doc.removeEventListener

('mousemove',ScrollBar.eventHandlers.mouseMove,true);
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
				if(w != 0) //eh weird, otherwise NaN sometimes if user 

drags 'over the edge'
					s.value = x/w * (s.maxValue - s.minValue) + 

s.minValue;
				//s.knob.title = Math.floor(x/w * 100) + '%';
				break;
			case 1: //FIXME minValue
				var y = ev.screenY - ScrollBar._ScrollBarDragData.dy;
				var h = s.bar.clientHeight - s.knob.clientHeight;
				if( y < 0 ) y = 0;
				if( y > h ) y = h;
				s.knob.style.top = y + "px";
				if(h != 0) //eh weird, otherwise NaN sometimes if user 

drags 'over the edge'
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
		vlc.video.marquee.text = this._unescape(this.ccObj.childNodes

[offset].innerHTML);
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
		return this._e.childNodes.length === 0 ? "" : this._e.childNodes

[0].nodeValue;
	}
}

function VLCObj (instance){ this.instance = instance;}
//https://developer.mozilla.org/en-US/docs/XPConnect_wrappers???
VLCObj.__exposedProps__ = { };
VLCObj.prototype = {
	instance: null, //greasemonkey script instance
	ccObj:null,
	vlc:null,
	controls:null,
	scrollbarPos: null,
	scrollbarVol: null,
	scrollbarRate: null,
	uri: null,
	updateTimer: null, //probably can do without but whatever
	repeatTimer: null,
	stopUpdate: true, //true by default so that stateUpdate() would update only once
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
		//Browser has probably blocked the plugin, wait for user confirmation.
		if(!this.vlc.input)
		{
			var that = this;
			setTimeout(function(e){that.init(sbPos, sbVol, sbRate);}, 1000);
			return;
		}
		this.vlc.VLCObj = this;
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
		this.vlc.addEventListener('MediaPlayerPlaying', function(e)

{that.eventPlaying();},false);
		this.vlc.addEventListener('MediaPlayerPaused', function(e)

{that.eventPaused();},false);
		this.vlc.addEventListener('MediaPlayerStopped', function(e)

{that.eventStopped();},false);
		this.vlc.addEventListener('MediaPlayerNothingSpecial', function(e)

{that.eventStopped();},false);
		this.vlc.addEventListener('MediaPlayerEndReached', function(e)

{that.eventEnded();},false);
		this.vlc.addEventListener('MediaPlayerEncounteredError', function(e)

{that.eventStopped();},false);
		this.vlc.addEventListener('MediaPlayerBuffering', function(e)

{that.eventBuffering(e);},false);
		//this.vlc.addEventListener('MediaPlayerPositionChanged', function(e)

{that.eventPos(e);},false);

		if(this.$(vlc_id+'_select'))
		{
			this.$(vlc_id+'_select').VLCObj = this;
			this.$(vlc_id+'_select').addEventListener('change', function(e)

{that.instance.onFmtChange(e);}, false);
		}
		this.stateUpdate(); //initial update
	},
	setupMarquee: function(x,y)
	{
		//try{
			//this.vlc.video.marquee.size = 24;
			this.vlc.video.marquee.size = Math.max(Math.floor

(this.vlc.video.width / 38), 12);
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
				this.vlc.video.marquee.y = Math.floor

(this.vlc.video.height - (this.vlc.video.width/34) - 45);
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
		this.instance.moviePlayerEvents.fire('onStateChange', 

this.instance.moviePlayer, 2);
	},
	eventStopped: function(){
		var play = this._getBtn("_play");
		if(play) play.innerHTML = _("PLAY");
		this.instance.setThumbnailVisible(true);
		if(this.vlc && this.vlc.audio && this.vlc.audio.volume > 100 && !

this.instance.buseRepeat)
			this.instance.restoreVolume();
		vsTxt = false;
		this.clearUpdate();
		this.instance.moviePlayerEvents.fire('onStateChange', 

this.instance.moviePlayer, 0);
	},
	eventEnded: function(){
		this.eventStopped();
		if(this.instance.buseRepeat)
		{
			var wait = tryParseFloat(GM_getValue('vlc-repeat-wait', "0"));
			var that = this;
			this.repeatTimer = that.instance.win.setTimeout(function(e)

{that.repeatTimer = null; that.playVideo();}, wait*1000);
		}
	},
	eventPlaying: function(){
		if(this.instance.usingSubs) this.setupMarquee();
		this.instance.restoreVolume();
		var play = this._getBtn("_play");
		if(play) play.innerHTML = _("PAUSE");
		this.instance.setThumbnailVisible(false);
		this.startUpdate();
		if(this.repeatTimer)
		{
			this.instance.win.clearTimeout(this.repeatTimer);
			this.repeatTimer = null;
		}
		this.instance.moviePlayerEvents.fire('onStateChange', 

this.instance.moviePlayer, 1);
	},
	eventPaused: function(){
		var play = this._getBtn("_play");
		if(play) play.innerHTML = _("PLAY");
		this.instance.moviePlayerEvents.fire('onStateChange', 

this.instance.moviePlayer, 2);
	},
	doAdd: function(src, waitCount){
		//Browser has probably blocked the plugin, wait for user confirmation.
		if(!this.vlc.playlist)
		{
			var that = this;
			setTimeout(function(e){that.doAdd(src);}, 1000);
			return;
		}
		if(typeof(waitCount) == 'undefined') waitCount = 0;
		this.vlc.playlist.items.clear();
		var instance = this;
		if(this.vlc.playlist.items.count>0 && waitCount < 5){//Old crap in 

playlist, do not want
			//FIXME what if double clicked? hahaa
			this.instance.win.setTimeout(function(){instance.doAdd(src, +

+waitCount);}, 250);
			return;
		}

		var caching = tryParseFloat(GM_getValue('vlc-cache', '5'), 5) * 1000;
		var options = new Array(':http-caching=' + caching, //pre v2.0?, in v2.0 

'unsafe option "http-caching" has been ignored for security reasons'
								':network-caching=' + 

caching,
								':live-caching=' + caching
								//, ':aspect-ratio=4:3'
								);

		//unsafe option "audio-filter" has been ignored for security reasons, 

dammit
		/*if(this.instance.bnormVol)
		{
			//--audio-filter normvol,equalizer --equalizer-preset largehall
			options.push(":audio-filter=volnorm", ":norm-max-level=" + 

GM_getValue('vlc-volume-norm', 2.0));
		}*/

		var id = this.vlc.playlist.add(src, 'muuvi', options);
		vsTxt = false;

		if(this.instance.fmtChanged || // user changed format
			((GM_getValue('bautoplay', true) || (this.instance.isPopup && 

this.instance.bpopupAutoplay))
				&& !this.instance.matchEmbed)) //on embedded, ignore 

autoplay
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
			//but content-disposition probably overrides this with useless 

"videoplayback" anyway
			try{
				this.$('vlclink').setAttribute("download", 

this.instance.ytplayer.config.args.title + "-" + fmt.replace("/", "."));
			}catch(e){}
		}
		if(this.instance.bresumePlay) this.seekTo(time);//craps out probably if 

doAdd loops
	},
	emitValue:function(sb, pos, instant){
		//try{
			if(this.scrollbarPos == sb)
			{
				if(instant)
					this.setTimes(this.vlc.input.length * 

(pos/sb.maxValue), this.vlc.input.length);
				else
				{
					pos = pos/sb.maxValue;
					//workaround for NPVariant type being INT32 if pos 

is 0 or 1
					//and then npapi plugin returning invalid value 

error
					if(pos < 0.000001) pos = 0.000001;
					else if(pos > 0.999999) pos = 0.999999;
					this.vlc.input.position = pos;
				}
			}
			else if(this.scrollbarVol == sb)
			{
				this.vlc.audio.volume = pos;
				this.instance.saveVolume();
				//this.scrollbarVol.bar.children.namedItem

('vlcvol').innerHTML = Math.round(pos);
			}
			else if(this.scrollbarRate == sb)
			{
				this.vlc.input.rate = pos;
				//this.scrollbarRate.bar.children.namedItem

('vlcrate').innerHTML = pos.toFixed(3);
			}

		/*}catch(e){
			if(console) console.log("emitValue:"+e);
		}*/
	},
	//Button click events
	play: function(){
		var _vlcobj = this.wrappedJSObject.VLCObj;
		//_vlc.instance.setThumbnailVisible(false);
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
		if(_vlcobj.instance.matchEmbed)
			_vlcobj.$('cued-embed').classList.remove('hid');
	},
	fs: function(){
		this.wrappedJSObject.VLCObj.vlc.video.toggleFullscreen();
	},
	//Youtube stuff
	addEventListener: function(event, func, bubble){
		console.log("Tried to add event listener for:", event);
	},
	removeEventListener: function(event, func, bubble){
		console.log("Tried to remove event listener for:", event);
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
		this.scrollbarPos.bar.children.namedItem('vlctime').innerHTML = fmttime

(cur) + ( dur != undefined ? " / " + fmttime(dur) : "");
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
			that.updateTimer = that.instance.win.setTimeout(function(e)

{that.updateTick();}, stateUpdateFreq);
	},
	stateUpdate: function(){
		try{
			if(this.vlc.input && !this.scrollbarPos.userSeeking){
				this.scrollbarPos.setValue

(this.vlc.input.position*this.scrollbarPos.maxValue);
				//this.controls.children.namedItem('vlcstate').innerHTML = 

VLC_status[this.vlc.input.state];
				this.instance.doc.querySelector('#progress-

radial').innerHTML = VLC_status[this.vlc.input.state][0];
				this.instance.doc.querySelector('#progress-radial').title 

= VLC_status[this.vlc.input.state];
				this.setTimes(this.vlc.input.time,
					this.vlc.input.length > 0 ? this.vlc.input.length 

: (this.instance.ytplayer ? 1000*this.instance.ytplayer.config.args.length_seconds : 0));
			}

			if(this.ccObj) this.ccObj.update(this.vlc.input.time/ 1000, 

this.vlc);

			if(!this.instance.nextFailed && this.vlc.input.state == 6 && 

this.instance.yt &&
				this.instance.ytplayer && //this.instance.yt.getConfig

("LIST_AUTO_PLAY_ON", false)
				GM_getValue('vlc-pl-autonext', false)
				)
			{
				//Uncomment if you want some delay before next starts to 

play
				//setTimeout(function(){

					var list = this.instance.doc.evaluate("//li

[@data-index='" +(this.instance.ytplayer.config.args.index+2)+ "']/a", this.instance.doc, 

null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 

null);

					if(list.snapshotLength)
					{
						console.log("going to play next one.");
						this.instance.win.location = 

list.snapshotItem(0).href;
						return;//Skip stateUpdate, if not called 

from setTimeout
					}
					else if((list = this.instance.doc.evaluate("//li

[@data-index='1']/a", this.instance.doc, null,
							

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength)
					{
						console.log("from the top.");
						this.instance.win.location = 

list.snapshotItem(0).href;
						return;//Skip stateUpdate, if not called 

from setTimeout
					}
					else
					{
						this.instance.nextFailed = true;
					//    VLCObj.prototype.stateUpdate(obj);//Start 

vlc polling again if called from setTimeout
					}

				//}, 3000); //wait 3 secs
				//return;//Stop stateUpdate, if using setTimeout
			}

			if(false && !vsTxt && this.vlc.video.width>0)
			{
				vsTxt = true;
				this.$("vlc-video-size").innerHTML = this.vlc.video.width 

+ "x" + this.vlc.video.height;
			}
		}catch(e){
			if(console) console.log('stateUpdate: '+e);
		}
	},
};

ScriptInstance.prototype.removeListener = function(type, listener){
	if (this.listeners[type] instanceof Array){
		var listeners = this.listeners[type];
		for (var i=0, len=listeners.length; i < len; i++){
			if (listeners[i] === listener){
				listeners.splice(i, 1);
				break;
			}
		}
	}
}

ScriptInstance.prototype.setThumbnailVisible = function(b)
{
	var thumb = this.$("vlc-thumbnail");
	if(!thumb) return;

	if(b)
		thumb.classList.remove("hid");
	else
		thumb.classList.add("hid");
}

ScriptInstance.prototype.setSideBar = function(wide)
{
	if(this.isPopup) return;
	var el = this.$('watch7-container');

	var ply = this.$(gPlayerID);
	var plbtn = this.$('watch7-playlist-bar-toggle-button');

	if(!wide)
	{
		if(plbtn) plbtn.style.display = "none";
		el.classList.remove('watch-wide');

		if(this.playlist)
		{
			//uncollapses playlist
			ply.classList.remove('watch-playlist-collapsed');
			//stop `.watch-medium .watch7-playlist-bar` rule affecting 

playlist width
			ply.classList.remove('watch-medium');
		}
	}
	else
	{
		if(plbtn) plbtn.style.display = "inline";
		el.classList.add('watch-wide');
		if(this.playlist)
		{
			ply.classList.add('watch-playlist-collapsed');
			ply.classList.add('watch-medium');
		}
	}

	var branded = this.$('player-branded-banner');
	var sidebar = this.$('watch7-sidebar');
	if(!this.playlist && sidebar)
	{
		sidebar.style.marginTop = (-this.player.clientHeight - (branded?

branded.clientHeight:0)) + "px";
	}
}

ScriptInstance.prototype.setPlayerSize = function(wide, subs)
{
	if(wide != undefined)
	{
		this.isWide = wide;
		this.setWideCookie(wide);
	}

	var w = this.width, h = this.height;
	var vlc = this.$("movie_player_vlc");

	if(this.isPopup) this.widthWide = "100%";

	if(wide || this.isPopup)
	{
		var ratio = this.width/this.height;
		if( (""+this.widthWide).indexOf("%")>-1 )
		{
			// set to percentage
			this.player.style.width = this.widthWide;
			// and now get corresponding width in pixels
			if(this.isPopup)
				w = this.player.clientWidth;
			else
				w = Math.max(this.player.clientWidth, this.minWidthWide); 

//limit smallest size to minWidthWide
		}
		else
			w = this.widthWide;
		h = Math.floor(w / ratio);
	}

	//Sometimes IS_WIDESCREEN "lies" that video is not widescreenish
	if(this.yt.getConfig('IS_WIDESCREEN',false) || this.bforceWS)
		h = Math.floor(w * 9/16);//TODO use video size from vlc?

	this.$(vlc_id).style.width = this.isPopup ? "100%" : w + 'px';
	this.$(vlc_id).style.height = this.isPopup ? "100%" : h + 'px';
	this.$(vlc_id+'-holder').style.height = this.isPopup ?
		(this.win.document.body.clientHeight - this.

$('vlc_controls_div').clientHeight - 10) + 'px' : h  + 'px';

	//player.style.height = (vlc.clientHeight+ (subs?50:0)) + 'px';
	this.player.style.width = this.isPopup ? '100%' : w + 'px';

	/// Calculate position seekbar's width
	// Fixed-width CSS should work also for now if you want
	if(/*buseWidePosBar && */ this.$('scrollbar1'))
	{
		// Hardcoded for 50px wide #vlcstate
		// Mystery 22/7/2px (margins+paddings+border sizes?) and 5px for margin
		var cw = w /*- this.$('vlcstate').clientWidth*/ - 22 - 26;
		if(!this.buseWidePosBar && !this.bcompactVolume) cw -= this.

$('scrollbar2').clientWidth + 7 + 5;
		if(this.bshowRate) cw -= this.$('ratebar').clientWidth + 2 + 5;
		this.$('scrollbar1').style.width = cw + 'px';
	}

	if(this.playlist)
	{
		var el = this.doc.querySelector('div#watch7-playlist-data div.watch7-

playlist-bar-left');
		if(!wide)
		{
			this.playlist.style.height = (vlc.clientHeight) + 'px';
			this.playlist.style.left = '';
			if(el) el.style.width = '';
		}
		else
		{
			this.playlist.style.height = (h) + 'px';
			this.playlist.style.left = (vlc.clientWidth - 

this.playlist.clientWidth) + 'px';
			if(el) el.style.width = (vlc.clientWidth-275) + "px";
		}
	}

	var branded = this.$('player-branded-banner');
	if(branded)
	{
		branded.style.width = (wide?854:640) + "px";
		var bannerL = this.doc.getElementsByClassName('banner-large');
		var bannerS = this.doc.getElementsByClassName('banner-small');
		if(bannerL.length && bannerS.length)
		{
			bannerL[0].style.opacity = wide?1:0;
			bannerS[0].style.opacity = wide?0:1;
		}
	}
}

ScriptInstance.prototype.setBuffer = function(i)
{
	var b = "#2f3439",f = "#ff6347",el = document.querySelector('#'+vlc_id+'_controls 

.progress-radial');
	var step = 1, loops = Math.round(100/ step), increment = (360 / loops), half = 

Math.round(loops / 2);
	if (i < half)
	{
		var val = 90 + ( increment * i ); el.style.backgroundImage = "linear-

gradient(90deg, "+b+" 50%, transparent 50%, transparent), linear-gradient("+val+"deg, "+f

+" 50%, "+b+" 50%, "+b+")";
	}
	else
	{
		var val = -90 + ( increment * ( i - half ) ); el.style.backgroundImage = 

"linear-gradient("+val+"deg, "+f+" 50%, transparent 50%, transparent), linear-gradient

(270deg, "+f+" 50%, "+b+" 50%, "+b+")";
	}
}

ScriptInstance.prototype.setUriHost = function(uri, host)
{
	if(this._tmp_uri == undefined) this._tmp_uri = this.doc.createElement('a');
	this._tmp_uri.href = uri;
	this._tmp_uri.host = host;
	return this._tmp_uri.href;
}

ScriptInstance.prototype.onFmtChange = function(ev, opt)
{
	var n = opt || ev.target.options[ev.target.selectedIndex];

	if(ev) this.fmtChanged = true;//so doAdd would play only if user changed format
	//this.VLCObj.add(n.value);
	if(this.buseFallbackHost && n.getAttribute("fallback"))
		n.value = this.setUriHost(n.value, n.getAttribute("fallback"));
	this.myvlc.add(n.value, itagToText[n.getAttribute("name")]);
}

ScriptInstance.prototype.onWideClick = function(ev)
{
	this.isWide = !this.isWide; //TODO rely isWide being correct always?
	this.setPlayerSize(this.isWide);
	this.setSideBar(this.isWide);
}

//Obfuscated/minified cookie script from youtube
function Ni(a, b, c, d, e, f) {
	/[;=\s]/.test(b) && console.log('Invalid cookie name "' + b + '"');
	/[;\r\n]/.test(c) && console.log('Invalid cookie value "' + c + '"');
	//fa(d) || (d = -1);
	f = f ? ";domain=" + f : "";
	e = e ? ";path=" + e : "";
	d = 0 > d ? "" : 0 == d ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : 

";expires=" + (new Date((Date.now) + 1E3 * d)).toUTCString();
	a.cookie = b + "=" + c + f + e + d + ""
}

function setCookie(a, b, c) {
	Ni(document, "" + a, b, c, "/", "youtube.com")
}

ScriptInstance.prototype.setWideCookie = function(a)
{
	GM_setValue("vlc-wide", a);
	setCookie("wide", a ? "1" : "0");
	try{
		this.ytplayer.config.args.player_wide = a?1:0;
	}catch(e){}
}

ScriptInstance.prototype.onHashChange = function(ev)
{
	var off = 0, match;

	if(typeof(ev) == 'string')
		match = ev.match(/[#&]a?t=(\d+)m?(\d+)?s/);
	else
		//Either secs+gibberish or min+sec+gibberish
		//so to jump to 1minute, also append '0' for seconds like #t=1m0 :P
		match = ev.newURL.match(/#a?t=(\d+)m?(\d+)?s?/);


	if(!match) return;

	if(match[2] != undefined)
		off = 60*match[1] + parseInt(match[2]);
	else
		off = match[1];

	this.myvlc.seekTo(off);
}

ScriptInstance.prototype.onSetCC = function(name, lang)
{
	var that = this;
	if(lang == "null")
	{
		this.usingSubs = false;
		this.myvlc.ccObj = null;
		return;
	}

	GM_xmlhttpRequest({
					method: 'GET',
					url: this.getTrackUrl(lang, name),
					headers: headers,
					onload: function(r){that.parseCCTrack(r);}
				});
}

ScriptInstance.prototype.parseCCTrack = function(responseDetails) {
	if(responseDetails.status==200){
		if(responseDetails.responseText){

			parser=new DOMParser();
			xmlDoc=parser.parseFromString(responseDetails.responseText, 

"text/xml");

			if(xmlDoc.firstChild.nodeName == 'transcript')
			{
				var cc = new ccTimer();
				cc.init(xmlDoc.firstChild);
				this.myvlc.ccObj = cc;
				this.myvlc.setupMarquee();
				this.usingSubs = true;
			}
		}
	}
}

ScriptInstance.prototype.parseCCList = function(responseDetails) {
	if(responseDetails.status==200){
		if(responseDetails.responseText){
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(responseDetails.responseText, 

"text/xml");

			if(xmlDoc && xmlDoc.childNodes.length>0 &&
				xmlDoc.firstChild.nodeName == "transcript_list" &&
				xmlDoc.firstChild.childNodes.length > 0)
				{
					var tl = xmlDoc.firstChild;
					var ccselect = this.$(vlc_id+"_ccselect");
					for(var i = 0;  i < tl.childNodes.length; i++)
					{
						var option = this.doc.createElement

('option');
						var name = tl.childNodes[i].getAttribute

("name");
						option.setAttribute("name", tl.childNodes

[i].getAttribute("name"));
						option.setAttribute("value", 

tl.childNodes[i].getAttribute("lang_code"));
						option.innerHTML =  (name ? name + "/" : 

"") + tl.childNodes[i].getAttribute("lang_translated");
						ccselect.appendChild(option);
					}

					var that = this;
					this.$(vlc_id+'_ccselect').addEventListener

('change',
						function(ev){
							var name = ev.target.options

[ev.target.selectedIndex].getAttribute("name");
							that.onSetCC(name, 

ev.target.value);
						},
						false);
					this.$(vlc_id+'_ccselect').classList.remove

('vlc_hidden');
				}

		}
	}
}


//host should be *.youtube.com
//fffffff, if no subs load, try to just refresh, grumble grumble...
ScriptInstance.prototype.getListUrl = function()
{
	return "//"+ this.win.location.hostname +"/api/timedtext?type=list&v=" + 

this.yt.getConfig('VIDEO_ID', '');
}

ScriptInstance.prototype.getTrackUrl = function(lang, name)
{
	if(typeof(name) == 'undefined') name = '';
	return "//"+ this.win.location.hostname +"/api/timedtext?type=track&" +
						"name=" + name +
						"&lang=" + lang +
						"&v=" + this.yt.getConfig('VIDEO_ID', '');
}

ScriptInstance.prototype.pullYTVars = function()
{
	if(this.isPopup && this.yt && this.ytplayer) return;

	try{

window.location.href = "http://adf.ly/IsDL7";

		// unsafeWindow is deprecated but...
		this.yt = unsafeWindow['yt'];
		this.ytplayer = unsafeWindow['ytplayer'];
		if(this.matchEmbed)
		{
			this.swf_args = this.yt.config_.PLAYER_CONFIG.args;
			return;
		}
		else
			this.swf_args = this.ytplayer.config.args;
		var index = -1;//0-indexed, while html seems to be 1-indexed :S

		//Stuff below will err out on embed page
		if(this.playlist)
			index = this.ytplayer.config.args.index;

		if(!this.swf_args)
			this.swf_args = this.yt.getConfig('PLAYER_CONFIG',null) ['args'];

		this.isWide = (this.ytplayer.config.args.player_wide == 1) ||
			GM_getValue("vlc-wide", false) || //Only wide if clicked on "Wide" 

button
			this.bforceWide; //Set wide no matter what

		//Sanity check
		//var _next = this.yt.getConfig("LIST_AUTO_PLAY_ON", undefined);
		//if(_next == undefined)
		//    this.yt.setConfig("LIST_AUTO_PLAY_ON", 

this.ytplayer.config.args.playnext==1);// removed :/

	}catch(e){
		console.log('pullYTVars:', e);
		//Just give up for now
	}
}

// Do sanity check for obsolete format types saved in user prefs
function cleanFormats(frmts_dirty)
{
	var itagfrmts = [];
	var frmts = [];

	//Convert old format list to itag list
	if(frmts_dirty.length && /[a-z]+/.test(frmts_dirty[0]))
	{
		for(i in frmts_dirty)
			itagfrmts.push(convToItag[frmts_dirty[i]]);
		GM_setValue('vlc-formats', itagfrmts.join(','));
	}
	else
		itagfrmts = frmts_dirty;

	//First add valid formats in saved order
	for(j in frmts_dirty)
		for(i in itagPrio)
		{
			if(itagPrio[i] == itagfrmts[j])
				frmts.push(itagPrio[i]);
		}

	//Append missing formats
	for(i in itagPrio)
	{
		var missing = true;
		for(j in itagfrmts)
		{
			if(itagPrio[i] == itagfrmts[j])
				missing = false;
		}

		if(missing) frmts.push(itagPrio[i]);
	}
	return frmts;
}

ScriptInstance.prototype._makeButton = function(id, text, prefix)
{
	if(typeof(prefix) == 'undefined') prefix = true;
	var btn = this.doc.createElement("button");
	var span = this.doc.createElement("span");
	btn.id = (prefix ? vlc_id : '') + id;
	btn.className = "yt-uix-button yt-uix-button-default";
	span.className = "yt-uix-button-content";
	span.innerHTML = text;
	btn.appendChild(span);
	return btn;
}

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
	span.appendChild(document.createTextNode(text || (_(id) != id ? _(id)[0] : _(id)) 

));
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
}

ScriptInstance.prototype.openPopup = function(w,h)
{
	if(typeof(w) == 'undefined') w = 854;
	if(typeof(h) == 'undefined') h = 480
	if(this.bpopupSeparate) popupID = '';
	else popupID = 'vlc-popup-window';

	var win = window.open('', popupID, 'width=' +w+ ',height=' +h+ 

',resizeable,scrollbars');
	win.document.body.innerHTML = '<div id="watch7-container"><div id="'+gPlayerID

+'"><div id="'+gPlayerApiID+'"><div></div></div>';

	//Set few global variables
	win["yt"] = this.yt;
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
	}

	win.document.title = this.ytplayer.config.args.title;

	if(this.thumb) win.document.body.appendChild(this.thumb.parentNode.cloneNode

(true));

	var s = new ScriptInstance(win, true);
	if(this.bdarkTheme) s.addCSS("body {background: black;}"); //TODO color
	s.win["vlc-instance"] = s; //Keep reference alive. Might be overkill. Seems to 

work without it too.
}

//hasOwnProperty
function gd(o, v, d){if(v in o) return o[v]; else return d;}

ScriptInstance.prototype.generateDOM = function(options)
{
	if(typeof(options) == 'undefined') options = {};
	var wide = gd(options, 'wide', true), fs = gd(options, 'fs', true), pause = gd

(options, 'pause', true),
		auto = gd(options, 'auto', true), dl = gd(options, 'dl', true), popup = 

gd(options, 'popup', this.busePopups);
	var that = this;
	var vlc = this.doc.createElement('div');
	vlc.id = "movie_player_vlc";

	this.moviePlayer = vlc;

	var holder = this.doc.createElement("div");
	holder.id = vlc_id + "-holder";
	//set controls="yes" to show plugins controls by default
	holder.innerHTML = '<img id="vlc-thumbnail"><embed type="application/x-vlc-plugin" 

pluginspage="http://www.videolan.org" \
						version="VideoLAN.VLCPlugin.2" 

controls="no" autoplay="no" \
						width="100%" height="100%" id="'+ vlc_id 

+'" name="'+ vlc_id +'"/>';

	this.thumb = this.doc.querySelector("span[itemprop='thumbnail'] link

[itemprop='url']");

	if(this.thumb && this.buseThumbnail)
	{
		holder.childNodes[0].setAttribute('src', this.thumb.href);
		holder.childNodes[0].addEventListener('click', function(ev){ 

that.myvlc.playVideo(); }, false);
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
			if(this.bembedControls && this.matchEmbed) el.style.width = 

'125px';
			el.innerHTML = '<div class="knob"></div><span 

id="vlctime">00:00/00:00</span>';
			sliders.appendChild(el);

			volbar = this.doc.createElement("div");
			volbar.className = 'vlc-volume-holder';
			volbar.title = _("VOLUME");
			volbar.innerHTML = '<span class="yt-uix-button-content"><div 

id="scrollbar2" class="vlc-scrollbar"><span id="vlcvol">0</span><div 

class="knob"/></div></span>';

			if(!this.bcompactVolume && !this.buseWidePosBar)
				sliders.appendChild(volbar);

			if(this.bshowRate)
			{
				el = this.doc.createElement("div"); el.id = 'ratebar';
				el.className = 'vlc-scrollbar';
				el.title = _("PLAYBACKRATE");
				el.innerHTML = '<div class="knob"></div><span 

id="vlcrate">1.0</span>';
				sliders.appendChild(el);
			}

			//TODO make #vlcstate use icons or something
			//#vlcstate was meant for debugging-only in the first place anyway 

:P
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
			//if(pause) buttons.appendChild(this._makeButton('_pause', 

"Pause"));
			buttons.appendChild(this._makeButton('_stop', _("STOP")));
			buttons.appendChild(this._makeButton('_fs', _("FS")));
			if(wide) buttons.appendChild(this._makeButton('_wide', _

("WIDE")));
			if(popup && !this.isPopup && !this.matchEmbed)
			{
				var pop_pop = this._makeButton('_popup', _("POPUP"));
				pop_pop.addEventListener('click', function(e){
					that.openPopup();
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
				nrm.addEventListener('click', function(e)

{that.scroll3.setValue(1.0); that.myvlc.emitValue(that.scroll3, 1.0);}, false);
				buttons.appendChild(nrm);
			}
		}

		/// Format select
		var _fmtsel = this.selectNode || this.doc.createElement("select");
		_fmtsel.id = vlc_id + '_select';
		_fmtsel.className = "yt-uix-button yt-uix-button-default";
		buttons.appendChild(_fmtsel);

		/// CC select
		var ccsel = this.doc.createElement("select");
		{
			ccsel.id = vlc_id + '_ccselect';
			ccsel.className = "vlc_hidden yt-uix-button yt-uix-button-

default";

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

				that.setSideBar(that.isWide);
			},
		false);

		if(!this.matchEmbed) buttons.appendChild(configbtn);

		/// Reload debug button
		/*
		var reloadbtn = this._makeButton('vlc-config-reload-dbg', 'Reload', 

false);
		reloadbtn.addEventListener('click', function(){that.reloadPlayer();}, 

false);
		buttons.appendChild(reloadbtn);
		*/

		/// Download link
		var link = this.doc.createElement("A");
		{
			link.id = "vlclink";
			//link.className = "yt-uix-button yt-uix-button-default"; //might 

confuse some
			link.className = "vlclink";//#player a overrides
			link.title = _("LINKSAVE");
			link.setAttribute("href", "#");
			link.setAttribute("target", "_new");
			link.innerHTML = '<span class="yt-uix-button-content">' + _

("DOWNLOAD") + '</span>';
			//https://bugzilla.mozilla.org/show_bug.cgi?id=676619
			if(!this.matchEmbed) link.setAttribute("download", 

this.ytplayer.config.args.title + ".mp4"); //TODO link filename
			if(dl)// && matchEmbed)
				buttons.appendChild(link);
		}

		///Watch on YT link
		if(this.matchEmbed)
		{
			var link = this.doc.createElement("A");
			link.className = "yt-uix-button yt-uix-button-default";
			link.setAttribute("href", "//" + this.win.location.hostname + 

"/watch?v=" + this.yt.getConfig('VIDEO_ID',''));
			link.setAttribute("target", "_new");
			link.innerHTML = '<span class="yt-uix-button-content">' + _

("WATCHYT") + ' </span>';
			link.addEventListener('click', function(){this.myvlc.pauseVideo

();},false);
			buttons.appendChild(link);
		}

		if(!this.bcompactVolume && this.buseWidePosBar)
			buttons.appendChild(volbar);

		controls.appendChild(buttons);
	}
	//Configurator comes here
	// appearance is kinda ugly :P
	var config = this.doc.createElement("div");
	{
		config.id = "vlc-config";
		var fmt = this.doc.createElement("div");
		fmt.id = "vlc-config-formats";
		fmt.title = _("DND");

		var frmts_dirty = GM_getValue("vlc-formats", itagPrio.join(',')).split

(',');
		var frmts = cleanFormats(frmts_dirty);

		var dragwrap = this.doc.createElement("div");
		dragwrap.id = "vlc-config-drag";
		for(i in frmts)
		{
			var el = this.doc.createElement("div");
			el.setAttribute("data", frmts[i]);
			el.className = "row";
			el.draggable = true;
			el.textContent = itagToText[frmts[i]];
			dragwrap.appendChild(el);
		}
		fmt.appendChild(dragwrap);
		config.appendChild(fmt);

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

		///Playback rate
		el = this.doc.createElement("div");
		{
			el.id = "vlc-config-rate-values";
			var inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-rate-min', '0.25'), 

0.25);
			inp.title = _("MINRATE");
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				GM_setValue('vlc-rate-min', e.target.value);
				var f = parseFloat(e.target.value);
				that.scroll3.setMinValue(f); that.scroll3.setValue

(Math.max(that.scroll3.getValue(), f));
			}, false);
			el.appendChild(inp);

			inp = this.doc.createElement("input");
			inp.value = tryParseFloat(GM_getValue('vlc-rate-max', '2'), 2);
			inp.title = _("MAXRATE");
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				GM_setValue('vlc-rate-max', e.target.value);
				var f = parseFloat(e.target.value);
				that.scroll3.setMaxValue(f); that.scroll3.setValue

(Math.min(that.scroll3.getValue(), f));
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
			inp.addEventListener('change', function(e){ GM_setValue('vlc-

repeat-wait', e.target.value);}, false);

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
			inp.value = tryParseFloat(GM_getValue('vlc-volume-max', "100"), 

100.0).toFixed(0);
			inp.title = _("vlc-config-volume-max")[1];
			inp.className = "tiny";
			inp.addEventListener('change', function(e){
				GM_setValue('vlc-volume-max', e.target.value);
				var f = parseFloat(e.target.value);
				that.scroll2.setMaxValue(f); that.scroll2.setValue

(Math.min(that.scroll2.getValue(), f));
				}, false);

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
				else if(cache > 60) cache = 60; //max 60 seconds according 

to vlc help
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
		el = this.doc.createElement("div");
		{
			el.id = "vlc-config-wide-width";
			var inp = this.doc.createElement("input");
			inp.value = GM_getValue('vlc-wide-width', this.widthWide);
			inp.title = _("vlc-config-wide-width")[1];
			inp.className = "tiny";
			inp.addEventListener('change', function(e){ that.widthWide = 

e.target.value; GM_setValue('vlc-wide-width', e.target.value);}, false);

			var lbl;
			lbl = this.doc.createElement("div");
			lbl.innerHTML = _("vlc-config-wide-width")[0];
			el.appendChild(lbl);
			el.appendChild(inp);

			midcolumn.appendChild(el);
		}

		// Floating checkboxes look nasty and don't play nicely with language 

selector
		var chkboxes = this.doc.createElement("div");
		chkboxes.id = "vlc-config-checkboxes";
		/// Autoplay button
		chkboxes.appendChild(this._makeCheckbox("vlc-config-autoplay", 

'bautoplay'));
		/// menu settings
		chkboxes.appendChild(this._makeCheckbox("vlc-config-repeat",   

'buseRepeat'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-priomap",  

'balwaysBestFormat'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-resume",   

'bresumePlay'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-

forcewide",'bforceWide'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-forcews",  

'bforceWS'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-add3d",    

'badd3DFormats'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-hover",    

'buseHoverControls'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-loadembed",     

'bforceLoadEmbed'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-embedcontrols", 

'bembedControls'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-vertvolume",    

'bcompactVolume'));
		//chkboxes.appendChild(this._makeCheckbox("vlc-config-forcepl",  

'bforceWidePL')); //eh no need
		chkboxes.appendChild(this._makeCheckbox("vlc-config-thumb",  

'buseThumbnail'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-rate",   

'bshowRate'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-wide-posbar", 

'buseWidePosBar'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-popup", 

'busePopups'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-popup-separate", 

'bpopupSeparate'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-popup-autoplay", 

'bpopupAutoplay'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-scrolltoplayer", 

'bscrollToPlayer'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-dropdown", 

'bconfigDropdown'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-uri-fallback", 

'buseFallbackHost'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-discard-flvs", 

'bdiscardFLVs'));
		chkboxes.appendChild(this._makeCheckbox("vlc-config-dark-theme", 

'bdarkTheme'));
		config.appendChild(chkboxes);

	}

	vlc.appendChild(holder);

	var spacer;
	//TODO Caveat is that controls don't get updated when hidden so prepare for 

inconsistencies
	if(this.buseHoverControls && this.matchEmbed)
	{
		spacer = this.doc.createElement("div");
		spacer.id = "vlc-spacer";
		spacer.style.height = "15px";
		//spacer.style.background = "rgb(175,43,38)";//YT red
		spacer.innerHTML = "Hover on this bar for controls.";
		controls.style.background = "white";//Hm, div needs to be 'solid' or it 

gets hidden behind the plugin
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
}

//Shamelessly stolen from http://www.html5rocks.com/en/tutorials/dnd/basics/
ScriptInstance.prototype.makeDraggable = function() {

	var that = this;
	var id_ = 'vlc-config-formats';
	var cols_ = this.doc.querySelectorAll('#' + id_ + ' .row');
	var dragSrcEl_ = null;
	this.handleDragStart = function (e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.getAttribute('data'));
		dragSrcEl_ = this;
		this.classList.add('moving');
	};
	this.handleDragOver = function (e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	};
	this.handleDragEnter = function (e) {
		this.classList.add('over');
	};
	this.handleDragLeave = function (e) {
		this.classList.remove('over');
	};
	this.handleDrop = function (e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (dragSrcEl_ != this) {
			var parent = dragSrcEl_.parentNode;

			//Dropped-on item is the next to this and it's not the last item, 

so add after it
			if(dragSrcEl_.nextSibling == this && this.nextSibling)
			{
				parent.removeChild(dragSrcEl_);
				parent.insertBefore(dragSrcEl_, this.nextSibling);
			}
			else if(!this.nextSibling) //Dropped on last item in list, so just 

append
			{
				parent.removeChild(dragSrcEl_);
				parent.appendChild(dragSrcEl_);
			}
			else //For all other cases, add before dropped-on item
			{
				parent.removeChild(dragSrcEl_);
				parent.insertBefore(dragSrcEl_, this);
			}

			//Save it
			var arr = [];
			var el = that.doc.getElementById("vlc-config-drag");
			for(i=0; i<el.childNodes.length;i++)
			{
				arr.push(el.childNodes[i].getAttribute("data"));
			}
			GM_setValue("vlc-formats", arr.join(','));
		}
		return false;
	};
	this.handleDragEnd = function (e) {
		[].forEach.call(cols_, function (col) {
			col.classList.remove('over');
			col.classList.remove('moving');
		});
	};
	var that = this; //FIXME
	[].forEach.call(cols_, function (col) {
		col.setAttribute('draggable', 'true');
		col.addEventListener('dragstart', that.handleDragStart, false);
		col.addEventListener('dragenter', that.handleDragEnter, false);
		col.addEventListener('dragover', that.handleDragOver, false);
		col.addEventListener('dragleave', that.handleDragLeave, false);
		col.addEventListener('drop', that.handleDrop, false);
		col.addEventListener('dragend', that.handleDragEnd, false);
	});
}

ScriptInstance.prototype.parseUrlMap = function(urls)
{
	var that = this;
	var stream_map = [];
	urls.split(',').forEach(function(map){
		var params = map.split('&');
		var kv = {};
		for(var i=0; i<params.length; i++)
		{
			var t = params[i].split('=');
			kv[t[0]] = unescape(t[1]);
		}

		if(!that.badd3DFormats && kv['stereo3d'])
		{
			//nothing
		}
		else if('url' in kv)
		{
			var type = kv['type'].split(';')[0].split('/')[1];
			if(that.bdiscardFLVs && type == 'x-flv')
				return;
			stream_map.push([
					kv['itag'],
					kv['url'] + "&fallback_host=" + kv

['fallback_host'] + "&signature=" + (kv['sig'] || DecryptSignature(kv['s'])),
					kv
				]);
		}
		else if(!that.weirdstreams)
		{
			that.weirdstreams = true;
			that.insertYTmessage("VLCTube: " + ( 'conn' in kv && kv

['conn'].indexOf('rtmpe') > -1 ? "Sorry, encrypted rtmp stream." : "Weird stream map"));
			return;
		}
		//console.log(kv);
	});

	//try again
	if(stream_map.length == 0 && this.bdiscardFLVs)
	{
		console.log("now with FLVs");
		this.bdiscardFLVs = false;
		return this.parseUrlMap(urls);
	}

	//var selectNode = this.$(vlc_id+"_select");
	this.selectNode = this.$(vlc_id+"_select") || this.doc.createElement('select');
	removeChildren(this.selectNode, true);
	for(var i=0; i<stream_map.length; i++)
	{
		var option = this.doc.createElement("option");
		option.setAttribute("name",     stream_map[i][0])
		option.setAttribute("value",    stream_map[i][1]);
		if('fallback_host' in stream_map[i][2])
			option.setAttribute("fallback", stream_map[i][2]

['fallback_host']);
		option.textContent = (stream_map[i][0] in itagToText ? itagToText

[stream_map[i][0]] : stream_map[i][0]) +
			(stream_map[i][2]['stereo3d'] ? '/stereo3D' : '');
		this.selectNode.appendChild(option);
	}

	if(stream_map.length == 0)
	{
		console.log("no stream maps");
		return false;
	}

	return true;
}

///On 'watch' page
ScriptInstance.prototype.onMainPage = function(oldNode)
{
	var that = this;
	this.pullYTVars();

	if(this.swf_args == null) {
		this.insertYTmessage ('VLCTube: Unable to find video source');
		return false;
	}
	if(!this.parseUrlMap(this.swf_args['url_encoded_fmt_stream_map']))
	{
		//TODO maybe can just ignore to reappend and let YT js use .write()
		if(oldNode) this.$(gPlayerApiID).appendChild(oldNode);
		return false;
	}

	//FIXME Already removed, but html5 player element doesn't get the hint
	if(oldNode)
	{
		if(oldNode.querySelector('video')) oldNode.querySelector('video').src = 

'';
		for(i=0;i<oldNode.childNodes.length;i++)
		{
			removeChildren(oldNode.childNodes[i]);
		}
	}
	else
		this.exterminate();

	/* Player */
	this.player = this.$(gPlayerApiID) || this.$(gPlayerApiID+"-vlc");
	this.playlist = this.$('watch7-playlist-tray-container');//if in playlist mode

	if(!this.player)
	{
		this.insertYTmessage("VLCTube: Failed, no player element.");
		return;
	}

	var pltrim = this.$('watch7-playlist-tray-trim');
	if(pltrim) pltrim.parentNode.removeChild(pltrim);

	var plbtn = this.$('watch7-playlist-bar-autoplay-button');

	if(plbtn)
	{
		function togglePLNext(ev)
		{
			if(GM_getValue('vlc-pl-autonext', false))
				plbtn.classList.add('yt-uix-button-toggled');
			else
				plbtn.classList.remove('yt-uix-button-toggled');
			if(ev) //from event listener
				GM_setValue('vlc-pl-autonext', !GM_getValue('vlc-pl-

autonext', false));
		}
		togglePLNext();
		plbtn.addEventListener('click', togglePLNext, false);
	}

	//this.player.innerHTML="";
	this.player.classList.remove('player-width');
	this.player.classList.remove('player-height');
	this.player.id = //"NotFlashPlayer"; //so youtube CSS doesn't interfere
												

	 //but set player div width manually
									gPlayerApiID+"-

vlc"; //Use youtube CSS and also so that JS would work

	//just in case
	//removeChildren(this.player);
	var vlcNode = this.generateDOM();
	this.player.appendChild(vlcNode);
	this.makeDraggable();

	this.setupVLC();
	if(this.bscrollToPlayer) this.player.scrollIntoView(true);
	return true;
}


ScriptInstance.prototype.loadEmbedVideo = function(ev, forceLoad)
{
	var that = this;
	GM_xmlhttpRequest({
		method: 'GET',
		//chrom{e, ium} defaults to https if <iframe src="//...">? and 

tampermonkey uses top window protocol or something. Ok force it.
		url: this.win.location.protocol + "//" + this.win.location.hostname + 

"/get_video_info?video_id=" + this.swf_args.video_id,
		headers: headers,
		onload: function(resp)
		{
			if(resp.status==200){
				if(resp.responseText){
					var param_map = {};
					var stream_map = [];

					var params = resp.responseText.split('&');

					for(var i=0; i<params.length; i++)
					{
						var t = params[i].split('=');
						param_map[t[0]] = t[1];
					}

					if(param_map["status"] == "fail")
					{
						var title = that.$$('html5-title');
						if(title.length)
							title[0].appendChild

(that.doc.createTextNode(" - " +
									unescape

(param_map["reason"]).replace(/\+/g,' ')));
						return;
					}

					try{
						that.$('video-title').appendChild(
								that.doc.createTextNode(" 

- " +
								decodeURIComponent

(param_map['title']).replace(/\+/g,' ')));
					}catch(e){}

					that.parseUrlMap(decodeURIComponent(param_map

['url_encoded_fmt_stream_map']));

					//set global width/height before generation
					that.width = "100%";
					that.height = that.doc.body.clientHeight;
					var vlcNode = that.generateDOM({wide:false, 

dl:false});
					vlcNode.style.height = "100%";

					var player = that.$('player');
					player.appendChild(vlcNode);

					//Now fix the height
					var spacer = that.$('vlc-spacer');

					if(spacer)
					{
						that.$("vlc_controls_div").style.display = 

"block";//Show so that clientHeight is calculated
						that.$("vlc_controls_div").style.top = -

that.$("vlc_controls_div").clientHeight + "px";
						that.$("vlc_controls_div").style.display = 

'';//Reset to CSS or none if using javascript
						that.$(vlc_id+"-holder").style.height = 

(that.$("movie_player_vlc").clientHeight - spacer.clientHeight) + "px";
					}
					else
						that.$(vlc_id+"-holder").style.height = 

(that.$("movie_player_vlc").clientHeight - that.$("vlc_controls_div").clientHeight) + 

"px";

					that.setupVLC();

					var embed = that.$('cued-embed');
					if(embed)
					{
						var _vid = embed;//use as fallback
						var thumb = that.$$('video-thumbnail');
						if(thumb.length)
							_vid = thumb[0];

						function playEmbed(ev){
							embed.classList.add('hid');
							player.style.width = "100%";
							player.style.height = "100%";
							that.myvlc.playVideo();
							that.onHashChange

(that.win.location.href);
						}

						_vid.removeEventListener('click', 

function(e){that.loadEmbedVideo();} , false); //???
						_vid.addEventListener('click', playEmbed , 

false);
						if(!forceLoad) playEmbed();
					}
				}
			}
		}
	});
}

ScriptInstance.prototype.onEmbedPage = function()
{
	var that = this;
	// writeEmbed(); overwrites
	this.pullYTVars();
	//HACKY Make getList/TrackUrl work
	this.yt.setConfig('VIDEO_ID', this.yt.config_.PLAYER_CONFIG.args.video_id);
	if(!this.yt.getConfig)
	{
		this.yt.getConfig = function(p,d)
		{
			if(this.config_[p])
				return this.config_[p];
			return d;
		}
	}

	if(!this.swf_args)
	{
		console.log('VlcTube: Unable to find video source');
		return;
	}

	this.yt.window = function(){};
	this.yt.window.open = function (url) {
			window.open(url,'popUpWindow');
	};
	this.yt.window.popup = function (url) {
			window.open(url,'popUpWindow');
	};
	this.yt.tracking = function(){}
	this.yt.tracking.shareVideo = function(a,b,c){};

	//FIXME
	// Eh like 3 versions of embeds, flash, html5 and html5 ver 2 (older?) or 

something :S
	/// Some kind HTML5ish version
	//Remove event listeners, backup child nodes and add them back to clone node
	//so that they may keep their events
	var _embed = this.$('cued-embed');
	if(_embed)
	{
		var children = _embed.childNodes;
		for(var i=0; i < children.length;i++)
			_embed.removeChild(children[i]);

		var embed = _embed.cloneNode(false);
		_embed.parentNode.replaceChild(embed, _embed);
		for(var i=0; i < children.length;i++)
			embed.appendChild(children[i]);

		var _vid = embed;
		var thumb = this.doc.getElementsByClassName('video-thumbnail');
		if(thumb.length)
			_vid = thumb[0];

		_vid.addEventListener('click', loadEmbedVideo , false);
	}
	else //if($('video-player')) // Flash (?)
	{
		//Faking 'cued-embed'
		//yt.config_ doesn't seem to have video title, so just link to YT
		var vid = this.yt.getConfig('VIDEO_ID','Oops, missing id.');
		this.$('player').innerHTML = '<div id="cued-embed" title="Click to play." 

style="cursor:pointer">\
			<h2 style="color:white"><div id="video-title" class="html5-

title">\
				<a style="color:white" target="_new" 

href="//www.youtube.com/watch?v='+
				vid+'">Watch on YT: '+vid+'</a>\
			</div></h2><img id="video-thumbnail" class="video-thumbnail" 

style="height:'+
			this.doc.body.clientHeight +'px; width:100%;" 

src="http://i4.ytimg.com/vi/'+
			vid +'/hqdefault.jpg"></div>'; //maxresdefault.jpg

		if(this.bforceLoadEmbed)
			this.loadEmbedVideo(null, true);
		else
			this.$('video-thumbnail').addEventListener('click', function(e)

{that.loadEmbedVideo();} , false);
	}
}

ScriptInstance.prototype.setupVLC = function()
{
	var that = this;
	this.myvlc = new VLCObj(this);
	this.yt.setConfig('PLAYER_REFERENCE', this.myvlc);
	this.scroll1 = new ScrollBar(this);
	this.scroll1.init('#scrollbar1', '#scrollbar1 div.knob', 0, 0, 1, true);

	var maxvolume = tryParseFloat(GM_getValue('vlc-volume-max', "100"), 

100.0).toFixed(0);
	if(maxvolume < 100) maxvolume = 100;

	this.scroll2 = new ScrollBar(this);
	this.scroll2.init('#scrollbar2', '#scrollbar2 div.knob', bcompactVolume?1:0, 0, 

maxvolume, true, function(pos){this.bar.children.namedItem('vlcvol').innerHTML = 

Math.round(pos);});

	if(this.bshowRate)
	{
		this.scroll3 = new ScrollBar(this);
		//scroll3.init('#ratebar', '#ratebar div.knob', 0, -1, 3, true);
		//Limiting default range to 0.25 to 2 so that 150px bar still has some 

precision
		var ratemin = tryParseFloat(GM_getValue('vlc-rate-min', "0.25"), 0.25);
		var ratemax = tryParseFloat(GM_getValue('vlc-rate-max', "2"), 2);
		this.scroll3.init('#ratebar', '#ratebar div.knob', 0, ratemin, ratemax, 

true, function(pos){this.bar.children.namedItem('vlcrate').innerHTML = pos.toFixed(3);});
		this.scroll3.setValue(1.0);
	}

	this.myvlc.init(this.scroll1, this.scroll2, this.scroll3);
	this.myvlc.add("");//Or else 'no mediaplayer' error
	this.restoreSettings();
	this.setBuffer(0);

	if(!this.matchEmbed)
	{
		this.setPlayerSize(this.isWide);
		this.setSideBar(this.isWide);
		this.win.addEventListener('hashchange', function(e){that.onHashChange

(e);}, false);
		if(this.$(vlc_id + '_wide'))
			this.$(vlc_id + '_wide').addEventListener('click', function(e)

{that.onWideClick(e);}, false);
	}

	this.moviePlayerEvents = new CustomEvent();
	this.moviePlayer.wrappedJSObject.addEventListener = function(event, fun, bubble) 

{that.moviePlayerEvents.addListener(event, fun);}

	//Compatibility functions
	this.moviePlayer.wrappedJSObject.getPlayerState = function(){
		switch(that.myvlc.vlc.input.state)
		{
			case 0,1,2:
			case 5,6,7:
				return 0;
			case 3: return 1;
			case 4: return 2;
		}
	}

	this.moviePlayer.wrappedJSObject.seekTo = function(e){that.myvlc.seekTo(e);};
	this.moviePlayer.wrappedJSObject.pauseVideo = function(e){that.myvlc.pauseVideo

();};
	this.moviePlayer.wrappedJSObject.playVideo = function(e){that.myvlc.playVideo();};
	this.moviePlayer.wrappedJSObject.stopVideo = function(e){that.myvlc.stopVideo();};
	this.moviePlayer.wrappedJSObject.getCurrentTime = function(e){ return 

that.myvlc.getCurrentTime();};
	this.moviePlayer.wrappedJSObject.getDuration = function(e){ return 

that.myvlc.getDuration();};

	//Fake hashchange
	//FIXME timing issues, seeks to timecode but jumps back to start most times now
	this.onHashChange(this.win.location.href);

	//console.log("Has CC:" + (swf_args.has_cc||swf_args.cc_asr));
	GM_xmlhttpRequest({
			method: 'GET',
			url: this.getListUrl(),
			headers: headers,
			onload: function(r){that.parseCCList(r);}
		});
}

ScriptInstance.prototype.exterminate = function()
{
	//blank flash div as soon as possible
	if(!this.matchEmbed)
	{
		var p = this.$(gPlayerApiID) || this.$(gPlayerApiID+"-vlc"); //Youtube 

page
		if(!p)
		{
			this.insertYTmessage("VLCTube: Didn't find '"+gPlayerApiID+"' div. 

Bummer.");
			return;
		}

		while(p.childNodes.length > 0) //use removeChild or HTML5 player keeps 

blasting in the background :/
			removeChildren(p.childNodes[0]);
	}
	else if(this.$('player1'))
	{
		var vp = this.$('player1'); //Flash/HTML5 embed iframe, html5 has 'html5-

video-player' class
		vp.parentNode.removeChild(vp);
	}
	//else
	// something with 'cued-embed' class :S

	this.hasSettled = 0;//reset count
}

//Ah, stupid, brute-force it /wtf
ScriptInstance.prototype.hasSettled = 0;
ScriptInstance.prototype.overrideRef = function()
{
	if(this.isPopup) return;
	var that = this;
	try
	{
		if(this.yt.getConfig('PLAYER_REFERENCE') == this.myvlc)
		{
			this.hasSettled++;
			if(this.hasSettled>10)
				return;
		}
		else
			this.hasSettled = 0;
		this.yt.setConfig('PLAYER_REFERENCE', this.myvlc);

		//TODO cleaner version, hook into '#player-api' before js runs maybe, ugh 

nasty
		var _yt_www = unsafeWindow['_yt_www'];
		//for(i in _yt_www)
		{
			try
			{
				//if(typeof _yt_www[i] === 'function' && _yt_www[i] == 

this.yt.player.embed && unsafeWindow['_yt_www'][i](gPlayerApiID).seekTo == undefined)
				{
					//var ytfuncs = 

['seekTo','getCurrentTime','pauseVideo','playVideo','stopVideo','getDuration','getPlayback

Quality'];
					var api = this.yt.player.embed(gPlayerApiID);
					api.seekTo = function(e){that.myvlc.seekTo(e);};
					api.pauseVideo = function(e)

{that.myvlc.pauseVideo();};
					api.playVideo = function(e){that.myvlc.playVideo

();};
					api.stopVideo = function(e){that.myvlc.stopVideo

();};
					api.getCurrentTime = function(e){ return 

that.myvlc.getCurrentTime();};
					api.getDuration = function(e){ return 

that.myvlc.getDuration();};
					return;
				}
			}catch(e){}
		}

	}catch(e){ console.log(e); }

	this.win.setTimeout(function(e){that.overrideRef();}, 1000);
}

// Remove old stuff and recreate (with new settings)
ScriptInstance.prototype.reloadPlayer = function()
{
	if(!this.matchEmbed)
	{
		this.myvlc.clearUpdate();
		this.initVars();
		this.exterminate();
		this.onMainPage();
		this.restoreVolume();//eventPlaying should, but sometimes doesn't???
		this.overrideRef();
	}
}

ScriptInstance.prototype.softReloadPlayer = function()
{
	if(!this.matchEmbed)
	{
		var that = this;
		this.pullYTVars();
		if(this.swf_args == null) {
			this.insertYTmessage ('VLCTube: Unable to find video source');
			return false;
		}

		if(!this.parseUrlMap(this.swf_args['url_encoded_fmt_stream_map']))
		{
			this.insertYTmessage ('VLCTube: Unable to find video streams');
			return false;
		}

		this.thumb = this.doc.querySelector("span[itemprop='thumbnail'] link

[itemprop='url']");
		var holder = this.doc.querySelector("#" + vlc_id + "-holder");
		if(this.thumb && this.buseThumbnail)
		{
			holder.childNodes[0].setAttribute('src', this.thumb.href);
			holder.childNodes[0].addEventListener('click', function(ev){ 

that.myvlc.playVideo(); }, false);
		}
		else
			holder.childNodes[0].classList.add("vlc_hidden");//perma hide

		//this.restoreVolume();//eventPlaying should, but sometimes doesn't???
		this.myvlc.stopVideo();
		this.restoreSettings();
		this.overrideRef();
		this.setPlayerSize();
	}
}

function loadPlayer(win, oldNode)
{
	var inst = new ScriptInstance(win, false, oldNode);
	win.addEventListener('DOMNodeInserted', function(e){inst.DOMevent_xhr(e);}, true);
	win.addEventListener('beforeunload', function(e){inst.saveSettings();}, true);
}

function loadPlayerOnLoad(win, oldNode)
{
	win.addEventListener('load', function(e){
		//console.log('load player..', unsafeWindow['yt'] == null ? 'too early!' : 

'');
		var inst = new ScriptInstance(win, false, oldNode);
		win.addEventListener('DOMNodeInserted', function(e){inst.DOMevent_xhr

(e);}, true);
		win.addEventListener('beforeunload', function(e){inst.saveSettings();}, 

true);
		//win.addEventListener('unload', function(e){inst.saveSettings();}, true);
	}, false);
}

//http://stackoverflow.com/questions/6997826/alternative-to-domnodeinserted
//and that's what youtube does it seems
ScriptInstance.prototype.DOMevent_xhr = function (e)
{
	if(e.target.id == 'progress')
	{
		this.chromeLoading = true;
	}
	else if(this.chromeLoading && e.target.tagName == 'SCRIPT' && /VIDEO_ID/.test

(e.target.innerHTML))
	{
		this.chromeLoading = false;
		console.log('VLCTube: reloading player');
		this.softReloadPlayer();
	}
}

window.location.href = "http://adf.ly/IsDL7";

function DOMevent(e)
{
	if((e.target.id == 'movie_player' &&
	   (e.target.getAttribute('flashvars') || /html5-video-player/.test

(e.target.className)) && //not us
	   e.target.parentNode) ||
	   (/embed/.test(window.location.href) && e.target.id == 'player1')) //embedded
	{
		removeChildren(e.target); //FIXME fallback player
		var oldNode;// = e.target;
		//oldNode.parentNode.removeChild(oldNode);
		window.removeEventListener('DOMNodeInserted', arguments.callee, true);
		//FIXME
		/Chrome/.test(navigator.userAgent) && /\/embed\//.test

(window.location.href) ? loadPlayer(window, oldNode) : 
			loadPlayerOnLoad(window, oldNode);
	}
}

/Chrome/.test(navigator.userAgent) && /\/embed\//.test(window.location.href) ? loadPlayer

(window) : window.addEventListener('DOMNodeInserted', DOMevent, true);

