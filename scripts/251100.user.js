//
// ==UserScript==
// @name travian attack detector
// @namespace absolvo.ru/
// @version 0.01
// @source travian/
// @description attack detector for travian
// @include *.travian.*
// @grant       none
// ==/UserScript==

window.onload = function() {
var table = document.getElementById('overview');
if (table)
    {
        var rows = table.rows.length;
        //var cells = table.cells.length;
        for (var i=1;i<rows;i++)
        {
            //alert(table.rows[i].innerHTML);
            //if (table.rows[i].
            var text = table.rows[i].cells[1].innerHTML;
            if (text.indexOf("att1") != -1)
            {
                mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");
                mCoinSound.play();
                alert("You are Attacked!!!");
            }
        }
        setInterval(function(){location.reload()},60000);
    }
}
