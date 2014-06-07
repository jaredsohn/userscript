// ==UserScript==
// @name           Script Managerzone Brazil
// @description    Acesso aos BBcodes em geral.
// @include        http://*managerzone.*
// @version        1.5
// @copyright      murilostein and brnrdr
// @authors        ->*****UPDATE VERSION TO BRAZIL****** by: murilostein(latin american version: c_c & serbocapo)
//
// ==/UserScript==


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

function generarImagen(url, idImg, elementID, tipo){
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
	generarImagen('http://img9.imageshack.us/img9/6317/imagemvio.png', 'btnaddImagen2', elementID, tipo);
	generarImagen('http://i48.tinypic.com/2akb6dj.jpg', 'btnnegrita2', elementID, tipo);
	generarImagen('http://img205.imageshack.us/img205/6507/87279893.png', 'btncursiva2', elementID, tipo);
	generarImagen('http://i47.tinypic.com/289ekir.jpg', 'btnsubrayado2', elementID, tipo);	
	generarImagen('http://i48.tinypic.com/245n9l1.jpg', 'addIcono2', elementID, tipo);
	generarImagen('http://i46.tinypic.com/2hg5ydj.jpg', 'addIcono3', elementID, tipo);
	generarImagen('http://i45.tinypic.com/21ak2dj.jpg', 'addIcono4', elementID, tipo);
	generarImagen('http://i45.tinypic.com/9rkkkj.jpg', 'addIcono5', elementID, tipo);
	generarImagen('http://i48.tinypic.com/288397k.jpg', 'addIcono6', elementID, tipo);
	generarImagen('http://i50.tinypic.com/29kuds2.jpg', 'addIcono7', elementID, tipo);
	generarImagen('http://i46.tinypic.com/a3do8z.jpg', 'addIcono8', elementID, tipo);
	generarImagen('http://i46.tinypic.com/ir47lj.jpg', 'addIcono9', elementID, tipo);
	generarImagen('http://i50.tinypic.com/sqk01s.jpg', 'addIcono11', elementID, tipo);
	generarImagen('http://i46.tinypic.com/n69roy.jpg', 'addIcono13', elementID, tipo);
	generarImagen('http://i45.tinypic.com/au8uxf.jpg', 'addIcono15', elementID, tipo);
	generarImagen('http://i47.tinypic.com/2m32slt.jpg', 'addIcono18', elementID, tipo);
	generarImagen('http://i50.tinypic.com/w6xsgh.jpg', 'addIcono17', elementID, tipo);
	generarImagen('http://i47.tinypic.com/2yyuywm.jpg', 'addIcono19', elementID, tipo);
	generarImagen('http://i48.tinypic.com/hum51h.jpg', 'addIcono22', elementID, tipo);
	generarImagen('http://i47.tinypic.com/1z14pcl.jpg', 'addIcono23', elementID, tipo);
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
			posteaIcono('http://i50.tinypic.com/2cie2rt.jpg','message');
			break;
		case "btnaddIcono2": 
			posteaIcono('http://i50.tinypic.com/dz6noo.jpg','message');
			break;
		case "btnaddIcono3": 
			posteaIcono('http://i46.tinypic.com/2hg5ydj.jpg','message');
			break;
		case "btnaddIcono4": 
			posteaIcono('http://i46.tinypic.com/23wwt3b.jpg','message');
			break;
		case "btnaddIcono5": 
			posteaIcono('http://i45.tinypic.com/9rkkkj.jpg','message');
			break;
		case "btnaddIcono6": 
			posteaIcono('http://i50.tinypic.com/2h728f4.jpg','message');
			break;
		case "btnaddIcono7": 
			posteaIcono('http://i49.tinypic.com/ej8rhc.jpg','message');
			break;
		case "btnaddIcono8": 
			posteaIcono('http://i46.tinypic.com/a3do8z.jpg','message');
			break;
		case "btnaddIcono9": 
			posteaIcono('http://i45.tinypic.com/fcu0hv.jpg','message');
			break;
		case "btnaddIcono10": 
			posteaIcono('http://i45.tinypic.com/30cyk9c.jpg','message');
			break;
		case "btnaddIcono11": 
			posteaIcono('http://i50.tinypic.com/sqk01s.jpg','message');
			break;
		case "btnaddIcono12": 
			posteaIcono('http://i49.tinypic.com/2ch75au.jpg','message');
			break;
		case "btnaddIcono13": 
			posteaIcono('http://i47.tinypic.com/2zdvs00.jpg','message');
			break;
		case "btnaddIcono14": 
			posteaIcono('http://i49.tinypic.com/1zv30og.jpg','message');
			break;
		case "btnaddIcono15": 
			posteaIcono('http://i50.tinypic.com/rasw91.jpg','message');
			break;
		case "btnaddIcono16": 
			posteaIcono('http://i49.tinypic.com/24lpq3k.jpg','message');
			break;
		case "btnaddIcono17": 
			posteaIcono('http://i49.tinypic.com/atvpj5.jpg','message');
			break;
		case "btnaddIcono18": 
			posteaIcono('http://i47.tinypic.com/2m32slt.jpg','message');
			break;
		case "btnaddIcono19": 
			posteaIcono('http://i47.tinypic.com/2yyuywm.jpg','message');
			break;
		case "btnaddIcono20": 
			posteaIcono('http://i48.tinypic.com/fjez6h.jpg','message');
			break;
		case "btnaddIcono21": 
			posteaIcono('http://i48.tinypic.com/2573qt0.jpg','message')
			break;
		case "btnaddIcono22": 
			posteaIcono('http://i48.tinypic.com/5uobbk.jpg','message');
			break;
		case "btnaddIcono23": 
			posteaIcono('http://i47.tinypic.com/1z14pcl.jpg','message');
			break;
		case "addIcono2": 
			posteaIcono('http://i50.tinypic.com/dz6noo.jpg','msg');
			break;
		case "addIcono3": 
			posteaIcono('http://i46.tinypic.com/2hg5ydj.jpg','msg');
			break;
		case "addIcono4": 
			posteaIcono('http://i46.tinypic.com/23wwt3b.jpg','msg');
			break;
		case "addIcono5": 
			posteaIcono('http://i45.tinypic.com/9rkkkj.jpg','msg');
			break;
		case "addIcono6": 
			posteaIcono('http://i50.tinypic.com/2h728f4.jpg','msg');
			break;
		case "addIcono7": 
			posteaIcono('http://i49.tinypic.com/ej8rhc.jpg','msg');
			break;
		case "addIcono8": 
			posteaIcono('http://i46.tinypic.com/a3do8z.jpg','msg');
			break;
		case "addIcono9": 
			posteaIcono('http://i45.tinypic.com/fcu0hv.jpg','msg');
			break;
		case "addIcono11": 
			posteaIcono('http://i50.tinypic.com/sqk01s.jpg','msg');
			break;
		case "addIcono13": 
			posteaIcono('http://i47.tinypic.com/2zdvs00.jpg','msg');
			break;
		case "addIcono15": 
			posteaIcono('http://i50.tinypic.com/rasw91.jpg','msg');
			break;
		case "addIcono18": 
			posteaIcono('http://i47.tinypic.com/2m32slt.jpg','msg');
			break;
		case "addIcono17": 
			posteaIcono('http://i49.tinypic.com/atvpj5.jpg','msg');
			break;
		case "addIcono19": 
			posteaIcono('http://i47.tinypic.com/2yyuywm.jpg','msg');
			break;
		case "addIcono22": 
			posteaIcono('http://i48.tinypic.com/5uobbk.jpg','msg');
			break;
		case "addIcono23": 
			posteaIcono('http://i47.tinypic.com/1z14pcl.jpg','msg');
			break;
	}
}, true);

