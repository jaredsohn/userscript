// ==UserScript==
// @name           Larkinor Chat Off
// @namespace      Larkinor
// @author         L4rk1.F4n
// @description    Larkinor jatekban kitorli a chatet
// @include        http://larkinor.index.hu/*
// @version        1.001
// @last update    2010.03.10
// ==/UserScript==


var deldiv = document.evaluate("//div[@style='position: absolute; z-index: 10; left: 60px; top: 570px; width: 500px; height: 300px; overflow-y: scroll; overflow-x: hidden; background-color: rgb(170, 194, 204);']", document, null, 9, null).singleNodeValue;
deldiv.parentNode.removeChild(deldiv);
