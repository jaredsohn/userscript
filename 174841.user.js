/*
    Redirect proXPN to its target location without user interaction.
    Copyright © 2013 BattyBovine

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            proXPN Redirect
// @namespace       https://userscripts.org/users/BattyBovine
// @description     Redirect proXPN to its target location without user interaction.
// @version         1.1
// @author          BattyBovine
// @include         http://portal.proxpn.com/portal.php*
// ==/UserScript==

(function() {
    var op=document.getElementsByName("op")[0].value,host=document.getElementsByName("host")[0].value,uri=document.getElementsByName("uri")[0].value,qs=document.getElementsByName("qs")[0].value,xpnrequest=new XMLHttpRequest();
    xpnrequest.onreadystatechange=function(){if(xpnrequest.readyState==4&&xpnrequest.status==200){qs=qs.replace(/((&)|(&amp;)qs=\?(&)|(&amp;))?(z_[0-9a-f]{32}=[\d]{10})/i,"");window.location.replace("http://"+host+uri+(qs?"?"+qs:""));}};
    document.title="Redirecting to "+host+"...";
    document.body.innerHTML="Redirecting to "+host+"...";
    xpnrequest.open("POST","/portal.php");
    xpnrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xpnrequest.send("op="+op+"&host="+host+"&uri="+uri+"&qs="+qs);
})()