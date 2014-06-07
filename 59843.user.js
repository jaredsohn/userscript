// ==UserScript==
// @name           Overdrive Libraries & Retailers
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        https://*.libraryreserve.com/*.htm
// @include        https://*.libraryreserve.com/*.htm?*
// @include        https://*.libraryreserve.com/*.htm#*
// @include        https://*.mediavending.com/*.htm
// @include        https://*.mediavending.com/*.htm?*
// @include        https://*.mediavending.com/*.htm#*
// @include        https://secure.contentreserve.com/*
// @include        https://marketplace.overdrive.com/*
// @include        https://www.overdrive.com/*
// @include        http://*
// @version        3.5
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// ==/UserScript==
//"use strict";
//{
//{ AutoPager
function isInAutoPagerHiddenbrowser() {
	var element = document.createElement("AutoPagerRequest");
	element.setAttribute("requestType", "AutoPagerRequest");
	element.setAttribute("requestName", "isInAutoPagerHiddenbrowser");
	var parent = document.documentElement;
	if(!parent || !parent.appendChild)
		return;
	parent.appendChild(element);

	var evt = document.createEvent("Events");
	evt.initEvent("AutoPagerRequest", true, false);
	element.dispatchEvent(evt);
	
	var inAp = element.getAttribute('response');
	parent.removeChild(element);
//	GM_log(location + " = " + inAp)
	return inAp && (inAp === "true");
} 
/* AutoPager Rules
<autopager>
<site><urlPattern>^http://search.overdrive.com/(classic/|mobile/|)(retail/|)SearchResults\.asp$</urlPattern>
<guid>DD3ECB0D-CCF3-1B00-2A0C-D9C2-9C16-5F52</guid>
<margin>1</margin>
<delaymsecs>200</delaymsecs>
<owner>BlindWanderer</owner>
<urlIsRegex>true</urlIsRegex>
<enableJS>2</enableJS>
<contentXPath>.//tr[td[1]/b/descendant-or-self::*[contains(text(), ':')] and count(td) &lt;= 2]/ancestor::table[count(tbody/tr) &lt;= 2 and position() &lt; 3]/ancestor::table[1]</contentXPath>
<testLink>http://search.overdrive.com/SearchResults.asp</testLink>
<linkXPath>//a[(text()='Next &gt;&gt;')]</linkXPath>
</site>
</autopager>

<autopager>
<site><urlPattern>^http://search.overdrive.com/(classic/|mobile/|)(retail/|)SearchResults\.asp$</urlPattern>
<guid>B70C72DF-987A-8A3F-0199-E529-14F6-692F</guid>
<margin>1</margin>
<owner>BlindWanderer</owner>
<urlIsRegex>true</urlIsRegex>
<enableJS>2</enableJS>
<quickLoad>true</quickLoad>
<needMouseDown>true</needMouseDown>
<contentXPath>//table[tbody/tr/td/a[@href='default.asp' and contains(text(), 'New Search...')]]</contentXPath>
<testLink>http://search.overdrive.com/classic/SearchResults.asp</testLink>
<linkXPath>//a[(text()='Next &gt;&gt;')]</linkXPath>
<desc>AutoPager rule for search.overdrive.com</desc>
</site>
</autopager>

<autopager>
<site><urlPattern>.*\/en/SearchResults(UserRank|-Coll|)\.htm\?.*</urlPattern>
<guid>8189B8DC-9FF9-9AF0-AE18-F7F2-5E56-3E88</guid>
<margin>1</margin>
<minipages>5</minipages>
<owner>BlindWanderer</owner>
<urlIsRegex>true</urlIsRegex>
<enableJS>2</enableJS>
<fixOverflow>true</fixOverflow>
<contentXPath>//table[script[contains(text(),'g_bFutureOnSaleDate')]/following-sibling::tbody[position()=1]] | //script[contains(text(), ' szPrimaryCreatorID ')]/ancestor::table[1]</contentXPath>
<testLink></testLink>
<linkXPath>//a[text()="Next &gt;"]</linkXPath>
<desc></desc>
</site>
</autopager>

<autopager>
<site><urlPattern>https?://[^\/]+/[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}/[0-9]+/[0-9]+/en/SearchResults(UserRank|-Coll|)\.htm.*</urlPattern>
<guid>20CD5595-4CCD-D656-4CE2-AFE4-BECC-B8BB</guid>
<margin>1</margin>
<owner>BlindWanderer</owner>
<urlIsRegex>true</urlIsRegex>
<enableJS>false</enableJS>
<quickLoad>true</quickLoad>
<contentXPath>//table[tbody/tr/td/a/img[@data-crid]]</contentXPath>
<contentXPath>//div[@id='main_content']</contentXPath>
<testLink>http://www.listennj.com/B0381685-4C4A-4D38-A209-7DE8CEDC60E3/10/427/en/SearchResults.htm?SearchID=3090895s</testLink>
<linkXPath>//a[(text()='Next &gt;') and starts-with(@href,'SearchResults.htm')]</linkXPath>
<desc>AutoPager rule for www.listennj.com</desc>
</site>
</autopager>
*/
//}

/*
This is really unsafe! Note the inline br tag!
http://search.overdrive.com/classic/ErrorCapture.asp?Number=201&Message=Unable+to+perform+the+requested+query+on+the+database%2E%3Cbr%3EEXEC+sp%5FMediaLocatorDLRSearchQuery+%27Identifier%27%2C+N%27B006BF2Q2S%27%2C+%27coinSortTitle%27%2C+%27+ASC%27%2C+1%2C+10&Descrip=%5BMicrosoft%5D%5BODBC+SQL+Server+Driver%5DTimeout+expired

http://search.overdrive.com/classic/ErrorCapture.asp?Number=201&Message=Unable+to+perform+the+requested+query+on+the+database.%3Cbr%3EEXEC+sp_MediaLocatorDLRSearchQuery+%27Title%27%2C+N%27wolf%27%2C+%27cifoDateReadyForSale%27%2C+%27+DESC%27%2C+1%2C+10&Descrip=[Microsoft][ODBC+SQL+Server+Driver][SQL+Server]Column+%27ContentInventoryFormat.cifoDateReadyForSale%27+is+invalid+in+the+select+list+because+it+is+not+contained+in+either+an+aggregate+function+or+the+GROUP+BY+clause.

Amazing what you can find in the google cache. Saving them for a later date.

Tables:
ContentInventory
ContentInventoryFormat
ContentInventoryFormatSrp
ListFormatType
ListPublisher
ListImprint
ListContentType
ListMinSoftwareVersion
ListCurrency
ListSecurityLevel
ContentMarketingImage
ContentMarketingImageAlt

Unable to perform the requested query on the database.
SELECT 
	ContentInventory.acacAccessID,
	coinTitle, 
	coinSubtitle, 
	coinEdition, 
	coinSeries, 
	coinCoverage, 
	coinAgeGroup, 
	lpubPublisherName, 
	dbo.f_GetGradeRange(ContentInventory.coinReserveID) AS GradeRange, 
	dbo.f_GetAwards(ContentInventory.coinReserveID) AS Awards, 
	limpImprintName, 
	coinPubDate, 
	lctyContentTypeDesc, 
	coinWorldWideRightsFlag, 
	cifoOnSaleDate, 
	lffaMinFormFactorID, 
	lffaRecomFormFactorID, 
	lmsvMinSoftwareVersionDesc, 
	(cifoSrp * lcurExchangeRateToUSD) AS cifoSrp, cifsSrp = CASE WHEN cifsSrp IS NOT NULL THEN (cifsSrp * lcurExchangeRateToUSD) ELSE '0' END, 
	cifoContentDuration, 
	cifoDistributorDiscount, 
	cmimFileName, 
	cmiaFileName, 
	cifoDrmInfo, 
	ContentInventoryFormat.lcurCurrencyCode, 
	lcurCurrencyName, 
	lsleSecurityLevelDesc, 
	cifoContentFileSize, 
	lftyFormatTypeDesc, 
	dbo.getRetailerUrls(ContentInventory.coinReserveID, ContentInventoryFormat.lftyFormatTypeID) AS Retailers, 
	cifoBundleFlag, 
	dbo.getLanguage(ContentInventory.coinReserveID) AS Languages 
FROM 
	ContentInventory
INNER JOIN
		ContentInventoryFormat
	ON
		ContentInventory.coinReserveID = ContentInventoryFormat.coinReserveID 
INNER JOIN 
		ListFormatType 
	ON 
		ContentInventoryFormat.lftyFormatTypeID = ListFormatType.lftyFormatTypeID 
LEFT OUTER JOIN
		ContentInventoryFormatSrp 
	ON
			ContentInventoryFormat.coinReserveID = ContentInventoryFormatSrp.coinReserveID
		AND 
			ContentInventoryFormat.lftyFormatTypeID = ContentInventoryFormatSrp.lftyFormatTypeID 
		AND 
			ContentInventoryFormat.lcurCurrencyCode = ContentInventoryFormatSrp.lcurCurrencyCode 
		AND 
			lstySrpTypeID = 2 
LEFT OUTER JOIN
		ListPublisher
	ON 
		ContentInventory.lpubPublisherID = ListPublisher.lpubPublisherID 
LEFT OUTER JOIN 
		ListImprint 
	ON 
		ContentInventory.limpImprintID = ListImprint.limpImprintID 
LEFT OUTER JOIN 
		ListContentType 
	ON 
		ContentInventory.lctyContentTypeID = ListContentType.lctyContentTypeID 
LEFT OUTER JOIN 
		ListMinSoftwareVersion 
	ON 
		ContentInventoryFormat.lmsvMinSoftwareVersionID = ListMinSoftwareVersion.lmsvMinSoftwareVersionID 
LEFT OUTER JOIN 
		ListCurrency 
	ON 
		ContentInventoryFormat.lcurCurrencyCode = ListCurrency.lcurCurrencyCode 
LEFT OUTER JOIN 
		ListSecurityLevel 
	ON 
		ContentInventoryFormat.lsleSecurityLevelID = ListSecurityLevel.lsleSecurityLevelID 
LEFT OUTER JOIN 
		ContentMarketingImage 
	ON 
			ContentInventory.coinReserveID = ContentMarketingImage.coinReserveID 
		AND 
			lityImageTypeID = 100 
LEFT OUTER JOIN 
		ContentMarketingImageAlt 
	ON 
			ContentInventory.coinReserveID = ContentMarketingImageAlt.coinReserveID 
		AND 
			ContentMarketingImageAlt.lityImageTypeID = 100 
WHERE 
		ContentInventory.coinReserveID = '{5D1016B6-CCB3-42B3-98EC-E8E8C8DEF694}' 
	AND 
		ContentInventoryFormat.lftyFormatTypeID = NaN 
		
		
http://search.overdrive.com/classic/ErrorCapture.asp?
		Number=201
	&
		Message=Unable+to+perform+the+requested+query+on+the+database.
	&
		Descrip=[Microsoft][ODBC+SQL+Server+Driver][SQL+Server]Incorrect+syntax+near+the+keyword+%27WITH%27.%3Cbr%3EEXEC+sp_MediaLocatorDLRSearchQuery+%27CreatorID%27%2C+N%27985E2335-DB21-46E2-B28A-481D752ACA86%27%2C+%27coinSortTitle%27%2C+%27+ASC%27%2C+1%2C+10
			"[Microsoft][ODBC+SQL+Server+Driver][SQL+Server]Incorrect+syntax+near+the+keyword+'WITH'.<br>EXEC+sp_MediaLocatorDLRSearchQuery+'CreatorID'%2C+N'985E2335-DB21-46E2-B28A-481D752ACA86'%2C+'coinSortTitle'%2C+'+ASC'%2C+1%2C+10"
			"[Microsoft][ODBC+SQL+Server+Driver][SQL+Server]Incorrect+syntax+near+the+keyword+'WITH'.<br>EXEC+sp_MediaLocatorDLRSearchQuery+'CreatorID',
				+N'985E2335-DB21-46E2-B28A-481D752ACA86',
				+'coinSortTitle',
				+'+ASC',
				+1,
				+10"
				
http://search.overdrive.com/classic/ErrorCapture.asp?
		Number=201
	&
		Message=Unable+to+perform+the+requested+query+on+the+database.%3Cbr%3EEXEC+sp_MediaLocatorDLRSearchQuery+%27Title%27%2C+N%27iron+druid%27%2C+%27coinSortTitle%27%2C+%27+ASC%27%2C+2%2C+10
	&
		Descrip=[Microsoft][ODBC+SQL+Server+Driver]Timeout+expired
*/
const QuickSearchsDays = 25;
const QuickSearchsCount = 25;
const DaysOfInterest = [3,7,14,30,45,60,90,180,365,3653];
const DefaultCheckoutPeriod = 7;
const AttributeNamePrefix = "u";
const XPathProfilingLevel = 0;

//I thought they had finally axed this, but it now works again. They are crazy for having unsanitized SQL inputs.
//I didn't come up with this hack, I just found it deployed in the wild, on production websites.
//I wish they would kill this and implement it in a safe way.
//const evilFormatDivider = ") OR (LCPU.lftyFormatTypeID = "; 
//Nope looks like they have fixed it now! Yeah =^_^=
function joinFormats(array) {
	return array.join(",");
}
function splitFormats(str) {
	return (str.split(/,\s*/));
}

if(!isInAutoPagerHiddenbrowser || isInAutoPagerHiddenbrowser()) throw "done";

var location;
var server;
try{
	location = document && document.location;
	server = location && location.host;
}
catch(e){
	server = document.URL && (location = url2location(document.URL)) && location.host;
	log(location, e);
}

if(!server) throw "done";

//GM_log(location);

var page;
var lang;

const find_id = /^[\S\s]*?([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})[\S\s]*$/;

