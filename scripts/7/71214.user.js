// ==UserScript==
// @name           Tina Fix
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    TINA <3
// @version        0.13
// @include        http://ww*.erepublik.com/*/my-places/army
// @include        http://ww*.erepublik.com/*/my-places/train/*
// ==/UserScript==

//Names and pics of the replacement generals
var generals_txt = ["Zivojin Misic", "Kralj Petar I", "Draza Mihajlovic"];
var generals_pix = ["http://img710.imageshack.us/img710/6601/zivojinmisic.jpg", "http://img706.imageshack.us/img706/4530/karadjordjevickraljpeta.jpg", "http://www.facebook.com/profile/pic.php?oid=AAAAAQAQms-uCcLyMPc-A2kCPfE9XgAAAAn_hrDF_-eZD9XIsnjQ3_wc"];

function replace_generals()
{
    //Replace the advanced trainers with US-centric leaders

    //Get the divs for the trainers
    var old_generals = document.evaluate("id('content')/div[2]/div[2]/div[2]/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    //Start at i = 1 because the first container is a blank face
    for(var i = 1; i < old_generals.snapshotLength; i++)
    {
        old_generals.snapshotItem(i).innerHTML = ' <a href="/en/my-places/train/' + i + '"> <h4>+' + 50*Math.pow(2,i-1) + '%</h4> <small><b>extra</b> training effect</small> <img src="' + generals_pix[i-1] + '" alt="Lana_' + (i*2-1) + '" height="96" width="106">					<strong>' + generals_txt[i-1] + '</strong> <h6>' + (0.15*i*i + 0.05*i + 0.3) + '</h6> </a><a class="fluid_blue_dark_big" href="/en/my-places/train/' + i + '"><span>Advanced Training &amp; Strategy</span></a>';
    };

    //Change the text in the Lana speech bubble (for after training)
    var old_general_txt  = ["Alexander the Great", "Caesar", "Napoleon"];
    var speech_bubble = document.evaluate("id('content')/div/div[2]/div[1]/p", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var temp_speech = speech_bubble.snapshotItem(0).innerHTML;
    for(var i = 0; i < old_general_txt.length; i++)
    {
        temp_speech = temp_speech.replace(old_general_txt[i], generals_txt[i]);
    };
    speech_bubble.snapshotItem(0).innerHTML = temp_speech;
}

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('! I\'m Lana and I\'m going to make sure you get stronger every day you train. If you want to have a greater training effect and advance faster, book a strategy session and learn from historic military masters.','gi');
var replace = ' dodji svojoj Tini da ti pojacam trening. Obozavam tvoje velike misice!!!';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}

var searchRE = new RegExp('Hi','gi');
var replace = 'Mmmmm ';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}






//Replace Lana  http://img341.imageshack.us/img341/3024/newlana.gif  
GM_addStyle('.lana_holder { background-image:url(http://img297.imageshack.us/img297/5503/tinatrain.jpg);}');

//replace_generals();