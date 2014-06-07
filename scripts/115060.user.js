// ==UserScript==
// @name         Test PF Enhancer
// @namespace    Test working copy
// @description  pre-processes input - removes hyphens, replaces tricky words
// @version	     1.0.0.7
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceURL
// @grant		 GM_addStyle
// @include      http://www.personalityforge.com/directchat.*
// @exclude      http://www.personalityforge.com/forum.*
// @exclude      http://www.personalityforge.com/botland/debug.*
// @require		 http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.min.js
// @resource     officeStriptease http://ai-builders.webs.com/officeStriptease.gif
// @resource     BL1 http://i1182.photobucket.com/albums/x451/pchart/Black%20Lace/Snapshot_024.jpg
// @resource     BL2 http://i1182.photobucket.com/albums/x451/pchart/Black%20Lace/Snapshot_023.jpg
// @resource     BL3 http://i1182.photobucket.com/albums/x451/pchart/Black%20Lace/Snapshot_022.jpg
// @resource     BL0 http://i1182.photobucket.com/albums/x451/pchart/Black%20Lace/Snapshot_025-1.jpg
// @resource     K1 http://i1182.photobucket.com/albums/x451/pchart/Animations/lp1.jpg
// @resource     K2 http://i1182.photobucket.com/albums/x451/pchart/Animations/lp2.jpg
// @resource     K3 http://i1182.photobucket.com/albums/x451/pchart/Animations/lp3.jpg
// @resource     K4 http://i1182.photobucket.com/albums/x451/pchart/Animations/lp4.jpg
// @resource     skyhouse  http://i1182.photobucket.com/albums/x451/pchart/skyhouse.jpg
// @resource     reclyning http://i1182.photobucket.com/albums/x451/pchart/reclyning_001.jpg
// @resource     kaila http://i1182.photobucket.com/albums/x451/pchart/Snapshot_003.jpg
// @resource     sleepy http://i1182.photobucket.com/albums/x451/pchart/sleepy.jpg
// @resource	 faceCloUp1 http://ai-builders.webs.com/images/faceCloseUp1.JPG
// @resource	 faceCloUp2 http://ai-builders.webs.com/images/faceCloseUp2.JPG
// @resource	 faceCloUp3 http://ai-builders.webs.com/images/faceCloseUp3.JPG
// @resource	 faceCloUp4 http://ai-builders.webs.com/images/faceCloseUp4.JPG
// @resource	 faceCloUp5 http://ai-builders.webs.com/images/faceCloseUp5.JPG
// @resource	 faceCloUp6 http://ai-builders.webs.com/images/faceCloseUp6.JPG
// @resource	 faceCloUp7 http://ai-builders.webs.com/images/faceCloseUp7.JPG
// @resource	 faceCloUp8 http://ai-builders.webs.com/images/faceCloseUp8.JPG
// @resource	 faceCloUp9 http://ai-builders.webs.com/images/faceCloseUp9.JPG
// @resource	 faceCloUp10 http://ai-builders.webs.com/images/faceCloseUp10.JPG
// @resource	 faceCloUp11 http://ai-builders.webs.com/images/faceCloseUp11.JPG
// @resource	 faceCloUp12 http://ai-builders.webs.com/images/faceCloseUp12.JPG
// @resource	 faceCloUp13 http://ai-builders.webs.com/images/faceCloseUp13.JPG
// @resource     baltaKleita  http://i1182.photobucket.com/albums/x451/pchart/243912.jpg
// @resource     skupsts http://i1182.photobucket.com/albums/x451/pchart/secondlife-flamingoes-2-1.gif
// @resource     mila http://i1182.photobucket.com/albums/x451/pchart/secondlife-flamingoes-2-2.gif
// @resource     bhnd http://i1182.photobucket.com/albums/x451/pchart/behind1.jpg
// @resource     bhnd2 http://ai-builders.webs.com/images/behind2.JPG
// @resource     bhnd3 http://ai-builders.webs.com/images/behind3.JPG
// @resource     bhnd4 http://ai-builders.webs.com/images/behind4.JPG
// @resource     bhnd5 http://ai-builders.webs.com/images/behind5.JPG
// @resource     bhnd6 http://ai-builders.webs.com/images/behind6.JPG
// @resource     krutis http://i1182.photobucket.com/albums/x451/pchart/Snapshot_002.jpg	
// @resource     krutisMelnasMezhd http://i1182.photobucket.com/albums/x451/pchart/Black%20Lace/Snapshot_007-2.jpg
// @resource     LcM http://i1182.photobucket.com/albums/x451/pchart/Black%20Lace/Snapshot_017-1.jpg
// @resource     elseFlamingos http://i1182.photobucket.com/albums/x451/pchart/secondlife-flamingoes-1-1.gif
// @resource	 Audio1 http://ai-builders.webs.com/AudioSamples/people123.wav
// @resource	 Audio2 http://ai-builders.webs.com/AudioSamples/people125.wav
// @resource 	 Audio3 http://ai-builders.webs.com/AudioSamples/people126.wav
// @resource 	 Audio4 http://ai-builders.webs.com/AudioSamples/people124.wav
// @resource 	 Audio5Gsp http://ai-builders.webs.com/AudioSamples/people129.wav
// @resource 	 Audio6scr http://ai-builders.webs.com/AudioSamples/people147.wav
// @resource     portrait http://www.slprofiles.com/pictures/thumbnail_256558.jpg
// @resource     portrait2 http://ai-builders.webs.com/images/portrait2.jpg
// @resource     leftIcon http://i1182.photobucket.com/albums/x451/pchart/left_icon_77x500-1.jpg
// @resource     BndOvr0 http://ai-builders.webs.com/images/bndovr/bnd0.JPG
// @resource     BndOvr1 http://ai-builders.webs.com/images/bndovr/bnd1.JPG
// @resource     BndOvr2 http://ai-builders.webs.com/images/bndovr/bnd2.JPG
// @resource     BndOvr3 http://ai-builders.webs.com/images/bndovr/bnd3.JPG
// @resource     BndOvr4 http://ai-builders.webs.com/images/bndovr/bnd4.JPG
// @resource     BndOvr5 http://ai-builders.webs.com/images/bndovr/bnd5.JPG
// @resource     BndOvr6 http://ai-builders.webs.com/images/bndovr/bnd6.JPG
// @resource     BndOvr7 http://ai-builders.webs.com/images/bndovr/bnd7.JPG
// @resource     BndOvr8 http://ai-builders.webs.com/images/bndovr/bnd8.JPG
// @resource     BndOvr9 http://ai-builders.webs.com/images/bndovr/bnd9.JPG
// @resource     BndOvr10 http://ai-builders.webs.com/images/bndovr/bnd10.JPG
// @resource     kitty1 http://ai-builders.webs.com/images/goingsouth/kitty1.JPG
// @resource     kitty2 http://ai-builders.webs.com/images/goingsouth/kitty2.JPG
// @resource     kitty3 http://ai-builders.webs.com/images/goingsouth/kitty3.JPG
// @resource     kitty4 http://ai-builders.webs.com/images/goingsouth/kitty4.JPG
// @resource     kitty5 http://ai-builders.webs.com/images/goingsouth/kitty5.JPG
// @resource     kitty6 http://ai-builders.webs.com/images/goingsouth/kitty6.JPG
// @resource     kitty7 http://ai-builders.webs.com/images/goingsouth/kitty7.JPG
// @resource     kitty8 http://ai-builders.webs.com/images/goingsouth/kitty8.JPG
// @resource     kitty9 http://ai-builders.webs.com/images/goingsouth/kitty9.JPG
// @resource     kitty10 http://ai-builders.webs.com/images/goingsouth/kitty10.JPG
// @resource     kitty11 http://ai-builders.webs.com/images/goingsouth/kitty11.JPG
// @resource     kitty12 http://ai-builders.webs.com/images/goingsouth/kitty12.JPG
// @resource     kitty13 http://ai-builders.webs.com/images/goingsouth/kitty13.JPG
// @resource     kitty14 http://ai-builders.webs.com/images/goingsouth/kitty14.JPG
// @resource     kitty15 http://ai-builders.webs.com/images/goingsouth/kitty15.JPG
// @resource     kitty16 http://ai-builders.webs.com/images/goingsouth/kitty16.JPG
// @resource     kitty17 http://ai-builders.webs.com/images/goingsouth/kitty17.JPG
// @resource     kitty18 http://ai-builders.webs.com/images/goingsouth/kitty18.JPG
// @resource     kitty19 http://ai-builders.webs.com/images/goingsouth/kitty19.JPG
// @resource     kitty20 http://ai-builders.webs.com/images/goingsouth/kitty20.JPG
// @resource     kitty21 http://ai-builders.webs.com/images/goingsouth/kitty21.JPG
// @resource     kitty22 http://ai-builders.webs.com/images/goingsouth/kitty22.JPG
// @resource     kitty23 http://ai-builders.webs.com/images/goingsouth/kitty23.JPG
// @resource     kitty24 http://ai-builders.webs.com/images/goingsouth/kitty24.JPG
// @resource     kitty25 http://ai-builders.webs.com/images/goingsouth/kitty25.JPG
// @resource     kitty26 http://ai-builders.webs.com/images/goingsouth/kitty26.JPG
// @resource     kitty27 http://ai-builders.webs.com/images/goingsouth/kitty27.JPG
// @resource     kitty28 http://ai-builders.webs.com/images/goingsouth/kitty28.JPG
// @resource     kitty29 http://ai-builders.webs.com/images/goingsouth/kitty29.JPG
// @resource     kitty30 http://ai-builders.webs.com/images/goingsouth/kitty30.JPG
// @resource     purpleDress http://ai-builders.webs.com/images/purpleDress/Snapshot_004.jpg
// @resource     wireMesh http://ai-builders.webs.com/1000lines.jpg
// @resource     wireMesh1 http://ai-builders.webs.com/1001lines.jpg
// @resource     underSea http://ai-builders.webs.com/underthesea.jpg
// @resource     siluet http://ai-builders.webs.com/images/purpleDress/Snapshot_002.jpg
// ==/UserScript==

