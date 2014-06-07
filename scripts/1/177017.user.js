// ==UserScript==
// @name       Coursera No Netease
// @namespace  http://weibo.com/nptwz
// @version    0.1
// @description  干掉Coursera讨厌的网易 PS:看到网易标志刷新一下就可以了
// @match      https://class.coursera.org/*
// @copyright  编程菜菜
// ==/UserScript==

re=document.cookie.match('serve_netease_[0-9]+=1')
if(re){
	pos = re.index + re[0].length
	document.cookie = document.cookie.substr(0,pos-1)+'0'+document.cookie.substr(pos)
    location.reload()
}
