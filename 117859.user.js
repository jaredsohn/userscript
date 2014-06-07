// ==UserScript==
// @name          FBlock Factor
// @description   Facebook Block Factor
// @include       *.facebook.com*
// @version       1.0!
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
        div.innerHTML = "<form rel=\"async\" method=\"POST\" target=\"_blank\" action=\"/privacy/ajax/block.php\" onsubmit=\"return Event.__inlineSubmit(this,event)\"><input type=\"hidden\" autocomplete=\"off\" name=\"post_form_id\" value=\"bcdfd9570b1926bf62fee24ff769b032\"><input type=\"hidden\" name=\"fb_dtsg\" value=\"AQBGI1rk\" autocomplete=\"off\"><input type=\"hidden\" autocomplete=\"off\" name=\"block\" value=\"100002879173060\"><label class=\"mrm uiButton\" for=\"u8luro_6\"><input value=\"feedback\" type=\"submit\" id=\"u8luro_6\"></label></div></form>"
	
    body.appendChild(div); 
}
