// ==UserScript==
// @name        jira done exporter
// @namespace   oyanglul.us
// @description for Analytics Deployment Notes Release
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_openInTab
// @include     https://jira.rea-group.com:8443/secure/TaskBoard.jspa*
// @require     http://code.jquery.com/jquery-1.8.3.min.js
// @require     http://fancybox.net/js/fancybox-1.3.4/jquery.fancybox-1.3.4.js
// @resource    css http://fancybox.net/js/fancybox-1.3.4/jquery.fancybox-1.3.4.css
// @version     1
// ==/UserScript==

var css = GM_getResourceText('css');
GM_addStyle(css);
console.log('resource ok')

String.prototype.format = function (){
var args = arguments;
return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (curlyBrack, index) {
return ((curlyBrack == "{{") ? "{" : ((curlyBrack == "}}") ? "}" : args[index]));
});
};

var done_col = $('.gh-step-col').last();
console.log($('#gh-step-head').find('.gh-step-col').last().find('.operations'))
$('#gh-step-head').find('.gh-step-col').last().find('.operations').append('<li><a rel="nofollow" title="Export" class="lnk icon-add" id="export-done-data" href="#done-data"><span>Export</span></a></li>')


var expTab = $('<table class="jiveBorder" height="51" cellspacing="0" cellpadding="3" border="1" style="background-color: #f8f4e6; border: 1px solid #000000; font-size: 12px; font-family: \'Lucida Grande\', Arial, Helvetica, sans-serif; width: 1029px; height: 53px;">')
var tbody = $('<tbody></tbody>')
var thead = $('<tr style="border: 0px; border-collapse: collapse;"><th style="background-color: #6690bc; border: 1px solid #000000;; border: 1px solid #000000;background-color: #6690bc; border: 1px solid #000000;" align="center" valign="middle"><span style="color: #ffffff;">Jira #</span><br></th><th style="background-color: #6690bc; border: 1px solid #000000;; border: 1px solid #000000;background-color: #6690bc; border: 1px solid #000000;" align="center" valign="middle"><span style="color: #ffffff;">SUMMARY</span><br></th><th style="background-color: #6690bc; border: 1px solid #000000;; border: 1px solid #000000;background-color: #6690bc; border: 1px solid #000000;" align="center" valign="middle"><span style="color: #ffffff;">STATUS</span></th><th style="background-color: #6690bc; border: 1px solid #000000;; border: 1px solid #000000;background-color: #6690bc; border: 1px solid #000000;" align="center" valign="middle"><span style="color: #ffffff;">AREA</span></th></tr>')
tbody.append(thead).appendTo(expTab)
var txt = $(done_col).find('.gh-issue-field.gh-issue-field-textarea');
var trHtml = '<tr style="border: 0px; border-collapse: collapse;"><td style="border: 1px solid #000000;; border: 1px solid #000000;border: 1px solid #000000;">{0}</td><td style="border: 1px solid #000000;; border: 1px solid #000000;border: 1px solid #000000;">{1}</td><td style="border: 1px solid #000000;; border: 1px solid #000000;border: 1px solid #000000;">Done</td><td style="border: 1px solid #000000;; border: 1px solid #000000;border: 1px solid #000000;">{2}</td></tr>'

txt.each(function(index,summery){
    var $summery = $(summery)
    var id = $summery.attr('id').match(/SUBS-\d*/)[0]
    var sumTxt = $summery.text().trim();
    
    tbody.append(trHtml.format(id,sumTxt,sumTxt.match(/\[\w*\]/)))
    console.log(sumTxt)
})
$('<div id="done-data"></div>').append(expTab).append('HTML: <textarea>'+expTab[0].outerHTML+'</textarea>').appendTo($('body'))

$("a#export-done-data").fancybox()