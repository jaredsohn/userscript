// ==UserScript==
// @name         oDesk rates
// @version      0.1
// @description  Show hourly rates next to contractors
// @match        http://*.odesk.com/*
// @match        https://*.odesk.com/*
// @copyright    2013, Robin Hoode
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
	// Helper function.
    var contractorUrl = function(href) {
        var id = href.split('_')[1];
        return "/users/epitome/key/" + id + "/portrait/true/useV3/true";
    };
  
    // Add Hourly Rate to table header.
    $("#applicantHolder .oTable thead tr").append("<th>Hourly Rate</th>");    

    // Update row with hourly rate.
    $("#applicantHolder tbody tr td:first-child").each(function(i, elem) {
        if ($(elem).find(".jsEpitome").length > 0) {
            var url = contractorUrl($(elem).find(".jsEpitome")[0]['href']);
            $.get(url, function(data) {
                var rate = $(data).find("strong").html();
                $(elem).parent().append("<td>" + rate + "</td>");
            });
        } else {
            $(elem).parent().append("<td>&nbsp;</td>");
        }
    });
    
    // Open up the applicant list.
    setTimeout(function() {    
        $("#applicantList").click();  
    }, 500);
    
    // Click 'more' until we have shown all applicants.
    var tryMoreAgain = function() {
        setTimeout(function() {
            if ($("button.oMore").length > 0) {        
                $("button.oMore").click();
                tryMoreAgain();
            }
        }, 500);
    };
    
    tryMoreAgain();
});
