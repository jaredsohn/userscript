// ==UserScript==
// @name        meetme Tidy-Up
// @namespace   http://www.meetme.com/member/42705329
// @description Tidies up some pages on meetme by giving the user the option to remove ads and other annoying things.
// @include     http://www.meetme.com/apps/home
// @include		http://www.meetme.com/apps/home?
// @include		http://www.meetme.com/*
// @include		http://*.meetme.com/*
// @grant		GM_addStyle
// @version     1
// @run-at document-start
// ==/UserScript==

//Do not touch anything in this box ============================================
/*   Instantiating global vars*/                                              //
/**/ var hideHeaderAd;                                                        //
/**/ var hideRCAd;                                                            //
/**/ var hideHALPAd;                                                          //
/**/ var hideFooterAd;                                                        //
/**/ var hideGFCOffer;                                                        //
/**/ var hideExpandableAd;                                                    //
/**/ var hideCredits;                                                         //
/**/ var hideSpotlight;                                                       //
/**/ var hideFBFooter;                                                        //
/**/ var hideSocialSafety;                                                    //
/**/ var hideRightAdInMsgs;                                                   //
/**/ var hideInlineAds; //Which reside at least on the messages page          //
/**/ var hideCPAPromoAd;                                                      //
/**/ initializeBoolVars();//initialize vars                                   //
/*============================================================================*/


//=================== Uncomment what you want hidden ==========================
/*By default, most but not all is hidden. Uncomment anything you want hidden, by removing the '//' before it. Add '//' to allow it to appear.*/	
hideHeaderAd = true; //Header ad
hideRCAd = true; //Ad in right column
hideHALPAd = true; //HALPromotion that resides near spotlight
hideFooterAd = true; //Footer ad
//hideGFCOffer = true; //"Get free credits!" offer
hideExpandableAd = true; //Expandable ad
//hideCredits = true; //Number of credits
//hideSpotlight = true; //Spotlight area
//hideFBFooter = true; //Facebook footer
hideSocialSafety = true; //Social safety
hideRightAdInMsgs = true; //Right ad on messages page
hideInlineAds = true; //Inline ads (at least on message page below and above msgs
hideCPAPromoAd = true;
//=============================================================================

GM_addStyle("body { display: none; } img { border: 0; }"); //to prevent flicker

addEventListener('DOMContentLoaded', deleteAds, false);

function initializeBoolVars () {
	hideHeaderAd = false; //Header ad
	hideRCAd = false; //Ad in right column
	hideHALPAd = false; //HALPromotion that resides near spotlight
	hideFooterAd = false; //Footer ad
	hideGFCOffer = false; //"Get free credits!" offer
	hideExpandableAd = false; //Expandable ad
	hideCredits = false; //Number of credits
	hideSpotlight = false; //Spotlight area
	hideFBFooter = false; //Facebook footer
	hideSocialSafety = false; //Social safety
	hideRightAdInMsgs = false; //Right ad - messages page
	hideInlineAds = false; //inline ads (messages page, above and below messages)
	hideCPAPromoAd = false;
}

