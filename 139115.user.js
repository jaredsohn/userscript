// ==UserScript== 
// @name           Klavogonki: average size of the books part
// @namespace      klavogonki
// @version        1.1
// @include        http://klavogonki.ru/vocs/*
// @author         Lexin
// ==/UserScript== 

function calc(html)
{
    var re = /\d+/g; 
    var parts = re.exec(html); 
    var length = re.exec(html); 
    return length / parts;     
}

function pluralForm(d, b, a, c) {
    d = Math.abs(d) % 100;
    n1 = d % 10;
    if (d > 10 && d < 20) {
        return c
    }
    if (n1 > 1 && n1 < 5) {
        return a
    }
    if (n1 == 1) {
        return b
    }
    return c
}

if (/http:\/\/klavogonki.ru\/vocs\/(top\/|search\/?\?)/.test(location.href))
{
    var content = document.getElementsByClassName("symbols");
    for (var i = 0; i < content.length; i++)
    {
        var e = content[i];
        if (e.getElementsByTagName("strong")[0]
        	&& e.getElementsByTagName("strong")[0].innerHTML.trim() === "Книга")
        {
            var partLength = calc(e.innerHTML);
        	e.innerHTML += "<br>" + partLength.toFixed(0) + " <i>с/о</i>";
        }
    }
}
else
{
    var content = document.getElementsByClassName("user-content")[0].getElementsByTagName("dd")[6]; 
    var textPos = content.innerHTML.indexOf("<div"); 
    var stat = content.innerHTML.substr(0, textPos).trim(); 
    var text = content.innerHTML.substr(textPos); 
    var partLength = calc(stat);

    if (!isNaN(partLength)) 
        content.innerHTML = stat + ", " + partLength.toFixed(0) + " " 
        + pluralForm(partLength.toFixed(0), "символ", "символа", "символов") +" на отрывок " + text;
}