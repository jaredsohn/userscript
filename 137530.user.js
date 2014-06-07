// ==UserScript==
// @id             Minus
// @name           Minus
// @version        1.4
// @namespace      http://minus.com/
// @author         Tast
// @description    
// @include        http://minus.com/*
// @include        http://*.minus.com/*
// @require 					http://code.jquery.com/jquery-latest.min.js
// @require 					http://demonstration.abgne.tw/jquery/plugins/0013/js/jquery.center.js
// ==/UserScript==
// @run-at         document-end
// @run-at         document-start


//=========================================================================================
var Version = 1.4;
var url = window.location.href;
//if(url.match('1g')) window.location.href = window.location.href.replace('1g','1l');
var is_chrome = navigator.userAgent.toLowerCase().match('chrome');
//=========================================================================================
var primary_upload = document.getElementById('primary_upload');
if(primary_upload){
	var primaryheader_innerwrap = document.getElementsByClassName('primaryheader_innerwrap')[0];
	primaryheader_innerwrap.innerHTML += 
	'<center><div id="divPrimary"  style="text-align:center;vertical-align:middle;font-size:15pt;display:block;margin-top:10px;">'+
	'<a id="VersionA" href="http://lv1.in/lib/read.php?fid=2&tid=1341404104" target="_new" style="margin-top:10px;display:inline">'+
	'<font id="VersionS" color="green">Minus 腳本攻略 V' + Version + '</font></a></div></center>';
}

function insertAfter(newEl, targetEl){
	var parentEl = targetEl.parentNode;
            
	if(parentEl.lastChild == targetEl)
			parentEl.appendChild(newEl);
	else	parentEl.insertBefore(newEl,targetEl.nextSibling);        
}

function ImgCheckingList(){
	//alert('List Checking');
	if(document.getElementById("tsetting"))
			var div = document.getElementById("tsetting");
	else 	var div = document.createElement("div");
	
	div.style.display = 'block';
	div.id = 'tsetting';
	div.style.position = 'absolute';
	div.style.margin = '-100px 0px 0px -200px';
	div.style.top = '20%';
	div.style.left = '50%';
	div.style.zIndex = '1002';
	//div.style.backgroundColor = 'e5f8ff';
	div.style.backgroundColor = 'black';
	div.style.overflow = 'visible';
	div.style.textAlign = 'left';
	div.style.border="3px dashed red";
	
	//var img = document.getElementsByClassName('item_download no_underline');
	var img = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below');
	div.innerHTML = "<a id='count'>Count = " + img.length + "</a>";
	if(is_chrome) div.innerHTML = div.innerHTML + '<br><br>';
	
	var Txt = "";
	for(var i = 0;i < img.length;i++){
		var lnk = img[i];
		//Txt = Txt + "\n" + "[img]" + img[i].href + "[/img]";
		if(is_chrome) Txt = Txt + "\n" + "[img]" + img[i].href + "[/img]";
		else div.innerHTML = div.innerHTML + "<br>" + "[img]" + img[i].href + "[/img]";
	}
	
	if(div.innerHTML){
		if(is_chrome){
			div.innerHTML = div.innerHTML + '<textarea rows="100%" cols="100%" readonly="readonly" id="ImgList" name="ImgList">' + Txt + '</textarea>';
			var c3 = document.getElementsByTagName("body")[0];
			c3.insertBefore(div,c3.lastChild);
			
			
			var ImgList = document.getElementById('ImgList');
			/*
			div.addEventListener("focus", function() {
				ImgList.select();
			}, true);
			*/
			
			ImgList.addEventListener("click", function() {
				ImgList.select();
			}, true);
			/*
			ImgList.addEventListener("focus", function() {
				ImgList.select();
			}, true);
			*/
			ImgList.addEventListener("mouseover", function() {
				ImgList.select();
			}, true);
		}
		else {
			var c3 = document.getElementsByTagName("body")[0];
			c3.insertBefore(div,c3.lastChild);
			
			div.addEventListener("click", function() {
				GM_setClipboard(div.innerHTML.split('</a>')[1].replace(new RegExp("<br>","gm"),"\n") + "\n", 'text');
				div.innerHTML = '<b id="copyed">Copyed</b>' + '<br>' + div.innerHTML;
				//div.style.display = 'none';
			}, true);
		}
	}
}


