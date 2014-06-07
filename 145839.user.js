// ==UserScript==
// @name		HF Scripts - Scammer Warning Search
// @namespace 		xerotic/hfqwazzscammers
// @description 	Qwazz's scam report idea.
// @include  		*hackforums.net/showthread.php*
// @include  		*hackforums.net/member.php*
// @version  		1.0.0
// ==/UserScript==

if(window.location.href.toString().indexOf("showthread.php")!=-1) {
	var post_author = document.getElementsByClassName("post_author");
	for(z in post_author) {
		var morespecific = post_author[z].getElementsByClassName("largetext")[0];
		var uid = morespecific.innerHTML.match(/uid\=(\d*)/);
		uid = uid[1];
		theHTML = "<form method=\"post\" action=\"search.php\" style=\"display:inline;\" target=\"_blank\">";
		theHTML = theHTML + "<input type=\"hidden\" name=\"action\" value=\"do_search\" />";
		theHTML = theHTML + "<input type=\"hidden\" name=\"postthread\" value=\"1\" />";
		theHTML = theHTML + "<input type=\"hidden\" name=\"keywords\" value=\"" + uid + "\" />";
		theHTML = theHTML + "<input type=\"hidden\" name=\"forums[]\" value=\"111\" />";
		theHTML = theHTML + "<input type=\"image\" src=\"http://cdn1.iconfinder.com/data/icons/silk2/exclamation.png\" />";
		theHTML = theHTML + "</form> ";
		if(morespecific.innerHTML.indexOf('uid=')!=-1) {
			newHTML = theHTML + morespecific.innerHTML;
			morespecific.innerHTML = newHTML;
		}
	}
} else if(window.location.href.toString().indexOf("member.php")!=-1) {
	var morespecific = document.getElementsByClassName("largetext")[0];
	var uid = document.body.innerHTML.match(/uhuid\=(\d*)/);
	uid = uid[1];
	theHTML = "<form method=\"post\" action=\"search.php\" style=\"display:inline;\" target=\"_blank\">";
	theHTML = theHTML + "<input type=\"hidden\" name=\"action\" value=\"do_search\" />";
	theHTML = theHTML + "<input type=\"hidden\" name=\"postthread\" value=\"1\" />";
	theHTML = theHTML + "<input type=\"hidden\" name=\"keywords\" value=\"" + uid + "\" />";
	theHTML = theHTML + "<input type=\"hidden\" name=\"forums[]\" value=\"111\" />";
	theHTML = theHTML + "<input type=\"image\" src=\"http://cdn1.iconfinder.com/data/icons/silk2/exclamation.png\" />";
	theHTML = theHTML + "</form> ";
	newHTML = theHTML + morespecific.innerHTML;
	morespecific.innerHTML = newHTML;
}