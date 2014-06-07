// ==UserScript==
// @name Ogame FR : Standard anti-pub/script
// @author Izcelion
// @description Ogame FR : Standard anti-pub/script
// @language FR
// @include http://*/game/allianzdepot.php*
// @include http://*/game/allianzen.php*
// @include http://*/game/b_building.php*
// @include http://*/game/bericht.php*
// @include http://*/game/bewerbungen.php*
// @include http://*/game/buddy.php*
// @include http://*/game/buildings.php*
// @include http://*/game/flotten1.php*
// @include http://*/game/flotten2.php*
// @include http://*/game/flottenversand.php*
// @include http://*/game/galaxy.php*
// @include http://*/game/imperium.php*
// @include http://*/game/infos.php*
// @include http://*/game/leftmenu.php*
// @include http://*/game/logout.php*
// @include http://*/game/messages.php*
// @include http://*/game/notizen.php*
// @include http://*/game/options.php*
// @include http://*/game/overview.php*
// @include http://*/game/raketenangriff.php*
// @include http://*/game/redir.php*
// @include http://*/game/renameplanet.php*
// @include http://*/game/resources.php*
// @include http://*/game/stat.php*
// @include http://*/game/suche.php*
// @include http://*/game/techtree.php*
// @include http://*/game/writemessages.php*
// ==/UserScript==

//===========================
// Get Server Name
//===========================
function GetServerName(){
	var ServerName = "";
	var sentenceIni = window.location.href;
	var sentence1 = "http://";
	var sentence2 = "/game/";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		ServerName = sentenceIni.substring(pos1+sentence1.length,pos2);
	}
	//alert(ServerName);
	return ServerName;
}

//===========================
// Get Session ID
//===========================
function GetSessionID(){
	var SessionID = "";
	var sentenceIni = window.location.href;
	var sentence1 = "session=";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		SessionID  = sentenceIni.substring(pos1+sentence1.length,pos1+sentence1.length+12);
	}
	//alert(SessionID);
	return SessionID;
}

//===========================
// Get Universe
//===========================
function GetUniverse(){
	var Universe="Error";
	var ServerName = GetServerName();
	switch(ServerName) {
		case "ogame312.de":
			Universe=1;
			break;
		case "ogame290.de":
			Universe=2;
			break;
		case "ogame199.de":
			Universe=3;
			break;
		case "ogame235.de":
			Universe=4;
			break;
		case "ogame333.de":
			Universe=5;
			break;
		case "ogame200.de":
			Universe=6;
			break;
		case "ogame316.de":
			Universe=7;
			break;
		case "ogame259.de":
			Universe=8;
		case "ogame124.de":
			Universe=9;
			break;
		case "ogame250.de":
			Universe=10;
			break;
		case "ogame251.de":
			Universe=11;
			break;
		case "ogame190.de":
			Universe=12;
			break;
		case "81.169.184.163":
			Universe=13;
			break;
		case "ogame317.de":
			Universe=14;
			break;
		case "ogame215.de":
			Universe=15;
			break;
		case "ogame170.de":
			Universe=16;
			break;
		case "ogame181.de":
			Universe=17;
			break;
		case "ogame186.de":
			Universe=18;
			break;
		case "ogame193.de":
			Universe=19;
			break;
		case "ogame221.de":
			Universe=20;
			break;
		case "ogame208.de":
			Universe=21;
			break;
		case "ogame140.de":
			Universe=22;
			break;
		case "ogame123.de":
			Universe=23;
			break;
		case "ogame286.de":
			Universe=24;
			break;
		case "ogame525.de":
			Universe=25;
			break;
		case "ogame240.de":
			Universe=26;
			break;
		case "ogame213.de":
			Universe=27;
			break;
		case "ogame447.de":
			Universe=28;
			break;
		case "ogame135.de":
			Universe=29;
			break;
		case "ogame338.de":
			Universe=30;
			break;
		case "ogame311.de":
			Universe=31;
			break;
		case "ogame216.de":
			Universe=32;
			break;
		case "ogame388.de":
			Universe=33;
			break;
		case "81.169.184.253":
			Universe=34;
			break;
		case "ogame380.de":
			Universe=35;
			break;
		case "s058.gfsrv.net":
			Universe=36;
			break;
		case "81.169.131.155":
			Universe=37;
			break;
		case "ogame391.de":
			Universe=38;
			break;
		case "ogame449.de":
			Universe=39;
			break;
		case "ogame444.de":
			Universe=40;
			break;
		case "ogame464.de":
			Universe=41;
			break;
		case "ogame474.de":
			Universe=42;
			break;
		case "ogame496.de":
			Universe=43;
			break;
		case "ogame501.de":
			Universe=44;
			break;
		case "ogame544.de":
			Universe=45;
			break;
		case "ogame396.de":
			Universe=46;
			break;
		default:
			Universe="Error";
			break;
	};
	//alert(Universe);
	return Universe;
}