GM_registerMenuCommand("顯示全體列表", ImgCheckingList);

function SAI(){
	var item = document.getElementsByClassName('item_checkbox');
	for(var i = 0;i < item.length;i++){
		//item[i].checked = true;
		if(item[i].checked !== true) item[i].click();
	}
	
	//alert(document.getElementsByClassName('cancel-select-mode')[0].style.display = 'block');
	
}

GM_registerMenuCommand("全選", SAI);

function SI(){
	//var url = window.location.href;
	//alert(url.split('\/')[4]);
	if(document.getElementById("tsetting"))
			var div = document.getElementById("tsetting");
	else 	var div = document.createElement("div");
	//div.style.display = 'block';
	div.style.display = 'none';
	div.id = 'tsetting';
	div.style.position = 'absolute';
	div.style.margin = '-100px 0px 0px -200px';
	div.style.top = '20%';
	div.style.left = '50%';
	div.style.zIndex = '1002';
	//div.style.backgroundColor = 'e5f8ff';
	div.style.backgroundColor = 'black';
	div.style.overflow = 'visible';
	div.style.textAlign = 'left';
	div.style.border="3px dashed red";
	
	var img = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below');
	div.innerHTML = "<a id='count'>Count = " + img.length + "</a>";
	//var Txt = "";
	/*
	for(var i = 0;i < img.length;i++){
		var lnk = img[i];
		//Txt = Txt + "\n" + "[img]" + img[i].href + "[/img]";
		div.innerHTML = div.innerHTML + "<br>" + "[img]" + img[i].href + "[/img]";
	}
	*/
	if(div.innerHTML){
		var c3 = document.getElementsByTagName("body")[0];
		c3.insertBefore(div,c3.lastChild);
		
		if(is_chrome){
			div.innerHTML = div.innerHTML + '<br><br><textarea rows="100%" cols="100%" readonly="readonly" id="ImgList" name="ImgList"></textarea>';
			
			var ImgList = document.getElementById('ImgList');
			ImgList.addEventListener("click", function() {
				ImgList.select();
			}, true);
			
			ImgList.addEventListener("mouseover", function() {
				ImgList.select();
			}, true);
		}
		else {
			div.addEventListener("click", function() {
				GM_setClipboard(div.innerHTML.split('</a>')[1].replace(new RegExp("<br>","gm"),"\n"), 'text')  + "\n";
				div.innerHTML = '<b id="copyed">Copyed</b>' + '<br>' + div.innerHTML;
				//div.style.display = 'none';
			}, true);
		}
	}
	
	var item_Checked = 0;
	var item = document.getElementsByClassName('item_checkbox');
	var img = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below');
	for(var i = 0;i < item.length;i++){
		//if(item[i].id && item[i].checked == true){
		if(item[i].id.match("grid-item-checkbox-") && item[i].checked == true){
			item_Checked = item_Checked + 1;
			for(var j = 0;j < img.length;j++){
				if(img[j].href.match(item[i].value) && !div.innerHTML.match(item[i].value)){
					if(is_chrome){
						var ImgList = document.getElementById('ImgList');
						ImgList.value = ImgList.value + "\n" + "[img]" + img[j].href + "[/img]";
					}
					else div.innerHTML = div.innerHTML + "<br>" + "[img]" + img[j].href + "[/img]";
					break;
				}
			}
		}
	}
	if(item_Checked){
		div.style.display = 'block';
		document.getElementById("count").innerHTML = document.getElementById("count").innerHTML + "/" + item_Checked;
	}
	//alert(document.getElementsByClassName('item_download no_underline').length + "/" + item.length);
}

GM_registerMenuCommand("顯示選取項目", SI);

function SFSC(){
	var SpanCount, counting;
	[SpanCount,counting] = FileCounter(1);
	
	if(SpanCount){
		var OutputText = "(" + counting + "p-" + (SpanCount / 1024).toFixed() + "MB" + ")";
		alert(OutputText);
		if(!is_chrome) GM_setClipboard(OutputText, 'text');
	}
}

GM_registerMenuCommand("統計選取數量大小", SFSC);

