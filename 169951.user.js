// ==UserScript==
// @name        iRix - itix plugins [R]
// @namespace   http://itix.nl/beheer/reserveren
// @description Vergemakkelijkt reserveren in Itix op dnk.nl (Reserveren)
// @include     http://dnk.nl/beheer*
// @include     http://www.dnk.nl/beheer*
// @version     1.7.1.2
// @downloadURL https://userscripts.org/scripts/source/169951.user.js
// @updateURL   https://userscripts.org/scripts/source/169951.meta.js
// @icon        http://www.dnk.nl/favicon.png
// ==/UserScript==

	
//////Prijsdef
//MaDiWoDo
var prijs_1_1=17;
var prijs_1_2=-1; //Altijd -1
var prijs_1_3="MaDiWoDo Bon";
var prijs_1_4=4.6;
var prijs_1_5="false";
//KolkBios
var prijs_2_1=25;
var prijs_2_2=-1; //Altijd -1
var prijs_2_3="KolkBiosBon";
var prijs_2_4=7;
var prijs_2_5="false";
//Yankee
var prijs_3_1=26;
var prijs_3_2=-1; //Altijd -1
var prijs_3_3="Yankee Doodle";
var prijs_3_4=6.5;
var prijs_3_5="false";
//VB
var prijs_4_1=27;
var prijs_4_2=-1; //Altijd -1
var prijs_4_3="VB Pas Bioscoop";
var prijs_4_4=5;
var prijs_4_5="false";
//Postcode loterij
var prijs_5_1=43;
var prijs_5_2=-1; //Altijd -1
var prijs_5_3="Postcode Loterij";
var prijs_5_4=7.8;
var prijs_5_5="false";
//Mantelzorg
var prijs_6_1=23;
var prijs_6_2=-1; //Altijd -1
var prijs_6_3="Mantelzorg Bon";
var prijs_6_4=3.5;
var prijs_6_5="false";
//DNK biosbon
var prijs_7_1=24;
var prijs_7_2=-1; //Altijd -1
var prijs_7_3="DNK BioscoopBon";
var prijs_7_4=0;
var prijs_7_5=0;
//Nat. Film.
var prijs_8_1=28;
var prijs_8_2=-1; //Altijd -1
var prijs_8_3="Nationale Filmbon";
var prijs_8_4=7.8;
var prijs_8_5="false";
//DNK DNK Bedrijfskaart
var prijs_9_1=49;
var prijs_9_2=-1; //Altijd -1
var prijs_9_3="DNK Bedrijfskaart";
var prijs_9_4=7;
var prijs_9_5="false";
//Nationale filmbon EPIC
var prijs_10_1=54;
var prijs_10_2=-1; //Altijd -1
var prijs_10_3="Nationale Filmbon";
var prijs_10_4=10.3;
var prijs_10_5="false";
//Strippenkaart Filmfestival
var prijs_11_1=87;
var prijs_11_2=-1; //Altijd -1
var prijs_11_3="Strippenkaart Filmfestival";
var prijs_11_4=7;
var prijs_11_5="false";
//Strippenkaart Filmfestival
var prijs_12_1=93;
var prijs_12_2=-1; //Altijd -1
var prijs_12_3="Strippenkaart Sneak";
var prijs_12_4=6;
var prijs_12_5="false";

//Buffer
var prijs_b_2=-1; //altijd -1
var prijs_b_4=0;  //Altijd 0


