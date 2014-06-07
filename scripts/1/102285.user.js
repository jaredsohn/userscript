// ==UserScript==
// @name           eltiempo.es Punto de rocío
// @namespace      http://cyklos-solutions.com
// @description    Añade punto de rocío en listado horario de eltiempo.es
// @include        http://www.eltiempo.es/*.html?v=por_hora
// ==/UserScript==


var a = 17.271;
var b = 237.7;

function Tdew(t,rh)
    {
    var gamma = a*t/(b+t)+Math.log(rh*0.01);
    return b*gamma/(a-gamma);
    }
    

function process_tbody(tbody)
    {
    for (var i in tbody.childNodes)
        {
        var n = tbody.childNodes[i];
        if (n.tagName=='TR')
            {
            var t = null;
            var h = null;
            for (var j in n.childNodes)
                {
                var td = n.childNodes[j];
                if (td.tagName=='TD')
                    {
                    if (td.className=='temp')
                        {
                        for (var k in td.childNodes)
                            {
                            var m = td.childNodes[k];
                            if (m.tagName=='DIV')
                                t = m;
                            }
                        }
                    else if (td.className=='relative-moist')
                        h = td;
                    }
                }
            if (t!==null && h!==null)
                {
                var T = 1.0*t.innerHTML.replace(/[^0-9\.\,]+/g,'');
                var H = 1.0*h.innerHTML.replace(/[^0-9\.\,]+/g,'');
                var Tr = Tdew(T,H);
                h.title = 'P.R. '+Math.round(Tr)+'°';
                if (T<Tr+0.5)
                    n.style.backgroundColor = '#80c0ff';
                }
            }
        }
    }
    

var div = document.getElementById('city-weather-detailed-hours');
for (var i in div.childNodes)
    {
    var n = div.childNodes[i];
    if (n.tagName=='TABLE')
        {
        for (var j in n.childNodes)
            {
            var m = n.childNodes[j];
            if (m.tagName=='TBODY')
                process_tbody(m);
            }
        }
    }
