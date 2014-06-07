// ==UserScript==
// @name                TPD CT Thingy
// @namespace	        http://ikariamtpd.awardspace.biz/index.php
// @description	        Oh my god, its full of stars!
// @include		http://s1.en.ikariam.com/index.php?view=museum*
// ==/UserScript==

var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<iframe frameborder="0" src="http://ikariamtpd.awardspace.biz/index.php" width="1000" height="300"></iframe><br><br><br>';
document.body.appendChild(elmNewContent)
