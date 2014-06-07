// ==UserScript==
// @name           Ikariam - PlunderSafeHelp
// @namespace      localhost
// @include        http://s*.de.ikariam.com/*
// ==/UserScript==
var server = document.title.replace(/(Ikariam| |\d+(s|m|h|d)|-|Welt)/g,'');

if ( !GM_getValue('ikHelper_' + server + '_time') ) {
	GM_setValue('ikHelper_' + server + '_time',10);
} if ( !GM_getValue('ikHelper_' + server + '_num') ) {
	GM_setValue('ikHelper_' + server + '_num',1);
} if ( !GM_getValue('ikHelper_' + server + '_left') ) {
	GM_setValue('ikHelper_' + server + '_left','-626px');
}

var name = null;{
var wood = null;
var wine = null;
var marble = null;
var crystal = null;
var sulfur = null;
var max = null;
var type = null;
var plus = null;
var minus = null;
}

function storeCity(server,id,name,wood,wine,marble,crystal,sulfur,max,type,plus,minus) {
	var num = GM_getValue('ikHelper_' + server + '_num');
	if ( !GM_getValue('ikHelper_' + server + '_city_' + id) ) {
		GM_setValue('ikHelper_' + server + '_city_' + id,num);
		num = num + 1;
		GM_setValue('ikHelper_' + server + '_num',num);
	}
	
	var tid = GM_getValue('ikHelper_' + server + '_city_' + id);
	GM_setValue('ikHelper_' + server + '_city_' + tid + 'update',new Date().getTime() + "");
	
	if ( name != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'name',name.replace(/\./,''));
	} if ( wood != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'wood',wood.replace(/\./,''));
	} if ( wine != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'wine',wine.replace(/\./,''));
	} if ( marble != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'marble',marble.replace(/\./,''));
	} if ( crystal != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'crystal',crystal.replace(/\./,''));
	} if ( sulfur != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'sulfur',sulfur.replace(/\./,''));
	} if ( max != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'max',max.replace(/(\.|\+)/,''));
	} if ( type != null ) {
		if ( plus != null ) {
			GM_setValue('ikHelper_' + server + '_city_' + tid + type + 'plus',plus.replace(/\./,''));
		}
	} if ( minus != null ) {
		GM_setValue('ikHelper_' + server + '_city_' + tid + 'minus',minus.replace(/(\.|\+)/,''));
	}
}

function myGet(target) {
	if ( !GM_getValue(target) ) {
		return 0;
	}
	var ret = GM_getValue(target);
	return ret;
}

function readCity (server,tid,id) {
	var ret = new function(){};
	
	if ( typeof id != 'undefined' && id != null ) {
		if ( !GM_getValue('ikHelper_' + server + '_city_' + id) ) {
			return null;
		}
		tid = GM_getValue('ikHelper_' + server + '_city_' + id);
	}
	
	var time = new Date().getTime();
	
	ret.name = myGet('ikHelper_' + server + '_city_' + tid + 'name');
	ret.max = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'max'));
	ret.minus = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'minus'));
	ret.plus = new function() {};
	ret.plus.wood = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'wood' + 'plus'));
	ret.plus.wine = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'wine' + 'plus'));
	ret.plus.marble = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'marble' + 'plus'));
	ret.plus.crystal = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'crystal' + 'plus'));
	ret.plus.sulfur = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'sulfur' + 'plus'));
	
	ret.update = myGet('ikHelper_' + server + '_city_' + tid + 'update');
	ret.wood = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'wood'));
	ret.wine = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'wine'));
	ret.marble = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'marble'));
	ret.crystal = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'crystal'));
	ret.sulfur = parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'sulfur'));
	
	var lapsedTime = Math.round((time - parseInt(myGet('ikHelper_' + server + '_city_' + tid + 'update'))) / 1000);
	
	ret.wood = ret.wood + ret.plus.wood * lapsedTime / 3600;
	ret.wine = ret.wine + ret.plus.wine * lapsedTime / 3600 - ret.minus * lapsedTime / 3600;
	ret.marble = ret.marble + ret.plus.marble * lapsedTime / 3600;
	ret.crystal = ret.crystal + ret.plus.crystal * lapsedTime / 3600;
	ret.sulfur = ret.sulfur + ret.plus.sulfur * lapsedTime / 3600;
	
	return ret;
}

