// ==UserScript==
// @name           a Modified eBay.com invoice layout
// @namespace      Seifer - http://userscripts.org/users/33118
// @include        *//payments.ebay.com*/eBayISAPI.dll?UnifiedCheckOutSummary*
// ==/UserScript==

//---------------------------------------------
//------------- EDIT THIS SECTION -------------
//---------------------------------------------
showpre = true; // TRUE of FALSE - Set to display PRE GST prices.
pricestyle = "color: RED"; // Any STYLE attribute(s) - For the PRE GST prices.

//---------------------------------------------
//----------- DO NOT EDIT ANY MORE ------------
//---------------------------------------------

function isNumber(value) {
	value=value.toString();
	if(value=="1" || value=="2" || value=="3" || value=="4" || value=="5" || value=="6" || value=="7" || value=="8" || value=="9" || value=="0") {
		return true;
	} else {return false;}
}

orderdetails = document.getElementById('orderdetails');
itemtable = orderdetails.childNodes[9].rows[1].cells[1].childNodes[3].childNodes[3];
totalstable = orderdetails.childNodes[11].childNodes[1].rows[0].cells[1].childNodes[1].rows[0].cells[0].childNodes[1];

itemnumberth = document.createElement('th');
itemnumberth.setAttribute('width','10%');
itemnumberth.setAttribute('align','left');
itemnumberth.setAttribute('nowrap','nowrap');
itemnumberth.innerHTML = '<img width="5" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/><b>Item Number</b>';
itemtable.rows[0].cells[0].parentNode.insertBefore(itemnumberth,itemtable.rows[0].cells[0]);

unitpriceth = document.createElement('th');
unitpriceth.setAttribute('width','10%');
unitpriceth.setAttribute('align','right');
unitpriceth.setAttribute('nowrap','nowrap');
unitpriceth.innerHTML = '<img width="5" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/><b>Unit Price</b><img width="10" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/>';
itemtable.rows[0].cells[3].parentNode.insertBefore(unitpriceth,itemtable.rows[0].cells[3]);

itemtable.rows[1].cells[0].setAttribute('colspan','6');

var i;
var currencysym;
for (i=2; i<itemtable.rows.length ;i=i+2){
	if(i > 2) {
		itemtable.rows[i-1].cells[0].setAttribute('colspan','6');
	}
	inHTML = itemtable.rows[i].cells[0].getElementsByTagName('table')[0].rows[1].cells[1].innerHTML;
	itemtable.rows[i].cells[0].getElementsByTagName('table')[0].rows[1].parentNode.removeChild(itemtable.rows[i].cells[0].getElementsByTagName('table')[0].rows[1]);
	itemnum = inHTML.substring(inHTML.indexOf('(')+1,inHTML.indexOf(')'));
	unitpr = inHTML.substring(inHTML.indexOf(': ')+2,inHTML.indexOf('.')+3);

	if(!currencysym) {
		n=0;
		while(!isNumber(unitpr.charAt(n))) {
		n++;
		}
		currencysym = unitpr.substring(0,n);
	}

	itemnumber = document.createElement('td');
	itemnumber.setAttribute('valign','top');
	itemnumber.setAttribute('nowrap','nowrap');
	itemnumber.setAttribute('align','left');
	itemnumber.innerHTML = '<img width="5" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/>'+itemnum;
	itemtable.rows[i].cells[0].parentNode.insertBefore(itemnumber,itemtable.rows[i].cells[0]);

	unitprice = document.createElement('td');
	unitprice.setAttribute('valign','top');
	unitprice.setAttribute('nowrap','nowrap');
	unitprice.setAttribute('align','right');
	unitprice.innerHTML = unitpr+'<img width="10" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/>';
	if(showpre) {
		preunitpr = inHTML.substring(inHTML.indexOf(currencysym)+currencysym.length,inHTML.indexOf('.')+3);
		preunitpr = (preunitpr/11)*10;
		preunitpr = preunitpr.toString();
		preunitpr = preunitpr.substring(0,preunitpr.indexOf('.')+3);
		if(preunitpr.indexOf('.') == -1) {
			preunitpr = preunitpr+'.00';
		}
		unitprice.innerHTML = unitprice.innerHTML+'<br>\r\n<span style="'+pricestyle+'">'+currencysym+preunitpr+'</span><img width="10" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/>';
	}
	itemtable.rows[i].cells[3].parentNode.insertBefore(unitprice,itemtable.rows[i].cells[3]);

	price = itemtable.rows[i].cells[5];
	inHTML = itemtable.rows[i].cells[5].innerHTML;
	if(showpre) {
		prepr = inHTML.substring(inHTML.indexOf(currencysym)+currencysym.length,inHTML.indexOf('.')+3);
		prepr = (prepr/11)*10;
		prepr = prepr.toString();
		prepr = prepr.substring(0,prepr.indexOf('.')+3);
		if(prepr.indexOf('.') == -1) {
			prepr = prepr+'.00';
		}
		price.innerHTML = price.innerHTML+'<br>\r\n<b><span style="'+pricestyle+'">'+currencysym+prepr+'</span></b><img width="10" height="1" src="https://securepics.ebaystatic.com/aw/pics/s.gif"/>';
	}
}

