// ==UserScript==
// @name           char history
// @namespace      http://userscripts.org/scripts/show/90353
// @include        http://mafiamatrix.com/stats/*
// @require	   http://secretz.kapsi.fi/mmfiles/001jquery-1.4.3.min.js
// ==/UserScript==

$(document).ready(function() {

  // Contains [optionA, optionB] where optionX = [def,off,int]
  var promoStats = 
  [
    ////////////////////////////////
    // Mayor                    idx0
    [
      [[350,  0,  0], [  0,  0,  0]]
    ],
    ////////////////////////////////
    // Hospital                 idx1
    [
      [[ 10, 12, 30], [ 15, 20,  5]],
      [[105, 54,  5], [185, 15, 35]],
      [[115, 74, 10], [205, 25, 35]],
      [[110, 12, 20], [ 80, 50,  5]]
    ],
    ////////////////////////////////
    // Mort                     idx2
    [
      [[100, 12, 15], [ 60, 30, 30]],
      [[ 90, 15, 20], [120, 25, 15]],
      [[110, 12, 15], [ 95, 40,  5]]
    ],
    ////////////////////////////////
    // Legal                    idx3
    [
      [[100, 15, 20], [ 80, 22, 25]],
      [[110, 15, 20], [ 90, 30, 35]],
      [[250, 20, 35], [250, 20, 35]],
      [[100,350, 35], [350,100, 55]]
    ],
    ////////////////////////////////
    // Bank                     idx4
    [
      [[ 10,  5, 10], [  6, 10, 10]],
      [[105, 12, 20], [ 95, 25,  5]],
      [[ 50,  5, 20], [116,  5, 22]]
    ],
    ////////////////////////////////
    // Army                     idx5
    [
      [[  0,  0,  0], [  0,  0,  0]],
      [[ 70, 10, 10], [ 10, 70, 20]],
      [[ 95, 18, 20], [ 65, 70, 30]],
      [[ 20,100, 20], [100, 20, 30]],
      [[150,200, 40], [  0,  0,  0]]
    ],
    ////////////////////////////////
    // Police                   idx6
    [
      [[  0,  0,  0], [  0,  0,  0]],
      [[210, 12, 25], [150, 45, 35]],
      [[260, 30, 14], [150, 35, 12]],
      [[210, 12, 15], [170, 40, 30]],
      [[350, 10, 15], [250, 50, 25]]
    ],
    ////////////////////////////////
    // Fire                     idx7
    [
      [[  0,  0,  0], [  0,  0,  0]],
      [[115, 65, 10], [205, 25, 45]],
      [[200, 50, 20], [150,100, 25]]
    ],
    ////////////////////////////////
    // Gangster                 idx8
    [
      [[  8, 12, 20], [ 16, 22,  5]],
      [[  0,  0,  0], [  0,  0,  0]],
      [[  0,  0,  0], [  0,  0,  0]],
      [[ 12, 19, 25], [ 20, 29, 10]],
      [[ 30, 20, 30], [ 21, 35, 12]],
      [[ 20, 18, 30], [ 20, 30, 10]],
      [[  0,  0,  0], [  0,  0,  0]],
      [[ 20, 24, 10], [ 18,  0, 35]],
      [[ 15, 15, 35], [ 20, 20, 15]],
      [[  0,  0,  0], [  0,  0,  0]],
      [[  0,  0,  0], [  0,  0,  0]]
    ],
    ////////////////////////////////
    // Jail                     idx9
    [
      [[  0,  0,  0], [  0,  0,  0]],
      [[  0,  0,  0], [  0,  0,  0]],
      [[  0,  0,  0], [  0,  0,  0]],
      [[  0,  0,  0], [  0,  0,  0]]
    ]
  ];
  
  String.prototype.remove = function(t) {
    s = this;
    k = s.indexOf(t);
    r = "";
    if (k == -1) return s;
    r += s.substring(0,k) + s.substring(k + t.length).remove(t);
    return r;
  }
  
  var promoMap = new Array();
  promoMap["Mayor"]                  = [0, 0];
  
  promoMap["Nurse"]                  = [1, 0];
  promoMap["Doctor"]                 = [1, 1];
  promoMap["Surgeon"]                = [1, 2];
  
  promoMap["Hospital Director"]      = [1, 3];
  promoMap["Mortician Assistant"]    = [2, 0];
  promoMap["Mortician"]              = [2, 1];
  promoMap["Funeral Director"]       = [2, 2];
  
  promoMap["Legal Secretary"]        = [3, 0];
  promoMap["Lawyer"]                 = [3, 1];
  promoMap["Judge"]                  = [3, 2];
  promoMap["Supreme Court Judge"]    = [3, 3];
  
  promoMap["Bank Teller"]            = [4, 0];
  promoMap["Loan Officer"]           = [4, 1];
  promoMap["Bank Manager"]           = [4, 2];
  
  promoMap["Private"]                = [5, 0];
  promoMap["Lance Corporal"]         = [5, 1];
  promoMap["2nd Lieutenant"]         = [5, 2];
  promoMap["Major"]                  = [5, 3];
  // Commander ???
  
  promoMap["Constable"]              = [6, 0];
  promoMap["Sergeant"]               = [6, 1];
  promoMap["Senior Sergeant"]        = [6, 2];
  promoMap["Detective"]              = [6, 3];
  promoMap["Commissioner"]           = [6, 4];
  
  promoMap["Volunteer Fire Fighter"] = [7, 0];
  promoMap["Fire Fighter"]           = [7, 1];
  promoMap["Fire Chief"]             = [7, 2];
  
  promoMap["Dealer"]                 = [8, 0];
  promoMap["Giovane D`Honore"]       = [8, 1];
  promoMap["Enforcer"]               = [8, 2];
  promoMap["Piciotto"]               = [8, 3];
  promoMap["Sgarrista"]              = [8, 4];
  promoMap["Capodecima"]             = [8, 5];
  promoMap["Caporegime"]             = [8, 6];
  promoMap["Boss"]                   = [8, 7];
  promoMap["Don"]                    = [8, 8];
  promoMap["Capi Di Tutti Capi"]     = [8, 9];
  
  promoMap["Schooled"]               = [9, 0];
  promoMap["Mule"]                   = [9, 1];
  promoMap["Hardrock"]               = [9, 2];
  promoMap["Lifer"]                  = [9, 3];
    

  // Total stats [min, max]
  var o = [0, 0];
  var d = [0, 0];
  var i = [0, 0];
  var l = [0, 0];

  // Calc aggs
  var aggs = new Array();
  $('[id=playerstats]').eq(1).children().children('tr:gt(1)').children('td').each(function(index) {
    var name = $(this).text().split(':')[0];
    var count = Number($(this).text().split(':')[1].remove(',').trim());
    aggs[name] = count;
  });

  var aggStats = 
  [
    ['Pickpocketing', 3, 1, 2],
    ['Muggins', 3, 1, 2],
    ['GTAs', 5, 2, 1],
    ['Break & Enters', 5, 3, 2],
    ['Torches', 5, 2, 3],
    ['Armed Robberies', 5,2,3],
    ['Bank Robberies', 0, 6, 0],
    ['Smuggle heroin into jail', 10, 10, 2],
    ['Hacking', 3, 1, 3]
  ]; 

  for (var a in aggStats) {
    aggOff = aggs[aggStats[a][0]]*aggStats[a][1];
    aggDef = aggs[aggStats[a][0]]*aggStats[a][2];
    aggLck = aggs[aggStats[a][0]]*aggStats[a][3];
    if (!isNaN(aggOff)) {
      o[0] += aggOff; 
      o[1] += aggOff;
    }
    if (!isNaN(aggDef)) {
      d[0] += aggDef;
      d[1] += aggDef;
    }
    if (!isNaN(aggLck)) {
      l[0] += aggLck;
      l[1] += aggLck;
    }
  }
  
  // Calc promo stats
  promos = new Array();
  $('[id=playerstats]').eq(6).children().children('tr:gt(2)').children('td').each(function(index) {
    	promos.push($(this).text());
  });

  for (var j in promos) {
    promo = promos[j];
    if (promoMap[promo] != undefined) {
      career = promoMap[promo][0];
      rank = promoMap[promo][1];
      d[0] += Math.min(promoStats[career][rank][0][0], promoStats[career][rank][1][0]);
      d[1] += Math.max(promoStats[career][rank][0][0], promoStats[career][rank][1][0]);
      o[0] += Math.min(promoStats[career][rank][0][1], promoStats[career][rank][1][1]);
      o[1] += Math.max(promoStats[career][rank][0][1], promoStats[career][rank][1][1]);
      i[0] += Math.min(promoStats[career][rank][0][2], promoStats[career][rank][1][2]);
      i[1] += Math.max(promoStats[career][rank][0][2], promoStats[career][rank][1][2]);
    }
  }

  // Police cases
  var cases = $('[id=playerstats] tr:eq(6) td').text().trim().split(':')[1].remove(',');
  o[0] += 1*Number(cases);
  o[1] += 1*Number(cases);
  d[0] += 3*Number(cases);
  d[1] += 3*Number(cases);
  
  // Judge cases
  var judge= $('[id=playerstats] tr:eq(8) td').text().trim().split(':')[1].remove(',');
  o[0] += Number(judge);
  o[1] += 2*Number(judge);
  d[0] += 3*Number(judge);
  d[1] += 6*Number(judge);
 
  //CS +2 int max
  CS = $('[id=playerstats] tr:eq(9) td').text().trim().split(':')[1].remove(',');
  i[1] += 2*Number(CS);
  
  //Drug units
  var units = $('[id=playerstats] tr:eq(12) td').text().trim().split(':')[1].remove(',');
  o[0] += 2*Number(units);
  o[1] += 2*Number(units);
  d[0] += 2*Number(units);
  d[1] += 2*Number(units);
  

  html = '<tr><table width="680" border="0" cellpadding="0" cellspacing="2" id="playerstats">';
  html += '<tr>';
  html += '<td colspan="4" class="title">Stats</td>';
  html += '</tr>';
  html += '<tr>';
  html += '<td width="120">Offense: '+o[0]+' - ' + o[1]+'</td>';
  html += '</tr>';
  html += '<tr>';
  html += '<td width="120">Defense: '+d[0]+' - ' + d[1]+'</td>';
  html += '</tr>';
  html += '<tr>';
  html += '<td width="120">Intelligence: '+i[0]+' - ' + i[1]+'</td>';
  html += '</tr>';
  html += '<tr>';
  html += '<td width="120">Stealth: '+l[0]+' - ' + l[1]+'</td>';
  html += '</tr></tr><br />';

  $('[id=playerstats] :first').before(html);
});