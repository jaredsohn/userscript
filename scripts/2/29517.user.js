// ==UserScript==
// @name           PimpMyiGoogle
// @namespace      http://www.google.com/ig
// @description    Change the custom iGoogle Themes
// @exclude        https://www.google.com/ig/*
// @exclude        http://www.google.com/ig/*
// @include        http://www.google.com/ig*
// @include        https://www.google.com/ig*
// ==/UserScript==

var firstTime = true;
var webkit =  navigator.userAgent.match("AppleWebKit");

function togPages() {
//toggle for sidebar 
	//unsafeWindow.console.log("toggle sidebar");
	var x = document.getElementsByTagName("table");
	//unsafeWindow.console.log("togPages Tables: " +x.length);
	x = x[x.length - 1];
	var t = x.getElementsByTagName("td")[0];
	t.style.display = (t.style.display == "none" ? "table-cell" : "none");
	//unsafeWindow.console.log("toggle sidebar");
	return false;
}


// DOM 2 Events
	var dispatchMouseEvent = function(target, var_args) {
	  var e = document.createEvent("MouseEvents");
	  // If you need clientX, clientY, etc., you can call
	  // initMouseEvent instead of initEvent
	  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
	  target.dispatchEvent(e);
	  };
function clickHandler (element){
 if (webkit){
	dispatchMouseEvent(element,'click', true, true);
} else{
	element.click();
}
}

function popup_handler(elm) {
    //webkit version
	return function () {
//		document.getElementById(elm.rel).click();
		clickHandler(document.getElementById(elm.rel));
		if (firstTime == true){
		//unsafeWindow.console.log("before Time out: "+document.getElementsByClassName('G-JO').length);
			 var firstTimeMinMax = function()
			{
					document.getElementsByClassName('G-JO')[0].style.visibility='hidden';
					if(document.getElementById("gdd_minimize")!== null){
						if(document.getElementById("gdd_minimize").style.display=="none"){	
					//		dispatchMouseEvent(document.getElementById("gdd_expand"), 'click', true, true);
							//document.getElementById("gdd_expand").click();
							clickHandler(document.getElementById("gdd_expand"));
						} else{
							//dispatchMouseEvent(document.getElementById("gdd_minimize"), 'click', true, true);
							//document.getElementById("gdd_minimize").click();
							clickHandler(document.getElementById("gdd_minimize"));
						}
					}
			}
			var time = setTimeout(firstTimeMinMax,400);
			firstTime = false;
		}
		if(document.getElementById("gdd_minimize")!== null){
			if(document.getElementById("gdd_minimize").style.display=="none"){	
					//		dispatchMouseEvent(document.getElementById("gdd_expand"), 'click', true, true);
							//document.getElementById("gdd_expand").click();
							clickHandler(document.getElementById("gdd_expand"));
			} else{
							//dispatchMouseEvent(document.getElementById("gdd_minimize"), 'click', true, true);
							//document.getElementById("gdd_minimize").click();
							clickHandler(document.getElementById("gdd_minimize"));
			}
		}
	return false;	
    };
}

	
function letsPimpMinMax(){
	var modules = document.getElementsByClassName("kdIconBox");
	unsafeWindow.console.log("modules: " +modules.length);
	var len = modules.length;
	var q = 0;
	for (q; q<len;q++){
	var elm = modules[q].getElementsByClassName("kdDdIcon")[0];
	//unsafeWindow.console.log("elm-ID: " +elm.id);
		   if (elm.id.match("home_dd[0-9]+") ){
		unsafeWindow.console.log("elm-ID: " +elm.id);
		var mx = document.createElement('a');
				mx.href="#";
				mx.className = "spanishgringoPimpBox";
				mx.rel=elm.id.match(/home_dd[0-9]+/g);
				elm.parentNode.appendChild(mx);
				mx.addEventListener ( 'click', popup_handler(mx), true,true);
			}
		}
}
	
 var seedMods = 0;
