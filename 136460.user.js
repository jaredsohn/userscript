// ==UserScript==
// @name        hightlight links
// @namespace   jazzhuang
// @description hightlight the specific links
// @include     *
// @version     2.5
// ==/UserScript==
/*
 test url: http://www.taobao.com#http://love.taobao.com/?spm=1.1000386.0.5&taobao_from=1
 */

/*
 URLs以分号分隔
 注意：
 1. 传入的url是被去掉空格后， 在URLEncode过的， 已不再是页面上原始的内容
 2. element.href方法获取的值是被URLEncode过的
 3. 比较的策略是 a)去除所有空格及spm=xxx，见cleanup方法 b)URLDecode所有的URL c)如果前面比较都不通过，对decoded再取出空格进行比较
 */

window.hightLightLinks = function(allLinks) {
  console.log("hightlight url:" + allLinks);
  var sp = "split_urltext_log=";
  var errorLinkArr = allLinks.split(';;;'); // URLs以分号分隔
  var errorLogArr;
  for (var i = 0; i < errorLinkArr.length; i++) // loop the links to be marked
  {
    isHightlighted = false;
    console.log("hightlight_url" + i + "--" + errorLinkArr[i]);
    //给普通的满足href的a控件加高亮样式：字体变红、粗、图标
    errorLogArr = errorLinkArr[i].split(sp);
    try {
      errorLogLink = cleanup(errorLogArr[0]); // 首先取未decode的URL
      errorLogLink = cleanup(decodeURIComponent(errorLogArr[0])); // 当decode抛出异常，则decoded_url为原来的URL
    } catch (e) {
      showPrettyException(e);
      console.log("orig specific link:" + errorLogArr[0]);
      if (typeof errorLogLink != "undefined") {
        console.log("cleanuped:" + errorLogLink);
      } else {
        console.warn("无法decodeURI指定的链接, 直接取传入的URL")
        console.warn("cleanuped:" + errorLogLink);
        //console.error("errorLogLink is undefined, skip the process!!!");
        //console.error("errorLogArr[0]--" + errorLogArr[0]);
        //continue; // 跳过该链接处理
      }
    }

    var tables = document.getElementsByTagName("A");
    console.log("errorLogLink:" + errorLogLink);
    var isNeedFoundWithText = true; // 只有当link 和 图片链接一个链接都匹配不到时， 才使用文本查找
    console.log("total_links_size:" + tables.length);
    for (var j = 0; j < tables.length; j++) // loop the links in document
    {
      console.log("==show_orig_text_href==" + tables[j].href);
      try {
        decoded_url = cleanup(tables[j].href); // 首先取未decode的URL
        decoded_url = decodeURIComponent(decoded_url); // 当decode抛出异常，则decoded_url为原来的URL
      } catch (e) {
        showPrettyException(e);
        console.log("cleanuped:" + cleanup(tables[j].href));
        if (typeof decoded_url != "undefined") {
          console.warn("异常导致无法decodeURI。decoded_url:" + decoded_url);
        } else {
          console.error("decoded_url is undefined, skip the process!!!");
          console.error("tables[j].href--" + tables[j].href);
          continue; // 跳过该链接处理
        }
      }

      console.log("==show_text_decoded_url==" + decoded_url);
      if (decoded_url == errorLogLink || 
			decoded_url.replace(/\s/, "") == errorLogLink.replace(/\s/, "")) {	// 通过比较解码后的URL，如果无法相当，尝试去掉空格进行比较
        try {
          tables[j].style.color = 'red';
          tables[j].style.fontWeight = 'bold';
          tables[j].style.background = 'blue';
          var pnode = document.createElement("sup");
          var textnode = document.createTextNode("^" + i); // 创建文本标识， 如： "^0"
          pnode.appendChild(textnode);
          tables[j].insertBefore(pnode, null); // it needs two args in firefox
          isHightlighted = true;
        } catch (e) {
          showPrettyException(e);
        }

        isNeedFoundWithText = false;
        //break; // mark the first matched only
      }

    }

    //给子节点为img的满足href的a控件加边框：图片加红色边框	 
    var imglist = document.getElementsByTagName("img");
    for (var j = 0; j < imglist.length; j++) {
      console.log("==show_orig_img_parent_href==" + imglist[j].parentNode.href);
      try {
        decoded_url = cleanup(imglist[j].parentNode.href); // 首先取未decode的URL
        decoded_url = decodeURIComponent(cleanup(imglist[j].parentNode.href)); // 当decode抛出异常，则decoded_url为原来的URL
      } catch (e) {
        showPrettyException(e);
        console.log("orig img href:" + imglist[j].parentNode.href + "; \r\ncleanuped:" + cleanup(imglist[j].parentNode.href));
        if (typeof decoded_url != "undefined") {
          console.warn("异常导致无法decodeURI。decoded_url:" + decoded_url);
        } else {
          console.error("decoded_url is undefined, skip the process!!!");
          console.error("tables[j].href--" + tables[j].href);
          continue; // 跳过该链接处理
        }
      }

      console.log("==show_img_decoded_url==" + decoded_url);
      if (decoded_url == errorLogLink || 
			decoded_url.replace(/\s/, "") == errorLogLink.replace(/\s/, "")) {	// 通过比较解码后的URL，如果无法相当，尝试去掉空格进行比较
        imglist[j].style.border = '5px solid blue';
        imglist[j].style.display = 'block';
        isHightlighted = true;
        isNeedFoundWithText = false;
      }
    }

    // 如果文字链接、图片链接都没有找到，采用文字匹配查找并高亮
    if (isNeedFoundWithText && (typeof errorLogArr[1] != "undefined")) {
      for (var j = 0; j < tables.length; j++) // loop the links in document
      {
        target_text = "";
        if (typeof tables[j].innerText == "undefined") {
          if (typeof tables[j].innerHTML != "undefined") {
            match_arr = tables[j].innerHTML.match(/[^\^|\~]+/);
            if (match_arr) target_text = match_arr[0].trim(); // firefox使用 innerHTML
          }
        } else {
          match_arr = tables[j].innerText.match(/[^\^|\~]+/);
          if (match_arr) target_text = match_arr[0].trim(); // firefox使用 innerHTML
        }

        if (target_text != "" && target_text == errorLogArr[1].trim()) {
          try {
            tables[j].style.color = 'red';
            tables[j].style.fontWeight = 'bold';
            tables[j].style.background = 'blue';
            var pnode = document.createElement("sup");
            var textnode = document.createTextNode("~" + i); // 创建文本标识， 如： "~0"
            pnode.appendChild(textnode);
            tables[j].insertBefore(pnode, null); // it needs two args in firefox
            isHightlighted = true;
          } catch (e) {
            showPrettyException(e);
          }
        }
      }
    }

    if (!isHightlighted) {
	  console.error("无法高亮!" + "<br/>高亮链接:" + errorLinkArr[i] + "<br/>链接文本:" + errorLogArr[1] + "<br/>========================");
	  console.error("请尝试hover所有可展开的控件，再点击【高亮】按钮");
    }
  }
}

