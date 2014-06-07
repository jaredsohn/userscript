// ==UserScript==
// @name           Simple Culture Watch
// @namespace      se.tapirboy.travian
// @description    Shows how much culture points your building is generating.
// @include        http://*.travian.*/build*
// @require	   http://sizzlemctwizzle.com/updater.php?id=105359
// @author         Tapirboy
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        1.1.2
// ==/UserScript==

(function culturewatch(){

    function $id(id){
      return (id !=''? document.getElementById(id): null);
    };
    function $class(aName){
      return (aName != '' ? document.getElementsByClassName(aName): null);
    };
    function $tag(aTag){
      return (aTag != ''? document.getElementsByTagName(aTag): null);
    };

    // ignore sub pages for palace, residence and marketplace
    if(( $id("build").className.match(/25/) || $id("build").className.match(/26/) || $id("build").className.match(/17/) ) && window.location.href.match(/[s,t]=\d/)){
        return;
    }
		
  // culture rates
  var cp_rates = new Array();
  cp_rates[0] = new Array(1,1,2,2,2,3,4,4,5,6,7,9,11,13,15,18,22,27,32,38);
  cp_rates[1] = new Array(2,3,3,4,5,6,7,9,10,12,15,18,21,26,31,37,44,53,64,77);
  cp_rates[2] = new Array(4,4,5,6,7,9,11,13,15,19,22,27,32,39,46,55,67,80,96,115);
  cp_rates[3] = new Array(5,6,7,8,10,12,14,17,21,25,30,36,43,51,62,74,89,106,128,153);
  cp_rates[4] = new Array(6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192);
  cp_rates[5] = new Array(7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230);
		
  var building_cp = new Array(0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,2,3,0,1,2,3,0,4,1,4,5,2,0,1,0,0,0,0,3,0,0,-1,2);

  // culture to found new villages
  //var t3 = new Array(0,2000,8000,20000,39000,65000,99000,141000,191000,251000);
  //var t3s = new Array(0,500,2600,6700,12900,21600,32900,46900,63700,83500,106400,132500,161900);

  var b_id = $id('build').className.split('gid')[1];
  var b_lvl = $id('build').getElementsByTagName('h1')[0].innerHTML.match(/\d+/);
  // ignore lvl 0 fields and new constructions
  if (!b_lvl || b_lvl==0 || b_id == 0) {
    return;
  }
  var cp = cp_rates[building_cp[b_id-1]][b_lvl-1];
  var e = document.createElement('p');
  e.innerHTML = '<img class="unit u30" alt="Culture Points" title="Culture Points" src="img/x.gif"> ' + cp;
  $id('build').insertBefore(e,$class('build_desc')[0]);	
})();