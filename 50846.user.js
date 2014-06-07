// ==UserScript==
// @name           Open Failing FitNesse Tests
// @description    Creates a link to open all failing tests and it makes a link to open each individual failing test
// @version        2.0
// @include        http://*fitnesseResult*.html*
// @include        file://*fitnesseResult*.html*
// @include        http://*?suite*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

		var failedTests = [];
	
		var findFitNesseSuiteUrl = function() {
			return $(".page_title")[0].href;
		}
		
		var findTestResultDivs = function() {
			var divs = new Array();	
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
                        var hasFailedAssertions = !contains(element.innerHTML, ' 0 wrong');
                        var hasExceptions = !contains(element.innerHTML, ' 0 exceptions');
			return hasFailedAssertions || hasExceptions; 
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