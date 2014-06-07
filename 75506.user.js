// ==UserScript==
// @name           Mangafox Chapter Onepage Rev.2
// @namespace      Knace
// @description    [Firefox|Chrome] A mangafox.com script: Loads the entire chapter into a single page. Allows for easy reading and page saving. Can be read vertically or horizontally (great for wide screen monitors). See description for full feature list & details.
// @version        2.6.1
// @include        *.mangafox.com/manga/*
// ==/UserScript==

//{ Global Variables
	//! HardCoded Values (For advance users only)
	var config_version = 11;			// Must always be the same as default value */
	var page_loader = 2;			// Number of Max Active Xmlhttp requests
		var loader_count = 0;		// Keepts track of loaders
		var delay = 750;			// Time in between requests
	var timeout = 6000;				// Time before retrying, even numbers only
	var maxRetries = 1;				// Amount of times to retry page
	var markRestart = '#AA3333';	// Color of background telling restart is needed
	var eocSize = 300;				// Size of EOC label
	var guessedImgWidth = 1500;		// Width Buffer to prevent floating div wrapping


	//! Globals
	var enableEOC;
	var docElement = window.chrome ? document.body:document.documentElement;	/** For scrollSize, use document.documentElement for clientSize */
	var layout;
	var menu_display;
	var imgSize;
	var scrollbarSize;
		var bigZ;
		var smallZ;
		var scrollResponse;
		var noDragDelay;
	var bodyWidth = eocSize+10;
	var mDirection = 1;				// 1 = manga, -1 = Manhwa, Must start as 1
	var wheelEvent;
	if( !window.chrome )
		wheelEvent = 'DOMMouseScroll';
	else
		wheelEvent = 'mousewheel';
	var loadComplete = false;
