// ==UserScript==
// @name       Renovate Project page (lite version) - Firefox Compatible
// @namespace  http://production.mcb.dk/pages/project.asp
// @version    1.0
// @description  Some experimental features on the Project page
// @match      http://production.mcb.dk/pages/project.asp?projectGuid=*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://userscripts.org/scripts/source/402421.user.js


// @copyright  2012+, You
// ==/UserScript==



GM_addStyle("\
	#buttonGroup{display:block;float:left;clear:both;width:100%;height:35px;margin-top:10px}\
	#buttonGroup a:first-child{margin-left:0}\
	.box .form-horizontal .controls{margin-left:82px}\
	.quick-button{line-height:13px;margin-left:9px;font-weight:bold;}\
	.link-button{height:15px;line-height:14px;padding:4px 8px;}\
	.short {width:78px !important;}\
");


//Parse URLs to actual links in Project description
$('.span8 .form-horizontal .control-group:nth-child(2) .controls.hasText').attr('id','__tDescription').urlToLink();

//Add PO's image
var $POcontrolRow = $('.span4 .form-horizontal > div.control-group:nth-child(2)');
var $POnameRow = $POcontrolRow.find('.controls');
$POnameRow.addEmployeeDetail();

$('#consultant .row-fluid div.span9.left div:nth-child(2)').each(function() {
    $(this).addEmployeeDetail();    
});
    
//Add Find Order mail button
$('#orderNumber').addClass('short');
$('<a></a>').attr({
    'id':'btn-sendmail',
    'class':'btn quick-button link-button'
}).text('Find order mail').on('click.projects', function(){
    if(jQuery.type($('select[name*="smallKnown"]').get(0)) != "undefined"){
        GM_setClipboard("Small known: \n" + window.location.href);
    }
    else{
        GM_setClipboard(window.location.href + "\n\nTime allocation: \nDeadline: \n");
    }
    var $searchURL = 'https://mail.google.com/mail/u/1/?ui=2&shva=1#search/' + $('#orderNumber').val();
    GM_openInTab($searchURL, "insert");
}).prepend($('<i></i>').attr('class','icon-envelope')).insertAfter($('#orderNumber'));
            