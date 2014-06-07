// ==UserScript==
// @name       Ogame scanner d'inactif
// @version    0.1
// @namespace   scan
// @description Scanneur de d'inactifs ogame
// @match      http://*.ogame.fr/game/index.php?page=galaxy
// @require    http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

$(function(){
    setTimeout(ok, 500);
});

function ok()
{
    var s = $("#expeditionbutton").parent().parent();
    s.append("<div id='button'><a href='javascript:void(0);'><span class='bleft'></span><span class='text'>Scanner les inactifs de cette galaxie</span><span class='bright'></span></a></div>");
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
	localStorage["inactif_"+$("#galaxy_input").val()] = JSON.stringify(new Array());
	$("#system_input").val("1");
	cestparti = true;
	unsafeWindow.submitForm();
	setTimeout(suivant, 2000);
}

function suivant()
{
	if(cestparti)
	{
        var tmp2 = JSON.parse(localStorage["inactif_"+$("#galaxy_input").val()]);
        $("#galaxyContent .playername .status .status_abbr_inactive.tooltip").map(function(){
            var tmp = new Object();
            tmp["pseudo"] = $(this).parent().parent().parent().children("a").text();
            tmp["rang"] = $(this).parent().parent().parent().find(".rank a").text();
            tmp["position"] = "[" + $("#galaxy_input").val() + ":" + $("#system_input").val() + ":" + $(this).parent().parent().parent().parent().find(".position").text() + "]";
            tmp["tres_inactif"] = false;
            tmp2.push(tmp);
        });
        
        $("#galaxyContent .playername .status .status_abbr_longinactive.tooltip").map(function(){
            var tmp = new Object();
            tmp["pseudo"] = $(this).parent().parent().parent().children("a").text();
            tmp["rang"] = $(this).parent().parent().parent().find(".rank a").text();
            tmp["position"] = "[" + $("#galaxy_input").val() + ":" + $("#system_input").val() + ":" + $(this).parent().parent().parent().parent().find(".position").text() + "]";
            tmp["tres_inactif"] = true;
            tmp2.push(tmp);
        });
        
        localStorage["inactif_"+$("#galaxy_input").val()] = JSON.stringify(tmp2);
		
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

function comparer(a, b)
{
	return a["rang"] - b["rang"];   
}

function stat()
{
    if(typeof(localStorage["inactif_"+$("#galaxy_input").val()]) == 'undefined')
	{
		alert("La galaxie n'a pas encore été scannée");
	}
	
	var resultats = "";
	
	var galaxie = JSON.parse(localStorage["inactif_"+$("#galaxy_input").val()]);
	
	galaxie.sort(comparer);
    var last_pseudo = "";
    
    for(var i = 0; i < galaxie.length; ++i)
    {
        if(galaxie[i]["pseudo"] == last_pseudo)
        {
            resultats += ", " + galaxie[i]["position"];
        }
        else
        {
            if(i != 0)
                resultats += "<br />";
            if(galaxie[i]["tres_inactif"])
                resultats += "<strong style='color: red;' >" + galaxie[i]["pseudo"]+"</strong>";
            else
                resultats += galaxie[i]["pseudo"];
            resultats += " (" + galaxie[i]["rang"] + ") : " + galaxie[i]["position"];
        }
        last_pseudo = galaxie[i]["pseudo"];
    }
    
	$("#fleetstatusrow").html(resultats);
}