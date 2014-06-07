// ==UserScript==
// @name           樂享市集 售书助手
// @namespace      com.u-lis.posthelper
// @version        V0.28
// @include        *u-lis.com/bbs/forum.php?mod=post&action=newthread&fid=*
// @description    自动生成售书贴
// @copyright      2012,u-lis.com
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var version = "0.2.8-alpha";
var date = "2012-8-31";
var bookInfoFromDx;
var bookInfoFromDxs = Array();
var bookCoverURL;
var bookCoverUrls = Array();
var dxurlForShow;
var dxurlForShows = Array();
var ss;
var sss = Array();
var fileSize;
var fileSizes = Array();
var _115urlForHide;
var _115urlForHides = Array();
var _115fileName;
var _115fileNames = Array();
var bookName;
var bookNames =  Array();
var bookListWithSS;
var bookListWithSSnoURL;
var seriesName;
var searchTxtElement;
var dxUrls;
var _115Urls;
var dxUrlsCount = 0;
var dxUrlsCountPtr = 0;
var _115UrlsCount = 0;
var _115UrlsCountPtr = 0;
var totalFileSize = 0;
  
function getBookInfo(str) {
	var patBookName = /(.[^【]*)【/;
	bookName = str.match(patBookName);
	if (bookName.length > 0) {
		str = str.replace(bookName[1], "");
		bookName = bookName[1].replace(/\(被引用指数[\s\S][^\)]*?\)/, "");
		bookName = bookName.trim();
		console.log(bookName);
	}
	bookName = bookName.replace(/相似图书/g, "");	 
	bookNames[dxUrlsCountPtr] = bookName;
	var patSeriesName = /【丛书名】([\s\S]*?)【/;
	var seriesNames = str.match(patSeriesName);
	if (seriesNames) {
		seriesName = seriesNames[1].trim() + "+";
		// console.log(seriesName);  
	}
	else {
		seriesName = "";
	}
	str = str.replace(/^[\s\t]*(\S*)/gm, "$1");
	str = str.replace(/(\S*)[\s\t]*$/gm, "$1");
	str = str.replace(/】[\r\n]*/gm, "】");
	str = str.replace(/\&gt;/gm, ">");
	str = str.replace(/[\r\n]+/g, "");
	str = str.replace(/【/g, "<br>【");
	str = str.replace(/包库全文阅读/, "");
	str = str.replace(/图书下载/, "");
	str = str.replace(/图书馆文献传递/, "");
	str = str.replace(/部分阅读/, "");
	
	bookInfoFromDx = str;
	bookInfoFromDxs[dxUrlsCountPtr] = bookInfoFromDx;
	console.log(bookInfoFromDx);
}

