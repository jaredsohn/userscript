// ==UserScript==
// @name				Warfish Scenario Builder
// @namespace		Warfish
// @description	Script that does batch uploading of users and units to Warfish game modification for start-up scenarios
// @include			http://warfish.net/war/design/*
// @version			0.1.0
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @resource      circlesizeminus http://img265.imageshack.us/img265/893/circlesizeminus.png
// @resource      circlesizeplus http://img265.imageshack.us/img265/7273/circlesizeplus.png
// @resource      countrymarker http://img265.imageshack.us/img265/8408/countrymarker.png
// @resource      countrymarkeron http://img263.imageshack.us/img263/30/countrymarkeron.png
// ==/UserScript==

var circlesizeminus = GM_getResourceURL("circlesizeminus");
var circlesizeplus = GM_getResourceURL("circlesizeplus");
var countrymarker = GM_getResourceURL("countrymarker");
var countrymarkeron = GM_getResourceURL("countrymarkeron");
var where = location.href;
addstyle();

if ( /modsetupcountries\?[mb]id=\d+$/.exec(where) ) SetupAdd();

function SetupAdd(){
	loadjquery();
	var centertag = $('center:eq(1)').append('<input id="MMsubmit" type="submit" value="Add Player Ownership"/>');
	$('#MMsubmit').get(0).addEventListener('click',function(ev){
		var autofill = prompt('Enter player number to own the territory.\r\n'+
			'-1 is neutral and -2 is vacant','');
		if (!autofill)
			return;
		var num_units = prompt('Enter the number of units to place.\r\n'+
			'0 for abandoned','');
		if (!num_units)
			return;
		centertag
			.css('display','none')
			.before('<div id="MMtop" class="MMnotice"><span id="MMtop2"/><input id="MMcommit" type="submit" value="Commit Changes"/></div>');
		var actionkey = $('input[name="actionkey"]').attr('value');
		var actioncount = 1;
		var z = /modsetupcountries\?([mb])id=(\d+)$/.exec(where);
		var mapimage = unsafeWindow.$('input[type="image"]');
		var commitbutton = unsafeWindow.$('#MMcommit');
		mapimage
			.css('cursor','crosshair')
			.attr('id','MMmap')
			.bind('click',function(ev){
				ev.preventDefault();
				var country = "Volk";;
				if (country) {
					var position = findPosition(this);
					var x = ev.pageX-position[0];
					var y = ev.pageY-position[1];
					var notice = $('#MMtop2');
					var countryimage = unsafeWindow.$('<img id="img'+actioncount+'">').appendTo('body');
					notice
						.html(actioncount +' : ('+x+','+y+')');
					countryimage
						.css( {'position':'absolute', 'left':ev.pageX-9, 'top':ev.pageY-9} )
						.attr( {'class':'MMcountry', 'src':countrymarker, 'datac':country, 'datax':x, 'datay':y} )
						.draggable({ containment:'#MMmap', scroll:false })
						.bind('drag',function(e,ui) { notice.html(country+' : ('+(ui.position.left-position[0]+9)+','+(ui.position.top-position[1]+9)+')'); })
						.bind('dragstop',function(e,ui){ $(this).attr({ 'datax':ui.position.left-position[0]+9, 'datay':ui.position.top-position[1]+9 }); })
						.bind('mouseout', function(e){ $(this).attr('src',countrymarker); })
						.bind('mouseover',function(e){ 
							$(this).attr('src',countrymarkeron); 
							notice.html(actioncount+' : ('+x+','+y+')');
						});
					actioncount++;
				}
				},false);
		commitbutton
			.bind('click',function(e){
				var notice = unsafeWindow.$('#MMtop');
				var countryimages = unsafeWindow.$('.MMcountry');
				var barstart = 100 % countryimages.length;
				var bareach = 100 / countryimages.length;
				notice
					.html('')
					.progressbar({ value: barstart });
				countryimages
					.each(function(i){
						var url = 'http://warfish.net/war/design/modsetupcountries?' +
							z[1]+'id='+z[2] +
							'&actionkey='+ actionkey +
							'&action=setunits' +
							'&seatnum=' + autofill +
							'&units=' + num_units +
							'&maploc.x='+ $(this).attr('datax') +
							'&maploc.y='+ $(this).attr('datay');
						actionkey = commit(url);
						notice.progressbar('option', 'value', ( Math.floor( bareach*(i+1) )+barstart) );
						});
				location.href = location.href;
				},false);
	},false);
}

