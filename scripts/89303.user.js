// ==UserScript==
// @name           Jordanian Electors Collector
// @author         Hudhaifa Shatnawi
// @namespace	   JE
// @description    This script will collect jordanian ellectors names
// @include        http://193.188.65.239/indexv.php
// @email          hudhaifa.shatnawi@gmail.com
// @version        1.0
// ==/UserScript==

var SCRIPT = {
    url : 'http://userscripts.org/scripts/source/89303.user.js',
    version : '1.0' //same value as @version
};


/**
 * Comment
 */
function main() {
//    window.alert("City: " + document.form.city.value);
    var depts =document.getElementsByTagName('city');
    window.alert("Depts: " + depts.options.length);
//    window.alert("Depts: ");
    document.form.submit();

}

// let's get rollin'
if (document.body) {
    main();
}