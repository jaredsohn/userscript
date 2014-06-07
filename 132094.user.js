// ==UserScript==
// @name           CNC TA ZoomHelper
// @namespace      http://g3gg0.de
// @include        http://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

var g3_zoomMain = function()
{
    var g3_defaultKeypress = window.onkeypress;
    var g3_zoomLevel = 1;
    var g3_zoomIntervalId = 0;

    var g3_zoomUpdate = function()
    {
        window.clearInterval(g3_zoomIntervalId);
        ClientLib.Vis.VisMain.GetInstance().set_ZoomFactor(g3_zoomLevel);
    }

    var g3_ZoomIn = function()
    {
        g3_zoomLevel *= 1.2;
        g3_zoomIntervalId = window.setInterval(g3_zoomUpdate, 1);
    }

    var g3_ZoomOut = function()
    {
        g3_zoomLevel *= 0.8;
        g3_zoomIntervalId = window.setInterval(g3_zoomUpdate, 1);
    }

    window.onkeypress = function(evt)
    {
        switch(evt.charCode)
        {
            case 43:
                g3_ZoomIn();
                evt.stopPropagation();
                evt.preventDefault();
                break;
            case 45:
                g3_ZoomOut();
                evt.stopPropagation();
                evt.preventDefault();
                break;
        }
    };
}

var inj = document.createElement("script");
txt = g3_zoomMain.toString();
inj.innerHTML = "(" + txt + ")();";
inj.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(inj);



