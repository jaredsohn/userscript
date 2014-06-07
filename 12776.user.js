// ==UserScript==
// @name           Facebook Mobile Mailto Link
// @include        *.thefacebook.com/profile.php*
// @include        *.facebook.com/profile.php*
// @description   Converts Mobile numbers into Text Message Mailto Links
// ==/UserScript==

var mobile_number = document.body.innerHTML.match(/Mobile:<\/td>\n<td class="data"><div class="datawrap">((\d{3})\.(\d{3})\.(\d{4}))/)[1];

// I'm using teleflip. I'm sure there is a better way to do this.
var link = "<a href='mailto:"+ mobile_number.replace(/\./g, "") +"@teleflip.com'>" + mobile_number +'</a>';

document.body.innerHTML =document.body.innerHTML.replace(mobile_number, link);
