// ==UserScript==
// @name           Rubysoccer Team Player List Plus
// @namespace      http://www.rubysoccer.com/
// @description    Add new features in you team players list
// @include        http://www.rubysoccer.com/game/team_players/*
// @version  0.4.1
// @contributor Ulisses Buonanni
// ==/UserScript==
var release = "0.4.1";

//DO NOT CHANGE LINES ABOVE! Now all setup is online.
var myTeam = 0;
var dimensao = getDimension();
if( dimensao.toUpperCase() == 'FASTTICKER' ){
	myTeam = GM_getValue('timeMonitoradoFT', 0);
} else {
	myTeam = GM_getValue('timeMonitoradoMT', 0);
}

function insertColumnRazao(tablenum, coluna) {
	
	var oneRow, newCell, salario, valor, razao, tmpCell
    if (theTable.tHead) {
        oneRow = theTable.tHead.rows[0]
        newCell = oneRow.insertCell(coluna)
    }

	newCell.innerHTML = '<a href=#>VW</a>';
	newCell.title = 'Value / Wages. Higher is better';
	newCell.addEventListener("click", function(event) { 
						var tables = document.getElementsByTagName("table")
						theTable = tables[tablenum];
						theTableBody = theTable.tBodies[0];

						var arr = new Array(theTableBody.rows.length);
						for (var i = 0; i < theTableBody.rows.length; i++) {
							oneRow = theTableBody.rows[i];
							tmpCell = oneRow.cells;
							arr[i] = tmpCell[coluna+1].innerHTML
						}

						function sortNumber(a,b){
							return a - b;
						}

						arr.sort(sortNumber)
						
						var inicio = 0;
						while( arr.length > 0 ){
							prox = arr.pop();
							for (var i = inicio; i < theTableBody.rows.length; i++) {
								oneRow = theTableBody.rows[i];
								tmpCell = oneRow.cells;
								if( tmpCell[coluna+1].innerHTML == prox ){
									//Troca as linhas
									var temp = theTableBody.rows[inicio].innerHTML;
									theTableBody.rows[inicio].innerHTML = theTableBody.rows[i].innerHTML;
									theTableBody.rows[i].innerHTML = temp;
								}
							}
							
							inicio++;
						}
					}, false);


    for (var i = 0; i < theTableBody.rows.length; i++) {
        oneRow = theTableBody.rows[i];
		newCell = oneRow.insertCell(coluna)
		tmpCell = oneRow.cells;
		salario = tmpCell[15].innerHTML;
		valor = tmpCell[17].innerHTML;
		salario = salario.substr(1);
		valor = valor.substr(1);
		salario = salario.replace(/,/g, "")
		valor = valor.replace(/,/g, "")
		salario = parseInt(salario);
		if( salario > 0 ){
			valor = parseInt(valor);
			razao = valor/salario;
			razao = razao/100;
			razao = Math.sqrt(razao);
			newCell.innerHTML = Math.round(razao);
		} else {
			newCell.innerHTML = '-';		
		}
		newCell.align="center";
		newCell.title = 'Value / Wages. Higher is better'
    }
}

function insertColumnNota(tablenum, coluna) {
    if (theTable.tHead) {
        oneRow = theTable.tHead.rows[0]
        newCell = oneRow.insertCell(coluna)
    }

	newCell.innerHTML = '<a href=#>Gr</a>'
	newCell.title = "Grade as Defender, Midfielder and Striker"
	
    for (var i = 0; i < theTableBody.rows.length; i++) {
        oneRow = theTableBody.rows[i];
		newCell = oneRow.insertCell(coluna)
		tmpCell = oneRow.cells;

		var pointsS;
		var pointsM;
		var pointsD;
		pointsS = 0;
		pointsM = 0;
		pointsD = 0;
		
		pos = tmpCell[1].innerHTML;
		for( var ii = 4; ii <= 11; ii++ ){
			if( pos == "G" ){
				if( ii == 5 || ii == 7 ){
					continue;
					}
			} else {
				if( ii == 4 ){
					continue;
					}
				
				hab = tmpCell[ii].innerHTML;
				hab = limpaHabilidade(hab);
				pointsS += getPointsForStriker( ii, parseInt(hab) );
				pointsM += getPointsForMiddle( ii, parseInt(hab) );
				pointsD += getPointsForDefender( ii, parseInt(hab) );
			}

			hab = tmpCell[ii].innerHTML;
			hab = limpaHabilidade(hab);
		}
		if( pos == "G" ){
			newCell.innerHTML = ' ';
		}
		else {
			newCell.innerHTML = getGrade(pointsD) + '' + getGrade(pointsM) +  '' + getGrade(pointsS);
		}
		newCell.align="center";
		newCell.title="Grade";
    }
}

