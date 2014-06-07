// ==UserScript==
// @name        	IAP vGates sur Userscript
// @namespace   	IAP vGates Sur Userscript
// @updateURL   	https://userscripts.org/scripts/source/160873.meta.js
// @downloadURL  	https://userscripts.org/scripts/source/160873.user.js
// @include     	http://stcweb*.prod.ld:8092/*
// @include     	http://stcweb*.private.sfr.com:8092/*
// @require     	https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     	http://stcweb1.private.sfr.com:8092/ui/head/js/jquery/modules/jquery.cluetip.js 
// @version     	4.2
// ==/UserScript==



var Liste_TT = '';

var U_Encara = $("select#select_nom option").val();
// alert(U_Encara);
var serveur = window.location.hostname;

$("div#headerTitre h1").html("<span>IAPvGates</span>IAPvGates");

WaitMyIAP();
var wait_en_boucle = setInterval(WaitMyIAP,1000);


function WaitMyIAP() {

	if ( $("table#myIAP").size() == 0 ) return;
  	else {
  		clearInterval(wait_en_boucle);

  		// $("table#myIAP tbody tr td:first-child a:first-child").each(function(){
		// 	var ticket = $(this).text();
		// 	Liste_TT += ticket+' - ';
		// });

		Modif_Tab_MyIAP();
		Add_Button();
	}
}

function Add_Button(){

	// var MyInput = '<input type="text" onclick="this.className=''" maxlength="10" size="10" value="" name="numero_sig" id="insert_numero_sig" class="">';
	var MyInput = '<input type="text" maxlength="10" size="10" value="" name="numero_sig" id="insert_numero_sig">';
	var MyButton = '<a id="mybutton" style="cursor: pointer; margin-top: 10px; padding: 5px; text-decoration: none" class="btn_refresh fg-button ui-state-default ui-corner-all" href="javascript:void(0)">Enregistrer Sig FT</a>';

	var MyAddSig = '<td id ="MyAddSig">'+MyInput+MyButton+'</td>';

	$("div#btn_refresh_iap").wrap("<div id='div_fake' style='display: block;'></div>");
	$("div#btn_refresh_iap").wrap("<td></td>");
	$("div#btn_refresh_iap a").text("Actualiser IAP");

	$(MyAddSig).prependTo("div#div_fake");


	$("a#mybutton").click(function(){
	    AddSig($("#insert_numero_sig").val());
	    // $(this).slideUp(500,"swing").slideDown(500,"swing");
	})
}


function Modif_Tab_MyIAP(){

	if ($("th#TH-FT").size() == 0) {

		var index_th_com = $("table#myIAP thead th:contains('Com.')").index();
		var index_td_com = index_th_com+8;
		var index_td_ft = index_td_com+1;

		$("table#myIAP tbody tr").each(function(){
			var ticket = $(this).find("td:first-child a:first-child").text();
			Liste_TT += ticket+' - ';

			var TD_com = $(this).find("td:eq("+index_td_com+")");
			$(TD_com).clone().insertAfter(TD_com);

			var TD_FT = $(this).find("td:eq("+index_td_ft+")");
			$(TD_FT).find("a").remove();
			$(TD_FT).attr("id", ticket);
			$(TD_FT).attr("class", "classattack");

		});

		// var MyUpdate = '<form id="refreshFT"><img alt="Actualiser" src="img/update.gif" onclick=></form>';
		var MyUpdate = '<img id="refreshFT" alt="Actualiser" src="img/update.gif">';

		var New_TH = '<th id="TH-FT" width="77px" style="border-left:2px solid #FFFFFF" class="{sorter: false}" rowspan="2"><b>FT</b><br>'+MyUpdate+'</th>';


		$(New_TH).insertAfter("table#myIAP thead tr:eq(0) th:eq("+index_th_com+")");


		// $('a#clue-sticky').cluetip({sticky: true, splitTitle: '|'});

		Get_Info_WTFT();

	  	$("img#refreshFT").click(function(){
	  		// alert("refresh en cours");
	    	$(this).slideUp(500,"swing").slideDown(500,"swing");
	    	RefreshAllSig();
		})

		setInterval(Modif_Tab_MyIAP,5000);
	};
}


