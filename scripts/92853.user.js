// ==UserScript==
// @name AntyTroll-A Dobreprogramy.pl [Opera]
// @author Aptu
// @include http://*.dobreprogramy.pl/*,Aktualnosc,*
// @version 0.9.9
// @date 16.12.2010
// @usage Aby dodac uzytkownika do listy troli nalezy kliknac na avatarze uzytkownika. 
//        Aby usunac trola z listy nalezy kliknac na jego nazwie na liscie aktywnych troli 
//        znajdujacej sie na lewo od napisu "Hide Trolls".
// ==/UserScript==

(function(){

window.opera.addEventListener('BeforeEvent.load', function(e){
	if (e.event.target instanceof Document){
		init();
	}
	
	function init(){
		var comments_header_element = document.querySelector(".komentarze h2");
		if(comments_header_element != null){
			appendShowHideTrollsToggleElement(comments_header_element);
			appendActiveTrollsElement(comments_header_element);
			addKillTrollListeners();
			showHideTrolls();	
		}	
	}

	function showHideTrolls(){
		var trolls = getTrolls();
		var comment_elements = document.querySelectorAll(".komentarze .item");
		var active_trolls = {};
		var hide_trolls = document.getElementById("hide_trolls").checked;

		var comment_element, author_element, author;
		for(var i = 0; i < comment_elements.length; ++i){
			comment_element = comment_elements[i];
			author_element = comment_element.querySelector(".userInformation .nick");
			if(author_element != null){
				author = trimAuthorName(author_element.textContent);
				if(isTroll(trolls, author)){
					if(hide_trolls){
						comment_element.style.display = "none";
					}else{
						comment_element.style.display = "block";	
					}

					if(active_trolls[author] == undefined){
						active_trolls[author] = 1;
					}else{
						active_trolls[author] = active_trolls[author] + 1;
					}
				}else{
					comment_element.style.display = "block";
				}
			}
		}
		setActiveTrolls(active_trolls);
	}

	function setActiveTrolls(active_trolls){
		var trolls_list_element = document.getElementById("trolls_list");
		var childs = trolls_list_element.childNodes;
		while (trolls_list_element.childNodes[0]) {
    			trolls_list_element.removeChild(trolls_list_element.childNodes[0]);
		}
		var trolls = [];
		for(var troll in active_trolls){
			trolls.push(troll);
		}
		trolls.sort(compare);
		
		var troll, trolls_element;
		for(var i = 0; i < trolls.length; i++){
			troll = trolls[i];
			troll_element = document.createElement("span");
			troll_element.textContent = troll + "(" + active_trolls[troll] +")";
			troll_element.style.marginLeft = "3px";
			troll_element.addEventListener("click", function(event){
				removeTroll(event.target.textContent);
			}, false);
			
			trolls_list_element.appendChild(troll_element);
		}
	}

	function getTrolls(){
		var trolls = localStorage.getItem("trolls");
		if(trolls == null){
			trolls = [];
		}else{
			trolls = JSON.parse(trolls);
		}
		return trolls;
	}

	function addTroll(troll){
		if(troll != undefined && troll.length > 0){
			troll = trimAuthorName(troll);
			var trolls = getTrolls();
			if(trolls.indexOf(troll) == -1){
				trolls.push(troll);
				localStorage.setItem("trolls", JSON.stringify(trolls));
				showHideTrolls();
			}
		}
	}

	function removeTroll(troll){
		if(troll != undefined && troll.length > 0){
			troll = trimAuthorName(troll);
			var trolls = getTrolls();
			if(trolls.indexOf(troll) != -1){
				trolls.splice(trolls.indexOf(troll), 1);
				localStorage.setItem("trolls", JSON.stringify(trolls));
				showHideTrolls();
			}
		}
	}

	function addKillTrollListeners(){
		var avatar_elements = document.querySelectorAll(".komentarze .item .avatar");
		var avatar_element, author_element;
		for(var i = 0; i < avatar_elements.length; i++){
			avatar_element = avatar_elements[i];
			avatar_element.addEventListener("click", function(event){
				author_element = event.target.parentNode.parentNode.querySelector(".userInformation .nick");
				if(author_element != null){
					addTroll(author_element.textContent);
				}
			}, false);
		}
	}

	function appendActiveTrollsElement(parent_element){
		var trolls_list_element = document.createElement("span");
		trolls_list_element.id = "trolls_list";
		trolls_list_element.style.fontSize = "10px";
		trolls_list_element.style.color = "#4f4f4f";
		trolls_list_element.style.marginLeft = "5px";

		parent_element.appendChild(trolls_list_element);
	}

	function appendShowHideTrollsToggleElement(parent_element){
		var toggle_element = document.createElement("input");
		toggle_element.id = "hide_trolls";
		toggle_element.type = "checkbox"
		toggle_element.checked = true;
		toggle_element.style.marginLeft = "6px";

		var toggle_text_element = document.createElement("span");
		toggle_text_element.textContent = "Hide Trolls";
		toggle_text_element.style.fontSize = "12px";
		toggle_text_element.style.marginLeft = "5px";

		toggle_element.addEventListener("click", function(){
			showHideTrolls();
		}, false);

		parent_element.appendChild(toggle_element);
		parent_element.appendChild(toggle_text_element);
	}

	
	function isTroll(trolls, author){
		return(trolls.indexOf(author) > -1);
	}

	function trimAuthorName(author){
		if(author.indexOf("(") > -1){
			return author.substring(0, author.indexOf("(")).trim();
		}else{
			return author.trim();
		}
	}

	function compare(a,b){
		if(a.toLowerCase() < b.toLowerCase()){
			return -1;
		}else if(a.toLowerCase() > b.toLowerCase()){
			return 1;
		}else{
			return 0;
		}
	}
}, false);
			
})();