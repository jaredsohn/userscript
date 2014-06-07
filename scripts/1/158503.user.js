// ==UserScript==
// @name        GooglePlayPermission
// @description List app permissions in Google Play search result page.
// @namespace   http://userscripts.org/users/lorentz
// @include     https://play.google.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.js
// @version     2.0
// @grant       none
// ==/UserScript==

/**
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/** 
 * Greasemonkey doesn't recognize when a js manipulate the page history, so I make a manual check
 * https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Manipulating_the_browser_history
 */
var isValidUrl = function (url) {
    if( url.indexOf("https://play.google.com/store/search?") != -1 ) return true;
    if( url.indexOf("https://play.google.com/store/apps") != -1 ) return true;
    return false;
}

var parseAndAddBlock = function (detailsBlock, detailsNum, permissionBox, colour) {
    if (detailsBlock[detailsNum]) {
        var ul = $('<ul/>');
        ul.css("border-left","2px solid "+colour);
        ul.appendTo(permissionBox);
        for(var pn in detailsBlock[detailsNum]) {
            if(!detailsBlock[detailsNum][pn][1])continue;
            var db = detailsBlock[detailsNum][pn][1];
            for(var propertyName in db) {
                var div = $('<li/>').text(db[propertyName][0]).appendTo(ul);
            }
        }
    } 
}

var loadPermission = function (permissionBox, appID) {
    $.ajax({
      type: 'POST',
      url: 'https://play.google.com/store/xhr/getdoc',
      data: { ids: appID, token: "8I01QbS1wpKhaLiqBAh1zX1elcU:1378197401604" },
      dataType: 'text',
      success: function (data) {
            var details;
            data = data.replace(")]}'","details = ");
            eval(data);
            details = details[0][2][0][37][42656262][1];
            permissionBox.removeClass('loading');
            parseAndAddBlock(details, 0, permissionBox, "red");
            parseAndAddBlock(details, 1, permissionBox, "yellow");
            parseAndAddBlock(details, 2, permissionBox, "green"); // future use?
      }
    });
}

var lookForPermission = function(){   
    if(!isValidUrl(window.location.href)) {
        return;
    }
    $('.card:not(:has(.permission))').each( function (index) { 
        var card = $(this);
        var href = $(this).find('.card-click-target').attr('href');
        var id = href.substring( href.indexOf('=') + 1 );
        card.append('<div class="permissionBox card-content"><div class="permission loading"></div></div>');
        loadPermission(card.find('.permission'), id);
    });
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    lookForPermission();
  });    
});
var config = { attributes: false, childList: true, characterData: false };
observer.observe(document.getElementsByClassName('card-list')[0], config);
observer.observe(document.getElementById('body-content'), config);

lookForPermission();


var loading = 'data:image/gif;base64,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'+
'Cwg1RAAAOwAAAAAAAAAAAA==';


var i=0;
var css = [];
css[i++] = '<style type="text/css">';

css[i++] = "div.card.apps.square-cover";
css[i++] = "     { width: 320px; height: 245px; }";
css[i++] = "div.card.apps.square-cover > div.card-content.track-click.track-impression";
css[i++] = "     { float: left;  width: 50%; }";
css[i++] = ".permission {";
css[i++] = "       width: 171px; height: 100%; ";
css[i++] = "       overflow: auto;";
css[i++] = "       transition: all .5s ease 0s;";
css[i++] = " }";
css[i++] = ".permission:hover { width: 160px; }";
css[i++] = ".permissionBox {";
css[i++] = "     background-color: #FFFFFF;";
css[i++] = "     float: right;";
css[i++] = "     height: 100%;";
css[i++] = "     width: 50%;";
css[i++] = "     word-wrap: break-word;";
css[i++] = "       overflow: hidden;";
css[i++] = " }";
css[i++] = ".permission ul { padding-left: 10px; width: 130px; }";
css[i++] = ".permissionBox:after {";
css[i++] = "    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%) repeat scroll 0 0 transparent;";
css[i++] = "    bottom: 0;";
css[i++] = "    content: ' ';";
css[i++] = "    height: 15px;";
css[i++] = "    position: absolute;";
css[i++] = "    width: 155px;";
css[i++] = "    transition: all .5s ease 0s;";
css[i++] = "}";
css[i++] = ".permissionBox:hover:after { height: 0; width: 144px;}";
css[i++] = ".loading { background: #fff url("+loading+") no-repeat scroll center center}";
css[i++] = '</style>';
$('head').append(css.join('\n'));
