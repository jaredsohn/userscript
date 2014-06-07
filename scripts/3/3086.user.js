// ==UserScript==
// @name          gsearch+ 
// @namespace     tag:arakitakaya@gmail.com,2006:gm-script
// @description   looking ahead & previewing on google search
// @include       http://www.google.*
// @include       http://images.google.*
// ==/UserScript==

document.initElement = function( /* Object */ props ){
  var elem = document.createElement(props.tagName); delete(props.tagName);
  if( props.class ){ props.className = props.class; delete(props.class); }
  for(var n in props){
    try{ elem[n] = props[n]; }catch(e){ elem.setAttribute(n, props[n]); };
  }
  return elem;
};
  
document.getSnapshot = function( /* String */ xpath, /* Node */ contextNode ){
  return document.evaluate(
    xpath,
    contextNode || document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) ;
};

location.host.match(/([^\.]+)\.google/);
var gsp_mode = RegExp.$1;

var gsp_lookAhead = (function( ){
  var IF_NAME = 'lookahead';
if( window.name.match(new RegExp(IF_NAME + '.*')) ) return;
  var resultsNode = getResultNode();
if( !resultsNode ) return;
  var BUTTON_ID = '_gsp_goNext';
  var url = location.href.replace(/#.*/, '').replace(/&start=\d+/, '');
  var pageNum = 1;
  var step = ( gsp_mode == 'images' ) ? 20 : 10;
  var iframe = document.initElement({
    tagName: 'IFRAME', name: IF_NAME, width: '0px', height: '0px'
  });
  var button = document.initElement({
    tagName: 'P',
    id: BUTTON_ID,
    style: 'font-weight: bold; background-color: #e5ecf9; text-align: center; width: 100%;',
    innerHTML: '<a style="font-size: large; color: navy;">&#x6b21;&#x3078;</font>' });

  function getResultNode( ){
    var node;
    if( gsp_mode == 'images' ){
      node = document.createElement('DIV');
      var next = document.getSnapshot('/html/body/div[@class="n"]').snapshotItem(0);
      if( next ){
        next.parentNode.insertBefore(node, next);
      }else{
        node = null;
      }
    }else{
      node = document.getSnapshot('//comment()[string(.)="a"]/following::div[1]').snapshotItem(0);
    }
    return node;
  }

  function getIfResultNodes( contextNode ){
    var nodes;
    if( gsp_mode == 'images' ){
      nodes = document.getSnapshot('/html/body/table[position()>=5 and position()<=last()]', contextNode);
    }else{
      nodes = document.getSnapshot('//comment()[string(.)="a"]/following::div[1]/*', contextNode);
    }
    return nodes;
  }

  var mouseover = false;
  button.addEventListener('mouseout', 
    function( e ){
      mouseover = false;
      button.style.backgroundColor = '#e5ecf9';
      }, false);
  button.addEventListener('mouseover', 
    function( e ){
        mouseover = true;
        button.style.backgroundColor = '#00bfff';
        setTimeout(function(){
          button.style.backgroundColor = '#e5ecf9';
          if( mouseover ) gsp_lookAhead(RegExp.$1);
        }, 180);
      }, false);

  resultsNode.appendChild(button);
  document.body.appendChild(iframe);
  iframe.src = [url, '&start=', step * pageNum].join('');

  return function( ){
    var ifResNodes = getIfResultNodes(iframe.contentDocument);
    var statNode = document.getSnapshot('/html/body/table[3]', iframe.contentDocument).snapshotItem(0);
    var table = statNode.childNodes[0].childNodes[0].lastChild;
    if( gsp_mode == 'images' ) table = table.previousSibling;
    table.appendChild(document.initElement({
      tagName: 'FONT',
      style: 'font-size: small',
      innerHTML: ['&nbsp;<a name="_gsp_delimiter_', pageNum,
        '" href="#', (pageNum > 1) ? '_gsp_delimiter_' + (pageNum - 1) : '',
        '">&#x3072;&#x3068;&#x3064;&#x4e0a;&#x3078;</a> &nbsp;',
        '<a href="#">&#x30c8;&#x30c3;&#x30d7;&#x3078;</a>&nbsp; '].join('')
    }));
    resultsNode.appendChild(statNode);
    if( gsp_mode == 'images' ) resultsNode.appendChild(document.createElement('BR'));
    button.style.display = 'none';

    for( var i = 0; i < ifResNodes.snapshotLength; i++ ){
      resultsNode.appendChild(ifResNodes.snapshotItem(i));
      if( gsp_mode == 'images' ) resultsNode.appendChild(document.createElement('BR'));
    }
    pageNum++;
    iframe.contentWindow.name = IF_NAME + String(pageNum);
    iframe.src = [url, '&start=', step * pageNum].join('');
    resultsNode.appendChild(button);
    button.style.display = 'block';
  }
})( );


var gsp_preview = (function( ){
if( gsp_mode != 'www' ) return;
  var IF_NAME = 'preview';
  var PFX_BUTTON = '_gsp_pv_button_';
  var PFX_FRAME = '_gsp_pv_frame_';
  var TEXT_OPEN = '&#x30d7;&#x30ec;&#x30d3;&#x30e5;&#x30fc;';
  var TEXT_CLOSE = '&#x9589;&#x3058;&#x308b;';

  var briefs = document.getSnapshot('//p[@class="g"]/*[last()]');
  var links = document.getSnapshot('//a[@class="l"]');
  var idNum = 0; var brief;
  for( var i = 0; i < briefs.snapshotLength; i++ ){
    brief = briefs.snapshotItem(i);
    link = links.snapshotItem(i);
    brief.id = PFX_FRAME + window.name + '_' + idNum;
    button = document.createElement('SPAN');
    button.style.fontSize = 'small';
    button.innerHTML = [
      ' - [ <a class="fl" id="',
      PFX_BUTTON, window.name, '_', idNum ,
      '" style="color: #77c; cursor: pointer">',
      TEXT_OPEN, '</a> ] '].join('');
    link.parentNode.insertBefore(button, link.nextSibling);
    idNum++;
  }

  addEventListener('mousedown', 
    function( e ){
      var el = e.target;
      var pat = new RegExp(PFX_BUTTON + '(.*)');
      if( el && el.id && el.id.match(pat) ) gsp_preview(RegExp.$1);
      }, false);

  var brief, button;
  var iframe = document.initElement({
    tagName: 'IFRAME', name: IF_NAME, height: '240px', width: '800px', style: 'display: none'
  });
  return function( id ){
    var equelId = 0;
    if( button && button.id == PFX_BUTTON + id ){
      equelId = ( iframe.style.display == 'none' ) ? -1 : 1;
    }
    if( brief && equelId >= 0 ){ 
      brief.style.display = 'block';
      iframe.style.display = 'none';
      button.innerHTML = TEXT_OPEN;
    }
    if( equelId <= 0 ){ 
      button = document.getElementById(PFX_BUTTON + id);
      button.innerHTML = TEXT_CLOSE;
      brief = document.getElementById(PFX_FRAME + id);
      brief.style.display = 'none';
      iframe.src = button.parentNode.previousSibling.href;
      brief.parentNode.insertBefore(iframe, brief.nextSibling);
      iframe.style.display = 'block';
      var heads = brief.textContent.split(' ... ');
// for( i in iframe ){ GM_log(i + ":::" + iframe[i]) }
      iframe.addEventListener('load', function( ){
//        alert(unsafeWindow.namedItem(IF_NAME).document.body.textContent);
        alert(unsafeWindow.frames[1].textContent);
      }, false);
//      iframe.contentWindow.find(heads[0]);
    }
  }
})( );

var gsp_zoom = (function( ){
if( gsp_mode != 'images' ) return;
  var IMG_RES_NODE = '/html/body/table[position()>=5 and position()<=last()]/tbody';
  var CLASS_NAME = '_gsp_zoom'; 

  var image = document.createElement('IMG');
  var box = document.initElement({
    tagName: 'DIV',
    style: 'background-color: white; padding: 3px; border: 1px solid blue; display: none; position: absolute; cursor: pointer'});
  var message = document.initElement({
    tagName: 'DIV',
    innerHTML: '&#x8aad;&#x307f;&#x8fbc;&#x307f;&#x4e2d;',
    style: 'background-color: red; color: white; font-weight: bold; font-size: small; position: absolute; display: none; padding: 2px;'});
  var close = document.initElement({
    tagName: 'DIV',
    innerHTML: 'X',
    style: 'background-color: navy; color: white; font-weight: bold; font-size: 12px; width: 8px; cursor: pointer; display: none; position: absolute; padding: 2px; z-index: 10;'});
  box.appendChild(image);
  box.appendChild(close);
  document.body.appendChild(message);
  document.body.appendChild(box);

  addEventListener('click', 
    function( e ){
      var el = e.target;
      if( el && el.className && (el.className == CLASS_NAME) ) gsp_zoom(e);
      }, false);
  image.addEventListener('load', 
    function( e ){
      box.style.display = 'block';
      message.style.display = 'none';
      }, false);
  box.addEventListener('click', 
    function( e ){
      box.style.display = 'none';
      }, false);
  box.addEventListener('mouseover', 
    function( e ){
      close.style.display = 'block';
      }, false);
  box.addEventListener('mouseout', 
    function( e ){
      close.style.display = 'none';
      }, false);

  var hosts = document.getSnapshot(IMG_RES_NODE + '/tr[2]/td/font/font');
  var infos = document.getSnapshot(IMG_RES_NODE + '/tr[2]/td/font/text()[contains(string(.), " x ")]');
  var links = document.getSnapshot(IMG_RES_NODE + '/tr[1]/td/a');

  var PAT_URL = /imgurl=http:\/\/([^&]*)/;
  var PAT_SIZE = /(\d{3}) x (\d{3}) /;
  var i, url;
  for( i = 0; i < hosts.snapshotLength; i++ ){
    links.snapshotItem(i).href.match(PAT_URL);
    url = RegExp.$1;
    infos.snapshotItem(i).textContent.match(PAT_SIZE);
    button = document.createElement('SPAN');
    button.innerHTML = [
      ' [<a class="', CLASS_NAME ,
      '" id="', url, ':', RegExp.$1, ':', RegExp.$2 ,
      '" style="color: #77c; cursor: pointer">',
      '&#x62e1;&#x5927;', '</a>] '].join('');
    hosts.snapshotItem(i).appendChild(button);
  }

  return function( event ){
    var info, x, y;
    box.style.display = 'none';
    message.style.display = 'none';
    x = event.pageX - 100;
    y = event.pageY - 100;
    info = event.target.id.split(':');
    image.src = "http://" + info[0];
    with( message.style ){
      left = x + 'px';
      top = y + 'px';
      display = 'block';
    }
    x = x - (Number(info[1]) / 2); if( x < 0 ) x = 0;
    y = y - (Number(info[2]) / 2); if( y < 0 ) y = 0;
    with( box.style ){ left = x + 'px'; top  = y + 'px'; }
    with( close.style ){ left = (Number(info[1]) - 6) + 'px'; top = '-1px'; }
  }
})( );
