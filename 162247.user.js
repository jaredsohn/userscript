// ==UserScript==
// @name       Eksi Okutman
// @namespace  http://eksisozluk.com/*
// @version    1.4
// @description  Eksi Sozlugu Kolay Okunabilir Yapma Aparati
// @include http://eksisozluk.com/*
// @include https://eksisozluk.com/*
// @include http://antik.eksisozluk.com/*
// @include https://antik.eksisozluk.com/*
// @match      http://eksisozluk.com/*
// @match      http://antik.eksisozluk.com/*
// @copyright  2013+, b w n s p
// @grant      GM_info
// @downloadURL http://userscripts.org/scripts/source/162247.user.js
// @updateURL http://userscripts.org/scripts/source/162247.user.js
// ==/UserScript==

var timeOut = 0;
var articleIndex = 0;
var maxIndex = 0;
var isLarge = false;
var isFast = false;
window.onload = function(){
     // setPage();
     // var timeOutHide = setInterval(hideSponsored,100);
     if (document.URL.indexOf("antik.eksisozluk.com") >= 0) {
        okumaPAntik();
        createPanelAntik();	
    } else {
       okumaP();
       createPanel();
    }
    
}

function hideSponsored(){//{{{
    
   var sponsored = document.getElementsByClassName("sponsored"); 
   for(var x = 0; x<sponsored.length;x++){
        sponsored[x].style.display = "none";
   }

}//}}}

function okumaP(){//{{{
    var articles = document.getElementsByTagName("article");
    if(!articles)
        return;
    maxIndex = articles.length; 

    for(var x = 0; x<articles.length; x++){
        
        var btn = document.createElement("div");
        btn.innerHTML = "<a class = 'btnGenis' style = 'font-size:0.8em; color:#666;display:none;'>rahat oku</a>&nbsp;&nbsp;&nbsp;<a class = 'btnCls' style = 'font-size:0.8em; color:#666;display:none;' >hızlı oku</a>";
        btn.style.height = "20px";
        btn.style.width = "100%";
        btn.style.textAlign = "right";
        btn.style.position = "absolute";
        btn.style.top = "-2em";
        articles[x].appendChild(btn);
        
        
        var title = document.getElementById("title").innerHTML;
        
        
        articles[x].getElementsByClassName("btnCls")[0].addEventListener("click", function(event){
           var content = event.target.parentNode.parentNode.getElementsByClassName("content")[0];
           var value = content.innerHTML.replace(/<br>/g," ");
           var divElem = document.createElement("div");
           divElem.innerHTML = value;
           value = divElem.innerText || divElem.textContent;
           getContent(value,title,articles,event); },false);
        
        articles[x].getElementsByClassName("btnGenis")[0].addEventListener("click", function(event){
               
           var content = event.target.parentNode.parentNode.getElementsByClassName("content")[0];
           var value = content.innerHTML;
           getLargeContent(value,title,event); 
        },false);
        
        articles[x].onmouseover = function(){
            var elem = this.getElementsByClassName("btnCls");
            
            if(!elem){
                return;
            }
            elem[0].style.display="inline";
            
            elem = this.getElementsByClassName("btnGenis");
            
            if(!elem){
                return;
            }
            elem[0].style.display="inline";
            
            
        }
        
        articles[x].onmouseout = function(){
            var elem = this.getElementsByClassName("btnCls");
            if(!elem){
                return;
            }
            elem[0].style.display="none";
            
             elem = this.getElementsByClassName("btnGenis");
            if(!elem){
                return;
            }
            elem[0].style.display="none";
        }
        
        
        
    }
    
}//}}}

function setPage(){//{{{
    removeTopBanner();
    removeAside();
}//}}}



function removeTopBanner(){//{{{
    var ad = document.getElementById("eksisozluk_sitegeneli_728x90");
    if(ad)
        ad.style.display = "none";

    ad = document.getElementById("eksisozluk_sitegeneli_logo");
    if(ad)
        ad.style.display = "none";
    var ads = document.getElementsByClassName("ads");
    for(var x = 0; x<ads.length;x++){
        ads[x].style.display = "none";

    }
    /*
    for(var x=0; x<ad.length;x++){
        ad[x].style.display="none";
    }
    */
    
}//}}}

function removeAside(){//{{{
    var aside = document.getElementById("aside");
    if(aside)
        aside.style.display="none";
    
    
    var contentSec = document.getElementById("content-body");
    
    if(contentSec)
        contentSec.style.width = "97%";
        
    
}//}}}

