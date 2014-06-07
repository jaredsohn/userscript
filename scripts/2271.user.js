// ==UserScript==
// @name          YQ
// @namespace     http://yq.search.yahoo.com/
// @description   The power of Yahoo's YQ Search. Select text. Click on the icon. See Search Results.
// @include       *
// ==/UserScript==

var ogmYQOverlay = null;
var ogmYahoo = null;
var ogmYQLink = null;
var ogmYQImg = null;
var ogmSel = null;
var ogmX = null;
var ogmX1 = null;
var ogmX2 = null;
var ogmY = null;
var ogmY1 = null;
var ogmY2 = null;
var ogmTimeId = null;
var ogmInput = null;

var specialYDomains = new Array();
specialYDomains[specialYDomains.length] = "mail.yahoo.com";


if(!unsafeWindow.versionYQ || unsafeWindow.versionYQ() < "2.0") {
        window.addEventListener("mouseup",gmShowYQIconD,false);
        window.addEventListener("keydown",gmYQKeyDown,false);
}

function gmYQKeyDown(evt) {
        if(evt.keyCode == 65)
        {
		if(document.location)
		{
			if(document.location.toString().indexOf('http://yq.search.yahoo.com/yq/search?') != '-1') 
				return;
		}

                ogmX = self.pageXOffset + (self.innerWidth/2);
                ogmY = self.pageYOffset + (self.innerHeight/2);
                ogmX1 = self.innerWidth/2;
                ogmY1 = self.innerHeight/2;

                ogmYQLink = document.getElementById("yschyqlk");
               	if(ogmYQLink)
                       	window.setTimeout(gmShowYQIcon,0);
               	else
                       	window.setTimeout(gmShowYQIcon,500);
        }
	else if(evt.keyCode == 27)
	{
		var domainStr = document.domain;
                if(domainStr.indexOf('.yahoo.com.')=='-1' && (domainStr.indexOf('.yahoo.com')!='-1' || domainStr.indexOf('yahoo.com') == 0))
		{
		      ogmYahoo = null;
		      var isspydomain = false;
		      var ishttps = false;
		      for (var n in specialYDomains)
		      {
		          if(domainStr.indexOf(specialYDomains[n]) != '-1')
			  {
				isspydomain = true;
				break;
		          }
		      }

                      if(document.location.toString().indexOf('https://') == '0')
                        ishttps = true;

                      if(!isspydomain && !ishttps)
                      {
                        document.domain = 'yahoo.com';
                        ogmYahoo = 'yahoo.com';
                      }
		}

		if(ogmYahoo)
		{
			gmCloseYQ();
		}
	}

}

function gmCloseYQ() {
        if(!ogmYQOverlay)
	        ogmYQOverlay = parent.document.getElementById("yschyqifgm");

	if(ogmYQOverlay)
		parent.document.body.removeChild(ogmYQOverlay);
}

function gmOnloadYQOvl() {
		if(!ogmYQOverlay)	
			ogmYQOverlay = parent.document.getElementById("yschyqifgm");
                docHeight=ogmYQOverlay.contentWindow.document.getElementById('yschmarker').offsetTop;
                if(navigator.userAgent.indexOf("Firefox/1.5") != '-1')
                {
                        docHeight = docHeight + 2;
                }
                else
                {
                        docHeight = docHeight + 2;
                }

	        var moveX = ogmX;
		var moveY = ogmY;
                if((ogmY1 + docHeight) > parent.innerHeight - 30)
                {
                        moveY = ogmY - ogmY1 - docHeight + parent.innerHeight - 30;
			if(moveY < 25)
				moveY = 25;
                }

                if((ogmX1 + 354) > parent.innerWidth - 30)
                {
                        moveX = ogmX - ogmX1 - 354 + parent.innerWidth - 30;
                        if(moveX < 25)
                                moveX = 25;
                }
                ogmYQOverlay.style.top = moveY + "px";
                ogmYQOverlay.style.left = moveX + "px";
                ogmYQOverlay.setAttribute('height',docHeight);

		var oIcon = ogmYQOverlay.contentWindow.document.getElementById('yschyqresulticontb');
		oIcon.style.zIndex = 99999;
		// add moveability to open objects
		oIcon = ogmYQOverlay.contentWindow.document.getElementById('yschyqresulticontb');
		oIcon.addEventListener("mousedown",gmYQMouseDown,false);
		oIcon.addEventListener("mouseup",gmYQMouseUp,false);
		window.document.addEventListener("selectstart",function(){return false},false);
		oIcon.addEventListener("selectstart",function(){return false},false);
}

