// ==UserScript==
// @name           Lolcat HTTP Errors
// @description    Redirects 403, 404, 500, and 502 

errors to a much more amusing page 
// @author        blacklotus90
// @namespace     http://userscripts.org/scripts/show/120467
// @version       1.1
// @include       *
// ==/UserScript==

function check() {
if (document.title == "502 Bad Gateway" ) { 
document.location.href="http://farm8.staticflickr.com/7158/6508023429_735b433a36_z.jpg";
}
else if (document.title == "403 Forbidden" ) { 
document.location.href="http://farm8.staticflickr.com/7173/6508023617_f3ffc34e17_z.jpg";
}
else if (document.title == "500 Internal Server Error" ) { 
document.location.href="http://farm8.staticflickr.com/7001/6509400855_aaaf915871_z.jpg";
}
else if (document.title == "404 Not Found" ) {
document.location.href="http://farm8.staticflickr.com/7172/6508022985_b22200ced0_b.jpg";
}
}
check();