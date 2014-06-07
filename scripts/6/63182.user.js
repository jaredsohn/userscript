// ==UserScript==
// @name           Facebook Mafia Wars Return on Investment
// @namespace      http://userscripts.org/users/114596
// @description    Show the Return on investment for buying properties
// @include        http://mwfb.zynga.com/mwfb/*
// @version        1.0
// ==/UserScript==

var updateDelay = 0;
var maxAlerts = 1000;
var useLogForAlerts = true;
var logCount = 0;
var eventAdded = false;
var messageCount = 0;
var lastTime = (new Date()).getTime() - 60000;
var PropertyROIDecimalPlaces = 1;

var SCRIPT = {
  version: "1.0",
  name: "Facebook Mafia Wars Return on Investment",
  id: "63182"
};

function updateCheck() {
  if (window != top) return;
  var now = new Date().getTime();
  if (now - GM_getValue("lastUpdateCheck", 0) > 86400000) {
    var sourceUrl = "http://userscripts.org/scripts/source/" + SCRIPT.id + ".user.js?source";
    GM_xmlhttpRequest({method: "GET", url: sourceUrl,
      onload: function(details) {
        if (details.readyState == 4) {
          GM_setValue("lastUpdateCheck", String(now));
          var m = /\/\/ @version *([0-9.]+)/.exec(details.responseText);
          if (m && (m[1] != SCRIPT.version)) {
            alert("Please install the latest version of the script '" + SCRIPT.name + "'.");
            window.location.href = "http://userscripts.org/scripts/show/" + SCRIPT.id ;
          }
        }
      }
    });
  }
}

function tryRateAgain() {
  //AlertCount("Trying Again");
  window.setTimeout(GM_MW_AddRate, 200);
}

var cityNo = 1;
var cityWrapper;
	