function getCoverAndSS(str) {
     var patCover = /(?:<div class)[\s\S]*(?:"left photo")[\s\S]*?(?:\/>)/g;
     var covers = str.match(patCover);
     if (covers) {
          bookCoverURL = (covers[0].match(/src="([\s\S][^"]*)"/))[1];
		  bookCoverUrls[dxUrlsCountPtr] = bookCoverURL;
          // console.log(bookCoverURL);
     }
     var patSS = /(?:<input name).*(?:"ssid").*(?:value).[^"]*"(\d+)"/g;
     var tmpSSs = str.match(patSS);
     if (tmpSSs) {
          ss = (tmpSSs[0].match(/"(\d+)"/))[1];
		  sss[dxUrlsCountPtr] = ss;
          // console.log(ss);
     }
}

// function getInfoFromDX() {
     // var ret = GM_xmlhttpRequest({
       // method: "GET",
       // url: dxurlForShow,
       // onload: function(res) {
          // getCoverAndSS(res.responseText);
          // checkIfBookExist(ss);
          // var pattern = /(?:<div class="infoHd">)[\s\S]*(?:<!--作者简介-->)/;
          // var dxInfo = (res.responseText).match(pattern);
            // if (dxInfo.length > 0) {
              // var txt = (dxInfo[0]).replace(/<[^>]*>/g, "");
              // getBookInfo(txt);
            // }
              // else {
                    // alert("请重新连接读秀体验版。");
              // }
              // if (_115urlForHide !== "") {
                  // getInfoFrom115();
              // }
       // }
     // });
// }

function getFileSizeAndName(str) {
	//console.log("into getFileSizeAndName");
    var patFileSize = /大小：([\w\.]+)/;
	var tmpFileSizes = str.match(patFileSize);
	if (tmpFileSizes) {
		fileSize = tmpFileSizes[1];
		fileSizes[_115UrlsCountPtr] = fileSize;
		var unitM = fileSize.match(/M|m/);
		var unitK = fileSize.match(/K|k/);
		var unitG = fileSize.match(/G|g/);
		if (unitM) {
			totalFileSize += parseFloat(fileSize);
		}
		else if (unitK) {
			totalFileSize += parseFloat(fileSize)/1024;
		}
		else if (unitG) {
			totalFileSize += parseFloat(fileSize)*1024;
		}
		//console.log("totalFileSize: " + totalFileSize);
	}
	var patFileName = /file_name: '([\s\S][^']*)'/;
	var tmpFileNames = str.match(patFileName);
	// console.log("fileNames: " + fileNames);
	if (tmpFileNames) {
		_115fileName = tmpFileNames[1];
		_115fileNames[_115UrlsCountPtr] = _115fileName;
	}
	//console.log("_115fileNames: " + _115fileNames[_115UrlsCountPtr] + "  fileSizes: " + fileSizes[_115UrlsCountPtr]);
}

function getFileSizeAndName360(str) {
	//console.log("into getFileSizeAndName360");
    var patFileSize = /class="meta">([\w\.]+),/;
	var tmpFileSizes = str.match(patFileSize);
    console.log("tmpFileSizes: " + tmpFileSizes);
	if (tmpFileSizes) {
		fileSize = tmpFileSizes[1];
		fileSizes[_115UrlsCountPtr] = fileSize;
		var unitM = fileSize.match(/M|m/);
		var unitK = fileSize.match(/K|k/);
		var unitG = fileSize.match(/G|g/);
		if (unitM) {
			totalFileSize += parseFloat(fileSize);
		}
		else if (unitK) {
			totalFileSize += parseFloat(fileSize)/1024;
		}
		else if (unitG) {
			totalFileSize += parseFloat(fileSize)*1024;
		}
		//console.log("totalFileSize: " + totalFileSize);
	}
	var patFileName = /name : '([\s\S][^']*)'/;
	var tmpFileNames = str.match(patFileName);
	console.log("tmpFileNames: " + tmpFileNames);
	if (tmpFileNames) {
		_115fileName = tmpFileNames[1];
		_115fileNames[_115UrlsCountPtr] = _115fileName;
	}
	//console.log("_115fileNames: " + _115fileNames[_115UrlsCountPtr] + "  fileSizes: " + fileSizes[_115UrlsCountPtr]);
}

function getFileSizeAndNameBaidu(str) {
	console.log("into getFileSizeAndNameBaidu");
    var patFileSize = /文件大小:([\w\.]+)\s/;
	var tmpFileSizes = str.match(patFileSize);
    console.log("tmpFileSizes: " + tmpFileSizes);
	if (tmpFileSizes) {
		fileSize = tmpFileSizes[1];
		fileSizes[_115UrlsCountPtr] = fileSize;
		var unitM = fileSize.match(/M|m/);
		var unitK = fileSize.match(/K|k/);
		var unitG = fileSize.match(/G|g/);
		if (unitM) {
			totalFileSize += parseFloat(fileSize);
		}
		else if (unitK) {
			totalFileSize += parseFloat(fileSize)/1024;
		}
		else if (unitG) {
			totalFileSize += parseFloat(fileSize)*1024;
		}
		//console.log("totalFileSize: " + totalFileSize);
	}
	var patFileName = /content="文件名:([\s\S]+)\s文件大小:/;
	var tmpFileNames = str.match(patFileName);
	console.log("tmpFileNames: " + tmpFileNames);
	if (tmpFileNames) {
		_115fileName = tmpFileNames[1];
		_115fileNames[_115UrlsCountPtr] = _115fileName;
	}
	//console.log("_115fileNames: " + _115fileNames[_115UrlsCountPtr] + "  fileSizes: " + fileSizes[_115UrlsCountPtr]);
}


