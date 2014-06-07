// ==UserScript==
// @name           GLB Team Navigation
// @namespace      GLB
// @description    Team Navigation similar to Player Navigation script modded by DDC from pabst's work.
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// @include        http://goallineblitz.com/game/stadium.pl?team_id=*
// @include        http://goallineblitz.com/game/team_url.pl?team_id=*
// @include        http://goallineblitz.com/game/sell_team.pl?team_id=*
// @include        http://goallineblitz.com/game/team_gm.pl?team_id=*
// @include        http://goallineblitz.com/game/team_loan.pl?team_id=*
// @include        http://goallineblitz.com/game/team_item_fund.pl?team_id=*
// @include        http://goallineblitz.com/game/team_finances.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offers.pl?team_id=*
// @include        http://goallineblitz.com/game/team_tactics.pl?team_id=*
// @include        http://goallineblitz.com/game/team_energy_tactics.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offensive_playbook.pl?team_id=*
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @include        http://goallineblitz.com/game/team_package.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_ai_test.pl?team_id=*
// @include        http://goallineblitz.com/game/team_defense_ai_test.pl?team_id=*
// @include        http://goallineblitz.com/game/trade_history.pl?team_id=*
// ==/UserScript==
// 
// 


var timeout = 0;

window.setTimeout( function() {
   var url = window.location.href;

   if (url == "http://goallineblitz.com/game/home.pl") {
      // collect a list of my teams from the home page and save them
      var teams = [];
	  var p = document.getElementsByClassName("team_name_container");
      var q = document.getElementsByClassName("content_container team_simple");
	  for (var i=0; i<p.length; i++) {
          var a = p[i].getElementsByTagName("a");
          var name = a[0].innerHTML;
          var id = a[0].href.toString();          
		  id = id.slice(id.indexOf("_id=")+4);
		  teams.push(id);
		  teams.push(name);
	  }
      for (var z=0; z<q.length; z++) {
          var a = q[z].getElementsByTagName("a");
          var name = a[0].innerHTML;
          var id = a[0].href.toString();          
		  id = id.slice(id.indexOf("_id=")+4);
		  teams.push(id);
		  teams.push(name);
	  }
	  //console.log(players);
      GM_setValue("myTeams", teams.join());
   }
   else {
      // on all the other @include pages show the player navigation
      var savedTeams = GM_getValue("myTeams", null);
      var myTeams= new Array();
      if(savedTeams != null){      
         var teams = savedTeams.split(",");
         for(var i=0;i<teams.length;i=i+2){
            myTeams[teams[i]] = teams[i+1];
         }
         
         addNavigation(myTeams);
      }
   }
},timeout);

function addNavigation(playerInfo){
   var url = window.location.href;
   var currentId = url.substring(window.location.href.indexOf('_id=')+4, url.length);
   var currentPage = url.substring(0, url.indexOf('_id=')+4);
   
   if(playerInfo[currentId] && playerInfo.length > 1){   
      var html = '<ul class="nav"><li style="font-weight:700;"><span style="margin-right:5px;">' + playerInfo[currentId] + '</span><ul>';
      for (var key in playerInfo){ 
         if(key != currentId){
            html = html + '<li><a href="' + currentPage + key + '">' + playerInfo[key] + '</a></li>';
         }
      }      
      html = html + '</ul></li></ul>';
      
      var players = getElements("*", "class", "big_head subhead_head");
      if (players[0].innerHTML.indexOf('(') > -1) {
          var pt2 = players[0].innerHTML.substring(players[0].innerHTML.indexOf('('),players[0].innerHTML.length);
      }else{
          var pt2 = '';
      }
      players[0].innerHTML = html + pt2;
      
      // inject the CSS
      var css = 'ul.nav, .nav ul{ background-color:#FBFBF8;margin: 0; padding: 0; cursor: default; list-style-type: none; display: inline;} ' +
         'ul.nav{ display: table;} ' +
         'ul.block{ width: 100%; table-layout: fixed;} ' +
         'ul.nav>li{display: table-cell;position: relative;padding: 2px 6px;background-position:right;background-repeat: no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAIAAAF7nxqgAAAAB3RJTUUH2AYbDS8ZRE4SIgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAABsSURBVHjaY/z9+wcDAwMTAxigUgxAOSYoF4QZIWqBgAWIlzoqooghWDDt6Cx0HdjUIWSxSBInBLGGaLOoYCOJQojQg4Do/feZIBScT3t3YTGeKH1DQxELMgc5rBmQwhmUvtHQAhtJNJEhG04ALZNRuimStFYAAAAASUVORK5CYII=)} ' +
         'ul.nav li:hover{background-position:right;background-repeat: no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAIAAAF7nxqgAAAAB3RJTUUH2AYbDS8nhS8PiQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAABpSURBVHjaY1xgI8nAwMDEAAaoFANQjgnKBWFGiFogYAHi6P33UcQQLJh2dBa6DmzqELJYJIkTglhDtFlUsJFEIUToQcBSR0UmCAXn095dWIwnSt/QUMSCzEEOawakcMYSBEClcOkhHk4AyZAdx5IhKz0AAAAASUVORK5CYII=)} ' +
         'ul.nav li>ul{display: none;position: absolute;max-width: 40ex;margin-left: -6px;margin-top: 2px;} ' +
         'ul.nav li:hover>ul{display : block;z-index:1000;} ' +
         '.nav ul li a{display: block;padding: 2px 10px;} ' +
         '/*Menu styles*/ ' +
         'ul.nav,.nav ul,.nav ul li a{background-color:#FBFBF8;color: #a03c19;} ' +
         'ul.nav li:hover,.nav ul li a:hover{background-color: #a03c19;color: #fff;} ' +
         'ul.nav li:active,.nav ul li a:active{background-color: #036;color: #fff;} ' +
         'ul.nav,.nav ul{border: 1px solid #fbdacf;} ' +
         '.nav a{text-decoration: none;} ';
      addGlobalStyle(css);      
   }
}

function getElements(element, classname, value){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(classname != undefined)
      if(value != undefined)
         xpathExp = xpathExp + "[@" + classname + "='" + value + "']";
      else
         xpathExp = xpathExp + "[@" + classname + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
