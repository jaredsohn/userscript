// ==UserScript==
// @name           MyCompanies change
// @namespace      eRepublik.com
// @include        *.erepublik.com/*/economy/myCompanies*
// @version        0.10
// @description    fix after Plato changes
// ==/UserScript==

function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $j = unsafeWindow.jQuery; start(); }

}
GM_wait();

function start() {
    var links = '<a href="#" id="selectAll">select/deselect all</a><br />' +
                '<a href="#" id="selectAvailable">select available</a><br />' +
                '<a href="#" id="switch">switch</a>';
     var html = '<div><p><a href="#" id="sort" style="font-weight: bold">reverse</a> || <a href="#" id="showID" style="font-weight: bold">show company IDs</a></p></div>';
    //$j(".area_controls strong").remove();
    $j(".area_controls div").css("height","30px");
    $j(".area_controls div").after(html);
    $j(".heading .c3 strong").append("<br />" + links);
    $j(".heading:last").height(80);
    $j("#selectAll").on('click',activeWorkClick);
    $j("#selectAvailable").on('click',ownerWorkAvailableHealthOnly);
    $j("#switch").on('click',ownerWorkClick);
    $j("#sort").on('click',reverseCompanies);
    $j("#showID").on('click',showID);
    $j(".all_companies_menu").hide();
    getHighestJobOffer();
}

function getAvailableHits() {
    var availableHealth = $j(".tooltip_health_limit").text().split('/')[0].trim();
    var currentHealth = $j("#current_health").text();
    return Math.floor((parseInt(availableHealth,10)/10+parseInt(currentHealth,10)/10),10);
}
function ownerWorkAvailableHealthOnly() {
    var hits = getAvailableHits();
    var counter = 1;
        $j(".owner_work").each(
            function(index) {
                if(counter > hits) return false;
                if($j(this).attr('title') != "Already worked today") {
                    if(!$j(this).hasClass('active')) { $j(this).click(); }
                    counter = counter + 1;
                }        
                if(counter > hits) return false;
            }
        );
}
function ownerWorkClick() {   $j(".owner_work").click();} //switch
function activeWorkClick() {   
    if($j(".active").length > 1)  { $j(".active").click();}
    else { ownerWorkClick(); }
}
function log(text) {
    unsafeWindow.console.log(text);
}
function reverseCompanies() {
    divs = $j(".list_group");
    divs.children().each(function(i,div){divs.prepend(div)});
}
function showID() {
    $j('[id^="company"]').each(function() {
    $j(this).css("height","75px")
    $j(this).find(".area_pic").append("<p>"+$j(this).attr("id").split("_")[1]+"</p>");
});
}
function getHighestJobOffer() {
    $j.get(
    $j($j('#menu4 li')[1]).children('a:first').attr('href'),
    function(data){
    salary1 = $j(data).find('.jm_salary strong:first').text();    
    salary2 = $j(data).find('.jm_salary sup:first').text();
    salary = salary1 + salary2;
    $j('.work_holder').css('height','70px').append('<div id="market_salary"><strong>current job market max salary: '+salary+ '</strong></div>');
    $j('#market_salary').css('float','left');
    $j('#market_salary').css('padding','10px 0 0 0px');
});

}