// Check if modules are loaded
 function modules_wait() {
	//unsafeWindow.console.log("modules_wait called");
        if (typeof  (document.getElementsByClassName('G-IQ')[0]) == 'undefined' && seedMods <=5) {
            seedMods=seedMods+1;
			window.setTimeout(modules_wait, 210);
        } else {
		seedMods=null;
            letsPimpMinMax();
        }
    }
	
 function letsPimpIGoogle(){
	//unsafeWindow.console.log("letsPimpIGoogle called");
if(document.getElementsByClassName("signIn").length>0){ return false;}
	  var st = document.createElement('style');
	  //unsafeWindow.console.log("check for .kdAppName: " + document.getElementsByClassName("kdAppName").length);
	  
	  if(false){
	  st.innerHTML = ".toggleSidebar{ 	display: inline-block; width: 158px; height: 20px; padding: 4px  0 0 0 ; margin: 0 auto;	background: #3b6493; /* old browsers */	background: -moz-linear-gradient(top, #88A5C9 0%, #3b6493 100%); /* firefox */	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#88A5C9), color-stop(100%,#3b6493)); /* webkit */	box-shadow: inset 0px 0px 4px #fff;	-webkit-box-shadow: inset 0px 0px 4px #fff;	border: 1px solid #4A7BB2;	border-radius: 5px; 	font: bold 1em Helvetica, Segoe UI, Sans-Serif; text-align: center;  text-decoration: none; 	color: #FCF7E3;	text-shadow: 0px 1px 2px #b4d1ad; z-index:999;position:absolute;} 	.spanishgringoPimpBox {	  background-image:url('http://g0.gstatic.com/ig/images/v2/sprite0_000000.gif'); position:absolute;  display:block;  width:24px;  height:12px; 	right:46px; 	top:6px; 		background-position:-130px 0px;  }";
	  }else {
	    st.innerHTML = " .spanishgringoPimpBox {	  background-image:url('http://g0.gstatic.com/ig/images/v2/sprite0_000000.gif'); position:absolute;  display:block;  width:24px;  height:12px; 	right:72px; 	top:6px; 		background-position:-130px 0px;  } .kdAppBar { padding: 0px 0 2px;    position: absolute; top: -46px; right:10px;  width: 504px; z-index: 1;} .gsealog{padding: 0 0 0 44px;} .kdAppName {    margin-left: 0;    margin-right: 0;    width: 120px;} #q {max-width:380px;}";
	  }
	  document.getElementsByTagName("body")[0].appendChild(st);
	//main page styling
	document.getElementsByTagName('body')[0].style.fontFamily = 'Segoe UI, helvetica, sans-serif';
	document.getElementsByClassName('footerwrap ')[0].style.display = 'none';
	document.getElementById('nhdrwrapsizer').style.height ='60px';
			 var sty = document.createElement('style');
			 sty.innerHTML = "#gsea{margin-top ='-19px'; padding:0 0 5px;}";
				 document.getElementById('gb').appendChild(sty);
	
//better tool strip up top
var li = document.createElement("li");
li.className="gbt";
var analy = document.createElement("a");
analy.className = "gbzt";
analy.innerHTML = '<span class="gbtb2"></span><span class="gbts">Analyitcs</span>';
analy.href = "http://www.google.com/analytics";
li.appendChild(analy);
var div = document.getElementById('gbz');
div.getElementsByTagName("ol")[0].appendChild(li);
li = document.createElement("li");
li.className="gbt";
var read = document.createElement("a");
read.className = "gbzt";
read.innerHTML = '<span class="gbtb2"></span><span class="gbts">Reader</span>';
read.href = "http://www.google.com/reader/view/?hl=en&amp;tab=wy";
li.appendChild(read);
div.getElementsByTagName("ol")[0].appendChild(li);

//add min max boxes again to modules
modules_wait();

	  // toggle button for old users
		  if (document.getElementsByClassName("toggleLeftNavButton").length<1 && document.getElementsByClassName("gbgs4").length<0){
		  var d  = document.createElement('div');
		  d.style.position="absolute";d.style.top="60px"; d.style.left="2px";
		  var a = document.createElement('a');
		  a.href="#";
		  a.className="toggleSidebar";
		  a.innerHTML="Show / Hide Sidebar";
		  a.addEventListener ( 'click', togPages, true);
		  d.appendChild(a);
		  document.getElementById('gsea').appendChild(d);

			var x = document.getElementsByTagName("table");
			x = x[x.length-1];
			var t = x.getElementsByTagName("td")[0];
			t.style.display='none';		
		}

	}
	
// Check if sidebar is loaded
 var seed = 0;
    function iG_wait() {
	//unsafeWindow.console.log("igWait called");
        if (typeof  (document.getElementsByClassName('G-KS')[0]) == 'undefined' && seed <=5) {
            seed=seed+1;
			window.setTimeout(iG_wait, 210);
//			unsafeWindow.console.log("waiting: " + seed);
        } else {
		seed=null;
		letsPimpIGoogle();
        }
    }
//unsafeWindow.console.log("igWait going to be called");

 iG_wait();