function GM_MW_AddRate()
{

	var baseContainer = document.getElementById('inner_page');
	cityNo = 0;
	
	cityWrapper = xpathFirst('//*[@id="mw_city_wrapper"]', document);
	if (!cityWrapper)
	{
	 tryRateAgain(); return;
	}
	cityNo = cityWrapper.className.substring(7); //mw_cityX
	   if (cityNo == 1) 
	   {  
        if (baseContainer && baseContainer.innerHTML.indexOf("Undeveloped Space") != -1)
        {
		    var searchNodes, totalTr, listOfTr, income, income2, nodes, price, xxx, rate;
		    var prevBuyInputValue = 1;
	        var prevBuyInput = null;
		    var baseTables = null;
        	baseTables = baseContainer.getElementsByTagName('table');
            if (baseTables.length == 0) { tryRateAgain(); return; }
                //get number of payments per day
     		var incomeAlreadyByDay = false;
            var tempObj = xpathFirst('.//div[contains(text(), "Cash Flow")]', baseContainer);
            if (!tempObj || !tempObj.innerHTML.match(/every (.+) minutes/i))
            {
              incomeAlreadyByDay = true;
            }

        	var tableNo = 0;
        	for (var i = 0; i < baseTables.length; i++)
        	{
        		if (baseTables[i].className == "main_table")
        		{
        			tableNo = i;
        			break;
        		}
        	}
			

			
        	searchNodes=baseTables[tableNo].getElementsByTagName('tr');
        	for(var p=0; p < searchNodes.length; p++)
        	{
        		propertyTDs = searchNodes[p].getElementsByTagName('td');
        		if (propertyTDs.length == 9 || propertyTDs.length == 11)
        		{
        			incomeTD = propertyTDs[1];
        			if (incomeTD && incomeTD.childNodes[3].childNodes[1])
        			{
        				income=incomeTD.childNodes[3].childNodes[1].innerHTML.split("$")[1];
						
        				income2=income.replace(/,/gi, "");
        				       				
        				costTD = propertyTDs[3];
        				
        				if (costTD.childNodes.length == 5 && costTD.innerHTML.indexOf("Rate:") == -1)
        				{
        					cost=costTD.childNodes[3].innerHTML.split("$")[1];
        					
        					if(cost)
        					{   
							
							  if (costTD.getAttribute('processed') == null)
					          {
				                costTD.setAttribute('processed', 'true');
        						cost=cost.replace(/,/gi, "");                                 
        						rate=(cost/(income2 * (incomeAlreadyByDay ? 1 : 24))).toFixed(PropertyROIDecimalPlaces);
								 						
        						costTD.innerHTML += " <br /> ROI Days: <strong class=\"alert_number\">" + rate +"</strong><strong>";
							  }
        					}
        				}
        				buyInput = propertyTDs[5].getElementsByTagName('select')[0];
        				if (buyInput)
        				{
        					if (prevBuyInput != null &&  buyInput.selectedIndex && parseInt(buyInput.options[buyInput.selectedIndex].value) == 10)
        					{
        						if (parseInt(prevBuyInputValue) != 10)
        						{                       
        							//Set other drop down back to it's value because we've already done this!
        							gm_mw_SelectValue(prevBuyInput, prevBuyInputValue);
        						}
        						return;
        					}
        					else
        					{
        						prevBuyInputValue = buyInput.options[buyInput.selectedIndex].value
        						prevBuyInput = buyInput;
        						if (parseInt(prevBuyInputValue) == 10)
        						{
        							return;
        						}
        						gm_mw_SelectValue(buyInput, "10");
        					}
        				}
        			}
        		}
        	}
        }

	   } 
	   else if ((cityNo == 2) || (cityNo == 3) || (cityNo == 4))  
	   {
		if (baseContainer && baseContainer.innerHTML.indexOf("Businesses") != -1)
        {
		  //In Moscow business, Change to "Undocumented Workers" to "Workers" to remove text overflow
		  baseContainer.innerHTML = baseContainer.innerHTML.replace(/Undocumented/gi, "");  
		  
		  var baseDivs = baseContainer.getElementsByTagName('div');
            if (baseDivs.length == 0) { tryRateAgain(); return; }
		
		  var listDiv = null;
		  var aNum = 0
			for (var i = 0; i < baseDivs.length; i++)
			{
				if (baseDivs[i].className == "business_list")
				{   
					aNum = i;
					break;
				}
			}
			
			listDiv = baseDivs[aNum];
			
		   //if business_list div not found	
		   if (listDiv == null) { return; }	
		  // alert("Is a business page");
	       var Businesses = listDiv.getElementsByTagName('div');
		   var BusinessDivs, BusinessName, CurrentPrice, CurrentOutput, BusinessStats, BusinessStatsChildren, TotalIncome, PriceUpgrade, 
		       NewPrice, OutputUpgrade, CapacityUpgrade, PriceROI;
		   var OutputROI;
		   var ROIDiv;
		   
		   var CalcTotal = false;
		   TotalIncome = 0;
		   
		   
		   OutputROI = "N/A";
		   PriceROI = "N/A";
		   
		   for (var j = 0; j < Businesses.length; j++)
			{
				if (Businesses[j].className == "business")
				{
				    if (Businesses[j].getAttribute('checked') == null)
					{
				      Businesses[j].setAttribute('checked', 'true');
					  BusinessDivs = Businesses[j].getElementsByTagName('div');
					  BusinessName = BusinessDivs[0].innerHTML;
					  
					  
					  if (cityNo == 4)
					  {
					      var match = /Fish:.*\r?\n?\f?(\$[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
						  if (match != null)
						  {
							CurrentPrice = match[1].split("$")[1].replace(/,/gi, "");
						  } else {
						  
							  var match = /Game Cock:.*\r?\n?\f?(\$[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
							  if (match != null)
							  {
								CurrentPrice = match[1].split("$")[1].replace(/,/gi, "");
							  } else {
								  var match = /Scam:.*\r?\n?\f?(\$[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
								  if (match != null)
								  {
									CurrentPrice = match[1].split("$")[1].replace(/,/gi, "");
								  } else {
									  var match = /Game:.*\r?\n?\f?(\$[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
									  if (match != null)
									  {
										CurrentPrice = match[1].split("$")[1].replace(/,/gi, "");
									  } else {
										  var match = /Produces:.*\r?\n?\f?(\$[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
										  if (match != null)
										  {
											CurrentPrice = match[1].split("$")[1].replace(/,/gi, "");
										  } else {
										  CurrentPrice = 0;
										  }
									  }
								  }
							  }
						  
						  }
						  
						  
					  
					  
					  } else { 
					    var match = /Produces:.*\r?\n?\f?(\$[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
					    if (match != null)
					    {
					      CurrentPrice = match[1].split("$")[1].replace(/,/gi, "");
					    } else {
					    CurrentPrice = 0;
					    }
					  }
					  
					  match = null;
					  match = /Output:\s*([0-9]{3})/im.exec(BusinessDivs[1].innerHTML);					  
					  if (match != null)
					  {
					    CurrentOutput = match[1];
					  } else {
					  CurrentOutput = 0;
					  }
					  
					  match = null;
					  match = /Upgrade to.*for.*(\$[0-9]{0,},?[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);					  
					  if (match != null)
					  {
					    PriceUpgrade = match[1].split("$")[1].replace(/,/gi, "");
					  } else {
					  PriceUpgrade = 0;
					  }
					  
					  match = null;
					  match = /Upgrade to.*(\$[0-9]{0,},?[0-9]{0,},?[0-9]{1,})\)/im.exec(BusinessDivs[1].innerHTML);				  
					  if (match != null)
					  {
					    NewPrice = match[1].split("$")[1].replace(/,/gi, "");
					  } else {
					  NewPrice = 0;
					  }
					  
					  match = null;
					  match = /Upgrade Output to.*for.*(\$[0-9]{0,},?[0-9]{0,},?[0-9]{1,})/im.exec(BusinessDivs[1].innerHTML);				  
					  if (match != null)
					  {
					    OutputUpgrade = match[1].split("$")[1].replace(/,/gi, "");
					  } else {
					    OutputUpgrade = 0;
					  }
					  
					  
					  
					  if (CurrentPrice != 0 && CurrentOutput != 0)
					  {
					     TotalIncome = TotalIncome +(CurrentPrice * CurrentOutput);
						 CalcTotal = true;
						 
					    //Quality -- ROI = Cost/(NewPrice-OldPrice)*Output*8
					    if (PriceUpgrade == 0 || NewPrice == 0)
						{
						  PriceROI = "N/A";
						} else {
						  PriceROI = "" + Math.round(((PriceUpgrade)/((NewPrice-CurrentPrice)*CurrentOutput*8))*100)/100;
						}
						
						//Output -- ROI = UpgradeCost/(ProductPrice*160)
						if (OutputUpgrade == 0)
						{
						  OutPutROI = "N/A";
						} else {
						  OutputROI = "" + Math.round((OutputUpgrade/(CurrentPrice * 160))*100)/100;
						}
						
					    BusinessDivs[1].innerHTML += '<div class="business_stat business_stat_bottom"><hr SIZE=1><br><div class="business_stat_name"> \
					                                <div style="float: left;">' 
					                               + BusinessName  + ' ROI:  Quality: '+PriceROI+'  Capacity: N/A  Output: '+OutputROI+'</div></div></div>';

					  }
					}
				}
			}
			if (CalcTotal)
			{
		         baseContainer.innerHTML = baseContainer.innerHTML.replace(/Businesses/i, "Businesses <span class=\"title_action\">	(Income: <span class=\"good\">"+(cityNo==2 ? "C" : "R")+"$"+addCommas(TotalIncome)+"</span>) / 3 hours</span>");
			}
		}
	   }
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function gm_mw_SelectValue(buyInput, value)
{
	for (var i=0; i < buyInput.length; i++) 
	{
		if (parseInt(buyInput[i].value) == parseInt(value))
		{
			buyInput[i].selected = true;
			break;
		}
	}
}

function AlertCount(message)
{
	if (messageCount < maxAlerts)
	{
		messageCount++;
		if (useLogForAlerts && GM_log)
		{
			GM_log(message);
		}
		else
		{
			alert(message);
		}
	}
}



function GM_MW_DoEvents(currentTarget)
{
	try
	{
		var thisTime = (new Date()).getTime();
		if ((currentTarget) && (thisTime > (lastTime + updateDelay)))
		{
			lastTime = thisTime;
			GM_MW_RemoveListener();
			GM_MW_AddRate();
			GM_MW_AddListener();
		}
	}
	catch (err)
	{
		AlertCount('Exception caught: ' + err.name + ' - ' + err.message);
	} 
}

updateCheck();
GM_MW_DoEvents(document.body);

function GM_MW_nodeInserted(event) {
	if(event.relatedNode.id && event.relatedNode.id.search("countdown") == -1  && event.relatedNode.id.search("buy_timer") == -1 && event.relatedNode.id.search("hiddenContent") == -1)
	{ //HACK:avoid calling checkPropertiesPage if update is due to the countdown in page
		//Hack taken from http://userscripts.org/topics/24747
		//AlertCount(event.relatedNode.id);
		GM_MW_DoEvents(event.currentTarget);
	}
}

function GM_MW_AddListener()
{
	if (!eventAdded)
	{

		document.addEventListener("DOMNodeInserted", GM_MW_nodeInserted, false);
		eventAdded = true;
	}
}

function GM_MW_RemoveListener()
{
	if (eventAdded)
	{

		eventAdded = false;

		document.removeEventListener("DOMNodeInserted", GM_MW_nodeInserted, false);

	}
}

function ntos(n){
	n=n.toString(16);
	if (n.length == 1) n="0"+n;
	n="%"+n;
	return unescape(n);
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
function $(id)
{
  return document.getElementById(id);
}








