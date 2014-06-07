// ==UserScript==
// @name           MangaReader.net :: Chapter Loader
// @namespace      http://www.mangareader.net/*
// @include        http://www.mangareader.net/*
// @include        http://www.mangafox.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// @resource       imgLoading                   http://i1208.photobucket.com/albums/cc379/EMPEROR00/38-1.png
// @resource       imgMangaFox                  http://i1208.photobucket.com/albums/cc379/EMPEROR00/mangaFoxlogo.png
// @resource       imgMangaReader               http://i1208.photobucket.com/albums/cc379/EMPEROR00/mangaReaderlogo.png
// @resource       imgNextChapter               http://i1208.photobucket.com/albums/cc379/EMPEROR00/next-icon1.png
// @resource       imgSettings                  http://i1208.photobucket.com/albums/cc379/EMPEROR00/system_preferences.png
// ==/UserScript==

var ChapterTitle = "";
var NumberOfBookmarks = 0;
var Interval = 10000;
var previousElem = null;
var eTimer = null;
var ImageSRCs = [];
var series_url = unsafeWindow.series_url;

var MouseDownOnMainForm = [];
var MouseOnInnerContent = [];
for (var index = 0; index < 5; index++) {
    MouseDownOnMainForm[index] = false;
    MouseOnInnerContent[index] = false;
}
var DifferenceX;
var DifferenceY;
var MouseMoveOutTimer = [];
var MouseMoveInTimer = [];
var ExampleButtonMouseMoveOutTimer = [];
var ExampleButtonMouseMoveInTimer = [];
var CurrentButtonNumberOrigin = 0;
var CurrentFormNumberOrigin = 0;
var imageElements = [];
var currentImageElement = 0;

var bookmarkedMangaList = [];

var selectChapter = ((document.domain == "www.mangareader.net") ? "chapterMenu" : "top_chapter_list");
var selectMangaPage = ((document.domain == "www.mangareader.net") ? "#pageMenu" : "#top_bar > div.right > div.left > select.middle");
var imageHolder = ((document.domain == "www.mangareader.net") ? "imgholder" : "viewer");

var USER_AGENT_NOT_FIREFOX3 = ((navigator.userAgent.toLowerCase().indexOf("firefox/3") != -1) ? false : true);

if (GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "null")
    GM_setValue("MangaReaderFullChapterLoader_LoadNextPage", false);

jQuery.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};

jQuery.fn.fadeToggle = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle'}, speed, easing, callback);
};

var Splittings = 0;
for (var index in location.href.split("/")) {
    Splittings++;
}

if (!(location.href == "http://www.mangareader.net/" || location.href == "http://www.mangareader.net/index.html" || (location.href.indexOf(".html") != -1 && Splittings == 5) || (location.href == "http://www.mangafox.com/" && location.href.indexOf(".html") == -1))) {
    AddPageLoadCount();
    CreateMainMenu(false);
    var sScriptContent = "document.onkeydown = null;" +
            "document.addEventListener('keypress',function(e)" +
            "{" +
            "  if (e.keyCode == 39){" +
            "      if (document.getElementById('" + selectChapter + "').options.length > 0)" +
            "      {" +
            "          if (document.getElementById('" + selectChapter + "').options.selectedIndex+1 < document.getElementById('" + selectChapter + "').options.length){" +
            "              window.location = series_url + '/' + document.getElementById('" + selectChapter + "').options[document.getElementById('" + selectChapter + "').options.selectedIndex+1].value;" +
            "          }" +
            "          else{" +
            "              alert('You are at the last chapter.');" +
            "          }" +
            "      }" +
            "      else{" +
            "          alert('Please wait till chapter list is loaded.');" +
            "      }" +
            "  }" +
            "  else if (e.keyCode == 37){" +
            "      if (document.getElementById('" + selectChapter + "').options.length > 0){" +
            "          if (document.getElementById('" + selectChapter + "').options.selectedIndex > 0){" +
            "              window.location = series_url + '/' + document.getElementById('" + selectChapter + "').options[document.getElementById('" + selectChapter + "').options.selectedIndex-1].value;" +
            "          }" +
            "          else{" +
            "              alert('You are at the first chapter.');" +
            "          }" +
            "      }" +
            "      else{" +
            "          alert('Please wait till chapter list is loaded.');" +
            "      }" +
            "  }" +
            "},false);";
    checkAndBookmarkThisPage();
    AddMyScripts(sScriptContent);
    //TO DO :: if chapter/images are to be loaded.
} else {
    //TO DO :: if only bookmarks are to be loaded.
    if (location.href == "http://www.mangareader.net/" || location.href == "http://www.mangafox.com/") {
        window.setInterval(UpdateChapterList, 120000);
    }

    CreateMainMenu(true);
    highlightTheMangas();
}

