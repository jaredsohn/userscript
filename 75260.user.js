/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name           Reddit Keyword Filter
// @namespace      http://userscripts.org/users/raugturi
// @description    Filters submissions based on user-defined keywords in the submission's title.
// @version        1.02
// @author         Chris Johnson (raugturi@gmail.com)
// @include        http://reddit.com/*
// @include        https://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
//
// @require http://userscripts.org/scripts/source/57756.user.js
//
// @history        1.02 Changed. Made case insensitive.
// @history        1.01 Added. Script Updater (http://userscripts.org/scripts/show/57756)
// @history        1.00 Initial release
//
// ==/UserScript==

(function(){
    ScriptUpdater.check(75260, "1.02");
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined')
        window.setTimeout(GM_wait,100);
    else {
        $ = unsafeWindow.jQuery;
        getKeywords();
        applyFilters();
        createOptions();
        GM_registerMenuCommand('Reddit Keyword Filter Configuration', function() { showOptions(); });
    }
}

function getKeywords() {
    keywords_string = GM_getValue('RKF_keywords_string','');
    if (keywords_string != '')
        keywords = keywords_string.split(",");
    else
        keywords = null;
}

function applyFilters() {
    $('#siteTable').children('.thing').css('display','block');

    $.expr[':'].Contains = function(a,i,m){
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };

    for (var i in keywords) {
        $("a:Contains('"+keywords[i].toUpperCase()+"')").closest('.thing').css('display','none');
    }
}

function createOptions() {
    GM_addStyle('#RKFOmask { position:absolute; left:0; top:0; z-index:9000; background-color:#000; opacity: 0.8; display:none; }');
    GM_addStyle('#RKFOwindow { position:absolute; left:0; top:0; width:500px; display:none; z-index:9999; }');

    var optionsDiv = document.createElement('div');
        optionsDiv.setAttribute('class','roundfield');
        optionsDiv.setAttribute('id','RKFOwindow');
        optionsDiv.innerHTML = '<span class="title">Reddit Keyword Filter</span>';
        document.body.appendChild(optionsDiv);

    var innerDiv = document.createElement('div');
        innerDiv.setAttribute('class','roundfield-content');
        innerDiv.setAttribute('style','font-size: small;');
        innerDiv.innerHTML = 'Comma delimited list of keywords to filter.  Any submissions with these words in the title will not be displayed. <i>Example: Pokemon,Ron Paul</i><br /><br /><b>Note</b>: Do not include a space before or after the commas.<br />';
        optionsDiv.appendChild(innerDiv);

    var keywordsInput = document.createElement('textarea');
        keywordsInput.setAttribute('name','keywordsInput');
        keywordsInput.setAttribute('id','keywordsInput');
        keywordsInput.setAttribute('wrap','hard');
        keywordsInput.setAttribute('cols',1);
        keywordsInput.setAttribute('rows',2);
        keywordsInput.setAttribute('spellcheck','false');
        keywordsInput.innerHTML = keywords_string;
        innerDiv.appendChild(keywordsInput);

    var saveButton = document.createElement('input');
        saveButton.setAttribute('type','submit');
        saveButton.setAttribute('value','save');
        saveButton.setAttribute('class','btn');
        saveButton.addEventListener('click', saveOptions, false);
        innerDiv.appendChild(saveButton);

    var cancelButton = document.createElement('input');
        cancelButton.setAttribute('type','button');
        cancelButton.setAttribute('value','cancel');
        cancelButton.setAttribute('class','btn');
        cancelButton.addEventListener('click', closeOptions, false);
        innerDiv.appendChild(cancelButton);

    var maskDiv = document.createElement('div');
        maskDiv.setAttribute('id','RKFOmask');
        document.body.appendChild(maskDiv);
}

function showOptions() {
    var maskH = $(document).height();
    var maskW = $(window).width();

    $('#RKFOmask').css({'width':maskW,'height':maskH});
    $('#RKFOmask').fadeIn('slow');

    var winH = $(window).height();
    var winW = $(window).width();
    var scrollTop = $(window).scrollTop();

    $('#RKFOwindow').css('top',  scrollTop + winH/2-$('#RKFOwindow').height()/2);
    $('#RKFOwindow').css('left', winW/2-$('#RKFOwindow').width()/2);
    $('#RKFOwindow').fadeIn('slow');
}

function saveOptions() {
    keywords_string = $('#keywordsInput').val();
    GM_setValue('RKF_keywords_string',keywords_string);
    getKeywords();
    applyFilters();
    closeOptions();
}

function closeOptions() {
    $('#keywordsInput').val(keywords_string);
    $('#RKFOmask').hide();
    $('#RKFOwindow').hide();
}

