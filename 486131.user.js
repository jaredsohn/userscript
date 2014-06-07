// ==UserScript==
// @name       Trello multirow
// @namespace  http://www.kosztolanyigergely.hu/
// @version    0.4
// @description  Multi-row view for Trello.
// @match      https://trello.com/b/*
// @copyright  2014+, Gergely Kosztolányi
// ==/UserScript==

function resizeAfterOtherScripts() {
    var i = setInterval(function ()
    {
        if ($('#content').length)
        {
            clearInterval(i);
			toMultiRow();
        }
    }, 100);
}

function toMultiRow() {
    jQuery(".list-area").removeAttr("style");
    //jQuery(".board-canvas").removeAttr("style");
    var rowHeight = 0;
    var rowY = -999;
    var firstInRow = 0;
    jQuery(".list").each(function(index) {
        console.log("Index: "+index.toString()+", element: "+jQuery(this).find(".list-header").text());
        console.log("Element position: " + $(this).position().top.toString());
        console.log("Element height: "+$(this).height().toString());
        if($(this).position().top == rowY) {
            //It's still in the examined row
            if($(this).height() > rowHeight) rowHeight = $(this).height();
        }
        else {
            //Calculate the required paddings
            console.log("Row height: "+rowHeight.toString());
            if(firstInRow != 0) {
                newPaddingBottom = rowHeight - firstInRow.height()+10;
                if(newPaddingBottom > 0) firstInRow.css("margin-bottom", newPaddingBottom.toString() + "px");
                firstInRow.nextUntil($(this), ".list").each( function(jindex, rowElement) {
                    newPaddingBottom = rowHeight - $(rowElement).height()+10;
                	if(newPaddingBottom > 0) $(rowElement).css("margin-bottom", newPaddingBottom.toString() + "px");
                });
            }
            
            firstInRow = $(this);
            rowY = firstInRow.position().top;
            rowHeight = firstInRow.height();
            console.log("Row Y = "+rowY.toString());
        }
        if(firstInRow != 0) {
            newPaddingBottom = rowHeight - firstInRow.height()+10;
            if(newPaddingBottom > 0) firstInRow.css("margin-bottom", newPaddingBottom.toString() + "px");
            firstInRow.nextUntil($(this), ".list").each(function(jindex, rowElement) {
                newPaddingBottom = rowHeight - $(rowElement).height()+10;
        	    if(newPaddingBottom > 0) $(rowElement).css("margin-bottom", newPaddingBottom.toString() + "px");
           	});
            contentHeight = rowY + rowHeight + newPaddingBottom;
            if(contentHeight < jQuery(window).height()) contentHeight = $(window).height();
            jQuery(".board-canvas").css("height", contentHeight.toString() + "px");
            jQuery(".body-board-view").css("overflow", "visible");
        }
    });
}

$(window).load(function ()
{
    resizeAfterOtherScripts();
    var html = $('#content').html();
    setInterval(
        function(){
            if($('#content').html() != html){
                toMultiRow();
                html = $('#content').html();
            }
        }, 500);
});

$(window).resize(function () {
    toMultiRow();
});