const AThe = /^(["']?)((?:[Tt]he|[Aa]n?)\s+)?(.+?)(?:\1|)$/;
function processForSort(a){ return String.replace(a, AThe, "$3"); }

//http://chesterfield.lib.overdrive.com/ContentDetails.htm?ID={214A38E5-37B3-461C-9AD5-EB35F8E70AC5}

//A book without an author!
//http://search.overdrive.com/classic/TitleInfo.asp?TitleReserveID=1B45B393-6D40-4B76-A2F8-7CB9A9A6ACE7&TitleFormatID=420

//{ Comments, notes and the such

//http://contentreserve.com/TitleInfo.asp?ID={28DC2831-AC85-4473-B63A-740393596477}&Format=50
//http://www.booksamillion.com/p/Write-Your-Life/Lawrence-Block/Q699912686?id=5944404734731
//http://covers1.booksamillion.com/covers2/ebook/ImageType-100/0293-1/%7B28DC2831-AC85-4473-B63A-740393596477%7DImg100_b.jpg

//http://freelibrary.lib.overdrive.com/BANGSearch.dll?Type=Format&ID=25,425
//http://freelibrary.lib.overdrive.com/BANGSearch.dll?Type=Publisher&ID=1383&PerPage=25

//Good test page
//http://freelibrary.lib.overdrive.com/ContentDetails.htm?ID=A4519EDB-6DC5-4948-A0F2-3551BED4CF10
//http://audiobookstand.ret.overdrive.com/
//http://contentreserve.com/GetImage.asp?Image=0857-1\\{90613ABF-C565-4CD2-BA82-8C0799F80EB9}Img200.gif&Default=_Pub_NoImage_Img200.gif
//http://contentreserve.com/EnhancedDetails.asp?ID={28DC2831-AC85-4473-B63A-740393596477}&Format=50

//Chseter doesn't have counts in the waitinglist!!!

//It is unavoidable, I will need to write profiles for different sites. Eg search @ erl.lib.overdrive.com

//https://marketplace.overdrive.com/TitleDetails?crid=3b8441f8-6091-42d9-8774-f24d7ea0e4c3

//V1 retailers!!! <-- uses classic v1 website!!! Surprisingly some of the crazy stuff still works.
//http://ebooks.carinapress.com/ContentDetails.htm?ID=E5C99018-B62C-4070-BC03-5F383BAD809C 
//http://audiobookstand.ret.overdrive.com/ContentDetails.htm?ID={6FF7699B-72AA-444A-B7D0-E0CE67DE4A39}
//http://www.audiobookstanddl.com/ContentDetails.htm?ID={6FF7699B-72AA-444A-B7D0-E0CE67DE4A39}

//ContentDetails.htm?ID={0889499B-ECE8-41DF-A725-258B93037B2C}
//http://search.overdrive.com/TitleInfo.asp?TitleReserveID={0889499B-ECE8-41DF-A725-258B93037B2C}&TitleFormatID=25
//http://search.overdrive.com/ti/0889499B-ECE8-41DF-A725-258B93037B2C
//http://www.contentreserve.com/TitleInfo.asp?ID={0889499B-ECE8-41DF-A725-258B93037B2C}&Format=25
//TitleFormatID
//	25 - OverDrive WMA Audiobook
//	30 - OverDrive Music
//	35 - OverDrive Video
//	40 - OverDrive Video (mobile)
//	50 - Adobe PDF eBook
//	410 - Adobe EPUB eBook
//	425 - OverDrive MP3 Audiobook
//	900 - Mobipocket eBook

//ISBN search should allow for finding multi-format books
//EnhancedDetails will also detail other available formats - but only if they are enhanced :-/
//but it is a quick and dirty way of getting the book title.

//Easy way to find multi-format books.
//http://search.overdrive.com/SearchResults.asp?ReserveID={0889499B-ECE8-41DF-A725-258B93037B2C}
//http://search.overdrive.com/retail/SearchResults.asp?ReserveID={0889499B-ECE8-41DF-A725-258B93037B2C}
//Does not catch editions with other ids.
//Note: retail and library db not identical!

//SMS related stuff
//FindCarrier.htm
//TextRates.htm

//Libraries.htm
//ODAdvantage.htm
//Software.htm
//ContentDetails-GeoRights.htm?ID={0FB2A31B-FF83-4927-80B0-6BBEE4A9214F}
//ContentDetails-StreetDate.htm?ID={0889499B-ECE8-41DF-A725-258B93037B2C}
//ContentDetails-ReadExcerpt.htm?ID={0FB2A31B-FF83-4927-80B0-6BBEE4A9214F}
//EnhancedDetails.htm?ID={0889499B-ECE8-41DF-A725-258B93037B2C}
//BANGSearch.dll?Type=Advanced&UserRating=1&URL=SearchResultsUserRank.htm
//BANGSearch.dll?Type=Series&ID={AA2583D2-B2A5-4DD6-A1C1-CE5487289AB0}&SortBy=CollDate
//BANGSearch.dll?Type=Creator&ID={F6F6EAAF-46D0-4F54-BECF-51F5D2B88104}
//BANGSearch.dll?Type=Subject&ID=622
//BANGSearch.dll?Type=Awards&ID=68
//BANGSearch.dll?Type=Subject&ID=1069&Format=25,30,425&SortBy=CollDate
//BANGSearch.dll?Type=Series&ID={B371EB3F-4915-4243-86A3-62560D75AA6E}&SortBy=CollDate
//BANGSearch.dll?Type=Format&ID=25,30,425&SortBy=CollDate
//BANGSearch.dll?Type=Format&ID=425&url=SearchResultsmp3.htm
//BANGSearch.dll?Type=Seek&Letter=M&SearchID=30508654&SortBy=title&SortOrder=ASC
//BANGSearch.dll?searchresult=3709541s&more=1&PerPage=25
//NewMP3Additions.htm
//BrowseeBookFiction.htm
//BrowseeBookNonfiction.htm
//BrowseFiction.htm
//BrowseNonfiction.htm
//BrowseYouth.htm
//BrowseVideo.htm
//xPod.htm

//MoreRecommend.htm?ID=85E2063C-E1C6-408D-9024-544E6CD1AE27

//BANGSearch.dll?Type=FreeForm
//POST:SearchResult=30508654&FreeFormFields=title%2Ccreator%2Ckeyword&FreeFormCriteria=&Availcopies=%3E*0

//BANGSearch.dll?Type=FullText&SortBy=relevancy
//POST:FullTextField=All&FullTextCriteria=test&Format=all&availabilityoptions=more&x=4&y=11

//http://search.overdrive.com/classic/TitleInfo.asp?TitleReserveID=6F1EDE5C-218F-41D2-A222-E7BF54444A8A&TitleFormatID=425
//http://search.overdrive.com/classic/TitleInfo.asp?TitleReserveID=FDB2BAB0-751C-4424-949F-B8684F72D12F&TitleFormatID=425
//http://search.overdrive.com/EnhancedDetails.aspx?ID=FDB2BAB0-751C-4424-949F-B8684F72D12F&Format=35
//search.overdrive.com
//SearchResults.aspx?Series="Bloodsucking Fiends"
//Search Backend
//http://search.overdrive.com/SearchResults.svc/GetResults?sEcho=1&iColumns=18&sColumns=ReserveID%2CTitle%2CSubtitle%2CEdition%2CSeries%2CPublisher%2CFormat%2CFormatID%2CCreators%2CThumbImage%2CShortDescription%2CWorldCatLink%2CExcerptLink%2CCreatorFile%2CSortTitle%2CAvailableToLibrary%2CAvailableToRetailer%2CRelevancyRank&iDisplayStart=0&iDisplayLength=64&sSearch=&bEscapeRegex=true&iSortingCols=1&iSortCol_0=17&sSortDir_0=asc&dCurrentDateTime=Fri+May+28+2010+01%3A18%3A25+GMT-0400+(Eastern+Daylight+Time)
//http://search.overdrive.com/SearchResults.aspx?kw=%22Indigo%20Court%22&sortBy=RelevancyRank&searchCol=Series&ascending=True&pageSize=50&page=1&showEbooks=False&showAudiobooks=True&showMusic=False&showVideo=False

//http://search.overdrive.com/SearchResults/ReserveID/%7BF750E2CA-2D38-4CC8-A74D-0517751CD2C9%7D

//http://search.overdrive.com/TitleInfo.aspx/GetCountryRegionListByTitle
//Post Body: escape(JSON.stringify({"szReserveID":"b94dfea1-45bf-4800-82f8-c75b2cbb6a55","nFormatID":25}))

//http://search.overdrive.com/Layout/LoadCountriesLib?X-Requested-With=XMLHttpRequest&hidCountryValLib=1
//http://search.overdrive.com/Layout/LoadStates?countryCode=us&searchType=LoadCountriesLib&continentID=1
//http://search.overdrive.com/SearchResults/SearchLibrariesByState?state=NJ&libcountry=us

//http://search.overdrive.com/TitleInfo.aspx/SearchForALibrary
//escape(JSON.stringify({"szReserveID":"b94dfea1-45bf-4800-82f8-c75b2cbb6a55","nFormatID":25,"szType":"Region","szValues":"Florida|FL|United States|United States"}))

//http://us.newsletter.overdrive.com/4ADD9EB8-F2B3-40EE-B0DC-255DD65AF176/1/124/en/ContentDetails.htm?ID={27E34716-21DC-49E3-A957-A0CE370C8AC1}

//http://digital.minlib.net/Recommend.htm?ID={DDF7AEF4-751D-4301-A612-C7B33A0D51D5}

//http://www.booksonboard.com/sellers/halfsteps/ir.php?CRID=12B1D39F-1A1E-4084-8D6B-82EF73EA1B29-25&sellerID=0996-0001

//http://images.contentreserve.com/CreatorPhotos/1841-1/%7BFB19E3B8-ABE5-49DA-B858-419BB5EE1522%7DCreator.jpg
//http://overdrive.lib.uts.edu.au/ContentDetails.htm?id=3F9AB83A-A90C-48CE-9FFD-58BF528E68F7
//http://overdrive.lib.uts.edu.au/BANGSearch.dll?Type=Creator&ID=FB19E3B8-ABE5-49DA-B858-419BB5EE1522  <-  this works still!!!
//http://overdrive.lib.uts.edu.au/BANGSearch.dll?Type=Creator&ID=176441  <- this works too

//Unfortunately there seems to be no way to match new author id's to UUIDs, atleast not that I have found yet.

//Edition:  	Unabridged Selections
//TODO use the new search, it's not as screwed up as the classic search.
//TODO parse ContentDetails.htm with titleinfo.asp functions.
//TODO Global Wishlist

//NOTE: CR, Classic & Retail have seperate pages for enhancements, Modern doesn't contain links to them but can display them.
//}
if(DaysOfInterest.indexOf(QuickSearchsDays) == -1) {
	DaysOfInterest.push(QuickSearchsDays);
	DaysOfInterest.sort(function(a, b){return a - b;});
}
Object.freeze(DaysOfInterest);

GM_addStyle = function(css, doc) {
  doc = doc || document;
  var head = doc.getElementsByTagName("head")[0];
  var style = undefined;
	if (head) {
    style = doc.createElement("style");
    style.textContent = css;
    style.type = "text/css";
    head.appendChild(style);
  }
  return style;
}

String.prototype.endsWith = function(str){
	var p = this.length - str.length;
	return (str.length === 0) || (p >= 0) && (this.indexOf(str, p) == p);
}
String.prototype.startsWith = function(str){
	return !(str.length && this.lastIndexOf(str, 0));
}


function CollectionFiltering(target, options, objs){
	options.series = options.series || (options.series === undefined);//HACK too lazy to update call sites.
	let root = (options.root?options.root+" ":"");
	if(!target){log("CollectionFiltering", arguments); return;}
	// {ready:true, filter:true, fields:{Series:"series", Creators:"creator"}}
	function quickStringSort(a,b){ return (a > b) - (a < b); }
	function FieldRunner(obj){
			//TODO proxy sortValues so they are easier to deal with.
			for(let field of fields) {
				let Value = GetFieldValue(obj, field.fields);
				let value = Value;
				//if(value === undefined)
				//	value = (value = GetFieldValue(obj, field.fields.map(function(f){return f+"s"}))) && value[0];
				if(Value == null)
					Value = value = "";
				else if(typeof(Value) === "string")
					value = (Value = Value.trim()).toLowerCase();
				let sortValue = processForSort(value);
				var name = field.name;
				var pname = field.pname;
				if(field.known.hasOwnProperty(sortValue))
					field.known[sortValue].counter++;
				else {
					let button;
	//				try {
						button = smart_buttons_column(field.container, [value?//{{
									{id:name+"-"+sortValue, text:field.serialize(Value), selector: root+".item["+pname+"=\""+sortValue.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")+"\"]", /*display:"table-row",*/ sort:sortValue}:
									{id:name+"~none", text:"&lt;None&gt;", selector:root+".item:not(["+pname+"])", /*display:"table-row",*/ sort:sortValue},
								])[0];//}
	//				} catch(e){}
					if(button) {
						field.container.setAttribute("count", ++field.counter);
						let k = quickSetValueProperty(field.known, sortValue, {
								counter: 1, 
								node: button.span,
								button: button,
								sort: value,
							});
						let names = field.container.children;
						for(var i = 1, before, node; (reverse * typesort(value, before = field.known[(node = names[i]).getAttribute("sort", "")].sort)) > 0; i++);
						if(before != value)
							insertBefore(remove(k.node), node);
					}
				}
				if(value)
					for each(var n in obj.pieces)
						n.setAttribute(pname, sortValue);
			}
		}
	function delayedTask(func, delayDefault, name){
			let that = this;
			let timeout = null;
			this.callback = func;
			this.delayDefault = delayDefault;
			Object.defineProperty(this, "queued", {
					enumerable: true, 
					configurable: false, 
					get:function(){ return timeout !== null; },
				});
			this.run = function(){
				//log("running - " + name);
				let m = that.callback.apply(that, arguments);
				that.clear();
				return m;
			};
			this.requeue = function(delay){
				if(delay === undefined)
					delay = delayDefault ;
				//log("requeuing - " + name);
				if(timeout)
					that.clear();
				if(delay > 0)
					timeout = window.setTimeout(that.run, delay);
				else
					that.run();
				return that;
			};
			this.queue = function(delay){
				if(delay === undefined)
					delay = delayDefault ;
				//log("queuing - " + name);
				if(delay > 0) {
					if(!timeout)
						timeout = window.setTimeout(that.run, delay);
				}
				else
					that.run();
				return that;
			};
			this.clear = function(){
				//log("clearing - " + name);
				if(timeout)
					window.clearTimeout(timeout);
				timeout = null;
				return that;
			};
		}
	
	function Field(tname, names, serialize){
		this.tname = tname;
		this.fields = [].concat(names);
		this.pname = AttributeNamePrefix + (this.name = this.fields[0]);
		this.known = {};
		this.counter = 0;
		this.serialize = serialize || NoOp;
	}
	
	function addItem(obj){
		let formats = (Array.isArray(obj.formats)?obj.formats:[f for (f in obj.formats)]).map(Number);
		obj.installMetadataForFiltering();
		
		if(!obj.has("pos")) {
			var used = uniques[obj.id] || (uniques[obj.id] = []);
			if(!used.some(function(f){return formats.indexOf(f) != -1;})) {
				obj.pos = items.length;
//				originals.push(obj);
				
				for each(let num in formats) {
					used.push(num);
					if(known_formats.indexOf(num) == -1){
						known_formats.push(num);
						let format = Formats.NumberLookup(num);
						let type = format.type;
						let type_obj = Formats.Classes[type];
						let div = format_containers[type] || makeFormatContainer(type);
						smart_buttons_column(div, [{
								id:num, 
								text:format.title.replace(" "+type_obj.title,""), 
								selector:root+".item-format-"+num,
							}]);
					}
				}
				
				items.push(SmartSeries.add(obj));
			}
			else {//duplicate!
				for each(var n in obj.pieces)
					n.classList.add("item-duplicate");
				log("duplicate", obj);
			}
		}
		
		let sample = obj.sample?true:false;
		for each(let n in obj.pieces){
			n.setAttribute("sample", sample);
		}
		let formatGroup = (obj.formatGroup || "Unknown").replace(/Online /g,"");
		for each(var n in obj.pieces){
			n.classList.add("format-"+formatGroup);
		}
		
		//not sure if I want to keep this functionality
		if(countries && obj.countries) {
			for each(var c in obj.countries)
				if(countries.list.indexOf(c) == -1) {
					countries.list.push(c);
					countries.add({text:(CountryCodes.hasOwnProperty(c) && CountryCodes[c]) || c, value:root+".item[countries]:not([countries~="+c.toLowerCase()+"]), "+root+"span.provider[country]:not([country~="+c+"]) "});
				}
		}
		
		return obj;
	}
	
	function typesort(a, b){
		if((a === b))
			return 0;
		if((a == null))
			return ((a == b) || (b == new b.constructor()))?0:1;
		if((b == null))
			return (a == new a.constructor())?0:-1;
		switch((typeof(a))){
			case "number":
				return a - b;
			case "string":
				return quickStringSort(processForSort(a), processForSort(b));
			case "object":
				if(isArray(a)){
					if(a == b)
						return 0;
					for(var i = 0, j = Math.min(a.length, b.length), k; i < j; i++)
						if(k = typesort(a[i], b[i]))
							return k;
					return a.length - b.length;
				}
		}
		return -1;
	}
	function sort(){
			//log("updating");
			let by = sortOrder.value.split(",");
			items = items.sort(function(a, b){
					for each(var name in by) {
						let d = (reverse * typesort(a[name], b[name]));
						if(d)
							return d;
					}
					return 0;
				});
			//log(items.map(function(f){return [(a+":"+((f[a]==null)?"":f[a])) for each(a in by)]}));
			sorted();
//				log("updated");
//				log(items)
		}
	function sorted(){
			for each(item in items)
				for each(piece in item.pieces)
					if(piece.parentNode)//some were wrapped in comments but were added so they could be parsed, don't insert these.
						insertBefore(piece, bottom);
			
			for each(table in pagingTrash)
				remove(table);
			pagingTrash = [];
		}
	
	function SmartItemProxy(){ this.objs = []; this.proxies = [];}

	function makeFormatContainer(type){
		let div = format_containers[type] = document.createElement("div");
		div.id = "formats-"+type;
		let type_obj = Formats.Classes[type];
		smart_buttons_column(div, [{id:type, title:type_obj.title, flip:/**/"cell"/*/type_obj.formats*/, selector:root+".format-"+type_obj.title}]);
		format_container.appendChild(div);//this is the wrong solution!
		return div;
	}
	
	let buttons = [objMerge([], {id:"main-container"}), objMerge([], {id:"format-container", style:options.formatGroup?"display:none;":""})];

	this.target = target;
	
	SmartItemProxy.prototype = {
			add:function(obj){//add an object to the group and returns a proxy for the obj
					//While it would make sense to only update the parts of the cache that are affected by adding a new obj
					//it's simpler to just nuke the cache and have it recalc during the next request
					delete this.cache;
					//this is where we actually add the object to the group.
					this.objs.push(obj);
				
					//Now we build the proxy
					let proxy = Object.create(obj, {//this creates an object that inherits the properties from obj but has getters that override obj.
							group:{value:this, enumerable:true},//makes it all self contained.
							"series":{get: function(){ return this.group.get("series"); }, enumerable:true},
							"Series":{get: function(){ return this.group.get("Series"); }, enumerable:true},
							"series-position":{get: function(){ return this.group.get("series-position"); }, enumerable:true},
//							"contentUpdate":{get: FieldRunner, enumerable:true },
						})
					this.proxies.push(proxy);
					this.proxies.forEach(FieldRunner);
					
					return proxy;
				},
			"get":function(field) {
					//skip the cache if there is only a single object in the group
					if(this.objs.length == 1) return this.objs[0][field];
					
					let cache = this.cache || (this.cache = {});
					let value = cache[field];
					let before = value;
					if(value === undefined) {
						value = this.calculate(field);
						if(value !== undefined)
							cache[field] = value;
//						log(field, value, cache[field] /*, this, this.objs.map(function(obj){return obj[field];})*/);
					}
//					let post = this.calculate(field);
//					log(this.objs[0].title, field, before, (value == before) || value, (post == value) || post);
					return value;
				},
			calculate:function(field){
					let count = {};
					let map = {};
					let max = 0;
					let maxs = [];
					
					for each(let obj in this.objs) {
						let v = obj[field];
						if(v !== undefined) {
							let c = (count[v] || 0) + 1;
							if(c == 1)
								map[v] = v;
							count[v] = c;
							if(c > max)
								max = c;
						}
					}
					
					let order = Object.getOwnPropertyNames(count).sort(function(a,b){ return typesort(count[b], count[a]);}).map(function(v){return map[v]});
					
					return order.filter(function(f){return f;})[0] || order[0];
				},
		};
	
	//TODO
	//The goal of SmartSeries is to cope with titles that have not been completely tagged (lack series information)
	//We combine the metadata from several titles so that they can be grouped together.
	//This is largely transparent to the insides of this function and operate as a proxy layer applied during this.add
	let SmartSeries = {
			add:function(obj){
				let name = [obj.title,obj.creator].join("\x00");
				return (this[name] || (this[name] = new SmartItemProxy())).add(obj);
			},
		};
	
	
//	let originals = [];
		
	let pagingTrash = [];
	let uniques = {};
	let itemClass = "item"
	let known_formats = [];
	let format_containers = {};
	let format_container;
	let items = [];
	let reverse = 1;
	let sortOrder;
	let bottom;
	let countries;
	
	let filterNode;
	let filter;
	
	let counter;
	
	this.add = function(objs, table){
			//log("add", arguments, isArray(objs));
			if(isArray(objs)) {
				let out = [];
				for(let i = 0; i < objs.length; i++) {
					let obj = objs[i];
					out.push(addItem(obj));
				}
				if(options.paging){
					if(filterNode && filterNode.value){
						if(!filter.queued)
							filter.run(table);
					}

					if(counter)
						counter.requeue();

					if(table)
						pagingTrash.push(table);

					if(sortOrder.value != "pos" || reverse != 1)
						sortTimer.requeue();
					else if(bottom)
						sorted();
//					sortTimer.run();
					
				}
				return out;
			}
		}
//	
	let sortTimer = new delayedTask(sort, 75, "sort");

	if(options.countNodes && options.countNodes.length)
		counter = new delayedTask(function(){ 
				let j = items.length + (options.countNodes.start - 1);
				for(let i = 0; i < options.countNodes.length; i++)
					options.countNodes[i].nodeValue = j;
			}, 0, "count");
	
	let temp;
	
	let fields = [//{
			new Field("Creators","creator"), 
			new Field("Title", "title"),
		];//}
			
	if(options.series){
		fields.splice(0, 0, new Field("Series", ["Series"]));
		fields.splice(2, 0, new Field("Book", "series-position", function(r){return r.length>1?r[0]+"-"+r[r.length - 1]:r[0];}));
	}
	if(options.formatGroup) {
		buttons[0].push(
				{title:"Format", toggle:"qFormat"}, 
				{id:"qFormat", important:true, dropdown: [
						{text:"All"}, 
						{text:"Audiobooks", selector:[/*"Audiobook",*/"eBook","Unknown","Video","Unknown"].map((v)=> root+".format-"+v).join(", ")},
						{text:"eBooks", selector:["Audiobook",/*"eBook",*/"Video","Unknown"].map((v)=> root+".format-"+v).join(", ")},
						{text:"Videos", selector:["Audiobook","eBook",/*"Video",*/"Unknown"].map((v)=> root+".format-"+v).join(", ")},
						{text:"Unknown", selector:["Audiobook","eBook","Video"/*,"Unknown"*/].map((v)=> root+".format-"+v).join(", ")},
					],
				}
			);
	}
	if(options.ready) {
		buttons[0].push(
				{title:"Status", toggle:"ready"}, 
				{id:"ready", important:true, dropdown: [
						{text:"All"}, 
						{text:"Available", selector:root+".item-unavailable"},
						{text:"Ready", selector:root+".item-wait, "+root+".item-unavailable"}, 
						{text:"Hold", selector:root+".item-ready, "+root+".item-unavailable"}, 
						{text:"Unavailable", selector:root+".item-wait, "+root+".item-ready"},
					],
				}
			);
	}
	if(options.availability) {
		buttons[0].push(
				{title:"Availability", toggle:"availability"}, 
				{id:"availability", important:true, dropdown: [
						{text:"All"}, 
						{text:"Library", selector:root+".library-unavailable"}, 
						{text:"Store", selector:root+".store-unavailable"}, 
						{text:"WorldCat", selector:root+".worldcat-unavailable"}, 
						{text:"Unavailable", selector:root+".library-available, "+root+".store-available"}, 
					]}
			);
	}
	if(options.provided) {
		buttons[0].push(
				{title:"Availability", toggle:"provided"}, 
				{id:"provided", important:true, dropdown: [
						{text:"All"}, 
						{text:"Available", selector:root+".item-unavailable, "+root+".item-inactive"}, 
						{text:"Available & Inactive", selector:root+".item-unavailable"}, 
						{text:"Inactive", selector:root+".item-unavailable, "+root+".item-active"}, 
						{text:"Inactive & Unavailable", selector:root+".item-active"}, 
						{text:"Unavailable", selector:root+".item-active, "+root+".item-inactive"},
					]}
			);
	}
	if(options.providers) {
		buttons[0].push(
				{title:"Providers", toggle:"providers"}, 
				{id:"providers", important:true, dropdown: [
						{text:"Show All"}, 
						{text:"Available & Inactive", selector:root+"span.subscription-none"}, 
						{text:"Available", selector:root+"span.subscription-none, "+root+"span.subscription-inactive"}, 
						{text:"Inactive", selector:root+"span.subscription-none, "+root+"span.subscription-active"},
						{text:"Hide All", selector:root+"span.subscription-none, "+root+"span.subscription-active, "+root+"span.subscription-inactive, "+root+"[parsed='Available at']"},
						// {text:"Unavailable", selector:root+".item-available, "+root+".item-inactive"},
					]}
			);
	}
	if(options.abridged) {
		buttons[0].push(
				{title:"Abridgment", toggle:"abridgment"}, 
				{important:true, dropdown: [{text:"All"}, {text:"Unabridged", selector:root+".item-abridged"}, {text:"Abridged", selector:root+".item-unabridged"}], id:"abridgment"}
			);
	}
	if(options.filter) {
		buttons[0].push(
				{title:"Hide These", alt:"Items that match the regular expression entered are hidden from view"},
				objMerge(filterNode = document.createElement("input"), 
					{id:"filter", type:"text", title:"Items that match the regular expression entered are hidden from view"}),
				document.createElement("br")
			);
	}
	if(options.countries) {
		buttons[0].push(
				{title:"Countries", toggle:"countries"},
				countries = {id:"countries", important:true, dropdown: [
						{text:"All", value:""},
//						{text:"US", value:".item[countries]:not([countries~=us]), span.provider[country]:not([country~=US]) "},
					], list:[""],
				}
			);
	}
	if(options.sample) {
		buttons[0].push(
				{title:"Sample", toggle:"samples"},
				{id:"samples", important:true, dropdown: [
						{text:"All", value:""},
						{text:"With", selector:root+"[sample='false']"},
						{text:"Without", selector:root+"[sample='true']"},
					],
				}
			);
	}
	//{//generate everything but the containers
		buttons[0].push(//{
				{title:"Sort", toggle:"sort"}, 
				sortOrder = {id:"sort", dropdown: [
						{text:"Default", value:"pos"}, 
						{text:"Series", value:"Series,series-position,title,pos", skip:!options.series},
						{text:"Title", value:"title,creator,pos" }, 
						{text:"Author", value:"creator,title,pos" },
					],
					event: sortTimer.requeue,
				},
				{text:"Descending/Ascending", id:"sort", event:function(e){ 
						reverse = -reverse; 
						for(let field of fields)
							for each(n in [n for each(n in field.known)].sort(function(a, b){return reverse * typesort(a.sort, b.sort);}))
								field.container.appendChild(remove(n.node));
						sortTimer.run();
					} }
			);//}

		for(var i = 0; i < fields.length; i++){
			let name = fields[i].tname
			fields[name] = fields[i];//makes code down compatible
			buttons.push(objMerge([{id:name, title:name, flip:"cell"}], {"max-height":"17em", id:name, backer:name, className:"button-category"}));
		}
			
	//}

	let tr = target//{
		.appendChild(objMerge(document.createElement("table"), {id:"selectors"}))
			.appendChild(document.createElement("tbody"))
				.appendChild(document.createElement("tr"));//}
	
	GM_addStyle([//{
			"table#selectors {width:100%; clear:both;}",
			"table#selectors td { vertical-align:top;  padding: 1px; }",
			"table#selectors td div > .boxlabel { white-space:nowrap; }",
			"table#selectors td div > .boxlabel > label { white-space:normal; display: inline; }",
			"table#selectors td div > label.title { text-decoration:underline; font-weight:bold; }",
			"table#selectors td div .toggle, table#selectors td div .flip { cursor:pointer; -moz-user-select: none;}",
			"table#selectors td div > label { vertical-align: 2px;}",
			"table#selectors td div.limit { overflow-y: auto; margin-right:1.5em; width:100%;}",
			"table#selectors div.button-category[count='1'] { display:none; }",
			".item.filtered {display:none;}",
			"td.FormatTitle {max-width: 1em; overflow:visible; white-space:pre;}",
			"div.FormatTitle {-moz-transform: rotate(90deg); overflow: visible;}",
			".FormatTitle input {margin-left: -1px;}",
			".FormatTitle label {width: auto;}",
			".Hidden, .HiddenSearchable {display:none!important;}",
//			"#Book.limit div { max-width:10em; overflow:hidden; text-overflow:ellipsis; }",
			"table#selectors input[type='text'] {display: inline-block!important; padding:1px; margin:0; height:1.5em;}",
			"table#selectors select { padding:1px; }",
		].join("\n"));//}

	for(i = 0; i < buttons.length; i++) {
		var k = buttons[i];
		let cell = document.createElement("td");
			tr.appendChild(cell);
		let div = document.createElement("div");
			cell.appendChild(div);
		if(k["max-height"]) {
			div.className = "limit"
			div.style.maxHeight = k["max-height"];
		}
		if(k.className && k.className.length != 0)
			for(let c of [].concat(k.className))
				div.classList.add(c);
		if(k.id)
			div.id = k.id;
		if(k.style)
			div.style = k.style;
		smart_buttons_column(div, k);
		k.container = div;
		if(k.backer)
			fields[k.backer].container = div;
	}
	
	if(sortOrder) sortOrder = sortOrder.select || sortOrder;
	format_container = format_container || buttons[1].container;
	
	if(options.filter) {
		let search = compileXPath(".//*["+["@parsed"].concat([//{
				'Available at',//Doesn't make sense to hide an item because it is available at a particular library and we have better filter tools available
				'ISBN',//Makes series searches more complicated
			].map(function(n){return "@parsed!="+SmartQuotes(n);})).join(" and ")+"]");//}
		filter = new delayedTask(function(block){
				block = block || bottom;
				let exp = new RegExp(filterNode.value);
				let uniques = {};
				$Z(compileXPath("descendant-or-self::*[contains(concat(' ', @class, ' '), ' item ')]"), function(node){
						let u = node.getAttribute("unique");
						let nodes = uniques[u];
						if(nodes == null)  nodes = uniques[u] = [];
						nodes.push(node);
						node.classList.remove("filtered");
					}, block && block.parentNode);
				//log(uniques)
				if(filterNode.value)
					for each(var ar in uniques)
						if(ar.reduce(function(a,b){return a.concat($W(search, b));}, []).some(function(n) {return n.textContent.match(exp);}))
							for each(var node in ar)
								node.classList.add("filtered");
			}, 2000, "filter");
		
		let filter_update = function(evt){
			switch(evt && evt.keyCode) {
				case 27://escape
					filterNode.value = "";
				case 0xa:  case 0xd://enter
					filter.run();
					return;
				default:
			}
			filter.requeue();
		}
		
		addEvent(filterNode, "keyup", filter_update);
		addEvent(filterNode, "change", filter_update);
	}
	
	if(objs) { //add these objects
		this.add(objs);
	}
	log(items);
//	log(SmartSeries);
	if(items.length) {
		bottom = insertAfter(document.createComment("Anything after this is unknown to the sorting code."), items.slice(-1)[0].pieces.slice(-1)[0]);
	}
	//log(fields);
}


//{ ProviderBase
function ProviderBase(){}
ProviderBase.prototype = {
		linkify: function(obj){
			var sp = this;
			var text, node;
			var a;
			
			var cleanups = []
		
			if((a = sp.createLink(obj.titleLinkType, obj)) && (text = obj["subtitle-positioning"])//{ subtitle-positioning
					&& (node = obj.nodes["Subtitle-value"])
					&& (node = findTextElementContaining(text, node, "not(ancestor-or-self::a)"))
					&& (node = SplitTextNode(node, text))) {
				cleanups.push(insertAsParent(a.cloneNode(true), node));
			}//}
			if((a = sp.createLink("series", obj)) && (text = obj["subtitle-series"])//{ subtitle
					&& (node = obj.nodes["Subtitle-value"])
					&& (node = findTextElementContaining(text, node, "not(ancestor-or-self::a)"))
					&& (node = SplitTextNode(node, text, obj["subtitle-Series"]))) {
				cleanups.push(insertAsParent(a.cloneNode(true), node));
			}//}
			if(a && (text = obj["title-series"])//{ title-series
					&& (node = obj.nodes["Title-value"])
					&& (node = findTextElementContaining(text, node, "not(ancestor-or-self::a)"))
					&& (node = SplitTextNode(node, text))) {
				cleanups.push(insertAsParent(a.cloneNode(true), node));
			}//}
			if(a && (text = obj.series)//{ series
					&& (node = obj.nodes["Series-value"])
					&& (node = findTextElementContaining(text, node, "not(ancestor-or-self::a)"))
					&& (node = SplitTextNode(node, text))) {
				cleanups.push(insertAsParent(a.cloneNode(true), node));
			}//}
			if(obj.creator//{ //creator - should be doing this with creatorObjs instead.
				// {name:creator, role:role, id:undefined, number:undefined, link:undefined, text:value}
					&& (node = obj.nodes["Creators-value"] || obj.nodes["Creator-value"] || obj.nodes["Author-value"])
					&& (node = findTextElementContaining(obj.creator, node, "not(ancestor-or-self::a)"))
					&& (a = sp.createLink("creator", obj))
					&& (node = SplitTextNode(node, obj.creator))) {
				cleanups.push(insertAsParent(a, node));
			}//}
			if((a = sp.createLink(obj.titleLinkType, obj)) && obj.title//{ title
					&& (node = obj.nodes["Title-value"])
					&& (node = findTextElementContaining(obj.title, node, "not(ancestor-or-self::a)"))
					&& (node = SplitTextNode(node, obj.title))) {
				cleanups.push(insertAsParent(a.cloneNode(true), node));
			}//}

			if("convertLink" in sp){
				for each(var a in cleanups)
					sp.convertLink(a);
			}
			
			if("suggestions" in obj){
				for each(let s in obj.suggestions)
					this.linkify(s);
			}
			
			if("supplements" in obj){
				for each(let s in obj.supplements)
					this.linkify(s);
			}
			
			if(obj.publisher == "Project Gutenberg"){
				let span = obj.nodes["Publisher-node"].appendChild(document.createElement("span"))
				span.className = "sup";
				let a = span.appendChild(document.createElement("a"));
				a.href = "http://www.gutenberg.org/ebooks/search.html/?"+obj2post(obj, {query:"title"});
				a.appendChild(document.createTextElement("T"))
				a.title = "Search Project Gutenberg for title."
			}
			
			if(obj.format == 420 && obj.ASIN){//kindle
				let span = obj.nodes["ASIN-node"].appendChild(document.createElement("span"))
				span.className = "sup";
				let a = span.appendChild(document.createElement("a"));
				a.href = "http://www.amazon.com/"+obj.title+"/dp/"+obj.ASIN+"/";
				a.appendChild(document.createTextNode("US"))
				a.title = "Search Amazon for this title."
			}
			if(obj.ISBN){
				let span = (obj.nodes["ISBN-node"] || obj.nodes["Lib. ISBN-node"] || obj.nodes["Ret. ISBN-node"]).appendChild(document.createElement("span"))
				span.className = "sup";
				let a = span.appendChild(document.createElement("a"));
				a.href = "http://www.worldcat.org/search?q="+obj.ISBN;
				a.appendChild(document.createTextNode("WC"))
				a.title = "Search WorldCat.org for this title."
			}
			
			return cleanups;
		},
	}
//}

//{ Item
function Item(pieces){
	this.unique = new Date().valueOf() + "~" + Math.random();
	if(isArray(pieces))
		this.addPieces(pieces);
	//quick solution for finding an obscure bug
	//this.nodes.__defineSetter__("Mobipocket eBook-node", function(y) { try{"".evaluate();}catch(e){log(e);}});
}
Item.prototype = lazyProperties(installSelfDestructingGettersAndSetters({
		get Series(){return GetFieldValue(this, ["series-series", "series"].concat((this.seriesFieldParts || []).map(function(s){return s+"-Series";})).concat((this.seriesFieldParts || []).map(function(s){return s+"-series";}))) || "";},
		has: function(name){//ignore getters & setters!
				return (!this.__lookupGetter__(name)) && (name in this);
			},
		get creator(){return (this.creatorObjs.length > 0)?this.creatorObjs[0].name:undefined;},
		get creatorId(){return (this.creatorObjs.length > 0)?this.creatorObjs[0].id:undefined;},
		get creatorNumber(){return (this.creatorObjs.length > 0)?this.creatorObjs[0].number:undefined;},
		get creators(){return Object.freeze(this.creatorObjs.map(function(c){return c.name;}));},
		get Formats(){return (Array.isArray(this.formats) && this.formats.slice()) || Object.keys(this.formats)},
		get format(){return this.Formats[0];},
		set format(value){
				if(Array.isArray(this.formats)) {
					if(this.formats.indexOf(value) == -1)
						this.formats.unshift(value);
				}
				else
					throw "Item.formats is not an array so it cannot be set with the format setter";
			},
		isNodeParsed: function(node, name){
				if(!name)
					return true;
				let flagNode = getTag(node);
				return ("~"+flagNode.getAttribute("parsed", "")+"~").indexOf("~"+name+"~") != -1;
			},
		setNodeParsed: function(node, name) {
				if(!name)
					return true;
				let flagNode = getTag(node);
				let parsed = flagNode.getAttribute("parsed", "");
				if(("~"+parsed+"~").indexOf("~"+name+"~") != -1)
					return true;
				flagNode.setAttribute("parsed", parsed?parsed + "~" + name:name);
				return false;
			},
/*		removedNodeParsed: function(node, name) {
				let flagNode = $X(compileXPath("ancestor-or-self::*[1]"), node)
				let parsed = flagNode.getAttribute("parsed", "");
				if(parsed)
					flagNode.setAttribute("parsed", ("~"+parsed+"~").replace("~"+name+"~", "~").slice(1,-1));
			},/**/
		titleLinkType:"title",
		textSort: function(text){
				if(text == null || text == "")
					return text;
				return processForSort(text.toLowerCase());
			},
		seriesFieldParts: Object.freeze(["subtitle", "title", "series"]),
		processSubtitle:function(){
				if(this.hasOwnProperty("series-position"))
					return true;
				
				let obj = this;
				this.seriesFieldParts.some(function(name) {
						let value = obj[name];
						if(value) {
							let match = obj.subtitleParser.exec(value);
//							log(value, match);
							if(match) {
								let books = [];
								if(match.rns)
									for(var i = match.rns, j = match.rne; i <= j; books.push(i++));
								else {
									if(match.comma) books = match.comma;
									if(match.single) books.push(match.single);
								}
								//I am so not handling lettered series! It's silly! Anyway, is I-V 1-5 or 9-22?
								//if(match.ras) for(var i = match.ras.charCodeAt(0) - 64, j = match.rae.charCodeAt(0) - 64; i <= j; books.push(i++));
								if(match.title)
									obj[name+"-title"] = match.title;
								if(books.length > 0) {
									obj[name+"-series"] = match.series;
									obj[name+"-series-sort"] = obj.textSort(match.series);
									obj[name+"-positioning"] = match.positionText;
									obj["series-position"] = books;
								}
								else if(match.stories) {
									var str = match.stories;
									obj[name+"-series"] = str;
									obj[name+"-series-sort"] = obj.textSort(str);
									str = str[0].toUpperCase() + str.slice(1);
									obj[name+"-Series"] = str;
									if(match.collection){
										obj[name+"-positioning"] = match.collection;
										obj["series-position"] = [match.collection];
									}
								}
								return true;
							}
						}
						return false;
					});

				return this.hasOwnProperty("series-position");
			},
		addPieces:function(piece, root){
			let obj = this;
			let count = 0;
			if(piece == null)
				return count;
			let add = function(m){
					if(!m.hasAttribute("unique")) {
						obj.pieces.push(m);
						m.setAttribute("unique", obj.unique);
						count++;
					}
				};
			if(typeof(piece) == "string")
				piece = [piece];
			else if(piece.ownerDocument)
				piece = Array.slice(arguments);
			if(isArray(piece)) {
				if(typeof(piece[0]) == "string") {
					let unique = "[not(@unique)]";//contains(concat('~',@unique,'~'), '~"+this.unique+"~')
					if(root == null || root.ownerDocument)
						root = [root];
					
					let f = compileXPath(piece.map(function(f){return f + unique;}).join(" | "));
					
					for each(var node in root)
						$Z(f, add, node);
				}
				else
					piece.forEach(add);
			}
			return count;
		},
		serial:function(){
				var mask = {pieces:null, nodes:null, titleLinkType:null, formats:{}, enhanced:{}, supplements:{}, suggestions:{}, providers:{"": {a:null}}, reviews:{}, creatorMarketing:{}, excerpts:{}, recommended:{}, provider_countries:{"":{"":{a:null}}}};
					mask.suggestions[""] = mask.enhanced[""] = mask.supplements[""] = mask.formats[""] = mask;//TODO, make these independant copies
					mask.reviews[""] = mask.creatorMarketing[""] = mask.excerpts[""] = mask.recommended[""] = {nodes:null};
					mask.creatorObjs = {"":(mask.creatorObj = {link:null, text:null,})};
				for each(let a in Array.slice(arguments))
					mask[a] = null;
				return this.clone(mask, true);
			},
		clone:function(ignore, strip, func){
				var args = arguments;
				var obj = cloneObj(this, ignore, null, func || function(){if(this instanceof Item) return this.clone.apply(this, args);});
				if(strip)
					obj.__proto__ = Object.prototype;//remove all the uncool stuff
				return obj;
			},
		enhance:function(){
			var formats = this.formats || (this.formats = []);
			if(!isArray(formats))
				formats = [Number(index) for(index in formats)];
			/*
			if(this.format && formats.indexOf(this.format) == -1)
				formats.push(this.format);
			if((formats.length > 0) && !("format" in this))
				this.format = formats[0];
			*/
			let m;
			if(this.id && (m = this.id.match(find_id)))
				this.id = m[1];//fixes id matching ~_~
			
			this.processSubtitle();
			
			if(this.pieces.length){
				//This information is not open to interpretation or in need of correction.
				var classes = ['item']
				if(this.has("formats")) {
					classes = classes.concat(formats.map(function(f){return "item-format-"+f;}));
			
					for(let name in Formats.Classes) {
						var c = Formats.Classes[name];
						for each(var format in formats) {
							if(c.formats.indexOf(format) > -1){
								classes.push("item-type-"+name);
								break;
							}
						}
					}
				}
				if(this.status) classes.push("item-"+this.status);
				if(this.id) classes.push("item-"+this.id);
				
				if(this.subscription)
					classes.push("item-" + this.subscription);
			
				if(this.has("provider_countries"))
					this.countries = [c for(c in this.provider_countries)];
		
				for each(let name in classes)
					for each(let node in this.pieces)
						node.classList.add(name);
			}
			
			//log([this, this.clone(), this.serial()]);
			
			if(this.title && this.title == this.series && !("series-position" in this))
				this["series-position"] = [1];//if the tile and the series are exactly the same, it's likely the first book in the series
			
			return this;
		},
		kick: function(){
			let small;
			let full;
			if(this.nodes && (small = this.nodes["Short Description-node"]) && (full = this.nodes["Full Description-node"]))
			{
				let text = compileXPath(".//text()");
				let s = $W(text, small, [], function(text){if(text.textContent.trim()) return text;});
				let ss = s[0];
				let se = s.slice(-1)[0];
				let sst = ss.nodeValue.trim();
				let set = se.nodeValue.trim().replace(/[.]{3,}$/, "");
				let fs = findTextElementContaining(sst, full);
				let fe = findTextElementContaining(set, full);
				let fl = $W(text, full, [], function(text){if(text.textContent.match(/\S/)) return text;}).slice(-1)[0];
				if(fs && fe)
				{
					let i = fs.textContent.indexOf(sst);
					let j = fe.textContent.indexOf(set);
					if(i > -1 && j > -1)
					{
						j += set.length;
						let shortRange = document.createRange();
						shortRange.setStart(fs,i);
						shortRange.setEnd(fe,j);
						
						let fullRange = document.createRange();
						fullRange.setStart(fe,j);
						fullRange.setEnd(fl, fl.textContent.length);
						
						let shortSpan = document.createElement("span")
						shortSpan.className = "short descriptioned";
						shortSpan.title = "Text found in both the full and short descriptions."
						
						let fullSpan = document.createElement("span")
						fullSpan.className = "full descriptioned";
						fullSpan.title = "Text found only in the full description."
						
						GM_addStyle([//{
							"span.descriptioned { font-size: inherit; }",
							"span.short { background-color: rgba(64, 255, 192, 0.15); }",
							"span.full { background-color: rgba(64, 192, 255, 0.15); }",
							"*[parsed='Short Description'] { display:none; }",
							].join("\n"));//}
						
						try{
							shortRange.surroundContents(shortSpan);
							fullRange.surroundContents(fullSpan);
						}
						catch(e){
							return;
						}
/*/						
						let s = window.getSelection();
						if(s.rangeCount > 0) s.removeAllRanges();
						s.addRange(fullRange);
/**/						
					}
				}
			}
		},
		/*getValueObj: function(name, _lang){
				return languages.getValueObj(name, this.pieces, _lang);
			},
		getValue: function(name, _lang){
				return languages.getValue(name, this.pieces, _lang);
			},*/
		getAdditional: function(additional, base){
				if(arguments.length == 1)
					base = this.pieces;
				else if(typeof(base) !== "object" || !base || !base.push)
					base = [base];
				else if(base.length === 0)
					base.push(null);
				
				let temp;
			
				for(let name in additional) {
					let alt = additional[name];
					if(alt.ownerDocument)
						this.processAttribute(name, null, alt, []);
					else {
						let altbase = null;
						
						if(alt.node) {
							if(!(altbase = GetFieldValue(this.nodes, alt.node)))
								continue;//instead of using GetFieldValue we could use objFilter and place the values into an array, but we would need to convert alt.node into an (object?)
						}
						if(alt.nodeXpath) {//can't decide if this should be in the alt.node "if" or not.
							let f = compileXPath(alt.nodeXpath);
							if(altbase && Array.isArray(altbase))
								altbase = altbase.reduce(function(a, n){return $W(f, n, a);}, []);
							else
								altbase = $W(f, altbase);
							if(!altbase.length)
								continue;
						}
						if(!altbase)
							altbase = base;
						else if(!isArray(altbase))
							altbase = [altbase];

						let params = alt.params || [];
						let results = [];
						
						if(alt.self) {
							this.processAttribute(name, null, alt.self, params);
						}
						else if(alt.form) {
							let form = $X(alt.form);//FIXME!
							if(form)
							{
								this.nodes[name+"-form"]=form;
								let map = alt.map || {};
								for each(var item in Array.slice(form.elements))
									if(item.name)
										this.processAttribute(map.hasOwnProperty(item.name)?map[item.name]:item.name, null, item, params);
								this.processAttribute(name, null, form, params);
								//this.nodes[item.name.toLowerCase()+"-value"] = item;
								//this.processAttribute(name, null, alt.self, params);
							}
						}
						else if(alt.script) {
							let f = compileXPath("descendant-or-self::script[contains(text(), 'var "+alt.script+" = ') and not(contains(concat('~', @parsed, '~'), '~"+name+"~'))]");
							for each(var root in altbase) {
								let script = $X(f, root);
								if(script && !this.setNodeParsed(script, name)){
									this.nodes[name + "-script"] = script;
									var m = script.innerHTML.match(new RegExp("var "+ alt.script +" = ("+(alt.match || "\"([^\n]*)\"|[^\n]*")+");"));
									var value;
									try {//this code is nessary because some times the strings are invalid (haven't had their quotes escaped!).
										if(m[1] == "\"\"" || m[1] == "''")
											value = "";
										else
											value = eval(m[1], {});//eval it on an empty obj.
									}
									catch(e) {
										value = m[2];
									}
									if(value !== undefined) {
//										try{
										if(("field" in alt) && (("testNull" in alt)?(alt.testNull?value != null:value):true))
											this[alt.field] = value;
										if(("number" in alt) && (("testNull" in alt)?(alt.testNull?value != null:value):true))
											this[alt.number] = Number(value);
//										} catch(e){log(e, alt, name, value, script);}
										if("parse" in alt)//function(vname, value, obj, node, name, alt){obj[name] = Number(value);}, 
											alt.parse.apply(alt, [alt.script, value, this, script, name, alt].concat(params));
									}
									break;
								}
							}
						}
						else if((alt.field) && (alt.value)) {
							this.nodes[name+"-count"] = 0;
							let pairs = this.nodes[name+"-pairs"] = [];
							
							let f = compileXPath(alt.field);
							let data = alt.value;
							let end = alt.hasOwnProperty("end")?alt.end || "":":";
							
							let obj = this;
							let fp = [obj, name, alt, results].concat(params);
							
							if(typeof(data) === "string")
								data = compileXPath(data);
							
							let func = function(r){
									let title = r.textContent.trim();
									let success = !end.length || (title.slice(-end.length) == end);
									if(success) {
										let field = title.replace(/[\s]+/g, ' ');//bloody &nbsp;!
										if(end.length)
											field = field.slice(0, -end.length);
										let dataNode;
										if(typeof(data) === "function")//It's a function! Lets call it
											dataNode = data.apply(obj, Array.slice(arguments).concat(fp));
										else//i guess it's an xpath expression?
											dataNode = $X(data, r.ownerDocument && r);
										
										if(!dataNode) {
											pairs.push([false, field, data, dataNode]);
										} else if((dataNode.ownerDocument && obj.isNodeParsed(dataNode, name))){
											pairs.push([true, field, data, dataNode]);
										} else {
											success = obj.processAttribute(field, r, dataNode, params);
											//pairs.push([success !== undefined, field, r, data, dataNode, success]);
											if(success === undefined)
												pairs.push([false, field, r, data, dataNode]);
											else
												pairs.push([true, field]);
										}
									}
								};
							for each(let root in altbase)
								this.nodes[name+"-count"] += $Z(f, func, root);
						}
						/*else if(alt.localized) {
							let out = languages.getValueObj(alt.localized, altbase);
							if(out){
								this.setNodeParsed(out.text, name)
								this.nodes[name+"-node"] = out.node;
								this.nodes[name+"-value"] = out.text;
								alt.parse.call(this, out, alt.localized, name, alt);
							}
						}*/
						else if(alt.parse) { //function(r, i, obj, name, alt, results){} or function(node, i, obj, name, inst, results){}
							this.nodes[name+"-count"] = 0;
							//[r, i, obj, name, alt, results] + params
							params = [compileXPath(alt.xpath), alt.parse, null, this, name, alt, results].concat(params);
							for each(let root in altbase) {
								params[2] = root;
								this.nodes[name+"-count"] += $Z.apply(null, params);
							}
						}
						else {
							temp = compileXPath(alt.xpath || alt);
							let first = !alt.all;
							outer: for each(let root in altbase)
								for each(let node in $W(temp, root))
									if(this.processAttribute(name, null, node, params) !== undefined && first)
										break outer;
						}
						if(results.length)
							this.nodes[name+"-results"] = results;
					}
				}
			},
		processAttribute:function(field, titleNode, valueNode, params) {
				let realValueNode = this.readAttributeValueNode(field, valueNode, params);
				if(realValueNode !== undefined) {
					if(titleNode && titleNode.ownerDocument){
						this.nodes[field+"-title"] = titleNode;
						this.setNodeParsed(titleNode, field);
						titleNode.setAttribute("title-node", field);
					}
					this.nodes[field+"-node"] = valueNode;
					if(realValueNode.ownerDocument) {
						this.nodes[field+"-value"] = realValueNode;
						this.setNodeParsed(realValueNode, field);
					}
					else if(isArray(realValueNode)) {
						this.nodes[field+"-values"] = realValueNode;
						for each(let rvn in realValueNode){
							this.setNodeParsed(rvn, field);
						}
					}
					if(valueNode.ownerDocument) {
						this.setNodeParsed(valueNode, field);
					}
					else if(isArray(valueNode)) {
						for(let vn of valueNode) {
							this.setNodeParsed(vn, field);
						}
					}
				}
				return realValueNode;
			},
		readAttributeValueNode: function(field, valueNode, params) {
				function CleanupTextFormating(node){
						node.classList.add("cleaned");
						function bludgen(value, r, ft){
							switch(value) {
								case "0":
								case "1":
								case "2":
								case "3":
								case "4":
								case "5":
								case "6":
								case "7":
								case "8":
								case "9":
								case "*":
								case "\x95":
									r.nextSibling.classList.add("list");
									if(ft && ft.nextSibling)
										ft.nextSibling.classList.add("list");
								case "(":
									break;
								default:
									if(!r.nextSibling.classList.contains("list"))
										r.nextSibling.classList.add("hide-break");
							}
						}
						function go(r){//I know in general what this code does but I don't recall the specifics.
							let v = r.nodeValue.trim();
							let ft;
							for(ft = r.nextSibling; ft && !ft.nodeValue; ft = ft.nextSibling);
							if(!ft) return;
							let last, first;
							switch(last = v.slice(-1)) {
								case "-":
									r.nodeValue = r.nodeValue.slice(0,-1);
									remove(r.nextSibling);
								case ":":
								case ".":
								case ""://damn whitespace
									return;
								default:
									if(last.toLowerCase() == last)
										bludgen(ft.nodeValue.trim()[0], r, ft);
							}
							bludgen(first = v[0], r);//I don't know why we don't pass this ft
						}
						$Z(compileXPath(".//text()[following-sibling::node()[1][self::br and not(following-sibling::node()[1][self::br])]]"), go, node)
					}
			
				params = params || [];//can't be null!
				let classAdd = [];
				let success = true;
				let value = undefined, m, a, x;
				let obj = this;
				switch(field) {
					case "Download":{
						if(a = $X(compileXPath("ancestor-or-self::a[1]"), valueNode)) {
							this.downloadURL = a.href;
							x = search2obj(a.search, true);
							if(!obj.id)
								obj.id = x.reserveid;
							if(!obj.format && (m = Number(x.formatid)) != -1)
								obj.formats.push(m);
						}
						break;
					}
					case "formatGroup":{
						obj.formatGroup = String.prototype.slice.apply((valueNode.value || valueNode.textContent).trim(), params);
						break;
					}
					//case "Min. Version": { break; }
					//case "DRM Level": { break; }
					//case "":{ break; }
					case "Table of Contents":{
						x = [];
						value = [];
						$Z(compileXPath(".//ul/li"), function(r,i){ value.push(r.textContent.trim()); x.push(r);}, valueNode);
						if(x.length){
							valueNode = x;
							obj.toc = value;
						}
						break;
					}
					case "Sample":{
						if(valueNode && valueNode.nodeType == valueNode.ATTRIBUTE_NODE){
							this.sample = success = valueNode.value;
						}
						else {
							valueNode = $X(compileXPath("descendant-or-self::a"), valueNode) || valueNode;// | parent::link
	//						if(valueNode.title)
	//							this.sampleType = valueNode.title.trim();
							if(valueNode.href){
								this.sample = valueNode.href;
								if(!this.id && (m = this.sample.match(find_id)))
									this.id = m[1];//this is cheating I know. I'm too lazy to parse the URL
							}
						}
						break;
					}
					case "Short Description":
					case "Full Description":{
						if(!Array.isArray(valueNode))
							valueNode = [valueNode];
						valueNode.forEach(CleanupTextFormating);
					}
					case "Description":{
						if(!Array.isArray(valueNode))
							valueNode = [valueNode];
						let expr = /^(\d+[\.\)]*)\s+(?:(?=.*[^\)]$)(.*)|(.*) (\(((?:[^\(\)]*|\([^\(\)]*\))+)\)))$/;
						let tracks = [];
						valueNode.forEach(function(r){
//								CleanupTextFormating(r);
								let text = $X(compileXPath(".//text()[contains(., 'Download Includes:')]", r));
								if(text) {
									let values = [];
									function qp(r){
										let line = insertAsParent(document.createElement("div"), r);
										line.className = "track";
										if(line.nextSibling && line.nextSibling.nodeName == "BR")
											remove(line.nextSibling);
										
										let m = expr.exec(r.nodeValue.trim());
										if(m) {
											let b = insertAsParent(document.createElement("b"), SplitTextNode(r, m[1]));
											b.className = "track-number";
											b.title="Track number";
											tracks.push(m[2] || m[3]);
											values[m[1]] = line;
											if(m[5]) {
												let wrap = SplitTextNode(b.nextSibling, m[4]);
												let span = insertAsParent(document.createElement("span"), wrap);
												let unwrap = SplitTextNode(wrap, m[5]);
												let i = insertAsParent(document.createElement("i"), unwrap);
												span.className = "creator";
												span.title = "Track artist";
											}
											let title = insertAsParent(document.createElement("span"), SplitTextNode(b.nextSibling, m[2] || m[3]));
											title.className = "track-title";
											title.title = "Track title";
										}
									}
									r.classList.add("renumbered");
									let textbox = $X(compileXPath("ancestor-or-self::node()[count(parent::node()/node()) > 1][1]"), text);
									if($X(compileXPath("following-sibling::ol"), textbox))
										$W(compileXPath("following-sibling::ol/li/text()"), textbox).forEach(function(m){tracks.push(m.nodeValue.trim());});
									else if(!$Z(compileXPath("following-sibling::text()[string-length(translate(., ' ', '')) > 0]"), qp, textbox))
										$Z(compileXPath("ancestor::p/following-sibling::p/text()"), qp, text);
									//(not(self::br) and .//text()[string-length(translate(., ' ', '')) > 0])
									if(values.length > 1){
										var after = values[1].previousSibling;
										values.forEach(function(v){if(v){insertAfter(v, after); after = v}});
									}
								}
							});
						if(tracks.length)
							obj.tracks = tracks;
					}
					case "If you like this title, you might also like...": {
						let objs = [];
						let f =compileXPath("self::table/tbody/tr/td");
						let parse = function(r){
							let obj = new Item([r]);
							obj.getAdditional({
									Image:".//a[starts-with(@href, 'ContentDetails.htm')]/img",
									Title:{xpath:"ancestor-or-self::*[parent::td][1]/following-sibling::*[descendant-or-self::a[starts-with(@href, 'ContentDetails.htm')]]", node:"Image-node"},
									Creator:{xpath:"following-sibling::div[not(a/img)]", node:"Title-node"},
									Author:"text()[contains(., 'by ')]/following-sibling::*[self::a]",
									Sample:"div/a[starts-with(@href,'http://excerpts.contentreserve.com/') and img]",
								});
							obj.enhance();
							objs.push(obj);
						}
						for each(var table in valueNode)
							$Z(f, parse, table);
						obj.suggestions = objs;
						break;
					}
					case "Geographic Rights": {
						if(success = valueNode.textContent.trim()) {
							this.countries = success.replace(/'S/g,"'s").split(/\s*,\s*(?![^,]+?\s[Oo]f(?:\s[Tt]he)?,)/);
							while((value = this.countries.indexOf("Virgin Islands")) > -1)//not sure how to catch this case in the split
								this.countries.splice(value, 2, this.countries.slice(value, value + 2).join(", "));
							m = valueNode;
							valueNode = [];
							for(let country of this.countries)
								if(value = SplitTextNode(findTextElementContaining(country, m), country)){
									valueNode.push(value);
									m = value.nextSibling;//If a value is repeated it won't properly split otherwise.
								}
						}
						break;
					}
					case "SmartLink":{
						if(success = (valueNode.search || false)){
							let search = search2obj(valueNode.search, true);
							let temp = {};
							//let searches = [];
							do{
								objFilter(search, ["id", "format"], temp)//I don't like this method nor do I trust it 100%, but it will work without any problem when used on WishListRemove
								//searches.push(search);
							}while(search.url && (search = search2obj(search.url.split("?").slice(-1)[0], true)));//if(search.action != "WishListRemove")//nested in a login link!
							objMerge(this, temp);
							success = objHasFields(temp, params);
							//log(searches, this)
						}
						break;
					}
					case "Creator Marketing":{ value = value || "creatorMarketing"; }
					//case "Excerpts":{ value = value || "excerpts"; }//doesn't work for libraries (not that we really care about parsing this)
					case "Reviews":{ value = value || "reviews";
						var half = [];
						if(valueNode.ownerDocument) {//overdrive
							half = doWhile(valueNode, "ancestor::tr[1]/following-sibling::tr[1]/td[table and count(*)=1]")
										.map(function(node){return {name:$X(compileXPath("table/tbody/tr[1]/td"), node), value:$X(compileXPath("table/tbody/tr[3]/td[2]"), node), base:node}});
						} 
						else {//library
							for(var i = 0; i < valueNode.length - 1; i++) {
								let name = $X(compileXPath("self::div[i]"), valueNode[i]), val = $X(compileXPath("self::div"), valueNode[i + 1]);
								//log(name, val);
								if(name && val) {
									half.push({name:name, value:val})
									i++;
								}
							}
						}
						if(half && half.length){
							this[value] = {};
							valueNode = [];
							for each(var nodes in half) {
								if(nodes.name && nodes.value){//doesn't always have a value in the first node.
									if(nodes.base)
										valueNode.push(nodes.base);
									else{
										valueNode.push(nodes.name);
										valueNode.push(nodes.value);
									}
									let c = nodes.name.textContent.trim();
									let b = c.replace(/^(?:\x97|&mdash;|\u2014)?(.*?)(?:[\s]*[\.]{3})?$/, "$1");
									let name = b.split("\n")[0].trim();
//									log(c, b, name, nodes.name, c[0], c.charCodeAt(0));
									nodes.name.setAttribute(value, "name");
									nodes.value.setAttribute(value, "value");
									let img = $X(compileXPath(".//img"), nodes.name);
									if(img) {
										nodes.image = img;
										if(img.alt)
											name = img.alt;
									}
									this[value][name] = m = {/**/nodes:nodes,/**/ name:name, html:nodes.value.innerHTML.trim()};
									let a = findTextElementContaining(name, nodes.name, null, "parent::a");
									if(a && a.href)
										m.href = a.href;
									let x = $X(compileXPath(".//a[.//text()[contains(., 'photo')]]"), nodes.name)
									if(x && x.href)
										m.photo = ReadJavascriptHref(x, "href").params[0];
								}
							}
						}
						break;
					}
					case "ASIN":{ value = value || "ASIN"; }
					case "Lib. ISBN":
					case "Ret. ISBN":
					case "ISBN":{ value = value || "ISBN";
						this[value] = String.prototype.slice.apply((valueNode.textContent || valueNode.value).trim(), params);
						break;
					}
					case "Released":
					case "Release date":{
						this["release-date"] = String.prototype.slice.apply(valueNode.textContent.trim(), params);
						break;
					}
					case "Date added":{
						this["date-added"] = String.prototype.slice.apply((valueNode.textContent || valueNode.value).trim(), params);
						break;
					}
					case "Edition":{
						//log(arguments)
						switch(obj.edition = String.prototype.slice.apply((valueNode.textContent || valueNode.value).trim(), params)){
//							case "Subtitled in English":
							case "Unabridged":{
								if(valueNode)
									getTag(valueNode).classList.add("field-unabridged");
								classAdd.push("item-unabridged");
								break;
							}
							case "Abridged"://{
							case "Slightly Abridged":
							case "Unabridged Selections":{
								if(valueNode)
									getTag(valueNode).classList.add("field-abridged");
								classAdd.push("item-abridged");
								break;
							}//}
						}
						break;
					}
					case "Library Provider(s)": this.provider_type = -2;//library
					case "Retailer(s)"://content reserve
					case "Retail Provider(s)": this.provider_type += 1;//retail
					case "Available at":{//search
						this.provider_groups.push(field);
						m = valueNode;
						valueNode = [];
						$Z(compileXPath(".//a[@href != '']"), function(a){
								if(!a.host)//try to fix it!
									a.href = a.href.split(" ")[0];
								if(a.host && a.host != server){//just to make sure it's not a local link.
									let provider = Providers.getProvider(a.host);
									let span = insertAsParent(document.createElement("span"), a);
									let bool = null;
									switch(provider.mode) {
										case "Active": case "Include":{
											a.classList.add("subscription-active");
											obj.subscription = "active";
											bool = true;
											break;}
										case "Inactive":{
											a.classList.add("subscription-inactive");
											if(obj.subscription != "active")
												obj.subscription = "inactive";
											bool = false;
											break;}
										case "Exclude": default:{
											a.classList.add("subscription-none");
											break;}
									}
									let ov = /^(?:www\.)?(?:overdrive|dlrinc|libraryreserve)\.com$/.test(a.host)
									if(ov)
										a.classList.add("subscription-overdrive");
									
									span.className = a.className;
									
									switch(provider.type){
										case "integrated":
											if(a.host != provider.host)
												a.host = provider.host;
											//some have added junk that is bogus... i'm hoping this works for all.
											a.pathname = "/"+a.pathname.split("/").slice(-1);
											break;
										case "isolated":
											if(x = provider.createLink("title", obj))
												a.href = x.href;
											else
												log("not enough data to construct title link", obj);
											break;
									}
									/*
									var po = {name: a.textContent.trim(), href: a.href, a:a};
									/*/
									let text = a.textContent.trim();
									let po = {name: provider.data.title || text, href: a.href, a:a, overdrive:ov};
									a.innerHTML = po.name;
									if(ov){
										let od = /(OverDrive Catalog|Digital Library Reserve, Inc.)(?: - (\S*)(?: - (.*))?)?/.exec(text);
										od && od[1] && (po.name = od[1]) && od[2] && (po.country = od[2]) && od[3] && (po.company = od[3]);
									}
									//*/
									if(bool !== null)
										po.supported = bool;
									if(po.country){
										var arr = obj.provider_countries[po.country];
										if(arr == null)
											obj.provider_countries[po.country] = arr = [];
										arr.push(po);
										span.setAttribute("country", po.country);
										a.setAttribute("country", po.country);
									}
									/*if(po.company){
										var arr = obj.provider_company[po.company];
										if(arr == null)
											obj.provider_company[po.company] = arr = [];
										arr.push(po);
										span.setAttribute("company", po.company);
										a.setAttribute("company", po.company);
									}*/
									obj.providers.push(po);

									if(x = $X(compileXPath("./following-sibling::text()[1]"), span))
										span.appendChild(x);
									//TODO
									//var textNode = 
									
									valueNode.push(span);
								}
							}, m);
						if(!obj.hasOwnProperty("subscription"))
							obj.subscription = "unavailable";
						break;
					}
					case "Available for library lending":{
						this.provider_type = -1;
						break;
					}
					case "Formats":{
						x = [];
						value = [];
						$Z(compileXPath("./li/@value | ./li/@data-allformats"), function(r,i){ value.push(Number(r.value)); x.push(r.ownerElement);}, valueNode);
						if(x.length){
							success = valueNode = x;
							if(Array.isArray(obj.formats)){
								for(let a of value)
									if(obj.formats.indexOf(a) == -1)
										obj.formats.push(a);
							} else {
								log("you collected them but didn't do anything with them", value);
							}
						}
						break;
					}
					case "FormatIcon":{
						if((m = valueNode.getAttribute("src").match(/\/Content\/images\/formatIcons\/Format([\d]*)Thumb\.gif/))) {
							value = Number(m[1]);
							if(isNaN(value))
								value = undefined;
							if(value === undefined)
								break;
						}
					}
					case "FormatHelp":{
						if(!value && (m = valueNode.getAttribute("href").match(/Help-Reader-Format([\d]*).htm/))) {
							value = Number(m[1]);
							if(isNaN(value))
								value = undefined;
						}
						if(value === undefined)
							break;
					}
					case "FormatType":
					case "Format Infomation":
					case "Format":{
						if(!value && ((valueNode.nodeName == "INPUT" && valueNode.type == "hidden") || (valueNode.nodeType == valueNode.ATTRIBUTE_NODE)) && valueNode.value)
							value = Number(valueNode.value);
						var format = value || Formats.Names[ a = String.prototype.slice.apply(valueNode.textContent.trim(), params) ];
						if(success = (format != null)) {
							var type = Formats.Numbers[format].type;
							if(obj.formats && obj.formats.push){
								if(obj.formats.indexOf(format) == -1)
									obj.formats.push(format);
							}
							else {
								throw new Error("i thought this code was dead!");
							}
						}
						else if(a) {//HACK!!! We aren't told what specific formats, but we need to know so we can filter.
							for  each(var c in Formats.Classes){
								if(c.title == a){
									if(this.formats && this.formats.push){/*/
										for each(let f in c.formats)
											if(this.formats.indexOf(f) == -1)
												this.formats.push(f);/*/
										this.formats.push(a);
										/**/
									}
									else {
										throw new Error("i thought this code was dead!");
									}
									success = true;
									break;
								}
							}
						}
						break;
					}
					case "Supplemental Formats":{
						var supplements = [];
						//this is specific to a particular webpage.
						$Z(compileXPath("table/tbody/tr[td[@colspan]]"), function(w){
								let box = new Item(doWhile(w, "./following-sibling::tr[position() = 1 and not(td[@colspan])]"));
								box.getAdditional({Pairs:{field:"td[1]/descendant-or-self::*[contains(text(), ':')]", value:"ancestor::tr[1]/td[2]"}});
								box.enhance();
								supplements.push(box);
							}, valueNode);
						this.supplements = supplements;
						break;
					}
					case "Author":
					case "Creator":{
						m = ((valueNode.textContent != null)?valueNode.textContent:valueNode.value).trim();
						if(!params.length && m.match(/^by\s/))
							params = [3];
						if(success = String.prototype.slice.apply(m, params).trim()){
							value = SplitTextNode(findTextElementContaining(success, valueNode), success) || undefined;
							if(m = $X(compileXPath("(ancestor::a)[starts-with(@href, 'BANGSearch.dll?')]"), value)){
								let num = search2obj(m.getAttribute("href").slice(15), true).id;
								this.creatorObjs = [find_id.exec(num)?{name:success, id:num, link:m, text:value}:{name:success, number:num, link:m, text:value}];
							}else
								this.creatorObjs = [{name:success, id:undefined, number:undefined, link:undefined, text:value}];
						}
						//else if(success != null)//I found a title without an author but it still has the place holder for it. Very strange
						//	this.creatorObjs = [{name:success, id:undefined, text:undefined}];
						break;
					}
					case "Creator(s)":
					case "Creators":{
						if(valueNode.nodeName == "TABLE") {
							if(success = (valueNode = $W(compileXPath("tbody/tr/td[1]"), valueNode)).length)
							{
								this.creatorObjs = [];
								for(let node of valueNode){
									let creator = node.textContent.trim();
									value = SplitTextNode(findTextElementContaining(creator, node), creator)
									if(value && (a =$X(compileXPath("ancestor::a[@href]"),value))){
										let num = search2obj(a.getAttribute("href").slice(15), true).id;
										this.creatorObjs.push(find_id.exec(num)?{name:creator, id:num, link:a, text:value}:{name:creator, number:num, link:a, text:value});
									} else
										this.creatorObjs.push({name:creator, id:undefined, number:undefined, link:undefined, text:value});
								}
							}
						} 
						else if(valueNode.nodeName == "UL") {
							if(success = (valueNode = $W(compileXPath("li/span"), valueNode)).length) {
								this.creatorObjs = [];
								for each(let node in valueNode){
									let [role, creators] = node.textContent.trim().split(/:\xA0\s*/g);
									for(let creator of creators.split(/\s*,\s*/)) {
									value = SplitTextNode(findTextElementContaining(creator, node), creator)
									this.creatorObjs.push({name:creator, role:role, id:undefined, number:undefined, link:undefined, text:value});
								}
							}
						}
						}
						else if($W(compileXPath("descendant-or-self::*[br and a]/a"), valueNode, success = []).length > 0){
							valueNode = success;
							this.creatorObjs = [];
							for each(let a in success){
								let creator = a.textContent.trim();
								if(creator)
								{
									let num = search2obj(a.getAttribute("href").slice(15), true).id;
									this.creatorObjs.push(find_id.exec(num)?{name:creator, id:num, link:a, text:a}:{name:creator, number:num, link:a, text:a});
								}
								else
									this.creatorObjs.push({name:creator, id:undefined, link:undefined, text:a});
							}
						}
						else if(success = valueNode.textContent.trim()) {
							let names = success.split(",")
								.map(function(s){return s.trim();})
								.filter(function(v){return v != "na Not Applicable";});
							m = valueNode;
							valueNode = [];
							this.creatorObjs = [];
							for each(let creator in names){
								valueNode.push(value = SplitTextNode(findTextElementContaining(creator, m), creator));
								if(value && (a =$X( compileXPath("ancestor::a[@href]"),value)))
								{
									let num = search2obj(a.search, true).id;
									this.creatorObjs.push(find_id.exec(num)?{name:creator, id:num, link:a, text:value}:{name:creator, number:num, link:a, text:value});
								}
								else
									this.creatorObjs.push({name:creator, id:undefined, link:undefined, text:value});
							}
						}
						break;
					}
					case "Language(s)":{
						if(valueNode.nodeName == "TABLE") {
							if(success = (valueNode = $W(compileXPath("tbody/tr/td[1]"),valueNode)).length)
								this.languages = valueNode.map(function(c){return c.textContent.trim();});
						}
						else if(success = valueNode.textContent.trim()) {
							this.languages = success.split(",").map(function(s){return s.trim();});
							m = valueNode;
							valueNode = [];
							for each(let language in this.languages)
								if(value = SplitTextNode(findTextElementContaining(language, m), language))
									valueNode.push(value);
						}
						break;
					}
					case "Size":{
						value = valueNode.textContent.match(/\(((?:\d+|\(unknown\)) [yzeptgmk]?b)\)/i)[1];
					}
					case "File Size":
					case "File size":{
						var text = (value || (value = valueNode.textContent)).trim().split(" ");
						//let mult = params || 1024;
						let size;
						if(text[0] == "(unknown)") {
							text[1] = "b";
							size = "unknown";
						}
						else
							size = Number(text[0]);
						switch(text[1].toLowerCase()) {
							case "yb"://does the script really need to be this future proof?
								size = size * 1024;
							case "zb":
								size = size * 1024;
							case "eb":
								size = size * 1024;
							case "pb":
								size = size * 1024;
							case "tb"://this isn't likely
								size = size * 1024;
							case "gb"://this could happen
								size = size * 1024;
							case "mb":
								size = size * 1024;
							case "kb"://in reality, i've never seen anything other than kb, even when another denomination would make more sense.
								this["approximate-size"] = Math.round(size * 1024);//They started using rounded decimal places.
								break;
							case "b":
								this["approximate-size"] = this.size = size;
								break;
							default:
								success = false;
						}
						break;
					}
					case "Series":{
						valueNode = $X(compileXPath("a"), valueNode) || valueNode;
						var text = valueNode.textContent.trim();
						if(text != "Abridged")//Catch a data entry mistake.
						{
							if(valueNode.href && (m = valueNode.href.match(find_id)))
								this["series-uuid"] = m[1];
							if(text.match(/ Series$/))//Series in the series field is superflous (and confuses things)
								text = text.slice(0,-7);
//							log(text)
							this['series-sort'] = this.textSort(this.series = text);
						}
						//log(text);
						break;
					}
					case "Subtitle":{
						this.subtitle = valueNode.textContent.trim();
						break;
					}
					case "Average rating":
					case "My rating":{
						valueNode = $X(compileXPath("following-sibling::ul[1]"), rr)
						break;
					}
					case "Library copies":{
						//Number.POSITIVE_INFINITY;
						if(success = $X(compileXPath("noscript/text() | text()[count(../node()) = 1]"), valueNode))
							this.libraryCopies = (((value = (valueNode = success).textContent.trim()) == "always available")?Number.POSITIVE_INFINITY:Number(value));
						break;
					}
					case "Title":{
						valueNode = $X(compileXPath("a"), valueNode) || valueNode;
						if(success = (valueNode.textContent || valueNode.value)) {
							this.title = String.prototype.slice.apply(success.trim(), params);
						}
						if((m = ReadJavascriptHref(valueNode, "href")).success && m.name == "TitleInfo") {
							this.id = m.params[0];
							this.formats.push(m.params[1]);
						}
						else if(valueNode.search && (m = valueNode.search.match(find_id)))
							this.id = m[1];
						else if(valueNode.pathname && 
							((m = valueNode.pathname.split("/"))[1] == "ti") &&
							(m = m[2].match(/^([\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12})-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)$/))
						){//"c279485c-b814-461a-b8d5-944762dfbb95-425-1-1-1-1"
							this.id = m[1];
							let format = Number(m[2]);
							//3 -> 6 pertain to the search
							//showEbooks=m[3]
							//showAudiobooks=m[4]
							//showMusic=m[5]
							//showVideo=m[6]
							if(this.formats && this.formats.push)
								if(this.formats.indexOf(format) == -1)
									this.formats.push(format);
						}
						break;
					}
					case "Img":
					case "Image":{
						if(valueNode.nodeName === "NOSCRIPT")
							valueNode = evalNoScript(valueNode, document.createElement("div"));
						valueNode = $X(compileXPath("descendant-or-self::img"), valueNode) || valueNode;// | parent::link
						if(valueNode.alt && !this.title) {
							if(m = /^Click here to view (.*?) details for (.*) by (.*)$/.exec(x = valueNode.alt.trim())) {
								if(!this.creator && m[3])
									this.creatorObjs = [{name:m[3], id:undefined, text:undefined}];
								this.title = m[2];
							}
							else
								this.title = x;
						}
						if(valueNode.getAttribute("src") == "system/spacer.gif" && valueNode.hasAttribute("data-original")){
							//some script in charge of propegating this doesn't get called with autopaging. This is the wrong place for this but it requires the least amount of code to fix it here.
							//Otherwise I'd have to add preprocessing ugg.
							valueNode.src = valueNode.getAttribute("data-original")
							if(valueNode.style.height == "0px")//this is insane, why did they do this?
								valueNode.style.removeProperty("height");
						}
						if(valueNode.hasAttribute("data-publisher"))
							this.publisherNumber = valueNode.getAttribute("data-publisher");
						if(valueNode.src)
							this.image = valueNode.src;
						if(!this.id && (m = ((a = $X(compileXPath("ancestor::a[1]"), valueNode)) && a.search.match(find_id) || (valueNode.src && valueNode.src.match(find_id)))))
							this.id = m[1];//prefer the id in the link over the one in the image. but beggers can't be choosers.
						break;
					}
					case "ID":{
						if(((valueNode.nodeName == "INPUT" && valueNode.type == "hidden") || (valueNode.nodeType == valueNode.ATTRIBUTE_NODE)) && valueNode.value)
							this.id = success = valueNode.value;
						break;
					}
					case "IdExtractor":{
						if(!this.id && (m = ((a = $X(compileXPath("ancestor-or-self::a[1]"), valueNode)) && (a.search + a.hash).match(find_id) /*|| (valueNode.src && valueNode.src.match(find_id))*/)))
							this.id = success = m[1];//prefer the id in the link over the one in the image. but beggers can't be choosers.
						break;
					}
					case "Publisher":{
						this.publisher = valueNode.textContent.trim();
						break;
					}
					case "ServicerTypes":{
						x = [];
						a = {};
						if(m = $X(".//div/a[img[@alt='WorldCat']]", valueNode)) {
							a.worldcat = (m.parentNode.style.display != "none") && m.href.length && m.href;
							classAdd.push("worldcat-"+(a.worldcat?"available":"unavailable"));
						}
						else
							classAdd.push("worldcat-unknown");
						if(m = $X(".//div[a/img[@alt='Find at a Library']]", valueNode)) {
							x.push(m);
							a.library = (m.style.display != "none");
							classAdd.push("library-"+(a.library?"available":"unavailable"));
						}
						else
							classAdd.push("library-unknown");
						if(m = $X(".//div[a/img[@alt='Find at a Bookstore']]", valueNode)) {
							x.push(m);
							a.store = (m.style.display != "none");
							classAdd.push("store-"+(a.store?"available":"unavailable"));
						}
						else
							classAdd.push("store-unknown");
						if(x.length){
							this.servicerTypes = a;
							valueNode = x;
						}
						break;
					}
					case "WishList":{
						if(!obj.title)
							obj.title = valueNode.getAttribute("title").slice(1,-1);//wrapped in single quotes
						if(!obj.id)
							x = valueNode.getAttribute("value");
						if(m = $X(compileXPath("img"), valueNode)){
							obj.wishlist = m.getAttribute("data-wishlist");
							if(!obj.id)
								x = m.className;
						}
						if(!obj.id && x && (x = x.match(find_id)))
							obj.id = x[1];
						break;
					}
					case "Recommend":{
						x = {"image":"data-rtlimgsrc", "title":"data-rtltitle", "subtitle":"data-rtlsubtitle", "id":"data-rtlcriddata"};
						for(let [i, v] in new Iterator(x)) {
							if(!obj[i] && valueNode.hasAttribute(v)) {
								obj[i] = valueNode.getAttribute(v);
							}
						}
						if(!obj.status) {
							if(m = $X(compileXPath("a"), valueNode)){
								obj.status = "recommend"
							}
							else if(m = $X(compileXPath("img"), valueNode)){
								obj.status = "recommended"
							}
						}
						break;
					}
				}
//				log(arguments);
				if(classAdd = classAdd.join(" "))
					for each(var root in this.pieces)
						root.className = root.className ? root.className + " " + classAdd : classAdd;
				return (success || success === "")?valueNode:undefined;
			},
		/*saveCopies: function(server_obj){
				let obj = this;
				let dirty = false;
				if(obj.id && server_obj && server_obj.waitinglist) {
					let copies = [];
					let found;
					if(server_obj.copies && server_obj.copies.length)
						copies = server_obj.copies;
					if(Array.isArray(obj.formats)) {
						for each(var item in server_obj.waitinglist){
							if(item.id == obj.id && obj.formats.indexOf(item.format) != -1) {
								copies = copies.filter(function(obj){return item.id != obj.id || obj.format != item.format;}).concat({
										id:item.id,
										format:item.format,
										copies:obj.libraryCopies,
										loaded:new Date(document.lastModified).getTime(),
									});
								dirty = true;
							}
						}
					}
					else {
						for each(var item in server_obj.waitinglist){
							if(item.id == obj.id && (found = obj.formats[item.format])) {
								copies = copies.filter(function(obj){return item.id != obj.id || obj.format != item.format;}).concat({
										id:item.id,
										format:item.format,
										copies:(this.copies !== undefined)?this.libraryCopies:found.libraryCopies,
										loaded:new Date(document.lastModified).getTime(),
									});
								dirty = true;
							}
						}
					}
					if(dirty)
						server_obj.copies = copies;
				}
				return dirty;
			},/**/
		installMetadataForFiltering: function(){
				let node = this.pieces[0];
				let div;
				if(node) {
					let old = $X(compileXPath("div[@class = 'HiddenSearchable']"), node)
					div = document.createElement("div")
						div.className = "HiddenSearchable";
					//serialize
					for each([name, property] in new Iterator(this.translator)) {
						let value = GetFieldValue(this, property);
						if(value !== undefined){
							if(Array.isArray(value)) {
								let div2 = div.appendChild(document.createElement("div"));
									div2.setAttribute("block", name);
								for each(let val in value){
									let span = div2.appendChild(document.createElement("span"));
									span.setAttribute("parsed", name);
									span.setAttribute("typeof", typeof(val));
									span.appendChild(document.createTextNode(name+":"+val));
									div2.appendChild(document.createElement("br"));
								}
							}
							else {
								let span = div.appendChild(document.createElement("span"));
								span.setAttribute("parsed", name);
								span.setAttribute("typeof", typeof(value));
								span.appendChild(document.createTextNode(name+":"+value));
								div.appendChild(document.createElement("br"));
							}
						}
					}
					if(old)
						replace(div, old);
					else
						node.appendChild(div);
				}
				return div;
			},
	},{
		pieces: WrapNewArray, 
		formats: WrapNewArray,
		nodes: WrapNewObject,
		creatorObjs: WrapNewArray,
	}, true), {//darn expensive to generate, so lets delay doing it until we have to.
		translator:function(){return {
				"title":"title",
				"series":function series(){ return this.Series || ""; }, 
				"creator":"creators", 
				"book":"series-position",
//				"added":function(){if(this.addedToWishlist){  }},
			};},
		subtitleParser:function(){//this function generates the value
			//way too complicated regexp
			//Christian History and Biography Issue 78, vol. 22, No. 2
			//http://erl.lib.overdrive.com/BANGSearch.dll?Type=Creator&ID=364561
				var series = "(?:\\s+(?:Series))?";
				var type = "(?:[bB]ook|Vol(?:ume|)|Part|Episode|Novel|Issue|Chapter|No\\.)";
				var number = "(#?\\s*[0-9]+(?:\.[0-9]+)?|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|[IVXLCDMV]+)";
				var numberNoCapture = "(?:"+number.slice(1);
				var thru = "\\s*?(?:-|\\s+(?:[Tt]o|[Tt]hrough|[Tt]hru)\\s+)\\s*";
				let many = type+"s\\s+(?:"+[//{//multiple
							"("+numberNoCapture+"+(?:,\\s+"+numberNoCapture+")*),?\\s+(?:and|&)\\s+"+number,
							"([A-Y])"+thru+"([B-Z])",
							number+thru+number,
						].join("|")+")";//}
				let manypos = ["comma", "single", "ras", "rae", "rns", "rne"];//6
				var position = "("+[//{
						type+"\\s*"+number + "(?:\\s+\\("+many+"\\)|)", //single
						many,
						"[cC]ollection\\s+"+number+thru+number,//grrrr no type!
					].join("|")+")";//}
				var expr = "^(?:"+[//{
							"A (.*?) Digital Collection: "+position,//1, 2-17
							"(?:From\\s+|)(.*?),?"+series+"(?:[:,]\\s*|\\s+-\\s+|\\s+)"+position+"(?: of "+number+")?",//18, 19-34, 35
							position + " of the (.*?)"+series,//36-51, 52
							"(?:Stories from|A Novel of) (.*)",//53
							"(An? (.*?) (?:Novel|Mystery|Story|Novella(?: (?!to ).*)?))(?::\\s*\\54|)",//54, 55
							"(" + many + "): ((?:[^/]+?/)*[^/]+)",//56, 57, 58, 59, 60, 61, 62, 63
							"(.*?) "+number+":\\s+(.*)",//64, 65, 66
							"(.*?)"+series+"\\s+(#[1-9][0-9]*)",//67, 68
							"(.*?) Series, (#?[1-9][0-9]*)",//69, 70
							"(Part ([1-9][0-9]*))(?: of | ?/ ?)([1-9][0-9]*)",//71, 72, 73
							"(" + many + ")",//74, 75, 76, 77, 78, 79,  80
							"(.*?)(?: Audio)? (Collection)",//81, 82
							"(.*?) \\((.*?), "+position+"\\)",//83, 84, 85-100	don't forget to properly escape slashes!!!
							"(Volume ([1-9][0-9]*[A-Z]))",//101, 102
						].join("|")+")$";//}
				var pos = ["positionText", "single", ...manypos, ...manypos, "rns", "rne",];//16
				var map = ["all", //{ //0
					"series", ...pos,//1, 2-17
					"series", ...pos, "seriesTotal",//18, 19-34, 35
					...pos, "series",//36-51, 52
					"stories", //53
					null, "stories", //54, 55
					"positionText", ...manypos, "titles",//56, 57-62, 63
					"series", ["positionText", "single"],"title", //64, 65, 66
					"series", ["positionText", "single"], //67, 68
					"series", ["positionText", "single"], //69, 70
					"positionText", "single", "seriesTotal",//71, 72, 73
					"positionText", ...manypos, //74, 75, 76, 77, 78, 79,  80
					"stories", "collection",//81, 82
					"title", "series", ...pos, //83, 84, 85-100
					"positionText", "single",//101, 102
					];//}
				var parse = {single:parseNumber, comma:parseComma, rns:parseNumber, rne:parseNumber, seriesTotal:parseNumber, titles:parseTitles};
				
				function parseRomanFast(str){//WARNING: Does not check for input validity
					var numerals = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
					for(var last = 0, total = 0, i = str.length - 1;  0 <= i; i-- ) {
						var value = numerals[str[i]];
						total = (value < last)?(total - value):(total + (last = value));
					}
					return total;
				}
				function parseNumber(raw){
						var e = /^\s*(?:#?\s*([0-9]+(?:\.[0-9]+)?)|([IVXLCDMV]+)|(One|Two|Three|Four|Five|Six|Seven|Eight|Nine))\s*$/.exec(raw);
						if(e === null)
							return raw;
						var [value, digit, roman, word] = e;
						if(roman)
							return parseRomanFast(value);
						if(word)
							return {One:1,Two:2,Three:3,Four:4,Five:5,Six:6,Seven:7,Eight:8,Nine:9,}[value];
						return Number(digit);
					}
				function parseComma(value){ return value.split(",").map(parseNumber); }
				function parseTitles(value){ return value.split(" / "); }
					
				var r = execWithNameAccessors(new RegExp(expr), map, parse)
				//"A Companion Novella to Cry Wolf" do no parse this!
				//A Bartimaeus Novel: A Bartimaeus Novel
				//A Wild About You Novella An eSpecial from New American Library
				//Aurora and the Helpful Dragon (Princess Hearts Classic Storybook #3) http://search.overdrive.com/classic/retail/TitleInfo.asp?TitleReserveID=%7B85DB024A-6B64-4EC2-97C2-7EFC9DF01355%7D&TitleFormatID=302
				//let t = "Volumes One Through Three: The Sword of Shannara / The Elfstones of Shannara / The Wishsong of Shannara";
				//log({a:[t, r.exec(t), "Volumes One Through Three".match(new RegExp(many))]});
				return r;
			},
	}, undefined, false);
//}
//{ FormatItem
/*/
function FormatItem(parent, pieces) {
	Item.call(this, pieces);
	this.pieces;//do not remove these three lines, they ensures child and parent are not confused.
	this.nodes;
	this.formats;
//	this.format = null;
	this.__proto__ = parent;
}
/*/
function FormatItem(parent, pieces) {
	let t = function(pieces){
			//do not remove these lines, they ensures child and parent are not confused, despite child inheriting everything else from the parent.
			let p = Object.getPrototypeOf(parent);
			for each(var name in ["pieces", "nodes", "formats"])
				Object.defineProperty(this, name, getPropertyDescriptor(p, name));
			Item.call(this, pieces);
//			redirectGetter(p, "format", this);
		};
	t.prototype = parent;
	return new t(pieces);
}
/**/
FormatItem.prototype = objCreateWithSelfDestructingAccessors(Item.prototype, null, {});
//}
//{ ServiceItem
function ServiceItem(book, splitter, id, additional){
	Item.call(this);
	if(book)
		this.addPieces(book);
	
	this.pieces = this.pieces.reverse();//solves sorting problem later!
	if(splitter && this.addPieces(splitter))
		splitter.classList.add("item-splitter");
	this.pieces = this.pieces.reverse();//solves sorting problem later!

	if(id && (!additional || !additional.ID))
		this.getAdditional({ID:id});
	if(!additional || !additional.Image)
		this.getAdditional({Image:".//img[(@name='coverImg' or @name='cover' or (not(@name) and string-length(@alt) > 0)) and @src]"});// | ancestor::html/head/link[@image_src]/@href
	if(additional)
		this.getAdditional(additional);
	
	let t;
	if(!this.id && (t = location.search.match(find_id)))
		this.id =  t[1];
	
	this.enhance();
}
ServiceItem.prototype = objCreateWithSelfDestructingAccessors(Item.prototype, {
		subscription:"unavailable",
		titleLinkType:"title-search",
		provider_type:0,
	}, {
		providers: WrapNewArray, 
		provider_groups: WrapNewArray, 
		provider_countries: WrapNewObject,
	});
//}
//{UpdateURL
function UpdateURL(name, params){
	this.name = name;
	this.search = params ? "?" + obj2post(params) : "";
}
Provider.prototype = {
	getURL: function(host) {
		return "http://" + this.host + "/" + this.name +".htm" + this.search;
	}
};
//}
//{ Provider
function Provider(host, mode, local){
	this.host = host;
	this.mode = mode;
	this.local = host && local;
	ProviderBase.call(this);
//		this.parsers = Array.slice(arguments, 2).concat();
	switch(host){
//			default: return;
		case "www.booksonboard.com":
			quickSetValueProperty(this, "type", "isolated");
			quickSetValueProperty(this, "linkTypes", {title:{href:"sellers/halfsteps/ir.php?CRID={id}-{format}&sellerID=0996-0001", fields:{format:"format", "id":function(){return this.id.match(find_id)[1];},}, abbr:"T"}});
			break;
	}
}
Provider.prototype = objCreate(ProviderBase.prototype, {
		type: "integrated",
		linkify: function(obj){ ProviderBase.prototype.linkify.call(this, obj); if(this.mode == "Include") this.getDataCache().ignorable(obj); },
		getDataCache:function(){
			return this.Data || (this.Data = this.data);
		},
		saveData:function(){
			return this.Data?(this.data = this.Data):(this.Data = this.data);
		},
		get data(){//using this needs to be phased out in favor of getDataCache and saveData.
			var text = GM_getValue(this.host, "");
			try {
				var obj = text && JSON.parse(text) || {};
			} catch(e){
				var obj = {};
			}
			obj.__proto__ = Provider.ProviderData || installProviderData();
			return obj;
		},
		set data(v){//using this needs to be phased out in favor of getDataCache and saveData.
			if(!v || this.mode !== "Include")
				GM_deleteValue(this.host);
			else
				GM_setValue(this.host, JSON.stringify(v));
		},
		updateHost:function(host){
			if(host != this.host){
				let old = this.host;
				let data = this.Data || this.data;
				this.host = host;
				GM_deleteValue(this.host);
				this.data = data;
			}
		},
		housekeeping:function(page, signed_in){
				let dobj = this;
				let server_obj = this.getDataCache();
				let now = new Date().getTime();
				if((dobj.mode == "Include") && server_obj) {
					dobj.data = server_obj;
					//infinate nesting is bad, so we catch it via the hash
					if(!dobj.noAutoUpdate) {
						if(server_obj.secure == "libraryreserve" || (server_obj.features && server_obj.features.waitinglist))
							this.update_page(page, "max", DefaultCheckoutPeriod);
						this.update_page(page, "formats", DefaultCheckoutPeriod);
//						this.update_page(page, "features", DefaultCheckoutPeriod);
						if(signed_in) {
							this.update_page(page, "waitinglist", 1);
							if(this.update_page(page, "checkedout", 1) == -2 && (server_obj.checkedout.sort(function(a, b){ return a - b; })[0] - now) < 0)
								this.update_page(page, "checkedout");
						}
					}
				}
			},
		update_page: function(page, name, days){
				let load = this.update_page_map[name];
				if(!load)
					return -3;
				let url = load.getURL(this.host) + "#embedded";
				
				if($X(compileXPath("//iframe[@src='"+url+"']")))
					return -1;
				
				let server_obj = this.data;
				let now = new Date().getTime();
				if((page == load.toLowerCase()) || (name && server_obj[name] && !((days * 86400000) < (now - server_obj[name+"_load"]))))
					return -2;

				if(!document.body)
					return 0;
			
	//			log(load)
			
				var iframe = document.createElement("iframe");
					iframe.frameBorder=iframe.width=iframe.height="0";
	//				iframe.docShell.allowImages = false;//disable image loading - don't need them
	//				iframe.docShell.allowAuth = false;//extra security
					iframe.src = url;
					document.body.appendChild(iframe);
				return 1;
			},
		linkTypes:{
			enhanced:{href:"EnhancedDetails.htm?id={id}", fields:["id"], abbr:"E"},
			publisher:{href:"BANGSearch.dll?Type={type}&ID={publisherNumber}&PerPage={page}", fields:["publisherNumber"], pairs:{type:"Publisher", page:QuickSearchsCount}, title:"Search for other titles by this publisher", abbr:"P"},
			series:{href:"BANGSearch.dll?Type={type}&ID={id}&PerPage={page}", fields:["id"], pairs:{type:"Series", page:QuickSearchsCount}, title:"Search for other titles in this series", abbr:"S"},
			creator:objMerge([
				{href:"BANGSearch.dll?Type={type}&ID={id}&PerPage={page}", fields:{"id":["creatorNumber", "creatorId"]}, pairs:{type:"Creator", page:QuickSearchsCount}},
				{post:"BANGSearch.dll?URL=SearchResultsGrid.htm", fields:{"Creator":"creator"}, optional:{}, serialize: emQuote, extras:{"PerPage":QuickSearchsCount, "Sort":"SortBy=Relevancy"},},
				],{title:"Search for other titles by this creator", abbr:"C"}),
			title:[
				{href:"ContentDetails.htm?id={id}", fields:["id"], abbr:"T"},
				{post:"BANGSearch.dll?URL=SearchResultsGrid.htm", fields:{"Title":"title","Format":"Formats"}, escape:processForSort, optional:{}, abbr:"TS", serialize: emQuote, extras:{"PerPage":QuickSearchsCount, "Sort":"SortBy=Relevancy"}}
			],
			"title-search":{post:"BANGSearch.dll?URL=SearchResultsGrid.htm", fields:{"Title":"title"}, optional:{}, abbr:"TS", serialize: emQuote, extras:{"PerPage":QuickSearchsCount, "Sort":"SortBy=Relevancy"}},
			CartAdd:{href:"BANGCart.dll?Action={action}&ID={id}", fields:["id"], pairs:{action:"Add"}, title:"Add to Cart", abbr:"+C"},
			CartRemove:{href:"BANGCart.dll?Action={action}&ID={id}", fields:["id"], pairs:{action:"Remove"}, title:"Remove from Cart", abbr:"-C"},
			WishListAdd:{href:"BANGAuthenticate.dll?Action=AuthCheck&ForceLoginFlag=0&URL=BANGCart.dll%3FAction%3D{action}%26ID%3D{id}", fields:["id"], pairs:{action:"WishListAdd"}, title:"Add to Wishlist", abbr:"+W"},
			WishListRemove:{href:"BANGAuthenticate.dll?Action=AuthCheck&ForceLoginFlag=0&URL=BANGCart.dll%3FAction%3D{action}%26ID%3D{id}", fields:["id"], pairs:{action:"WishListRemove"}, title:"Remove from Wishlist", abbr:"-W"},
		},
		parse:function(page, location, signed_in){
			var sp = this;
			var server_obj = this.getDataCache();
			var dirty = false;
			
			if(!page)
				(page = /\/([^.\/]+)\.htm$/.exec(location.pathname)) && (page = page[1].toLowerCase());
			//if(!lang)//hack, too lazy to build the regex at the moment to detect the lang from the url.
			//	lang = languages["default"];
			//TODO put lang in dobj or dobj.data, the url is not always accurate.
			
			var title = $X("//td[@class='pghead'] | //div[@class='pageMainAreaHeader']");
			var main = title && $X("ancestor::table[1]/..", title) || $X("//a[@name='maincontent']/following-sibling::table[last()]");
			if(!title && main)
				title = $X("preceding-sibling::table[1]//*[string-length(text())>3]", main);
			//else if(!title)
			//	title = $X("")
			
			if(title && title_link)
				title.innerHTML = "<a href='"+title_link+".htm'>"+title.innerHTML+"</a>";
			
			let error;
			let errorType;
			
			if(error = (page == "error")){
				switch((errorType = search2obj(location.search).ErrorType))
				{
					case "1330": page = "mywaitinglist"; break; //maxed out on holds
					case "1320": page = "mywaitinglist"; break; //nothing being waited upon
					case "1000": page = "mybookshelf"; break; //nothing checked out
					case "750": break; //The title you are trying to view is protected and not available while signed out. Sign in to view your Bookshelf.
					case "210": break; //book not found, caused by a variety of reasons.
					case "200": //page = "cart"; break;
					case "220": page = "cart"; break;
					case "100": page = "searchresults"; break;
					case "320": page = "login"; break;//We're sorry, but the specified library patron account information is not valid. Details: Please try your card again or contact support. (Details: Failed HTTP Request to Library's ILS server.)
				}
			}
			if(errorType)
				errorType = Number(errorType);
			
			log("page: " + page)
			
			var title_link = page;
			
			if(!server_obj)
				error = true;
			if(title && title.innerHTML == "Invalid Page Request")
				error = true;
			
			var page_mode = 0;
			var page_array = [];
			var done = true;
			
			let ContentBase = $X("//*[comment()[.=' ************************* BEGIN PAGE CONTENT ************************* ' or .=' ************************** END PAGE CONTENT ************************** '] or table[@class='breadCrumbs'] or a[@name='maincontent'] or img[@id='WishListCmd']]");

			GM_addStyle([//{
					"table[parsed='If you like this title, you might also like...'] tbody { vertical-align:top; }",
					"span.links, .links .sup, span.links > div.links { font-size:9px!important;  vertical-align: top; }",
					"span.right { float:right; margin: 0;}",
					"span.links { margin-left: 1px;}",
					".pageturn-img, #coverOverlay { opacity: 0.5; }",
				].join("\n"));//}
			
			switch(page) {
				//PerPage works on MyAccount.htm
				case "recommend":{
					if(!error) {
						var obj = new Item();
						obj.getAdditional({
								Recommend:{form:"//form[@action='BANGAuthenticate.dll?Action=EmailRecommendation']", map:{"reserve_id":"ID", "title":"Title", "primary_creator_name":"Author"}},
								Title:{xpath:"preceding-sibling::p/strong[u]", node:"Recommend-form"},
								Creator:{xpath:"following-sibling::text()", node:"Title-node", params:[5, -65]},
//								Pairs:{field:"../tbody/tr/td[1]", value:"following-sibling::td[last()]/*[self::b or self::strong]", node:"LibraryWaitingList-form"},
//								DeComment:{xpath:"../tbody/comment()", parse:function(r){ (evalNoScript(r, null, ["table", "tbody"], true), arguments)}, node:"LibraryWaitingList-form"},
//											Subtitle:{xpath:".[contains(.//text(), ': ')]", node:"Title-value"},//no subtitle if there is no splitter.
							});
						obj.enhance();
						sp.linkify(obj);
						
						if(obj.nodes["Title-node"])//not enough info for a full title link.
							obj.nodes["Title-node"].appendChild(OverDrive.createServiceLinks(document.createElement("span"), obj, "title")).className = "links";//"title-search"
						
						log(obj);
					}
					break;
				}
				case "contentdetails-streetdate":{//URL available
					var obj = new Item(["//div[@id='iframeHolder']"])
					obj.id = search2obj(location.search, true).id;
					obj.formats = {};
					obj.getAdditional({
							Title:{xpath:"//strong[starts-with(text(),'What are the release date(s) for')]", params:[34, -2]},
							Formats:{xpath:"table/tbody/tr", parse:function(r){
								var f = new FormatItem(obj, [r]);
								f.id = obj.id;
								f.getAdditional({
										Format:{xpath:"td[1]", params:[0, -1]},
										"Release date":"td[2]/noscript",
									});
								obj.formats[/*f.format = */f.format] = f;
//								delete f.formats;
								return r;
							}},
						});
						
					obj.enhance();
					sp.linkify(obj);
					log(obj);
					break;
				}
				case "contentdetails-coll": //saw this one in the wild, had a section expanded. Is this an edge case?
				case "contentdetails":{
				//TODO: handle library advantage
				//http://library2go.lib.overdrive.com/ContentDetails.htm?ID=E8FF68E3-F9F8-4C3D-A9DC-58F0A1BA72FA
					GM_addStyle([
						"div.mainContainer div.row > div.columns.six { width:65%; }",
						"div.mainContainer div.row > div.columns.six + div.columns.six { width:35%; }",
						].join("\n"));
					title_link = null;
					let base = ContentBase;
					let obj = new Item([base]);
					obj.id = search2obj(location.search, true).id;
					//obj.formats = {};
					//obj.titleLinkType = "title-search"

					let version = $X("id('cover_img')") != null;
					
					/*
					//how annoying ~_~ should probably add h2 and h4
					let titles = ["h1", "h3", "h5"];
					let selfs = "[not("+titles.map(function(n){return "self::"+n;}).join(" or ") + " or self::b)]";
					let expr = [//{ //easier to read spread out this way.
												"./following-sibling::*[1]"+selfs,
												"./following-sibling::*[1][self::b]/*[1]"+selfs,//the html quality is horrible!!! read into b tags as if they aren't there. // and not(parent::b)
												//"./parent::b/following-sibling::*[1][not(self::h1 or self::h5 or self::b)]",//having dug into the b, this digs out. this is not needed because of how this error is generated.
											].join(" | ");//}
					
					let additionals = {
							Format:".//h3",
							Pairs:{ field:".//div[contains(concat(' ',@class,' '), ' format_info_left ')]",  value:"following-sibling::div[contains(concat(' ',@class,' '), ' format_info_right ')][1]"},
							szDuration:{script:"szDuration", field:"duration", testNull:false},
//							Subtitle:".//div[@id = 'subtitle']",
						};
					*/
					obj.getAdditional({
							/*SectionsPair:{field:"("+titles.map(function(n){return "descendant::"+n;}).join(" | ")+")", end:"", value:function(r){
									var m = doWhile(r, expr);
									var n = m.slice(1);
									var s = m[0]
									n.forEach(function(v, i){ insertAfter(v, m[i]); });
									return n;//.reduce(function(array, node){ return array.concat(node.nodeName == "B"?Array.slice(node.children):[node]); }, []);
								}},*/
							Formats:".//ul["+xPathListContains("@class", "formats-at-download")+"]",
							TitleInfo:{field:".//div[@id='formatInfoExpand']/ul/li/div[1]/div[1]/h6[1]", value:function(t, i, obj, name, alt, results){
									let title = t.textContent.trim();
									let r = $X("ancestor::li[1]", t);
									switch(title) {
										case "Publisher":{
											return $X("./div[2]/div[1]", r);
										}
									}
									var f = new FormatItem(obj, [r]);
									let fn = Formats.NameLookup(title);
									if(fn)
										f.formats.push(fn);
									f.getAdditional({
										"Pairs":{field:"./div[count(div)>1]/div[1]", value:"./following-sibling::div[1]"},
										szFormatType:{script:"szFormatType", number:"format", testNull:false},
									});
									if(f.format){
										if(Array.isArray(obj.formats)){
											a = obj.formats;
											obj.formats = b = {};
											for(n of a)
												b[n] = undefined;
										}
										obj.formats[f.format] = f;
										return;//We have parsed it.
									}
									//values returned by this function result in the pair get parsed.
									return $W("./div[position()>1]", r);//pretty sure I can do this.
								}, end:""}, 
							szEdition:{script:"szEdition", field:"edition", testNull:false},
							szSeries:{script:"szSeries", field:"series", testNull:false},
							szImprint:{script:"szImprint", field:"imprint", testNull:false},
							//Pairs:{field:"ancestor::td[1]//tr/td[1][b]", value:"../td[2]", node:"szImprint-script"},
							Title:{xpath:".//div[@id='detailsTitle']/h3"},
							//Edition:{xpath:"ancestor::div[1]/following-sibling::div[starts-with(text(),'Edition: ')]", node:"Title-node", params:[9]}, 
							//Series:{xpath:"ancestor::div[1]/following-sibling::div[text()='Series: ']", node:"Title-node"}, 
							Subtitle:".//div[@id = 'subtitleDetails']/h6",
							Creators:{xpath:".//div[@id='creatorDetails']/h5/a | .//div[@id='creatorSubDetails']/ul/li/h6/a", parse:function(a, i, obj, name, alt, results){
								//results.push(r);
								if(!obj.creatorObjs) obj.creatorObjs = [];
								let name = a.textContent.trim();
								let value = SplitTextNode(findTextElementContaining(name, a), name);
								let num = search2obj(a.search, true).id;
								obj.creatorObjs.push(find_id.exec(num)?{name:name, id:num, link:a, text:value}:{name:name, number:num, link:a, text:value});
								return a;
							}},
							Image:".//a[starts-with(@href,'ContentDetails-Cover.htm?')]/img",
							//Sample:{xpath:"../following-sibling::div/a[starts-with(@href,'http://excerpts.contentreserve.com/') and img]", node:"Image-node"},
							//Subjects:".//div[@id = 'subject']/a",
							//Publisher:".//div[@id = 'publisher']/text()[last()]",
							//Language:".//div[@id = 'language']/text()[last()]",
							"Recommended for you":{xpath:".//div[@id='crossMarketing']//ul/li", parse:function(r){
								var f = new Item([r]);
								f.getAdditional({
										Title:"./div[contains(concat(' ',@class,' '), ' trunc-title-line ')]",
										Image:"./div[contains(concat(' ',@class,' '), ' coverID ')]/a/img",
										Author:"./div[contains(concat(' ',@class,' '), ' trunc-author-line ')]",
									});
								(obj.suggestions = (obj.suggestions || [])).push(f);
//								sp.linkify(f);
//								delete f.formats;
								return r;
							}},
						});
					//These pages are really screwed up and hard to parse.
					//imss.lib.overdrive.com lacks a "Release date"! I thought it was universal!

					for(let co of obj.creatorObjs){
						let span = OverDrive.createServiceLinks(insertAfter(document.createElement("span"), co.link), {creator:co.name, creatorNumber:co.number}, "creator");
						span.className = "links";
						LinkAdjust(span, null, null, false);//this is a terrible hack!!!
					}
					if(obj.nodes["Series-node"]){
						let span = OverDrive.createServiceLinks(obj.nodes["Series-node"].appendChild(document.createElement("span")), obj, "series");
						span.className = "links";
						//LinkAdjust(span, null, null, false);//this is a terrible hack!!!
					}
					if(obj.nodes["Title-node"]){
						let span = OverDrive.createServiceLinks(obj.nodes["Title-node"].appendChild(document.createElement("span")), obj, "title");
						span.className = "links";
					}
					if(obj.nodes["Publisher-node"]){
						let span = OverDrive.createServiceLinks(obj.nodes["Publisher-node"].appendChild(document.createElement("span")), obj, "publisher");
						span.className = "links";
					}
					
					/*
					let cdgo = function (r){// or starts-with(text(),'Available copies:')
						var stable = r;
						
						var script = null;
						let fobj = new FormatItem(obj);
						if(version){
							if(!fobj.addPieces([r])) return; //already used, so skip it
						}
						else{
							if(!fobj.addPieces([r.parentNode])) return; //already used, so skip it
							do stable = $X(compileXPath("ancestor::table[1]"), stable); while(stable && !(script = $X(compileXPath(".//script[contains(text(), 'var szFormatType = ') and not(@parsed)] | preceding-sibling::table//script[contains(text(), 'var szFormatType = ') and not(@parsed)]"), stable)));
							var mark;
							if(script)
								fobj.formats.push(Number(script.textContent.match(/var szFormatType = "([^"]*)";/)[1]));
						}
							
//						fobj.id = obj.id;
//						fobj.creator = obj.creator;
						
						if(!fobj.format){//HACK!!!
							fobj.getAdditional({
									szFormatType:{script:"szFormatType", field:"format", testNull:false},
									SmartLink:{xpath:".//a", params:["format"]},
								});
						}
						var szFormatType = fobj.format
						if(szFormatType){
							//log(szFormatType)
							$Z(compileXPath(".//script[contains(text(), 'var szFormatType = \""+szFormatType+"\"') and not(contains(concat('~',@parsed,'~'), '~"+szFormatType+"~'))]"), function(rr){
									fobj.setNodeParsed(rr, szFormatType);
									fobj.addPieces("ancestor::table[1]/tbody", rr);
									fobj.addPieces("ancestor::table[1]/parent::td[count(*) = 1]/parent::tr", rr);
								}, base);
							$Z(compileXPath(".//b/text()[(contains(.,\""+Formats.Numbers[szFormatType].names.join("\") or contains(.,\"")+"\"))]"), function(rr){
									insertAsParent(OverDrive.Services.library.createLink("title", fobj), rr);
									fobj.addPieces("ancestor::tbody[1]", rr);
									fobj.addPieces("ancestor::table[1]/parent::td[count(*) = 1]/parent::tr", rr);
								}, base);
						}
						else
							log("format not detected", obj);
						
						fobj.getAdditional(additionals);
						
						fobj.enhance();
						sp.linkify(fobj);
							
						if(szFormatType)
							obj.formats[szFormatType] = fobj.clone( {unique:null, formats:null}, true );
						
						let newrow = (r.cells)?function(text, className){
								let tr = document.createElement("tr");
								if(className)
									tr.className = className;
								for(let empties = r.cells.length - 2;empties > 0; empties--)
									tr.appendChild(document.createElement("td"));
								for each(var a in Array.slice(r.attributes))
									tr.setAttribute(a.name, a.value);
								tr.classList.add("others");
								let n = tr.appendChild(document.createElement("td"));
								n.appendChild(document.createTextNode(text + "\u00a0"));
								n.setAttribute("nowrap","nowrap");
								insertAfter(tr,r);
								return tr.appendChild(document.createElement("td"));
							}:function(text, className){
								let n = (document.createElement("div"));
								n.appendChild(document.createTextNode(text + "\u00a0"));
								n.setAttribute("nowrap","nowrap");
								n.className="format_info_left"
								let m = (document.createElement("div"));
								m.className="format_info_right";
								//insert after the last row we parsed with pairs
								insertAfter(n, fobj.nodes[fobj.nodes["Pairs-pairs"].filter(function(a){return a[0];}).slice(-1)[0][1]+"-node"]);
								insertAfter(m, n);
								return m
							};
						
						{//Other Libraries & Stores
							let library, store;
							for each(let d in Providers.activeProviders) {
								if(d != Server)
								{
									let p = Providers.getProvider(d);
									let k = p.data;
									if(k)// && k.url)
									{
										var a = document.createElement("a");
											a.href = "http://"+ d + "/ContentDetails.htm"+location.search;
											a.appendChild(document.createTextNode(k.title || d));
										switch(k.type) {
											case "store":{
												if(store == null)
													store = newrow("Other Stores:\x0a\x0a", "links")
												store.appendChild(a);
												store.appendChild(document.createElement("br"));
												break;}
											default:
											case "library":{
												if(library == null)
													library = newrow("Other Libraries:\x0a\x0a", "links");
												library.appendChild(a);
												let span = library.appendChild(document.createElement("span"))
												let last = span.appendChild(document.createTextNode(" ["));
													span.className = "right"
												for each(let name in ["WishListAdd", "WishListRemove", "series","creator"]){
													let link = p.createLink(name, fobj, "abbr")
													if(link){
														span.appendChild(link)
														span.appendChild(last = document.createTextNode(", "));
														p.convertLink(link);
													}
												}
												if(last.nodeValue == ", ")
													last.nodeValue = "]";
												else
													remove(last);
												library.appendChild(document.createElement("br"));
												break;}
										}
									}
								}
							}
						}

						{//Databases
							let td = newrow("Databases:\x0a\x0a", "links");
							let last;
							for each(let service in OverDrive.Services)
								if(service.service != server_mode) {//I don't think this is ever false, but I don't know all the ways of getting in here.
									td.appendChild(service.createLink("title", fobj, document.createTextNode(service.abbreviation)));
									let s = service.createLink("title-search", fobj, document.createTextNode("S"));
									if(s){//this is likely dead code since title-search is temporarily dead.
										let span = td.appendChild(document.createElement("span"))
										span.className = "sup"
										span.appendChild(last = document.createTextNode("("));
										span.appendChild(s);
										span.appendChild(last = document.createTextNode(")"));
									}
									td.appendChild(last = document.createTextNode(" "));
								} else log("contentdetails gets called in databases", server_mode, page);
							if(last)
								remove(last);
						}
					}
					$Z(".//tr[td[starts-with(text(),'Release date:')]]", cdgo, base);//'Fecha de Publicación:' or 'On sale date:'
					//$Z(".//tr[td[starts-with(text(),'Tamaño del archivo:')]]", cdgo, base);//File size:
					$Z(".//tr[td[starts-with(text(),'ISBN:')]]", cdgo, base);
					$Z(".//div[@id=\"format_info\"]/div[contains(concat(' ',@class,' '), ' format_container ')]", cdgo, base);
					*/
					obj.enhance();
					sp.linkify(obj);
					
//					dirty = obj.saveCopies(server_obj);
					
					log(obj);
					break;
				}
				case "waitinglistremove":
				case "waitinglistconfirm":{
					if(!error && signed_in)
						sp.update_page(page, "waitinglist");
					title_link = "MyWaitingList";
					/*Todo
					Can get hold duration from this page!
					WaitingListConfirm.htm
					*/
					break;
				}
				case "waitinglistedit":
				case "waitinglistform":{
					if(!error && signed_in)
					{
						//var form = $X("//form[@action='BANGAuthenticate.dll?Action=LibraryWaitingList' or @action='BANGAuthenticate.dll?Action=EditWaitingList']");
						var obj = new Item();
						
						obj.getAdditional({
								LibraryWaitingList:{form:"//form[@action='BANGAuthenticate.dll?Action=LibraryWaitingList' or @action='BANGAuthenticate.dll?Action=EditWaitingList']",},
								Pairs:{field:"../tbody/tr/td[1]", value:"following-sibling::td[last()]/*[self::b or self::strong]", node:"LibraryWaitingList-form"},
								DeComment:{xpath:"../tbody/comment()", parse:function(r){ (evalNoScript(r, null, ["table", "tbody"], true), arguments)}, node:"LibraryWaitingList-form"},
//											Subtitle:{xpath:".[contains(.//text(), ': ')]", node:"Title-value"},//no subtitle if there is no splitter.
							});
						
						if(obj.title){
							let s = obj.title.split(": ");
							if(s.length > 1 && obj.title.match(obj.subtitleParser)) {
								obj.getAdditional({Subtitle:obj.nodes["Title-value"], });//no subtitle if there is no splitter.
								var i = Math.ceil(s.length / 2);
								obj.title = s.slice(0, i).join(": ");
								obj.subtitle = s.slice(i).join(": ");
							}
						}
						
						//I do not recall why enhance is not called
						obj.processSubtitle();
						sp.linkify(obj);
						
						log(obj);
					}
					title_link = "MyWaitingList";
					break;
				}
				case "mycompletewishlistgrid": 
				case "mycompletewishlistlist": 
				case "mycompletewishlistcover"://only in child layout 
				case "mycompletewishlist": 
				case "myrecformegrid"://only in child layout
				case "myrecformelist"://only in child layout
				case "myrecforme"://only in child layout
				case "searchresultsgrid": 
				case "searchresultslist": 
				case "searchresults":{
					let page_base = /^(myrecforme|mycompletewishlist|searchresults)(.*)$/.exec(page) || "";
					let base;
					if(page_base){
						[,page_base, page_mode] = page_base;
						if(page_mode)
							page_mode = "-"+page_mode;
						let t = {/*myrecforme:[], */mycompletewishlist:["@id='myAccount'", "@id='option1' and parent::div[@id='myAccountContainer']"], searchresults:["@id='searchResultsContainer'", "@id='searchResults'"]}[page_base]
						if(t)
							base = $X("//section["+t[0]+"]//div["+t[1]+"]");
						else
							log("page type not handled!")
					}
					//var items = [];
					/*
					GM_addStyle([//{
							"tr.item > td { width:auto; white-space:nowrap; }",// default table spacing is bad
							"[parsed], tr.item img, .binlink { white-space:normal!important; }",//if we parsed it, best to let it wrap... or if it's an image
							"a.checked[parsed] { white-space: nowrap!important; }",
						].join("\n"))//}*/
					
					//Library Bin not supported yet, this needs to be entirely overhauled.
					//instead of cheating we need to actually try to parse the rows ~_~
					
					//let base = $X("//section[@id='searchResultsContainer' or @id='myAccount']//div[@id='searchResults' or (@id='option1' and parent::div[@id='myAccountContainer'])]");
					
					let countNodes = [];
					let countStart = 0;
					$Z("//div[@id='pagingTitleCount']/text()", function(r){
							let s = /([1-9]\d*)\s*-\s*([1-9]\d*)\s+of\s+([1-9]\d*)/.exec(r.nodeValue);
							if(s){
								//objFilter(s, {"start":1, "end":2, "total":3}, countNodes);
								[,countNodes.start, countNodes.end, countNodes.total] = s;//not as elegant but functionaly the same and it's faster.
								let t = SplitTextNode(r, countNodes.end);
								if(t)
									countNodes.push(t);
							}
						});
//					log(countNodes)
					let script = $X("//script[contains(text(),'// ADD TO WISHLIST SCRIPT')]")
					if(script){
						let text = script.innerHTML;
						//HACK HACK HACK
						let start = text.indexOf("// ADD TO WISHLIST SCRIPT");
						let end = text.indexOf("// CLOSE ALL EXPANDED DETAIL BOXES FOR SCREEN SIZES");
						if(start < 0 || end < 0) {
							log("AtWS parsing failed");
							script = null;
						} else {
							let rscript = document.createElement("script");
							rscript.type=script.type;
							rscript.innerHTML = "var redoWishlist = (function(nody){" + text.substring(start,end).replace('$(".wishlist-link")','$(nody).find(".wishlist-link")',"g") + "});";
							rscript.id = "GME"
							insertAfter(rscript, script);
						}
					}
					else {
						log("Failed to find AtWS");
					}
					let objs = ListPage(insertBefore(document.createElement("div"), base), {pagingCleanup:script?function(objs){
							for(let obj of objs){
								unsafeWindow.redoWishlist((obj));//not ideal but ok.
							}
						}:undefined, paging:true, ready:true, filter:true, countNodes: countNodes, sample:page_mode != "", formatGroup:true}, $X("./div[not(@id)]/div[not(@id)]/ul", base), "./li | .//li[contains(concat(' ',@class,' '), ' search-result"+page_mode+" ')]", [function(r, i){
							let obj = new Item([r]);
							let node = r;
							//resultsBorrowButton
							//szPrimaryCreatorID
							//log(r);
							let proc2 = function(t){
								switch(t){
									case "Borrow":
										obj.status = "ready";
										break;
									case "Place a Hold":
										obj.status = "wait";
										break;
									case "Recommended":
										obj.status = "recommended";
										break;
									case "Recommend":
										obj.status = "recommend";
										break;
									case "Not Available":
										obj.status = "unavailable";
										break;
								}
							}
							let proc = function(t){
								proc2(t.textContent.trim())
							}
							obj.getAdditional({
									//This only works if the button has a format field, which it won't always have. Only the hold buttons still have the format numbers, it's been stripped from borrow.
									//recommendHolder:{xpath:".//div[@class='recommend-holder']", parse:function(t){ obj.status = "unavailable"; }},
									Available:{xpath:".//a[@id='resultsBorrowButton']", parse:proc},
									FormatFinder:{xpath:".//noscript[@class='noscript-borrow-button']", parse:function(t){
											let a = $X(".//a", evalNoScript(t, document.createElement("div")));
											if(!obj.status) {
												proc(a);
											}//somethings don't have a status!
											let o = search2obj(a.search, true);
											if(!o.format) {
												if(!o.url)
													return;
												a.href = o.url;
												o = search2obj(a.search, true);
											}
											if(o.format && Formats.Numbers[o.format])
												obj.format = Number(o.format);
										},
									},
									formatGroup:{xpath:".//@data-fmtid", params:["format".length]},
									Description:".//div[contains(concat(' ',@class,' '), ' trunc-desc"+page_mode+" ')]",
									Title:".//div[contains(concat(' ',@class,' '), ' trunc-title-line"+page_mode+" ')]",
									Subtitle:".//div[contains(concat(' ',@class,' '), ' trunc-subtitle-line"+page_mode+" ')]",
//									Series:".//div[contains(concat(' ',@class,' '), ' trunc-series-line"+page_mode+" ')]",
									Author:".//div[contains(concat(' ',@class,' '), ' trunc-author-line"+page_mode+" ')]",
//									"Release date":{xpath:"ancestor::td[1]/div/small[starts-with(text(), 'Release date: ')]", node:"Title-node", params:[14]},
//									PreRelease:{xpath:".//a[text()='Pre-Release Title']", parse:function(r, i, obj){obj.status = "unavailable";}},
									Image:".//div[contains(concat(' ',@class,' '), ' coverID ')]/a/img",
									Available:{xpath:".//*[@data-izavail]", parse:function(node, i, obj, name, inst, results){
										let value = Number(node.getAttribute("data-izavail").substr(6));
										if(!isNaN(value)){
											if(value == 0)
												obj.status = "wait";
											else if(value > 0)
												obj.status = "ready";
											else
												obj.status = "unavailable";
										}
										return node;
									}},
//									Sample:{xpath:"../following-sibling::div/a[starts-with(@href,'http://excerpts.contentreserve.com/') and img]", node:"Image-node"},
//									"Available copies":{xpath:"following-sibling::div[1]", node:"Description-node"},
//									"Library copies":{xpath:"following-sibling::div[2]", node:"Description-node"},
									szSeries:{script:"szSeries", field:"series", testNull:false},
//									szLibOwned:{script:"szLibOwned", parse:function(vn, v){ if(!Number(v)){ obj.status = "unavailable"; }}},
//									szLibCopies:{script:"szLibCopies", parse:function(vn, v){ obj.libraryCopies = (v == 'always available')?Number.POSITIVE_INFINITY:Number(v)}},
//									szCopies:{script:"szCopies", parse:function(vn, v){ obj.availableCopies = (v == 'always available')?Number.POSITIVE_INFINITY:Number(v)}},
//									szNumWaiting:{script:"szNumWaiting", parse:function(vn, v){ obj.waiting = Number(v)}},
//									WishList:{script:"szAdvInPrivate", parse:function(vname, value, obj, node, name, alt){
//										//FIXME: I do not know what this was supposed to do but it breaks things.
//											if(Number(value) && !signed_in)
//												evalNoScript($X("following-sibling::noscript[1]", node));
//										}},
									WishList:".//div[contains(concat(' ',@class,' '), ' coverID ')]/div[contains(concat(' ',@class,' '), ' wishlist-container ')]/a",
									Recommend:".//div[contains(concat(' ',@class,' '), ' coverID ')]/div[contains(concat(' ',@class,' '), ' rtl-container ')]",//this picks up all sorts of random shit!
								});
//							log(server_obj)
							
							let test = (server_obj && server_obj.formats)?
								function(e){return (obj.formats.indexOf(e) == -1) && (server_obj.formats.indexOf(e) != -1);}:
								function(){return obj.formats.indexOf(e) == -1;};
							
							for each(let f in obj.formats){
								for  each(var c in Formats.Classes)
									if(c.title == f){
										for each(let e in c.formats)
											if(test(e))
												obj.formats.push(e);
										obj.formats.splice(obj.formats.indexOf(f), 1);
									}
							}
								
//							log()
							
							obj.enhance();
							sp.linkify(obj);
							
//							dirty = obj.saveCopies(server_obj) || dirty;
							
//							if(obj.nodes["Title-node"])
//								obj.nodes["Title-node"].appendChild(OverDrive.createServiceLinks(document.createElement("span"), obj)).className = "links";
							
							return obj;
						}], imageResizing);
					
					log(objs);
					
					break;
				}
				case "searchresultsrecommend": ++page_mode;
				case "searchresultsuserrank": ++page_mode;//Active as of Dec 10, 2013
				{//case "searchresults":
					//let base = $X("//section[@id='searchResultsContainer']/div[@id='searchResults']");
					//let objs = ListPage(insertBefore(document.createElement("div"), base), {paging:true, ready:true, filter:true, countNodes: countNodes, sample:true}, base, "/html/body/div[5]/div/div/section/section/div[4]/div[2]/div/ul", function(r, i){
					//var items = [];
					//*
					GM_addStyle([//{
							"tr.item > td { width:auto; white-space:nowrap; }",// default table spacing is bad
							"[parsed], tr.item img, .binlink { white-space:normal!important; }",//if we parsed it, best to let it wrap... or if it's an image
							"a.checked[parsed] { white-space: nowrap!important; }",
						].join("\n"))//}
					
					//Library Bin not supported yet, this needs to be entirely overhauled.
					//instead of cheating we need to actually try to parse the rows ~_~
					
					let base = $X("//table[script[contains(text(),'g_bFutureOnSaleDate')]/following-sibling::tbody[position()=1]] | //script[contains(text(), ' szPrimaryCreatorID ')]/ancestor::table[1]");
					let xpaths;
					
					if(base){//legacy ~_~
						xpaths = {
							count:"//tr[not(.//table) and td[.//text()[contains(., '< Previous')] and .//text()[contains(., 'Next >')]]]/td//text()[contains(., 'Showing')]",
							list:"tbody/tr[td[@rowspan]]",
							group:"following-sibling::node()[not(self::text())][position()=1 and not(td[@rowspan])]",
							Description:"td/small",
							Title:".//b[a[starts-with(@href, 'ContentDetails.htm?') and string-length(text())>1]]",
							Subtitle:"ancestor::td[1]/div/small/b[text()]",
							Image:".//td/a[@href]/img",
							Pairs:{field:".//tbody[tr[1]/td[1][starts-with(text(), 'Title:')]]/tr/td[1]", value:"ancestor-or-self::td[1]/following-sibling::td[1]"},
						};
					}
					else if(base = $X("//div[@id='results_page_top']")){
						xpaths = {
							count:"//div[@id='results_showing']/text()",
							list:"ancestor::div[position() < 3]//div[contains(concat(' ',@class,' '), ' results_ratings ') or contains(concat(' ',@class,' '), ' results_holder ')]",
							group:"following-sibling::node()[not(self::text())][position()=1 and not(self::div[contains(concat(' ',@class,' '), ' results_ratings ')])]",
							Description:".//div[contains(concat(' ',@class,' '), ' results_description ')]",
							Title:".//div[contains(concat(' ',@class,' '), ' results_title ')]",
							Subtitle:"following-sibling::div[contains(concat(' ',@class,' '), ' results_sub_title ')]",
							Image:".//div[contains(concat(' ',@class,' '), ' results_cover_img ')]/a[@href]/img",
							Pairs:{field:".//b", value:"self::b[count(following-sibling::node()) > 1]/* | self::b[count(following-sibling::node()) = 1]/following-sibling::node()"},
						};
					}
					
					let countNodes = [];
					let countStart = 0;
					$Z(xpaths.count, function(r){
							objFilter(/Showing\s+([1-9]\d*)\s*-\s*([1-9]\d*)\s+of\s+([1-9]\d*)/.exec(r.nodeValue), {"start":1, "end":2, "total":3}, countNodes);
							countNodes.push(SplitTextNode(r, countNodes.end));
						});
//					log(countNodes)
					let objs = ListPage(null, {paging:true, ready:true, filter:true, countNodes: countNodes, sample:true}, base, xpaths.list, function(r, i){
							let obj = new Item();
							let node = r;
							let realTRs = 0;
						
							capture:
							do{
								switch(node.nodeName) {
									case "DIV":
										if($X("a/img[@alt=\"Don't see the titles you were hoping to find? Find More\"]", node))
											break capture;
										if(!obj.addPieces(node))
											return;
										break;
									case "TR":
										obj.addPieces(node);
										++realTRs;
										break;
									case "#comment"://evaluate the comments, sometimes they contain interesting stuff!
										obj.addPieces(evalNoScript(node.textContent.trim(), undefined, ["table", "tbody"]).filter(function(f){return f.nodeName!="#text";}));
										break;
								}
							}while(node = $X(xpaths.group, node));

							//cleanup for bad websites! (needed occasionally ~_~)
							if(r.cells){
								for(node = obj.pieces.slice(-1)[0]; realTRs < r.cells[0].rowSpan; realTRs++) {
									let s = insertAfter(document.createElement("tr"), node)
									s.appendChild(document.createElement("td")).appendChild(document.createElement("hr"));
									obj.addPieces(s);
								}
							}
							
							//szPrimaryCreatorID
							//log(r);
							if($X("td[3]/font[@color='red']", r))
								obj.status = "unavailable";
							else//this method is less than perfect
								obj.status = obj.pieces.some(function(n){return $X(".//a/@href[starts-with(., 'BANGCart.dll?Action=Add&')]",n)})?"ready":"wait";
							obj.getAdditional({
									Pairs:xpaths.Pairs,
									FormatFinder:{xpath:".//text()[string-length(.)>5]", parse:function(t){ let f = Formats.Names[t.nodeValue.trim()]; if(f) obj.format = f; }, },
									SmartLink:{xpath:".//a", all:true, params:["id","format"]},
									szPrimaryCreatorID:{script:"szPrimaryCreatorID", parse:function(vname, value, obj, node, name, alt){
											if(value) {
												let go = function(){
														obj.getAdditional({
																Creator:{xpath:"../text()[last()][not(translate(.,' \t\n','')='')]"},
																Author:{xpath:"following-sibling::tr[1]/td[1][starts-with(text(), 'Author:')]/following-sibling::td[1]"},
															}, node);
														if(obj.creatorObjs && obj.creatorObjs.length) {
															//X_X
															obj.creatorObjs[0][find_id.exec(value)?"id":"number"] = value;
															return false;
														}
														return true;
													}
												if(go()){
													//oh hell there is an error in the string generating the node x_x
													//It's too much work to try and fix it.
													log("bad szPrimaryCreatorID script");
													scriptReEval(node, node.innerHTML.replace(/\n([^\s])/g, "$1"), true);
													if(go())//still failed
														obj.creatorObjs = [{id:value}];
												}
											}
										}},
									Description:xpaths.Description,
									Title:xpaths.Title,
									Subtitle:{xpath:xpaths.Subtitle, node:"Title-node"},
									Author:{xpath:"ancestor::td[1]/div[starts-with(text()[1], 'by ')]", node:"Title-node", params:[3]},// | following-sibling::div[contains(concat(' ',@class,' '), ' results_creator ')]/small/text()[last()]
									"Release date":{xpath:"ancestor::td[1]/div/small[starts-with(text(), 'Release date: ')]", node:"Title-node", params:[14]},
									PreRelease:{xpath:".//a[text()='Pre-Release Title']", parse:function(r, i, obj){obj.status = "unavailable";}},
									Image:xpaths.Image,
									Sample:{xpath:"../following-sibling::div/a[starts-with(@href,'http://excerpts.contentreserve.com/') and img]", node:"Image-node"},
//									"Available copies":{xpath:"following-sibling::div[1]", node:"Description-node"},
//									"Library copies":{xpath:"following-sibling::div[2]", node:"Description-node"},
									szLibOwned:{script:"szLibOwned", parse:function(vn, v){ if(!Number(v)){ obj.status = "unavailable"; }}},
									szLibCopies:{script:"szLibCopies", parse:function(vn, v){ obj.libraryCopies = (v == 'always available')?Number.POSITIVE_INFINITY:Number(v)}},
									szCopies:{script:"szCopies", parse:function(vn, v){ obj.availableCopies = (v == 'always available')?Number.POSITIVE_INFINITY:Number(v)}},
									szNumWaiting:{script:"szNumWaiting", parse:function(vn, v){ obj.waiting = Number(v)}},
									WishList:{script:"szAdvInPrivate", parse:function(vname, value, obj, node, name, alt){
										//FIXME: I do not know what this was supposed to do but it breaks things.
//											if(Number(value) && !signed_in)
//												evalNoScript($X("following-sibling::noscript[1]", node));
										}},
								});
//							log(server_obj)
								
							let test = (server_obj && server_obj.formats)?
								function(e){return (obj.formats.indexOf(e) == -1) && (server_obj.formats.indexOf(e) != -1);}:
								function(){return obj.formats.indexOf(e) == -1;};
							
							for each(let f in obj.formats){
								for  each(var c in Formats.Classes)
									if(c.title == f){
										for each(let e in c.formats)
											if(test(e))
												obj.formats.push(e);
										obj.formats.splice(obj.formats.indexOf(f), 1);
									}
							}
								
//							log()
							
							obj.enhance();
							sp.linkify(obj);
							
//							dirty = obj.saveCopies(server_obj) || dirty;
							
							if(obj.nodes["Title-node"])
								obj.nodes["Title-node"].appendChild(OverDrive.createServiceLinks(document.createElement("span"), obj)).className = "links";
							
							return obj;
						}, imageResizing);
					//*/
					log(objs);
					break;
				}
				case "advancedsearch":{
					GM_addStyle("div#advSearchCollectionsRTL.row { display:block !important; }");
					let go = function(select, i, get_value, compare, wants, make, sort, def) {
						//this method sucks but the only way to compare is by value but sorting may be by value or by text
						compare = compare || function(a,b){return a === b;};
						log(Array.slice(select.options).
							map(function(o){
									let v = get_value(o);
									wants = wants.filter(function(u){return !compare(u,v);});
									return {value:v, option:select.removeChild(o)};
								})).
							concat(log(wants).map(function(v){let o = document.createElement("option"); make(o, v); return {value:v, option:o};})).
							sort(sort || function(a, b){return a.value - b.value;}).
							map(function(o){select.appendChild(o.option); return o;}).
							some(def?function(o){return compare(o.value, def)?o.option.selected = true:false;}:function(){return true;});
					}
					let counts = [5,10,25,50,100,200,300,500,1000];//more than 100 per page is slow.
					
					if(counts.indexOf(QuickSearchsCount) == -1)
						counts.push(QuickSearchsCount);
					
					$Z("//select[@name='CollDate']", go, null, function(f){return (f.value && Number(f.value.slice(2))) || 0;}, null, DaysOfInterest, function(o, days){
							o.value = '>*'+days;
							o.appendChild(document.createTextNode("Within the last "));
							o.appendChild(document.createTextNode(days));
							o.appendChild(document.createTextNode(" days"));
						}, null, QuickSearchsDays);
					$Z("//select[@name='PerPage']", go, null, function(f){return (f.value && Number(f.value)) || 0;}, null, counts, function(o, v){
							o.appendChild(document.createTextNode((o.value = v)>100?v+" (bad idea)":v));
						}, null, QuickSearchsCount);
					/* //evilFormatDivider
					var groups = [];
					let test;
					if(server_obj.formats && server_obj.formats.length)
						test = function(f){ return server_obj.formats.indexOf(f) > -1; };
					else{
						test = function(f){return $X(compileXPath("//select[@name='Format']//option[@value='"+f+"']")); };//hack!
						
						//what a pain in the ass!
						
						if(server_obj){
							let formats = [];
							for each(var cls in Formats.Classes)
								formats = formats.concat(cls.formats.filter(test));
							if(formats.length){
								server_obj.formats = formats;
								server_obj.formats_load = new Date(document.lastModified).getTime();
								dirty = true;
							}
						}
					}
					
					for each(var cls in Formats.Classes) {
						let formats = test?cls.formats.filter(test):cls.formats.slice();
						if(formats.length > 0) {
							formats.title = cls.title + " Formats";
							groups.push(formats);
						}
					}
		//				log(groups)
					
					$Z("//select[@name='Format']", go, null, function(f){//get_value
							return (f.value && splitFormats(f.value).map(Number).sort(function(a, b){return a - b;})) || [0];//hack so it sorts
						}, function(want, have) {//return true if everything in want is in have
							for (let i = 0, j = 0; i < want.length; i++) {
								if(j == have.length)
									return false;
								let w = want[i];
								while(w > have[j])
									if(++j == have.length)
										return false;
								if(w !== have[j++])
									return false;
							}
							return true;
						}, groups, function(o, v){//make
								o.value = joinFormats(v);
								o.appendChild(document.createTextNode(v.title));
						}, function(a, b){//sort
							if(!a.option.value)
								return -1;
							else if(!b.option.value)
								return 1;
							else
								return (a.option.textContent > b.option.textContent) - (a.option.textContent < b.option.textContent);
						});
					//*/
					log(server_obj)
					break;
				}
				case "browsesubjects":
				case "browsevideo":
				case "browseebooks":
				case "browsesubject1":
				case "default":{
					if(server_obj)
						server_obj.title = document.title;
						dirty = true;
						/*var urls = [
								"http://images.contentreserve.com/ImageType-200/",
							];*/
					//img[starts-with(@src, 'http://images.contentreserve.com/ImageType-200/')]/ancestor::*[self::div[contains(concat(' ', @class, ' '), ' title-grid-item ')] or self::td][1]
					var objs = [];
					$Z("//a[img[starts-with(@data-original, '//images.contentreserve.com/ImageType-') or @data-original='MissingThumbImage.jpg']]", function(a){
							var base = $X(compileXPath("ancestor::*[self::div[contains(concat(' ', @class, ' '), ' title-grid-item ')] or self::td or self::li][1]"), a);
							//log(a, base);
							if(base) {
								var obj = new Item([base]);
								obj.getAdditional({
										Image:a,
										Title:{xpath:"following-sibling::b | ../self::div/following-sibling::div[1]", node:"Image-node"},
										Creator:"div[position()>2]//text()[not(ancestor::a)]",//needs tweaking.	
										Author:"text()[contains(., 'by ')]/following-sibling::*[self::a]",
										Enhanced:{xpath:"ancestor::div[1]/preceding-sibling::div[1]/small", node:"Creator-value", parse:function(){}},
									});
								obj.enhance();
								sp.linkify(obj);
								if(obj.nodes["Title-node"])
									obj.nodes["Title-node"].appendChild(OverDrive.createServiceLinks(document.createElement("span"), obj, "title")).className = "links";//"title-search"
								objs.push(obj);
							}
						});
					GM_addStyle([//{
						".trunc-title-line a { display:inline; }",
						".trunc-title-line { white-space: normal; }",
						".trunc-title-line span.links { display: inline-block; margin-left: 0;}",
						".trunc-title-line span.links a { display: inline; }",
						].join("\n")).id="defaultMangler";//}
					log(objs);
					break;
				}
				case "odadvantage":{
					if(!error && server_obj)
					{
						let advantage = [];
						$Z(".//p[text()='The following libraries are members of OverDrive Advantage:']/following-sibling::table/tbody/tr/td[2]", function(r,i){
								advantage.push(r.textContent);
							}, main);
						//server_obj.advantage = advantage;
						//dirty = true;
					}
					break;
				}
				case "myaccount":{
					signed_in = !error;
					//TODO: add options to settings tab, including overriding the value of server_obj.title (aka data.title) for links.
					if(!error) {//MyAccount.htm?TitleLimit=0
						//bookshelfBlockGrid
						
						let base = $X("//section[@id='myAccountContent']/ul[contains(concat(' ',@class,' '), ' tabs-content ')]");
						
						//When we convert our new links from javascript links to forms, if the tab is hidden the result is the submit will be the wrong size.
						let config = { attributes: true, /**/attributeFilter: ["class"],/**/ };
						$Z(compileXPath("./li"), function(r){
								let observer;
								observer = new MutationObserver(function(mutations) {
									for(let m of mutations) {
										let rr = m.target;
										if(rr.className){
											sp.resizeLinkCheck(rr);
											observer.disconnect();
										}
									}
								});
								observer.observe(r, config);
							}, base)
						
						let features = {paging:false, ready:true, filter:true, sample:false, series:true, formatGroup:true};
						{//bookshelf
							let bookshelf = ListPage(null, objCreate(features, {root:"#myAccount1Tab"}), $X("./li[@id='myAccount1Tab']//ul[@id='bookshelfBlockGrid']", base), "./li", function(r, i){
								let obj = new Item([r]);
								obj.getAdditional({
									Author:".//div[contains(concat(' ',@class,' '), ' trunc-author-line ')]",
									Title:".//div[contains(concat(' ',@class,' '), ' trunc-title-line ')]",
									Image:".//div[contains(concat(' ',@class,' '), ' coverID ')]/a/img",
									TitleFallback:{xpath:"./div/@title", parse:function(node, i, obj, name, inst, results){
											if(!obj.title){
												results.push(node);
												obj.title = node.value;
												return obj.nodes["Title-value"] = SplitTextNode(findTextElementContaining(obj.title, r), obj.title);
											}
										}
									},
									/**/
									Formats:".//ul[li//@data-fmtid]",
									Read:{xpath: ".//div[" +xPathListContains("@class", "dwnld-odread")+ " and *]", parse:()=>obj.formats.push(610)},
									Format:".//@data-lckdinfmtid[not(.='-1')]",
									nLockFormat:{script:"nLockFormat", parse:function(vname, value, obj, node, name, alt){let f = Number(value); if(f != -1 && obj.Formats.indexOf(f) == -1) f.formats.push(f);},},
									Download:".//a[span["+xPathListContains("@class", "read-button-text-download")+" or "+xPathListContains("@class", "dwnld-span-bottom")+"]]",
									/**/
									myExpireDate:{script:"myExpireDate", /**/field:"expires",/*/ parse:function(vn, v){ obj.expires = Date(v)},/**/},
									formatGroup:".//@data-svenh",
									ID:".//@data-reserveid",
									Sample:".//@data-cerpturl",
									SampleFormat:".//@data-excerpt",
								});
								if(typeof obj.title === "undefined") return;
								obj.enhance();
								sp.linkify(obj);
								return obj;
							});
						}
						{//holds
							let holds = ListPage(null, objCreate(features, {root:"#myAccount2Tab"}), $X("./li[@id='myAccount2Tab']//ul[contains(concat(' ',@class,' '), ' block-grid ')]", base), "./li", function(r, i){
								let obj = new Item([r]);
								obj.getAdditional({
									formatGroup:".//@data-svenh",
									Borrow:{xpath:".//li[contains(concat(' ',@class,' '), ' holds-borrow-link ')]", parse:function(){obj.status="ready"}},
									Author:".//div[contains(concat(' ',@class,' '), ' trunc-author-line ')]",
									Title:".//div[contains(concat(' ',@class,' '), ' trunc-title-line ')]",
									Image:".//div[contains(concat(' ',@class,' '), ' coverID ')]/a/img",
									"Release date":{xpath:".//div[contains(concat(' ',@class,' '), ' holds-info ')]/span["+xPathListContains("@style","color:red",";")+"]", parse:function(r,i){
										this["release-date"] = r.textContent.slice(-12);
										obj.status = "unavailable";
									}},
									//Format?
									//myExpireDate:{script:"myExpireDate", /**/field:"expires",/*/ parse:function(vn, v){ obj.expires = Date(v)},/**/},
									//user 7 of 57, library copies
									//available
									});
								if(!obj.status)
									obj.status = "wait";
								obj.enhance();
								sp.linkify(obj);
								return obj;
							});
						}
						{//lists
							let lists = ListPage(null, objCreate(features, {filter:false, root:"#myAccount3Tab"}), $X("./li[@id='myAccount3Tab']//ul[contains(concat(' ',@class,' '), ' block-grid ')]", base), "./li", function(r, i){
								let obj = new Item([r]);
								obj.getAdditional({
									formatGroup:".//@data-fmtclass",
									Status:{xpath:".//@data-izavail", parse:function(node){
											let t = node.value.slice(6);
											if(t < 0)
												obj.status= "unavailable"; 
											else if(t == 0)
												obj.status= "wait";
											else if(t > 0)
												obj.status= "ready";
											else
												obj.status= "unknown";
										}
									},
									Author:".//div[contains(concat(' ',@class,' '), ' trunc-author-line ')]",
									Title:".//div[contains(concat(' ',@class,' '), ' trunc-title-line ')]",
									Image:".//div[contains(concat(' ',@class,' '), ' coverID ')]/a/img",
									/*"Release date":{xpath:".//div[contains(concat(' ',@class,' '), ' holds-info ')]/span["+xPathListContains("@style","color:red",";")+"]", parse:function(r,i){
										this["release-date"] = r.textContent.slice(-12);
										obj.status = "unavailable";
									}},*/
									//Format?
									//myExpireDate:{script:"myExpireDate", /**/field:"expires",/*/ parse:function(vn, v){ obj.expires = Date(v)},/**/},
									//user 7 of 57, library copies
									//available
									});
								if(!obj.status)
									obj.status = "wait";
								obj.enhance();
								sp.linkify(obj);
								return obj;
							});
						}
					}
					break;
				}
				default:{
					done = false;
				}//{
			} if(!done) {//}
				if(page.match(/^(?:log|sign)in/)) {//signin and login pages
					done = true;
				}
			}
			
			log("page_mode - " + page_mode);
			log("dirty - " + dirty);
			
			if(dirty){
				this.saveData();
			}
			return done;
		},
		//States:["Include", "Inactive", "Exclude"],
		createLink:function(type, obj){
			var infos = [];
			switch(typeof(type)) {
				case "number": case "string":
					infos = this.linkTypes[type] || [];
					if(!isArray(infos))
						infos = [infos];
					break;
				case "object":
					infos = Array.isArray(type)?type:[type];
					break;
				default:
					return;
			}
			let prefix = this.local?"":"http://"+this.host+"/";
			for(var i = 0; i < infos.length; i++){
				let info = infos[i];
				let a;
				if(info.url || info.href){
					var filtered = objFilter(obj, info.fields, undefined, info.escape, true);
					if(filtered){
						a = document.createElement("a");
						if(info.url){
							let o = objMerge(filtered, info.pairs);
							if(info.serialize || infos.serialize)
								o = objMap(o, true, undefined, info.serialize || infos.serialize);
							a.href = prefix + info.url+"?"+obj2post(o);
						}
						else if(info.href){
							let href = info.href;
							let serialize = info.serialize || NoOp;
							for (let [name, value] in new Iterator(objMerge(filtered, info.pairs)))
								href = href.replace("{"+name+"}", serialize(value));
							a.href = prefix + href;
						}
					}
				}
				else if(info.post){
					var filtered = objFilter(obj, info.fields, undefined, info.escape, true);
					if(filtered){
						a = document.createElement("a");
						a.classList.add("javascript-submit-link");
						a.classList.add("jsl-"+type);
						
						let href = info.post;
						if(info.pairs){
							let serialize = info.serialize || NoOp;
							for (let [name, value] in new Iterator(objMerge(filtered, info.pairs)))
								href = href.replace("{"+name+"}", serialize(value));
						}
						
						let form = document.createElement("form");
							form.method="POST";
							form.action = prefix + href;
						
						let serialize = info.serialize || NoOp;
						
						if(info.extras) filtered = objMerge(filtered, info.extras);
						if(info.optional) filtered = objFilter(obj, info.optional, filtered);
						for(let name in filtered) {
							let input = document.createElement("input");
								input.type="hidden";
								input.name=name;
								input.value = serialize(filtered[name]);
							form.appendChild(input);
						}
						
						a.appendChild(form);
						
						let name;
						do
							name = "jslf" + Math.floor(Math.random()*10000);
						while(window.document.forms.namedItem(name));
						
						form.id = form.name = name;
						a.href = "javascript:document.forms."+name+".submit();";
						a.setAttribute("form", name);
					}
				}
				if(a) {
					if(arguments.length > 2) {
						for each(var item in Array.slice(arguments, 2))
							if(typeof(item) === "string")
								a.appendChild(document.createTextNode(info[item] || infos[item]));
							else
								a.appendChild(item);
					}
					
					let title = info.title || infos.title;
					if(title)
						a.title = title;
					a.setAttribute("createLink", type);
					return a;
				}
			}
			return;
		},
/**/
		resizeLinkCheck:function(root){
			let that = this;
			let a = compileXPath("./a");
			let submit = compileXPath("./form/input[@type='submit']");
			$Z(compileXPath(".//div[contains(concat(' ',@class,' '), ' reformed-link ') and .//input[contains(concat(' ',@class,' '), ' fix-me ')]]"), function(div){
				let s = $X(submit, div);
				s.classList.remove("fix-me");
				that.convertLinkSize($X(a, div), s);
			}, root);
		},
		convertLinkSize:function(a, submit){
			let w = a.offsetWidth;
			let h = a.offsetHeight;
			if(w == 0 && h == 0)
				submit.classList.add("fix-me");
			else {
				submit.style.width=w+"px";
				submit.style.height=h+"px";
			}
			//log(Array.concat(arguments, w, h));
		},
		convertLink:function(a){
			let name = a.getAttribute("form");
			if(name){
				let div = document.createElement("div");
					div.className=a.parentNode.className;
					div.classList.add("reformed-link");
				
				let form = $X("//form[@name='"+name+"']");
					form.className="reformed-link";
				
				a.classList.add("reformed-link");
				
				div.appendChild(form);
				insertAsParent(div,a);
				//let cs = window.getComputedStyle(a);
				let submit = document.createElement("input");
					submit.type="submit"
					//submit.value = a.textContent.trim();
					submit.classList.add("fix-me");//hack!!! Sizes are wrong the first time around. This is probably due to the point in time when this gets injected.
					this.convertLinkSize(a,submit);
					form.appendChild(submit);
				if(a.title)
					submit.title = a.title;
				
//				form.setAttribute("title", a.getAttribute("href"));
				a.removeAttribute("href");
				a.href = "javascript:void(null);"
			}
		},/**/
		update_page_map:{
//				max:"Help-Policies-Borrowing",
//				formats:"Help",
//				features:"Help-Policies-Account",
//				lending:"help-lendingpolicies",
//				waitinglist:"MyWaitingList",
//				checkedout:"MyBookshelf",
//				lending: new UpdateURL("LendingPolicies"),
//				account: new UpdateURL("MyAccount", {TitleLimit:0, PerPage:100}),
			},
	});
Provider.ProviderData = {
	//This is here so that it can access the provider data without having to have it passed in or re-evaluate it.
	//The data is used to nuke the waitinglist and checkout links. - Styling has changed so it doesn't work... most likely
	ignorable:function(obj){
			let data = this;
			let m = function(i){return obj.id == i.id && obj.format == i.format; };
			obj.getAdditional({
					BrokenScript:{xpath:".//script[contains(text(), 'document.write')]/following-sibling::*[1][self::noscript][not(@broken)]",
						parse:function(noscript){//The script is broken, so give me the noscript (to much work to fix script). 
								let found = evalNoScript(noscript.textContent);
								if(found.some(function(r){return r.nodeName != "#text"})) {
									noscript.setAttribute("broken", true);
									let last = noscript.nextSibling;
									for each(var node in found)
										noscript.parentNode.insertBefore(node, last);
								}
								else
									noscript.setAttribute("broken", "unknown");
								//log(noscript, found, noscript.getAttribute("broken"))
							}},
					/*Get:{xpath:[
						".//a[(starts-with(@href, 'BANGCart.dll?') and contains(concat(translate(@href, '?', '&'), '&'), '&Action=Add&')) or (starts-with(@href, 'BANGAuthenticate.dll?') and contains(concat(translate(@href, '?', '&'), '&'), '&Action=AuthCheck&') and contains(translate(@href, '?', '&'), '&URL=WaitingListForm.htm%3F'))]",
					].join(" | "), parse:function(a, i, obj, name, alt, results) {
							if(!obj.isNodeParsed(a, name)) {
								var link = search2obj(a.href.split("?")[1], true);
								if(link.action == "AuthCheck")
									link = search2obj(link.url.split("?")[1], true)
								if(link.id == obj.id && link.format == obj.format) {
									//results.push(a);
									obj.setNodeParsed(a, name);
									
									if(!"availability" in obj)
										obj.availability = (link.action == "Add")?"Add":"Hold";
									if(!"onWaitingList" in obj)
										obj.onWaitingList = data.waitinglist.some(m);
									if(!"checkedOut" in obj)
										obj.checkedOut = data.checkedout.some(m);
									
									a.classList.add("checked");
									
									if(obj.onWaitingList) {
										if(obj.availability != "Cart")//don't hold it if it is already on hold, but don't get in the way of placing it in the cart if we already have it on hold.
										{
											a.classList.add("strike");
											a.title = "You already have this title on hold!"
										}
									}
									if(obj.checkedOut) {
//													if(link.action != "Add")
										{
											a.classList.add("strike");
											a.title = "You have already have this title checked out."
										}
									}
								}
							}
						},},/**/
				});
		},
}
//}

var Providers = lazyProperties({
		addAliases:function(childParent){
				this.cachedAliases();
				let dirty = false;
				for(let [child, parent] in Iterator(childParent)){
					let kac = this.known_aliases[child];
					let ip = this.known_aliases[parent] || parent;
					if(this.known_aliases[child] != ip) {
						this.known_aliases[child] = ip;
						dirty = true;
					}
				}
				if(dirty)
					this.saveAliases();
				return this.known_aliases;
			},
		addAlias:function(parent, child){
				this.cachedAliases();
				let kac = this.known_aliases[child];
				let ip = this.known_aliases[parent] || parent;
				if(kac != ip) {
					log(child, ip);
					this.known_aliases[child] = kac = ip;
					this.saveAliases();
				}
				return this.known_aliases[child];
			},
//		letter:objMerge(new Provider("us.newsletter.overdrive.com", "Include", Parser.provider.Letter), {noSearch:true, noAutoUpdate:true, stealth:true}),
		saveAliases:function(){
				this.Supported;//we need this cached up to this point
				if(!this.known_aliases)
					return this.known_aliases = this.getAliases();
				let raw = this.aliasesToRaw(this.known_aliases);
				if(raw !== undefined)
					GM_setValue("aliases", JSON.stringify(raw));
				else
					GM_deleteValue("aliases");
				this.known_aliases = this.rawToAliases(raw || {});
				//active providers may need to be moved.
				let ap = this.activeProviders;
				let dirty = false;
				for(let [i, ph] of Iterator(ap)){
					let k = this.known_aliases[ph];
					if(k && ph != k){
						let p = this.Supported[k] = this.Supported[ph];
						delete this.Supported[ph];
						if(p instanceof Provider)
						p.updateHost(k);//this moves the data associated with the host.
						ap[i] = k;
						dirty = true;
					}
				}
				if(dirty)
					this.activeProviders = ap;
				this.inactiveProviders = this.resolveProviders(this.inactiveProviders);
				return this.known_aliases;
			},
		aliasesToRaw:function(aliases){
				for (let i in aliases){
					let check = /^[^.]+\.libraryreserve\.com$/;
					let out = aliases;
					let individuals = {};
					let groups = new Set();
					let raw = {};
					log(individuals, groups, raw);
					for(let child in out){
						let parent = out[child];
						if(child != parent){
							let gc = individuals[child];
							let gp = individuals[parent];
							if(gc){
								if(gp){
									//if(gc.length > gp.length)//we do this so we don't have to iterate over the larger set
									//	[gc, gp, /*gc.parent, gp.parent*/] = [gp, gc, /*gp.parent, gc.parent*/];//should swap the parents but it don't really matter
									groups.remove(gc);
									for(let value of gc){
										gp.push(value);
										individuals[value] = gp;
									}
									let t = gp.parent || gp.parent;
									if(t) 
										quickSetValueProperty(gp, "parent", t, false);
								} else {
									gc.unshift(parent);
									gp = individuals[parent] =  gc;
									if(!gp.parent && check.exec(parent))
										quickSetValueProperty(gp, "parent", parent, false);
								}
							} else if(gp){
								gp.push(child);
								individuals[child] = gp;
								if(!gp.parent && check.exec(child))
									quickSetValueProperty(gp, "parent", child, false);
							} else {
								groups.add(gp = individuals[child] = individuals[parent] =  [parent, child]);
								if(check.exec(child))
									quickSetValueProperty(gp, "parent", child, false);
								else if(check.exec(parent))
									quickSetValueProperty(gp, "parent", parent, false);
							}
						}
					}
					groups.forEach(function(group){
						if(group.parent)
							raw[group.parent] = group.filter((v) => v != group.parent);
						else
							raw[group[0]] = group.slice(1);
					});
					return raw;
				}
				return undefined;
			},
		rawToAliases:function(raw){
				let out = {};
				for(let name in raw){
					if(name != "undefined"){
						out[name] = name;//makes life potentially easier.
						for(let item of raw[name])
							if(item != "undefined")
								out[item] = name;
					}
				}
				return out;
			},
		getAliases:function(){
				let t = GM_getValue("aliases", "");
				if(t == ""){
					return {
						"emedia2go.org":"dcl.lib.overdrive.com",
						"listennjnw.com":"listennjnw.lib.overdrive.com",
						"elibrarynj.com": "www.listennj.com",
						"listennj.com": "www.listennj.com",
						"infolink.libraryreserve.com": "www.listennj.com",
						"listennj.lib.overdrive.com": "www.listennj.com",
						"poudre.lib.overdrive.com": "overdrive.poudrelibraries.org",
						"go.live-brary.com": "suffolkwave.org",
						"www.suffolkwave.org": "suffolkwave.org",
					};
				}
				return this.rawToAliases(JSON.parse(t));
			},
		getAliasesFor:function(host){
				return aliasesToRaw(cachedAliases())[host] || [];
			},
		cachedAliases:function(){
				return this.known_aliases || (this.known_aliases = this.getAliases());
			},
		get activeProviders(){
				var t = GM_getValue("domains", "");
				return t?t.split("/").filter(function(f){if(f != "librarybin.com") return f;}):[];
			},
		set activeProviders(v){
				if(v == null || v.length == 0)
					GM_deleteValue("domains");
				else
					GM_setValue("domains", v.filter(function(f){if(f != "librarybin.com") return f;}).join("/"));
			},
		get inactiveProviders(){
				var t = GM_getValue("domains-inactive", "");
				return t?t.split("/").filter(function(f){if(f != "librarybin.com") return f;}):[];
			},
		set inactiveProviders(v){
				if(v == null || v.length == 0)
					GM_deleteValue("domains-inactive");
				else
					GM_setValue("domains-inactive", v.filter(function(f){if(f != "librarybin.com") return f;}).join("/"));
			},
		storeProvider:function(host, mode, obj){
				var provider = this.getProvider(host);
				var Host = provider.host;
				provider.mode = mode;
			
				if(arguments.length > 2)
					provider.data = obj;
				
				var filter = function(f){return f != Host;};
			
				this.activeProviders = (mode === "Include")?this.activeProviders.filter(filter).concat(Host):this.activeProviders.filter(filter);
				this.inactiveProviders =  (mode === "Inactive")?this.inactiveProviders.filter(filter).concat(Host):this.inactiveProviders.filter(filter);
				
				return this.Supported[Host] = provider;
			},
		getProvider:function(host, local){
				var Host = this.dealiasProvider(host, local)
				var value = this.Supported[Host];
				switch(typeof(value)){
					default:
						if(value != null)
							return value;
					case "undefined":
						value = "Exclude";
					case "string":
						return this.Supported[Host] = new Provider(Host, value, local);
					case "boolean":
						return this.Supported[Host] = new Provider(Host, value?"Include":"Inactive", local);
				}
			},
		dealiasProvider:function(host, local){
				//check known aliases
				//we need to resolve aliases in a clever 
				this.cachedAliases();
				if(local) {
					/* SourceHost is HTTPOnly AHHHHHHHH
					let c = Cookies.getCookies();
					let sh = c[("SourceHost")] || [];
					if(sh.length){
						//this.saveAliases();//used to flatten everything first //assume it's flat
						let dirty = false;
						for(let ho of sh){
							let old = this.known_aliases[host];
							if(old != ho) {
								this.known_aliases[host]= ho;
								dirty = true;
							}
						}
						if(dirty)
							log(this.saveAliases());//used to save and flatten
					}*/
				}
				return this.known_aliases[host] || host;
			},
		resolveProviders:function(hosts){
				//check known aliases
				//highlighting for search.overdrive.com  doesn't work properly if the servers don't match
				this.cachedAliases();
				return hosts.map((host) => this.known_aliases[host] || host);
			},
	}, {
		Supported: function(){
			var me = {};
			for(var n of this.activeProviders)
				me[n]="Include";
			for(var n of this.inactiveProviders)
				me[n]="Inactive";
	//		me[Providers.letter.host] = Providers.letter;
			return me;
		},
	});

//{ CookieMonster
function CookieMonster(doc){
	this.doc = doc || document;
}
CookieMonster.prototype = installSelfDestructingGettersAndSetters({
		refresh:function(){ delete this.cookies; },
		getCookie:function(name){
			let list = this.cookies[name];
			if(!list){
				this.cookies[name] = list = [];
				let values = (";"+this.cache).split(";"+name+"=");
				for(let i = 1; i < values.length; i += 2)
					list.push(values[i].split(";")[0]);
			}
			return list;
		},
		getCookies:function(){
			this.cookies = {};
			for(let pair of this.doc.cookie.split(";")){
				let [,name, value] = /([^=]*)=(.*)/.exec(pair);
				let list = this.cookies[name];
				if(!list)
					this.cookies[name] = list = [];
				list.push(value);
			}
			return this.cookies;
		}
	}, {
		doc: function() document,
		cookies: function(that) that.getCookies(),
		cache: function(that) that.doc.cookies,
	}, true);
//}
lazyProperty(this, "Cookies", function(){
	return new CookieMonster(document);
});
	
lazyProperty(this, "Formats", function(){
		//{ Format
		function Format(title, type, software, alts){
			this.title = title;
			this.type = type;
			this.software = software;
			this.alts = alts || [];
		}
		Format.prototype = {
				get names(){ return [this.title].concat(this.alts || []); },
			};

		function FormatClass(title, titles){
			this.titles = titles || title;
			this.title = title;
			this.formats = [];
		}
		//}
		var names = {};
		var softwares = {};
		var classes = {
				"audiobook":new FormatClass("Audiobook", "Audiobooks"),
				"ebook":new FormatClass("eBook", "eBooks"),
				"video":new FormatClass("Video", "Videos"),
				"music":new FormatClass("Music"),
				//"online":new FormatClass("Online"),
				//"pending":new FormatClass("Pending"),
				"unknown":new FormatClass("Unknown"),
			};
		var numbers = {//The best place to get numbers from is the Advanced Search page
				/*"PDF eBook" sometimes means 50 or 450*/ 
				1: new Format("Microsoft eBook", "ebook", "Microsoft", []),//Old and dead
				25: new Format("OverDrive WMA Audiobook", "audiobook", "OverDrive", ["WMA Digital Audiobook"]),
				30: new Format("OverDrive Music", "music", "OverDrive", []),
				35: new Format("OverDrive Video", "video", "OverDrive", []),
				40: new Format("OverDrive Video (mobile)", "video", "OverDrive", []),//Child Format
				50: new Format("Adobe PDF eBook", "ebook", "Adobe", [/*Spanish "eBook de Adobe"*/]),
				302: new Format("Disney Online Book", "ebook", "Online", ["Disney Digital Books Online", "Disney Online Books"]),
				410: new Format("Adobe EPUB eBook", "ebook", "Adobe", ["Adobe EPUB  eBook"]),
				420: new Format("Kindle eBook", "ebook", "Amazon", ["Kindle Book", "Kindle Book (BETA)"]),
				425: new Format("OverDrive MP3 Audiobook", "audiobook", "OverDrive", ["MP3 Digital Audiobook"]),
				450: new Format("Open PDF eBook", "ebook", "Open", ["Open PDF"]),
				610: new Format("OverDrive READ", "ebook", "Online", []),
				635: new Format("Streaming Video", "video", "Online", []),
				810: new Format("Open EPUB eBook", "ebook", "Open", ["EPUB eBook", "Open EPUB"]),
				900: new Format("Mobipocket eBook", "ebook", "Mobipocket", []),//Old and dead
//				"-1": new Format("Pending", "pending", "", []),//Marketplace
//				"-100": new Format("Pending (eBook)", "pending", "", []),//Marketplace
//				"-200": new Format("Pending (Audiobook)", "pending", "", []),//Marketplace
			}
		let add = function(Num, format){
			for(var name of format.names)
				names[name] = Num;
			classes[format.type].formats.push(Num);
			let n = softwares[format.software];
			if(n)
				n.push(Num);
			else
				softwares[format.software] = [Num];
			return format;
		}
		for (var [Num, format] in new Iterator(numbers)) {
			add(Num, format);
		}
		let obj = {	Numbers:numbers, Names:names, Software:softwares, Classes:classes, 
				NameLookup: function(name){ return obj.Names[name] || 0;},
				NumberLookup: function(number){ return obj.Numbers[number] || add(number, obj.Numbers[number] = new Format("Unknown-" + number, "unknown", "Unknown"));},
				SoftwareLookup: function(software){ return obj.Software[software] || [];},
			}
		return obj;
	});

lazyProperty(this, "OverDrive", function(){
		//{ Service
		function ServiceLink(info){
				let target = info;
				let serialize = info.serialize || NoOp;
				if(info.post) {
					target.overwriteLink = function(a, obj){
						if(a) {
							if(info.fields) obj = objFilter(obj, info.fields, undefined, info.escape, true);
							if(obj) {
								a.classList.add("reformed-link");
								
								let form = document.createElement("form");//{
									form.method="POST";
									form.action = info.post
									form.className="reformed-link"
								//}
								for(name in obj) {
									let input = document.createElement("input");
										input.type="hidden";
										input.name=name;
										input.value = serialize(obj[name]);
									form.appendChild(input);
								}
								
								let div = document.createElement("div");//{
									div.className=a.parentNode.className;
									div.classList.add("reformed-link");
									div.appendChild(form);
								//}
								insertAsParent(div,a);

								let submit = document.createElement("input");//{
									submit.type="submit"
									//submit.value = a.textContent.trim();
									submit.style.width=a.offsetWidth+"px";
									submit.style.height=a.offsetHeight+"px";
									form.appendChild(submit);
								//}
								form.setAttribute("title", a.getAttribute(a.title?"title":"href"));
								a.removeAttribute("href");
								return div;
							}
						}
						return;
					}
				}
				else if(info.javascript) {
					target.overwriteLink = function(a, obj){
						if(!a){
							a = document.createElement("a");
							a.setAttribute("generated", true);
						}
						let escape = info.escape || NoOp;
						let args = info.arguments.map(function (name, to){return serialize(escape(GetFieldValue(obj, name, to), obj, name, to));});
						if(args.indexOf(undefined) != -1)
							return;//X_X
						a.href = "javascript:"+info.javascript + "(\"" + args.join("\", \"") + "\")";
						return a;
					}
				}
				else {
					target.overwriteLink = function(a, obj){
						var filtered = info.copyFields?obj:objFilter(obj, info.fields, undefined, info.escape, true);//This is correct.
						if(filtered){
							if(!a){
								a = document.createElement("a");
								a.setAttribute("generated", true);
							}
							if(info.url){
								let o = objMerge(filtered, info.pairs);
								if(info.serialize)
									o = objMap(o, true, undefined, info.serialize);
								a.href = info.url + "?" + obj2post(o);
							}
							else if(info.href) {
								let href = info.href;
								for (let [name, value] in new Iterator(objMerge(filtered, info.pairs)))
									href = href.replace("{"+name+"}", serialize(value));
								a.href = href;
							}
							else
								return;
							return a;
						}
					}
				}
				return target;
			}
		function Service(name, title, abbr, hosts, links, parse){
				this.service = name;
				this.title = title;
				for(let host of hosts)
					od.Hosts[host] = this;
				for(let name in links) {
					let link = links[name];
					if(!Array.isArray(link))
						links[name] = link = [link];
					for(let x = 0; x < link.length; x++)
						ServiceLink(link[x]);//this installs the correct overwriteLink on each of the links (these are called by Service.overwriteLink).
				}
				this.links = links;
				this.abbreviation = abbr;
				if(typeof parse === "function")
					this.parse = parse;
				od.Services[name] = this;
				ProviderBase.call(this);
			}
		Service.prototype = objCreate(ProviderBase.prototype, {
				createLink: function(type, obj){
					var a = this.overwriteLink.apply(this, [null].concat(Array.slice(arguments)));
					if(a){
						a.setAttribute("createLink", type);
						a.setAttribute("service", this.service);
					}
					return a;
				},
				overwriteLink: function(a, type, obj){
					let ret = null;
					let inf = this.links[type];
					if(inf) {
						let service = this;
						let info;
						for(let x = 0; (x < inf.length) && (ret == null); x++){
							info = inf[x];
							ret = info.overwriteLink(a, obj);
						}
						if(ret) {
							if(!a)//find it if it has been generated by us.
								a = $X(compileXPath("descendant-or-self::a[@generated]"));
							let title = info.title || inf.title || service.title;
							if(a) {
								title = title || a.title;
								a.title = title;
								a.setAttribute("service", service.service);
							}
							if(title !== a)//I think this is a bug //FIXME ???
								ret.title = title;
							for (let i = 3; i < arguments.length; i++) {
								ret.appendChild(arguments[i]);
							}
						}
					}
					return ret;
				},
				createOtherServiceLinks: function(node, obj, type, showAll){
//					log(arguments)
					let last = node.appendChild(document.createTextNode("["));
					type = type || "title";
					let show = globalSettings.serviceLinks;
//					log(show, showAll)
					for each(let info in OverDrive.Services){
//						let info = this.Services[n];
						if(info !== this && info.links[type] && (showAll || show[info.service])){
							let a = info.createLink(type, obj, document.createTextNode(info.abbreviation));
//							log(info, node, type, a)
							if(a) {
								node.appendChild(a);
								node.appendChild(last = document.createTextNode(", "));
							}
	//						else log(info, type, obj, n);
						}
					}
					
					if(last.nodeValue == ", ") last.nodeValue = "] ";//need a text node there, no point in not using it.
					else last.nodeValue = " ";//no services so no brackets.
					return node;
				},
				parse: function(bit){return;},
			});
		//}
		let od = {
			Services: {},
			Hosts: {},
			getService: function(domain, path) {
				return od.Hosts[domain];
			},
			createServiceLinks: Service.prototype.createOtherServiceLinks,
			createGlobalWishlistCheckbox:function(node, obj){
				var tobj = objFilter(obj, {"id":["id", 0],"format":["format", 1]});
				
				node.appendChild(objMerge(textcheckbox(" Wishlist", globalWishlist.obj2item(tobj), function(e){
							if(e.currentTarget.checked)
								globalWishlist.add(tobj);
							else
								globalWishlist.remove(tobj);
						}, globalWishlist.has(tobj)), {className:"nowrap"}));
				node.appendChild(document.createTextNode(" "));
				return node;
			},
		};
		let overdrive_base = "http://www.overdrive.com/"
		//let overdrive_classic = overdrive_base + "classic/"
		/* Search uses AQS (Advanced Query Syntax) http://msdn.microsoft.com/en-us/library/aa965711%28v=vs.85%29.aspx
			values are not case sensative but keywords and operators are.
			boolean AND/OR must be upper case
			modern search supports isbn searching, just put in the ISBN number and it opens up the TitleInfo page.
			you can also search for the UUID as well, 
			AQS does not do floating point numbers
		
			Note the WorldCat link: http://worldcatlibraries.org/wcpa/oclc/62300324
			https://web.archive.org/web/20070305034212/http://search.overdrive.com/TitleInfo.asp?ID={90071AE2-FA3A-4A9F-AA5F-AE5B2F9739C1}&Format=25
			http://www.contentreserve.com/TitleInfo.asp?ID=90071ae2-fa3a-4a9f-aa5f-ae5b2f9739c1&Format=25
			http://western.opac.marmot.org/EcontentRecord/2935666/Home
			Look at the marc record: it's 001 is ovr62300324
			You can search by the world cat number 62300324. I've tried to guess the field name with no success
			Unfortunately there doesn't seem to be an easy way to determine the worldcat number.
		
			http://catalog.library.nashville.org/EcontentRecord/40782
			Google: "PublisherCatalogNumber" overdrive -"marmot.org"
		
			edition:unabridged
			publisher:Penguin
			imprint:Penguin
			title:Test
			series:test
			subtitle:test - similar to series, which is often a componant but not always
			contentCreatorNames:
			subjects.name:Fantasy
			formatClassification:eBook, Audiobook or Video
			formats.formatName:"Kindle Book"
			formats.formatID:25
			regionalAvailability:"United States"
			region:"New York"
			fullDescription:
			shortDescription:
			popularity - integer, seems to max out around 140000, I don't know how this is calculated.
			publishDate
			languages:en - you can sort by "language"
			fileSize - integer, unit is byte but it as part of the query it only has to match one of the fileSize attributes of the various formats. So fileSize:(<1 AND >1) will return values! 
			ageGroup - movie ratings!
			duration - only exact time values work, < and > don't work. numbers don't seem to work about as useful as fileSize
			fileName:HeroesoftheValley-3135 <-- this is the odm filename http://fulfill.contentreserve.com/HeroesoftheValley-3135.odm? (plus a bunch of params)
			partCount:0
			source:"From the book" - refers to samples
			There is a field for content creator by "last, first" I don't know it's name
			
			These three are equivilent
			contentCreatorNames:"J.R.R. Tolkien" OR contentCreatorNames:"J. R. R. Tolkien"
			contentCreatorNames:("J.R.R. Tolkien" OR "J. R. R. Tolkien")
			contentCreatorNames:("J.R.R. Tolkien" "J. R. R. Tolkien")
			Note: To search for content released on a specific date, use the following: "publishDate:<=2013-03-20 AND publishDate:>=2013-03-20" and not: "publishDate:2013-03-20"
			publishDate:<=2013-03-20 == publishDate:<2013-03-21
			
			formatName:"Kindle Book" resolves to something like formats.formatName:"Kindle Book"
			formatID: resolves to something like supplemental.formatID but I'm not sure what the parent class is or something
			
			I think the prefix is something that starts with a value less than 'f' since formatID does not resolve to formats.formatID. I've tried the following with/without 'formats'.
			*enhancements
			*enhancement
			*enhances
			*enhanced
			*enhance
			*supplemental
			*supplement
			content.enhance
			content.enhanced
			contentEnhance
			contentEnhanced
			enhancedDetails
			
			supported operators are:
			<
			<=
			>
			>=
			-
			AND
			OR
			NOT
			https://search.overdrive.com/autocomplete/titles/?query=fullDescription%3Awolf%20AND%20publishDate%3A%3E2013-2-01
		*/
		//the core needs to be rewritten so that that encodeURIComponent happens as the URL is constructed. It should not happen on the individual componants like we are doing below.
		function smart_serial(value){ return encodeURIComponent(emQuote(value)); }
		let f = "useAutoFilters=f"
		let af = "&"+f;
		let qf = "?"+f;
		new Service("modern", "OverDrive Modern", "OD", ["www.overdrive.com", "search.overdrive.com"],{
				imprint:{href:overdrive_base+"search?q=imprint%3A{imprint}"+af, fields:["imprint"], serialize: smart_serial},
				title:{href:overdrive_base+"ti/{id}", fields:["id"]},
//				title:{href:overdrive_base+"TitleInfo/{id}/{format}", fields:["id", "format"]},
//				title:{href:overdrive_base+"TitleInfo.aspx?ReserveID={id}&FormatID={format}", fields:["id", "format"]},
				search:{url:overdrive_base+"SearchResults.aspx", copyFields:true},//probably doesn't work
				"title-search":[//{ Note: we trim off leading "The" if it exists, this is not strictly necessary as OverDrive does it automagically
					{href:overdrive_base+"search?q=title%3A{title} AND contentCreatorNames%3A{creator}"+af, fields:["title","creator"], serialize: smart_serial, escape:processForSort},
					{href:overdrive_base+"search?q=title%3A{title}"+af, fields:["title"], serialize: smart_serial, escape:processForSort},
				],//}
//				"title-search":{href:overdrive_base+"ti/{id}", fields:["id"]},//this is not a solution
//				"title-search":{href:overdrive_base+"SearchResults.aspx?ReserveID={id}", fields:["id"], title:"OverDrive Title Search"},
				series:objMerge([//{
						{href:overdrive_base+"search?q=series%3A{Series}&f-contentCreatorNames={creator}"+af, fields:{"creator":((t) => (t.creator && encodeURIComponent(t.creator))), "Series":((t) => (t.Series && smart_serial(t.Series)))}},
						{href:overdrive_base+"search?q=series%3A{Series}"+af, fields:["Series"], serialize: smart_serial},
					], {title:"Search for other titles in this series in the OverDrive database",}),//}
				creator:objMerge([//{
						{href:overdrive_base+"creators/{creatorNumber}/"+qf, fields:["creatorNumber"]},
						{href:overdrive_base+"search?q=contentCreatorNames%3A{creator}"+af, fields:["creator"], serialize: smart_serial},
					], {title:"Search for other titles by this creator in the OverDrive database",}),//}
				publisher:objMerge([//{
						// {href:overdrive_base+"publisher/{publisherNumber}/"+qf, fields:["publisherNumber"]},//doesn't work
						{href:overdrive_base+"search?q=publisher%3A{publisher}"+af, fields:["publisher"], serialize: smart_serial},
					], {title:"Search for other titles by this publisher in the OverDrive database",}),//}
			}, function(pathname){ //overdrive gutted and redesigned everything, none of this code works.
				let search = search2obj(location.search);
				let form = $X("//form[@action='/search']");
				if(form){
					window.setTimeout("htmlEncode = function(n){ return n; }", 0);//htmlEncode breaks everything and this is the easiest solution for fixing it.
					let afv = search.useAutoFilters || "f";//because this is really really annoying!
					if(form.useAutoFilters)
						form.useAutoFilters.value = afv;
					else
						form.appendChild(nodeMerge("input", {type:"hidden", name:"useAutoFilters", value:afv}));
				}
				let obj;
				let about = {};
				let sp = this;
				let pathsplit = pathname.split("/");
				let bit = pathsplit[1].toLowerCase();
				
				log(bit);
				{//Media Types for Advanced Search.
					/*
					let targetXPath = null;
					$Z("//form[@action='/SearchResults/ShowResults']", function(form){
						let target = $X(targetXPath = (targetXPath || compileXPath(".//div["+xPathListContains("@class", "left")+" and "+xPathListContains("@class", "advSearch")+"]")), form);
						if(target){
							let box = document.createElement("div");
								box.classList.add("advContainer");

							let label = box.appendChild(document.createElement("div"));
								label.appendChild(document.createTextNode("Results Per Page: "));
								label.classList.add("advLabel");
							
							let controls = box.appendChild(document.createElement("div"));
								controls.classList.add("advControl");//left
							
							let options = controls.appendChild(document.createElement("select"));
								options.name = "ddlResultsPerPage";
							for(let value of [10, 25, 50])
								options.appendChild(document.createElement("option")).appendChild(document.createTextNode(value));
							
							target.appendChild(document.createElement("div")).className="clear";
							target.appendChild(box);
							target.appendChild(document.createElement("div")).className="clear";
						}
						let formats = $X(".//select[@name='ddlMediaFormat']", form);
						if(formats){
							let controls = insertBefore(document.createElement("div"), formats);
							
							let map = {};
							function createGroup(text, modern){
								let opt = document.createElement("option");
								opt.innerHTML = text;
								let field = modern?modern+"Visible":"";
								opt.setAttribute("for", field);
								opt.value = ""
								opt.className = "indent1";
								return {title:opt, field:field};
							}
							$Z(compileXPath(".//input[@type='hidden' and starts-with(@name, 'hidShow')]"), function(r){ 
									let type = r.name.replace(/^hidShow(.*?)s?$/, "$1").toLowerCase();
									let text = Formats.Classes[type].titles;
									let obj = map[type] = createGroup(text, r.name);
									obj.checkbox = textcheckbox(""+text+"", r.name+"Visible", function(e){r.value = {true:"True", false:"False"}[this.checked];}, {True:true, False:false}[r.value]);
								}, form);
							
							//map.online = createGroup("Online", opt.getAttribute(map.ebook));//Modern doesn't have our Online designation
							
							for(let name of Object.keys(map).sort()){
								let item = map[name];
								formats.appendChild(item.title);
								if(item.checkbox)
									controls.appendChild(item.checkbox);
							}
							
							map.online = map.ebook;//Modern doesn't have our Online categorization.
							map.unknown = createGroup("Unknown", "");//This lets the sorting deal with unknown types and not implode.
							
							for(let opt of Array.slice(formats.options)){
								if(opt.value){
									let type = map[ Formats.NumberLookup(opt.value).type];
									let last = type.last || type.title;
									if(!last.parentNode)
										formats.appendChild(last);
									type.last = insertAfter(opt, last);//keeps the ordering
									opt.classList.add("indent2");
									opt.setAttribute("for", type.field);
								}
							}
							
							function setCheckbox(node, value){
//								log(node.checked != value, node, value, node.checked)
								if(node.checked != value)
									node.click();
							}
							
							addEvent(formats, "change", function(e){
								let target = this.options[this.selectedIndex].getAttribute("for");
								if(target)
									$Z(compileXPath(".//input[@type='checkbox' and starts-with(@id, 'hidShow')]"),function(r){ setCheckbox(r, r.id == target);}, this.form);
								else
									$Z(compileXPath(".//input[@type='checkbox' and starts-with(@id, 'hidShow')]"), function(r){ setCheckbox(r, true); }, this.form);
							});
						}
					});*/
					GM_addStyle([//{
							"#ddlMediaFormat .indent1 { margin-left:1em; }",
							"#ddlMediaFormat .indent2 { margin-left:2em; }",
							".advLabel { width: 8.5em; }",
							".advControl input[type='checkbox'] { width:auto; }",
							"ul.meta-accordion dl { cursor:default; }",//March 2014 - Looks silly to have a hand where you can't click.
						].join("\n\n")).id="AdvancedSearchMangler"//}
				}
				switch(bit) {
					case "":{//homepage
						obj = [];
						$Z("//ul/div/li/article", function(r,i){
								let title = new ServiceItem([r], null, null, {
										"Image":"./div["+xPathListContains("@class", "cover")+"]/a/img",
										"Title":"./div["+xPathListContains("@class", "details")+"]/header/h3["+xPathListContains("@class", "title")+"]",
										"Subtitle":{xpath:"following-sibling::h3["+xPathListContains("@class", "subtitle")+"]", node:"Title-node"},
										//"Creator":{xpath:"following-sibling::h4["+xPathListContains("@class", "creator")+"]", node:"Subtitle-node"},
										"Meta":"./div["+xPathListContains("@class", "details")+"]/div["+xPathListContains("@class", "meta")+"]",
										CreatorPairs:{xpath:"following-sibling::h4["+xPathListContains("@class", "creator")+"]", node:"Title-node", parse:function(node, i, obj, name, inst, results){
												let creators = [];
												for(let n of node.childNodes){
													if(n.nodeName == "#text"){
														name = n.textContent.trim();
														if(name){
															let role = $X("following-sibling::span["+xPathListContains("@class", "role")+"]", n);
															let text = SplitTextNode(n, name);
															let creator = {
																	name:name, 
																	id:undefined, 
																	number:undefined, 
																	link:insertAsParent(sp.createLink("creator", {creator:name}), text), 
																	text:text,
																	role:(role && role.textContent.trim() || "Author"),
																};
															creators.push(creator);
														}
													}
												}
												if(creators.length)
													obj.creatorObjs = creators;
												return node;
												/*let search = search2obj(node.search, true);
												let field;
												if("screator" in search)
													field = "Creators";
												else if("spublisher" in search)
													field = "Publisher";
												let res = obj.processAttribute(field, null, node.parentNode);
												if(res !== undefined)
													results.push([field, node.parentNode, res]);
												return res;*/
											},
										},
									});
								if(title.subtitle) {
									let node = title.nodes["Subtitle-value"];
									let link = sp.createLink("series", {Series:processForSort(title.subtitle)});
									link.appendChild(document.createTextNode("S"));
									let span = document.createElement("span");
									span.className = "topup";
									span.appendChild(document.createTextNode(" ["));
									span.appendChild(link);
									span.appendChild(document.createTextNode("] "));
									node.appendChild(span);
								}
								obj.push(title);
							});
						
						/*
						let form = $X("//form[@id='search']");
						if(form){
							let search = form.searchInput;
							let div = insertAfter(document.createElement("span"), form);
							let axis = div.appendChild(document.createElement("select"));
							let ds;
							{
								function dts(date){log(date); return date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();}
								let now = Date.now();
								let today = new Date(now);
								let tomorrow = new Date(now + 86400000);
								ds = "publishDate:>=" +dts(today)+ " AND " + "publishDate:<" +dts(tomorrow);
							}//less than tomorrow, but greater than or equal to today.
							let nodes = {"":"","Title":"title:", "Author":"contentCreatorNames:","Series":"series:", "Date":ds, "English":"languages:en", "Not Abridged":"NOT edition:abridged"};
							for(let [name, value] in Iterator(nodes)){
								let props = {};
								if(typeof value === "string" && value)
									props.value = value;
								let n = axis.appendChild(nodeMerge("option", name, props));
							}
							addEvent(axis, "change", function(e){
								if(this.value){
									if(search.value.trim()){
										search.value += " AND ";
									}
									search.value += this.value;
									//search.selectedOptions
								}
							});
						}//*/
						break;
					}
					//case "ti":
					//case "titleinfo":
					//case "titleinfo.aspx":
					//case "titleinfo.asp": 
					case "media":{
						//does not handle drm block.
						var title, book;
						obj = new ServiceItem(["//article[@id='media']"], null, null, {
								"Title":".//header["+xPathListContains("@class", "pageHeader")+"]/h1["+xPathListContains("@class", "title")+"]",
								"Subtitle":{xpath:"following-sibling::h2["+xPathListContains("@class", "subtitle")+"]", node:"Title-node"},
								ID:{xpath:".//@data-reserve-id", parse:function(node, i, obj, name, inst, results){if(!obj.id) obj.id = node.value; return node; }},
								//"FormatIcon":".//img[@id='imgFormatIcon']",
								"ServicerTypes":".//div[@id='rating']",
								"CreatorRoot":"./header["+xPathListContains("@class", "pageHeader")+"]/h2["+xPathListContains("@class", "creator")+"]",//it's possible to parse this but easier to 
								"Creators":{xpath:".//aside/ul["+xPathListContains("@class", "meta-accordion")+"]/li/span["+xPathListContains("@class", "label")+" and contains(text(),'Creators')]", parse:function(node, i, obj, name, inst, results){
										let creators = [];
										$Z(compileXPath("./../dl/dt"), function(r,i){
												let vn = $X(compileXPath("./following-sibling::dd[1]"), r);
												let value = vn.textContent.trim();
												let a = $X(("a[contains(text(),"+SmartQuotes(value)+")]"), obj.nodes["CreatorRoot-node"]);
												let number = undefined;
												if(a){
													number = a.pathname.split("/")[2];
													vn = replace(a.cloneNode(true), vn.childNodes[0]);
												} else {
													//we may be able to pickup the creator number later if it's picked up in Groups.
													vn = a = insertAsParent(sp.createLink("creator", {creator:value}), vn.childNodes[0]);
												}
												creators.push({name:value, id:undefined, number:number, link:a, text:(a||vn).childNodes[0], role:r.textContent.replace(/^[\s]*(.*)[\s]+:[\s]*$/,"$1"),});
											}, node);
										if(creators.length)
											obj.creatorObjs = creators;
									},},
								"Groups":{xpath:".//aside/ul["+xPathListContains("@class", "meta-accordion")+"]/li/span["+xPathListContains("@class", "label")+"]", parse:function(node, i, obj, name, inst, results) {
										let title = node.textContent.trim();
										let r = node.parentElement;
										let fn = Formats.NameLookup(title);
										if(fn){
											if(Array.isArray(obj.formats))
												obj.formats = {};
											var f = new FormatItem(obj, [r]);
											f.formats.push(fn);
											f.getAdditional({
												"Pairs":{field:"./dl/dt", value:"./following-sibling::dd[1]"},
											});
											obj.formats[fn] = f;

											if(obj.id){
												let k = node.appendChild(document.createTextNode(" "));
												var s = insertAfter(sp.createOtherServiceLinks(document.createElement("silly"), f, "title"), k);
												s.className="up smaller";
											}
										} else {
											switch(title) {
												case "Creators": break;//already parsed
												case "Publication Details":{
													obj.getAdditional({
														"Pairs":{field:"./dl/dt", value:"./following-sibling::dd[1]"},
													}, r);
													break;
												}
												default:
													let nr = /^About ([^()]*) \((.*)\)$/.exec(title);
													if(nr){
														let [, name, role] = nr;
														let link = $X("./span["+xPathListContains("@class", "bio")+"]/span["+xPathListContains("@class", "authorLink")+"]/a", r);
														let number = (link.pathname.split("/")[2]);
														if(!Array.isArray(obj.creatorObjs))
															obj.creatorObjs = [];
														let creator = obj.creatorObjs.find(function(co){return co.number == number || (co.number == undefined && co.name == name)});
														if(creator) {
															creator.desc = $X("./span["+xPathListContains("@class", "bio")+"]/p", r).textContent.trim();
															if(creator.number == null) {
																creator.number = number;
																creator.link.href = link.href;//our injected link has the wrong href, lets fix it.
															}
														} else//somehow you managed to get this far and find an otherwise undetected creator! I don't think this ever happens.
															obj.creatorObjs.push({name:name, id:undefined, number:number, link:link, text:undefined, role:role,});
													} else 
														log("Need clever parser for: "+title);
											}
										}
									},},
								//"H3":{field:"h3/descendant-or-self::*[contains(text(), ':') and position()<3][not(*)]", value:function(r, i, obj, title, pair, results){return doWhile(r, "following-sibling::*[node()][1][not(self::h3)]")}},
								/*"ctl00_ContentPlaceHolder1_lbl":{xpath:"//label[starts-with(@id,'ctl00_ContentPlaceHolder1_lbl')]", 
									parse:function(node, i, obj, name, inst, results){
											let field = node.id.substr(name.length);
											if(!field.endsWith("Label") && field != "Series") {
												let n = $X(compileXPath(".[not(node())]/..[count(label) = 1]"), node);//or @id = 'ctl00_ContentPlaceHolder1_lbl"+field+"Link'
												let res = obj.processAttribute(field, $X("//label[@id = 'ctl00_ContentPlaceHolder1_lbl"+field+"Label']") || (n && node), n || node);
												if(res !== undefined)
													results.push([field, n || node, res]);
											}
										},},*/
							});
						obj.number = Number(pathsplit[2]);
//						let id = 
						sp.linkify(obj);
						//log(obj);
//						log(obj)
						//*
						var t = obj.nodes["Title-node"];
						if(t){
							title = $X("./text()", t);
							if(obj.id){
								let k = t.appendChild(document.createTextNode(" "));
								var s = insertAfter(OverDrive.createGlobalWishlistCheckbox(sp.createOtherServiceLinks(document.createElement("span"), obj, "title"), obj), k);
								s.className="up smaller";
							}
							let jsl = [];
							let box = t.parentElement.appendChild(document.createElement("div"));
							for(let ph of Providers.activeProviders) {
								let p = Providers.getProvider(ph);
								let a = p.createLink("title", obj);
								if(a){
									if(box.children.length)
										box.appendChild(document.createTextNode(", "));
									a.appendChild(document.createTextNode(p.data.title || ph));
									box.appendChild(a);
									if(a.classList.contains("javascript-submit-link"))
										jsl.push({p:p,a:a});
								}
							}
							for(let link of jsl)
								link.p.convertLink(link.a);
						}//*/
						
						//title && insertAsParent(sp.createLink("title-search", obj), title);
						obj && obj.provider_groups.forEach(function(p){
								let title = obj.nodes[p+"-title"];
								if(title.nodeName == "TD")
									title = title.lastChild;
								
								let style = GM_addStyle("");
								if(title)
									insertAfter(textcheckbox("Show All", "toggle-"+p, function(e){ style.innerHTML = (this.checked?"":"span.subscription-none, span.subscription-inactive { display:none; }"); }, true), title);
							});
						GM_addStyle([//{
								".formatText .formatInfoValue { width:auto; }",
//								"#titleInfo { width: auto; max-width:36.19%; }",
								"#titleInfo .title { width: auto; }",
								".smaller.up { font-size:50%; }",
							].join("\n\n")).id="TitleInfoMangler"//}
						break;
					}
					case "creators": {//falls through to search
						if(typeof about.type === "undefined"){
							about.type = bit;
							about.autofiltering="f";
							let title = $X("//header["+xPathListContains("@class", "pageHeader")+"]/h1");
							$X("//input[@id='searchInput']").value = "contentCreatorNames:"+emQuote(title.textContent.trim());
							about.creator = {
									title:title,
									name:title.textContent.trim(), 
									number:Number(pathsplit[2]),
								};
							let box = title.parentElement.appendChild(document.createElement("div"));
							let jsl = [];
							let tobj = {creatorNumber:about.creator.number, creator:about.creator.name};
							for(let ph of Providers.activeProviders) {
								let p = Providers.getProvider(ph);
								let a = p.createLink("creator", tobj);
								if(a){
									if(box.children.length)
										box.appendChild(document.createTextNode(", "));
									a.appendChild(document.createTextNode(p.data.title || ph));
									box.appendChild(a);
									if(a.classList.contains("javascript-submit-link"))
										jsl.push({p:p,a:a});
								}
							}
							let a = sp.createLink("creator", {creator:about.creator.name});
							if(a){
								insertAsParent(a, title);
								if(a.classList.contains("javascript-submit-link"))
									jsl.push({p:p,a:a});
							}
							for(let link of jsl)//this will never happen but it's best to have it just in case.
								link.p.convertLink(link.a);
						}
					}
					//case "searchresults.aspx":
					//case "searchresults":
					case "subjects":{//falls through to search
						if(typeof about.type === "undefined"){
							about.type = bit;
							about.autofiltering="f";
							let title = $X("//header["+xPathListContains("@class", "pageHeader")+"]/h1");
							$X("//input[@id='searchInput']").value = "subjects.name:"+emQuote(title.textContent.trim());
						}
					}
					case "search":{
						obj = [];
						if(typeof about.type === "undefined"){//Fix stupid overdrive bug.
							about.type = bit;
							about.autofiltering="f";
							let q = search.q.replace(/\+/g, " ");
							if(q.indexOf(">") != -1){//cleanup time! This is why they did HTML escapes on input. They should have done HTML escapes when they wrote the value. This is a security risk.
								let s = $X("//span["+xPathListContains("@class", "queryContainer")+"]");
								{//Checks to see if the security risk has been exploited.
									let body = new DOMParser().parseFromString("", "text/html").body;
									body.innerHTML=q;
									let n = $X(".//*", body);
									if(n){
										window.location = "data:text/html;base64,PGh0bWw+PGJvZHk+PGgyPlNlY3VyaXR5IEV4Y2VwdGlvbiE8L2gyPklmIHlvdSBhcmUgc2VlaW5nIHRoaXMgaXQncyBiZWNhdXNlIHlvdSB3ZXJlIGRpcmVjdGVkIHRvIGEgVVJMIHRoYXQgaXMgdHJ5aW5nIHRvIGF0dGFjayB5b3UuPC9ib2R5PjwvaHRtbD4=";
										throw { message : "HTML Content Injection Detected! This is very very bad.", name : "Security Warning", };
									}
								}
								let k = $X("./*[descendant-or-self::input[@id='searchInput']]",s);
								while(k.nextSibling)
									remove(k.nextSibling);
								//while(k.previousSibling)
								//	remove(k.previousSibling);
							}
							if(q)
								$X("//input[@id='searchInput']").value = q;
							/*
							let t = $X("//span[@id='field-validation-summary']")
							let observer = new MutationObserver(function(mutations) {
								if(t.textContent.trim() == "You already have a saved search with this name"){
									//to get this to work, rebuild "search" but with a name. Then the update will take.
									The easiest way to attack the "OverDrive" object would be through a proxy infection. That way I could get at what it's children contain.
									You could use bindDelete, fake the click? and then call bindSave again.
								}
							});
							observer.observe(t, { childList: true, characterData: true });
							*/
						}
						$Z("//a[@href]", function(a){
							if(a.pathname == location.pathname){
								let s = search2obj(a.search);
								if(!s.useAutoFilters){
									s.useAutoFilters = (s.useAutoFilters || search.useAutoFilters || about.autofiltering || "f");
									a.search = "?"+obj2post(s);
								}
							}
							//log(location.pathname, a.pathname, a.search);
						})
						$Z("//ul["+xPathListContains("@class", "mediaResults")+"]//li", function(r,i){
								let title = new ServiceItem(r, r, null, {
										Title:".//h3["+xPathListContains("@class", "title")+"]/a", 
										Image: ".//div["+xPathListContains("@class", "cover")+"]/a/img",
										//Sample: ".//div["+xPathListContains("@class", "listenBtn")+"]//a[img[@alt='Sample']]",
										FormatType: ".//a["+xPathListContains("@class", "typeIndicator")+"]",
										//Description:".//div["+xPathListContains("@class", "description")+"]",
										Subtitle:".//h3["+xPathListContains("@class", "subtitle")+"]",
										//Series:".//div["+xPathListContains("@class", "listItemSubtitle")+"]/a",
										//ServicerTypes:".//div["+xPathListContains("@class", "listItemFind")+"]",
										//Pairs:{field: ".//div["+xPathListContains("@class", "creators")+" and not(a)]/span", value:"./following-sibling::text()",},
										Publisher:".//div["+xPathListContains("@class", "meta")+"]",
										CreatorPairs:{xpath: ".//h4["+xPathListContains("@class", "creator")+"]", parse:function(node, i, obj, name, inst, results){
											let creators = [];
											for(let n of node.childNodes){
												if(n.nodeName == "#text"){
													name = n.textContent.trim();
													if(name){
														let role = $X("following-sibling::span["+xPathListContains("@class", "role")+"]", n);
														let text = SplitTextNode(n, name);
														let number = undefined;
														let creator = {name:name, id:undefined, number:undefined, link:undefined, text:text, role:(role && role.textContent.trim() || "Author"),};
														let tobj = {creatorNumber:creator.number, creator:name};
														if(about.creator && about.creator.name == name){
															tobj.creatorNumber = creator.number = about.creator.number;
														}
														creator.link = insertAsParent(sp.createLink("creator", tobj), text);
														creators.push(creator);
													}
												}
											}
											if(creators.length)
												obj.creatorObjs = creators;
											return node;
											/*let search = search2obj(node.search, true);
											let field;
											if("screator" in search)
												field = "Creators";
											else if("spublisher" in search)
												field = "Publisher";
											let res = obj.processAttribute(field, null, node.parentNode);
											if(res !== undefined)
												results.push([field, node.parentNode, res]);
											return res;*/
										},},
									});
								if(title.nodes["Title-node"])
									title.number = Number(title.nodes["Title-node"].pathname.split("/")[2]);
								if(title.subtitle) {
									let node = title.nodes["Subtitle-value"];
									let link = sp.createLink("series", {Series:processForSort(title.subtitle)});
									link.appendChild(document.createTextNode("S"));
									let span = document.createElement("span");
									span.className = "topup";
									span.appendChild(document.createTextNode(" ["));
									span.appendChild(link);
									span.appendChild(document.createTextNode("] "));
									node.appendChild(span);
								}
								obj.push(title);
							});
						/*
						let countNodes = [];
						$Z("//span["+xPathListContains("@class", "morePaginationInfo")+"]", function(r){//I should rewrite this so it isn't such a crazy hack. There is almost no point in using regex.
								objFilter(/^[\s]*·[\s]*Showing[\s]+([1-9]\d*)[\s]*-[\s]*([1-9]\d*)[\s]+of[\s]+([1-9]\d*)/.exec(r.textContent), {"start":1, "end":2, "total":3}, countNodes);
								countNodes.push(SplitTextNode(findTextElementContaining(countNodes.end, r), countNodes.end));
							});
						if(!countNodes.length)
							countNodes = null;
						cell = insertAfter(document.createElement("div"), $X("//h5["+xPathListContains("@class", "sectionHeader")+"]"));
						obj = ListPage(cell, {},//{availability:true, filter:true, abridged:true, paging:true, countNodes: countNodes, provider:sp}, 
								$X("//ul["+xPathListContains("@class", "mediaResults")+"]"), ".//li", function(row, j){
										let title = new ServiceItem(row, $X(compileXPath("./preceding-sibling::tr[1]"), row) || row, null, {
													Title:".//div["+xPathListContains("@class", "title")+"]/a", 
													Image: ".//div["+xPathListContains("@class", "listItemCover")+"]/a/img[@name='cover']",
													Sample: ".//div["+xPathListContains("@class", "listenBtn")+"]//a[img[@alt='Sample']]",
													FormatType: ".//div["+xPathListContains("@class", "formatType")+"]",
													Description:".//div["+xPathListContains("@class", "description")+"]",
													Subtitle:".//div["+xPathListContains("@class", "listItemSubtitle")+" and not(a)]",
													Series:".//div["+xPathListContains("@class", "listItemSubtitle")+"]/a",
													ServicerTypes:".//div["+xPathListContains("@class", "listItemFind")+"]",
													Pairs:{field: ".//div["+xPathListContains("@class", "creators")+" and not(a)]/span", value:"./following-sibling::text()",},
													CreatorPairs:{xpath: ".//div["+xPathListContains("@class", "creators")+"]/a", parse:function(node, i, obj, name, inst, results){
														let search = search2obj(node.search, true);
														let field;
														if("screator" in search)
															field = "Creators";
														else if("spublisher" in search)
															field = "Publisher";
														let res = obj.processAttribute(field, null, node.parentNode);
														if(res !== undefined)
															results.push([field, node.parentNode, res]);
														return res;
													},},
												});
										sp.linkify(title);
		//								log(title);
										let t = title.nodes["Title-node"];
										if(t){
											t.appendChild(document.createTextNode(" "));
											let s = insertAfter(OverDrive.createGlobalWishlistCheckbox(sp.createOtherServiceLinks(document.createElement("span"), title, undefined, true), title), t);
												s.className="up";
										}
										return title;
									}, LinkAdjust, imageResizing);//log, 
						
//						if(mode && obj.length && search2obj(location.search, true).reserveid)
//							document.title = document.title.replace(" -", ": \"" + obj[0].title + "\" by \"" + obj[0].creators[0] + "\" -");
						*/
						break;
					}
				}
				return obj;
			});
		new Service("reserve", "Content Reserve", "CR", [//{
				"ebookreserve.com",
				"server1.glassbook.com",//wtf?
				"server2.glassbook.com",//wtf?
				"contentreserve.com",
				"www.contentreserve.com",
				"secure.contentreserve.com",
			], {//}
				title:{url:"http://www.contentreserve.com/TitleInfo.asp", fields:{"ID":"id", "Format":"format"}}, 
				enhanced:{url:"http://www.contentreserve.com/EnhancedDetails.asp", fields:{"ID":"id", "Format":"format"}},
			}, function(pathname){
				let sp = this;
				let pathsplit = pathname.split("/");
				let bit = pathsplit[pathsplit.length - 1].toLowerCase();
				log(bit);
				let obj;
				switch(bit) {
					case "enhanceddetails.asp":{
						//work on me
						//add a link to 
						break;
					}
					case "":
					case "login.asp":{
						var objs = [];
						$Z("//a[starts-with(@href, 'TitleInfo.asp?')]/ancestor::tbody[1]", function(r,i){
								var obj = new Item([r]);
								obj.getAdditional({
										Title:"tr[contains(concat(' ', @class, ' '), ' feature-title ')]/td/a",
										Image:".//img",
										Pairs:{ field:"tr[contains(concat(' ', @class, ' '), ' feature-detail ')]/td[contains(concat(' ', @class, ' '), ' feature-label ')]",  value:"following-sibling::td[1]"},
									});
								obj.enhance();
								sp.linkify(obj);
								var s = insertAfter(sp.createOtherServiceLinks(document.createElement("span"), obj, "title", true), obj.nodes["Title-node"]);
								objs.push(obj);
							});
						log(objs);
						break;
					}
					//case "ti":
					//case "titleinfo":
					//case "titleinfo.aspx":
					case "titleinfo.asp": {
						//does not handle drm block.
						var title, book;
						obj = new ServiceItem($X("//td[comment()[contains(., '  ****************************************************************************  ')]]"), null, null, {
								"Title":".//tr[@class='title']/td",
								"Subtitle":{xpath:"ancestor::tr[1]/following-sibling::tr[1][contains(@class, 'subtitle')]/td[@colspan='2']", node:"Title-node"},
								"Pairs":{field:".//tr[contains(@class, 'shelf-detail')]/td[contains(@class, 'shelf-label') or contains(@class, 'subtitle')]",
									value:"./ancestor::tr[1][count(td) = 2]/td[2] | ./ancestor::tr[1][count(td) = 1]/following-sibling::tr[1]/td[1][not(contains(@class, 'shelf-label') or contains(@class, 'subtitle'))]"},
						});
						let o = search2obj(location.search, true);
						if(o.id && !obj.id)
							obj.id = o.id;
						if(obj.format == null && o.format)
							obj.formats.push(Number(o.format));
						sp.linkify(obj);
						obj.nodes["Title-node"] && OverDrive.createGlobalWishlistCheckbox(sp.createOtherServiceLinks(obj.nodes["Title-node"], obj, "title", true), obj);
						obj.supplements && obj.supplements.forEach( function(ob){ sp.createOtherServiceLinks(ob.nodes["Title-node"], ob, "title", true); });
	//						obj.kick();
						
						//title && insertAsParent(sp.createLink("title-search", obj), title);
						obj && obj.provider_groups.forEach(function(p){
								let title = obj.nodes[p+"-title"];
								if(title.nodeName == "TD")
									title = title.lastChild;
								
								let style_all = GM_addStyle("");
								let style_overdrive = GM_addStyle("");
								if(title){
									if(p == "Retailer(s)"){//this is wrong
										insertAfter(textcheckbox("Hide Overdrive", "toggle-"+p+"-overdrive", function(e){ style_overdrive.innerHTML = (this.checked?"span.subscription-overdrive { display:none; }":""); }, false), title);
										insertAfter(document.createTextNode(" "), title);
									}
									insertAfter(textcheckbox("Hide Others", "toggle-"+p, function(e){ style_all.innerHTML = (this.checked?"span.subscription-none, span.subscription-inactive { display:none; }":""); }, false), title);
								}
							});
						break;
					}
				}
				return obj;
			});
		//DEAD - new Service("letter", "DLR Newsletters", "NL", { title:{url:"http://us.newsletter.overdrive.com/ContentDetails.htm", fields:{"id":"id"}}, });
		new Service("video", "OverDrive Streeming Video", "SV", ["video.overdrive.com","videosamples.overdrive.com"], {
				title:{href:"http://videosamples.overdrive.com/?crid={id}", fields:{"id":((t) => ((t.Formats && t.Formats.some((f) => f == 635))?t.id:undefined)),},},
			}, function(pathname){
				let sp = this;
				let pathsplit = pathname.split("/");
				let bit = pathsplit[1].toLowerCase();
				log(bit);
				let obj;
				switch(bit) {
					case "watch":{
						//does not handle drm block.
						obj = new ServiceItem($X("//div[@id='wrapper']"), null, null, {
								"Title":".//div["+xPathListContains("@class", "title")+"]",
								"Image":".//img["+xPathListContains("@class", "thumbnail")+"]",
								//"Description":".//span["+xPathListContains("@class", "description")+"]",
								"Creators":".//span["+xPathListContains("@class", "description")+"]//ul["+xPathListContains("@class", "creators")+"]",
								//"Subtitle":{xpath:"ancestor::tr[1]/following-sibling::tr[1][contains(@class, 'subtitle')]/td[@colspan='2']", node:"Title-node"},
								//"Pairs":{field:".//tr[contains(@class, 'shelf-detail')]/td[contains(@class, 'shelf-label') or contains(@class, 'subtitle')]",
								//	value:"./ancestor::tr[1][count(td) = 2]/td[2] | ./ancestor::tr[1][count(td) = 1]/following-sibling::tr[1]/td[1][not(contains(@class, 'shelf-label') or contains(@class, 'subtitle'))]"},
						});
						obj.formats = [635];//If it's streaming a sample, it will stream the entire video... I hope.
						sp.linkify(obj);
						for(var co of obj.creatorObjs){
							let span = insertAfter(sp.createOtherServiceLinks(document.createElement("span"), {creator:co.name}, "creator", true), co.text);
							span.className = "topup";
						}
						obj.nodes["Title-node"] && /*OverDrive.createGlobalWishlistCheckbox*/NoOp(sp.createOtherServiceLinks(obj.nodes["Title-node"], obj, "title", true), obj);
						break;
					}
				}
				return obj;
			});
		new Service("marketplace", "OverDrive Marketplace", "MP", ["marketplace.overdrive.com"], {
				title:{href:"https://marketplace.overdrive.com/TitleDetails?crid={id}", fields:["id"],},
			}, function(pathname){
				let sp = this;
				//let pathsplit = pathname.split("/");
				//let bit = pathsplit[1].toLowerCase();
				//log(bit);
				let obj;
				$Z("//a[starts-with(@href,'/TitleDetails?crid=')]",function(a){
					if(a.textContent.trim()){//no image links!
						insertAfter(document.createTextNode(" "), a);
						sp.createOtherServiceLinks(a.parentNode, objFilter(search2obj(a.search, true), {"id":"crid"}), "title");
					}
				});
			})
		new Service("cheater", "Rotten Tomatoes", "RT", [], {
				title:{href:"http://www.rottentomatoes.com/search/?search={title}", fields:{"title":((t) => ((t.Formats && t.Formats.some((f) => (f == 635 || f == 35)))?t.title:undefined)),},},
			}, function(){})
		return od;
		//http://videosamples.overdrive.com/?crid=8683ED4D-9364-4CDA-9BF6-F486AD388710&themeprofile=DLR-78&retailerid=LosAngeles
		//http://videosamples.overdrive.com/?crid=8683ED4D-9364-4CDA-9BF6-F486AD388710
	});

lazyProperty(this, "CountryCodes", function(){//ISO-3166-1993
	return {//https://www.iso.org/obp/ui/#search/code/
			"AF":"Afghanistan",
			"AX":"Åland Islands",
			"AL":"Albania",
			"DZ":"Algeria",
			"AS":"American Samoa",
			"AD":"Andorra",
			"AO":"Angola",
			"AI":"Anguilla",
			"AQ":"Antarctica",
			"AG":"Antigua and Barbuda",
			"AR":"Argentina",
			"AM":"Armenia",
			"AW":"Aruba",
			"AU":"Australia",
			"AT":"Austria",
			"AZ":"Azerbaijan",
			"BS":"Bahamas (the)",
			"BH":"Bahrain",
			"BD":"Bangladesh",
			"BB":"Barbados",
			"BY":"Belarus",
			"BE":"Belgium",
			"BZ":"Belize",
			"BJ":"Benin",
			"BM":"Bermuda",
			"BT":"Bhutan",
			"BO":"Bolivia, Plurinational State of",
			"BQ":"Bonaire, Sint Eustatius and Saba",
			"BA":"Bosnia and Herzegovina",
			"BW":"Botswana",
			"BV":"Bouvet Island",
			"BR":"Brazil",
			"IO":"British Indian Ocean Territory (the)",
			"BN":"Brunei Darussalam",
			"BG":"Bulgaria",
			"BF":"Burkina Faso",
			"BI":"Burundi",
			"CV":"Cabo Verde",
			"KH":"Cambodia",
			"CM":"Cameroon",
			"CA":"Canada",
			"KY":"Cayman Islands (the)",
			"CF":"Central African Republic (the)",
			"TD":"Chad",
			"CL":"Chile",
			"CN":"China",
			"CX":"Christmas Island",
			"CC":"Cocos (Keeling) Islands (the)",
			"CO":"Colombia",
			"KM":"Comoros",
			"CG":"Congo",
			"CD":"Congo (the Democratic Republic of the)",
			"CK":"Cook Islands (the)",
			"CR":"Costa Rica",
			"CI":"Côte d'Ivoire",
			"HR":"Croatia",
			"CU":"Cuba",
			"CW":"Curaçao",
			"CY":"Cyprus",
			"CZ":"Czech Republic (the)",
			"DK":"Denmark",
			"DJ":"Djibouti",
			"DM":"Dominica",
			"DO":"Dominican Republic (the)",
			"EC":"Ecuador",
			"EG":"Egypt",
			"SV":"El Salvador",
			"GQ":"Equatorial Guinea",
			"ER":"Eritrea",
			"EE":"Estonia",
			"ET":"Ethiopia",
			"FK":"Falkland Islands (the) [Malvinas]",
			"FO":"Faroe Islands (the)",
			"FJ":"Fiji",
			"FI":"Finland",
			"FR":"France",
			"GF":"French Guiana",
			"PF":"French Polynesia",
			"TF":"French Southern Territories (the)",
			"GA":"Gabon",
			"GM":"Gambia (The)",
			"GE":"Georgia",
			"DE":"Germany",
			"GH":"Ghana",
			"GI":"Gibraltar",
			"GR":"Greece",
			"GL":"Greenland",
			"GD":"Grenada",
			"GP":"Guadeloupe",
			"GU":"Guam",
			"GT":"Guatemala",
			"GG":"Guernsey",
			"GN":"Guinea",
			"GW":"Guinea-Bissau",
			"GY":"Guyana",
			"HT":"Haiti",
			"HM":"Heard Island and McDonald Islands",
			"VA":"Holy See (the) [Vatican City State]",
			"HN":"Honduras",
			"HK":"Hong Kong",
			"HU":"Hungary",
			"IS":"Iceland",
			"IN":"India",
			"ID":"Indonesia",
			"IR":"Iran (the Islamic Republic of)",
			"IQ":"Iraq",
			"IE":"Ireland",
			"IM":"Isle of Man",
			"IL":"Israel",
			"IT":"Italy",
			"JM":"Jamaica",
			"JP":"Japan",
			"JE":"Jersey",
			"JO":"Jordan",
			"KZ":"Kazakhstan",
			"KE":"Kenya",
			"KI":"Kiribati",
			"KP":"Korea (the Democratic People's Republic of)",
			"KR":"Korea (the Republic of)",
			"KW":"Kuwait",
			"KG":"Kyrgyzstan",
			"LA":"Lao People's Democratic Republic (the)",
			"LV":"Latvia",
			"LB":"Lebanon",
			"LS":"Lesotho",
			"LR":"Liberia",
			"LY":"Libya",
			"LI":"Liechtenstein",
			"LT":"Lithuania",
			"LU":"Luxembourg",
			"MO":"Macao",
			"MK":"Macedonia (the former Yugoslav Republic of)",
			"MG":"Madagascar",
			"MW":"Malawi",
			"MY":"Malaysia",
			"MV":"Maldives",
			"ML":"Mali",
			"MT":"Malta",
			"MH":"Marshall Islands (the)",
			"MQ":"Martinique",
			"MR":"Mauritania",
			"MU":"Mauritius",
			"YT":"Mayotte",
			"MX":"Mexico",
			"FM":"Micronesia (the Federated States of)",
			"MD":"Moldova (the Republic of)",
			"MC":"Monaco",
			"MN":"Mongolia",
			"ME":"Montenegro",
			"MS":"Montserrat",
			"MA":"Morocco",
			"MZ":"Mozambique",
			"MM":"Myanmar",
			"NA":"Namibia",
			"NR":"Nauru",
			"NP":"Nepal",
			"NL":"Netherlands (the)",
			"NC":"New Caledonia",
			"NZ":"New Zealand",
			"NI":"Nicaragua",
			"NE":"Niger (the)",
			"NG":"Nigeria",
			"NU":"Niue",
			"NF":"Norfolk Island",
			"MP":"Northern Mariana Islands (the)",
			"NO":"Norway",
			"OM":"Oman",
			"PK":"Pakistan",
			"PW":"Palau",
			"PS":"Palestine, State of",
			"PA":"Panama",
			"PG":"Papua New Guinea",
			"PY":"Paraguay",
			"PE":"Peru",
			"PH":"Philippines (the)",
			"PN":"Pitcairn",
			"PL":"Poland",
			"PT":"Portugal",
			"PR":"Puerto Rico",
			"QA":"Qatar",
			"RE":"Réunion",
			"RO":"Romania",
			"RU":"Russian Federation (the)",
			"RW":"Rwanda",
			"BL":"Saint Barthélemy",
			"SH":"Saint Helena, Ascension and Tristan da Cunha",
			"KN":"Saint Kitts and Nevis",
			"LC":"Saint Lucia",
			"MF":"Saint Martin (French part)",
			"PM":"Saint Pierre and Miquelon",
			"VC":"Saint Vincent and the Grenadines",
			"WS":"Samoa",
			"SM":"San Marino",
			"ST":"Sao Tome and Principe",
			"SA":"Saudi Arabia",
			"SN":"Senegal",
			"RS":"Serbia",
			"SC":"Seychelles",
			"SL":"Sierra Leone",
			"SG":"Singapore",
			"SX":"Sint Maarten (Dutch part)",
			"SK":"Slovakia",
			"SI":"Slovenia",
			"SB":"Solomon Islands (the)",
			"SO":"Somalia",
			"ZA":"South Africa",
			"GS":"South Georgia and the South Sandwich Islands",
			"SS":"South Sudan",
			"ES":"Spain",
			"LK":"Sri Lanka",
			"SD":"Sudan (the)",
			"SR":"Suriname",
			"SJ":"Svalbard and Jan Mayen",
			"SZ":"Swaziland",
			"SE":"Sweden",
			"CH":"Switzerland",
			"SY":"Syrian Arab Republic (the)",
			"TW":"Taiwan (Province of China)",
			"TJ":"Tajikistan",
			"TZ":"Tanzania, United Republic of",
			"TH":"Thailand",
			"TL":"Timor-Leste",
			"TG":"Togo",
			"TK":"Tokelau",
			"TO":"Tonga",
			"TT":"Trinidad and Tobago",
			"TN":"Tunisia",
			"TR":"Turkey",
			"TM":"Turkmenistan",
			"TC":"Turks and Caicos Islands (the)",
			"TV":"Tuvalu",
			"UG":"Uganda",
			"UA":"Ukraine",
			"AE":"United Arab Emirates (the)",
			"GB":"United Kingdom (the)",
			"US":"United States (the)",
			"UM":"United States Minor Outlying Islands (the)",
			"UY":"Uruguay",
			"UZ":"Uzbekistan",
			"VU":"Vanuatu",
			"VE":"Venezuela, Bolivarian Republic of ",
			"VN":"Viet Nam",
			"VG":"Virgin Islands (British)",
			"VI":"Virgin Islands (U.S.)",
			"WF":"Wallis and Futuna",
			"EH":"Western Sahara*",
			"YE":"Yemen",
			"ZM":"Zambia",
			"ZW":"Zimbabwe",
		};
});
//log(OverDrive);
//log(Formats);
//log(Providers)
//log(Cookies);

lazyProperty(this, "globalSettings", function(){
	function Setting(name, generator, defaultValue, serialize, deserialize){
			this.name = name;
			this.generator = generator;
			this.serialize = serialize || JSON.stringify;
			this.deserialize = deserialize || JSON.parse;
			let item = this;
			let obj = {
				enumerable: true, 
				configurable: false, 
				set: function(value){
//					log("set", item.name, value, item.serialize(value))
//					if(typeof(value) === "object")
//						delete item.__proto__;
					GM_setValue(item.name, item.serialize(value))
				}, 
				get: function(){
					let raw = GM_getValue(item.name);
					if(raw !== undefined)
					{
						raw = item.deserialize(raw);
						if(typeof(raw) === "object")
							raw.__proto__ = defaultValue;
					}
					else if(typeof(defaultValue) === "object")
						raw = {__proto__:defaultValue};
					else
						raw = defaultValue;
//					log(raw)
					return raw;
				},
			};
			Object.defineProperty(settings, item.name, obj);
			Object.defineProperty(item, "value", obj);
			settings.complex.push(this);
		}
	let settings = {
			complex:[],
			createConfigInterface:function(){
					let node = document.createElement("div");
					this.complex.forEach(function(item){let temp = document.createElement("div"); node.appendChild(item.generator(temp) || temp);});
					return node;
				},
		};
	new Setting("serviceLinks", function(node){
			let item = this;
			let value = this.value;
			node.appendChild(document.createTextNode("For which databases should links be displayed?"));
			node.appendChild(document.createElement("br"));
			let changed = false;
			for each(service in OverDrive.Services) {
				let name = service.service
				node.appendChild(textcheckbox(service.title, "service-"+name,  function(e){let temp = item.value; temp[name] = e.currentTarget.checked; item.value = temp;}, value[name]));
				node.appendChild(document.createElement("br"));
			}
		}, (function(){let def = {}; for(let n in OverDrive.Services) def[n] = true; return def;})() );
	return settings;
});

lazyProperty(this, "globalWishlist", function(){
	return {
		obj2item: function(obj){return obj.id.toLowerCase().replace(/[{}]+/g,""); },
		item2obj: function(item){return objFilter(item.split(":"), {id:0,format:1});},
		add: function(obj){
				//Array.map(arguments, globalWishlist.obj2item)
				let id = globalWishlist.obj2item(obj);
				let v = GM_getValue("wishlist") || "";
				if(!v.length)
					GM_setValue("wishlist", id);
				else {
					let p = v.indexOf(id);
					if(p == -1)
						GM_setValue("wishlist", v+","+id);
					else if(v.length > p + id.length && v[p + id.length] == ":")
						GM_setValue("wishlist", v.slice(0, p + id.length) + v.slice((v+",").indexOf(",", p)));
				}
			},
		remove: function(obj){
				let v = GM_getValue("wishlist") || "";
				if(v.length) {
					v = "," + v;
					let id = globalWishlist.obj2item(obj);
					let p = v.indexOf(","+id);
					if(p)
						GM_setValue("wishlist", (v.slice(0, p) + v.slice((v+",").indexOf(",", p + id.length))).slice(1));
				}
			},
		has: function(obj) { return (","+(GM_getValue("wishlist") || "")+",").indexOf(","+globalWishlist.obj2item(obj)+",") > -1; },
		get items() { return (value = (GM_getValue("wishlist") || ""))?value.split(",").map(globalWishlist.item2obj):[]; },
	};
});

/*lazyProperty(this, "languages", function(){
	return {
		"default":"en",
		en:{
			llp_checkout_max:{"starts-with":"You can check out up to ", regexp:/You can check out up to ([1-9][\d]*) titles./},
			//Up to 5 titles can be placed on hold at one time. We'll send you an email when a title becomes available. You have 5 days to check out your hold after we email you notice that it is available.
			llp_hold_max:{"contains":"titles can be placed on hold at one time. We'll send you an email when a title becomes available. You have",
				regexp:/Up to ([1-9][\d]*) titles can be placed on hold at one time. We'll send you an email when a title becomes available. You have ([1-9][\d]*) days to check out your hold after we email you notice that it is available./},
			llp_cart_max:{"contains":" titles at a time. Titles are removed from your ",
				regexp:/Your [\S]+ will hold up to ([1-9][\d]*) titles at a time. Titles are removed from your [\S]+ after ([1-9][\d]* (?:minute|hour|day|week|month|year)s?) so that other users can have the chance to check them out./},
			cart_max:{"starts-with":"You can have up to ", regexp:/You can have up to ([1-9][\d]*) titles in your /},
			holds_max:{"starts-with": "You can place up to", regexp: /You can place up to ([1-9][\d]*) titles on hold at a time. /},
			items_max:{"starts-with":"You can have up to", regexp: /You can have up to ([1-9][\d]*) titles checked out at any given time./},
			hold_expire:{"contains": "The item will be held for you for"}, 
			checkout_max:{"starts-with":"Our system allows you to put up to"},
			cart_timeout:{"contains":"it will remain there for", regexp:/it will remain there for ([1-9][\d]* (?:minute|hour|day|week|month|year)s?) before it is automatically removed./},
			formats:{"starts-with":"To review system requirements and download free software for your preferred format, click below:"},
			patron:{"starts-with":"You are patron ", regexp:/You are patron ([1-9][\d]*) out of ([1-9][\d]*) on the waiting list\./},
			notified:{"starts-with":"Email notification sent: ", regexp:/^Email notification sent: (.*)$/},
			1330:{"starts-with:":"We're sorry, but you have reached the holds limit of"},
			library_copies:{"contains":"Library copies owned: "},
		},
		search_pattern:/[\s]*([\S]+)/y,
		generalValueReader: function(obj, text, pos, regexp){
			var regexp = new RegExp(regexp || this.search_pattern);
			regexp.lastIndex = pos;
			var m = regexp.exec(text);
			if(m)
				return objMerge(m, obj);
			return;
		},
		getValue: function(name, base, _lang){
			var obj = this.getValueObj(name, base, _lang);
			return obj && ((obj.length>2)?Array.slice(obj,1):obj[1]);
		},
		getValueObj: function(name, base, _lang) {
			let data = this[_lang || lang || this["default"]][name];
			if(base == null || typeof(base.length) === "undefined")
				base = [base];
			if(data) {
				data = (data.join && data) || [data];
				for(let tn in data)
				{
					let test = data[tn];
					for(let func in test)
					{
						if(func == "requires" || func == "regexp" || func == "parse")
							continue;
						let d = test[func];
						let search = (d.join && d) || [d];
						for(let sn in search) {
							let str = search[sn];
							let f = compileXPath("descendant-or-self::text()["+func+"(.,\""+str+"\")]");
							for each(let b in base)
								//if(node = $X("descendant-or-self::text()["+((func === "equals")?"(. = ":(func+"(., "))+"'"+str+")']", b)) {
								for each(let node in $W(f, b)) {
									let pos = -1;
									let text = node.nodeValue;
									let obj = {
										"node":node.parentNode,
										"text":node};
//									log(arguments, func, str, b)
									if(test.parse)
										obj = test.parse(obj, func, str, name);
									else if(test.regexp || 0 <= (pos = text.indexOf(str)))
										obj = this.generalValueReader(obj, text, (0 <= pos)?(pos + str.length):0, test.regexp);
									if(obj !== undefined) {
										if(test.requires) {
											let r = test.requires;
											let ra = (r.join && r) || [r];
											for(let xn in ra)
												if($X(ra[xn], node.parentNode))
													return obj;
										}
										else
											return obj;
									}
								}
						}
					}
				}
			}
			return;
		},
	};
});*/
/*
waiting = { <format:id> {providers: [ {server, copies, queue-position, queue-length}, ] }
wishlist = { <format:id> }
providers = {<provider>:{state, name, features:{}, formats:[]},}
*/

function ListPage(top, config, table){
	let args = Array.slice(arguments, 3);
	let parse = function(table){
		let objs = [];
		for(var i = 0; i<args.length; i++){
			switch(typeof(args[i])) {
				case "object":
					if(!(itemFinder instanceof String))
						continue;
				case "string":
					$Z(compileXPath(args[i]), function(r, j, func, out){
							if(!Array.isArray(func)){
								func = [func];
							}
							for(var f of func){
								let obj = f.apply(this, arguments);
								if(obj !== undefined) out.push(obj);
							}
						}, table, args[++i], objs, config.provider);
					break;
				case "function":
					args[i](table, objs, config.provider);
			}
		}
		return objs;
	};
	
	let page = parse(table);
	if(page.length) {
		let cf = new CollectionFiltering(top || insertBefore(document.createElement("div"), table), config, page);
		if(config.paging)
			document.addEventListener("AutoPagerAfterInsert", function (e){
					let out = cf.add(/**/log/**/(parse(e.target)), e.target);
					if(config.pagingCleanup) {
						config.pagingCleanup(out);
					}
				}, true);
	}
	return page;
}



var sp = OverDrive.getService(server, location.pathname)
if(sp /*&& server_mode != "letter"/**/) {
	log(sp.service);
	//ye gods they redid their website x_x
	//at least i can query it as to which libraries it supports.
	
	//idea: make a reading template for each page.

	let orderbyrow = $X("//comment()[starts-with(.,'-SEARCH RESULTS PAGE')]/following-sibling::table[1]/tbody/tr[1]");//$X("//nobr[text()='Order By:']/ancestor::table[1]/ancestor::tr[1]");
	if(orderbyrow) {
		//find table and cell height attribute and remove it.

		let target = document.createElement("tr");
		
		let row = document.createElement("tr");
		cell = document.createElement("td");
		cell.colSpan = 2;
		row.appendChild(cell);
		insertAfter(row, orderbyrow);
	}
	
	//this is ok because server_mode is in this scope legitmately.
	
	let cf;
	let cell;
	
	GM_addStyle([//{
				"body > * { margin-left:auto; margin-right:auto; }",
				"a.subscription-active {background-color: rgba(0,255,0, 0.5); white-space:pre; }",
				"a.subscription-inactive {background-color: rgba(255,140,0, 0.5); white-space:pre; }",
				".smaller { font-size:70%; }",
				".up { vertical-align:super; }",
				".sup { font-size:70%; vertical-align:super; padding-left:1px; }",
				".topup { font-size:70%; vertical-align:top; padding-left:1px; }",
				".titleDetails { width:auto; }",
//				"a.subscription-none {background-color: rgba(255,0,0, 0.25);}"
			].join("\n"));//}
	
	{//page process
		let obj = sp.parse(location.pathname);
		/**/
		if(obj){
			if(obj.serial)
				log(obj, obj.serial());
			else if(isArray(obj))
				log(obj, obj.map(function(o){return o.serial();}));
			else
				log(obj);
			/**/
		}
		/**/
		LinkAdjust(null, null, sp);
	}
	imageResizing();
}
else {
	//This code needs to be entirely rewritten.
	var dobj;
	var page;
	
	let valid = false;
	let dcs = $X("//noscript[contains(text(), 'id=\"DCSIMG\"')]");
	let img;
	if(dcs && (img = $X(".//img", evalNoScript(dcs.textContent, document.createElement("div"))))){
		dcs = search2obj(url2location(img.src).search, true);
		log(dcs);
		if(dcs.dcssip && dcs["dcsext.websiteid"] ){
			Providers.addAlias(server, dcs.dcssip.toLowerCase());
			valid = true;
		}
	}
	
	var ContentBase = $X("//*[comment()["+
		[".=' ************************* BEGIN PAGE CONTENT ************************* '",
		".=' ************************** END PAGE CONTENT ************************** '"].join(" or ")+
	"] or table[@class='breadCrumbs'] or a[@name='maincontent'] or @class='mainActiveContent']");
	let secure_servers;
	if((location.protocol == "https:") && (secure_servers = /^[^.]+\.(libraryreserve|mediavending)\.com$/.exec(server)))
	{//it could be a config page ^_^
		var rConfig = /\/([^\/]+)\/([^.\/]+)\.htm$/;
		let m = rConfig.exec(location.pathname.toLowerCase());
		if(m) {
			//1 is the lang
			//2 is the page
			//TODO Add support for inactive libraries.
			//server = m[2];
			lang = m[1];
			page = m[2];
			if(page.lastIndexOf("signin", 0) == 0 || page.lastIndexOf("login", 0) == 0) {
				let nodes;
				
				var form = $X("//form[@action='BANGAuthenticate.dll']")
				//Array.filter(document.forms, function(f){return f.getAttribute("action") == "BANGAuthenticate.dll";})[0];
//				if(!form) return;
				var last = null;
				var before = 0;
				var after = 0;
				var old_tr = null;
				
				if(form) {
					var submit = $X(".//input[@type='submit' or @value='Sign In' or @alt='Sign In'] | .//div[@class='signinbutton'] | .//a[contains(text(), 'lease click here to sign into this system.')]", form);
//					if(!submit) return;
					var node = submit || Array.slice(form.elements, -1)[0];
					var td = $X("ancestor::td[1]", node);
					if(td) {
						old_tr = $X("ancestor::tr[1]", td);
						before = td.cellIndex;
						after = old_tr.cells.length - before - 1;
					}
					last = $X("../tr[last()]", old_tr) || node;
				}
				else {
					var base = $X("//*[p[text()='Access to this site is limited to library patrons only.']]") || ContentBase;
					if(!base)
						log(location);
					else
						last = base.lastChild;
				}
				if(last) {
					dobj = Providers.getProvider(server, true);
					let obj = {};
					
	//				log(dobj)
	//				log(ser);
					
					//TODO fix this so it works better on ebooks.carinapress.com
					
					var tr = document.createElement("tr");
					for(var i = 0; i < before; i++) {
						let td = tr.appendChild(document.createElement("td"));
						if(old_tr)
							td.style.cssText = old_tr.cells[i].style.cssText;
					}
					
					var td = tr.appendChild(document.createElement("td"));
					++before;
					
					for(var i = 0; i < after; i++) {
						let td = tr.appendChild(document.createElement("td"));
						if(old_tr)
							td.style.cssText = old_tr.cells[i + before].style.cssText;
					}
					
					switch(secure_servers[1]){
						case "libraryreserve":
//							lcheckbox.appendChild(document.createTextNode(" Include this library"));
							obj.type = "library";
							obj.secure = secure_servers[1];
							break;
						case "mediavending":
//							lcheckbox.appendChild(document.createTextNode(" Include this store"));
							obj.type = "store";
							obj.secure = secure_servers[1];
							break;
					}
					
					radio("state", dobj.mode, ["Include", "Inactive", "Exclude"], function(e){Providers.storeProvider(server, e.details.value);}, td);
					
					td.appendChild(document.createElement("div").appendChild(globalSettings.createConfigInterface()));
					
					insertAfter(tr, last);
					
					let server_obj = dobj.data;
					let dirty = false;
					for(prop in obj) {
						if(server_obj[prop] != obj[prop]) {
							server_obj[prop]= obj[prop];
							dirty = true;
						}
					}
					if(dirty)
						dobj.data = server_obj;
				}
			}
		}
	}
	
	if(!dobj)
		dobj = Providers.getProvider(server, true);
	
	
	
	if(valid || dobj.mode != "Exclude" || dobj.host != server || (/\.(?:(?:lib|ret)\.overdrive|libraryreserve)\.com$/.test(server))) {
		
		var signed_in = false;
		
		if($X("//a[@href='BANGAuthenticate.dll?Action=SignOut&URL=SignOutConfirm.htm']"))
			signed_in = true;
		if($X("//a[@href='BANGAuthenticate.dll?Action=AuthCheck&URL=MyAccount.htm&ForceLoginFlag=']"))
			signed_in = false;
		
		log("parsed - " + dobj.parse(page, location, signed_in));
		
		if(location.hash != "#embedded") {
			/*//for SearchResults && ContentDetails
			//DOES NOT WORK
			$Z("//script[contains(text(), 'javascript:addtoWishList')]", function(r,i,p){
					var hmmm = $X(compileXPath("./preceding-sibling::a[1]"),r);
					if(hmmm) {
						switch(search2obj(hmmm.search, true).action) {
							case "Add":
								hmmm.innerHTML="add to cart";
								break;
							case "AuthCheck":
								hmmm.innerHTML="join waiting list";
								break;
						}
						var a = $X(compileXPath("./following-sibling::a[1]"),r);
						if(a)
							a.innerHTML="add to wish list";
					}
				});
			*/
			/*{//FullText search formats
			
				var groups = [];
				let server_obj = dobj.data;
	//log(server_obj)
				let test = server_obj && server_obj.formats && function(f){ return server_obj.formats.indexOf(f) > -1; };
				
				for(a in Formats.Classes) {
					let cls = Formats.Classes[a];
					let formats = test?cls.formats.filter(test):cls.formats.slice();
					if(formats.length > 0) {
						formats.title = cls.title + "s";
						groups.push(formats);
					}
				}
				
				$Z("//form[@action='BANGSearch.dll?Type=FullText']//select[@name='Format']", function(select, i){
						//log(arguments)
						let test = [];
						Array.slice(select.options, 0).
							map(function(f){
									let m = (f.value && f.value.split(",").map(function(a){return Number(a);}).sort(function(a, b){return a - b;})) || [];
									let v = m.length?m:[0];
									f.parentNode.removeChild(f);
									groups = groups.filter(function(u){return !array_equals(v,u);});//log(v, u, !compare(v,u)); 
									return f;
								}).
							concat(groups.map(function(n){ //log(n);
										let o = document.createElement("option");
										o.value = n.join(",");
										o.appendChild(document.createTextNode(n.title));
										return o;
									})).
						//	map(function(m){test.push(m.value); return m;}).
							sort(function(a, b){
									if(!a.value)
										return -1;
									else if(!b.value)
										return 1;
									else
										return (a.textContent > b.textContent) - (a.textContent < b.textContent);
								}).
							forEach(select.appendChild);
						//log(test);
						//nodes.
						select.selectedIndex=0;
					});
			}
			*/
			/*{//Set my PerPage for all searches.
				for(var [name, value] in Iterator({form:"action", a:"href", button:"formaction"}))
					$Z("//"+name+"[starts-with(@"+value+", 'BANGSearch.dll?') and not(contains(@"+value+", '&PerPage='))]", function(node){ node[value] += "&PerPage="+QuickSearchsCount;})
			}*/
		
			dobj.housekeeping(page, signed_in);
			makeFloater(dobj, ContentBase);
			
			/*//some libraries have font resizing, this refreshes the font resizer. It's a bit of a hack.
			if(typeof unsafeWindow.dw_fontSizerDX === "function")
				unsafeWindow.setTimeout ( "if(dw_fontSizerDX){dw_fontSizerDX.curSize -= 1; dw_fontSizerDX.adjust(1);}", 1 );
			*/
		}
	}
	else
		throw "done";
}

//Image Resizing
GM_addStyle([//{
		//"a.reformed-link { display:none; }",
//		"[parsed] nobr { white-space: inherit; }",
		"div#dj, div#wrapper, div.results_title, div#title_bookshelf, div#bookshelf_left { width:auto; }",
		
		".item-duplicate { display:none; }",

		"div[reviews='name'] i br { display:none; }",//superflous br, just easier to hide it
		".cleaned br.hide-break { display:none; }",
		
		".renumbered span.creator, .renumbered span.track-title { font-size:inherit; }",
		".renumbered .track-number { width:2.65ch; display:inline-block; }",

		".strike {text-decoration: line-through;}" ,

		"form.reformed-link { display:inline; position:absolute; opacity: 0; overflow:hidden; }",
		'form.reformed-link > input[type="submit"] {'+
			'-moz-appearance: inherit; font:inherit; '+
			'cursor:pointer; '+
			'border-style:none; '+
			'border-width:0; '+
			'padding: 0; '+
			'position: relative; '+//right:3px; bottom:1px;'+//left: 0px; top: 0px; 
//				'white-space:nowrap; '+
		'}',
//			"a.reformed-link { white-space:nowrap; }",
		"div.reformed-link { white-space:nowrap; display:inline-block; margin:0; font-size:1em;}",	
		"div.reformed-link:hover { text-decoration:underline; }",	

		"a.javascript-submit-link form { display:none; }",
		".field-abridged { background-color: rgba(255,0,0,0.25); }",
		".field-unabridged { background-color: rgba(0,0,255,0.25); }",
		
		"img.real-size { position:absolute; z-index:1; }",
		"img.real-size:hover, img.real-size.bludgen { width:auto!important; height:auto!important; z-index:2; }",
		"img.real-size.bludgen { display:none; }",
		".nowrap { white-space:pre; }",
		
		".format_container_left { width: 510px!important; }",
		".format_info_right { width: 350px!important; }",
		
		"#formats-unknown { background-color:rgba(255,0,0,0.5);}",
	].join("\n\n"));//}

function LinkAdjust(root, objs, sp, modern) { //I think this function may be dead.
	return;
	$Z(compileXPath(".//a[starts-with(translate(@href, ' ', ''), 'javascript:')]"), function(a){
			if(a.protocol == "javascript:") {
				//javascript: TitleInfo('{A6AAE8CE-F944-44F3-960D-4E9A7715CDD5}', 25);
				//http://search.overdrive.com/TitleInfo.asp?TitleReserveID=A6AAE8CE-F944-44F3-960D-4E9A7715CDD5&TitleFormatID=25
				//http://search.overdrive.com/TitleInfo/A6AAE8CE-F944-44F3-960D-4E9A7715CDD5
				//http://search.overdrive.com/ti/A6AAE8CE-F944-44F3-960D-4E9A7715CDD5
				var m = ReadJavascriptHref(a, "href");
				if(m.success) {
					var params = m.params;
					let sod, cr, /*search_classic,*/ search_modern;
					
					var text = a.textContent.trim();
					if(text.indexOf(" ") >= 0)
						text = '"'+text + '"';
					
					let spn = sp || OverDrive.Services[a.getAttribute("service") || ""];
					
					switch(m.name) {
						case "TitleInfo":{
							//THIS IS THE WRONG PLACE TO DO THIS!!!
							spn.overwriteLink(a, "title", params);
							if(!$X(compileXPath("./*"),a)){
								let s = document.createElement("sup");
								s.appendChild(document.createTextNode(" "));
								let tobj = {"id":params[0],"format":params[1]};
								insertAfter(OverDrive.createGlobalWishlistCheckbox(sp.createOtherServiceLinks(s, tobj, undefined, true), tobj), a);
							}
							break;}
						case "SearchCreator":{
							//search_classic = {"CreatorID": params[0]};
							search_modern = {"Creator":text}
							break;}
						case "SearchPublisher":{
							//search_classic = {"lpubPublisherName": params[0].replace(/[,\.]/g, "")};
							search_modern = {"Publisher":text}
							break;}
						case "SearchImprint":{
							//search_classic = {"limpImprintName": params[0]};
							search_modern = {"Imprint":text}
							break;}
						case "SearchSeries":{
							//search_classic = {"SeriesReserveID": params[0]};
							search_modern = {"Series":text}
							break;}
					}/*
					if(search_classic) {
						//failing to update "a" results in modern links being injected inside the box for the reformed link.
						let na = spn.overwriteLink(a, "search", search_classic);
						a = na;
					}*/
					/**/
					if(modern != false && search_modern && OverDrive.Services.modern) {
						var link = OverDrive.Services.modern.createLink("search", search_modern, document.createTextNode("M"));
						if(link){
							var span = document.createElement("span")
							//span.appendChild(document.createTextNode("["));
							span.appendChild(link);
							//span.appendChild(document.createTextNode("]"));
							span.className = "sup"
							insertAfter(span, a);
						}
					}/**/
				}
			}
		}, root);
}
function imageResizing(root) {//extra code for all valid pages
	function mouseout(){ if(this.style.length > 1) this.style.removeProperty("display"); else this.removeAttribute("style"); }
	//Different servers different locations
	//100 is the largest, then 400, then 150 then 200. I think 100 may be the orig size
	//http://www.contentreserve.com/TitleInfo.asp?ID={471D9370-BFBB-4BE3-88DD-8CE0D0655123}&Format=25
	//https://search.overdrive.com/media/1372643/how-to-train-your-dragon
	//https://origin-images.contentreserve.com/ImageType-100/0887-1/%7B471D9370-BFBB-4BE3-88DD-8CE0D0655123%7DImg100.jpg
	//https://images.contentreserve.com/ImageType-400/0887-1/471/D93/70/%7B471D9370-BFBB-4BE3-88DD-8CE0D0655123%7DImg400.jpg
	var urls = [//{
//			"https?://origin-images.contentreserve.com/img/ImageType-100/", <--- highest quality
//			"https?://origin-images.contentreserve.com/img/ImageType-150/",//seems to be dead
//			"https?://origin-images.contentreserve.com/img/ImageType-200/", <--- tiny
//			"https?://origin-images.contentreserve.com/img/ImageType-400/",//seems to be dead
			"https://origin-images.contentreserve.com/ImageType-",//100 and 200
			"http://origin-images.contentreserve.com/ImageType-",//100 and 200
//			"https://secure.contentreserve.com/img/ImageType-100/",//seems to be dead
//			"https://secure.contentreserve.com/img/ImageType-150/",
//			"https://secure.contentreserve.com/img/ImageType-200/",//seems to be dead
//			"https://secure.contentreserve.com/img/ImageType-400/",
			"https://secure.contentreserve.com/img/ImageType-",//150 and 400
//			"http://images.contentreserve.com/ImageType-100/", //seems to be dead
//			"http://images.contentreserve.com/ImageType-150/",
//			"http://images.contentreserve.com/ImageType-200/",//seems to be dead
//			"http://images.contentreserve.com/ImageType-400/", 
			"http://images.contentreserve.com/ImageType-", //150 and 400
			"GetImage.asp?",
			"http://images.booksamillion.com/covers2/ebook/ImageType-",//100 & 200
		];//}
	$Z(compileXPath(".//img[not(@resized or contains(concat(' ', @class, ' '), ' lrgImg ')) and ("+urls.map(function(f){return "starts-with(@src, '"+f+"')"}).join(" or ")+")]"), function(r){
			//de-alt the images (alts have modified specific aspect ratio)
			r.src = r.src.replace(/^(http(?:\:\/\/(?:images|origin-images)|s\:\/\/(?:secure|origin-images))\.contentreserve\.com\/[^?]*?)-alt(.jpg)$/, "$1$2");
			r.setAttribute("resized", true);
			var image = r.cloneNode(true);
				image.classList.add("real-size");
//				image.height = image.naturalHeight;
//				image.width = image.naturalWidth;
			r.parentNode.insertBefore(image, r);
			if($X(compileXPath("ancestor::div[contains(concat(' ', @class, ' '), ' browser-slider ')]"), r)) {
				//image.removeAttribute("height");
				//image.removeAttribute("width");
				image.classList.add("bludgen");
				addEvent( r, "mouseover", function(){
						image.style.display = "block";
						let cs = window.getComputedStyle(image,null);//boarder width counts against margin
						image.style.marginLeft = ( findPos(r)[0] - findPos(image)[0] - Number(cs.borderLeftWidth.slice(0,-2)) + Number(cs.marginLeft.slice(0,-2)) ) + "px";
					});
				addEvent( image, "mouseout", mouseout);
			}
			/* //no reliable yet
			if(r.naturalHeight < r.height && (p = image.src.indexOf("ImageType-")))
			{//sometimes the high and low defintion images have been confused.
				log(p, image.src[p + 10])
				image.src = image.src.replace(/(ImageType-|Img)[12]00/g, {1:"$1200", 2:"$1100"}[image.src[p + 10]])
				log(p, image.src[p + 10])
			}*/
		}, root);
}

//{Object Stuff
function WrapNewArray(){return [];}
function WrapNewObject(){return {};}

function isArray(array){
	return array && ((array instanceof Array) || (array.hasOwnProperty && array.hasOwnProperty("length") && !array.propertyIsEnumerable("length") && typeof(array.length) === "number" && array.length >= 0));
}
function isArrayIterable(that){
	for(var i = 0; i < that.length; i++)
		if(that.hasOwnProperty(i))
			return that.propertyIsEnumerable(i);
	return !that.length;
}
function cloneObj(that, skip, cloneNodeDeep, func) {
	let obj;
	let skip = skip || {};
	let fields = [];
	switch(typeof(that)) {
		case "number": case "boolean":{//case "string": 
			return that;//can't have properties
		}
		case "string":{
			return that.toString();//generates a new string
		}
		case "xml":{
			//not an object! no __proto__, no constructor
			//if a.toXMLString() == b.toXMLString() than a == b but a === b will only be true if they are the same instance.
			return new XML(that);//this creates a new instance.
			//XML objects use namespaces, it has a "function" namespace
		}
		case "object":{
			if (that.cloneNode) return (cloneNodeDeep != null)?that.cloneNode(cloneNodeDeep):that;
			switch(that.constructor){
				case String: case Number: case Boolean: case Date: case RegExp: case Function: 
					obj = new that.constructor(that);
					break;
				default:
					if(isArray(that)){
						obj = new Array(that.length);
						if(!isArrayIterable(that))//workaround for arguments and other non arrays types that can't be enumerated
							for(var i = 0; i < that.length; i++)
								if(skip[i] !== null)
									fields.push(i);
					}
					else {//fake it!
						obj = {};
						obj.__proto__ = that.__proto__;
						if(that.hasOwnProperty("constructor"))
							obj.constructor = that.constructor;
					}
			}
		}
	}
	if(that.constructor === String){
		for(var i = 0, j; i < that.length; i++)//you could iterate over the individual letters, but nothing is gained!
			if(!skip.hasOwnProperty(i))
				skip[i] = null;
	}
	fields = [field for (field in that)].concat(fields);
	for each(let field in fields) {
		if(skip[field] !== null && (Object.getOwnPropertyDescriptor(that, field) || {writable:undefined}).writable !== undefined){
//			log("cloning", field);
			let fieldvalue = that[field];
			switch(typeof(fieldvalue)) {
				default:
					if(fieldvalue !== null || field == "__proto__") {//it's a really bad idea to clone __proto__ fields!
						let value;
						switch(typeof(func)){
							case "string":{
								if(typeof(fieldvalue[func]) === "function")
									value = fieldvalue[func]();
								break;
							}
							case "function":{
								value = func.call(fieldvalue);
								break;
							}
						}
						if(value === undefined)
							value = cloneObj(fieldvalue, (field in skip)?skip[field]:skip[""], cloneNodeDeep, func);
						obj[field] = value;
						break;
					}
				case "number": case "boolean": case "undefined":
					obj[field] = fieldvalue;//can't clone it so copy it.
			}
		}
	}
	return obj;
};

function execWithNameAccessors(regexp, names, parsers){
	parsers = parsers || {};
	let aliases = {};
	let exec = function my(){var out = RegExp.prototype.exec.apply(this, arguments); if(out !== null) out.__proto__ = my.execPrototype; /*/log(out);/**/ return out;};
	let proto = /*/ regexp.proto = /**/ exec.execPrototype = Object.create(Object.getPrototypeOf([]));
	//proto.getGroupValues = function my(name){return aliases.hasOwnProperty(name)?aliases.name.map(function(p){return this[p];}):undefined; }
	
	let addAlias = function add(name, position){
			if(name != null) {
				if(aliases.hasOwnProperty(name))
					aliases[name].push(position);
				else {
					let arr = quickSetValueProperty(aliases, name, [position]);
					Object.defineProperty(proto, name, {
							set:function(value){ for each(var p in arr) this[p] = value;},
							get:function(){
									let value;
									for(var i = arr.length; i;)
										if((value = this[arr[--i]]) != null)
											return (parsers[name] || NoOp)(value);
								},
							enumerable: true, configurable: true,
						});
				}
			}
	}
	/**/
	//Allow multiple aliases per location
	let add = addAlias;
	addAlias = function(name, position){
			switch(typeof(name))
			{
				case "number":
				case "string":
					add.apply(this, arguments);
					break;
				default:
					if(Array.isArray(name))
						for each(let n in name)
							add.apply(this, [n].concat(Array.slice(arguments, 1)));
			}
		}
	/**/
//	quickSetValueProperty(regexp, "addAlias", addAlias, false);
	quickSetValueProperty(regexp, "aliases", aliases, false);
	quickSetValueProperty(regexp, "parsers", parsers, false);
	quickSetValueProperty(regexp, "exec", exec, false);
	names.forEach(addAlias);
	return regexp;
}

function array_equals(a, b){
	if(a == b)
		return true;
	if(a.length != b.length)
		return false;
	for(var i = 0; i < a.length; i++)
		if(a[i] !== b[i])
			return false;
	return true;
}

function objMerge(target){
	if(!target)
		throw new Error("'target' cannot be null");
	var sources = Array.slice(arguments, 1);
	for each(var source in sources)
		if(source != null)
			for(v in source)
				if(source.hasOwnProperty(v)) {
					if(source[v] !== undefined)
						target[v] = source[v];
					else
						delete target[v];
				}
	return target;
}
function nodeMerge(target){
	if(typeof target === "string")
		target = ((target[0] == "!")?document.createTextNode(target.slice(1)):document.createElement(target));
	for(var source of Array.slice(arguments, 1)){
		if(source instanceof Node)
			target.appendChild(source);
		else if(typeof source === "string")
			target.appendChild(document.createTextNode(source));
		else
			for(var [name, value] in Iterator(source))
				if(value !== undefined) {
					target.setAttribute(name,value);
				} else {
					target.removeAttribute(name);
				}
	}
	return target;
}

function objMap(source, fields, strict, obj, func, all, gfv){
	if(typeof(fields) === "boolean"){
		fields = fields?Object.keys(source):Object.getOwnPropertyNames(source);
		strict = false;//strict mode makes no sense.
	}
	if(obj == null)
		obj = {};
	if(source == null)
		return obj;
	func = func || NoOp;
	gfv = gfv || GetFieldValue;
	let temp;
	if(strict) {//do not remove brackets, or the else will be on the inner if!
		for(let [to, from] in new Iterator(fields))
			if((temp = gfv(source, from, to, obj)) !== undefined)//function(source, from, to, obj)
				obj[to] = func(temp, source, from, to, obj);
			else if(all)
				return false;
	}
	else {
		for(let [to, from] in new Iterator(fields))
			if((temp = gfv(source, from, to, obj)) !== undefined)//function(source, from, to, obj)
				obj[(typeof(to) === "number")?from:to] = func(temp, source, from, to, obj);
			else if(all)
				return false;
	}
	return obj;
}

function objFilter(source, fields, obj, func, all, gfv){
	return objMap(source, fields, !isArray(fields), obj, func, all, gfv);
}
function GetFieldValue(obj, name) {
	if(name != null) {
		switch(typeof(name)) {
			case "function":
				return name.apply(obj, arguments);
			case "string":
			case "number":
				name = [name];
		}
		for each(var n in name)
			if(typeof(obj[n]) !== "undefined")
				return obj[n];
	}
	return;
}
function GetAttributeValue(obj, name) {
	if(name != null) {
		switch(typeof(name)) {
			case "function":
				return name.apply(obj, arguments);
			case "string":
			case "number":
				name = [name];
		}
		for each(var n in name)
			if(obj.hasAttribute(n))
				return obj.getAttribute(n);
	}
	return;
}
function getPropertyDescriptor(source, name){
	let desc;
	do ; while(!(desc = Object.getOwnPropertyDescriptor(source, name)) && (source = Object.getPrototypeOf(source)));
	return desc;
}
function objMapOwn(obj, func){//returns a new object who's properties share the same name as obj but who's values are the result of passing the value to func.
	let target = {};
	let args = Array.slice(arguments)
	args[1] = obj;
	Object.getOwnPropertyNames(obj).forEach(function(name, index, array){args[0] = name ; target[name] = func.apply(obj, args);});
	return target;
}
function objCreate(prototype, fields){//Creates a clone of an object but with a different prototype.
	return Object.create(prototype, fields?objMapOwn(fields, function(name){ return Object.getOwnPropertyDescriptor(fields, name);}):undefined);
}
function objCreateWithSelfDestructingAccessors(prototype, fields, accessors){
	return installSelfDestructingGettersAndSetters(objCreate(prototype, fields), accessors);
}
function objHasFields(obj, fields){
	for each(let from in fields)
		if(GetFieldValue(obj, from) === undefined)
			return false;
	return true;
}
//}
/*
function getStringBetween(string, start, end){
	return string.slice(start, end);
}
*/
function SmartQuotes(text) {
	if(text.indexOf("\"") == -1)
		return "\""+text+"\"";
	if(text.indexOf("'") == -1)
		return "'"+text+"'";
	throw new Error("You are screwed! The string contains both single AND double quotes\n" + text);
}

//{Lazy Properties and Self Destructing Accessors
function quickSetValueProperty(target, name, value, enumerable){
	Object.defineProperty(target, name, {value: value, writable: true, enumerable: enumerable || (enumerable == null), configurable: true});
	return value;
}

function lazyProperties(obj, properties, installPropertyOnInstance, enumerable){//enumerable defaults to true
	return Object.defineProperties(obj, objMapOwn(properties, installPropertyOnInstance ? function(name, source){ return {
				set:function(value){ quickSetValueProperty(this, name, value, enumerable); },
				get:function(){ return quickSetValueProperty(this, name, source[name].call(this, name), enumerable); },
				enumerable: false, configurable: true,
			};} : function(name, source, obj){ return {
				set:function(value){ quickSetValueProperty(obj, name, value, enumerable); },
				get:function(){ return quickSetValueProperty(obj, name, source[name].call(obj, name), enumerable); },
				enumerable: false, configurable: true,
			};}, obj));
}

function lazyProperty(obj, name, generator, installPropertyOnInstance, enumerable){
	/*/if(!obj)
		return generator();
	if(name != "Supported")
		log(obj)/**/
	return Object.defineProperty(obj, name, installPropertyOnInstance ? {
			set:function(value){ quickSetValueProperty(this, name, value, enumerable);},
			get:function(){return quickSetValueProperty(this, name, generator.call(this, name), enumerable);},
			enumerable: false, configurable: true
		} : {
			enumerable: false, configurable: true,
			set:function(value){ quickSetValueProperty(obj, name, value, enumerable);},
			get:function(){return quickSetValueProperty(obj, name, generator.call(obj, name), enumerable);},
		});
}

function installSelfDestructingGettersAndSetters(obj, details, onlyDestructOnDecendants){
	return Object.defineProperties(obj, objMapOwn(details, function(name, source, obj){ return {
			enumerable: false, configurable: true, 
			set: function(value){ quickSetValueProperty(this, name, value);},
			get: function(){
				let value = Object.create(source[name].prototype);
				let temp = source[name].call(value, this);
				let result = (temp !== null && typeof(temp) === "object")?temp:value;
				return (onlyDestructOnDecendants && this === obj)?result:quickSetValueProperty(this, name, result);
			},
		}; }, obj));
}
//}
function doWhile(start, xpath, array){
	xpath = compileXPath(xpath);
	if(!array) array = [];
	do array.push(start); while(start = $X(xpath, start));
	return array;
}

function NoOp(arg) {return arg;}
function emQuote(str){return (String.replace(str, /^(\S+\s\S.*)$/, "\"$1\""));}
//{Serialization
function obj2post(obj, parameter_names){
	var e = function(a, b){return (b !== null)?(encodeURIComponent(a)+"="+encodeURIComponent(b)):"";}
	return (parameter_names?[e(a, GetFieldValue(obj, parameter_names[a])) for (a in parameter_names)]:[e(a, obj[a]) for (a in obj)]).filter(function(a){return a != ""}).join("&");
}

function search2obj(search, forceLowerCaseKeys){
	var obj = {};
	if(typeof search === "object" && search.search != null)
		search = search.search;
	if(search[0] == "?")
		search = search.substr(1);
	if(search !=""){
		if(forceLowerCaseKeys)
			for(var a of search.split("&")){
				var b = a.indexOf('=');
				if(b >= 0)
					obj[decodeURIComponent(a.substr(0, b).toLowerCase())] = decodeURIComponent(a.substr(b + 1));
				else
					obj[decodeURIComponent(a.toLowerCase())] = null;
			}
		else
			for(var a of search.split("&")){
				var b = a.indexOf('=');
				if(b >= 0)
					obj[decodeURIComponent(a.substr(0, b))] = decodeURIComponent(a.substr(b + 1));
				else
					obj[decodeURIComponent(a)] = null;
			}
	}
	return obj;
}

function url2location(url, doc){
	var a = ((doc && doc.createElement && doc) || document).createElement("a");
		a.href = url;
	return objFilter(a, ["hash","host","hostname","href","pathname","port","protocol","search"]);
}
function ReadJavascriptHref(a, name){
	if(a == null)
		return;
	var ret = {success:false};
	var split = /^javascript:[\s]*(([A-Za-z_$0-9]+)[\s]*\((.*)\));?$/;
	var href = a;
	if(name != null) {
		ret.node = a;
		ret.field = name;
		if(typeof a.getAttribute === "function")
			href = a.getAttribute(name);
		else
			href = a[name];
		//if(href  === undefined)
	} else {
		ret.source = a;
	}
//	log(arguments, ret);
	var m = href && split.exec(href.trim());
	if(m) {
		var params;
		ret.name = m[2];
		ret.raw = m[3];
		try {
			ret.params = eval("function "+m[2]+"(){return arguments;}; "+m[1]);
			ret.success = true; 
			ret.proxy = function(that){
				if(typeof that[ret.name] === "function"){
					return function(params){
						if(!Array.isArray(params)){
							params = ret.params;
						}
						that[ret.name].apply(that, params);
					}
				}
			}
		} catch(e) { ret.error = e; }
	}
	return ret;
}

//}
//{HTML Work
function findTextElementContaining(text, root, extraXpathTest, postfix, prefix, startsWithNotContains) {
	let s = false, d = false;
	if(Array.some(text, function(c){ switch(c){ case "\"": d = true; break; case "\'": s = true; break; } return s && d; })) {//bloody hell it uses both
		if(startsWithNotContains){
			if(postfix) {
				let f = compileXPath(postfix);
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()["+postfix+"]" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.lastIndexOf(text, 0) == 0)
						return $X(f, node);
			}
			else
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.lastIndexOf(text, 0) == 0)
						return node;
		}
		else {
			if(postfix) {
				let f = compileXPath(postfix);
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()["+postfix+"]" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.indexOf(text) > -1)
						return $X(f, node);
			}
			else
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.indexOf(text) > -1)
						return node;
		}
	}
	else if(s)
		return $X((prefix!=null?prefix:"descendant-or-self::")+"text()["+(startsWithNotContains?"starts-with":"contains")+"(., \""+text+"\")]" + (extraXpathTest?"["+extraXpathTest+"]":"")+(postfix?"/"+postfix:""), root);
	else// if(d)
		return $X((prefix!=null?prefix:"descendant-or-self::")+"text()["+(startsWithNotContains?"starts-with":"contains")+"(., '"+text+"')]" + (extraXpathTest?"["+extraXpathTest+"]":"")+(postfix?"/"+postfix:""), root);
	return;
}
function SplitTextNode(node, str, replace){
	let p;
	if(node && node.nodeValue && (p = node.nodeValue.indexOf(str)) > -1) {
		if(before = node.nodeValue.substring(0, p))
			insertBefore(document.createTextNode(before), node);
		if(after = node.nodeValue.substring(p + str.length))
			insertAfter(document.createTextNode(after), node);
		node.nodeValue = (replace == null)?str:replace;
		return node;
	}
	return;
}
function findPos(obj) {//http://www.quirksmode.org/js/findpos.html
	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent)
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curleft, curtop];
}
function textcheckbox(text, id, click, checked){
	var span = document.createElement("span");
	let box = document.createElement("input");
	let label = document.createElement("label");
		box.type = "checkbox";
		box.checked = checked || false;
		box.id = label.htmlFor = id;
		label.innerHTML = text;
	span.appendChild(box);
	span.appendChild(label);
	if(click)
		addEvent( box, "click", click);
	return span;
}
function radio(name, state, buttons, click, node){
	//[{text:"Include", state:true}, {text:"Inactive", state:false}, {text:"Exclude", state:null, set:"Exclude"}]
	return buttons.map(function (it){
			var or = (typeof(it) === "string") && it;
			
			let span = document.createElement("span");
			let input = span.appendChild(document.createElement("input"));
			let label = span.appendChild(document.createElement("label"));
		
			var m = {
					raw:it,
					value:it.value || or,
					text:it.text || or,
					id:it.id || it.text || or,
					state:it.state || it.value || or,
					span:span,
					input:input,
					label:label,
				};
			
			input.type="radio"
			input.name=name
			input.checked = (state == m.state);
			if(m.value)
				input.value = m.value;
				
			label.appendChild(document.createTextNode(" "+m.text+" "));
			label.htmlFor = input.id = "radio-"+m.id;
			if(click)
				input.addEventListener("click", function(e){e.details = m; click.call(this, e);}, false);
			if(node)
				node.appendChild(span);
			return m;
		});
}

