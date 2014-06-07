// ==UserScript==
// @name        New Myspace Mods
// @namespace   Seifer
// @include     https://myspace.com/*
// @version     2.11
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant    	GM_info
// ==/UserScript==

function GM_main ($) {
    // Set default settings if this is the first time the script or option is available...
    if(GM_getValue('gm_display_notification_count') == null) { GM_setValue('gm_display_notification_count',1); }
    if(GM_getValue('gm_display_song_title') == null) { GM_setValue('gm_display_song_title',0); }
       
	setInterval(function() {gm_nms();},1000); // Start the main reoccuring function
    
    /* =====================================
    	Add an linkback (and options menu link) to the footer (this linkback can be used by other scripts to check if this userscript has already been loaded on the page.)
    	Thanks to InsaneNinja for the original linkback concept back in the old old MySpace days.
    
    	To check if this script has been loaded just use:
    	MyspaceModsLoaded = document.getElementById('gm_linkback_157960');
    	if(MyspaceModsLoaded) { // Myspace mods has been run } else { // Myspace mods has NOT been run } */
    $('#links').html('<a id="gm_linkback_157960" href="http://userscripts.org/scripts/show/157960">Myspace Mods</a> &middot '+$('#links').html());    
    
    // Add our options dialog
    $('#gm_linkback_157960').on('click', function(event) {
        event.preventDefault();
        
        if(!$('#gm_options_style').length) {
        	$('head').append($('<style id=gm_options_style">.gm_hide {opacity:0} table.gm_options tr, table.gm_options tr td { width:100%;height:100%;text-align:center;vertical-align:middle } table.gm_options {position:absolute;left:0px;top:0px;z-index:100;width:100%;height:100%} div.gm_options {background-color: rgba(255,255,255,.95);border-bottom: 1px solid #CCC;box-shadow:0 1px 100px 10px rgba(0,0,0,.35);transition:opacity.4s;min-width:300px;border-radius:8px;display:inline-block;text-align:left;padding:20px;} div.gm_options .actions { margin-top:40px }</style>'));
        }
        
        $('#gm_options_157960').remove();
        var $optdialog = $('<table class="gm_options" id="gm_options_157960" style="display:none"><tr><td><div class="gm_options gm_hide"><h2>Myspace Mods options</h2><a href="http://userscripts.org/scripts/show/157960">Userscript Page</a><p style="margin-top:10px"><input type="checkbox" name="gm_display_notification_count" value="1"/> Display notification count in browser title<br><input type="checkbox" name="gm_display_song_title" value="1"/> Display song title in tab currently playing music</p><div class="actions"><button class="yes primary">Save & close</button></div></div></td></tr></table>');
    	$('body').append($optdialog);
        
        $('#gm_options_157960 input').each(function() {
            if($(this).attr('type') == 'checkbox') {
                $(this).prop('checked',GM_getValue($(this).attr('name')));
            } else {
                $(this).val(GM_getValue($(this).attr('name')));
            }
        });
        
        $('#gm_options_157960 .actions .yes').on('click', function(event) {
            $('#gm_options_157960').attr('style','display:none');
            $('#gm_options_157960 tr td div').addClass('gm_hide');
            
            $('#gm_options_157960 input').each(function() {
                if($(this).attr('type') == 'checkbox') {
                    if($(this).prop('checked')) {
                        var value = 1;
                    } else {
                        var value = 0;
                    }
                } else {
                    var value = $(this).val();
                }
                GM_setValue($(this).attr('name'),value);
            });
        });
        
        $('#gm_options_157960').attr('style','');
        $('#gm_options_157960 tr td div').removeClass('gm_hide');
    });  
    // ======================================

	function gm_nms() {
		notifications = $('#showNotificationsNavLink').find('.count').text()

		// Check that this page/tab isn't the active music player
		isMusicPlayer = $('#scomm').attr('src').indexOf(localStorage.activePlayer);
		isMusicPlayer = (isMusicPlayer > 0);
		if(!isMusicPlayer || GM_getValue('gm_display_song_title') == 0) { gm_build_title(); }

        if(GM_getValue('gm_display_notification_count') == 1) { gm_set_title_notifications(notifications); }
	}
	function gm_build_title() {
		urlcrumb = document.location.toString();
		urlcrumb = urlcrumb.substring(urlcrumb.indexOf('.com/')+5);
		urlarray = urlcrumb.split('/');
		if(urlarray[1] == "mixes" && urlarray[2]) { // Got to figure out if we're viewing a mix index, or a photo in a mix
			if(urlarray[3] == "photo") { // We're viewing a photo in a mix
				document.title = $('h2',$('.railHeader')).text()+' '+$('p',$('.railHeader')).text();
			} else { // We're viewing a mix index page
				document.title = $('.mixName').text() + ' from ' + $('.mixOwner').text();
			}
		} else if(urlarray[1] == "mixes") { // We are viewing an index of mixes
			document.title = 'Mixes from ' + $('h1:first').text();
		} else if(urlarray[1] == "photos") { // We are viewing an index of photos
			document.title = 'Photos from ' + $('h1:first').text();
		} else if(urlarray[1] == "connections") { // We are viewing connections page
			connectiontype = $('.title',$('#connectionsFilter')).text();
			if(connectiontype.indexOf('connect') > 0) {
				document.title = $('h1').text()+' - '+connectiontype;
			} else {
				document.title = $('h1').text()+' - '+connectiontype+' they\'re connected to';
			}
		} else if($('h1').text()) { // We're probably on someones profile page or in a generic page
			$selectedmenu = $('.selected',$('#sidebar'));
			newtitle = '';
			$selectedmenu.each(function(index) {
				if($('span:first',$(this)).text()) {
					if(newtitle!='') { newtitle=newtitle+' > '; }
					if(newtitle=='') { newtitle = ' > '; }
					newtitle = newtitle + $('span:first',$(this)).text();
				}
			});
			document.title = $('h1:first').text()+newtitle ;
		} else { // Can't find a proper title, build one from the URL.
			console.log('Fall back title used for '.document.location);
			urlcrumb = urlcrumb.replace(/\//g,' > ');
			document.title = urlcrumb;
		}
		document.title = document.title+' - Myspace';
	}
	function gm_set_title_notifications(count) {
		strippedtitle = document.title;
		if(strippedtitle.indexOf('(')==0) {
			strippedtitle = strippedtitle.substring(strippedtitle.indexOf(') ')+1);
		}
		if(count>0) {
			document.title = '('+count+') '+strippedtitle;
		} else {
			document.title = strippedtitle;
		}
	}
}

// Add support for Greasemonkey functions to other browsers (ie, Google Chrome)
if (typeof GM_deleteValue == 'undefined') {
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return (defaultValue?defaultValue:value);
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

// Include jQuery
if (typeof GM_info !== "undefined") {
    console.log ("Running with local copy of jQuery!");
    GM_main ($);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.9.0");
}
function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.9.0";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}