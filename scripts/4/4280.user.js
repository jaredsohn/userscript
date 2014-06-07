// ==UserScript==
// @name           tt-info-Popup-Fixer
// @namespace      http://userscripts.org/people/7214
// @description    Unterdrückung der TT-info.de-Popup-Menüs zum Zwecke der eigenbestimmten Navigation ohne Javascript-Links.
// @source         http://userscripts.org/scripts/show/4280
// @identifier     http://userscripts.org/scripts/source/4280.user.js
// @version        0.1
// @date           2006-06-21
// @creator        Pepino (http://www.tt-news.de/forum/member.php?u=1333)
// @include        http*://*tt-info.de/*
// ==/UserScript==
// 
// **COPYRIGHT NOTICE**
// 
// Copyright (C) 2006 and onwards  Richard Gibson
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
// 
// **END COPYRIGHT NOTICE**
//
// This script is based on the work of:
//
// @name          Convert javascript or onclick to normal links
// @author        Simon Houston
// @namespace     http://shoust.techwhack.org
// @description   Converts javascript or onclick links that open pages in new windows into normal links, so middle clicking on those type of links are possible, if you have any problems, list the sites that cause problems in the comments box, thanks :)
//
// Changelog:
// 0.1 (2006-06-21)
// 	original release based on the work of Simon Houston (http://shoust.techwhack.org)
// 
// todo:
//    - replace also the javascript-links in the top-navigation bar with nonpopup-links
//
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------

(function()
    {
    getaddress = /([\.\w+]*\([\x22\x27]([\w+\\:.\-\/\$\=\&\?\%\!]+)[\x22\x27]\)?)/gi; //the regular expression to get the address.
	stjslink=/^javascript:/; //makes sure the link's href attribute starts with javascript:
	invalink=/^javascript:(\/\/|)$/; //makes sure void javascript links also convert
	invallink=/^javascript:void[\(\d{1,2}\)]/; //exception so numbers don't convert into links.
exceptions=/(alert|split|push|EventListener|confirm|opener|chEvent|navigate|bytagname|replace|regexp|interval|timeout|array|prompt|function|indexof|Element|Attribute|void|typeof|quicktime|mediaplayer|wmv)\x28/i; //sets exceptions so bookmarklets in most cases still work, or onclick events still work.
    var ty = document.links;
        for (var i = ty.length-1,u;u=ty[i]; i--)
            {
            if(u.getAttribute('onclick')){u.setAttribute('onclick',u.getAttribute('onclick')+';void(0)');}
            if (u.href.match(getaddress) && u.href.match(stjslink))
                {
                getaddress.exec(u.href);
var ou=RegExp.$1;
if (ou.match(exceptions)){continue;}
var hmm=RegExp.$2;
                hmm = hmm.split('http://');

                if (hmm[2])
                    {
                    var tyu = 'http://' + hmm[2];
                    }

                else if (hmm[1])
                    {
var ui=hmm[1].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):'http://'+hmm[1];
                    }

                else
                    {
var ui=hmm[0].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):hmm[0];
                    };

                u.href = tyu;
                u.target = '_self';
                }

            else if (u.href.match(/\#$/) || u.href.match(invalink)
                || u.href.match(invallink) && u.getAttribute('onclick').match(getaddress))
                {
                getaddress.exec(u.getAttribute('onclick'));
var ou=RegExp.$1;
if (ou.match(exceptions)){continue;}
var hmm=RegExp.$2;
                hmm = hmm.split('http://');

                if (hmm[2])
                    {
                    var tyu = 'http://' + hmm[2];
                    }

                else if (hmm[1])
                    {
var ui=hmm[1].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):'http://'+hmm[1]; //used to get the redirected address in the link if there is one
                    }

                else
                    {
var ui=hmm[0].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):hmm[0];
                    }

                u.href = tyu;
                u.target = '_self'
            }
            // replace the javascript-close-command with javascript-back-command
            if (u.href.match(/^javascript:self.close/i)) {
               u.href = u.href.replace(/self.close/i,"back");
               u.textContent = u.textContent.replace(/Fenster schließen/i,"Eine Seite zurück");
               u.textContent = u.textContent.replace(/schließen/i,"Eine Seite zurück");
               }
	}
})() 

