// ==UserScript==

// @name          picturesearch
// @namespace 	  picturesearch
// @include       http://search.digikey.com/scripts/DkSearch/dksus.dll*
// @include       http://search.digikey.com/us/en/cat/*
// @include       http://www.digikey.com/product-search/*
// @include       http://www.digikey.com/scripts/dksearch/dksus.dll*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

/*Recent Additions
V8. added an update checker
V9. didn't add much
V10.  fixed the apply filters button so it doesn't break the webpage.  There is no BACK mechanism to unclick selections but will be added in future.
V11-14.  now skips pictures that are right next to eachother.  added text filters and checkbox filters.  moved records matching to be in a persistant spot on the screen.  added clear selected and select all visable functions.  
V15.  ?
V16.  6/1/12 - added @include for the switch from search.digikey.com to digikey.com/product-search.  Changed all references to the new url as well.

*/

/*Future Additions
	-add a voltage range filter
	-put extra functions like the apply all visible to a pull down menu
	-Add a normally in stock checkbox
	-Save selected values and update the drill down multi-select boxes either when apply is pressed or automatically
	-Change the way pagination works so more items can be grabbed at will.  Pages [1 5 10 15 20 25 30 40 50] dynamically populate said list. Add GM_Value and a settings area for default list.
*/

var VERSION = 16;
var VERSIONLINK = 'http://userscripts.org/scripts/review/116443';
var serializedInit=0;
var originalLocation = null;
var originalQuantity = null;
var DATETIMEREGEX = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
var history=[];
var pushbuffer = [];
var filterTerms = [];
var TR_DR_REMOVE = true;
var isdrilldownpage = false;

$(document).ready(function(){

$.extend($.expr[":"], {
  "containsIgnoreCase": function(elem, i, match, array) {
     return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
}});  
	
	_log('document ready');
	//GM_setValue('numberofpages', parseInt($('tr:contains("Page"):first').text().split('/')[1].replace(',','')));
	GM_getValue('trdrremove', TR_DR_REMOVE);
	
	if(GM_getValue('trdrremove', TR_DR_REMOVE)){}
	
	if($('#content:contains("To get the most from Digi-Key\'s part search")').size()>0){
		isdrilldownpage = true;
	}
	
	serializedInit=$('form').eq(2).serialize();
	originalLocation = window.location.href;
	originalQuantity = parseInt(originalLocation.split('quantity=')[1]);
	_log('orginial location is '+originalLocation +' original quantity is ' + originalQuantity);
	
	//Automatically sorts links on the Category Results page by lowest price @ quantity 1. **Not on the Drill-Down page**
	$('.catfilterlink').each(function(){
		_log('includes ? '+doesExist('?', $(this).attr('href')));
		if(!doesExist('?', $(this).attr('href'))){ var templink =  $(this).attr('href')+'/page/1?quantity=1&ColumnSort=1000011';}
		else{var templink = $(this).attr('href').split('?')[0]+'/page/1?'+$(this).attr('href').split('?')[1]+'&quantity=1&ColumnSort=1000011';}
		$(this).attr('href', templink);
	});
	
	/*************The following area is for some page initial page formatting***************/
	$('#content>p:first').css({'color':'red','font-size':'25px'});
	$('#content>form>br').replaceWith(' ');  		// save vertical height by removing line breaks in the forms				
	if($('#content:contains("To get the most from Digi")').size() != 0){$('#content>p:first').css({'margin-bottom':'-20px'});}
	$('#content>p:eq(1)').empty();					//remove the directions paragraph that starts with "To get the most from Digi-Key's part search:"
	$('#content>form:eq(1)').wrap('<div id="mainformdiv"/>');
	$('#content>form:eq(1)').attr('id','mainform');
	
	$('#content>p:contains("Click RoHS icon next to part number")').empty();
	var today = new Date();
	today = today.getDate();
	if (GM_getValue('uptodate', true) || (today == GM_getValue('lastupdate', 1000)))
		$('#content>form:first').after('<div id="updateme">picturesearch VER.<b> ' + VERSION + ', </b>last updated on 12/9/11, probably up to date. click <a href ="http://userscripts.org/scripts/show/116443">Here</a> for script homepage</div>');  //display last updated message
	else{
		$('#content>form:first').after('<div id="updateme">picturesearch VER. ' + VERSION + ' last updated on 12/9/11, autocheck reports that you are possibly out of date<a href ="http://userscripts.org/scripts/show/116443">Here</a></div>');  //display last updated message
		$('#updateme').css({'color':'red'});
	}
	$('#updateme').css({'float':'right', 'margin':'0px'});
	
	//add the controldiv and the picturediv to the page.  
	$('#mainformdiv').after('<div id="picked"></div><div id="picturediv"></div>');
	$('#picturediv').after('<div id="controldiv"><span id="togglepics">++ Expand Picture Box ++</span><span id="getnext10p"></span></div>');
	$('#picturediv').css({'border':'1px solid lightgrey', 'height':'65px','margin':'0px','padding':'0px', 'overflow':'hidden'});
	$('#controldiv').css({'padding':'0px', 'margin-top':'6px'});
	$('#controldiv>span').css({'border':'1px solid blue', 'background':'lightblue', 'width':'200px', 'cursor':'pointer', 'padding':'5px', 'margin':'2px', "border-radius": "0px 0px 10px 10px"});
	$('#controldiv>span').hover(function(){$(this).css('background','#BFF4FF');}, function(){$(this).css('background','lightblue');});
	
	$('#content>p:first').after('<div id="totop">^^<a href="#content"><br/>Scrl<br/>To<br/>Top<br/></a>^^</div>');
	$('#totop').css({'border':'1px solid blue','position':'fixed', 'z-index':'4', left:1, top:'50%', 'background':'lightblue', 'cursor':'pointer', "border-radius": "10px px 5px 5px"}).localScroll();
	
	//add additional filters
	// $('#mainformdiv>form').after('<form id="morefilters"><label><input type="checkbox" name="norminstock"><b>Normally Stocking </b></label><label><input type="text" value="10" maxlength="4" size="3" name="pagesmax"> <b>Default number of pages to get</b> </label></form>');
	$('#mainformdiv>form').before('<div id="newfilters"></div>');
	$('#mainformdiv').css({'padding-top':'10px'});
	
	
	$('#content>p:first').attr('id', 'pidd');
	if(isdrilldownpage){
		$('#pidd').css({'position':'fixed','z-index':'50','left':'220px','top':'5px','background-color':'white','padding':'10px', 'border':'2px solid black', 'min-width':200, 'height':50});

	}
	$('#pidd').after('<div id="itemInfo"></div>');
	$('#content>table:first').insertBefore('#content>form>hr:first').css('float','right');
	$('#itemInfo').css({'position':'absolute','z-index':'50','left':'800px','background-color':'white','padding':'10px', 'border':'2px solid blue', 'min-width':200});
	$('#itemInfo').hide();
	
	 $('#content').append('<div id="bigpic"></div>');
	 $('#bigpic').css({'position':'absolute','z-index':'50','left':'800px','background-color':'white','padding':'10px', 'border':'2px solid blue'});
	 $('#bigpic').hide();
	 
	 
	 history.push($('#mainformdiv>form').serialize());
	 formatMainForm();
	 //$('#mainformdiv>form>input[type=submit]').attr('value','Update Filters');
	/*************End of the initial page formatting***************************************/
	
	//bind a toggle expand functionality to the picturediv
	_log('binding #togglepics toggle expand click function');
	$('#togglepics').click(		
		function(){ 
			var numberOfResults = parseInt($('#pidd').text().split(':')[1].replace(',',''));
			_log('toggle picture box was clicked height is currently ' +$('#picturediv').css('height'));
			if(parseInt($('#picturediv').css('height')) < 100){
				$("#picturediv").animate({height: "100%"}, 500 );
				$('#togglepics').text('-- Collapse Picture Box --');
				if((numberOfResults > 25) && ($("#picturediv").children().size() <=25)){
					getRecordsMatching();
				}
			}
			else{
				$("#picturediv").animate({height: "65px"}, 500 );
				$('#togglepics').text('++ Expand Picture Box ++');
			//$('#picturediv').css('height','65px');
			}
		}
	);

	_log('Initial population of #picturediv');
	popPictureDiv();	//populate the picturdiv with the initial results on the first page.  Will only load the first 10 to avoid a heavy initial load.
	checkForUpdates();
	_log('document Ready function ends here ');
});