// ==Sub-Menús==
var sedeclub = document.getElementById('top_item_clubhouse_sub');
sedeclub.innerHTML = '<li><a href="?p=clubhouse">Página Inicial</a></li><li onmouseover="document.getElementById(\'lequipo\').style.display=\'block\'" onmouseout="document.getElementById(\'lequipo\').style.display=\'none\'"><a href="?p=team">Meu Time</a><ul id="lequipo" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:137px;"><a href="?p=team&sub=alter" style="text-align:left;">Editar Info</a></li><li style="width:137px;"><a href="?p=team&sub=alterbadge" style="text-align:left;">Editar Escudo</a></li><li style="width:137px;"><a href="?p=team&sub=alterjersey" style="text-align:left;">Editar Camisa</a></li><li style="width:137px;"><a href="?p=team&sub=sponsor " style="text-align:left;">Patrocinador</a></li>><li style="width:137px;"><a href="?p=team&sub=press" style="text-align:left;">Sala de Imprensa</a></li></ul></li></li><li onmouseover="document.getElementById(\'ljug\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug\').style.display=\'none\'"><a href="?p=players">Jogadores</a><ul id="ljug" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=players&sub=alt" style="text-align:left;">Alt. Visual</a></li><li style="width:120px;"><a href="?p=players&sub=unavailable" style="text-align:left;">Machucado/Susp</a></li><li style="width:120px;"><a href="?p=players&sub=changenumbers" style="text-align:left;">Trocar Números</a></li><li style="width:120px;"><a href="?p=players&sub=retired" style="text-align:left;">Aposentados</a></li><li style="width:120px;"><a href="?p=players&sub=stats " style="text-align:left;">Mostrar Estatísticas</a></li></ul></li><li><a href="?p=tactics&myTactic=1">Táticas</a></li><li onmouseover="document.getElementById(\'lentre\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre\').style.display=\'none\'"><a href="?p=training_home">Treinamento</a><ul id="lentre" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:150px;"><a href="?p=training_camp" style="text-align:left;">Campo de Treinamento</a></li><li style="width:150px;"><a href="?p=training_report" style="text-align:left;">Relatório Treinamento</a></li><li style="width:150px;"><a href="?p=training" style="text-align:left;">Área de Treinamento</a></li></ul></li><li onmouseover="document.getElementById(\'lentre2\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre2\').style.display=\'none\'"><a href="?p=trainers">Contratar Técnicos</a><ul id="lentre2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:149px;"><a href="?p=trainers&sub=negotiations" style="text-align:left;">Negociações</a><li style="width:149px;"><a href="?p=trainers&sub=freeagents" style="text-align:left;">Treinadores Disponíveis</a><li style="width:149px;"><a href="?p=trainers&sub=settings" style="text-align:left;">Ajustes</a></li></ul></li><li onmouseover="document.getElementById(\'lmerc\').style.display=\'block\'" onmouseout="document.getElementById(\'lmerc\').style.display=\'none\'"><a href="?p=transfer">Transferências</a><ul id="lmerc" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:140px;"><a href="?p=transfer&sub=yourplayers" style="text-align:left;">Monitorar</a></li><li style="width:140px;"><a href="?p=transfer_history" style="text-align:left;">Hist.Transferências</a><li style="width:140px;"><a href="?p=transfer&sub=category" style="text-align:left;">Suas Categorias</a></li></ul></li><li><a href="?p=shortlist">Jogadores Favoritos</a></li><li><a href="?p=economy&sub=education">Juvenis</a></li>';

