// ==UserScript==
// @name           	Inline Info Ex (usernames ver)
// @namespace     ru.lepra.mcm69
// @author 		mcm69, tender, babka_sotona
// @description    Позволяет посмотреть базовую информацию о лепроюзере, не заходя в профиль (модифицирован для работы с именами)
// @include	http://*leprosorium.ru/*


// ==/UserScript==
// всякие переменные

// patch by //tender
// names patch by babka_sotona

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
		if(t && (t.id == "inline_userlink" || t.id == "hoverinfo" || t.id == "user_pic")) 
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

		function get_my_id() {
			var greetings_div = document.getElementById("greetings");
			var a_list = greetings_div.getElementsByTagName("a");
			if (a_list.length < 2) {
				return false;
			}
			var result = a_list[0].href.match(/users\/(.*?)$/);
			if (result) {
				return result[1];
			} else {
				return false;
			}
		}


function SimpiAndLaffki(my_id, user_id, div_html){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", "http://leprosorium.ru/karmactl", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function() {
			var ready = false;
			try {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					ready = true;
				}
			} catch (e) {
			}
			if (ready) {

				//var s0 = xmlhttp.responseText;
				// alert(s0);

				var response = false;
				try {
					eval("response = " + xmlhttp.responseText);
				} catch (e) {
				}
				if (!response) {
					return;
				}
				var vote = false;
				for (var i = 0; i < response.votes.length; i++) {
					vote = response.votes[i];
					if (vote.uid == user_id) {
						break;
					}
				}
				var attitude = "Никакое...";
				for (var i = 0; i < response.votes.length; i++) {
					var vote = response.votes[i];
					if (vote.uid == user_id) {
						attitude = vote.attitude;
						break;
					}
				}
				
				div_html += "Отношение к Вам: "+attitude+"<br/>";
				var div = document.getElementById("hoverinfo");
				div.style.background="#fff";				div.innerHTML = div_html;

						
		// set_attitude(attitude);
			}
		};
		xmlhttp.send("view=" + encodeURIComponent(my_id));
}


// а вот здесь специально обученные обезьянки ходят в профайл и собирают данные
function hoverInfo() {
	left = findPosX(obj) + 5 + "px";
	topPos = findPosY(obj) + 20 + "px";
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
				
   	    //реальное имя, город
            m = html.match(/<div class=\"userbasicinfo\">\s*<h3>(.+)\s*<\/h3>\s*<div class=\"userego\">\s*(.+)\s*<\/div>/);

	    var extinfo = "";
	    if (m) {
              if (m[1])
		extinfo+=m[1];

              extinfo+="&nbsp;";
	
              if (m[2])
		extinfo+=m[2];

 
	     }

		// <h2 class="username"><a href="/users/13055">tender</a></h2>

            // имя и дата реги
            m = html.match(/<h2 class=\"username\"><a href=\"\/users\/(.*?)\">(.+)<\/a><\/h2>/);
            var regname = m[2];

	    var eblozor = "http://faces.leprosorium.com/image.php?cat=&image=";
	    var eblozor_full = "http://faces.leprosorium.com/full.php?cat=&img=";
	    var s0 = '<a href=\"'+eblozor_full+m[2]+'.jpg'+'\"> <img id=\"user_pic\" src=\"'+eblozor+m[2]+'.jpg\" alt=\"Фотки нет\"> <\/a>'+'<br/>';

//	    alert(s0);
	    div_html +=s0;	

		// 

            m = html.match(/<div class=\"userregisterdate\">(.+)<\/div>/);
            var regdate = m[1];

            if(regname && regdate ) {
  	      div_html += "["+extinfo+"]"+"<br>";
              div_html += "<strong><a id=\"inline_userlink\" href=\"http://leprosorium.ru/users/"+usernum+"\">"+regname+"</a></strong> #"+usernum+ "<br/>";
              div_html += regdate+"<br/><br/>";
            }

				// карма
				m = html.match(/<span class=\"rating\" .*><em>(-?\d+)<\/em><\/span>/);
				if(m && m[1]) {
					var karma = m[1];
					div_html +="Карма: "+karma+"<br/>";
				}

            // вес голоса
            m = html.match(/<div class=\"userstat uservoterate\">(.+)<\/div>/);
            if(m && m[1]) {
              div_html +=m[1]+"<br/>";
            }

            // рейтинг
            m = html.match(/<div class=\"userstat userrating\">(.+)<\/div>/);
            if(m && m[1]) {
              div_html +=m[1]+"<br/><br/>";
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
				
				var self_id = get_my_id();
				// alert(self_id);
				
				//SimpiAndLaffki(self_id, usernum, div_html);
				//..............................

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
	url+=usernum;
	xhr.open('GET', url, true);
	
	clearInterval(tid);
	
	//init div
	var div = document.getElementById("hoverinfo");
	div.innerHTML = "";
	div.style.left = left;
	div.style.top = topPos;
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
	
	if(location.href.match(/comments/)) //мы в посте или инбоксе
		a = a[1];
	else if(location.href.match(/http:\/\/www.leprosorium.ru/) || location.href.match(/http:\/\/leprosorium.ru/) ) //мы на БЛ
		a = a[0];
	else
		a = '';
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