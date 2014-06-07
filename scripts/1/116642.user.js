// ==UserScript==
// @name            astas
// @version         0.0001
// @match           http://www.erepublik.com/en/newspaper/*
// @match           http://www.erepublik.com/en/citizen/profile/*
// @include         http://www.erepublik.com/en/newspaper/*
// @include         http://www.erepublik.com/en/citizen/profile/*
// ==/UserScript==
var MMHelperInsert = function($, window, undefined) {
	var vers = '0.0001';
	// flag = the length of mmList
	var flag = 2;
	var mmList = {
		1:000000,    //nickbulamayanadam:http://www.erepublik.com/en/newspaper/263268/1
		2:111111,    //bigslar:http://www.erepublik.com/en/newspaper/248581/1
		};
	var inti = 0;
	var time = 500;
	var running = false;
	var c_token = flc.getVariable("token");
	var LastSubNum = "LastSubNum" + flc.getVariable("citizen_id");
	var lastNum = localStorage.getItem(LastSubNum);
	if (lastNum == null) {lastNum = 0;};
	$(document).ready ( function (){
       // Script Insert
        var script = document.createElement('script');
        script.textContent = '(' + MMHelperInsert + ')(jQuery, window);';
        document.body.appendChild(script);


		var c_id = $('a#financier').attr('href').split('/')[4];
		if ((parent.document.location.toString().indexOf("/citizen/profile/"+c_id)==-1)===false) {
			$('div.place:last').after(
				'<div class="place"><h3><img src="http://www.erepublik.com/images/modules/_icons/press_director.png" alt=""> MM Projects</h3>'+
				'<div class="one_newspaper"><a href="javascript:void(0)" title="Media Mogul Projects" id="MMProjects">' +
				'<img src="http://www.erepublik.com/images/achievements/icon_achievement_mediamogul_on.gif" title="Media Mogul Projects" width="30" height="30">' +
				'<span>Run Script</span></a><p align="center" id="ProgressLabel">v.' +vers+ ', list:<font id="log">' +lastNum+ '</font> / ' +flag+ '</p></div></div>');
			$('#MMProjects').bind('click', function(){startMMSubscribers();});
			if (flag > lastNum) {$('font#log').css('color','red');};
		};
		if (parent.document.location.toString().indexOf("/newspaper/")!==-1) {
			var newsID = $("input#newspaper_id").val();
			$('#profileholder > h1:first').after('<p align="right"> this newspaper id: <strong style="font-size: 140%;">' +newsID+ '</strong></p><hr size="0" style="border:none;">');
		};
	});
	function startMMSubscribers(){
		if (running) {
			return false;
		} else {
			running = true;
		};
		if (flag > lastNum) {
			if(confirm('Do you want to start Media Mogul Projects?')){
				var taketime = Math.round((flag-lastNum)/2);
				alert('start Media Mogul Projects\nplease be patient, it will take about ' +taketime+ ' sec.');
				jQuery.each(mmList, function(i, val) {
					if ((inti >= lastNum) && (inti < flag)) {
						setTimeout(function(){getMMSubscribers("subscribe", val);}, time);
						time += 500;
					} else if (inti < flag) {
						inti++;
					};
				});
			} else {
				running = false;
				alert('you pause the Media Mogul Projects.');
			};
		} else {
			running = false;
			alert('already completed.\nthis is the last-one patch, check something on script homeage.');
			window.open('http://userscripts.org/scripts/show/116215', '_blank'); return false;
		};
	};
	function getMMSubscribers(type, newspaper, callback){
		jQuery.post('/subscribe', {
			_token: c_token,
			type: type,
			n: newspaper
		},function(data) {
			inti++;
			localStorage.setItem(LastSubNum, inti);
			$('p#ProgressLabel')[0].textContent = 'v.' +vers+ ', list:' +inti+ ' / ' +flag;
			if (inti==flag) {
				running = false;
				alert(inti + ' subscribe finished.\nthanks for your help for this Media Mogul Projects.');
				};
			callback();
		}, "json");
		return false;
	};
};
// Script Insert
var script = document.createElement('script');
script.textContent = '(' + MMHelperInsert + ')(jQuery, window);';
document.body.appendChild(script);
