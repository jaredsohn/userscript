// ==UserScript==
// @name           Likes
// @description    TEST
// @include        *
// @version         1.0!
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "50px";
	div.style.left = "0px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
	div.innerHTML = "<style></style><a title=\"Please Like\" style=\"text-decoration:none;color:#888;\" href=\"https://www.facebook.com/United.Hacing.Kingdom?sk=wall&filter=1\" target=\"_blank\" onclick=\"return fbpage_set_fan_status(this, &quot;157419607610623&quot;, 1, 1, null, null, {&quot;preserve_tab&quot;:true,&quot;fan_origin&quot;:&quot;page_profile&quot;})\"><img  src=\"http://maxcod.ucoz.com/like.png\" /></a>"
	body.appendChild(div);
}

String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	
	var emoticons = [];