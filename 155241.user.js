// ==UserScript==
// @name          WBB-Drive
// @namespace     absolut-fair.com
// @description   Nie mehr verlorene PNs!
// @include       http://forum.sa-mp.de/*
// @include       https://forum.sa-mp.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==
var popupStatus=0;
var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
secid=secid+sid;
var foldid = unsafeWindow.folderID;
var version="1.1.4";
var prefix="http";

$(document).ready(function () {
	if( $("#tplPmIndex, #tplPmView").length==0) return 1;
	initpop();
	
	bfid = $("#userNote > a").attr("href");
	bfid = bfid.replace(prefix+"://forum.sa-mp.de/","");
	bfid = bfid.replace("index.php?page=User&amp;userID=","");
	bfid = bfid.replace("index.php?page=User&userID=","");
	
	installed=0;
	$(".pageMenu").find("span").each(function() {
		if( $(this).text().indexOf("Cloud")!=-1)
		{
			installed=1;
			installobj=this;
			return false;
		}
	});
	
	if(installed)
	{
		$(installobj).each(function() { //ist zwar nur einer aber so istes einfacher
			$(this).parent("a").find("img").attr("src","http://absolut-fair.com/wbb_back/cloud1.png");
			$(this).text(' Cloud-Backups');
			
			indexeda = parseInt($(this).parent("a").attr("href").replace(prefix+"://forum.sa-mp.de/index.php?page=PMList&folderID=",""));
			atma = parseInt(location.href.replace(prefix+"://forum.sa-mp.de/index.php?page=PMList&folderID=",""));
			if( indexeda == atma ) 
			{
				seecloud_cmd=1;
				checkreg();
			}
			return false;
		});
		if( foldid < -1 || foldid>0) return 1;
		if( $(".tableList",".pmMessages").length == 0) return 1;
		$(".largeButtons > ul").prepend('<li><a href="#cloud" onclick="return false;" class="tocloud"><img src="http://absolut-fair.com/wbb_back/cloud2.png" alt="" /> \
		<span>In die Cloud leeren</span></a></li>');
		$(".tocloud").click(function() { tocloud=1; GM_setValue("doaction", "1"); checkreg(); });

		$('a[href="javascript:pmListEdit.moveMarkedTo('+indexeda+');"]').live("click",function(e) {
			e.preventDefault();
			openpop("Bedienungsfehler",'Hallo '+$("#userNote > a").text()+',<br>\
			leider scheint es so als h&auml;ttest du nicht verstanden wie man WBB-Drive bedient.<br><br>\
			\
			Um deine Nachrichten in die Cloud zu verschieben,<br>\
			gehe auf den entsprechenden Ordner und dr&uuml;cke dort auf "In die Cloud leeren"',1);
		});
		
		if(GM_getValue("doaction","0")=="1")
		{
			tocloud=1;
			goon();
		}
	}
	else
	{
		$(".largeButtons > ul").prepend('<li><a href="#cloud" onclick="return false;" class="tocloud"><img src="http://absolut-fair.com/wbb_back/cloud2.png" alt="" /> \
			<span>WBB-Drive installieren</span></a></li>');
		$(".tocloud").click(function() { checkreg(); });
	}
});

function goon()
{
	if(typeof seecloud_cmd != 'undefined') seecloud();
	if(typeof tocloud != 'undefined') movetocloud();
}

