// ==UserScript==
// @id             www.hobius.com-5cce1e3c-d4f1-4409-850e-45e4bef860d1@script
// @name           hobius light on/off button
// @version        1.0
// @history        1.0 Релиз.
// @namespace      http://userscripts.org/scripts/show/119314
// @author         Black_Sun
// @include        http://www.hobius.com*
// @run-at         document-end
// ==/UserScript==

function lightoff(){
change();
var eb=document.getElementsByClassName('entry-body'),
    ef=document.getElementsByClassName('entry-footer'),
    enc=document.getElementsByClassName('new-comment');
var dark=document.createElement('div');
dark.setAttribute('id','lightsind');
dark.setAttribute('style','position: fixed!important;overflow: hidden!important;left: 0!important; right: 0!important;opacity: 0.7!important;width: 100%!important; height: 100%!important;z-index: 1!important;background: #000!important;');
document.body.insertBefore(dark,document.body.firstChild);
for (var i=0; i<eb.length; i++){eb[i].setAttribute('style','position:relative;z-index: 1 !important;color:white');}
for (var i=0; i<ef.length; i++){ef[i].setAttribute('style','position:relative;z-index: 1 !important');}
for (var i=0; i<enc.length; i++){enc[i].setAttribute('style','position:relative;z-index: 1 !important');}
}
function lighton(){
change2();
var lbutton=document.getElementById('lightsind'),
    eb=document.getElementsByClassName('entry-body');
if(lbutton)lbutton.parentNode.removeChild(lbutton);
for (var i=0; i<eb.length; i++){eb[i].setAttribute('style','position:relative;z-index: 1 !important;color:black');}
}

var light=document.createElement('img');
light.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABuklEQVRYhe3XsWvVUBTH8U9FxKEWJweHWkQ6CIXWyUEcSgdx0U1wLCIOdin9C7o4SAdnB4XipFA6OJUO/gFioTgUB+1QJxFLBdtSSIebh4/78qLJS5MO+cEhuTe5nC/n5px7QqtWrVqdas3gDT4hwR4+4hnGmsNiRABLcmwPj5uAG8fOP+C6bRVn6oI7j60CcB1bqgtwoQRcggNcqwNwuyRggucnDTc+AFwiZHdhFfl4r0bjRVzAA7zDj3T+O+awH70/VoLP2TKLUj3CW0xhBWvYwBEuCglVla//UtYWP9Wb1cuya+TmSQPC18jpDmajubv4kwFYqtQULaAvo/Fl4Vv7lo43hHISby+8KuirlIb1niIf8CS9nxWyNY7eSh1wHT3MALghbP+tjGcJrtcJyN/upWPzmMSLDLjVuuHgTgSxjF18zgC83QQgrHdBfBGyNz4K3zcFB/cjmGm95eVmY3QYlZ0QHdutwskgjeSv9HoFQ5FNdD1vTCPyI7hdhZMqWvF+EWxc5+RHcKsKJ4NE8DC99ovgYZ91tSrvB2qtCgdDA64fFhqFe7iE3/gpNLKvnZIotmrVqlWOjgF5ROLNYtjCmwAAAABJRU5ErkJggg%3D%3D"
light.setAttribute('style','position: fixed!important;width:40px;height:40px;left: 0; right: 0;z-index: 2!important;cursor:pointer');
light.addEventListener('click',lightoff,false)
document.body.insertBefore(light,document.body.firstChild);
function change(){
light.removeEventListener('click',lightoff,false)
light.addEventListener('click',lighton,false)
}
function change2(){
light.removeEventListener('click',lighton,false)
light.addEventListener('click',lightoff,false)
}