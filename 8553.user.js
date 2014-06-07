// ==UserScript==
// @name           Google Maps + MLS.ca
// @description    Add a Google Maps link to the MLS property search results
// @namespace      ingeo.org/gmonkey
// @include        http://www.mls.ca/PropertyResults.aspx*
// ==/UserScript==

var trimReg = /^\s*|\s*$/g;
var validAddress = /^\d+/;

var googleIcon = 'data:image/gif,GIF89a%10%00%10%00%F7%00%00%D4%12%04%2C%B6D%14%1E' + 
	'%84%7C%8E%C4%CC%D2%D4%1CZ%B4%FC%FA%DC%CC%EA%FC%1C%3A%8C%24n%BC%C4%F6%FC%24R%D4' + 
	'%04%12T%E4%F6%F4%C4%22%04%EC%FE%F4%046%B4%AC%D2%FC%24b%DCL%AET%14*%AC%1CB%B4%BC' + 
	'%DE%F4%7C%A6%D4%FC%F6%F4%242%B4%24Z%EC%D4%26%1C%DC%1A%14%04%22%94%FC%F6%EC%FC%F2%' + 
	'F4T%B2%3C%8C%8E%DC%5Cj%ACDv%CC%EC%FE%FC%1C%3A%B4%CC%D2%F4%24Z%CC%1C%5E%D4%14b%E4D%' + 
	'BAL%E4%DE%EC%FC%F6%FC%DC%1A%04%E4%F6%FC%CC*%04%142%C4%0C*%CCl%AE%EC%CC.%24%14.%A4%' + 
	'F4%FE%EC%EC%EE%FCT%BA%3C%84%9A%DC%CC%D6%FC4Z%D4L%B6T%0C%12%9C%FC%FA%E4%D4%F2%FC%246' + 
	'%9Cd%86%AC%FC%FE%F4%AC%B6%C4%24%3A%B4%14%5E%F4%D4%22%2C%D4%1E%1C%1C%26%8CL%B2Dd%86%' + 
	'DC%FC%FE%FC%14b%CC%1Cj%E4%D4%E6%FC%F4%FA%FC%E4%FA%FC%FC%F2%FCl%9A%EC%CC%16%0C%3C%B6D%84' +
	'%8E%D4%C4%DA%E44b%BC%DC%EA%FC%14%3A%94Tr%BC%2C2t%CC%26%04%F4%FE%F4%142%BC%BC%D6%FC%14j%D4%' + 
	'04%26%BC%1CJ%B4%CC%DE%F4%A4%AA%CC%FC%FA%F446%B4%1CV%F4%DC%26%1C%CC%16%1C%F4%FA%ECL%B6%3CDn' + 
	'%DC%F4%FE%FC%14%3E%BC%C4%CE%FC%24%5E%CC%1C%5E%DC%04b%ECT%B6L%D4%1E%0C%D4*%0C%1C2%C4%24.%C4%' + 
	'FC%FE%EC%F4%F2%FC%D4%DA%FC%2CZ%DCD%BAT%0C%16%A4%FC%FE%E4%2C%26%8C%E4%E6%FC%FC%FA%FC%7C%9E%EC%' + 
	'EC%FA%FC%00%00%00%EF%D2%00%EA%0C%00%813%00%7C%00%00%9B%01%07%E2%00%00%81%00%00%7C%02%00%20' + 
	'%01%00%9B%00%00P%00%00%00%00%00%20%D8%00i%E3%F0%01%12%15%00%00%00l-%00%00%D5%00%00A%00%00~%00%' +
	'F4%DE%00%E1%9E%00%12%00%00%00%00%004%D0%00%00%E3%00%00%12%00%C0%00%00%F8%DD%00%F7*%00%12%83%00%' + 
	'00%7C%00%18%00h%EE%00%9E%90%00%80%7C%00%7Cp%00%FF%05%00%FF%91%00%FF%7C%00%FF%FF%00%60%FF%00%9E%FF' +
	'%00%80%FF%00%7Cm%00%3F%05%01%00%91%00%00%7C%00%00JA%3F%F4%2B%00%80%83%00%7C%7C%00%00%F4H%00%E3%EB' +
	'%15%12%12%00%00%00%00%1C%FF%00%2B%FF%00%83%FF%00%7C%FF%20%00%00i%00%00%15%00%00%00%00%00%00x%FC%01%' +
	'F0%E4%00%15%12%00%00%00%00%8C%D6%00cX%00%83L%00%7C%00W%FF%DC%F4%FF%E4%80%FF%12%7C%FF%00%E0%F8w%E3%' +
	'E40%12%12O%00%00%00%20%C5%10ic%E5%15%83%12%00%7C%00E4%8C%00Lc%00O%83%00%00%7Cx%20%C7%13U%E5%15O%12%00' +
	'%00%00%00%00%BF%00%01%FF%15%00%FF%00%00%7F%08%F4%88y%E3%E5%15%12%12%00%00%00%D8%00x%E2%01%F0%12%00%15' + 
	'%00%00%00t%E0%8C%E5cc%12%83%83%00%7C%7C%1C%01x%E5%00%F0%12%00%15%00%00%00%18%00%DE%EEe%9E%90m%00%7Co%' + 
	'008n%00%07k%00%91e%00%7Cy%00%FF%00%9D%FF%00%FF%FF%00G%FF%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%' + 
	'00%10%00%07%08%FF%00S%C8Q3%01%C9%1E%10HvL%B9%A1%02D%80)S%F4%A4Q%C2%A2%0F%09%25.V%B0%B1%01%88%05%20(3%88' + 
	'(a%C3%C6G%20%11C%60%40%B0%22%C3%02%97%1E%5B%96(y%A0%60D%97%2B%17I%E4%40%A0%C5%06%14%00o%FA(I%F2CP%9F%20J%' + 
	'94%00%12C%20%08%19%3AL%9C%E0%C0%92C%C9%1D.%7D%B8%00%02%A4%84%CB%9D%17%1A%94D)%C1BI%10%40%24%3F%98%BD%C3B%' +
	'CA%02%12%09%0A%1C%ED%C8%B5%AC%92%1A%808%A4%20q%22%0C%0B(A%D8%00B%9A%B4%8F%81%22(%D8%AC%E9%40F%09%94%91%24%AA' +
	'%1C8%60%A2%8F%03%095.%80%19pq%B0%9B2%142P%09%B2%C1%8C%12Av%F8xa%A3%04%83%D2%26%02%C6%F4A%23!H%9F%26~%F8%84%10%' +
	'14%84%0B%9B%08%0C%84%F4%99%F3%85%24%C6%2CGh%C0h%13%A3%02%10%17J%8C%E8%80%224%A9%F5%A4N(b8%03%B1%BB%F7%EFSZ%04%01%04%00%3B';

