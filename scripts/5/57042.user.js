// ==UserScript==
// @name           Stats
// @namespace      rubysoccer
// @include        http://www.rubysoccer.com/game/match_report/*
// ==/UserScript==

var gol = 'scores <img src=\'http://www.rubysoccer.com/images/game/player_goal.png\' />';
document.body.innerHTML = document.body.innerHTML.replace(/scores/g, gol);

var jogo, imgAway, imgHome;

var numeroChutes = new Array();
var numeroChutesFail = new Array();
var numeroCabecadas = new Array();
var numeroCabecadasFail = new Array();
var numeroRoubadas = new Array();
var numeroRoubadasErradas = new Array();
var numeroPasses = new Array();
var numeroPassesErrados = new Array();
var numeroFaltas = new Array();
var numeroImpedimentos = new Array();
var numeroGols = new Array();
	
var htmlAway = "";
var htmlHome = "";

//chutes, cabecadas, roubadas, passes (+ Errados), faltas, impedimentos
var totalAway = [0,0,0,0,0,0,0,0,0,0];
var totalHome = [0,0,0,0,0,0,0,0,0,0];

var gameNumber = window.location.href.substr(window.location.href.indexOf("match_report/")+"match_report/".length);

var tableHome = document.getElementsByTagName("table")[0];
var tableAway =	document.getElementsByTagName("table")[2];

GM_xmlhttpRequest({
    method: 'GET',
	url: 'http://www.rubysoccer.com/game/match_replay/'+gameNumber,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		jogo = responseDetails.responseText.substr(responseDetails.responseText.indexOf("<param name=\"replay\" value=\"") + "<param name=\"replay\" value=\"".length);
		jogo = jogo.substring(0, jogo.indexOf("\">"));
		
		imgHome = responseDetails.responseText.substr(responseDetails.responseText.indexOf("<param name=\"home_logo\" value=\"") + "<param name=\"home_logo\" value=\"".length);
		imgHome = imgHome.substring(0, imgHome.indexOf("\">"));		
		
		imgAway = responseDetails.responseText.substr(responseDetails.responseText.indexOf("<param name=\"visitor_logo\" value=\"") + "<param name=\"visitor_logo\" value=\"".length);
		imgAway = imgAway.substring(0, imgAway.indexOf("\">"));		
		
		var html = run();
		
		document.getElementById("main-content").innerHTML += "<center>" + html + "</center>";
		
		highlightTables();
		sortTables();
	}
});

