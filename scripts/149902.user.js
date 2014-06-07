// ==UserScript==
// @name        Kaskus Longcat Countermeasure
// @namespace   http://www.s4nji.com
// @include     http://www.kaskus.co.id/showthread.php*
// @include     http://www.kaskus.co.id/showpost.php*
// @require     http://code.jquery.com/jquery-1.8.2.js
// @require		http://code.jquery.com/ui/1.9.0/jquery-ui.js
// @version     10
// ==/UserScript==



// Configuration / Settings
var filterH, filterW, triggerHappy;

filterH = 1280; // Images with width larger than 1000px will be filtered
filterW = 1024; // Images with height larger than 1000px will be filtered
triggerHappy = true; // Run filters multiple times to increase effectiveness... Somehow... But it's really effective!



// Start
(function() {
log( "System Started" );


// Declare Variables
var haystack, needle, filterCount, postFiltered, el;



// Custom Console Logging
function log(msg) {
	console.log("KLCM: "+msg);
}


// Stylesheets
function addStylesheets() {
	// Make blocked image messages smaller
	GM_addStyle( ".blockedlargeimage { color: red; font-size: 25%; }" );

	// Remove subsequent ( 3+ ) <img>
	GM_addStyle( " .alt1 img+img+img~img { display: none !important;line-height: 0 !important;height: 0 !important; } .alt1 img+img+img~img:after { content:'Image Spam Detected here' } " );

	// Remove subsequent *+img ( 2+ )
	GM_addStyle( " .alt1 img+*+img~img { display: none !important;line-height: 0 !important;height: 0 !important; } .alt img+*+img~img { content:'Image Spam Detected here' } " );
	
	// Install cPanel Stylesheet
	GM_addStyle( "#longcat-cpanel-sub a{position:fixed;z-index:9999999999999;top:-4px;right:2px;background:#47a;width:60px;line-height:20px;text-align:center;padding:0 3px 3px;border-top:4px solid #368;height:20px;color:#FFF!important;text-decoration:none!important}#longcat-cpanel-sub a:hover{top:0}#longcat-cpanel-main{display:none}#longcat-cpanel-main a{text-decoration:none!important;}" );
	
}


// Libraries, jQuery, jQueryUI, jQueryUI-CSS
function addLibs() {
	$('head').append('<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>');
	$('head').append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css"/>');
	$('head').append('<script type="text/javascript" src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>');
}


// Install Control Panel
function installControlPanel(callback) {
	el = document.createElement('div');
	el.innerHTML = '<div id="longcat-cpanel"><div title="Kaskus Longcat Countermeasure Settings" id="longcat-cpanel-main"><button id="force-clean-longcat">Force Clean Longcats</button><br/><button id="force-clean-enter">Force Clean Long Enters</button></div><div id="longcat-cpanel-sub"><a href="#" id="longcat-cpanel-show">Show</a></div></div>';

	document.body.appendChild(el);

	if(callback) {
		callback();
	}
}


// Install Control Panel Wirings ( click events )
function installControlPanelEvents() {

	$('#longcat-cpanel-sub a').click(function(e){
		e.preventDefault();
		$('#longcat-cpanel-main').dialog({
			modal: true,
			width: 600,
			height: 300,
			resizable: false
			
		});
	});
	
	$('#force-clean-longcat').click(function(e){
		e.preventDefault();
		removeLongcats();
	});
	
	$('#force-clean-enter').click(function(e){
		e.preventDefault();
		removeLongEnter();
	});
	
	
}


// Before Removing Anything, check Trigger Happy >:D
function init(x) {
	removeLongEnter();
	if( triggerHappy ) {
		for( i=1 ; i<x ; i++ ) {
			setTimeout( removeLongcats, i*3000 );
			log( "LC Killer #"+ i +" Launched!" );
		}
	} else {
		removeLongcats();
	}
}


// Remove Long Enters
function removeLongEnter() {
	var postContent = $('#posts').children().children().children().children().children('table').children().children('tr:nth-child(2)').children('td:nth-child(2)');
	var postNumber = $('#posts').children().length;

	for( var i=0 ; i<postNumber ; i++ ) {
		postFiltered = postContent[i].innerHTML.replace(/(<br\s*\/?>\s*){4}/gm, '<br/>');
		postContent[i].innerHTML = postFiltered;
		log('Post #'+ (i+1) +' filtered from long enters');
	}
}


// Remove Longcats
function removeLongcats() {

	filterCount = 0;
	haystack = unsafeWindow.document.getElementsByTagName('img');

	// Filter img tags
	for ( i=0 ; i < haystack.length ; i++ ) {

		needle = haystack[i];

		// Width & Height Filter
		if ( needle.width > filterW ) {
			needle.hidden = true;
			needle.style.display = "none";
			needle.width = '0';
			needle.outerHTML = "<span class='blockedlargeimage'>A large sized image was here, and it was blocked! :D</span>";
			filterCount++;
		} else if ( needle.height > filterH ) {
			needle.hidden = true;
			needle.style.display = "none";
			needle.height = '0';
			needle.outerHTML = "<span class='blockedlargeimage'>A large sized image was here, and it was blocked! :D</span>";
			filterCount++;
		}
		
	}
	
	log(filterCount+" large images blocked from "+haystack.length+" images!");
	
	if( triggerHappy ) {
		if( 1<=filterCount ) {
			setTimeout(removeLongcats, 2000);
		}
	}
	
}



// Start!
addLibs();
addStylesheets();
installControlPanel(installControlPanelEvents);
init(5);



})();