function createPanel(){//{{{
    
    var  screenWidth = window.screen.availWidth || window.screen.width;
    var screenHeight = window.screen.availHeight || window.screeh.height;
    
    var panel = document.createElement('div');
    panel.id = "backPnl";
    
    panel.style.backgroundColor = "#000";
    panel.style.width = "100%";
    panel.style.height = "100%";
    panel.style.position = "fixed";
    panel.style.top = "0px";
    panel.style.left = "0px";
    panel.style.zIndex = "9999";
    panel.style.display = "none";
    panel.style.opacity = "0.8";
    panel.addEventListener("click", hidePanels,false);
    
    document.body.appendChild(panel);
    
    var whitPnl = document.createElement("div");
    whitPnl.id = "whitPnl";
    whitPnl.style.zIndex = "10000";
    whitPnl.style.width = "54%";
    whitPnl.style.height = "400px";
    whitPnl.style.backgroundColor = "#ebebeb";
    whitPnl.style.position = "fixed";
    //whitPnl.style.left = (screenWidth-700)/2 + "px";
	whitPnl.style.left = "23%";
    whitPnl.style.top = "120px";
   // whitPnl.style.top = screenHeight + "px";
    whitPnl.style.padding = "0px";
    whitPnl.style.display = "none";
    document.body.appendChild(whitPnl);
    
    var pnlHeader = document.createElement('div');
    pnlHeader.style.height = "35px";
    pnlHeader.style.width = "100%";
    pnlHeader.style.textAlign = "center";
    pnlHeader.style.backgroundColor = "#ccc";
    //pnlHeader.style.paddingTop = "5px";
    pnlHeader.style.boxShadow="0px 0px 8px #000";
    pnlHeader.style.position = "absolute";
    pnlHeader.style.top="-35px";
    pnlHeader.innerHTML = "<h2 id='txtHeader' style='float:left;width:95%;margin-bottom:0px;'></h2>";
    whitPnl.appendChild(pnlHeader);
    
    var closeBut = document.createElement("a");
    closeBut.style.float="right";
    closeBut.style.background = "transparent url('https://dl.dropbox.com/u/79567743/fancybox.png') -40px 0px";
    closeBut.style.width="30px";
    closeBut.style.height="30px";
    closeBut.style.marginTop="-15px";
    closeBut.style.position = "absolute";
    closeBut.addEventListener("click", hidePanels,false);
    pnlHeader.appendChild(closeBut);
    
    var pnlBody = document.createElement("div");
    pnlBody.style.width = "100%";
    pnlBody.style.height = "400px";
    pnlBody.style.overflow = "auto";
    pnlBody.style.padding = "10px";
    pnlBody.style.paddingTop = "12px";
    pnlBody.style.backgroundColor = "#ebebeb";
    pnlBody.id="txtBody";    
    
    pnlBody.onclick = function(e){
        if(e.target.nodeName=="DIV" || e.target.nodeName == "CENTER" ){
            if(isFast)
                startStopContent();
        }
    }
    
    whitPnl.appendChild(pnlBody);

    var suserPanel = document.createElement('div');
    suserPanel.style.height = "26px";
    suserPanel.style.width = "100%";
    suserPanel.style.position = "absolute";
    suserPanel.style.backgroundColor = "#ebebeb";
    suserPanel.style.bottom="-26px";
    suserPanel.style.paddingRight = "5px";
    suserPanel.id="suserPanel";

    whitPnl.appendChild(suserPanel);

    var pageContent = document.createElement('div');
    pageContent.style.height = "26px";
    pageContent.style.width = "100%";
    pageContent.style.textAlign = "center";
    pageContent.style.position = "absolute";
    pageContent.style.backgroundColor = "#cccccc";
    pageContent.style.bottom="-54px";
    pageContent.style.boxShadow="0px 0px 8px #000";
    pageContent.id="PageContent";

    whitPnl.appendChild(pageContent);

    var btnRight = document.createElement("a");
    btnRight.style.background = "url('https://dl.dropbox.com/u/79567743/fancybox.png') repeat scroll -40px -60px transparent";
    btnRight.style.width = "30px";
    btnRight.style.height = "30px";
    btnRight.style.position="absolute";
    btnRight.href="javascript://";
    btnRight.id="btnRight";
    btnRight.style.top=(440-30)/2-60+"px";
    //btnRight.style.left="700px";
    btnRight.style.left = "100%";
	btnRight.style.display="block";
    btnRight.onclick = nextClicked;
    whitPnl.appendChild(btnRight);    

    var btnLeft = document.createElement("a");
    btnLeft.style.background = "url('https://dl.dropbox.com/u/79567743/fancybox.png') repeat scroll -40px -30px transparent";
    btnLeft.style.width = "30px";
    btnLeft.style.height = "30px";
    btnLeft.style.position="absolute";
    btnLeft.href="javascript://";
    btnLeft.style.top=(440-30)/2-60+"px";
    btnLeft.style.left="-30px";
	btnLeft.id="btnLeft";
    btnLeft.style.display="block";
    btnLeft.onclick = prevClicked;

    /*
    * sag ve sol klavye tuslarina ileri geri ozellikleri atadik
    */

    document.onkeypress = function(event){
        if(event.keyCode == 39){
            nextClicked();
        }else if(event.keyCode == 37){
            prevClicked();
        }
    }

    whitPnl.appendChild(btnLeft);
   
    /*
    document.onmousemove=function(e){
        var mouseXPos = e.clientX;
        var mouseYPos = e.clientY;
        var leftBoundMin = (screenWidth-700)/2-30;
        var leftBoundMax = leftBoundMin+150;
        var rightBoundMax = (screenWidth+700)/2+30;
        var rightBoundMin = rightBoundMax-150;
        var topBound = 120;
        var bottomBound = 120+400;

        //eger ilk entryde ise onceki butonu gorunmesin
        if(isLarge && articleIndex>0 && mouseXPos<leftBoundMax && mouseXPos>leftBoundMin && mouseYPos>topBound && mouseYPos<bottomBound){
            btnLeft.style.display = "block";
            btnRight.style.display = "none";
        }else if(isLarge && articleIndex<(maxIndex-1) && mouseXPos<rightBoundMax && mouseXPos>rightBoundMin && mouseYPos>topBound && mouseYPos<bottomBound){
            btnRight.style.display = "block";
            btnLeft.style.display = "none";
        }else{
           btnRight.style.display="none"; 
           btnLeft.style.display="none"; 
        }

        //eger ilk entryde ise onceki butonu gorunmesin
        if(articleIndex==0)
            btnLeft.style.display="none";


    }
	
	*/
    
    

}//}}}

