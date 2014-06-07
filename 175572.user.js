// ==UserScript==
// @name           KanyeToTheSMILEYS
// @namespace      http://userscripts.org/
// @description    Over 70 new smileys for KTT!
// @author         numbrz
// @include        */index.php?action=post*;topic=*
// @include        */index.php?action=post*;msg=*
// @include        */index.php?action=post*;quote=*
// @include        */index.php?action=post*;board=*
// @version        1.5
// ==/UserScript==

var smiliesUrl = GM_getValue("smilies", "|").split("|");
smiliesUrl.pop();
smiliesUrl.push("http://i.imgur.com/o8Ch3B8.png");
smiliesUrl.push("http://i.imgur.com/nWlANdm.png");
smiliesUrl.push("http://i.imgur.com/OmBjjo8.png");
smiliesUrl.push("http://i.imgur.com/X69o5lT.png");
smiliesUrl.push("http://i.imgur.com/pzFdEQf.png");
smiliesUrl.push("http://i.imgur.com/PYAizmK.png");
smiliesUrl.push("http://i.imgur.com/GpB2FaV.png");
smiliesUrl.push("http://i.imgur.com/HHIdkFi.png");
smiliesUrl.push("http://i.imgur.com/JYNwVff.png");
smiliesUrl.push("http://i.imgur.com/MM8DUTP.png");
smiliesUrl.push("http://i.imgur.com/JOyS9Ly.png");
smiliesUrl.push("http://i.imgur.com/tsJ7P2d.png");
smiliesUrl.push("http://i.imgur.com/oOibNcl.png");
smiliesUrl.push("http://i.imgur.com/zO0DP0I.png");
smiliesUrl.push("http://i.imgur.com/aACMKuB.png");
smiliesUrl.push("http://i.imgur.com/wGxRwbK.png");
smiliesUrl.push("http://i.imgur.com/5nV1DcJ.png");
smiliesUrl.push("http://i.imgur.com/iPucD0e.png");
smiliesUrl.push("http://i.imgur.com/XrjH7wL.png");
smiliesUrl.push("http://i.imgur.com/HZVsYPO.png");
smiliesUrl.push("http://i.imgur.com/k2p7Dvt.png");
smiliesUrl.push("http://i.imgur.com/CTqcWTs.png");
smiliesUrl.push("http://i.imgur.com/e1pwRr2.png");
smiliesUrl.push("http://i.imgur.com/v6Mditd.png");
smiliesUrl.push("http://i.imgur.com/UULakRX.png");
smiliesUrl.push("http://i.imgur.com/kefpk3N.png");
smiliesUrl.push("http://i.imgur.com/tIiZoUo.png");
smiliesUrl.push("http://i.imgur.com/Qgw8Z4f.png");
smiliesUrl.push("http://i.imgur.com/JBP6YO4.png");
smiliesUrl.push("http://i.imgur.com/xoE45Bo.png");
smiliesUrl.push("http://i.imgur.com/YmAa6hc.png");
smiliesUrl.push("http://i.imgur.com/YD7mbJE.png");
smiliesUrl.push("http://i.imgur.com/Z4ukMu7.png");
smiliesUrl.push("http://i.imgur.com/oqQfakf.png");
smiliesUrl.push("http://i.imgur.com/PhWEACq.png");
smiliesUrl.push("http://i.imgur.com/fEBOd7w.png");
smiliesUrl.push("http://i.imgur.com/ylfQPjy.png");
smiliesUrl.push("http://i.imgur.com/BJw7qIp.png");
smiliesUrl.push("http://i.imgur.com/hNPspY0.png");
smiliesUrl.push("http://i.imgur.com/zCwf562.png");
smiliesUrl.push("http://i.imgur.com/glSXlU4.png");
smiliesUrl.push("http://i.imgur.com/Tp8r2MY.png");
smiliesUrl.push("http://i.imgur.com/Cy5LkJe.png");
smiliesUrl.push("http://i.imgur.com/6jPJBxa.png");
smiliesUrl.push("http://i.imgur.com/TW7x5ku.png");
smiliesUrl.push("http://i.imgur.com/7sOuN5B.png");
smiliesUrl.push("http://i.imgur.com/KCeRjqo.png");
smiliesUrl.push("http://i.imgur.com/ka4krtW.png");
smiliesUrl.push("http://i.imgur.com/pKbpnGF.png");
smiliesUrl.push("http://i.imgur.com/E6gI05M.png");
smiliesUrl.push("http://i.imgur.com/IgiBbLf.png");
smiliesUrl.push("http://i.imgur.com/FkVg5hM.png");
smiliesUrl.push("http://i.imgur.com/pNkTKBP.png");
smiliesUrl.push("http://i.imgur.com/JKDzFnt.png");
smiliesUrl.push("http://i.imgur.com/rUKAPVu.png");
smiliesUrl.push("http://i.imgur.com/ngJufjE.png");
smiliesUrl.push("http://i.imgur.com/a8ETni2.png");
smiliesUrl.push("http://i.imgur.com/J7gIAel.png");
smiliesUrl.push("http://i.imgur.com/UULakRX.png");
smiliesUrl.push("http://i.imgur.com/sNhn7qE.png");
smiliesUrl.push("http://i.imgur.com/6ZCEVin.png");
smiliesUrl.push("http://i.imgur.com/5L9GXfn.png");
smiliesUrl.push("http://i.imgur.com/gHTJVfW.png?1");
smiliesUrl.push("http://i.imgur.com/PBXPHho.png");
smiliesUrl.push("http://i.imgur.com/qvxbRRb.png");
smiliesUrl.push("http://i.imgur.com/Ol38dfh.png");
smiliesUrl.push("http://i.imgur.com/p2rDoEX.png");
	function putInTxtarea(text, textarea) {
		
		if (typeof(textarea.selectionStart) != "undefined") {
			var begin = textarea.value.substr(0, textarea.selectionStart);
			var end = textarea.value.substr(textarea.selectionEnd);
			var scrollPos = textarea.scrollTop;

			textarea.value = begin + text + end;

			if (textarea.setSelectionRange)
			{
				textarea.focus();
				textarea.setSelectionRange(begin.length + text.length, begin.length + text.length);
			}
			textarea.scrollTop = scrollPos;
		}
		
		else {
			textarea.value += text;
			textarea.focus(textarea.value.length - 1);
		}
	}



