// ==UserScript==
// @name kolz_ja-weihai-patch
// @namespace www.raphael-go.com
// @include http://www.ja-weihai.com/info/chn/bbs/ShowForum.htm*
// ==/UserScript==

function patch()
{
    console.log(document.location.href);
        document.title = "User Scripting";
	main_frame = document.getElementsByName("main_frame")[0];
	main_frame.rows = "*,0";
}

patch();