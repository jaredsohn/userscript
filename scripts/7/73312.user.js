// ==UserScript==
// @name           koszyk Parlez
// @namespace      local
// @include        http://www.fotka.pl/*
// ==/UserScript==



	
if ($("strona") != null){	// czy to nie popup?
	dodajNoweMenu()
	if ($("lokalizacja") != null){  // czy jesteśmy na profilu?
		dodajPrzycisk()
		dodajMenuKontekstowe()
	}
}



dodajWpis = safeWrap(dodajWpis)
usunWpis = safeWrap(usunWpis)




function pokazPopup(){
	var popup = window.open("", "Wykres", "height=350,width=600,scrollbars=1,resizable=no")
	popup.document.open()	
	
	var panel = newElem("div")
	var tabelka = newElem("table")
	tabelka.width = "90%"
	tabelka.align = "center"
	tabelka.cellSpacing = 0	
	tabelka.appendChild(nowyWiersz("Profil", "Powód", true))
	
	var baza = GM_getValue("koszykPRO", "")	
	var wpisy = baza.split("|||")	
	for (w=0; w<ileWKoszyku(); w++){	
		var wpis = wpisy[w].split(":::")
		//tabelka.appendChild(nowyWiersz( '<a href="' + wpis[0] + '">' + wpis[0] + '</a>' , wpis[1]))
		tabelka.appendChild(nowyWiersz( wpis[0] , wpis[1]))
	}				
	panel.appendChild(tabelka)	
				
		
	popup.document.write("<head> <style type='text/css'>" + 'a:visited {background-color:transparent;color:#98AEB8;}.k10, h1, h2, a, a:hover, a.k01:hover,a.k21:hover, a.k10:visited {color:#4996BA;} table {font-size:12px;} body {color:#666666;font-family:"Trebuchet MS",Verdana,Arial,sans-serif;font-size:12px;} .b22, h2 {border-color:#DDDDDD;}' + "</style> <title>Koszyk</title></head>")
	
	popup.document.body = newElem("body")
	popup.document.body.appendChild(newElem("br"))
	popup.document.body.appendChild(panel)
	popup.document.close() 
	
	popup.window.focus()
	
	//$("header").insertBefore(panel, $("header").firstChild); 
}

function pokazHTML(){
	var popup = window.open("", "Wykres", "height=200,width=800,scrollbars=1,resizable=no")
	popup.document.open()
	
	var baza = GM_getValue("koszykPRO", "raz:::113|||dwa:::1341234|||trzy:::7721|||czter:::882828|||pięć:::235235")	
	var wpisy = baza.split("|||")	
	popup.document.write('<div style="font-size: 8pt; font-family: Courier New">')
	for (w=0; w<ileWKoszyku(); w++){		
		var wpis = wpisy[w].split(":::")
		if (wpis[1] == ""){
			popup.document.write( '&lt;a href="' + wpis[0] + '"&gt;' + wpis[0] + '&lt;/a&gt; &lt;br/&gt; <br/> ')
		}else{
			popup.document.write( '&lt;a href="' + wpis[0] + '"&gt;' + wpis[0] + '&lt;/a&gt; - ' + wpis[1] + '&lt;br/&gt; <br/> ')
		}
	}				
	popup.document.write('</div>')
	popup.document.close() 	
	popup.window.focus()
	
	

}



function ileWKoszyku(){
	var baza = GM_getValue("koszykPRO", "")	
	var wpisy = baza.split("|||")
	return wpisy.length-1
}




function dodajNoweMenu(){
	var noweMenu = newElem("li")
	noweMenu.className = "right"
	var poz0 = newElem("a")
	poz0.href = "#"
	poz0.id = "poz0"
	poz0.innerHTML = "Fejki (" + (ileWKoszyku()) + ")"
	poz0.addEventListener("mouseover", rozwinMenu, true)
	poz0.addEventListener("mouseout", zwinMenu, false)

	noweMenu.appendChild(poz0)
	pozLista = newElem("ul")
	pozLista.id = "pozLista"
	
	pozLista.addEventListener("mouseover", rozwinMenu, true)
	pozLista.addEventListener("mouseout", zwinMenu, false)
	
	poz1 = newElem("li")
	poz1.innerHTML = "<a href = '#'>Lista Fejków</a>"
	poz1.addEventListener("click", pokazPopup, false)
	pozLista.appendChild(poz1)
	
	poz2 = newElem("li")
	poz2.innerHTML = "<a href = '#'>Wyczyść listę</a>"
	poz2.addEventListener("click", oproznijKoszyk, false)
	pozLista.appendChild(poz2)
	
	poz3 = newElem("li")
	poz3.innerHTML = "<a href = '#'>Pokaż HTML</a>"
	poz3.addEventListener("click", pokazHTML, false)
	pozLista.appendChild(poz3)
	
	noweMenu.appendChild(pozLista)
	$("menu").firstChild.appendChild(noweMenu)
	pozLista.style.cssText = "right: " + (noweMenu.offsetRight-6) + "px;	"
}

function rozwinMenu(){
	$("pozLista").style.visibility = "visible"
	$("poz0").style.cssText = "background:transparent url(http://s.fotka.pl/img/javascript_menu.1.png) repeat scroll -6px -50px; color:#3E8DB2;"
}
function zwinMenu(){
	$("pozLista").style.visibility = "hidden"
	$("poz0").style.cssText = "border-right:1px solid transparent; color:#FFFFFF;"
}



