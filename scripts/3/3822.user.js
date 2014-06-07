// ==UserScript==
// @name           Douban Friends Menu
// @namespace      
// @description    Make a Popup Menu of your Douban Friends
// @include        http://www.douban.com/*
// ==/UserScript==

const LOADING_IMG ="data:image/gif,GIF89a%10%00%10%00%A2%07%006f%BF%24e%D4Vy%BA%93%A3%C4u%8E%BF%B1%B9%C9%BD%BF%C3%FF%FF%FF!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%03Cx%BA%07%C0%909%17W%08m%1E!%E0%BD%D9%C6u%D6%C7%8Cd%19q%8CaT%0BA%1C%AE%0B%CBr%FDV%F8l%C3%07Yk%C7%18%0C%20%BA%A2%F1%B8H%16%0A%87%25%B3%F9z%3E%A3%D3%88%15%0A%5C%5C%23%09%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%03%3Fx%BA'%C2%909%17%17%00m%1EB%E0%BD%D9%C6u%D6%C7%8Cd%19qL%10T%CB0%1C%AE%0B%CBr%FDV%F8l%C3%07%19pQ(%0C%89E%23%CC%608%24%95%11%26%D3%09%8DJ%8F%8Ai%24%01%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%10%00%0E%00%00%03%3Bx%BAG%C4%909%17%97%10m%9E1%E0%BD%D9%C6u%D6%C7%8Cd%19q%0C%00TKQ%1C%AE%0B%CBr%FDV%F8l%C3%07%19%23%10%88%18%0C%10%22%91q%3C%0E%95%CCf%B2%08q*%12%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%03%3Ex%BA7%C3%909%17%17!m%9ER%E0%BD%D9%C6u%D6%C7%8Cd%19q%8C%20T%8Ba%1C%AE%0B%CBr%FDV%F8l%C3%07%19%03%00%00%0E%89E%E3%01Y%0C%04%8C%C4%83%D3%A9%94N%AB%D6J%02%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%0E%00%10%00%00%03%3Cx%BAW%C5P9%17%CF%18m%1Ec%D6%BD%D9%C6u%D6%C7%8Cd%19q%0AAT%8C%EB%C2%ADL%D77%23%08Q%10%2C%BB%1D%C3%E7S%04y%00%C0%81%F83%22%93%CAb%04%AA%BC%25!%09%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%03%3Ex%BAg%C6%909%17W)m%D6so%DE%5C%072%DEx%0C%C3%18%04'%9AV%EB%EA%BEQ%CC%A2*%BB%10D%04%00%10%1E%8F%F1%FB1%84%3D%81%E0P%04%1E%93%CA%A5q%13%5D%9A%0E%CAJ%02%00!%F9%04%05%00%00%07%00%2C%00%00%02%00%10%00%0E%00%00%03%3Exj%A6~!%BC%C3%D8%8B%F1%D5%E6%B0%D4%DC%F5)E1M%00p%94%E5%A9%A4)k%BA%B0%DA%BA%AF%EA%0C%C3)%08%13%1E%EF%F1%FB%3D%84%3D%02%E1P%04%1E%93%CA%A5%11%17%5D%E2%1EJW%02%00!%F9%04%05%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%03%3Ex%BA%17%C1%909%17%E3%7C%00%D4Es%DE%8C%A7%81%CB%B7%18%06)%08%07%8An%EB%EA%A6U%CC%BE%E0%CA%14ED%10%10%1E%8F%F1%FB%ED%84%87%C1%E0P%04%1E%93%CA%A5q%13%5D%92%14%CAJ%02%00%3B";
const friendslinktext = decodeURI("%E5%8F%8B%20%E9%82%BB");
const friendh2tagtext = decodeURI("%E7%9A%84%E5%8F%8B%E9%82%BB(");
const updatingtext = "loading...";
var myname = ""
var ismouseout = true;