function smart_buttons_column(cell, buttons){
	for(let j = 0; j < buttons.length; j++) {
		let br = true;
		let k = buttons[j];
		if(k !== null)
		{
			if(k.ownerDocument) {
				cell.appendChild(k);
				br = false;
			}
			else if(k.dropdown) {
				let display = ""//k.display?" { display:"+k.display+"!important; }":""
				let select = k.select = document.createElement("select");
				select.id = k.id;
				k.dropdown.forEach(k.add = function(o){
						if(!o.skip){
							var option = document.createElement("option");
							option.appendChild(document.createTextNode(o.text));
							if(o.selector || o.value)
								option.value = o.selector || o.value || "";
							if(o.alt) option.alt = option.title = o.alt
							if(o.style) option.style = o.style
							select.appendChild(option);
						}
					});
				cell.appendChild(select);
				if(k.event) {
					addEvent(select, "change", k.event);
				}
				else {
					let style = k.style = GM_addStyle(display);
					let info = k.important?"{ display:none !important; }":"{ display:none; }";
					style.id="style-"+k.id;
					addEvent(select, "change", function(e){
							style.innerHTML = this.value?this.value + info:display;
					});
				}
				if(k.alt)
					select.alt = select.title = k.alt;
			}
			else if(k.id) {
				//TODO: id styles so flip can bypass clicking. also store selector in style attributes.
				br = false;
				let span = k.span = document.createElement("div");
				let box = k.input = document.createElement("input");
				let label = k.label = document.createElement("label");
				let text = "";
				if(k.text)
					text = k.text;
				else if(k.title) {
					text = k.title;
					label.classList.add("title");
				}
				if("sort" in k)
					span.setAttribute("sort", k.sort);

				box.type = "checkbox";
				box.checked = true;
				box.id = label.htmlFor = "toggle-" + k.id + "-" + Math.ceil(Math.random() * 100000);
				box.title = label.title = label.innerHTML = text;
				span.classList.add("boxlabel");
				
				span.appendChild(box);
				span.appendChild(label);
				cell.appendChild(span);
				
				if(k.selector) {
					let display = ""//k.display?k.selector +" { display:"+k.display+"!important; }":""
					let style = GM_addStyle(display);
					style.id = "style-"+k.id;
					addEvent( box, "click", function(){ style.innerHTML = box.checked?display:(k.selector +" { display:none; }"); });
					label.classList.add("click");
				}
				if(k.flip) {
					//Using this is a bad idea!
					//label.classList.add("toggle");
					let flip = k.flip;
					let id = k.id;
					if(k.flip == "cell")
						addEvent( box, "click", function(e){
							$Z(compileXPath(".//input[not(@id='toggle-"+id+"')]"), function(node){
									if(box.checked != node.checked)
										node.click();
								}, cell)//./ancestor::table[@id='selectors']
							});
					else {
						addEvent( box, "click", function(e){
								for(let m = 0; m < flip.length; m++) {
									let node = $X(compileXPath("./ancestor::td[1]/..//input[@id='toggle-"+flip[m]+"']"), cell);//./ancestor::table[@id='selectors']
									if(node && (box.checked != node.checked))
										node.click();//consider not doing this in an event manor.
								}
							});
					}
					label.classList.add("flip");
				}
				if(k.event)
					addEvent( box, "click", k.event);
				if(k.alt)
					box.alt = box.title = label.alt = label.title = k.alt;
			}
			else if(k.text || k.title) {
				let span = k.span = document.createElement("span");
					//span.type="button";
					cell.appendChild(span)
					span.appendChild(document.createTextNode(k.text || k.title));
					//span.value=k.text || k.title;
				
				if(k.toggle) {
					span.className = "toggle";
					addEvent( span, "click", function(e){
							let t = $X(compileXPath("./ancestor::table[@id='selectors']//input[@id='toggle-"+k.toggle+"'] | ./ancestor::table[@id='selectors']//select[@id='"+k.toggle+"']"), e.target);
							if(t)
							{
								switch(t.nodeName)
								{
									case "INPUT":
										t.click();
										break;
									case "SELECT":
										span.alt = span.title = "Click to advance the selection, hold shift and click to rewind.";
										let len = t.options.length;
										t.selectedIndex = (((e.shiftKey?-1:1) * (e.ctrlKey?2:1)) + len + t.selectedIndex) % len;
										simulateHTMLEvent(t, "change");
										break;
								}
							}
						});
				}
				if(k.event) {
					span.className = "toggle";
					addEvent(span, "click", k.event);
				}
				if(k.alt)
					span.alt = span.title = k.alt;
				if(typeof(k.text) === "undefined" && typeof(k.title) !== "undefined" && k.title != "")
					span.classList.add("title");
			}
			else if(typeof(k) === "string") {
				cell.appendChild(document.createTextNode(k));
			}
		}
		if(br)
			cell.appendChild(document.createElement("br"));
	}
	return buttons;
}

