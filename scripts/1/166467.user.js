// ==UserScript==
// @name       Echo fixer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  This script is for fixing echo by New Tech Network. It removes the group and events blocks on the home screen, replaces the NTN Highlights box with a list of notifications, checks for new notifications every 10 seconds, alerts you to notifications automatically, checks echo for your current grading period's overall average and shows it in the tool bar at the top of the screen. This script will remember past notifications so that it won't show a notification more than once. It also changes the title in the tab to reflect the number of new notifications that you have. Enjoy! If you have any suggestions, drop me a line and I'll add to the script.

// @match      https://echo.newtechnetwork.org/*
// @include    https://echo.newtechnetwork.org/.*
// @copyright  2013+, ??? ???? ???

// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant      none
// ==/UserScript==

var refreshRate = 1000 * /* This is the number of seconds between notification checks --> */ 10 //seconds


$(function(){

//Get rid of clubs and events
$("#GroupsAndEvents").remove();
$("div#main > table > tbody > tr:eq(0)").remove();
//Get rid of useless google docs view
$("div.mailNameHome").remove();

//Replaces the NTN Highlights box with your notifications
//-----------------BEGIN REPLACEMENT------------------//
//Replace the featured column with notifications
$('div.Feature').children().remove();
$('div.Feature').html("<b>Loading...</b>");

$.ajax({
    url: 'https://echo.newtechnetwork.org/?q=ntlp/activity/limited-notifications',
    type:'text',
    success: function(data){

    $('div.Feature').html(data);
}
});
$('div.Feature').css('width', '208px').css('height', '208px').css('overflow', 'scroll');
$('h2:contains("NTN Highlights")').text("Notifications");

$("table.GroupsData").css("overflow", "hidden");

//------------------END REPLACEMENT--------------------//

//This fixes a problem that is caused by the push down notifications
//------------------BEGIN BACKGROUND FIX---------------//
$('body').removeClass("bg").css("background-color", "#C7E1F2");

$('body > table').css("background-image", "url(https://echo.newtechnetwork.org/themes/Boldr/Images/BackgroundImage.jpg)").css("background-repeat", "repeat-x");

//------------------END BACKGROUND FIX-----------------//

//This is the section that looks for new notifications and checks to see if you've seen them
//------------------BEGIN AUTO UPDATE NOTIFICATIONS----//
var notifs = "";
function update(){
$.ajax({
    url: 'https://echo.newtechnetwork.org/?q=ntlp/activity/limited-notifications',

    type:'text',
    success: function(data){
            if (localStorage.getItem("echoNotifs") != $(data).children().children().eq(0).html()){
                //notify(pullNotification(data));

                notifs = $(data).children().children().eq(0).html();
                localStorage.setItem("echoNotifs", notifs);
                //alert(notifs);
                notify(notifs);
            }

}
});
    setTimeout(update, 10000);
}

var echoTitle = $("title").text();

function notify(){
    $("body").prepend("<div class='tada' style='display:none;width:100%;height:auto;background-color:#333;color:white!important;border-top:2px solid #28f'>" + notifs + "<div style='clear:both' /></div>");

    $("body > div img").removeAttr("align");
    $("div.tada").eq(0).slideDown(400).click(function(){
        $(this).slideUp(400, function(){
            this.remove()
            $("title").text("(" + $(".tada").length + ") " + echoTitle);

        });
        
    });
    $("title").text("(" + $(".tada").length + ") " + echoTitle);
    $("div.tada").eq(0).css("padding", "10px");

}

$("body").prepend("<style type='text/css'>.tada a{color:#28f}</style>");

update();

//-------------------END AUTO UPDATE NOTIFICATIONS------//

//This section downloads the grades page, averages all of your grades in the current grading period, and displays them in the toolbar
//-------------------BEGIN AUTO SHOW AVERAGE------------//


$("div#UserLogin tr").prepend("<td id='average' style='font-size:20px;font-weight:bold'>--%</td>");
var average=0;
var total = 0;
var i=0;
$.ajax({
    url: 'https://echo.newtechnetwork.org/?q=ntlp/grades/student_snapshot/',

    type:'html',
    type: 'GET',
    success: function(data){
        data = $(data);
        //alert($("td.active", $(data)).html());
        $("td.active",data).each(function(index, value){

            if($(value).text()=="" || $(value).text().indexOf("*")!=-1)
                return;
            var number = $(value).text().split("(")[1].split("%")[0];
            number = parseInt(number);

            if (number!="" && number!=NaN){
                total+=number;
                i++;
            }
        });
        average = total/i;
        if (i==0)
            $("#average").text("__%");

        else
            $("#average").text(average+"%");
            
        if (average < 90)
            $("#average").css("color", "#f22");
        else if (average < 95)

            $("#average").css("color", "yellow");
        else
            $("#average").css("color", "white");
    }
});

//-------------------END AUTO SHOW AVERAGE--------------//


});