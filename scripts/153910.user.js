// ==UserScript==
// @name          Better Breadfish
// @namespace     absolut-fair.com
// @description   Machs dir wie du's willst
// @include       http://forum.sa-mp.de/*
// @include       https://forum.sa-mp.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @version       1.2.2
// @updateURL     https://userscripts.org/scripts/source/153910.meta.js
// @downloadURL   https://userscripts.org/scripts/source/153910.user.js
// ==/UserScript==
var popupStatus=0;

$(document).ready(function () {
	initpop();
	$(".footerMenuInner").find("li.last").removeClass("last");
	$(".footerMenuInner > ul").append('<li class="last"><a href="#" onclick="return false;" class="annoysett"><img src="http://absolut-fair.com/wbb_backup/heart.png"><span>Better BF</span></a></li>');
	$(".annoysett").click(function() { settings(); });
	
	if(allow("announce") && $("#tplIndex").length) removelem(".info:not(.deletable)");
	if(allow("ignored")) 
	{
		$(".messageMinimized:not(.quickReply)").each(function() {
			if( $(this).find('img[src="wcf/icon/warningM.png"]').length>0) $(this).remove();
		});
	}
	if(allow("bedanko")) removelem("li.postThankButton, .thankStats");
	if(allow("bestans") && $("#tplThread").length) 
	{
		removelem("#helpfulAnswer");
		$(".helpfulAnswerPost .messageInner .messageSidebar").css("background-image","none");
	}
	if(allow("spitzname"))
	{
		$(".messageSidebar").each(function() {
			var uid = $("a",$(".userName",this)).attr("href").replace("http://forum.sa-mp.de/index.php?page=User&userID=","");
			if( $(".userName",this).find("span").find("span").length>0) var nmobj = $(".userName",this).find("span").find("span");
			else var nmobj = $(".userName",this).find("span");

			var rlname = nmobj.text();
			$(".userMessenger > ul",this).prepend('<li><a href="#" onclick="return false;" class="renameme" title="Benutzer umbenennen" uid="'+uid+'" rlnm="'+rlname+'"><img src="wcf/icon/messageQuoteOptionsS.png" class="changenick" uid="'+uid+'"></a></li>');
			var alias=GM_getValue("alias:"+uid,"no");
			if( alias!="no" ) nmobj.text(alias);
		});
		$(".renameme").click(function() {
			var uid=$(this).attr("uid");
			var rlnm=$(this).attr("rlnm");

			openpop("BFF: Spitzname",'\
			<h3>Gib diesem User einen eigenen, permanenten Spitznamen...</h3>\
			<input type="text" placeholder="'+rlnm+'" id="newalias"><br>\
			<input type="button" id="setnew" value="Spitzname geben">\
			<br><br><br><br>\
			<h3>... oder entferne den bisherigen Spitznamen</h3>\
			<input type="button" id="removealias" value="Spitzname entfernen">\
			',1);
			$("#setnew").click(function() {
				GM_setValue("alias:"+uid,$("#newalias").val());
				disablePopup();
				location.reload();
			});
			$("#removealias").click(function() {
				GM_deleteValue("alias:"+uid);
				disablePopup();
				location.reload();
			});
		});
	}
	if(allow("anonymto"))
	{
		$("a.externalURL").each(function() {
			var thisurl = $(this).attr("href");
			if( thisurl == undefined) return true; //continue
			//alert(thisurl+"\n"+thisurl.substr(7,9)+"\n"+thisurl.substr(0,9));
			if( thisurl.substr(0,9) == "anonym.to" || thisurl.substr(7,9)=="anonym.to" ) 
			{
				var newurl = thisurl.replace("anonym.to/?","").replace("http://anonym.to?","");
				//alert("old:"+thisurl+"\nnew:"+newurl);
				$(this).attr("href",newurl);
			}
		});
	}
});

