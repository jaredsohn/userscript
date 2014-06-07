// ==UserScript==
// @name           ek$i do$e
// @description    ek$i sozluk entry do$eme aparati
// @author         kynes
// @version        0.42
// @include        http://www.eksisozluk.com/show.asp?t=*
// @include        http://eksisozluk.com/show.asp?t=*
// @include        http://sozluk.sourtimes.org/show.asp?t=*
// @include        http://sourtimes.org/show.asp?t=*
// @include        http://www.sourtimes.org/show.asp?t=*
// @include        http://84.44.114.44/show.asp?t=*

// ==/UserScript==

// array 3 elemanli olmali
function shortest(arr){	
		if(arr[1].length <= (arr[2].length+250)){
			if( arr[0].length <= arr[1].length)	return 0;
				else return 1;
			}
		else {
				if( arr[0].length <= (arr[2].length+250))	return 0;
				else return 2;
			}
}
	var allent = new Array();
    var alllid = new Array();
	var allvalue = new Array();
	var entcol = new Array();
	var entryHeader = document.getElementsByTagName('h1')[0];
	var entry = document.getElementsByTagName('li');
	var re_span = /<span class="pagi".+/;
	var re_page = /<input class="but" style.+/;
	var re_tumunu = /<button class="but" onclick="location.href='[\S^']+'">tümünü göster<\/button>/;
	var str_topjs = "<script src=\"top.js\" type=\"text/javascript\"></script>";
	var panel = document.getElementById('panel');
	var i,tri = 0,len = 0;
	var pagearr,str_page='';
	
	spanarr = re_span.exec(document.body.innerHTML);
	pagearr = re_page.exec(document.body.innerHTML);
	tumarr = re_tumunu.exec(document.body.innerHTML);
	yazpad = document.getElementById('ssg');
	
	if(spanarr && pagearr){
			panelIndex = pagearr[0].indexOf("<div class=\"panel\"");
			pagearr[0] = pagearr[0].substring(0,panelIndex);
			str_page += (spanarr[0] + pagearr[0]);
	}
	
	len = entry.length;
	for(i=0;i<len;i++){
			allent[i] = entry[i].innerHTML;
			alllid[i] = entry[i].id;
			allvalue[i] = entry[i].value;
	}

	for(i=0;i<3;i++){ entcol[i] = ''; }
	
	if(len > 5){
		for(i=0;i<len;i++){
						// en az dolu olan kolona koy
						tri = shortest(entcol);
						entcol[tri] += "<div id='" + alllid[i] + "' style='overflow: hidden; padding-right: 15px;'>" + "<i style='font-size:smaller;'>(" + allvalue[i]  + ")&nbsp;&nbsp;&nbsp;&nbsp;</i>"  + allent[i] + "</div>";
		}
	}
	// 5'ten az entry varsa tek kolon
	else {
		for(i=0;i<len;i++){
						// tek kolon
						entcol[0] += "<div id='" + alllid[i] + "' style='overflow: hidden;'>" + "<i style='font-size:smaller;'>(" + allvalue[i]  + ")&nbsp;&nbsp;&nbsp;&nbsp;</i>"  + allent[i] + "</div>";
		}
	}
	
	document.body.innerHTML = '';
	document.body.appendChild(entryHeader);
	document.body.innerHTML += "<br><div id='yandiv' class='panel' style='float: right;clear:right;'>"  + str_page + "</div>"; 
	
	if(panel){
		trows = panel.getElementsByTagName('tr');
		if(trows){ last = trows.length - 1;  trows[last].parentNode.removeChild(trows[last]); }
		yandiv = document.getElementById('yandiv');
		yandiv.appendChild(panel);
	}

	if(len > 5){
				for(i=0;i<3;i++){
						if(entcol[i]){ document.body.innerHTML += "<div style='float: left; width: 33%;'>" + entcol[i] + "</div>"; }
					}
		}
	// 5'ten az entry varsa hepsini tek kolona koy
		else {
			document.body.innerHTML += entcol[0];
		}
		
		if(tumarr){
				//tumson = tumarr[0].indexOf('>');
				//tumstr = tumarr[0].substring(0,tumson+1);
				tumstr = tumarr[0];
				tumdiv = document.createElement('div');
				tumdiv.innerHTML = "<div style='float:left;width:100%;' align='center'>" + tumstr + "<p><p><p></div>";
				document.body.appendChild(tumdiv);
		}
		
		// yazarsa aparat koy
		if(yazpad){ yazpad.innerHTML = "<div style='float:left;width:100%;'>" + yazpad.innerHTML + "<p><p><p></div>";  document.body.appendChild(yazpad); }
