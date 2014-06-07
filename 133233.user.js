// ==UserScript==
// @name           Simple Ikariam Resource Links
// @description    Simple v0.5.0 Ikariam Resource Links
// @namespace      http://userscripts.org/users/465257
// @downloadURL    https://userscripts.org/scripts/source/133233.user.js
// @updateURL      https://userscripts.org/scripts/source/133233.meta.js
// @include        http://s*.ikariam.gameforge.com/*
// @exclude        http://board.*.ikariam.gameforge.com*
// @exclude        http://*.ikariam.*/board
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        0.0.2
// ==/UserScript==

function LinkResources(id, tGood) {
    var attrMap = {
        style: "cursor: pointer",
        onclick: "ajaxHandlerCall('?view=tradegood&type="+tGood+"&islandId="+id+"');return false;"
    };
    $("ul.resources > li.wood").attr({
        style: "cursor: pointer",
        onclick: "ajaxHandlerCall('?view=resource&type=1&islandId="+id+"');return false;"
    });
    $("ul.resources > li").each(function(i){
        if (i > 2){
            $(this).attr(attrMap)
        }
    });
}
// Get values from tooltips and place them above the good
function AddProd(tGood) {
    // add wood
    $("ul.resources > li.wood").append(newSpan( $("ul.resources > li.wood").children(".tooltip").children("p").eq(0).text().replace(',','').match(/[0-9],[0-9]+|[0-9]+/)[0]));
    // get produced tradegood
    var iGood = tGood+2;

    if(tGood != 1) // is tradegood wine?
    {
        // not wine, add span to tradegood and wine
        $('ul.resources >li').eq((iGood)).append(newSpan( $('ul.resources >li').eq((iGood)).children(".tooltip").children("p").eq(0).text().match(/[0-9],[0-9]+|[0-9]+/)[0]));
        $('ul.resources >li').eq((3)).append(newSpan( "-"+ Math.floor(unsafeWindow.ikariam.model.wineSpendings * ((100 - vineyard())/100)) , "red"));
    }
    else
    {
        // is wine, add span to wine (prod - consumption)
        $('ul.resources >li').eq((3)).append(newSpan( parseInt($('ul.resources >li').eq((3)).children(".tooltip").children("p").eq(0).text().replace(',','').match(/[0-9],[0-9]+|[0-9]+/)[0])-(Math.floor(unsafeWindow.ikariam.model.wineSpendings * ((100 - vineyard())/100)))));
    }

    // itterate through new spans setting color based on value. +ve green, -ve red, 0 leave gray.
    $('.resProd').each(function(){
        if (parseInt($(this).text())<0)
        {
            $(this).css("color","red");
        }
        else {
            if (parseInt($(this).text())>0)

            {
                $(this).css("color", "green");
                $(this).text("+"+$(this).text());
            }
        }
    }
    )

}

function vineyard(){
    var level = 0;
    if ($('.vineyard > a').length == 0)
    {
        if($('.constructionSite > a').length > 0)
        {
            if($('.constructionSite > a').attr("href").match(/vineyard/) != null)
                level = parseInt$('.constructionSite > a').attr("title").match(/[0-9]+/)[0]
        }

    }
    else level = ($('.vineyard > a').length != 1)? null: parseInt($('.vineyard > a').attr("title").match(/[0-9]+/)[0]) ;
    return level
    
}


function newSpan(text) {
    var span = $(document.createElement('span'));
    span.attr("class","resProd").text(text);
    return span;
}

GM_addStyle('span.resProd {position: absolute; font-size: 70%; right: 15px; bottom: 11px; color: grey}');


window.addEventListener("load", function(e) {
    var tGood = parseInt(unsafeWindow.ikariam.model.producedTradegood);
    LinkResources($("#js_islandBread").attr("href").match(/islandId=([^&]+)/)[1], tGood);
    AddProd(tGood)
}, false);