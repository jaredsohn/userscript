// ==UserScript==
// @name Custom Avatars
// @match *://www.bungie.net/*
// ==/UserScript==
/**
 * HTML encodes a given string
 *
 * @param {String} s String to encode
 * @returns {String} Encoded string
 */
String.HTMLEncode = function(s){
	return s.toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
};

function AddStyle(s){
  var e = document.createElement("style");
  e.type = "text/css";
  e.innerHTML = s;
  document.head.appendChild(e);
}

var data = [
/*Viltre*/
  [334211, "http://i.imgur.com/U9v8nYN.png"],
/*Catman*/
  [113908, "http://imageshack.us/a/img405/9268/oie1692155vqqyyljy.gif"],
/*Shotty Sniper*/
  [126688, "http://img547.imageshack.us/img547/3592/haruhi2009.jpg"],
/*Vien*/
  [3360554, "http://i.imgur.com/Zj3779X.png"],
/*Koalgon*/
  [532059, "http://i.imgur.com/UCMH2bk.jpg"],
/*Sceptile*/
  [1013865, "http://i.imgur.com/FFZnw7B.png"],
/*WinyPit*/
  [3220084, "http://oi49.tinypic.com/312b8mx.jpg"],
/*Infiltrat0rN7*/
  [454419, "http://i.imgur.com/oONXuin.png"],
/*BlackHeaven*/
  [50650, "http://i.imgur.com/xk4cyQV.jpg"],
/*shupid cumindr*/
  [3874783, "http://i.imgur.com/u5D4sHV.png"],
/*SergeantFlood*/
  [3696270, "http://i.imgur.com/tUsTTyB.png"],
/*SecondClass*/
  [3869346, "http://i.imgur.com/l2YLNEI.png"],
/*Onion*/
  [3742095, "http://img90.imageshack.us/img90/4737/infiniteavatar.png"],
/*Rick Grimes*/
  [3655128, "http://i.imgur.com/K0w8uBD.jpg"],
/*FullMetalMan*/
  [3874793, "http://i.imgur.com/lPipyQ1.jpg"],
/*Garem*/
  [3813917, "http://i.imgur.com/Sw3m0SZ.png"],
/*Divine Thunder14*/
  [219549, "http://i.imgur.com/NAsOI7t.png"],
/*Papa*/
  [652265, "http://imageshack.us/a/img404/680/92757489.png"],
/*TopWargamer*/
  [423038, "http://i.imgur.com/DHfkija.png"],
/*Madmaxepic*/
  [421756, "http://img4.imageshack.us/img4/8780/benderbasicavatar50x50.png"],
/*Forge Fan*/
  [194536, "http://i.imgur.com/gE79WGL.png"],
/*Edmi Wohusee*/
  [3579327, "http://i.imgur.com/YYIsAwX.png"],
/*aBallisticToucan*/
  [2427349, "http://i.imgur.com/OrGelJn.png"],
/*Bandikoot*/
  [141734, "http://imageshack.us/a/img689/8629/cocoatdeskavvie.png"],
/*Zoid*/
  [3235821, "http://i1244.photobucket.com/albums/gg566/Teh_Zoid/noire2_zps1ace0abb.jpg"],
/*Felicia*/
  [2788111, "http://i.imgur.com/qSClmTZ.jpg"],
/*Deus Ex*/
  [3860020, "http://i.imgur.com/rzXNNrM.png"],
/*Arky*/
  [3810488, "http://i.imgur.com/92mXPLg.png"],
/*Sandtrap*/
  [1337184, "http://i.imgur.com/lhORyRN.png"],
/*Death*/
  [470012, "http://i.imgur.com/HHbqrBX.gif"],
/*Dangersly Awkwrd*/
  [657765, "http://i.imgur.com/NHSX9zQ.jpg"],
/*Wolf of Destiny*/
  [1139460, "http://i.imgur.com/iSzpAji.png"],
/*Elegiac*/
  [3740733, "http://i.imgur.com/tRrezTR.jpg"],
/*Adam*/
  [324973, "http://i1121.photobucket.com/albums/l516/Adamcunn/superhans.jpg"],
/*Fridge Gnome*/
  [120625, "http://imageshack.us/a/img832/9417/xspcavatar2.png"],
/*Nightriser*/
  [484169, "http://i.imgur.com/NOO6AS8.png"],
/*Big Boss*/
  [3367840, "http://i.imgur.com/hpkmlB1.png"],
/*SILO 170*/
  [539374, "http://i.imgur.com/IlkOF1V.png"],
/*High Charity*/
  [243950, "http://i.imgur.com/O37eUa8.png"],
/*Duardo*/
  [1774, "http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/My%20Avatars/SS%20Duardo/SSDuardo5-2.gif"],
/*Comm Corsair*/
  [3610152, "http://i.imgur.com/Jf85TaJ.png"],
/*Eternal Spirit*/
  [3718176, "http://i.imgur.com/vcUj2gS.png"],
/*A Stolen Fruit*/
  [2486043, "http://i.imgur.com/bXx2Uyw.gif"],
/*Dazarobbo*/
  [68974, "http://i.imgur.com/Umba0LQ.png"],
/*ABSJellyFish*/
  [848000, "http://i.imgur.com/pAweF9f.png"],
/*Munchie*/
  [2876508, "http://i.imgur.com/9MBXoHm.jpg"],
/*Anonymous User*/
  [779564, "http://i.imgur.com/WtIHrfd.jpg"],
/*Luminaire*/
  [249910, "http://imageshack.us/a/img827/4751/42394621.png"],
/*Barcelona*/
  [3816272, "http://i.imgur.com/AMGcrrr.jpg"],
/*Class*/
  [3864901, "http://i.imgur.com/rpsnAE0.png"]
];
var str = "";

data.forEach(function(v){
  
  str += ".forumPost article .avatar[href$=\"mid=" + String.HTMLEncode(v[0]) + "\"]:before{" +
      "background:url(\"" + String.HTMLEncode(v[1]) + "\");" +
      "background-size:100%;" +
      "border-radius:0px;" +
      "bottom:0;" +
      "box-shadow:0 1px 2px -1px rgba(0, 0, 0, 0.4) inset;" +
      "content:\"\";" +
      "left:0;" +
      "position:absolute;" +
      "right:0;" +
      "top:0;" +
    "}";
  
  str += ".topics article .avatar[href$=\"mid=" + String.HTMLEncode(v[0]) + "\"]:before{" +
      "background:url(\"" + String.HTMLEncode(v[1]) + "\");" +
      "background-size:100%;" +
      "border:none;" +
      "border-radius:0px;" +
      "bottom:0;" +
      "box-shadow:0 1px 2px -1px rgba(0, 0, 0, 0.4) inset;" +
      "content:\"\";" +
      "left:0;" +
      "position:absolute;" +
      "right:0;" +
      "top:0;" +
    "}";

});

AddStyle(str);