// ==UserScript==
// @name       Google docs spreadsheet ctrl + click sum
// @namespace  http://www.catchmecode.com/
// @version    0.1
// @description Finally! Ctrl + click shows sum on non adjacent cells. For more info see: http://www.catchmecode.com/blog/2013/04/30/ctrl-click-sum-gdocs-spreadsheet/
// @match      https://docs.google.com/*spreadsheet/ccc*
// @copyright  2013, Jonas L
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function total($) {
    var sum = 0;
    var selectedElements = [];

    var displayDivParent = $(".docs-sheet-status-container");
    var displayDivParentOriginalChildren = displayDivParent.children();
    
    var displayDiv = $("<div style='display:none'></div>");
    
    function restoreStyleProps(selectedElement) {
        selectedElement.element.css("background-color", selectedElement.clickedBgColor);
    }

    function sumClicks(e) {
        var clickedElement = $(e.target);
        
        var sumText = clickedElement.html();
        var newNumber = parseFloat(sumText, 10);
        
        if($.isNumeric(newNumber)) {
            
            var selectedNotFound = true;
                        
            $.each(selectedElements, function(index, selectedElement) {
                
                if(selectedNotFound && clickedElement.is(selectedElement.element)) {
                    restoreStyleProps(selectedElement);
                    selectedElements.splice(index,1);
                    selectedNotFound = false;
                    
                    sum -= newNumber;
                }
            });

            
            if(selectedNotFound) {
                var clickedBgColor = clickedElement.css("background-color");
                
                var parts = clickedBgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                
                var newBgRed = parts[1]*0.9 + 82*0.1; 
                var newBgBlue = parts[2]*0.9 + 146*0.1;
                var newBgGreen = parts[3]*0.9 + 247*0.1;
                
                var newBgColor = "rgb(" + newBgRed.toFixed() + "," + newBgBlue.toFixed() + "," + newBgGreen.toFixed() + ")";
                
                clickedElement.css("background-color", newBgColor);
                
                selectedElements.push( { element: clickedElement, clickedBgColor: clickedBgColor } );
                
                sum += newNumber;
            }
            
            displayDiv.text("Sum: " + sum);
        }
    }
    
    function clearDisplay() {
        $.each(selectedElements, function(index, selectedElement) {
            restoreStyleProps(selectedElement);
        });
        
        sum = 0;
        selectedElements = [];
    }
    
    displayDivParent.prepend(displayDiv);
    
    $(window).keydown(function(event){
        if(event.keyCode == 17) {
            
            clearDisplay();
            
            $(window).bind('click', sumClicks);
            
            displayDivParentOriginalChildren.hide();
            displayDiv.text("Sum: 0");
            displayDiv.show();
        }
    });
    
    $(window).keyup(function(event){
        if(event.keyCode == 17) {
            $(window).unbind('click', sumClicks);
            
            clearDisplay();
			
            displayDivParentOriginalChildren.show();
			displayDiv.text("");
            displayDiv.hide();
        }
    });
})($ || jQuery);