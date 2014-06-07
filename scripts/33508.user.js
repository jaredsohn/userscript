// ==UserScript==
// @name          TehParadox Auto Link Coder
// @description	  Auto Link Coder.
// @include       *tehparadox.com/*
// @version       1.1
// ==/UserScript==

// Version History:
//
// A crude noob hack job of this script http://greasemonkey-user-scripts.arantius.com/protect+textarea
//

//indicator to skip handler because the unload is caused by form submission
var _pt_skip=false;
var real_submit=null;

//find all textarea elements and record their original value
//do this after onload, after a small delay, in case some inline JS sets
//the initial value of the textarea
window.addEventListener(
	'load', function(){ setTimeout(function() {
		var els=document.evaluate('//textarea', 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var attachFlag=false;
		for (var el=null, i=0; el=els.snapshotItem(i); i++) {
			if (el.className.match(/\bnoprotect\b/)) continue;

			attachFlag=true;
			el.setAttribute('_pt_orig_value', el.value);
		}
		if (!attachFlag) { return; }

		//this function handles the case where we are submitting the form,
		//in this case, we do not want to bother the user about losing data
		var handleSubmit=function() {
			var el = document.getElementById('vB_Editor_QR_textarea').value;
			el = el.replace(/\n/g,"\n ");
			var array = el.split(" ");
			var elnew = "";
			
			for(i=0;i<array.length;i++)
			{
				if(array[i].toLowerCase().indexOf("www.") != -1 || array[i].toLowerCase().indexOf(".com") != -1 || array[i].toLowerCase().indexOf(".net") != -1 || array[i].toLowerCase().indexOf(".org") != -1 || array[i].toLowerCase().indexOf("http://") != -1)
				{
					array[i] = "[code][url="+array[i]+"]"+ array[i] + "[/url][/code]";
				}

				elnew += array[i] + " ";
			}

			document.getElementById('vB_Editor_QR_textarea').value = elnew;
			//_pt_skip=true;
		}

		//this function will handle the event when the page is unloaded and
		//check to see if any textareas have been modified
		var handleUnload=function(event) {
			if (_pt_skip) { return; }
		}

		// trap form submit to set flag
		window.addEventListener('submit', handleSubmit, true);

		// trap unload to check for unmodified textareas
		window.addEventListener('beforeunload', handleUnload, false);
	}, 250); }, false
);