function run(){
	
	// Match starts
	//alert(jogo.substring(0, jogo.indexOf(';')));

	while(jogo.indexOf(';') != -1){
		
		jogo = jogo.substring(jogo.indexOf(';')+1, jogo.length);		
		var momento = (jogo.indexOf(';') != -1) ? jogo.substring(0, jogo.indexOf(';')) : jogo;		
		var lances = momento.substring(0, momento.indexOf(',')).split('<br/>');		
		for (var i = 0; i<lances.length; i++){
			var lance = lances[i];
			var time = lance.substring(lance.indexOf('(') + 1, lance.indexOf(')'));
			var jogador = lance.substring(0, lance.indexOf(' ('));
			jogador = getPlayerPosition(time, jogador);
			if(lance.indexOf('shoots') != -1){
				lance = lances[i+1];
				if(lance.indexOf('catches') != -1 || lance.indexOf('scores') != -1 || lance.indexOf('Corner') != -1 || lance.indexOf('deflects') != -1 ){
					numeroChutes[numeroChutes.length] = jogador;
					if(lance.indexOf('scores') != -1)
						numeroGols[numeroGols.length] = jogador;
				}
				else
					numeroChutesFail[numeroChutesFail.length] = jogador;
			}
			else if(lance.indexOf('heads') != -1){
				lance = lances[i+1];
				if(lance.indexOf('catches') != -1 || lance.indexOf('scores') != -1 || lance.indexOf('Corner') != -1 || lance.indexOf('deflects') != -1 ){
					numeroCabecadas[numeroCabecadas.length] = jogador;
					if(lance.indexOf('scores') != -1)
						numeroGols[numeroGols.length] = jogador;
				}
				else
					numeroCabecadasFail[numeroCabecadasFail.length] = jogador;
			}
			else if(lance.indexOf('tackles') != -1){
				lance = lances[i+1];
				if(lance.indexOf('Foul') != -1){
					numeroRoubadasErradas[numeroRoubadasErradas.length] = jogador;
					numeroFaltas[numeroFaltas.length] = jogador;
				}
				else
					numeroRoubadas[numeroRoubadas.length] = jogador;
			}
			else if(lance.indexOf('takes the ball from') != -1)
				numeroRoubadas[numeroRoubadas.length] = jogador;
			else if(lance.indexOf('fails to tackle') != -1)				
				numeroRoubadasErradas[numeroRoubadasErradas.length] = jogador;
			else if(lance.indexOf('passes the ball') != -1)
				numeroPasses[numeroPasses.length] = jogador;
			else if(lance.indexOf('tries to pass') != -1)
				numeroPassesErrados[numeroPassesErrados.length] = jogador;
			else if(lance.indexOf('passes to')!= -1 && lance.indexOf('is offside') != -1){
				numeroPassesErrados[numeroPassesErrados.length] = jogador;
				jogador = lance.substring(lance.indexOf("passes to")+"passes to ".length, lance.indexOf(" ("+time+") but he is offside"));
				jogador = getPlayerPosition(time, jogador);
				numeroImpedimentos[numeroImpedimentos.length] = jogador;
			}
			else if(lance.indexOf('intercepts the pass') != -1){
				//numeroRoubadas[numeroRoubadas.length] = jogador;
				lance = lance.substring(lance.indexOf('from ')+5, lance.length);
				time = lance.substring(lance.indexOf('(') + 1, lance.indexOf(')'));
				jogador = lance.substring(0, lance.indexOf(' ('));
				jogador = getPlayerPosition(time, jogador);
				numeroPassesErrados[numeroPassesErrados.length] = jogador;
			}
		}
	}
	
	numeroChutes = numeroChutes.sort();
	numeroChutesFail = numeroChutesFail.sort();
	numeroCabecadas = numeroCabecadas.sort();
	numeroCabecadasFail = numeroCabecadasFail.sort();
	numeroRoubadas = numeroRoubadas.sort();
	numeroRoubadasErradas = numeroRoubadasErradas.sort();
	numeroPasses = numeroPasses.sort();
	numeroPassesErrados = numeroPassesErrados.sort();
	numeroGols = numeroGols.sort();
	numeroFaltas = numeroFaltas.sort();
	numeroImpedimentos = numeroImpedimentos.sort();
	
	var html = "<table class='markLines' id=':id' width='100%' >";
	html += "<thead>";
	html += "<tr>";
	html += "<th align='left' width='20%'>Jogador</th>";
	html += "<th align='center' width='8%'>Sho</th>";
	html += "<th align='center' width='8%'>Sho(F)</th>";
	html += "<th align='center' width='8%'>Hea</th>";
	html += "<th align='center' width='8%'>Hea(F)</th>";
	html += "<th align='center' width='8%'>Tac</th>";
	html += "<th align='center' width='8%'>Tac(F)</th>";
	html += "<th align='center' width='8%'>Pass</th>";
	html += "<th align='center' width='8%'>Pass(F)</th>";
	html += "<th align='center' width='8%'>Fouls</th>";
	html += "<th align='center' width='8%'>Offs</th>";
	html += "</tr>";
	html += "</thead>";

	calculaEstatisticas(numeroChutes);
	calculaEstatisticas(numeroChutesFail);
	calculaEstatisticas(numeroCabecadas);
	calculaEstatisticas(numeroCabecadasFail);	
	calculaEstatisticas(numeroRoubadas);
	calculaEstatisticas(numeroRoubadasErradas);
	calculaEstatisticas(numeroPasses);
	calculaEstatisticas(numeroPassesErrados);

	htmlAway = "<img src='/"+imgAway+"' style='height: 30px' /> <br/>" + html.replace(':id', 'tableEstatisticasAway') + "<tbody>"+htmlAway;
	htmlAway += insereTotal(totalAway) + "</tbody></table>";

	htmlHome = "<img src='/"+imgHome+"' style='height: 30px' /> <br/>" + html.replace(':id', 'tableEstatisticasHome') + "<tbody>"+ htmlHome;
	htmlHome += insereTotal(totalHome) + "</tbody></table>";

	html = "<center><br /><div id='divEstatisticas' style='width: 95%;'>" + htmlHome + "<br />" + htmlAway + "</div><br /></center>";

	return html;
}

