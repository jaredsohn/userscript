// ==UserScript==
// @name        Warnung vor psych. Schäden bei dauerhafter Nutzung
// @description Warns user for brain damaging content in German
// @include     http://*acebook.*
// @include     http://www.*i*vz.net*
// @exclude	http://www.*i*vz.net*Gadgets*
// ==/UserScript==


str = '<div onmouseover="document.getElementById(\'Brainwarn\').style.visibility = \'hidden\'; window.setTimeout(\'document.getElementById(\\\'Brainwarn\\\').style.visibility = \\\'visible\\\';\', 1000);" id="Brainwarn"><h1 style="color: #000; font: bold Arial, Sans-serif; font-size:19pt;">Warnung: Dauerhafte Nutzung kann zu psych. Sch&auml;den f&uuml;hren!</h1></div><style>#Brainwarn {z-index:999; top:0; left:0; padding: 5px; border: 5px solid #000; margin:2px; background:#fff; width:85em;}</style>'
document.body.innerHTML = str+document.body.innerHTML;
document.getElementById("Brainwarn").style.position = "fixed";
document.getElementById("Brainwarn").style.zIndex = "999";

