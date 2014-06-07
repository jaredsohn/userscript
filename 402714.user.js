// ==UserScript==
// @name           E书园售书助手
// @namespace      net.eshuyuan.posthelper
// @version        0.6.13
// @include        *eshuyuan.*/forum.php?mod=post&action=newthread&fid=*
// @description    自动生成E书园售书贴
// @copyright      2013, rotk@eshuyuan.net
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var version = "0.6.13";
var date = "2013-11-23";
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
var authorName;
var bookListWithSS;
var bookListWithSSnoURL;
var seriesName;
var searchTxtElement;
var dxUrls;
var _115Urls;
var _115gift;
var _115GiftUrl;
var _115Formula;
var _baiduPrivateLinks;
var _baiduPasswords;
var dxUrlsCount = 0;
var dxUrlsCountPtr = 0;
var _115FormulaCount = 0;
var _115GiftCount = 0;
var _115GiftCountPtr = 0;
var _baiduPrivateLinksCount = 0;
var _baiduPrivateLinksCountPtr = 0;
var totalFileSize = 0;
var netDiskName = '115网盘';
var isFolderShare = 0;
var is115Formula = false;
var has115Formula = false;
  
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
	
    console.log("str:" + str);
    var tmpAuthorName = str.match(/【作  者】([\s\S]*?)<br>/);
    console.log("tmpAuthorName: "+tmpAuthorName);
    authorName = "";
    if (tmpAuthorName) {
        var pattern = /，/i;
        if (pattern.test(tmpAuthorName[1])) {
            tmpAuthorName = tmpAuthorName[1].match(/(.[^，]*)，/);
            if (tmpAuthorName) {
                authorName = tmpAuthorName[1]+"等";
            }
        }
        else {
            authorName = tmpAuthorName[1];
        }
    }
    console.log("author: " + authorName);

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
function getFileSize115Gift(str) {
	netDiskName = '115网盘';
	// <em>大小：1.91GB</em>
	// <em>大小：26.31MB</em>
    tmpFileSizes = str.match(/<em>大小：(.[^<]*)</);
	if (tmpFileSizes) {
		fileSize = tmpFileSizes[1];
		var tmpOneFileSize = parseFloat(tmpFileSizes[1]);
		if (tmpFileSizes[1].match(/GB/) != null) {
			tmpOneFileSize = tmpOneFileSize * 1024;
		}
		else if (tmpFileSizes[1].match(/KB/) != null) {
			tmpOneFileSize = tmpOneFileSize / 1024;
		}
		fileSizes[_115GiftCountPtr] = fileSize;
		totalFileSize += parseFloat(tmpOneFileSize);
		console.log("totalFileSize: " + totalFileSize);
	}
}

function getFileSizeAndNameBaidu(str) {
	console.log("into getFileSizeAndNameBaidu");
    console.log(str);
	netDiskName = '百度云网盘';
    var patFileSize;
	var tmpFileSizes = str.match(patFileSize);
    if (isFolderShare == 0) {
        tmpFileSizes = str.match(/文件大小:([\w\.]+)\s/);
    }   
    else {
        tmpFileSizes = str.match(/"size":(\d+),/g);
    }
	if (tmpFileSizes) {
        if (isFolderShare == 0) {
            fileSize = tmpFileSizes[1];
            fileSizes[_baiduPrivateLinksCountPtr] = fileSize;
        }
        else {
            fileSize = 0;
            for (var i = 0; i < tmpFileSizes.length; i++) {
                var oneFileSize = tmpFileSizes[i].match(/(\d+)/);
                fileSize = fileSize + parseInt(oneFileSize[1]);
            }
            if (fileSize < 1048576) {
                fileSize = fileSize / 1024.0;
                fileSize = fileSize.toFixed(2);
                fileSize = fileSize.toString() + "K";
            }
            else if (fileSize >= 1048576 && fileSize < 1073741824) {
                fileSize = fileSize / 1048576.0;
                fileSize = fileSize.toFixed(2);
                fileSize = fileSize.toString() + "M";
            }
            else {
                fileSize = fileSize / 1073741824.0;
                fileSize = fileSize.toFixed(2);
                fileSize = fileSize.toString() + "G";
            }
            fileSizes[_baiduPrivateLinksCountPtr] = fileSize;
        }
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
		console.log("totalFileSize: " + totalFileSize);
	}
	var patFileName = /content="文件名:([\s\S]+)\s文件大小:/;
	var tmpFileNames = str.match(patFileName);
	console.log("tmpFileNames: " + tmpFileNames);
	if (tmpFileNames) {
		_115fileName = tmpFileNames[1];
		_115fileNames[_baiduPrivateLinksCountPtr] = _115fileName;
	}
	//console.log("_115fileNames: " + _115fileNames[_115UrlsCountPtr] + "  fileSizes: " + fileSizes[_115UrlsCountPtr]);
}

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
    //var readperm = document.getElementById("readperm");
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
				aElement.firstChild.nodeValue = "清晰PDF";
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
	price.setAttribute("value", "6");
    //readperm.options.selectedIndex = 4;
}

