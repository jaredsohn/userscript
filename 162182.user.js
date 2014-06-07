// ==UserScript==
// @name          DSZ Moderation
// @namespace     www.dsz-roleplay.com
// @description   Bessere Verwaltung der Meldungen - NUR FÜR TEAMMITGLIEDER!
// @include       http://*/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==
var popupStatus=0;
var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
secid=secid+sid;
var hits; //meldungen
var hits2; //freischalten
var pagetype=0;
var version="1.7.1";

exceptions=new Array("goraster","gohidestrike");
//for(var i=0;i<exceptions.length;i++) if(GM_getValue(exceptions[i],"error")=="error") GM_setValue(exceptions[i],0);

$(document).ready(function () {
	checkupdate();
	initpop();
	//if( GM_getValue("hidemod","1")==1) $("#userMenuModeration").remove();
	
	$(".footerMenuInner").find("li.last").removeClass("last");
	$(".footerMenuInner > ul").append('<li class="last"><a href="#" onclick="return false;" class="modsetting"><img src="http://forum.sa-mp.de/wcf/icon/acpS.png"><span>DSZ Moderation</span></a></li>');
	$(".modsetting").click(function() { settings(); });
	
	//je nach forenbereich
	if( $("#tplIndex").length>0) pagetype=1; 
	if( $("#tplThread").length>0) pagetype=2; 
	if( $("#tplUserProfile").length>0) pagetype=3;
	
	/*if($("#userPanel").length>0 && $("#sitemapButton").length==0) //acp deaktiviert das?!
	{
		if( $("#userMenuGroupManagement").length==0) 
		else { if( GM_getValue("hideseg","1")==1) $("#userMenuGroupManagement").css("display","none"); }
	}*/
	GM_setValue("gosegration","1");
	if(pagetype==1 && GM_getValue("goindex","1")==1) initindex();
	if(pagetype==2 && GM_getValue("goposts","1")==1) initposts();
	if(pagetype==3 && GM_getValue("gosegration","1")==1) 
	{
		$(".userCardOptions > ul").append('\
		<li><a href="#" onclick="return false;" id="mod_segration" title="Benutzer segregieren"><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/24/door-out-icon.png" alt="" /> <span>Benutzer segregieren</span></a></li>\
		<li><a href="#" onclick="return false;" id="mod_integration" title="Benutzer integrieren"><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/24/door-in-icon.png" alt="" /> <span>Benutzer integrieren</span></a></li>');
		$("#mod_segration").live("click",function() {
			var thisman = $(".headlineContainer > h2 > a").text();
			thisman = thisman.replace("Profil von &raquo;","");
			thisman = thisman.replace("&laquo;","");
			thisman = thisman.replace("«","");
			thisman = thisman.replace("Profil von »","");
			GM_xmlhttpRequest({
				method:"POST",
				url:"http://forum.dsz-roleplay.de/index.php?form=UserGroupAdministrate",
				data: "usernames="+thisman+"&&groupID=15&pageNo=1",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload:function(resp) {
					alert("Benutzer erfolgreich segregiert.\nEr kann nun in Hilfebereichen keine Themen erstellen bis er wieder manuell integriert wird");
				}
			});
		});
		$("#mod_integration").live("click",function() {
			var thisman = $('input[name="userID"]').val();

			GM_xmlhttpRequest({
				method:"POST",
				url:"http://forum.dsz-roleplay.de/index.php?action=UserGroupMemberRemove",
				data: "userIDs%5B%5D="+thisman+"&groupID=15&t="+secid,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload:function(resp) {
					alert("Der Benutzer wurde erfolgreich integriert und kann nun wieder Hilfethemen erstellen");
				}
			});
		});
	}
	
	//variable aktionen
	$(".gm_open_tit").live("click",function() {
		openpop("Gemeldeter Beitrag", '<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
	$(".gm_report_txt").live("click",function() {
		openpop("Meldungsbeschreibung", '<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
	$(".flush").live("click",function() {
		var pID = $(this).attr("pid");
		removedisplay(pID);
		go_ai(pID,"learn",1);
	});
	$(".reject").live("click",function() {
		var pID = $(this).attr("pid");
		var autor = $(this).attr("autor");
		var turl = $(this).attr("turl");
		
		openpop("Meldung zurückweisen",'<textarea id="rej_rea" style="width:400px; height:325px;" placeholder="Grund?"></textarea><br><input type="submit" id="rej_sub" value="Senden" style="float:right;">',1);
		$("#rej_sub").click(function() {
			var rea=$("#rej_rea").val();
			var reas='Hallo '+autor+',\n\
deine Meldung wurde von der Moderation zurückgewiesen.\n\
Dies ist als Aufforderung zu verstehen, Beiträge künftig genauer auf Regelverstöße zu prüfen bevor du sie meldest.\n\
Die Moderation behält es sich vor, unsinnige Meldungen zu sanktionieren.\n\
\n\
[b]Betroffener Beitrag:[/b] \n\
'+turl+'\n\
\n\
[b]Grund der Ablehnung:[/b] \n\
'+rea+'\n\
\n\
Mit freundlichen Grüßen,\n\
das Team von Die Sieben Zwerge Reallife';
			sendpn(autor,"Deine Meldung wurde zurückgewiesen",reas);
			disablePopup();
			removedisplay(pID);
			go_ai(pID,"learn",8);
		});
	});
	$(".remove").live("click",function() {
		var pID = $(this).attr("pid");
		var autor = $(this).attr("autor");
		var turl = $(this).attr("turl");
		
		openpop("Beitrag löschen",'<textarea style="width:400px; height:325px;" id="del_rea" placeholder="Bitte gebe einen Grund an:"></textarea><br><input type="submit" id="del_sub" value="Löschen" style="float:right;">',1);
		$("#del_sub").click(function() {
			var reas = $("#del_rea").val();
			if(reas==null) return 0;
			beitragweg(pID,0,reas);
			removedisplay(pID);
			go_ai(pID,"learn",3);
			if(GM_getValue("goalert","1")==1 && reas.length>=1) reportdelete(reas,autor,turl);
			disablePopup();
		});
	});
	$(".removestrike").live("click",function() {
		var pID = $(this).attr("pid");
		var uid = $(this).attr("uid");
		var turl= $(this).attr("turl");
		gostrike(uid,pID,turl);
		removedisplay(pID);
		beitragweg(pID,0);
		go_ai(pID,"learn",4);
	});
	$(".strike").live("click",function() {
		var pID = $(this).attr("pid");
		var uid = $(this).attr("uid");
		var turl= $(this).attr("turl");
		gostrike(uid,pID,turl);
		removedisplay(pID);
		go_ai(pID,"learn",2);
	});
	$(".removetop").live("click",function() {
		var pID = $(this).attr("pid");
		var tid = $(this).attr("tid");
		removedisplay(pID);
		themaweg(pID,tid);
		go_ai(pID,"learn",5);
	});
	$(".striketop").live("click",function() {
		var pID = $(this).attr("pid");
		var tid = $(this).attr("tid");
		var uid = $(this).attr("uid");
		var turl= $(this).attr("turl");

		turl = turl.split("/");
		var endturl="";
		for(var i=0;i<=25;i++)
		{
			if( /\d/.test(turl[i])) break;
			endturl = endturl+"/"+turl[i];
		}

		endturl = endturl+"/"+tid+"-lol/";
		endturl = endturl.substr(1,endturl.length-1);

		GM_xmlhttpRequest({
			method: "GET",
			url: endturl,
			onload: function(resp) {
				var conti=resp.responseText;
				var uid = $(conti).find(".threadStarterPost").find(".userName").find("a").attr("href").replace("http://forum.dsz-roleplay.de/index.php?page=User&userID=","");
				
				gostrike(uid,pID,turl);
			}
		});
		themaweg(pID,tid);
		removedisplay(pID);
		go_ai(pID,"learn",6);
	});
	$(".banit").live("click",function() {
		var pID = $(this).attr("pid");
		var uid = $(this).attr("uid");
		var turl= $(this).attr("turl");

		openpop("Benutzer sperren",'<textarea style="width:400px; height:325px;" id="bn_rea" placeholder="Bitte gebe einen Grund an:"></textarea><br><input type="submit" id="bn_sub" value="Sperren" style="float:right;">',1);
		$("#bn_sub").click(function() {
			var bangrund=$("#bn_rea").val();
			if(bangrund==null) return 0;
			removedisplay(pID);
			beitragweg(pID,0,bangrund);
			
			var bfid = $("#userNote > a").text();
			bangrund=bangrund+" -by "+bfid;

			GM_xmlhttpRequest({
				method: "GET",
				url: "http://forum.dsz-roleplay.de/index.php?action=UserProfileBan&userID="+uid+"&banReason="+escape(bangrund)+"&t="+secid
			});
			go_ai(pID,"learn",7);
			disablePopup();
		});
	});
			
	$(".unlock_gm_open_tit").live("click",function() {
		openpop("Freizuschaltendes Thema", '<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
	$(".unlock_accept").live("click",function() {
		unlocktopic(1, $(this).attr("pid"), $(this).attr("usr"), $(this).attr("titel"), $(this).attr("tid"), $(this).attr("url"));
	});
	$(".unlock_remove").live("click",function() {
		unlocktopic(0, $(this).attr("pid"), $(this).attr("usr"), $(this).attr("titel"), $(this).attr("tid"), $(this).attr("url") );
	});
	$(".aiinfo, .aiinfo2").live("click",function() {
		openpop("AI-Information",'<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
});

function initposts()
{
	$('a[title="Verwarnen"]').addClass("oldbust");
	//if(GM_getValue("gohidestrike",0)==0) $(".oldbust").css({display:"none"});
	//$('a').has('img[src="icon/userIPLogRegistrationIPAddressS.png"]').remove();
	//$('a').has('span[style="font-size:0.8em"]').remove();
	$(".messageContent").each(function() {
		if( $(".oldbust",this).length==0) return true;
		var pid=$("div:first",$(".messageBody",this)).attr("id").replace("postText","");
		var uid=$(".oldbust",this).attr("href").between("userID=","&");
		//var turl=window.location;
		var turl=$(".messageCount",this).find("a").attr("href");
		var tid=unsafeWindow.threadID;
		var autor=$(this).parent(".messageInner").find(".userName").find("a").attr("title").replace("Benutzerprofil von »","").replace("« aufrufen",""); 

		$("ul",$(".smallButtons",this)).prepend('\
		<li style="float:left;"><a href="#" onclick="return false;" pid="'+pid+'" uid="'+uid+'" turl="'+turl+'" class="strike"><img src="http://forum.sa-mp.de/wcf/icon/infractionWarningS.png" alt="" title="Verwarnen" /></a></li>\
		<li style="float:left;"><a href="#" onclick="return false;" pid="'+pid+'" autor="'+autor+'" turl="'+turl+'" class="remove"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png" alt="" title="Löschen" /></a></li>\
		<li style="float:left;"><a href="#" onclick="return false;" pid="'+pid+'" uid="'+uid+'" turl="'+turl+'" class="removestrike"><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/16/Male-User-Warning-icon.png" alt="" title="Verwarnen und löschen"/></a></li>\
		<li style="float:left;"><a href="#" onclick="return false;" pid="'+pid+'" tid="'+tid+'" turl="'+turl+'" class="removetop"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-blue-full-icon.png" alt="" title="Thema entfernen"/></a></li>\
		<li style="float:left;"><a href="#" onclick="return false;" pid="'+pid+'" uid="'+uid+'" turl="'+turl+'" tid="'+tid+'" class="striketop"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-red-icon.png" alt="" title="Thema entfernen und verwarnen"/></a></li>\
		<li style="float:left;"><a href="#" onclick="return false;" pid="'+pid+'" uid="'+uid+'" turl="'+turl+'" class="banit"><img src="http://forum.sa-mp.de/wcf/icon/bannedS.png" alt="" title="Benutzer sperren"/></a></li>\
		');
	});
}

function initindex()
{
	if(GM_getValue("gounlock","1")==1)
	{
		//Freizuschaltende Themen
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://forum.dsz-roleplay.de/index.php?page=ModerationHiddenPosts",
			onload: function(resp) {
				var conti=resp.responseText;
				var obj = $(conti).find("div.messageInner");
				hits2 = obj.length;
				if( hits2 <= 0) return false; //keine
				
				addunlock(hits2);
				
				obj.each(function(i) {
					var titel = $(".light > li:eq(1) > a",this).text().trim();
					var prefix = $(".prefix > strong",this).text();
					var titel_url = $(".messageNumber",this).attr("href");
					var pid = $("h4",this).attr("id");
					pid = pid.replace("postRow","");
					pid = pid.replace("postTopic","");
					var tid = $("ul.breadCrumbs",this).find("a:eq(1)").attr("href");
					tid = tid.split("/");
					tid=tid[(tid.length-2)];
					tid=tid.split("-");
					tid=tid[0];
					var content = $(".messageBody > div",this).text().trim();
					var autor = $(".containerContent:first",this).find("a").text();
					var autor_url = $(".containerContent:first",this).find("a").attr("href");
					
					turl = titel_url.split("/");
					var endturl="";
					for(var i=0;i<=25;i++)
					{
						if( /\d/.test(turl[i])) break;
						endturl = endturl+"/"+turl[i];
					}
					endturl = endturl+"/"+tid+"-lol/";
					endturl = endturl.substr(1,endturl.length-1);
					
					$(".gm_unlock").append('<li class="unlock_gm_id_'+pid+' indexhit">\
						<strong>'+prefix+'</strong> <a href="'+titel_url+'" onclick="return false;" title="'+escape(content)+'" class="unlock_gm_open_tit">'+titel+'</a> von <a href="'+autor_url+'">'+autor+'</a>\
						<div style="float:right;">\
						<a href="#" onclick="return false;" title="Erlauben" class="unlock_accept" url="'+endturl+'" titel="'+titel+'" pid="'+pid+'" usr="'+autor+'" tid="'+tid+'"><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/16/Accept-icon.png" width="16"></a>\
						<a href="#" onclick="return false;" title="Löschen" class="unlock_remove" url="'+endturl+'" titel="'+titel+'" pid="'+pid+'" usr="'+autor+'" tid="'+tid+'"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png"  width="16"></a>\
						</div>\
					</li>');
					
					if( i == hits2-1) 
					{
						if( GM_getValue("gospacing",1) ) $(".indexhit").css("margin-bottom","15px");
					}
				});
			}
		});
	}
	
	//if(GM_getValue("goreported","1")==1)
	//{
		//Gemeldete Beiträge
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://forum.dsz-roleplay.de/index.php?page=ModerationReports",
			onload: function(resp) {
				var conti=resp.responseText;
				var obj = $(conti).find(".message");
				hits = obj.length;
				//if( hits <= 0) return false; //keine Meldungen
				
				addlist(hits);
				
				obj.each(function(i) {
					var date = $(".smallFont:first",this).text();
					var autor = $(".smallFont:last > a",this).text();
					var autor_url = $(".smallFont:last > a",this).attr("href");
					var titel = $(".messageHeading",this).text();
					titel = escape(titel);
					var content = $(".messageBody > div",this).text().trim();
					content = escape(content);
					var reportby = $(".editNote > a",this).text();
					var reportby_url = $(".editNote > a",this).attr("href");
					var reporttxt = $(".messageInner > p:last",this).text();
					var forum = $(".breadCrumbs > li:first > a",this).text();
					var forum_url = $(".breadCrumbs > li:first > a",this).attr("href");
					var thema = $(".breadCrumbs > li:last > a",this).text();
					var thema_url = $(".messageNumber",this).attr("href");
					var prefix = $(".prefix > strong",this).text();
					
					//extraktion ohne regexp
					var tid = $(".breadCrumbs > li:last > a",this).attr("href");
					var count = tid.split("/").length - 2;
					var nthpos = getnthhit(tid,"/",count)+1;  
					tid = tid.substr ( nthpos , tid.indexOf( "-", nthpos) - nthpos );
					
					var pid = $(".messageMarkCheckBox > input",this).attr("id");
					pid = pid.replace("postMark","");
					var uid = autor_url.replace("http://forum.dsz-roleplay.de/index.php?page=User&userID=","");
					
					if(thema.length<40) var thema_short=thema;
					else var thema_short=thema.substr(0,40)+"[...]";
					
					if(forum.length>20) var forumshort=forum.substr(0,20)+"[...]";
					
					$(".gm_list").append('<li class="gm_id_'+pid+' indexhit">\
								'+prefix+' <a href="'+thema_url+'" onclick="return false;" title="'+content+'" class="gm_open_tit">'+thema_short+'</a> \
								von <a href="'+autor_url+'" class="reportedautor">'+autor+'</a>, \
								gemeldet von <a href="'+reportby_url+'" onclick="return false;" title="'+escape(reporttxt)+'" class="gm_report_txt">'+reportby+'</a> \
								|| Bereich - <a href="'+forum_url+'">'+forum+'</a> \
								<div style="float:right;" class="action'+pid+' modaction">\
									<a href="#" onclick="return false;" title="Meldung entfernen" class="flush" pid="'+pid+'"><img src="http://forum.sa-mp.de/wcf/icon/pmTrashEmptyM.png" width="16"></a>\
									<a href="#" onclick="return false;" title="Verwarnen" class="strike" pid="'+pid+'" uid="'+uid+'" turl="'+thema_url+'"><img src="http://forum.sa-mp.de/wcf/icon/infractionWarningM.png" width="16"></a>\
									<a href="#" onclick="return false;" title="Beitrag löschen" class="remove" autor="'+autor+'" pid="'+pid+'" turl="'+thema_url+'"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png"  width="16"></a>\
									<a href="#" onclick="return false;" title="Beitrag verwarnen und löschen" class="removestrike" turl="'+thema_url+'" pid="'+pid+'" uid="'+uid+'"><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/16/Male-User-Warning-icon.png"  width="16"></a>\
									<a href="#" onclick="return false;" title="Thema entfernen" class="removetop" pid="'+pid+'" tid="'+tid+'"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-blue-full-icon.png"></a>\
									<a href="#" onclick="return false;" title="Thema verwarnen und löschen" class="striketop" pid="'+pid+'" turl="'+thema_url+'" tid="'+tid+'" uid="'+uid+'"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-red-icon.png"  width="16"></a>\
									<a href="#" onclick="return false;" title="Benutzer sperren" class="banit" pid="'+pid+'" turl="'+thema_url+'" uid="'+uid+'"><img src="http://forum.sa-mp.de/wcf/icon/bannedS.png" width="16"></a>\
									<a href="#" onclick="return false;" title="Meldung zur&uuml;ckweisen" class="reject" pid="'+pid+'" autor='+reportby+' turl="'+thema_url+'"><img src="http://forum.sa-mp.de/wcf/icon/legalNoticeS.png" width="16"></a>\
								</div>\
								</li>');
					go_ai(pid,"detect");
					$(".action"+pid).find("a").each(function(i) {
						$(this).live("click",function(e) {
							e.preventDefault();
						});
					});
					if( i == hits-1) 
					{
						$("#gm_list").fadeIn("slow");
						if( GM_getValue("gospacing",1) ) $(".indexhit").css("margin-bottom","15px");
					}
				});
			}
		});
	//}
}

function settings()
{
	openpop("Die Sieben Zwerge Moderation - Einstellungen",'\
	<div id="modset">\
	<input type="checkbox" id="goindex"> Zusammenfassung auf Startseite<br>\
	<input type="checkbox" id="gounlock"> -- Freizuschaltende Themen<br>\
	<input type="checkbox" id="goreported"> -- Gemeldete Beiträge<br>\
	<input type="checkbox" id="gospacing"> ---- Größere Lücke zwischen Items<br>\
	<input type="checkbox" id="goai"> ---- AI-Unterstützung<br>\
	<input type="checkbox" id="goalert"> ---- Benutzer bei Beitragslöschung benachrichtigen<br>\
	<br><br>\
	<input type="checkbox" id="goposts"> Mod.-Funktionen in Beiträgen<br>\
	<input type="checkbox" id="gohidestrike"> -- Echten Verwarnungsknopf zeigen (neben dem Melde-Button)<br>\
	<input type="checkbox" id="goraster"> -- Detaillierte Verwarnungen<br>\
	<br><br>\
	<input type="checkbox" id="gosegration"> <span id="seginfo">Segregation von Benutzern im Profil anzeigen</span><br>\
	<input type="checkbox" id="hideseg"> Gruppenleitung verstecken<br>\
	<input type="checkbox" id="hidemod"> Moderationsanzeige verstecken<br>\
	\
	<input type="button" id="usesetting" value="Anwenden" style="float:right;">\
	</div>',1)
	$("#usesetting").click(function() { location.reload(); });
	$("#modset").find("input[type=checkbox]").each(function() {
		$(this).change(function() { 
			if( $(this).is(':checked') ) var chkd=1;
			else var chkd=0;
			GM_setValue($(this).attr("id"),chkd); 
		});
		if( GM_getValue($(this).attr("id"),"1")==1 ) $(this).attr("checked",true);
	});
	if($("#userMenuGroupManagement").length==0)
	{
		$("#gosegration").attr({"checked":false,"disabled":true});
		$("#seginfo").html('Segration Benutzern im Profil anzeigen<br>Dir fehlen die nötigen Rechte! Lass sie dir von <a href="http://forum.dsz-roleplay.de/index.php?page=User&userID=118">Meltl321</a> geben!<br>');
	} 
}

function reportdelete(rea,ziel,turl)
{
	var reas='Hallo '+ziel+',\n\
einer deiner Beiträge wurde grade gelöscht.\n\
Dies hat noch keine Konsequenzen für deinen Account, ist jedoch als Warnung zu verstehen und du solltest darauf achten,\n\
den entsprechenden Regelverstoß nicht zu wiederholen, weil sonst ernsthafte Konsequenzen für deinen Account folgen könnten.\n\
\n\
[b]Betroffener Beitrag:[/b] \n\
'+turl+'\n\
\n\
[b]Grund der Löschung:[/b] \n\
'+rea+'\n\
\n\
Mit freundlichen Grüßen,\n\
das Team von Die Sieben Zwerge Reallife';
	sendpn(ziel,"Einer deiner Beiträge wurde gelöscht",reas);
}

function go_ai(pid,option,action)
{
	if(GM_getValue("goai","1")!=1 || pagetype!=1) return false;
	var title=$(".gm_id_"+pid).find(".gm_open_tit").html();
	var msg=$(".gm_id_"+pid).find(".gm_open_tit").attr("title");
	if(action==undefined) var action=0;
	
	bfid = $("#userNote > a").text();

	GM_xmlhttpRequest({
		method:"POST",
		url:"http://absolut-fair.com/tsbot/bread-ai/index.php?action="+option+"&bfid="+escape(bfid)+"&do="+action,
		data: "title="+escape(title)+"&msg="+escape(msg),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload:function(resp) {
			var data=resp.responseText; //gibt integer wieder
			
			if(option=="learn") return 1;
			$(".action"+pid).append('<a href="#" onclick="return false;" style="color:black; text-decoration:none;" class="aiinfo2">[</a>');
			if((data.between("<hits>","</hits>"))>0)
			{
				var doit=data.between("<action>","</action>")-1;
				//$(".action"+pid).find("a:eq("+doit+")").css({"border-bottom":"5px solid red"}); //,"-webkit-filter":"grayscale(100%)","-moz-filter":"grayscale(100%)","-ms-filter":"grayscale(100%)","-o-filter":"grayscale(100%)"
				infotxt="Erfahrung von "+(data.between("<mod>","</mod>"))+" am "+(data.between("<time>","</time>"))+"\n\nUrsprünglicher Beitrag:\n"+(data.between("<keyword>","</keyword>"));
				$(".action"+pid).find("a:eq("+doit+")").clone().appendTo(".action"+pid);
			}
			else 
			{
				infotxt="Keine ähnlichen Erfahrungen vorhanden.\nLehr mich, Meister!";
				$(".action"+pid).append('<a href="#" onclick="return false;" class="aiinfo"><img src="http://absolut-fair.com/tsbot/bread-ai/robot.png"></a>');
			}
			$(".action"+pid).append('<a href="#" onclick="return false;" style="color:black; text-decoration:none;" class="aiinfo2">]</a>');
			$(".action"+pid).find(".aiinfo2, .aiinfo").attr("title",infotxt);
		}
	});
}

function gostrike(uid,pid,turli)
{
	$.get("http://forum.dsz-roleplay.de/index.php?form=UserWarn&userID="+uid,function(data) {
		var vws="";
		$(data).find(".formOptionsLong").find("li").each(function(i) {
			prephtml=$(this).text();

			var points=prephtml.between("(Punkte: ",",");
			var title=("]"+prephtml).between("] "," (");
			var mon=prephtml.between("Ablauf: "," Monat");
			var days=prephtml.between("Ablauf: "," Tag");
			days=days.replace(mon,"").replace(" Monat","").replace("e","").replace(",","").replace(" ","");
			
			vws=vws+"<input type='radio' name='reas' points='"+points+"' tite='"+title+"' mon='"+mon+"' days='"+days+"'>"+$(this).text()+"<br>";
		});
		openpop("Verwarnen",vws+"<br><a href='http://forum.dsz-roleplay.de/index.php?form=UserWarn&userID="+uid+"&objectType=post&objectID="+pid+"'>Verwarnung manuell vergeben</a><br><br><h3>Zusatzinformationen:</h3><textarea id='addinf'></textarea><br><input type='button' id='substrike' value='Absenden'>",1);
		$('#substrike').click(function() {
			var chosen = $('input[name="reas"]:checked');
			var tit=chosen.attr("tite");
			var po=chosen.attr("points");
			var mo=chosen.attr("mon");
			var da=chosen.attr("days");
			var rea=$("#addinf").val();
			
			if( GM_getValue("goraster","0")==1) 
			{
				var rea=' \n\n\
[b]Mehr Informationen:[/b]\n\
Gegen Dich wurde soeben wegen eines Regelverstoßes eine Verwarnung ausgesprochen.\n\
Bei weiteren Verwarnungen musst Du mit ernsthaften Konsequenzen rechnen, die Deine Mitgliedschaft in diesem Forum betreffen.\n\
\n\
[b]Die Verwarnung betrifft diesen Beitrag:[/b]\n\
[url='+turli+']siehe hier[/url]\n\
\n\
[b]Grund der Verwarnung:[/b]\n\
'+tit+'\n\
\n\
[b]Kommentar der Moderation:[/b]\n\
'+rea+'\n\
\n\
\n\
[b]Wann deine Verwarnung abläuft:[/b]\n\
[url=http://forum.dsz-roleplay.de/index.php?page=UserWarningOverview&userID='+uid+']siehe hier[/url]\n\
\n\
\n\
Mit freundlichen Grüßen\n\
Das Legend Generations Reallife Team'; 
			}
			
			$.post("http://forum.dsz-roleplay.de/index.php?form=UserWarn",{warningID:0,title:tit,points:po,expiresWeek:mo,expiresDay:da,expiresHour:0,reason:rea,userID:uid,objectID:pid,objectType:"post"},function() {
				disablePopup();
			});
		});
	});
	
}

function getnthhit(string,needle,hit)
{
	var lasthit = 0;
	for(var i=0;i<string.length;i++)
	{
		lasthit = string.indexOf(needle,lasthit+1);
		hit --;
		if(hit == 0) return lasthit;
	}
	return -1;
}

function removedisplay(pid)
{
	if(pagetype==1)
	{
		$('.gm_id_'+pid).fadeOut();
		hits-=1;
		if(hits<=0) $("#gm_list").fadeOut();
		else $("#gm_hits").text(hits);
		meldungweg(pid);
	}
	if(pagetype==2)
	{
		$("#postRow"+pid).addClass("deleted");
		meldungweg(pid);
	}
}

function sendpn(ziel,titel,inhalt,func) //ziel ist name als string
{
	$.get("http://forum.dsz-roleplay.de/index.php?form=PMNew",function(data) {
		var idh = $(data).find('input[name="idHash"]').val();
		$.post("http://forum.dsz-roleplay.de/index.php?form=PMNew",{recipients:ziel,blindCopies:"",subject:titel,text:inhalt,parseURL:1,showSignature:1,enableSmilies:1,enableBBCodes:1,activeTab:"smilies",send:"Absenden",pmID:0,forwarding:0,reply:0,replyToAll:0,idHash:idh},function(data) {
			if(func!=undefined) func();
		});
	});
}

function unlocktopic(decision,pid,usr,titel,tid,url)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(resp) {
			var conti=resp.responseText;
			var tempid = $(conti).find(".threadStarterPost").attr("id");

			if( "postRow"+pid == tempid) var isstarter=1;
			else var isstarter=0;

			GM_xmlhttpRequest({
				method: "GET",
				url: "http://forum.dsz-roleplay.de/index.php?form=PostEdit&postID="+pid,
				onload: function(data) {
					data=data.responseText;
					var content = escape($(data).find("#text").val());
					
					var url2;
					if(decision) url2="http://forum.dsz-roleplay.de/index.php?page=PostAction&action=enable&postID="+pid+"&t="+secid;
					else 
					{
						url2 = "http://forum.dsz-roleplay.de/index.php?page=PostAction&action=trash&postID="+pid+"&reason=&t="+secid;
						openpop("Begruendung",'<textarea id="declinereason" style="height:300px;" placeholder="Gib eine Begründung für die Ablehnung ein"></textarea><br><input type="submit" value="Absenden" id="sendreasonpn" style="float:right;">>',1);
						$("#sendreasonpn").click(function() { 
							disablePopup(); 
							var rea='Dein freizuschaltender Beitrag wurde abgelehnt.\n\n\
[b]Grund:[/b]\n\
'+$("#declinereason").val()+'\n\n\
Solltest du in Erwägung ziehen den Versuch zu wiederholen,\n\
beachte bitte diese Details.\n\n\
Dies ist der BB-Code deines Beitrages:\n\
[code]'+unescape(content)+'[/code]';
							sendpn(usr,"Abgelehnte Freischaltung: "+titel,rea); 
						});
					}

					GM_xmlhttpRequest({
						method: "GET",
						url: url2,
						onload: function() {
							$('.unlock_gm_id_'+pid).fadeOut();
							hits2-=1;
							if(hits2<=0) $("#gm_unlock").fadeOut();
							else $("#gm_hits2").text(hits2);

							if(!decision && isstarter) 
							{
								GM_xmlhttpRequest({
									method: "GET",
									url: "http://forum.dsz-roleplay.de/index.php?action=ThreadMove&threadID="+tid+"&boardID=105&withlink=0&t="+secid
								});
							}
						}
					});
				}
			});
		}
	});
}

function themaweg(pid,tid)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://forum.dsz-roleplay.de/index.php?page=ThreadAction&action=trash&threadID="+tid+"&reason=&t="+secid,
		onload: function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://forum.dsz-roleplay.de/index.php?action=ThreadMove&threadID="+tid+"&boardID=2&withlink=0"
			});
		}
	});
}

