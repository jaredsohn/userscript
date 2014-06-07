// ==UserScript==                                                                                                                                           
// @name          Netlog PhotoUrl
// @description   It creates a new context menu, you'll be able to get the static link of any photo (even if it's private)
// @include       *.netlog.com/ 
// @include       *netlog.com/*
// @author        fox (fox91 at anche dot no)
// @version       0.1
// ==/UserScript==
//
// Enjoy it, and... fap, fap, fap :3
//
// Distributed under the terms of the GNU GPL v3

function createContextMenu() {
    var div = document.createElement('div');
    div.id = "NetlogMenu";
    div.setAttribute('style', 'position: absolute; z-Index: 999;' +
        'width: 200px; background: #666; text-align:center;' +
        'border: #333 solid 2px; -moz-opacity: 0.8; margin: 4px;' +
        'color: #FFF; font-size: 12px; padding: 4px; -moz-border-radius: 1em;');
    div.style.display = 'none';
    return div;
}

function getStaticUrl(url) {
    var match = url.match(/(\w+?)\.netlog.com.+?photoid=(\d+)(#photos)?/);
    if (match) {
        var country = match[1];
        var id = match[2];
        var foo = "00000000" + id;
        match = foo.match(/(\d{3})(\d{3})\d{3}$/);
        return "http://"+country+".netlogstatic.com/p/oo/"+match[1]+"/"+match[2]+"/"+id+".jpg";
    }
    else
        return url.replace(/\/p\/tt\//,"/p/oo/");
}

window.gm_show_menu = function(e, x, y, src) {
    var div, inputUrl, conv, show, desc, viewPhoto;
    if (!document.getElementById('NetlogMenu'))
        div = createContextMenu()
    else 
        div = document.getElementById('NetlogMenu');
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
    div.style.left = x + "px";
    div.style.top  = y + "px";
    div.style.display = "block";
    div.innerHTML = "Get Photo Link!<br/>";
    inputUrl = document.createElement('input');
    inputUrl.id = "staticLink"; 
    inputUrl.value = getStaticUrl(src);
    div.appendChild(inputUrl);
    conv = document.createElement('input');
    conv.id = "convertUrl";
    conv.type = "button";
    conv.value = "Convert";
    conv.style.color = "#FFF";
    conv.style.backgroundColor = "transparent";
    conv.style.border = "#333 solid 2px";
    conv.style.display = "none";
    show = document.createElement('a');
    show.innerHTML = ">>>";
    show.style.color = "#FFF";
    desc = document.createElement('p');
    desc.style.display = "none";
    desc.innerHTML = "<br/>Here you can insert any link to " +
        "convert to a static one<br/>";
    div.appendChild(desc)
    show.addEventListener('click', function() {
        show.style.display = "none";
        conv.style.display = "inline";
        desc.style.display = "inline";
        div.style.width = "250px";
    }, false);
    conv.addEventListener('click', function() {
        inputUrl.value = getStaticUrl(inputUrl.value);
    }, false);
    div.appendChild(show);
    div.appendChild(conv);
    viewPhoto = document.createElement('input');
    viewPhoto.type = "button";
    viewPhoto.value = "View photo";
    viewPhoto.style.color = "#FFF";
    viewPhoto.style.backgroundColor = "transparent";
    viewPhoto.style.border = "#333 solid 2px";
    viewPhoto.addEventListener('click', function() {
        GM_openInTab(inputUrl.value);
    }, false);
    div.appendChild(viewPhoto);
    document.body.insertBefore(div, document.body.firstChild);
    inputUrl.focus();
    inputUrl.select();
}

window.gm_clear_menu = function(e) {
    if ((document.getElementById('NetlogMenu')) &&
       (!((e.target.id == "NetlogMenu") ||
       (e.target.parentNode.id == "NetlogMenu")  ||
       (e.target.src) ||
       (e.target.className == "clickArea") ||
       (e.target.className == "inner") ||
       (e.target.href))))
       document.getElementById("NetlogMenu").style.display = "none";
}

window.gm_menu = function(e) {
    if (e.ctrlKey && document.getElementById('NetlogMenu')) {
        document.getElementById('NetlogMenu').style.display='none';
        return true;
    }
    if ((e.target.src) && 
	    (e.target.src.match(/\w+?\.netlogstatic.com\/(\/)?[p|v]\/\w{2}\/.+?/)))
        gm_show_menu(e, e.clientX+window.scrollX, e.clientY+window.scrollY,
            e.target.src);

	if ((e.target.href) && 
		(e.target.href.match(/(\w+?)\.netlog.com.+?photoid=(\d+)(#photos)?/)))
        gm_show_menu(e, e.clientX+window.scrollX, e.clientY+window.scrollY,
            e.target.href);
    if ((e.target.className == "clickArea") ||
       (e.target.className == "inner"))
        gm_show_menu(e, e.clientX+window.scrollX, e.clientY+window.scrollY,
            document.getElementById("photoNote").src, true);
    if ((document.getElementById('NetlogMenu')) && 
	    (document.getElementById('NetlogMenu').style.display != "none")) {
            e.preventDefault();
            e.returnValue = false;
            e.stopPropagation();
        }
}

window.addEventListener("contextmenu", gm_menu, true);
window.addEventListener("click", gm_clear_menu, false);
