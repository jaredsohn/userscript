// Doufan (Douban-Fanou integration plugin)
// Version 2.2
// Copyright (C) 2007-2010, Li Fanxi <lifanxi (AT) freemindworld.com>
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Doufan plugin", and click Uninstall.
//
// $Id: doubanfanfouplugin.user.js 9 2007-07-28 11:42:05Z lifanxi $
//
// ==UserScript==
// @name Doufan plugin
// @namespace http://www.freemindworld.com/db_ff/
// @description An plugin for the integration of Douban and Fanfou. 
// @include http://www.douban.com/
// @include http://www.douban.com/?*
// @include http://*.douban.com/subject/*
// @include http://*.douban.com/review/*
// @include http://www.douban.com/*/miniblogs*
// @include http://www.douban.com/contacts/*
// @include http://www.douban.com/event/*/*
// @include http://www.douban.com/online/*/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var pluginCount = 1;
var singleMiniblogButton = false;
var pluginNames = [ "饭否", "Twitter" ];
var pluginIDs = [ 'doufan-ff-share' , 'doufan-twitter-share' ];

function NodeInsertedHandler(event) 
{
    if ((event.target.className == 'bd') && 
        (event.target.parentNode.id=='db-div-sharing'))
    {
        var pluginURLs = [ 'http://www.fanfou.com/favicon.ico' , 'http://www.freemindworld.com/db_ff/twitter.png' ];

        for (t = 0; t < pluginCount; ++t)
        {
            var li = document.createElement("li");
            li.className = "rec-ff";
            li.style.paddingLeft = "20px";
            li.style.background = 'url(' + pluginURLs[t] + ') no-repeat scroll 0 0 transparent';
            var btn = document.createElement("a");
            btn.id = pluginIDs[t];
            btn.href = "#";
            btn.innerHTML ="分享到" + pluginNames[t];
            btn.addEventListener("click", PostFanfou, false);
            li.appendChild(btn);   
            event.target.childNodes[1].appendChild(li);
        }
    }
}

// Check if the environment is OK
if (ChkEnv())
{
    // We want to know on which page we are staying and do different things.
    var pageUrl = document.location.href;
    if ((pageUrl.indexOf("/event/") != -1) ||
        (pageUrl.indexOf("/online/") != -1))
    {
        // Event
        DoEvent();
    }
    else if ((pageUrl.indexOf("/subject/") != -1) ||
             (pageUrl.indexOf("/review/") != -1))
    {
        // Resource pages (Books, Movies, Musics)
        // Set DOM change trigger
        document.addEventListener("DOMNodeInserted", NodeInsertedHandler, false);
    } 
    else if ((pageUrl.indexOf("/contacts") != -1) || 
             (pageUrl.indexOf("/miniblogs") != -1) || 
             (document.title == "豆瓣"))
    {
        // Miniblog
        DoContactMiniblog();
    }
}

// Event
function DoEvent()
{
    var div;
    div = document.getElementById("actchoice");
    if (div)
    {
        for (t = 0; t < pluginCount; ++t)
        {
            var btn = document.createElement("a");
            btn.href = "#";
            btn.className = "redbutt rr";
            btn.innerHTML ="<span id=\"" + pluginIDs[t] + "\">分享到" + pluginNames[t] + "</span>";
            btn.addEventListener("click", PostEvent, false);
            div.appendChild(btn);
        }   
    }
}

function PostEvent(event)
{
    for (type = 0; type < pluginCount; ++type)
        if (event.target.id == pluginIDs[type])
            break;

    var title;
    title = GetTitle();
    var notes;
    notes = GetEventMessage();
    var url;
    url = GetURL();
    var msg = notes + ": " + title;
    if (url != "")
    {
        msg += " (" + url + " )";
    }
    var note = "";
    while (true)
    {
        var additional = prompt("预览：\n" + msg + "\n\n你还可以添加一些标注(不超过" + (139-msg.length) + "字)：", note);
        if (additional == null)
        {
            alert("放弃分享。");
            return;
        }
        if (additional != "")
        {
            if (additional.length > (139-msg.length))
            {
                alert("您输入的标注太长了，请将它减短" + (additional.length - (139-msg.length)) + "字。");
                note = additional;
                continue;
            }
        }
        break;
    }
    if (additional != "")
        msg += "。" + additional;
    SendRequest(msg, type);
    return true;
}

