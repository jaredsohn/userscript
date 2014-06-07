// ==UserScript==
// @name           ksrtc.in
// @namespace      ksrtc
// @description    Karnataka KSRTC Seat Availabilty
// @include        http://59.162.166.116/AWATAROnline/advanceBooking.do*
// ==/UserScript==
// author : Anoop
// e-mail: anoopmail@gmail.com
// YIM : anoopchat@yahoo.com



var availabilityUrl = 'http://59.162.166.116/AWATAROnline/advanceBooking.do?ServiceID=' ;


var str = '--' ;
var executeScript = false ;
var radElements = new Array() ;

/*document.forms['advanceBookingActionForm']*/
var timeDropdown = document.getElementsByName('selectOnwardTimeSlab');
if(timeDropdown.length > 0 ){
	timeDropdown = timeDropdown[0] ;
	timeDropdown.insertBefore(new Option("-- All -- ","00:00-23:59"),timeDropdown.firstChild);
	timeDropdown.selectedIndex = 0 ;
}



for(var i = 0 ; i < document.forms[0].elements.length ; i++ ){
	if (document.forms[0].elements[i].name  == 'radOnwardServiceID'  ) {
	executeScript = true ;
	radElements.push(document.forms[0].elements[i]) ;
	}
	str += document.forms[0].elements[i].name + "\n\r" ;
}

if ( executeScript == false ) return ;

var tr, td ;

var placeholder = document.createElement('div');
placeholder.id="holder";
placeholder.style.display = 'none' ;
document.body.insertBefore(placeholder, null);

var placeholderDebug = document.createElement('div');
placeholderDebug.style.display = 'none' ;
placeholderDebug.id = 'ice' ; 
document.body.insertBefore(placeholderDebug, null);
		 
for(var i = 0 ; i < radElements.length ; i++ ){
	tr = radElements[i].parentNode.parentNode.parentNode ;
	td = document.createElement('td');
	tr.appendChild(td) ;
	var divHtml = td.previousElementSibling.firstElementChild.innerHTML;
	var arr = divHtml.match(/<a .*ServiceID=(.*?)'/) ;
	var params  = arr[1];
	params = params.replace(/&amp;/g, '&') ;
	getAvailability(td, availabilityUrl +  params   + '&ts=' + Math.random()   );
	//getAvailability(td, availabilityUrl +  radElements[i].value + '&ts=' + Math.random() );
}






function getAvailability(target, targetUrl)
{
    
   GM_xmlhttpRequest({
      method: 'GET',
      url: targetUrl,      
      
      onload: function(responseDetails) 
      {
         var success = false;
         
		 target.innerHTML = '?' ;
		if ( responseDetails.status == 200 )
         {
         	//document.getElementById('ice').innerHTML =   document.getElementById('ice').innerHTML + targetUrl + '<br>' +   responseDetails.responseText;
			document.getElementById('holder').innerHTML =    responseDetails.responseText;
			var elements = placeholder.getElementsByClassName('button');
			var iSeatsAvailable =  elements[0].innerHTML ;
			if(iSeatsAvailable == 0 ) {
				iSeatsAvailable='<p style="color:red;font-size:10px">Full</p>';
			}
			target.innerHTML = iSeatsAvailable ;
			 
			 
         }

         /*if (!success)
         {
            if (isRetryableFailure(responseDetails))
            {
               target.innerHTML = getFormattedAvailabilityHTML(retryingText);
               getAvailability(target, targeturl);
            }
            else
            {
                showErrorText(placeholder, target);
            }

         }
		 */
      }
   });
}
return ;






