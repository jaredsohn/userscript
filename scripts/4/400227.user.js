// ==UserScript==
// @name       Renovate Project page
// @namespace  http://production.mcb.dk/pages/project.asp
// @version    1.3.5
// @description  Some experimental features on the Project page
// @match      http://production.mcb.dk/pages/project.asp?projectGuid=*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
/* @require  http://userscripts.org/scripts/source/402421.user.js */
// @require  https://gist.githubusercontent.com/xieuxaythit/3af3790105b74c5fca72/raw/ca81c3b9f52a71393a998067c347e142aaac9f4d/MCBProduction.Utilities.js


// @copyright  2014+, Le Hoang Anh
// ==/UserScript==



GM_addStyle("\
	#buttonGroup{display:block;float:left;clear:both;width:100%;height:35px;margin-top:10px}\
	#buttonGroup a:first-child{margin-left:0}\
	.box .form-horizontal .controls{margin-left:82px}\
	.quick-button{line-height:13px;margin-left:9px;font-weight:bold;}\
	.short-button{margin-left:9px;}\
	.link-button, .short-button{height:15px;line-height:14px;padding:4px 8px;}\
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
    'value':$.trim($('#__tDescription').HTMLCleanup().html())
}));
$('#__tDescription').urlToLink({preserveLineBreak:true});

//Add Project Owner's detail
$('.span4 .form-horizontal div.control-group:nth-child(2) .controls.hasText').attr('id','__wPO').addEmployeeDetail();

//Add System Architect's detail
$('.span4 .form-horizontal div.control-group:nth-child(3) .controls.hasText').attr('id','__wSA').addEmployeeDetail();

$('#consultant .row-fluid div.span9.left div:nth-child(2)').each(function() {
    $(this).addEmployeeDetail();    
});
    
//Add Find Order mail button
$('.span4 .form-horizontal .control-group:first-child .controls').attr('id','__tOrderNumber');
$('#orderNumber').addClass('dwarf');
$('<a/>').attr({
    'id':'btn-findmail',
    'class':'btn short-button',
    'title':'Find order mail'
}).on('click.projects', function(){prepContent(true);}).prepend($('<i/>').attr('class','icon-search')).appendTo($('#__tOrderNumber'));

//Add Create Order mail button
$('<a/>').attr({
    'id':'btn-composemail',
    'class':'btn short-button',
    'title':'Compose order mail'
}).on('click.projects', function(){prepContent(false);}).prepend($('<i/>').attr('class','icon-pencil')).appendTo($('#__tOrderNumber'));

function prepContent($searchMail){
    var $mailHeader = "", $mailContent = "", $URL = "", $desc = $.trim($('#__hDescription').val()); 
    if(jQuery.type($('select[name*="smallKnown"]').get(0)) != "undefined") {
        $mailHeader = "Small known: \n" + window.location.href;            
    }
    else {
        $mailHeader = "Project: \n" + window.location.href + "\n\nTime allocation: \nDeadline: ";
    }
    
    $mailContent = $mailHeader;
    if($searchMail) {
        $URL = 'https://mail.google.com/mail/u/1/?ui=2&shva=1#search/' + $('#orderNumber').val();        
    }
    else {
        var $title = $('#orderNumber').val() + '; ' + $.trim($('.span8 .form-horizontal .control-group:first-child .controls.hasText').text()).replace(/(\s\-\s)/ig, '; '),
            $POmail = $.trim($('#__wPO').html()) !== "" ? $.trim($('#__wPO div[id^="POemail"] a').text()) : "";
        
        $mailContent += ($desc !== "" ? '\n\n--------------------------------------------------- Project description ---------------------------------------------------------\n\n' + 
                         $desc + 
                         '\n\n------------------------------------------------------------------------------------------------------------------------------------\n\n': '');
        $URL = 'https://mail.google.com/mail/u/1/?ui=2&view=cm&fs=1&tf=1&shva=1&su=' + encodeURIComponent($title) + ($POmail !== "" ? '&cc=' + $POmail : '') ;
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
    }).prepend($('<i/>').attr('class','icon-play-circle')).appendTo($('#buttonGroup'));
    
    $('<a/>').attr({
        'id':'btnToSales',
        'class':'btn quick-button link-button'
    }).text('To Sales').on('click.projects', function(event){
        $stageSelection.val(10);
        $('#btn-save').click();
        event.stopPropagation();
        event.preventDefault();
    }).prepend($('<i/>').attr('class','icon-warning-sign')).appendTo($('#buttonGroup'));
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




