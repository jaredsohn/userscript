// ==UserScript==
// @name StackExchange hide closed questions
// @namespace http://ostermiller.org/
// @version 1.01
// @description Hide closed questions on the home page and in other lists of questions.   Put a link showing the number of closed questions that have been hidden that shows the closed questions again.
// @match http://*.stackexchange.com/*
// @match http://*.askubuntu.com/*
// @match http://*.superuser.com/*
// @match http://*.serverfault.com/*
// @match http://*.stackoverflow.com/*
// @match http://*.answers.onstartups.com/*
// @grant none
// ==/UserScript==
function closedQuestionVisibility(show){
    var numberOfClosed=0;
    $('.question-summary').each(function(){
        var e = $(this);
        var t = e.find('h3 a').text();
        if (t.match(/\]$/)){
            if(show){
                e.show();
            } else {
                e.hide();
            }
            numberOfClosed++;
        }
    });
    return numberOfClosed;
}

if (/\.com\/(questions)?([\?\#].*)?$/.exec(window.document.location.href)){ // only on pages with questions
    var numberHidden=closedQuestionVisibility(false);
    if (numberHidden > 0){
        $('#mainbar h1').append(" <a href='javascript:;' id='unhideclosedlink'>(" + numberHidden + " hidden closed)</a>");
        $('#unhideclosedlink').click(function(){
            closedQuestionVisibility(true);
            $('#unhideclosedlink').hide();
        });
    }
}