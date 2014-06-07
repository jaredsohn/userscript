// ==UserScript==
// @name        HKO overlay
// @namespace   NoNameSpace
// @include     http://www.hko.gov.hk/*
// @include     http://www.weather.gov.hk/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("body").append (
      '<div id="gmLayerWrapper" align="right">'
	+ '<table width="100%" border="0" align="right" cellpadding="0" cellspacing="0">'
	+ '<tr>'
	+ '<td align="right" valign="top">'
	+ '中環碼頭向東(11)<br/>'
	+ '<img src="http://www.hko.gov.hk/wxinfo/aws/hko_mica/cp1/latest_CP1.jpg" width="300"></img><br/><br/>'
	+ '尖沙咀天文台總部向東(10)<br/>'
	+ '<img src="http://www.hko.gov.hk/wxinfo/aws/hko_mica/hko/latest_HKO.jpg" width="300"></img><br/><br/>'
	+ '尖沙咀天文台總部向西(9)<br/>'
	+ '<img src="http://www.hko.gov.hk/wxinfo/aws/hko_mica/hk2/latest_HK2.jpg" width="300"></img><br/><br/>'
  + '九龍城(8)<br/>'
  + '<img src="http://www.hko.gov.hk/wxinfo/aws/hko_mica/klt/latest_KLT.jpg" width="300"></img><br/><br/>'
	//+ '<img src="http://www.hko.gov.hk/wxinfo/aws/hko_mica/gsi/latest_GSI.jpg" width="300"></img>'
	+ '</td>'
	+ '<td align="right" valign="top">'
	+ '<img src="http://pda.weather.gov.hk/radar/rad_064_320/rad064_6.jpg" width="300"></img><br/>'
	+ '<img src="http://pda.weather.gov.hk/TC_HK_CG.jpg" width="300"></img><br/>'
	+ '<img src="http://pda.weather.gov.hk/mtsate/MTSAT1RIR/mtsat_6.jpg" width="300"></img><br/>'
	+ '<img src="http://pda.weather.gov.hk/tcpos_orig.jpg" width="300"></img>'
	+ '</td>'
	+ '</tr>'
	+ '</table>'
	+ '</div>'
);

$("#gmLayerWrapper").width  ( 600 )
                    .height ( 100 )
                    ;


GM_addStyle ("#gmLayerWrapper { "+
"  margin-top:    10px; "+
"  margin-bottom: 0px; "+
"  margin-right:  10px; "+
"  margin-left:   0px; "+
"  padding:       0; "+
"  position:      absolute; "+
"  top:           0; "+
"  right:         0; "+
"  min-width:     300px; "+
"  z-index:       -1; "+
"} ");

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.aqhi.gov.hk/tc.html",
  headers: {
    //"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    var $response = $(response.responseText);
    var table = $response.find("table#tblCurrAQHI").addClass('apitable-class');
    $("div.allfont:nth-child(2)").append(table);
  }
});

GM_addStyle ("\
#tblCurrAQHI {color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}\
#tblCurrAQHI th {background-color:#acc8cc;border-width: 1px;border-style: solid;border-color: #729ea5;text-align:left;}\
#tblCurrAQHI tr {background-color:#ffffff;}\
#tblCurrAQHI td {border-width: 1px;border-style: solid;border-color: #729ea5;}\
#tblCurrAQHI tr:hover {background-color:#ffff99;}\
");