// ==UserScript==
// @name          Eniro maps with decimal lat/long coordinates
// @version       1.1: Added an easily copyable textarea with the lat, long value
// @namespace     http://code.google.com/p/ecmanaut/
// @description   Changes geographic lat/long coordinates (such as N 59º 12' 18.72") to decimal (59.205202) and adds an easiliy copyable texarea with the lat, long value in the GPS coordinates view.
// @include       http://kartor.eniro.se/*
// ==/UserScript==

/*
<ul id="wgs84">
<li id="lat">Lat: <span id="cmLat">nn.nnnnnn</span></li>
<li id="long">Long: <span id="cmLong">nn.nnnnnn</span></li>
<li id="latlong">
  <textarea id="cmLatLong" onclick="this.select()" cols="11">nn.nnnnnn, nn.nnnnnn</textarea>
</li></ul>
*/

var geoul = document.getElementById( 'wgs84' ), latlong, textarea;
if( geoul ) {
  latlong = document.createElement( 'li' );
  latlong.id = 'latlong';
  textarea = document.createElement( 'textarea' );
  textarea.id = 'cmLatLong';
  textarea.cols = '11';
  textarea.wrap = 'soft';
  textarea.setAttribute( 'onclick', 'this.select();' );
  latlong.appendChild( textarea );
  geoul.appendChild( latlong );
  GM_addStyle(
    '#cmLat { padding-left:11px; }\n' +
    '#latlong { margin:-34px 0 0 98px; }\n' +
    '#cmLatLong { width:60px; height:30px; padding:0 1px; line-height:16px; overflow:hidden; }'
  );

  unsafeWindow.CenterCoordMonitor.prototype._update = function() {
    function to_6_decimals( n ) {
      var int = Math.floor( n );
      var dec = "00000" + Math.round( (n - int) * 1e6 );
      dec = dec.substr( dec.length - 6 );
      return int + "." + dec;
    }
    var cl = this.eniMap.getCurrentLocation();
    var lat = to_6_decimals( cl.y );
    var lng = to_6_decimals( cl.x );
    this.latCont.innerHTML = lat;
    this.longCont.innerHTML = lng;
    textarea.value = lat +', '+ lng;
    if( this.converter ) {
      var rt90 = this.converter.fromWgs84(cl);
      this.xCont.innerHTML = rt90.y;
      this.yCont.innerHTML = rt90.x;
    }
  };
}
