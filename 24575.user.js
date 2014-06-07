// ==UserScript==
// @name          Yahoo Fantasy NFL NBA and MLB Player Search Box and Free Agent Links
// @namespace     http://www.digivill.net/~joykillr
// @description   Provides quick links to player categories.  This is a modification of userscripts.org/scripts/show/13184, expanded to work with NBA and MLB as well.
// @include       http://football.fantasysports.yahoo.com/f*
// @include       http://baseball.fantasysports.yahoo.com/b*
// @include       http://basketball.fantasysports.yahoo.com/nba*
// ==/UserScript==
//
// This script will add the player search box at the top and Free Agent Links to the bottom of your team page to allow for quick and convienient player searches.
//
//v. 1.1 - easy variable to change the year - Set for the upcoming football & basketball and the current baseball season.
//
var basketballYear = "2008";
var baseballYear = "2008";
var footballYear = "2008";
//

var firstre = new RegExp
firstre = /^http\:\/\/[a-z]{1,7}ball\.fantasysports\.yahoo\.com\/[a-z]{1,4}\d{0,1}\/\d{1,7}\/\d{1,2}/i;

var ball = window.content.location.href.split("\/\/")[1].split("\.")[0];


function runLinkBuild(ball) {
    var myLinks = document.createElement('div');
    myLinks.setAttribute("id","yspplayerlinks");
    myLinks.setAttribute("class","navlist");
	//myLinks.setAttribute("style", "text-align:center !important; margin-right:auto!important;margin-left:auto!important;");

	if (ball=="baseball") {
		var Label1 = "C";
		var Label2 = "1B";
		var Label3 = "2B";
		var Label4 = "3B";
		var Label5 = "SS";
		var Label6 = "OF";
		var Label7 = "Util";
		var Label8 = "SP";
		var Label9 = "RP";
		var Label1_loc = "/players?status=A&pos=C&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label2_loc = "/players?status=A&pos=1B&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label3_loc = "/players?status=A&pos=2B&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label4_loc = "/players?status=A&pos=3B&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label5_loc = "/players?status=A&pos=SS&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label6_loc = "/players?status=A&pos=OF&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label7_loc = "/players?status=A&pos=Util&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
		var Label8_loc = "/players?status=A&pos=SP&cut_type=33&stat1=S_S_"+baseballYear+"&sort=42";
		var Label9_loc = "/players?status=A&pos=RP&cut_type=33&stat1=S_S_"+baseballYear+"&sort=AR";
		var allO_label = "All Batters";
		var allO_loc = "/players?status=A&pos=B&cut_type=33&stat1=S_S_"+baseballYear+"&sort=60";
	} else if (ball=="basketball") {
		var Label1 = "PG";
		var Label2 = "SG";
		var Label3 = "G";
		var Label4 = "SF";
		var Label5 = "PF";
		var Label6 = "F";
		var Label7 = "C";
		var Label8 = "Util";
		var Label9 = "";
		var Label1_loc = "/players?status=A&pos=PG&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label2_loc = "/players?status=A&pos=SG&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label3_loc = "/players?status=A&pos=G&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label4_loc = "/players?status=A&pos=SF&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label5_loc = "/players?status=A&pos=PF&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label6_loc = "/players?status=A&pos=F&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label7_loc = "/players?status=A&pos=C&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label8_loc = "/players?status=A&pos=Util&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
		var Label9_loc = "";
		var allO_label = "All Players";
		var allO_loc = "/players?status=A&pos=P&cut_type=33&stat1=S_S_"+basketballYear+"&sort=AR";
	} else if (ball=="football") {
		var Label1 = "WR";
		var Label2 = "QB";
		var Label3 = "RB";
		var Label4 = "TE";
		var Label5 = "K";
		var Label6 = "D";
		var Label7 = "DB";
		var Label8 = "DL";
		var Label9 = "";
		var Label1_loc = "/players?status=A&pos=WR&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label2_loc = "/players?status=A&pos=QB&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label3_loc = "/players?status=A&pos=RB&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label4_loc = "/players?status=A&pos=TE&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label5_loc = "/players?status=A&pos=K&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label6_loc = "/players?status=A&pos=D&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label7_loc = "/players?status=A&pos=DB&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label8_loc = "/players?status=A&pos=DL&stat1=S_S_"+footballYear+"&sort=PTS";
		var Label9_loc = "";
		var allO_label = "All Offense";
		var allO_loc = "/players?status=A&pos=O&stat1=S_S_"+footballYear+"&sort=PTS";
	}
		
      var l0 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + allO_loc;
      var l1 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label1_loc;
      var l2 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label2_loc;
      var l3 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label3_loc;
      var l4 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label4_loc;
      var l5 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label5_loc;
      var l6 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label6_loc;
      var l7 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label7_loc;
      var l8 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label8_loc;
	  var l9 = 'http://'+ball+'.fantasysports.yahoo.com/' + pf + '/' + str1 + Label9_loc;
      
	  myLinks.innerHTML = '<ul>' + 
         '<li style="padding-left:10px;"><a href="' + l0 + '" target="_blank">'+allO_label+'</a></li>' + 
         '<li><a href="' + l1 + '" target="_blank">'+Label1+'</a></li>' + 
         '<li><a href="' + l2 + '" target="_blank">'+Label2+'</a></li>' + 
         '<li><a href="' + l3 + '" target="_blank">'+Label3+'</a></li>' + 
         '<li><a href="' + l4 + '" target="_blank">'+Label4+'</a></li>' + 
         '<li><a href="' + l5 + '" target="_blank">'+Label5+'</a></li>' + 
         '<li><a href="' + l6 + '" target="_blank">'+Label6+'</a></li>' + 
         '<li><a href="' + l7 + '" target="_blank">'+Label7+'</a></li>' + 
         '<li><a href="' + l8 + '" target="_blank">'+Label8+'</a></li>' + 
		 '<li><a href="' + l9 + '" target="_blank">'+Label9+'</a></li>' + 
         '</ul>';

		 //document.getElementById('yspsubnav').parentNode.insertBefore(myLinks,document.getElementById('yspsubnav').nextSibling);
		 document.getElementById('yspcontentfooter').parentNode.insertBefore(myLinks,document.getElementById('yspcontentfooter').nextSibling);
	}

