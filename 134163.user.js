// ==UserScript==
// @description      This script allows you to set default quantities and prices on the bazaar add items page.
// @include          *.torn.com/bazaar.php*
// @name             Bazaar Fast Add
// @namespace        notused
// @require          https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
// @require          https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.js
// ==/UserScript==	

var itemQuantRegexp = /<b>(.*?)<\/b>( x(\d+))?/;

function fixNaN(a,def){return isNaN(a)?def||0:a;}

function getArrayValue(storageName)
	{//fills an array from a value stored by GM_setValue
	var result = [];
	var datastr = GM_getValue(storageName);
	if(!datastr)return result;
	var hashes = datastr.split(',');
	var hash;
    for(var i = 0; i < hashes.length; i++)
		{
		hash = hashes[i].split('=');
		result[hash[0]] = hash[1];
		}
	return result;
	}	
	
function setArrayValue(storageName, arrayToStore)
	{//stores an array using gm_setValue for later retrieval (only works for simple arrays)
	if(storageName == 'iteminfo') return;//protection from having to rebuild the iteminfo database remove when working for auto update
	if(arrayToStore && arrayToStore.length>0)
		{
		var datastr = "0=0";
		for (var q=1;q<arrayToStore.length;q++)
		  if(arrayToStore[q] && !( arrayToStore[q] === ''))
		    datastr += "," + q + "=" + arrayToStore[q];
		GM_setValue(storageName, datastr);
		}
	}

var quanthistory = getArrayValue('quantities');//quantities by item number	
var hidehistory = getArrayValue('hideHistory');//hidden items by item number
var pricehistory = getArrayValue('prices');//saved prices by item number
//to save use:
//	setArrayValue('quantities', quanthistory);
//	setArrayValue('prices', pricehistory);
//  setArrayValue('hideHistory', hidehistory);
	

function fix_missing_form_tag()
	{
	//remove the arrow ">" next to the back buttons
	var anchors = document.getElementsByTagName('a');
	var theAnchor = anchors[anchors.length - 1];  //the back anchor is the last anchor on the page.
	theAnchor.parentNode.removeChild(theAnchor.previousSibling);
	
	//fix the failure to add "</form>" to the end of the form leaving the page end inside the form
	for(var a=0; a<5; a++){$('form[name="massadd"]').after(( $('form[name="massadd"] > :last-child') ));}
	}
	
function fixRowColors()
	{
	//the table has alternating dark and light colors.
	//by moving items around we throw these colors off.
	//this fixes it.
	$('tr[name="itemrow"]').removeClass('bgAlt1 bgAlt2');	
	$('tr[name="itemrow"]').filter(":even").toggleClass('bgAlt1', true);
	$('tr[name="itemrow"]').filter(":odd").toggleClass('bgAlt2', true);
	}
	
	
//this command is set up for easy removal if they fix the missing form tag
fix_missing_form_tag();	

//do some prep work to save time later when there are multiple forms to work with.
$('form[name="massadd"] table tbody tr').each(function()
	{
	if ($(this).attr('class') == 'bgSubHead') return true;//do not do this stuff for the table footer
	//add the tag name=itemrow to each TR in the table to save time finding it later
	$(this).attr('name', 'itemrow');
	//add the tag which and the item number of the item listed on the row.
	var itemnum = $(this).find('input[type="hidden"]').attr('value');
	$(this).attr('which' ,itemnum);
	//add the tag quantavail and the quantity available for each tr. 
	$tds = $(this).find("td");
	var item_quan = fixNaN(parseInt( $tds.eq(0).html().match(itemQuantRegexp)[3] ), 1);
	$(this).attr('quantavail', item_quan);
	$(this).attr('itemname', $tds.eq(0).html().match(itemQuantRegexp)[1]);
	});		

//inject a small script into the html to make the tabs work
var scpt = '<script type="text/javascript">$(function() {$("#tabs").tabs();});</script>';
$('form[name="massadd"]').before(scpt);

