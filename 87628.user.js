// ==UserScript==
// @name           ManagerzoneScrypt
// @description    Scrypt usprawniający MZ
// @include        http://*managerzone.*
// @version        2.7
// @copyright      Copyright (c) 2010, zuri23
// @authors        zuri23
// ==/UserScript==

// START DB
/*
  Modificando la DB (START...END) se puede personalizar
  el script para cualquier comunidad MZ.
*/ 

//..Texto que aparece en el título del post que abre la federación.
var textForoFede = 'Fed. Season 23';

var leagues = new Array();
//.............['friendlyleagueName', friendlyleagueId]
leagues[0] = ['Season 23 A Temp 34', 419412];
leagues[1] = ['Season 23 B Temp 34', 420848];
leagues[2] = ['Season 23 C Temp 34', 421039];
leagues[3] = ['Superliga 23', 422208];

var managers = new Array();
//..............['userName', userId, teamName, teamId, seriesName, seriesId]
managers[0] = ['menchosrevenge', 3430760, 'Fake Nibiru F.N.C.', 288878, 'div2.6', 16105];
managers[1] = ['kastoffe', 3439966, 'La Cueva del Kastoffe', 969706, 'div3.12', 16120];
managers[2] = ['firuleta', 3432656, 'pajaros boys', 965663, 'div3.13', 16121];
managers[3] = ['maluva', 3517664, 'Churcal FC', 985957, 'div3.21', 16129];
managers[4] = ['naranjamecanicafc', 3433462, 'Naranja Mecanica F.C.', 966213, 'div3.27', 16135];
managers[5] = ['sadra_arb', 3465073, 'S.A.D.R.A. F.C.', 976320, 'div3.5', 16113];
managers[6] = ['bluestyle', 3435101, 'Tinta Azul FC', 967033, 'div4.14', 16149];
managers[7] = ['ciqui', 3441884, 'LOS WATUSIS', 970869, 'div4.16', 16151];
managers[8] = ['kasnaider', 3486246, 'Kasnaidër', 979974, 'div4.18', 16153];
managers[9] = ['july_garfield', 3506119, 'Capioví', 983579, 'div4.21', 16156];
managers[10] = ['leproso1955', 3480050, 'Rojinegro', 978141, 'div4.24', 16159];
managers[11] = ['polaco78', 3641270, 'club atletico rive', 972047, 'div4.3', 16138];
managers[12] = ['ilcapone', 3433479, 'Carapachin FC', 966226, 'div4.36', 16171];
managers[13] = ['marcosc', 3624707, 'Vizards', 965665, 'div4.38', 16173];
managers[14] = ['m8g8', 3456447, 'Estación Quequén', 973829, 'div4.4', 16175];
managers[15] = ['pappito_blues', 3521404, 'Taquello FC', 986581, 'div4.45', 16180];
managers[16] = ['campanaunited', 3475980, 'CAMPANA UNITED', 464578, 'div4.49', 16184];
managers[17] = ['tilcarense', 3579902, 'Tilcarense Futbol Club', 996281, 'div4.51', 16186];
managers[18] = ['sebasgc', 3521549, 'Cotita', 986679, 'div4.54', 16189];
managers[19] = ['nicocapo20', 3543929, 'C. A. MALA LECHE', 990590, 'div4.6', 16141];
managers[20] = ['jajurise', 3480411, 'Branca y Coca LFC', 978266, 'div4.63', 16198];
managers[21] = ['marcelius', 3437025, 'At. Marçelonia Saudade', 969655, 'div4.65', 16200];
managers[22] = ['bokreclub', 3432073, 'Amoschina FC', 965303, 'div4.7', 16142];
managers[23] = ['cuervo-ar', 3511388, 'San Lorenzo de Sarandi', 984657, 'div4.74', 16209];
managers[24] = ['elyuyo', 3628478, 'EL YUYO F.C.', 966472, 'div4.74', 16209];
managers[25] = ['leygi', 3514353, 'infierno c.a', 985354, 'div4.75', 16210];
managers[26] = ['jonatense', 3432962, 'Errecaborda AFC', 965872, 'div4.77', 16212];
managers[27] = ['caporalmdq_jr', 3437343, 'ES EL EQUIPO DE ROMAN', 969570, 'div4.78', 16213];
managers[28] = ['titan_auriazul', 3431669, 'Petroquímica', 965070, 'div4.78', 16213];
managers[29] = ['lemur2004', 3443786, 'Animales Sueltos', 971119, 'div4.79', 16214];
managers[30] = ['pepearg507', 3607528, 'PEPEARG F.C.', 1000374, 'div5.115', 16331];
managers[31] = ['lavezzi177', 3435955, 'Cuervada FC', 967637, 'div5.142', 16358];
managers[32] = ['babel11', 3496211, 'Unzué', 981699, 'div5.15', 16231];
managers[33] = ['santiagom65', 3481445, 'Virreyes AFC', 978811, 'div5.156', 16372];
managers[34] = ['ficha24', 3489211, 'C.D.TOMASODA DE SUNCHALES', 980519, 'div5.161', 16377];
managers[35] = ['rauldg', 3469892, 'CLUB MIRASOLES', 977315, 'div5.220', 16436];
managers[36] = ['onailime31', 3433304, 'colegiales es de River', 966103, 'div5.229', 16445];
managers[37] = ['educhueco', 3446659, 'Turkos Back', 183249, 'div5.237', 16453];
managers[38] = ['diego0818', 3639073, 'Talleres Cba', 970794, 'div5.82', 16298];
managers[39] = ['v2a', 2462258, 'EL EQUIPO DE MADELON', 462759, 'div6.455', 19838];
managers[40] = ['zomoza', 3656470, 'Gavilán AFC', 1005227, 'div4.20', 16155];
managers[41] = ['luisgoytea', 3440443, 'Miramar', 969897, 'div5.34', 16250];