if(showpre) {
	for (i=2; i<totalstable.rows.length ;i++){
		if(totalstable.rows[i].cells[1]) {
			inHTML = totalstable.rows[i].cells[1].innerHTML;
			price  = totalstable.rows[i].cells[1].innerHTML;
			if(price.indexOf('$') > 0) {
				price = price.substring(price.indexOf(currencysym)+currencysym.length,price.indexOf('.')+3);
				price = (price /11)*10;
				price = price.toString();
				price = price.substring(0,price.indexOf('.')+3);
				if(price.indexOf('.') == -1) {
					price = price+'.00';
				}
				added = '<br>\r\n<span style="'+pricestyle+'">'+currencysym+price+'</span>';
				totalstable.rows[i].cells[1].innerHTML = inHTML +added;
			}
		}
	}
}


// Check for updates
script_name = "a Modified eBay.com invoice layout";
script_num = '12405';
script_version=1.01;
script_updatetext="Now adds .00 to the end of pre GST prices that have no cents.";

GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/review/"+script_num+"?format=txt",
    onload: function(responseDetails) {
    	var text = responseDetails.responseText;
    	var update_version = text.substring(text.indexOf("script_version=")+15,text.indexOf("\n",text.indexOf("script_version="))-2);
    	var update_text = text.substring(text.indexOf("script_updatetext=")+19,text.indexOf("\n",text.indexOf("script_updatetext="))-3);
    	if(update_version > script_version) {
    		newversion = document.createElement("div");
    		newversion.setAttribute("id", "gm_update_alert");
    		newversion.setAttribute("style", "background-color:yellow; width:100%; position:absolute; z-index:99; top:0px; left:0px; text-align:center; font-size:11px; font-family: Tahoma");
    		newversion.innerHTML = "<a href='#' onclick='document.body.removeChild(document.getElementById(&quot;gm_update_alert&quot;))' style='color:red'>Close</a><font color='yellow'>--------</font><font color='red'>There is a new version of the &quot;"+script_name+"&quot; script. You are currently running version "+script_version+".</font><br><font color='yellow'>----------------</font>The latest version is "+update_version+". <a href='#' onclick='document.getElementById(&quot;gm_update_alert_info&quot;).setAttribute(&quot;style&quot;, &quot;display:block&quot;)' style='color:green'>Click here for more info</a> or <a style='color:green' href='http://userscripts.org/scripts/source/"+script_num+".user.js'><b>Click here to download the latest version</b></a><span id='gm_update_alert_info' style='display:none'><b>Here's a short description of the latest update...</b><br>"+update_text+"</span>";
    		document.body.appendChild(newversion);
    	}
    }
});