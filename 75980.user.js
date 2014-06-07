// ==UserScript==
// @name           gwOutMinimap
// @namespace      http://userscripts.org/users/krychek
// @include        http://quest.ganjawars.ru/walk.php*
// @author         Alex Krychek
// ==/UserScript==

(function() {
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow:window;

if (root.location.href.indexOf('http://quest.ganjawars.ru') >= 0) {
//  var Sectors = new Array('', '', 'Nou Lake', 'Shoretale', '', '', 'Sector SA98', 'Ejection Point', 'Dangerous Xith', 'Second Path', '', '', 'Raged Land', 'Spherix Point', 'Eye of Glory', 'Chelby', 'Tiger Lairs', 'South Tibet', '', '', 'Thordendal', 'Tracid Line', 'Hypercube', '', '', '', 'Por Eso One', 'Freestates', 'World\'s Corner', '');
  var Sectors = new Array('', '', 'Nou Lake', 'Shoretale', '', '', 'Sector SA98', 'Ejection Point', 'Dangerous Xith', 'Second Path', '', '', 'Raged Land', 'Spherix Point', 'Eye of Glory', 'Chelby', 'Tiger Lairs', 'South Tibet', '', '', 'Thordendal', 'Tracid Line', 'Hypercube', '', '', '', 'Por Eso One', 'Freestates', 'World\'s Corner', '');
// /^Nou Lake$/i
  var sectorX, sectorY;
  var sectorName = root.document.getElementsByTagName('table')[0].getElementsByTagName('b')[0].innerHTML;
  var gpsCoord = root.document.getElementsByTagName('table')[0].getElementsByTagName('b')[2].getElementsByTagName('font')[0].innerHTML.split(',');
  var sectorSize = 52; // 98
  var coordCor = 0.53;

  var divOMap = root.document.createElement('div');
  var divSMap = root.document.createElement('div');
  var divOPos = root.document.createElement('div');
  var divSPos = root.document.createElement('div');
  var imgOMap = root.document.createElement('img');
  var imgSMap = root.document.createElement('img');

//  divMap.setAttribute('id','minimap');
//  with(divMap.style) { position = 'absolute'; left = 580; top = 20; }
  with(divOMap.style) { position = 'absolute'; left = 585; top = 230; }

  with(divSMap.style) { position = 'absolute'; left = 0; top = 0; }

//http://i.ganjafoto.ru/1/50/5/1500523.jpg
  imgOMap.setAttribute('src','http://i.ganjafoto.ru/1/50/5/1500525.jpg');
  imgOMap.style.opacity = 0.8;
  imgOMap.border = 1;

  imgSMap.setAttribute('src','http://i.ganjafoto.ru/1/50/9/1500903.jpg');
  imgSMap.style.opacity = 0.6;
  imgSMap.border = 1;

//  divOPos.setAttribute('id','mPos');
  with(divOPos.style) {
    position = 'absolute';
    left = 0; top = 0;
    width = 8; height = 8;
    border = 'solid 2px lightgreen';
//    background = 'green';
  }

  with(divSPos.style) {
    position = 'absolute';
    left = 0; top = 0;
    width = 3; height = 3;
    border = 'solid 1px yellow';
    background = 'red';
  }


  for(var i=0; i<Sectors.length; i++)
    if(sectorName == Sectors[i]) break;
  if(i<Sectors.length) {
    sectorX = Math.floor(i/6) + 1; sectorY = i%6 + 1;
    with(divOPos.style) {
      left = sectorX*sectorSize + gpsCoord[0]*coordCor - 5;
      top = sectorY*sectorSize + gpsCoord[1]*coordCor - 5;
    }
    divOMap.appendChild(imgOMap);
    divOMap.appendChild(divOPos);

    with(divSPos.style) {
      left = gpsCoord[0] - 1;
      top = gpsCoord[1] - 1;
    }
    divOMap.appendChild(divSMap);
    divSMap.appendChild(imgSMap);
    divSMap.appendChild(divSPos);
  } else {
    divOMap.appendChild(root.document.createTextNode('Error! Sector is not identified. Map is N/A.'));
  }

  root.document.body.appendChild(divOMap);
}

}
)();