// ==UserScript==
// @name           [Schulon.org] Weg mit dem "Wechseln" - Button!
// @description    Dies ist ein praktisches, kleines Script, das ich für mich und meine Klassenkammeraden angefertigt habe. Es bewirkt, dass der lästige "wechseln"-Button in der Verzeichnisauswahl auf der Seite "schulon.org" verschwindet und nicht mehr benötigt wird.
// @copyright      Lukas Aymans [TGYM91]
// @namespace      http://schulon.org/
// @include        http://my-ng.schulon.org/*
// ==/UserScript==

var text;
text  = "<input type='hidden' name='cb' value='browser_chgroup'>";
text += "Verzeichnis: <select name='gid' onchange='document.getElementsByTagName(\"form\")[0].submit();'>";
text += document.getElementsByName("gid")[0].innerHTML;
text += "</select>";
text += "<input style='display:none;' type='submit' value='Wechseln'>";

document.getElementsByTagName("form")[0].innerHTML = text;
