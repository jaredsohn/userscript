// ==UserScript==
// @name           GaiaOnline: Toggle Avi Dress-up Size
// @namespace      http://userscripts.org/users/62850
// @description    Adds a button to toggle large and small avitars on a dress-up page
// @include        http://www.gaiaonline.com/avatar*
// @include        https://www.gaiaonline.com/avatar*
// @exclude        http://www.gaiaonline.com/avatar/showoff*
// @exclude        https://www.gaiaonline.com/avatar/showoff*
// ==/UserScript==
function toggleAviSize(){
	var avi=document.getElementById('avatar');
	var avi2=document.getElementById('AnimatedItemLoaderPreview');
	var txt=document.getElementById('TsizeBtn');
	if(avi.getAttribute('style')){
		avi.removeAttribute('style');
		avi2.removeAttribute('style');
		txt.textContent='Shrink';
	}
	else{
		avi.setAttribute('style','max-width:120px;max-height:150px;padding:25%;');
		avi2.setAttribute('style','max-width:120px;max-height:150px;margin:25%;');
		txt.textContent='Grow';
	}
}
function toggleAviFlip(){
	var avi=document.getElementById('avatar');
	if(avi.offsetHeight>0){
		if(avi.className=='flip'){
			avi.removeAttribute("class");
		}
		else{
			avi.className='flip';
		}
	}
	else{
		alert('This does not work on animated avatars');
	}
}
GM_addStyle("img#avatar.flip{-moz-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1)}");
var tar=document.getElementById('av_footer');
if(tar){
	var ele=document.createElement('span');
	ele.setAttribute('style','float:left;padding-top:3px;margin-left:5px;');
	ele.innerHTML='<a onclick="return false;" href="#" class="info_button"><span class="button_cap"></span><span id="TsizeBtn" class="button_text">Shrink</span></a>';
	tar.appendChild(ele);
	ele.childNodes[0].addEventListener('click',toggleAviSize,false);
	var ele=document.createElement('span');
	ele.setAttribute('style','float:left;padding-top:3px;margin-left:5px;');
	ele.innerHTML='<a onclick="return false;" href="#" class="info_button"><span class="button_cap"></span><span id="TflipBtn" class="button_text">Flip</span></a>';
	tar.appendChild(ele);
	ele.childNodes[0].addEventListener('click',toggleAviFlip,false);
}