function CreateMainMenu(OnlyBookmarks) {
    if (! OnlyBookmarks && document.domain == "www.mangareader.net") {
        $("#pageMenu,#adtop,#adfooter,#selectpage,div.prevnext").hide();
        var TempChapterTitle = $("body > #container > #topchapter > #mangainfo > div").children("h1").html();
        for (index = 0; index < TempChapterTitle.length; index++)
            ChapterTitle += TempChapterTitle[index];
    }
    else if (! OnlyBookmarks && document.domain == "www.mangafox.com") {
        ChapterTitle = $("#back > a").html() + " " + $("#series > h1, #series > span > h1").html().substring($("#series > h1, #series > span > h1").html().lastIndexOf(" ") + 1);
    }
    //Outer Table Elements
    var divMainElement = document.createElement("table");
    var divMainElement_tbody = document.createElement("tbody");

    var tblInner = document.createElement("table");
    var tbdInner = document.createElement("tbody");
    var tbInner_tr = document.createElement("tr");
    var tbInner_td_1 = document.createElement("td");
    var tbInner_td_2 = document.createElement("td");
    tblInner.style.position = "relative";
    tblInner.style.top = "20px";

    var divMainElement_tr_1 = document.createElement("tr");
    var divMainElement_tr_2 = document.createElement("tr");
    var divMainElement_tr_3 = document.createElement("tr");
    var divMainElement_tr_4 = document.createElement("tr");
    var divMainElement_tr_5 = document.createElement("tr");

    var divMainElement_td_1 = document.createElement("td");
    var divMainElement_td_2 = document.createElement("td");
    var divMainElement_td_3 = document.createElement("td");
    divMainElement_td_3.style.height = "28px";
    var divMainElement_td_4 = document.createElement("td");
    divMainElement_td_4.style.height = "28px";
    var divMainElement_td_5 = document.createElement("td");

    var divBookmarkLayout = document.createElement("table");
    var divBookmarkLayout_tbody = document.createElement("tbody");

    var divBookmarkLayout_tr_1 = document.createElement("tr");
    var divBookmarkLayout_td_1 = document.createElement("td");
    var divBookmarkLayout_td_2 = document.createElement("td");
    //==End of outer loop elements
    //
    divMainElement.style.position = "fixed";
    divMainElement.style.width = "100px";
    divMainElement.style.height = "90px";
    divMainElement.style.borderRadius = "10px";
    divMainElement.style.top = (window.innerHeight - 100) / 2 + "px";
    divMainElement.style.right = "10px";

    //Combining the elements
    //outer elements
    divMainElement_tr_1.appendChild(divMainElement_td_1);
    divMainElement_tr_2.appendChild(divMainElement_td_2);
    divMainElement_tr_3.appendChild(divMainElement_td_3);
    divMainElement_tr_4.appendChild(divMainElement_td_4);
    divMainElement_tr_5.appendChild(divMainElement_td_5);

    divMainElement_tbody.appendChild(divMainElement_tr_1);
    divMainElement_tbody.appendChild(divMainElement_tr_2);
    divMainElement_tbody.appendChild(divMainElement_tr_3);
    divMainElement_tbody.appendChild(divMainElement_tr_4);
    divMainElement_tbody.appendChild(divMainElement_tr_5);

    divMainElement.appendChild(divMainElement_tbody);

    tbInner_tr.appendChild(tbInner_td_1);
    tbInner_tr.appendChild(tbInner_td_2);
    tbdInner.appendChild(tbInner_tr);
    tblInner.appendChild(tbdInner);

    divBookmarkLayout_tr_1.appendChild(divBookmarkLayout_td_1);
    divBookmarkLayout_tr_1.appendChild(divBookmarkLayout_td_2);
    divBookmarkLayout_tbody.appendChild(divBookmarkLayout_tr_1);
    divBookmarkLayout.appendChild(divBookmarkLayout_tbody);
    //=End of combinig elements

    var divShowBookmarksButton = document.createElement("div");
    divShowBookmarksButton.style.backgroundColor = "grey";
    divShowBookmarksButton.style.width = "100px";
    divShowBookmarksButton.style.height = "25px";
    divShowBookmarksButton.innerHTML = "<div style='position:relative;top:4px;'>BOOKMARKS</div>";
    divShowBookmarksButton.align = "center";
    //divShowBookmarksButton.style.display = "table-cell";
    divShowBookmarksButton.style.verticalAlign = "middle";
    divShowBookmarksButton.style.cursor = "pointer";
    divShowBookmarksButton.style.color = "white";
    divShowBookmarksButton.style.textShadow = "0px 0px 5px white";
    divShowBookmarksButton.style.borderRadius = "5px";

    var divAddBookmark = document.createElement("div");
    divAddBookmark.style.backgroundColor = "grey";
    divAddBookmark.style.width = "60px";
    divAddBookmark.style.height = "30px";
    divAddBookmark.innerHTML = "<div style='position:relative;top:6px;'>ADD</div>";
    divAddBookmark.align = "center";
    divAddBookmark.style.verticalAlign = "middle";
    divAddBookmark.style.cursor = "pointer";
    divAddBookmark.style.color = "white";
    divAddBookmark.style.textShadow = "0px 0px 5px white";

    var divSettings = document.createElement("div");
    divSettings.style.backgroundColor = ((GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "true") ? "gainsboro" : "grey");
    divSettings.style.width = "60px";
    divSettings.style.height = "42px";
    divSettings.innerHTML = "<div title='Settings' style='position:relative;top:6px;'><img title='Settings' style='position:relative;top:-9px;opacity:0.8;' src='" + GM_getResourceURL("imgSettings") + "'/></div>";
    divSettings.align = "center";
    divSettings.style.verticalAlign = "middle";
    divSettings.style.cursor = "pointer";
    divSettings.style.color = "white";
    divSettings.style.textShadow = "0px 0px 5px white";

    var divBookMarkListContainer = document.createElement("div");
    divBookMarkListContainer.style.backgroundColor = "grey";
    divBookMarkListContainer.style.width = (OnlyBookmarks) ? "300px" : "400px";
    divBookMarkListContainer.style.height = "200px";
    divBookMarkListContainer.align = "center";
    divBookMarkListContainer.style.position = "relative";
    divBookMarkListContainer.style.top = "10px";

    var divBookMarkList = document.createElement("div");
    divBookMarkList.style.backgroundColor = "dimgrey";
    divBookMarkList.style.width = (OnlyBookmarks) ? "290px" : "330px";
    divBookMarkList.style.height = "190px";
    divBookMarkList.align = "center";
    divBookMarkList.style.position = "relative";
    divBookMarkList.style.top = "5px";
    divBookMarkList.style.overflowY = "scroll";
    divBookMarkList.style.overflowX = "hidden";

    var divBookMarkListLayout = document.createElement("div");
    divBookMarkListLayout.style.backgroundColor = "gray0";
    divBookMarkListLayout.style.width = "320px";
    divBookMarkListLayout.style.height = "180px";
    //divBookMarkListLayout.align = "center";
    divBookMarkListLayout.style.position = "relative";
    divBookMarkListLayout.style.top = "5px";
    divBookMarkListLayout.style.left = (OnlyBookmarks) ? "-30px" : "0px";

    var divNextButton = document.createElement("div");
    divNextButton.style.backgroundColor = "grey";
    divNextButton.setAttribute("id", "btnNextChapter")
    divNextButton.style.width = "100px";
    divNextButton.style.height = "25px";
    divNextButton.innerHTML = "<div style='position:relative;top:4px;'>NEXT</div>";
    divNextButton.align = "center";
    divNextButton.style.verticalAlign = "middle";
    divNextButton.style.cursor = "pointer";
    divNextButton.style.position = "relative";
    divNextButton.style.top = "15px";
    divNextButton.style.color = "white";
    divNextButton.style.textShadow = "0px 0px 5px white";

    var divPreviousButton = document.createElement("div");
    divPreviousButton.style.backgroundColor = "grey";
    divPreviousButton.style.width = "100px";
    divPreviousButton.style.height = "25px";
    divPreviousButton.innerHTML = "<div style='position:relative;top:4px;'>PREVIOUS</div>";
    divPreviousButton.align = "center";
    divPreviousButton.style.verticalAlign = "middle";
    divPreviousButton.style.cursor = "pointer";
    divPreviousButton.style.position = "relative";
    divPreviousButton.style.top = "12px";
    divPreviousButton.style.color = "white";
    divPreviousButton.style.textShadow = "0px 0px 5px white";

    var divBookmarkSettings = document.createElement("div");
    divBookmarkSettings.style.backgroundColor = "grey";
    divBookmarkSettings.style.width = "100px";
    divBookmarkSettings.style.height = "25px";
    divBookmarkSettings.innerHTML = "<div style='position:relative;top:4px;'>PREVIOUS</div>";
    divBookmarkSettings.align = "center";
    divBookmarkSettings.style.verticalAlign = "middle";
    divBookmarkSettings.style.cursor = "pointer";
    divBookmarkSettings.style.position = "relative";
    divBookmarkSettings.style.top = "12px";
    divBookmarkSettings.style.color = "white";
    divBookmarkSettings.style.textShadow = "0px 0px 5px white";

    var divMangaReader = document.createElement("div");
    divMangaReader.style.backgroundColor = "grey";
    divMangaReader.setAttribute("id", "btnNextChapter")
    divMangaReader.style.width = "48px";
    divMangaReader.style.height = "48px";
    divMangaReader.innerHTML = "<img src='" + GM_getResourceURL("imgMangaReader") + "' width='40px' style='position:relative;top:9px;'/>";
    divMangaReader.align = "center";
    divMangaReader.style.verticalAlign = "middle";
    divMangaReader.style.cursor = "pointer";
    divMangaReader.style.position = "relative";
    divMangaReader.style.top = "15px";
    divMangaReader.style.color = "white";
    divMangaReader.style.textShadow = "0px 0px 5px white";

    var divMangaFox = document.createElement("div");
    divMangaFox.style.backgroundColor = "grey";
    divMangaFox.setAttribute("id", "btnNextChapter")
    divMangaFox.style.width = "48px";
    divMangaFox.style.height = "48px";
    divMangaFox.innerHTML = "<img src='" + GM_getResourceURL("imgMangaFox") + "' width='40px' style='position:relative;top:9px;'/>";
    divMangaFox.align = "center";
    divMangaFox.style.verticalAlign = "middle";
    divMangaFox.style.cursor = "pointer";
    divMangaFox.style.position = "relative";
    divMangaFox.style.top = "15px";
    divMangaFox.style.left = "-5px";
    divMangaFox.style.color = "white";
    divMangaFox.style.textShadow = "0px 0px 5px white";
    
    var lnkMangaFox = document.createElement("a");
    lnkMangaFox.href = "http://www.mangafox.com/";
    lnkMangaFox.title = "Go to Mangafox.com";

    var lnkMangaReader = document.createElement("a");
    lnkMangaReader.href = "http://www.mangareader.net/";
    lnkMangaReader.title = "Go to Mangareader.net";

    var btnConnectionSpeed = CreateButton((GM_getValue("MRFCL_sLT", "FAST").toUpperCase()));
    var btnAutomaticLoad = CreateButton(((GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "true") ? "YES" : "NO"));
    var btnSeparateMangaPage = CreateButton((GM_getValue("MRFCL_SMP", "NO").toUpperCase()));
    var btnFirstPartRightOrLeft = CreateButton((GM_getValue("MRFCL_FP", "RIGHT").toUpperCase()));
    var btnAutoBookmark = CreateButton((GM_getValue("MRFCL_AB", "OFF").toUpperCase()));
    var btnImportBookmarks = CreateButton("IMPORT");
    var btnExportBookmarks = CreateButton("EXPORT");

    var array = [
        [" Connection Speed                  : ",btnConnectionSpeed],
        [" Load Next Chapter Automatically   : ",btnAutomaticLoad],
        [" Separate Manga Page into 2        : ",btnSeparateMangaPage],
        [" First part should be [Right|Left] : ",btnFirstPartRightOrLeft],
        [" Manga Page Separator Offset       : ","<input type='text'id='txtSeparatorOffset' size='5' value='" + GM_getValue("MRFCL_SOV", 0) + "'/> <input type='button'id='btnSeparatorOffsetApply' value='Apply' height='20' style='height:25px;position:relative;top:2px;'/>"],
        [" Auto Bookmarking                  : ",btnAutoBookmark],
        [" Bookmark Related                    ",""],
        [btnImportBookmarks                     ,btnExportBookmarks]
    ];

    var settingsWindow = CreateTheWindow("Manga Reader Settings", 400, 480, 8, createTableWithArray(array, 2, 8));
    settingsWindow.style.visibility = "hidden";

    if (USER_AGENT_NOT_FIREFOX3) {
        divShowBookmarksButton.style.borderRadius = "5px";
        divShowBookmarksButton.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divAddBookmark.style.borderBottomRightRadius = "5px";
        divAddBookmark.style.borderTopRightRadius = "5px";
        divAddBookmark.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divPreviousButton.style.borderBottomRightRadius = "8px";
        divPreviousButton.style.borderBottomLeftRadius = "8px";
        divPreviousButton.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divNextButton.style.borderTopRightRadius = "8px";
        divNextButton.style.borderTopLeftRadius = "8px";
        divNextButton.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divMangaFox.style.borderRadius = "5px";
        divMangaFox.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divMangaReader.style.borderRadius = "5px";
        divMangaReader.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divBookMarkList.style.borderRadius = "5px";
        divBookMarkList.style.boxShadow = "inset 0px 0px 10px black,inset 0px 0px 5px black, inset 0px 0px 2px black, 0px 0px 2px white";
        divBookMarkListContainer.style.borderRadius = "5px";
        divBookMarkListContainer.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divSettings.style.borderBottomRightRadius = "5px";
        divSettings.style.borderTopRightRadius = "5px";
        divSettings.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
    }
    else {
        divShowBookmarksButton.style.MozBorderRadius = "5px";
        divShowBookmarksButton.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divAddBookmark.style.MozBorderRadiusBottomright = "5px";
        divAddBookmark.style.MozBorderRadiusTopright = "5px";
        divAddBookmark.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divPreviousButton.style.MozBorderRadiusBottomright = "8px";
        divPreviousButton.style.MozBorderRadiusBottomleft = "8px";
        divPreviousButton.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divNextButton.style.MozBorderRadiusTopright = "8px";
        divNextButton.style.MozBorderRadiusTopleft = "8px";
        divNextButton.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divMangaFox.style.MozBorderRadius = "5px";
        divMangaFox.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divMangaReader.style.MozBorderRadius = "5px";
        divMangaReader.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divBookMarkList.style.MozBorderRadius = "5px";
        divBookMarkList.style.MozBoxShadow = "inset 0px 0px 10px black,inset 0px 0px 5px black, inset 0px 0px 2px black, 0px 0px 2px white";
        divBookMarkListContainer.style.MozBorderRadius = "5px";
        divBookMarkListContainer.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
        divSettings.style.MozBorderRadiusBottomright = "5px";
        divSettings.style.MozBorderRadiusTopright = "5px";
        divSettings.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
    }

    document.getElementById("btnSeparatorOffsetApply").addEventListener("click", function() {
        var separatorOffset = document.getElementById("txtSeparatorOffset").value;
        separatorOffset = isNumber(separatorOffset);
        if (separatorOffset != "false") {
            GM_setValue("MRFCL_SOV", separatorOffset);
            var offsetValue = (parseInt(GM_getValue("MRFCL_SOV", 0)));
            $(".selectedElement").each(function() {
                this.childNodes[0].style.width = ((this.offsetWidth * 2) + offsetValue * 2) + "px";
            });
            $(".rejectedElement").each(function() {
                this.childNodes[0].style.width = ((this.offsetWidth * 2) + offsetValue * 2) + "px";
                this.childNodes[0].style.left = "-" + (this.offsetWidth - offsetValue) + "px";
            });
        }
        else {
            alert("The offset should be a negative or positive integer value.");
        }
    }, false);

    divShowBookmarksButton.addEventListener("mouseout", function() {
        divShowBookmarksButton.style.backgroundColor = "grey";
    }, false);

    divPreviousButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "darkgrey";
    }, false);

    divPreviousButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "grey";
    }, false);

    /*divPreviousButton.addEventListener("click",function()
     {
     this.style.backgroundColor = "pink";
     if (document.getElementById(selectChapter).options.length > 0)
     {
     if (document.getElementById(selectChapter).options.selectedIndex > 0)
     {
     document.getElementById(selectChapter).options.selectedIndex--;
     window.location = ((document.domain == "www.mangareader.net") ? (document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex].value) : (series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex].value + "/1.html"));
     }
     else
     alert("You are at the first chapter.");
     }
     else
     {
     alert("Please wait till chapter list is loaded.");
     }
     },false);*/

    divNextButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "darkgrey";
    }, false);

    divNextButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "grey";
    }, false);

    /*divNextButton.addEventListener("click",function()
     {
     this.style.backgroundColor = "pink";
     if (document.getElementById(selectChapter).options.length > 0)
     {
     if (document.getElementById(selectChapter).options.selectedIndex+1 < document.getElementById(selectChapter).options.length)
     {
     document.getElementById(selectChapter).options.selectedIndex++;
     window.location = ("http://www.mangareader.net"+((document.domain == "www.mangareader.net") ? (document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex].value) : (series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex].value + "/1.html")));
     }
     else
     alert("You are at the last chapter.");
     }
     else
     {
     alert("Please wait till chapter list is loaded.");
     }
     },false);*/

    divAddBookmark.addEventListener("mouseover", function() {
        this.style.backgroundColor = "dimgrey";
    }, false);

    divAddBookmark.addEventListener("mouseout", function() {
        this.style.backgroundColor = "grey";
    }, false);

    divAddBookmark.addEventListener("click", function() {
        this.style.backgroundColor = "black";
        AddBookMark(location.href, ChapterTitle);
    }, false);

    btnConnectionSpeed.addEventListener("click", function() {
        GM_setValue("MRFCL_sLT", ((GM_getValue("MRFCL_sLT", "FAST") == "FAST") ? "SLOW" : "FAST"));
        $(this).children("div").html((GM_getValue("MRFCL_sLT", "FAST").toUpperCase()));
    }, false);

    divSettings.addEventListener("mouseover", function() {
        this.style.backgroundColor = "gainsboro";
    }, false);

    divSettings.addEventListener("mouseout", function() {
        this.style.backgroundColor = "dimgrey";
    }, false);

    divSettings.addEventListener("click", function() {
        settingsWindow.style.visibility = "visible";
    }, false);

    btnAutoBookmark.addEventListener("click", function() {
        GM_setValue("MRFCL_AB", ((GM_getValue("MRFCL_AB", "OFF") == "OFF") ? "ON" : "OFF"));
        $(this).children("div").html(GM_getValue("MRFCL_AB", "OFF"));
    }, false);

    btnAutomaticLoad.addEventListener("click", function() {
        if (GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "false") {
            $(this).children("div").html("YES");
            GM_setValue("MangaReaderFullChapterLoader_LoadNextPage", "true")
        }
        else {
            $(this).children("div").html("NO");
            GM_setValue("MangaReaderFullChapterLoader_LoadNextPage", "false")
        }
    }, false);

    btnSeparateMangaPage.addEventListener("click", function() {
        GM_setValue("MRFCL_SMP", ((GM_getValue("MRFCL_SMP", "YES") == "YES") ? ("NO") : ("YES")));
        $(this).children("div").html(GM_getValue("MRFCL_SMP", "YES"));
    }, false);

    btnFirstPartRightOrLeft.addEventListener("click", function() {
        GM_setValue("MRFCL_FP", ((GM_getValue("MRFCL_FP", "RIGHT") == "RIGHT") ? ("LEFT") : ("RIGHT")));
        $(this).children("div").html(GM_getValue("MRFCL_FP", "RIGHT"));
    }, false);

    divShowBookmarksButton.addEventListener("click", function() {
        this.style.backgroundColor = "pink";
        $(divBookMarkListContainer).slideFadeToggle("slow");
    }, false);

    btnImportBookmarks.addEventListener("click", function() {
        $(this).children("div").html("<img src='" + GM_getResourceURL("imgLoading") + "'>");
        importBookmarks(this);
    }, false);

    btnExportBookmarks.addEventListener("click", function() {
        $(this).children("div").html("<img src='" + GM_getResourceURL("imgLoading") + "'>");
        exportBookmarks(this);
    }, false);

    var tblBookmarksContainer = document.createElement("table");
    tblBookmarksContainer.setAttribute("id", "tblBookmarks");

    divMainElement_td_1.align = "right";
    divMainElement_td_3.align = "right";
    divMainElement_td_4.align = "right";
    divMainElement_td_5.align = "right";
    divMainElement_td_1.appendChild(divShowBookmarksButton);
    divMainElement_td_2.appendChild(divBookMarkListContainer);
    divBookMarkListLayout.appendChild(tblBookmarksContainer);
    divBookMarkList.appendChild(divBookMarkListLayout);
    divBookmarkLayout_td_1.appendChild(divBookMarkList);
    if (! OnlyBookmarks) {
        divBookmarkLayout_td_2.appendChild(divAddBookmark);
        $(divBookmarkLayout_td_2).append("<br/>");
        divBookmarkLayout_td_2.appendChild(divSettings);
    }
    divBookMarkListContainer.appendChild(divBookmarkLayout);
    if (! OnlyBookmarks) {
        var nextLink = "";
        var prevLink = "";

        if (document.domain == "www.mangareader.net") {
            if ($(".chapternav_next:contains('Next Chapter:')") != undefined && $(".chapternav_next:contains('Next Chapter:')") != null)
                nextLink = $(".chapternav_next:contains('Next Chapter:')").parent().parent().children("td:not('.c4')").children("a").attr("href");
            if ($(".chapternav_next:contains('Previous Chapter:')") != undefined && $(".chapternav_next:contains('Previous Chapter:')") != null)
                prevLink = $(".chapternav_next:contains('Previous Chapter:')").parent().parent().children("td:not('.c4')").children("a").attr("href");
        }
        else {
            if (document.getElementById(selectChapter).options.selectedIndex < document.getElementById(selectChapter).options.length - 1)
                nextLink = "http://" + document.domain + series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex + 1].value + "/1.html";
            if (document.getElementById(selectChapter).options.selectedIndex > 0)
                prevLink = "http://" + document.domain + series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex - 1].value + "/1.html";
        }
        var nextElement = document.createElement("a");

        nextElement.appendChild(divNextButton);
        divMainElement_td_3.appendChild(nextElement);

        var prevElement = document.createElement("a");
        prevElement.appendChild(divPreviousButton);
        divMainElement_td_4.appendChild(prevElement);

        nextElement.addEventListener("mouseup", function(e) {
            if (e.button == 2) return false;
            divNextButton.style.backgroundColor = "pink";
            if (document.getElementById(selectChapter).options.length >= 0) {
                if (document.getElementById(selectChapter).options.selectedIndex >= document.getElementById(selectChapter).options.length - 1) {
                    alert("You are at the last chapter.");
                    return false;
                }
                this.href = nextLink;
            }
            else {
                alert("Please wait till chapter list is loaded.");
                return false;
            }
            return true;
        }, false);

        prevElement.addEventListener("mouseup", function(e) {
            if (e.button == 2)return false;
            divPreviousButton.style.backgroundColor = "pink";
            if (document.getElementById(selectChapter).options.length > 0) {
                if (document.getElementById(selectChapter).options.selectedIndex == 0) {
                    alert("You are at the first chapter.");
                    return false
                }
                this.href = prevLink;
            }
            else {
                alert("Please wait till chapter list is loaded.");
                return false
            }
            return true;
        }, false);
    }
    lnkMangaFox.appendChild(divMangaFox);
    lnkMangaReader.appendChild(divMangaReader);
    tbInner_td_1.appendChild(lnkMangaFox);
    tbInner_td_2.appendChild(lnkMangaReader);
    //divMainElement_td_5.appendChild(tblInner);
    divMainElement_td_5.style.height = "50px";
    divMainElement_td_1.style.height = "20px";
    document.body.appendChild(divMainElement);
    document.body.appendChild(tblInner);
    tblInner.style.position = "fixed";
    tblInner.style.right = "10px";
    tblInner.style.top = (window.innerHeight - 70) + "px";
    $(divBookMarkListContainer).slideFadeToggle("fast");

    ArrangeBookmarksInOrder();
    AddBookmarksToTheTable(OnlyBookmarks);
    if (!OnlyBookmarks)
        GetAndPutTheImagesInPlaces();
}