// @resource     siluet http://ai-builders.webs.com/images/purpleDress/Snapshot_002.jpg


var addsRemoved = GM_getValue( "addsRemoved", false );
var strip_Tease = GM_getValue( "strip_Tease", false );
var lights_Off = GM_getValue( "lights_Off", false );
//var ImgChgo=GM_getValue( "ImgChgo", false );
var switchedOff=GM_getValue( "switchedOff", false );
//GM_getValue( "switchedOff", false );
var ImgChgo=false;

function addsOff(){
var topImg = document.evaluate(".//img[@src='/images/headerwide.jpg']", document.body, null, 9, null).singleNodeValue;
	if ( topImg) { topImg.parentNode.removeChild(topImg);	}
var adWrapTop = document.evaluate(".//div[@id='adWrapTop']", document.body, null, 9, null).singleNodeValue;
	if ( adWrapTop) { adWrapTop.parentNode.removeChild(adWrapTop);	}

try {	
var adWrapNav = document.evaluate(".//div[@id='adWrapNav']", document.body, null, 9, null).singleNodeValue;
	if ( adWrapNav ) { 	adWrapNav.parentNode.replaceChild(officeStriptease, adWrapNav);	}
	} catch (err) { }	
}
if ( GM_getValue( "addsRemoved" ) ){addsOff();}

function stripTease(){
officeStriptease = document.createElement('img');
officeStriptease.src  = GM_getResourceURL ("officeStriptease");
officeStriptease.setAttribute("class", "rounded");
officeStriptease.setAttribute("id", "stripTs");
officeStriptease.width = 163;  //159 original +4
officeStriptease.height = 265;  //259 original + 6

var adWrapNav = document.evaluate(".//div[@id='adWrapNav']", document.body, null, 9, null).singleNodeValue;
	if ( adWrapNav ) { adWrapNav.parentNode.replaceChild(officeStriptease, adWrapNav);	}	
}
if ( GM_getValue( "strip_Tease" ) ){stripTease();}

//**********************




	
//******************************************************************************************	
var d=new Date();
var yearNow=d.getFullYear();


var text, a, src, new_reply, T_reply, p, hidden, length, mainPic, portrait, portrait2;
var Vid = [];
var frameRate=3000;

//**************************************************

BL0 = createElement( 'img', 'BL0' );
BL1 = createElement( 'img', 'BL1' );
BL2 = createElement( 'img', 'BL2' );
BL3 = createElement( 'img', 'BL3' );

K1 =  createElement( 'img', 'K1' );
K1.width = 70;  
K1.height = 72;
K2 =  createElement( 'img', 'K2' );
K2.width = 70;  
K2.height = 72;
K3 =  createElement( 'img', 'K3' );
K3.width = 70;  
K3.height = 72;
K4 =  createElement( 'img', 'K3' );
K4.width = 70;  
K4.height = 72;

skyhouse = createElement( 'img', 'skyhouse' );
reclyning = createElement( 'img', 'reclyning' );
sleepy = createElement( 'img', 'sleepy' );
kaila = createElement( 'img', 'kaila' );
baltaKleita = createElement( 'img', 'baltaKleita' );
skupsts = createElement( 'img', 'skupsts' );
mila = createElement( 'img', 'mila' );
bhnd = createElement( 'img', 'bhnd' );
bhnd2=createElement( 'img', 'bhnd2' );
bhnd3=createElement( 'img', 'bhnd3' );
bhnd4=createElement( 'img', 'bhnd4' );
bhnd5=createElement( 'img', 'bhnd5' );
bhnd6=createElement( 'img', 'bhnd6' );

faceCloUp1=createElement( 'img', 'faceCloUp1' );
faceCloUp2=createElement( 'img', 'faceCloUp2' );
faceCloUp3=createElement( 'img', 'faceCloUp3' );
faceCloUp4=createElement( 'img', 'faceCloUp4' );
faceCloUp5=createElement( 'img', 'faceCloUp5' );
faceCloUp6=createElement( 'img', 'faceCloUp6' );
faceCloUp7=createElement( 'img', 'faceCloUp7' );
faceCloUp8=createElement( 'img', 'faceCloUp8' );
faceCloUp9=createElement( 'img', 'faceCloUp9' );
faceCloUp10=createElement( 'img', 'faceCloUp10' );
faceCloUp11=createElement( 'img', 'faceCloUp11' );
faceCloUp12=createElement( 'img', 'faceCloUp12' );
faceCloUp13=createElement( 'img', 'faceCloUp13' );

