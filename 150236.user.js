// ==UserScript==
// @name          book hider
// @description   readitswapit swap book hider
// @version	  1.0
// @author	  thefamousnomo
// @match         http://www.readitswapit.co.uk/SwapStage2.aspx?SwapID=*
// @match         https://www.readitswapit.co.uk/SwapStage2.aspx?SwapID=*
// ==/UserScript==

(function()
{
books = document.getElementsByClassName("bookcontainer");
for ( var i = 0; i < books.length; i ++ ) {
	var hider = document.createElement("a")
	hider.setAttribute("href", "#remove");
	hider.style.float="right";
	hider.style.paddingRight="10px";
	hider.innerHTML = "hide book";
	hider.onclick = function(e) {
	this.parentNode.style.display='none';
	}
books[i].insertBefore(hider, books[i].firstChild);
}
})()