function formatMainForm(){
	$('#mainformdiv>form>input[type=submit]').attr('value','Update Filters');
	_log('ADD EVENT for all OPTION elements on mouseclick');
	addTextFilters();
	addClearSelected();
	addMultiParamCheckBoxLink();
	addRangeLink();
	$('option').mouseup(function(e){
		if(!e.ctrlKey){
			_log('option ' +$(this).val()+' in '+$(this).parent().attr('name')+' changed by click');
			
			getRecordsMatching();
		}
	});
	
	 _log('ADD EVENT for drilldown SUBMIT input on mouseclick');
	$('#mainformdiv>form>input[type=submit]').click( function(e){
	
		if(!e.ctrlKey){
			_log('Apply Filters button clicked');
			//alert('applied');
			getDrillDown();
			e.preventDefault();
			
		}
	}); 
	
	//more filters click function
	// _log('ADD EVENT for more filters');
	// $('#mainformdiv>form').find('input:checkbox').click(function(e){
		// if(!e.ctrlKey){
			// _log($(this).attr('name')+' checkbox click');
			
		// }
	// });	
	
	_log('ADD EVENT for drill down form checkbox click');
	$('#mainformdiv>form').find('input:checkbox').click(function(e){
		if(!e.ctrlKey){
			_log($(this).attr('name')+' checkbox click');
			getRecordsMatching();
		}
	});	
	
	_log('ADD EVENT for CTRL keyup');
	$('form').keyup(function(e){
		if(e.keyCode==17){
			_log('ctrlUP');
			getRecordsMatching();
		}
	});
	
	
	_log('ADD EVENT for reset function');
	$(':reset').attr('id','resetbutton');
	$("#resetbutton").click( function(e) {
		
		_log($(this).attr('id') + ' has been pressed and event a reset is going to take place');
		$("form").each(function() {
             this.reset();
		});
		$('select>option').removeAttr('selected');		
		$('select').each(function(){
			$(this).find('option:first').removeAttr('selected');		
		});
		e.preventDefault();
		//getDrillDown(serializedInit);
		getRecordsMatching();
	}); 
	
	_log('ADD BACK BUTTON to the main form');
	$('#mainformdiv>form').append('<input type="button" name="BACK" value="Prev DrlDwn" id="filterback" font-size="16px"/>');
	$('#filterback').css({ 'font-size':'16px'});
	$('#filterback').click(function(){
							_log('filterbakc clicked! history length '+history.length);
							if (history.length>0){
								//$('#mainformdiv').empty().append(history.pop().innerHTML);
								formatMainForm();
								//var selecteddata = history.pop();
								//_log('selecteddata is '+selecteddata)
								getDrillDown(history.pop());
							}
						});
}

function getDrillDown(formdata, selects){
	_log('formdata is ' +formdata);
	var serializedFormData = $('#mainformdiv>form').serialize();
	if (formdata != null){ 
		serializedFormData = (formdata);
		_log('formdata is not null and is ' +formdata);
	}
	else{ history.push($('#mainformdiv>form').serialize()); }
	//addPicked();
	$('#mainformdiv').load('http://www.digikey.com/scripts/dksearch/dksus.dll?'+ serializedFormData + ' #content>form:eq(1)', function(){
		formatMainForm();
		$('form>br').replaceWith(' '); 
		serialToSelected(formdata);
		//history.push($('#mainformdiv>form').serialize());
		_log('getDrillDown pushed to history is ' + $('#mainformdiv>form').serialize());
	});
}

function serialToSelected(serialstring){
_log('serialToSelected start')
	serialsplit = serialstring.split('&');
	_log('length of serialsplit '+serialsplit.length + ' ' + serialstring)
	for (var i=0; i<serialsplit.length; i++){
		if(doesExist('PV', serialsplit[i])){
		
		_log(	serialsplit[i]);
		}
	}
_log('serialToSelected end');
}

function addPicked(optiontext){

	_log('addPicked entered');
	//history.push($('#mainformdiv>form').get(0));
	$('option:selected').each(function(){
								var myindex = $(this).parent().parent().index();
								//_log( myindex + $(this).parent().parent().get(0).tagName);
								_log('has been selected ' +$(this).parent().parent().parent().prev().find('th').eq(myindex).text());
							});
	$('#picked').append('<span> '+optiontext+' > </span>');
	_log('addPicked done');
}


