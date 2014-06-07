// ==UserScript==
// @name           Google Search - Sidebar
// @version        0.7
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @description    Put aside things and get simple & neat Google search. 
// ==/UserScript==

/* user config */
var add_favicon_to_wikipedia = false;


///////////////////////////////////////////////////////////////////////////////////////////////


/* preparing */
var sidebar = document.createElement('div');
sidebar.id='sidebar';

/* resultStats */
var resultStats = document.evaluate('//div[@id="ssb"]/p',document,null,7,null).snapshotItem(0);
sidebar.appendChild(resultStats);
var div = document.createElement('div');
var p = document.createElement('p');
//div.setAttribute('style','font-size:small; text-align:right; white-space:nowrap;');
div.setAttribute('style','height:20px;');
div.appendChild(p);
sidebar.appendChild(div);

/* gbar */
var div = document.createElement('div');
div.setAttribute('id','topItem');
var gbar = document.evaluate('//div[@id="gbar"]',document,null,7,null).snapshotItem(0);
div.appendChild(gbar);
sidebar.appendChild(div);

/* searchesRelated */
var searchesRelatedLinks = document.evaluate('//div[@id="res"]//div[@class="e"]//a',document,null,7,null);

if( searchesRelatedLinks.snapshotItem(0) )
{
  var div = document.createElement('div');
  div.setAttribute('id','searchesRelated');
  div.setAttribute('class','box');
  for (var i = 0, maxi = searchesRelatedLinks.snapshotLength; i < maxi; i++)
  {
     var a = searchesRelatedLinks.snapshotItem(i);
     div.appendChild(a);
  }
  sidebar.appendChild(div);
}

/* specialItems */

// code snippet
var snippet = document.evaluate('//div[@id="res"]/div/ol/li[@class="g rbt"]',document,null,7,null).snapshotItem(0);
if (snippet){
    var div = document.createElement('div');
    div.setAttribute('class','specialItems');
    var ol = document.createElement('ol');
    ol.appendChild(snippet);
    div.appendChild(ol);
    sidebar.appendChild(div);
}


/* wikipedia */
var items = document.evaluate('//div[@id="res"]//a[@class="l"]',document,null,7,null);
var div = document.createElement('div');

if(add_favicon_to_wikipedia==true)
{
	var favicon = document.createElement('img');
	favicon.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS0lEQVQ4jcWTwY3EIAxFR6MUETpwDaPcQwekBVICOUIRLiGUQBqYlAAdhB6I/h5GQZPdaLXSrrQHDljW8/e3fSt7wW/e7f8BYQlQg4LsJcISUPYCP3vIXsJMBjFFlL3ATAZqUIgpIqYIPWqoQb0UOOtARBVQ9gLZSxARYorIW4azDsyMshfkLUOPGsz8AsQUIVoBPWrkLaPsBcwM0Qr42WN9rtCjrvADcPJADQqiFVifKw7oocJZBz/7CghLqP/be1C0As66msjMaO4N1KBO1Z11td3TFGQvIXtZjYspont0kL2sOTFFmMlcj9FZh+beVHkH4N1gZq5mXu4BEUENCnnL8LOHHjW6R1dNc9ZVoy8Bzjp0jw5mMvCzr5KJCMx88ugS4GcPIgIR1VbCEmrsmNK3q/zZzLIX6FGDiH52C2EJXyrFFE+b+mfH9AGWL1wAegygIwAAAABJRU5ErkJggg==';
	var favicon_added=false;
}
	
div.setAttribute('class','specialItems wikipediaLinks');
for (var i = 0; i < items.snapshotLength; i++)
{
	//item = items.snapshotItem(i);
	var item=items.snapshotItem(i);
	var url = item.href;
	
	if(url.match(/^http:\/\/[a-z-]+?\.wikipedia\.org/))
	{
		//alert(url);
		
		if(add_favicon_to_wikipedia==true && favicon_added==false)
		{
			item.parentNode.insertBefore(favicon,item);
			favicon_added=true;
		}
		
		
		div.appendChild(item.parentNode.parentNode);
	}
}
sidebar.appendChild(div);


