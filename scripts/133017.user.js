// ==UserScript==
// @name           	Forum Extract
// @namespace      	srazzano
// @description		Filters out any unwanted blocks on http://forum.mozillaZine.org and http://custombuttons.sourceforge.net forums using keyword or phrase.
// @author   		Sonny Razzano
// @version       	2.0.1
// @include        	http://custombuttons.sourceforge.net*
// @include        	http://forums.mozillazine.org*
// @homepage	  	http://userscripts.org/scripts/show/133017
// @dropbox    		https://dl.dropboxusercontent.com/u/77691265/forumextract.js
// @updateURL		https://userscripts.org/scripts/source/133017.user.js
// ==/UserScript==
initGM();
function initGM() {
  const STORAGE_PREFIX = 'fustoe-';
  isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
  addStyle = isGM ? GM_addStyle : function(css) {var head = $('head')[0]; if(!head) return; var style = $c('style', {type:'text/css',innerHTML:css}); head.appendChild(style)}
  setValue = isGM ? GM_setValue : function(name,value) {switch (typeof(value)) {case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]' + value); break; case 'number': if(value.toString().indexOf('.') < 0) {localStorage.setItem(STORAGE_PREFIX + name, 'N]' + value)} break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name, 'B]' + value); break}}
  getValue = isGM ? GM_getValue : function(name,defValue) {var value = localStorage.getItem(STORAGE_PREFIX + name); if(value == null) {return defValue} else {switch(value.substr(0,2)) {case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true';}} return value}
  deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(STORAGE_PREFIX+name)}
}
function $(q, root, single, context) {
  root = root || document;
  context = context || root;
  if(q[0] == '#' || q[0] == '?') return root.getElementById(q.substr(1));
  if(q[0] == '.') {
    if(single) return root.getElementsByClassName(q.substr(1))[0];
    return root.getElementsByClassName(q.substr(1));
  }
  if(q.match(/^[\/*]|^\.[\/\.]/)) {
    if(single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
    var arr = [], xpr = root.evaluate(q, context, null, 7, null);
    for(var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
    return arr;
  }
  if(single) return root.getElementsByTagName(q)[0];
  return root.getElementsByTagName(q);
}
function $c(type, props, evls) {
  var node = document.createElement(type);
  if(props && typeof props == 'object') {
    for(prop in props) {
      if(typeof node[prop] == 'undefined') node.setAttribute(prop, props[prop]);
      else node[prop] = props[prop];
  } }
  if(evls instanceof Array) {
    for(var i = 0; i < evls.length; i++) {
      var evl = evls[i];
      if(typeof evl.type == 'string' && typeof evl.fn == 'function')
        node.addEventListener(evl.type, evl.fn, false);
  } }
  return node;
}
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}
function inputHide(e) {
  var aaa = e.target;
  setValue(aaa.id, aaa.checked);
  switch(aaa.id) {
    case "HideRU":
      if(aaa.checked) addStyle('body.section-index #page-body>div:nth-child(6){display:none}');
      else addStyle('body.section-index #page-body>div:nth-child(6){display:block}');
      break;
    case "mzFooter":
      if(aaa.checked) {
        addStyle('body.section-index #page-body p,#sidebar>div:last-child{display:none}');
        $('#mzFooterCont').firstChild.style.fontStyle = 'italic';
        $('#mzFooterCont').firstChild.style.fontWeight = 'normal';
      } else {
        addStyle('body.section-index #page-body p,#sidebar>div:last-child{display:block}');
        $('#mzFooterCont').firstChild.style.fontStyle = 'normal';
        $('#mzFooterCont').firstChild.style.fontWeight = 'bold';
      }
      break;
} }
function showFilter(e) {
  var aaa = e.target;
  setValue(aaa.id, aaa.checked);
}
function mzHide(e) {
  var aaa = e.target.id, bbb = 'Block' + aaa.split('mzBlock')[1], ccc = e.target;
  var ddd = 'mzBlockCont' + aaa.split('mzBlock')[1];
  setValue(ccc.id, ccc.checked);
  if(ccc.checked) {
    $('?'+bbb).style.display = "none";
    $('?'+ddd).firstChild.style.fontStyle = 'italic';
    $('?'+ddd).firstChild.style.fontWeight = 'normal';
  } else {
    $('?'+bbb).style.display = "block";
    $('?'+ddd).firstChild.style.fontStyle = 'normal';
    $('?'+ddd).firstChild.style.fontWeight = 'bold';
} }
function getKey(e) {
  var gvki = $('#keywordIn');
  if(cbforum) var gvkw = getValue('KeywordsCBForum');
  if(cbtopic) var gvkw = getValue('KeywordsCBTopic');
  if(cbsearch) var gvkw = getValue('KeywordsCBSearch');
  if(mzforum) var gvkw = getValue('KeywordsMZForum');
  if(mztopic) var gvkw = getValue('KeywordsMZTopic');
  if(mzsearch) var gvkw = getValue('KeywordsMZSearch');
  if(e.button == 1) gvki.value = gvkw;
} 
function genKey() {
  var gvki = $('#keywordIn');
  if(cbforum) var gvkw = getValue('KeywordsCBForum');
  if(cbtopic) var gvkw = getValue('KeywordsCBTopic');
  if(cbsearch) var gvkw = getValue('KeywordsCBSearch');
  if(mzforum) var gvkw = getValue('KeywordsMZForum');
  if(mztopic) var gvkw = getValue('KeywordsMZTopic');
  if(mzsearch) var gvkw = getValue('KeywordsMZSearch');
  if(gvki.value == '') return;
  if(cbforum) {
    if(gvkw == '') setValue('KeywordsCBForum', gvki.value.trim());
    else setValue('KeywordsCBForum', gvkw + '<>' + gvki.value.trim());
  }
  if(cbtopic) {
    if(gvkw == '') setValue('KeywordsCBTopic', gvki.value.trim());
    else setValue('KeywordsCBTopic', gvkw + '<>' + gvki.value.trim());
  }
  if(cbsearch) {
    if(gvkw == '') setValue('KeywordsCBSearch', gvki.value.trim());
    else setValue('KeywordsCBSearch', gvkw + '<>' + gvki.value.trim());
  }
  if(mzforum) {
    if(gvkw == '') setValue('KeywordsMZForum', gvki.value.trim());
    else setValue('KeywordsMZForum', gvkw + '<>' + gvki.value.trim());
  }
  if(mztopic) {
    if(gvkw == '') setValue('KeywordsMZTopic', gvki.value.trim());
    else setValue('KeywordsMZTopic', gvkw + '<>' + gvki.value.trim());
  }
  if(mzsearch) {
    if(gvkw == '') setValue('KeywordsMZSearch', gvki.value.trim());
    else setValue('KeywordsMZSearch', gvkw + '<>' + gvki.value.trim());
  }
  gvki.value = '';
  //document.location.reload();
  content.location.reload();
}
function remKey() {
  var gvki = $('#keywordIn');
  if(gvki.value == '') return;
  var names = [], undo = []
  if(cbforum) var kw = getValue('KeywordsCBForum').split(',');
  if(cbtopic) var kw = getValue('KeywordsCBTopic').split(',');
  if(cbsearch) var kw = getValue('KeywordsCBSearch').split(',');
  if(mzforum) var kw = getValue('KeywordsMZForum').split(',');
  if(mztopic) var kw = getValue('KeywordsMZTopic').split(',');
  if(mzsearch) var kw = getValue('KeywordsMZSearch').split(',');
  kwu = gvki.value.split(',');
  for(k = 0; k < kw.length; k++) names.push(kw[k]);
  for(i = 0; i < kwu.length; i++) undo.push(kwu[i]);
  var Array1 = names, Array2 = undo;
  for (var i = 0; i < Array2.length; i++) {
    var arrlen = Array1.length;
    for (var j = 0; j < arrlen; j++)
    if (Array2[i] == Array1[j]) Array1 = Array1.slice(0, j).concat(Array1.slice(j+1, arrlen));
  }
  var newStr = Array1.toString();
  if(cbforum) setValue('KeywordsCBForum', newStr);
  if(cbtopic) setValue('KeywordsCBTopic', newStr);
  if(cbsearch) setValue('KeywordsCBSearch', newStr);
  if(mzforum) setValue('KeywordsMZForum', newStr);
  if(mztopic) setValue('KeywordsMZTopic', newStr);
  if(mzsearch) setValue('KeywordsMZSearch', newStr);
  $('#keywordIn').value = '';
  //document.location.reload();
  content.location.reload();
}
function setFilter() {
  if($('#filterCount').textContent == 0) return;  
  if(cbforum) {
    setValue('showFilteredCBForum', !getValue('showFilteredCBForum'));
    var xxx = getValue('showFilteredCBForum');
  }
  if(cbtopic) {
    setValue('showFilteredCBTopic', !getValue('showFilteredCBTopic'));
    var xxx = getValue('showFilteredCBTopic');
  }
  if(cbsearch) {
    setValue('showFilteredCBSearch', !getValue('showFilteredCBSearch'));
    var xxx = getValue('showFilteredCBSearch');
  }
  if(mzforum) {
    setValue('showFilteredMZForum', !getValue('showFilteredMZForum'));
    var xxx = getValue('showFilteredMZForum');
  }
  if(mztopic) {
    setValue('showFilteredMZTopic', !getValue('showFilteredMZTopic'));
    var xxx = getValue('showFilteredMZTopic');
  }
  if(mzsearch) {
    setValue('showFilteredMZSearch', !getValue('showFilteredMZSearch'));
    var xxx = getValue('showFilteredMZSearch');
  }
  if(xxx) {
    $('#filterButton').textContent = fe11;
    setUnfiltered();
  } else {
    $('#filterButton').textContent = fe10;
    setFiltered();
} }
function setUnfiltered() {
  if(cbforum || cbsearch || mzforum || mzsearch) var item = $('.row', $('#page-body'));
  if(cbtopic || mztopic) var item = $('.post', $('#page-body'));
  for(var i = 0; i < item.length; i++) {
    if(item[i].getAttribute('filtered')) {
      item[i].style.display = 'block';
      item[i].style.background = '#FFDFE4';
} } }
function setFiltered() {
  if(cbforum || cbsearch || mzforum || mzsearch) var item = $('.row', $('#page-body'));
  if(cbtopic || mztopic) var item = $('.post', $('#page-body'));
  for(var i = 0; i < item.length; i++) {
    if(item[i].hasAttribute('filtered')) {
      item[i].style.display = 'none';
      item[i].setAttribute('filtered', true);
} } }
function getActiveText() {
  var getText = '', gvki = $('#keywordIn');
  getText = getSelection().toString();
  if(getText != '') {
    if(gvki.value == '') gvki.value = getText.trim();
    else gvki.value = gvki.value + '<>' + getText.trim();
  }
  return;
}
var url = window.location.href.toLowerCase();
var cbindex = url.match('http://custombuttons.sourceforge.net/forum/index');
var cbforum = url.match('http://custombuttons.sourceforge.net/forum/viewforum');
var cbtopic = url.match('http://custombuttons.sourceforge.net/forum/viewtopic');
var cbsearch = url.match('http://custombuttons.sourceforge.net/forum/search');
var mzindex = url.match('http://forums.mozillazine.org/index');
var mzforum = url.match('http://forums.mozillazine.org/viewforum');
var mztopic = url.match('http://forums.mozillazine.org/viewtopic');
var mzsearch = url.match('http://forums.mozillazine.org/search');
if(!getValue('KeywordsCBForum')) setValue('KeywordsCBForum', '');
if(getValue('KeywordsCBForum') == 'undefined') setValue('KeywordsCBForum', '');
if(!getValue('KeywordsCBTopic')) setValue('KeywordsCBTopic', '');
if(getValue('KeywordsCBTopic') == 'undefined') setValue('KeywordsCBTopic', '');
if(!getValue('KeywordsCBSearch')) setValue('KeywordsCBSearch', '');
if(getValue('KeywordsCBSearch') == 'undefined') setValue('KeywordsCBSearch', '');
if(!getValue('KeywordsMZForum')) setValue('KeywordsMZForum', '');
if(getValue('KeywordsMZForum') == 'undefined') setValue('KeywordsMZForum', '');
if(!getValue('KeywordsMZTopic')) setValue('KeywordsMZTopic', '');
if(getValue('KeywordsMZTopic') == 'undefined') setValue('KeywordsMZTopic', '');
if(!getValue('KeywordsMZSearch')) setValue('KeywordsMZSearch', '');
if(getValue('KeywordsMZSearch') == 'undefined') setValue('KeywordsMZSearch', '');
if(!getValue('showFilteredCBForum')) setValue('showFilteredCBForum', false);
var showFilteredCBForum = getValue('showFilteredCBForum');
if(!getValue('showFilteredCBTopic')) setValue('showFilteredCBTopic', false);
var showFilteredCBTopic = getValue('showFilteredCBTopic');
if(!getValue('showFilteredCBSearch')) setValue('showFilteredCBSearch', false);
var showFilteredCBSearch = getValue('showFilteredCBSearch');
if(!getValue('showFilteredMZForum')) setValue('showFilteredMZForum', false);
var showFilteredMZForum = getValue('showFilteredMZForum');
if(!getValue('showFilteredMZTopic')) setValue('showFilteredMZTopic', false);
var showFilteredMZTopic = getValue('showFilteredMZTopic');
if(!getValue('showFilteredMZSearch')) setValue('showFilteredMZSearch', false);
var showFilteredMZSearch = getValue('showFilteredMZSearch');
if(!getValue('ShowFilter')) setValue('ShowFilter', false);
var ShowFilter = getValue('ShowFilter');
if(!getValue('HideRU')) setValue('HideRU', false);
var HideRU = getValue('HideRU');
if(!getValue('mzFooter')) setValue('mzFooter', false);
var mzFooter = getValue('mzFooter');
var fe1 = 'Empty';
var fe2 = 'Delete Keyword';
var fe3 = 'Separate multiple entries with <> and no spacing. Middle click inserts active keywords. Double click clears field.';
var fe4 = 'Case-Sensitive';
var fe5 = 'Ok';
var fe6 = 'Create Filter';
var fe7 = 'Del';
var fe8 = 'Hide RU Section';
var fe9 = 'Hide Blocks';
var fe10 = 'Filtered';
var fe11 = 'Unfiltered';
var fe12 = 'Footer Info';
var fe13 = '\u2022 ';
var fe14 = 'Show Filter';
addStyle('\
  html{height:100%}\
  #masthead,#logo,body.section-index #page-body h3,#page-footer .copyright,body.section-index #page-body p:last-child{display:none}\
  #filterContainer{border-radius:5px;float:right;margin-top:-25px;width:auto;clear:both}\
  #filterContainer > button{-moz-appearance:none;vertical-align:top}\
  #filterGroup{background:-moz-linear-gradient(#FFF,#CCC);border:1px solid #FFF;border-radius:4px;box-shadow:0 0 1px #FFF inset;color:#105289;cursor:pointer;font-size:12px;margin:0 4px 0 0;padding:3px 4px;position:relative;text-shadow:2px 2px 2px #999;top:2px}\
  #filterGroup:hover{background:-moz-linear-gradient(#CCC,#FFF)}\
  #filterCount{background:#027AB6;border-radius:3px;color:#FFF;margin:0 0 0 5px;padding:0px 3px 1px 3px}\
  #keywordIn{background:#ECF3F7;border:none;border-radius:4px;color:#105289;cursor:text;font-size:12px;height:24px;margin:0 -3px;padding:0 2px;width:350px}\
  #okBtn,#remBtn{background:#ECF3F7;border:none;cursor:pointer;font-weight:bold;height:24px}\
  #okBtn{border-radius:4px 0 0 4px;color:#105289;text-align:left;width:30px}\
  #remBtn{border-radius:0 4px 4px 0;color:#BC2A4D;text-align:center;width:38px}\
  #okBtn:hover,#remBtn:hover{background:transparent;color:#FFF;}\
  #site-description{width:auto}\
  #search-box{margin:0}\
  #search a{position:relative;top:3px}\
  #page-body>h2{margin-top:4px}\
  #page-body>h2+p{display:inline;}\
  #ruContainer{color:#FFF;float:right;font-size:12px;margin-top:-27px}\
  #ShowFilter,#HideRU{margin:-2px 12px 0 4px}\
  #HideRU{margin-right:0}\
  #LabelFilter:not(.mzLab),#LabelRU{color:#FFF;padding-right:0}\
  #LabelFilter:hover,#LabelRU:hover{cursor:pointer;text-decoration:underline}\
  #sidebar .sidebar{width:230px}\
  .sidebar>ul{margin-bottom:0}\
  #hideBlocks{background:linear-gradient(#12A3EB, #098DCE);border:1px solid #0685C4;border-radius:4px;cursor:default;padding:0 4px 2px 4px}\
  #ruContainer,#filterGroup,#hideBlocks,.mzCont{-moz-user-select:none;-moz-user-focus:none}\
  .mzCont{height:19px;margin:0 0 1px -3px}\
  .mzCont:hover{background:linear-gradient(#12A3EB, #098DCE);border-radius:3px}\
  .ckClose{float:left;margin:0 8px 0 3px;position:relative;top:1px}\
  .mzCont>.ckLabel{cursor:pointer;display:block;line-height:13px;margin-top:1px;padding:2px 0 0 0}\
  #hideBlocks,.mzCont:hover>.ckLabel{color:#FFF}\
  #fieldset{background:#DAE6EF;border:1px solid #0685C4;border-radius:6px;margin:4px 0;padding:2px 4px 3px 7px}\
  .sidebar.searchBox br{display:none}\
  .mzInp{position:relative;left:4px}\
  #LabelFilter.mzLab{color:#105289;position:relative;top:1px}\
  #LabelFilter.mzLab:hover{color:#D31141}\
  #page-header>.navbar{margin-top:4px}\
  #sidebar{padding-top:4px}\
  #sidebar>a>img{display:none}\
');
if(cbindex) {
  var div = $c('div', {id:'ruContainer'});
  var inpF = $c('input', {id:'ShowFilter', checked:ShowFilter, type:'checkbox'}, [{type:'click', fn:function(e) {showFilter(e);}}]);
  var labF = $c('label', {id:'LabelFilter', textContent:fe14});
  var inp = $c('input', {id:'HideRU', type:'checkbox', checked:HideRU}, [{type:'click', fn:function(e) {inputHide(e);}}]);
  var lab = $c('label', {id:'LabelRU', textContent:fe8});
  labF.appendChild(inpF);
  div.appendChild(labF);
  lab.appendChild(inp);
  div.appendChild(lab);
  var inner = $('.inner', $('#page-header'), 1);
  inner.appendChild(div);
  $('#ShowFilter').checked = ShowFilter;
  $('#HideRU').checked = HideRU;
}
if(cbindex && HideRU) addStyle('body.section-index #page-body>div:nth-child(6){display:none}');
else addStyle('body.section-index #page-body>div:nth-child(6){display:block}');
if(mzindex) {
  var forabg = $('.forabg'), sidebar = $('.sidebar', $('#sidebar'), 1), header = $('.header', $('#page-body'));
  var fieldset = $c('fieldset', {id:'fieldset'}), legend = $c('legend', {id:'hideBlocks', textContent:fe9});
  var inpF = $c('input', {id:'ShowFilter', className:'mzInp', type:'checkbox'}, [{type:'click', fn:function(e) {showFilter(e);}}]);
  var labF = $c('label', {id:'LabelFilter', className:'mzLab', textContent:fe14});
  fieldset.appendChild(legend);
  for(var i = 0; i < forabg.length; i++) {
    var div = $c('div', {id:'mzBlockCont' + (i+1), className:'mzCont'}), mzBlk = 'mzBlock' + (i+1);
    var input = $c('input', {id:mzBlk, className:'ckClose', type:'checkbox'}, [{type:'click', fn:function(e) {mzHide(e)}}]);
    var label = $c('label', {className:'ckLabel', textContent:header[i].children[0].children[0].textContent});
    label.appendChild(input);
    div.appendChild(label);
    fieldset.appendChild(div);
    if(!getValue('mzBlock' + (i+1))) setValue('mzBlock' + (i+1), false);
    forabg[i].id = 'Block' + (i+1);
    if(getValue('mzBlock' + (i+1))) {
      label.style.fontStyle = 'italic';
      label.style.fontWeight = 'normal';
    } else {
      label.style.fontStyle = 'normal';
      label.style.fontWeight = 'bold';
  } }
  labF.appendChild(inpF);
  label.appendChild(input);
  sidebar.insertBefore(fieldset, sidebar.lastElementChild.previousElementSibling);
  sidebar.children[1].appendChild(labF);
  var div = $c('div', {id:'mzFooterCont', className:'mzCont'});
  var input = $c('input', {id:'mzFooter', className:'ckClose', type:'checkbox'}, [{type:'click', fn:function(e) {inputHide(e)}}]);
  var label = $c('label', {className:'ckLabel', textContent:fe12});
  label.appendChild(input);
  div.appendChild(label);
  fieldset.appendChild(div);
  var close = $('.ckClose');
  for(var i = 0; i < forabg.length; i++) {
    var block = getValue('mzBlock' + (i+1));
    if(block) forabg[i].style.display = "none";
    else forabg[i].style.display = "block";
    close[i].checked = block;
  }
  $('#ShowFilter').checked = ShowFilter; 
  $('#mzFooter').checked = mzFooter;
  if(mzFooter) {
    addStyle('body.section-index #page-body p,#sidebar>div:last-child{display:none}');
    $('#mzFooterCont').firstChild.style.fontStyle = 'italic';
    $('#mzFooterCont').firstChild.style.fontWeight = 'normal';
  } else {
    addStyle('body.section-index #page-body p,#sidebar>div:last-child{display:block}');
    $('#mzFooterCont').firstChild.style.fontStyle = 'normal';
    $('#mzFooterCont').firstChild.style.fontWeight = 'bold';
} }
if(ShowFilter) {
  if(cbforum || cbsearch || cbtopic || mzforum || mzsearch || mztopic) {
    var div = $c('div', {id:'filterContainer'});
    var filterGrp = $c('span', {id:'filterGroup'}, [{type:'click', fn:function() {setFilter()}}]);
    var filterBtn = $c('span', {id:'filterButton', textContent:fe10});
    var filterCnt = $c('span', {id:'filterCount', textContent:0});
    var rem = $c('button', {id:'remBtn', textContent:fe7, title:fe2}, [{type:'click', fn:function() {remKey()}}]);
    var inp = $c('input', {id:'keywordIn', title:fe3, placeholder:fe4}, [{type:'click', fn:function(e) {getKey(e)}}]);
    var okb = $c('button', {id:'okBtn', textContent:fe5, title:fe6}, [{type:'click', fn:function() {genKey();}}]);
    var con = $('#page-body').children[1];
    filterGrp.appendChild(filterBtn);
    filterGrp.appendChild(filterCnt);
    div.appendChild(filterGrp);
    div.appendChild(okb);
    div.appendChild(inp);
    div.appendChild(rem);
    if(cbindex || cbforum || cbsearch || cbtopic) {
      var pghd = $('.inner', $('#page-header'), 1);
      pghd.insertBefore(div, pghd.childNodes[6]);
    }
    if(mzforum || mzsearch || mztopic) {
      $('#page-header').appendChild(div);
      addStyle('#filterContainer{background:-moz-linear-gradient(#12A3EB,#0076B1);margin-top:2px;padding:4px}');
    }
    $('#keywordIn').addEventListener('dblclick', function() {$('#keywordIn').value = ''}, false);
    $('#page-body').addEventListener('mouseup', getActiveText, false);
  }
  if(cbforum) {
    $('#filterGroup').title = getValue('KeywordsCBForum') ? fe13 + getValue('KeywordsCBForum').replace(/<>/gi, '\n' + fe13) : fe1;
  }
  if(cbtopic) {
    $('#filterGroup').title = getValue('KeywordsCBTopic') ? fe13 + getValue('KeywordsCBTopic').replace(/<>/gi, '\n' + fe13) : fe1;
  }
  if(cbsearch) {
    $('#filterGroup').title = getValue('KeywordsCBSearch') ? fe13 + getValue('KeywordsCBSearch').replace(/<>/gi, '\n' + fe13) : fe1;
  }
  if(mzforum) {
    $('#filterGroup').title = getValue('KeywordsMZForum') ? fe13 + getValue('KeywordsMZForum').replace(/<>/gi, '\n' + fe13) : fe1;
  }
  if(mztopic) {
    $('#filterGroup').title = getValue('KeywordsMZTopic') ? fe13 + getValue('KeywordsMZTopic').replace(/<>/gi, '\n' + fe13) : fe1;
  }
  if(mzsearch) {
    $('#filterGroup').title = getValue('KeywordsMZSearch') ? fe13 + getValue('KeywordsMZSearch').replace(/<>/gi, '\n' + fe13) : fe1;
  }
  var names = [], gvki = $('#keywordIn');
  if(cbforum) var gvkw = getValue('KeywordsCBForum');
  if(cbtopic) var gvkw = getValue('KeywordsCBTopic');
  if(cbsearch) var gvkw = getValue('KeywordsCBSearch');
  if(mzforum) var gvkw = getValue('KeywordsMZForum');
  if(mztopic) var gvkw = getValue('KeywordsMZTopic');
  if(mzsearch) var gvkw = getValue('KeywordsMZSearch');
  var kw = gvkw.split('<>');
  var listCnt = 0;
  if(cbforum || cbsearch || mzforum || mzsearch) var item = $('.row', $('#page-body'));
  if(cbtopic || mztopic) var item = $('.post', $('#page-body'));
  if(kw == '') return;
  for(k = 0; k < kw.length; k++) names.push(kw[k]);
  for(var x in names)
  for(var i = 0; i < item.length; i++) {
    var mod = names[x].replace(/\[|\]|\(|\)|\.|\?|!|"|'|\+|&|-/g, 'zqz');
    var word = new RegExp('\\b' + mod + '\\b');
    var aaa = item[i].innerHTML.replace(/\[|\]|\(|\)|\.|\?|!|"|'|\+|&|-/g, 'zqz');
    if(aaa.match(word)) {
      if(cbindex) item[i].className.match(/header/);
      if(cbforum || cbsearch || mzforum || mzsearch) item[i].className.match(/row/);
      else if(cbtopic || mztopic) item[i].className.match(/post/);
      if(cbindex) item[i].parentNode.parentNode.parentNode.style.display = 'none';
      else item[i].style.display = 'none';
      item[i].setAttribute('filtered', true);
      if(item[i].hasAttribute('filtered')) listCnt++;
  } }
  try { $('#filterCount').textContent = listCnt } catch(ex) {}
  if(cbforum) var yyy = getValue('showFilteredCBForum');
  if(cbtopic) var yyy = getValue('showFilteredCBTopic');
  if(cbsearch) var yyy = getValue('showFilteredCBSearch');
  if(mzforum) var yyy = getValue('showFilteredMZForum');
  if(mztopic) var yyy = getValue('showFilteredMZTopic');
  if(mzsearch) var yyy = getValue('showFilteredMZSearch');
  if(yyy) {
    $('#filterButton').textContent = fe11;
    setUnfiltered();
  } else {
    $('#filterButton').textContent = fe10;
    setFiltered();
} }