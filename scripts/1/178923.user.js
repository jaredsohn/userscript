// ==UserScript==
// @name       Jenkins Failures
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://ci.ord.transis.net/job/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// you give this raw jenkins table rows and it spits out build objects
function statusIDAndUrl(id, tr) {
    var status = $(tr).find('img').attr('src').split("/").slice(-1);
    var buildUrl = $(tr).find('a.tip').attr('href');
    var buildId = buildUrl.split("/").slice(-2,-1)[0];
   
   	var buildResult = (status == "blue.png");
    
    return {buildId: buildId, buildUrl: buildUrl, buildResult: buildResult}
}

function failedBuilds( id, buildObject ) {
    return buildObject.buildResult === false  
}

function addHostnameToBuildUrl(id, buildObject) {
    buildObject.buildUrl = "http://ci.ord.transis.net" + buildObject.buildUrl;
    return buildObject;
}

function failedTests(test) {
    return (test.status == "REGRESSION") || (test.status == "FAILED");
}

function flattenTestData(tests) {
    var flattened = [];

    $.map(tests.suites, function(suites) {
      $.map(suites.cases, function(testCase) { flattened.push(testCase); });
    });
    
    return flattened;
}

// calls out jenkins api for each build object and saves test failures for that build
function getBuildTestData(id, buildObject){    
	$.ajax({
    	type: 'GET',
    	url: buildObject.buildUrl + "testReport/api/json?pretty=true&tree=suites[cases[name,status]]" ,
    	dataType: 'json',
    	success: function(jsonData) { buildObject.testData = flattenTestData(jsonData).filter(failedTests) },
    	data: {},
    	async: false
	});   
    
    return buildObject;
}

function serializeBuildObject(buildObject) {
    var failures = ""
    $.map(buildObject.testData, function(testFailure){
        failures = failures + "<a href='" + buildObject.buildUrl +"'>"  + buildObject.buildId + "</a> ";
        failures = failures + testFailure.name 
        failures = failures + " <span class='optional-url' style='display:none'>" + buildObject.buildUrl + " </span></br>"
    });
    
    return failures;
}

function addTestResultHelperHTML(buildFailures){
    var helperLink = "<li id='test-result-helper' class='item'><a href='#'>Test Result Helper</a></li>";
    var childSpacer = "<li class='children'></li>";
    var testResultsBackground = "<div id='test-results' style='background-color: white; width:100%;'></div>"
 	
    $('#breadcrumbs').prepend(childSpacer).prepend(helperLink);
    
    $('#test-result-helper').click(function(){
        // only display results, if results are not already displayed
        if($('#test-results').length == 0) {
            $('#main-table').before(testResultsBackground);
            
            $('#test-results').append("toggle urls <input id='enable-urls' type='checkbox'><br/>");
            
            $('#enable-urls').change(function() {
				$('.optional-url').toggle();
            });

            
            $.each(buildFailures, function(index, build){
                $('#test-results').append(serializeBuildObject(build));
            });   
        }
    });
}

var failedBuilds = $('tr.build-row.no-wrap:not(.transitive)').map(statusIDAndUrl).filter(failedBuilds).map(addHostnameToBuildUrl).map(getBuildTestData);

if (failedBuilds.length > 0){
    addTestResultHelperHTML(failedBuilds);
}



