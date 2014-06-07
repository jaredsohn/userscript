// ==UserScript==
// @name       Imgsrc Auto Warn accept
// @namespace  http://mattman00000.com
// @version    0.5.1
// @description  automatic accept of warning on imgsrc
// @match      http://imgsrc.ru/*warn.php*
// @copyright  2012+, mattman00000
// ==/UserScript==

    console.warn("Activating warn skip");
    window.location.assign(window.location.href.concat("&iamlegal=yeah"));
