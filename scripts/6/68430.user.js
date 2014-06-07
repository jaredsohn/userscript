// ==UserScript==
// @name           Contabilizador Horas Semanais Salas e Docentes Portal ISEP
// @namespace      http://www.nunobett.info/scripts/greasemonkey
// @description    Este script permite visualizar abaixo do horário do docente ou da sala, o número total de horas semanais.
// @include        https://portal.isep.ipp.pt/INTRANET/educacao/ver_salas.asp*cyep*
// @include        https://portal.isep.ipp.pt/INTRANET/educacao/ver_docentes.asp*cyep*slot*
// @copyright      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/pt/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/2.5/pt/88x31.png" /></a><br /><span xmlns:dc="http://purl.org/dc/elements/1.1/" href="http://purl.org/dc/dcmitype/Text" property="dc:title" rel="dc:type">Script for recreating exams table to microformats</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.nunobett.info/" property="cc:attributionName" rel="cc:attributionURL">Nuno Bettencourt</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/pt/">Creative Commons Attribution-Non-Commercial-Share Alike 2.5 Portugal License</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.nunobett.info/scripts/greasemonkey/contabilizador_horas_semanais_salas_portal_isep.user.copyright.html" rel="cc:morePermissions">contabilizador_horas_semanais_salas_portal_isep.user.copyright.html</a>.
// @last-update	   2010-02-09
// ==/UserScript==

const TABLE_ID = 18
const NUM_MAX_HORAS = 82.5

function createHorasTR(descricao)
{
    //Construir o elemento que mostra cada linha adicional
    var html_tr = document.createElement("tr");
    var html_td = document.createElement("td");
    html_td.setAttribute("class", "border2_top");

    var html_span_ot = document.createElement("span");
    var span_text = document.createTextNode(descricao);
    html_span_ot.appendChild(span_text);
    html_td.appendChild(html_span_ot);
    html_tr.appendChild(html_td);
    return html_tr;
}

function createHorasTD(valor)
{
    var html_td = document.createElement("td");
    html_td.setAttribute("class", "border1_top_left");
    var html_span_ot = document.createElement("span");
    var span_text = document.createTextNode(valor);
    html_span_ot.appendChild(span_text);
    html_td.appendChild(html_span_ot);
    return html_td;
}

function createHorasElement(descricao, valor)
{
    //Construir o elemento que mostra todas as horas
    var html_tr = document.createElement("tr");
    
    // elemento das horas OT
    var html_td = document.createElement("td");
    var html_span_ot = document.createElement("span");
    var span_text = document.createTextNode("Num Horas " + descricao +":" + valor);
    html_span_ot.appendChild(span_text);
    html_td.appendChild(html_span_ot);
    html_tr.appendChild(html_td);
    return html_tr;
}

var g_pl = 0;
var g_tp = 0;
var g_ot = 0;
var g_t = 0;
var g_total_semanal = 0;
var g_total_diario = 0;
var g_pl_nocturno = 0;
var g_tp_nocturno = 0;
var g_ot_nocturno = 0;
var g_t_nocturno = 0;
var g_cont_vazios = 0;

var table_horario = document.getElementsByTagName("table")[TABLE_ID];
var html_tr_ot = createHorasTR("Horas OT");
var html_tr_pl = createHorasTR("Horas PL");
var html_tr_tp = createHorasTR("Horas TP");
var html_tr_t = createHorasTR("Horas T");
var html_tr_total_diario = createHorasTR("Horas Diárias");
var html_tr_total_semanal = createHorasTR("Horas Semanais");
var html_tr_pct_ocupacao = createHorasTR("Percentagem Ocupação (apenas para salas)");

