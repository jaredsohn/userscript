// ==UserScript==
// @name          topic_id
// @description   topic_id
// @include       http://*managerzone*topic_id=*
// @version       2.3.004
// @author        zuri23
// @thanks        http://www.mzplus.com.ar & david_akd & c_c
// @info          http://carapachin.puertadigital.com/blog/post/2010/05/24/Script-para-la-Fede-23.aspx
// @license       MIT License
// ==/UserScript==

//************
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
