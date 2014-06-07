// ==UserScript==
// @name           FBth
// @description    TEST!
// @include        *facebook*
// @version        1.0!
// ==/UserScript==

body = document.body;
if(body != null) {

        div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "300px";
	div.style.left = "0px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
        div.innerHTML = "<iframe src=\"//www.facebook.com/plugins/subscribe.php?href=\https%3A%2F%2Fwww.facebook.com%2Falideniz.ozgul&amp;layout=button_count&amp;show_faces=false&amp;colorscheme=dark&amp;font&amp;width=110\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:110px;\" allowTransparency=\"true\"></iframe>"
	
    body.appendChild(div); 
}