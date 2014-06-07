// ==UserScript==
// @name           Pixiv Sort and View 2
// @namespace      http://d.hatena.ne.jp/verno3632/
// @description    pixiv
// @include      http://www.pixiv.net/tags.php*
// @include      http://www.pixiv.net/search.php*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
/*
var GM_LZ = document.createElement('script');
GM_LZ.src = 'http://www.appelsiini.net/download/jquery.lazyload.mini.js';
GM_LZ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_LZ);
*/
// Add jQuery XPath Plugin
/*
var GM_JQ2 = document.createElement('script');
GM_JQ2.src = 'http://dev.jquery.com/view/trunk/plugins/xpath/jquery.xpath.js';
GM_JQ2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ2);
*/

// Check if jQuery's loaded
Browser = navigator.appName;
Net = Browser.indexOf("Netscape");
var count=0;

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;

    do {
        curDate = new Date();
    }
    while(curDate-date < millis);
}

window.GM_wait = function() {
    if(Net >= 0) {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait,100);
        }
        else {
            $ = unsafeWindow.jQuery;
            letsJQuery();
        }
    } else {
        while  (count<30 && typeof window.jQuery=='undefined')
        {
            pausecomp(200);
            count += 1;
        }
        window.setTimeout(letsJQuery,100);
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    // alert($); // check if the dollar (jquery) function works
    // Your code here

    /*ITEM
 *<li><a href="member_illust.php?mode=medium&amp;illust_id=15032589"><img src="http://img22.pixiv.net/img/asukariku/15032589_s.jpg" alt="霊夢壁紙" border="0">霊夢壁紙</a><br><a href="bookmark_detail.php?mode=s_tag&amp;illust_id=15032589"><span class="bookmark_link">&nbsp;4 users&nbsp;</span></a></li>
 */

    var search_pages_limit = new Number(GM_getValue("psv_max", 100)); // <1000
    var pics_perpage = new Number(GM_getValue("psv_pics_perpage", 20)); // <500
    var min_users = new Number(GM_getValue("psv_min_users"), 1);

    const PICS_PERPAGE = 20;
    var one_column_body = $("div[class=one_column_body]");
    var search_a2_result_ul = $("div .search_a2_result ul");
    var pictures = new Array();
    var total_pages, result_pages;
    var current_page = 0;

    function setLimit(){
        var limit = prompt("Set search pages limit: (< 1000) ", GM_getValue("psv_max", 100));
        search_pages_limit = (limit>1000 || limit<1) ? 100 : limit;
        GM_setValue("psv_max", search_pages_limit);
    }

    function set_pics_perpage(){
        var limit = new Number(prompt("Set pictures per page: (< 100)", GM_getValue("psv_pics_perpage", 20)));

        if(limit <= 0 || limit > 100)
            pics_perpage = 20;
        else
            pics_perpage = limit;

        GM_setValue("psv_pics_perpage", pics_perpage.toString());
    }

    function set_min_users(){
        var limit = new Number(prompt("Set min users: (> 0)", GM_getValue("psv_min_users", 1)));

        if(limit <= 0)
            min_users = 1;
        else
            min_users = limit;

        GM_setValue("psv_min_users", min_users.toString());
    }

    function PSV_get_total_pages(){
        var result_number = $("#contents").html().match(/<p>.*検索.*&nbsp;(\d*)件<\/p>/)[1];
        
        var total_pages = result_number / PICS_PERPAGE;

        return Math.ceil(total_pages);
    }

    function PSV_get_url_html(url){
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.overrideMimeType('application/xml');
        req.send(null);

        return req.responseText;
    }

    function PSV_create_picture(li, favorite){
        li.replace();
        li = li.replace(/<a href=/g, "<a target=\"_blank\" href=");
        li = li.replace(/<img src=/g, '<img class="PSV_img" src=');

        var picture = {
            li:li,
            favorite:favorite
        };
        return picture;
    }

    function PSV_sort_pictures(pic_a, pic_b){
        /*
        if(pic_a.favorite > pic_b.favorite)
            return -1;
        else if(pic_a.favorite == pic_b.favorite)
            return 0;
        return 1;
        */
        return pic_b.favorite - pic_a.favorite;
    }

    function PSV_remove_pagers(){
        $(".pager_ul").html("");
    }

    function PSV_create_pagers(){
        /*
         <div style="" class="pager_ul">
         <ul>
            <li class="pager_ul_pre"><a href="tags.php?tag=C79&amp;p=1" rel="prev">« 前へ</a></li>
            <li><span>1</span></li><li><a href="tags.php?tag=C79&amp;p=2">2</a></li><li><a href="tags.php?tag=C79&amp;p=3">3</a></li><li><a href="tags.php?tag=C79&amp;p=4">4</a></li><li><a href="tags.php?tag=C79&amp;p=5">5</a></li><li><a href="tags.php?tag=C79&amp;p=6">6</a></li><li><a href="tags.php?tag=C79&amp;p=7">7</a></li><li><a href="tags.php?tag=C79&amp;p=8">8</a></li><li><a href="tags.php?tag=C79&amp;p=9">9</a></li><li><a href="tags.php?tag=C79&amp;p=10">10</a></li>
            <li class="pager_ul_next"><a href="tags.php?tag=C79&amp;p=2" rel="next">次へ »</a></li>
        </ul>
        </div>
         */
        result_pages = pictures.length / pics_perpage;

        $(".pager_ul").html('<ul class="PSV_pager"></ul>');
        var PSV_pager = $(".PSV_pager");

        $('div.pager_top .pager_ul').css('height', '');

        PSV_pager.append('<li class="pager_ul_pre"><a class="pager_prev" href="javascript:" rel="prev">« 前へ</a></li>');
        $('.pager_prev').click(PSV_pager_prev_click);

        PSV_pager.append('<span id="PSV_pager_top_anchor"></span>');

        for(var i = 0;i < result_pages;i++){
            var pager_li_class_name = 'pager_li_' + i;
            PSV_pager.append('<li class="'+ pager_li_class_name +'"></li>');
            PSV_pager_create_link(i);
        }
        PSV_pager.append('<li class="pager_ul_next"><a class="pager_next" href="javascript:" rel="next">次へ »</a></li>');
        $('.pager_next').click(PSV_pager_next_click);
    }

    function PSV_pager_prev_click(){
        if(current_page > 0)
            PSV_pager_click({data:{page:(current_page-1)}});
    }

    function PSV_pager_next_click(event){
        if(current_page + 1 < result_pages)
            PSV_pager_click({data:{page:(current_page+1)}});
    }

    function PSV_pager_create_link(page){
        var pager_li = $('.pager_li_' + page);
        var pager_class_name = 'pager_' + page;
        pager_li.append('<a href="javascript:" class="' + pager_class_name + '">' + (page+1) + '</a>');
        $('.' + pager_class_name).click({page:page}, PSV_pager_click);
    }

    function PSV_pager_click(event){
        var page = event.data.page;
        PSV_pager_turn(current_page);
        PSV_pager_turn(page);
        PSV_goto_page(page);

        
        window.scrollTo(0, $("#PSV_pager_top_anchor").scrollTop);
    }

    function PSV_pager_turn(page, first){
        if(undefined == typeof(first)){
            first = false;
        }

        var pager_li = $('.pager_li_' + page);
        if(current_page != page || first){
            pager_li.html('<span>' + (page+1) + '</span>');
        }else{
            pager_li.html('');
            PSV_pager_create_link(page);
        }
    }

    function PSV_goto_page(page){
        search_a2_result_ul.html("");
        current_page = page;

        $('.pager_' + page).html('<span>' + (page+1) + '</span>');

        var base = new Number(page*pics_perpage);
        var limit = (base + pics_perpage) > pictures.length ? pictures.length : (base + pics_perpage);
        //alert("page:"+page+"\nbase:"+base+"\nbase+pics_perpage:"+(base+pics_perpage)+"\nlimit="+limit);
        for(var i = base;i < limit;i++){
            //GM_log(pictures[i].li + "\n" + pictures[i].favorite);
            search_a2_result_ul.append(pictures[i].li);
        }
    }

    function PSV_begin_sort(){
        var PSV_count = $("#PSV #PSV_count");
        var PSV = $("#PSV");

        search_a2_result_ul.html('<img src="http://source.pixiv.net/source/images/loading-horizontal.gif" align="center" />');
        PSV_remove_pagers();
        $("#button_sort").remove();
        PSV.append("sorting...<br/>");

        total_pages = PSV_get_total_pages();
        search_pages_limit = Math.min(total_pages, search_pages_limit); // Min

        var i = 0, limit = search_pages_limit, busy = false;
        PSV_count.html("1 / " + limit);
        var processor = setInterval(function()
        {
            if(!busy)
            {
                busy = true;
                
                var url;
                if(document.URL.match(/&p=\d*/))
                    url = document.URL.replace(/&p=\d*/, "&p="+i);
                else
                    url = document.URL + "&p=" + i;

                var page_html = PSV_get_url_html(url);

                var regexp_picture_str = "<li.*><a.* href=\".*\"><img src=\"(.*)\" alt=\".*\" border=\"0\" />.*</a><br /><a href=\".*illust_id=(\\d*).*\"><span class=\"bookmark_link\">&nbsp;(\\d*) users&nbsp;</span></a></li>";
                var regexp_picture = new RegExp(regexp_picture_str, "gm");

                var matches;
                while(matches = (regexp_picture.exec(page_html))){
                    //GM_log(matches.join("\n"));
                    //matches[0] : HTML inside <li></li>
                    //matches[1] : URL of thumb
                    //matches[2] : illust_id
                    //matches[3] : Number of Bookmark
                    if(matches[3] >= min_users)
                        pictures.push(PSV_create_picture(matches[0], matches[3]));
                }
                //GM_log("=========================");

                PSV_count.html(i+1 + " / " + limit);

                if(++i == limit)
                {
                    PSV.html("Success!");

                    clearInterval(processor);

                    pictures = pictures.sort(PSV_sort_pictures);

                    PSV_create_pagers();
                    PSV_goto_page(0);
                    PSV_pager_turn(0, true);
                //$(".PSV_img").lazyload();
                }

                busy = false;
            }

        }, 100);
    }

    $('<div id="PSV" align="center"> \n\
         <button id="button_sort">SORT</button><br />\n\
         <span id="PSV_count"></span>\n\
      </div>').insertBefore(one_column_body);
    
    $("#button_sort").click(PSV_begin_sort);

    GM_registerMenuCommand("pixiv s&v - max search limit :" + GM_getValue("psv_max", 100), setLimit);
    GM_registerMenuCommand("pixiv s&v - pictures per page :" + GM_getValue("psv_pics_perpage", 20), set_pics_perpage);
    GM_registerMenuCommand("pixiv s&v - min users :" + GM_getValue("psv_min_users", 1), set_min_users);
}