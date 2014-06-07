// ==UserScript== //
// @name           Site Hacker
// @namespace      http://scripting.douweikkuh.nl
// @description    Show's a (fake, off course) Website-hacked-message on the specified domains.
// @include        http://*
// ==/UserScript== //


//CONFIG START//

//Type in al to-be-hacked domains. Without 'http://' and the folder-stuff. Split them by using '; '
var hackedWebsites = "www.google.com; google.com"; 

//Type in the text to be showed on the hacked domains. HTML is allowed. Allowed vars:
//%URL%     is the websites URL (like 'http://www.website.com/content/contact.html')
//%DOMAIN%  is the websites domain (like 'www.website.com')
//%TITLE%   is the websites title (like 'Welcome at Website.com!')
var hackedMessage  = "<center><h1 style='color: red;'>This Website (%DOMAIN%) Is Hacked By GreaseMonkey Site Hacker!</h1></center>";

//CONFIG END//


var hackedWebsites = hackedWebsites.split('; ');
var hackedMessage  = hackedMessage.replace("%URL%",document.location.href);
var hackedMessage  = hackedMessage.replace("%DOMAIN%",document.domain);
var hackedMessage  = hackedMessage.replace("%TITLE%",document.title);

for(url in hackedWebsites){
  if(hackedWebsites[url] == document.domain){
    document.write(hackedMessage);
  }
}