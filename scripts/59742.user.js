// ==UserScript==
// @name				Warfish Mapmakers
// @namespace		Warfish
// @description	Modifications to ease the pain of making maps.
// @include			http://warfish.net/war/design/*
// @version			0.1.1
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

GM_registerMenuCommand('Mapmakers: Odds for dice modifiers.', DiceModifiers);
if ( /modgeom\?[mb]id=\d+&cid=/.exec(where) ) BorderModifierFix();
if ( /textborders\?[mb]id=\d+$/.exec(where) ) BorderTextListEdit();
if ( /addcountry\?[mb]id=\d+$/.exec(where) ) CountryBulkAdd();
if ( /addborder\?[mb]id=\d+$/.exec(where) ) BorderBulkAdd();
if ( /addcontinent\?[mb]id=\d+$/.exec(where) ) {
	GM_registerMenuCommand('Mapmakers: Hordify Map - © 2008 Reich =]', MapHordify);
	ContinentBulkAdd();
}

function BorderBulkAdd() {
	// Everything is triggered by the one button so we don't step on the regular UI.
	$('center:eq(1)').append('<input id="MMsubmit" type="submit" value="Show Interactive Borders"/>');
	$('#MMsubmit').click(function(ev){
		$('center:eq(1)')
			.css('display','none')
			.before('<div id="MMbottom" class="MMnotice"/>')
			.before('<div id="MMtop" class="MMnotice">Retrieving list of borders...</div>');
		$('<rsp id="MMborders"/>')
			.appendTo('body')
			.load(where.replace('addborder','textborders') + ' table[cellspacing="1"][cellpadding="2"]',function(){
			
			// Country info is from the map area elements on the existing page.
			var countries = getcountries();
			
			// Borders are from the [View Text] link that has been loaded into the rsp tag.
			var borders = { 
				'old':getborders(),
				'add':{},
				'tmp':{},
				'mse':{}
				};
			
			// Canvases are for drawing the 4 types of borders.
			var canvas = { 
				'old':getcanvas('MMc1','-5'),
				'add':getcanvas('MMc2','-4'),
				'tmp':getcanvas('MMc3','-3'),
				'mse':getcanvas('MMc4','-2')
				};
			var activecountry = false; 
			var twowayborders = true;
			var circlesize = 9;
			
			// Redraw any of the canvases.
			function drawcanvas(name,color){
				canvas[name][0].clearRect(0,0,canvas[name][3],canvas[name][4]);
				for ( var cid in borders[name] ){
					canvas[name][0].beginPath();
					canvas[name][0].lineWidth = 1;
					canvas[name][0].fillStyle = color;
					canvas[name][0].arc(countries[cid][0],countries[cid][1],circlesize,0,Math.PI*2,true);
					canvas[name][0].fill();
					for ( var j=0; j < borders[name][cid].length; j++ ){
						canvas[name][0].beginPath();
						canvas[name][0].lineWidth = 1;
						canvas[name][0].strokeStyle = color;
						for ( var b in borders ) {
							if ( borders[b][ borders[name][cid][j] ] !== undefined ){
								if ( borders[b][ borders[name][cid][j] ].indexOf(cid) != -1 ) {
									canvas[name][0].lineWidth = 3;
								}
							}
						}
						canvas[name][0].moveTo(countries[cid][0],countries[cid][1]);
						canvas[name][0].lineTo(countries[ borders[name][cid][j] ][0],countries[ borders[name][cid][j] ][1]);
						canvas[name][0].stroke();
					}
				}
			}
			
			// Set up the top notification bars.
			var html = '<input id="MMtoggle" type="submit" value="2-Way On"></input>'+
						  '<img id="MMincrease" class="MMcircles" src="'+circlesizeplus+'"/>'+
						  '<img id="MMdecrease" class="MMcircles" src="'+circlesizeminus+'"/>'+
						  '<input id="MMcommit" type="submit" value="Commit Changes"></input>';
			$('#MMbottom').html(html);
			$('#MMtop').html('');
			$('#MMincrease').click(function(ev){
				circlesize++;
				drawcanvas('add','green');
				drawcanvas('tmp','red');
				drawcanvas('old','black');
			});
			$('#MMdecrease').click(function(ev){
				circlesize--;
				drawcanvas('add','green');
				drawcanvas('tmp','red');
				drawcanvas('old','black');
			});
			$('#MMtoggle').click(function(ev){
				var buttontext = (twowayborders)?'2-Way Off':'2-Way On';
				$(this).val(buttontext);
				twowayborders = !twowayborders;
			});
			
			// Draw the existing borders on the borders canvas.
			drawcanvas('old','black');
			
			// Set event listeners for each country.
			$('map area').each(function(i){
			
				// Prevent default behaviour.
				$(this).attr('onClick','return false;');
				
				// Mouseover and mouseout draw circles surrounding each country using the temporary canvas.
				this.addEventListener('mouseover',function(ev){
					var color = ( activecountry ) ? 'red' : 'black' ;
					var country = $(this).attr('alt');
					canvas.mse[0].beginPath();
					canvas.mse[0].lineWidth = 3;
					canvas.mse[0].strokeStyle = color;
					canvas.mse[0].arc(countries[country][0],countries[country][1],10,0,Math.PI*2,true);
					canvas.mse[0].stroke();
					if ( !activecountry ) {
						var html = '';
						if ( borders.old[country] !== undefined ){ html += '[' + borders.old[country].length + ' old] '; }
						if ( borders.add[country] !== undefined ){ html += '<font color="green">['+ borders.add[country].length +' new]</font>'; }
						if ( html == '' ){ html = '[None]'; }
						$('#MMtop').html(country + ' borders: ' + html);
					}
				},false);
				this.addEventListener('mouseout',function(ev){
					canvas.mse[0].clearRect(0,0,canvas.mse[3],canvas.mse[4]);
					$('#MMtop').html('');
				},false);
				
				// Click does multiple things depending on the mode.
				this.addEventListener('click',function(ev){
					var cc = $(this).attr('alt');
					if ( !activecountry ) {
						if ( borders.add[cc] === undefined ) {
							borders.tmp[cc] = [];
							if ( twowayborders ){
								var alreadyexists = [];
								if ( borders.old[cc] ) { alreadyexists = borders.old[cc]; }
								for ( var c in borders.add ) { 
									if ( borders.add[c].indexOf(cc) != -1 && alreadyexists.indexOf(c) == -1) { borders.tmp[cc].push(c); }
								}
								for ( var c in borders.old ) {
									if ( borders.old[c].indexOf(cc) != -1 && alreadyexists.indexOf(c) == -1 ) { borders.tmp[cc].push(c); }
								}
							}
						} else {
							borders.tmp[cc] = borders.add[cc];
							delete borders.add[cc];
						}
						drawcanvas('tmp','red');
						drawcanvas('add','green');
						activecountry = cc;
					} else {
						if ( cc == activecountry ){
							borders.add[cc] = borders.tmp[cc];
							borders.tmp = {};
							if ( borders.add[cc].length == 0 ){ delete borders.add[cc]; }
							activecountry = false;
						} else {
							if ( borders.tmp[activecountry].indexOf(cc) != -1 ){
								borders.tmp[activecountry].splice(borders.tmp[activecountry].indexOf(cc), 1);
							} else {
								if ( borders.tmp[activecountry].length < 10 ){
									if ( borders.old[activecountry] ) {
										if ( borders.old[activecountry].indexOf(cc) == -1 ) { borders.tmp[activecountry].push(cc); }
									} else {
										borders.tmp[activecountry].push(cc);
									}
								} else {
									$('#MMtop').html('You can only add up to ten borders at once.');
								}
							}
						}
						drawcanvas('tmp','red');
						drawcanvas('add','green');
					}
				},false);
			});
			
			// Submit the bulk border modifications.
			$('#MMcommit').click(function(ev){
				var z = /addborder\?([mb])id=(\d+)$/.exec(where);
				var actionkey = '00000000';
				for ( var country in borders.add ) {
					borders.tmp[country] = borders.add[country];
					drawcanvas('tmp','purple');
					var countryfromid = countries[country][2];
					var countrytoids = [];
					var borderstrings = [];
					for (var j=0;j < borders.add[country].length;j++){
						var countrytoid = countries[borders.add[country][j]][2];
						countrytoids.push(countrytoid);
						borderstrings.push('b' + (j+1) + '=' + countryfromid + ',' + countrytoid);
					}
					var url = 'http://warfish.net/war/design/addborder?'+
						z[1]+'id='+z[2]+
						'&clist=' + countryfromid + ',' + countrytoids.join(',');
					actionkey = commit(url);
					var url = 'http://warfish.net/war/design/addborder?'+
						borderstrings.join('&') + 
						'&actionkey=' + actionkey + 
						'&' + z[1]+'id='+z[2];
					actionkey = commit(url);
				}
				location.href = location.href;
			});
		});
	}); 
}
function BorderModifierFix(){
	var el = $('center center');
	el.html(el.html().replace(/\(a:([+-]{1}\d+),([+-]{1}\d+);d:([+-]{1}\d+),([+-]{1}\d+)\s/gmi,' (a:\$1,\$3;d:\$2,\$4'));
	$('a[href="../help/faq#modifiernotation"]').remove();
	$('a[href="../help"]').attr('href','../help/faq#modifiernotation');
}
function BorderTextListEdit(){
	// Load jQuery and jQueryUI in order to use the progress bar for bulk page loads.
	loadjquery();
	
	// Store page elements that we need to grab data or add elements to.
	var table = $1('//table[@cellspacing="1"][@cellpadding="2"][@border="0"]',document);
	var tablerows = $$('.//tr[position()>1]',table);
	var insertpoint = $1('//center/img[4]',document);
	
	// Insert point is different for boards and mods.
	if ( !insertpoint ) { insertpoint = $1('//center/img[2]',document); }
	
	// Store these now so we can set the textareas to the same width and row height.
	var tableheight = tablerows.snapshotLength - 1; // -1 for FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
	var tablewidth = table.offsetWidth;
	
	// These arrays store the table data for the three textareas.
	var csvoriginal = getcsvoriginal();
	var csvnew = [];
	var csvchanged = [];
	
	// Style and add all of the new UI elements.
	GM_addStyle('textarea {display:none;width:'+table.offsetWidth+';} .MMactive{color:orange;}');
	$('<center/>')
		.appendTo('body')
		.append('<textarea id="MMcsvexport" rows="'+tableheight+'" readonly="true">'+csvoriginal.join('\n')+'</textarea>')
		.append('<textarea id="MMcsvimport" rows="'+tableheight+'"/>')
		.append('<textarea id="MMcsvvalidate" readonly="true"/>');
	$('<div id="MMtop" class="MMnotice"/>')
		.insertAfter(insertpoint)
		.append('<input id="MMexport" type="submit" value="Export" class="MMshowhide"/>')
		.append('<input id="MMimport" type="submit" value="Import" class="MMshowhide"/>')
		.append('<input id="MMvalidate" type="submit" value="Validate" class="MMshowhide"/>')
		.append('<input id="MMsubmit" type="submit" value="Submit" disabled="disabled"/>');
	
	// Export textarea has multiple events to prevent partial data being selected.
	$('#MMexport').click(function(ev){
		showhide(this);
		$('#MMcsvexport')
			.mousedown(function(){ this.select() })
			.mouseup(function(){ this.select() })
			.click(function(){ this.select() })
			.focus(function(){ this.select() })
			.show().get(0).select();
	});
	
	// Nothing special here, just show the damn import box.
	$('#MMimport').click(function(ev){
		showhide(this);
		$('#MMcsvimport').show().get(0).focus();
	});

	// This is where the Submit button gets activated on successful validation.
	$('#MMvalidate').click(function(ev){
		showhide(this);
		if ( comparecsv() ) {
			$('#MMcsvvalidate')
				.attr('rows',csvchanged.length-1)
				.val(csvchanged.join('\n'))
				.show();
			$('#MMsubmit')
				.removeAttr('disabled');
		}
	});

	// The money shot.
	$('#MMsubmit').click(function(ev){
		showhide(this);
		$('body').append('<rsp id="MMmaparea"/>');
		$.ajaxSetup({async:false,cache:false});
		var submissions = csvchanged.length;
		var barstart = 100 % (submissions*4);
		var bareach = 100 / (submissions*4);
		var notice = unsafeWindow.$('#MMtop');
		notice
			.html('')
			.progressbar({ value: barstart });
		for ( var i=0; i < submissions; i++ ) {
			var row = csvchanged[i].split(',');

			var url = where.replace('textborders','editbordermodifiers');
			$('#MMmaparea').html($.ajax({url: url}).responseText);
			notice.progressbar('option', 'value', ( Math.floor( bareach*(i*4+1) )+barstart) );

			var url = $('#MMmaparea').find('area[alt*=' + row[0] + ']').attr('href');
			$('#MMmaparea').html($.ajax({url: url}).responseText);
			notice.progressbar('option', 'value', ( Math.floor( bareach*(i*4+2) )+barstart) );

			var url = $('#MMmaparea').find('area[alt*=' + row[1] + ']').attr('href');
			var actionkey = commit(url);
			notice.progressbar('option', 'value', ( Math.floor( bareach*(i*4+3) )+barstart) );
			
			var cid = url.split('?')[1].split('&')[1].split('=')[1];
			var clist = url.split('?')[1].split('&')[3].split('=')[1];
			var zid = url.split('?')[1].split('&')[0];
			var url = 'http://warfish.net/war/design/editbordermodifiers'+
				'?clist=' + clist + '%2C' + cid +
				'&actionkey=' + actionkey +
				'&action=edit' +
				'&' + zid +
				'&modva=' + row[2] +
				'&modvd=' + row[3] +
				'&modda=' + row[4] +
				'&moddd=' + row[6] +
				'&moddaf=' + row[5] +
				'&modddf=' + row[7];
			commit(url);
			notice.progressbar('option', 'value', ( Math.floor( bareach*(i*4+4) )+barstart) );
		}
		location.href = where;
	});

	// Self-explanatory. The .blur() is to get rid of the ugly dotted lines around the buttons.
	function showhide(el){
		$('.MMshowhide')
			.removeAttr('disabled')
			.removeClass('MMactive');
		$(el)
			.attr('disabled','disabled')
			.addClass('MMactive')
			.blur(function(){});
		$(table).hide();
		$('textarea').hide();
	}
	
	// Just fill an array with the row and cell data from the table.
	function getcsvoriginal(){
		var csv = [];
		for ( var i=0,row; ( row = tablerows.snapshotItem(i) ); i++ ) {
			var rowtext = [];
			var rowcells = $$('.//td',row);
			for ( var j=0,cell; ( cell = rowcells.snapshotItem(j) ); j++ ) {
				var cellcontent = ( j < 2 ) ? '"'+cell.textContent+'"' : cell.textContent ;
				rowtext.push(cellcontent);
			}
			csv.push(rowtext.join(','));
		}
		return csv;
	}
	
	// Does some simple validation on the Import data.
	function comparecsv(){
		csvnew = $('#MMcsvimport').val().split('\n');
		csvchanged.length = 0;
		
		// Number of lines don't match.
		if ( csvoriginal.length != csvnew.length ) {
			alert('Validation Failed: Number of lines do not match.');
			return false;
		}
		
		for ( var i=0; i < csvnew.length; i++ ) {
			var roworiginal = csvoriginal[i].split(',');
			var rownew = csvnew[i].split(',');
			// Make sure they didn't leave out any columns
			if ( rownew.length != 8 ) { 
				alert('Validation Failed: One of the rows is missing an entry.');
				return false;
			}
			for ( var j=2; j < 8; j++ ){
				// Check for values > |10|, otherwise we're OK.
				if ( Math.abs(rownew[j]) > 10 ) { 
					alert('Validation Failed: Border modifiers can only go from -10 to +10.');
					return false;
				}
				// We only need one border to be different to add it to the csvchanged.
				if ( rownew[j] != roworiginal[j] ) { 
					csvchanged.push(csvnew[i]);
					break; 
				}
			}
		}
		
		// No reason to submit something that doesn't need changin'.
		if ( csvchanged.length == 0 ) {
			alert('Validation Failed: Export and Import data is identical.');
			return false;
		}
		// Alert on success to be consistent, and to make the blur() work.
		alert('Validation OK: The magical Submit portal creaks open.');
		return true;
	}
}
function ContinentBulkAdd(){
	// var centertag = $('center:eq(1)').append('<input id="MMsubmit" type="submit" value="Add Multiple Continents"/>');
	// $('#MMsubmit').get(0).addEventListener('click',function(ev){
		// var html = '<div id="MMtop" class="MMnotice"><input id="MMcommit" type="submit" value="Commit Changes"/></div>'+
					  // '<div id="MMbottom" class="MMnotice"></div>';
		// centertag
			// .css('display','none')
			// .before(html);
		// var countries = getcountries();
		// var newcanvas = getcanvas('canvas.add','-4'); 
		// var queuecanvas = getcanvas('canvas.tmp','-3');
		// var mousevas = getcanvas('mousevas','-2'); // Draw map mouseover canvas.
		// $('map area').each(function(i){
			// $(this).attr('onClick','return false;');
			// this.addEventListener('mouseover',function(ev){
				// var country = $(this).attr('alt');
				// mousevas[0].beginPath();
				// mousevas[0].lineWidth = 3;
				// mousevas[0].arc(countries[country][0],countries[country][1],10,0,Math.PI*2,true);
				// mousevas[0].stroke();
			// },false);
			// this.addEventListener('mouseout',function(ev){
				// mousevas[0].clearRect(0,0,mousevas[3],mousevas[4]);
			// },false);
		// });
	// },false);
}
function CountryBulkAdd(){
	loadjquery();
	var centertag = $('center:eq(1)').append('<input id="MMsubmit" type="submit" value="Add Multiple Countries"/>');
	$('#MMsubmit').get(0).addEventListener('click',function(ev){
		centertag
			.css('display','none')
			.before('<div id="MMtop" class="MMnotice"><span id="MMtop2"/><input id="MMcommit" type="submit" value="Commit Changes"/></div>');
		var actionkey = $('input[name="actionkey"]').attr('value');
		var actioncount = 1;
		var z = /addcountry\?([mb])id=(\d+)$/.exec(where);
		var autofill = prompt('Enter a prefix if you want to automatically name your countries.\r\n'+
			'[Good for maze or crossword type maps.]\r\n'+
			'Leave blank if you want to enter unique country names.','');
		var mapimage = unsafeWindow.$('input[type="image"]');
		var commitbutton = unsafeWindow.$('#MMcommit');
		mapimage
			.css('cursor','crosshair')
			.attr('id','MMmap')
			.bind('click',function(ev){
				ev.preventDefault();
				var country = ( autofill ) ? autofill+actioncount : prompt('Country Name: ','') ;
				if (country) {
					var position = findPosition(this);
					var x = ev.pageX-position[0];
					var y = ev.pageY-position[1];
					var notice = $('#MMtop2');
					var countryimage = unsafeWindow.$('<img id="img'+actioncount+'">').appendTo('body');
					notice
						.html(country+' : ('+x+','+y+')');
					countryimage
						.css( {'position':'absolute', 'left':ev.pageX-9, 'top':ev.pageY-9} )
						.attr( {'class':'MMcountry', 'src':countrymarker, 'datac':country, 'datax':x, 'datay':y} )
						.draggable({ containment:'#MMmap', scroll:false })
						.bind('drag',function(e,ui) { notice.html(country+' : ('+(ui.position.left-position[0]+9)+','+(ui.position.top-position[1]+9)+')'); })
						.bind('dragstop',function(e,ui){ $(this).attr({ 'datax':ui.position.left-position[0]+9, 'datay':ui.position.top-position[1]+9 }); })
						.bind('mouseout', function(e){ $(this).attr('src',countrymarker); })
						.bind('mouseover',function(e){ 
							$(this).attr('src',countrymarkeron); 
							notice.html(country+' : ('+x+','+y+')');
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
						var url = 'http://warfish.net/war/design/addcountry?' +
							z[1]+'id='+z[2] +
							'&actionkey='+ actionkey +
							'&countryname='+ $(this).attr('datac') +
							'&newloc.x='+ $(this).attr('datax') +
							'&newloc.y='+ $(this).attr('datay');
						actionkey = commit(url);
						notice.progressbar('option', 'value', ( Math.floor( bareach*(i+1) )+barstart) );
						});
				location.href = location.href;
				},false);
	},false);
}
function DiceModifiers(){
	var ask = prompt(
		'Enter the dice you want to check in the format:\n'+
		'    Attacker Dice Sides,Defender Dice Sides\n'+
		'Example - for standard 6 sided dice where:\n'+
		'    The attacker has a +3 modifier.\n'+
		'    The defender has a +1 modifier.\n'+
		'Enter:\n'+
		'    9,7');
	var dice = ask.split(',');
	var loss;
	var response = 'Combination - [Attacker Loss,Defender Loss]\n';
	for ( var i=1; i<4; i++ ){
		for ( var j=1; j<3; j++ ) {
			loss = calculateloss(i,parseInt(dice[0]),j,parseInt(dice[1]),100);
			if ( j>1 && i>1 ) {loss[0] = loss[0]/2; loss[1] = loss[1]/2;}
			loss[0] = Math.floor(loss[0]*100)/100;
			loss[1] = Math.floor(loss[1]*100)/100;
			response += i + ' vs ' + j + ' - ' + loss.toSource() + '\n';
		}
	}
	alert(response);
}
function MapHordify(){
	var continentvalue = prompt('Continent Bonus Value: ','1');
	if(continentvalue){
		$('center:eq(1)')
			.css('display','none')
			.before('<div id="MMtop" class="MMnotice">Retrieving list of borders...</div>');
		$('<rsp/>')
			.appendTo('body')
			.load(where.replace('addcontinent','textborders') + ' table[cellspacing="1"][cellpadding="2"]',function(){
				var z = /addcontinent\?([mb])id=(\d+)$/.exec(where);
				var canvas = getcanvas('canvas','-5');
				var countries = getcountries();
				var hordes = getborders();
				var actionkey = '00000000';
				var notice = $('#MMtop');
				for(var item in hordes){
					notice.html(item);
					var clist = [];
					canvas[0].beginPath();
					canvas[0].arc(countries[item][0],countries[item][1],9,0,Math.PI*2,true);  // x,y,diameter,start,end,clockwise
					canvas[0].fill();
					for (var j=0;j < hordes[item].length;j++){
						clist.push(countries[hordes[item][j]][2]);
						canvas[0].beginPath();
						canvas[0].arc(countries[hordes[item][j]][0],countries[hordes[item][j]][1],9,0,Math.PI*2,true);
						canvas[0].fill();
					}
					var url = 'http://warfish.net/war/design/addcontinent?'+
								 z[1]+'id='+z[2]+
								 '&cid='+countries[item][2]+
								 '&clist='+escape(clist.join(','));
					actionkey = commit(url);
					var url = 'http://warfish.net/war/design/addcontinent?'+
								 z[1]+'id='+z[2]+
								 '&continentname='+ escape(item) +
								 '&unitvalue=1'+
								 '&clist='+escape(countries[item][2]+','+clist.join(','))+
								 '&actionkey='+actionkey+
								 '&submitbutton='+escape('Add continent');
					actionkey = commit(url);
					canvas[0].clearRect(0,0,canvas[3],canvas[4]);				
				}
				location.href = location.href;
		});
	}
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