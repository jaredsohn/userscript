// ==UserScript==
// @name           Plorntshit
// @namespace      Ajacent
// @include        http://*.torn.com/*
// ==/UserScript==.
/* To anyone having the pleasure of reading this message
 * Please note that I coded this to work, not to look pretty. It is awfully hacked together.
 * I didnt think to bother to optimise it as really I believe in the sense of "if it works, it fucking works - seriously dont touch it or it might break"
 * I commend anyone able to actually work with this source code
 * Also leave this notice here unless you fix it up
 */
var loc = "" + unsafeWindow.location; 
var $ = unsafeWindow.jQuery; 

function buyFromBazaar(ID,itemID,price,amount,noticeElem) {
	if (parseInt(amount) > 0) {
		$.post("http://www.torn.com/bazaar.php?step=buy2&confirm=1&itemID="+itemID+"&userID="+ID+"&price="+price, { amount: amount, beforeval: (amount * price) },function (data) {
			if (data.search(/The price for this item has changed, please go back and try again\./) != -1) {
				noticeElem.append("<div class='notice error'>The price for this item has changed. Please refresh the page</div>");
			}
			else if (data.search(/You bought/)) {
				noticeElem.append("<div class='notice success'>You bought <b>"+amount+"</b> for the price of <b>$"+addCommas(price)+"</b></div>");
			}
			$('.notice').delay(4000).hide(1000);
		});
	}
	else {
		noticeElem.append("<div class='notice error'>You must put in a value over 0.</div>");
		$('.notice').delay(4000).hide(1000);
	}
}
//Yay for long add comma because they didnt add one nativly HOW FUN.  Credit http://www.mredkj.com
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//end add Comma function

