// ==UserScript==
// @name          Spotty MLS Tools
// @namespace     spotty
// @description	  I wrote this GreaseMonkey user script to enhance the Los Angeles real estate related web sites, to help me while shopping for a house! See screen shots below, for every house listed on TheMLS.com web site, it adds a link directly to the same house on the following other web sites:  Zip Realty (you have to be logged in), Trulia, Los Angeles county parcel viewer, Google Maps, Zillow. It also performs an AJAX call back to the TheMLS.com web site open house search, and will display if this house has an open house. Additionally, it also adds this "utility" box to the ZipRealty site. Fore more info and screenshots, see http://blog.spotty.us/2007/07/spotty-mls-tools-los-angeles-real.html
// @include       http://guests.themls.com/*
// @inlucde		  http://12.129.254.39/*
// @include       http://assessormap.co.la.ca.us/*
// @include       http://www.ziprealty.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


function Init()
{	
	if (window.location.pathname.indexOf("profile_page.cfm")>-1)
		Profile();

	if (window.location.pathname.indexOf("view_photo.cfm")>-1)
		Photo();

	if (window.location.pathname.indexOf("column_report.cfm")>-1)
		Search();

	if (window.location.pathname.indexOf("menu.asp")>-1)
		Assesor_menuasp();

	if (window.location.pathname.indexOf("query_process.asp")>-1)
		Assesor_queryaprocessasp();
	
	if (window.location.pathname.indexOf("home_detail.jsp")>-1)
		ZipRealty();
		
	var strNewStyle = 
	"<style> 										" +
	" 	a.gal 										" +
	" 	{ 											" +
	" 		border: 1px black inset !important;		" + 
	" 		background-color: #de5151 !important; 	" + 
	" 		color: white !important; 				" + 
	" 	}											" +
	" 	a:hover.gal									" +
	" 	{ 											" +
	" 		border: 1px black inset !important;		" + 
	" 		background-color: blue !important;		" + 
	" 		color: linen !important;				" + 
	" 	}											" +
	" 	div.galdiv									" +
	" 	{ 											" +
	" 		background-color: linen;				" + 
	" 		padding: 5px;							" + 
	" 	}											" +
	"   div.spotty_mls_tools						" +
	"	{											" +
	"		background-color: #e3e3e3;				" +
	"		padding: 3px;							" +
	"		border: 1px red solid; 					" +
	"		font-weight: normal; 					" +
	"		width: 300px; 		 					" +
	"		text-align: center	 					" +
	"	}											" +
	"   span.openhouse								" +
	"	{											" +
	"		font-weight:normal;						" +
	"		background-color: white;				" +
	"	}											" +
	"   div.ziprealty								" +
	"	{											" +
	"		position: absolute;						" +
	"		top: 100px;								" +
	"	}											" +
	" </style>										";


	var head = $XP('//head');
	head.innerHTML = head.innerHTML + strNewStyle;
}

function Log(strMsg)
{
	unsafeWindow.console.log(strMsg);
}

Init();