// END DB
//************

//************
// START Global

var sortManagerFor = null;
var lastzIndex = 0;
var isIE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);

// END Global
//************

//************
// Start Functions

function getManagerData(managerName)
{
  var managerData = null;
  var i = 0;
  var abort = false;
  sortManagersByName();
  while ((i<managers.length) && (!abort) && (managerData == null))
  {
    if (managers[i][0] == managerName)
    {
      managerData = managers[i];  
    }
    else
    {
      if (managers[i][0] < managerName)
      {
        i++;
      }
      else
      {
        abort = true;
      }
    }
  }
  return managerData;
};
function getHtmlManagerTB(managerName, managerId, managerData)
{
  var htmlTB = '';
  if (managerData == null)
  {
    htmlTB =
      '<span style="color:white;font-weight:bold">'+ managerName +'&nbsp;|&nbsp;</span>' +
      '<a title="Gestbook" href="/?p=guestbook&uid=' + managerId + '" style="color:yellow;font-weight:bold">GB</a>';
  }
  else
  {
    htmlTB =
      '<span style="color:white;font-weight:bold">'+ managerData[0] +'&nbsp;|&nbsp;'+ managerData[2] +'&nbsp;|&nbsp;</span>' +
      '<a title="Liga" href="/?p=series&sid='+ managerData[5] +'&tid='+ managerData[3] +'" style="color:yellow;font-weight:bold">LG</a>&nbsp;' +
      '<a title="Jugadores" href="/?p=players&tid='+ managerData[3] +'" style="color:yellow;font-weight:bold">JU</a>&nbsp;' +
      '<a title="Partidos jugados" href="/?p=match&tid='+ managerData[3] +'" style="color:yellow;font-weight:bold">PJ</a>&nbsp;' +
      '<a title="Próximos partidos" href="/?p=match&sub=scheduled&tid='+ managerData[3] +'" style="color:yellow;font-weight:bold">PX</a>&nbsp;' +
      '<a title="Gestbook" href="/?p=guestbook&uid=' + managerData[1] + '" style="color:yellow;font-weight:bold">GB</a>';
  }
  return htmlTB;
}
function compareValue(value1, value2)
{
  var retVal = 0; 
  if (value1 > value2)
  { 
    retVal = 1; 
  } 
  else
  {
    if (value1 < value2) 
    { 
      retVal = -1; 
    }; 
  }; 
  return retVal; 
}
function sortManagersByName()
{
  if (sortManagerFor != 'name')
  {
    managers.sort(
      function(i1, i2)
      {
        return compareValue(i1[0], i2[0]); 
      } );
    sortManagerFor = 'name';
  }
}
function sortManagersBySerie()
{
  if (sortManagerFor != 'serie')
  {
    managers.sort(
      function(i1, i2)
      {
        var div1 = i1[4].slice(3, i1[4].indexOf('.', 4));
        var div2 = i2[4].slice(3, i2[4].indexOf('.', 4));
        var retVal = compareValue(div1[0], div2[0]);
        if (retVal == 0) 
        {
          retVal = compareValue(i1[0], i2[0]);;
        };
        return retVal; 
      } );
    sortManagerFor = 'serie';
  }
}
function showDiv(div, event)
{
  div.style.left = event.clientX + document.body.scrollLeft - 200;
  div.style.top = event.clientY + document.body.scrollTop - 240;
  ++lastzIndex
  div.style.zIndex = lastzIndex;
  div.style.display = '';
}

