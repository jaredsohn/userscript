// ==UserScript==
// @name           Rafa's New Season Table
// @version        1
// @namespace      http://ellab.org/
// @description    Rafael Benitez said it is a new season for Liverpool, on 10-Dec-2009 after lost to Fiorentina.  With this script you can view the 'New Season' table in Soccernet
// @include        http://soccernet.espn.go.com/tables?league=eng.1&cc=4716
// ==/UserScript==

/*
Author: Angus @angusdev
Date:   2009-12-14

Version history:
1    14-Dec-2009    Initial release
*/

(function(){

var res = document.evaluate("//table[@id='Live_false_group_1']/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (!res || res.snapshotLength == 0) {
  return;
}

var league_dropdown = document.evaluate("//form[@name='menu']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (league_dropdown) {
  var div = document.createElement('DIV');
  div.setAttribute('style', 'float: left; margin-left: 25px;');
  var a = document.createElement('A');
  a.innerHTML = "Rafa's New Season";
  a.href = 'javascript:void(0);';
  a.addEventListener('click', function(e) {
    var title_res = document.evaluate("//div[@class='content']//div[@class='autoPageHeader']/h1[@class='autoPageTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (title_res) {
      title_res.innerHTML += "Rafa's New Season";
    }
    e.target.parentNode.removeChild(e.target);
    on_click_new_season();
  }, false);
  div.appendChild(a);
  league_dropdown.parentNode.parentNode.insertBefore(div, league_dropdown.parentNode);
}

function on_click_new_season() {
  // league table as of 11-Dec-2009
  var last_season_result =
  [
  /* Chelsea                 */ {team:363, p:15, w:12, d:0, l:3,  gs:37, ga:10, hw:7, hd:0, hl:0, hgs:20, hga:1,  aw:5, ad:0, al:3, ags:17, aga:9,  gd:27,  pts:36},
  /* Manchester United       */ {team:360, p:15, w:11, d:1, l:3,  gs:34, ga:13, hw:6, hd:1, hl:0, hgs:16, hga:7,  aw:5, ad:0, al:3, ags:18, aga:6,  gd:21,  pts:34},
  /* Arsenal                 */ {team:359, p:14, w:9,  d:1, l:4,  gs:38, ga:18, hw:6, hd:0, hl:1, hgs:22, hga:7,  aw:3, ad:1, al:3, ags:16, aga:11, gd:20,  pts:28},
  /* Tottenham Hotspur       */ {team:367, p:15, w:8,  d:3, l:4,  gs:35, ga:21, hw:5, hd:0, hl:2, hgs:21, hga:7,  aw:3, ad:3, al:2, ags:14, aga:14, gd:14,  pts:27},
  /* Aston Villa             */ {team:362, p:15, w:7,  d:5, l:3,  gs:25, ga:14, hw:5, hd:2, hl:1, hgs:16, hga:6,  aw:2, ad:3, al:2, ags:9,  aga:8,  gd:11,  pts:26},
  /* Manchester City         */ {team:382, p:14, w:6,  d:7, l:1,  gs:26, ga:18, hw:4, hd:3, hl:0, hgs:16, hga:10, aw:2, ad:4, al:1, ags:10, aga:8,  gd:8,   pts:25},
  /* Liverpool               */ {team:364, p:15, w:7,  d:3, l:5,  gs:31, ga:20, hw:4, hd:2, hl:1, hgs:21, hga:8,  aw:3, ad:1, al:4, ags:10, aga:12, gd:11,  pts:24},
  /* Fulham                  */ {team:370, p:15, w:6,  d:4, l:5,  gs:19, ga:16, hw:5, hd:1, hl:2, hgs:12, hga:6,  aw:1, ad:3, al:3, ags:7,  aga:10, gd:3,   pts:22},
  /* Birmingham              */ {team:392, p:15, w:6,  d:3, l:6,  gs:15, ga:16, hw:3, hd:2, hl:2, hgs:5,  hga:4,  aw:3, ad:1, al:4, ags:10, aga:12, gd:-1,  pts:21},
  /* Sunderland              */ {team:366, p:15, w:6,  d:2, l:7,  gs:21, ga:21, hw:5, hd:1, hl:1, hgs:16, hga:9,  aw:1, ad:1, al:6, ags:5,  aga:12, gd:0,   pts:20},
  /* Stoke City              */ {team:336, p:15, w:5,  d:5, l:5,  gs:13, ga:17, hw:4, hd:1, hl:2, hgs:9,  hga:7,  aw:1, ad:4, al:3, ags:4,  aga:10, gd:-4,  pts:20},
  /* Blackburn Rovers        */ {team:365, p:15, w:5,  d:3, l:7,  gs:16, ga:28, hw:4, hd:3, hl:1, hgs:11, hga:7,  aw:1, ad:0, al:6, ags:5,  aga:21, gd:-12, pts:18},
  /* Burnley                 */ {team:379, p:15, w:5,  d:2, l:8,  gs:19, ga:33, hw:5, hd:1, hl:1, hgs:11, hga:6,  aw:0, ad:1, al:7, ags:8,  aga:27, gd:-14, pts:17},
  /* Wigan Athletic          */ {team:350, p:15, w:5,  d:2, l:8,  gs:17, ga:34, hw:3, hd:2, hl:3, hgs:9,  hga:12, aw:2, ad:0, al:5, ags:8,  aga:22, gd:-17, pts:17},
  /* Everton                 */ {team:368, p:15, w:4,  d:4, l:7,  gs:19, ga:27, hw:2, hd:4, hl:2, hgs:11, hga:14, aw:2, ad:0, al:5, ags:8,  aga:13, gd:-8,  pts:16},
  /* Hull City               */ {team:306, p:16, w:4,  d:4, l:8,  gs:17, ga:34, hw:4, hd:2, hl:2, hgs:12, hga:13, aw:0, ad:2, al:6, ags:5,  aga:21, gd:-17, pts:16},
  /* West Ham United         */ {team:371, p:15, w:3,  d:5, l:7,  gs:24, ga:30, hw:2, hd:2, hl:4, hgs:15, hga:19, aw:1, ad:3, al:3, ags:9,  aga:11, gd:-6,  pts:14},
  /* Wolverhampton Wanderers */ {team:380, p:15, w:3,  d:4, l:8,  gs:14, ga:28, hw:2, hd:2, hl:4, hgs:7,  hga:12, aw:1, ad:2, al:4, ags:7,  aga:16, gd:-14, pts:13},
  /* Bolton Wanderers        */ {team:358, p:14, w:3,  d:3, l:8,  gs:17, ga:29, hw:1, hd:2, hl:4, hgs:8,  hga:15, aw:2, ad:1, al:4, ags:9,  aga:14, gd:-12, pts:12},
  /* Portsmouth              */ {team:385, p:15, w:3,  d:1, l:11, gs:13, ga:23, hw:2, hd:0, hl:6, hgs:10, hga:12, aw:1, ad:1, al:5, ags:3,  aga:11, gd:-10, pts:10}
  ];

  var new_team_array = [];
  for (var i=0;i<res.snapshotLength;i++) {
    var tr = res.snapshotItem(i);
    var team_id = tr.cells[2].innerHTML.match(/\?id=(\d+)/);
    team_id = team_id?team_id[1]:null;
    for (var j=0;j<last_season_result.length;j++) {
      if (last_season_result[j].team == team_id) {
        var new_team = {team:team_id};

        var k=-1;
        new_team.rank = parseInt(tr.cells[++k].innerHTML, 10);
        ++k;
        new_team.name = tr.cells[++k].innerHTML;
        new_team.p    = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].p;
        new_team.w    = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].w;
        new_team.d    = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].d;
        new_team.l    = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].l;
        new_team.gs   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].gs;
        new_team.ga   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].ga;
        ++k;
        new_team.hw   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].hw;
        new_team.hd   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].hd;
        new_team.hl   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].hl;
        new_team.hgs  = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].hgs;
        new_team.hga  = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].hga;
        ++k;
        new_team.aw   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].aw;
        new_team.ad   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].ad;
        new_team.al   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].al;
        new_team.ags  = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].ags;
        new_team.aga  = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].aga;
        ++k;
        new_team.gd   = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].gd;
        new_team.pts  = parseInt(tr.cells[++k].innerHTML, 10) - last_season_result[j].pts;

        new_team_array.push(new_team);

        break;
      }
    }
  }

  // sort the new team array
  new_team_array.sort(function(a, b) {
    if (a.pts != b.pts) {
      return b.pts - a.pts;
    }
    if (a.gd != b.gd) {
      return b.gd - a.gd;
    }
    if (a.gs != b.gs) {
      return b.gs - a.gs
    }
    return a.team - b.team;
  });

  // fill in the new table
  for (var i=0;i<res.snapshotLength;i++) {
    var tr = res.snapshotItem(i);
    if (i<new_team_array.length) {
      var k=1;
      tr.cells[++k].innerHTML = new_team_array[i].name;
      tr.cells[++k].innerHTML = new_team_array[i].p;
      tr.cells[++k].innerHTML = new_team_array[i].w;
      tr.cells[++k].innerHTML = new_team_array[i].d;
      tr.cells[++k].innerHTML = new_team_array[i].l;
      tr.cells[++k].innerHTML = new_team_array[i].gs;
      tr.cells[++k].innerHTML = new_team_array[i].ga;
      ++k;
      tr.cells[++k].innerHTML = new_team_array[i].hw;
      tr.cells[++k].innerHTML = new_team_array[i].hd;
      tr.cells[++k].innerHTML = new_team_array[i].hl;
      tr.cells[++k].innerHTML = new_team_array[i].hgs;
      tr.cells[++k].innerHTML = new_team_array[i].hga;
      ++k;
      tr.cells[++k].innerHTML = new_team_array[i].aw;
      tr.cells[++k].innerHTML = new_team_array[i].ad;
      tr.cells[++k].innerHTML = new_team_array[i].al;
      tr.cells[++k].innerHTML = new_team_array[i].ags;
      tr.cells[++k].innerHTML = new_team_array[i].aga;
      ++k;
      tr.cells[++k].innerHTML = new_team_array[i].gd;
      tr.cells[++k].innerHTML = new_team_array[i].pts;
    }
  }
}

})();