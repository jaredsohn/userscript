// ==UserScript==
// @name          BF-Meldungen
// @namespace     absolut-fair.com
// @description   Bessere Verwaltung der Meldungen - NUR FÜR MODERATOREN
// @include       http://forum.sa-mp.de/*
// @include       https://forum.sa-mp.de/*
// @include       http://unban.breadfish-rp.de/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @updateURL     https://userscripts.org/scripts/source/135782.meta.js
// @downloadURL   https://userscripts.org/scripts/source/135782.user.js
// @version       3.1.3
// ==/UserScript==

var version=GM_info.script.version;
var popupStatus=0;
var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
var $_GET = getQueryParams(document.location.search);
secid=secid+sid;
var hits; //meldungen
var hits2; //freischalten
var lastid;
var pagetype=0;
var prot="http"; //http
var inhi_prof="";
var inhi_atmid = GM_getValue("inhi_lastid", 0);
var gagreflex = 0;

exceptions=new Array("goraster","gohidestrike","defmodbook","goinhibitor");
for(var i=0;i<exceptions.length;i++) if(GM_getValue(exceptions[i],"error")=="error") GM_setValue(exceptions[i],0);
defval = new Array();
defval["unbanfreq"] = 2;

deftemplates();

$(document).ready(function () { 
	initpop();
	
	if(GM_getValue("unlock_access",0)!=1) 
	{
		var isac=0;
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://absolut-fair.com/sampde_admin/auth.php?s="+secid,
			onload: function(response) {
				var resp = response.responseText;
				if(resp=="1")
				{
					GM_setValue("unlock_access",1);
					location.reload();
				}
				else isac=2;
			}
		});
		var chkint = setTimeout(function() {
			if(isac==2)
			{
				openpop("Zugriffsfehler",'<textarea style="width:400px; height:150px;" readonly>Die Schnellmoderation ist lediglich für Moderatoren gedacht - also nicht für dich. Bitte deinstalliere Sie wieder.\n\nEin Umgehen dieser Sperre stört leider den Betriebsfluss und wird entsprechend sanktioniert!</textarea>',1);
			}
			if(isac!=0) clearInterval(chkint);
		},1000);
		return;
	}
	
	if( need_update(GM_getValue("lastvers",'0.0.0'),version) && GM_getValue("showupdate",1) == 1 ) 
	{
		openpop("Preiset den Herrn!", '<audio id="loop" autoplay><source src="http://absolut-fair.com/sampde_admin/halleluja.wav" type="audio/wav" /></audio><div style="text-align:center; width:100%; margin-bottom:25px; margin-top:25px;">Die Schnellmoderation wurde geupdated</div><input type="button" value="Changelog" id="showchangelog"><input type="button" value="Weiter" style="float:right;" id="skipupdate">', 1);
		$("#showchangelog").click(function() { window.location="http://forum.sa-mp.de/interne-bereiche/v-i-p/internes-forum/117796-trooper-s-schnellmoderation/last-post/"; });
		$("#skipupdate").click(function() { disablePopup(); });
	}
	GM_setValue("lastvers",version);

	if( $(location).attr('href').indexOf("http://unban.breadfish-rp.de/") != -1) //unban forum
	{
		if( GM_getValue("paste_info","") != "" )
		{
			var txtarea = $("textarea#text");
			
			if( txtarea.length )
			{
				txtarea.text( GM_getValue("paste_info","") );
				$('input[value="Absenden"]').click();
				return;
			}
			else
			{
				var waiterval = setInterval(function() {
					//console.log($(".message").length+" messages\n"+window.location);
					if($(".message").length>0)
					{
						if( GM_getValue("unbaninfocheck_cleanclose",1) == 1 && $(".message").length>=2 && GM_getValue("paste_info_close",0) == 1)
						{
							var tid=GM_getValue("paste_info_tid",0);
							GM_setValue("paste_info_tid",0);
							
							GM_xmlhttpRequest({
								method: "POST",
								url: "http://unban.breadfish-rp.de/index.php",
								data: 'action=ThreadClose&threadID='+tid+'&x=13&y=7',
								headers : {
									"Content-Type":"application/x-www-form-urlencoded"
								}
							});
						}
						
						GM_setValue("paste_info",""); 
						clearInterval(waiterval);
					}
				},1000);
			}
		}
		return;
	}
	
	bfid = $("#userNote > a").attr("href");
	if( bfid.length)
	{
		bfid = bfid.replace(prot+"://forum.sa-mp.de/","");
		bfid = bfid.replace("index.php?page=User&amp;userID=","");
		bfid = bfid.replace("index.php?page=User&userID=","");
	}

	var tstamp = Math.floor(new Date().getTime() / (1000*60));

	if( GM_getValue("hidemod","1")==1) $("#userMenuModeration").remove();
	if( GM_getValue("goinhibitor",0)==1) 
	{
		$("#userMenu > ul").append('<li id="inhibitmenu"><a href="#" id="inhibit_act"><img src="http://icons.iconarchive.com/icons/calle/black-knight/16/Swords-icon.png" alt="" /> <span>Inhibitor</span></a></li>');
		$("#inhibit_act").click(function(e) { e.preventDefault(); actinhi(); });
		
		if( GM_getValue("inhi_running",0)==1 ) actinhi( GM_getValue("inhi_id","" ) );
	}
	
	$(".footerMenuInner").find("li.last").removeClass("last");
	$(".footerMenuInner > ul").append('<li class="last"><a href="#" onclick="return false;" class="modsetting"><img src="'+prot+'://forum.sa-mp.de/wcf/icon/acpS.png"><span>BF-Mod</span></a></li>');
	$(".modsetting").click(function() { settings(); });
	
	//je nach forenbereich
	if( $("#tplIndex").length>0) pagetype=1; 
	if( $("#tplThread").length>0) pagetype=2; 
	if( $("#tplUserProfile, #tplUserThankList, #tplUserFriendList, #tplUserWarningOverview").length>0) pagetype=3;
	
	if($("#userPanel").length>0 && $("#sitemapButton").length==0) //acp deaktiviert das?!
	{
		if( $("#userMenuGroupManagement").length==0) GM_setValue("gosegration","0");
		else { if( GM_getValue("hideseg","1")==1) $("#userMenuGroupManagement").css("display","none"); }
	}
	
	if( GM_getValue("checkunban","1")==1 && GM_getValue("lastunbancheck","0") < (tstamp - (GM_getValue("unbanfreq",defval["unbanfreq"])*60))) 
	{
		checkunban(tstamp); 
	}
	//checkunban(tstamp); 
	
	if(pagetype==1 && GM_getValue("goindex","1")==1) initindex();
	if(pagetype==2 && GM_getValue("goposts","1")==1) initposts();
	if(pagetype==3) initprofile();
	
	//variable aktionen
	$(".gm_open_tit").live("click",function() {
		openpop("Gemeldeter Beitrag", '<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
	$(".gm_report_txt").live("click",function() {
		openpop("Meldungsbeschreibung", '<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
	$(".flush").live("click",function() {
		var pID = getinfo("pid");
		
		removedisplay(pID);
	});
	$(".movetop").live("click",function() { 
		var tid = getinfo("tid");
		var pID = getinfo("pid");

		gomove(tid,pID);
	});
	$(".reject").live("click",function() {
		var pID = getinfo("pid");
		var autor = getinfo("reportby");
		var turl = getinfo("thema_url");
		
		openpop("Meldung zurückweisen",'<textarea id="rej_rea" style="width:400px; height:325px;" placeholder="Grund?"></textarea><br><input type="submit" id="rej_sub" value="Senden" style="float:right;">',1);
		$("#rej_sub").click(function() {
			var rea=behilfsumlaute($("#rej_rea").val());
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
das Team von SA-MP.de';
			disablePopup();
			sendpn(autor,"Deine Meldung wurde zurückgewiesen",reas);
			removedisplay(pID);
		});
	});
	$("#repexpinfo").live("click",function() {
		if( $(this).html()=='▼' ) //srsly?!
		{
			var topictitels="";
			$("div.indexhit").each(function() {
				topictitels=topictitels+'<br><a href="#" style="text-decoration:none; color: rgb(0, 102, 255);" onclick="return false;" class="jumprep" repid="'+$(".indexid",this).text()+'">'+$(".forum",this).text()+' > '+$(".prefix",this).text()+' '+$(".thema",this).text()+'</a>';
			});
			$(this).html('&#9650;');
			$("#regexpcont").html(topictitels);
		}
		else
		{
			$(this).html('&#9660;');
			$("#regexpcont").html("");
		}
	});
	$(".jumprep").live("click",function() {
		jumptomeld( $(this).attr("repid") );
	});
	$(".previous").live("click",function() {
		var atmpos = parseInt($("#gm_atmpos").text())-1;
		if(atmpos<=0) return false;
		$("#gm_atmpos").text(atmpos);
		
		switchnextmeld();
	});
	$(".next").live("click",function() {
		var atmpos = parseInt($("#gm_atmpos").text())+1;
		if(atmpos>parseInt($("#gm_hits").text())) return false;
		$("#gm_atmpos").text(atmpos);
		
		switchnextmeld();
	});
	$(".remove").live("click",function() {
		var pID = getinfo("pid");
		var autor = getinfo("autor");
		var turl = getinfo("thema_url");
		var uid = getinfo("uid");
		
		openpop("Beitrag löschen",'<textarea style="width:400px; height:325px;" id="del_rea" placeholder="Grund?"></textarea><br><input type="checkbox" id="addkom"> Im Modbuch vermerken <input type="submit" id="del_sub" value="Löschen" style="float:right;">',1);
		if( GM_getValue("defmodbook",0)==1 ) $("#addkom").attr("checked",true);
		$("#del_sub").click(function() {
			var reas = $("#del_rea").val();
			
			if( $("#addkom").is(':checked')) addkom=1;
			else addkom=0;
			
			if(reas==null) return 0;
			disablePopup();
			beitragweg(pID,0,reas);
			removedisplay(pID);
			if(GM_getValue("goalert","1")==1 && reas.length>=1) reportdelete(reas,autor,turl,pID,uid,addkom);
		});
	});
	$(".removestrike").live("click",function() {
		var pID = getinfo("pid");
		var uid = getinfo("uid");
		var turl= getinfo("thema_url");
		gostrike(uid,pID,turl);
		removedisplay(pID);
		beitragweg(pID,0);
	});
	$(".strike").live("click",function() {
		var pID = getinfo("pid");
		var uid = getinfo("uid");
		var turl= getinfo("thema_url");

		gostrike(uid,pID,turl);
		removedisplay(pID);
	});
	$(".removetop").live("click",function() {
		var pID = getinfo("pid");
		var tid = getinfo("tid");
		var autor = getinfo("autor");
		var turl = getinfo("thema_url");
		var uid = getinfo("uid");
		
		openpop("Thema löschen",'<textarea style="width:400px; height:325px;" id="del_top_rea" placeholder="Grund?"></textarea><br><input type="checkbox" id="addkom"> Im Modbuch vermerken <input type="submit" id="del_top_sub" value="Löschen" style="float:right;">',1);
		if( GM_getValue("defmodbook",0)==1 ) $("#addkom").attr("checked",true);
		$("#del_top_sub").click(function() {
			var reas = $("#del_top_rea").val();
			
			if( $("#addkom").is(':checked')) addkom=1;
			else addkom=0;
			
			if(reas==null) return 0;
			disablePopup();
			removedisplay(pID);
			themaweg(pID,tid);
			if(GM_getValue("goalert","1")==1 && reas.length>=1) reportdelete(reas,autor,turl,pID,uid,addkom);
		});
	});
	$(".striketop").live("click",function() {
		var pID = getinfo("pid");
		var tid = getinfo("tid");
		var uid = getinfo("uid");
		var turl= getinfo("thema_url");

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
				var uid = $(conti).find(".threadStarterPost").find(".userName").find("a").attr("href").replace(prot+"://forum.sa-mp.de/index.php?page=User&userID=","");
				
				gostrike(uid,pID,turl);
			}
		});
		themaweg(pID,tid);
		removedisplay(pID);
	});
	$(".banit").live("click",function() {
		var pID = getinfo("pid");
		var uid = getinfo("uid");
		var turl= getinfo("thema_url");

		openpop("Benutzer sperren",'<textarea style="width:400px; height:325px;" id="bn_rea" placeholder="Grund?"></textarea><br><input type="submit" id="bn_sub" value="Sperren" style="float:right;">',1);
		$("#bn_sub").click(function() {
			var bangrund=$("#bn_rea").val();
			if(bangrund==null) return 0;
			disablePopup();
			removedisplay(pID);
			beitragweg(pID,0,bangrund);
			
			var bfalias = $("#userNote > a").text();
			bangrund=behilfsumlaute(bangrund)+" -by "+bfalias;
			
			GM_xmlhttpRequest({
				method: "GET",
				url: prot+"://forum.sa-mp.de/index.php?action=UserProfileBan&userID="+uid+"&banReason="+escape(bangrund)+"&t="+secid
			});
		});
	});
			
	$(".unlock_gm_open_tit").live("click",function() {
		openpop("Freizuschaltendes Thema", '<textarea style="width:400px; height:325px;" readonly>'+unescape($(this).attr("title"))+'</textarea>' , 1);
	});
	$(".unlock_accept").live("click",function() {
		unlocktopic(1, getinfo("pid"), getinfo("autor"), getinfo("thema"), getinfo("tid"), getinfo("thema_url")); 
	});
	$(".unlock_remove").live("click",function() {
		unlocktopic(0, getinfo("pid"), getinfo("autor"), getinfo("thema"), getinfo("tid"), getinfo("thema_url"));
	});
});

function initposts()
{
	$('a[title="Verwarnen"]').addClass("oldbust");
	if(GM_getValue("gohidestrike",0)==0) $(".oldbust").closest("li").css({display:"none"});
	$('a').has('img[src="icon/userIPLogRegistrationIPAddressS.png"]').remove();
	$('a').has('span[style="font-size:0.8em"]').remove();
	
	$('.userAvatar > a').mousedown(function(e) {
		gagreflex = setTimeout(function() { 
			if(e.which != 3) return; //rechts
			$('.userAvatar > a > img').attr("src","http://img1.picload.org/image/lrpgiid/giphy.gif");
		}, 2500);
	}).bind('mouseup mouseleave', function(e) {
		clearTimeout(gagreflex);
	});
	
	$(".messageContent").each(function() {
		if( $(".oldbust",this).length==0) return true;
		var pid=$("div:first",$(".messageBody",this)).attr("id").replace("postText","");
		var uid=$(".oldbust",this).attr("href").between("userID=","&");
		//var turl=window.location;
		var turl=$(".messageCount",this).find("a").attr("href");
		var tid=unsafeWindow.threadID;
		var autor=$(this).parent(".messageInner").find(".userName").find("a").attr("title").replace("Benutzerprofil von »","").replace("« aufrufen",""); 

		$("ul",$(".smallButtons",this)).prepend('\
		<div class="postmodinfo" id="postid'+pid+'" style="float:left;">\
			<div class="secinfo" style="display:none">\
				<div class="pid">'+pid+'</div>\
				<div class="uid">'+uid+'</div>\
				<div class="thema_url">'+turl+'</div>\
				<div class="tid">'+tid+'</div>\
				<div class="autor">'+autor+'</div>\
			</div>\
			<li><a href="#" onclick="return false;" class="banit"><img src="wcf/icon/bannedS.png" alt="" title="Benutzer sperren"/></a></li>\
			<li><a href="#" onclick="return false;" class="movetop"><img src="wcf/icon/messageQuickReplyM.png" style="width:16px; height:16px;" title="Verschieben"></a></li>\
			<li><a href="#" onclick="return false;" class="striketop"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-red-icon.png" alt="" title="Thema entfernen und verwarnen"/></a></li>\
			<li><a href="#" onclick="return false;" class="removetop"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-blue-full-icon.png" alt="" title="Thema entfernen"/></a></li>\
			<li><a href="#" onclick="return false;" class="removestrike"><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/16/Male-User-Warning-icon.png" alt="" title="Verwarnen und löschen"/></a></li>\
			<li><a href="#" onclick="return false;" class="remove"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png" alt="" title="Löschen" /></a></li>\
			<li><a href="#" onclick="return false;" class="strike"><img src="wcf/icon/infractionWarningS.png" alt="" title="Verwarnen" /></a></li>\
		</div>');
		
		if(GM_getValue("goshowbook",1)==1)
		{
			var that=this;
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://absolut-fair.com/sampde_admin/userinfo.php?action=count&uid="+uid,
				onload:function(data) {
					data=data.responseText;
					
					if(data=="none") return 1;
					
					mult = data.substr(0,1);
					data = data.substr(1,data.length);
					
					var sidebar = $(that).closest(".messageInner").find(".messageSidebar");
					//if(!$(".userSymbols > ul",sidebar).length) $(".userCredits",sidebar).before('<div class="userSymbols"><ul></ul></div>');
					$(".userMessenger > ul",sidebar).append('<li><a href="'+prot+'://forum.sa-mp.de/index.php?page=User&userID='+uid+'&modbook=go" style="text-decoration:none;"><img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Mimetypes-x-office-address-book-icon.png" title="Moderationsbuch öffnen" /><sub style="margin-left:2px;">'+data+'</sub></a></li>');
					if(!mult || mult>2) return 1;
					
					switch(mult)
					{
						case "1":
							var imgsrc = "http://forum.sa-mp.de/wcf/icon/groupM.png";
							var imgdesc = "Bekannter Multiaccount";
							break;
						case "2":
							var imgsrc = "http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/16/Male-User-Warning-icon.png"; 
							var imgdesc = "Negativ auffälliger Account";
							break;
					}
					$("p.userName > img", sidebar).attr({"src":imgsrc, "title":imgdesc}).css({"width":"16px","height":"16px"});
					//$(".userName",sidebar).prepend('<img src="'+imgsrc+'" title="'+imgdesc+'" />');
				}
			});
		}
	});
	
	$(".postmodinfo > li > a").live("click",function() {
		lastid = $(this).closest(".postmodinfo").attr("id"); 
	});
}

