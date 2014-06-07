// ==UserScript==
// @name           Wiki sidebar tweak
// @description    Keep the sidebar of Wiki's always visible and keep the languages you know on top in the 'other languages'-box
// @namespace      http://www.netvibes.com/jordi
// @author         Jordi De Groof
// @version        1.5.1
// @include        *wiki*
// ==/UserScript==

/**
* Known bugs: language adjustment not working on wikisource (http://en.wikisource.org)
* Opera only: language adjustment can't be stored
**/

/**
 CHANGELOG:
**
1.5.1 (October 9, 2010)
Fix in the prefered languages code
**
1.5 (August 3, 2010)
Compatibility with new Wikipedia style
**
1.4.1 (March 29, 2010-
Arrows are now base64-encoded (for compatibility with Konqueror)
**
1.4 (April 25, 2009)
Implemented moving of the elements in the sidebar
**
1.3.1
Fixed invisible search suggestions
**
1.3 (April 21, 2009)
Placed links on top of the page in the sidebar
**
1.2 (March 18, 2009)
Improved displaying of sidebar  with limited screen estate available
Persistent hiding of sidebar items
**
1.1.1 (November 8, 2008)
Fixed bug concerning featured articles in the language highlight function
**
1.1 (June 13, 2008)
Added compatibility with opera (when a slightly modified version of  'Emulate Greasemonkey functions' (http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js) is installed)
**
1.0.1 (February 8, 2007)
Bug Fixes:
 - Fixed when no favourite languages were selected, sidebar tweak would crash and exit
 - When Firefox bug 235441 (https://bugzilla.mozilla.org/show_bug.cgi?id=235441) is fixed, the script will continue to work normally (changed useCapture to false in addEventListener calls)
 - When the window is to small to show all the languages, the non-referred languages are shown completely, without scrollbar, like in the previous version could happen
 - When there is more space then languages, the language box has the height of the languages it contains, no longer of the window height
**
1.0 (February 3, 2007)
Initial release, a merge of two of my previous scripts
**/

