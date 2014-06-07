// ==UserScript==
// @name          PlaningVGates sur Userscript
// @namespace     PlaningVGates sur Userscript
// @version       4.8
// @updateURL     https://userscripts.org/scripts/source/139884.meta.js
// @downloadURL   https://userscripts.org/scripts/source/139884.user.js
// @description   script sur le serveur
// @include     http://stcweb*.private.sfr.com:8108/planning_v1/index.php?planning=bdx_data
// @include     http://stcweb*.private.sfr.com:8108/?action=&annee=*&mois=*&equipe=perso&id=&id2=*
// @include     http://stcweb*.private.sfr.com:8108/index.php?planning=bdx_data
// @include     http://stcweb*.private.sfr.com:8108/?annee=*&mois=*&equipe=perso&id2=&action=&id=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


// @updateURL     https://intranetstc-dev.private.sfr.com:8114/Planning_vGates.meta.js
// @downloadURL   https://intranetstc-dev.private.sfr.com:8114/Planning_vGates.user.js


// @updateURL     https://userscripts.org/scripts/source/139884.meta.js
// @downloadURL   https://userscripts.org/scripts/source/139884.user.js
	

var serveur = window.location.hostname;

var menu_PlaniSFR = '<a target=_blank href="http://planisfr:8080/index.asp"> PlaniSFR</a>';

// alert(GM_listValues());

MEP_PlaniSFR();
MEP_PLUS_1();
MEP_GoAnnee();

var annee_selectionnee = $("select#annee").val();
var mois_selectionne = $("select#mois").val();

var Tab_JI = new Array();

$("#ligne_jour").attr("name","vGates");
$("#ligne_jour").attr("id",1);

Tab_JI[3] = 0 ;
$('#1 a:contains("I")').each(function(){
	Tab_JI[3]++;
})
// alert( Tab_JI[parseInt(mois_selectionne)]);

var i = 1;
var loop2M = 0 ;

RequestMonth(1);
RequestMonth(2);
// RequestMonth(3);
// RequestMonth(4);
// RequestMonth(5);

Request_Indispo_2Mois(1);
Request_Indispo_2Mois(2);


function Calcul_TR(){

	$("table[name='vGates']").each(function(){
		
		var count_I = count_R = JO = JT = TR = 0;
		var Nbr_J_Dans_M = $(this).find('tr:eq(2) th:last-child').text();

		$(this).find('a:contains("I")').each(function(){
			count_I = count_I+1;
		})

		$(this).find("td[class^='code_14']").each(function(){
			count_R = count_R+1;
		})
		
		// var ID_Mois = $(this).attr("id");
		// // if (ID_Mois < 10) {ID_Mois = '0'+ID_Mois; };
		var Nbr_I_M2 = Tab_JI[$(this).attr("id")];

		JO = Nbr_J_Dans_M - count_R;
		JT = JO - count_I;
		TR = JO - Nbr_I_M2;

		// $(this).find('tr:eq(2) td:nth-child(1)').text("I:"+count_I+" J:"+Nbr_J_Dans_M+" R:"+count_R+" JO:"+JO+" JT:"+JT);

		$(this).find('tr:eq(2) td:nth-child(1)').text("I:"+count_I+" TR= "+JO+"-"+Nbr_I_M2+" = "+TR);

	})
}

function Request_Indispo_2Mois(m){

	loop2M = loop2M + 1 ;

	Tab_JI[m]=0;

	var M = parseInt(mois_selectionne);
	var A = parseInt(annee_selectionnee);

	// alert(M-m);

	if (M-m > 0 && M-m < 10) { M = '0'+M-m ; };  //alert("0-9");
	if (M-m == 10 || M-m == 11) { M = M-m; };  // alert("10 ou 11");
	if (M-m == 0) { A = A-1 ; M = 11; };  // alert("11");
	if (M-m == -1) { A = A-1 ; M = 12; };  // alert("12");


	GM_xmlhttpRequest({
	    method: "GET",
	    url: 'http://'+serveur+':8108/?action=&annee='+A+'&mois='+M+'&equipe=perso&id=&id2=&page=undefined',
	    onload: function(response) { 
			var codeHTML = response.responseText;

		    $(codeHTML).find('#ligne_jour a:contains("I")').each(function(){
		    	Tab_JI[m]++;
		    })

		    // alert("Année "+A+" - Mois "+M+" - m "+m+" - Indispo "+Tab_JI[m]);

		    if (loop2M == 2) { MEP_Calcul_TR();};
		}
	});
}

