// ==UserScript==
// @name		heute.de (zdf)
// @version		1.8.1
// @author		unrealmirakulix
// @description	optimiert heute.de
// @include 	http://www.heute.de/*
// @include 	http://www.zdfsport.de/*
// @include		http://wwwdyn.zdf.de/common/weather/00012.html
// @copyright   none
// @updateURL 	http://userscripts.org/scripts/source/153209.meta.js
// @downloadURL http://userscripts.org/scripts/source/153209.user.js
// ==/UserScript==

// Handler for .ready() called
if (document.readyState == 'complete'  || document.readyState == 'interactive') {
	// not on weather module (heute.de, zdfsport.de, ...)
	if ( location.href.indexOf('weather') === -1 ) {	
		// remove #header and #footer
		var s = ['header', 'footer']; // selection ID names
		for (var i = 0; i < s.length; i++) {
			document.getElementById(s[i]).style.display = 'none'; // select ID and remove it
		}
		
		// hide <footer>
		var f = document.getElementsByTagName('footer'); // <footer> selection
		f = f[f.length - 1];				// select last element in NodeList / Array
		f.style.display = 'none'; 			// hide it
		
		// ZDF Sport [check if url in address bar contains 'zdfsport.de']
		if ( location.href.indexOf('zdfsport.de') > -1 ) {
			// look for #a..., select them and click on found ones
			var a = document.querySelectorAll('#a2, #a3, #a4, #a5, #a6, #a7, #a8');
			for (i = 0; i < a.length; i++) {
			  a[i].click();
			}
			
			// Set parameters for new box 'Rubriken filtered'
			var n_a = 'teaser-rubriken box';	// attach .teaser-rubriken and .box
			var v_a = 'clearfix';	// attach .clearfix
			
			var uml = ['http://sportstudio.zdf.de/', 'http://sportreportage.zdf.de/ZDF-SPORTreportage/ZDF-SPORTreportage-5991166.html', 'http://blog.zdf.de/sportxtreme/', 'http://bundesligatipp.zdf.de/']; // link addresses
			var umn = ['sportstudio', 'SPORTreportage', 'Sport Xtreme', 'Tippcenter']; // link names
			
			var umu = 'fleft '; // link .ecTab
			var umc = ['teasers', 'teasers', 'last', 'teasers']; // link classes
			
			var sp = '60px'; // space between items
			
			// hide all elements of class 'teaserDesign'
			var ts = document.getElementsByClassName('teaserDesign');
			for (i = 0; i < ts.length; i++) {
				ts[i].style.display = 'none';
			}
		}
		// Heute.de incl. subpages [check if url in address bar contains 'heute.de']
		else if ( location.href.indexOf('heute.de') > -1 ) {
			// hide Rubriken (#erweiterteSuche)
			document.getElementById('erweiterteSuche').style.display = 'none'; // select ID and remove it
			
			// Heute.de (main page only) [check if url is exactly 'http://www.heute.de/']
			if ( location.href === 'http://www.heute.de/' || location.href === 'http://www.heute.de/#' ) {
				//minimize latest news (is done on articles by the page itself)
				window.document.querySelector('#ncWrapper > #nc > #action_ncMinMax').click();
			
				// Set parameters for new box 'Rubriken filtered'
				var n_a = 'teaser-rubriken box';	// attach .teaser-rubriken and .box
				var v_a = 'rubriken-menu clearfix';	// attach .rubriken-menu and .clearfix
				
				var uml = ['Rubrik-Netzkultur-6023792.html', 'Panorama-6023784.html', 'Politik-6023214.html', 'http://www.zdfsport.de/ZDFsport-Startseite-4002.html', 'Wirtschaft-6023530.html',  'http://www.heute.de/Alles-zum-Thema-Wetter-8089116.html']; // link addresses
				var umn = ['Netzkultur', 'Panorama', 'Politik', 'Sport', 'Wirtschaft', 'Wetter']; // link names
				
				var umu = 'unit '; // class unit
				var umc = ['teasers', 'teasers', 'last', 'teasers', 'teasers', 'last']; // link classes
				
				var sp = '0';

				// hide #teaserDesign_? (Hyperland)
				if ( document.querySelector('[id^=teaserDesign_]') ) {
					document.querySelector('[id^=teaserDesign_]').style.display = 'none';
				}	
			}	
		}
		
		// for "main sports site" and "main news site"
		if ( location.href === 'http://www.zdfsport.de/ZDFsport-Startseite-4002.html' || location.href === 'http://www.heute.de/' || location.href === 'http://www.heute.de/#' ) {
			// Create a new box 'Rubriken filtered'
			var p = document.getElementById('main');	// Get a reference to the element in which we want to insert a new node
			var c = p.firstChild;	// Get a reference to the first child
			// <section>
			var n = document.createElement('section'); // create <section>
			n.setAttribute('id', 'um_cat');		// attach #um_cat
			n.setAttribute('class', n_a);	// attach .teaser-rubriken and .box
			// <nav>
			var v = document.createElement('nav'); // create <nav>
			v.setAttribute('id', 'um_nav');		// attach #um_nav
			v.setAttribute('class', v_a);	// attach .rubriken-menu and .clearfix
			v.style.display = 'flex';
			// create list with <ul> an <li>s
			var u = document.createElement('ul'); // create ul
			var nl = new Array(); // create li (empty array)
			var na = new Array(); // empty array for a[i]
			
			for (var i = 0; i < umn.length; i++) {
				nl[i] = document.createElement('li'); // create li array
				nl[i].setAttribute('class', umu + umc[i]); // attach classes (unit + teasers or last (for every third one))
				na[i] = document.createElement('a'); // create a array
				na[i].href =  uml[i]; // set link addresses
				if ( sp != '0' ) {
					na[i].style.width = sp; // space between elements
				}
				na[i].innerHTML = umn[i] // <a>INNER_TEXT</a>
				nl[i].appendChild(na[i]); 		// Append the a[i] to li[i]
				u.appendChild(nl[i]); 	// add the li[i] to the newly created ul
			}
			v.appendChild(u); 	// add the ul to the newly created nav
			n.appendChild(v); 	// add the nav to the newly created div

			p.insertBefore(n, c);	// Insert the new element before the first child
		}
	}

	// Hotkeys (on all pages) [done by listening to keyboard input]
	document.onkeydown = function(e) {
	
		e = e || window.event;
		
		// exclude SHIFT from detection
		if (e.shiftKey) {
			return;
		}
		// exclude CTRL from detection
		else if (e.ctrlKey) {
			return;
		}
		// exlcude ALT from detection
		else if (e.altKey) {
			return;
		}
		
		// if inside textarea or input
		var tag = event.target.tagName.toLowerCase(); // only convert to lowercase once
		if (tag === 'textarea' || tag === 'input') {
			// use === when you know the two objects you are comparing will always be the same type since it is faster than ==
			return;
		}
		// if key 'w' is pressed
		else if (e.keyCode === 87){
			// open weather modul
			window.location = 'http://wwwdyn.zdf.de/common/weather/00012.html';
		}
		// if key 's' is pressed
		else if (e.keyCode === 83){
			// open sports section
			window.location = 'http://www.zdfsport.de/ZDFsport-Startseite-4002.html';	
		}
		// if key 'h' is pressed
		else if (e.keyCode === 72){
			// open news section
			window.location = 'http://www.heute.de/';	
		} 	
	}
};