// ==UserScript==
// @name                    [TS] Youtube Filter
// @namespace               TimidScript
// @description             Filter out users and channels from search with GUI. Include Auto-Paging
// @include                 *//www.youtube.*
// @version                 1.0.10
// @require                 http://userscripts.org/scripts/source/159301.user.js
// @resource  meta          http://userscripts.org/scripts/source/176449.meta.js
// @icon                    data:image/gif;base64,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
// @versioninfo             Few fixes and features added
// ==/UserScript==

/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/176449

----------------------------------------------
    Version History
----------------------------------------------
1.0.10 (2014/03/28)
 - Updated broken script due to changes in youtube
1.0.9 (2014/01/16)
 - Bug not getting page type when type changes. 
1.0.8 (2014/01/01)
 - Option button alternates filter window display
1.0.7b (2013/12/21)
 - Removed redundant code
 - Highlights blocked users and options buttonQ
 - Button now is an Icon
 - Bug fixes due to changes in Youtube
 - Captures changes in URL
1.0.6
 - Added block button on all thumbnails
 - Information stored now only contains the name of the user/channel and nothing else
1.0.5
 - Main X button now also removes filter
1.0.4
 - Colours added
1.0.3 (2013/10/16)
 - Extended the filter to work on main page
1.0.2 (2013/08/25)
 - Bug Fix: Filter observer added
1.0.1 (2013/08/24)
 - Initial Release

********************************************************************************************/
if (window.self !== window.top) return;
console.info("Youtube Filter");

var ShowAll = false;
var PageTYPE = null; //Video Page
var FilteredUsers = new Array();



function GetPageType()
{
    if (document.URL.match(/\.youtube\.[^\/]+\/?$/i)) PageTYPE  = 0; //Main Page
    else if (document.URL.match(/youtube\.[^\/]+\/result/gi)) PageTYPE  = 1; //Search Result
    else if (document.URL.match(/youtube\.[^\/]+\/watch/gi)) PageTYPE  = 2; //Video
}


function removeNode(node)
{
    if (typeof node == "string") node = document.getElementById(node);
    if (node && node.parentElement) node.parentElement.removeChild(node);
}

function GetUserData(link)
{
    var user = new Object();
    user.name = link.textContent;
    user.url = link.href.replace(/.+youtube\.[a-z]+/, "");

    return user;
}

function AddStyle(id, script)
{
    var style = document.createElement("style");
    style.type = "text/css";
    if (id)
    {
        style.id = id;
        removeNode(id);
    }
    style.innerHTML = script;
    document.head.appendChild(style);
}

function IsFilteredUser(user)
{           
    var userFilters = GetFilters();
    for (var i = 0; i < userFilters.length; i++)
    {
        if (userFilters[i] == user) return true;        
    }

    return false;
}

function BlockUser(e)
{
    e.stopImmediatePropagation();
    var user = this.title;

    if (!IsFilteredUser(user))    
    {
        var filters = GetFilters();
        filters.push(user);
        GM_setValue("Filters", JSON.stringify(filters));
    }

    HideUnwantedUsers();    
    if (document.getElementById("FilterWindow")) CreateFilterWindow();
    return false;
}

function AddBlockButton(li)
{
    var btn = document.createElement("span");
    btn.className = "blockBTN32";
    btn.setAttribute("style", "float:right;");

    if (PageTYPE == 1) btn.title = li.getElementsByClassName("yt-user-name")[0].textContent;
    else btn.title = (li.getElementsByClassName("g-hovercard")[1]).textContent;    

    btn.onclick = BlockUser;
    li.insertBefore(btn, li.firstElementChild);    
}

function NextPageURL()
{
    var pager = document.getElementsByClassName('yt-uix-pager');
    if (pager.length == 0) return null;

    pager = document.getElementsByClassName('yt-uix-pager')[0];

    var nextpage = pager.getElementsByClassName("yt-uix-button-toggled")[0].nextElementSibling;
    if (!nextpage) return null;

    return nextpage.href;
}

