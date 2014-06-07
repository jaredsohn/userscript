// ==UserScript==
// @name	TF2R - TF2r Item display A21 Fix
// @namespace	elvissteinjr
// @description	Fixes the now broken TF2r Item display A21 text. Calculation code mostly stolen from MangoTux' TF2r Item display script, which is also required for this to work.
// @include	http://tf2r.com/k*
// @grant	none
// ==/UserScript== 

(function() {var replaceFunc = function()
{
    window.updateWC = function() 
    {
    		if(nwc < cwc)
    		{
      			cwc -= ( cwc - nwc ) / 10;
      			$("#winc").html(roundNumber(cwc, 3) + "%");
    		}
    		
    		setTimeout(updateWC, 50);
        
        //Calculate A21
        var chance = nwc;
        var entries = parseInt(document.getElementById("entry").innerHTML.split("/")[0]);
        var rafin = document.getElementsByClassName("raffle_infomation")[6];
        var uni = rafin.getElementsByClassName("item q6").length;
        var str = rafin.getElementsByClassName("item q11").length;
        var gen = rafin.getElementsByClassName("item q1").length;
        var vin = rafin.getElementsByClassName("item q3").length;
        var unu = rafin.getElementsByClassName("item q5").length;
        var hau = rafin.getElementsByClassName("item q13").length;
        var total = uni + str + gen + vin + unu + hau;
        
        if(entries > 1)
        {
        	  var winners = Math.round(chance/(100/entries));
        }
        
        if (chance == 10)
        {
            document.getElementsByClassName("hfont")[0].getElementsByTagName("i")[0].innerHTML = "<small>Can't calculate yet, wait a second...</small>";
        }
        else if(entries > 1)
        {
          	if(winners == 1 && total > 1)
          	{
          	   document.getElementsByClassName("hfont")[0].getElementsByTagName("i")[0].innerHTML = "All to one";
          	}
          	else
          	{
          	   document.getElementsByClassName("hfont")[0].getElementsByTagName("i")[0].innerHTML = "One item per person";
          	}
        }
        else
        {
          	document.getElementsByClassName("hfont")[0].getElementsByTagName("i")[0].innerHTML = "<small>Can't calculate yet.</small>";
        }
    }
};

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ replaceFunc +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
})();