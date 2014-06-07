// ==UserScript==
// @name           Google Searchbar on the Right
// @version        0.11
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.com/search?*
// @include        http://www.google.co.jp/search?*
// ==/UserScript==

GM_addStyle(<><![CDATA[
 /* set width */
 div#cnt{
  max-width:100%!important;
 }
 div#res>div{
  width:48%;
  float:left;
 }
 div#res #rightBox{
  width:49%; 
  margin:0 0 0 3%  !important;
 }
 
 /* remove logo*/
 div#res form#tsf h1{
  display:none;
 }
 
 /* styles */
 div#res form#tsf table#sft{ 
  margin:0!important;
 }
 
 div#res form#tsf td#sff{
  padding:0!important;
 }

 div#res form#tsf td#sff table.ts{
  margin-bottom:0!important;
 }
 div#res form#tsf input,label{
  font-size:small!important;
 }
  
 div#res form#tsf input.lsb{
  height:25px;
  vertical-align:middle;
  margin:0!important;
 } 
 div#res form#tsf input.lst{
  margin:0;
  vertical-align:middle;
 }  
 
 /* searchesRelated */
 div#trev{
  display:none;
 }
 
 div#rightBox div.e td{
  padding:0 20px 3px 0!important;
 }

 /* remove ads */
 table[id="mbEnd"], div[id="tads"], div[id="tadsb"]{
  display: none !important;
 }
 
]]></>);

/* preparing */
var res = document.evaluate('//div[@id="res"]',document,null,7,null).snapshotItem(0);
var ol = document.evaluate('//div[@id="res"]',document,null,7,null).snapshotItem(0);
var rightBox = document.createElement('div');
rightBox.id='rightBox';

/* search form */
var form = document.evaluate('//form[@id="tsf"]',document,null,7,null).snapshotItem(0);
/* searchesRelated */
var searchesRelated = document.evaluate('//div[@id="res"]//div[@class="e"]',document,null,7,null).snapshotItem(0);

rightBox.appendChild(form);
if(searchesRelated) rightBox.appendChild(searchesRelated);

ol.appendChild(rightBox);

