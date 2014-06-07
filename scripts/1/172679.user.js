// ==UserScript==
// @name            GM test
// @author          Tjeerdo
// @version         1.0i    
// @description     test
// @include         http://nl*.tribalwars.nl/game.php?*
// ==/UserScript==

(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
    if(game_data.screen == "overview") {
       var link = game_data.link_base_pure + "place&mode=call";
       $.ajax({
                url: link,
                success: function (result) {
				
			 $(result).find("#support_sum tr td[data-unit]").each( function(){
				    var temp = $(this);
				     var unit = temp.attr("data-unit");
					//alert(unit);

				    var aantal = temp.html();
				    
				  
                                        
                                        
                                        
                                        
                                    $('vis').find("vis tr td(strong id)").each(function(){
                                            var temp2 = $(this);
                                            var unit2 = temp2.attr("strong id");
                                            var aantal2 = temp2.html();
                                        })
                                    
                                        var aantaltot = aantal + aantal2;
                                        
                                        
					if (aantaltot != "0")
					{
					$("#rightcolumn").append("<img src='http://cdn2.tribalwars.net/graphic/unit/unit_"+unit+".png'/>" + ": " + aantaltot + "<br/>")
					} else {
					temp.remove();
					}
					
                })
		}
            })
			
			
			
    }
});