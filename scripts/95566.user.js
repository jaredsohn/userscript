// ==UserScript==
// @name           SamuraiMMORPG commander
// @namespace      http://www.samuraimmorpg.com/game6
// @include        http://www.samuraimmorpg.com/game6/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var version = 'v0.7.2';

function Inn1(){ window.location.href = 'http://www.samuraimmorpg.com/game6/inn.php?n=2&a=rest&v=3'; }
function Inn2(){ window.location.href = 'http://www.samuraimmorpg.com/game6/inn.php?n=2&a=rest&v=2'; }
function Inn3(){ window.location.href = 'http://www.samuraimmorpg.com/game6/inn.php?n=2&a=rest&v=1'; }

function Al1() { window.location.href = 'http://www.samuraimmorpg.com/game6/arena.php?a=fight&o=1&m=0'; }
function Al2() { window.location.href = 'http://www.samuraimmorpg.com/game6/arena.php?a=fight&o=1&m=1'; }
function Ar1() { window.location.href = 'http://www.samuraimmorpg.com/game6/arena.php?a=fight&o=2&m=0'; }
function Ar2() { window.location.href = 'http://www.samuraimmorpg.com/game6/arena.php?a=fight&o=2&m=1'; }

function aMis1(){ window.location.href = 'http://www.samuraimmorpg.com/game6/missions.php?a=mission&v=1&r=1'; }
function aMis2(){ window.location.href = 'http://www.samuraimmorpg.com/game6/missions.php?a=mission&v=2&r=1'; }
function bMis1(){ window.location.href = 'http://www.samuraimmorpg.com/game6/missions.php?a=mission&v=1&r=2'; }
function bMis2(){ window.location.href = 'http://www.samuraimmorpg.com/game6/missions.php?a=mission&v=2&r=2'; }
function cMis1(){ window.location.href = 'http://www.samuraimmorpg.com/game6/missions.php?a=mission&v=1&r=3'; }
function cMis2(){ window.location.href = 'http://www.samuraimmorpg.com/game6/missions.php?a=mission&v=2&r=3'; }

function Bath(){ window.location.href = 'http://www.samuraimmorpg.com/game6/inn.php?n=9&a=bath&v=1'; }

function Vote1(){ GM_openInTab("http://www.samuraimmorpg.com/game6/votecount.php?s=1"); }
function Vote2(){ GM_openInTab("http://www.samuraimmorpg.com/game6/votecount.php?s=2"); }
function Vote3(){ GM_openInTab("http://www.samuraimmorpg.com/game6/votecount.php?s=3"); }
function Vote4(){ GM_openInTab("http://www.samuraimmorpg.com/game6/votecount.php?s=4"); }

function Train1() { window.location.href = 'http://www.samuraimmorpg.com/game6/dojo.php?a=train&type=1'; }
function Train2() { window.location.href = 'http://www.samuraimmorpg.com/game6/dojo.php?a=train&type=2'; }
function Train3() { window.location.href = 'http://www.samuraimmorpg.com/game6/dojo.php?a=train&type=3'; }
function Train4() { window.location.href = 'http://www.samuraimmorpg.com/game6/dojo.php?a=train&type=4'; }
function Train5() { window.location.href = 'http://www.samuraimmorpg.com/game6/dojo.php?a=train&type=5'; }
function Train6() { window.location.href = 'http://www.samuraimmorpg.com/game6/dojo.php?a=train&type=10'; }

