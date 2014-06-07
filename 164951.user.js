// ==UserScript==
// @name       Ogame scanner
// @version    0.1
// @namespace   scan
// @description Scanneur de galaxie ogame
// @match      http://*.ogame.fr/game/index.php?page=galaxy
// @require    http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

$(function(){
    setTimeout(ok, 500);
});

function ok()
{
    var s = $("#expeditionbutton").parent().parent();
    s.append("<div id='button'><a href='javascript:void(0);'><span class='bleft'></span><span class='text'>Scanner cette galaxie</span><span class='bright'></span></a></div>");
	$("#button").bind('click', lancer);
	s.append("<div id='statbutton'><a href='javascript:void(0);'><span class='bleft'></span><span class='text'>Stats</span><span class='bright'></span></a></div>");
	s.append("<div id='stopbutton'><a href='javascript:void(0);'><span class='bleft'></span><span class='text'>Stopper le scan</span><span class='bright'></span></a></div>");
	$("#statbutton").bind('click', stat);
	$("#stopbutton").bind('click', function(){$("#button").show();$("#stopbutton").hide();cestparti = false;});
	$("#stopbutton").hide();
}

function lancer()
{
	$("#button").hide();
	$("#stopbutton").show();
	if(typeof(localStorage["scan_"+$("#galaxy_input").val()]) == 'undefined')
	{
		localStorage["scan_"+$("#galaxy_input").val()] = JSON.stringify(new Array());
	}
	$("#system_input").val("1");
	cestparti = true;
	unsafeWindow.submitForm();
	setTimeout(suivant, 5000);
}

function suivant()
{
	if(cestparti)
	{
		var system = $("#galaxytable .row").children(".microplanet").map(function()
		{
			return (($(this).attr("class").split(" ").indexOf("planetEmpty")) != -1);
		});
		var system_tmp = new Array();
		for(var i = 0; i < system.length; ++i)
		{
			system_tmp[i] = system[i];
		}
        var tmp = JSON.parse(localStorage["scan_"+$("#galaxy_input").val()]);
		tmp[$("#system_input").val()] = system_tmp;
		localStorage["scan_"+$("#galaxy_input").val()] = JSON.stringify(tmp);
		
		if($("#system_input").val() != 499)
		{
			unsafeWindow.submitOnKey(39);
			setTimeout(suivant, 2000);
		}
		else
		{
			$("#button").show();
			$("#stopbutton").hide();
		}
	}   
}

function stat()
{
    if(typeof(localStorage["scan_"+$("#galaxy_input").val()]) == 'undefined')
	{
		alert("La galaxie n'a pas encore été scannée");
	}
	var demande = prompt("Entrez les positions recherchées séparées par ';'").split(";");
	
	var resultats = "";
	
	var galaxie = JSON.parse(localStorage["scan_"+$("#galaxy_input").val()]);
	
	for(var i = 1; i < 500; ++i)
	{
		if(typeof(galaxie[i]) != 'undefined')
		{
			for(var j = 0; j < demande.length; ++j)
			{
				if(galaxie[i][demande[j]-1])
				{
					if(i != 1)
						resultats += ", ";
					resultats += i;
					break;
				}
			}
		}
	}
	alert("Liste des systèmes correspondant : "+resultats);
}