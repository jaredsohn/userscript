// ==UserScript==
// @name        klavagonki - change keyboard layout Dvorak
// @namespace   2klavagonki.ru
// @description change keyboard layout Dvorak
// @include     http://klavogonki.ru/g/*
// @version     1.1
// @author      Good Loki
// ==/UserScript==

function ChangeLayoutOptions(value) {
  localStorage["keyboard_layout"] = value;
  ChangeLayout(value);
}

function InitLayoutOptions() {
  var cur_layout=localStorage["keyboard_layout"];
  var select_layout = document.getElementById("keyboard_layout");
  for (var i=0; i < select_layout.options.length; i++) {
    if (select_layout.options[i].value == cur_layout) select_layout.options[i].selected = true;
  }
  clearInterval(document.getElementById("change_layout_flag").value);
  ChangeLayout(cur_layout);
}

function ChangeLayout(layout) {
  var UrlBackKeyboardImageEnDvorak = 'http://klavogonki.ru/wiki/images/9/97/Back_keyboard_en_dw.gif';
  var UrlBackKeyboardImageEnQwerty = 'http://klavogonki.ru/img/back_keyboard_en.gif';
  var UrlForeKeyboardImageEnDvorak = 'http://klavogonki.ru/wiki/images/8/8d/Fore_keyboard_en_dw.gif';
  var UrlForeKeyboardImageEnQwerty = 'http://klavogonki.ru/img/fore_keyboard_en.gif';
  
  switch (layout) {
    case 'Dvorak':
      var style = document.createElement("style");
      style.innerHTML = ' .en #back_keyboard{background:url(' + UrlBackKeyboardImageEnDvorak + ');}' +
      ' .en #fore_keyboard{background:transparent url(' + UrlForeKeyboardImageEnDvorak + ');}';
      document.body.appendChild(style);
      keymap.en=new Array({letter:"`",key:1,shift:0},{letter:"1",key:2,shift:0},{letter:"2",key:3,shift:0},{letter:"3",key:4,shift:0},{letter:"4",key:5,shift:0},{letter:"5",key:6,shift:0},{letter:"6",key:7,shift:0},{letter:"7",key:8,shift:0},{letter:"8",key:9,shift:0},{letter:"9",key:10,shift:0},{letter:"0",key:11,shift:0},{letter:"[",key:12,shift:0},{letter:"]",key:13,shift:0},{letter:"'",key:15,shift:0},{letter:",",key:16,shift:0},{letter:".",key:17,shift:0},{letter:"p",key:18,shift:0},{letter:"y",key:19,shift:0},{letter:"f",key:20,shift:0},{letter:"g",key:21,shift:0},{letter:"c",key:22,shift:0},{letter:"r",key:23,shift:0},{letter:"l",key:24,shift:0},{letter:"/",key:25,shift:0},{letter:"=",key:26,shift:0},{letter:"\\",key:27,shift:0},{letter:"a",key:28,shift:0},{letter:"o",key:29,shift:0},{letter:"e",key:30,shift:0},{letter:"u",key:31,shift:0},{letter:"i",key:32,shift:0},{letter:"d",key:33,shift:0},{letter:"h",key:34,shift:0},{letter:"t",key:35,shift:0},{letter:"n",key:36,shift:0},{letter:"s",key:37,shift:0},{letter:"-",key:38,shift:0},{letter:";",key:39,shift:0},{letter:"q",key:40,shift:0},{letter:"j",key:41,shift:0},{letter:"k",key:42,shift:0},{letter:"x",key:43,shift:0},{letter:"b",key:44,shift:0},{letter:"m",key:45,shift:0},{letter:"w",key:46,shift:0},{letter:"v",key:47,shift:0},{letter:"z",key:48,shift:0},{letter:"~",key:1,shift:1},{letter:"!",key:2,shift:1},{letter:"@",key:3,shift:1},{letter:"#",key:4,shift:1},{letter:"$",key:5,shift:1},{letter:"%",key:6,shift:1},{letter:"^",key:7,shift:1},{letter:"&",key:8,shift:1},{letter:"*",key:9,shift:1},{letter:"(",key:10,shift:1},{letter:")",key:11,shift:1},{letter:"{",key:12,shift:1},{letter:"}",key:13,shift:1},{letter:'"',key:15,shift:1},{letter:"<",key:16,shift:1},{letter:">",key:17,shift:1},{letter:"P",key:18,shift:1},{letter:"Y",key:19,shift:1},{letter:"F",key:20,shift:1},{letter:"G",key:21,shift:1},{letter:"C",key:22,shift:1},{letter:"R",key:23,shift:1},{letter:"L",key:24,shift:1},{letter:"?",key:25,shift:1},{letter:"+",key:26,shift:1},{letter:"|",key:27,shift:1},{letter:"A",key:28,shift:1},{letter:"O",key:29,shift:1},{letter:"E",key:30,shift:1},{letter:"U",key:31,shift:1},{letter:"I",key:32,shift:1},{letter:"D",key:33,shift:1},{letter:"H",key:34,shift:1},{letter:"T",key:35,shift:1},{letter:"N",key:36,shift:1},{letter:"S",key:37,shift:1},{letter:"_",key:38,shift:1},{letter:":",key:39,shift:1},{letter:"Q",key:40,shift:1},{letter:"J",key:41,shift:1},{letter:"K",key:42,shift:1},{letter:"X",key:43,shift:1},{letter:"B",key:44,shift:1},{letter:"M",key:45,shift:1},{letter:"W",key:46,shift:1},{letter:"V",key:47,shift:1},{letter:"Z",key:48,shift:1},{letter:" ",key:49,shift:0});
      break;
    case 'QWERTY':
      var style = document.createElement("style");
      style.innerHTML = ' .en #back_keyboard{background:url(' + UrlBackKeyboardImageEnQwerty + ');}' +
      ' .en #fore_keyboard{background:transparent url(' + UrlForeKeyboardImageEnQwerty + ');}';
      document.body.appendChild(style);
      keymap.en=new Array({letter:"`",key:1,shift:0},{letter:"1",key:2,shift:0},{letter:"2",key:3,shift:0},{letter:"3",key:4,shift:0},{letter:"4",key:5,shift:0},{letter:"5",key:6,shift:0},{letter:"6",key:7,shift:0},{letter:"7",key:8,shift:0},{letter:"8",key:9,shift:0},{letter:"9",key:10,shift:0},{letter:"0",key:11,shift:0},{letter:"-",key:12,shift:0},{letter:"=",key:13,shift:0},{letter:"q",key:15,shift:0},{letter:"w",key:16,shift:0},{letter:"e",key:17,shift:0},{letter:"r",key:18,shift:0},{letter:"t",key:19,shift:0},{letter:"y",key:20,shift:0},{letter:"u",key:21,shift:0},{letter:"i",key:22,shift:0},{letter:"o",key:23,shift:0},{letter:"p",key:24,shift:0},{letter:"[",key:25,shift:0},{letter:"]",key:26,shift:0},{letter:"\\",key:27,shift:0},{letter:"a",key:28,shift:0},{letter:"s",key:29,shift:0},{letter:"d",key:30,shift:0},{letter:"f",key:31,shift:0},{letter:"g",key:32,shift:0},{letter:"h",key:33,shift:0},{letter:"j",key:34,shift:0},{letter:"k",key:35,shift:0},{letter:"l",key:36,shift:0},{letter:";",key:37,shift:0},{letter:"'",key:38,shift:0},{letter:"z",key:39,shift:0},{letter:"x",key:40,shift:0},{letter:"c",key:41,shift:0},{letter:"v",key:42,shift:0},{letter:"b",key:43,shift:0},{letter:"n",key:44,shift:0},{letter:"m",key:45,shift:0},{letter:",",key:46,shift:0},{letter:".",key:47,shift:0},{letter:"/",key:48,shift:0},{letter:"~",key:1,shift:1},{letter:"!",key:2,shift:1},{letter:"@",key:3,shift:1},{letter:"#",key:4,shift:1},{letter:"$",key:5,shift:1},{letter:"%",key:6,shift:1},{letter:"^",key:7,shift:1},{letter:"&",key:8,shift:1},{letter:"*",key:9,shift:1},{letter:"(",key:10,shift:1},{letter:")",key:11,shift:1},{letter:"_",key:12,shift:1},{letter:"+",key:13,shift:1},{letter:"Q",key:15,shift:1},{letter:"W",key:16,shift:1},{letter:"E",key:17,shift:1},{letter:"R",key:18,shift:1},{letter:"T",key:19,shift:1},{letter:"Y",key:20,shift:1},{letter:"U",key:21,shift:1},{letter:"I",key:22,shift:1},{letter:"O",key:23,shift:1},{letter:"P",key:24,shift:1},{letter:"{",key:25,shift:1},{letter:"}",key:26,shift:1},{letter:"|",key:27,shift:1},{letter:"A",key:28,shift:1},{letter:"S",key:29,shift:1},{letter:"D",key:30,shift:1},{letter:"F",key:31,shift:1},{letter:"G",key:32,shift:1},{letter:"H",key:33,shift:1},{letter:"J",key:34,shift:1},{letter:"K",key:35,shift:1},{letter:"L",key:36,shift:1},{letter:":",key:37,shift:1},{letter:'"',key:38,shift:1},{letter:"Z",key:39,shift:1},{letter:"X",key:40,shift:1},{letter:"C",key:41,shift:1},{letter:"V",key:42,shift:1},{letter:"B",key:43,shift:1},{letter:"N",key:44,shift:1},{letter:"M",key:45,shift:1},{letter:"<",key:46,shift:1},{letter:">",key:47,shift:1},{letter:"?",key:48,shift:1},{letter:" ",key:49,shift:0});
      break;
  }
}

var elem = document.createElement("div");
elem.id = "change_keyboard_layout";
elem.innerHTML = '<table><tr><td>Латинская раскладка:</td><td><select id=keyboard_layout onchange="ChangeLayoutOptions(this.options[this.selectedIndex].value);">' + 
' <option value="QWERTY" selected>QWERTY</option>' + 
' <option value="Dvorak">Dvorak</option>' + ' </select></td></tr></table>' + 
' <input type="hidden" id="change_layout_flag">';
var params = document.getElementById("param_shadow");
params.parentNode.insertBefore(elem, params);


var script = document.createElement("script");
script.innerHTML = ChangeLayoutOptions + InitLayoutOptions + ChangeLayout + ' document.getElementById("change_layout_flag").value = setInterval("InitLayoutOptions()", 1000); ';
document.body.appendChild(script);
ChangeLayout();    
