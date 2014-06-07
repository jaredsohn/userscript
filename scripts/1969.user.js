
// ==UserScript==
// @name          RotterScoops
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   fix margins on the Rotter.net scoops page
// @include       http://rotter.net/forum/rottersidego.shtml
// ==/UserScript==

(function() {
    var body;
    body = document.getElementsByTagName('body')[0];
    body.removeAttribute('leftmargin');
    body.removeAttribute('marginwidth');
    body.removeAttribute('topmargin');

    var a;

    a = document.getElementsByTagName('a');

    for (var i=0; i<a.length; i++)
    {
        a[i].removeAttribute('target');
    }

    var f = document.getElementsByTagName('font');

    for (var j=0; j<f.length; j++)
    {
        f[j].setAttribute('size',4);
    }

    }) ();

