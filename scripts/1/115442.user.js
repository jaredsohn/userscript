// ==UserScript==
	// @name		Ninjamanager Experience
	// @description	        This script increases the playing experience at Ninjamanager.com 
	// @version		1.1.0
	// @date		  13-10-2011	        
	// @author		Addo Vapa
	// @include		http://*.ninjamanager.com/*
	// @include		http://www.ninjamanager.com/*
  // @require   http://s1.nmimg.com/js/jq.min.js  
// ==/UserScript==
drawChallengeKunai();

var teamId;

function drawChallengeKunai() {
	var container = document.getElementById('teamdata');
	var challengeKunai = document.createElement('img');
	challengeKunai.src = 'http://icons.iconarchive.com/icons/zakar/japanicons/128/Kunai-icon.png';
	challengeKunai.style.width = '32px';
	challengeKunai.style.margin = '-16px 450px';
	challengeKunai.addEventListener('click', sendChallenge, false);
	container.appendChild(challengeKunai);
}

function sendChallenge()	{
	var url = window.location.href;
	var nohttp = url.split('//')[1];
	teamId = nohttp.split('/')[2];
	location.replace('javascript:challenge('+teamId+')');