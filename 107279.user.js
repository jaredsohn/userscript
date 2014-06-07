// ==UserScript==
// @name           Script Managerzone Brasil
// @description    Acesso aos BBcodes em geral
// @include        http://*managerzone.*
// @version        2.5S
// @copyright      Projeto iniciado por: murilostein / Continuado por: starssheep
// @authors        ->*****Atualização Latino Americana para Português Brasil******
// @lastupdate     ->*****Incluido no menu treinamento opção Gráficos de Treinamento******
//
// ==/UserScript==


// ***FUNDO***

(function() {
var css = "#body.body_mz,div.win_back,#win_bg,div.news_item,.odd{\nbackground-image:url(http://static.managerzone.com/img/windowbg.gif)!important;\n}\n\n.subnavhr{\nheight:2px!important;\n}\n\n.even{\nbackground-color:#c0c0c0 !important;\n}\n\n.age_restricted_game{\nbackground-color:#a9cbaf!important;\n}\n\n.age_restricted_game_secondary{\nbackground-color:#aabcd5!important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

function addImagen(caja){
	var imagen;
	imagen = prompt('Copie o link da sua imagem:');
	var intentos;
	intentos = 0;
	var preUrl = '[image url=';
	var posUrl = ']';
	var rtdo = '';
	if(imagen != '')
	{
		img = new Image();
		img.src = imagen;
		if((img.height == 0) || (img.width==0))
		{
			while(!((img.height == 0) || (img.width==0)) && intentos < 5)
			{
				for(pausa = 0; pausa < 100; pausa ++){}
				img.src = imagen;
			}
		}
		if((img.height == 0) || (img.width==0))
		{
			alert('O link/URL: ' + imagen + ' não é uma imagem válida.');
		}
		else
		{
			rtdo += preUrl + imagen + posUrl;		
			document.getElementsByName(caja)[0].value = document.getElementsByName(caja)[0].value + rtdo;
		}
	}
}

function armaCodigo(tag,cubo){
 	obj = document.getElementsByName(cubo)[0];
	var inicio = obj.selectionStart;
	var fin = obj.selectionEnd;
	obj.value = obj.value.substr(0, inicio) + '[' + tag +']' + obj.value.substr(inicio, fin - inicio) + '[/' + tag +']' + obj.value.substr(fin, obj.value.length);
}

function posteaIcono(url,area){
 	obj = document.getElementsByName(area)[0];
	var inicio = obj.selectionStart;
	var fin = obj.selectionEnd;
	obj.value = obj.value.substr(0, inicio) + '[image url=' + url +']' + obj.value.substr(fin, obj.value.length);
}

function gerarImagem(url, idImg, elementID, tipo){
	var bimg = document.createElement('img');
	bimg.setAttribute('src', url);
	bimg.setAttribute('id', idImg);
	
	if(tipo == 'pizarra')
		var ins = document.getElementById(elementID);
	else
		var ins = document.getElementsByName(elementID)[0];
		
	ins.parentNode.insertBefore(bimg, ins);
}

function armaPanel(elementID, tipo){
	gerarImagem('http://img534.imageshack.us/img534/3249/imagemywm.png', 'btnaddImagen2', elementID , tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img718.imageshack.us/img718/6552/negrigbbtn.png', 'btnnegrita2', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img205.imageshack.us/img205/6507/87279893.png', 'btncursiva2', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img832.imageshack.us/img832/4937/subragbbtn.png', 'btnsubrayado2', elementID, tipo);	

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img688.imageshack.us/img688/9992/zoio.gif', 'addIcono2', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img638.imageshack.us/img638/5853/vergonha.gif', 'addIcono3', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img295.imageshack.us/img295/9245/02iconbiggrin.gif', 'addIcono4', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img841.imageshack.us/img841/1433/iconwinkk.gif', 'addIcono5', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img214.imageshack.us/img214/4828/icontwisted.gif', 'addIcono6', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img844.imageshack.us/img844/121/iconevilh.gif', 'addIcono7', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img8.imageshack.us/img8/116/iconeekm.gif', 'addIcono8', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img684.imageshack.us/img684/4012/chora.gif', 'addIcono9', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img818.imageshack.us/img818/5571/04iconsad.gif', 'addIcono11', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img4.imageshack.us/img4/9356/emoticons461.gif', 'addIcono13', elementID, tipo);

	gerarImagem('http://img580.imageshack.us/img580/9481/07iconconfused.gif', 'addIcono15', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img836.imageshack.us/img836/8897/doh.gif', 'addIcono18', elementID, tipo);

	gerarImagem('http://img825.imageshack.us/img825/1710/03iconlol.gif', 'addIcono17', elementID, tipo);

	gerarImagem('http://img690.imageshack.us/img690/7189/agh.gif', 'addIcono23', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img836.imageshack.us/img836/508/22good.gif', 'addIcono19', elementID, tipo);

	gerarImagem('http://img818.imageshack.us/img818/3522/espacop.jpg', 'branco ', elementID , tipo);

	gerarImagem('http://img843.imageshack.us/img843/9004/23bad.gif', 'addIcono22', elementID, tipo);

}


function generarAccesoDirecto(url, idImg, titleImg)
{
	var ad = document.createElement('img');
	ad.setAttribute('src', url);
	ad.setAttribute('id', idImg);
	ad.setAttribute('title', titleImg);
	document.getElementById('logout_etc').appendChild(ad);
}

document.addEventListener("click", function(event) {
  	

  	switch(event.target.id)
	{
		case "mer": 
			window.location="?p=forum&sub=topics&forum_id=51&sport=soccer";
			break;

		case "ami": 
			window.location="?p=forum&sub=topics&forum_id=48&sport=soccer";
			break;

		case "mzh": 
			window.location="?p=forum&sub=topics&forum_id=47&sport=soccer";
			break;

		case "da": 
			window.location="?p=forum&sub=topics&forum_id=44&sport=soccer";
			break;

		case "pyr": 
			window.location="?p=forum&sub=topics&forum_id=49&sport=soccer";
			break;

		case "fed": 
			window.location="?p=forum&sub=topics&forum_id=46&sport=soccer";
			break;

		case "sem": 
			window.location="?p=forum&sub=topics&forum_id=50&sport=soccer";
			break;

		case "sel": 
			window.location="?p=forum&sub=topics&forum_id=283&sport=soccer";
			break;

		case "cop": 
			window.location="?p=forum&sub=topics&forum_id=45&sport=soccer";
			break;

		case "rep": 
			window.location="?p=training_report";
			break;

		case "jug": 
			window.location="?p=match&sub=played";
			break;

		case "btnaddImagen": 
			addImagen('message');
			break;

		case "btnnegrita": 
			armaCodigo('b','message');
			break;

		case "btncursiva": 
			armaCodigo('i','message');
			break;

		case "btnsubrayado": 
			armaCodigo('u','message');
			break;

		case "btnparrafo": 
			armaCodigo('p','message');
			break;

		case "btnlista": 
			armaCodigo('li','message');
			break;

		case "btnaddImagen2": 
			addImagen('msg');
			break;

		case "btnnegrita2": 
			armaCodigo('b','msg');
			break;

		case "btncursiva2": 
			armaCodigo('i','msg');
			break;

		case "btnsubrayado2": 
			armaCodigo('u','msg');
			break;

		case "btnaddIcono1": 
			posteaIcono('http://img295.imageshack.us/img295/9245/02iconbiggrin.gif','message')
			break;

		case "btnaddIcono2": 
			posteaIcono('http://img688.imageshack.us/img688/9992/zoio.gif','message');
			break;

		case "btnaddIcono3": 
			posteaIcono('http://img825.imageshack.us/img825/1710/03iconlol.gif','message');
			break;

		case "btnaddIcono4": 
			posteaIcono('http://img818.imageshack.us/img818/5571/04iconsad.gif','message');
			break;

		case "btnaddIcono5": 
			posteaIcono('http://img684.imageshack.us/img684/4012/chora.gif','message');
			break;

		case "btnaddIcono6": 
			posteaIcono('http://img580.imageshack.us/img580/9481/07iconconfused.gif','message');
			break;

		case "btnaddIcono7": 
			posteaIcono('http://img818.imageshack.us/img818/4599/fcu0hvjpg.png','message');
			break;

		case "btnaddIcono8": 
			posteaIcono('http://img814.imageshack.us/img814/3261/iconsurprisedn.gif','message');
			break;

		case "btnaddIcono9": 
			posteaIcono('http://img8.imageshack.us/img8/116/iconeekm.gif','message');
			break;

		case "btnaddIcono10": 
			posteaIcono('http://img844.imageshack.us/img844/121/iconevilh.gif','message');
			break;

		case "btnaddIcono11": 
			posteaIcono('http://img214.imageshack.us/img214/4828/icontwisted.gif','message');
			break;

		case "btnaddIcono12": 
			posteaIcono('http://img46.imageshack.us/img46/4830/15iconrazz.gif','message');
			break;

		case "btnaddIcono13": 
			posteaIcono('http://img638.imageshack.us/img638/5853/vergonha.gif','message');
			break;

		case "btnaddIcono14": 
			posteaIcono('http://img841.imageshack.us/img841/1433/iconwinkk.gif','message');
			break;

		case "btnaddIcono15": 
			posteaIcono('http://img155.imageshack.us/img155/7626/iconcoolp.gif','message');
			break;

		case "btnaddIcono16": 
			posteaIcono('http://img121.imageshack.us/img121/2269/19uu.png','message');
			break;

		case "btnaddIcono17": 
			posteaIcono('http://img836.imageshack.us/img836/8897/doh.gif','message');
			break;

		case "btnaddIcono18": 
			posteaIcono('http://img825.imageshack.us/img825/692/thshifty.gif','message');
			break;
			
		case "btnaddIcono19": 
			posteaIcono('http://img836.imageshack.us/img836/508/22good.gif','message');
			break;
			
		case "btnaddIcono20": 
			posteaIcono('http://img843.imageshack.us/img843/9004/23bad.gif','message');
			break;
			
		case "btnaddIcono21": 
			posteaIcono('http://img821.imageshack.us/img821/7177/iconarrowm.gif','message');
			break;
			
		case "btnaddIcono22": 
			posteaIcono('http://img693.imageshack.us/img693/3541/iconexclaim.gif','message');
			break;
			
		case "btnaddIcono23": 
			posteaIcono('http://img814.imageshack.us/img814/567/iconquestion.gif','message');
			break;			
			
     	case "btnaddIcono24": 
			posteaIcono('http://img4.imageshack.us/img4/9356/emoticons461.gif','message');
			break;

		case "btnaddIcono25": 
			posteaIcono('http://img690.imageshack.us/img690/7189/agh.gif','message');
			break;

		case "btnaddIcono26": 
			posteaIcono('http://img715.imageshack.us/img715/9465/emoticons465.gif','message');
			break;

		case "btnaddIcono27": 
			posteaIcono('http://img251.imageshack.us/img251/4281/velho.gif','message');
			break;

		case "btnaddIcono28": 
			posteaIcono('http://img706.imageshack.us/img706/6744/emoticons466.gif','message')
			break;

		case "btnaddIcono29": 
			posteaIcono('http://img205.imageshack.us/img205/829/041r.gif','message')
			break;
		
		case "btnaddIcono30": 
			posteaIcono('http://img38.imageshack.us/img38/5029/eusathink.gif','message')
			break;

		case "btnaddIcono31": 
			posteaIcono('http://img580.imageshack.us/img580/7154/eusawall.gif','message')
			break;			

		case "btnaddIcono32": 
			posteaIcono('http://img29.imageshack.us/img29/7709/eusaclap.gif','message')
			break;

		case "btnaddIcono33": 
			posteaIcono('http://img815.imageshack.us/img815/310/eusadance.gif','message')
			break;

		case "btnaddIcono34": 
			posteaIcono('http://img842.imageshack.us/img842/2844/eusanaughty.gif','message')
			break;

		case "btnaddIcono35": 
			posteaIcono('http://img543.imageshack.us/img543/6327/eusasnooty.gif','message')
			break;

		case "btnaddIcono36": 
			posteaIcono('http://img715.imageshack.us/img715/1959/1111x.gif','message')
			break;

		case "btnaddIcono37": 
			posteaIcono('http://img15.imageshack.us/img15/913/blablar.gif','message')
			break;

		case "btnaddIcono38": 
			posteaIcono('http://img687.imageshack.us/img687/7708/emoticons347.gif','message')
			break;

		case "btnaddIcono39": 
			posteaIcono('http://img835.imageshack.us/img835/9628/iconsmile.gif','message');
			break;

		case "addIcono2": 
			posteaIcono('http://img688.imageshack.us/img688/9992/zoio.gif','msg');
			break;

		case "addIcono3": 
			posteaIcono('http://img638.imageshack.us/img638/5853/vergonha.gif','msg');
			break;

		case "addIcono4": 
			posteaIcono('http://img295.imageshack.us/img295/9245/02iconbiggrin.gif','msg');
			break;

		case "addIcono5": 
			posteaIcono('http://img841.imageshack.us/img841/1433/iconwinkk.gif','msg');
			break;

		case "addIcono6": 
			posteaIcono('http://img214.imageshack.us/img214/4828/icontwisted.gif','msg');
			break;

		case "addIcono7": 
			posteaIcono('http://img844.imageshack.us/img844/121/iconevilh.gif','msg');
			break;

		case "addIcono8": 
			posteaIcono('http://img8.imageshack.us/img8/116/iconeekm.gif','msg');
			break;

		case "addIcono9": 
			posteaIcono('http://img684.imageshack.us/img684/4012/chora.gif','msg');
			break;

		case "addIcono11": 
			posteaIcono('http://img818.imageshack.us/img818/5571/04iconsad.gif','msg');
			break;

		case "addIcono13": 
			posteaIcono('http://img4.imageshack.us/img4/9356/emoticons461.gif','msg');
			break;

		case "addIcono15": 
			posteaIcono('http://img580.imageshack.us/img580/9481/07iconconfused.gif','msg');
			break;

		case "addIcono18": 
			posteaIcono('http://img836.imageshack.us/img836/8897/doh.gif', 'msg');
			break;

		case "addIcono17": 
			posteaIcono('http://img825.imageshack.us/img825/1710/03iconlol.gif','msg');
			break;		

		case "addIcono19": 
			posteaIcono('http://img836.imageshack.us/img836/508/22good.gif','msg');
			break;

		case "addIcono22": 
			posteaIcono('http://img843.imageshack.us/img843/9004/23bad.gif','msg');
			break;

		case "addIcono23": 
			posteaIcono('http://img690.imageshack.us/img690/7189/agh.gif','msg');
			break;
	}
}, true);

// ==Sub-Menús==
var meuclub = document.getElementById('top_item_clubhouse_sub');
meuclub.innerHTML = '<li><a href="?p=clubhouse">Página Inicial</a></li><li onmouseover="document.getElementById(\'minhaequipe\').style.display=\'block\'" onmouseout="document.getElementById(\'minhaequipe\').style.display=\'none\'"><a href="?p=team">Meu Time</a><ul id="minhaequipe" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:137px;"><a href="?p=team&sub=alter" style="text-align:left;">Editar Info</a></li><li style="width:137px;"><a href="?p=team&sub=alterbadge" style="text-align:left;">Editar Escudo</a></li><li style="width:137px;"><a href="?p=team&sub=alterjersey" style="text-align:left;">Editar Camisa</a></li><li style="width:137px;"><a href="?p=team&sub=sponsor " style="text-align:left;">Patrocinador</a></li><li style="width:137px;"><a href="?p=team&sub=press" style="text-align:left;">Sala de Imprensa</a></li></ul></li><li onmouseover="document.getElementById(\'meusjogadores\').style.display=\'block\'" onmouseout="document.getElementById(\'meusjogadores\').style.display=\'none\'"><a href="?p=players">Jogadores</a><ul id="meusjogadores" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:130px;"><a href="?p=players&sub=alt" style="text-align:left;">Alt. Visual</a></li><li style="width:130px;"><a href="?p=players&sub=unavailable" style="text-align:left;">Machucado/Susp</a></li><li style="width:130px;"><a href="?p=players&sub=changenumbers" style="text-align:left;">Trocar Números</a></li><li style="width:130px;"><a href="?p=players&sub=retired" style="text-align:left;">Aposentados</a></li><li style="width:130px;"><a href="?p=players&sub=stats " style="text-align:left;">Mostrar Estatísticas</a></li></ul></li><li onmouseover="document.getElementById(\'minhastaticas\').style.display=\'block\'" onmouseout="document.getElementById(\'minhastaticas\').style.display=\'none\'"><a href="?p=tactics">Táticas</a><ul id="minhastaticas" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:130px;"><a href="?p=tactics&sub=availability" style="text-align:left;">Disponibilidade</a></li></ul></li><li onmouseover="document.getElementById(\'meustreinos\').style.display=\'block\'" onmouseout="document.getElementById(\'meustreinos\').style.display=\'none\'"><a href="?p=training_home">Treinamento</a><ul id="meustreinos" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:150px;"><a href="?p=training_camp" style="text-align:left;">Campo de Treinamento</a></li><li style="width:150px;"><a href="?p=training_report" style="text-align:left;">Relatório Treinamento</a></li><li style="width:150px;"><a href="?p=training" style="text-align:left;">Área de Treinamento</a></li><li style="width:150px;"><a href="?p=training_graphs" style="text-align:left;">Gráficos de Treinamento</a></li></ul></li><li onmouseover="document.getElementById(\'mercado\').style.display=\'block\'" onmouseout="document.getElementById(\'mercado\').style.display=\'none\'"><a href="?p=transfer">Transferências</a><ul id="mercado" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:140px;"><a href="?p=transfer&sub=category" style="text-align:left;">Minhas Pesquisas</a></li><li style="width:140px;"><a href="?p=transfer&sub=yourplayers" style="text-align:left;">Monitorar</a></li><li style="width:140px;"><a href="?p=transfer_history" style="text-align:left;">Hist.Transferências</a></li><li style="width:140px;"><a href="?p=transfer&sub=rules" style="text-align:left;">Regras</a></li></ul></li><li><a href="?p=shortlist">Jogadores Favoritos</a></li><li><a href="?p=economy&sub=education">Juvenis</a></li><li onmouseover="document.getElementById(\'meustecnicos\').style.display=\'block\'" onmouseout="document.getElementById(\'meustecnicos\').style.display=\'none\'"><a href="?p=trainers">Treinadores</a><ul id="meustecnicos" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:155px;"><a href="?p=trainers&sub=negotiations" style="text-align:left;">Negociações</a><li style="width:155px;"><a href="?p=trainers&sub=freeagents" style="text-align:left;">Treinadores Disponíveis</a><li style="width:155px;"><a href="?p=trainers&sub=settings" style="text-align:left;">Ajustes</a></li></ul></li>';

var partidas = document.getElementById('top_item_matches_sub');
partidas.innerHTML = '<li onmouseover="document.getElementById(\'minhaliga\').style.display=\'block\'" onmouseout="document.getElementById(\'minhaliga\').style.display=\'none\'"><a href="?p=series">Liga Oficial</a><ul id="minhaliga" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:150px;"><a href="?p=series" style="text-align:left;">Tabela da Liga</a></li><li style="width:150px;"><a href="?p=series&sub=schedule" style="text-align:left;">Agenda Liga</a></li><li style="width:150px;"><a href="?p=series&sub=topscorer" style="text-align:left;">Artilheiro</a></li><li style="width:150px;"><a href="?p=series&sub=unavailable" style="text-align:left;">Machucado/Suspenso</a></li><li style="width:150px;"><a href="?p=series&sub=board" style="text-align:left;">Quadro de Avisos</a></li><li style="width:150px;"><a href="?p=series&sub=promotions" style="text-align:left;">Temporada Anterior</a></li><li style="width:150px;"><a href="?p=series&sub=pre_qual" style="text-align:left;">Qualificação Anterior</a></li></ul></li><li onmouseover="document.getElementById(\'meusresultados\').style.display=\'block\'" onmouseout="document.getElementById(\'meusresultados\').style.display=\'none\'"><a href="?p=match&sub=played">Resultados</a><ul id="meusresultados" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:130px;"><a href="?p=match&sub=played&hidescore=1" style="text-align:left;">Resultados Ocultos</a></li></ul></li><li><a href="?p=match&sub=scheduled">Agendadas</a></li><li onmouseover="document.getElementById(\'meusamistosos\').style.display=\'block\'" onmouseout="document.getElementById(\'meusamistosos\').style.display=\'none\'"><a href="?p=challenges">Amistosos</a><ul id="meusamistosos" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:135px;"><a href="?p=challenges&sub=friendly" style="text-align:left;">Amistosos Aceitos</a></li></ul></li><li onmouseover="document.getElementById(\'minhascopas\').style.display=\'block\'" onmouseout="document.getElementById(\'minhascopas\').style.display=\'none\'"><a href="?p=cup&sub=cup_home">Copas</a><ul id="minhascopas" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:155px;"><a href="?p=private_cup&cuptype=user&sub=admin" style="text-align:left;">Criar Copa de Amigos</a></li><li style="width:155px;"><a href="?p=private_cup" style="text-align:left;">Copas de Amigos</a></li><li style="width:155px;"><a href="?p=cup&sub=list&type=other" style="text-align:left;">Todas as Copas Oficiais</a></li><li style="width:155px;"><a href="?p=private_cup&cuptype=partner" style="text-align:left;">Copas de Parceria</a></li><li style="width:155px;"><a href="?p=cup&sub=list&type=national" style="text-align:left;">Copas de Seleções</a></li></ul></li><li onmouseover="document.getElementById(\'minhasligasdeamigos\').style.display=\'block\'" onmouseout="document.getElementById(\'minhasligasdeamigos\').style.display=\'none\'"><a href="?p=friendlyseries">Ligas de Amigos</a><ul id="minhasligasdeamigos" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:155px;"><a href="?p=friendlyseries&sub=admin" style="text-align:left;">Criar Liga de Amigos</a></li></ul></li><li onmouseover="document.getElementById(\'meusdesafiostop\').style.display=\'block\'" onmouseout="document.getElementById(\'meusdesafiostop\').style.display=\'none\'"><a href="?p=topteams">Desafiar Tops</a><ul id="meusdesafiostop" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:220px;"><a href="?p=specialchallenge" style="text-align:left;">Desafiar a CREW</a></li><li style="width:220px;"><a href="?p=national_teams&sub=challenges" style="text-align:left;">Desafiar a Seleção Nacional</a></li><li style="width:220px;"><a href="?p=national_teams&sub=challenges&type=u21" style="text-align:left;">Desafiar a Seleção Nacional Sub-21</a></li></ul></li><li><a href="?p=match&sub=livescores_overview">Live Scores</a></li><li onmouseover="document.getElementById(\'selecaonacional\').style.display=\'block\'" onmouseout="document.getElementById(\'selecaonacional\').style.display=\'none\'"><a href="?p=national_teams">Seleção Nacional</a><ul id="selecaonacional" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:165px;"><a href="?p=national_teams&type=u21" style="text-align:left;">Seleção Nacional Sub-21</a></li></ul></li><li onmouseover="document.getElementById(\'instantehead\').style.display=\'block\'" onmouseout="document.getElementById(\'instantehead\').style.display=\'none\'"><a href="?p=head2head">Head 2 Head</a><ul id="instantehead" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=head2head&sub=list" style="text-align:left;">Partidas</a></li></ul><li onmouseover="document.getElementById(\'extra_leagues\').style.display=\'block\'" onmouseout="document.getElementById(\'extra_leagues\').style.display=\'none\'"><a href="?p=extra_leagues">Liga Extra</a></li><li onmouseover="document.getElementById(\'u18_series\').style.display=\'block\'" onmouseout="document.getElementById(\'u18_series\').style.display=\'none\'"><a href="?p=u18_series">Liga Juvenil</a><ul id="minhaligajuvenil" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:150px;"><a href="?p=u18_series" style="text-align:left;">Tabela da Liga</a></li><li style="width:150px;"><a href="?p=u18_series&sub=schedule" style="text-align:left;">Agenda Liga</a></li><li style="width:150px;"><a href="?p=u18_series&sub=unavailable" style="text-align:left;">Machucado/Suspenso</a></li><li style="width:150px;"><a href="?p=u18_series&sub=board" style="text-align:left;">Quadro de Avisos</a></li>';

var ajuda = document.getElementById('top_item_help_sub');
ajuda.innerHTML = '<li style="width:600px;"><a>&nbsp;</a></li><li><a href="?p=tutorial">Tutorial</a></li><li><a href="?p=manual_faq&sub=FAQ">FAQ</a></li><li><a href="?p=search">Pesquisar</a></li><li onmouseover="document.getElementById(\'asregras\').style.display=\'block\'" onmouseout="document.getElementById(\'asregras\').style.display=\'none\'"><a href="?p=rules&sub=rules_game">Regras</a><ul id="asregras" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:152px;"><a href="?p=rules&sub=rules_game" style="text-align:left;">Regras Gerais</a><li style="width:152px;"><a href="?p=rules&sub=rules_forum" style="text-align:left;">Regras do Fórum</a><li style="width:152px;"><a href="?p=transfer&sub=rules" style="text-align:left;">Regras de Transferência</a><li style="width:152px;"><a href="?p=rules&sub=rules_nc" style="text-align:left;">Regras das Seleções</a></li><li style="width:152px;"><a href="?p=support_form" style="text-align:left;">Suporte</a></li><li><a href="?p=language_support">Suporte de Linguagem</a></li></ul></li><li onmouseover="document.getElementById(\'tajuda\').style.display=\'block\'" onmouseout="document.getElementById(\'tajuda\').style.display=\'none\'"><a href=>Tópicos Ajuda</a><ul id="tajuda" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3303186&forum_id=49&sport=soccer" style="text-align:left;">PD e LV</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=5365000&forum_id=49&sport=soccer" style="text-align:left;">Treinadores:Contratação</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=4399498&forum_id=49&sport=soccer" style="text-align:left;">Treinamentos</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3224432&forum_id=49&sport=soccer" style="text-align:left;">Transferências</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3720739&forum_id=49&sport=soccer" style="text-align:left;">Dicas Estádios</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3133391&forum_id=49&sport=soccer" style="text-align:left;">Tudo sobre CT</a></li></ul></li>';

// ==Acessos==
generarAccesoDirecto('http://img808.imageshack.us/img808/7414/amis.png', 'ami', 'Amistosos');
generarAccesoDirecto('http://img153.imageshack.us/img153/28/50973840.png', 'da', 'Discussão Aberta');
generarAccesoDirecto('http://img716.imageshack.us/img716/5849/selx.png', 'sel', 'Seleção Nacional');
generarAccesoDirecto('http://img714.imageshack.us/img714/8223/copj.png', 'cop', 'Copas');	
generarAccesoDirecto('http://img194.imageshack.us/img194/526/fedid.png', 'fed', 'Federações');
generarAccesoDirecto('http://img204.imageshack.us/img204/6264/talkc.png', 'mzh', 'Talk');
generarAccesoDirecto('http://img691.imageshack.us/img691/9638/15274107.png', 'pyr', 'P&R');
generarAccesoDirecto('http://img204.imageshack.us/img204/4453/72216387.png', 'sem', 'Sugestões e Melhorias');
generarAccesoDirecto('http://img810.imageshack.us/img810/4527/tran.png', 'mer', 'Transferências');
generarAccesoDirecto('http://img697.imageshack.us/img697/8493/relat.gif', 'rep', 'Relatório');
generarAccesoDirecto('http://img684.imageshack.us/img684/5244/bolaz.png', 'jug', 'Partidas Jogadas');


// ==Barra Lv==
var url = window.location.href.split('=');
if(url[1] == "guestbook&uid" || url[1] == "guestbook")
{
	armaPanel('writeForm', 'gb');
} 

// ==Barra Foro-Pizarra==
var url = window.location.href.split('&');
if(url[1] == "sub=topic")
{
	var tabla = document.getElementById('forumform')[0].parentNode;
}
else if(url[1] == "sub=topics")
{
	var tabla = document.getElementsByName('forumform')[0].parentNode;
}
else if(url[1] == "sub=board")
{
	armaPanel('writeform', 'pizarra');
}

filaNueva = tabla.insertRow(2);
var botones = '<td>CC-Bar</td><td>';
botones += "<img src='http://img534.imageshack.us/img534/3249/imagemywm.png' onmouseover='this.src=\"http://img62.imageshack.us/img62/489/imagem2bm.png\"' onmouseout='this.src=\"http://img534.imageshack.us/img534/3249/imagemywm.png\"' title='Inserir Imagem' alt='Inserir Imagem' id='btnaddImagen'/>&nbsp;";
botones += "<img src='http://img718.imageshack.us/img718/6552/negrigbbtn.png\' onmouseover='this.src=\"http://img831.imageshack.us/img831/2356/negritabtn.png\"' onmouseout='this.src=\"http://img718.imageshack.us/img718/6552/negrigbbtn.png\"' title='Negrito' alt='Negrito' id='btnnegrita'/>&nbsp;";  
botones += "<img src='http://img205.imageshack.us/img205/6507/87279893.png\' onmouseover='this.src=\"http://img19.imageshack.us/img19/3930/71676785.png\"' onmouseout='this.src=\"http://img205.imageshack.us/img205/6507/87279893.png\"' title='Itálico' alt='Itálico' id='btncursiva'/>&nbsp;";  
botones += "<img src='http://img832.imageshack.us/img832/4937/subragbbtn.png\' onmouseover='this.src=\"http://img201.imageshack.us/img201/3568/subrabtn.png\"' onmouseout='this.src=\"http://img832.imageshack.us/img832/4937/subragbbtn.png\"' title='Sublinhado' alt='Sublinhado' id='btnsubrayado'/>&nbsp;";    
botones += "<img src='http://img812.imageshack.us/img812/3993/parrafobtn2.png\' onmouseover='this.src=\"http://img818.imageshack.us/img818/7236/parrafobtn.png\"' onmouseout='this.src=\"http://img812.imageshack.us/img812/3993/parrafobtn2.png\"' title='Paragráfo' alt='Paragráfo' id='btnparrafo'/>&nbsp;";    
botones += "<img src='http://img809.imageshack.us/img809/4808/lbtn2.png\' onmouseover='this.src=\"http://img801.imageshack.us/img801/1333/lbtn.png\"' onmouseout='this.src=\"http://img809.imageshack.us/img809/4808/lbtn2.png\"' title='Lista' alt='Lista' id='btnlista'/>";    

filaNueva.innerHTML = botones;

filaNueva = tabla.insertRow(3);
botones = '<td>Icon-Bar</td><td>';
botones += "<img src='http://img295.imageshack.us/img295/9245/02iconbiggrin.gif' onmouseover='this.src=\"http://img295.imageshack.us/img295/9245/02iconbiggrin.gif\"' onmouseout='this.src=\"http://img295.imageshack.us/img295/9245/02iconbiggrin.gif\"' title='(n)' alt='(n)' id='btnaddIcono1'/>&nbsp;";
botones += "<img src='http://img688.imageshack.us/img688/9992/zoio.gif' onmouseover='this.src=\"http://img688.imageshack.us/img688/9992/zoio.gif\"' onmouseout='this.src=\"http://img688.imageshack.us/img688/9992/zoio.gif\"' title=':D' alt=':D' id='btnaddIcono2'/>&nbsp;";
botones += "<img src='http://img825.imageshack.us/img825/1710/03iconlol.gif' onmouseover='this.src=\"http://img825.imageshack.us/img825/1710/03iconlol.gif\"' onmouseout='this.src=\"http://img825.imageshack.us/img825/1710/03iconlol.gif\"' title='xD' alt='xD' id='btnaddIcono3'/>&nbsp;";
botones += "<img src='http://img818.imageshack.us/img818/5571/04iconsad.gif' onmouseover='this.src=\"http://img818.imageshack.us/img818/5571/04iconsad.gif\"' onmouseout='this.src=\"http://img818.imageshack.us/img818/5571/04iconsad.gif\"' title=':(' alt=':(' id='btnaddIcono4'/>&nbsp;";
botones += "<img src='http://img684.imageshack.us/img684/4012/chora.gif' onmouseover='this.src=\"http://img684.imageshack.us/img684/4012/chora.gif\"' onmouseout='this.src=\"http://img684.imageshack.us/img684/4012/chora.gif\"' title=':*(' alt=':*(' id='btnaddIcono5'/>&nbsp;";
botones += "<img src='http://img580.imageshack.us/img580/9481/07iconconfused.gif' onmouseover='this.src=\"http://img580.imageshack.us/img580/9481/07iconconfused.gif\"' onmouseout='this.src=\"http://img580.imageshack.us/img580/9481/07iconconfused.gif\"' title=':|' alt=':|' id='btnaddIcono6'/>&nbsp;";
botones += "<img src='http://img818.imageshack.us/img818/4599/fcu0hvjpg.png' onmouseover='this.src=\"http://img818.imageshack.us/img818/4599/fcu0hvjpg.png\"' onmouseout='this.src=\"http://img818.imageshack.us/img818/4599/fcu0hvjpg.png\"' title=':S' alt=':S' id='btnaddIcono7'/>&nbsp;";
botones += "<img src='http://img814.imageshack.us/img814/3261/iconsurprisedn.gif' onmouseover='this.src=\"http://img814.imageshack.us/img814/3261/iconsurprisedn.gif\"' onmouseout='this.src=\"http://img814.imageshack.us/img814/3261/iconsurprisedn.gif\"' title='8-)' alt='8-)' id='btnaddIcono8'/>&nbsp;";
botones += "<img src='http://img8.imageshack.us/img8/116/iconeekm.gif' onmouseover='this.src=\"http://img8.imageshack.us/img8/116/iconeekm.gif\"' onmouseout='this.src=\"http://img8.imageshack.us/img8/116/iconeekm.gif\"' title='¬¬' alt='¬¬' id='btnaddIcono9'/>&nbsp;";
botones += "<img src='http://img844.imageshack.us/img844/121/iconevilh.gif' onmouseover='this.src=\"http://img844.imageshack.us/img844/121/iconevilh.gif\"' onmouseout='this.src=\"http://img844.imageshack.us/img844/121/iconevilh.gif\"' title=':O' alt=':O' id='btnaddIcono10'/>&nbsp;";
botones += "<img src='http://img214.imageshack.us/img214/4828/icontwisted.gif' onmouseover='this.src=\"http://img214.imageshack.us/img214/4828/icontwisted.gif\"' onmouseout='this.src=\"http://img214.imageshack.us/img214/4828/icontwisted.gif\"' title='O.O' alt='O.O' id='btnaddIcono11'/>&nbsp;";
botones += "<img src='http://img46.imageshack.us/img46/4830/15iconrazz.gif' onmouseover='this.src=\"http://img46.imageshack.us/img46/4830/15iconrazz.gif\"' onmouseout='this.src=\"http://img46.imageshack.us/img46/4830/15iconrazz.gif\"' title=':@' alt=':@' id='btnaddIcono12'/>&nbsp;";
botones += "<img src='http://img638.imageshack.us/img638/5853/vergonha.gif' onmouseover='this.src=\"http://img638.imageshack.us/img638/5853/vergonha.gif\"' onmouseout='this.src=\"http://img638.imageshack.us/img638/5853/vergonha.gif\"' title='>:(' alt='>:(' id='btnaddIcono13'/>&nbsp;";
botones += "<img src='http://img841.imageshack.us/img841/1433/iconwinkk.gif' onmouseover='this.src=\"http://img841.imageshack.us/img841/1433/iconwinkk.gif\"' onmouseout='this.src=\"http://img841.imageshack.us/img841/1433/iconwinkk.gif\"' title='>:)' alt='>:)' id='btnaddIcono14'/>&nbsp;";
botones += "<img src='http://img155.imageshack.us/img155/7626/iconcoolp.gif' onmouseover='this.src=\"http://img155.imageshack.us/img155/7626/iconcoolp.gif\"' onmouseout='this.src=\"http://img155.imageshack.us/img155/7626/iconcoolp.gif\"' title=':P' alt=':P' id='btnaddIcono15'/>&nbsp;";
botones += "<img src='http://img121.imageshack.us/img121/2269/19uu.png' onmouseover='this.src=\"http://img121.imageshack.us/img121/2269/19uu.png\"' onmouseout='this.src=\"http://img121.imageshack.us/img121/2269/19uu.png\"' title=':$' alt=':$' id='btnaddIcono16'/>&nbsp;";
botones += "<img src='http://img836.imageshack.us/img836/8897/doh.gif' onmouseover='this.src=\"http://img836.imageshack.us/img836/8897/doh.gif\"' onmouseout='this.src=\"http://img836.imageshack.us/img836/8897/doh.gif\"' title=';)' alt=';)' id='btnaddIcono17'/>&nbsp;";
botones += "<img src='http://img825.imageshack.us/img825/692/thshifty.gif' onmouseover='this.src=\"http://img825.imageshack.us/img825/692/thshifty.gif\"' onmouseout='this.src=\"http://img825.imageshack.us/img825/692/thshifty.gif\"' title='(h)' alt='(h)' id='btnaddIcono18'/>&nbsp;";
botones += "<img src='http://img836.imageshack.us/img836/508/22good.gif' onmouseover='this.src=\"http://img836.imageshack.us/img836/508/22good.gif\"' onmouseout='this.src=\"http://img836.imageshack.us/img836/508/22good.gif\"' title='(n)' alt='(n)' id='btnaddIcono19'/>&nbsp;";
botones += "<img src='http://img843.imageshack.us/img843/9004/23bad.gif' onmouseover='this.src=\"http://img843.imageshack.us/img843/9004/23bad.gif\"' onmouseout='this.src=\"http://img843.imageshack.us/img843/9004/23bad.gif\"' title='(n)' alt='(n)' id='btnaddIcono20'/>&nbsp;";
botones += "<img src='http://img821.imageshack.us/img821/7177/iconarrowm.gif' onmouseover='this.src=\"http://img821.imageshack.us/img821/7177/iconarrowm.gif\"' onmouseout='this.src=\"http://img821.imageshack.us/img821/7177/iconarrowm.gif\"' title='(n)' alt='(n)' id='btnaddIcono21'/>&nbsp;";
botones += "<img src='http://img693.imageshack.us/img693/3541/iconexclaim.gif' onmouseover='this.src=\"http://img693.imageshack.us/img693/3541/iconexclaim.gif\"' onmouseout='this.src=\"http://img693.imageshack.us/img693/3541/iconexclaim.gif\"' title='(n)' alt='(n)' id='btnaddIcono22'/>&nbsp;";
botones += "<img src='http://img814.imageshack.us/img814/567/iconquestion.gif' onmouseover='this.src=\"http://img814.imageshack.us/img814/567/iconquestion.gif\"' onmouseout='this.src=\"http://img814.imageshack.us/img814/567/iconquestion.gif\"' title='(n)' alt='(n)' id='btnaddIcono23'/>&nbsp;";
botones += "<img src='http://img835.imageshack.us/img835/9628/iconsmile.gif' onmouseover='this.src=\"http://img835.imageshack.us/img835/9628/iconsmile.gif\"' onmouseout='this.src=\"http://img835.imageshack.us/img835/9628/iconsmile.gif\"' title=':)' alt=':)' id='btnaddIcono39'/>&nbsp;";
botones += "<img src='http://img4.imageshack.us/img4/9356/emoticons461.gif' onmouseover='this.src=\"http://img4.imageshack.us/img4/9356/emoticons461.gif\"' onmouseout='this.src=\"http://img4.imageshack.us/img4/9356/emoticons461.gif\"' title='u.u' alt='u.u' id='btnaddIcono24'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
botones += "<img src='http://img690.imageshack.us/img690/7189/agh.gif' onmouseover='this.src=\"http://img690.imageshack.us/img690/7189/agh.gif\"' onmouseout='this.src=\"http://img690.imageshack.us/img690/7189/agh.gif\"' title='(!)' alt='(!)' id='btnaddIcono25'/>&nbsp;&nbsp;";
botones += "<img src='http://img715.imageshack.us/img715/9465/emoticons465.gif' onmouseover='this.src=\"http://img715.imageshack.us/img715/9465/emoticons465.gif\"' onmouseout='this.src=\"http://img715.imageshack.us/img715/9465/emoticons465.gif\"' title='(n)' alt='(n)' id='btnaddIcono26'/>";
botones += "<img src='http://img251.imageshack.us/img251/4281/velho.gif' onmouseover='this.src=\"http://img251.imageshack.us/img251/4281/velho.gif\"' onmouseout='this.src=\"http://img251.imageshack.us/img251/4281/velho.gif\"' title='(y)' alt='(y)' id='btnaddIcono27'/>";
botones += "<img src='http://img706.imageshack.us/img706/6744/emoticons466.gif' onmouseover='this.src=\"http://img706.imageshack.us/img706/6744/emoticons466.gif\"' onmouseout='this.src=\"http://img706.imageshack.us/img706/6744/emoticons466.gif\"' title='(?)' alt='(?)' id='btnaddIcono28'/>";
botones += "<img src='http://img205.imageshack.us/img205/829/041r.gif' onmouseover='this.src=\"http://img205.imageshack.us/img205/829/041r.gif\"' onmouseout='this.src=\"http://img205.imageshack.us/img205/829/041r.gif\"' title='(?)' alt='(?)' id='btnaddIcono29'/>&nbsp;&nbsp;";
botones += "<img src='http://img38.imageshack.us/img38/5029/eusathink.gif' onmouseover='this.src=\"http://img38.imageshack.us/img38/5029/eusathink.gif\"' onmouseout='this.src=\"http://img38.imageshack.us/img38/5029/eusathink.gif\"' title='(?)' alt='(?)' id='btnaddIcono30'/>&nbsp;&nbsp;";
botones += "<img src='http://img580.imageshack.us/img580/7154/eusawall.gif' onmouseover='this.src=\"http://img580.imageshack.us/img580/7154/eusawall.gif\"' onmouseout='this.src=\"http://img580.imageshack.us/img580/7154/eusawall.gif\"' title='(?)' alt='(?)' id='btnaddIcono31'/>";
botones += "<img src='http://img29.imageshack.us/img29/7709/eusaclap.gif' onmouseover='this.src=\"http://img29.imageshack.us/img29/7709/eusaclap.gif\"' onmouseout='this.src=\"http://img29.imageshack.us/img29/7709/eusaclap.gif\"' title='(?)' alt='(?)' id='btnaddIcono32'/>";
botones += "<img src='http://img815.imageshack.us/img815/310/eusadance.gif' onmouseover='this.src=\"http://img815.imageshack.us/img815/310/eusadance.gif\"' onmouseout='this.src=\"http://img815.imageshack.us/img815/310/eusadance.gif\"' title='(?)' alt='(?)' id='btnaddIcono33'/>";
botones += "<img src='http://img842.imageshack.us/img842/2844/eusanaughty.gif' onmouseover='this.src=\"http://img842.imageshack.us/img842/2844/eusanaughty.gif\"' onmouseout='this.src=\"http://img842.imageshack.us/img842/2844/eusanaughty.gif\"' title='(?)' alt='(?)' id='btnaddIcono34'/>&nbsp;&nbsp;";
botones += "<img src='http://img543.imageshack.us/img543/6327/eusasnooty.gif' onmouseover='this.src=\"http://img543.imageshack.us/img543/6327/eusasnooty.gif\"' onmouseout='this.src=\"http://img543.imageshack.us/img543/6327/eusasnooty.gif\"' title='(?)' alt='(?)' id='btnaddIcono35'/>&nbsp;&nbsp;";
botones += "<img src='http://img715.imageshack.us/img715/1959/1111x.gif' onmouseover='this.src=\"http://img715.imageshack.us/img715/1959/1111x.gif\"' onmouseout='this.src=\"http://img715.imageshack.us/img715/1959/1111x.gif\"' title='(?)' alt='(?)' id='btnaddIcono36'/>";
botones += "<img src='http://img15.imageshack.us/img15/913/blablar.gif' onmouseover='this.src=\"http://img15.imageshack.us/img15/913/blablar.gif\"' onmouseout='this.src=\"http://img15.imageshack.us/img15/913/blablar.gif\"' title='(?)' alt='(?)' id='btnaddIcono37'/>";
botones += "<img src='http://img687.imageshack.us/img687/7708/emoticons347.gif' onmouseover='this.src=\"http://img687.imageshack.us/img687/7708/emoticons347.gif\"' onmouseout='this.src=\"http://img687.imageshack.us/img687/7708/emoticons347.gif\"' title='(?)' alt='(?)' id='btnaddIcono38'/>";


filaNueva.innerHTML = botones;

// ==Última página==
var pathArray = window.location.href.split('&');
if(pathArray[1] == "sub=topics")
{
	var htmlCountPost = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
    var tablaDePost = htmlCountPost.iterateNext();
    
	for(post = 2; post < tablaDePost.rows.length; post++)
	{
		link = tablaDePost.rows[post].cells[0].childNodes[0].href;
		celda = tablaDePost.rows[post].cells[1].innerHTML;
		datosPost = celda.split(" / ");
		cantidadDePaginas = Math.floor(parseInt(datosPost[1])/50);
		nuevo = "";
		if(cantidadDePaginas > 0)
			nuevo += "<a title='Ir a página 2' href='" + link + "&offset=50'>2</a>&#160;"
		if(cantidadDePaginas > 1)
			nuevo += "<a title='Ir a página 3' href='" + link + "&offset=100'>3</a>&#160;"
		if(cantidadDePaginas > 2)
			nuevo += "<a title='Ir a página 4' href='" + link + "&offset=150'>4</a>&#160;"
		if(cantidadDePaginas > 3)
			nuevo += "<a title='Ir a última página' href='" + link + "&offset=" + (cantidadDePaginas*50) + "'>&#187;</a>"
		if(cantidadDePaginas > 0)
			nuevo = "&#160;(" + nuevo + ")";
		tablaDePost.rows[post].cells[1].innerHTML = celda + nuevo;
	}
}


// ***LV***
var pathArray = window.location.href.split('&');
if(pathArray[1] == "sub=topic")
{
	var id;
	var nombre;
	var TDs = document.getElementsByTagName('TD');
	for(fila = 0; fila < TDs.length; fila++)
	{
		if(TDs[fila].className == 'listsecondary')
		{
			if(TDs[fila].childNodes[1].tagName == 'TABLE')
			{
				celdaSacarId = TDs[fila].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];
				if(celdaSacarId.childNodes[3].tagName == "A")
				{
					id = celdaSacarId.childNodes[3].href.split("&")[1].replace("uid=", "");
					nombre = celdaSacarId.childNodes[3].text;
				}
				else
				{
					nombre = celdaSacarId.childNodes[5].text;
					id = celdaSacarId.childNodes[5].href.split("&")[1].replace("uid=", "");
				}

				celdaSacarId.innerHTML = celdaSacarId.innerHTML + " <a title='Lv de "+ nombre +"' href='/?p=guestbook&uid=" + id + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;Lv&nbsp;</b></a> ";
			}
		}
	}
}