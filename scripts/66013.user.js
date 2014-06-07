// ==UserScript==
// @name           FFS - Additional Features
// @namespace      ffs_af
// @description    A script to add some changes to the game Friends For Sale! for Facebook
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @include        http://apps.new.facebook.com/friendsforsale/users/show/*
// @exclude        http://*channel*.facebook.com*
// @exclude        http://*ak.fbcdn.net*
// @version        Jan 9th 2010
// @author         http://apps.facebook.com/friendsforsale/users/show/81906595
// ==/UserScript==
var arr = new Array();
function hideShow(c){
  if(arr[c][2]==1){
    arr[c][0].setAttribute('style','display:none;');
    arr[c][1].innerHTML = " <b>Hide</b> / Show ";
    arr[c][1].setAttribute('style','cursor:pointer;background-color:white;float:right;border:red 5px outset;');
    arr[c][2] = 0;
  }else if(arr[c][2]==0){
    arr[c][0].setAttribute('style','display:;');
    arr[c][1].innerHTML = " Hide / <b>Show</b> ";
    arr[c][1].setAttribute('style','cursor:pointer;background-color:white;float:right;border:red 5px inset;');
    arr[c][2] = 1;
  }
}

// Get Elements + Set Buttons
am = document.getElementById('app7019261521_description_container');
al = document.getElementById('app7019261521_achievement-list');
gl = document.getElementById('app7019261521_gift-list');
mf = document.getElementById('app7019261521_user-minifeed');
pl = document.getElementById('app7019261521_pet-list');
co = document.getElementById('app7019261521_comments');
hsBtn = document.createElement('div');
hsBtn.className = "hideshow";
if(am){
  amh = am.parentNode.parentNode.getElementsByClassName('headline')[0];
  amhsBtn = hsBtn.cloneNode(true);
  amhsBtn.addEventListener("click",function(){hideShow("am")},false);
  amh.appendChild(amhsBtn);
  arr["am"] = new Array();arr["am"][0] = am;arr["am"][1] = amh.getElementsByClassName("hideshow")[0];arr["am"][2] = 1;
  hideShow("am");
}
if(al){
  alh = al.parentNode.getElementsByClassName('headline')[0];
  alhsBtn = hsBtn.cloneNode(true);
  alhsBtn.addEventListener("click",function(){hideShow("al")},false);
  alh.appendChild(alhsBtn);
  arr["al"] = new Array();arr["al"][0] = al;arr["al"][1] = alh.getElementsByClassName("hideshow")[0];arr["al"][2] = 1;
  hideShow("al");
}
if(gl){
  glh = gl.parentNode.getElementsByClassName('headline')[0];
  glhsBtn = hsBtn.cloneNode(true);
  glhsBtn.addEventListener("click",function(){hideShow("gl")},false);
  glh.appendChild(glhsBtn);
  arr["gl"] = new Array();arr["gl"][0] = gl;arr["gl"][1] = glh.getElementsByClassName("hideshow")[0];arr["gl"][2] = 1;
  hideShow("gl");
}
if(mf){
  mfh = mf.parentNode.getElementsByClassName('headline')[0];
  mfhsBtn = hsBtn.cloneNode(true);
  mfhsBtn.addEventListener("click",function(){hideShow("mf")},false);
  mfh.appendChild(mfhsBtn);
  arr["mf"] = new Array();arr["mf"][0] = mf;arr["mf"][1] = mfh.getElementsByClassName("hideshow")[0];arr["mf"][2] = 1;
  hideShow("mf");
}
if(pl){
  plh = pl.parentNode.getElementsByTagName('h2')[0];
  plhsBtn = hsBtn.cloneNode(true);
  plhsBtn.addEventListener("click",function(){hideShow("pl")},false);
  //plh.appendChild(plhsBtn);
  pl.parentNode.insertBefore(plhsBtn,plh);
  arr["pl"] = new Array();arr["pl"][0] = pl;arr["pl"][1] = pl.parentNode.getElementsByClassName("hideshow")[0];arr["pl"][2] = 1;
  hideShow("pl");
}
if(co){
  coh = co.parentNode.getElementsByClassName('headline')[0];
  cohsBtn = hsBtn.cloneNode(true);
  cohsBtn.addEventListener("click",function(){hideShow("co")},false);
  coh.appendChild(cohsBtn);
  arr["co"] = new Array();arr["co"][0] = co;arr["co"][1] = coh.getElementsByClassName("hideshow")[0];arr["co"][2] = 1;
  hideShow("co");
}
delete hsBtn;