// ==UserScript==
// @name           Vhпgfgfg
// @namespace      hhs      
// @include        http://virtonomica.ru/*/main/globalreport/marketing/by_trade_at_cities*
// ==/UserScript==

var run = function() {
function SetCookie(strName, oValue)
{
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;

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
function GetCookie(strName)
{
    if((typeof(strName) == "string") && strName.length)
    {
        var i = 0, j;

        var strFind    = strName + "=";
        var strCookie  = document.cookie;

        do
        {
            j = i + strFind.length;

            if(strCookie.substring(i, j) == strFind)
            {
                var nEnd = strCookie.indexOf(";", j);

                if(nEnd < 0)
                    nEnd = strCookie.length;

                return unescape(strCookie.substring(j, nEnd));
            }
        }
        while(i = strCookie.indexOf(" ", j) + 1);
    }

    return null;
}
function DeleteCookie(strName)
{
    document.cookie = strName + "=0; expires=" + (new Date(0)).toGMTString();
}
/*function getCityName(CN){
$(document).ready(function(){
		return $('select').eq(3).contents().eq(CN).text();});
}*/
///////////////Select City function
function selectCity(CN){
	$(document).ready(function(){
	var k = (parseFloat(GetCookie('currentKoeff'))*1000).toFixed(2);
	var cCN = parseInt(CN) - 2;
	
	SetCookie('City number: '+cCN+'', k);
	SetCookie('scriptStatus', 'productChange',null,null,"/");
	
	SetCookie('currentKoeff','-1',null,null,"/");
	SetCookie('kumkum','0',null,null,"/");
	SetCookie('sumsum', CN ,null,null,"/");

	
	$('select').eq(3).contents().eq(CN).attr('selected','selected').change();});
}
function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}
///////////////Drop City function
function dropCity(){
$(document).ready(function(){
	$('select').eq(1).contents().eq(1).attr('selected','selected').change();});
}
///////////////Change Product function
function changeProduct(PI){
	$(document).ready(function(){
		window.location.href=$('#__products_list').contents().eq(PI).contents().eq(0).attr('href');	
	})
}
///////////////grabInfo function
function grabInfo(){
	$(document).ready(function(){
	var k = GetCookie('currentKoeff');
	k += countKoeff();
	SetCookie('scriptStatus', 'productChange',null,null,"/");
	SetCookie('currentKoeff', k,null,null,"/");
	window.location = window.location;});
}
//////////////
function countKoeff(){
	var v,p,k,nm,mm;
	v = parseFloat($('table.grid td b').eq(1).text().replace(' ', ''));
	p = parseFloat($('table.grid td b').eq(2).text().replace(' ', ''));
	k = parseFloat($('table.grid td b').eq(3).text().replace(' ', ''));
	mm = parseFloat($('table td table.grid td').eq(0).text().replace(' ', '')) / parseFloat($('table td table.grid td').eq(2).text().replace(' ', ''));
	nm = parseFloat($('table td table.grid td').eq(1).text().replace(' ', '')) / parseFloat($('table td table.grid td').eq(3).text().replace(' ', ''));
	return (mm/nm/v/p/k);
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
$(document).ready(function(){
var status = GetCookie('scriptStatus');

//window.document.title = 'Status: ' + status + ';' + 'Current product:' +  GetCookie('kumkum')+ ';' + 'CurrentCity: '+parseInt(GetCookie('sumsum')) ;

if(status == 'grab'){ 
	grabInfo();
}else if(status == 'productChange'){
	var cp = parseInt(GetCookie('kumkum'));
	if (cp == 18) {
		SetCookie('kumkum', 0, null, null, "/");
		SetCookie('scriptStatus', 'cityDrop', null, null, "/");
		changeProduct(0);
	}
	else {
		cpp = parseInt(cp) + 1;
		SetCookie('kumkum', cpp, null, null, "/");
		SetCookie('scriptStatus','grab', null, null, "/");
		changeProduct(cpp);
	}
}else if(status == 'cityChange'){
	var ccC = 0;
	ccC = (parseInt(GetCookie('sumsum')) + 2);
	selectCity(ccC);
}else if(status == 'cityDrop'){
	SetCookie('scriptStatus', 'cityChange',null,null,"/");
	dropCity();
}
});
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);