function ArrangeBookmarksInOrder() {
    //checkForRedundentData();
    for (NumberOfBookmarks = 0; NumberOfBookmarks < 200; NumberOfBookmarks++) {
        if (GM_getValue("MangaRederFCL_Bookmark" + NumberOfBookmarks, "null") == "null" || GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null") == "null")
            return;
        bookmarkedMangaList[NumberOfBookmarks] = GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null").substring(0, GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null").lastIndexOf(" "));
    }
}

function checkForRedundentData() {
    for (var NumberOfBookmarks = 0; NumberOfBookmarks < 99; NumberOfBookmarks++) {
        for (var iNumberOfBookmarks = NumberOfBookmarks + 1; iNumberOfBookmarks < 100; iNumberOfBookmarks++) {
            if (!((GM_getValue("MangaRederFCL_Bookmark" + NumberOfBookmarks, "null") == "null" || GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null") == "null") || (GM_getValue("MangaRederFCL_Bookmark" + NumberOfBookmarks, "null") == "null" || GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null") == "null"))) {
                if (GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null").substring(0, GM_getValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks, "null").lastIndexOf(" ")) == GM_getValue("MangaRederFCL_BookmarkName" + iNumberOfBookmarks, "null").substring(0, GM_getValue("MangaRederFCL_BookmarkName" + iNumberOfBookmarks, "null").lastIndexOf(" "))) {
                    GM_setValue("MangaRederFCL_BookmarkName" + iNumberOfBookmarks, "null");
                }
            }
        }
    }
}

