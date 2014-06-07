// ==UserScript==
// @name           ExpEV
// @namespace      http://www.niamodel3.com/
// @include        http://www.niamodel3.com/plans/page_plans_ad.php*
// @include        http://niaxchange.com/services/plans/*
// @include	   http://niasecrets.ch/*_escorts/*
// @include	   http://www.niasecrets.ch/*_escorts/*
// @include	   http://niaxchange.com/*_escorts/*
// @include	   http://www.niaxchange.com/*_escorts/*
// @include	   http://niaxchange.ch/*_escorts/*
// @include	   http://www.niaxchange.ch/*_escorts/*
// @include        http://www.niamodel4.com/plans/page_plans_ad.php*
// @include	   http://www.niamodel4.com/*_escorts/*
// @include        http://niamodel4.com/plans/page_plans_ad.php*
// @include	   http://niamodel4.com/*_escorts/*
// @include        http://www.niamodel4.com/site/*
// @include        http://niamodel4.com/site/*
// @include	   http://escortfr.net/*
// @include	   http://www.escortfr.net/*
// @include 	   http://youppie.net/forum/*
// @include 	   http://www.youppie.net/forum/*
// @include	   http://niaxchange.com/services/plans/niasplansV5.php
// @include	   http://www.niaxchange.com/services/plans/niasplansV5.php

// ==/UserScript==
// Expand Nia EV