/*
 Create a form that can be used to submit the address
 to google maps.
*/
var oForm = document.createElement('form');
oForm.id = 'orgIngeo';
oForm.action='http://maps.google.com';
oForm.method = 'get';
oForm.target = '_blank';

document.body.appendChild(oForm);

var oDiv = document.createElement('div');
oDiv.id = 'orgIngeo_frmEls';

oForm.appendChild(oDiv);

var oInput = document.createElement('input');
oInput.id = 'orgIngeo_q';
oInput.name = 'q';
oInput.type = 'hidden';

oDiv.appendChild(oInput);


/*
 Grab all heading tables, find the address and insert a link to google maps 
*/

var mainHeadings =  document.evaluate(
    "//table[@class='MainHeadingTable']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < mainHeadings.snapshotLength; i++) {
    
    
    thisTbl = mainHeadings.snapshotItem(i);
    
    var price = thisTbl.rows[0].cells[0].innerHTML.replace(trimReg, '');
    var mls = '';
    
    /*
     The address is stored in a cell along with the region (they are seperated by a <br>
    */
    var tmp = thisTbl.rows[0].cells[1].innerHTML.replace(trimReg, '');
    var address = tmp.split('<br>')[0];
        
    /*
    	if it doesn't start with an address number assume there isn't a valid address
    	add a generic link to google maps instead
    */
    if (!validAddress.test(address)) { 
    	var mapTd = thisTbl.rows[0].insertCell(thisTbl.rows[0].cells.length);
		mapTd.className = 'MainHeadingSecondary';
		mapTd.style.textAlign = 'right';
		
		
		var gMap = document.createElement('a');
		gMap.target = '_blank';
		gMap.href = 'http://maps.google.com';
		gMap.innerHTML = 'Invalid Address';
		mapTd.appendChild(gMap);
		mapTd.title = 'Open Google Maps';
		
    	continue; 
    }
    
	//The MLS number can be found in the alt attribute of the image    
	var imgs = document.evaluate(
    	"//img[@class='PhotoResults']",
    	thisTbl,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   	 	null);
    
    //use the first image found
    var img = imgs.snapshotItem(0);
    if (img) {
    	mls = img.alt.replace(trimReg, '');
    }
    
    //Google Maps doesn't like CR, replace with Crescent       	
    address = address.replace(' CR, ', ' CRESCENT, ');
    
    
  /*
   Add the mls and the price to the Address string
   Google Maps will add these values to the location popup
  */    	
	address += '+(MLS: ' + mls + ' Price: ' + price + ')';
	
	var td = thisTbl.rows[0].insertCell(thisTbl.rows[0].cells.length);
	td.className = 'MainHeadingSecondary';
	td.style.textAlign = 'right';
	td.style.verticalAlign = 'top';
	
	var a = document.createElement('a');
	
	a.title = 'Google Map It';
	a.href = "javascript:var f=document.getElementById('orgIngeo'); var q=document.getElementById('orgIngeo_q');" +
		"q.value='" + address + "'; f.submit();";
		
	//a.innerHTML = 'Map';
	
	var logo = document.createElement('img');
	logo.src = googleIcon;
	logo.alt = 'Go to Google Maps';
	
	
	a.appendChild(logo);
	
	
	td.appendChild(a);	    
}
