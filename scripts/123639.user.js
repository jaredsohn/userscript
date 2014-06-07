// ==UserScript==
// @name          YouTube mainpage filter
// @namespace     devulpes
// @description   Filter user actions
// @include       *.youtube.com/
// @version       0.8
// ==/UserScript==

var defaultHide = ["comment", "like", "add-to-playlist", "subscribed"];

var localization = [];
	/** EDIT THIS ARRAY	**/
	localization["upload"] = "Uploaded";
	localization["bulletin"] = "Posted a bulletin";
	localization["add-to-playlist"] = "Added to a playlist";
	localization["subscribed"] = "Subscribed to";
	localization["comment"] = "Commented";
	localization["favorite"] = "Favorited";
	localization["like"] = "Liked";
	/** EDIT THIS ARRAY **/

var hiddenItems = getFilterSettings().split(",");

var allFeedItems = ["upload", "bulletin", "add-to-playlist", "subscribed", "comment", "favorite", "like"];

function proceed()
{
	loadAllImages();
	expandItems();
	applyFilters();
}

function loadAllImages()
{
	for (x = 0; x < document.images.length; x++)
	{
		if (document.images[x].hasAttribute("data-thumb"))
		{
			document.images[x].src = document.images[x].getAttribute("data-thumb");
		}
	}
}

function expandItems()
{
	for (var x = 0; x < document.getElementsByClassName("feed-item-sub-items").length; x++)
	{
		var element = document.getElementsByClassName("feed-item-sub-items")[x];
		if (element.hasChildNodes())
		{
			var mainItem = element.parentNode;
			for (var y = 0; y < mainItem.childNodes.length; y++)
			{
				if (mainItem.childNodes[y].className == "feed-item-content")
				{
					mainItem = mainItem.childNodes[y];
					break;
				}
			}
			var title;
			var visual;
			for (var y = 0; y < mainItem.childNodes.length; y++)
			{
				if (mainItem.childNodes[y].className == "feed-item-title")
				{
					title = mainItem.childNodes[y];
				}
				else if (mainItem.childNodes[y].className == "feed-item-visual")
				{
					visual = mainItem.childNodes[y];
				}
			}
			while (element.childNodes.length >= 1)
			{
				var newParent = element.parentNode.parentNode.parentNode;
				var orphan = element.removeChild(element.firstChild);
				if (orphan.nodeName == "#text")
					continue;
				newParent.insertBefore(orphan, element.parentNode.parentNode.nextSibling);
				orphan.className = "feed-item-container";
				var needVisual = true;
				var contentItem = orphan.childNodes[1].childNodes[1];
				for (var y = 0; y < contentItem.childNodes.length; y++)
				{
					if (contentItem.childNodes[y].className == "feed-item-visual")
					{
						needVisual = false;
						break;
					}
				}
				if (needVisual)
				{
					var clonedVisual = visual.cloneNode(true);
					contentItem.appendChild(clonedVisual);
				}
			}
		}
	}
	while (document.getElementsByClassName("feed-item-show-aggregate").length >= 1)
	{
		var toDelete = document.getElementsByClassName("feed-item-show-aggregate")[0];
		toDelete.parentNode.removeChild(toDelete);
	}
	while (document.getElementsByClassName("feed-item-sub-items").length >= 1)
	{
		var toDelete = document.getElementsByClassName("feed-item-sub-items")[0];
		toDelete.parentNode.removeChild(toDelete);
	}
}

function applyFilters()
{
	for (x in allFeedItems)
	{
		unhideFeedItems(allFeedItems[x]);
	}
	for (x in hiddenItems)
	{
		hideFeedItems(hiddenItems[x]);
	}
}

function hideFeedItems(type)
{
	for (x = 0; x < document.getElementsByClassName(type).length; x++)
	{
		if (document.getElementsByClassName(type)[x].className.indexOf("hid") == -1)
			document.getElementsByClassName(type)[x].className += " hid";
	}
}

function unhideFeedItems(type)
{
	for (x = 0; x < document.getElementsByClassName(type).length; x++)
	{
		if (!(document.getElementsByClassName(type)[x].className.indexOf("hid") == -1))
			document.getElementsByClassName(type)[x].className = document.getElementsByClassName(type)[x].className.replace("hid", "");
	}
}

function prepareFilters()
{
	prepareMenu();
}

function prepareMenu()
{
	var menuElement = document.getElementsByClassName("yt-uix-button-menu")[0];
	if (menuElement.hasChildNodes())
	{
		while (menuElement.childNodes.length >= 1)
		{
			menuElement.removeChild(menuElement.firstChild);
		}
	}
	var menuElements = allFeedItems;
	for (x in menuElements)
	{
		addElementToMenu(menuElement, menuElements[x]);
	}
}

function addElementToMenu(menuElement, type)
{
	var tempEl = document.createElement("li");
	menuElement.appendChild(tempEl);
	tempEl.setAttribute("role", "menuitem");
	var element = document.createElement("span");
	tempEl.appendChild(element);
	element.className = "yt-uix-button-menu-item";
	if (hiddenItems.indexOf(type) == -1)
		element.className += " checked";
	element.innerHTML = localization[type];
	element.id = "NewOldYT_menu_" + type;
	element.addEventListener("click", changeFilterSetting, false);
}

function changeFilterSetting(event)
{
	var type = event.target.id.replace("NewOldYT_menu_", "");
	if (hiddenItems.indexOf(type) == -1)
	{
		hiddenItems.push(type);
		document.getElementById("NewOldYT_menu_" + type).className = document.getElementById("NewOldYT_menu_" + type).className.replace("checked", "");
	}
	else
	{
		hiddenItems.splice(hiddenItems.indexOf(type), 1);
		document.getElementById("NewOldYT_menu_" + type).className += " checked";
	}
	setFilterSettings(hiddenItems.toString());
	proceed();
}

function getFilterSettings()
{
	var settings = localStorage.getItem("NewOldYTLayoutHideItems");
	if (settings == null)
		return defaultHide.toString();
	else
		return settings;
}

function setFilterSettings(newSettings)
{
	localStorage.setItem("NewOldYTLayoutHideItems", newSettings);
}


try{
(function(open)
{
	XMLHttpRequest.prototype.open = function(method, url, async, user, pass)
	{
		oldOnReadyState = this.onreadystatechange;
		this.onreadystatechange = function()
		{
			oldOnReadyState();
			if (this.readyState == 4)
				proceed();
        };
	open.call(this, method, url, async, user, pass);
    };

})(XMLHttpRequest.prototype.open);
}
catch(e)
{
//alert(e);
}
prepareFilters();
proceed();
