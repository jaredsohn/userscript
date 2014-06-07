// ==UserScript==
// @name            Blue Letter Bible Autologin	
// @namespace       
// @description     Auto-login to Blue Letter Bible's daily reading program located at http://cf.blueletterbible.org/reader/daily/
// @include         http://cf.blueletterbible.org/reader/daily/
// @include         http://cf.blueletterbible.org/reader/daily/myblb/index.cfm
// It's probably best to just favorite http://cf.blueletterbible.org/reader/daily/  That way you can just click that bookmark and you'll be logged in!
// ==/UserScript==

//On the login page, this submits the form if your password is saved in Firefox
if (window.location=="http://cf.blueletterbible.org/reader/daily/") {
   document.forms[1].submit();
};

//Once logged in, this redirects you as if you just clicked 'Read Passage' since that's what you're there for
if (window.location=="http://cf.blueletterbible.org/reader/daily/myblb/index.cfm") {
   window.location="http://cf.blueletterbible.org/reader/daily/myblb/read.cfm";
};