function initindex()
{
	if(GM_getValue("goreported","1")==1)
	{
		//Gemeldete Beiträge
		GM_xmlhttpRequest({
			method: "GET",
			url: prot+"://forum.sa-mp.de/index.php?page=ModerationReports",
			onload: function(resp) {
				var conti=resp.responseText;
				var obj = $(conti).find(".message");
				hits = obj.length;
				if( hits <= 0) return false; //keine Meldungen
				
				addlist(hits);
				var startind = $(".indexid").length-1;
				
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
					var uid = autor_url.replace(prot+"://forum.sa-mp.de/index.php?page=User&userID=","");
					
					if(thema.length<40) var thema_short=thema;
					else var thema_short=thema.substr(0,40)+"[...]";
					
					if(forum.length>20) var forumshort=forum.substr(0,20)+"[...]";
					
					var indid = startind+i+1;
					$("#secret_info").append('\
					<div class="gm_id_'+pid+' indexhit">\
						<div class="indexid">'+indid+'</div>\
						<div class="pid">'+pid+'</div>\
						<div class="uid">'+uid+'</div>\
						<div class="tid">'+tid+'</div>\
						<div class="autor">'+autor+'</div>\
						<div class="autor_url">'+autor_url+'</div>\
						<div class="reportby">'+reportby+'</div>\
						<div class="reportby_url">'+reportby_url+'</div>\
						<div class="reporttxt">'+reporttxt+'</div>\
						<div class="forum">'+forum+'</div>\
						<div class="prefix">'+prefix+'</div>\
						<div class="thema">'+thema+'</div>\
						<div class="thema_url">'+thema_url+'</div>\
					</div>');
					
					$(".action"+pid).find("a").each(function(i) {
						$(this).live("click",function(e) {
							e.preventDefault();
						});
					});
					if( i == hits-1) 
					{
						switchnextmeld();
						$("#gm_list").fadeIn("slow");
						if( GM_getValue("gospacing",1) ) $(".indexhit").css("margin-bottom","15px");
					}
				});
			}
		});
	}
	if(GM_getValue("gounlock","1")==1) 
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: prot+"://forum.sa-mp.de/index.php?page=ModerationHiddenPosts",
			onload: function(resp) {
				var conti=resp.responseText;
				var obj = $(conti).find("div.messageInner");
				hits2 = obj.length;
				if( hits2 <= 0) return false; //keine
				hits+=hits2;
				
				addlist(hits2);
				var startind = $(".indexid").length-1;
				
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
					var uid = autor_url.replace(prot+"://forum.sa-mp.de/index.php?page=User&userID=","");
					turl = titel_url.split("/");
					var forum = $(".breadCrumbs > li:first > a",this).text();

					var endturl="";
					for(var o=0;o<=25;o++)
					{
						if( /\d/.test(turl[o])) break;
						endturl = endturl+"/"+turl[o];
					}
					endturl = endturl+"/"+tid+"-lol/";
					endturl = endturl.substr(1,endturl.length-1);
					endturl = endturl+"#post"+pid;
					
					var indid = startind+i+1;
					$("#secret_info").append('\
					<div class="gm_id_'+pid+' indexhit">\
						<div class="isunlock">1</div>\
						<div class="indexid">'+indid+'</div>\
						<div class="pid">'+pid+'</div>\
						<div class="uid">'+uid+'</div>\
						<div class="tid">'+tid+'</div>\
						<div class="autor">'+autor+'</div>\
						<div class="autor_url">'+autor_url+'</div>\
						<div class="forum">'+forum+'</div>\
						<div class="prefix">'+prefix+'</div>\
						<div class="thema">'+titel+'</div>\
						<div class="thema_url">'+endturl+'</div>\
					</div>');
					
					$(".action"+pid).find("a").each(function(i) {
						$(this).live("click",function(e) {
							e.preventDefault();
						});
					});

					if( i == hits2-1) 
					{
						switchnextmeld();
						$("#gm_list").fadeIn("slow");
						if( GM_getValue("gospacing",1) ) $(".indexhit").css("margin-bottom","15px");
					}
				});
			}
		});
	}
}

