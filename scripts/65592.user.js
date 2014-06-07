// ==UserScript==
// @name           Expand Flashplayer (YouTube, Viddler, Dailymotion, Blip.tv)
// @version        1.0.8
// @author         Justen Walker (http://www.justenwalker.com)
// @description    Creates a button which expands The flash player to fill your screen. Works on YouTube, Viddler, Dailymotion, Blip.tv.
// @include        http://www.viddler.com/*
// @include        http://www.dailymotion.com/video/*
// @include        http://blip.tv/*
// @include        http://*.blip.tv/*
// @include        http://www.youtube.com/watch*
// @require        http://usocheckup.redirectme.net/65592.js
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
function ExpandVideo() {
	var toolbarHeight = 32;
	var getBox = function(obj) {	
		var width = obj.clientWidth;
		if( width == 0 ) width = obj.width;
		var height = obj.clientHeight;
		if(height == 0 ) height = obj.height;



		var left = top = 0;
		if( obj.offsetParent ) {
			do {
				left += obj.offsetLeft;
				top  += obj.offsetTop;
			} while ( obj = obj.offsetParent);
		}
		return { left: left, top: top, width: width, height: height };
	};

	var showButton = function(box,button) {
		button.style.display = "";
		var left = (1.0*box.left + 1.0*box.width) - 102;
		var top = (1.0*box.top  - 22);
		button.style.left = left + 'px';
		button.style.top  =  top + 'px';
	};
	var hideButton = function(button) {
		button.style.display = "none";
	};

	var setBox = function(box,movie,player) {
		movie.width = box.width;
		movie.height = box.height;
		player.style.width = box.width + 'px';
		player.style.height = box.height + 'px';
		player.style.top = box.top + 'px';
		player.style.left = box.left + 'px';
	};

	var SetupPage = function() {
		var head = document.getElementsByTagName('head')[0];
		var html = head.innerHTML;
		head.innerHTML = html + [
 "<style type='text/css' >"
,".button-65592  { display: block; position: absolute; border: 1px solid #FF8800; background-color: #FFAA00; width: 100px; margin: 0px; padding: 0px; color: black; font-family: sans-serif; font-size: 10pt; height: 20px; z-index: 5001; }"
,".toolbar-65592 .button-65592  { display: inline; position: static; }"
,".button-65592:hover  { background-color: #FFEEAA;  }"
,".toolbar-65592 { position: absolute; left 0px; background-color: #ffa; color: #000; height: " + toolbarHeight + "px; width: 100%; z-index: 5000; text-align: center; }"
,".screen-65592  { position: absolute; z-index: 5000; background-color: #000; }"
,".body-65592  { overflow: hidden; }"
,"</style>"
		].join("\n");
	};
	var GeneralSetup = function()
	{
		var myself = this;
		// Get Objects
		if( ! this.embed_id ) {
			this.embed_id = this.get_video();
		}
		this.flash_movie = document.getElementById(this.embed_id);

		// Store the normal size of the player
		this.properties = getBox(this.flash_movie);
		var placeholder = document.createElement('div');
		placeholder.id = 'placeholder_65592';
		placeholder.style.width = this.properties.width +'px';
		placeholder.style.height = this.properties.height +'px';
		this.container = this.flash_movie.parentNode;
		this.btnExpand = document.createElement('button');
		this.my_player = document.createElement('div');
		this.my_player.className = 'screen-65592';

		var body = document.body;
		body.appendChild(this.my_player);
		body.appendChild(this.btnExpand);

		//Move the movie screen inside the container div
		var movie = this.flash_movie.cloneNode(true);
		this.container.insertBefore(placeholder,this.flash_movie);
		this.container.removeChild(this.flash_movie);
		this.my_player.appendChild(movie);
		this.flash_movie = movie;

		//Set the movie width/height
		setBox(this.properties,this.flash_movie,this.my_player);
		showButton(this.properties,this.btnExpand);

		// Style & position the Expand Button
		this.btnExpand.innerHTML = 'Expand';
		this.btnExpand.className = 'button-65592';
		
		this.btnExpand.onclick = function() { 
			myself.expand();
		}
		window.onresize = SnapToPlaceholder;
		if( this.adjust ) this.adjust('setup');
	};
	var GeneralExpand = function()
	{
		var myself = this;

		hideButton(this.btnExpand);

		// Create [Normal Size] Button
		this.btnNormal = document.createElement('button');
		this.btnNormal.innerHTML = 'Normal Size';
		this.btnNormal.className = 'button-65592';
		this.btnNormal.onclick = function() {
			setBox(myself.properties,myself.flash_movie,myself.my_player);
			showButton(myself.properties,myself.btnExpand);
			document.body.removeChild(myself.toolbar);
			//document.body.className = document.body.className.replace(/ body-65592/,'');
			window.onresize = SnapToPlaceholder;
		};

		// Create Toolbar
		this.toolbar = document.createElement('div');
		this.toolbar.className = 'toolbar-65592';
		this.toolbar.appendChild(this.btnNormal);
				
		// Expand Flash Player
		this.my_player.className = 'screen-65592';

		// Setup Page
		document.body.appendChild(this.toolbar);
		//document.body.className += ' body-65592'; 
		this.resize();
		window.onresize = function() { myself.resize(); }
		if( this.adjust ) this.adjust('expand');
	};
	var GeneralResize = function() {
		var w = window.innerWidth;
		var h = window.innerHeight - toolbarHeight;
		setBox({
			top: 0, left: 0,
			width: w, height: h
		},this.flash_movie,this.my_player);
		this.toolbar.style.top = h + 'px';
		if( this.adjust ) this.adjust('resize');
	};
	var SnapToPlaceholder = function() {
		var placeholder = document.getElementById('placeholder_65592');
		if(placeholder) {
			var box = getBox(placeholder);
			if(box) {
				setBox(box,this.flash_movie,this.my_player);
			}
		} 	
	};

	var modules = {
		viddler: {
			embed_id: 'viddler',
			setup: GeneralSetup,
			expand: GeneralExpand,
			resize: GeneralResize,
			adjust: function(type) {
				if( type == 'setup' )
				{
					// Get the author ID and Video ID
					// Store the normal size of the player
					var info = document.getElementById('smLinkValue').value;
					var info_re = /([^\/]+)\/videos\/([0-9]+)/;
					var matches = info_re.exec(info);
					this.properties['author'] = matches[1];
					this.properties['vidid'] = matches[2];
				}
				if( type == 'expand' ) 
				{
					var myself = this;
					// Create [Next Video] Button
					this.btnNext = document.createElement('button');
					this.btnNext.innerHTML = 'Next Video';
					this.btnNext.className = 'button-65592';
					this.btnNext.onclick = function() { myself.next_video(); }
					this.toolbar.appendChild(this.btnNext);
				}
			},
			next_video: function() {
				var url = 'http://viddler.com/explore/' + this.properties.author + '/videos/' + parseInt( this.properties.vidid*1.0 + 1.0 );
				window.location = url;
			}
		},
		dailymotion: {
			get_video : function() {
				var elms = document.getElementsByTagName('embed');
				for( var i = 0; i < elms.length; ++i )
				{
					var embed = elms[i];
					var id = embed.id;

					if( id.search(/video_player_/) > -1 )
					{
						return id;
					}
				}
				return null;
			},
			embed_id: null,
			setup: GeneralSetup,
			expand: GeneralExpand,
			resize: GeneralResize
		},
		bliptv: {
			embed_id: 'BlipPlayer_embed',
			/* 
				Quick hack to let blip create its player object before I start searching for it.
				Not sure why its not loaded with the page anymore - seems excessive.
			*/
			setup: function() {
				var myself = this;
				setTimeout(function() { GeneralSetup.call(myself); },2000);
			},
			expand: GeneralExpand,
			resize: GeneralResize
		},
		youtube: {
			embed_id: 'movie_player',
			setup: GeneralSetup,
			expand: GeneralExpand,
			resize: GeneralResize
		}
	};

	SetupPage();
	// Viddler Setup
	if( /viddler[.]com/.test(window.location) ) {
		modules.viddler.setup();
	}
	// Dailymotion Setup
	if( /dailymotion[.]com/.test(window.location) ) {
		modules.dailymotion.setup();
	}
	// Blip.tv Setup
	if( /blip[.]tv/.test(window.location) ) {
		modules.bliptv.setup();
	}
	// YouTube Setup
	if( /youtube[.]com/.test(window.location) ) {
		modules.youtube.setup();
	}
}
var code = "(" + ExpandVideo + ")();";
document.body.appendChild(document.createElement("script")).innerHTML=code;