function checkreg()
{
	checkupdate();
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://absolut-fair.com/wbb_back/api.php?id=1&uid="+bfid+"&s="+secid,
		onload: function(resp) {
			var conti=resp.responseText;
			loggedin = parseInt(conti);

			if(loggedin==2) 
			{
				openpop("Es wurde ein Problem festgestellt",'Hallo '+$("#userNote > a").text()+',<br><br>\
				WBB-Drive erweitert das Postfach komfortabel und wird dadurch unbegrenzt gro&szlig; -<br>\
				ein Privileg, welches Unterst&uuml;tzern unseres Forums bisher immer vorbehalten war!<br><br>\
				Bitte habe daher Verst&auml;ndnis daf&uuml;r,<br>\
				dass ein derart m&auml;chtiges Werkzeug auch nur diesen Benutzern zug&auml;nglich ist!<br><br>\
				<input type="button" id="godonator" value="Jetzt auch Donator werden">',1);
				
				$("#godonator").click(function() {
					disablePopup();
					GM_openInTab(prefix+"://forum.sa-mp.de/allgemeines-und-foreneigenes/fehler-vorschl%C3%A4ge-kritik-lob-zum-forum/52748-donator-s-club-mitgliedschaft/");
					window.location=prefix+"://forum.sa-mp.de/index.php?page=PMList";
				});
				return 0;
			}
			if(loggedin && installed) return goon();
			else
			{
				openpop("Willkommen in der WBB-Cloud",'Mit WBB-Drive verlieren Sie ihre privaten Nachrichten nie wieder!<br><br>\
				<b>Features:</b><br>\
				- Sekundenschnelle Einrichtung<br>\
				- Absolut kostenfrei<br>\
				- Jederzeitige Deinstallation<br>\
				- Sicherer Datentransfer - es wird nichts geloggt!<br>\
				- Schnelle und unkomplizierte Bedienung<br>\
				- Eigene Verwaltung der Daten - Zugriff per Google Drive & Webinterface<br>\
				- Dynamische und optisch ansprechende Einbindung ins Forum<br>\
				<br>\
				<input type="button" id="goset" value="WBB-Drive installieren">',1); 
				
				$("#goset").click(function() {
					openrealpop("http://absolut-fair.com/wbb_back/api.php?id=2");
					
					if(!installed)
					{
						GM_xmlhttpRequest({
							method: "POST",
							url: prefix+"://forum.sa-mp.de/index.php?form=PMFolderEdit",
							data: "color=yellow&folderName=Cloud&add=Absenden",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							onload: function(resp) {
								return 1;
							}
						});
					}
					
					openpop("Warte auf Best&auml;tigung","WBB-Drive wartet auf Authentifizierung",0);
					
					var temptimer = setInterval(function() {
						GM_xmlhttpRequest({
							method: "GET",
							url: "http://absolut-fair.com/wbb_back/api.php?id=1&uid="+bfid+"&s="+secid,
							onload: function(resp) {
								var conti=resp.responseText;
								if( !popupStatus || conti=="1") clearInterval(temptimer);
								if( conti=="1" ) 
								{
									disablePopup();  
									window.location=window.location;
								}
							}
						});
					},1000);
					return 0;
				});
			}
		}
	});
}