function dispatchClick(event) {
  var targetId = (isIE) ? event.srcElement.id : event.target.id;
  if(targetId == "opSeriesInfo")
  {
    var divSeriesInfo = document.getElementById('divSeriesInfo');
    var divSeriesInfoContent = document.getElementById('divSeriesInfoContent');
    if (divSeriesInfoContent.innerHTML == '&nbsp;')
    {
      var contentSeries = '';
      sortManagersBySerie();
      for(var i = 0; i < managers.length; i++)
      {
        contentSeries = contentSeries + 
          '<div style="text-align:right;padding-right:4px;">' + getHtmlManagerTB(managers[i][0],managers[i][1],managers[i]) + 
          '</div><img src="http://www.mzplus.com.ar/imgdin_liga?user='+ managers[i][0] +'" width=400 height=146 /><br />';
      }
      divSeriesInfoContent.innerHTML = contentSeries;
    }
    showDiv(divSeriesInfo, event);
  }
  if(targetId == "opMatchesInfo")
  {
    var divMatchesInfo = document.getElementById('divMatchesInfo');
    var divMatchesInfoContent = document.getElementById('divMatchesInfoContent');
    if (divMatchesInfoContent.innerHTML == '&nbsp;')
    {
      var contentMatches = '';
      sortManagersByName();
      for(var i = 0; i < managers.length; i++)
      {
        contentMatches = contentMatches + 
          '<div style="text-align:right;padding-right:4px;">' + getHtmlManagerTB(managers[i][0],managers[i][1],managers[i]) + 
          '</div><img src="http://www.mzplus.com.ar/imgdin_part?user='+ managers[i][0] +'&cantpart=5" width=400 height=144 /><br />';
      }
      divMatchesInfoContent.innerHTML = contentMatches;
    }
    showDiv(divMatchesInfo, event);
  }
  if(targetId == "opManagersInfo")
  {
    var divManagersInfo = document.getElementById('divManagersInfo');
    var divManagersInfoContent = document.getElementById('divManagersInfoContent');
    if (divManagersInfoContent.innerHTML == '&nbsp;')
    {
      var contentManagers = '';
      sortManagersByName();
      for(var i = 0; i < managers.length; i++)
      {
        contentManagers = contentManagers + 
          '<div style="text-align:right;padding-right:4px;">' + getHtmlManagerTB(managers[i][0],managers[i][1],managers[i]) + '</div><br />';
      }
      divManagersInfoContent.innerHTML = contentManagers;
    }
    showDiv(divManagersInfo, event);
  }
  if(targetId == "opLeagesInfo")
  {
    var divLeaguesInfo = document.getElementById('divLeaguesInfo');
    var divLeaguesInfoContent = document.getElementById('divLeaguesInfoContent');
    if (divLeaguesInfoContent.innerHTML == '&nbsp;')
    {
      var contentLeagues = '';
      for(var i = 0; i < leagues.length; i++)
      {
        contentLeagues = contentLeagues + 
          '<div style="text-align:right;padding-right:4px;">' +
          '<span style="color:white;font-weight:bold">'+ leagues[i][0] +'&nbsp;|&nbsp;</span>' +
          '<a title="Estadísticas de la liga" href="/?p=friendlyseries&sub=standings&fsid=' + leagues[i][1] + '" style="color:yellow;font-weight:bold;">ES</a>' + '&nbsp;' +
          '<a title="Partidos de la liga" href="/?p=friendlyseries&sub=matches&fsid=' + leagues[i][1] + '" style="color:yellow;font-weight:bold;">PA</a>' + '&nbsp;' +
          '<a title="Goleadores de la liga" href="/?p=friendlyseries&sub=topscorer&fsid=' + leagues[i][1] + '" style="color:yellow;font-weight:bold;">GO</a>' + '&nbsp;' +
          '<a title="Pizarra de la liga" href="/?p=friendlyseries&sub=board&fsid=' + leagues[i][1] + '" style="color:yellow;font-weight:bold;">PZ</a></div>' +
          '<img src="http://www.mzplus.com.ar/imgdin_liga?&idla='+ leagues[i][1] +'&nombre='+ leagues[i][0] +'" width=400 height=190 /><br />';
      }
      divLeaguesInfoContent.innerHTML = contentLeagues;
    }
    showDiv(divLeaguesInfo, event);
  }
  if(targetId.search("opManagerInfo") != -1)
  {
    var managerInfo = targetId.split(".");
    var managerName = managerInfo[1];
    var managerId = managerInfo[2];
    var managerData = getManagerData(managerName);
    var divManagerInfo = document.getElementById('divManagerInfo');
    var divManagerSerie = document.getElementById('divManagerSerie');
    var divManagerMatches = document.getElementById('divManagerMatches');
    var divManagerTB = document.getElementById('divManagerTB');
    divManagerTB.innerHTML = getHtmlManagerTB(managerName, managerId, managerData);
    divManagerSerie.innerHTML = '<img src="http://www.mzplus.com.ar/imgdin_liga?user='+ managerName +'" width=400 height=146 />';
    divManagerMatches.innerHTML = '<img src="http://www.mzplus.com.ar/imgdin_part?user='+ managerName +'&cantpart=5" width=400 height=144 />';
    showDiv(divManagerInfo, event);
  }
}

