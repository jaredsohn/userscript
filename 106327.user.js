// ==UserScript==
// @name           Decodificar Horario Sigaa
// @namespace      hbobenicio
// @description    Decodifica os horarios visualizados no sigaa
// @include        http://www.si3.ufc.br/sigaa/ensino/turma/busca_turma.jsf
// ==/UserScript==

function decodificarHorario(codigoHorario, turno)
{
	var periodo = {"inicio":null, "fim":null};
	var seedTurno = {"M":7, "T":12, "N":17};
	
	inicio = seedTurno[turno] + 0.5*parseInt(codigoHorario[0]);
	fim = seedTurno[turno] + 1 + 0.5*parseInt(codigoHorario[1]);
	
	horaInicio = Math.floor(inicio);
	minutoInicio = (inicio - horaInicio)*60;
	
	horaFim = Math.floor(fim);
	minutoFim = (fim - horaFim)*60;
	
	periodo.inicio = horaInicio+":"+minutoInicio;
	periodo.fim = horaFim+":"+minutoFim;
	
	return periodo;
}

function decodificar(horarioMazela)
{
	var diasDaSemana = {"1":"Domingo", "2":"Segunda", "3":"Terça", "4":"Quarta", "5":"Quinta", "6":"Sexta", "7":"Sábado"};
	var turnos = {"M":"de Manha", "T":"à Tarde", "N":"à Noite"};
	var horarioLegivel = "";
	
	var i = 0;
	while(horarioMazela[i] != "M" && horarioMazela[i] != "T" && horarioMazela[i] != "N")
		i++;
	
	var codSemana = horarioMazela.slice(0,i);
	var codTurno = horarioMazela[i];
	var codHorario = horarioMazela.slice(i+1);

	for(i = 0; i < codSemana.length; i++)
		horarioLegivel += diasDaSemana[horarioMazela[i]] + ", ";
		
	horarioLegivel += turnos[codTurno] + ", ";
	
	periodo = decodificarHorario(codHorario, codTurno);
	horarioLegivel += "das " + periodo.inicio + " às " + periodo.fim;
	
	return horarioLegivel;
}

var tabela = document.getElementById("lista-turmas");
if(tabela)
{
	for(i = 0; i < tabela.rows.length; i++)
	{
		var linha = tabela.rows[i];
		if(linha.className == "linhaPar" || linha.className == "linhaImpar")
		{
			var colunas = linha.cells;
			if(colunas.length > 5)
			{
				
				colunas[5].innerHTML = decodificar(colunas[5].innerHTML);
			}
		}
	}
}

