// ==UserScript==
// @name           Eurofootball.bg coefficients monitor agent
// @namespace      http://userscripts.org/scripts/show/128725
// @description    Daily Coefficients monitor agent - shows only potential targets
// @author         Shteryo Dzhimov & Vladimir Jossifov
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*.eurofootball.*
// @include        http://*/*.eurofootball.*
// @exclude     *.css
// @exclude     *.js

// @version        0.1
// ==/UserScript==

function extract(doc, tag, attribute, value)
{
    var i,divs = doc.getElementsByTagName(tag);
    //window.alert(divs.length);
    for (i in divs)
    {
        if(divs[i].hasAttribute(attribute))
        {
			//??????????????????
            value==divs[i].getAttribute(coef_end_time))  // or checkBoxesCoefArr[0] because checkBoxesCoefArr[0] = 'coef_end_time'; ????
			
			if(1.7 =< value =< 2.1)
			
            {
                return divs[i];
            }
        }
    }
    return "";
}

function blinkName() {
    var div = extract(document, "span", "class", "wrap");
    div.style.textDecoration = 'blink';
    div.style.color = 'red';
    
    // div = extract(document, "img", "id", "heroImage");
    // div.style.visibility = 'hidden';
    // div.style.color = 'red';
}

function retrieveCoefficients() {
    var coefficients = [];
    var container = extract(document, "div", "class", "list");
    //window.alert (container.innerHTML);
}


function checkCoefficients() {
    var html_coefficients = retrieveCoefficients();
}


try
{
    var main = window.location.href;
    var main_div = extract(document, "div", "class", "data");
    
    
    
    checkCoefficients();

}
catch (err)
{
window.alert(err);
}