var listEs = new Array();
listEs[8622] = "french_escorts/asian_escorts_girls/2007/escorte_lady_8622.html";
listEs[11473] = "french_escorts/asian_escorts_girls/2008/escorte_lady_11473.html";
listEs[15804] = "french_escorts/asian_escorts_girls/2009/escorte_lady_15804.html";
listEs[25475] = "french_escorts/asian_escorts_girls/2011/escorte_lady_25475.html";
listEs[26483] = "french_escorts/asian_escorts_girls/2011/escorte_lady_26483.html";
listEs[27383] = "french_escorts/asian_escorts_girls/2011/escorte_lady_27383.html";
listEs[28923] = "french_escorts/asian_escorts_girls/2011/escorte_lady_28923.html";
listEs[28977] = "french_escorts/asian_escorts_girls/2011/escorte_lady_28977.html";
listEs[31399] = "french_escorts/asian_escorts_girls/2011/escorte_lady_31399.html";
listEs[31826] = "french_escorts/asian_escorts_girls/2011/escorte_lady_31826.html";
listEs[32397] = "french_escorts/asian_escorts_girls/2012/escorte_lady_32397.html";
listEs[32467] = "french_escorts/asian_escorts_girls/2012/escorte_lady_32467.html";
listEs[16981] = "french_escorts/asian_escorts_trans/2009/escorte_trans_16981.html";
listEs[24268] = "french_escorts/asian_escorts_trans/2011/escorte_trans_24268.html";
listEs[28874] = "french_escorts/asian_escorts_trans/2011/escorte_trans_28874.html";
listEs[2317] = "french_escorts/black_escorts_girls/2005/escorte_lady_2317.html";
listEs[16176] = "french_escorts/black_escorts_girls/2009/escorte_lady_16176.html";
listEs[19180] = "french_escorts/black_escorts_girls/2010/escorte_lady_19180.html";
listEs[19630] = "french_escorts/black_escorts_girls/2010/escorte_lady_19630.html";
listEs[21660] = "french_escorts/black_escorts_girls/2010/escorte_lady_21660.html";
listEs[28047] = "french_escorts/black_escorts_girls/2011/escorte_lady_28047.html";
listEs[28689] = "french_escorts/black_escorts_girls/2011/escorte_lady_28689.html";
listEs[32785] = "french_escorts/black_escorts_girls/2012/escorte_lady_32785.html";
listEs[1493] = "french_escorts/caucasian_escorts_girls/2005/escorte_lady_1493.html";
listEs[2973] = "french_escorts/caucasian_escorts_girls/2006/escorte_lady_2973.html";
listEs[3111] = "french_escorts/caucasian_escorts_girls/2006/escorte_lady_3111.html";
listEs[11167] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_11167.html";
listEs[11491] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_11491.html";
listEs[11493] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_11493.html";
listEs[12843] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_12843.html";
listEs[9686] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_9686.html";
listEs[14661] = "french_escorts/caucasian_escorts_girls/2009/escorte_lady_14661.html";
listEs[15474] = "french_escorts/caucasian_escorts_girls/2009/escorte_lady_15474.html";
listEs[15715] = "french_escorts/caucasian_escorts_girls/2009/escorte_lady_15715.html";
listEs[15994] = "french_escorts/caucasian_escorts_girls/2009/escorte_lady_15994.html";
listEs[19993] = "french_escorts/caucasian_escorts_girls/2010/escorte_lady_19993.html";
listEs[20918] = "french_escorts/caucasian_escorts_girls/2010/escorte_lady_20918.html";
listEs[21532] = "french_escorts/caucasian_escorts_girls/2010/escorte_lady_21532.html";
listEs[21992] = "french_escorts/caucasian_escorts_girls/2010/escorte_lady_21992.html";
listEs[24286] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_24286.html";
listEs[24545] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_24545.html";
listEs[27451] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_27451.html";
listEs[28121] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28121.html";
listEs[28171] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28171.html";
listEs[28296] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28296.html";
listEs[28361] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28361.html";
listEs[28371] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28371.html";
listEs[28808] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28808.html";
listEs[28959] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_28959.html";
listEs[30249] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_30249.html";
listEs[31219] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_31219.html";
listEs[31377] = "french_escorts/caucasian_escorts_girls/2011/escorte_lady_31377.html";
listEs[32353] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_32353.html";
listEs[32494] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_32494.html";
listEs[32984] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_32984.html";
listEs[33263] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_33263.html";
listEs[33455] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_33455.html";
listEs[33461] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_33461.html";
listEs[33842] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_33842.html";
listEs[34065] = "french_escorts/caucasian_escorts_girls/2012/escorte_lady_34065.html";
listEs[7155] = "french_escorts/caucasian_escorts_trans/2007/escorte_trans_7155.html";
listEs[7235] = "french_escorts/caucasian_escorts_trans/2007/escorte_trans_7235.html";
listEs[7743] = "french_escorts/caucasian_escorts_trans/2007/escorte_trans_7743.html";
listEs[8248] = "french_escorts/caucasian_escorts_trans/2007/escorte_trans_8248.html";
listEs[23337] = "french_escorts/caucasian_escorts_trans/2010/escorte_trans_23337.html";
listEs[25603] = "french_escorts/caucasian_escorts_trans/2011/escorte_trans_25603.html";
listEs[29034] = "french_escorts/caucasian_escorts_trans/2011/escorte_trans_29034.html";
listEs[29663] = "french_escorts/caucasian_escorts_trans/2011/escorte_trans_29663.html";
listEs[32666] = "french_escorts/caucasian_escorts_trans/2012/escorte_trans_32666.html";
listEs[33520] = "french_escorts/caucasian_escorts_trans/2012/escorte_trans_33520.html";
listEs[34188] = "french_escorts/caucasian_escorts_trans/2012/escorte_trans_34188.html";
listEs[24832] = "french_escorts/island_escorts_girls/2011/escorte_lady_24832.html";
listEs[8627] = "french_escorts/latinas_escorts_girls/2007/escorte_lady_8627.html";
listEs[11618] = "french_escorts/latinas_escorts_girls/2008/escorte_lady_11618.html";
listEs[12886] = "french_escorts/latinas_escorts_girls/2008/escorte_lady_12886.html";
listEs[14038] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_14038.html";
listEs[15690] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_15690.html";
listEs[15864] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_15864.html";
listEs[16082] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_16082.html";
listEs[16393] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_16393.html";
listEs[16690] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_16690.html";
listEs[17193] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_17193.html";
listEs[17755] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_17755.html";
listEs[18488] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_18488.html";
listEs[7743] = "french_escorts/latinas_escorts_girls/2009/escorte_lady_7743.html";
listEs[18758] = "french_escorts/latinas_escorts_girls/2010/escorte_lady_18758.html";
listEs[19505] = "french_escorts/latinas_escorts_girls/2010/escorte_lady_19505.html";
listEs[20244] = "french_escorts/latinas_escorts_girls/2010/escorte_lady_20244.html";
listEs[21214] = "french_escorts/latinas_escorts_girls/2010/escorte_lady_21214.html";
listEs[27495] = "french_escorts/latinas_escorts_girls/2011/escorte_lady_27495.html";
listEs[29421] = "french_escorts/latinas_escorts_girls/2011/escorte_lady_29421.html";
listEs[30147] = "french_escorts/latinas_escorts_girls/2011/escorte_lady_30147.html";
listEs[30319] = "french_escorts/latinas_escorts_girls/2011/escorte_lady_30319.html";
listEs[32307] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_32307.html";
listEs[32494] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_32494.html";
listEs[33230] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_33230.html";
listEs[33363] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_33363.html";
listEs[33660] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_33660.html";
listEs[33663] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_33663.html";
listEs[33847] = "french_escorts/latinas_escorts_girls/2012/escorte_lady_33847.html";
listEs[286] = "french_escorts/latinas_escorts_trans/2004/escorte_trans_286.html";
listEs[1606] = "french_escorts/latinas_escorts_trans/2005/escorte_trans_1606.html";
listEs[1769] = "french_escorts/latinas_escorts_trans/2005/escorte_trans_1769.html";
listEs[2480] = "french_escorts/latinas_escorts_trans/2005/escorte_trans_2480.html";
listEs[4695] = "french_escorts/latinas_escorts_trans/2006/escorte_trans_4695.html";
listEs[4973] = "french_escorts/latinas_escorts_trans/2006/escorte_trans_4973.html";
listEs[5466] = "french_escorts/latinas_escorts_trans/2006/escorte_trans_5466.html";
listEs[5737] = "french_escorts/latinas_escorts_trans/2006/escorte_trans_5737.html";
listEs[13329] = "french_escorts/latinas_escorts_trans/2008/escorte_trans_13329.html";
listEs[13625] = "french_escorts/latinas_escorts_trans/2009/escorte_trans_13625.html";
listEs[15937] = "french_escorts/latinas_escorts_trans/2009/escorte_trans_15937.html";
listEs[17139] = "french_escorts/latinas_escorts_trans/2009/escorte_trans_17139.html";
listEs[17215] = "french_escorts/latinas_escorts_trans/2009/escorte_trans_17215.html";
listEs[17825] = "french_escorts/latinas_escorts_trans/2009/escorte_trans_17825.html";
listEs[18813] = "french_escorts/latinas_escorts_trans/2010/escorte_trans_18813.html";
listEs[19110] = "french_escorts/latinas_escorts_trans/2010/escorte_trans_19110.html";
listEs[19351] = "french_escorts/latinas_escorts_trans/2010/escorte_trans_19351.html";
listEs[19366] = "french_escorts/latinas_escorts_trans/2010/escorte_trans_19366.html";
listEs[19589] = "french_escorts/latinas_escorts_trans/2010/escorte_trans_19589.html";
listEs[25793] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_25793.html";
listEs[25878] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_25878.html";
listEs[26085] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_26085.html";
listEs[27329] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_27329.html";
listEs[27753] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_27753.html";
listEs[27779] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_27779.html";
listEs[28863] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_28863.html";
listEs[29347] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_29347.html";
listEs[29929] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_29929.html";
listEs[30500] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_30500.html";
listEs[31489] = "french_escorts/latinas_escorts_trans/2011/escorte_trans_31489.html";
listEs[32088] = "french_escorts/latinas_escorts_trans/2012/escorte_trans_32088.html";
listEs[32737] = "french_escorts/latinas_escorts_trans/2012/escorte_trans_32737.html";
listEs[33340] = "french_escorts/latinas_escorts_trans/2012/escorte_trans_33340.html";
listEs[33429] = "french_escorts/latinas_escorts_trans/2012/escorte_trans_33429.html";
listEs[33797] = "french_escorts/latinas_escorts_trans/2012/escorte_trans_33797.html";
listEs[34091] = "french_escorts/latinas_escorts_trans/2012/escorte_trans_34091.html";
listEs[3149] = "french_escorts/middle_east_escorts_girls/2006/escorte_lady_3149.html";
listEs[6669] = "french_escorts/middle_east_escorts_girls/2007/escorte_lady_6669.html";
listEs[7946] = "french_escorts/middle_east_escorts_girls/2007/escorte_lady_7946.html";
listEs[18107] = "french_escorts/middle_east_escorts_girls/2009/escorte_lady_18107.html";
listEs[33754] = "french_escorts/middle_east_escorts_girls/2012/escorte_lady_33754.html";
listEs[9379] = "french_escorts/middle_east_escorts_trans/2008/escorte_trans_9379.html";
listEs[17276] = "french_escorts/middle_east_escorts_trans/2009/escorte_trans_17276.html";
listEs[15864] = "french_escorts/mixed_escorts_girls/2009/escorte_lady_15864.html";
listEs[21811] = "french_escorts/mixed_escorts_girls/2010/escorte_lady_21811.html";
listEs[31788] = "french_escorts/mixed_escorts_girls/2011/escorte_lady_31788.html";
listEs[33738] = "french_escorts/mixed_escorts_girls/2012/escorte_lady_33738.html";
listEs[2480] = "french_escorts/mixed_escorts_trans/2005/escorte_trans_2480.html";
listEs[8041] = "french_escorts/mixed_escorts_trans/2007/escorte_trans_8041.html";
listEs[12492] = "french_escorts/mixed_escorts_trans/2008/escorte_trans_12492.html";
listEs[15416] = "french_escorts/mixed_escorts_trans/2009/escorte_trans_15416.html";
listEs[18145] = "french_escorts/mixed_escorts_trans/2009/escorte_trans_18145.html";
listEs[18682] = "french_escorts/mixed_escorts_trans/2009/escorte_trans_18682.html";
listEs[9451] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_9451.html";
listEs[9203] = "french_escorts/caucasian_escorts_girls/2008/escorte_lady_9203.html";
listEs[22806] = "french_escorts/caucasian_escorts_girls/2010/escorte_lady_22806.html";
listEs[27337] = "french_escorts/latinas_escorts_girls/2011/escorte_lady_27337.html";
listEs[15749] = "french_escorts/latinas_escorts_trans/2009/escorte_trans_15749.html";
listEs[26135] = "french_escorts/latinas_escorts_girls/2011/escorte_lady_26135.html";

