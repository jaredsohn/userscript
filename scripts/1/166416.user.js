// ==UserScript==
// @name           KanyeToTheSmiles
// @namespace      http://userscripts.org/
// @description    Personalized smilies to KTT
// @author         concolor
// @include        */index.php?action=post*;topic=*
// @include        */index.php?action=post*;msg=*
// @include        */index.php?action=post*;quote=*
// @include        */index.php?action=post*;board=*
// @include        */index.php?action=pm;sa=send;u=*
// @version        1.4
// ==/UserScript==

var smiliesUrl = GM_getValue("smilies", "|").split("|");
smiliesUrl.pop();
smiliesUrl.push("http://i.imgur.com/3m2VwyW.png");
smiliesUrl.push("http://i.imgur.com/QbdLakk.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/cheesy.gif");
smiliesUrl.push("http://cudizone.com/Smileys/default/j36G1.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/AKVUd.jpg");
smiliesUrl.push("http://cudizone.com/Smileys/default/bR43p.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/cfAw8.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/cudifly-1.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/hsjHx.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/jaydamn.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/npco2.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/od1e9.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/peE4Q.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/wecte.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/71lpft.jpg");
smiliesUrl.push("http://cudizone.com/Smileys/default/d8R1b6O.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/fantasia2.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ahh.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/pacspit.gif");
smiliesUrl.push("http://www.the-coli.com/images/smilies/wtf.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/rejoice.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/scusthov.gif");
smiliesUrl.push("http://www.the-coli.com/images/smilies/leo.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/snoop.png");
smiliesUrl.push("http://www.the-coli.com/images/smilies/ehh.png");
smiliesUrl.push("http://i.imgur.com/TRiAt.png");
smiliesUrl.push("http://i.imgur.com/d7T9Shk.jpg");
smiliesUrl.push("http://i.imgur.com/DFLXB32.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/drakeohno1.png");
smiliesUrl.push("http://i.imgur.com/SfcY06Q.png");
smiliesUrl.push("http://i.imgur.com/F3nNv0f.png");
smiliesUrl.push("http://i.imgur.com/LoxptTL.png");
smiliesUrl.push("http://i.imgur.com/sLFY4kZ.png");
smiliesUrl.push("http://mob1261.photobucket.com/albums/ii587/AWcouture/KTT/KTT%20Smileys/359x1mq.png?t=1345129751");
smiliesUrl.push("http://i.imgur.com/2hYho3v.png");
smiliesUrl.push("http://i.imgur.com/G28OFsh.png");
smiliesUrl.push("http://i.imgur.com/k1U9ucE.jpg");
smiliesUrl.push("http://i.imgur.com/E4QuMQ8.jpg");
smiliesUrl.push("http://i.imgur.com/DnZc5kC.jpg");
smiliesUrl.push("http://cudizone.com/Smileys/default/manny.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/z4LPR.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/1TXK2.png");
smiliesUrl.push("http://cudizone.com/Smileys/default/29binuc.png");
smiliesUrl.push("http://i.imgur.com/kix2b.png");
smiliesUrl.push("http://i.imgur.com/7QFXvPL.jpg");
smiliesUrl.push("http://i.imgur.com/hSv3ubt.png");
smiliesUrl.push("http://i.imgur.com/DBK3DDN.png");
smiliesUrl.push("http://i.imgur.com/VsqFGj1.png");
smiliesUrl.push("http://i.imgur.com/vi02eiN.png");
smiliesUrl.push("http://i.imgur.com/vjSuGkn.png");
smiliesUrl.push("http://i.imgur.com/R4gPMoO.png");
smiliesUrl.push("http://i.imgur.com/uY4clRq.png");
smiliesUrl.push("http://i.imgur.com/LxlP95K.png");
smiliesUrl.push("http://i.imgur.com/EnyTCdb.png");
smiliesUrl.push("http://i.imgur.com/pzOPQz4.png");
smiliesUrl.push("http://i.imgur.com/l15FShP.png");
smiliesUrl.push("http://i.imgur.com/BkIcJOM.png");
smiliesUrl.push("http://i.imgur.com/HMQ8zQQ.png");
smiliesUrl.push("http://i.imgur.com/oNkSCgM.png");
smiliesUrl.push("http://i.imgur.com/7bv7Iza.png");
smiliesUrl.push("http://i.imgur.com/86V6ycJ.png");
smiliesUrl.push("http://i.imgur.com/PVok5Df.png");
smiliesUrl.push("http://i.imgur.com/EupBlIY.png");
smiliesUrl.push("http://i.imgur.com/CkHljcm.png");
smiliesUrl.push("http://i.imgur.com/Qf0Vl8v.png");
smiliesUrl.push("http://i.imgur.com/q4DuFoA.png");
smiliesUrl.push("http://i.imgur.com/ouFWb10.png");
smiliesUrl.push("http://i.imgur.com/8qR3JTW.png");
smiliesUrl.push("http://i.imgur.com/7IC5IhG.png");
smiliesUrl.push("http://i.imgur.com/ZPo0ouj.png");
smiliesUrl.push("http://i.imgur.com/b965IiN.png");
smiliesUrl.push("http://i.imgur.com/PnEd1ks.png");
smiliesUrl.push("http://i.imgur.com/UGHu9Tr.png");
smiliesUrl.push("http://i.imgur.com/u62UMg0.png");
smiliesUrl.push("http://i.imgur.com/3853YHY.png");
smiliesUrl.push("http://i.imgur.com/ez6DGzF.png");
smiliesUrl.push("http://i.imgur.com/M2RazVk.png");
smiliesUrl.push("http://i.imgur.com/0syIhzU.png");
smiliesUrl.push("http://i.imgur.com/09Z7ygz.png");
smiliesUrl.push("http://i1261.photobucket.com/albums/ii587/AWcouture/KTT/KTT%20Smileys/frankocon.png");
smiliesUrl.push("http://img571.imageshack.us/img571/5242/55898774.jpg");
smiliesUrl.push("http://i.imgur.com/z4LPR.png");
smiliesUrl.push("http://i.imgur.com/8P2Vw.png");
smiliesUrl.push("http://i686.photobucket.com/albums/vv224/SoebyART/aubreywithdachicken.png");
smiliesUrl.push("http://i.imgur.com/8VKXv.png");
smiliesUrl.push("http://www.nationofhiphop.net/images/smilies/75378-TrollFace.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/stephenahand.png");
smiliesUrl.push("http://i679.photobucket.com/albums/vv153/Khameleon05/beleedat.png");
smiliesUrl.push("http://i679.photobucket.com/albums/vv153/Khameleon05/dontwant.png");
smiliesUrl.push("http://i679.photobucket.com/albums/vv153/Khameleon05/th_hmmm-1.png");
smiliesUrl.push("http://i.imgur.com/04Q0aii.png");
smiliesUrl.push("http://i.imgur.com/sluzJHR.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/obamalaugh3_zps4f596990.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/westbrookcmonson_zpse72004bd.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/bigpokey.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/paulydareyoukiddingme.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/willfreshprincescared.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/raydisgusted.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/jayzbiglaugh2.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/smiletongue.png");
smiliesUrl.push("http://i1233.photobucket.com/albums/ff390/ShaneDawg021/wtheellll.png");
smiliesUrl.push("https://imageshack.us/a/img191/4792/jaymad.png");
smiliesUrl.push("http://oi47.tinypic.com/vs0v1k.jpg");
smiliesUrl.push("http://i.imgur.com/1696YeD.png");
smiliesUrl.push("https://si0.twimg.com/profile_images/2399641544/happy-grin_normal.png");
smiliesUrl.push("http://imageshack.us/a/img15/2028/tdon.gif");
smiliesUrl.push("http://i.imgur.com/JJIWoY1.png");
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

	