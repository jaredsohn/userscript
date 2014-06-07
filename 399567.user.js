// ==UserScript==
// @name       WebCATT - Russell Tucker
// @namespace  https://webcatt.motionpoint.net/portal/
// @version    0.1
// @description  WebCATT - Russell Tucker
// @match      https://*.motionpoint.net/*
// @copyright  2012+, You
// @require    http://code.jquery.com/jquery.min.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Style
addGlobalStyle('#logText { height: 500px; }');
addGlobalStyle('#propertiestext, [name="propertiesText"] { font-family: "Courier New", monospace; height: 553px; resize: none; width: 100%; }');
addGlobalStyle('#props_editor, #wrapper, form fieldset { border: 0; margin: 0; padding: 0; width: auto !important; }');
addGlobalStyle('form[name="logs"] { width: auto !important; }');
addGlobalStyle('#resultstable { height: 270px !important; overflow-x: auto !important; }');
addGlobalStyle('#wrapper > fieldset > table, #resultsTable .results, #wrapper div[style*="width"] { width: 100% !important; }');
addGlobalStyle('body > form[name="file_translations_list"] > fieldset > table div[style*="width:1150px;"] { height: 400px !important; }');
addGlobalStyle('body > form[name="searchForm"] > fieldset > .show { margin: -8px 0; }');
addGlobalStyle('body > span[onmouseover][onmouseout], body > form.invisible { display: none; }');
addGlobalStyle('form legend { background: none; border: 0; padding-top: 10px; }');
addGlobalStyle('td.xxsm > span { display: block; height: 10px; }');

//jQuery Style
jQuery('table#results').parent('div[style*=height]').css('height', '250px');

//Project Code: All
jQuery('select[name=projectCodeValue]').val($('select[name=projectCodeValue] option:first').val());

//Reload Properties: checked
jQuery('input#Reload').prop('checked', true);

//Commit Button: clicked
jQuery('a#commit').click();

//First focus on change type dropdown
jQuery('select#cd_changeType').focus();


//Clear cache of all from one project
jQuery('input[type=checkbox][name=translationServer]').change(function(){
    var checked = $(this).prop('checked');
    var text = normalizeProject($(this).context.nextSibling.textContent.trim().replace(/(.*?)\d*_.*/g, '$1'));
    var checkboxes = $('input[type=checkbox][name=translationServer]');
    for(var i = 0; i < checkboxes.length; i++){
        var currentText = normalizeProject($(checkboxes[i]).context.nextSibling.textContent.trim().replace(/(.*?)\d*_.*/g, '$1'));
        if(currentText === text){
            $(checkboxes[i]).prop('checked', checked);
        }
    }
});

function normalizeProject(str){
    str = str.replace('vzw', 'verizonwireless');
    str = str.replace('verizonstage', 'verizon');
    str = str.replace('East TServer2', 'East TServer1');
    str = str.replace('West TServer3', 'East TServer1');
    str = str.replace('West TServer4', 'East TServer1');
    return str;
}