// function getInfoFrom115() {
     // var ret = GM_xmlhttpRequest({
       // method: "GET",
       // url: _115urlForHide,
       // onload: function(res) {
          // var txt = (res.responseText).replace(/<[^>]*>/g, "");
          // getFileSizeAndName(txt);
          // autoSelectSourceType();
          // autoFillSubject();
          // autoFillContent();

       // }
     // });
// }

function autoOpenExp() {
     var a = myWindow.document.getElementsByTagName("a");
     // console.log(a.length);
     for (i = 0; i < a.length; i++) {
          // console.log("got it");
          if (a[i].getAttribute("href") === "javaScript:goExp();") {
               a[i].click();
          }
     }
}

function autoSelectSourceType() {
	var stElement = document.getElementById("typeid");
	var stChild = stElement.getElementsByTagName("option")[0];
	var aElement = document.getElementById("typeid_ctrl");
	var price = document.getElementById("price");
	var formElement = document.getElementById("postform");
	var fid = (formElement.getAttribute("action")).match(/fid=([\d]+)(?:\&extra)/);
	var srcType = _115fileNames[0].match(/PDG|pdg|Pdg/);
	var srcTypeId = 0; // 0 - PDG, 1 - 大图, 2 - pdf, 3 - DjVu
	aElement.firstChild.nodeValue = "清晰PDG";
	if (!srcType) {
		srcType = _115fileNames[0].match(/大图/);
		if (!srcType) {
			srcType = _115fileNames[0].match(/PDF|pdf|Pdf/);
			if (!srcType) {
				srcType = _115fileNames[0].match(/DJVU|DjVu|Djvu|djvu/);
				if (srcType) {
					srcType = 3;
					aElement.firstChild.nodeValue = "高清Djvu";
				}
			}
			else {
				srcTypeId = 2;
				aElement.firstChild.nodeValue = "图版PDF";
			}
		}
		else {
			srcTypeId = 1;
			aElement.firstChild.nodeValue = "清晰大图";
		}
	}
	if (fid) {
		//console.log(fid[1]);
		var selecti;
		var value;
		console.log(srcTypeId);
		if (srcTypeId === 0) {
			switch (fid[1]) {
			case "73":
				selecti = "1"; value = "3"; break;
			case "100":
				selecti = "2"; value = "7"; break;
			case "101":
				selecti = "2"; value = "11"; break;
			case "141":
				selecti = "2"; value = "31"; break;
			case "142":
				selecti = "2"; value = "15"; break;
			case "124":
				selecti = "2"; value = "19"; break;
			case "122":
				selecti = "2"; value = "23"; break;
			case "125":
				selecti = "2"; value = "27"; break;
			case "126":
				selecti = "2"; value = "35"; break;
			case "128":
				selecti = "2"; value = "39"; break;
			case "127":
				selecti = "2"; value = "43"; break;
			case "129":
				selecti = "2"; value = "47"; break;
			case "131":
				selecti = "2"; value = "51"; break;
			case "130":
				selecti = "2"; value = "55"; break;
			case "133":
				selecti = "2"; value = "59"; break;
			case "139":
				selecti = "1"; value = "106"; break;
			case "180":
				selecti = "2"; value = "63"; break;
			case "181":
				selecti = "1"; value = "111"; break;
			case "182":
				selecti = "1"; value = "192"; break;
			case "249":
				selecti = "1"; value = "862"; break;
			case "253":
				selecti = "3"; value = "899"; break;
			case "251":
				selecti = "1"; value = "876"; break;
			case "250":
				selecti = "1"; value = "870"; break;
			case "182":
				selecti = "1"; value = "192"; break;
			case "250":
				selecti = "1"; value = "870"; break;
			case "252":
				selecti = "1"; value = "882"; break;
			case "255":
				selecti = "1"; value = "920"; aElement.firstChild.nodeValue = "计算机类"; break;
			default:
				break;
			}
		}
		else if (srcTypeId === 1){
			switch (fid[1]) {
			case "73":
				selecti = "4"; value = "4"; break;
			case "100":
				selecti = "3"; value = "8"; break;
			case "101":
				selecti = "3"; value = "12"; break;
			case "141":
				selecti = "3"; value = "32"; break;
			case "142":
				selecti = "3"; value = "16"; break;
			case "124":
				selecti = "4"; value = "21"; break;
			case "122":    
				selecti = "3"; value = "24"; break;
			case "125":    
				selecti = "3"; value = "28"; break;
			case "126":    
				selecti = "3"; value = "36"; break;
			case "128":
				selecti = "3"; value = "40"; break;
			case "127":    
				selecti = "3"; value = "44"; break;
			case "129":    
				selecti = "3"; value = "48"; break;
			case "131":    
				selecti = "3"; value = "52"; break;
			case "130":    
				selecti = "3"; value = "56"; break;
			case "133":    
				selecti = "3"; value = "60"; break;
			case "139":
				selecti = "3"; value = "107"; break;
			case "180":
				selecti = "3"; value = "64"; break;
			case "181":
				selecti = "3"; value = "919"; break;
			case "182":
				selecti = "2"; value = "193"; break;
			case "250":
				selecti = "2"; value = "871"; break;
			default:
				break;
			}		
		}
		else if (srcTypeId === 2){
			switch (fid[1]) {
			case "73":
				selecti = "5"; value = "5"; break;
			case "100":
				selecti = "4"; value = "9"; break;
			case "101":
				selecti = "4"; value = "13"; break;
			case "141":
				selecti = "4"; value = "33"; break;
			case "142":
				selecti = "4"; value = "17"; break;
			case "124":
				selecti = "3"; value = "20"; break;
			case "122":    
				selecti = "4"; value = "25"; break;
			case "125":    
				selecti = "4"; value = "29"; break;
			case "126":    
				selecti = "4"; value = "37"; break;
			case "128":
				selecti = "4"; value = "41"; break;
			case "127":    
				selecti = "4"; value = "45"; break;
			case "129":    
				selecti = "4"; value = "49"; break;
			case "131":    
				selecti = "4"; value = "53"; break;
			case "130":    
				selecti = "4"; value = "57"; break;
			case "133":    
				selecti = "4"; value = "61"; break;
			case "139":
				selecti = "4"; value = "108"; break;
			case "180":
				selecti = "4"; value = "65"; break;
			case "181":
				selecti = "4"; value = "112"; break;
			case "182":
				selecti = "3"; value = "194"; break;
			case "250":
				selecti = "3"; value = "872"; break;
			default:
				break;
			}		
		}
		else if (srcTypeId === 3){
			switch (fid[1]) {
			case "73":
				selecti = "6"; value = "6"; break;
			case "100":
				selecti = "5"; value = "10"; break;
			case "101":
				selecti = "5"; value = "14"; break;
			case "141":
				selecti = "5"; value = "34"; break;
			case "142":
				selecti = "5"; value = "18"; break;
			case "124":
				selecti = "5"; value = "22"; break;
			case "122":    
				selecti = "5"; value = "26"; break;
			case "125":    
				selecti = "5"; value = "30"; break;
			case "126":    
				selecti = "5"; value = "38"; break;
			case "128":
				selecti = "5"; value = "42"; break;
			case "127":    
				selecti = "5"; value = "46"; break;
			case "129":    
				selecti = "5"; value = "50"; break;
			case "131":    
				selecti = "5"; value = "54"; break;
			case "130":
				selecti = "5"; value = "58"; break;
			case "133":    
				selecti = "5"; value = "62"; break;
			case "139":
				selecti = "5"; value = "109"; break;
			case "180":
				selecti = "5"; value = "66"; break;
			case "181":
				selecti = "5"; value = "113"; break;
			case "182":
				selecti = "4"; value = "195"; break;
			case "250":
				selecti = "4"; value = "873"; break;
			default:
				break;
			}		
		}
		//console.log(price.nodeType);
		
		stElement.setAttribute("selecti", selecti);
		console.log(selecti);
		stChild.setAttribute("value", value);
		console.log(value);
	}
	price.setAttribute("value", "5");
}