function ScrollCheck()
{
    var pager = document.getElementsByClassName('yt-uix-pager')[0];

    var loc = pager.offsetTop + pager.offsetHeight - document.documentElement.offsetHeight;
    if (loc < document.documentElement.scrollTop)
    {
        window.onscroll = null;
        var url = NextPageURL();

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "document";
        xhr.onload = function (e)
        {
            var pager = document.getElementsByClassName('yt-uix-pager')[0];
            var doc = xhr.response;
            var pagerNew = doc.getElementsByClassName('yt-uix-pager')[0];
            pager.outerHTML = pagerNew.outerHTML;

            var result = document.getElementById("search-results");

            var resultNew = doc.getElementById("search-results");
            var lis = resultNew.children;

            while (lis.length > 0)
            {
                var li = lis[0];
                result.appendChild(li);
                var imgs = li.getElementsByTagName("img");

                for (var i = 0; i < imgs.length; i++)
                {
                    var src = imgs[i].getAttribute("data-thumb");
                    if (src) imgs[i].src = src;
                }

                AddBlockButton(li);
            }

            HideUnwantedUsers();
            EnablePager();

        };
        xhr.send();
    }
}

function EnablePager()
{
    if (NextPageURL()) window.onscroll = ScrollCheck;
    else window.onscroll;
}

function HideUnwantedUsers()
{    
    var userFilters = GetFilters();
    FilteredUsers = new Array();

    if (PageTYPE == 0) //Main Page
    {    
        var bans = document.getElementsByClassName("banNotice");
        while(bans.length > 0) removeNode(bans[0]);        

        //var items = document.getElementsByClassName("channels-content-item");
        var items = document.getElementsByClassName("yt-lockup-video");

        for(var i = 0; i < items.length; i++)
        {
            var thumbdata = items[i];            
            var user =  thumbdata.getElementsByClassName("yt-user-name")[0].textContent;

            var filtered = IsFilteredUser(user)
            if (filtered) 
            {                    
                FilteredUsers.push(user);
                thumbdata.style.backgroundColor = "#FBE8E5";
            }
            else thumbdata.style.backgroundColor  = null;
            
            if (!ShowAll && filtered)
            {            
                var h = thumbdata.clientHeight;
                var w = thumbdata.clientHeight;

                var notice = document.createElement("div");
                notice.className = "banNotice";
                notice.style.left = thumbdata.offsetLeft + "px";                    

                notice.style.height = thumbdata.clientHeight + "px";
                notice.style.width = thumbdata.clientWidth + "px";
                notice.setAttribute("name","YTF");

                var  txt = document.createElement("span");
                txt.textContent = user; 
                txt.style.height = thumbdata.clientHeight + "px";
                txt.style.width = thumbdata.clientWidth + "px";
                notice.appendChild(txt);
                thumbdata.parentNode.insertBefore(notice, thumbdata);
            }            
        }        
    }
    else //Search Result & Video Page
    {
        var results;
        var user;
        if (PageTYPE == 1) results = document.getElementById("search-results").children;            
        else results = document.getElementsByClassName("video-list-item");       

        for (var i = 0; i < results.length; i++)
        {            
            try
            {
                var vid = results[i];
                if (PageTYPE == 1) user = vid.getElementsByClassName("yt-user-name")[0].textContent;
                else user = (vid.getElementsByClassName("g-hovercard")[1]).textContent; 

                var filtered = IsFilteredUser(user);
                if (filtered) 
                {
                    FilteredUsers.push(user);
                    vid.style.backgroundColor = "#FBE8E5";
                }
                else vid.style.backgroundColor = null;

                if (!ShowAll && filtered) vid.style.display = "none";                
                else vid.style.display = null;
            }
            catch (e) { console.warn(e); }
        }      
    }

    if (FilteredUsers.length > 0) AddStyle("OptSelect","#OptionsButton{background-color: #FBE8E5;} #OptionsButton:hover{background-color: #FBD5CF}");
    else removeNode("OptSelect");
}

function GetFilters()
{
    var filters = GM_getValue("Filters", null);
    if (!filters) return new Array();
               
    return JSON.parse(filters);
}

