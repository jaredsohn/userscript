// ==UserScript==
// @name       BaiduPanAutoEnter
// @match	   *://*/*
// ==/UserScript==
if(location.href.indexOf('http://pan.baidu.com/share/init')===0){
    window.addEventListener("load",function(){
        document.getElementsByClassName('access-fld')[0].value = GM_getValue('clipboardData');
        document.getElementById('submitBtn').click()
    },false);
}
document.addEventListener('copy',function(e){
    GM_setValue('clipboardData',document.getSelection().toString());
},false)