function autoFillSubject() {
	if (sss) {
		var subjectElement = document.getElementById("subject");
		var subject;
		if (dxUrlsCount === 1) {	 
			subject = seriesName + bookName + "_" + ss + "+" + fileSize;
			var seriesNameShort = seriesName.match(/([\S][^\s]*)\s/);
			var bookNameShort = bookName.match(/([\S][^\s]*)\s/);
			// console.log("bookNameShort:");
			// console.log(bookNameShort);
			if (seriesNameShort) {
			  subject = seriesNameShort[1] + "+" + bookName + "_" + ss + "+" + fileSize;
			}
			if (bookNameShort) {
			  subject = seriesName + bookNameShort[1] + "_" + ss + "+" + fileSize;
			}
		}
		else if (dxUrlsCount > 1) {
			var unit = "MB";
			if (totalFileSize > 1024.0) {
				totalFileSize = totalFileSize / 1024.;
				unit = "GB";
			}
			totalFileSize = totalFileSize.toFixed("2");
			if (seriesName === "") {
				seriesName = bookNames[0];
			}
			subject = seriesName + "共" + dxUrlsCount + "册+" + sss[0] + "+" + totalFileSize + unit;
			var seriesNameShort = seriesName.match(/([\S][^\s]*)\s/);
			if (seriesNameShort) {
				subject = seriesNameShort[1] + "+共" + dxUrlsCount + "册+" + sss[0] + "+" + totalFileSize + unit;
			}
		}
		subjectElement.setAttribute("value", subject);
	}
}

