// ==UserScript==
// @name          Gizmonic Institute's Lab Assistant (for SP)
// @description	  Calculate Research Numbers
// @include       *.starpirates.*
// @exclude       *.starpirates.*/forums/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
var apt_res_total = 0;
var apt_res_current = 0;
var apt_ene_total = 0;
var apt_ene_current = 0;
var apt_cur_min = 0;
var apt_cur_max = 0;
var apt_ful_min = 0;
var apt_ful_max = 0;
var apt_res_rechargeTime = 0;
var apt_res_researchPerHour = 0;
var apt_not_flag = false;

function apt_res_create_box() {
	researchDiv = document.createElement('div');
	
	apt_res_get_research();
	apt_res_get_energy();
	apt_not_flag = apt_res_isNotorious();
	
	apt_cur_min = (apt_ene_current * apt_res_current)/2000;
	apt_cur_max = (apt_ene_current * apt_res_current)/900;
	apt_ful_min = (apt_ene_total * apt_res_total)/2000;
	apt_ful_max = (apt_ene_total * apt_res_total)/900;
	
	if(apt_not_flag)
		mult = 1.5;
	else 
		mult = 1;
	
	apt_res_rechargeTime = (apt_res_total - apt_res_current) / mult;
	apt_res_researchPerHour = ((apt_ful_min + apt_ful_max)/2) / ((apt_ene_total*2)/mult) * 60;
	
	researchDiv.appendChild(document.createTextNode('Current Levels:'));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createTextNode('Min: '+apt_cur_min.toFixed(2)+' Max:'+apt_cur_max.toFixed(2)));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createTextNode('Max Levels:'));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createTextNode(' Min: '+apt_ful_min.toFixed(2)+' Max: '+apt_ful_max.toFixed(2)));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createTextNode('Recharge Time (Minutes): '+apt_res_rechargeTime.toFixed(2)));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createTextNode('Avg. Research Per Hour: '));
	researchDiv.appendChild(document.createElement('br'));
	researchDiv.appendChild(document.createTextNode(apt_res_researchPerHour.toFixed(2)));

	
	//researchDivContents = document.createTextNode(researchContent);
	//researchDiv.appendChild(researchDivContents);
	researchDiv.style.cssText = 'position: absolute; top: 2px; right: 0px; z-index: 0; background: transparent url(images/stats_bg3.gif); padding: 23px 3px 3px 15px; color: #FFFFFF; width: 146px; height: 150px; font-size: 10px; margin: 0px;';
	if(document.getElementById('datenow')) 
		document.getElementById('datenow').appendChild(researchDiv);
}

function apt_res_get_research() {
	aTags = document.getElementsByTagName('a');
	for(var i = 0; i < aTags.length; i++) {
		if(aTags[i].getAttribute("href") == 'research.php') {
			aDivs = aTags[i].getElementsByTagName('div');
			research = aDivs[0].getAttribute("title");
			if(research != null) {
				apt_res_current = parseInt(research);
				apt_res_total = research.substring(research.indexOf('/')+1,research.length);
				//alert(apt_res_current);
				//alert(apt_res_total);
				return true;
			}
		}
		
	}
	return false;
}

function apt_res_get_energy() {
	aTags = document.getElementsByTagName('a');
	for(var i = 0; i < aTags.length; i++) {
		if(aTags[i].innerHTML.substring(0,12) == '&nbsp;Energy') {
			aDivs = aTags[i].getElementsByTagName('div');
			energy = aDivs[0].getAttribute("title");
			if(energy != null) {
				apt_ene_current = parseInt(energy);
				apt_ene_total = energy.substring(energy.indexOf('/')+1,energy.length);
				return true;
			}
		}
		
	}
	return false;
}



function apt_res_isNotorious() {
	aTags = document.getElementsByTagName('a');
	for(var i = 0; i < aTags.length; i++) {
		if(aTags[i].getAttribute("href").substring(0,15) == 'profiles.php?id' && aTags[i].getAttribute("class") == 'textstatsbox') {
			notor = aTags[i].innerHTML;
			number = notor.substring(notor.indexOf('(')+1,notor.indexOf(')'));
			//alert(number);
			if(number > 0) {
				return true;
			}
		}
		
	}
	return false;
}

apt_res_create_box();
				/* 
				alert(apt_res_current);
				alert(apt_res_total);
				
				alert(apt_ene_current);
				alert(apt_ene_total);
				*/