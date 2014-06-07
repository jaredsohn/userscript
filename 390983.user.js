// ==UserScript==
// @name       dota-trade manager
// @namespace  http://dota-trade.com/
// @version    0.1
// @description  have/wish asistent. Sort
// @match      http://dota-trade.com/users/*
// @copyright  2014+, You
// ==/UserScript==

function parser(rar)
{    
    temp = [];
    
    var counter = 0;
    
    $("#inventory div.tile.b_rar_" + rar + "").each(function(){
        dvp = parseFloat(($(this).find(".tip .misc .d").eq(0).html()/$(this).find(".tip .misc .o").eq(0).html()).toFixed(5));
        dvpL = (dvp+'').split(".")[0];
        dvpR = (dvp+'').split(".")[1];
        temp.push(new Array(
            '<div class="'+$(this).attr("class")+'"><div style="background: red; position: absolute; text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; color: white;"><span style="color: black">'+ dvpL + '</span><span style="color: pink">.</span><span style="color: yellow">' + dvpR + '</span></div>' + $(this).html() + '</div>',
            parseFloat(($(this).find(".tip .misc .d").eq(0).html()/$(this).find(".tip .misc .o").eq(0).html()).toFixed(5))
        ));
        ++counter;
    });
    
        temp.sort(function(a, b) { 
        	return a[1] < b[1]?1:-1;
        });
        
    	if(rar == 1)
    		op = $("div.tiles.clear.commons")[0];
    	if(rar == 2)
    		op = $("div.tiles.clear.uncommons")[0];
   	 	if(rar == 3)
    		op = $("div.tiles.clear.rare")[0];
    	if(rar == 4)
            op = $("div.tiles.clear.mythical")[0];
    	if(rar == 5)
            op = $("div.tiles.clear.legendary")[0];
    	if(rar == 6)
            op = $("div.tiles.clear.ancient")[0];
    	if(rar == 7)
            op = $("div.tiles.clear.immortal")[0];
    	if(rar == 8)
            op = $("div.tiles.clear.arcane")[0];
    	
    	if(counter == 0)
        {
        	$(op).hide();
            $(op).prev().hide();
            $(op).prev().prev().hide();
            
            return;
        }
    
        for(var i=0; i<temp.length; ++i)
            op.innerHTML += temp[i][0];
}

$(document).ready(function(){
   	var bd = document.body;
    if(bd.innerHTML.indexOf('<div id="inventory">') == -1)
        return;
    document.getElementsByTagName('head')[0].innerHTML += '<style> #inventory button { margin-right: 8px; }; </style>';
    var injector = '<span class="red-label">Arcane</span><button class="fs">hide</button><div class="tiles clear arcane"></div>\
    	<span class="red-label">Immortal</span><button class="fs">hide</button><div class="tiles clear immortal"></div>\
    	<span class="red-label">Ancient</span><button class="fs">hide</button><div class="tiles clear ancient"></div>\
    	<span class="red-label">Legendary</span><button class="fs">hide</button><div class="tiles clear legendary"></div>\
		<span class="red-label">Mythical</span><button class="fs">hide</button><div class="tiles clear mythical"></div><br><div>&nbsp</div>\
    	<span class="red-label">Rare</span><button class="fs">hide</button><div class="tiles clear rare"></div>\
    	<span class="red-label">Uncommon</span><button class="fs">hide</button><div class="tiles clear uncommons"></div>\
        <span class="red-label">Common</span><button class="fs">hide</button><div class="tiles clear commons"></div><div>&nbsp</div>';
    var pointer = bd.innerHTML.indexOf('<div id="inventory">') + '<div id="inventory">'.length;
    bd.innerHTML = bd.innerHTML.substr(0, pointer) + injector + bd.innerHTML.substr(pointer);
    
    $(".fs").click(function(){
   		if($(this).next().is(":visible"))
        {
        	$(this).next().hide();
            $(this).html("show");
        }
        else
        {
            $(this).next().show();
            $(this).html("hide");
        }
    });
    
    $(".fs").each(function(){
    	$(this).next().hide(); 
    });
    
    parser(8);
    parser(7);
    parser(6);
    parser(5);
    parser(4);
    parser(3);
    parser(2);
    parser(1);
})
