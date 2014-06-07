// ==UserScript==
// @name           vk_test_nickname
// @namespace      script
// @include        http://vkontakte.ru/settings.ph*
// ==/UserScript==
var code="return showBox('editLink', 'settings.php', {act:'a_edit_link_box'}, {params: {progress: 'edit_link_progress'}});";
var a=document.getElementById('address')
var b=document.createElement('div')
b.setAttribute("id","subdomain")
b.setAttribute("class","buttons")
b.innerHTML="<ul class='nNav'><li style='margin-top: 3px'><b class='nc'><b class='nc1'><b></b></b><b class='nc2'><b></b></b></b><span class='ncc'><a href='#edit' onclick="+code+">Редактировать адрес</a></span><b class='nc'><b class='nc2'><b></b></b><b class='nc1'><b></b></b></b></li></ul>"

a.parentNode.insertBefore(b,a.nextSibling)
