// ==UserScript==
// @id             kinozal.tv@vano
// @name           kinozal.tv ссылки на торрент
// @namespace      V@no
// @version        1.6.1
// @Date           2013-02-01
// @description    Добавляет ссылку на загрузку торрента в списке названий раздач
// @author         V@no
// @include        http://kinozal.tv/*
// ==/UserScript==

/*
Изменения с предыдущей версии:

- работает с последними изменениями структуры страниц сайта
*/

var a;

var js = ''
+'var dl = {};\n'
+'dl.img = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAVklEQVR4nI2RwRHAIAgEg5M6qOL6r2AroYr8CIPGyOuUm2NFiwhJ13cB5u7AxiRpzFdzcDct68h010FNJ+ub1PDrcVTebAD1BT0JSPHDtAbf79NOvuUBhxosVkocp5kAAAAASUVORK5CYII=";\n'
+'\n'
+'dl.change = function (obj)\n'
+'{\n'
+'  dl.display = parseInt(obj.value);\n'
+'  l = dl.getData();\n'
+'  obj.selectedIndex = 0;\n'
+'  if (l[0].length)\n'
+'  {\n'
+'    for(var i = 0; i < l[0].length; i++)\n'
+'    {\n'
+'      l[1][i].style.display = (dl.display == -1 ? "none" : "");\n'
+'      l[0][i].style.display = "none";\n'
+'      l[1][i].style.cssFloat = (dl.display == 2) ? "right" : ""\n'
+'    }\n'
+'  }\n'
+'  dl.createCookie("dld", dl.display, 999);\n'
+'}\n'
+'\n'
+'dl.getData = function()\n'
+'{\n'
+'  switch(dl.display)\n'
+'  {\n'
+'    case 0:\n'
+'    default:\n'
+'        var l2 = document.getElementsByClassName("dlbefore");\n'
+'        var l = document.getElementsByClassName("dlafter");\n'
+'      break;\n'
+'    case 1:\n'
+'    case 2:\n'
+'        var l = document.getElementsByClassName("dlbefore");\n'
+'        var l2 = document.getElementsByClassName("dlafter");\n'
+'      break;\n'
+'    case -1:\n'
+'        var l2 = document.getElementsByClassName("dlbefore");\n'
+'        var l = document.getElementsByClassName("dlafter");\n'
+'      break;\n'
+'  }\n'
+'  return [l, l2];\n'
+'}\n'
+'\n'
+'dl.download = function(obj)\n'
+'{\n'
+'  var xmlhttp = new XMLHttpRequest();\n'
+'\n'
+'  xmlhttp.onreadystatechange = function()\n'
+'  {\n'
+'    if (xmlhttp.readyState != 4) return;\n'
+'\n'
+'    var r = new RegExp(\'<a href="(/?download\.php[^"]+)\', \'\');\n'
+'    var c = xmlhttp.responseText.match(r);\n'
+'    if (!c)\n'
+'      return;\n'
+'\n'
+'    var d = document.createElement("a");\n'
+'    d.className = "dlbefore";\n'
+'    d.href = c[1];\n'
+'    d.innerHTML = \'<img src="data:image/png;base64,\' + dl.img +\'" border=0 style="margin:0 5px 0 5px;">\';\n'
+'    d.style.display = "none";\n'
+'    d2 = d.cloneNode(true);\n'
+'    d2.className = "dlafter";\n'
+'    obj.parentNode.insertBefore(d, obj);\n'
+'    obj.parentNode.insertBefore(d2, obj.nextSibling);\n'
+'    if (dl.display > 0)\n'
+'    {\n'
+'      d2.style.display = "";\n'
+'      d2.style.cssFloat = (dl.display == 2 )  ? "right" : "";\n'
+'    }\n'
+'    else if (dl.display != -1)\n'
+'    {\n'
+'      d.style.display = "";\n'
+'    }\n'
+'\n'
+'  };\n'
+'  xmlhttp.open(\'GET\', obj.href, true);\n'
+'  xmlhttp.send(null);\n'
+'}\n'
+'\n'
+'dl.readCookie = function (name) {\n'
+'  var nameEQ = name + "=";\n'
+'  var ca = document.cookie.split(\';\');\n'
+'  for(var i=0;i < ca.length;i++) {\n'
+'    var c = ca[i];\n'
+'    while (c.charAt(0)==\' \') c = c.substring(1,c.length);\n'
+'    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);\n'
+'  }\n'
+'  return null;\n'
+'}\n'
+'\n'
+'dl.createCookie = function (name,value,days) {\n'
+'  if (days) {\n'
+'    var date = new Date();\n'
+'    date.setTime(date.getTime()+(days*24*60*60*1000));\n'
+'    var expires = "; expires="+date.toGMTString();\n'
+'  }\n'
+'  else var expires = "";\n'
+'  document.cookie = name+"="+value+expires+"; path=/";\n'
+'}\n'
+'\n'
+'dl.display = parseInt(dl.readCookie("dld"));\n'
+'if (isNaN(dl.display) || dl.display < -1 || dl.display > 2)\n'
+'  dl.display = 0;\n';




