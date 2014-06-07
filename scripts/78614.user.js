// ==UserScript==
// @name          Spotify+rateyourmusic
// @namespace     faethon
// @description	  Adds spotify links to rateyourmusic
// @version       0.4
// @include       http://rateyourmusic.com/*
// @include       http://www.rateyourmusic.com/*
// ==/UserScript==

// This script borrows heavily from the spotify.fm script
// Many thanks to the original author of that script that adds spotify links to Last.FM
// I only hacked the original script to get it to work on rateyourmusic.

//Update check
var SUC_script_num = 78614; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

(function() {

	GM_addStyle('.spotifyLink img { border:none !important; margin-left:3px; width:9px; height:9px; background:transparent !important; vertical-align:baseline; }');
	GM_addStyle('ul.artistsSquare .spotifyLink img { margin:0 !important; width:9px; height:9px; }');
	GM_addStyle('.mediumChartWithImages li .spotifyLink { margin-top:-12px; height:auto; }');

	var cleanurl = function(url) {
		var url1 = url.replace(/_and_/g, '_');
		var str = url1.replace(/f[0-9]+/g, '');
		return decodeURIComponent(str.replace(/\_/g, '%20'));
	};

	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'Search on Spotify'
    	a.className = 'spotifyLink';
	    a.setAttribute('spotifyLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D';
	    a.appendChild(img);

	    return a;
	}

	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('spotifyLinksAdded'))
	        return;
	    topElem.setAttribute('spotifyLinksAdded', true);

	    // This is a rateyourmusic url that we want to rewrite
	    var re = /^http:\/\/(.*\.|)rateyourmusic\.com\/(artist|release\/[a-zA-Z]*)\/([^\?#]*)$/i;

	    var elems = topElem.getElementsByTagName('a');
	    for (var i = 0; i < elems.length; i++) {
	        var elem = elems[i];

	        // Check if the link matches
	        if (m = re.exec(elem.href)) {
	            var found = false;

	            // Go though parts and check if it is an url that we want to change
	            parts = m[3].split('/');
	            for (var j = 0; j < parts.length; j++) {
	                if (parts[j][0] == '_') {
	                    found = true;
	                    break;
	                }
	            }

	            if (found)
	                continue;

		        // Create the spotify url
	            q = [];
	            if(parts[0] && parts[0] != 'Various_Artists_f2') {
	            	q.push('artist%3a%22'+ cleanurl(parts[0]) +'%22');
	            }
	            if (parts[1] ) {
	                q.push('album%3a%22'+ cleanurl(parts[1]) +'%22');
	            }
	            if(q.length == 0) {
	            	continue;
	            }
	            var a = createLink('spotify:search:'+ q.join('%20'));

	            // Insert the link after the found link
	            // Check if it already have a spotify url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('spotifyLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	}

	// Add listener so if the content changes we add links to the new content
	document.addEventListener('DOMNodeInserted', function(ev){ addLinks(ev.originalTarget); }, true);

	// Find links and add spotify links to them
	addLinks(document.body);
	
})();