// ==UserScript==
// @namespace     http://www.nsaneproductions.com/
// @name          Rapidshare Ad & Nag Remover
// @description   Completely removes all ads and premium member nags.
// @include       http://rapidshare.de/*
// @include       http://*.rapidshare.de/*
// @exclude       http://*.rapidshare.de/*/progress.html*
// @exclude       http://*.rapidshare.de/cgi-bin/upload.cgi*
// ==/UserScript==

(function() {

	// set the known 'free button' variables
	free1 = document.getElementsByName("letsgo")[1];
	free2 = document.getElementsByName("startdl")[1];
	free3 = document.getElementsByName("dl.start")[1];

	// if a free button's found click it
	if (free1) {
		free1.click();
	} else if (free2) {
		free2.click();
	} else if (free3) {
		free3.click();
	}

	// set an interval loop to check for the stupid wait counter
	var int1 = setInterval("if (c && c > 40) {c = 40;}", 100);
	
	// if the timer's there but has reached, or is less than, 40secs kill the loop
	var int2 = setInterval("if (c && c =< 40) {clearInterval(int1); clearInterval(int2);}", 100);

	// apply ad removal code AFTER the page code in rendered, but before anything's loaded
	window.addEventListener("load", function() {

		// gather all the tags matching the b/s we're removing
		clean = document.getElementsByTagName("td")[0];
		crap1 = document.getElementsByTagName("a");
		crap2 = document.getElementsByTagName("font");
		g1 = document.getElementById("my_g_head");
		g2 = document.getElementById("my_g_first");
		g3 = document.getElementById("my_g_second");

		// kill those fuckin ads and nags
		document.bgColor = '#E2E6ED';
		clean.height = '0';
		crap1[0].innerHTML = '';
		crap1[2].innerHTML = '';
		crap1[6].innerHTML = '';

		// the crap that's NOT global is checked before removal, to prevent errors
		if (crap2[1] && crap2[1].color == 'red' && crap2[1].innerHTML != 'HAPPY HOURS active!') {
			crap2[1].innerHTML = '';
		}
		else if (crap2[2] && crap2[2].color == 'red' && crap2[2].innerHTML == 'You want to download a file. Please scroll down to choose FREE or PREMIUM-download.') {
			crap2[2].innerHTML = '';
		}

		if (g1) {
			g1.innerHTML = '';
		}

		if (g2) {
			g2.innerHTML = '';
		}
    
		if (g3) {
			g3.innerHTML = '';
		}

		if (typeof(frm_num) != 'undefined' && typeof("tp_frame" + frm_num) != 'undefined') {
			frmvar = "tp_frame" + frm_num;
			frmvar.style.display = 'none';
		}

	}, false);

})();

/*  CHANGELOG

	Version 1.0.0:
		- Added counter check to to prevent having to wait longer than 40secs on popular files
			+ NOTE: You HAVE to wait 40secs otherwise you'll get the javascript error, so it's ignored...
			  ...but it's still nice not having to wait a minute something for popular files ;)
			+ Variable hijack based on method by CBWhiz: http://userscripts.org/scripts/show/1919
			+ Thanks to mee of userscripts.org, for bringing this to my attention
		- Fixed a JS error with the refreshing footer ad's removal code

	Version 0.9.1:
		- Removed an exclusion URL accidently left behind from the script merger.
		- Removed version number from script name, so you shouldn't have to uninstall older versions after this.
     
	Version 0.9:
		- The two seperate files have been re-merged into one.

	Version 0.8:
		- Updated due to changes in the Rapidshare layout that affected the script.

	Version 0.7:
		- Split the ad remover and Free clicker into 2 scripts, being in the same script caused problems with
		  the download pages and the ad removal code.
		- Fixed a problem that could SERIOUSLY flood your JavaScript Console with errors.
			+ A few of my other scripts also suffer from this, and will be fixed accordingly, so stay tuned!
		- Updated ad removal code, those guys are tryin to fill every damn inch of their site with ads now.
		- Updated code due to the Free & Premium button switch.
     
	Version 0.6:
		- Updated due to changes in the Rapidshare layout that affected the script.
		- Minor code optimizations.

	Version 0.5:
		- Completely removes all ads and premium member nags.

	Version 0.4:
		- Updated due to a name change of the free button.

	Version 0.3:
		- Seperated from the ad remover script, which contained a bug.
		- I also switched over to the getElementsByName fucntion so the button slection should be a bit faster.

	Version 0.2:
		- Fixed bug with the 'free or premium' page.

	Version 0.1:
		- Initial release.
		- Based on: http://ferruh.mavituna.com/opensource/greasemonkey/fmrapidshare.user.js

*/