function AddBookmarksToTheTable(OnlyBookmarks) {
    var tblBookmarksList = document.getElementById("tblBookmarks");
    tblBookmarksList.style.width = (OnlyBookmarks) ? "280px" : "320px";
    tblBookmarksList.style.height = "auto";
    tblBookmarksList.style.top = "0px";
    tblBookmarksList.style.position = "relative";
    tblBookmarksList.style.left = "5px";
    tblBookmarksList.innerHTML = "";

    var tbodyBookmarkList = document.createElement("tbody");
    tbodyBookmarkList.setAttribute("id", "tbodyBookmarkList");
    for (var Index = 0; Index < NumberOfBookmarks; Index++) {
        var TableTR = document.createElement("tr");
        var TableTD = document.createElement("td");
        TableTD.setAttribute("id", "tdBookmark_" + Index);
        TableTD.style.cursor = "pointer";
        TableTD.style.fontSize = "15px";
        TableTD.style.height = "20px";
        TableTD.style.border = "1px gainsboro";

        var divPerElement = document.createElement("div");
        divPerElement.style.color = "dimgrey";
        if (USER_AGENT_NOT_FIREFOX3) {
            divPerElement.style.boxShadow = "0px 0px 2px black, inset 0px 0px 2px white";
            divPerElement.style.borderRadius = "5px";
        }
        else {
            divPerElement.style.MozBoxShadow = "0px 0px 2px black, inset 0px 0px 2px white";
            divPerElement.style.MozBorderRadius = "5px";
        }

        var BookmarkLocation = (GM_getValue("MangaRederFCL_Bookmark" + Index, "-").indexOf("|") == -1) ? GM_getValue("MangaRederFCL_Bookmark" + Index, "-") : ((GM_getValue("MangaRederFCL_Bookmark" + Index, "-").split("|"))[0]);
        var NextChapterLocation = (GM_getValue("MangaRederFCL_Bookmark" + Index, "-").indexOf("|") == -1) ? "NONE" : ((GM_getValue("MangaRederFCL_Bookmark" + Index, "-").split("|"))[1]);

        divPerElement.innerHTML = "<a style='color:gainsboro;font-family:calibri;font-size:15px' href=" + BookmarkLocation + ">" + " &nbsp;- " + GM_getValue("MangaRederFCL_BookmarkName" + Index, "-").substring() + "</a>" + ((NextChapterLocation == "NONE") ? "" : ("&nbsp;&nbsp;<a style='color:gainsboro;position:relative;top:-1px;' href=" + NextChapterLocation + "><img src='" + GM_getResourceURL("imgNextChapter") + "' height='10px'></a>"));

        TableTD.appendChild(divPerElement);
        $(TableTD).bind("click", function() {
            location.href = GM_getValue("MangaRederFCL_Bookmark" + $(this).attr('id').substring($(this).attr('id').indexOf("_") + 1, $(this).attr('id').length));
        });
        $(divPerElement).bind("mouseover", function() {
            this.style.backgroundColor = "darkgrey";
        });
        $(divPerElement).bind("mouseout", function() {
            this.style.backgroundColor = "dimgrey";
        });
        TableTR.appendChild(TableTD);
        tbodyBookmarkList.appendChild(TableTR);
    }
    tblBookmarksList.appendChild(tbodyBookmarkList);
}

function AddBookMark(sLocation, sChapterTitle) {
    ArrangeBookmarksInOrder();
    var SelectedString = "";
    if (sLocation.toLowerCase() == "null" || sLocation == "")
        SelectedString = location.href + ((document.getElementById(selectChapter).options.selectedIndex + 1 < document.getElementById(selectChapter).options.length) ? ("|http://" + document.domain + ((document.domain == "www.mangareader.net") ? (document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex + 1].value) : (series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex + 1].value + "/1.html"))) : "");
    else
        SelectedString = sLocation;
    for (Index = 0; Index < NumberOfBookmarks; Index++) {
        if (GM_getValue("MangaRederFCL_Bookmark" + Index, "null") == sLocation && GM_getValue("MangaRederFCL_BookmarkName" + Index, "null") == sChapterTitle) {
            return;
        }
        else if (GM_getValue("MangaRederFCL_BookmarkName" + Index, "null").substring(0, GM_getValue("MangaRederFCL_BookmarkName" + Index, "null").lastIndexOf(" ")) == sChapterTitle.substring(0, sChapterTitle.lastIndexOf(" "))) {
            GM_setValue("MangaRederFCL_Bookmark" + Index, SelectedString);
            GM_setValue("MangaRederFCL_BookmarkName" + Index, sChapterTitle);
            $("#tblBookmarks").children().remove();
            AddBookmarksToTheTable(false);
            return;
        }
    }
    GM_setValue("MangaRederFCL_Bookmark" + NumberOfBookmarks, SelectedString);
    GM_setValue("MangaRederFCL_BookmarkName" + NumberOfBookmarks++, sChapterTitle);
    $("#tblBookmarks").children().remove();
    AddBookmarksToTheTable(false);
}