function makeFloater(dobj, base){
	var obj = dobj.data || {};
	var server = dobj.host;
	
//	log(obj);
	
	var top = base && base.firstChild;
	if(!top) {
		top = $X("//table[@class='breadCrumbs']");
		if(top)//adjust base
			base = top.parentNode;
	}
	
	var after = $X("./a[@name='maincontent']", base);

//	log(base, top, title)
	GM_addStyle([//{
//			".cheat-sheet { float:right; display:inline; padding-top:0.9em; }",
			".cheat-sheet {padding-bottom:0.5em;}",// position:relative; top:-0.5em;}"
//			".cheat-sheet tr { display:inline; }",
			".cheat-sheet .box { display:inline-block; vertical-align:top; text-align:center; margin-left:2ch; margin-right:-1ch;}",
//			".cheat-sheet .box > *:after {content:\",\"}",
//			".cheat-sheet .box:after { content: \" \"; }",
//			".cheat-sheet tr:after { content: \",\"; }",
//			".cheat-sheet tr:last-of-type:after { content: \" \"; }",
//			".cheat-sheet td:before { content: \" \"; }",
			".cheat-sheet select.providers { width:20ch; }",
			".cheat-sheet select.quicksearch, .cheat-sheet select.quicksearch-days { width:18ch; }",
//			".cheat-sheet td { padding-left: 0.7ch; }",
//			".cheat-sheet td:first-child { text-align:right; }",
			".cheat-sheet select.quicksearch form { display:none; }",
			".clearBoth { clear:both; }",
		].join("\n\n"));//}

	function nr(a){
			let row = document.createElement("div");
			row.className = "box"
			mr.apply(null, [row].concat(Array.slice(arguments)));
			return row;
		}
	function mr(row, a){
			if(arguments.length >= 2) {
				var pre = "";
				var post = "";
				if(a) {
					pre = '<a href="'+a+'">';
					post = '</a>';
				}
				for(var a = 2; a < arguments.length; a++)
					nri(row, pre + arguments[a] + post);
				return row;
			}
		}
	function nri(row, code){
			row.appendChild(b = document.createElement("div"));
			b.innerHTML = code;
			return row;
		}

	let it = document.createElement("div")
		it.className = "cheat-sheet";
	
	let s = it.appendChild(document.createElement("span"));
	s.style.cssText = "display:block;";
	
	let tb = it;
	{
		let tr = tb.appendChild(document.createElement("div"));
			tr.className="box";
		let select = document.createElement("select");
			select.className="providers"
		let header = select.appendChild(document.createElement("option"))
			header.appendChild(document.createTextNode("Jump To Provider"))
		for(var Host of Providers.activeProviders) {
			if(Host != server){
				var pobj = Providers.getProvider(Host);
				if(pobj != obj && !pobj.stealth) {
					var option = document.createElement("option");
					option.appendChild(document.createTextNode((pobj.data && pobj.data.title) || Host));
					option.value = Host;
					select.appendChild(option);
				}
			}
		}
		if(select.options.length){
			tr.appendChild(select);
			addEvent(select, "keyup", function(e){ if(e.keyCode === 17) select.setAttribute("ctrl", (false)); });
			addEvent(select, "keydown", function(e){ if(e.keyCode === 17 && select.getAttribute("ctrl") != "true") select.setAttribute("ctrl", (true)); });
			addEvent(select, "focusout", function(e){ select.removeAttribute("ctrl"); });
			addEvent(select, "change", function(e){
					if(this.value)
						if(select.getAttribute("ctrl") == "true")
							GM_openInTab("http://"+this.value);
						else
							window.location="http://"+this.value;
				});
		}
		
		mr(tr, "BANGAuthenticate.dll?Action=AuthCheck&URL=MyAccount.htm&ForceLoginFlag=0", "My Account");
		if((obj.features && obj.features.wishlist) || (obj.wishlist))
			mr(tr, "WishList.htm", "Wish List" + ((obj.wishlist && obj.wishlist.length)?" ("+obj.wishlist.length+")":""));//.cells[0].colSpan = "2";
	}
	
	var time = function(next){
			if(next < 0)
				next = "Now"
			else if(next >= (72 * 60 * 60 * 1000))
				next = Math.floor(next / (24 * 60 * 60 * 1000)) + " Days";
			else if(next >= (48 * 60 * 60 * 1000))
				next = Math.floor(next / (24 * 60 * 60 * 100)) / 10 + " Days";
			else if(next >= (12 * 60 * 60 * 1000))
				next = Math.floor(next / (60 * 60 * 1000)) + " Hours";
			else if(next >= (90 * 60 * 1000))
				next = Math.floor(next / (60 * 60 * 100)) / 10 + " Hours";
			else if(next >= (90 * 1000))
				next = Math.floor(next / (60 * 1000)) + " Mins";
			else //if(next >= 1000)
				next = Math.floor(next / 1000) + " Sec";
			return next;
		}
	

	
	if(obj.checkedout){
		var next = "";
		if(obj.checkedout.length > 0) {
			next = obj.checkedout.sort(function(a, b){ return a.expires - b.expires; })[0].expires - (new Date().getTime());
			if(next < 0)
				next = "("+time(-next)+")";
			else
				next = time(next);
		}
		
		if(obj.max)
			tb.appendChild(nr("MyBookshelf.htm", "Items", obj.checkedout.length +  " / " + obj.max.items, next));
		else
			tb.appendChild(nr("MyBookshelf.htm", "Items", obj.checkedout.length, next));
	}
	else if(obj.max)
		tb.appendChild(nr("MyBookshelf.htm", "Items", obj.max.items));
	
	if((obj.features && obj.features.waitinglist) || (obj.waitinglist) || (obj.max && obj.max.holds)) {
		let maxholds = (obj.waitinglist?obj.waitinglist.length:"?") + " / " + (obj.max && obj.max.holds || "?")
		let maxdur = obj.max && (obj.max.hold_duration + " Days") || ""
		if(obj.waitinglist && obj.waitinglist.length)
		{
			let next = obj.waitinglist.sort(function(a, b){ return a.estimate - b.estimate; })[0].estimate;
			if(next < 0)
				next = time((obj.max.hold_duration * 1000 * 24 * 60 * 60) + next)
			else
				next = "("+time(next)+")"
			tb.appendChild(nr("MyWaitingList.htm", "Holds", maxholds, maxdur, next))
		}
		else
			tb.appendChild(nr("MyWaitingList.htm", "Holds", maxholds, maxdur));
			
		//if(obj.max.hold_duration)
		//	tb.appendChild(nr("help-policies-borrowing.htm", obj.max.hold_duration, "Days"));//.cells[0].colSpan = "2";
	}
	//TODO make cart smarter!!!
	tb.appendChild(nr("Cart.htm", "Cart"));
	//*
	if(!obj.noSearch)
	{//Quick Search
		//tr = document.createElement("tr");
		//tr.appendChild(td = document.createElement("td"));
		//	td.colSpan = "2";
		//td.appendChild(select = document.createElement("select"));
		var tr = document.createElement("div")
			tr.className="box";
		let select = tr.appendChild(document.createElement("select"));
		select.className="quicksearch";
		
		tr.appendChild(document.createElement("br"));
		let days = tr.appendChild(document.createElement("select"));
		days.className="quicksearch-days";
		{
			let option = days.appendChild(document.createElement("option"));
			option.appendChild(document.createTextNode("Ignore Collection Date"))
			option.value = "";
		}
		for each(var day in DaysOfInterest) {
			let option = days.appendChild(document.createElement("option"));
			option.appendChild(document.createTextNode((day == QuickSearchsDays)?day + " days (default)":day + " days"))
			option.value = day;
		}
		days.value = GM_getValue("QuickSearch.Days", QuickSearchsDays);

		/* All Known search parameters
		var n = ({
					Type:"Advanced",
					FullTextCriteria:"",
					FullTextField:["","All","Creator","ISBN"][0],//All=="Title"
					Title:"",
					Creator:"",
					ISBN:"",
//						Keyword:"",
					Format:[25,425].join(") OR (LCPU.lftyFormatTypeID = "),//OMG OMG OMG OMG X_X
//						Availcopies:">*0",
					Language:"",
					Publisher:"",
					Subject:"",
					Award:"",
//						UserRating:"",
					CollDate:">*30",
					OnSaleDate:">*30",
					Price:">*30",
					PerPage:[5,10,25][1],
					Sort:"SortBy="+["title","author","date","rank","CollDate"][1],
				});
		//*/
		
		
		var QuickSearchs = {};
		QuickSearchs["Advanced Seach"] = "AdvancedSearch.htm";
		QuickSearchs["Quick Search"] = 0; //^_^ Hack
		QuickSearchs["New Titles"] = {};
		
		//* //evilFormatDivider
		for each(let cls in Formats.Classes) {
			let formats = obj.formats?cls.formats.filter(function(f){return obj.formats.indexOf(f) > -1;}):cls.formats;
			if(formats.length > 0)
				QuickSearchs["New " + cls.titles] = {
						/*post:{
							CollDate: ">*" + QuickSearchsDays, 
							PerPage: QuickSearchsCount, 
							Sort: "SortBy=title", 
							Format: joinFormats(formats),
						},*/
						formats:formats,
					};
		}
		//*/
		QuickSearchs["Rated Titles"] = "BANGSearch.dll?Type=Advanced&UserRating=1&URL=SearchResultsUserRank.htm&PerPage="+QuickSearchsCount;
		QuickSearchs["Recommend Titles"] = "BANGSearch.dll?Type=Advanced&RecommendedTitles=1&URL=SearchResultsRecommend.htm&PerPage="+QuickSearchsCount;
		
		for(let a in QuickSearchs) {
			let option = document.createElement("option");
			option.appendChild(document.createTextNode(a));
			select.appendChild(option);
			let n = QuickSearchs[a];
			switch(typeof(n)){
				case "object":{
					if(n.post) {
						let form = document.createElement("form");
						form.method = "POST";
						form.action="BANGSearch.dll?PerPage="+QuickSearchsCount + (n.search?"&" + n.search:"");
						form.name="QuickSearch-"+a;
						for(let a in n.post) {
							let input = document.createElement("input");
							input.type="hidden";
							input.name=a;
							input.value=n.post[a];
							form.appendChild(input);
						}
						option.appendChild(form);
					}
					break;
				}
				case "string":{
					option.value = n;
					break;
				}
				case "number":{
					if(!n)
						select.selectedIndex = select.options.length - 1;
					break;
				}
			}
		}
		tb.appendChild(tr);
		
		let form = document.createElement("form");
		
		addEvent(select, "keyup", function(e){ if(e.keyCode === 17 && form.target != "_self") form.target = "_self"; });
		addEvent(select, "keydown", function(e){ if(e.keyCode === 17 && form.target != "_blank") form.target = "_blank"; });
		addEvent(select, "focusout", function(e){ form.target = "_self"; });
		addEvent(select, "change", function(e){
				var op = this.options[this.options.selectedIndex];
				/**/
				if(op_form = $X(compileXPath("form"), op)){
					op_form.target = form.target;
					op_form.submit();
				}
				else /**/if(op.hasAttribute("value")){
					if(form.target === "_blank")
						GM_openInTab("http://" + server + "/" + this.value);
					else
						window.location="http://" + server + "/" + this.value;
				}
				else if((n = QuickSearchs[op.textContent]) && typeof(n) === "object"){
//					let form = document.createElement("form");
					form.method = "POST";
					form.action="BANGSearch.dll?"+(n.search || "");
					form.name="QuickSearch-"+a;
					let post = {
							PerPage: QuickSearchsCount, 
							Sort: "SortBy=title",
						};
					if(n.formats)
						post.Format = joinFormats(n.formats);
					if(days.value)
						post.CollDate = ">*" + days.value; 
					for(let a in post) {
						let input = document.createElement("input");
						input.type="hidden";
						input.name=a;
						input.value=post[a];
						form.appendChild(input);
					}
					op.appendChild(form);
//					if(confirm("Submit:\n" + JSON.stringify(post)))
					{
						GM_setValue("QuickSearch.Days", days.value)
						form.submit();
					}
					//if targeting another tab, the form injected may be captured by the next call, submitting stale data.
					op.removeChild(form);
				}
			});
	}//*/

	if(after){
		insertAfter(it, after);
	}
	else if(top){
		insertBefore(it, top);
		if(top.tagName=="BR")
			top.style.lineHeight="0px";
	}
	if(it.parentNode){//ugly hack ~_~ keeps floaters from screwing up other stuff. Shouldn't have any side effects (we hope).
		let d = it.parentNode.appendChild(document.createElement("div"));
		d.className = "clearBoth";
	}
}