(function(){

//=================================
// Check if it's a French Universe
//=================================
if (isFinite(GetUniverse())){

	//==================================
	// Remove protection <meta-refresh>
	//==================================
	var headnote = document.getElementsByTagName('head');
	var i = 0;
	while (i<headnote.length) {
		var sentenceIni = headnote[i].innerHTML;
		var sentence1 = "<meta http-equiv=\"refresh\""
		var pos1 = sentenceIni.indexOf(sentence1,0);
		if (pos1 >= 0 ){
			var sentence2 = "\">\n";
			var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
			var sentence3 = sentenceIni.substring(pos1,pos2+sentence2.length);
			headnote[i].innerHTML = sentenceIni.replace(sentence3,"");
			headnote = document.getElementsByTagName('head');
			//alert("meta-refresh");
		} else i++;
	}
	
	//============================================
	// Remove pub <script>, <noscript>, <a href=>,
	// <img>, <div>, <iframe>
	//============================================
	
	var tabTag=new Array();
	tabTag[0]="script";
	tabTag[1]="noscript";
	tabTag[2]="a";
	tabTag[3]="img";
	tabTag[4]="div";
	tabTag[5]="iframe";
	
	var TabSrc=new Array();
	TabSrc[0] = new RegExp("ads.gameforgeads.de","g");
	TabSrc[1] = new RegExp("googlesyndication","g");
	TabSrc[2] = new RegExp("media.fastclick.net","g");
	TabSrc[3] = new RegExp("oz.valueclick.com","g");
	TabSrc[4] = new RegExp("show_ads.js","g");
	TabSrc[5] = new RegExp("get.js","g");
	TabSrc[6] = new RegExp("www.girlsgotech.org","g");
	TabSrc[7] = new RegExp("google","g");
	TabSrc[8] = new RegExp("beacon_","g");
	TabSrc[9] = new RegExp("adframe.htm","g");
	TabSrc[10] = new RegExp("cdn.fastclick.net","g");
	TabSrc[11] = new RegExp("adframe.php","g");
	TabSrc[12] = new RegExp("google_ads_frame");
	
	var tabText=new Array();
	tabText[0] = new RegExp("Click here to visit our sponsor","g");
	tabText[1] = new RegExp("link_to_gamepay()","g");
	tabText[2] = new RegExp("parent.frames.length","g");
	tabText[3] = new RegExp("ValueBannerType","g");
	tabText[4] = new RegExp("ValueShowAd()","g");
	tabText[5] = new RegExp("google","g");
	tabText[6] = new RegExp("googlesyndication","g");
	tabText[7] = new RegExp("ads.gameforgeads.de","g");
	tabText[8] = new RegExp("media.fastclick.net","g");
	tabText[9] = new RegExp("google_ads_frame");
	
	for(var t=0;t<tabTag.length;t++){
		var TagNode = document.getElementsByTagName(tabTag[t]);
		var i = 0;
		var status = true;
		while (i<TagNode.length) {
			var TagNodesentence = TagNode[i].innerHTML;
			var k = 0;
			while (k < TabSrc.length && status && (t==0 || t==1 || t==3 || t==5)){
				if (TabSrc[k].test(TagNode[i].getAttribute("src"))) {
					TagNode[i].parentNode.removeChild(TagNode[i]);
					status = false;
				}
				k++;
			}
			var k = 0;
			while (k < tabText.length && status){
				if (tabText[k].test(TagNodesentence)) {
					TagNode[i].parentNode.removeChild(TagNode[i]);
					status = false;
				}
				k++;
			}
			var k = 0;
			while (k < TabSrc.length && status && t==2){
				if (TabSrc[k].test(TagNode[i].getAttribute("href"))) {
					TagNode[i].parentNode.removeChild(TagNode[i]);
					status = false;
				}
				k++;
			}
			var k = 0;
			while (k < TabSrc.length && status && t==4){
				if (TabSrc[k].test(TagNode[i].getAttribute("id"))) {
					TagNode[i].parentNode.removeChild(TagNode[i]);
					status = false;
				}
				k++;
			}
			if (status) {
				i++;
				if(t==5) {
					//alert("Src="+(TagNode[i].getAttribute("src"))+"\nName="+(TagNode[i].getAttribute("name"))+"\nId="+(TagNode[i].getAttribute("id"))+"\nLength="+(TagNode.length)+"\n<IFRAME>"+(TagNode[i].innerHTML)+"</IFRAME>");
				}
			}
			else {
				status = true;
				TagNode = document.getElementsByTagName(tabTag[t]);
			}
		}
	}
	
	//==================================
	// Remove pub <table> commandant
	//==================================
	var tablenode = document.getElementsByTagName('table');
	var i = 0;
	while (i<tablenode.length) {
		var tablenodesentence = tablenode[i].innerHTML;
		var expgamepay = new RegExp("https://www.gamepay.de/","g");
		var expcommandant = new RegExp("Devenez Commandant OGame","g");
		var expcommander = new RegExp("Commandez ici","g");
		var trnode = tablenode[i].getElementsByTagName('tr');
		var condition1 = (trnode.length==1);
		var condition2 = expgamepay.test(tablenodesentence)
		var condition3 = expcommandant.test(tablenodesentence)
		var condition4 = expcommander.test(tablenodesentence)
		
		//alert(condition1+"\n"+condition2+"\n"+condition3+"\n"+condition4);
	
		if (condition1==1 && condition2 && condition3 && condition4) {
			tablenode[i].parentNode.removeChild(tablenode[i]);
			tablenode = document.getElementsByTagName('table');
		} else i++;
	}
	
	var bodynode = document.getElementsByTagName('body');
	var bodysentence = bodynode[0].innerHTML;
	var sentence1 = "<!-- _________________ComBox___________________ -->";
	var sentence2 = "<!-- _________________ComBox Ende _____________ -->";
	var pos1 = bodysentence.indexOf(sentence1,0);
	if (pos1>0) {
		var pos2 = bodysentence.indexOf(sentence2,pos1+sentence1.length);
		var sentence3 = bodysentence.substring(pos1,pos2+sentence2.length);
		var regCombox = new RegExp(sentence3,"g");
		bodynode[0].innerHTML = bodysentence.replace(sentence3,"");
	}
	
	//==================================
	// Remove empty <TR></TR>
	//==================================
	var trnode = document.getElementsByTagName('tr');
	var i = 0;
	var status = true;
	while (i<trnode.length) {
		var trnodesentence = trnode[i].innerHTML;
		var expthcolspan = new RegExp("<th colspan=\"4\">","g");
		var expvcactive = new RegExp("<!-- vc active -->","g");
		var expbrcenter = new RegExp("<br><center></center><br>","g");
		var expshowads = new RegExp("show_ads.js","g");
		if (expthcolspan.test(trnodesentence) && expvcactive.test(trnodesentence)) {
			trnode[i].parentNode.removeChild(trnode[i]);
			status = false;
		} else if (expthcolspan.test(trnodesentence) && expbrcenter.test(trnodesentence)) {
			trnode[i].parentNode.removeChild(trnode[i]);
			status = false;
		}
		if (status) i++;
		else {
			status = true;
			trnode = document.getElementsByTagName('tr');
		}
	}
	
	//alert("Standard anti pub/script");

}

})();