function getTitleBar(divName)
{
  return '<div style="background-color:grey;"><div onclick="document.getElementById(\'' + divName + '\').style.display = \'none\';" style="text-align:center;width:1.2em;background-color:grey;color:red;cursor:pointer;cursor:hand;font-weight:bold;">X</div></div>';
}

function loadFedeMZ()
{
  var TDs = document.getElementsByTagName('TD');
  var id;
  var name;
  var cellManager;
  var panels;
  var options;
  var widthDivManagerInfo;
  var widthDivCommonInfo;
  var child;

  child = (isIE) ? 0 : 1;
  widthDivManagerInfo = (isIE) ? 'width:416px;' : '';
  widthDivCommonInfo = (isIE) ? 'width:432px;' : '';
  for(row = 0; row < TDs.length; row++)
  {
    if (TDs[row].className == 'listsecondary')
    {
      if(TDs[row].childNodes[child].tagName == 'TABLE')
      {
        cellManager = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[child].rows[0].cells[0];
      }
      else
      {
        cellManager = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0];
        panels = ' <div id="divManagerInfo" style="'+ widthDivManagerInfo +'padding:8px;position:absolute;background-color:black;color:white;display:none">'+ getTitleBar('divManagerInfo') +'<div id="divManagerTB" style="float:right">&nbsp;</div><div id="divManagerSerie">&nbsp;</div><div id="divManagerMatches">&nbsp;</div></div> ';
        options = '';
        if(TDs[row].innerHTML.search(textForoFede) != -1)
        {
          options =
            '<span style="background-color:black;color:yellow;font-weight:bold;">&nbsp;&nbsp;' +
            '<span id="opLeagesInfo" title="Ligas Amistosas" style="text-decoration:underline;cursor: pointer; cursor: hand;">LA</span>&nbsp;&nbsp;' +
            '<span id="opManagersInfo" title="Managers federados" style="text-decoration:underline;cursor: pointer; cursor: hand;">MA</span>&nbsp;&nbsp;' +
            '<span id="opSeriesInfo" title="Ligas de Managers" style="text-decoration:underline;cursor: pointer; cursor: hand;">LM</span>&nbsp;&nbsp;' +
            '<span id="opMatchesInfo" title="Partidos jugados" style="text-decoration:underline;cursor: pointer; cursor: hand;">PA</span>&nbsp;&nbsp;' +
            '</span>';
          panels = panels +
            '<div id="divSeriesInfo" style="'+ widthDivCommonInfo +';padding: 8px;position:absolute;background-color:black;color:white;display: none">'+ getTitleBar('divSeriesInfo') +'<div id="divSeriesInfoContent" style="height:500px;overflow: scroll;">&nbsp;</div></div>' +
            '<div id="divManagersInfo" style="'+ widthDivCommonInfo +';padding: 8px;position:absolute;background-color:black;color:white;display: none">'+ getTitleBar('divManagersInfo') +'<div id="divManagersInfoContent" style="height:500px;overflow: scroll;">&nbsp;</div></div>' +
            '<div id="divLeaguesInfo" style="'+ widthDivCommonInfo +';padding: 8px;position:absolute;background-color:black;color:white;display: none">'+ getTitleBar('divLeaguesInfo') +'<div id="divLeaguesInfoContent" style="height:500px;overflow: scroll;">&nbsp;</div></div>' +
            '<div id="divMatchesInfo" style="'+ widthDivCommonInfo +'padding: 8px;position:absolute;background-color:black;color:white;display: none">'+ getTitleBar('divMatchesInfo') +'<div id="divMatchesInfoContent" style="height:500px;overflow: scroll;">&nbsp;</div></div>';
        }
        TDs[row].innerHTML = TDs[row].innerHTML + options + panels;
      }
      if (cellManager.childNodes[3].tagName == "A")
      {
        id = cellManager.childNodes[3].href.split("&")[1].replace("uid=", "");
        name = cellManager.childNodes[3].innerHTML;
      }
      else
      {
        name = cellManager.childNodes[5].innerHTML;
        id = cellManager.childNodes[5].href.split("&")[1].replace("uid=", "");
        
      }
      cellManager.innerHTML = cellManager.innerHTML + '&nbsp;<span style="background-color:black;color:yellow;font-weight:bold;font-weight:bold;">' + '&nbsp' + '<span id="opManagerInfo.'+ name +'.'+ id +'" title="Info de '+ name +'" style="text-decoration:underline;cursor: pointer;cursor:hand;">Info</span>&nbsp</span>';
    }
  }
  if (document.addEventListener)
  {  
    document.addEventListener("click", dispatchClick, false);   
  }
  else if (document.attachEvent)
  {  
    document.attachEvent('onclick', dispatchClick);  
  };
}