function Get_Info_WTFT(){

	$("td.classattack a").remove();

	GM_xmlhttpRequest({
		method: "POST",
      	url: "http://"+serveur+":8083/action.php",
      	data: "action=displaySignalisationsUser&encara="+U_Encara,
      	// synchronous: true,
      	headers: {"Content-Type": "application/x-www-form-urlencoded"},
      	onload: function(response) { 
        	// var codeHTML = response.responseText;
        	var codeHTML = '<div>'+response.responseText+'</div>';
        	// alert(codeHTML);

        	// if ($(codeHTML).find("div:eq(0)").attr("class") == "no_results") { alert('no encours')};
        	// if ($(codeHTML).find("div:eq(2)").attr("class") == "no_results") { alert('no clos')};

        	if ($(codeHTML).find("div:eq(0)").attr("class") != "no_results") {
        		// alert("in ok");
        		// alert($(codeHTML).find("table tbody tr").html());
				// $(codeHTML).find("div:eq(0) table tbody tr").each(function(){  // A PRIORI OK SAUF POUR EN COURS
				$(codeHTML).find("table tbody tr").each(function(){  // Pour que les EN COURS MARCHEN
					// alert($(this).text());
					// alert("in each");
					var ticket = $(this).find("td:nth-child(3) a").text();
					var sig = $(this).find("td:nth-child(5) a").text();
					var href_SIG = $(this).find("td:nth-child(3) a").attr("href");
					// alert(ticket);

					var etat_sig_font = $(this).find("td:nth-child(6)").attr("style");
					var etat_sig = $(this).find("td:nth-child(6)").text();
					var derniere_note = $(this).find("td:nth-child(7)").text();
					var bloc_sig = derniere_note;

					if ($("td#"+ticket+" a").size() == 0 ) {

						$("td#"+ticket).html("<a target=_blank>"+etat_sig+"</a>");

						$("td#"+ticket+" a").attr("href","http://"+serveur+":8083/"+href_SIG);
						$("td#"+ticket+" a").attr("style",etat_sig_font);
						// $("td#"+ticket+" a").attr("title",ticket+"|<p>"+derniere_note+"</p");
						$("td#"+ticket+" a").attr("class","cluetip");
						$("td#"+ticket+" a").attr("id",sig);
					}
					else {

						$("<br><a target=_blank>"+etat_sig+" (2)</a>").appendTo("td#"+ticket);
						$("td#"+ticket+" a:eq(0)").text(etat_sig+" (1)");
						// alert(sig);

						$("td#"+ticket+" a:eq(1)").attr("href","http://"+serveur+":8083/"+href_SIG);
						$("td#"+ticket+" a:eq(1)").attr("style",etat_sig_font);
						// $("td#"+ticket+" a").attr("title",ticket+"|<p>"+derniere_note+"</p");
						$("td#"+ticket+" a:eq(1)").attr("class","cluetip");
						$("td#"+ticket+" a:eq(1)").attr("id",sig);
					}


				  	GM_xmlhttpRequest({
					    method: "GET",
					    url: "http://"+serveur+":8083/"+href_SIG,
					    onload: function(response) { 
					      var codeHTML = response.responseText;

					      // Sans le IF ELSE
					      // bloc_sig = $(codeHTML).find("table.sig").html();

					      // VARIANTE 1
					      // if ($(codeHTML).find("table.sig").size() > 0 ) {
					      // 	bloc_sig = $(codeHTML).find("table.sig").html();
					      // }
					      // else if ($(codeHTML).find("div.no_results").size() > 0 ) {
					      // 	bloc_sig = $(codeHTML).find("div.no_results").html();
					      // }

					      // VARIANTE 2
					      if ( $(codeHTML).find("div.no_results").size() > 0 ) {
					      	bloc_sig = $(codeHTML).find("div.no_results").text();
					      }
					      else {
					      	bloc_sig = $(codeHTML).find("table.sig").html();
					      }

					      $("td#"+ticket+" a#"+sig).attr("title",ticket+" - "+sig+"|<table>"+bloc_sig+"</table");
					      $('a.cluetip').cluetip({width: '800px', splitTitle: '|'});
					    }
					});
				});
			}

			// alert("Sig Closes")

			//SIG CLOSES
			if ($(codeHTML).find("h1:contains('Sigs cloturées') + div").attr("class") != "no_results") {
				// $(codeHTML).find("h1:contains('Sigs cloturées') + table tbody").find("tr").each(function(){
				$(codeHTML).find("h1:contains('Sigs cloturées') + table tbody tr").each(function(){
				// $(codeHTML).find("div:eq(2) > table tbody tr").each(function(){
					var ticket = $(this).find("td:nth-child(2) a").text();
					var sig = $(this).find("td:nth-child(4) a").text();
					var id_sig = $(this).attr("id").split('_')[2];
					// alert(id_sig);

					var href_SIG = $(this).find("td:nth-child(2) a").attr("href");

					var etat_sig_font = $(this).find("td:nth-child(5)").attr("style");
					var etat_sig = $(this).find("td:nth-child(5)").text();
					var derniere_note = $(this).find("td:nth-child(6)").text();
					var bloc_sig = derniere_note;

					if ($("td#"+ticket+" a").size() == 0 || $("td#"+ticket+" a").attr("href") == "http://"+serveur+":8083/"+href_SIG ) {

						$("td#"+ticket).html("<a target=_blank>"+etat_sig+"</a>");

						$("td#"+ticket+" a").text("Clos ");
						$("td#"+ticket+" a").attr("href","http://stcweb1.private.sfr.com:8083/"+href_SIG);
						$("td#"+ticket+" a").attr("style",etat_sig_font);
						$("td#"+ticket+" a").attr("title",ticket+"|"+derniere_note);
						$("td#"+ticket+" a").attr("class","cluetip");
						$("td#"+ticket+" a").attr("id",id_sig);

						GM_xmlhttpRequest({
						    method: "GET",
						    url: "http://"+serveur+":8083/"+href_SIG,
						    onload: function(response) { 
						      var codeHTML = response.responseText;

						      bloc_sig = $(codeHTML).find("table.sig").html();

						      $("td#"+ticket+" a").attr("title",ticket+" - "+sig+"|<table>"+bloc_sig+"</table");
						      $('a.cluetip').cluetip({width: '800px', splitTitle: '|'});
						    }
						});

						var MyPoubelle = '<img id="poubelle'+id_sig+'" alt="supprimer" src="img/poubelle.gif">';

						$(MyPoubelle).insertAfter("td#"+ticket+" a");

						$("img#poubelle"+id_sig).click(function(){
						    SupprSig(id_sig,ticket);
						    // $(this).slideUp(500,"swing").slideDown(500,"swing");
						})

					}
					else{
						// $("td#"+ticket+" a").clone().appendTo("td#"+ticket);
						$("<br><a target=_blank>"+etat_sig+" </a>").appendTo("td#"+ticket);

						// $("td#"+ticket+" a:eq(1)").html("<a target=_blank>"+etat_sig+"</a>");
						$("td#"+ticket+" a:eq(1)").text("Clos ");
						$("td#"+ticket+" a:eq(1)").attr("href","http://stcweb1.private.sfr.com:8083/"+href_SIG);
						$("td#"+ticket+" a:eq(1)").attr("style",etat_sig_font);
						$("td#"+ticket+" a:eq(1)").attr("title",ticket+"|"+derniere_note);
						$("td#"+ticket+" a:eq(1)").attr("class","cluetip");
						$("td#"+ticket+" a:eq(1)").attr("id",id_sig);

						GM_xmlhttpRequest({
						    method: "GET",
						    url: "http://"+serveur+":8083/"+href_SIG,
						    onload: function(response) { 
						      var codeHTML = response.responseText;

						      bloc_sig = $(codeHTML).find("table.sig").html();

						      $("td#"+ticket+" a:eq(1)").attr("title",ticket+" - "+sig+"|<table>"+bloc_sig+"</table");
						      $('a.cluetip').cluetip({width: '800px', splitTitle: '|'});
						    }
						});

						var MyPoubelle = '<img id="poubelle'+id_sig+'" alt="supprimer" src="img/poubelle.gif">';
						$(MyPoubelle).insertAfter("td#"+ticket+" a:eq(1)");

						$("img#poubelle"+id_sig).click(function(){
						    SupprSig(id_sig,ticket);
						    // $(this).slideUp(500,"swing").slideDown(500,"swing");
						})
					}
				});
			}
			
			// $('a.cluetip').cluetip({splitTitle: '|'});  // fait apres les GM trop lent
		}
	});
}