function deleteAds () { 
	//============================ Header Ad ==================================
	if (hideHeaderAd == true) {
		//get TopAdPlacement
		var TopAdPlacement = document.getElementById('TopAdPlacement');
		var topAd = document.getElementById('topAd');
		//remove TopAdPlacement
		if (TopAdPlacement != null)
		{
			TopAdPlacement.parentNode.removeChild(TopAdPlacement);
		}
		if (topAd != null) {
			topAd.parentNode.removeChild(topAd);
		}
	}
	//=========================================================================


	//========================= Right Column Ad ===============================
	if (hideRCAd == true) {
		//get RightColumn
		var RightColumn = document.getElementById('RightColumn');
		//remove children of RightColumn (ad(s))
		if (RightColumn != null)
		{
			for (var i = 0; i < RightColumn.children.length; i++)
			{
				var child  = RightColumn.children[i];
				RightColumn.removeChild(child);
			}
		}
	}
	//=========================================================================


	//================= HALPromotion in spotlight area ========================
	if (hideHALPAd == true) {
		//get HALPromotion that sits next to the spotlight
		var HALPromotion = document.getElementById('HALPromotion');
		//remove HALPromotion
		if (HALPromotion != null)
		{
			HALPromotion.parentNode.removeChild(HALPromotion);
		}
	}
	//=========================================================================


	//=========================== Footer Ad ===================================
	if (hideFooterAd == true) {
		//get bottom ad
		var BottomAd = document.getElementsByClassName('googleAd_728x90')[0];
		//remove bottom ad
		if (BottomAd != null)
		{
			BottomAd.parentNode.removeChild(BottomAd);
		}
	}
	//=========================================================================


	//======================= "Get Free Credits!" =============================
	if (hideGFCOffer == true) {
		//get the ad
		var FreeCredits = document.getElementById('header_get_credits');
		//remove it
		if (FreeCredits != null)
		{
			FreeCredits.parentNode.removeChild(FreeCredits);
		}
	}
	//=========================================================================


	//==================== "checkm8" expandable ad ============================
	if (hideExpandableAd == true) {
		//get ad
		var checkm8 = document.getElementById('checkm8');
		//remove it
		if (checkm8 != null)
		{
			checkm8.parentNode.removeChild(checkm8);
		}
	}
	//=========================================================================
	
	//=========================== Credits =====================================
	if (hideCredits == true) {
		//get credits element
		var Credits = document.getElementById('header_credits');
		//remove it
		if (Credits != null)
		{
			Credits.parentNode.removeChild(Credits);
		}
	}
	//=========================================================================
	
	//========================== Spotlight ====================================
	if (hideSpotlight == true) {
		//get spotlight
		var Spotlight = document.getElementById('HALSpotlight');
		//remove spotlight
		if (Spotlight != null)
		{
			Spotlight.parentNode.removeChild(Spotlight);
		}
	}
	//=========================================================================
	
	//======================= Facebook Footer =================================
	if (hideFBFooter == true) {
		//get Facebook footer
		var FacebookFooter = document.getElementById('footerLeftSide');
		//remove Facebook footer
		if (FacebookFooter != null)
		{
			FacebookFooter.parentNode.removeChild(FacebookFooter);
		}
	}
	//=========================================================================
	
	//======================== Social Safety ==================================
	if (hideSocialSafety == true) {
		//get Social Safety
		var SocialSafety = document.getElementById('socialSafety');
		//remove social safety
		if (SocialSafety != null)
		{
			SocialSafety.parentNode.removeChild(SocialSafety);
		}
	}
	//=========================================================================
	
	//====================== Right Ad - Messages Page =========================
	if (hideRightAdInMsgs == true) {
		//get rightAd
		var rightAd = document.getElementById('rightAd');
		//remove it
		if (rightAd != null)
		{
			rightAd.parentNode.removeChild(rightAd);
		}
	}
	
	//=========================================================================
	
	//========================== Inline Ads Class =============================
	if (hideInlineAds == true) {
		//get inlineAds class
		var inlineAds = document.getElementsByClassName ('inlineAd');
		var inlineAdBottom = document.getElementById ('inlineAdBottom');
		//remove them
		if (inlineAds != null)
		{
			var i = 0;
			for (i = 0; i < inlineAds.length; i++)
			{
				inlineAds[i].parentNode.removeChild(inlineAds[i]);
			}
		}
		if (inlineAdBottom != null) {
			//remove inlineAdBottom
			inlineAdBottom.parentNode.removeChild(inlineAdBottom);
		}
	}
	//=========================================================================
	
	//========================== CPAPromoAd ===================================
	if (hideCPAPromoAd == true) {
		//get CPAPromotionAd div
		var CPAPromoAd = document.getElementById ('CPAPromotionAd');
		if (CPAPromoAd != null)
		{
			CPAPromoAd.parentNode.removeChild(CPAPromoAd);
		}
	}
	
	//=========================================================================
	/*
	Template for removing stuff:
	
	if (hide[var name] == true) {	
		//get [readable element name]
		var [var name] = document.[getElementById/getElementsByClassName]('[Id or Class Name of Element]');
		//remove [readable element name]
		if ([var name] != null)
		{
			[var name].parentNode.removeChild([var name]);
		}
	}
	
	*/
	
	//re-display body
	GM_addStyle("body { display:inline; } img { }");
	
}