// ==UserScript==
// @id             www.bdsmlife.cz-55f31ce5-8c29-4d02-80f0-b7da16d66787@scriptish
// @name           BDSMLife.cz
// @version        0.7
// @author         one4you
// @description    Snaha o vylepšení fajn portálu s bdsm tématikou
// @include        http://www.bdsmlife.cz/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

// Zdroják pro kompresi LZW http://rosettacode.org/wiki/LZW_compression#JavaScript

// To Do:
// Ukládání dotazníku (zkusit grafy)
// Filtrování podle uživatele
// Zobrazení žádostí o přátelství

var scriptSource = "";
var styleSource = "";
var i, userInject, elements, source, storageValue, storageKey;
var locationHref = location.href.match(/www\.bdsmlife\.cz(\/.*)/)[1];

// Diskuze
if (locationHref.search(/^\/diskuze\.htm/) != "-1") {
	// Skok v diskuzích na poslední stranu
	if (locationHref.search(/^\/diskuze\.htm\?t=/) != "-1" && locationHref.search(/\&pg=/) == "-1") {
		if (elements = document.querySelector('a[class=pg]')) {
			location.href = elements.href;
			}
		}

	// V diskuzích nahradí entity uvozovek za uvozovky
	elements = document.querySelectorAll('div[class=txt]');
	for (i=0; i<elements.length; i++) {
		elements[i].innerHTML = elements[i].innerHTML.replace(/\&amp\;quot\;/g, "\"").replace(/\&amp\;/g, "&");
		}

	styleSource += " \
	/* Odstraní průhlednost u starých postů a zarovnání zprava */ \
	#diskuze .oldpost { \
		opacity: 1; \
		text-align: start; \
		} \
	/* Menší mezery mezi posty */ \
	#diskuze .prispevek { \
		margin-top: 20px; \
		}";
	}

// Hlavní strana
else if (locationHref == "/") {
	// Přidání tlačítek odeslané a příchozí pošty na hlavní stranu
	var injectMailBtn = document.createElement('span');
	injectMailBtn.innerHTML = '<input class="btn16 income" type="button" \
			onclick="window.location.href=\'zpravy.htm\';" value="Přijaté"> \
		<input class="btn16 sent" type="button" \
			onclick="window.location.href=\'zpravy.htm?box=out\';" value="Odeslané">';
	var injectMail = document.querySelector('table[class=vypis]');
	injectMail.parentNode.insertBefore(injectMailBtn, injectMail);
	styleSource += " \
		/* Přidanná tlačítka pro přijatou a odelsanou poštu */ \
		.income { \
			background-image: url('img/bk/btn_income.png'); \
			} \
		.sent { \
			background-image: url('img/bk/btn_sent.png'); \
			} \
		#uvod .online a { \
			white-space: pre; \
			}";

	// Doplnění dialogu o skrývání předchozího zobrazeného dialogu
	scriptSource += "function ShowDialog(dialog, pozice_k, off_x, off_y) { \
		if (dialog.length < 1) { return; }; \
		if (window.lastShownDialog && window.lastShownDialog != dialog) { \
			document.getElementById(window.lastShownDialog).style.display='none' \
			}; \
		if (document.getElementById(dialog).style.display!='block'){ \
			var dd = document.getElementById(dialog); \
			AssignPosition(dd); \
			dd.style.top=(getElementPosition(pozice_k).top+off_y)+'px'; \
			dd.style.left=(getElementPosition(pozice_k).left+off_x)+'px'; \
			dd.style.display='block'; \
			} \
		else { HideDialog(dialog); }; \
		window.lastShownDialog = dialog; \
		}";
	
	// Načte přátele
	elements = document.querySelectorAll('div[class=pr_box] > div[class=pratele]');
	for (i=0; i<elements.length; i++) {
		localStorage.setItem("BDSM_friend-" + elements[i].querySelector('a').href.match(/uzivatel-([0-9]+)\.htm/)[1], elements[i].querySelector('img').src);
		}
	
	// Načte kraj uživatele
	localStorage.setItem("BDSM_kraj", document.querySelector('select[name=kraj] > option[selected=selected]').value)
	}

