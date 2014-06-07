// ==UserScript==
// @name        Clixgrid ads
// @namespace   sdsd
// @include     *www.probux.com/progrid.php*
// @version     1
// @grant       none
// ==/UserScript==
flag=0;
document.hasFocus = function () {return true;};
setTimeout(function(){document.getElementById('frm').src=""},0000);
reld();
function reld(){
var im=document.getElementsByTagName('img');
for(i=0;i<im.length;i++){
if(im[i].src=='http://csstatic.com/img/tick48.png'){
st=window.location.href;
str=st.substring(0,st.indexOf('d/')+2);
num2=st.substring(st.lastIndexOf('/')+1,st.lastIndexOf('?'));
num=Math.floor((Math.random()*30)+1);
num2=(num2>=20?1:++num2);
str=str+num+'/'+num2+st.substring(st.lastIndexOf('?'));
flag=1;
window.location.href=str;
break;
}
}
if(flag==0){
setTimeout(function(){reld()},4000);
}
}