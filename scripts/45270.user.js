// ==UserScript==
// @name                WestStats job_finder enhelper
// @version             1
// @namespace           GV
// @author              Vakis P.
// @description         Best Job Finder Option Sellector
// @include		http://*.weststats.com/Job_items/*
// @include		http://weststats.com/Job_items/*
// ==/UserScript==

var ParentN=document.getElementsByName('level')[0].parentNode;
var createT=document.createElement('input');
createT.id='TheNam';
createT.type='text';
createT.size=9;

var createB=document.createElement('input');
createB.value='FindIt...';
createB.type='button';
createB.addEventListener('click', function(){doit();},false);

window.onload=loadInfo();

function loadInfo()
{
ParentN.appendChild(createT);
ParentN.appendChild(createB);
}

function doit(){
var text=document.getElementById('TheNam').value;
var vali=false;
if (text){
  var patt=new RegExp(text, "i");
  var jobs=document.getElementsByName('job')[1];
  for (var i=jobs.selectedIndex+1;i<jobs.length;i++){
    if (patt.test(jobs[i].text)==true){
      jobs[i].selected=true;
      vali=true;
      jobs.style.color='blue';
      break;
    }
  }
}
if (!vali){
jobs[0].selected=true;
jobs.style.color='red';
}
}