// ==UserScript==
// @name           itslearningplus
// @namespace      luls.com
// @include        https://www.itslearning.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; main(); }
}
GM_wait();

function main() {
	
	// BRUKERNAVN VED NAVN
	$("a[href*='show_person.aspx']").each(function(){
       var temp=this;
       $.get($(this).attr('href'),function(data){
           var username = $("li#sendmessage a[href*='TextTo']:first",data).attr('href').split('TextTo=')[1];
           $(temp).after(" (<a href='http://folk.ntnu.no/"+username+"'>"+username+"</a>)");
       });
   });
	
	// VIS MANGE FOLK
	$("select[id*='Pagesize']:last,select#Show").append("<option value='1000'>View 1000</option>\n<option value='100000'>View 100k</option>");
	
	if (document.location=="https://www.itslearning.com/main/mainmenu.aspx") {
		
		// VIS FAGNAVN I TASK-LISTA
		$("div.tast-list-table,td.task-title a").each(function(i) {
	    	$(this).text($(this).attr('title'));
		});
		
		// SETT FAG-LISTA ØVERST
		var splitscreen = $(".splitscreen:first").remove();
		$(".section:first").before("<div class='floatclear'></div>"+$(splitscreen).html()+"<div class='floatclear'></div>");
		
		// LAG BULLETIN BOARD
		var numberOfBulletins = 10; 		// bestemmer antall nyheter
		$(".section .headingandnavigation:first").parent().after("<div class='section' id='bulletin'><div class='headingandnavigation'><h2>Oppslagstavle</h2></div></div>"); 	// endre before til after hvis tasks skal foer bulletin board
		$(".splitscreenleft a, .splitscreenright a").each(function(i) { 				// for hvert fag
			var url = $(this).attr("href");
			$.get(url, function() { 			// sett fagside (pga. rammer)
				$.get((url.indexOf("CourseID")!=-1) ? "/course/course.aspx" : "/project/project.aspx", function(data) {
					$(".newsitem",data).each(function(i) { 		// for hver nyhet
						$(this).wrapInner("<div class='newsitem'></div>");	
						$("h3",this).append(" ("+$("h1:first",data).text()+")"); 	// sett fagnavn ved nyhetstittel
						$("h3,p",this).css("margin", "15px"); 	// sett margin på nyhet
						insertionSort(this); 					// sett inn med innsettingssortering
						$(".newsitem:lt("+(numberOfBulletins-1)+")").show(); 		// skjuler eldste nyheter
						$(".newsitem:gt("+(numberOfBulletins-1)+")").hide(); 		// viser nyeste nyheter
					});
				});
			});
		});
	
		function insertionSort(new_) { 		// standard innsettingssortering
			if ($(".newsitem").length==0) {
				$("#bulletin").append($(new_).html());
				return;
			}
			var newdate = getdate(new_);
			var isInserted = false;
			$(".newsitem").each(function(i) {
				var olddate = getdate(this);
				if (!isInserted && newdate > olddate) {
					isInserted = true;
					$(this).before($(new_).html());
					return;
				}
			});
			if (!isInserted) 
				$("#bulletin").append($(new_).html());
		}
	
		function getdate(bulletin) { 		// lag dato-objekt fra nyhet
			var time = $(".published",bulletin).html().split("</a> ")[1];
			var a = time.split(/[\.|\s|\:]/);
			var date = new Date();
			date.setFullYear(a[2], a[1], a[0]);
			date.setHours(a[3]);
			date.setMinutes(a[4]);
			return date;
		}
	}
	
	// RUNDE KANTER
	$(".section,.newslist,.containerbox1,.frame").css({MozBorderRadius: "10px"});
	$(".skin,.headingandnavigation,#main").css({MozBorderRadius: "10px 10px 0 0"});
	
}
