// ==UserScript==
// @name          Youku Batch Down
// @author        jarenduan@gmail.com
// @description	优酷批量下载. Thx to asin888@qq.com's work, and Jaren did a little modificaiton in order to that can fit for the youku pages at present.
// @include        http://www.soku.com*
// @include        http://*youku.com*
// ==/UserScript==
//alert("test")

var IsCheckDownload=-1
var downlist = "";
var urllist= new   Array();//处理中的人物数据,设为全局
var urlcache = new   Array();
//var pageslist = "";
var web_title = document.getElementsByTagName('title')[0].innerHTML
var current_selectflag;
if (1>0) 
{
	var link = "<a href='javascript:check()' title='recheck'>侦测分集链接</a>" +"<br><br>";
	var dl = document.getElementsByTagName('div');
	var  tips = -1;
	
	for(var j=0; j<dl.length; j++){
		if (tips ==0) break;
		if (dl[j].className == "pack_thumb"){
			b = document.getElementById("eplist_wrap")
			b.innerHTML = link + b.innerHTML;
			tips = 0
		}
		if (dl[j].className == "videos" || dl[j].className == "shows" ||  dl[j].className == "videoList"){
			for (var jj=0;jj<dl.length;jj++){
				if(dl[jj].className == "keyInfo" || dl[jj].className == "caption"){
					dl[jj].innerHTML = link + dl[jj].innerHTML;
					tips = 0
					break;
				}
			}
		}
	}
	
	unsafeWindow.check = function() {
		var divnum = 1
		var divlist = document.getElementsByTagName('div');
		for(var j=0; j<divlist.length; j++){
			if (divlist[j].className == "items"){//剧集列表 http://www.soku.com/v?keyword=海贼王&ca=5
				var isShown = false;
				var items = divlist[j].getElementsByTagName('div');
				var pageNumAsc= 0;
				for(var k=0; k<items.length; k++){
					var itemlink=""
					var controls = items[k].getElementsByTagName('li');
					for(var i=0; i<controls.length; i++){
						if (controls[i].className=="i_title"){
							if (controls[i].getElementsByTagName('a')[0])
							{
								//http://www.soku.com/p?ca=5&ep=426642&st=433&lm=40&u=http://v.youku.com/v_show/id_XMTc3MjQ1ODMy.html
								link = controls[i].getElementsByTagName('a')[0].href
								link = link.replace(/.*?(http:\/\/v\.youku\.com\/v_show.*)/g,"$1")
								if (link.indexOf("v.youku.com") > 0)
								{
									isShown = true;
									//名@链接地址
									link_id= pageNumAsc + "@"+link
									if (pageNumAsc<10)
									{
										itemlink = "00"+itemlink
									}
									else if (pageNumAsc<100)
									{
										itemlink = "0"+itemlink
									}
									controls[i].innerHTML = "<a style=\"text-decoration: none;color: black\" href='javascript:checkToStart("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向前全部选择'><</a>"+"<input type=\"checkbox\" id=\""+link_id+"\" name=\"ManHuaLinks"+divnum+"\" >"+"<a style=\"text-decoration: none;color: black\" href='javascript:checkToEnd("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向后全部选择'>></a>"+ controls[i].innerHTML+"  <span id=\"span_ManHuaLinks"+divnum+"_"+link+"\"> </span>"
									pageNumAsc++;
								}
							}
						   // controls[i].innerHTML  = "debug"
						}
					}
				}
				if (isShown)
				{
					divlist[j].innerHTML = "<a href='javascript:checkToEnd(0,\"ManHuaLinks"+divnum+"\")' title='全部选择'>全选</a>  <input type='button' id='btn_ManHuaLinks"+divnum+"' onclick=DownloadCheck('"+"ManHuaLinks"+divnum+"') value='开始提取' title='当前页'>"+"<input type=\"checkbox\" id=\"check_ManHuaLinks"+divnum+"\"><label for=\"check_ManHuaLinks"+divnum+"\">提取时立刻开始下载</label>"+"<br><br>" + divlist[j].innerHTML 
					divnum++;
				}
			}
			else if (divlist[j].className == "videos" || divlist[j].className == "shows"){ //videos:  soku中的优酷搜索(不支持专辑页面)   
				var isShown = false;
				var items = divlist[j].getElementsByTagName('ul');
				var pageNumAsc= 0;
				for(var k=0; k<items.length; k++){
					var itemlink=""
					var controls = items[k].getElementsByTagName('li');
					for(var i=0; i<controls.length; i++){
						if (controls[i].className=="vTitle" || controls[i].className=="v_title" || controls[i].className=="show_title" || controls[i].getElementsByTagName('h1')[0]){ //vTitle  视频搜索页面   show_title综艺页面
							if (controls[i].getElementsByTagName('a')[0])
							{
								//http://www.soku.com/p?ca=5&ep=426642&st=433&lm=40&u=http://v.youku.com/v_show/id_XMTc3MjQ1ODMy.html
								link = controls[i].getElementsByTagName('a')[0].href
								link = link.replace(/.*?(http:\/\/v\.youku\.com\/v_show.*)/g,"$1")
								if (link.indexOf("v.youku.com") > 0)
								{
									isShown = true;
									//名@链接地址
									link_id= pageNumAsc + "@"+link
									if (pageNumAsc<10)
									{
										itemlink = "00"+itemlink
									}
									else if (pageNumAsc<100)
									{
										itemlink = "0"+itemlink
									}
									controls[i].innerHTML = "<a style=\"text-decoration: none;color: black\" href='javascript:checkToStart("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向前全部选择'><</a>"+"<input type=\"checkbox\" id=\""+link_id+"\" name=\"ManHuaLinks"+divnum+"\" >"+"<a style=\"text-decoration: none;color: black\" href='javascript:checkToEnd("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向后全部选择'>></a>"+ controls[i].innerHTML+"  <span id=\"span_ManHuaLinks"+divnum+"_"+link+"\"> </span>"
									pageNumAsc++;
								}
							}
						   // controls[i].innerHTML  = "debug"
						}
					}
				}
				if (isShown)
				{
					divlist[j].innerHTML = "<a href='javascript:checkToEnd(0,\"ManHuaLinks"+divnum+"\")' title='全部选择'>全选</a>  <input type='button' id='btn_ManHuaLinks"+divnum+"' onclick=DownloadCheck('"+"ManHuaLinks"+divnum+"') value='开始提取' title='当前页'>"+"<input type=\"checkbox\" id=\"check_ManHuaLinks"+divnum+"\"><label for=\"check_ManHuaLinks"+divnum+"\">提取时立刻开始下载</label>"+"<br><br>" + divlist[j].innerHTML 
					divnum++;
				}
			}
			else if (divlist[j].className == "pack_list"){//详情页面
						var isShown = false;
				var items = divlist[j].getElementsByTagName('tr');
				var pageNumAsc= 0;
				for(var k=0; k<items.length; k++){
					var itemlink=""
					var controls = items[k].getElementsByTagName('td');
					for(var i=0; i<controls.length; i++){
						if (controls[i].className=="vTitle"){
							if (controls[i].getElementsByTagName('a')[0])
							{
								//http://www.soku.com/p?ca=5&ep=426642&st=433&lm=40&u=http://v.youku.com/v_show/id_XMTc3MjQ1ODMy.html
								link = controls[i].getElementsByTagName('a')[0].href
								link = link.replace(/.*?(http:\/\/v\.youku\.com\/v_show.*)/g,"$1")
								if (link.indexOf("v.youku.com") > 0)
								{
									isShown = true;
									//名@链接地址
									link_id= pageNumAsc + "@"+link
									if (pageNumAsc<10)
									{
										itemlink = "00"+itemlink
									}
									else if (pageNumAsc<100)
									{
										itemlink = "0"+itemlink
									}
									controls[i].innerHTML = "<a style=\"text-decoration: none;color: black\" href='javascript:checkToStart("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向前全部选择'><</a>"+"<input type=\"checkbox\" id=\""+link_id+"\" name=\"ManHuaLinks"+divnum+"\" >"+"<a style=\"text-decoration: none;color: black\" href='javascript:checkToEnd("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向后全部选择'>></a>"+ controls[i].innerHTML+"  <span id=\"span_ManHuaLinks"+divnum+"_"+link+"\"> </span>"
									pageNumAsc++;
								}
							}
						   // controls[i].innerHTML  = "debug"
						}
					}
				}
				if (isShown)
				{
					divlist[j].innerHTML = "<a href='javascript:checkToEnd(0,\"ManHuaLinks"+divnum+"\")' title='全部选择'>全选</a>  <input type='button' id='btn_ManHuaLinks"+divnum+"' onclick=DownloadCheck('"+"ManHuaLinks"+divnum+"') value='开始提取' title='当前页'>"+"<input type=\"checkbox\" id=\"check_ManHuaLinks"+divnum+"\"><label for=\"check_ManHuaLinks"+divnum+"\">提取时立刻开始下载</label>"+"<br><br>" + divlist[j].innerHTML 
					divnum++;
				}
			}
			else if (divlist[j].className == "pack_thumb" || divlist[j].className == "videoList"){//电视剧 剧集列表 and 专辑
						var isShown = false;
				var controls = divlist[j].getElementsByTagName('li');
				var pageNumAsc= 0;
				for(var i=0; i<controls.length; i++){
					if (controls[i].className =="v_link"){
						var itemlink=""
						if (controls[i].getElementsByTagName('a')[0]){
							link = controls[i].getElementsByTagName('a')[0].href
							link = link.replace(/.*?(http:\/\/v\.youku\.com\/v_show.*)/g,"$1")
							if (link.indexOf("v.youku.com") > 0){
								isShown = true;
								link_id= pageNumAsc + "@"+link //名@链接地址
								if (pageNumAsc<10)
									{
										itemlink = "00"+itemlink
									}
									else if (pageNumAsc<100)
									{
										itemlink = "0"+itemlink
									}
								controls[i].innerHTML = "<a style=\"text-decoration: none;color: black\" href='javascript:checkToStart("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向前全部选择'><</a>"+"<input type=\"checkbox\" id=\""+link_id+"\" name=\"ManHuaLinks"+divnum+"\" >"+"<a style=\"text-decoration: none;color: black\" href='javascript:checkToEnd("+pageNumAsc+",\"ManHuaLinks"+divnum+"\")' title='向后全部选择'>></a>"+ controls[i].innerHTML+"  <span id=\"span_ManHuaLinks"+divnum+"_"+link+"\"> </span>"
								pageNumAsc++;
							}
						}
					}
				}			
				if (isShown){
				   //alert("a");
					divlist[j].innerHTML = "<a href='javascript:checkToEnd(0,\"ManHuaLinks"+divnum+"\")' title='全部选择'>全选</a>  <input type='button' id='btn_ManHuaLinks"+divnum+"' onclick=DownloadCheck('"+"ManHuaLinks"+divnum+"') value='开始提取' title='当前页'>"+"<input type=\"checkbox\" id=\"check_ManHuaLinks"+divnum+"\" checked=\"checked\"><label for=\"check_ManHuaLinks"+divnum+"\">提取时立刻开始下载</label>"+"<br><br>" + divlist[j].innerHTML 
					divnum++;
				}
			}
			}
		}
	

    unsafeWindow.checkToStart = function(num,selectflag) {
        var elms = document.getElementsByName(selectflag);
        elms[num].checked=elms[num].checked?0:1;
        for (var i = num; i >=0; i--) {
        elms[i].checked = elms[num].checked;
        }
    }
    
    unsafeWindow.checkToEnd = function(num,selectflag,$obj) {
        var elms = document.getElementsByName(selectflag);
        elms[num].checked=elms[num].checked?0:1;
        for (var i = num; i < elms.length; i++) {
        elms[i].checked = elms[num].checked;
        }
    }
    
    unsafeWindow.DownloadCheck = function(selectflag) {
        current_selectflag=selectflag;
        document.getElementById("btn_"+current_selectflag).disabled=true;
        downlist = "";
        //pageslist = "";
        var elms = document.getElementsByName(selectflag);
        for (var i = 0; i < elms.length; i++) {
            if (elms[i].checked)
            {
                if (downlist=="")
                {
                    downlist +=  elms[i].id
                }
                else
                {
                    downlist +=  "\n" + elms[i].id
                }
            }
        }
        urllist   =   downlist.split( "\n");  //用回车字符为关键字分割这些文本, 得到名单列表
        if (urllist.length>0)
        {
            IsCheckDownload = 0;
        }
    }

    setTimeout(function() {IsStartDownload();},1000);
    function IsStartDownload()
    {
        if (IsCheckDownload==-1)//继续循环
        {
            //document.getElementsByTagName('title')[0].innerHTML =  Math.random()+"";
            setTimeout(function() {IsStartDownload();},1000);
        }
        else if (IsCheckDownload>=0)//继续循环
        {
            if (IsCheckDownload<urllist.length){
                document.getElementsByTagName('title')[0].innerHTML = (IsCheckDownload+1)+"/"+urllist.length+"正在提取..."
                var link = urllist[IsCheckDownload].replace(/.*?@(http.*)/g,"$1")
                var pageName = urllist[IsCheckDownload].replace(/(.*)?@http.*/g,"$1")
                if (link.indexOf("http") == 0){
                    if (urlcache[link])
                    {
                        //pageslist += urlcache[link] + ",";
                        document.getElementById("span_"+current_selectflag+"_"+link).innerHTML="<a style=\"text-decoration: none;color: black\" href=\""+urlcache[link]+"\">▽</a><br>\n"
                        if (document.getElementById("check_"+current_selectflag).checked)
                        {
                            window.location = urlcache[link];
                        }
                        IsCheckDownload++;
                        setTimeout(function() {IsStartDownload();},10);
                    }
                    else
                    {
                        document.getElementById("span_"+current_selectflag+"_"+link).innerHTML="<img  src='data:image/gif;base64,R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh%2BQQJCAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV%2BlMGLApWwUzw1jsIwAh%2BQQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pBKhRSkYLvM7Ab%2FOGThoE2%2BQExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt%2FwCAAh%2BQQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4EcySA8l0Alo0yA8cw%2B9TIgAh%2BQQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7'/>"
                        GM_xmlhttpRequest({
                        method: 'GET',
                        url:  link,
                        headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                        },
                        onload: function(responseDetails) {
                            //alert(responseDetails.responseText) 
                            var applisttxt=responseDetails.responseText.replace(/href="(iku[^"]*)"/g,function($0,iku_link){
                                var pages = ""
                                document.getElementById("span_"+current_selectflag+"_"+link).innerHTML="<a style=\"text-decoration: none;color: black\" href=\""+iku_link+"\">▽</a><br>\n"
                                //pageslist += iku_link;
                                urlcache[link] = iku_link;
                                if (document.getElementById("check_"+current_selectflag).checked)
                                {
                                    window.location = iku_link;
                                }
                                    //alert(urlcache[urllist[IsCheckDownload]])
                            })
                            IsCheckDownload++;
                            setTimeout(function() {IsStartDownload();},10);
                        }
                        })
                    }
                }
                else
                {
                    IsCheckDownload++;
                    setTimeout(function() {IsStartDownload();},10);
                }
            }
            else
            {
                document.getElementsByTagName('title')[0].innerHTML = web_title
                //unsafeWindow.showbbscode();
                IsCheckDownload=-1;
                document.getElementById("btn_"+current_selectflag).disabled=false;
                setTimeout(function() {IsStartDownload();},1000);
            }
        }
    }
    
    /*
    unsafeWindow.showbbscode = function(){
        if (document.getElementById("bgDiv"))
        {
            //alert("test")
            document.getElementById("bgDiv").style.visibility = "visible";
        }
        else
        {
            loadingbgObj=document.createElement("div");
            loadingbgObj.setAttribute('id','bgDiv');
            loadingbgObj.style.position="absolute";
            loadingbgObj.style.top="0";
            loadingbgObj.style.background="#cccccc";
            loadingbgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
            loadingbgObj.style.opacity="0.9";
            loadingbgObj.style.left="0";
            loadingbgObj.style.width=document.body.scrollWidth + "px";
            loadingbgObj.style.height=document.body.scrollHeight + "px";
            loadingbgObj.style.zIndex = "10000";
            loadingbgObj.innerHTML = "test";
            document.body.appendChild(loadingbgObj);
        }
         document.getElementById("bgDiv").innerHTML = "<br><br><br><br><br><br>------------------------------------------------------------<input type='button' onclick=this.parentNode.style.visibility='hidden' value='关闭'><br><textarea id='apptxtcode' wrap='off' rows=25 cols=59 onmouseover=this.select(); >"+pageslist+"</textarea>";
    }*/
}