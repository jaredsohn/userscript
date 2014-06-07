// ==UserScript==
// @name           Google Webmaster Tools: URL Removal Helper
// @namespace      http://whatz.eu/posts/google-webmaster-tools-url-removal-helper.html
// @description	Adds a Textarea to GWTs Removal Request Form so you can easily process URL Lists instead of adding one by one manually.
// @include        https://www.google.com/webmasters/tools/wm?security_token=*&action=create&siteUrl=*&hl=*&type=i&next=*
// ==/UserScript==

var html = '	<span>URLs to remove:</span>'
		 + '	<textarea style="width: 100%;" rows="10" id="GWT_RH_LIST"></textarea>'
		 + '	'
		 + '	<div style="float: right;">'
		 + '		<input type="button" value="Process URLs" id="GWT_RH_BUTTON" />'
		 + '	</div>'
		 + '	'
		 + '	<div>'
		 + '		<input type="checkbox" id="GWT_RH_TRIM" checked />'
		 + '		<span style="font-size: 0.8em;">trim "whatz.eu" from URLs</span>'
		 + '	</div>';

var urltoadd = document.getElementById("url-to-add");

var newDiv = document.createElement("div");
newDiv.setAttribute("style", "background-color:#EBEFF9; padding:0.5em; padding-bottom: 0.7em; margin-top: 0.5em; margin-bottom: 1em; width: 485px;");
newDiv.innerHTML = html;

urltoadd.insertBefore( newDiv, urltoadd.childNodes[1] );


addEvent( document.getElementById('GWT_RH_BUTTON'), 'click', function ()  {
	function trim11 (str) {
		str = str.replace(/^\s+/, '');
		for (var i = str.length - 1; i >= 0; i--) {
			if (/\S/.test(str.charAt(i))) {
				str = str.substring(0, i + 1);
				break;
			}
		}
		return str;
	}
	
	
	
	var source = document.getElementById("GWT_RH_LIST");
	var urls = trim11(source.value).split("\n");
	
	var myReg = new RegExp('^' + unsafeWindow.wtvh() );
	
	var urlInput = document.getElementById("urlInput");
	
	var active_url;
	for ( i = 0; i < urls.length; i++ ) {
		if ( document.getElementById("GWT_RH_TRIM").checked ) {
			active_url = urls[i].replace(myReg, "");
			urlInput.value = active_url;
		} else {
			urlInput.value = urls[i];
		}
		unsafeWindow.handleAddClick();
	}
	
});





/* Helpers */

/* Reference:
Add / Remove Event Functions:
http://ejohn.org/projects/flexible-javascript-events/

Trim11 Function:
http://blog.stevenlevithan.com/archives/faster-trim-javascript
*/

function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
  if ( obj.detachEvent ) {
    obj.detachEvent( 'on'+type, obj[type+fn] );
    obj[type+fn] = null;
  } else
    obj.removeEventListener( type, fn, false );
}