function GetAndPutTheImagesInPlaces() {
    var Image = $("#" + imageHolder).children("a").children("img");
    Image.css("cursor", "default");
    $("#" + imageHolder).children().remove();
    document.getElementById(imageHolder).align = "center";
    document.getElementById(imageHolder).style.backgroundColor = "black";
    document.getElementById(imageHolder).style.width = "auto";
    var CurrentImage = 0;
    var PageURL_List = $(selectMangaPage).children();
    currentImageElement = 0;
    var width_ = 0;
    PageURL_List.each(function() {
        var pageURL = ((document.domain == "www.mangareader.net") ? ("http://" + document.domain + this.value) : (location.href.substring(0, location.href.lastIndexOf("/") + 1) + this.value + ".html"));
        if (GM_getValue("MRFCL_sLT", "NULL") == "NULL")
            GM_setValue("MRFCL_sLT", "FAST");

        if (GM_getValue("MRFCL_sLT").toUpperCase() == "SLOW") {
            if (document.getElementById("divLoadDetails"))
                document.getElementById("divLoadDetails").innerHTML = "Loading 1 / " + PageURL_List.length;
            ImageSRCs[CurrentImage++] = pageURL;
        }
        else if (GM_getValue("MRFCL_sLT").toUpperCase() == "FAST") {
            if (GM_getValue("MRFCL_SMP", "NO") == "YES") {
                var offsetValue = (parseInt(GM_getValue("MRFCL_SOV", 0)));

                var ImageContainer_Right = document.createElement("div");
                ImageContainer_Right.style.position = "relative";
                ImageContainer_Right.style.top = "20px";
                ImageContainer_Right.style.paddingTop = "20px";
                ImageContainer_Right.style.overflow = "hidden";
                ImageContainer_Right.style.color = "white";

                var ImageContainer_Left = document.createElement("div");
                ImageContainer_Left.style.position = "relative";
                ImageContainer_Left.style.top = "20px";
                ImageContainer_Left.style.paddingTop = "20px";
                ImageContainer_Left.style.overflow = "hidden";
                ImageContainer_Left.style.color = "white";

                var CI = CurrentImage;
                imageElements[CI + 1] = null;

                if (location.href != pageURL) {
                    $(ImageContainer_Right).load(pageURL + " #" + imageHolder + " > a > img, #" + imageHolder + " > img", function() {
                        previousElem = ImageContainer_Right.childNodes[0];
                        ImageContainer_Right.style.width = (width_ / 2) + "px";
                        ImageContainer_Right.style.overflow = "hidden";
                        ImageContainer_Right.className = "selectedElement";

                        ImageContainer_Left.style.overflow = "hidden";
                        ImageContainer_Left.className = "rejectedElement";
                        ImageContainer_Left.innerHTML = ImageContainer_Right.innerHTML;
                        imageElements[currentImageElement++] = ImageContainer_Right.childNodes[0];

                        ImageContainer_Right.childNodes[0].style.width = width_ + "px";
                        ImageContainer_Right.childNodes[0].style.position = "relative";

                        $(ImageContainer_Right.childNodes[0]).attr("id", "Image" + CurrentImage);
                        $(ImageContainer_Left.childNodes[0]).attr("id", "Image" + (++CurrentImage));

                        ImageContainer_Left.childNodes[0].style.width = width_ + "px";
                        ImageContainer_Left.childNodes[0].style.position = "relative";
                        ImageContainer_Left.childNodes[0].style.left = "-" + (width_ / 2) + "px";

                        ImageContainer_Right.style.left = ((document.body.offsetWidth - (width_ / 2)) / 2) + "px";
                        ImageContainer_Right.style.left = ((document.body.offsetWidth - (width_ / 2)) / 2) + "px";
                        var tstTimer = setInterval(function() {
                            if (ImageContainer_Right.childNodes[0].complete) {
                                clearInterval(tstTimer);
                                tstTimer = null;
                                var inWidth = ImageContainer_Right.childNodes[0].naturalWidth;
                                if (inWidth > document.getElementById("Image0").naturalWidth) {
                                    document.getElementById("Image0").parentNode.style.height = "0px";
                                    document.getElementById("Image1").style.width = document.getElementById("Image1").naturalWidth + "px";
                                    document.getElementById("Image1").parentNode.style.width = document.getElementById("Image1").naturalWidth + "px";
                                    document.getElementById("Image1").parentNode.style.left = ((document.body.offsetWidth - (document.getElementById("Image1").naturalWidth / 2)) / 2) + "px";
                                    document.getElementById("Image1").style.left = "0px";
                                }
                                ImageContainer_Right.style.width = (inWidth / 2) + "px";
                                ImageContainer_Left.style.width = (inWidth / 2) + "px";
                                ImageContainer_Right.childNodes[0].style.width = inWidth + "px";
                                ImageContainer_Left.childNodes[0].style.width = inWidth + "px";
                                ImageContainer_Left.childNodes[0].style.left = "-" + (inWidth / 2) + "px";
                                ImageContainer_Right.style.left = ((document.body.offsetWidth - (inWidth / 2)) / 2) + "px";
                                ImageContainer_Left.style.left = ((document.body.offsetWidth - (inWidth / 2)) / 2) + "px";
                            }
                        }, 500);
                    });
                }
                else {
                    ImageContainer_Right.innerHTML = Image.parent().html();

                    width_ = Image.attr("naturalWidth");

                    ImageContainer_Right.style.width = (Image.attr("naturalWidth") / 2) + "px";
                    ImageContainer_Right.style.overflow = "hidden";
                    ImageContainer_Right.className = "selectedElement";
                    ImageContainer_Left.style.overflow = "hidden";
                    ImageContainer_Left.className = "rejectedElement";

                    ImageContainer_Left.innerHTML = ImageContainer_Right.innerHTML;
                    imageElements[currentImageElement++] = ImageContainer_Right.childNodes[0];
                    ImageContainer_Right.childNodes[0].style.width = Image.attr("naturalWidth") + "px";
                    $(ImageContainer_Right.childNodes[0]).attr("id", "Image" + CurrentImage);
                    $(ImageContainer_Left.childNodes[0]).attr("id", "Image" + (++CurrentImage));

                    ImageContainer_Left.childNodes[0].style.width = Image.attr("naturalWidth") + "px";
                    ImageContainer_Left.childNodes[0].style.position = "relative";
                    ImageContainer_Left.childNodes[0].style.left = "-" + (Image.attr("naturalWidth") / 2) + "px";

                    ImageContainer_Right.style.left = ((document.body.offsetWidth - (Image.attr("naturalWidth") / 2)) / 2) + "px";
                    ImageContainer_Left.style.left = ((document.body.offsetWidth - (Image.attr("naturalWidth") / 2)) / 2) + "px";
                }
                if (PageURL_List.length == CurrentImage + 1) {
                    var MAX = PageURL_List.length;
                    var timerObject = setInterval(function() {
                        var numberOfElementsCompleted = 0;
                        for (var i = 0; i < MAX; i++) {
                            if (imageElements[i] != null && ((imageElements[i].toString() == "[object Object]" && imageElements[i].attr("complete")) || (imageElements[i].toString() != "[object Object]" && imageElements[i].complete))) {
                                /**/
                                if ((imageElements[i].toString() != "[object Object]" && typeof imageElements[i].naturalWidth != "undefined" && imageElements[i].naturalWidth == 0) /*|| (imageElements[i].toString() == "[object Object]" && typeof imageElements[i].attr("naturalWidth") != "undefined" && imageElements[i].attr("naturalWidth") == 0)*/) {
                                    imageElements[i].src = imageElements[i].src;
                                }
                                else      /**/
                                    numberOfElementsCompleted++;
                            }
                        }
                        document.getElementById("divLoadDetails").innerHTML = "Completed Loading " + (numberOfElementsCompleted) + " / " + MAX;
                        if (numberOfElementsCompleted == MAX) {
                            clearInterval(timerObject);
                            timerObject = null;
                            document.getElementById("divLoadDetails").style.backgroundColor = "LimeGreen";
                            document.getElementById("divLoadDetails").style.color = "white";
                            if (document.getElementById(selectChapter).options.selectedIndex >= 0 && GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "true") {
                                var nextLink = "";
                                if (document.domain == "www.mangareader.net") {
                                    if ($(".chapternav_next:contains('Next Chapter:')") != undefined && $(".chapternav_next:contains('Next Chapter:')") != null) {
                                        nextLink = $(".chapternav_next:contains('Next Chapter:')").parent().parent().children("td:not('.c4')").children("a").attr("href");
                                        //nextLink = location.href.indexOf.subtring(0,location.href.indexOf(nextLink.substring(0,nextLink.substring(1).indexOf("/")+1))) + "/" + nextLink;
                                    }
                                }
                                else {
                                    if (document.getElementById(selectChapter).options.selectedIndex < document.getElementById(selectChapter).options.length - 1)
                                        nextLink = "http://" + document.domain + series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex + 1].value + "/1.html";
                                }
                                GM_openInTab(nextLink);
                            }
                        }
                    }, 500);
                }

                CurrentImage ++;
                var selectedElement = ((GM_getValue("MRFCL_FP", "RIGHT") == "RIGHT") ? ImageContainer_Right : ImageContainer_Left);
                var rejectedElement = ((GM_getValue("MRFCL_FP", "RIGHT") == "RIGHT") ? ImageContainer_Left : ImageContainer_Right);
                $("#" + imageHolder).append(rejectedElement);
                $("#" + imageHolder).append(selectedElement);
            }
            else {
                if (location.href != pageURL) {
                    var ImageContainer = document.createElement("div");
                    ImageContainer.style.position = "relative";
                    ImageContainer.style.top = "20px";
                    ImageContainer.style.overflow = "visible";
                    ImageContainer.style.paddingTop = "20px";
                    ImageContainer.style.class = "selectedElement";
                    var CI = CurrentImage;
                    imageElements[CI + 1] = null;
                    document.getElementById("divLoadDetails").innerHTML = "Putting Images in place..";
                    $(ImageContainer).load(pageURL + " #" + imageHolder + " > a > img, #" + imageHolder + " > img", function() {
                        previousElem = ImageContainer.childNodes[0];
                        ImageContainer.childNodes[0].removeAttribute("height");
                        ImageContainer.childNodes[0].removeAttribute("width");
                        $(ImageContainer.childNodes[0]).attr("id", "Image" + CI);
                        imageElements[currentImageElement++] = ImageContainer.childNodes[0];
                        /*if (PageURL_List.length == currentImageElement){

                         }*/
                    });
                    //$(ImageContainer).css("cursor","default");
                    if (PageURL_List.length == CurrentImage + 1) {
                        var MAX = PageURL_List.length;
                        var timerObject = setInterval(function() {
                            var numberOfElementsCompleted = 0;
                            for (var i = 0; i < MAX; i++) {
                                if (imageElements[i] != null && ((imageElements[i].toString() == "[object Object]" && imageElements[i].attr("complete")) || (imageElements[i].toString() != "[object Object]" && imageElements[i].complete))) {
                                    /**/
                                    if ((imageElements[i].toString() != "[object Object]" && typeof imageElements[i].naturalWidth != "undefined" && imageElements[i].naturalWidth == 0) /*|| (imageElements[i].toString() == "[object Object]" && typeof imageElements[i].attr("naturalWidth") != "undefined" && imageElements[i].attr("naturalWidth") == 0)*/) {
                                        imageElements[i].src = imageElements[i].src;
                                    }
                                    else      /**/
                                        numberOfElementsCompleted++;
                                }
                            }
                            document.getElementById("divLoadDetails").innerHTML = "Completed Loading " + (numberOfElementsCompleted) + " / " + MAX;
                            if (numberOfElementsCompleted == MAX) {
                                clearInterval(timerObject);
                                timerObject = null;
                                document.getElementById("divLoadDetails").style.backgroundColor = "LimeGreen";
                                document.getElementById("divLoadDetails").style.color = "white";
                                if (document.getElementById(selectChapter).options.selectedIndex >= 0 && GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "true") {
                                    var nextLink = "";
                                    if (document.domain == "www.mangareader.net") {
                                        if ($(".chapternav_next:contains('Next Chapter:')") != undefined && $(".chapternav_next:contains('Next Chapter:')") != null) {
                                            nextLink = $(".chapternav_next:contains('Next Chapter:')").parent().parent().children("td:not('.c4')").children("a").attr("href");
                                            //nextLink = location.href.indexOf.subtring(0,location.href.indexOf(nextLink.substring(0,nextLink.substring(1).indexOf("/")+1))) + "/" + nextLink;
                                        }
                                    }
                                    else {
                                        if (document.getElementById(selectChapter).options.selectedIndex < document.getElementById(selectChapter).options.length - 1)
                                            nextLink = "http://" + document.domain + series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex + 1].value + "/1.html";
                                    }
                                    GM_openInTab(nextLink);
                                }
                            }
                        }, 500);
                    }
                    $("#" + imageHolder).append(ImageContainer);
                }
                else {
                    $("#" + imageHolder).append(Image);
                    Image.attr("id", "Image" + CurrentImage);
                    imageElements[currentImageElement++] = Image;
                }
                CurrentImage ++;
            }
        }
    });
    if (GM_getValue("MRFCL_sLT").toUpperCase() == "SLOW") {
        $("#" + imageHolder).append(Image);
        previousElem = document.getElementById(imageHolder).children[0];
        LoadImages();
    }
    if (document.domain == "www.mangareader.net") {
        $("#pageMenu,#adtop,#adfooter,#selectpage,div.prevnext").hide();
    } else {
        $("#top_center_bar, #top_left_bar, #top_right_bar, #bottom_ads").hide();
    }
}

