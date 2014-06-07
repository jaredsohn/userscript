// ==UserScript==
// @name        auto_clicker
// @namespace   ikariam
// @description auto_click
// @include        http://s*.ikariam.*/index.php*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==


loc = window.location.toString();
var_auto_t = loc.split('/');

 var_auto_click_enabled = var_auto_t[2];
 server = var_auto_click_enabled;
 
function click_city(){
document.getElementById("js_cityLink").getElementsByTagName("a")[0].click();

}

function is_mission_on_track(){
res=0;
	for (i=0;i<document.getElementsByTagName("div").length;i++){
		if(document.getElementsByTagName("div")[i].getAttribute("class")){
		if(document.getElementsByTagName("div")[i].getAttribute("class")=="ongoingMission capture"){
		res=1;
		}
		}
		
	}
	return res;
}


function is_fortress_loaded(){
	if(document.getElementById("pirateFortress")){
	res=1;
	}
	else{res=0;
	}
return res;
}


function click_mission(){
	for (i=0;i<document.getElementsByTagName("img").length;i++){
		if(document.getElementsByTagName("img")[i]){
			if(document.getElementsByTagName("img")[i].getAttribute("src")){
				if(document.getElementsByTagName("img")[i].getAttribute("src").indexOf(GM_getValue(server+"_index"))!=-1){      //15min
					document.getElementsByTagName("img")[i].parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].click();
			
				}
			}
		}
	}

}


function auto_click(){
window.setTimeout(function() {
	if(window.location.href.indexOf("view=city")<0){
		click_city();
		}else{
		if(is_fortress_loaded()==0){
		document.getElementById("js_CityPosition17Link").click();
		
	   
		}
		if(is_fortress_loaded()==1){
			if(is_mission_on_track()==0){
				
				click_mission();
				setTimeout('click_city()',5000);
			}
			else{
				if(document.getElementById("missionProgressTime").innerHTML=="-"){
				setTimeout('click_city()',5000);
				// window.setTimeout(function() {click_city();},5000);
				}
			}
		}
		else{
		auto_click();
		}
	}
	auto_click();
}, 5000);
}


function get_valeur_actuelle(){

if(GM_getValue(server+"_index")==""){
	return "off";
}
if(GM_getValue(server+"_index")=="2012-11-09_IK_Kaperfahrt_Ruderboot_aktiv.png"){
	return "2m30";
}
if(GM_getValue(server+"_index")=="2012-11-09_IK_Kaperfahrt_Fischerboot_aktiv.png"){
	return "7m30";
}
if(GM_getValue(server+"_index")=="2012-11-09_IK_Kaperfahrt_Weinhaendler_aktiv.png"){
	return "15m";
}
if(GM_getValue(server+"_index")=="2012-11-09_IK_Kaperfahrt_Haendler_aktiv.png"){
	return "30m";
}
if(GM_getValue(server+"_index")=="2012-11-09_IK_Kaperfahrt_leichtes_Kriegsschiff_aktiv.png"){
	return "1h";
}
if(GM_getValue(server+"_index")=="2012-11-09_IK_Kaperfahrt_UBoot_aktiv.png"){
	return "2h";
}


}

if(GM_getValue(var_auto_click_enabled)==1){auto_click();}


style_auto_click = "td.auto_click{";
style_auto_click += "border-top:2px solid black;";
style_auto_click += "border-left:2px solid black;";
style_auto_click += "border-right:2px solid black;";
style_auto_click += "border-bottom:2px solid black;";
style_auto_click += "cursor:pointer";
style_auto_click += "}";
style_auto_click += "td.auto_click:hover{";
style_auto_click += "border-top:3px solid black;";
style_auto_click += "border-left:3px solid black;";
style_auto_click += "border-right:3px solid black;";
style_auto_click += "border-bottom:3px solid black;";
style_auto_click += "cursor:pointer;";
style_auto_click += "}";

