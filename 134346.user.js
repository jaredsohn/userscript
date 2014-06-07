// ==UserScript==
// @description      Select a quantity and confirm bazaar purchases without the 2 extra page loads
// @include          *.torn.com/bazaar.php?userid=*
// @name             Bazaar purchase confirm
// @namespace        notused
// @require          https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
// @require          https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.js
// ==/UserScript==	

//note above, jquery 1.5.2 when torn uses jquery 1.7.1 the only reason we are using a different version is greasemonkey operates in a firefox sandbox, and there is a bug in newer versions of jquery which causes it not to function as expected sometimes in a sandbox. If the script were injected directly into the html outside of the sandbox, and without jquery 1.5.2 available it should work fine.


//torn has a custom version of JqueryUI's default css, but they have removed some un-needed entries from it.
// /css/custom-theme/jquery-ui-1.8.17.custom.css
//we need some of those removed entries, but we don't want to over-ride torn's default theme, so we will inject JqueryUI's default css 
//before anything else. the css renderer will use the last value encountered and torn's custom theme will over-ride jqueryui's theme
//and we will have the missing values which are primarily needed for button alignment.
$('head').prepend('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />');

//adds commas
function formatCurrency(a)
{
	var b = (a + "").split(".");
	var c = b[1] || "";
	a = b[0].replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
	return (c) ? a + "." + c : a
}	

$('a[href*="bazaar.php?step=buy"]').click(function(event) 
	{
	event.preventDefault();
	
	//get the item name
	itemname = $(this).parent().find('a[href*="iteminfo.php"]').html();	
	//find out how many is available  (1,101,100 in stock) 
	var quantavailstr = $(this).parent().find('font[size="1"]').html();
	var quantavail = quantavailstr.replace(' in stock)', '').replace('(', '').replace(',','');
	//get the url from the anchor
	var buyURL = $(this).attr('href');
	//get the price
	var price = $(this).prev().html().replace(',','').replace('$','');
	
	//show a dialog asking them to confirm triggered by the OK button of the how many dialog
	function confirm(quant, aURL)
		{		
		//the page asking you to confirm contains:
		//<form action="bazaar.php?step=buy2&itemID=283&userID=927477&confirm=1&price=16400000" method="post">
		//<br>Are you sure you would like to buy 1 x<b> Axe </b>for<b> $3,400 </b>?
		//<input type="hidden" value="1" name="amount">
		//<input type="hidden" value="3400" name="beforeval">
		//<br><br>
		//<input type="submit" value="Buy Items">
		//</form>
				
		var bURL = aURL + '&confirm=1' + '&beforeval=' + price + '&amount='+ quant;
		
		var ConfirmHTML = 'Are you sure you want to buy '+ quant +' <b>'+  itemname +'</b> for $'+ formatCurrency(quant * price) + '?';
		var dialog = $('<div></div>').html(ConfirmHTML).dialog(
			{
			modal: true,
			title: "<font color='white'>Confirm</font>",
			//height: 530,
			width: 500,
			resizable: false,
			buttons: 
				{ 
				"Yes": function() 
					{	
					//alert('The user clicked yes!');
					var Myform = $('<form></form>').html('<input type=submit value=Buy>').attr('action', bURL).attr('method', 'post');
					//alert(Myform.attr('action'));//bazaar.php?step=buy2&itemID=401&userID=1549948&price=200&amount=1&confirm=1&beforeval=200
										//alert(Myform.attr('method'));
					$('body').append(Myform);
					//Myform.html('<input type=submit value=Buy>');
					//Myform.submit();
					//close the dialog now
					$(this).dialog("close");
					//clear the html 
					//this actually isn't needed, we are going to a new page so it will be gone anyway.
					$(this).html('');
					}, 
				"No": function() 
					{
					$(this).dialog("close");  
					$(this).html('');
					}
				}
			})
		}
	
	//switch step=buy to step=buy2
	buyURL = buyURL.replace('step=buy', 'step=buy2');
	
	//if there is only one of the item in the bazaar, there is no reason to show the how many dialog
	if(quantavail == 1) 
		{
		confirm(1, buyURL);	
		return false;
		}
	
	//show a dialog asking how many	
	//the anchors href=bazaar.php?step=buy&itemID=283&userID=927477&price=16400000
	var HowManyHTML = 'How many of the item <b>'+ itemname +'</b> do you want to buy?<br><input type=text name="DialogAmount" size=4 maxlength=4 value=1><br> ';
	var dialog = $('<div></div>').html(HowManyHTML).dialog(
			{	
			//the page on torn asking how many contains:
			//<form method='post' action=bazaar.php?step=buy2&itemID=283&userID=927477&price=16400000>
			//<tr bgcolor=#DFDFDF>
			//<td><b>Donator Pack</b> x2 </td>
			//<td><b>$16,400,000</b></td>
			//<td align='center'><input type=text name='amount' size=4 maxlength=4 value=1></td>
			//<td align='center'><input type=submit value=Buy></td>
			modal: true,
			title: "<font color='white'>How many "+ itemname +" would you like to buy?</font>",
			//height: 530,
			//width: 320,
			resizable: false,
			buttons: 
				{ 
				"Ok": function() 
					{					
					//close the dialog before showing the confirm dialog
					$(this).dialog("close");
					confirm($('input[name="DialogAmount"]').attr('value'), buyURL);
					//clear the html
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

//<a href="bazaar.php?step=buy&itemID=618&userID=434912&price=12000">Buy</a>