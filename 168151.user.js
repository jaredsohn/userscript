// ==UserScript==
// @name        BlockTMS & Confirm Cue
// @namespace   dnk-tms
// @include     http://10.86.210.8:9000/tms/*
// @version     1.8.16
// @downloadURL https://userscripts.org/scripts/source/168151.user.js
// @updateURL   https://userscripts.org/scripts/source/168151.meta.js
// ==/UserScript==
   
var cueCV=false;
var cueCD=false;
var doNotTimeLock=true;   


function ccto(cue, id){
    if(cueCD){
        if(cueCV){
            $("div.tab_body.jq_medium_tab_body[device_id="+id+"] div.config_cue.jq_quick_cue[title='"+cue+"']").trigger("click");}
        $("div#confirmDiv").hide();
        $("div#confirmDivB").hide();}
    else{
        setTimeout(function(){ccto(cue, id);},250);}}

function cueConfirm(zaal, cue, id){
    cueCV=false;
    cueCD=false;
    $("div#confirmDiv span#cue").html(cue);
    $("div#confirmDiv span#znr").html(zaal);
    $("div#confirmDiv").show();
    $("div#confirmDivB").show();
    ccto(cue, id);}

window.onload=function(){
if(window.location.hash=="#monitor_page#medium"){

doNotTimeLock=false;

setTimeout(function(){
    $("div.monitor_device_wrapper div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=quick_cue]").trigger("click");
    $("div.monitor_device_wrapper div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=quick_cue]").trigger("dblclick");

$("div.monitor_medium_device_tabs.jq_tabs ul.tab_headers.jq_tab_headers").hide();
$("div.monitor_medium_device_tabs.jq_tabs div.tab_body.jq_medium_tab_body").css("height", "227px");},5000);}


var divConfirmB=document.createElement("div");
divConfirmB.setAttribute("id", "confirmDivB");
divConfirmB.style.position="fixed";
divConfirmB.style.width="100%";
divConfirmB.style.height="100%";
divConfirmB.style.background="black";
divConfirmB.style.top="0px";
divConfirmB.style.left="0px";
divConfirmB.style.zIndex="5998";
divConfirmB.style.opacity="0.4";

var divConfirm=document.createElement("div");
divConfirm.setAttribute("id", "confirmDiv");
divConfirm.style.position="fixed";
divConfirm.style.border="solid 4px black";
divConfirm.style.width="400px";
divConfirm.style.height="250px";
divConfirm.style.background="lightgrey";
divConfirm.style.top="180px";
divConfirm.style.left="308px";
divConfirm.style.zIndex="5999";
divConfirm.style.opacity="1";
divConfirm.innerHTML="<span style=\"color: darkgrey; text-align: center; font-size: 150px; width: 100%; display: block; text-shadow: 0px 3px 10px white;\" id=\"znr\">Z</span><span id=\"cue\" style=\"color: darkgrey; font-weight: bold; text-shadow: 0px 0px 2px white; display: block; width: 100%; text-align: center; font-size: 30px;\">Cue</span><span id=\"cancel\" style=\"display: block; margin-right: auto; font-size: 20px; margin-top: 10px; text-align: center; width: 100%; opacity: 0.5;\">Cancel</span>";



$("div#confirmDiv span#cue").live("click", function(){cueCV=true; cueCD=true;});
$("div#confirmDiv span#cancel").live("click", function(){cueCV=false; cueCD=true;});
$("div#confirmDivB").live("click", function(){cueCV=false; cueCD=true;});

document.getElementsByTagName("body")[0].appendChild(divConfirmB);
document.getElementsByTagName("body")[0].appendChild(divConfirm);


$("div#confirmDiv").hide();
$("div#confirmDivB").hide();


var blockDiv = document.createElement("div");

blockDiv.style.position="fixed";
blockDiv.style.width="100%";
blockDiv.style.height="100%";
blockDiv.style.background="black";
blockDiv.style.top="0px";
blockDiv.style.left="0px";
blockDiv.style.zIndex="6000";
blockDiv.style.opacity="0.2";
blockDiv.setAttribute("id", "hiddenblockdiv");



document.getElementsByTagName("body")[0].appendChild(blockDiv);

$("div.tab_body.jq_medium_tab_body div.config_cue.confirmcue").live("click", function(){
	cueConfirm($(this).attr("zaal"), $(this).attr("title"), $(this).attr("device_id"));});


function setCues(){
	if(window.location.hash!="#monitor_page#medium")return;
    $("div.tab_body.jq_medium_tab_body div.config_cue.jq_quick_cue").hide();
	
	//Zaal 1
	$("div.tab_body.jq_medium_tab_body[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.quick_cue_controls").append('<div zaal="1" device_id="b94642c1-cbc8-44c5-b3c4-df0277e21df5" title="Lights OFF" class="confirmcue config_cue quick_cue house_lights_down"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.quick_cue_controls").append('<div zaal="1" device_id="b94642c1-cbc8-44c5-b3c4-df0277e21df5" title="Lights DIMM" class="confirmcue config_cue quick_cue house_lights_half"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.quick_cue_controls").append('<div zaal="1" device_id="b94642c1-cbc8-44c5-b3c4-df0277e21df5" title="Deuren dicht" class="confirmcue config_cue quick_cue door_closer"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.quick_cue_controls").append('<div zaal="1" device_id="b94642c1-cbc8-44c5-b3c4-df0277e21df5" title="Play" class="confirmcue config_cue quick_cue play"></div>');
	
	//Zaal 2
	$("div.tab_body.jq_medium_tab_body[device_id=90f9f8e3-beae-466f-8a46-f17c61c78644] div.quick_cue_controls").append('<div zaal="2" device_id="90f9f8e3-beae-466f-8a46-f17c61c78644" title="Lights OFF" class="confirmcue config_cue quick_cue house_lights_down"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=90f9f8e3-beae-466f-8a46-f17c61c78644] div.quick_cue_controls").append('<div zaal="2" device_id="90f9f8e3-beae-466f-8a46-f17c61c78644" title="Lights DIMM" class="confirmcue config_cue quick_cue house_lights_half"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=90f9f8e3-beae-466f-8a46-f17c61c78644] div.quick_cue_controls").append('<div zaal="2" device_id="90f9f8e3-beae-466f-8a46-f17c61c78644" title="Deuren dicht" class="confirmcue config_cue quick_cue door_closer"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=90f9f8e3-beae-466f-8a46-f17c61c78644] div.quick_cue_controls").append('<div zaal="2" device_id="90f9f8e3-beae-466f-8a46-f17c61c78644" title="Play" class="confirmcue config_cue quick_cue play"></div>');
	
	//Zaal 3
	$("div.tab_body.jq_medium_tab_body[device_id=e3cdf9d3-b75d-4027-bb28-65b4c36a7917] div.quick_cue_controls").append('<div zaal="3" device_id="e3cdf9d3-b75d-4027-bb28-65b4c36a7917" title="Lights OFF" class="confirmcue config_cue quick_cue house_lights_down"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=e3cdf9d3-b75d-4027-bb28-65b4c36a7917] div.quick_cue_controls").append('<div zaal="3" device_id="e3cdf9d3-b75d-4027-bb28-65b4c36a7917" title="Lights DIMM" class="confirmcue config_cue quick_cue house_lights_half"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=e3cdf9d3-b75d-4027-bb28-65b4c36a7917] div.quick_cue_controls").append('<div zaal="3" device_id="e3cdf9d3-b75d-4027-bb28-65b4c36a7917" title="Deuren dicht" class="confirmcue config_cue quick_cue door_closer"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=e3cdf9d3-b75d-4027-bb28-65b4c36a7917] div.quick_cue_controls").append('<div zaal="3" device_id="e3cdf9d3-b75d-4027-bb28-65b4c36a7917" title="Play" class="confirmcue config_cue quick_cue play"></div>');
	
	//Zaal 4
	$("div.tab_body.jq_medium_tab_body[device_id=47c14fed-c9e9-4a66-b6f9-3fc391fabf57] div.quick_cue_controls").append('<div zaal="4" device_id="47c14fed-c9e9-4a66-b6f9-3fc391fabf57" title="Lights OFF" class="confirmcue config_cue quick_cue house_lights_down"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=47c14fed-c9e9-4a66-b6f9-3fc391fabf57] div.quick_cue_controls").append('<div zaal="4" device_id="47c14fed-c9e9-4a66-b6f9-3fc391fabf57" title="Lights DIMM" class="confirmcue config_cue quick_cue house_lights_half"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=47c14fed-c9e9-4a66-b6f9-3fc391fabf57] div.quick_cue_controls").append('<div zaal="4" device_id="47c14fed-c9e9-4a66-b6f9-3fc391fabf57" title="Deuren dicht" class="confirmcue config_cue quick_cue door_closer"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=47c14fed-c9e9-4a66-b6f9-3fc391fabf57] div.quick_cue_controls").append('<div zaal="4" device_id="47c14fed-c9e9-4a66-b6f9-3fc391fabf57" title="Play" class="confirmcue config_cue quick_cue play"></div>');
	
	//Zaal 5
	$("div.tab_body.jq_medium_tab_body[device_id=25b6f3db-756f-42a4-ac64-2a22691b042b] div.quick_cue_controls").append('<div zaal="5" device_id="25b6f3db-756f-42a4-ac64-2a22691b042b" title="Lights OFF" class="confirmcue config_cue quick_cue house_lights_down"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=25b6f3db-756f-42a4-ac64-2a22691b042b] div.quick_cue_controls").append('<div zaal="5" device_id="25b6f3db-756f-42a4-ac64-2a22691b042b" title="Lights DIMM" class="confirmcue config_cue quick_cue house_lights_half"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=25b6f3db-756f-42a4-ac64-2a22691b042b] div.quick_cue_controls").append('<div zaal="5" device_id="25b6f3db-756f-42a4-ac64-2a22691b042b" title="Deuren dicht" class="confirmcue config_cue quick_cue door_closer"></div>');
	$("div.tab_body.jq_medium_tab_body[device_id=25b6f3db-756f-42a4-ac64-2a22691b042b] div.quick_cue_controls").append('<div zaal="5" device_id="25b6f3db-756f-42a4-ac64-2a22691b042b" title="Play" class="confirmcue config_cue quick_cue play"></div>');
	}
	
