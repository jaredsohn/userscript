// ==UserScript==
// @name           Kurnik / PlayOk
// @namespace      http://www.charles.art.br/userscripts/kurnik.user.js
// @description    open all closed game rooms
// @include        http://www.kurnik.org/intl/*
// @include        http://www.playok.com/intl/*
// ==/UserScript==

// Copyright (c) 2007-2008 Charles Guimaraes Cavalcante

url = location.href.split("/");

lang = url[url.length-3];

html = document.body.innerHTML;

pos = html.search("gid=");

game = html.substr(pos + 4, 2);

table = document.body.getElementsByTagName("TABLE")[0];

rooms = table.getElementsByTagName("B");

for(rx = 0; rx < rooms.length; rx++)
{
    if(rooms[rx].innerHTML.substr(0,2)!="<a")
    {
        rooms[rx].innerHTML = "<a href=\"javascript:rm('" + 
                              game + "','/intl/" + lang + 
                              "/misc/?gid=" + game + 
                              "&r=" + rooms[rx].innerHTML + 
                              "');\">" + rooms[rx].innerHTML + 
                              "</a>";
    }
}