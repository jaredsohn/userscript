// ==UserScript==
// @name           Toggle Animation
// @namespace      http://userscripts.org/users/449946
// @include        *plug.dj/*/*
// ==/UserScript==


if(window.navigator.vendor.match(/Google/)) { //yet another chrome-specific code..
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  unsafeWindow = div.onclick();
};

function toggle(){
	if (state){
		console.log('Turning animations off')
		unsafeWindow.avatarTick = function(){}
		unsafeWindow.$('#state').html('OFF')
	}
	else{
		console.log('Turning animations on')
		unsafeWindow.avatarTick = hold
		unsafeWindow.$('#state').html('ON')
		unsafeWindow.startAnimation()
	}
	localStorage.setItem('animationFlag', state)
	state = (state + 1) % 2
	
}


state = localStorage.getItem('animationFlag')
console.log(state + 'animations')
if (state == null){
	state = 0
	localStorage.setItem('animationFlag', '0')
}
else{
	state = parseInt(state)
}

console.log('here')
hold = unsafeWindow.avatarTick
initArray = ['OFF', 'ON']
toggle()
unsafeWindow.$('.footer').append('<span id="toggleAnims">  |  Toggle Animations: <span id="state">'+ initArray[state] +'</span></span>')
unsafeWindow.$('#toggleAnims').click(toggle)