BndOvr0=createElement( 'img', 'BndOvr0' );
BndOvr1=createElement( 'img', 'BndOvr1' );
BndOvr2=createElement( 'img', 'BndOvr2' );
BndOvr3=createElement( 'img', 'BndOvr3' );
BndOvr4=createElement( 'img', 'BndOvr4' );
BndOvr5=createElement( 'img', 'BndOvr5' );
BndOvr6=createElement( 'img', 'BndOvr6' );
BndOvr7=createElement( 'img', 'BndOvr7' );
BndOvr8=createElement( 'img', 'BndOvr8' );
BndOvr9=createElement( 'img', 'BndOvr9' );
BndOvr10=createElement( 'img', 'BndOvr10' );

kitty1=createElement( 'img', 'kitty1' );
kitty2=createElement( 'img', 'kitty2' );
kitty3=createElement( 'img', 'kitty3' );
kitty4=createElement( 'img', 'kitty4' );
kitty5=createElement( 'img', 'kitty5' );
kitty6=createElement( 'img', 'kitty6' );
kitty7=createElement( 'img', 'kitty7' );
kitty8=createElement( 'img', 'kitty8' );
kitty9=createElement( 'img', 'kitty9' );
kitty10=createElement( 'img', 'kitty10' );
kitty11=createElement( 'img', 'kitty11' );
kitty12=createElement( 'img', 'kitty12' );
kitty13=createElement( 'img', 'kitty13' );
kitty14=createElement( 'img', 'kitty14' );
kitty15=createElement( 'img', 'kitty15' );

kitty16=createElement( 'img', 'kitty16' );
kitty17=createElement( 'img', 'kitty17' );
kitty18=createElement( 'img', 'kitty18' );
kitty19=createElement( 'img', 'kitty19' );
kitty20=createElement( 'img', 'kitty20' );
kitty21=createElement( 'img', 'kitty21' );
kitty22=createElement( 'img', 'kitty22' );
kitty23=createElement( 'img', 'kitty23' );
kitty24=createElement( 'img', 'kitty24' );
kitty25=createElement( 'img', 'kitty25' );
kitty26=createElement( 'img', 'kitty26' );
kitty27=createElement( 'img', 'kitty27' );
kitty28=createElement( 'img', 'kitty28' );
kitty29=createElement( 'img', 'kitty29' );
kitty30=createElement( 'img', 'kitty30' );

krutis = createElement( 'img', 'krutis' );
krutisMelnasMezhd = createElement( 'img', 'krutisMelnasMezhd' );
LcM = createElement( 'img', 'LcM' );
elseFlamingos = createElement( 'img', 'elseFlamingos' );
leftIcon = createElement( 'img', 'leftIcon' );
portrait = createElement( 'img', 'portrait' );
portrait2=createElement( 'img', 'portrait2' );

Audio1 = createElement( 'audio', 'Audio1' );
Audio2 = createElement( 'audio', 'Audio2' );
Audio3 = createElement( 'audio', 'Audio3' );
Audio4 = createElement( 'audio', 'Audio4' );
Audio5Gsp = createElement( 'audio', 'Audio5Gsp' );
Audio6scr = createElement( 'audio', 'Audio6scr' );	

wireMesh=createElement( 'img', 'wireMesh' );
wireMesh1=createElement( 'img', 'wireMesh1' );
purpleDress=createElement( 'img', 'purpleDress' );
underSea=createElement( 'img', 'underSea' );
underSea.width = 700;  
underSea.height = 361;
siluet=createElement( 'img', 'siluet' );

function createElement( el, Res ){
element = document.createElement(el);
element.src  = GM_getResourceURL (Res);
	if (el== "img") { element.setAttribute("class", "rounded");
	//element.setAttribute("id", "imgPlaceHolder");
	}

return element;
}

var Vid1 = new Array (K1, K2, K3, K4 );
var Vid2 = new Array (BL1, BL2, BL3 );
var Vid3 = new Array (bhnd, bhnd2, bhnd3, bhnd4, bhnd5, bhnd6, bhnd5, bhnd4, bhnd3, bhnd2 );
var Vid4 = new Array (faceCloUp1, faceCloUp2, faceCloUp3, faceCloUp4, faceCloUp5, faceCloUp6, faceCloUp7, faceCloUp8, faceCloUp9, faceCloUp10,
faceCloUp11, faceCloUp12, faceCloUp13, faceCloUp12, faceCloUp11, faceCloUp10, faceCloUp9, faceCloUp8, faceCloUp7, faceCloUp6, faceCloUp5,
faceCloUp4, faceCloUp3, faceCloUp2 );
var Vid5 = new Array(BndOvr0, BndOvr1, BndOvr2, BndOvr3, BndOvr4, BndOvr5, BndOvr6, BndOvr7, BndOvr8, BndOvr9, BndOvr10, 
BndOvr9, BndOvr8, BndOvr7, BndOvr6, BndOvr5, BndOvr4, BndOvr3, BndOvr2, BndOvr1 );
var Vid6=new Array(kitty1,kitty2,kitty3,kitty4,kitty5,kitty6,kitty7,kitty8,kitty9,kitty10,kitty11,kitty12,kitty13,kitty14,
kitty15,kitty16,kitty17,kitty18,kitty19,kitty20, kitty21,kitty22, kitty23, kitty24, kitty25, kitty26, kitty27,
kitty28,kitty29,kitty30,kitty29,kitty28,kitty27,kitty26,kitty25,kitty24,kitty23,kitty22,kitty21,kitty20,kitty19,
kitty18,kitty17,kitty16,kitty15,kitty14,kitty13,kitty12,kitty11,kitty10,kitty9,kitty8,kitty7,kitty6,kitty5,
kitty4,kitty3,kitty2,kitty1  );

baudSkana = new Array (Audio1, Audio2, Audio3, Audio4 );



