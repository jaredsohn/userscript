// This script will add the player search box and Free Agent Links to the top of your team page to allow for quick and convienient player searches.
//
// ==UserScript==
// @name          Yahoo Fantasy NFL Player Search Box and Free Agent Links
// @namespace     http://www.kmhi.org/greasemonkey
// @description   adds Free Agent links and a Player Search to the top of the "MY TEAM" page
// @include       http://football.fantasysports.yahoo.com/f*
// ==/UserScript==
//

var firstre = new RegExp
firstre = /^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/\d{1,2}/i;

if (location.href.match(firstre)) {
	var d = new Date();
	var curr_year = d.getFullYear();

	// Get href vars
	if (location.href.match("/f1/")) {
		var str1 = location.href.split("/f1/")[1].split("/")[0];
		var pf = "f1";
	} else if (location.href.match("/f2/")) {
		var str1 = location.href.split("/f2/")[1].split("/")[0];
		var pf = "f2";
	};

   // find the yspsubnav element
   var yspsubnav = document.getElementById('yspsubnav');
   if (yspsubnav) {
      // build the playerlinks and search box
      var myLinks = document.createElement('div');
      myLinks.setAttribute("id","yspplayerlinks");
      myLinks.setAttribute("class","navlist");
      var allO = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=O&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var wr = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=WR&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var qb = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=QB&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var rb = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=RB&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var te = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=TE&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var k = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=K&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var d = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=D&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var db = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=DB&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
      var dl = 'http://football.fantasysports.yahoo.com/' + pf + '/' + str1 +'/players?status=A&pos=DL&cut_type=9&stat1=S_S_' + curr_year + '&sort=PTS';
	  myLinks.innerHTML = '<ul>' + 
         '<li style="padding-left:10px;"><a href="' + allO + '" target="_blank">All Offense</a></li>' + 
         '<li><a href="' + wr + '" target="_blank">WR</a></li>' + 
         '<li><a href="' + qb + '" target="_blank">QB</a></li>' + 
         '<li><a href="' + rb + '" target="_blank">RB</a></li>' + 
         '<li><a href="' + te + '" target="_blank">TE</a></li>' + 
         '<li><a href="' + k + '" target="_blank">K</a></li>' + 
         '<li><a href="' + d + '" target="_blank">D</a></li>' + 
         '<li><a href="' + db + '" target="_blank">DB</a></li>' + 
         '<li><a href="' + dl + '" target="_blank">DL</a></li>' + 
         '</ul>' +
		 '<span id="yspplayersearch">' +
		 '<form method="post" action="/' + pf + '/' + str1 +'/playersearch">' +
		 '<input name="search" class="text" id="playersearchtext" value="" type="text" style="width:150px;">' +
		 '<input class="button" value="Find Player" type="submit"></form>' +
		 '</span>';
	  
      // insert the playerlinks and search box
      yspsubnav.parentNode.insertBefore(myLinks, yspsubnav.nextSibling);
      
      // add a few styles for the player links
      addGlobalStyle('#yspplayerlinks a:hover { text-decoration:underline; }');
      addGlobalStyle('#yspplayerlinks a { padding:5px 10px 10px 10px; text-decoration:none; line-height:150%; }');
      addGlobalStyle('#yspplayerlinks { border-top:0; font:bold 77% Verdana; zoom:1; background:#fff; }');
	  addGlobalStyle('#yspplayersearch { float:right;padding-right:15px;padding-top:2px;padding-bottom:2px; }');
   };
};

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
