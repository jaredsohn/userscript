scr_meta=<><![CDATA[
// ==UserScript==
// @name           Userscript.org Post Preview
// @namespace      sizzlemctwizzle
// @description    Preview your Userscript.org posts
// @version        1.0.9
// @include        http://userscripts.org/topics/*
// ==/UserScript==
]]></>;

// Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/

// Some helpful functions
function $(element) { return document.getElementById(element); }
function $x(xp, c, r) { if(!r) r=document; re=document.evaluate(xp,r,null,4,null); while(n=re.iterateNext()) c(n); }
function $x1(x, r) { if(!r) r=document; return document.evaluate(x,r,null,9,null).singleNodeValue; }
function remove(element) { element.parentNode.removeChild(element); }
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}
function xhr(url, callback, data) {
    GM_xmlhttpRequest({
          method: (data) ? 'POST' : 'GET',
	  url: url,
	  headers: {
	  'User-agent': window.navigator.userAgent,
	  'Accept': (data) ? 'application/x-www-form-urlencoded' : 'application/atom+xml,application/xml,text/xml',
	  'Content-type': (data) ? 'application/x-www-form-urlencoded' : null
	  },
	  data: (data) ? data : null,
	  onload: function(res) { if (res.status == 200) callback(res.responseText); }
      });
}
function append(a,b) { for(var i=0;i<b.length;i++) a.appendChild(b[i]); }
// create() was given to JoeSimmons who then gave it to me
function create(a,b) {
  var ret=document.createElement(a);
  if(b) for(var prop in b) {
      if(/^on/.test(prop)) ret.addEventListener(prop.substring(2),b[prop],false);
      else if(prop=="kids") {
	append(ret, b[prop]);	
      }
      else if(prop=="style") ret.setAttribute("style", b[prop]);
      else ret[prop]=b[prop];
    }
  return ret;
}

var createElements = function() {
  // A massive block of completely illegible code
  append($('tempPreviewHolder'),[create('input',{id:'previewBtn',type:'button',value:'Preview',title:'Inline preview',onclick: function (e) { box=e.target.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]; xhr('http://userscripts.org/posts/preview', function(html) { previewPost(html, box)}, 'body='+encodeURIComponent(box.value));e.preventDefault();}}),create('input',{id:'editBtn',type:'button',value:'Edit',title:'Continue editing',onclick: function (e) { editPost(e.target.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]); e.preventDefault();}}),create("span",{id:'preview_spacer',innerHTML:'&nbsp;'}),create('table',{id:'post_preview',className:'posts',style:'width:100%;background-color:#FFF;display:none;overflow-y: auto;max-height: 280px;',kids:[create('tr',{className:'post hentry',width:'100%',kids:[create('td',{className:'body entry-content',id:'preview_body',width:'100%'})]})]})]);
}

// Toggle functions
var previewPost = function(html, box) {
  box.style.display = "none";
  $('post_preview').style.display = "block";
  $('preview_body').innerHTML = html.replace(/\n{2,}/g, '<br>');
  $('previewBtn').style.display = "none";
  $('editBtn').style.display = "inline";
}
var editPost = function(box) {
  box.style.display = "block";
  $('post_preview').style.display = "none";
  $('preview_body').innerHTML = '';
  $('editBtn').style.display = "none";
  $('previewBtn').style.display = "inline";
}
// Attach elements on the fly
var attachElements = function(type) {
  $(type).appendChild(create('span',{className:'editboxLoaded'}));
  var checker=setInterval(function(){
      if(type!='edit'||(!document.evaluate('./span[@class="editboxLoaded"]',$(type),null,3,null).booleanValue)) {
	clearInterval(checker);
	submit=$x1(".//input[@name='commit' and @type='submit']", $(type));
	box = $(type).getElementsByTagName("textarea")[0];
	if (!$('post_preview')) createElements();
	insertAfter($('previewBtn'), submit);
	insertAfter($('preview_spacer'), submit);
	insertAfter($('editBtn'), $('previewBtn'));	
	insertAfter($('post_preview'), box);
	editPost(box);
      }
    },10);
}

// Logged in?
if((!$('new_topic')) && (!document.evaluate("//a[@class='utility']/child::text()[.='Reply to topic']",document,null,3,null).booleanValue)) return;

// A couple of style fixes
GM_addStyle("#preview_body pre  { width: 95% !important; white-space:pre-wrap !important; } #preview_body code { background-color: rgb(238, 238, 238) !important; } #preview_body blockquote  { min-width: 500px !important; margin-right: 5px !important; padding-top: 1px !important; padding-bottom: 1px !important; }");

// Attach our listeners
$x('//a[@class="utility"]/child::text()[.="Edit post" or .="Reply to topic"]', function(node) { node.parentNode.addEventListener('click',function (e) { attachElements(e.target.textContent.replace(/ (to topic|post)/, '').toLowerCase()); e.preventDefault(); },false); });

// Create a holder for the elements
append(document.body, [create('div',{id:"tempPreviewHolder", style:"display: none;"})]);

// Put the elements in the starting position
if(starting=$('new_topic')||$('reply')) attachElements(starting.id);

// Auto Update http://userscripts.org/scripts/show/38017
aaus_38017={i:'47777',d:2,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();