// ==UserScript==
// @name           download ftp 8.54
// @namespace      http://192.168.8.54/lowresolution/player.php
// @include        http://192.168.8.54/lowresolution/player.php*
// ==/UserScript==

vidID = document.location.toString().split("file=")[1];
vidID = vidID.replace(/storage/, '');
vidNam = document.location.toString().split("/")[10];

var my_banner = document.createElement("div");
my_banner.innerHTML = '&nbsp; <a href="ftp://ciprian.cucuruz:cipriancucuruz@192.168.8.54' + vidID + '" title=' + vidNam + '><b>Download full resolution</b></a> (Click dreapta - Save link as...)';
document.body.insertBefore(my_banner, document.body.firstChild);

pagebody = document.body.innerHTML;
pagebody = pagebody.replace(/<div>\/storage/, '<a href="ftp://ciprian.cucuruz:cipriancucuruz@192.168.8.54' + vidID + '">');
document.body.innerHTML = pagebody;
