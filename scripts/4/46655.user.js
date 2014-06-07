// ==UserScript==
// @name           favotter star
// @namespace      http://looxu.blogspot.com/
// @description    fav on favotter status page
// @include        http://favotter.matope.com/*
// @author         Arc Cosine
// @version        2.1
// ==/UserScript==
// License : Public Domain
(function(){
    var d = document;
    var FAV = {
      _url_full : 'url("http://favotter.matope.com/icon_star_full.gif") no-repeat',
      _url_throb : 'url("http://favotter.matope.com/icon_throbber.gif") no-repeat',
      _url_empty : 'url("http://favotter.matope.com/icon_star_empty.gif") no-repeat',

      _pushFav : function(node, id){
        var fav_flg = (node.style.background.match(/star_full/)) ? true : false;
        var api = !fav_flg ? 'create' : 'destroy';
        var iframe = d.createElement('iframe');
        iframe.name = 'fav_' + id;
        FAV._setCSS( iframe, { 'display' : 'none' });
        d.body.appendChild(iframe);
        var url = "https://twitter.com/favourings/" + api + "/" + id + ".xml";
        var form = d.createElement('form');
        form.action = url;
        form.target = 'fav_' + id;
        form.method = 'POST';
        d.body.appendChild(form);
        FAV._setCSS( node, { 'background' : FAV._url_throb });
        var cnt = 0;
        var crosonload = iframe.onload = function(){
          if( cnt++ == 0 ){
            setTimeout( function(){ form.submit(); }, 0 );
          }else {
            FAV._changeStar(node, fav_flg);
            iframe.parentNode.removeChild(iframe);
            form.parentNode.removeChild(form);
          }
        };
      },
      _changeStar : function(obj, fav_flg){
        if( fav_flg ){
          FAV._setCSS( obj, { 'background' : FAV._url_empty} );
        }else{
          FAV._setCSS( obj, { 'background' : FAV._url_full } );
        }
      },
      _setCSS : function(node, options){
          for( var option in options ){
              var st_op = option.replace( /-([a-zA-Z])/, function(m){ return m[1].toUpperCase(); }); 
              node.style[st_op] = options[option];
          }
      },
      init : function(){
        FAV.insert(document);
        //for autopagerize
        window.addEventListener('AutoPagerize_DOMNodeInserted', function(evt){ FAV.insert(evt.target); }, false );
      },
      insert : function(doc){
        //insert
        var targets = doc.getElementsByClassName('info');
        for( var i=0,l=targets.length; i<l; i++ )(function(node){
          var star = d.createElement('span');
          FAV._setCSS( star, {
            'background': FAV._url_empty,
            'width' : '16px',
            'height' : '16px',
            'text-align' : 'right',
            'padding-left' : '18px',
            'padding-bottom' : '20px'
          });
          var favLink = node.getElementsByTagName('a')[1].href.match(/\d+/);
          star.addEventListener( 'click', function(){ FAV._pushFav(star, favLink); }, false );
          node.replaceChild( star, node.childNodes[1] );
        })( targets[i] );
      }
    };
    FAV.init();
 })();