function gmYQMouseDown(evt) {
	if(!ogmYQOverlay)
        	ogmYQOverlay = parent.document.getElementById("yschyqifgm");
        var oIcon = ogmYQOverlay.contentWindow.document.getElementById('yschyqresulticontb');
	ogmX2=ogmYQOverlay.offsetLeft;
	ogmY2=ogmYQOverlay.offsetTop;
	ogmX1=evt.clientX;
	ogmY1=evt.clientY;
	oIcon.addEventListener("mousemove",gmYQMouseMove,false);
}

function gmYQMouseMove(evt) {
	if(!ogmYQOverlay)
        	ogmYQOverlay = parent.document.getElementById("yschyqifgm");
        ogmX2=evt.clientX+ogmX2-ogmX1;
        ogmY2=evt.clientY+ogmY2-ogmY1;
        ogmYQOverlay.style.left=ogmX2+"px"; // move it to new place
        ogmYQOverlay.style.top=ogmY2+"px";
	return false;
}

function gmYQMouseUp(evt) {
	if(!ogmYQOverlay)
        	ogmYQOverlay = parent.document.getElementById("yschyqifgm");
	ogmX2=evt.clientX+ogmX2-ogmX1;
	ogmY2=evt.clientY+ogmY2-ogmY1;
        ogmYQOverlay.style.left=ogmX2+"px"; // move it to new place
        ogmYQOverlay.style.top=ogmY2+"px";
	var oIcon = ogmYQOverlay.contentWindow.document.getElementById('yschyqresulticontb');
        oIcon.removeEventListener("mousemove",gmYQMouseMove,false);
}

function gmYQtextSelected(noesc) {
        var w=window;
        var str =null;
        var rng;
        if(w.getSelection) {
                str = w.getSelection(); 
        }
        else if(w.document.getSelection){
                str=w.document.getSelection();
        }
        else if(w.document.selection.type=="Text" ){
                rng=w.document.selection.createRange();
		str=rng.text;
        }

        if(str && str.toString().length > 512)
        {
	        str= str.toString().substring(0,512);
        }

        if(str && !noesc)
        {
                if(encodeURIComponent)
                        str = encodeURIComponent(str);
                else
                        str = escape(str);
        }

        return str;
}

function gmShowYQIconD(evt) {
	if(document.location)
	{
		if(document.location.toString().indexOf('http://yq.search.yahoo.com/yq/search?') != '-1')
			return;
	}

        ogmX = evt.pageX;
        ogmY = evt.pageY;
        ogmX1 = evt.clientX;
        ogmY1 = evt.clientY;

        ogmYQLink = document.getElementById("yschyqlk");
  	if(ogmYQLink)
		window.setTimeout(gmShowYQIcon,0);
	else
		window.setTimeout(gmShowYQIcon,500); 
}

