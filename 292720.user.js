// ==UserScript==
// @name       HockeyBuzzFixer 2.0
// @namespace  http://www.hockeybuzz.com/
// @version    1.0
// @description  fixes this stupid site
// @match      http://www.hockeybuzz.com/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require    https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @copyright  2014, Apples
// ==/UserScript==


//jquery

$backgroundDiv = $('div[style="background:#FFF; padding-left:15px; padding-right:15px; padding-bottom:15px;"]');

//selects parent div
$divSelect = $('div[style="background:#FFF; padding-left:15px; padding-right:15px; padding-bottom:15px;"]');

//selects table element
$pagesSelect = $divSelect.children()[2];
//gets total number of pages
$totalPages = $($pagesSelect).find('b');
//gets number of page links
$pageCollection = $($pagesSelect).find("a");
//converts HTMLCollection to array
$pageArray = $.makeArray($pageCollection);
//sets first page
$firstPageStr = "1";
//htmltext of array
$currentpageHTML = $totalPages.html();

//get current thread URL
$threadTable = $backgroundDiv.children()[0];
$threadURL = $($threadTable).find('h2').children()[2].href;

//if NOT on last page
if ($currentpageHTML.indexOf("Next") >= 0)
{

    $LastPageHTML = $pageArray.slice(-2)[0].toString();
    $HTMLRegExp = /page=\d+/;
    $LastPageToStr = $LastPageHTML.match($HTMLRegExp).toString();
    $LastPageValue = $LastPageToStr.replace(/page=/, "");
}
else //if on last page
{
    //gets and sets before last page
    $beforeLastPage = $($pageArray).last().html();
    //converts beforelastpage to integer and adds 1
    $lastPageInt = parseInt($beforeLastPage) + 1;
    //gets and sets last page, converts to string
    $LastPageValue = $lastPageInt.toString();

}

//sets regexp to retrieve current page
$regexpVar = / \d+/;
//gets regexp of the current page
$regexpVarToStr = $currentpageHTML.match($regexpVar).toString();
//gets regexp of $CurrentPage
$CurrentPageValue = $regexpVarToStr.replace(/ /,"");

//setting preceding page int and converting to string
$PrecedingPageInt = parseInt($CurrentPageValue) - 1;
$PrecedingPageStr = $PrecedingPageInt.toString();
//setting following page int and converting to string
$FollowingPageInt = parseInt($CurrentPageValue) + 1;
$FollowingPageStr = $FollowingPageInt.toString();


//remove table in $divSelect
$pagesSelect.remove();

//creating elements

$paginationDiv = $('<div class="pagination">');
$uList = $('<ul class="ulist">');


$pageJump = $('<li class="pagejump">');
$pageJumpA = $('<a>',{
    href: "javascript:;",
    text: 'PAGE ' + $CurrentPageValue + " " + 'OF ' + $LastPageValue

});

//Page Toggle
$pageToggle = $('<div class="pagetoggle">');
$pageToggleHeader = $('<div class="toggleheader">GOTO PAGE</div>');
$pageGOTO = $('<div class="goto">');
$gotoInput = $('<input class="gotopage" type="text">');
$gotoButton = $('<input class="gobutton" type="button" value="GO">');


//firstpage
$firstPage = $('<li class="fpnl">');
$firstPageA = $('<a>',{
    text: '«',
    title: 'First Page',
    href: $threadURL
});
//previouspage
$PREVPage = $('<li class="fpnl">');
$PREVPageA = $('<a>',{
    text: "PREV",
    title: 'Previous Page',
    href: $threadURL + "&page=" + $PrecedingPageStr

});
//precedingpage
$preceding_page = $('<li class="page">');
$preceding_pageA = $('<a>',{
    text: $PrecedingPageStr,
    title: $PrecedingPageStr,
    href: $threadURL + "&page=" + $PrecedingPageStr

});
//curentpage
$current_page = $('<li class="page-active">');
$current_pageText = $('<span>',{
    text: $CurrentPageValue
});
//followingpage
$following_page = $('<li class="page">');
$following_pageA = $('<a>',{
    text: $FollowingPageStr,
    title: $FollowingPageStr,
    href: $threadURL + "&page=" + $FollowingPageStr
});
//nextpage
$NEXTPage = $('<li class="fpnl">');
$NEXTPageA = $('<a>',{
    title: 'Next Page',
    text: "NEXT",
    href: $threadURL + "&page=" + $FollowingPageStr
});

//lastpage
$lastPage = $('<li class="fpnl">');
$lastPageA = $('<a>',{
    text: '»',
    title: 'Last Page',
    href: $threadURL + "&page=last",
});

//appending elements into place

