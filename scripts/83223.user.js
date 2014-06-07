// ==UserScript==
// @name           masowa niszczarka komentarzy
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/profil/*
// @version        1.1.1
// ==/UserScript==


const P_BLUZGI = 3;
const P_WWW = 4;
const P_PORNO = 5;
const $ = unsafeWindow.$;
var bBeginSelect;

if(unsafeWindow.entries){
	switch(GM_getValue("pozycja", "1")){
		case "1":
			$("#entries-list").before(createPanel());
			break;
		case "2":
			$("#entries-list").after(createPanel());
			break;
		case "3":
			$("#entries-list").before(createPanel());
			$("#entries-list").after(createPanel());
	}

	$(document).bind("commentsChanged", addCheckboxes);		// nasłuchujemy przyszłych zmian stron
	addCheckboxes();
}


function selectAll(){
	$(".chk").attr("checked", "true");
}


function annihilate(e){
	var c = document.getElementsByClassName("chk");
	for(i=0; i<c.length; i++){
		if (c[i].checked == true){
			var combo = e.target.previousSibling;
			if (combo.selectedIndex == 0){
				alert("Wybierz powód usunięcia komentarzy");
				return;
			}
			var commentID = c[i].id.split("_")[1];
			var postdata = 'val=["' + commentID +
						   '","' + combo.options[combo.selectedIndex].value +
						   '",'+ unsafeWindow.id +']' +
						   '&x=' + new Date().getTime();

			GM_xmlhttpRequest({
				id: commentID,
				method: "POST",
				url: "http://www.fotka.pl/ajax/komentarz_usun_fp.php",
				data: postdata,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				onload: function(e){
					//idealnie komentarze powinny znikać tylko po otrzymaniu potwierdzenia ale nie zawsze je otrzymujemy
					//if(e.responseText == '"OK"'){
						$("#entry_" + this.id).css("display", "none");//animate({height: 0}, 200);
					//}
				}
			});
		}
	}
}


function beginSelect(e){
	bBeginSelect.value = "Kliknij avatar";
	$(".menu").css("background-color", "DeepSkyBlue");
	$(".menu img").css("opacity", "0.4");
	pulse(true);
	$(".menu").click(function(e){
		e.preventDefault();
		var target = $(this).find("img").attr("alt");
		$(".menu").unbind("click");
		pulse(false);
		bBeginSelect.value = "Zaznacz login";
		selectLogin(target);
	});
}

function pulse(enabled){
	if(enabled){
		$(".menu").css("background-color", "DeepSkyBlue");
		$(".menu img").css("opacity", "1.0");
		$(".menu img").animate({opacity: 0.5}, 333).animate({opacity: 1.0}, 333, 'linear', function(){pulse(true);});
	}else{
		$(".menu img").stop(true, false).animate({opacity: 1.0} , 333);
	}
}

function selectLogin(login){
	if(login != null && login != ""){
		var c = document.getElementsByClassName("chk");
		for(i=0; i<c.length; i++){
			var commentID = c[i].id.split("_")[1];
			var test = $("#entry_"+commentID+" .comments-item-av a img").attr("alt");
			if(test && test.toLowerCase() == login.toLowerCase()){
				document.getElementById("checkbox_" + commentID).checked = true;
			}
		}
	}
}


function addCheckboxes(){
	$("#entries-list .comments-item").each(function(){
		if($(this).attr("id") == "entry_.{id}" || $(this).attr("id") == "r_komentarz_nprofil") return;
		if($(this).attr("niszczarka") == null){
			var cid = $(this).attr("id").split("_")[1];
			$(this).append(createCheckbox(cid)).attr("niszczarka", "tak");
		}
	});
}


function config(){
	var res = prompt("W którym miejscu chcesz widzieć przyciski niszczarki?\n1 - nad komentarzami\n2 - pod komentarzami\n3 - tu i tu");
	if(res == null) return;
	if(res == 1 || res == 2 || res == 3){
		GM_setValue("pozycja", res);
		alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
	}else{
		alert("No człowieku... 1, 2 w albo 3!");
	}
}


function createPanel(){
	var info = document.createElement("span");
	info.innerHTML = "Masowa niszczarka komentarzy"
	info.style.margin = "0 2px";
	var bConfig = document.createElement("img");
 	bConfig.src = "data:image/gif;base64,R0lGODlhDgAOANU8ANDQ0K2trbe3t8jIyHt7e5KSks3NzczMzMLCwq6urmhoaLu7u5eXl5WVld7e3ouLi7+/v29vb2tra6+vr5qamsHBwd3d3Y6OjomJicrKys/Pz7y8vOPj44GBgWNjY3R0dNzc3NTU1KmpqaWlpW5ubtXV1aioqH19fZ2dnXh4eHl5eaGhoYeHh7q6uuLi4pGRkcDAwIqKinV1ddLS0oiIiH9/f7S0tGdnZ8PDw7Ozs8fHx2JiYgAAAAAAAAAAAAAAACH5BAEAADwALAAAAAAOAA4AAAZoQJ5wKFyNUMQkL8BxFJTDhmv2gA4LDphKmGAoWaABJRaweIk1HMAA0JQGHSIBAdDZD4gTMQUxVCANHgoKRDIbBy0LLztKEQsZNgIXjEkfAjoJOQ+USQQhJhMYnEkRIgE0o0oSJDdWQkEAOw%3D%3D";
	bConfig.addEventListener("click", config, true);
	bConfig.style.cursor = "pointer";
	bConfig.style.verticalAlign = "middle";
	bConfig.style.margin = "0 2px";
	bConfig.title = "Ustawienia"

	var bSelectAll = document.createElement("input");
	bSelectAll.type = "button";
	bSelectAll.value = "Zaznacz wszystkie"
	bSelectAll.addEventListener("click", selectAll, true);
	bSelectAll.style.fontSize = "inherit";
	bSelectAll.style.margin = "0 2px";

	bBeginSelect = document.createElement("input");
	bBeginSelect.type = "button";
	bBeginSelect.value = "Zaznacz login"
	bBeginSelect.addEventListener("click", beginSelect, true);
	bBeginSelect.style.fontSize = "inherit";
	bBeginSelect.style.margin = "0 2px";

	var reason = document.createElement("select");
	reason.style.fontSize = "inherit";
	reason.style.margin = "0 2px";
	//reason.id = "comments_reason";

	var oDefault = document.createElement("option");
	oDefault.innerHTML = "[wybierz powód]";
	reason.appendChild(oDefault);
	var o1 = document.createElement("option");
	o1.value = P_BLUZGI;
	o1.innerHTML = "wulgaryzmy";
	reason.appendChild(o1);
	var o2 = document.createElement("option");
	o2.value = P_WWW;
	o2.innerHTML = "adres www";
	reason.appendChild(o2);
	var o3 = document.createElement("option");
	o3.value = P_PORNO;
	o3.innerHTML = "pornografia";
	reason.appendChild(o3);

	var bAnnihilate = document.createElement("input");
	bAnnihilate.type = "button";
	bAnnihilate.value = "Usuń zaznaczone"
	bAnnihilate.addEventListener("click", annihilate, true);
	bAnnihilate.style.fontSize = "inherit";
	bAnnihilate.style.color = "#DD0000";
	bAnnihilate.style.margin = "0 2px";

	var container = document.createElement("div");
	container.appendChild(info);
	container.appendChild(bConfig);
	container.appendChild(document.createElement("br"));
	container.appendChild(bSelectAll);
	container.appendChild(bBeginSelect);
	container.appendChild(reason);
	container.appendChild(bAnnihilate);
	container.style.fontSize = "8pt";
	container.style.textAlign = "center";

	return container;
}


function createCheckbox(id){
	var c = document.createElement("input");
	c.type = "checkbox";
	c.id = "checkbox_"+id;
	c.className = "chk";
	c.style.left = "-4px"
	c.style.top = "35px";
	c.style.zIndex = 101;
	c.style.cssFloat = "left";
	c.style.position = "absolute";
	return c;
}
