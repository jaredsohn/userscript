// ==UserScript==
// @name           Auto Military 
// @namespace      A.M
// @description    (-)
// @author         Worrior
// @version		   0.1 beta
// @include		   http://s*.ikariam.*/index.php?view=diplomacyAdvisorAlly
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==


var r=confirm("Do you want to refresh Military score ?");
var nm ; var lnk; var t; var i = 1; var loop;
if (r==true)
  {
var leg = document.getElementById('memberList').rows.length ;
var myWindow = window.open("","Ikariam","dependent") ;
AutoRun(leg);
 
  }


function AutoRun(loop)
{
if (i <= loop)
  {
	  	nm = document.getElementById('memberList').rows[i].cells[1].innerHTML;
		lnk = "http://s2.ikariam.gr/index.php?view=highscore&highscoreType=army_score_main&offset=0&searchUser="+nm ;
                t = setTimeout("AutoRun()",5000); 
		myWindow.location.href = lnk ;
		i = i + 1 ; 
		
		
  }
 	
}