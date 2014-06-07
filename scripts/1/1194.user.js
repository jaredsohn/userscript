// ==UserScript==
// @name          Shuffle Your Dreamhost Rewards Page
// @namespace     http://paulgoscicki.com/files/shuffle.your.dreamhost.rewards.page.user.js
// @description   Changes javascript:openWindow() into normal URLs
// @include       https://panel.dreamhost.com/index.cgi?tree=home.rew&
// @date          2005-06-26
// @version       1.00
// @author        Paul Goscicki, http://paulgoscicki.com/
//
// Credit for the original idea goes to Jesse Ruderman (http://www.squarefree.com/)
//
// ==/UserScript==

(function()
{
    var all_tables = document.getElementsByTagName('table')
    var count=0
    var blocks = new Array()

    for (var i=0; i<all_tables.length;i++)
    {
        // Look for tables which have width explicitly set to 600 (those are our main seven blocks)
        if (all_tables[i].width == 600) blocks[count++] = all_tables[i]
    }

    // And now for the fun part - reordering!

    // Switch first block with the last
    var tmp = blocks[0].innerHTML
    blocks[0].innerHTML = blocks[blocks.length - 1].innerHTML
    blocks[blocks.length - 1].innerHTML = tmp

    // Switch second block with the third
    tmp = blocks[1].innerHTML
    blocks[1].innerHTML = blocks[2].innerHTML
    blocks[2].innerHTML = tmp

})();
