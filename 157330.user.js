// ==UserScript==
// @name        131Comic images
// @author      9尾雪狐
// @namespace   http://weibo.com/gameclamp
// @description 在一个页面上显示多张漫画，在顶部输入框自定义图数。顶栏固定在顶部，别妨碍我看漫画啦!
// @icon        http://res.files.131.com/favicon.ico
// @include     http://comic.131.com/content/*
// @include     http://cnc.comic.131.com/content/*
// @updateURL   https://userscripts.org/scripts/source/157330.meta.js
// @downloadURL https://userscripts.org/scripts/source/157330.user.js
// @match       http://comic.131.com/content/*
// @match       http://cnc.comic.131.com/content/*
// @grant       none
// @version     1.9.2
// ==/UserScript==
function runit(){
	if(location.search !== ""){
		Response.Cookies("ComicSeriesImagePageSize", 1, -1, "/", "131.com");
		location.href = location.pathname;
	}
	if(isNaN(location.pathname.split("/")[2])){
	function addmhnav(a){
		$(".fl>div:eq(1)>p").remove();
		$(".fl>div:eq(1)").prepend('<div id="mhnav"></div>');
		$("#mhnav").load(a + " #divfy>*:not(.cinnerlink)");
	}
	switch(location.pathname){
		case "/content/shaonian/2094.html"://火影忍者
		addmhnav("/content/2094/190751/1.html");
		break;
		case "/content/shaonian/2084.html"://死神
		addmhnav("/content/2084/187118/1.html");
		break;
		case "/content/shaonian/2104.html"://海贼王
		addmhnav("/content/2104/168063/1.html");
		break;
		case "/content/shaonian/2603.html"://食梦者
		addmhnav("/content/2603/146954/1.html");
		break;
		case "/content/shaonian/1916.html"://家庭教师REBORN
		addmhnav("/content/1916/160915/1.html");
		break;
		case "/content/shaonian/1226.html"://网球王子
		addmhnav("/content/1226/11176/1.html");
		break;
		case "/content/shaonian/1984.html"://银魂
		addmhnav("/content/1984/189252/1.html");
		break;
		case "/content/shaonian/270.html"://游戏王
		addmhnav("/content/270/2042/1.html");
		break;
		case "/content/shaonian/15794.html"://圣斗士星矢
		addmhnav("/content/15794/143823/1.html");
		break;
		case "/content/shaonian/1173.html"://阿拉蕾
		addmhnav("/content/1173/151252/1.html");
		break;
	}
	}else{
		function dragable(obj){
			var dragging = false;
			var iX, iY;
			$(obj).mousedown(function(e) {
				dragging = true;
				iX = e.clientX;
				iY = e.clientY;
				pageX = pageXOffset;
				pageY = pageYOffset;
				//this.setCapture && this.setCapture();
				return false;
			});
			$(document).mousemove(function(e) {
				if (dragging) {
					//var e = e || window.event;
					var oX = pageX + (iX - e.clientX);
					var oY = pageY + (iY - e.clientY);
					window.scrollTo(oX, oY);
					//$("#drag").css({"left":oX + "px", "top":oY + "px"});
					return false;
				}
			})
			$(document).mouseup(function(e) {
				dragging = false;
				//$("#drag")[0].releaseCapture();
				return false;
			})
		}
		//获取设置值
		if(localStorage.nums){
			var nums = Number(localStorage.nums);
		}else{
			var nums = 3
		}
		if(localStorage.fix){
			var fix = localStorage.fix;
		}else{
			var fix = "false";
		}
		if(localStorage.fixwidth){
			var fixwidth = localStorage.fixwidth;
		}else{
			var fixwidth = "false";
		}
		if(localStorage.light){
			var light = localStorage.light;
		}else{
			var light = "on";
		}
		if(localStorage.autophotos){
			var autophotos = localStorage.autophotos;
		}else{
			var autophotos = "false";
		}
		var patt = /(<div class="mh_zdimg">[\s\S]*?<a href="([\s\S]*?(\d*)[\s\S]html|javascript:RandomPage\(\);)"[\s\S]*?src="([\s\S]*?)"[\s\S]*?<\/a>)[\s\S]*?(<div class="mh_kmh_1">[\s\S]*?<\/div>)[\s\S]*?(<div style="display: none;">[\s\S]*?<\/div>)/;
		var pagewidth = $("body").width()-2;
		dragable(".mh_zdimg:last>a>img");
		comicBigPic.onmousedown = "";
		comicBigPic.oncontextmenu = "";
		//整理页面
		$(".mh_ktb").css("margin-top","0");
		$("#sNav_header").css("position","static");
		$('#divfy').css("margin-top","10px");
		$(".mh_zdimg:last").css({'z-index':'1001','position':'relative'});
		$(".mh_zdimg:last").after('<div class="space" style="margin:5px 0 10px 0;width:100%;background-color:rgb(180,180,180);text-align:center;font-size:1.5em;color:rgb(25,130,220);">' + pageNum + '</div>');
		$('.space:last').append($('.img_cont:last'));
		if(fix == "true"){$(".space:last").append('<a style="text-decoration:none;margin-left:20px;border:1px solid;border-radius:3px;font-size:0.8em;" href="javascript:void(0)" onclick="$(\'.tucaocon:eq(0)\').toggle();$(\'.mh_kmh_1>iframe\')[0].contentWindow.AutoHeight();">吐槽</a>')}
		if(fix == "true"){
			$(".space").before('<div class="tucaocon" style="display:none"></div>');
		    $(".tucaocon").append($(".mh_kmh_1"));
		}
		$(".fl>em").remove();
		$('.img_cont').remove();
		$('.opens').remove();
		//关灯部分
		$(".mt5").append('<a class="lightbt" style="position:relative;text-decoration:none;margin-left:20px;font-size:1.5em;text-align:center;display: inline-block; height: 30px;width:50px; background-color:rgb(180,180,180);z-index:1001" href="javascript:void(0)">关灯</a>');
		$("body").append('<div style="background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; top: 0px; left: 0px; display: none; height: 100%; width: 100%; z-index: 1000; opacity: 0.85;" id="heimu"></div>');
		if(light == "off"){	
				$("#heimu").css("display","block");
				$(".lightbt").text("开灯");
				localStorage.light = "off";
		};
		$(".lightbt").click(function(){
			if($(".lightbt")[0].innerHTML == "关灯"){
				$("#heimu").css("display","block");
				$(".lightbt").text("开灯");
				localStorage.light = "off";
			}else{
				$("#heimu").css("display","none");
				$(".lightbt").text("关灯");
				localStorage.light = "on";
			}
		});
		//插入设置位
		$(".mh_szwz2").after('<div class="user_defined" style="width:960px;margin:auto;"></div>');
		$(".mh_szwz2").css('margin-bottom','0')
		$(".user_defined").append('<div style="float:right;"><input id="tukuan" type="checkbox" /><span onclick="$(\'#tukuan\').click();">图宽调整</span><input id="tucao" type="checkbox" /><span onclick="$(\'#tucao\').click();">吐槽调整</span><input id="autophotos" type="checkbox" /><span onclick="$(\'#autophotos\').click();" style="margin-right:10px;">载入本话</span><span>每页</span><span style="position:relative;" id="num"></span><span>图</span></div>');
		//显示设置
		if(fix == "true"){$("#tucao").attr("checked","checked")};
		if(fixwidth == "true"){$("#tukuan").attr("checked","checked");$(".mh_zdimg img").width(function(){if($(this).width()>pagewidth){$(this).width(pagewidth)};
				});};
		if(autophotos == "true"){
			$("#autophotos").attr("checked","checked");
			nums = total - pageNum + 1;
		};
		}
		$("#num").append('<input id="tushu" style="width:26px;" type="text" value="' + nums + '" />');
		$("#num").append('<button style="display:none;font-size:13px;width:28px;height:20px;position:absolute;top:15px;right:0px;">√</button>');
		$("#num").mouseenter(function(){$("#num button").css("display","inline")});
		$("#num").mouseleave(function(){$("#num button").css("display","none")});
		//应用设置
		$("#num button").click(function(){
			localStorage.nums = $("#num input").val();
			nums = Number(localStorage.nums);
		    location.reload();
		});
		$("#tucao").click(function(){	
			localStorage.fix = $(this).is(":checked");
			location.reload();
		});
		$("#tukuan").click(function(){
			localStorage.fixwidth = $(this).is(":checked");
			fixwidth = localStorage.fixwidth;
			if(fixwidth == "true"){
				$(".mh_zdimg img").width(function(){
					if($(this).width()>pagewidth){$(this).width(pagewidth)};
				});
			}else{
				$(".mh_zdimg img").width("auto");
			}
		});
		$("#autophotos").click(function(){
			if((nums = total - pageNum + 1) >= 50 && $(this).is(":checked")){
				if(confirm("本话一共" + nums + "页，确定要全部加载？")){
					localStorage.autophotos = "true";
					location.reload();
				}else{
					$(this).attr("checked",false);
				}
			}else if($(this).is(":checked")){
				localStorage.autophotos = "true";
				location.reload();
			}else{
				localStorage.autophotos = "false";
				location.reload();
			}
		})

		function main(i){
			if(i<nums){
				nextpage = $(".mh_zdimg:last a").attr("href");
				var xhr = new XMLHttpRequest();
				xhr.open("GET",nextpage,true);
				xhr.onreadystatechange = function(){
					if (xhr.readyState==4 && xhr.status==200){
						arr = patt.exec(xhr.responseText);
						pagecon = arr[1];
						imgurl = arr[4];
						if(isNaN(arr[3])){
							pagenum = "最后一页";
							if(fix == "true"){pagecon+='<div class="tucaocon">' + arr[5] + '</div></div>';}
						}else if(arr[3] == 1){
							pagenum = "本话最后一页";
							if(fix == "true"){pagecon+='<div class="tucaocon">' + arr[5] + '</div></div>';}
						}else{
							pagenum = arr[3] - 1;
							if(fix == "true"){pagecon+='<div class="tucaocon">' + arr[5] + '</div></div>';}
						}
						$(".tit_mh:last").before(pagecon + '<div class="space" style="margin:5px 0 10px 0;width:100%;background-color:rgb(180,180,180);text-align:center;font-size:1.5em;color:rgb(25,130,220);">' + pagenum + '</div>');
		                if(fix == "true" && arr[3] != 1){$(".tucaocon:last").css("display","none")};
						if(fix == "true"){$(".space:last").append('<a style="text-decoration:none;margin-left:20px;border:1px solid;border-radius:3px;font-size:0.8em;" href="javascript:void(0)" onclick="$(\'.tucaocon:eq(' + i + ')\').toggle();$(\'.mh_kmh_1>iframe\')[' + i +'].contentWindow.AutoHeight();">吐槽</a>');}
						//$(".mh_zdimg:last div a img").attr("src",imgurl);
						$(".mh_zdimg:last").css({'z-index':'1001','position':'relative','display':'block'});
						$(".mh_zdimg:last>a>img").load(function(){
							if(fixwidth == "true"){
								$(".mh_zdimg>a>img").width(function(){
									if($(this).width()>pagewidth){$(this).width(pagewidth)};
								});
							}
							$(".mh_zdimg img").attr('oncontextmenu','');
							dragable(this);
							$(".mh_zdimg a").click(function(){return false});
							$(".mh_zdimg a").dblclick(function(){location.href = $(this).attr("href")});
							i++;
							main(i);
						})
					}
				}
				xhr.send();
			}else{
				$("body").append(arr[6]);
		        $(".tucaocon").css({"z-index":"1001","position":"relative","background-color":"white","width":"978px","margin":"0 auto"});
			}
		}
		main(1);
	}
script = document.createElement("script");
script.innerHTML = '(' + runit + ')()';
document.body.appendChild(script);