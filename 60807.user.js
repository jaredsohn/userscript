// ==UserScript==
// @name           twiiter view listed
// @namespace      http://nazo.yi.org/
// @include        http://twitter.com/*
// ==/UserScript==

(function (){
   if(document.location.toString().match(/^http:\/\/twitter\.com\/([a-zA-Z0-9_]+)/)){
     var user = RegExp.$1.toString();
     var name = xpath('//h2[contains(concat(" ",@class," "), " thumb ")]')[0];
     if(!name){
       name = xpath('//div[@class="user-info clear"]')[0];
     }
     if(name){
       var div = elm('div',{
	 insertBefore:name.nextSibling,
	 style:'padding:2px 2px 0 2px;border: 1px solid #ddd' });
       getList(user,function(lists){

	 div.innerHTML="";
	 appendChild(div,
	   reduce(lists).map(function(l){
	     return elm(
	       'span',
	       {style:"padding:0 5px 0 0"},
	       [l.name,
  		 l.funs.map(function(f){
		   return elm('a',{href:f.uri},
			    elm('img',{
			      src:f.user.profile_image_url,
			      title:f.user.screen_name,
			      width:12, height:12 }));
			  })]);
		 }));
       });
     }
   }
   function reduce(lists){
     var l={};
     var ret=[];
     lists.forEach( function(list){
       var n = list.name.toUpperCase().replace(/[-_&]/g,' ');
       if(!l.hasOwnProperty(n)){
         l[n]={name:list.name, funs:[]};
	 ret.push(l[n]);
       }
       l[n].funs.push(list);
     });
     ret.sort(function(a,b){
	return b.funs.length - a.funs.length;
     });
     return ret;
   }
   function getList(user,loaded,nextp,list){
     var url = "http://twitter.com/"+user+"/lists/memberships.json";
     if(nextp) url += "?cursor="+nextp;
     GM_xmlhttpRequest({
       method:"GET",
       url: url,
       onload:function(r){
	 var v="";
	 eval("v="+r.responseText);
	 list = (list||[]).concat(v.lists);
         loaded(list);
	 if(v.next_cursor){
	   getList(user,loaded,v.next_cursor,list);
	 }
       }
     });
   }
   function xpath(query,cont) {
     var results = document.evaluate(query, cont||document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     var nodes = new Array();
     for(var i=0; i<results.snapshotLength; i++){
       nodes.push(results.snapshotItem(i));
     }
     return nodes;
   }
  function $(id){return document.getElementById(id); }
  function setAttributes( e, attrs ){
    for( var a in attrs ){
      switch(a){
      case "parent": attrs[a].appendChild(e); break;
      case "insertBefore": attrs[a].parentNode.insertBefore( e, attrs[a]); break;
      case "innerHTML": e.innerHTML= attrs[a]; break;
      default:
        if( typeof(attrs[a])=='function' && a.match(/^on(.+)$/) ){
           e.addEventListener( $1, attrs[a], true );
        }else{
           e.setAttribute( a, attrs[a]);
        }
      }
    }
  }
  function appendChild( e, c ){
    switch(typeof c){
    case 'undefined': return;
    case 'function': appendChild( e, c(e) ); break;
    case 'object':
      if( c == null )return;
      if( c instanceof Array ){
        for( var i=0;i<c.length;i++ ){ appendChild( e, c[i]); };
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
 })();

