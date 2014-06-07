// ==UserScript==
// @name           highlightsFleet
// @namespace      http://userscripts.org/
// @description    highlights a list of IDs
// @include        http://*.astroempires.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js

// ==/UserScript==


// mete o link no menu
	var f2= $('a[href=/]');
	if (f2.length!=0){
	}


var f1= $("table[id='map_fleets'],table[id='base_fleets'],table[id='fleets_attack-list']");
if (f1.length!=0){
	// insere menu
	var htm="<div style='text-align:center;'>";
	htm+="<a id='highlight' href='#'>[ID list |</a>";
	htm+="<a id='comutaVisibilidade' href='#'> "+GM_getValue('visibilidade','ALL VISIBLE')+"]</a>";
	htm+="</div>";
	f1.before(htm);
	document.getElementById("highlight").addEventListener("click",function(event){highlight();event.stopPropagation();event.preventDefault();},true);
	document.getElementById("comutaVisibilidade").addEventListener("click",function(event){comutaVisibilidade();event.stopPropagation();event.preventDefault();},true);


	// insere cor background
		var list=GM_getValue( 'id','' ).split(',');
		var alguem=false;
		for(var id=0;id<(list.length);id++){
		    $('a[href=profile.aspx?player='+list[id]+']').each(function(){
		    	var content=$(this).text();
		    	$(this).parent().parent().css({backgroundColor: '#101040'});
			alguem=true;
			});
		}
		// hide
		if (GM_getValue('visibilidade','ALL VISIBLE')!='ALL VISIBLE' && alguem){
			f1.find("a[href^='profile']").each(function(){
				var cond=false;
				for(var id=0;id<(list.length);id++){
					if ($(this).attr("href").indexOf(list[id]) != -1){
						cond=true;
						break;
					}
				}
				if (!cond){
					$(this).parent().parent().html("");
				}
			});

		}

}




function highlight(){
      var id=prompt("Please set the comma-separated list of player IDs",GM_getValue( 'id','' ));
      GM_setValue('id',id);
	location.reload(true);
}

function comutaVisibilidade(){
      if (GM_getValue('visibilidade','ALL VISIBLE')=='ALL VISIBLE'){
		GM_setValue('visibilidade','IDs VISIBLE');
	}else{
		GM_setValue('visibilidade','ALL VISIBLE');
	}
	location.reload(true);
}

