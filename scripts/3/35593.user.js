// ==UserScript==
// @name			Arabic-Hebrew ToolTip Translation
// @namespace		http://userscripts.org/users/69486
// @description		Translate words on a webpage from Arabic to Hebrew in tooltips, using Ayalon-Shen'ar
// @include		*
// ==/UserScript==


function unicodeToWindows1256 (string) { //converts from unicode to windows-1256 in percent encoding
	var returnString="";				 //and also removes any undesired characters (fatha, kasra, damma, shadda, etc.)
	var currCharCode;					 //since windows-1256 and unicode tables do not follow the same sequence, this will have to be done in a very unsofisticated way
	for (i=0;i<string.length;i++) {
		currCharCode=string.charCodeAt(i);
		if (currCharCode>=1569 && currCharCode<=1590) { //hamza to dad shows consistency
			currCharCode-=1376;
		} else if  (currCharCode>=1591 && currCharCode<=1594) { //tah to ghain
			currCharCode-=1375;
		} else if (currCharCode>=1600 && currCharCode<=1603) { //tatweel to kaf
			currCharCode-=1380;
		} else if (currCharCode==1604) { //lam
			currCharCode-=1379;
		} else if (currCharCode>=1605 && currCharCode <= 1608) { // meem to waw
			currCharCode-=1378;
		} else if (currCharCode>=1609 && currCharCode <=1610) { // alef maksura to yeh
			currCharCode-=1373;
		}
		returnString+="%"+currCharCode.toString(16); //encode for uri
	}
	return returnString;
}