function gmShowYQIcon() {
	if(document.location)
	{
		if(document.location.toString().indexOf('http://yq.search.yahoo.com/yq/search?') != '-1') 
			return;
	}

	var str = gmYQtextSelected(null);
        var searchStr = gmYQtextSelected('1');

        if(!str && ogmInput && document.getElementById('yschyqresult'))
        {
                return;
        }

	ogmYQLink = document.getElementById("yschyqlk");

	if(!str && !ogmInput)
	{
        	if(ogmYQLink)
        	{
                	document.body.removeChild(ogmYQLink);
                	if(ogmTimeId)
                        	window.clearTimeout(ogmTimeId);
        	}
		ogmSel = null;
	}

        if(!str && ogmInput)
        {
                if(ogmTimeId)
                        window.clearTimeout(ogmTimeId);
		if(ogmYQImg)
		{
                	ogmInput.removeChild(ogmYQImg);
			ogmYQImg = null;
		}
		ogmSel = null;
        }
	else if(str && (!ogmSel || str != ogmSel))
	{
	        if(ogmInput && document.getElementById('yschyqresult'))
        	{
                        if(!document.getElementById('yschyqlkold'))
                        {
                                ogmYQLink.id = 'yschyqlkold';
                                ogmYQLink = null;
                        }
        	}

		var strTitle = searchStr;
		if(strTitle.toString().length > 25)
			strTitle = strTitle.toString().substring(0,25) + '...';
                if(ogmYQLink)
                {
	                document.body.removeChild(ogmYQLink);
                	if(ogmTimeId)
                		window.clearTimeout(ogmTimeId);
                }

		ogmSel = str;
		//The text here seems to be UTF-8 encoded
		str = str + '&ei=UTF-8&sourceURL='+escape(document.location);
              	/* if(document.characterSet)
               	{
                       	str = str + '&ei='+escape(document.characterSet)+'&sourceURL='+escape(document.location);
               	}
               	else
               	{
                       	str = str + 'ei=UTF-8&sourceURL='+escape(document.location);
               	}*/

                var ogmYQEn = false;
                if(unsafeWindow.activateYQinl || unsafeWindow.activateYQ || unsafeWindow.versionYQ)
                        ogmYQEn = true;

		str = 'http://yq.search.yahoo.com/search?p='+str;

                var moveY = ogmY + 50;
                var moveX = ogmX + 50;

                if(ogmY1  > (self.innerHeight - 120))
                	moveY = ogmY - ogmY1 + self.innerHeight - 120;
                if(moveY < 0)
                        moveY = 0;

                if(ogmX1 > (self.innerWidth - 120))
                        moveX = ogmX - ogmX1 + self.innerWidth - 120;

                if(moveX < 0)
                        moveX = 0;
            
		if(ogmY1 < 0) 
			moveY = moveY - ogmY1;

                if(ogmX1 < 0) 
                        moveX = moveX - ogmX1;

		if(ogmYQEn)
		{
                        ogmYQLink = document.createElement("span");
                        ogmYQLink.id = 'yschyqlk';
                        ogmYQLink.className = 'yqlink';
                        ogmYQLink.name = 'yqlink';

                        ogmYQLink.setAttribute("style", "position:absolute;");

                        ogmYQLink.style.left = moveX + "px";
                        ogmYQLink.style.top = moveY + "px";

                        ogmYQLink.style.zIndex = 99998;
                        document.body.appendChild(ogmYQLink);

                        ogmYQForm = document.createElement('form');
                        ogmYQForm.id = 'yqin';
                        ogmYQForm.className='yqin';
                        ogmYQForm.name = 'yqin';
			ogmYQForm.action = 'http://yq.search.yahoo.com/search';
			ogmYQForm.method = 'post';
			ogmYQLink.appendChild(ogmYQForm);

                        ogmInput = document.createElement('input');
                        ogmInput.type = 'hidden';
                        ogmInput.name='p';
                        ogmInput.value=searchStr;
                        ogmYQForm.appendChild(ogmInput);

                        ogmInput = document.createElement('input');
                        ogmInput.type = 'hidden';
                        ogmInput.name='ei';
			if(document.characterSet)
				ogmInput.value=document.characterSet;
			else
				ogmInput.value='UTF-8';
                        ogmYQForm.appendChild(ogmInput);

                        ogmInput = document.createElement('input');
                        ogmInput.type = 'hidden';
                        ogmInput.name='eo';
                        if(document.characterSet)
                                ogmInput.value=document.characterSet;
                        else
                                ogmInput.value='UTF-8';
                        ogmYQForm.appendChild(ogmInput);

                        ogmInput = document.createElement('input');
                        ogmInput.type = 'hidden';
                        ogmInput.name='sourceOrder';
                        ogmInput.value='s,a,i,img,y,m';
                        ogmYQForm.appendChild(ogmInput);

                        ogmInput = document.createElement("a");
			ogmInput.href = str;
			ogmInput.title = "Yahoo! Search Results for " + strTitle;
			ogmInput.id = 'yschyqimglink';
			ogmInput.addEventListener("mousedown",function(event){ gmSubmitYQEn(event); } ,true);
			ogmInput.setAttribute('style','height:22px;width:36px;border:0;color:white;');

                        ogmYQImg = document.createElement("img");
                        ogmYQImg.id = 'yschyqimg';
                        ogmYQImg.className = 'yschyqimg';
                        ogmYQImg.name = 'yschyqimg';
                        ogmYQImg.src = "data:image/gif,GIF89a%1E%00%14%00%DD%00%00%D1%D1%D1%9A%00%B4%FE%FE%FE%DE%DE%DF%FD%FD%FD%E3%E3%E3%E0%E0%E1%F8%F8%F8%FB%FB%FB%DC%DC%DD%E9%E9%E9%F5%F5%F5%F3%F3%F3%EA%EA%EB%E5%E5%E5%F7%F7%F7%E7%E7%E7%ED%ED%EE%E8%D0%ED%F3%F3%EA%EE%EE%EF%D7%D7%D7%E9%E9%E2%F1%F1%F1%B5%B5%B5%AEP%C3%8E%8E%8E%D0%9E%DB%BDs%CC%A2%25%B8%C4%82%D1%EE%EE%E7%EE%EE%E6%EB%EB%E3%EE%E0%F3%B6c%C8%CA%92%D6%DB%B8%E4%F6%EE%F8%E2%C4%E8%A9%3D%BD%F0%F1%E8%F1%F3%E9%FF%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2B%00%2C%00%00%00%00%1E%00%14%00%00%06%FF%C0U%05%40%2C%1A%8FH%A4P!h%3A%9F%D0(T1%24X%AF%D8%ACvKDx%BF%E0%B0xL%3C%98%CF%E8%B4zM%7C%3C%26%13%89%A7%13%08t8%12%F8%A4%1Ep%FB%FF%0FD%0B%0B%13%25%7C%87%01%24p%7C%83%8D%8E%0BD%0C%0C%12%01%12M%12%19%87'%7B%01%23%92%9F%A0%0CD%17%17%1Cu%1E%02%1B%01%26%02%22%01%19*u%1B%A4%18%1A%B6%1A%18%A4D%14%14tu%25%02%1C%02%24%7C)%99%12%BC%14%B5%B8%C9D%11%11%BEu%22%A9%87%1F%23%01%1F%CF%CF%18%18%DA%11D%0D%0D%A6%7C%1B%02%87%19%1F%1E%E8%E1%EC%ED%0DD%0A%0A%94u%12%AC%22%AA%01'%20%FB%20%F1%FE%FF%0A%88%40%80%10%C2%10%A2%3A%24B%84%E8%14b%A0%C3%87%10%888p%60%C1%82%08%0F(%EA%DC%91P%D1%02%8A%0C%16%26%8A%1C%E9%80H%81%93(S%AA%5C%C9%92%88%81%970c%CA%9CI%93%C8%80%9B8s%EA%DC%C9%13%40%85%12%0A%09%82%0A%1DJ%B4(%D1%9FB%92(%5DZdE%10%00%3B";
			ogmYQImg.setAttribute("style", "border:none;");
                        ogmYQImg.style.zIndex = 99997;
			ogmYQLink.appendChild(ogmInput);
                        ogmInput.appendChild(ogmYQImg); 

                        ogmTimeId = window.setTimeout(gmRemoveYQIcon,5000);
		}
		else
		{
			//need onclick here, instead of event listeners, YQ popup has Javascript in it. set href for fallback
			ogmYQLink = document.createElement("a");
			ogmYQLink.id = 'yschyqlk';
			ogmYQLink.className = 'yschyqlk';
			ogmYQLink.name = 'yschyqlk';
			ogmYQLink.setAttribute('searchStr',searchStr);

			ogmYQLink.href=str;
			ogmYQLink.title = "Yahoo! Search Results for " + strTitle;
                        ogmYQLink.addEventListener("click",function(event){ gmSubmitYQ(event); return false; },true);
                	ogmYQLink.setAttribute("style", "position:absolute;");

                        ogmYQLink.style.left = moveX + "px";
                        ogmYQLink.style.top = moveY + "px";

			ogmYQLink.style.zIndex = 99998;

                	ogmYQImg = document.createElement("img");
                	ogmYQImg.id = 'yschyqimg';
                	ogmYQImg.className = 'yschyqimg';
                	ogmYQImg.name = 'yschyqimg';
			ogmYQImg.setAttribute("style", "border:none;");
                        ogmYQImg.src = "data:image/gif,GIF89a%1E%00%14%00%DD%00%00%D1%D1%D1%9A%00%B4%FE%FE%FE%DE%DE%DF%FD%FD%FD%E3%E3%E3%E0%E0%E1%F8%F8%F8%FB%FB%FB%DC%DC%DD%E9%E9%E9%F5%F5%F5%F3%F3%F3%EA%EA%EB%E5%E5%E5%F7%F7%F7%E7%E7%E7%ED%ED%EE%E8%D0%ED%F3%F3%EA%EE%EE%EF%D7%D7%D7%E9%E9%E2%F1%F1%F1%B5%B5%B5%AEP%C3%8E%8E%8E%D0%9E%DB%BDs%CC%A2%25%B8%C4%82%D1%EE%EE%E7%EE%EE%E6%EB%EB%E3%EE%E0%F3%B6c%C8%CA%92%D6%DB%B8%E4%F6%EE%F8%E2%C4%E8%A9%3D%BD%F0%F1%E8%F1%F3%E9%FF%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2B%00%2C%00%00%00%00%1E%00%14%00%00%06%FF%C0U%05%40%2C%1A%8FH%A4P!h%3A%9F%D0(T1%24X%AF%D8%ACvKDx%BF%E0%B0xL%3C%98%CF%E8%B4zM%7C%3C%26%13%89%A7%13%08t8%12%F8%A4%1Ep%FB%FF%0FD%0B%0B%13%25%7C%87%01%24p%7C%83%8D%8E%0BD%0C%0C%12%01%12M%12%19%87'%7B%01%23%92%9F%A0%0CD%17%17%1Cu%1E%02%1B%01%26%02%22%01%19*u%1B%A4%18%1A%B6%1A%18%A4D%14%14tu%25%02%1C%02%24%7C)%99%12%BC%14%B5%B8%C9D%11%11%BEu%22%A9%87%1F%23%01%1F%CF%CF%18%18%DA%11D%0D%0D%A6%7C%1B%02%87%19%1F%1E%E8%E1%EC%ED%0DD%0A%0A%94u%12%AC%22%AA%01'%20%FB%20%F1%FE%FF%0A%88%40%80%10%C2%10%A2%3A%24B%84%E8%14b%A0%C3%87%10%888p%60%C1%82%08%0F(%EA%DC%91P%D1%02%8A%0C%16%26%8A%1C%E9%80H%81%93(S%AA%5C%C9%92%88%81%970c%CA%9CI%93%C8%80%9B8s%EA%DC%C9%13%40%85%12%0A%09%82%0A%1DJ%B4(%D1%9FB%92(%5DZdE%10%00%3B";
                	ogmYQImg.style.zIndex = 99997;
                	ogmYQLink.appendChild(ogmYQImg);
			document.body.appendChild(ogmYQLink);
			ogmTimeId = window.setTimeout(gmRemoveYQIcon,5000);
		}
	}
} 

