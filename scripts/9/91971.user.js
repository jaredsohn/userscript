// ==UserScript==
// @name          Accept all friends on facebook
// @namespace     http://cedric
// @description   Accept all friend requests on facebook
// @include       http://www.facebook.com/friends/edit/?sk=requests*
// ==/UserScript==

HTMLElement.prototype.clickHM = function(x, y) {
   var evt = this.ownerDocument.createEvent("MouseEvents");
   evt.initMouseEvent("click", true, true, this.ownerDocument.defaultView, 1, 0, 0, x, y, false, false, false, false, 0, null);
   this.dispatchEvent(evt);
};

function refreshContent(){
	var linkRefresh = document.getElementById("sideNav").childNodes[0].childNodes[1].childNodes[0];
	linkRefresh.clickHM(linkRefresh.offsetLeft + 20, linkRefresh.offsetTop + 20);
	setTimeout("acceptFriends()",10000);
}

function getValues(objName)
{  
    var arr = new Array();
    arr = document.getElementsByName(objName);
    
    for(var i = 0; i < arr.length; i++)
    {
        var obj = document.getElementsByName(objName).item(i);
        obj.click(0, 0);
    }
    setTimeout("refreshContent()",85000);
}
	

function acceptFriends(){
	getValues("actions[accept]"); 
}


var topMenu = document.getElementById('pageNav');
topMenu.innerHTML = '<li> <span onclick="acceptFriends()"> Accept all </span></li>' + topMenu.innerHTML;