function hideSingleResultTable(e){
_log("hideSingleResultTable");
$('#itemInfo').hide();
}


function getRecordsMatching(){
	_log( 'getRecordsMatching');
	$('#pidd').css('color','gray');


	$('#pidd').children().css('font-size','18px');
	$('#pidd').html('looking');
	var serializedFormData = $('#mainformdiv>form:first').serialize().replace('&quantity=1','');
	_log('serialized data is ' + serializedFormData);
	
	$('#pidd').load('http://www.digikey.com/scripts/dksearch/dksus.dll?quantity=1&ColumnSort=1000011&'+ serializedFormData + ' #content>p:first', 
		function(){
			_log('getrecordsMatching first page load');
			
			$('#pidd').css({'position':'fixed','z-index':'50','left':'220px','top':'5px','background-color':'white','padding':'10px', 'border':'2px solid black', 'min-width':200, 'height':50});
			//_log('whats in pidd inside ' +$('#pidd').html());
			//_log('getRecordsMatching numberofpages '+ GM_getValue('numberofpages'));
			var numberofresults = 0;
			try{
				numberofresults = parseInt($('#pidd').text().split(':')[1].replace(',',''));			
			}
			catch(err){	numberofresults = 0;}
			
			$('#pidd').css('color','red');
			$('#pidd').children().css('font-size','25px'); 
			$('#pidd:empty').html('Records matching criteria: 1 -- Look below or click <a href="http://www.digikey.com/scripts/dksearch/dksus.dll?'+ serializedFormData +'">Here</a> to see it.');
			$('#pidd:contains("/")').text('There are 0 Results.');	
			//_log('parseInt of contentPFirst is '+parseInt($('#pidd').text().split(':')[1]));
			if(parseInt($('#pidd').text().split(':')[1].replace(',',''))==1){
				_log('loading product details page');
				$('#content>table:eq(0)').load('http://www.digikey.com/scripts/dksearch/dksus.dll?'+ serializedFormData + ' #content>*', 
					function(){
					$('#errmsgs').prev().empty();
					}
				);
				
			}
			else if(1<numberofresults && numberofresults<=25){
				_log(numberofresults + ' is 25 items or less, no other pages to load');
				$('#content>table:eq(0)').load('http://www.digikey.com/scripts/dksearch/dksus.dll?quantity=1&ColumnSort=1000011&'+ serializedFormData + ' #content>table:eq(1)>*',
					function(){
						$('#picturediv').empty();
						popPictureDiv();
					}
				);
			}
			else{
				_log('loading first page of results');
				if(doesExist('scripts/dksearch/dksus.dll',window.location.href)){
					$('#content>table:eq(0)').load(window.location.href+'?quantity=1&ColumnSort=1000011&page=1&'+ serializedFormData + ' #content>table:eq(1)>*',
						function(){getNextPages();}
					);
				}
				else{
					$('#content>table:eq(0)').load(window.location.href.split('?')[0]+'?quantity=1&ColumnSort=1000011&page=1&'+ serializedFormData + ' #content>table:eq(1)>*',
						function(){getNextPages();}
					 );
				}
			}
	});	
	_log('whats in pidd ' +$('#pidd').html());
}


//get the parent elements <a> of all the product images and assign each one an ID based on its place in the table.  This is used as the anchor point in scrolling when a picture in picturediv is clicked
function popPictureDiv(){
	var pictureset =$('#productTable').find('img').not('[src*="up.gif"]').not('[src*="dn.gif"]').not('[src*="datasheet.gif"]').not('[src*="rohs3.gif"]').not('[src*="NoPhoto_TMB.jpg"]').not('[src*="expanded.png"]').parent();
	pictureset.each(				
		function(mykey, myvalue){
		//_log(pictureset.eq(mykey-1).find('img:first').attr('src') + $(this).find('img:first').attr('src'));
			if(pictureset.eq(mykey-1).find('img:first').attr('src') != $(this).find('img:first').attr('src')){
				var imganchor = $(this);					
				imganchor.attr('id', 'popthumb'+mykey);
				var x = imganchor.children().clone().appendTo('#picturediv').wrap('<a href="#popthumb'+mykey+'"/>');
				x.hover(pictureHoverIn,pictureHoverOut);
				x.hoverIntent(showPictureEnlarge,hidePictureEnlarge);
				x.click(function(){ 
							$('#productTable').find('tr').css('background-color','');
							imganchor.parent().parent().animate({'backgroundColor':'pink'},1500);
							imganchor.parent().parent().animate({'backgroundColor':'lightcyan'},1500);
						}
				);
			}
			else{}
		}
	);
	
	$('#picturediv').localScroll({offset: {top:-300, left:0}});	
}

function showPictureEnlarge(e){	
	_log('showpictureenlarge '+ $(this).attr('src').replace('_tmb',''));
	$('#bigpic').show();
	$('#bigpic').html('<img src="'+$(this).attr('src').replace('_tmb','')+'" height="250" width="250">');
	if($(this).position().left<$('#bigpic').width()-50){
		_log('clipping');
		$('#bigpic').css({'left':$(this).position().left+315 , 'top':$(this).position().top+67});
		}
	else{
		$('#bigpic').css({'left':$('#itemInfo').position().left-$('#bigpic').width()-30 , 'top':$(this).position().top+66});
	}
	$('#bigpic').append('<div id="ha"></div>');
	
}

function hidePictureEnlarge(e){	
$('#bigpic').hide();
}

