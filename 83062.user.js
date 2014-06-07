// ==UserScript==
// @name	豆瓣楼层标示
// @include http://www.douban.com/group/topic/*
// ==/UserScript==
(function(){
	var vvMenuStyleSheet=document.createElement('style'),text = document.createTextNode('div.vvMenu{float:right;    position:relative;    padding-right:36px;    font-size:22px;    cursor:pointer}div.vvMenu b{position:absolute;right:0;top:8px;border-width:4px 4px;border-style:solid;border-color:#666 #fff #fff #fff;width:0;height:0;font-size:0;line-height:0;-webkit-transition:-webkit-transform 0.2s ease-in;-moz-transition:   -moz-transform 0.2s ease-in;-o-transition:     -o-transform 0.2s ease-in;transition:transform 0.2s ease-in}div.vvMenu:hover b{    -moz-transform:          rotate(180deg);    -moz-transform-origin:   50% 20%;    -webkit-transform:       rotate(180deg);    -webkit-transform-origin:50% 20%;    -o-transform:            rotate(180deg);    -o-transform-origin:     50% 20%;    transform:               rotate(180deg);    transform-origin:        50% 20%;        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);    top:   -8px/9}div.vvMenu-Db{border:1px solid #999;position:absolute;height:40px;width:40px;background-color:#fff}');
	vvMenuStyleSheet.appendChild(text);
	document.body.appendChild(vvMenuStyleSheet);
	
	var reply=document.getElementsByClassName('reply-doc'),i=0,temp,tempDiv,query=location.search.substring(1).match(/start=([0-9]+)/);
	for(i=0;i<reply.length;i++){
		console.log(i);
		temp=reply[i].getElementsByTagName('h4')[0];
		tempDiv=document.createElement('div');
		tempDiv.setAttribute('id','vvBtn'+i);
		tempDiv.setAttribute('class','vvMenu');
		tempDiv.appendChild(document.createElement('b'))
		temp.appendChild(tempDiv);
		temp.innerHTML='#'+((query?parseInt(query[1]):0)+i+1)+' '+temp.innerHTML;
	}
})();