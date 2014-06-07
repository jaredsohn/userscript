// ==UserScript==
// @name           Mass Unblocker
// @namespace      download
// @description    Adds a button so you can unblock multiple users at once on Youtube.
// @include        http://www.youtube.com/address_book
// ==/UserScript==

addEventListener("load",function()
{
	var delBtn=document.getElementById("ab-button-delete");
	var unbBtn=document.createElement("button");
	unbBtn.appendChild(document.createElement("span"));
	unbBtn.children[0].className="yt-uix-button-content";
	unbBtn.children[0].textContent="Unblock";
	unbBtn.id="ab-button-unblock";
	unbBtn.className="yt-uix-button yt-uix-button-primary";
	unbBtn.setAttribute("onclick","addressBook.handleUnblock();return false;");
	delBtn.parentNode.insertBefore(unbBtn,delBtn);
},false);