function prevClicked(){//{{{
    if(articleIndex==0)
        articleIndex = maxIndex;
    var prevArticleIndex = --articleIndex;
    var article = document.getElementsByTagName("article")[prevArticleIndex];
    var content = article.getElementsByClassName("content")[0].innerHTML;
    if(isLarge)
    setLargePanelContent(article);
    else if(isFast)
        setFastPanelContent(content);
    
    setPageIndexColor(articleIndex);
    // //eger ilke geldiyse prev tusu kaybolsun
    // if(prevArticleIndex==0)
    //     document.getElementById("btnLeft").style.display="none";

}//}}}

function nextClicked(){//{{{
    articleIndex++;
    if(articleIndex == maxIndex)
        articleIndex = 0;
    var nextArticleIndex = articleIndex;
    
    var article = document.getElementsByTagName("article")[nextArticleIndex];
    var content = article.getElementsByClassName("content")[0].innerHTML;
    if(isLarge)
        setLargePanelContent(article);
    else if(isFast)
        setFastPanelContent(content);
    setPageIndexColor(articleIndex);
    //eger sonuncuya geldiyse next tusu kaybolsun
    // if(nextArticleIndex+1==maxIndex)
    //     document.getElementById("btnRight").style.display="none";
}//}}}

function goToArticle(index){//{{{
    articleIndex = index;
    var article = document.getElementsByTagName("article")[index]; 
    if(isLarge)
        setLargePanelContent(article);
    else if(isFast)
        setFastPanelContent(article);
    //TODO: gidilen article no sunu secili hale getir
    setPageIndexColor(index);
    

}//}}}

function setPageIndexColor(index){//{{{
    var pageContentElements = document.getElementById("PageContent").childNodes;

    for(var i =0; i<pageContentElements.length; i++){
        var element = pageContentElements[i];
        var elementIndex = parseInt(element.innerHTML)-1;
        element.style.backgroundColor="#cccccc";
        element.style.boxShadow = "";
        if(index==elementIndex){
            element.style.backgroundColor="#04B486";        
            element.style.boxShadow = "0px 0px 3px #000";
        }
        
    }

}//}}}


function setLargePanelContentBasic(article){//{{{

    var content = article.getElementsByClassName("content")[0].innerHTML;
    createSuserPanel(article);
    var articleNum = (article.parentNode.getAttribute("value"));
    var pnlBody = document.getElementById("txtBody");
    pnlBody.innerHTML = articleNum+"<hr /><p id='txtBodyP' style = 'color:#000;font-size:15px;'>"+content+"</p>";
    pnlBody.scrollTop = 0;
}//}}}

function setLargePanelContent(article){
    setLargePanelContentBasic(article);
}

function setLargePanelContentFullOpacity(article){//{{{

    var content = article.getElementsByClassName("content")[0].innerHTML;
    var articleNum = (article.parentNode.getAttribute("value"));
    createSuserPanel(article);
    var whitPnl = document.getElementById("whitPnl");
    var pnlBody = document.getElementById("txtBody");
    var timeOutOpacityDown = 0;
    var opacity = 0.9;
    timeOutOpacityDown = setInterval(function(){
        whitPnl.style.opacity = opacity;
        opacity = opacity-0.1;
        if(opacity<=0.0){
        pnlBody.innerHTML = "<p id='txtBodyP' style = 'color:#000;font-size:15px;'>"+articleNum+"<hr />"+content+"</p>";
            clearInterval(timeOutOpacityDown);
            showPanelWhitPnl();
            pnlBody.scrollTop = 0;
            /* 
            timeOutOpacity = setInterval(function(){
                opacity = opacity + 0.1;
                pnlBody.style.opacity = opacity;
                if(opacity >= 0.9){
                    clearInterval(timeOutOpacity);
                }
            },30);
            */

        }
    },30);
}//}}}

