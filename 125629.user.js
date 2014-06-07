// ==UserScript==
// @match http://www.hackthissite.org/missions/prog/12/
// @name HTS Prog 12 decoder
// ==/UserScript==
var theInput,theText,theLetters,theNewLetters,theNumbers,thePrimes,theComposites,primeTotal,compositeTotal,concatNumber;
var compositeNumbers = "4689";
var primeNumbers = "2357";

theInput = document.getElementsByTagName("input")[0];
theText = theInput.value;
theLetters = theNewLetters = theNumbers = thePrimes = theComposites = "";

primeTotal = compositeTotal = 0;
for (var i = 0; i < theText.length; i++)
{
    if (theText[i] != "0" && theText[i] != "1")
    {
        if ( compositeNumbers.indexOf(theText[i]) > -1 || primeNumbers.indexOf(theText[i]) > -1 )
        {
            theNumbers += theText[i];
            if(compositeNumbers.indexOf(theText[i]) > -1)
            {
                theComposites += theText[i];
            }
            else
            {
                thePrimes += theText[i];
            }
        }
        else
        {
            if (theLetters.length < 25)
            {
                theLetters += theText[i];
            }
        }
    }
}
for (var i = 0; i < theComposites.length; i++)
{
    var aNumber = parseInt(theComposites[i]);
    compositeTotal += aNumber;
}
for (var i = 0; i < thePrimes.length; i++)
{
    var aNumber = parseInt(thePrimes[i]);
    primeTotal += aNumber;
}
concatNumber = compositeTotal * primeTotal;
for (var i = 0; i < theLetters.length; i++)
{
    var asciiCode = theLetters.charCodeAt(i);
    theNewLetters += String.fromCharCode(asciiCode + 1);
}
document.getElementsByName('solution')[0].value = theNewLetters + concatNumber;
document.getElementsByName('submitbutton')[0].click();