function pictureHoverIn(e){
	var infoselector= $(this).parent().attr('href').replace('<a href="','').replace('"/>','');
	_log('infoselector is '+$(infoselector).attr('href'));
	var info = '';
	$(infoselector).parent().siblings().each(
		function(mykey,myval){
			info+='<b>'+$('#productTable>thead>tr:first>th:eq('+(mykey+1)+')').text()+'</b> : '+$(this).text()+'<br>';
		}
	);
	$('#itemInfo').html(info).show();
	$('#itemInfo').append('<div id="breakdown"></div>');
	$('#breakdown').load($(infoselector).attr('href')+ ' #pricing');
	if($(this).position().left+200>$(window).width()){
	_log('clipping position'+$(window).width())
		$('#itemInfo').css({'left':$(this).position().left-250 , 'top':$(this).position().top+68});
	}
	else{
		$('#itemInfo').css({'left':$(this).position().left , 'top':$(this).position().top+68});
	}
	$(this).css('border', '2px solid red');
	
}
function pictureHoverOut(e){
	$('#itemInfo').hide();
	$(this).css('border', '');
}

 function getNextPages(startingwith){
	var serializedFormData = $('form').eq(2).serialize();
	var numberofpages = parseInt($('tr:contains("Page"):first').text().split('/')[1].replace(',',''));
		
	var limit = (numberofpages <=10) ? numberofpages : 10;
	_log('limit = '+ limit);
	
	var pcnt = 2;
	for( pcnt=2; pcnt<=limit; pcnt++){
		_log(pcnt);
		$('#productTable>tbody>tr:last').after('<tr class=\'trtemp\' id=\'pload'+pcnt+'\'>Hello</tr>');
	}
	for( pcnt=2; pcnt<=limit; pcnt++){
		//var myurl = 'http://search.digikey.com/scripts/DkSearch/dksus.dll?ColumnSort=1000011&quantity=1&page='+pcnt+'&'+ serializedFormData + ' #productTable>tbody>*';
		if(doesExist('scripts/dksearch/dksus.dll',window.location.href)){
			var myurl = window.location.href+'?quantity=1&ColumnSort=1000011&page='+pcnt+'&'+ serializedFormData + ' #content>table:eq(1)>*'
		}
		else{
			var myurl = originalLocation.split('page/1')[0]+'page/'+pcnt+'?'+originalLocation.split('page/1')[1]+ '&' + serializedFormData + ' #productTable>tbody>*';
		}
		if((pcnt == limit) || (limit==2 && pcnt==2)){
		_log(pcnt+' is the last page to load, now running popPictureDiv myurl is '+ myurl);
			$('#pload'+pcnt+'').load(myurl ,
				function(){
					$(this).replaceWith( $(this).contents()); 
					$('#picturediv').empty();
					popPictureDiv();				
				}
			);
		}
		else{
			_log('page '+ pcnt+' not the last page, going on');
			$('#pload'+pcnt+'').load(myurl,
				function(){
				$('#picturediv').empty();
				popPictureDiv();
				$(this).replaceWith( $(this).contents()); 
			});
		}
	}
	//GM_setValue('loadedpages', );
	$('tr:contains("Page"):first').after("<b>Now displaying first "+ limit +" pages sorted by price at quantity 1.</b>");
	_log('im here');
 }
 
function addTextFilters(){
	$('#mainformdiv>form>table>tbody>tr:first').after('<tr></tr>');
	$('#mainformdiv>form>table>tbody>tr>th').each( function(){
		$(this).parent().next().append('<td><input type="text" rows=1 value="text filter" class="textfilters"></text></td>');
	});
	
	// $('input[type=text]').keydown(function(e){
		// if (e.keyCode==13){
			// var thisitem = $(this);
			// applyTextFilters(thisitem);
			// e.preventDefault();
		// }
	// });
	
	$('#mainformdiv').find('input[type=text]').keyup(function(e){
		var thisitem = $(this);
		applyTextFilters(thisitem);
	});
	
	$('#mainformdiv').find('input[type=text]').focus(function(){
		$(this).val('');
	});
	
	$('#mainformdiv').delegate('.textfilters', 'keydown', function(e){
		_log('e.which is ' + e.which);
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if( keyCode == 13 ) {
			var myinputbox = $(this);
			var myval = myinputbox.val();
			var cellindex = myinputbox.parent().index();
			var tablecolumns = myinputbox.parent().parent().next().children();
			myinputbox.before('<span title="click to remove" class="filterterms">"'+myinputbox.val() + '" and </span>');
			myinputbox.parent().children('span').click(function(){$(this).parent().children('span').remove();}).css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'});
			
			if (tablecolumns.eq(cellindex).find('select>option:selected').size() > 0){
				tablecolumns.eq(cellindex).find('select>option:disabled').removeAttr('selected');
			}
			else{
				tablecolumns.eq(cellindex).find('select>option:containsIgnoreCase('+myval+')').attr('selected', 'selected');
			}
			myinputbox.val('');
			//getRecordsMatching();
			tablecolumns.eq(cellindex).find('select>option').show().removeAttr('disabled');
			$('.selectfiltered').remove();
			e.cancelBubble = true;
			e.returnValue = false;
			if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
			}
		}
	});

	
}

function applyTextFilters(thisitem){
	var cellindex = thisitem.parent().index();
	var myinputbox = thisitem;
	var myval = thisitem.val();
	var tablecolumns = thisitem.parent().parent().next().children();
	var columnname = thisitem.parent().parent().prev().children().eq(cellindex).text();
	_log('text area is changing '+ myval + ' my index is '+ cellindex + ' column name ' + columnname);
	_log(thisitem.parent().parent().next().find('select:eq('+cellindex+')>option').size());
	
	if(myval != ''){
		_log('if myval is '+ myval);
		$('.selectfiltered').remove();
		tablecolumns.eq(cellindex).find('select>option').hide().attr('disabled','disabled');
		tablecolumns.eq(cellindex).find('select>option:containsIgnoreCase('+myval+')').show().removeAttr('disabled');
		thisitem.after('<span class="selectfiltered"><br>select all "<b>' + myval+ '</b>" items </span>')
		$('.selectfiltered').css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'});
	}
	else{
		$('.selectfiltered').remove();
		tablecolumns.eq(cellindex).eq(cellindex).find('select>option').show().removeAttr('disabled');
	}
	
	$('.selectfiltered').click(function(){		
		myinputbox.before('<span title="click to remove" class="filterterms">"'+myinputbox.val() + '" and </span>');
		myinputbox.parent().children('span').click(function(){$(this).remove();});
		$('.filteritems').css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'})
		if (tablecolumns.eq(cellindex).find('select>option:selected').size() > 0){
			tablecolumns.eq(cellindex).find('select>option:disabled').removeAttr('selected');
		}
		else{
			tablecolumns.eq(cellindex).find('select>option:containsIgnoreCase('+myval+')').attr('selected', 'selected');
		}
		myinputbox.val('');
		getRecordsMatching();
		tablecolumns.eq(cellindex).find('select>option').show().removeAttr('disabled');
		$('.selectfiltered').remove();
	});
	

		
}


