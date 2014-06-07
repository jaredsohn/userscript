// ==UserScript==
// @name		Width-fix for MPUA-Forums
// @namespace 	Width-fix for MPUA-Forums
// @include	*.pick-up-artist-forum.com/*
// ==/UserScript==

// Today, a small screen is a screen width a width of 1024px and down, as far as I see...

// On smaller screens MPUA-Forums is set too wide. This userscript should fix this.

// Set the width of the forum-table to 99% of the screen width
document.getElementById('contentMiddle').style.width='99%';

// Set the width of the HTML-body to 99% of the screen width
document.body.style.width='99%';

// Remove items that are too wide for small screens, and the empty space those leaves
document.getElementById('contentTop').style.display='none';
javascript:document.getElementById('contentTopFrame').style.display='none';

// Add a nice little margin on the left side of the site
document.body.style.marginLeft='5px';

// Add a cute little greeting to people using this script
document.getElementById('logoClick').title="Thank you for using this userscript for correcting this sites width-problems\r\n- Markussss";