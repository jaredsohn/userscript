// ==UserScript==
// @name		Mixx Submit Listing Tags Remaining
// @author		Erik Vold
// @datecreated	2009-11-01
// @lastupdated	2009-11-01
// @namespace	mixxSubmitListingTagsRemaining
// @include		http://www.mixx.com/submit/step2
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version		0.1
// @description	This userscript will display the number of tags that you have remaining out of the 8 tag limit on Mixx.
// ==/UserScript==

(function(){
	var tags=document.getElementById('thingy_new_tags');
	var remaining=8;
	if(!tags) return;

	var newCounterSpan=document.createElement('span');
	newCounterSpan.className='counter';
	var newCounter=document.createElement('strong');
	newCounter.innerHTML=remaining;
	newCounterSpan.appendChild(document.createTextNode("(Tags remaining: "));
	newCounterSpan.appendChild(newCounter);
	newCounterSpan.appendChild(document.createTextNode(")"));

	GM_addStyle((<><![CDATA[
		form#submit_thingy_form li.tags span.counter {
			color:#000;
			display:block;
			font-size:95%;
			font-style:normal;
			margin:0.3em 0 0;
		}
	]]></>).toString());

	var exec=function(){
		var t=tags.value.split(/\s*,\s*/);
		if(t[0]=="") t.splice(0,1);
		if(t[t.length-1]=="") t.pop();
		var rem=8-t.length;
		if(rem==remaining) return;
		remaining=rem;
		newCounter.innerHTML=rem;
	}
	exec();

	tags.addEventListener("keyup",exec,false);

	tags.parentNode.insertBefore(newCounterSpan,tags.nextSibling);
})();