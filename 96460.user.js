// ==UserScript==
// @name          OverCompact
// @version       1.27_4.01.2014
// @namespace     http://spmbt.habr.ru/
// @description   more compact forum forums.overclockers.ru
// @author        spmbt
// @icon          http://forums.overclockers.ru/favicon.ico
// @include       http://overclockers.ru/*
// @include       http://*.overclockers.ru/*
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "overclockers.ru" || document.domain.substring(document.domain.indexOf(".overclockers.ru") + 1) == "overclockers.ru"))
css +='#pagecontent>table:not(.tablebg)>tbody>tr>td + td table{display: none;} body.ltr #wrapheader, body.ltr #wrapfooter{background-color: #f0f5f2!important; overflow: hidden;} body.ltr{font-size: 75%!important} body.ltr > a[name="top"]+style+img+br , body.ltr > a[name="top"]+style+br , body.ltr > a[name="top"]+br{display: none;} #wrapheader{width: 100%;} #mmenu, #menubar{max-width: 1200px; margin: 0 auto!important; background-color: #fff!important;} #mmenu .out .gensmall{width: 16em!important; overflow: hidden; display: block;} .mid1, #midd{padding: 0 10px 0 3px!important;} #login_menu td{padding: 0!important;} #login_menu td a{padding: 0 3px!important; font-weight: normal!important; color: #048!important;} #login_menu td#search-box{background-color: #dfd7a8!important; width: 18em!important; padding: 1px 0 1px 7px!important;} #search-box #search input#keywords{width: 82%;} #search-box #search{overflow: hidden;} #login_form , #login_form td{border-collapse: collapse!important; border-spacing: 0!important;clear: both!important;} #login_form td{white-space: nowrap;} .breadcrumbs a[href="./index.php"] , #mmenu a[href="http://www.etegro.com/rus/"] , #wrapheader > table#mmenu + table{display: none;} #datebar{margin: 0!important; color: #9cc;} #wrapcentre > .tablebg + br{display: none;} #wrapcentre #pageheader h2{float: left!important; margin: 2px 0!important;} #wrapcentre #pageheader .moderators{text-align: right; float: right!important; min-width: 280px; margin: 3px 0 2px!important; font-weight: normal!important;} .searchbar{padding: 0 3px!important;} .searchbar span{margin: 0!important;} .searchbar+.tablebg{margin-top: 0!important;} .tablebg .cat{height: auto!important;} #wrapcentre+br , #pageheader + br , #pageheader + br + br , .genmed +.post + .gensmall{display: none;} .genmed +.post:hover + .gensmall{position: absolute; display: block; margin-top: 1.6em;} #pagecontent >table>tbody>tr>td:first-child >a:first-child{display: none;} #pagecontent >table:first-child+table table td{max-height: 1.3em; overflow: hidden;} #pagecontent >table:first-child+table table td{white-space: normal!important;} #pagecontent >table:first-child+table table a[href*="memberlist.php?mode=email"]{display: none;} #pagecontent >table:first-child+table table a.qr_float_link , #pagecontent >table:first-child+table table a[href*="&view=print"] , #pagecontent >table:first-child+table table a:first-child{display: inline-block; overflow: hidden; max-width: 7em;} #pagecontent >table:first-child+table table a{vertical-align: middle; white-space: nowrap;} #pagecontent >table:first-child+table table a.qr_float_link:hover , #pagecontent >table:first-child+table table a[href*="&view=print"]:hover , #pagecontent >table:first-child+table table a:first-child:hover{overflow: auto; max-width: none;} #pagecontent >table>tbody>tr>td:first-child >a:first-child +a:not(.topictitle) , .pagination a , #pagecontent >table>tbody>tr>td +td.gensmall >a+a[href*="viewtopic.php"] , #pagecontent >table>tbody>tr>td >table>tbody>tr>td +td.gensmall >a+a[href*="viewforum.php"] , .pagination +a , .pagination strong{margin: 0 -3px!important; padding: 2px 12px!important; font-size: 13px!important; border: 1px solid #8b9ec2!important; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px;} #pagecontent >table>tbody>tr>td:first-child >a:first-child +a:not(.topictitle){padding: 2px 4px 2px 20px!important; background: url(http://forums.overclockers.ru/styles/ocss2/imageset/button_topic_new.gif) no-repeat 1px 1px;} #pagecontent >table>tbody>tr>td +td.gensmall >a+a[href*="viewtopic.php"] , #pagecontent >table>tbody>tr>td >table>tbody>tr>td +td.gensmall >a+a[href*="viewforum.php"] , .pagination +a{background-color: #ddd;} #pagecontent >table>tbody>tr>td +td.gensmall >a+a[href*="viewtopic.php"]:hover , #pagecontent >table>tbody>tr>td >table>tbody>tr>td +td.gensmall >a+a[href*="viewforum.php"]:hover , .pagination +a:hover , .pagination a:hover{text-decoration: none!important; background-color: #eee;} #pagecontent >table>tbody>tr>td +td.gensmall , #pagecontent >table>tbody>tr>td >table>tbody>tr>td +td.gensmall{white-space: normal!important;} #pagecontent >table>tbody>tr>td +td.gensmall .pagination , #pagecontent >table>tbody>tr>td >table>tbody>tr>td +td.gensmall .pagination {white-space: nowrap!important; line-height: 1.6;} a:link{color: #379!important} .row1, .row2, .row3{padding: 2px 3px!important; vertical-align:top;} td.row1:first-child{padding: 0!important;} td.row1:first-child+.row1{margin: 0 0 1px!important; padding: 0 3px 2px!important;} .row2 p.topicdetails{max-width: 60px;} .row2{padding: 2px 0!important;} #wrapcentre td[width="20%"] .tablebg td.row1{padding: 2px 0!important} script + .tablebg .row1 >div{position: relative;} .tablebg .row1+.row2+.row3{max-height: 1.2em;} .tablebg .row3+.row2+.row3 #last_post{overflow:hidden; max-height: 1.2em;} html>/**/body .tablebg .row3+.row2+.row3 #last_post, x:-moz-any-link, x:default{max-height: 1.2em; margin-top:0!important; padding-left: 60px!important;} *|html[xmlns*=""] .tablebg .row3+.row2+.row3 #last_post{max-height: 1.0em; padding-left: 60px!important;} .tablebg .row1+.row2+.row1+.row2+.row1 , .tablebg .row1+.row1+.row2+.row1+.row2 , .tablebg .row1+.row1+.row2+.row1 , .tablebg .row1+.row1+.row2{width: auto!important;} .tablebg .row1+.row1+.row2+.row1{max-width: 60px;} th{padding: 3px 5px!important;} #wrapcentre+br+.gensmall , #wrapcentre+br+.gensmall+br+br+.tablebg , #wrapcentre+br+.gensmall+br+br+.tablebg+br+.tablebg , #wrapcentre+br+.gensmall+br+br+.tablebg+br+.tablebg+br+.tablebg , form[action*="mode=login"] , #wrapcentre{margin: 0!important; max-width: 1200px; margin: 0 auto!important; background-color: #fff!important;} #wrapcentre+br+.gensmall{display: block;} .row1[width="50"][align="center"]{width: 15px!important; padding:0!important;} .row1[align="center"] > img[width="46"]{width: auto!important; height: auto!important; max-width: 15px; margin-top: 4px!important;} .cat+.catdiv{height: 20px!important;} p.forumdesc{padding: 0!important; margin-top: 3px!important;} .forumlink+.forumdesc{margin: 0 0 0 24px!important;} .forumlink+.forumdesc em{color: #999!important; display: block!important; margin-left: 12px!important;} .tablebg .row1+.row2+.row1+.row2+.row1{text-align: left!important;} .tablebg tr .row1+.row1+.row2+.row2+.row2{white-space: normal!important;} .topicdetails[width="20"]{width: 8px!important; padding: 0!important;} .topicdetails[width="20"]+.topicdetails{padding: 0!important;} .row1:not(.profile) +td.row1 >a >img , .row1+.row1 >td:not(.profile) +td >table a >img , .topicdetails a img , a[href*="viewtopic.php"] >img[width="18"] , #last_post img{position: relative; float: none!important; left: -7px; width: 12px!important; height: 12px!important; margin-top: 2px!important; margin-right: -7px!important; padding: 0!important;} #pagecontent a[href*="viewtopic.php"] >img[width="18"]{height: 7px!important;} #last_post img{left: 1px; margin-right: 0!important;} .tablebg td.row1 a.topictitle{font-weight: normal!important} .tablebg th[colspan="2"]{width: 78%!important} .searchbar+br+.tablebg+br+.tablebg{margin:0 2px 2px!important} .searchbar+br+.tablebg+br+.tablebg th[colspan="2"]+th , table:not(.tablebg)+.tablebg th[colspan="2"]+th{display: block; overflow: hidden; width: 25px!important} .searchbar+br+.tablebg+br+.tablebg th+th+th , table:not(.tablebg)+.tablebg th+th+th{display: table-cell; overflow:auto; width: auto!important} .searchbar+br+.tablebg+br+.tablebg th+th+th+th:not(:last-child) , table:not(.tablebg)+.tablebg th+th+th+th{display: block; overflow:hidden; width: 40px!important} .searchbar+br+.tablebg+br+.tablebg th+th+th+th+th , table:not(.tablebg)+.tablebg th+th+th+th+th{display: table-cell; overflow:auto; width: auto!important} .searchbar+br+.tablebg+br+.tablebg td >span{font-size:9px!important} .searchbar+br+.tablebg+br+.tablebg td >span a img{height: 8px!important} .searchbar+br+.tablebg+br+.tablebg th+th+th+th .row1[width="25"]{width: 12px!important; padding:0!important} .row1[width="25"] img{position: relative; top: 4px; left: -2px;} .tablebg #last_post br{display: none;} .tablebg .row1+.row2+.row3{padding: 1px 0 0 2px!important;} .row3 >.topicauthor{float: left; overflow: hidden; max-width: 60px; padding: 0!important; white-space: nowrap;} .tablebg >tbody>tr>.row1+.row1+.row2+.row1[width="130"] , .row3 .topicauthor{text-align: left!important; max-width: 60px; margin: 0!important; white-space: nowrap; line-height: 1.1;} .tablebg >tbody>tr>.row1+.row1+.row2+.row1[width="130"] .topicauthor{max-width: 60px; overflow: hidden;} .tablebg #last_post{text-align: right;} .tablebg #last_post br + span{display: inline-block; position: relative; overflow: hidden; float: left; top: -0.4em; max-width: 60px; height: 1.6em!important; padding-top: 0!important; white-space: nowrap; line-height: 1.4; font-size: 1.1em!important; background: #d6d7de;} .tablebg #last_post br + span a{max-width: 60px;} html>/**/body .tablebg #last_post br + span, x:-moz-any-link, x:default{top: -1.2em; left: -60px; line-height: 0.9;} *|html[xmlns*=""] .tablebg #last_post br + span{top: -1.2em; left: -60px;} .tablebg >tbody>tr>td> .topicdetails:not(#last_post){display: inline; margin: 0!important; white-space: nowrap;} .tablebg p +.topicdetails{display: inline; float: left;} .tablebg >tbody>tr>.row2+.row1+.row2+.row1{padding: 2px 3px 0 3px!important;} .tablebg >tbody>tr>.row2+.row1+.row2+.row1:hover > p.topicdetails[style="white-space: nowrap;"]{display: none!important;} .tablebg p+.topicdetails a{display: inline-block; position: relative; overflow: hidden; width: 40px; max-width: 40px; white-space: nowrap;} .tablebg p+.topicdetails a+a{width: auto;} .tablebg p+.topicdetails a img{left: -12px;} .tablebg >tbody>tr>.row2+.row1+.row2+.row1 > p.topicdetails a:hover , .row3 .topicauthor:hover , .tablebg p+.topicdetails:hover , .tablebg #last_post br + span:hover , .tablebg >tbody>tr>.row1+.row1+.row2+.row1[width="130"] .topicauthor:hover{overflow: visible; padding-top: 0!important;} .tablebg >tbody>tr>.row1+.row2+.row1:hover+.row2 p , .row3:hover + .row2 p{opacity: 0.4;} .tablebg >tbody>tr>.row2+.row1+.row2+.row1:hover > p.topicdetails a+a{overflow: visible; left: 56px;} .row1[align="center"] > img{width: auto!important; height: auto!important; max-width: 12px;} .row1+.row1 .gensmall{display: inline;} .tablebg #last_post a img{float: right!important;} .tablebg > tbody > tr.row1 td[align="center"]+td:not(.genmed) a[href*="viewprofile"] , .tablebg > tbody > tr.row2 td[align="center"]+td:not(.genmed) a[href*="viewprofile"] {display: inline-block; vertical-align: middle; overflow: hidden; width: 20px!important;} .tablebg > tbody > tr.row1 td[align="center"]+td a[href*="viewprofile"]:hover , .tablebg > tbody > tr.row2 td[align="center"]+td a[href*="viewprofile"]:hover , .tablebg p.forumdesc a[href*="viewprofile"] , .tablebg div >a+a[href*="viewprofile"]:hover {overflow: auto; width: auto!important;} #first_row a[href*="#unread"]{display: inline-block; overflow: hidden; width: 31px!important;} #first_row a:hover[href*="#unread"]{display: inline-block; overflow: auto; width: auto!important;} .profile{min-width: 140px; white-space: normal!important;} .profile br+a+br+br , .profile br+a+br+br+img+br{display: none;} .profile br+img , .profile br+a+br+br+img{float: left; width: auto!important; height: auto!important; max-height: 1.15em; margin-right: 2px!important;} .profile:hover br+img{position: absolute; float: none; max-height: none;} .profile >span{color: #aaa;} .signature .postlink img{max-height: 12px;} .signature .postlink img:hover{position: absolute; max-height: none;} #pagecontent >.tablebg[width="100%"][cellspacing="1"]{border: 1px solid #C2CBD2; border-bottom: 0; border-top: 0; border-spacing: 0!important;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 > td:first-child {border-right: 1px solid #c2cbd2; background-color: #efefef;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1:not(:last-child) > td:first-child {border-bottom: 1px solid #dee3e7;} #wrapcentre >#pagecontent>table>tbody>tr.row2:first-child>td:first-child{border-top: 1px solid #dee3e7;} .postbody{line-height: 1.3!important; margin: -0.2em 0 0 2px!important; font-size: 1.3em!important;} form[name="postform"] +br+script+.tablebg .postbody , #pagecontent +script +table .postbody , #pagecontent .postbody{font-size: 1.1em!important;} .tablebg td[height="25"]{min-height: 22px!important; padding: 0 2px!important;} .postbody+.signature+br+br+.tablebg +br , .postbody+.signature+br+br+.tablebg +br+br , .gensmall +br , .gensmall +br+br , .postbody +br , .postbody +br+br , .signature +br , .signature +br+br{display: none;} .signature br{display: none; width: 20px;} .signature{display: block; margin-left: 62px!important; font-size: 10px!important; font-style: italic; color: #77a!important;} br+br+span >span[style="color: gray;"] , .postbody+.signature+br+br+.tablebg , .postbody+.signature+br+br+.gensmall , .postbody +br+br +.gensmall , .postbody +br+br +.tablebg{padding-left: 92px!important; background-color: transparent!important; font-size: 1.1em!important; font-style: italic; color: gray;} br+br+span >span[style="color: gray;"]{text-decoration: underline;} .codetitle, .quotetitle{top: -1.3em; min-height: 1px; margin: 0 2px 0 8.6em!important; border: 0!important; padding: 0!important; background-color: transparent!important; font-weight: normal!important; font-style: italic;} .codetitle b{color: #060;} .codecontent +br, .quotecontent +br , .codecontent +br+br, .quotecontent +br+br , .quotecontent +br+br+br , .quotecontent +br+br+br+br , .quotetitle b{display: none;} .codecontent{border-color: #aca!important;} .codecontent, .quotecontent{margin: 0 2px 0 5px!important; padding: 0 2px 1px 6px!important; border-width: 1px!important; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; background-color: #fafffc!important; color: #653!important;} tr.row1 td:last-child:not(.gensmall){background-color: #f4f4f4!important;} .codecontent, .quotecontent, .attachcontent{line-height: 1.1em!important;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1 td[align="center"]+td , .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 td[align="center"]+td {height: 1.4em!important;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1 td[align="center"]+td table , .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 td[align="center"]+td table {width: 99%!important;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1 > td[align="center"] , .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 > td[align="center"] , .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 + tr.row2 td.profile + td {background-color: #f4f4f4!important;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1 td[align="center"]:not([width="150"])+td {background-color: #dee3e7!important;} .tablebg div a b{display: none;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1 td , .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 td {padding: 0!important;} .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row1 td > table , .tablebg[width="100%"][cellspacing="1"] > tbody > tr.row2 td > table {width: auto!important; border-spacing: 0!important; margin-left: 6px!important;} .cat form[name="viewtopic"] span.gensmall{display: inline-block; overflow:hidden; width: 75px!important; white-space: nowrap;} .cat form[name="viewtopic"] span.gensmall:hover{overflow: auto; width: auto!important;} td.gensmall a[href*="report.php"] img{left: 0!important; top: 6px;} form[name="postform"] {float: left; width: 100%;} form[name="postform"] table table table:not([width="100%"]) , form#postform table table table{width: 25px; margin-top: 6px!important; border-spacing: 0!important; opacity: 0.25;} form#postform table table >tbody>tr>td[width="80"]{width: 25px!important;} form[name="postform"] table table table:hover , form#postform table table table:hover{opacity: 1;} form[name="postform"] table table table td , form#postform table table table td{padding: 0!important;} form[name="postform"] table table table td img , form#postform table table table td img{width: 5px!important; height: 9px!important;} form[name="postform"] table table textarea , form#postform table table textarea{width: 99.2%!important; height: 235px!important;} form[name="postform"] +br+script+.tablebg .tablebg table>tbody>tr>td[width="100%"]{width: 70px!important;} form[name="postform"] +br+script+.tablebg .tablebg table>tbody>tr>.gensmall{font-style: italic; color: #999;} form[name="postform"] +br+script+.tablebg .tablebg table>tbody>tr>.gensmall b{font-weight: normal;} body.ltr >.linead , body.ltr >#wrapheader >.linead , body>a[name="top"]+style +img[width="1"][height="3"][src*="images/spacer.gif"] , body>a[name="top"]+style +img[width="1"][height="3"][src*="images/spacer.gif"] +br+div+img[width="1"][height="3"][src*="images/spacer.gif"] ,body.ltr >center object ,body.ltr >center a >img[width][height] , div >table.banner , table[style*="border: solid 1px #cc0000"] , table[style="border: 1px solid rgb(204, 0, 0);"]{display: none;} /**/form[name="postform"] +br+script+.tablebg .tablebg img[src*="./images/smilies"] , #pagecontent .postbody img[src*="./images/smilies"]{position: absolute; vertical-align: top; width: 4px!important; height: 13px!important;} #postform #qr_smilies img{max-height: 20px;} #postform >.tablebg #qr_smilies >a>img , form[name="postform"] table table td>a>img[src*="./images/smilies"] , form#postform table table td>a>img[src*="./images/smilies"]{visibility: hidden; opacity: 0.6;} #postform >.tablebg #qr_smilies:hover >a>img , form[name="postform"] table table:hover td>a>img[src*="./images/smilies"] , form#postform table table:hover td>a>img[src*="./images/smilies"]{visibility: visible;} #pagecontent .postbody:hover img[src*="./images/smilies"]{width: 4px!important; height: 13px!important;} #pagecontent .postbody img[src*="./images/smilies"]:hover{width: auto!important; height: auto!important;} form[name="postform"] table table td>a>img[src*="./images/smilies"]:hover , form#postform table table td>a>img[src*="./images/smilies"]:hover{width: auto!important; height: auto!important;} #postform >.tablebg .row1{width: 12%!important;} .qr_float{left: 0!important; right:0!important;} #wrapcentre > table:not(.tablebg):not(.legend)>tbody>tr>td + td:not([width="80%"]):not(.gensmall) , #pageheader + br + br + div#pagecontent > table>tbody>tr>td + td[style="width:160px"] , #pageheader + br + br + div#pagecontent > table>tbody>tr>td + td[style="width: 160px;"] , .searchbar + br + table.tablebg + br + table>tbody>tr>td + td[style="width:160px"] , .searchbar + br + table.tablebg + br + table>tbody>tr>td + td[style="width: 160px;"] , #wrapcentre >br[clear="all"]+table[width="100%"] >tbody >tr >td[width="15"] , #wrapcentre >br[clear="all"]+table[width="100%"] >tbody >tr >td[width="15"] +td , #wrapcentre >br[clear="all"]+table[width="100%"] >tbody >tr >td[width="15"] +td + td , #pagecontent >br[clear="all"]+table[width="100%"] >tbody >tr >td[width="15"] , #pagecontent >br[clear="all"]+table[width="100%"] >tbody >tr >td[width="15"] +td , #pagecontent >br[clear="all"]+table[width="100%"] >tbody >tr >td[width="15"] +td + td ,#menubar >br, #menubar >.needblock , #wrapcentre >.needblock, #pagecontent >.needblock {width: 0!important; display: none;} #wrapcentre >br[clear="all"]+table[width="100%"] , #pagecontent >br[clear="all"]+table[width="100%"]{border: 0!important} body.ltr #wrapfooter{margin: 0 -4px!important; padding: 3px 0 2px!important;} body.ltr >#wrapheader >#wrapfooter{margin: 0!important;} #pagecontent +table +table>tbody>tr>td , #wrapcentre >table:not(.tablebg)>tbody>tr>td , #pagecontent >table>tbody>tr>td{padding: 0 4px 0 0!important;} #pagecontent >table>tbody>tr>td.profile{padding-left: 2px!important;} #pagecontent +table +table>tbody>tr>td >table , body.ltr >img+#wrapheader >table , #wrapcentre >table:not(.tablebg)>tbody>tr>td >table , #pagecontent >table>tbody>tr>td >table{margin: 0 2px!important;} #wrapcentre >table:not(.tablebg)>tbody>tr>td >div:not(#wrapfooter) , #wrapcentre >table:not(.tablebg)>tbody>tr>td >p , #wrapcentre >table:not(.tablebg)>tbody>tr>td >form , #pagecontent >table>tbody>tr>td >table{margin: 0 -2px 0 2px!important; clear: both;} #pagecontent +table +table>tbody>tr>td >br+table+br , #wrapcentre >table:not(.tablebg)>tbody>tr>td >br+table+br , #pagecontent >table>tbody>tr>td >br+table+br , body.ltr >#wrapheader #wrapcentre br[clear="all"]{display: none;} #pagecontent +table +table>tbody>tr>td >br+br+table , #wrapcentre >table:not(.tablebg)>tbody>tr>td >br+br+table , #wrapcentre >table:not(.tablebg)>tbody>tr>td >form+br+table , #pagecontent >table>tbody>tr>td >br+br+table{margin-bottom: 7px!important;} #pagecontent +table +table>tbody>tr>td .tablebg+br+table+br+table+br+table , #wrapcentre >table:not(.tablebg)>tbody>tr>td .tablebg+br+table+br+table+br+table , #pagecontent >table>tbody>tr>td .tablebg+br+table+br+table+br+table {float: right; width: 101%!important; margin: 0 -4px!important; background-color: #f0f5f2!important;} #pageheader+br+br+#pagecontent >table+table.tablebg>tbody>tr >td:first-child+td.row1{border-bottom: 1px solid #dee3e7;} body.ltr >img+#wrapheader >#mmenu , body.ltr >img+#wrapheader >.legend , body.ltr>#wrapfooter{margin: 0 auto!important;} #wrapcentre >table:not(.tablebg)>tbody>tr>td .tablebg+br+table+br+table , #pagecontent >table>tbody>tr>td .tablebg+br+table+br+table {float: right; width: 101%!important; margin: 0 -4px!important; background-color: #f0f5f2!important;} .helpline td.genmed , .tablebg + table + br , .tablebg + table + br +div +br , .tablebg + table + br +div +br +br , #pagefooter + br{display: none;} form[name="postform"] .row1+.row2 >table >tbody >tr >td , #postform .tablebg .row1+.row2 >table >tbody >tr >td{padding: 0!important} #wrapper >#topbanners , body>div[align="center"]>img[width="1"][height="3"][src*="images/spacer.gif"] +table:not([height="24"])[border="0"] , body>div[align="center"]>img[width="1"][height="3"][src*="images/spacer.gif"] ,body >object , #crosssites >p , #wrapper >#header >#uhi object ,#wrapper >#header , #wrapper >#main_table #contentplace object[width="240"] , .rastyazka , #blueline +div table , #wrapper >#header >#uhi .uplinkblock , noindex {display: none;} div[align=center] >object, #wrapper >#header{display: none!important;} #main_table{margin-top: -2px!important} body >#wrapper, #wrapper >#header,#wrapper >#header >#uhi, #wrapper >#crosssites, #wrapper #searcher{width: auto!important; min-width: 100px!important; max-width: 1200px!important; margin: 0 auto} #logo{margin: 0!important;height: 22px!important} #blueline span{float: none!important;} #blueline #grandsearch a >img{position: relative; width: 18px; margin-bottom:-14px!important; top:-9px;} table[height="20"] td+td[nowrap="nowrap"][background="/images/m_s_mid.gif"] , table[height="20"] td+td[nowrap="nowrap"][background="/images/m_ns_mid.gif"] {padding: 0 4px 0 0!important;} table+img+table[height="24"]{height: 20px!important;} table[height="24"] a[href="http://people.overclockers.ru"] , table[height="24"] a[href="http://people.overclockers.ru/"] , table[height="24"] a[href*="//blago."]{display: inline-block; width: 62px; overflow: hidden;} a[href*="//blago."]{width: 50px;} table[height="24"] a:hover[href="http://people.overclockers.ru"] , table[height="24"] a:hover[href="http://people.overclockers.ru/"], table[height="24"] a:hover[href*="//blago."]{display: inline;} table+img+table[height="24"] td[height="4"] , table+img+table[height="24"] td[height="24"]{height: 0!important;} table+img+table[height="24"]> tbody >tr+tr >td+td table td{display: block; overflow: hidden; max-width: 205px!important; height: 18px!important;} table+img+table[height="24"]> tbody >tr+tr >td+td span.small{display: block; overflow: hidden; width: auto!important; float: right!important; margin-right: -12px; white-space: nowrap;} table+img+table[height="24"]> tbody >tr+tr >td+td span.small noindex{display: none;} table+img+table[height="24"] , .navbg , .navbg+div+div+table , .navbg+div+div+table+table{max-width: 1200px;} .navbg img[src="/images/sethomepage.gif"] , table+img+table[height="24"]+table[cellpadding="2"] , .navbg+div+div{display: none;} .navbg a{color: #79a!important;} #leftplace object , .navbg+div+div+table[bgcolor="#cccccc"]+table>tbody>tr>td[width="12%"] object , #leftplace #left-bs , #leftplace >br ,div[id*="yandex_ad"] ,iframe[id*="google_ad"],iframe[id*="swift"],ins[id*="swift"] ,.flash-box {display: none!important;} #leftplace .menu{margin:0 0 7px 2px!important} #leftplace .menu >div{padding:2px 5px 3px 16px!important} #leftplace >div.menu ul li{line-height:1} #leftplace .menu div:first-child+div+div+div , #leftplace a img[src*="150x400"] , noindex a[title="Enermax"] , .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td[width="12%"]>div+style+table >tbody >tr +tr >td >.menu >div+div+div+div+div+div , #mainplace .adblo , #mainplace >table >tbody >tr:first-child {display: none;} #mainplace{padding: 0 5px 0 7px!important} #mainplace #contentplace, #mainplace #contentplace #hpath{width: auto!important} #hpath a{white-space:normal!important} #mainplace #contentplace #fixoldhtml img{width: auto!important; height: auto!important; max-width: 100%!important} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td[width="12%"]>div+style+table >tbody >tr +tr >td >.menu >div+div+div+div+div +div+div {display: block;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td[width="12%"]>div+style+object+table >tbody >tr +tr >td >.menu >div+div+div+div+div {display: none;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td[width="12%"]>div+style+object+table >tbody >tr +tr >td >.menu >div+div+div+div+div +div+div {display: block;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td[width="12%"] br+div >noindex >table[width="160"] , .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td[width="12%"] br+div >br +table[width="160"] , #mainplace .decoblock-content.compress , #mainplace .decoblock tr:first-child td , #mainplace #contentplace .tags+.decoblock+.decoblock-content .info .half , #mainplace #contentplace #vote_buttons +.tags+.decoblock , #mainplace #contentplace #vote_buttons +.tags+.decoblock+.decoblock-content , #mainplace #contentplace >div[align=center] >object {display: none;} #mainplace .decoblock tr:first-child td.tl+td ,#mainplace .decoblock tr:first-child td.tl,#mainplace .decoblock tr:first-child td.tr {display: table-cell;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div{display: none;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou{display: block;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou >table {border-spacing: 2px!important;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou >table >tbody >tr {display: none;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou >table >tbody >tr+tr+tr {display: table-row;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou >table >tbody >tr+tr br {display: none;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou >table >tbody >tr+tr+tr >td >table {margin-bottom: 1px;} .navbg+div+div+table[bgcolor="#cccccc"]+table >tbody >tr >td +td >div+div.nou >table >tbody >tr+tr+tr >td >div[align="center"] {display: none;} .fifty-fifty-right >.decoblock-content +div[align="center"] ,body>div+div>a[href*="notebook.ru"]{display: none;} body>div>table[cellpadding="3"] >tbody >tr >td+td{text-align: center;} body>div>table[cellpadding="3"] >tbody >tr >td+td+td{width: 1%!important} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td+td[width="12%"] , div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td+td[width="12%"] >div {width: 0!important; display: none;} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td+td[width="12%"] >div >spacer[width="125"] , div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td+td[width="12%"] >div +table[width="100%"] +table[width="160"] {width: 0!important; display: none;} #rightplace{padding-right:2px!important} #rightplace >img+br, #rightplace .infoblock_r+br, #rightplace >a >img,#rightplace >a +br{display: none} #rightplace .infoblock_r{margin:0 0 2px!important;padding:2px 1px 4px 3px!important} #rightplace .infoblock_r .ucontent li{line-height:1.2;color:#b9b9b9} td[width="300"][bgcolor="white"]{} div[id*="topadvert"],table[class*="topadvert"],.topadvert_div{display: none!important} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td+td[width="200"] {width: 0!important; display: none;} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td >table >tbody >tr >td >div+br+div {width: 100%!important; max-width: 1058px;} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td >table >tbody >tr >td >div+br+div p , div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td >table >tbody >tr >td >div+br+div center{max-width: 900px;} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td >table >tbody >tr >td >div+br+div center object, div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody >tr >td[width="12%"]+td >table >tbody >tr >td >div+br+div p >table[width="100%"][cellpadding="0"][border="0"] >tbody>tr>td >table[height="245"] {display: none;} .navbg+div+div+table[bgcolor="#cccccc"]+table>tbody>tr>td +td >table>tbody>tr>td >div+br+div.nou >table +br+h3 , .navbg+div+div+table[bgcolor="#cccccc"]+table>tbody>tr>td +td >table>tbody>tr>td >div+br+div.nou >table +br , .navbg+div+div+table[bgcolor="#cccccc"]+table>tbody>tr>td +td >table>tbody>tr>td >div+br+div.nou >table , #contentplace #hpath:first-child +.decoblock , #contentplace #hpath:first-child +.decoblock+.decoblock-content {display: none;} .navbg+div+div+table[bgcolor="#cccccc"]+table>tbody>tr>td +td >table>tbody>tr>td >div+br+div.nou >table +br+h3+ul {margin: 0!important;padding-left: 20px;} .navbg+div+div+table[bgcolor="#cccccc"]+table>tbody>tr>td +td >table>tbody>tr>td >div+br+div.nou >table +br+h3+ul .pw >div {margin-left: 6em!important;} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody>tr>td[width="12%"]+td >table>tbody>tr>td >div+br+div >table[width="100%"][border="0"][bgcolor="#dddddd"] , div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody>tr>td[width="12%"]+td >table>tbody>tr>td >div+br+div >table[width="100%"][border="0"][bgcolor="#dddddd"]+br {display: none;} div+table[width="100%"][bgcolor="#cccccc"]+table[width="100%"] >tbody>tr>td[width="12%"]+td >table>tbody>tr>td >div+br+div >table[width="100%"][border="0"][bgcolor="#dddddd"] +br+h3 {margin: 0!important;} body>div[align="center"] >br+div[align="center"] >table[width="600"][cellpadding="5"][align="center"]{display: none;} body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td{line-height: 8px;} #main_table +#footer, #maintable +#footer{min-width: 100px!important;} #main_table +#footer div[style*="width:700px"] .decoblock , #main_table +#footer div[style*="width:700px"] .decoblock+.decoblock-content {display: none;} body.ltr >#wrapheader +#wrapfooter >.copyright +br , body.ltr >#wrapheader #wrapfooter >.copyright +br , body.ltr >#wrapheader +#wrapfooter >.copyright +br+br , body.ltr >#wrapheader #wrapfooter >.copyright +br+br , body.ltr >#wrapheader +#wrapfooter >.copyright br , body.ltr >#wrapheader #wrapfooter >.copyright br , body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td br{display: none;} body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td img , body.ltr >#wrapheader +#wrapfooter >a >img[width="88"] , body.ltr >#wrapheader #wrapfooter >a >img[width="88"] {height: 8px!important;} body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td img:hover , body.ltr >#wrapheader +#wrapfooter >a >img:hover[width="88"] , body.ltr >#wrapheader #wrapfooter >a >img:hover[width="88"]{height: auto!important;} body.ltr >#wrapheader +#wrapfooter >.copyright , body.ltr >#wrapheader #wrapfooter >.copyright , body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td >div.light{color: #e2e2e2!important;} body.ltr >#wrapheader +#wrapfooter >.copyright:hover , body.ltr >#wrapheader #wrapfooter >.copyright:hover , body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td >div:hover.light{color: #999!important;} body.ltr >#wrapheader +#wrapfooter >.copyright a , body.ltr >#wrapheader #wrapfooter >.copyright a , body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td a{opacity: 0.1;} body.ltr >#wrapheader +#wrapfooter >.copyright a:hover , body.ltr >#wrapheader #wrapfooter >.copyright a:hover , body>div:first-child[align="center"] >table[width="100%"][cellpadding="3"] >tbody>tr>td.small +td a:hover{opacity: 1;} body>div[align="center"] +div[align="center"] +div:last-child[align="center"]{display: none;} body>div:first-child[align="center"] >table[width="100%"][height="1"][bgcolor="#dddddd"]{background-color: #fff!important;} body>div:first-child[align="center"] >table[width="100%"][height="1"][bgcolor="#dddddd"] +table>tbody>tr>td >a[target="_top"] >img[width="240"]{display: none;}';
if(typeof GM_addStyle != "undefined"){
	GM_addStyle(css);
}else if (typeof addStyle != "undefined"){
	addStyle(css);
}else{
	var heads = document.getElementsByTagName("head");
	if(heads.length > 0){
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
var win = (typeof unsafeWindow !='undefined')? unsafeWindow: window;
wcl = function(){ //консоль как метод строки или функция, с отключением по settings.noConsole.val ==1
	if(win.console && (!window.settings || window.settings && !window.settings.noConsole.val))
		win.console.log.apply(console, this instanceof String
			? ["'=="+this.toString()+"'"].concat([].slice.call(arguments))
			: arguments
		);
};
String.prototype.wcl = wcl;

window.addEventListener("DOMContentLoaded", readyLoad = function(){ //========ready==============
//цвет фона (просто в стилях -нельзя, если ставить их в общие стили -Safari, IE)
	if(/forums/.test(location.hostname)) document.body.style.backgroundColor ='#F0F5F2';
//невылет на главную при авторизации; (иногда приводит к ош.после удаления фрейма)
	if(/ucp.php\?mode=(login|logout)/.test(location.href)){ //вывод сообщений "Выполен вход/выход"
		var logXX = document.createElement("DIV");
		logXX.style.position ='absolute';
		logXX.style.top ='80px';
		logXX.style.left = Math.floor(self.innerWidth *0.15) +'px';
		logXX.style.width ='70%';
		logXX.style.padding ='18px';
		logXX.style.border ='2px solid #b44';
		logXX.style.MozBorderRadius ='8px';
		logXX.style.textAlign ='center';
		logXX.style.backgroundColor ='#da8';
		logXX.style.fontSize ='24px';
		logXX.style.fontWeight ='bold'; //слово "Выполняется В(Ы)ХОД"
		logXX.innerHTML =unescape('%u0412%u044B%u043F%u043E%u043B%u043D%u044F%u0435%u0442%u0441%u044F %u0412'
			+(/logout/.test(location.href)?'%u042B':'')+'%u0425%u041E%u0414');
		document.body.appendChild(logXX);
		
		if(top != self){
			var unLo = function(ev){
				self.stop();
				top.location.reload();
			}
			window.addEventListener("beforeunload", unLo, !1);
			setTimeout(unLo, 7999);
		}
	}
	ifrReload = function(ev){ //подгрузка страницы авторизации в фрейм
		var logFrame = document.createElement("IFRAME");
		document.body.appendChild(logFrame);
		logFrame.name ='ifrLog';
		logFrame.style.position ='absolute';
		logFrame.style.width ='100%';
		logFrame.style.height ='210px';
		logFrame.style.borderBottom = '6px inset';
		logFrame.style.top ='0';
		logFrame.style.overflow ='hidden';
		logFrame.frameBorder = '0';
		if(this.href) {logFrame.src = this.href;}
		else{
			var ch = document.querySelector('form[action*="./ucp.php?mode=log"] input[name="autologin"]').checked;
			var docW = '<body onload="document.forms[0].submit()"><form action='
				+'"http://forums.overclockers.ru/ucp.php?mode=login" method="post">'
				+'<input type="hidden" name="username" value="'
				+ document.querySelector('form[action*="./ucp.php?mode=log"] input[name="username"]').value
				+'"/><input type="hidden" name="password" value="'
				+ document.querySelector('form[action*="./ucp.php?mode=log"] input[name="password"]').value
				+'"/><input type="hidden" name="autologin" value="'
				+ (ch ? 'on' : 'off') +'"/><input type="hidden" name="login" value="Вход"/></form></body>';
			logFrame.src="javascript: document.open(); document.write("+ docW +"); document.close();";
		}
		ev.preventDefault();
	}
	document.domain ='overclockers.ru';
	if(top == self){
		if(document.querySelector('a[href*="./ucp.php?mode=log"]'))
			document.querySelector('a[href*="./ucp.php?mode=log"]').addEventListener("click", ifrReload, !1);
		if(document.querySelector('form[action*="./ucp.php?mode=log"]'))
			document.querySelector('form[action*="./ucp.php?mode=log"]').addEventListener("submit", ifrReload, !1);
	}

//Label для "Искать в данной теме"
	if(document.querySelector('#search-box #search input[type="checkbox"]')){
		var o = document.querySelector('#search-box #search input[type="checkbox"]');
		if(o){
			o.id = 'searchInTheme';
			var o1 = o.nextSibling;
			var tx = o1 && o1.parentNode.removeChild(o1);
			o1 = o.nextSibling;
			var o2 = document.createElement("LABEL");
			o2.setAttribute('for', o.id);
			if(tx && o1){
				o2.appendChild(tx);
				o1.parentNode.insertBefore(o2, o1);}
		}
	}
// укорочение "Размер шрифта"->"aA"
	if(document.querySelector('form#postform, form[name="postform"]')){
		var o = document.querySelector('form#postform table table:not([align="center"]) >tbody, form[name="postform"] table table:not([align="center"]) >tbody');
		var o1 = document.createElement("SPAN");
		o1.style.fontVariant ='small-caps';
		o1.innerHTML ='<span style="font-variant: small-caps;">a</span>A:';
		if(o){
			var o2 = o.querySelector('tr:first-child td span.genmed.nowrap');
			if(o2)
				o2.replaceChild(o1, o2.firstChild);
		}
	}
	var PlavOtv ='%u041F%u043B%u0430%u0432%u0430%u044E%u0449%u0438%u0439 %u043E%u0442%u0432%u0435%u0442'
	, BystrOtv = '%u0411%u044B%u0441%u0442%u0440%u044B%u0439 %u043E%u0442%u0432%u0435%u0442'; //'Быстрый ответ'
//перенос ссылки "Плав.форма"
	if(document.querySelector('form#postform')){
		var o = document.querySelector('form#postform table table:not([align="center"]) >tbody>tr:first-child>td');
		if(o){
			var o2 = o.querySelector('.qr_float_link');
			if(o2){
				o2.innerHTML
					= unescape(document.querySelector('.qr_float form#postform')
						? BystrOtv
						: PlavOtv); //Плав.отв
				o2.setAttribute('onclick',
					'toggleQRFloatForm(); this.innerHTML=unescape(document.querySelector(".qr_float form#postform")?"'
					+ BystrOtv +'":"'+ PlavOtv +'");var o;if(o=document.querySelector("#pagecontent #first_row >tbody >tr >td .qr_float_link")) o.innerHTML=unescape("'+PlavOtv+'");');
				var o1 = o.removeChild(o2);
				document.querySelector('form#postform >table >tbody >tr:last-child>td').appendChild(o1);
				var o1 = o.lastChild;
				for(var i =0; i <10; i++){ //мусор "| |"
					if(o1.nodeValue && o1.nodeValue.search(/\|/)>=0){
						o.removeChild(o1);
						o1 = o.lastChild;
					}else
						o1 = o1.previousSibling;
				}
				o.querySelector('.genmed.nowrap +a').innerHTML = unescape('%u0421%u043C'); //'См'
				o.querySelector('.genmed.nowrap +a').title = unescape('%u0421%u043C%u0430%u0439%u043B%u0438%u043A%u0438'); //'Смайлики'
			}
		}
	}
// Распирающая строка вверху
	var o = document.querySelector('#pagecontent #first_row >tbody >tr >td');
	if(o){
		o.querySelector('a:first-child').innerHTML
			= unescape('%u041F%u043E%u0434%u043F%u0438%u0441%u0430%u0442%u044C%u0441%u044F'); //Подписаться
		if(o.querySelector('a[href*="&view=print"]'))
			o.querySelector('a[href*="&view=print"]').innerHTML
				= unescape('%u0414%u043B%u044F %u043F%u0435%u0447%u0430%u0442%u0438'); //'Для печати'
		if(o.querySelector('.qr_float_link'))
			o.querySelector('.qr_float_link').innerHTML = unescape(PlavOtv); //Плав.отв
		if(o.querySelector('.qr_float_link'))
			o.querySelector('.qr_float_link').setAttribute('onclick', 'toggleQRFloatForm(); this.innerHTML="'+ unescape(PlavOtv)+'";');
		if(o.querySelector('a[href*="/memberlist.php"]')){
			var o1 = o.querySelector('a[href*="/memberlist.php"]').previousSibling; //удалить "Сообщить другу"
			if(o1)
				o.removeChild(o1.nextSibling);
		}
		for(var i =0; i <3; i++) //мусор "| |"
			if(o1 && o1.nodeValue && o1.nodeValue.search(/\|/)>=0){
				o.removeChild(o1);
				o1 = o.lastChild;
			}else
				if(o1) o1 = o1.previousSibling;
	}
	var o = document.querySelector('#pagecontent >table>tbody>tr>td[align="left"]:first-child');
	if(o && o.querySelector('img[src*="button_topic_new"]')){
		var o1 = o.lastChild;
		for(var i =0; i <9; i++){ //мусор "| |" после "Новая тема"
			if(o1.nodeValue && o1.nodeValue.search(/\//)>=0){
				o.removeChild(o1);
				break;
			}
			if(o1)
				o.removeChild(o1);
			o1 = o.lastChild;
			if(!o1) break; 
		}
	}
// подпись - к низу блока сообщ_
	var s1 = '#pagecontent .tablebg >tbody >.row1:last-child'
	, s2 = '#pagecontent .tablebg >tbody >.row2:last-child'
	, o1 
	, o2 
	, a = document.querySelectorAll(s1 +' >.profile, '+ s2 +' >.profile')
	, iL = a.length;
	for(var i=0; i < iL; i++){
		if(o1 = a[i].parentNode.querySelector('td.profile+td .signature')){
			a[i].setAttribute('rowSpan', "2");
			//alert(o1.innerHTML);
			var tr = document.createElement("TR")
			, td = document.createElement("TD")
			, d1 = document.createElement("DIV");
			d1.innerHTML = o1.innerHTML.replace(/(\r\n|\n|^<br>)/g,'').replace(/<br>/g,'/ ')
				.replace(/_{9}/g,'____').replace(/(\S{80})/g, '$1 ');
			o1.innerHTML = '';
			td.appendChild(d1);
			tr.appendChild(td);
			tr.style.backgroundColor ='#f4f4f4';
				td.style.verticalAlign ='bottom';
				d1.style.width = "100%";
				d1.style.overflow = 'hidden';
				d1.style.wordWrap = 'break-word'; //(не работает, баг на длинные слова
			tr.style.color ='#77a';
			tr.style.fontSize ='10px';
			tr.style.fontStyle ='italic';
			a[i].parentNode.parentNode.appendChild(tr);
			a[i] = a[i].parentNode.querySelector('tr:last-child td');
	}}
	
	
// Убрать слова "Сообщений 1-2-3", если все видны на экране (предварительно)
	checkHigh();
// "Непрочитанные | Новые | Ваши сообщения"
	var a = document.querySelectorAll('#wrapcentre >.searchbar >span+span >a:not(:last-child)');
	for(var i in a){
		if(a[i].innerHTML)
			a[i].innerHTML = a[i].innerHTML.replace(/ .+/, '');
	}
// перенос дат (позже, если будет)
/*	var o = document.querySelector('#datebar table .gensmall +.gensmall');
	var o1 = document.querySelector('#wrapcentre .tablebg .breadcrumbs +.datetime');
	o1.innerHTML = o.innerHTML;
	o.innerHTML ='';
	o1.style.color = '#8bb';
	
	var o = document.querySelector('#datebar table .gensmall');
	var o1 = document.querySelector('#login_menu tr+tr>td');
	
	var o2 = document.createElement("DIV");
	o2.innerHTML = o.innerHTML;
	o.innerHTML = '';
	o1.insertBefore(o2, o1.querySelector('a'));
	o2.style.float = 'left';*/
// правка профильных данных в теме
	var a = document.querySelectorAll('.profile')
	, iL = a.length;
	//var s='';
	for(var i=0; i < iL; i++){ //слова, "Статус" -убрано; "Регистрация"->"От", "Откуда"->"Из".
		a[i].innerHTML = a[i].innerHTML.replace(RegExp(unescape('%u0421%u0442%u0430%u0442%u0443%u0441:')), '')
			.replace(RegExp(unescape('%u0420%u0435%u0433%u0438%u0441%u0442%u0440%u0430%u0446%u0438%u044F:')), unescape('%u041E%u0442:'))
			.replace(RegExp(unescape('%u041E%u0442%u043A%u0443%u0434%u0430:')), unescape('%u0418%u0437:'));
	// перенос ссылки цитирования (направо)
		/*var L=a[i].childNodes.length;
		if(L >0)
		for(var j =0; j < L; j++){
			s += a[i].childNodes[j].nodeName+':'+a[i].childNodes[j].nodeValue+' ';
		}*/
		if(a[i] && a[i].querySelector('img[src*="styles"]')){
			a[i].removeChild(a[i].querySelector('img[src*="styles"]').previousSibling); //BR перед первым"предупрежд."
			if(a[i].querySelector('img[src*="styles"]').previousSibling.tagName =='BR')
				a[i].removeChild(a[i].querySelector('img[src*="styles"]').previousSibling);
		}
		if(a[i] && a[i].querySelector('a[href*="#postform"]')){
			a[i].removeChild(a[i].querySelector('a[href*="#postform"]').previousSibling); //BR перед "цитировать"
			a[i].removeChild(a[i].querySelector('a[href*="#postform"]').nextSibling); //BR после "цитировать"
			var o = a[i].removeChild(a[i].querySelector('a[href*="#postform"]')); //"Цитировать"
			var o1 = a[i].parentNode.previousSibling.previousSibling.querySelector('a[href*="posting.php"]');
			//o1.parentNode.insertBefore(o, o1.previousSibling); //"Цитировать" на нов.место
		}
		if(a[i] && a[i].querySelector('br +span')){
			a[i].removeChild(a[i].querySelector('br +span').previousSibling); //BR перед статусом
			if(a[i].querySelector('br +span').previousSibling && a[i].querySelector('br +span').previousSibling.tagName =='BR')
				a[i].removeChild(a[i].querySelector('br +span').previousSibling); //2-е BR перед статусом
		}
		//s+='\n';
	};//alert(s)
// если новых ЛС не 0, то красное и Bold
	var o = document.querySelector('#menubar #login_menu >tbody>tr >td >a[href*="folder=inbox"]');
	if(o){
		var c = parseInt(o.querySelector('strong').innerHTML);
		if(c){
			o.style.color = c ? '#c33' : '#000';
			o.style.fontWeight = c ? 'bold' : 'normal';
			o.style.backgroundColor = c ? '#FDD2CC' : 'transparent';
		}
	}
//первое непрочитанное
	if(o = document.querySelector('#pagecontent >table>tbody>tr>td:first-child >a[name="unread"]+a'))
		o.title = unescape('%u041F%u0435%u0440%u0432%u043E%u0435 %u043D%u0435%u043F%u0440%u043E%u0447%u0438%u0442%u0430%u043D%u043D%u043E%u0435');
	
	
	//alert(document.styleSheets[3].cssRules.length)
	//alert(document.querySelectorAll('STYLE')[1].innerHTML.replace(/.{3000}(.+)/, ''))
	
}, !1); //========/ready==============
checkHigh = function(){ // Убрать слова "Сообщений 1-2-3", если все видны на экране
if(!document.querySelector('#pagecontent >table>tbody>tr>td.gensmall:last-child')) return;
	var winH = self.innerHeight;
	var pH = (document.querySelector('#pagecontent') && document.querySelector('#pagecontent').offsetHeight)
		+(document.querySelector('#menubar') && document.querySelector('#menubar').offsetHeight)
		+(document.querySelector('#wrapcentre .searchbar') && document.querySelector('#wrapcentre .searchbar').offsetHeight)
		+(document.querySelector('#wrapcentre >.tablebg') && document.querySelector('#wrapcentre >.tablebg').offsetHeight);
	var s = '#pagecontent >table>tbody>tr>td.gensmall:last-child';
	var q = document.querySelector(s);
	var q2 = document.querySelectorAll(s);
	if(winH > pH && Number(q.innerHTML.replace(/\D/g, '') <21)){
		q.style.visibility = 'hidden';
		if(q2.length >1)
			q2[1].style.visibility = 'hidden';
	}else{
		q.style.visibility = 'visible';
		if(q2.length >1)
			q2[1].style.visibility = 'visible';
	}
// (дубль для совм.) укорочение "Размер шрифта"->"aA"
	if(document.querySelector('form#postform, form[name="postform"]')){
		var o = document.querySelector('form#postform table table:not([align="center"]) >tbody, form[name="postform"] table table:not([align="center"]) >tbody');
		var o1 = document.createElement("SPAN");
		o1.style.fontVariant ='small-caps';
		o1.innerHTML ='<span style="font-variant: small-caps;">a</span>A:';
		if(o){
			var o2 = o.querySelector('tr:first-child td span.genmed.nowrap');
			if(o2)
				o2.replaceChild(o1, o2.firstChild);
		}
	}
}
window.addEventListener("load", checkHigh, !1); //========/load==============

if(/Chrome\//.test(navigator.userAgent)) //для Хрома: эти события не существуют для юзер-скрипта
	readyLoad();
