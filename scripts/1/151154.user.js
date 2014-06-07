// ==UserScript==
// @name       ICS Wiki Replacement
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  used to replace [SR#],[CQ#] into links
// @match      http://*/*
// @copyright  2012+, Bob Sun
// ==/UserScript==
(function() {
    //var sourceCode=document.getElementById("content-article");
	var srPattern="";
	var cqPattern="";
	var srResult='<a href="http://ssc/sscapps/Layouts/SR/DisplayForm.aspx?SRNumber=$1" target="_blank">$1</a>';
	var cqRequirementResult='<a href="http://zhacqweb/cqweb/login?/cqweb/main?command=GenerateMainFrame&service=CQ&schema=CQMS.PRODUCTCLAN.ZHA&contextid=PODI&entityID=$1&entityDefName=Requirement" target="_blank">$1</a>';
	var cqDefectResult='<a href="http://zhacqweb/cqweb/login?/cqweb/main?command=GenerateMainFrame&service=CQ&schema=CQMS.PRODUCTCLAN.ZHA&contextid=PODI&entityID=$1&entityDefName=DefectV2" target="_blank">$1</a>';
	var htmlResult=document.getElementById("content-article").innerHTML;//set the initial value
	
	//Do replacement
	htmlResult=htmlResult.replace(/\[(SSC-[0-9]{8})\]/ig,srResult);//
	htmlResult=htmlResult.replace(/\[(PODI[0-9]{8})\]-r/ig,cqRequirementResult);
	htmlResult=htmlResult.replace(/\[(PODI[0-9]{8})\]-d/ig,cqDefectResult);
	
	document.getElementById("content-article").innerHTML=htmlResult;
})
    ();
