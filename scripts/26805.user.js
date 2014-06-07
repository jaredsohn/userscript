// ==UserScript==
// @name           LandGrab player table sort
// @namespace      landgrab_table_sort
// @include        http://landgrab.net/landgrab/ViewBoard*
// @include        http://www.landgrab.net/landgrab/ViewBoard*
// @include        http://landgrab.net/landgrab/RealtimeBoard*
// @include        http://www.landgrab.net/landgrab/RealtimeBoard*
// ==/UserScript==
/**
 * A script to sort player info table
 * @author Jakub Caban <kuba.iluvatar@gmail.com>
 * @license Use it if you like it
 */
var column;
var side = 1;
var RowArr = [];
var Default = [];
var shown = true;

InitSort();

function InitSort(){
  var oTable = document.getElementById('player_status_tbody').parentNode;
  var oHead = oTable.tHead;
  var oHeadRow = oHead.rows[0];
  var oEl = document.createElement('a');
  oEl.id = 'conquer_show_hide';
  oEl.innerHTML = ' [hide conquered]';
  oEl.style.cursor = 'pointer';
  oEl.addEventListener("click", HandleShowHide, true);
  oHeadRow.cells[0].appendChild(oEl); 
  var oHeadRow = oHead.rows[1];
  for(i in oHeadRow.cells){
    if(typeof(oHeadRow.cells[i]) == 'object'){
      oHeadRow.cells[i].style.cursor = 'pointer';
      oHeadRow.cells[i].id = i;
      oHeadRow.cells[i].addEventListener("click", function(){SortTable(this.id)}, true);
    }
  }
  var oTBody = document.getElementById('player_status_tbody');
  for(i in oTBody.rows){
    if(typeof(oTBody.rows[i]) == 'object')
      Default[oTBody.rows[i].cells[0].id] = i;
  }
}

function HandleShowHide(){
  var oTBody = document.getElementById('player_status_tbody');
  for(i in oTBody.rows){
    if(typeof(oTBody.rows[i]) == 'object'){
      var oRow = oTBody.rows[i];
      if(oRow.cells[2].innerHTML.indexOf('(conquered)') != -1)
        if(shown) oRow.style.display = 'none';
        else oRow.style.display = '';
    }
  }
  var oA = document.getElementById('conquer_show_hide');
  if(shown) oA.innerHTML = ' [show conquered]';
  else oA.innerHTML = ' [hide conquered]';
  shown = !shown;
  MakeGrayWhite();
  UnSelect();
}

function SortTable(i){
  var oTBody = document.getElementById('player_status_tbody');
  if(i==column) side *= -1;
  else side = 1;
  column = parseInt(i);
  RowArr = [];
  for(i in oTBody.rows){
    if(typeof(oTBody.rows[i]) == 'object'){
      RowArr[i] = oTBody.rows[i];
    }
  }
  RowArr.sort(SortMe);
  for(i in RowArr){
    if(typeof(RowArr[i]) == 'object')
      oTBody.appendChild(RowArr[i]);
  }
  MakeGrayWhite();
  UnSelect();
}

function MakeGrayWhite(){
  var oTBody = document.getElementById('player_status_tbody');
  var j=0;
  for(var i=0; i<oTBody.rows.length; i++){
    if(typeof(oTBody.rows[i]) == 'object'){
      if(oTBody.rows[i].bgColor != '#faf2bc' && oTBody.rows[i].bgColor != '#cccccc'){
        oTBody.rows[i].style.background = (j++%2==0)?'url(images/white_20_opac.png) 0 0 repeat':'none';
      }else if(oTBody.rows[i].style.display != 'none'){
        j++;
      }
    }
  }
}

function SortMe(x, y){
  x = GetCellVal(x);
  y = GetCellVal(y);
  if(column <= 1){
    if(x>y) return side;
    if(y>x) return -1*side;
  }else{
    if(x>y) return -1*side;
    if(y>x) return side;
  }
  return 0;
}

function GetCellVal(x){
  if(x.cells.length >= 7){
    var cell = x.cells[column];
    if(column == 0){
      return parseInt(Default[cell.id]);
    }else if(column == 1){
      if(cell.childNodes[1].tagName == "STRONG") cell = cell.childNodes[1];
      return cell.childNodes[3].innerHTML.toLowerCase();
    }else{
      return parseInt(cell.innerHTML);
    }
  }else{
    if(column == 0){
      return parseInt(Default[x.cells[0].id]);
    }else if(column == 1){
      return x.cells[column].childNodes[1].innerHTML.toLowerCase();
    }else if(column >= 6){
      return parseInt(x.cells[column-3].innerHTML);
    }else
      return -1;
  }
}

function UnSelect(){
  if(document.selection && document.selection.empty)
    document.selection.empty();
  else if(window.getSelection)
    window.getSelection().removeAllRanges();
}