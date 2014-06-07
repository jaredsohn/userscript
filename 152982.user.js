// ==UserScript==
// @name        TiebaTextToImg
// @description 贴吧文字图片化GM版
// @namespace   tieba@textToImg.xx
// @include     http://tieba.baidu.com/*
// @version     2012.9.29.13
// @author      congxz6688
// @require     http://code.jquery.com/jquery-latest.min.js?1.8.2
// @updateURL     https://j.mozest.com/userscript/script/77.meta.js
// ==/UserScript==

//改编自527836355的脚本，原地址：http://userscripts.org/scripts/show/145430

if (!document.getElementById("myuploadSc")) {
	var sc = document.createElement('script');
	sc.id = "myuploadSc";
	sc.setAttribute('src', 'http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
	document.head.appendChild(sc);
}
var TxtimgCSS = "";
TxtimgCSS += ".hover{border:2px ridge black; position:relative; left:-2px; }";
TxtimgCSS += "#buttonSet{cursor:pointer; padding:2px 6px 3px 4px;float:right; display:inline-block;font:14px bold;color:white}";
TxtimgCSS += "#spanButton{position:relative;top:6px;margin:-5px 4px 0px 4px; display:inline-block; background-color:#2D7BEF; height:25px;}";
TxtimgCSS += "#colorBlock{border:1px solid white;margin:6px 0px 6px 4px; display:inline-block; width:12px; height:12px;}";
TxtimgCSS += "#InforDiv{z-index:1005; background-color:#A9A9A9; width:380px; height:165px; position:fixed; left:350px; bottom:130px;}";
TxtimgCSS += "#onceButton,#pauseButton{margin:0px 50px; float:right; display:block}";
TxtimgCSS += "#InforDiv>span{padding:20px 20px; display:block; width:340px; height:90px}";
GM_addStyle(TxtimgCSS);

//功能函数
function toIGM() {
	var tb = document.querySelector('.tb-editor-editarea').innerHTML;
	var linesses = tb.replace(/<br>/g, "|").replace(/\|{3,}/g, '|').replace(/　　/g, "       ").replace(/　/g, "   ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/<.*?>/g, '');
	var brNums = autoline(linesses);
	var maxlength = getmaxlength(brNums);
	var maxline = 200; //每页最大行数
	var cow = document.getElementById("colorBlock").value; //获取标准色
	var urlsss = []; //图片链接收集数组，最后插入时用
	
	if (brNums.length > maxline) {
		var InforDiv = document.createElement("div"); //创建小对话框
		InforDiv.id = "InforDiv";
		document.body.appendChild(InforDiv);
		
		var infospan = document.createElement("span"); //信息报出区域
		infospan.id = "infospan";
		infospan.innerHTML = "文本有点大，<br>开始分段上传<br><br>";
		InforDiv.appendChild(infospan);
		
		var onceButton = document.createElement("button"); //一次性确定按钮
		onceButton.id = "onceButton";
		onceButton.innerHTML = "确定";
		InforDiv.appendChild(onceButton);
		onceButton.addEventListener("click", splitImg, false); //这里调用分段函数
	} else {
		multiXhr(cow, brNums, 1000);
	}
	
	//分段上传程序
	function splitImg() {
		document.getElementById("InforDiv").removeChild(document.getElementById("onceButton")); //删除一次性按钮
		var pauseButton = document.createElement("button"); //创建新按钮
		pauseButton.id = "pauseButton";
		pauseButton.innerHTML = "确定";
		document.getElementById("InforDiv").appendChild(pauseButton);
		pauseButton.value = "0";
		pauseButton.addEventListener("click", clock, false);
		$("#pauseButton").trigger("click");
		
		function clock(e) { //过程控制函数
			op = e.target.value;
			op = Number(op);
			if (op < 1000) { //op为当前段数
				document.getElementById("infospan").innerHTML = "第" + (op + 1) + "段图片正在上传处理中，请稍候.....";
				$("#pauseButton").hide();
				ii = 0;
				var startline = op * maxline;
				var endline = Math.min((op + 1) * maxline, brNums.length);
				var newLines = brNums.slice(startline, endline); //各分页的文本数据
				multiXhr(cow, newLines, op); //发送函数调用，四参数分别为（颜色，文本数据，尝试次数，段index）
			} else { //当前段等于1000，结束标志
				document.querySelector(".tb-editor-editarea").innerHTML = "";
				for (ee in urlsss) {
					unsafeWindow.rich_postor._editor.execCommand("insertimage", urlsss[ee]);
				}
				document.body.removeChild(document.getElementById("InforDiv"));
			}
		}
	}
	
	//自动换行处理函数
	function autoline(line) {
		var width = 0;
		var str = '';
		var man = 0;
		for (i = 0; i < line.length; i++) { //至关重要的自动换行程序，527836355的心血
			if (line[i] == "|")
				width = 0;
			else if (line[i].match(/[,.:;]/g))
				width += 3;
			else if (line[i].match(/[\sijl!'`|]/g))
				width += 4;
			else if (line[i].match(/[frt\[\]\{\}\(\)]/g))
				width += 5;
			else if (line[i].match(/[\*\-s"\\\/]/g))
				width += 6;
			else if (line[i].match(/[cvxyz\?]/g))
				width += 7;
			else if (line[i].match(/[$aek0-9]/g))
				width += 8;
			else if (line[i].match(/[#bdghnopqu]/g))
				width += 9;
			else if (line[i].match(/[A-Zw~\^\+\=]/g))
				width += 10;
			else
				width += 14;
			if (width > 540) {
				str += (line[i] + "|");
				width = 0;
				man++;
			} else
				str += line[i];
		}
		var test = str.replace(/^\|*|\|*$/g, "");
		var brNum = test.split("|"); //总行数brNum.length
		return brNum;
	}
	
	//精确文本宽度函数
	function getmaxlength(rtrr) {
		var maxlengthh = 0;
		for (x in rtrr) {
			var pss3 = rtrr[x].match(/[,.:;]/g);
			var pss4 = rtrr[x].match(/[\sijl!'`|]/g);
			var pss5 = rtrr[x].match(/[frt\[\]\{\}\(\)]/g);
			var pss6 = rtrr[x].match(/[\*\-s"\\\/]/g);
			var pss7 = rtrr[x].match(/[cvxyz\?]/g);
			var pss8 = rtrr[x].match(/[$aek0-9]/g);
			var pss9 = rtrr[x].match(/[#bdghnopqu]/g);
			var pss10 = rtrr[x].match(/[A-Zw~\^\+\=]/g);
			
			var Lpss3 = (pss3) ? pss3.length : 0;
			var Lpss4 = (pss4) ? pss4.length : 0;
			var Lpss5 = (pss5) ? pss5.length : 0;
			var Lpss6 = (pss6) ? pss6.length : 0;
			var Lpss7 = (pss7) ? pss7.length : 0;
			var Lpss8 = (pss8) ? pss8.length : 0;
			var Lpss9 = (pss9) ? pss9.length : 0;
			var Lpss10 = (pss10) ? pss10.length : 0;
			
			thiswidth = Lpss3 * 3 + Lpss4 * 4 + Lpss5 * 5 + Lpss6 * 6 + Lpss7 * 7 + Lpss8 * 8 + Lpss9 * 9 + Lpss10 * 10 + (rtrr[x].length - Lpss3 - Lpss4 - Lpss5 - Lpss6 - Lpss7 - Lpss8 - Lpss9 - Lpss10) * 14 + 10;
			maxlengthh = Math.max(maxlengthh, thiswidth);
		}
		maxlengthh = Math.min(maxlengthh, 559); //最大宽度
		return maxlengthh;
	}
	
	//不分页上传函数
	function multiXhr(co, bNums, hh) {
		var canvas = document.createElement('canvas');
		canvas.width = maxlength; //允许的最大图片宽度
		canvas.height = bNums.length * 24 - 8; //图片高度
		var cxt = canvas.getContext('2d');
		for (x in bNums) {
			cxt.fillStyle = co;
			cxt.font = '14px Microsoft Yahei ';
			cxt.fillText(bNums[x], 2, 24 * x + 13);
		};
		var src = canvas.toDataURL();
		upload(src, hh);
	}
	
	//flash上传函数
	function upload(f, opp) { //f是base64数据
		function uploadedHandler(a, d) {
			try {
				var c = JSON.parse(d); //d是返回的text c是json对象
				if (c.error_code != 0) {
					alert("图片化失败")
				} else {
					var b = c.info.pic_id_encode; //c是json数据;b是地址信息；
					var e = 'http://imgsrc.baidu.com/forum/pic/item/' + b + '.png'; //e是img完整地址;
					if (opp < 1000) {
						var imgsS = document.createElement('img');
						imgsS.class = 'BDE_Image';
						imgsS.src = e;
						imgsS.onload = function () { //这里是本次改写的突破。取得链接后插入编辑窗，等它载入后再上传下一分段。
							urlsss[opp] = imgsS.src;
							opp++;
							if (opp < Math.ceil(brNums.length / maxline)) {
								document.getElementById("pauseButton").value = opp; //修改按钮的值，下一个上传动作从按钮开始，并从其值中领取页码。
								$("#pauseButton").trigger("click");
							} else {
								document.getElementById("infospan").innerHTML = "分段完成。";
								document.getElementById("pauseButton").value = 1000;
								$("#pauseButton").show();
							}
							GM_log("分段上传成功，取得链接：" + e);//不明白这个消息为什么会重复出现
						}
						if (opp == 0) {
							document.querySelector(".tb-editor-editarea").innerHTML = "";
						}
						document.querySelector(".tb-editor-editarea").appendChild(imgsS);
						document.querySelector(".tb-editor-editarea").appendChild(document.createElement("br"));
					} else {
						document.querySelector(".tb-editor-editarea").innerHTML = "";
						unsafeWindow.rich_postor._editor.execCommand("insertimage", e);
						GM_log("不分段上传成功，取得链接：" + e);
						return;
					}
				}
			} catch (err) {
				alert(err);
			}
		}
		function callback(a) {
			try {
				unsafeWindow.FlashImageLoader.bind('uploadComplete', uploadedHandler);
				unsafeWindow.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic', f.replace(/^.*?base64,/, ''), {
					tbs : a
				})
			} catch (err) {
				alert(err);
			};
		} //事先返回一个图片ID再返回
		GM_xmlhttpRequest({
			method : 'GET',
			url : 'http://tieba.baidu.com/dc/common/imgtbs',
			onload : function (response) {
				
				callback(JSON.parse(response.responseText).data.tbs);
				
			}
		});
	}
}

//函数 绝对定位
function getElementLeft(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
//函数 绝对定位
function getElementTop(element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
//颜色选择器创建函数
function selectColor(){
	if ($("#MultiColor").length == 0) {
		//定位颜色列表位置
		if (!document.getElementById("Mark1")) {
			var MultiColor = $("<div>", {
					id : "MultiColor"
				}).mouseleave(function(){$("#MultiColor").detach();}).css({
					width:"36",
					height:"136",
					"position" : "absolute",
					"left" : getElementLeft(document.getElementById("colorBlock"))-12,
					"top" : getElementTop(document.getElementById("colorBlock")) - 124,
				}).appendTo(document.body);
		} else {//兼容冰凉的小脸
			var MultiColor = $("<div>", {
					id : "MultiColor"
				}).mouseleave(function(){$("#MultiColor").detach();}).css({
					width:"36",
					height:"136",
					"position" : "fixed",
					"z-index" : "1000",
					"left" : getElementLeft(document.getElementById("colorBlock"))-12,
					"top" : getElementTop(document.getElementById("colorBlock")) - 124,
				}).appendTo(document.body);
		}
		//建颜色表
		var Ulset = $("<ul>").appendTo(MultiColor);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#000000"}).click(function(){GM_setValue('saveColor',"#000000");$("#colorBlock").attr("value","#000000").css({"background-color":"#000000"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#0000FF"}).click(function(){GM_setValue('saveColor',"#0000FF");$("#colorBlock").attr("value","#0000FF").css({"background-color":"#0000FF"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#FF0000"}).click(function(){GM_setValue('saveColor',"#FF0000");$("#colorBlock").attr("value","#FF0000").css({"background-color":"#FF0000"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#008000"}).click(function(){GM_setValue('saveColor',"#008000");$("#colorBlock").attr("value","#008000").css({"background-color":"#008000"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#7A1D73"}).click(function(){GM_setValue('saveColor',"#7A1D73");$("#colorBlock").attr("value","#7A1D73").css({"background-color":"#7A1D73"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#A52A2A"}).click(function(){GM_setValue('saveColor',"#A52A2A");$("#colorBlock").attr("value","#A52A2A").css({"background-color":"#A52A2A"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#D2691E"}).click(function(){GM_setValue('saveColor',"#D2691E");$("#colorBlock").attr("value","#D2691E").css({"background-color":"#D2691E"});$("#MultiColor").detach();}).appendTo(Ulset);
		$("<li>").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).css({margin:"0",padding:"0",width:"50",height:"17","background-color":"#136F77"}).click(function(){GM_setValue('saveColor',"#136F77");$("#colorBlock").attr("value","#136F77").css({"background-color":"#136F77"});$("#MultiColor").detach();}).appendTo(Ulset);
	}else{
		$("#MultiColor").detach();
	}
}

//添加按钮
var spanButton=$("<span>",{id:"spanButton"});
$("<span>",{id:"colorBlock",title:"选择颜色","value":GM_getValue('saveColor','#000000'),click:selectColor}).css({"background-color":GM_getValue('saveColor','#000000')}).appendTo(spanButton);
$("<span>",{id:"buttonSet",html:"图片化",click:toIGM}).appendTo(spanButton);
$(".subTip").replaceWith(spanButton);