function doBlock(doNow){
	if(doNow)blockDiv.style.display="block";
    if(window.location.hash=="#monitor_page#medium"){
        doNotTimeLock=false;
        blockDiv.style.display="block";
        setTimeout(function(){
            $("div.monitor_device_wrapper div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=quick_cue]").trigger("click");
            $("div.monitor_device_wrapper div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=quick_cue]").trigger("dblclick");},1000);}
    else doNotTimeLock=true;}

window.onblur=function(){
        doBlock(true);}

window.onhashchange=function(){
		if(window.location.hash=="#monitor_page#medium"){
    document.body.style.cursor = "default";

$("div.monitor_medium_device_tabs.jq_tabs ul.tab_headers.jq_tab_headers").hide();
$("div.monitor_medium_device_tabs.jq_tabs div.tab_body.jq_medium_tab_body").css("height", "227px");}
		else document.body.style.cursor = "crosshair";
        doBlock(false);}

$("div#screen_status_bar").css("height", "35px");
$("div#main_section").css("bottom", "35px");

var keypresslevel=0;
	



document.onkeypress=function(e){
        var blockDiv2=document.getElementById("hiddenblockdiv");
	if(blockDiv2.style.display=="none")return;
	if(keypresslevel==0){
		if(e.charCode==52)keypresslevel=1;
		else keypresslevel=0;}
	else if(keypresslevel==1){
		if(e.charCode==57)keypresslevel=2;
		else keypresslevel=0;}
	else if(keypresslevel==2){
		if(e.charCode==55)keypresslevel=3;
		else keypresslevel=0;}
	else if(keypresslevel==3){
		if(e.charCode==54){
			keypresslevel=0;
			setCues();
			blockDiv2.style.display="none";
    setTimeout(function(){
        if(doNotTimeLock)return;
        blockDiv2.style.display="block";
        $("div.monitor_device_wrapper div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=quick_cue]").trigger("click");
        $("div.monitor_device_wrapper div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=quick_cue]").trigger("dblclick");},90000);}
		else keypresslevel=0;}
	else keypresslevel=0;
	if(keypresslevel==1)setTimeout(function(){
		keypresslevel=0},1500);}}