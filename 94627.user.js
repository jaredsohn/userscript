// ==UserScript==
// @name           Open Failing FitNesse Tests (hope this works)
// @description    Creates a link to open all failing tests and it makes a link to open each individual failing test
// @include        http://*fitnesseResult*.html*
// @include        file://*fitnesseResult*.html*
// @include        http://*FrontPage*?suite*
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		var failedTests = [];
	
		var findFitNesseSuiteUrl = function() {
			return $(".page_title")[0].href;
		}
		
		var findTestResultDivs = function() {
			var divs = new Array();
			// Does NOT work on older FitNesse Page Results?!
//			divs = divs.concat($(".alternating_row_1"));
//			divs = divs.concat($(".alternating_row_2"));			
			var elements = document.getElementsByTagName('div');
			for (var i=0;i<elements.length;i++){
				if (elements[i].className.indexOf('alternating_row') != -1) {
					divs = divs.concat([elements[i]]);	
				}
			}
			return divs;
		}
		
		var getTestResult = function(element) {
			return $(element).find("span").get(0);
	    }
	
		var getTestResultLink = function(element) {
			return $(element).find("a").get(0);
	    }
		
		var isFailingTest = function(element) {
			return !contains(element.innerHTML, ' 0 wrong, 0 ignored, 0 exceptions'); 
		}
		
		var contains = function(text, doesContain) {
			return text != null && text.indexOf(doesContain) != -1;
	    }
	
	 	var createOpenTestLink = function(url) {
		    var openTestAnchor = document.createElement('a');
			openTestAnchor.setAttribute('href', url);
			openTestAnchor.setAttribute('style', 'font-weight:bold; color:red;');
	    	openTestAnchor.innerHTML = "Open";
			return openTestAnchor;
	    }
		
		var findBrokenTests = function(fitNesseServer) {
		    var elements = findTestResultDivs();	
		    for (var i=0;i<elements.length;i++) {
					var testResultElement = getTestResult(elements[i]);
					if (isFailingTest(testResultElement)) {
						var url = fitNesseServer+"."+getTestResultLink(elements[i]).innerHTML;
						failedTests = failedTests.concat([url]);
						$(elements[i])[0].appendChild(createOpenTestLink(url));
					}
		    }
	    }
		
		findBrokenTests(findFitNesseSuiteUrl());
		
		if (failedTests.length > 0) {
			var openTestsAnchor = document.createElement('a');
			openTestsAnchor.setAttribute('href', 'javascript:void(0)');
			openTestsAnchor.setAttribute('id', 'openAllTests');
			openTestsAnchor.setAttribute('class', 'fail');
			openTestsAnchor.setAttribute('style', 'font-weight: bold; color:red; margin-left: 10px;');
	    	openTestsAnchor.innerHTML = "Open All Failed Tests";
	    	openTestsAnchor.addEventListener("click", function(){
		    	for (var i=0;i<failedTests.length;i++) {
					window.open(failedTests[i], '_blank');		
				}
			}, true);
			$('.header')[0].appendChild(openTestsAnchor);
	    }
    }