function RefreshAllSig(){
	GM_xmlhttpRequest({
		method: "POST",
      	url: "http://"+serveur+":8083/action.php",
      	data: "action=refreshAllSignalisationsUser&encara="+U_Encara,
      	headers: {"Content-Type": "application/x-www-form-urlencoded"}
    });
    window.setTimeout(function(){Get_Info_WTFT()}, 5577);
}

function SupprSig(id_sig,ticket,pos) {
	// alert("sig "+id_sig+" supprimée");
	GM_xmlhttpRequest({
		method: "POST",
      	url: "http://"+serveur+":8083/action.php",
      	data: "action=deleteSig&encara="+U_Encara+"&id_sig="+id_sig,
      	headers: {"Content-Type": "application/x-www-form-urlencoded"}
    });
    $("td#"+ticket+" a#"+id_sig).remove();
    $("img#poubelle"+id_sig).slideUp(1000,"swing").slideDown(1000,"swing");
    window.setTimeout(function(){$("img#poubelle"+id_sig).remove()}, 2000);
}

function AddSig(new_sig) {
	// alert("sig "+new_sig+" ajoutée");

	var myrexp = new RegExp("^S[0-9]{9}$|^[0-9]{10}$", "g");
	if(!new_sig.match(myrexp)) {
		alert("mauvais format de sig");
	}
	else {
		GM_xmlhttpRequest({
			method: "POST",
	      	url: "http://"+serveur+":8083/action.php",
	      	data: "action=insertSig&num_sig="+new_sig,
	      	headers: {"Content-Type": "application/x-www-form-urlencoded"}
	    });
	    $("#insert_numero_sig").val("");
	}
	window.setTimeout(function(){Get_Info_WTFT()}, 557);
}


