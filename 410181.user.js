// ==UserScript==
// @name        a
// @namespace   smk
// @include     http://www.gw2crafts.net/*_400.html
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    // make main button, position upper left
    var qp = $('<input/>');
    qp.attr({'type':'button', 'value':'Get 450-500 Only'});
    qp.addClass('.btn450-500');
    qp.css({'position':'fixed','top':'10px','left':'10px','z-index':'5000'});
   

    qp.click(function() {
        // get all h3 elements (contains "Level:" text)
       var o = $('h3');
       
       // create object for storing incredients and their count to determine total needed
        var totz={};
        
        // create empty string to store html
        var suchwow = '';
        
        // iterate over each h3 tag
        o.each(function() {
        
            // get the level 
            var nnt = parseInt($(this).html().replace('Level:','').trim());
            
            // continue if te level is >= 450 and < 500, cuz nothing is in lvl 500.
            if(nnt >= 450 && nnt < 500) {
            
            // get all div tags up until a <br> tag
             var d = $(this).nextUntil('br', $('div'));
             
                //append current lvl
                suchwow += "LEVEL " + nnt+"<br/><hr/>";
                
                // iterate through obtained div tags
                d.each(function() {
                
                    // item to discover name
                   var wht = $(this).find('button').first().text();
                   suchwow += "item: <strong>" + wht + "</strong><br />";
                   suchwow += "ingredients: <br/>";
                   
                   // array to store ingredient names/counts
                   var ing = [];
                   
                   // strip div of html tags so we can isolate INGREDIENT (AMOUNT) more efficiently
                   var g = $(this).find('div').html().replace(/(<([^>]+)>)/ig,"");
                   
                   // split by new line which results in an array of ingredients
                    var ingz = g.trim().split('\n');
                    
                    // trim each array item(ingredient)
                    ingz = $.map(ingz,function(k,v) { return  k.trim(); });
                    
                    /*
                    * iterate thru ingredient strings, parse the amount in parenthesis,
                    * remove from end of ingredient to get 2 separate pieces
                    */
                    $.each(ingz, function(k,v) {
                        var amtreg =/\((\d+)\)/;
                        var amt = v.match(amtreg);
                        var tr = new RegExp(amtreg);
                        var zz = v.replace(tr,'').trim();
                        
                        suchwow += zz +"("+amt[1]+"), ";
                        
                        // add to ingredient list
                        ing.push({
                            'ingr':zz,
                            'amt': amt.pop()
                        });
                    });
                    
                    // trim empty space and stupid comma
                suchwow = suchwow.substr(0,suchwow.length-2);
                    suchwow += "<br/><br/>";
                    
                    // sum ingredients to determine total shopping list
                    for(i=0;i<ing.length;i++) {
                        var k = ing[i].ingr;
                        totz[k] = (totz[k]) ? totz[k]+(ing[i].amt*1) : 1;
                    }          
                    
                });
                
            }
        });
        
        // create final element and replace body html with script html. u wot m8?
       var dafuq = $('<div/>');
        dafuq.css({
            'width': '900px',
            'height': '600px',
            'background':'#fff',
            'color':'#000',
            'z-index':'10000'
        });
        
        var ingrlist = "<div style='float:left;width:400px;'>total ingredients needed:<br/>";
        for(var x in totz) {
            ingrlist+=x+":"+totz[x]+"<br/>";   
        }
        ingrlist+="<input type='button' onclick='location.reload();' value='close'/></div>";
        
        var detailed = "<div style='width:400px;height:inherit;float:left;overflow-y:auto;'>make this stuff<br/>";
        detailed += suchwow;
        detailed +="</div>";
        dafuq.html(ingrlist + detailed);
        $('body').html(dafuq);
    });
    
    
    
    $('body').append(qp);
    

    
    
})();