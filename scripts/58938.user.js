// ==UserScript==
// @name           Recommend to Beautifl
// @namespace      http://userscripts.org/scripts/show/58938
// @description    Wonderflの作品をBeautiflに推薦するボタンを追加する
// @include        http://wonderfl.net/*
// ==/UserScript==
(function() {
//----------------------------------------
// Build from scratch追加
//----------------------------------------    

		var usrName=document.getElementById("header_menu_column_1")
		var nameText=usrName.childNodes[3]
		
		var scratch = document.createElement('a'); 
		scratch.setAttribute("href","/code/new")
		scratch.innerHTML ="Build from scratch"
		scratch.style.paddingLeft="5px";

		var html4=document.getElementById("header_r")
		usrName.replaceChild(scratch, nameText); 
		
//----------------------------------------
// リンク追加
//----------------------------------------    
 var element = document.createElement('a'); 
	    element.id = "rtb"; 
		element.setAttribute("onclick",clk())
		element.style.cursor="pointer";
		element.style.background="transparent url(http://wonderfl.net/img/code/fav_add.gif) no-repeat scroll left center";
		element.style.paddingLeft="20px";
		element.style.fontSize="10px";
	    element.innerHTML = ' Recommend to Beautifl'; 
		var html=document.getElementById("code_title_wrapper").childNodes[3];
		html.appendChild(element); 
		
		function clk(){
			var txt=[]
			txt.push("document.getElementById('submit_back').style.display='block';")
			txt.push("document.getElementById('rtb_box').style.top='" + window.innerHeight/2 + "px';")
			txt.push("document.getElementById('rtb_content').style.display='block';")
			txt.push("document.getElementById('swf').style.width='0px';")
			return txt.join("")

			}
//----------------------------------------
// オススメ画面追加
//----------------------------------------    
		var div_element = document.createElement('div'); 
		div_element.id="rtb_box"
		div_element.style.position="absolute";
		div_element.style.top="-999px";
		div_element.style.left=(window.innerWidth/2)+"px";
	    div_element.innerHTML += '<div id="rtb_content"><iframe width="720" scrolling="no" height="480" style="" src="http://beautifl.net/submit/index.html"  frameborder="0" /></div>'; 
		var html2=document.getElementById("top")
		html2.appendChild(div_element); 
//----------------------------------------
// めかくし
//----------------------------------------    
		var submit_back= document.createElement('div'); 
		submit_back.id = "submit_back"; 
		submit_back.innerHTML='<div id="rtb_close_btn">[ <a style="color:#fff;" href="javascript:void(0);" onclick="'+close_clk()+'">close</a> ]</div>'
		var html3=document.getElementById("top")
		html3.appendChild(submit_back); 
		
		function close_clk(){
			var txt=[]
			txt.push("document.getElementById('submit_back').style.display='none';")
			txt.push("document.getElementById('rtb_box').style.top='-999px';")
			txt.push("document.getElementById('rtb_content').style.display='none';")
			txt.push("document.getElementById('swf').style.width='465px';")
			return txt.join("")
			}
//----------------------------------------
// css追加
//----------------------------------------     
	var css="#rtb_content{margin: -240px 0 0 -360px;display:none;width:100%; height:100%;}";//オススメ画面
	css+="#submit_back{position:absolute;top:0px;left:0px;z-index:998;background:#000;width:"+document.documentElement.scrollHeight+"px; height:100%;-moz-opacity:.75;opacity:.75;display:none;color:#fff;}";//めかくし
	css+="#rtb_close_btn{ text-align:right;color:#fff;z-index:999;position:absolute;top:"+(window.innerHeight/2+240)+"px;left:"+(window.innerWidth/2-360)+"px;width:720px;";//閉じるリンク
	css+="#rtb_close_btn a,#rtb_close_btn a:link{color:#fff;}";
	GM_addStyle( css ) 
			
//----------------------------------------
// リサイズ、スクロール処理
//----------------------------------------  
//document.getElementById('top')
window.addEventListener("resize",hoge,false)
window.addEventListener("scroll",hoge,false)
	
function hoge(){
	document.getElementById('submit_back').style.top=document.documentElement.scrollTop+"px"
	document.getElementById('rtb_box').style.top=(window.innerHeight/2)+document.documentElement.scrollTop+"px"
	document.getElementById('rtb_box').style.left=(window.innerWidth/2)+"px"
	document.getElementById('rtb_close_btn').style.top=(window.innerHeight/2+240)+"px"
	document.getElementById('rtb_close_btn').style.left=(window.innerWidth/2-360)+"px"
	
			//console.log(">>>>>>>>>"+window.innerWidth+":"+window.innerHeight+":"+document.documentElement.scrollTop || document.body.scrollTop+":"+document.documentElement.scrollHeight || document.body.scrollHeight)
	}

})();