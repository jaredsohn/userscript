// ==UserScript==
// @name           Fail
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// ==/UserScript==

window.setTimeout( function() 
{

var ignoreList = new Array('JVE');
var optionSelected = 2; 
var avatarLink = 'http://goallineblitz.com/game/user_pic.pl?user_id=54951'
var postReplace = 'MORE LIKE MARCUS TINYPANIS';
+
+function getElementsByClassName(classname, par)
+{
    var a=[];
    var re = new RegExp('\\b' + classname + '\\b');
+
    var els = par.getElementsByTagName("*");
- for(var i=0,j=els.length; i<j; i++){
- if(re.test(els[i].className)){
+
+ for(var i=0,j=els.length; i<j; i++)
+ {
+ if(re.test(els[i].className))
+ {
          a.push(els[i]);
       }
    }

