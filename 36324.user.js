// ==UserScript==
// @name           kaixin
// @namespace      kaixin
// @description 开心网音乐下载
// @include        http://www.kaixin001.com/app/app.php?aid=1006
// @include        http://www.kaixin001.com/app/app.php?aid=1006###
// @include        http://www.kaixin001.com/app/app.php?aid=1006&url=index.php*
// ==/UserScript==
var types=['mp3','wma','rm','mid']
var all_uls=document.evaluate(
    "//ul[@class]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < all_uls.snapshotLength; i++) {
    ul = all_uls.snapshotItem(i);
    re=/mp_open\('','\d*','\d*','','(\d*)'\);/
    temp=ul.innerHTML.match(re)
    music_id=temp[1]
    
    music_dir=''
    part=Math.floor(music_id/100)
    while(part>100){
    	    temp_part=part
    		part=temp_part%100
    		music_dir='/'+part+music_dir
    		part=Math.floor(temp_part/100)
    }
    if(part>0){
    		music_dir='/'+part+music_dir
    }
   
    music_url='http://music.kaixin001.com/pic/music'+music_dir+'/'+music_id
    
    var a=ul.getElementsByTagName("a")[0];
    var down_link=document.createElement("a")
	down_link.setAttribute("href","javascript:window.down_music('"+music_url+"');")
	down_link.setAttribute("target","_blank")
	
	var disk_img=document.createElement("img");
	disk_img.width='13'
	disk_img.height='13'
	disk_img.align='absmiddle'
	disk_img.setAttribute("style","cursor:pointer")
	disk_img.setAttribute("music_url",music_url)
	disk_img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH%2BSURBVBgZBcE9i11VGAbQtc%2FsO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq%2F%2Bxv%2FLw9Xd%2B78%2FHLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO%2F%2Fnl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q%2BqQms2vVmWZjdiu5ZR2rT01166%2FNCZg%2F2PFjwSVMU6yjoC1oq%2Bx6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o%2B%2FTkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8%2B9mPWmuWxqYvGkbFGCUAOH%2F%2BQevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U%2FGiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7%2F%2FgUAAAB49tEXzTmtM5KkV%2Fy2G%2FX4M5fPao03n%2FsUAAAAwIX7y5yBv9vhjW%2FfT%2FIkuSp5gJKElKRISYoUiSRIyD1tufs%2FIXxui20QsKIAAAAASUVORK5CYII%3D";
	
	disk_img.wrappedJSObject.onclick=function(evt){
		down_music(evt.target.getAttribute("music_url"),0)
	}
     a.parentNode.insertBefore(disk_img,a)
};

down_music=function (test_url,type_index){
	full_url=test_url+'.'+types[type_index++]
	GM_xmlhttpRequest({
	method: 'GET',
	url: full_url,
	onload: function(details) {
		if(details.status==200){
			window.open(full_url)
		}else{
			if(type_index>=types.length){
				alert("Oh,my god! Cannot find your file.")
				return;
			}
			else{
				down_music(test_url,type_index)
		    }
		}
	}
	}
	); 
	return;
};