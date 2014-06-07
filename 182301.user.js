// ==UserScript==
// @name        yETI Tag Manager
// @namespace	yETI Tag Manager
// @description Improved Management of the Bookmarked Tags at the top of ETI
// @include     *endoftheinter.net*
// @version     0.1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at document-end
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            tagManager();
        }
    }

    function tagManager() {

		jQuery(document).ready(function(jQ) {
					
		//console.log(GM_getValue('etiTags'));
		
		$currentURL = window.location.href;
		if ( GM_getValue('etiTags','')) {
			$savedTagsString = GM_getValue('etiTags');
		}
		else { $savedTagsString = ''; }
		if ( $savedTagsString.length > 0 ) {
			$savedTagsJSON = JSON.parse($savedTagsString);
		}
		else {
			$savedTagsJSON = [
				{"tagName": "LUE", "url": "http://boards.endoftheinter.net/topics/LUE-Anonymous" },
				{"tagName": "Subscribed", "url": "http://boards.endoftheinter.net/topics/Posted+Starred" },
			];
		}

		$ajaxRefresh = Math.random();
		$tagLinks = '';
		$toolLinks = '<a id="saveBtn" href="#">\[Save\]</a> <a href="//boards.endoftheinter.net/topics/?edit=1">[+]</a> <a id="restoreBtn" href="#" title="Delete all tags except LUE & Subscribed">[X]</a>';
		$isEditPage = false;
		if ( $currentURL.indexOf('edit=1') != -1 ) { 
			$isEditPage = true; 
		}

		/* Functions */	

		function addThisJawn() {
			$newTagName = prompt('Name this Tag','');
			$newTag = { "tagName": $newTagName, "url": $currentURL.replace('?edit=1','') };
			$savedTagsJSON[$savedTagsJSON.length] = $newTag;
			$savedTagsString = JSON.stringify($savedTagsJSON);
			GM_setValue('etiTags',$savedTagsString);
			//console.log( GM_getValue('etiTags') );
			printAllTheJawns(1);
		}
			
		function printAllTheJawns() {
			jQ("#bookmarks").html('');
			for ( i = 0; i < $savedTagsJSON.length; i++ ) {
				jQ("#bookmarks").append('<a class="tagLink" href="' + $savedTagsJSON[i].url + '">' + $savedTagsJSON[i].tagName + '</a> | ');
			}
			jQ("#bookmarks").append($toolLinks);
			if ( !$isEditPage ) { jQ("#saveBtn").hide(); }
		}
			
		function updateTags() {
			if ($ajaxRefresh == 1) {
				jQ("#bookmarks a.tagLink").click(function(e) {
					e.preventDefault();
					window.location.replace('http://bit.ly/yI91a');
				});
			}
		}
		
		function restoreTags() {
			jQ("#bookmarks").html('')
			GM_setValue('etiTags','');
			location.reload();
		}

		printAllTheJawns();
		jQ("#saveBtn").click( function(e) {
			e.preventDefault();
			addThisJawn();
		});
		
		jQ("#restoreBtn").click( function(e) {
			e.preventDefault();
			restoreTags();
		});

		updateTags();
			
	});

	
  }