function getGrade(points){
	if( points > 32 )
		return "&#9733;";
	if( points > 20 )
		return "A";
	if( points > 8 )
		return "B";
	if( points > -3 )
		return "C";
	if( points > -15 )
		return "D";
	if( points > -27 )
		return "E";
	return "&#9785;";
}

function getPointsForStriker( hab, valor ){
	if( hab == 5 )
		return 1 * getPointsForSkill(valor);
	if( hab == 6 )
		return 1 * getPointsForSkill(valor);
	if( hab == 7 )
		return 4 * getPointsForSkill(valor);
	if( hab == 8 )
		return 2 * getPointsForSkill(valor);
	if( hab == 9 )
		return 2 * getPointsForSkill(valor);
	if( hab == 10 )
		return 2 * getPointsForSkill(valor);
	if( hab == 11 )
		return 1 * getPointsForSkill(valor);
	return 0;
} 

function getPointsForMiddle( hab, valor ){
	if( hab == 5 )
		return 3 * getPointsForSkill(valor);
	if( hab == 6 )
		return 3 * getPointsForSkill(valor);
	if( hab == 7 )
		return 1 * getPointsForSkill(valor);
	if( hab == 8 )
		return 1 * getPointsForSkill(valor);
	if( hab == 9 )
		return 2 * getPointsForSkill(valor);
	if( hab == 10 )
		return 2 * getPointsForSkill(valor);
	if( hab == 11 )
		return 1 * getPointsForSkill(valor);
	return 0;
} 

function getPointsForDefender( hab, valor ){
	if( hab == 5 )
		return 4 * getPointsForSkill(valor);
	if( hab == 6 )
		return 2 * getPointsForSkill(valor);
	if( hab == 7 )
		return 1 * getPointsForSkill(valor);
	if( hab == 8 )
		return 2 * getPointsForSkill(valor);
	if( hab == 9 )
		return 1 * getPointsForSkill(valor);
	if( hab == 10 )
		return 2 * getPointsForSkill(valor);
	if( hab == 11 )
		return 1 * getPointsForSkill(valor);
	return 0;
} 

function getPointsForSkill(valor) {
	if( valor < 70 )
		return -3;
	if( valor < 75 )
		return -2;
	if( valor < 80 )
		return -1;
	if( valor < 85 )
		return 0;
	if( valor < 90 )
		return 1;
	if( valor < 95 )
		return 2;
	return 3;
}

function insertColumnMedia(tablenum, coluna) {
    if (theTable.tHead) {
        oneRow = theTable.tHead.rows[0]
        newCell = oneRow.insertCell(coluna)
    }

	newCell.innerHTML = '<a href=#><b>Avg</b></a>'
	newCell.title = "Average Skills"
	newCell.addEventListener("click", function(event) { 

								var tables = document.getElementsByTagName("table")
								theTable = tables[tablenum];
								theTableBody = theTable.tBodies[0];

								var arr = new Array(theTableBody.rows.length);
								for (var i = 0; i < theTableBody.rows.length; i++) {
									oneRow = theTableBody.rows[i];
									tmpCell = oneRow.cells;
									arr[i] = tmpCell[12].innerHTML
								}

								function sortNumber(a,b){
									return a - b;
								}

								arr.sort(sortNumber)
								
								var inicio = 0;
								while( arr.length > 0 ){
									prox = arr.pop();
									for (var i = inicio; i < theTableBody.rows.length; i++) {
										oneRow = theTableBody.rows[i];
										tmpCell = oneRow.cells;
										if( tmpCell[12].innerHTML == prox ){
											//Troca as linhas
											var temp = theTableBody.rows[inicio].innerHTML;
											theTableBody.rows[inicio].innerHTML = theTableBody.rows[i].innerHTML;
											theTableBody.rows[i].innerHTML = temp;
										}
									}
									
									inicio++;
								}
							}, false);





	
    for (var i = 0; i < theTableBody.rows.length; i++) {
        oneRow = theTableBody.rows[i];
		newCell = oneRow.insertCell(coluna)
		tmpCell = oneRow.cells;

		var avg;
		avg = 0;
		pos = tmpCell[1].innerHTML;
		for( var ii = 4; ii <= 11; ii++ ){
			if( pos == "G" ){
				if( ii == 5 || ii == 7 ){
					continue;
					}
			} else {
				if( ii == 4 ){
					continue;
					}
			}

			
			hab = tmpCell[ii].innerHTML;
			hab = limpaHabilidade(hab);
			avg += parseInt( hab );
		}
		if( pos == "G" ){
			avg = Math.round( avg / 6 );
		}
		else {
			avg = Math.round( avg / 7 );
		}
		newCell.innerHTML = Math.round(avg);
		newCell.align="center";
		newCell.title="Average";

    }
}

