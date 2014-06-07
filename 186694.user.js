// ==UserScript==
// @name          Disqus Remove Talkbacks By User Name
// @namespace     http://mtk.co.il/moppy
// @description	  remove comments from a specific user Motty Katan(c) 24-12-2013
// @include       http://disqus.com/embed/comments/?*
// ==/UserScript==
(function(){
	//insert here users, for example: new Array("User1","User2");
	var asUsersToHide = new Array();
	function getUsersCond(){
		var PREFIX = ".='";
		var SUFFIX = "'";
		var sUserCond = PREFIX + asUsersToHide[0] + SUFFIX; 
		for(var i=1;i<asUsersToHide.length;i++){
			sUserCond += " or "+ PREFIX + asUsersToHide[i] + SUFFIX;
		}		
		return ("//a[" + sUserCond + "]"); 
	}
	function hideTalkbacks()
	{
			var sUserCond = getUsersCond();
			aoResults = document.evaluate( "//ancestor::li[@class='post']"+sUserCond+"", window.document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ); 
			j=0;
			while(j<aoResults.snapshotLength)
			{
				oElementSearch = aoResults.snapshotItem(j++);
				while(oElementSearch.parentNode.className!='post'){
					oElementSearch = oElementSearch.parentNode;
				}
				oElementSearch.style.display = "none";							
			}
			return j;	
	}
	if (asUsersToHide.length && document.documentElement.clientHeight==0){
		window.addEventListener("resize", function(){
			var nCount = hideTalkbacks();
			if (nCount){
				window.removeEventListener('resize', arguments.callee, true);
				updateCounter(nCount);
			}
		},true);
	}
	
	function updateCounter(nCount){
		var aoResults = document.evaluate( "//li[@id='post-count']/h4", window.document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if (aoResults.snapshotLength){
			var oElementSearch = aoResults.snapshotItem(0);
			oElementSearch.innerHTML+=" ("+nCount+" hidden)";
		} 
	}	
})();