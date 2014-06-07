// ==UserScript==
// @id             www.scp-wiki.net-92162351-f1b0-47d3-aeb0-9d1e0948c5e6@scp-2013-11-12@daud.de.su
// @name           SCP-Wiki
// @version        1.0
// @namespace      scp-2013-11-12@daud.de.su
// @author         DAud_IcI
// @description    
// @include        http://www.scp-wiki.net/scp-*
// @run-at         document-end
// ==/UserScript==

var side_bar = document.getElementById("side-bar");
var main_content = document.getElementById("main-content");
var orig_left = main_content.style.marginLeft;
var orig_display = side_bar.style.display;

function hide()
{
    side_bar.style.display = "none";
    main_content.style.marginLeft = "4em";
}

function show()
{
    side_bar.style.display = orig_display;
    main_content.style.marginLeft = orig_left;
}

hide();
var page_rate = document.querySelector("div.page-rate-widget-box");
page_rate.innerHTML = '<span id="toggle-sidebar" style="background-color: #DDDDDD;color: #666666;font-weight: bold; padding-left:0.5em; padding-right:0.5em;cursor:pointer">Toggle Sidebar</span>' +
        page_rate.innerHTML;

var hidden = true;
var toggle_sidebar = document.getElementById("toggle-sidebar");
toggle_sidebar.onclick = function()
{
    hidden = !hidden;
    if (hidden)
        hide();
    else
        show();
}


/////////////////////////////////////////////////////////////////////////////


window.scptitle = document.getElementById("page-title");
var code  = parseInt(window.scptitle.innerHTML.match(/SCP-(\d+)/)[1]);
var index = Math.floor(code/1000) + 1
var link  = "http://www.scp-wiki.net/scp-series" +
            (index > 1 ? '-' + index : '');

var req = new  XMLHttpRequest();
req.onload = function()
    {
        var as = this.responseXML.getElementsByTagName('a');
        var result = null;
        for (var i = 0; i < as.length; i++)
            if (as[i].href.indexOf("scp-"+code) >= 0)
            { result = as[i]; break; }
        if (result != null)
            window.scptitle.innerHTML =
                result.parentNode.textContent || result.parentNode.innerText;
    };
req.open('get', link, true);
req.responseType = "document";
req.send();