function insertColumnIdade(tablenum, coluna) {
//Function Disabled since version 0.3.0
	
	var oneRow, newCell, valor, razao, tmpCell
    if (theTable.tHead) {
        oneRow = theTable.tHead.rows[0]
        newCell = oneRow.insertCell(coluna)
    }

	newCell.innerHTML = '<a href=#>VA</a>';
	newCell.title = 'Value / Age. Higher is better';
	newCell.addEventListener("click", function(event) { 
						var tables = document.getElementsByTagName("table")
						theTable = tables[tablenum];
						theTableBody = theTable.tBodies[0];

						var arr = new Array(theTableBody.rows.length);
						for (var i = 0; i < theTableBody.rows.length; i++) {
							oneRow = theTableBody.rows[i];
							tmpCell = oneRow.cells;
							arr[i] = tmpCell[20].innerHTML
						}

						function sortNumber(a,b){
							return a - b;
						}

						arr.sort(sortNumber)
						
						var inicio = 0;
						while( arr.length > 0 ){
							prox = arr.pop();
							for (var i = inicio; i < theTableBody.rows.length; i++) {
								oneRow = theTableBody.rows[i];
								tmpCell = oneRow.cells;
								if( tmpCell[20].innerHTML == prox ){
									//Troca as linhas
									var temp = theTableBody.rows[inicio].innerHTML;
									theTableBody.rows[inicio].innerHTML = theTableBody.rows[i].innerHTML;
									theTableBody.rows[i].innerHTML = temp;
								}
							}
							
							inicio++;
						}
						}, false);
	
    for (var i = 0; i < theTableBody.rows.length; i++) {
        oneRow = theTableBody.rows[i];
		newCell = oneRow.insertCell(coluna)
		tmpCell = oneRow.cells;
		valor = tmpCell[18].innerHTML;
		valor = valor.substr(1);
		valor = valor.replace(/,/g, "")
		valor = parseInt(valor);
		valor = valor / 100000

		idade = tmpCell[3].innerHTML;
		idade = parseInt(idade)
		bonus = (26 - idade)/3;

		tmpCell = oneRow.cells;
		newCell.innerHTML = Math.round((valor/idade) + bonus);
		newCell.align="center";
		newCell.title = 'Value / Age. Higher is better'
    }
}

function removeDadosInuteis(tablenum) {
	
	var oneRow, newCell, valor, razao, tmpCell

    for (var i = 0; i < theTableBody.rows.length; i++) {
		oneRow = theTableBody.rows[i];
		tmpCell = oneRow.cells;
		pos = tmpCell[1].innerHTML;
		if( pos == "G" ){
			tmpCell[2].innerHTML = "-";
			tmpCell[5].innerHTML = "-";
			tmpCell[7].innerHTML = "-";
			tmpCell[13].innerHTML = "-";
			}
		else {
			tmpCell[4].innerHTML = "-";
		}
    }
}

