// ==UserScript==
// @name           GameCenter QB Rating
// @namespace      gamecenterqb
// @description    Adds QB Passer Rating info to Sportsline & nfl.com Gamecenters
// @include        http://www.cbssports.com/nfl/gametracker/live*
// @include        http://www.nfl.com/gamecenter*
// @include        http://msn.foxsports.com/nfl/gameTrax*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var $=window.jQuery;
window.jQuery.noConflict();

function colorElement(element,value){
var bgcolor="#ffff99";
if(value>66)bgcolor="#78FF7C";
if(value<33)bgcolor="#FF787F";
element.html(value+"%");
element.css({background: bgcolor}); 
}
function calcQBRating(selector,site){
			var a=0;
			var b=0;
			var c=0;
			var d=0;
			var att=0;
			
			if($(selector).parent().find("#qbrate").length==0){
				$(selector).after("<tr><td id='qbrate' style='font-size:16pt;font-family:arial;font-weight:bold;'></td><td align='right' id='qbratea'></td><td align='right' id='qbrateb'></td><td align='right' id='qbratec'></td><td align='right' id='qbrated'></td></tr>");
			}else{
				return;//assume it is up to date (stat changes seem to remove anyway)
			}
			var cpatts=$(selector+" td:eq(1)").html();
			var cp=parseInt(cpatts.split('/')[0]);
			att=parseInt(cpatts.split('/')[1]);
			var yds=parseInt($(selector+" td:eq(2)").html());
			var tds=parseInt($(selector+" td:eq(3)").html());
			var ints=parseInt($(selector+" td:eq(4)").html());


			if(att>0){
				 a = (((cp/att) * 100) -30) / 20;
				 b = ((tds/att) * 100) / 5;
				 c = (9.5 - ((ints/att) * 100)) / 4;
				 d = ((yds/att) - 3) / 4;
				a=(a<0?0:(a>2.375?2.375:a));
				apct=Math.round((a/2.375)*100);
				b=(b<0?0:(b>2.375?2.375:b));
				bpct=Math.round((b/2.375)*100);
				c=(c<0?0:(c>2.375?2.375:c));
				cpct=Math.round((c/2.375)*100);
				d=(d<0?0:(d>2.375?2.375:d));
				dpct=Math.round((d/2.375)*100);
				var qbrate= Math.round(((a + b + c + d) / .06)*10)/10;
				$(selector).parent().find("#qbrate").html(qbrate);
				colorElement($(selector).parent().find("#qbratea"),apct);
				colorElement($(selector).parent().find("#qbrateb"),dpct);
				colorElement($(selector).parent().find("#qbratec"),bpct);
				colorElement($(selector).parent().find("#qbrated"),cpct);
			}
		  return qbrate;
}
function doCalc(){
		setTimeout(doCalc,10000);
		if(window.location.href.indexOf('sportsline')>-1 || window.location.href.indexOf('cbssports')>-1){
			calcQBRating("#stat00 tr:eq(2)");
			calcQBRating("#stat10 tr:eq(2)");
		}
		if(window.location.href.indexOf('nfl.com')>-1){
			 if($("#h_passing").length>0){
				//structure slightly different during gametime
				calcQBRating("#visitor-team-stats .columnStats #v_passing tr:eq(0)");
				calcQBRating("#home-team-stats .columnStats #h_passing tr:eq(0)");
			  }else{
				calcQBRating("#visitor-team-stats .columnStats  table:eq(1) tr:eq(1)");
				calcQBRating("#home-team-stats .columnStats table:eq(1) tr:eq(1)");
			  }
			}
		if(window.location.href.indexOf('foxsports.com')>-1){
				calcQBRating("#away-passing tr:eq(1)");
				calcQBRating("#home-passing tr:eq(1)");
		}
}
$(window).load(function(){
			doCalc();
});