function autoSelectSourceTypeForHelp() {
	var stElement = document.getElementById("typeid");
	var stChild = stElement.getElementsByTagName("option")[0];
	var aElement = document.getElementById("typeid_ctrl");
	var formElement = document.getElementById("postform");
	var fid = (formElement.getAttribute("action")).match(/fid=([\d]+)(?:\&extra)/);
	aElement.firstChild.nodeValue = "中文清晰图书";
	if (fid) {
		//console.log(fid[1]);
		var selecti;
		var value;
        switch (fid[1]) {
        case "146":
            selecti = "1"; value = "133"; break;
        default:
            break;
        }
		//console.log(price.nodeType);
		
		stElement.setAttribute("selecti", selecti);
		console.log(selecti);
		stChild.setAttribute("value", value);
		console.log(value);
	}
}

function strLenCalc(str, maxlen) 
{
    var curlen = maxlen, len = str.length;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255) {
            curlen -= 2;
        }
    }
    return curlen - len;
}

function autoFillSubject() {
	if (sss) {
		var subjectElement = document.getElementById("subject");
		var subject;
		var checkUseSeriesName = document.getElementById("checkUseSeriesName");
		if (dxUrlsCount === 1) {
			if (checkUseSeriesName.checked) {
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
			else {
                var fullBookName = bookName.replace(/[\s]+/, "：");
                fullBookName = fullBookName.replace(/[\s]+/g, "_");
                var pattern = /（/i;
                if (pattern.test(authorName)) {
                    subject = fullBookName + authorName + "_" + ss + "+" + fileSize;
                }
                else {
                    subject = fullBookName + "_" + authorName + "_" + ss + "+" + fileSize;
                }
                var len = strLenCalc(subject, 80);
                console.log("len:" + len);
                
                if (len < 0) {
                    fullBookName = bookName.replace(/[\s]+/, "：");
                    fullBookName = fullBookName.replace(/[\s]+/g, "_");                    
                    subject = fullBookName + "_" + ss + "+" + fileSize;
                    len = strLenCalc(subject, 80);
                    console.log("len2:" + len);
                    
                    if (len < 0) {
                        subject = bookName + "_" + ss + "+" + fileSize;
                        var bookNameShort = bookName.match(/([\S][^\s]*)\s/);
                        if (bookNameShort) {
                          subject = bookNameShort[1] + "_" + ss + "+" + fileSize;
                        }
                        else {
                            bookNameShort = bookName.match(/([\S][^：]*)：/);
                            if (bookNameShort) {
                              subject = bookNameShort[1] + "_" + ss + "+" + fileSize;
                            }
                        }
                    }
                }
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
			var bcTmp = '[b]' + bookNames[i] + '[/b]<br><br>' +
							'<img src="' + bookCoverUrls[i] + '" border="0"><br>' +
							bookInfoFromDxs[i] + '<br><br>' +
							'<a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a><br><br>';
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
			var bcTmp = '[b]' + bookNames[i] + '[/b]<br><br>' +
							'<img src="' + bookCoverUrls[i] + '" border="0"><br>' +
							bookInfoFromDxs[i] + '<br><br>' +
							'<a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a><br><br>';
			bcTmp = bcTmp.replace(/[\r\n]+/g, "");
			//console.log(bcTmp);
			booksContents += bcTmp;
		}		
		if (dxUrlsCount > 1) {
            var bookListTemp = bookListWithSS.replace(/[\r\n]+/g, "");
			booksContents = booksContents + "【详细书目】<br>" + bookListTemp + "<br>";
		}
	}
	//console.log("in autoFillContent, booksContents = " + booksContents);
	var _115UrlsAndBookNames = _115gift + "<br>";
    if (_baiduPrivateLinksCount > 0) {
        for (var i = 0; i < _baiduPrivateLinksCount; ++i) {
            //_115UrlsAndBookNames += '链接：<a href="' + _baiduPrivateLinks[i] + '">' + _baiduPrivateLinks[i] + '</a> 密码：' + 
            //                        _baiduPasswords[i] + '<br>' + _115fileNames[i].replace(/\//, "") + '<br><br>';
            _115UrlsAndBookNames += '链接：' + _baiduPrivateLinks[i] + ' 密码：' + 
                                    _baiduPasswords[i] + '<br>' + _115fileNames[i].replace(/\//, "") + '<br><br>';
        }
    }
    if (has115Formula) {
        _115UrlsAndBookNames += '[color=Red][b]标准提取式:[/b][/color][<a href="thread-153910-1-1.html">[color=blue][b]使用教程(附工具)[/b][/color]</a>]';
        _115UrlsAndBookNames += '[code]';
        for (var i = 0; i < _115Formula.length-1; ++i) {
            _115UrlsAndBookNames += _115Formula[i] + '<br>';
        }
        _115UrlsAndBookNames += _115Formula[_115Formula.length-1] + '[/code]';
        _115UrlsAndBookNames += '<br>';
    }
	//console.log("in autoFillContent, _115UrlsAndBookNames = " + _115UrlsAndBookNames);
	
	contentBody[0].innerHTML =  '<p>[free]<br>' + 
								booksContents +
                                '[color=Red]【存放位置】' + netDiskName + '[/color]<br>' +
								'[color=Red]【说　　明】<a href="thread-111512-1-1.html">E书园售书助手</a>参与编辑本贴[/color]<br><br>' +
								'[/free]<br><br>' +
								_115UrlsAndBookNames +
								'解压密码：www.eshuyuan.com <br>' +
								'</P>';
}

function autoFillSubjectForHelp() {
	if (sss) {
		var subjectElement = document.getElementById("subject");
		var subject;
		if (dxUrlsCount === 1) {	 
            var fullBookName = bookName.replace(/[\s]+/, "：");
            fullBookName = fullBookName.replace(/[\s]+/g, "_");
            subject = fullBookName + "+有试读+清晰pdg+20刀";
		}
		subjectElement.setAttribute("value", subject);
	}
}

function autoFillContentForHelp() {
	//console.log("autoFillContent");
	var contentFrame = document.getElementById("e_iframe");
	var contentBody = contentFrame.contentDocument.getElementsByTagName("body");
	// console.log(contentBody.length);
	// console.log("body = ", contentBody);
	var booksContents = "";
		for (var i = 0; i < 1; ++i) {
			var bcTmp = '[b]' + bookNames[i] + '[/b]<br><br>' +
							'<img src="' + bookCoverUrls[i] + '" border="0"><br>' +
							bookInfoFromDxs[i] + '<br><br>' +
							'<a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a><br><br>';
			bcTmp = bcTmp.replace(/[\r\n]+/g, "");
			//console.log(bcTmp);
			booksContents += bcTmp;
		}		
	
	contentBody[0].innerHTML =  '<p><br>' + booksContents + '<br></p>';
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
	var dxUrlInput = document.getElementById("dxurl");
    var dxUrlText = dxUrlInput.value;
    // var checkGetInfoFromSzdnet = document.getElementById("checkGetInfoFromSzdnet");
    // if (checkGetInfoFromSzdnet.checked) {
        // dxUrlText = dxUrlText.replace(/book\d{0,1}\.duxiu\.com/gm, "book.szdnet.org.cn");
    // }
    // console.log(dxUrlText);
	dxUrls = (dxUrlText+"\n").match(/([\s\S][^\r\n]*)[\r\n]+/gm);
	dxUrlsCount = dxUrls.length;
	dxUrlsCountPtr = 0;	
}

function getUrlsAndFormula() {
	var _115giftInput = document.getElementById("_115gift");
    _115gift = _115giftInput.value;
    _115gift = _115gift.replace(/[\r\n]+/gm, "<br>");
    _115GiftUrl = (_115giftInput.value).match(/(http:.[^#]*#]*)/gm);
	if (_115GiftUrl != null) {
		_115fileNames[0] = "PDG";
		_115GiftCount = _115GiftUrl.length;
		_115GiftCountPtr = 0;
	}
    var _115FormulaInput = document.getElementById("_115Formula");
    _115Formula = (_115FormulaInput.value+"\n").match(/(.[^#]*#.[^#]*#.[^\r\n]*)[\r\n]/gm);
    if (_115Formula != null) {
        _115fileNames[0] = "PDG";
        has115Formula = true;
        _115FormulaCount = _115Formula.length;
    }
    var pattern = /http:\/\//i;
    var _baiduPrivateLinkInput = document.getElementById("_baiduPrivateLink");
    var _baiduPrivateLinkInputValue = (_baiduPrivateLinkInput.value).replace(/: |：/gm, ":")
    console.log("_baiduPrivateLinkInputValue:" + _baiduPrivateLinkInputValue);
    if (pattern.test(_baiduPrivateLinkInputValue)) { // baidu private links
        _baiduPrivateLinks = (_baiduPrivateLinkInputValue + "\n").match(/链接:(.[^\s]*)\s(密码|提取密码)/gm);
        _baiduPasswords = (_baiduPrivateLinkInputValue + "\n").match(/密码:([\d\w][^\r\n]*)/gm);
        _baiduPrivateLinksCount = _baiduPrivateLinks.length;
        _baiduPrivateLinksCountPtr = 0;
        console.log("baidu links count: " + _baiduPrivateLinksCount);
        for (var i = 0; i < _baiduPrivateLinksCount; i++) {
            _baiduPrivateLinks[i] = _baiduPrivateLinks[i].replace(/链接:/, "");
            _baiduPrivateLinks[i] = _baiduPrivateLinks[i].replace(/\s密码/, "");
            _baiduPasswords[i] = _baiduPasswords[i].replace(/密码:/, "");
        }
    }
    else {
        _baiduPrivateLinks = [];
        _baiduPasswords = [];
    }
    
	console.log("115 gift: " + _115gift);
	console.log("115 gift url: " + _115GiftUrl);
    console.log("115 formula: " + _115Formula);
    console.log("baidu links: " + _baiduPrivateLinks);
    console.log("baidu passwds: " + _baiduPasswords);
}


function Sleep(nMillis)  
{  
    var dt1 = new Date();  
    for (;;)  {
        var dt2 = new Date();  
        if ((dt2.getTime()-dt1.getTime()) >= nMillis)  
            break;  
    }  
}  
  
function getOneBookInfoFromDX(oneDxUrl) {
	var ret = GM_xmlhttpRequest({
		method: "GET",
		url: oneDxUrl,
		onload: function(res) {
			if (dxUrlsCountPtr >= dxUrlsCount) {
                if (_115FormulaCount > 0) { // 115网盘标准式
                    getBooksInfoFrom115Formula();
                }
				else if (_115GiftCount > 0) { // 115网盘礼包链
					getBooksInfoFrom115Gift(_115GiftUrl[_115GiftCountPtr]);
				}
                else if (_baiduPrivateLinksCount > 0) { // 百度云网盘
                    getOneBookInfoFromBaidu(_baiduPrivateLinks[_baiduPrivateLinksCountPtr]);
                }
                else {
                    alert("请输入115标准式或115礼包链或百度私密分享链接。");
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
                if (dxUrlsCountPtr % 30 == 0) {
                    Sleep(60000);
                }
				getOneBookInfoFromDX(dxUrls[dxUrlsCountPtr]);
			}
			else {
				dxUrlsCountPtr = 0;
				alert("请重新连接读秀体验版。");
				var psElement = document.getElementById("waitDiv");
				psElement.innerHTML = '<em>失败</em>';
			}
		}
	});
}

function getOneBookInfoFromDXForHelp(oneDxUrl) {
	var ret = GM_xmlhttpRequest({
		method: "GET",
		url: oneDxUrl,
		onload: function(res) {
			if (dxUrlsCountPtr >= dxUrlsCount) {
                autoSelectSourceTypeForHelp();
                autoFillSubjectForHelp();
                autoFillContentForHelp();
                var psElement = document.getElementById("waitDiv");
                psElement.innerHTML = '<em>完成</em>';
				return;
			}
            console.log("into getOneBookInfoFromDXForHelp");
			getCoverAndSS(res.responseText);
			var pattern = /(?:<div class="infoHd">)[\s\S]*(?:<!--作者简介-->)/;
			var dxInfo = (res.responseText).match(pattern);
			if (dxInfo) {
				var txt = (dxInfo[0]).replace(/<[^>]*>/g, "");
				getBookInfo(txt);
				++dxUrlsCountPtr;
				getOneBookInfoFromDXForHelp(dxUrls[dxUrlsCountPtr]);
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

function getBooksInfoFrom115Formula()
{
	netDiskName = '115网盘';
    fileSize = 0;
    for (var i = 0; i < _115FormulaCount; i++) {
        var oneFileSize = (_115Formula[i]).match(/.[^#]+#(.[^#]*)#/);
        //console.log("oneFileSize: " + oneFileSize);
        fileSize = fileSize + parseInt(oneFileSize[1]);
    }
    if (fileSize < 1048576) {
        fileSize = fileSize / 1024.0;
        fileSize = fileSize.toFixed(2);
        fileSize = fileSize.toString() + "K";
    }
    else if (fileSize >= 1048576 && fileSize < 1073741824) {
        fileSize = fileSize / 1048576.0;
        fileSize = fileSize.toFixed(2);
        fileSize = fileSize.toString() + "M";
    }
    else {
        fileSize = fileSize / 1073741824.0;
        fileSize = fileSize.toFixed(2);
        fileSize = fileSize.toString() + "G";
    }

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
    console.log("totalFileSize: " + totalFileSize);

    autoSelectSourceType();
    genCheckRepeats();
    autoFillSubject();
    autoFillContent();
    var psElement = document.getElementById("waitDiv");
    psElement.innerHTML = '<em>完成</em>';                
}

function getBooksInfoFrom115Gift(one115GiftUrl) {
	var ret = GM_xmlhttpRequest({
		method: "GET",
		url: one115GiftUrl,
		onload: function(res) {
			if (_115GiftCountPtr >= _115GiftCount) {
				autoSelectSourceType();
				genCheckRepeats();
				autoFillSubject();
				autoFillContent();
				var psElement = document.getElementById("waitDiv");
				psElement.innerHTML = '<em>完成</em>';
				return;
			}
            var oriTxt = res.responseText;
			getFileSize115Gift(oriTxt);
			++_115GiftCountPtr;
			getBooksInfoFrom115Gift(_115GiftUrl[_115GiftCountPtr]);			
		}
	});
}

function postForOneBookInfoFromBaidu(oneBaiduUrl, refurl, param) {
    var ret = GM_xmlhttpRequest({
        method: "POST",
        url: oneBaiduUrl,
        data: param,
        headers: {
            "Accept":"text/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer":refurl
        },
        onload: function(res) {
            console.log("baidu post response: " + res);
            getOneBookInfoFromBaidu(_baiduPrivateLinks[_baiduPrivateLinksCountPtr]);
        }
    });
}

function getOneBookInfoFromBaidu(oneBaiduUrl) {
	var ret = GM_xmlhttpRequest({
		method: "GET",
		url: oneBaiduUrl,
		onload: function(res) {
			if (_baiduPrivateLinksCountPtr >= _baiduPrivateLinksCount) {
				autoSelectSourceType();
				genCheckRepeats();
				autoFillSubject();
				autoFillContent();
				var psElement = document.getElementById("waitDiv");
				psElement.innerHTML = '<em>完成</em>';
				return;
			}
            var oriTxt = res.responseText;
            var furl = res.finalUrl;
            console.log("baidu link: " + oneBaiduUrl);
            console.log("final url: " + furl);
            console.log("baidu response: " + oriTxt);
            var patNeedPasswd = /请输入提取密码/;
            var needPasswd = oriTxt.match(patNeedPasswd);
            if (needPasswd) {
                console.log("baidu: need password");
                var verifyUrl = _baiduPrivateLinks[_baiduPrivateLinksCountPtr].replace(/link/, "verify");
                if (furl.length > 0) {
                    verifyUrl = furl.replace(/init/, "verify");
                    _baiduPrivateLinks[_baiduPrivateLinksCountPtr] = furl.replace(/init/, "link");
                }
                verifyUrl = verifyUrl + "&t=1365425656653";
                console.log("baidu verifyUrl: " + verifyUrl);
                var param = "pwd=" + _baiduPasswords[_baiduPrivateLinksCountPtr];
                var refurl = _baiduPrivateLinks[_baiduPrivateLinksCountPtr].replace(/link/, "init");
                if (furl.length > 0) {
                    refurl = furl;
                }
                postForOneBookInfoFromBaidu(verifyUrl, refurl, param);
                //getOneBookInfoFromBaidu(verifyUrl);
            }
            else {
                if (isFolderShare == 0) {
                    // 文件夹分享？
                    var patFolder = /文件大小:-/;
                    var folder = oriTxt.match(patFolder);
                    if (folder) {
                        console.log("baidu is folder");
                        // var patFileName = /文件名:([\s\S]+)文件大小/;
                        // var tmpFileNames = oriTxt.match(patFileName);
                        // if (tmpFileNames) {
                            // _115fileName = tmpFileNames[1];
                            // _115fileNames[_baiduPrivateLinksCountPtr] = _115fileName;
                        // }
                    
                        // 请求文件夹内容大小
                        isFolderShare = 1;
                        var urlori = _baiduPrivateLinks[_baiduPrivateLinksCountPtr];
                        var uk = urlori.match(/uk=(\d+)/)[1];
                        var shareid = urlori.match(/shareid=(\d+)/)[1];
                        oriTxt = unescape(oriTxt.replace(/\\u/gi, "%u"));
                        oriTxt = oriTxt.replace(/\\/g, "");
                        console.log("oriTxt processed: " + oriTxt);
                        var dir = oriTxt.match(/"path":"(.[^"]*)"/);
                        //var dir = oriTxt.match(/path:"([\s\S]+)"}\);}/);
                        console.log("dir: " + dir);
                        _115fileName = dir[1];
                        _115fileNames[_baiduPrivateLinksCountPtr] = _115fileName;
                        var dirStr = encodeURIComponent(dir[1]);
                        var urlajax = 'http://pan.baidu.com/share/list?channel=chunlei&clienttype=0&web=1&num=100&t=1350169645084&page=1&dir='+dirStr+'&t=0.62888&uk='+uk+'&shareid='+shareid+'&_=1350169645087';
                        console.log("urlajax: " + urlajax);
                        getOneBookInfoFromBaidu(urlajax);
                    }
                    else {
                        console.log("baidu is file");
                        var txt = oriTxt.replace(/<[^>]*>/g, "");
                        getFileSizeAndNameBaidu(oriTxt);
                        ++_baiduPrivateLinksCountPtr;
                        getOneBookInfoFromBaidu(_baiduPrivateLinks[_baiduPrivateLinksCountPtr]);
                    }
                }
                else { // 已完成请求文件夹分享内容大小
                    getFileSizeAndNameBaidu(oriTxt);
                    ++_baiduPrivateLinksCountPtr;
                    getOneBookInfoFromBaidu(_baiduPrivateLinks[_baiduPrivateLinksCountPtr]);
                    isFolderShare = 0;
                }
            }
		}
	});
}

function genCheckRepeats() {
    var checkAutoSearchRepeat = document.getElementById("checkAutoSearchRepeat");
    if (checkAutoSearchRepeat.checked) {
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
            bookListWithSS += bookNames[i] + "_" + sss[i] + '  <a href="' + dxurlForShows[i] +'">' + dxurlForShows[i] + '</a><br>';
            bookListWithSSnoURL += bookNames[i] + "_" + sss[i] + '<br>';
            chkRepeatDiv.appendChild(chkDiv);
        }
        if (dxUrlsCount > 0) {
            checkIfBookExist(sss[0]);
        }
    }
}

function autoGenerate() {
	var psElement = document.getElementById("waitDiv");
	psElement.innerHTML = '<em><img src="template/yeei_dream1/css/yeei//loading.gif"> 请稍候...</em>';
	getDxUrls();
	getUrlsAndFormula();
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
}

function autoGenerateForHelp() {
    var psElement = document.getElementById("waitDiv");
    psElement.innerHTML = '<em><img src="template/yeei_dream1/css/yeei/loading.gif"> 请稍候...</em>';
    getDxUrls();
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
		getOneBookInfoFromDXForHelp(dxUrls[dxUrlsCountPtr]);        
    }
}

app = {
	run: function() {
		var postForm = document.getElementById("postform");
		var parent = postForm.parentNode;
		var dxDiv = document.createElement("div");
		dxDiv.innerHTML = '<span><font color="Red"><b>E书园售书助手' + version + '</b></font></span><br><span>请输入 dx 地址（每个地址一行）： </span><br><span><textarea name="dxurl" id="dxurl" cols ="120" rows = "3"></textarea></span><br>';
        var _baiduDiv = document.createElement("div");
        _baiduDiv.innerHTML =  '<br><span>请输入百度云网盘私密分享链接（每条链接一行）。格式如下（含“链接”、“密码”字样）：</span><br><span><font color="Red"><b>链接:http://pan.baidu.com/share/link?shareid=***&uk=*** 密码:****</b></font></span><br><span><textarea name="_baiduPrivateLink" id="_baiduPrivateLink" cols="120" row="3"></textarea></span><br>';
        var _115FormulaDiv = document.createElement("div");
        _115FormulaDiv.innerHTML = '<span>或115标准提取式（每个标准提取式一行）：</span><br><span><textarea name="_115Formula" id="_115Formula" cols="120" rows="3"></textarea></span><br>'
		var _115Div = document.createElement("div");
		_115Div.innerHTML = '<br><span>或115礼包链接：</span><br><span><textarea name="_115gift" id="_115gift" cols ="120" rows = "3"></textarea></span><br>';
		var btnDiv = document.createElement("div");
		btnDiv.innerHTML = '<button type="button" id="btnAutoGen" value="true" onclick=""><em>自动生成售书信息</em></button><button type="button" id="btnAutoGenForHelp" value="true" onclick=""><em>自动生成求书信息</em></button>';
		var waitDiv = document.createElement("div");
		waitDiv.setAttribute("id", "waitDiv");
		waitDiv.innerHTML = '';
		var radioDiv = document.createElement("div");
		radioDiv.innerHTML = '<input id="radioShowAll" type="radio" name="showAllBooks" checked="checked" value="all" > 显示所有书籍的信息 </input> <input id="radioShowOne" type="radio" name="showAllBooks" value="one" > 显示第一本书籍的信息及详细书目 </input> <br><input id="checkUseSeriesName" type="checkbox" name="useSeriesName" value="no">标题使用丛书名</input><br><input id="checkAutoSearchRepeat" type="checkbox" name="autoSearchRepeat" checked="checked" value="yes">根据ss号自动搜索书籍重复情况</input><br>';
		var checkDiv = document.createElement("div");
		checkDiv.setAttribute("id", "chkRepeatDiv");
		checkDiv.setAttribute("style", "width:450px;height:88px;border:1px;overflow-y:scroll;word-break:break-all ");
		
        var frameDiv = document.createElement("div");
		//frameDiv.innerHTML = '<iframe id="sr_iframe" style="height: 200px; width: 600px" frameborder="1"> </iframe>';
        var ssSearchResultDiv = document.createElement("div");
        ssSearchResultDiv.innerHTML = '<span>ss搜索结果：</span><br>'
        frameDiv.appendChild(ssSearchResultDiv);
		var iframeNode = document.createElement("iframe");
		iframeNode.id = "sr_iframe";
		iframeNode.name = "search_result_frame";
		iframeNode.frameBorder = "1";
		iframeNode.style.width = "800px";
		iframeNode.style.height = "300px";
		iframeNode.src = 'http://www.eshuyuan.net/search.php?mod=forum';
		frameDiv.appendChild(iframeNode);
               
		// iframeNode.innerHTML = '<html> <frameset cols="100%"> <frame src="www.eshuyuan.net/search.php?mod=forum" name="search_result_frame"> </frame> </frameset> </html>';
		parent.insertBefore(dxDiv, postForm);
		// parent.insertBefore(nullDiv, postForm);
        parent.insertBefore(_baiduDiv, postForm);
        parent.insertBefore(_115FormulaDiv, postForm);
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
        var btnAutoGenForHelp = document.getElementById("btnAutoGenForHelp");
        btnAutoGenForHelp.addEventListener("click", autoGenerateForHelp, false);
		//console.log("generate ok");
    }
};

try {
    app.run();
} catch (e) {
    //alert(e.message);
}