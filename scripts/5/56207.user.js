// ==UserScript==
// @name           Hercules Developement ! 
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         Nguy Duc Thuan
// @developer      SieuNoopy
// ==/UserScript==
/*
This script is published under the MS-PL license which can be found on the following link:
http://www.opensource.org/licenses/ms-pl.html
In short: The software is licensed "as-is." You bear the risk of using it. The contributors give no express warranties, guarantees or conditions.
*/
var FFS = 
{
    performClick: function(node, callback)
    {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        node.dispatchEvent(evt);
        if (!callback)
            return;
        
    },
    work: function()
    {
        var buyFor = FFS.findBuyFor();
		check=document.getElementsByTagName('div');
		for(i=0;i<check.length;i++)
		{
         if (buyFor == null || check[i].className=="buy buy_achievement")
        {
            setTimeout(FFS.doReload, 1000);
            return;
        }
		}
        FFS.performClick(buyFor);
        setTimeout(FFS.confirmPurchase, 1000);
    },
    confirmPurchase : function()
    {
        var func = $(".sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a");
        if (func.length == 0)
            return;
        FFS.performClick(func[1]);  // there are two such <a> tags. The second one is what we need
        setTimeout(FFS.doReload, 1000);
    },
    doReload : function()
    {
        document.location.reload();
    },
    findBuyFor: function()
    {
        var x = $(".action_container > .actions > .buy > .sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a");//.buy
        if (x.length == 0)
            return null;
        return x[0];
    }
}

setTimeout(FFS.work, 3000);