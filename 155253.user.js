// ==UserScript==
// @id             linksnappy.com-2d51c0f1-bc28-47a0-b5c6-370cb4528446@k
// @name           Linksnappy list hosts
// @version        1.0
// @namespace      k
// @author         Yanksy
// @description    
// @include        http://linksnappy.com/index.php?act=download
// @include        https://linksnappy.com/index.php?act=download
// @run-at         document-end
// ==/UserScript==

var getLis = document.querySelectorAll('#features>ul>li');

[].forEach.call(getLis, function(item,index,arr){

    var hostname = item.style.background.split('/templates/images/filehosts/small/')[1].split('.png')[0];
    var ih = item.innerHTML;
    item.innerHTML = hostname+' '+ih;
    item.style.width='200px';

});

var getLis2 = document.querySelectorAll('.dloadquotabox div[style*="/templates/images/filehosts/small/"]');

[].forEach.call(getLis2, function(item,index,arr){

    var hostname = item.style.background.split('/templates/images/filehosts/small/')[1].split('.png')[0];
    item.innerHTML = hostname;
	
    var s = item.getAttribute('style');
    item.setAttribute('style',s+'float:left;margin:0 90px 0 -90px;padding-left:20px;');	

});