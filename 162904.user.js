// ==UserScript==
// @name        Zonowy SB
// @namespace   C:/tdm.js
// @include     http://www.tdm.pl/forum/*
// @version     1.1
// ==/UserScript==

function addStyle(style) {
    var head = document.getElementsByTagName("HEAD")[0];
    var ele = head.appendChild(window.document.createElement('style'));
    ele.innerHTML = style;
    return ele;
}

//add css
addStyle('@import "http://deadhead.linuxpl.info/tdm.css";');

//shout position
var ch = document.getElementById('chat');
var wrapper = document.getElementById('wrapper');
var boxWidth = (window.innerWidth-wrapper.offsetWidth-40)/2;

ch.style.height = window.innerHeight+'px';
ch.style.width = boxWidth+'px';

//left side
var inf = document.getElementById('tdm_infocenter');
if(inf != null) inf.style.width = (boxWidth-20)+'px';

//options
var buttonBox = window.document.createElement('div');
buttonBox.style.width = (boxWidth-20)+'px';
buttonBox.setAttribute('id', 'boxManagement');
buttonBox.innerHTML = '<span id="ib" class="active">Info box</span><span id="tdmp">Motury</span><span id="gbp">Gołe baby</span>';
wrapper.appendChild(buttonBox);

var contentBox = window.document.createElement('div');
contentBox.style.width = (boxWidth-20)+'px';
contentBox.setAttribute('id', 'contentBox');
//contentBox.style.height = (window.innerHeight-inf.offsetHeight-buttonBox.offsetHeight+40)+'px';
wrapper.appendChild(contentBox);

var elemMan = new Array(document.getElementById('ib'), document.getElementById('tdmp'), document.getElementById('gbp'));
var tout = null;

elemMan[0].addEventListener('click',function () {
    elemMan[0].className = 'active';
    elemMan[1].className = '';
	elemMan[2].className = '';
	
	contentBox.innerHTML = '';
	inf.style.position = 'fixed';
    inf.style.width = (boxWidth-20)+'px';
    document.getElementById('tdm_infocenter_user').style.width = '96%';
    document.getElementById('tdm_infocenter_events').style.width = '96%';
    document.getElementById('tdm_infocenter_members').style.width = '96%';
    if(tout)
        window.clearTimeout(tout);
},false);

elemMan[1].addEventListener('click',function () {  
    elemMan[0].className = '';
    elemMan[1].className = 'active';
	elemMan[2].className = '';
	if(tout)
	   window.clearTimeout(tout);
	showPhoto('m');
},false);


elemMan[2].addEventListener('click',function () {
    elemMan[0].className = '';
    elemMan[1].className = '';
	elemMan[2].className = 'active';
	if(tout)
    	window.clearTimeout(tout);
	showPhoto('b');
},false);


//latest news
/*var threads = document.getElementsByClassName('windowbg');
var newThreads = [];
for(var i=0; i<threads.length; i++) {
    if(threads[i].children[0].children[0]) {
        if(threads[i].children[0].children[0].src == 'http://www.tdm.pl/forum/Themes/default/images/on2.png' ||
           threads[i].children[0].children[0].src == 'http://www.tdm.pl/forum/Themes/default/images/on.png') {
                newThreads.push(threads[i].parentNode.cells[3].innerHTML);
                
        }
    }
}

for(var i=0; i<newThreads.length; i++) {
    var newP = window.document.createElement('div');
    newP.innerHTML = newThreads[i];
    contentBox.appendChild(newP);

}*/

function showPhoto(type) {
    if(inf != null) {
        inf.style.position = 'relative';
        inf.style.width = 'auto';
        document.getElementById('tdm_infocenter_user').style.width = '900px';
        document.getElementById('tdm_infocenter_events').style.width = '450px';
        document.getElementById('tdm_infocenter_members').style.width = '450px';
    }
        
    var no = Math.floor((Math.random()*20)+1);
    
    contentBox.innerHTML = '<img src="http://deadhead.linuxpl.info/'+type+'/'+no+'.jpg" />';
    tout = setTimeout(function(){ showPhoto(type); }, 180000);
}

if(inf == null) {
    elemMan[0].style.display = 'none';
    elemMan[1].className = 'active';
    showPhoto('m');
}