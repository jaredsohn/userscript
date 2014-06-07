// heavily quoting : http://stackoverflow.com/questions/3282986/modifying-all-links-w-greasemonkey

// ==UserScript==

// @name            couch

// @namespace       DNUK

// @include         http://www.doctors.net.uk/pet/default.aspx*

// @include         https://www.doctors.net.uk/pet/default.aspx*

// ==/UserScript==





  var links=document.links;
  var link;

  for (i=0;i<links.length;i++) {
	link = links[i];
	link.href= link.href.replace("viewPost","editPost");

  }

	