eval(js);
if (location.href.match("browse.php"))
{
	a = document.getElementsByClassName("nam");
	dl.where = 1;
}
else if (location.href.match("persons.php"))
{
	a = document.getElementsByClassName("nam");
	dl.where = 1;
}
else
{
	a = document.getElementsByClassName("mn");
	dl.where = 0;
}

var m = document.createElement("script");
m.type = 'text/javascript';
m.innerHTML = js;
document.getElementsByTagName('head')[0].appendChild(m);

var m = document.getElementById("user_retio");
if (m)
{
	m = m.previousSibling.previousSibling;
}
else
{
	var n = document.forms;
	if (n.length)
	{
		for(var i = 0; i < n.length; i++)
		{
			if (n[i].action.toString().match("takelogin.php"))
			{
				m = n[i];
			}
		}
	}
}
if (a && a.length)
{
	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var n = true;
	for (var i in a)
	{
		if ((dl.where && typeof(a[i].innerHTML) != "undefined" && a[i].innerHTML) || (!dl.where && typeof(a[i].tagName) != "undefined" && a[i].tagName == "TR"))
		{
			var e = a[i].getElementsByTagName("a");
			for(var h = 0; h < e.length; h++)
			{
				if (e[h].href.match(/("|\/)details\.php\?id=[0-9]+/))
				{
					if (n && m)
					{
						n = false;
						var d = document.createElement("li");
						d.style.paddingLeft = "14px";
						var d2 = document.createElement("span");
						d2.innerHTML = "<span class='bulet'></span>";
						var t = dl.getData();
						var i = false; //typeof(m.getElementsByTagName("img")[0]) != "undefined" ? m.getElementsByTagName("table")[0].getElementsByTagName("img")[0].src : false;//"http://212.150.34.64/pic/lst.gif";
						if (isChrome)
							d2.innerHTML += (i ? '<img src=' + i + ' border=0> ' : '') + '<select onchange="dl.change(this);"><option>Покзывать иконки</option><option value=0># До имени</option><option value=1>После имени #</option><option value=2 style="white-space:pre;">После имени &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</option><option value=-1>Не показывать иконки</option></select>';
						else
							d2.innerHTML += (i ? '<img src=' + i + ' border=0> ' : '') + '<select onchange="dl.change(this);"><option>Покзывать иконки</option><option value=0 style="background-image:url(data:image/png;base64,' + dl.img +');background-repeat:no-repeat;background-position:bottom left;padding-left:17px;margin-left:2px;">До имени</option><option value=1 style="background-image:url(data:image/png;base64,' + dl.img +');background-repeat:no-repeat;background-position:bottom center;padding-right:17px;margin-right:-30px;">После имени</option><option value=2 style="background-image:url(data:image/png;base64,' + dl.img +');background-repeat:no-repeat;background-position:bottom right;padding-right:17px;margin-right:2px;">После имени</option><option value=-1>Не показывать иконки</option></select>';
						d.appendChild(d2);
						m.appendChild(d);
					}
					dl.download(e[h]);
				}
			};
		}
	}
}