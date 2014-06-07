// How to use
//
// 1. Install Firefox
//      Mozilla — Home of the Mozilla Project — mozilla.org - http://www.mozilla.com/en-US/
//
// 2. Install the Wacom Tablet Plugin for Mac OSX
//      Download Tablet Data Plugin - http://www.wacom.com/CustomerCare/Plugin.aspx
//
// 3. Install Greasemonkey add-on on Firefox
//      Greasemonkey :: Add-ons for Firefox - https://addons.mozilla.org/ja/firefox/addon/greasemonkey/
//
// 4. Drag and Drop this script in Firefox.
//
// -----------------------------------------------------------------------------------
//
// ==UserScript==
// @name        pixiv_chat_for_mac
// @namespace   foo9
// @description pixivチャットの筆圧を有効にするスクリプト(for Mac)
// @include     http://chat.pixiv.net/room.php?id=*&type=painter
// ==/UserScript==

(function () {
window.addEventListener('load', function () {

    /*
function writeWacomEmbed() {
    var e = document.createElement('embed');
    e.setAttribute('id', 'wacom-plugin');
    e.setAttribute('name', 'wacom-plugin');
    e.setAttribute('type', 'application/x-wacomtabletplugin');
    e.setAttribute('hidden', 'true');
    document.body.appendChild(e);
}

function getWacomPlugin() {
    return (document.embeds['wacom-plugin']).penAPI;
}

// override pixiv original function
function getTabletData() {
    // Mac
    if (navigator.userAgent.indexOf('Mac') != -1) {
        var pressure = getWacomPlugin().pressure;
        return [1, pressure];
    // pixiv original
    } else {
        if (tablet_fg) {
            datas = document.tablet.getTabletData();
            return [datas[0], datas[1]];
        } else {
            return null;
        }
    }
}

// only Mac
if (navigator.appVersion.indexOf('Mac') != -1) {
    writeWacomEmbed();

    var isWacom = getWacomPlugin().isWacom;
    if (typeof isWacom === 'undefined') {
        alert('Warning: WacomPlugin could not be loaded!');
    } else if (isWacom == 0) {
        alert('Warning: WacomPlugin loaded but could not connect to tablet driver!');
    } else if (isWacom == 1) {
        //tablet_ok();　 // pixiv original function
        document.title += ' ( enable tablet pen pressure )';
        //alert('Tablet connection success');
    }
}
    */
    var dataScheme = 'data:application/x-javascript;base64,' + 'ZnVuY3Rpb24gd3JpdGVXYWNvbUVtYmVkKCkgewogICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdlbWJlZCcpOwogICAgZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dhY29tLXBsdWdpbicpOwogICAgZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnd2Fjb20tcGx1Z2luJyk7CiAgICBlLnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXdhY29tdGFibGV0cGx1Z2luJyk7CiAgICBlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJ3RydWUnKTsKICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSk7Cn0KCmZ1bmN0aW9uIGdldFdhY29tUGx1Z2luKCkgewogICAgcmV0dXJuIChkb2N1bWVudC5lbWJlZHNbJ3dhY29tLXBsdWdpbiddKS5wZW5BUEk7Cn0KCi8vIG92ZXJyaWRlIHBpeGl2IG9yaWdpbmFsIGZ1bmN0aW9uCmZ1bmN0aW9uIGdldFRhYmxldERhdGEoKSB7CiAgICAvLyBNYWMKICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01hYycpICE9IC0xKSB7CiAgICAgICAgdmFyIHByZXNzdXJlID0gZ2V0V2Fjb21QbHVnaW4oKS5wcmVzc3VyZTsKICAgICAgICByZXR1cm4gWzEsIHByZXNzdXJlXTsKICAgIC8vIHBpeGl2IG9yaWdpbmFsCiAgICB9IGVsc2UgewogICAgICAgIGlmICh0YWJsZXRfZmcpIHsKICAgICAgICAgICAgZGF0YXMgPSBkb2N1bWVudC50YWJsZXQuZ2V0VGFibGV0RGF0YSgpOwogICAgICAgICAgICByZXR1cm4gW2RhdGFzWzBdLCBkYXRhc1sxXV07CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgcmV0dXJuIG51bGw7CiAgICAgICAgfQogICAgfQp9CgovLyBvbmx5IE1hYwppZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZignTWFjJykgIT0gLTEpIHsKICAgIHdyaXRlV2Fjb21FbWJlZCgpOwoKICAgIHZhciBpc1dhY29tID0gZ2V0V2Fjb21QbHVnaW4oKS5pc1dhY29tOwogICAgaWYgKHR5cGVvZiBpc1dhY29tID09PSAndW5kZWZpbmVkJykgewogICAgICAgIGFsZXJ0KCdXYXJuaW5nOiBXYWNvbVBsdWdpbiBjb3VsZCBub3QgYmUgbG9hZGVkIScpOwogICAgfSBlbHNlIGlmIChpc1dhY29tID09IDApIHsKICAgICAgICBhbGVydCgnV2FybmluZzogV2Fjb21QbHVnaW4gbG9hZGVkIGJ1dCBjb3VsZCBub3QgY29ubmVjdCB0byB0YWJsZXQgZHJpdmVyIScpOwogICAgfSBlbHNlIGlmIChpc1dhY29tID09IDEpIHsKICAgICAgICAvL3RhYmxldF9vaygpO+OAgCAvLyBwaXhpdiBvcmlnaW5hbCBmdW5jdGlvbgogICAgICAgIGRvY3VtZW50LnRpdGxlICs9ICcgKCBlbmFibGUgdGFibGV0IHBlbiBwcmVzc3VyZSApJzsKICAgICAgICAvL2FsZXJ0KCdUYWJsZXQgY29ubmVjdGlvbiBzdWNjZXNzJyk7CiAgICB9Cn0=';
    var script = document.createElement('script');
    script.src = dataScheme;
    document.body.appendChild(script);

}, false);
})();
