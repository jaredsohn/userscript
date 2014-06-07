// ==UserScript==
// @name       V1 - Fixed Header Columns
// @namespace  jrioux
// @version    1.0
// @description  Make the header columns fixed
// @match      https://www11.v1host.com/*/TeamRoom.mvc/Show/*
// @copyright  2013+, Jordan Rioux-Leclair
// ==/UserScript==

$(document).ready(function() {
    
    // Temporary fix for AJAX call to complete...
    setTimeout(function() {
        
        // Keep a cache of the existing element so we can retrieve them later
        var taskboard = $("table.taskboard");
        var oldHeaderRowCells = $("tr.header td");
        var title = $(".caption h3 span.title");
        
        // Create new element needed for the new positioned cells
        var newTable;
        var wrapper;
            
        var taskboardCssProperties = {
            width: taskboard.width(),
            left: taskboard.offset().left,
            position: "absolute",
            top: (title.offset().top + title.height() + 4),
            opacity: 0.7
        };
        
        // Temporary fix    
        function checkForWidthChange() {
            if (taskboard.width() !== wrapper.width()) {
                init();
            }
        
            setTimeout(checkForWidthChange, 500);
        }
        setTimeout(checkForWidthChange, 500);
        
        wrapper = $('<div id="my-wrapper"></div>')
                  .addClass("board")
                  .css(taskboardCssProperties);
    
        if (isScrolledIntoView(oldHeaderRowCells)) {
            wrapper.hide();
        } else {
            wrapper.show();
        }
                
        function clean() {
            $("#my-wrapper").remove();
            $(".features-button").remove();
        }
        
        function cache() {
            taskboard = $("table.taskboard");
            oldHeaderRowCells = $("tr.header td");
            title = $(".caption h3 span.title");
        
            wrapper = $('<div id="my-wrapper"></div>')
                      .addClass("board")
                      .css(taskboardCssProperties);
                       
            if (isScrolledIntoView(oldHeaderRowCells)) {
                wrapper.hide();
            } else {
                wrapper.show();
            }
        
            taskboardCssProperties = {
                width: taskboard.width(),
                left: taskboard.offset().left,
                position: "absolute",
                top: (title.offset().top + title.height() + 4),
                zIndex: 4,
                opacity: 0.7
            };   
        }
        
        function createFixedHeaderColumns() {
            newTable = $('<table style="border-spacing: 0;" id="fixed-table-uniq" cellpadding="0" cellspacing="0"></table>')
                       .addClass("taskboard");
                             
            var i = 0;
            var cellCount = oldHeaderRowCells.length;
            
            $("tr.header").clone().appendTo(newTable).find("td").each(function(index) {
                var td = $(this);
                var oldTd = oldHeaderRowCells.get(index);
            
                var cssProperties = {};
                cssProperties.width = $(oldTd).width();
                
                if (i < cellCount - 1) {
                    cssProperties.paddingRight = "2px";
                }
                
                td.css(cssProperties);
                ++i;
            });
            
            addScrollEvent();
            
            wrapper.append(newTable);
        }
        
        function addScrollEvent() {
            $("div.window").scroll(function() {
                if (isScrolledIntoView(oldHeaderRowCells)) {
                    wrapper.fadeOut();
                } else {
                    wrapper.fadeIn();
                }
            });
        }
        
        function addStylesheet() {
            var STYLE_SHEET = '<style type="text/css">'
                            + '.board #fixed-table-uniq .header>* { padding-bottom: 0; padding-top: 0; }'
                            + '</style>';
        
            wrapper.append(STYLE_SHEET);
        }
        
        function isScrolledIntoView(elem) {
            var elemTop = $(elem).offset().top;
                    
            return (elemTop >= 180);
        }
        
        function appendNewElements() {        
            $("body").append(wrapper);
        }
        
        function init() {
            // Clean up the elements before executing again
            clean();
            
            // Cache all existing elements
            cache();
            
            // Append specific stylesheet used for the new features
            addStylesheet();
            
            // Add the new features to Version One
            createFixedHeaderColumns();
            
            // Append the elements needed for the new features to the page
            appendNewElements();    
        }
        
        init();
    }, 3500);

});