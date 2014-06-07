// ==UserScript==
// @name           	Inline info
// @namespace     ru.lepra.mcm69
// @author 		mcm69
// @description    Позволяет посмотреть базовую информацию о лепроюзере, не заходя в профиль
// @include        	http://www.leprosorium.ru/comments/*
// @include	http://leprosorium.ru/comments/*
// @include        	http://www.leprosorium.ru/my/inbox/*
// @include	http://leprosorium.ru/my/inbox/*
// @include        	http://www.leprosorium.ru/
// @include	http://leprosorium.ru/
// @include        	http://www.leprosorium.ru/my*
// @include	http://leprosorium.ru/my*


// ==/UserScript==
// всякие переменные
tid = 0;
hid = 0;
left = 0;
top = 0;
obj = null;
xhr = new XMLHttpRequest();

// при наведении мыши на ссылку на юзеринфо через 1 секунду всплывает окошко с информацией,
function mouseOver() {
	tid = setInterval(hoverInfo, 1000);
	obj = this;
}

// которое при необходимости, естественно, прячется,
function mouseOut() {
	clearInterval(tid);
	hid = setInterval(hideDiv, 500);
}

// но необязательно - а вдруг нам что-то нужно скопипастить из этого окошка?
function hideDiv(e) {
	if(e) 
	{
		var t = e.relatedTarget;
		if(t && (t.id == "inline_userlink" || t.id == "hoverinfo")) 
		{
			return;
		}	
	}

	var div = document.getElementById("hoverinfo");
	div.style.display="none";
	xhr.abort();
	clearInterval(hid);


}

function hoverDiv() {
	clearInterval(hid);
}



// а вот здесь специально обученные обезьянки ходят в профайл и собирают данные
function hoverInfo() {
	left = findPosX(obj) + 5 + "px";
	top = findPosY(obj) + 20 + "px";
	var usernum = obj.getAttribute("usernum");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4)
		{
			//check response code
			if(xhr.status == 200)
			{
				var div_html = "";
				var html = xhr.responseText;
				
				var m;
				
				// имя и дата реги
				m = html.match(/<h2>\s*<a href=\"\">(.+)<\/a><br \/>\s*<span>(.+)<\/span>/);
				if(m && m[1] && m[2]) {
					div_html += "<strong><a id=\"inline_userlink\" href=\"http://leprosorium.ru/users/"+usernum+"\">"+m[1]+"</a></strong> #"+usernum+ "<br/>";
					div_html += m[2]+"<br/><br/>";
				}
				
				// карма
				m = html.match(/<span class=\"rating\" .*><em>(-?\d+)<\/em><\/span>/);
				if(m && m[1]) {
					var karma = m[1];
					div_html +="Карма: "+karma+"<br/>";
				}
				
				// вес голоса
				m = html.match(/Вес голоса <strong>(\d+)<\/strong>/)
				if(m && m[1]) {
					div_html +="Вес голоса: "+m[1]+"<br/>";
				}
				// рейтинг
				m = html.match(/рейтинг <strong>(-?\d+)<\/strong>/);
				if(m && m[1]) {
					var rating = m[1];
					div_html +="Рейтинг: "+rating+"<br/><br/>";
				}
				
				// ваше отношение к лепроюзеру
				var attitude = 0;
				pos = html.indexOf("plus voted");
				while ( pos != -1 ) {
					attitude++;
				pos = html.indexOf("plus voted",pos+1);
				}
				pos = html.indexOf("minus voted");
				while ( pos != -1 ) {
					attitude--;
				pos = html.indexOf("minus voted",pos+1);
				}
				div_html += "Ваше отношение: "+attitude+"<br/>";
				
				var div = document.getElementById("hoverinfo");
				div.style.background="#fff";
				div.innerHTML = div_html;
			}
			else
			{
				//балет :(
				var div = document.getElementById("hoverinfo");
				div.style.background="#fff";
				div.innerHTML = "<span style='color:red'>Извините, запрос не может быть выполнен по причине:<br/>СМОТРИ БАЛЕТ, СУКА!!1</span>";
				
			}
		}
	}
	var url;
	if(location.href.indexOf("www")!=-1)
		url = "http://www.leprosorium.ru/users/";
	else
		url = "http://leprosorium.ru/users/";
	xhr.open('GET', url+usernum, true);
	
	clearInterval(tid);
	
	//init div
	var div = document.getElementById("hoverinfo");
	div.innerHTML = "";
	div.style.left = left;
	div.style.top = top;
	div.style.display = "block";
	div.style.background = "#fff url(http://www.picamatic.com/show/2008/10/14/02/54/1181194_16x16.gif) center center no-repeat";
	//send in the fail boat
	xhr.send(null);
}

// create a hidden div
var div = document.createElement("div");
div.style.border="1px dotted #aaa";
div.style.minWidth="200px";
div.style.minHeight="100px";
div.id = "hoverinfo";
div.style.position="absolute";
div.style.zIndex="99";
div.style.color="#999";
div.style.fontSize="10px";
div.style.padding="10px";
div.style.whiteSpace="nowrap";
div.addEventListener("mouseover", hoverDiv, false);
div.addEventListener("mouseout", hideDiv, false);


div.style.display="none";
document.body.appendChild(div);

// тут всякая скучная инициализация. расходитесь, здесь не на что смотреть

var divs = my_getElementsByClassName("post");

for (var i=0;i<divs.length;i++) {
	
	var p_divs = my_getElementsByClassName("p", divs[i]);
	
	
	var p_div = p_divs[0];
	
	var a =  p_div.getElementsByTagName("a");
	
	if(location.href.match(/\/(\d+)/)) //мы в посте или инбоксе
		a = a[1];
	else
		a = a[0];

	a.addEventListener('mouseover', mouseOver, false);
	a.addEventListener('mouseout', mouseOut, false);

	var href = a.href;
	href = href.substring(href.lastIndexOf('/')+1);

	a.setAttribute("usernum", href);
}

/* routines */
function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} 
	return curleft;
}

function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} 
	return curtop;
}

function my_getElementsByClassName(className, node)
{
	if(!node) node = document;
	if(node.getElementsByClassName)
		return node.getElementsByClassName(className);
	else
		return getElementsByClassName_compatible(className, node)
}

function walkTheDOM (node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walkTheDOM(node, func);
		node = node.nextSibling;
	}
}

function getElementsByClassName_compatible (className, _node) {
	var results = [];

	walkTheDOM(_node, function (node) {
		var a, c = node.className, i;
		if (c) {
			a = c.split(' ');
			for (i=0; i<a.length; i++) {
				if (a[i] === className) {
					results.push(node);
					break;
				}
			}
		}
	});
	return results;
}