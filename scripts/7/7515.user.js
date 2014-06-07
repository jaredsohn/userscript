// Filtro en la pantalla de cambio de Workset de PVCS
// version 0.1 BETA!
// 2007-02-01
// Copyright (c) 2005, Israel Sanchez Pulido
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            PVCS_WorkSet
// @namespace       http://pvcsfront.tsm.inet:8080/dimensions/
// @description     PVCS_WorkSet
// @include         http://pvcsfront.tsm.inet:8080/dimensions/*
// ==/UserScript==





function createOption(value, text) {
  var nOption = document.createElement('option');
	var isText = document.createTextNode(text);
	nOption.setAttribute('value', value);
	nOption.appendChild(isText);
	
	return nOption;
}
     	
function filtro() { 
var workset = document.createElement("select");
workset.name = "-CmdArguments.Workset";
workset.id = "-CmdArguments.Workset";
workset.appendChild(createOption('TU633229,.W],SPREPAGO:WS_CONTROL_SALDOS,.W]]','PREPAGO:WS_CONTROL_SALDOS'));
workset.appendChild(createOption('TU2741880,.W],SPREPAGO:WS_CRGE,.W]]','PREPAGO:WS_CRGE'));
workset.appendChild(createOption('TU658623,.W],SPREPAGO:WS_GEAC,.W]]','PREPAGO:WS_GEAC'));
workset.appendChild(createOption('TU1626506,.W],SPREPAGO:WS_GESTION_ABONADOS,.W]]','PREPAGO:WS_GESTION_ABONADOS'));
workset.appendChild(createOption('TU2966150,.W],SPREPAGO:WS_POCO_AIX,.W]]','PREPAGO:WS_POCO_AIX'));
workset.appendChild(createOption('TU2963590,.W],SPREPAGO:WS_POGE_AIX,.W]]','PREPAGO:WS_POGE_AIX'));
workset.appendChild(createOption('TU2035652,.W],SPREPAGO:WS_PPGP,.W]]','PREPAGO:WS_PPGP'));
workset.appendChild(createOption('TU5019817,.W],SPREPAGO:WS_SCRX,.W]]','PREPAGO:WS_SCRX'));
var select = document.getElementsByTagName('SELECT')[0];
select.parentNode.replaceChild(workset, select);
}

function nofiltroorigworkset()
{
var input = document.getElementsByTagName('INPUT')[0];
input.parentNode.parentNode.removeChild(input.parentNode);
}

function main()
{
	nofiltroorigworkset();
	if (location.href.indexOf('http://pvcsfront.tsm.inet:8080/dimensions?jsp=switch_workset') != -1) //Filtro
	{
		document.getElementsByTagName('TR')[2].innerHTML='<td nowrap height=19 class="buttonbar-td"><a href="http://pvcsfront.tsm.inet:8080/dimensions/?jsp=switch_workset"><img src="data:image/bmp,BM%1A%02%00%00%00%00%00%006%00%00%00(%00%00%00%0E%00%00%00%0B%00%00%00%01%00%18%00%00%00%00%00%E4%01%00%00%C4%0E%00%00%C4%0E%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%00%00%84%00%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%FF%FF%FF%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%FF%FF%FF%CE%D8%DD%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%FF%FF%FF%CE%D8%DD%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%CE%D8%DD%CE%D8%DD%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%CE%D8%DD%CE%D8%DD%CE%D8%DD%84%84%00%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%CE%D8%DD%FF%FF%FF%CE%D8%DD%CE%D8%DD%CE%D8%DD%84%84%00%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%CE%D8%DD%FF%FF%FF%CE%D8%DD%CE%D8%DD%CE%D8%DD%CE%D8%DD%CE%D8%DD%84%84%00%84%84%00%84%00%00%00%00%00%00%00%84%00%00%84%84%00%CE%D8%DD%FF%FF%FF%FF%FF%FF%FF%FF%FF%CE%D8%DD%CE%D8%DD%CE%D8%DD%CE%D8%DD%84%84%00%84%84%00%84%84%00%84%00%00%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%00%00" name="filter_select" border="0" alt="Filtro">&nbsp;Filtro</a></td>'+
		'<td nowrap height=19 class="buttonbar-td"><a href="javascript:submitPage(document.forms[0])"><img src="/dim_images/ok.gif" name="submit_page" border="0" alt="Run the command">&nbsp;OK</a></td>'+
		'<td nowrap height=19 class="buttonbar-td"><a href="javascript:parent.window.close()"><img src="/dim_images/cancel.gif" name="cancel" border="0" alt="Cancel this dialog">&nbsp;Cancel</a></td>'+
		'<td nowrap height=19 class="buttonbar-td"><a href="javascript:openHelpWin("/inet_webhelp/switch_workset_dialog_box.htm")"><img src="/dim_images/help.gif" name="help" border="0" alt="Help for this page">&nbsp;Help</a></td>';
	} 
	else if (location.href.indexOf('http://pvcsfront.tsm.inet:8080/dimensions/?jsp=switch_workset') != -1) //No filtro
	{
		document.getElementsByTagName('TR')[2].innerHTML='<td nowrap height=19 class="buttonbar-td"><a href="http://pvcsfront.tsm.inet:8080/dimensions?jsp=switch_workset"><img src="data:image/bmp,BM%1A%02%00%00%00%00%00%006%00%00%00(%00%00%00%0E%00%00%00%0B%00%00%00%01%00%18%00%00%00%00%00%E4%01%00%00%C4%0E%00%00%C4%0E%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%00%00%00%00%00%00%84%00%00%84%00%00%84%00%00%84%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%00%00%00%84%00%00%84%84%00%84%84%00%84%00%00%00%00%00%00%00%FF%00%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%84%00%00%84%84%00%FF%FF%FF%84%00%00%00%00%FF%00%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%FF%FF%FF%CE%D8%DD%00%00%FF%00%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%00%00%FF%00%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%00%00%FF%00%00%FF%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%00%00%FF%00%00%FF%00%00%FF%00%00%FF%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%00%00%FF%00%00%FF%CE%D8%DD%CE%D8%DD%00%00%FF%00%00%FF%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%84%00%00%84%84%00%00%00%FF%00%00%FF%CE%D8%DD%CE%D8%DD%CE%D8%DD%CE%D8%DD%00%00%FF%00%00%FF%84%84%00%84%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%00%00%FF%FF%FF%FF%FF%FF%FF%CE%D8%DD%CE%D8%DD%CE%D8%DD%CE%D8%DD%00%00%FF%00%00%FF%84%84%00%84%00%00%00%00%84%00%00%00%00%FF%00%00%FF%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%84%00%00%00%00%FF%00%00%FF%84%00%00%00%00" name="filter_select" border="0" alt="Filtro">&nbsp;Filtro</a></td>'+
		'<td nowrap height=19 class="buttonbar-td"><a href="javascript:submitPage(document.forms[0])"><img src="/dim_images/ok.gif" name="submit_page" border="0" alt="Run the command">&nbsp;OK</a></td>'+
		'<td nowrap height=19 class="buttonbar-td"><a href="javascript:parent.window.close()"><img src="/dim_images/cancel.gif" name="cancel" border="0" alt="Cancel this dialog">&nbsp;Cancel</a></td>'+
		'<td nowrap height=19 class="buttonbar-td"><a href="javascript:openHelpWin("/inet_webhelp/switch_workset_dialog_box.htm")"><img src="/dim_images/help.gif" name="help" border="0" alt="Help for this page">&nbsp;Help</a></td>';
		filtro();
	}
}

main();