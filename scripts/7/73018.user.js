// ==UserScript==
// @name          The Marker EuroDollar - NIS currency title real time
// @author        Motty Katan
// @namespace     http://mtk.co.il
// @description	  The title will include the currency real time change. Motty Katan(c) 31-03-10 updated at
// @include       http://finance.themarker.com/f/currency/indexCurPage.jhtml?*
// ==/UserScript==
//themarkereurodollarnis.user.js
//Works for:
//http://finance.themarker.com/f/currency/indexCurPage.jhtml?secCode=2&IndType=3
//http://finance.themarker.com/f/currency/indexCurPage.jhtml?secCode=1&IndType=3
//based on special_signs_helpy.js Motty Katan (c)
//Build Changes:
//01-04-10: displaying the rate itself after the rate change

//it seems that String.fromCharCode is not relaiable
var oText = document.createElement("DIV");
function getUnicodeChar(nCode){
  oText.innerHTML = "&#"+nCode+";";
  return oText.innerHTML;
}
function getQueryStringArr(){
   sQueryString = location.search.substr(1,location.search.length);
   aArr = sQueryString.split("&");
   aQueryArr = new Array();
   for (var i=0;i<aArr.length;i++){
   	 aKeyVal = aArr[i].split("=");
     aQueryArr[aKeyVal[0]] = aKeyVal[1];
   }
   return aQueryArr;
}

function main()
{
	function updateTitle(){
    	//ex. $:NIS-013=4.001
	    document.title = sCurSym+":"+getUnicodeChar(8362)+oCurData.innerHTML+"="+document.getElementById("lastTd").innerHTML;
	}

    aQueryArr = getQueryStringArr();
    sCurSym = "";
    if (aQueryArr["IndType"]==3){
	    //dollar
	    if (aQueryArr["secCode"]==1)
	    {
	        sCurSym = "$";
	    }
	    //euro
	    else if (aQueryArr["secCode"]==2)
	    {
	        sCurSym = getUnicodeChar(128);
	    }

        if (sCurSym!=""){
	        var oCurData = document.getElementById("lastChangeField");
	        document.getElementById("loadingGifDolCrossingCurPage").addEventListener('DOMAttrModified', updateTitle, false);
	        updateTitle();
    	}
    }
}
main();