function LoadImages() {
    var CurrentImageNumber = 0;
    if (eTimer != null)
        eTimer = null;

    if (GM_getValue("MRFCL_sLT", "NULL").toUpperCase() == "NULL")
        GM_setValue("MRFCL_sLT", "FAST");

    if (GM_getValue("MRFCL_sLT").toUpperCase() == "SLOW") {
        eTimer = setInterval(function() {
            if (CurrentImageNumber == ImageSRCs.length) {
                if (document.getElementById("divLoadDetails")) {
                    document.getElementById("divLoadDetails").innerHTML = "Completed Loading " + (CurrentImageNumber) + " / " + ImageSRCs.length;
                    document.getElementById("divLoadDetails").style.backgroundColor = "LightGreen";
                    document.getElementById("divLoadDetails").style.color = "white";
                    setTimeout(function() {
                        if (document.getElementById(selectChapter).options.length > 0) {
                            if (document.getElementById(selectChapter).options.selectedIndex >= 0 && GM_getValue("MangaReaderFullChapterLoader_LoadNextPage", "null") == "true") {
                                var nextLink = "";
                                if (document.domain == "www.mangareader.net") {
                                    if ($(".chapternav_next:contains('Next Chapter:')") != undefined && $(".chapternav_next:contains('Next Chapter:')") != null) {
                                        nextLink = $(".chapternav_next:contains('Next Chapter:')").parent().parent().children("td:not('.c4')").children("a").attr("href");
                                        //nextLink = location.href.indexOf.subtring(0,location.href.indexOf(nextLink.substring(0,nextLink.substring(1).indexOf("/")+1))) + "/" + nextLink;
                                    }
                                }
                                else {
                                    if (document.getElementById(selectChapter).options.selectedIndex < document.getElementById(selectChapter).options.length - 1)
                                        nextLink = "http://" + document.domain + series_url + "/" + document.getElementById(selectChapter).options[document.getElementById(selectChapter).options.selectedIndex + 1].value + "/1.html";
                                }
                                GM_openInTab(nextLink);
                                //top.document.getElementById("content").addTab("www.example.com", null, null);
                            }
                        }
                    }, 500);
                }
                clearInterval(eTimer);
                eTimer = null;
            }

            if (previousElem != null && previousElem.complete) {
                if (location.href != "http://" + document.domain + ImageSRCs[++CurrentImageNumber]) {
                    if (document.getElementById("divLoadDetails"))
                        document.getElementById("divLoadDetails").innerHTML = "Loading " + (CurrentImageNumber + 1) + " / " + ImageSRCs.length;
                    var ImageContainer = document.createElement("div");
                    ImageContainer.style.paddingTop = "20px";
                    previousElem = null;
                    $(ImageContainer).load(ImageSRCs[CurrentImageNumber] + " #" + imageHolder + " > a > img, #" + imageHolder + " > img", function() {
                        previousElem = ImageContainer.childNodes[0];
                    });
                    $(ImageContainer).css("cursor", "default");
                    $("#" + imageHolder).append(ImageContainer);
                }
            }
        }, 500);
    }
}

function AddMyScripts(ScriptContent) {
    var head, Script;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    Script = document.createElement('script');
    Script.type = 'text/javascript';
    Script.innerHTML = ScriptContent;
    head.appendChild(Script);
}

function UpdateChapterList() {
    var latestChapterList = (document.domain == "www.mangareader.net") ? ("#latestchapters") : ("#updates");
    $(latestChapterList).load("http://www.mangareader.net/ " + latestChapterList + " > *", function() {
        highlightTheMangas();
    });
}

function AddPageLoadCount() {
    var Element = document.createElement("div");
    Element.setAttribute("id", "divLoadDetails");
    Element.style.width = "200px";
    Element.style.height = "20px";
    Element.style.backgroundColor = "grey";
    Element.style.color = "gainsboro";
    if (USER_AGENT_NOT_FIREFOX3) {
        Element.style.borderRadius = "8px";
        Element.style.boxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
    }
    else {
        Element.style.MozBorderRadius = "8px";
        Element.style.MozBoxShadow = "0px 0px 10px black, 0px 0px 5px black, 0px 0px 2px black, inset 0px 0px 2px white";
    }
    Element.style.position = "fixed";
    Element.style.top = "20px";
    Element.style.right = "20px";
    Element.align = "center";
    Element.style.align = "center";
    Element.style.display = "table-cell";
    Element.style.verticalAlign = "middle";
    Element.style.fontFamily = "calibri";
    Element.style.fontSize = "16px";
    Element.innerHTML = "Mode is set to " + GM_getValue("MRFCL_sLT", "FAST");
    document.body.appendChild(Element);
}

