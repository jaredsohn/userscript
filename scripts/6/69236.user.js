// ==UserScript==
// @name           Netvibes - Native Google Search
// @namespace      toxicwind
// @description    Replaces Netvibes hijack of google search with a native version of the search. Original by: 35niavlys
// @include        http://www.netvibes.com*
// ==/UserScript==

var NetvibesGoogle = document.getElementById('tabSearchForm');
if (NetvibesGoogle)
 {
    NetvibesGoogle.parentNode.removeChild(NetvibesGoogle);
 }


function Google()
 {
    var tabSearchForm = new Element('form',{'id': 'tabSearchForm', 'class': 'autoclear atBottom', 'style': 'display: block; width: 386px;', 'method': 'get', 'action': 'http://www.google.com/search'}).injectBefore($('NV_messageContainer')).setHTML('<fieldset><ul id="engineSelector"><li><label class="google" for="tabSearchInput">Google</label></li></ul><input id="tabSearchInput" class="text search defaultText" type="text" name="q"/></fieldset><input id="tabSearchSubmit" class="nv-button" type="submit" value="Search Google"/></form>');
    var script = new Element('script',{'language': 'javascript'}).injectBefore($('divTabs')).setHTML('document.getElementById("tabSearchInput").focus();');
 };

document.body.appendChild(document.createElement('script')).innerHTML = Google.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2')+'Google();';
