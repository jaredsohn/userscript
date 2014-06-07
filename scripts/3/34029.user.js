// ==UserScript==
// @name           Emoticon Replace
// @namespace      http://www.designbyenvision.com/
// @description    Replaces text-based emoticons with images.
// @include        *
// ==/UserScript==

function addIcons()
{
   // Smile
   document.body.innerHTML = document.body.innerHTML.replace(":)", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif\" alt=\":)\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":-)", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif\" alt=\":-)\" />");
   // Surprised   
   document.body.innerHTML = document.body.innerHTML.replace(":-O", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/omg_smile.gif\" alt=\":-O\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":o", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/omg_smile.gif\" alt=\":o\" />");
   // Wink   
   document.body.innerHTML = document.body.innerHTML.replace(";-)", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/wink_smile.gif\" alt=\";-)\" />");
   document.body.innerHTML = document.body.innerHTML.replace(";)", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/wink_smile.gif\" alt=\";)\" />");
   // Confused
   document.body.innerHTML = document.body.innerHTML.replace(":-S", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/confused_smile.gif\" alt=\":-S\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":s", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/confused_smile.gif\" alt=\":s\" />");
   // Crying
   document.body.innerHTML = document.body.innerHTML.replace(":'(", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/cry_smile.gif\" alt=\":'(\" />");
   // Open-mouthed
   document.body.innerHTML = document.body.innerHTML.replace(":-D", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/teeth_smile.gif\" alt=\":-D\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":d", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/teeth_smile.gif\" alt=\":d\" />");
   // Tongue out
   document.body.innerHTML = document.body.innerHTML.replace(":-P", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/tongue_smile.gif\" alt=\":-P\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":P", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/tongue_smile.gif\" alt=\":P\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":p", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/tongue_smile.gif\" alt=\":p\" />");
   // Sad
   document.body.innerHTML = document.body.innerHTML.replace(":-(", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/sad_smile.gif\" alt=\":-(\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":(", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/sad_smile.gif\" alt=\":(\" />");
   // Disappointed
   document.body.innerHTML = document.body.innerHTML.replace(":-|", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/what_smile.gif\" alt=\":-|\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":|", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/what_smile.gif\" alt=\":|\" />");
   // Embarrassed
   document.body.innerHTML = document.body.innerHTML.replace(":-$", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/red_smile.gif\" alt=\":-$)\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":$", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/red_smile.gif\" alt=\":$\" />");
   // Angry
   document.body.innerHTML = document.body.innerHTML.replace(":-@", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/angry_smile.gif\" alt=\":-@\" />");
   document.body.innerHTML = document.body.innerHTML.replace(":@", "<img src=\"http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/angry_smile.gif\" alt=\":@\" />");
}

window.addEventListener("load", function() { addIcons(); }, false);