function autoFillContent() {
	//console.log("autoFillContent");
	var contentFrame = document.getElementById("e_iframe");
	var contentBody = contentFrame.contentDocument.getElementsByTagName("body");
	// console.log(contentBody.length);
	// console.log("body = ", contentBody);
	var booksContents = "";
	//console.log("in autoFillContent, dxUrlsCount = " + dxUrlsCount);
	var radioShowAll = document.getElementById("radioShowAll");
	var booksList="";
	if (radioShowAll.checked) {
		for (var i = 0; i < dxUrlsCount; ++i) {
			var bcTmp = bookNames[i] + '<br>' +
							'<img src="' + bookCoverUrls[i] + '" border="0"><br>' +
							bookInfoFromDxs[i] + '<br><br>' +
							'<a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a>.<br><br>';
			bcTmp = bcTmp.replace(/[\r\n]+/g, "");
			//console.log(bcTmp);
			booksContents += bcTmp;
		}
		if (dxUrlsCount > 1) {
			booksContents = booksContents + "【详细书目】<br>" + bookListWithSSnoURL + "<br>";
		}
	}
	else {
		for (var i = 0; i < 1; ++i) {
			var bcTmp = bookNames[i] + '<br>' +
							'<img src="' + bookCoverUrls[i] + '" border="0"><br>' +
							bookInfoFromDxs[i] + '<br><br>' +
							'<a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a>.<br><br>';
			bcTmp = bcTmp.replace(/[\r\n]+/g, "");
			//console.log(bcTmp);
			booksContents += bcTmp;
		}		
		if (dxUrlsCount > 1) {
			booksContents = booksContents + "【详细书目】<br>" + bookListWithSS + "<br>";
		}
	}
	//console.log("in autoFillContent, booksContents = " + booksContents);
	var _115UrlsAndBookNames = "";
	for (var i = 0; i < _115UrlsCount; ++i) {
		_115UrlsAndBookNames += '<a href="' + _115urlForHides[i] +'">' + _115urlForHides[i] + '</a><br>' +
								_115fileNames[i] + '<br><br>';
	}
	//console.log("in autoFillContent, _115UrlsAndBookNames = " + _115UrlsAndBookNames);
	
	contentBody[0].innerHTML =  '<p>[free]<br>' + 
								booksContents +
								'[color=Red]【书籍格式】正文清晰PDG，封面、版权大图 [/color]<br>' +
								'[color=Red]【书签情况】详细书签 [/color]<br>' +
								'[color=Red]【说　　明】本主题贴内容由<a href="http://u-lis.com/bbs/forum.php?mod=viewthread&tid=523">樂享市集售书助手</a>' + version + '辅助生成。[/color]<br><br>' +
								'[/free]<br><br>' +
								_115UrlsAndBookNames +
								'解压密码：u-lis.com <br>' +
								'</P>';
}