// Fotky
else if (locationHref.search(/^\/fotka\.htm/) != "-1") {
	// Nahradí hvězdičkové, javascriptové hodnocení za css
	var fotkaHodnoceni = document.getElementById('fotka-hodnoceni')
	source = "<ul id='hvezda_hodnoceni' class='hvezda_hodnoceni'> \
			<li id='hvezda_aktualni' class='hvezda_aktualni' \
				style='width:" + document.getElementById("ts1").value * 25 + "px;'></li> \
			<li><span class='hvezda_1' onclick='ajaxFotkyHodnoceni(this.className)'></span></li> \
			<li><span class='hvezda_2' onclick='ajaxFotkyHodnoceni(this.className)'></span></li> \
			<li><span class='hvezda_3' onclick='ajaxFotkyHodnoceni(this.className)'></span></li> \
			<li><span class='hvezda_4' onclick='ajaxFotkyHodnoceni(this.className)'></span></li> \
			<li><span class='hvezda_5' onclick='ajaxFotkyHodnoceni(this.className)'></span></li> \
		</ul> \
		<div id='celkove_hodnoceni'>" + fotkaHodnoceni.innerHTML.match(/(Celkové hodnocení: .*?\))/)[1] + "</div>"
	fotkaHodnoceni.innerHTML = source
	
	// Není element "fotka-popis" (exif informace) a proto se musí vytvořit
	if (!document.getElementById("fotka-popis")) {
		var elementFotkaPopis = document.createElement("div");
		elementFotkaPopis.setAttribute("id", "fotka-popis");
		elementFotkaPopis.appendChild(document.body.childNodes[5].childNodes[8]);
		document.body.childNodes[5].replaceChild(elementFotkaPopis, document.body.childNodes[5].childNodes[8]);
		}
	
	// Nahrazení nahodilých fotek celým seznamem, který pomocí ajaxu přepíná fotky
	var url = "http://www.bdsmlife.cz/fotky.htm?user=" + document.body.querySelectorAll('a[id^="urec"]')[0].href.match(/uzivatel-([0-9]+)\.htm$/)[1];
	function parseFotky(response) {
		response = response.replace(/.*<div id=\"mojefotky\">/, '').replace(/<div id=\"maly\">.*/, '');
		response = response.replace(/<input id=\"popisf?_[0-9]+\" value=\"/g, '').replace(/\" autocomplete=\"off\".*?<\/div>[ \t]+<\/div>/g, '</div></div>');
		response = response.replace(/<a href/g, '<a onclick="return ajaxFotky(this.href)" href').replace(/href="\?user/g, 'href="http://www.bdsmlife.cz/fotky.htm?user');
		document.getElementById('fotka-dalsifotky').innerHTML = "<h6>" + document.getElementById('urec1_0').parentNode.innerHTML + "</h6>" + response;
		}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			parseFotky(xmlhttp.responseText.replace(/[\n\r]+/g, ''));
			};
		};
	xmlhttp.open('GET',url , true);
	xmlhttp.send();
	
	styleSource += " \
		/* další fotky budou scrollovací */ \
		#fotka { \
			text-align: center; \
			} \
		#fotka-dalsifotky { \
			margin-left: 540px; \
			max-height: 750px; \
			width: 250px; \
			overflow-y: auto; \
			position: absolute; \
			text-align: center; \
		} \
		#fotofrm .fotka .popis { \
			border-style: none none solid; \
			border-width: 0 0 1px; \
			width: 210px; \
			margin-bottom: 15px; \
			text-align: center; \
		} \
		/* hvezda hodnoceni */ \
		.hvezda_hodnoceni { \
			list-style:none; \
			margin-left: 185px; \
			padding:0px; \
			width: 125px; \
			height: 25px; \
			position: relative; \
			background: url(data:image/gif;base64,R0lGODlhGQAZAHAAACwAAAAAGQAZAIb////+/v79/f36+fr29fX4+Pj9/Pz5+fnu7e3p6Ojo5ub09PTj4OH8/Pzj4eL7+/vs6+vo5+jm5eb29fbe3N36+vrf3N3y8fLg3t/v7u7c29zs7Oz19fX39/ft7e3a19jg3t7b2NnZ19fc2tri4ODr6urz8/Ph4ODX1dXd29vn5eb6+fn5+Pnt6+z39vfm5OX08/Tt7O3f3t7r6uvk4uP49/ft7Oz5+Pjc2tvy8vLy8fHq6enx8fHd2tvd2trv7+/m5eXq6erw7+/x8PDi4OH8+/vn5ube29v29vb08/Pd29zk4uLl4+Pl5OXw7/Dn5ufw7u/7+voAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHf4AAgoOEhYaHiImKhRkMDBmLiRkUAI2RiBmQABSal4OThJyen5SkmZCdhqcoqZsoFK+crZkUtaWKoqatipaCA7mek6mgwcCCMMSRxoTCi6y8y4XPkpm41dTQigfXidGhqbDcFAeS44K1mUvolbvfm5kLn828EZwrqsGj+vv8AIEAOw==) top left repeat-x; \
			} \
		.hvezda_hodnoceni li { \
			height:25px; \
			float: left; \
			} \
		.hvezda_hodnoceni li span { \
			width:25px; \
			height: 25px; \
			z-index: 20; \
			position: absolute; \
			} \
		.hvezda_hodnoceni li span:hover { \
			background: url(data:image/gif;base64,R0lGODlhGQAZAHAAACwAAAAAGQAZAIf////9/f35+Pj29vb6+vr+/v7s6+vk4+Pt7Oz49/f7+/vv7u/z8vL5+fnb2Nnv7+/i4OHv7u7g3t/8/Pzt7e3n5eb97+X5wJn+9/L9/Pz39/ff3d719PT5tYL1iDb4+Pja19j09PT19fXo5+jZ1tf++PP2jzn2kDr2kjr95M7U0dHc2tvg39/s7Ozz8/Ph4ODX1dXZ19fx8fH7y573lz73mT/4qFj+8+fy8fHy8fL08/Pr6uvr6ur5+Pnt6+zl4+P71az4pU74oEL4oUP4okT4pEX4pUX5pkb6uWn6v3X94Lr6+fnw7+/7y5b4qE/5qEf5qkj5rEn6rUr6sEv6sEz6skz82Kb8+/vl4+Ty8vLq6en39vf5r1P5rUr6rkr7tE77uVH8xnL++vT08/Tj4uLw7/D+8N37vm34nUH1izf1hjX5qlH/+/Pi4eHg3t73o172lDz94sT29fbf3d3h39/7t0/95L3m5OXi4OLu7u78vFP8v1T8w1f9xln+3pjx8PD9yFr9y1z9zl790F/+0mD+13Pc2trj4eL+1Gn+7sP+8M3+4pvm5eX+3Yf+/PXw8PD++ejn5ubd3Nzu7e3p6Ojn5ufw7u/z8vMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI/wABCBxIsKDBgwh/SMqDsCHBPAxVMHSIMI8kgRZ7UDyYZ8SNCzcW3tj4UNKNDmo6jCGRZ0yeBhMbQryopmYKPCpISNoJ0eDMnHmaoKhRwwYbjHl69Bx4w2LPG0CMSJ2KAgkSJQIvDoQpsMmTGlOnPqkz1gqAhQRdjgGw5onbJ3reGqmjB8nZmAMtjjGDxAiKmjVRCDa6E2GDwm8EEzUC1ogSpw3HFA47t0qdRIUd5lEBAK4ePYBA6/EjGa/Pi4BSp0ZEiFChs2sbHgYAiBAiRQAULRo0CMDSiiMANFrkO8aIBgCO/uYYHEADMgtH8PRtuqBL3wtDOA+RhxKZ6j47vg8sqJ1kgxDISapfz769+oAAOw==) left; \
			z-index: 2; \
			left: 0px; \
			border:none; \
			} \
		.hvezda_hodnoceni span.hvezda_1 { left: 0px; } \
		.hvezda_hodnoceni span.hvezda_2 { left:25px; } \
		.hvezda_hodnoceni span.hvezda_3 { left: 50px; } \
		.hvezda_hodnoceni span.hvezda_4 { left: 75px; } \
		.hvezda_hodnoceni span.hvezda_5 { left: 100px; } \
		.hvezda_hodnoceni span.hvezda_1:hover { width:25px; } \
		.hvezda_hodnoceni span.hvezda_2:hover { width: 50px; } \
		.hvezda_hodnoceni span.hvezda_3:hover { width: 75px; } \
		.hvezda_hodnoceni span.hvezda_4:hover { width: 100px; } \
		.hvezda_hodnoceni span.hvezda_5:hover { width: 125px; } \
		.hvezda_hodnoceni li.hvezda_aktualni{ \
			background: url(data:image/gif;base64,R0lGODlhGQAZAHAAACwAAAAAGQAZAIf////9/f36+fr29fX5+fn9/Pz+/v7u7e3k4uLo5+j29fb09PTg3t7z8/Pk4+Pl5OX4+Pj7+/vs6+vX1dXx8PDf3N36+vr+7r/+9djf3d719fXt7Oz++ej+yzX+z0P/+/Pi4OHw7+/b2Nn/55z/0Dv/33nW09Tc2trm5eXw7/Dy8fLx8fHq6eng39/U0dHW1NT+1kr+1D/+1UH+77jy8vLu7O3n5ub6+fne3N3n5eb+5on+10P+2EX+2kf+4mr+5Hb+6Y3+7ab+/fPt6+zr6ur29vb++Nz+6pf+20j+3En+3Ur+3kv+3kz+4E3+4U7+99P8+/vh39/8/Pz39vf+54L+4lD+5FL+75Tm5OT08/Tj4uL+53H94E/91Eb+0EP+xzz+yT79wDb9wjnl4+P+2Xn+xTv+zEH+1FHk4uPh3+Dj4eL+3X3+0UX+1Ej+2Uz+3E7+4WXt7e3z8vLc29z+31H+4VP+41X+5Vf+6Fn+6lv+/Orv7+/+8qv+7F3+7V7+71/+8WH+8mH+82L++sT19PT+95z+9Gz++bH++rr+9oD+9GPf3t7+95P+/vXv7u7+/OHe29v5+Pj49/fy8fH39/fw7u7z8vP49/j5+PkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI/wABCBxIsKDBgwcd4UCAsCFBhQpxOHToyJFAFxYnGlQoYAYGiBoLKsTQwYweHAkyaqwowlGQDh1KAHCBA0fFihsr4nDhQo+ZHj9nZLF4M+XDmjYB6NHRo2lTOCV0HNEDwBFDgQoFPgIC56fTrz3oPAKQdKCjLAC2NKXT1ElTPHDxACGrEisOtFvYmjHTIUzfkoDoHsxSE0CJDmJK7l0M4AEOAggjGt57xgydy3Bm1jVI+EEQLpdDwz25uSCBBFmCAKIDqLXrQY4eODzt6JBrRIgStT5EuLTZu7oLVXVEQM+hsRIbEoash4BjxwkgD1eeHCKB6wmyD5141hFq6ZCvEw9AOzuL+JDo06tfD0C6w4AAOw==) left; \
			position: absolute; \
			} \
		/* Centrování hodnocení fotky */ \
		div#fotka-hodnoceni { \
			font-size: 10pt; \
			line-height: 1; \
			} \
		/* Celkové hodnoceni fotky */ \
		#fotka-hodnoceni span { \
			font-size: 12pt; \
			}"
	
	scriptSource += "var ajaxFotkyH1 = document.getElementsByTagName('h1')[0]; \
		var ajaxFotkyFotka = document.getElementById('fotka'); \
		var ajaxFotkyAktualniHodnoceni = document.getElementById('hvezda_aktualni'); \
		var ajaxFotkyCelkoveHodnoceni = document.getElementById('celkove_hodnoceni'); \
		var ajaxFotkyPopis = document.getElementById('fotka-popis'); \
		function ajaxFotky(url) { \
			function parseAjaxFotky(response) { \
				ajaxFotkyH1.innerHTML = response.match(/<h1>(.*?)<.h1>/)[1]; \
				ajaxFotkyFotka.innerHTML = response.match(/<div id=\"fotka\">(.*?)<.div>/)[1]; \
				var fotka_popis = response.match(/<div id=\"fotka-popis\">(.*?)<.div>/); \
				ajaxFotkyPopis.innerHTML = fotka_popis ? fotka_popis[1] : 'V souboru nejsou žádné EXIF informace.'; \
				ajaxFotkyCelkoveHodnoceni.innerHTML = response.match(/(Celkové hodnocení: .*?\\))/)[1]; \
				response = response.match(/function setvalue.*?if.zapis..1.*?setvalue..s1..([0-9]).*?<.script>/); \
				ajaxFotkyAktualniHodnoceni.style.width = response ? response[1] * 25 + 'px' : '0px'; \
				}; \
			function parseAjaxSlozky(response) { \
				response = response.replace(/.*<div id=\"mojefotky\">/, '').replace(/<div id=\"maly\">.*/, ''); \
				response = response.replace(/<input id=\"popisf?_[0-9]+\" value=\"/g, '').replace(/\" autocomplete=\"off\".*?<\\/div>[ \\t]+<\\/div>/g, '</div></div>'); \
				response = response.replace(/<a href/g, '<a onclick=\"return ajaxFotky(this.href)\" href').replace(/href=..user/g, 'href=\"http://www.bdsmlife.cz/fotky.htm?user'); \
				document.getElementById('fotka-dalsifotky').innerHTML = '<h6>' + document.getElementById('urec1_0').parentNode.innerHTML + '</h6>' + response; \
				}; \
			var xmlhttp = new XMLHttpRequest(); \
			xmlhttp.onreadystatechange = function() { \
				if (xmlhttp.readyState==4 && xmlhttp.status==200) { \
					url.search(/\&fld=[0-9]+/) == '-1' ? parseAjaxFotky(xmlhttp.responseText.replace(/[\\n\\r]+/g, '')) : parseAjaxSlozky(xmlhttp.responseText.replace(/[\\n\\r]+/g, '')); \
					}; \
				}; \
			xmlhttp.open('GET', url, true); \
			xmlhttp.send(); \
			return false; \
			}; \
		function ajaxFotkyHodnoceni(hodnota) { \
			var fotkaRegExp = 'href=\\\\\"fotka.htm\\\\?p=([0-9]+\\\\.' + document.getElementById('fotka').innerHTML.match(/users\\/photos\\/(.*?)\\.jpg/)[1] + ')\\\\\"'; \
			var fotkaId = document.getElementById('fotka-dalsifotky').innerHTML.match(fotkaRegExp); \
			if (fotkaId) { \
				var xmlhttp = new XMLHttpRequest(); \
				xmlhttp.open('GET', 'http://www.bdsmlife.cz/scr/dom.php?akce=votephoto&photo=' + fotkaId[1].match(/^([0-9]+)\./)[1] + '&hodnoceni=' + hodnota.replace(/hvezda_/, '') + '&r', true); \
				xmlhttp.send(); \
				ajaxFotky('http://www.bdsmlife.cz/fotka.htm?p=' + fotkaId[1]); \
				} \
			else { \
				ajaxFotkyCelkoveHodnoceni.innerHTML = 'Omlouvám se, ale nejprve budete muset fotku najít v příslušné složce,<br>než ji budete moci ohodnotit.<br><br>(Mohl bych to udělat jinak, ale nechci přetěžovat server).'; \
				}; \
			}";
	}