function seecloud()
{
	$(".largeButtons > ul").find("li").remove();
	$(".largeButtons:first > ul").html('\
		<li><a href="#" onclick="return false;" id="wbbdrive_uninstall"><img src="http://absolut-fair.com/wbb_back/uninstall.png" alt="" /> <span>Deinstallieren</span></a></li>\
		<li><a href="#" onclick="return false;" id="wbbdrive_logout"><img src="http://absolut-fair.com/wbb_back/logout.png" alt="" /> <span>Abmelden</span></a></li>\
	')
	
	$("#wbbdrive_uninstall").click(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: prefix+"://forum.sa-mp.de/index.php?form=PMFolderEdit&delete="+indexeda,
			onload: function(resp) {
				window.location=prefix+"://forum.sa-mp.de/index.php?page=PMList";
				return 1;
			}
		});
	});
	$("#wbbdrive_logout").click(function() {
		openrealpop("http://absolut-fair.com/wbb_back/index.php?logout");
		window.location=prefix+"://forum.sa-mp.de/index.php?page=PMList";
	});
	
	$(".container-1:first",".pmMessages").html('Die Daten aus der Cloud werden empfangen...').css("height","100%");
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://absolut-fair.com/wbb_back/index.php?json",
		onload: function(resp) {
			var conti=resp.responseText;
			var obj = jQuery.parseJSON(conti);
			
			$(".pmMessages").html('<div class="border">\
			<table class="tableList">\
				<thead>\
					<tr class="tableHead">\
						<th class="columnIcon"><div><p><a href="#" onclick="return false;">\
						</a></p></div></th>\
						\
						<th class="columnIcon"><div><p><a href="#" onclick="return false;">\
						</a></p></div></th>\
						\
						<th><div><p><a href="#" onclick="return false;">\
							Ordner \
						</a></p></div></th>\
						\
						<th class="active"><div><p><a href="#" onclick="return false;">\
							Datum <img src="wcf/icon/sortDESCS.png" alt="" />\
						</a></p></div></th>\
						\
					</tr>\
				</thead>\
				<tbody>');
			var switscha=1;
			$.each(obj.data,function(key,val) {
				switscha = !switscha;
				if(switscha) var colcol="2";
				else colcol="1";
				
				$(".tableList",".pmMessages").append('\
				<tr class="container-'+colcol+'" id="wbbdrive_'+key+'">\
					<td class="columnIcon">\
						<a href="'+val.download+'">\
							<img id="pmEdit550213" src="http://absolut-fair.com/wbb_back/download.png" alt="" />\
						</a>\
					</td>\
					<td>\
						<a href="#" delid="'+key+'" onclick="return false;" class="wbbdrive_del">\
							<img src="http://absolut-fair.com/wbb_back/remove.png">\
						</a>\
					</td>\
					<td class="columnTitle" style="text-align:center;">\
						'+val.name+'\
					</td>\
					<td class="columnDate smallFont">\
						'+val.time_disp+'\
					</td>\
				</tr>');
			});
			$(".wbbdrive_del").click(function() {
				if(!confirm("Datei unwiederbringlich entfernen?")) return false;
				var delid=$(this).attr("delid");
				
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://absolut-fair.com/wbb_back/index.php?delete="+delid,
					onload:function() {
						$("#wbbdrive_"+delid).fadeOut();
					}
				});
			});
			$(".container-1:first",".pmMessages").append('</tbody></table></div>');
		}
	});
}

function movetocloud()
{
	GM_setValue("doaction", "0");
	openpop("WBB-Drive",'\
	<center>\
		<img src="http://absolut-fair.com/wbb_back/loading2.gif" alt="loading"><br><br>\
		<p id="syncstatus">Synchronisierung wird initialisiert...</p>\
	</center>',1);
	$(".tocloud > img").attr("src","http://absolut-fair.com/wbb_back/loading.gif");

	GM_xmlhttpRequest({
		method: "GET",
		url: prefix+"://forum.sa-mp.de/index.php?action=PMMarkAll&folderID="+foldid+"&t="+secid,
		onload: function() {
			$("#syncstatus").text("Backup wird gedownloadet...");
			var dlurl = prefix+"://forum.sa-mp.de/index.php?page=PM&action=downloadMarked&t="+secid;
			GM_xmlhttpRequest({
				method: "GET",
				url: dlurl,
				overrideMimeType: 'text/plain; charset=x-user-defined',
				timeout:0,
				onload: function(resp) {
					var conti=resp.responseText;
					var foldname=$(".headlineContainer").find("h2").text();
					if( $(".columnTitle").length>1) var fileend="zip";
					else var fileend="txt";
					$("#syncstatus").text("Backup wird in die Cloud geladen...");
					
					var encoded = encodeURIComponent(base64Encode(conti));
					GM_xmlhttpRequest({
						method: "POST",
						url: "http://absolut-fair.com/wbb_back/api.php?id=3&uid="+bfid+"&s="+secid,
						overrideMimeType: 'text/plain; charset=x-user-defined',
						data:"f="+foldname+"&end="+fileend+"&data="+encoded,
						headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
						onload: function(resp) {
							var conti=resp.responseText;
							
							GM_xmlhttpRequest({
								method: "GET",
								url: prefix+"://forum.sa-mp.de/index.php?page=PM&action=unmarkAll&t="+secid,
								onload:function() {
									$(".tocloud > img").attr("src","http://absolut-fair.com/wbb_back/cloud2.png");
									if(conti!="1") 
									{
										openpop("Es ist ein Fehler aufgetreten!","Es ist ein schwerwiegender Fehler aufgetreten der das Backup gestoppt hat.<br>Bitte melde diesen Fehler umgehend.<br><br><b>Fehlermeldung</b><br>"+conti,1);
									}
									else 
									{
										openpop("WBB-Drive",'Das Backup wurde erfolgreich in die Cloud geladen.<br>\
										Du kannst &uuml;ber den Ordner "Cloud-Backups" darauf zugreifen!<br>\
										Wie m&ouml;chtest du nun fortfahren?<br><br>\
										<input type="button" id="emptymarked" value="PNs leeren"><br>\
										<input type="button" id="skipempty" value="Ignorieren">',1);
									
										$("#skipempty").click(function() {
											disablePopup();
										});
										$("#emptymarked").click(function() {
											GM_xmlhttpRequest({
												method: "GET",
												url: prefix+"://forum.sa-mp.de/index.php?action=PMMarkAll&folderID="+foldid+"&t="+secid,
												onload: function() {
													GM_xmlhttpRequest({
														method: "GET",
														url: prefix+"://forum.sa-mp.de/index.php?page=PM&action=deleteMarked&folderID="+foldid+"&t="+secid,
														onload: function() {
															GM_xmlhttpRequest({
																method: "GET",
																url: prefix+"://forum.sa-mp.de/index.php?page=PM&action=emptyRecycleBin&t="+secid,
																onload: function() {
																	disablePopup();
																	window.location=window.location;
																}
															});
														}
													});
												}
											});
										});
									}
								}
							});
						}
					});
				}
			});
		}
	});
}

