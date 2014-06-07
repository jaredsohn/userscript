// ==UserScript==
// @name           ImageAlbumPanel
// @namespace      xiaoranzzz
// @description    Redirect images search result from google.com and so on
// @require		   data_miner.js
// @include        http*
// ==/UserScript==

var XRZPanel = unsafeWindow.XRZ.Panel;

if(!XRZPanel.init()) return false;

var $ = unsafeWindow.xrlin_jquery || unsafeWindow.$;

debugPrint("Start:" + Date());
var DOCHREF = document.location.href;
var ELMLINKS = document.getElementsByTagName('a');
var ELMIMGS = document.getElementsByTagName('img');
var DOCTEXT = document.body ? document.body.innerHTML : "";
var DOCIMAGES = new Array();
var SHOWTABLE = false;
var PAGECOUNT;
var LEFTCOUNT;

const DEFAULTEXP = /^http:\/\//
const PAGESIZE = 20;
const PAGESIZEMIN = 5;
const NVPANELID = "xrlin_nvpanel";
const INDEXSTYLE=' style="text-decoration:underline;cursor:pointer;color:darkblue;" ';
const ITEMSTYLE =' style="text-align:left;color:darkblue;padding-left:20px;" ';
const IMAGESTYLE='  style="border:1px solid #000000;background-color:#EEEEEE;padding:2px;margin-bottom:20px;" ';
const CURITEMSTYLE  =' style="color:black;" ';
const IMAGEONLOAD = ' onload="var MAXWIDTH = window.innerWidth*0.97;if (this.width>MAXWIDTH) this.width = MAXWIDTH;" ';
const ALBUM_TEXT_OPENED = '<strong style="color:red;">*Album</strong>';
const ALBUM_TEXT_CLOSED = '<font style="text-decoration:underline">Album</font>';

//UTILS
function debugPrint(text) {
    console.log("ImageAlbum: " + text);
}