/*
 Clean up the string, as replace the spm=xxx with empty.
 */

window.cleanup = function(str) {
  if (str) {
    str = str.replace(/\s/, "");
    var re = /spm=\S*?\&/;

    if (re.test(str)) {
      str = str.replace(re, "");
    }
    else if (str.indexOf("&spm") > 0) {
      str = str.split("&spm")[0];
    }
    else if (str.indexOf("spm") > 0) {
      str = str.split("?")[0];
    }
  }
  return str;
}

/*
 Print Exception Message
 */

window.showPrettyException = function(e) {
  //Control.Drag.init(document.getElementById("toolbar"));
  console.log("name: " + e.name + "\r\nmessage: " + e.message + "\r\nlineNumber: " + e.lineNumber + "\r\nfileName: " + e.fileName + "\r\nstack: " + e.stack);
}

/*
 Console Logger
 */
var consoleInfo = document.createElement("div");
consoleInfo.setAttribute("id", "consoleID");
consoleInfo.setAttribute("style", "z-index:100000000; width:500px; border:solid 1px #ccc; position: absolute; top:5px; right:5px; word-wrap: break-word;");
consoleInfo.innerHTML = "<div id='s_info' style='overflow-y: scroll; padding: 5px;line-height:20px;background-color: #333;margin: 5px;height: 250px;color: green;'>==Console Output==</div><p id='toolbar' style='margin:0;padding:0 0 0 30px;cursor: move;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVUlEQVQ4jWNgwA/+QzFOwEhAM0G1uAzAZSs+C3EahNcLTKSaiM8AvDahAbhaJnQBUg1hJFMzHFAcBjCAK7QJisNcQHL8EquH9umA4qRMcWYiBAiGAQA8HxcBTzyTEgAAAABJRU5ErkJggg==) no-repeat 6px center'> <input type='button' onclick=if(this.value=='最小化'){document.getElementById('s_info').style.display='none';this.value='最大化';}else{document.getElementById('s_info').style.display='block';this.value='最小化';} value='最小化' /> <input type='button' onclick='hight_light()' value='高亮' /> <input type='button' onclick=document.getElementById('consoleID').style.display='none'; value='关闭' /></p>";