function settings()
{
	openpop("BBF: Einstellungen",'\
	<div id="modset2">\
	<h4>Folgende Dinge ausblenden:</h4>\
	<input type="checkbox" id="announce"> Ank&uuml;ndigungen auf Startseite<br>\
	<input type="checkbox" id="ignored"> Beitr&auml;ge von ignorierten Personen<br>\
	<input type="checkbox" id="bedanko"> Elemente des Bedankomaten<br>\
	<input type="checkbox" id="bestans"> Hinweis auf die \"hilfreichste Antwort\"<br>\
	<input type="checkbox" id="anonymto"> Anonym.to Dereferer<br>\
	<br>\
	<h4>Zus&auml;tzliche Features aktivieren...</h4>\
	<input type="checkbox" id="spitzname"> Eigene Spitznamen vergeben<br>\
	<input type="button" id="usesetting2" value="Anwenden">\
	</div>',1);
	$("#usesetting2").click(function() { location.reload(); });
	$("#modset2").find("input[type=checkbox]").each(function() {
		$(this).change(function() { 
			if( $(this).is(':checked') ) var chkd=1;
			else var chkd=0;
			GM_setValue($(this).attr("id"),chkd); 
		});
		if( GM_getValue($(this).attr("id"),"0")==1 ) $(this).attr("checked",true);
	});
}

function removelem(val)
{
	if($(val).length) $(val).remove();
}

function allow(val)
{
	if( GM_getValue(val,"0")==1) return true;
	else return false;
}


//#############################################################################################
//					Funktionen von andren Leuten (wenn auch editiert)...
//#############################################################################################
String.prototype.between = function(prefix, suffix) {
s = this;
var i = s.indexOf(prefix);
if (i >= 0) {
s = s.substring(i + prefix.length);
}
else {
return '';
}
if (suffix) {
i = s.indexOf(suffix);
if (i >= 0) {
s = s.substring(0, i);
}
else {
return '';
}
}
return s;
}

function openpop(titel,text,ishtml)
{
	$("#popupContact3 > h1").html(titel);
	if(ishtml) $("#contactArea3").html(text);
	else $("#contactArea3").text(text);

	centerPopup();
	loadPopup(); 
}

function initpop()
{	
	if( $("#backgroundPopup3").length>0) return 1;
	GM_addStyle("#backgroundPopup3{  \
display:none;  \
position:fixed;  \
_position:absolute;   \
height:500%;  \
width:500%;  \
top:-15px;  \
left:-15px;  \
background:#000000;  \
border:1px solid #cecece;  \
z-index:98;  \
}  \
#popupContact3{  \
display:none;  \
position:fixed;  \
_position:fixed;   \
min-width:408px;  \
max-width:80%; \
max-height:80%; \
background:#FFFFFF;  \
border:2px solid #cecece;  \
z-index:99;  \
padding:12px;  \
font-size:13px;  \
}  \
#popupContact3 h1{  \
text-align:left;  \
color:#6FA5FD;  \
font-size:22px;  \
font-weight:700;  \
border-bottom:1px dotted #D3D3D3;  \
padding-bottom:2px;  \
margin-bottom:20px;  \
}  \
#popupContactClose3{  \
font-size:14px;  \
line-height:14px;  \
right:6px;  \
top:4px;  \
position:absolute;  \
color:#6fa5fd;  \
font-weight:700;  \
display:block;  \
}  \
");

	$("body").before(''+
	'<div id="popupContact3">  '+
    '    <a id="popupContactClose3">x</a> '+ 
    '    <h1></h1>  '+
    '    <p id="contactArea3">  '+
    '    </p>  '+
    '</div> '+
	'<div id="backgroundPopup3"></div>');
	
	$("#popupContactClose3").click(function() {  
		disablePopup();  
	});  
	
	$("#backgroundPopup3").click(function() {  
		disablePopup();  
	});  
	
	$(document).keypress(function(e) {  
		if(e.keyCode==27 && popupStatus==1)
		{  
			disablePopup();  
		}  
	});
}

function loadPopup()
{  
	if(popupStatus==0)
	{  
		$("#backgroundPopup3").css({  
		"opacity": "0.7"  
		});  
		$("#backgroundPopup3").fadeIn("fast");  
		$("#popupContact3").fadeIn("fast");  
		popupStatus = 1;  
	}  
}  

function disablePopup(){   
if(popupStatus==1){  
$("#backgroundPopup3").fadeOut("fast");  
$("#popupContact3").fadeOut("fast");  
popupStatus = 0;  
}  
}  

function centerPopup(){
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $("#popupContact3").height();
var popupWidth = $("#popupContact3").width();
//centering
$("#popupContact3").css({
"position": "fixed",
"top": windowHeight/2-popupHeight/2,
"left": windowWidth/2-popupWidth/2
});
}