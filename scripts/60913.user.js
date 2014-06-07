// ==UserScript==
// @name           Alliance Stats
// @namespace      cybernations.net
// @include        http://www.cybernations.net/stats_alliance_stats_custom.asp?Alliance=Seaworthy%20Liberian%20Cardboard%20Boxes
// ==/UserScript==


//When you go on alliance page, nations, strength, avg strength, score, infra, tech, nukes, Stock markets, MHP's, SDI's, WRC's, Pentagon, HNMS, FAFB, DRA, SSS, Harbour and Foreign Ministry




var alliances = [
  'Seaworthy Liberian Cardboard Boxes'
];
var includeTopAlliances = false;

//Spelling and spacing counts!!
var improvements = [
  'Harbors',
  'Foreign Ministries'
];

//Spelling and spacing counts!!
var wonders = [
  'Stock Markets',
  'Manhattan Projects',
  'Strategic Defense Initiatives',
  'Weapons Research Complexes',
  'Pentagons',
  'Hidden Nuclear Missile Silos',
  'Foreign Airforce Base',
  'Disaster Relief Agencies',
  'Social Security Systems'
];







////// DO NOT ALTER BELOW THIS POINT (I'm seriously joo guys)
/////////////////////////////////////////////////////////////







var alliancesStats = new Array();
var statLabels = [
  'Total Nations',
  'Active Nations',
  'Percent Active',
  'Strength',
  'Average Strength',
  'Score',
  'Land',
  'Infras.',
  'Tech',
  'Aircraft',
  'Nukes',
  'Anarchy',
  'Soldiers',
  'Tanks',
  'Cruise',
  'Navy',
  'War',
  'Peace'
];
var i_w = new Array();
for (var i = 0; i < improvements.length; i++) {
  statLabels.push(improvements[i]);
  i_w.push(improvements[i].replace(/^\s*(.*)\s*$/, '$1'));
}
for (var i = 0; i < wonders.length; i++) {
  statLabels.push(wonders[i]);
  i_w.push(wonders[i].replace(/^\s*(.*)\s*$/, '$1'));
}


function str_repeat(str, multiplier) {
  return new Array(multiplier+1).join(str);
}


drawChart = function() {
  /*
  var table = document.getElementById('table17');
  var tr = document.createElement('tr');
  table.appendChild(tr);
  
  var td = document.createElement('td');
      td.colSpan = 2;
  tr.appendChild(td);
  */
  var body = document.getElementsByTagName('body')[0];
  
  var pre = document.createElement('pre');
  //for (var a = 0; a < alliances.length; a++) {
  a = 0;
    pre.innerHTML += alliances[a] + "\n";
    for (var stat = 0; stat < statLabels.length; stat++) {
      pre.innerHTML += '  ' + statLabels[stat] + ': ' + alliancesStats[a][stat] + "\n";
    }
    pre.innerHTML += "\n";
  //}
  //td.appendChild(pre);
  body.appendChild(pre);
}


function getAlliances(source) {
  var regex = new RegExp('<option value="([^other|http][^>]+)">[^<]*</option>');
  while (source.match(regex)) {
    var m = source.match(regex)[1];
    alliances.push(m);
    source = source.replace(m, '');
  }
  
  //call the next portion of the script through a function because ajax may take too long to respond and thus array won't be populated
  //alert("Alliances:\n" + alliances.join("\n"));
  alliancesGathered();
}

if (includeTopAlliances) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.cybernations.net/stats_alliance_stats_custom.asp',
    headers: {
      'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.3',
      'Accept': 'application/atom+xml,application/xml,text/xml, application/csv;',
      'Cookie': document.cookie
    },
    onload: function(responseDetails) {
      getAlliances(responseDetails.responseText);
    },
    onreadystatechange: function(responseDetails){
      //console.log('Ready State ExportGD: ' + responseDetails.readyState);
    }
  });
} else {
  alliancesGathered();
}



function getAllianceStats(allianceIndex, source) {
  //alert('begin: ' + allianceIndex);
  var allianceName = alliances[allianceIndex];
  alliancesStats[allianceIndex] = [];
  source = source.replace(/\n/g, '').replace(/\r/g, '');
  
  var stats = source.match(/^.*Alliance Query Results(.*)Alliance Nation Statistics(.*)Alliance Improvements &amp; Wonders(.*)Alliance History Chart.*$/i);
  if (stats.length != 4) {
    for (var i = 0; i < statLabels.length; i++) {
      alliancesStats[allianceIndex].push('N/A');
    }
    return;
  }
  
  //Query Results
  var regex = new RegExp(allianceName + '</a>[\s\t]+' + str_repeat('</td>[\s\t]+<td[^>]+>[\s\t]+([0-9,.%]+)[\s\t]+', 6) + '</td>[\s\t]+</tr>');
  if (stats[1].match(regex)) {
    var stat = stats[1].match(regex);
    for (var i = 1; i <= 6; i++) {
      if (stat[i]) {
        alliancesStats[allianceIndex].push(stat[i]);
      } else {
        alliancesStats[allianceIndex].push('N/A');
      }
    }
  } else {
    for (var i = 1; i <= 6; i++) {
      alliancesStats[allianceIndex].push('N/A');
    }
  }
  
  //Nation Statistics
  var regex = new RegExp('<td align="center">([0-9,]+)</td>');
  while (stats[2].match(regex)) {
    var m = stats[2].match(regex)[1];
    alliancesStats[allianceIndex].push(m);
    stats[2] = stats[2].replace('<td align="center">' + m + '</td>', '');
  }
  
  //Improvements and Wonders
  if (i_w.length > 0) {
    for (var i = 0; i < i_w.length; i++) {
      var regex = new RegExp('([0-9,]+)\\s+' + i_w[i] + '\\s*<br>', 'i');
      var stat = stats[3].match(regex);
      if (stat && stat[1]) {
        alliancesStats[allianceIndex].push(stat[1]);
      } else {
        alliancesStats[allianceIndex].push('N/A');
      }
    }
  }
  
  
  //alert(alliances.length + ' vs ' + (parseInt(allianceIndex)+1));
  if (alliances.length == parseInt(allianceIndex)+1) {
    /*
    var table = document.getElementById('table17');
    var tr = document.createElement('tr');
    table.appendChild(tr);
    
    var td = document.createElement('td');
        td.colSpan = 2;
    tr.appendChild(td);
    */
    var body = document.getElementsByTagName('body')[0];
    
    var pre = document.createElement('pre');
    for (var a = 0; a < alliances.length; a++) {
      pre.innerHTML += alliances[a] + "\n";
      for (var stat = 0; stat < statLabels.length; stat++) {
        pre.innerHTML += '  ' + statLabels[stat] + ': ' + alliancesStats[a][stat] + "\n";
      }
      pre.innerHTML += "\n";
    }
    //td.appendChild(pre);
    body.appendChild(pre);
  }
}

function alliancesGathered() {
  //alert("Alliances:\n" + alliances.join("\n"));
  
  //alert('len: ' + alliances.length);
  for (var allianceIndex = 0; allianceIndex < alliances.length; allianceIndex++) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.cybernations.net/stats_alliance_stats_custom.asp?Alliance=' + alliances[allianceIndex],
      headers: {
        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml, application/csv;',
        'Cookie': document.cookie
      },
      onload: function(responseDetails) {
        getAllianceStats(allianceIndex, responseDetails.responseText);
      },
      onreadystatechange: function(responseDetails){
        //console.log('Ready State ExportGD: ' + responseDetails.readyState);
      }
    });
  }
}
