// ==UserScript==
// @name           fetchRabit
// @namespace      http://ra.gg
// @include        http://ra.gg/!*
// @include        https://ra.gg/!*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://mcpub.googlecode.com/files/jquery.blockUI.js
// @require		   http://mcpub.googlecode.com/files/jquery.shiftclick.js
// @version 0.9.0
// ==/UserScript==


if (document.title.length == 0) return;
if (unsafeWindow.console) {
	//GM_Log = unsafeWindow.console.log;
}

(function () {
	var load = function () {
		if (typeof(jQuery) == 'undefined' && typeof(jQuery.blockUI) == 'undefined') {
			alert('GM版本过低或脚本加载有误，请尝试重新安装脚本')
			//return load();
		}
		else {
			main();
		}
	}();


	function main() {
		if (!mcAtom) {
			var mcAtom = {
				layerPos: localStorage.getItem('layerPos') == null ? 'left' : localStorage.getItem('layerPos'),
				ALLCHECKED: false,
				downLinks: [],
				mcQueue: [],
				toraQueue: [],
				$: jQuery,
				downlst: "",
				checkboxs: [],
				lastAddedCheckbox: 0,
				lastChecked: 0,
				loginTora: function () {
					setTimeout(

					function () {
						GM_xmlhttpRequest({
							method: "GET",
							headers: {
								'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
								'Accept': 'application/atom+xml,application/xml,text/xml',
								//'Cookie': document.cookie
							},
							url: "https://www.moeid.com/login?service=http://www.jsharer.com/user/dashboard.htm",
							onreadystatechange: function (responseDetails) {
								if (responseDetails.readyState == 2) {
									mcAtom.popUpLoading('登录中，请稍候');
								}
								else if (responseDetails.readyState == 4) {
									$.unblockUI();
								}
							},
							onload: function (response) {
								//GM_Log('登录成功');
							}
						});
					}, 0);

				},
				requestMC: function (requestFiles) {
					if (requestFiles.length > 0) {
						setTimeout(

						function () {
							GM_xmlhttpRequest({
								method: "GET",
								headers: {
									'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
									'Accept': 'application/atom+xml,application/xml,text/xml',
									//'Cookie': document.cookie
								},
								url: requestFiles[0]['Addr'],
								onreadystatechange: function (responseDetails) {
								console.log(responseDetails.readyState);
									if (responseDetails.readyState == 2) {
										var name = requestFiles[0]['fileName'] != null ? requestFiles[0]['fileName'] : requestFiles[0]['Addr'].match(/http:\/\/www\.jsharer\.com\/download\/(.*)\.htm/)[1];
										var popText = '正在提取' + name + '中，请稍候';
										//GM_Log(popText);
										mcAtom.popUpLoading(popText);
									}
									else if (responseDetails.readyState == 4) {
										$.unblockUI();
									}
								},
								onload: function (response) {
									//GM_Log(response.responseText);
									var mcInfo = mcAtom.analyzeMC(response.responseText);
									//downLink=mcAtom.analyzeMC(response.responseText);
									var downLink = mcInfo['url'];
									var waitTime = mcInfo['waitTime'] ? mcInfo['waitTime'] : '0';
									mcAtom.downLinks.push({
										'fileName': requestFiles[0]['fileName'] != null ? requestFiles[0]['fileName'] : mcInfo['filename'],
										'Addr': downLink,
										'waitTime': waitTime,
										'requestAddr': requestFiles[0]['Addr'],
										'size': mcInfo['size'],
										'hash': mcInfo['hash'],
									});
									requestFiles.shift();
									mcAtom.requestMC(requestFiles);
								}
							});
						}, 0);
					}
					else {
						mcAtom.$.growlUI('MCFETCH：', '提取完成');
						mcAtom.showAddress();
					}
				},
				analyzeMC: function (page) {
					try {
						var XPH = page.match(/xph\ =\ \'(.*?)\';/)[1];
						var CPH = page.match(/cph\ =\ \'(.*?)\';/)[1];
						var NPH = page.match(/nph\ =\ \'(.*?)\';/)[1];
						var CPP = page.match(/cpp\ =\ \'(.*?)\';/)[1];
						var NPU = page.match(/npu\ =\ \'(.*?)\';/)[1];
						var filename = page.match(/dl-text.*[\s\S]*?<p>([\s\S]*?)<span/)[1].trim();
						var hash = page.match(/dl-hashcode\">SHA-1:(.*?)<\/span>/);
						var size = page.match(/dl-stats><var>(.*?)<\/var>/)[1];
						var waitTime = page.match(/var\ cpc\ =\ parseInt\(\'(.*)\'\)/);
						var fileO = page.match(/\+npu\+\"\/\"\+\"(.*?)\"\);/)[1];
						var outputUrl = "http://www.jsharer.com/download/mc/" + CPH + "/" + XPH + "/" + NPH + "/" + CPP + "/" + NPU + "/" + fileO;
						return {
							'size': size,
							'hash': hash ? hash[1].trim() : null,
							'filename': filename,
							'url': outputUrl,
							'waitTime': waitTime ? waitTime[1] : '0'
						};
					}
					catch (err) {
						//GM_Log(err);
						var outputUrl = "文件提取失败，可能被锁定或者被删除";
						var waitTime = "-1";
						return {
							'url': outputUrl,
							'waitTime': waitTime
						};
					}
				},
				scanBlog: function () {
					var pageFiles = $('.ficon_jsmc');
					if (pageFiles.length > 0) {
						for (i = 0; i < pageFiles.length; i++) {
							var archor = $(pageFiles[i]).find('a');
							var mcAddr = archor.attr('href').match(/\/download\/.*htm/);
							if (mcAddr != null) {
								var checkbox = $('<input type="checkbox" class="mcCheck"/>');
								checkbox.attr('id', 'checkbox-#' + mcAtom.lastAddedCheckbox);
								var extLogo = $('<img class="src_jsharer" src="http://mcpub.googlecode.com/files/icon_file_unkonw_s.png"/>');
								extLogo.css('margin', '2px');
								var prependPoint = $(pageFiles[i]);
								prependPoint.prepend(checkbox).prepend(extLogo);
								var filename = archor.html();
								var lastdot = filename.split('.');
								var lastname = lastdot[lastdot.length - 1];
								mcAtom.checkboxs.push({
									'lastname': lastname,
									'checkbox': checkbox,
									'id': mcAtom.lastAddedCheckbox
								});
								mcAtom.lastAddedCheckbox += 1;
							}
						}
						$('.mcCheck').css('display', 'block').css('float', 'left').css('margin-top', '8px').css('margin-right', '10px');
						$('input[type=checkbox]').shiftClick();
						$('.src_jsharer').click(function () {
							var extension = $(this).siblings('a').html().split('.');
							if (extension.length > 1) {
								extension = extension[extension.length - 1];
								mcAtom.checkByFilter(extension);
							}
						});
						$('.src_jsharer').hover(

						function () {
							$(this).css('cursor', 'pointer');
						}, function () {
							$(this).css('cursor', 'default');
						});
					}
				},
				checkAll: function () {
					if (mcAtom.ALLCHECKED) {
						$(':checkbox').attr('checked', false);
						mcAtom.ALLCHECKED = false;
					}
					else {
						$(':checkbox').attr('checked', true);
						mcAtom.ALLCHECKED = true;
					}
				},
				fetchChecked: function () {
					mcAtom.downLinks = [];
					mcAtom.mcQueue = [];
					var checkedBox = $(':checked');
					$.each(checkedBox, function (i, n) {
						className = n.className;
						if (className == 'mcCheck') {
							var addr = $(n).siblings('a').attr('href');
							var mcAddr = addr.match(/\/download\/.*htm/);
							if (mcAddr != null) {
								var furl = "http://www.jsharer.com" + mcAddr;
								var fileName = $(n).siblings('a').html();
								mcAtom.mcQueue.push({
									'fileName': fileName,
									'Addr': furl
								});
							}
						}
					});
					if (mcAtom.mcQueue.length > 0) {
						mcAtom.requestMC(mcAtom.mcQueue);
					}
				},
				parseFids: function (process, downUrl) {
					//process can be fetch or renew
					//downUrl should be one download address per line
					//http://www.jsharer.com/download/.....1.htm
					//http://www.jsharer.com/download/.....2.htm
					var urls = downUrl.split('\n');
					var files = [];
					if (process == 'renew') {
						$.each(urls, function (i, url) {
							try {
								var flag = url.match(/http:\/\/www\.jsharer\.com\/download\/(.*)\.htm/)[1];
								if (flag.length == 32) {
									files.push({
										'fid': flag,
										'filename': ""
									});
								}
							}
							catch (err) {
								if (console) {
									//GM_Log(err);
								}
							}
						});

						mcAtom.renewPage(files)
					}
					else if (process == 'fetch') {
						mcAtom.downLinks = [];
						mcAtom.mcQueue = [];
						$.each(urls, function (i, url) {
							try {
								var flag = url.match(/http:\/\/www\.jsharer\.com\/download\/(.*)\.htm/)[1];
								if (flag.length == 32) {
									mcAtom.mcQueue.push({
										'Addr': url,
										'fileName': null
									});
								}
							}
							catch (err) {
								if (console) {
									//GM_Log(err);
								}
							}
						});
						if (mcAtom.mcQueue.length > 0) {
							mcAtom.requestMC(mcAtom.mcQueue);
						}
					}
				},
				showCheckedLoc: function () {
					var loc = [];
					var checkedBox = $(':checked');
					//var t_size=0;
					$.each(checkedBox, function (i, n) {
						className = n.className;
						if (className == 'mcCheck') {
							var addr = $(n).siblings('a').attr('href');
							var mcAddr = addr.match(/\/download\/(.*)\.htm/);
							var tmpSize = $(n).siblings('var').html();
							//t_size += tmpSize ? mcAtom.showLength(tmpSize) : 0;
							if (mcAddr != null) {
								loc.push("http://www.jsharer.com" + mcAddr[0]);
							}
						}
					});
					var node = $("<textarea readonly='readonly'>" + loc.join('\n') + "</textarea>").css({
						'width': '500px',
						'height': '250px'
					});
					//GM_log( t_size/1024/1024 + "MB");
					mcAtom.showWindow(node);
				},
				processByInput: function () {
					var title = "批量续期";
					var header1 = $("<h1>请收入MC地址</h1>");
					var inputBox = $("<textarea id='fids'></textarea>").css({
						'width': '490px',
						'height': '200px'
					});
					var renewButton = $("<input class='processButton' type='button' id='renewButton' value='祝福'></input>").css('margin-left', '50px');
					var fetchButton = $("<input class='processButton' type='button' id='fetchButton' value='提取'></input>").css('margin-left', '10px');
					var node = $("<div id='inputbox'></div>");
					node.append(header1).append(inputBox).append(fetchButton).append(renewButton);
					mcAtom.showWindow(node, title);
					node.find('.processButton').click(function () {
						var t1 = this.id == 'renewButton' ? 'renew' : 'fetch';
						var urls = node.find('#fids').val();
						mcAtom.parseFids(t1, urls);
					});
				},
				showWindow: function (node, title) {
					if (!title) {
						title = "Renew Files";
					}
					var naviWin = $('<div id="navWin"></div>').append('<div id="boxHeader"></div>').append('<div id="boxContent"></div>');
					naviWin.find('#boxHeader').append('<span>' + title + '</span>').append('<a style="float:right" id="close_btn" href="javascript:return(null);">关闭</a>');
					naviWin.find('#boxContent').append(node);
					mcAtom.$.blockUI({
						message: naviWin,
						css: {
							width: "520px",
							height: "300px"
						}
					});
				},
				confirmRenew: function (fids, fnames,token) {
					var t1 = "renewfile";
					var t2 = 1;
					var t3 = fids;
					var t4 = fnames;
					var t5 = "http://www.jsharer.com/user/dashboard.htm";
					var t6 = "&org.apache.struts.taglib.html.TOKEN="+token;
					setTimeout(

					function () {
						GM_xmlhttpRequest({
							method: "POST",
							headers: {
								'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
								'Accept': 'application/atom+xml,application/xml,text/xml',
								//'Cookie': document.cookie,
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							url: "http://www.jsharer.com/user/mppay.htm",
							data: "t1=" + t1 + "&t2=" + t2 + "&t3=" + t3 + "&t4=" + t4 + "&t5=" + t5 + "&t6=" + t6 ,
							onreadystatechange: function (responseDetails) {
								if (responseDetails.readyState == 2) {
									mcAtom.popUpLoading('提交中，请稍候');
								}
								else if (responseDetails.readyState == 4) {
									$.unblockUI();
								}
							},
							onload: function (response) {
								try {
									try {
										var tmp = response.responseText.match(/<div\ id=\"extend_content\">[\s\S]*?<\/div>/m)[0];
										mcAtom.showWindow($(tmp), 'Renew Window');
									}
									catch (e) {
										mcAtom.$.growlUI('MCATOM', '提取失败，请确认已经登陆萌卡并获取到MC通行证!')
									}
								}
								catch (err) {
									if (console) {
										//GM_Log(err);
									}
								}
							}
						});
					}, 0);

				},
				renewPage: function (fileinfo) {
					//Fileinfo includes fid&filename
					//Should be formed like[{fid:'fid',filename:'filename'},{}....etc]
					var t1 = 1;
					var t2 = [];
					var t3 = [];
					$.each(fileinfo, function (i, info) {
						var filename = info['filename'];
						var fid = info['fid'];
						t2.push(fid);
						t3.push(filename);
					});
					var t4 = "http://www.jsharer.com/user/dashboard.htm";
					t2 = encodeURIComponent(t2.join(','));
					t3 = encodeURIComponent(t3.join(','));
					setTimeout(

					function () {
						GM_xmlhttpRequest({
							method: "POST",
							headers: {
								'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
								'Accept': 'application/atom+xml,application/xml,text/xml',
								//'Cookie': document.cookie,
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							url: "http://www.jsharer.com/renewPay.htm",
							data: "t1=" + t1 + "&t2=" + t2 + "&t3=" + t3 + "&t4=" + t4,
							onreadystatechange: function (responseDetails) {
								if (responseDetails.readyState == 2) {
									mcAtom.popUpLoading('提交中，请稍候');
								}
								else if (responseDetails.readyState == 4) {
									$.unblockUI();
								}
							},
							onload: function (response) {
								try {
									var tmp = response.responseText.match(/<div\ id=\"extend_content\">[\s\S]*?<\/div>/m)[0];
									var node = $(tmp).append("<input id='renewButton' type='button' value='续期'></input>");
									var token = response.responseText.match(/name=\"org\.apache\.struts\.taglib\.html\.TOKEN\"\ value=\"(.*?)\"/)[1];
									mcAtom.showWindow(node, 'Renew Window');
									$(node).find('#renewButton').click(function () {
										mcAtom.confirmRenew(t2, t3,token);
									});
								}
								catch (e) {
									mcAtom.$.growlUI('MCATOM', '提取失败，请确认已经登陆萌卡并获取到MC通行证!')
								}
							}
						});
					}, 0);
				},
				renewChecked: function () {
					mcAtom.renewList = [];
					var checkedBox = $(':checked');
					$.each(checkedBox, function (i, n) {
						className = n.className;
						if (className == 'mcCheck') {
							var addr = $(n).siblings('a').attr('href');
							var mcAddr = addr.match(/\/download\/(.*)\.htm/);
							if (mcAddr != null) {
								var fileName = $(n).siblings('a').html();
								//GM_log(fileName+":"+mcAddr);
								mcAtom.renewList.push({
									'filename': fileName,
									'fid': mcAddr[1]
								});
								//			mcAtom.requestMC(mcAtom.mcQueue);
							}
						}
					});
					if (mcAtom.renewPage.length > 0) {
						mcAtom.renewPage(mcAtom.renewList);

					}
				},
				showAddress: function () {

					//mcAtom.addrBox=$('<div class="popup toollayer popup_big" id="dbp_batchedPublish" style="display: block"><div class="popup_inner"><a onclick="mcAtom.closeBox();" href="#void" class="closeBtn" style="  position: absolute;right: 20px;top: 5px;border: 0 none;color: #333333;font: 12px Verdana,Geneva,Arial,Helvetica,sans-serif;margin: 0;outline: 0 none;padding: 0;">关闭</a><h1 style="    background: url(http://mcpub.googlecode.com/files/bg_coltitle.png) repeat-x scroll 0 0 transparent;font-weight: bold;padding: 5px 0 5px 40px;;border: 0 none;color: #333333;font: 12px Verdana,Geneva,Arial,Helvetica,sans-serif;margin: 0;outline: 0 none;padding: 0;">批量发布文件</h1><div class="popup_content"><div class="batchedlinks"><h2 style="border: 0 none;color: #333333;font: 12px Verdana,Geneva,Arial,Helvetica,sans-serif;margin: 0;outline: 0 none;padding: 0;"><a onclick="mcAtom.saveToDownList();" href="#void" style="border: 0 none;color: #00ff84;font: 12px Verdana,Geneva,Arial,Helvetica,sans-serif;margin: 0;outline: 0 none;padding: 0;">输出到文件</a></h2><textarea readonly="true" id="batchedlink" style="height: 300px;width: 500px;"></textarea></div></div></div></div>');
					mcAtom.addrBox = $('<div id="batchPublish"></div>').append('<div id="batchHeader"></div>').append('<div id="batchBar"><ul style="float:left;list-style=none"></ul></div>').append('<div id="batchContent" style="float:left;clear:both"></div>').append('<div id="30_link" class="mcTab"><textarea></textarea></div>').append('<div id="60_link" class="mcTab"><textarea></textarea></div>').append('<div id="instant_link" class="mcTab"><textarea></textarea></div>').append('<div id="unavailable_link" class="mcTab"><textarea></textarea></div>');

					mcAtom.addrBox.find('.mcTab').css('display', 'none');

					mcAtom.addrBox.find('#batchHeader').append('<a style="float:left" id="output_txt" href="javascript:return(null);">输出到文件</a>').append('<a style="float:left;margin-left:10px" id="info_txt" href="javascript:return(null);">输出信息列表</a>').append('<a style="float:left;margin-left:10px" id="linkpage" href="javascript:return(null);">链接页面</a>').append('<span>MCATOM LIST</span>').append('<a style="float:right" id="close_btn" href="javascript:return(null);">关闭</a>');

					batchContent = mcAtom.addrBox.find('#batchContent');


					mcAtom.addrBox.find('#batchBar ul').append('<li><a href="#30_link" id="30_archor">30秒后可下载</a></li>').append('<li><a href="#60_link" id="60_archor">60秒后可下载</a></li>').append('<li><a href="#instant_link" id="instant_archor">立刻可下载</a></li>').append('<li><a href="#unavailable_link" id="unavailable_archor">暂不可下载</a></li>').find('li').css('list-style', 'none').css('float', 'left').css('margin-left', '30px');

					mcAtom.addrBox.find('#batchBar ul li:first a').css('color', 'red');
					mcAtom.addrBox.find('#30_link').css('display', 'block');

					mcAtom.addrBox.find('#batchBar ul li a').click(function (e) {
						$('#batchBar ul li a').css('color', 'black');
						$(this).css('color', 'red');
						e.stopPropagation();
						var catchId = $(this).attr('href').split('#')[1];
						$.each($('.mcTab'), function (i, n) {
							if (n.id == catchId) {
								$(n).css('display', 'block');
							}
							else {
								$(n).css('display', 'none');
							}
						});
						//GM_log(catchId);
						//batchContent.empty();
						//batchContent.append($(catchId).clone().css('display','block'));
					});



					var tempString_30 = "";
					var count_30 = 0;
					var tempString_60 = "";
					var count_60 = 0;
					var tempString_instant = "";
					var count_instant = 0;
					var tempString_unavailable = "";
					var count_unavailable = 0;
					for (i = 0; i < mcAtom.downLinks.length; i++) {
						if (mcAtom.downLinks[i]['waitTime'] == '30') {
							tempString_30 += mcAtom.downLinks[i]['fileName'] + ":\n" + mcAtom.downLinks[i]['Addr'] + "\n";
							count_30 += 1;
						}
						else if (mcAtom.downLinks[i]['waitTime'] == '60') {
							tempString_60 += mcAtom.downLinks[i]['fileName'] + ":\n" + mcAtom.downLinks[i]['Addr'] + "\n";
							count_60 += 1;
						}
						else if (mcAtom.downLinks[i]['waitTime'] == '-1') {
							tempString_unavailable += mcAtom.downLinks[i]['fileName'] + "—— 该文件暂时不可下载\n提取地址:" + mcAtom.downLinks[i]['requestAddr'] + "\n";
							count_unavailable += 1;
						}
						else if (mcAtom.downLinks[i]['waitTime'] == '0') {
							tempString_instant += mcAtom.downLinks[i]['fileName'] + ":\n" + mcAtom.downLinks[i]['Addr'] + "\n";
							count_instant += 1;
						}
					}
					mcAtom.addrBox.find('#30_archor').html('30秒后可下载(' + count_30 + ')');
					mcAtom.addrBox.find('#60_archor').html('60秒后可下载(' + count_60 + ')');
					mcAtom.addrBox.find('#instant_archor').html('立刻可下载(' + count_instant + ')');
					mcAtom.addrBox.find('#unavailable_archor').html('暂不可下载(' + count_unavailable + ')');

					mcAtom.addrBox.find('#30_link textarea').val(tempString_30);
					mcAtom.addrBox.find('#60_link textarea').val(tempString_60);
					mcAtom.addrBox.find('#instant_link textarea').val(tempString_instant);
					mcAtom.addrBox.find('#unavailable_link textarea').val(tempString_unavailable);

					mcAtom.addrBox.find('textarea').css({
						'width': '500px',
						'height': '250px'
					});
					mcAtom.$.blockUI({
						message: mcAtom.addrBox,
						css: {
							width: "520px",
							height: "300px"
						}
					});

				},
				getLinkPage: function () {
					var content = $('<div id="main"><h1>Link Page</h1></div>');
					var insertPoint = content.filter('#main');
					$.each(mcAtom.downLinks, function (i, link) {
						if (link.waitTime != '-1') {
							var archor = $('<a class="dlinks"></a>');
							archor.attr('href', link.Addr).html(link.fileName);
							insertPoint.append(archor).append('<br/>');
						}
					});
					return content.html();
				},
				saveInfoFile: function () {
					var tempString = "";
					$.each(mcAtom.downLinks, function (i, dobj) {
						var ss = dobj.fileName + "\t" + dobj.size + "\t" + dobj.hash + "\t" + dobj.requestAddr + "\n";
						tempString += ss;
					});
					var uriContent = "data:application/octet-stream," + encodeURIComponent(tempString);
					newWindow = window.open(uriContent, 'infoLst');
				},
				showLinkPage: function () {
					var content = mcAtom.getLinkPage();
					mcAtom.getPopWindow(content);
				},
				saveToDownList: function () {
					var tempString = "";
					for (i = 0; i < mcAtom.downLinks.length; i++) {
						if (mcAtom.downLinks[i]['waitTime'] != '-1') {
							tempString += mcAtom.downLinks[i]['Addr'] + "\n";
						}
					}
					mcAtom.downlst = tempString;
					var uriContent = "data:application/octet-stream," + encodeURIComponent(tempString);
					newWindow = window.open(uriContent, 'downLst');
				},
				popUpLoading: function (popInfo) {
					mcAtom.loadingBar.find('#popupMessage').html(popInfo);
					mcAtom.$.blockUI({
						message: mcAtom.loadingBar
					});
				},
				closeBox: function () {
					mcAtom.$.unblockUI();
				},

				checkByFilter: function (lastname) {
					if (typeof(mcAtom[lastname + '_checked']) == 'undefined' || mcAtom[lastname + '_checked'] == false) {
						$.each(mcAtom.checkboxs, function (i, file) {
							if (file['lastname'] == lastname) {
								$(file['checkbox']).attr('checked', true);
							}
						});
						mcAtom[lastname + '_checked'] = true;
					}
					else {
						$.each(mcAtom.checkboxs, function (i, file) {
							if (file['lastname'] == lastname) {
								$(file['checkbox']).attr('checked', false);
							}
						});
						mcAtom[lastname + '_checked'] = false;
					}

				},
				uncheckByFilter: function (lastname) {
					$.each(mcAtom.checkboxs, function (i, file) {
						if (file['lastname'] == lastname) {
							$(file['checkbox']).attr('checked', false);
						}
					});
				},
				createButton: function (archor) {
					archor.css('display', 'block');
					var controlButton = $('<div class="controlButton"></div>');
					controlButton.css({
						'border-radius': '8px',
						'border': '#ccc solid 1px',
						'line-height': '18px',
						'margin': '4px 2px',
						'float': 'left',
						'width': '110px',
						'height': '20px',
						'text-align': 'center',
						'background-color': 'transparent'
					});
					return controlButton.append(archor);
				},
				appendButton: function (layer, button) {
					layer.append(button);
				},
				changePos: function (pos) {
					var layer = $('#btLayer');
					var layerWidth = layer.width();
					if (pos == 'left') {
						$('#btLayer').css('left', 0);
						localStorage.setItem('layerPos', 'left');
					}
					else {
						$('#btLayer').css('left', document.documentElement.clientWidth - layerWidth - 5);
						localStorage.setItem('layerPos', 'right');
					}
				},
				initButton: function () {
					//console.log($.fn.jquery);
					var top = document.documentElement.clientHeight / 2;
					var buttonLayer = $('<div id="btLayer"></div>');
					buttonLayer.css({
						'position': 'fixed',
						'top': top,
						'width': '120px',
						'height': '200px',
						'z-index': '9999',
						'background-color': 'transparent',
						'border': '#F3F9FF solid 2px',
					});
					var positionSwitcher = $('<input class="layerPos" type="radio" name="layerPos" value="left">Gandalfr</input><input class="layerPos" type="radio" name="layerPos" value="right">Vindárfr</input>');
					var fetchChecked = mcAtom.createButton($('<a href="javascript:return(null);">提取所选</a>')).click(function () {
						mcAtom.fetchChecked();
					});
					var selectAll = mcAtom.createButton($('<a href="javascript:return(null);">全选/取消全选</a>')).click(function () {
						mcAtom.checkAll();
					});
					var showAddr = mcAtom.createButton($('<a href="javascript:return(null);">提取结果</a>')).click(function () {
						mcAtom.showAddress();
					});
					var renewSelect = mcAtom.createButton($('<a href="javascript:return(null);">祝福所选</a>')).click(function () {
						mcAtom.renewChecked();
					});
					var manualbox = mcAtom.createButton($('<a href="javascript:return(null);">手动提取/祝福</a>')).click(function () {
						mcAtom.processByInput();
					});
					var checkLoc = mcAtom.createButton($('<a href="javascript:return(null);">提取链接</a>')).click(function () {
						mcAtom.showCheckedLoc();
					});


					mcAtom.appendButton(buttonLayer, selectAll);
					mcAtom.appendButton(buttonLayer, fetchChecked);
					mcAtom.appendButton(buttonLayer, renewSelect);
					mcAtom.appendButton(buttonLayer, checkLoc);
					mcAtom.appendButton(buttonLayer, showAddr);
					mcAtom.appendButton(buttonLayer, manualbox);
					buttonLayer.append(positionSwitcher);

					$('body').prepend(buttonLayer);

					$('.layerPos[value=' + mcAtom.layerPos + ']')[0].checked = true;
					mcAtom.changePos(mcAtom.layerPos);

					$('.layerPos').click(function () {
						this.value == 'left' ? mcAtom.changePos('left') : mcAtom.changePos('right');
						//GM_Log($('#btLayer').css('right'));
					});
				},
				getPopWindow: function (content) {
					var my_window = window.open("", "flashgot", "status=1,width=400,height=450,scrollbars=1");
					my_window.document.write(content);
					return my_window;
				},
				initPage: function () {
					mcAtom.loadingBar = $('<div><p id="popupMessage">正在加载中，请稍候</p><img id="loading" src="http://mcpub.googlecode.com/files/ajax-loader.gif"/></div>');
					unsafeWindow.mcAtom = mcAtom;
					mcAtom.loginTora();
					mcAtom.scanBlog();
					mcAtom.initButton();
					$('#close_btn').live('click', function () {
						mcAtom.closeBox();
					});
					$('#output_txt').live('click', function () {
						mcAtom.saveToDownList();
					});
					$('#info_txt').live('click', function () {
						mcAtom.saveInfoFile();
					});
					$('#linkpage').live('click', function () {
						mcAtom.showLinkPage();
					});
				}
			};
		}
		//mcAtom.$.blockUI({message:mcAtom.addrBox,css:{width:"520px"}});
		//GM_log($.fn.jquery);
		$(document).ready(function () {

			mcAtom.initPage();
		});
	}
})()