function CreateFilterWindow()
{
    var fwin = document.getElementById("FilterWindow");
    if (fwin) removeNode(fwin);

    var userFilters = GetFilters();

    fwin = document.createElement("span");
    var table = document.createElement("table");
    fwin.appendChild(table);

    for (var i = 0; i < userFilters.length; i++)
    {
        var user = userFilters[i];
        var btn = document.createElement("a");
        btn.className = "unblockBTN";
        btn.title = user;

        btn.onclick = function (e)
        {
            e.stopImmediatePropagation();
            var user = this.title;            
            var filters = GetFilters();
            
            for(var i = 0;  i < filters.length; i++)
            {
                if (filters[i] == user)
                {
                    filters.splice(i,1);
                    GM_setValue("Filters", JSON.stringify(filters));
                    break;
                }
            }             
            
            removeNode(this.parentElement.parentElement);
            HideUnwantedUsers();                
        };

        var r = table.insertRow(-1);
        var td = document.createElement("td");
        r.appendChild(td);
        td.appendChild(btn);
                
        var a = document.createElement("a");
        a.href = "results?search_query=" + user + "&sm=3";           

        var d = document.createElement("div");
        d.textContent = user;        

        for(var j = 0; j < FilteredUsers.length; j++)
        {
            if (user == FilteredUsers[j]) 
            {
                r.style.backgroundColor = "#FBE8E5";
                //d.style.color = "red";
                break;
            }
        }     
        
        td = document.createElement("td");
        a.appendChild(d);
        td.appendChild(a);
        r.appendChild(td);
    }

    var d = document.createElement("div");
    d.style.textAlign = "center";

    var b = document.createElement("input");
    b.type = "button";
    b.value = "Show All";
    b.style.backgroundColor = (ShowAll) ? "lime" : null;
    b.onclick = function ()
    {
        ShowAll = !ShowAll;
        HideUnwantedUsers();
        this.style.backgroundColor = (ShowAll) ? "lime" : null;
    };

    d.appendChild(b);

    var b = document.createElement("input");
    b.type = "button";
    b.value = "Close";
    b.onclick = function () { removeNode("FilterWindow");};        
    d.appendChild(b);    

    fwin.appendChild(d);

    fwin.id = "FilterWindow";
    document.body.appendChild(fwin);
    return fwin;
}


function AdjustSearchResult()
{
    var results;
    if (PageTYPE == 1) results = document.getElementById("search-results").children;
    else results = document.getElementsByClassName("video-list-item");
    console.log(results.length);
          
    for (var i = 0; i < results.length; i++)
    {
        if (results[i].getElementsByClassName("blockBTN32").length == 0)
        {
            try
            {
                AddBlockButton(results[i]);
            }
            catch(e){};
        }
    }

    HideUnwantedUsers();
    if (PageTYPE == 1) EnablePager();
}

function AddOptions()
{    
    var options = document.createElement("div");
    options.id = "OptionsButton";
    //options.textContent = "Options";
    options.onclick = function ()
    {
        var fwin = document.getElementById("FilterWindow");
        if (fwin) removeNode(fwin);
        else CreateFilterWindow();
    };

    document.body.appendChild(options);
}


function MainFunc()
{    
    GetPageType();
    if (PageTYPE == 0)
    {
        console.info("YTF: Main Page");
        AddOptions();                
                
        var items = document.getElementsByClassName("channels-content-item");
        for(var i = 0; i < items.length; i++)
        {
            var thumbdata = items[i];
            var user = thumbdata.getElementsByClassName("yt-user-name")[0].textContent;
            var filters = GetFilters();
            
            var blockBtn = document.createElement("a");
            blockBtn.className = "blockBTN16";                              
            blockBtn.title = user;

            var link = thumbdata.getElementsByTagName("a")[0];

            blockBtn.style.left = (link.clientWidth - 26) + "px";
            link.appendChild(blockBtn);
            link.className += " aaTT";
            blockBtn.title = user;
            blockBtn.onclick = BlockUser;
        }

        HideUnwantedUsers();    
    }
    else    
    {                
        console.info("YTF: Search Result");
        AddOptions();
        AdjustSearchResult();

        setTimeout(function()
        {
            document.getElementById("watch-more-related-button").click();

            setTimeout(function()
            {
                AdjustSearchResult();
            }, 1000);

        }, 1000);
    }    
}


