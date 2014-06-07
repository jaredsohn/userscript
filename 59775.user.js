// ==UserScript==
// @name           Google検索 - もっと「検索ツール」 (Better Options)
// @version        0.1
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @description    誰も使っていない気がするGoogle検索結果の「検索ツール」サイドバーを、もっと使ってみるスクリプトです。
// ==/UserScript==


//URL取り扱い http://zombiebook.seesaa.net/article/31766192.html を使わせて頂きました
function getParameter(str){
var dec=decodeURI;var par=new Array,itm;if(typeof(str)=='undefined')return par;if(str.indexOf('?', 0)>-1)str=str.split('?')[1];str=str.split('&');for(var i=0;str.length >i;i++){itm=str[i].split("=");if(itm[0]!=''){par[itm[0]]=typeof(itm[1])=='undefined'?true:dec(itm[1]);}}return par;
}

function setParameter(par){
var enc = encodeURI;var str='',amp='';if(!par) return'';for(var i in par){str=str+amp+i+"="+enc(par[i]);amp='&'}return str;
}

function setDiv(content){
  var divTemp = document.createElement('div');
  divTemp.setAttribute('class','tbou');
  divTemp.appendChild(content);
  return divTemp;
}


var parent = document.evaluate('//div[@id="tbd"]',document,null,7,null).snapshotItem(0);
var baseUrl = 'http://www.google.com/search';

//1.他のGoogleサービスへのリンクをつける
var div = document.createElement('div');
div.setAttribute('class','tbt');

//雰囲気づけに
var content = '<dfn>&nbsp;&rsaquo;&nbsp;</dfn>ウェブ';
var divTemp = document.createElement('div');
divTemp.setAttribute('class','tbos');
divTemp.innerHTML=content;
div.appendChild(divTemp);

var set = [
  [ '画像', 'http://images.google.com/images' ],
  [ '動画', 'http://video.google.com/videosearch'],
  [ '地図', 'http://maps.google.co.jp/maps'],
  [ 'ニュース', 'http://www.google.com/news/search'],
  [ '本', 'http://books.google.com/books', ],
  [ '翻訳', 'http://translate.google.co.jp/translate_t'],    
  [ 'Scholar', 'http://scholar.google.com/scholar'],
  [ 'Code', 'http://code.google.com/search/'],
];

var params = getParameter(location.search);
for(i=0; i<set.length; i++){
  var a = document.createElement('a');
  var text = document.createTextNode(set[i][0]);
  
  if(set[i][0] == 'Code')
    a.href= set[i][1] + '#' + setParameter( { 'q': params['q'] } );
  else if(set[i][0] == '翻訳') 
  {
    if( params['q'].match(/^[a-zA-Z0-9\+ ]+$/) )
      a.href = set[i][1] + "?#en|ja|" + params['q'];
    else
      a.href = set[i][1] + "?#auto|en|" + params['q'];
  }
  else
    a.href= set[i][1] + '?' + setParameter( { 'q': params['q'] , 'hl': params['hl']  } );
  
  a.appendChild(text);
  a.setAttribute('class','q');
  div.appendChild(setDiv(a));
}
parent.appendChild(div);


//2.ウェブ履歴とブックマークをつける
var div = document.createElement('div');
div.setAttribute('class','tbt');
var set = [
  [ 'ウェブ履歴', 'http://www.google.com/history/find?'],
  [ 'ブックマーク', 'http://www.google.com/bookmarks/find?'],
];
for(i=0; i<set.length; i++){
  var a = document.createElement('a');
  var text = document.createTextNode(set[i][0]);
  a.href= set[i][1] + setParameter( { 'q': params['q'] , 'hl': params['hl']  } );  
  a.appendChild(text);
  a.setAttribute('class','q');
  div.appendChild(setDiv(a));
}
parent.appendChild(div);


//3.引用符と言語切替をつける
var div = document.createElement('div');
div.setAttribute('class','tbt');
  var a = document.createElement('a');
  var text;
  var temp = params['q'];
  if( temp.match(/^"(.*)"$/) )
  {
     params['q'] = RegExp.$1;
     text = document.createTextNode('引用符外す');
  }
  else
  {
     params['q'] = '"' + params['q'] + '"';
     text = document.createTextNode('引用符');
  }

  //a.href= 'http://www.google.com/search?' + setParameter( params );
  a.href= baseUrl + '?' + setParameter( params );  
  params['q']=temp;
  a.appendChild(text);
  a.setAttribute('class','q');
  div.appendChild(setDiv(a));

//言語切替
//original: http://userscripts.org/scripts/show/9649
/*
    'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bh', 'xx-bork', 'bs', 'br', 'bg', 'km', 'ca',
    'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'xx-elmer', 'en', 'eo', 'et', 'fo', 'tl', 'fi',
    'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gn', 'gu', 'xx-hacker', 'iw', 'hi', 'hu', 'is', 'id', 'ia', 'ga',
    'it', 'ja', 'jw', 'kn', 'kk', 'xx-klingon', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'ln', 'lt', 'mk',
    'ms', 'ml', 'mt', 'mr', 'mo', 'mn', 'ne', 'no', 'nn', 'oc', 'or', 'ps', 'fa', 'xx-piglatin', 'pl',
    'pt-BR', 'pt-PT', 'pa', 'qu', 'ro', 'rm', 'ru', 'gd', 'sr', 'sh', 'st', 'sn', 'sd', 'si', 'sk', 'sl',
    'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'ti', 'to', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur',
    'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
*/
var list = ['en','ja','fr','de','ru','es','it','ko','zh-cn','zh-tw'];
list.sort();
params=getParameter(location.search);
var langSelect = document.createElement('span');
var current = params['hl'];
var generateOption = function(v) {
 params['hl'] = v;
 if(params['lr']) params['lr'] = 'lang_' + v;
 var url = baseUrl + '?' + setParameter(params);
 return '<option value="' + url + '"' + ((v == current)? ' selected="1"' : '') + '>' + v + '</option>';
 params = temp;
};
var opts = list.map(generateOption).join("\n");
var sel = '<select name="hl" onchange="location.href=this.options[this.selectedIndex].value">' + opts + '</select>';
langSelect.innerHTML=sel;
div.appendChild(setDiv(langSelect));
parent.appendChild(div);


//アカウントとログインをつける
/*
var div = document.createElement('div');
div.setAttribute('class','tbt');
var items = document.evaluate('//div[@id="guser"]//a',document,null,7,null);
for (var i = 0; i < items.snapshotLength; i++)
{
    item = items.snapshotItem(i);
    if(item.href.match(/^http:\/\/www\.google\.com\/history/)) continue;
    div.appendChild(setDiv(item));
    parent.appendChild(div);
}
*/

//Style
GM_addStyle(<><![CDATA[

 #gbar nobr{
   display:none;
 }
 #gbar a{
   margin-left:7px;
 }
 
 /* narrower */
.tbo #tbd {
 left:3px;
 width:7em;
 padding-top: 5px;
}

.tbo #res {
margin-left:7.5em;
}
 
 /* with Google Search - Sidebar */
 #sidebar #topItem{
   display:none;
 }

 #sidebar #searchesRelated{
   padding-top:0 !important;
 }


]]></>);
