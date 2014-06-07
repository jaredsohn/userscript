// ==UserScript==
// @name       FCnet
// @namespace  Greyersting
// @version    0.1
// @description  Remove option for Cnet installer, replace it with direct download button.
// @match      *download.cnet.com*
// @copyright  NONE
// ==/UserScript==

var yesno = document.body.innerHTML.indexOf('CNET Installer Enabled');
// alert(yesno);
if(yesno > -1){
	var start_pos = document.body.innerHTML.indexOf('<div class="downloadNow OM-Tracked"> <a href="http://dw.com.com/redir');
	var end_pos = document.body.innerHTML.indexOf('</span> <span class="dlmNotice dlButtonMsg">CNET Installer Enabled</span></a> </div>',start_pos);
	var rem = document.body.innerHTML.substring(start_pos,end_pos);
	var remfix = rem + '</span> <span class="dlmNotice dlButtonMsg">CNET Installer Enabled</span></a> </div>';
	// alert(remfix);

	document.body.innerHTML = document.body.innerHTML.replace(remfix,'');
	document.body.innerHTML = document.body.innerHTML.replace('<span class="dlmNotice dlButtonMsg">CNET Installer Enabled</span>', '');
	document.body.innerHTML = document.body.innerHTML.replace('<span class="dlNowCTA">Download Now</span>', '');
        // Previously used image- http://i.imgur.com/XpueRQ2.png
	document.body.innerHTML = document.body.innerHTML.replace('" id="loggedInUserDlLink">Direct Download Link</a> </div>','" id="loggedInUserDlLink"><img src="http://i.imgur.com/rrOCjNW.png" border="0" style="border:none;max-width:100%;" alt="" /></a> </div>');
}