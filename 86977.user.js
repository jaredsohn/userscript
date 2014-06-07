// ==UserScript==
// @name           Voltage Select
// @namespace      voltageselect
// @description    parses out voltages
// @include        http://search.digikey.com/scripts/DkSearch/dksus.dll?Cat=*
// ==/UserScript==


//function isDrillDown(){
// check if page is drill down
//}
//alert('hello');

//function keepTrackofAllDrilldown parameters to create link for getting those search results.

 // String.prototype.trim = function() {
        // return this.replace(/^\sg,"");
    // }
var mystring = '    44hello, thi33s is my world$';
//var stringy = formatnum(mystring);
//alert(stringy);
window.addEventListener('load', main(), true);
//alert(mystring.trim());
function main(){
    var boxOfInterest = document.getElementsByName('PV659');
    //alert(boxOfInterest[0].innerHTML);
    //var allForms = document.forms[];
    //alert(allForms[1].innerHTML);
    voltageOptions = boxOfInterest[0].options;
//    alert(mystring.trim());
    //alert(voltageOptions[0].value);
    var splitpm = voltageOptions[0].innerHTML.replace('±',''); //
    alert(parseFloat(splitVoltages(splitpm)));
    //alert(splitVoltages(voltageOptions[71].innerHTML));
    //alert(parseFloat(splitVoltages(voltageOptions[71].innerHTML)));
    //voltageOptions[0].dual = 1;
    //alert(voltageOptions[0].dual);
    //alert('end');
    //---- initialize attributes array
   
    alert('one');
    var Vatt= new Array(voltageOptions.length);
    for (var i=0;i<100;i++){
    //    for (var i=0;i<Vatt.length;i++){
        Vatt[i] = new voltageAttributes();
        if(voltageOptions[i].innerHTML.indexOf('±')>=0){
            Vatt[i].dualrail = true;
            if(voltageOptions[i].innerHTML.indexOf(',')>=0){
                var splitdual = voltageOptions[i].innerHTML.split(',');
                //alert(splitVoltages(splitdual[0]));
                //alert(splitdual[0]+' andstuff '+splitdual[1]);
                //alert(parseFloat(splitVoltages(splitdual[1])));
                //alert('test');
            }
        }
       
    //alert(voltageOptions[73].innerHTML.indexOf('±')+ '    ' + voltageOptions[73].innerHTML);
    }
    //------
    //Vatt.dualrail[0] = true;
    //voltageOptions[0].voltageAttributes.dualrail = true;
    alert('end');
    }

 function splitVoltages(singlerange){
     var splitv = singlerange.split('~');
     //var retary = {parseFloat(splitv[1]), parseFloat(splitv[0])};
     //return retary;    //high, then low
     return splitv[0];
 }

function parseOpAmps(arelem){
    alert('two');
    var splitarray = arelem;
    if(arelem.innerHTML.indexOf('±')>=0){
        Vat
    }
    Vatt[0].vmin = 4;
    alert(Vatt.vmin);
}

function voltageAttributes(){
    this.dualrail = null;
    this.vmin = null;
    this.vmax = null;
    this.vneg = null;
    this.vpos = null;
}





//voltageOptions[0].selected = true;
//voltageOptions.length