console.output = function (str, cl) {
  var o = document.getElementById("s_info");
  cl = cl || "green";
  o.innerHTML = "<p style=color:" + cl + ";margin:0;padding:0;>" + str + "</p>" + o.innerHTML;
}

console.error = function (str) {
  console.output(str, "red");
}

/*
 console.warn = function (str) {
 console.output(str, "yellow");
 }
 */

 /*
	Remove me when you debug
 */
 console.log = function (str) {} 
 
/*
 拖动控件
 */
window.Control = { 
	Drag : {
		o: null,
		z: 0,
		allControl: "",
		init: function(o, minX, maxX, minY, maxY) {
			o.onmousedown = this.start;
			o.onmouseover = this.over;
			o.onmouseout = this.out;
			o.minX = typeof minX != 'undefined' ? minX : null;
			o.maxX = typeof maxX != 'undefined' ? maxX : null;
			o.minY = typeof minY != 'undefined' ? minY : null;
			o.maxY = typeof maxY != 'undefined' ? maxY : null;
		},
		over: function(e) {
			//$(this).children(".set").show();
		},
		out: function(e) {
			//$(this).children(".set").hide();
		},
		start: function(e) {
			var o;
			e = Control.Drag.fixEvent(e);
			//Control.Drag.o = o = this;
			Control.Drag.o = o = this.parentNode;
			o.x = e.clientX - Control.Drag.o.offsetLeft;
			o.y = e.clientY - Control.Drag.o.offsetTop;
			document.onmousemove = Control.Drag.move;
			document.onmouseup = Control.Drag.end;
			//var z = $(o).css("z-index");
			//Control.Drag.z = z > Control.Drag.z ? z : Control.Drag.z;
			//$(o).css({ "opacity": 0.7, "z-index": Control.Drag.z++ });
			return false;
		},
		move: function(e) {
			e = Control.Drag.fixEvent(e);
			var oLeft, oTop, ex, ey, o = Control.Drag.o;
			ex = e.clientX - o.x;
			ey = e.clientY - o.y;
			if (o.minX != null) ex = Math.max(ex, o.minX);
			if (o.maxX != null) ex = Math.min(ex, o.maxX - o.offsetWidth);
			if (o.minY != null) ey = Math.max(ey, o.minY);
			if (o.maxY != null) ey = Math.min(ey, o.maxY - o.offsetHeight);
			o.style.left = ex + 'px';
			o.style.top = ey + 'px';
	
			//$(o).children(".content").text("Div { left: " + ex + "px, top: " + ey + "px } ");
			return false;
		},
		end: function(e) {
			e = Control.Drag.fixEvent(e);
			//$(Control.Drag.o).css({ "opacity": 1 });
			Control.Drag.o = document.onmousemove = document.onmouseup = null;
		},
		fixEvent: function(e) {
			if (!e) {
				e = window.event;
				e.target = e.srcElement;
				e.layerX = e.offsetX;
				e.layerY = e.offsetY;
			}
			return e;
		}
	}
}

/*
 Fire hight light
*/
window.hight_light = function() {
	if (document.location.hash) {
	  document.body.insertBefore(consoleInfo, null);
	  Control.Drag.init(document.getElementById("toolbar"));
	  var allLinks = document.location.hash.replace("#", "");
	  console.log("input hash:" + allLinks);
	  if (allLinks) {
		hightLightLinks(allLinks);
	  }
	}
}

// ===Portal===
/*
 Append this script, for invoking the functions defined with firefox and chrome compatible
*/
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

hight_light();