if (loc.search(/(bazaar|displaycase)\.php\?step=remove/i) != -1 || loc.search(/(bazaar|displaycase)\.php\?step=add/i) != -1) {
	var pageType = (loc.search('remove') != -1 ? 'Remove' : 'Add');
	var pageName = new RegExp (/(bazaar|displaycase)\.php/i);
	var pageName = pageName.exec(loc);
	var pageName = pageName[0];
	var table; //Dodgey coding ftw
	$('td[align="right"]').after("<td width=1%><font color=#000066><b>Mass-" + pageType + "</b></font></td>");
	$('form[action^="'+pageName+'?step="]').each(function () {
		var act = $(this).attr('action');
		var tr = $(this).next();

		var amount = $(tr).find("input[name='amount']");
		amount.attr("id", "itembulkadd" + act.replace(/((bazaar|displaycase)\.php\?step=(add|remove)2&itemID=)/, '').replace(/(&ID=)/,''));

		tr.append("<td align=center><input name='itembulkadd" + act.replace(/((bazaar|displaycase)\.php\?step=(add|remove)2&itemID=)/, '').replace(/(&ID=)/,'') + "' type='checkbox'></td>");
		table = $(this).parent();
	});
	if (table != null) {
		table.append("<tr class='massadd' ><td></td>"+(pageName == 'displaycase.php' && pageType == 'Add' ? "<td></td>" : "")+"<td><input style='width:100%;' type='submit' id='maxOut' value='Maximum' /></td>" + (pageType == 'Add' && pageName == 'bazaar.php' ? "<td><input id='bulkprice' size='6' value='1' /></td>" : "") + "<td><input value='Mass " + pageType + "' id='massadd' type='submit' /></td><td><input id='selectAll' type='submit' value='Select All' /></td></tr>");
	}
	
	$("#maxOut").bind('click', function (e) {
		$('form[action^="'+pageName+'?step="]').each(function () {
			var tr = $(this).next();
			var td = tr.children("td").html();
			var amount = $(tr).find("input[name='amount']");
			var explode = td.split("</b>")[1].split("x");
			if (explode[1]) {
				amount.val(explode[1].replace(",", ""));
			}
		});
	});
	$("#selectAll").bind('click', function (e) {
		$('input[name^="itembulkadd"]').attr('checked', '1');
	});
	$("#massadd").bind('click', function (e) {
		var cost = $("#bulkprice").val();
		$('input[name^="itembulkadd"]:checked').each(function () {
			var chkbox = $(this);
			var name = chkbox.attr('name');
			var amount = $("#" + name).val();
			$.post(pageName+'?confirm=1&step=' + pageType.toLowerCase() + '2&itemID=' + name.replace('itembulkadd', ''), {
				amount: amount,
				price: cost
			}, function (data) {
				$(chkbox).parent().css({
					backgroundColor: 'limegreen'
				}).parent().hide('slow');
			});
		});
	});
	GM_addStyle(".massadd td { background-color: #1e1e1e; }"); 
}
else if (loc.search(/imarket\.php\?.*type=.+?/i) != -1) {
var allowNext = 1;
var queue = [];
var data = "<div id='buyBot'><div id='buyBotHeader'>Buy Items</div><div id='buyBotContent'>Buy all items on this page that is less than <br /><center><input size='5' type='text' id='price' value='100000' /> </center><br /> <br /><input size='5' id='goBuyShiz' type='submit' value='Buy' /> <br /><br /></div></div>";
	$("body").append(data);
	$('#goBuyShiz').bind('click',function (e) {
	curr=0;
		$("td[align='center']").each(function () {
			var me = $(this);
			var val = parseInt(me.html().replace(/([,$])/g,''));
			if ($("#price").val() >= val) {
				queue.push(me);
			}
		
		});
		if (queue.length >= 1) startQ();
	});
	var go;
	var curr;
	function startQ() {
		if (curr == queue.length) clearTimeout(go);
		if (allowNext == 1) {
			var me = queue[curr];
			allowNext = 0;
			$.get(me.next().find("a").attr('href'),function (data) {
				var theMatch = new RegExp(/(imarket\.php\?step=buy1&ID=[0-9]+?&rfc=[0-9]+?&itemID=[0-9]+?)/);
				 var testMatch = theMatch.exec(data);
				if (testMatch.index > 0) {
					 var s =testMatch[0];
					$.get(s,function (d) { 
						allowNext = 1;
						me.parent().hide('slow');
						curr++;
					});
				 }
				 else {
				 allowNext = 1;
				 me.parent().css({backgroundColor: 'red'});
				 curr++;
				 }
			 });
		}	
		go = setTimeout(function () { startQ() },10);
	}
	$("img[src^='images/items/']").each(function () {
	
	var td = $(this).parent().parent();
	var amount = parseInt($(this).parent().prev().prev().text().replace("(","").replace(" in stock)"));
	var itemID = $(this).attr("src").replace("images/items/","").replace(".jpg");
	var cost = parseInt($(this).parent().next().next().text().replace("$","").replace( /\,/g ,""));
	function getUrlVar (d) { 
		var vars = {};
		var parts = d.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
	}
	var userID = getUrlVar($(this).parent().attr("href"))["userID"];
		if (userID) {
			td.append("<br /><input style='width:40px;border-right:none;' type='text' id='BuyBazaarAmount"+userID+"'  value='1'><input style='border-left:none;' type='submit' id='BuyBazaarID"+userID+"' value='Buy'><br /><br />");
			$("#BuyBazaarID"+userID).bind('click',function () { buyFromBazaar(userID,itemID,cost,$("#BuyBazaarAmount"+userID).val(),td)});
		}
	});
}
else if (loc.search(/itemuseparcel.php/i) != -1) {
	var data = "<div id='buyBot'><div id='buyBotHeader'>Open :D</div><div id='buyBotContent'>Click to open all parcles! <br /><br /><input size='5' id='goOpen' type='submit' value='Open Parcels' /> <br /><br /></div></div>";
	$("body").append(data);
	$("#goOpen").bind('click',function (e) {
		$("a[href^='itemuseparcel.php?XID=']").each(function () {
			var me = $(this);
		
			$.get(me.attr('href') + "&open=1",function (d) {
				me.hide('slow');
			});
		});
	});
}
if (loc.search(/imarket\.php\?step=add/i) != -1) {
	var data = "<div id='buyBot'><div id='buyBotHeader'>Sell Everything</div><div id='buyBotContent'>Price: <input id='price' /><br /><br /><input size='5' id='goSell' type='submit' value='Sell Everything' /> <br /> <br /><input size='5' id='goRemove' type='submit' value='Remove All' /> <br /><br /></div></div>";
	$("body").append(data);
	$("#goSell").bind('click',function (e) {	
		$("a[href^='imarket.php?step=addl1']").each(function () {
			goSell(this,"add")
		});
	});
	$("#goRemove").bind('click',function (e) {	
		$("a[href^='imarket.php?step=remove']").each(function () {
			goSell(this,"remove");
		});
	});
	function goSell (e, sell) {
		var type = (sell == "add" ? "addl1" : "remove2");
			var theMatch = new RegExp(/^imarket\.php\?step=(?:addl1|remove)&ID=([0-9]+)/i);
			var anotherCopy = $(e);
			var string = anotherCopy.attr('href');
			var testMatch = theMatch.exec(string);
			if (testMatch != null) {
				var s = testMatch[1]
				if (sell == "remove") {
					$.get("http://www.torn.com/imarket.php?step=remove&ID="+ s,function (data) {
						$.post("http://www.torn.com/imarket.php?step="+ type +"&ID="+ s,{ price: $("#price").val(), submit: 'Add Item' }, function (data) { 
							if (data.search("Timed Out") != -1) anotherCopy.parent().parent().css({ backgroundColor: 'red'});
							else anotherCopy.parent().parent().css({backgroundColor:'limegreen'}).hide("slow");
						});
					});
				}
				else { 
					$.post("http://www.torn.com/imarket.php?step="+ type +"&ID="+ s,{ price: $("#price").val(), submit: 'Add Item' }, function (data) { anotherCopy.parent().parent().css({backgroundColor:'limegreen'}).hide("slow"); });
				}
			}
	}
}
GM_addStyle("#buyBot { position:fixed; width:200px; height:100px; right: 20px;	top:50px; text-align:center; }	#buyBotHeader {	font-weight:bold; font-style: 18px; text-align:center; background-color: #D9F1FA; border: 2px solid #77D7FC; border-bottom: none !important;  } #buyBotContent { text-align:center !important; background-color: #D9F1FA; border: 2px solid #77D7FC; } .error { color: #D8000C; border: 1px solid; background-color: #FFBABA; background-image: url('error.png'); }");