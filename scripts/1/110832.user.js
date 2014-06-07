// ==UserScript==
// @name           UFC SIGAA Decode
// @namespace      Amon Campos
// @description    Decifra os códigos dos horários do SIGGA.
// @include        http://www.si3.ufc.br/sigaa/ensino/turma/busca_turma.jsf
// @include        http://www.si3.ufc.br/sigaa/graduacao/matricula/turmas_curriculo_tempo_real.jsf#
// ==/UserScript==


function decodificarHorario(codigoHorario, turno){
	
	var periodo = new Array();
	var seedTurno = {"M":7, "T":12, "N":17};
	var aulas = codigoHorario.length;

	var inicio = seedTurno[turno] + 0.5*parseInt(codigoHorario[0]);
	var horaInicio = Math.floor(inicio);
	var minutoInicio = (inicio - horaInicio)*60;

	periodo[0] = horaInicio+":"+minutoInicio;
	periodo[0] = formataHora(periodo[0]);
	
	var fim = seedTurno[turno] + 1 + 0.5*parseInt(codigoHorario[aulas-1]);		
	var horaFim = Math.floor(fim);
	var minutoFim = (fim - horaFim)*60;

	periodo[1] = horaFim+":"+minutoFim;
	periodo[1] = formataHora(periodo[1]);
	
	return periodo;
}
function formataHora(periodo){
	
	var padrao1 = /\d{2}:\d{2}/;
	var padrao2 = /\d{2}:\d{1}/;
	var padrao3 = /\d{1}:\d{2}/;
	var padrao4 = /\d{1}:\d{1}/;
	
	if(padrao1.exec(periodo)){
		return periodo;
	}else{
		if(padrao2.exec(periodo)){
			periodo = periodo+"0";
		}else{
			if(padrao3.exec(periodo)){
				periodo = "0"+periodo;
			}else{
				if(padrao4.exec(periodo)){
					periodo = "0"+periodo+"0";
				}
			}
		}
	}
	return periodo;
}
function separar(horario){
	
	var i = 0;
	var cod = new Array();
	while(horario[i] != "M" && horario[i] != "T" && horario[i] != "N")
		i++;

	cod[0] = horario.slice(0,i);
	cod[1] = horario[i];
	cod[2] = horario.slice(i+1);

	return cod;
}
function decodificar(horarios){
	
	var diasDaSemana = {"1":"Dom", "2":"Seg", "3":"Ter", "4":"Qua", "5":"Qui", "6":"Sex", "7":"Sab"};
	var horarioLegivel = "";

	for(var i=0; i < horarios.length; i++){
		if(horarios[i]!=""){
			var codigo = separar(horarios[i]);
			
			horarioLegivel += horarios[i] + "<br>";
			for(var c = 0; c < codigo[0].length; c++)
				horarioLegivel += diasDaSemana[horarios[i][c]]+" ";

			horarioLegivel += "<br>";
			var periodo = decodificarHorario(codigo[2], codigo[1]);

			horarioLegivel += periodo[0];
			horarioLegivel += "-";
			horarioLegivel += periodo[1];
			horarioLegivel += "<br>";
		}
	}
			
	return horarioLegivel;}

var tabela = new Array();
tabela[0] = document.getElementById("lista-turmas-curriculo");
tabela[1] = document.getElementById("lista-turmas");
var padrao = /^linha/;

for(var c = 0; c < tabela.length; c++){
	if(tabela[c]){
		for(var i = 0; i < tabela[c].rows.length; i++){
			var linha = tabela[c].rows[i];

			if(padrao.exec(linha.className)){
				var colunas = linha.cells;

				if(colunas.length > 5){
					var horarios = colunas[5].innerHTML.split('>');
					if(horarios.length > 1)
						horarios = horarios[1].split('<');
					if(horarios[0]!=" "){
						horarios = horarios[0].split(" ");
						colunas[5].innerHTML = decodificar(horarios);
						colunas[5].style.textAlign="center";
					}
				}
			}
		}
	}
}