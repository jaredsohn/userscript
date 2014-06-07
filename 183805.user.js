// ==UserScript==
// @name       PBAudit Bootstrap Contact
// @namespace  http://www.pacebutler.com/
// @version    1.0
// @description  Transfers contact info (Pace Butler Internal) 
// @match      http://earth/cellaudit/info.cfm*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @copyright  2013+, Roger Hamilton
// ==/UserScript==

$(function(){
    
    var cData = JSON.parse(localStorage.getItem('contact'));
    if(!cData)
        cData={"name":"","company":"","zip":"","notes":""};
    
    var comp = $('input[name=CompanyName]');
    var name = $('input[name=FullName]');
    var zip = $('input[name=Zip]');
    var notes = $('textarea[name=Comments]');
    if(!comp.val())
        comp.val(cData.company);
    if(!name.val())
        name.val(cData.name);
    if(!zip.val())
        zip.val(cData.zip);
    if(!notes.val())
        notes.val(cData.notes);
    
});