function initprofile() 
{
	var uid=$('input[name="userID"]').val();
	
	//modbuch
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://absolut-fair.com/sampde_admin/userinfo.php?action=count&uid="+uid,
		onload:function(data) {
			data=data.responseText;
			var addin="";
			if(data!="none") addin = "("+data.substr(1,data.length)+")";
			multi = data.substr(0,1);
			
			if(multi=="1") $(".userName").prepend('<img src="http://forum.sa-mp.de/wcf/icon/groupM.png" title="Bekannter Multiaccount" />'); 
			if(multi=="2") $(".userName").prepend('<img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/16/Male-User-Warning-icon.png" title="Negativ auffälliger Account" />');

			if($(".tabMenu > ul").length)
			{
				$(".tabMenu:first > ul").append('\
				<li><a href="#" onclick="return false;" id="mod_book"><img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/24/Mimetypes-x-office-address-book-icon.png" alt="" /> <span>Moderationsbuch '+addin+'</span></a></li>\
				');
			}
			else
			{
				$(".userCardOptions > ul").append('\
				<li><a href="#" onclick="return false;" id="mod_book" title="Moderationsbuch"><img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/24/Mimetypes-x-office-address-book-icon.png" alt="" /> <span>Moderationsbuch '+addin+'</span></a></li>\
				');
			}
			
			if( $_GET["modbook"] == "go") $("#mod_book").click();
		}
	});
	
	$("#mod_book").live("click",function() {
		$("li.activeTabMenu").removeClass("activeTabMenu");
		$(this).closest("li").addClass("activeTabMenu");
		$(".columnContainer, .tabMenuContent").html('\
			<div class="container-1 column first">\
				<div class="columnInner">\
					<div class="contentBox">\
						<h3 class="subHeadline">Moderationsbuch</h3>\
						<table class="tableList membersList">\
							<thead>\
								<tr class="tableHead">\
									<th class="columnPosts"><div><a href="#">Kommentar</a></div></th>\
									<th class="columnUsername"><div><a href="#">Moderator</a></div></th>\
									<th class="columnLastActivity"><div><a href="#">Zeitpunkt</a></div></th>\
									<th><div><a href="#"></a></div></th>\
								</tr>\
							</thead>\
							<tbody id="modkommis">\
								<tr class="container-1">\
									<td class="columnPosts"><p><textarea style="resize:none;" id="mod_add_komtxt"></textarea></p></td>\
									<td class="columnUsername" style="text-align:center;">'+($("#userNote > a").text())+'</td>\
									<td class="columnLastActivity"><a href="#" onclick="return false;" id="mod_add_book" style="margin:auto;"><img title="Kommentar hinzufügen" src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/32/Comment-add-icon.png"></a></td>\
									<td></td>\
								</tr>\
						</tbody>\
					</table>\
					</div>\
				</div>\
			</div>\
		');
		if($(".tabMenuContent").length) $("div.container-1").css({"width":"100%","display":"block"});
		
		$("#modkommis").prepend('\
			<tr id="loadmodbookentry">\
				<td class="columnPosts"><p style="max-height:50px;">Daten werden geladen...</p></td>\
				<td class="columnUsername" style="text-align:center;"><img src="http://absolut-fair.com/wbb_back/loading2.gif"></td>\
				<td class="columnLastActivity"></td>\
				<td></td>\
			</tr>\
			');
		
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://absolut-fair.com/sampde_admin/userinfo.php?action=read&uid="+uid+"&s="+secid,
			onload:function(data) {
				data=data.responseText;
				$("#loadmodbookentry").remove();
				if(data=="0") return 1;
				
				var obj = jQuery.parseJSON(data);
				var switcha=true;
				$.each(obj.data,function(key,val) {
					if(switcha) var cont="1";
					else var cont="2";
					switcha=!switcha;
					
					
					$("#modkommis").prepend('\
					<tr class="container-'+cont+'">\
						<td class="columnPosts"><p style="max-height:50px;">'+decodeURIComponent(val.kommentar)+'</p></td>\
						<td class="columnUsername" style="text-align:center;"><a style="text-decoration:none; color: rgb(87, 89, 90);" href="'+prot+'://forum.sa-mp.de/index.php?page=User&userID='+val.adminid+'">'+val.adminname+' &raquo;</a></td>\
						<td class="columnLastActivity">'+val.readtime+'</td>\
						<td><a href="#" class="remmodbook" onclick="return false;" title="Eintrag entfernen" admid="'+val.adminid+'" entryid="'+val.id+'"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png"></a></td>\
					</tr>\
					');
				});
				$(".remmodbook").each(function() {
					if( $(this).attr("admid")!=bfid) $(this).remove();
					var mykom = $(this).closest("tr").find(".columnPosts > p").text();
					if( mykom.indexOf("Segregationskommentar:") != -1 || mykom.indexOf("Benutzer wieder integriert") != -1) $(this).remove(); 
				});
				

				$(".remmodbook").live("click",function() {
					$(this).closest("tr").remove();
					
					var entry=$(this).attr("entryid");
					
					GM_xmlhttpRequest({
						method:"GET",
						url:"http://absolut-fair.com/sampde_admin/userinfo.php?action=remove&id="+entry+"&s="+secid
					});
				});
			}
		});
		
		$("#mod_add_book").click(function() {
			var kommi = $("#mod_add_komtxt").val();
			if(kommi.length<=2) return alert("Kein Kommentar angegeben!");
			
			addkommi(uid,kommi,function() { $("#mod_book").click(); });
		});
	});

	if(GM_getValue("gosegration","1")==1)
	{
		//segregation
		$(".userCardOptions > ul").append('\
		<li><a href="#" onclick="return false;" id="mod_segration" title="Benutzer segregieren"><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/24/door-out-icon.png" alt="" /> <span>Benutzer segregieren</span></a></li>\
		<li><a href="#" onclick="return false;" id="mod_integration" title="Benutzer integrieren"><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/24/door-in-icon.png" alt="" /> <span>Benutzer integrieren</span></a></li>');
		
		$("#mod_segration").live("click",function() {
			var rea = prompt(unescape("Bitte gib einen Grund ein%21%0A%0ADieser dient anderen Moderatoren f%FCr eine Erkennung%2C%0Awarum einzelne Benutzer segregiert sind."),""); 
			if(rea.length<=2) return 1;
			
			var thisman = $(".headlineContainer > h2 > a").text();
			thisman = thisman.replace("Profil von &raquo;","");
			thisman = thisman.replace("&laquo;","");
			thisman = thisman.replace("«","");
			thisman = thisman.replace("Profil von »","");
			GM_xmlhttpRequest({
				method:"POST",
				url: prot+"://forum.sa-mp.de/index.php?form=UserGroupAdministrate",
				data: "usernames="+thisman+"&&groupID=19&pageNo=1",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload:function(resp) {
					addkommi(uid,"Segregationskommentar: "+rea);
					alert("Benutzer erfolgreich segregiert.\nEr kann nun in Hilfebereichen keine Themen erstellen bis er wieder manuell integriert wird");
				}
			});
		});
		$("#mod_integration").live("click",function() {
			var thisman = uid; 
			GM_xmlhttpRequest({
				method:"POST",
				url: prot+"://forum.sa-mp.de/index.php?action=UserGroupMemberRemove",
				data: "userIDs%5B%5D="+thisman+"&groupID=19&t="+secid,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload:function(resp) {
					addkommi(thisman, "Benutzer wieder integriert");
					alert("Der Benutzer wurde erfolgreich integriert und kann nun wieder Hilfethemen erstellen");
				}
			});
		});
	}
}

