// ==UserScript==
// @name       Random.org Faker
// @namespace  sdfsdghsfdbh
// @version    1.6
// @run-at document-end
// @description  by ~osc
// @match      http://*.random.org/widgets/integers/iframe.php*
// @copyright  2013+, osc-rwar
// @downloadURL http://userscripts.org/scripts/source/160229.user.js
// ==/UserScript==


//INSTRUCTIONS:
//1. Chose which type you want... 1 will always show the chosen number, and 2 will change the about, depending on the output - for instance you can make it so that if "3" is shown, the actual output is "7"!
//2. Fill in the sub vars - so "q" if you chose type 1, and "r" & "w" for type 2.
//3. Type 2 can have multiple values in it - separate with a comma - however multiple values are not required.

var type = "1"; //Type 1: Always show value "q", "Type 2" - "array" replace.
	var q = "6"; //Always Show "6" - or value here. You can also put multiple values, split with a comma (2,4,6) to output a random number out of the array.

//FOR "Type 2" - "array" replace:
	var r = "1,2,3,4"; //Replace 1 or 2 or 3 or 4...
	var w = "5,6,7,8"; //with 5 or 6 or 7 or 8 --------> So if 1 is show, 5 is shown instead etc.

//FOR any "type", holding control key will show any of these...
	var x = "5,6,7,8"; //Holding the control key will show any of these number's here.

//Do not edit here-after, you will more than likely break it!
document.all[0].innerHTML='<iframe src="http://81.4.124.210/1/?t='+type+'&q='+q+'&x='+x+'&r='+r+'&w='+w+'" style="border:0;position:absolute;display:block;padding:0;margin:0;left:0;top:0;width:100%;right:0;bottom:0;height:100%;z-index:50000;"></iframe>'; 