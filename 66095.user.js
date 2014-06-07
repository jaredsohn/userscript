// ==UserScript==
// @name           Firefox.net.cn 数楼器
// @namespace      http://userscripts.org/users/86496
// @description    结束 www.firefox.net.cn 有楼没楼数的历史！
// @include        http://www.firefox.net.cn/forum/viewtopic.php?*
// ==/UserScript==

(function (){
var a = 0;
//var a_floor = 0;
//var a_vote = 0;
var q = document.location.search;
var qspairs = q.split('&');
	for (k = 0; k < qspairs.length; k++) {
		qvar = qspairs[k].split('=');
		if (qvar[0] == "start") {
			pre_count = Number(qvar[1]);
			break;
		} else {
			pre_count = 0;
		}
	}

AddCount(a);
window.addEventListener('AutoPagerize_DOMNodeInserted', function(){/*a++;*/AddCount(a);} ,false);
// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = creaElemIn('style', headID);
cssNode.type = 'text/css';
cssNode.innerHTML = '.back2top{width:auto!important;}.fffl{display: inline-block;}';
	
function AddCount(APpage){
	var postDiv = document.evaluate('//div[@id="page-body"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//var postDiv = document.evaluate('//div[@id="page-body"][' + (1+APpage) + ']/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var rowsCount = 0, rows = [];
	for (h=0; h<postDiv.snapshotLength; h++) {
		if (postDiv.snapshotItem(h).className.indexOf("post") != -1) {
			rows.push(postDiv.snapshotItem(h));console.log(h,postDiv.snapshotItem(h).id);
			rowsCount++;
		}
	}
	//if(document.evaluate('/html/body/div/table[4]/tbody/tr[2]/td/form', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength == 1) a_vote=1;
	var floorcount = (rowsCount/* - a_vote*/) ;
	//if (APpage==0) a_floor = floorcount;
	
	for (i=0; i<floorcount; i++){
		tdsp = getElementsByClassName("back2top", "div", rows[i])[0];
		var fl = document.getElementById('fffl' + i + 1);
		if(!fl) {
			fl = creaElemIn('div', tdsp);
			fl.id = 'fffl' + i + 1;
			fl.className = 'fffl';
		}
		fl.innerHTML = (i + pre_count /*+ APpage*a_floor*/ + 1) + '&nbsp&nbsp';
		//addtext(tdsp, i + pre_count + APpage*a_floor + 1);
	}
}

    function addtext(obj, text) {
        var content = document.createTextNode(text);
        obj.appendChild(content);
    }
	
	function addtextbefore(obj, text) {
        var content = document.createTextNode(text);
        obj.parentNode.insertBefore(content,obj);
    }

	function creaElemIn(tagname, destin) {
		var theElem = destin.appendChild(document.createElement(tagname));
		return theElem;
	}
	
	/** Get elements by className
	* @function getElementsByClassName
	* @param string className
	* @param optional string tag restrict to specified tag
	* @param optional node restrict to childNodes of specified node
	* @return Array of nodes
	* @author Jonathan Snook, http://www.snook.ca/jonathan
	* @author Robert Nyman, http://www.robertnyman.com
	*/
	function getElementsByClassName(className, tag, elm) {
		var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var tag = tag || "*";
		var elm = elm || document;
		var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var returnElements = [];
		var current;
		var length = elements.length;
		for(var i=0; i<length; i++){
			current = elements[i];
			if(testClass.test(current.className)){
			returnElements.push(current);
			}
		}
		return returnElements;
	}

})();