function $$(exp,root){
	return document.evaluate(exp,root,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}
function $1(exp,root){
	return document.evaluate(exp,root,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}
function calculateloss(ad,as,dd,ds,x){
	var a = distribution(ad,as);
	var d = distribution(dd,ds);
	var c = a.c * d.c;
	var al = [0,0,0];
	var dl = [0,0,0];
	if ( ad == 1 || dd == 1 ) {
		for ( m in a.p ) {
			for ( n in d.p ) {
				var e = a.p[m][0] * d.p[n][0];
				var f = ( a.p[m][1] > d.p[n][1] ) ? true : false ;
				if(f)	{ al[0] += e; dl[1] += e; }
				else	{ al[1] += e; dl[0] += e; }
			}
		}
	} else {
		for ( m in a.p ) {
			for ( n in d.p ) {
				var e = a.p[m][0] * d.p[n][0];
				var f = ( a.p[m][2] > d.p[n][2] ) ? true : false ;
				if ( a.p[m][1] > d.p[n][1] ) {
					if(f)	{ al[0] += e; dl[2] += e; }
					else	{ al[1] += e; dl[1] += e; }
				} else {
					if(f)	{ al[1] += e; dl[1] += e; }
					else	{ al[2] += e; dl[0] += e; }
				}
			}
		}
	}
	function distribution(d,s){
		var z = { 'c':Math.pow(s,d), 'p':{} };
		for ( i=1,u=0; i < s+1; i++ ) {
			if ( d == 1 )			z.p[u++] = [1,i];
			for ( j=1; j < i+1; j++ ) {
				switch ( d ) {
				case 3:
					if ( j == i )	z.p[u++] = [3*j-2,i,j];
					else 				z.p[u++] = [6*j-3,i,j];
					break;
				case 2:
					if ( j == i )	z.p[u++] = [1,i,j];
					else 				z.p[u++] = [2,i,j];
					break;
				}
			}
		}
		return z;
	}
	var losses = [];
	losses[0] = x * ( ( al[1] / c ) + ( al[2] / c * 2 ) );
	losses[1] = x * ( ( dl[1] / c ) + ( dl[2] / c * 2 ) );
	return losses;
}
function commit(url){
	var searchkey;
	var actionkey = '0000000';
	var req = new XMLHttpRequest();
	req.open('GET',url,false); //synchronous
	req.send(null);
	if ( req.status == 200 ) {
		var text =  req.responseText;
		searchkey = /actionkey\svalue=(\d+)/.exec(text);
		if (searchkey){actionkey = searchkey[1]}
		searchkey = /actionkey"\svalue="(\d+)"/.exec(text);
		if (searchkey){actionkey = searchkey[1]}
		searchkey = /actionkey\svalue="(\d+)"/.exec(text);
		if (searchkey){actionkey = searchkey[1]}
		return actionkey;
	};
}
function loadjquery(){
	$('head').append('<link rel="stylesheet" type="text/css" href="http://iroll11s.googlecode.com/files/jquery-ui-1.7.2.custom.css">');
	if(typeof unsafeWindow.$ == 'undefined'){
		var JQ = document.createElement('script');
		JQ.src = 'http://iroll11s.googlecode.com/files/jquery-1.3.2.min.js';
		JQ.type='text/javascript';
		document.getElementsByTagName('head')[0].appendChild(JQ);
	}
	waitforjquery();
	function waitforjquery(){
		if(typeof unsafeWindow.$ == 'undefined'){
			window.setTimeout(waitforjquery,100);
		}else{
			loadjqueryui();
		}
	}
	function loadjqueryui(){
		var JQ = document.createElement('script');
		JQ.src = 'http://iroll11s.googlecode.com/files/jquery-ui-1.7.2.custom.min.js';
		JQ.type='text/javascript';
		document.getElementsByTagName('head')[0].appendChild(JQ);
		waitforpicker();
	}
	function waitforpicker(){
		if(typeof unsafeWindow.$.farbtastic == 'undefined'){
			window.setTimeout(waitforpicker,100);
		}else{
			return;
		}
	}
}
function findPosition(E){
	if(typeof(E.offsetParent)!='undefined'){for(var X=0,Y=0;E;E=E.offsetParent){X+=E.offsetLeft;Y+=E.offsetTop;}return [X,Y];}else{return [E.x,E.y];}
}
function getcanvas(id,zindex){
	var jQmap = $('img[usemap="#country-mapdata"]').css('opacity','0.4');
	var mapcoords = findPosition(jQmap.get(0));
	var mapdimensions = [jQmap.attr('width'),jQmap.attr('height')];
	$('body').append('<canvas id="'+id+'" width="'+mapdimensions[0]+'" height="'+mapdimensions[1]+'"></canvas>');
	$('#'+id).css({ 'position':'absolute', 'left':mapcoords[0], 'top':mapcoords[1], 'z-index':zindex });
	return [ $('#'+id).get(0).getContext('2d'), mapcoords[0], mapcoords[1], mapdimensions[0], mapdimensions[1] ];
}
function getcountries(){
	var c = {};
	$('map area').each(function(i){
		var coords = $(this).attr('coords').split(',');
		var x = parseInt(coords[0])+9;
		var y = parseInt(coords[1])+9;
		c[$(this).attr('alt')] = [x,y,(i+1)];
	});
	return c;
}
function getborders(){
	var b = {};
	var borders = $$('//rsp//tr[position()>1]/td[1]',document);
	for ( var i=0,el; ( el = borders.snapshotItem(i) ); i++ ) {
		if ( b[el.textContent] === undefined ) { b[el.textContent] = [el.nextSibling.textContent]; }
		else { b[el.textContent].push( el.nextSibling.textContent ); }
	}
	return b;
}
function addstyle(){
	GM_addStyle(
	'.MMnotice{' +
		'margin-bottom:2px;'+
		'border:thin solid #87AFDA;' +
		'background-color: #D4E6FC;' +
		'padding:5px;'+
		'height:26px;'+
		'width:470px;'+
		'-moz-border-radius: 3px;' +
		'z-index:200;}' +
	'.MMhidden{ display:none;}' +
	'.MMcircles{ position:relative; top:4px; }' +
	'img.MMcircles:hover{ background-color:orange; cursor:pointer; }'
	);
}