function calculaEstatisticas(array){
	for(var i = 0; i<array.length; i++){		
		if(array[i] == "") continue;
		
		var jogador = array[i];
		var time = jogador.substr(0,1);
		
		var gols = getNumero(numeroGols, jogador);		
		var chutes = getNumero(numeroChutes, jogador);		
		var chutesErrados = getNumero(numeroChutesFail, jogador);
		var cabecadas = getNumero(numeroCabecadas, jogador);
		var cabecadasErradas = getNumero(numeroCabecadasFail, jogador);
		var roubadas = getNumero(numeroRoubadas, jogador);
		var roubadasErradas = getNumero(numeroRoubadasErradas, jogador);	
		var passes = getNumero(numeroPasses, jogador);
		var passesInterceptados = getNumero(numeroPassesErrados, jogador);
		var faltas = getNumero(numeroFaltas, jogador);
		var impedimentos = getNumero(numeroImpedimentos, jogador);
		
		if(time == 'a'){
			htmlAway += insereLinhaTudo(jogador, gols, chutes, chutesErrados, cabecadas, cabecadasErradas, roubadas, roubadasErradas, passes, passesInterceptados, faltas, impedimentos);
			adicionaNoTotal(totalAway, chutes, chutesErrados, cabecadas, cabecadasErradas, roubadas, roubadasErradas, passes, passesInterceptados, faltas, impedimentos);
		}
		else{
			htmlHome += insereLinhaTudo(jogador, gols, chutes, chutesErrados, cabecadas, cabecadasErradas, roubadas, roubadasErradas, passes, passesInterceptados, faltas, impedimentos);
			adicionaNoTotal(totalHome, chutes, chutesErrados, cabecadas, cabecadasErradas, roubadas, roubadasErradas, passes, passesInterceptados, faltas, impedimentos);
		}	
	}
}

function getNumero(array, jogador){
	var count = 0;
	for(var j = 0; j<array.length; j++){
		if(array[j] == jogador){
			count++;
			array[j] = "";
		}
	}
	return count;
}

function insereLinhaTudo(jogador, gols, chutes, chutesErrados, cabecadas, cabecadasErradas, roubadas, roubadasErradas, passes, passesInterceptados, faltas, impedimentos){
	var imgGols = " ";
	for( ; gols > 0; gols--){
		imgGols += "<img src='/images/game/player_goal.png' />";
	}
	
	var html = "<tr>";
	html += "<td align='left' >" + jogador.substring(2) + imgGols + "</td>";
	html += "<td align='center' >"+ ((chutes != 0) ? chutes : "-") + "</td>";
	html += "<td align='center' >"+ ((chutesErrados != 0) ? chutesErrados : "-") + "</td>";
	html += "<td align='center' >"+ ((cabecadas != 0) ? cabecadas : "-") + "</td>";
	html += "<td align='center' >"+ ((cabecadasErradas != 0) ? cabecadasErradas : "-") + "</td>";
	html += "<td align='center' >"+ ((roubadas != 0) ? roubadas : "-") +"</td>";
	html += "<td align='center' >"+ ((roubadasErradas != 0) ? roubadasErradas : "-") +"</td>";	
	html += "<td align='center' >"+ ((passes != 0) ? passes : "-") +"</td>";
	html += "<td align='center' >"+ ((passesInterceptados != 0) ? passesInterceptados : "-") +"</td>";	
	html += "<td align='center' >"+ ((faltas != 0) ? faltas : "-") +"</td>";	
	html += "<td align='center' >"+ ((impedimentos != 0) ? impedimentos : "-") +"</td>";
	html += "</tr>";
	return html;
}

function insereTotal(total){
	var html = "<tr style='background-color: #ccc;'>";
	html += "<td align='left' ><b>Total</b></td>";
	html += "<td align='center' >"+total[0]+"</td>";
	html += "<td align='center' >"+total[1]+"</td>";
	html += "<td align='center' >"+total[2]+"</td>";
	html += "<td align='center' >"+total[3]+"</td>";
	html += "<td align='center' >"+total[4]+"</td>";
	html += "<td align='center' >"+total[5]+"</td>";
	html += "<td align='center' >"+total[6]+"</td>";
	html += "<td align='center' >"+total[7]+"</td>";
	html += "<td align='center' >"+total[8]+"</td>";
	html += "<td align='center' >"+total[9]+"</td>";
	html += "</tr>";
	
	return html;
}

function adicionaNoTotal(array, chutes, chutesErrados, cabecadas, cabecadasErradas, roubadas, roubadasErradas, passes, passesInterceptados, faltas, impedimentos){
	array[0] += chutes;
	array[1] += chutesErrados;
	array[2] += cabecadas;
	array[3] += cabecadasErradas;	
	array[4] += roubadas;
	array[5] += roubadasErradas;
	array[6] += passes;
	array[7] += passesInterceptados;
	array[8] += faltas;
	array[9] += impedimentos;
}

function highlightTables(){
	highlightMax(document.getElementById('tableEstatisticasAway'));
	highlightMax(document.getElementById('tableEstatisticasHome'));
}

function sortTables(){
	sortTable("tableEstatisticasHome");
	sortTable("tableEstatisticasAway");	
}

function sortTable(table){
	var dataTable = document.getElementById(table).getElementsByTagName("TBODY")[0];
	myTable = new quickSort(dataTable, "TR", "TD");
	myTable.sort(0, false);
	fixPlayerNames(dataTable);
}

function fixPlayerNames(table){
	for (var i = 0; i<table.rows.length-1; i++){
		table.rows[i].cells[0].innerHTML = table.rows[i].cells[0].innerHTML.replace(":0","G").replace(":1","D").replace(":2","M").replace(":3","A");
		if(i%2==0)
			table.rows[i].className = 'even';
	}
}

