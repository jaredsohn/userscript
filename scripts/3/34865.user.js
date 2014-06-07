// ==UserScript==
// @name               Prefetch Next Page
// @description        预读取下一页
// @namespace          http://userscripts.org/
// @version            2
// @author             SUCCESS
// @include            *
// @exclude            http://*.baidu.com/*
// ==/UserScript==
/*
 * 此脚本根据 Next Page 脚本(http://mozilla.sociz.com/viewthread.php?tid=23048)发展而来，感谢 Sunwan 
 */

var leftpages = 1;	// 剩余页面高度小于 leftpages 倍可视窗体高度时，开始预读取下一页
var prefetched = false;
var checked = false;
var next = {};

    // 下一页链接里的文字

    next.texts      = [ 'next',
                        'next page',
                        'Next',
                        'Next Page',
                        'Next page',
                        'old',
                        'older',
                        'earlier',
                        '下页',
                        '下页',
                        '下一页',
                        '下一页',
                        '后一页',
                        '后一页',
                        '翻下页',
                        '翻下页',
                        '后页',
                        '后页',
                        '下翻',
                        '下一个',
                        '下一张',
                        '下一幅',
                        '下一节',
                        '下一章',
                        '下一篇',
                        '后一章',
                        '后一篇',
                        '>>',
                        '>',
                        '››',
                        '›'
                      ];


next.link = [];
tmp = [];
next.found = false;

// 取得自定义关键词
getCustom(next, "next");

// 注册脚本菜单
registerMenu("next");

    // 取得并设置自定义关键词
function getCustom(aObj, key) {
	var cKeyWords = GM_getValue("custom_" + key, "");
	var words = cKeyWords.split(/,|\uff0c/);
	for each (var w in words) {
        w = w.replace(/\\/g, "\\").replace(/^\s+|\s+$/g, "");
        if (w) aObj.texts.push(w);
	}
}

// 注册菜单
function registerMenu(key){
    if (navigator.language == "zh-CN") {
        var word = key == "next" ? "下一页" : "上一页";
        GM_registerMenuCommand("Next Page " + word + "关键词", function(){
            setCustom(key, word)
        });
    }
    else {
        GM_registerMenuCommand("Next Page custom_" + key, function(){
            setCustom(key, key)
        });
    }
}

// 设置新的关键词
function setCustom(k, w){
    var text = navigator.language == "zh-CN" ? "请输入“" + w + "”的关键词，以“,”号分隔开。" : "Please enter the " + w + " page key-words, split with ','.";
    var result = prompt(text, GM_getValue("custom_" + k, ""));
    if (result != null) 
        GM_setValue("custom_" + k, result);
}

