// ==UserScript==
// @name           4sight
// @version        120728
// @description    Search for threads on 4chan
// @author         Couchy
// @homepage       http://userscripts.org/users/112858
// @namespace      http://userscripts.org/users/112858
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @exclude        http://boards.4chan.org/f/*
// @exclude        https://boards.4chan.org/f/*
// ==/UserScript==

var board = document.location.href.match(/https?:\/\/boards\.4chan\.org(\/.*?\/)/i);
var index = "fs_Index_" + board[1];
var timestamp = "fs_Timestamp_" + board[1];
var threads = localStorage.getItem(index) ? function(){try{return JSON.parse(localStorage.getItem(index));}catch(e){return [];}}() : [];
var completedrequests = 0;

var main = document.getElementsByName("delform")[0];
var fs_menu_toggle = document.createElement("a");
fs_menu_toggle.setAttribute("style", "cursor: pointer; float: right;");
fs_menu_toggle.innerHTML = "Search Board";
main.parentNode.insertBefore(fs_menu_toggle, main);
var fs_menu = document.createElement("div");
fs_menu.setAttribute("style", "width: 100%; height: 450px; float: left; display: none;");
fs_menu.innerHTML = ""
    + "<table style='width: 100%; height: 450px; table-layout: fixed; border-collapse: collapse;' border='1'>"
    +   "<tr>"
    +     "<td style = 'width:20%; height: 450px; vertical-align: top;'>"
    +       "<div style='width: 100%; height: 36%; overflow: auto;'>"
    +         "<table style='width: 90%; height: 100%; table-layout: fixed;'>"
    +           "<tr><td colspan='2' style='text-align: center;'><input id='fs_search' style='width: 100%;'></input></td></tr>"
    +           "<tr><td>Comments</td><td style='text-align: center;'><input id='fs_comments' name='fs_mode' type='radio' checked='true'></input></td></tr>"
    +           "<tr><td>Subjects</td><td style='text-align: center;'><input id='fs_subjects' name='fs_mode' type='radio'></input></td></tr>"
    +           "<tr><td>Names</td><td style='text-align: center;'><input id='fs_names' name='fs_mode' type='radio'></input></td></tr>"
    +           "<tr><td>Regex</td><td style='text-align: center;'><input id='fs_regex' type='checkbox'></input></td></tr>"
    +           "<tr><td colspan='2' style='text-align: center;'><input id='fs_index' type='button' value='Update Index' style='width: 100%;'></input></td></tr>"
    +           "<tr><td colspan='2' style='text-align: center;'><input id='fs_delindex' type='button' value='Delete Index' style='width: 100%;'></input></td></tr>"
    +         "</table>"
    +       "</div>"
    +         "<div id='fs_status' style='width: 100%; height: 64%; white-space: nowrap; font-size: 10px; background-color: white; overflow: auto;'></div>"
    +     "</td>"
    +     "<td style='width: 30%; height: 450px;'>"
    +       "<div style='height: 100%; overflow-y: auto;'><table id='fs_data' style='width:100%; border-collapse: collapse;' border='1'></div>"
    +       "</table>"
    +     "</td>"
    +     "<td style='width: 50%; height: 450px;'>"
    +       "<div id='fs_preview' style='width: 100%; height: 100%; text-align: left; overflow-y: auto;'></div>"
    +     "</td>"
    +   "</tr>"
    + "</table>";
main.parentNode.insertBefore(fs_menu, main);

function safeArray(arr, index, def){return (typeof arr === "object" && arr instanceof Array && arr[index] !== "undefined") ? arr[index] : def;}

function $(id){return document.getElementById(id);}
var fs_search = $("fs_search");
var fs_comments = $("fs_comments");
var fs_subjects = $("fs_subjects");
var fs_names = $("fs_names");
var fs_regex = $("fs_regex");
var fs_index = $("fs_index");
var fs_delindex = $("fs_delindex");
var fs_status = $("fs_status");
var fs_data = $("fs_data");
var fs_preview = $("fs_preview");

