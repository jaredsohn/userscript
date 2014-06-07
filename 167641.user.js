// ==UserScript==
// @name           MM-script
// @author         game@wo.com.cn
// @namespace      game@wo.com.cn
// @description    多功能合集脚本
// @version        1.0.0.3
// @create         2013-05-16
// @lastmodified   2013-05-16
// @include        http://www.rayfile.com/*/files/*
// @include        http://dl.vmall.com/*
// @include        http://www.vdisk.cn/down/index/*
// @include        http://*.yunfile.com/file/*
// @include        http://*.7958.com/down*.html
// @include        http://down.it168.com/*/index.shtml
// @include        http://www.gxp.cc/*.html
// @include        http://www.yimuhe.com/*.html
// @include        http://www.fileim.com/file/*.html
// @include        http://www.kuaipan.cn/file/id_*.htm
// @include        http://dl.dbank.com/*
// @include        http://www.79pan.com/*.html
// @include        http://www.87pan.com/*.html
// @include        http://u.xunzai.com/?ac=download&id=*
// @include        http://www.ctdisk.com/file/*
// @include        http://www.400gb.com/file/*
// @include        http://www.bego.cc/file/*
// @include        http://www.pipipan.com/file/*
// @include        http://www.supan.la/*.html
// @include        http://www.bpan.net/*.html
// @include        http://www.azpan.com/*.html
// @include        http://www.360disk.com/*.html
// @include        http://d.119g.com/f/*.html
// @include        http://*.dospy.com/*attachment.php?aid=*
// @include        http://www.verycd.com/topics/*
// @include        http://www.verycd.gdajie.com/detail.htm?id=*
// @include        http://www.onemaya.com/*
// @exclude        http://www.verycd.com/topics/*/comments*
// @copyright      4.12.102r
// @grant          none
// @require       http://lib.sinaapp.com/js/jquery/1.9.0/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/167641.meta.js
// @downloadURL    http://userscripts.org/scripts/source/167641.user.js
// ==/UserScript==

