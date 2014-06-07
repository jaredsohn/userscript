// ==UserScript==
// @name           FFS USER STATISTIC
// @description    Show statistic info of FFS profile you visit (first page).
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @include        http://apps.new.facebook.com/friendsforsale/users/show/*
// @include        http://apps.facebook.com/friendsforsale/
// @include        http://apps.new.facebook.com/friendsforsale/
// ==/UserScript==

var _maxChore = 10000000;


// This is a subfunction to remove commas from text and
// turn it into a number.
function removecommas(txt) {
	 return parseInt(txt.substring(1).replace(/,/g,""), 10);
}

// And this is the subfunction to add commas to a number
function addcommas(num) {
	var txt = String(num);
	var oRegEx = new RegExp('(-?[0-9]+)([0-9]{3})');
	while(oRegEx.test(txt)) {
		txt = txt.replace(oRegEx, '$1,$2');
	}
	return txt;
}

//alert('DEBUG -->' + document.location.href);
if ( document.location.href != "http://apps.facebook.com/friendsforsale/" &&
	document.location.href != "http://apps.new.facebook.com/friendsforsale/") {//we are not in the dashboard
	//alert('DEBUG -->' + 'Dang xem Profile');

	// Get all money amounts on the page
	var money = document.getElementsByClassName("money");
		/*alert('money ' + money[0].innerHTML); //--> self cash****
		alert('money ' + money[1].innerHTML); //--> self value
		alert('money ' + money[2].innerHTML); //--> self cash
		alert('money ' + money[3].innerHTML); //--> owner value
		alert('money ' + money[4].innerHTML); //--> owner cash
		alert('money ' + money[5].innerHTML); //--> first pet value
		alert('money ' + money[6].innerHTML); //--> first pet cash
		alert('money ' + money[7].innerHTML); //--> second pet value
		alert('money ' + money[8].innerHTML); //--> second pet cash
		...
		*/
		
	// The second one is the user's value
	var value = removecommas(money[1].innerHTML);

	// The third one is the user's cash
	var cash = removecommas(money[2].innerHTML);

	//alert('DEBUG ' + ' value[' + value + '], cash[' + cash + ']');

	// Get the parent of the last shown pet list
	// which should be the user's pets.
	var pets = document.getElementsByClassName("pets-item");
	//pets = pets[pets.length - 1].getElementsByClassName("user_preview");

	// initialize sum and sum2 to zero
	var pet, sum = 0, sum2 = 0, chores = 0, chores44 = 0;

	// iterate through pets
	for (pet in pets) {
		// ignore any pets not displayed
		if (pets[pet].getElementsByClassName) {
			// first money amount is value, add to sum
			var petvalue = removecommas(pets[pet].getElementsByClassName("money")[0].innerHTML);
			sum += petvalue;
			var chore = Math.ceil(100*Math.sqrt(petvalue));
			if (chore > _maxChore)
				chore = _maxChore;
			chores += chore;
			var chore44 = Math.ceil(44*Math.sqrt(petvalue));
			if (chore44 > _maxChore*44/100)
				chore44 = _maxChore*44/100;
			chores44 += chore44;

			// name of the pet is innerHTML of second anchor
			var petname = pets[pet].getElementsByTagName("a")[1].innerHTML;

			// sum2 will exclude pets named private
			if (petname != "private") { sum2 += petvalue; }
		}
	}

	// Calculate prices for money spent and potential money once sold
	var sumB = Math.ceil(1.01*sum);
	var sum2B = Math.ceil(1.01*sum2);
	var sumC = Math.ceil(1.05*sum);
	var sum2C = Math.ceil(1.05*sum2);

	// Calculate assets to value ratio,
	// format with three decimal places.
	var atv = (sum + cash)/value;
	var atv2 = (sum2 + cash)/value;
	var atvB = (sumB + cash)/value;
	var atv2B = (sum2B + cash)/value;
	var atvC = (sumC + cash)/value;
	var atv2C = (sum2C + cash)/value;

	// Calculate percent invested,
	// format as percentage with two decimal places
	var pctInv = 100*(1-(cash/(sum + cash)));
	var pctInv2 = 100*(1-(cash/(sum2 + cash)));
	var pctInvB = 100*(1-(cash/(sumB + cash)));
	var pctInv2B = 100*(1-(cash/(sum2B + cash)));
	var pctInvC = 100*(1-(cash/(sumC + cash)));
	var pctInv2C = 100*(1-(cash/(sum2C + cash)));

	// Calculate total assets; format with commas
	var assets = addcommas(sum + cash);
	var assetsB = addcommas(sumB + cash);
	var assetsC = addcommas(sumC + cash);

	// Caculate total assets excluding private
	var assets2 = addcommas(sum2 + cash);
	var assets2B = addcommas(sum2B + cash);
	var assets2C = addcommas(sum2C + cash);

	// Put together final output!
	// Calculations excluding private go in parens.
	var statistic_info =
		"<table cellspacing=\"1\" width=\"100%\" border=\"0\">" +

		"  <tr>" +	//headers
		"    <th scope=\"col\" style=\"color: #FF0000\">USER STATISTIC</th>" +
		"    <th scope=\"col\">ACTUAL VALUE RATIO</th>" +
		"    <th scope=\"col\">SPENT MONEY RATIO</th>" +
		"    <th scope=\"col\">ONCE SOLD RATIO</th>" +
		"  </tr>" +

		"  <tr>" +	//headers
		"    <td style=\"border-bottom:  1px solid #AAAAAA\" colspan=\"4\"></td>" +
		"  </tr>" +

		"  <tr class=\"odd\">" +	//Pet Value
		"    <th scope=\"col\">Pet Value</th>" +
		"    <th scope=\"col\">$" + addcommas(sum) + "</th>" +
		"    <th scope=\"col\">$" + addcommas(sumB) + "</th>" +
		"    <th scope=\"col\">$" + addcommas(sumC) + "</th>" +
		"  </tr>" + 
		
		"  <tr class=\"even\">" +	//Assets Value
		"    <th scope=\"col\">Assets Value</th>" +
		"    <th scope=\"col\">$" + assets + "</th>" +
		"    <th scope=\"col\">$" + assetsB + "</th>" +
		"    <th scope=\"col\">$" + assetsC + "</th>" +
		"  </tr>" + 
		
		"  <tr class=\"odd\">" +	//A/V Ratio
		"    <th scope=\"col\">A/V Ratio</th>" +
		"    <th scope=\"col\">" + atv.toFixed(3) + "</th>" +
		"    <th scope=\"col\">" + atvB.toFixed(3) + "</th>" +
		"    <th scope=\"col\">" + atvC.toFixed(3) + "</th>" +
		"  </tr>" + 
		
		"  <tr class=\"even\">" +	//% Invested
		"    <th scope=\"col\">% Invested</th>" +
		"    <th scope=\"col\">" + pctInv.toFixed(2) + "%</th>" +
		"    <th scope=\"col\">" + pctInvB.toFixed(2) + "%</th>" +
		"    <th scope=\"col\">" + pctInvC.toFixed(2) + "%</th>" +
		"  </tr>" + 

		"  <tr>" +	//headers
		"    <td style=\"border-bottom:  1px solid #AAAAAA\" colspan=\"4\"></td>" +
		"  </tr>" +

		"  <tr class=\"odd\">" +	//Chores
		"    <th scope=\"col\">100pts Chore:</th>" +
		"    <th scope=\"col\">$" + addcommas(chores) + "</th>" +
		"    <th scope=\"col\">144pts Chore:</th>" +
		"    <th scope=\"col\">$" + addcommas(chores + chores44) + "</th>" +
		"  </tr>" + 

		"</table>";
		
	var imgStatus, txtColor, txtStatus, imgFocus = "";
	if (sum == 0 || pctInv == 0) {
		imgStatus = "http://photos-d.ak.fbcdn.net/hphotos-ak-snc1/hs199.snc1/6732_124540464628_809274628_2224995_5768216_s.jpg";
		txtColor = "#ffff00";
		txtStatus = "InActive";
	}
	else {
		if (pctInvC > 50) {
			imgFocus = "<img src=\"http://dl2.glitter-graphics.net/pub/629/629752qjwkcxihg4.gif\" style=\"position: absolute; left: 121px; top: 71px;\" alt=\"FOCUS STARS\"/>";
		}
		
		imgStatus = "http://photos-c.ak.fbcdn.net/hphotos-ak-snc1/hs199.snc1/6732_124540459628_809274628_2224994_4009002_n.jpg";
		if (pctInvC > 85) {
			txtColor = "#ff0000";
			txtStatus = "Hot";
		}
		else if (pctInvC > 60) {
			txtColor = "#770033";
			txtStatus = "Profit";
		}
		else {
			txtColor = "#444444";
			txtStatus = "Active";
		}
	}
	statistic_rank = "" +
		//"<div>" +
		"  <img src=\"" + imgStatus + "\" style=\"position: absolute; left: 121px; top: 71px;\" alt=\"PET STATUS\"/>" +
		"  <a href=\"" + document.location.href + "\" style=\"width: 68px; height: 66px; display: block; color: " + txtColor + "; font-size: 14px; text-align: center; position: absolute; left: 122px; top: 88px;\" onclick=\"return wait_for_load(this, event, function() { (new Image()).src = &#039;/ajax/ct.php?app_id=7019261521&amp;action_type=3&amp;post_form_id=b21a05f78cb29762e39a7b37b6dec4f7&amp;position=3&amp;&#039; + Math.random();return true; });\">" + txtStatus +
		"    <span style=\"font-size: 13px; display: block;\">pet</span>" +
		"  </a>" +
		//"</div>" + 
		imgFocus;
		
	statistic_tag = "" + 
		"<table class=\"user_statistic_rank\" cellspacing=\"1\" width=\"70%\" border=\"1\" align=\"center\">" +

		"  <tr>" +	//headers
		"    <th scope=\"col\" width=\"80px\">" + statistic_rank + "</th>" +
		"    <td colspan style=\"text-align: right;\">" + statistic_info + "</td>" +
		"  </tr>" +
		"</table>";

	document.body.innerHTML = document.body.innerHTML.replace("<ul class=\"navigation clearbox\"", 
		"<ul>" + statistic_tag + "</ul>" +
		"<ul class=\"navigation clearbox\"");
	//document.body.innerHTML = statistic_tag;
}
else {
	//alert('DEBUG -->' + 'Dang xem Dashboard');
}
