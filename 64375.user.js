// ==UserScript==
// @name           Orkut Redirector
// @version        1.0 Date: 17/12/2009
// @author         Prashant P Patil
// @profile        http://www.orkut.co.in/Profile?uid=17618220612205038709
// @scripturl      
// @Siteurl       https://www.chat32.com/
// @namespace      Redirects from your unlike community!
// @description    Orkut Redirector: Try out to get redirect from your unlike community if you are orkut addicted and dont want to waste time in that community! Fuck off those peoples man!!! 
// @include        http://www.orkut.*
// ==/UserScript==
var add = window.location;
if(add == "http://www.orkut.co.in/Main#Community?cmm=10128" || add == "http://www.orkut.co.in/Community?cmm=10128") { window.location = "http://www.orkut.com/Main#Home"; }