function addClearSelected(){
	$('#mainformdiv>form>table>tbody>tr:last').after('<tr></tr>');
	_log('addclearselected '+ $('#mainformdiv>form>table>tbody>tr:first>th').size());
	$('#mainformdiv>form>table>tbody>tr:first>th').each( function(){
		 $('#mainformdiv>form>table>tbody>tr:last').append('<td style=text-align:center;><span class="selectvisable">select all visable </span> <br /> <span class="clearselected">clear selected</span></td>');
	});
	$('.clearselected').css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'});
	$('.clearselected').click(function(){
		var cellindex = $(this).parent().index();
		var myremovelink = $(this);
		var tablecolumns = $(this).parent().parent().prev().children();
		tablecolumns.eq(cellindex).find('select>option').removeAttr('selected').removeAttr('disabled').show();
		tablecolumns.eq(cellindex).find('select>option:first').removeAttr('selected');
	});
	$('.selectvisable').css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'});
	$('.selectvisable').click(function(){
		var cellindex = $(this).parent().index();
		var myremovelink = $(this);
		var tablecolumns = $(this).parent().parent().prev().children();
		tablecolumns.eq(cellindex).find('select>option').not(':disabled').attr('selected','selected');
		
	});
}

function addMultiParamCheckBoxLink(){
	//$('select:contains(,)').not(':contains(~)').each( function(mykey, myvalue){
	$('select').each( function(mykey, myvalue){
		var cellindex = $(this).parent().index();
		var selectbox = $(this);
		$(this).parent().parent().parent().find('.clearselected').eq(cellindex).after('<br /><span class="paramchecklink">Checkboxes!!</span>');
		//$('.clearselected').after('<br /><span class="paramchecklink">Checkboxes!!</span>');
		$('.paramchecklink').css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'});
	});
	$('#content').after('<div id="checkboxdiv"><form></form></div>');
	$('#checkboxdiv').hide();
	
	$('.paramchecklink').click(function(){
		var cellindex = $(this).parent().index();
		var selectbox = $(this).parent().parent().prev().children().eq(cellindex).find('select');
		var wordarray = condenseOptions(selectbox);
		$('#checkboxdiv').show().css({'left':$(this).position().left-(selectbox.width()/2) , 'top':$(this).position().top});
		$('#checkboxdiv').css({'position':'absolute','z-index':'50','background-color':'white','padding':'10px', 'border':'2px solid blue'});
		$('#checkboxdiv>form').html('<input type="checkbox"> hello</input>');
		
		var inputhtml= ' <span class="divnotes">note: this is an AND based chooser. <br />Example. option will contain PWM and CAN if checked</span> <span class="closeme">close</span><br /><table><tr>';
		var z=1;
		for( var x=0; x<wordarray.length; x++){
			 inputhtml +='<td><input type="checkbox" value="'+wordarray[x]+'">'+wordarray[x]+'</input></td>';
			if(z>=5){
				inputhtml += '</tr><tr>';
				z=0;
			}
			z++;
		}
		$('#checkboxdiv>form').html(inputhtml+'</tr></table>');
		$('.divnotes').css({'color':'red', 'float':'left'})
		$('.closeme').css({'text-decoration':'underline', 'float':'right','color':'blue', 'cursor':'pointer'});
		$('.closeme').click(function(){
			selectbox.find('option').show().removeAttr('disabled');
			$('#checkboxdiv').hide();  
		});
		$('#checkboxdiv').find('input').click(function(){
			_log($('#checkboxdiv').find('input:checked').size()+' checkbox clicked');
			if($('#checkboxdiv').find('input:checked').size()>0){
				selectbox.find('option').hide().attr('disabled','disabled');
			}
			else{selectbox.find('option').show();}
			var selectstring = 'option';
			$('#checkboxdiv').find('input:checked').each( function(){
				selectstring += ':containsIgnoreCase('+ $(this).val()+ ')';
			});
			selectbox.find(selectstring).show().removeAttr('disabled');
		});
	});
}

function addRangeLink(){
	var rangesvar = null;
	var lastcellindex = null;
	var lastselectbox = null;
	$('#content').after('<div id="rangediv"><span class="divnotes">note: it will only find a raw number. ex 500 will select 400~600mV and 400~600V as well a single 500 option. Functionality is not complete. still doesn\' find multiple ranges separated by a comma and items with the ± symbol</span> <span class="closeme">close</span><br /><form>include <input type="text">units</input></form>press enter to apply filters</div>');
	$('#rangediv').hide();
	$('select:contains(~)').each( function(mykey, myvalue){
		var cellindex = $(this).parent().index();
		var selectbox = $(this);
		$(this).parent().parent().parent().find('.clearselected').eq(cellindex).after('<br /><span class="rangelink">Ranges!!!</span>');
		$('.rangelink').css({'text-decoration':'underline', 'color':'blue', 'cursor':'pointer'});
	});
	$('.rangelink').click(function(){
		var cellindex = $(this).parent().index();
		var selectbox = $(this).parent().parent().prev().children().eq(cellindex).find('select');
		lastcellindex= cellindex;
		lastselectbox = selectbox;
		$('#rangediv').show().css({'left':$(this).position().left-(selectbox.width()/2) , 'top':$(this).position().top});
		$('#rangediv').css({'position':'absolute','z-index':'50','background-color':'white','padding':'10px', 'border':'2px solid blue', 'width': '300px'});
		$('.divnotes').css({'color':'red', 'float':'left'})
		$('.closeme').css({'text-decoration':'underline', 'float':'right','color':'blue', 'cursor':'pointer'});
		$('.closeme').click(function(){
			$('#rangediv').hide();  
		});
		rangesvar = getRanges(selectbox);
	});
	
	$('#rangediv').find('input').keyup(function(){
		var textboxval = $(this).val();
		lastselectbox.children().removeAttr('selected');
		_log($(this).val());
		if ( textboxval != ''){
			for (var x in rangesvar){
				processSingleRange(rangesvar[x], textboxval, lastselectbox); 
			}
			processSingleNumber(textboxval, lastselectbox);
		}
	});
	$('#rangediv').delegate('input', 'keydown', function(e){
		_log('e.which is ' + e.which);
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if( keyCode == 13 ) {
			getRecordsMatching();
			e.cancelBubble = true;
			e.returnValue = false;
			if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
			}
		}
	});
}

