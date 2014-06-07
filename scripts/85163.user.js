// ==UserScript==
// @name           cookieSetter
// @namespace      coks
// @include        http://virtonomica.ru/*/main/globalreport/marketing/by_trade_at_cities*
// ==/UserScript==

var run = function() {
	
function setCookie(strName, oValue){
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;

    var oDate = false; // аргумент expires

    if((argc > 2) && (argv[2] != null))
    {
        // задана дата
        // дату допустимо задавать:
        //    объектом Date,
        //    числом (миллисекундное смещение от 00:00:00 01.01.1970)
        //    строкой в формате, приемлемом для Date.parse

        var nStamp = (typeof(argv[2]) != "number")    ?
                Date.parse(argv[2].toString())        :
                argv[2];

        if(!isNaN(nStamp))
            oDate = new Date(nStamp);
    }

    document.cookie =   strName + "=" + escape(oValue.toString())                   +
                        (oDate ? "; expires=" + oDate.toGMTString() : "")           +
                        (((argc > 3) && (argv[3])) ? "; domain=" + argv[3] : "")    +
                        (((argc > 4) && (argv[4])) ? "; path=" + argv[4] : "")      +
                        ((argc > 5) ? (argv[5] ? "; secure" : "") : "");
}

//////////////
    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
	
//
	$('#menutop').remove();
	$('#topblock').remove();
	$('#tabu').remove();
	$('#share').remove();
	$('#footer').remove();
	$('ul.tabu').remove();
	$('#list').remove();
	$('table.list').remove();
	$('table.infoblock').remove();
	$('#mainContent > img').remove();
//	
//MAIN ROUTINE

setCookie("sumsum","3",null,null,"/");
setCookie("kumkum","0",null,null,"/");
setCookie("currentCity","no",null,null,"/");
setCookie("currentKoeff",0,null,null,"/");
setCookie("scriptStatus","grab",null,null,"/");
setCookie("cityList","start",null,null,"/");
alert(document.cookie);
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);