function CreateButton(text) {
    var Red = 0;
    var Blue = 0;
    var Green = 0;
    var CurrentButtonNumber = CurrentButtonNumberOrigin;
    var btnContainerDIV = document.createElement("div");
    btnContainerDIV.setAttribute("id", "divBtnContainerDiv" + CurrentButtonNumber);
    btnContainerDIV.style.width = "130px";
    btnContainerDIV.style.overflow = "hidden";
    btnContainerDIV.style.height = "52px";
    btnContainerDIV.align = "center";
    btnContainerDIV.innerHTML = "<div style='font-family:calibri;font-size:22px;position:relative;color:ghostwhite;width:auto;z-index:99999;vertical-align:middle;display:table-cell;height:48px;text-shadow:0px 0px 5px white,0px 0px 10px white;cursor:default;' align='center'>" + text + "</div>";
    var ExampleElement = document.createElement("img");
    ExampleElement.setAttribute("id", "imgExampleButton" + CurrentButtonNumber);
    ExampleElement.src = "http://i1208.photobucket.com/albums/cc379/EMPEROR00/ExampleButtonDefault.png";
    if (USER_AGENT_NOT_FIREFOX3) {
        ExampleElement.style.boxShadow = "0px 0px 10px black";
        ExampleElement.style.borderRadius = "10px";
    }
    else {
        ExampleElement.style.MozBoxShadow = "0px 0px 10px black";
        ExampleElement.style.MozBorderRadius = "10px";
    }
    ExampleElement.style.backgroundColor = "rgb(0,0,0)";
    ExampleElement.style.position = "relative";
    ExampleElement.style.top = "-45px";
    //ExampleElement.style.left = "5px";
    ExampleElement.style.zIndex = "99998";
    ExampleElement.addEventListener("mousedown", function(e) {
        ExampleElement.style.backgroundColor = "red";
    }, false);
    ExampleElement.addEventListener("mouseup", function(e) {
        ExampleElement.style.backgroundColor = "rgb(255,255,255)";
    }, false);
    btnContainerDIV.addEventListener("mousedown", function(e) {
        ExampleElement.style.backgroundColor = "red";
    }, false);
    btnContainerDIV.addEventListener("mouseup", function(e) {
        ExampleElement.style.backgroundColor = "rgb(255,255,255)";
    }, false);
    btnContainerDIV.addEventListener("mouseover", function(e) {
        if (ExampleButtonMouseMoveOutTimer[CurrentButtonNumber] != undefined) {
            clearInterval(ExampleButtonMouseMoveOutTimer[CurrentButtonNumber]);
            ExampleButtonMouseMoveOutTimer[CurrentButtonNumber] = undefined;
        }
        ExampleButtonMouseMoveInTimer[CurrentButtonNumber] = setInterval(function() {
            if (Red < 255 && Green < 255 && Blue < 255) {
                Red += 5;
                Blue += 5;
                Green += 5;
                ExampleElement.style.backgroundColor = "rgb(" + Red + "," + Green + "," + Blue + ")";
            }
        }, 5)
    }, false);
    btnContainerDIV.addEventListener("mouseout", function(e) {
        if (ExampleButtonMouseMoveInTimer[CurrentButtonNumber] != undefined) {
            clearInterval(ExampleButtonMouseMoveInTimer[CurrentButtonNumber]);
            ExampleButtonMouseMoveInTimer[CurrentButtonNumber] = undefined;
        }
        ExampleButtonMouseMoveOutTimer[CurrentButtonNumber] = setInterval(function() {
            if (Red > 0 && Green > 0 && Blue > 0) {
                Red -= 5;
                Blue -= 5;
                Green -= 5;
                ExampleElement.style.backgroundColor = "rgb(" + Red + "," + Green + "," + Blue + ")";
            }
        }, 5)
    }, false);
    btnContainerDIV.appendChild(ExampleElement);
    CurrentButtonNumberOrigin++;
    return btnContainerDIV;
}
var div = document.createElement("div");

function CreateTheWindow(WindowTitle, WindowWidth, WindowHeight, WindowPadding, ContentToAppend) {
    var CurrentFormNumber = CurrentFormNumberOrigin;
    GM_addStyle(".divMainForm{-moz-border-radius:10px;-moz-box-shadow:0px 0px 15px black,inset 0px 0px 2px ghostwhite;}.divMainBodyContainer{-moz-border-radius:5px;-moz-box-shadow:inset 0px 0px 10px black, 0px 0px 3px ghostwhite;}.btnCloseMouseOver{-moz-border-radius-bottomright:5px;-moz-box-shadow:0px 0px 15px red;}.btnCloseMouseOut{-moz-box-shadow:0px 0px 0px red;}.btnGreenMouseOver{-moz-box-shadow:0px 0px 15px green;background-color:green;}.btnGreenMouseOut{-moz-box-shadow:0px 0px 0px green;}.btnClose{background-image:url(http://i1208.photobucket.com/albums/cc379/EMPEROR00/ButtonCloseDefault.png) !important;}");
    var divMainForm = document.createElement("div");
    divMainForm.setAttribute("id", "divMainForm" + CurrentFormNumber);
    divMainForm.className = "divMainForm";
    divMainForm.style.height = WindowHeight + "px";
    divMainForm.style.width = WindowWidth + "px";
    divMainForm.style.border = "solid 1px black";
    divMainForm.style.position = "fixed";
    divMainForm.style.top = ((window.innerHeight - WindowHeight) / 2) + "px";
    divMainForm.style.left = ((window.innerWidth - WindowWidth) / 2) + "px";
    if (USER_AGENT_NOT_FIREFOX3) {
        divMainForm.style.borderRadius = "10px";
    }
    else {
        divMainForm.style.MozBorderRadius = "10px";
    }

    divMainForm.style.background = "rgba(128,128,128,0.8)";

    divMainForm.style.zIndex = "99997";
    divMainForm.addEventListener("mousedown", function(e) {
        DifferenceX = e.pageX - document.getElementById("divMainForm" + CurrentFormNumber).offsetLeft;
        DifferenceY = e.pageY - document.getElementById("divMainForm" + CurrentFormNumber).offsetTop;
        MouseDownOnMainForm[CurrentFormNumber] = true;
    }, false);
    divMainForm.addEventListener("mouseup", function(e) {
        MouseDownOnMainForm[CurrentFormNumber] = false;
    }, false);

    var divBodyContainer = document.createElement('div');
    divBodyContainer.setAttribute("id", "divMainBodyContainer" + CurrentFormNumber);
    divBodyContainer.className = "divMainBodyContainer";
    divBodyContainer.style.height = (WindowHeight - 50) + "px";
    divBodyContainer.style.width = (WindowWidth - 2 * WindowPadding) + "px";
    divBodyContainer.style.position = "relative";
    divBodyContainer.style.top = "10px";
    divBodyContainer.style.left = (WindowPadding - 1) + "px";
    divBodyContainer.style.backgroundColor = "gainsboro";
    divBodyContainer.style.border = "solid 1px black";
    divBodyContainer.addEventListener("mousedown", function(e) {
        MouseOnInnerContent[CurrentFormNumber] = true;
    }, false);
    divMainForm.addEventListener("mouseup", function(e) {
        MouseOnInnerContent[CurrentFormNumber] = false;
    }, false);
    divMainForm.innerHTML = '<table id="tblContentArrangeMent' + CurrentFormNumber + '"  style="position:relative;left:' + (WindowPadding + 1) + ';height:15px;top:10px;"><tr><td id="tdUpperFrame' + CurrentFormNumber + '" style="height:16px;" border="0"></td></tr><tr><td id="tdMainMenu" style="height:0px;"></td></tr><tr><td id="tdToolBars' + CurrentFormNumber + '" style="height:0px"></td></tr><tr><td id="tdMainContent' + CurrentFormNumber + '" style="height:auto;"></td></tr><tr><td id="tdLowerFrame' + CurrentFormNumber + '" style="height:10px;"></td></tr></table>';
    ContentToAppend.style.position = "relative";
    ContentToAppend.style.top = "10px";
    ContentToAppend.style.left = "10px";
    divBodyContainer.appendChild(ContentToAppend);
    document.body.appendChild(divMainForm);
    document.getElementById("tdMainContent" + CurrentFormNumber).appendChild(divBodyContainer);
    document.getElementById("tdUpperFrame" + CurrentFormNumber).innerHTML = '<table style="position:relative;height:15px;right:-5px;width:100%;"><tr><td align="left"><div id="divWindowTitle' + CurrentFormNumber + '" style="text-shadow:0px 0px 5px white,0px 0px 10px white,0px 0px 20px white;font-family:calibri;height:20px;position:relative;left:5px;top:-5px;font-size:17px;cursor:default;">' + WindowTitle + '</div></td><td align="right"></div><table id="tblMainControlButtons' + CurrentFormNumber + '" style="position:relative;right:0px;top:-9px;height:18px;" border="0"><tr><td id="tdbtnMinimize' + CurrentFormNumber + '"><div id="bntMinimize' + CurrentFormNumber + '" style="width:32px;background-color:transparent;height:100%;"></div></td><td id="tdbtnMaximize' + CurrentFormNumber + '"><div id="bntMaximize' + CurrentFormNumber + '" style="width:32px;background-color:transparent;height:100%;"></div></td><td id="tdbtnClose' + CurrentFormNumber + '"><div id="btnClose"' + CurrentFormNumber + 'class="btnClose" style="position:relative;top:0px;width:54px;background-color:rgb(255,0,0);height:21px;-moz-box-shadow:0px 0px 2px ghostwhite;-moz-border-radius-bottomright:7px;background-image:url(http://i1208.photobucket.com/albums/cc379/EMPEROR00/ButtonCloseDefault.png);"></div></td></tr></table></td></tr></table>';
    AddNecessayBindings(CurrentFormNumber);
    return divMainForm;
}

