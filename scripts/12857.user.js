// ==UserScript==
// @name           dstv.com xmltv parser
// @namespace      none
// @description    dstv.com xmltv parser
// @include        http://www.dstv.com/DStv_Guide/default.aspx?Channel=*
// version 0.0.3 alpha!!
// ==/UserScript==

String.prototype.trim = function() {
	a = this.replace(/^\s+/, '');
	return a.replace(/\s+$/, '');
};

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpatho(query,context) {
    return document.evaluate(query, context, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getQueryStringParameter(param, queryString)
{
	var parameters = new Array();
	parameters = queryString.substring(1).split("&");
	
	for (var index = 0; index < parameters.length; index++)
	{
		var parameter = parameters[index];
		
		if (parameter.split("=")[0] == param)
			return parameter.split("=")[1];
	}
}

function Parse3LetterMonthToNum(strMonth)
{
	switch(strMonth)
	{
		case("Jan") : return "01";break;
		case("Feb") : return "02";break;
		case("Mar") : return "03";break;
		case("Apr") : return "04";break;
		case("May") : return "05";break;
		case("Jun") : return "06";break;
		case("Jul") : return "07";break;
		case("Aug") : return "08";break;
		case("Sep") : return "09";break;
		case("Oct") : return "10";break;
		case("Nov") : return "11";break;
		case("Dec") : return "12";break;
	}
}

function HandleDateString(DateString)
{
	//ignore today/tomorrow/DoW
	DateString = DateString.substring(DateString.indexOf(" ")+1);
	//get Day of month
	var DayOfMonth = DateString.substring(0,DateString.indexOf(" "));
	DateString = DateString.substring(DateString.indexOf(" ")+1); //cleanup
	//get Month Of Year
	var MonthOfYear = Parse3LetterMonthToNum(DateString);
	return MonthOfYear+DayOfMonth;
}

function getGetQueryStringValue(param)
{
	return getQueryStringParameter(param,window.location.search);
}

function ChannelIDNewChannelLookup(strChannelNum)
{
	switch(strChannelNum)
	{
		case("169")	: return "3 SAT";break;
		case("92")	: return "106";break;
		case("136") : return "107";break;
		case("187") : return "285";break;
		case("94")	: return "264";break;
		case("166") : return "ARD";break;
		case("140") : return "B4U";break;
		case("95")	: return "180";break;
		case("96")	: return "120";break;
		case("118") : return "280";break;
		case("130") : return "291";break;
		case("171") : return "302";break;
		case("110") : return "BVN";break;
		case("97")	: return "301";break;
		case("98")	: return "CCTV 4";break;
		case("22")	: return "320";break;
		case("99")	: return "290";break;
		case("100") : return "281";break;
		case("184") : return "255";break;
		case("89")	: return "Deutchse Welle";break;
		case("101") : return "250";break;
		case("181") : return "303";break;
		case("30")	: return "149";break;
		case("103") : return "ERT";break;
		case("133") : return "230";break;
		case("28")	: return "134";break;
		case("183") : return "283";break;
		case("104") : return "189";break;
		case("177") : return "FIN24";break;
		case("107") : return "110";break;
		case("108") : return "155";break;
		case("129") : return "254";break;
		case("24")	: return "346";break;
		case("105") : return "300";break;
		case("141") : return "KTV";break;
		case("111") : return "105";break;
		case("180") : return "Magic Plus";break;
		case("113") : return "319";break;
		case("175") : return "324";break;
		case("35")	: return "102";break;
		case("106") : return "101";break; //mnet
		case("163") : return "101";break; //mnet
		case("115") : return "150";break;
		case("114") : return "152";break;
		case("88")	: return "104";break;
		case("132") : return "321";break;
		case("172") : return "322";break;
		case("138") : return "260";break;
		case("116") : return "135";break;
		case("144") : return "NDTV247";break;
		case("36")	: return "299";break;
		case("112") : return "289";break;
		case("168") : return "PRO 7";break;
		case("119") : return "RAI International";break;
		case("127") : return "343";break;
		case("164") : return "RTL";break;
		case("146") : return "RTPi";break;
		case("87")	: return "RTPi";break;
		case("23")	: return "131";break;
		case("25")	: return "132";break;
		case("26")	: return "133";break;
		case("90")	: return "286";break;
		case("165") : return "SAT 1";break;
		case("147") : return "SIC";break;
		case("38")	: return "SKY";break;
		case("121") : return "282";break;
		case("142") : return "450";break;
		case("93")	: return "292";break;
		case("143") : return "Sun TV";break;
		case("122") : return "201";break;
		case("123") : return "202";break;
		case("124") : return "203";break;
		case("135") : return "204";break;
		case("86")	: return "206";break;
		case("189") : return "247";break;
		case("137") : return "Super Sport Zone";break;
		case("102") : return "205";break;
		case("39")	: return "207";break;
		case("91")	: return "TBN";break;
		case("125") : return "159";break;
		case("126") : return "232";break;
		case("173") : return "182";break;
		case("109") : return "71";break;
		case("149") : return "TV Globo";break;
		case("27")	: return "TV5";break;
		case("117") : return "323";break;
		case("131") : return "298";break;
		case("156") : return "ZDF";break;
		case("145") : return "Zee";break;
		case("120") : return "148";break;
	}
}

function ChannelIDNameLookup(strChannelNum)
{
	switch(strChannelNum)
	{
		case("169")	: return "3 SAT";break;
		case("92")	: return "actionX";break;
		case("136") : return "AfricaMagic";break;
		case("187") : return "Al Jazeera";break;
		case("94")	: return "Animal Planet";break;
		case("166") : return "ARD";break;
		case("140") : return "B4U";break;
		case("95")	: return "BBC Food";break;
		case("96")	: return "BBC Prime";break;
		case("118") : return "BBC World";break;
		case("130") : return "Bloomberg";break;
		case("171") : return "Boomerang";break;
		case("110") : return "BVN";break;
		case("97")	: return "Cartoon Network";break;
		case("98")	: return "CCTV 4";break;
		case("22")	: return "Channel O";break;
		case("99")	: return "CNBC Africa";break;
		case("100") : return "CNN";break;
		case("184") : return "Crime & Investigation";break;
		case("89")	: return "Deutchse Welle";break;
		case("101") : return "Discovery Channel";break;
		case("181") : return "Disney Channel";break;
		case("30")	: return "E! Entertainment";break;
		case("103") : return "ERT";break;
		case("133") : return "ESPN";break;
		case("28")	: return "e-TV";break;
		case("183") : return "Euro News";break;
		case("104") : return "Fashion TV";break;
		case("177") : return "FIN24";break;
		case("107") : return "GO";break;
		case("108") : return "Hallmark";break;
		case("129") : return "History Channel";break;
		case("24")	: return "IQRAA";break;
		case("105") : return "K-All Day";break;
		case("141") : return "KTV";break;
		case("111") : return "kykNET";break;
		case("180") : return "Magic Plus";break;
		case("113") : return "Mindset Learn";break;
		case("175") : return "MK89";break;
		case("35")	: return "MNA";break;
		case("106") : return "M-Net";break;
		case("163") : return "M-Net";break;
		case("115") : return "M-Net Movies 1";break;
		case("114") : return "M-Net Movies 2";break;
		case("88")	: return "M-Net Series";break;
		case("132") : return "MTV";break;
		case("172") : return "MTV Base";break;
		case("138") : return "National Geographic";break;
		case("116") : return "NBC";break;
		case("144") : return "NDTV247";break;
		case("36")	: return "News24";break;
		case("112") : return "Parliamentary";break;
		case("168") : return "PRO 7";break;
		case("119") : return "RAI International";break;
		case("127") : return "Rhema TV";break;
		case("164") : return "RTL";break;
		case("146") : return "RTPi";break;
		case("87")	: return "RTPi";break;
		case("23")	: return "SABC 1";break;
		case("25")	: return "SABC 2";break;
		case("26")	: return "SABC 3";break;
		case("90")	: return "SABC Africa";break;
		case("165") : return "SAT 1";break;
		case("147") : return "SIC";break;
		case("38")	: return "SKY";break;
		case("121") : return "Sky News";break;
		case("142") : return "Sony";break;
		case("93")	: return "Summit TV";break;
		case("143") : return "Sun TV";break;
		case("122") : return "Super Sport 1";break;
		case("123") : return "Super Sport 2";break;
		case("124") : return "Super Sport 3 (Soccer)";break;
		case("135") : return "Super Sport 4 (Update)";break;
		case("86")	: return "Super Sport 6";break;
		case("189") : return "Super Sport action";break;
		case("137") : return "Super Sport Zone";break;
		case("102") : return "SuperSport 5 (Highlights)";break;
		case("39")	: return "SuperSport 7";break;
		case("91")	: return "TBN";break;
		case("125") : return "TCM";break;
		case("126") : return "TellyTrack";break;
		case("173") : return "The Home Channel";break;
		case("109") : return "Travel Channel";break;
		case("149") : return "TV Globo";break;
		case("27")	: return "TV5";break;
		case("117") : return "VH-1";break;
		case("131") : return "Weather channel";break;
		case("156") : return "ZDF";break;
		case("145") : return "Zee";break;
		case("120") : return "Zone Reality";break;
	}
}

function replaceAll(strXML,substr,replacewith)
{
	while (strXML.indexOf(substr) != -1)
	{
		strXML = strXML.replace(substr,replacewith);
	}
	return strXML;
}
function plaintextQuote(strXML)
{
	//strXML = replaceAll(strXML,"&","&amp;");
	strXML = replaceAll(strXML,"<","&lt;");
	strXML = replaceAll(strXML,">","&gt;");
	strXML = replaceAll(strXML,"\"","&quot;");
	return strXML;
}

function GetTitle(strDSTVData)
{
	var ret = strDSTVData.substring(0,strDSTVData.indexOf("Rating"));
	ret = ret.trim();
	ret = replaceAll(ret,"&","and");
	return ret;
}

function GetTitle(strDSTVData)
{
	var ret = strDSTVData.substring(0,strDSTVData.indexOf("Rating"));
	ret = ret.trim();
	ret = replaceAll(ret,"&","and");
	return ret;
}

function GetDescription(strDSTVData)
{
	var ret = strDSTVData;
	ret = ret.trim();
	ret = replaceAll(ret,"&","and");
	return ret;
}


var strXML = "";
//XML Data
strXML += "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n";
//Generator Data
strXML += "<tv generator-info-name=\"dstv listings generator by za_bullet\">\n";
//Channel Data
strXML += "<channel id=\"" + ChannelIDNewChannelLookup(getGetQueryStringValue("Channel")) + ".dstv.com\">\n";
strXML += "\t<display-name lang=\"en\">" + ChannelIDNameLookup(getGetQueryStringValue("Channel")) + "</display-name>\n";
strXML += "\t<display-name lang=\"en\">" + ChannelIDNewChannelLookup(getGetQueryStringValue("Channel")) + "</display-name>\n";
strXML += "</channel>\n";
//////////////////////////////////////////////////////////////////////////////////////////////////
//find main table

var MainTable = xpath("//table[@id='dg1']");
//should only return 1
var MainTableItem = MainTable.snapshotItem(0);

//Get All Data Rows
var TableRows = xpatho(".//tr",MainTableItem);
for (var i = 0; i < TableRows.snapshotLength; i++)
{
	var TableData = xpatho(".//td",TableRows.snapshotItem(i));
	var CurrentYear = 1900 + new Date().getYear(); //just the year for now TODO: need to work on year roll-over!
	
	for (var j = 0; j < TableData.snapshotLength; j++)
	{
		if (TableData.snapshotItem(j).className == "srch_date_chnl_head")
		{
			var CurrentDay = HandleDateString(TableData.snapshotItem(j).textContent);
		}
		if (TableData.snapshotItem(j).className == "srch_rslt1")
		{
			var Time = replaceAll(TableData.snapshotItem(j).textContent,":","");
			strXML += "\t<programme start=\"" + CurrentYear + CurrentDay + Time + " +0200\" channel=\"" + ChannelIDNewChannelLookup(getGetQueryStringValue("Channel")) + ".dstv.com\">\n"
		}
		if (TableData.snapshotItem(j).className == "srch_rslt2")
		{
			strXML += "\t\t<title lang=\"en\">" + GetTitle(TableData.snapshotItem(j).textContent) + "</title>\n";
		}
		if (TableData.snapshotItem(j).className == "srch_rslt4")
		{
			strXML += "\t\t<description lang=\"en\">" + GetDescription(TableData.snapshotItem(j).textContent) + "</description>\n"
			strXML += "\t</programme>\n";
		}
	}
}
strXML += "</tv>\n";

strXML = plaintextQuote(strXML);
window.document.documentElement.innerHTML = "<pre>"+strXML+"</pre>";;