style = document.createElement("style");
style.setAttribute("type","text/css");
style.innerHTML=style_auto_click;
document.getElementsByTagName("head")[0].insertBefore(style,document.getElementsByTagName("head")[0].firstChild)

if(GM_getValue(var_auto_click_enabled)==1){
auto_div = document.createElement("div");
auto_div.setAttribute("style","z-index:65112;position:absolute;top:40px;left:750px;width:0px;height:0px;");
auto_div.setAttribute("class","ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
auto_div.setAttribute("id","lanceur");
// var text =  "<table><tr><td class=auto_click style=border-top:solid 2px black;border-left:solid 2px black;border-right:solid 2px black;border-bottom:solid 2px black;>arreter le script</td></tr></table>";

var text = "<table><tr><td  >";
text += "<select id=selection name=selection >";
text += "<option value='0'>"+get_valeur_actuelle()+"</option>";
text += "<option value='0'>off</option>";
 text += "<option value='2m30'>2m30</option>";
 text += "<option value='7m30'>7m30</option>";
 text += "<option value='15m'>15m</option>";
 text += "<option value='30m'>30m</option>";
 text += "<option value='1h'>1h</option>";
 text += "<option value='2h'>2h</option>";
 text += "</select>";
 text += "</td></tr></table>";
auto_div.innerHTML = text;
}
else{
auto_div = document.createElement("div");
auto_div.setAttribute("style","z-index: 65112;position:absolute;top:40px;left:750px;width:0px;height:00px;");
auto_div.setAttribute("class","ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
auto_div.setAttribute("id","lanceur");
// var text =  "<table><tr><td class=auto_click style=border-top:solid 2px black;border-left:solid 2px black;border-right:solid 2px black;border-bottom:solid 2px black;>lancer le script</td></tr></table>";
var text = "<table><tr><td  >";
text += "<select id=selection name=selection >";
text += "<option value='0'>off</option>";
 text += "<option value='2m30'>2m30</option>";
 text += "<option value='7m30'>7m30</option>";
 text += "<option value='15m'>15m</option>";
 text += "<option value='30m'>30m</option>";
 text += "<option value='1h'>1h</option>";
 text += "<option value='2h'>2h</option>";
 text += "</select>";
 text += "</td></tr></table>";

auto_div.innerHTML = text;
}

document.getElementsByTagName("body")[0].insertBefore(auto_div,document.getElementsByTagName("body")[0].firstChild);



document.getElementById("lanceur").addEventListener("change" , function() {
	
	sel = document.getElementById("selection").value;
	
	
	switch (sel){
		case "0" :
			GM_setValue(server+"_index","");
			GM_setValue(var_auto_click_enabled,"0");
			click_city();
			break;
		case "2m30":
			GM_setValue(server+"_index","2012-11-09_IK_Kaperfahrt_Ruderboot_aktiv.png");
			GM_setValue(var_auto_click_enabled,"1");
			auto_click();
			break;
		case "7m30":
			GM_setValue(server+"_index","2012-11-09_IK_Kaperfahrt_Fischerboot_aktiv.png");
			GM_setValue(var_auto_click_enabled,"1");
			auto_click();
			break;
		case "15m":
			GM_setValue(server+"_index","2012-11-09_IK_Kaperfahrt_Weinhaendler_aktiv.png");
			GM_setValue(var_auto_click_enabled,"1");
			auto_click();
			break;
		case "30m":
			GM_setValue(server+"_index","2012-11-09_IK_Kaperfahrt_Haendler_aktiv.png");
			GM_setValue(var_auto_click_enabled,"1");
			auto_click();
			break;
		case "1h":
			GM_setValue(server+"_index","2012-11-09_IK_Kaperfahrt_leichtes_Kriegsschiff_aktiv.png");
			GM_setValue(var_auto_click_enabled,"1");
			auto_click();
			break;
	
		case "2h":
			GM_setValue(server+"_index","2012-11-09_IK_Kaperfahrt_UBoot_aktiv.png");
			GM_setValue(var_auto_click_enabled,"1");
			auto_click();
			break;
	
	};
	


},true);





