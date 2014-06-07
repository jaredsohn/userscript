// Last Updated: August 12th 2006
// Lead Programmer: Littlemac
// Zee
// Nstarz
// Works Best on Firefox 1.5.0.4
//
// ==UserScript==
// @name          ImproveNeo 0.8
// @namespace     http://improveneo.com/improveneo/
// @description   Various improvements to the Neopets Website
// @include       http://neopets.com/*
// @include       http://www.neopets.com/*
// @include       www.neopets.com/*
// @include       neopets.com/*
// ==/UserScript==
/*
NEW
---
Bug Fix for Stock Recommendations -> No Stocks caused it to fail.
Bug Fix for Best Price Seen -> Less than 5 results would cause it to fail.
Bug Fix for Best Price Seen -> Less than 5 results would cause it to not gather price.
Bug Fix for DIPR -> If rows returned was less then the user specified, it would fail.
Bug Fix for Price Reporting- > Needed more than 6 rows
DIPR in User Shops
DIPR in Inventory
DIPR Anywhere...
Customizable Buy Recommendation Options
Customizable DIPR -> Fixed in upper right
Best Price Seen So Far-> OnClick makes it disappear.
Auction Integration with iPricing
If linked to ShopWiz includes item, make it "Identical to String" 
Bargain Alert can be turned off
Price Reporting -> No minimum/rarity reported...
Update Checker -> Every 2 days
*/

var version = 0.8;

function NumericCheck(name){var regex = /[^0-9]/;if(regex.test(name)){return false;}else{return true;}}   //Eventually may want to get rid of this.
function addGlobalStyle(css){var head, style;head = document.getElementsByTagName('head')[0];if (!head){return;}style = document.createElement('style');style.type = 'text/css';style.innerHTML = css;head.appendChild(style);}
//-------------------------------ADBLOCK---------------
adblock = GM_getValue('adblock', 'on');
if (adblock == 'on')
{
	addGlobalStyle('#neocharge{display:none !important;}#ban {display:none;}#nothing{display:none;}#bottomban{display:none !important;}'); 
}
//-----------------------------------------------------------------ImproveNeo Preference Page-----------------------------------------


function createnewbutton(name,prefname,text)
{
	prefvalue = GM_getValue(prefname, 'on');
	if (prefvalue == 'on')
	{
		document.body.innerHTML +="<h3 id='" + name + "' class='on'>" + text +"</h3>";
	}
	else
	{
		document.body.innerHTML +="<h3 id='" + name + "' class='off'>" + text + "</h3>";
	}
}


