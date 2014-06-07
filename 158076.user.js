// ==UserScript==
// @name              MangaPlus
// @description       Load full chapters at mangahere,pangapanda, and mangafox.
// @version           5.5
// @require           http://code.jquery.com/jquery-1.9.0.js
// @require           http://www.appelsiini.net/download/jquery.viewport.mini.js
// @include           *mangahere.com/manga/*/*/*
// @include           *mangafox.me/manga/*/*
// @include           *mangapanda.com/*/*
// @icon              http://www.mangahere.com/favicon.ico
// @author            Ace Lawliet
// ==/UserScript==
//global varialbes
var server;
var imagePlaceHolder;
var chapterPages = new Array();
var currentPageId;
var loadFrom = 0;
var nextChapterURL;
var imgRegex;
var pageSelector;
//end of global varialbes

//add Scripts/buttons
window.onload=function(){var s = document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='http://code.jquery.com/jquery-1.9.0.js';void(0);};
$.getScript("http://www.appelsiini.net/download/jquery.viewport.mini.js");
$("body").append("<img id=\"scrolltop_btn\" class=\"mpbtn\" src=\"http://www.gdriveurl.com/?idl=113686280745&out=1\"style=\"right:5px;display:none\"></img>");$("#scrolltop_btn").click(function(){aniScroll(0)});;
//stuff

//end
$(document).ready(LoadPages());
function LoadPages(){
    init();
    createStyle();
    generateImageList();
    scrollEvents(); 
    loadNextPage();   
}