(function()
{
	var arrowOpened= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACvSURBVDiNxdMhDsIwFIfxrwhCMHM7AB6wKBSa7ApYPEfgBFgMJ%2BAmBE1QGOQcQRD%2BmAeBbiusEzSp6vt%2B4iV1kmhyWo1qwAFzII3szwAZoIh7A8bYDjYRwEISTyABTjXirSRegCET4P5DfASSAmDI6kt8AYYfjQd0gUMAmL3PFwBDRrZhP177s6WAIUsv3gGdOkAb2FucA72yuUrAkD5wBaZVM0HAkEHoXRLu77%2FxAZJ7RmWMSzjuAAAAAElFTkSuQmCC";
	var arrowClosed= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACNSURBVDiNpdOtDoFhGAbgayMINpukOwTdAShORtZtjsCmmuQYnIGkil%2FWjVv6NunD%2B4Y7POG5wvMjiSSwx6Ctf40PILhgWgMEdyxrgOCFDXqlQJszJjVA0GBeAwQPrGqANieMaoDgUAo8sEa%2FBLhiVjKDJ7ZdJ94F3LrW9w3YYVhyyg0Wpc90xPif5iTeK%2BwbA2Zt7EQAAAAASUVORK5CYII%3D";
	
	// Define GM_addStyle for compatibility with opera (in combination with 'Emulate Greasemonkey functions' (http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js))
	if (typeof GM_addStyle == "undefined") {
		function GM_addStyle(css) {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node); 
			}
		}
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	
	function adjustLangs()
	{
		//Adjust list of languages
		var langBox= document.getElementById("p-lang");
		if(!langBox) return;
		
		var container= document.getElementById("container");
		if(!container) return;
		
		var columnTop= document.getElementById("columnTop");
		if(!columnTop)
		  columnTop= document.getElementById("mw-panel");
		
		var realHeight= parseFloat(window.getComputedStyle(columnTop, "").getPropertyValue("height"));
		var langHeight= parseFloat(window.getComputedStyle(langBox, "").getPropertyValue("height")) - parseFloat(window.getComputedStyle(container, "").getPropertyValue("height"));
		var langBoxTop= langBox.offsetTop;
		var boxHeight= (realHeight - langBoxTop) - langHeight-10;
		
		var containerHeight= parseFloat(container.firstChild.scrollHeight);
		if(boxHeight < 35 || boxHeight >= containerHeight) boxHeight= containerHeight+10;
		container.style.height= boxHeight  + "px";
	}
	
	function toggleSide(e)
	{
		var content= e.target;
		while(content.tagName !== 'DIV') content= content.parentNode;
		
		content= content.getElementsByTagName('DIV')[0];
		var arrow= content.parentNode.getElementsByTagName('H5')[0].getElementsByTagName('A')[0].getElementsByTagName('IMG')[0];
		
		var collapsedBoxes= GM_getValue("collapsedBoxes", "").split(",");
		
		if(content.style.display === 'none')
		{
			content.style.display= 'block';
			arrow.src= arrowOpened;
			collapsedBoxes.splice(collapsedBoxes.indexOf(content.parentNode.id), 1);
		}
		else
		{
			content.style.display= 'none';
			arrow.src= arrowClosed;
			collapsedBoxes.push(content.parentNode.id);
		}
		
		GM_setValue("collapsedBoxes", collapsedBoxes.join(","));
		
		adjustLangs();
	}	
	
	function unFavLang(e)
	{
		var content= e.target.parentNode;
		
		var prefLangs= GM_getValue("langs", "");
		prefLangs= prefLangs.replace(" " + content.className, "");
		GM_setValue("langs", prefLangs);
		
		e.target.innerHTML= " [+]";
		e.target.removeEventListener("click", unFavLang, false);
		e.target.addEventListener("click", favLang, false);
		
		var container= document.getElementById("container").firstChild;
		container.insertBefore(content, container.lastChild);
		
		adjustLangs();
	}
	
	function favLang(e)
	{
		var content= e.target.parentNode;
		
		GM_setValue("langs", GM_getValue("langs", "") + " " + content.className);
		
		e.target.innerHTML= " [-]";
		e.target.removeEventListener("click", favLang, false);
		e.target.addEventListener("click", unFavLang, false);
		
		var lLang = document.getElementById("container").parentNode;
		lLang.parentNode.insertBefore(content, lLang.parentNode.firstChild);
		
		adjustLangs();
	}
	
	function adjustLangsStyle()
	{		
		var pLang = document.getElementById("p-lang");
		var lLang= pLang.getElementsByTagName('LI');
		var state;
		var a;
		for(a= 0; a < lLang[0].childNodes.length; a++)
		{
			if(lLang[0].childNodes[a].className === "langFav")
			{
				if(lLang[0].childNodes[a].style.display === "none") state= "inline";
					else state= "none";
				break;	
			}
		}
		for(var b= 0; b < lLang.length; b++)
		{
			lLang[b].childNodes[a].style.display= state;
		}
	}
	
	function sidebarOnTop()
	{		
		// Begin code to keep sidebar on top
		var sidebar = document.getElementById("column-one");
		if(!sidebar) {
		  // New style
		  GM_addStyle("#mw-panel { position:fixed !important; top:0 !important; height: 100%; overflow: auto;}");
		  GM_addStyle("#p-logo { display: none; }");
		  return;
		}
		var sideList= sidebar.childNodes;
		var style= "";
		var rtl= (document.getElementsByTagName("html")[0].dir === "rtl");
				
		var place= 0;
		
		style+= '#p-navigation a {display: inline; padding-top: 0px;}';	// Ensure that arrow of navigation element is next to the text
		style+= '.portlet { margin: 0; margin-right: 20px;}';
		style+= '#p-logo { display:none; }'; // Hide logo
		style+= '#content { margin-top: 1em !important; }';
		
		var columnTop= document.createElement("div");
		columnTop.style.position= "fixed";
		columnTop.id= "columnTop";
		columnTop.style.height= "100%";
		columnTop.style.zIndex="3";
		if(rtl === true)
		{
			columnTop.style.float= "right";
			columnTop.style.width= "12.2em";
		}
		columnTop.innerHTML= "   ";
		columnTop.style.overflow= "auto";
		columnTop= sidebar.insertBefore(columnTop, sidebar.lastChild);
		columnTop.style.top= "0px";
		
		for(var a= 0; a < sideList.length; a++)
		{
			if(sideList[a].tagName === 'DIV')
			{
				if(sideList[a].id === 'p-cactions' || sideList[a].id === 'p-personal') {
				    // Give the items another id so the custom css isn't applied
				    sideList[a].id+= '1';
				}
				
				var title= sideList[a].getElementsByTagName('H5')[0];
				if(!title) continue;
				var link = document.createElement("a");
		  		link.href= "javascript:void(null)";
		  		link.innerHTML= "<img src=" + arrowOpened + " width=8 height=8> ";
				title.insertBefore(link, title.firstChild);
				title.style.cursor= "pointer";
				link.parentNode.addEventListener("click", toggleSide, false);
				
				columnTop.insertBefore(sideList[a], columnTop.lastChild);
			}
		}
		document.getElementsByTagName("label")[0].style.cursor= "pointer";	// Label with the searchbox
		
		document.body.style.backgroundAttachment= 'fixed'; // fixed background
		
		// Reorder the sidebar
		var order= readCookie("sidebarOrder");
		if(order != null) {
			createCookie("sidebarOrder", order, 365);	// Refresh expiration date
			order= order.split(",");
			for(var i= order.length-1; i >= 0; i--) {
				// Move item to the top of the list
				var item= document.getElementById(order[i]);
				if(item !== null) {
				    var parentItem= item.parentNode;
				    parentItem.removeChild(item);
				    parentItem.insertBefore(item, parentItem.firstChild);
				}
			}
		}
		
		// Move footer to the side, because else it is overlapped by the sidebar
		if(rtl === true) style+="#footer { border:1px solid #fabd23; margin-right:13.56em;}";
		else style+="#footer { border:1px solid #fabd23; margin-left:13.56em;}";
		
		GM_addStyle("@media screen { " + style + " }");
		
		// Hide the elements that where being hidden on a previous visit
		var collapsedBoxes= GM_getValue("collapsedBoxes", "");
		collapsedBoxes= collapsedBoxes.split(",");
		collapsedBoxes.forEach(function(id){
			var parent= document.getElementById(id);
			if(parent === null)
				return;
			var content= parent.getElementsByTagName("div")[0];
			var arrow= parent.getElementsByTagName('H5')[0].getElementsByTagName('A')[0].getElementsByTagName('IMG')[0];
			content.style.display= 'none';
			arrow.src= arrowClosed;
		});
	}
	
	function langHighlight()
	{
		var pLang = document.getElementById("p-lang");
		if(!pLang) { return; }
		var lLang = pLang.getElementsByTagName("li");
		
		var scrollBox= document.createElement("div");
		scrollBox.innerHTML = '<div id="container" style="overflow-x: hidden;overflow-y:auto;"><ul> </ul></div>';
		scrollBox.innerHTML+= '<a href="javascript:void(null)" id="adjust" title="Add/remove prefered languages" style="font-size:xx-small;">Adjust pref. langs</a>';
		scrollBox= pLang.getElementsByTagName("ul")[0].appendChild(scrollBox);
		scrollBox= scrollBox.parentNode.insertBefore(scrollBox, scrollBox.parentNode.firstChild);
		
		document.getElementById("adjust").addEventListener("click", adjustLangsStyle, false);
		
		// Adjust languages when window is resized
		window.addEventListener("resize", adjustLangs, false);
		window.addEventListener("zoom", adjustLangs, false);
		window.addEventListener("load", adjustLangs, false);
		if(document.getElementById("mw-panel")) {
		    // New style
		    var portals= document.getElementsByClassName("portal");
		    for(var i= 0; i< portals.length; i++) {
			if(portals[i].getElementsByTagName("h5").length != 0)
			    portals[i].getElementsByTagName("h5")[0].addEventListener("click", function(){ setTimeout(adjustLangs, 150); }, false);
		    }
		}
		
		var container= document.getElementById("container").firstChild;
		var languages= GM_getValue("langs", " ");
		
		// Remove current language from list with languages
		var currentLang= " interwiki-" + location.href.split("/")[2].split(".")[0];
		languages= languages.replace(currentLang, "");
		
		languages= languages.split(" ");
		languages.splice(0, 1);	//Remove first (blanco) element
		for (var i = 0; i < lLang.length; i++)
		{
			if(lLang[i].tagName === 'LI')
			{
				var langFound= false;
				for(var j= 0; j < languages.length; j++)
				{
					var wpClass = lLang[i].getAttribute("class");
					if(wpClass === null)
						continue;
					if(wpClass.indexOf(languages[j]) === 0)
					{	
						lLang[i].innerHTML= lLang[i].innerHTML + ' <a href="javascript:void(null)" style="display:none" class="langFav">[-]</a>';
						lLang[i].getElementsByTagName('A')[1].addEventListener("click", unFavLang, false);
						lLang[i].parentNode.insertBefore(lLang[i], lLang[i].parentNode.firstChild);
						langFound= true;
						languages.splice(j, 1);
						break;
					}
				}
				if(!langFound)
				{
					lLang[i].innerHTML= lLang[i].innerHTML + ' <a href="javascript:void(null)" style="display:none"  class="langFav">[+]</a>';
					lLang[i].getElementsByTagName('A')[1].addEventListener("click", favLang, false);
					container.insertBefore(lLang[i], container.lastChild);
				}
			}
		}
		adjustLangs();
	}

	sidebarOnTop();
	langHighlight();
})();
