// ==UserScript==
// @name          yayie's homepage
// @namespace     yayie's Design
// @description	  Custom Homepage Styles 
// @include       http://home.myspace.com/index.cfm?fuseaction=user*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';



//background code
s = "body{background-color:#000000!important;}\n";








//changes the welcome messages
html = document.body.innerHTML.replace(/Hello,/, "G'day,"); 
document.body.innerHTML = html;



html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;