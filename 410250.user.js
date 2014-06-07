// ==UserScript==
// @name       Renovate Support case page
// @namespace  http://production.mcb.dk/pages/support.asp
// @version    1.5
// @description  Adding URL to Link parser and more...
// @match      http://production.mcb.dk/pages/support.asp?id=*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://userscripts.org/scripts/source/402421.user.js
// @copyright  2014+, Le Hoang Anh
// ==/UserScript==

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", "http://userscripts.org/scripts/source/429924.user.js");
document.getElementsByTagName("body")[0].appendChild(script);

GM_addStyle("\
	.quick-button{line-height:15px;margin-left:9px;font-weight:bold;font-size:11px}\
    .link-button{height:18px;line-height:18px;padding:4px 4px;}\
");

//Lock activity's description
$('.span8 > .form-horizontal').attr('id','__tDetail');
$('#__tDetail .control-group:nth-child(2)').attr('id','__tRowDesc');
var $aDesc = $($('.span8 .form-horizontal .control-group:nth-child(2) .controls')[0]).attr('id','__aDesc').addClass('vanish');
var $tDesc = $('<div/>').attr({'class':'controls hasText edit', 'id':'__tDescription'}).appendTo($('#__tRowDesc'));
var regexp = new RegExp('\n','g');
$tDesc.html($.trim($('#projectDescription').val()).replace(regexp, '<br />')).urlToLink();

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
    $tDesc.html($.trim($('#projectDescription').val()).replace(regexp, '<br />')).urlToLink();
    event.stopPropagation();
    event.preventDefault();
}).prepend($('<i/>').attr('class','icon-download-alt'))).appendTo($('#__tRowDesc'));

$('.span4 .form-horizontal .control-group:first-child .controls.hasText .cursor-help').addEmployeeDetail({'initial':true});