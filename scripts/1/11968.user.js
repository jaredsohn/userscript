// SOHU-MNT Plugin 
// Version 0.1 beta
// Copyright (C) 2007, Jia Mi <winters.mi (AT) gmail.com>
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
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SOHU-MNT plugin", and click Uninstall.
//
// $Id: sohumnt.user.js 9 2007-07-28 11:42:05Z MJiA $
//
// ==UserScript==
// @name SOHU-MNT plugin
// @namespace http://mjia.blog.sohu.com/
// @description A plugin for the integration of SOHU-MNT and Fanfou. 
// @include http://mjia.blog.sohu.com/*
// ==/UserScript==

// Check if the environment is OK
document.getElementsByClassName = function(className, parentElement, tagName) {
  var children = (parentElement || document.body).getElementsByTagName(tagName || '*');
  var elements = [];
  for (var i=0; i<children.length; i++) {
    var child = children[i];
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
      elements.push (child);
    }
  }
  return elements;
};

if (ChkEnv())
{
    ChkData();
}

function DoSubject()
{
	var allul, thisul;
	allul = document.getElementsByTagName('ul');
	for (var i = 0; i < allul.length; i++)
	{
		thisul = allul[i];
		if (thisul.id.indexOf("behaviorlist") != -1)
		{
			var p = thisul.childNodes[0];
		        p.innerHTML += " &nbsp; &nbsp; &nbsp; ";
			var btn = document.createElement("a");
			btn.href = "#";
			btn.textContent="分享到饭否";
			btn.addEventListener("click", PostFanfou,false);
			p.appendChild(btn);   
			break;   
		}   
	}
}

function PostFanfou(event)
{
	var allul, thisul, linode;
	allul = document.getElementsByTagName('ul');
	for (var i = 0; i < allul.length; i++) {
		thisul = allul[i];
		linode = null;
		if (thisul.id.indexOf("behaviorlist") != -1)
		{
			linode = thisul.childNodes[0];
			break;   
		}   
	}
	
	if (linode == null)
		return;

	var msg = linode.innerHTML.substring(0, 6);
	var link = linode.getElementsByTagName('a')[0];
	msg += link.innerHTML;
	msg += " (" + link.href + ") - 搜狐博客迷你帖";
	
	var additional = prompt("预览：\n" + msg + "\n\n你还可以添加一些附注(不超过" + (130-msg.length) + "字)：","");
	if (additional == null) {
	        alert("放弃分享。");
        	return;
    	}
    	if (additional != "")
        	msg += " - " + additional;
	SendRequest(msg);
}

function SendRequest(msg)
{
	GM_xmlhttpRequest({
        method: 'POST',
				url: 'http://api.fanfou.com/statuses/update.xml',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: 'source=SohuSharing&status=' + encodeURIComponent(msg),
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

function ChkEnv()
{
	// Check xmlhttpRequest Support
	if (!GM_xmlhttpRequest)
	{
		alert("您的GreaseMonkey插件不能支持狐狸饭，请升级该插件。");
		return false;
	}
	return true;
}

// Check if the mnt widget is OK
function ChkData()
{
    var mntWidget = document.getElementsByClassName('miniblog-content', false, 'div');
    GM_log(mntWidget);
    if (mntWidget && mntWidget.length > 0)
    {
        sysMnt = document.getElementsByClassName('sysinfo', mntWidget[0], 'ul');
        if (sysMnt && sysMnt.length > 0)
        {
            var lis = sysMnt[0].getElementsByTagName('li');
            if (lis && lis.length > 0)
            {
                setTimeout(DoSubject, 100);
                return;
            }
        }
    }   
    setTimeout(ChkData, 1000);
}

