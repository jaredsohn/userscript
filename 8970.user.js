// ==UserScript==
// @name           Cash Available
// @namespace      http://www.baseballsimulator.com
// @description    Shows cash available on trade offer page.
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/*/trade/offer_trade.html?other_team_id=*
// @include        http://fantasygames.sportingnews.com/stratomatic/*/trade/offer_trade.html?other_team_id=*
// @include        http://fantasygames.sportingnews.com/stratomatic/trade/offer_trade.html?other_team_id=*
// ==/UserScript==

var HIDDEN_DIV_ID = 'baseballsimulatorDiv';

var other_team_id = document.evaluate("//input[@name='other_team_id']/@value",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
other_team_id = other_team_id.snapshotItem(0);

var myCheckboxs, myCheckbox;
var myCheck2 = 0;
var myCheck3 = 0;

var otherCheckboxs, otherCheckbox;
var otherCheck2 = 0;
var otherCheck3 = 0;

//Get current URL
var thisURL = document.URL;
thisURL = thisURL.substring(0,thisURL.lastIndexOf('/'));
thisURL = thisURL.replace('trade','team');

//Get check boxes for my players.
var myCheckboxes =  document.evaluate("//tr/td/input[@name='give']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < myCheckboxes.snapshotLength; i++) {
    		myCheckbox = myCheckboxes.snapshotItem(i);

		if (myCheckbox.checked) {

		var myChecks = document.evaluate("//tr/td[1]/table/tbody/tr/td[contains(text(),'$')]/text()",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var myCheck = myChecks.snapshotItem(i);
		
		myCheck2 = String(myCheck.data);
		myCheck2 = myCheck2.replace('$',' ');
		myCheck2 = parseFloat(myCheck2);
		myCheck3 = myCheck3 + myCheck2;
		
		}

	}

//Get checkboxes for other team players.
var otherCheckboxes =  document.evaluate("//tr/td/input[@name='take']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var j = 0; j < otherCheckboxes.snapshotLength; j++) {
    		otherCheckbox = otherCheckboxes.snapshotItem(j);

		if (otherCheckbox.checked) {

		var otherChecks = document.evaluate("//tr/td[2]/table/tbody/tr/td[contains(text(),'$')]/text()",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var otherCheck = otherChecks.snapshotItem(j);
		
		otherCheck2 = String(otherCheck.data);
		otherCheck2 = otherCheck2.replace('$',' ');
		otherCheck2 = parseFloat(otherCheck2);
		otherCheck3 = otherCheck3 + otherCheck2;
		
		}

	}

// Get other team data
setTimeout( callSecondGM_xmlhttpRequest, 1000); 
GM_xmlhttpRequest({
    method: 'GET',
    url: thisURL + '/team_other.html?user_id=' + other_team_id.nodeValue,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s = new String(details.responseText);

   var document = appendToDocument(s);
    }
});

function appendToDocument(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;
var other_team_salary = document.evaluate("//tr/td[1][contains(string(),'Cash')]/text()[5]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < other_team_salary.snapshotLength; i++) {
    other_team_salary = other_team_salary.snapshotItem(0);

	other_team_salary = String(other_team_salary.nodeValue);
	other_team_salary = other_team_salary.replace(/,/g,'');
	other_team_salary = other_team_salary.replace('$','');
	other_team_salary = other_team_salary.replace(/^\s+|\s+$/g,'');
	other_team_salary = parseFloat(other_team_salary);
	other_team_salary = other_team_salary/1000000;

	other_team_salary = (other_team_salary + parseFloat(otherCheck3) - parseFloat(myCheck3));
	other_team_salary = other_team_salary.toFixed(2);

var other_team_name = document.evaluate("//td[@class='even title tleft']/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
other_team_name = other_team_name.snapshotItem(1);

var myDiv = document.createElement('div');
myDiv.innerHTML = other_team_name.nodeValue + '<br>'+ '<small>'+ "Cash available after trade:   " + "$" + other_team_salary + "M" + '</small>';
replacement = document.createTextNode('replacement');
other_team_name.parentNode.replaceChild(myDiv, other_team_name);

var scriptRemover = document.getElementById('script');
if (scriptRemover) {
    scriptRemover.parentNode.removeChild(scriptRemover);
}

}
        return document;
}

//Get my team data
function callSecondGM_xmlhttpRequest(){
GM_xmlhttpRequest({
    method: 'GET',
    url: thisURL + '/team.html',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s2 = new String(details.responseText);
	   var document = appendToDocument2(s2);
    }
});

function appendToDocument2(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;

var editName = document.evaluate("//table[@class='cleft']/tbody/tr/td/span/a",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(editName.snapshotLength == 1){

	var my_team_salary = document.evaluate("//tr/td[1][contains(string(),'Cash')]/text()[7]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

}
else
{

	var my_team_salary = document.evaluate("//tr/td[1][contains(string(),'Cash')]/text()[6]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

for (var i2 = 0; i2 < my_team_salary.snapshotLength; i2++) {
	my_team_salary = my_team_salary.snapshotItem(0);
	my_team_salary = String(my_team_salary.nodeValue);
	my_team_salary = my_team_salary.replace(/,/g,'');
	my_team_salary = my_team_salary.replace(/^\s+|\s+$/g,'');
	my_team_salary = parseFloat(my_team_salary);
	my_team_salary = my_team_salary/1000000;

	my_team_salary = (my_team_salary + parseFloat(myCheck3) - parseFloat(otherCheck3));
	my_team_salary = my_team_salary.toFixed(2);

var my_team_name = document.evaluate("//td[@class='even title tleft']/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
my_team_name = my_team_name.snapshotItem(0);

var myDiv2 = document.createElement('div');
myDiv2.innerHTML = my_team_name.nodeValue + '<br>'+ '<small>' + "Cash available after trade:   " + "$" + my_team_salary + "M" + '</small>';
replacement = document.createTextNode('replacement');
my_team_name.parentNode.replaceChild(myDiv2, my_team_name);

}
        return document;
}

}