function toggleMenu()
{
    if(fs_menu.style.display === "none")
    {
        fs_menu.style.display = "";
        main.style.display = "none";
        fs_menu_toggle.innerHTML = "Close Search";
    }
    else
    {
        fs_menu.style.display = "none";
        main.style.display = "";
        fs_menu_toggle.innerHTML = "Search Board";
    }
    window.scrollTo(0, fs_menu_toggle.offsetTop);
}

function status(msg, color)
{
    var line = document.createElement("a");
    line.setAttribute("style", "color: " + (color ? color : "blue") + ";");
    line.innerHTML = msg;
    fs_status.appendChild(document.createElement("br"));
    fs_status.appendChild(line);
    fs_status.scrollTop = fs_status.scrollHeight;
    return line;
}

function stripTags(html)
{
    var tags = [];
    while(/<.*?>/i.test(html))
    {
        tags.push(html.match(/<.*?>/i)[0]);
        html = html.replace(/<.*?>/i, "�");
    }
    return [html, tags];
}

function replaceTags(stripped)
{
    var html = stripped[0];
    var tags = stripped[1];
    for(var i = 0; i < tags.length; i++)
        html = html.replace(/�/i, tags[i]);
    return html;
}

function thread(html, page, number)
{
    this.page = page;
    this.number = number;
    this.html = html;
    this.no = safeArray(html.match(/<a href="res\/([0-9]*)"/i), 1, "");
    this.subject = function(){var o = safeArray(html.match(/<span class="subject">([^]*?)<\/span>/i), 1, ""); var p; return(p = safeArray(o.match(/<span title="([^"]*?)"/i), 1, false)) ? p : o;}();
    this.name = safeArray(html.match(/<span class="name">([^]*?)<\/span>/i), 1, "");
    this.comment = safeArray(html.match(/<blockquote class="postMessage[^>]*?>([^]*?)<\/blockquote>/i), 1, "");
    this.omitted = safeArray(html.match(/<span class="summary[^>]*?>([0-9]*?) post[^<]*?<\/span>/i), 1, "0");
    this.omittedimg = safeArray(html.match(/<span class="summary[^>]*?>[^<]*?([0-9]*?) image rep[^<]*?<\/span>/i), 1, "0");
}

function delIndex()
{
    
    window.localStorage.removeItem(index);
    window.localStorage.removeItem(timestamp);
    status("Deleted index for " + board[1] + ".", "blue");
}

function doIndex(pg)
{   
    var line = status("Loading page " + pg + "...", "gray");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", board[0] + pg, true);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.onreadystatechange = function(aEvt)
        {
            if(xhr.readyState === 4)
            {
                if(xhr.status === 200)
                {
                    var html = xhr.responseText.match(/<div class="postContainer opContainer"[^]*?<\/div>[^<]*?<\/div>([^<]*?<span[^]*?<\/span>)?/gi);
                    
                    if(html)
                    {
                        var l = html.length;
                        line.innerHTML = "Found " + l + " threads on page " + pg + "...";
                        line.setAttribute("style", "color: green;");
                        for(var i = 0; i < l; i++)
                            threads[(pg * 15) + i] = new thread(html[i], pg, i);
                    }
                    
                    else
                    {
                        line.innerHTML = "No threads found on page " + pg + "...";
                        line.setAttribute("style", "color: red;");
                    }
                }
                
                else
                {
                    line.innerHTML = "Error loading page " + pg + " (" + xhr.status + ")...";
                    line.setAttribute("style", "color: red;");
                }
                
                completedrequests++;
                
                if(completedrequests >= 11)
                {
                    completedrequests = 0;
                    var time = new Date().toLocaleString();
                    status("Saving index for " + board[1] + "...", "blue");
                    window.localStorage.setItem(index, "[" + threads.map(function(item){return JSON.stringify(item);}).toString() + "]");
                    window.localStorage.setItem(timestamp, time);
                    status("Index for " + board[1] +" last updated " + time, "black");
                }
            }
        };
    xhr.send(null);
}

function search()
{
    var query = fs_search.value;
    var regex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "gi");
    if(fs_regex.checked)
    {
        try
        {
            var flags = query.replace(/.*\/([gimy]*)$/, "$1");
            var pattern = query.replace(new RegExp("^/(.*?)/" + flags + "$"), "$1");
            regex = new RegExp(pattern, flags);
        }
        catch(e)
        {
            regex = /a^/;
        }
    }
    
    
    if(query !== "")
    {
        fs_data.innerHTML = "";
        fs_preview.innerHTML = "";
        
        var com_e = fs_comments.checked;
        var sub_e = fs_subjects.checked;
        var name_e = fs_names.checked;
        
        var l = threads.length;
        for(var i = 0; i < l; i++)
        {
            var thread = threads[i]; if(!thread) continue;
            var comstrip = stripTags(thread.comment);
            var com = comstrip[0];
            var substrip = stripTags(thread.subject);
            var sub = substrip[0];
            var namestrip = stripTags(thread.name);
            var name = namestrip[0];
            var omit = thread.omitted;
            var omitimg = thread.omittedimg;
            
            regex.lastIndex = 0;
            if((com_e && regex.test(com)) || (sub_e && regex.test(sub)) || (name_e && regex.test(name)))
            {
                var group = document.createElement("tbody");
                
                var tr1 = document.createElement("tr");
                tr1.setAttribute("style", "background-color: #EA8;");
                
                var sp1 = document.createElement("span");
                sp1.innerHTML = "<a href='http://boards.4chan.org" + board[1] + "res/" + thread.no + "'>>>" + thread.no + "</a>";
                tr1.appendChild(sp1);
                
                var a = document.createElement("a");
                a.innerHTML = "[⇗]";
                a.setAttribute("href", "http://boards.4chan.org" + board[1] + "res/" + thread.no);
                a.setAttribute("target", "_blank");
                tr1.appendChild(a);
                
                var sp2 = document.createElement("span");
                sp2.innerHTML = "&nbsp;(" + thread.page + "&#8209;" + thread.number + ")";
                sp2.setAttribute("title", "Page " + thread.page + " Thread " + thread.number);
                tr1.appendChild(sp2);
                
                var sp3 = document.createElement("span");
                sp3.innerHTML = (omit !== "0") ? ("&nbsp;[" + omit + "/" + omitimg + "]") : "";
                if(sp3.innerHTML !== "")
                    sp3.setAttribute("title", omit + " posts and " + omitimg + " image replies omitted.");
                
                sp3.setAttribute("style", "font-weight: bold; color: #707070;");
                tr1.appendChild(sp3);
                group.appendChild(tr1);
                
                var tr2 = document.createElement("tr");
                var td4 = document.createElement("td");
                
                if(com_e)
                    td4.innerHTML = replaceTags([com.replace(regex, "<b style='font-weight: bold; background-color: yellow'>$&</b>"), comstrip[1]]);
                
                else if(sub_e)
                    td4.innerHTML = replaceTags([sub.replace(regex, "<b style='font-weight: bold; background-color: yellow'>$&</b>"), substrip[1]]);
                
                else if(name_e)
                    td4.innerHTML = replaceTags([name.replace(regex, "<b style='font-weight: bold; background-color: yellow'>$&</b>"), namestrip[1]]);
                
                tr2.appendChild(td4);
                group.appendChild(tr2);
                group.addEventListener("mouseover", function(t){return function(){fs_preview.innerHTML = t.html;};}(thread), true);
                fs_data.appendChild(group);
            }       
        }
    }
}

fs_menu_toggle.addEventListener("click", function(){toggleMenu();}, false);
fs_search.addEventListener("keyup", function(){search();}, false);
fs_comments.addEventListener("click", function(){search();}, false);
fs_subjects.addEventListener("click", function(){search();}, false);
fs_names.addEventListener("click", function(){search();}, false);
fs_regex.addEventListener("click", function(){search();}, false);
fs_index.addEventListener("click", function(){status("Updating index...", "blue"); threads = []; for(var i = 0; i <= 10; i++){doIndex(i);}}, false);
fs_delindex.addEventListener("click", function(){delIndex();}, false);

window.localStorage.getItem(timestamp) ? status("Index for " + board[1] + " last updated " + window.localStorage.getItem(timestamp), "black") : status("No saved index for " + board[1] + "!", "black");