function meldungweg(pid)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://forum.dsz-roleplay.de/index.php?page=PostAction&action=removeReport&postID="+pid+"&t="+secid
	});
}

function beitragweg(pid,needreas,reas)
{
	if(needreas!=0) 
	{
		var reas = prompt("Grund ?", "");
		if(reas==null) return 0;
	}
	else 
	{
		if(reas==undefined) var reas="";
	}
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://forum.dsz-roleplay.de/index.php?page=PostAction&action=trash&postID="+pid+"&reason="+escape(reas)+"&t="+secid
	});
}

function addlist(howmany)
{
	$(".top5box").before('\
					<div class="info" id="gm_list" style="display:none;">\
				<p><span id="gm_hits">'+howmany+'</span> Meldung(en) warten auf Moderation:</p>\
				<ul class="gm_list">\
									</ul>\
			</div>');
}

function addunlock(howmany)
{
	$(".top5box").before('\
					<div class="info" id="gm_unlock">\
				<p><span id="gm_hits2">'+howmany+'</span> Themen warten auf Freischaltung:</p>\
				<ul class="gm_unlock">\
									</ul>\
			</div>');
}

function checkupdate()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://forum.dsz-roleplay.de/v-i-p/internes-forum/117796-trooper-s-schnellmoderation/#post1084465",
		onload: function(resp) {
			var conti=resp.responseText;
			var newvers = $(conti).find("#postText1084465").find("em:first").text();
			if( newvers>version && GM_getValue("bfmod_reminder",0)<version) 
			{
				//alert(unescape("Ein Update f%FCr die Schnellmoderation ist verf%FCgbar%21"));
				//GM_setValue("bfmod_reminder",version);
				//GM_openInTab("http://userscripts.org/scripts/show/135782");
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
	$("#popupContact > h1").html(titel);
	if(ishtml) $("#contactArea").html(text);
	else $("#contactArea").text(text);
	$("img","#contactArea").attr({src:"",alt:"Bild"});
	centerPopup();
	loadPopup(); 
	
	$("#contactArea").find("textarea").focus().keypress(function (e) {
		if (e.which == 13) {
			$("#contactArea").find('input[type="submit"]').click();
		}
	});
}

function initpop()
{	
	GM_addStyle("#backgroundPopup{  \
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
#popupContact{  \
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
#popupContact h1{  \
text-align:left;  \
color:#6FA5FD;  \
font-size:22px;  \
font-weight:700;  \
border-bottom:1px dotted #D3D3D3;  \
padding-bottom:2px;  \
margin-bottom:20px;  \
}  \
#popupContactClose{  \
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
	'<div id="popupContact">  '+
    '    <a id="popupContactClose">x</a> '+ 
    '    <h1></h1>  '+
    '    <p id="contactArea">  '+
    '    </p>  '+
    '</div> '+
	'<div id="backgroundPopup"></div>');
	
	$("#popupContactClose").click(function() {  
		disablePopup();  
	});  
	
	$("#backgroundPopup").click(function() {  
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
		$("#backgroundPopup").css({  
		"opacity": "0.7"  
		});  
		$("#backgroundPopup").fadeIn("fast");  
		$("#popupContact").fadeIn("fast");  
		popupStatus = 1;  
	}  
}  

function disablePopup(){   
if(popupStatus==1){  
$("#backgroundPopup").fadeOut("fast");  
$("#popupContact").fadeOut("fast");  
popupStatus = 0;  
}  
}  

function centerPopup(){
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $("#popupContact").height();
var popupWidth = $("#popupContact").width();
//centering
$("#popupContact").css({
"position": "fixed",
"top": windowHeight/2-popupHeight/2,
"left": windowWidth/2-popupWidth/2
});
}