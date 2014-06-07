// ==UserScript==
// @name           Chat Embed	
// @copyright      2013, Thecjm55
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.9.13
// @include        http://*pigskinempire.com/home.aspx
// @description    Embeds a mini chat into the homepage, revised code to prevent other users logging as one another. 
// ==/UserScript==
 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
 script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {
    var attach = document.getElementById('ctl00_CPH1_WaiveBox');   
    var chat_div = document.createElement('div');
    chat_div.innerHTML = '<iframe width="250px" height="500px" src="http://chatroll.com/embed/chat/kyqa?id=KFV1Exw8WiR&platform=php&uid=2971&uname=Jdog21b&ulink=http%3a%2f%2fpigskinempire.com%2fcoach.aspx%3fid%3d23483&upic=&ismod=0&sig=39605ad547a491ffb79e1b42789c9cc7&w=$0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowtransparency=true"></iframe>';
    chat_div.setAttribute('id','homechat');
    
    $(chat_div).insertAfter(attach);
    
function alertSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  window.alert( 'Width = ' + myWidth );
  window.alert( 'Height = ' + myHeight );
}
}
 
// load jQuery and execute the main function
addJQuery(main);