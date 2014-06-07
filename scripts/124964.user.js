// ==UserScript==
// @match http://www.hackthissite.org/*
// @name HTS Prog 11 decoder
// ==/UserScript==
var tds,thepos,thistd,thecode,thechar,theshift,oldval,newval,shiftedval;
tds = document.getElementsByTagName('td');
if (tds.length)
{
    // there is at least one textarea on this page
    for (var i = 0; i < tds.length; i++)
    {
        thistd = tds[i];
        thepos = thistd.innerText.indexOf("Generated String:")
        if (thepos == 167 || (thepos > -1 && thepos < 170))
        {
            thelongcode = thistd.innerText.substr(thepos+18);
            thechar = thelongcode.charAt(2);
            thecode = thelongcode.substr(0,thelongcode.lastIndexOf(thechar)).split(thechar);
            theshift= thelongcode.substr(thelongcode.indexOf("Shift: ")+6,4);
            theshift = theshift.replace(/^\s+|\s+$/g, '') ;
            theshift = parseInt(theshift);
            for(var o = 0; o < thecode.length; o++)
            {
                oldval = parseInt(thecode[o]);
                newval = oldval - theshift;
               // alert(newval);
                shiftedval = String.fromCharCode(newval);
                document.getElementsByName('solution')[0].value += shiftedval;
            }
            document.getElementsByName('submitbutton')[0].click();
        }
    }
}