var allLinks, thisLink;
GM_log("Start");


// Redirection pour les accès direct au site nia3
var reg = /((^.*site\/(femme|trans).php\?n=|\/popup\/(femme|trans)\/)(\d+))/i;
var match;
if (match = reg.exec(document.location.href))
{
	if (listEs[match[5]])
	document.location.href = "http://niamodel4.com/" + listEs[match[5]];
}
var divPlan = document.getElementById('plans');
if (divPlan)
{
	divPlan.removeChild(divPlan.nextSibling);
}
var n = 0;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    thisLink = allLinks.snapshotItem(i);
 
    var reg = /plans.php\?Num=(\d+)/i;
    var match;
    if (match = reg.exec(thisLink.href))
    {
      //	if (i % 10 = 0)
       //GM_log("===-> "+thisLink.href+' === '+match[1]);
	GM_xmlhttpRequest({
      method: 'GET',
                  url: thisLink.href,
                  headers: {
          'User-agent': 'Mozilla/5.0',
              // 'Accept': 'application/atom+xml,application/xml,text/xml',
              },
                  onload: function(res) 
                      {		
			  GM_log("++ "+res.finalUrl );
                          var data = res.responseText
			  // regexp contenu EV
			  //var regEv = /<p><strong><font color=\"#000000\">([\s\S]+)<\/font><\/strong>/mg;
			  var regEv = /<p> <font color=\"#(FFFFFF|000000)\">(<em>)?([\s\S]+)(<\/em>)?<\/font> <\/p>/mg;
			  var regAuth = /<strong>D'après :(.*)<\/a>/;
			  var ev;
			  //if (res.finalUrl == "http://niaxchange.com/services/plans/plans.php?Num=xxx")
			  if (ev = regEv.exec(data))
				{
                          	GM_log("Res: "+ev[1]);
				var myEv = ev[3];
				var reg = /plans.php\?Num=(\d+)/i;
    				var match;
   				if (match = reg.exec(res.finalUrl))
    				{
				var myDate;
				regEv = /le (\d\d-\d\d-\d\d\d\d)/;
  				if (ev = regEv.exec(data))
				{
					myDate = ev[1];
				}
			 	GM_log("### "+match[1]+" ++ "+res.finalUrl);

				var author;
				if (ev = regAuth.exec(data))
				{
					//author = ev[1];
					author = ev[1].replace("#000000", "#FFCC00")
					author = author.replace('href="', ' target="_blank" href="http://niaxchange.com/nia_services/plans/');
				}
				var myEvDiv = document.getElementById(match[1]);
				var evDiv = document.createElement("div");
				evDiv.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; width: 600;' +
    'font-size: small; background-color:rgba(20,20,20,0.2); '  +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' + 'De: <font color="blue">' + author + '</A></font><BR>' +
    myEv + ' <i> <font color="grey"> &nbsp; &nbsp; ' + myDate + '</font></i></p></div>';

allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    thisLink = allLinks.snapshotItem(i);
    //GM_log("--> "+thisLink.href) 
    if (thisLink.href == res.finalUrl)
    	thisLink.parentNode.insertBefore(evDiv, thisLink.nextSibling);
}				
				}
			  }
                      }
    });

//	document.body.insertBefore(evDiv, thisLink);
//     navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
  
    }
 else
    {
	// Remplacement des vieilles URL nia
	var reg = /((^.*site\/(femme|trans).php\?n=|\/popup\/(femme|trans)\/)(\d+))/i;
    var match;
    if (match = reg.exec(thisLink.href))
	{
		//for (var i = 0; i < idEsLength; ++i)
		
			if (listEs[match[5]])
			{
				thisLink.href = 'http://niamodel4.com/'+listEs[match[5]];
			//	break;
			}
	}

   }
}