//}
//{ Things to do with config values : Gathering data
	function resetConfig() {
		//! Default Values
		localStorage.setItem('config_version', 11);
		localStorage.setItem('layout', 'vertical');
		localStorage.setItem('menu_display', '');
		localStorage.setItem('imgSize', 'auto');
		localStorage.setItem('scrollbarSize', 20);
			localStorage.setItem('smallZ', 4);
			localStorage.setItem('bigZ', 20);
			localStorage.setItem('scrollResponse', 50);
			localStorage.setItem('noDragDelay', 0);
		localStorage.setItem('manhwaList', '');
		localStorage.setItem('enableEOC', 3);
	}
	function getConfig() {
		config_version = localStorage.getItem('config_version') != null ? localStorage.getItem('config_version') : config_version;
		layout = localStorage.getItem('layout') != null ? localStorage.getItem('layout') : layout;
		menu_display = localStorage.getItem('menu_display') != null ? localStorage.getItem('menu_display') : menu_display;
		imgSize = localStorage.getItem('imgSize') != null ? localStorage.getItem('imgSize') : imgSize;
		scrollbarSize = localStorage.getItem('scrollbarSize') != null ? parseInt(localStorage.getItem('scrollbarSize')) : scrollbarSize;
			smallZ = localStorage.getItem('smallZ') != null ? parseInt(localStorage.getItem('smallZ')) : smallZ;
			bigZ = localStorage.getItem('bigZ') != null ? parseInt(localStorage.getItem('bigZ')) : bigZ;
			scrollResponse = localStorage.getItem('scrollResponse') != null ? parseInt(localStorage.getItem('scrollResponse')) : scrollResponse;
			noDragDelay = localStorage.getItem('noDragDelay') != null ? parseInt(localStorage.getItem('noDragDelay')) : noDragDelay;
		manhwaList = localStorage.getItem('manhwaList') != null ? localStorage.getItem('manhwaList') : manhwaList;
		enableEOC = localStorage.getItem('enableEOC') != null ? localStorage.getItem('enableEOC') : enableEOC;
	}
	
	
	//! Load page specific information
	// Should fail spectacularly on non-manga pages but invisible to users unless looked at js error log
	/** Note: The '/' added on to fix in rare case url with directory doesn't end in a slash */
	var tArray = (window.location.href+'/').match(/http:\/\/(www|beta)\.mangafox\.com\/manga\/([^\/]*)\/((?:v[^\/]*\/)?c[^\/]*)\/*(\d*)/);
		var beta = tArray[1];
		var url_manga = tArray[2];

		var url_chapter = tArray[3];
		var page = tArray[4] != '' ? parseInt(tArray[4]) : 1;
			var jump = page > 1 ? page : -1;
			//var loader_i = page > 2 ? page-3 : page-1;	// TODO: Renabled; Disabled middle page loading until scrolling code is added to deal with loaded pages 
			var loader_i = page-1;
		delete tArray;
		
	var url_directory = 'http://'+beta+'.mangafox.com/manga/'+url_manga + '/';
	var selects = document.getElementsByTagName('select');
		var total_images = selects[1].length;
		var pg_selecter = selects[1].innerHTML;

		var s = selects[0];
			var ch_selecter = s.innerHTML;
			var si = s.selectedIndex;
		var directory = url_directory;
			if( beta == 'beta' ) { directory=''; }
		var chapter_prev = directory;
			if( si > 0 ) { chapter_prev += s.options[si-1].value + '/'; }
		var chapter_next = directory;
			if( si+1 < s.length ) { chapter_next += s.options[si+1].value + '/'; }
		delete directory; delete s;
	delete selects;

	//! Check if user's config is correct
	if( localStorage.getItem('config_version') != config_version ) { resetConfig(); }
	getConfig();

//}
//{ Manhwa Detection
	if( manhwaList.indexOf(url_manga+'\n') > -1 )
		mDirection = -1;
//}

//{ Css definition and functions
	var styleShared = '\
		html, body { margin:0; padding:0; } \n\
			body, img, #scrollPad { user-select: none; -khtml-user-select: none; -moz-user-select: none; } \n\
		#mu { z-index:9000; position:fixed; background:#FFFFFF; border:solid #000000 medium; padding:1px; text-align:left; opacity:0.8; } \n\
			#mu:hover { opacity:1; } \n\
			#chapters { max-width:35%; } \n\
			#chapters option { max-width:600px; } \n\
			.cfgButton { background-color:#aaccff; height:100%;} \n\
			.cfgSelect { background-color:#aaffcc; } \n\
			.cfgInput { background-color:#ddffff; text-align:center; height:100%; } \n\
			.cfgSearch { background-color:#ffffDD; width:99%; } \n\
		#body { '+( scrollbarSize==0 ? '':'cursor:move;' )+' } \n\
			.header, .EOC { border-style:outset; border-width:thin 0px thin 0px; cursor:pointer; } \n\
			.header { font:xx-small; } \n\
				.refreshLink {  } \n\
				.toggleVisibility {  } \n\
				.bookmark {  } \n\
			.EOC { vertical-align:middle !important; text-align:center; font:x-small; } \n\
		#scrollPad { z-index:1; position:fixed; background-color:#000033; }  \n\
			#padUp, #padDown { z-index:1; position:fixed; background-color:#66eeee; cursor:pointer; } \n\
			#marker { z-index:2; background-color:#FFFF00; position:fixed; } \n\
			select:hover { display:;} \n\
			option:hover { display:; } \n\
	';
	
	log("enableEOC",enableEOC);
	switch( enableEOC ) {
		case '0':
			styleShared += '.EOC { display:none !important; } \n'
			break;
		case '1':
			styleShared += '.EOC { background-color:#000000; color:#FFFFFF; } \n'
			break;
		case '3':
			styleShared += '.EOC { background-color:#DDDDDD; color:#000000; } \n'
			break;
		case '4':
			styleShared += '.EOC { background-color:#990000; color:#FFFFFF; } \n'
			break;
		case '5':
			styleShared += '.EOC { background-color:#000099; color:#FFFFFF; } \n'
			break;
		default:
			styleShared += '.EOC { background-color:#666666; color:#FFFFFF; } \n'
	}

	
	
	//TODO: add variables to determine if recalc is needed and only perform then
	var styleVertical;
	var	styleManga;
	var styleManhwa;
	function updateLayout( updateStyles ) {
		if( updateStyles ) {
			styleVertical = '\
				body { padding-right:'+scrollbarSize+'px; } \n\
				img { width:'+imgSize+'; } \n\
				span { display:block; } \n\
				#mu { max-width:98%; top:1%; left:1%; } \n\
				#body { width:'+imgSize+'; } \n\
				.page { width:'+imgSize+'; display:block; } \n\
					.refreshLink, .toggleVisibility, .bookmark { background-color:#000000; color:#FFFFFF; } \n\
					.refreshLink:hover, .toggleVisibility:hover, .bookmark:hover { background-color:#006666; color:#FFFFFF; } \n\
					.refreshLink { float:left; width:10%;  } \n\
					.toggleVisibility { float:left; width:80%; } \n\
					.bookmark { float:right; width:10%;} \n\
				.EOC { min-height:'+eocSize+'px; height:auto !important; height:'+eocSize+'px;  } \n\
				#scrollPad { top:4%; right:0px; width:'+scrollbarSize+'px; min-height:92%; height:auto !important; height:92%; cursor:s-resize; }  \n\
					#padUp, #padDown { right:0px; width:'+scrollbarSize+'px; min-height:4%; height:auto !important; height:4%; } \n\
					#padUp { top:0px; } \n\
					#padDown { bottom:0px; } \n\
					#marker { right:0px; width:'+scrollbarSize+'px; min-height:1px; height:auto !important; height:1px } \n\
			';
			
			styleHorizontal = '\
				body { padding-bottom:'+scrollbarSize+'px; } \n\
				#mu { max-width:'+Math.round(.65*document.documentElement.clientWidth)+'%; top:1%; } \n\
				#body { position:absolute; top:0px; } \n\
				.page { padding-left:.1em; width:auto; } \n\
				.header { font:xx-small; width:1em; white-space:nowrap; -webkit-transform:rotate(90deg); -moz-transform:rotate(90deg); -o-transform: rotate(90deg); } \n\
					.refreshLink, .toggleVisibility, .bookmark { display:inline; background-color:#000000; color:#FFFFFF; } \n\
						.refreshLink:hover, .toggleVisibility:hover, .bookmark:hover { background-color:#006666; color:#FFFFFF; } \n\
					.refreshLink { padding-left:1em; padding-right:1em; } \n\
					.toggleVisibility { padding-left:8em; padding-right:8em; } \n\
					.bookmark { padding-left:2em; padding-right:2em; } \n\
				img, .EOC { height:'+ ((imgSize.indexOf('%')>-1) ? Math.round((parseInt(imgSize)/100)*(document.documentElement.clientHeight-scrollbarSize))+'px':imgSize )+'; } \n\
				.EOC { width:'+eocSize+'px !important; } \n\
				#scrollPad { left:4%; bottom:0px; width:92%; min-height:'+scrollbarSize+'px; height:auto !important; height:'+scrollbarSize+'px; cursor:e-resize; }  \n\
					#padUp, #padDown { bottom:0px; width:4%; min-height:'+scrollbarSize+'px; height:auto !important; height:'+scrollbarSize+'px; } \n\
					#padUp { left:0px; } \n\
					#padDown { right:0px; } \n\
					#marker { bottom:0px; width:1px; min-height:'+scrollbarSize+'px; height:auto !important; height:'+scrollbarSize+'px; } \n\
			';
			styleManga = styleHorizontal + '\
				#mu { left:1%; } \n\
				.page { padding-left:.1em; float:right; } \n\
				.header { float:right; width:1em; } \n\
				img { float: left; } \n\
			';
			styleManhwa = styleHorizontal + '\
				#mu { right:1%;  } \n\
				.page { padding-left:.1em; float:left; } \n\
				.header { float:right; width:1em; } \n\
				img { float:left; } \n\
			';
		}
	
		if( layout == 'vertical' ) {
			setStyle('layout', styleVertical);
			div_body.style.width = imgSize;
		} else if( mDirection == 1 ) {
			setStyle('layout', styleManga);
			div_body.style.width = bodyWidth+'px';
			var lenght = document.images.lenght;
			for(var i=0;i<lenght;++i) {document.images[i].style.display=""}
		} else {
			setStyle('layout', styleManhwa);
			div_body.style.width = bodyWidth+'px';
			var lenght = document.images.lenght;
			for(var i=0;i<lenght;++i) {document.images[i].style.display=""}
		}
		
		if( scrollbarSize != 0 ) {
			var variables = 'layout="'+layout+'";mDirection='+mDirection+';';
			addScript( false, variables, function(){} );
		}
	}
	
	function updateBody() {
		if( loadComplete ) {
			bodyWidth = 0;
			var elements = document.getElementsByClassName('page');
			var length = elements.length;
			log('lenght',length);
			for( var i = 0; i<length; ++i ) {
				bodyWidth += elements[i].offsetWidth;
			}
			div_body.style.width = (bodyWidth+10)+'px';
		}
	}
//}


//{ Page Adding Functions
	function setStyle( id, css ) {
		var div = document.getElementById(id);
		if( div == null ) {
			var div = element = document.createElement('div');
				div.id = id;
				var element = document.createElement('style');
					element.type = 'text/css';
					element.textContent = css;
				div.appendChild(element);
			document.body.appendChild(div);
		} else {
			var element = document.createElement('style');
				element.type = 'text/css';
				element.textContent = css;
			div.replaceChild(element,div.firstChild);
		}
	}

	function addScript(clean, preScript, script) {
		var code = '\n';
		for( i=2; i<arguments.length; ++i ) code += '('+arguments[i]+')();\n\n';
		var element = document.createElement('script');
			element.type = 'application/javascript';
			element.textContent = preScript + code;
		document.body.appendChild( element );
		if( clean )
			document.body.removeChild( element );
	}

//}


//{ Prepare page: Clear page, Set CSS style, Create floating menu
	document.body.parentNode.replaceChild( document.createElement('body'), document.body )

	setStyle('mainCSS', styleShared );
	
	//! Create Menu
	var div_mu = document.createElement('div');
		div_mu.id = 'mu';
		div_mu.innerHTML = '<div onmouseover="javascript:document.getElementById(\'hoverHide\').style.display=\'block\';" onmouseout="javascript:document.getElementById(\'hoverHide\').style.display=\'none\';"><a id="cfg_settings" href="javascript://Open Settings">[S]</a>: <a href="http://www.mangafox.com">MF</a> / <a href="'+url_directory+'">'+url_manga.slice(0,32)+'</a> / <a href="'+chapter_prev+'">&lt;&lt;</a> <select id="chapters" onchange="change_chapter(this)">'+ch_selecter+'</select> <a href="'+chapter_next+'">&gt;&gt;</a> / <select id="goto">'+pg_selecter+'</select> ('+total_images+' Images) <a href="javascript://Set Manhwa?" id="cfg_manhwa">Manhwa?</a><div id="hoverHide" style="display:none"><form id="formSearch" action="/search.php" method="get"><input id="goSearch" value="Search: " class="cfgButton" type="submit">: <select id="direction"><option value="">All Types</option><option value="&direction=rl">Manga</option><option value="&direction=lr">Manhwa</option></select> <select id="genres"><option value="">ALL Genres</option><option value="&genres[Shounen]=2&genres[Shoujo]=2">Adults</option><option value="&genres[Seinen]=2&genres[Josei]=2&genres[Mature]=2&genres[Yaoi]=2&genres[Yuri]=2">Kids</option><option value="&genres[Shoujo]=2&genres[Josei]=2&genres[Shounen+Ai]=2&genres[Yaoi]=2">Males</option><option value="&genres[Shounen]=2&genres[Seinen]=2&genres[Shoujo-Ai]=2&genres[Yuri]=2">Females</option></select> <select id="constraint"><option value="">ALL</option><option value="&released_method=eq&released='+(new Date()).getFullYear()+'">This Year</option><option value="&is_completed=1">Completed</option><option value="&is_completed=2">Not Completed</option></select> <a href="http://www.mangafox.com/directory/?advopts">Advance</a><input id="searchTXT" class="cfgSearch" name="name" type="text" value="" maxlength="100"></form><div id="settings" style="display:none"><div style="background-color:#000; min-height:1px; height:auto !important; height=1px;"></div><div>Image Layout: <select id="cfg_layout" class="cfgSelect"><option value="vertical">Vertical</option><option value="horizontal">Horizontal</option></select></div><div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Scale: <input id="cfg_imgSize" class="cfgInput" size="4" type="text" value="'+imgSize+'" /><input id="cfg_img" class="cfgButton" type="button" value=":Size" /> [#px,#em,#%,auto]</div><div style="background-color:#000; min-height:1px; height:auto !important; height=1px;"></div><div>Custom Scroll: <select id="cfg_scrollbar" class="cfgSelect"><option value="0">None</option><option value="10">X-Small</option><option value="20">Small</option><option value="30">Medium</option><option value="40">Large</option><option value="50">X-Large</option><option value="60">XX</option><option value="70">XXX</option></select> [<input id="smallZ" class="cfgInput" size="3" type="text" value="'+smallZ+'" /> < <input id="bigZ" class="cfgInput" size="3" type="text" value="'+bigZ+'" />]<input id="cfg_ScrollSpeed" class="cfgButton" type="button" value=":Speed" /> [1-100]</div><div> &nbsp; &nbsp; &nbsp; &nbsp;Reponse: <select id="cfg_response" class="cfgSelect"><option value="10">1:Fast</option><option value="20">2:F+</option><option value="30">3:F</option><option value="40">4:N+</option><option value="50">5:Norm</option><option value="60">6:N-</option><option value="70">7:S+</option><option value="80">8:S</option><option value="90">9:S-</option><option value="100">10:Slow</option></select> &nbsp; <input id="cfg_noDragDelay" type="checkbox" /> Disable Drag Delay</div><div style="background-color:#000; min-height:1px; height:auto !important; height=1px;"></div><div>EOC looks: <select id="cfg_EOC" class="cfgSelect"><option value="0">Disable</option><option value="1">Black</option><option value="2">Gray</option><option value="3">White</option><option value="4">Red</option><option value="5">Blue</option></select> </div><div style="background-color:#000; min-height:1px; height:auto !important; height=1px;"></div><br><div style="background-color:#000; min-height:1px; height:auto !important; height=1px;"></div><div style="text-align:center"><input type="button" class="cfgButton" id="cfg_reset" value="RESET CONFIG" /> &nbsp; &nbsp; <input id="restart" type="button" class="cfgButton" value="RESTART PAGE" onclick="javascript:location.reload(true)" /></div></div></div></div>';
		div_mu.style.display = menu_display; 
		document.body.appendChild(div_mu);
	document.getElementById('chapters').selectedIndex = si;

	
	//{ Bind menu element to function
		function addToPage() {
			//Prevent keyboard shortcuts & mouse on menu
			var stopEvent = document.getElementById('mu');
			stopEvent.addEventListener('keypress', function(evt) {evt.stopPropagation();}, false);
			stopEvent.addEventListener('mousedown', function(evt) {evt.stopPropagation();}, false);
		
			function onChange(evt) {
				var value = evt.target.value;
				try {
					var element = document.getElementById('p'+value);
						element.style.display='';
						element.scrollIntoView(true);
				} catch(err) {
					jump = value;
					sendRequest(value);
				}
			}
			document.getElementById('goto').addEventListener('change',onChange,false);
			
			function onSubmit(evt) {
				evt.preventDefault();
				window.location = '/search.php?name_method=cw&name='+document.getElementById('searchTXT').value+document.getElementById('direction').value+document.getElementById('genres').value+document.getElementById('constraint').value+'&advopts=1';
				return false;
			}
			document.getElementById('formSearch').addEventListener('submit',onSubmit,false);
			
			function advanceElement(direction) {
				var positionX = Math.floor( document.documentElement.clientHeight / 2 );
				var positionY = Math.floor( document.documentElement.clientWidth / 2 );
				if( window.chrome || window.opera ) {
					positionX = window.pageXOffset + positionX;
					positionY = window.pageYOffset + positionY;
				}
				var menuState = div_mu.display;
				div_mu.display = 'none';
				var element = document.getElementById( 'p' + (parseInt(document.elementFromPoint( positionX, positionY ).id)+direction) );
				if( element.id == 'body' ) element = document.getElementById( 'p' + (parseInt(document.elementFromPoint( positionX+(direction*50), positionY+(direction*50) ).id)+direction) );   // in case it caught in between the spacing cause by the headers
				div_mu.display = menuState;

				//TODO: Decide which method is better or provide option to change
				if( mDirection == 1 )
					//window.scrollTo( Math.floor(element.offsetLeft-((document.documentElement.clientWidth-element.offsetWidth))), window.pageYOffset );   //Right Align Jump, backwards jump in hor seems broken
					//window.scrollTo( Math.floor(element.offsetLeft-((document.documentElement.clientWidth-element.offsetWidth)/2)), window.pageYOffset );   //Center Jump
					window.scrollTo( element.offsetLeft, window.pageYOffset );   //left align, for now, most consistant
				else
					window.scrollTo( element.offsetLeft, window.pageYOffset );   //Center Width Align
				
				element.scrollIntoView(true);   //Align by top

			}
			

			//{ Register keys
				if( window.chrome ) {
					function keycodesChrome(evt) {
						if(evt.keyCode == 37) { window.location=chapter_prev; }   // Left Arrow
						if(evt.keyCode == 39) { window.location=chapter_next; }   // Right Arrow
					}
					document.addEventListener('keydown', keycodesChrome, false);
				}
				function keycodes(evt) {
					if(evt.charCode == 96) {  toggleMenu(); }   // Tilde Key
					if(evt.charCode == 113) { advanceElement(mDirection) }   // Q
					if(evt.charCode == 101) { advanceElement(-1*mDirection) }   // E
					if(evt.keyCode == 37 || evt.charCode == 122) { window.location=chapter_prev; }   // Left Arrow ||  Z
					if(evt.keyCode == 39 || evt.charCode == 120) { window.location=chapter_next; }   // Right Arrow || X
					if(evt.charCode == 97) { window.scrollTo(window.pageXOffset-(bigZ*2), window.pageYOffset ); }   // A
					if(evt.charCode == 119) { window.scrollTo(window.pageXOffset, window.pageYOffset-(bigZ*2) ); }   // W
					if(evt.charCode == 115) { window.scrollTo(window.pageXOffset, window.pageYOffset+(bigZ*2) ); }   // S
					if(evt.charCode == 100) { window.scrollTo(window.pageXOffset+(bigZ*2), window.pageYOffset ); }   // D
				}
				document.addEventListener('keypress', keycodes, false);
				
				function toggleMenu() {
					var menu = document.getElementById('mu');
					if( menu.style.display == 'none' ) {
						menu_display = '';
					} else {
						menu_display = 'none';
					}
					menu.style.display = menu_display;
					localStorage.setItem('menu_display', menu_display);
				}
			//}
			
		}
		addScript(false, 'var div_mu=document.getElementById("mu").style;var layout="'+layout+'";var mDirection='+mDirection+';var chapter_prev="'+chapter_prev+'";var chapter_next="'+chapter_next+'";', addToPage);


		var element = document.getElementById('cfg_noDragDelay');
			element.checked = (noDragDelay == 1) ? true : false;
			element.addEventListener('click',cfgDragDelay,false);
		function cfgDragDelay(evt) {
			noDragDelay = (evt.currentTarget.checked == true) ? 1 : 0;
			localStorage.setItem('noDragDelay', noDragDelay);
		}

		element = document.getElementById('cfg_EOC');
			element.selectedIndex = enableEOC;
			element.addEventListener('change',cfgEOC,false);
		function cfgEOC(evt) {
			document.getElementById('settings').style.backgroundColor=markRestart;
			enableEOC = parseInt( evt.currentTarget.value );
			log("set enableEOC",enableEOC);
			localStorage.setItem('enableEOC', enableEOC);
		}



		document.getElementById('cfg_settings').addEventListener('click',cfgOpen,false);
		function cfgOpen(evt) {
			var element = document.getElementById('settings');
			if( element.style.display == 'none' ) {
				element.style.display = 'block'
			} else {
				element.style.display = 'none'
			}
		}

		element = document.getElementById('cfg_scrollbar');
			element.selectedIndex = (scrollbarSize / 10);
			element.addEventListener('change',cfgScroll,false);
		function cfgScroll(evt) {
			document.getElementById('settings').style.backgroundColor=markRestart;

			scrollbarSize = parseInt( evt.currentTarget.value );
			localStorage.setItem('scrollbarSize', scrollbarSize);
		}
		
		document.getElementById('cfg_ScrollSpeed').addEventListener('click',cfgScrollSpeed,false);
		function cfgScrollSpeed(evt) {
				smallZ = parseInt( document.getElementById('smallZ').value );
				bigZ = parseInt( document.getElementById('bigZ').value );
				localStorage.setItem('smallZ', smallZ);
				localStorage.setItem('bigZ', bigZ);
		}


		document.getElementById('cfg_img').addEventListener('click',cfgImg,false);
		function cfgImg(evt) {
			imgSize = document.getElementById('cfg_imgSize').value;
			localStorage.setItem('imgSize', imgSize);
			updateLayout(true);
			updateBody();
		}

		element = document.getElementById('cfg_response');
			element.selectedIndex = ((scrollResponse/10) - 1);
			element.addEventListener('change',cfgResponse,false);
		function cfgResponse(evt) {
			document.getElementById('settings').style.backgroundColor=markRestart;
			
			scrollResponse = parseInt( evt.currentTarget.value );
			localStorage.setItem('scrollResponse', scrollResponse);
		}

		element = document.getElementById('cfg_reset');
			element.addEventListener('click',cfgReset,false);
		function cfgReset(evt) {
			if( confirm("Are you sure?") ) {
				document.getElementById('settings').style.backgroundColor=markRestart;
				resetConfig();
			}
		}
		
		element = document.getElementById('cfg_layout');
			element.selectedIndex = ( (layout == 'vertical') ? 0:1 );
			element.addEventListener('change',cfgLayout,false);
		function cfgLayout(evt) {
			document.getElementById('settings').style.backgroundColor=markRestart;

			layout = evt.currentTarget.value;
			localStorage.setItem('layout', layout);

			updateLayout(false);
		}

		element = document.getElementById('cfg_manhwa');
			element.addEventListener('click',cfgManhwa,false);
		function cfgManhwa(evt) {
			document.getElementById('settings').style.backgroundColor=markRestart;

			localStorage.setItem('manhwaList', manhwaList);

			if( mDirection == 1 ) {
				if( confirm('Set this as a Manhwa? (Left to Right)') ) {
					manhwaList += (url_manga+'\n');
					mDirection = -1;

					localStorage.setItem('manhwaList', manhwaList);
					updateLayout(false);
					window.scrollTo(  0, window.pageYOffset );
				}
			} else {
				if( confirm('Set this as a Manga? (Right to Left)') ) {
					manhwaList = manhwaList.replace( (url_manga+'\n'), '' );
					mDirection = 1;
					localStorage.setItem('manhwaList', manhwaList);
					updateLayout(false);
					window.scrollTo( docElement.scrollWidth, window.pageYOffset );
				}
			}
		}
	//}

	delete element;
//}


//{ Start filling in data placeholders
	var div_body = document.createElement('div');
		div_body.id = 'body';
		var html='';
			for( var i = 1; i<=  total_images; ++i ) { html += '<span id="p'+i+'" class="page"></span>'; }
			html += '<span id="EOC" class="page EOC" onClick="javascript:location.href=\''+chapter_next+'\'"><br><br><br><br><br><br>***End of '+url_chapter+'***<br><br>Click here to go to next chapter.<br><br><br><br><br><br><br><br><br></span>';
		div_body.innerHTML = html;
		delete html;
		div_body.addEventListener('mousedown', function(evt) { evt.preventDefault(); }, false);
	document.body.appendChild(div_body);
	
	updateLayout(true);	
//}


//{ Image Loading Code : Grab page to find img src
	function sendRequest(i) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url_directory+url_chapter+'/'+i+'.html');
		var retries = ( arguments.length == 2 )? arguments[1]:0;
		xmlhttp.onreadystatechange = function() { return stateChange( xmlhttp, i, retries ); };   
		xmlhttp.send(null);
	}

	function stateChange( xmlhttp, i, retries ) {
		if( xmlhttp.readyState==4 ) {
			if( xmlhttp.status!=200 ) {
				if( retries != maxRetries ) {
					++retries;
					window.setTimeout( sendRequest, timeout, i, retries );
				}
			} else {
				var expression = /<img.*?src="(.*?)".*?id="image".*?>/
					if( beta == 'beta' ) { expression = /defaultImg='(.*?\.(?:jpg|png))';/ }
				var data_src = xmlhttp.responseText.match(expression);
				var data_bookmark = xmlhttp.responseText.match(/series_id'?(?:=|:)'?(\d*)'?,'?chapter_id'?(?:=|:)'?(\d*)/);
				var bookmark = "new Request({url:'http://"+beta+".mangafox.com/ajax/bookmark.php',method:'post',evalScripts:true}).send('action=add&series_id="+data_bookmark[1]+"&chapter_id="+data_bookmark[2]+"&page="+i+"')";

				var html = '';
					html += '<span id="h'+i+'" class="header"><span class="refreshLink" onClick="element=document.getElementById(\'\'+'+i+');element.src=element.src.split(\'?\')[0]+\'?\'+Math.random();" align="left">[R]</span><span class="toggleVisibility" onClick="imgToggle('+i+')">('+i+' of '+total_images+')</span><span class="bookmark"onClick="'+bookmark+'">Bookmark</span></span>';
					html += '<img id="'+i+'" src='+data_src[1]+'></img>';

					
				document.getElementById('p'+i).innerHTML = html;
				
				var img = document.getElementById(''+i)
					function imgLoad(evt,i) {
						if( layout != 'vertical' ) {
							var offset = document.getElementById('p'+i).offsetWidth;
							bodyWidth += offset;
							if( document.images.length == total_images ) {
								var diff = docElement.scrollWidth - document.documentElement.clientWidth - window.pageXOffset;
								div_body.style.width = bodyWidth+'px';
								if( mDirection == 1 ) { window.scrollTo( (docElement.scrollWidth - document.documentElement.clientWidth - diff), window.pageYOffset ); }
								loadComplete = true;
							}
						}
						if( jump == i ) { jump = -1; evt.currentTarget.scrollIntoView(true); }
					}
					img.addEventListener('load', function(evt) { return imgLoad(evt,i); }, false);

				--loader_count;
				window.setTimeout( image_checker, timeout, i, 0 );
			}
		}
	}

	//! Manual Image timeout refresh
	function image_checker(i, retries) {
		if( retries != maxRetries) {
			++retries;
			var img = document.getElementById(''+i);
			if( !img.complete ) {
				img.src = img.src.split('?')[0]+'?'+Math.random();
				window.setTimeout( image_checker, timeout+(timeout/2), i, retries );
			}
		}
	}
//}


//{ Scrolling Code

	var variables = 'var scrollbarSize='+scrollbarSize+';var wheelEvent="'+wheelEvent+'";var layout="'+layout+'";var mDirection='+mDirection+';var noDragDelay='+noDragDelay+';var scrollResponse='+scrollResponse+';var smallZ='+smallZ+';var bigZ='+bigZ+';';

	window.sharedCode = function() {

		window.imgToggle = function(i) {
			var img = document.getElementById(''+i);
			var body = document.getElementById('body');
			if( img.style.display == '' ) {
				if( layout == 'horizontal' ) body.style.width = (body.offsetWidth - img.offsetWidth) + 'px';
				img.style.display = 'none';
			} else {
				img.style.display='';
				if( layout == 'horizontal' ) body.style.width = (body.offsetWidth + img.offsetWidth) + 'px';
			}
		}
		

		if( scrollbarSize != 0 ) {

			//! Hide scrollbar
			document.body.style.overflow='hidden';
		

			var docElement = window.chrome ? document.body:document.documentElement;
			var menuState;
			
			
			//! Forward Declaration
			window.updateMarker = function() {};

			var smallX = smallZ;
			var bigX = bigZ;
			var smallY = smallZ;
			var bigY = bigZ;
				if( layout == 'vertical' ) {
					smallX = 0;
					bigX = 0;
				} else {
					smallY = 0;
					bigY = 0;
				}
			var mloop = -1;
				var referenceX;
				var referenceY;
				var muliplyerX = 0;
				var muliplyerY = 0;

				
			//{ Dynamic Scroll speed settings
				function cfgScrollSpeed2(evt) {
					X = 0;
					Y = 0;
					smallX = parseInt(document.getElementById('smallZ').value);
					smallY = parseInt(document.getElementById('smallZ').value);
					bigX = parseInt(document.getElementById('bigZ').value);
					bigY = parseInt(document.getElementById('bigZ').value);
					if( layout == 'vertical' ) {
						smallX = 0;
						bigX = 0;
					} else {
						smallY = 0;
						bigY = 0;
					}
				}
				document.getElementById('cfg_ScrollSpeed').addEventListener('click',cfgScrollSpeed2,false);

			//}
			//{ Dynamic Scroll reponse settings
				function cfg_response2(evt) {
					scrollResponse = parseInt(evt.currentTarget.value);
				}
				document.getElementById('cfg_response').addEventListener('change',cfg_response2,false);

			//}
			//{ Dynamic Drag delay settings
				function cfgDragDelay2(evt) {
					noDragDelay = (evt.currentTarget.checked == true) ? 1 : 0;
				}
				document.getElementById('cfg_noDragDelay').addEventListener('click',cfgDragDelay2,false);

			//}


			//{ Scroll Wheel
				function wheel(evt) {
					e = evt ? evt : window.event;
					var wheelData = e.detail ? e.detail : e.wheelDelta / 40 * -1;	
					window.scrollTo(window.pageXOffset+(wheelData*bigX), window.pageYOffset+(wheelData*bigY) );
					updateMarker();
				}
				window.addEventListener(wheelEvent, wheel, false);

			//}
			
			//{ scrollBody
				function onMouseDownBody(evt) {
					if( evt.which == 1 ) {
						menuState = div_mu.display;
						div_mu.display = 'none';
						evt.stopPropagation();
						mloop = 1;
						referenceX = evt.clientX;
						referenceY = evt.clientY;
						muliplyerX = smallZ;
						muliplyerY = smallZ;
						if( noDragDelay == 0 ) 
							moveDelay();
						document.addEventListener('mousemove',onMouseMove,false);
					}
					return false;
				}
				document.addEventListener('mousedown',onMouseDownBody,false);

			//}
			//{ Scrollpad
				var scrollPad = document.getElementById('scrollPad');
				var isSavedPage = (scrollPad!=null) ? true : false;
				function onMouseDownScroller(evt) {
					evt.stopPropagation();
					if( evt.which == 1 ) {
						menuState = div_mu.display;
						div_mu.display = 'none';
						referenceX = evt.clientX;
						referenceY = evt.clientY;
						muliplyerX = bigX;
						muliplyerY = bigY;
						mloop = 1;
						if( noDragDelay == 0 )
							moveDelay();
						document.addEventListener('mousemove',onMouseMove,false);
					} else {
						var updateX = window.pageXOffset;
						var updateY = window.pageYOffset;
						if( layout == 'vertical' ) {
							var ratio = (docElement.scrollHeight - document.documentElement.clientHeight)  / evt.currentTarget.offsetHeight;
							updateY = Math.floor( (evt.clientY - evt.currentTarget.offsetTop)*ratio );
						} else {
							var ratio = (docElement.scrollWidth - document.documentElement.clientWidth)  / evt.currentTarget.offsetWidth;
							updateX = Math.floor( (evt.clientX - evt.currentTarget.offsetLeft)*ratio );
						}
						window.scrollTo(updateX,updateY);
						updateMarker();
					}
					return false;
				}
				if( isSavedPage == false ) {
					scrollPad = document.createElement('div');
						scrollPad.id = 'scrollPad';
						document.body.appendChild(scrollPad);
				}
				scrollPad.addEventListener('mousedown', onMouseDownScroller, false);
				scrollPad.addEventListener('contextmenu', function(evt) {evt.preventDefault();evt.returnValue=false;return false;}, true);
			//}
			//{ scrollBody & scrollPad
				function onMouseMove(evt) {
					if( mloop != 0 ) {
						if( noDragDelay == 0 )
							mloop = 0;
						var updateX = window.pageXOffset + ((referenceX - evt.clientX)*muliplyerX);
						var updateY = window.pageYOffset + ((referenceY - evt.clientY)*muliplyerY);

						window.scrollTo(updateX,updateY);
						updateMarker();

						referenceX = evt.clientX;
						referenceY = evt.clientY;
					}
				}
				function moveDelay() {
					if( noDragDelay == 0 ) {
						window.setTimeout( moveDelay, scrollResponse );
					}
					mloop = 1;
				}
				function clearMouseDown() {
					div_mu.display = menuState;
					mloop = -1;
					document.removeEventListener('mousemove',onMouseMove,false);
				}
				document.addEventListener('mouseup', clearMouseDown, false);

			//}

			//{ Autoscroll
				var X = 0;
				var Y = 0;
				//{ Up
					function smallUp(evt) {
						X = -1*smallX;
						Y = -1*smallY;
						loopScroll();
					}
					function bigUp(evt) {
						if( evt.which == 1 ) {
							X = -1*bigX;
							Y = -1*bigY;
							loopScroll();
						} else {
							if( layout == 'vertical' )
								window.scrollTo( window.pageXOffset, 0 );
							else
								window.scrollTo( 0, window.pageYOffset );
							updateMarker();
						}
					}
					var element;
					if( isSavedPage == false ) {
						element = document.createElement('div');
							element.id = 'padUp';
							document.body.appendChild(element);
					}
					element.addEventListener('mouseover', smallUp, false);
					element.addEventListener('mouseout', function(evt) {X=0;Y=0;}, false);
					element.addEventListener('mousedown', bigUp, false);
					element.addEventListener('mouseup', function(evt) {X=(-1*smallX);Y=(-1*smallY);}, false);
					element.addEventListener('contextmenu', function(evt) {evt.preventDefault();evt.returnValue= false;return false;}, false);
				//}
				//{ Down
					function smallDown(evt) {
						X = smallX;
						Y = smallY;
						loopScroll();
					}
					function bigDown(evt) {
						if( evt.which == 1 ) {
							X = bigX;
							Y = bigY;
							loopScroll();
						} else {
							if( layout == 'vertical' )
								window.scrollTo( window.pageXOffset, (docElement.scrollHeight-document.documentElement.clientHeight) );
							else
								window.scrollTo( (docElement.scrollWidth-document.documentElement.clientWidth), window.pageYOffset );
							updateMarker();
						}
					}
					if( isSavedPage == false ) {
						var element = document.createElement('div');
							element.id = 'padDown';
							document.body.appendChild(element);
					}
					element.addEventListener('mouseover', smallDown, false);
					element.addEventListener('mouseout', function(evt) {X=0;Y=0;}, false);
					element.addEventListener('mousedown', bigDown, false);
					element.addEventListener('mouseup', function(evt) {X=smallX;Y=smallY;}, false);
					element.addEventListener('contextmenu', function(evt) {evt.preventDefault();evt.returnValue= false;return false;}, false);
				//}
				delete element;
				function loopScroll() {
					if( X != 0 || Y != 0 ) {
						window.scrollTo( (window.pageXOffset+X), (window.pageYOffset+Y) );
						window.setTimeout( loopScroll, scrollResponse );
						updateMarker();
					}
				}
			//}
			//{ Location Marker
				var loopMarkerReponse = scrollResponse*10;
				var marker;
				if( isSavedPage == false ) {
					marker = document.createElement('div');
						marker.id = 'marker';
						document.body.appendChild(marker);
				}

				window.updateMarker = function() {
					if( layout == 'vertical' ) {
						var ratio = (docElement.scrollHeight - document.documentElement.clientHeight)  / scrollPad.offsetHeight;
						var update = Math.floor( (window.pageYOffset/ratio) + scrollPad.offsetTop );
						marker.style.top = ''+update+'px';
					} else {
						var ratio = (docElement.scrollWidth - document.documentElement.clientWidth)  / scrollPad.offsetWidth;
						var update = Math.floor( (window.pageXOffset/ratio) + scrollPad.offsetLeft );
						marker.style.left = ''+update+'px';
					}
				}

				//TODO: if statement to always be false
				function loopMarker() {
					//if( mloop == -1 ) {
						updateMarker();
					//}
					window.setTimeout( loopMarker, loopMarkerReponse );
				}
				loopMarker();
			//}
		}
	}
	addScript( false, variables, sharedCode );
//}


//{ Start loading images in background
	if( layout != 'vertical' ) {
		div_body.style.width = (total_images*guessedImgWidth)+'px';   //Interfers with scrolling too much
		if( mDirection == 1 ) document.getElementById('p1').scrollIntoView(true);
	}
	backgroundLoader();
	function backgroundLoader() {
		if( loader_count != page_loader ) {
			++loader_i;
			if( loader_i <= total_images ) {
				//refPosition = div_body.offsetWidth
				sendRequest(loader_i);
			} else {
				if( document.images.length != total_images ) {
					var max = total_images - document.images.length;
					for( var i=1; i <= max; ++i )
					{
						//TODO: Untested Code
						window.setTimeout( sendRequest, (delay*i*4), i );
					}
				}
				return;   //bypass setTimeout
			}
		}
		window.setTimeout( backgroundLoader, delay );
	}
//}




//{ Debbug Code
	function log(name,value) {
		var output = value;
		for( i=2; i<arguments.length; ++i ) {
			output += arguments[i] + ' | '
		}
		if( GM_log ) { GM_log(name+': '+output); }
		if( console ) { console.log(name+': '+output); }
	}
//}
// ==========================================================



////////////////////////////////////////
//// Current issues
///////////////////////////////////////{
/*
	A) [Chrome Horizontal] Extra space appears on the left or right end of the page, no idea to why yet as it's more annoying to debug scripts in chrome. (without firefox addons)

	B) [Chrome Horizontal] Custom scrollbar flickers on move. Seems to work like should so not sure why yet.
	
	D) [Horizontal] Going backwards in page scroll [Q/E] doesn't work due to nature of how it works (scroll brings item into view at corner while get image will always return the same)
*/


////////////////////////////////////////
//// Remaining Goals Guide
///////////////////////////////////////{
//// X.x version
/*
2.x Reimplement gradual header color change as approach to end
	Look into the google problems a bit more.
	Add loading speed option? fast = 500ms, medium = 750ms, slow = 1000ms
		Or consider adding variable loading speed based on how far loading is from scroll position, complex code required though
	Add option to disable headers
	Determine which page jumping code is better

2.x Minor Optimization and bug hunt
	Find out status of beta.mangafox.com, remove support if they took it down completely
	Add option to adjust alpha of gui
	Recheck uncertain Code
	Cleanup menu (make it look better and add extra options towards the search bar)
	?Maybe add genre information and other stuff but that requires another regex to the root chapter page

3.0 Full Code Profiling, Optimizations, Improving or creating new css sheets. Basically focus on performance and looks.
	Maybe restructure the code for easier handling or porting to other websites
	Redo Code to allow seamless dynamic layout switching
	Readjust tolerance code

	
	Other stuff i thought of but forgot, gah, too many things to do
*/