//}
function evalNoScript(noscript, box, wrap, deAmp) {
	let code = (noscript && noscript.textContent) || ((noscript==null)?"":noscript);
	if(deAmp)
		code = code.replace(/&amp;/g,"&");
	if(typeof(wrap) == "string")
		wrap = [wrap];
	else if(!isArray(wrap))
		wrap = [];
	var tag = "div";
	if(box && box.innerHTML === "") {
		box.innerHTML = code;
		return box;
	}
	let out = undefined;
	let div = document.createElement(tag);
	
	let i = wrap.length, j = i;
	while(i--)
		code = "<"+wrap[i]+">" + code + "</"+wrap[i]+">";
	div.innerHTML = code;
	while(j--)
		div = div.firstChild;
	
	if(box) {
		while(div.firstChild)
			box.appendChild(div.firstChild);
		out = box;
	}
	else {
		if(noscript.parentNode) {
			var last = noscript.nextSibling;
			out = div.childNodes.length;
			while(div.firstChild)
				noscript.parentNode.insertBefore(div.firstChild, last);
		}
		else{
			out = Array.slice(div.childNodes);
			for each(var r in out)
				div.removeChild(r);
		}
	}
	return out;
}


function simulateHTMLEvent(node, type, bubbles, cancelable) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(type, bubbles, cancelable);
	return node.dispatchEvent(evt);
}