function setLargePanelContentMinOpacity(article){//{{{
    var content = article.getElementsByClassName("content")[0].innerHTML;
    var articleNum = (article.parentNode.getAttribute("value"));
    createSuserPanel(article);
    var pnlBody = document.getElementById("txtBody");
    var timeOutOpacityDown = 0;
    var opacity = 0.9;
    timeOutOpacityDown = setInterval(function(){
        pnlBody.style.opacity = opacity;
        opacity = opacity-0.1;
        if(opacity<=0.0){
            pnlBody.innerHTML = "<p id='txtBodyP' style = 'color:#000;font-size:15px;'>"+articleNum+"<hr />"+content+"</p>";
            clearInterval(timeOutOpacityDown);
            showPanel();
            pnlBody.scrollTop = 0;
            /* 
            timeOutOpacity = setInterval(function(){
                opacity = opacity + 0.1;
                pnlBody.style.opacity = opacity;
                if(opacity >= 0.9){
                    clearInterval(timeOutOpacity);
                }
            },30);
            */

        }
    },30);
    
       


    
}//}}}
function showPanelWhitPnl(){//{{{
    var pnlBody = document.getElementById("whitPnl");
    var opacity = 0.0;
    var timeOutOpacity = setInterval(function(){
        opacity = opacity + 0.1;
        pnlBody.style.opacity = opacity;
        if(opacity > 0.9){
            clearInterval(timeOutOpacity);
        }
    },30);

}//}}}
function showPanel(){//{{{
    var pnlBody = document.getElementById("txtBody");
    var opacity = 0.0;
    var timeOutOpacity = setInterval(function(){
        opacity = opacity + 0.1;
        pnlBody.style.opacity = opacity;
        if(opacity > 0.9){
            clearInterval(timeOutOpacity);
        }
    },30);

}//}}}

var i = 0; // hizli oku seceneginde kelime indexini belirler.
var n = ''; // hizli oku seceneginde hangi kelimede oldugunu belirler

function getContent(value,title,articles,event){//{{{
    //en alttaki pageContent kismini kaldir
    document.getElementById("PageContent").style.display="none";
//setCookie("okutmanSpeed","250",7);
    document.getElementById("btnLeft").style.display = "none";
    document.getElementById("btnRight").style.display = "none";
    isFast = true;
    isLarge = false;
    i=0;
    var pnl = document.getElementById("backPnl");
    pnl.style.display = "block";
    pnl = document.getElementById("whitPnl");
    pnl.style.display = "block";
    
    var pnlHeader = document.getElementById("txtHeader");
    if(pnlHeader)
    pnlHeader.innerHTML = title;
    
   var pnlBody = document.getElementById("txtBody");
    pnlBody.style.paddingTop = "60px";
   
    //pnlBody.innerHTML = "<p>"+value+"</p>";
    value = value.replace(/[\n-]/g," ");
    n = value.split(" ");
    
    
    
   var inHtml = "<div class = 'divText' style  = 'width:100%;text-align:center;font-size:45px; border-bottom:solid 0px;'>" + n[i] + "</div><br />"
            + "<center><div class='textMeterBack' style = 'width:150px; height:30px; background:#ebebeb;box-shadow: 0px 0px 8px #000;'><div class = 'textMeterFront' style = 'height:30px; width : "+150*(i+1)/n.length+"px; background:#ccc; float:left;'></div></div></center>"
            + "<br />"
            + "<center><button class = 'btnStop'>baslat</button>";
            
           
   
    inHtml +="&nbsp;&nbsp;<button class='btnOkutmanOptions'>secenekler</button></center><br /><center><div class='okutmanSettings' style='height:0px;display:inline-block;overflow:hidden;'><table><tr><td><label for='chClose'>bitiste otomatik kapansin</label></td><td ><input type='checkbox' name='autoClose' value='closePanel' id = 'chClose' class = 'chClose'/></td></tr>"
    +"<tr><td><label for='chOtoStart'>acilista otomatik baslasin</label></td><td><input type = 'checkbox' class = 'chOtoStart' id = 'chOtoStart'/></td></tr>"
    +"<tr><td><label>dakikada kelime hizi</label></td><td><select style = 'width:100px' class='textSpeed' size = '1'>";
     for(var num = 200; num<550;num+=50){
            	inHtml +="<option value = '"+num+"'>"+num+"</option>";
            }
    inHtml += "</select></td></tr>";
    +"</table></div></center>";
    
    pnlBody.innerHTML = inHtml;
    
    var btnOptions = pnlBody.getElementsByClassName("btnOkutmanOptions")[0];
    var optPan = "goster";
    btnOptions.onclick = function(){
        
        var timerOptions = setInterval(function(){
            var okutmanSettings = pnlBody.getElementsByClassName("okutmanSettings")[0];
        	var height = parseInt(okutmanSettings.style.height);
            if((optPan == "goster" && height>=122) || (optPan=="gizle" && height<=0 )){
                if(optPan=="goster")
                    optPan="gizle";
                else
                    optPan ="goster";
            	clearInterval(timerOptions);
                return;
            }
            if(optPan=="goster")
	            okutmanSettings.style.height = (height+5) + "px";
            else
                okutmanSettings.style.height = (height-5) + "px";
        },1);  
    }
    
    
    var selectMenu = pnlBody.getElementsByClassName("textSpeed")[0];
    selectMenu.value = getCookie("okutmanSpeed");
    selectMenu.onchange = function(){
        var chosenoption=this.options[this.selectedIndex].value; //this refers to "selectmenu"
		setCookie("okutmanSpeed",chosenoption,30);
    }
    
    var chClose = pnlBody.getElementsByClassName("chClose")[0];
    if(getCookie("okutmanClose") && getCookie("okutmanClose")=="true"){
    	chClose.checked = true;
    }else
        chClose.checked = false;
    chClose.onchange = function(){
     	var val = this.checked;
        if(val)
            setCookie("okutmanClose",true,30);
        else
            delCookie("okutmanClose")
    }
    
    var chOtoStart = pnlBody.getElementsByClassName("chOtoStart")[0];
    if(getCookie("okutmanOtoStart") && getCookie("okutmanOtoStart")=="true"){
     	chOtoStart.checked = true;
        var btnStop = pnlBody.getElementsByClassName("btnStop")[0];
        var cookieVal = parseInt(getCookie('okutmanSpeed'));
        var textSpeed = 0;
        if(cookieVal)
            textSpeed = cookieVal;
        else
            textSpeed = 200;
        btnStop.innerHTML = "durdur";
        timeOut = setInterval(function(){
            flowText(pnlBody);
            i++;
        },(60000/textSpeed));
    }else
        chOtoStart.checked = false;
    
    chOtoStart.onchange = function(){
     	var val = this.checked;
        if(val){
         	setCookie("okutmanOtoStart",true,30);   
        }else
            delCookie("okutmanOtoStart");
        
    }
    
    var btnStop = pnlBody.getElementsByClassName("btnStop")[0];
    btnStop.onclick = startStopContent;
    /*
    timeOut = setInterval(function(){
        	flowText(i,n,pnlBody);
        	i++;
    },(60000/textSpeed));
    */
    pnl.appendChild(pnlBody);
    var articleIndex = findArticleIndex(articles,event);
    createSuserPanel(articles[articleIndex]);
    document.body.parentNode.style.overflow = "hidden";
}//}}}