// Miniblog
function DoContactMiniblog()
{
    var dbtalk = document.getElementById("db-talk");
    var textarea = null;
    if (dbtalk)
    {
        var alldivs = dbtalk.getElementsByTagName("div");
        for (var i = 0; i < alldivs.length; ++i)
        {
            if (alldivs[i].className == 'btn')
            {
                if (singleMiniblogButton == true)
                {
                    var span = document.createElement("span");
                    var btn = document.createElement("input");
                    btn.type = "button"
                    btn.value = "发微博";
                    btn.name = "syncMiniblog";
                    btn.id = "syncMiniblog";
                    btn.addEventListener("click", PostMiniblogFF, false);

                    span.appendChild(btn);
                    alldivs[i].appendChild(span);
                }
                else
                {
                    for (type = 0; type < pluginCount; ++type)
                    {
                        var span = document.createElement("span");
                        var btn = document.createElement("input");
                        var pluginIMGs = [ 'http://avatar2.fanfou.com/s0/00/37/9g.jpg?1181650871' , 
                                           'http://www.freemindworld.com/db_ff/tb.png' ];
                        btn.type = "image";
                        btn.src = pluginIMGs[type];
                        btn.value = pluginNames[type];
                        btn.name = pluginIDs[type];
                        btn.id = pluginIDs[type];
                        btn.style.height = "22px"
                        btn.style.width = "22px"
                        btn.addEventListener("click", PostMiniblogFF, false);

                        span.appendChild(btn);
                        alldivs[i].appendChild(span);
                    }
                }
                for (var j = 0; j < alldivs[i].childNodes.length; ++j)
                {
                    if (alldivs[i].childNodes[j].className == 'bn-flat')
                        alldivs[i].childNodes[j].childNodes[0].style.height = '22px';
                }
                break;
            }
            else if (alldivs[i].className == 'item')
            {
                alldivs[i].style.width = "82%";
            }
        }
    }
}

function PostMiniblogFF(event)
{
    if (singleMiniblogButton != true)
        for (type = 0; type < pluginCount; ++type)
            if (event.target.id == pluginIDs[type])
                break;
    var data = event.target.form.elements[1].value;
    if (data != "")
    {
        var msg = "通过豆瓣广播：" + data;
        if (msg.length > 140)
        {
            if (singleMiniblogButton == true)
                alert("同步到微博的广播不能超过133个字。");
            else
                alert("发" + pluginNames[type] + "的广播不能超过133个字。");
            return;
        }
        if (singleMiniblogButton == true)
        {
            for (type = 0; type < pluginCount; ++type)
                SendRequest(msg, type);
        }
        else
            SendRequest(msg, type);
    }
    event.target.form.submit();
}

function PostFanfou(event)
{
    for (type = 0; type < pluginCount; ++type)
        if (event.target.id == pluginIDs[type])
            break;
    var title=GetTitle();
    if (title == "")
    {
        return false;   
    }
    var notes=GetMessage();
    if (notes == "")
    {
        return false;
    }
    var rate = GetMyRate();
    var url = GetURL();
    var msg = notes + ": " + title;
    if (url != "")
    {
        msg += " (" + url + " )";
    }
    if (rate != "")
    {
        msg += "，我的评价是: " + rate;
    }

    var note = GetNote();
    while (true)
    {
        var additional = prompt("预览：\n" + msg + "\n\n你还可以添加一些标注(不超过" + (139-msg.length) + "字)：", note);
        if (additional == null)
        {
            alert("放弃分享。");
            return;
        }
        if (additional != "")
        {
            if (additional.length > (139-msg.length))
            {
                alert("您输入的标注太长了，请将它减短" + (additional.length - (139-msg.length)) + "字。");
                note = additional;
                continue;
            }
        }
        break;
    }
    if (additional != "")
        msg += "。" + additional;
    SendRequest(msg, type);
    return true;
}