function scriptReEval(script, newText, docWrite){
	if(!newText) newText = script.innerHTML;
	if(docWrite === true || docWrite === undefined) {
		docWrite = "rfn"+ Math.ceil(Math.random() * 100000)
		newText = newText.replace(/document\.write/g, docWrite)
	}
	
	let rscript = document.createElement("script");
	
	if(typeof docWrite === "string" && docWrite !== ""){
		//Up to the user 
		let fscript = document.createElement("script");
		fscript.type=script.type;
		fscript.id = "s"+docWrite
		fscript.innerHTML = "function "+docWrite+"(text){ document.getElementById('"+ fscript.id +"').insertAdjacentHTML('afterend', text); }";
		insertAfter(fscript, script)
		rscript.setAttribute("document.write", docWrite);
	}
	let rscript = document.createElement("script");
	rscript.type=script.type;
	rscript.innerHTML = newText
	insertAfter(rscript, script);
	return rscript;
}
//{Xpath
function $W(_xpath, node, array, transform){
	array = array || [];
	var res;
	if(isXPathExpression(_xpath)){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return;
		}
	}

	if(transform) {
		var args = Array.slice(arguments, 4);
		for (let j, i = 0; i < res.snapshotLength; ++i)
			if((j = transform.apply(transform, [res.snapshotItem(i), i].concat(args))) !== undefined)
				array.push(j);
	}
	else
		for (let i = 0; i < res.snapshotLength; ++i)
			array.push(res.snapshotItem(i));
	return array;
}