function startStopContent(){//{{{
    var pnlBody = document.getElementById("txtBody");
    var btnStop = pnlBody.getElementsByClassName("btnStop")[0];
    console.log(btnStop.innerHTML);

    if(btnStop.innerHTML == "durdur"){
        btnStop.innerHTML = "baslat";
        clearInterval(timeOut);
    }else{
        var cookieVal = parseInt(getCookie('okutmanSpeed'));
        var textSpeed = 0;
        if(cookieVal)
            textSpeed = cookieVal;
        else
            textSpeed = 200;
        btnStop.innerHTML = "durdur";
        timeOut = setInterval(function(){
                flowText(pnlBody);
                i++;
        },(60000/textSpeed));
    }
    var tempOpacity = pnlBody.style.opacity;

    // fadeOutPanel(pnlBody);
    madeBlack(pnlBody);
}//}}}

function fadeOutPanel(panel){//{{{
        
    panel.style.opacity = 1.0;
    var startStopInterval = setInterval(function(){
        var opacity = panel.style.opacity - 0.05;
        panel.style.opacity = opacity;
        if(opacity<=0){
            clearInterval(startStopInterval);
            fadeInPanel(panel);
        }
    },10);
}//}}}

function madeBlack(panel){//{{{
    var oldColor = panel.style.backgroundColor;
    var lastIndex = oldColor.indexOf(")")-4;
    oldColor = (oldColor.substr(4,lastIndex));
    oldColor = oldColor.split(", ");

    var startStopInterval= setInterval(function(){
        var bgString = panel.style.backgroundColor.toString();
        var lastIndex = bgString.indexOf(")")-4;
        bgString = (bgString.substr(4,lastIndex));
        bgString = bgString.split(", ");
        var red = parseInt(bgString[0])-3;
        var green = parseInt(bgString[1])-3;
        var blue = parseInt(bgString[2])-3;
        panel.style.backgroundColor = "#" + rgbToHex(red,green,blue);
        if(red<=120){
            clearInterval(startStopInterval);
            fadeToColor(panel,oldColor);
        }
    },10);

    
}//}}}
function fadeToColor(panel,color){//{{{
    var startStopInterval = setInterval(function(){
        var bgString = panel.style.backgroundColor.toString();
        var lastIndex = bgString.indexOf(")")-4;
        bgString = (bgString.substr(4,lastIndex));
        bgString = bgString.split(", ");
        var red = parseInt(bgString[0])+3;
        var green = parseInt(bgString[1])+3;
        var blue = parseInt(bgString[2])+3;
        panel.style.backgroundColor = "#" + rgbToHex(red,green,blue);
        if(red >= parseInt(color[0])){
            clearInterval(startStopInterval);
        }
    },10);

}//}}}

function rgbToHex(R,G,B) {//{{{
  return toHex(R)+toHex(G)+toHex(B)
}//}}}


function toHex(n) {//{{{
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}//}}}
function fadeInPanel(panel){//{{{

    panel.style.opacity = 0;
    var startStopInterval = setInterval(function(){
        var opacity = parseFloat(panel.style.opacity) + parseFloat("0.05");

        panel.style.opacity = opacity;
        if(opacity>=1)
            clearInterval(startStopInterval);
    },10);

}//}}}

