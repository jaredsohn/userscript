// ==UserScript==
// @name          Capone
// @namespace     absolut-fair.com
// @description   "Like"-System fürs Forum von Capone.
// @include       http://gtawc.net/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

//Thanks for the thumb-icon to http://www.fatcow.com/free-icons

var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
secid=secid+sid;
var bfnm;
var expanded=0;
var version=4;

$(document).ready(function () {
	bfnm = $("#userNote > a").text();
	
	//Benachrichtigungen Startseite
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://absolut-fair.com/wbb_backup/vote.php",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: "name="+bfnm+"&retrieve=1",
		onload: function(resp) {
			var conti=resp.responseText;
			
			var unseen = parseInt(conti.between("<number>","</number>"));
			$("#userMenu > ul").append('<li class="vote_ben"><a href="#" onclick="return false;"><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/thumb-up-icon.png" alt="" /> <span>Likes ('+unseen+')</span></a></li>');
			if(unseen>0) $(".vote_ben").addClass("new");
			
			$(".vote_ben").click(function() {
				openvotes(); //übersichtlicher
			});
		}
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
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://absolut-fair.com/wbb_backup/vote.php",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: "name="+bfnm+"&pid="+collectpids+"&update="+version, 
			onload: function(resp) {
				var conti=resp.responseText;
				
				var thema = $(".headlineContainer").text().trim();

				$(".messageInner").each(function() {
					var thobj = $(".smallButtons",this);
					if(thobj.length==0) return true;
					
					var pid = $("ul",thobj).attr("id");
					pid = pid.replace("postButtons","");
					var autor = escape($("p.userName > a",this).text().trim());
					var autor_url = escape($("#userNote > a").attr("href")); //eigtl der typ der das danke gibt, grad zu faul zum umbenennen aller variablen
					var pid_url = escape($(".messageNumber",this).attr("href"));
					
					var newstatus = parseInt(conti.between("<status"+pid+">","</status"+pid+">"));
					var votes = parseInt(conti.between("<likes"+pid+">","</likes"+pid+">"));
					if( newstatus==2 ) 
					{
						votes = conti.between("<likes"+pid+">","</likes"+pid+">"); //adminpanel
						if( votes == "Update")
						{
							alert("Das Like-System braucht ein Update.\nDies wird nun angefordert.\nBitte laden Sie die Seite nach der Installation neu.");
							$(this).append('<iframe style="width:1px; height:1px; position:absolute; top:-200px; left:-200px;" src="http://userscripts.org/scripts/source/125719.user.js"></iframe>');
							return false;
						}
					}
					if(votes==0) votes="";
					
					$(thobj).prepend('<ul style="float:right;"> <li class="gm_like_li" pid="'+pid+'" autor="'+autor+'" thema="'+escape(thema)+'" autor_url="'+autor_url+'" pid_url="'+pid_url+'"><a href="#" onclick="return false;"><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/thumb-up-icon.png" alt="" /> <span></span></a></li> </ul>');
					var obj = $(".gm_like_li[pid='"+pid+"']"); //um den grade geaddeten button zu finden
					
					$("span",obj).text( votes );
					if( newstatus == 1) obj.addClass("selected").attr("liked","1");
					else obj.removeClass("selected").attr("liked","0");
				});
			}
		});

		$(".gm_like_li").live("click",function() {
			$("a",this).blur();
			var pid = $(this).attr("pid");
			var pid_url = $(this).attr("pid_url");
			var autor = $(this).attr("autor");
			var autor_url = $(this).attr("autor_url");
			var thema = $(this).attr("thema");
			var that=this;

			$("img",this).attr("src","http://absolut-fair.com/download/loading.gif");
			$("span",this).text("");
			
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://absolut-fair.com/wbb_backup/vote.php",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: "name="+bfnm+"&pid="+pid+"&vote=1&update="+version+"&thema="+thema+"&autor="+autor+"&autor_url="+autor_url+"&pid_url="+pid_url,
				onload: function(resp) {
					var conti=resp.responseText;

					$("img",that).attr("src","http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/thumb-up-icon.png");
					
					var newstatus = parseInt(conti.between("<status"+pid+">","</status"+pid+">")); //beachten: gibt den stand vor dem like zurück
					var votes = parseInt(conti.between("<likes"+pid+">","</likes"+pid+">")); //beachten: gibt den stand vor dem like zurück
					if( newstatus == 0) votes++;
					else votes--;
					if(votes<=0) votes="";
					$("span",that).text( votes );
					
					if( newstatus == 0) $(that).addClass("selected").attr("liked",1);
					else $(that).removeClass("selected").attr("liked",0);
				}
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
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://absolut-fair.com/wbb_backup/vote.php",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: "name="+bfnm+"&retrieve=2",
			onload: function(resp) {
				var conti=resp.responseText;
				var unseen = parseInt(conti.between("<number>","</number>"));
				
				addlist(unseen);

				for(i=1;i<=unseen;i+=1)
				{
					var container = conti.between("<unread"+i+">","</unread"+i+">");
					var thema = unescape(container.between("<thema>","</thema>"));
					var pid_url = unescape(container.between("<pid_url>","</pid_url>"));
					var autor = unescape(container.between("<autor>","</autor>"));
					var autor_url = unescape(container.between("<autor_url>","</autor_url>"));
				
					$(".vote_list").append('<li class="vote_'+i+'">\
												<a href="'+autor_url+'">'+autor+'</a> mochte deinen Beitrag im Thema <a href="'+pid_url+'">'+thema+'</a>\
											</li>');
				}
				
				$("#vote_box").fadeIn(function() {
					$(".vote_ben > a > span").text("Likes (0)");
					$(".vote_ben").removeClass("new");
				});
				
			}
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
				<p><span id="vote_hits">'+howmany+'</span> neue Likes:</p>\
				<ul class="vote_list">\
									</ul>\
			</div>');
	if(howmany==0) $("#vote_box > p").text("Du hast keine neuen Likes");
	return true;
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