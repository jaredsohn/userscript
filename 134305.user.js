/*

Following code belongs to Google+ App for Web.
Copyright (C) 2012 Jackson Tan
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             GPAW
// @name         Google+ App for Web
// @version        0.2.2
// @namespace      gplus.webapp
// @author         Jackson Tan
// @description    This extension brings a app-style Google+ from your phone to your browser. More features are waiting for you to discover!
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

var css_Main = ".bF {\nfont-size: 14px;\nz-index: 1;\nposition: relative;\n}\n\n.bF.cE {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 14px;\nz-index: 1;\ntext-shadow: 1px 1px 5px black;\nposition: relative;\n}\n\n.XE {\ndisplay: none;\n}\n\n.cF {\nwidth: 100%;\n}\n\n.gi.md {\ncolor: rgba(248, 252, 248, 1);\nfont-weight: normal !important;\n}\n\n.RG {\nposition: relative;\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\nz-index: 1;\ntext-shadow: 1px 1px 5px black;\n}\n\n.RG>.gi.md {\ncolor: #222;\n}\n\n.Xl.Zb.QG {\ndisplay: none;\n}\n\na {\ncolor: rgba(48, 188, 216, 1);\ncursor: pointer !important;\ntext-decoration: none !important;\n}\n\na:hover, a:active {\ncolor: rgba(48, 188, 216, 1) !important;\ncursor: pointer !important;\ntext-decoration: none !important;\n}\n\n.a-o {\ncolor: rgba(48, 188, 216, 1);\ncursor: pointer !important;\ntext-decoration: none !important;\n}\n\n.Op {\npadding: 0 0 0 0 !important;\n}\n\n.HA.Op {\ncolor: rgba(112, 116, 112, 1);\nfont-size: 16px;\ntext-shadow: 1px 1px 5px rgba(248, 252, 248, 1);\n}\n\n.Hn, .In {\ncolor: rgba(112, 116, 112, 1);\nfont-size: 16px;\ntext-shadow: 1px 1px 5px rgba(248, 252, 248, 1);\npadding-bottom: 0px !important;\n}\n\n.sA.Hn {\nposition: relative;\nz-index: 1;\n}\n\n.sA.Hn.Ci {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\ntop: 5px;\ntext-shadow: 1px 1px 5px black;\nbackground-color: rgba(0, 0, 0, 0.15);\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\n}\n\n.sA.Hn.Ci:hover {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\ntop: 5px;\ntext-shadow: 1px 1px 5px black;\nbackground-color: rgba(0, 0, 0, 0.65);\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\n}\n\n.sA.Hn.Ck {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\ntext-shadow: 1px 1px 5px black;\ntop: 5px;\nbackground-color: rgba(0, 0, 0, 0.15);\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\n}\n\n.sA.Hn.Ck:hover {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\ntext-shadow: 1px 1px 5px black;\ntop: 5px;\nbackground-color: rgba(0, 0, 0, 0.65);\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\n}\n\n.sA.Hn.Uc {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\ntop: 5px;\ntext-shadow: 1px 1px 5px black;\nbackground-color: rgba(0, 0, 0, 0.15);\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\n}\n\n.sA.Hn.Uc:hover {\ncolor: rgba(248, 252, 248, 1);\nfont-size: 16px;\ntop: 5px;\ntext-shadow: 1px 1px 5px black;\nbackground-color: rgba(0, 0, 0, 0.65);\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\n}\n\n.sm .Hn, .sm .In {\nmargin-left: 0px !important;\n}\n\n.Gn {\nbackground-color: rgba(248, 252, 248, 1) !important;\n}\n\n.Gb {\nfont-size: 13px;\nline-height: 1.4;\n}\n\n.zh > .Cg.Gb {\n}\n\n.EG {\ncolor: rgba(248, 252, 248, 1) !important;\nfont-weight: normal;\n}\n\n.FE {\nmargin: 0 0 0 0 !important;\npadding: 8px 16px 0px 85px !important;\nfont-size: 26px;\nline-height: 0.9;\nbackground-color: rgba(60, 60, 60, 1);\nposition: relative;\nz-index: 1;\n}\n\n.a-o.rs.Ih {\nposition: relative;\nz-index: 2;\n}\n\n.EG {\ndisplay: table !important;\n}\n\n.Jd, .Gg, .Gg.h-J-o, .Jd .Gl, .fe {\nfont-size: 14px;\nmargin-left: 0px;\ncolor: #999;\n}\n\n.Gm {\npadding: 0px 17px 0 !important;\n}\n\n.Zo {\nmargin: -12px 0 0 6px !important;\nheight: 64px !important;\nwidth: 64px !important;\nposition: relative;\nz-index: 2;\n}\n\n.eZ.VI, .Xrb.DDb {\ndisplay: none;\n}\n\n.MA {\ndisplay: none;\n}\n\n.Q0a, .F9, .NHa, .E9, .MDb, .kv, .eEb, .Op, .Gm .oh {\nborder: 0px solid transparent !important;\nborder-top: 0px solid transparent !important;\nborder-bottom: 0px solid transparent !important;\nborder-left: 0px solid transparent !important;\nborder-right: 0px solid transparent !important;\n}\n\.Yd.esw, .Tj {\nborder: 1px solid transparent;\n}";

GM_addStyle(css_Main);

function replaceNewUI(content, para1, para2, para3, para4, para5, para6, para7, para8, para9){
	for(var i = 0; i < content.snapshotLength; i++) {
		var postDiv = content.snapshotItem(i);
		var postSinglePic = para1.snapshotItem(i);
		var videoPic = para2.snapshotItem(i);
		var postContent = para3.snapshotItem(i);
		var sharedBanner = para4.snapshotItem(i);
		var postTwoPics = para5.snapshotItem(i);
		var postMultiPics = para6.snapshotItem(i);
		var postThreePics = para9.snapshotItem(i);
		if(postDiv.hasAttribute("newUI")) return;
		
		if(isParent(postSinglePic, postDiv)==true && isParent(sharedBanner, postDiv)==false){
			postContent.className+=' '+'Ci';
			postContent.nextSibling.style.marginTop='-'+postContent.clientHeight+'px';
		}
		else if(isParent(postSinglePic, postDiv)==true && isParent(sharedBanner, postDiv)==true){
			postContent.className+=' '+'Uc';
			var marginTpx = postContent.parentNode.parentNode.parentNode.childNodes[1].clientHeight+postContent.clientHeight;
			postContent.nextSibling.style.marginTop='-'+marginTpx+'px';
			//postSinglePic.style.height = postSinglePic.style.maxHeight;
		}
		
		else if(isParent(videoPic, postDiv)==true && isParent(sharedBanner, postDiv)==false){
			postContent.className+=' '+'Ci';
			postContent.nextSibling.style.marginTop='-'+postContent.clientHeight+'px';
		}
		else if(isParent(videoPic, postDiv)==true && isParent(sharedBanner, postDiv)==true){
			postContent.className+=' '+'Uc';
			var marginTpx = postContent.parentNode.parentNode.parentNode.childNodes[1].clientHeight+postContent.clientHeight;
			postContent.nextSibling.style.marginTop='-'+marginTpx+'px';
		}
		
		else if(isParent(postTwoPics, postDiv)==true && isParent(sharedBanner, postDiv)==false){
			postContent.className+=' '+'Ci';
			postContent.nextSibling.style.marginTop='-'+postContent.clientHeight+'px';
			document.getElementsByClassName('bn Ag IU a-f-e')[i].style.width="495px";
			document.getElementsByClassName('bn Ag IU a-f-e')[i].style.height="330px";
			document.getElementsByClassName('bn Ag IU a-f-e')[i].parentNode.childNodes[1].style.width="495px";
			document.getElementsByClassName('bn Ag IU a-f-e')[i].parentNode.childNodes[1].style.height="330px";
		}
		else if(isParent(postTwoPics, postDiv)==true && isParent(sharedBanner, postDiv)==true){
			postContent.className+=' '+'Ci';
			var marginTpx = postContent.parentNode.parentNode.parentNode.childNodes[1].clientHeight+postContent.clientHeight;
			postContent.nextSibling.style.marginTop='-'+marginTpx+'px';
			document.getElementsByClassName('bn Ag IU a-f-e')[i].style.width="495px";
			document.getElementsByClassName('bn Ag IU a-f-e')[i].style.height="330px";
			document.getElementsByClassName('bn Ag IU a-f-e')[i].parentNode.childNodes[1].style.width="495px";
			document.getElementsByClassName('bn Ag IU a-f-e')[i].parentNode.childNodes[1].style.height="330px";
		}
		
		else if(isParent(postThreePics, postDiv)==true && isParent(sharedBanner, postDiv)==false){
			postContent.className+=' '+'Ci';
			postContent.nextSibling.style.marginTop='-'+postContent.clientHeight+'px';
			document.getElementsByClassName('bn Ag IU a-f-e KU')[i].style.width="495px";
			document.getElementsByClassName('bn Ag IU a-f-e KU')[i].style.height="330px";
			document.getElementsByClassName('bn Ag IU a-f-e KU')[i].parentNode.childNodes[0].style.width="246px";
			document.getElementsByClassName('bn Ag IU a-f-e KU')[i].parentNode.childNodes[0].style.height="200px";
			document.getElementsByClassName('bn Ag IU a-f-e KU')[i].parentNode.childNodes[1].style.width="246px";
			document.getElementsByClassName('bn Ag IU a-f-e KU')[i].parentNode.childNodes[1].style.height="200px";
		}
		
		else if(isParent(postMultiPics, postDiv)==true && isParent(sharedBanner, postDiv)==false){
			postContent.className+=' '+'Ci';
			postContent.nextSibling.style.marginTop='-'+postContent.clientHeight+'px';
		}
			
		if (typeof(document.getElementsByClassName('bn Ag aF')[i])=='object'){
		var postLinkPic = para7.snapshotItem(i);
		var linkPicURLRaw = document.getElementsByClassName('bn Ag aF')[i].childNodes[0].childNodes[1].src;
		var linkPicURLReg = /(http:\/\/[^]+)&container/gi;
		var linkPicURL = linkPicURLReg.exec(linkPicURLRaw);
		if(isParent(postLinkPic, postDiv)==true && isParent(sharedBanner, postDiv)==false){
			postContent.className+=' '+'Ck';
			postContent.nextSibling.childNodes[0].childNodes[0].className+=' '+'cE';
			document.getElementsByClassName('Gm Cs')[i].style.backgroundImage="url(" + linkPicURL[1] + ")";
			document.getElementsByClassName('Gm Cs')[i].style.backgroundSize="100%";
			document.getElementsByClassName('bn Ag aF')[i].parentNode.removeChild(document.getElementsByClassName('bn Ag aF')[i]);
			//console.warn(linkPicURL[1]);
		}
		}
		if (typeof(document.getElementsByClassName('bn Ag aF')[i])=='object'){
		var postLinkPic = para7.snapshotItem(i);
		var linkPicURLRaw = document.getElementsByClassName('bn Ag aF')[i].childNodes[0].childNodes[1].src;
		var linkPicURLReg = /(http:\/\/[^]+)&container/gi;
		var linkPicURL = linkPicURLReg.exec(linkPicURLRaw);
		if(isParent(postLinkPic, postDiv)==true && isParent(sharedBanner, postDiv)==true){
			postContent.className+=' '+'Ck';
			postContent.nextSibling.childNodes[0].childNodes[0].className+=' '+'cE';
			document.getElementsByClassName('Gm Cs')[i].style.backgroundImage="url(" + linkPicURL[1] + ")";
			document.getElementsByClassName('Gm Cs')[i].style.backgroundSize="100%";
			document.getElementsByClassName('bn Ag aF')[i].parentNode.removeChild(document.getElementsByClassName('bn Ag aF')[i]);
			//console.warn(linkPicURL[1]);
		}
		}
		
		if (typeof(document.getElementsByClassName('BG')[i])=='object'){
		var postMapPic = para8.snapshotItem(i);
		var mapPicURLRaw = document.getElementsByClassName('BG')[i].src;
		var mapPicURLReg = /(https:\/\/[^]+)&client/gi;
		var mapPicURL = mapPicURLReg.exec(mapPicURLRaw);
		mapPicURL = mapPicURL[1].replace('100x100', '640x640');
		if(isParent(postMapPic, postDiv)==true){
			postContent.className+=' '+'Ci';
			document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.style.backgroundImage="url(" + mapPicURL + ")";
			document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.style.backgroundSize="100%";
			//document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.style.minHeight = document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].clientHeight + 45 + "px";
			//if (document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].clientHeight > 20){
				//document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.childNodes[1].style.paddingTop = document.getElementsByClassName('BG')[i].parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].clientHeight -20 + "px";
			//}
			document.getElementsByClassName('BG')[i].parentNode.removeChild(document.getElementsByClassName('BG')[i]);
			console.warn(mapPicURL);
		}
		}
		postDiv.setAttribute("newUI", "uiReplaced");
	}
	delete content;
}

//Match links in all posts and appened player iframe to corresponding posts.
function processPosts(node) {
	if(!node || !node.querySelector) return;
	var postDiv = document.evaluate('descendant-or-self::div[@class="Gn"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postSinglePic = document.evaluate('descendant-or-self::div[@class="bn Ag eA"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var videoPic = document.evaluate('descendant-or-self::div[@class="bn Ag Eq kR kV Mi"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postContent = document.evaluate('descendant-or-self::div[@class="sA Hn"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var sharedBanner = document.evaluate('descendant-or-self::div[@class="RG"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postTwoPics = document.evaluate('descendant-or-self::div[@class="bn Ag IU a-f-e"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postMultiPics = document.evaluate('descendant-or-self::div[@class="bn Ag DU"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postThreePics = document.evaluate('descendant-or-self::div[@class="bn Ag IU a-f-e KU"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postLinkPic = document.evaluate('descendant-or-self::div[@class="bn Ag aF"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var postMapPic = document.evaluate('descendant-or-self::div[@class="BG"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	replaceNewUI(postDiv, postSinglePic, videoPic, postContent, sharedBanner, postTwoPics, postMultiPics, postLinkPic, postMapPic, postThreePics);
}
		
//First process of the toolbars
processPosts(document.body);
batchReplace(document.body.getElementsByClassName('Ws cF'));

//Handle newly added posts
document.body.addEventListener('DOMNodeInserted', function(e) {
	if(!e) e = event;
	processPosts(e.target);
	if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
			batchReplace(e.target.getElementsByClassName('Ws cF'));
	}
}, false);

function isParent (obj,parentObj){ 
while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){ 
if (obj == parentObj){ 
return true; 
} 
obj = obj.parentNode; 
} 
return false; 
}

function replaceImg(target) {
    if (target && target.src) {
		target.src = target.src.replace('w165-h165', 'w495-h495');
		target.src = target.src.replace('w248-h248', 'w620-h620');
		target.src = target.src.replace('w495-h495', 'w990-h990');
        target.src = target.src.replace('w497-h373', 'w994-h746');
        return target.src;
    }
}

function batchReplace(targets) {
    if (targets && targets.length)
        for (var i = 0; i < targets.length ; i++)
            replaceImg(targets[i]);
}