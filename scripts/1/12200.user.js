// 
// Google Big Map
// Copyright (C) Oliver Azeau
// http://barrejadis.azeau.com/
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
// ==UserScript==
// @name           Google Big Map
// @namespace      azeau.com
// @description    Generates a big map by selecting top-left and bottom-right coordinates
// @include        http://maps.google.*/*
// ==/UserScript==

function Searcher()
{
  this.host = 0;
  this.n = 0;
  this.v = 0;
  this.zoom = 999;
  this.UpdateXY = function(x,y)
  {
    GM_log('searcher host='+this.host+' n='+this.n+' v='+this.v+' zoom='+this.zoom);
  }
  this.Update = function(host,n,v,x,y,zoom)
  {
    if( this.zoom !=999 && this.zoom != zoom )
      return;
    this.host = host;
    this.n = n;
    this.v = v;
    this.zoom = zoom;
    this.UpdateXY(x,y);
  }
  this.GMLog = function()
  {
    GM_log('host='+this.host+' n='+this.n+' v='+this.v+' zoom='+this.zoom);
  }
  this.GMSetValues = function()
  {
    GM_setValue('host', this.host);
    GM_setValue('n', this.n);
    GM_setValue('v', this.v);
    GM_setValue('zoom', this.zoom);
  };
}

function GoThroughImages(searcher)
{
  var params;
  var r = new RegExp();
  r.compile('(http://mt.*\.google\.com/)mt.n=(.*)&v=(.*)&x=(.*)&y=(.*)&zoom=(.*)');
  var allImages = document.getElementsByTagName('img');
  for (var i = 0; i < allImages.length; i++) {
  	var src = allImages[i].src;
    params = r.exec(src);
    if( params == null )
      continue;
    searcher.Update(params[1],params[2],params[3],params[4],params[5],params[6]);
  }
}

// buttons callbacks
function StoreTopLeft(event)
{
  var searchMin= new Searcher();
  searchMin.x = 10000000;
  searchMin.y = 10000000;
  searchMin.UpdateXY = function(x,y)
  {
    if( x < searchMin.x )
      searchMin.x = x;
    if( y < searchMin.y )
      searchMin.y = y;
  };
  GoThroughImages(searchMin);
  searchMin.GMLog();
  GM_log('minx='+searchMin.x+' miny='+searchMin.y);
  searchMin.GMSetValues();
  GM_setValue('minx', searchMin.x);
  GM_setValue('miny', searchMin.y);
}

function StoreBottomRight(event)
{
  var searchMax = new Searcher();
  searchMax.x = -10000000;
  searchMax.y = -10000000;
  searchMax.UpdateXY = function(x,y)
  {
    if( x > searchMax.x )
      searchMax.x = x;
    if( y > searchMax.y )
      searchMax.y = y;
  };
  GoThroughImages(searchMax);
  searchMax.GMLog();
  GM_log('maxx='+searchMax.x+' maxy='+searchMax.y);
  searchMax.GMSetValues();
  GM_setValue('maxx', searchMax.x);
  GM_setValue('maxy', searchMax.y);
}

function GetMap(event)
{
  var newwindow = window.open();
  var ndoc = newwindow.document;
  ndoc.write('<html><head><title>Google Big Map</title></head><body>');
  var host = GM_getValue('host');
  var n = GM_getValue('n');
  var v = GM_getValue('v');
  var minx = GM_getValue('minx');
  var miny = GM_getValue('miny');
  var maxx = GM_getValue('maxx');
  var maxy = GM_getValue('maxy');
  var zoom = GM_getValue('zoom');
  for(var x=minx; x<=maxx; x++) {
    for(var y=miny; y<=maxy; y++) {
      ndoc.write('<img src="'+host+'mt?n='+n+'&v='+v+'&x='+x+'&y='+y+'&zoom='+zoom+'" style="position: absolute; left: '+(x-minx)*256+'px; top: '+(y-miny)*256+'px;"/><br/>');
    }
  }
  ndoc.write('</body>');
  ndoc.close();
}

// initialize button bar
var paneltabs = document.getElementById('paneltabs');
var theRow = paneltabs.childNodes[0].childNodes[0];
var theCell = theRow.childNodes[theRow.childNodes.length-1];
var buttonBar = document.createElement('span');
buttonBar.innerHTML = '<a href="#"><img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%08tEXtComment%00%F6%CC%96%BF%00%00%00*IDAT(%CFc%D4s%D9%CC%40%08%5C%DC%ED%03g31%90%08h%AF%81%05%97%5B%07%CEI%23R%03%E3%FF%FF%FF%87%BA%1F%00%7D%CA%07%F3%CA%05)%94%00%00%00%00IEND%AEB%60%82"/></a><a href="#"><img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%08tEXtComment%00%F6%CC%96%BF%00%00%00%2BIDAT(%CFc%D4s%D9%CC%40%0A%60b%20%11%D0%5E%03%0B2%E7%E2n%1F%AC%8A%F4%5D%B7%0Cf%3F%0C%07%0D%8C%C3%20-%01%002%CF%05k%84%82%07%05%00%00%00%00IEND%AEB%60%82"/></a><a href="#"><img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%08tEXtComment%00%F6%CC%96%BF%00%00%00(IDAT(%CFc%FC%FF%FF%3F%03)%80%89%81D%40%7B%0D%2C%C4(%D2w%DD2%98%FD0%1C4%B0%E0%0A%EF!%E4%07%00%A9%10%05q%EB%3D%C8%13%00%00%00%00IEND%AEB%60%82"/></a>';
theCell.appendChild(buttonBar);
buttonBar.style.marginLeft = '10px';

// attach callbacks
var topLeftLink = buttonBar.childNodes[0];
topLeftLink.addEventListener('click', StoreTopLeft, true );
var mapLink = buttonBar.childNodes[1];
mapLink.addEventListener('click', GetMap, true );
var bottomRightLink = buttonBar.childNodes[2];
bottomRightLink.addEventListener('click', StoreBottomRight, true );