var URL = document.URL;
(function ()
{      
    GetPageType();
    if (PageTYPE == null) return;
    //Replace old saved syntax 
    CURRENTVERSION = 1;    
    if (GM_getValue("Version", 0) != CURRENTVERSION)
    {
        var filters = GM_getValue("Filters", null);

        if (filters)
        {
            filters = filters.split("|");
            for(var i = 0; i < filters.length; i++)
            {
                filters[i] = filters[i];
            }

            GM_setValue("Filters", JSON.stringify(filters));
        }

        GM_setValue("Version", CURRENTVERSION);
    }

    AddStyle("YTF_FW", "#FilterWindow{position: fixed;z-index: 9999999999999; right: 10px;top: 95px;background-color: #E9EAEA;border: 1px solid black;}#FilterWindow div{color: gray;text-decoration-style: none;padding: 3px 5px;}#FilterWindow tr:hover{text-decoration-style: none;background-color: lightgray;color: black;}");
    AddStyle(null, "#OptionsButton{height: 32px; width: 32px; margin: 0; padding: 0; position: fixed;color: #777979; right: 10px;top: 60px;border-radius: 3px;background-color: lightgray;border: 1px solid darkgray;cursor: pointer; z-index:99999999999999999;}#OptionsButton:hover{background-color: darkgray;color: black;}");
    AddStyle(null, "#OptionsButton {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADPUlEQVR42u3XX0xSURwH8N/lzwUVxED+mpW5HtQ0ptJspBPkKmVzTtfafKunntqa9d67bD219dZLPrVmc22mglhSul2FnEtfMjf/C4oCCpfLvw7XbGXxT5q98HuBO845389+nMs9YPCfC0t3oF6vl6DBpWwMk0Si0TMxDMtD17z4ZzGAIBaLBdhs9m4kEtkBFmvFYrHsnBig1WpxHo4TGIYRMplMU1Z2sVqpVAilUhkUigpBKBQCzsWBw+Ew48PhMNAhGnw+H3g9XnC6nLC5seH7trQ053I6yVgsNoKQZqvVSqcEXGtoIK6o1S86OjpK6uvrQSyWZNVit3sHpslpGBwcXJ2d/Xx3cmrKnBTQ3dX15WV/fyWO41kFHy+apqGnp2d+YGCgKingenv3fOmliorbTbWg0WhApSrJKnh9fQ1IkoRXY3ZYWVxYsA29rkwKaGzvtpKdz5r53g0Qr87AudAmVIsAzhfxQCaXg0gkOtwD+LE9QB/uAY/HA1tbW7C8G4S5bYBlUIC7uA5oXAJ1kw+GJ4bfGJMCDHq9/KBQZXHcNFVRBXJmi0MUgBUKAH/fBVzKC5zgPrDCNLAiYWZOFDgQZeEQ5gogxBUBxZeiaz4zLz4/b38VaqcekXzK1WoZG9tLCogXuuVkAaHSjBDVVIHi50JHmN9eU7xnwif/Hp4Q8AMhpYRKi93YhxDKEwHyfCj8U+LwpADm62hulvoLVWZ7m6mGEigzAjDhH3tJ3O9stY6P7yXKSPlLiPZEsb9APupo61MHBCVpAZhwW+rwtADx0ul0ElogN9sJ0yEiWdu9KHyidwaFG1KFpw1gOmEwSAJ8yYjdYKoNCM8mbvt7JpxA4bvprJs2IF4ter2YypeOOFr66vyC0j/bHg8/SD88Y8ARIpAvs5DG5+oQLmIAXMoDmtH7jgJq2zBqNrszWS9jQLwIg8E4d/Xx0OaFVgagWBqGsvEnN9CD5l2ma50IgLrQuKB5+GG9/BYDUH19CxUzT5vQvT6RA+QAOUAOkAOcFkC7Vt5uW6y5ByG86PQB6GzA5vF4LYFg6M5u8eVOdBoWy9Zspwf4tQiC4EbCYR3GYpHoD2na54B/Bsi2vgPc5hg/VHiJIwAAAABJRU5ErkJggg==); background-size:24px 24px; background-repeat:no-repeat; background-position:center;}");
    AddStyle("YTF_BT",".unblockBTN{display: inline-block;width: 16px;height: 16px;}.blockBTN32, .blockBTN16, .unblockBTN{cursor:pointer; background-image: url(data:image/png;base64,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);background-size: contain;z-index: 100;}.blockBTN32{display: inline-block;width: 32px;height: 32px;}a.aaTT:hover .blockBTN16{visibility: visible;}.blockBTN16{background-color: black;border: 1px solid red;height: 24px;width: 24px;position: absolute;top: 0px;visibility: hidden;}");    
    AddStyle("YTF_NB", ".banNotice {position:absolute; z-index: 1000; font-size:medium;} .banNotice > span { display:table-cell; background-color:yellow; text-align: center; vertical-align: middle; }");

    MainFunc();    
    var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
    if (mo)
    {
        observer = new mo(
            function() {
                if(URL != document.URL)
                {
                    URL = document.URL;
                    setTimeout(MainFunc, 500);
                }
            });
        observer.observe(document.body, { characterData:true, attributes: true, childList: true, subtree: true });
    }
})();