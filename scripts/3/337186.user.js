// ==UserScript==
// @name        redmine
// @namespace   redmine
// @include     http://www.win2020.net/*/issues*
// @exclude		http://www.win2020.net/*/issues/new
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var default_close=false;


window.addEventListener ("load", Greasemonkey_main, false);

// permet de cliquer sur le nom du groupe pour ouvrir/fermer plutot que de redirigé sur une autre page
function modif_link()
{
	$("span.expander").next().filter("a").attr("href","javascript:").click(function(){
	    $(this).prev().click();
	})
}

function Greasemonkey_main () {
	// permet de fermer le menu de droite
		$("#content").prepend("<div id='remove_right' class='open' style='width: 15px; float: right; position: relative; left: 11px; background-color: rgb(238, 238, 238); border-width: 1px medium 1px 1px; border-style: solid none solid solid; border-color: rgb(215, 215, 215) -moz-use-text-color rgb(187, 187, 187) rgb(215, 215, 215); cursor: pointer;'>&gt;</div>");
		
		$("#remove_right").click(function(){
			if($(this).hasClass("open"))
			{
				$(this).removeClass().addClass("close");
				$("#sidebar").css("display","none");
				$("#content").css("width","98%");
				$(this).html("<");
			}
			else
			{
				$(this).removeClass().addClass("open");
				$("#sidebar").css("display","");
				$("#content").css("width","75%");
				$(this).html(">");
			}
		});
		
		if(default_close)
			$("#remove_right").click();
	
	
	var collapse = $("a.toggle-all").first();
	if(collapse.length==1)
	{
		// permet de fermer automatiquement les groupements
		if($("h2").html().match(".$")!=".")
			collapse.click();
		
		// ajoute un bouton qui permte de tier les groupe par leur compteur
			var groupe=new Array();
			var group_tr=new Array();
					
			$("table.list > tbody > tr").each(function(){
			    if($(this).hasClass("group"))
			    {
			        if(group_tr!="")
			        {
			            groupe[groupe.length]=[group_count,group_tr];
			            group_tr=new Array();
			        }
			        
			        group_tr[group_tr.length]=$(this);
			        group_count = parseInt($(this).find("td > span.count").html());
			    }
			    else
			        group_tr[group_tr.length]=$(this);
			});
			
			if(group_tr!="")
			    groupe[groupe.length]=[group_count,group_tr];	
			    
			$("p.buttons:first").append("<br/><input class='desc' id='button_tri' type='button' value='Tri nb demande' style='margin-top:10px;margin-left:3px'>");
			
			$("#button_tri").click(function(){
				$("table.list > tbody").html("");
			
				if($(this).hasClass("desc"))
				{
					$(this).removeClass().addClass("asc");
					groupe.sort(function(x,y){
					    return x[0] - y[0];
					});
				}
				else
				{
					$(this).removeClass().addClass("desc");
					groupe.sort(function(x,y){
					    return y[0] - x[0];
					});
				}
				
				for(var i=0; i<groupe.length; i++)
				{
				    var tempo = groupe[i][1];
				    for(var j=0;j<tempo.length;j++)
				    {
				        $("table.list > tbody").append(tempo[j]);
				    }
				}
				
				modif_link();
			});
			
		modif_link();
	}
}