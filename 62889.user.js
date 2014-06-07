// ==UserScript==
// @name           i_arm_roo
// @namespace      http://nguyducthuan.com
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @reference	   http://userscripts.org/scripts/show/24984
// @implementation Nguy Duc Thuan
// ==/UserScript==

var _delay = 2500;
var MAXVALUE = 35000000;
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
        if (buyFor == null)
        {
            setTimeout(FFS.doReload, 3500);
            return;
        }
         if (!FFS.checkValue())
        {
          
            return;
        }

        FFS.performClick(buyFor);
        setTimeout(FFS.confirmPurchase, _delay);
        setTimeout(FFS.confirmPurchase2, _delay);
        
        
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
    confirmPurchase : function()
    {
        var func = $(".buy_dialog_button");
        if (func.length == 0)
            return;
        FFS.performClick(func[0]);
        
    },

     confirmPurchase2: function()
    {
        var func = $(".sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a");
        if (func.length == 0)
            return;
        FFS.performClick(func[1]);  
        setTimeout(FFS.doReload, 10000);
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

setTimeout(FFS.work, 3000);