function actinhi(uid)
{
	if( inhi_prof.length >= 1 ) 
	{
		$("#inhibit_act > img").attr("src","http://icons.iconarchive.com/icons/calle/black-knight/16/Swords-icon.png");
		$("#inhibit_act > span").text("Inhibitor");
		inhi_prof = "";
		GM_setValue("inhi_running",0);
		return clearInterval(inhi_timer);
	}
	
	if( uid == undefined || uid.length == 0)
	{
		profurl = prompt("Der Inhibitor bekaempft sich sofort neu registrierende Stoerenfriede. \
Dabei wird ein vorhandenes Profil analysiert und regelmaessig die Neuregistrierungen auf diese Merkmale ueberprueft. \
Moegliche Treffer werden eingeblendet und koennen direkt gesperrt werden.\n\n\
Bitte gib ein Link zum Profil des unerwuenschten Users ein:","");
		if( !profurl || !profurl.length ) return;
		
		inhi_prof = profurl;
		GM_setValue("inhi_id", profurl);
		GM_setValue("inhi_running",1);
	}
	else
	{
		inhi_prof = uid;
	}
	
	inhi_info = analyseprof(inhi_prof);
	$("#inhibit_act > img").attr("src","http://forum.sa-mp.de/wcf/icon/onlineS.png");
	$("#inhibit_act > span").text("Inhibitor aktiv");
	
	var inhi_running=0;
	inhi_timer = setInterval(function() {
		if(inhi_running) return;
		inhi_running = 1;
		
		GM_xmlhttpRequest({
			method: "GET",
			url: prot+"://forum.sa-mp.de/index.php?page=MembersList&letter=&searchID=0&pageNo=1&sortField=registrationDate&sortOrder=DESC",
			onload:function(resp) {
				data = resp.responseText;
				
				var sessnewest=0;
				$(data).find(".membersList > tbody").find("tr").each(function() {
					var profid = $(".columnPosts > a", this).attr("href") + "&";
					profid = profid.between("userID=","&");
					//alert(profid+"\n"+inhi_atmid);
					
					if( profid > sessnewest) sessnewest = profid;
					if( profid <= inhi_atmid ) return false;
					//alert("still:"+profid);
					if( $(".columnUsername",this).html().indexOf("wcf/icon/userRankBanned.png") != -1 ) return true;
					
					var profinf = analyseprof("http://forum.sa-mp.de/index.php?page=User&userID="+profid);
					if( profinf[0].indexOf(inhi_info[0]) != -1 || inhi_info[0].indexOf(profinf[0]) != -1) return askban(profid,profinf[0],"Namensaehnlichkeit");
					if( profinf[1] == inhi_info[1]) return askban(profid,profinf[0],"Mail-Provider: "+inhi_info[1]);
					if( profinf[2] == inhi_info[2]) return askban(profid,profinf[0],"IP-Range: "+inhi_info[2]);
				});
				inhi_atmid = sessnewest;
				GM_setValue("inhi_lastid",inhi_atmid);
				//alert("atmid:"+inhi_atmid);
				inhi_running = 0;
			}
		});
	},15*1000);
}

function askban(id,usr, msg)
{
	var confi = confirm("Der Inhibitor hat einen Treffer gelandet.\n\nUser: "+usr+"\n"+msg);
	if( confi )
	{
		var bfalias = $("#userNote > a").text();
		bangrund="Inhibitorhinweis -by "+bfalias;
			
		GM_xmlhttpRequest({
			method: "GET",
			url: prot+"://forum.sa-mp.de/index.php?action=UserProfileBan&userID="+id+"&banReason="+escape(bangrund)+"&t="+secid
		});
	}
}

