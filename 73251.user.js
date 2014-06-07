// ==UserScript==
// @name           NG Change Level Icons
// @namespace      http://userscripts.org/users/vitaminp
// @include        http://*.newgrounds.com/*
// ==/UserScript==
// boolean to tell if the browser is running Greasemonkey or not
var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');
var Username = document.getElementById('loginbox_username').textContent.toLowerCase()
var locationl
var who
switch(isGM){case true:who =  GM_getValue('Who','none');break;case false:who =  localStorage.getItem('Who');break;default:who='none';break;}
switch(isGM){case true:locationl =  GM_getValue('Where','');break;case false:locationl =  localStorage.getItem('Where');break;default:locationl='';break;}
if(locationl == null){
locationl = ''
}
if(who == null){
who = 'none'
}
if(locationl !=''){
if(who!= 'none'){
if(who== 'you'){
if(Username != undefined){
if(document.location.href.match('http://' + Username + '.newgrounds.com')){
document.getElementById("ulevel").style.backgroundImage= 'url('+locationl+')'
}
if(document.location.href.match('http://www.newgrounds.com/bbs/topic/')){
posts = document.getElementsByClassName("userstats")
for(i=0; i<posts.length; i++){
if(posts[i].getElementsByTagName('a')[0].firstChild.alt.toLowerCase() == Username){
posts[i].getElementsByTagName('a')[0].firstChild.src = locationl
}
}
}
}
}
if(who == 'everyone'){
if(isGM){
if(document.getElementById('ulevel') != null && document.getElementById('ulevel') != undefined){
document.getElementById("ulevel").style.backgroundImage= 'url('+locationl+')'
}
}
if(document.getElementsByClassName("userstats")!=undefined && document.getElementsByClassName("userstats")!= null){
posts = document.getElementsByClassName("userstats")
for(i=0; i<posts.length; i++){
posts[i].getElementsByTagName('a')[0].firstChild.src = locationl
}
}
}
}
}

window.addEventListener("load", function(e) {
if(isGM){
GM_registerMenuCommand("NG Icon Change Preferences", settings)
}else{
var cssP = 'position:fixed; z-index:9999; border: 0px solid #ffffff; color:black;top:100%; left:5%; width:10em; margin:-1.5em; 0 0 3em; height:6em;background-color:#FAFAE6;-moz-border-radius: 15px;-webkit-border-radius: 15px;-opera-border-radius: 15px;-khtml-border-radius: 15px;cursor: pointer; cursor: hand;';
var panel = document.createElement('div');
panel.setAttribute('name', 'LevelChangeP')
panel.setAttribute('style', cssP);
document.body.appendChild(panel);
var doc = document.getElementsByName("LevelChangeP")[0];
doc.style.textAlign = 'center'
doc.className = 'box'
doc.innerHTML = '<a></a>'
var boxt = document.createElement('div');
boxt.innerHTML = 'Change Icons'
	doc.addEventListener('click',function(e){settings()},false)
	doc.appendChild(boxt)
}
},false)

