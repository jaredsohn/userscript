// ==UserScript==
// @name          Tibia Characters Search Links
// @include       http://www.tibia.com/community/?subtopic=character*
// @author        Pnoexz (pnoexz@hotmail.com)
// @description   Gives the permalink to the character information in www.tibia.com. It also includes links to www.pskonejott.com and www.erig.net to search for the character name, the world and the guild.
// @version       0.2
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia Characters Search Links", and click Uninstall.
//
// --------------------------------------------------------------------

(function() {
   var getatr = document.getElementsByTagName('tr')
   var getaa = document.getElementsByTagName('a')   
   for (var i = 0; i < getatr.length; i++) {
      if (getatr[i].firstChild) {; var gotatr = getatr[i].firstChild
         if (gotatr.innerHTML == 'Name:') {
            var boname = gotatr.nextSibling.textContent; var finame = boname.split(','); var name = finame[0]; var lname = name.replace(/ /g,'+'); var delname = finame[1]
            if (delname) { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a> <span style="font-size: 10px">' + delname + '</span><br> <span style="font-size: 10px">[ Search character: <a href="http://www.pskonejott.com/otc_display.php?character=' + lname + '">Pskonejott</a> || <a href="http://www.erig.net/xphist.php?player=' + lname + '">Erig</a> ]</span>' }
            else { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a><br><span style="font-size: 10px">[ Search character: <a href="http://www.pskonejott.com/otc_display.php?character=' + lname + '">Pskonejott</a> || <a href="http://www.erig.net/xphist.php?player=' + lname + '">Erig</a> ]</span>' }
         }
         if (gotatr.innerHTML == 'World:') {
            var worname = gotatr.nextSibling.textContent
            gotatr.nextSibling.innerHTML = '<a href="http://www.tibia.com/community/?subtopic=whoisonline&world=' + worname + '">' + worname + '</a><br><span style="font-size: 10px">[ Search world: <a href="http://www.pskonejott.com/otc_display.php?server=' + worname + '">Pskonejott</a> || <a href="http://erig.net/xphist.php?world=' + worname + '">Erig</a> ]</span>'
         }
      }
   }
   for (var f = 0; f < getaa.length; f++) {
      if (getaa[f].firstChild) {
         var gotaa = getaa[f].parentNode.innerHTML
         var splgotaa = gotaa.split('=')
         if (splgotaa[2] == 'guilds&amp;page') { 
            var guiname = getaa[f].firstChild.textContent; var regrep = new RegExp('\u00a0','g'); var guiname = guiname.replace(regrep,'+')
            getaa[f].parentNode.innerHTML = gotaa + '<br><span style="font-size: 10px">[ Search guild: <a href="http://www.pskonejott.com/otc_display.php?guild=' + guiname + '">Pskonejott</a> ]</span>'
         }
      }
   }
})()

// Change log
//
// v0.1 First release
// v0.2 Added links to Pskonejott and Erig // Renamed the script