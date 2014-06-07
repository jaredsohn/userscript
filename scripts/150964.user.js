// ==UserScript==
// @name Google Translate key language swap
// @namespace http://jurajnyiri.eu/
// @version 1.3
// @description Swap languages with F2 key in google translate
// @match http://translate.google.*
// @copyright 2012+, Juraj Nyíri
// ==/UserScript==
////////////////////////USER SETTINGS
var klavesa = "113"; // binded to F2
//////////////////////////////////////////////
function KeyCheck(e)
{
    if(e.keyCode == klavesa)
    {
        var hash = window.location.hash;
        if(!hash == "")
        {
        var jazyk1=hash.substr(1,hash.indexOf("/")-1)
        hash = hash.substr(hash.indexOf("/")+1) 
        var jazyk2=hash.substr(0,hash.indexOf("/")) 
        hash = hash.substr(hash.indexOf("/")+1); 
        window.location.hash = jazyk2 + "/" + jazyk1 + "/" + hash;
        }
    }
}
window.addEventListener('keydown', KeyCheck, true);