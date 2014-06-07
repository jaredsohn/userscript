// ==UserScript==
// @name          Goodreads Allegheny County, PA (local library search)
// @description   goodreads.com - Search the Allegheny County Public Library System
// @version       1.0.0
// @namespace     http://www.facebook.com/phanbu
// @include       http://www.goodreads.com/book/show/*
// @include       https://www.goodreads.com/book/show/*
// ==/UserScript==

var load,execute,loadAndExecute;
load=function(a,b,c){
  var d;
  d=document.createElement("script"),
  d.setAttribute("src",a),
  b!=null&&d.addEventListener("load",b),
  c!=null&&d.addEventListener("error",c),
  document.body.appendChild(d);
  return d
},
execute=function(a){
  var b,c;
  typeof a=="function"?b="("+a+")();":b=a,
  c=document.createElement("script"),
  c.textContent=b,
  document.body.appendChild(c);
  return c
},
loadAndExecute=function(a,b){
  return load(a,function(){return execute(b)})
};

loadAndExecute(
  "http:////ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js",
  function(){
      var $j = jQuery.noConflict();
      var isbn = $j('meta[property="good_reads:isbn"]').attr('content');
      if ( $j('#eiNetworkLink').length == 0   &&  null != isbn )
      {   
          var li = $j(document.createElement('li'));
          
          var link = $j(document.createElement('a'))
            .attr({
              href: 'http://catalog.einetwork.net/search/i?SEARCH=' + isbn,
              title: 'Search the Allegheny County Public Library System',
              target: '_blank',
              id: 'eiNetworkLink',
              'class': 'buttonBar'
            });
          $j(link).appendTo(li);
          
          var ein = $j(document.createTextNode("local library"));
          $j(ein).appendTo(link);
          
          $j('#findit li.lastBuyButton').before(li);
      }
  }, 
  function(){
      console.log("failed to load jQuery");
  }
);
