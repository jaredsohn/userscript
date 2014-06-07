// ==UserScript==
// @name           CheatHobowars
// @namespace      http://localhost
// @description    Everything is now automatic :)
// @author         HoboBobo
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php* 
// @exclude
// ==/UserScript==



var  contents = document.getElementById("contents");
var contenidos1 = document.getElementsByTagName("a")[18];
var forms = document.getElementsByTagName('form')[1];
var link;


if(contents){
	if(contents.textContent.match('.*(Routine Check).*')){
		link = contents.getElementsByTagName("a")[0].href;
		setTimeout(Clicker,500);
		
	}

	if(contents.textContent.match('.*(You walk around the corner to your local).*')){
		
		if(confirm("AutoBeg?") ){
			AutoBeg=1;
			
		}
		if(confirm("AutoHeal?") ){
			AutoHeal=1;
			
		}

		





if(contenidos1){

	

	if(contenidos1.textContent.match('.*(I think I will beg for another 30 minutes|Beg for some cash).*')){
	
		link = document.getElementsByTagName("a")[18].href;
		location.href = link+'&click=16';
		//rannum = Math.random()*10000;
		//setTimeout(clicker,120000+rannum);
	}
	if(contenidos1.textContent.match('.*(Back).*')){
	
		link = document.getElementsByTagName("a")[10].href;
		location.href = link;
		//rannum = Math.random()*10000;
		//setTimeout(clicker,2280000+rannum);
	}
	
if(contenidos1.textContent.match('.*(I need a good healing, heal me to full health).*')){
	
		link = document.getElementsByTagName("a")[18].href;
		location.href = link;
		//rannum = Math.random()*10000;
		//setTimeout(clicker,120000+rannum);
	}

if(contenidos1.textContent.match('.*(Let my gang cover part of the cost).*')){
	
		link = document.getElementsByTagName("a")[18].href;
		location.href = link;
		//rannum = Math.random()*10000;
		//setTimeout(clicker,120000+rannum);
	}
	if(contenidos1.textContent.match('.*(Lets hope|Hey).*')){
	
		link = document.getElementsByTagName("a")[17].href;
		location.href = link;
		//rannum = Math.random()*10000;
		//setTimeout(clicker,120000+rannum);
	}

	if(contenidos1.textContent.match('.*(1).*')){
	
		link = document.getElementsByTagName("a")[18].href;
		location.href = link;
		
	}
	
}



function clicker(){
	

location.href = link;
