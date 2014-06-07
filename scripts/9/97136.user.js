// ==UserScript==
// @name EA Sports FIFA Superstars Auto Accept Gifts
// @author RwDwG
// @version 1.3
// @include http://apps.facebook.com/*
// @include http://www.facebook.com/reqs.php*
// @include http://facebook.com/reqs.php*

// ==/UserScript==

var delay = 1100;

var hrf = window.location.href;


var isBody = false; //prevents starting functions more than once per refresh
//replaces Opera's DOMContentLoaded event...
function ReadyToStart(){
if(document.body && (isBody==false)){
isBody = true;
return true;
}
else{
return false;
}
}


// Listeners

window.addEventListener('DOMNodeInserted', function(e) {

	//waiting for confirm box (box which appeares when you click send gift button
    if(hasClass(e.target,'dialog_content'))
		{
		//clicks "send" button from new box
		if(!clickElementFound('//label[@class="uiButton uiButtonLarge uiButtonConfirm"]/input[@name="sendit"]'))
		 { 
		if(clickElementFound('//label[@class="uiButton uiButtonLarge uiButtonConfirm"]/input[@value="Send"]'))
		{window.location.href = hrf;}
		 }
		}
		
	
		
		if(ReadyToStart() && (navigator.appName != "Opera") )//its time to use script (everything was loaded)
		{
	
		checkUrls(); // and open function if needed
		return;
		}

	
}, false);

window.addEventListener('Load', function(e) {



}, false);

window.addEventListener('DOMCOntentLoaded', function(e) {

//cause Opera loads pages differently
if(navigator.appName == "Opera"){

		checkUrls();
		
		}
}, false);


//Handlers for particular games
function AcceptGiftsFromGame(reqsLink,urlPart)
{ 

if(hrf.indexOf(urlPart)!=-1){ //on page with gift 
	hrf = reqsLink;
	try{
	//click send back button
	

	var btnXpath='//span[@class="fb_protected_wrapper"]/input';
		
	if(!clickElementFound(btnXpath))
       {window.location.href = reqsLink;}
    	
		}
	catch(e){window.location.href = reqsLink;}
	
	}
	else 	//on FB Gifts request page
		{
		
		try{

			var gameName = urlPart.substring(0,urlPart.indexOf('/')+1);
			var xpt = '//label[@class="uiButton uiButtonConfirm"]/input[contains(@name,"'+gameName+'")]';
			var acceptbuttons2 = xpath(document, xpt);
			var giftsLeft = acceptbuttons2.snapshotLength;
			if(giftsLeft!=0)
			document.title = giftsLeft + " Gifts Left";
			else
			document.title = "Gift Accepted";
			
			var acceptbuttons = xpath(document,'//label[@class="uiButton uiButtonConfirm"]/input');
			for (var i = 0; i < acceptbuttons.snapshotLength; i++) { 
			//will search for particular accept button
				var acceptbutton = acceptbuttons.snapshotItem(i);
				var acceptbuttonName = acceptbutton.getAttribute("name");
	
				if(acceptbuttonName.indexOf(urlPart)!=-1)
				{
				
				setTimeout((function(){acceptbutton.click();}),delay);
				//acceptbutton.click();

				return;
				}
			}
			
		}
		
		
		catch(e){window.location.href = hrf + "?" + Date.parse(new Date());} //refreshes page if error
		}
}

function checkUrls(){
		hrf= window.location.href;

               //FIFA Superstars
  checkGameUrl("fifasuperstars/sticker_click_handler?","http://www.facebook.com/reqs.php#confirm_113719625324737_0");
  checkGameUrl("fifasuperstars/request_click_handler?","http://www.facebook.com/reqs.php#confirm_113719625324737_0");

		//Madden NFL Superstars
  checkGameUrl("maddennflsuperstars/sticker_click_handler?","http://www.facebook.com/reqs.php#confirm_138575656172984_0");
  checkGameUrl("maddennflsuperstars/gifts_send.php?action=gift_thanks","http://www.facebook.com/reqs.php#confirm_138575656172984_0");
  checkGameUrl("maddennflsuperstars/end_regift_sticker?","http://www.facebook.com/reqs.php#confirm_138575656172984_0");

             //World Series Superstars
  checkGameUrl("worldseriesuperstars/sticker_click_handler?","http://www.facebook.com/reqs.php#confirm_207994305877684_0");
  checkGameUrl("worldseriesuperstars/gifts_send.php?action=gift_thanks","http://www.facebook.com/reqs.php#confirm_207994305877684_0");
  checkGameUrl("worldseriesuperstars/end_regift_sticker?","http://www.facebook.com/reqs.php#confirm_207994305877684_0");
  checkGameUrl("worldseriesuperstars/coop_click_handler?","http://www.facebook.com/reqs.php#confirm_207994305877684_0");

}

function checkGameUrl(urlPart,reqsLink)
{	
		if(hrf.indexOf(reqsLink)!=-1 || hrf.indexOf(urlPart)!=-1)
		{AcceptGiftsFromGame(reqsLink,urlPart);}
}

// Helpers 
function xpath(elem, query) {
    return elem.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function clickElementFound(xpathexpression){

var elements = xpath(document,xpathexpression);
if(elements.snapshotLength>0){
var button = elements.snapshotItem(0);

eventFire(button,'click');

return true;}
else
{return false;}
}

function hasClass (obj, className) {
    if (typeof obj == 'undefined' || obj==null || !RegExp) { return false; }
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
    if (typeof(obj)=="string") {
      return re.test(obj);
    }
    else if (typeof(obj)=="object" && obj.className) {
      return re.test(obj.className);
    }
    return false;
  }

function eventFire(el, etype){

    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
}

function fireEvent(element,event) {
if(element==null)



   if (document.createEvent) {
       // dispatch for chrome + firefox + others

       var evt = document.createEvent("HTMLEvents");

       evt.initEvent(event, true, true ); // event type,bubbling,cancelable

       return !element.dispatchEvent(evt);
   } else {
       // dispatch for IE
       var evt = document.createEventObject();
       return element.fireEvent('on'+event,evt)
   }
}