Generate_RSS();
setInterval(Generate_RSS,300000);

GM_registerMenuCommand("Flux RSS 1", Set_Flux_Rss_1);
GM_registerMenuCommand("Flux RSS 2", Set_Flux_Rss_2);
GM_registerMenuCommand("Flux RSS 3", Set_Flux_Rss_3);
GM_registerMenuCommand("Supprimer RSS 1", Del_Flux_Rss_1);
GM_registerMenuCommand("Supprimer RSS 2", Del_Flux_Rss_2);
GM_registerMenuCommand("Supprimer RSS 3", Del_Flux_Rss_3);


function Generate_RSS(){

	// console.log("ok");

	$("div#RSS").remove();

	$("<div id='RSS'></div>").appendTo("div#content");

	Add_RSS(GM_getValue("RSS1"),"1");  // http://www.lequipe.fr/rss/actu_rss_Football.xml
	Add_RSS(GM_getValue("RSS2"),"2");  // http://xbmc.org/feed/
	Add_RSS(GM_getValue("RSS3"),"3");  // http://openelec.tv/index.php/news?format=feed&type=rss
}

function Add_RSS(url,id){

	var max_rss = 10;
	var count_rss = 0;
	var div_id = "divRss"+id;
	var date ='';
	var heure ='';
	var entry_rss = '';
	var Limit_Description = 144;

	$("<div id='"+div_id+"' class='container'></div>").appendTo("div#RSS");
	GM_addStyle (".container{display:table-cell; width:30%}");

	GM_xmlhttpRequest({
		method: "GET",
      	url: url,
      	onload: function(response) { 

      		var codeXML = response.responseText;
      		var xmlparse = $.parseXML(codeXML);
      		$xml = $(xmlparse);

      		$xml.find("item").each(function(){

      			count_rss++;

      			if (count_rss <= max_rss ) {

	      			var title = $(this).find("title").text();
	      			var link = $(this).find("link").text();
	      			var description = $(this).find("description").text();
	      			var pubDate = $(this).find("pubDate").text();
	      			var image_url = $(this).find("enclosure").attr("url");
	      			console.log(this);
	      			// console.log(link);

	      			if (Limit_Description > 0 && description.length > Limit_Description) {

		      			description = description.substr(0, Limit_Description);
		      			description = description+"...";
	      			}

                    entry_rss += '<li><div class="itemTitle"><a href="' + link + '" target="_blank" >' + title + "</a></div>";
                    date = new Date(pubDate);
                    // entry_rss += '<div class="itemDate">' + date.toLocaleDateString() +" "+ date.toLocaleTimeString()+"</div>";
                    entry_rss += '<div class="itemDate">' + date.toLocaleString() +"</div>";
                    entry_rss += '<div class="itemContent">' + description + "</div>";
                    entry_rss += '<img src=' + image_url + ' height="42px">';
      			}

      		});

      		$("#" + div_id).append('<ul class="feedEkList">' + entry_rss + "</ul>");

      	}
      });

  // GM_addStyle (".feedEkList{width:450px; list-style:none outside none;background-color:#FFFFFF; border:1px solid #D3CAD7; padding:4px 6px; color:#3E3E3E;}");
  GM_addStyle (".feedEkList{list-style:none outside none;background-color:#FFFFFF; border:1px solid #D3CAD7; padding:4px 6px; color:#3E3E3E;}");
  GM_addStyle (".feedEkList li{border-bottom:1px solid #D3CAD7; padding:5px;}");
  GM_addStyle (".feedEkList li:last-child{border-bottom:none;}");
  GM_addStyle (".itemTitle a{font-weight:bold; color:#8B0000 !important; text-decoration:none }");
  GM_addStyle (".itemTitle a:hover{ text-decoration:underline }");
  GM_addStyle (".itemDate{font-size:11px;color:#AAAAAA;}");
}

function Set_Flux_Rss_1(){

  var url_rss_1 = prompt("Renseignez l'url du flux RSS en XML","");
  GM_setValue("RSS1",url_rss_1);
  Generate_RSS();
}

function Set_Flux_Rss_2(){

  var url_rss_2 = prompt("Renseignez l'url du flux RSS en XML","");
  GM_setValue("RSS2",url_rss_2);
  Generate_RSS();
}

function Set_Flux_Rss_3(){

  var url_rss_3 = prompt("Renseignez l'url du flux RSS en XML","");
  GM_setValue("RSS3",url_rss_3);
  Generate_RSS();
}

function Del_Flux_Rss_1(){
  GM_deleteValue("RSS1");
  Generate_RSS();
}

function Del_Flux_Rss_2(){
  GM_deleteValue("RSS2");
  Generate_RSS();
}

function Del_Flux_Rss_3(){
  GM_deleteValue("RSS3");
  Generate_RSS();
}