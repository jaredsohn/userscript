// ==UserScript==
// @name 247sports
// @author Bocephus
// @email bocephus@bamajunk.com
// @website http://bamajunk.com
// @description Simple Forum layout
// @include *247sports.com/*
// ==/UserScript==




function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.countbox {    background-color: #fff !important;    color: #FFFFFF;    display: inline-block;    float: right;    min-width: 35px;    padding: 0 8px;    text-align: center;    }');
addGlobalStyle('.brditm_lst > tbody > .alt, .posts > li.alt, .sidebar .brd_rail, .topic_cmp > cmp_bdy > ol > li.alt, .post_first_div, .carousel_lst ul > li {    background-color: #efefef;}');
addGlobalStyle('.countbox {    background-color: #fff !important;    color: #FFFFFF;    display: inline-block;    float: right;    min-width: 35px;    padding: 0 8px;    text-align: center;    } ');   
addGlobalStyle('table {      background: none repeat scroll 0 0 #BEC3C9;    border-collapse: separate;    border-left: 1px solid #BEC3C9;    border-right: 1px solid #BEC3C9;     border-style: solid #BEC3C9;    border-top: 1px solid #BEC3C9 ;   }');
addGlobalStyle('tbody tr {    background-color: white;    } ');
addGlobalStyle('.brditm_icon {    border-right: 1px solid #BEC3C9;    margin-left: 10px;    }');
addGlobalStyle('.brditm_count {    border-left: 1px solid #BEC3C9;    }');
addGlobalStyle('.countbox {background: none repeat scroll 0 0 !important;    color: #FFFFFF;    display: inline-block;    float: right;    min-width: 35px;    padding: 0 8px;    text-align: center;    }');
addGlobalStyle('thead tr th {     color: #000;    font-size: 12px;    font-weight: bold;    }');
addGlobalStyle('.trial_blk {    display: none !important;    }');    
addGlobalStyle('.m_bm10 {    margin-bottom: 0px;    }');
addGlobalStyle('.cntnt_blck > .toolbar ul {    background: url("http://247sports.com/content/img/sprt_grads.png") repeat-x scroll 0 -844px #EEEEEE;    width: 100%;      }');
addGlobalStyle('.gnav_blk > ul {        border-top:  6px solid #999;    }');
addGlobalStyle('.cntnt_blck {    overflow: hidden;    padding: 20px 0 0px;    }');
addGlobalStyle('.brdr_bm {    border-bottom: 2px solid gray;    }');
addGlobalStyle('.icon_topic_new {    Background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 -160px transparent;    text-indent: -9999px;    }');
addGlobalStyle('blockquote {    background-color: #e4e4e4;    border: 1px dotted #999;    }');
addGlobalStyle('.icon_topic_new:hover {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 -160px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_new {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 -160px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -40px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -80px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -120px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_new {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -160px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_new_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -200px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_new_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -240px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_cool_new_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -280px 0 transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -40px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -80px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -120px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_new {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -160px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_new_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -200px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_new_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -240px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warm_new_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -280px -40px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -40px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -80px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -120px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_new {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -160px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_new_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -200px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_new_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -240px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_warmer_new_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -280px -80px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll 0 -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -40px -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -80px -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -120px -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_new {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -160px -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_new_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -200px -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_new_youpost {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -240px -120px transparent;    text-indent: -9999px;}');
addGlobalStyle('.icon_topic_hot_new_youpost_lock {    background: url("http://media.247sports.com/Uploads/Boards/310/34310/67278.png") no-repeat scroll -280px -120px transparent;    text-indent: -9999px;    }');
addGlobalStyle('h1 {    font-size: 20px;    }');
addGlobalStyle('.meta {    padding-right:9999px;    }');
addGlobalStyle('.meta > a {    color:#999;    }');
addGlobalStyle('.m_bm5 {    margin-bottom: 5px;    color: gray !important;    font-weight: normal !important;}');
