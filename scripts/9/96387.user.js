// ==UserScript==
// @name           Colheita Feliz; B&T
// @namespace      editado por Guilherme | uid=15577794736272900305
// @description    Script para facilitar o trabalho da Comunidade Colheita Feliz; B&T.
// @CFBT     www.orkut.com.br/Main#Community?cmm=16709406
// @include        *.orkut.*/Main#CommMsgs?cmm=16709406*
// @include        *.orkut.*/CommMsgs?cmm=16709406*
// @include        *.orkut.*/Main#CommMemberManage?cmm=16709406*
// @include        *.orkut.*/CommMemberManage?cmm=16709406*
// @include        *.orkut.*/Community?cmm=16709406*
// @include        *.orkut.*/Main#Community?cmm=16709406*
// ==/UserScript==
/*
function criaBotao() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "Estou online!";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "online()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "Vou sair!";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "Estou online!";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "online()");
			}
		}
		var span = document.createElement("span");
		var span2 = document.createElement("span");
		var img = document.createElement("img");
		span2.className = "btnboxr";
		img.src = "http://static1.orkut.com/img/b.gif";
		img.width = 5;
		img.height = 1;
		span2.appendChild(img);
		span.className = "grabtn";
		a.className = "btn";
		span.appendChild(a);
		with(document.getElementsByClassName("parabtns")[2]) {
			appendChild(span);
			appendChild(span2);
		}
	}
};

//Inicia tudo:
confirmaDeletarTopicos();
confirmaBaneMembro();
criaBotao();