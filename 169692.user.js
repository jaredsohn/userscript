// ==UserScript==
// @name            Muzzy PH
// @namespace       Muzzy Post Helper
// @description     For Muzzy
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
		
		//Mentors

		elmTextarea.value = elmTextarea.value.replace("<3","&#9829;");
		
		var re = /\[hacker\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Becoming a hacker is a long and hard road. First off, you'll need to learn the following programming languages. Although you'll pick up more later, these ones will be fundamental, and can be built on with other languages:

[url=http://www.hackforums.net/forumdisplay.php?fid=118]Visual basic.[/url]
[url=http://www.hackforums.net/forumdisplay.php?fid=117]C/C++[/url]
[url=http://www.hackforums.net/forumdisplay.php?fid=131]Java[/url]
[url=http://www.hackforums.net/forumdisplay.php?fid=154]PHP[/url]
[url=http://www.hackforums.net/forumdisplay.php?fid=49]Batch[/url]

Although 'hacking' covers many different fields, having a solid understanding of these programming languages will advance your knowledge in the field of computing far enough to be able to understand more or less every other field much easier than you would have.

Next, you'll need to learn at least basic networking. Learning how computers interact is VITAL in going down the road of a hacker.

[url=http://www.hackforums.net/forumdisplay.php?fid=240]Networking[/url].

You'll then want to pick up the basics of RATting, DDoSing, using a java drive by and crypting. Although these aren't actual hacking, they're useful utilities and skills to learn that will allow you to easily kick someone offline or infect them with a virus.

[url=http://www.hackforums.net/showthread.php?tid=2698687]RATting.[/url]
[url=http://www.hackforums.net/showthread.php?tid=3390141]Crypting.[/url]
[url=http://www.hackforums.net/showthread.php?tid=3360506]DDoSing.[/url]
[url=http://www.hackforums.net/showthread.php?tid=2975830]Java drive by.[/url]

Want to learn to hack sites? SQLi and XSS are a great place to start.

[url=http://www.hackforums.net/showthread.php?tid=593766]SQLi[/url]
[url=http://www.hackforums.net/showthread.php?tid=1838379]XSS[/url]

Any further question will be answered here:
[url=http://www.hackforums.net/showthread.php?tid=3090217]Click me <3[/url]

Also, look around the web for social engineering techniques. Discussion of SE isn't allowed here, so you'll have to look elsewhere.

Good luck!");

		var re = /\[rat\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"The fastest method isn't hacking. It involves using a piece of software called a RAT to get every password stored on someone's computer.

Learn how to RAT [url=http://www.hackforums.net/showthread.php?tid=2698687]here.[/url]");
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;

  }
   form._submit();
}
window.addEventListener('submit',form_submit, true);
HTMLFormElement.Version._submit = HTMLFormElement.Version.submit;
HTMLFormElement.Version.submit = form_submit;