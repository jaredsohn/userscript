// ==UserScript==
// @name        Autofill "Skapa ny kund"
// @namespace   lester.stardust@gmail.com
// @include     https://se-imagebank.specsaversnordic.com/admin/customer/create
// @version     1
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// ==/UserScript==

var targForm    = document.querySelector ("form");
if (targForm) {
    
    var searchText = document.createElement ("TEXTAREA");
    searchText.setAttribute('style', 'border: 1px solid rgb(204, 204, 204); height: 15px; width: 140px; padding-top: 2px;');
    searchText.setAttribute('cols', '11');
    searchText.setAttribute('id', 'lesTextarea1');
    searchText.setAttribute('placeholder', 'Personnummer');
    
    var searchDiv  = document.createElement ("DIV");
    searchDiv.setAttribute('style', '');
    
    var searchPghp = document.createElement ("P");
    var searchBtn  = document.createElement ("DIV");
    searchBtn.setAttribute('style', 'border: 1px solid rgb(204, 204, 204); background-color: rgb(0, 99, 56); color: white; font-weight: bold; width: 130px; padding-left: 10px; cursor: pointer; ');

    searchBtn.textContent  = "Hämta uppgifter";

    searchBtn.addEventListener ("click", searchyTimeGo,   false);

    searchDiv.appendChild  (searchPghp);
    searchPghp.appendChild (searchBtn);

    targForm.parentNode.insertBefore (searchText, targForm);
    targForm.parentNode.insertBefore (searchDiv, targForm);
}
else {
    alert ("No form found on the page!");
}

// Handle a simple GET request
function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function searchyTimeGo () {

    // Get userId from customer registry (NOT Image Bank!), search using SSN
    url = "https://se-booking.louisnielsen.dk/admin/customer?ssn=" + document.getElementById('content').getElementsByTagName('textarea')[0].value;
    
    // use GM_xmlhttpRequest to allow XSS
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            matchResult(response.responseText);
        }
    });
}

function matchResult(result){

    var userId = result.match('/admin/customer/edit/userId/([0-9]*)')[1]; // extract only variable from regex match

    var url = "https://se-booking.louisnielsen.dk/admin/customer/edit/userId/" + userId;

    // use GM_xmlhttpRequest to allow XSS
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response2) {
            matchResult2(response2.responseText);
        }
    });
}
function matchResult2(result2) {
    
    try{
        var persNr = result2.match('id="customerSSN" value="(.*)" />')[1]; // extract only variable from regex match
        var firstName = result2.match('id="customerFirstname" value="(.*)" />')[1]; // extract only variable from regex match
        var lastName = result2.match('id="customerLastname" value="(.*)" />')[1]; // extract only variable from regex match
        var address = result2.match('id="customerAddress" value="(.*)" />')[1]; // extract only variable from regex match
        var address2 = result2.match('id="customerAddress2" value="(.*)" />')[1]; // extract only variable from regex match
        var zipCode = result2.match('id="customerZipCode" value="(.*)" />')[1]; // extract only variable from regex match
        var city = result2.match('id="customerCity" style="float: right; width: 200px;">\n(.*)</div>')[1].trim(); // extract only variable from regex match
        var phone = result2.match('id="customerPhone" value="(.*)" />')[1]; // extract only variable from regex match
        var mobile = result2.match('id="customerMobile" value="(.*)"')[1]; // extract only variable from regex match
        var email = result2.match('id="customerEmail" value="(.*)" />')[1]; // extract only variable from regex match 
        var email = result2.match('id="customerEmail" value="(.*)" />')[1]; // extract only variable from regex match 
        
    }catch(err){
        alert("Kunde inte läsa journalen: " + err);
    }
	
    //document.getElementById('customerNumber').value = number;
    document.getElementById('customerPhone').value = phone;
    document.getElementById('customerMobile').value = mobile;
    document.getElementById('customerEmail').value = email;
    document.getElementById('customerSSN').value = persNr;
    document.getElementById('customerFirstname').value = firstName;
    document.getElementById('customerLastname').value = lastName;
    document.getElementById('customerAddress').value = address;
    document.getElementById('customerAddress2').value = address2;
    document.getElementById('customerZipCode').value = zipCode;
    document.getElementById('customerCity').value = city;
    
}

// Run search at enter button
searchText.onkeyup = function(e){
  e = e || event;
  if (e.keyCode === 13) {
    searchyTimeGo();
  }
  return true;
 }

function addCss(cssString) { 
    var head = document.getElementsByTagName('head')[0]; 
    //return unless head; 
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 

//addCss('label {text-align: right; margin-right: 10px;}');