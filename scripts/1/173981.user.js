// ==UserScript==
// @name        Feedly停駐Menu
// @namespace   http://cloud.feedly.com/*
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @version     1
// ==/UserScript==
/*
var feedlyTabsHolderClass = "unpinned shown";

function showMenu() {
    var feedlyTabsHolder = document.getElementById("feedlyTabsHolder");
    try{
        //feedlyTabsHolder.style = "";
        feedlyTabsHolder.className = feedlyTabsHolderClass;
        window.addEventListener('resize', ClrFunc, false);
        window.addEventListener("click", ClrFunc, false);
        window.setTimeout(ClrFunc,333);
        var divs = document.getElementsByTagName("div");
        for(var i=0;i<divs.length;i++){
            divs[i].addEventListener("mouseout", ClrFunc, false);
            divs[i].addEventListener("mouseover", ClrFunc, false);
            divs[i].addEventListener("click", ClrFunc, false);
        }
    }catch(e){
        window.setTimeout(showMenu,333);
    }
}

function _showMenu() {
    var feedlyTabsHolder = document.getElementById("feedlyTabsHolder");
    try{
        feedlyTabsHolder.style = "";
        feedlyTabsHolder.className = "picturePicture";
        window.addEventListener('resize', ClrFunc, false);
        window.addEventListener("click", ClrFunc, false);
        window.setTimeout(ClrFunc,333);
        var divs = document.getElementsByTagName("div");
        for(var i=0;i<divs.length;i++){
            divs[i].addEventListener("mouseout", ClrFunc, false);
            divs[i].addEventListener("mouseover", ClrFunc, false);
            divs[i].addEventListener("click", ClrFunc, false);
        }
    }catch(e){
        window.setTimeout(showMenu,333);
    }
}

function ClrFunc(){
    var feedlyTabsHolder = document.getElementById("feedlyTabsHolder");
    var mybutUp = document.getElementById("mybutUp");
    var mybutDown = document.getElementById("mybutDown");
    var mainBar = document.getElementById("mainBar");
    if(feedlyTabsHolder.offsetLeft == 0){
        //feedlyTabsHolder.style = "";
        //feedlyTabsHolder.className = feedlyTabsHolderClass;
        mainBar.style.marginLeft = "250px";
        if(mybutUp!=null)
            mybutUp.style.left = (mainBar.offsetWidth-120)+"px";
        if(mybutDown!=null)
            mybutDown.style.left = (mainBar.offsetWidth-80)+"px"; 
    }else{
        if(mybutUp!=null)
            mybutUp.style.left = (mainBar.offsetWidth-30)+"px";
        if(mybutDown!=null)
            mybutDown.style.left = (mainBar.offsetWidth+10)+"px"; 
    }
}

//showMenu();
*/
function buildMyButton(){
    var feedlyFrame = document.getElementById("feedlyFrame");
    var mainBar = document.getElementById("mainBar");
    if(feedlyFrame==null || mainBar==null || mainBar.offsetWidth==0)
        window.setTimeout(buildMyButton,333);
    if(mainBar.offsetWidth!=0){
        var mybutUp = document.createElement("div");
        mybutUp.id = "mybutUp";
        mybutUp.innerHTML = "<span style='border-width:1px;border-style:solid;font-size:20px;cursor:pointer;background-color:lightgray;'>&nbsp;▲&nbsp;</span>";
        mybutUp.style.position="fixed";
        mybutUp.style.top = "18px";
        mybutUp.style.left = (mainBar.offsetWidth-130)+"px";
        mybutUp.style.zIndex = "1000000";
        mybutUp.onclick = function(){
            MovePage(-1);
        };
        document.body.appendChild(mybutUp);
        
        var mybutDown = document.createElement("div");
        mybutDown.id = "mybutDown";
        mybutDown.innerHTML = "<span style='border-width:1px;border-style:solid;font-size:20px;cursor:pointer;background-color:lightgray;'>&nbsp;▼&nbsp;</span>";
        mybutDown.style.position="fixed";
        mybutDown.style.top = "18px";
        mybutDown.style.left = (mainBar.offsetWidth-90)+"px";
        mybutDown.style.zIndex = "1000000";
        mybutDown.onclick = function(){
            MovePage(1);
        };
        document.body.appendChild(mybutDown);
		
		//讓title停止event傳遞
		var floatingBar = document.getElementById("floatingBar");
		if(floatingBar!=null){
			//document.body.removeChild(floatingBar);
			floatingBar.style.height = "0px";
			//floatingBar.parentNode.removeChild(floatingBar);
		}
		/*
		floatingBar.onclick = function(e){
			e.stopPropagation();
		};
		*/
    }
}

