// ==UserScript==

// @name           Buzzerbeater Privatliga Pokale

// @namespace      trumpold-und-rothe.de

// @include        http://www.buzzerbeater.com/team/*/overview.aspx

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==

$("img[src=\"../../images/trophy_blank.jpg\"]").remove()


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

      } 

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

		    $.each(pl_pokal, function(cc){

			var aktueller_pl_pokal = parseInt($(this)[0])
			//alert(aktueller_pokal+' >= '+aktueller_pl_pokal+' && '+next_pokal+' < '+aktueller_pl_pokal+' && '+next_pokal+' != '+aktueller_pokal)

			if(aktueller_pokal >= aktueller_pl_pokal && next_pokal < aktueller_pl_pokal && next_pokal != aktueller_pokal){
			   // alert('#');
			    var bild = '<a href="http://www.buzzerbeater.com/community/pl/'+$(this)[2]+'/overview.aspx" title="'+$(this)[1]+', Season '+$(this)[0]+'"><img style="padding-right:14px" src="http://trumpold-und-rothe.de/bb-pokale/Trophy_PL-'+$(this)[3]+'.jpg" /></a>'
			    if(next_pokal == 0){
				$("#teamDetailsBottom .boxcontent div:first").append(bild)
			    } else {
				var insert = 0

			    	$("#teamDetailsBottom .boxcontent div:first a").each(function(c){

					if($(this).attr('href').split("=")[1] == next_pokal && insert == 0){
						//alert('Pokal '+aktueller_pl_pokal)

						$("a[href="+$(this).attr('href')+"]:first").before(bild)
						insert = 1;

			    		}

				    });
			    }

			    delete this[0]

			}

		      });

		}

	}
	var i = 0;

	$("#teamDetailsBottom .boxcontent div:first img").each(function(c){
		if(i > 4){
			if($(this).attr('src').lastIndexOf("small") == '-1'){
				$(this).attr('src',$(this).attr('src').replace(/.jpg/g, "_small.jpg"))
			}
		}
		i++;
	});

      

    }

  }	

});