(function() {
  var ATTtooltipDelay = 1000; //milliseconds
  var ATTtimeoutID;
  var ATTparent;
  var ATToffset;
  var ATTcurX;
  var ATTcurY;
  var ATTtooltip;
  var ATTdefinitions = ""; //translation output
  var align_left;
  var align_top;
  var keep_on_screen;
  
  function appendChild(child,parent){parent.insertBefore(child,parent.lastChild.nextSibling);}
  function $(id){return document.getElementById(id);}
  function onClick(id,func){$(id).addEventListener('click',func,false);}

  GM_addStyle(
	'.ATTPopup { background:#f6f6f6; border:3px double #666666;}'+
	'.ATTPopupContainer { display:none; position:absolute; top:0; right:0; bottom:0; left:0; }'+
    '#ATTConfigContainer { z-index:1001; }'+
    '#ATTConfig { width:700px; padding:10px; margin:20px auto 0; direction: ltr; text-align: left;}'+
    '#ATTConfig label, #ATTConfig .ATTLabel { color:#666666; font-weight:normal; } '+
    '#ATTConfig .ATTHeader { font-weight:bold; }'+
    '#ATTConfigShadow, #ATTShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.6; }'+
    '.ATTImportant { font-weight:bold; }'+
    '.ATTNote { color:#777777; }'
  );

  var popupDiv = document.createElement('div');
  popupDiv.id = 'ATTPopupContainer';
  popupDiv.className = 'ATTPopupContainer';
  appendChild(popupDiv, document.body);
  var shadowDiv = document.createElement('div');
  shadowDiv.id = 'ATTShadow';
  appendChild(shadowDiv, document.body);
  
  if(GM_getValue) {
    align_top = GM_getValue("align_top", 1);
    align_left = GM_getValue("align_left", 1);
    keep_on_screen = GM_getValue("keep_on_screen", 1);
  } else {
    align_top = 1;
    align_left = 1;
    keep_on_screen = 1;
  }
  if(GM_registerMenuCommand) {
    GM_registerMenuCommand("Configure Arabic-Hebrew ToolTip Translation", showConfig);
  }
  
  function showConfig() {
    showPopup(
      '<div id="ATTConfig" class="ATTPopup"><div style="text-align:center;"><span class="ATTImportant">Configure Arabic-Hebrew Tooltip Translation</span></div><br />'+
      'All changes are saved immediately, but some changes might not take effect in tabs that are already open<br />'+
      '<br /><span class="ATTHeader">Tooltip Location</span><br />'+
      ' &nbsp; &nbsp; <input type="radio" name="ATTLocationX" id="ATTLocationX1" value="1" /><label for="ATTLocationX1">To the right</label>'+
                   '  <input type="radio" name="ATTLocationX" id="ATTLocationX0" value="0" /><label for="ATTLocationX0">To the left</label><br />'+
      ' &nbsp; &nbsp; <input type="radio" name="ATTLocationY" id="ATTLocationY1" value="1" /><label for="ATTLocationY1">Below</label>' +
                   '  <input type="radio" name="ATTLocationY" id="ATTLocationY0" value="0" /><label for="ATTLocationY0">Above</label><br />'+
      ' &nbsp; &nbsp; <input type="checkbox" id="ATTKeepOnScreen"/><label for="ATTKeepOnScreen">Keep Tooltips on screen</label><br />'+
      '<hr /><div style="text-align:right;"><input type="button" id="ATTCloseConfig" value="Close" /></div>'+
      '</div>', true
    );
    onClick('ATTCloseConfig', function() { hidePopup(); });
    if($('ATTLocationX' + align_left))
      $('ATTLocationX' + align_left).checked='checked';
    if($('ATTLocationY' + align_top))
      $('ATTLocationY' + align_top).checked='checked';
    $('ATTKeepOnScreen').checked=keep_on_screen;
    for(var i = 0; i < 2; i++) {
      onClick('ATTLocationX' + i, (function(i) {return(function(e) { align_left = i; GM_setValue("align_left", i); e.target.blur(); })})(i));
      onClick('ATTLocationY' + i, (function(i) {return(function(e) { align_top = i;  GM_setValue("align_top", i);  e.target.blur(); })})(i));
    }
    onClick('ATTKeepOnScreen', function(e) { keep_on_screen = e.target.checked; GM_setValue("keep_on_screen", keep_on_screen); e.target.blur(); });
  };
  
  function showPopup(content,onTop) {
    $('ATTPopupContainer').innerHTML = content;
    if (onTop) {
      $('ATTShadow').style.zIndex = '1000';
      $('ATTPopupContainer').style.zIndex = '1001';
    } else {
      $('ATTShadow').style.zIndex = '1';
      $('ATTPopupContainer').style.zIndex = '2';
    }
    $('ATTShadow').style.display = 'block';
    $('ATTPopupContainer').style.display = 'block';
    window.scroll(0,0);
  }

// Hide popups created with showPopup()
  function hidePopup() {
    if ($('ATTPopupContainer')) {
      $('ATTPopupContainer').style.display = 'none';
      $('ATTShadow').style.display = 'none';
    }
  }

  function ATTshowToolTip() {
    if(ATTdefinitions.length) {
      var minX, minY, maxX, maxY, ttX, ttY;

      ATTtooltip.style.width = "auto";
      ATTtooltip.style.height = "auto";
	  ATTtooltip.style.maxHeight="200px"; // prevents too long tooltips
	  ATTtooltip.style.minWidth="50px";
	  ATTtooltip.style.overflow = "auto"; // adds scrollbars in case of long content
      ATTtooltip.innerHTML = ATTdefinitions;
      ATTtooltip.firstChild.style.marginTop = "0";
      ATTtooltip.firstChild.style.marginRight = "0";
      ATTtooltip.firstChild.style.marginBottom = "0";
      ATTtooltip.firstChild.style.marginLeft = "0";
	  if(align_left) {
        ttX = ATTcurX + 10;
      } else {
        ttX = ATTcurX - 10 - ATTtooltip.offsetWidth;
      }
      if(align_top) {
        ttY = ATTcurY + 10;
      } else {
        ttY = ATTcurY - 10 - ATTtooltip.offsetHeight;
      }
      minX = document.documentElement.scrollLeft;
      minY = document.documentElement.scrollTop;
      maxX = minX + document.documentElement.clientWidth - ATTtooltip.offsetWidth;
      maxY = minY + document.documentElement.clientHeight - ATTtooltip.offsetHeight;
      if(keep_on_screen) {
        if(ttX < minX)
          ttX = minX;
        else if(ttX > maxX)
          ttX = maxX;
        if(ttY < minY)
          ttY = minY;
        else if(ttY > maxY)
          ttY = maxY;
      }
	  var addCloseButton=document.createElement("div"); //creates the "x" button on top of the tooltip
	  addCloseButton.style.fontWeight="bold";
	  addCloseButton.style.cursor="pointer";
	  addCloseButton.style.width="1em";
	  addCloseButton.innerHTML="X";
	  addCloseButton.addEventListener("click",ATThide,false);
	  addCloseButton=ATTtooltip.insertBefore(addCloseButton,ATTtooltip.firstChild);


      ATTtooltip.style.left = ttX + "px";
      ATTtooltip.style.top = ttY + "px";
      ATTtooltip.style.visibility="visible";
    }
  }

 function ATTparseResponse(responseDetails) {

	var entirePage=responseDetails.responseText
	var startText=entirePage.indexOf("<li class=recordli>");
	if (startText!=-1) { // if startText==-1 there are no values whatsoever. in fact, the website uses <li  class=recordli> to display some information where no entries are found, but luckly, with two spaces after the "<li", so it doesn't count.
		var endText=entirePage.indexOf("<HR size=1>"); //from here - expressions
		if (endText==-1) endText=entirePage.indexOf("<!-- start footer -->"); //there are no expression - cut text until start of footer
		var textToAnalyze=entirePage.substring(startText,endText);
		var entriesRegEx = /<li class=recordli>/g
		var entries=textToAnalyze.split(entriesRegEx); // split to different entries
		for (i=0;i<entries.length;i++) {
			var meaningStart=entries[i].indexOf('<FONT class="meaning">')+22;
			var meaningEnd=entries[i].indexOf("</FONT>",meaningStart);
			var meanings=entries[i].substring(meaningStart,meaningEnd);
			if (meanings!="") meanings='<p style="color:black;font-size:12pt;font-weight:normal;font-family:David, Serif">' + meanings + '</p>'; //we have to use hard-coded css values in order to override any other css definition the website may have
			var entryDetails=entries[i].substring(0,meaningStart);
			entryDetails=entryDetails.replace(/<script>[\s\S]*<\/script>/g,""); //remove anything that's between script tags
			entryDetails=entryDetails.replace(/<[^>]*>/g,""); //remove all html tags
			if (entryDetails!="") entryDetails='<p style="color:black;font-size:12pt;font-weight:normal;font-family:Simplified Arabic, David, Serif">' + entryDetails + '</p>';
			ATTdefinitions+=entryDetails+meanings;
		}	
	}
	document.documentElement.style.cursor="auto"; // disable "progress" animation for the user - back to default cursor
    ATTshowToolTip();
  }

  function ATTtranslateWord(input) {
    var ATTreq;
	document.documentElement.style.cursor="progress"; // create "progress" animation for the user
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://www.arabdictionary.huji.ac.il/cgi-bin/arabic_results.pl',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible)',
        'Accept': 'application/atom+xml,application/xml,text/xml',
		'Content-type' : 'application/x-www-form-urlencoded; charset=windows-1256' ,
      },
	  overrideMimeType: 'text/html; charset=windows-1256;', //read content as windows-1256 and not as unicode
	  data:'act=dosearch&searchType=byElement&String='+unicodeToWindows1256(input),
      onload: ATTparseResponse
    });
  }

  function ATTgetWord() {
  if (ATTtooltip.style.visibility=="visible") {       //a tooltip is already shown. we'll find out if the user's cursor is inside the current tooltip
	var ATTtooltipTop=parseInt(ATTtooltip.style.top); //in order to prevent another tooltip popup for arabic words inside the already-shown tooltip
	var ATTtooltipLeft=parseInt(ATTtooltip.style.left);

	if (ATTcurX>ATTtooltipLeft && ATTcurX<ATTtooltipLeft+ATTtooltip.offsetWidth && ATTcurY>ATTtooltipTop && ATTcurY<ATTtooltipTop+ATTtooltip.offsetHeight) {
		return; //user in inside current tooltip. do nothing
	}
  }
	ATThide(); //hide the current tooltip

    var range = ATTparent.ownerDocument.createRange();
    range.selectNode(ATTparent);
    var str = range.toString();
    range.detach();

    if(ATToffset < 0 || ATToffset >= str.length)
      return null;
    var start = ATToffset;
    var end = ATToffset + 1;
    var valid_word = /^(([\u0600-\u06ff\"\']+))$/;
    if(!valid_word.test(str.substring(start, end)))
      return null;
    while(start > 0 && valid_word.test(str.substring(start - 1, end)))
      start--;
    while(end < str.length && valid_word.test(str.substring(start, end+1)))
      end++;
    var text = str.substring(start, end);

    ATTtranslateWord(text);
  }

  function ATTmousescroll(event) {
    ATTmousemove(event);
  }

  function ATThide() {
    if(ATTtimeoutID) {
      ATTdefinitions = "";
      ATTtooltip.style.visibility = "hidden";
      ATTtooltip.innerHTML = ATTdefinitions;
      ATTtooltip.style.left = 0 + "px";
      ATTtooltip.style.top = 0 + "px";
      ATTtooltip.style.width = 0 + "px";
      ATTtooltip.style.height = 0 + "px";
      window.clearTimeout(ATTtimeoutID);
      ATTtimeoutID = 0;
    }
  }

  function ATTmousemove(event) {
    //test out the tooltip
    var e = event;

    //every movement of the mouse restarts the timer without removing the tooltip
    //ATThide();
	window.clearTimeout(ATTtimeoutID);
    ATTtimeoutID = 0;
    //don't bother starting a new timer if the location is no good.
    try {
      if(!e || !e.rangeParent || e.rangeParent.nodeType != e.rangeParent.TEXT_NODE
         || e.rangeParent.parentNode != e.target)
        return;
    }
    catch(e) {
      return; //I don't know how to handle the permission denied thing
    }

    ATTtimeoutID = window.setTimeout(ATTgetWord, ATTtooltipDelay);
    //variables for use in displaying the translation:
    ATTparent = event.rangeParent;
    ATToffset = event.rangeOffset;
    ATTcurX=e.pageX;
    ATTcurY=e.pageY;
    return;
  }

  // Initialize the script
  function ATTinit () {
    var element;

    window.addEventListener("mousemove", ATTmousemove, false);
    window.addEventListener("DOMMouseScroll", ATTmousescroll, false);
    ATTtooltip = document.createElement("div");
    element = document.lastChild;

    ATTtooltip = element.insertBefore(ATTtooltip, element.lastChild.nextSibling);
    ATTtooltip.className = "tooltip";
    ATTtooltip.style.visibility = "hidden";
    ATTtooltip.style.top = 0;
    ATTtooltip.style.left = 0;
    ATTtooltip.style.position = "absolute";
    ATTtooltip.style.border = "1px solid black";
    ATTtooltip.style.padding = "1px";
    ATTtooltip.style.backgroundColor = "lightyellow";
	ATTtooltip.style.direction = "rtl";
    ATTtooltip.style.zIndex = "10000";

  }

  window.addEventListener("load", ATTinit, false);
})();
