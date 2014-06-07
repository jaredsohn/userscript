// ==UserScript==
// @name           SLGiftsCollector
// @namespace      Facebook
// @description    Generates links for SLGifts to share
// @version        2.0.4
// @history        2.0.4 Corrected bug with hide for Pending gifts notification.
// @history        2.0.3 While working to get ignoring going again - changed auto-focus to a more user friendly heads-up.
// @history        2.0.2 Removed sub reqs.php alternate pages from being scripted.
// @history        2.0.1 Added work around for SL invites that are in the "gift list" - should also create safe hop around gifts that don't say "Here's a"
// @history        2.0.0 Rewrote to match facebook changes of 9/23/2010
// @history        1.0.0 Removed use of googleapis.com ajax library 
// @history        0.9.2 Updated colors to work with SLGiftsIgnore - fixed timer
// @history        0.9.1 Test to grab new return gifts
// @history        0.9.0 Fixed Duplicate Links error and added friendly timer for startup
// @history        0.8.0 Gets past new gift type
// @history        0.7.0 Creates XML data
// @history        0.5.2 Created links
// @history        0.0.1 testing functions
// @require        http://stevenlevithan.com/assets/misc/date.format.js
// @include        http://www.facebook.com/reqs.php
// ==/UserScript==

var Gifts = document.getElementsByTagName("input");
var Cleanlinks ="", test, giftname, SLGiftNum=0, GiftAnchor;
for(var i=0,max=Gifts.length;i<max;i++){
   test = Gifts[i].getAttribute('name');
   if (test) if (test.substr(0,47)=="actions[http://apps.facebook.com/sororitylife/?") {
      if (!GiftAnchor) {
         GiftAnchor = Gifts[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
         GiftAnchor.parentNode.style.background="#f09";
      }
      Gifts[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.background="#f09";
      giftname = Gifts[i].parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
      giftname = giftname.match(/Here's a <b>(.+?)</m);//'
//Find a safe way to skip this
      if (giftname != null) {
         giftname = giftname[1];
      } else {
         giftname = "Request Troll Assistance on Aisle1";
      }
      //Name is up five parentnodes and then just rip innerhtml for between <b> </b>
      Cleanlinks +=   cleanlink(test,giftname) + "\n";
      SLGiftNum++;
   }
}
    var title = document.createElement('H2');
    title.style.background = "#f09";
    title.style.color = "#fff";
    title.innerHTML = "<b>" + lnCount(Cleanlinks) + " Sorority Life Gifts found</b>";
    var newTextArea = document.createElement('textarea');
    newTextArea.defaultValue = Cleanlinks; 
    newTextArea.cols="100";
    newTextArea.rows="15";
    newTextArea.readOnly;
    newTextArea.setAttribute('id',"McBBjB");
    GiftAnchor = GiftAnchor.parentNode
    GiftAnchor.parentNode.insertBefore(title,GiftAnchor);
    GiftAnchor.parentNode.insertBefore(newTextArea,GiftAnchor);

function lnCount(str){
	/* counts \n */
	//try {
		return((str.match(/[^\n]*\n[^\n]*/gi).length));
	//} catch(e) {
	//	return 0;
	//}
}

function cleanlink(link,name) {
  var NewLink = link.replace("actions[http://apps.facebook.com/sororitylife/?ref_id=","<mcb value=\"" + name+ "\" re=\"");
       //old name = Gift[i].value.replace("Accept ","") 
     NewLink = NewLink.replace("]","\"/>");
     NewLink = NewLink.replace(/&/g,"&amp;");
      //"\" title=\""+ user + "\" >" + Gift[i].value.replace("Accept ","") + " </a>");
return NewLink;
}
var STE = function ScrollToElement(theElement){
  theElement = document.getElementById('McBBjB');
  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
 window.scrollTo(selectedPosX,selectedPosY-50);
} 

//IGNORING

function Retitle() {
  document.title = "SLGifts"
}
var giftResponse = function iGiftResp(Count,SLForm,xmlhttp) {
                                        if (xmlhttp.readyState > 2) { 
                                           SLForm.innerHTML='Ignored gift '+ Number(Count+1);
                                        } else {
                                           SLForm.innerHTML='Waiting for response regarding this ignored gift '+ Number(Count+1) +' gifts';
                                           //alert(Count+":being checked");
                                           window.setTimeout(iGiftResp(Count,SLForm,xmlhttp),1000);
                                        }
}
var ignoreGifts = function iGifts(Count,tick) {
//alert("iGifts("+Count+")");
  if (Count == 0) document.getElementById('McBBjBButton').innerHTML='Ignoring Sorority Life Gifts';
  if (!tick) { 
    tick = 1
  }else{
    tick++;
  }
  var post;
  var url = "/ajax/reqs.php";
  var Gifts = document.getElementsByTagName("input");
  var Cleanlinks ="", test, giftname, SLGiftNum=0, GiftAnchor, exitLoop;
  for(var i=Count,max=Gifts.length;i<max && !exitLoop;i++){
     test = Gifts[i].getAttribute('name');
     if (test) if (test.substr(0,47)=="actions[http://apps.facebook.com/sororitylife/?") {
        Count = i;
        exitLoop = "True";
     }
  }
  if (exitLoop == "True") {
        //document.getElementById('McBBjBButton').innerHTML='Ignoring gift #' + Number(Count+1);
        post ="ajaxify=1&";
        SLInputs = Gifts[Count].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input');
//alert(SLInputs[0].outerHTML);

        var Wrapper = Gifts[Count].parentNode.parentNode.parentNode.parentNode;
        for (var inputi=0;inputi<SLInputs.length;inputi++) {
           if (SLInputs[inputi].getAttribute('type') != "submit") post+= SLInputs[inputi].getAttribute('name') + "=" + SLInputs[inputi].getAttribute('value') + "&";
        }
        post+="actions[reject]=Ignore";
       if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp=new XMLHttpRequest();
       } else {
          // code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
       }
        xmlhttp.open("POST",url,true);
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); //application/x-www-form-urlencoded
        xmlhttp.setRequestHeader("Content-Length",post.length);
        xmlhttp.setRequestHeader("Connection","close");
        //do a while to wait out each transaction??
        Wrapper.innerHTML = '<font style="font-size:15px;color:#fff"></font><font style="font-size:20px;color:#fff"></font>';
        Wrapper.style.background = "#009";
        xmlhttp.onreadystatechange = function () {
                                        if (xmlhttp.readyState > 1) {
                                           Wrapper.childNodes[1].innerHTML='Ignored Gift!';
                                        }
                                     }
       Wrapper.childNodes[1].innerHTML='Ignored gift.';
        xmlhttp.send(post);
        var NewCount = iGifts(Count,tick);
        Wrapper.childNodes[0].innerHTML = tick + '...';
        return NewCount + 1;
   } else {
        document.getElementById('McBBjBButton').innerHTML= '<font style="font-weight:bold;font-size:18px;">' + (tick-1) + ' Sorority Life gifts ignored!</font>';
        return 1;
   }
} 
     
   GiftAnchor.parentNode.style.background = "#009";
  setTimeout(Retitle,5000);
    var contButton = document.createElement('button');
    contButton.style = "button";
    contButton.setAttribute('id',"McBBjBButton");
    contButton.innerHTML = "Click to Ignore Sorority Life Gifts!";
    contButton.setAttribute('style',"bold;background-color:#f09;color:white;width:150;height:65");
    contButton.setAttribute('onClick',ignoreGifts+";iGifts(0);");
    var Script = document.createElement('script');
    Script.type="text/javascript";
    Script.innerHTML = giftResponse;
    GiftAnchor.style.background = "#f09";
    GiftAnchor.parentNode.insertBefore(contButton,GiftAnchor);
    GiftAnchor.parentNode.insertBefore(Script,GiftAnchor);

    var Copied = document.getElementById("McBBjB");
    var SLM = document.createElement('H2');
    SLM.setAttribute('id',"McBSLM");
    SLM.innerHTML = '<H2 style="font-size:16;display:inline;color:white" OnClick="javascript:'+STE
                 +';ScrollToElement();document.getElementById(\'McBSLM\').parentNode.removeChild(document.getElementById(\'McBSLM\'));return true;">SLGifts Pending</H2><H1 style="font-size:24;display:inline" TITLE="Click to Close" OnClick="javascript:this.parentNode.parentNode.removeChild(this.parentNode);return true;">X</H1>';
    //SLM.onclick="javascript:this.parentNode.removeChild(this);return true;"
    SLM.setAttribute('style',"font-size:16;bold;position:fixed;top:0;left:0;background-color:#f09;color:white;width:150;height:65");
    //SLM.setAttribute('OnClick',"javascript:"+STE+";ScrollToElement();this.parentNode.removeChild(this);return true;");
    SLM.setAttribute('TITLE',"Click to get to them!");
    GiftAnchor.parentNode.insertBefore(SLM,GiftAnchor);
    
    //ScrollToElement(Copied);
    Copied.focus();
    Copied.select();
    //setTimeout(ScrollToElement,1900);