function drawTheHud(){
  var nav = document.createElement("div");
  nav.innerHTML = '<style type="text/css">' +
  ' .commander { width: 90px; position: absolute; margin: 0 auto; right: 0; top: 0px; height: 430px;' +
  '              background-color: black; padding: 10 20px; color: white; z-index: 100; } ' +
  ' .commander a { text-decoration: none; background: white; padding: 2px 6px; color: black; }' +  
  ' .commander p { color: white; margin: 15px 0 5px 0; }' +
  ' .commander .bl { color: #0066CC; }' +
  ' .commander .gr { color: #33CC00; }' +
  ' .commander .rd { color: #FF0000; }' +
  '</style> ' +
  '<div class="commander">' +
  '<p style="margin-top: 0;">KSC ' + version + '</p>' +
  '<a id="k_do_bath" href="#">BATH</a>' +
  '<p id="k_do_inn">INN: (energy)</p>' +
  '<a id="k_do_inn1" href="#">1</a>' +
  '<a id="k_do_inn2" href="#" style="margin-left: 3px;">2</a>' +
  '<a id="k_do_inn3" href="#" style="margin-left: 3px;">3</a>' +
  '<p>MISSIONS: </p>' +
  '<p style="margin-top: 5px;">' +  
  '<a id="k_do_amis1" class="bl" href="#">1</a>' +  
  '<a id="k_do_bmis1" class="gr" href="#" style="margin-left: 3px;">1</a>' +  
  '<a id="k_do_cmis1" class="rd" href="#" style="margin-left: 3px;">1</a></p>' +  
  '<p style="margin-top: 5px;">' +    
  '<a id="k_do_amis2" class="bl" href="#">2</a>' +  
  '<a id="k_do_bmis2" class="gr" href="#" style="margin-left: 3px;">2</a>' +  
  '<a id="k_do_cmis2" class="rd" href="#" style="margin-left: 3px;">2</a></p>' +
  '<p>ARENA: </p>' +
  '<a id="k_do_al1" href="#" class="bl">4</a>' + 
  '<a id="k_do_al2" href="#" class="bl" style="margin-left: 3px;">6</a>' +  
  '<a id="k_do_ar1" href="#" class="gr" style="margin-left: 3px;">4</a>' + 
  '<a id="k_do_ar2" href="#" class="gr" style="margin-left: 3px;">6</a>' +    
  '<p>SHRINE: </p>' +
  '<a id="k_do_vo1" href="#">1</a>' + 
  '<a id="k_do_vo2" href="#" style="margin-left: 3px;">2</a>' +
  '<a id="k_do_vo3" href="#" style="margin-left: 3px;">3</a>' + 
  '<a id="k_do_vo4" href="#" style="margin-left: 3px;">4</a>' + 
  '<p>DOJO: </p>' +
  '<p style="margin-top: 5px;">' +   
  '<a id="k_do_t1" href="#">STR</a>' +   
  '<a id="k_do_t2" href="#" style="margin-left: 3px;">DEX</a></p>' +
  '<p style="margin-top: 5px;">' +   
  '<a id="k_do_t3" href="#">END</a>' + 
  '<a id="k_do_t4" href="#" style="margin-left: 3px;">ACC</a></p>' + 
  '<p style="margin-top: 5px;">' +   
  '<a id="k_do_t5" href="#">SPE</a>' + 
  '<a id="k_do_t6" href="#" style="margin-left: 3px;">HEA</a></p>' +   
  
  '</div>';
  document.body.insertBefore(nav, document.body.firstChild);
}

document.addEventListener('click', function(event) {
  id = event.target.id;
  if      ( id == 'k_do_bath'   ) { Bath();  }
  else if ( id == 'k_do_inn1'   ) { Inn1();  }
  else if ( id == 'k_do_inn2'   ) { Inn2();  }
  else if ( id == 'k_do_inn3'   ) { Inn3();  }
  else if ( id == 'k_do_amis1'  ) { aMis1(); }
  else if ( id == 'k_do_amis2'  ) { aMis2(); }
  else if ( id == 'k_do_bmis1'  ) { bMis1(); }
  else if ( id == 'k_do_bmis2'  ) { bMis2(); }
  else if ( id == 'k_do_cmis1'  ) { cMis1(); }
  else if ( id == 'k_do_cmis2'  ) { cMis2(); }
  else if ( id == 'k_do_al1'    ) { Al1();   }
  else if ( id == 'k_do_al2'    ) { Al2();   }  
  else if ( id == 'k_do_ar1'    ) { Ar1();   }
  else if ( id == 'k_do_ar2'    ) { Ar2();   }
  else if ( id == 'k_do_vo1'    ) { Vote1(); }
  else if ( id == 'k_do_vo2'    ) { Vote2(); }  
  else if ( id == 'k_do_vo3'    ) { Vote3(); }
  else if ( id == 'k_do_vo4'    ) { Vote4(); }
  else if ( id == 'k_do_t1'    ) { Train1(); }
  else if ( id == 'k_do_t2'    ) { Train2(); }  
  else if ( id == 'k_do_t3'    ) { Train3(); }
  else if ( id == 'k_do_t4'    ) { Train4(); }  
  else if ( id == 'k_do_t5'    ) { Train5(); }
  else if ( id == 'k_do_t6'    ) { Train6(); }    
  
}, true);

window.addEventListener("load", function(e) {
  drawTheHud();
}, false);