if ($CurrentPageValue === $LastPageValue)
{
    $paginationDiv.appendTo($divSelect);
    $uList.appendTo($paginationDiv);

    $pageJump.appendTo($uList);
    $pageJumpA.appendTo($pageJump);

    $pageToggle.appendTo($pageJump);
    $pageToggleHeader.appendTo($pageToggle);
    $pageGOTO.appendTo($pageToggleHeader);
    $gotoInput.appendTo($pageToggleHeader);
    $gotoButton.appendTo($pageToggleHeader);

    $firstPage.appendTo($uList);
    $firstPageA.appendTo($firstPage);

    $PREVPage.appendTo($uList);
    $PREVPageA.appendTo($PREVPage);

    $preceding_page.appendTo($uList);
    $preceding_pageA.appendTo($preceding_page);

    $current_page.appendTo($uList);
    $current_pageText.appendTo($current_page);

}
else if ($CurrentPageValue === $firstPageStr)
{
    $paginationDiv.appendTo($divSelect);
    $uList.appendTo($paginationDiv);

    $pageJump.appendTo($uList);
    $pageJumpA.appendTo($pageJump);

    $pageToggle.appendTo($pageJump);
    $pageToggleHeader.appendTo($pageToggle);
    $pageGOTO.appendTo($pageToggleHeader);
    $gotoInput.appendTo($pageToggleHeader);
    $gotoButton.appendTo($pageToggleHeader);

    $current_page.appendTo($uList);
    $current_pageText.appendTo($current_page);

    $following_page.appendTo($uList);
    $following_pageA.appendTo($following_page);

    $NEXTPage.appendTo($uList);
    $NEXTPageA.appendTo($NEXTPage);

    $lastPage.appendTo($uList);
    $lastPageA.appendTo($lastPage);
}

else
{
    $paginationDiv.appendTo($divSelect);
    $uList.appendTo($paginationDiv);

    $pageJump.appendTo($uList);
    $pageJumpA.appendTo($pageJump);

    $pageToggle.appendTo($pageJump);
    $pageToggleHeader.appendTo($pageToggle);
    $pageGOTO.appendTo($pageToggleHeader);
    $gotoInput.appendTo($pageToggleHeader);
    $gotoButton.appendTo($pageToggleHeader);

    $firstPage.appendTo($uList);
    $firstPageA.appendTo($firstPage);

    $PREVPage.appendTo($uList);
    $PREVPageA.appendTo($PREVPage);

    $preceding_page.appendTo($uList);
    $preceding_pageA.appendTo($preceding_page);

    $current_page.appendTo($uList);
    $current_pageText.appendTo($current_page);

    $following_page.appendTo($uList);
    $following_pageA.appendTo($following_page);

    $NEXTPage.appendTo($uList);
    $NEXTPageA.appendTo($NEXTPage);

    $lastPage.appendTo($uList);
    $lastPageA.appendTo($lastPage);
}


//styling elements with css

$backgroundDiv.css({"padding-bottom":"60px"});

$('.pagination').css({
    "float" : "right",
    "font-family" : "tahoma",
    "font-size" : "11px"});

$('.pagination li').css({
    "display": "inline-block",
    "margin": "0 2px",
    "line-height": "20px"});

$('.pagination a').css({
    "height": "20px",
    "text-decoration": "none",
    "display": "inline-block"});

$('.page-active span').css({
    "border-radius": "2px",
    "display":"inline-block",
    "background": "#4794d6",
    "color": "#fff",
    "font-weight": "bold",
    "padding": "0 6px",
    "line-height": "20px"});

$('.fpnl a').css({
    "color": "#656565",
    "padding": "0 6px",
    "background": "#eaeaea",
    "font-weight": "bold",
    "border-radius": "2px",
    "line-height": "20px"});


$('.page a').css({
    "font-weight": "bold",
    "color": "#999",
    "padding": "0 6px",
    "line-height": "20px"});

$('.pagejump a').css({
    "color": "#999",
    "padding": "1px 4px",
    "font-weight": "bold",
    "line-height": "20px"

});


$('.pagejump').css({
    "position": "relative"
});

$('.pagetoggle').css({

    "display": "none",
    "position":"absolute",
    "width": "100%",
    "height": "50px",
    "background": "#ececec",
    "text-align": "center",
    "border-bottom-left-radius": "4px",
    "border-bottom-right-radius": "4px"
});


$('.toggleheader').css({

    "width": "100%",
    "height": "20px",
    "background": "#4794d6",
    "text-align": "center",
    "color": "#FFF",
    "line-height": "20px"

});

$('.gotopage').css({

    "margin-top": "5px",
    "position": "relative",
    "width": "50%",
    "border": "none",
    "border-radius": "4px"
});

$('.gobutton').css({

    "margin-top": "5px",
    "background": "#4794d6",
    "border": "none",
    "border-radius": "4px",
    "color": "#FFF",
    "padding": "2px 6px"

});


//functions



$('.pagejump a').hover(function(){
  $(this).css({
        "background": "#ececec",
        "border-radius": "2px"});
  },function(){
  $(this).css({
        "background": "",
        "border-radius": ""});
});




$('.fpnl a').hover(function(){
  $(this).css({
        "background": "#fa0",
        "color": "#fff"});
  },function(){
  $(this).css({
        "color": "#656565",
        "padding": "0 6px",
        "background": "#eaeaea",
        "font-weight": "bold",
        "border-radius": "2px",
        "line-height": "20px"});
});


$('.page a').hover(function(){
  $(this).css({
        "background-color": "#ececec",
        "border-radius": "2px"});
  },function(){
  $(this).css({
        "background-color": "",
        "border-radius": "",
        "font-weight": "bold",
        "color": "#999",
        "padding": "0 6px",
        "line-height": "20px"});
});


$('.gobutton').hover(function(){
  $(this).css({
        "background": "#3a7bb2"});
  },function(){
  $(this).css({
        "background": "#4794d6"});
});


$(document).ready(function(){
    $('.pagejump a').click(function(){
        $('.pagetoggle').slideToggle("fast");
        $('.gotopage').focus();

});
    $('.gotopage').keypress(function(event){
        if (event.which == 13)
        {
            window.location.href = $threadURL + "&page=" + $gotoInput.val();
        }
    });

    $('.gobutton').click(function(){
        window.location.href = $threadURL + "&page=" + $gotoInput.val();
    });

});












