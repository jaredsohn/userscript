?// ==UserScript==
// @name           ForwardScrap
// @author         Kunal Singh |  (translation and update)<http://www.orkut.com/Profile.aspx?uid=12475012595066791714>
// @description    views locked albums
// @include        *.orkut.com/PS*
// @include        *.orkut.com/PS*
// ==/UserScript==

/* after installing the script go to http://www.orkut.com/PS
*/

    javascript: face = document.body.innerHTML.match(/background-image: url\((.*?)\)/i)[1]; html = ""; for (i=1; i<=100;i++) { html += "<img src=\"" + face.replace(/medium/, "milieu/" + i) + "\">" }; // document.body.innerHTML = html; 