// ==UserScript==
// @name        Atvērt visus kursus
// @namespace   chaosdragon.org
// @include     https://ortus.rtu.lv/*
// @version     1.1
// @grant metadata
// ==/UserScript==

const IETVARS = 'moodle-courses';
a=[];

function open_in_new_tab(url)
{
  window.open(url, '_blank');
  window.focus();
}

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function atversana(event)
{   	
	t = event.target.id;
	
    for(i in a[t])
    {
		
       if (String(a[t][i]).indexOf("course")!=-1)	   
	   {
			open_in_new_tab(a[t][i]);
			alert("Spied OK!");
       }   
    } 
}

var m=document.getElementsByClassName(IETVARS);
mm=m[0].getElementsByTagName('div');
k=0;

for (i=0; i<mm.length; i++)
{
	if (mm[i].id.substring(0,5) == 'Pluto') {
		mm[i].style.display='block';
		mm[i].innerHTML=mm[i].innerHTML+'<br/><input type="button" id="'+k+'" value="Atvērt visus">';
		a[k]=mm[i].getElementsByTagName('a');		
		document.getElementById(k).onclick=function(event){atversana(event)};
		k++;
		}
}