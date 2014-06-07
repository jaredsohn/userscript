// ==UserScript==
// @id             Pixiv New Check
// @name           Pixiv New Check
// @version        1.0
// @namespace      http://www.pixiv.net
// @author         Tast
// @description    
// @include        http://www.pixiv.net/member_illust.php?id=*
// ==/UserScript==
// @run-at         document-start

var url = document.location.href;
var Auto = 0;

if(!url.match('page') && !url.match('&p')){
	//alert(url);
	var PixivMemberIllustID = getQueryString("id",url);
	var PixivMemberIllustIDold	= GM_getValue(PixivMemberIllustID,false);
	var filterOff = document.getElementById('filterOff').src;
	
	if(filterOff.match('/?')) filterOff = filterOff.split('?')[0];
	
	if(PixivMemberIllustIDold){
		//alert(PixivMemberIllustIDold + "\n" + filterOff);
		
		if(PixivMemberIllustIDold == filterOff){
			if(Auto) Window_Close();
			else document.getElementById('filterOff').style.border = "4px solid blue";
			//alert('Close');
		}
		else {
			//GM_setValue(PixivMemberIllustID, filterOff);
			Save(PixivMemberIllustID,filterOff,PixivMemberIllustIDold);
			//alert("Force Save Value");
		}
	}
	else {
		//GM_setValue(PixivMemberIllustID, filterOff);
		Save(PixivMemberIllustID,filterOff,PixivMemberIllustIDold);
		//alert("Save Value");
	}
}

function Save(PixivMemberIllustID,filterOff,PixivMemberIllustIDold){
	GM_setValue(PixivMemberIllustID, filterOff);
	Images_Checking(PixivMemberIllustIDold);
	
	var filterOff = document.getElementById('filterOff');
	//alert(filterOff.parentNode.innerHTML);
	//alert(filterOff.parentNode.innerHTML);
	
	document.getElementById('filterOff').style.border = "3px solid red";
}

function Images_Checking(filterOff){
	var Txt = "";
	for (var i = 0; i < document.images.length; i++) {
		var img = document.images[i];
        if (img.id == "filterOff" && img.src == filterOff){
			//Txt = Txt + "\n" + img.src;
			img.style.border = "4px solid blue";
			//alert(img.style.border);
			break;
        }
    }
	//alert(Txt);
}
  
/*
Single
http://img01.pixiv.net/img/tokihama/25420684_s.png
http://img01.pixiv.net/img/tokihama/25420684.png

multi
http://img01.pixiv.net/img/tokihama/25445262_s.jpg
http://img01.pixiv.net/img/tokihama/25445262_big_p0.jpg
http://img01.pixiv.net/img/tokihama/25445262_big_p1.jpg
*/

function CID(){
	var PixivMemberIllustID = getQueryString("id",url);
	var PixivMemberIllustIDold = GM_getValue(PixivMemberIllustID,false);
	alert(PixivMemberIllustIDold);
}

GM_registerMenuCommand("Current ID", CID);
	
function getQueryString( paramName,paramURL){
	paramName = paramName .replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]").toLowerCase();
	//alert(paramName);
	var reg = "[\\?&]"+paramName +"=([^&#]*)";
	var regex = new RegExp( reg );
	var regResults = regex.exec( paramURL.toLowerCase());
	if( regResults == null ) {
		   //alert(regResults);
		   return "";
	} else {
		   //alert(regResults[1]);
		   return regResults [1];
	}
}

function Window_Close(){
	window.opener=self;
    window.close();
    top.window.close();
    window.open('','_parent','');
    window.close();
    //window.focus(); 
    //window.close();
}