// ==UserScript==
// @name        OV Deletion Confirmation
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Gives you a dialog box to confirm before deleting any album, photo, video, or blog on Onverse.com.
// @include     http://www.onverse.com/profile/view*?*
// @grant		none
// @version     1
// ==/UserScript==

(function() {
	var deletecommand = '';
	var medium;
	var el = '';
	/* Gets DOM element for delete link of each type, along with the medium type for each page */
	switch(document.URL.substring(31,document.URL.indexOf('?', 31))) {
		case 'viewalbum.php':
			medium = 'photo album';
		case 'viewvideoalbum.php':
			if(!medium)
				medium = 'video album';
			el = document.getElementsByClassName('captionArea')[0].childNodes[0];
			break;
		case 'viewphoto.php':
			medium = 'photo';
		case 'viewvideo.php':
			if(!medium)
				medium = 'video';
			el = document.getElementsByClassName('captionArea')[0].childNodes[0].childNodes;
			el = el[el.length-1];
			break;
		case 'viewblogentry.php':
			medium = 'blog entry';
			el = document.getElementsByClassName('blogEntryCtrls')[0].childNodes;
			el = el[el.length-1];
			break;
		default:
			return;
	}
	/* Extra info, DOM location for delete link of each page type: */
	/* (.captionArea)(viewalbum viewvideoalbum - element.childNodes[0]) */
	/* (.captionArea)(viewphoto viewvideo - element.childNodes[0].childNodes[element.childNodes[0].childNodes.length-1]) */
	/* (.blogEntryCtrls)(viewblogentry - element.childNodes[element.childNodes.length-1]) */
	/* Not implemented: viewmessage (.delbutton)(viewfriends) */
	if(el.tagName != 'A') /* Delete link not found */
		return;
	deletecommand = el.href;
	el.href = "javascript:(function(){document.getElementById('notif').style.display = 'block';})();";

	/* Placement of HTML code in page: */
	var newstyle = "<style>#notif { background-color: #AAAAAA; height: 120px; left: 0; position: fixed; right: 0; text-align: center; -moz-box-shadow: 0 0 15px 10px #AAAAAA, 0 0 15px 10px #AAAAAA; -webkit-box-shadow: 0 0 15px 10px #AAAAAA, 0 0 15px 10px #AAAAAA; box-shadow: 0 0 15px 10px #AAAAAA, 0 0 15px 10px #AAAAAA; top: 40%; top: -moz-calc(50% - 60px); top: -ms-calc(50% - 60px); top: -o-calc(50% - 60px); top: -webkit-calc(50% - 60px); top: calc(50% - 60px); border-collapse: separate; } #notif a { background-color: #FF9C42; border: 1px solid #C65E00; color: white; font-weight: bold; padding: 5px 8px; } #notif a:hover { text-decoration: none; } #notif h2 { margin: 20px 0; }</style>"
	var newelement = "<div id=\"notif\" style=\"display: none;\">\n\t<h2>Are you sure you wish to delete this " + medium + "?</h2>\n\t<a href=\"" + deletecommand + "\">Yes</a> <a href=\"javascript:(function(){document.getElementById('notif').style.display = 'none';})();\">No</a>\n</div>";
	document.body.innerHTML += newstyle + newelement;
})();