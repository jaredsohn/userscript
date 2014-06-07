// ==UserScript==
// @name           i_sud_arm auto2
// @namespace      http://apps.facebook.com/friendsforsale/users/show/160500901
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @reference	   http://userscripts.org/scripts/show/24984
// @implementation Nguy Duc Thuan
// ==/UserScript==
/*
This script is published under the MS-PL license which can be found on the following link:
http://www.opensource.org/licenses/ms-pl.html
In short: The software is licensed "as-is." You bear the risk of using it. The contributors give no express warranties, guarantees or conditions.
*/
var _delay = 5000;
var MAXVALUE = 15000000;
var FFS =
{
    performClick: function(node)
    {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        node.dispatchEvent(evt);
    },
    work: function()
    {
        var buyFor = FFS.findBuyFor();
		var coin = document.querySelectorAll("#app7019261521_hover_container > [id^=app7019261521_the_coin]");
			if (coin.length == 1) {
				var c = coin[0].firstChild;
				var value = parseInt($(c).text());
				// 500k - 999k is a mock value, FFS use it to detect bots
				if (value >= 500 && value <= 999) {
					var prev = document.querySelector("a.prev");
					window.location = prev;
				}
				
        if (buyFor == null)
        {
            setTimeout(FFS.doReload, 1000);
            return;
        }
        if (!FFS.checkValue())
        {
            alert('Pre-specified max value reaches');
            return;
        }
        FFS.performClick(buyFor);
        setTimeout(FFS.confirmPurchase, _delay);
    },
    checkValue: function()
    {
        var valueElement = $(".action_container > .actions > .buy > .sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a > span > strong")[0];
        var value = valueElement.firstChild.textContent.replace(/[\$,\.]/g, '');
        value = parseInt(value, 10);
        if (value >= MAXVALUE)
            return false;
        return true;
    },
    confirmPurchase: function()
    {
        var func = $(".sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a");
        if (func.length == 0)
            return;
        FFS.performClick(func[1]);  // there are two such <a> tags. The second one is what we need
        setTimeout(FFS.doReload, 3000);
    },
    doReload: function()
    {
        document.location.reload();
    },
    findBuyFor: function()
    {
        var x = $(".action_container > .actions > .buy > .sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a"); //.buy
        if (x.length == 0)
            return null;
        return x[0];
		
    }
}

setTimeout(FFS.work,5000);