function dodajWpis(profil, powod){	
	var baza = GM_getValue("koszykPRO", "")
	
	if(baza == "") { 					// pierwszy wpis - nadpisujemy
		baza = profil + ":::" + powod + "|||"
	}else{								// kolejny wpis 
		if(baza.match(profil)){			//	jeśli już jest:
			alert("profil " + profil + " jest już na liście")
		}else{							//	jeśli nie ma go, to dodajemy
			baza += profil + ":::" + powod + "|||"
			reload = true
		}
	}
	GM_setValue("koszykPRO", baza)
}
		
		
function dodajPrzycisk(){
	var l = $("lokalizacja")
	if (l != null){
		var gdzie = l.parentNode.previousSibling
		var p = newElem("IMG")
		p.src = "http://s.fotka.pl/img/operacje/delete.png"	
		p.id = "przycisk_dodaj"
		p.title = "Zgłoś BANA!"
		p.style.cursor = "pointer"
		p.style.marginRight = "35px"
		p.addEventListener("click", pokazMenu, false); 
	
		gdzie.appendChild(p)
	}
}



function dodajProfil(){
	var login = $("tabs_container").parentNode.firstChild.textContent
	var powod = $("f_powod").value
	dodajWpis("http://www.fotka.pl/profil/" + login + "/", powod)
	$("koszyk_menu").style.display = "none"
}
	
function dodajMenuKontekstowe(){
	var menu = newElem("div")
	menu.id = "koszyk_menu"
	menu.style.cssText = "border: 1px solid rgb(197, 197, 197); padding: 0px 3px 3px; z-index: 3; position: absolute; display: block; width: 18em; background-color: rgb(255, 255, 255); text-align: left; background-image: url(http://www.fotka.pl/img/operacje/menu.gif); background-repeat: no-repeat; display: none;"
	
	menu.style.top = $("przycisk_dodaj").offsetTop + "px"
	menu.style.left = $("przycisk_dodaj").offsetLeft + "px"
	
	var f_powod = newElem("input")
	f_powod.id = "f_powod"
	f_powod.type = "textbox"
	f_powod.style.fontSize = "10pt"
	f_powod.size = 25
	f_powod.addEventListener("keypress", czyEnter, false)

	var ok = newElem("input")
	ok.type = "button"
	ok.value = "OK"
	ok.style.fontSize = "10pt"
	ok.addEventListener("click", dodajProfil, false); 
	
	var info = newElem("div")
	info.innerHTML = "<br/><b>Powód:</b><br/>"
	
	menu.appendChild(info)
	menu.appendChild(f_powod)
	menu.appendChild(ok)
	
	$("strona").appendChild(menu)
}
	
function pokazMenu(){	
	$("przycisk_dodaj").style.display = "none"
	$("koszyk_menu").style.display = ""
	$("f_powod").focus()
}
		
function nowyWiersz(profil,powod, naglowek){
	var tr = newElem("tr")
	var td = new Array(3)
	
	for(i=0; i<3; i++){
		td[i] = newElem("td")
		td[i].className = "b22"
		td[i].style.cssText = "padding: 3px; border-bottom-width: 1px; border-bottom-style: solid; "
		tr.appendChild(td[i])
	}	
	//td[0].innerHTML = profil
	
	td[1].innerHTML = powod
		
	if(!naglowek){
		var przycisk = newElem("IMG")
		przycisk.src = "http://s.fotka.pl/img/operacje/delete.png"
		przycisk.style.cursor = "pointer"
		przycisk.addEventListener("click", usunWpis, false); 	
		td[2].align = "center"
		td[2].appendChild(przycisk)	
		
		var a = newElem("a")
		a.href = "javascript:void(0);"
		a.addEventListener("click", openInNewWindow, true);
		a.innerHTML = profil
		td[0].appendChild(a)
	}else{
		td[0].innerHTML = profil
		for(i=0; i<3; i++){
			td[i].style.cssText = "font-weight: bold; border-bottom: 1px solid rgb(221, 221, 221); background-color: rgb(238, 238, 238);"
		}	
		td[2].innerHTML = "Usuń"		
	}
	
	
	
	return tr
}

function usunWpis(e){
	var co = e.target.parentNode.parentNode.childNodes[0].textContent + ":::" + e.target.parentNode.parentNode.childNodes[1].innerHTML + "|||"
	e.target.parentNode.parentNode.style.textDecoration = "line-through"
		
	var baza = GM_getValue("koszykPRO", "")
	baza = baza.replace(co, "")
	GM_setValue("koszykPRO", baza)
}

function oproznijKoszyk(){
	var n = ileWKoszyku()
	if (n>0){
		if (confirm("Czy na pewno chcesz usunąć " + n + " profili z koszyka?")){
			GM_setValue("koszykPRO", "")
		}
	}
}

function czyEnter(e){
	if (e.keyCode == 13){
		dodajProfil()
	}
}



function $(name){
	return document.getElementById(name);
}

function newElem(type){
	return document.createElement(type)
}

function openInNewWindow() {
	// Change "_blank" to something like "newWindow" to load all links in the same new window
	//var newWindow = window.open(this.getAttribute('href'), '_blank');
	var newWindow = window.open(this.innerHTML, '_blank');
	//newWindow.focus();
	return false;
}


///////////////////////////////////////////////////////////////
// credits: http://www.quirksmode.org/js/cookies.html 

// funkcja pozwala na obejście zabezpieczneń funkcji GM_*
// http://wiki.greasespot.net/0.7.20080121.0_compatibility

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}

