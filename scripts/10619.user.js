// ==UserScript==
// @name                         deviantFIX:FeatureThis
// @description                 Easily select a deviation of yours as the featured one in your profile
// @include                       http://www.deviantart.com/deviation/*
// @include                       http://www.deviantart.com/view/* 
// @include                       http://*.deviantart.com/art/*  
// @include                       http://my.deviantart.com/profile/?featuredid=*
// ==/UserScript==

/*
  This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
  
  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
  
  You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA or visit http://www.opensource.org/licenses/gpl-license.php

 Icons are (possibly modified versions) from the Tango project <http://tango.freedesktop.org/> and are licensed under the Creative Commons Attribution Share-Alike license <http://creativecommons.org/licenses/by-sa/2.5/>
*/  

(function(){

    var iconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMFSURBVHjaYvz//z8DJQAgAINxcAQgCANA8MgQlRkefrUDLZM6LBQSAd3XxlxOZofYNtQTWhMWOqYVxHjVsdWY0gj/x+Iw7NqP/KByfwKIiSTrQI79/TtBXVlqV6S1hZUAK98/gAAi2gCgV0X/MTHMdrfQm1/r6Shz8drzfw/uvEoECCCW/wz/FYHB8A2o5iUOnQz//vwz4xbjnJ/soqUVoKHM0LH7PMOx0w8yGbmZNgEEEIuQCO/VX7//3fz8+I8PGwPDUxS9//6z/vj7J1VOTbCnwseY00ZcgKF853mGXQcf1DOxs8xiYPzHABBATHzM3J99HBQNuAXZVv7+808IrJMRGE5//2v85WBY5uaoNHVqmAenlbgkQ+Oeawy79j7vZ/vP0sTABIk9gABienbn+0wJBjGG7EAra0YuhnX//jEw/vn9z5VXnGVXarBBSIOrO4M4Dw9D78FLDNu2v1zF/pu5nAEp5AACAEEAvv8DBjAZ5u70+2RxSUoEBw3+H8fX4mUiKg1hdlc6FEoiMwD4/vMAn8nQAK6t6bgA+v1dAAf89/wE+gD9BvkA/wf8AAIAQQC+/wMQMCHw7e73HRUcCDNXMDwBCBn3DlM2LgUqDyMA7vzpALHU0wCxquzRAfIBWQUFAuwD/QQABf0GAAb7CQAG+QoAAgBBAL7/AxAvIv/99AX78gHvWy8nFwEwFiQAA/8DAO/96gC/3dYArqXx4P/tAU0GBwHgBfwGAAb8CAAI+QwACPYPAAn0EAACiFlIQ5uB9Q/H4y+f/1nxq35V4mFnYfj0/xXD6Sf3GLYu/f7m91OWACaO31f+M/+DeJoRGPEgzPQPjAECiInjFzsD5z+2n4zP+LaePv2e4TnjHYaLr+4z7Fz668uv21wxzMwMp/ElMIAAYmL+y84Awhz/2Be9PsP98MTt5wxHVzH/+n5ZIBuoeSehFAoQQMwSakbAKGVmYGJk/M70jUPszW0eix/XeesYmP9M+8/2h+Ef82+G/yzADAT2AiOGAQABxEhpdgYIMABQrSEzlY7wIwAAAABJRU5ErkJggg==";
    var profileRegex = /http:\/\/my.deviantart.com\/profile\/\?featuredid=(.+)/i;

    if (profileRegex.test(location.href)){
        var match = profileRegex.exec(location.href);
        if (match){
            document.getElementById('featuredid').value = match[1];
            document.getElementById('profile-form').submit();
        }
    } else { // we are on the deviaton page
        var pageData = unsafeWindow.deviantART.pageData;
        if (pageData.pimp_deviation_artist == pageData.pimp_me){ // is it mine?
            var icon = document.createElement('img');
            icon.src = iconSrc;
            icon.style.position = "absolute";
            icon.style.left = "39px";            
            var link = document.createElement('a');
            link.href = "http://my.deviantart.com/profile/?featuredid=" + pageData.deviationid;
            link.innerHTML = "Feature This";
            var devLinks = document.getElementById('deviation-links')
            devLinks.insertBefore(link, devLinks.getElementsByTagName('strong')[0].nextSibling);
            devLinks.insertBefore(icon, link);
        }
    }

})();
