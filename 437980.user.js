// ==UserScript==
// @name        Set Forum Title
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Sets your forum title to be whatever you want it to be!
// @include     http://forum.onverse.com/*
// @version     1
// @grant       none
// ==/UserScript==

var m=document.getElementById('usercptools_menu');
while(m.tagName.toUpperCase() != 'TR') {
    m = m.children[m.children.length-1];
}
var c=document.createElement('a');
c.href='javascript:void(0);';
c.innerHTML='Forum Title';
var v=document.createElement('td');
v.className='vbmenu_option vbmenu_option_alink';
v.onclick=function(){var l=prompt('What do you want your forum title to be? Leave blank to go back to auto.',localStorage['ovForumTitle']||'');if(l==null)return false;localStorage['ovForumTitle']=l||'';setForumTitle();return false;};
v.onmouseover=function(){this.className='vbmenu_hilite vbmenu_hilite_alink';};
v.onmouseout=function(){this.className='vbmenu_option vbmenu_option_alink';};
v.appendChild(c);
var c=document.createElement('tr');
c.appendChild(v);
m.parentNode.appendChild(c);
window.setForumTitle=function(){
    if(localStorage) {
        if(localStorage['ovForumTitle']) {
            var x=document.getElementsByClassName('smallfont');
            if(x.length) {
                x = x[0].getElementsByTagName('a');
                if(x.length) {
                    x=x[0].innerHTML;
                    var d=document.getElementsByClassName('bigusername');
                    for(var i=0;i<d.length;i++) {
                        if(d[i].children.length && d[i].children[0].innerHTML==x) {
                            d[i].parentNode.parentNode.children[1].innerHTML=localStorage['ovForumTitle'];
                        }
                    }
                }
            }
        }
    }
}
setForumTitle();