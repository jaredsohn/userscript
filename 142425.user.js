// ==UserScript==
// @name       WtfCaptcha
// @namespace  http://my.psype.fr/
// @version    0.1
// @description  resolves captcha.
// @match      http://dl.free.fr/*
// @copyright  2012+, TwK
// ==/UserScript==
var uri = window.location.href;

function runall()
{
    var TARGET = document.getElementById("ayl_response");
    var isin = "Recopiez « ";
    var isout = " »";
    var gettext = "";
    
    var v1 = "ayl_instructions ayl_instructions_visual";
    var v2 = "ayl_response_input";
        
    var cont = document.getElementById("ayl_private_c1").getElementsByTagName("DIV");
    for (var x = 0; x < cont.length; x++)
    {
        if (cont[x].className == v1)
        {
            gettext = cont[x].innerHTML;
            if (gettext.search(isin) >= 0)
            {
                var tmp = cont[x].innerHTML.split(isout)[0].split(isin)[1];
                TARGET.value = tmp;
            }
            else
            {
                alert("OUT!");
                window.location.href = uri;
               // TARGET.value = "Gratuit et Gains reels";
            }
        }
    }
    
}
var toto = setTimeout(runall, 2500);