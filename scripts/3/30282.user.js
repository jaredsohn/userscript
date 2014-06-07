// ==UserScript==
// @name          bash.org fgsfds
// @namespace     http://userscripts.org/
// @description   fgsdfs
// @include       http://*bash.org.ru/*
// ==/UserScript==

function getElementsByClassName(classname, node)
{
    if(!node)
		node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))
			a.push(els[i]);
    return a;
}

var re =/o_O|O_o|о_О|О_о|Слет.Сисадминов|хуясе|lol.bash.org.ru|MyMiniCity|\=\)|SMS|СМС|жжот|жжет|отжог|жжёт|отжиг|отжег|\)\)\)|секс|трах/gi;
const deleted_quote = "<div> цитата была удалена, т.к. является хуитой или рекламой </div>";

var elems = document.getElementsByClassName("q");

for (idx = 0; idx < elems.length; idx++)
{
    var elem = elems[idx];
    var html = elem.innerHTML;

    for(;;)
    {
		var match = re.exec(html);
		if(!match)
			break;

		html = deleted_quote;
    }
    elem.innerHTML = html;
}