function analyseprof(url)
{
	var resp = GM_xmlhttpRequest({
		method: "GET",
		url: url,
		synchronous:true
	});
	
	var data = resp.responseText;
	var inhiinfo = new Array();
	inhiinfo[0] = $(data).find(".userName > span").text(); //name
	
	$(data).find(".pageMenu > .twoRows").find("li").each(function() { //email
		if( $(this).html().indexOf("wcf/icon/emailM.png")!=-1 )
		{
			inhiinfo[1] = $(this).find("a > span").text();
			return false;
		}
	});
	inhiinfo[1] = inhiinfo[1].split("@");
	inhiinfo[1] = inhiinfo[1][1];

	$(data).find(".dataList").find(".containerContent").each(function() {
		var thisinf = $(this).find("h4.smallFont");
		if( thisinf.length && thisinf.text() == "Registrierungs-IP" )
		{
			inhiinfo[2] = $(this).find("p").text();
			return false;
		}
	});
	inhiinfo[2] = inhiinfo[2].split(".");
	inhiinfo[2] = inhiinfo[2][0]+"."+inhiinfo[2][1]+"."+inhiinfo[2][2];
	//alert(inhiinfo[0]+"\n"+inhiinfo[1]+"\n"+inhiinfo[2]);
	return inhiinfo;
}

function deftemplate(id,txt)
{
	if( GM_getValue(id,"") == "" ) GM_setValue(id,txt);
}

function deftemplates() 
{
	deftemplate("delete_template",'Hallo %1%,\n\
einer deiner Beiträge wurde gerade gelöscht.\n\
Dies hat noch keine Konsequenzen für deinen Account, ist jedoch als Warnung zu verstehen und du solltest darauf achten,\n\
den entsprechenden Regelverstoß nicht zu wiederholen, weil sonst ernsthafte Konsequenzen für deinen Account folgen könnten.\n\
\n\
[b]Betroffener Beitrag:[/b] \n\
[quote=\'%1%\',\'%2%\']\
%3%\
[/quote]\
\n\
[b]Grund der Löschung:[/b] \n\
%4%\n\
\n\
Mit freundlichen Grüßen,\n\
das Team von SA-MP.de');
	
	deftemplate("advanced_warn_template",' \n\n\
[b]Mehr Informationen:[/b]\n\
Gegen Dich wurde soeben wegen eines Regelverstoßes eine Verwarnung ausgesprochen.\n\
Bei weiteren Verwarnungen musst Du mit ernsthaften Konsequenzen rechnen, die Deine Mitgliedschaft in diesem Forum betreffen.\n\
\n\
[b]Die Verwarnung betrifft diesen Beitrag:[/b]\n\
[url=%1%]siehe hier[/url]\n\
\n\
[b]Grund der Verwarnung:[/b]\n\
%2%\n\
\n\
[b]Kommentar der Moderation:[/b]\n\
%3%\n\
\n\
\n\
[b]Wann deine Verwarnung abläuft:[/b]\n\
[url='+prot+'://forum.sa-mp.de/index.php?page=UserWarningOverview&userID=%4%]siehe hier[/url]\n\
\n\
\n\
Mit freundlichen Grüßen\n\
Das SA-MP.de Team');

	deftemplate("unlock_deny_template",'Dein freizuschaltender Beitrag wurde abgelehnt.\n\n\
[b]Grund:[/b]\n\
%1%\n\n\
Solltest du in Erwägung ziehen den Versuch zu wiederholen,\n\
beachte bitte diese Details.\n\n\
Dies ist der BB-Code deines Beitrages:\n\
[code]%2%[/code]');

	deftemplate("unban_info_warn_template","[b]Letzte Verwarnung[/b]\n[list][*]Verwarnung von %1%\n[*]Beitrag: [url=%4%]%5%[/url]\n[*]Grund: %2%\n[*]Zeitpunkt: %3%[/list]");
	deftemplate("unban_info_ban_template","[b]Aktuelle Sanktion[/b]\n[list][*]%1%\n[*]Ablauf: %2%\n[/list]\n%3%");
	deftemplate("unban_info_header_template","Dies ist eine [b]automatisierte Nachricht[/b] um dich über deinen Sperrstatus aufzuklären!\nSolltest du permanent gesperrt sein, eröffne bitte einen neuen, direkt adressierten Entsperrantrag an den jeweiligen Moderator!\nSolltest du nur für zwei Wochen gesperrt sein, ist ein Entsperrantrag nicht möglich!\n_________________________________________\n\n%1%%2%"); 
}

function filltemplate(template, fillar) 
{
	for(var i=0; i < fillar.length; i++)
	{
		template = template.replaceAll('%'+(i+1)+'%', fillar[i]);
	}

	return template;
}

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};

function gomove(tid,pid) 
{
	GM_xmlhttpRequest({
		method: "GET",
		url: prot+"://forum.sa-mp.de/v-i-p/internes-forum/117796-trooper-s-schnellmoderation/",
		onload: function(resp) {
			var conti=resp.responseText;
			
			var resarr = new Array();
			var arrcount = [0,0];
			$(conti).find("#threadMoveLinkMenu > ul").find("li").each(function() {
				var txt = $("a",this).text();
				if( !txt.length) return 1;
				var nummin = occurrences(txt,"-");
				txt = txt.split("--").join("");

				if( txt.indexOf("(Kategorie)")!=-1 || nummin==0) 
				{
					arrcount[0]++;
					arrcount[1]=0;
					resarr[arrcount[0]] = new Array();
					txt = txt.replace("(Kategorie)","");
					nummin=0;
					bid="";
				}
				else 
				{
					if( txt.indexOf("Internes Forum")!=-1) bid=19; //bugfix
					else bid = $("a",this).attr("href").between("&boardID=","'");
				}

				resarr[arrcount[0]][arrcount[1]] = [txt,bid,nummin];
				arrcount[1]++;
			});
			
			openpop("Thema verschieben",'<input type="text" id="searchboard" style="width:100%;" placeholder="Forenname bzw. Teile"><div id="searchres" style="margin-top:10px;"></div><br><input type="checkbox" id="addkom"> Verlinkung erstellen <input type="submit" id="del_sub" value="Verschieben" style="float:right;">',1);
			$("#addkom").attr("checked",true);
			$("#searchboard").focus();
			$("#searchboard").keypress(function(e) {
				var term = $(this).val().toLowerCase();
				if(term.length<=2) return $("#searchres").html("");
			
				if( e.which == 13 ) return $("#del_sub").click();
				
				$("#searchres").html("Suchergebnisse:<br><br>");
				
				$.each(resarr,function(key,val) {
					if( val == undefined || val[0] == undefined) return 1;
					
					$.each(val,function(key2,val2) {
						if( key2 == 0) return 1; //kategorien darf man nich
						var tsearch = val2[0].toLowerCase();

						if( tsearch.indexOf(term)!=-1)
						{
							calcocc=val2[2]-2;
							calccat=0;
							
							var lastresu="",catresu="";
							$.each(val,function(tk,tv) {
								if( tk >= key2) return false;

								if(tv[2] == calccat) catresu = tv[0].split("--").join("");
								if(tv[2] == calcocc) lastresu = tv[0].split("--").join("");
							});
							if( lastresu != "") lastresu = lastresu + " &raquo; ";
							$("#searchres").append('<input type="radio" name="movetoboard" value="'+val2[1]+'"> '+catresu+' &raquo; '+lastresu+''+val2[0]+'<br>');
						}
					});
				});
				$('input[name=movetoboard]:first').attr("checked",true); 
			});

			$("#del_sub").click(function() {
				if( $("#addkom").is(':checked')) linkit=1;
				else linkit=0;
				
				var movetoboard = $('input[name=movetoboard]:checked').val();
				disablePopup();
				GM_xmlhttpRequest({
					method: "GET",
					url: prot+"://forum.sa-mp.de/index.php?action=ThreadMove&threadID="+tid+"&boardID="+movetoboard+"&withlink="+linkit
				});
				removedisplay(pid);
			});
		}
	});
}

function addkommi(uid,kommi,func)
{
	kommi = encodeURIComponent(kommi);
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://absolut-fair.com/sampde_admin/userinfo.php?action=insert&uid="+uid+"&s="+secid+"&kommentar="+kommi,
		onload: function(data) {
			data=data.responseText;
			if(data!="1") return alert("Fehler!\n\n"+data);

			if(func!=undefined) func(); 
		}
	});
	return 1;
}

