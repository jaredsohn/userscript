// ==UserScript==
// @name          BF-Vote
// @namespace     absolut-fair.com
// @description   "Like"-System fürs Forum
// @include       http://forum.sa-mp.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

//Thanks for the thumb-icon to http://www.fatcow.com/free-icons

var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
secid=secid+sid;
var bfnm;
var expanded=0;
var version="11.3";
var vreminded = GM_getValue("reminder",0);
var bfpw = GM_getValue("auth_pass","NULL");

$(document).ready(function () {
	bfnm = $("#userNote > a").text();
	if(bfnm.length==0 && window.location.indexOf("/acp/")>-1) 
	{
		if(GM_getValue("not_log_remind","NULL")=="NULL") 
		{
			GM_setValue("not_log_remind","done");
			return alert("Es tut mir Leid - \ndas Likesystem funktioniert nur wenn du angemeldet bist.\n\nLogge dich ein um es nutzen zu koennen");
		}
		else return false;
	}
	else GM_setValue("not_log_remind","NULL");
	
	bfid = $("#userNote > a").attr("href");
	
	bfid = bfid.replace("http://forum.sa-mp.de/","");
	bfid = bfid.replace("index.php?page=User&amp;userID=","");
	bfid = bfid.replace("index.php?page=User&userID=","");
	
/*
	bfid = bfid.replace("http://forum.sa-mp.de/user/","");
	bfid = bfid.split("-");
	bfid = bfid[0];
*/	
	if(bfpw == "NULL") goauth();
	
	//Benachrichtigungen Startseite
	callapi("retrieve=1", function(conti) {
		var unseen = parseInt(conti.between("<number>","</number>"));
		$("#userMenu > ul").append('<li class="vote_ben"><a href="#" onclick="return false;"><img src="http://absolut-fair.com/wbb_backup/thumb-up-icon.png" alt="" /> <span>Likes ('+unseen+')</span></a></li>');
		if(unseen>0) $(".vote_ben").addClass("new");
			
		$(".vote_ben").click(function() {
			openvotes(); //übersichtlicher
		});
	});

	//Likes für Beiträge
	if( $("meta[name='description']").attr("content") != "Größte deutschsprachige Community rund um SA-MP, einer Multiplayer-Modifikation für das PC-Spiel GTA San Andreas. Mit großem SA-MP Scriptingbereich, vielen hilfreiche Tutorials, Showroom mit zahlreichen fertigen Scripts und jeder Menge Benutzer die einem gerne weiterhelfen wenn's Probleme gibt.")
	{
		var collectpids=""; //für eine einzige serveranfrage
		$(".messageInner").each(function() {
			var obj = $(".messageFooterRight > .smallButtons",this);
			if(obj.length==0) return true;
			var pid = $("ul",obj).attr("id");
			pid = pid.replace("postButtons","");
			collectpids = pid+"|"+collectpids;
		});
		callapi("pid="+collectpids+"&update="+version,function(conti) {
			var thema = $(".headlineContainer").text().trim();

			$(".messageInner").each(function() {
			var thobj = $(".smallButtons",this);
			if(thobj.length==0) return true;
					
			var pid = $("ul",thobj).attr("id");
			pid = pid.replace("postButtons","");
			var autor = escape($("p.userName > a",this).text().trim());
			var autor_url = escape($("#userNote > a").attr("href")); //eigtl der typ der das danke gibt, grad zu faul zum umbenennen aller variablen
			//Notiz an mich: Eigene Notizen lesen -.-# =================^^^^^^
			var pid_url = escape($(".messageNumber",this).attr("href"));
					
			var newstatus = parseInt(conti.between("<status"+pid+">","</status"+pid+">"));
			var votes = parseInt(conti.between("<likes"+pid+">","</likes"+pid+">"));
			if( newstatus==2) 
			{
				votes = conti.between("<likes"+pid+">","</likes"+pid+">"); //adminpanel
				if( votes == "Update" && vreminded < version)
				{
					var browser_type=navigator.userAgent;
					if (browser_type.indexOf("Firefox")!=-1)
					{
						alert("Das Like-System braucht ein Update.\nDa Sie zu meiner Erleichterung Firefox nutzen,\ngeschieht das automatisch.\n\nBitte bestaetigen Sie folgenden Dialog und\nladen Sie die Seite nach der Installation neu.");
						$(this).append('<iframe style="width:1px; height:1px; position:absolute; top:-200px; left:-200px;" src="http://userscripts.org/scripts/source/125719.user.js"></iframe>');
					}
					else
					{
						window.open("http://forum.sa-mp.de/off-topic/smalltalk/p876020-like-system-f%C3%BCr-das-forum/#post876020");
						alert("Das Like-System braucht ein Update.\nLeider benutzen Sie kein Firefox,\nwodurch automatische Updates leider nicht funktionieren.\n\nVollziehen Sie daher nun bitte ein manuelles Update!\nP.S.: Im Startpost steht auch eine Information fuer Chrome-Benutzer,\nbei Problemen am besten mal lesen ;)");
					}
					GM_setValue("reminder",version);
					return false;
				}
			}
			if(votes==0) votes="";
					
			$(thobj).prepend('<ul style="float:right;"> <li class="gm_like_li" pid="'+pid+'" autor="'+autor+'" thema="'+escape(thema)+'" autor_url="'+autor_url+'" pid_url="'+pid_url+'"><a href="#" onclick="return false;"><img src="http://absolut-fair.com/wbb_backup/thumb-up-icon.png" alt="" /> <span></span></a></li> </ul>');
					var obj = $(".gm_like_li[pid='"+pid+"']"); //um den grade geaddeten button zu finden
					
					$("span",obj).text( votes );
					if( newstatus == 1) obj.addClass("selected").attr("liked","1");
					else obj.removeClass("selected").attr("liked","0");
				});
			});

		$(".gm_like_li").live("click",function() {
			$("a",this).blur();
			var pid = $(this).attr("pid");
			var pid_url = $(this).attr("pid_url");
			var autor = $(this).attr("autor");
			var autor_url = $(this).attr("autor_url");
			//if( autor==escape(bfnm)) return alert(unescape("Als ob du das so n%F6tig hast %3B%29"));
			var thema = $(this).attr("thema");
			var that=this;

			$("img",this).attr("src","http://absolut-fair.com/download/loading.gif");
			$("span",this).text("");
			
			callapi("pid="+pid+"&vote=1&update="+version+"&thema="+thema+"&autor="+autor+"&autor_url="+autor_url+"&pid_url="+pid_url,function(conti) {
				$("img",that).attr("src","http://absolut-fair.com/wbb_backup/thumb-up-icon.png");
					
				var newstatus = parseInt(conti.between("<status"+pid+">","</status"+pid+">")); //beachten: gibt den stand vor dem like zurück
				var votes = parseInt(conti.between("<likes"+pid+">","</likes"+pid+">")); //beachten: gibt den stand vor dem like zurück
				if( newstatus == 0) votes++;
				else votes--;
				if(votes<=0) votes="";
				$("span",that).text( votes );
					
				if( newstatus == 0) $(that).addClass("selected").attr("liked",1);
				else $(that).removeClass("selected").attr("liked",0);
			});
			
			return false;
		});
	}
});