function getRanges(selectbox){
	var keypair = [];
	var myoptions = selectbox.find('option');
	//_log(myoptions.size());
	var singlerange = selectbox.find('option:contains(~)').not(':contains(,)').not(':contains(±)');
	
	singlerange.each(function(){
		keypair.push([$(this).text(),$(this).val()]);
	});
	_log('myoptions is '+ myoptions.size() + ' singlerange size is ' + singlerange.size() + ' keypair length is ' + keypair.length);
	return keypair;
}

function processSingleRange(singlekeypair, checkval, selectbox){
	var singlesplit = singlekeypair[0].split('~');
	var firstval = parseFloat(singlesplit[0]);
	var secondval = parseFloat(singlesplit[1]);
	if( secondval > firstval){
		if (firstval <= checkval && checkval <= secondval){
			selectbox.find('option[value='+singlekeypair[1]+']').attr('selected', 'selected');
		}
	}
	else{
		if (secondval <= checkval && checkval <= firstval){
			selectbox.find('option[value='+singlekeypair[1]+']').attr('selected', 'selected');
		}
	}
}

function processSingleNumber(checkval, selectbox){
	selectbox.find('option').not(':contains(,)').not(':contains(~)').not(':contains(±)').each(function(){
		if(parseFloat($(this).text()) == parseFloat(checkval)){
			$(this).attr('selected', 'selected');
		}
	});

}

function condenseOptions(selectbox){
	//var mystring =  selectbox.;
	var masterarray = [];
	selectbox.find('option').each(function(){
		var smalla = $(this).get(0).text.replace('\\n','').replace('\\c','').replace(/\(/,'').replace(/\)/,'').replace(/\./,'').split(',');
		masterarray = masterarray.concat(smalla);
		//_log(masterarray);
	});
	masterarray = uniqueArray(masterarray);
	for(var x=0; x<masterarray.length; x++){
		masterarray[x] = trim(masterarray[x]);
	}
	return uniqueArray(masterarray).sort();
}

function trim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function uniqueArray(ar) {
	var f = {},
	i = 0,
	l = ar.length,
	r = [];
	while (i < l) {
		!f[ar[i]] && r.push(ar[i]);
		f[ar[i++]] = 1;
	}
	return r;
};
 
//My helper functions 
function _log(somestring){
	try{unsafeWindow.console.log('[picturesearch]'+somestring);}
	catch(err){}
}
// doesExist pass it any substring and the innerHTML of the element you are looking in.
function doesExist(astring, inelement){
    return (inelement.indexOf(astring) != -1);
}







/**********************************
The following code is to tell you if there is a newer version of the script available.
**********************************/
function checkForUpdates() {
	var today = new Date();
	today = today.getDate();
	var lastupdate = GM_getValue('lastupdate',1000);
	var dif = today - lastupdate;
	var updatedays = 1; //how many days between update checks (set to 0 to check every time you use search.digikey.com)
	var uurl = 'http://userscripts.org/scripts/review/116443';
	
	if(dif>=updatedays || dif<=-updatedays)
	{
		GM_setValue('lastupdate',today);
		//_log('about to request looking for version ' + version +' or greater');
		GM_xmlhttpRequest({
			method: 'GET',
			url: uurl,
			onload: function (responseDetails) {
				var userScriptsVersion = parseInt(responseDetails.responseText.split('previous versions')[0].split('versions/116443">')[1]);
				//$('#updateme').text(responseDetails.responseText.split('previous versions')[0].split('versions/116443">')[1]);
				//$('#updateme').html(parseInt($('#updateme').text().split('There are <a href="/scripts/versions/116443">')[1]));
				_log('your userscripts version is '+userScriptsVersion + ' and your VERSION is '+ VERSION);
				if(VERSION < userScriptsVersion){
					$('#updateme').html('your picturesearch script is out of date please <a href="'+VERSIONLINK+'">click here</a> to update');
					$('#updateme').css({ 'background':'red', 'font-size':'2em'});
					GM_setValue('uptodate',false);
				}
				else if(userScriptsVersion == VERSION){
					$('#updateme').html('picturesearch script is up to date, to see the script\'s homepage <a href="'+VERSIONLINK+'">click here</a>.');
					GM_setValue('uptodate',true);
				}
				else{
					$('#updateme').text('you are using an unreleased version of picturesearch');
				}
			}
		});
	}
}










/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 500,
			timeout: 15		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};
})(jQuery);
//hoverIntent

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
//end ScrollTo

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

/*
* jQuery Color Animations v@VERSION
* http://jquery.org/
*
* Copyright 2011 John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Date: @DATE
*/

