// ==UserScript==
// @name          Yahoo Mail Ad Removal
// @namespace     http://mtk.co.il/moppy
// @description	  removes the ads Motty Katan(c) Beta is Supported too. 06-02-2006 last updated 19-02-2010
// @include       http://*.mail.yahoo.com/mc/welcome?*
// @include       http://*.mail.yahoo.com/ym/login*
// @include       http://*.mail.yahoo.com/ym/ShowFolder*
// @include       http://*.mail.yahoo.com/ym/ShowLetter*
// @include       http://*.mail.yahoo.com/ym/Compose*
// @include       http://*.mail.yahoo.com/dc/launch*
// @include       http://*.mail.yahoo.com/ym/Folders*
// ==/UserScript==
//Change Log:
//10/02/06: removed duplicate include url.
//24/02/06 did I remove soething I shouldn't? or yahoo added more ads?
//anyhow added showLetter url to the include.
//17/03/06 BugFixed: attachments were hidden as well.
//26/03/06 iframe are now hidden by this script. changed "us.f516" to *
//         in the include urls just in case
//27/03/06 corrected the login url.(after session expired-relogin the url was without a questionmark)
//31/03/06 added compose url
//15/04/06 added url of Yahoo Mail Beta + removed iframe=hidden since it's deprecated
//27/04/06 added url for folders
//15/09/07 removed ugly code that was very noturious in making html emails and more disappear(Yahoo Clasic)
//         Yahoo Mail Beta support is now really supported all ads are removed.
//16/09/07 Yahoo Mail Beta added another iframe containing ads to hide.
//21/09/07 Yahoo Mail Beta expand both folder space and messages space automaticly
//18/09/09 Yahoo Mail Beta all is well, just the condition that I've used to detect the beta version
//         stopped working. I'm sorry. better condition. Yahoo mail classic doesn't work (code part A)
//18/10/09 removed Yahoo mail classic old code till further research. That fixed the reported problem with the attach button. Thanks for all the comments.
//16/02/10 Yahoo! did some changes to their code. New code had to be inserted. Happy Mardi Gras!
//19/02/10 Resize - dealt with. The pane(paper letter-I belive it's called in English) for chosing a background/theme for the message, now pops
//         over in the right side (instead of the left). much cleaner code. Publicity after sending a message
//         is now hidden too. Thanks for bringing it to my attention. Calender is still annoying.
//20/02/10 Scrollbar/flags not clickables bug fixed. Now the width is more dynamic and allows
//         stationary and search result to have their side and not to float over.
//20/02/10 Dealt with edge scenarios of switching between tabs (messages/search results).
//24/03/10 Dealt with little arrow for the publicity bar, showing over the messages
//if Yahoo Mail Beta
if (unsafeWindow.kPartner){
  var debug = 0, bRightSideEventSet = 0;
  function Log(s){GM_log("Yahoo Mail Ad removal:"+s);}
  logger = (debug) ? Log:function empty(){};

  //once upon a time this line did all the below! do you believe it?
  //I searched to find an equivalent, but helas.
  //stays just for historique reasons.
  unsafeWindow.kPartner.bucket = 0;

  //annoying right pane publicity
  oDivRightPane = document.getElementById("largePane");
  GM_addStyle("div#largePane iframe{visibility:hidden;display:none;}");
  var oCS = document.defaultView.getComputedStyle(oDivRightPane,null);
  var nZIndex = oCS.getPropertyValue('z-Index');

  //little arrow
  GM_addStyle("#ym-skyscroller{visibility:hidden;display:none;}");
  GM_addStyle("#ym-skyhider{z-index:0}");
  //publicity when sending a message
  GM_addStyle("iframe.scAdvertisement"+"{ visibility:hidden;display:none; }");

  if (unsafeWindow.kPartner.galaxy_ad_pos)//Used to be: unsafeWindow.kPartner.wadp
  {
  //currently 09-2009 there is only one ads (iframe-LREC)
  //better as a loop - to cut on updates
  //Update: no more dealing with the whole slot.
  //Using the insertion positions of ads and hide only iframes. (instead of wadp variable)
    for(i=0;i<unsafeWindow.kPartner.galaxy_ad_pos.length;i++){
      if (unsafeWindow.kPartner.galaxy_ad_pos[i]!==""){
        GM_addStyle("iframe#"+unsafeWindow.kPartner.galaxy_ad_pos[i]+"{ visibility:hidden;display:none; }");
      }
    }
  }

  //can find specific IDs by their className. to much time for now.
  oDiv = document.getElementById("mainTablePane");
  oDiv.addEventListener('DOMAttrModified', function cancelEvent(e){
	e.stopPropagation();
	e.preventDefault();
    if (e.attrName === 'style' && e.newValue.match(/width:/i)) {
    	//stationary/search results
        oRightSide = document.getElementById("rightSideTray");
    	if (oRightSide && (oRightSide.style.display != "none" || oRightSide.style.visibility != "hidden"))
        {
           //actually, reincreasing the zIndex isn't that important
           //good practice though
           oDivRightPane.style.zIndex = nZIndex;
	       /*
	        refresh this value for window resize events:
	        - galaxyPageContainer:maxsize calculated once
	        - messageTableWidth: initial value is maxsize, afterward it's recalculated
	        - mainTabBar:a bit over the maxsize but recalculated each time
	       */
           sWidth = (window.messageTableWidth) ? (window.messageTableWidth):parseInt(document.getElementById("mainTabBar").style.width) - parseInt(oDivRightPane.style.width);
           logger("right side detected - setting width to:"+sWidth);
           //handle edge scenarios of switching between tabs(messages/search results)
           if (!bRightSideEventSet)
           {
               bRightSideEventSet = 1;
	           oRightSide.addEventListener('DOMAttrModified', function cancelMe(e2)
	           {
               		e2.stopPropagation();
					e2.preventDefault();
					oEvt = document.createEvent("MutationEvent");
					oEvt.initMutationEvent('DOMAttrModified', false, false, null, null, "width: ", "style", "");
					oDiv.dispatchEvent(oEvt);
                    return false;
	           },false);
           }
        }
        else
        {

           //z-Index is important for scroll and flags functionality!
           oDivRightPane.style.zIndex = "0";
           sWidth = (window.messageTableWidth) ? (window.messageTableWidth+parseInt(oDivRightPane.style.width)):parseInt(document.getElementById("mainTabBar").style.width);
           try{logger("right side not detected - setting width to:"+sWidth+ " status:"+oRightSide.style.visibility)}catch(e){};
        }

        sWidth += "px";
	    logger("Changing mainTablePane width. Event fire with newvalue:"+e.newValue+" attribute:"+e.attrName);
	    oCalBar = document.getElementById("calBarPane");
	    //compute diff to correct calender's width last element
	    nDiff = parseInt(sWidth) - parseInt(oCalBar.style.width);

    	//work neatly inside a sand box
    	this.removeEventListener('DOMAttrModified', arguments.callee, false);

	    //all the folder tab
	    this.style.width =
	    //calender pane
	    oCalBar.style.width =
        //contact list -ruins everything!
        //document.getElementById("abTabView").style.width =
	    //the remaining folder view
	    document.getElementById("mainTabView").style.width = sWidth;
    	//work neatly inside a sand box
        document.getElementById("mainTablePane").addEventListener('DOMAttrModified', arguments.callee, false);

	    if (nDiff){

        /*

	      //this code in theorie should have worked.
	      //Needs more investigation! Care to help?
          nNewWidth = parseInt(oCalBar.childNodes[oCalBar.childNodes.length-1].style.width)+nDiff;
	      oCalBar.childNodes[oCalBar.childNodes.length-1].addEventListener('DOMAttrModified', function cancelEvent2(e2){
	        bRetVal = true;
	        if (e2.attrName === 'style' && e2.newValue.match(/width:/)) {
	          bRetVal = false;
	          oCalBar.style.width = sWidth;
	          window.Dd = 0;
	          //this.style.width = nNewWidth;
	        }
	        return bRetVal;
	        }, false);
	      oEvt = document.createEvent("MutationEvent");
	      oEvt.initMutationEvent('DOMAttrModified', false, false, null, null, "width: ", "style", "");
	      oCalBar.childNodes[oCalBar.childNodes.length-1].dispatchEvent(oEvt);
	      oCalBar.childNodes[oCalBar.childNodes.length-1].style.width = nNewWidth;
          */
	    }
    }

    //doesn't really kill the event, but oh well it does as it "dit" false.
    return false;
    }, false);

    logger("script loaded.");




}//end of yahoo mail beta