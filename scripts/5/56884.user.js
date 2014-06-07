// ==UserScript==
// @name           Userscripts comment helper (fixed)
// @namespace      userscripts.org/alien_scum
// @description    adds buttons to insert HTML in to comments and escape html characters
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @copyright      alien_scum & JoeSimmons
// @version        1.0.2
// @downloadURL    http://userscripts.org/scripts/source/56884.user.js
// @updateURL      http://userscripts.org/scripts/source/56884.meta.js
// ==/UserScript==

/* CHANGELOG

1.0.2
    - small fixes

1.0.1
    - readability improvements

1.0.0
    - fixed original script

*/

(function uso_comment_helper() {

'use strict';

// Edited by JoeSimmons to be fixed, and have a couple more important tags
// I cleaned up alien_scums code a little but it's still very complicated looking
// I may eventually re-write the entire code for readability

// View this code with a monospace font

var a, c, d, f, i, t, cust, rep, tag, tags, edit, edits;


// characters to replace when unescaping
rep = [

	['&',                   '&amp;'],
	['<',                   '&lt;'],
	['>',                   '&gt;'],
	['[\u201c\u201d"]',     '&quot;'],

0]; rep.pop();


//format ['name','start','end','short-cut'] or 'name' which becomes ['name','<name>','</name>'] 
tags = [

	['link',           '<a href="">',        '</a>',              'L'         ],
	['img',            '<img src="',         '" alt="" />',       'M'         ],
	['break',          '<br />',             '',                  'ENTER'     ],
	['pre',            '<pre>',              '</pre>',            'P'         ],
    ['code',           '<code>',             '</code>',           ''          ],
	['quote',          '<blockquote>',       '</blockquote>',     'Q'         ],
	['bold',           '<strong>',           '</strong>',         'B'         ],
	['italic',         '<em>',               '</em>',             'I'         ],
	['hr',             '<hr />',             '',                  ''          ],
	'li',
	'ul',
	'h1',
	'h3',
	'big',
	'small',

0]; tags.pop();



for (i = 0; i < tags.length; i++) {

	t = tags[i];
	if (typeof t === 'string') {
		tags[i] = [t,'<'+t+'>','</'+t+'>'];
	} else if (t.length === 2) {
		tags[i] = [t[0],'<'+t[0]+'>','</'+t[0]+'>',t[1]];
	} else if (t.length === 1) {
		tags[i] = [t[0],'<'+t[0]+'>','</'+t[0]+'>'];
	}

}

cust=[
/*
		['code block','<pre><code>\n','\n</code></pre>'],
		['Dive','<a href="http://diveintogreasemonkey.org/">Dive into Greasemonkey</a>',''],
		['Greasespot','<a href="http://wiki.greasespot.net/Main_Page">Greasespot Wiki</a>',''],
		['$x','<a href="http://wiki.greasespot.net/Code_snippets#XPath_helper">$x</a>',''],
		['$$','<a href="http://wiki.greasespot.net/Code_snippets#Get_elements_by_CSS_selector">$$</a>','']
*/
	];

function $(xpath) { 
    xpath = xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2//$3').replace(/([^.])\.([\w-]*)/g,'$1[@class="$2"]').replace(/#([\w-]*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
    return document.evaluate(xpath,document,null,null,null).iterateNext();
}

function remove(node) {node.parentNode.removeChild(node)};

function cE(tag, content, node){
    var res=document.createElement(tag);
    if (content) res.innerHTML=content;
    if (node) node.parentNode.insertBefore(res,node.nextSibling);
    if (res.href!=undefined) res.href='javascript:void(0);';
    return res;
}

function changer(t, fn, a) {
    return function (e) {
        var b = t.selectionStart,
            f = t.selectionEnd,
            s = t.scrollTop,
            o = {
              1 : t.value.slice(0, b),
              2 : t.value.slice(b, f),
              3 : t.value.slice(f)
            }, end_tag = a && a.length > 2 ? a[2] : '';
        if ( !fn(o, a, e) ) {
          t.value = o[1] + o[2] + o[3];

          switch (end_tag) {
            case '</a>': {
                t.setSelectionRange(o[1].length-2, o[1].length-2);
                break;
            }
            
            default: {
                t.setSelectionRange(o[1].length, (o[1] + o[2]).length);
                break;
            }
          }

          t.scrollTop = s;
          t.focus();  
        }
    };
}

function esc(s) {
   for (var i=0, s, r; r = rep[i]; i++) s=s.replace(new RegExp(r[0],'g'),r[1])
   return s;
}

function add(t,h,e) {
  if (e==undefined) e=h;
  (f=cE('span','escape: ',e)).setAttribute('class','button_or');

  // escape buttons
  f.appendChild(cE('a','all')).addEventListener('click',changer(t,function (t){
    for (var i=1;i<4;i++) t[i]=esc(t[i]);
  }),false);
  f.appendChild(document.createTextNode(' '));
  f.appendChild(cE('a','selection')).addEventListener('click',changer(t,function (t){
    t[2]=esc(t[2]);
  }),false);

  h=cE('h5','',h);  
  h.setAttribute("style", "padding: 4px 0 4px 20px !important;");
  t.addEventListener('keydown',changer(t,function (t,a,e){
    if (e.keyCode==9&&!e.ctrlKey) {
      t[1]+='&nbsp;';
      t[2]='';
      e.preventDefault();
    } else return true
  }),false);
  for (var i=0;tag=tags[i];i++){
    (a=h.appendChild(cE('a',tag[0]))).addEventListener('click',changer(t, function (t, tag) {
      t[1] += tag[1];
      t[3] = tag[2] + t[3];
    }, tag),false); 
    h.appendChild(document.createTextNode(' '));
  }
  if (cust.length) h=cE('h5','',h);  
  for (var i=0;tag=cust[i];i++){
    (a=h.appendChild(cE('a',tag[0]))).addEventListener('click',changer(t,function (t,tag){
      t[1]+=tag[1]
      t[3]=tag[2]+t[3];
    },tag),false); 
    h.appendChild(document.createTextNode(' '));
  }
}

if ($('#new_comment')) {
  $('#content').insertBefore($('#add_comment_link').cloneNode(true),$('#content/table').previousSibling.previousSibling);
  c=$('#new_comment');
  c.setAttribute('style','display:inline');
  GM_addStyle('.editbox form,.editbox form b{color:#CCC} .editbox h5:first-child{margin-top:15px;} .editbox input{margin-top:18px;} textarea {margin-top:3px;}');
  d=document.createElement('div');
  c.parentNode.replaceChild(d,c);
  d.appendChild(c);
  d.innerHTML=(d.innerHTML.match(/<form[^>]*>/)[0]+d.innerHTML.replace(/<(\/?)form[^>]*>/g,'')+'</form>');
  d.id='new_comment';
  d.setAttribute('style','display:none;padding-left:10px');
  d.setAttribute('class','editbox');
  $('#new_comment//td[2]').appendChild(cE('br'));
  $('#new_comment//td[2]').appendChild($('#new_comment//input'));
  cE('span','<span class="button_or">or <a onclick="$(\'new_comment\').hide(); $(\'add_comment_link\').show(); return false;" href="#">cancel</a></span>',$('#new_comment//input'));
  remove($('#new_comment//h5[2]'));
  add($('#new_comment//textarea'),$('#new_comment//h5'),$('#new_comment//h5[2]'));
}

if ($('#reply')) {
  remove($('#reply//h5[2]'));
  add($('#reply//textarea'),$('#reply//h5'),$('#reply//h5[2]'));
}
  
function wait(c,f){
  if (c()) f()
  else window.setTimeout(function (){wait(c,f)},300,false);
}

edits=document.evaluate('//a[contains(text(),"Edit post")]',document,null,null,null);
while(edit=edits.iterateNext()) {
    edit.addEventListener('click', function (){
        wait(
          function () {return $('#edit//textarea') && $('#edit').style.display !== 'none'},
          function () {
            remove($('#edit//h5[2]'));
            add($('#edit//textarea'),$('#edit//h5'),$('#edit//h5[2]'));
          });
    },false);
}
  
if ($('#script_description_extended')) {
  add($('#script_description_extended'),$('#q'));
  GM_addStyle('#q {margin-bottom:260px !important;}');
}  

if ($('#topic_body')) {
  add($('#topic_body'),h=$('#q'));
  GM_addStyle('#q {margin-bottom:140px !important;}');
}  

document.addEventListener('keypress', function (e) {if (e.ctrlKey&&e.charCode==115 && (s=$('input[contains(@value,"Save")]|input[@value="Create"]'))) {s.click(); e.preventDefault();}}, false);

}());