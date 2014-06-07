// ==UserScript==
// @name           Anonym
// @namespace      http://vkontakte.ru
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

function isClosedPage()
{
    var e = document.getElementsByClassName("closed_profile");
    return ((e.length > 0) ? true : false);
}

var userId = -1;
function getUserId()
{
    var as = document.getElementsByTagName("a");
    var i = 0;
    var m = as.length;
    for (; i < m; i++)
    {
        if (as[i].hasAttribute("href"))
        {
            if (as[i].getAttribute("href").substr(0, 14) == "/gifts.php?to=")
                break;
        }
    }

    if (i != m)
    {
        var r = as[i].getAttribute("href").match(/\/gifts\.php\?to\=(\d+)/);
        if (r)
        {
            if (r[1] != null)
                return parseInt(r[1]);
        }
    }

    return -1;
}

function getProfileActionsNode()
{
    var pa = document.getElementById("profile_actions");
    if (pa == null)
        GM_log("profile_actions is null!");

    return pa;
}

function makeAlbumsButton()
{
    var n = document.createElement("a");
    n.innerHTML = "Открытые альбомы (?)";
    n.setAttribute("id", "anonym_albums_button");
    n.setAttribute("href", "/albums" + userId.toString());
    return n;
}

function appendAlbumsButton()
{
    var albumsButton = makeAlbumsButton();

    var profileActions = getProfileActionsNode();
    profileActions.appendChild(albumsButton);
}

function putResponseInTempDiv(html)
{
    var t = document.createElement("div");
    var pageLayout = document.getElementById("page_layout");
    pageLayout.appendChild(t);

    t.setAttribute("id", "anonym_temp_div");
    t.style.display = "none";
    t.innerHTML = html;

    return t;
}

function getAlbumsCount(div)
{
    var albumsCountNode = div.getElementsByClassName("summary")[0];
    if ((albumsCountNode != null) && (albumsCountNode.hasChildNodes()))
    {
        var albumsCount = albumsCountNode.childNodes[0].nodeValue.match(/(\d+).+/)[1];
        if (albumsCount != null)
            return parseInt(albumsCount);
    }
    
    return -1;
}

function updateAlbumsButton(albumsCount)
{
    var albumsButton = document.getElementById("anonym_albums_button");
    if (albumsCount > 0)
    {
        albumsButton.childNodes[0].nodeValue = "Открытые альбомы (" + albumsCount + ")";
    }
    else
    {
        albumsButton.childNodes[0].nodeValue = "Открытых альбомов нет";
        albumsButton.removeAttribute("href");
        albumsButton.style.cursor = "default";
    }
}

function removeTempDiv(tempDiv)
{
    var pageLayout = document.getElementById("page_layout");
    pageLayout.removeChild(tempDiv);
}

function request()
{
    GM_xmlhttpRequest({
		method: 'GET',
		url: "/albums" + userId,
		headers: {
			'Accept': 'text/html',
		},
		onload: processAnswer
	});
}

function processAnswer(r)
{
    var responseHtml = r.responseText;
    var tempDiv = putResponseInTempDiv(responseHtml);
    
    var albumsCount = getAlbumsCount(tempDiv);
    updateAlbumsButton(albumsCount);
    removeTempDiv(tempDiv);
}

if (isClosedPage())
{
    userId = getUserId();
    if (userId > 0)
    {
        appendAlbumsButton();
        request();
    }
}