//now inject the tab container
var container = '<div class="TabbedBazaar"><div id="tabs"><ul><li><a href="#tabs-1">Enhanced</a></li><li><a href="#tabs-2">Regular</a></li><li><a href="#tabs-3">Hidden items</a></li></ul><div id="tabs-1"><p>The main page, this is where the user will do the most once set up.</p></div><div id="tabs-2"></div><div id="tabs-3"><p>This page is for restoring items hidden on the enhanced bazaar page.</p></div></div></div>';
$('form[name="massadd"]').after(container);


$(".TabbedBazaar").css("width","90%");//add the css property width=90%
$('#tabs-2').append($('form[name="massadd"]'));//move the original table to tab-2
$('form[name="massadd"] table').css("width","100%");//change the css property of the original table to 100%	
$('form[name="massadd"]').clone().appendTo('#tabs-1');//copy the original table to tab-1
$('#tabs-1 form[name="massadd"]').attr('name', 'custommassadd');//change the name of the form on tab 1
$('form[name="custommassadd"]').clone().appendTo('#tabs-3');//copy the table to tab-3
$('#tabs-3 form[name="custommassadd"]').attr('name', 'hiddenitemmassadd');//change the name of the form on tab 3

//at this point, tab-1 contains a form named 'custommassadd', tab-2 contains one named 'massadd', and tab-3 'hiddenitemmassadd'
//next step clear the items from 'hiddenitemmassadd' to prepare for hiding.
$('form[name="hiddenitemmassadd"] table tbody tr').each(function()
	{
	if ($(this).attr('class') == 'bgSubHead') return true;//do not do this stuff for the table footer
	$(this).remove();
	});	

//next is to add links/buttons to hide the items on 'custommassadd' and restore the items on 'hiddenitemmassadd'
//add a section to the headers for looks
$('form[name="custommassadd"] table thead tr').prepend('<th width="1%">&nbsp;</th>');
$('form[name="hiddenitemmassadd"] table thead tr').prepend('<th width="1%">&nbsp;</th>');
//add a section to each row for the link
$('form[name="custommassadd"] table tbody tr[class*="bgAlt"]').prepend('<td name="customlinks"><a name="hideanchor">Hide</a>&nbsp;<a name="setdefaultprice">customize</a></td>');
//change the colspan of the footer for looks
$('form[name="custommassadd"] table tbody tr[class*="bgSubHead"] td').attr('colspan', '5');
$('form[name="hiddenitemmassadd"] table tbody tr[class*="bgSubHead"] td').attr('colspan', '5');
//assign the function to the anchor
$('a[name=hideanchor]').click(function ()
	{
	curloc = $(this).parent().parent('[class*="bgAlt"]').parent().parent().parent().attr('name');
	whichItem = $(this).parent().parent().attr('which');
	if(curloc == 'custommassadd')
		{
		$(this).html('Show');
		$(this).parent().parent('[class*="bgAlt"]').prependTo('form[name="hiddenitemmassadd"] table tbody');
		//needs to save the fact that this item is hidden
		hidehistory[whichItem] = 'true';
		setArrayValue('hideHistory', hidehistory);
		}
		else
		{
		$(this).html('Hide');
		$(this).parent().parent('[class*="bgAlt"]').prependTo('form[name="custommassadd"] table tbody');
		//needs to save the fact that we un-hide this item
		hidehistory[whichItem] = '';
		setArrayValue('hideHistory', hidehistory);
		}
	fixRowColors();
	});