var partidos = document.getElementById('top_item_matches_sub');
partidos.innerHTML = '<li onmouseover="document.getElementById(\'lliga\').style.display=\'block\'" onmouseout="document.getElementById(\'lliga\').style.display=\'none\'"><a href="?p=series">Liga Oficial</a><ul id="lliga" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:150px;"><a href="?p=series" style="text-align:left;">Tabela da Liga</a></li><li style="width:150px;"><a href="?p=series&sub=schedule" style="text-align:left;">Agenda Liga</a></li><li style="width:150px;"><a href="?p=series&sub=topscorer" style="text-align:left;">Artilheiro</a></li><li style="width:150px;"><a href="?p=series&sub=unavailable" style="text-align:left;">Machucado/Suspenso</a></li><li style="width:150px;"><a href="?p=series&sub=board" style="text-align:left;">Quadro de Avisos</a></li><li style="width:150px;"><a href="?p=series&sub=promotions" style="text-align:left;">Temporada Anterior</a></li><li style="width:150px;"><a href="?p=series&sub=pre_qual" style="text-align:left;">Qualificação Anterior</a></li></ul></li><li onmouseover="document.getElementById(\'ljug2\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug2\').style.display=\'none\'"><a href="?p=match&sub=played">Resultados</a><ul id="ljug2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:130px;"><a href="?p=match&sub=played&hidescore=1" style="text-align:left;">Resultados Ocultos</a></li></ul></li><li><a href="?p=match&sub=scheduled">Agendadas</a></li><li onmouseover="document.getElementById(\'lam\').style.display=\'block\'" onmouseout="document.getElementById(\'lam\').style.display=\'none\'"><a href="?p=challenges">Amistosos</a><ul id="lam" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:83px;"><a href="?p=challenges&sub=friendly" style="text-align:left;">Aceitos</a></li></ul></li><li onmouseover="document.getElementById(\'lcop\').style.display=\'block\'" onmouseout="document.getElementById(\'lcop\').style.display=\'none\'"><a href="?p=cup&sub=cup_home">Copas</a><ul id="lcop" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=cup&sub=list&type=my" style="text-align:left;">Todas as Copas</a></li><li style="width:120px;"><a href="?p=private_cup" style="text-align:left;">Copas de Amigos</a></li><li style="width:120px;"><a href="?p=private_cup&cuptype=partner" style="text-align:left;">Copas de Parceria</a></li></ul></li><li><a href="?p=friendlyseries">Ligas de Amigos</a></li><li><a href="?p=topteams">Desafiar Tops</a></li><li><a href="?p=match&sub=livescores_overview">LiveScores</a></li><li><a href="?p=national_teams">Seleção Nacional</a></li>';

