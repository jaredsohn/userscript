// ==UserScript==
// @name           Fullscreen yMap
// @namespace      http://wtw.tw/scripts/
// @include        http://ymap.co.il/Navigate.aspx*
// @include        http://www.ymap.co.il/Navigate.aspx*
// ==/UserScript==


(function() {

	function $(id)
	{
		return document.getElementById(id);
	}
	
	function x(xpath)
	{
		return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	}

    var enlargeMap = function() {
		$("AtlasMap1").width = "100%";
		$("AtlasMap1").height = "100%";
		$("DivAtlasMap1").width = "100%";
		$("DivAtlasMap1").height = "100%";
		$("DivAtlasMap1").style.width = "100%";
		$("DivAtlasMap1").style.height = "100%";
		
		x('//*[@id="AtlasMap1"]/embed').width = "100%";
		x('//*[@id="AtlasMap1"]/embed').height = "100%";

		x("/html/body/center/form/table/tbody/tr[5]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr/td/table").width = "100%";
  	    x("/html/body/center/form/table/tbody/tr[5]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr/td/table").style.height = "800px";
		x("/html/body/center/form/table/tbody/tr[5]/td[2]/table").width = "100%";
		x("/html/body/center/form/table/tbody/tr[5]/td[2]/table").height = "100%";
		x("/html/body/center/form/table/tbody/tr[5]/td[2]").width = "100%";
		x("/html/body/center/form/table/tbody/tr[5]/td[2]").height = "100%";
		x("/html/body/center/form/table").width = "90%";
		x("/html/body/center/form/table").height = "100%";
		
		$("mapwidth").width = "100%";

   		  
    }
   
    window.addEventListener("load", enlargeMap, false);
   
})();


