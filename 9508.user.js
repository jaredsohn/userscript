// ==UserScript==
// @name		  GoogleSearchAddThumbnail
// @namespace	  http://d.hatena.ne.jp/bluerabbit/
// @include		  http://www.google.co.jp/search*
// @description    Google Search Add Thumbnail
// @version        0.0.4
// ==/UserScript==
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

(function() {

// -- [Main] ----------------------------------------------------------------------

GM_addStyle(<><![CDATA[
	.j {
		float: right;
	}
]]></>);

function main() {
	var resultItems = $X("//li[@class='g']");
	for (var i = 0; i < resultItems.length; i++) {
		var item = resultItems[i];
		var a = $S('.//a[@class="l"]', item);
		var div_area = $S('.//div[@class="s"]', item);
  	if (div_area == null) {
  	  continue;
  	}
  	var span = $S('.//span[@class="gl"]', div_area);
  	var img = $S('.//a[@class="createImage"]', div_area);
    if (img != null) {
      continue;
    }
    span.insertBefore( createImage(a.href) , span.firstChild );
	}
}

function setTimerImgReloadEvent() {
  setTimeout(function () {
	  	//log('setTimerImgReloadEvent');
			var resultItems = $X("//li[@class='g']");
      for (var i =0; i < resultItems.length; i++) {
				var item = resultItems[i];
				var div_area = $S('.//div[@class="s"]', item);
		  	if (div_area == null) {
		  	  continue;
		    }
  	  	var span = $S('.//span[@class="gl"]', div_area);
  	  	var a_tag = $S('.//a[@class="createImage"]', span);
  	  	if (a_tag == null) {
  	  	  continue;
  	  	}
  	  	var img = a_tag.childNodes[0];
  	  	if (img == null) {
  	  	  continue;
  	  	}
  	  	var src = img.src;
  	  	img.src='';
  	  	img.src=src;
      }
			setTimerImgReloadEvent();
  }, 3000);
}




// for Auto Pager
function setAutoPagerEvent(){
	var scrollHeight = document.documentElement.scrollHeight;
	document.addEventListener(
		"scroll",
		function(e){
			if(document.documentElement.scrollHeight - scrollHeight > 100){
				scrollHeight = document.documentElement.scrollHeight;
				main();
			}
		},false);
}

// heartrails API
function createImage(url) {
//  var size = 'tiny';
//  var size = 'small';
  var size = 'medium';
//  var size = 'large';
//  var size = 'huge';
  
	var image = '<br/><a class="createImage"  href="' + url + '"><img title="image" src="http://capture.heartrails.com/' + size + '?' + url + '" alt="" /></a>';
	return stringToDom(image);
}
	
// -- [Templete] ----------------------------------------------------------------------

/*----------------------------------------------------------------------------
 * Option
 *--------------------------------------------------------------------------*/

// Firefox log
var DEBUG = true;

/*----------------------------------------------------------------------------
 * Function
 *--------------------------------------------------------------------------*/

// Firefox log api
function log() {
	if (!DEBUG) return;
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) 
};
function ok() { log('ok'); };


/** DOM shortcut method **/
function $(element) {
	if (typeof element == 'string') {
		return document.getElementById(element);
 		}
	return element; 
}

function $N (name, attr, childs) {
    var ret = document.createElement(name);
    for (k in attr) {
        if (!attr.hasOwnProperty(k)) continue;
        v = attr[k];
        if (k == "class") {
            ret.className = v;
        } else {
            ret.setAttribute(k, v);
        }
    }
	if (!childs.length) {
		childs = new Array(childs);
	}
    switch (typeof childs) {
        case "string": {
            ret.appendChild(document.createTextNode(childs));
            break;
        }
        case "object": {
            for (var i = 0, len = childs.length; i < len; i++) {
                var child = childs[i];
                if (typeof child == "string") {
                    ret.appendChild(document.createTextNode(child));
                } else {
                    ret.appendChild(child);
                }
            }
            break;
        }
    }
    return ret;
}

function $X (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        }
    }
    return null;
}
function $S(xpath, context) {
	context = context || document;
	return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function stringToDom(str) {
	var d = document.createElement('div');
	d.innerHTML = str;
	var docFrag = document.createDocumentFragment();
	while (d.firstChild) {
		docFrag.appendChild(d.firstChild);
	}
	return docFrag;
}
// add event
window.addEventListener('load', function(){main();setAutoPagerEvent();setTimerImgReloadEvent();}, false);

//unsafeWindow.$X = $X;
//unsafeWindow.$S = $S;
//unsafeWindow.log = log;

})();