function getLargeContent(value,title,event){/*{{{*/
    //en alttaki pageContent kismini gorunur Yap
    if(maxIndex>1)
        document.getElementById("PageContent").style.display="block";
    else{
        document.getElementById("PageContent").style.display="none";
    }
    isLarge = true;
    isFast = false;
    var articles = document.getElementsByTagName("article");
    articleIndex = findArticleIndex(articles,event);
    var articleNum = articles[articleIndex].parentNode.getAttribute("value");
    console.log("articleIndex: " + articleIndex);
    console.log("maxIndex: " + maxIndex);
    
    var pnl = document.getElementById("backPnl");
    pnl.style.display = "block";
    pnl = document.getElementById("whitPnl");
    pnl.style.display = "block";
    
    var pnlHeader = document.getElementById("txtHeader");
    pnlHeader.innerHTML = title;
    
    var pnlBody = document.getElementById("txtBody");
    //pnlBody.style.backgroundColor = "#fff";
    pnlBody.style.paddingTop = "10px";
    pnlBody.innerHTML = articleNum+"<hr />"+"<p id='txtBodyP' style = 'color:#000;font-size:15px;'>"+value+"</p>";
    
    document.body.parentNode.style.overflow = "hidden";


    createSuserPanel(articles[articleIndex]);


    //pageContent paneline buttonlari yerlestirdik
   
    var pageContent = document.getElementById("PageContent");
    // pageContent.innerHTML = "<a href = 'javascript://'  style = 'border:solid 1px; display:inline-block; height:20px; width : 20px;'>1</a>";

    if(pageContent.innerHTML=="")
        createPageContent();
   setPageIndexColor(articleIndex);
    

}/*}}}*/

function createPageContent(){//{{{
    var pageContent = document.getElementById("PageContent");
    for(var i=0; i<maxIndex; i++){

        
        var btnEx = document.createElement("a");

        btnEx.href = "javascript://";
        // btnEx.style.border = "solid 1px";
        btnEx.style.display = "inline-block";
        btnEx.style.height= "20px";
        btnEx.style.margin="3px";
        btnEx.style.width = "20px";
        btnEx.style.backgroundColor="#cccccc";
        
        btnEx.innerHTML=i+1;
        btnEx.onclick = function(e){
            // goToArticle(i);
            var pageNum = parseInt(e.target.innerHTML)-1;
            goToArticle(pageNum);

        }


        pageContent.appendChild(btnEx);


    }


}//}}}

// function findArticleIndex: used to get article index when an article button is clicked//{{{
function findArticleIndex(articles,event){
    var thisIndex = event.target.parentNode.parentNode.parentNode.value;
     for(var x=0;x<articles.length;x++){
        var deger = articles[x].parentNode.value;
        if(deger==thisIndex)
            return x;
    }

}//}}}

// function createSuserPanel: used to put suser names below article//{{{
function createSuserPanel(article){
    var suserPanel = document.getElementById('suserPanel');
    
    suserPanel.innerHTML = "";
    var footer = article.getElementsByClassName('info')[0];

    var nickNameOrj = footer.getElementsByTagName('address')[0];
    var nickName = nickNameOrj.cloneNode(true);
    nickName.style.cssFloat = "right";


    suserPanel.appendChild(nickName);

    var entryDateOrj = footer.getElementsByTagName('span')[0];
    var entryDate = entryDateOrj.cloneNode(true);
    entryDate.style.cssFloat = "right";

    entryDate.style.paddingRight = "10px";

    suserPanel.appendChild(entryDate);

}//}}}



/*function cloneObj: this function is not used//{{{
* we used cloneNode javascript function insted
* i didnt delete this function because it uses throw new error
*
*/
function cloneObj(obj){
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}//}}}

function okumaPAntik(){//{{{
    var articlesEol = document.getElementsByClassName('eol')[0];
    if(!articlesEol)
        return;
    var articles = articlesEol.getElementsByTagName('li');
    if(!articles)
        return;
    for(var x = 0; x<articles.length;x++){
        if(articles[x].parentNode.tagName=="OL"){
            var id = articles[x].id;
            id = id.substr(1,id.length);
            var btn = document.createElement("LI");
            btn.innerHTML = "<a href='javascript://' class = 'but btnGenis'>genis oku</a>";
           
           
            document.getElementById('m' + id).getElementsByTagName("ul")[0].appendChild(btn);
            
            btn = document.createElement("LI");
            btn.innerHTML = "<a href = 'javascript://' class = 'but btnCls' >hızlı oku</a>";
            document.getElementById('m' + id).getElementsByTagName("ul")[0].appendChild(btn);
            
            var title = document.getElementsByClassName("title")[0].innerHTML;
            if(!title){
              	console.log("cant get title");
                return;
            }
            
           articles[x].getElementsByClassName("btnCls")[0].onclick=function(event){
               
               var contentElem = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
               contentElem.removeChild(contentElem.lastChild);
               contentElem.removeChild(contentElem.lastChild);
               //contentElem.removeChild(contentElem.firstChild);
               var content = contentElem.innerText || contentElem.textContent;
               getContentAntik(content,title);
              
           }
            articles[x].getElementsByClassName("btnGenis")[0].onclick = function(event){
               var contentElem = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
               contentElem.removeChild(contentElem.lastChild);
               contentElem.removeChild(contentElem.lastChild);
               //contentElem.removeChild(contentElem.firstChild);
               var content = contentElem.innerHTML;
               getExContent(content,title);
               
            }
            
           
        }
  
    }
}//}}}

