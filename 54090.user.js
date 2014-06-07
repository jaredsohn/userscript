// ==UserScript==
// @name           DS - SmallStyle v.1.4
// @namespace      www.actionscripter.de
// @include        http://de*.die-staemme.de/*
// ==/UserScript==

function main() {
  // styles dynamisch ï¿½ndern
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 
      "table.vis img, table.menu img { max-height: 12px }"
    +  " *, body, td, th { font-family:Arial; font-size: 8pt; }";
  document.getElementsByTagName('head')[0].appendChild(style);
  
  // tabellenbreite ï¿½ndern fï¿½r umbruch
  var th = document.getElementsByTagName('th');
  for( var t=0; t<th.length; t++ ) {
    switch( th[t].innerHTML ) {
      case 'Bauen':
      case 'Forschen':        th[t].setAttribute( 'width', 300 ); break;
      case 'Fertigstellung':  th[t].setAttribute( 'width', 200 ); break;
    }
  }
  if( tb==null ) return;
  var td  = tb.childNodes[1].firstChild.childNodes[5];
  var img  = td.getElementsByTagName( 'img' );
  if( !img ) return;
  var butt  = document.createElement('button');
  butt.setAttribute('type','button');
  butt.setAttribute('style','font-size:8pt;');
   butt.innerHTML = '<img src="'+img[0].getAttribute('src')+'" height=8>';
  try {
    if( img[0].parentNode.getAttribute('href')!=null ) {
      butt.setAttribute('onclick','document.location.href = "'+img[0].parentNode.getAttribute('href')+'"');
      butt.setAttribute('accesskey','q');
    } else {
       butt.setAttribute('disabled','disabled');
    }
  } catch(evt) {
    butt.setAttribute('disabled','disabled');
  }
  td.replaceChild( butt, td.childNodes[1] );

  var butt  = document.createElement('button');
  butt.setAttribute('type','button');
  butt.setAttribute('style','font-size:8pt;');
   butt.innerHTML = '<img src="'+img[1].getAttribute('src')+'" height=8>';
  try {
    if( img[1].parentNode.getAttribute('href')!=null ) {
      butt.setAttribute('onclick','document.location.href = "'+img[1].parentNode.getAttribute('href')+'"');
      butt.setAttribute('accesskey','w');
      butt.setAttribute('id','_nextButton_' );
    } else {
       butt.setAttribute('disabled','disabled');
    }
  } catch(evt) {
    butt.setAttribute('disabled','disabled');
  }
  td.replaceChild( butt, td.childNodes[3] );

  tb.replaceChild( td, tb.childNodes[1].firstChild.childNodes[5] );

}

window.addEventListener( 'load', main, true );
