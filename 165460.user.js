// ==UserScript==
// @id             ImperialToMetric
// @name           ImperialToMetric (SI)
// @version        0.9
// @namespace      
// @author         Gijs van Oort
// @description    Adds metric equivalents (1.22m, 59 C, ...) of imperial mearurements (4 ft, 138 F, ...) on any website
// @include        *
// @exclude        *google.com*
// @run-at         document-end
// ==/UserScript==


/**************************************************************************
 * This script tries to find all (or, a lot) imperial measurements in a
 * html file (e.g. 5.3 inch, 59F, ...) and adds a small text to is
 * representing the values in SI units.
 **************************************************************************/


/* Regular expressions which match various forms of numbers (positive, negative
   and fractions which have a power of 2 in the denominator such as 5 3/8). 
   Scientific form is not recognized
*/ 
ReNormalNumber = /(-?(\d*\.)?\d+)/ // Number like -.4, 200, 200.93 etc.
ReFractionNumber = /((-?)(\d+\s+)?(\d+)\/(2|4|8|16|32|64|128)(nd|ths|th)?)/  //Number like 1/2, -3 3/4 or 1/8th
ReNumber = RegExp("(("+ReFractionNumber.source+")|("+ReNormalNumber.source+"))") // Matches both above


/******** Functions to interact with the HTML code ***************/
function replaceText(node, replacer)
{
  /* Function for replacing text only in normal text 
     (so not whithin tag attributes etc).
  */
  var n = node.childNodes;
  for (var i = 0; i < n.length; i++) {
    if (n[i].nodeType == 3) {
      n[i].nodeValue = replacer(n[i].nodeValue);
    } else {
      replaceText(n[i], replacer);
    }
  }
}

function IterateOverTextNodes(baseNode, fcn)
{
  /* Applies function fcn on each text node. (i.e., the node is give
     as the only argument to fcn)
  */
  var n = node.childNodes;
  for (var i = 0; i < n.length; i++) {
    if (n[i].nodeType == 3) {
      fcn(n[i].nodeValue);
    } else {
      IterateOverTextNodes(n[i], fcn);
    }
  }
}

/********* Other helper functions ***********************/

function makeNumberRegExp(ReUnit)
{
    /* Returns a regular expression consisting of a number and the 
       given unit regular expression.
    */
    return RegExp(ReNumber.source+"\\s*"+ReUnit.source,"g")
}


function getX(s)
{
    /* tries to parse the left part of string s as a number 
       (either normal or fractional, and returns the value.
    */
    var y = s.match(ReNumber)
    
    if (y[2]==undefined)
    {
        // Then we have a normal number, which is stored in y[0]
        return Number(y[0])
    } else
    {
        // Then we've got a fractional number
        numm = function(s) { if (s == undefined) return 0; else return Number(s); }
        var signMult = (y[4]=='-' ? -1 : 1)
        var whole = numm(y[5])
        var num =   numm(y[6])
        var den =   numm(y[7])
        return signMult * (whole + (num/den))
    }
}

function CreatePlaceholder(origString,newString,defaultVisible)
{
    /* This function stores the original and converted measurements into the
       global variable ValuesContainer and returns a placeholder string to be
       temporarily put into the html code. */
    l = ValuesContainer.push( {'orig':origString, 'conv':newString,'defaultVisible':defaultVisible} )
    return "XXXSTART"+(l-1)+"XXXSTOP"     // The element has index l-1 !
}

function FindMeasurementsAndReplaceByPlaceHolder(regex, outputStringFunction, conversionFactor, defaultVisible)
{
    /* Looks for any number-followed-by-given regex. Matches are sent to outputFunction 
       (e.g. formatLength). The value of the measurement in SI units is determined by 
       conversionFactor, which may be either a scalar c1 or an array  [c1, c0] such that
         
	   measurement_in_si = c1 * measurement_in_imperial [ + c0]
    
       The original string is replaced by an encoded version of the original string+ converted string;
       the placeholder will later be expanded to real html.
    */
    if (typeof(conversionFactor) == 'number') conversionFactor = [conversionFactor, 0]
    
    fullRegex = makeNumberRegExp(regex)
    
    MakeStringFcn = function(matchedString)
    {
        var valueInSI = getX(matchedString) * conversionFactor[0] + conversionFactor[1]
        z= CreatePlaceholder(matchedString, outputStringFunction(valueInSI),defaultVisible)
        return z
    }
    
    replaceFcn = function(s) { return s.replace(fullRegex, MakeStringFcn); }
    replaceText (document.body, replaceFcn)
}


function finalReplace (f,i,k)
{
    /* Replaces the placeholders by the final HTML code. You should update this
       function if you decide to alter the look of the generated code.
       
       This function is called once for each placeholder-to-be-replaced.
       
       The generated html code is quite advanced: it features an onclick
       attribute which shows/hides the conversion string (which is gray by itself). 
    */
       
    // i is the index of the value in ValuesContainer.
    orig = ValuesContainer[i]["orig"]
    conv = ValuesContainer[i]["conv"]
    origID = "I2M_orig"+i
    convID = "I2M_conv"+i
    visible= ValuesContainer[i]["defaultVisible"]?'':'none'
    
    js = 'obj=document.getElementById("'+convID+'");if(obj.style.display=="none"){obj.style.display="";}else{obj.style.display="none"};'
    origFormat = '<span id ="'+origID+'" onclick=\''+js+'\'>'+orig+'</span>'
    convFormat = '<span id ="'+convID+'" onclick=\''+js+'\' style="color:gray; display:'+visible+'"> ('+conv+')</span>'
    return origFormat + convFormat
}