function MovePage(updown){
    var divs = new Array();
	//var floatingBar = document.getElementById("floatingBar");
	var floatingBar = document.getElementById("floatingBar");
	if(floatingBar!=null){
		floatingBar.style.height = "0px";
	}
	var magicHeight = 53;
    for(var i=0;i<10;i++){
        var tmpSection = document.getElementById("section"+i+"_column0");
        if(tmpSection != null){
            var childs = tmpSection.childNodes;
            for(var j=0;j<childs.length;j++){
				var tmpDiv = childs[j];
				if(tmpDiv.id!="undefined" && tmpDiv.id != null && tmpDiv.id.indexOf("bottomWikiWidget") <= 0){
					divs.push(tmpDiv);
				}
            }
        }else{
            break;
        }
    }

    var topNow = document.body.scrollTop;
	var tmpTop = 0;
    if(updown == 1){//scroll to down
        var movesuccess = false;
        var lastBottom = 0;
        for(var i=0;i<divs.length;i++){
            tmpTop = divs[i].offsetTop;
            if(tmpTop != "undefined" && tmpTop != null && tmpTop > 0){
                lastBottom = tmpTop + divs[i].clientHeight;
				if(divs[i].className.indexOf("selectedEntry") < 0){
					tmpTop = divs[i].offsetTop;
					if(tmpTop > topNow){
						tmpTop = tmpTop - magicHeight;
						document.body.scrollTop = tmpTop;
						movesuccess = true;
						break;
					}
				}
            }
        }
        if(!movesuccess){
            document.body.scrollTop = lastBottom;
        }
    }else{//scroll to up
        for(var i=divs.length-1;i>=0;i--){
            tmpTop = divs[i].offsetTop;
			if(tmpTop != "undefined" && tmpTop != null && tmpTop > 0 && divs[i].className.indexOf("selectedEntry") < 0){
				if(tmpTop < topNow){
					tmpTop = tmpTop - magicHeight;
					document.body.scrollTop = tmpTop;
					break;
				}
            }
        }
    }
}

function _MovePage(updown){
    var divs = new Array();
	//var floatingBar = document.getElementById("floatingBar");
	var floatingBar = document.getElementById("floatingBar");
	if(floatingBar!=null){
		//document.body.removeChild(floatingBar);
		floatingBar.style.height = "0px";
		//floatingBar.parentNode.removeChild(floatingBar);
	}
	//var magicHeight = floatingBar.offsetHeight;
	var magicHeight = 53;
    for(var i=0;i<10;i++){
        var tmpSection = document.getElementById("section"+i+"_column0");
        if(tmpSection != null){
            var childs = tmpSection.childNodes;
            for(var j=0;j<childs.length;j++){
				var tmpDiv = childs[j];
				if(tmpDiv.id!="undefined" && tmpDiv.id != null && tmpDiv.id.indexOf("bottomWikiWidget") <= 0){
					divs.push(tmpDiv);
				}
            }
        }else{
            break;
        }
    }

    var topNow = document.body.scrollTop;
	var tmpTop = 0;
    if(updown == 1){//scroll to down
        var movesuccess = false;
        var lastBottom = 0;
        for(var i=0;i<divs.length;i++){
            tmpTop = divs[i].offsetTop;
            if(tmpTop != "undefined" && tmpTop != null && tmpTop > 0){
                lastBottom = tmpTop + divs[i].clientHeight;
				if(divs[i].className.indexOf("selectedEntry") < 0){
				//alert(divs[i].offsetTop);
					tmpTop = tmpTop - magicHeight;
					if(tmpTop > topNow){
						if(document.getElementById("floatingBar").style.display == "none"){
							document.body.scrollTop = tmpTop - 53;
						}else{
							document.body.scrollTop = tmpTop;
						}
						movesuccess = true;
						break;
					}
				}
            }
        }
        if(!movesuccess){
            document.body.scrollTop = lastBottom;
        }
    }else{//scroll to up
        for(var i=divs.length-1;i>=0;i--){
            tmpTop = divs[i].offsetTop;
			if(tmpTop != "undefined" && tmpTop != null && tmpTop > 0 && divs[i].className.indexOf("selectedEntry") < 0){
				if(tmpTop < topNow){
					tmpTop = tmpTop - magicHeight;
					document.body.scrollTop = tmpTop;
					break;
				}
            }
        }
    }
}

buildMyButton();