function calculaVelocidadeReal(tablenum) {
	
	var oneRow, newCell, valor, razao, tmpCell

    for (var i = 0; i < theTableBody.rows.length; i++) {
		oneRow = theTableBody.rows[i];
		tmpCell = oneRow.cells;
		vel = tmpCell[8].innerHTML;
		vel = limpaHabilidade(vel);
		vel = parseInt(vel);
		
		vig = parseInt(tmpCell[14].innerHTML);
		real = (vel*vig)/100;
		real = Math.floor( real );
		tmpCell[8].title = tmpCell[8].title + " = " + real;
    }
}

function turnoAtual(){
	var buffer = document.getElementById("turn-info");
	buffer = buffer.innerHTML;
	buffer = buffer.split(" ");
	return parseInt(buffer[5]);
}

function getPlayerId(buffer){
	buffer = buffer.substring( buffer.indexOf("player_info") + 12, buffer.indexOf("\"", buffer.indexOf("player_info") + 12) );
	return buffer;
}

function getPlayerStoredSkills(id){
	// 0 -> gol
	// 1 -> rou
	// 2 -> pas
	// 3 -> chu
	// 4 -> vel
	// 5 -> dri
	// 6 -> con	
	// 7 -> cab
	// 8 -> vig
	// 9 -> turno mudança
	// 10-> ultimo turno login (nao utilizado)
	// 11-> turnos necessarios na ultima mudança

	var chave = 'p' + id;
	buffer = GM_getValue(chave, 0);
	if( buffer == 0 ){
		skills = new Array(12);
		for( var i=0; i<skills.length; i++ ){
			skills[i] = 0;
		}
		skills[11] = '-';
		return skills;
	} else {
//		alert( 'OUT: ' + buffer );
		skills = eval(buffer);
		if( skills.length < 12 )
			skills[11] = '-';
		return skills;
	}
}

function setPlayerStoredSkills(id, skills){
	var chave = 'p' + id;
	buffer = uneval(skills);
//	alert( 'IN: ' + buffer );
	GM_setValue(chave, buffer );
}

function limpaHabilidade(hab){
	if( hab.search(/span/) > 1 ){
		hab = hab.replace(/;/, "")
		hab = hab.replace(/<span style="color: blue">/, "")
		hab = hab.replace(/<span style="color: red">/, "")
		hab = hab.replace(/<\/span>/, "")
		hab = hab.replace(/<strong>/, "")
		hab = hab.replace(/<\/strong>/, "")
	}
	return hab;
}

function checkPlayer(row){
	tmpCell = oneRow.cells;
	playerId = getPlayerId(tmpCell[0].innerHTML);
	skills = getPlayerStoredSkills(playerId);
	var turno = turnoAtual();
	
	if( skills[2] == 0 ){
//		alert( 'Não existe, vamos salvar' );
		for( var i=4; i<12; i++ ){
			skills[i-4] = parseInt(limpaHabilidade(tmpCell[i].innerHTML));
		}
		skills[8] = parseInt(tmpCell[13].innerHTML);
		turno = turnoAtual();
		skills[9] = turno;
		skills[10] = turno;
		skills[11] = '-';
		setPlayerStoredSkills(playerId, skills);
	} else {
		var mudou = false;
		
		//Limita o contador para até 120 turnos - Deixa uma folga de 23 turnos para não logar e manter o contador
		if( (turno - skills[9] < 0 && turno - skills[9] > -24 ) || turno - skills[9] > 120 ){
			if( turno > 120 )
				skills[9] = turno - 120;
			else
				skills[9] = turno + 24;
		}
		
		for( var i=0; i<8; i++ ){

			var hab = limpaHabilidade(tmpCell[i+4].innerHTML);

			if( hab > skills[i] ){
				//Evoluiu
				mudou = true;
				tmpCell[i+4].className = 'blue';
				skills[i] = hab;
			} else if( hab < skills[i] ){
				//Regrediu
				mudou = true;
				tmpCell[i+4].className = 'red';
				skills[i] = hab;
			} else {
				//Tira negrito caso tenha evoluído a mais tempo
				//tmpCell[i+4].innerHTML = tmpCell[i+4].innerHTML.replace(/<strong>/, "")
				//tmpCell[i+4].innerHTML = tmpCell[i+4].innerHTML.replace(/<\/strong>/, "")
			}
		}
		if( mudou ){
			if( (turno - skills[9]) < 0 ){
				skills[11] = turno + 144 - skills[9];				
			} else {
				skills[11] = turno - skills[9];
			}
			skills[9] = turno;
		}
		skills[10] = turno;

		
		
		if( tmpCell[13].innerHTML < skills[8] ){
			tmpCell[13].className = 'red';
		} else if( tmpCell[13].innerHTML > skills[8] ){
			tmpCell[13].className = 'blue';
		}
		var dif = parseInt(tmpCell[13].innerHTML) - skills[8];
		if( dif > 0 ){
			tmpCell[13].title = tmpCell[13].title + " +" + dif;
		} else {
			tmpCell[13].title = tmpCell[13].title + " " + dif;
		}
		
		skills[8] = parseInt(tmpCell[13].innerHTML);

		//Atualiza dados
		setPlayerStoredSkills(playerId, skills);
	}
	
	// 0->Turnos desde que ocorreu a última evolução
	// 1->Turnos necessários para a última mudança
	resposta = new Array(2);
	
	if( turno < skills[9] )
		resposta[0] = ( turno+144 - skills[9] );
	else
		resposta[0] = (turno - skills[9]);

	if( skills[11] < 3 )
		resposta[1] = '-';
	else
		resposta[1] = skills[11];
	
	return( resposta );
}

