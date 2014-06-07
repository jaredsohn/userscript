// ==UserScript==
// @name              son
// @description  submits son form
// @version       193
// @author        Kazuyoshi Tlacaelel <kazu.php@gmail.com>
// ==/UserScript==


$s = document.createElement('script');                                   
$s.innerHTML =  ' function fcus()                                 ' +  ' {                                               ' +  '     window.scrollTo(100, 500);                  ' +  ' }                                               ' +  ' function ff(){                                  ' +  '   if (document.conoceme)                        ' +  '     void(document.conoceme.submit());           ' +  '   if (document.yesForm)                         ' +  '     void(document.yesForm.submit());            ' +  ' }                                               ' +  ' setTimeout("fcus(4)", 1400);                    ' +  ' setTimeout("ff(4)", 3700);                      ' ;document.body.appendChild($s);