function createPanelAntik(){//{{{
    var  screenWidth = window.screen.availWidth || window.screen.width;
    var screenHeight = window.screen.availHeight || window.screeh.height;
    
    var panel = document.createElement('div');
    panel.id = "backPnl";
    
    panel.style.backgroundColor = "#000";
    panel.style.width = "100%";
    panel.style.height = "100%";
    panel.style.position = "fixed";
    panel.style.top = "0px";
    panel.style.left = "0px";
    panel.style.zIndex = "9999";
    panel.style.display = "none";
    panel.style.opacity = "0.8";
    panel.addEventListener("click", hidePanels,false);
    
    document.body.appendChild(panel);
    
    var whitPnl = document.createElement("div");
    whitPnl.id = "whitPnl";
    whitPnl.style.zIndex = "10000";
    whitPnl.style.width = "700px";
    whitPnl.style.height = "500px";
    whitPnl.style.backgroundColor = "#ebebeb";
    whitPnl.style.position = "fixed";
    whitPnl.style.left = "100px";
    whitPnl.style.top = (100)/2+"px";
   // whitPnl.style.top = screenHeight + "px";
    whitPnl.style.padding = "0px";
    whitPnl.style.display = "none";
    document.body.appendChild(whitPnl);
    
    var pnlHeader = document.createElement('div');
    pnlHeader.style.height = "35px";
    pnlHeader.style.width = "100%";
    pnlHeader.style.textAlign = "center";
    pnlHeader.style.backgroundColor = "#ccc";
    pnlHeader.style.boxShadow="0px 0px 8px #000";
    pnlHeader.style.position = "absolute";
    pnlHeader.style.top="-35px";
    pnlHeader.innerHTML = "<h3 style='float:left;width:90%;margin-bottom:0px;margin-top:7px;' id='txtHeader'></h3>";
	
    var closeBut = document.createElement("a");
    closeBut.style.float="right";
    closeBut.style.background = "transparent url('https://dl.dropbox.com/u/79567743/fancybox.png') -41px 0px";
    closeBut.style.width="30px";
    closeBut.style.height="30px";
    closeBut.style.marginTop="-15px";
    closeBut.style.marginLeft="15px";
    closeBut.style.position = "absolute";
    closeBut.href = "javascript://";
    closeBut.addEventListener("click", hidePanels,false);
    pnlHeader.appendChild(closeBut);
    
    whitPnl.appendChild(pnlHeader);
    
    var pnlBody = document.createElement("div");
    pnlBody.style.width = "680px";
    pnlBody.style.overflow = "auto";
    pnlBody.style.padding = "0px 10px 10px 10px";
   // pnlBody.style.paddingTop = "12px";
    pnlBody.style.backgroundColor = "#ebebeb";
    pnlBody.style.display = "block";
    pnlBody.id = "txtBody";
    whitPnl.appendChild(pnlBody);

}//}}}

function getExContent(value, title){//{{{
 	var pnl = document.getElementById("backPnl");
    pnl.style.display = "inline-block";
    
    var whitPnl = document.getElementById("whitPnl");
    whitPnl.style.display = "block";
    document.body.parentNode.style.overflow = "hidden";
    
    var pnlHeader = document.getElementById("txtHeader");
    pnlHeader.innerHTML = title;
    
    var pnlBody = document.getElementById("txtBody");
    pnlBody.innerHTML = null;
    pnlBody.style.paddingTop = "10px";
    pnlBody.style.marginBottom = "-10px";

    var bodyH = parseInt(whitPnl.style.height)-parseInt(pnlHeader.style.height)-20 + "px";
    pnlBody.style.height = "480px";
    pnlBody.innerHTML = "<p style = 'color:#000;font-size:15px;margin-top: 0;'>"+value+"</p>";
    
}//}}}