// Chat
else if (locationHref.search(/^\/chat\.htm/) != "-1") {
	if (document.getElementById('chatokno')) {
		// Doplnění popisu
		//elements = document.getElementById("chat").querySelector('div[class=info]');
		//elements.innerHTML = elements.innerHTML + "<br><br>Pokud chceš skrýt zprávy některého uživatele klikni jednou na ikonku píšící ruky u jeho jména.<br>Dvojíté kliknutí zprávy opět zobrazí. Takto je možné blokovat i zprávy servru o příchozích/odchozích uživatelích.<br>Telefonní sluchátko nahrazuje předchozí ikonku pro šepot ve vlastním okně a graficky zvýrazňuje zvoleného uživatele."
		
		// Přepsání chatu do ajaxu
		scriptSource += " \
			document.querySelector('div[id=body]').innerHTML = \" \
				<div id='vstup'> \
					<div class='boxvetsi'> \
						<div style='margin-right: 90px;'> \
							<textarea id='txtp' onkeypress='if(event.keyCode==13){addChatMsg();}'></textarea> \
						</div> \
					</div> \
					<div class='boxmensi' style='width: 80px;'> \
						<input id='txtb' class='btn16'type='button' onclick='addChatMsg();' value='Odeslat'> \
					</div> \
					<div class='panel'> \
						<span class='smajlici'> \
							\" + document.querySelector('input[id=txtb] + div').innerHTML + \" \
						</span> \
						<span class='ipanel'> \
							<div class='l'>Zpráva pro:</div><div class='r'><span id='upro'>všechny</span><span id='uprol'></span></div> \
							<input type='hidden' id='uproi' /> \
							<div class='l'>Šeptání:</div><div class='r' id='sept'>ne</div> \
							<input type='hidden' id='septi' /> \
						</span> \
						<span class='tlacitka'> \
							<input id='play' type='button' class='btn16 volume' onclick='volume(this);' value='&#9836; Zvuk'> \
							<input type='button' class='btn16 btnmaximize' onclick='maximalizovat(this);' value='Maximalizovat'> \
							<input type='button' class='btn16 hlaseni' onclick='nahlasit();' value='Nahlásit'> \
							<input type='button' class='btn16 leave' onclick='window.location.href=\\\"?e=2\\\";' value='Odejít'> \
						</span> \
					</div> \
				</div> \
				<div class='boxvetsi'> \
					<div id='chatokno' style='margin-right: 250px;'></div> \
				</div> \
				<div class='boxmensi' style='width: 250px;'> \
					<div id='chatusers'></div> \
				</div> \
				\"; \
			var uzivatel = document.querySelector('span[class=uzivatel] > a').href.match(/uzivatel-([0-9]+)\.htm/)[1]; \
			var chatText = ''; \
			var chatOkno = document.getElementById('chatokno'); \
			var chatUsers = document.getElementById('chatusers'); \
			var storageValue; \
			function maximalizovat(element) { \
				document.querySelector('body').className = (element.value == 'Maximalizovat') ? (element.value = 'Minimalizovat', 'chatmaxim') : (element.value = 'Maximalizovat', ''); \
				}; \
			function volume(e) { \
				e.id = (e.id == 'play') ? 'mute' : 'play'; \
				}; \
			function nahlasit() { \
				if (confirm('Chceš nahlásit nevhodné chování na chatu?\\n\
				Kliknutím na OK odešleš otisk obrazovky na prozkoumání administrátorovi, který zkontroluje dodržování pravidel a slušného chování.')) { \
					hlasit(); \
					}; \
				}; \
			function chatClick(e) { \
				if (e.target.tagName == 'A') { \
					setFor(e.target.id, e.target.textContent); \
					} \
				else if (e.target.className == 'sepot') { \
					window.open('chatokno.htm?w=' + e.target.id.match(/sepot-([0-9]+)/)[1], 'usrw' + e.target.id.match(/sepot-([0-9]+)/)[1], 'height=400,width=500'); \
					} \
				else if (e.target.className == 'mute') { \
					var userInject = document.createElement('style'); \
					userInject.setAttribute('type', 'text/css'); \
					userInject.textContent = ' \
						#chatokno #zprava-' + e.target.id.match(/mute-([0-9]+)/)[1] + ' { display: none; } \
						#chatusers span#' + e.target.id + ' { color: red; }'; \
					document.body.appendChild(userInject); \
					}; \
				}; \
			function chatDblClick(e) { \
				if (e.target.tagName == 'A') { \
					setForS(e.target.id, e.target.textContent); \
					} \
				else if (e.target.className == 'mute') { \
					document.getElementById('txtp').focus(); \
					var userInject = document.createElement('style'); \
					userInject.setAttribute('type', 'text/css'); \
					userInject.textContent = ' \
						#chatokno #zprava-' + e.target.id.match(/mute-([0-9]+)/)[1] + ' { display: block; } \
						#chatusers span#' + e.target.id + ' { color: black; }'; \
					document.body.appendChild(userInject); \
					}; \
				}; \
			chatUsers.addEventListener('click', chatClick, false); \
			chatUsers.addEventListener('dblclick', chatDblClick, false); \
			function ajaxChat(url, parser) { \
				var xmlhttp = new XMLHttpRequest(); \
				xmlhttp.onreadystatechange = function() { \
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { \
						parser(xmlhttp.responseText) \
						}; \
					}; \
				xmlhttp.open('GET', url, true); \
				xmlhttp.send(); \
				}; \
			function getChatMsgs() { ajaxChat('http://www.bdsmlife.cz/scr/dom.php?akce=getchatmessages', getChatMsgsParse); }; \
			function getChatUsers() { ajaxChat('http://www.bdsmlife.cz/scr/dom.php?akce=getchatusers', getChatUsersParse); }; \
			clearInterval(stchu); \
			clearInterval(stchm); \
			(function loop() { \
				setTimeout(function(){ \
					getChatMsgs(); \
					loop(); \
				}, 5000); \
				})(); \
			(function loop() { \
				setTimeout(function(){ \
					getChatUsers(); \
					loop(); \
				}, 15000); \
				})(); \
			var snd = new Audio('data:audio/wav;base64,UklGRhwMAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0Ya4LAACAgICAgICAgICAgICAgICAgICAgICAgICAf3hxeH+AfXZ1eHx6dnR5fYGFgoOKi42aloubq6GOjI2Op7ythXJ0eYF5aV1AOFFib32HmZSHhpCalIiYi4SRkZaLfnhxaWptb21qaWBea2BRYmZTVmFgWFNXVVVhaGdbYGhZbXh1gXZ1goeIlot1k6yxtKaOkaWhq7KonKCZoaCjoKWuqqmurK6ztrO7tbTAvru/vb68vbW6vLGqsLOfm5yal5KKhoyBeHt2dXBnbmljVlJWUEBBPDw9Mi4zKRwhIBYaGRQcHBURGB0XFxwhGxocJSstMjg6PTc6PUxVV1lWV2JqaXN0coCHhIyPjpOenqWppK6xu72yxMu9us7Pw83Wy9nY29ve6OPr6uvs6ezu6ejk6erm3uPj3dbT1sjBzdDFuMHAt7m1r7W6qaCupJOTkpWPgHqAd3JrbGlnY1peX1hTUk9PTFRKR0RFQkRBRUVEQkdBPjs9Pzo6NT04Njs+PTxAPzo/Ojk6PEA5PUJAQD04PkRCREZLUk1KT1BRUVdXU1VRV1tZV1xgXltcXF9hXl9eY2VmZmlna3J0b3F3eHyBfX+JgIWJiouTlZCTmpybnqSgnqyrqrO3srK2uL2/u7jAwMLFxsfEv8XLzcrIy83JzcrP0s3M0dTP0drY1dPR1dzc19za19XX2dnU1NjU0dXPzdHQy8rMysfGxMLBvLu3ta+sraeioJ2YlI+MioeFfX55cnJsaWVjXVlbVE5RTktHRUVAPDw3NC8uLyknKSIiJiUdHiEeGx4eHRwZHB8cHiAfHh8eHSEhISMoJyMnKisrLCszNy8yOTg9QEJFRUVITVFOTlJVWltaXmNfX2ZqZ21xb3R3eHqAhoeJkZKTlZmhpJ6kqKeur6yxtLW1trW4t6+us7axrbK2tLa6ury7u7u9u7vCwb+/vr7Ev7y9v8G8vby6vru4uLq+tri8ubi5t7W4uLW5uLKxs7G0tLGwt7Wvs7avr7O0tLW4trS4uLO1trW1trm1tLm0r7Kyr66wramsqaKlp52bmpeWl5KQkImEhIB8fXh3eHJrbW5mYGNcWFhUUE1LRENDQUI9ODcxLy8vMCsqLCgoKCgpKScoKCYoKygpKyssLi0sLi0uMDIwMTIuLzQ0Njg4Njc8ODlBQ0A/RUdGSU5RUVFUV1pdXWFjZGdpbG1vcXJ2eXh6fICAgIWIio2OkJGSlJWanJqbnZ2cn6Kkp6enq62srbCysrO1uLy4uL+/vL7CwMHAvb/Cvbq9vLm5uba2t7Sysq+urqyqqaalpqShoJ+enZuamZqXlZWTkpGSkpCNjpCMioqLioiHhoeGhYSGg4GDhoKDg4GBg4GBgoGBgoOChISChISChIWDg4WEgoSEgYODgYGCgYGAgICAgX99f398fX18e3p6e3t7enp7fHx4e3x6e3x7fHx9fX59fn1+fX19fH19fnx9fn19fX18fHx7fHx6fH18fXx8fHx7fH1+fXx+f319fn19fn1+gH9+f4B/fn+AgICAgH+AgICAgIGAgICAgH9+f4B+f35+fn58e3t8e3p5eXh4d3Z1dHRzcXBvb21sbmxqaWhlZmVjYmFfX2BfXV1cXFxaWVlaWVlYV1hYV1hYWVhZWFlaWllbXFpbXV5fX15fYWJhYmNiYWJhYWJjZGVmZ2hqbG1ub3Fxc3V3dnd6e3t8e3x+f3+AgICAgoGBgoKDhISFh4aHiYqKi4uMjYyOj4+QkZKUlZWXmJmbm52enqCioqSlpqeoqaqrrK2ur7CxsrGys7O0tbW2tba3t7i3uLe4t7a3t7i3tre2tba1tLSzsrKysbCvrq2sq6qop6alo6OioJ+dnJqZmJeWlJKSkI+OjoyLioiIh4WEg4GBgH9+fXt6eXh3d3V0c3JxcG9ubWxsamppaWhnZmVlZGRjYmNiYWBhYGBfYF9fXl5fXl1dXVxdXF1dXF1cXF1cXF1dXV5dXV5fXl9eX19gYGFgYWJhYmFiY2NiY2RjZGNkZWRlZGVmZmVmZmVmZ2dmZ2hnaGhnaGloZ2hpaWhpamlqaWpqa2pra2xtbGxtbm1ubm5vcG9wcXBxcnFycnN0c3N0dXV2d3d4eHh5ent6e3x9fn5/f4CAgIGCg4SEhYaGh4iIiYqLi4uMjY2Oj5CQkZGSk5OUlJWWlpeYl5iZmZqbm5ybnJ2cnZ6en56fn6ChoKChoqGio6KjpKOko6SjpKWkpaSkpKSlpKWkpaSlpKSlpKOkpKOko6KioaKhoaCfoJ+enp2dnJybmpmZmJeXlpWUk5STkZGQj4+OjYyLioqJh4eGhYSEgoKBgIB/fn59fHt7enl5eHd3dnZ1dHRzc3JycXBxcG9vbm5tbWxrbGxraWppaWhpaGdnZ2dmZ2ZlZmVmZWRlZGVkY2RjZGNkZGRkZGRkZGRkZGRjZGRkY2RjZGNkZWRlZGVmZWZmZ2ZnZ2doaWhpaWpra2xsbW5tbm9ub29wcXFycnNzdHV1dXZ2d3d4eXl6enp7fHx9fX5+f4CAgIGAgYGCgoOEhISFhoWGhoeIh4iJiImKiYqLiouLjI2MjI2OjY6Pj46PkI+QkZCRkJGQkZGSkZKRkpGSkZGRkZKRkpKRkpGSkZKRkpGSkZKRkpGSkZCRkZCRkI+Qj5CPkI+Pjo+OjY6Njo2MjYyLjIuMi4qLioqJiomJiImIh4iHh4aHhoaFhoWFhIWEg4SDg4KDgoKBgoGAgYCBgICAgICAf4CAf39+f35/fn1+fX59fHx9fH18e3x7fHt6e3p7ent6e3p5enl6enl6eXp5eXl4eXh5eHl4eXh5eHl4eXh5eHh3eHh4d3h4d3h3d3h4d3l4eHd4d3h3eHd4d3h3eHh4eXh5eHl4eHl4eXh5enl6eXp5enl6eXp5ent6ent6e3x7fHx9fH18fX19fn1+fX5/fn9+f4B/gH+Af4CAgICAgIGAgYCBgoGCgYKCgoKDgoOEg4OEg4SFhIWEhYSFhoWGhYaHhoeHhoeGh4iHiIiHiImIiImKiYqJiYqJiouKi4qLiouKi4qLiouKi4qLiouKi4qLi4qLiouKi4qLiomJiomIiYiJiImIh4iIh4iHhoeGhYWGhYaFhIWEg4OEg4KDgoOCgYKBgIGAgICAgH+Af39+f359fn18fX19fHx8e3t6e3p7enl6eXp5enl6enl5eXh5eHh5eHl4eXh5eHl4eHd5eHd3eHl4d3h3eHd4d3h3eHh4d3h4d3h3d3h5eHl4eXh5eHl5eXp5enl6eXp7ent6e3p7e3t7fHt8e3x8fHx9fH1+fX59fn9+f35/gH+AgICAgICAgYGAgYKBgoGCgoKDgoOEg4SEhIWFhIWFhoWGhYaGhoaHhoeGh4aHhoeIh4iHiIeHiIeIh4iHiIeIiIiHiIeIh4iHiIiHiIeIh4iHiIeIh4eIh4eIh4aHh4aHhoeGh4aHhoWGhYaFhoWFhIWEhYSFhIWEhISDhIOEg4OCg4OCg4KDgYKCgYKCgYCBgIGAgYCBgICAgICAgICAf4B/f4B/gH+Af35/fn9+f35/fn1+fn19fn1+fX59fn19fX19fH18fXx9fH18fXx9fH18fXx8fHt8e3x7fHt8e3x7fHt8e3x7fHt8e3x7fHt8e3x7fHt8e3x8e3x7fHt8e3x7fHx8fXx9fH18fX5+fX59fn9+f35+f35/gH+Af4B/gICAgICAgICAgICAgYCBgIGAgIGAgYGBgoGCgYKBgoGCgYKBgoGCgoKDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KCgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGBgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCAgICBgIGAgYCBgIGAgYCBgIGAgYCBgExJU1RCAAAASU5GT0lDUkQMAAAAMjAwOC0wOS0yMQAASUVORwMAAAAgAAABSVNGVBYAAABTb255IFNvdW5kIEZvcmdlIDguMAAA'); \
			";
		
		function getChatUsersParse(response) {
			elements = response.match(/(setForS.*?class=..)/g);
			elementsSource = "<a id='0'><b>Zprávy servru</b></a><span id='mute-0' class='mute' title='Klik: skryje zprávy uživatele, dvojitý klik: zobrazí zprávy'> &nbsp&#9997</span><br>";
			for (i = 0; i < elements.length; i++) {
				/* id, jméno, pohlaví */
				elementsParts = elements[i].match(/setForS..'([0-9]+).'..'(.*?).'.*?class=.(.*)/);
				userClass = elementsParts[3];
				userStyle = "white-space: pre; padding-right: 2px;";
				/* je v přátelích - přidej avatar a class*/
				if (storageValue = localStorage.getItem("BDSM_friend-" + elementsParts[1])) {
					userClass += " friendavatar";
					userStyle += " background-image: url(" + storageValue + ");";
					}
				/* Není v cache = nově příchozí */
				if (!localStorage.getItem("BDSM_" + elementsParts[1])) {
					userStyle += " font-style: italic;"
					}
				/* Je v cache, pokud je z kraje označ */
				else if (storageValue = localStorage.getItem('BDSM_mesto-' + elementsParts[1])) {
					if (storageValue == localStorage.getItem('BDSM_kraj')) {
						userStyle += " font-size: 17px;";
						}
					}
				elementsSource += "<a id='" + elementsParts[1] + "' \
					class='" + userClass + "' \
					style='" + userStyle + "' \
					onmouseover='getUser(" + elementsParts[1] + ", this.id);' \
					onmouseout='userTimer=setTimeout(\"HideDialog(userpanel);\",500);' \
					>" + elementsParts[2] + "</a> \
					<span id='sepot-" + elementsParts[1] + "' class='sepot' title='Otevřít šepot v novém okně'>&#9990</span> \
					<span id='mute-" + elementsParts[1] + "' class='mute' title='Klik: skryje zprávy uživatele, dvojitý klik: zobrazí zprávy'>&#9997</span><br>";
				}
			response = response.replace(/document.getElementById.*?innerHTML='/, "").replace(/';/, "").replace(/\\\\'/g, "'");
			chatUsers.innerHTML = "<h3>Uživatelé</h3>" + elementsSource;
			}
		scriptSource += getChatUsersParse.toString()

		function getChatMsgsParse(response) {
			// Neaktivní 30 minut
			if (response.search(/chat\.htm\?e=3/) != "-1") { window.location.href="chat.htm?e=3" };
			// Čas
			source = new Date();
			source = "<span class='cas'><span class='hidden'>" + source.toLocaleDateString() + " </span>" + source.toLocaleTimeString() + "</span>";
			
			//elementsChat = new RegExp(chatText.replace(/[\\\/\(\)\*\?\^\$]/g, ".") + ".*div>");
			elementsChat = new RegExp(chatText.replace(/[\\\/\(\)\*\?\^\$]/g, ".") + ".*");
			chatText = response.match(/(<div.*?div>)/)[1];
			if (elementsChat != "/.*/") {
				response = response.replace(elementsChat, "")
				}
			else { chatOkno.innerHTML = "" }
			
			if (response != "document.getElementById('chatokno').innerHTML='") {
				elements = response.match(/(<div.*?div>)/g)
				elementsSource = "";
				for (i = 0; i < elements.length; i++) {
						elementsSource += "<div id='zprava-" + elements[i].match(/setFor\(\\\'([0-9]+)\\\'/)[1] + "'>" + source + elements[i].replace(/\\\'/g, "'").replace(/<(\/?)div/g, "<$1span") + "</div>";
					};
				chatOkno.innerHTML = elementsSource + chatOkno.innerHTML;
				if ((document.querySelector('input[class$=volume]').id == 'play') && (elementsSource.search('class="prome') != '-1')) {
					snd.play();
					}
				};
			};
		scriptSource += getChatMsgsParse.toString()
		
		function setFor(id, user) {
			if (id == uzivatel) { return; }
			document.getElementById('uproi').value = id;
			document.getElementById('upro').innerHTML = user;
			if (id > 0) {
				document.getElementById('uprol').innerHTML = '&nbsp; &nbsp; <a href="javascript:void(0);" onclick="setFor(0,\'všechny\');" style="font-weight: normal;">odstranit</a>';
				}
			else {
				document.getElementById('uprol').innerHTML='';
				}
			document.getElementById('septi').value = 0;
			document.getElementById('sept').innerHTML = 'ne &nbsp;&nbsp; <a href="javascript:void(0);" onclick="setForS(\''+id+'\',\''+user+'\');" style="font-weight: normal;">šeptat</a>';
			document.getElementById('txtp').focus();
			document.styleSheets[0].deleteRule(99);
			document.styleSheets[0].insertRule('#chatusers span#sepot-' + id + ' { box-shadow: -2px -1px graytext, -2px -1px red inset; }', 99);
			document.getElementById('txtp').style.fontStyle = "normal";
			}
		scriptSource += setFor.toString()
		
		function setForS(id, user) {
			if (id == uzivatel) { return; }
			document.getElementById('uproi').value = id;
			document.getElementById('upro').innerHTML = user;
			if (id>0) {
				document.getElementById('uprol').innerHTML = '&nbsp; &nbsp; <a href="javascript:void(0);" onclick="setFor(0,\'všechny\');" style="font-weight: normal;">odstranit</a>';
				}
			else {
				document.getElementById('uprol').innerHTML = '';
				}
			document.getElementById('septi').value = 1;
			document.getElementById('sept').innerHTML = 'ano &nbsp;&nbsp; <a href="javascript:void(0);" onclick="setFor(\''+id+'\',\''+user+'\');" style="font-weight: normal;">nešeptat</a>';
			document.getElementById('txtp').focus();
			document.styleSheets[0].deleteRule(99);
			document.styleSheets[0].insertRule('#chatusers span#sepot-' + id + ' { color: red; box-shadow: -2px -1px red, -2px -1px graytext inset; }', 99);
			document.getElementById('txtp').style.fontStyle = "italic";
			}
		scriptSource += setForS.toString()
		
		styleSource += " \
			/* Upravení layoutu chatu */ \
			.boxvetsi { \
				float: left; \
				width: 100%; \
				} \
			.boxmensi { \
				float: right; \
				margin-left: -100%; \
				} \
			#chatusers { \
				line-height: 1.0; \
				overflow-x: hidden; \
				overflow-y: auto; \
				border: 1px solid #CCCCCC; \
				height: 710px; \
				margin-left: 10px; \
				padding: 0 10px 20px 10px; \
				} \
			#chatusers span.sepot { \
				font-size: 22px; \
				font-weight: bold; \
				padding: 0 3px 0 2px; \
				border-radius: 15px; \
				} \
			#chatusers span.mute { \
				font-size: 22px; \
				font-weight: bold; \
				} \
			/* Emoticons v chatu v normální velikosti */ \
			#chat #chatokno img { \
				max-width: 100%; \
				} \
			#chat .obsah > div { \
				position: absolute; \
				top: 55px; \
				height: 40px; \
				width: 91%; \
				} \
			#chatokno { \
				border: 1px solid #CCCCCC; \
				line-height: 2; \
				height: 710px; \
				overflow: auto; \
				padding: 10px; \
				text-align: left; \
				} \
			#chat .ipanel { \
				width: 400px;  \
				margin-top: 0px; \
				} \
			#chat .hlaseni { \
				margin-top: 5px; \
				} \
			#chat .leave { \
				margin: 0 2px; \
				} \
			#body > input.btnmaximize { \
				display: none; \
				} \
			.obsah > div > input.leave { \
				display: none; \
				} \
			#chat .info { \
				position: relative; \
				top: 555px; \
				} \
			.chatmaxim { \
				width: 95%; \
				min-width: 980px; \
				height: 100%; \
				min-height: 880px; \
				} \
			.chatmaxim #header .user { \
				width: 100%; \
				} \
			.chatmaxim #lpan { \
				display: none; \
				} \
			.chatmaxim #body { \
				width: inherit; \
				} \
			.chatmaxim #footer { \
				display: none; \
				} \
			.chatmaxim .obsah .info { \
				display: none; \
				} \
			.chatmaxim #chat .obsah > div { \
				width: 92%; \
				} \
			#vstup #txtp { \
				max-width: 100%; \
				min-width: 100%; \
				height: 30px; \
				margin-top: 3px; \
				} \
			#vstup #txtb { \
				background-image: url('img/bk/btn_send.png'); \
				} \
			.panel { \
				text-align: center; \
				} \
			.ipanel { \
				text-align: left; \
				float: left; \
				line-height: 1.5; \
				margin: 10px 0 10px 0; \
				width: 300px; \
				} \
			.ipanel .l { \
				float: left; \
				width: 120px; \
				} \
			.tlacitka { \
				float: right; \
				padding: 0 0 20px; \
				} \
			.tlacitka .hlaseni { \
				background-image: url('img/bk/btn_warn.png'); \
				} \
			.tlacitka .leave { \
				background-image: url('img/bk/btn_back.png'); \
				} \
			.tlacitka .volume { \
				font-size: 10pt; \
				padding: 2.5px 6px 5px 3px; \
				} \
			.tlacitka #mute { \
				text-decoration: line-through; \
				} \
.ipanel .l { \
	width: 70px; \
	} \
#chatokno a.f, #chatokno #chatmsg a.f { \
    color: #CC0000; \
    font-style: normal; \
    font-weight: bold; \
    margin-right: 10px; \
	} \
#chatokno a.m, #chatokno #chatmsg a.m { \
    color: #0000CC; \
    font-style: normal; \
    font-weight: bold; \
    margin-right: 10px; \
	} \
#chatokno .cizi { \
    color: #000000; \
    font-size: 11pt; \
	} \
#chatokno .odeme, #chatokno #chatmsg .odeme { \
    color: #669900; \
    font-size: 11pt; \
    font-weight: bold; \
	} \
#chatokno .prome, #chatokno #chatmsg .prome { \
    color: #FF3300; \
    font-size: 11pt; \
    font-weight: bold; \
	} \
#chatokno .septani { \
    font-style: italic; \
	} \
#chatokno .system { \
    color: #008800; \
    font-size: 9pt; \
	} \
#chatokno .cas { \
    font-family: Lucida Grande; \
    font-size: 8pt; \
    padding: 0 10px 0 0; \
	} \
#chatokno .cas .hidden { \
    display: none; \
	} \
#chatokno img { \
	max-height: 24px; \
	} \
#chatusers a.f { \
    color: #CC0000; \
    font-weight: bold; \
	} \
#chatusers a.m { \
    color: #0000CC; \
    font-weight: bold; \
	} \
#chatusers a img { \
    position: relative; \
    top: 2px; \
	} \
#chatusers h3 { \
    border-bottom: 2px solid #1E90FF; \
    margin: 10px 0 10px; \
	} \
			";
		}
	}

// Uživatel
else if (locationHref.search(/^\/uzivatel-/) != "-1") {
	// Odstranění překrytí hlavní fotky
	elements = document.querySelector('div[class=mainphoto]');
	elements.style.backgroundImage = "url(" + elements.querySelector('img').src + ")";
	storageKey = locationHref.match(/uzivatel-([0-9]+)\.htm/)[1];
	
	// Zapsání stavu uživatelských fotografií a inzerátů
	if (storageValue = JSON.parse(localStorage.getItem('BDSM_' + storageKey))) {
		storageValue.foto = (document.querySelector('div[class=nophoto]')) ? 0 : 1;
		storageValue.inzer = (document.querySelector('div[class=inzerat]')) ? 1 : 0;
		localStorage.setItem('BDSM_' + storageKey, JSON.stringify(storageValue));
		};
		
	styleSource += " \
		/* Odstranění překrytí fotky ve složce uživatele */ \
		#profilebody .mainpanel .photopanel .frame { \
			background-image: url(''); \
			} \
		/* Zaoblení hran fotografie */ \
		#profilebody .mainpanel .photopanel .mainphoto { \
			border-radius: 10px; \
			width: 250px; \
			height: 330px; \
			box-shadow: #000 0 2px 5px; \
			} \
		#profilebody .mainpanel .photopanel .mainphoto img { \
			opacity: 0; \
			} \
		/* Události uživatele scrollovací */ \
		#profilebody .udalosti #eventshandler { \
			max-height: 200px; \
			overflow-y: auto; \
			} \
		/* Nicky přátel se nebudou zalamovat, ale uříznou se */ \
		#profilebody .friends .flist a { \
			white-space: nowrap; \
			} \
		/* Panel přátel překryje fotografie */ \
		#profilebody .friends { \
			z-index: 3; \
			}";
	}

// Nadpis - vyčte ze stránky nadpis a zapíše ho do title
var elements = document.getElementsByTagName("H1")
if (elements[0]) {
	source = "BDSMLife.cz > " + elements[0].innerHTML
	elements = document.getElementsByTagName("H2")
	if (elements[0]) {
		source += " > " + elements[0].innerHTML
		}
	document.title = source.replace(/<.*?>/g, "")
	}

// Hlavní poznámky uživatele
scriptSource += "function poznamky(element) { \
	if (element.style.display == 'inline') { element.style.display = 'none'; } \
	else { \
		if (source = localStorage.getItem('BDSM_poznamky')) { \
			element.innerHTML = source; \
			} \
		element.style.display = 'inline'; \
		} \
	};";

// Funkce pro zálohování HTML5 localStorage
scriptSource += "function zaloha(element) { \
	if (element.style.display == 'inline') { \
		element.style.display = 'none'; \
		} \
	else { \
		var source = ''; \
		for (var i=0; i < localStorage.length; i++){ \
			storageKey = localStorage.key(i); \
			if (storageKey.search(/^BDSM_/) != '-1') { \
				/* Nezálohovat údaje vyčtené z první strany */ \
				if ((storageKey.search(/^BDSM_friend-/) == '-1') && (storageKey != 'BDSM_kraj')) { \
					source += '<k:' + storageKey + '><v:' + escape(localStorage.getItem(storageKey)) + '></k>' \
					} \
				} \
			} \
		/* Komprese */ \
		var i, c, wc, dictionary = {}, w = '', result = [], dictSize = 256; \
		for (i=0; i < 256; i++) { \
			dictionary[String.fromCharCode(i)] = i; \
			} \
		for (i=0; i < source.length; i++) { \
			c = source.charAt(i); \
			wc = w + c; \
			if (dictionary[wc]) { w = wc; } \
			else { \
				result.push(dictionary[w]); \
				dictionary[wc] = dictSize++; \
				w = String(c); \
				} \
			} \
		if (w !== '') { result.push(dictionary[w]); } \
		document.querySelector('textarea[class=zaloha_text]').textContent = JSON.stringify(result); \
		element.style.display = 'inline'; \
		} \
	};";

// Funkce pro obonovu zálohy HTML5 localStorage \
scriptSource += "function zalohaObnova() { \
    var source = JSON.parse(document.querySelector('textarea[class=zaloha_text]').value); \
    /* Dekomprese */ \
	var i, w, result, k, dictionary = [], entry = '', dictSize = 256; \
    for (i = 0; i < 256; i++) { \
        dictionary[i] = String.fromCharCode(i); \
		} \
    w = String.fromCharCode(source[0]); \
    result = w; \
    for (i = 1; i < source.length; i++) { \
        k = source[i]; \
        if (dictionary[k]) { \
            entry = dictionary[k]; \
        } else { \
            if (k === dictSize) { \
                entry = w + w.charAt(0); \
            } else { \
                break; \
            } \
        } \
        result += entry; \
        dictionary[dictSize++] = w + entry.charAt(0); \
        w = entry; \
		} \
    /* Parse */ \
	elements = result.match(/<k:.*?><\\/k>/g); \
    for (var i = 0; i < elements.length; i++) { \
        source = elements[i].match(/<k:(.*?)><v:(.*?)><\\/k>/); \
        localStorage.setItem(source[1], unescape(source[2])); \
        document.querySelector('span[class=zaloha]').style.display = 'none'; \
		} \
	};";

document.querySelector('div[id=header]').innerHTML = ' \
	<a href="/"><img src="img/header/logo.png" alt="BDSMLife" height="40" width="300"></a> \
	<span class="uzivatel"> \
		<img src="' + document.querySelectorAll('div[id=av] img')[0].src + '" height="40" width="40" style="float: right; margin-left: 6px;"> \
		' + document.querySelector('div[class=info]').innerHTML + ' \
	</span> \
	<span class="menu"> \
		<a class="btn" style="background-image: url(\'img/bk/btn_mailbox.png\');" href="zpravy.htm">Zprávy</a> \
		<a class="btn" style="background-image: url(\'img/bk/btn_profile.png\');" href="' + document.querySelectorAll('div[class=bottom] > a')[1].href + '">Profil</a> \
		<a class="btn" target="_blank" style="background-image: url(\'img/bk/btn_mujblog.png\');" href="' + document.querySelectorAll('div[class=bottom] > a')[2].href + '">Blog</a> \
		<a class="btn" style="background-image: url(\'img/bk/btn_dotaznik.png\');" href="javascript:void(0);" onclick="poznamky(document.querySelector(\'textarea[class=poznamky]\'));" title="Otevřít / Zavřít">Poznámky</a> \
		<a class="btn" style="background-image: url(\'img/bk/btn_ip.png\');" href="javascript:void(0);" onclick="zaloha(document.querySelector(\'span[class=zaloha]\'));" title="Otevřít / Zavřít">Záloha</a> \
		<a class="btn" style="background-image: url(\'img/bk/btn_logout2.png\');" href="/?logout=1">Odhlásit</a> \
	</span> \
	<textarea class="poznamky" onkeyup="localStorage.setItem(\'BDSM_poznamky\', this.value)">Napiš poznámku</textarea> \
	<span class="zaloha"> \
		<textarea class="zaloha_text"></textarea> \
		<input class="btn16 zaloha_btn" type="button" onclick="zalohaObnova();" value="Zapsat zálohu zpět do prohlížeče"> \
	</span>';

styleSource += " \
	#header { \
		text-align: center; \
		} \
	#header .menu { \
		position:relative; \
		top: 14px \
		} \
	#header .menu a.btn { \
		background-position: left center; \
		background-repeat: no-repeat; \
		padding: 8px 5px 8px 27px; \
		text-decoration: none; \
		} \
	#header .uzivatel { \
		float: right; \
		width: 225px; \
		text-align: right; \
		} \
	#header .uzivatel { \
		font-weight: bold; \
		line-height: 1.6; \
		} \
	#header .poznamky { \
		width: 99.5%; \
		min-width: 99.5%; \
		max-width: 99.5%; \
		height: 170px; \
		display: none; \
		background-color: #e1e1e1;  \
		position: relative; \
		z-index: 100; \
		} \
	#header .zaloha { \
		width: 99.5%; \
		min-width: 99.5%; \
		max-width: 99.5%; \
		height: 170px; \
		display: none; \
		background-color: #e1e1e1;  \
		position: relative; \
		z-index: 100; \
		} \
	#header .zaloha_text { \
		width: 99.5%; \
		min-width: 99.5%; \
		max-width: 99.5%; \
		height: 170px; \
		background-color: #e1e1e1;  \
		position: relative; \
		z-index: 100; \
		} \
	#header .zaloha_btn { \
		min-width: 99.5%; \
		max-width: 99.5%; \
		margin-top: 0px; \
		padding: 6px 6px 6px 6px; \
		} \
	";

// Doplní přátele o avatar, zobrazí nově příchozí
// a[id^=uk1_] je pro hlavní stranu, a[id^=urec1_] pro vše ostatní
elements = document.querySelectorAll('a[id^=urec1_], a[id^=uk1_]');
for (i=0; i<elements.length; i++) {
	storageKey = elements[i].href.match(/uzivatel-([0-9]+)\.htm/)[1];
	// Pokud je v cache jako přítel, přidá avatar
	if (storageValue = localStorage.getItem("BDSM_friend-" + storageKey)) {
		elements[i].className += " friendavatar";
		elements[i].style.backgroundImage = "url(" + storageValue + ")";
		}
	// Není v cache = nově příchozí
	if (!localStorage.getItem("BDSM_" + storageKey)) {
		elements[i].style.fontStyle = "italic";
		}
	// Je v cache, pokud je z kraje označ
	else if (storageValue = localStorage.getItem("BDSM_mesto-" + storageKey)) {
		if (storageValue == localStorage.getItem("BDSM_kraj")) {
			elements[i].style.fontSize = "15px"
			}
		}
	}

// Přepsání původní funkce na méně náročnou
scriptSource += "function getElementPosition(elemID) { \
	var x = 0, y = 0, el = document.getElementById(elemID); \
	do { \
		x += el.offsetLeft - el.scrollLeft; \
		y += el.offsetTop - el.scrollTop; \
		} \
	while (el = el.offsetParent); \
	return {left:x, top:y}; \
	};";

// Předělání náhledu uživatelů + doplnění zavření + cache + poznámky
scriptSource += " \
	function userSex(storageValue) { \
		switch (storageValue) { \
			case 'Het': return 'Heterosexuální'; \
			case 'Bis': return 'Bisexuální'; \
			case 'Bi-': return 'Bi-zvědavá'; \
			case 'Hom': return 'Homosexuální'; \
			default: return ''; \
			} \
		}; \
	function userOrient(storageValue) { \
		switch (storageValue) { \
			case 'Dom': return 'Dominantní'; \
			case 'Sub': return 'Submisivní'; \
			case 'Swi': return 'Switch'; \
			default: return ''; \
			} \
		}; \
	function userPart(storageValue) { \
		switch (storageValue) { \
			case 'dám': return 'Nikoho nehledám'; \
			case 'aní': return 'Hledám dopisování'; \
			case 'áda': return 'Hledám kamaráda'; \
			case 'irt': return 'Hledám akci/flirt'; \
			case 'kce': return 'Hledám pravidelné akce'; \
			case 'ice': return 'Hledám práci v erotice'; \
			case 'era': return 'Hledám životního partnera'; \
			default: return ''; \
			} \
		}; \
	function innerUser(response, id) { \
		document.getElementById('userpanel').innerHTML = \"<div class='t'></div><div class='b' id='userpanelb'> \
		<img src='http://www.bdsmlife.cz/users/avatars/\" + response.avat + \"' style='float: left; margin-right: 10px;' height='40' width='40'> \
		<b>\" + response.user + \"</b> \
		<span class='panel_zavrit' title='Zavřít okno' onclick='HideDialog(\\\"userpanel\\\")'>&#10006</span> \
		<span class='panel_obnovit' title='Obnovit okno' onclick='localStorage.removeItem(\\\"BDSM_\" + id + \"\\\"); HideDialog(\\\"userpanel\\\")'>&#920&nbsp;</span> \
		<span class='panel_poznamka' title='Neskrývat okno při psani poznámky' onclick='document.querySelector(\\\"div[id=userpanel]\\\").onmouseout = \\\"\\\"'>&#9997&nbsp;</span> \
		\" + (response.vip == 1 ? \"<img width='12' height='16' style='position: relative; top: 3px; left: 10px; cursor: help; margin-right: 5px;' title='VIP uživatel' src='img/icon/vip16.png'>\" : \"\") \
		+ (response.over == 1 ? \"<img width='22' height='16' style='position: relative; top: 3px; left: 10px; cursor: help; margin-right: 5px;' title='Ověřený uživatel' src='img/icon/idcard16.png'>\" : \"\") \
		+ (response.clen == 1 ? \"<img width='20' height='16' style='position: relative; top: 3px; left: 10px; cursor: help; margin-right: 5px;' title='Člen BDSMLife klubu' src='img/icon/house16.png'>\" : \"\") + \" <br> \
		<div style='font-size: 8pt; border-bottom: 1px solid #fff; margin-bottom: 5px; padding-bottom: 5px; padding-top: 5px;'>\" + response.kraj + \"</div> \
		<div style='font-size: 8pt; border-bottom: 1px solid #fff; margin-bottom: 5px; padding-bottom: 5px;'>\" + response.body + \"</div> \
		<div style='float: left; clear: left; width: 120px;'>Sexuální orientace:</div> \
		<div style='float: left; text-align: right; width: 120px;'>\" + userSex(response.sex) + \"</div> \
		<div style='float: left; clear: left; width: 120px;'>BDSM orientace:</div> \
		<div style='float: left; text-align: right; width: 120px;'>\" + userOrient(response.orient) + \"</div> \
		<div style='float: left; clear: left; width: 80px; margin-bottom: 5px;'>Partner:</div> \
		<div style='float: left; text-align: right; width: 160px;'>\" + userPart(response.part) + \"</div> \
		<div style='clear: both; font-size: 8pt; border-top: 1px solid #fff; padding-top: 5px;' class='f'> \
		<img src='img/icon/user12.gif' alt='' height='12' width='10'> <a href='uzivatel-\" + id + \".htm'>Profil</a> &nbsp; \
		<img src='img/icon/mail12.gif' alt='' height='10' width='13'> <a href='zpravy.htm?a=nova&amp;to=\" + response.user.match(/>(.*?)<.big>/)[1] + \"'>Poslat SZ</a> &nbsp; \
		<img src='img/icon/heart12.png' \" + (response.inzer == 0 ? \"class='cernobile'\" : \"\") + \" alt='' height='9' width='9'> <a href='inzeraty.htm?user_id=\" + id + \"'>Inzeráty</a> &nbsp; \
		<img src='img/icon/photo12.png' \" + (response.foto == 0 ? \"class='cernobile'\" : \"\") + \" alt='' height='12' width='12'> <a href='fotky.htm?user=\" + id + \"'>Fotky</a> \
		</div> \
		<textarea class='note' id='BDSM_note-\" + id + \"' onkeyup='localStorage.setItem(this.id, this.value)'>\" + ((source = localStorage.getItem('BDSM_note-' + id)) ? source : 'Napiš poznámku') + \"</textarea> \
		</div>\"; \
		};";

scriptSource += "function getUser(id, div, posy) { \
	var posy = typeof(posy) != 'undefined' ? posy : 17; \
	var userpanel_element = document.getElementById('userpanel'); \
	var div_element = document.getElementById(div); \
	div_element.style.fontStyle='normal'; \
	div_element.style.paddingRight='2px'; \
	if(div_element.style.fontSize != '') { posy += 2 }; \
	AssignPosition(userpanel_element); \
	userpanel_element.style.top=(getElementPosition(div).top+posy)+'px'; \
	userpanel_element.style.left=(getElementPosition(div).left-115)+'px'; \
	userpanel_element.style.display = 'block'; \
	userpanel_element.onmouseout = function() {userTimer = setInterval(\"HideDialog(\\'userpanel\\');\", 500);}; \
	clearInterval(userTimer); \
	if (localStorage.getItem('BDSM_' + id)) {innerUser(JSON.parse(localStorage.getItem('BDSM_' + id)), id)} \
	else { \
		userpanel_element.innerHTML='<div class=\"t\"></div><div class=\"b\" id=\"userpanelb\"><center>Panel se načítá...<br>Uživatel byl smazán?</center></div>'; \
		var xmlhttp = new XMLHttpRequest(); \
		function parseUser(response) { \
			elements = response.match(/<div style=.f.*?<.div>/g); \
			response = { \
				'avat' : response.match(/<img src=.http:..www.bdsmlife.cz.users.avatars.(.*?)\"/)[1], \
				'user' : response.match(/<big style=.color:.*?<.big>/)[0], \
				'kraj' : elements[0].match(/5px;.>(.*?)<.div>/)[1], \
				'body' : elements[1].match(/5px;.>(.*?)<.div>/)[1], \
				'sex' : elements[3].match(/>(.*?)</)[1].slice(0,3), \
				'orient' : elements[5].match(/>(.*?)</)[1].slice(0,3), \
				'part' : elements[7].match(/>(.*?)</)[1].slice(-3), \
				'vip' : (/img.icon.vip16.png/.test(response)) ? 1 : 0, \
				'over' : (/img.icon.idcard16.png/.test(response)) ? 1 : 0, \
				'clen' : (/img.icon.house16.png/.test(response)) ? 1 : 0 }; \
			innerUser(response, id); \
			localStorage.setItem('BDSM_' + id, JSON.stringify(response)); \
			var mesto = response.kraj.match(/[0-9\?] let<.b>. (.*)/)[1]; \
			if (mesto == localStorage.getItem('BDSM_kraj')) { div_element.style.fontSize = '15px' }; \
			localStorage.setItem('BDSM_mesto-' + id, mesto); \
			}; \
		xmlhttp.onreadystatechange = function() { \
			if (xmlhttp.readyState==4 && xmlhttp.status==200) { \
				parseUser(xmlhttp.responseText); \
				}; \
			}; \
		xmlhttp.open('GET', 'http://www.bdsmlife.cz/scr/dom.php?akce=getuser&id=' + id, true); \
		xmlhttp.send(); \
		}; \
	};";

styleSource += " \
	#uvod { \
		padding-top: 20px!important; \
		} \
	/* h1 Vítejte */ \
	#uvod h1 { \
		display: none; \
		} \
	/* Nyní nadbytečné tlačítko pro odhlášení */ \
	#uvod input.logout { \
		display: none; \
		} \
	#uvod .online { \
		float: none; \
		text-align: inherit; \
		width: 100%; \
		} \
	/* Rozklikavácí userpanel zobrazí přímo na stránce */ \
	#header .logo { \
		width: 260px; \
		} \
	#header .user .panel { \
		background-image: url(''); \
		display: block; \
		margin: auto; \
		padding-top: 15px; \
		position: relative; \
		width: 450px; \
		} \
	#header .user .panel .bottom { \
		background-image: url(''); \
		} \
	#header .user .panel .name { \
		display: none; \
		} \
	#header .user .panel a.btn { \
		color: #FFFFFF; \
		display: inline; \
		padding: 8px 10px 8px 36px; \
		} \
	/* Pozice avataru v seznamu přihlášených */ \
	.friendavatar { \
		background-position: left center; \
		background-repeat: no-repeat; \
		background-size: 15px 15px; \
		padding: 3px 1px 3px 17px; \
		border-radius: 6px 0px 0px 6px; \
		} \
	/* Stylování tlačítek na userpanelu */ \
	#userpanelb.b span.panel_zavrit {  \
		float: right; \
		font-size: 15px; \
		cursor: pointer; \
		} \
	#userpanelb.b span.panel_obnovit { \
		float: right; \
		font-size: 17px; \
		font-weight: bold; \
		line-height: 22px; \
		cursor: pointer; \
		} \
	#userpanelb.b span.panel_poznamka { \
		float: right; \
		font-size: 21px; \
		font-weight: bold; \
		line-height: 22px; \
		margin-left: 7px; \
		cursor: pointer; \
		} \
	/* Náhled uživatelů - zaoblení avataru */ \
	#userpanelb.b img { \
		border-radius: 3px; \
		} \
	/* Černobílý filtr na obrázek */ \
	.cernobile { \
		filter: url(\"data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale\"); /* Firefox 10+, IE10 */ \
		-webkit-filter: grayscale(100%); /* Chrome 19+ & Safari 6+ */ \
		-webkit-backface-visibility: hidden; /* Fix for transition flickering */ \
		} \
	/* Poznámky */ \
	.note { \
		background-color: #E1E1E1; \
		border: 1px solid #C0C0C0; \
		height: 50px; \
		margin: 8px 0 0 -1px; \
		max-height: 300px; \
		min-height: 50px; \
		max-width: 100%; \
		min-width: 100%; \
		width: 100%; \
		} \
	/* Maximální šířka nicku v náhledu uživatele */ \
	#userpanelb.b b big { \
		display: inline-block; \
		overflow: hidden; \
		max-width: 129px; \
		} \
	";

userInject = document.createElement('style');
userInject.setAttribute("type", "text/css");
userInject.textContent = styleSource;
document.body.appendChild(userInject);

userInject = document.createElement('script');
userInject.setAttribute("type", "application/javascript");
userInject.textContent = scriptSource;
document.body.appendChild(userInject);
document.body.removeChild(userInject);