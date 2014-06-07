// ==UserScript==
// @name			Mamba search
// @author			ikarta
// @namespace		mamba
// @description		Hides reviewed the profile
// @include			http://*mamba.ru/search.phtml*
// @include			http://*love.mail.ru/search.phtml*
// @grant			GM_getValue
// @grant			GM_setValue
// ==/UserScript==

var exec = false;

var w = window.wrappedJSObject || window;

w.addEventListener('DOMContentLoaded', main, true);
w.addEventListener('load', main, true);

w.addEventListener('keypress', keypress, true);
  
var auto_next_page = "auto_next_page";

function toNextPage()
{
	var offset = "offset=";
	spos = document.location.search.indexOf("offset="); // + "offset=".length;
	epos = document.location.search.indexOf("&", spos);

	if ( epos == -1 )
		epos = document.location.search.length;

	var oldnum = document.location.search.substring(spos, epos).replace(offset, "");
	var newnum = parseInt(oldnum) + 10;

	if ( isNaN( newnum ) )
	{
		var nextA = document.getElementsByClassName("inset");
		if (nextA.length > 1)
		{
			location.href = nextA[1].href;
			return;
		}
	}
		
	var oldoffset = offset + oldnum;
	var newoffset = offset + newnum;

	var newsearch = document.location.search.replace(oldoffset, newoffset);
	document.location.search = newsearch;
}

var JS_BUTTON_CLASS = "js_button_class";

var JS_OFF = "off";
var JS_ON = "on";
var JS_NEXT = "next";

function getState()
{
	return ( GM_getValue(auto_next_page, JS_OFF) )
}

function setState(state)
{
	GM_setValue(auto_next_page, state);
}

function changeState()
{
	try
	{
		var btnScroll = document.getElementsByClassName( JS_BUTTON_CLASS );

		if ( getState() == JS_OFF )
		{
			setState( JS_ON );
		}
		else if ( getState() == JS_ON )
		{
			setState( JS_NEXT );
		}
		else if ( getState() == JS_NEXT )
		{
			setState( JS_OFF );
		}
		else
			setState( JS_OFF );

		document.location.reload( false );
	}
	catch(error)
	{
		alert(error);
	}
}                                                                          

function getImgSrc()
{
	if ( getState() == JS_ON )
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjCAYAAAD17ghaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNERkNCMTdCMDgxNDExRTJCNDE1QUI0QTNCMUMwOTQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNERkNCMTdDMDgxNDExRTJCNDE1QUI0QTNCMUMwOTQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0RGQ0IxNzkwODE0MTFFMkI0MTVBQjRBM0IxQzA5NDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0RGQ0IxN0EwODE0MTFFMkI0MTVBQjRBM0IxQzA5NDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ST/TWAAAHKElEQVR42uxYXUwUVxQ+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";
	else if ( getState() == JS_NEXT )
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjCAYAAAD17ghaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVFQzc2OTU1MDgxNDExRTI5MEFGREIzMjA5OTk5MjU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVFQzc2OTU2MDgxNDExRTI5MEFGREIzMjA5OTk5MjU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUVDNzY5NTMwODE0MTFFMjkwQUZEQjMyMDk5OTkyNTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUVDNzY5NTQwODE0MTFFMjkwQUZEQjMyMDk5OTkyNTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5eeUtUAAAHVklEQVR42uxXa0xV2RVe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";
	else
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjCAYAAAD17ghaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZDM0M4RjU3MDgxNDExRTJCNDYyRjc0NjJFRkQ1QzFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZDM0M4RjU4MDgxNDExRTJCNDYyRjc0NjJFRkQ1QzFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkMzQzhGNTUwODE0MTFFMkI0NjJGNzQ2MkVGRDVDMUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkMzQzhGNTYwODE0MTFFMkI0NjJGNzQ2MkVGRDVDMUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Q3sapAAAIMklEQVR42uxYW2wU5xX+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";
}

function keypress(e)
{
	try
	{
		if ( e.charCode == 32)
			toNextPage();
	}
	catch(error)
	{
		alert(error);
	}
}

function main()
{
	if (exec)
	return;

	exec = true;
	try
	{
		var userBar = document.getElementsByClassName("ui-usermenu-left");

		delimiter1 = document.createElement("LI");
		delimiter2 = document.createElement("LI");
		delimiter1.setAttribute("class", "ui-usermenu-delimiter");
		delimiter2.setAttribute("class", "ui-usermenu-delimiter");	

		if ( ( userBar == undefined ) || ( userBar.length < 1 ) )
			return;

		userBar[0].appendChild(delimiter1);

		liAutoNext = document.createElement("LI");
		liAutoNext.setAttribute("class", "ui-usermenu-item");

		imgAutoNext = document.createElement("IMG");
		imgAutoNext.setAttribute("class", "item " + JS_BUTTON_CLASS);
		imgAutoNext.src = getImgSrc();
		imgAutoNext.style.height = "35px";
		imgAutoNext.style.width = "32px";

		imgAutoNext.onclick = function() { changeState() };
		
		liAutoNext.appendChild(imgAutoNext);
		userBar[0].appendChild(liAutoNext);

		userBar[0].appendChild(delimiter2);

		var searchUl = document.getElementsByClassName("SearchResult");
		if (searchUl.length != 1)
		{
//			alert("error searchUl.length != 1");
			return;
		}

		var searchLi = searchUl[0].getElementsByTagName("LI");
		foundNewGirl = false;
		for ( i = 0; i < searchLi.length; i++ )
		{
			var searchDiv = searchLi[i].getElementsByClassName("opacity ");

			if (searchDiv.length != 1)
			{
//				alert("error searchDiv.length != 1");
				return;
			}

			var searchA = searchDiv[0].getElementsByClassName("u-name");
			if (searchA.length != 1)
			{
//				alert("error searchA.length != 1");
				return;
			}

			var oid = searchA[0].href.match(/oid=.*?&/i)[0];
			oid = "oid" + oid.replace(/oid=/i, "").replace("&", "");

			if ( oid == "" )
				continue;

			if ( GM_getValue(oid, 0) == 0 )
			{
				foundNewGirl = true;
				GM_setValue(oid, 1);
				searchUl[0].insertBefore( searchLi[i], searchLi[0] );
				continue;
			}

			if ( getState() != JS_OFF )
			{
				// забелить LI
				searchLi[i].style.background = "none";
				searchLi[i].style.backgroundImage = "none";
				searchLi[i].style.opacity = 0.2;
				searchLi[i].style.filter = 'alpha(opacity=0.2)';

				searchLi[i].onmouseover = function() {
					this.style.opacity = 1;
					this.style.filter = 'alpha(opacity=1)';
				}

				searchLi[i].onmouseout = function() {
					this.style.opacity = 0.2;
					this.style.filter = 'alpha(opacity=0.2)';
				}
			}
		}
		
		window.scroll(0, 255);

		if ( ! foundNewGirl )
			if ( getState() == JS_NEXT )
				toNextPage();
	}
	catch(error)
	{
		alert(error);
	}
}