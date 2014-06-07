// ==UserScript==
// @name           s1_simple_page_plus
// @namespace      tprnsm@gmail.com
// @description    用于在s1的打印页上显示楼层，打印页页面底端添加翻页链接，并在正常页面第一楼添加打印页链接；修正图片附件显示bug
// @include        http://*.saraba1st.com/*
// @include        http://saraba1st.com/*
// @include        http://*.stage1st.com/*
// @include        http://stage1st.com/*
// @include        http://*.sarabalst.com/*
// @include        http://sarabalst.com/*
// @include        http://220.196.42.167/*
// @version        0.7.1
// ==/UserScript==


function xpath(item, query) {
	return item.evaluate(query, document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addprint() {
	var as = xpath(document, '//a[@class="mr5 s6"]');
	
	var a = as.snapshotItem(0);
	var p = a.parentNode;
	
	var url = window.location.href;
	var tids = url.split(/-|\.|\?|=|\&/);
	
	var tid = 0;
	for (var i=0; i<tids.length; i++) {
		if (tids[i]=="tid") {
			tid = tids[i+1];
			break;
		}
	}
	
	var printa = document.createElement('a');
	printa.id = "simple_page_link";
	printa.setAttribute('class',"mr5 s6");
	printa.setAttribute('title',"打印页");
	printa.href = "simple/index.php?t"+tid+".html";
	printa.innerHTML = "打印页";
	
	p.insertBefore(printa, a.nextSibling);
}


function addfloor() {
	var cts = xpath(document, '/html/body/center');
	
	var ct1 = cts.snapshotItem(1);
	var ct2 = cts.snapshotItem(2);
	var p = ct2.parentNode;
	
	var tester1 = ct1.innerHTML;
	var tester2 = ct2.innerHTML;
	
	var pagenum = 1;
	if ( /Pages/i.test(tester1) && /查看完整版本/i.test(tester2) ) {
		var pagenode = ct1.cloneNode(true);
		p.insertBefore(pagenode, ct2);
		var brnode = document.createElement('br');
		p.insertBefore(brnode, ct2);
		
		var bs = xpath(document, '/html/body/center[2]/b');
		if (bs.snapshotLength==1) {
			var b1 = bs.snapshotItem(0);
			pagenum = b1.innerHTML;
		}
	}
	
	var tds = xpath(document, '//td[@class="smalltxt"][@align="right"]');
	for (var i = 0; i < tds.snapshotLength; i++) {
		var td = tds.snapshotItem(i);
		var fl = (pagenum-1)*50+i;
		var v = td.innerHTML;
		v += "\t"+"|<b>"+fl+"</b>L";
		td.innerHTML = v;
	}
	
}

function fixatt() {
	var lis = xpath(document, '//div[@class="pw_menu"]//li[@id]');
	
	for (var i = 0; i < lis.snapshotLength; i++) {
		var li = lis.snapshotItem(i);
		var temp = checktemp(li.parentNode);
		if (temp!=null) {
			temp.parentNode.insertBefore(li, temp.nextSibling);
		}
	}
}
function checktemp(temp) {
	if (temp.nodeName.toUpperCase()=="LI" && temp.parentNode.nodeName.toUpperCase()=="UL") {
		return temp;
	} else if (temp.nodeName.toUpperCase()=="DIV"
			&& temp.getAttribute('class')!=null
			&& (temp.getAttribute('class').toUpperCase()=="IMGLIST" || temp.getAttribute('class').toUpperCase()=="READ_T")
			) {
		return null;
	} else {
		return checktemp(temp.parentNode);
	}
}

var num = 0;

if ( /read-htm-tid-/i.test(window.location.href) || /read\.php\?tid=/i.test(window.location.href)) {
	addprint();
	fixatt();
}

if ( /\/simple\//i.test(window.location.href) ) {
	addfloor();
}