function checkLinks() {
    // 查找相应的链接
	var xpathNext, text, i, textLinks, link, ldnc, ldpc, digChked, digStart, linkNumber;

	xpathNext ='';
    for (i=0;i<next.texts.length;i++) {
		text = next.texts[i].toString();
		xpathNext += '//a[(normalize-space(text())="' + text + '"' +
					 ' or normalize-space(@title)="' + text + '"' +
					 ' or font[normalize-space(text())="' + text + '"]' +
					 ' or img[normalize-space(@alt)="' + text + '"]' +
					 ' or img[normalize-space(@title)="' + text + '"]' +
					 ') and string-length(@href) > 0 and not(starts-with(@href,"javascript:"))] | ';
	}
	xpathNext = xpathNext.substr(0,xpathNext.length-3);
    textLinks = matchNode(xpathNext);
	if (textLinks.snapshotLength > 0) {
	// 如果匹配出了文字链接
		for (i=0;i<textLinks.snapshotLength;i++){
    		next.link.push(textLinks.snapshotItem(i));
		}
		next.found = true;
	}
	else {
	// 如果文字链接没有直接匹配的
		xpathNext ='//a[not(starts-with(@href,"javascript:"))]';
	    textLinks = matchNode(xpathNext);

		for (i=0;i<textLinks.snapshotLength;i++){
			link = textLinks.snapshotItem(i);
        // 跳过不可见的链接
        if (!link.offsetParent || link.offsetWidth == 0 || link.offsetHeight == 0)
          continue;
        // 跳过日历
        if (/(?:^|\s)(?:monthlink|weekday|day|day[\-_]\w+)(?:\s|$)/i.test(link.className))
          continue;

        text = link.textContent;
        if (!text) {
          // 若链接中没有文字，则检查图片的alt属性、链接或图片的title
			for each (var img in link.childNodes) {
            	if (img.localName == "IMG") {
              		text = img.alt || link.title || img.title;
              		if (text) break;
            	}
			}
			if (!text) continue;
        }
        text = text.toLowerCase().replace(/^\s+|\s+$/g, "");
        if (!text) continue;
        
        // 纯数字链接
        if (isDigital(text)) {
            if (digChked) 
                continue;
            linkNumber = parseInt(RegExp.$1);
            if (!digStart) {
                // 检测上一个位置是否是当前页面的页数
                if (isCurrentPageNumber(link, linkNumber, -1)) {
                    //              next.link = link;
                    tmp.push(link);
                    next.found = true;
					pushDuplicateNodes(link);
                    next.pos = i;
                    digStart = digChked = true;
                    ldpc = i + 30;
                    continue;
                }
                // 否则，检测自身是否是当前页面的页数
                else 
                    if (isCurrentPageNumber(link, linkNumber, 0)) {
                        // 再检测下一个位置是否是“下一页”的链接
                        if (getNextLink(link, linkNumber + 1, true)) {
                            next.pos = i;
                            digStart = digChked = true;
                            ldpc = i + 30;
                            continue;
                        }
                        // 设置同一组的纯数字链接已被检查
                        digChked = true;
                        // 设置往后的30个位置以内为“下一页”的可能链接，以提高检测速度。
                        ldnc = i + 30;
                    }
                // 同组的只需要被检测一次
                digStart = true;
            }
            // 检测下一个位置是否是当前页面的页数
            var tmpNode = isCurrentPageNumber(link, linkNumber, 1);
            if (tmpNode) {
                // 再检测下下一个位置是否是“下一页”的链接
                if (getNextLink(tmpNode, linkNumber + 2, true)) 
                    break;
                // 设置同一组的纯数字链接已被检查
                digChked = true;
                // 设置往后的30个位置以内为“下一页”的可能链接，以提高检测速度。
                ldnc = i + 30;
            }
            continue;
        }
        else {
			// 重新设置纯数字链接未被检查
			digChked = digStart = null;
        }

        // 找到“下一页”的链接或超过规定范围没找到，将不再查找。
        if (next.found || next.found && i > next.pos + 30)
          break;
		}
        
        // 通过以上方法没有找到“下一页”的，把第一次检测出来的数字1的链接作为当前页，2作为“下一页”。
        if (!next.found && next.digital) {
            tmp.push(next.digital);
            next.found = true;
        }

		// 如果找到了“下一页”的链接，则把具有相同 href 的节点按顺序全部放到 next.link 中
		if (next.found){
			xpathNext = '';

			for(i=0;i<tmp.length;i++){
				xpathNext += '//a[@href="' + tmp[i].getAttribute('href') + '"] | ';
			}
			xpathNext = xpathNext.substr(0,xpathNext.length-3);
    		textLinks = matchNode(xpathNext);

			for (i=0;i<textLinks.snapshotLength;i++){
				next.link.push(textLinks.snapshotItem(i));
			}
		}
	}
	next.link.stripHref(); // 去掉 href 重复的元素
}

/*
 *******************************************************************************************************
 * 功能函数
 *******************************************************************************************************
 */

// 去掉数组中 href 重复的元素。优先删除位于前面的元素。
Array.prototype.stripHref = function(){
    if (this.length < 2) 
        return [this[0]] || [];
    for (var i = this.length - 1; i > -1; i--) {
        for (var j = i - 1; j > -1; j--) {
            if (this[j].href == this[i].href) {
                this.splice(j, 1);
                i--;
            }
        }
    }
}

// 取得相邻的纯数字节点，type: 1 下一个；-1 上一个
function getSiblingNode(node, type){
    if (!node) 
        return null;
    node = getSibling(node, type);
    while (node &&
    (node.nodeName == "#coment" ||
    (/^\s*[\]\uff3d]?[,\|]?\s*[\[\uff3b]?\s*$/.test(node.textContent)))) 
        node = getSibling(node, type);
    return node;
}

function getSibling(aNode, type){
    if (!aNode) 
        return null;
    if (isOnlyNode(aNode)) {
        try {
            aNode = (type == 1 ? aNode.parentNode.nextSibling : aNode.parentNode.previousSibling);
            if (skipNode(aNode)) 
                aNode = (type == 1 ? aNode.nextSibling : aNode.previousSibling);
            aNode = aNode.childNodes[0];
            if (aNode.nodeName == "#text") 
                aNode = aNode.nextSibling;
        } 
        catch (e) {
            return null;
        }
    }
    else {
        aNode = (type == 1 ? aNode.nextSibling : aNode.previousSibling);
    }
    return aNode;
}

function isOnlyNode(n){
    return !n.nextSibling && !n.previousSibling ||
    !n.nextSibling && skipNode(n.previousSibling) && !n.previousSibling.previousSibling ||
    !n.previousSibling && skipNode(n.nextSibling) && !n.nextSibling.nextSibling ||
    skipNode(n.previousSibling) && !n.previousSibling.previousSibling &&
    skipNode(n.nextSibling) &&
    !n.nextSibling.nextSibling;
}

function skipNode(sNode){
    return sNode && sNode.nodeName == "#text" && (/^[\s\n]*$/.test(sNode.textContent));
}

