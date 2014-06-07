// ==UserScript==
// @name           Buzzerbeater Privatliga Pokale
// @namespace      trumpold-und-rothe.de
// @include        http://www.buzzerbeater.com/team/*/overview.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var team_id = document.URL.split("/")[4]
var data = GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.trumpold-und-rothe.de/bb-pokal.php?teamid="+team_id,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    if(response.responseText != 'nix'){
      if($("#teamDetailsBottom .boxcontent").length == 0){
	$("#subcontent #cbThisUserAppointments:last").after('<div id="teamDetailsBottom">  <div style=" " class="widebox" id="widecontent"><div class="boxtlcorner"></div><div class="boxtrcorner"></div><div style="  " class="boxheader">    <div style="float: left">Privatliga Trophäen  </div>   </div>   <div style=" " class="boxcontent">        <div style="float: left; width: 416px; margin-left: 14px; display:inline;">        </div>        <div style="clear: both">        </div>  <div class="boxclear"></div></div><div class="boxblcorner"></div><div class="boxbrcorner"></div><div class="boxfooter"></div></div>            <div style="clear: both; padding-top: 20px; height: 8px;"></div>     </div>');
      } else {
	//Alle vorhanden Pokale Auslesen
	var vor_pokal = new Array();
	//99 Als größten vorhanden Pokal hinzufügen
	vor_pokal[0] = 99;
	var i = 1;
	$("#teamDetailsBottom .boxcontent div:first a").each(function(c){
		vor_pokal[i] = $(this).attr('href').split("=")[1];
		i++;
	});
	//alle pl-pokale in ein objekt umwwandeln
  	var pl_pokal = eval("(" + response.responseText + ")");

	//alle PL-Pokale durchgehen und die richtige stelle zum einfügen suchen
	 //0 als kleinsten vorhanden Pokal hinzufügen
	vor_pokal[vor_pokal.length]= '0';
  	for (var i = 0; i < vor_pokal.length; ++i){
		var aktueller_pokal = parseInt(vor_pokal[i])
		var next_pokal = parseInt(vor_pokal[i+1])
		if(next_pokal != undefined){
// 		    alert('a: '+vor_pokal[i])
// 		    alert('n: '+next_pokal);
		    $.each(pl_pokal, function(cc){
			var aktueller_pl_pokal = parseInt($(this)[0])
// 			alert(typeof aktueller_pokal+' > '+typeof aktueller_pl_pokal+' && '+typeof next_pokal+' < '+typeof aktueller_pl_pokal)
// 			alert(aktueller_pokal+' > '+aktueller_pl_pokal+' && '+next_pokal+' < '+aktueller_pl_pokal)
			if(aktueller_pokal > aktueller_pl_pokal && next_pokal < aktueller_pl_pokal){
			    $("img[src=\"../../images/trophy_2_4.jpg\"]").parent("a").after('#');
			    delete this[0]
			}
		      });
		  
		}
		
		/*var aktueller_pokal = $(this)[0]+$(this)[1];
		var aktueller_pokal = aktueller_pokal.replace(/undefined/g, "");
		
		var aktueller_pl_pokal = $(this)[0];
		var next_pokal = vor_pokal[vor_pokal_length];*/
		
		/*$.each(pl_pokal, function(cc){
			alert('aktueller pokal '+aktueller_pokal);
			alert('next_pokal '+next_pokal);
			alert('pl pokal '+aktueller_pl_pokal);
	
			if(aktueller_pokal < aktueller_pl_pokal && next_pokal < aktueller_pl_pokal){
			    alert('#');
			    delete this[0]
				//return false;
			}
		});*/
	}


/*  	$.each(pl_pokal, function(u){
		//alle vorhanden pokale durchgehen und prüfen wo er hingehört
		var i2 = i-1;
		alert($(this)[0]+' > '+vor_pokal[i])
		if($(this)[0] > vor_pokal[i]){
				$("#teamDetailsBottom .boxcontent div:first a").each(function(c){
					if($(this).attr('href').split("=")[1] == vor_pokal[i]){
						$("a[href="+$(this).attr('href')+"]").before('#')
					}
				});
			//$("img[src=\"../../images/trophy_2_"+vor_pokal[i]+".jpg\"]").parent("a").after('#');
		}
//		if(vor_pokal[i] < $(this)[0] AND vor_pokal[i2] > $(this)[0]){
//			alert('#');
//		}
			//saison auslesen aus denen die pl pokale sind
		//	$(this)[0]
		i--;
	});*/
      }
      $("img[src=\"../../images/trophy_blank.jpg\"]").remove()
      //$("#teamDetailsBottom .boxcontent div:first").append(response.responseText);
    }
  }	
});