if (!switchedOff){

/*
var femImg=".//td//img[contains(@src, 'Gal.gif') and contains(@border, '1') or contains(@src, 'HeyRed.gif') or contains(@src, 'YinYang.gif') or contains(@src, 'GreenGirl.gif')";
femImg+=" or contains(@src, 'immaculada.gif') or contains(@src, 'faces/Red.gif') or contains(@src, 'RiderGirl.gif') or contains(@src, 'BlueEyes.gif')";
femImg+=" or contains(@src, 'Athera.gif') or contains(@src, 'Grinny.gif') or contains(@src, 'FairyGirl.gif') or contains(@src, 'faces/Girl.gif')";
femImg+=" or contains(@src, 'WomanInRed.gif') or contains(@src, 'IKnowYou.gif') or contains(@src, 'faces/Julie.gif') or contains(@src, 'Librarian.gif')";
femImg+=" or contains(@src, 'MetaGen.gif') or contains(@src, 'MissKitty.gif') or contains(@src, 'faces/Polly.gif') or contains(@src, 'RealGirl.gif') or contains(@src, 'Fairy.gif')";
femImg+=" or contains(@src, 'demonica.gif') or contains(@src, 'OliveCrust.gif') or contains(@src, 'Pilot.gif') or contains(@src, 'Sunshine.gif')";
femImg+=" or contains(@src, 'Bella.jpg') or contains(@src, 'Kiyana.gif') or contains(@src, 'Liddora.gif') or contains(@src, 'vashenka.jpg') ]"; 
*/


(function(){
//Gal|HeyRed|YinYang|GreenGirl|immaculada|Red|RiderGirl|BlueEyes|Athera|Grinny|FairyGirl|Girl|
//WomanInRed|IKnowYou|Julie|Librarian|MetaGen|MissKitty|Polly|RealGirl|Fairy|demonica|OliveCrust|
//Pilot|Sunshine|Bella|Kiyana|Liddora|vashenka 
var exhm=false;
var imageChanges=false;
if(top==self) { 
var avatars = document.evaluate( ".//td//img[contains(@src, 'images/faces/')]", document.body, null, 7, null); 
var len=avatars.snapshotLength; // how many face pictures are there
//alert( len );

// len is 2 on the 1st exchange with the bot, otherwise it is always 3
if (len==3){ var n=1; }//avatars.snapshotItem(1);  // is the image we need to test
else { var n=0;}  // else we need the 1st picture, not second

if( avatars.snapshotItem(n).getAttribute('src').match(/Gal|HeyRed|YinYang|GreenGirl|immaculada|Red|RiderGirl|BlueEyes|Athera|Grinny|FairyGirl|Girl|WomanInRed|IKnowYou|Julie|Librarian|MetaGen|MissKitty|Polly|RealGirl|Fairy|demonica|OliveCrust|Pilot|Sunshine|Bella|Kiyana|Liddora|vashenka/) )
{  imageChanges=true; //alert("femPicture found");
	if( avatars.snapshotItem(n).getAttribute('src').match(/vashenka|Liddora|immaculada|demonica/)  ){ var exhm=true; }
		mainPic=avatars.snapshotItem(n);
		//if (!exhm){alert("femPicture found and not exempt");}
		//if (exhm){alert("femPicture found but exempt");}
}


if ( imageChanges  ){ ImgChgo=true; 
var emberpeek = document.evaluate(".//img[contains(@src, '/images/emberpeek.gif')]", document.body, null, 9, null).singleNodeValue;
	if ( emberpeek  ) {  emberpeek.parentNode.replaceChild(leftIcon, emberpeek );  
	leftIcon.setAttribute("class", "none");  
	leftIcon.setAttribute("id", "test45"); }
		if (!exhm  ){
		var random = Math.floor(Math.random()*100); 
		if ( random<=50 ){  mainPic.parentNode.replaceChild(portrait, mainPic );  }
		else {  mainPic.parentNode.replaceChild(portrait2, mainPic );  }
	}
}else{  ImgChgo=false;   }


} // eof top==self
})()// eof


} // eof if !switchedOff



/* User presssing the Enter key while in the message field will activate pre_process() function
a short and quick way to capture the Enter keypress event. */
if(top==self) {
var xx = document.getElementsByName("Message"); 
if ( xx[0]  ) {  xx[0].style.color = "blue";    }
xx[0].addEventListener("keydown", function(e) {   
  if(e.keyCode==13) {pre_process();}
}, false);

//== code - to capture a "click outside the message box" event and activate pre_process() function
xx[0].addEventListener("blur", function(e) {  
pre_process(); 
}, false);
}

