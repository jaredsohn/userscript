// ==UserScript==
// @name        Bronibooru Image Viewer
// @namespace   tag:scottl@comcast.net,2012-05-21:bronibooru
// @description Custom View Gallery for Bronibooru
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @include     http://bronibooru.mlponies.com/post/show/*
// @version     1.01
// ==/UserScript==

// Insert some images
var thumbsUp = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%04%00%00%00J~%F5s%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09pHYs%00%00%CEa%00%00%CEa%01R8%CF!%00%00%00%07tIME%07%DC%05%12%04%08%0D*%B98%F9%00%00%01%D1IDAT8%CB%8D%93AHTQ%14%86%BF3%F3z%114Yf%894%0D%89%11%19Y%E1%22*%CAE%9B%DA%B4%D5v%81f-%A2%82%16%09n%AAm%B8%11%A2%5C%15%B6jQ%E0%A6(WS%E1%A2%2CJB%87%A06%232%C40EP%D68%CE%FB%5B%F8%9Cy%93W%C6sW%E7%F2%FF%E7%FE%FF9%E7%C2%8AP%DF%DB%FC%9BBpA%AC)%D4s%3D%40h%A0%A8%13k%A0%08%DD%8B%0B%A1%BD%D29%17%22V%0B%C7%9Fn5%00%B6%8B%1Fu%09%06%7B%1E%9FZ%04%60%FF%1F%F2u%E5%C0%F7%F7%BBD%80%D0H%5E%BB%EB%3B83%1C%C2%09%26%B3j%A8gw%DD%FC%BB%10.%A4%8C%1B%E5U%F5%EB%E8%D5C%CBY3l%D4m%FC%88Gc%DAF%2C%CA%CE%BC%DC%A1%E5%FA%04%DD%1A%D2%06%F9%95%E3%A9W%1A%0D%AD%02%E8%F4%90%AA%82%D0%03%A5%AA%F4%B0%C8%D3Oj%F00u%E6N%96%CB%8B%97o%40%E4%C5%CFtR%20%3A%EBF%3B%9C%E5%B7%CD_%19%1C%1EC%88%AC%A2%84%04%13%AC%A7X%B9%12M%B4%CC%D1%CB%CCO%E4%3A%FD%BA%E8%B8%7D%A6Xi%13%CE%1D%3B%C2%B8%A3%AB%0F%F1%A8Q%5E%8D1%FAxB9%D2%D5%B2%12v%ED%9BM%E9%A0s%90%9By%C5W%16*y%C01R%2F%82n%A6%E4%F6pK%5D%2B%DA%FAhN%CD%B1%D5V%A5%E9%FFe%15%7CI%E0%7B%AB%11%EEr%93IJ%A1A%E9%2F%FB%EC%FC%7Dr%1Er%9B%5E%20I%9AR%98%F9v%89%8E.%7B-%98M'%9D%1E%EE%A8%BDF%7F%A3%8A3%00%5E%F2%EC%C7%F1%D1%9D%25%83%98%3DOLXQK%8D.%B0%B5%E63%B6%B0d%CA%40%1E%DB%C25%3E%FEa0w%E0%17%00%5B%E8%20S%91%14W%5B%3A%D5%13%CF%C3%3F%B9%A7%09%F6f%E8%FEp%00%00%00%00IEND%AEB%60%82";
var thumbsDown = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%04%00%00%00J~%F5s%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09pHYs%00%00%CEa%00%00%CEa%01R8%CF!%00%00%00%07tIME%07%DC%05%12%04%08%1E%AE%07y'%00%00%01%D8IDAT8%CB%8D%93MHTQ%14%C7%7Fw%7CoL%0DDc%E8%C3I%8C%DC%0C%AE%AAU%98%12Af%8BH(%FA%80H)%92vB%12%B4%896%D1j6E%81%04%15-%5B%87%8Bv*%11%7D%B9%18%A7%14%8C%12%9C(j%AC%C0%A1b%5Ey%FF-%E6%EB%3D%7B%2F%FB%9F%DD%B9%F7%7F%CE%EF%9C%CB5%00%2B%89%C5%07o%F7%AE%18%00pI%91%E5%1B%00%EB%D9%3C%B3%E3%1A%8F%01%B0%E4%CDo%03P%9C%DC%D9%FB%9A%9A%F6%B0%9F%2B%00%82z%D3%AD%FE%82%15%B8%1A%CCm%E8%03%A08%DB*%2C%AADJ7EH%24%95%9B0%C2%A0%9E%EC%D4%18%1E%15%A4S%0C%F1%860e%E4%E0%7CO%DF%18%99%D5%3A%E2%A6D%E1%F2%9E8%112h%EB%D5e%AC%1F%08%A5t%2B%14%09e%14%C3%EB%2C%00%C6_%26%C1RT%07%1C%FB%F3xv%F7%96'%C4%AA%A98%DB%E9%8D6L%CF%8Fl%2C%A8%CE%A8%9A%AA%E3%08%3D%3C%8Cr%9CP%90%1F%A1m%BA%13%3E%83%CD(vz%15%3F%40%1FO%23v%E4.%3B%07%0F%E8%EE%C7%B6%A5%AAK%D4S%A4%3BxQ%ED%C6%60%18%A0%E32r%F2%E3I5%FA%A2I%03%BA%14%40i%D2%AF%85%DC%85%0F%17%B5K%065%8FgWO%D1%AE%7B%01%F2%B4%D4_%E9%0F%E8%FE%199%8AW%A3Ai%1D%F3%AD%A2Ms%93%FE%A7%06t%9E.j%7B%B5x%9C%DC%94%FCT.z%CE%DE%DEg%A6j%F3%84%AECs5%A0%1F%2F%E5%8A%7FJ%CD%2F%16%CBH%F6%BAt%88%B5%A4%CE%B1%7C%E9z%87%BEN%07)b%A1%8E%C4Lci%C2!Z%06%83%2F%1Bax%D5%00%E0p%F4%11%F3A%FEpC%CB%E7%F2g%EAZ%C03k%19%04%EF%0E%7B%00%A3b%C2%F0%1F%12v%F8%D9%97%E7y%9D%FD%FB%EC%0F%06%CB%12%80%E5%AEZ%A7%00%00%00%00IEND%AEB%60%82";
var magPlus = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%04%00%00%00J~%F5s%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09pHYs%00%00%15%CD%00%00%15%CD%01%16L%60%3F%00%00%00%07tIME%07%DC%05%12%04%09%14W%C9%A1x%00%00%01%93IDAT8%CB%8D%92%3Dk%14Q%18F%CFL%22%86%15%22%F8%11-%14T%14%11%ABD%026%0AAQ%2CR%88%DAi%E3%DAXK%88%08%92N%C5%C6%DAN%D2%05muU%D4%14%0A%F9%03%2B%C6F%D1JLDW%DC%A0%9B%EC%3D%163%3B.%DC%89%BB%CFm%A68gx%9F%FB%5EX%2F%5B%B8%C03%1A%AC%F1%99%FB%8C3%C0%7F3%C1%07%EC%3A%81%97%0C%AF%8F%9F%E9%80%83n4%C9%04y%CF%609%BE%95%9F%04B%EA%0D%9F%FB%C6%87Nv%94W%A4e%C2%1Cb%EA%A2%BA%EA%1F%DB%EAL%A6%B49%1A%E3%3B%900%E0%BC%AAw%DC%E3%82%AA%E7%B3!gc%E12%12%0E%D8RuJru%D9T%A4%11%CFt%08H%8E%B0%81%7BTy%0A%DC%A5%CA%02%9B%D8%0B2%1C%F7%1E%02%18%01%9E%F0%02%80%1Ap%9C1%86%20%A1%A4%F5%12%40%1D%B8E%8Ds%C0m%1Es%92%C02%40%88%3B%9CF%C2%88%DFU%BDVtx%9D%95~Wv%AD%BF%10o%AA%FA%C8%AA%8B%EA%0F7g%C2T%99P%CB%B6%7C%D1N%EA%1E%CC%F6%D0dW%8C%CF%E4%5B%15%F1%ACW%1D%FD%F7%A2%AE%C7%F8t%8E%87n-%FF%9A%8E%F1%2B%5D%E8%17%9A%B4s%A1%C5WNeH%D2%85_%E2%01%09%09%92%F0%891*%1Cc%3F%15%96%A83%CFj%FC%A4C%F1%F7%06%15z%E4%04%BF%8Bi%BF%B1%AF%17%3E%CAJQ%AD%C5%CE%5E%F8n%9A%C5%7D%AC0N%CF%A4%BC-%C69L_%D9%CEGd%8DI%FA%CE6%EAL%F4%03%FE%05%9C%1D%08%EE%5C%D91%02%00%00%00%00IEND%AEB%60%82";
var magMinus = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%04%00%00%00J~%F5s%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09pHYs%00%00%15%CD%00%00%15%CD%01%16L%60%3F%00%00%00%07tIME%07%DC%05%12%04%093%F2%C3%14%13%00%00%01oIDAT8%CB%95%93%CF%2B%04q%18%C6%3F%E3w6%91%E4%20%97%A5%A8%CD%81%94%83%5D%BFr%E0%E8%40%B9%B88%20%07%A5%90%1C%DC%F6%E2%E8%2Fpr%E0%0F%B0%85%A2%94D%B6%5C%94%03m)%07%8AZE~%CC%E3%F0%9D%99%9D%9D%5D%ED%EE3%B7w%3E%CFw%DE%F7%FD%3Ec%91_m%8C2D%13%2F%9Cr%C4%03%05%B4K%1Ay%CF%3B%FB%D4%FC%0F%D7p%87%B0%7D%06%1B%91%A4%F2%3F%C3%81A%BA%14%D7%8E%E2%8A%B8%963%CA%F3%E1%23%E6%D49e%B4j%2C6%13%F9%0C%8F%08%CD%FBp%5B%D2%8Ci%ED%22%17%EF%40(%A4%7Be%EBK%B5%C6R%0D%15Y%86%08%40%03a.9%C7r%8A%3DD%E9%E3DX%C48%CE6%D4%014%02%096%BD%E22Q%1A%C1%02%9A%83_H%03%BC%02%FD%ACP%E6%14%07LMX%3C%07g%E8D%D8!%A5%023%D8%BE%19%82zBh5kG%D2%82%C1%AF%F2%ADu%DD%DC%C3%92%EF%FC5%F7%1E%A6r%F1%C1L(%C2%DAVB%DBju%03r%E3%0D%E5%A9%97t%20E%99%2C%5DS%1F%C4%23%CE%2B%1B%F1%C1%A7%CF%F0%CD%11U.%E6%AE%B5%9Dc%00%04%D8%8C%F1%C18%DD4%F0F%92%C3%DCP%B48%CD%98v%86%0B%FD.%CD%DC%FA%DA%99%2C%84%D7%91*%05%87%3D%1F%BED%11%8A%F1%E3t%BFH%91%9A%E5%17%B1E%09%9Af%A3X%F4%0F'%EB%0BT%A5V%7C%F1%00%00%00%00IEND%AEB%60%82";
var zoomFit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFFRMOFnI4298AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAFdJREFUWMPt0jEKgDAMheEX6TlEzyconTxDp0IvnG7iBeQN/v+YJR8hEtHfi+Oq6QSUddutFyiSdNczXrOvL/Lsan3k4v4BAAAAAAAAAAAAOyBaHykiYxPpRgqBhuOymQAAAABJRU5ErkJggg==";
var zoomFill = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFFRMOJyPm2+UAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAFlJREFUWMPt17ENwCAMRNEzYg4U5osURJUZqJBYmBQMcUX+LeAny8U5dLLlSSSZAwBA3K1vJyCXq1o3kCXp7Y9l+JiLIwQAAAAAAAAAADiVbMzla8X8hr8HfIyPCZd/Ix/xAAAAAElFTkSuQmCC";
var zoomTrue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFFRMOAx/lPzQAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAFlJREFUWMNjYBgFo2CkA8bs/ML/A+kAFjkFxYENgs7+Sf8H0m4WItWS60hGQgqYBjoRjjpg1AGjDhh1wKgDRh0w6oABdwCxDRJGWjmAcSCbZKNgFDAwMDAAAD1wC9QYvU1/AAAAAElFTkSuQmCC";
var bgImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGDhYyG7kJtjgAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAHBJREFUGNOFzjEKwlAQhOFvE5RIQO0svYOl96/1BukttYkouDbvyRMEpxp2hn+HP4pqMnODES/MEXH9FEq4xxE9Tpgi4tIVwKoJ4YB1Zg5d867/MWFRC3PBVp3L7WvkDts6Ejc8ouVl5oAlEs+IuL8B6S0gLlEDPp8AAAAASUVORK5CYII=";
// Done with images

image = document.evaluate("//div[@id='right-col' and @class='content']/div/object/embed | //img[@id='image']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var realImgH = image.height;
var realImgW = image.width;
var custom = new customization();



$(document).ready(function(){
    bodyCSS();
    bgTexture(".2");
    moveImage();
    setUpNotes();
    adBox();
    dropDown();
    createBGConfig();
    liftUp();
    addButtons();
    addZoomIndicator();
    manipulateImage('fit');
    addSideBar();
    modifyNotice();
    moveStatusNotices();
});

function loadSettings(){
    //Customization Settings
    var contentBackground = "White";
    var indicatorOpacity = ".2";
    var background = "#444444";
    //var backgroundImage = GM_getValue('bgImg');
    var buttonBoxBG = "rgba(128,128,128,0.5)";
    //End Customization Settings
}

function customization(){
    this.contentBackground = "White";
    this.indicatorOpacity = ".2";
    this.background = "#444444";
    //this.backgroundImage = bgImage;
    this.buttonBoxBG = "rgba(128,128,128,0.5)";
}

function bodyCSS(){
    $("html").css("height","100%");
    $("html").css("width","100%");
    $("body").css("height","100%");
    $("body").css("width","100%");
    $("body").css("position","absolute");
    $("body").css("top","0px");
    $("body").css("background","#000000 fixed");
}

function bgTexture(opacity){
    bgTexture = document.createElement('div');
    $(bgTexture).css({
        'position':'fixed',
        'top':'0px',
        'left':'0px',
        'width':'100%',
        'height':'100%',
        'opacity':opacity,
        'backgroundImage':'url("'+bgImage+'")',
        'zIndex':'-1'
    });
    $("body").append(bgTexture);
}

function modifyNotice() {
    notice = document.getElementById("notice");
    makePopup(notice, {"top":"10%", "left":"10%", "close":true});
}


function makePopup(element, options) {
    element.style.padding = "3px"
    element.style.position = "fixed";
    element.style.left = options["left"];
    element.style.top = options["top"];
    element.style.zIndex = "2";
    //element.style.right = options["right"];
    //element.style.bottom = options["bottom"];
    element.style.border = "1px solid black";
    element.style.borderRadius = "5px";
    element.style.backgroundColor = custom.contentBackground;
    var elementID = element.id;
    if (options["close"] == true){
        element.addEventListener("click", function(){
            $("#"+elementID).hide();
        }, true);
    }    
}

function optional(option, def){
    if (optional){
        return optional;
    }
    return def;
}
function addSideBar (){
    var sideBar = document.createElement('div');
    sideBar.id = "sidebar";
    var sideBarIndicator = document.createElement('div');
    sideBarIndicator.id = "sideBarIndicator";
    var sideBarIndicatorText = document.createElement('div');
    sideBarIndicatorText.id = "sideBarIndicatorText";
    sideBarIndicatorText.innerHTML = "> <br /> > <br /> > <br /> >";
    var sideBarContent = document.createElement('div');
    sideBarContent.id = "sideBarContent";
    var clearer = document.createElement('div');
    clearer.style.clear = "both";
    $(".sidebar").width("100%");
    $(".sidebar").css("margin","0px");
    $(".sidebar").appendTo(sideBarContent);
    $("body").append(sideBar);
    sideBar.appendChild(sideBarContent);
    sideBar.appendChild(sideBarIndicator);
    sideBar.appendChild(clearer);
    sideBarIndicator.appendChild(sideBarIndicatorText);
    sideBar.style.position = "fixed";
    sideBar.style.height = "80%";
    sideBar.style.maxWidth = "30%";
    sideBar.style.left = "0";
    sideBarContent.style.overflow = "auto";
    sideBarContent.style.cssFloat = "left";
    sideBarContent.style.height = "100%";
    sideBarContent.style.backgroundColor = custom.contentBackground;
    sideBarContent.style.border = "1px solid gray";
    sideBarContent.style.borderRadius = "0px 5px 5px 0px";
    sideBarContent.style.padding = "3px";
    sideBarContent.style.overflow = "auto";
    sideBarIndicator.style.cssFloat = "left";
    sideBarIndicator.style.border = "1px solid gray";
    sideBarIndicator.style.borderRadius = "0px 5px 5px 0px";
    sideBarIndicator.style.backgroundColor = "LightGray";
    sideBarIndicator.style.opacity = custom.indicatorOpacity;
    sideBarIndicator.style.position = "relative";
    centerElementVerticalInWindow(sideBar);
    centerElementVertical(sideBarIndicator, sideBar);
    setSideBarEvents();
}

function centerElementVertical(target, parent){
    parentH = parent.offsetHeight;
    targetH = target.offsetHeight;
    target.style.top = (parentH/2) - (targetH/2)+"px";
}

function centerElementVerticalInWindow(target){
    winH = window.innerHeight;
    targetH = target.offsetHeight;
    target.style.top = (winH/2) - (targetH/2)+"px";
}

function setSideBarEvents(){
    $("#sidebar").hover(function(){
            $("#sideBarContent").fadeIn();
        }, function(){
            $("#sideBarContent").fadeOut();
        });
    $("#sideBarContent").fadeOut();
}

function dropDown (){
    var topBar = document.createElement('div');
    topBar.style.position="fixed";
    topBar.style.width="100%";
    topBar.style.zIndex="1";
    topBar.style.top="0px";
    topBar.style.left="0px";
    var newsTicker = document.getElementById('news-ticker');
    var siteTitle = document.getElementById('site-title');
    var navBar = document.getElementById('navbar');
    var subNavBar = document.getElementById('subnavbar');
    var topBarContents = document.createElement('div');
    topBarContents.style.backgroundColor=custom.contentBackground;
    topBarContents.id='topBarContents';
    topBarContents.style.borderBottom="1px solid black";
    topBarContents.appendChild(newsTicker);
    topBarContents.appendChild(siteTitle);
    topBarContents.appendChild(navBar);
    topBarContents.appendChild(subNavBar);
    topBar.appendChild(topBarContents);
    topBarContents.style.padding="3px";
    topBarContents.style.borderBottomRightRadius="5px";
    topBarContents.style.borderBottomLeftRadius="5px";
    $("#subnavbar.flat-list").css({
        'padding':'5px 20px 5px 15px',
        'background-color':'rgb(247,247,255)',
        'margin':'0px 0px 1em'
    });
    $("#navbar.flat-list").css({
        'padding':'5px 20px 2px 10px',
        'margin':'0px'
    });
    $("body").prepend(topBar);
    var topBarIndicator = document.createElement('div');
    topBarIndicator.id = "topBarIndicator";
    topBarIndicator.innerHTML = "...";
    topBarIndicator.style.margin="0px auto";
    topBarIndicator.style.textAlign='center';
    topBarIndicator.style.width='5%';
    topBarIndicator.style.borderBottom="1px solid gray";
    topBarIndicator.style.borderLeft="1px solid gray";
    topBarIndicator.style.borderRight="1px solid gray";
    topBarIndicator.style.borderBottomRightRadius="5px";
    topBarIndicator.style.borderBottomLeftRadius="5px";
    topBarIndicator.style.backgroundColor="LightGray";
    topBarIndicator.style.opacity=custom.indicatorOpacity;
    $(topBar).append(topBarIndicator);
    $(topBar).hover(function(){
            $("#topBarContents").stop().slideDown();
        }, function(){
            $("#topBarContents").slideUp();
    });
    $("#topBarContents").slideUp();
}

function liftUp (){
    var botBar = document.createElement('div');
    botBar.id="botBar";
    botBar.style.position = "absolute";
    botBar.style.zIndex = "2";
    botBar.style.maxHeight= "50%";
    botBar.style.overflow = "auto";
    botBar.style.width = "25%";
    botBar.style.bottom = "0";
    $("#comments").width("100%");
    var contents = document.getElementById("right-col");
    var botBarContents = document.createElement('div');
    botBarContents.appendChild(contents);
    botBarContents.id="botBarContents";
    botBarContents.style.padding="3px";
    botBarContents.style.overflow="auto";
    botBarContents.style.backgroundColor=custom.contentBackground;
    botBarContents.style.border="1px solid gray";
    botBarContents.style.borderRadius="5px";
    var botBarIndicator = document.createElement('div');
    botBarIndicator.id = "botBarIndicator";
    botBarIndicator.innerHTML = "...";
    botBarIndicator.style.margin="0px auto";
    botBarIndicator.style.textAlign='center';
    botBarIndicator.style.width='50%';
    botBarIndicator.style.borderTop="1px solid gray";
    botBarIndicator.style.borderLeft="1px solid gray";
    botBarIndicator.style.borderRight="1px solid gray";
    botBarIndicator.style.borderTopRightRadius="5px";
    botBarIndicator.style.borderTopLeftRadius="5px";
    botBarIndicator.style.backgroundColor="LightGray";
    botBarIndicator.style.opacity=custom.indicatorOpacity;
    $("body").append(botBar);    
    $("#botBar").append(botBarIndicator);
    $("#botBar").append(botBarContents);
    botBar.style.left = ((window.innerWidth/2)-(botBar.offsetWidth/2)) + "px";
    $("#botBar").hover(function(){
            $("#botBarContents").stop().slideDown();
        }, function(){
            $("#botBarContents").slideUp();
    });
    $("#botBarContents").slideUp();
}

function adBox(){
    var adBox = document.createElement("div");
    adBox.id = "adBox";
    var adBoxContent = document.createElement("div");
    adBoxContent.id = "adBoxContent";
    $("#content").append(adBox);
    var adBoxIndicator = document.createElement("div");
    adBoxIndicator.id = "adBoxIndicator";
    $("#adBox").append(adBoxIndicator);
    $("#adBox").append(adBoxContent);
    $(".help_fund_mlponies").appendTo(adBoxContent);
    adBox.style.position = "fixed";
    adBox.style.right = "0";
    adBox.style.top = "10%";
    adBoxContent.style.border = "1px solid gray";
    adBoxContent.style.cssFloat = "right";
    adBoxContent.style.backgroundColor = custom.contentBackground;
    adBoxContent.style.borderRadius = "0px 0px 0px 5px";
    adBoxIndicator.innerHTML = "< <br /> <";
    adBoxIndicator.style.cssFloat = "left";
    adBoxIndicator.style.border = "1px solid gray";
    adBoxIndicator.style.backgroundColor="LightGray";
    adBoxIndicator.style.borderTopLeftRadius="5px";
    adBoxIndicator.style.borderBottomLeftRadius="5px";
    adBoxIndicator.style.opacity=custom.indicatorOpacity;
    setTimeout(function(){setUpAdEvents();},2000);
}

function setUpAdEvents(){
    $("#adBox").hover(function(){
        $("#adBoxContent").stop().fadeIn();
    }, function (){
        $("#adBoxContent").stop().fadeOut();
    });
    $("#adBoxContent").stop().fadeOut();
}

function moveImage(){
    var postView = document.getElementById("post-view");
    var imageContainer = document.createElement('div');
    imageContainer.id = 'imageContainer';
    imageContainer.style.position = 'fixed';
    imageContainer.style.height = '100%';
    imageContainer.style.width = '100%';
    imageContainer.style.overflow = 'auto';
    imageContainer.style.left = '0px';
    imageContainer.style.top = '0px';
    imageContainer.style.zIndex = '0';	
    $("#content").append(imageContainer);
    $(imageContainer).append(image);
    //image.setAttribute('onclick','#');
}

function manipulateImage(zoom){
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    //var image = document.getElementById("image"); // Identify Image, this one is important
    image.style.position="absolute";
    image.style.zIndex="0";
    image.style.left="0px";
    image.style.top="0px";
    image.parentNode.style.overflow="auto";
    image.setAttribute('zoom', zoom);
    var imgH = image.height;
    var imgW = image.width; 
    if (zoom == 'fit'){
        zoomIndicateFit();
        if (imgH > winH && imgW <= winW){
            var ratio = winH/imgH;
            image.height=imgH*ratio;
            image.width=imgW*ratio;
            center(image);
            manipulateNotes(ratio);
        }
        if (imgW > winW && imgH <= winH){
            var ratio = winW/imgW;
            image.height=imgH*ratio;
            image.width=imgW*ratio;
            center(image);
            manipulateNotes(ratio);
        }
        if ((imgW > winW && imgH > winH) || (imgW <= winW && imgH <= winH)){
            var ratioH = winH/imgH;
            var ratioW = winW/imgW;
            if (ratioH < ratioW){
                var ratio = ratioH;
            } else {
                var ratio = ratioW;
            }
            image.height=imgH*ratio;
            image.width=imgW*ratio;
            center(image);
            manipulateNotes(ratio);
        }
    }
    if (zoom == 'fill'){
        zoomIndicateFill();
        if (imgH < winH && imgW >= winW){
            var ratio = winH/imgH;
            image.height=imgH*ratio;
            image.width=imgW*ratio;
            center(image);
            manipulateNotes(ratio);
        }
        if (imgW < winW && imgH >= winH){
            var ratio = winW/imgW;
            image.height=imgH*ratio;
            image.width=imgW*ratio;
            center(image);
            manipulateNotes(ratio);
        }
        if (imgW > winW && imgH > winH){
            var ratioH = winH/imgH;
            var ratioW = winW/imgW;
            if (ratioH > ratioW){
                var ratio = ratioH;
            } else {
                var ratio = ratioW;
            }
            image.height=imgH*ratio;
            image.width=imgW*ratio;
            center(image);
            manipulateNotes(ratio);
        }
    }
    if (zoom == 'true'){
        zoomIndicateTrue();
        image.height=realImgH;
        image.width=realImgW;
        center(image);
        manipulateNotesTrue();
    }
    
    image.parentNode.height = image.offsetTop + imgH;
    image.parentNode.width = image.offsetLeft + imgW;
}

function center(thisImage){
    var winH = window.innerHeight;
    var winW = window.innerWidth;    
    var imgH = thisImage.height;
    var imgW = thisImage.width;
    //var imgT;
    //var imgL;
    if ((winW/2)-(imgW/2)>=0){
        //imgL = (winW/2)-(imgW/2)+"px";
        thisImage.style.left = (winW/2)-(imgW/2)+"px";
    } else {
        //imgL = "0px";
        thisImage.style.left = "0px";
    }
    if ((winH/2)-(imgH/2)>=0){
        //imgT = (winH/2)-(imgH/2)+"px";
        thisImage.style.top = (winH/2)-(imgH/2)+"px";
    } else {
        //imgT = "0px";
        thisImage.style.top = "0px";
    }
    //$(thisImage).animate({left:imgL, top:imgT});
}

function addButtons(){
    var buttonBox = document.createElement('div');
    buttonBox.style.position="fixed";
    buttonBox.id = "buttonBox";
    buttonBox.style.zIndex = "1";
    /*var downVote = document.createElement('img');
    downVote.width = '24';
    downVote.height = '24';
    downVote.id = "downVote";
    downVote.src = thumbsDown;
    var upVote = document.createElement('img');
    upVote.width = '24';
    upVote.height = '24';
    upVote.id = 'upVote';
    upVote.src = thumbsUp;*/
    var zoomInB = document.createElement('img');
    zoomInB.width = '24';
    zoomInB.height = '24';
    zoomInB.id = 'zoomIn';
    zoomInB.src = magPlus;
    var zoomOutB = document.createElement('img');
    zoomOutB.width = '24';
    zoomOutB.height = '24';
    zoomOutB.id = 'zoomOut';
    zoomOutB.src = magMinus;
    document.body.appendChild(buttonBox);
    //buttonBox.appendChild(downVote);
    buttonBox.appendChild(zoomOutB);
    buttonBox.appendChild(zoomInB);
    //buttonBox.appendChild(upVote);
    buttonBox.style.border = "2px solid black";
    buttonBox.style.borderRadius = "12px";
    buttonBox.style.paddingLeft = "12px";
    buttonBox.style.paddingRight = "12px";
    buttonBox.style.backgroundColor = custom.buttonBoxBG;
    var BoxW = buttonBox.offsetWidth;
    var winH = window.innerHeight;
    var winW = window.innerWidth;   
    buttonBox.style.bottom = winH / 10 + "px";
    buttonBox.style.left = (winW/2) - (BoxW/2) + "px";
    $("#zoomOut").click(function (){zoomOut();});
    $("#zoomIn").click(function (){zoomIn();});
    $("#buttonBox").hover(function(){
        $("#buttonBox").stop().fadeTo('fast',1);
    }, function (){
        $("#buttonBox").stop().fadeTo(1000,.2);
    });
    $("#buttonBox").stop().fadeTo(1000,.2);
}

function addZoomIndicator(){
    var zoomIndicate = document.createElement('div');
    zoomIndicate.style.position='fixed';
    zoomIndicate.id = 'zoomIndicate';
    var zoomLevel = document.createElement('img');
    zoomLevel.width = '32';
    zoomLevel.height = '32';
    zoomLevel.id = 'zoomLevel';
    zoomLevel.src = zoomFit;
    document.body.appendChild(zoomIndicate);
    zoomIndicate.appendChild(zoomLevel);
    zoomIndicate.style.bottom = '0px';
    zoomIndicate.style.right = '0px';
}

function zoomIndicateFill(){
    zoom = document.getElementById('zoomLevel');
    zoom.src=zoomFill;
}

function zoomIndicateFit(){
    zoom = document.getElementById('zoomLevel');
    zoom.src=zoomFit;
}

function zoomIndicateTrue(){
    zoom = document.getElementById('zoomLevel');
    zoom.src=zoomTrue;
}

function zoomIn(){
    var zoom = image.getAttribute('zoom');
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    if (zoom == 'true'){
        if (realImgH <= winH && realImgW <= winW){
            manipulateImage('fit');
            return true;
        } else {
            manipulateImage('fill');
            return true;
        }
    }
    if (zoom == 'fit'){
        if ((realImgH > winH && realImgW <= winW) || (realImgH <= winH && realImgW > winW)){
            manipulateImage('true');
            return true;
        } else {
            manipulateImage('fill');
            return true;
        }
    }
    if (zoom == 'fill'){
        if (realImgH >= winH && realImgW >= winW){
            manipulateImage('true');
            return true;
        }
    }
}

function zoomOut(){
    var zoom = image.getAttribute('zoom');
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    if (zoom == 'true'){
        if (realImgH >= winH && realImgW >= winW){
            manipulateImage('fill');
            return true;
        } else {
            manipulateImage('fit');
            return true;
        }
    }
    if (zoom == 'fill'){
        if ((realImgH > winH && realImgW <= winW) || (realImgH <= winH && realImgW > winW)){
            manipulateImage('true');
            return true;
        } else {
            manipulateImage('fit');
            return true;
        }
    }
    if (zoom == 'fit'){
        if (realImgH <= winH && realImgW <= winW){
            manipulateImage('true');
            return true;
        }
    }
}

function upVote(){
    window.location.href = image.src;
}

function downVote(){
    window.open('','_parent','');
    window.close();
}

function setUpNotes(){
    $("#note-container").appendTo("#imageContainer");
    $("#note-container").css("position", "absolute");
    $.each($(".note-box"), function(i,element){	
        element.setAttribute('realW', element.offsetWidth);
        element.setAttribute('realH', element.offsetHeight);
        element.setAttribute('realT', element.style.top);
        element.setAttribute('realL', element.style.left);	
        element.style.zIndex = "5";
        element.style.border = "1px solid black";
        element.style.background = "none repeat scroll 0% 0% rgb(255, 255, 238)";
        element.style.position = "absolute";
        $(".note-corner").css("width","7px");
        $(".note-corner").css("height","7px");
        $(".note-corner").css("position","absolute");
        $(".note-corner").css("bottom","0px");
        $(".note-corner").css("right","0px");
        $(".note-corner").css("cursor","se-resize");
        $(".note-corner").css("background","none repeat scroll 0% 0% black");
        $(".note-body").css({"zIndex":"10", "visibility":"visible", "display":"none", "height":"auto", "background":"none repeat scroll 0% 0% rgb(255,255,238)", "border":"1px solid black", "max-width":"300px", "overflow":"auto", "padding":"5px", "min-height":"10px", "cursor":"pointer"});
    });  
}

function manipulateNotes(ratio){
    $("#note-container").css("top", $("#image").offset().top);
    $("#note-container").css("left", $("#image").offset().left);
    $.each($(".note-box"), function(i,element){
        var rW = parseInt(element.style.width,10);
        var rH = parseInt(element.style.height,10);
        var rT = parseInt(element.style.top,10);
        var rL = parseInt(element.style.left,10);
        element.style.top = (rT * ratio)+"px";
        element.style.left = (rL * ratio)+"px";
        element.style.height = (rH * ratio)+"px";
        element.style.width = (rW * ratio)+"px";
        var searchterm = "#"+ element.id + " + .note-body";
        $(searchterm).css({"top":element.style.top, "left":element.style.left, "position":"absolute"});
    });
}

function manipulateNotesTrue(){
    $("#note-container").css("top", $("#image").offset().top);
    $("#note-container").css("left", $("#image").offset().left);
    $.each($(".note-box"), function(i,element){
        element.style.top = element.getAttribute('realT');
        element.style.left = element.getAttribute('realL');
        element.style.height = element.getAttribute('realH')+"px";
        element.style.width = element.getAttribute('realW')+"px";
        var searchterm = "#"+ element.id + " + .note-body";
        $(searchterm).css({"top":element.style.top, "left":element.style.left, "position":"absolute"});
    });
}

function moveStatusNotices(){
    var statusContainer = document.createElement('div');
    var statusContent = document.createElement('div');
    var statusTab = document.createElement('div');
    statusContainer.id = "statusContainer";
    statusContent.id = "statusContent";
    statusTab.id = "statusTab";
    document.body.appendChild(statusContainer);
    $(statusContainer).append(statusTab);
    $(statusContainer).append(statusContent);
    $(".status-notice").appendTo(statusContent);
    $(statusContainer).css({
        'position':'fixed',
        'top':'25%',
        'right':'0px'
    });
    $(statusTab).css({
        'float':'left',
        'border':'1px solid black',
        'backgroundColor':'LightGray',
        'border-radius':'5px 0px 0px 5px',
        'opacity':custom.indicatorOpacity
    });
    $(statusContent).css({
        'float':'right',
        'border':'1px solid black',
        'backgroundColor':custom.contentBackground,
        'border-radius':'5px 0px 0px 5px'
    });
    statusTab.innerHTML = "< <br /> <";
    centerElementVertical(statusTab, statusContainer);
    if ($(statusContent).children().length > 0){
        setTimeout(function(){setUpStatusEvents();},2000);
    } else {
        statusTab.style.display = 'none';
        statusContent.style.display = 'none';
    }
}

function setUpStatusEvents(){
    $("#statusContainer").hover(function(){
        $("#statusContent").fadeIn();
    }, function (){
        $("#statusContent").fadeOut();
    });
    $("#statusContent").fadeOut();
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function createBGConfig(){
    var configBox = document.createElement('div');
    configBox.id = "BGConfigBox";
    $(configBox).css({
        'display':'none',
        'position':'fixed',
        'top':'25%',
        'right':'25%',
        'border':'1px solid black',
        'backgroundColor':custom.background
    });
    var closeLink = document.createElement('span');
    $(closeLink).css({
        'textColor':'red',
        'float':'right'
    });
    closeLink.innerHTML = "X";
    $(closeLink).click(function(){
        $(configBox).fadeOut();
    });
    var imgSelect = document.createElement('div');
    var imgInput = document.createElement('input');
    var imgInputLabel = document.createElement('label');
    var imgConfirm = document.createElement('input');
    $(imgSelect).append(imgInputLabel);
    $(imgSelect).append(imgInput);
    $(imgSelect).append(imgConfirm);
    imgInput.accept = "image/*";
    imgInput.type = "file";
    imgInput.name = "bgImg";
    imgInputLabel.innerHTML = "BG Image:";
    imgConfirm.type = "button";
    imgConfirm.value = "Accept";
    imgConfirm.name = "confirmBG";
    $(imgConfirm).click(function(){
        var img = document.createElement('img');
        img.src = imgInput.value;
        alert(img);
        var imgURL = getBase64Image(img);
        GM_setValue("bgImg", imgURL);
        loadSettings();
    });
    $(configBox).append(imgSelect);
    $(configBox).append(closeLink);
    $("body").append(configBox);
    var configLink = document.createElement('a');
    configLink.href = "#";
    configLink.id = "config";
    configLink.innerHTML = "Config";
    $(configLink).css({
        'fontColor':'red'
    });
    $(configLink).click(function(){
        $(configBox).fadeIn();
    });
    $("#subnavbar").append(configLink);
}