// END Functions
//************
if (document.addEventListener)
{  
  window.addEventListener("load", loadFedeMZ, false)
}
else if (document.attachEvent)
{  
  window.attachEvent('onload', loadFedeMZ);  
};
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
	imagen = prompt('Podaj URL/link do zdjęcia');
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
			alert('Link / URL: ' + imagen + ' nie jest obrazem, i nie będą konwertowane.');
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

function atajoExtInt(urlImagen, urlPagina, titleImg){
	var ad = document.createElement('a');
	ad.setAttribute('href', urlPagina);
	ad.innerHTML = '<img src=\"'+urlImagen+'\" title=\"'+titleImg+'\" border=\"0\">\n';
	var ins = document.getElementById('contentDiv');
	ins.parentNode.insertBefore(ad, ins);
}

function atajoForo(urlImagen, urlPagina, titleImg){
	var ad = document.createElement('a');
	ad.setAttribute('href', '?'+urlPagina);
	ad.innerHTML = '<img src=\"'+urlImagen+'\" title=\"'+titleImg+'\" border=\"0\">';
	document.getElementById('logout_etc').appendChild(ad);
}

document.addEventListener("click", function(event) {
  	switch(event.target.id)
	{
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
		case "icono22": 
			posteaIcono('http://img143.imageshack.us/img143/5749/winktekos.png','message');			
			
			break;
		case "icono23": 
			posteaIcono('http://img823.imageshack.us/img823/6145/wink2.png','message');
			break;
		case "icono24": 
			posteaIcono('hhttp://img339.imageshack.us/img339/3950/tongue.png','message')
			break;
		case "icono25": 
			posteaIcono('http://img137.imageshack.us/img137/6144/shyl.png','message');
			break;
		case "icono26": 
			posteaIcono('http://img155.imageshack.us/img155/4734/sadu.png','message');
			break;
		case "icono27": 
			posteaIcono('http://img405.imageshack.us/img405/2297/overj.png','message');
			break;
		case "icono28": 
			posteaIcono('http://img830.imageshack.us/img830/9906/gokue.png','message');
			break;
		case "icono29": 
			posteaIcono('http://img137.imageshack.us/img137/3439/koolr.png','message');
			break;
		case "icono30": 
			posteaIcono('http://img222.imageshack.us/img222/7842/happykv.png','message');
			
			
			
			
			
		
			
			
			break;
		case "aIcono1": 
			posteaIcono('http://img143.imageshack.us/img143/5749/winktekos.png','msg')				
			break;
		case "aIcono2": 
			posteaIcono('http://img823.imageshack.us/img823/6145/wink2.png','msg')			
			break;
		case "aIcono3": 
			posteaIcono('http://img339.imageshack.us/img339/3950/tongue.png','msg')				
			break;
		case "aIcono4": 
			posteaIcono('http://img137.imageshack.us/img137/6144/shyl.png','msg')			
			break;
		case "aIcono5": 
			posteaIcono('http://img155.imageshack.us/img155/4734/sadu.png','msg')				
			break;
		case "aIcono6": 
			posteaIcono('http://img405.imageshack.us/img405/2297/overj.png','msg')				
			break;
		case "aIcono7": 
			posteaIcono('http://img830.imageshack.us/img830/9906/gokue.png','msg')				
			break;
		case "aIcono8": 
			posteaIcono('http://img137.imageshack.us/img137/3439/koolr.png','msg')			
			break;
		case "aIcono9": 
			posteaIcono('http://img222.imageshack.us/img222/7842/happykv.png','msg')
			
			
			
			
			break;
	}
}, true);

