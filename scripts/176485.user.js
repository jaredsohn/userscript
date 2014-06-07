// ==UserScript==
// @name       itusozluk favori kontrol
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  favori kontrol
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

$(document).ajaxSuccess(function(e, xhr, opt) {
     Work();
    });

    function Work()
	{
     
    var buttons = $(document).find("input[value='favori']");
                  
    if (buttons.length>0)
    { 
        for (var i=0;i<buttons.length;i++)
        {              
            var button = buttons[i];
            var entryID = button.getAttribute("onclick").replace("addfav(","").replace(");","");;
            button.onclick=function() { 
                var res=confirm("Favorilere eklemek istediğinize emin misiniz?");
                if (res==true)
                {
                    addfav(entryID);
                }
                else
                {
                    return false;
                } 
            }          
        }
    }
}