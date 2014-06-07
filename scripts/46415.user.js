// Neopets - Fetch Mapper
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Fetch Mapper
// @namespace      http://userscripts.org/users/22349
// @description    beta - Automatically draws the parts of the map you've seen.
// @include        http://www.neopets.com/games/maze/maze.phtml*
// @include        http://neopets.com/games/maze/maze.phtml*
// @version        beta
// @updated        2009.04.10 
// ==/UserScript==
/*
TO DO:
  get rid of big map?!?
  better placement of full map.
  
Info:
  I'm not sure if I want to continue working on this so I've released it as is.
  It works but could look and work better.
*/
(function(){
ctt = document.getElementById('content');
if (ctt.textContent.match('Moves Remaining')){                    //on the map screen
  stringMap = GM_getValue('fetchMap', ' , , , , ,- , , , , ,- , , , , ,- , , , , ,- , , , , ,-');
  savedMapGrid = stringMap.split('-');
  savedMapGrid.pop();
  for (x in savedMapGrid){
    savedMapGrid[x] = savedMapGrid[x].split(',');
    savedMapGrid[x].pop();
  }
  lastRow = parseInt(GM_getValue('lastRow', '2'));
  lastCol = parseInt(GM_getValue('lastCol', '2'));
  lastDir = 'none';
  if (ctt.textContent.match("You can't move that way!")){
    for (var x = 0, thisDiv; thisDiv = ctt.getElementsByTagName('div')[x]; x++){
      if (thisDiv.textContent.match(/^You can't move that way!/)){
        thisDiv.parentNode.removeChild(thisDiv.nextSibling);
        thisDiv.parentNode.removeChild(thisDiv);
        break;
      }
    }
  }
  else {
    if (document.location.href.match('movedir')){
      lastDir = document.location.href.match(/movedir=(\d)/)[1];
    }
  }
  if (lastDir == '0'){        //north
    lastRow = lastRow - 1;
    if (lastRow == 1){
      lastRow = 2;
      savedMapGrid.splice(0,0,'');
      savedMapGrid[0] = new Array();
      for (x in savedMapGrid[1]){
        savedMapGrid[0][x] = ' ';
      }
    }
  }
  else if (lastDir == '1'){   //south
    lastRow = lastRow + 1;
    if (lastRow == (savedMapGrid.length - 2)){
      savedMapGrid.push('');
      savedMapGrid[savedMapGrid.length - 1] = new Array();
      for (x in savedMapGrid[1]){
        savedMapGrid[savedMapGrid.length - 1][x] = ' ';
      }
    }
  }
  else if (lastDir == '2'){   //west
    lastCol = lastCol - 1;
    if (lastCol == 1){
      lastCol = 2;
      for (x in savedMapGrid){
        savedMapGrid[x].splice(0,0,' ');
      }
    }
  }
  else if (lastDir == '3'){   //east
    lastCol = lastCol + 1;
    if (lastCol == (savedMapGrid[1].length - 2)){
      for (x in savedMapGrid){
        savedMapGrid[x].push(' ');
      }
    }
  }
  if (ctt.textContent.match(/You found the exit, but/)){
    for (var x = 0, thisDiv; thisDiv = ctt.getElementsByTagName('div')[x]; x++){
      if (thisDiv.textContent.match(/^You found the exit, but/)){
        thisDiv.parentNode.removeChild(thisDiv.nextSibling);
        thisDiv.parentNode.removeChild(thisDiv);
        break;
      }
    }
  }

  var visibleMapArray = ctt.innerHTML.match(/path_(\w+)\.gif/g);
  for (x in visibleMapArray){
    visibleMapArray[x] = visibleMapArray[x].replace(/(path_)|(\.gif)/g, '');
  }

  for (var x = 0, thisTable; thisTable = ctt.getElementsByTagName('table')[x]; x++){
    if (thisTable.getAttribute('width') == '400' && thisTable.getAttribute('cellspacing') == '0'
    && thisTable.getAttribute('cellpadding') == '0' && thisTable.getAttribute('border') == '0'){
      thisTable.parentNode.setAttribute('id', 'orig_map');
      if (thisTable.innerHTML.match('maze/item') && !stringMap.match('_O')){           //find food
        for (var y = 0, thisElement; thisElement = thisTable.getElementsByTagName('td')[y]; y++){
          if (thisElement.innerHTML.match('maze/item')){
            var foodIndex = y;
          }
        }
      }
    }
  }
  
//make it a 2d grid
  var visibleMapGrid = new Array()
  for (m = 0, x = 0; m < 5; m++){
    visibleMapGrid[m] = new Array()
    for (n = 0; n < 5; n++, x++){
      visibleMapGrid[m][n] = visibleMapArray[x];
      if (m == '2' && n == '2' && !stringMap.match('_S')){visibleMapGrid[m][n] += '_S';}
      else if (foodIndex && x == foodIndex){visibleMapGrid[m][n] += '_O';}
    }
  }

//combine visble map with saved map
  for (m = 0, x = lastRow - 2; m < 5; m++, x++){
    for (n = 0, y = lastCol - 2; n < 5; n++, y++){
      if (savedMapGrid[x][y] == ' '){
        savedMapGrid[x][y] = visibleMapGrid[m][n];
      }
    }
  }

//find the table where we'll draw out the map
  document.getElementsByName('navmap')[0].parentNode.setAttribute('id', 'full_map');
  oldText = document.getElementById('full_map').innerHTML;

  newText = '<table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle">';

  if (oldText.match('Searching for:')){
    item_name = oldText.match(/Searching for: <b>(.+)<\/b>/)[1];
  }
  else {
    full_map = document.getElementById('full_map');
    item_name = full_map.textContent.match(/found the item!(.+)Now find the maze exit!/)[1];
    thisDiv = full_map.getElementsByTagName('div')[1];
    thisDiv.parentNode.removeChild(thisDiv.nextSibling);
    thisDiv.parentNode.removeChild(thisDiv.nextSibling);
    thisDiv.parentNode.removeChild(thisDiv.nextSibling);
    full_map.getElementsByTagName('div')[1].innerHTML += '<b>Now find the maze exit!</b>';
  }

//--convert the combined map to html and place into table
  newText += '<table border="0" cellspacing="0" cellpadding="0">';
  stringMap = '';
  for (i in savedMapGrid){
    newText += '<tr>';
    for (j in savedMapGrid[i]){
      stringMap += savedMapGrid[i][j] + ',';
      newText += '<td>';

      if (i == lastRow && j == lastCol){
        newText += '<div style="position:relative;"><div title="That\'s YOU! ^_^" style="position:absolute; top:-1px; left:0px; cursor:help;"><img src="http://images.neopets.com/games/maze/blumaroo_s.gif" border="0" width="15" height="15"></div></div>';
        savedMapGrid[i][j] = savedMapGrid[i][j].replace('_S', '');
        savedMapGrid[i][j] = savedMapGrid[i][j].replace('_O', '');
      }
      else if (savedMapGrid[i][j].indexOf('_S') != -1){
        newText += '<div style="position:relative;"><div style="position:absolute; top:0px; left:3px;"><center><span title="This is where you started." style="cursor:help; color:white; font-weight:bold;">S</span></center></div></div>';
        savedMapGrid[i][j] = savedMapGrid[i][j].replace('_S', '');
      }
      else if (savedMapGrid[i][j].indexOf('_O') != -1){
        if (oldText.match('ve found')){
          newText += '<div style="position:relative;"><div style="position:absolute; top:0px; left:3px;"><center><span title="You have found '+item_name+'!" style="cursor:help; color:yellowgreen; font-weight:bold;">O</span></center></div></div>';
        }
        else {
          newText += '<div style="position:relative;"><div style="position:absolute; top:0px; left:3px;"><center><span title="You have not yet found '+item_name+'." style="cursor:help; color:white; font-weight:bold;">X</span></center></div></div>';
        }
        savedMapGrid[i][j] = savedMapGrid[i][j].replace('_O', '');
      }

      if (savedMapGrid[i][j] == ' '){newText += ' </td>';}
      else {
        newText += '<img src="http://images.neopets.com/games/maze/path_'+savedMapGrid[i][j]+'.gif" border="0" width="15" height="15"></td>';
      }
    }
    newText += '</tr>';
    stringMap += '-';
  }
  newText += '</table>';

  document.getElementById('full_map').innerHTML += newText;

  GM_setValue('fetchMap', stringMap)
  GM_setValue('lastRow', lastRow)
  GM_setValue('lastCol', lastCol)
}
else if (document.location.href.match('create')){
  GM_setValue('fetchMap', ' , , , , ,- , , , , ,- , , , , ,- , , , , ,- , , , , ,-')
  GM_setValue('lastRow', '2')
  GM_setValue('lastCol', '2')
}
})();