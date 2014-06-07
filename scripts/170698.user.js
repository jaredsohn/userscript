// ==UserScript==
// @name       Burbuja info display with addblock
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://www.burbuja.info/*
// @copyright  2012+, You
// ==/UserScript==

function remove_css_display_center() {
    function getCSSRule(ruleRegex) {               // Return requested style obejct
        if (document.styleSheets) {                            // If browser can play with stylesheets
            for (var i=0; i<document.styleSheets.length; i++) { // For each stylesheet
                var styleSheet=document.styleSheets[i];          // Get the current Stylesheet
                var ii=0;                                        // Initialize subCounter.
                var cssRule=false;                               // Initialize cssRule. 
                do {                                             // For each rule in stylesheet
                    if (styleSheet.cssRules) {                    // Browser uses cssRules?
                        cssRule = styleSheet.cssRules[ii];         // Yes --Mozilla Style
                    } else {                                      // Browser usses rules?
                        cssRule = styleSheet.rules[ii];            // Yes IE style. 
                    }                                             // End IE check.
                    if (cssRule && ruleRegex.exec(cssRule.selectorText)) //  match ruleName?                                                        
                        return [i, ii, cssRule];  
                    ii++;                                         // Increment sub-counter
                } while (cssRule);                               // end While loop
            }                                                   // end For loop
        }                                                      // end styleSheet ability check
        return false;                                          // we found NOTHING!
    }                                                         // end getCSSRule 
    
    function remove_align_center_from_selector_text(selector_text) {
        selector_text = selector_text.replace(/\[align="center"\],/, "");
        return selector_text;
    }
    
    
    var rule_info = getCSSRule(/\[align="center"\]\s*,/);
    if (rule_info) {
        var ss_index = rule_info[0];
        var r_index = rule_info[1];
        var rule = rule_info[2];
        
        var selector_text = remove_align_center_from_selector_text(rule.selectorText);
        var style_text = rule.style.cssText;
        var new_rule_text = selector_text + " { " + style_text + " } ";
        
        document.styleSheets[ss_index].deleteRule(r_index);
        document.styleSheets[ss_index].insertRule(new_rule_text, r_index);
    }
    
    
}

window.addEventListener('load', remove_css_display_center, false);