// ==UserScript==
// @name           TianyaBBXCrack
// @namespace      tianya@czzsunset_at_gmail
// @description    This script provides functions to see LZ only etc
// @include        http://www.tianya.cn/*
// ==/UserScript==



function $(id){
     return document.getElementById(id);
}
node = $('__ty_vip_1');

node.removeAttribute('onclick');

node.addEventListener('click', logicJudge, true);




pContent = $('pContentDiv');
originContent=pContent.innerHTML;



if (GM_getValue('lookingLZ')==1){
    lookLZ();
   	node.innerHTML = node.innerHTML.replace('只看楼主', '查看所有');
}

function logicJudge(){
    if(GM_getValue('lookingLZ')==0){
        lookLZ();
        GM_setValue('lookingLZ',1);//在看楼主
     	node.innerHTML = node.innerHTML.replace('只看楼主', '查看所有');


    }else{
        lookAll();
        GM_setValue('lookingLZ',0);
     	node.innerHTML = node.innerHTML.replace('查看所有', '只看楼主');
    }
}
function lookAll(){
    GM_log('lookAll');
    GM_log('originContent:'+originContent);
    pContent.innerHTML = originContent;

}
function lookLZ() {
        GM_log('look lz');
		var name = unsafeWindow.chrAuthorName;
		var firstAuthor =unsafeWindow.firstAuthor;
		var contenter = pContent;
		var newContent = '';
		var item = '';
		
		if ((/^([a-zA-z0-9\.]+)\.tianya\.cn$/).test(window.location.hostname)) {
			if ((/pub/i).test(window.location.pathname)) { // 主版
				var publicer;
				publicer = contenter;
				//var tagNameA = document.all ? '</A>' : '</a>';
				var arr = publicer.innerHTML.split(/<TABLE /ig); // .replace(/[\n\r]/g,'')
				for (var i = 0; i < arr.length; i ++) {
					item = arr[i];

					if (item.indexOf('作者：') != -1 && item.indexOf('回复日期：') != -1) {
						if (name != '' && item.indexOf('>' + name + '</') != -1) {
							newContent += '<TABLE ' + item;
						}
					} else {
						if (i == 0) {
							if (!!firstAuthor && firstAuthor == name) { // 主版第一个回复内容处理
								newContent = item;
							} else {
								newContent = '';
							}						

						} else {
							newContent += '<TABLE ' + item;
						}
    
					}
				}
				
				if (!(name != '' && $('firstAuthor').innerHTML.indexOf('>' + name + '</') != -1)) {
				    $('firstAuthor').style.display = 'none';
				}

				publicer.innerHTML = newContent;
				contenter = publicer
				
            }
        }
};


unsafeWindow.V.checkUser=function (helper){
    if( unsafeWindow.V.isLogin() == false){
//        alert('要使用天涯百宝箱Crack功能请先登陆！');
//        return;
    }
   var helper = helper || unsafeWindow.V.helper;
   var objVipUser = {'intUserId':10000,'isLookAuthorOnly':1,'isLookWriterOnly':1};
	helper.loaded(helper, objVipUser);
};