/******************* FUNCTIONS FOR FORMATTING VARIOUS UNITS **************
 I made separate functions for this because each unit may need
 its own accuracy etc.
*************************************************************************/
     
function formatLength(x)
{
    // Returns a string representing a length in SI units (mm/cm/m/km) in parenteses.
    // x is the length in meters
    if      (x<0.01)  return (x*1000).toFixed(2)+ " mm"
    else if (x<0.2)   return (x*100).toFixed(2)+ " cm"
    else if (x<1)     return (x*100).toFixed(1)+ " cm"
    else if (x<1000)  return (x).toFixed(2)+ " m"
    else              return (x/1000)+ " km"
}

function formatTemperature(c)
{
    // Returns a string representing the temperature in degrees C
    return c.toFixed(1)+ " \u00B0C"
}

function formatVolume(v)
{
   if      (v<0.0001)  return (v*1000000).toFixed(2) + " cm\u00B3"
   else if (v<0.1)     return (v*1000).toFixed(2) + " dm\u00B3" 
   else if (v<10)      return v.toFixed(2)+ " m\u00B3"
   else                return v.toFixed(1)+ " m\u00B3"
}

function formatArea(a)
{
   if      (a<0.01)    return (a*10000).toFixed(2) + " cm\u00B2"
   else if (a<1)       return (a*100).toFixed(2) + " dm\u00B2" 
   else if (a<10)      return a.toFixed(2)+ " m\u00B2"
   else                return a.toFixed(1)+ " m\u00B2"
}

function formatLitres(l)
{
    // Returns a string representing the volume in l
    if      (l<10)   return l.toFixed(2)+ " l"
    else if (l<100)  return l.toFixed(1)+ " l"
    else             return l.toFixed(0)+ " l"
}

function formatMass(m)
{
    // m in kg
    if      (m<10)  return m.toFixed(2)+ " kg"
    else if (m<100) return m.toFixed(1)+ " kg"
    else            return m.toFixed(0)+ " kg"
}

function formatVelocitykmh(v)
{ 
  // Given v in m/s, this outputs the velocity in km/h (I know, this is not
  // an SI unit, but it is a very common one in Europe as well).
  return (v*3.6).toFixed(1)+" km/h"
}


/*********** THE MAIN 'LOOP' ******************
 - Replaces one type of meaurements at a time. Each measurement is replaced
   by a placeholder (e.g. XXXSTART13XXXSTOP for the 13th measurement). Doing this
   ensures that a complex value, such as 15 ft^2 is not parsed twice (once by the
   ft^2 and then by the ft line). The data needed for generating the final html text
   for each measurement is stored in a global variable ValuesContainer.
 - After all measurements have been replaced by placeholders, the placeholders are
   replaced again by the new html text.
***********************************************/

ValuesContainer=[]; // Global array in which all measurement texts are stored.
FindMeasurementsAndReplaceByPlaceHolder( /((([Ff]t|[Ff]eet|[Ff]oot)\^3))/, formatVolume, 0.02832, true)
FindMeasurementsAndReplaceByPlaceHolder( /((([Ff]t|[Ff]eet|[Ff]oot)\^2)|sq\s*ft|sf)/, formatArea, 0.092903, true)
FindMeasurementsAndReplaceByPlaceHolder( /((sq\s+[Ii]nch(es)?))/     , formatArea  , 0.00064516, true)
FindMeasurementsAndReplaceByPlaceHolder( /(([Ii]nch(es)?))/          , formatLength, 0.0254, true)
FindMeasurementsAndReplaceByPlaceHolder( /(")/                       , formatLength, 0.0254, false)
FindMeasurementsAndReplaceByPlaceHolder( /([Ff]t|[Ff]eet|[Ff]oot)/   , formatLength, 0.3048, true)
FindMeasurementsAndReplaceByPlaceHolder( /(')/                       , formatLength, 0.3048, false)
FindMeasurementsAndReplaceByPlaceHolder( /(F\b)/                     , formatTemperature, [(5/9),-(5/9)*32], true) /* Only valid for absolute temperatures, not for temperature differences! */
FindMeasurementsAndReplaceByPlaceHolder( /(gallons|gallon|gal)/      , formatLitres, 3.78541,true)
FindMeasurementsAndReplaceByPlaceHolder( /(lb[s])/                   , formatMass, 0.453592,true)
FindMeasurementsAndReplaceByPlaceHolder( /(mph)/                     , formatVelocitykmh, 0.44704,true)

/* Now the document if full of place holder strings. We're going to replace them by new HTML code now.*/
t = document.body.innerHTML
document.body.innerHTML=t.replace( /XXXSTART(.*?)XXXSTOP/g, finalReplace)
console.log(ValuesContainer)