var createTable = new function () {
	this.server = server;
	
	this.call = function () {
		var server = createTable.server;
		var time = new Date().getTime();
		var ikTime = GM_getValue('ikHelper_' + server + '_time');
		var num = GM_getValue('ikHelper_' + server + '_num');
		
		var div = document.createElement('div');
		div.id = 'ikHelperTable';
		div.style.position = 'absolute';
		div.style.left = GM_getValue('ikHelper_' + server + '_left');
		div.style.top = '220px';
		div.style.width = '645px';
		div.style.height = ( 20 + num * 20 ) + 'px';
		div.style.background = 'url("layout/bg_stone.jpg") repeat scroll center top #DBBE8C';
		div.style.zIndex = '100';

		var click = document.createElement('div');
		click.style.position = 'absolute';
		click.style.right = '0px';
		click.style.top = '0px';
		click.style.width = '20px';
		click.style.height = ( 20 + num * 20 ) + 'px';
		click.style.backgroundColor = 'gray';
		click.addEventListener('click',function(){
			var style = '0px';
			if ( document.getElementById('ikHelperTable').style.left == '0px' ) style = '-626px';
			GM_setValue('ikHelper_' + server + '_left',style);
			document.getElementById('ikHelperTable').style.left = style;
		},false);


		div.appendChild(click);
		var red = 'red';
		var green = '#8eed8e';
		
		var i = 1;
		var object;
		var sum = new function() {};
		{
			sum.max = 0;
			sum.minus = 0;
			sum.wood = 0;
			sum.wine = 0;
			sum.marble = 0;
			sum.crystal = 0;
			sum.sulfur = 0;
			sum.plus = new function() {};
			sum.plus.wood = 0;
			sum.plus.wine = 0;
			sum.plus.marble = 0;
			sum.plus.crystal = 0;
			sum.plus.sulfur = 0;
		}
		
		while ( i < num ) {
			object = readCity(server,i);
			i = i+1;
			var d = document.createElement('div');
			var s = new Array();
			for ( var x = 0 ; x < 11 ; x++ ) {
				s[x] = document.createElement('span');
			}
			for ( var ii = 0 ; ii < s.length ; ii++ ) {
				s[ii].style.position = 'absolute';
				s[ii].style.width = '50px';
				s[ii].style.left = ( 125 + 50 * (ii - 1)) + "px";
				s[ii].style.top = ( 20+20 * (i-2) ) + "px";
				d.appendChild(s[ii]);
			}
			
			s[0].innerHTML = object.name + " (" + object.max + ")"; {
			s[0].style.width = '125px';
			s[0].style.left = '0px';
			s[1].innerHTML = Math.round(object.max - object.wood);
			s[2].innerHTML = Math.round(object.max - object.wood - object.plus.wood * ikTime);
			s[3].innerHTML = Math.round(object.max - object.wine);
			s[4].innerHTML = Math.round(object.max - object.wine - object.plus.wine * ikTime + object.minus * ikTime);
			s[5].innerHTML = Math.round(object.max - object.marble);
			s[6].innerHTML = Math.round(object.max - object.marble - object.plus.marble * ikTime);
			s[7].innerHTML = Math.round(object.max - object.crystal);
			s[8].innerHTML = Math.round(object.max - object.crystal - object.plus.crystal * ikTime);
			s[9].innerHTML = Math.round(object.max - object.sulfur);
			s[10].innerHTML = Math.round(object.max - object.sulfur - object.plus.sulfur * ikTime);
			}
			
			sum.max = sum.max + object.max; {
			sum.minus = sum.minus + object.minus;
			sum.wood = sum.wood + object.wood;
			sum.wine = sum.wine + object.wine;
			sum.marble = sum.marble + object.marble;
			sum.crystal = sum.crystal + object.crystal;
			sum.sulfur = sum.sulfur + object.sulfur;
			sum.plus.wood = sum.plus.wood + object.plus.wood;
			sum.plus.wine = sum.plus.wine + object.plus.wine;
			sum.plus.marble = sum.plus.marble + object.plus.marble;
			sum.plus.crystal = sum.plus.crystal + object.plus.crystal;
			sum.plus.sulfur = sum.plus.sulfur + object.plus.sulfur;
			}
			
			for ( var ii = 1 ; ii < s.length ; ii++ ) {
				s[ii].style.background = (s[ii].innerHTML >= 0)? green : red;
			}
			
			div.appendChild(d);
		}
		var s = new Array();
		for ( var x = 0 ; x < 11 ; x++ ) {
			s[x] = document.createElement('span');
		}
		for ( var ii = 0 ; ii < s.length ; ii++ ) {
			s[ii].style.position = 'absolute';
			s[ii].style.width = '50px';
			s[ii].style.left = ( 125 + 50 * (ii - 1)) + "px";
			s[ii].style.top = "0px";
			d.appendChild(s[ii]);
		}
		s[0].style.width = '125px';
		s[0].style.left = '0px';
		
		var select = document.createElement('select');
		var text = '';
		for ( var ii = 1 ; ii < 25 ; ii++ ) {
			text = '';
			if ( ii == ikTime ) {
				text = ' selected="selected"';
			}
			select.innerHTML += '<option' + text + '>' + ii + '</option>';
		}
		select.addEventListener('change',function(){
			GM_setValue('ikHelper_' + server + '_time',this.value);
			var doc = document.getElementById('ikHelperTable');
			doc.parentNode.removeChild(doc);
			createTable.call();
		},false);
		
		var link = document.createElement('button');
		link.addEventListener('click',function(){
			var doc = document.getElementById('ikHelperTable');
			doc.parentNode.removeChild(doc);
			createTable.call();
		},false);
		link.innerHTML = 'refresh';
		
		s[0].appendChild(select);
		s[0].appendChild(link);
		s[0].style.top = "-2px";
		s[1].innerHTML = "Holz";
		s[3].innerHTML = "Wein";
		s[5].innerHTML = "Marmor";
		s[7].innerHTML = "Kristall";
		s[9].innerHTML = "Schwefel";
		
		var s = new Array();
		for ( var x = 0 ; x < 11 ; x++ ) {
			s[x] = document.createElement('span');
		}
		for ( var ii = 0 ; ii < s.length ; ii++ ) {
			s[ii].style.position = 'absolute';
			s[ii].style.width = '50px';
			s[ii].style.left = ( 125 + 50 * ( ii - 1 ) ) + "px";
			s[ii].style.top = ( 40 + 20 * ( i - 2 ) ) + "px";
			d.appendChild(s[ii]);
		}
		
		sum.name = 'Gesamt';
		
		s[0].innerHTML = sum.name + " (" + sum.max + ")";
		s[0].style.width = '125px';
		s[0].style.left = '0px';
		s[1].innerHTML = Math.round(sum.max - sum.wood);
		s[2].innerHTML = Math.round(sum.max - sum.wood - sum.plus.wood * ikTime);
		s[3].innerHTML = Math.round(sum.max - sum.wine);
		s[4].innerHTML = Math.round(sum.max - sum.wine - sum.plus.wine * ikTime + sum.minus * ikTime);
		s[5].innerHTML = Math.round(sum.max - sum.marble);
		s[6].innerHTML = Math.round(sum.max - sum.marble - sum.plus.marble * ikTime);
		s[7].innerHTML = Math.round(sum.max - sum.crystal);
		s[8].innerHTML = Math.round(sum.max - sum.crystal - sum.plus.crystal * ikTime);
		s[9].innerHTML = Math.round(sum.max - sum.sulfur);
		s[10].innerHTML = Math.round(sum.max - sum.sulfur - sum.plus.sulfur * ikTime);
		for ( var ii = 1 ; ii < s.length ; ii++ ) {
			s[ii].style.background = (s[ii].innerHTML >= 0)? green : red;
		}
		
		document.getElementsByTagName('body')[0].appendChild(div);
	}
}

