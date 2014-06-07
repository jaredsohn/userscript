// Myibay Auction bid sniper for eBay
//
// This script adds a "Snipe it" link to every item page.
// If you are logged in to myibay.com within the same browser's session, it will also show your current snipe and your assigned group if any.
//
// ==UserScript==
// @name	Myibay Auction bid sniper for eBay
// @namespace	myibay
// @description	This script places a "Snipe it" link on every item's listing on eBay
// @include	http://*.ebay.tld/*
// @version	1.2.6
// @copyright   2007+, Myibidder Sniper (http://www.myibidder.com/)
// @homepage    http://www.myibidder.com/
// ==/UserScript==

var loc=location;
var locpath=location.href;
var mydoc=document;
var ebayid="";

function search_tag(tagname,key,value,count,keyfilter,valfilter) {
	var linkid=null;
	var myRe=new RegExp(valfilter);
	var links=mydoc.getElementsByTagName(tagname);
	for (var ii=0;ii<links.length;ii++){
		if (links[ii].getAttribute(key)){
			if (links[ii].getAttribute(key).search(value)==0){
				linkid=links[ii];
				if (keyfilter==null || valfilter==null) {
					count-=1;
					continue;
				}
				if (myRe.exec(linkid.getAttribute(keyfilter))){
					count-=1;
				}else{
					linkid=null;
				}
			}
		}
		if(count<=0){break;}
	}
	return linkid;
}
function make_field(fieldname) {
	var mytd=mydoc.createElement("td");
	var myspan=mydoc.createElement("span");
	myspan.setAttribute("class","titlePurchase");
	mytd.setAttribute("class","vi-is1-lblp vi-is1-solidBg");
	var mytext=mydoc.createTextNode(fieldname);
	myspan.appendChild(mytext);
	mytd.appendChild(make_image());
	mytd.appendChild(myspan);
	return mytd;
}
function make_value(valuename) {
	var mytd=mydoc.createElement("td");
	var myspan=mydoc.createElement("span");
	myspan.setAttribute("class","sectiontitle");
	mytd.setAttribute("class","vi-is1-solid vi-is1-prcs");
	mytd.setAttribute("colspan","3");
	var mytext=mydoc.createTextNode(valuename);
	myspan.appendChild(mytext);
	mytd.appendChild(myspan);
	return mytd;
}
function make_image() {
	var myimg=mydoc.createElement("img");
	myimg.setAttribute("src", "data:image/gif,GIF89a%10%00%10%00%D5%3F%00%F7%C96%8Dq.pO%22%F9%C6%2A%CC%965OID3%25%10XI2%F6%DACN%3B%2B%7Ds%60%E9%C39%0A%09%05gI%1FX%3C%1A%BA%A4.%F5%C02%FA%DD%3C%CB%A4%2A%F7%BB%2B%CC%B33%8CO%12%EE%B5%29%F2%CF%3Ak%5BD%F6%A61%E9%D1%3Fu%5B%1Bvc%1FB%2B%14%A7%8E%2A%DC%AD6G6%13%F6%D73%99%98%98lT%1B%D6%BA8%25%1B%0B%F8%D6%3F%EE%B8/%3E%3B5%A6%8CS%80%80%80%F8%D47%9Cb%17%CD%AB2Q%2C%14%D7%9E%2A%F5%D5.%E3%A40%F5%AF.%E3%C1.%C9%A0%1F%86zc%98%84%1F%E2%9B-%B1%88%1C%EE%CA%40%E4%C4Q%B1s%2B%F4%D8%3D%90%8B%84%CB%CB%CB%FF%FF%FF%21%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%D6%C0%9F%D0%D7K%11b7B%AA%E7%13%3AE%18%02%E4%24%CB%C8%20%84%83%E8%E9p%08N%83%89lr%124%B4%3F%1F%AA%DB%08%0C%C2%83%91c%248%F8T%8C%7C%89A%03%0Cpz%1D%0D%2A%28y%86%1C%17%17%1By%06%06%0D%05%06%02%1Dz%0F%25%06%14%25%96%25%0E%1D%1C%1F/%0F%0F%14%1C%0C%1D%01%14-%12/%12%23%1B%7E%2B%11%08%24%20%20%24%11%11%21%10%10%1B%0D%27%16%26%21%116%01%01%1E%11%3C0%00%00%0E%05%16%003%26%14%06%0C%25%20%1A%3C%08%00%1F%05%2A%15%0B%26%0B%20%1D%06%9C%01%089%0B%15%2A%3E%09%2C%1E%1C%5D%20%9C%0D-%3A%3B%09M%22%1D%15%09%0D%0D%02f%88%05p%B1E%88%88%04%D4%0A%28%A8%81%A1P%82%82N%EE%14%40Q%60%22%B7%26B%82%00%00%3B");
	myimg.border="0";
	myimg.setAttribute("width","16");
	myimg.setAttribute("height","16");
	myimg.setAttribute("alt","Sniper");
	return myimg;
}
function put_snipeit_link() {
	if (locpath.search(".ebay.")>-1) {
		var ebaylink=null;
		var intr=false;
		if (loc.search(".ebay.")>-1) {
			ebaylink=search_tag("span","class","watchlinkSpan",1,null,null);
			if (!ebaylink) {
				ebaylink=search_tag("div","class","vi-pla",1,null,null);
				if (ebaylink) {
					ebaylink=ebaylink.firstChild;
				}
			}
			if (ebaylink) {
				var myimg=make_image();
				myimg.setAttribute("alt","Snipe it");
				var myhref="https://www.myibidder.com/login?a=miniadd&amp;href="+escape(loc);
				var myhref2="window.open('"+myhref+"','bid','width=560,height=330,resizable=1,scrollbars=1,menubar=0,toolbar=0,location=1,status=1');return true;";
				var mytext=mydoc.createTextNode("Snipe it");
				var mylink=mydoc.createElement("a");
				mylink.href="#";
				mylink.setAttribute("onclick",myhref2);
				mylink.setAttribute("style","-moz-user-focus: normal; cursor: pointer;");
				mylink.title="Snipe it with Myibidder.com";
				mylink.appendChild(mytext);
				mylink.appendChild(myimg);
				//if (intr) {
				//	ebaylink.appendChild(mylink);
				//} else {
					ebaylink.parentNode.insertBefore(mylink,ebaylink);
				//}
				//ebaylink.parentNode.insertBefore(mydoc.createTextNode(" | "),ebaylink);
			}
		}
	}
}
function put_currentsnipe_field() {
	function parsexml(xml) {
		var out=new Object();
		out.ebayid="";
		out.currentbid="";
		out.schedule="";
		out.currency="";
		out.mybid="";
		out.myqnty="";
		out.mytime="";
		out.groupid="";
		out.groupname="";
		out.error="-1";
		if (xml) {
			var xmldoc=xml.getElementsByTagName("item");
			if (xmldoc && xmldoc.length>0) {
				out.ebayid=xmlget(xmldoc[0],"ebayid",out.msg);
				out.currentbid=xmlget(xmldoc[0],"currentbid",out.rating);
				out.schedule=xmlget(xmldoc[0],"schedule",out.msgid);
				out.currency=xmlget(xmldoc[0],"currency",out.msgid);
				out.mybid=xmlget(xmldoc[0],"mybid",out.error);
				out.mytime=xmlget(xmldoc[0],"mytime",out.score);
				out.myqnty=xmlget(xmldoc[0],"myqnty",out.score);
				out.groupid=xmlget(xmldoc[0],"groupid",out.score);
				out.groupname=xmlget(xmldoc[0],"group",out.score);
				out.error="0";
			}
		}
		return out;
	}
	function xmlget(xmldoc,xmlname,xmldefault) {
		var out=xmldoc.getAttribute(xmlname);
		return out;
	}
	function updateData(httpsend) {
		if (httpsend.readyState==4 && httpsend.status==200) {
			if (!httpsend.responseXML) {
				httpsend.responseXML = new DOMParser().parseFromString(httpsend.responseText, "text/xml");
			}
			var iteminfo=parsexml(httpsend.responseXML);
			var currentsnipe="";
			if (iteminfo.error=="0" && iteminfo.schedule=="1"){currentsnipe=iteminfo.currency+""+iteminfo.mybid;}
			var mytext2_currentsnipe=mydoc.createTextNode(currentsnipe);
			myspan_currentsnipe.replaceChild(mytext2_currentsnipe,mytext_currentsnipe);
			var mytext2_currentgroup=mydoc.createTextNode(iteminfo.groupname);
			myspan_currentgroup.replaceChild(mytext2_currentgroup,mytext_currentgroup);
			if (iteminfo.error=="0") {
				ebtr.parentNode.insertBefore(mytr_currentgroup,ebtr.nextSibling);
				ebtr.parentNode.insertBefore(mytr_currentsnipe,mytr_currentgroup);
			}
		}
	}
	function sendHttpRequest(myurl) {
		GM_xmlhttpRequest({
		  method:"GET",
		  url:myurl,
		  onload:updateData
		});
	}
	if (locpath.search(".ebay.")>-1) {
		var ebaylink=null;
		var ebtr=null;
		ebaylink=search_tag("hr","class","hrwhite",2,null,null);
		if (ebaylink) {
			ebtr=ebaylink.parentNode.parentNode;
		}
		if (ebtr==null){
			ebaylink=search_tag("span","id","watchLinkButton",1,null,null);
			if (ebaylink){
				ebtr=ebaylink.parentNode.parentNode;
			}
		}
		if (ebtr==null){
			ebaylink=search_tag("tr","id","watchItemMiddleRow1",1,null,null);
			if (ebaylink){
				ebtr=ebaylink;
			}
		}
		if (ebtr==null){
			ebaylink=search_tag("tr","id","watchItemMiddleRow",1,null,null);
			if (ebaylink){
				ebtr=ebaylink;
			}
		}
		if (ebtr==null){
			ebaylink=search_tag("td","class","vi-is1-solid",3,null,null);
			if (ebaylink){
				ebtr=ebaylink.parentNode;
			}
		}
		if (ebtr && ebayid){
			var ebhr=ebtr.cloneNode(ebtr);
			// group
			var mytr_currentgroup=mydoc.createElement("tr");
			var mytd1_currentgroup=make_field(" Current Group:");
			var mytd2_currentgroup=make_value("...");
			var myspan_currentgroup=mytd2_currentgroup.childNodes[0];
			var mytext_currentgroup=myspan_currentgroup.childNodes[0];
			mytr_currentgroup.appendChild(mytd1_currentgroup);
			mytr_currentgroup.appendChild(mytd2_currentgroup);
			// snipe
			var mytr_currentsnipe=mydoc.createElement("tr");
			var mytd1=make_field(" Current Snipe:");
			mytd1.setAttribute("style","border-top: 1px solid rgb(204, 204, 204);");
			var mytd2=make_value("Fetching...");
			mytd2.setAttribute("style","border-top: 1px solid rgb(204, 204, 204);");
			var myspan_currentsnipe=mytd2.childNodes[0];
			var mytext_currentsnipe=myspan_currentsnipe.childNodes[0];
			mytr_currentsnipe.appendChild(mytd1);
			mytr_currentsnipe.appendChild(mytd2);
			sendHttpRequest('https://www.myibay.com/main/details/&ebayid='+ebayid+'&sk=x');
		}
	}
}
function put_search_button() {
	if (locpath.search(".ebay.")>-1) {
		var ebaycmp=search_tag("td","class","bstab-iRgt",3,null,null);
		if (ebaycmp) {
			// backward compatible with old styles
			var myhref="https://www.myibidder.com/login?a=miniadds&amp;href="+escape(loc);
			var myhref2="window.open('"+myhref+"','bid','width=580,height=550,resizable=1,scrollbars=1,menubar=0,toolbar=0,location=1,status=1');return true;";
			var myimg=make_image();
			myimg.setAttribute("alt","Snipe these");
			myimg.setAttribute("style","position: absolute;");
			var mytd=mydoc.createElement("td");
			mytd.setAttribute("class","bstab-iRgt");
			var mylink=mydoc.createElement("a");
			mylink.href="#";
			mylink.setAttribute("onclick",myhref2);
			mylink.setAttribute("class","bstab-padd");
			mylink.title="Snipe these with Myibidder.com";
			mylink.appendChild(myimg);
			mytext=mydoc.createElement("span");
			mytext.setAttribute("style","padding-left: 20px;");
			mytext.appendChild(mydoc.createTextNode("Snipe these"));
			mylink.appendChild(mytext);
			mytd.appendChild(mylink);
			var mytdspace=mydoc.createElement("td");
			mytdspace.setAttribute("class","bstab-dummy");
			mytdspace.appendChild(mydoc.createTextNode(" "));
			ebaycmp.parentNode.appendChild(mytdspace);
			var mytdleft=mydoc.createElement("td");
			mytdleft.setAttribute("class","bstab-iLft");
			ebaycmp.parentNode.appendChild(mytdleft);
			ebaycmp.parentNode.appendChild(mytd);
		} else {
			if (!ebaycmp) {
				ebaycmp=search_tag("ul","class","tabs-ul",1,null,null);
			}
			if (!ebaycmp) {
				ebaycmp=search_tag("ul","class","navtabs",1,null,null);
			}
			if (ebaycmp) {
				// new style
				var myhref="https://www.myibidder.com/login?a=miniadds&amp;href="+escape(loc);
				var myhref2="window.open('"+myhref+"','bid','width=580,height=550,resizable=1,scrollbars=1,menubar=0,toolbar=0,location=1,status=1');return true;";
				var mytext=mydoc.createElement("span");
				mytext.setAttribute("class","title");
				mytext.setAttribute("style","padding-right: 4px;");
				mytext.appendChild(mydoc.createTextNode("Snipe these"));
				var myimg=make_image();
				myimg.setAttribute("alt","Snipe these");
				myimg.setAttribute("style","position: absolute;");
				var myh2=mydoc.createElement("h2");
				myh2.appendChild(mytext);
				myh2.appendChild(myimg);
				var mydiv=mydoc.createElement("div");
				mydiv.setAttribute("class","tab-h");
				mydiv.appendChild(myh2);
				mydiv.setAttribute("style","padding-right: 24px;");
				var mylink=mydoc.createElement("a");
				mylink.setAttribute("class","tab-a");
				mylink.href="#";
				mylink.setAttribute("onclick",myhref2);
				mylink.title="Snipe these with Myibidder.com";
				mylink.appendChild(mydiv);
				var myli=mydoc.createElement("li");
				myli.setAttribute("class","tabs-t");
				myli.appendChild(mylink);
				var lasttab=ebaycmp.firstChild;
				if (lasttab) {
					var count=6;
					while(count>0) {
						lasttab=lasttab.nextSibling;
						if (lasttab.nodeName=="LI" && lasttab.getAttribute("class").search("tabs-c")==0) {
							break;
						}
						count--;
					}
					lasttab.parentNode.insertBefore(myli,lasttab);
				}
			}
		}
		if (!ebaycmp) {
			ebaycmp=search_tag("div","class","tb-tn",1,null,null);
			if (!ebaycmp) {
				ebaycmp=search_tag("div","class","sft",1,null,null);
			}
			if (ebaycmp) {
				var myhref="https://www.myibidder.com/login?a=miniadds&amp;href="+escape(loc);
				var myhref2="window.open('"+myhref+"','bid','width=580,height=550,resizable=1,scrollbars=1,menubar=0,toolbar=0,location=1,status=1');return true;";
				var mytext=mydoc.createElement("span");
				mytext.setAttribute("style","padding-right: 4px;");
				mytext.appendChild(mydoc.createTextNode("Snipe these"));
				var myimg=make_image();
				myimg.setAttribute("alt","Snipe these");
				myimg.setAttribute("style","position: absolute;");
				var mylink=mydoc.createElement("a");
				mylink.href="#";
				mylink.setAttribute("onclick",myhref2);
				mylink.setAttribute("class","g-nav");
				mylink.title="Snipe these with Myibidder.com";
				mylink.appendChild(mytext);
				mylink.appendChild(myimg);
				if (ebaycmp.nodeName=="DIV") {
					var mydiv=mydoc.createElement("div");
					mydiv.setAttribute("class","t");
					mydiv.setAttribute("style","padding-right: 24px;");
					mydiv.appendChild(mylink);
					mylink=mydiv;
				}
				var lasttab=ebaycmp.firstChild;
				if (lasttab) {
					var count=6;
					while(count>0) {
						var newtab=lasttab.nextSibling;
						if (newtab) { lasttab=newtab; } else { break; }
						if (lasttab.nodeName=="A" && lasttab.getAttribute("class").search("tb-cva")==0) {
							break;
						}
						if (lasttab.nodeName=="DIV" && lasttab.getAttribute("class").search("lnks")==0) {
							break;
						}
						count--;
					}
					lasttab.parentNode.insertBefore(mylink,lasttab);
				}
			}
		}
	}
}

var filters=new Array("-\/(\\d\\d\\d\\d\\d\\d\\d\\d\\d+)\\?","item=(\\d\\d\\d\\d\\d\\d\\d\\d\\d+)","itemZ(\\d\\d\\d\\d\\d\\d\\d\\d\\d+)");
for (var ii=0; ii<filters.length; ii++){
	var myRe=new RegExp(filters[ii]);
	var myRefind=myRe.exec(loc);
	if (myRefind){
		ebayid=myRefind[1];
		break;
	}
}
if (!ebayid){
	var linkid=search_tag("input","name","item",1,"value",/\d\d\d\d\d\d\d\d+/);
	if (linkid){ebayid=linkid.getAttribute("value");}
}

put_snipeit_link();
put_currentsnipe_field();
put_search_button();