//percorrer as várias colunas da semana
//devido aos rowspans, não é possível acertar nos trs com as posições correctas da semana,
// portanto não é possível obter estatísticas diárias
/*
for (dia_semana=3; dia_semana<4; dia_semana++)
{
    var trs_hora = table_horario.rows;
    for (i=1;i < trs_hora.length; i++)
    {
		alert(i)
        var tds_hora = trs_hora[i].cells;
        tds_hora_length =  tds_hora.length;
 
 
        var td_aula = tds_hora[dia_semana];
		//alert(td_aula.textContent)
        if (td_aula != null)
        {
            var row_span_value = td_aula.getAttribute("rowspan");
            if (row_span_value != null)
            {
                var num_slots = parseInt(row_span_value);
        
                 // obter a hora para saber se é depois das 20h
                var tr_hora = td_aula.parentNodev
                var td_hora = td_aula.parentNode.childNodes[1];
                var hora = td_hora.textContent;
                hora = hora.substring(0, 2)        

                // obter o tipo de aula
                //alert(td_aula.innerHTML)
				var td_tipo_aula = td_aula.getElementsByTagName("td")[1];
                var tipo_aula = td_tipo_aula.textContent;
				var valor = num_slots/2;
				alert("SLOTS:" + num_slots + "- valor=" + valor + "- AULA:" + tipo_aula + "- dia_semana" + dia_semana + "- linha" + i + "html:" + td_aula.innerHTML)
				//alert(num_slots + "-" + tipo_aula + "dia_semana" + dia_semana + "linha" + i)
				if ( tipo_aula== "OT" )
				{    
                    g_ot += valor;
                }
                if ( tipo_aula== "PL" )
                {    
                    g_pl += valor;
                }
                if ( tipo_aula== "T" )
                {    
                    g_t += valor;
                }
                if ( tipo_aula== "TP" )
                {    
                    g_tp += valor;
                }
				//alert("antes:" + i + "slots a add:" + num_slots);
				i+= num_slots-1;
				num_slots = 0;
				//alert("depois:" + i);
            }
			else
			{
				g_cont_vazios +=1;
			}
		}
		else
		{
			//alert ("é nulo");    
		}

	}
    // elemento das horas OT
    html_td_ot = createHorasTD(g_ot);
    html_tr_ot.appendChild(html_td_ot);

    html_td_pl = createHorasTD(g_pl); 
    html_tr_pl.appendChild(html_td_pl);

    html_td_tp = createHorasTD(g_tp);    
    html_tr_tp.appendChild(html_td_tp);

    html_td_t = createHorasTD(g_t);    
    html_tr_t.appendChild(html_td_t);

	html_td_total_diario = createHorasTD(g_t+g_ot+g_pl+g_tp);    
    html_tr_total_diario.appendChild(html_td_total_diario);
    g_total_semanal += g_t+g_ot+g_pl+g_tp;
    g_ot=0;    
    g_pl=0;    
    g_tp=0;    
    g_t=0;    
	g_cont_vazios = 0;
}


html_td_total_semanal = createHorasTD(g_total_semanal);    
html_tr_total_semanal.appendChild(html_td_total_semanal);

//adicionar os elementos ao final da tabela
var tbody = table_horario.getElementsByTagName("tbody")[0];
tbody.appendChild(html_tr_ot);
tbody.appendChild(html_tr_pl);
tbody.appendChild(html_tr_tp);
tbody.appendChild(html_tr_t);
tbody.appendChild(html_tr_total_diario);
tbody.appendChild(html_tr_total_semanal);
*/
var trs_hora = table_horario.rows;
for (i=1;i < trs_hora.length; i++)
{
	var tds_hora = trs_hora[i].cells;
	tds_hora_length =  tds_hora.length;
		
	for (j=1; j < tds_hora.length; j++)
	{
		var td_aula = tds_hora[j];
		//alert(td_aula.textContent)
		if (td_aula != null)
		{
			var row_span_value = td_aula.getAttribute("rowspan");
			if (row_span_value != null)
			{
				var num_slots = parseInt(row_span_value);
		
				 // obter a hora para saber se é depois das 20h
				var tr_hora = td_aula.parentNodev
				var td_hora = td_aula.parentNode.childNodes[1];
				var hora = td_hora.textContent;
				hora = hora.substring(0, 2)        

				// obter o tipo de aula
				//alert(td_aula.innerHTML)
				var td_tipo_aula = td_aula.getElementsByTagName("td")[1];
				var tipo_aula = td_tipo_aula.textContent;
				var valor = num_slots/2;
				//alert("SLOTS:" + num_slots + "- valor=" + valor + "- AULA:" + tipo_aula + "- dia_semana" + dia_semana + "- linha" + i + "html:" + td_aula.innerHTML)
				//alert(num_slots + "-" + tipo_aula + "dia_semana" + dia_semana + "linha" + i)
				if ( tipo_aula== "OT" )
				{    
					g_ot += valor;
				}
				if ( tipo_aula== "PL" )
				{    
					g_pl += valor;
				}
				if ( tipo_aula== "T" )
				{    
					g_t += valor;
				}
				if ( tipo_aula== "TP" )
				{    
					g_tp += valor;
				}
				//alert("antes:" + i + "slots a add:" + num_slots);
	//			i+= num_slots-1;
	//			num_slots = 0;
				//alert("depois:" + i);
			}
			else
			{
				g_cont_vazios +=1;
			}
		}
		else
		{
			//alert ("é nulo");    
		}
	}
}
// elemento das horas OT
html_td_ot = createHorasTD(g_ot);
html_tr_ot.appendChild(html_td_ot);

