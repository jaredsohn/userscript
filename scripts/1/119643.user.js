// ==UserScript==
// @name        Google Real Side Preview
// @namespace   http://compmulti.com/script
// @description Google Real Side Preview
// @homepage    http://compmulti.com/script
// @version     0.1

// @include     http://www.google.co.jp*
// @include     http://www.google.com*
// @include     https://www.google.co.jp*
// @include     https://www.google.com*
// ==/UserScript==
//
// ( The MIT License )
//

var width = 1024;
/*Frame size*/
var height = 768;
/*Frame size*/
var interval = 100;
/*Google instance loading interval*/
var topX = 5;
/*topX*/
var chara = "◆";
/*Switch character*/
var num = 0;
/*Preload*/
var hide2 = "on";
/*hide menu*/
var disp = "right";
var linkpos = disp=="right"?1:0;
function scrollLeftNav() {
    var s=document.getElementById('fold_leftnav').style;
    var y=window.scrollY;
    if(y<93){s.top=(95-y)+'px'}else{s.top='2px'}
}
document.body.setAttribute('onScroll','('+scrollLeftNav+')()');
function removeLeftNav(){
	if(document.getElementById("leftnav").style.position=="relative")
		return;
        function toggleLeftNav(state) {
          if (state==true || leftnav.style.display!='none') {
              leftnav.style.display = "none";
              center_col.style.marginLeft = "0px";
              foot.style.marginLeft = "auto";
              fold_button.innerHTML = '<b>&raquo;</b>';
              var windowWid= document.documentElement.clientWidth-570;
              var resultsx = document.body.getElementsByClassName("g");
              for (var i = 0, len = resultsx.length; i < len; i++){
            	  try{
            		  var f = document.getElementById("mydiv" + i);
            		  f.width =windowWid;
            		  }catch (e) {}
              }
          } else {
              leftnav.style.display = "inline";
              center_col.style.marginLeft = "200px";
              foot.style.marginLeft = "200px";
              fold_button.innerHTML = '<b>&laquo;</b>';
              var windowWid= document.documentElement.clientWidth-768;
              var resultsx = document.body.getElementsByClassName("g");
              for (var i = 0, len = resultsx.length; i < len; i++){
            	  try{
            		  var f = document.getElementById("mydiv" + i);
            		  f.width =windowWid;
            		  }catch (e) {}
              }
          }
        }

        // search leftnav element
	var leftnav = document.getElementById("leftnav");
        if (!leftnav) return;

        var center_col = document.getElementById("center_col");
        var foot = document.getElementById("foot")

        with (leftnav.style) {
// default: padding-top: 3px; padding-left: 4px; position: absolute; top: 0pt; width: 151px;
	 display = 'none';
         position = 'relative';
         //marginTop = '0px';
         //marginLeft = '0px';

        }
        with (center_col.style) {
          marginRight = "0px";
        }
        with (foot.style) {
	  marginRight = "auto";
          maxWidth = "60%";
        }

        // add fold button
        var fold_button = document.createElement('span');
        //var fold_button = document.createElement('button');
        fold_button.innerHTML = '<b>&raquo;</b>;';
        with (fold_button.style) {
        cursor = "pointer";
          padding = '4px 3px';
          border = 'solid 2px #a8b6fd';
          userSelect = 'none';
		  border ='1px solid #999';
		  background ='#F4F3FE';
		  borderColor ='#C7D6F7';
		  borderStyle ='solid';
		  borderWidth ='1px 1px 1px 1px';
		  borderBottomRightRadius ='5px 5px';
		  borderTopRightRadius ='5px 5px';
		  borderBottomLeftRadius ='5px 5px';
		  borderTopLeftRadius ='5px 5px';
  	    height= "100px";
  	    width= "32px";
        }
        fold_button.setAttribute('id','fold_button');
        fold_button.setAttribute('onMouseDown','return false');
        fold_button.addEventListener('click',toggleLeftNav,false);

        var fold_leftnav = document.createElement('span');
        leftnav.parentNode.appendChild(fold_leftnav);
        with (fold_leftnav.style) {
	  paddingTop = '3px';
          if (false) { // ページの上部に表示
            position = 'absolute';
            top = '-22px';
          } else { // 浮かせる
            position = 'fixed';
            zIndex = 1024;
        }
        }
        fold_leftnav.setAttribute('id','fold_leftnav');
        fold_leftnav.appendChild(fold_button);
        fold_leftnav.appendChild(leftnav);

	toggleLeftNav(true);

}


var appVersion = window.navigator.appVersion.toLowerCase();