// ==Sub-Menúes==
var sede = document.getElementById('top_item_clubhouse_sub');
sede.innerHTML = '<li><a href="?p=clubhouse">Strona Główna</a></li><li onmouseover="document.getElementById(\'lequipo\').style.display=\'block\'" onmouseout="document.getElementById(\'lequipo\').style.display=\'none\'"><a href="?p=team">Moja Drużyna</a><ul id="lequipo" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:137px;"><a href="?p=team&sub=alter" style="text-align:left;">Edytuj Informacje</a></li><li style="width:137px;"><a href="?p=team&sub=alterbadge" style="text-align:left;">Edytuj Herb</a></li><li style="width:137px;"><a href="?p=team&sub=alterjersey" style="text-align:left;">Edytuj Stroje</a></li><li style="width:137px;"><a href="?p=team&sub=sponsor " style="text-align:left;">Sponsor</a></li>><li style="width:137px;"><a href="?p=team&sub=press" style="text-align:left;">Prasa</a></li></ul></li></li><li onmouseover="document.getElementById(\'ljug\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug\').style.display=\'none\'"><a href="?p=players">Zawodnicy</a><ul id="ljug" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:160px;"><a href="?p=players&sub=alt" style="text-align:left;">Widok Alternatywny</a></li><li style="width:160px;"><a href="?p=players&sub=unavailable" style="text-align:left;">Kontuzje/Zawieszenia</a></li><li style="width:160px;"><a href="?p=players&sub=changenumbers" style="text-align:left;">Zmiana Numerów</a></li><li style="width:160px;"><a href="?p=players&sub=retired" style="text-align:left;">Emerytowani Zawodnicy</a></li><li style="width:160px;"><a href="?p=players&sub=stats " style="text-align:left;">Pokaż Statystyki (C)</a></li></ul></li><li onmouseover="document.getElementById(\'ltact\').style.display=\'block\'" onmouseout="document.getElementById(\'ltact\').style.display=\'none\'"><a href="?p=tactics&myTactic=1">Taktyki</a><ul id="ltact" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:122px;"><a href="?p=tactics&sub=availability" style="text-align:left;">Dostępność (C)</a></li></ul></li><li onmouseover="document.getElementById(\'lentre\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre\').style.display=\'none\'"><a href="?p=training_home">Trening</a><ul id="lentre" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:130px;"><a href="?p=training_camp" style="text-align:left;">Obóz Treningowy</a></li><li style="width:130px;"><a href="?p=training_report" style="text-align:left;">Raport Treningowy</a></li><li style="width:130px;"><a href="?p=training" style="text-align:left;">Pole Treningowe</a></li></ul></li><li onmouseover="document.getElementById(\'lentre2\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre2\').style.display=\'none\'"><a href="?p=trainers">Trenerzy</a><ul id="lentre2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=trainers&sub=negotiations" style="text-align:left;">Negocjacje</a><li style="width:120px;"><a href="?p=trainers&sub=freeagents" style="text-align:left;">Dostępni Trenerzy</a><li style="width:120px;"><a href="?p=trainers&sub=settings" style="text-align:left;">Ustawienia</a></li></ul></li><li onmouseover="document.getElementById(\'lmerc\').style.display=\'block\'" onmouseout="document.getElementById(\'lmerc\').style.display=\'none\'"><a href="?p=transfer">Transfery</a><ul id="lmerc" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:130px;"><a href="?p=transfer&sub=yourplayers" style="text-align:left;">Monitoring</a></li><li style="width:130px;"><a href="?p=transfer_history" style="text-align:left;">Historia Transferów</a><li style="width:130px;"><a href="?p=transfer&sub=category" style="text-align:left;">Twoje Kategorie</a></li></ul></li><li><a href="?p=shortlist">Obserwowani Zawodnicy</a></li><li><a href="?p=economy&sub=education">Juniorzy</a></li>';

var partidos = document.getElementById('top_item_matches_sub');
partidos.innerHTML = '<li onmouseover="document.getElementById(\'lliga\').style.display=\'block\'" onmouseout="document.getElementById(\'lliga\').style.display=\'none\'"><a href="?p=series">Tabela</a><ul id="lliga" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:113px;"><a href="?p=series&sub=schedule" style="text-align:left;">Terminarz Ligi</a></li></ul></li><li onmouseover="document.getElementById(\'ljug2\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug2\').style.display=\'none\'"><a href="?p=match&sub=played">Rozegrane</a><ul id="ljug2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:109px;"><a href="?p=match&sub=played&hidescore=1" style="text-align:left;">Ukryty Wynik</a></li></ul></li><li><a href="?p=match&sub=scheduled">Najbliższe Mecze</a></li><li onmouseover="document.getElementById(\'lam\').style.display=\'block\'" onmouseout="document.getElementById(\'lam\').style.display=\'none\'"><a href="?p=challenges">Wyzwania</a><ul id="lam" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:83px;"><a href="?p=challenges&sub=friendly" style="text-align:left;">Towarzyskie</a></li></ul></li><li onmouseover="document.getElementById(\'lcop\').style.display=\'block\'" onmouseout="document.getElementById(\'lcop\').style.display=\'none\'"><a href="?p=cup&sub=cup_home">Puchary<img src="http://img63.imageshack.us/img63/1079/trophygoldk.png" border="0"/></a><ul id="lcop" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:85px;"><a href="?p=cup&sub=list&type=my" style="text-align:left;">Oficjalne</a></li><li style="width:85px;"><a href="?p=private_cup" style="text-align:left;">Prywatne</a></li><li style="width:85px;"><a href="?p=private_cup&cuptype=partner" style="text-align:left;">Partnerskie</a></li></ul></li><li><a href="?p=friendlyseries">Ligi Towarzyskie<img src="http://img709.imageshack.us/img709/4913/trophyarrow.png" border="0"/></a></li><li><a href="?p=topteams">Wyzwania<img src="http://img38.imageshack.us/img38/8922/trophysilverm.png" border="0"/></a></li><li><a href="?p=match&sub=livescores_overview">LiveScores</a></li><li><a href="?p=national_teams">Drużyny Narodowe</a></li>';

