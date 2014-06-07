// ==UserScript==
// @name           Hide Passing FitNesse Tests Content
// @description    Creates a link to hide all passing tests content
// @version        2.0
// @include        http://*fitnesseResult*.html*
// @include        file://*fitnesseResult*.html*
// @include        http://*?suite*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

		var passingTestElements = [];
		
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

		
		var findPassingTestsElements = function() {
		    var elements = findTestResultDivs();
		    for (var i=0;i<elements.length;i++) {
				var testResultElement = getTestResult(elements[i]);
				if (!isFailingTest(testResultElement)) {
					passingTestElements = passingTestElements.concat([elements[i]]);						
					findTestResultOutput(getTestResultLink(elements[i]).href);					
				}
		    }
	    }
	
		var findTestResultOutput = function(testResultLink) {
			// test result link
			var testOutputLink = document.getElementById(testResultLink.split('#')[1]);
			passingTestElements = passingTestElements.concat([testOutputLink.parentNode]);
			
			// test result output
			var children = $(testOutputLink.parentNode.parentNode).children();
			for (var i=0;i<children.length;i++) {
				if (children[i] == testOutputLink.parentNode) {
					passingTestElements = passingTestElements.concat([children[i+1]]);					
					break;
				}
			}
		}
		
		var hidePassingTestContent = document.createElement('a');
		hidePassingTestContent.setAttribute('href', 'javascript:void(0)');
		hidePassingTestContent.setAttribute('style', 'font-weight: bold; color:green; margin-left: 10px;');
	    hidePassingTestContent.innerHTML = "Hide/Show All Passing Tests";
	    hidePassingTestContent.addEventListener("click", function(){
		    	for (var i=0;i<passingTestElements.length;i++) {
					if ($(passingTestElements[i]).css('display') == 'none') {
						$(passingTestElements[i]).css('display', 'block');
					} else {
						$(passingTestElements[i]).css('display', 'none');						
					}
				}
		}, true);
		$('.header')[0].appendChild(hidePassingTestContent);
	    
		findPassingTestsElements();