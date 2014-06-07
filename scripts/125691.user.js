// ==UserScript==
// @name           Cosmiq Enhancer
// @namespace      chiefwrigley
// @version        1.3
// @description    menü ist links, notizblock, schwebendes menü, lädt inhalt auto. neu, schöneres design, breitere seite
// @include        http://www.cosmiq.de/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var c_t_time = 20000; //reload timer

$(document).ready(function() {

// http://userscripts.org/scripts/show/43931 //CosmiQ Kastennotizblock
$("body").append("<style type='text/css'>#navi .loggedIn{-moz-border-radius: 10px;}</style>");
	$(".displayQAInfo").prepend('<fieldset style="-moz-border-radius: 5px;border:1px solid grey;"><legend><b>Notizen</b></legend><div id="stickyNoteDiv" style="display:block;">'+decodeURIComponent(GM_getValue('sticky','Keine Notizen').replace(/%0A/g, "%3Cbr%20%2F%3E"))+'</div> 	<textarea id="stickyNoteText" style="min-width: 250px; display: none; margin-top: 5px; margin-left: 1px;" rows="7" >'+decodeURIComponent(GM_getValue('sticky'))+'</textarea><br /><div style="margin-bottom:-20px;float:right;"><input type="button" id="stickyNoteEdit" value="Editieren" style="display:block;" /> 	<input type="button" id="stickyNoteSave" value="Akzeptieren" style="display:none;" /></div> </fieldset><br>');

	$(".TagCloud").prepend('<fieldset style="-moz-border-radius: 5px;border:1px solid grey;"><legend><b>Notizen</b></legend><div id="stickyNoteDiv" style="display:block;">'+decodeURIComponent(GM_getValue('sticky','Keine Notizen').replace(/%0A/g, "%3Cbr%20%2F%3E"))+'</div> 	<textarea id="stickyNoteText" style="min-width: 250px; display: none; margin-top: 5px; margin-left: 1px;" rows="7" >'+decodeURIComponent(GM_getValue('sticky'))+'</textarea><br /><div style="margin-bottom:-20px;float:right;"><input type="button" id="stickyNoteEdit" value="Editieren" style="display:block;" /> 	<input type="button" id="stickyNoteSave" value="Akzeptieren" style="display:none;" /></div> </fieldset><br>');


$("#stickyNoteEdit").click(function(){
	$("#stickyNoteDiv").css("display","none");
	$("#stickyNoteEdit").css("display","none");
	$("#stickyNoteText").css("display","block");
	$("#stickyNoteSave").css("display","block");
});
$("#stickyNoteSave").click(function(){
	stickyNote=encodeURIComponent($('#stickyNoteText').val());
	//console.info(stickyNote);
	GM_setValue('sticky',stickyNote);
	$("#stickyNoteDiv").html($("#stickyNoteText").val());
	$("#stickyNoteDiv").css("display","block");
	$("#stickyNoteEdit").css("display","block");
	$("#stickyNoteText").css("display","none");
	$("#stickyNoteSave").css("display","none");
});

$(".box").attr("style","-moz-border-radius: 10px;")
$(".headline").css("text-decoration","none");
$("#content").css("width","auto");
$('body').css("marginLeft","-20%");
$('#containerHeader').css({"width":"137%"});
$('.header-menu').css({"position":"absolute","width":"68.8%","padding-left":"30%","z-index":"1","background-repeat":"repeat-x","background-position":"left top","background-color":"white","-moz-border-radius":"15px 15px 0 0","border-radius":"15px 15px 0 0"});
$(".header-left").css({"position":"absolute","z-index":"3"});
$("#linkbar").parent().css({"width":"135.4%","z-index":"400"});
$(".searchQA").css("min-height","2000px");
$(".footer").css({"width":"135.4%","margin-top":"-2px"});
$(".proContraFooter").css("margin-left","50%");
$(".numb3rs").css("color","black");
$("#navi").css({"float":"left","margin-right":"15px","margin-left":"10px"});
$("#teaser").css({"float":"left","clear":"left","margin-left":"10px"});
$("#centerInner").css({"background-position":"left top","width":"135.4%"});
$(".bodySMW").css({"width":"48%","min-width":"800px"});
$("#myIqTeaser").parent().parent().parent().parent().css("margin-top","250px");
$('p.headline>a').css({"text-decoration":"none"});
$("body").append('<style type="text/css">p.headline a:link{font-size:medium;color:black;text-decoration:none;font-weight:bold;}p.headline a:hover{color:grey;}HTML,BODY {font-family: "Oswald", arial, serif;}</style>');



if($(".iboxMsgEntry").length ==0)
{
document.title = "COSMiQ";
}
else{
document.title = $(".iboxMsgEntry").length+'| COSMiQ';
}


var c_t_url = "";


    window.doRefresh = function() 
    {
	//content
        GM_xmlhttpRequest({
method: 'GET',
url: c_t_url,
headers: {
"Accept": "text/xml"},
onload: function(responseDetails) {
var text = responseDetails.responseText; 
p_observer = $(text).find("div[class='wrapper']:eq(1)").html();
$(".wrapper:eq(1)").fadeOut();
$(".wrapper:eq(1)").html(p_observer);
$(".wrapper:eq(1)").fadeIn();


 } });
 //msgBox
 GM_xmlhttpRequest({
method: 'GET',
url: c_t_url,
headers: {
"Accept": "text/xml"},
onload: function(responseDetails) {
var text2 = responseDetails.responseText; 
p_observer2 = $(text2).find("div[class='iboxMsgBox']").html();
$(".iboxMsgBox").html(p_observer2);
if($(".iboxMsgEntry").length ==0)
{
document.title = "COSMiQ";
}
else{
document.title = $(".iboxMsgEntry").length+'| COSMiQ';
}
 } });
} 
setInterval( doRefresh, c_t_time );  

//http://userscripts.org/scripts/show/67199 //COSMiQ - Sticky Sidebar
(function(d){
	function getElementsByXPath(obj, xPathString){
		if (obj.ownerDocument)  {
			xPathString = xPathString.replace(/^\/\//, '/descendant::')
		}
		var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var xPathArray = [];
		for (var i = 0; i < xPathSnapshot.snapshotLength; i++) {
			xPathArray[i] = xPathSnapshot.snapshotItem(i);
		}
		return (xPathArray || []);
	}
	window.addEventListener('scroll',function(e) {
		var sideBarTeaser = d.getElementById('teaser');
		if (!sideBarTeaser) return;
		var sideBar = getElementsByXPath(sideBarTeaser,'./div[@class="RGT"]')[0]; 
		if (!sideBar) return;
		if (document.documentElement.scrollTop > 500) {
			sideBar.style.position = 'fixed'; 
			sideBar.style.top = '30px';
			sideBar.style.width = '300px';
			//sideBar.style.margin = '0 0 10px 10px';
			$(".cmsbox_allpages_teaser_right1").hide("fast");
			$(".cmsbox_allpages_teaser_right2").hide("fast");
			$(".cmsbox_allpages_teaser_right").hide("fast");
		} else {
			sideBar.style.width = '300px';
			sideBar.style.position = 'relative'; 
			sideBar.style.top = 'auto';
			//sideBar.style.margin = '10px 0 10px 10px';
			$(".cmsbox_allpages_teaser_right1").show("fast");
			$(".cmsbox_allpages_teaser_right2").show("fast");
			$(".cmsbox_allpages_teaser_right").show("fast");
			
		}
		//top
		var topBar = $("#linkbar").parent();//d.getElementById('linkbar');
		if (!topBar) return;
		if (document.documentElement.scrollTop > 125) {
			topBar.css("position","fixed");//topBar.style.position = 'fixed'; 
			topBar.css("top","0");//topBar.style.top = '0';
			topBar.css({"width":"78%","min-width":"1084px"});//topBar.style.width = '100%';
		} else {
			topBar.css("width","135.4%");//topBar.style.width = '100%';
			topBar.css("position","relative");//topBar.style.position = 'relative'; 
			topBar.css("top","auto");//topBar.style.top = 'auto';
		}
	}, true);
}(document));





});
