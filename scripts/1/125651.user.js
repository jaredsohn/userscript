// ==UserScript==
// @name       Mod Reveal
// @namespace  http://gm.bungie.co
// @version    0.1
// @description  Displays the name of the moderator who banned you while trying to post in a private group. You are normally unable to see this due to a site bug.
// @match      http://*.bungie.net/fanclub/*/Forums/createpost.aspx?postID=*&act=reply
// @copyright  (c) ctjl96
// @require    http://code.jquery.com/jquery-latest.js
// @icon       http://gm.bungie.co/ctjl96/images/mod_reveal/32.png
// ==/UserScript==
if (document.getElementsByTagName('h2')[0].innerHTML == 'You Have Been Banned') 
{
    adminProf = document.getElementById('ctl00_SpecificErrorTextContent_blacklistAdminHyperLink');
    patt = /<span id="ctl00_mainContent_header_lblUsername">[a-zA-Z][a-zA-Z0-9\s]{3,15}/;
    datHTML = $.ajax({
        url: adminProf.href,
        dataType: 'text',
        success: function (responseText) {
            adminProf.innerHTML = patt.exec(responseText)[0].slice(patt.exec(responseText)[0].indexOf('>') + 1);
        }
    });
}