window.gmRemoveYQIcon = function() {
	ogmYQLink = document.getElementById("yschyqlk");
	if(ogmYQLink)
	{
		document.body.removeChild(ogmYQLink);
		ogmYQImg = null;
	}
	ogmSel = null;
}

function gmSubmitYQEn(evt) {
        if(ogmTimeId)
                window.clearTimeout(ogmTimeId);

	if(document.getElementById('yschyqlkold'))
		document.body.removeChild(document.getElementById('yschyqlkold'));

	if(ogmYQImg)
	{
		ogmInput.removeChild(ogmYQImg);
		ogmYQImg = null;
	}
	unsafeWindow.activateYQinl(ogmInput);
	return false;
}

function gmSubmitYQ(evt) {
	var ogmStr = null;
	var str;

        ogmYQLink = document.getElementById("yschyqlk");
        if(ogmYQLink)
        {
		ogmStr = ogmYQLink.getAttribute('searchStr');
		document.body.removeChild(ogmYQLink);
		if(ogmTimeId)
			window.clearTimeout(ogmTimeId);
        }

	if(ogmStr)
        {
                if(encodeURIComponent)
                        str = encodeURIComponent(ogmStr);
                else
                        str = escape(ogmStr);

	        ogmYahoo = null;

		var domainStr = document.domain;
        	if(domainStr.indexOf('.yahoo.com.')=='-1' && (domainStr.indexOf('.yahoo.com')!='-1' || domainStr.indexOf('yahoo.com') == 0))
        	{
		      var isspydomain = false;
                      var ishttps = false;

                      for (var n in specialYDomains)
                      {
                          if(domainStr.indexOf(specialYDomains[n]) != '-1')
				isspydomain = true;
                      }

                      if(document.location.toString().indexOf('https://') == '0')
                        ishttps = true;
			
		      if(!isspydomain && !ishttps)
		      { 
			document.domain = 'yahoo.com';
			ogmYahoo = 'yahoo.com';
		      }
        	}
		//The text here seems to be UTF-8 encoded
                str = str + '&_tb=gm&ei=UTF-8&sourceOrder='+escape('s,a,i,img,y,m')+ '&sourceURL='+escape(document.location);

                /*if(document.characterSet)
                {
                }
                else
                {
                        str = str + '&_tb=gm&ei=UTF-8&sourceOrder='+escape('s,a,i,img,y,m')+ '&sourceURL='+escape(document.location);
                }*/

		if(!ogmYahoo)
		{
	        	if(ogmYQOverlay)
                		ogmYQOverlay.close();

               		ogmYQOverlay = window.open('http://yq.search.yahoo.com/yq/search?_ext=1&p='+str,'_blank','width=353px,menubar=0,toolbar=0,personalbar=0,titlebar=1,status=1,height=329,location=0,resizable=1,scrollbars=0,directories=0,dependent=1,left='+ogmX+',top='+ogmY);
		}
		else
		{
			str = 'http://yq.search.yahoo.com/yq/search?p='+str;

                        ogmYQOverlay = window.document.getElementById("yschyqifgm")
                        if(ogmYQOverlay)
                                window.document.body.removeChild(ogmYQOverlay);

                        ogmYQOverlay = window.document.createElement('iframe');
                        ogmYQOverlay.id = 'yschyqifgm';
                        ogmYQOverlay.className = 'yschyqifgm';
                        ogmYQOverlay.name = 'yschyqifgm';
                        ogmYQOverlay.setAttribute('src',str);
                        ogmYQOverlay.setAttribute('scrolling','no');
                        ogmYQOverlay.setAttribute('frameBorder',0);
                        ogmYQOverlay.setAttribute('allowtransparency','true');
                        ogmYQOverlay.setAttribute('style','position:absolute;-moz-opacity:0.96;background-color:white;');
                        ogmYQOverlay.style.left = ogmX + "px";
                        ogmYQOverlay.style.top = ogmY + "px"; 
			ogmYQOverlay.setAttribute('height',316);
                        ogmYQOverlay.setAttribute('width',354);
                        ogmYQOverlay.style.zIndex = 999999;
                        ogmYQOverlay.addEventListener("load",gmOnloadYQOvl,false);
                        window.document.body.appendChild(ogmYQOverlay);
                        ogmYQOverlay.setAttribute('visibility','visible');
                }
	}
	return false;
}