(function( jQuery, undefined ){
var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color outlineColor".split(" "),

// plusequals test for += 100 -= 100
rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
// a set of RE's that can match strings and generate color tuples.
stringParsers = [{
re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
parse: function( execResult ) {
return [
execResult[ 1 ],
execResult[ 2 ],
execResult[ 3 ],
execResult[ 4 ]
];
}
}, {
re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
parse: function( execResult ) {
return [
2.55 * execResult[1],
2.55 * execResult[2],
2.55 * execResult[3],
execResult[ 4 ]
];
}
}, {
re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
parse: function( execResult ) {
return [
parseInt( execResult[ 1 ], 16 ),
parseInt( execResult[ 2 ], 16 ),
parseInt( execResult[ 3 ], 16 )
];
}
}, {
re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
parse: function( execResult ) {
return [
parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
];
}
}, {
re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
space: "hsla",
parse: function( execResult ) {
return [
execResult[1],
execResult[2] / 100,
execResult[3] / 100,
execResult[4]
];
}
}],

// jQuery.Color( )
color = jQuery.Color = function( color, green, blue, alpha ) {
return new jQuery.Color.fn.parse( color, green, blue, alpha );
},
spaces = {
rgba: {
cache: "_rgba",
props: {
red: {
idx: 0,
type: "byte",
empty: true
},
green: {
idx: 1,
type: "byte",
empty: true
},
blue: {
idx: 2,
type: "byte",
empty: true
},
alpha: {
idx: 3,
type: "percent",
def: 1
}
}
},
hsla: {
cache: "_hsla",
props: {
hue: {
idx: 0,
type: "degrees",
empty: true
},
saturation: {
idx: 1,
type: "percent",
empty: true
},
lightness: {
idx: 2,
type: "percent",
empty: true
}
}
}
},
propTypes = {
"byte": {
floor: true,
min: 0,
max: 255
},
"percent": {
min: 0,
max: 1
},
"degrees": {
mod: 360,
floor: true
}
},
rgbaspace = spaces.rgba.props,
support = color.support = {},

// colors = jQuery.Color.names
colors,

// local aliases of functions called often
each = jQuery.each;

spaces.hsla.props.alpha = rgbaspace.alpha;

function clamp( value, prop, alwaysAllowEmpty ) {
var type = propTypes[ prop.type ] || {},
allowEmpty = prop.empty || alwaysAllowEmpty;

if ( allowEmpty && value == null ) {
return null;
}
if ( prop.def && value == null ) {
return prop.def;
}
if ( type.floor ) {
value = ~~value;
} else {
value = parseFloat( value );
}
if ( value == null || isNaN( value ) ) {
return prop.def;
}
if ( type.mod ) {
value = value % type.mod;
// -10 -> 350
return value < 0 ? type.mod + value : value;
}

// for now all property types without mod have min and max
return type.min > value ? type.min : type.max < value ? type.max : value;
}

color.fn = color.prototype = {
constructor: color,
parse: function( red, green, blue, alpha ) {
if ( red === undefined ) {
this._rgba = [ null, null, null, null ];
return this;
}
if ( red instanceof jQuery || red.nodeType ) {
red = red instanceof jQuery ? red.css( green ) : jQuery( red ).css( green );
green = undefined;
}

var inst = this,
type = jQuery.type( red ),
rgba = this._rgba = [],
source;

// more than 1 argument specified - assume ( red, green, blue, alpha )
if ( green !== undefined ) {
red = [ red, green, blue, alpha ];
type = "array";
}

if ( type === "string" ) {
red = red.toLowerCase();
each( stringParsers, function( i, parser ) {
var match = parser.re.exec( red ),
values = match && parser.parse( match ),
parsed,
spaceName = parser.space || "rgba",
cache = spaces[ spaceName ].cache;


if ( values ) {
parsed = inst[ spaceName ]( values );

// if this was an rgba parse the assignment might happen twice
// oh well....
inst[ cache ] = parsed[ cache ];
rgba = inst._rgba = parsed._rgba;

// exit each( stringParsers ) here because we matched
return false;
}
});

// Found a stringParser that handled it
if ( rgba.length !== 0 ) {

// if this came from a parsed string, force "transparent" when alpha is 0
// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
if ( Math.max.apply( Math, rgba ) === 0 ) {
jQuery.extend( rgba, colors.transparent );
}
return this;
}

// named colors / default - filter back through parse function
red = colors[ red ] || colors._default;
return this.parse( red );
}

if ( type === "array" ) {
each( rgbaspace, function( key, prop ) {
rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
});
return this;
}

if ( type === "object" ) {
if ( red instanceof color ) {
each( spaces, function( spaceName, space ) {
if ( red[ space.cache ] ) {
inst[ space.cache ] = red[ space.cache ].slice();
}
});
} else {
each( spaces, function( spaceName, space ) {
each( space.props, function( key, prop ) {
var cache = space.cache;

// if the cache doesn't exist, and we know how to convert
if ( !inst[ cache ] && space.to ) {

// if the value was null, we don't need to copy it
// if the key was alpha, we don't need to copy it either
if ( red[ key ] == null || key === "alpha") {
return;
}
inst[ cache ] = space.to( inst._rgba );
}

// this is the only case where we allow nulls for ALL properties.
// call clamp with alwaysAllowEmpty
inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
});
});
}
return this;
}
},
is: function( compare ) {
var is = color( compare ),
same = true,
myself = this;

each( spaces, function( _, space ) {
var isCache = is[ space.cache ],
localCache;
if (isCache) {
localCache = myself[ space.cache ] || space.to && space.to( myself._rgba ) || [];
each( space.props, function( _, prop ) {
if ( isCache[ prop.idx ] != null ) {
same = ( isCache[ prop.idx ] == localCache[ prop.idx ] );
return same;
}
});
}
return same;
});
return same;
},
_space: function() {
var used = [],
inst = this;
each( spaces, function( spaceName, space ) {
if ( inst[ space.cache ] ) {
used.push( spaceName );
}
});
return used.pop();
},
transition: function( other, distance ) {
var end = color( other ),
spaceName = end._space(),
space = spaces[ spaceName ],
start = this[ space.cache ] || space.to( this._rgba ),
result = start.slice();

end = end[ space.cache ];
each( space.props, function( key, prop ) {
var index = prop.idx,
startValue = start[ index ],
endValue = end[ index ],
type = propTypes[ prop.type ] || {};

// if null, don't override start value
if ( endValue === null ) {
return;
}
// if null - use end
if ( startValue === null ) {
result[ index ] = endValue;
} else {
if ( type.mod ) {
if ( endValue - startValue > type.mod / 2 ) {
startValue += type.mod;
} else if ( startValue - endValue > type.mod / 2 ) {
startValue -= type.mod;
}
}
result[ prop.idx ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
}
});
return this[ spaceName ]( result );
},
blend: function( opaque ) {
// if we are already opaque - return ourself
if ( this._rgba[ 3 ] === 1 ) {
return this;
}

var rgb = this._rgba.slice(),
a = rgb.pop(),
blend = color( opaque )._rgba;

return color( jQuery.map( rgb, function( v, i ) {
return ( 1 - a ) * blend[ i ] + a * v;
}));
},
toRgbaString: function() {
var prefix = "rgba(",
rgba = jQuery.map( this._rgba, function( v, i ) {
return v == null ? ( i > 2 ? 1 : 0 ) : v;
});

if ( rgba[ 3 ] === 1 ) {
rgba.pop();
prefix = "rgb(";
}

return prefix + rgba.join(",") + ")";
},
toHslaString: function() {
var prefix = "hsla(",
hsla = jQuery.map( this.hsla(), function( v, i ) {
if ( v == null ) {
v = i > 2 ? 1 : 0;
}

// catch 1 and 2
if ( i && i < 3 ) {
v = Math.round( v * 100 ) + "%";
}
return v;
});

if ( hsla[ 3 ] == 1 ) {
hsla.pop();
prefix = "hsl(";
}
return prefix + hsla.join(",") + ")";
},
toHexString: function( includeAlpha ) {
var rgba = this._rgba.slice(),
alpha = rgba.pop();

if ( includeAlpha ) {
rgba.push( ~~( alpha * 255 ) );
}

return "#" + jQuery.map( rgba, function( v, i ) {

// default to 0 when nulls exist
v = ( v || 0 ).toString( 16 );
return v.length == 1 ? "0" + v : v;
}).join("");
},
toString: function() {
return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
}
};
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// http://www.google.com/codesearch/p#OAMlx_jo-ck/src/third_party/WebKit/Source/WebCore/inspector/front-end/Color.js&d=7&l=193

function hue2rgb( p, q, h ) {
h = ( h + 1 ) % 1;
if ( h * 6 < 1 ) {
return p + (q - p) * 6 * h;
}
if ( h * 2 < 1) {
return q;
}
if ( h * 3 < 2 ) {
return p + (q - p) * ((2/3) - h) * 6;
}
return p;
}

spaces.hsla.to = function ( rgba ) {
if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
return [ null, null, null, rgba[ 3 ] ];
}
var r = rgba[ 0 ] / 255,
g = rgba[ 1 ] / 255,
b = rgba[ 2 ] / 255,
a = rgba[ 3 ],
max = Math.max( r, g, b ),
min = Math.min( r, g, b ),
diff = max - min,
add = max + min,
l = add * 0.5,
h, s;

if ( min === max ) {
h = 0;
} else if ( r === max ) {
h = ( 60 * ( g - b ) / diff ) + 360;
} else if ( g === max ) {
h = ( 60 * ( b - r ) / diff ) + 120;
} else {
h = ( 60 * ( r - g ) / diff ) + 240;
}

if ( l === 0 || l === 1 ) {
s = l;
} else if ( l <= 0.5 ) {
s = diff / add;
} else {
s = diff / ( 2 - add );
}
return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function ( hsla ) {
if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
return [ null, null, null, hsla[ 3 ] ];
}
var h = hsla[ 0 ] / 360,
s = hsla[ 1 ],
l = hsla[ 2 ],
a = hsla[ 3 ],
q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
p = 2 * l - q,
r, g, b;

return [
Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
Math.round( hue2rgb( p, q, h ) * 255 ),
Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
a
];
};


each( spaces, function( spaceName, space ) {
var props = space.props,
cache = space.cache,
to = space.to,
from = space.from;

// makes rgba() and hsla()
color.fn[ spaceName ] = function( value ) {

// generate a cache for this space if it doesn't exist
if ( to && !this[ cache ] ) {
this[ cache ] = to( this._rgba );
}
if ( value === undefined ) {
return this[ cache ].slice();
}

var type = jQuery.type( value ),
arr = ( type === "array" || type === "object" ) ? value : arguments,
local = this[ cache ].slice(),
ret;

each( props, function( key, prop ) {
var val = arr[ type === "object" ? key : prop.idx ];
if ( val == null ) {
val = local[ prop.idx ];
}
local[ prop.idx ] = clamp( val, prop );
});

if ( from ) {
ret = color( from( local ) );
ret[ cache ] = local;
return ret;
} else {
return color( local );
}
};

// makes red() green() blue() alpha() hue() saturation() lightness()
each( props, function( key, prop ) {
// alpha is included in more than one space
if ( color.fn[ key ] ) {
return;
}
color.fn[ key ] = function( value ) {
var vtype = jQuery.type( value ),
fn = ( key === 'alpha' ? ( this._hsla ? 'hsla' : 'rgba' ) : spaceName ),
local = this[ fn ](),
cur = local[ prop.idx ],
match;

if ( vtype === "undefined" ) {
return cur;
}

if ( vtype === "function" ) {
value = value.call( this, cur );
vtype = jQuery.type( value );
}
if ( value == null && prop.empty ) {
return this;
}
if ( vtype === "string" ) {
match = rplusequals.exec( value );
if ( match ) {
value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
}
}
local[ prop.idx ] = value;
return this[ fn ]( local );
};
});
});

// add .fx.step functions
each( stepHooks, function( i, hook ) {
jQuery.cssHooks[ hook ] = {
set: function( elem, value ) {
value = color( value );
if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
var backgroundColor,
curElem = hook === "backgroundColor" ? elem.parentNode : elem;
do {
backgroundColor = jQuery.curCSS( curElem, "backgroundColor" );
} while (
( backgroundColor === "" || backgroundColor === "transparent" ) &&
( curElem = curElem.parentNode ) &&
curElem.style
);

value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
backgroundColor :
"_default" );
}

value = value.toRgbaString();

elem.style[ hook ] = value;
}
};
jQuery.fx.step[ hook ] = function( fx ) {
if ( !fx.colorInit ) {
fx.start = color( fx.elem, hook );
fx.end = color( fx.end );
fx.colorInit = true;
}
jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
};
});