function createObject(type,style) {
	var element = document.createElement(type);
	document.getElementsByTagName('body')[0].appendChild(element);
	element.setAttribute('style',style);
}

wood = document.getElementById("value_wood").innerHTML;{
marble = document.getElementById("value_" + "marble").innerHTML;
wine = document.getElementById("value_" + "wine").innerHTML;
crystal = document.getElementById("value_" + "crystal").innerHTML;
sulfur = document.getElementById("value_" + "sulfur").innerHTML;
}

var spans = document.getElementsByTagName("span");
for each ( var span in spans ) {
	if ( span.className == "secure" ) {
		max = span.innerHTML;
	}
	if ( span.className == "building" ) {
		switch ( span.innerHTML ) {
			case 'Sägewerk':
			case 'Saw Mill':
				type = 'wood';break;
			case 'Weinberg':
			case 'Vines':
				type = 'wine';break;
			case 'Steinbruch':
			case 'Quarry':
				type = 'marble';break;
			case 'Kristallmine':
			case 'Crystal Mine':
				type = 'crystal';break;
			case 'Schwefelgrube':
			case 'Sulfur Pit':
				type = 'sulfur';break;
		} 
	}
}

var options = document.getElementById("citySelect").childNodes;
for each ( var option in options ) {
	if ( option.selected === true ) {
		name = option.innerHTML.replace(/\[\d+:\d+\]&nbsp;/,'');
		var id = option.value;
	}
}

var divs = document.getElementsByTagName("div");
for each ( var div in divs ) {
	if ( div.className == "sliderinput" ) {
		for ( var i = 0 ; i < div.childNodes.length ; i++ ) {
			if ( div.childNodes[i].nodeName == 'SCRIPT' ) {
				var match = div.childNodes[i].text.match(/iniValue : \d+,/);
				if (  match[0] == null ) {
					break;
				}
				match[0] = match[0].replace(/[^\d]/g,'');
				break;
			}
		}
		if ( document.getElementById('wineAmount') == null ) {
			continue;
		}
		minus = document.getElementById('wineAmount').options[match[0]].text.replace(/[^\d]/g,'');
	}
}


if ( document.getElementById("valueResource") != null ) {
	plus = document.getElementById("valueResource").innerHTML;
}

storeCity(server,id,name,wood,wine,marble,crystal,sulfur,max,type,plus,minus);

createTable.call(server);
