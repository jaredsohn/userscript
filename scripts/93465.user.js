// ==UserScript==
// @name           SFDC FloatUserNameInCalendar
// @namespace      http://twitter.com/mino0123
// @description    マルチユーザカレンダーで、ユーザの氏名をフロート表示させます。
// @include        https://*.salesforce.com/00U/c*
// ==/UserScript==

floatNameColumns();

/**
 * 名前セルをスクロール固定する。
 */
function floatNameColumns() {
	// 祖先要素のpositionがrelativeだと絶対座標指定ができないため、座標を保持し後で引く
	var bodyDiv = document.getElementsByClassName("bodyDiv")[0];
	
	[
		document.getElementsByClassName("nameCol"), 
		document.getElementsByClassName("cbCol")
	].forEach(function(cols) {
		var copyCols = Array.prototype.map.call(cols, function(elm) {
			var newCol = document.createElement("div");
            var copyStyles = getAsStringArray({
	            "background": "Color,Image,Position",
	            "padding": "Bottom,Left,Top.Right",
                "border": {
                    "Bottom": "Width,Style,Color",
                    "Left": "Width,Style,Color",
                    "Top": "Width,Style,Color",
                    "Right": "Width,Style,Color"
                }
            }, null).concat("width,height,textAlign,verticalAlign,fontWeight,whiteSpace".split(","));
			copyChildren(elm, newCol);
            copyStyle(elm, newCol, copyStyles);
            
            Array.prototype.forEach.call(newCol.childNodes, function(child) {
                if (child.nodeType === 1) {
                    child.style.position = "relative";
                    child.style.top = "50%";
                }
            });

            // ChromeだとcomputedStyleのheightではテキストの高さしか取れない。
            newCol.style.height = elm.clientHeight + "px";

			if (elm.getElementsByTagName("input")[0]) { // 召集チェックのスタイルをコピー
				copyStyle(elm.getElementsByTagName("input")[0], newCol.getElementsByTagName("input")[0], ["marginTop", "marginRight", "marginBottom", "marginLeft"]);
			}
			
			Array.prototype.forEach.call(elm.childNodes, function(e) {
				e.style && (e.style.visibility = "hidden");
				if (e.nodeType == 3 || e.tagName && e.tagName.toUpperCase() == "INPUT" && e.value != "") {
					elm.removeChild(e);
				}
			});
			
			document.getElementById("ids").appendChild(newCol);
			
			newCol.style.position = "fixed";
			return [newCol, elm];
		});
		
		var scrollFixSet = Array.prototype.map.call(copyCols, function(elms) {
			elms[0].style.left = getX(elms[1]) + "px";
			return {
				Y : getY(elms[1]),
				element : elms[0]
			}
		});
		
		window.addEventListener("scroll", onScroll, false);
		onScroll();
		
		
		function onScroll() {
			scrollFixSet.forEach(function(args) {
				var elm = args.element;
				elm.style.top = args.Y - window.scrollY + "px";
			});
		}
	});
}


function copyChildren(src, dest) {
	Array.prototype.forEach.call(src.childNodes, function(node){
		if (node.nodeType == 1 || node.nodeType == 3) {
			dest.appendChild(node.cloneNode(true));
		}
	});
}


function getX(elm) {
	var sum = 0;
	while (elm) {
		sum += elm.offsetLeft;
		elm = elm.offsetParent;
	}
	return sum;
}

function getY(elm) {
	var sum = 0;
	while (elm) {
		sum += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return sum;
}

function copyStyle(src, dest, copyStyles) {
	var srcStyle = getComputedStyle(src, null);
	var destStyle = dest.style;
	
	copyStyles.forEach(function(styleName) {
		destStyle[styleName] = srcStyle[styleName];
	});
}

function getAsStringArray(obj, prefix) {
	prefix = prefix || "";
	if (typeof obj === "string") {
		return obj.split(",").map(function (str){
			return prefix + str
		});
	} else {
		var array = [];
		for (var i in obj) {
			array = array.concat(getAsStringArray(obj[i], prefix + i));
		}
		return array;
	}
}