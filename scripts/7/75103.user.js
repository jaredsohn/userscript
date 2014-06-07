// ==UserScript==
// @name           GLB Date Tracker
// @namespace      GLB
// @description    GLB Date Tracker
// @include        http://goallineblitz.com/game/home.pl
// @require        http://userscripts.org/scripts/source/74204.user.js
// @require		   http://userscripts.org/scripts/source/75099.user.js
// @resource	   liCSS http://userscripts.org/scripts/source/75102.user.js
// @require		   http://userscripts.org/scripts/source/74963.user.js
// ==/UserScript==
// 


$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};

	Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		var part1 = this - onejan;
		var part2 = part1 / 86400000;
		var part3 = part2+onejan.getDay()+1;
		var part4 = part3 / 7;
		return Math.ceil(part4);
	}



    function mdyOrdA(a, b){
		var ahold = new Date(a[0].replace(/-/g,'/'));
		var bhold = new Date(b[0].replace(/-/g,'/'));
        var ayear = ahold.getFullYear();
		var amonth = ahold.getMonth();
		var aday = ahold.getDate();
		var byear = bhold.getFullYear();
		var bmonth = bhold.getMonth();
		var bday = bhold.getDate();
		var aj, bj;
		if (amonth<10) {
			amonth = '0' + amonth;
		}
		if (bmonth<10) {
			bmonth = '0' + bmonth;
		}
		if (aday<10) {
			aday = '0' + aday;
		}
		if (bday<10) {
			bday = '0' + bday;
		}
		aj = parseInt(ayear.toString()+amonth.toString()+aday.toString());
		bj = parseInt(byear.toString()+bmonth.toString()+bday.toString());
		if (aj>bj) return 1;
		if (aj<bj) return -1;
		return 0; 
	}

	function showsets(){
		$('#ticksettable').toggle();
		if ($('#ticklink').text() == 'Show Settings') {
			$('#ticklink').html("Hide Settings");
		}else{
			$('#ticklink').html("Show Settings");
		}
		//resizeDivs();
	}

	function getCal(){
		NewCal('addtickdatetxt','mmddyyyy');
	}

	function getModCal(){
		NewCal('modtickmoddatetxt','mmddyyyy');
	}

	function buildticker(){
		var ticker = buildobj('ul', 'id','ticker01');
		$(ticker).insertBefore($('#setplaceholder'));
		//$('#tickdiv').append(ticker);
		for (var i=0;i<datesarr.length;i++) {
			var objhold = buildobj('li', 'id', 'ddctickli' + i);
			objhold.innerHTML = datesarr[i][0] + ' ' + datesarr[i][1];
			$('ul#ticker01').append(objhold);
		}
		// get existing filter settings and set filt select box
		var tickfiltsaved = GM_getValue('ddcdatetickfilt','');
		if (tickfiltsaved != '') {
			$('#seltickdateview option[value="' + tickfiltsaved + '"]').attr('selected','selected');
		}
		filtchange();
		$('ul#ticker01').liScroll();
		$('#addtickdatetxt').bind('click',getCal, false);
	}

	function buildelements(){
		var tickheadtable = buildobj('table','id','tickheadtable', 'width','100%')
		var	headtr0 = buildobj('tr');
		var headtd0 = buildobj('td', 'width', '33%');
		var headtd1 = buildobj('td', 'width', '33%');
		var headtd2 = buildobj('td', 'width', '33%');
		tickheadtable.appendChild(headtr0);
		headtr0.appendChild(headtd0);
		headtr0.appendChild(headtd1);
		headtr0.appendChild(headtd2);
		var settingsimage = buildobj('div', 'id', 'ticklink');
		settingsimage.innerHTML = 'Show Settings';
		// build import/export for bdays
		var importlink = buildobj('div', 'id', 'tickimplink');
		importlink.innerHTML = 'Import';
		var exportlink = buildobj('div', 'id', 'tickexlink');
		exportlink.innerHTML = 'Export';
		var tickdiv = buildobj('div','id','tickdiv', 'style', 'padding-left: 13px; padding-top: 13px; padding-bottom: 13px;');
		headtd0.appendChild(settingsimage);
		headtd1.appendChild(importlink);
		headtd2.appendChild(exportlink);

		// build drop down for filtering
		var selticktext = document.createTextNode('Set Filter:');
		var seltickdateview = buildobj('select','id','seltickdateview');
		seltickdateview.options[0] = new Option('All Dates','0', true, true);
		seltickdateview.options[1] = new Option('This Month','1', false, false);
		seltickdateview.options[2] = new Option('This Week','2', false, false);
		seltickdateview.options[3] = new Option('Today','3', false, false);
		var settickdiv = buildobj('div','id','settickdiv','style', 'border: 1px solid #000; height: 102px; padding: 5px');
		var settickheadbold = buildobj('b');
		var settickheadital = buildobj('i');
		var settickhead = document.createTextNode('Ticker Settings');
		settickheadbold.appendChild(settickhead);
		settickheadital.appendChild(settickheadbold);
		// build input for adding bdays
		var addtickheadbold = buildobj('b');
		var addtickheadital = buildobj('i');
		var addtickdiv = buildobj('div','id','addtickdiv', 'style', 'border: 1px solid #000; height: 102px; padding: 5px');
		var addtickhead = document.createTextNode('Add New Date');
		addtickheadbold.appendChild(addtickhead);
		addtickheadital.appendChild(addtickheadbold);
		var addtickdatebox  = buildobj('input','type', 'text', 'id', 'addtickdatetxt', 'size','15','readonly',"readonly");
		var addtickdateimg = buildobj('img', 'src', "http://www.javascriptkit.com/script/script2/cal.gif", 'width',"16", 'height', "16", 'border',"0", 'alt',"Pick a date");
		var addtickdatetxt = document.createTextNode('Date: ');
		var addticknamebox  = buildobj('input','type', 'text', 'id', 'addticknametxt', 'size','35');
		var addticknametxt = document.createTextNode('Note: '); 
		var addtickrecurchk  = buildobj('input','type', 'checkbox', 'id', 'addtickrecurchk');
		var addtickrecurtxt = document.createTextNode('Recurring: '); 
		var addticknametxtmore = document.createTextNode('(This can contain HTML formatting {ex: <a href="http://www.ebay.com" target="_blank">eBay</a>})');
		var addtickbutton = buildobj('input','type','button','id','addtickbutton','value','Add');
		var cleartickbutton = buildobj('input','type','button','id','cleartickbutton','value','Clear');
		var brobj01 = buildobj('br');
		var brobj02 = buildobj('br');
		var brobj03 = buildobj('br');
		var brobj04 = buildobj('br');
		var brobj11 = buildobj('br');
		var brobj12 = buildobj('br');
		var brobj13 = buildobj('br');
		var brobj14 = buildobj('br');
		var brobj21 = buildobj('br');
		var brobj22 = buildobj('br');
		var brobj23 = buildobj('br');
		var brobj24 = buildobj('br');
        // build drop down for filtering
		var modticktext = document.createTextNode('Mod/Del:');
		var modtickdateview = buildmodselect();
		var modtickdiv = buildobj('div','id','modtickdiv','style', 'border: 1px solid #000; height: 102px; padding: 5px');
		var modtickheadbold = buildobj('b');
		var modtickheadital = buildobj('i');
		var modtickhead = document.createTextNode('Modify Existing');
		modtickheadbold.appendChild(modtickhead);
		modtickheadital.appendChild(modtickheadbold);
		var modtickdelbut = buildobj('input','type', 'button','id','modtickdelbut','value','Delete');
		var modtickmodbut = buildobj('input','type', 'button','id','modtickmodbut','value','Modify');
		var modtickplacehold = buildobj('input','type', 'text','id','modtickplacehold');
		var modtickmoddiv = buildobj('div','id','modtickmoddiv','style', 'border: 0px solid #000; padding: 5px');
		var modtickdatebox = buildobj('input','type', 'text', 'id', 'modtickmoddatetxt', 'size','15','readonly',"readonly");
		var modtickdateimg = buildobj('img', 'src', "http://www.javascriptkit.com/script/script2/cal.gif", 'width',"16", 'height', "16", 'border',"0", 'alt',"Pick a date");
		var modtickdatetxt = document.createTextNode('Date: ');
		var modticknamebox  = buildobj('input','type', 'text', 'id', 'modticknametxt', 'size','35');
		var modticknametxt = document.createTextNode('Note: '); 
		var modtickrecurchk  = buildobj('input','type', 'checkbox', 'id', 'modtickrecurchk');
		var modtickrecurtxt = document.createTextNode('Recurring: '); 

		var ticksettable = buildobj('table', 'id', 'ticksettable', 'width','100%')
		var tickrow0 = buildobj('tr');
		var tickrow1 = buildobj('tr');
		var tickcell00 = buildobj('td','width','33%');
		var tickcell01 = buildobj('td','width','33%');
		var tickcell02 = buildobj('td','width','33%');
		var tickcell10 = buildobj('td','width','33%');
		var tickcell11 = buildobj('td','width','33%');
		var tickcell12 = buildobj('td','width','33%');
		ticksettable.appendChild(tickrow0);
		ticksettable.appendChild(tickrow1);
		tickrow0.appendChild(tickcell00);
		tickrow0.appendChild(tickcell01);
		tickrow0.appendChild(tickcell02);
		tickrow1.appendChild(tickcell10);
		tickrow1.appendChild(tickcell11);
		tickrow1.appendChild(tickcell12);
		tickcell00.appendChild(settickheadital);
		tickcell01.appendChild(addtickheadital);
		tickcell10.appendChild(settickdiv);
		tickcell11.appendChild(addtickdiv);
		tickcell02.appendChild(modtickheadital);
		tickcell12.appendChild(modtickdiv);
		modtickdiv.appendChild(modticktext);
		modtickdiv.appendChild(modtickdateview);
		//insert placeholder (hidden text);
		modtickdiv.appendChild(modtickplacehold);
		modtickdiv.appendChild(brobj21);
		modtickdiv.appendChild(modtickmodbut);
		modtickdiv.appendChild(modtickdelbut);
		modtickmoddiv.appendChild(modtickdatetxt);
		modtickmoddiv.appendChild(modtickdatebox);
		modtickmoddiv.appendChild(modtickdateimg);
		modtickmoddiv.appendChild(brobj22);
		modtickmoddiv.appendChild(modtickrecurtxt);
		modtickmoddiv.appendChild(modtickrecurchk);
		modtickmoddiv.appendChild(brobj23);
		modtickmoddiv.appendChild(modticknametxt);
        modtickmoddiv.appendChild(modticknamebox);
		modtickdiv.appendChild(modtickmoddiv);
		settickdiv.appendChild(selticktext);
		settickdiv.appendChild(seltickdateview);
		addtickdiv.appendChild(addtickdatetxt);
		addtickdiv.appendChild(addtickdatebox);
		addtickdiv.appendChild(addtickdateimg);
		addtickdiv.appendChild(brobj11);
		addtickdiv.appendChild(addtickrecurtxt);
		addtickdiv.appendChild(addtickrecurchk);
		addtickdiv.appendChild(brobj12);
		addtickdiv.appendChild(addticknametxt);
        addtickdiv.appendChild(addticknamebox);
		addtickdiv.appendChild(brobj13);
		addtickdiv.appendChild(addticknametxtmore);
		addtickdiv.appendChild(brobj14);
		addtickdiv.appendChild(addtickbutton);
		addtickdiv.appendChild(cleartickbutton);
		$(tickdiv).insertBefore($('#tabs'));
		$('#tickdiv').addClass("content_container");
		var headbrobj = buildobj('br');
		var setplaceholder = buildobj('input','type','text','id','setplaceholder');
		$('#tickdiv').append(setplaceholder);
		$('#setplaceholder').hide();

		$('#tickdiv').append(headbrobj);
		$('#tickdiv').append(tickheadtable);
		//$('#tickdiv').append(importlink);
		//$('#tickdiv').append(exportlink);

		$('#tickdiv').append(ticksettable);
		buildticker();
		$('#ticklink').bind('click', showsets);
		$('#tickimplink').bind('click', importtick, false);
		$('#tickexlink').bind('click', exporttick, false);
		$('#ticksettable').hide();
		$('#seltickdateview').bind('change',filtchange,false);
		$('#modtickplacehold').hide();
		$('#modtickmoddiv').hide();
		addtickdateimg.addEventListener('click',getCal, false);
		modtickdateimg.addEventListener('click',getModCal, false);
		addtickbutton.addEventListener('click',addNewDate, false);
		cleartickbutton.addEventListener('click',clearaddboxes, false);
		modtickdateview.addEventListener('change',fillmodboxes, false);
		modtickmodbut.addEventListener('click',modbuttonclick, false);
		modtickdelbut.addEventListener('click',delDate, false);
		//resizeDivs();
	}

	function exporttick(){
		var exportwindow=window.open('',"Export", "width=580,height=120,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
		if (!exportwindow.opener) exportwindow.opener = self;
		var GMarr = eval(GM_getValue('ddcdatetickerdates','[]'));
		var GMStr ='';
		for (var i=0; i<GMarr.length;i++) {
			GMStr += GMarr[i].join('$%*@');
			GMStr += '@*%$';
		}
		GMStr = GMStr.substring(0, GMStr.length -4);
		GMStr = GMStr.replace(/</g,'DDC@#$%^');
		exportwindow.document.writeln(GMStr);
	}

	function importtick(){
		var importstr = prompt("Please paste in the previously exported string: (without any line breaks)",'');
		if (importstr!='') {
			var tokeep = confirm("Click OK to add to existing dates, Click Cancel to overwrite existing dates");
			var temparr1= importstr.split('@*%$');
			var fullarr = new Array;
			for (var i=0;i<temparr1.length;i++) {
				fullarr[i] = temparr1[i].split('$%*@');
			}
			for (var q=0;q<10;q++) {
				for (var i=0;i<fullarr.length;i++) {
					for (var z=0;z<fullarr[i].length;z++) {
						fullarr[i][z] = fullarr[i][z].replace('DDC@#$%^','<');
					}
				}
			}
			if (tokeep) {
				var dateslen = datesarr.length;
				for (var i=0;i<fullarr.length;i++) {
					datesarr[i+dateslen] = new Array;
					datesarr[i+dateslen][0] = fullarr[i][0];
					datesarr[i+dateslen][1] = fullarr[i][1];
					datesarr[i+dateslen][2] = fullarr[i][2];
					GM_setValue('ddcdatetickerdates',uneval(datesarr));
				}
			}else{
				GM_setValue('ddcdatetickerdates',uneval(fullarr));
			}
			window.location.reload();
		}
	}


	function delDate(){
		if ($('#modtickdateview').attr('value') == '') {
			alert('You must select an item to delete.');
		}else{
			var reallydel=confirm("Do you really want to delete this item?");
			if (reallydel) {
				arrtoGM(parseInt($('#modtickdateview').attr('value')));
				$('#modtickmoddiv').hide();
				$('#ticker01').parent().parent().remove();
				$('#ticker01').remove();
				buildticker();
				clearaddboxes();
				$('#modtickdateview').remove();
				var modtickdateview = buildmodselect();
				$(modtickdateview).insertBefore($('#modtickplacehold'));
				modtickdateview.addEventListener('change',fillmodboxes, false);
				$('#modtickmodbut').attr('value',"Modify");
			}
		}

	}

	function modbuttonclick(){
		if ($('#modtickmodbut').attr('value')=="Modify") {
			if ($('#modtickdateview').attr('value') == '') {
				alert('You must select an item to modify');
			}else{
				$('#modtickmoddiv').show();
				$('#modtickmodbut').attr('value',"Apply");
			}
			
		}else{
			var dateval = $('#modtickmoddatetxt').attr('value');
			var datename = $('#modticknametxt').attr('value');
			if (dateval!='' && datename!='') {
				var modselvalue = $('#modtickdateview').attr('value');
				datesarr[modselvalue][0] = dateval;
				datesarr[modselvalue][1] = datename;
				if ($('#modtickrecurchk').attr('checked')) {
					datesarr[modselvalue][2]='1';
				}else{
					datesarr[modselvalue][2]='0';
				}
				$('#modtickmoddiv').hide();
				datesarr.sort(mdyOrdA);
				arrtoGM();
				$('#ticker01').parent().parent().remove();
				$('#ticker01').remove();
				buildticker();
				clearaddboxes();
				$('#modtickdateview').remove();
				var modtickdateview = buildmodselect();
				$(modtickdateview).insertBefore($('#modtickplacehold'));
				modtickdateview.addEventListener('change',fillmodboxes, false);
				$('#modtickmodbut').attr('value',"Modify");
			}else{
				alert('You cannot have an empty date or name for modification.');
			}
		}
	}

	function fillmodboxes(){
		// get value from mod select box
		var selmodvalue = $('#modtickdateview').attr('value');
		// fill other mod boxes with info
		$('#modtickmoddatetxt').attr('value',datesarr[selmodvalue][0]);
		$('#modticknametxt').attr('value',datesarr[selmodvalue][1]);
		if (datesarr[selmodvalue][2]=='1') {
			$('#modtickrecurchk').attr('checked', true);
		}else{
			$('#modtickrecurchk').attr('checked', false);
		}
	}

	function buildmodselect(){
		var modtickdateview = buildobj('select','id','modtickdateview');
		modtickdateview.options[0] = new Option('','', true, true);
		for (var i=0;i<datesarr.length;i++) {
			var jqtext = $(datesarr[i][1]).text();
			if (jqtext == '') {
				modtickdateview.options[i+1] = new Option(datesarr[i][0] + ' ' + datesarr[i][1],i, false, false);
			}else{
				modtickdateview.options[i+1] = new Option(datesarr[i][0] + ' ' + $(datesarr[i][1]).text(),i, false, false);
			}

		}
		return modtickdateview;
	}


	function addNewDate(){
		var insertcnt = datesarr.length;
		var dateval = $('#addtickdatetxt').attr('value');
		var datename = $('#addticknametxt').attr('value');
		if (dateval!='' && datename!='') {
			datesarr[insertcnt] = new Array;
			datesarr[insertcnt][0] = $('#addtickdatetxt').attr('value');
			datesarr[insertcnt][1] = $('#addticknametxt').attr('value');
			if ($('#addtickrecurchk').attr('checked')) {
				datesarr[insertcnt][2] = '1';
			}else{
				datesarr[insertcnt][2] = '0';
			}
			datesarr.sort(mdyOrdA);
			arrtoGM();
			$('#ticker01').parent().parent().remove();
			$('#ticker01').remove();
			buildticker();
			clearaddboxes();
			$('#modtickdateview').remove();
			var modtickdateview = buildmodselect();
			$(modtickdateview).insertBefore($('#modtickplacehold'));
			modtickdateview.addEventListener('change',fillmodboxes, false);
		}else{
			alert('Both date and Name must have a value');
			return false;
		}
	}

	function clearaddboxes(){
		$('#addtickdatetxt').attr('value','');
		$('#addticknametxt').attr('value','');
		$('#addtickrecurchk').attr('checked', false);
	}

	function arrtoGM(delitem){
		if (typeof(delitem)!='number') {
			GM_setValue('ddcdatetickerdates',uneval(datesarr));
		}else{
			var savearr = new Array;
			if (datesarr.length==1) {
				alert('You cannot delete the only item. There must be at least one item.');
			}else{
				for (var i=0;i<datesarr.length;i++) {
					if (i!=delitem) {
						savearr.push(datesarr[i]);
					}
				}
				GM_setValue('ddcdatetickerdates',uneval(savearr));
				datesarr = savearr;
				$('#ticker01').parent().parent().remove();
				$('#ticker01').remove();
				buildticker();
				clearaddboxes();
				$('#modtickdateview').remove();
				var modtickdateview = buildmodselect();
				$(modtickdateview).insertBefore($('#modtickplacehold'));
				modtickdateview.addEventListener('change',fillmodboxes, false);
			}
			
		}
	}


	function resizeDivs(){
		var lead =0;
		var minheight = 10;
		$('#settickdiv, #addtickdiv, #modtickdiv').each(function(Z){
            var height = $(this).attr('offsetHeight');
            $(this).children().each(function(zw){
                var s = 0;
                if ($(this).attr('offsetHeight') != null) {
                    s += $(this).attr('offsetHeight');
                }
                
                if (s > height) {
                    height = s;
                }
            })
        
            height += lead;
            if (height>minheight) {
                minheight = height;
            }
        });
        $('#settickdiv, #addtickdiv, #modtickdiv').each(function(Z){
            var newStyle = "height: "+minheight+"px;";
        	var style = $(this).attr("style");
            if (typeof(style) != 'undefined') {
                if (style.indexOf('height: ')>-1) {
                    var styleexistingheight = style.substring(style.indexOf('height: '),style.indexOf('px;',style.indexOf('height: ')+8)+3);
                    style = style.replace(styleexistingheight,'');
                }
            
                if (style != null) {
                    newStyle += style;
                }
            }
            $(this).attr("style",newStyle);
        });
	}


	function filtchange(){
		var selvalue = $('#seltickdateview').attr('value');
        //save gm value
		GM_setValue('ddcdatetickfilt',selvalue);
		//make change to li ticker
		for(var i=0;i<datesarr.length;i++) {
			if (datesarr[i][2] == '1') {
				var itemdate = new Date(datesarr[i][0].replace(/-/g,'/'));
				//var itemdate = new Date(curyear, parseInt(datesarr[i][0].substring(0,datesarr[i][0].indexOf('-')))-1,parseInt(datesarr[i][0].substring(datesarr[i][0].indexOf('i')+1, datesarr[i][0].indexOf('-', datesarr[i][0].indexOf('-')+1))));
			}else{
				var itemdate = new Date(datesarr[i][0].replace(/-/g,'/'));
				//var itemdate = new Date(parseInt(datesarr[i][0].substring(datesarr[i][0].indexOf('-', datesarr[i][0].indexOf('-')+1) + 1,datesarr[i][0].length)), parseInt(datesarr[i][0].substring(0,datesarr[i][0].indexOf('-')))-1,parseInt(datesarr[i][0].substring(datesarr[i][0].indexOf('-')+1, datesarr[i][0].indexOf('-', datesarr[i][0].indexOf('-')+1))));
			}
			switch(selvalue) {
				case '0':
					$('#ticker01 li').show();
					break;
				case '1':
					if ((itemdate.getMonth()+1) == curmonth) {
						$('#ddctickli' + i).show();
					}else{
						$('#ddctickli' + i).hide();
					}
					break;
				case '2':
					if(itemdate.getWeek() == currentDate.getWeek()) {
						$('#ddctickli' + i).show();
					}else{
						$('#ddctickli' + i).hide();
					}
					break;
				case '3':
					if (((itemdate.getMonth()+1) == curmonth) && (itemdate.getDate() == curday) && (itemdate.getFullYear() == curyear)) {
						$('#ddctickli' + i).show();
					}else{
						$('#ddctickli' + i).hide();
					}
					break;
			}
		}
	}

	 

	// 	add liCSS css to head
	var liCSS = GM_getResourceText("liCSS");
	GM_addStyle(liCSS);
	
	// get list of stored GM_Dates
	var datesarr = eval(GM_getValue('ddcdatetickerdates','[]'));
	// get current date
	var currentDate = new Date();
	var curmonth = currentDate.getMonth() + 1;
	var curday = currentDate.getDate();
	var curyear = currentDate.getFullYear();
	

	// build list for scrolling
	if (datesarr.length==0) {
		datesarr[0] = new Array;
		datesarr[0][0] = '2-14-2010';
		datesarr[0][1] = '<a href="http://en.wikipedia.org/wiki/Valentine%27s_Day" target="_blank">Valentines Day</a>';
		datesarr[0][2] = '1';
		datesarr[1] = new Array;
		datesarr[1][0] = '12-25-2010';
		datesarr[1][1] = 'Christmas';
		datesarr[1][2] = '1';
		datesarr[2] = new Array;
		datesarr[2][0] = '7-4-2010';
		datesarr[2][1] = '<a href="http://www.usa.gov/Topics/Independence_Day.shtml" target="_blank">Independence Day</a>';
		datesarr[2][2] = '1';
		datesarr[3] = new Array;
		datesarr[3][0] = '11-14-1980';
		datesarr[3][1] = '<a href="http://goallineblitz.com/game/home.pl?user_id=18490" target="_blank">DDCs Bday</a>';
        datesarr[3][2] = '1';
	}
	datesarr.sort(mdyOrdA);
	buildelements();

	
})
