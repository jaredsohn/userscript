// ==UserScript==
// @name           Google検索 - 充実バー
// @version        0.1
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// ==/UserScript==


//URL取り扱い
function getParameter(str){
var dec=decodeURI;var par=new Array,itm;if(typeof(str)=='undefined')return par;if(str.indexOf('?', 0)>-1)str=str.split('?')[1];str=str.split('&');for(var i=0;str.length >i;i++){itm=str[i].split("=");if(itm[0]!=''){par[itm[0]]=typeof(itm[1])=='undefined'?true:dec(itm[1]);}}return par;
}

function setParameter(par){
var enc = encodeURI;var str='',amp='';if(!par) return'';for(var i in par){str=str+amp+i+"="+enc(par[i]);amp='&'}return str;
}


var set = [
  [ '画像', 'http://images.google.com/images?' ],
  [ '動画', 'http://video.google.com/videosearch?'],
  [ '地図', 'http://maps.google.co.jp/maps?'],
  [ 'ニュース', 'http://www.google.com/news/search?'],
  [ 'ブログ', 'http://blogsearch.google.com/blogsearch?'],
  [ '本', 'http://books.google.com/books?', ],
  [ '翻訳', 'http://translate.google.co.jp/translate_t?'],    
  [ 'Scholar', 'http://scholar.google.com/scholar?'],
  [ 'Code', 'http://code.google.com/search/#'],
  [ '履歴', 'http://www.google.com/history/find?'],
  [ 'ブックマーク', 'http://www.google.com/bookmarks/find?'],
  [ '24時間以内', 'http://www.google.com/search?'],
  [ '1週間以内', 'http://www.google.com/search?'],
  [ '1年以内', 'http://www.google.com/search?'],
  [ '引用符', 'http://www.google.com/search?'],  
];

var params = getParameter(location.search);
var div = document.createElement('div');

for(i=0; i<set.length; i++){
  if(set[i][0] == null)
  {
    div.appendChild( document.createElement('br') );
    continue;
  }
  
  var a = document.createElement('a');
  var text = document.createTextNode(set[i][0]);
  
  if(set[i][0] == 'Code')
    a.href= set[i][1] + setParameter( { 'q': params['q'] } );
  else if(set[i][0] == '翻訳')
  {
    if( params['q'].match(/^[a-zA-Z0-9\+ ]+$/) )
      a.href = set[i][1] + "#en|ja|" + params['q'];
    else
      a.href = set[i][1] + "#auto|en|" + params['q'];
  }
  else if(set[i][0] == '引用符')
  {
    var temp = params['q'];
    if( temp.match(/^"(.*)"$/) )
      params['q'] = RegExp.$1;
    else
      params['q'] = '"' + params['q'] + '"'
    a.href= set[i][1] + setParameter( params );
    params['q']=temp;
  }
  else if(set[i][0] == '24時間以内')
  {
    params['tbs'] = 'qdr:d';
    params['tbo'] = '0';
    a.href = set[i][1] + setParameter( params);
  }
  else if(set[i][0] == '1週間以内')
  {
    params['tbs'] = 'qdr:w';
    params['tbo'] = '0';
    a.href = set[i][1] + setParameter( params);
  }
  else if(set[i][0] == '1年以内')
  {
    params['tbs'] = 'qdr:y';
    params['tbo'] = '0';
    a.href = set[i][1] + setParameter( params);
  }  
  else
    a.href= set[i][1] + setParameter( { 'q': params['q'] , 'hl': params['hl']  } );
  
  a.appendChild(text);
  a.setAttribute('class','gb1');
  div.appendChild(a);
}



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

//params=getParameter(location.search);
var list = ['en','ja','fr','de','ru','es','it','ko','zh-cn','zh-tw'];
list.sort();
var langSelect = document.createElement('span');
var baseurl = 'http://www.google.com/search?';
var current = params['hl'];
var generateOption = function(v) {
 params['hl'] = v;
 if(params['lr']) params['lr'] = 'lang_' + v;
 var url = baseurl + setParameter(params);
 return '<option value="' + url + '"' + ((v == current)? ' selected="1"' : '') + '>' + v + '</option>';
 params = temp;
};
var opts = list.map(generateOption).join("\n");
var sel = '<select name="hl" onchange="location.href=this.options[this.selectedIndex].value">' + opts + '</select>';
langSelect.innerHTML=sel;
div.appendChild(langSelect);

//complete
var gbar = document.evaluate('//div[@id="gbar"]',document,null,7,null).snapshotItem(0);
gbar.innerHTML='';
div.setAttribute('id','utilityLinks');
gbar.appendChild(div);


//Style
GM_addStyle(<><![CDATA[

 #utilityLinks img{
   border:none;
   width:25px;
   padding:0 1px;
 }
 #utilityLinks a{
   white-space:nowrap;
   line-height:1.6em;
 }
 
 #utilityLinks select{
 }
 .gbh {
 top:29px !important;
 }
  
 #gbar{
   height:auto;
 }

]]></>);
