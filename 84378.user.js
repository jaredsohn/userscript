// ==UserScript==
// @name           vandal.net Ignorar usuarios y bots
// @namespace      vandalnetignore
// @include        http://www.vandal.net/foro/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

var hiddenBots = ["Noticias Vandal", "Videos"];

var hiddenTrolls = ["Trollaco1", "Trollaco2", "Trollaco3"];

function function1() {
    var m = document.all.myBody.children;
    for (i=0; i<m.length; i++) 
       alert(m.item(i).tagName); 
} 

for(var u in hiddenBots) {
	$(".contenedorforo2 tr").each(function(i, el) {
			try {
				if($(el).eq(0).html().indexOf('por ' + hiddenBots[u] + '</span>') != -1)
					el.style.display = "none";
			} catch(e) {}
		});

}

for(var u in hiddenTrolls) {
	$(".contenedorforo2 tr").each(function(i, el) {
			try {
				if($(el).eq(0).html().indexOf('por ' + hiddenTrolls[u] + '</span>') != -1)
					el.style.display = "none";
			} catch(e) {}
		});

}

for(var u in hiddenTrolls) {
	$(".contenedorpost tr").each(function(i, el) {
			try {
				if($(el).children().children().children().eq(0).html().indexOf(hiddenTrolls[u]) != -1)
					el.style.display = "none";
				
			} catch(e) {}
		});

}