function getBaseName(strHref) {
    var result = strHref;
    if (!strHref) {
        return '';
	}
	if(strHref.match(/\/+$/)) {
		result = strHref.replace(/\/+$/,'');
	}
    result=strHref.replace(/.*\//,"");
    if (result == "" ) 
        result = strHref;
    return result;
}

//DATA MINER
var M = new dataMiner(DOCHREF);
//DATA MINER END
//PRESENTION
function post_process(image_object) {
	var src = image_object.src;
	var href = image_object.href;
	var text = image_object.text;
	var elm = image_object.target;
	var pt = elm.parentNode;
	var p_href = pt ? pt.href : '';
	var p_text = pt ? pt.textContent : '';
	if(image_object.no_edit || !(image_object.dialog || image_object.inline)) {
		if(!href) {
			href = elm.href || p_href || src;
		}
		if(!text) {
			text = elm.text || p_text || href;
		}
		return {src:src, href:href,text:text};
	}
	var inline = image_object.inline || !image_object.dialog;
	var top = pt.parentNode;
	var tagname1 = elm.tagName.toLowerCase();
	var tagname2 = pt.tagName.toLowerCase();
	
	if(tagname1 == 'img' && tagname2 == 'a') {
		if(!href) {
			href = p_href;
		}
		if(!text) {
			text = p_text;
		}
		if(image_object.no_wrap) {
			pt.href = 'javascript:void(0)';
			pt.target = '';
		}
		else {
			pt.removeChild(elm);
			top.appendChild(elm);
			pt.innerHTML = pt.innerHTML + '[Open]';
			//getBaseName(pt.href);
		}
	}
	else if(tagname1 == 'a') {
		if(!href) href = elm.href;
		if(!text) text = elm.text;
		if(!image_object.no_wrap) {
			var dup = elm.cloneNode(false);
		//dup.setAttribute('IMAGE_ALBUM_NO_PROCESS_AGAIN');
			dup.innerHTML = dup.innerHTML + '[Open]';//getBaseName(href);
			$(dup).insertAfter(elm);
		}
	}
	if(!href) href = src;
	if(!text) text = getBaseName(href);
	//debugPrint(elm.tagName + "[inline]" + inline + "\n" + src + "\n" + href + "\n" + text + "\n");
	$(elm).attr({
		d_src: 	src,
		d_href: href,
		d_text: text,
		href: 'javascript:void(0)',
		target: '',
	});
	elm.addEventListener('click', (inline ?
		function(){return showImageInline(this);} : 
		function(){return showImageDialog(this);}),
		false
	);
	// var btn = $('<input />', {
		// d_src: 	src,
		// d_href: href,
		// d_text: text,
		// type:	'button',
		// 'title':'zoom',
		// 'text' : 'zoom',
		// 'value' : '+',
		// style:	'position:relative;top:0px;right:0px;',
	// });
	// if(inline) {
		// btn.click(function(){return showImageInline(this);});
	// }
	// else {
		// btn.click(function(){return showImageDialog(this);});
	// }
	// btn.appendTo(elm.parentNode);
	return {src:src, href:href, text:text};
}

function new_image_from(src,href,text,elm,dialog) {
	return {
		src		:src,
		href	:href,
		text	:text,
		target	:elm,
		inline	:(!dialog),
	};
}


function openImageDialog(element,type) {
	if(type) {
		return showImageDialog(element);
	}
	else {
		return showImageInline(element);
	}
}
function showImageDialog(element) {
	var text = element.getAttribute('d_text');
	var src = element.getAttribute('d_src');
	var href = element.getAttribute('d_href');
	var dialogSize = window.innerWidth*0.8;
	var img = $('<img />',{
		src:src,
		title:text,
		alt:'loading ' + src,
		click	:function() {
			$('#XRLIN_IMAGE_DIALOG').dialog('close');
		},
		load	:function() {
			var MAXWIDTH = dialogSize-50;
			if (this.width>MAXWIDTH) this.width = MAXWIDTH;
		}
		//style:'position:relative;z-index:32767;width:100% !important;height:100% !important',
	});
	var div = document.getElementById('XRLIN_IMAGE_DIALOG');
	if(div) {
		div = $(div);
	}
	else {
		div = $('<div />', {
			id		:'XRLIN_IMAGE_DIALOG',
			style: 'text-align:center;',
			width:	dialogSize - 40,
			//style	:'position:relative;z-index:32767;width:100% !important;height:100% !important',
			click	: function(e) {
				$(e.target).dialog('close');
			}
		});
	}
	div.children().remove();
	$('<a href="' + href + '">' + text + '</a><BR/>').appendTo(div);
	div.append(img);
	div.dialog({
		title:text,
		autoOpen:false, 
		'width': dialogSize,
		'height':(window.innerHeight)*0.9,
		position:'center'
	});
	div.dialog('open');
	return false;
}
function showImageInline(element) {
	var $ = unsafeWindow.$;
	if(element.getAttribute('XRLIN_HAVE_PARENT')) {
		$(element).prev().show();
		$(element).hide();
		return 1;
	}
	else if(element.getAttribute('XRLIN_HAVE_CHILD')) {
		$(element).hide();
		$(element).next().show();
		return 1;
	}
	var text = element.getAttribute('d_text');
	var src = element.getAttribute('d_src');
	var href = element.getAttribute('d_href');
	element.setAttribute('XRLIN_HAVE_CHILD',1);
	//element.setAttribute('src',src);
	//element.src = src;
	//element.setAttribute('height','auto');
	//element.setAttribute('width','auto');
	var img = $('<img />',{
		src:src,
		title:text,
		alt:'loading ' + src,
		style:'position:relative;z-index:32767;',
		'XRLIN_HAVE_PARENT': 1,
		click: function() {
				return showImageInline(this);
			},
	});
	$(element).after(img);
	$(element).hide();
}

function appendIndexLink(idx,text,idxPanel) {
    var idxPage = document.createElement("span");
    idxPage.innerHTML="<span" + INDEXSTYLE + ">" + text + "</span>"
    idxPage.addEventListener("click",function(){loadPage(idx);},false);
    var sep = document.createElement("span");
    sep.innerHTML="&nbsp;&nbsp;";
    idxPanel.appendChild(idxPage);
    idxPanel.appendChild(sep);
}
function appendItem(item,idx,contPanel) {
    var itemLink = document.createElement("div");
    itemLink.style.textAlign="left";
    itemLink.innerHTML='<a' +  ITEMSTYLE + 'href="' + item.href + '">' + idx + "." +  item.text + '</a>'; 
    contPanel.appendChild(itemLink);
    var itemImage = document.createElement("div");
    itemImage.innerHTML='<img' + IMAGESTYLE + IMAGEONLOAD +  'src="' + item.src + '"></img>' 
    contPanel.appendChild(itemImage);
}
function createIndexPanel(idxPage,count,nvPanel) {
    if (count>1) {
        var idxPanel = document.createElement("div");
        idxPanel.style.textAlign="center";
        idxPanel.style.width="100%";
        idxPanel.style.padding="5px";

        if (idxPage>1) 
            appendIndexLink(idxPage-1,"Prev",idxPanel);

        var curItem = document.createElement("span");
        curItem.innerHTML = "<span" + CURITEMSTYLE +">" + "[" + idxPage + "]&nbsp;&nbsp;" + "</span>";
        idxPanel.appendChild(curItem);
        /*
        for (var curIdx=1;curIdx<idxPage;curIdx++) 
            appendIndexLink(curIdx,curIdx,idxPanel);
        for (var curIdx=idxPage + 1;curIdx<=count;curIdx++)
            appendIndexLink(curIdx,curIdx,idxPanel);
        */

        if (idxPage<count) 
            appendIndexLink(idxPage+1,"Next",idxPanel);
        nvPanel.appendChild(idxPanel);
    }   
}

function loadPage(idxPage) {
    if (idxPage>PAGECOUNT) return;
    var nvPanel = document.getElementById("xrlin_imgAlbum");
    if (nvPanel) nvPanel.parentNode.removeChild(nvPanel);
    nvPanel = document.createElement("div");
    nvPanel.id="xrlin_imgAlbum";
//    nvPanel.style.position = "fixed";
//    nvPanel.style.top = "100px";
//    nvPanel.style.height = "800";
    //nvPanel.style.overFlow = "auto";
//    nvPanel.style.overFlow = "scroll";
    with (nvPanel.style) {
        textAlign="center";margin="0px";padding="4px";
        backgroundColor="#F9FFE5";//opacity="0.95";
    //    zIndex="32767";border="solid #000000 1px";
    //    position="fixed";top="60px";left="2%";
        overflow = "scroll";height="100%";
        //width="95%";
    }
    createIndexPanel(idxPage,PAGECOUNT,nvPanel); 
    var head = document.createElement("span");
    head.innerHTML = "----<BR />";
    nvPanel.appendChild(head);
    var contPanel = document.createElement("div");
    //contPanel.id = contPanelId;
    var maxPage = PAGESIZE*idxPage;
    if (maxPage>DOCIMAGES.length) maxPage = DOCIMAGES.length;
    if (idxPage==PAGECOUNT && LEFTCOUNT<PAGESIZEMIN) {
        maxPage = maxPage + LEFTCOUNT;
    }
    for(var curPage=PAGESIZE*(idxPage-1);curPage<maxPage;curPage++)
        appendItem(DOCIMAGES[curPage],curPage+1,contPanel);
    nvPanel.appendChild(contPanel);
    createIndexPanel(idxPage,PAGECOUNT,nvPanel); 
    //document.body.appendChild(nvPanel);
	$(nvPanel).dialog({
		'autoOpen':false,
		'width': window.innerWidth - 60,
		'height':window.innerHeight - 60,
		position:'center',
		'title':'Images Album',
		'model':true
	});
	
    //document.body.insertBefore(nvPanel,document.body.firstChild);
	$(nvPanel).dialog('open');
    return nvPanel;
}

function showImgTable(elm,count,pre1,pre2) {
    var nvPanel = document.getElementById("xrlin_imgAlbum");
    if (nvPanel == null) {
        elm.innerHTML = ALBUM_TEXT_OPENED + count;
        nvPanel = loadPage(1);
    }
    else {
        var show = nvPanel.style.display;
        if(show == 'none') {
            nvPanel.style.display = "block";
			elm.innerHTML = ALBUM_TEXT_OPENED + count ;
			$(nvPanel).dialog('open');
        }
        else {
            nvPanel.style.display = "none";
			elm.innerHTML = ALBUM_TEXT_CLOSED + count;  
			$(nvPanel).dialog('close');
        }
    }
}
function loadAll() {
	DOCIMAGES = M.collect(DOCIMAGES);	
	unsafeWindow.DOCIMAGES = DOCIMAGES;
	debugPrint("Get " + DOCIMAGES.length + " result");
	for(var i=0;i<DOCIMAGES.length;i++) {
		DOCIMAGES[i] = post_process(DOCIMAGES[i]);
	}
	PAGECOUNT = Math.floor((DOCIMAGES.length-1)/PAGESIZE) + 1;
	if (PAGECOUNT<0) PAGECOUNT=0;
	
	if (PAGECOUNT>1) {
	    LEFTCOUNT =  DOCIMAGES.length - (PAGECOUNT-1)*PAGESIZE;
	    if (LEFTCOUNT<0) LEFTCOUNT= 0;
	    if (LEFTCOUNT>0 && LEFTCOUNT<PAGESIZEMIN) --PAGECOUNT;
	}
	else {
	    LEFTCOUNT = 0;
	}
	if (DOCIMAGES.length>0) {
	    /*Alubm panel*/
		var slen = '[' + DOCIMAGES.length + ']';
		var control_id = 'xz_image_album_control';
		var my_control = document.getElementById(control_id);
		if(my_control) {
			my_control.parentNode.removeChild(my_control);
		}
		my_control = document.createElement('span');
		my_control.innerHTML = '&nbsp;';
		my_control.id = control_id;
	    var albumInfo = document.createElement("span");
	    albumInfo.innerHTML=ALBUM_TEXT_CLOSED + slen ;
	    //albumInfo.style.textDecoration = "underline";
	    albumInfo.style.cursor="pointer";
	    albumInfo.addEventListener("click",function() {showImgTable(albumInfo,slen);},false);
		my_control.appendChild(albumInfo);
	    
	    
		    /*Alubm panel*/
	    var albumReloadBar = document.createElement("span");
	    albumReloadBar.innerHTML='[R]';
		albumReloadBar.title = 'Reload';
	    //albumReloadBar.style.textDecoration = "underline";
	    albumReloadBar.style.cursor="pointer";
	    albumReloadBar.addEventListener("click",function() {reloadAll();},false);
	    my_control.appendChild(albumReloadBar);
		
	    //alert(XRZPanel.DOMBox);
	    if(PAGECOUNT>1) {
	        var albumPage = document.createElement("span");
	        albumPage.innerHTML=",Page: ";
	        my_control.appendChild(albumPage);
	        for (var i=1;i<=PAGECOUNT;++i) {
	            appendIndexLink(i,i,my_control);
	        }
	    }
	
	    XRZPanel.add(my_control);
	   //     XRZPanel.addSpace();
	    XRZPanel.show();
	    if (SHOWTABLE) showImgTable(albumInfo,'[' + DOCIMAGES.length + ']');
	}
}

function reloadAll() {
	DOCIMAGES = new Array();
	var nvPanel = document.getElementById("xrlin_imgAlbum");
	if(nvPanel) {
		nvPanel.parentNode.removeChild(nvPanel);
	}
	loadAll();
}
//PRESENTION END


//REGISTER MINER
M.registerDefault(/0*[01].s?html?[^\/]*$/,
	[document,''],
    function() {
        var picIdx = 0;
        var result = new Array();
        var match = DOCHREF.match(/(\d+)\.s?html?[^\/]*$/i);
        if(!match) return result;
        picIdx = match[1];
        var baseImg;
        for(var i=0;i<ELMIMGS.length;i++) {
            if(ELMIMGS[i].src.match(new RegExp(picIdx + "\.jpg$","i")) || 
                ELMIMGS[i].src.match(new RegExp((picIdx - 1) + "\.jpg$","i")) || 
                ELMIMGS[i].src.match(new RegExp((picIdx + 1) + "\.jpg$","i"))) {
                baseImg = ELMIMGS[i].src;
                baseImg = baseImg.replace(/\d+\.jpg$/,"");
                break;
            }
        }
        if(!baseImg) return result;
        var count= new Number(0);
        var linkExp = DOCHREF;
        linkExp = linkExp.replace(/^.*\//g,"");
        linkExp = linkExp.replace(/\//g,"\\\/");
        linkExp = linkExp.replace(/\d+\.s?html?.*$/,"(\\d+)\\.s?html?");
        linkExp = new RegExp(linkExp,"i");
        for(var i=0;i<ELMLINKS.length;i++) {
            var match = linkExp.exec(ELMLINKS[i].href);
            if(match) {
                if(count<new Number(match[1])) {
                    count=new Number(match[1]);
            }}
        }
        if(!count) return result;
        if(count>300) return result;
        for(var i=0;i<10 && i<count;i++) {
            var src = baseImg + i + ".jpg";
            result.push({src:src,href:src,text:src});
            src = baseImg + "0" + i + ".jpg";
            result.push({src:src,href:src,text:src});
            src = baseImg + "00" + i + ".jpg";
            result.push({src:src,href:src,text:src});
            
        }
        for(var i=10;i<100 && i<count;i++) {
            var src = baseImg + i + ".jpg";
            result.push({src:src,href:src,text:src});
            src = baseImg + "0" + i + ".jpg";
            result.push({src:src,href:src,text:src});
        }
        for(var i=100;i<count;i++) {
            var src = baseImg + i + ".jpg";
            result.push({src:src,href:src,text:src});
        }
        return result;            
    }
);

M.registerFailback(
	['img','src'],
	'attr_replace',
	[/\/thumbnails\/tn_*([^\/]+\.jpg)$/i,"/$1"]
);
M.registerFailback(
	['img','src'],
	'attr_replace',
	[/\/thumb_([^\/]*.jpg)$/,"/$1"]
);
M.registerFailback(
	['img','src'],
	'attr_replace',
	[/(_s|_small)\.jpg$/, ".jpg"]
);
M.registerFailback(
	['img','src'],
	'attr_replace',
	[/\/cwdata\/([^\/]+\.jpg)$/, "/$1"]
);
M.registerFailback(
	['img','src'],
	'attr_replace',
	[/\/pic_lib\/s.*\/(.*)s.*\.jpg/,"/pic_lib/wm/$1.jpg"]
);
M.registerFailback(
	['img','src'],
	'attr_replace',
	[/thumbs\/([^_]+_[^_]+)_(.*)_thumb.jpg/,"pictures/$1/$1_$2/$1_$2.jpg"]
);
M.registerFailback(
	['href','a'],
	'attr_match',
	[/(http\:\/\/[^=]*\.(jpg|jpeg|jpe))$/i,1,null,null]
);
//****************************************************
//Strong Rules
//****************************************************
M.register(/http:\/\/image\.soso\.com\//,
	[document],
	function(elm) {
		var r = new Array();
		var G = unsafeWindow.G;
		if(!(G && G.json && G.json.details)) return false;
		var jsonResult = G.json.details.items;
		var b = G.json.rollPage.begin;
		var e = G.json.rollPage.end;
		for(var i=b;i<=e;i++) {
			var item = jsonResult[i];
				r.push({
					src		:item.src,
					href	:item.ref,
					text	:item.TT || item.title
				});
		}
		return r;
	}
);

M.register(/http:\/\/search.sina.com.cn\//,
	['img','src'], function(img,src) {
		if(!src) return false;
		var id = new String(img.id);
		var r = {src:null,href:null,text:img.getAttribute('alt')};
		var m = src.match(/.+\&url=(.+)$/);
		if(!m) return false;
		src = unescape(m[1]);
		r.src = src;
		if(id) {
			var m = id.match(/^img_(.+)$/);
			if(m) {
				id = m[1];
			}
		}
		var a = document.getElementById('a_' + id);
		if(a) {
			r.href = a.getAttribute('href');
		}
		return { 
			src:r.src,
			href:r.href,
			text:r.text
		};
    },
	'',
    {dialog:true,no_wrap:true}
);

M.addSite(/http:\/\/www.mday.com.cn\/html\//,
    function() {
        var result = new Array();
        if(unsafeWindow.ComicImg) {
            for(var i=0;i<unsafeWindow.ComicImg.length;i++) {
                var url = unsafeWindow.prevUrls2[unsafeWindow.currIndex2]+unsafeWindow.dirStr+unsafeWindow.ComicImg[i];
                result.push({src:url,href:url,text:url});
            }
        }
        return result;
    },
    false
);
M.addSite(/nanrenzhuang\.net\/girl\//,
    function() {
        var result = new Array();
        if(unsafeWindow.picURL) {
			var linktext = new String(unsafeWindow.picURL);
			var links = linktext.split(/\|/);
            for(var i=0;i<links.length;i++) {
                var url = links[i];
                result.push({src:url,href:url,text:url});
            }
        }
        return result;
    },
    false
);
M.addSite(/http:\/\/(dm\.e-teng\.com|www\.jumpc\.com)\//,
    function () {
        var imgs = document.getElementsByTagName("img");var result = new Array(); var img;
        var pattern=/([0-9]*)(\.jpg|_[^\/_0123456789]+\.jpg)$/i;
        for (var i=0;i<imgs.length;++i) {if (imgs[i].src.match(pattern)) {img = imgs[i].src;break;}}
        if (img != null) {
            var links = document.getElementsByTagName("a");
            var imgcount = 0;
            for (var i=0;i<links.length;i++) {if (links[i].href.match(/\/[0-9]+-[0-9]+\.shtml/i)) imgcount++;}
            var res = img.match(pattern);
            if (res) {
                var num = res[1];var numlen = new Number(-num.length/2);
                for (var i=0;i<imgcount;++i) {
                    var strnum1 = "000" + (i); var strnum2 = "000" + (i+1);
                    strnum1 = strnum1.substr(numlen); strnum2 = strnum2.substr(numlen);
                    var url = img.replace(pattern, strnum1 + strnum2 + ".jpg");
                    result.push(new_image_from(url,url,url,img,0));
                }
            }
        }
        return result;
    },
    false
);

M.addSite(/^http:\/\/www\.591ac\.com\/photo\/.*\/default.htm$/,
    function () {
        var images = document.getElementsByTagName("img");
        var result = new Array();
        for (var i=0;i<images.length;++i) {
            var src = images[i].src;
            var res = src.match(/^(http:\/\/www\.591ac\.com\/photo\/.*_)([0-9]+)\.jpg$/i);
            if (res) {
                var num = new Number(res[2]);
                num +=2;
                src = res[1] + num + ".jpg";
                result.push(new_image_from(src,href,text,images[i],1));
            }
        }
        return result;
    },
    false);


M.reg(/image\.baidu\.com/,
	['a:has(img)','onclick'],
	function(elm,onclick) {
		if(!onclick) return;
		var m = onclick.match(/u:'([^']+)'.*f:'([^']*)'/);
		if(m) {
			return {src:m[1],href:m[2]};
		}
	},
	null,
	{dialog:true,no_cache_selector:true}
);
M.reg(/image\.baidu\.com/,
	[document,'location'],
	function() {
		var saved = unsafeWindow.BD.IMG.view.PagingDisplay.switchPage;
		unsafeWindow.BD.IMG.view.PagingDisplay.switchPage = function(arg1,arg2) {
			reloadAll();
			saved(arg1,arg2);
		}
		if(M.lastMatch) return;
        var result = new Array();
		if(unsafeWindow.imgdata && unsafeWindow.imgdata.data) {
			var data = unsafeWindow.imgdata.data;
			for(var i=0;i<data.length;i++) {
				result.push({src:data[i].objURL,href:data[i].fromURL,text:data[i].fromPageTitle});
			}
		}
		return result;
	},
	null
);
//onMouseMove="OpenDiv('�鹵',this,195,139,'http://t1.goojje.com/b2/f3/93/b2f32a93349c04a4027a7540da0b7813.jpg','<em>�鹵</em>ս��','350X250-61k','http://v.766.com/zy/201011/20101124_40360.html','http://v.766.com/system/uploadimg/video/201008/pocle_20100830115444_9187.jpg',true)"

M.addSite(/image\.goojje\.com/,
    function() {    
        var result = new Array();
		var links = document.getElementsByTagName("img");
		for (var i=0;i<links.length;i++) {
			var curlink = links[i];
			var onclick = curlink.getAttribute("onMouseMove");
			if(onclick) {
				var r = onclick.match(/.+'(http:\/\/[^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'/);
				//debugPrint( onclick + " = " + r);
				if(r)
				{
					result.push(new_image_from(r[5],r[4],r[2],curlink,1));
				}
			}
			
		}
        return result;
    },
    false
);

M.addSite(/abdra\.net\/modules\/myalbum\/viewcat\.php/,
	function() {
		var result = new Array();
		for(var i=0;i<ELMLINKS.length;i++) {
			var lnk = ELMLINKS[i];
			if(lnk.href && lnk.href.match(/photo\.php\?lid=\d+$/)) {
				var img = lnk.firstChild;
				if(img && img.src && img.src.match(/\/thumbs\//)) {
					var src = img.src.replace(/\/thumbs\//,'/photos/');
					result.push(new_image_from(src,lnk.href,lnk.href,img,1));
				}
			}
		}
		return result;
	},
	false
);

M.addSite(/photo\.pchome\.com\.tw/,
	function() {
		var r = new Array();
		for(var i=0;i<ELMLINKS.length;i++) {
			var lnk = ELMLINKS[i];
			var sp = lnk.firstChild;
			if(sp && sp.id && sp.id.match(/^Img\[.+\]$/)) {
				src = sp.id.replace(/^Img\[(.+)s\.([^\.]+)\]$/,'$1.$2');
				var m = src.match(/s(\d+)\/[^\/]+\/[^\/]+\/([^\/]+)\/book(\d+)\/p([^\/\.]+)\.[^\.]+$/);
				if(m) {
					src = 'http://link.photo.pchome.com.tw/s' + m[1] + '/' + m[2] + '/' + m[3] + '/' + m[4] + '/';
				}
				r.push(new_image_from(src,lnk.href,lnk.text,sp,1));
			}
		}
		return r;
	},
	false
);

M.addImgSite(/_640(\.[^\.]+)$/,'$1',
	false,
	/my\.poco\.cn/
);

//M.addLinkSite(/\/ir?.*&u=([^&]*).*&f=([^&]*)/i,
//            1,2,null,false,
//            /\.baidu\.com/);

M.addLinkSite(/&furl=([^&]*)/i,
            1,1,1,false,
            /\.live\.com/);
M.addLinkSite(/&imgurl=([^&]*)&rurl=([^&]*)&.*&name=([^&]*)&/i,
            1,2,3,false,
            /\.yahoo\.com/);

M.addLinkSite(
    /\*\s*-\s*([^,]+)$/,
    1,null,null,false,
    /\.yahoo\./,
    'rev'
);
M.addImgSite(
    /http:\/\/(download\.21cn\.com\/file1)(.*)[0]([^0]+[0-9]*\.jpg$)/i,
    "http://dg.$1fk5esindid$2$3",false,
    /http:\/\/.*\.21cn\.com\//i
);

M.addImgSite(
    /\/smallview1\/([^\/]+)\/([^\/]+)\//,
    "/view1/$2/$1/",false,
    /imgb\.rentalcgi\.com/
);

M.addImgSite(
    /_thumbs\/[0-9]+x[0-9]+-/i,
    "",false,
    /flickrlicio\.us/
);

M.addImgSite(
    /\/infoPic\/(.+)_[^\/_]+\.([^\/\.]+)$/i,
    "/infoPic/$1.$2",false,
    /jpgsky\.com/
);

M.addImgSite(
    /\/t\//,
    "/i/",false,
    /imagebeaver\.com/
);
M.addImgSite(
    /\/(thumbs\/|thumbnails\/|small\/)?(tnl|tn|s)_?([^\/]*\.jpg)$/i,"/images/$3",false,
    /(avl\.com|hentaischool\.com)/
);
M.addImgSite(
    /_?(thumbs|thumbnails|small|s)\/(tnl|tn|s)_?/i,"/",false,
    /(talk\.dofor\.cn)/
);
M.addImgSite(
    /\/_?(th|tn|thumb|s)_?([^\/]*\.jpg)$/i,
    "/$2",false,
    /(photobucket\.com|sports\.donga\.com\/bbs\/)/
);
M.addImgSite(
    /\/thumbnails\//i,"/media/",false,
    /\.celebrityfan\./
);
M.addImgSite(
    /\/(thumbs|thumbnails)\//,"/",false,
    /celebscentral\.net/
);

M.addLinkSite(
    /\/showpic\.html\#.*url=([^&]+)/,1,null,1,false,
    /blog\.sina\.com\.cn/
);
M.addLinkSite(/(.*imagen\/\d+\/.+)/,1,null,1,false,/fondospantalla\.org/);
M.addTagSite('a','href',/fondos-de-[^\/]+\/fondos-[^\/]+\/fondos--([^\/]+\/[^\/]+\/[^\/]+)\/(\d+)/,'imagen/$2/$1.jpg',false,/fondospantalla\.org/);


/*
http://fondospantalla.org/fondos-de-chicas-s/fondos-sabrina-ferilli/fondos--chicas-s/sabrina-ferilli/sabrina-ferilli-1/1280
http://fondospantalla.org/imagen/1280/chicas-s/sabrina-ferilli/sabrina-ferilli-1.jpg
http://fondospantalla.org/thumbnails2/-sabrina-ferilli-sabrina-ferilli-1.jpg
http://fondospantalla.org/chicas-s/sabrina-ferilli/sabrina-ferilli-1.jpg
*/

M.addImgSite(
    /(small|bmiddle|middle|orignal)\//,"orignal/",false,
    /photo.blog\.sina\.com\.cn/
);

M.addImgSite(
    /_[0-9]+X[0-9]+\.jpg$/i,".jpg",false,
    /msn\.mtime\.com/i
);
M.addImgSite(
    /\/x\//,"/d/",false,
    /ent\.tom\.com\//i
);

M.addImgSite(
    /_S/,"",false,
    /mkl\.jp\//
);

//http://i2.turboimagehost.com/t/80593_55749_cyn9.JPG
M.addImgSite(
    /\/t\//,
    "/b/",false,
    /turboimagehost\.com/
);

M.addImgSite(
    /\/\d\.jpg$/,
    "/4.jpg",false,
    /livedoor\.com/
);
//http://ww3.sinaimg.cn/large/684e58a1tw1dgd30cyt75j.jpg
M.register(/t\.sina\.com\.cn|weibo\.com|weitu\.sdodo\.com/,
	['img','src'],
	'attr_replace',
    [/\/(bmiddle|thumbnail|thumb\d+)\/(.+)\.jpg$/,'/large/$2.jpg'],
	{dialog:true}
);


M.addImgSite(/_s\.jpg$/,    '_l.jpg',false,/\.tuzhan\.com/);
M.addImgSite(/-\d+[xX]\d+\./,'.',false,/milkyangels\.com/);
M.addTagSite(
    'img',
    'crs',
    /\/mblogpic\/([^\/]+)\/160/,
    '/mblogpic/$1/2000',
    false,
    /t\.qq\.com/
);

M.addTagSite(
    'img',
    'src',
    /\/var\/(resizes|thumbs)\//,
    '/var/albums/',
    false,
    /beautyleg.cc/,false
);

M.addImgSite(
	/(\/pic\/\d+-\d+-\d+\/)s_/,
	'$1',false,
	/tuku\.game\.china\.com/
);

M.addImgSite(
	/\/s\//,
	'/c/',false,
	/star\.tvyugao\.com\/.+\//
);

M.addImgSite(
	/\/thumb\/thumb_/,
	'/full/',
	false,
	/photo4asian\.com/
);

M.register(/roiro\.com\/venus/,
	['a','href'],
	'attr_match',
	[/.+refresh\.php\?.*url=(.+\.jpg)$/,1]
);

M.register(/boards\.4chan\.org/,
	['a:has(img)','href'],
	'attr_match',
	[/^(.+\/src\/([^\.\/]+\.(jpg|png|jpeg|gif)))$/,1],
	{inline:true,no_wrap:true}
);
	
M.register(
	/4gifs\.org/,
	['img','src'],
	function(elm,src) {
		var q = src.match(/\/d\/(\d+)-\d+\/([^\/]+)$/);
		if(q){
			return {src:src.replace(q[1] + '-',(q[1]-1) + '-')};
		}
	},
	null,
	{inline:true}
);

M.register(/http:\/\/slide(\.[^.]+)?\.sina\.com\.cn/,
	'div#eData dl',
	function(elm,attr) {
		var children = $(elm).children();
		return {
			src		:$(children[1]).html(),
			text	:$(children[0]).html()
		};
	}
);

M.registerSimple(/http\:\/\/www\.porn\-star\.com/,
	{inline:true}
);
M.registerSimple(/http:\/\/www\.ericaellyson\.net/,
	{inline:true}
);

M.register(/www\.reddit\.com/,
	['a.thumbnail','href'],
	'attr_match',
	[/^(.+\.(jpg|gif|jpeg|png))$/,1],
	{inline:true}
);

function RU(raw) {
	var url = raw.replace('/',"\\/");
	url = url.replace('.',"\\.");
	return url;
}

M.register(/celebuzz\.com/,
	['a img', 'src'],
	'attr_replace',
	[/(.*\/wp-content\/uploads\/.+)-\d+x\d+(\.[^.]+)$/,'$1$2'],
	{inline:false}
);

M.register(/skins\.be/,
	['a img','src'],
	'attr_replace',
	[/(\d*)thumb\.skins\.be/,'$1img.skins.be'],
	{inline:true}
);



M.register(/http:\/\/gods-art.de/,
	['a img','src'],
	'attr_replace',
	[/\.jpg/,'_big.jpg'],
	{dialog:true}
);

M.register(/http:\/\/www\.dmm\.co\.jp/,
	['img','src'],
	'attr_replace',
	[/p[st]\.jpg$/,'pl.jpg',/(\d+)-(\d+)\.jpg/,'$1jp-$2.jpg'],
	{dialog:true}
);

M.register(/http:\/\/blog\.sina\.cn\/dpool\/blog\/ArtRead\.php/,
	['a img','src'],
	'attr_replace',
	[/\/[\dx]+(\.[^\.]+)/,'/original$1'],
	{inline:true}
);
M.register(/http:\/\/photo\.xuite\.net/,
	['a img','src'],
	'attr_replace',
	[/^.+?(\d+)\.share\.photo\.xuite\.net\/([^\/]+)\/.(.)(.)(.)(.)[^\/]+\/([^\/]+\/[^\/]+)_c(\.[^\.]+)$/,'http://o.$1.photo.xuite.net/$3/$4/$5/$6/$2/$7$8',/^.+?([a-z]+\.share\.photo\.xuite\.net\/.+)_c(\.[^\.]+)$/,'http://$1_x$2'],
	{inline:true}
);
M.register(/http:\/\/mm\.taobao\.com/,
	['img','src'],
	'attr_replace',
	[/_\d+x\d+\.[^\.]+$/,''],
	{}
);
M.reg(/http:\/\/blog\.cntv\.cn/,
	['a img', 'src'],
	'attr_replace',
	[/\.thumb\./,'.'],
	{inline:true}
);
M.reg(/http:\/\/dp\.pconline\.com\.cn/,
	['a img', 'src'],
	'attr_replace',
	[/_thumb\.|_mthumb\./,'.'],
	{dialog:true}
);
M.reg(/http:\/\/blog\.sina\.com\.cn/,
	['img','real_src'],
	'attr_replace',
	[/\/(orignal|bmiddle|middle|small)\//,'/orignal/'],
	{dialog:true}
);

M.reg(/http:\/\/www\.bobx\.com/,
	['a img','src'],
	'attr_replace',
	[/\/thumbnail\/(.+)-preview/,'/$1'],
	{dialog:true}
);
/*
M.addLinkSite(/imgurl=([^&]*)&imgrefurl=([^&]*)&/,
            1,2,2,false,
            /:\/\/(www\.google|google)\./);
*/
M.reg(/:\/\/(www\.google|google)\./,
	['td a','href'],
	function(jelm,href) {
		if(!href) {
			return false;
		}
		var match = href.match(/imgurl=([^&]*)&imgrefurl=([^&]*)&/);
		if(!match) {
			return false;
		}
		return {
			src: match[1],
			href: match[2],
			text: jelm.parentNode.innerHTML,//textContent.replace(/(jpg|gif|png)/,'&nbsp;$1<BR/>','g'),
		};
	},
	[],
	{dialog:true}
);
M.reg(/http:\/\/photo\.xgo\.com\.cn\/ablum\//,
	['img','src'],
	'attr_replace',
	[/pics\/(\d+)\/\d+\/\d+/,"pics/$1"],
	{dialog:true}
);

//****************************************************
//Weak Rules
//****************************************************
//
M.reg2(/.*/,
	['a:has(img)','href'],
	'attr_match',
	[/^(.+\.(jpg|jpeg|gif|png))$/,1],
//	RU(
//		'http://www.theblackalley.(ws|net|biz|info)' 
//		+ '|http://www.hotasiansnude4u.com'
//		+ '|tokyochicks.com'
//		+ '|http://www.jp-pussy.com'
//		+ '|http://www.midnightasian.com'
//	),
	{inline:false,dialog:false}
);
M.reg2(/.*/,
	['input','src'],
	function(elm,src) {if(src) return {src:src};},
	null,
	{inline:true}
);
M.reg2(/.*/,
	['img','src'],
	'attr_replace',
    [/\.jpg\.thumb[s]*\.jpg$/,".jpg"],
	{dialog:true}
);
M.reg2(/\/bbs[\/\.]/,
	['img','src'],
	'attr_replace',
    [/bbs\/attachment\.php(.*)/i,"bbs/attachment.php$1\&noupdate=yes\&nothumb=yes"],
	{inline:true}
);

//REGISTER MINER END




//document.addEventListener("DOMContentLoaded", loadAll,true);
//window.addEventListener("load", loadAll,true);
if(DOCHREF && DOCHREF.match(/weibo\.com/)) {
	window.addEventListener('load',
		function() {
			loadAll();
			debugPrint("End:" + Date());
		},false
	);
}
else {
	loadAll();
	debugPrint("End:" + Date());
}