function checkunban(tstamp) 
{
	GM_setValue("lastunbancheck",tstamp);
	bfalias = $("#userNote > a").text();
	if( bfalias.length<=1 ) return 1;
	
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://unban.breadfish-rp.de/index.php?page=Board&boardID=2",
		onload: function(data) {
			data=data.responseText;
			
			if( $(data).find("#userNote > a").text().length == 0 ) return false;

			$(data).find(".tableList > tbody > tr").each(function() {
				var status=$(this).find(".columnIcon > img").attr("src");

				var a_obj = $(this).find(".topic > p > a");
				var title = $.trim( $(a_obj).text() );
				var usernm = $(this).find(".firstPost > a").text();
				var replies = $(this).find(".columnReplies").text();
				
				if( title.indexOf("@"+bfalias)!="-1" ) 
				{
					if(status!="icon/threadNewM.png") return true;
					var confi = confirm("Es gibt einen neuen Unban-Antrag an dich!\nTitel: "+title+"\n\nJetzt oeffnen?");
					if(confi) GM_openInTab( "http://unban.breadfish-rp.de/" + $(a_obj).attr("href") );
				}
				else
				{
					//if(status!="icon/threadNewM.png" && status!="icon/threadM.png") return true;
					if(status=="icon/threadClosedM.png") return true;
					if( (title.toLowerCase().indexOf("@info")!="-1" || title.indexOf("@")==-1) && replies=="0" && GM_getValue("unbaninfocheck","1") == 1)  
					{
						if(1==1) //formatierte faulheit :P
						{
							var newdata = GM_xmlhttpRequest({
								method: "POST",
								synchronous:true,
								url: "http://forum.sa-mp.de/index.php?form=MembersSearch",
								data: 'staticParameters[username]='+escape(usernm)+'&matchExactly[username]=1',
								headers : {
									Referrer : "http://forum.sa-mp.de/index.php?form=MembersSearch",
									"Content-Type":"application/x-www-form-urlencoded"
								}
							});
							
							newdata = newdata.responseText;
							//console.log(newdata);

							var uid = $(newdata).find(".containerContentSmall:first > p > a").attr("href") + "&";
							uid = uid.between("userID=","&");

							if( uid.length <= 1) return PostTextToUnban($(a_obj).attr("href"), "", "Dein Benutzername hier konnte im Hauptforum nicht gefunden werden. Automatische Informationsantraege sind daher nicht moeglich.", 0);

							var newdata2 = GM_xmlhttpRequest({
								method: "GET",
								synchronous:true,
								url: "http://forum.sa-mp.de/index.php?page=UserWarningOverview&userID="+uid
							});
							
							newdata2 = newdata2.responseText;

							var vwlist = $(newdata2).find(".tableList:first");
							var latestvw,latesttime=0;
							$("tr",vwlist).each(function(i) {
								var thisdate = $(".columnUserWarningTime",this).text();
								thisdate = timetoint(thisdate);

								if(thisdate > latesttime)
								{
									latesttime = thisdate;
									latestvw = i;
								}
							});
											
							var latestobj = $("tr:eq("+latestvw+")",vwlist);
							var latestjudge = $(".columnUserWarningJudge > a",latestobj).text();
							var latestreas = $(".columnUserWarningTitle > a",latestobj).text();
							var latesttimealias = $(".columnUserWarningTime",latestobj).text();
							var latestpost = $(".columnUserWarningObject > a",latestobj).text();
							var latestpost_href = $(".columnUserWarningObject > a",latestobj).attr("href");
							if( !latestpost.length || !latestpost_href.length) 
							{
								latestpost = "/";
								latestpost_href = "#";
							}
							var latestinfo = filltemplate(GM_getValue("unban_info_warn_template",""), new Array(latestjudge,latestreas,latesttimealias,latestpost_href,latestpost));
							if( latestreas == "" ) latestinfo = "Zu deinen Verwarnungen kann leider keine Information abgerufen werden.";

							var sanklist = $(newdata2).find(".tableList:last");
							var latestsankt="",latesttime=0,latestsanktabl;
							$("tr",sanklist).each(function(i) {
								var thissankt = String.trim($(".columnUserSuspensionTitle",this).text());

								if( thissankt.indexOf("Ausschluss") == -1) return true;
								var thisdate = $(".columnUserSuspensionTime",this).text();
								thisdate = timetoint(thisdate);

								if(thisdate > latesttime)
								{
									latesttime = thisdate;
									latestsankt = thissankt;
									latestsanktabl = $(".columnUserSuspensionExpires",this).text();
								}
								if( thisdate == latesttime )
								{
									if( thissankt.indexOf("unbegrenzt") != -1 )
									{
										latesttime = thisdate;
										latestsankt = thissankt;
										latestsanktabl = $(".columnUserSuspensionExpires",this).text();
									} 
								}
							});
							if( timetoint(latestsanktabl) < getnowstamp() ) latestsankt="";
							
							var endtxt;
							var goclose=1;
							if( latestsankt == "" ) 
							{
								var newdata3 = GM_xmlhttpRequest({
									method: "GET",
									synchronous:true,
									url: "http://forum.sa-mp.de/index.php?page=User&userID="+uid
								});
								newdata3 = newdata3.responseText;
								
								var foundother = 0;
								$(newdata3).find("li.formElement").each(function() {
									if( $(".formFieldLabel",this).text() == "Banngrund" )
									{
										foundother=1;
										endtxt = "Dein Account wurde mit folgender Begründung gesperrt: [b]"+($(".formField",this).text())+"[/b]";
										return false;
									}
								});
								
								if(!foundother)	
								{
									endtxt = "Dein Hauptaccount wurde nicht gesperrt. Eine Information ist daher nicht verfuegbar.";
									goclose=0;
								}
							}
							else endtxt = filltemplate( GM_getValue("unban_info_ban_template",""), new Array(latestsankt,latestsanktabl,latestinfo ) );

							PostTextToUnban($(a_obj).attr("href"), "http://forum.sa-mp.de/index.php?page=User&userID="+uid, endtxt, goclose);
							
							//return false;
						}
					}
				}
			});
		}
	});
	
	return 1;
}

function getnowstamp()
{
	return (new Date().getTime());
}

function timetoint(thisdate)
{
	if( thisdate.indexOf("Heute") != -1 || thisdate.indexOf("Gestern") != -1)
	{
		var today = new Date();
		if(thisdate.indexOf("Gestern") != -1) today.setDate(today.getDate() - 1);
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		thisdate = thisdate.replace("Heute",dd+"."+mm+"."+yyyy).replace("Gestern",dd+"."+mm+"."+yyyy);
	}
	
	thisdate = thisdate.split(",");
	thisdate = thisdate[0].split(".");
	thisdate = new Date(thisdate[2],thisdate[1],thisdate[0]).getTime();
	
	return thisdate;
}

function PostTextToUnban(url, user, txt, closeit)
{
	//return alert("postunban\n\n"+txt);
	var tid = (url + "&").between("&threadID=","&");
	var ansurl = "http://unban.breadfish-rp.de/index.php?form=PostAdd&threadID="+tid;
	
	if(user.length) user="[url="+user+"]Gefundenenes Benutzerprofil[/url]\n\n";
	txt = filltemplate( GM_getValue("unban_info_header_template",""), new Array(user,txt) );
	GM_setValue("paste_info", txt);
	GM_setValue("paste_info_tid", tid);
	GM_setValue("paste_info_close", closeit);
	//GM_openInTab( ansurl );
	
	$("body").prepend('<iframe src="'+ansurl+'" style="width:1px; height:1px; position:absolute; left:-2000px;"></iframe>');
	return true;
}

