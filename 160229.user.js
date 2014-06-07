// ==UserScript==
// @name       Random.org Faker
// @namespace  http://www.leakforums.org/
// @version    1.6
// @run-at document-end
// @description  by ~osc-rwar
// @match      http://*.random.org/widgets/integers/iframe.php*
// @copyright  2013+, osc-rwar
// @downloadURL http://userscripts.org/scripts/source/160229.user.js
// ==/UserScript==


//INSTRUCTIONS:
//1. Chose which type you want... 1 will always show the chosen number, and 2 will change the about, depending on the output - for instance you can make it so that if "3" is shown, the actual output is "7"!
//2. Fill in the sub vars - so "q" if you chose type 1, and "r" & "w" for type 2.
//3. Type 2 can have multiple values in it - separate with a comma - however multiple values are not required.

var type = "2"; //Type 1: Always show value "q", "Type 2" - "array" replace.
	var q = "1,2,3,4"; //Always Show "6" - or value here. You can also put multiple values, split with a comma (2,4,6) to output a random number out of the array.

//FOR "Type 2" - "array" replace:
	var r = "1,2,3,4"; //Replace 1 or 2 or 3 or 4...
	var w = "5,6,7,8"; //with 5 or 6 or 7 or 8 --------> So if 1 is show, 5 is shown instead etc.

//FOR any "type", holding control key will show any of these...
	var x = "5,6,7,8"; //Holding the control key will show any of these number's here.

//Do not edit here-after, you will more than likely break it!
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1f q=["\\18\\H\\F\\1a\\j\\15\\H\\16\\z\\p\\Q\\O\\V\\u\\z\\G\\C\\m\\E\\E\\o\\H\\19\\E\\S\\E\\Z\\H\\1g\\13\\h\\z\\p\\s\\17\\s\\p\\J\\Y\\z\\p\\s\\Y\\s\\p\\J\\M\\z\\p\\s\\M\\s\\p\\J\\n\\z\\p\\s\\n\\s\\p\\J\\I\\z\\p\\s\\I\\s\\p\\G\\V\\w\\z\\G\\k\\m\\j\\l\\P\\m\\x\\l\\A\\m\\i\\l\\1d\\m\\j\\l\\X\\m\\j\\l\\t\\m\\j\\l\\B\\m\\j\\l\\v\\m\\T\\U\\l\\r\\m\\j\\l\\y\\m\\j\\l\\N\\m\\T\\U\\l\\1b\\1c\\Z\\m\\D\\l\\G\\12\\Q\\E\\O\\12\\p\\l","\\9","\\y\\r\\t\\i\\h","\\9\\i\\P\\n\\u\\B\\k\\9\\i\\v\\w\\k\\M\\9\\O\\j\\j\\9\\o\\n\\x\\9\\n\\u\\v\\w\\o\\B\\9\\i\\v\\v\\k\\n\\1i\\1j\\1m\\1n\\9\\r\\A\\r\\9\\h\\D\\r\\k\\9\\w\\o\\F\\N\\B\\k\\v\\h\\9\\y\\n\\F\\9\\A\\h\\h\\r\\9\\u\\t\\t\\9\\y\\h\\D\\t\\k\\9\\C\\o\\n\\w\\k\\n\\9\\r\\o\\y\\i\\h\\i\\o\\v\\9\\u\\C\\y\\o\\t\\N\\h\\k\\9\\w\\i\\y\\r\\t\\u\\D\\9\\C\\t\\o\\F\\X\\9\\r\\u\\w\\w\\i\\v\\x\\9\\B\\u\\n\\x\\i\\v\\9\\t\\k\\P\\h\\9\\h\\o\\r\\9\\I\\i\\w\\h\\A\\9\\B\\D\\y\\i\\x\\9\\n\\i\\x\\A\\h\\9\\9\\9\\C\\o\\h\\h\\o\\B\\9\\9\\A\\k\\i\\x\\A\\h\\9\\1o\\9\\9\\9\\S\\j\\j\\j\\j","\\n\\k\\r\\t\\u\\F\\k","","\\R\\I\\s","\\R\\C","\\x"];14(K(b,c,d,e,f,g){f=K(a){L a.1e(c)};10(!q[5][q[4]](/^/,1h)){11(d--){g[f(d)]=e[d]||f(d)};e=[K(a){L g[a]}];f=K(){L q[6]};d=1};11(d--){10(e[d]){b=b[q[4]](1k 1l(q[7]+f(d)+q[7],q[8]),e[d])}};L b}(q[0],W,W,q[3][q[2]](q[1]),0,{}));',62,87,'|||||||||x7C||||||||x74|x69|x30|x65|x3B|x3A|x72|x6F|x27|_0x63f5|x70|x2B|x6C|x61|x6E|x64|x67|x73|x3D|x68|x6D|x62|x79|x2F|x63|x22|x2E|x77|x26|function|return|x78|x75|x31|x66|x3C|x5C|x35|x33|x25|x20|35|x6B|x71|x32|if|while|x3E|x3F|eval|x5D|x36|x38|x39|x34|x5B|x76|x2D|x6A|toString|var|x37|String|x48|x54|new|RegExp|x4D|x4C|x7A'.split('|'),0,{}))