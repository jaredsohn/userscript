// ==UserScript==
// @name           Chrome Sentry
// @namespace      http://www.mittineague.com/dev/
// @description    Allow/Deny pages from referrencing Chrome files
// @include        *
// @exclude
// ==/UserScript==

/*
 * Chrome Sentry -  chromesentry.user.js version 1.3
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 *
 * script hosted at http://www.mittineague.com/dev/chromesentry.user.js
 * and can be found at http://userscripts.org/scripts/show/5899
 *
 * CHANGE LOG
 * version 1.0 - October 7, 2006
 * version 1.1 - October 8, 2006	// IMPORTANT added pre-GM_xmlhttpRequest input filter
 *				// additional content filtering before replacing script tag
 *				// improved content parsing to prevent browser hang
 * version 1.2 - October 9, 2006	// improved relative URL handling
 * version 1.3 - November 15, 2006	// added (function(){ [CODE] })();
 *
 * Check all img tags for src and lowsrc attribute values matching chrome
 * Check all script tags for src attribute value matching chrome
 * Check script tags' content for text matching "chrome" or "GM"
 *
 * Matches shown in an alert
 * Matches logged to javascript console
 * Is it OK to reference chrome file? - confirm or cancel
 *
 * Removes matching img tags
 * Replaces matching script tags with
 * <script type="text/javascript">
 * Any matching content with "chrome" and "GM" removed
 * </script>
 * 
 * * * * * * * * * * * * * * * * * * *
 * SECURITY DISCLAIMER
 * This script provides <emphasis> SOME </emphasis> control
 * over several techniques pages could use to
 * determine the presence of various Firefox Extensions
 * It does NOT guarantee that it intercepts ALL possible techniques
 * It is strongly recommended that the content of the Alert be studied
 * enough to determine the originating page's intent ** before **
 * selecting OK in the subsequent Confirmation
 */

(function(){

/* PREFERENCE OPTIONS */
var show_alert = "true";  	// view src value/content that contains match
var log_matches = "true";	// log matches to the javascript console
var show_confirm = "true";	// decide whether or not to allow reference
/* END OF PREFERENCE OPTIONS */

/* HANDLE IMAGE TAGS */
var all_tags = document.getElementsByTagName('img');
var remove_tag = "false";

for(var i = 0; i < all_tags.length; i++)
{
	if(all_tags[i].hasAttribute('src') && /chrome/gi.test(all_tags[i].getAttribute('src')))
	{
		if(show_alert == "true") alert(all_tags[i].getAttribute('src'));
		if(log_matches == "true") GM_log(all_tags[i].getAttribute('src'));
		remove_tag = "true";
	}
	if(all_tags[i].hasAttribute('lowsrc') && /chrome/gi.test(all_tags[i].getAttribute('lowsrc')))
	{
		if(show_alert == "true") alert(all_tags[i].getAttribute('lowsrc'));
		if(log_matches == "true") GM_log(all_tags[i].getAttribute('lowsrc'));
		remove_tag = "true";
	}
	if(remove_tag == "true")
	{
		if((show_confirm == "true")&&(confirm('Img with src = chrome\nDo you want to load it?')))
		{
			remove_tag = "false";
			break;
		}
		else
		{
			all_tags[i].parentNode.removeChild(all_tags[i]);
			remove_tag = "false";
		}
	}
}

/* HANDLE SCRIPT TAGS */
var this_script_tag, S_src, S_content;
var X_src = "false";
var X_content = "false";
var src_url;
var expression = /^((http:\/\/)(www\.)?([-_A-Z0-9\/\.]+[^#|?|\'|\"|\s])*)+/i;

function filter_url(src_url)
{
	if(src_url.match(expression))
	{
		src_url = RegExp.$1;
		getSrc(src_url);
	}
	else
	{
		S_content += "Filter Error, chome?";
		return;
	}
}

function getSrc(src_url)
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: src_url,
		onload: function(responseDetails)
		{
			S_content += responseDetails.responseText;
		},
		onerror: function(responseDetails)
		{
			alert("GM_xmlhttpRequest Error");
			abort();
		}
	});
}

var all_script_tags = document.evaluate(
			'//script',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
			);

for (var j = 0; j < all_script_tags.snapshotLength; j++)
{
	this_script_tag = all_script_tags.snapshotItem(j);
	S_src = "";
	S_content = "";
	S_content = this_script_tag.innerHTML;
	if(this_script_tag.hasAttribute('src'))
	{
		S_src = this_script_tag.getAttribute('src');
		if(/chrome/i.test(S_src))
		{
			if(show_alert == "true") alert(S_src);
			if(log_matches == "true") GM_log(S_src);
			X_src = "true";
		}
		else if(/http/i.test(S_src))
		{
			filter_url(S_src);
		}
		else
		{
			var loc_root = location.hostname;
			var loc_path = location.pathname;
			var path_segs = loc_path.split("/");
			var path_seg_len = path_segs.length;
			loc_path = "";
			var src_segs = S_src.split("/");
			var src_seg_len = src_segs.length;
			src_path = "";
			var marker = 1;
			for(var k = 0; k < src_seg_len; k++)
			{
				if(src_segs[k] === ".")
				{
				//skip to next
				}
				else if(src_segs[k] === "..")
				{
					marker += 1;
				}
				else if(k < (src_seg_len - 1) )
				{
					src_path += src_segs[k];
					src_path += "/";
				}
				else
				{
					src_path += src_segs[k];
				}
			}		
			for(var l = 0; l < (path_seg_len - marker); l++)
			{
				loc_path += path_segs[l];
				loc_path += "/";
			} 
			S_src = "http://" + loc_root + loc_path + src_path;
			filter_url(S_src);
		}
	}
	if(/chrome/gi.test(S_content) || /GM/g.test(S_content))
	{
		if(show_alert == "true") alert(S_content);
		if(log_matches == "true") GM_log(S_content);
		X_content = "true";
	}
	if((X_src == "true") || (X_content == "true"))
	{
		if ( (show_confirm == "true") && confirm('Script contains "chrome" and/or "GM"\nDo you want to load it?') )
		{
			X_src = "false";
			X_content = "false";
			break;
		}
		else
		{
			var mod_script_tag = document.createElement('script');
			mod_script_tag.setAttribute("type","text/javascript");
			if(X_content == "true")
			{
				var new_script_content = S_content.replace(/chrome/gi, "");
				S_content = "";
				var new_script_content = new_script_content.replace(/GM/g, "GreaseMonkey");
				mod_script_tag.innerHTML = new_script_content;
			}
			this_script_tag.parentNode.replaceChild(mod_script_tag, this_script_tag);
			X_src = "false";
			X_content = "false";
		}
	}
}

})();