// 检测是否有下一页的纯数字链接，number:页数
function getNextLink(node, number, set){
    var tNode = getSiblingNode(node, 1);
    if (tNode && tNode.nodeName == "A" && isDigital(tNode.textContent)) {
        if (RegExp.$1 == number) {
            // 找到纯数字链接
            if (set) {
                tmp.push(tNode);
                next.found = true;
            }
            return tNode;
        }
    }
    return null;
}

function isDigital(str, t){
    str = str.replace(/^\s+|\s+$/g, "");
    if (t == -1) 
        str = str.split(/\s+/).pop();
    else 
        if (t == 1) 
            str = str.split(/\s+/)[0];
    return (/^(\d+)$/.test(str)) ||
    (/^\[(\d+)\]$/.test(str)) ||
    (/^\u3010(\d+)\u3011$/.test(str)) ||
    (/^\uff3b(\d+)\uff3d$/.test(str)) ||
    (/^<(\d+)>$/.test(str));
}

// 判断是否是当前页面的数字，type:-1,0,1 分别是要判别的上一个、当前、下一个节点
function isCurrentPageNumber(node, linkNum, type){
    var tNode = (type == 0 ? node : getSiblingNode(node, type));
    if (tNode &&
    (tNode.nodeName != "A" && isDigital(tNode.textContent, type) ||
    tNode.nodeName == "A" && !tNode.hasAttribute("onclick") &&
    (!tNode.href && isDigital(tNode.textContent, type) ||
    !(/\/#[^\/]+$/.test(tNode.href)) &&
    tNode.href == location.href &&
    isDigital(tNode.textContent, type)))) {
        if (RegExp.$1 == (linkNum + type)) {
            if (next.digital) 
                next.digital = null;
            return tNode;
        }
    }
    // 某些论坛处在第一页时，实际链接和当前页链接不符，只有和其余纯数字链接的结构或颜色不同时，
    // 才使用纯数字的“2”作为“下一页”的链接。
    else 
        if (type == 0 && !next.digital && tNode && tNode.nodeName == "A" &&
        (/^\s*[\[\u3010\uff3b]?1[\]\u3011\uff3d]?\s*$/.test(tNode.textContent))) {
            var two = getNextLink(tNode, 2);
            if (two && difDigital(tNode, two)) 
                next.digital = two;
        }
    return null;
}

function difDigital(node1, node2){
    if (getStructure(node1) == getStructure(node2) && getStyleColor(node1) == getStyleColor(node2)) 
        return false;
    return true;
}

function getStructure(aNode){
    return aNode.innerHTML.replace(/\d+/, "");
}

function getStyleColor(aNode){
    return document.defaultView.getComputedStyle(aNode, null).getPropertyValue("color");
}

// 获取距页面顶部最近的元素的top值
function getTopest(elements){
	var topest=10000, tmp;
	for (var i=0;i<elements.length;i++){
		tmp = getTop(elements[i]);
		topest = topest < tmp?topest:tmp;
	}
	return topest;
}

//获取元素相对页面顶部的纵坐标
function getTop(e){
    var offset = e.offsetTop;
    if (e.offsetParent != null) 
        offset += getTop(e.offsetParent);
    return offset;
}

function matchNode(xpath, root){
    var type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    var doc = root ? root.evaluate ? root : root.ownerDocument : document;
    return doc.evaluate(xpath, root || doc, null, type, null);
}   

/*
 ******************************************************************************************
 *  预取下一页
 ******************************************************************************************
 */

// 窗口高度
var innerHeight = window.innerHeight ? window.innerHeight : document.body.clientHeight;

function watch_scroll(){
	if (!prefetched) {
			if (!checked) {
				checkLinks();
				checked = true;
			}
			if (next.found) {
				var scrollTop = window.scrollY;
				//var scrollHeight = document.body.scrollHeight;
				var scrollHeight = getTopest(next.link);
				if (scrollHeight - innerHeight - scrollTop < innerHeight * leftpages) {
					// 如果剩余页面高度小于 leftpages * 窗口高度，则开始预取下一页
					prefetched = true;
					// 将预取情况显示在标题中。如不需要可注释掉下面一行。
					document.title += '  【已预取:' + next.link.join(' 和 ') + '】';
					for each (var link in next.link) {
						var prefetchIframe = document.createElement('iframe');
						prefetchIframe.setAttribute('style', 'display: none;');
						prefetchIframe.setAttribute('src', link.href);
						document.body.appendChild(prefetchIframe);
						try {
							// 用黄色框标记出已被预取的链接。如不需要可注释掉下面两行。
							link.style.border = 'solid 3px yellow';
							link.title += '  【此页面已被预取】 ';
						}
						catch (e) {
						}
					}
				}
			}
	}
}
    
window.addEventListener('load', watch_scroll, true);
window.addEventListener('scroll', watch_scroll, true);
