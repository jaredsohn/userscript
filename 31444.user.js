// ==UserScript==
// @name          RuneScape Quick World Select
// @namespace     clintxs@gmail.com
// @description   Adds a form that lets you choose your world from the runescape.com front page.
// @include       http://*runescape.com/*
// ==/UserScript==

if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(cl) {
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
      var classes = elem[i].className;
      if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
  };
}

function in_array(needle, haystack){
  var a=false;
  for(var i=0;i<haystack.length;i++){
    if(needle == haystack[i]){
      a=true;
        break;
    }
  }
  return a;
}

var innerHTML = document.getElementsByClassName('sectionBody buttons')[0].innerHTML;

var rs_world  = GM_getValue('rs_world', 1);
var rs_type   = GM_getValue('rs_type', 'Both');
var rs_detail = GM_getValue('rs_detail', 'High');

function worldSelect() {
  var selectWorld = document.getElementById('selectWorld').value;
  var selectDetail = document.getElementById('selectDetail').value;
  
  GM_setValue('rs_world', selectWorld);
  GM_setValue('rs_detail', selectDetail);
  
  var url = 'http://world' + selectWorld + '.runescape.com/p0';
  
  if (selectDetail == 'High') {
    var url = url + ',g1';
  }
  
  window.location = url;
}

function updateWorld() {
  rs_type = document.getElementById('selectType').value;
  GM_setValue('rs_type', rs_type);
  createForm();
  document.getElementById('worldForm').addEventListener("submit", worldSelect, false);
  document.getElementById('selectType').addEventListener("change", updateWorld, false);
}

var num = 0;

function createForm() {

num++;

if (num > 1) {
  document.getElementsByClassName('sectionBody buttons')[0].innerHTML = '';
}

function worldList() {

  if (document.getElementById('selectType')) {
    var showWorlds = document.getElementById('selectType').value;
    GM_setValue('rs_type', showWorlds);
  } else {
    var showWorlds = rs_type;
  }

  var members = "2,6,9,12,15,18,22,23,24,26,27,28,31,36,39,42,44,45,46,48,51,52,53,54,56,58,59,60,64,65,66,67,68,69,70,71,76,77,78,79,82,83,84,88,89,91,92,97,98,99,100,103,104,110,111,112,114,115,116,117,121,124,129,130,131,132,133,137,138,143,144,145,148,151,156,157,158,159,160,162,165,166,168";
  var members = members.split(',');

  var excludeWorlds = "139,146,122,147,140,167,168";
  var excludeWorlds = excludeWorlds.split(',');

  var numWorlds = 169;

  for (i=1;i<=numWorlds;i++) {
    
    if (!in_array(i, excludeWorlds)) {
      if (showWorlds == 'Free') {
        if (!in_array(i, members)) {
          var worldForm = worldForm + '<option ';
          if (rs_world == i) { var worldForm = worldForm + 'selected="selected" '; }
          var memberWorld = '';
        }
      } else if (showWorlds == 'Member') {
        if (in_array(i, members)) {
          var worldForm = worldForm + '<option ';
          if (rs_world == i) { var worldForm = worldForm + 'selected="selected" '; }
          var memberWorld = (in_array(i, members)) ? ' [M]' : '';
        }
      } else {
        var worldForm = worldForm + '<option ';
        if (rs_world == i) { var worldForm = worldForm + 'selected="selected" '; }
        var memberWorld = (in_array(i, members)) ? ' [M]' : '';
      }
      var worldForm = worldForm + 'value="' + i + '">' + i + memberWorld + '</option>';
    }
    
  }
  
  return worldForm;
  
}

var form = '<div style="text-align: center; background: #898989 url(http://www.runescape.com/img/main/layout/menu_bg.png) no-repeat left top; font-size: 12px; font-weight: bold; height: 23px; margin-top: 4px; padding: 4px; padding-bottom: 0; width: 360px; margin: auto;"><div style=" width: 355px; padding-left: 4px; border-left: 1px solid black; background-position: right top; height: 19px; line-height: 18px; margin: 0; color: #e8d800; font-weight: bold; text-decoration: none; background-image: url(\'http://www.runescape.com/img/playgame/menu.png\');">';

var form = form + '<form id="worldForm" action="javascript: void(0)">World: <select id="selectWorld" style="background-color: #e9dfc5; border: 1px solid black; height: 16px; font-size: .8em;">';

var form = form + worldList();

var form = form + '</select>';

var form = form + '&nbsp;&nbsp;Type: <select id="selectType" style="background-color: #e9dfc5; border: 1px solid black; height: 16px; font-size: .8em;">';

if (rs_type == 'Both') {
  var form = form + '<option selected="selected">Both</option>';
} else {
  var form = form + '<option id="optionBoth">Both</option>';
}

if (rs_type == 'Member') {
  var form = form + '<option selected="selected">Member</option>';
} else {
  var form = form + '<option id="optionMember">Member</option>';
}

if (rs_type == 'Free') {
  var form = form + '<option selected="selected">Free</option>';
} else {
  var form = form + '<option id="optionFree">Free</option>';
}

var form = form + '</select>&nbsp;&nbsp;Detail: <select id="selectDetail" style="background-color: #e9dfc5; border: 1px solid black; height: 16px; font-size: .8em;">';

if (rs_detail == 'High') {
  var form = form + '<option selected="selected">High</option>';
} else {
  var form = form + '<option>High</option>';
}

if (rs_detail == 'Low') {
  var form = form + '<option selected="selected">Low</option>';
} else {
  var form = form + '<option>Low</option>';
}

var form = form + '</select>&nbsp;&nbsp;<input style="background: url(\'http://www.runescape.com/img/main/home/gobutton.jpg\') no-repeat; cursor: pointer; width: 34px; height: 14px; font-size: .8em; text-align: center; font-weight: bold; color: black; padding: 0 0 2px; border: 0;" type="submit" value="Go" /></form></div></div>';

worldList();

document.getElementsByClassName('sectionBody buttons')[0].innerHTML = form + innerHTML;

}

createForm();

document.getElementById('worldForm').addEventListener("submit", worldSelect, false);
document.getElementById('selectType').addEventListener("change", updateWorld, false);