function RequestMonth(NbrMois) {

	i = i+1;

	var M = parseInt(mois_selectionne)+NbrMois;
	var A = parseInt(annee_selectionnee);

	if (M < 10) {M = '0'+M; };

	if (M > 12) {
		M = M-12;
		M = '0'+M;
		A = A+1;
	}

	Tab_JI[NbrMois+3]=0;

	GM_xmlhttpRequest({
	    method: "GET",
	    url: 'http://'+serveur+':8108/?action=&annee='+A+'&mois='+M+'&equipe=perso&id=&id2=&page=undefined',
	    onload: function(response) { 
			var codeHTML = response.responseText;

		    var mois = $(codeHTML).find('#ligne_jour');

		    $(codeHTML).find('#ligne_jour a:contains("I")').each(function(){
		    	Tab_JI[NbrMois+3]++;
		    })

		    // alert(Tab_JI[M]);
		    var ID_Mois= NbrMois+1 ; 

		    var tableau = '';
		    tableau += '<table id='+ID_Mois+' name=\'vGates\' class=\'tableXml\' cellspacing=\'0\' cellpadding=\'0\' style=\'border-collapse:collapse\'>';
		    tableau += mois.html();
		    tableau += '</table>';

		    MEP_Planning(tableau,NbrMois);
		}
	});
}

function Completion() {

	for (;i<12;) {RequestMonth(i);}		
}

function MEP_Planning(tableau,NbrMois) {
	var posY = 240;
	posY = posY+160*NbrMois;

	$("<div>"+tableau+"</div>")
		.css({
	      "top" : posY+"px", "left" : "0px",
	      "position" : "absolute", "padding" : "10px"
      	})
		.appendTo("body");

	// charge_css();
	unsafeWindow.charge_css();
}

function MEP_PLUS_1() {
  	$("<div id=plus1><b><font size=5>+1</font></b></div>")
      .css({
      "top" : "140px", "left" : "400px",
      "position" : "absolute", "padding" : "10px"
      })
      .appendTo("body");

	$("div#plus1").click(function(){
      $(this).slideUp(500,"swing").slideDown(500,"swing");
      RequestMonth(i);
  	})
}

function MEP_Calcul_TR() {
  	$("<div id=CTR><b><font size=5>TR</font></b></div>")
      .css({
      "top" : "140px", "left" : "330px",
      "position" : "absolute", "padding" : "10px"
      })
      .appendTo("body");

	$("div#CTR").click(function(){
      $(this).slideUp(500,"swing").slideDown(500,"swing");
      Calcul_TR();
  	})
}

function MEP_GoAnnee() {
  var menu_MEP = '<b><font size=5>+Annee</font></b>';
  menuobj = document.createElement('div');
  menuobj.id = 'goAnnee';
  menuobj.style.position = 'absolute';
  menuobj.style.top = '140px';
  menuobj.style.left = '470px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '##fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);

  document.getElementById("goAnnee").onclick=function(){Completion()};
}

function MEP_PlaniSFR() {
  var menu_MEP = '<b><font color="#FFFFFF" size=5>'+menu_PlaniSFR+'</font></b>';
  // color violet F7F9FA
  menuobj = document.createElement('div');
  menuobj.style.position = 'absolute';
  menuobj.style.top = '140px';
  menuobj.style.left = '600px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  //menuobj.style.textShadow = "2px 2px #000000";
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

var old_charge_css = unsafeWindow.charge_css();
