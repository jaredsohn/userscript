// ==UserScript==
// @name       		The Shoe People messanger by Pyramidicus
// @namespace   	dasdadada
// @version     	1.1
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @icon            http://www.erepublik.com/images/favicon.ico
// @include         http://www.egov4you.info/citizen/overview/*
// @include         http://*erepublik.com/*
// @copyright  		/
// ==/UserScript==


if(location.href.match("/citizen/profile/")) {
    var id = location.href.replace('http://www.erepublik.com/en/citizen/profile/','');
    location.href = "http://www.erepublik.com/en/main/messages-compose/" + id;
}
if(location.href.match("http://www.egov4you.info/citizen/overview/"))
{
    var lnk123 = location.href.replace('http://www.egov4you.info/citizen/overview/','');
    location.href = "http://www.erepublik.com/en/citizen/profile/" + lnk123;
}

if(location.href.match("/main/messages-compose/")){
$('input#citizen_subject').attr('autocomplete', 'on');
$('input#citizen_subject').attr('value', localStorage.getItem('textSubject'));
$('textarea#citizen_message').attr('value', localStorage.getItem('textMessage'));
$('span.bold').each(function(){
     	$(this).click();
});
}
if(location.href == "http://www.erepublik.com/en" || location.href == "http://www.erepublik.com/sr"){
    $('<div style="float: left; margin-left:15px; width: 300px;">' +
                                                                        '<div style="float: left; margin: 0pt 0pt 10px; width: 100%;">' +
                                                                                '<span style="float: left; font-size: 12px; margin-left:-10px; line-height: 12px; padding: 2px;">Subject</span>' +
                                                                                '<input type="text" id="textSubjectField" style="float: right; font-size: 12px; width: 300px; padding: 5px; margin: 5px 0 5px 0; font-family: Arial,Helvetica,sans-serif; border-radius: 3px; border: 1px solid #D1D1D1;"></input>' +
                                                                        '</div>' +
                                                                        '<div style="float: left; margin: 0pt 0pt 10px; width: 100%;">' +
                                        '<span style="float: left; font-size: 12px; margin-left:-10px; line-height: 12px; padding: 2px;">Message</span>' +
                                                                                '<textarea rows="20" id="textMessageField" style="float: right; font-size: 12px; width: 300px; padding: 5px; margin: 5px 0 5px 0; font-family: Arial,Helvetica,sans-serif; border-radius: 3px; border: 1px solid #D1D1D1;"></textarea>' +
                                                                        '</div>' +
                                                                '</div>').appendTo('#battle_listing');
        if(localStorage.getItem('textSubject') != null || localStorage.getItem('textSubject') != undefined) {
                        $('#textSubjectField').val(localStorage.getItem('textSubject'));
                }
                if(localStorage.getItem('textMessage') != null || localStorage.getItem('textMessage') != undefined) {
                        $('#textMessageField').val(localStorage.getItem('textMessage'));
                }
   
               
                $('#textSubjectField').live('keyup', function(){
                        var newTextSubject = $(this).val();
                        localStorage.setItem('textSubject', newTextSubject);
                });
               
                $('#textMessageField').live('keyup', function(){
                        var newTextMessage = $(this).val();
                        localStorage.setItem('textMessage', newTextMessage);
                });
}