function $X(_xpath, node, result){//to search in a frame, you must traverse it's .contentDocument attribute.
	if(isXPathExpression(_xpath)){
		return _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			return doc.evaluate(_xpath, node, null, result || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
	}
}

function $Y(_xpath, node, transform){
	var res;
	if(isXPathExpression(_xpath)){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return;
		}
	}
	if(transform) {
		var args = Array.slice(arguments, 3);
		for (let i = 0, j; i < res.snapshotLength; ++i)
			if((j = transform.apply(null, [res.snapshotItem(i), i].concat(args))) !== undefined)
				yield j;
	}
	else
		for (let i = 0; i < res.snapshotLength; ++i)
			yield res.snapshotItem(i);
}

function $Z(_xpath, func, node){
	var res;
	if(isXPathExpression(_xpath)){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
	}
	var args = Array.prototype.slice.call(arguments, 3);
	var i = 0;
	for (; i < res.snapshotLength; ++i)
		func.apply(null, [res.snapshotItem(i), i].concat(args));
	return i;
}
function compileXPath(xpath, namespaceURLMapper){
	let cache = {};
	if(typeof(XPathProfilingLevel) !== "undefined" && XPathProfilingLevel > 0) {
		compileXPath = function(_xpath, _namespaceURLMapper){
			if(isXPathExpression(_xpath))
				return _xpath;//dipshit, you don't need to compile this!
			if(compileXPath.CompiledXPath.hasOwnProperty(_xpath)) {
				let expr = compileXPath.CompiledXPath[_xpath];
				if(XPathProfilingLevel > 0)
					++expr.lookups;
				return expr;
			}
			let expr;
			try{
				expr = document.createExpression(_xpath, _namespaceURLMapper);
			}
			catch(e){
				log([e].concat(Array.slice(arguments)));
				return null;
			}
			switch(XPathProfilingLevel){
				case 1:
					if(typeof(expr.evaluate.bind) === "function"){
						expr = {
							__proto__:expr,
							source:_xpath,
							lookups:1,
							evaluate:expr.evaluate.bind(expr),
							evaluateWithContext:expr.evaluateWithContext.bind(expr),
						};
						break;
					}//if you don't have bind, fall through to the next level that doesn't require bind.
				case 2:
					expr = {
						__proto__:expr,
						source:_xpath,
						lookups: 1,
						evaluated: 0,
						evaluate:function(){ this.evaluated++; return this.__proto__.evaluate.apply(this.__proto__, arguments); },
						evaluateWithContext: function(){ this.evaluated++; return this.__proto__.evaluateWithContext.apply(this.__proto__, arguments); },
					};
					break;
			}
			return compileXPath.CompiledXPath[_xpath] = expr;
		}
		log(cache); //used for later inspection of the cache
	} else {
		compileXPath = function(_xpath, _namespaceURLMapper){
			if(isXPathExpression(_xpath))
				return _xpath;//dipshit, you don't need to compile this!
			if(compileXPath.CompiledXPath.hasOwnProperty(_xpath))
				return compileXPath.CompiledXPath[_xpath];
			let expr;
			try{
				expr = document.createExpression(_xpath, _namespaceURLMapper);
			}
			catch(e){
				log([e].concat(Array.slice(arguments)));
				return null;
			}
			return compileXPath.CompiledXPath[_xpath] = expr;
		}
	}
	compileXPath.CompiledXPath = cache;
	return compileXPath.apply(this, arguments);
}

