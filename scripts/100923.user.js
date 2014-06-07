// ==UserScript==
// @name          Tudou Batch Down
// @author        jarenduan@gmail.com
// @description	  使用iTuDou 对土豆电视剧批量下载.
// @include        http://*tudou.com*
// @version         0.5

// ==/UserScript==
//alert("test")

var IsCheckDownload=-1
var downlist = "";
var urllist= new   Array();
var urlcache = new   Array();
var divnum = 1;
var web_title = document.getElementsByTagName('title')[0].innerHTML
var current_selectflag;
if (1>0) 
{
	var link = "<a href='javascript:check()' title='recheck'>侦测分集链接</a><select id='definition'><option value ='5'>720P超清</option><option value ='4'>480P高清</option><option value ='3'>360P清晰</option><option value='2'>256P流畅</option></select>" +"<br><br>";
	var dl = document.getElementsByTagName('div');
	var  tips = -1;
	
	for(var j=0; j<dl.length; j++){
		if (tips ==0) break;
		if (dl[j].className == "album-do"){
			dl[j].innerHTML = link + dl[j].innerHTML;
			tips = 0
		}
		// if (dl[j].className == "videos" || dl[j].className == "shows" ||  dl[j].className == "videoList"){
			// for (var jj=0;jj<dl.length;jj++){
				// if(dl[jj].className == "keyInfo" || dl[jj].className == "caption"){
					// dl[jj].innerHTML = link + dl[jj].innerHTML;
					// tips = 0
					// break;
				// }
			// }
		// }
	}
	
	unsafeWindow.check = function() {
		//alert("Begin Check")
		var divlist = document.getElementById("playItems");//剧集列表
		var isShown = false;
		var divs = divlist.getElementsByTagName('div');
		
		for(var k=0; k<divs.length; k++){
			if(divs[k].className == "sc4" && divs[k].style.display != "none"){
				var items = divs[k].getElementsByTagName('div');
				for(var kk=0; kk<items.length; kk++){
					if (items[kk].className == "pack pack_video_card"){
						//alert("pack pack_video_card")
						var TXTs = items[kk].getElementsByTagName('h6');
						for (i=0; i<TXTs.length;i++){
							if(TXTs[i].className =="caption caption_tv"){
								if (TXTs[i].getElementsByTagName('a')[0]){
									link = TXTs[i].getElementsByTagName('a')[0].href; //http://www.tudou.com/playlist/p/a66302i79886977.html
									//alert(link)
									if (link.indexOf("i") > 0){
										var  indexOfIID = link.lastIndexOf("i");//link.indexOf("iid=");
										var iid = link.substring(indexOfIID + 1, link.length - 5);//link.substring(indexOfIID+4, link.length);
										//alert(iid)
										isShown = true;
										TXTs[i].innerHTML = "<input type=\"checkbox\" id=\""+iid+"\" name=\"ManHuaLinks"+divnum+"\" >"+ TXTs[i].innerHTML+"  <span id=\"span_ManHuaLinks"+divnum+"_"+link+"\"> </span>"
									}
								}
							}
						}
					// controls[i].innerHTML  = "debug"
					}
				}
				if (isShown){
					divs[k].innerHTML = "<a href='javascript:checkToEnd(0,\"ManHuaLinks"+divnum+"\")' title='全部选择'>全选</a>  <input type='button' id='btn_ManHuaLinks"+divnum+"' onclick=DownloadCheck('"+"ManHuaLinks"+divnum+"') value='开始下载' title='当前页'>"+"<br><br>" + divs[k].innerHTML 
					divnum++;
				}
				else{
					alert("WTF, 居然没找到分集链接! 最新的TudouBatchDown没准能解决吧:)")
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
		//alert(downlist)
        urllist   =   downlist.split( "\n");  //用回车字符为关键字分割这些文本, 得到名单列表
        if (urllist.length>0)
        {
            IsCheckDownload = 0;
			IsStartDownload();
        }
    }

    function IsStartDownload()
    {
		
        if (IsCheckDownload>=0)
        {
            if (IsCheckDownload<urllist.length){
                document.getElementsByTagName('title')[0].innerHTML = (IsCheckDownload+1)+"/"+urllist.length+"正在发送下载命令..."
                var link = "tudou://" + urllist[IsCheckDownload] + ":st=" + document.getElementById('definition').value + "/";
				window.location = link;
                IsCheckDownload++;
                setTimeout(function() {IsStartDownload();},5000);
            }
            else
            {
                document.getElementsByTagName('title')[0].innerHTML = web_title;
                IsCheckDownload=-1;
                document.getElementById("btn_"+current_selectflag).disabled=false;
            }
        }
    }
}