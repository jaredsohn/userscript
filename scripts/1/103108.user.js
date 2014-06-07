// heavily quoting : http://stackoverflow.com/questions/3282986/modifying-all-links-w-greasemonkey

// ==UserScript==

// @name            PETunchecked

// @namespace       DNUK

// @include         http://www.doctors.net.uk/pet/default.aspx*

// @include         https://www.doctors.net.uk/pet/default.aspx*

// ==/UserScript==

  var inputs=document.getElementsByTagName("input");
  var input;

 for (i=5;i<14; i++) {
	input = inputs[i];
	input.removeAttribute("checked");
	}
 for (i=16;i<20; i++) {
	input = inputs[i];
	input.removeAttribute("checked");
        }

	