//-----------------------------------MenuBar thingy
GM_registerMenuCommand("ImproveNeo Preferences", function(){
style = ".on{font-weight:bold; background-color:#A9DE68;}";
	style += ".off{font-weight:bold;background-color:white;}";
	style += "h3{background-color:white;width:300px;padding:10px;border:1px solid black;margin-top:30px;margin-bottom:30px;}";
	style += ".options{border-left:1px solid black; border-bottom:1px solid black; border-right:1px solid black; width:300px; margin-top:-30px;padding:10px;}";
	addGlobalStyle(style);

	var wizshop = GM_getValue('usc', "on");
	var adblock = GM_getValue('adblock', "on");
	var stockrec = GM_getValue('stockrec', "on");
	var dipr = GM_getValue('dipr', "on");
	var auctioni = GM_getValue('auctioni', "on");
	var lpssr = GM_getValue('lpssr', "on");
	var pd = GM_getValue('pricedatabase', "on");
	document.body.innerHTML = "<center><h1>ImproveNeo Preferences</h1></center><br />";
	createnewbutton('adblockon','adblock','Ad-Blocking');
	createnewbutton('lpssron','lpssr','Best Price Seen');
	createnewbutton('wizshopon','usc','Cookie Grabber Warning');
	createnewbutton('shopdescdelete','shopdescdelete','Shop Description Deletion');
	createnewbutton('pricedatabase','pricedatabase','Add to ImproveNeo iPricing');
	createnewbutton('auctioni','auctioni','Auction Integration with ImproveNeo iPricing');
	createnewbutton('bargainalert','bargainalert','Bargain Alert');
	
	diprfixed = GM_getValue('diprfixed', "true");
	diprnumrowscurrent = GM_getValue('diprnumrows','5');
	if (dipr == 'on')
	{
		document.body.innerHTML +="<h3 id='dipron' class='on'>Dynamic Item Price Retrieval</h3>";
		if(diprfixed == "true")
		{
			document.body.innerHTML += "<div id='diproptions' class='options'>Fixed in Top Right Corner: <input id='diprfixed' type='checkbox' value='true' name='diprfixed' CHECKED><br/>Number of Rows : <input id='diproption1' type='text' value='" + diprnumrowscurrent + "'></div>";
		}
		else
		{
			document.body.innerHTML += "<div id='diproptions' class='options'>Fixed in Top Right Corner: <input id='diprfixed' type='checkbox' value='true' name='diprfixed'><br/>Number of Rows : <input id='diproption1' type='text' value='" + diprnumrowscurrent + "'></div>";
		}
	}
	else
	{
		document.body.innerHTML +="<h3 id='dipron' class='off'>Dynamic Item Price Retrieval</h3>";
		document.body.innerHTML += "<div id='diproptions' class='options' style='display:none;'>";
	}
/*
	auctionicompact = GM_getValue('auctionicompact', "false");
	auctionibargain = GM_getValue('auctionibargain','20');
	if (auctioni == 'on')
	{
		document.body.innerHTML +="<h3 id='auctioni' class='on'>Auction iPricing Integration</h3>";
		if(auctionicompact == "true"){
			document.body.innerHTML += "<div id='auctionioptions' class='options'>Compact Results (By getting rid of certain columns) : <input id='auctionicompact' type='checkbox' value='true' name='auctionicompact' CHECKED><br/>Percent Below iPricing Price Before Considered Bargain : <input id='auctionioption1' type='text' value='" + auctionibargain + "'></div>";
		}
		else
		{
			document.body.innerHTML += "<div id='auctionioptions' class='options'>Compact Results (By getting rid of certain columns) : <input id='auctionicompact' type='checkbox' value='true' name='auctionicompact'><br/>Percent Below iPricing Price Before Considered Bargain : <input id='auctionioption1' type='text' value='" + auctionibargain + "'></div>";
		}
	}
	else
	{
		document.body.innerHTML +="<h3 id='auctioni' class='off'>Auction iPricing Integration</h3>";
		document.body.innerHTML += "<div id='auctionioptions' class='options' style='display:none;'>";
	}
*/
	stocksellpricecurrent = GM_getValue('stocksellprice','60');
	stockbuypricemin = GM_getValue('stockbuypricemin','15');
	stockbuypricemax = GM_getValue('stockbuypricemax','15');
	if (stockrec == 'on')
	{
		document.body.innerHTML +="<h3 id='stockrecon' class='on'>Stock Recommendations</h3>";
document.body.innerHTML +="<div id='stockrecoptions' class='options'>Buying Price : From <input style='width:30px;' id='stockrecoption2' type='text' value='" + stockbuypricemin + "'> to <input style='width:30px;' id='stockrecoption3' type='text' value='" + stockbuypricemax + "'><br/>Selling Price : <input id='stockrecoption1' type='text' value='" + stocksellpricecurrent + "'></div>";
	}
	else
	{
		document.body.innerHTML +="<h3 id='stockrecon' class='off'>Stock Recommendations</h3>";

document.body.innerHTML +="<div id='stockrecoptions' class='options' style='display:none;'>Selling Price : <input id='stockrecoption1' type='text' value='" + stocksellpricecurrent + "'></div>";

	}
	ab = document.getElementById('shopdescdelete');
	ab.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('shopdescdelete','off'); this.className='off';  }else{ GM_setValue('shopdescdelete','on'); this.className='on';}   },false);
	ba = document.getElementById('bargainalert');
	ba.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('bargainalert','off'); this.className='off';  }else{ GM_setValue('bargainalert','on'); this.className='on';}   },false);
	ah = document.getElementById('pricedatabase');
	ah.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('pricedatabase','off'); this.className='off';  }else{ GM_setValue('pricedatabase','on'); this.className='on';}   },false);
	ak = document.getElementById('lpssron');
	ak.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('lpssr','off'); this.className='off';  }else{ GM_setValue('lpssr','on'); this.className='on';}   },false);
	ai = document.getElementById('diproption1');
	ai.addEventListener('keyup',function(){if (NumericCheck(this.value)){GM_setValue('diprnumrows',this.value);}else{GM_setValue('diprnumrows','5');}},false);
	//bi = document.getElementById('auctionioption1');
	//bi.addEventListener('keyup',function(){if (NumericCheck(this.value)){GM_setValue('auctionibargain',this.value);}else{GM_setValue('auctionibargain','20');}},false);
	aj = document.getElementById('stockrecoption1');
	aj.addEventListener('keyup',function(){if (NumericCheck(this.value)){GM_setValue('stocksellprice',this.value);}else{GM_setValue('stocksellprice','60');}},false);
	ad = document.getElementById('stockrecoption2'); //buymin
	ad.addEventListener('keyup',function(){if (NumericCheck(this.value)){GM_setValue('stockbuypricemin',this.value);}else{GM_setValue('stockbuypricemin','60');}},false);
	af = document.getElementById('stockrecoption3'); //buymax
	af.addEventListener('keyup',function(){if (NumericCheck(this.value)){GM_setValue('stockbuypricemax',this.value);}else{GM_setValue('stockbuypricemax','60');}},false);
	am = document.getElementById('diprfixed'); 
	am.addEventListener('click',function(){if(document.getElementById('diprfixed').checked){GM_setValue('diprfixed',"true");}else{GM_setValue('diprfixed','false');}},false);
	be = document.getElementById('auctioni');
	be.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('auctioni','off'); this.className='off'; document.getElementById('auctionioptions').style.display = "none";  }else{ GM_setValue('auctioni','on'); this.className='on';document.getElementById('auctionioptions').style.display = "block";}               },false);
	
	//bn = document.getElementById('auctionicompact'); 
	//bn.addEventListener('click',function(){if(document.getElementById('auctionicompact').checked){GM_setValue('auctionicompact',"true");}else{GM_setValue('auctionicompact','false');}},false);
	
	aa = document.getElementById('wizshopon');
	aa.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('usc','off'); this.className='off';  }else{ GM_setValue('usc','on'); this.className='on';}           },false);
	ac = document.getElementById('stockrecon');
	ac.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('stockrec','off'); this.className='off'; document.getElementById('stockrecoptions').style.display = "none"; }else{ GM_setValue('stockrec','on'); this.className='on'; document.getElementById('stockrecoptions').style.display = "block";  }   },false);
	ae = document.getElementById('dipron');
	ae.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('dipr','off'); this.className='off'; document.getElementById('diproptions').style.display = "none";  }else{ GM_setValue('dipr','on'); this.className='on';document.getElementById('diproptions').style.display = "block";}               },false);
	ag = document.getElementById('adblockon');
	ag.addEventListener('click',function(){if (this.className == 'on') {GM_setValue('adblock','off'); this.className='off'; document.getElementById('options').style.display = "none";  }else{ GM_setValue('adblock','on'); this.className='on';document.getElementById('options').style.display = "block";}            },false);	
});
//-----------------------------Large functions
numrun = 0;
function getwizresults(rawdataid,resultsid,itemname,shiftoption)
{
	displayitemname = itemname;
	itemname = escape(itemname);
	diprnumrows = GM_getValue('diprnumrows','5');
	diprfixed = GM_getValue('diprfixed','true');
	GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.neopets.com/portal/supershopwiz.phtml=' + itemname + '&table=shop&criteria=exact&min_price=&max_price=',
				headers: {
				'User-agent': 'Mozilla/4.0 (compatible)',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Referer': 'http://www.neopets.com/portal/supershopwiz.phtml',
				    },
				   onload: function(responseDetails) {
				texttosplit = responseDetails.responseText;
				if (texttosplit.indexOf("<b>Amount in Stock</b>") > -1)
				{
				array1 = texttosplit.split("<b>Amount in Stock</b></td><td align=center  bgcolor='#dddd77'><b>Price</b></td></tr>");
				array2 = array1[1].split("<p><center><form action='market.phtml' method='post'><input type='hidden' name='type' value='wizard'>");
				re = /ffffcc/gi;
				newstr = array2[0].replace(re,"A9DE68");
				re = /ffffee/gi;
				newstr = newstr.replace(re,"A9DE68");
				re = /browseshop.phtml/gi;
				newstr = newstr.replace(re,"http://www.neopets.com/browseshop.phtml");
				document.getElementById(rawdataid).innerHTML = newstr;	
				var wizresults = "<fieldset style='z-index:1; background-color:#A9DE68; border:1px solid black;'><legend style='background-color:white;border:1px solid black;'>ImproveNeo - ShopWiz Results - " + displayitemname + "</legend><table>";
				allDivs = document.evaluate("//div[@id='" + rawdataid + "']/tr",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var i = 0; i < allDivs.snapshotLength; i++) 
				{
					if(i < diprnumrows)  //Bugfix, if there were less rows returned then in diprnumrows, it would fail
					{
					thisDiv = allDivs.snapshotItem(i);
					wizresults += thisDiv.innerHTML + "</tr>";
					}
				}
				wizresults += "</table></fieldset>";
				document.getElementById(resultsid).innerHTML = wizresults;
				if (diprfixed == "true")
				{
					document.getElementById(resultsid).style.position = "fixed";document.getElementById(resultsid).style.top = "50px";document.getElementById(resultsid).style.right = "50px";
				}
				if (numrun == 0 && shiftoption != false)
				{
					window.addEventListener('keydown',function(event){if (event.shiftKey==1 && event.keyCode ==70){if (document.getElementById(resultsid).style.position != "fixed"){document.getElementById(resultsid).style.position = "fixed";document.getElementById(resultsid).style.top = "50px";document.getElementById(resultsid).style.right = "50px";}else{document.getElementById(resultsid).style.position = "relative";document.getElementById(resultsid).style.top = "0px";document.getElementById(resultsid).style.right = "0px";}}},false);
				}
				numrun++;
				//We need at least three to get good indicator.
				if(diprnumrows >= 3) 
				{
					prices = new Array(5);
					allDivs = document.evaluate("//div[@id='" + resultsid + "']/fieldset//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
					for (var i = 0; i < 6; i++) 
					{
						thisDiv = allDivs.snapshotItem(i);
						if(thisDiv.innerHTML.indexOf("NP") > -1)
						{
							prices[i] = thisDiv.innerHTML.replace("NP","");
							prices[i] = prices[i].replace(",","");
						}
					}
					var average = Math.round((parseFloat(prices[3])+parseFloat(prices[5]))/2);
					pd = GM_getValue('pricedatabase', 'on');
					if (pd == 'on')
					{
					GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://improveneo.com/dev/submitprice.php?price=' + average + '&name=' + itemname,
					headers: {
					'User-agent': 'Mozilla/4.0 (compatible)',
					'Accept': 'application/atom+xml,application/xml,text/xml',
					    },
					   onload: function(responseDetails) {}    });
					}
				}
				}
				else
				{
					alert('There were no results for ' + displayitemname + '. Perhaps it is unbuyable, or you are shopwiz banned!');
				}
			    }
			});
}
//Auction iPricing Integration
if (document.location.href.match('auctions.phtml') && !document.location.href.match('type=bids') && !document.location.href.match('auction_id=')) 
	{	
		var auctioni = GM_getValue('auctioni', "on");
		if (auctioni == "on")
		{
		items = new Array(20);
		curprices = new Array (20);
		a = 0;
		//Item's Current Prices
		allDivs = document.evaluate("//table[@width='100%']//tr//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++)
		{
			thisDiv = allDivs.snapshotItem(i);
			if(i > 10 && ((i-5)%8 == 0))
			{
			itemprice = thisDiv.innerHTML;
			itemprice = itemprice.split("<b>");
			itemprice = itemprice[1].split("</b>");
			itemprice = itemprice[0];
			itemprice = parseFloat(itemprice);
			curprices[a] = itemprice;
			a++;
			}

		}
		a = 0;
		allDivs = document.evaluate("//table[@width='100%']//tr",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++)
		{
			thisDiv = allDivs.snapshotItem(i);
			if(i == 0)
			{
				thisDiv.innerHTML += "<td bgcolor='#dddd77'><b>iPricing Price</b></td>";
			}
			if((thisDiv.innerHTML.indexOf("type=bids") > -1) && (thisDiv.innerHTML.indexOf("randomfriend.phtml") > -1))
			{
			thisDiv.innerHTML += "<td class='realprice'></td><td class='alert'></td>";
			}
		}

		allDivs = document.evaluate("//a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++)
		{
			thisDiv = allDivs.snapshotItem(i);
			if((thisDiv.href.indexOf("type=bids") > -1) && (thisDiv.innerHTML.indexOf("img src") < 0))
			{
			items[a] = thisDiv.innerHTML;
			a++;
			}
		}
		vurl = "http://www.improveneo.com/dev/getprice.php?name=";
		for (var i = 0; i < 20; i++)
		{
			vurl += escape(items[i]) + ";";
		}

GM_xmlhttpRequest({
				method: 'GET',
				url: vurl,
				headers: {
				'User-agent': 'Mozilla/4.0 (compatible)',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Referer': 'http://neopets.com/market.phtml?type=wizard',
				    },
				   onload: function(responseDetails) 
			{
			prices = responseDetails.responseText.split(",");
			a = 0;
			allDivs = document.evaluate("//td[@class='realprice']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allDivs.snapshotLength; i++)
			{
			thisDiv = allDivs.snapshotItem(i);
			if(prices[a] != "0000")
			{
			thisDiv.innerHTML = "<b>" + prices[a] + "</b>";
			}
			a++;
			}
			a = 0;
			allDivs = document.evaluate("//td[@class='alert']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allDivs.snapshotLength; i++)
			{
			thisDiv = allDivs.snapshotItem(i);
			if(prices[a] != "0000" && (curprices[a] <= prices[a] * 0.8))
			{
			thisDiv.style.backgroundColor = "A9DE68";
			}
			a++;
			}
		}})

	}	
		
	}

//-------------------------------------------Shop Descriptions Off-----------------
if (document.location.href.indexOf("browseshop.phtml") > -1 && document.location.href.indexOf("owner=") > -1)
{
	shopdescdelete = GM_getValue('shopdescdelete', "on");
	if (shopdescdelete == 'on')
	{
		var ownerallowed = false;
		usersallowed = GM_getValue('shopdescdeleteusers','');
		usersallowedarray = usersallowed.split(",");

		shopowner = document.location.href.split("owner=");
		shopowner = shopowner[1].split("&");
		shopowner = shopowner[0];
		usersallowed = GM_getValue('shopdescdeleteusers','');
		usersallowedarray = usersallowed.split(",");
		for (var i = 0; i < usersallowedarray.length; i++)
		{
			if (usersallowedarray[i] == shopowner)
			{
			ownerallowed = true;
			}
		}
			allDivs = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allDivs.snapshotLength; i++) 
			{
				thisDiv = allDivs.snapshotItem(i);
				if (thisDiv.innerHTML.indexOf(" (owned by ") > -1)
				{
					if (ownerallowed == false)
					{
						//Get rid of description, store it into div for alter retrieval if neccessary
						array1 = thisDiv.innerHTML.split("to report shop.");
						array2 = array1[1].split("<hr noshade=\"noshade\" size=\"1\" width=\"75%\">");
						if (array2[0].indexOf("<b>Item not found!</b>") > -1)
						{
							//Checking for more specific. Some shops apparently have different size fonts. SBG book shop is one of em.
							//http://www.neopets.com/browseshop.phtml?owner=sbg_bookstore&buy_obj_info_id=1539230&buy_cost_neopoints=4006
							if (array2[0].indexOf("<p align=\"center\"><b>Item not found!</b></p>") > -1)
							{
							array3 = array2[0].split("<p align=\"center\"><b>Item not found!</b></p>");
							}
							else
							{
							array3 = array2[0].split("<b>Item not found!</b>");
							//Bug - This causes it to not be centered. A replace doesn't seem to work for some reason.
							}
						}
						else
						{
							//pages != 1 don't have an empty tr row. Get rid of it.
							array2[0] = array2[0].replace("<tr></tr>","");
							//array3 = array2[0].split("<table align=\"center\" border=\"0\"><tbody><tr></tr><tr><td align=\"center\" valign=\"top\" width=\"120\"><a href=\"buy_item.phtml")
							array3 = array2[0].split("<table align=\"center\" border=\"0\"><tbody><tr><td align=\"center\" valign=\"top\" width=\"120\"><a href=\"buy_item.phtml")
						}
						button = "<div id='shopdesc'></div><center><input style='margin-top:10px;background-color:#A9DE68; border:1px solid black;' type='submit' id='shopdescon' value='Turn on User Description for this user's shop'></center>";
						thisDiv.innerHTML = thisDiv.innerHTML.replace(array3[0],button);
						if (array3[1] != null)
						{
							//thisDiv.innerHTML = thisDiv.innerHTML.replace(button,button);
							//thisDiv.innerHTML = thisDiv.innerHTML.replace(array3[1],array3[1] + button);
							
						}
						//Fix all the bad CSS!!!!
						document.body.style.backgroundImage = "url('')";
						document.body.style.backgroundColor = "white";
						document.body.style.fontColor = "black";
						el = document.getElementById('shopdescon');
						el.addEventListener('click',function(){
						if (this.value.indexOf("Turn off") > -1)
						{
							
							usersallowed = usersallowed.replace(shopowner+",","");
							GM_setValue('shopdescdeleteusers',usersallowed);
							document.getElementById('shopdesc').innerHTML = "";
							this.value = "Turn On User Description";
						}
						else
						{
							usersallowed += shopowner + ",";
							GM_setValue('shopdescdeleteusers',usersallowed);
							document.getElementById('shopdesc').innerHTML = array3[0];
							this.value = "Turn off User Description";
						}
						},false);
					}
					else
					{
						array1 = thisDiv.innerHTML.split("to report shop.");
						array2 = array1[1].split("<hr noshade=\"noshade\" size=\"1\" width=\"75%\">");
						array3 = array2[0].split("<td align=\"center\" valign=\"top\" width=\"120\"><a href=\"buy_item.phtml");
						button = "<center><input style='margin-top:10px;background-color:#A9DE68; border:1px solid black;' type='submit' id='shopdescon' value='Turn off User Description for this user's shop'>";
						if (array3[1] != null)
						{
						
							thisDiv.innerHTML = thisDiv.innerHTML.replace(array3[1],array3[1] + button);
						}
						else
						{
							thisDiv.innerHTML = thisDiv.innerHTML.replace(array3[0],array3[0] + button);
						}
						//Artifically get rid of background iamges
						//document.body.style.backgroundImage = "url('')";
						//thisDiv.innerHTML = thisDiv.innerHTML.replace(array3[0],button);
						el = document.getElementById('shopdescon');
						el.addEventListener('click',function(){
						if (this.value.indexOf("Turn off") > -1)
						{
							
							usersallowed = usersallowed.replace(shopowner+",","");
							GM_setValue('shopdescdeleteusers',usersallowed);
							this.value = "Turn On User Description";
						}
						else
						{
							usersallowed += shopowner + ",";
							GM_setValue('shopdescdeleteusers',usersallowed);
							this.value = "Turn off User Description";
						}
						},false);
					}					
				
				}
			}
	
		
		
	}
}//------------------------------------DIPR AUCTION----------------------
dipr = GM_getValue('dipr', "on");
if (dipr == 'on')
{
	if (document.location.href.match('auctions.phtml') && document.location.href.match('type=bids') && document.location.href.match('auction_id=')) 
	{
		diprnumrows = GM_getValue('diprnumrows','5');
		allDivs = document.evaluate("//img[@height='80']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			newElement = document.createElement('div');
			newElement.setAttribute('id','shopwizresults');
			thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
		}

		allDivs = document.evaluate("//img[@height='80']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			newElement = document.createElement('div');
			newElement.setAttribute('id','rawdata');
			thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
			document.getElementById('rawdata').style.display = 'none';

		}

		allDivs = document.evaluate("//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < 12; i++)
		{
			thisDiv = allDivs.snapshotItem(i);
			if(thisDiv.innerHTML.indexOf("owned by") > -1)
			{
				array = thisDiv.innerHTML.split("(owned");
				itemname = array[0];
				itemname = itemname.replace("&amp;","&");
				thisDiv.innerHTML = "<span id='thelinkdiv'>" + itemname + "</span> (owned" + array[1];
				document.addEventListener('dblclick', function(event) {
				if (event.target == document.getElementById('thelinkdiv'))
				{
					getwizresults('rawdata','shopwizresults',itemname)
				}
				}, true);
			  	 break;
			}
		}
		
	}
//----------------------------------DIPR - Inventory------------
if (document.location.href.match('objects.phtml') && document.location.href.match('inventory')) 
{
	allDivs = document.evaluate("//p",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			thisDiv = allDivs.snapshotItem(3);
			thisDiv.innerHTML += "<div id='improveneoresults'></div>";
			//Need to do this for Xpath .. Yeah, sucks.
			thisDiv.innerHTML += "<div id='rawdata' style='display:none;'></div>";
		

	allDivs = document.evaluate("//td[@width='100']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		array1 = thisDiv.innerHTML.split("<br>");
		itemname = array1[1];
		itemname = itemname.replace("&amp;","&");
		thisDiv.innerHTML = array1[0] + "<br><span id='" + itemname + "'>" + itemname + "</span><br>";
		el = document.getElementById(itemname);
		el.addEventListener('dblclick',function(){linkid = this.id;
		getwizresults("rawdata","improveneoresults",linkid);
		},false);
	
	}
}
//----------------------------------DIPR - NEO SHOPS------------
if (document.location.href.match('objects.phtml') && document.location.href.match('shop')) 
{
	allDivs = document.evaluate("//p",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < 2; i++) 
	{
		if (i == '1')
		{
			thisDiv = allDivs.snapshotItem(i);
			thisDiv.innerHTML += "<div id='improveneoresults'></div>";
			//Need to do this for Xpath .. Yeah, sucks.
			thisDiv.innerHTML += "<div id='rawdata' style='display:none;'></div>";
			break;
		}
	
	}
	allDivs = document.evaluate("//td[@width='120']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		array1 = thisDiv.innerHTML.split("<b>");
		array2 = array1[1].split("</b>");
		itemname = array2[0];
		itemname = itemname.replace("&amp;","&");
		thisDiv.innerHTML = array1[0] + "<span style='font-weight:bold;' id='" + itemname + "'>" + itemname + "</span>" + array2[1];
		el = document.getElementById(itemname);
		el.addEventListener('dblclick',function(){linkid = this.id;
		getwizresults("rawdata","improveneoresults",linkid);
		},false);
	
	}
}
//----------------------------------DIPR - USER SHOPS------------
if (document.location.href.match('browseshop.phtml') && document.location.href.match('shop')) 
{
	allDivs = document.evaluate("//p",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < 2; i++) 
	{
		if (i == '1')
		{
			thisDiv = allDivs.snapshotItem(i);
			thisDiv.innerHTML += "<div id='improveneoresults'></div>";
			//Need to do this for Xpath .. Yeah, sucks.
			thisDiv.innerHTML += "<div id='rawdata' style='display:none;'></div>";
			break;
		}
	
	}
	allDivs = document.evaluate("//td[@width='120']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		array1 = thisDiv.innerHTML.split("<b>");
		array2 = array1[1].split("</b>");
		itemname = array2[0];
		itemname = itemname.replace("&amp;","&");
		thisDiv.innerHTML = array1[0] + "<span style='font-weight:bold;' id='" + itemname + "'>" + itemname + "</span>" + array2[1];
		el = document.getElementById(itemname);
		el.addEventListener('dblclick',function(){linkid = this.id;
		getwizresults("rawdata","improveneoresults",linkid);
		},false);
	
	}
}
// idea by pink
//-----------DIPR----Kadoatery

if (document.location.href.match('games/kadoatery/')) 
{
		allDivs = document.evaluate("//table[@cellpadding='6']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		thisDiv = allDivs.snapshotItem(0);
		newElement = document.createElement('div');
		newElement.setAttribute('id','improveneoresults');
		thisDiv.parentNode.insertBefore(newElement, thisDiv);
	

		allDivs = document.evaluate("//table[@cellpadding='6']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		thisDiv = allDivs.snapshotItem(0);
		newElement = document.createElement('div');
		newElement.setAttribute('id','rawdata');
		thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
		document.getElementById('rawdata').style.display = 'none';


		allDivs = document.evaluate("//td[@style='border: 1px solid rgb(128, 128, 128); background-color: rgb(255, 255, 255);']/strong",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			
			if ((i-1)%2==0) 
				{
					itemname = thisDiv.innerHTML;
					itemname = itemname.replace("&amp;","&");
					thisDiv.innerHTML = "<span style='font-weight:bold;' id='" + itemname + "'>" + itemname + "</span>";
					el = document.getElementById(itemname);
					el.addEventListener('dblclick',function(){
					linkid = this.id;
					getwizresults("rawdata","improveneoresults",linkid);
					},false);
				}

		}

}
//----------------------------------DIPR - TRADING POST------------
// April 19th---UPDATE: No bugs found.

if (document.location.href.match('tradingpost.phtml')) 
{
	allDivs = document.evaluate("//table[@bgcolor='#aaccaa']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < 1; i++) 
	{
			thisDiv = allDivs.snapshotItem(0);
			newElement = document.createElement('div');
			newElement.setAttribute('id','improveneoresults');
			thisDiv.parentNode.insertBefore(newElement, thisDiv);
			newElement = document.createElement('div');
			newElement.setAttribute('id','rawdata');
			thisDiv.parentNode.insertBefore(newElement, thisDiv);
			document.getElementById('rawdata').style.display='none';
	}
	allDivs = document.evaluate("//td[@valign='bottom']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++)  
	{
		thisDiv = allDivs.snapshotItem(i);
		if (thisDiv.innerHTML.indexOf("width=\"40\">") > -1)
		{
		array1 = thisDiv.innerHTML.split("width=\"40\">");
		//array2 = array1[1].split("</b>");
		itemname = array1[1];
		itemname = itemname.replace("&amp;","&");
		thisDiv.innerHTML = array1[0] + "<span id='" + itemname + "'>" + itemname + "</span>";
		el = document.getElementById(itemname);
		el.addEventListener('dblclick',function(){linkid = this.id;
		getwizresults("rawdata","improveneoresults",linkid);
		},false);
	}
	}
}
//----------------------------------DIPR - Snow Faerie---------
//Remember to get front page to and fix it.
//Don't really know what that means...
if (document.location.href.indexOf('winter/snowfaerie.phtml') > -1) 
{
	if(document.body.innerHTML.indexOf("Ingredients Needed") > -1)
	{
		allDivs = document.evaluate("//p",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			
			thisDiv = allDivs.snapshotItem(i);
			if (thisDiv.innerHTML.indexOf('bring them back') > -1)
			{
				newElement = document.createElement('div');
				newElement.setAttribute('id','improveneoresults');
				thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
				newElement = document.createElement('div');
				newElement.setAttribute('id','rawdata');
				thisDiv.parentNode.insertBefore(newElement, thisDiv);
				document.getElementById('rawdata').style.display='none';
			}
		}
		allDivs = document.evaluate("//td[@align='center']/b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		//allDivs = document.evaluate("//td[@bgcolor='#eeeeff']/b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
		//#eeeeff
		for (var i = 0; i < allDivs.snapshotLength; i++)  
		{
			if (i > 1)  //Deadline/ingredients needed, we can't use those.
			{
			thisDiv = allDivs.snapshotItem(i);
			itemname = thisDiv.innerHTML;
			itemname = itemname.replace("&amp;","&");
			thisDiv.innerHTML = "<span id='" + itemname + "'>" + itemname + "</span>";
			el = document.getElementById(itemname);
			el.addEventListener('dblclick',function(){linkid = this.id;getwizresults("rawdata","improveneoresults",linkid);},false);
			}
		}
	}
}
// idea by pink
//-----------DIPR----Sales history

if (document.location.href.match('market.phtml') && document.location.href.match('type=sales')) 
{

		allDivs = document.evaluate("//table[@cellpadding='3']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		thisDiv = allDivs.snapshotItem(0);
		newElement = document.createElement('div');
		newElement.setAttribute('id','improveneoresults');
		thisDiv.parentNode.insertBefore(newElement, thisDiv);
	

		allDivs = document.evaluate("//table[@cellpadding='3']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		thisDiv = allDivs.snapshotItem(0);
		newElement = document.createElement('div');
		newElement.setAttribute('id','rawdata');
		thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
		document.getElementById('rawdata').style.display = 'none';

		allDivs = document.evaluate("//td[@bgcolor='#ffffcc'] | //td[@bgcolor='#dddd77']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			
			if ((i-1)%4==0) 
				{
					itemname = thisDiv.innerHTML;
					itemname = itemname.replace("&amp;","&");
					thisDiv.innerHTML = "<span id='" + itemname + "'>" + itemname + "</span>";
					el = document.getElementById(itemname);
					el.addEventListener('dblclick',function(){
					linkid = this.id;
					getwizresults("rawdata","improveneoresults",linkid);
					},false);
				}

		}

}

//--------DIPR-----SDB----------------------------
if (document.location.href.match('safetydeposit.phtml')) 
	{
		thisform = document.evaluate("//table[@cellpadding='3']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    		thisDiv = thisform.snapshotItem(0);
    		thisDiv.id = 'inreference';

		main = document.getElementById('inreference');
		if (main) 
		{
    			newElement = document.createElement('div');
			newElement.setAttribute('id','shopwizard');
			main.parentNode.insertBefore(newElement, main);
			document.getElementById('shopwizard').innerHTML = "<div style='display:none;' id='rawdata'></div><div id='improveneoresults'></div>";

			allDivs = document.evaluate("//td[@width='60']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allDivs.snapshotLength; i++) 
			{
				thisDiv = allDivs.snapshotItem(i);
				array1 = thisDiv.innerHTML.split("<br>");
				array2 = array1[0].split("<b>");
				itemname = array2[1];
				itemname = itemname.replace("&amp;","&");
				thisDiv.innerHTML = "<span style='font-weight:bold;' id='" + itemname + "'>" + itemname + "</span><br>" + array1[1];
				el = document.getElementById(itemname);
				el.addEventListener('dblclick',function(){linkid = this.id;
				getwizresults("rawdata","improveneoresults",linkid);
				},false);
			}

		}
	}
//--------DIPR-----Your Shop Stock-----------------
	if (document.location.href.match('market.phtml') && document.location.href.match('type=your') || document.location.href.match('market_your.phtml')) 
	{
		thisform = document.evaluate("//form[@action='process_market.phtml']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    		thisDiv = thisform.snapshotItem(0);
    		thisDiv.id = 'iereference';

		main = document.getElementById('iereference');
		if (main) 
		{
    			newElement = document.createElement('div');
			newElement.setAttribute('id','shopwizard');
			main.parentNode.insertBefore(newElement, main);
			document.getElementById('shopwizard').innerHTML = "<div style='display:none;' id='rawdata'></div><div id='improveneoresults'></div>";

			allDivs = document.evaluate("//td[@width='60']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allDivs.snapshotLength; i++) 
			{
				thisDiv = allDivs.snapshotItem(i);
				array1 = thisDiv.innerHTML.split("<b>");
				array2 = array1[1].split("</b>");
				itemname = array2[0];
				itemname = itemname.replace("&amp;","&");
				thisDiv.innerHTML = array1[0] + "<span style='font-weight:bold;' id='" + itemname + "'>" + itemname + "</span>" + array2[1];
				el = document.getElementById(itemname);
				el.addEventListener('dblclick',function(){linkid = this.id;getwizresults("rawdata","improveneoresults",linkid);},false);
		
			}

		}
	}
}
//End DIPR IF
//SSW iPrice reporting
if (document.location.href.match('supershopwiz.phtml') && (document.body.innerHTML.indexOf("Searching for") > -1)) 
{	
pd = GM_getValue('pricedatabase', 'on');
if (pd == 'on')
{
	prices = new Array(5);
	a=0;
	allDivs = document.evaluate("//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		if(thisDiv.innerHTML.indexOf("Searching for") > -1)
		{
			newtext = thisDiv.innerHTML.split("...");
                	itemname = newtext[1];
			itemname = itemname.replace("&amp;","&");
			itemname = escape(itemname);
		}
	}

	allDivs = document.evaluate("//td[@class='pmod']/* ",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(allDivs.snapshotLength >= 3)
	{
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			if(thisDiv.innerHTML.indexOf("NP") > -1)
			{
			prices[a] = thisDiv.innerHTML.replace("NP","");
			prices[a] = prices[a].replace(",","");
			a++;
			}
		}
	}
	//Fourth and fifth are averaged to even it out more...
	var average = Math.round((parseFloat(prices[3])+parseFloat(prices[4]))/2);
	GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://improveneo.com/dev/submitprice.php?price=' + average + '&type=2&name=' + itemname,
				headers: {
				'User-agent': 'Mozilla/4.0 (compatible)',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				    },
				   onload: function(responseDetails) {}    });
}
}
// various improvements by pink THANKS!!
//---------------------Display BS recomendations---
stockrec = GM_getValue('stockrec', 'on');
if (stockrec == 'on')
{
	stocksellprice = GM_getValue('stocksellprice','60');
	stocksellprice = parseFloat(stocksellprice);
	stockbuypricemin = GM_getValue('stockbuypricemin','15');
	stockbuypricemin = parseFloat(stockbuypricemin);
	stockbuypricemax = GM_getValue('stockbuypricemax','15');
	stockbuypricemax = parseFloat(stockbuypricemax);
	if (document.location.href.match('stockmarket.phtml') && !document.location.href.match('process') && !document.location.href.match('type'))
	{

		allDivs = document.evaluate("//img[@src='http://images.neopets.com/images/nigel_chia.gif']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			newElement = document.createElement('div');
			newElement.setAttribute('id','reccomendations');
			thisDiv.parentNode.insertBefore(newElement, thisDiv);
			document.getElementById('reccomendations').innerHTML = "<h1>Loading...</h1>";
		}

		allDivs = document.evaluate("//img[@src='http://images.neopets.com/images/nigel_chia.gif']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			newElement = document.createElement('div');
			newElement.setAttribute('id','invisibleiframe');
			thisDiv.parentNode.insertBefore(newElement, thisDiv);	
		}
		array1 = document.body.innerHTML.split("<marquee><a href=\"stockmarket.phtml?type=profile&");
		array2 = array1[1].split("</marquee>");
	
		var stockname = new Array(43);
		var stockprice = new Array(43);

		allDivs = document.evaluate("//font[@color='green']/descendant::* | //font[@color='red']/descendant::* | //font[@color='black']/descendant::*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			array1 = thisDiv.innerHTML.split(' ');
			stockname[i]= array1[0];
			stockprice[i] = array1[1]; 
		}

		GM_xmlhttpRequest(
		{
			method: 'GET',url: 'http://www.neopets.com/stockmarket.phtml?type=portfolio',
			headers: {'User-agent': 'Mozilla/4.0 (compatible)',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://neopets.com/market.phtml?type=wizard',
		}
		,onload: function(responseDetails) 
			{
			texttosplit = responseDetails.responseText;
			//Bug Fix -> Continual loading if user had no stocks....
			if (texttosplit.indexOf("You don't own shares in any company") <= 0)
			{
			array1 = texttosplit.split("<form method=\"post\" action=\"process_stockmarket.phtml\">");
			array2 = array1[1].split("THIS PAGE CONTAINS PAID ADVERTISEMENTS");
			}
			document.getElementById('invisibleiframe').innerHTML = array2[0];
			document.getElementById('invisibleiframe').style.display = 'none';

			var portstockname = new Array(100);
			var portholdings = new Array(100);
			var shares = new Array(100);
			var allDivs = document.evaluate("//tr[@bgcolor='#eeeeff']/* | //tr[@bgcolor='#ffffff']/*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allDivs.snapshotLength; i++) 
			{
				thisDiv = allDivs.snapshotItem(i);
				
				//if holdings amount
				if ((i-5)%9==0)
				{
					cg = (i-5)/9;
					portholdings[cg] = thisDiv.innerHTML;

				}

				//If company name
	  			if ((i-1)%9==0) 
				{
					array1 = thisDiv.innerHTML.split("<a href=\"stockmarket.phtml?type=profile&amp;company_id");
					array2 = array1[0].split("\">");
					array3 = array2[1].split("</a><br>");
					vx = (i-1)/9;
					portstockname[vx] = array3[0];
				}

			

			}
			for (var i = 0; i < 42; i++) 
			{

				name = portstockname[i];
				if (name != 'undefined')
				{
					shares[name] = portholdings[i]; 
				}
			}

			recstyle = "#ieb{ border-collapse: collapse;cellspacing:0px;margin:0px;background-color:#E9C7BE;border:1px solid black;padding:0px;cellspacing:0px}";
			recstyle += "#iea{border-collapse: collapse;cellspacing:0px;margin:0px;background-color:#A9DE68;border:1px solid black;padding:0px;cellspacing:0px}";
			recstyle += "#ieh td{cellspacing:0px;cellpadding:0px;cell-padding:0px;border:1px solid black; padding:10px; margin:-2px;}";
			recstyle += " #iec td{border:1px solid black;}";
			addGlobalStyle(recstyle); 

			reccomendhtml = "<div id='background'></div><div id='image'></div><center><b style='position:relative;background-color:white;border:1px solid black; padding:6px;'>Buy Recommendations</b><table id='iea'><tr id='ieh'><td><b>Symbol</b></td><td><b>Share Price</b></td><td><b>Amount owned</b></td><td><b>Buy 1k Shares</b></td></tr>"; 
			atleastone = false;
			for (var i = 0; i < 42; i++) 
			{
				if (stockprice[i] <= stockbuypricemax  && stockprice[i] >= stockbuypricemin)
				{
					name = stockname[i];
					stockholdings = shares[name];
					if (stockholdings == null){stockholdings ="0";}
					reccomendhtml += "<tr id='iec'><td class='ingraph' id='" + stockname[i] + "'style='padding:10px;'>" + stockname[i] + "</td><td style='padding:10px;'>" + stockprice[i] + "</td><td style='padding:10px;'>" + stockholdings + "</td><td style='padding:10px;'><a href='http://neopets.com/process_stockmarket.phtml?type=buy&ticker_symbol=" + stockname[i] + "&amount_shares=1000'><b>Buy This Stock!</b></a></td></tr>";
					atleastone = true;				
				}
			}
			//Really needs to be tested!!
			//Works - April 5th 2006
			if (atleastone == false)
			{			
				reccomendhtml = "<b>You've got no buying recommendations right now! Too bad!</b><table>";
			}
			reccomendhtml += "</table><div id='sellreccomendations'></div>";
			sellreccomendhtml = "<center><b style='position:relative;background-color:white;border:1px solid black; padding:6px;'>Sell Recomendations</b><table id='ieb'><tr id='ieh'><td><b>Symbol</b></td><td><b>Share Price</b></td><td><b>Amount owned</b></td></tr>";
	
			atleastone = false;
			for (var i = 0; i < 42; i++) 
			{
				if (stockprice[i]>=stocksellprice)
				{
					name = stockname[i];				
					stockholdings = shares[name];

					if (stockholdings != null)
					{
						sellreccomendhtml += "<tr id='iec'><td class='ingraph' id='" + stockname[i] + "' style='padding:10px;'>" + stockname[i] + "</td><td style='padding:10px;'>" + stockprice[i] + "</td><td style='padding:10px;'>" + stockholdings + "</td></tr>";
						atleastone = true;
					}
				}
			}
			sellreccomendhtml += "</table>";
			document.getElementById('reccomendations').innerHTML = reccomendhtml;
			if (atleastone == true) 
			{
				document.getElementById('sellreccomendations').innerHTML = sellreccomendhtml;
			} 
			else
			{
				document.getElementById('sellreccomendations').innerHTML = "<b>You've got no sell recommendations right now! Too bad!</b>";
			}
		yScroll = window.innerHeight + window.scrollMaxY;
		windowwidth = self.innerWidth;
		windowwidth = windowwidth/2;
		addGlobalStyle("#background{z-index:100;position:absolute;top:0px;left:0px;width:100%;height:" + yScroll + "px;background-color:black;opacity:.80;display:none;}#image{z-index:101;opacity:1;position:absolute;display:none;}");
		allDivs = document.evaluate("//td[@class='ingraph']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			linkid = thisDiv.id;
			el = document.getElementById(linkid);
			el.addEventListener('dblclick',function(){
			linkid = this.id;
			
			document.getElementById('background').style.display = 'block';
			document.getElementById('image').style.display = 'block';
			document.getElementById('image').innerHTML = "<img onclick = \"javascript:document.getElementById('background').style.display = 'none';document.getElementById('image').style.display = 'none';\" src='http://www.neodaq.com/charts/graph.php?ticker=" + linkid + "&ticker2=(none)&size=FULL&start=&end=&days=&type=Open&lowlim=&hilim=";
			//Centering
			var objLightbox = document.getElementById('image');
			objLightbox.style.top = "200px";
			objLightbox.style.left = windowWidth + "px";
			},false);


		}
		}})


	}
}
//-------------------------------------------Change to Identical for shop.xls && other links
if (document.location.href.match('market.phtml') && document.location.href.match('type=wizard') && document.location.href.match('string='))
{
	//Sloppy but neopets didnt name the form. That is just mean...
	allDivs = document.evaluate("//select",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	//Only other one on page is the language so ignore it.
	thisDiv = allDivs.snapshotItem(1);
	thisDiv.selectedIndex = 1;
}
//------------------------------------------DIPR Anywhere
window.addEventListener('keydown',function(event){if (event.shiftKey==1 && event.keyCode ==68 && document.getSelection() != ''){
			if (!(document.getElementById('dipranywhereresults')))
{
			allDivs = document.evaluate("//p",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			thisDiv = allDivs.snapshotItem(0);
			thisDiv.innerHTML += "<div id='dipranywhereresults'></div>";
			//Need to do this for Xpath .. Yeah, sucks.
			thisDiv.innerHTML += "<div id='dipranywhererawdata' style='display:none;'></div>";
}
			itemname = document.getSelection();
			getwizresults('dipranywhererawdata','dipranywhereresults',itemname, false);
			document.getElementById('dipranywhereresults').style.position = "fixed";
			document.getElementById('dipranywhereresults').style.top = "50px";
			document.getElementById('dipranywhereresults').style.right = "50px";	

}},false);	
//----------------------------------------------All Shop Wiz Variables Needed---------------
if (document.location.href.match('market.phtml') && !document.location.href.match('type'))
{
	var rare = false;
	var noresults = false;
	allDivs = document.evaluate("//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		if(thisDiv.innerHTML.indexOf("Searching for") > -1)
		{
			newtext = thisDiv.innerHTML.split("...");
                	itemname = newtext[1];
			ipriceitemname = itemname.replace("&amp;","&");
			ipriceitemname = escape(ipriceitemname);
			//For good deal alert
			newElement = document.createElement('div');
			newElement.setAttribute('id','bargainalertdiv');
			thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
			newElement = document.createElement('div');
                newElement.setAttribute('id','lowestpricediv');
                thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
		}
		if(thisDiv.innerHTML.indexOf("I did not find anything :(") > -1)
		{
			noresults = true;
		}
	}
	prices = new Array(5);
	allDivs = document.evaluate("//td[@bgcolor='#ffffcc']/* | //td[@bgcolor='#ffffee']/*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			if(thisDiv.innerHTML.indexOf("NP") > -1)
			{
				prices[i] = thisDiv.innerHTML.replace("NP","");
				prices[i] = prices[i].replace(",","");
			}
		}
		if(allDivs.snapshotLength >= 6)
		{
		var average = Math.round((parseFloat(prices[3])+parseFloat(prices[5]))/2);
		}
		if(allDivs.snapshotLength == 4)
		{
		rare = true;
		var average = Math.round((parseFloat(prices[1])+parseFloat(prices[3]))/2);
		}
		if(allDivs.snapshotLength == 2)
		{
		rare = true;
		var average = Math.round(parseFloat(prices[1]));
		}
}
//idea by pink
//-----------------------------------------------Good Deal Alert/Price Database
//This is done in odds for some reason...IE: 1,3,5... So the first price is stored in 1. Second in 3rd third in 5th etc...
if (document.location.href.match('market.phtml') && !document.location.href.match('type') && noresults != true)
{
	bargainalert = GM_getValue('bargainalert', 'on');
	var checkprice = parseFloat(prices[3])*0.8;
	if (prices[1] < checkprice && bargainalert == 'on' && rare != true)
	{
		document.getElementById('bargainalertdiv').innerHTML = "<fieldset style='height:50px;background-color:#A9DE68; border:1px solid black;'><legend style='background-color:white;border:1px solid black;'>ImproveNeo - Bargain Alert</legend><b>The First Result is abnormally low! You may want to consider buying the item.</b></fieldset><br>";
	}
	pd = GM_getValue('pricedatabase', 'on');
	if (pd == 'on')
	{
		GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://improveneo.com/dev/submitprice.php?rare=' + rare + '&price=' + average + '&name=' + ipriceitemname,
				headers: {
				'User-agent': 'Mozilla/4.0 (compatible)',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				    },
				   onload: function(responseDetails) {}    });
	}			
}

//-----------------------------------------------Lowest Price Seen So Far
// Dev Comments
//lowestpricediv = Div above the shop wiz results (Poorly Named)
//improveneoresults = The best price so far
//

if (document.location.href.match('market.phtml') && !document.location.href.match('type'))
{
	lpssr = GM_getValue('lpssr', 'on');
	if (lpssr == 'on')
	{
        lastsearchitemname =  GM_getValue('lastsearchitemname', '');
	  if (lastsearchitemname == itemname && noresults != true)
        {
            bestprice = GM_getValue('lastsearchbestprice');
            prices = new Array(5);
            owners = new Array(5);
            allDivs = document.evaluate("//td[@bgcolor='#ffffcc'] | //td[@bgcolor='#ffffee']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
            //originally 12 -> Bug Fix   http://improveneo.com/source/forums/viewtopic.php?id=22
	    for (var i = 0; i < 4; i++) 
            {
              	thisDiv = allDivs.snapshotItem(i);
		if(thisDiv.innerHTML.indexOf("NP") > -1)
		{
			prices[i] = thisDiv.innerHTML.replace("NP","");
			prices[i] = prices[i].replace(",","");
			prices[i] = prices[i].replace("<b>","");
			prices[i] = prices[i].replace("</b>","");
		}
		if(thisDiv.innerHTML.indexOf("b") > -1)
		{
  			owners[i] = "<a href='" + thisDiv.href + "'>" + thisDiv.innerHTML + "</a>"; 
		}
		if (i == 2)
		{
			stock = thisDiv.innerHTML;
		}
            }
            firstprice = prices[3];
            owner = owners[0];
            bestprice = GM_getValue('lastsearchbestprice');
            bestprice = parseFloat(bestprice);
            firstprice = parseFloat(firstprice);
            if (firstprice <= bestprice)
            {

                GM_setValue('lastsearchbestprice', firstprice);
                GM_setValue('lastsearchowner', owner); 
		GM_setValue('lastsearchstock', stock);
                allDivs = document.evaluate("//td[@bgcolor='#ffffcc']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                for (var i = 0; i < 4; i++) 
                {
                    thisDiv = allDivs.snapshotItem(i);
                    if (i == 0)
                    {
                       // thisDiv.style.backgroundColor = "#ffffee";
                        thisDiv.innerHTML = owner;
			//so that if first price is clicked it isnt recorded...
			thisDiv.addEventListener('click', function()
                        {
                            GM_setValue('lastsearchitemname', '');
                            GM_setValue('lastsearchbestprice', '');
                            GM_setValue('lastsearchowner', '');
                        }, false);
			thisDiv.parentNode.id = "improveneoresults";
                    }
                    if (i == 1)
                    {
                     //   thisDiv.style.backgroundColor = "#A9DE68";
                        thisDiv.innerHTML = itemname;
                    }
                    if (i == 2)
                    {
                     //   thisDiv.style.backgroundColor = "#A9DE68";
                        thisDiv.innerHTML = stock;
                    }
                    if (i == 3)
                    {
		     //Not neccessary -> All it does is get rid of the commas and makes it look bad.
                     //   thisDiv.style.backgroundColor = "#A9DE68";
                     //   thisDiv.innerHTML = "<b>" + firstprice + " NP</b>";
                    }
    
                }

            }
            if (bestprice < firstprice)
            {
		startopacity = 0.3;
		hoveropacity = 1;
                owner = GM_getValue('lastsearchowner');
		stock = GM_getValue("lastsearchstock","?");
                allDivs = document.evaluate("//td[@bgcolor='#ffffcc']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                for (var i = 0; i < 4; i++) 
                {
                    thisDiv = allDivs.snapshotItem(i);
                    if (i == 0)
                    {
                        td1 = document.createElement('td');
                        td1.style.backgroundColor = "#ffffee";
                        td1.style.textAlign = 'center';
                        td1.innerHTML = owner;
			td1.addEventListener('click', function()
                        {
                            GM_setValue('lastsearchitemname', '');
                            GM_setValue('lastsearchbestprice', '');
                            GM_setValue('lastsearchowner', '');
                            document.getElementById('improveneoresults').style.display = "none";                          
                        }, false);
                    }
                    if (i == 1)
                    {
                        td2 = document.createElement('td');
                        td2.style.backgroundColor = "#ffffee";
                        td2.style.textAlign = 'center';
                        td2.innerHTML = itemname;
                    }
                    if (i == 2)
                    {
                        td3 = document.createElement('td');
                        td3.style.backgroundColor = "#ffffee";
                        td3.style.textAlign = 'center';
                        td3.innerHTML = stock;
                    }
                    if (i == 3)
                    {
                        td4 = document.createElement('td');
                        td4.style.backgroundColor = "#ffffee";
                        td4.style.textAlign = 'center';
                        td4.innerHTML = "<b>" + bestprice + " NP</b>";

  			td5 = document.createElement('td');
			td5.id = "deletetab";
			td5.style.backgroundColor = "#A9DE68";
			td5.style.borderRight = "1px solid black";
			td5.style.borderTop = "1px solid black";
			td5.style.borderBottom = "1px solid black";
                        td5.style.textAlign = 'center';
			td5.style.opacity = .3;
			td5.style.cursor = "pointer";
                        td5.innerHTML = "X";


			td5.addEventListener('mouseover', function()
                        {
                         document.getElementById('deletetab').style.opacity = hoveropacity;
                        }, false);
				td5.addEventListener('mouseout', function()
                        {
                         document.getElementById('deletetab').style.opacity = startopacity;
                        }, false);
			td5.addEventListener('click', function()
                        {
                            GM_setValue('lastsearchitemname', '');
                            GM_setValue('lastsearchbestprice', '');
                            GM_setValue('lastsearchowner', '');
                            document.getElementById('improveneoresults').style.display = "none";
                        }, false);


                    }
                }
                allDivs = document.evaluate("//table[@cellpadding='3']/*/*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                for (var i = 0; i < 4; i++) 
                {
                    thisDiv = allDivs.snapshotItem(i);
                    if (i == 1)
                    {
                        newElement = document.createElement('tr');
                        newElement.setAttribute('id','improveneoresults');
                        thisDiv.parentNode.insertBefore(newElement, thisDiv);
                        newElement.appendChild(td1);
                        newElement.appendChild(td2);
                        newElement.appendChild(td3);
                        newElement.appendChild(td4);
 			newElement.appendChild(td5);
			document.getElementById('improveneoresults').addEventListener('mouseover', function()
                        {
                         document.getElementById('deletetab').style.opacity = hoveropacity;
                        }, false);
				document.getElementById('improveneoresults').addEventListener('mouseout', function()
                        {
                         document.getElementById('deletetab').style.opacity = startopacity;
                        }, false);
                    }
                }
            }

        }
       else if (lastsearchitemname != itemname && noresults != true)
        {
            GM_setValue('lastsearchitemname', itemname);
		
            prices = new Array(5);
            owners = new Array(5);
            allDivs = document.evaluate("//td[@bgcolor='#ffffcc'] | //td[@bgcolor='#ffffee']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
            for (var i = 0; i < 4; i++) 
            {
         	thisDiv = allDivs.snapshotItem(i);
		if(thisDiv.innerHTML.indexOf("NP") > -1)
		{
			prices[i] = thisDiv.innerHTML.replace("NP","");
			prices[i] = prices[i].replace(",","");
			prices[i] = prices[i].replace("<b>","");
			prices[i] = prices[i].replace("</b>","");
		}
		if(thisDiv.innerHTML.indexOf("b") > -1)
		{
  			owners[i] = "<a href='" + thisDiv.href + "'>" + thisDiv.innerHTML + "</a>"; 
		}
		if (i == 2)
		{
			stock = thisDiv.innerHTML;
		}
            }
     		var firstprice = prices[3];
		var owner = owners[0];
		GM_setValue('lastsearchbestprice', firstprice);
		GM_setValue('lastsearchowner', owner);
		GM_setValue('lastsearchstock', stock);
		GM_setValue('lastsearchitemname', itemname);
        }

    }
}



usc =  GM_getValue('usc', 'on');
if (usc == 'on')
{
var WindowLocation = "";
WindowLocation+=document.location;
if(WindowLocation.indexOf("&ShopOk=t")==-1 && WindowLocation.indexOf("browseshop.phtml?owner=")>-1){

	var removeList = new Array("onmouseup","document.location","location.href","onactivate","onbeforeactivate","onbeforeeditfocus","onbeforeunload","onbeforeupdate","onblur","onbounce","onchange","onclick","oncontextmenu","oncopy","ondblclick","ondeactivate","onerror","onfilterchange","onfinish","onfocus","onfocusin","onfocusout","onkeydown","onkeypress","onkeyup","onload","onlosecapture","onmousedown","onmouseenter","onresize","onscroll");
	var i;
	PageText = document.getElementsByTagName("body")[0].innerHTML.replace('document.location','');
	PageText = PageText.replace("document.onmousedown = right","");
	PageText = PageText.replace("document.onmouseup = right","");
	PageText = PageText.replace("window.onmousedown = right","");
	PageText = PageText.replace("window.onmouseup = right","");
	PageText = PageText.replace('id=ol onmouseout="mo()"','');
	PageText = PageText.replace('style="padding:0px 5px 5px 10px;width:595" onmouseover="mo()" valign=top>','');
	PageText = PageText.replace("onClick=\"if ( !conf","");
	PageText = PageText.replace("if (document.layers) window.captureEvents(Event.MOUSEDOWN);","");
	PageText = PageText.replace("if (document.layers) window.captureEvents(Event.MOUSEUP);","");
	NewArray = PageText.split("<hr noshade=\"noshade\" size=\"1\" width=\"75%\">");
	PageText = NewArray[0];
	while (PageText.indexOf(" onmouseover=\"sh(")>-1)
	{
		PageText = PageText.replace(" onmouseover=\"sh(","");
	}
	PageText = PageText.toLowerCase()
	while (PageText.indexOf('" onclick="if ( !confi')>-1)
	{
		PageText = PageText.replace('" onclick="if ( !confi','');
	}
	for(i=0;i<removeList.length;i++)
	{
		if(PageText.indexOf(removeList[i].toLowerCase()) > -1)
		{
			alert("ImproveNeo has detected that this page may\ncontain javascript attampting to scam you.\nThe phrase found was \""+removeList[i]+"\".");
			prompt("If you feel this was in error, go to this page to temporarily disable Greasemonkey for this page.",document.location+"&ShopOk=t")
			document.location = "http://www.neopets.com";
		}
	}
}
}

//--------------------------Update Check--------------
//86400000 = seconds in day
var todayDate = new Date();
var checkDate = parseFloat(GM_getValue('lastUpdateCheck', '0000'));
todayDate.setDate(todayDate.getDate()-2);
randomData = todayDate.getTime();
if(randomData > checkDate)
{


			GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://improveneo.com/dev/updatecheck.php',
			headers: {
			'User-agent': 'Mozilla/4.0 (compatible)',
			'Accept': 'application/atom+xml,application/xml,text/xml',
				    },
				   onload: function(responseDetails) {
					randomData = responseDetails.responseText;
					randomData = randomData.split('<!--display code-->');
					displayCode = randomData[1];
					versionCheck = randomData[0];
					if(versionCheck > version)
					{
						document.getElementById('ban').style.backgroundColor ='A9DE68';
						document.getElementById('ban').style.display ='block';
						document.getElementById('ban').innerHTML = displayCode;	
					}
					todayDate.setDate(todayDate.getDate()+2);
					randomData = todayDate.getTime();
					randomData = randomData.toString();
					GM_setValue("lastUpdateCheck",randomData);
					}    });
}