// ==UserScript==
// @author         ml01172, Дарко Максимовић <darko.maksimovic@gmail.com> and _zevs_, Дарко Кулић <bezvezeadresa@gmail.com>
// @name           Изабери све за Травијан
// @namespace      http://s2.travian.rs/
// @description    Додаје дугме које штиклира све кућице у секцијама Поруке и Извјештаји, тако да се могу заједно обрисати
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// ==/UserScript==

function myGetElementsByName(haystack, needleName)
{
    var arr = new Array();
    __private_myGetElementsByName( haystack, needleName, arr );
    return arr;
}

function __private_myGetElementsByName( haystack, needleName, elements )
{
    if ( ! haystack )
        throw new FatalException( "myGetElementsByName(), looking for " + needleId + ": invalid haystack" );
    if ( haystack.getAttribute && haystack.getAttribute( "name" ) == needleName )
        elements.push( haystack );
    else if ( haystack.name && haystack.name == needleName )
        elements.push( haystack );
    if ( haystack.childNodes ) {
        var i, length = haystack.childNodes.length;
        if ( haystack.hasChildNodes() )
            for ( i = 0; i < haystack.childNodes.length; i++ )
                __private_myGetElementsByName( haystack.childNodes[i], needleName, elements );
    }
}

var dels = myGetElementsByName(document.body, "del");
if ( dels.length == 0 )
	dels = myGetElementsByName(document.body, "delmsg");

var del = dels[0];
var check = del.cloneNode(true);
check.setAttribute("value", "Изабери све");
check.setAttribute("type", "button");
del.parentNode.appendChild(check);

var ns = Array();
var ntemp;
for ( i = 1; i <= 10; i++ ) {
	ntemp = myGetElementsByName(document.body, "n"+i);
	ns[i-1] = ntemp[0];
}

window.cekiraj = function(arr)
{
	return function()
	{
		for ( i = 0; i < 10; i++ ) {
			arr[i].checked = ! arr[i].checked;
		}
	};
};

check.addEventListener("click", cekiraj(ns), true);