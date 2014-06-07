// ==UserScript==
// @name           KTT Smilies
// @namespace      http://userscripts.org/
// @description    Personalized smilies to KTT
// @author         NUMBRZ
// @include        */index.php?action=post*;topic=*
// @include        */index.php?action=post*;msg=*
// @include        */index.php?action=post*;quote=*
// @include        */index.php?action=post*;board=*
// @version        1.3b
// ==/UserScript==

var smiliesUrl = GM_getValue("smilies", "|").split("|");
smiliesUrl.pop();
smiliesUrl.push("http://i.imgur.com/ZpuvE.png");
smiliesUrl.push("http://i.imgur.com/YRsSa.png");
smiliesUrl.push("http://i48.tinypic.com/f231a1.gif");
smiliesUrl.push("http://i.imgur.com/XwL7O.gif");
smiliesUrl.push("http://i48.tinypic.com/2n6avth.png");
smiliesUrl.push("http://i.imgur.com/I9x46H5.png");
smiliesUrl.push("http://i.imgur.com/ulzTU.png");
smiliesUrl.push("http://i.imgur.com/B8PbwIp.jpg");
smiliesUrl.push("http://i.imgur.com/aRVA6Ru.jpg");
smiliesUrl.push("http://i.imgur.com/eqQTAwr.png");
smiliesUrl.push("http://i.imgur.com/cIDzJ.png");
smiliesUrl.push("http://i.imgur.com/fiefz6F.jpg");
smiliesUrl.push("http://i.imgur.com/F3nNv0f.png");
smiliesUrl.push("http://i.imgur.com/LoxptTL.png");
smiliesUrl.push("http://i.imgur.com/SfcY06Q.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/sabu.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/whoa.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/babylawd.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/sitdown.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ld.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/tocry.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/sadbron.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/childplease.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/leon.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ehh.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/sadcam.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/gladbron.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/merchant.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ahh.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/A1Bny.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/QbadP.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/dead.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/stopit.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/fredo.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/pachah1.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/diddydatazz2.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ufdup.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/wtf.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/why.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/CsL1W.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/mindblown.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/mynicca1.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/yeshrug.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/rejoice.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/rudy.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/troll.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/deadmanny.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/holeup.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/beli.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/aqDwC.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/llLG0.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/50KS8.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/heh.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/5I5s8.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/dwill.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/whew.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/jawalrus.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/lawd.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/mad.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/wow.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/pacspit.gif");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ooh.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ohhh.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/damn.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/scusthov.gif");
smiliesUrl.push("http://www.the-coli.com/images/smilies/youngsabu.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/wtb.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/whoo.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/obama.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/shaq2.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/noah.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/what.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/fantasia2.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/birdman.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/shaq.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/smugfavre.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/leo.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/manny.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/heh.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/drakeohno1.png");
smiliesUrl.push("http://i.imgur.com/QbdLakk.png");
smiliesUrl.push("http://i.imgur.com/3m2VwyW.png");
smiliesUrl.push("http://i.imgur.com/nwpX7a6.png");
smiliesUrl.push("http://i.imgur.com/daVJvHy.png");
smiliesUrl.push("http://i.imgur.com/bdwTc.png");
smiliesUrl.push("http://i.imgur.com/7BhTxMA.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/win.pngd");
smiliesUrl.push("http://www.the-coli.com/images/smilies/comeon.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/krs.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/hamster.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/skip1.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/flabbynsick.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/snoop.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/smugdon.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/smugbiden.PNG");
smiliesUrl.push("http://www.the-coli.com/images/smilies/JgsPS.png");
smiliesUrl.push("http://i.imgur.com/sLFY4kZ.png");
smiliesUrl.push("http://i.imgur.com/kKEpfGI.png");
smiliesUrl.push("http://i.imgur.com/NbLoQMj.gif");
smiliesUrl.push("http://i.imgur.com/EOKiJas.png");
smiliesUrl.push("http://i.imgur.com/DFLXB32.png");
smiliesUrl.push("http://i.imgur.com/d7T9Shk.jpg");
smiliesUrl.push("http://mob1261.photobucket.com/albums/ii587/AWcouture/KTT/KTT%20Smileys/359x1mq.png?t=1345129751");
smiliesUrl.push("http://oi50.tinypic.com/o00vm8.jpg");
smiliesUrl.push("http://i.imgur.com/kix2b.png");
smiliesUrl.push("http://i.imgur.com/7QFXvPL.jpg");
smiliesUrl.push("");
smiliesUrl.push("");
smiliesUrl.push("");
smiliesUrl.push("");
smiliesUrl.push("");



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

	
var menu=function() {
	
	var img=prompt("Url for the smilie");
	if (img!=null && img != "")
	{
		GM_setValue("smilies", (GM_getValue("smilies", "") + img + "|") );
		alert('smilie added');
	}
}
GM_registerMenuCommand("SMF:New smilie", menu);

var menu=function() {
	var smilies = GM_getValue("smilies", "").split("|");
	smilies.pop();
	var promptOut = "";
	for (num in smilies){
		promptOut +=num + "->" + smilies[num] + "\n";
	}
	if(smilies.length == 0){
		alert("There are no smilies");
		return false;
	}
	
	var option = prompt("Which one do you want to edit/eliminate?(The number)\n"+promptOut, "");
	if(option != null && !isNaN(option) && option < smilies.length ){
		var newUrl = prompt("Change the url to edit it or erase it to delete it", smilies[option]);
		if(newUrl != null && newUrl.length > 0){
			smilies[option] = newUrl;
			alert('smilie changed');
		}else if(newUrl != null && newUrl.length == 0){
			smilies.splice(option,1);
			alert('smilie deleted');
		}
		
		GM_setValue("smilies",smilies.join("|")+"|" );

	}
}
GM_registerMenuCommand("SMF:Edit/Erase Smilie", menu);