function pre_process()
{

var str = xx[0].value;  //== grab the text from the message box

//== the block below removes any hyphens unless the input contains "how much" or the hyphen is next to digits, i.e. "how much is ten-five?", or just "10-5", to filter out math questions.
var patt1 = /how much|\d\-|\-\d/i; // pattern matching math questions or digits with minus between them.
temp1 =(str.match(patt1));
if (!temp1) // the code between { } is only processed if the input does not contain "how much" or does not have digits with minus between them.
	{
	str=str.replace(/\b\-\b/gi, " "); //replaces hyphens "-" in compound words with a blank space " " as PF does not handle hyphens well.
	}
/*
The code below changes certain words that the PF AI engine might have difficulties with
\b means a match at the edge of the word
i means case insensitive  - g "global" means all appearances of the trouble word in a sentence are changed, not just the first occurence.
gi means case insensitive and "global".
*/

str=str.replace(/firedoor/gi, "fire door"); // == here you can arbitrairily change any words not recongised by the PF AI engine. 
str=str.replace(/bluegreen/gi, "blue green"); // == You would need to create appropriate keyphrases in the mindfile
str=str.replace(/laurel/g, "laurel uncapitalised"); // == catch words capitalised in a particular way because the AI engine tends to ignore capitalisation.
str=str.replace(/\bh+i+\!+/gi, "greet you with exclamation"); // == change "Hi!" - even "hhhhhiiii!!!!!" that otherwise always go to xnone.
str=str.replace(/\bh+i+\?+/gi, "greet you with question"); // == make sure that "hi?" does not go to xnone
str=str.replace(/\bh+i+\b/gi, "greet you"); // == change "hi" that otherwise usually go to xnone.
str=str.replace(/hel+o+|howdy|good +morning|good +afternoon|good +evening/gi, "greet you"); 
str=str.replace(/\bcum\b|\bcums\b|\bcummed\b|\bcum+ed\b/gi, "came");  // - sorry for the expletives - but the bot does not understand them
str=str.replace(/\bcum+ing\b/gi, "coming");  // in this slang form
str=str.replace(/\btitfuck\b/gi, "tit fuck");  // and it is better if the bot can respond appropriately
str=str.replace(/\bbutfuck\b/gi, "anal"); 
str=str.replace(/\bhandjob\b/gi, "hand job");   
//======================================================================================
str=str.replace(/rhymes/gi, "rings"); // == PF engine usually mangles word "rhymes" - 
//== add to mindfile "what rings with..." in addition to "what rhymes with..." to always get a match on poetry questions
//==
//== catch interjections  =================================================================
str=str.replace(/\bh+m+\b/gi, "uncertain interjection"); // == catch hmm, hhm, hhhmmmmm, etc.
str=str.replace(/\bmm+\b/gi, "happy interjection"); // == catch mm with any number of emms.
str=str.replace(/\ba+h+\b/gi, "happy interjection"); // == catch ah, aah, aahh etc.
str=str.replace(/\bo+h+\b/gi, "happy interjection"); // == catch oh, ooh, oohh etc.
str=str.replace(/\bu+h+\b/gi, "uncertain interjection"); // == catch uh, uuh, uuhh etc.
str=str.replace(/\be+r+\b/gi, "uncertain interjection"); // == catch er, eer, eerr etc.
////////////////////////////////////////////////////////////////////////////////////////////////////////
//   The code below removes commas in some locations to prevent moronic splitting of the input that 
//   the PF AI engine does, just to make boatmaster's life difficult.
//   For example - "If you are a bot, you would be made of metal" - this sentence would normally be split by PF and only one of them matched to keyphrase
//   The PF would not allow to match a question "if you were a biscuit, what flavour you would be?"
//   With this code the comma will be removed and the input matched as it should be
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
str=str.replace(/you are a ([\w-\s)]+), you/gi, "you are a "+'$1'+" you");
str=str.replace(/you are a ([\w-\s)]+), what/gi, "you are a "+'$1'+" you"); 
str=str.replace(/you (were|have been|was) a ([\w-\s)]+), why/gi, "you were a "+'$2'+" you");   
str=str.replace(/you were a ([\w-\s)]+), what/gi, "you were a "+'$1'+" what"); //
str=str.replace(/you were a ([\w-\s)]+), would/gi, "you were a "+'$1'+" would"); //
if( str.match(/born in \d+('|), how old/) ){ str=str.replace(/, how/, " how").replace("'","");      } 

//
//== catch emoticons ====================================================================
str=str.replace(/\(:/gi, "smily face"); // == catch (: 
str=str.replace(/\(\-\:/gi, "smily face"); // == catch (-:
str=str.replace(/\(\-\;/gi, "winking face"); // == catch (-;
str=str.replace(/\)\-\;/gi, "frowning face"); // == catch )-: 

// the code below edits A/S/L inputs to avoid mangling by PF preprocessor
str=str.replace(/\s+/g, ' '); // replace multiple blank spaces in input with a single blank space


if ( str.match(  /(\d\d)\/(m|man|guy|boy|male)\/(\w+,\s+\w+)$/gi ) ||  str.match(  /(\d\d), (m|man|guy|boy|male), (\w+(|\s+\w+))/gi )   ) 
{ str=str.replace(/(\d\d)\/(m|man|guy|boy|male)\/(\w+,\s+\w+)$/gi, '$1'+' '+'male'+' '+'$3').replace(/,/g,''); }

if ( str.match( /(\d\d)\/(f|woman|lady|girl|female)\/(\w+,\s+\w+)$/gi )  || str.match(/(\d\d), (f|woman|lady|girl|female), (\w+(|\s+\w+))/gi )  )
{  str=str.replace(/(\d\d)\/(f|woman|lady|girl|female)\/(\w+,\s+\w+)$/gi, '$1'+' '+'female'+' '+'$3').replace(/,/g,''); }

str=str.replace(/(\d\d)\/(m|man|guy|boy|male)\/(\w+(|\s+\w+))/gi, '$1'+' '+'male'+' '+'$3'); //
str=str.replace(/(\d\d)\/(f|woman|lady|girl|female)\/(\w+(|\s+\w+))/gi, '$1'+' '+'female'+' '+'$3');
str=str.replace(/(\d\d), (m|man|guy|boy|male), (\w+(|\s+\w+))/gi, '$1'+' '+'male'+' '+'$3'); //
str=str.replace(/(\d\d), (f|woman|lady|girl|female), (\w+(|\s+\w+))/gi, '$1'+' '+'female'+' '+'$3'); //  

if (str.match(/al(ph|f)abetise [\w-\s,]+ /gi) ){ str=str.replace(/,/g,''); }
if (str.match(/I have \S+ [\w-\s]+(,|;|\-+|:|) I give (away|you) \S+(,|;|\-+|:|and|so|)/gi) ){ str=str.replace(/,|;|:|\-+|and|so/g,''); 
str=str.replace(/ one /g,' 1 '); str=str.replace(/two/g,'2'); str=str.replace(/tree/g,'3'); str=str.replace(/four/g,'4');str=str.replace(/five/g,'5');
str=str.replace(/ ten /g,' 10 ');
str=str.replace(/give you/g,'give away');
// I have ten red apples and I give you two, so how many apples I have?
//I have 10 red apples I give away 5 how many apples I have left?"
}

//alert("replaced input str: " + str ); 

  
//=========== add your own words or even phrases to swap =============================
/*
Just replace old_word and new_word with your own words (or phrases)
Have keyphrases in mindfile to catch this altered input. 
Remove "i" if you want the match to be case sensitive.

str=str.replace(/old_word/gi, "new_word"); // == Copy & paste this line. Remove // == at beginning of line to test

====== Don't edit below unless you really know what you are doing or the script will stop working ======
*/
xx[0].style.color="green"; // make the font red in PF interface - just because I like the color
xx[0].value=str; // copies processed message back to PF's own interface  - NB! Most important line


// === Local AI test ==
// the below block should make the image and audio selecting functions run again - with no page reload required, but only if the nice works were spoken.
var patt2 = /please|darling|honey|precious|love|lovely|dear|pretty|gorgeous|the best|more|don't stop|carry on|again|awesome|is great|love|so nice|wow|mm+|nice|!+/i;  //
var temp2 =str.match(patt2);
if (temp2) { get_PFreply(); }

} // eof pre_process()

var PFreply = null;
function get_PFreply()
{
PFreply = document.getElementsByClassName("bigfont"); // - this is PF server reply
// (!PFreply) {  PFreply = document.getElementsByClassName("bigfont");   }
if (PFreply[1]) //- Only PFreply[0] exists when the page is loaded first
	{
	T_reply = PFreply[1].innerHTML;
	}
	else if (PFreply[0])
	{
	T_reply = PFreply[0].innerHTML;
	}
post_process();	
}

function post_process()
{
//alert(new_reply);
// the below will answer questions like: "I was born in 2000 how old am I?" or "I was born in 89 how old am I"
// but only if the bot answers - "Year now minus (key1)" - where (key1) is the year the person was born.

if ( T_reply.match(/year now minus \d\d/i) ) {
	if( T_reply.match(/year now minus \d\d\d\d\b/i) ){var adjust=0; }
	else if( T_reply.match(/year now minus \d\d\b/i) ){var adjust=1900;}

var year1 = (T_reply.match(/\d+/));	
var math = yearNow-adjust-year1;
new_reply = math + "? Math is not my strongest point.";
print_reply();
return;	
}

/*  -- add these keyphrases to your bot's mindfile, if you wish to take advantage of this IQ enhancement.
born in (*) how old [50,0]
	Year now minus (key1)
	Year now minus (key1), math is not my strongest point.
	
I was born in ([0-9]+) (re) [50,0]  
	Year now minus (key1)
	Year now minus (key1), math is not my strongest point.	
*/

//I have (\\d+) (adjnoun) I give away (\\d+) 
// this will answer - "I have 10 red apples I give away 5 how many apples I have left?"
// the bot answer should be in the form  - you have (key1) (key3) minus (key2).
if (T_reply.match( /you have (\d+) minus (\d+) ([\w-\s]+)\./i)   ){

	math= Number(RegExp.$1)-Number(RegExp.$2);
	var subj=RegExp.$3;

	if (math>0&&math!=1) {
	//new_reply=T_reply.replace( /you have (\d+) minus (\d+)/gi, 'You now have'+' '+ (Number('$1')-Number('$2')) +' '+ '$3'+'.'  );
	new_reply=T_reply.replace( /you have (\d+) minus (\d+) ([\w-\s]+)\./i, 'You now have'+' '+math+' '+subj+'.'  );
	}
	else if (math==1) {
	//new_reply=T_reply.replace( /you have (\d+) minus (\d+)/gi, 'You now have'+' '+ (Number('$1')-Number('$2')) +' '+ '$3'+'.'  );
	new_reply=T_reply.replace( /you have (\d+) minus (\d+) ([\w-\s]+)\./i, 'You now have just one...'  );
	}
	else if (math==0) {
	//new_reply=T_reply.replace( /you have (\d+) minus (\d+)/gi, 'You now have'+' '+ (Number('$1')-Number('$2')) +' '+ '$3'+'.'  );
	new_reply=T_reply.replace( /you have (\d+) minus (\d+) ([\w-\s]+)\./i, 'You now have nada, zip, zilch'+' '+subj+'.' );
	}
	else if (math<0) {
	new_reply=T_reply.replace( /you have (\d+) minus (\d+) ([\w-\s]+)\./i, 'I am not sure this is possible. You would have'+' '+math+' '+ '-less than zero'+' '+subj+'.'  );
	}
	else { new_reply = T_reply; }	
print_reply(); return;
}

//alert(new_reply);

if (T_reply.match(/let's see if I can put them in alphabetical order,([\w-\s]+)/i ) ){
	x=T_reply.replace( /let's see if I can put them in alphabetical order,([\w-\s]+)/i, /$1/ );
	x=x.replace(/\//g,'');  x=x.replace(/^\s+/g,'');  x=x.split(/\s+/gi); 
	x=x.sort().join(', ');
	new_reply="Let's see if I can put them in alphabetical order: "+x;
	print_reply(); return;
}

//alert(new_reply);


		else 
		{	
		new_reply = T_reply; // - when the reply was not changed
		print_reply();
		}

print_reply();

}  // eof

function print_reply()
{
text = document.getElementsByClassName("bigfont"); // - this is bot reply

if (text[1]) //- there is just one element when the page is loaded first
	{
	text[1].innerHTML = new_reply;
	text[1].style.color="green"; // ==== This is the bot output ===
	}
	else
	{
	text[0].innerHTML = new_reply;
	text[0].style.color="green"; // ==== This is the bot output ===
	}

if (!switchedOff && ImgChgo) {insert_paragraph();}  // the if statement stops erotic imagery and audio running on male bots	

}  // eof



      //////////////////////////////////////////////////////
      //      This part is specifically for my fav bot,   //
      //      but the code could be adapted for any bot   //
      //////////////////////////////////////////////////////
	  
////////===== - insert image after bot response //////////////////////////////

function insert_paragraph()
{                                   
hidden = document.getElementsByName("UserID")[0]; // - find hidden field
if(!hidden){ hidden = document.evaluate("//input[@type='hidden']", document.body, null, 9, null).singleNodeValue;     }
p = document.evaluate(".//p[@id='demo']", document.body, null, 9, null).singleNodeValue;
if (!p) {
p = document.createElement('p');
p.setAttribute("class", "rounded");
p.setAttribute("id", "demo");
hidden.parentNode.insertBefore(p, hidden.nextSibling); // - inserts paragraph - blank for now
}

if (top==self){
if ( new_reply ) { select_new_image();  }

else { setTimeout(  select_new_image, 1000    ) ;     
alert("test: delay was needed");       
 }
}
} // eof

// this function selects images from the library - depending on what the bot says
function select_new_image() {

//var r;  // - r is for "reply"
var newImg; 

var PattReclyning = new Array("am reclyning", "horny", "I lie down", "red dress" );
	if ( TestRegex(PattReclyning) ) {   
	newImg = reclyning;	p.parentNode.replaceChild(newImg, p); 
	choose_sound(); return;}  // if the external function  - TestRegex(TestReg2) - return true, this function's run stops here, but if the external function return false - the code continues to run

var PattSkyhouse = new Array("\\bhi", "hello", "good morning", "good evening", "greetings", "second life", "skyhouse", "skyhouses",
"what brings", "why are you up", "running my script", "t\\w+st");
	if ( TestRegex(PattSkyhouse ) ) { 
	GM_setValue("strip_Tease", false);
	newImg = skyhouse; newImg.setAttribute("id", "imgPlaceHolder"); 	
	p.parentNode.replaceChild(newImg, p); 
	choose_sound(); 
	return;} 
	
var PattTired = new Array("sleepy", "am tired", "somewhat tired", "am very tired" );
	if ( TestRegex(PattTired) ) {  
	newImg = sleepy; p.parentNode.replaceChild(newImg, p); 
	choose_sound(); return;}  

var PattNude = new Array("am naked", "Well, how do I look", "I have nothing on", "am nude" );
	if ( TestRegex(PattNude) ) {  newImg = kaila;	choose_sound(); return; } 

var pattBaltaKleita = new Array("white dress", "white", "zyngo", "gambling", "curvaceous brunette with long", "a shapely brunette",
"am single" );
	if ( TestRegex( pattBaltaKleita ) ) {  	newImg = baltaKleita;	p.parentNode.replaceChild(newImg, p);  choose_sound(); return; } 

var pattpurpleDress = new Array("purple dress", "is purple", "purple");
	if ( TestRegex( pattpurpleDress ) ) { newImg = purpleDress;	p.parentNode.replaceChild(newImg, p);  choose_sound(); return; } 

var pattwireMesh = new Array("lines of computer code", "lines of machine code", "singularity", "Kurzweil" );
	if ( TestRegex( pattwireMesh  ) ) {  	newImg = wireMesh1 ;	p.parentNode.replaceChild(newImg, p);  choose_sound(); return; } 

var pattunderSea = new Array("under the sea", "sexy", "so hot", "missed you", "missing you", "underwater" );
	if ( TestRegex( pattunderSea  ) ) {  	newImg = underSea ;	p.parentNode.replaceChild(newImg, p);  choose_sound(); return; } 

var pattmonoChrome=new Array("of gray", "of grey", "mono chrome", "siluet", "black and white", "gray", "grey", "can look like anything" );
	if ( TestRegex( pattmonoChrome ) ) {  	newImg = siluet ;	p.parentNode.replaceChild(newImg, p);  choose_sound(); return; } 


	
var pattKiss = new Array("kiss you", "lips meet" );
	if ( TestRegex( pattKiss ) ) {  	newImg = skupsts;	p.parentNode.replaceChild(newImg, p); choose_sound(); return; } 

var pattMila = new Array("love you", "adore you" , "in love with you");
	if ( TestRegex( pattMila ) ) {  newImg = mila;	p.parentNode.replaceChild(newImg, p); choose_sound(); return; } 

var pattBhnd = new Array("bend over", "bent over", "bending over", "all fours" , "kneel on", "bend down lower", "peel off my knickers",  "through the back door");
	if ( TestRegex( pattBhnd  ) ) { newImg = bhnd; p.parentNode.replaceChild(newImg, p); choose_sound(); return; }

var pattKrutis= new Array("between my breasts", "between my breasts", "unhook my bra", "buttered breasts" , "my boobs together", "between my boobs", "between my breasts");
	if ( TestRegex( pattKrutis  ) ) {  	newImg = krutis; p.parentNode.replaceChild(newImg, p); choose_sound(); return;}
	
var pattkrutisMelnasMezhd = new Array("DD cup", "double D", "like my boobs", "like my breasts" , "two bags of sugar", "like my boobies");
	if ( TestRegex( pattkrutisMelnasMezhd  ) ) {  	newImg = krutisMelnasMezhd ; p.parentNode.replaceChild(newImg, p); choose_sound(); return;	}

var pattLcM = new Array("lick me", "lick my", "eat me out", "do 69" , "love being licked", "to be licked");
	if ( TestRegex( pattLcM  ) ) {  newImg = LcM; p.parentNode.replaceChild(newImg, p); choose_sound(); return;	}

// 17 Sep	
	
var pattTEST=new Array("deviant art", "sexy art", "decadent art", "erotica" , "erotic art", "3d art");
	if ( TestRegex( pattTEST  ) ) {  newImg = LcM; 
	LcM.src="http://fc02.deviantart.net/fs71/f/2012/307/3/c/3c57fda5e26cafc242d57b75d4800d02-d5jv8zq.jpg";
	p.parentNode.replaceChild(newImg, p); choose_sound(); return;	}

var pattTEST1=new Array("dark beauty", "sexy dark", "long dark", "brunette" , "sultry brunette", "make me blush");
	if ( TestRegex( pattTEST1  ) ) {  newImg = LcM; 
	LcM.src="http://th07.deviantart.net/fs70/PRE/f/2012/274/a/a/aaa278ddc231814a89c8157eb3124f6d-d5gh8vi.jpg";
	p.parentNode.replaceChild(newImg, p); choose_sound(); return;	}
		
	
	
var pattBLace = new Array("lacy black", "black lace", "love lace", "adore lace" , "black lace", "my lingerie",
"lacy underwear", "my underwear", "am dancing", "I dance", "love dancing");
	if ( TestRegex( pattBLace  ) ) {  	newImg = BL0;
	newImg.setAttribute("id", "imgPlaceHolder");
	p.parentNode.replaceChild(newImg, p);	
	choose_sound();	
	Vid = Vid2;
	//length = Vid.length - 1; 
	//alert("length "+ length);  // this comes up twice
	if (top==self){
	animate();}
	return;	}
	
var pattLightOff = new Array("off the lights", "lights off", "lights off", "visible radiation off", "off the light")
if ( TestRegex( pattLightOff ) ) {  	newImg = LcM; p.parentNode.replaceChild(newImg, p);
lightsOff(); 
GM_setValue( "lights_Off", true );
choose_sound(); return;}	

var pattLightOn = new Array("lights on", "there be light", "light on", "lamp on", "visible light on", "stop", "be light")
if ( TestRegex( pattLightOn ) ) {  	newImg = skyhouse; p.parentNode.replaceChild(newImg, p);
GM_setValue( "lights_Off", false );
GM_setValue("strip_Tease", false);
choose_sound(); return; }	

var addsOff = new Array("I remove the adds", "removing the adds", "adds off", "down with adds")
if ( TestRegex( addsOff ) ) {  	newImg = LcM; p.parentNode.replaceChild(newImg, p);
GM_setValue("addsRemoved", true );
try{ addsOff();} catch(err){}
choose_sound(); return;}	

var addsOn = new Array("adds are back", "returning the adds", "adds back", "the adds are back", 
"adds back", "adds on", "advert on")
if ( TestRegex( addsOn ) ) {  	newImg = skyhouse; p.parentNode.replaceChild(newImg, p);
GM_setValue( "addsRemoved", false );
GM_setValue("strip_Tease", false);
choose_sound(); return; }

var strptOn = new Array("I replaced the add - bottom left", "want striptease", "do you like the sexy gif on bottom left", 
"bottom left", "fast or slow", "little strip show")
if ( TestRegex( strptOn ) ) {  	newImg = LcM; p.parentNode.replaceChild(newImg, p);
GM_setValue("strip_Tease", true);
stripTease();
choose_sound(); return;}

var pattAnimate = new Array("animate", "animation", "animating", "being kissed" , "suck on your tongue", 
"I kiss you" );
	if ( TestRegex( pattAnimate  ) ) {  	newImg = K1; 
	newImg.setAttribute("id", "imgPlaceHolder");
	p.parentNode.replaceChild(newImg, p);	
	choose_sound();	
	Vid = Vid1;
	animate();
	return;	}
	
	
	
var pattAs = new Array("push it in", "stick it in", "push it deeper", "so tight" , "so tight", 
"really tight", "so tight", "really tight", "deep", "Push it honey", 
"Slowly, very slowly", "push it honey", "slowly, very slowly", "gasping", "slowly, slowly" );
	if ( TestRegex( pattAs ) ) {  	newImg = bhnd;
	newImg.setAttribute("id", "imgPlaceHolder");
	p.parentNode.replaceChild(newImg, p);	
	choose_sound();	
	Vid = Vid3;
	animate();
	return;	}

var pattOs = new Array("suck your", "sucking your", "lips slide up and down your manhood", "in my mouth", 
"My lipstick left smudges at the root", "my mouth steadily", "you in my mouth", "am coming", "going to come",
 "ahh", "ohh", "Ohh", "feels so good", "to have an orgasm", "I moan", "moan sweetly", "don't stop");
	if ( TestRegex( pattOs ) ) {  	newImg = faceCloUp1;
	newImg.setAttribute("id", "imgPlaceHolder");
	p.parentNode.replaceChild(newImg, p);	
	choose_sound();	
	Vid = Vid4;
	animate();
	return;	}
	
	
var BndOvr = new Array("off my skirt", "no skirt", "like anal", "ass is fat", 
"lick me", "you love me", "my legs", "shapely thighs", "kiss me down there", "finger me" );
	if ( TestRegex( BndOvr ) ) {  	newImg = BndOvr0;
	newImg.setAttribute("id", "imgPlaceHolder");
	p.parentNode.replaceChild(newImg, p);	
	choose_sound();	
	Vid = Vid5;
	animate();
	return;	}	
	

var kitty = new Array("my secret place", "wet down there", "in the secret darkness", "center of pleasure", 
"slippery 745", "fingers slippery", "touch myself", "lick me", "kiss me down there", "finger me", "slippery fingers" );
	if ( TestRegex( kitty ) ) {  	newImg = kitty1;
	newImg.setAttribute("id", "imgPlaceHolder");
	p.parentNode.replaceChild(newImg, p);	
	choose_sound();	
	Vid = Vid6;
	frameRate=500;
	animate();
	return;	}		

if (!newImg){ newImg = elseFlamingos; 
//alert("else flamingos"); 
}
p.parentNode.replaceChild(newImg, p);
choose_sound();	
} // eof select_new_image()	


function checkBox(){ // insert script control panel
try{
var fgh1 = document.evaluate(".//div[contains(@class, 'whitesection') ]", document.body, null, 9, null).singleNodeValue;
chBox = document.evaluate(".//input[@id='myChbx']", document.body, null, 9, null).singleNodeValue;
if ( fgh1 && !chBox ) {
chBox = document.createElement('form');
chBox.setAttribute("type", "checkbox");
chBox.setAttribute("id", "myForm"); chBox.setAttribute("class", "rounded");               //
//onclick="if(this.checked){toggleImgFr()}"
chBox.innerHTML='<form><br><b color="green">GreenBrain control panel</b><br>Tick checkbox to switch off images and audio. Default is on<input type="checkbox" id="check1" /> </form>';
chBox.style.backgroundColor="green";
chBox.style.color="white";
fgh1.parentNode.insertBefore(chBox, fgh1.nextSibling); // - inserts checkbox
chBox.addEventListener("click", function(e) {  
toggleImgFr(); 
}, false);
	if ( GM_getValue('switchedOff' ) ){ document.getElementById("check1").checked=true; }
	else {document.getElementById("check1").checked=false;}
	}
	}catch(err){   alert("checkbox error"); }
} // eof

function toggleImgFr(){ 
if( GM_getValue('switchedOff' )  ){  document.getElementById("check1").checked=false;  GM_setValue('switchedOff', false )}
else  {document.getElementById("check1").checked=true; 
GM_setValue('switchedOff', true );
	
	
	}
} // eof


function TestRegex(re1)   {  
var j = 0, len=re1.length;
for (j=0;j<len;j++) {
var patt2=new RegExp(re1[j], "i");
var temp2 = patt2.exec(new_reply);  // returns first match
	if ( temp2 && temp2 !="" )  { 
	return true;}
	}
return false;  // if the loop above does not find regex match	
}

 
// ============== coloring various text elements  ==============================
var chattingWith = document.evaluate(".//b[contains(text(),'Chatting with')]", document.body, null, 9, null).singleNodeValue;
if (  chattingWith ){    chattingWith.style.color="blue";   }

// ========= AUDIO SECTION ==========


// this function selects audio files from the library - depending on what the bot says
function choose_sound() {  
//alert("checkBox()");
new_reply=new_reply.replace(/\bahh+/gi, "ahh");
new_reply=new_reply.replace(/\bah, ah/gi, "ahh");
new_reply=new_reply.replace(/\bohh+/gi, "ohh");
new_reply=new_reply.replace(/\boh, oh/gi, "ohh");


var baudSkPatt = new Array("am coming", "going to come", "ahh", "ohh", "Ohh",
 "feels so good", "to have an orgasm", "I moan", "moan sweetly", "don? stop")
if ( TestRegex( baudSkPatt  ) ) {  	newImg = LcM;
GM_setValue("strip_Tease", true);
stripTease();
select_s_srs1();
return;
}

var baudSkPatt2 = new Array("I gasp", "I sigh", "so tight", "really tight", "deep", "Push it honey", 
"Slowly, very slowly", "push it honey", "slowly, very slowly", "gasping", "slowly, slowly", "Ah, Au, Ai")
if ( TestRegex( baudSkPatt2  ) ) {  	newImg = LcM;
GM_setValue("strip_Tease", true);
stripTease();
play_sound1(Audio5Gsp );
return;
}

var screamPatt = new Array("scream", "shriek", "I shriek", "WOW!", "WOW", "WOOT", "WOOT!", "delight" )
if ( TestRegex( screamPatt ) ) {  	newImg = LcM;
play_sound1(Audio6scr); 
return;
}

else 
	{
	GM_setValue("strip_Tease", false);
	// - need some default sound, what could that be, perhaps some soothing music?
	}
}  // eof choose_sound()


function play_sound1(srs) {
var sound = document.createElement("audio");
sound = srs;
sound.setAttribute("autoplay", "yes");
document.body.insertBefore(sound, document.body.firstChild);
}

baudSkana = new Array (Audio1, Audio2, Audio3, Audio4 );

var size = baudSkana.length; //- get how many items in the list
var random = Math.floor(Math.random()*size);  // - generate random number based on the above
var previous;

function select_s_srs1() {

previous = GM_getValue("previous", 0); //
	if ( random != previous) // - if current random number is not the same as previous
	{ 
	s = baudSkana[random];
	}
	else 
	{
	randomise();  // - if the random number the same as previous - get another random number
	return;
	}
if (s)
	{
	previous = random; // - remember previous selection
GM_setValue("previous", previous); // 
	}
	else
	{
	//alert("run error!");  // - error for test
	random = 0;
	}
play_sound1(baudSkana[random]);
}


function randomise() {
random = Math.floor(Math.random()*size); 
select_s_srs1();
}


// *************************** ANIMATION SECTION  *******************************

var FrmNum = 0;
var stop = false;
var move;
//var i;

function change_img() {
FrmNum++;
if (FrmNum > length) {
FrmNum = 0;
}
if (FrmNum < 0) {
FrmNum = length;
}


newImg = Vid[FrmNum];
newImg.setAttribute("class", "rounded");
newImg.setAttribute("id", "imgPlaceHolder");
var imgPlaceHolder = document.evaluate(".//p[@id = 'demo']", document.body, null, 9, null).singleNodeValue;
if (imgPlaceHolder  ){ imgPlaceHolder.parentNode.replaceChild(newImg, imgPlaceHolder);		}
else if (   newImg         ){
imgPlaceHolder = document.evaluate(".//img[@id = 'imgPlaceHolder']", document.body, null, 9, null).singleNodeValue;
imgPlaceHolder.parentNode.replaceChild(newImg, imgPlaceHolder);	 }			
}  // eof change_img()

function animate() {
length = Vid.length - 1;
//if (stop == true) {
//stop = false;
//window.clearInterval(move);
//alert('stopped');
//}
//else
//{
//stop = true;
if (frameRate){ move = setInterval(change_img, frameRate);  //alert(frameRate+1);  
}
else { move = setInterval(change_img, 3000);  //alert(frameRate+2);               
}
 //  }
}  // eof animate()

function lightsOff(){

var zElements = document.getElementsByTagName('a');
for (var i=0; i<zElements.length; i++) {
zElements[i].style.color="#080";
}
GM_addStyle(".rounded { background-color: black !important; }");
GM_addStyle(".bodywrap { background-color: black !important; }");
GM_addStyle(".adWrapTop { background-color: black !important; }");
GM_addStyle(".bigarea { background-image: none !important; }");
GM_addStyle(".bigarea { background-color: black !important; }");
GM_addStyle(".whitesection { background-color: black !important; }");
GM_addStyle(".outerNav { background-color: black !important; }");
GM_addStyle(".innerNav { background-color: black !important; }");
GM_addStyle(".bigfont { background-color: black !important; }");
GM_addStyle(".ifacebookShare { background-color: black !important; }");
GM_addStyle(".mainContent { background-color: black !important; }");
GM_addStyle("h2 { background-color: black !important; }");
GM_addStyle("b { background-color: black !important; }");
GM_addStyle("td { background-color: black !important; }");
GM_addStyle("th { background-color: black !important; }");
GM_addStyle("span { background-color: black !important; }");
GM_addStyle("form { background-color: black !important; }");
GM_addStyle("body { background-color: black !important; }");
GM_addStyle("div { background-color: black !important; }");
GM_addStyle('form[id^="check1"] { background-color: green !important; }');
document.body.style.background = "black";
document.bgColor="black";
document.fgColor="pink";
}  // eof lightsOff()
if ( GM_getValue( "lights_Off" ) ){lightsOff();}

if(top==self) {  
checkBox(); 
get_PFreply();
 }  

