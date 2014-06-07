// ==UserScript==
// @name           pixiv_save_checker
// @namespace      *
// @include        http://www.pixiv.net/*
// ==/UserScript==



function init(){
	var addElements;
	var illustId = "";
	
	if(document.URL.match(/illust_id=(\d+)/)){
		illustId = RegExp.$1;
	}else{
		return;
	}
	
	var saveImgOn = document.createElement('img');
	var saveImgOff = document.createElement('img');
	saveImgOn.id = "imgOn";
	saveImgOff.id = "imgOff";

	saveImgOn.className = "saveImg";
	saveImgOff.className = "saveImg";

	saveImgOn.src = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
		'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhg'+
		'hEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qH'+
		'b3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlY'+
		'tMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZ'+
		'g/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU'+
		'4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+'+
		'QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0Ekmk'+
		'SkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt'+
		'0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yB'+
		'v9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII=';

	saveImgOff.src = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
		'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHGwwuCEaP4R0AAAHJSURBVDjL'+
		'jZOxaltBEEXP7FvFEAeMSCFVDkmRIqhIG1AKf4Bq/UAKoS6NsD4hblIFp1GpQpB/cOMPEKQypEjr'+
		'SoE00nu7c1PE+5BMsHNh2YXZ2XvvzKzN5/OPwAtgCLwCnkmKgHGHEAIhBNwdSb+qqvqx2+0+XVxc'+
		'fIvAm+l0+sHM6PV6SEISOWdSSoQQ6HQ6mBm73Y7tdntye3v79urq6utsNjsJwHuA9XrdJi8WC9wd'+
		'gKqqCCGQUqKua9zdgHh2dvb86OjoSwD6AJJIKZFzBiDnTAiBqqpwd5qmaWM3Nzd0Oh3qun4Sgac5'+
		'ZyTRNA0AZn/txxgxM5qmoWmaVqEkNpsNkixKikVuSgmA8XhMjJEQAjln6rqmkEjC3UkpIYkIWAms'+
		'VivMDDOjqirMjJxzK72g2+0ePIC74+70+33uozCW3d1bW5II5ZKkfybvr4L7Fg4kSmqLuM9eZqOc'+
		'67o+tAAwGo34HyyXS3LOuDvRzA5YLi8vH0yeTCaklNqWxyK1YDgcPqrA3Vs7UZLuxhOA6+vrB5MH'+
		'g0H7TyQpSvqZUnp5enqKmTGdTh9VcHx8XOq2sfPz88+SXkt6B3T327Zfm3vtlKTfZvb9D8GffoH9'+
		'ICdfAAAAAElFTkSuQmCC';
	
	addElements = document.getElementsByTagName("h3")[0];
	
	addElements.appendChild(saveImgOn);
	addElements.appendChild(saveImgOff);
	
	addElements.getElementsByClassName("saveImg")[0].addEventListener('click' , saveSwitch , false)
	addElements.getElementsByClassName("saveImg")[1].addEventListener('click' , saveSwitch , false)
	
	var illustKey = "pixivIlstId_"+illustId;
	var illustSaveCheck = GM_getValue(illustKey, false);
	
	imgSwitch(illustSaveCheck);
}

function saveSwitch(){
	var xx = document.URL.match(/illust_id=(\d+)/);
	var illustKey = "pixivIlstId_"+RegExp.$1;
	
	var illustSaveCheck = GM_getValue(illustKey,false);
	
	if(illustSaveCheck == true){
		GM_setValue(illustKey, false);
		illustSaveCheck = false;
	}else{
		if(!document.getElementsByClassName("works_display")[0].getElementsByTagName("a")[0].href.match(/mode\=manga/)){
			saveImage();
		}
		GM_setValue(illustKey, true);
		illustSaveCheck = true;
	}
	
	imgSwitch(illustSaveCheck);
}

function imgSwitch(illustSaveCheck){
	var addElements;
	addElements = document.getElementsByTagName("h3")[0];
	
	if(illustSaveCheck == true){
		addElements.getElementsByClassName("saveImg")[0].style.display = "inline";
		addElements.getElementsByClassName("saveImg")[1].style.display = "none";
	}else{
		addElements.getElementsByClassName("saveImg")[0].style.display = "none";
		addElements.getElementsByClassName("saveImg")[1].style.display = "inline";
	}
}

function saveImage(){
	var xx = document.URL.match(/illust_id=(\d+)/);
	var bigIllustURL = "http://www.pixiv.net/member_illust.php?mode=big&illust_id=" + RegExp.$1;
	
	var httpObj = new XMLHttpRequest()
	httpObj.open("GET",bigIllustURL,true);
	httpObj.onreadystatechange = function(){
		if (httpObj.readyState==4){
			if(httpObj.status==200){
				var responseText = httpObj.responseText;
				xx = responseText.match(/\<img src\=\"(.+)\" *border\=\"0\"\>/);
				var imgURL = RegExp.$1;
				window.open(imgURL);
			}
		}
	}
	httpObj.send(null);
}

if(document.body){
	init();
}
