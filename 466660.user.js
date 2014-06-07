// ==UserScript==
// @name       Друзья по группам
// @namespace  http://heroeswm.ru/
// @version    0.1
// @include     http://www.heroeswm.ru/*
// @copyright  johniek_comp (http://www.heroeswm.ru/pl_info.php?id=1305405)
// ==/UserScript==

var url = document.location.pathname;

var gr = {"ГТ":[],"Кузнецы":[],"Клан":[],"Лучшие друзья":[],"Радио":[],"HWM Daily":[]}

var b = document.getElementsByTagName('b')[12]

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
var nick = b.innerText.split("[")[0].replace(/\s{2,}/,''),
	isExists = false;
if(GM_getValue("groups") == undefined){
	var temp = gr
    GM_setValue("groups",JSON.stringify(temp))
}
if("/pl_info.php" == url){
	var a = document.getElementsByTagName('a');
	var json = JSON.parse(GM_getValue("groups"));
	for(i in json){
		if(json[i].length != 0){
			for(ii in json[i]){
				if(json[i][ii] == nick){
					isExists = i;
				}
			}
		}
	}
	for (var i = 0; i < a.length - 1; i++) {
		if(a[i].innerHTML == "Написать письмо"){
			var node = document.createElement('div');
			node.innerHTML = "группа:";
			var sel = document.createElement('select');
			sel.innerHTML += "<option selected value='off'>вне группы</option>";
			for (e in json){
				var selected = isExists == e ? "selected" : "";
				sel.innerHTML += "<option "+selected+" value='"+e+"'>"+e+"</option>";
			}
			node.appendChild(sel)
			sel.onchange = function(){
				for(gr in json){
					if(json[gr].length != 0){
						for(nicks in json[gr]){
							json[gr].remove(null)
							if(json[gr][nicks] == nick ){
								delete json[gr][nicks];
							}	
						}
					}
				}
				if(this.value != "off")
					json[this.value].push(nick);
                GM_setValue("groups",JSON.stringify(json))
				var message = document.createElement("b");
				message.style.color = "blue";
				message.innerHTML = "&nbsp;Сохранено!";
				node.appendChild(message);
				setTimeout(function(){
					node.removeChild(message);
				},1500);
			}
			a[i].parentNode.appendChild(node); 
		}
	};
}
/*
* Друзья по группам (отображение)
*/
if("/home.php" == url){
	var friends_table = document.getElementsByClassName("wbwhite")[5].innerHTML
	var friend = friends_table.split(",");
	var wrapper = document.createElement("item_friend");
	var json = JSON.parse(GM_getValue("groups"));
	var online = {};
	var groups = gr
	var notsorted = [];
	for (var i = 0; i <= friend.length - 1; i++){
		wrapper.innerHTML = friend[i]
		online[wrapper.getElementsByTagName('b')[0].innerHTML] = friend[i];
	}
	for(i in json){
		if(json[i].length != 0){
			for(ii in json[i]){
				if(online[json[i][ii]] != undefined){ // если игрок в онлайне и есть в какой-то группе
					groups[i].push( json[i][ii] )
				}
			}
		}
	}
	var new_html = "";
	for (i in groups)
	{
		new_html += "<b style='color:blue'>"+i+":</b>";
		for (var e = 0; e <= groups[i].length - 1; e++){
			new_html += online[groups[i][e]] + ", ";
			delete online[groups[i][e]];
		}
		new_html += "<br>";
	}

	new_html += "<hr>";
	new_html += "<b style='color:blue'>Остальные:</b>";
	for(i in online)
	{
		new_html += online[i]+", ";
	}
	document.getElementsByClassName("wbwhite")[5].innerHTML = new_html;
}


function in_array(needle, haystack, strict) {
    var found = false, key, strict = !!strict;
    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }
    return found;
}