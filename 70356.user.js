// ==UserScript==
// @name kkkmh manga image preloader
// @description  kkkmh preload only one image,the script make it preload 5 image, the number of preload images can be changed by seeting variable pre_num
// @author        Shion
// @version       0.0.1
// @date          2010-03-03
// @include       http://www.kkkmh.com/manhua/*

// ==/UserScript==




var pre_num = 5;
function contentEval(pre_num,source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
	
    source = '(' + source + ')('+pre_num+');'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(pre_num,function(pre_num){

	var current_pic_server = "";
if (0 < pic_server_num) {

    var s_c = Cookie.read("pic_server");
    if (null === s_c || "undefined" == typeof(pic_server[s_c])) {
        s_c = 0;
    }
    current_pic_server = pic_server[s_c].url;
    var pic_server_list = "";
    for (var i = pic_server_num - 1; i >= 0; i--) {
        if (i == s_c) {
            pic_server_list += "<span>" + pic_server[i].name + "</span>";
        } else {
            pic_server_list += '<a href="javascript:void(0);" onclick="switchServer(' + i + ');return false;" title="切换到' + pic_server[i].name + '服务器观看">' + pic_server[i].name + "</a>";
        }
    }
    $("pic-server-list").innerHTML = pic_server_list;
}

function switchServer(a) {
    current_pic_server = pic_server[a].url;
    Cookie.write("pic_server", a, {
        path: "/",
        duration: 365
    });
    s_c = a;
    window.location.reload();
}
var pic_num = pic.length;
var url_info = window.location.href.split("?p=");
var current_page = Number(url_info[1]);
if ("undefined" == typeof(current_page) || false == /[1-9]{1}\d*/.test(current_page)) {
    current_page = 1;
}
function loadPic(b) {
    if (b > pic_num) {
        pageJump(1);
        return false;
    }
    var a = b - 1;
    if (0 > a) {
        a = 0;
    }
    if (pic_num <= a) {
        a = pic_num;
        current_page = a;
    } else {
        current_page = a + 1;
    }
    $("c_page_num").innerHTML = current_page;
    $("select_menu").options[current_page - 1].selected = true;
    if (0 == a) {
        $("previous").disabled = true;
    } else {
        $("previous").disabled = false;
    }
    if (pic_num - 1 <= a) {
        $("next").disabled = true;
    } else {
        $("next").disabled = false;
    }
    $("pic-show-area").src = current_pic_server + hex2bin(pic[a]);
    $("chapter-func-append").innerHTML = $("chapter-func").innerHTML;
    if (undefined != pic[a + 1]) {
        $("p_img").src = current_pic_server + hex2bin(pic[a + 1]);
		var root = $("p_img").getParent();
		
		for (var i =1;i <= pre_num;i++)
			if (undefined != pic[a + 1 + i]) {
				
				var pimg = new Element('img', {'src': current_pic_server + hex2bin(pic[a + 1 + i]) });
				
				pimg.inject(root);
			
			}
    }
}
loadPic(current_page);

function pageJump(a) {
    window.location.href = url_info[0] + "?p=" + a;
    return true;
}
function multipage(a) {
    switch (a) {
    case "previous":
        pageJump(current_page - 1);
        break;
    case "next":
        if (current_page + 1 <= pic_num) {
            pageJump(current_page + 1);
        }
        break;
    case "home":
        pageJump(1);
        break;
    case "last":
        pageJump(pic_num);
        break;
    }
    return true;
}
function hex2bin(e) {
    var b = 0,
        c = "";
    var d = e.length;
    for (b = 0; b < d; b += 2) {
        c += String.fromCharCode(parseInt(e.substr(b, 2), 16));
    }
    return c;
}
document.oncontextmenu = function (a) {
    return false;
};
$("pic-show-area").addEvent("mousedown", function (a) {
    if ("gecko" == Browser.Engine.name) {
        return;
    }
    this.setStyle("cursor", "move");
    var c = a.page.x;
    var b = a.page.y;
    this.addEvents({
        mousemove: function (h) {
            var g = h.page.x;
            var f = h.page.y;
            var d = document.documentElement.scrollLeft;
            var j = document.documentElement.scrollTop;
            d += c - g;
            j += b - f;
            window.scrollTo(d, j);
        },
        mouseup: function (d) {
            this.setStyle("cursor", "default");
            this.removeEvents("mousemove");
            this.removeEvents("mouseup");
        }
    });
});
       
	});