// detect rgba support
jQuery(function() {
var div = document.createElement( "div" ),
div_style = div.style;

div_style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = div_style.backgroundColor.indexOf( "rgba" ) > -1;
});

// Some named colors to work with
// From Interface by Stefan Petre
// http://interface.eyecon.ro/
colors = jQuery.Color.names = {
aqua: "#00ffff",
azure: "#f0ffff",
beige: "#f5f5dc",
black: "#000000",
blue: "#0000ff",
brown: "#a52a2a",
cyan: "#00ffff",
darkblue: "#00008b",
darkcyan: "#008b8b",
darkgrey: "#a9a9a9",
darkgreen: "#006400",
darkkhaki: "#bdb76b",
darkmagenta: "#8b008b",
darkolivegreen: "#556b2f",
darkorange: "#ff8c00",
darkorchid: "#9932cc",
darkred: "#8b0000",
darksalmon: "#e9967a",
darkviolet: "#9400d3",
fuchsia: "#ff00ff",
gold: "#ffd700",
green: "#008000",
indigo: "#4b0082",
khaki: "#f0e68c",
lightblue: "#add8e6",
lightcyan: "#e0ffff",
lightgreen: "#90ee90",
lightgrey: "#d3d3d3",
lightpink: "#ffb6c1",
lightyellow: "#ffffe0",
lime: "#00ff00",
magenta: "#ff00ff",
maroon: "#800000",
navy: "#000080",
olive: "#808000",
orange: "#ffa500",
pink: "#ffc0cb",
purple: "#800080",
violet: "#800080",
red: "#ff0000",
silver: "#c0c0c0",
white: "#ffffff",
yellow: "#ffff00",
transparent: [ null, null, null, 0 ],
_default: "#ffffff"
};
})( jQuery );

//end color plugin