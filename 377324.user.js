// ==UserScript==
// @name        Kerbal Maps DMS format
// @namespace   http://userscripts.org/users/423875
// @include     http://www.kerbalmaps.com/
// @version     1
// @grant       none
// ==/UserScript==

window.onload=function(){var a="(-?([0-9]*.[0-9]+|[0-9]+))",a=new RegExp(a+" : "+a),c=L.KSP.CelestialBody,i=document,j,k,d=i.createElement("style"),z="overlays";i.head.appendChild(d);d.sheet.insertRule(".leaflet-popup-content table{font-size:12px;text-align:right}",0);initmap();map.infoControl.options.dms=true;for(i in c)for(j in c[i][z])for(k in c[i][z][j]._layers)(d=c[i][z][j]._layers[k]._popup)._content=d._content.replace(a,function(a,b,a,a){return L.KSP.Control.Info.prototype._dmsFormatter({lat:b,lng:a})})};