function openrealpop(url)
{
	poppei = window.open(url, "mrpopper", "width=600,height=400,status=yes,scrollbars=yes,resizable=no");
	poppei.focus();
}

function base64Encode(str) {
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = "", i = 0, len = str.length, c1, c2, c3;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
}

function checkupdate()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: prefix+"://forum.sa-mp.de/allgemeines-und-foreneigenes/neuigkeiten/146188-wbb-drive-unendlicher-nachrichtenplatz/",
		onload: function(resp) {
			var conti=resp.responseText;
			var newvers = $(conti).find("#postText1342048").find("em:first").text();
			if( newvers>version && GM_getValue("wbbdrive_reminder",0)<version) 
			{
				alert(unescape("Ein Update f%FCr WBB-Drive ist verf%FCgbar%21"));
				GM_setValue("wbbdrive_reminder",version);
				GM_openInTab("http://userscripts.org/scripts/show/155241");
			}
		}
	});
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
	$("#popupContact2 > h1").html(titel);
	if(ishtml) $("#contactArea2").html(text);
	else $("#contactArea2").text(text);
	//$("img","#contactArea2").attr({src:"",alt:"Bild"});
	centerPopup();
	loadPopup(); 
}

function initpop()
{	
	GM_addStyle("#backgroundPopup2{  \
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
#popupContact2{  \
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
#popupContact2 h1{  \
text-align:left;  \
color:#6FA5FD;  \
font-size:22px;  \
font-weight:700;  \
border-bottom:1px dotted #D3D3D3;  \
padding-bottom:2px;  \
margin-bottom:20px;  \
}  \
#popupContactClose2{  \
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

	$("#tplPmIndex, #tplPmView").before(''+
	'<div id="popupContact2">  '+
    '    <a id="popupContactClose2">x</a> '+ 
    '    <h1></h1>  '+
    '    <p id="contactArea2">  '+
    '    </p>  '+
    '</div> '+
	'<div id="backgroundPopup2"></div>');
	
	$("#popupContactClose2").click(function() {  
		disablePopup();  
	});  
	
	$("#backgroundPopup2").click(function() {  
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
		$("#backgroundPopup2").css({  
		"opacity": "0.7"  
		});  
		$("#backgroundPopup2").fadeIn("fast");  
		$("#popupContact2").fadeIn("fast");  
		popupStatus = 1;  
	}  
}  

function disablePopup(){   
if(popupStatus==1){  
$("#backgroundPopup2").fadeOut("fast");  
$("#popupContact2").fadeOut("fast");  
popupStatus = 0;  
}  
}  

function centerPopup(){
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $("#popupContact2").height();
var popupWidth = $("#popupContact2").width();
//centering
$("#popupContact2").css({
"position": "fixed",
"top": windowHeight/2-popupHeight/2,
"left": windowWidth/2-popupWidth/2
});
}