function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Try the path for SMF 1.*
function getXpathRes1(){
	var path = xpath("//tr/td/textarea[@name='message']");
	return (path.snapshotLength > 0) ?  path : false;
}

//Try the path for SMF 2.*
function getXpathRes2(){
	var path = xpath("//div/div/textarea[@name='message']");
	return (path.snapshotLength > 0) ?  path : false;
}
function insertImgsIntoElement (elem, urls){
	for(var i = 0; i < urls.length; i++) {
		var img = document.createElement("Img");
		img.src = urls[i];
		img.style.cursor = "pointer";
		var listner = function(url2){
			return function(){
				putInTxtarea('[Img]' + url2 + '[/Img]', 
				document.getElementsByName('message')[0]);
				};
			}(urls[i]);

		img.addEventListener('click', listner, false);
		elem.appendChild(img);
	}
}

// SMF 1.0.*
var xpathRes = getXpathRes1();
if(xpathRes){
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.setAttribute("valign", "middle");
	
	var td2 = document.createElement("td");
	td2.setAttribute("align", "right");
	
	var elem = document.createElement("div");
	elem.id = "mySmilies";
	elem.innerHTML = "";
	
	insertImgsIntoElement(elem, smiliesUrl);
	
	td1.appendChild(elem);
	
	tr.appendChild(td2);
	tr.appendChild(td1);
	
	xpathRes.snapshotItem(0).parentNode.parentNode.parentNode.insertBefore(tr, xpathRes.snapshotItem(0).parentNode.parentNode);
	
}else{
// SMF 2.0.*
	var xpathRes = getXpathRes2();
	if(xpathRes){
		
		var cdiv = document.createElement("div");
		var showHideDiv = document.createElement("div");
		var imgsdiv = document.createElement("div");
		var showHideButton = document.createElement("button");
		
		showHideButton.type = "button";
		showHideButton.textContent = "Show/hide Smilies";
		var shouldShow = GM_getValue("showSmilies", false);
		
		imgsdiv.style.display = shouldShow ? "block" : "none";
		
		showHideButton.onclick = function (){
				shouldShow = !shouldShow;
				GM_setValue("showSmilies", shouldShow);
				
				imgsdiv.style.display = shouldShow ? "block" : "none";
			}
			

		var elem = document.createElement("div");
		elem.id = "mySmilies";
		elem.innerHTML = "";
		
		insertImgsIntoElement(elem, smiliesUrl);
		
		imgsdiv.appendChild(elem);

		showHideDiv.appendChild(showHideButton);

		cdiv.appendChild(showHideDiv);
		cdiv.appendChild(imgsdiv);
		
		xpathRes.snapshotItem(0).parentNode.parentNode.parentNode.insertBefore(cdiv, xpathRes.snapshotItem(0).parentNode.parentNode);

	}
}

	