var comunidad = document.getElementById('top_item_community_sub');
if (comunidad.innerHTML.search(/Admin/i) >= 0) admin = '<li><a href="?p=national_teams_admin">Selecciones Nacionales - Admin</a></li><li><a href="?p=national_teams_admin&amp;type=u21">Selecciones Nacionales U21 - Admin</a></li>';
else admin = '';
comunidad.innerHTML = '<li><a href="?p=community">Strona Główna</a></li><li><a href="?p=forum">Forum</a></li><li><a href="?p=thezone&amp;sport=soccer">The Zone</a></li><li><a href="?p=worldmap">Mapa Świata</a></li><li><a href="?p=photo_album">Album Zdjęć</a></li><li><a href="?p=xml_content">Opcje XML</a></li><li><a href="?p=mztools">Narzędzia MZ</a></li>'+admin;

var tienda = document.getElementById('top_item_store_sub');
tienda.innerHTML = '<li><a href="?p=player_items">Dodatki Dla Zawodnika</a></li><li><a href="?p=clubmember&sub=member">Członkostwo</a></li><li><a href="?p=clubmember&sub=tokens">Power Tokens</a></li><li><a href="?p=clubmember&sub=history">Historia</a></li>';

var ayuda = document.getElementById('top_item_help_sub');
ayuda.innerHTML = '<li><a href="?p=support_form">Support</a></li><li><a href="?p=language_support">Pomoc W Instalacji Języków</a></li><li><a href="?p=search">Szukaj</a></li><li><a href="?p=tutorial">Tutorial</a></li><li><a href="?p=manual_faq&sub=FAQ">FAQ</a></li><li><a href="?p=transfer&sub=rules">Zasady Gry</a></li>';

// ==Accesos UP==
atajoForo('http://img651.imageshack.us/img651/6941/55013838.png', 'p=forum&sub=topics&forum_id=23&sport=soccer', 'Otwarte Rozmowy');
atajoForo('http://img121.imageshack.us/img121/5097/33088257.png', 'p=forum&sub=topics&forum_id=24&sport=soccer', 'Pucharowe Rozmowy');
atajoForo('http://img291.imageshack.us/img291/240/45862837.png', 'p=forum&sub=topics&forum_id=25&sport=soccer', 'Pytania i Odpowiedzi');
atajoForo('http://img63.imageshack.us/img63/337/41834811.png', 'p=forum&sub=topics&forum_id=26&sport=soccer', 'Rozmowy ManagerZone');
atajoForo('http://img227.imageshack.us/img227/4196/13843365.png', 'p=forum&sub=topics&forum_id=27&sport=soccer', 'Sparingi/Treningi');
atajoForo('http://img843.imageshack.us/img843/1186/49824364.png', 'p=forum&sub=topics&forum_id=28&sport=soccer', 'Sugestie/Udoskonalenia');
atajoForo('http://img713.imageshack.us/img713/7864/34750338.png', 'p=forum&sub=topics&forum_id=29&sport=soccer', 'Transfery');
// ==Barra Atajos==

atajoExtInt('http://img28.imageshack.us/img28/2640/skillerv.png', 'http://www.mzplus.com.ar/p?lang=pl', 'Skiller - Pokaz graczy');
atajoExtInt('http://img812.imageshack.us/img812/1924/imageshackrb.png', 'http://imageshack.us/', 'Hosting Fotek');


atajoExtInt('http://img219.imageshack.us/img219/2118/kalkulator.png', 'http://www.mzplus.com.ar/tax', 'Kalkulator Podatkowy');




atajoExtInt('http://img231.imageshack.us/img231/4622/szpieg.png', 'http://www.mzplus.com.ar/i', 'Informacje o Drużynie');





// ==Barra GB==