var ayuda = document.getElementById('top_item_help_sub');
ayuda.innerHTML = '<li><a href="?p=support_form">Suporte</a></li><li><a href="?p=language_support">Suporte de Idiomas</a></li><li><a href="?p=search">Pesquisar</a></li><li><a href="?p=tutorial">Tutorial</a></li><li><a href="?p=manual_faq&sub=manual">Manual</a></li><li><a href="?p=manual_faq&sub=FAQ">FAQ</a></li><li><a href="?p=manual_faq&section=0">Regras Gerais</a></li><li><a href="?p=manual_faq&section=1">Regras do Fórum</a></li><li><a href="?p=transfer&sub=rules">Regras de Transferências</a></li><li onmouseover="document.getElementById(\'lguias\').style.display=\'block\'" onmouseout="document.getElementById(\'lguias\').style.display=\'none\'"><a href=>Tópicos Ajuda</a><ul id="lguias" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:172px;"><a href="?p=forum&sub=topic&topic_id=3303186&forum_id=49&sport=soccer" style="text-align:left;">PD e LV</a></li><li style="width:172px;"><a href="?p=forum&sub=topic&topic_id=5365000&forum_id=49&sport=soccer" style="text-align:left;">Treinadores:Contratação</a></li><li style="width:172px;"><a href="?p=forum&sub=topic&topic_id=4399498&forum_id=49&sport=soccer" style="text-align:left;">Treinamentos</a></li><li style="width:172px;"><a href="?p=forum&sub=topic&topic_id=3224432&forum_id=49&sport=soccer" style="text-align:left;">Transferências</a></li><li style="width:172px;"><a href="?p=forum&sub=topic&topic_id=3720739&forum_id=49&sport=soccer" style="text-align:left;">Dicas Estádios</a></li><li style="width:172px;"><a href="?p=forum&sub=topic&topic_id=3133391&forum_id=49&sport=soccer" style="text-align:left;">Tudo sobre CT</a></li><a href="?p=forum&sub=topic&topic_id=8456751&forum_id=49&sport=soccer" style="text-align:left;">Perguntas Frequentes</a></li><a href="?p=forum&sub=topic&topic_id=4399498&forum_id=49&sport=soccer" style="text-align:left;">Treinamentos p/ os jogadores</a></li></ul></li>';

