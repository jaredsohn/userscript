// ==UserScript==
// @name LotsGiftsAccepter
// @author DM
// @version 1.2
// @include http://apps.facebook.com/*
// @include http://www.facebook.com/reqs.php*

// ==/UserScript==
var delay = 2000;


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


// Listeners :P

window.addEventListener('DOMNodeInserted', function(e) {

	//waiting for confirm box (box which appeares when you click send gift button on Lots (and some other games))
    if(hasClass(e.target,'dialog_content'))
		{
		
		//clicks "send" button from new box
		if(!clickElementFound('//label[@class="uiButton uiButtonLarge uiButtonConfirm"]/input[@name="sendit"]'))
		 { 
		if(clickElementFound('//label[@class="uiButton uiButtonLarge uiButtonConfirm"]/input[@value="Okay"]'))
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

	checkUrls();

}, false);

window.addEventListener('DOMCOntentLoaded', function(e) {

//cause Opera loads pages differently
if(navigator.appName == "Opera"){
//alert('contentLoad');
	
		
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
       {

window.location.href = reqsLink;}
    	window.location.href = reqsLink;
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
			document.title = giftsLeft + " gifts left";
			else
			document.title = "All gifts accepted";
			
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
		
		
		catch(e){window.location.href = hrf + "?" + Date.parse(new Date());} //refreshes page if error, hope it will refresh only once
		}
}

function checkUrls(){
		hrf= window.location.href;

		//CA gifts
		checkGameUrl("castle_age/gift_accept.php","http://www.facebook.com/reqs.php#confirm_46755028429");
		
		//CA Army
		
		checkGameUrl("castle_age/army.php?act=acpt","http://www.facebook.com/reqs.php#confirm_46755028429");
		checkGameUrl("castle_age/friend_page.php?act=acpt","http://www.facebook.com/reqs.php#confirm_46755028429");
		checkGameUrl("75.126.76.167/castle/tracker.php?","http://www.facebook.com/reqs.php#confirm_46755028429");
		checkGameUrl("castle_age/guild.php?act=acpt&gid=","http://www.facebook.com/reqs.php#confirm_46755028429");
		
		//LoTS
		checkGameUrl("legacythousandsuns/acceptgif","http://www.facebook.com/reqs.php#confirm_149755978384927");
		
		//DotD
		checkGameUrl("dawnofthedragons/acceptgift","http://www.facebook.com/reqs.php#confirm_268652830776");
				
		//Yoville
		checkGameUrl("yoville/gifts/accept_request.php?","http://www.facebook.com/reqs.php#confirm_21526880407");	
	//fix
		checkGameUrl("yoville/crew/howdy_neighbor.php","http://www.facebook.com/reqs.php#confirm_21526880407");	
	
		//FrontierVille
		checkGameUrl("frontierville/gift_request_accept.php?","http://www.facebook.com/reqs.php#confirm_201278444497");
		checkGameUrl("frontierville/giftaccept.php?next=giftaccept.php","http://www.facebook.com/reqs.php#confirm_201278444497");
		checkGameUrl("frontierville//giftaccept.php?","http://www.facebook.com/reqs.php#confirm_201278444497");
		//--
		checkGameUrl("frontierville/addneighbor.php","http://www.facebook.com/reqs.php#confirm_201278444497");
		
		//Farmville
		checkGameUrl("onthefarm/giftaccept.php?senderId","http://www.facebook.com/reqs.php#confirm_102452128776");
		checkGameUrl("onthefarm/index.php?gifterror","http://www.facebook.com/reqs.php#confirm_102452128776");
		checkGameUrl("onthefarm/sendcredits.php","http://www.facebook.com/reqs.php#confirm_102452128776");
		checkGameUrl("onthefarm/sentthankyougift.php","http://www.facebook.com/reqs.php#confirm_102452128776");
		checkGameUrl("onthefarm/sendmats.php","http://www.facebook.com/reqs.php#confirm_102452128776");
		checkGameUrl("onthefarm/gifts_send.php?action=sendThankYou","http://www.facebook.com/reqs.php#confirm_102452128776");
		// 0.961
		//Age of champions
		checkGameUrl("ageofchampions/gift_accept.php?","http://www.facebook.com/reqs.php#confirm_114440918573776");
		
		
		//Warstorm
		checkGameUrl("warstorm/data/landing/gift/accept.php?","http://www.facebook.com/reqs.php#confirm_29507308663");
		checkGameUrl("warstorm/?action=faction_gift","http://www.facebook.com/reqs.php#confirm_29507308663");
		checkGameUrl("warstorm/data/landing/neighbors/add?","http://www.facebook.com/reqs.php#confirm_29507308663");
		checkGameUrl("warstorm/?action=faction_gift&sender_id","http://www.facebook.com/reqs.php#confirm_29507308663");
		
		//ZombieSlayer
		checkGameUrl("zombieslayer/gift/action_receive","http://www.facebook.com/reqs.php#confirm_259944822555");
		//--
		checkGameUrl("zombieslayer/join/accept/","http://www.facebook.com/reqs.php#confirm_259944822555");
		//Haven
		checkGameUrl("havenworld","http://www.facebook.com/reqs.php#confirm_271022655694");
		
		//KoC
		checkGameUrl("kingdomsofcamelot/convert.php?","http://www.facebook.com/reqs.php#confirm_130402594779");
		
		//CrimeCity neighbours
		checkGameUrl("crimecitygame/neighbors/accept/?sender_facebook_id","http://www.facebook.com/reqs.php#confirm_129547877091100");
		checkGameUrl("crimecitygame/gifts/accept/?sender_facebook_id","http://www.facebook.com/reqs.php#confirm_129547877091100");
		
		//Age of heroes 
		checkGameUrl("age_of_heroes/p.friends.php?ref=request&link=accept","http://www.facebook.com/reqs.php#confirm_307821975395");
		checkGameUrl("age_of_heroes/p.gifts.php?action=accept_gift","http://www.facebook.com/reqs.php#confirm_307821975395");
		
		//CityVille
		checkGameUrl("cityville/invite.php?sId","http://www.facebook.com/reqs.php#confirm_291549705119");
		checkGameUrl("cityville/gift","http://www.facebook.com/reqs.php#confirm_291549705119");
		checkGameUrl("cityville/crew.php?mId","http://www.facebook.com/reqs.php#confirm_291549705119");
		checkGameUrl("cityville/trainMFS.php?sId","http://www.facebook.com/reqs.php#confirm_291549705119");
		
		//Petville
		checkGameUrl("petvillegame/giftaccept.php?senderId","http://www.facebook.com/reqs.php#confirm_163576248142");
		
		
		//9.71
		
		//TreasureIsle
		checkGameUrl("treasureisle/gift_accept.php?","http://www.facebook.com/reqs.php#confirm_234860566661");
		checkGameUrl("treasureisle/gifts_send.php?action=sendThankYouGift","http://www.facebook.com/reqs.php#confirm_234860566661");
		checkGameUrl("treasureisle/tracks.php?","http://www.facebook.com/reqs.php#confirm_234860566661");
		checkGameUrl("treasureisle/reward.php?","http://www.facebook.com/reqs.php#confirm_234860566661");
		checkGameUrl("treasureisle/send_request.php?senderClass","http://www.facebook.com/reqs.php#confirm_234860566661");

		checkGameUrl("treasureisle/ask_fruit.php?","http://www.facebook.com/reqs.php#confirm_234860566661");
	
	//CafeWorld
		checkGameUrl("cafeworld/accept_request.php?","http://www.facebook.com/reqs.php#confirm_101539264719");
	//fix
		checkGameUrl("cafeworld/track.php?action=accept_gift","http://www.facebook.com/reqs.php#confirm_101539264719");
		checkGameUrl("cafeworld/add_neighbor.php?from_page=invitation","http://www.facebook.com/reqs.php#confirm_101539264719");
		
		//9.82
		
		//Social City
		checkGameUrl("socialcity/?ref_id=","http://www.facebook.com/reqs.php#confirm_163965423072");
		
		
		
		
		//Casino City
	
		checkGameUrl("casinocitygame/forms/acceptGif","http://www.facebook.com/reqs.php#confirm_116823891666136");
		
		
		//desktopdefender/track?from=invite
		
		//v9.9
		
		// Vampire Wars
		checkGameUrl("vampiresgame/index.php?next=recruit.php&action=accept","http://www.facebook.com/reqs.php#confirm_25287267406");
		checkGameUrl("vampiresgame/track.php?sendkey","http://www.facebook.com/reqs.php#confirm_25287267406");
		checkGameUrl("vampiresgame/index.php?next=landing.php","http://www.facebook.com/reqs.php#confirm_25287267406");
		checkGameUrl("vampiresgame/landing.php?","http://www.facebook.com/reqs.php#confirm_25287267406");
		checkGameUrl("vampiresgame/recruit.php?action=accept","http://www.facebook.com/reqs.php#confirm_25287267406");
		checkGameUrl("vampiresgame/index.php?next=induction.php","http://www.facebook.com/reqs.php#confirm_25287267406");
		checkGameUrl("http://facebook6.vampires.zynga.com/track.php?","http://www.facebook.com/reqs.php#confirm_25287267406");
		
		//FishVille
		checkGameUrl("fishville/addneighbor.php?","http://www.facebook.com/reqs.php#confirm_151044809337");
		checkGameUrl("fishville/giftaccept.php?senderId=","http://www.facebook.com/reqs.php#confirm_151044809337");


		//ZooWorld
            
    checkGameUrl("playzoo/zoo/acceptGift.php?","http://www.facebook.com/reqs.php#confirm_167746316127");
//0.99.3
               //WildOnes

		//other games maybe soon
		checkGameUrl("wildones/?ref_id=","http://www.facebook.com/reqs.php#confirm_101628414658");

                 //version 1.0

                checkGameUrl("cityofwonder/newsfeed/bonusableFeed/culturevictory/","http://www.facebook.com/reqs.php#confirm_114335335255741");
                checkGameUrl("cityofwonder/newsfeed/helpMarvelBuild/","http://www.facebook.com/reqs.php#confirm_114335335255741");
                checkGameUrl("cityofwonder/newsfeed/bonusableFeed/embassylevelup/","http://www.facebook.com/reqs.php#confirm_114335335255741");
                checkGameUrl("cityofwonder/newsfeed/bonusableFeed/researchcomplete/","http://www.facebook.com/reqs.php#confirm_114335335255741");
                 checkGameUrl("cityofwonder/newsfeed/bonusableFeed/helpally/","http://www.facebook.com/reqs.php#confirm_114335335255741");

                checkGameUrl("farkletwo/gift_interstitial/","http://www.facebook.com/reqs.php#confirm_184022456486");
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
       // dispatch for firefox + others

       var evt = document.createEvent("HTMLEvents");

       evt.initEvent(event, true, true ); // event type,bubbling,cancelable

       return !element.dispatchEvent(evt);
   } else {
       // dispatch for IE
       var evt = document.createEventObject();
       return element.fireEvent('on'+event,evt)
   }
}