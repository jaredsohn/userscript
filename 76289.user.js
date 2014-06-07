// ==UserScript==
// @name Toogle Google Sidebar
// @namespace http://googlesystem.blogspot.com/
// @description Allows to hide Google's left sidebar.
// @include http://www.google.*/search?*
// @include http://www.google.*/webhp?*
// @include http://www.google.*/images?*
// @include http://www.google.*/imghp?*
// @include http://www.google.*/
// @include http://www.google.*/#*
// @version 0.1
// @date 2010-05-08
// @license MIT License
// ==/UserScript==



(function () {
    var AddStyle=(function (code)
{
    if (typeof GM_addStyle=='function') {
        GM_addStyle(code);
    } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = code;
      var head = document.getElementsByTagName('head')[0];
      if (head) {
         head.appendChild(style);
      }
    }
});
    var code = "#sfcnt {margin-left:10px;} #leftnav {display:none;} #center_col {margin-left:10px; margin-top:10px; border:0px;}";
    AddStyle(code);
    var sdb=document.getElementById('subform_ctrl');
    var button=document.createElement('div');
    button.id="tooglebutt";
    button.innerHTML="+";
    button.style.display="inline-block";
    button.style.border="2px solid blue";
    button.style.width="13px";
    button.style.textAlign="center";
    button.style.fontSize="12pt";
    button.style.cssFloat="left";
    var toogle=(function(){
        var button=document.getElementById('tooglebutt');
        if(button.innerHTML!='-') {
            button.innerHTML='-';
            document.getElementById('center_col').style.marginLeft='151px';
            document.getElementById('leftnav').style.display='block';
        }
        else {
            button.innerHTML='+';
            document.getElementById('center_col').style.marginLeft='10px';
            document.getElementById('leftnav').style.display='none';
        }
    });
    sdb.parentNode.insertBefore(button,sdb);
    button.addEventListener("click",toogle,true);
})();