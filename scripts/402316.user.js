(function () {

// ==UserScript==
// @name          Assembla Hello, World!
// @namespace     http://localhost.localdomain
// @icon          http://s3.amazonaws.com/uso_ss/icon/13701/large.jpg
// @description   JavaScript alert box saying Hello, World!
// @version       0.0.4
//
// @include   https://www.assembla.com/spaces/*/time_entries
// ==/UserScript==


var $ = unsafeWindow.jQuery;

$('div#export_details table tbody tr td a').filter( function (index) {return $(this).text() == 'Edit';}).each(function( key, value ){
alert($(this));
});
})();