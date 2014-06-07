// ==UserScript==
// @name           Image Alert
// @namespace      http://userscripts.org/users/75950
// @description    Alerts For Images
// @include        http://pokefarm.org/*
// ==/UserScript==
// list of images
var theImages = document.getElementsByTagName('img');

var theList = ['http://static.pokefarm.org/_img/eggs/023a.png', 'http://static.pokefarm.org/_img/eggs/029m.png', 'http://static.pokefarm.org/_img/eggs/032f.png', 'http://static.pokefarm.org/_img/eggs/108s.png', 'http://static.pokefarm.org/_img/eggs/120c.png', 'http://static.pokefarm.org/_img/eggs/147m.png', 'http://static.pokefarm.org/_img/eggs/150a.png', 'http://static.pokefarm.org/_img/eggs/172f.png', 'http://static.pokefarm.org/_img/eggs/172s.png', 'http://static.pokefarm.org/_img/eggs/173s.png', 'http://static.pokefarm.org/_img/eggs/174a.png', 'http://static.pokefarm.org/_img/eggs/177e.png', 'http://static.pokefarm.org/_img/eggs/190a.png', 'http://static.pokefarm.org/_img/eggs/218b.png', 'http://static.pokefarm.org/_img/eggs/228i.png', 'http://static.pokefarm.org/_img/eggs/249x.png', 'http://static.pokefarm.org/_img/eggs/251a.png', 'http://static.pokefarm.org/_img/eggs/255l.png', 'http://static.pokefarm.org/_img/eggs/387s2.png', 'http://static.pokefarm.org/_img/eggs/387s3.png', 'http://static.pokefarm.org/_img/eggs/387s4.png', 'http://static.pokefarm.org/_img/eggs/387s1.png', 'http://static.pokefarm.org/_img/eggs/427e.png', 'http://static.pokefarm.org/_img/eggs/427m.png', 'http://static.pokefarm.org/_img/eggs/431t.png', 
'http://static.pokefarm.org/_img/eggs/132.png',
'http://static.pokefarm.org/_img/eggs/239.png',
'http://static.pokefarm.org/_img/eggs/207v.png',
'http://static.pokefarm.org/_img/eggs/489.png',
'http://static.pokefarm.org/_img/eggs/479.png',
'http://static.pokefarm.org/_img/eggs/440.png',
'http://static.pokefarm.org/_img/eggs/427m.png',
'http://static.pokefarm.org/_img/eggs/138.png',
'http://static.pokefarm.org/_img/eggs/439.png',
];

for(i=0; i<theImages.length; i++) {
   for(j=0; j<theList.length; j++) {
      if(theImages[i].src==theList[j]) alert(theList[j]+' found on this page');
   }
}