// ==Acessos==
generarAccesoDirecto('http://img808.imageshack.us/img808/7414/amis.png', 'ami', 'Amistosos');
generarAccesoDirecto('http://img153.imageshack.us/img153/28/50973840.png', 'da', 'Discussão Aberta');
generarAccesoDirecto('http://img692.imageshack.us/img692/8746/selg.png', 'sel', 'Seleção Nacional');
generarAccesoDirecto('http://img714.imageshack.us/img714/8223/copj.png', 'cop', 'Copas');	
generarAccesoDirecto('http://img227.imageshack.us/img227/7779/fed.png', 'fed', 'Federações');
generarAccesoDirecto('http://img204.imageshack.us/img204/6264/talkc.png', 'mzh', 'Talk');
generarAccesoDirecto('http://img514.imageshack.us/img514/5171/74211124.png', 'pyr', 'P&R');
generarAccesoDirecto('http://img204.imageshack.us/img204/4453/72216387.png', 'sem', 'Sugestões e Melhorias');
generarAccesoDirecto('http://img810.imageshack.us/img810/4527/tran.png', 'mer', 'Transferências');
generarAccesoDirecto('http://i49.tinypic.com/4sz8rb.jpg', 'rep', 'Relatório');
generarAccesoDirecto('http://i46.tinypic.com/bdwgab.jpg', 'jug', 'Partidas Jogadas');


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
var botones = '<td>BB-Codes</td><td>';
botones += "<img src='http://img9.imageshack.us/img9/6317/imagemvio.png' onmouseover='this.src=\"http://img62.imageshack.us/img62/489/imagem2bm.png\"' onmouseout='this.src=\"http://img9.imageshack.us/img9/6317/imagemvio.png\"' title='Inserir Imagem' alt='Inserir Imagem' id='btnaddImagen'/>&nbsp;";
botones += "<img src='http://i49.tinypic.com/10cu344.png' onmouseover='this.src=\"http://i48.tinypic.com/2qlg7rc.png\"' onmouseout='this.src=\"http://i49.tinypic.com/10cu344.png\"' title='Negrito' alt='Negrito' id='btnnegrita'/>&nbsp;";  
botones += "<img src='http://img205.imageshack.us/img205/6507/87279893.png\' onmouseover='this.src=\"http://img19.imageshack.us/img19/3930/71676785.png\"' onmouseout='this.src=\"http://img205.imageshack.us/img205/6507/87279893.png\"' title='Itálico' alt='Itálico' id='btncursiva'/>&nbsp;";  
botones += "<img src='http://i45.tinypic.com/2zz3lw7.png' onmouseover='this.src=\"http://i45.tinypic.com/vgjz8m.png\"' onmouseout='this.src=\"http://i45.tinypic.com/2zz3lw7.png\"' title='Sublinhado' alt='Sublinhado' id='btnsubrayado'/>&nbsp;";    
botones += "<img src='http://i50.tinypic.com/2a15za.png' onmouseover='this.src=\"http://i45.tinypic.com/1gm3o0.png\"' onmouseout='this.src=\"http://i50.tinypic.com/2a15za.png\"' title='Paragráfo' alt='Paragráfo' id='btnparrafo'/>&nbsp;";    
botones += "<img src='http://i49.tinypic.com/15f11c8.png' onmouseover='this.src=\"http://i48.tinypic.com/16k5n5i.png\"' onmouseout='this.src=\"http://i49.tinypic.com/15f11c8.png\"' title='Lista' alt='Lista' id='btnlista'/>";    

filaNueva.innerHTML = botones;

