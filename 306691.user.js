// ==UserScript==
// @name       Conversion from inches to metric in Flutomat web tool (Flutomat is a javascript tool to compute position and diameter of holes of tin whistles)
// @namespace  http://
// @version    0.2
// @author         Pirlouwi
// @description  Convert all inches measures from Flutomat tool into metric measures
// @match      http://11wall-west.com/~ph_kosel/flutomat.html
// @updateURL      http://userscripts.org/scripts/show/306691
// @download       http://userscripts.org/scripts/show/306691
// @copyright  2014+, Pirlouwi
// ==/UserScript==

(function () {
    
    var loaded=false;
    
    function round(num){
    	return Math.round(num * 1000) / 1000;
    }
    
    function addHoleDistance(name1,name2){
        el1=document.getElementsByName(name1)[0]
        el2=document.getElementsByName(name2)[0]
        label = document.createElement("label")
        label.innerHTML = round(el2.value - el1.value);
        label.setAttribute("name", "l"+name2);
        el2.parentElement.appendChild(label);
    }
    
    function conv(name,dir){
    	el = document.getElementsByName(name);
        switch (dir)
        {
            case "i2cm":
                mult=2.54;
                break;
            case "i2mm":
                mult=25.4;
                break;
            case "mm2i":
                mult=0.0393700787;
                break;
            case "cm2i":
                mult=0.393700787;
                break;
            default: 
                mult=1;
                break;
        }
        
        el[0].value = round( el[0].value * mult);
    }
    
    function convertFromInchesToMetric(){
        
        if (!loaded) {
            loaded=true;
            
            form=document.getElementsByName("fluteForm")[0];
            
            input2=document.createElement("input");
            form.insertBefore(input2, form.firstChild);
            input2.type="button";
            input2.value="inch => metric";
            input2.onclick=function(){
                conv("bore", "i2mm"); conv("wall", "i2mm");conv("diam1", "i2mm");conv("diam2", "i2mm");conv("diam3", "i2mm");conv("diam4", "i2mm");conv("diam5", "i2mm");conv("diam6", "i2mm");conv("diamEmb", "i2mm");
                conv("result1", "i2cm");conv("result2", "i2cm");conv("result3", "i2cm");conv("result4", "i2cm");conv("result5", "i2cm");conv("result6", "i2cm");conv("resultEmb", "i2cm");
                addHoleDistance("result1","result2");addHoleDistance("result2","result3");addHoleDistance("result4","result5");addHoleDistance("result5","result6");
            }
            
            /*input1=document.createElement("input");
            form.insertBefore(input1, form.firstChild);
            input1.type="button";
            input1.value="mm=>\"";
            input1.onclick=function(){
                conv("bore", "m2i"); conv("wall", "m2i");conv("diam1", "m2i");conv("diam2", "m2i");conv("diam3", "m2i");conv("diam4", "m2i");conv("diam5", "m2i");conv("diam6", "m2i");conv("diamEmb", "m2i");
                conv("result1", "m2i");conv("result2", "m2i");conv("result3", "m2i");conv("result4", "m2i");conv("result5", "m2i");conv("result6", "m2i");conv("resultEmb", "m2i");
            }*/
        }
    }
        
    document.addEventListener('DOMNodeInserted', convertFromInchesToMetric);
    
})();