function settings(){

var css = 'position:fixed; z-index:9999; border: 0px solid #ffffff; ' +
          'top:50%; left:50%; width:30em; margin:-15em; 0 0 -12em; height:24em;;';


var iframe = document.createElement('div');
iframe.setAttribute('name', 'LevelChangeIF')
iframe.setAttribute('style', css);
document.body.appendChild(iframe);

    var doc = document.getElementsByName("LevelChangeIF")[0];
    doc.style.textAlign = 'center'
    doc.className = 'box'
	var boxtop = document.createElement('div');

	boxtop.className = "boxtitle"

		doc.appendChild(boxtop)
    var Image = document.createElement('img');
    Image.setAttribute('name', 'Image');
    Image.setAttribute('alt', 'Image Preview');
Image.setAttribute('height', '100px');
Image.setAttribute('width', '100px');

    Image.setAttribute('src', locationl);
    Who = document.createElement('div');
	Who.style.background = 'url("http://img.ngfiles.com/slants.gif") repeat scroll 0 0 transparent;'
    Who.style.textAlign = 'center'
    Who.innerHTML = '<span class="fblurb">Whos icon do you want to change?</span><br/>'
    Who.innerHTML += 'No ones:';
    var NoneRadio = document.createElement('input');
    NoneRadio.setAttribute('type', 'radio');
    NoneRadio.setAttribute('name', 'radio');
    NoneRadio.setAttribute('value', 'none');
    NoneRadio.setAttribute('checked', 'true');
    Who.appendChild(NoneRadio)
    Who.innerHTML += 'Yours:';
    var YouRadio = document.createElement('input');
    YouRadio.setAttribute('type', 'radio');
    YouRadio.setAttribute('name', 'radio');
    YouRadio.setAttribute('value', 'you');
    Who.appendChild(YouRadio)
    Who.innerHTML += 'Everyones:';
    var EveryoneRadio = document.createElement('input');
    EveryoneRadio.setAttribute('type', 'radio');
    EveryoneRadio.setAttribute('name', 'radio');
    EveryoneRadio.setAttribute('value', 'everyone');
    Who.appendChild(EveryoneRadio)
    Where = document.createElement('form');
    Where.className = "bbs_search_form"
    Where.id = "bbs_search"
	Where.style.textAlign = 'center'
    Where.innerHTML += '<span class="fblurb">What do you want to change it to?</span><br/>'
    var LinkText = document.createElement('input');
    LinkText.setAttribute('type', 'text');
    LinkText.setAttribute('name', 'text');
    LinkText.setAttribute('size', '33');
    LinkText.className = 'bbs_search inputfield formtext'
    LinkText.id = 'bbsterms'
    LinkText.style.textAlign = 'center'
    LinkText.style.width = '20em'
    LinkText.style.heigth = '2em'
    LinkText.setAttribute('value', locationl);
	LinkText.style.cssFloat = 'none';
    LinkText.addEventListener('change',function(e){Image.src = LinkText.value;
}, false)
    Where.appendChild(LinkText)
	boxtop.innerHTML = '<div class="boxtop" id="toppsy"><div></div></div><div class="boxl"><div class="boxr"><div class="boxm" id ="hello"> <div class="heading"><h2 class="i-ok">Change Icon</h2></div></div> </div> </div> </div> <div class="boxbot"> <div></div> </div> '
    Sub = document.createElement('div');
	var Boxxy = document.getElementById("hello")
	Boxxy.appendChild(Who)
	Boxxy.appendChild(Where)
    Sub.className = "boxm"
    Sub.style.textAlign = 'center'
    Sub.style.margin = '2px'
	var topp = document.getElementById('toppsy')
	topp.getElementsByTagName('Div')[0].style.height = '50px'
	topp.style.height = '50px'
    var Submit = document.createElement('button')
    Submit.setAttribute('type', 'button');
    Submit.textContent = 'Submit'
    Submit.addEventListener('click', function(e){
    for(i=0; i<document.getElementsByName('radio').length; i++){
    if(document.getElementsByName('radio')[i].checked){
     switch(isGM){case true:GM_setValue('Who',document.getElementsByName('radio')[i].value);break;case false:localStorage.setItem('Who',document.getElementsByName('radio')[i].value);break;default: break;}
    }
    }	
	switch(isGM){case true:GM_setValue('Where',document.getElementsByName('text')[0].value);break;case false:localStorage.setItem('Where',document.getElementsByName('text')[0].value);break;default: break;}
    parent.document.getElementsByName("LevelChangeIF")[0].parentNode.removeChild(parent.document.getElementsByName("LevelChangeIF")[0]);
	
    }, false)
    var Reset = document.createElement('button')
    Reset.setAttribute('type', 'button');
    Reset.textContent = 'Reset'
     Reset.addEventListener('click', function(e){switch(isGM){case true:GM_setValue('Who','you'); GM_setValue('Where','');break;case false:localStorage.setItem('Where', '');localStorage.setItem('Who', '');break;default: break;};
    LinkText.value = '';Image.src = '';document.getElementsByName('radio')[0].checked = true;},false)
    Sub.appendChild(Submit)
    Sub.appendChild(Reset)
	Boxxy.appendChild(Image)
    Boxxy.appendChild(Sub)
	
}
