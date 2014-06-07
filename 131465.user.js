// ==UserScript==
// @name           Plug.dj autoqueue
// @namespace      http://userscripts.org/users/449946
// @include        *plug.dj/*/*
// ==/UserScript==


if(window.navigator.vendor.match(/Google/)) { //yet another chrome-specific code..
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  unsafeWindow = div.onclick();
};

function tog(){
	localStorage.setItem('flag',flag)
	if(flag==1){flag=0}
	else{flag=1};
	unsafeWindow.$('#qtxt').fadeOut(function(){
	d=unsafeWindow.$('#qtxt').html();
	if (flag)
		{unsafeWindow.$('#qtxt').html('YES')}
	else 
		{unsafeWindow.$('#qtxt').html('NO')};
	unsafeWindow.$('#qtxt').fadeIn();
	});
}
	
flag= localStorage.getItem('flag')
console.log(flag);
if (flag=='null'){
	flag=1;
	localStorage.setItem('flag',1)}
unsafeWindow.$("#join-container").append("<div id='noq' style='position:absolute; top: 82px;height:20px;  width:104px; font-size:12px;'>Requeue? <span id='qtxt'></span></div>");
tog();
unsafeWindow.$('#noq').click(tog);
unsafeWindow.$("#join-container").css('overflow','visible');
unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, callback);
function callback(djs)
{
	user=unsafeWindow.API.getSelf().username
	if (djs[0].username == user && flag == true && djs.length==5){ 
		unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, callbackNew);
		unsafeWindow.API.removeEventListener(unsafeWindow.API.DJ_UPDATE, callback);}
}

function callbackNew(djs)
{
	unsafeWindow.Room.onWaitListJoinClick();
	unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, callback);
	unsafeWindow.API.removeEventListener(unsafeWindow.API.DJ_UPDATE, callbackNew);
}