// ==UserScript==
// @name           dirty search [yandex mod]
// @author         Stasik0
// @namespace      Nothing
// @description    Replaces some broken search features by Yandex search
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// ==/UserScript==
	var comments_id = "dirty.ru/comments";
	var posts_comments_id = "dirty.ru";
	var posts_id = "dirty.ru/archive";
	
	function build_url(id, query){
		return "http://yandex.ru/yandsearch?site="+id+"&text="+query;
	}
	
	//hook on comments search
	var exp = /http:\/\/(www.)*dirty.ru\/users\/(\S+)/;
	if(exp.test(document.location.href)){
		var links = document.getElementsByTagName("a");
		for(var i=0;i<links.length;i++){
			exp = /http:\/\/search.dirty.ru\/\?authors=(\S+)/;
			if(exp.test(links[i].href)){
				match = links[i].href.match(exp);
				links[i].href=build_url(comments_id, "\"Написала "+match[1]+"\" | \"Написал "+match[1]+"\"");
			}			
		}
	}

	//now replace the search form
	var form = document.getElementById("search");
	if(form != null){

		var formdiv = form.childNodes[1].childNodes[1];
		var button = formdiv.childNodes[2];
		formdiv.removeChild(button);
		
		button = document.createElement("a");
		button.innerHTML = '<a href="#" id="button"><img src="http://img.dirty.ru/d3/search.gif" /></a>';
		formdiv.appendChild(button);
	
		form.childNodes[3].innerHTML = '<input id="posts" type="checkbox" style="padding-top: 2px;" checked="yes"><label for="posts" style="font-weight: normal; color:black;">посты</label> <input id="comments" type="checkbox" style="padding-top: 2px;"><label for="comments" style="font-weight: normal; color:black;">комментарии</label> | <a href="http://search.dirty.ru/" class="nobr">супер поиск</a>'


		function doSearch(){
			if(document.getElementById("posts").checked && document.getElementById("comments").checked){
				document.location.href = build_url(posts_comments_id, '')+document.getElementById("search_value").value;
			}
			else if(document.getElementById("posts").checked && !document.getElementById("comments").checked){
				document.location.href = build_url(posts_id, '')+document.getElementById("search_value").value;
			}
			else if(!document.getElementById("posts").checked && document.getElementById("comments").checked){
				document.location.href = build_url(comments_id, '')+document.getElementById("search_value").value;
			}
			else if(!document.getElementById("posts").checked && !document.getElementById("comments").checked){
				alert("Не указан источник поиска!");
			}
		}
		
		document.getElementsByName("simple-search")[0].addEventListener("submit", function (e) { doSearch(); e.preventDefault(); }, false);
		document.getElementById("button").addEventListener("click", function (e) { doSearch(); e.preventDefault(); }, false);
	}