function insertColumnLastTurnChange(tablenum, turns, coluna){
    if (theTable.tHead) {
        oneRow = theTable.tHead.rows[0]
        newCell = oneRow.insertCell(coluna)
    }

	newCell.innerHTML = '<a href=#>TC</a>'
	newCell.title = "How many turns ago player skills has changed"
	newCell.addEventListener("click", function(event) { 

								var tables = document.getElementsByTagName("table")
								theTable = tables[tablenum];
								theTableBody = theTable.tBodies[0];

								var arr = new Array(theTableBody.rows.length);
								for (var i = 0; i < theTableBody.rows.length; i++) {
									oneRow = theTableBody.rows[i];
									tmpCell = oneRow.cells;
									arr[i] = tmpCell[21].innerHTML
								}

								function sortNumber(a,b){
									return a - b;
								}

								arr.sort(sortNumber)
								
								var inicio = 0;
								while( arr.length > 0 ){
									prox = arr.pop();
									for (var i = inicio; i < theTableBody.rows.length; i++) {
										oneRow = theTableBody.rows[i];
										tmpCell = oneRow.cells;
										if( tmpCell[21].innerHTML == prox ){
											//Troca as linhas
											var temp = theTableBody.rows[inicio].innerHTML;
											theTableBody.rows[inicio].innerHTML = theTableBody.rows[i].innerHTML;
											theTableBody.rows[i].innerHTML = temp;
										}
									}
									
									inicio++;
								}
							}, false);
	
	
	
    for (var i = 0; i < theTableBody.rows.length; i++) {
        oneRow = theTableBody.rows[i];
		newCell = oneRow.insertCell(coluna)
		tmpCell = oneRow.cells;
		newCell.innerHTML = turns[i];
		newCell.align="center";
		if( turns[i] == 1 )
			newCell.title=turns[i] + " turn ago";
		else
			newCell.title=turns[i] + " turns ago";
	}
}

function insertColumnLastChangeTurnsNeeded(tablenum, turns, coluna){
    if (theTable.tHead) {
        oneRow = theTable.tHead.rows[0]
        newCell = oneRow.insertCell(coluna)
    }

	newCell.innerHTML = '<a href=#>TN</a>'
	newCell.title = "How many turns was necessary to player change"
	
    for (var i = 0; i < theTableBody.rows.length; i++) {
        oneRow = theTableBody.rows[i];
		newCell = oneRow.insertCell(coluna)
		tmpCell = oneRow.cells;
		newCell.innerHTML = turns[i];
		newCell.align="center";
		newCell.title=turns[i] + " turns needed";
	}
}


function getTimeAtual(){
	var url = window.location.href;
	var timeAtual = url.substring( url.indexOf("team_players") + 13 );
	timeAtual = timeAtual.split("?", 2);
	timeAtual = timeAtual[0].split("#", 2);
	return timeAtual[0];
}

