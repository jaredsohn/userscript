// ==UserScript==
// @name           Marca topicos
// @namespace      by Joseph | uid=4629209997186050418
// @include        *.orkut.*/CommTopics?cmm=3309943*
// @include        *.orkut.*/Main#CommTopics?cmm=3309943*
// ==/UserScript==

		function criaImg(txt,p)
			{
				var img = document.createElement("img");
				var url = "http://static4.orkut.com/img/";
				var up = "http://up.dgoh.org/upload/imagens/";
				if (txt.match(/(\[|\[\s)off(\s\]|\])/i) || txt.match(/(\[|\[\s)off\?(\s\]|\])/i))
					img.src = url + "pres2.gif"; //Bolinha vermelha, topicos off
				else 
				if (txt.match(/(\[|\[\s)temp(\s\]|\])/i))
					img.src = url + "pres1.gif"; //Bolinha laranja, topicos temp
				else 
				if (txt.match(/(\[|\[\s)on(\s\]|\])/i))
					img.src = url + "pres0.gif"; //Bolinha verde, topicos on
				else
				if (txt.match(/(\[|\[\s)down(\s\]|\])/i))
					img.src = url + "presOffline.gif"; //Bolinha cinza, topicos down
				else
				if (txt.match(/(\[|\[\s)\+\d{1,2}(\s\]|\])/))
					img.src = up + "black.gif"; //Bolinha preta, topicos +18 ou +16
				else
				if (txt.match(/(\[|\[\s)fixo(\s\]|\])/i))
					img.src = up + "blue.gif"; //Bolinha azul, topicos fixo
				else
				if (txt.match(/(\[|\[\s)dic(\s\]|\])/i) || txt.match(/(\[|\[\s)dica(\s\]|\])/i) || txt.match(/(\[|\[\s)tut(\s\]|\])/i) || txt.match(/(\[|\[\s)tuto(\s\]|\])/i))
					img.src = up + "pink.gif"; //Bolinha rosa, topicos dica e tuto
				else
				if (txt.match(/(\[|\[\s)help(\s\]|\])/i) || txt.match(/(\[|\[\s)duv(\s\]|\])/i) || txt.match(/(\[|\[\s)ajuda(\s\]|\])/i) || txt.match(/(\[|\[\s)aju(\s\]|\])/i) || txt.match(/(\[|\[\s)ped(\s\]|\])/i))
					img.src = up + "yellow.gif"; //Bolinha amarela, topicos de ajuda ou pedido
				else
					img.src = up + "maron.gif"; //Bolinha marrom, diferente de todos
				p.appendChild(img);
			};
		function $()
			{
				return document.getElementsByTagName(arguments[0]);
			};
		function kk(s)
			{
				for (var x = 9;x < s.length;++x)
					criaImg(s[x].getElementsByTagName("a")[0].innerHTML,s[x].getElementsByTagName("td")[1]);
			};
				var s = $("tr");
				setInterval("kk(s)", 2000);