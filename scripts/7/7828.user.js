// Neopets - High Scores Counter
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name          Neopets - High Scores Counter
// @namespace     http://userscripts.org/users/22349
// @description   V 3.00 - Counts up all the different rankings.  Links the username to their lookup.
// @include       http://www.neopets.com/mygamescores.phtml*
// @include       http://neopets.com/mygamescores.phtml*
// @version       3.00
// @updated       2009.07.18
// ==/UserScript==
(function(){

// ranks[id,name,count,default value]
  var ranks = new Array(
['xgma', 'Grand Master', 0, 'on'],
['xmas', 'Master', 0, 'off'],
['xexp', 'Expert', 0, 'off'],
['xnov', 'Novice', 0, 'off'],
['xama', 'Amateur', 0, 'off'],
['xbeg', 'Beginner', 0, 'off']);

// add top links, make name clickable
  if (document.location.href.match('randomfriend=')) {
    contentDiv = document.evaluate('//td[@class="content"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
    contentDiv.innerHTML = contentDiv.innerHTML.replace(/<p><b>(\w+)<\/b> has/, '<p><b><a href=/userlookup.phtml?user=$1>$1</a></b> has');
    contentDiv.innerHTML = contentDiv.innerHTML.replace('<b>My High Scores</b>', '<b>My High Scores</b><p></p><center><a href="prizes.phtml"><b>Trophy Cabinet</b></a> | <a href="gamescores.phtml"><b>High-Score Tables</b></a> | <a href="mygamescores.phtml"><b>My Scores</b></a></center>');
  }

  if (document.body.textContent.match('high scores!')){           // keep going if there are more than 1 game score
    allRows = document.evaluate('//table[@align="center"][@border="1"][@cellpadding="3"]//tr',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var t = 0, thisRow; thisRow = allRows.snapshotItem(t); t++){
      for (x in ranks){
        if (thisRow.innerHTML.match('<b>'+ranks[x][1]+'</b>')){
          ranks[x][2] += 1; thisRow.setAttribute('name', ranks[x][0]);
          break;
        }
      }
    }

    countDiv = document.createElement('div');
    countDiv.setAttribute('style', 'margin-bottom: 7px;');
    countDiv.setAttribute('class', 'sidebarModule');
    var countTable = '<table width="160" cellspacing="0" cellpadding="2" border="0" class="sidebarTable"><tbody><tr><td valign="middle" class="sidebarHeader medText">Rankings</td></tr><tr><td align="center" class="activePetInfo"><table width="100%" cellspacing="0" cellpadding="1" border="0"><tbody>';
    for (x in ranks){
      if (ranks[x][2] > 0){
        countTable += '<tr><td align=right width="90">'+ranks[x][1]+':</td><td align=left><b>'+ranks[x][2]+'</b></td><td width="20"><input id="'+ranks[x][0]+'" type="checkbox" title="Highlight all '+ranks[x][1]+' rankings"></td></tr>';
      }
    }
    countTable += '</tbody></table></td></tr></tbody></table>';
    countDiv.innerHTML = countTable;
    sidebar = document.evaluate('//td[@width="178"][@class="sidebar"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
    if (!sidebar){return;}
    sidebar.insertBefore(countDiv, sidebar.firstChild.nextSibling);

    function setListener(n){
      if (document.getElementById(n)){
        document.getElementById(n).addEventListener('click',function(){
          if(document.getElementById(n).checked){
            for (i = 0, thisRow; thisRow = document.getElementsByName(n)[i]; i++){
              thisRow.innerHTML = thisRow.innerHTML.replace(/eeeeff/gi, 'ffffcc');
            }
            GM_setValue(n, 'on')
          }
          else {
            for (i = 0, thisRow; thisRow = document.getElementsByName(n)[i]; i++){
              thisRow.innerHTML = thisRow.innerHTML.replace(/ffffcc/gi, 'eeeeff');
            }
            GM_setValue(n, 'off');
          }
          this.blur();
        }, false);
      }
    }
    for (x in ranks){setListener(ranks[x][0]);}
  }
// remove "To the Games Room!" button
  for (x = 0; x < document.forms.length; x++){
    if (document.forms[x].action.match('arcade.phtml')){
      document.forms[x].parentNode.parentNode.removeChild(document.forms[x].parentNode);
    }
  }
// highlight saved rank scheme
  for (x in ranks){
    if (document.getElementById(ranks[x][0]) && GM_getValue(ranks[x][0], ranks[x][3]) == 'on'){
      document.getElementById(ranks[x][0]).click();
    }
  }

})();