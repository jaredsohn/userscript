// ==UserScript==
// @name           Google Search Compact ✪✪✪
// @namespace      random_1
// @version        0.2c
// @description    Compact and two-column Google results with managed ads and some cherry
// @include        http://www.google.*/search*
// @author         Freeloader @ http://FreeWebHosting.UK.To/
// ==/UserScript==


restyle( false );


function restyle(flag){ 
	
	/* manage search results */
	var tmp = document.getElementById("res"),
		gel = tmp.getElementsByTagName("li"),
		div = [document.createElement("div"), document.createElement("div")],
		pol = gel[0].parentNode, cnt = 0, ser;
	
	tmp.style.padding = "0px";
	div[0].style.width = "49%";
	div[0].style.cssFloat = "left";
	div[1].style.width = "49%";
	div[1].style.cssFloat = "right";
	
	if(flag){
		--cnt;
		while(gel.length){ 
			if(gel[0].className.indexOf("g") == -1){
				ser = gel[0];
				pol.removeChild(gel[0]);
				continue;
			}
			tmp = gel[0].getElementsByTagName("div");
			if(tmp.length != 0) tmp[0].style.maxWidth = "99%";
			gel[0].style.marginTop = "0px";
			gel[0].style.marginLeft = "0%"; // unindent double link
			div[++cnt&1].appendChild(gel[0]);
		}
		++cnt;
	}else{
		for(var i=0; i<gel.length; ++i, ++cnt){ 
			if(gel[i].className.indexOf("g") == -1){
				ser = gel[i];
				--cnt;
			}
		}
		var cnt2 = Math.floor(cnt/2);
		for(var i = 0; i<cnt2; ++i){
			if(gel[0] == ser){
				pol.removeChild(gel[0]);
				--i;
				continue;
			}
			tmp = gel[0].getElementsByTagName("div");
			if(tmp.length != 0) tmp[0].style.maxWidth = "99%";
			gel[0].style.marginTop = "0px";
			div[0].appendChild(gel[0]);
		}
		while(gel.length){
			tmp = gel[0].getElementsByTagName("div");
			if(tmp.length != 0) tmp[0].style.maxWidth = "99%";
			gel[0].style.marginTop = "0px";
			div[1].appendChild(gel[0]);
			if(gel.length == 1) gel[0].style.margin = "0px";
		}
	}
	pol.appendChild(div[0]);
	pol.appendChild(div[1]);
	
	/* copy navigation on top */
	var nav = document.getElementById("nav");
	if(nav){
		nav.style.marginBottom = "0.4em";
		if(tmp = document.getElementsByClassName("clr")[0]) tmp.style.marginTop = "0px";
		nav = nav.cloneNode(true);
		nav.style.margin = "1.3em auto 0.8em auto";
		tmp = nav.getElementsByTagName("td");
		if(tmp.length){
			tmp = tmp[tmp.length-1].firstChild;
			if(tmp.firstChild)
				tmp.removeChild(tmp.firstChild.nextSibling);
			tmp = document.getElementById("logo").parentNode;
			tmp.innerHTML = "";
			tmp.appendChild(nav);
			tmp.parentNode.style.padding = "0px";
		}
	}
	
	/* slightly move the search box */
	tmp = document.getElementById("sff");
	tmp.style.position = "absolute";
	tmp.style.left = "360px";
	tmp.style.top = "20px";
	
	/* extended suggestions aka. related searches */
	gel = document.getElementsByClassName("e");
	for(var i=-1; ++i<gel.length; ++cnt){
		tmp = gel[i];
		tmp.style.margin = "0px";
		tmp.style.width = "49%";
		if(cnt&1){
			div[1].appendChild(tmp);
		}else{
			div[0].appendChild(tmp);
		}
	}
	
	/* add 'did you mean' keyword results, if any */
	if(ser != undefined){
		pol.appendChild(ser);
		ser.style.marginTop = "0px";
		ser.style.width = "100%";
		ser.style.cssFloat = "left";
		ser.style.clear = "both";
		tmp = ser.getElementsByTagName("hr");
		if(tmp.length >= 2){
			tmp[0].width = "100%";
			tmp[1].width = "100%";
		}
		tmp = ser.getElementsByClassName("g");
		for(var i=0; i<tmp.length; ++i){
			tmp[i].style.margin = "0px 0px 3px 0px";
		}
		ser.innerHTML = ser.innerHTML.replace(/<br[\/]{0,1}>/gi, "");
	}
	
	/* add top ads, if any */
	tmp = document.getElementById("tads");
	if(tmp){
		pol.appendChild(tmp);
		tmp.style.marginTop = "0px";
		tmp.style.width = "100%";
		tmp.style.cssFloat = "left";
		tmp.style.clear = "both";
		tmp.style.fontSize = "12px";
		tmp.innerHTML = tmp.innerHTML.replace(/<cite>/gi,"<br/><cite>");
		ser = tmp; // copy
		tmp = ser.getElementsByTagName("li");
		for(var i=0; i<tmp.length; ++i){
			tmp[i].style.paddingTop = "0px";
		}
		tmp = ser.getElementsByTagName("a");
		for(var i=0; i<tmp.length; ++i){
			tmp[i].style.fontSize = "12px";
		}
	}
	
	/* add right column ads, if any */
	tmp = document.getElementById("mbEnd");
	if(tmp){
		pol.appendChild(tmp);
		tmp.style.margin = "0px";
		tmp.width = "100%";
		tmp.style.fontSize = "12px";
		tmp.innerHTML = tmp.innerHTML.replace(/<\/h3>/ig,"</h3><br/>");
		ser = tmp; // copy
		ser.getElementsByTagName("h2")[0].style.display = "none"; // sponsored
		tmp = ser.getElementsByTagName("li");
		for(var i=0; i<tmp.length; ++i){
			tmp[i].style.margin = "0px";
			tmp[i].style.marginRight = "7px";
			tmp[i].style.cssFloat = "left";
			tmp[i].style.fontSize = "11px";
		}
		tmp = ser.getElementsByTagName("a");
		for(var i=0; i<tmp.length; ++i){
			tmp[i].style.fontSize = "12px";
		}
	}
	
	/* add similar ommited results notification, if any */
	//if(tmp = document.getElementById("ofr")) tmp.style.clear = "both"; // 'ofr' became 'brs'
	if(tmp = document.getElementById("brs")) tmp.style.clear = "both";
	
	/* hide second 'Did you mean...', if any */
	tmp = document.getElementById("res");
	tmp = tmp.getElementsByTagName("ol");
	if(tmp.length){
		tmp = tmp[0].parentNode.nextSibling;
		while(tmp.nodeType == 8) tmp = tmp.nextSibling; // skip comment
		if(tmp && tmp.nodeName == "P" && tmp.firstChild && tmp.firstChild.className=="p"){
			tmp.style.display = "none";
		}
	}
	
}