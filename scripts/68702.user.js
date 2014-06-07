// ==UserScript==
// @name NetFighters2222
// @namespace alpHa
// @namespace alpHa
// @description Netfighter Greasemonkey bot v0.0.1
// @include http://netfighters.org/server.php*
// @include http://netfighters.org/login.php*
// ==/UserScript==

if(( document.body.innerHTML.indexOf("tech 10487")+1)||(document.body.innerHTML.indexOf("start")==0)){
//http://netfighters.org/server.php?send=tech%2010487%20252
location.href ="http://netfighters.org/server.php?send=tech%2010487%20252";

}

/*
if( document.body.innerHTML.indexOf("tech 21028;")+1){
location.href ="http://netfighters.org/server.php?send=tech%2010487%20252";

}
*/

if( document.body.innerHTML.indexOf("ERROR: Not enough time to use this technique")+1){
location.href ="http://netfighters.org/server.php?send=endturn";
}






if( document.body.innerHTML.indexOf("ERROR: There is no fighting now. Click the ")+1){
location.href ="http://netfighters.org/server.php?send=start";
}



setTimeout("location.href=location.href",10000);