function setSearchBarInfo() {
	var formElement = document.getElementById("scbar_form");
	formElement.setAttribute("target", "search_result_frame");

	var inputElement = document.getElementById("scbar_mod");
	inputElement.setAttribute("value", "forum");

	var aElement = document.getElementById("scbar_type");
	aElement.firstChild.nodeValue = "帖子";
	aElement.setAttribute("initialized", "true");

	searchTxtElement = document.getElementById("scbar_txt");
	searchBtnElement = document.getElementById("scbar_btn");   
}

function checkIfBookExist(theSS) {
    //console.log("checkIfBookExist");
    searchTxtElement.value = theSS;
    searchBtnElement.click();
}

function getDxUrls() {
	var dxurlInput = document.getElementById("dxurl");
	dxUrls = (dxurlInput.value+"\n").match(/([\s\S][^\r\n]*)[\r\n]+/gm);	
	dxUrlsCount = dxUrls.length;
	dxUrlsCountPtr = 0;	
}

function get115Urls() {
	var _115urlInput = document.getElementById("_115url");
	_115Urls = (_115urlInput.value+"\n").match(/(http[\s\S][^\r\n]*)[\r\n]+/gm);
	console.log(_115Urls);
	_115UrlsCount = _115Urls.length;
	_115UrlsCountPtr = 0;
}

