// ==UserScript==
// @name       Renovate Activity page
// @namespace  http://production.mcb.dk/
// @version    1.5
// @description  Make the Activity page more usable
// @match      http://production.mcb.dk/pages/activity.asp?activityGuid=*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require		http://userscripts.org/scripts/source/402421.user.js
// @copyright  2014+, Le Hoang Anh
// ==/UserScript==

GM_addStyle("\
	.quick-button{line-height:15px;margin-left:9px;font-weight:bold;font-size:11px}\
    .link-button{height:18px;line-height:18px;padding:4px 4px;}\
    .box .form-horizontal .controls {margin-left:80px;}\
");

//Lock activity's description
$('.span8 > .form-horizontal').attr('id','__tDetail');
$('#__tDetail .control-group:nth-child(2)').attr('id','__tRowDesc');
var $aDesc = $($('.span8 .form-horizontal .control-group:nth-child(2) .controls')[0]).attr('id','__aDesc').addClass('vanish');
var $tDesc = $('<div/>').attr({'class':'controls hasText edit', 'id':'__tDescription'}).appendTo($('#__tRowDesc'));
var regexp = new RegExp('\n','g');
$tDesc.html($.trim($('#activityDescription').val()).replace(regexp, '<br />')).urlToLink();

//Add Edit button to activity's description
$('<div/>').attr({
    'id':'__tDescControls',
    'class':'rightControl'
}).append($('<a/>').attr({
    'id':'btn_editDesc',
    'class':'btn btn-small',
    'title':'Edit description'
}).on('click.projects', function(event){
    //Edit description
    $('#__aDesc').toggleClass('vanish');
    $('#__tDescription').toggleClass('vanish');
    $('#btn_saveDesc').toggleClass('vanish');
    $(this).toggleClass('vanish');
    event.stopPropagation();
    event.preventDefault();
}).prepend($('<i/>').attr('class','icon-edit'))).append($('<a/>').attr({
    'id':'btn_saveDesc',
    'class':'btn btn-small vanish',
    'title':'Save description'
}).on('click.projects', function(event){
    //Save description
    $('#__aDesc').toggleClass('vanish');
    $('#__tDescription').toggleClass('vanish');
    $('#btn_editDesc').toggleClass('vanish');
    $(this).toggleClass('vanish');
    $('#btn-save').click();
    $tDesc.html($.trim($('#activityDescription').val()).replace(regexp, '<br />')).urlToLink();
    event.stopPropagation();
    event.preventDefault();
}).prepend($('<i/>').attr('class','icon-download-alt'))).appendTo($('#__tRowDesc'));


$('#pageForm .span4').attr('id','taskController');
$($('.span4')[1]).attr('id','taskDetail');
$($('#taskDetail .box')[2]).attr('id','taskInfo');
var $controlGroups = $('#taskController .controls');

if($controlGroups.length > 5){
    var $regTimeRow = $($controlGroups[$controlGroups.length-1]);
    
    //Add Quick save button
    $('<a/>').attr({
        'id':'btn-quicksave',
        'class':'btn btn-small quick-button',
        'title':'Quick save'
    }).text('Save').on('click.projects', function(event){
        $('#btn-save').click();
        event.stopPropagation();
        event.preventDefault();
    }).prepend($('<i/>').attr('class','icon-download-alt')).appendTo($regTimeRow);
    
    //Add Quick finish button
    $('<a/>').attr({
        'id':'btn-quickfinish',
        'class':'btn btn-small quick-button red',
        'title':'Finish task'
    }).text('KABOOM!!!').on('click.projects', function(event){
        $('#stageGuid').val('5');
        $('#btn-save').click();
        event.stopPropagation();
        event.preventDefault();
    }).prepend($('<i/>').attr('class','icon-fire')).appendTo($regTimeRow);
}

//Add Quick Workload button
$('#activityOwner').addClass('short');
$('<a></a>').attr({
    'id':'btn-workload',
    'class':'btn quick-button link-button'
}).text('Workload').on('click.projects', function(){
    if($('#activityOwner').val() != ""){
        var startDate = new Date();
        var endDate = new Date();
        var dayOfMonth = startDate.getDate();
        endDate.setDate(dayOfMonth + 13);
        //console.log(endDate);
        
        var strStartDate = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
        var strEndDate = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
        //console.log(strEndDate);
        GM_openInTab("http://production.mcb.dk/pages/workload.asp?userGuid=" + $('#activityOwner').val() + "&departmentGuid=&resourceTypeGuid=&startDate=" + strStartDate + "&endDate=" + strEndDate + "&showprojects=1&showUnits=1", "insert");
        //$(this).attr('href','http://production.mcb.dk/pages/workload.asp?userGuid=' + $('#activityOwner').val() + '&departmentGuid=&resourceTypeGuid=&startDate=' + strStartDate + '&endDate=' + strEndDate + '&showprojects=1&showUnits=1');
    }
}).prepend($('<i></i>').attr('class','icon-tasks')).insertAfter($('#activityOwner'));

//Allocation panel
$('#allocation .content').attr('id','allocationWrapper');
$('#allocation .table-allocation').attr('id','allocationTable');
$('#allocation .table-allocation tr td:first-child').addClass('userData').each(function(){
    $(this).addEmployeeDetail();
});

//Project detail panel
$('#consultant .form-horizontal.condenseControlGroup .control-group:last-child .controls.hasText').addEmployeeDetail();

//Consultant list
$('#consultant .span9.left div:nth-child(2)').addClass('userData').each(function(){
    $(this).addEmployeeDetail();
});

//Task info panel
$('#taskInfo .control-group:nth-child(3) .controls.hasText').attr('id','__tTaskOwner').addEmployeeDetail();
