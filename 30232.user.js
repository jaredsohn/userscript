// ==UserScript==
// @name           Google Result Add Link
// @description    more links and results in google
// @version        1.1
// @author         nazoking@gmail.com
// @namespace      http://nazo.yi.org/
// @include        http://www.google.*/search*
// @Note           
// ==/UserScript==

(function(){

  //-- 設定 --------------------------------------------
  // search- 言語選択の再構築
  const REBUILD_LANGSELECT=true;
  const LANGSELECT = {"":"全体","lang_ja":"日本語"};

  // google bookmark search ブックマーク検索
  const GOOGLE_BOOKMARK_SEARCH=true;
  // ブックマーク検索時の追加クエリ（ラベルとか）
  const BOOKMARK_SEARCH_ADDITIONAL_QUERY="+-label%3AAutoPost";
  const WEBHISTORY_SEARCH=true;
  //-- 設定 --------------------------------------------
  
  
  /* 検索語 */
  var qs=parseQuery(location.search.substr(1));
  function parseQuery(query){
    var qs = {};
    query.split("&").forEach(function(p){
      p = p.split("=");
      qs[p[0]]=decodeURI(p[1]);
    });
    var tabs = {};
    if(qs.tbs){
      qs.tbs.split(',').forEach(function(a){
        a = a.split(':');
        tabs[a[0]]=a[1];
      });
    }
    qs.tbs=tabs;
    return qs;
  }
  function buildQuery(qs,o){
    var s = [];
    if(o) qs = extend(qs,o);
    for(var i in qs){
      var v=qs[i];
      switch(i){
      case 'tbs':
        console.log([i,v,qs,o]);
        var tbs = [];
        for(var ii in v){
          tbs.push( ii+":"+v[ii] );
        }
        v = encodeURI(tbs.join(","));
        break;
      default:
        v=encodeURI(v);
      }
      s.push(i+"="+v);
    }
    return s.join("&");
  }

  // サイドバー 一番上
  var ss = $x('//*[@id="ms"]//ul')[0];
  ss.appendChild(elm('li',{'class':'mitem'},linkToCodeSearch()));

  // 三ヶ月、六ヶ月追加
  var qdr_m = $('qdr_m');
  if(!qdr_m){
    $('tbpi').addEventListener('click',function(){
      setTimeout(addQDR,100);
    },false);
  }else{
    addQDR();
  }
  function addQDR(){
    var qdr_m = $('qdr_m');
    if(!qdr_m){
      setTimeout(addQDR,100);
      return;
    }
    var tbt = qdr_m.parentNode;
    if(!qs.tbs || qs.tbs.qdr != 'm3')
      tbt.insertBefore( elm("li",{'class':'tbou'},elm('a',{href:location.pathname+"?"+buildQuery( qs, {tbs:extend(qs.tbs,{qdr:"m3"})} )},txt("3 ヶ月以内"))), qdr_m.nextSibling );
    if(!qs.tbs || qs.tbs.qdr != 'm6')
      tbt.insertBefore( elm("li",{'class':'tbou'},elm('a',{href:location.pathname+"?"+buildQuery( qs, {tbs:extend(qs.tbs,{qdr:"m6"})} )},txt("6 ヶ月以内"))), qdr_m.nextSibling );
  }
  
  /* サイド広告消す */
  var mbEnd = document.getElementById("mbEnd");
  if( mbEnd ){ mbEnd.style.display='none' }

  /* 上広告消す */
  var tads = document.getElementById("tads");
  //if( tads ){ tads.style.display='none' }
  
  /* 検索結果 */
  var res = document.getElementById("res");
  
  if( res ){
    /* 検索結果の右上にボックス */
    var div = elm("div",{
      style:"float:right;width:250px",
      insertBefore:res.firstChild,
    });
    if( GOOGLE_BOOKMARK_SEARCH ){
      div.appendChild( bookmark_search() );
    }
    if( WEBHISTORY_SEARCH ){
      div.appendChild(webhistory_search());
    }
  }

  $x('//form[@action="/search"]').forEach(selectElements);
  
  //-----------------------------------------------
  // 操作
  //-----------------------------------------------
  /* 改行をなくす */
  function removeBr(place){
    var brs = place.getElementsByTagName("br");
    for( var i = 0; i<brs.length; i++ ){
      place.removeChild( brs.item(i) );
    }
    place.appendChild(document.createTextNode(" "));
  }

  //-----------------------------------------------
  // パーツ
  //-----------------------------------------------

  function dateRange(){
    var d = $x('//select[@name="as_qdr"]')[0];
    if(d){
      d.parentNode.removeChild(d);
    }
    return elm('select',{name:'as_qdr'},
               'all:全期, y15:15年, d:1日, w:1週, m:1月, m3:3月, m6:6月, y:1年, y2:2年, y3:3年'.split( ', ' ).map(function(p){
                 var p=p.split(':');
                 return new Option(p[1],p[0]);
               }));
  }

  // code-search へのリンク
  function linkToCodeSearch(){
    return elm("a",{
      href: "http://www.google.com/codesearch?q="+encodeURI(qs.q)+"&hl=ja",
    },"code-search");
  }
  // interface language select 表示言語選択
  function linkToEn(){
    // en / jp へのリンク
    var link = document.createElement("a");
    var h = location.href.toString();
    var r = /([?&]hl=)(ja|en)/;
    var tolang = 'en';
    if(r.test(h) && RegExp.$2=='en'){
      tolang='ja';
    }
    link.href = r.test(h) ? h.replace(r,'$1'+tolang ) : ( h + "&hl="+tolang );
    link.href = link.href.replace("&lr=lang_"+tolang,'' );
    link.appendChild(document.createTextNode(tolang));
    return link;
  }
  // 検索言語選択
  function rebuild_land_lr(){
    $x('//INPUT[@name="lr"]').forEach(function(e){
      $x('//LABEL[@for="'+e.id+'"]').forEach(function(l){
        l.parentNode.removeChild(l);
      });
      e.parentNode.removeChild(e);
    });
    var ss = elm("span");
    for( var l in LANGSELECT ){
      var e = elm('input',{id:"lr_"+l,name:"lr",value:l,type:"radio"});
      e.addEventListener('change',function(m){this.form.submit()},false);
      ss.appendChild(elm('label',{"for":"lr_"+l,style:"cursor:pointer"},[e, LANGSELECT[l] ]));
    }
    return ss;
  }

  // bookmark search block
  function bookmark_search(){
    var bookmarkdiv = elm("div",{
    id:"bookmarkdiv",
    innerHTML:"<style>#bookmarkdiv a{margin-bottom:6px;display:block;text-decoration:none;line-height:120%;font-size:x-small} #bookmarkdiv div{margin:-6px 0 6px 1em;line-height:120%;font-size:x-small;background:#eee;}</style>",
    })
    xhr( "/bookmarks/find?q="+encodeURI(qs.q)+ BOOKMARK_SEARCH_ADDITIONAL_QUERY+"&output=rss",
          function(r){
            var bms = parseXML(r).firstChild.firstChild.childNodes;
            if(bms.length>0){
              elm( "A", {
                  parent:bookmarkdiv,
                  style:"background:#fcc",
                  href: "/bookmarks/find?q=" + encodeURI(qs.q) ,
              },"Bookmark");
              for(var i=0;i<bms.length;i++){
                elm("A",{
                  parent:bookmarkdiv,
                  href:tag1text( bms[i], "link" ),
                },[ tag1text( bms[i], "title") ]);
                var t = tag1text( bms[i], "smh:bkmk_annotation");
                if(t){
                  elm("div",{
                  parent:bookmarkdiv,
                  },t);
                }
              }
            }
          } );
    return bookmarkdiv;
  }

  // web history search block
  function webhistory_search(){
    var historydiv = elm("div",{
    id:"historydiv",
    style:"line-height:120%;font-size:xx-small;color:#888",
    },[ elm( "A", {
    style:"background:#fcc;display:block",
    href: "/history/find?q=" + encodeURI(qs.q) ,
    },"History") ] );
    xhr( "/history/find?st=web+result&output=rss&q="+encodeURI(qs.q),
         function(r){
           var bms = parseXML(r).getElementsByTagName("item");
           if(bms.length>0){
             for(var i=0;i<bms.length;i++){
               var item = bms[i];
               if( tag1text(item,"category").indexOf("query")>-1 )continue;
               if( tag1text(item,"smh:bkmk") )continue;
               var d = new Date(tag1text( item,"pubDate" ) );
               elm("div",{
               parent:historydiv,
               style:"font-size:xx-small;color:#888;margin-bottom:4px;",
               },[ ( d.getMonth()+1)+"/"+d.getDate()+" ",
                   elm("A",{
                   style:"color:#88F;font-size:x-small;text-decoration:none",
                   href:tag1text( item, "link" ),
                   },tag1text( item, "title")),
                    tag1text( item, "description") ] );
             }
           }
         } );
    return historydiv;
  }
  /*
   utility functions ---------------------------------------
   */
  function gxhr(url,onload){
    GM_xmlhttpRequest({ method:"GET", url: url , onload: onload });
  }
  function xhr(url,onload){
    var x=new XMLHttpRequest();
    x.open("get",url,true);
    x.onreadystatechange = function(){
      if (x.readyState==4){
        onload(x);
      }
    }
    x.send( "");
    return x;
  }
  function parseXML(r){
    return (new DOMParser).parseFromString(r.responseText, "application/xml");
  }
  function selectElements(f){
    $x('//input[@type="radio" or @type="checkbox"]',f).forEach(function(e){
      if(qs[e.name]==e.value)e.checked=true;
    });
    $x('//select',f).forEach(function(e){
      if(qs[e.name]){
        Array.prototype.forEach.apply(e.getElementsByTagName('option'),[function(o){
          if(o.value==qs[e.name]) o.selected=true;
        }]);
      }
    });
    return f;
  }
  function extend(o,x){
    var ret = {};
    for(var i in o){
      ret[i]= o[i]
    }
    for(var i in x){
      ret[i]= x[i]
    }
    return ret;
  }
  function $(id){return document.getElementById(id); }
  function setAttributes( e, attrs ){
    for( var a in attrs ){
      switch(a){
      case "parent": attrs[a].appendChild(e); break;
      case "insertBefore": attrs[a].parentNode.insertBefore( e, attrs[a]); break;
      case "innerHTML": e.innerHTML= attrs[a]; break;
      default: e.setAttribute( a, attrs[a]);
      }
    }
  }
  function appendChild( e, c ){
    switch(typeof c){
    case 'undefined': return;
    case 'function': appendChild( e, c(e) )
    case 'object':
      if( c == null )return;
      if( c instanceof Array ){
        for( var i=0;i<c.length;i++ ){ appendChild( e, c[i]) };
      }else{
        e.appendChild( c );
      }
      break;
    default:
      e.appendChild( txt(c) );
    }
  }
  function elm(tag,attrs,elms){
    var e = document.createElement(tag);
    if( attrs ){
      if( attrs instanceof Array ){
        elms = attrs;
      }else{
        setAttributes( e, attrs );
      }
    }
    appendChild( e, elms );
    return e;
  }
  function txt(text){return document.createTextNode(text); }
  function tag1(el,tag){ var e = el.getElementsByTagName(tag); return e ? e[0] : null }
  function tag1text(el,tag){
    var l = tag1(el,tag);
    return l && l.firstChild ? l.firstChild.nodeValue : "";
  }
  function $x(exp, context){
    if (!context) context = document;
    var resolver = function(prefix){
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var ret = [];
    for(var i = 0, len = result.snapshotLength; i < len ; i++){
      ret.push(result.snapshotItem(i));
    }
    return ret;
  }
})();