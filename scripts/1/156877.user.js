// ==UserScript==
// @name            Shortcuts
// @namespace       Terryx/Shorcuts
// @description     It's magic!
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
       
       		var re = /\[LQP\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Please familiarize yourself with the rules located [url=http://www.hackforums.net/misc.php?action=help&hid=10]here[/url].\n\n [quote]2. No short, low quality posts like \"bump\", \"lol\", \"roflmao\", \"thanks\" and any repeated characters to defeat the min character count.[/quote]\n\nAnything that is designed to bypass the character limit isn't allowed.");       
 		
        re = /\[INFECTED\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"This file is infected, if you downloaded it please visit the [url=http://www.hackforums.net/forumdisplay.php?fid=115]HijackThis Log Analyzer and Tutorials[/url] section where you will be provided with the correct instructions to disinfect your machine."); 

        re = /\[WTCS\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"http://www.hackforums.net/misc.php?action=help&hid=27 \n\n[color=#1E90FF][b]Can I PM Staff to ask them to change my username, edit my post, junk my threads or other similar tasks?[/b][/color] \nNo you may not. Being able to do things such as change your username, or edit old posts, is a subscriber-only privilege. It is unfair if non-paying members get these abilities too, through asking Staff; so we make it our policy to ignore all requests related to this. Please read the help doc [url=http://www.hackforums.net/misc.php?action=help&hid=13]Upgrading to L33T or Ub3r[/url] for any further information regarding upgrading to a subscriber account.");
   
}

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;