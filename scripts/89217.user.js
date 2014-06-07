// ==UserScript==
// @name           addnicosearch
// @namespace      http://d.hatena.ne.jp/sabishirop/
// @include        http://www.nicovideo.jp/my/*
// @description    Add search window to nicovideo
// @author         sabishirop
// @version        0.1
// ==/UserScript==

(function(){
  function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
  }

  var h1 = document.getElementsByTagName('h1')[0];
  if(!h1) return;
  
  var div = document.createElement('div');
  insertAfter(h1.parentNode, div, h1);
  
  var table = document.createElement('table');
  div.appendChild(table);
  
  var table_row = document.createElement('tr');
  table.appendChild(table_row);

  var table_data = document.createElement('td');
  table_row.appendChild(table_data);
  
  var form = document.createElement('form');
  form.id = "head_search_form";
  form.action = "/tag";
  form.method = "get";
  form.addEventListener('submit',
		       function() {
			 submitSearch(this.action, false); 
			 return false;
		       },false);
  table_data.appendChild(form);
  
  var button_table = document.createElement('table');
  button_table.cellpadding="0";
  button_table.cellspacing="0";
  form.appendChild(button_table);
  
  var button_table_row = document.createElement('tr');
  button_table_row.valign="bottom";
  button_table.appendChild(button_table_row);
  
  var keyword_button=document.createElement('td');
  button_table_row.appendChild(keyword_button);
  
  var keyword_button_a = document.createElement('a');
  keyword_button_a.href="#";
  keyword_button_a.class = "head_ssw_0";
  keyword_button_a.addEventListener('click',
		     function() {
		       submitSearch('/search', this); 
		       return false;
		     }, false);
  keyword_button.appendChild(keyword_button_a);

  keyword_button_a.appendChild(document.createTextNode("[\u30ad\u30fc\u30ef\u30fc\u30c9]"));

  //tag search
  var tag_button=document.createElement('td');
  button_table_row.appendChild(tag_button);
  
  var tag_button_a = document.createElement('a');
  tag_button_a.href="#";
  tag_button_a.class = "head_ssw_1";
  tag_button_a.addEventListener('click',
		     function() {
		       submitSearch('/tag', this); 
		       return false;
		     }, false);
  tag_button.appendChild(tag_button_a);

  tag_button_a.appendChild(document.createTextNode("[\u30bf\u30b0]"));
  
  
  var mylist_button=document.createElement('td');
  button_table_row.appendChild(mylist_button);
  
  var mylist_button_a = document.createElement('a');
  mylist_button_a.href="#";
  mylist_button_a.class = "head_ssw_0";
  mylist_button_a.addEventListener('click',
		     function() {
		       submitSearch('/mylist_search', this); 
		       return false;
		     }, false);
  mylist_button.appendChild(mylist_button_a);

  mylist_button_a.appendChild(document.createTextNode("[\u30de\u30a4\u30ea\u30b9\u30c8]"));
  
  var div = document.createElement('div');
  form.appendChild(div);
  
  var input_table = document.createElement('input_table');
  input_table.cellpadding="0";
  input_table.cellspacing="2";
  div.appendChild(input_table);
  
  var input_table_row = document.createElement('tr');
  input_table.appendChild(input_table_row);
  
  var input_table_data1 = document.createElement('td');
  input_table_row.appendChild(input_table_data1);
  
  var search_window = document.createElement('input');
  search_window.type = "text";
  search_window.name = "s";
  search_window.id = "bar_search";
  input_table_data1.appendChild(search_window);
  
  var input_table_data2 = document.createElement('td');
  input_table_row.appendChild(input_table_data2);
  
  var search_button = document.createElement('input');
  search_button.name = "submit";
  search_button.type = "submit";
  search_button.value = "\u691c\u7d22";
  input_table_data2.appendChild(search_button);

  function submitSearch(p, e) {
    var f = $('head_search_form'), s = String.interpret(f.s.value).strip().replace(/%20/g, '+');
    if (s != '') location.href = p + "/" + encodeURIComponent(s);
    else if (e) { f.down('a.head_ssw_1').className = 'head_ssw_0'; e.className = 'head_ssw_1'; f.action = p; f.s.focus(); }
  };
 })();