function SendRequest(msg, type)
{
    var pluginAPIs = [ 'http://api.fanfou.com/statuses/update.xml', 
                       'https://api.twitter.com/statuses/update.xml' ];
    GM_xmlhttpRequest({
        method: 'POST',
        url: pluginAPIs[type],
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        data: 'source=DoubanSharing&status=' + encodeURIComponent(msg),
        onload: function(responseDetails) {
            if (responseDetails.status == 200)
                alert("分享成功！");
            else
            {
                alert('分享失败！\n调试信息:\nreturned status:' + responseDetails.status +
                      ',statusText:' + responseDetails.statusText + '\n' +
                      ',responseHeaders:' + responseDetails.responseHeaders + '\n' +
                      'responseText:\n' + responseDetails.responseText);
            }
        }
    });
}

function GetTitle()
{
    var allH1;
    allH1 = document.getElementsByTagName("h1");
    if (allH1.length >= 1)
    {
        return allH1[0].textContent.trim().replace(/\n/g, "").replace(/ +/g, " ");           
    }
    else
    {
        alert("无法获取资源名称！");       
        DoUpdate();
        return "";
    }
}

function GetMessage()
{
    var url = document.location.href;
    if (url.indexOf("/review/") != -1)
    {
        var title = document.title;
        if (url.indexOf("http://movie") == 0)
        {
            var t = title.replace(/^(.*)\((.*) 影评\)$/, "$2");
            if (t == title)
                title = title.replace(/^(.*)\((.*) 评论\)$/, "$2");
            else
                title =t;
        }
        else
        {
            title = title.replace(/^(.*)\(评论: (.*)\)$/, "$2");
        }
        return "豆瓣评论 - " + title;
    }
    var status;
    status = document.getElementById("interest_sect_level");
    if (status)
    {
        if (status.firstChild.firstChild.className=="mr10")
        {
            return status.firstChild.firstChild.textContent;
        }
        else
        {
            return "豆瓣资源分享";
        }
    }
    alert ("无法获取资源状态！");
    DoUpdate();
    return "";
}

function GetEventMessage()
{
    var status;
    status = document.getElementById("actchoice");
    if (status)
    {
        var i;
        i = 0;
        while ((status.childNodes[i].childNodes.length == 0) && i < 2)
            ++i;
        if (status.childNodes[i].className=="m")
        {
            return status.childNodes[i].textContent;
        }
        else
        {
            return "豆瓣活动分享";
        }
    }
    alert("无法获取活动状态！");
    DoUpdate();
    return "";
}

function GetNote()
{
    var status;
    status = document.getElementById("interest_sect_level");
    if (status)
    {
        if ((status.firstChild.lastChild.tagName=="SPAN") && 
            (status.firstChild.lastChild.childNodes.length == 1) && 
            (status.firstChild.className == 'j a_stars'))
        {
            return status.firstChild.lastChild.textContent;
        }
    }
    return "";
}

function GetMyRate()
{
    var myrate;
    myrate = document.getElementById("rateword");
    if (myrate)
        return myrate.textContent;
    return "";
}

function GetURL()
{
    var pageUrl = document.location.href;
    var index;
    if ((index = pageUrl.lastIndexOf("/")) != -1)
    {
        pageUrl = pageUrl.substring(0, index+1);
    }
    return pageUrl;

}

function ChkEnv()
{
    // Check xmlhttpRequest Support
    if (!GM_xmlhttpRequest)
    {
        alert("您的Greaskmonkey插件不能支持豆饭，请升级该插件或使用豆饭XPI版本。");
        return false;
    }
    // Check for update
    if (GM_setValue && GM_getValue)
    {
        var lastCheck = GM_getValue("DoufanLastUpdate", 0);
        var dateDiff = Date.now()/1000 - lastCheck;
        // Check every 24 hours
        if ((dateDiff > 60*60*24) || (dateDiff < 0))
        {    
            DoUpdate();
        }
    }
    return true;
}

function DoUpdate()
{
    var currentRevision = 12;
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://www.freemindworld.com/db_ff/LatestVersion/',
            onreadystatechange: function(response) 
            {
                if ((response.readyState == 4) && (response.status == 200))
                {
                    if (parseInt(response.responseText) > currentRevision)
                    {
                        if (GM_setValue)
                        {
                            GM_setValue("DoufanLastUpdate", parseInt(Date.now()/1000));
                        }
                        alert("豆饭出新版本了，确定后会自动打开豆饭网页(http://www.freemindworld.com/db_ff/index.htm)，请升级到最新版本使用。");
                        window.open("http://www.freemindworld.com/db_ff/index.htm");
                    }
                }
            }
        });
}