function settings(deftab)
{
	if(deftab == undefined) deftab=0;
	openpop("BF-Meldungen - Einstellungen",'\
	<table style="width:100%; height:25px; color:black; text-align:center; margin-bottom:15px; border-bottom:1px solid grey;" id="modcats">\
		<tr>\
			<td style="border-right:1px solid grey; cursor:pointer;">Allgemein</td>\
			<td style="border-right:1px solid grey; cursor:pointer;">Fortgeschritten</td>\
			<td style="cursor:pointer;">Templates</td>\
		</tr>\
	</table>\
	<div id="modset">\
		<div class="modsettcat cat_Allgemein">\
			<input type="checkbox" id="goindex"> Zusammenfassung auf Startseite<br>\
			<input type="checkbox" id="gounlock"> -- Freizuschaltende Themen<br>\
			<input type="checkbox" id="goreported"> -- Gemeldete Beiträge<br>\
			<input type="checkbox" id="gospacing"> ---- Größere Lücke zwischen Items<br>\
			<br><br>\
			<input type="checkbox" id="goposts"> Mod.-Funktionen in Beiträgen<br>\
			<input type="checkbox" id="gohidestrike"> -- Echten Verwarnungsknopf zeigen<br>\
			<br><br>\
			<input type="checkbox" id="hidemod"> Moderationsanzeige verstecken<br>\
			<input type="checkbox" id="hideseg"> Gruppenleitung verstecken<br>\
			<input type="checkbox" id="showupdate"> Update-Benachrichtigung aktivieren<br>\
		</div>\
		<div class="modsettcat cat_Fortgeschritten">\
			<input type="checkbox" id="goalert"> Benutzer bei Beitragslöschung benachrichtigen<br>\
			<input type="checkbox" id="defmodbook"> -- Beim Löschen von Beiträgen immer Modbucheinträge aktivieren<br>\
			<input type="checkbox" id="goshowbook"> -- Moderationsbuch in Beiträgen anzeigen<br>\
			<br>\
			<input type="checkbox" id="goraster"> Detaillierte Verwarnungen nutzen<br>\
			<input type="checkbox" id="goinhibitor"> Inhibitor aktivieren<br>\
			<input type="checkbox" id="gosegration"> <span id="seginfo">Segregation von Benutzern im Profil anzeigen</span><br>\
			<br>\
			<input type="checkbox" id="checkunban"> Mich auf Unban-Anträge für mich hinweisen<br>\
			<input type="checkbox" disabled="disabled"> -- Prüfintervall: <input type="text" id="unbanfreq" style="width:25px;"> Stunde(n)<BR>\
			<input type="checkbox" id="unbaninfocheck"> -- Info-Anträge annehmen <small><a href="#" id="resunban">prüfen</a></small><BR>\
			<input type="checkbox" id="unbaninfocheck_cleanclose"> ---- Info-Anträge nach Bearbeitung schließen<BR>\
		</div>\
		<div class="modsettcat cat_Templates">\
			<input type="button" id="delete_template" value="Beitragslöschung"><br>\
			<input type="button" id="advanced_warn_template" value="Detaillierte Verwarnungen"><br>\
			<input type="Button" id="unlock_deny_template" value="Abgelehnte Freischaltung"><br>\
			<br>\
			<input type="button" id="unban_info_header_template" value="Unban-Infoantrag - Header"><br>\
			<input type="button" id="unban_info_warn_template" value="Unban-Infoantrag - Verwarnungsinfos"><br>\
			<input type="button" id="unban_info_ban_template" value="Unban-Infoantrag - Sanktionsinfos"><br>\
		</div>\
		<input type="button" id="usesetting" value="Anwenden" style="float:right;">\
	</div>',1) 
	
	$("#modcats").find("td").hover(function() { $(this).css({"background":"#FAF1AF"}); }, function() { $(this).css({"background":"white"}); });
	$("#modcats").find("td").click(function() { $(".modsettcat").css("display","none"); $(".cat_" + $(this).text()).css("display",""); });
	$(".modsettcat").each(function(i) { if( i!=deftab ) $(this).css("display","none"); });
	
	$("#usesetting").click(function() { location.reload(); });
	$("#modset").find("input[type=checkbox]").each(function() { //checkboxes
		if( $(this).attr("disabled") == "disabled" ) return true;
		$(this).change(function() { 
			if( $(this).is(':checked') ) var chkd=1;
			else var chkd=0;
			GM_setValue($(this).attr("id"),chkd); 
		});
		if( GM_getValue($(this).attr("id"),"1")==1 ) $(this).attr("checked",true);
	});
	$(".cat_Templates").find("input[type=button]").click(function() { //templates
		var thistempl = $(this).attr("id");
		
		openpop( $(this).val(), '<textarea id="templedit" style="width:400px; height:325px;">'+GM_getValue(thistempl,"")+'</textarea><BR><input type="button" id="savetempl" value="Speichern"><input type="button" id="resettempl" value="Reset">',1);
		$("#savetempl").click(function() { 
			GM_setValue( thistempl, $("#templedit").val() );
			settings(2); 
		});
		$("#resettempl").click(function() {
			GM_setValue( thistempl, "" );
			deftemplates();
			settings(2); 
		});
	});
	$("#modset").find("input[type=text]").each(function() { //inputs
		$(this).val( GM_getValue($(this).attr("id"), defval[$(this).attr("id")] ) );
		$(this).change(function() { 
			GM_setValue($(this).attr("id"),$(this).val()); 
		});
	});
	$("#resunban").click(function(e) {
		e.preventDefault();
		checkunban(0);
	});
	if($("#userMenuGroupManagement").length==0)
	{
		$("#gosegration").attr({"checked":false,"disabled":true});
		$("#seginfo").html('Segration Benutzern im Profil anzeigen<br>Dir fehlen die nötigen Rechte! Lass sie dir von <a href="'+prot+'://forum.sa-mp.de/index.php?page=User&userID=6393">TuX</a> geben!<br>');
	} 
}

function reportdelete(rea,ziel,turl,pid,uid,addkom)
{ 
	GM_xmlhttpRequest({
		method: "GET",
		url: prot+"://forum.sa-mp.de/index.php?form=PostEdit&postID="+pid,
		onload: function(data) {
			data=data.responseText;
			var content = escape($(data).find("#text").val());
			
			var reas = filltemplate( GM_getValue("delete_template",""), new Array(ziel,turl,unescape(content),rea) );

			sendpn(ziel,"Einer deiner Beiträge wurde gelöscht",reas);
			if(addkom=="1") addkommi(uid,'Mündliche Verwarnung: '+rea);
		}
	});
}