/*if(document.URL=="http://www.dnk.nl/beheer/login"||document.URL=="http://dnk.nl/beheer/login"){
	document.getElementById("content").innerHTML=document.getElementById("content").innerHTML+"<div class=\"mainOuter\" style=\"top: 436px;\">	<div class=\"windowHeaderLeft\"></div>	<div class=\"windowTitle windowFocus\" style=\"cursor:default\"><span class=\"windowTextTitle\">iRix Plugins</span></div>	<div class=\"windowHeaderRight\"></div>	<div class=\"mainInner\">		<p>Itix maakt op deze computer gebruik van de iRix plugins.<br>Deze modules zijn geladen:<br><br><lu><li title=\"Maakt het verkopen van tickets voor voorstellingen die vandaag draaien overzichtelijker\">Snelverkoop</li><li title=\"Geeft voorstellingen die geweest zijn of vandaag draaien een andere kleur\">Overzichtelijker dagkalender</li></lu><br><br><span id=\"nh\" style=\"opacity: 0.25;\">Deze plugins zijn geschreven en aangeboden door Rick Ijkema.</span></p>	</div>	<div class=\"windowFooter\">		<div class=\"windowFooterLeft\"></div>		<div class=\"windowFooterCenter\"></div>		<div class=\"windowFooterRight\"></div>	</div></div>";
	document.getElementById("nh").onmouseover=function(){
		$("span#nh").css("opacity", "0.75");};
	document.getElementById("nh").onmouseout=function(){
		$("span#nh").css("opacity", "0.25");};}*/

var timeN = new Date();
var buttonLi = document.createElement('li');
var parentLi = document.getElementById("userMenu").firstElementChild;
var firstLi = parentLi.firstElementChild;

var today;
var first;
var timeNext;
var timeRun=false;
var recoloring=false;

var plat_val=0;
var plat_check=false;

function timeCheck(){
	timeN = new Date();
	if($("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").attr("data-type")!="voorstelling"){
		if(today){
			if(timeN>timeNext){
				$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film").removeAttr("autoano");
				recolor();}}}
	else recolor();
	setTimeout(function(){timeCheck();}, 500);}

document.getElementById("versienummer").innerHTML=document.getElementById("versienummer").innerHTML+"<br>iRix versie 1.7.1";
document.getElementById("versienummer").style.top="55px";

