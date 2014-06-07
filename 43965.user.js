// ==UserScript==
// @name          Farmer
// @namespace     jquery_farmer
// @description	  Recomendations for travian resource
// @author        FDisk
// @homepage      http://www.mrcbug.com
// @include       http://*.travian.*/dorf1.*
// @version       1.7
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/43965.user.js',
	version: '1.8',
	name: 'Farmer',
	presentationurl: 'http://userscripts.org/scripts/show/43965'
};

//Script variables
var lang = new Array();
var resursai = new Array();
var darbininkai;
var eiliskumas = '1,2,3,4';
var kletis;
var sandelys;
var pervalanda = new Array();

$(function(){

	vertimas();

	//Get resourses
	for(i=1;i<=4;i++) {
		$tmp = $("#l"+i);

		if(i == 1) {
			darbininkai = $tmp.attr('title');	//awalable workers
			
			kletis = $tmp.text().split('/');
			kletis = kletis[1];
		} else {
			sandelys = $tmp.text().split('/');
			sandelys = sandelys[1];
		}
		resursai.push($tmp.text().split('/')[0]);
		pervalanda.push($tmp.attr('title'));
	}
	resursai.reverse();
	//console.debug(resursai);
	pervalanda.reverse();

	checkLatest(eiliskumas);
	
	tikrinam();
	
	update_link();


});

//Add menu script update link
function update_link() {
	$('#side_navi').append('<p><a href="#" id="farmer_update" onclick="update_script()">Update '+SCRIPT.name+'</a></p>');
}

function tikrinam() {
	if (darbininkai < 4 || uzduotys[0] == null) {
		uzduotys[0] = 3;
	}
	$('#production').append('<tr><td class="ico"><img src="/img/un/r/'+(parseInt(uzduotys[0]+1)) +'.gif" /></td><td class="res"> '+lang[parseInt(uzduotys[0])]+':</td><td class="num"><img class="online2" alt="" title="Press here to upgrade the '+lang[parseInt(uzduotys[0])]+'" style="cursor:pointer;vertical-align:middle;" src="img/x.gif"/></td><td class="per">recomended</td></tr>');
}



//Add update function to the page
unsafeWindow.update_script = function() {
	$('#content').append("<div id='update'><b>"+SCRIPT.name+" updating<blink>...</blink></b></div>");

	window.setTimeout(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: SCRIPT.url + '?source',
			onload: function(result) {
          
				result.responseText.match(/version:\s\'([\d.]+)/);
				var versija = RegExp.$1;
          
				if (versija != SCRIPT.version) {
					$('#update').html('<b><span style="color:green">New version was found for '+SCRIPT.name+' v'+versija+' script</span></b>');
					window.location.href = SCRIPT.url;
				} else {
					$('#update').html('<b><span style="color:red">No updates for '+SCRIPT.name+' script</span></b>');
				}
				window.setTimeout(function(){
					$('#update').remove();
				},3000);
			}
		});
	}, 0);
};

		

function skaiciuojam(priority) {

	priority = priority.split(',');
	r1 = priority[0] / 1;
	r2 = priority[1] / 1;
	r3 = priority[2] / 1;
	r4 = priority[3] / 1;
	var s = new Array(resursai[0] / r1, resursai[1] / r2, resursai[2] / r3, resursai[3] / r4);
	uzduotys = priority;
	for (var i = s.length - 1; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			if (s[j] > s[j + 1]) {
				_temp = s[j];
				s[j] = s[j + 1];
				s[j + 1] = _temp;
				_temp = uzduotys[j];
				uzduotys[j] = uzduotys[j + 1];
				uzduotys[j + 1] = _temp;

			}
		}
	}
}

//Get translations
function vertimas() {
	$('#production img').each(function(){
		lang.push($(this).attr('title'))
	});
	//console.debug(lang);
}

//Requirements
function reikalinga(t, l) {
	var resources = new Array(4);
	switch (t) {
		case 0:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 40 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 100 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 50 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 60 / 5) * 5;
			break;
		}
		case 1:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 80 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 40 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 80 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 50 / 5) * 5;
			break;
		}
		case 2:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 100 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 80 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 30 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 60 / 5) * 5;
			break;
		}
		case 3:
		{
			resources[0] = Math.round(Math.pow(1.67, l) * 70 / 5) * 5;
			resources[1] = Math.round(Math.pow(1.67, l) * 90 / 5) * 5;
			resources[2] = Math.round(Math.pow(1.67, l) * 70 / 5) * 5;
			resources[3] = Math.round(Math.pow(1.67, l) * 20 / 5) * 5;
			break;
		}
	}
	return resources;
}

function checkLatest() {
	var _target = null;
	uzduotys = eiliskumas.split(',');
	temp2 = 0;
	for (var i = 0; i < 4; i++) {
		if (i == 3) {
			sandelys = kletis;
		}
		_fulltime = Math.round((sandelys - parseInt(resursai[i])) / pervalanda[i] * 60);
		//console.debug('(' + sandelys + '-' + resursai[i]+') / '+ pervalanda[i] + ' * 60 = ' + _fulltime);
		if (temp2 < _fulltime) {
			_target = i;
			temp2 = _fulltime;
		}
	}
	uzduotys[0] = _target;
	//console.debug(uzduotys);
}