//then we need to move all previously hidden items from 'custommassadd' to 'hiddenitemmassadd'
//we can also input the previously saved information here
$('form[name=custommassadd] tr[name=itemrow]').each(function()
	{
	var which = $(this).attr('which');
	var quantavail = $(this).attr('quantavail');
	var q = quanthistory[which];
	q = (q > 0)? ((q > quantavail)? quantavail: q) : 
		((q == 0)? quantavail : 
		(((q*-1) >= quantavail)? 0 : 
		(quantavail - (q*-1))));
	if(quantavail >= q)
		{
		$(this).find('input[name="amount[]"]').attr('value', ((q > quantavail)?quantavail:q));
		$(this).find('input[name="price[]"]').attr('value', pricehistory[which]);
		}
	if(hidehistory[$(this).attr('which')] === 'true')
		{
		$(this).children('td').children('a[name="hideanchor"]').html('Show');
		$(this).prependTo('form[name=hiddenitemmassadd] table tbody');
		}
	});
fixRowColors();

//we prepend jquery-ui's default css to gain the additional css without a lot of work.
//torn's css will come after this css, and will over-ride some values leaving the one's we need intact.
$('head').prepend('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />');	

//then comes the interface for how many to auto-add on 'custommassadd' and the pricing interface for pricing at the price given before.
//<a name="setdefaultprice">
$('a[name="setdefaultprice"]').click(function ()
	{
	var itemname = $(this).parent().parent().attr('itemname');
	var quantavail = $(this).parent().parent().attr('quantavail');
	var itemnum = $(this).parent().parent().attr('which');
	var currentprice = pricehistory[itemnum]? pricehistory[itemnum] : '';
	// !(quanthistory[itemnum] === undefined)
	var currentquant = (!(quanthistory[itemnum] === undefined) && quanthistory[itemnum]!=9999)? quanthistory[itemnum] : 'all';
	var priceBox = $(this).parent().parent().find('input[name="price[]"]');
	var quantbox = $(this).parent().parent().find('input[name="amount[]"]');
	
	var NewHTML = 	'<center><br>Quantity: "all" = all you have<br>'+
						'A positive number means exactly that many<br>'+
						'A negative number means all but that many<br></center>'+
						'<br><br><center><table>'+
						'<tr><td>Quantity</td><td><input name="quant" type="text" value="'+ currentquant +'"></input></td></tr>'+
						'<tr><td>Price</td><td><input name="price" type="text" value="'+ currentprice +'"></input></td></tr>'+
						'</table><br>To remove an item from auto-fill<br>clear the quantity and press OK</center>';
	var dialog = $('<div></div>').html(NewHTML).dialog(
		{
		modal: true,
		title: "<font color='white'>Set default price and quantity for: "+ itemname +"</font>",
		//height: 530,
		width: 320,
		resizable: false,
		buttons: 
			{ 
			"Ok": function() 
				{
				//this is where we save the data
				//var q = $('input[name="quant"]').val();
				//var p = $('input[name="price"]').val();
				var q = $('input[name="quant"]').attr('value');
				var p = $('input[name="price"]').attr('value');
				
				q = (q == 'all')? 9999 : q;
				quanthistory[itemnum] = q;
				pricehistory[itemnum] = p;
				if (q == '')
					{						
					quanthistory[itemnum] = '';
					pricehistory[itemnum] = '';
					setArrayValue('quantities', quanthistory);
					setArrayValue('prices', pricehistory);
					quantbox.attr('value', '');
					priceBox.attr('value', '');
					$(this).dialog("close");
					$(this).html('');
					return;
					}
				//save the info gained for later recall
				setArrayValue('quantities', quanthistory);
				setArrayValue('prices', pricehistory);
				q = (q > 0)? ((q > quantavail)? quantavail: q) : 
					(((q*-1) >= quantavail)? 0 : 
					(quantavail - (q*-1)));
				if(quantavail >= q)
					{
					quantbox.attr('value', ((q > quantavail)?quantavail:q));
					priceBox.attr('value', p);
					}
				
				//close the dialog now
				$(this).dialog("close");
				//leave a quick thanks to E-oreo here for his help solving a problem. http://forums.devshed.com/javascript-development-115/input-box-changes-not-recognized-907457.html
				$(this).html('');
				}, 
			"Cancel": function() 
				{
				$(this).dialog("close");  
				$(this).html('');
				}
			}
		})
	});
	
		