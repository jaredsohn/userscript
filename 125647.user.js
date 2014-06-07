// ==UserScript==
// @name            HF Script - HF Post Help Docs Helper P2
// @namespace       Yellows/hfhelpdocshelperP2
// @description     Adds additional phrases from the Help Docs that can be used in posts to assist members.P2
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	    //Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		
		
		//Common HelpDocs Start
		
		
		
		//Donate
		
		re = /\[Donate\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[b][color=#1E90FF]I want to donate. I can't find a link. Who do I contact?[/color][/b]\You must [url=http://www.hackforums.net/private.php?action=send&uid=1&subject=Donation]PM the owner Omniscient[/url]. He will provide you instructions.\Found in [url=http://www.hackforums.net/misc.php?action=help]Help Docs[/url] [url=http://www.hackforums.net/misc.php?action=help&hid=27]here[/url].");



		//Adult
		
		re = /\[Adult\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[b][color=#1E90FF]Hack Forum Rules[/color][/b]\8. No adult images, adult links, or adult account trading.\Found in [url=http://www.hackforums.net/misc.php?action=help]Help Docs[/url] [url=http://www.hackforums.net/misc.php?action=help&hid=10]here[/url].");


		//Common HelpDocs End

 }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;