function init(){
    switch(window.location.host){
        case "www.mangahere.com":
            server = "mangahere";
            pageSelector = $(".readpage_top>.go_page>span.right>select");
            $('#right_skyscraper,#left_skyscraper,.admlmr.advimg72890.wid728_m5.bn,#MarketGid9493,.advimg300250.right,.left.widscreen,.footer_copy,.next_page,.prew_page,.zoomin_readimg,.zoomout_readimg').remove();
            imagePlaceHolder = document.getElementById("viewer");
            
            var pagesSelect = document.getElementsByClassName("wid60")[0];
            var chapterSelect = document.getElementById("top_chapter_list");
            
            for(var i=0;i<pagesSelect.length;i++){
                chapterPages[i] = pagesSelect[i].value;
            }
            currentPageId = pagesSelect.selectedIndex+1;
            var currChapId = chapterSelect.selectedIndex;
            imgRegex = /<img.*?src="(.*?)".*?id="image"(.*?)>/
            break;
        case "www.mangapanda.com" || "www.mangareader.net":
            server = "mangapanda";
            pageSelector = $("#pageMenu");
            $(".content-l-ad,.content-r-ad,#adtop,#adfooter").remove();
            imagePlaceHolder = document.getElementById("imgholder");
            
            var pagesSelect = document.getElementById("pageMenu");
            var chapterSelect = document.getElementById("chapterMenu");
            
            for(var i=0;i<pagesSelect.length;i++){
                chapterPages[i] = pagesSelect[i].value;
            }
            currentPageId = pagesSelect.selectedIndex+1;
            var currChapId = chapterSelect.selectedIndex;
            imgRegex = /<img.*?id="img".*?src="(.*?)"(.*?)>/
            break;
        case "mangafox.me":
            server = "mangafox";
            pageSelector = $("#top_bar>.r.m>.l>select");
            $(".ad,#footer").remove();
            imagePlaceHolder = document.getElementById("viewer");
            
            var tArray = (window.location.href+'/').match(/http:\/\/mangafox\.me\/manga\/([^\/]*)\/((?:v[^\/]*\/)?c[^\/]*)\/*(\d*)/);
            var mangaURL = tArray[1];
            var chapURL = tArray[2];
            var directoryURL = "http://mangafox.me/manga/"+mangaURL+"/";
            var pagesSelect = document.getElementsByTagName('select')[1];
            for(var i=0;i<pagesSelect.length-1;i++){
                chapterPages[i] = directoryURL+chapURL+'/'+(i+1)+'.html';
            }            
            currentPageId = pagesSelect.selectedIndex+1;
            
            var chapterSelect = document.getElementsByTagName('select')[0];
            var currChap = chapterSelect.selectedIndex;
            if(currChap+1<chapterSelect.length) nextChapterURL=directoryURL+chapterSelect.options[currChap+1].value+"/1.html";
            else nextChapterURL = chapterPages[pagesSelect.length-2];
            
            imgRegex = /<img.*?src="(.*?)".*?id="image".*?>/
            break;            
        default:
    }
    while(imagePlaceHolder.hasChildNodes()) imagePlaceHolder.removeChild(imagePlaceHolder.firstChild);imagePlaceHolder.id = "viewer";
}

function createStyle(){
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML += "body{background-image:url('http://goo.gl/mxVk9B?gdriveurl')}";
    style.innerHTML += "#viewer{width:890px;background-color:transparent;text-align:center;margin:auto;}#viewer>.page{margin:auto;width:100%;}";
    style.innerHTML += ".pageOptions{font-size:18px;color:white;font-weight:bold;background:green}#viewer img{margin:auto -50%;min-width:100%;max-width:150%;}";
    style.innerHTML += ".mpbtn{background:transparent no-repeat center;border:2px solid #fff;opacity:.7;width:50px;height:50px;border-radius:50%;position:fixed;bottom:40px;cursor:pointer}.mpbtn:hover{background-color:black;}";
    head.appendChild(style);
}

function generateImageList(){
    for(var i=loadFrom;i<chapterPages.length;i++){
        var ih = document.createElement("div");
        ih.id = "p"+(i+1);
        ih.setAttribute('class','page');
        ih.setAttribute('olink',chapterPages[i]);
        imagePlaceHolder.appendChild(ih);
        var pageNo = document.createElement("div");
        pageNo.setAttribute("class","pageOptions");
        ih.appendChild(pageNo);
        pageNo.innerHTML = "Page";
        pageSelector.clone().appendTo($("#p" + (i+1) + ">.pageOptions"));
        
        pageNo.innerHTML += "of " + chapterPages.length;
        $(".page>.pageOptions>select")[i].selectedIndex=i;
    }
}

function loadNextPage(){
    getChapterPage(loadFrom++,false);
}

function getChapterPage(i,r){
    if(i<chapterPages.length){
        $.ajax({
            type: "GET",
            url: chapterPages[i],
            complete:function(data){
                var oldElement = document.getElementById("l"+(i+1));
                if(oldElement!=null) oldElement.parentNode.removeChild(oldElement);                
                addImage(data.responseText.match(imgRegex)[1],i,r,chapterPages[i]);
            }
        });
    }
}

function addImage(imgPath, i, r, url){
    var ih = document.getElementById("p"+(i+1));
    var imgElement = document.createElement("img");
    imgElement.id = "i"+(i+1);
    if(!r){
        imgElement.addEventListener("load", loadNextPage, false);
    }
    imgElement.src = imgPath;
    ih.appendChild(imgElement);
    
    //scroll to page
    if((i+1)===currentPageId){       
        aniScroll($("#p"+(i+1)).offset().top)
    }
    /*if((i+1)===chapterPages.length){
        
    }*/
}

function aniScroll(dest){
    $('body').animate({scrollTop: dest}, 1500);
}

function scrollEvents(){
    var np;
    $(window).scroll(function(){
        var inview = $(".page:in-viewport")[0];
        if(inview==undefined)return;
        if($(window).scrollTop()>$(inview).offset().top-2){        
            if(np!=inview.id.substring(1)){
                history.pushState("","", $(inview).attr("olink"));
                np=inview.id.substring(1);
            }
            //alert("you are on page " + inview.id.substring(1))
        }
        if($(window).scrollTop()>$('#p2').offset().top){$('#scrolltop_btn').css('display', 'inline')}else{$('#scrolltop_btn').css('display', 'none')}
    })
    
    $(".page>.pageOptions>select").attr('onchange', '').change(function(){
        aniScroll($("#p" + (this.selectedIndex+1)).offset().top)
        this.selectedIndex=$(this).parent().parent().attr('id').substring(1)-1;
    });
}