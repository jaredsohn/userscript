// ==UserScript==
// @name          4chan Expand All Images
// @namespace     
// @description   expands all images on 4chan by pressing + button in top left
// @include       http://*.4chan.org/*
// ==/UserScript==

// find friendID

var path = location.href;
var query = '';
if(path.indexOf('friendID=') > 0)
	query = 'friendID=';
if(path.indexOf('friendid=') > 0)
	query = 'friendid=';
var section = path.split(query);
var friendID = '';
if(section.length > 1)
        friendID = section[1];
section = friendID.split('&');
if(section.length > 1)
        friendID = section[0];
//alert('|'+path+'|'+friendID+'|');

// add menu

var myHaxMenu = document.createElement("div");
myHaxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myhaxlayer #table1 a {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #0000FF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'textarea.CommentBox {'
+'width:150px;'
+'height:50px;'
+'padding:5px;'
+'color:FFFFFF;'
+'font-size:8pt;'
+'font-family:Verdana;'
+'border-color:959385;'
+'border-style:solid;'
+'background-color:333333;'
+'}'
+'input.SubmitButton {'
+'width:150px;'
+'padding:0px;'
+'background-color:d5d2c2;'
+'border-color:a6a498;'
+'border-style:solid;'
+'border-width:1;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; z-index: 100; right; top: 75pt; left: 0pt" id="myhaxlayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td><p align="left">'
+'<a href="javascript:function expandAll(){images=document.getElementsByTagName(%22img%22);for(i=0;i<images.length;i++)if(images[i].getAttribute(%22md5%22)){images[i].src=images[i].parentNode;images[i].style.height=%22auto%22;images[i].style.width=%22auto%22;}}expandAll(); "><img src="chrome://4chan/skin/buttons/burichan/post_expand_plus.png"></a><br>'
+'<a href="javascript:window.location.reload()"><img src="chrome://4chan/skin/buttons/burichan/post_expand_minus.png"></a>'
+'</font></td></tr></table></div>'
document.body.insertBefore(myHaxMenu, document.body.firstChild);
