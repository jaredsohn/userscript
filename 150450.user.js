// ==UserScript==
// @name        Basecamp To-Do Comments
// @namespace   http://www.thenewgroup.com/gmscripts
// @description Allow you to read and post (beta) comments from Basecamp's To-Do pages
// @include     http*://*.basecamphq.com/projects/*/todo_lists*
// @copyright      2010+, The New Group (http://theNewGroup.com)
// @author         Kory Paulsen
// @licence     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version     1.0
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// ==/UserScript==

// Jarett's update checker (http://userscripts.org/scripts/review/20145)
var SUC_script_num = 150450; // Basecamp Writeboard Sorting UserScripts script id
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

function addGlobalStyle(css) { try { var elmHead, elmStyle; elmHead = document.getElementsByTagName('head')[0]; elmStyle = document.createElement('style'); elmStyle.type = 'text/css'; elmHead.appendChild(elmStyle); elmStyle.innerHTML = css; } catch (e) { if (!document.styleSheets.length) { document.createStyleSheet(); } document.styleSheets[0].cssText += css; } }


var ajaxQueue = [];
var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      // http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
}
setInterval(function(){
  processAjaxQueue();
}, 100);
 
function gmAjax(obj){
  ajaxQueue.push(obj);
}

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
script.addEventListener('load', function(){ 

	var debug = false;

  jQuery = unsafeWindow['jQuery'];
  $jq = jQuery.noConflict();

	var gurl = window.location.href;
	var uparts = gurl.split("/");

	$jq('a.comments_link').click( function(){
		var cUrl = uparts[0] + '//' + uparts[2] + $jq(this).attr('href');
		$jq(this).closest('span.menu_container').append('<div class="gmComments" style="position:absolute; left:-22px; overflow-y:scroll; overflow-x:hidden; padding:10px; background-color:white; border:1px solid black; height:400px; width:700px; z-index:100;"></div>');
		$jq(this).closest('span.menu_container').append('<div class="gmCommentsTools" style="position:absolute;left:482px; width:200px; background-color:white; border:1px solid black; border-right:none; z-index:101;"><a href="'+cUrl+'">open comments page</a> &nbsp; &nbsp; &nbsp; &nbsp; <a href="#" class="close">[X]</a></div>');
		var comments = $jq('.gmComments', $jq(this).closest('span.menu_container'));
		var commentsTools = $jq('.gmCommentsTools', $jq(this).closest('span.menu_container'));
		$jq( 'a.close', commentsTools ).click( function(){ $jq('.gmComments,.gmCommentsTools', $jq(this).closest('span.menu_container')).remove(); return false; } );

		gmAjax({
			method: 'GET',
			url: cUrl,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html,application/atom+xml,application/xml,text/xml'
			},
			onload: function(response) {
/*
				var responseXML = null;
				if (!response.responseXML) {
					responseXML = new DOMParser()
						.parseFromString(response.responseText, "text/xml");
				}

				$jq('comment', $jq(responseXML) ).each( function(){
					var author = $jq('author-name', this).html();
					comments.append('<div class="gmComment"></div>');
					$jq('div.gmComment', comments ).append(
						'<div>'+author+'</div>'
					);
				} );
*/
				comments.append( $jq('#comments', response.responseText ).parent().html() );

				$jq( '#new_comment', comments).submit( function(){
					$jq.post(
						$jq(this).attr('action'),
						$jq(this).serialize(),
						function(){
							location.reload();
						}
					);
					return false;
				} );

			}
		});

		return false;
	} );

}, false);