function xpath(dom, query) {
  return dom.evaluate(query, document, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getFriends(fd, hpurl) {
	GM_xmlhttpRequest({
    method: 'GET',
    url: hpurl,
    onload: function(responseDetails) {
        if (responseDetails.status == 200) {
        	var tmp = document.createElement('div');
        	tmp.innerHTML = responseDetails.responseText;
        	var arr = tmp.getElementsByTagName("h2");
        	var friendstable = null;
        	for (var i=0; i<arr.length; ++i) {
        		if (arr[i].textContent.indexOf(friendh2tagtext)!=-1)
        		{
        			friendstable = arr[i].nextSibling.nextSibling;
        			break;
        		}
        	}
        	fd.innerHTML = "";
        	if (friendstable == null)
        	{
        		fd.innerHTML = "empty";
        		return;
        	}
        	arr = friendstable.getElementsByTagName("a");
        	var l = new Array();
        	for (var i=0; i<arr.length; ++i) {
        		if (arr[i].firstChild.nodeType==3 && arr[i].search=="") l.push(i);
        	}
        	for (var i=l.length-1; i>=0; --i) {
        		username = arr[l[i]].pathname.split('/')[2];
        		addFriendDiv(arr[l[i]], username, false);
        		fd.appendChild(arr[l[i]]);
        		fd.appendChild(document.createElement('br'));
        	}
        }
      	else {fd.parentNode.removeChild(fd);}
      }
    });
}
function generateFriendsDiv(username, ismyname) {
	var fd = document.createElement('div');
  fd.insertBefore(document.createTextNode(' '+updatingtext), fd.firstChild);
  var loadingimg = document.createElement('img');
  loadingimg.src = LOADING_IMG;
  fd.insertBefore(loadingimg, fd.firstChild);
	var hpurl = "http://www.douban.com/people/"+username+"/";
	if (ismyname) hpurl += "mirror";
	getFriends(fd, hpurl);
	return fd;
}

function findPosition(alink)
{
   if(alink.offsetParent)
   {
      for(var posX = 0, posY = 0; alink.offsetParent; alink = alink.offsetParent)
      {
         posX += alink.offsetLeft;
         posY += alink.offsetTop;
      }
      return [posX, posY];
   }
   else
   {
      return [alink.x, alink.y];
   }
}

function hideDiv(alink) {
	if (alink.childNodes.length >= 2) {
		while (alink.childNodes.length > 2) alink.removeChild(alink.lastChild);
		alink.lastChild.style.display = "none";
	}
}

function isInRect(event, alink) {
	var mpos = findPosition(alink);
	return event.clientX+window.scrollX >= mpos[0] && event.clientX+window.scrollX <= mpos[0]+alink.scrollWidth
				&& event.clientY+window.scrollY >= mpos[1] && event.clientY+window.scrollY <= mpos[1]+alink.scrollHeight;
}

function addFriendDiv(alink, username, isfirstdiv) {
	var ismyname = (username == myname);
	var hpurl = "http://www.douban.com/people/"+username+"/";
	if (ismyname && !isfirstdiv) hpurl += "mirror";
	if (isfirstdiv) hpurl += "contacts";
	alink.href = "javascript:;"
	alink.addEventListener('click', function(event) {
			if (isInRect(event, alink)) window.location.href = hpurl;
		}, 
	false);
	alink.addEventListener('mouseover', function(event) {
			if (!isInRect(event, alink)) return;
		  if (!isfirstdiv) {
				var arr = alink.parentNode.getElementsByTagName('a');
				for (var i=0; i<arr.length; ++i) hideDiv(arr[i]);
			}
			if (alink.childNodes.length == 1) {
				var fd = generateFriendsDiv(username, ismyname);
				var baseStyle = "background-color:#FFFFFF;position:absolute;z-index:999;border-style:solid;border-color:#000000;border-width:1px;padding:4px;padding-left:20px";
				fd.setAttribute("style", baseStyle);
				var mpos = findPosition(alink);
	   		var mx = mpos[0];
	   		var my = mpos[1];
	   		if (!isfirstdiv) {
	   			mx = alink.offsetLeft;
	   			my = alink.offsetTop;
	   		}
	   		fd.style.left = (mx + alink.scrollWidth/2) + 'px';
	   		fd.style.top = (my + alink.scrollHeight/2) + 'px';
				alink.appendChild(fd);
			}
			else {
				while (alink.childNodes.length > 2) alink.removeChild(alink.lastChild);
				alink.lastChild.style.display = "";
			}
			ismouseout = false;
	}, true);
	alink.addEventListener('mouseout', function(event) { ismouseout = true; }, true);
	document.addEventListener('click', function(event) {
			if (!ismouseout) return;
			hideDiv(alink);
	}, true);
}

alinks = xpath(document, "//a[text()='"+friendslinktext+"']");
if (alinks.snapshotLength==0) return;

alink = alinks.snapshotItem(0);
myname = alink.pathname.split('/')[2];
addFriendDiv(alink, myname, true);