function AddNecessayBindings(FormNumber) {
    var CurrentFormNumber = FormNumber;
    document.addEventListener("mousemove", function(e) {
        if (MouseDownOnMainForm[CurrentFormNumber] && !MouseOnInnerContent[CurrentFormNumber] && e.pageY >= 0 && e.pageY < window.innerHeight && e.pageX >= 0 && e.pageX < window.innerWidth) {
            document.getElementById("divMainForm" + CurrentFormNumber).style.top = (e.pageY - DifferenceY) + "px";
            document.getElementById("divMainForm" + CurrentFormNumber).style.left = (e.pageX - DifferenceX) + "px";
        }
    }, false);
    document.addEventListener("mouseup", function(e) {
        MouseDownOnMainForm[CurrentFormNumber] = false;
    }, false);

    document.getElementById("tdbtnClose" + CurrentFormNumber).addEventListener("mouseover", function(e) {
        document.getElementById("tdbtnClose" + CurrentFormNumber).className = "btnCloseMouseOver";
        ChangeButtonColor("IN", document.getElementById("btnClose" + CurrentFormNumber));
    }, false);
    document.getElementById("tdbtnClose" + CurrentFormNumber).addEventListener("mouseout", function(e) {
        document.getElementById("tdbtnClose" + CurrentFormNumber).className = "btnCloseMouseOut";
        ChangeButtonColor("OUT", document.getElementById("btnClose" + CurrentFormNumber));
    }, false);
    document.getElementById("tdbtnClose" + CurrentFormNumber).addEventListener("click", function(e) {
        document.getElementById("divMainForm" + CurrentFormNumber).style.visibility = "hidden";
    }, false);
    document.getElementById("tdbtnClose" + CurrentFormNumber).addEventListener("mousedown", function(e) {
        document.getElementById("btnClose" + CurrentFormNumber).style.backgroundColor = "rgb(139,0,0)";
        MouseOnInnerContent = true;
    }, false);
    document.getElementById("tdbtnClose" + CurrentFormNumber).addEventListener("mouseup", function(e) {
        document.getElementById("btnClose" + CurrentFormNumber).style.backgroundColor = "rgb(255,0,0)";
        MouseOnInnerContent = false;
    }, false);

    /*document.getElementById("tdbtnMinimize").addEventListener("mouseover",function(e){document.getElementById("tdbtnMinimize").className = "btnGreenMouseOver";},false);
     document.getElementById("tdbtnMinimize").addEventListener("mouseout",function(e){document.getElementById("tdbtnMinimize").className = "btnGreenMouseOut";},false);

     document.getElementById("tdbtnMaximize").addEventListener("mouseover",function(e){document.getElementById("tdbtnMaximize").className = "btnGreenMouseOver";},false);
     document.getElementById("tdbtnMaximize").addEventListener("mouseout",function(e){document.getElementById("tdbtnMaximize").className = "btnGreenMouseOut";},false);*/
    CurrentFormNumberOrigin++;
}

function ChangeButtonColor(Type, Element) {
    if (Type.toUpperCase() == "IN") {
        if (MouseMoveOutTimer != undefined) {
            clearInterval(MouseMoveOutTimer);
            MouseMoveOutTimer = undefined;
        }
        MouseMoveInTimer = setInterval(function() {
            TypeIn(Element);
        }, 1);
    }
    else if (Type.toUpperCase() == "OUT") {
        if (MouseMoveInTimer != undefined) {
            clearInterval(MouseMoveInTimer);
            MouseMoveInTimer = undefined;
        }
        MouseMoveOutTimer = setInterval(function() {
            TypeOut(Element);
        }, 1);
    }
}

function TypeIn(Element) {
    var CurrentGreen;
    CurrentGreen = parseInt(Element.style.backgroundColor.substring(Element.style.backgroundColor.indexOf(",") + 1, Element.style.backgroundColor.substring(Element.style.backgroundColor.indexOf(",") + 1, Element.style.backgroundColor.length).indexOf(",") + Element.style.backgroundColor.indexOf(",") + 1));
    if (CurrentGreen < 100)
        Element.style.backgroundColor = "rgb(255," + (CurrentGreen + 5) + "," + "0" + " )";
}

function TypeOut(Element) {
    var CurrentGreen;
    CurrentGreen = parseInt(Element.style.backgroundColor.substring(Element.style.backgroundColor.indexOf(",") + 1, Element.style.backgroundColor.substring(Element.style.backgroundColor.indexOf(",") + 1, Element.style.backgroundColor.length).indexOf(",") + Element.style.backgroundColor.indexOf(",") + 1));
    if (CurrentGreen > 0)
        Element.style.backgroundColor = "rgb(255," + (CurrentGreen - 5) + "," + "0" + ")";
}

function createTableWithArray(array, width, height) {
    var divMainElement = document.createElement("table");
    var divMainElement_tbody = document.createElement("tbody");

    for (var outerI = 0; outerI < height; outerI++) {
        var divMainElement_tr = document.createElement("tr");
        for (var innerI = 0; innerI < width; innerI++) {
            var divMainElement_td = document.createElement("td");
            divMainElement_td.style.color = "black";
            divMainElement_td.style.height = "50px";
            divMainElement_td.style.fontFamily = "calibri";
            divMainElement_td.style.fontSize = "16px";
            divMainElement_td.align = (innerI == width - 1) ? "right" : "left";
            if (array[outerI][innerI].toString() != "[object XPCNativeWrapper [object HTMLDivElement]]" && array[outerI][innerI].toString() != "[object XrayWrapper [object HTMLDivElement]]") {
                divMainElement_td.innerHTML = array[outerI][innerI];
            } else {
                divMainElement_td.appendChild(array[outerI][innerI]);
            }
            divMainElement_tr.appendChild(divMainElement_td);
        }
        divMainElement_tbody.appendChild(divMainElement_tr);
    }
    divMainElement.appendChild(divMainElement_tbody);
    return divMainElement;
}

function isNumber(string) {
    for (var i = 0; i < string.length; i++) {
        ;
        if ((string.substr(i, 1) != "1" && string.substr(i, 1) != "2" && string.substr(i, i) != "3" && string.substr(i, 1) != "4" && string.substr(i, 1) != "5" &&
                string.substr(i, 1) != "6" && string.substr(i, 1) != "7" && string.substr(i, i) != "8" && string.substr(i, 1) != "9" && string.substr(i, 1) != "0") && (string.substr(i, 1) != "-" && i == 0)) {
            return "false";
        }
    }
    return parseInt(string);
}

function highlightTheMangas() {
    if (location.href == "http://www.mangareader.net/") {
        $(".chapter").each(function() {
            for (var mangaName in bookmarkedMangaList) {
                if (bookmarkedMangaList[mangaName].toLowerCase() == this.childNodes[0].innerHTML.toLowerCase()) {
                    this.style.color = "red";
                }
            }
        });
    }
    else {
        $(".manga_open").each(function() {
            for (var mangaName in bookmarkedMangaList) {
                if (bookmarkedMangaList[mangaName].toLowerCase() == this.innerHTML.toLowerCase()) {
                    this.style.color = "red";
                }
            }
        });
    }
}

function checkAndBookmarkThisPage() {
    if (GM_getValue("MRFCL_AB", "OFF").toUpperCase() == "ON") {
        if (document.getElementById(selectChapter).options.length > 0)
            AddBookMark(location.href, ChapterTitle);
        else
            setTimeout(checkAndBookmarkThisPage, 5000);
    }
}

function importBookmarks(button) {
    var input = prompt("Please enter the bookmark string or the recognition code for your bookmark string.", "");
    if (input == null || input == "") {
        $(button).children("div").html("IMPORT");
        return;
    }
    else if (input.indexOf("$") == -1)
        importBookmarksFromID(input, button);
    else
        importBookmarksFromString(input, button);
}

function importBookmarksFromID(ID, button) {
    GM_xmlhttpRequest({
        method : "GET",
        url : "http://alcs.x10.mx/MangaReader/getAndDeleteRecord.php?BookmarkID=" + ID,
        onload : function(Response) {
            if (Response.responseText == "")
                alert("Sorry, your bookmarks couldn't be exported.");
            else if (Response.responseText.toUpperCase().split("*")[0] == "FAILED")
                alert(Response.responseText.split("*")[1]);
            else {
                importBookmarksFromString(Response.responseText.split("*")[1], button);
            }
            $(button).children("div").html("IMPORT");
        },
        onerror : function () {
            alert("Sorry, your bookmarks couldn't be exported.");
            $(button).children("div").html("IMPORT");
        }
    });
}

function importBookmarksFromString(BookmarksText, button) {
    var Bookmarks = BookmarksText.split(";");
    for (var Bookmark in Bookmarks) {
        var BookmarkSettings = Bookmarks[Bookmark].split("$");
        AddBookMark(BookmarkSettings[0], BookmarkSettings[1]);
    }
    $(button).children("div").html("IMPORT");
    AddBookmarksToTheTable(false);
}

function exportBookmarks(button) {
    var bookmarkString = getBookmarkString();
    if (bookmarkString == "") {
        alert("There aren't any bookmarks to export.");
        $(button).children("div").html("IMPORT");
        return;
    }
    GM_xmlhttpRequest({
        method : "GET",
        url : "http://alcs.x10.mx/MangaReader/addRecordAndGetID.php?BookmarkString=" + bookmarkString,
        onload : function(Response) {
            if (Response.responseText == "" || Response.responseText.toUpperCase().split(":")[0] == "FAILED")
                alert("Sorry, your bookmarks couldn't be exported.");
            else
                alert("The recognition code for your bookmark string is : " + Response.responseText.split(":")[1] + "\n\nIMPORTANT : This code will be needed when you are importing your bookmarks.");
            $(button).children("div").html("EXPORT");
        },
        onerror : function () {
            alert("Sorry, your bookmarks couldn't be exported.");
            $(button).children("div").html("EXPORT");
        }
    });
}

function getBookmarkString() {
    var generatedString = "";
    ArrangeBookmarksInOrder();
    for (var Index = 0; Index < NumberOfBookmarks; Index++) {
        generatedString += ((generatedString == "") ? "" : ";") + (GM_getValue("MangaRederFCL_Bookmark" + Index, "null") + "$" + GM_getValue("MangaRederFCL_BookmarkName" + Index, "null"));
    }
    return generatedString;
}