function xPathListContains(name, value, seperator){
	if(seperator === undefined) seperator = " ";
	let sep = SmartQuotes(seperator);
	return "contains(concat("+sep+", "+name+", "+sep+"), "+SmartQuotes(seperator+value+seperator)+")";
}
function isXPathExpression(xpath){
	let t = isXPathExpression = function(_xpath){
		if(_xpath instanceof XPathExpression || isXPathExpression.XPathExpressionPrototype.isPrototypeOf(_xpath))
			return true;
		//duck type it!
		let xpp = isXPathExpression.XPathExpressionPrototype;
		for(let k in xpp)
			if(typeof _xpath[k] !== typeof xpp[k])
				return false;
		return true;
	}//note: this will not work if you created your expressions some other way than this way.
	t.XPathExpressionPrototype = Object.getPrototypeOf(document.createExpression(".", null));
	return t.apply(this, arguments);
}
//}//{HTML Maintanance
function insertAsParent(new_parent, target) {	return new_parent.appendChild(target.parentNode.replaceChild(new_parent, target)) && new_parent; }
function insertAfter(insert, after){ return after.parentNode.insertBefore(insert, after.nextSibling); }
function insertBefore(insert, before){ if(before && before.parentNode) return before.parentNode.insertBefore(insert, before); log("insertBefore", arguments);}
function replace(n, old){ if(n !== old) old.parentNode.replaceChild(n, old); return n;}
function remove(r){return r.parentNode.removeChild(r);}
function getTag(element){
	let expr = compileXPath("ancestor-or-self::*[1]");
	return (getTag = function(elm){ return $X(expr, elm); })(element);
}
//}
function addEvent( obj, type, fn, capture ) {
	obj.addEventListener( type, fn, capture?capture:false );
}
function removeEvent( obj, type, fn, capture ) {
	obj.removeEventListener( type, fn, capture?capture:false );
}

function log() {
	var arg;
	switch(arguments.length) {
		case 1:
			arg = arguments[0];
			break;
		case 0:
			arg = null;
			break;
		default:
			arg = Array.slice(arguments);
			break;
	}
	
//	if(JSON && JSON.stringify)
//		arg = JSON.stringify(arg);
	/**/if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) === "function")
		unsafeWindow.console.log(arg);
	/**/else/**/ if(typeof(GM_log) === "function")
		GM_log(arg);
	return arg;
}
//}