html_td_pl = createHorasTD(g_pl); 
html_tr_pl.appendChild(html_td_pl);

html_td_tp = createHorasTD(g_tp);    
html_tr_tp.appendChild(html_td_tp);

html_td_t = createHorasTD(g_t);    
html_tr_t.appendChild(html_td_t);

html_td_total_diario = createHorasTD(g_t+g_ot+g_pl+g_tp);    
html_tr_total_diario.appendChild(html_td_total_diario);
g_total_semanal += g_t+g_ot+g_pl+g_tp;
g_ot=0;    
g_pl=0;    
g_tp=0;    
g_t=0;    
g_cont_vazios = 0;


html_td_total_semanal = createHorasTD(g_total_semanal);    
html_tr_total_semanal.appendChild(html_td_total_semanal);

var pct = g_total_semanal / NUM_MAX_HORAS * 100
pct = pct.toPrecision(4)
html_td_pct_ocupacao = createHorasTD(pct + "% (" + g_total_semanal + "/" + NUM_MAX_HORAS +")");    
html_tr_pct_ocupacao.appendChild(html_td_pct_ocupacao);

//adicionar os elementos ao final da tabela
var tbody = table_horario.getElementsByTagName("tbody")[0];
tbody.appendChild(html_tr_ot);
tbody.appendChild(html_tr_pl);
tbody.appendChild(html_tr_tp);
tbody.appendChild(html_tr_t);
//tbody.appendChild(html_tr_total_diario);
tbody.appendChild(html_tr_total_semanal);
tbody.appendChild(html_tr_pct_ocupacao);

/*
var tds_hora = table_horario.getElementsByTagName("td")
var tds_hora_length =  tds_hora.length;
//alert("Número de filhos:" + trs_length)
for (i=0;i<tds_hora_length;i++)
{
*/
/*    alert('a');
    if (foo == null) 
    {   
        alert('foo is not set.'); 
    }
    else
    {
        alert('foo set.'); 
    }
    alert('b');
*/
/*    var td_aula = tds_hora[i];
    var row_span_value = td_aula.getAttribute("rowspan");

    //alert(row_span_value);
    if (row_span_value != null)
    {
        //alert ("não é nulo");
        //alert(row_span_value);
        var num_slots = row_span_value
        
        // obter a hora para saber se é depois das 20h
        var tr_hora = td_aula.parentNode
        var td_hora = td_aula.parentNode.childNodes[1]
        var hora = td_hora.textContent
        hora = hora.substring(0, 2)        

        // obter o tipo de aula
        var td_tipo_aula = td_aula.getElementsByTagName("td")[1]
        var tipo_aula = td_tipo_aula.textContent
        //alert(tipo_aula);
		if ( tipo_aula== "OT" )
        {    
            g_ot += parseInt(num_slots)/2;
        }
        if ( tipo_aula== "PL" )
        {    
            g_pl += parseInt(num_slots)/2;
        }
        if ( tipo_aula== "T" )
        {    
            g_t += parseInt(num_slots)/2;
        }
        if ( tipo_aula== "TP" )
        {    
            g_t += parseInt(num_slots)/2;
        }
    }
    else
    {
        //alert ("é nulo");    
    }
}

// elemento das horas OT
//var html_td = document.createElement("td");
//var html_span_ot = document.createElement("span");
//var span_text = document.createTextNode("Num Horas OT:" + g_ot);
//html_span_ot.appendChild(span_text);
//html_td.appendChild(html_span_ot)

var tbody = table_horario.getElementsByTagName("tbody")[0]

novo_tr = createHorasElement("Total", g_tp+g_ot+g_pl+g_t)
tbody.appendChild(novo_tr)

novo_tr = createHorasElement("OT", g_ot)
tbody.appendChild(novo_tr)

novo_tr = createHorasElement("PL", g_pl)
tbody.appendChild(novo_tr)

novo_tr = createHorasElement("T", g_t)
tbody.appendChild(novo_tr)

novo_tr = createHorasElement("TP", g_tp)
tbody.appendChild(novo_tr)
*/