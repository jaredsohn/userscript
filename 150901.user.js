// ==UserScript==
// @name        Deviant Art Allow Mature Content
// @namespace   deviantart.com
// @description Allow anyone to see any mature content regardless of age or options.
// @include     *deviantart.com*
// @version     0.5
// @icon        http://imageshack.us/a/img835/5956/showc.png
// ==/UserScript==

filterWarning = document.getElementById("filter-warning");
//alert(filterWarning.innerHTML);
//if you can't display add display button.
if (filterWarning.innerHTML.indexOf("Display") == -1 || filterWarning.innerHTML.indexOf("display") == -1) {
    payload = "";
    payload += "<br>\n";
    payload += "<br>\n";
    payload += "<div>\n";
    payload += '<a class="smbutton smbutton-blue" onclick="return DWait.readyLink(\'jms/pages/superbrowse/master.js\', this, \'GMI.up(this).display()\')" href="#" style="font-size:9pt">'+"\n";
    payload += "<span>Display This Deviation Anyway</span>\n";
    payload += "</a>\n";
    payload += "</div>\n";
    filterWarning.innerHTML += payload;
}
//alert(filterWarning.innerHTML);