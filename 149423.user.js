// ==UserScript==
// @name        AvoidGfwResetGoogle
// @namespace   gmail.czzsunset.agrg
// @description Avoid GFW to reset google results, by force using https google and directly link to result url
// @include     http://www.google.com.hk/*
// @include     http://www.google.com/*
// @include     https://www.google.com.hk/*
// @include     https://www.google.com/*

// @version     1.2
// ==/UserScript==




var forceHttps = function(){

	var location = window.location;
	if( location.protocol == "http:" ){
		window.location.href = location.href.replace(/^(http)/,"https" );
	}

};

var removeAttrMousedown = function(){
	var snapsResults = document.evaluate("//a[@class='l']", 
					document,
					null,					
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null
					);
					
	var matchedCnt = snapsResults ? snapsResults.snapshotLength: 0;
	var replacedCnt = 0;

	for(var i = matchedCnt - 1 ; i  >=0; i--){
		var elm = snapsResults.snapshotItem(i);
		if( elm.getAttribute("onmousedown") ){
			elm.removeAttribute("onmousedown");
			replacedCnt ++ ;
		}			
	}
	if( replacedCnt != 0 ){
		GM_log('Replaced count:'+ replacedCnt);		
	}
	
	return;
};



forceHttps();
removeAttrMousedown();


document.addEventListener('DOMSubtreeModified', removeAttrMousedown, false);