function expandirTabela(){
	var tables = document.getElementsByTagName("table")
	var timeAtual = getTimeAtual();
	var jogadoresNormais = 0;
	var jogadoresJovens = 1;
	var jogadoresEmprestados = 2;

	//Calculo para jogadores contratatos
	theTable = tables[jogadoresNormais];
	theTableBody = theTable.tBodies[0];

	if( timeAtual == myTeam ){
		var lastTurnChange = new Array( theTableBody.rows.length );
		var turnsChangeNeeded = new Array( theTableBody.rows.length );
		for (var i = 0; i < theTableBody.rows.length; i++) {
			oneRow = theTableBody.rows[i];
			var resposta = checkPlayer(oneRow);
			lastTurnChange[i] = resposta[0];
			turnsChangeNeeded[i] = resposta[1];
		}
	}
	
	//adicionaModificadorStamina(jogadoresNormais, 13);
	insertColumnRazao(jogadoresNormais, 18);
	insertColumnMedia(jogadoresNormais, 12);
	insertColumnNota(jogadoresNormais, 20);
	//insertColumnIdade(jogadoresNormais, 20);
	removeDadosInuteis(jogadoresNormais);
	calculaVelocidadeReal(jogadoresNormais);

	if( timeAtual == myTeam ){
		insertColumnLastTurnChange(jogadoresNormais, lastTurnChange, 21);
		insertColumnLastChangeTurnsNeeded(jogadoresNormais, turnsChangeNeeded, 22);
	}

	//Calculo para jogadores jovens
	theTable = tables[jogadoresJovens];
	theTableBody = theTable.tBodies[0];	

	if( timeAtual == myTeam ){
		var lastTurnChange = new Array( theTableBody.rows.length );
		var turnsChangeNeeded = new Array( theTableBody.rows.length );
		for (var i = 0; i < theTableBody.rows.length; i++) {
			oneRow = theTableBody.rows[i];

			var resposta = checkPlayer(oneRow);
			lastTurnChange[i] = resposta[0];
			turnsChangeNeeded[i] = resposta[1];
		}
	}

	insertColumnRazao(jogadoresJovens, 18);
	insertColumnMedia(jogadoresJovens, 12);
	insertColumnNota(jogadoresJovens, 20);
	//insertColumnIdade(jogadoresJovens, 20);
	removeDadosInuteis(jogadoresJovens);
	calculaVelocidadeReal(jogadoresJovens);

	if( timeAtual == myTeam ){
		insertColumnLastTurnChange(jogadoresJovens, lastTurnChange, 21);
		insertColumnLastChangeTurnsNeeded(jogadoresJovens, turnsChangeNeeded, 22);
	}

	//Calculo para jogadores emprestados
	theTable = tables[jogadoresEmprestados];
	theTableBody = theTable.tBodies[0];	

	if( timeAtual == myTeam ){
		var lastTurnChange = new Array( theTableBody.rows.length );
		var turnsChangeNeeded = new Array( theTableBody.rows.length );
		for (var i = 0; i < theTableBody.rows.length; i++) {
			oneRow = theTableBody.rows[i];

			var resposta = checkPlayer(oneRow);
			lastTurnChange[i] = resposta[0];
			turnsChangeNeeded[i] = resposta[1];
		}
	}
	
	insertColumnRazao(jogadoresEmprestados, 18);
	insertColumnMedia(jogadoresEmprestados, 12);
	insertColumnNota(jogadoresEmprestados, 20);	
	//insertColumnIdade(jogadoresEmprestados, 20);
	removeDadosInuteis(jogadoresEmprestados);
	calculaVelocidadeReal(jogadoresEmprestados);

	if( timeAtual == myTeam ){
		insertColumnLastTurnChange(jogadoresEmprestados, lastTurnChange, 21);
		insertColumnLastChangeTurnsNeeded(jogadoresEmprestados, turnsChangeNeeded, 22);
	}

}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
  return null;
}

function getDimension(){
	var buffer = document.getElementById("turn-info");
	buffer = buffer.innerHTML;
	buffer = buffer.split(" ");
	return buffer[0];
}

