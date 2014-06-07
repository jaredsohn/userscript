// ==UserScript==
// @name           DraftNote
// @namespace      local
// @include        http://my.deviantart.com/notes/*
// ==/UserScript==


dodajPrzyciski()
wczytaj = safeWrap(wczytaj)
zapisz = safeWrap(zapisz)


function dodajPrzyciski(){	
	var pole = $("notebody")
	
	var p1 = document.createElement("input");
	p1.type = "button"
	p1.value = "Zapisz"	
	p1.addEventListener("click", zapisz, false);
	
	var p2 = document.createElement("input");
	p2.type = "button"
	p2.value = "Wczytaj"		
	p2.addEventListener("click", wczytaj, false);
	
	pole.nextSibling.nextSibling.insertBefore(p2, pole.nextSibling.nextSibling.childNodes[1])	
	pole.nextSibling.nextSibling.insertBefore(p1, pole.nextSibling.nextSibling.childNodes[2])
}

function wczytaj(){	
	if(confirm("Wczytanie zapisanej treści spowoduje skasowanie bieżącej zawartości\nCzy chcesz kontynuować?")){
		var ret = GM_getValue("DraftNote")
		if (ret==""){
			alert("Schowek jest pusty. Widocznie jeszcze nigdy niczego nie zapisywano ;)")
		}else{
			$("notebody").value = ret
		}
	}
}

function zapisz(){	
	if(confirm("Zapisanie treści spowoduje zastąpienie zapamiętanej wersji\nCzy chcesz kontynuować?")){
		GM_setValue("DraftNote", $("notebody").value)
		alert("Notka została zapisana")
	}
}



function $(name){
	return document.getElementById(name);
}

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}