filaNueva = tabla.insertRow(3);
botones = '<td>Smiles</td><td>';
botones += "<img src='http://i50.tinypic.com/2cie2rt.jpg' onmouseover='this.src=\"http://i50.tinypic.com/2cie2rt.jpg\"' onmouseout='this.src=\"http://i50.tinypic.com/2cie2rt.jpg\"' title=':)' alt=':)' id='btnaddIcono1'/>&nbsp;";
botones += "<img src='http://i50.tinypic.com/dz6noo.jpg' onmouseover='this.src=\"http://i50.tinypic.com/dz6noo.jpg\"' onmouseout='this.src=\"http://i50.tinypic.com/dz6noo.jpg\"' title=':D' alt=':D' id='btnaddIcono2'/>&nbsp;";
botones += "<img src='http://i46.tinypic.com/2hg5ydj.jpg' onmouseover='this.src=\"http://i46.tinypic.com/2hg5ydj.jpg\"' onmouseout='this.src=\"http://i46.tinypic.com/2hg5ydj.jpg\"' title='xD' alt='xD' id='btnaddIcono3'/>&nbsp;";
botones += "<img src='http://i46.tinypic.com/23wwt3b.jpg' onmouseover='this.src=\"http://i46.tinypic.com/23wwt3b.jpg\"' onmouseout='this.src=\"http://i46.tinypic.com/23wwt3b.jpg\"' title=':(' alt=':(' id='btnaddIcono4'/>&nbsp;";
botones += "<img src='http://i45.tinypic.com/9rkkkj.jpg' onmouseover='this.src=\"http://i45.tinypic.com/9rkkkj.jpg\"' onmouseout='this.src=\"http://i45.tinypic.com/9rkkkj.jpg\"' title=':*(' alt=':*(' id='btnaddIcono5'/>&nbsp;";
botones += "<img src='http://i50.tinypic.com/2h728f4.jpg' onmouseover='this.src=\"http://i50.tinypic.com/2h728f4.jpg\"' onmouseout='this.src=\"http://i50.tinypic.com/2h728f4.jpg\"' title=':|' alt=':|' id='btnaddIcono6'/>&nbsp;";
botones += "<img src='http://i49.tinypic.com/ej8rhc.jpg' onmouseover='this.src=\"http://i49.tinypic.com/ej8rhc.jpg\"' onmouseout='this.src=\"http://i49.tinypic.com/ej8rhc.jpg\"' title=':S' alt=':S' id='btnaddIcono7'/>&nbsp;";
botones += "<img src='http://i46.tinypic.com/a3do8z.jpg' onmouseover='this.src=\"http://i46.tinypic.com/a3do8z.jpg\"' onmouseout='this.src=\"http://i46.tinypic.com/a3do8z.jpg\"' title='8-)' alt='8-)' id='btnaddIcono8'/>&nbsp;";
botones += "<img src='http://i45.tinypic.com/fcu0hv.jpg' onmouseover='this.src=\"http://i45.tinypic.com/fcu0hv.jpg\"' onmouseout='this.src=\"http://i45.tinypic.com/fcu0hv.jpg\"' title='¬¬' alt='¬¬' id='btnaddIcono9'/>&nbsp;";
botones += "<img src='http://i45.tinypic.com/30cyk9c.jpg' onmouseover='this.src=\"http://i45.tinypic.com/30cyk9c.jpg\"' onmouseout='this.src=\"http://i45.tinypic.com/30cyk9c.jpg\"' title=':O' alt=':O' id='btnaddIcono10'/>&nbsp;";
botones += "<img src='http://i50.tinypic.com/sqk01s.jpg' onmouseover='this.src=\"http://i50.tinypic.com/sqk01s.jpg\"' onmouseout='this.src=\"http://i50.tinypic.com/sqk01s.jpg\"' title='O.O' alt='O.O' id='btnaddIcono11'/>&nbsp;";
botones += "<img src='http://i49.tinypic.com/2ch75au.jpg' onmouseover='this.src=\"http://i49.tinypic.com/2ch75au.jpg\"' onmouseout='this.src=\"http://i49.tinypic.com/2ch75au.jpg\"' title=':@' alt=':@' id='btnaddIcono12'/>&nbsp;";
botones += "<img src='http://i47.tinypic.com/2zdvs00.jpg' onmouseover='this.src=\"http://i47.tinypic.com/2zdvs00.jpg\"' onmouseout='this.src=\"http://i47.tinypic.com/2zdvs00.jpg\"' title='>:(' alt='>:(' id='btnaddIcono13'/>&nbsp;";
botones += "<img src='http://i49.tinypic.com/1zv30og.jpg' onmouseover='this.src=\"http://i49.tinypic.com/1zv30og.jpg\"' onmouseout='this.src=\"http://i49.tinypic.com/1zv30og.jpg\"' title='>:)' alt='>:)' id='btnaddIcono14'/>&nbsp;";
botones += "<img src='http://i50.tinypic.com/rasw91.jpg' onmouseover='this.src=\"http://i50.tinypic.com/rasw91.jpg\"' onmouseout='this.src=\"http://i50.tinypic.com/rasw91.jpg\"' title=':P' alt=':P' id='btnaddIcono15'/>&nbsp;";
botones += "<img src='http://i49.tinypic.com/24lpq3k.jpg' onmouseover='this.src=\"http://i49.tinypic.com/24lpq3k.jpg\"' onmouseout='this.src=\"http://i49.tinypic.com/24lpq3k.jpg\"' title=':$' alt=':$' id='btnaddIcono16'/>&nbsp;";
botones += "<img src='http://i49.tinypic.com/atvpj5.jpg' onmouseover='this.src=\"http://i49.tinypic.com/atvpj5.jpg\"' onmouseout='this.src=\"http://i49.tinypic.com/atvpj5.jpg\"' title=';)' alt=';)' id='btnaddIcono17'/>&nbsp;";
botones += "<img src='http://i47.tinypic.com/2m32slt.jpg' onmouseover='this.src=\"http://i47.tinypic.com/2m32slt.jpg\"' onmouseout='this.src=\"http://i47.tinypic.com/2m32slt.jpg\"' title='(h)' alt='(h)' id='btnaddIcono18'/>&nbsp;";
botones += "<img src='http://i47.tinypic.com/2yyuywm.jpg' onmouseover='this.src=\"http://i47.tinypic.com/2yyuywm.jpg\"' onmouseout='this.src=\"http://i47.tinypic.com/2yyuywm.jpg\"' title='u.u' alt='u.u' id='btnaddIcono19'/>&nbsp;";
botones += "<img src='http://i48.tinypic.com/fjez6h.jpg' onmouseover='this.src=\"http://i48.tinypic.com/fjez6h.jpg\"' onmouseout='this.src=\"http://i48.tinypic.com/fjez6h.jpg\"' title='(!)' alt='(!)' id='btnaddIcono20'/>&nbsp;";
botones += "<img src='http://i48.tinypic.com/2573qt0.jpg' onmouseover='this.src=\"http://i48.tinypic.com/2573qt0.jpg\"' onmouseout='this.src=\"http://i48.tinypic.com/2573qt0.jpg\"' title='(?)' alt='(?)' id='btnaddIcono21'/>&nbsp;";
botones += "<img src='http://i48.tinypic.com/5uobbk.jpg' onmouseover='this.src=\"http://i48.tinypic.com/5uobbk.jpg\"' onmouseout='this.src=\"http://i48.tinypic.com/5uobbk.jpg\"' title='(y)' alt='(y)' id='btnaddIcono22'/>&nbsp;";
botones += "<img src='http://i47.tinypic.com/1z14pcl.jpg' onmouseover='this.src=\"http://i47.tinypic.com/1z14pcl.jpg\"' onmouseout='this.src=\"http://i47.tinypic.com/1z14pcl.jpg\"' title='(n)' alt='(n)' id='btnaddIcono23'/>";

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

// ==Lv==
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