function armaPanel(elementID, tipo){
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/img_gbbtn.png', 'btnaddImagen2', elementID, tipo);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negri_gbbtn.png', 'btnnegrita2', elementID, tipo);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/curs_gbbtn.png', 'btncursiva2', elementID, tipo);
	generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_gbbtn.png', 'btnsubrayado2', elementID, tipo);


	generarImagen('http://img143.imageshack.us/img143/5749/winktekos.png', 'aIcono1', elementID, tipo);
	generarImagen('http://img823.imageshack.us/img823/6145/wink2.png', 'aIcono2', elementID, tipo);
	
	generarImagen('http://img339.imageshack.us/img339/3950/tongue.png', 'aIcono3', elementID, tipo);
	
	generarImagen('http://img137.imageshack.us/img137/6144/shyl.png', 'aIcono4', elementID, tipo);
	
	generarImagen('http://img155.imageshack.us/img155/4734/sadu.png', 'aIcono5', elementID, tipo);
	generarImagen('http://img405.imageshack.us/img405/2297/overj.png', 'aIcono6', elementID, tipo);
	
	generarImagen('http://img830.imageshack.us/img830/9906/gokue.png', 'aIcono7', elementID, tipo);
	generarImagen('http://img137.imageshack.us/img137/3439/koolr.png', 'aIcono8', elementID, tipo);
	
	generarImagen('http://img222.imageshack.us/img222/7842/happykv.png', 'aIcono9', elementID, tipo);
	
	
}

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
var botones = '<td>BBCode</td><td>';
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn2.png\"' title='Wybierz Zdjęcie' alt='Wybierz Zdjęcie' id='btnaddImagen'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png\"' title='Pogrubienie' alt='Pogrubienie' id='btnnegrita'/>&nbsp;";  
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn2.png\"' title='Przekrzywienie' alt='Przekrzywienie' id='btncursiva'/>&nbsp;";  
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn2.png\"' title='Podkreślenie' alt='Podkreślenie' id='btnsubrayado'/>&nbsp;";    
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/parrafo_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/parrafo_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/parrafo_btn2.png\"' title='Nnowy akapit ' alt='Nowy akapit ' id='btnparrafo'/>&nbsp;";    
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/l_btn2.png' onmouseover='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/l_btn.png\"' onmouseout='this.src=\"http://i915.photobucket.com/albums/ac355/ccc_vader/botones/l_btn2.png\"' title='Lista' alt='Lista' id='btnlista'/>&nbsp;&nbsp;";    



filaNueva.innerHTML = botones;

filaNueva = tabla.insertRow(3);
botones = '<td>Emotki</td><td>';

botones += "<img src='http://img143.imageshack.us/img143/5749/winktekos.png' title='!' alt='!' id='icono22'/>&nbsp;";
botones += "<img src='http://img823.imageshack.us/img823/6145/wink2.png' title='!' alt='!' id='icono23'/>&nbsp;";
botones += "<img src='http://img339.imageshack.us/img339/3950/tongue.png' title='?' alt='?' id='icono24'/>&nbsp;";
botones += "<img src='http://img137.imageshack.us/img137/6144/shyl.png' title='>' alt='>' id='icono25'/>&nbsp;";
botones += "<img src='http://img155.imageshack.us/img155/4734/sadu.png' title='(8)' alt='(8)' id='icono26'/>&nbsp;";
botones += "<img src='http://img405.imageshack.us/img405/2297/overj.png' title='(z)' alt='(z)' id='icono27'/>&nbsp;";
botones += "<img src='http://img830.imageshack.us/img830/9906/gokue.png' title='(..)' alt='(..)' id='icono28'/>&nbsp;";
botones += "<img src='http://img137.imageshack.us/img137/3439/koolr.png' title='wtf' alt='wtf' id='icono29'/>&nbsp;";
botones += "<img src='http://img222.imageshack.us/img222/7842/happykv.png' title='off' alt='off' id='icono30'/>&nbsp;";























filaNueva.innerHTML = botones;

filaNueva = tabla.insertRow(4);
botones = '<td></td><td>';






filaNueva.innerHTML = botones;

// ==Páginas Threads==
var url = window.location.href.split('&');
if(url[1] == "sub=topics")
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
			nuevo += "<a title='Ir a la página 2' href='" + link + "&offset=50'>2</a>&#160;"
		if(cantidadDePaginas > 1)
			nuevo += "<a title='Ir a la página 3' href='" + link + "&offset=100'>3</a>&#160;"
		if(cantidadDePaginas > 2)
			nuevo += "<a title='Ir a la página 4' href='" + link + "&offset=150'>4</a>&#160;"
		if(cantidadDePaginas > 3)
			nuevo += "<a title='Ir a la última página' href='" + link + "&offset=" + (cantidadDePaginas*50) + "'>&#187;</a>"
		if(cantidadDePaginas > 0)
			nuevo = "&#160;[" + nuevo + "]";
		tablaDePost.rows[post].cells[1].innerHTML = celda + nuevo;
	}
}

// ==Acceso a GB==
var url = window.location.href.split('&');
if(url[1] == "sub=topic")
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

				celdaSacarId.innerHTML = celdaSacarId.innerHTML + " <a title='Wiadomość do "+ nombre +"' href='/?p=guestbook&uid=" + id + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;GB&nbsp;</b></a> ";
			}
		}
	}
}