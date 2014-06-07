// ==UserScript==
// @name       Earth Day Forever
// @namespace  http://www.example.com/
// @version    0.9
// @description  enter something useful
// @match      http://www.youtube.com/watch?v=*
//@match      	http://youtube.com/watch?v=*
// @copyright  2012+, Larry Stanfield
// ==/UserScript==



var lighton = "http://s15.postimage.org/3jtucf1bb/You_Tube_Switch_L.jpg"; //-Light switch L
var lightoff = "http://s15.postimage.org/nd1crdpbb/You_Tube_Switch_D.jpg"; //-Light switch D

//var lighton = "C:\Users\Workhorse\Pictures\Web_Graphics\YouTube-Switch_L.jpg"; //-Light switch L
//var lightoff = "C:\Users\Workhorse\Pictures\Web_Graphics\YouTube-Switch_D.jpg"; //-Light switch D
var flag = 1;

var title = document.getElementById('watch-headline');
var imgtag = document.createElement('img');
var link = document.createElement('a');
link.setAttribute('href', '#');
var idArray = ['masthead-container', 'watch-headline-container', 'watch-main-container', 'footer-container'];



function lightsOn(x){
if (x === 1){
link.addEventListener('click', function () {
toogle(0); }
);
imgtag.setAttribute('alt', 'Clap On!');
imgtag.setAttribute('src', lighton);
link.appendChild(imgtag);
title.appendChild(link);
document.body.style.background = '#e3e3e3';
	for (var j = 0; j < idArray.length; j ++){
	document.getElementById(idArray[j]).style.background = '#e3e3e3';
	document.getElementById( 'watch-video-container').style.background = '#4d4d4d';
		}
	}
}
	
function lightsOff(x){
if (x === 0){
link.addEventListener('click', function () {
toogle(1); }
);
imgtag.setAttribute('alt', 'Clap Off!');
imgtag.setAttribute('src', lightoff);
link.appendChild(imgtag);
title.appendChild(link);
document.body.style.background = '#000000';
	for (var j = 0; j < idArray.length; j ++){
	document.getElementById(idArray[j]).style.background = '#000000';
	document.getElementById( 'watch-video-container').style.background = '#000000';
		}
		}

	}
	
function toogle(z){
               if(z === 1){
               
               flag = z;
               lightsOn(flag);
                  }
               
               if(z === 0){
               
               flag = z;
               lightsOff(flag);
                  }
}
               
			   
			  
              document.body.addEventListener('load', lightsOn(flag));