function gostrike(uid,pid,turli)
{
	$.get(prot+"://forum.sa-mp.de/index.php?form=UserWarn&userID="+uid,function(data) {
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
		openpop("Verwarnen",vws+"<br><a href='"+prot+"://forum.sa-mp.de/index.php?form=UserWarn&userID="+uid+"&objectType=post&objectID="+pid+"'>Verwarnung manuell vergeben</a><br><br><h3>Zusatzinformationen:</h3><textarea id='addinf'></textarea><br><input type='button' id='substrike' value='Absenden'>",1);
		$('#substrike').click(function() {
			var chosen = $('input[name="reas"]:checked');
			var tit=chosen.attr("tite");
			var po=chosen.attr("points");
			var mo=chosen.attr("mon");
			var da=chosen.attr("days");
			var rea=$("#addinf").val();
			
			mo = parseInt(mo)*4;
			
			if( GM_getValue("goraster","0")==1) 
			{
				var rea = filltemplate( GM_getValue("advanced_warn_template",""), new Array(turli,tit,rea,uid) );
			}
			disablePopup();
			$.post(prot+"://forum.sa-mp.de/index.php?form=UserWarn",{warningID:0,title:tit,points:po,expiresWeek:mo,expiresDay:da,expiresHour:0,reason:rea,userID:uid,objectID:pid,objectType:"post"});
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

function jumptomeld(id)
{
	$("#gm_atmpos").text(id);
	switchnextmeld();
}

function switchnextmeld() 
{
	$(".repautor","#gm_list").text(getinfo("autor")).attr("href",getinfo("autor_url"));
	if( getinfo("isunlock") )
	{
		$("#meldpanel").css("display","none");
		$("#unlockpanel").css("display","");
	}
	else
	{
		$("#meldpanel").css("display","");
		$("#unlockpanel").css("display","none");
		$("#repmelder","#gm_list").text(getinfo("reportby")).attr("href",getinfo("reportby_url"));
		if( getinfo("reporttxt").length>30) var prev=getinfo("reporttxt").substr(0,30)+" [...]";
		else var prev=getinfo("reporttxt");
		$("#repmeldtxt","#gm_list").text(prev).attr("title",getinfo("reporttxt"));
	}
	
	$("iframe","#repbody").attr("src",getinfo("thema_url"));
	
	$("#repsek_prefix").text(getinfo("prefix"));
	$("#repsek_forum").text(getinfo("forum"));
	$("#repsek_thema").text(getinfo("thema")).attr("href",getinfo("thema_url"));
}

function removedisplay(pid)
{
	if(pagetype==1)
	{
		$('.gm_id_'+pid).fadeOut();
		var atmpos = parseInt($("#gm_atmpos").text())+1;
		$("#gm_atmpos").text(atmpos);
		
		hits-=1;
		if(hits<=0) $("#gm_list").fadeOut();
		else switchnextmeld();

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
	inhalt = behilfsumlaute(inhalt);
	$.get(prot+"://forum.sa-mp.de/index.php?form=PMNew",function(data) {
		var idh = $(data).find('input[name="idHash"]').val();
		$.post(prot+"://forum.sa-mp.de/index.php?form=PMNew",{recipients:ziel,blindCopies:"",subject:titel,text:inhalt,parseURL:1,showSignature:1,enableSmilies:1,enableBBCodes:1,activeTab:"smilies",send:"Absenden",pmID:0,forwarding:0,reply:0,replyToAll:0,idHash:idh},function(data) {
			if(func!=undefined) func();
		});
	});
}

function unlocktopic(decision,pid,usr,titel,tid,url)
{
	if(decision) 
	{
		url2=prot+"://forum.sa-mp.de/index.php?page=PostAction&action=enable&postID="+pid+"&t="+secid;
		GM_xmlhttpRequest({
			method: "GET",
			url: url2
		});
		removedisplay(pid);
		return 1;
	}

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
				url: prot+"://forum.sa-mp.de/index.php?form=PostEdit&postID="+pid,
				onload: function(data) {
					data=data.responseText;
					var content = escape($(data).find("#text").val());
					
					var url2 = prot+"://forum.sa-mp.de/index.php?page=PostAction&action=trash&postID="+pid+"&reason=&t="+secid;
					openpop("Begruendung",'<textarea id="declinereason" style="height:300px;" placeholder="Gib eine Begründung für die Ablehnung ein"></textarea><br><input type="submit" value="Absenden" id="sendreasonpn" style="float:right;">',1);
					$("#sendreasonpn").click(function() { 
						disablePopup(); 
						var rea = filltemplate( GM_getValue("unlock_deny_template",""), new Array($("#declinereason").val(),unescape(content)) );
						sendpn(usr,"Abgelehnte Freischaltung: "+titel,rea); 
					});

					GM_xmlhttpRequest({
						method: "GET",
						url: url2,
						onload: function() {
							removedisplay(pid);

							if(isstarter) 
							{
								GM_xmlhttpRequest({
									method: "GET",
									url: prot+"://forum.sa-mp.de/index.php?action=ThreadMove&threadID="+tid+"&boardID=105&withlink=0&t="+secid
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
		url: prot+"://forum.sa-mp.de/index.php?page=ThreadAction&action=trash&threadID="+tid+"&reason=&t="+secid,
		onload: function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: prot+"://forum.sa-mp.de/index.php?action=ThreadMove&threadID="+tid+"&boardID=105&withlink=0"
			});
		}
	});
}

function meldungweg(pid)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: prot+"://forum.sa-mp.de/index.php?page=PostAction&action=removeReport&postID="+pid+"&t="+secid
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
	reas = behilfsumlaute(reas);

	GM_xmlhttpRequest({
		method: "GET",
		url: prot+"://forum.sa-mp.de/index.php?page=PostAction&action=trash&postID="+pid+"&reason="+escape(reas)+"&t="+secid
	});
}

function behilfsumlaute(reas) 
{
	var umlaute = ["ä","ö","ß","ü"];
	var ungeilumlaut = ["ae","oe","ss","ue"];
	
	var newreas = reas;
	$.each(umlaute,function(key,val) {
		newreas = newreas.split(val).join(ungeilumlaut[key]);
	});

	return newreas;
}

function addlist(howmany) 
{
	if( $("#gm_list").length ) 
	{
		$("#gm_hits").text(parseInt($("#gm_hits").text())+howmany);
		return false;
	}
	$(".top5box").before('\
			<div class="info" id="gm_list">\
				<div style="width:98%">\
					<div id="reptopbar">\
						<p style="float:right;">Meldung <span id="gm_atmpos">1</span>/<span id="gm_hits">'+howmany+'</span> <a style="text-decoration:none; color: rgb(0, 102, 255);" status="1" id="repexpinfo" href="#" onclick="return false;">&#9660;</a></p>\
						<p id="regexpcont" style="text-align:right; float:right; margin-right:-85px; margin-top:10px;"></p>\
						<p><span id="repsek_forum"></span> > <b id="repsek_prefix"></b> <a href="#" id="repsek_thema" style="text-decoration:none; color: rgb(0, 102, 255);"></a></p>\
					</div>\
					<div style="margin-bottom:5px; margin-top:5px;" id="repbody">\
						<iframe src="about:blank" style="width:100%; height:300px;">iframes sind deaktiviert</iframe>\
					</div>\
					<div id="repbottombar">\
						<div id="meldpanel">\
							<p style="float:right;">"<a id="repmeldtxt" style="text-decoration:none; color: rgb(0, 102, 255);" href="#" onclick="return false;"></a>" laut <a id="repmelder" href="#" style="text-decoration:none; color: rgb(0, 102, 255);"></a></p>\
							<p>Beitrag von <a class="repautor" href="#" style="text-decoration:none; color: rgb(0, 102, 255);"></a></p>\
							<div style="margin:0 auto; width:300px; margin-top:-20px;" class="action modaction">\
								<a href="#" style="margin-right:25px;" onclick="return false;" title="Vorherige Meldung" class="previous"><img src="http://icons.iconarchive.com/icons/icojam/blue-bits/16/arrow-left-icon.png" width="16"></a>\
								<a href="#" onclick="return false;" title="Meldung entfernen" class="flush" ><img src="wcf/icon/pmTrashEmptyM.png" width="16"></a>\
								<a href="#" onclick="return false;" title="Verwarnen" class="strike"><img src="wcf/icon/infractionWarningM.png" width="16"></a>\
								<a href="#" onclick="return false;" title="Beitrag löschen" class="remove"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png"  width="16"></a>\
								<a href="#" onclick="return false;" title="Beitrag verwarnen und löschen" class="removestrike"><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/16/Male-User-Warning-icon.png"  width="16"></a>\
								<a href="#" onclick="return false;" title="Thema entfernen" class="removetop"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-blue-full-icon.png"></a>\
								<a href="#" onclick="return false;" title="Thema verwarnen und löschen" class="striketop"><img src="http://icons.iconarchive.com/icons/tatice/just-bins/16/bin-red-icon.png"  width="16"></a>\
								<a href="#" onclick="return false;" title="Thema verschieben" class="movetop"><img src="wcf/icon/messageQuickReplyM.png" style="width:16px; height:16px;" title="Verschieben"></a>\
								<a href="#" onclick="return false;" title="Benutzer sperren" class="banit"><img src="wcf/icon/bannedS.png" width="16"></a>\
								<a href="#" onclick="return false;" title="Meldung zur&uuml;ckweisen" class="reject"><img src="wcf/icon/legalNoticeS.png" width="16"></a>\
								<a href="#" style="margin-left:25px;"onclick="return false;" title="N&auml;chste Meldung" class="next"><img src="http://icons.iconarchive.com/icons/icojam/blue-bits/16/arrow-right-icon.png" width="16"></a>\
							</div>\
						</div>\
						<div id="unlockpanel">\
							<p style="float:right;">\
								<a href="#" style="margin-right:5px;" onclick="return false;" title="Vorherige Meldung" class="previous"><img src="http://icons.iconarchive.com/icons/icojam/blue-bits/16/arrow-left-icon.png" width="16"></a>\
								<a href="#" onclick="return false;" title="Annehmen" class="unlock_accept"><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/16/Accept-icon.png" width="16"></a>\
								<a href="#" onclick="return false;" title="Ablehnen" class="unlock_remove"><img src="http://icons.iconarchive.com/icons/saki/snowish/16/Button-no-icon.png" width="16"></a>\
								<a href="#" style="margin-left:5px;" onclick="return false;" title="N&auml;chste Meldung" class="next"><img src="http://icons.iconarchive.com/icons/icojam/blue-bits/16/arrow-right-icon.png" width="16"></a>\
							</p>\
							<p>Beitrag von <a class="repautor" href="#" style="text-decoration:none; color: rgb(0, 102, 255);"></a></p>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div id="secret_info" style="display:none;"></div>'); 
			
	$("#repmeldtxt").click(function() {
		openpop("Meldung betrachten",'<textarea style="width:400px; height:325px;">'+$(this).attr("title")+'</textarea>',1);
	});
}

function getinfo(str)
{ 
	switch(pagetype)
	{
		case 1:
			var mypos=parseInt($("#gm_atmpos").text())-1;
			var target=$(".indexhit:eq("+mypos+")","#secret_info").find("."+str);
			break;
		case 2:
			var target=$(".secinfo","#"+lastid).find("."+str);
			break;
	}
	if(!target.length) return 0;
	else return target.text();
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

function occurrences(string, subString, allowOverlapping){

    string+=""; subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
}


function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function need_update(v1, v2) { //ret: 0=equal/1 bigger; 1=2 bigger
	if( $.isArray(v1) ) v1 = v1.splice(0);
	if( $.isArray(v2) ) v2 = v2.splice(0);
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 0;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 0;
        }
        else {
            return 1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return 1;
    }

    return 0;
}