function getOneBookInfoFromDX(oneDxUrl) {
	var ret = GM_xmlhttpRequest({
		method: "GET",
		url: oneDxUrl,
		onload: function(res) {
			if (dxUrlsCountPtr >= dxUrlsCount) {
				if (_115Urls) {
					getOneBookInfoFrom115(_115Urls[_115UrlsCountPtr])
					for (var i = 0; i < _115UrlsCount; ++i) {		
						var _115urlShorts = (_115Urls[i]).match(/(http[\s\S][^\#]*[\#\r\n])/);
						if (_115urlShorts) {
							_115urlForHides[i] = _115urlShorts[1];
						}
					}
				}
				return;
			}
            console.log("into getOneBookInfoFromDX");
			getCoverAndSS(res.responseText);
			var pattern = /(?:<div class="infoHd">)[\s\S]*(?:<!--作者简介-->)/;
			var dxInfo = (res.responseText).match(pattern);
			if (dxInfo) {
				var txt = (dxInfo[0]).replace(/<[^>]*>/g, "");
				getBookInfo(txt);
				++dxUrlsCountPtr;
				getOneBookInfoFromDX(dxUrls[dxUrlsCountPtr]);
			}
			else {
				dxUrlsCountPtr = 0;
				alert("请重新连接读秀体验版。");
				var psElement = document.getElementById("waitDiv");
				psElement.innerHTML = '<em>失败</em>';
			}
			// if (_115urlForHide !== "") {
			  // getInfoFrom115();
			// }
		}
	});
}

function getOneBookInfoFrom115(one115Url) {
	var ret = GM_xmlhttpRequest({
		method: "GET",
		url: one115Url,
		onload: function(res) {
			//console.log("_115UrlsCountPtr: " + _115UrlsCountPtr + " _115UrlsCount: " + _115UrlsCount);
			if (_115UrlsCountPtr >= _115UrlsCount) {
				//console.log("115 over");
				autoSelectSourceType();
				genCheckRepeats();
				autoFillSubject();
				autoFillContent();
				var psElement = document.getElementById("waitDiv");
				psElement.innerHTML = '<em>完成</em>';
				return;
			}
            var oriTxt = res.responseText
			var pattern = /(360云盘)/;
			var _360Yun = oriTxt.match(pattern);
			if (_360Yun) {
                getFileSizeAndName360(oriTxt);
            }
            else {
                pattern = /(百度网盘)/;
                var baidu = oriTxt.match(pattern);
                console.log("baidu: " + baidu);
                if (baidu) {
                    getFileSizeAndNameBaidu(oriTxt);
                }
                else {
                    var txt = oriTxt.replace(/<[^>]*>/g, "");
                    getFileSizeAndName(txt);
                }
            }
			++_115UrlsCountPtr;
			getOneBookInfoFrom115(_115Urls[_115UrlsCountPtr]);
		}
	});
}

function genCheckRepeats() {
	var chkRepeatDiv = document.getElementById("chkRepeatDiv");
	chkRepeatDiv.innerHTML = "";
	bookListWithSS = "";
	bookListWithSSnoURL = "";
	for (var i=0; i<dxUrlsCount; ++i) {
		var chkDiv = document.createElement("div");
		var scbar_txt = '"scbar_txt"';
		var scbar_btn = '"scbar_btn"';
		// searchBtnElement.click();
		chkDiv.innerHTML = "<span>[" + i + "] " + bookNames[i] + " " + sss[i] + "  <a href='javascript:searchTxtElement=document.getElementById("+scbar_txt+");searchTxtElement.value="+sss[i]+";searchBtnElement=document.getElementById("+scbar_btn+");searchBtnElement.click();'>查看本书重复情况</a></span><br>";
		bookListWithSS += bookNames[i] + "_" + sss[i] + '  <a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a>.<br>';
		bookListWithSSnoURL += bookNames[i] + "_" + sss[i] + '<br>';
		chkRepeatDiv.appendChild(chkDiv);
	}
	if (dxUrlsCount > 0) {
		checkIfBookExist(sss[0]);
	}
}

function autoGenerate() {
	//var psElement = document.getElementById("process_stat");
	//psElement.innerHTML = "  数据处理中，请稍候……  ";
	var psElement = document.getElementById("waitDiv");
	psElement.innerHTML = '<em><img src="template/yeei_dream1/css/yeei//loading.gif"> 请稍候...</em>';
	getDxUrls();
	get115Urls();
	if (dxUrls) {
		for (var i = 0; i < dxUrlsCount; ++i) {
			var dxurlShorts = (dxUrls[i]).match(/(http[\s\S]*)(?:\&fenlei)/);
			if (dxurlShorts) {
				dxurlForShows[i] = dxurlShorts[1];
			}
			else {
				dxurlForShows[i] = dxUrls[i];
			}
		}
		getOneBookInfoFromDX(dxUrls[dxUrlsCountPtr]);
	}
	//psElement.innerHTML = "  状态：待命  ";

	// if (_115Urls) {
		// getOneBookInfoFrom115(_115Urls[_115UrlsCountPtr])
		// for (var i = 0; i < _115UrlsCount; ++i) {		
			// var _115urlShorts = (_115Urls[i]).match(/(http[\s\S][^\#]*\#)/);
			// if (_115urlShorts) {
				// _115urlForHides[i] = _115urlShorts[1];
			// }
		// }
	// }
	// autoSelectSourceType();
	// autoFillSubject();
	// autoFillContent();
	// return;

	// var dxurlInput = document.getElementById("dxurl");
	// dxurlForShow = dxurlInput.value;
	// var dxurlShorts = dxurlForShow.match(/(http[\s\S]*)(?:\&fenlei)/);
	// if (dxurlShorts) {
	  // dxurlForShow = dxurlShorts[1];
	// }
	// var _115urlInput = document.getElementById("_115url");
	// _115urlForHide = _115urlInput.value;
	// var _115urlShorts = _115urlForHide.match(/(http[\s\S][^\#]*\#)/);
	// if (_115urlShorts) {
		// _115urlForHide = _115urlShorts[1];
	// }
	// // console.log(dxurlForShow);
	// // console.log(_115urlForHide);
	// //window.open(dxurl, 'myWindow', 'width=600, height=400');
	// //autoOpenExp();
	// if (dxurlForShow !== "") {
	  // getInfoFromDX();
	// }
}

app = {
	run: function() {
		var postForm = document.getElementById("postform");
		var parent = postForm.parentNode;
		var dxDiv = document.createElement("div");
		dxDiv.innerHTML = '<span>请输入 dx 地址（每个地址一行）： </span><br><span><textarea name="dxurl" id="dxurl" cols ="80" rows = "3"></textarea></span><br>';
		var _115Div = document.createElement("div");
		_115Div.innerHTML = '<span>请输入115/360/百度网盘地址（每个地址一行）：</span><br><span><textarea name="_115url" id="_115url" cols ="80" rows = "3"></textarea></span><br>';
		var btnDiv = document.createElement("div");
		btnDiv.innerHTML = '<button type="button" id="btnAutoGen" value="true" onclick=""><em>自动生成信息</em></button>';
		var waitDiv = document.createElement("div");
		waitDiv.setAttribute("id", "waitDiv");
		waitDiv.innerHTML = '';
		var radioDiv = document.createElement("div");
		radioDiv.innerHTML = '<input id="radioShowAll" type="radio" name="showAllBooks" checked="checked" value="all" > 显示所有书籍的信息 </input> <input id="radioShowOne" type="radio" name="showAllBooks" value="one" > 显示第一本书籍的信息及详细书目 </input> ';
		var checkDiv = document.createElement("div");
		checkDiv.setAttribute("id", "chkRepeatDiv");
		checkDiv.setAttribute("style", "width:450px;height:88px;border:1px;overflow-y:scroll;word-break:break-all ");
		var frameDiv = document.createElement("div");
		//frameDiv.innerHTML = '<iframe id="sr_iframe" style="height: 200px; width: 600px" frameborder="1"> </iframe>';
		var iframeNode = document.createElement("iframe");
		iframeNode.id = "sr_iframe";
		iframeNode.name = "search_result_frame";
		iframeNode.frameBorder = "1";
		iframeNode.style.width = "600px";
		iframeNode.style.height = "300px";
		iframeNode.src = 'http://u-lis.com/bbs/search.php?mod=forum';
		frameDiv.appendChild(iframeNode);
		// iframeNode.innerHTML = '<html> <frameset cols="100%"> <frame src="http://u-lis.com/bbs/search.php?mod=forum" name="search_result_frame"> </frame> </frameset> </html>';
		parent.insertBefore(dxDiv, postForm);
		// parent.insertBefore(nullDiv, postForm);
		parent.insertBefore(_115Div, postForm);
		parent.insertBefore(radioDiv, postForm);
		parent.insertBefore(btnDiv, postForm);
		parent.insertBefore(waitDiv, postForm);
		parent.insertBefore(checkDiv, postForm);
		parent.insertBefore(frameDiv, postForm);

		document.getElementById("extra_price_b").click();

		setSearchBarInfo();
			 
		var btnAutoGen = document.getElementById("btnAutoGen");
		btnAutoGen.addEventListener("click", autoGenerate, false);
		//console.log("generate ok");
    }
};

try {
    app.run();
} catch (e) {
//    alert(e.message);
}