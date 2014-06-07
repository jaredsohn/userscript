// ==UserScript==
// @name       Git Reference Labels
// @namespace  http://gist.github.com/3369304
// @version    0.2.1
// @description  Shows labels next to issue references in the comments of git issues
// @include https://github.com/*/*/issues/*
// @copyright  2012+, Robert McLeod
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// Adds labels to the page
function add_labels( issue_comment, issues ) {
    //console.log( issues );
    issue_html = "";
    $.each(issues, function(index, issue) {
        i = issue;
        console.log( i.name );
        issue_html += "<span class=\"label labelstyle-"+i.color+"\" data-name=\""+i.name+"\" style=\"margin: 0px 3px; border-radius: 5px; font-weight: bold; padding: 3px;\">"+i.name+"</span></li>";
    });
    
    issue_comment.find(".content-body h2").append(issue_html);
}

// Gets the labels from the github API and adds them to the page
function get_and_add_labels( url, issue_comment ) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload:  function(r) {
            issues = $.parseJSON( r.responseText );
            add_labels( issue_comment, issues);
        }
    });
}

// Run through each issue reference
$("div.issue-ref-comment").each(function() {
   
    issue_comment = $(this);

    // Get the issue number
    issue_text = issue_comment.find("h2 a em").text(); 
    m = issue_text.match(/\d+/);
    issue_number = m[0];
    //console.log("getting labels for issue "+issue_number);
 
    // Build the url to the github API
    url = location.href;
    m = url.match(/github\.com\/(.*\/.*)\/issues/);
    repo_string = m[1];
    issue_labels_url = "https://api.github.com/repos/"+repo_string+"/issues/"+issue_number+"/labels";
   
    // get an add all the labels
    get_and_add_labels( issue_labels_url, issue_comment );    
});