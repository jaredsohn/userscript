// ==UserScript==

// @name           verkeerscentrum.be

// @namespace      verkeerscentrum

// @description    1234 als de kaart geladen is, wordt enkel de kaart getoond, zonder menus, handig voor in de auto

// @include        http://www.verkeerscentrum.be/verkeersinfo/kaart*

// ==/UserScript==



  var req = new XMLHttpRequest();

  var now = new Date;



  if (now.getHours() < 12) {

    req.open('GET', "http://www.verkeerscentrum.be/verkeersinfo/reistijden/binnenring", false);   

  }

  else {

    req.open('GET', "http://www.verkeerscentrum.be/verkeersinfo/reistijden/buitenring", false);

  }

  req.send(null);



  var camera_req = new XMLHttpRequest();

  camera_req.open('GET', "http://www.verkeerscentrum.be/verkeersinfo/camerabeelden/brussel", false);

  camera_req.send(null)

 

  var brussel_req = new XMLHttpRequest();

  brussel_req.open('GET', "http://www.verkeerscentrum.be/verkeersinfo/reistijden/R0", false);

  brussel_req.send(null)

 
  var e313_req = new XMLHttpRequest();

  e313_req.open('GET', "http://www.verkeerscentrum.be/verkeersinfo/reistijden/E313", false);

  e313_req.send(null)

 

  var element = document.createElement('div');

  var divIdName = 'mydiv';

  element.setAttribute('id',divIdName);

  element.innerHTML = req.responseText;

  element.style.display='none';

  var innerTable = element.getElementsByTagName('table')[11];



  var brussel_reistijden = document.createElement('div');

  var divIdNameBrussel = 'mydiv';

  brussel_reistijden.setAttribute('id',divIdNameBrussel);

  brussel_reistijden.innerHTML = brussel_req.responseText;

  brussel_reistijden.style.display='none';

  var innerTableBrussel = brussel_reistijden.getElementsByTagName('table')[11];

 
  var e313_reistijden = document.createElement('div');
  var divIdNameE313 = 'mydiv';
  e313_reistijden.setAttribute('id',divIdNameE313);
  e313_reistijden.innerHTML = e313_req.responseText;
  e313_reistijden.style.display='none';
  
  var innerTableE313 = e313_reistijden.getElementsByTagName('table')[11];



  var camera = document.createElement('div');

  var divIdNamecamera = 'mydivcamera';

  camera.setAttribute('id',divIdNamecamera);

  camera.innerHTML = camera_req.responseText;

  camera.style.display='none';

  var innerTablecamera = camera.getElementsByTagName('table')[23];

  var innerinnerTablecamera = innerTablecamera.getElementsByTagName('img')[0];

  var innerTablecamera2 = camera.getElementsByTagName('table')[16];

  var innerinnerTablecamera2 = innerTablecamera2.getElementsByTagName('img')[0];

  var innerTablecamera3 = camera.getElementsByTagName('table')[15];

  var innerinnerTablecamera3 = innerTablecamera3.getElementsByTagName('img')[0];



 

 

 

 var elm=document.getElementsByTagName('table')[7];

 var elm2=document.getElementsByTagName('table')[0];

 

 document.body.insertBefore(elm, document.body.firstchild);

 elm2.style.display='none';



var alltTds, thisTD;

allTds = document.evaluate(

    "//*",

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);

   

for (var i = 0; i < allTds.snapshotLength; i++) {

    thisTD = allTds.snapshotItem(i);

    // do something with thisDiv

    thisTD.style.color = "#FFFFFF";

    //thisTD.style.font-style='bold';

}



 document.body.insertBefore(innerTable, document.body.firstchild);

 document.body.insertBefore(innerTableBrussel, document.body.firstchild);
 
 document.body.insertBefore(innerTableE313, document.body.firstchild);

 if (now.getHours() >= 12) {

   document.body.insertBefore(innerinnerTablecamera, document.body.firstchild);

   document.body.insertBefore(innerinnerTablecamera2, document.body.firstchild);

   document.body.insertBefore(innerinnerTablecamera3, document.body.firstchild);

 }

 document.body.style.background = "#000000";