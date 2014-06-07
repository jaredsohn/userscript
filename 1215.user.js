// ==UserScript==
// @namespace     http://visitjesper.homeip.net
// @name          Google Maps: Show Lat/Long coordinates under mouse
// @include       http://maps.google.co*
// @description   Adds an element where lat/long of the mouse pointer
//                shows. By Jesper Ronn-Jensen
//
// ==/UserScript==
(function(){
document.getElementById('toggle').previousSibling.innerHTML+='&nbsp;<span id="curLatLong"></span>';
var curLatLong;
window.setTimeout(function(){
  curLatLong=document.getElementById('curLatLong');
  var s=curLatLong.style;
  s.fontFamily='monospace';
  s.fontSize='medium';
  s.fontWeight='normal';
  if(curLatLong)
    addEvent(document.getElementById('map'),'mousemove',getCoords,true);
},120);

function getCoords(e)
{
    var m = _m.map;
    var b = m.getRelativeClickPoint(e,m.container);
    var ll = ToMapPoint(b.x, (m.viewSize.height - b.y));
    if(curLatLong) curLatLong.innerHTML='Current position: '+ ll;

}

function ToMapPoint(screenX, screenY)
{
  var m = _m.map;
  var b = m.getBoundsLatLng();
  var mapX = (((b.maxX-b.minX) / m.viewSize.width) * screenX) +b.minX;
  var mapY = (((b.maxY-b.minY) / m.viewSize.height)* screenY) +b.minY;
  return new _Point(mapX,mapY);
}

function addEvent(obj, evType, fn, useCapture){
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be attached");
  }
}
})() 