function AFSC(){
	var counting = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below').length;
	//var SpanCount = 0.0;
	
	var SpanCount = FileCounter(0);
	
	if(SpanCount){
		/*
		if(is_chrome)
			var OutputText = "(" + document.getElementsByClassName('stat-val')[0] + "p-" + (SpanCount / 1024).toFixed() + "MB" + ")";
		else 
			var OutputText = "(" + counting + "p-" + (SpanCount / 1024).toFixed() + "MB" + ")";
		*/
		//var OutputText = "(" + document.getElementsByClassName('stat-val')[0].innerHTML + "p-" + (SpanCount / 1024).toFixed() + "MB" + ")";
		var OutputText = "(" + counting + "p-" + (SpanCount / 1024).toFixed() + "MB" + ")";
		alert(OutputText);
		if(!is_chrome) GM_setClipboard(OutputText, 'text');
	}
}

GM_registerMenuCommand("統計總數量及大小", AFSC);


function ATSG(){
	var Txt, InHTML;
	[Txt,InHTML] = returnAllimgs(1);
	
	document.body.innerHTML = InHTML;
}

GM_registerMenuCommand("獲取全縮圖", ATSG);

function returnAllimgs(type){
	var img = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below');
	
	var Txt = "";
	var InHTML = "";
	for(var i = 0;i < img.length;i++){
		var lnk = img[i];
		var lnkH = lnk.href;
		
		if(type == 1){
			Txt = Txt + "\n" + "[url=" + lnkH + "]" + "原圖連結：" + lnkH.replace('http://i.minus.com/i','') + "[/url]";
			InHTML = InHTML + "<br>" + "[url=" + lnkH + "]" + "原圖連結：" + lnkH.replace('http://i.minus.com/i','') + "[/url]";
			lnkH = lnkH.replace('i.minus.com/i','i.minus.com/j');
		}
		
		if(is_chrome) Txt = Txt + "\n" + "[img]" + lnkH + "[/img]";
		else InHTML = InHTML + "<br>" + "[img]" + lnkH + "[/img]";
	}
	
	return ([Txt,InHTML]);
}

function CI2(){
	//alert('List Checking');
	if(document.getElementById("tsetting"))
			var div = document.getElementById("tsetting");
	else 	var div = document.createElement("div");
	
	div.style.display = 'block';
	div.id = 'tsetting';
	div.style.position = 'absolute';
	div.style.margin = '-100px 0px 0px -200px';
	div.style.top = '20%';
	div.style.left = '50%';
	div.style.zIndex = '1002';
	//div.style.backgroundColor = 'e5f8ff';
	div.style.backgroundColor = 'black';
	div.style.overflow = 'visible';
	div.style.textAlign = 'left';
	div.style.border="3px dashed red";
	
	//var img = document.getElementsByClassName('item_download no_underline');
	var img = document.getElementsByClassName('grid_item_thumb');
	alert(img.length);
	div.innerHTML = "<a id='count'>Count = " + img.length + "</a>";
	if(is_chrome) div.innerHTML = div.innerHTML + '<br><br>';
	var Txt = "";
	for(var i = 0;i < img.length;i++){
		var lnk = img[i];
		//Txt = Txt + "\n" + "[img]" + img[i].href + "[/img]";
		if(is_chrome) Txt = Txt + "\n" + "[img]" + img[i].href + "[/img]";
		else div.innerHTML = div.innerHTML + "<br>" + "[img]" + img[i].href + "[/img]";
	}
	
	if(div.innerHTML){
		if(is_chrome){
			div.innerHTML = div.innerHTML + '<textarea rows="100%" cols="100%" readonly="readonly" id="ImgList" name="ImgList">' + Txt + '</textarea>';
			var c3 = document.getElementsByTagName("body")[0];
			c3.insertBefore(div,c3.lastChild);
			
			
			var ImgList = document.getElementById('ImgList');
			/*
			div.addEventListener("focus", function() {
				ImgList.select();
			}, true);
			*/
			
			ImgList.addEventListener("click", function() {
				ImgList.select();
			}, true);
			/*
			ImgList.addEventListener("focus", function() {
				ImgList.select();
			}, true);
			*/
			ImgList.addEventListener("mouseover", function() {
				ImgList.select();
			}, true);
		}
		else {
			var c3 = document.getElementsByTagName("body")[0];
			c3.insertBefore(div,c3.lastChild);
			
			div.addEventListener("click", function() {
				GM_setClipboard(div.innerHTML.split('</a>')[1].replace(new RegExp("<br>","gm"),"\n") + "\n", 'text');
				div.innerHTML = '<b id="copyed">Copyed</b>' + '<br>' + div.innerHTML;
				//div.style.display = 'none';
			}, true);
		}
	}
}
//GM_registerMenuCommand("CheckImg2", CI2);