// check whether "Did you mean" exists or not
var didyoumean = document.evaluate('//div[@id="res"]/div/ol/li',document,null,7,null).snapshotItem(0);
if ( didyoumean.getAttribute('class') != null )
{
  var specialItemsLists = document.evaluate('//div[@id="res"]/div/ol/li[@class="g"][not(./div[contains(concat(" ",@class," "), " s ")])]',document,null,7,null);
  if(specialItemsLists.snapshotItem(0)){
    var ol = document.createElement('ol');
    for (var i = 0, maxi = specialItemsLists.snapshotLength; i < maxi; i++)
    {
       var li = specialItemsLists.snapshotItem(i);
         ol.appendChild(li);
    }
    
    
    var div = document.createElement('div');
    div.setAttribute('class','specialItems');
    div.appendChild(ol);
    sidebar.appendChild(div);
  }
}
sidebar.appendChild(div);

/* toogle link */
var tbpi = document.evaluate('//a[@id="tbpi"]',document,null,7,null).snapshotItem(0);
if( tbpi == null) var tbpi = document.evaluate('//div[@id="prs"]/a',document,null,7,null).snapshotItem(0);
var div = document.createElement('div');
div.setAttribute('class','specialItems toggleLink');
div.appendChild(tbpi);
sidebar.appendChild(div);

/* complete */
var res = document.evaluate('//div[@id="res"]',document,null,7,null).snapshotItem(0);
var ol = document.evaluate('//div[@id="res"]',document,null,7,null).snapshotItem(0);
ol.appendChild(sidebar);


GM_addStyle(<><![CDATA[
 /* set width */
 #cnt{
  max-width:100%!important;
 }

 #res{
  margin:0 5px;
  padding:0;
 }
 
 #res>div:not(#sidebar)
 {
  max-width:38em;
  float:left;
  clear:both;
  width:55%;
  margin-right:10px;
 }
 
 #sidebar{
   margin-top:-13px!important;
 }

 #res>div._autopagerize{
   max-width:98%!important;
   width:98%!important;
 } 
 
 /* header */
 #header{
 }
 #guser{
   height:22px;
   border-bottom:1px solid #6B90DA;
 }
 .gbh{
 display:none;
 }
  
 /* remove logo*/
 form#tsf h1{
  display:none;
 }

 /* bar */
 div#ssb{
   display:none;
 }
 
 /* form */ 
 form#tsf{
   position:absolute;
   top:3px;
   margin:0!important;
 }
 
 form#tsf table#sft{ 
  margin:0!important;
 }
 
 form#tsf td#sff{
  padding:0!important;
 }
 form#tsf td#sff table.ts{
  margin:0 !important;
 }
 
 form#tsf td#sff>*:not(table){
  display:none;
 }
  
 form#tsf input.lsb{
  height:25px;
  vertical-align:middle;
  margin:0!important;
  font-size:12px;
 } 
 form#tsf input.lst{
  margin:0;
  vertical-align:middle;
  font-size:14px;
 }  
 
 /* sidebar box */
 #sidebar .box{
   border-bottom: 2px solid #eee;
   padding:10px 0;
   overflow:hidden; 
 }
 
 /* searchesRelated */
 div#trev{
  display:none;
 }
 
 div.e{
   display:none;
 }
 
 /* did you mean */
 div#res>p{
   display:none;
 }
 
 /* sidebar */
 
 #sidebar #searchesRelated{
   padding: 5px 0;
 }
 #sidebar #searchesRelated a{
   padding:2px 8px;
   font-size:12px;
   float:left;
   white-space:nowrap;
 }
 
 #sidebar .specialItems{
   overflow:hidden;
   padding-left:10px;
 }
 
 #sidebar li{
   list-style:none; 
 }
 
 #sidebar .specialItems>ol>li{
   border-bottom: 2px solid #eee;
   margin:0!important;
   padding:5px 0 15px !important;
 }
 
 #sidebar .specialItems.wikipediaLinks{
   border-bottom: 2px solid #eee;
 }
 
 #sidebar #topItem{
   padding:0 0 5px;
   overflow:hidden;
   border-bottom: 2px solid #eee;
 }
 
 #sidebar #gbar{
   height:auto;
 }
 #sidebar #tbp{
   display:none;
 }

 #sidebar .toggleLink span
 {
   padding:0;
   margin:0;
   font-size:80%;
 }
 
 /* misc */
 #res hr, #res>br{
   display:none;
 }
 
 #res>table.std{
   margin:20px 0 10px;
 }
 
 /* resultStats */
 #resultStats{
 	position:absolute;
 	top:20px;
 	right:0px;
 	font-size:small;
 }
 
 /* remove ads */
 table[id="mbEnd"], div[id="tads"], div[id="tadsb"]{
  display: none !important;
 }
 
]]></>);
