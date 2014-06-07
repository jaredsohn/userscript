// ==UserScript==
// @name          RogerTracker  BBCode
// @description   Adds a simple BBCode edit interface to any text editing area on roger tracker.
// @namespace     http://shoguevara.livejournal.com/
// @version       24/01/2008
// @include       http://bittorrent.roger.net.ru/*
// @include       http://www.bittorrent.roger.net.ru/*


// ==/UserScript==


unsafeWindow.tagIt = function (tagOpen,tagClose,i) {

  var ta = unsafeWindow.textArray[i];
  var st = ta.scrollTop;
  var clr = "#000000";
    

  if (ta.selectionStart | ta.selectionStart == 0) {
    // work around Mozilla Bug #190382
    if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }



    // decide where to add it and then add it
    var firstPos = ta.selectionStart;
    var secondPos = ta.selectionEnd+tagOpen.length;



    ta.value=ta.value.slice(0,firstPos)+tagOpen+ta.value.slice(firstPos);
    ta.value=ta.value.slice(0,secondPos)+tagClose+ta.value.slice(secondPos);

    

    // reset selection & focus... after the first tag and before the second 
    ta.selectionStart = firstPos+tagOpen.length;
    ta.selectionEnd = secondPos;

    //ta.focus();

    ta.scrollTop=st;

  } 

}  

unsafeWindow.linkIt = function (i) {
  var myLink = prompt("Enter URL:","http://");
  var name = prompt("Enter the name of the website:");
  if (myLink != null) {
    unsafeWindow.tagIt('[url=' +myLink+ ']' +name+ '[/url]','', i);
  }

}

unsafeWindow.linkImg = function (i) {
  var myImg = prompt("Enter Image URL:","http://");
  if (myImg != null) {
    unsafeWindow.tagIt('[img=' +myImg+ ']','', i);
  }

}

unsafeWindow.fontIt = function (i) {
  var myFace = prompt("Enter Font Face:","Font Face Here");
  unsafeWindow.tagIt('[font=' +myFace+ ']','' +name+ '[/font]', i);
}

unsafeWindow.colorIt = function (i) {
    var myColor = prompt("Enter Font Color:","rgb(x,x,x), #xxxxxx, or colorname");  
    unsafeWindow.tagIt('[color=' +myColor+ ']','' +name+ '[/color]', i);
}


unsafeWindow.sizeIt = function (i) {
    var mySize = prompt("Enter Font Size:","1-7");
    unsafeWindow.tagIt('[size=' +mySize+ ']','' +name+ '[/size]', i);
}

unsafeWindow.quoteIt = function (i) {
    var myQuote = prompt("Quote:","author");
    unsafeWindow.tagIt('[quote=' +myQuote+ ']','' +name+ '[/quote]', i);
}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
unsafeWindow.textArray = new Array();unsafeWindow.textArray = new Array();



for (i=0; i<textareas.snapshotLength; i++) {

  if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('style').indexOf("display: none") == -1){
    unsafeWindow.textArray[i] = textareas.snapshotItem(i);
    var accessBar = document.createElement("div");

    accessBar.setAttribute('style','');
    accessBar.innerHTML =
	//button style
	"<style type=\"text/css\"> #button {padding:0px; font-weight:bold; display:inline; font-size: 20px;} a.button {text-decoration:none; text-align:center; background-color:#F0F0F0; color:#444444; width:70px; border:1px solid; border-color:#ccc 	#ccc #999 #999; padding:2px; } a.button:active {text-decoration:none; text-align:center; background-color:#F0F0F0; color:#444444; width:70px; border:1px solid; 	border-color:#ccc #ccc #999 #999; padding:2px;} a.button:hover {top:2px; left:2px; color:#999999; border-color:#ccc #ccc #999 #999;} </style>" +
      "<a class=\"button\" href=\"javascript:tagIt('[b]','[/b]',"+ i +")\"  title=Bold><b>&nbsp;B&nbsp;</b></a> " +  //bold
      "<a class=\"button\" href=\"javascript:tagIt('[i]','[/i]',"+ i +")\" title=Italic><i>&nbsp;I&nbsp;</i></a> " +  //italic
      "<a class=\"button\" href=\"javascript:tagIt('[u]','[/u]',"+ i +")\" title=Underline><u>&nbsp;U&nbsp;</u></a> " +  //Underlined
	  "<a class=\"button\" href=\"javascript:quoteIt("+i+")\" title=Quote>&nbsp;&ldquo;&bdquo;&nbsp;</a> " +  //Quote
      "<a class=\"button\" href=\"javascript:linkIt("+i+")\" title=Named Link>Link...</a> " +  //Named Link
      "<a class=\"button\" href=\"javascript:tagIt('[url]','[/url]',"+ i +")\" title=Right>Link</a> " +	  //Link
      "<a class=\"button\" href=\"javascript:linkImg("+i+")\" title=Image>Img</a> " +  //Image
	  "<a class=\"button\" href=\"javascript:fontIt("+i+")\" title=Font>&nbsp;F&nbsp;</a> " +  //Font
	  "<a class=\"button\" href=\"javascript:colorIt("+i+")\" title=Color>RGB</a> " +  //Color
      "<a class=\"button\" href=\"javascript:sizeIt("+i+")\" title=Size>Size</a> " +  //Size
	  "<a class=\"button\" href=\"javascript:tagIt('[pre]','[/pre]',"+ i +")\" title=Preformat>Pre</a> " +	  //Preformatted
	  "";+
    unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
  }

}