(function () {
	
	function Mm() { //先声明变量及函数
		var Lc = location,
		lurl = location.href;
		var dhost = location.hostname.replace(/\w+\./, '');
		var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
		var _Q = function (d) {
			return document.querySelector(d)
		},
		_Qa = function (d) {
			return document.querySelectorAll(d)
		};
		var TiTle = '点击下载(^__^)',
		TiT = 'Cracker By Mm';
		var DxM = function (m) {
			return lurl.toLowerCase().indexOf(m) > 0
		}
		function AutoPRe() {
			if (DxM("file-"))
				Lc.href = lurl.replace(/file-/i, 'down-');
		}
		//域名判断开始
		switch (dhost) {
		case "vmall.com": //华为网盘,Login,Vcode,Wait 10.
			
		case "dbank.com": //登录用户下无效
			if (!win.$.cookie) {
				if (document.cookie.indexOf('pid=') <= 0) {
					document.cookie = "pid=39";
					location.reload();
				}
			} else if (!win.$.cookie("pid")) {
				win.$.cookie("pid", "30", {
					expires : 365
				});
				location.reload();
			};
			//等级过低不能外链修复
			if (win.globallinkdata.data.linkOverAuth == "true") {
				var Lia = _Qa('a[class="disk_icon compress-icon"]');
				for (var i = 0; i < Lia.length; i++) {
					Lia[i].onclick = function () {
						win.dbank.securelink.downloadfile(this);
						return false;
					}
					Lia[i].href = "#";
				}
			}
			break;
		case "vdisk.cn": //威盘,wait 10s,code
			$('#loadingbox').hide();
			win.yanzheng_ok();
			break;
		case "verycd.com": //电驴VeryCD
			$("#iptcomED2K").before("<input type='button' value='显示隐藏资源（^__^）' class='button downall' onclick='$(\"#iptcomED2K\").html(\"<iframe class=Banner3 src=\"+location.href.replace(\"www.verycd.com\",\"www.verycd.gdajie.com\")+\" scrolling=yes width=760 height=550 frameborder=no></iframe>\")' />");
			$("#iptcomED2K").before(" <input type='button' value='强制显示资源（←__←）备用2' class='button' onclick='location.href=\"http://www.ed2kers.com/index.php/search/index?c=0&keyword=" + $('#topicstitle').text() + "&p=1\"' title='" + TiT + "' />");
			break;
		case "yunfile.com": //YunFile;Wait 30,No-Ad,Timeout,autodownload
			var Vco = _Q('#vcode');
			if (Vco) {
				Vco.focus();
				Vco.onkeyup = function () {
					this.value.length == 4 && win.redirectDownPage()
				};
				return
			}
			var wtime = _Q('#down_interval_tag'),
			wsp1 = _Q('#wait_span');
			if (wtime) {
				window.setInterval(function () {
					if (wtime.innerHTML <= 1) {
						win.redirectDownPage();
					}
				}, 1200);
			} else if (wsp1) {
				win.redirectDownPage();
			} else {
				var checkT = '<label style="color:red" title=自动><input type="checkbox" id="AutoDN" />启用全自动</label>';
				_Q("#url_div").innerHTML = checkT + _Q("#url_div").innerHTML;
				_Q("#AutoDN").onclick = function () {
					this.checked ? win.setCookie('AutoDN', 'Yes', '1') : win.setCookie('AutoDN', '', '-1')
				}
				if (win.getCookie('AutoDN')) {
					win.ck();
					_Q('#hidebtn').click();
					_Q("#AutoDN").checked = true;
				}
				//No-Ad,Timeout-40s
				win.doDownload = win.startPlaySites = win.playSite = function () {
					return true
				};
			}
			break;
		case "7958.com": //千军万马,原域名qjwm.com,Vcode,wait>2"
			if (DxM("down_"))
				Lc.href = lurl.replace(/down_/i, 'download_');
			_Q('#downtc').innerHTML = win.downurl;
			_Q('#inputyzm').style.display = 'none';
			break;
		case "rayfile.com": //飞速,nextpag,showdown
			if (typeof win.vkey != 'undefined') {
				location.href = lurl + win.vkey;
			} else {
				location.href = "javascript:var filesize=100; showDownload();";
			};
			break;
		case "it168.com": //ReAD,Vcode,by Mm 2012.12.17
			jQuery(".right_four").remove();
			var dl = jQuery("#download");
			dl.html("<a href='javascript:;' class='sign11' style='color:greenyellow' onclick='func1();return false;' title='" + TiTle + "'>&nbsp;&nbsp;" + dl.html() + "</a>");
			break;
		case "gxp.cc": //Gxp ,Vcode,5s,by Mm 2012.12.18
			AutoPRe();
			_Q('#down_box').style.display = '';
			_Q('#code_box').style.display = 'none';
			win.update_sec = false;
			win.down_file_link();
			break;
		case "yimuhe.com": //一木禾 ,Vcode,8s,by Mm 2012.12.26
			AutoPRe();
			win.checkWait = false;
			win.div_show('yzm', 'loading');
			win.wait = '';
			win.callback(1);
			_Q('#download').getElementsByTagName('a')[1].click();
			break;
		case "xunzai.com": //迅载,Logon,Integral ;http://117.40.196.70:805/?ac=getip
			if ($('.title').html() == null) {
				win.closeForm();
				var ip1 = "http://u.dx7.xunzai.com:8",
				ip11 = "http://u.wt7.xunzai.com:8",
				ip2 = "http://117.40.196.70:8",
				ip3 = "http://u.dx3.xunzai.com:8",
				ip33 = "http://u.wt3.xunzai.com:8",
				Aurl = win.all_url;
				var urll = '<span title="' + TiTle + '"><div title="如无法连接显示，此网站问题" class="urlist telcom"><a href="' + ip1 + '71/' + Aurl + '">电信下载1</a><a href="' + ip2 + '51/' + Aurl + '">电信下载2</a><a href="' + ip2 + '11/' + Aurl + '">电信下载3</a><a href="' + ip3 + '31/' + Aurl + '">电信下载4</a></div>';
				var urll1 = '<div class="urlist unicom"><a href="' + ip11 + '72/' + Aurl + '">联通网通下载1</a><a href="' + ip2 + '52/' + Aurl + '">联通网通下载2</a><a href="' + ip2 + '12/' + Aurl + '">联通网通下载3</a><a href="' + ip33 + '32/' + Aurl + '">联通网通下载4</a></div></span>';
				$('.urlist').html(urll + urll1);
			}
			break;
		case "ctdisk.com": //城通网盘,简化输入验证码,by Mm 2013.1.29
		case "400gb.com":
		case "bego.cc": //必上网盘
		case "pipipan.com":
			$('#vfcode').after('<input type="reset" value="重设"/><table id="Ta" title="数字输入盘 - By Yulei"><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td><td>0</td></tr><tr><td>7</td><td>8</td><td>9</td></tr></table><style>#Ta td {font:25px Tahoma;font-weight:bold;color:red;cursor:pointer;vertical-align: middle;border: 1px solid #DDDDDD;padding:6px;} #Ta{background-color:#ffcc99;position:relative;bottom:139px;left:170px}</style>');
			var rcde = $("#randcode")[0];
			for (i = 0; i < 10; i++) {
				$('#Ta td')[i].onclick = function () {
					rcde.value += this.innerHTML;
					if (rcde.value.length == 3) {
						$('#Comfirm').click();
					}
				}
			}
			break;
		case "fileim.com": //文件即时通,30s and 300s waiting,by Mm 2013.1.31
			var Durl = "http://69.197.155.141:7001/download.ashx?a=0," + win.download.fileOnlyCode + ",0";
			$('#freedown').unbind('click').bind('click', function () {
				location.href = Durl
			}).attr({
				'class' : 'b1 dbtn',
				'value' : '免费下载',
				'title' : TiTle
			});
			break;
		case "kuaipan.cn": //金山快盘免登录下载,Source-Code by (modules/outlink_detail.js); by Mm 2013.02.02
			if (!$('#outlinklogin').text()) {
				return
			}; //是否登录;
			var olid = $("#file").attr("fileid"),
			DUrl = win.CONST.DOWNLOAD_URL + "/cdlsched/getdl?fid=" + win.fileid + "&amp;acc_params=entryid:" + olid + ",pickupCode:" + $("#pickcodevalue").val();
			$('#jSpeedDownload').before('<a href="' + DUrl + '" class="imitate-btn f16 btn-green l" style="margin-left:20px; padding:10px 20px;" title="' + TiTle + '"><b>免费下载</b></a>');
			break;
		case "79pan.com": //奇聚网盘,6s wait,by Mm 2013.3.09
		case "87pan.com": //87盘,8s wait,by Mm 2013.4.15
		case "bpan.net": //宝盘,去验证,by Mm 2013.4.16
		case "azpan.com": //爱站盘,by Mm 2013.4.16
		case "360disk.com": //天天网盘,去验证,by Mm 2013.4.16
			AutoPRe();
			$('#down_box').show();
			$('#down_box2, #code_box').hide();
			$("#ycform").remove();
			break;
		case "supan.la": //速盘,5s wait,NextPage,by Mm 2013.3.14
			win.update_sec = function () {};
			win.down_file_link();
			var down = _Q('.down_btn');
			if (down.href.indexOf('download.php') >= 0) {
				Lc.href = down;
			}
			break;
		case "119g.com": //119G网盘,有的免迅雷,by Mm 2013.4.15
			if (!DxM("_dx")) {
				Lc.href = lurl.replace(/(\w+)\.html/i, "$1_dx.html");
			}
			var Da = $(".downurllist a").eq(0);
			if (Da.attr("href") == "#") {
				Da.attr({
					"href" : win.thunder_url,
					"onclick" : "",
					"title" : TiT
				}).text("免费下载哦")
			}
			break;
		case "dospy.com": //塞班论坛,免币下载（需登录）,参考自晨光规则,by Mm 2013.4.18
			Lc.href = lurl.replace(/attachment/ig, 'downwithnosbb');
			break;
		case "verycd.gdajie.com": 
			//http://www.verycd.gdajie.com/detail.htm?id=
			//破解延时等待
			document.getElementById('detail').style.display = 'block' ;
			document.getElementById('predetail').style.display = 'none' ;
			break;
		case "onemaya.com": 
			var allmayatxt=document.documentElement.outerHTML;
			var new_allmayatxt=allmayatxt.replace("[img]", "<img src=\"");
			var new_allmayatxt=new_allmayatxt.replace("[/img]", "\">");
			document.documentElement.outerHTML=new_allmayatxt;
			break;
		default:
			//void(0);
		} //alert("TestY");
	}
	window.addEventListener('DOMContentLoaded', Mm, false);
})();