function getContentAntik(value,title){//{{{
	i=0;
    var pnl = document.getElementById("backPnl");
    pnl.style.display = "inline-block";
    pnl = document.getElementById("whitPnl");
    pnl.style.display = "block";
    document.body.parentNode.style.overflow = "hidden";
    
    
    var pnlHeader = document.getElementById("txtHeader");
    
    pnlHeader.innerHTML = title;
    
    var pnlBody = document.getElementById("txtBody");
    pnlBody.innerHTML = null;
    pnlBody.style.paddingTop = "120px";
    pnlBody.style.height = "335px";
    value = value.replace(/[\n-]/g," ");
    n = value.split(" ");
    
    
    
   var inHtml = "<div class = 'divText' style  = 'width:100%;text-align:center;font-size:45px; border-bottom:solid 0px;'>" + n[i] + "</div><br />"
            + "<center><div class='textMeterBack' style = 'width:150px; height:30px; background:#ebebeb;box-shadow: 0px 0px 8px #000;'><div class = 'textMeterFront' style = 'height:30px; width : "+150*(i+1)/n.length+"px; background:#ccc; float:left;'></div></div></center>"
            + "<br />"
            + "<center><button class = 'btnStop'>baslat</button>";
            
           
   
    inHtml +="&nbsp;&nbsp;<button class='btnOkutmanOptions'>secenekler</button></center><br /><center><div class='okutmanSettings' style='height:0px;display:inline-block;overflow:hidden;'><table style='border:solid 1px #ccc;'><tr><td><label for='chClose'>bitiste otomatik kapansin</label></td><td ><input type='checkbox' name='autoClose' value='closePanel' id = 'chClose' class = 'chClose'/></td></tr>"
    +"<tr><td><label for='chOtoStart'>acilista otomatik baslasin</label></td><td><input type = 'checkbox' class = 'chOtoStart' id = 'chOtoStart'/></td></tr>"
    +"<tr><td><label>dakikada kelime hizi</label></td><td><select style = 'width:100px' class='textSpeed' size = '1'>";
     for(var num = 200; num<550;num+=50){
            	inHtml +="<option value = '"+num+"'>"+num+"</option>";
            }
    inHtml += "</select></td></tr>";
    +"</table></div></center>";
    
    pnlBody.innerHTML = inHtml;
    
    var btnOptions = pnlBody.getElementsByClassName("btnOkutmanOptions")[0];
    var optPan = "goster";
    btnOptions.onclick = function(){
        
        var timerOptions = setInterval(function(){
            var okutmanSettings = pnlBody.getElementsByClassName("okutmanSettings")[0];
        	var height = parseInt(okutmanSettings.style.height);
            if((optPan == "goster" && height>=122) || (optPan=="gizle" && height<=0 )){
                if(optPan=="goster")
                    optPan="gizle";
                else
                    optPan ="goster";
            	clearInterval(timerOptions);
                return;
            }
            if(optPan=="goster")
	            okutmanSettings.style.height = (height+5) + "px";
            else
                okutmanSettings.style.height = (height-5) + "px";
        },1);  
    }
    
    
    var selectMenu = pnlBody.getElementsByClassName("textSpeed")[0];
    selectMenu.value = getCookie("okutmanSpeed");
    selectMenu.onchange = function(){
        var chosenoption=this.options[this.selectedIndex].value; //this refers to "selectmenu"
		setCookie("okutmanSpeed",chosenoption,30);
    }
    
    var chClose = pnlBody.getElementsByClassName("chClose")[0];
    if(getCookie("okutmanClose") && getCookie("okutmanClose")=="true"){
    	chClose.checked = true;
    }else
        chClose.checked = false;
    chClose.onchange = function(){
     	var val = this.checked;
        if(val)
            setCookie("okutmanClose",true,30);
        else
            delCookie("okutmanClose")
    }
    
    var chOtoStart = pnlBody.getElementsByClassName("chOtoStart")[0];
    if(getCookie("okutmanOtoStart") && getCookie("okutmanOtoStart")=="true"){
     	chOtoStart.checked = true;
        var btnStop = pnlBody.getElementsByClassName("btnStop")[0];
        var cookieVal = parseInt(getCookie('okutmanSpeed'));
        var textSpeed = 0;
        if(cookieVal)
            textSpeed = cookieVal;
        else
            textSpeed = 200;
        btnStop.innerHTML = "durdur";
        timeOut = setInterval(function(){
            flowText(pnlBody);
            i++;
        },(60000/textSpeed));
    }else
        chOtoStart.checked = false;
    
    chOtoStart.onchange = function(){
     	var val = this.checked;
        if(val){
         	setCookie("okutmanOtoStart",true,30);   
        }else
            delCookie("okutmanOtoStart");
        
    }
    
    pnlBody.getElementsByClassName("btnStop")[0].addEventListener("click", function(event){ 
            if(this.innerHTML == "durdur"){
                this.innerHTML = "baslat";
                clearInterval(timeOut);
            }else{
                var cookieVal = parseInt(getCookie('okutmanSpeed'));
                var textSpeed = 0;
                if(cookieVal)
                    textSpeed = cookieVal;
                else
                    textSpeed = 200;
            	this.innerHTML = "durdur";
                timeOut = setInterval(function(){
                        flowText(pnlBody);
                        i++;
                },(60000/textSpeed));
            }
        },false);
   
    pnl.appendChild(pnlBody);
    document.body.parentNode.style.overflow = "hidden";
}//}}}


function flowText(pnlBody){//{{{
    	if(i==n.length){
            clearInterval(timeOut);
            if(getCookie("okutmanClose") && getCookie("okutmanClose")=="true")
            	hidePanels();
            pnlBody.getElementsByClassName("btnStop")[0].innerHTML = "baslat";
            i=-1;
            return;
        }
        while(n[i].length<=0)
            i++;
            
        var changeSame= "";
        while(n[i].split(" ")[0] == n[i+1]){
            //changeSame = "color:blue;";
            n[i+1] = n[i]+" "+n[i+1];
            i++;
        }
        pnlBody.getElementsByClassName("divText")[0].innerHTML =  n[i]; 
    	var textMeterFront = pnlBody.getElementsByClassName("textMeterFront")[0];
        textMeterFront.style.width = 150*(i+1)/n.length + "px";
    	//pnlBody.getElementsByClassName("btnStart")[0]
    
    	
}//}}}

var hidePanels = function(){//{{{
    clearInterval(timeOut);
    var pnl = document.getElementById("backPnl");
    pnl.style.display = "none";
    pnl = document.getElementById("whitPnl");   
    pnl.style.display = "none";
    document.body.parentNode.style.overflow = "auto";
}//}}}

function setCookie(c_name,value,exdays){//{{{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}//}}}

function getCookie(c_name){//{{{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}//}}}

function delCookie(name){//{{{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}//}}}