function recolor(){
	$("div#window_voorstellingen_reservering div.calendar_right").scrollLeft(284);
	var timeC = new Date(timeN.valueOf());
	var allHtml;
	var thisTimeH;
	var thisTimeM
	allHtml = $("div#window_voorstellingen_reservering input#voorstellingen_reservering_kalender_date").val();
	timeC.setFullYear(allHtml.substr(0,4));
	timeC.setMonth(allHtml.substr(5,2)-1);
	timeC.setDate(allHtml.substr(8,2));
	today=false;
	if(timeC<timeN){
		$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film").css("background-color", "#750808");
		$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film").attr("autoano", "1");}
	else if(timeC>timeN){
		$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film").css("background-color", "#025D8C");
		$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film").attr("autoano", "3");}
	else{
		today=true;
		first=true;
		while(true){
			if($("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").attr("data-type")!="voorstelling")break;
			allHtml=$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").html();
			thisTimeH=parseInt(allHtml.substr(allHtml.search("<br>")-5,2));
			thisTimeM=parseInt(allHtml.substr(allHtml.search("<br>")-2,2))+7;
			timeC.setHours(thisTimeH);
			timeC.setMinutes(thisTimeM,0,0);
			$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").attr("today", "true");
			allHtml="";
			if(timeC>=timeN){
				if(first){
					timeNext=new Date(timeC.valueOf());
					first=false;}
				$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").css("background-color", "#08755C");
				$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").attr("autoano", "2");}
			else {
				$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").css("background-color", "#750808");
				$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film:not([autoano]):first").attr("autoano", "1");}}}}

buttonLi.innerHTML= "<a id=\"userMenu_autoAno\" class=\"link userMenuItem\" style=\"color: rgb(82, 139, 177); padding-right: 10px; padding-top: 7px; size: 8px; text-indent: 0px; height: 18px;\"><span style=\"display: block; float: left; font-size: 18px; margin-top: -4px; padding-right: 3px;\">&#9744</span> iRix</a>";

function doPlatChange(){
	if($("div#window_voorstellingboeking_nieuw").attr("autoano")!="true")return;
	if($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_anonieme_verkoop").is(":checked"))return;
	var newval=parseInt($("input#voorstellingboeking_nieuw_aantal_personen_1_68_0").val());
	if(newval!=plat_val){
        var tel_val=parseInt($("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").val());
	    $("input#voorstellingboeking_nieuw_aantal_personen_1_68_0").val(0);
    	$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").val(newval+tel_val);
		$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").focus();
		$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").select();}
    else setTimeout(function(){doPlatChange();}, 500);}

buttonLi.onclick=function(){
	$("div#window_voorstellingen_reservering div.calendar_right").scrollLeft(284);
	$("div#window_voorstellingen_reservering").css("top", "0px");
	$("a#userMenu_slider:not(.active)").trigger("click");
	buttonLi.ondblclick=function(){
		if(confirm("Plugin iRix uitschakelen?\n\nAlle geopende schermen zullen worden gesloten.")==true){
			window.onbeforeunload="";
			location.reload();}};
	if(timeRun==false){
		timeCheck();
		timeRun=true;}
	else return;
	document.onkeypress=function(e){
		if(e.keyCode==115){
			var resnr=parseInt(prompt("Reserveringsnummer:"));
			if(!(resnr>0))return;
			$("ul#ulSubSubMenu_reserveren a[href='reserveringen']").trigger("click");
			function resnwloaded(){
				if($("div#window_reserveringen div#window_reserveringen_content input#reserveringen_resnummer").attr("class")=="zoek_reservering"){
					$("div#window_reserveringen div#window_reserveringen_content input#reserveringen_resnummer").val(resnr);
					$("div#window_reserveringen div#window_reserveringen_content input#zoek_reserveringen").trigger("click");
					function checkResults(){
						if($("div#window_reserveringen div#window_reserveringen_content div.overlay_zoeken").attr("class")=="overlay_zoeken")setTimeout(function(){checkResults();},100);
						else if($("div#window_reserveringen table#tabel_reserveringen tbody tr.odd:first").attr("class")=="odd"){
							if($("div#window_reserveringen table#tabel_reserveringen tbody tr.even:first").attr("class")=="even");
							else{
								$("div#window_reserveringen table#tabel_reserveringen tbody tr.odd:first td:first").trigger("click");
								$("div#window_reserveringen div.windowButtonClose").trigger("click");}}
						else{
							$("div#window_reserveringen div.windowButtonClose").trigger("click");
							alert("Reservering niet gevonden.\nNummer: "+resnr);}}
					setTimeout(function(){checkResults();},100);}
				else setTimeout(function(){resnwloaded();},100);}
			setTimeout(function(){resnwloaded();},100);}
		else if(e.keyCode==119){
			$("ul#ulSubSubMenu_informatie a[href='voorstellinguitvoeringinfo']").trigger("click");}};
	$("ul#ulSubSubMenu_informatie a[href='voorstellinguitvoeringinfo']").click(function(){
		function checkInfoWindowReady(){
			if($("div#window_voorstellingen_uitvoeringinfo input#voorstellingen_uitvoeringinfo_einddatum").attr("class")=="zoek_voorstelling_uitvoeringinfo datefield"){
				$("div#window_voorstellingen_uitvoeringinfo select#voorstellingen_uitvoeringinfo_categorie").val("film");
				$("div#window_voorstellingen_uitvoeringinfo input#voorstellingen_uitvoeringinfo_begindatum").val(timeN.getDate()+"-"+(timeN.getMonth()+1)+"-"+timeN.getFullYear());
				$("div#window_voorstellingen_uitvoeringinfo input#voorstellingen_uitvoeringinfo_einddatum").val((timeN.getDate())+"-"+(timeN.getMonth()+1)+"-"+timeN.getFullYear());
				$("div#window_voorstellingen_uitvoeringinfo input#zoek_voorstellingen_uitvoeringinfo").trigger("click");
				function refreshInfo(){
				    if($("div#window_voorstellingen_uitvoeringinfo input#voorstellingen_uitvoeringinfo_einddatum").attr("class")=="zoek_voorstelling_uitvoeringinfo datefield"){
				        $("div#window_voorstellingen_uitvoeringinfo input#zoek_voorstellingen_uitvoeringinfo").trigger("click");
				        setTimeout(function(){refreshInfo();},30000);}}
			    refreshInfo();}
			else setTimeout(function(){checkInfoWindowReady();},100);}
		checkInfoWindowReady();});
	$("div#window_voorstellingen_uitvoeringinfo input#zoek_voorstellingen_uitvoeringinfo").live("click", function(){
		var curPage=parseInt($("div#window_voorstellingen_uitvoeringinfo div.huidige_pagina b").html().substr(7).split("/")[0]);
		if (curPage==1)return;
		function waitReloaded(){
			if($("div#window_voorstellingen_uitvoeringinfo div.overlay_zoeken").attr("class")=="overlay_zoeken")setTimeout(function(){waitReloaded();},100);
			else{
				if(curPage>parseInt($("div#window_voorstellingen_uitvoeringinfo input#voorstellingen_uitvoeringinfo_pagina_max").val()))return;
				var tempPage=1;
				function nextPage(){
					if($("div#window_voorstellingen_uitvoeringinfo input#voorstellingen_uitvoeringinfo_pagina").val()==tempPage){
						if(curPage>tempPage){
							$("div#window_voorstellingen_uitvoeringinfo div#voorstellingen_uitvoeringinfo_volgende img").trigger("click");
							tempPage++;
							setTimeout(function(){nextPage();},100);}}
					else setTimeout(function(){nextPage();},50);}
				nextPage();}}
		waitReloaded();});
	$("a#userMenu_autoAno span").html("&#9745");
	$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_anonieme_verkoop").live("change", function(){
		$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_extra_kosten").hide();
		$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_printer_box").hide();
		if($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_anonieme_verkoop").is(":checked")){
			$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_submit").prop("value", "VERKOPEN");
			$("input#voorstellingboeking_nieuw_aantal_personen_1_68_0").focus();
			$("input#voorstellingboeking_nieuw_aantal_personen_1_68_0").select();}
		else{
			$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_submit").prop("value", "RESERVEREN");
			$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").focus();
			$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").select();};});
	$("div#window_voorstellingen_reservering .link.reserveer_voorstelling.categorie_film").live("click", function(){
		var autoano = $(this).attr("autoano");
		if(autoano==1)alert("Deze voorstelling is al begonnen!");
		if($(this).attr("today")!="true"){
			$("div#window_voorstellingen_reservering img#voorstellingen_reservering_kalender_newdate").attr("data-datetime", timeN.getFullYear()+"-"+(timeN.getMonth()+1)+"-"+timeN.getDate()+" 00:00:00");
			$("div#window_voorstellingen_reservering img#voorstellingen_reservering_kalender_newdate").trigger("click");}
		function adjustRes(){
			if($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").attr("class")=="input_check"){
				if($("div#window_voorstellingboeking_nieuw[autoano]").attr("class")=="window menutab_3")return;
				else $("div#window_voorstellingboeking_nieuw").attr("autoano", true);
				prijs_1_2=-1;
				prijs_2_2=-1;
				prijs_3_2=-1;
				prijs_4_2=-1;
				prijs_5_2=-1;
				prijs_6_2=-1;
				prijs_7_2=-1;
				prijs_8_2=-1;
				prijs_9_2=-1;
				prijs_10_2=-1;
				prijs_11_2=-1;
				prijs_12_2=-1;
				prijs_b_2=1;
				
				
				$("div#window_voorstellingboeking_nieuw span#voorstellingboeking_nieuw_item_delete").hide();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset:first p:first").append("<select id=\"voorstellingboeking_nieuw_betaalwijze_0_overlay\" class=\"input_check\" name=\"skipme\">"+$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").html()+"</select>");
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").hide();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").change(function(){
				    $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").val($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").val());
					$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").trigger("change");});
				
				
				$("div#window_voorstellingboeking_nieuw").css("top", "0px");
				
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_reservering_opties> :nth-child(1)").hide();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_reservering_opties> :nth-child(2)").hide();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_reservering_opties> :nth-child(9)").hide();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_reservering_opties> :nth-child(12)").hide();
				$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_bereken_reserveringskosten").prop("checked", false);
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_optietijd_box p").hide();
				$("div#window_voorstellingboeking_nieuw select#voorstellingboeking_nieuw_reserveerstatus").hide();
				$("div#window_voorstellingboeking_nieuw select#voorstellingboeking_nieuw_reserveerstatus").parent().find("label").hide();
				

				$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_submit").prop("value", "RESERVEREN");
				//if(autoano==1||autoano==2)$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_anonieme_verkoop").trigger("click");
				$("div#window_voorstellingboeking_nieuw select#voorstellingboeking_nieuw_reserveerstatus").val("optie");
				$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_voorstelling_titel_0").attr("disabled", "");
				$("div#window_voorstellingboeking_nieuw img#voorstellingboeking_nieuw_select_voorstelling_0").hide();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_voorstelling_prijsinfo_0").css("max-height", "75px");
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_voorstelling_prijsinfo_0").css("overflow", "auto");
				if($("div#window_voorstellingboeking_nieuw a#voorstellingboeking_nieuw_voorstelling_prijsinfo_0_exp").attr("class")!="link")$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_voorstelling_rangholder_1_box_0").append("<a id=\"voorstellingboeking_nieuw_voorstelling_prijsinfo_0_exp\" style=\"position: relative; display: block; height: 0px; bottom: 19px; right: -646px; background-color: #E2F0F8;\" class=\"link\">Uitvouwen »</a>");
				
				$("div#window_voorstellingboeking_nieuw a#voorstellingboeking_nieuw_voorstelling_prijsinfo_0_exp").click(function(){
					$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_voorstelling_prijsinfo_0").css("max-height", "none");
					$("div#window_voorstellingboeking_nieuw a#voorstellingboeking_nieuw_voorstelling_prijsinfo_0_exp").hide();});

				$("<input id=\"voorstellingboeking_nieuw_betaalwijze_0_contant\"type=\"button\" value=\"Contant\" style=\"width: 149px; height: 30px; margin-top: 3px;\"><input id=\"voorstellingboeking_nieuw_betaalwijze_0_pin\" type=\"button\" value=\"Pin\" style=\"width: 148px; height:30px; margin-top: 3px;\"><input id=\"voorstellingboeking_nieuw_betaalwijze_0_nbon\" type=\"button\" value=\"Nationale Bioscoopbon\" style=\"width: 148px; height:30px; margin-top: 3px;\">").insertBefore($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0"));
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field:first label.label_lang:first").css("padding-top", "45px");
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_betaalwijze_0_contant").click(function(){
				    $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").val("contant");
				    $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").trigger("change");});
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_betaalwijze_0_pin").click(function(){
				    $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").val("pin");
				    $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").trigger("change");});
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_betaalwijze_0_nbon").click(function(){
					var nnbonv=parseFloat(prompt("Bedrag:").replace(",","."));
					if(nnbonv!=null&&nnbonv>0){
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").val("Nationale bioscoop bon");
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").val((nnbonv.toFixed(2)+"").replace(".",","));
						var nnbonl=parseFloat($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field:last input:last").attr("name").substr(7))+1;
						$("div#window_voorstellingboeking_nieuw a#voorstellingboeking_nieuw_deelbetaling").trigger("click");}});
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").change(function(){
					if(parseFloat($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").val())<0){
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").val("contant");
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").trigger("change");}});
				
				var temp = $("div#voorstellingboeking_nieuw_plattegrond_0 a").attr("href");
				$("div#voorstellingboeking_nieuw_plattegrond_0").html('<a class="plattegrond_reservering" href="'+temp+'" id="plat_link">selecteer plaatsen vanuit de plattegrond voor deze voorstelling&nbsp;»</a>');
				$("a#plat_link").click(function(){
					if($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_anonieme_verkoop").is(":checked"))plat_check=false;
					else{
						plat_val=parseInt($("input#voorstellingboeking_nieuw_aantal_personen_1_68_0").val());
						doPlatChange();}});
				
				setTimeout(function(){
					if($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_anonieme_verkoop").is(":checked"))return;
					$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").focus();
					$("input#voorstellingboeking_nieuw_aantal_personen_1_72_0").select();}, 500);
				
				$("div#window_voorstellingboeking_nieuw a#voorstellingboeking_nieuw_deelbetaling").click(function(){
					function addBet(){
						if($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_b_2).attr("class")=="input_check"){
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box h2.detail_subtitel:last").attr("id", "hdbnr"+prijs_b_2);
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field:last").attr("id", "fdbnr"+prijs_b_2);
							prijs_b_3=$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_b_2).val();
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_b_2).val($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").val());
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_b_2).val($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").val());
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").val(prijs_b_3);
							if(prijs_b_3.substr(0,1)=="-"){
							 $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").val("contant");
							 $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay").trigger("change");}
							else $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0").val($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0 option[selected]").val());
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_b_2).attr("disabled","");
                            $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_b_2).after("<input type=\"hidden\" name=\"betaalwijze_"+prijs_b_2+"\" value=\""+$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_b_2).val()+"\">");
                            $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_b_2).attr("readonly","");
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_b_2).css("color", "grey");
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field:last p:first").append("<span betaling=\""+prijs_b_2+"\" id=\"delete_betaling_"+prijs_b_2+"\"style=\"float: right; font-size: 24px; margin: 1px 5px 0px 0px;\" class=\"link\">×</span>");
								$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box span#delete_betaling_"+prijs_b_2).click(function(){
									var delBl=$(this).attr("betaling");
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box h2.detail_subtitel#hdbnr"+delBl).hide();
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field#fdbnr"+delBl).hide();
									var recalcB=parseFloat(($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+delBl).val()).replace(",","."));
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+delBl).val("0,00");
									recalcB+=parseFloat(($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").val()).replace(",","."));
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_0").val((recalcB.toFixed(2)+"").replace(".",","));});
							prijs_b_2++;}
						else setTimeout(function(){addBet();},100);}
					addBet();});
				
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_nieuwitem").trigger("click");
				function setBril1(){
					if($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_voorstelling_titel_1").attr("class")=="text voorstelling_titel voorstellingboeking_clear"){
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1").hide();
						$("<div id=\"voorstellingboeking_nieuw_item_box_bril\" class=\"voorstellingboeking_item_box\"><p><label class=\"label_lang\">3D Brillen:</label><input type=\"text\" class=\"text update_voorstellingboeking voorstellingboeking_clear\" name=\"skipme\" id=\"voorstellingboeking_nieuw_artikel_aantal_bril\" value=\"\"></p><p><label class=\"label_lang\">Subtotaal:</label><input type=\"text\" class=\"text voorstellingboeking_clear\" readonly=\"readonly\" name=\"skipme\" id=\"voorstellingboeking_nieuw_subtotaal_bril\"><span name=\"waarschuwing[1]\" id=\"voorstellingboeking_nieuw_waarschuwing_1\"></span></p></div>").insertBefore($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1"));
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_bril input#voorstellingboeking_nieuw_artikel_aantal_bril").change(function(){
							var old = $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_subtotaal_1").val();
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_artikel_aantal_1").val(parseFloat($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_bril input#voorstellingboeking_nieuw_artikel_aantal_bril").val()).toFixed(2));
							function newSub(){
								if(old==$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_subtotaal_1").val())setTimeout(function(){newSub();} ,100);
								else $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_bril input#voorstellingboeking_nieuw_subtotaal_bril").val($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_subtotaal_1").val());}
							newSub();});
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_boeking_type_1[value=artikel]").trigger("click");
						function setBril2(){
							if($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_artikel_naam_1").attr("class")=="text artikel_titel voorstellingboeking_clear"){
								setBoekingArtikel("voorstellingboeking_nieuw","10","1");
								function setBril3(){
									if($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_1 input#voorstellingboeking_nieuw_artikel_naam_1").val()=="3-D bril"){
										$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_bril input#voorstellingboeking_nieuw_artikel_aantal_bril").val("0");
										$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_item_box_bril input#voorstellingboeking_nieuw_artikel_aantal_bril").trigger("change");}
									else setTimeout(function(){setBril3();},100);}
								setBril3();}
							else setTimeout(function(){setBril2();} ,100)}
						setBril2();}
					else setTimeout(function(){setBril1();},100);}
				setBril1();
				
				function connectPriceChange(prijs_1, prijs_2, prijs_3, prijs_4, prijs_5){
					$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_aantal_personen_1_"+prijs_1+"_0").change(function(){
						if($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_aantal_personen_1_"+prijs_1+"_0").val()=="")$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_aantal_personen_1_"+prijs_1+"_0").val("0");
						if(prijs_2==-1){
							prijs_2=prijs_b_2;
							$("div#window_voorstellingboeking_nieuw a#voorstellingboeking_nieuw_deelbetaling").trigger("click");
							function adjustBet(){
								if($("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_2).attr("class")=="input_check"){
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_2).val(prijs_3);
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box h2.detail_subtitel:last").attr("id", "hdbnr"+prijs_2);
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field:last").attr("id", "fdbnr"+prijs_2);
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_2).attr("disabled","");
                                    $("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_2).after("<input type=\"hidden\" name=\"betaalwijze_"+prijs_2+"\" value=\""+$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_"+prijs_2).val()+"\">");
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_2).attr("readonly","");
									$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_2).css("color", "grey");
									$("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_aantal_personen_1_"+prijs_1+"_0").trigger("change");}
								else setTimeout(function(){adjustBet();},200);}
							prijs_b_2++;
							adjustBet();}
						if(prijs_5=="false")var newPrice=(parseInt($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_aantal_personen_1_"+prijs_1+"_0").val())*prijs_4).toFixed(2);
						else var newPrice=(parseInt($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_aantal_personen_1_"+prijs_1+"_0").val())*parseFloat($("div#window_voorstellingboeking_nieuw input#voorstellingboeking_nieuw_voorstelling_prijs_1_"+prijs_1+"_0").val().substr(2).replace(",",".")+prijs_5)).toFixed(2);
						if(newPrice==null)newPrice=0;
						if(newPrice==0){
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box h2.detail_subtitel#hdbnr"+prijs_2).hide();
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field#fdbnr"+prijs_2).hide();}
						else{
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box h2.detail_subtitel#hdbnr"+prijs_2).show();
							$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box fieldset.input_field#fdbnr"+prijs_2).show();}
						$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box input#voorstellingboeking_nieuw_bedrag_"+prijs_2).val((newPrice+"").replace(".",","));});}

				
				connectPriceChange(prijs_1_1, prijs_1_2, prijs_1_3, prijs_1_4, prijs_1_5); //MaDiWoDo
				connectPriceChange(prijs_2_1, prijs_2_2, prijs_2_3, prijs_2_4, prijs_2_5); //KolkBios
				connectPriceChange(prijs_3_1, prijs_3_2, prijs_3_3, prijs_3_4, prijs_3_5); //Yankee
				connectPriceChange(prijs_4_1, prijs_4_2, prijs_4_3, prijs_4_4, prijs_4_5); //VB
				connectPriceChange(prijs_5_1, prijs_5_2, prijs_5_3, prijs_5_4, prijs_5_5); //Postcode loterij
				connectPriceChange(prijs_6_1, prijs_6_2, prijs_6_3, prijs_6_4, prijs_6_5); //Mantelzorg
				connectPriceChange(prijs_7_1, prijs_7_2, prijs_7_3, prijs_7_4, prijs_7_5); //DNK biosbon
				connectPriceChange(prijs_8_1, prijs_8_2, prijs_8_3, prijs_8_4, prijs_8_5); //Nat. Film
				connectPriceChange(prijs_9_1, prijs_9_2, prijs_9_3, prijs_9_4, prijs_9_5); //DNK DNK Bedrijfskaart
				connectPriceChange(prijs_10_1, prijs_10_2, prijs_10_3, prijs_10_4, prijs_10_5); //Nat. Film EPIC
				connectPriceChange(prijs_11_1, prijs_11_2, prijs_11_3, prijs_11_4, prijs_11_5); //Strippenkaart FF
				connectPriceChange(prijs_12_1, prijs_12_2, prijs_12_3, prijs_12_4, prijs_12_5); //Strippenkaart Sneak
				
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='DNK Theater Cadeaubon ']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='DNK Theater Cadeaubon BTW']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='KolkBiosBon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='MaDiWoDo Bon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Mantelzorg Bon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Nationale bioscoop bon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='op rekening']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='PER BANK']").remove();
//				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Podium Cadeaukaart']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Postcode Loterij']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='theaterbon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='VB Pas Bioscoop']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='VB Pas Theater']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Yankee Doodle']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Nationale Filmbon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='DNK Bedrijfskaart']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='DNK BioscoopBon']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='gratis']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Cultuurkaart']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='correctie']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Strippenkaart Filmfestival']").remove();
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='Strippenkaart Sneak']").remove();
//				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_betaling_box select#voorstellingboeking_nieuw_betaalwijze_0_overlay option[value='']").remove();
				
				$("div#window_voorstellingboeking_nieuw div#voorstellingboeking_nieuw_nieuwitem").css("margin-left", "600px");}
			else setTimeout(function(){adjustRes();}, 200);}
		adjustRes();});
	
	$("div[id^=window_reservering_] div.button_container input[name=annuleer_reservering]").live("click", function(){
		var resnr=parseInt($(this).prop("id").substring(12,18));
		if(confirm("Wil je de annuleringskosten direct verwijderen?")){
			setTimeout(function(){$("div#window_reservering_"+resnr+" div.button_container input#reservering_"+resnr+"_verwijder_annuleringskosten").trigger("click");},250);}});
	
	$("div#window_betaling_nieuw form#betaling_nieuw_form input#betaling_nieuw_submit").live("click", function(){
		var resnr=$("div#window_betaling_nieuw form#betaling_nieuw_form input#betaling_nieuw_reservering_id").val();
		if(parseInt($("div#window_betaling_nieuw form#betaling_nieuw_form input#betaling_nieuw_reservering_resterend_bedrag").val())==0){
			if(confirm("Volledig bedrag voldaan.\nAlle kaarten gelijk printen?")==true){
				if($("div#window_reservering_"+resnr).attr("class")!="window menutab_3"){
					alert("Het printen van de kaarten is mislukt.\n\nReserveringsnummer: "+resnr);}
				else {
					var printCount=0;
					function clickPrint(){
						if(printCount==50){
							alert("Het printen van de kaarten is mislukt.\n\nReserveringsnummer: "+resnr);
							return;}
						if($("div#window_reservering_"+resnr+" input#reservering_"+resnr+"_print_reservering").attr("class")=="button printbutton"){
							setTimeout(function(){$("div#window_reservering_"+resnr+" input#reservering_"+resnr+"_print_reservering").trigger("click");},500);}
						else{
							printCount++;
							setTimeout(function(){clickPrint()},100);}}
					setTimeout(function(){clickPrint();},2250);
					setTimeout(function(){$("div#window_reservering_"+resnr+" a.tab_ajaxcontent[data-htmlfield=reservering_"+resnr+"_tab_tickets]").trigger("click");},2000);}}}});}


buttonLi.onmouseover=function(){buttonLi.firstElementChild.style.color="white";};
buttonLi.onmouseout=function(){buttonLi.firstElementChild.style.color="rgb(82, 139, 177)";};
parentLi.insertBefore(buttonLi, firstLi);

window.onload=function(){
	if(document.URL=="http://www.dnk.nl/beheer/home"||document.URL=="http://dnk.nl/beheer/home")window.onbeforeunload=function(){return false};
    if(confirm("Wil je de plugin iRix inschakelen?"))$(buttonLi).trigger("click");}
    	