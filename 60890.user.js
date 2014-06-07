// ==UserScript==
// @name           addMylist
// @author         oscdis765@gmail.com
// @version        0.2
// @source         http://userscripts.org/scripts/show/60890
// @license        The MIT License
// @namespace      nico
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==


// Copyright (c) 2009 oscdis765@gmail.com
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function eval_xpath(rcv, doc, xpath){
  return rcv.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function doc_xpath(xpath){
  return eval_xpath(document, document, xpath);
}

function ary_xpath(xpath){
  var ret = [];
  var a = doc_xpath(xpath);
  for (var i = 0; i < a.snapshotLength; i++){
    ret.push(a.snapshotItem(i));
  }
  return ret;
}

function ary_eval_xpath(doc, xpath){
  var ret = [];
  var a = eval_xpath(doc, doc, xpath);
  for (var i = 0; i < a.snapshotLength; i++){
    ret.push(a.snapshotItem(i));
  }
  return ret;
}

function store(key, obj){
  GM_setValue(key, obj ? obj.toSource() : obj);
}

function load(key){
  var tmp = GM_getValue(key);
  if (!tmp) return tmp;

  return eval("("+tmp+")");
}

RegExp.escape = function(str){
  var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
  return str.replace(specials, "\\$&");
}

function send_click_event(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(evt);
}

////////
////////
////////
////////
////////
////////
////////
////////

var g_register_window = null;
var g_video_id = null;

function select_group(){
  return document.getElementById("select_group2");
}

function get_mylist_names(){
  param = {
    method:"GET", 
    url:"http://www.nicovideo.jp/mylist_add/video/"+g_video_id,
    onload: function(result) {
      var select_open = RegExp.escape('<select name="group_id" id="select_group" style="width:240px;">');
      var select_close = RegExp.escape("</select>");
      var reg_select = new RegExp(select_open + "(([\r\n]|.)*?)" + select_close, "m");

      var ret = result.responseText.match(reg_select);
      var opt_new = RegExp.escape('<option value="new" style="color:#F30;">新規作成...</option>\r\n');
      var names = ret[1].replace(new RegExp(opt_new, "m"), "");

      select_group().innerHTML = names;
      store("mylistNames", names)
    }
  };

  select_group().innerHTML = "<optgroup label='リスト名を取得中...'></optgroup>"

  GM_xmlhttpRequest(param);
}

function set_initial_names(){
  var mylist_names = load("mylistNames");
  if (mylist_names){
    var s_group = select_group();
    s_group.innerHTML = mylist_names;

    var value = load("selectedValue");
    if (value){
      s_group.value = value
    }
  }else{
    get_mylist_names();
  }
}

function btn_add() {
  var a = g_register_window.document.getElementsByTagName("input");
  for (i = 0, j = 0; i < a.length; i++) {
    if (a[i].className == "btn_add"){
      return a[i];
    }
  }
  return null;
}

function onloadRegisterWindow(){
  var value = load("selectedValue");

  var options = ary_eval_xpath(g_register_window.document, "//option");
  for (var i = 0; i < options.length; i++){
    if (options[i].value == value){
      g_register_window.document.getElementById("select_group").value = value;
      send_click_event(btn_add());
    }
  }
}

function onclickRegisterButton(){
  var date = new Date;
  name = "addselected"+date.getTime()+date.getMilliseconds();

  g_register_window = window.open('/mylist_add/video/'+g_video_id, name, 'width=500,height=360');
  g_register_window.addEventListener("load", onloadRegisterWindow, false);
  store("selectedValue", select_group().value);
}

function main(){
  g_video_id = document.URL.match(/[\w\d]+$/);

  var additional_form = document.createElement('td')

  additional_form.innerHTML =
 "<form id='box_mylist_add'>\
    <select name='group_id' id='select_group2' style='width:140px;'></select>\
    <input type='submit' id='register_button' value='選択したマイリストに登録' onclick='return false'>\
  </form>"

  var watch_header = ary_xpath('//div[@id="WATCHHEADER"]/table/tbody/tr[@valign="bottom"]/td/table/tbody/tr')[0]
  watch_header.appendChild(additional_form);

  set_initial_names();
  select_group().addEventListener("focus", get_mylist_names, false);
  document.getElementById("register_button").addEventListener("click", onclickRegisterButton, false);
}

main();
