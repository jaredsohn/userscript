// ==UserScript==
// @name           poprawka usuwania w albumach
// @namespace      http://www.fotka.pl/profil/Bozar
// @description    ...komentarzy o numerze większym niż 10
// @include        http://www.fotka.pl/profil/*/albumy/*
// ==/UserScript==

const $ = unsafeWindow.$;

$(".comments-item").live('mouseover', function(){	
	if(!$(this).children(":first-child").hasClass("ico-delete")){		
		var button = $(document.createElement("div"));
		button.addClass("icos24 ico-delete");
		button.click(del);
		$(this).prepend(button);		
	}	
});

function del(e){
	var nr = e.target.parentNode.id.split("_")[1];
	unsafeWindow.comments.remove(nr);
}