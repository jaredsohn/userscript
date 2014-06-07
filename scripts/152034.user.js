// ==UserScript==
// @name        CellSum
// @namespace   http://stiernstedt.net/CellSum
// @description Sums all values in ctrl+clicked cells.
// @include     http*/*
// @version     0.6
// @copyright   2012+, Rikard Javelind, Henrik Stiernstedt
// @grant       none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    // Resultatboxen:
    
    jQuery('<div id="sasum"></div>')
        .appendTo(jQuery('body'))
        .click(function(e) {
            if (e.ctrlKey) {
                 jQuery('.selectedBox').removeClass('selectedBox');
                calc();
            }
        });
    
    $('#sasum')
        .append(jQuery('<div class="types"></div>'))
        .append(jQuery('<div class="values"></div>'));
    
    jQuery('body').after(
        '<style>.selectedBox { background: lightblue !important; }\n' +
        '#sasum { font-size:13px;font-weight:bold;padding:3px;font-family:arial;display:none;position:fixed;bottom:0;right:0;width:80px;background:lightblue;border:1px solid #e0e0e0;}\n' + 
        '#sasum .types { display:block; float:left; clear:left; margin-right: 5px; }\n' +
        '#sasum .values { display:block; float:left; }\n' + 
        '#sasum .types div { float:right; clear:right; }\n' +
        '#sasum .values div { float:right; clear:right;}\n' + 
        '</style>');
    
    jQuery('td').click(function (e) {
        
        if (e.ctrlKey) {
           
            var b = true;
            if (jQuery(this).hasClass('selectedBox'))
            {
                jQuery(this).removeClass('selectedBox');
                b = false;
            }
            else
            {
                if(!isNaN(parseFloat(jQuery(this).text())))
                {
                    jQuery(this).addClass('selectedBox');
                    b = false;
                }
            }

            calc();
			
			// Only return true if it's not a number in the cell.
			// Otherwise it might have been an atempt to open link in antoehr tab.
            return b; 
        }
    });

    var calc = function () {
        
        var sum = 0.0;
        var avg = 0.0;
        var i = 0;
       
        jQuery('.selectedBox').each(function (e) {
            var value = jQuery(this).text().replace(',', '.');
           
            if (!isNaN(value))
            {
                sum += parseFloat(value);
                i++;
            }
        });

        if(i>0)
        {
            jQuery('#sasum div').html('');
            
            // TODO: Min vision här är att klickar man på "sum" så expanderar rutan och visar samtliga rader, t.ex. "Average". 
            // Eller så visar jag bara allt, jämt.
            addValuePair('Avg', (Math.round(100 * (sum/i)) /100));
            addValuePair('Sum', (Math.round(100 * sum) /100));
            addValuePair('Num', i);
            jQuery('#sasum').show(500);
           
        }
        else
        {
            jQuery('#sasum').hide(500);
            jQuery('#sasum div').html('');
        }
    }
  
    var formatValuePair = function(type, value) {
        return '<span class="type">' + type + ':</span><span class="value">' + value + '</span>';   
    }
    
    // A more fancy way of displaying the values, but utterly un-user friendly when it comes to copy paste.
    var addValuePair = function(type, value) {
        jQuery('#sasum div.types').append($('<div>' + type + ':</div>'));
        jQuery('#sasum div.values').append($('<div class="value">' + value + '</div>'));
    } 
}

addJQuery(main);
