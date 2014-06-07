// ==UserScript==
// @name           MyFitnessPal Conversions
// @version 1.2
// @namespace      janitor61
// @description    Adds a conversion chart to measure dropdowns on MyFitnessPal. Click or select a unit of measure and the popup dialog will appear.
// @include        http://www.myfitnesspal.com/food/*
// ==/UserScript==


/*  
 *  ------------------------------------------------------------
 *  Based off of http://userscripts.org/scripts/show/124645
 *  Thanks for a great tool, surye!
 *  ------------------------------------------------------------
 */

if (window.top !== window.self) {
	return; /* do not run in frames */
}

if (typeof unsafeWindow != 'undefined')
{
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = my_src;
    document.body.appendChild(script);
  })();

  return;
}

function startRun() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://www.google.com/jsapi");
  script.addEventListener('load', function() {
      loadscripts_1();
  }, false);
  document.body.appendChild(script);
}

function main()
{

var box = "<div id='conversion_box' style='display: none; text-align: left; padding: 3px; background-color: #E9F8FE; border: 1px solid #CAE6F2; min-width: 200px; position: absolute; z-index: 999;'>";
box = box + "<div id='close_conversion_box' style='cursor: pointer; width: 30px; color: #F7941E; position: absolute; right: 0'>X</div>";
box = box + "<div id='conversion_box_inner' style='font-size: 11px; padding-bottom: 10px;'></div></div>";

$("body").append(box);
$("#close_conversion_box").click(function(){
    $("#conversion_box").hide();
});
        
        var fractional_tolerance1 = 0.01;
        var fractional_tolerance2 = 0.1;
        
        var liquidmeasures = {
            "teaspoon":.004927469540511968, 
            "tablespoon":.014782408621535903, 
            "cup":.23651853794457445, 
            "pint":.4730370758891489, 
            "quart":.9460741517782978, 
            "liter":1, 
            "gallon":3.784296607113191,
            "fluidounce":.029564817243071806, 
            "ml":.001
        }

        var drymeasures = {
            "oz":28.34952308, 
            "lb":453.5922921, 
            "g":1, 
            "kg":1000
        }

        var fractionals = {
            "1/8" : 1/8,
            "1/4" : 1/4,
            "3/8" : 3/8,
            "1/2" : 1/2,
            "5/8" : 5/8,
            "3/4" : 3/4,
            "7/8" : 7/8
        }

        var metrics = {
            "teaspoon":"teaspoon",
            "tsp":"teaspoon",
            "teaspoons":"teaspoon",
            "tsps":"teaspoon",
            "t":"teaspoon",
            "tablespoon":"tablespoon",
            "tablespoons":"tablespoon",
            "tbsp":"tablespoon",
            "c":"cup",
            "cup":"cup",
            "cups":"cup",
            "pint":"pint",
            "pints":"pint",
            "pt":"pint",
            "q":"quart",
            "quart":"quart",
            "quarts":"quart",
            "liter":"liter",
            "l":"liter",
            "liters":"liter",
            "gallon":"gallon",
            "gallons":"gallon",
            "fl":"fluidounce",
            "ml":"ml",
            "fluid":"fluidounce",
            "milliliters":"ml",
            "milliliter":"ml",
            
             // Dry / Weight
            "ounce":"oz",
            "ounces":"oz",
            "oz":"oz",
            "ozs":"oz",
            "lb":"lb",
            "lbs":"lb",
            "pound":"lb",
            "pounds":"lb",
            "gram":"g",
            "grams":"g",
            "g":"g",
            "kilogram":"kg",
            "kilograms":"kg"
        };

        function tryParsingBetter(str) {
            for (var unit in metrics) {
                
                
if (str.search(new RegExp("^.*?([0-9]*\\s?[0-9]+\\s?\\/\\s?[0-9]+|[0-9\\.]+)\\s?"+unit+"([^a-zA-Z].*)?$","im")) != -1) {                    

do {
    var quan;
    //remove any parenthesis and try matching on the simple string first
    if (str.indexOf("(") != -1) {
        var temp1 = str.split("(");
        quan = temp1[0].replace(new RegExp("^.*?(\\d+\\s?\\/\\s?\\d+|[0-9\\.]+)\\s?"+unit+"([^a-zA-Z].*)?$","im"),"$1");
        if (quan != temp1[0]) break;
    }
    
    //try to match something like "1 something (1 1/2 cups)" first
    quan = str.replace(new RegExp("^.+\\D+?(\\d+\\s\\d+\\/\\d+)\\s?"+unit+"([^a-zA-Z].*)?$","im"),"$1");
    if (quan != str) break;
    
    //try "1 something (1/2 cups) next"
    quan = str.replace(new RegExp("^.+\\D+?(\\d+\\/\\d+)\\s?"+unit+"([^a-zA-Z].*)?$","im"),"$1");
    if (quan != str) break;

    quan = str.replace(new RegExp("^.*?(\\d+\\s?\\/\\s?\\d+|[0-9\\.]+)\\s?"+unit+"([^a-zA-Z].*)?$","i"),"$1");
    
} while(false);

                    var quantokens = quan.split(" ");
                    var quanvalue = 0;
                    for (var i=0; i < quantokens.length; i++) {
                        if (quantokens[i].indexOf("/") != -1) {
                            var temp = quantokens[i].split("/");
                            if (!isNaN(parseInt(temp[0])) && !isNaN(parseInt(temp[1]))) {
                                quanvalue += parseInt(temp[0]) / parseInt(temp[1]);   
                            }   
                        } else {
                            quanvalue = parseFloat(quantokens[i]);
                        }
                    }
                    return [metrics[unit], quanvalue];
                }
            }
            return [];
        }



        $("#main").delegate(".select","select click",function(e){
            var size = $("option:selected",this).text(); //text of the selected .SELECT (e.g. 1 oz)
            var $input = $(this).prevAll("input");
            var multiplier = $input.val();
            if (isNaN(parseFloat(multiplier))) {   
                hidePopup();
                return;
            }
            
            var attempt = tryParsingBetter(size);
            if (attempt.length == 0) {
                hidePopup();
                return;
            }
            showPopup(attempt[0], attempt[1], multiplier);
        });

        function hidePopup() {
            $("#conversion_box").hide();
        }
        
        function getEnglish(quan, basemetric, nofrac) {
            
            var pTitle;
            var plural = (quan <= 1.00) ? false : true;
            
            //see if a fraction is close
            var fractionalHint = "";
            var fractionalpart = quan % 1;
            var wholepart = Math.round(quan - fractionalpart);
            for (var j in fractionals) {
                if (Math.abs(fractionals[j] - fractionalpart) < fractional_tolerance1) {
                    if (wholepart > 0) {
                        fractionalHint = " ("+ wholepart +" "+ j + ")";
                    } else {
                        fractionalHint = " ("+ j + ")";
                    }
                } else if (Math.abs(fractionals[j] - fractionalpart) < fractional_tolerance2) {
                    if (wholepart > 0) {
                        fractionalHint = " (~"+ wholepart + " "+ j + ")";
                    } else {
                        fractionalHint = " (~"+ j + ")";
                    }
                }
            }
            
            if (!nofrac) {
                fractionalHint = "";
            }
            
            switch(basemetric) {
                case "teaspoon":
                    pTitle = (plural) ? "Teaspoons" : "Teaspoon";
                break;
                case "tablespoon":
                    pTitle = (plural) ? "Tablespoons" : "Tablespoon";
                break;
                case "cup":
                    pTitle = (plural) ? "Cups" : "Cup";
                break;
                case "pint":
                    pTitle = (plural) ? "Pints" : "Pint";
                break;
                case "quart":
                    pTitle = (plural) ? "Quarts" : "Quart";
                break;
                case "liter":
                    pTitle = (plural) ? "Liters" : "Liter";
                break;
                case "gallon":
                    pTitle = (plural) ? "Gallons" : "Gallon";
                break;
                case "fluidounce":
                    pTitle = (plural) ? "Fluid Ounces" : "Fluid Ounce";
                break;
                case "ml":
                    pTitle = (plural) ? "mL" : "mL";
                    fractionalHint = "";
                break;
                case "oz":
                    pTitle = (plural) ? "Ounces" : "Ounce";
                break;
                case "lb":
                    pTitle = (plural) ? "Pounds" : "Pound";
                break;
                case "g":
                    pTitle = (plural) ? "Grams" : "Gram";
                    fractionalHint = "";
                break;
                case "kg":
                    pTitle = (plural) ? "Kilograms" : "Kilogram";
                break;
            }
            return (Math.round(quan * 100) / 100).toString() + fractionalHint + " "  + pTitle;
        }
        
        function makeConversionLiquid(basemetricFrom, basemetricTo, quan) {
            
            
            var ratio = liquidmeasures[basemetricFrom] / liquidmeasures[basemetricTo];
            
            //see if it is statistically relevant
            if ((quan * ratio) < 0.1 || (quan * ratio) > 1000) {
                return "";
            }
            return getEnglish(quan * ratio, basemetricTo, true) + "<br>";
        }
        function makeConversionDry(basemetricFrom, basemetricTo, quan) {
            
            
            var ratio = drymeasures[basemetricFrom] / drymeasures[basemetricTo];
            
            //see if it is statistically relevant
            if ((quan * ratio) < 0.01 || (quan * ratio) > 1000) {
                return "";
            }
            return getEnglish(quan * ratio, basemetricTo, true) + "<br>";
        }
        
        function showPopup(basemetric, basequan, multiplier) {
            var quan = (basequan * multiplier).toPrecision(2);
            var pTitle = "<b style='font-weight: bold; font-size: 13px;'>"+getEnglish(quan, basemetric, false)+"</b>";
            if (multiplier != 1) {
                pTitle += " (" + basequan + " x " + multiplier + ")";
            }
            var conversions = pTitle + "<div style='height: 2px; border-bottom: 1px solid black;'></div>";
            
            switch(basemetric) {
                case "teaspoon":
                case "tablespoon":
                case "cup":
                case "pint":
                case "quart":
                case "liter":
                case "gallon":
                case "fluidounce":
                case "ml":
                    conversions = conversions + "<i style='font-style: italic;'>Liquid Measure</i><br>";
                    for (var i in liquidmeasures) {
                        if (i == basemetric) continue;
                        conversions = conversions + makeConversionLiquid(basemetric, i, quan);
                    }
                break;
                case "oz":
                case "lb":
                case "g":
                case "kg":
                    conversions = conversions + "<i style='font-style: italic;'>By Weight</i><br>";
                    for (var j in drymeasures) {
                        if (j == basemetric) continue;
                        conversions = conversions + makeConversionDry(basemetric, j, quan);
                    }                    
                break;
            }
            
            $("#conversion_box_inner").html(conversions);
            var top = $("body").scrollTop() + 3;
            if (top < 108) top = 108; //dont go above the MFP header
            
            $("#conversion_box").show().css({top:(top).toString() + "px",right:3})
        }
}

function loadscripts_1()
{
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	script.addEventListener('load', function() {
                jQuery.noConflict();
                main();
	}, false);
	document.body.appendChild(script);
}

startRun();