function highlightMax(table){
	for (var col = 1; col < table.rows[0].cells.length; col++){
		var imax = new Array();
		var tam = 0;
		var max = 0;
		for(var row = 1; row < table.rows.length-1; row++){
			var value = table.rows[row].cells[col].innerHTML;
			if(value != "-" && parseInt(value) >= max){
				if(parseInt(value) > max)
					tam = 0;
				imax[tam++] = row;
				max = value;
			}
		}
		if(max != 0)
			for (var i = 0; i<tam; i++)
				table.rows[imax[i]].cells[col].innerHTML = "<b><font color='" + ((col < table.rows[0].cells.length-2) ? ((col%2 == 0) ? 'red' : 'blue') : 'red') + "'>" + table.rows[imax[i]].cells[col].innerHTML + "</font></b>" ;
	}
}

function getPlayerPosition(team, player){
	
	var table = (team == 'a') ? tableAway : tableHome;
	
	for (var i = 2; i < table.rows.length - 1; i++){
		if(table.rows[i].cells[1].innerHTML.indexOf(player) != -1){
			var position = table.rows[i].cells[0].childNodes[0].innerHTML;
			if (position == 'G')
				return team+"-"+":0 - "+player;
			else if (position == 'D')
				return team+"-"+":1 - "+player;
			else if (position == 'M')
				return team+"-"+":2 - "+player;
			else if (position == 'A')
				return team+"-"+":3 - "+player;
		}
	}
	
	return "";
}

//=====================

// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

function quickSort(parent, childName, colName)
{
  var parent = parent;			// 'parent' node
  var childName = childName;	// nodeName for 'children'
  var colName = colName;		// nodeName for 'columns'

  // build array of 'child' nodes
  var items = parent.getElementsByTagName(childName);
  var N = items.length;

  // define private methods
  var get = function(i, col, wrapper)
  {
    var retval = null;
    var node = null;
    var sort;

    if(colName) {
      // sort by col'th element of i'th child
      node = items[i].getElementsByTagName(colName)[col];
    } else {
      // sort by i'th child
      node = items[i];
    }
	
	//if(node == null)
	//	return "";

    if(null != (sort = node.getAttribute("sort"))) {
      // use 'sort' attribute if available
      retval = sort;
    } else if(node.childNodes.length > 0) {
      if(wrapper) {
        // sort by contents of first 'wrapper' element in 'child'
        retval = node.getElementsByTagName(wrapper)[0].firstChild.nodeValue;
      } else {
        // sort by 'child' contents
        retval = node.firstChild.nodeValue;
      }
    } else {
      return "";
    }

    if(parseFloat(retval) == retval) return parseFloat(retval);
    return retval;
  }

  var compare = function(val1, val2, desc)
  {
    return (desc) ? val1 > val2 : val1 < val2;
  }

  var exchange = function(i, j)
  {
    if(i == j+1) {
      parent.insertBefore(items[i], items[j]);
    } else if(j == i+1) {
      parent.insertBefore(items[j], items[i]);
    } else {
      var tmpNode = parent.replaceChild(items[i], items[j]);
      if(typeof(items[i]) == "undefined") {
        parent.appendChild(tmpNode);
      } else {
        parent.insertBefore(tmpNode, items[i]);
      }
    }
  }

  var quicksort = function(m, n, col, desc, wrapper)
  {
    if(n <= m+1) return;

    if((n - m) == 2) {
      if(compare(get(n-1, col, wrapper), get(m, col, wrapper), desc)) exchange(n-1, m);
      return;
    }

    i = m + 1;
    j = n - 1;

    if(compare(get(m, col, wrapper), get(i, col, wrapper), desc)) exchange(i, m);
    if(compare(get(j, col, wrapper), get(m, col, wrapper), desc)) exchange(m, j);
    if(compare(get(m, col, wrapper), get(i, col, wrapper), desc)) exchange(i, m);

    pivot = get(m, col, wrapper);

    while(true) {
      j--;
      while(compare(pivot, get(j, col, wrapper), desc)) j--;
      i++;
      while(compare(get(i, col, wrapper), pivot, desc)) i++;
      if(j <= i) break;
      exchange(i, j);
    }

    exchange(m, j);

    if((j-m) < (n-j)) {
      quicksort(m, j, col, desc, wrapper);
      quicksort(j+1, n, col, desc, wrapper);
    } else {
      quicksort(j+1, n, col, desc, wrapper);
      quicksort(m, j, col, desc, wrapper);
    }
  }

  // define public method
  this.sort = function(col, desc, wrapper)
  {
    quicksort(0, N, col, desc, wrapper);
  }
}