//modify search results page, such as http://guests.themls.com/search/column_report.cfm
function Search()
{

	//iterate through all homes on the page
	tdAddress_i = document.evaluate("//td[@valign='top']/table[@class='fieldSmall']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

	for (i=0; tdAddress=tdAddress_i.snapshotItem(i); i++) 
	{
	
		// for open house search results, pick up the MLS number from the photo link
		if (tdAddress.innerHTML.indexOf("mlsnum") > -1)
		{
			strMLSNumCache = tdAddress.innerHTML.substring(tdAddress.innerHTML.indexOf("mlsnum=")+7);
			strMLSNumCache = strMLSNumCache.substring(0,9);
			alert(strMLSNumCache);			
		}
		
	
		var strMLSNum;
		//if this table cell includes a link to the profile page, process it
		//(there are other table cells in the result set that are not relevant)
		if (tdAddress.innerHTML.indexOf("profile_page.cfm")>-1)
		{
		
			var strMLSTableCellHTML = tdAddress.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
			strMLSNum = strMLSTableCellHTML.substring(strMLSTableCellHTML.indexOf("mlsnum=")+7);
			strMLSNum = strMLSNum.substring(0,9);
			

			//parse the address. Its in two lines so we iterate through the links inside this table
			var link_i = document.evaluate("tbody/tr/td/a", tdAddress, null, XPathResult.ANY_TYPE,null); 
			var link = link_i.iterateNext();
			var strStreetAddress = link.innerHTML;
			link = link_i.iterateNext();
			strCity = link.innerHTML;
			strState = "CA";
			
			//find the table cell where we want to inject the MLSifier links
			var td_i = document.evaluate("tbody/tr/td", tdAddress, null, XPathResult.ANY_TYPE,null); 
			var td = td_i.iterateNext();
			
			//get the HTML to inject
			strNewHTML = GetNewHTML(strMLSNum,strStreetAddress,strCity,strState)
			
			//inject!
			td.innerHTML = strNewHTML + td.innerHTML;

		}
	}
	PopulateOpenHouse();
}

function PopulateOpenHouse()
{
	//the previous functions left a placeholder span on the page with the MLS number, 
	//so that this function can go through and perform AJAX call for each one and display
	//if there is an open house for it
	//the span looks like this:
	// <span class="open_house_ajax">
	// 		<span class="mlsnum" style="display: none;">07-182233</span>
	//		<img width="16" height="16" alt="Snake" src="data:image/gif;base64,...binarydata..."/>
	// </span>
	
	spnOpenHouse_i = document.evaluate("//span[@class='open_house_ajax']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; spnOpenHouse=spnOpenHouse_i.snapshotItem(i); i++) 
	{
		var strMLSNum = spnOpenHouse.firstChild.innerHTML;
		GM_xmlhttpRequest({
		    method: 'POST',
    		url: 'http://guests.themls.com/GuestOpenHouse/column_report.cfm',
    		data: 'area=mojo&p_type=0&priceline_1=&pricewise=1&priceline_2=&beds=&baths=&mlsnum=' + strMLSNum +'&open_start_date=05%2F13%2F07&open_end_date=&Operation=Search+Open+Houses',
    		headers: {'Content-type': 'application/x-www-form-urlencoded'},
    		onload: function(responseDetails) 
    		{
    			// find open house text in response body, may be multiples.
				var strHTML = responseDetails.responseText;
	    		var objRegExp = /Open house date:<\/b><\/td><\/tr>[^<]*<tr><td><b>([^<]*)<\/b>/g;
  				var strOpenOpenHouses = "";
  				var intOpenHouses = 0;
  				while ((objMatch = objRegExp.exec(strHTML)) != undefined) {
					strOpenOpenHouses += objMatch[1] + "<BR>";
					intOpenHouses++;
				}

				//find the span again, we don't have access to it here
				//first we have to re-determine what the MLS # is from the callback, since we don't have access to that either
	    		var objRegExp = /mlsnum=(.{9})/;
  				objMatch = objRegExp.exec(strHTML);
 
 				//if there is no MLS Number in the response, there is no open house
 				if (objMatch != undefined)
  				{
	  				var strMLSNum = objMatch[1];
					var spn = document.getElementById("spotty-" + strMLSNum);
					spn.parentNode.innerHTML = "<span class='openhouse'>Open House:<BR>" + strOpenOpenHouses + "</span>";
				}
    		}
		});
	}

}

function GetNewHTML(strMLSNum,strStreetAddress,strCity,strState)
{
	// zip realty link
	
	var strCityState =  strCity + ", " + strState;
	var strFullAddress = strStreetAddress + " " + strCityState;
	
	var strZipRealtyURL = "http://www.ziprealty.com/buy_a_home/logged_in/search/home_detail.jsp?page=1&property_type=SFR&mls=mls_so_cal&cKey=hp23b8f7&source=CLAW&listing_num=";
	var strZillowURL = "http://www.zillow.com/search/Search.htm?addrstrthood=" + escape(strStreetAddress) + "&citystatezip=" + escape(strCityState) + "&GOButton=";

	var strParcelURL = "http://assessormap.co.la.ca.us/mapping/viewer.asp?aa=" + escape(strStreetAddress);

	var strTrulia1 = "http://www.trulia.com/validate.php?tst=h&search=" + escape(strStreetAddress) + " " + escape(strCityState) + "&hsb=1";
	
	var strHTML = 	" <div class='spotty_mls_tools'>" +  
					" <img style='float:right' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAACgAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE/8AAEQgASABEAwEiAAIRAQMRAf/EAIAAAAIDAQEAAAAAAAAAAAAAAAAFAwQGAgEBAAMBAQEBAAAAAAAAAAAAAAABAgUEAwYQAAEDAgUBBgUFAAAAAAAAAAEAAgMRBCExQRIFIlFhcZEyE4Gh0VJiscFCIxURAAIBAwQCAwEAAAAAAAAAAAABAhExAyFREgSBImFxMhP/2gAMAwEAAhEDEQA/ANmuXPawbnEADUqC8vYrNu6Q4nJupWVub+W9dWQ9Nelg0SbodGHBLK9o7ji95qnRbYn79Pgl/wDp3NCHSHHsA+ipUIyRTVTU1YdfHFU41+y9DzNxC4GQ72dhp+q0tvOy4YJIzVpWMazeaVA8cldtpJeMeHObVrsC0HPvCaOXs4YXhpLbc1aEpZzFdpMZDXENBqmyozAQhCAMHNPJcyb5TUldNFFGPUpK40C8z6KKSVETM6iBkE3g4yIjrx7wc/oUvsrV87sMAMynsTGxja3zKo4+zlcfWEqP4KMnDtDgWO6O/NW5bSOZrWOwaw1ACsbSUu5OeS2bvaBX8skzglmnKnKVrHV1D7hG07aU24Zd6citMc0nt7v342vcKVFVYt72sohHUCDj2JniMUIQgRgnDa4+altojK8AalcSjUJrw0W6Qu+0DzKhG9lyfzi5Et2bi1a1tuwFg9XaV3xLLhz6zmoNT4JtsDsCva0wbkqMRybdXdk2CWcnE25Zsf6c0xAwVdwY80BFUyUUYIxE0CmAwXfF2jY5ZpRqaN7hQE/NSyjQH5r3jAR7lT/IYfBADBCEIEYRx6SDoU+4du1jndrv2WfOa0fGn+rzUI1u3+PJfD8aBWA0UVNhGLjpkpJLkRjHNUZR3cSezG5wbWgrgsg/lnSSbo8PxzJWldetcKO8khnht/d92Ku8E9OvknXQaWpcsLl5bSem/GngvJbl8RE0RoQcRoQqLnu3gelT3RowMAqSQ0U1qUhzST9bGsQhCZBg9pBNdCm3HzHFhw7EIUI2OxTg+XgvySAANUAkfI+oFUIVGQDpCDiMQo5ZXnMUr3IQmBT/AM+e8k2M6RmXFPrLjG21HOdveBQE6IQgBghCECP/2Q%3D%3D' width='68' height='72' />" +
					" Spotty MLS Tools <BR>" + 
					" <span class='open_house_ajax'><span id='spotty-" + strMLSNum+ "' class='mlsnum' style='display:none'>" + strMLSNum + "</span></span>" +
					" <a class='gal' href='" + strZipRealtyURL + strMLSNum.replace("-","_") + "'>Zip Realty</a>" +
					" <a class='gal' href='http://maps.google.com/maps?q=" + escape(strFullAddress) + "'>Google Maps</a><BR> " +
					" <a class='gal' href='" + strZillowURL + "'>Zillow</a> " +
					" <a class='gal' href='" + strTrulia1 + "'>Trulia</a> " +
					" <a class='gal' href='" + strParcelURL + "'>Parcel</a><BR clear='all'> " +
					" </div>";
	return strHTML;
}

// modify profile page, such as http://guests.themls.com/profile_page.cfm?mls=06-141109
function Profile()
{
	//add Google Maps links
	strPath = "//td[@class='s2' and @colspan='2' and @valign='top' and @align='left']/b";
	var bAddress = $XP(strPath);
	var aryAddress = bAddress.innerHTML.split(/,/);
	var strStreetAddress = aryAddress[0];
	var strCity = aryAddress[1].substring(1);
	var strState = aryAddress[2].split(/ /)[1];
	var strMLSNum;
	
	//add Zip Realty link
	var strPath = "//tr/td[@class='s2']/b";
	var td_i = $XPi(strPath);
	
	var td = td_i.iterateNext();
	while (td) {
	
		if (td.innerHTML.length==9)
		{
			strMLSNum = td.innerHTML;
			break;
		}
		
	  td = td_i.iterateNext();
	}	
	
	var strHTML = GetNewHTML(strMLSNum,strStreetAddress,strCity,strState)
	bAddress.innerHTML += "<BR>" + strHTML;
	PopulateOpenHouse();

}

function Photo()
{
	var strPath = "//td[@class='bk']";
	var tdAddress = $XP(strPath);
	var strAddress = tdAddress.innerHTML.substring(49);
	var aryAddress = strAddress.split(/,/);
	var strStreetAddress = aryAddress[0];
	var strCity = aryAddress[1].substring(1,aryAddress[1].length-5);
	var strState = "CA";
	var strMLSNum = tdAddress.innerHTML;
	strMLSNum = strMLSNum.substring(25,strMLSNum.indexOf("07-"));
	var strHTML = GetNewHTML(strMLSNum,strStreetAddress,strCity,strState)
	tdAddress.innerHTML = strHTML + tdAddress.innerHTML;
	PopulateOpenHouse();

}

function $XPi(strXpath)
{
	return document.evaluate(strXpath, document, null, XPathResult.ANY_TYPE,null); 
		
}

function $XP(strXpath)
{
	var objIterator = $XPi(strXpath);
	var objNode = objIterator.iterateNext();
	if (!objNode)
		alert('cant find ' + strXpath);
	else
		return objNode;
}

//function to manipulate the assessors web site, to allow direct linking
function Assesor_menuasp()
{
	var strQueryString = parent.window.location.search;
	if (strQueryString.substring(0,4) == "?aa=")
	{
		var strAddress = unescape(strQueryString.substring(4).replace(/\+/g," "));
		unsafeWindow.document.forms[0].SearchStr.value = strAddress;
		unsafeWindow.document.forms[0].submit.click();
	}
}

//function to manipulate the assessors web site, to allow direct linking
function Assesor_queryaprocessasp()
{
	window.addEventListener('load', function(event) {
	
		var strBodyHTML = document.body.innerHTML;
		var intPos = strBodyHTML.indexOf('"sendMapValue(');
		var strAIN = strBodyHTML.substring(intPos+14);
		strAIN = strAIN.substring(0,10);
		unsafeWindow.sendMapValue(strAIN);
 
	}, 'false');
}

function ZipRealty()
{
	var strMLSNum;
	var strHTML = document.body.innerHTML;
	var objRegExp = /listing_num=(.{9})/;
	var objMatch = objRegExp.exec(strHTML);	
	if (objMatch != undefined)
	{
		strMLSNum = objMatch[1].replace("_","-");
		
		objRegExp = /address=([^"]*)/;
		objMatch = objRegExp.exec(strHTML);
		if (objMatch != undefined)
		{
			var strAddress = unescape(objMatch[1]).replace(/\+/g," ");
			var aryAddress = strAddress.split(",");
			var strStreetAddress = aryAddress[0];
			var strState = aryAddress[2].split(" ")[1];
			var strZipcode = aryAddress[2].split(" ")[2];
			
			var strHTML = GetNewHTML(strMLSNum,strStreetAddress,strState,strZipcode)
			var td = document.getElementById("client_ratings").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			td.innerHTML = strHTML + td.innerHTML;
			PopulateOpenHouse();
		}
	}
	
}