function addSearchBoxonTop() {
   var mysearch = document.createElement('span');
   mysearch.setAttribute("style", "float:right;padding-right:15px;padding-top:2px;padding-bottom:2px;");
   mysearch.innerHTML = '<form method="post" action="/' + pf + '/' + str1 +'/playersearch">' +
		'<input name="search" class="text" id="playersearchtext" value="" type="text" style="width:150px;">' +
		'<input class="button" value="Find Player" type="submit"></form>';
	
	// insert the search box
   var ulist = document.getElementById("yspsubnav").getElementsByTagName("ul")[0];
   if (ulist) {
     ulist.parentNode.insertBefore(mysearch, ulist.nextSibling);
   }
}


if (window.content.location.href.match(firstre)) {
	var pf = window.content.location.href.split(".com/")[1].split("/")[0];
	var str1 = window.content.location.href.split(pf+"/")[1].split("/")[0];
	
	// add build the search box
	addSearchBoxonTop();
	
    // find the yspsubnav element
   var yspsubnav = document.getElementById('yspsubnav');
   
   if (yspsubnav) {
      // build the playerlinks
		runLinkBuild(ball);
	}
	
      // add a few styles for the player links
      GM_addStyle('#yspplayerlinks a:hover {text-decoration:underline !important;} #yspplayerlinks a { padding:5px 10px 10px 10px !important; text-decoration:none !important; line-height:150% !important;} #yspplayerlinks {border-top:0 !important; font:bold 77% Verdana !important; zoom:1 !important; background:#fff !important; }');
}