function processaConfiguracoes(){

	var refresh = false;
	
	var timeMonitoradoFT = getQueryVariable('setMonitoredTeamFT')
	if(  timeMonitoradoFT != null ){
		GM_setValue('timeMonitoradoFT', timeMonitoradoFT);
		refresh = true;
	}
	
	var timeMonitoradoMT = getQueryVariable('setMonitoredTeamMT')
	if(  timeMonitoradoMT != null ){
		GM_setValue('timeMonitoradoMT', timeMonitoradoMT);
		refresh = true;
	}

	if( refresh ){
		var urlLimpa = window.location.href.split("?"); 
		urlLimpa = urlLimpa[0]
		alert( 'Done! Team Player List Plus has been updated.' );
		window.location = urlLimpa;
	}
}

function insereMenuConfiguracoes()
{
	var dimensao = getDimension();
	var timeAtual = getTimeAtual();
	var timeMonitoradoFT = GM_getValue('timeMonitoradoFT', 0);

	if( dimensao.toUpperCase() == 'FASTTICKER' ){
		if( timeMonitoradoFT == 0 ){
			timeMonitoradoFT = 'not monitored <a href="javascript:window.location=\'?setMonitoredTeamFT='+ timeAtual +'\';">[enable for this team]</a><br>';
		} else {
			if( timeAtual == timeMonitoradoFT ){
				timeMonitoradoFT = 'monitoring current team';
			} else {
				timeMonitoradoFT = 'monitoring team ' + timeMonitoradoFT;
			}
			timeMonitoradoFT += ' <a href="javascript:window.location=\'?setMonitoredTeamFT='+ 0 +'\';">[disable]</a>';
		}

		var timeMonitoradoMT = GM_getValue('timeMonitoradoMT', 0);
		if( timeMonitoradoMT == 0 ){
			timeMonitoradoMT = 'not monitored [enable for this team]<br>';
		} else {
			if( timeAtual == timeMonitoradoMT ){
				timeMonitoradoMT = 'monitoring current team';
			} else {
				timeMonitoradoMT = 'monitoring team ' + timeMonitoradoMT;
			}
			timeMonitoradoMT += ' [disable]';
		}
	} else {
		if( timeMonitoradoFT == 0 ){
			timeMonitoradoFT = 'not monitored [enable for this team]<br>';
		} else {
			if( timeAtual == timeMonitoradoFT ){
				timeMonitoradoFT = 'monitoring current team';
			} else {
				timeMonitoradoFT = 'monitoring team ' + timeMonitoradoFT;
			}
			timeMonitoradoFT += ' [disable]';
		}

		var timeMonitoradoMT = GM_getValue('timeMonitoradoMT', 0);
		if( timeMonitoradoMT == 0 ){
			timeMonitoradoMT = 'not monitored <a href="javascript:window.location=\'?setMonitoredTeamMT='+ timeAtual +'\';">[enable for this team]</a><br>';
		} else {
			if( timeAtual == timeMonitoradoMT ){
				timeMonitoradoMT = 'monitoring current team';
			} else {
				timeMonitoradoMT = 'monitoring team ' + timeMonitoradoMT;
			}
			timeMonitoradoMT += ' <a href="javascript:window.location=\'?setMonitoredTeamMT='+ 0 +'\';">[disable]</a>';
		}
	}
	
	var html = '<div align="right" style="font-size: 9px">Team Player List Plus '+ release +' <a onclick="javascript:document.getElementById(\'TeamListPlus\').style.display = \'\'">[setup]</a></div>';
	html +='<div id="TeamListPlus" align="right" style="display:none"><br><b><u>Monitoring System</u></b><br>';
	html +=' <br><b>FastTicker</b> - ' + timeMonitoradoFT;
	html +=' <br><br><b>MediumTicker</b> - ' + timeMonitoradoMT;
	html +='</div>';
	
	document.getElementById("main-content").innerHTML = html + document.getElementById("main-content").innerHTML;
}

function alteraListagemContratos()
{
	input = 'game/team_players_contracts/' + myTeam;
	output = input + '?sort=end';
	document.body.innerHTML = document.body.innerHTML.replace(input,output);	
}

processaConfiguracoes();
insereMenuConfiguracoes();
alteraListagemContratos();
expandirTabela();