//$('#suggestedusers').css('display','none');
//$('.block')[3].css('display','none');

//if(document.getElementById("suggestedusers")) document.getElementById("suggestedusers").style.display = 'none';
//if(document.getElementsByClassName('block')[3]) document.getElementsByClassName('block')[3].style.display = 'none';

function FileCounter(type){
	var SpanCount = 0.0;
	var SpanText = '';
	var item = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below');
	
	if(!type){
		//alert(item[0].getAttribute('tooltip'));
		
		for(var i = 0;i < item.length;i++){
			var ite = item[i].getAttribute('tooltip');
			
			//if(ite.match('Download')/* && ite !== 'Download' && ite !== 'Download All'*/){
				if(ite.match('KB')){
					//1984 x 992 (1.3 MB )
					SpanCount = SpanCount + parseFloat(ite.split('(')[1].replace(')','').replace('KB',''));
					//SpanCount = SpanCount + parseFloat(ite.replace('Download','').replace('(','').replace(')','').replace('KB',''));
				}
				else if(ite.match('MB')){
					SpanCount = SpanCount + parseFloat(ite.split('(')[1].replace(')','').replace('MB','') * 1024);
					//SpanCount = SpanCount + (parseFloat(ite.replace('Download','').replace('(','').replace(')','').replace('MB','')) * 1024);
				}
				//else SpanText = SpanText + "\n" + ite;
			//}
		}
		return SpanCount;
		
		
		//if(SpanText) alert(SpanText);
	}
	else if(type == 1){
		var counting = 0;
		var item = document.getElementsByClassName('item_checkbox');
		var img = document.getElementsByClassName('grid-download-element btn-action btn-download no-counter tooltip-below');
		for(var i = 0;i < item.length;i++){
			if(item[i].id.match("grid-item-checkbox-") && item[i].checked == true){
				for(var j = 0;j < img.length;j++){
					if(img[j].href.match(item[i].value)){
						var ite = img[j].getAttribute('tooltip');
						if(ite.match('KB')){
							SpanCount = SpanCount + parseFloat(ite.split('(')[1].replace(')','').replace('KB',''));
							counting++;
						}
						else if(ite.match('MB')){
							SpanCount = SpanCount + parseFloat(ite.split('(')[1].replace(')','').replace('MB','') * 1024);
							counting++;
						}
						break;
					}
				}
			}
		}
		//return SpanCount;
		return ([SpanCount,counting]);
	}
}

CheckVersion()
function CheckVersion(){
	var checkV = 1;
	
	var d = new Date();
	var fDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	var now = new Date();
	now = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
	
	if(GM_getValue("updateDate", false	) !== fDate || checkV == 1){
		GM_setValue("updateDate", fDate);
		var ret = GM_xmlhttpRequest({
			method: "GET",
			url: "http://bhunji.myweb.hinet.net/Javascript/Update/minus/version.minus.js" + "?time=" + now,
			onload: function(res) {
				var resT = getQueryString("minus",res.responseText);
				if(resT){
					if(resT > Version /*&& GM_getValue('VerSionAlerted',false) !== resT*/){
						var VIS = document.getElementById("VersionS");
						if(VIS){
							VIS.color = 'blue';
							VIS.innerHTML = 'Minus 腳本攻略 更新至：' + resT;
							document.getElementById("VersionA").href = 'http://userscripts.org/scripts/source/137530.user.js';
						}
						GM_setValue('VerSionAlerted',resT);
					}
				}
			}
		});
	}
}

function getQueryString( paramName,paramURL){
	paramName = paramName .replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]").toLowerCase();
	//alert(paramName);
	var reg = "[\\?&]"+paramName +"=([^&#]*)";
	var regex = new RegExp( reg );
	var regResults = regex.exec( paramURL.toLowerCase());
	if( regResults == null ) {
		   //alert(regResults);
		   return "";
	} else {
		   //alert(regResults[1]);
		   return regResults [1];
	}
}



//GM_registerMenuCommand("Get Thumbs", ImgCheckingList);