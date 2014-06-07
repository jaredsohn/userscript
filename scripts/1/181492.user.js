// ==UserScript==
// @name       fqjy_close
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.fqjyy.com/ons/index.php
// @copyright  2012+, You
// ==/UserScript==


window.setTimeout(function(){close_chrome();}, 10* 1000);


function close_chrome()
{
    //alert(url);     
    window.open('', '_self', '');
    window.close();
}