function openvotes()
{
	expanded=!expanded;
	
	if(expanded)
	{
		callapi("retrieve=2",function(conti) {
			var unseen = parseInt(conti.between("<number>","</number>"));
				
			if(unseen<5) fillup=5;
			else fillup=unseen;
				
			addlist(unseen);

			for(i=1;i<=fillup;i+=1)
			{
				var container = conti.between("<unread"+i+">","</unread"+i+">");
				var thema = unescape(container.between("<thema>","</thema>"));
				var pid_url = unescape(container.between("<pid_url>","</pid_url>"));
				var autor = unescape(container.between("<autor>","</autor>"));
				var autor_url = unescape(container.between("<autor_url>","</autor_url>"));
				var isold = parseInt(container.between("<old>","</old>"));
			
				if(isold==0)
				{
					$(".vote_list").append('<li class="vote_'+i+'">\
											<a href="'+autor_url+'">'+autor+'</a> mochte deinen Beitrag im Thema <a href="'+pid_url+'">'+thema+'</a> ★\
										</li>');
				}
				else
				{
					$(".vote_list").append('<li class="vote_'+i+'">\
											<a href="'+autor_url+'">'+autor+'</a> mochte deinen Beitrag im Thema <a href="'+pid_url+'">'+thema+'</a> ✔\
										</li>');
				}
			}
				
			$("#vote_box").fadeIn(function() {
				$(".vote_ben > a > span").text("Likes (0)");
				$(".vote_ben").removeClass("new");
			});	
		});
	}
	else 
	{
		$("#vote_box").fadeOut(function() { $("#vote_box").remove(); });
	}
}

function addlist(howmany)
{
	$("#main").prepend('\
					<div class="vote_box info" id="vote_box" style="display:none;">\
					<a style="float:right;" href="http://absolut-fair.com/wbb_backup/vote_stats.php" target="_new">Statistik</a>\
				<p><span id="vote_hits">'+howmany+'</span> neue Likes:</p>\
				<ul class="vote_list">\
									</ul>\
			</div>');
	if(howmany==0) $("#vote_box > p").text("Du hast keine neuen Likes");
	return true;
}

function callapi(paras,runthis)
{
	var thisparas=paras+"&auth_pass="+bfpw+"&uid="+bfid+"&name="+bfnm;

	GM_xmlhttpRequest({
		method: "POST",
		url: "http://absolut-fair.com/wbb_backup/vote.php",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: thisparas,
		onload: function(resp) {
			var retxt = resp.responseText;
			if( retxt.between("<auth>","</auth>") == "0")
			{
				alert("Es wurde ein Problem mit deiner Identitaet festgestellt.\nBitte gib dein altes Passwort erneut ein");
				goauth();
			}
			else runthis(retxt);
		}
	});
}

function goauth()
{
	var newpw = prompt("Willkommen beim sa-mp.de Likesystem.\n\nUm dich wiedererkennen zu koennen,\nbenoetigt das Like-System ein eigenes Passwort,\n(NICHT dein sa-mp.de Passwort)\n\nGib nun (d)ein Passwort ein (1-20 Zeichen):","");
	if(!newpw) return false;
	if(newpw.length<1 || newpw.length>20) 
	{
		alert("Das war wohl nichts.\nBitte nimm dir diesen kurzen Augenblick Zeit dafuer!");
		window.location=window.location;
		return false;
	}
	bfpw = newpw;
	GM_setValue("auth_pass",bfpw);
}

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