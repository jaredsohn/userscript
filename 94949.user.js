// ==UserScript==
// @name Wonderwaar 
// @namespace http://www.apocalyptus.fr
// @description UserScript pour Waar.fr
// @include http://waar.fr/*
// @include http://www.waar.fr/*
// @match http://waar.fr/*
// @match http://www.waar.fr/*
// @version 1.2.2
// ==/UserScript==

// /*
var SUC_script_num = 94949; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck();});updateCheck();}catch(err){}
// */

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
		if(window.location.pathname !== '/royaume.php'){
			jQuery('table:last').after('<table class="compartiment">   <tr>    <td><a href="forum.php">Forum</a></td>      <td><a href="regles.php">Règles</a></td>      <td><a href="compte.php">Compte</a></td>      <td><a href="/actions/general/deconnexion.php">Déco.</a></td></tr></table>');
		}
		
		if(window.location.pathname == '/forum.php'){
			function search(){
				var q = $('input[name=recherche]').val();
				var url = "http://www.google.com/cse?cx=003327924511717866569%3Akakqlqcj_1q&ie=UTF-8&q=" + q;
				return window.location.replace(url);
			}
			
			$('strike').css('text-decoration', 'none');
			
			$('input').keypress(function(e){
				if(e.which == 13){
					return search();
				}
			});
			
			$('input[type=submit]').click(function(){
				return search();
			});
		}
		
		var bbcode = new Array(
			/[^\]](https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.\-]*(\?\S+)?)?)?)/g,
			/\[img\](.*?)\[\/img\]/g,
			// /\[url=([\w]+?:\/\/[^ \\"\n\r\t<]*?)\](.*?)\[\/url\]/g,
			// /\[url\]((www|ftp|)\.[^ \\"\n\r\t<]*?)\[\/url\]/g,
			// /\[url=((www|ftp|)\.[^ \\"\n\r\t<]*?)\](.*?)\[\/url\]/g,
			/\[u\](.*?)\[\/u\]/g,
			/\[i\](.*?)\[\/i\]/g,
			/\[b\](.*?)\[\/b\]/g,
			// /\[url\](http:\/\/[^ \\"\n\r\t<]*?)\[\/url\]/,
			/:noel:/g,
			/:hap:/g,
			/:rire:/g,
			/:bave:/g
		);

		var replace = new Array(
			" <a href=\"$1\">$2</a>",
			"<img src=\"$1\" alt=\"$1\">",
			// "<a href=\"$1\" target=\"blank\">$2</a>",
			// "<a href=\"http://$1\" target=\"blank\">$1</a>",
			// "<a href=\"$1\" target=\"blank\">$1</a>",
			"<u>$1</u>",
			"<em>$1</em>",
			"<strong>$1</strong>",
			// "<a href=\"$1\" target=\"blank\">$1</a>",
			"<img src=\"http://image.jeuxvideo.com/smileys_img/11.gif\" alt=\":noel:\">",
			"<img src=\"http://image.jeuxvideo.com/smileys_img/18.gif\" alt=\":hap:\">",
			"<img src=\"http://image.jeuxvideo.com/smileys_img/39.gif\" alt=\":rire:\">",
			"<img src=\"http://image.jeuxvideo.com/smileys_img/71.gif\" alt=\":bave:\">"
		);
		
		jQuery('.txt, .message_recu').each(function(e){
			for(i = 0; i < bbcode.length; i++) {
				var txt = " " + jQuery(this).html() + " ";
				jQuery(this).html(txt.replace(bbcode[i], replace[i]));
			}
		});
		
		// bug du journal de bord
		jQuery('.jdb_details').click(function () {
			jQuery(this).parent().parent().next().toggle();
			return false;
		});
}

// load jQuery and execute the main function
addJQuery(main);