// ==UserScript==
// @name           网盘助手
// @namespace      wangpanhelper
// @description    网盘助手 --  对网盘资源链接添加一键下载功能，支持纳米盘和rayfile
// @homepage       http://userscripts.org/scripts/show/56914
// @include        *
// @version        0.1
// ==/UserScript==


if(window.name=="namipan"){
//自动下载iframe
	if(location.href.indexOf("http://d.namipan.com/downfile/")==0 || location.href.indexOf("http://www.namipan.com/downfile/")==0){
		//<a id="here_dl"
		a = document.getElementById("here_dl")
		location.href = a.href
	}else if(location.href.indexOf("?wangpanhelper")==-1){
		alert("链接失效")
	}
}else if(location.href.indexOf("http://www.rayfile.com") ==0 || location.href.indexOf("http://d.namipan.com/") ==0){
//目标网站
}else{
//外部网站
	var e=document.links;
	orgLen = e.length
	for (var i=0;i<e.length;i++){	
		if(e[i].href.indexOf("http://d.namipan.com/d/")==0 || e[i].href.indexOf("http://www.namipan.com/d/")==0){
			dhref=e[i].href.replace("www.namipan.com","d.namipan.com")
			dhref=dhref.replace("/d/","/downfile/wangpanhelper/") +"?wangpanhelper"
			addLink(e[i],dhref,"namipan")
			i++
		}else if(e[i].href.indexOf("http://d.namipan.com/downfile/")==0){
			dhref=e[i].href+"?wangpanhelper"
			addLink(e[i],dhref,"namipan")
			i++
		}else if(e[i].href.indexOf("http://www.rayfile.com/files/")==0){
			//dhref=e[i].href
			//addLink(e[i],dhref,"rayfile")
			//i++
			var a=document.createElement("a");
			a.innerHTML="  [快速下载]"
			a.title="大于20M调用Raysource下载，小于20M直接下载"
			a.href = e[i].href
			a.style.marginRight="30px"
			a.addEventListener('click',rayfile,false)
			e[i].parentNode.insertBefore(a,e[i].nextSibling)
			i++
		}
	}
	if(e.length>orgLen){
		//GM_log('len ' + orgLen + '  '+e.length)
		var namipan =document.createElement("iframe");
		namipan.name="namipan"
		namipan.src="http://www.namipan.com/?wangpanhelper"
		namipan.style.display="none"
		document.body.appendChild(namipan)
	}	
}
function addLink(orga,dhref,target){
	var a=document.createElement("a");
	a.href=dhref
	a.innerHTML="  <strong>[直接下载]</strong>"
	a.target=target
	a.style.marginRight="30px";
	orga.parentNode.insertBefore(a,orga.nextSibling);	
}
function rayfile(e){
	GM_xmlhttpRequest({
		method: 'GET',
		url: e.target.href,
		onload: function(responseDetails) {
			var match = responseDetails.responseText.match(/class="btn_indown_zh-cn"><a href="(.+?)"/)
			rayfile2(match[1])
		}
	});	
	e.stopPropagation();
	e.preventDefault();
}
function rayfile2(url){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails) {
			//alert(responseDetails.responseText)
			//fs2you://Y2FjaGVmaWxlMTYucmF5ZmlsZS5jb20vemgtY24vZG93bmxvYWQvOWM3MTJjYmY1NmY3ZWYzODVlOGI4ZmE2MzNlYTk3NDgvJTVCJUU4JUI1JTg0JUU2JUJBJTkwJUU3JUFBJTlEd3d3LnppeXVhbndvLmNvbSU1RCVFNiU5QyVCQSVFNSU5OSVBOCVFNCVCRSVBMFRDJUU1JTlCJUJEJUU4JUFGJUFEJUU0JUI4JUFEJUU1JUFEJTk3LnJtdmJ8MzgwNDA2MjYxfCU1Qnd3dy5mczJ5b3Uub3JnLmNuJTVEJUU2JTlDJUJBJUU1JTk5JUE4JUU0JUJFJUEwJTIwVEMlRTYlOEElQTIlRTUlODUlODglRTclODklODgucm12Yg==
			//var filesize = 380406261;
			//var filesize = 380406261;
			//20971520
			var size = responseDetails.responseText.match(/var filesize = (\d+)/)
			if((+size[1]) >  20971520 ){
				var match = responseDetails.responseText.match(/'(fs2you:\/\/.+?)'/)
				location.href=match[1]
				
			}else{		
				//var downloads_url = ['http://cachefile16.rayfile.com/zh-cn/download/9c712cbf56f7ef385e8b8fa633ea9748/%5Bwww.fs2you.org.cn%5D%E6%9C%BA%E5%99%A8%E4%BE%A0%20TC%E6%8A%A2%E5%85%88%E7%89%88.rmvb'];
				var match = responseDetails.responseText.match(/var downloads_url = \['(.+?)'\];/)
				//alert(match)
				location.href=match[1]
			}
			
		}
	});
}
