// ==UserScript==
// @name PlanBox Arnold
// @match http://www.planbox.com/*
// @match https://www.planbox.com/*
// ==/UserScript==

alert("loading");

$('#account_message').appendTo('body').css({'fontSize': '10px'});

window.addEventListener('load', function () 
{
    alert("after pages load");
    $('#account_message').appendTo('body').css({'fontSize': '10px'});
});

contentEval( function() { 
    alert("This function is running in the page scope.");
    $('#account_message').appendTo('body').css({'fontSize': '10px'});
    $(function(){
        alert("end");
        $('#account_message').appendTo('body').css({'fontSize': '10px'});
    });
} );