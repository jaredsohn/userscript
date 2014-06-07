// ==UserScript==
// @name       Renovate Project page
// @namespace  http://production.mcb.dk/pages/project.asp
// @version    1.3
// @description  Some experimental features on the Project page
// @match      http://production.mcb.dk/pages/project.asp?projectGuid=*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://userscripts.org/scripts/source/402421.user.js


// @copyright  2014+, Le Hoang Anh
// ==/UserScript==



GM_addStyle("\
    #buttonGroup{display:block;float:left;clear:both;width:100%;height:35px;margin-top:10px}\
    #buttonGroup a:first-child{margin-left:0}\
    .box .form-horizontal .controls{margin-left:82px}\
    .quick-button{line-height:13px;margin-left:9px;font-weight:bold;}\
    .link-button, .short-button{height:15px;line-height:14px;padding:4px 8px;}\
    .short {width:23% !important;}\
    #__tTaskList {position:relative;}\
    #__tControls {position:absolute;top:0;right:0;width:auto;height:auto;}\
    #btnExpandAll {float:right;}\
");



//Parse URLs to actual links in Project description
$('.span8 .form-horizontal .control-group:nth-child(2) .controls.hasText').attr('id','__tDescription');
$('.span8 .form-horizontal .control-group:nth-child(2)').append($('<input/>').attr({
    'id':'__hDescription',
    'name':'__hDescription',
    'type':'hidden',
    'value':$.trim($('#__tDescription').html().replace(/(\<br\>)/ig,'\n'))
}));
$('#__tDescription').urlToLink();

//Add Project Owner's detail
$('.span4 .form-horizontal div.control-group:nth-child(2) .controls.hasText').attr('id','__wPO').addEmployeeDetail();

//Add System Architect's detail
$('.span4 .form-horizontal div.control-group:nth-child(3) .controls.hasText').attr('id','__wSA').addEmployeeDetail();

//Add Consultant's detail
$('#consultant .row-fluid div.span9.left div:nth-child(2)').each(function() {
    $(this).addEmployeeDetail();    
});
    
//Add Find Order mail button
$('.span4 .form-horizontal .control-group:first-child .controls').attr('id','__tOrderNumber');
$('#orderNumber').addClass('short');
$('<a></a>').attr({
    'id':'btn-findmail',
    'class':'btn quick-button short-button',
    'title':'Find order mail'
}).on('click.projects', function(){prepContent(true);}).prepend($('<i></i>').attr('class','icon-search')).appendTo($('#__tOrderNumber'));

//Add Create Order mail button
$('<a></a>').attr({
    'id':'btn-composemail',
    'class':'btn quick-button short-button',
    'title':'Compose order mail'
}).on('click.projects', function(){prepContent(false);}).prepend($('<i></i>').attr('class','icon-pencil')).appendTo($('#__tOrderNumber'));

function prepContent($searchMail){
    var $mailContent = "", $URL = "";
    if(jQuery.type($('select[name*="smallKnown"]').get(0)) != "undefined") {
        $mailContent = "Small known: \n" + window.location.href + '\n\n\n\n' + $('#__hDescription').val();
    }
    else {
        $mailContent = $('#__hDescription').val() + '\n\n\n\n' + window.location.href + "\n\nTime allocation: \nDeadline: ";
    }
    
    if($searchMail) {
        $URL = 'https://mail.google.com/mail/u/1/?ui=2&shva=1#search/' + $('#orderNumber').val();
    }
    else {
        var $title = $('#orderNumber').val() + '; ' + $.trim($('.span8 .form-horizontal .control-group:first-child .controls.hasText').text()).replace(/(\s\-\s)/ig, '; '),
            $POmail = $.trim($('#__wPO').html()) !== "" ? $.trim($('#__wPO div[id^="POemail"] a').text()) : "";
        
        $URL = 'https://mail.google.com/mail/u/1/?ui=2&view=cm&fs=1&tf=1&shva=1&su=' + $title + '&cc=' + $POmail;
    }
    GM_setClipboard($mailContent);
    GM_openInTab($URL, "insert");
}

//Add button group under Project stage selection
var $projectStageSelectName = "project" + $('body').attr('data-entityguid') + "stageGuid";
var $stageSelection = $('select[name="' + $projectStageSelectName + '"]');
if($stageSelection.val() !== "5"){
    $('<div/>').attr('id','buttonGroup').insertAfter($stageSelection);
    
    $('<a/>').attr({
        'id':'btnProduction',
        'class':'btn quick-button link-button'
    }).text('Start').on('click.projects', function(event){
        $stageSelection.val(4);
        $('#btn-save').click();
        event.stopPropagation();
        event.preventDefault();
    }).prepend($('<i></i>').attr('class','icon-random')).appendTo($('#buttonGroup'));
    
    $('<a/>').attr({
        'id':'btnToSales',
        'class':'btn quick-button link-button'
    }).text('To Sales').on('click.projects', function(event){
        $stageSelection.val(10);
        $('#btn-save').click();
        event.stopPropagation();
        event.preventDefault();
    }).prepend($('<i></i>').attr('class','icon-warning-sign')).appendTo($('#buttonGroup'));
}

//Adjust Task table and add Expand/Collapse all rows
$('.span12 .table-current .table-header').attr('id','__tTaskList');
$('<div/>').attr('id','__tControls').appendTo($('#__tTaskList'));

var $expanded = false;
$('<a/>').attr({
    'id':'btnExpandAll',
    'class':'btn quick-button link-button'
}).text('Expand all').on('click.projects', function(event){
    if(!$expanded){
        $('.table-task tr.task-rows.hasActivities').each(function() {
            if($(this).hasClass('open'))
                $(this).find('td.col-name').click();
        });
        $('.table-task td.col-name').click();
        $(this).text('Collapse all').prepend($('<i/>').attr('class','icon-chevron-up'));
        $expanded = true;
    }
    else{
        $('.table-task tr.activity-rows.hasAllocations.open td.col-name').click();
        $('.table-task tr.task-rows.hasActivities.open td.col-name').click();
        $(this).text('Expand all').prepend($('<i/>').attr('class','icon-chevron-down'));
        $expanded = false;
    }
    event.stopPropagation();
    event.preventDefault();
}).prepend($('<i/>').attr('class','icon-chevron-down')).appendTo('#__tControls');
            