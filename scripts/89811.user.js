// ==UserScript==
// @name           Emotek
// @description    Skrypt zamienia symbole na emotki.
// @include        http://s*.ikariam.com/index.php?view=diplomacyAdvisor*
// @author         Dapi
// @version        1.1
// ==/UserScript==

var i = 0;                                                             
while (i < 11) {

    document.getElementsByClassName('msgText')[i].getElementsByTagName('div')[0].innerHTML=document.getElementsByClassName('msgText')[i].getElementsByTagName('div')[0].innerHTML

    .replace(/\http:\/\//gi,  'http:%//')
    .replace(/\:\//gi,  ' <img src="http://czfa.pl/images/smiles/disagree.png" alt=":/"> ')                  // :/
    .replace(/\;\//gi,  ' <img src="http://czfa.pl/images/smiles/disagree.png" alt=";/"> ')                  // ;/
    .replace(/\:D/gi,  ' <img src="http://czfa.pl/images/smiles/biggrin.png" alt=":D">')                     // :D
    .replace(/\;D/gi,  ' <img src="http://czfa.pl/images/smiles/biggrin.png" alt=";D">')                     // ;D
    .replace(/\:\)\)/gi,' <img src="http://czfa.pl/images/smiles/icon_biggrin.gif" alt=""> ')                // :))
    .replace(/\:\)/gi,  ' <img src="http://czfa.pl/images/smiles/smile.png" alt=":)"> ')                     // :)
    .replace(/\;\)/gi,  ' <img src="http://czfa.pl/images/smiles/icon_wink.gif" alt=";)"> ')                 // ;)
    .replace(/\:-\)/gi, ' <img src="http://czfa.pl/images/smiles/smile.png" alt=":-)"> ')                    // :-)
    .replace(/\;-\)/gi, ' <img src="http://czfa.pl/images/smiles/icon_wink.gif" alt=";-)"> ')                // ;-)
    .replace(/\;\(/gi,  ' <img src="http://czfa.pl/images/smiles/icon_cry.gif" alt=";("> ')                  // ;(
    .replace(/\:\(/gi,  ' <img src="http://czfa.pl/images/smiles/sad2.png" alt=":("> ')                      // :(
    .replace(/\:\]/gi,  ' <img src="http://czfa.pl/images/smiles/yeah.png" alt=":]"> ')                      // :]
    .replace(/\;\]/gi,  ' <img src="http://czfa.pl/images/smiles/yeah.png" alt=";]">')                       // ;]
    .replace(/\:\P/gi,  ' <img src="http://czfa.pl/images/smiles/razz.png" alt=":P"> ')                      // :P
    .replace(/\;\P/gi,  ' <img src="http://czfa.pl/images/smiles/icon_razz.gif" alt=";P"> ')                 // ;P
    .replace(/\ :\P/gi,  ' <img src="http://czfa.pl/images/smiles/razz.png" alt=":P"> ')                     // :P
    .replace(/\ ;\P/gi,  ' <img src="http://czfa.pl/images/smiles/icon_razz.gif" alt=";P"> ')                // ;P
    .replace(/\:\|/gi,  ' <img src="http://czfa.pl/images/smiles/icon_neutral.gif" alt=":|"> ')              // :|
    .replace(/\;\|/gi,  ' <img src="http://czfa.pl/images/smiles/icon_neutral.gif" alt=";|"> ')              // ;|
    .replace(/\:&gt\;/gi,  ' <img src="http://czfa.pl/images/smiles/twisted.png" alt=";>"> ')                // :>
    .replace(/\;&gt\;/gi,  ' <img src="http://czfa.pl/images/smiles/twisted.png" alt=";>"> ')                // ;>
    .replace(/\^\^/gi,  ' <img src="http://czfa.pl/images/smiles/icon_lol.gif" alt="^^"> ')                  // ^^
    .replace(/\http:%\/\//gi,  'http://')
    i++;
}