function getElementsByClass(searchClass) {
	if(document.all) {
		var classElements = new Array();
		var allElements = document.all;
		for( i = 0, j = 0; i < allElements.length; i++) {
			if(allElements[i].className == searchClass) {
				classElements[j] = allElements[i];
				j++;
			}
		}
	} else if(document.getElementsByTagName) {
		var classElements = new Array();
		var allElements = document.getElementsByTagName("*");
		for( i = 0, j = 0; i < allElements.length; i++) {
			if(allElements[i].className == searchClass) {
				classElements[j] = allElements[i];
				j++;
			}
		}
	} else {
		return;
	}

	return classElements;
}

(function() {
	setInterval(function() {

		var checkf = document.getElementById("tabLoad");
		if(!checkf) {
			var tabLoad = document.createElement("div");
			tabLoad.id = "tabLoad";
			tabLoad.setAttribute('style', 'display: none;');
			tabLoad.innerHTML ="0";
			document.getElementsByTagName("body")[0].appendChild(tabLoad);
		} else {
			if(checkf.innerHTML == "top") {
				var resultsx = document.body.getElementsByClassName("g");
				for(var i = 0, len = topX; i < len; i++) {
					GM_openInTab(resultsx[i].getElementsByTagName("a")[Math.abs(linkpos-1)].href);
				}
				checkf.innerHTML ="";
			} else if(checkf.innerHTML == "all") {
				var resultsx = document.body.getElementsByClassName("g");
				for(var i = 0, len = resultsx.length; i < len; i++) {
					GM_openInTab(resultsx[i].getElementsByTagName("a")[Math.abs(linkpos-1)].href);
				}
				checkf.innerHTML ="";
			}
		}

		// var fr = document.getElementById("iframe0");
	if(document.body.getElementsByClassName("g")[0].getElementsByTagName("a")[linkpos].innerHTML==chara) {
				var auto = document.getElementById("autochange");
			if(parseInt(auto.innerHTML)==document.body.getElementsByClassName("g").length){
				return;
			}
	}
document.body.setAttribute('onresize','(function (){try{var windowHei = document.documentElement.clientHeight - 30;windowWid = document.getElementById("leftnav").style.display != "none" ? document.documentElement.clientWidth - 768 : document.documentElement.clientWidth - 570;var resultsx = document.body.getElementsByClassName("g");for (var i = 0, len = resultsx.length; i < len; i++){try{var f = document.getElementById("mydiv" + i);if (document.getElementById("sizeButton" + i).innerHTML != "□") {f.width = document.documentElement.clientWidth;f.height = document.documentElement.clientHeight;}else{f.width = windowWid;f.height = windowHei;}}catch (e) {}}}catch (e) {}})()');
		if(hide2=="on")
			removeLeftNav();

		document.getElementById("appbar").setAttribute('style', 'height:80px;');

		var rso = document.getElementById("rso");
		rso.setAttribute('style', 'width:540px;');
		var results = document.body.getElementsByClassName("g");

		var autochange = document.getElementById("autochange");
		if(!autochange){
			var autochange = document.createElement("div");
			autochange.id = "autochange";
			autochange.setAttribute('style', 'display: none;');
			document.body.appendChild(autochange);
		}

		autochange.innerHTML= results.length;


		for(var i = 0, len = results.length; i < len; i++) {
			var result = results[i];
			var link = result.getElementsByTagName("a")[0];
			if(link) {
				try {
					var div = result.getElementsByTagName("div")[0];
					div.removeChild(((appVersion.indexOf("msie") == -1 )?div.getElementsByClassName("vspib"):getElementsByClass("vspib"))[0]);
					var nrgt = (appVersion.indexOf("msie") == -1 ) ? result.getElementsByClassName("nrgt") : getElementsByClass("nrgt");
					if(nrgt.length > 0)
						((appVersion.indexOf("msie") == -1 )?result.getElementsByClassName("nrgt"):getElementsByClass("nrgt"))[0].setAttribute('style', 'width:528px;');
					// var divframe = document.createElement("div");
					// divframe.id = "iframe" + i;
					// divframe.style.display = "none";
					// var ele = document.createElement("iframe");
					// ele.id = "mydiv" + i;
					// if(i < num) {
						// ele.src = link.href;
					// }
					// ele.width = width;
					// ele.height = height;
					// divframe.appendChild(ele);
					var h3 = result.getElementsByTagName("h3")[0];
					h3.id = "myh3" + i;
					var inner = h3.innerHTML;
					h3.innerHTML = "";
					var a = document.createElement("a");
					a.href = "javascript:void(0)";
					var funct = 'var d = document.getElementById("mydiv' + i + '");if (!d){var num = parseInt(document.getElementById("tabLoad").innerHTML);var divframe = document.createElement("div");divframe.id = "iframe' + i + '";var closeButton = document.createElement("div");closeButton.id = "closeButton' + i + '";document.getElementById("myh3' + i + '").appendChild(closeButton);closeButton.setAttribute("style", "border :1px solid #999;background :#F4F3FE;border-color :#C7D6F7;border-style :solid;borderwidth :1px 1px 1px 1px;cursor:pointer;text-align:center;width:15px;position:absolute;;z-index:" + (1025 + num) + ";left:565px;top:" + ((document.body.scrollTop || document.documentElement.scrollTop) - closeButton.offsetParent.offsetTop + (-180)) + "px;");closeButton.innerHTML = "x";closeButton.setAttribute("onclick", \'document.getElementById("iframe' + i + '").style.display = "none";document.getElementById("closeButton' + i + '").style.display = "none";document.getElementById("sizeButton' + i + '").style.display = "none";\');var sizeButton = document.createElement("div");sizeButton.id = "sizeButton' + i + '";document.getElementById("myh3' + i + '").appendChild(sizeButton);sizeButton.setAttribute("style", "border :1px solid #999;background :#F4F3FE;border-color :#C7D6F7;border-style :solid;borderwidth :1px 1px 1px 1px;cursor:pointer;text-align:center;width:15px;position:absolute;z-index:" + (1025 + num) + ";left:550px;top:" + ((document.body.scrollTop || document.documentElement.scrollTop) - sizeButton.offsetParent.offsetTop + (-180)) + "px;");sizeButton.innerHTML = "□";sizeButton.setAttribute("onclick", \'var my = document.getElementById("sizeButton' + i + '");var close = document.getElementById("closeButton' + i + '");var divframe = document.getElementById("iframe' + i + '");var mydiv = document.getElementById("mydiv' + i + '");if (my.innerHTML == "□"){mydiv.width = document.documentElement.clientWidth;mydiv.height = document.documentElement.clientHeight;divframe.style.top = ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop -200) + "px";divframe.style.left = ((document.body.scrollLeft || document.documentElement.scrollLeft) - divframe.offsetParent.offsetLeft) + "px";close.style.top = ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop -200) + "px";close.style.left = ((document.body.scrollLeft || document.documentElement.scrollLeft) - divframe.offsetParent.offsetLeft+15) + "px";my.style.top = ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop -200) + "px";my.style.left = ((document.body.scrollLeft || document.documentElement.scrollLeft) - divframe.offsetParent.offsetLeft) + "px";my.innerHTML = "■"}else{mydiv.width = document.getElementById("leftnav").style.display != "none" ? document.documentElement.clientWidth - 768 : document.documentElement.clientWidth - 570;mydiv.height = document.documentElement.clientHeight - 30;divframe.style.top = ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop -180) + "px";divframe.style.left = "550px";close.style.top = ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop -180) + "px";close.style.left = "565px";my.style.top = ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop -180) + "px";my.style.left = "550px";my.innerHTML = "□"}\');var ele = document.createElement("iframe");ele.id = "mydiv' + i + '";ele.width = document.getElementById("leftnav").style.display != "none" ? document.documentElement.clientWidth - 768 : document.documentElement.clientWidth - 570;ele.height = document.documentElement.clientHeight - 30;divframe.appendChild(ele);document.getElementById("myh3' + i + '").appendChild(divframe);document.getElementById("tabLoad").innerHTML = num + 2;divframe.setAttribute("style", "position: absolute;display:none;background-color:white;z-index:" + (1024 + num) + ";left:550px;top:" + ((document.body.scrollTop || document.documentElement.scrollTop) - divframe.offsetParent.offsetTop + (-180)) + "px;");d = ele;}if (!d.src) {d.src = "' + link.href + '";};var f = document.getElementById("iframe' + i + '");if(f.style.display == "none"){f.style.display = "block" ;document.getElementById("closeButton' + i + '").style.display = "block" ;document.getElementById("sizeButton' + i + '").style.display = "block" ;}else{f.style.display = "none";document.getElementById("closeButton' + i + '").style.display = "none";document.getElementById("sizeButton' + i + '").style.display = "none";}';
					a.setAttribute('onclick', funct);
					a.setAttribute('style', 'text-decoration: none;');
					var str = document.createTextNode(chara);

					a.appendChild(str);
					h3.appendChild(a);
					if(disp=="right")
						h3.innerHTML = inner +h3.innerHTML;
					else if(disp=="left")
						h3.innerHTML = h3.innerHTML + inner;
					if(appVersion.indexOf("msie") == -1)
						h3.appendChild(divframe);
					else
						result.appendChild(divframe);

				} catch (e) {
					rso.filtered = false;
				}
			}
		}
			var sear = document.getElementById("resultStats");
		if(sear.innerHTML.indexOf("All") == -1) {
			var top3 = document.createElement("a");
			top3.href = "javascript:void(0)";
			top3.setAttribute('onclick', 'var resultsx = document.body.getElementsByClassName("g");for(var i = 0, len = ' + topX + '; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d){var divframe = document.createElement("div");divframe.id = "iframe" + i;var ele = document.createElement("iframe");ele.id = "mydiv" + i;ele.width = ' + width + ';ele.height = ' + height + ';divframe.appendChild(ele);divframe.setAttribute("style", "display:none;"); d =ele;document.getElementById("myh3" + i).appendChild(divframe)};if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[Math.abs('+linkpos+'-1)].href;}var f = document.getElementById("iframe" + i);f.style.display=="none"?f.style.display = "block":f.style.display = "none";}catch(e){}}');
			top3.setAttribute('style', 'text-decoration: none;');
			var strcx = document.createTextNode("Top" + topX + " Open/Close");
			top3.appendChild(strcx);
			sear.innerHTML = sear.innerHTML + "<br>";
			sear.appendChild(top3);

			// var top32 = document.createElement("a");
			// top32.href = "javascript:void(0)";
			// top32.setAttribute('onclick', 'var resultsx = document.getElementById("rso").getElementsByTagName("li");for(var i = 0, len = ' + topX + '; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[Math.abs('+linkpos+'-1)].href;}}catch(e){}}');
			// top32.setAttribute('style', 'text-decoration: none;');
			// var strc2x = document.createTextNode("Top" + topX + " Load");
			// top32.appendChild(strc2x);
			// sear.innerHTML = sear.innerHTML + "<br>";
			// sear.appendChild(top32);
			// sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			// sear.appendChild(top3);

			var all = document.createElement("a");
			all.href = "javascript:void(0)";
			all.setAttribute('onclick', 'var resultsx = document.body.getElementsByClassName("g");for(var i = 0, len = resultsx.length; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d){var divframe = document.createElement("div");divframe.id = "iframe" + i;var ele = document.createElement("iframe");ele.id = "mydiv" + i;ele.width = ' + width + ';ele.height = ' + height + ';divframe.appendChild(ele);divframe.setAttribute("style", "display:none;"); d =ele;document.getElementById("myh3" + i).appendChild(divframe)};if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[Math.abs('+linkpos+'-1)].href;}var f = document.getElementById("iframe" + i);f.style.display=="none"?f.style.display = "block":f.style.display = "none";}catch(e){}}');
			all.setAttribute('style', 'text-decoration: none;');
			var strc = document.createTextNode("All Open/Close");
			all.appendChild(strc);
			sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			sear.appendChild(all);

			// var all2 = document.createElement("a");
			// all2.href = "javascript:void(0)";
			// all2.setAttribute('onclick', 'var resultsx = document.getElementById("rso").getElementsByTagName("li");for(var i = 0, len = resultsx.length; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[Math.abs('+linkpos+'-1)].href;}}catch(e){}}');
			// all2.setAttribute('style', 'text-decoration: none;');
			// var strc2 = document.createTextNode("All Load");
			// all2.appendChild(strc2);
			// sear.innerHTML = sear.innerHTML + "<br>";
			// sear.appendChild(all2);
			// sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			// sear.appendChild(all);

			var tab = document.createElement("a");
			tab.href = "javascript:void(0)";
			tab.setAttribute('onclick', 'var checkf = document.getElementById("tabLoad");checkf.innerHTML ="top";');
			tab.setAttribute('style', 'text-decoration: none;');
			var strc = document.createTextNode("Top"+topX+" Tab");
			tab.appendChild(strc);
			sear.innerHTML = sear.innerHTML + "<br>";
			sear.appendChild(tab);

			var tab2 = document.createElement("a");
			tab2.href = "javascript:void(0)";
			tab2.setAttribute('onclick', 'var checkf = document.getElementById("tabLoad");checkf.innerHTML ="all";');
			tab2.setAttribute('style', 'text-decoration: none;');
			var strc = document.createTextNode("All Tab");
			tab2.appendChild(strc);
			sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			sear.appendChild(tab2);

		}
	}, interval);
})();