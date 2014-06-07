// ==UserScript==
// @name             CoinsonWeb
// @description      This script is a web site to add COinS.
// @include          http://*
// @include          https://*
// ==/UserScript==

// [Name]   : CoinsonWeb.user.js
// [Version]: 0.3(Under development)
// [Author] : Tadafumi sato(blog: http://exposed.egoism.co.jp/)
//
// [What's　this?]
//  This script is a web site to add COinS.
//
// [How Coins Are this script making?]
//  Xpath based on, and extracts elements.
//  Xpath is shared for each site.
//
// [Xpath how do I register?]
//  To access the following URL can be registered.
//  URL: http://wedata.net/databases/CoinsonWeb/items
//
// [How do I write?]
//  "Context" is jounal or book.
//  "URL" can write regular expressions.
//  Other, xpath can be written.
//  (.*?) is pulled out by writing '<> regexp' following xpath.
//
//  Example: "html/body/div[0] <> <div><p>(.*?)</p>"
//
// [How to use without registration?]
//  You can write directly to the script.
//

(function(){

   var DOC = document;
   var CACHE_EXPIRE = 24 * 60 * 60 * 1000;
   //var CACHE_EXPIRE = 10 * 1000;//For test
   var CACHE_INFO_URL = "http://wedata.net/databases/CoinsonWeb/items.json";
   var DEBUG = false;

   var COinS_FORMAT = {
     tag       : 'span',
     attribute : [
       {
	 name  : 'class',
	 value : 'Z3988'
       },
       {
	 name  : 'title',
	 value : ''
       }
     ],
     context : {
       journal : {
	 ctx_ver : 'Z39.88-2004',
	 rft_val_fmt : 'info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal'
       },
       book    : {
	 ctx_ver : 'Z39.88-2004',
	 rft_val_fmt : 'info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook'
       }
     },
     prefix : 'rft.'
   };

   //If you write directly to the script, please write below.
   /*
   var SITE_INFO = [
     //Jounal
     {
       name    : 'cinii',
       context : 'journal', //or book
       url     : 'http://ci.nii.ac.jp/naid/.*',
       point   : '', //COinS inseted point
       atitle  : '/html/body/div[3]/div/div/h1/span',
       title   : '',
       jtitle  : '',
       stitle  : '',
       date    : '',
       volume  : '',
       issue   : '',
       spage   : '',
       epage   : '',
       pages   : '',
       artnum  : '',
       issn    : '',
       eissn   : '',
       aulast  : '',
       aufirst : '',
       auinit  : '',
       auinit1 : '',
       auinitm : '',
       ausuffix: '',
       au      : '',
       aucorp  : '',
       isbn    : '',
       coden   : '',
       sici    : '',
       genre   : '',
         //issue,article,proceeding,conference,preprint,unknown
       chron   : '',
       ssn     : '',
       quarter : '',
       part    : ''
     }
    //Book
    ,
    {
       name    : '',
       context : 'book',
       url     : '',
       point   : '',
       btitle  : '',
       isbn    : '',
       aulast  : '',
       aufirst : '',
       auinit  : '',
       auinit1 : '',
       auinit  : '',
       ausuffix: '',
       au      : '',
       aucorp  : '',
       atitle  : '',
       title   : '',
       place   : '',
       pub     : '',
       date    : '',
       edition : '',
       tpages  : '',
       series  : '',
       spage   : '',
       epage   : '',
       pages   : '',
       genre   : '',
         //book,bookitem,proceeding,conference,report,document,unkown
       issn    : '',
       bici    : ''

    }
    //More, please connect to this.
    {
       name    : '...',
       context : '...',
       url     : '...',
       title   : '...'
     }
   ];
    */

   //Set Command Menu
   GM_registerMenuCommand('ClearCache - CoinsonWeb', clearCache);

   //Make Cache Expire
   var expire = new Date(new Date().getTime() + CACHE_EXPIRE);
   //Read Cache
   var cache;
   cache = eval(GM_getValue('cacheInfo'));
   if(!!cache && cache.expire < new Date().getTime()){
     xhrReq(CACHE_INFO_URL,
       function(res){
	 var d = eval("("+ res.responseText +")").map(
	   function(i){return i.data;}
	 );
	 setCache(expire, d);
       },
       function(res){
	 debug('download error:'+ res);
       }
     );
   }else{
     xhrReq(CACHE_INFO_URL,
       function(res){
	 var d = eval("("+ res.responseText +")").map(
	     function(i){return i.data;}
	 );
	 cache = setCache(expire, d);
       },
       function(){
	 debug('download error:'+ res);
       }
     );
   }

   //Start or SetEvent
   //window.addEventListener('load', start, false);
   start();

   //Function for CoinsonWeb Starts
   function start(){

     if(!cache){return;};

     if(typeof SITE_INFO != 'undefined' && SITE_INFO){
       //Add SITE_INFO
       SITE_INFO.forEach(function(s){
	 cache.info.push(s);
       },
       this);
     }

     cache.info.sort(function(a, b){
       return (b.url.length - a.url.length);
     });

     debug(cache.info.toSource());

     //Match Url
     var site;
     for(var i=0; i<cache.info.length; i++){
       debug(cache.info[i].url);
       if(DOC.location.href.match(cache.info[i].url)){
	 site = cache.info[i];
	 break;
       }
     }

     if(site == null){return;}

     //Make COinS Query "key=value"
     var query = [];
     for(var i in site){
       try{
	 if(typeof site[i] == 'undefined' && site[i]){continue;}
	 if(i == 'url'){continue;}
	 if(i == 'point'){continue;}
	 if(i == 'genre'){
	   query.push(COinS_FORMAT.prefix + i +"="+ site[i]);
	   continue;
	 }
	 if(!site[i].match('<>')){
	   //String Xpath
	   var ele = getElement(DOC, site[i], 0).textContent;
	   var val = ele.replace(/^\s+|\s+$/g, "");
	   query.push(COinS_FORMAT.prefix + i +"="+ encodeURIComponent(val));
	   debug(i +' : '+ val);
	 }else{
	   //Xpath <> Delimiter(regexp)
	   var s = site[i].split(/<>/g);
	   debug(s.toSource());
	   var ele = getElement(DOC,
	     s[0].replace(/^\s+|\s+$/g, ''),
	   0).innerHTML.replace(/\s+/g, '');
	   var r = s[1].replace(/\s+/g, '');
	   ele.match(new RegExp(r));
	   debug('regexp: '+ r +', match: '+ RegExp.$1);
	   var val = RegExp.$1.replace(/^\s+|\s+$/g, '');
	   query.push(COinS_FORMAT.prefix+ i +"="+ encodeURIComponent(val));
	   debug(i +' : '+ val);
	 }
       }catch(e){
	 debug('Error : '+ e);
       }
     }

     debug('query : '+ encodeURIComponent(query));

     //Make COinS Element Tag <span>
     var element = DOC.createElement(COinS_FORMAT.tag);
     COinS_FORMAT.attribute.forEach(function(a){
       if(a.name == 'title'){
	 var c = COinS_FORMAT.context[site.context];
	 for(var n in c){
	   query.push(n+ "=" +c[n]);
	 }
	 var q = query.join('&');
	 element.setAttribute(a.name, q);
       }else{
	 element.setAttribute(a.name, a.value);
       }
     },
     this);

     //Insert COinS Element
     if(typeof site.point != 'undefined' && site.point){
       var ele = getElement(DOC, site.point, 0);
       ele.appendChild(element);
     }else{
       DOC.body.appendChild(element);
     }
   }

   //Utility
   function debug(message){
     if(typeof DEBUG != 'undefined' && DEBUG){
       log(message);
     }
   }
   function log(message){
     GM_log(message);
   }

   function getElement(d, xpath, num){
     var result = d.evaluate(
       xpath,
       d,
       null,
       7,
       null
     );
     return result.snapshotItem(num);
   }

   function clearCache(){
     GM_setValue('cacheInfo', '');
   }

   function setCache(e, d){
     var c = {
       expire : e,
       info   : d
     };
     GM_setValue('cacheInfo', c.toSource());
     return c;
   }

   function xhrReq(u, c, e){
     var o = {
       method : 'get',
       url    : u,
       onload : function(r){
	 c(r);
       },
       onerror: function(r){
	 debug('Erorr:'+ r.responseText);
	 e(r);
       }
     };
     GM_xmlhttpRequest(o);
   }

})();