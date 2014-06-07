// ==UserScript==
// @name WoL Server Changer
// @description Adds links above the game applet that lets you change servers with ease.
// @namespace WoL Server Changer
// @include http://*.waroflegends.jagex.com/*
// @version 1.2
// @author BreakIt
// ==/UserScript==

var address = '.waroflegends.jagex.com/';
var details = window.location.href.split("/")[3];

var servers = new Array(
  [4],
  ['royalgarden','Royal Garden'],
  ['imperialpalace','Imperial Palace'],
  ['emeraldparadise','Emerald Paradise'],
  ['goldentemple','Golden Temple']
);

var links = document.createElement("div");
links.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: 16px; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    '<center><font size=16 color="red">' +
    GetServer() +
    '</p></font>' +
    ServerList() + 
    '</center>' +
    '</div>';
document.body.insertBefore(links, document.body.firstChild);

function GetServer()
{
  server = window.location.href.split(".")[0].split("/")[2]

  for (i=1;i<=servers[0];i++)
    {
      if (servers[i][0] == server) { 
        server = servers[i][1]; 
      }      
    }

  return server;
}

function ServerList() 
{
server = GetServer();
  output = '-- ';
 for (i=1;i<=servers[0];i++)
    {
      if (servers[i][1] != server) {
        url = 'http://' + servers[i][0] + address + details;
        output = output + '<a href="' + url + '">' + servers[i][1] + '</a> -- ';
      }
    }
  return output;
}


function init() {
  document.body.vLink = "blue";
}

init();