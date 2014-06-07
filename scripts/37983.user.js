// ==UserScript==
// @name           OfficeMax Vendor Recycle Info
// @namespace      http://ics.uci.edu/~mpieters
// @description    Shows if a product is recycled
// @include        http://www.officemax.com/omax/catalog/sku.jsp?skuId*
// ==/UserScript==


var CPGManufacturer=new Boolean(false);
var productRecycled=new Boolean(false);
var manufacturerName="";
var productName="";
var manufacturerString=""
var logo;
var productString=""



function getInfoProduct(manufacturerName)
{
	var product = document.evaluate("//h1",document,null,XPathResult.STRING_TYPE,null);
	productName = product.stringValue;	
	if (productName.indexOf(manufacturerName)>0)
	{
	productName = productName.substring(productName.indexOf(manufacturerName)+manufacturerName.length+1);
	}
	var description = document.evaluate(
	  "/html/body/div[@id='bg']/div[@id='content']/div[@id='contentBody']/div[6]/div/dl/dd[1]/div/li[2]",
	  document,null,XPathResult.STRING_TYPE,null).stringValue;
	

	if ((productName.match("recycled","i")!=null) || 
	   (productName.match("post-consumer","i")!=null) || 
	   (description.match("Recycled","i")!=null) ||
	   (description.match("post-consumer","i")!=null))
	{
		productRecycled = true;
	}	
	return productName;
}

function getInfoManufacturer()
{
	var manufacturer = document.evaluate(
          "/html/body/div[@id='bg']/div[@id='content']/div[@id='contentBody']/div[6]/div/div[1]",
          document,
          null,
           XPathResult.STRING_TYPE,
            null);
	manufacturerName = manufacturer.stringValue;
	manufacturerName = manufacturerName.substring((manufacturerName.indexOf("by")+3), 
							(manufacturerName.indexOf("|")-4));
	return manufacturerName;
}

function constructQuery()
{
	manufacturerName = getInfoManufacturer();
	var firstPartOfUrl = "http://cpg.epa.tms.icfi.com/user/cpg_list_more.cfm?ctlact=OK&product=All&supplier=";
	var secondPartOfUrl = "&material=All&state=All&optchoice=2&letter=";
	var thirdPartOfUrl = "&strcount=yes&allct=1327";
	var inputURL = firstPartOfUrl+manufacturerName+secondPartOfUrl+(manufacturerName.charAt(0));
	inputURL = inputURL + thirdPartOfUrl;
	getInfoProduct(manufacturerName);
	return inputURL;
}

function parseEnvInfo(data)
{
	var productData = data.responseText;
	productData = productData.match(manufacturerName);
	if (productData!=null) 
	{	
		CPGManufacturer=new Boolean(true);
		manufacturerString = "<p style='text-align: center;'><FONT SIZE='4'><span style='color:green'>" + 
			manufacturerName + " does have CPG authorized recycled-content products" + "</span></font></p>";	
	}
	else
	{
		manufacturerString = "<p style='text-align: center;'><FONT SIZE='4'><span style='color:red'>" + 
			manufacturerName + " does NOT have any listed CPG authorized recycled-content products" + "</span></font></p>";
	}

	if (productRecycled!=false)
	{
		productString = "<p style='text-align: center;'><FONT SIZE='4'><span style='color:green'>" + 
			productName + " is Recycled" + "</span></font></p>";
	}
	else
	{
		productString = "<p style='text-align: center;'><FONT SIZE='4'><span style='color:red'>" + 
			productName + " is NOT Recycled" + "</span></font></p>";
	}
}


function insertionPoint()
{
	location2 = document.getElementById("contentHeaderBG");
	if (location != null) return location2;
	return null;
}

function insertionPointFEST()
{

	location = document.getElementById("bg");
	if (location != null) return location;
	return null;
}

function addInfo()
{
	var festTop = document.createElement('FestTop');
	festTop.setAttribute('id', 'fest_logo');
	festTop.innerHTML = '<div style="margin: 0 auto 0 auto; '
			+ 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
			+ 'font-size: small; background-color: #44CC55; '
			+ 'color: #000000;"><p style="margin: 2px 0 1px 0;"> '
			+ '<b>This site is running a script from the Firefox 	'
			+ 'Environmental Sustainability '
			+ 'Toolkit (FEST). Please visit '
			+ '<ahref="http://lotus.calit2.uci.edu/fest/index.html">'
			+ ' our homepage</a>'
			+ ' for more information on FEST.</b>'
			+ '</p></div>';
	var position2 = insertionPointFEST();
	position2.parentNode.insertBefore(festTop, position2);
	

	var position = insertionPoint();
	var resultElement = document.createElement('resultElement');
	resultElement.innerHTML = manufacturerString + "<br>" + productString;
	position.parentNode.insertBefore(resultElement, position);
}

window.addEventListener('load', function() 
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: constructQuery(),
		onload: function( data ) 
		{
			try 
			{
				parseEnvInfo(data);
				addInfo();
			} 
			catch( e ) 
			{
				GM_log( e );
			}
		}
	});
}, true);


