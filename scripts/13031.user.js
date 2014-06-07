// Sonic BBS
// version 0.25 
// Copyright (c) Yu Jianrong
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Sonic BBS
// @description   Parse sonic BBS under firefox
// @include       http://sonicbbs.eastday.com/topicdisplay.asp*
// @include       http://sonicbbs.eastday.com/
// @include       http://sonicbbs.eastday.com/index*
// @include       http://sonicbbs.eastday.com/reply.*
// @include       http://sonicbbs.eastday.com/replyedit.*
// @include       http://sonicbbs.eastday.com/topicedit.*
// @include       http://sonicbbs.eastday.com/search.*
// @include       http://sonicbbs.eastday.com/new.*
// @include       http://sonicbbs.eastday.com/userdetail.asp*
// @include       http://mail.sonicbbs.com/sonicchat/search*
// ==/UserScript==
//
// Update:
// 2007.10.15
// + 加入编辑帖子(reply.asp)和回复贴子(topicedit.asp)的支持，现在表情图标、颜色和格式图标都可以使用了
// + 加入脚本命令”扩张页面“使页面宽度改为屏幕宽度的85%，而不是固定的760像素，"使用缺省页面"恢复
// * 修复一些小bug
// 2007.10.16
// + 加入search.asp颜色调整
// + 加入发表新帖(new.asp)页面支持，与编辑、回复页面相同
// 2007.10.20
// + 颜色调整加入search2和search3页面
// 2007.11.5
// * 修复首页板块中第一个讨论区无法进入的bug.
// + 加入页面userdetail.asp的颜色调整
// 2007.11.25
// * 更新相册链接转换部分
// 2007.11.26
// * 增加回帖编辑页面(replyedit.asp)的支持

function ProcessIndexPage()
{
    var nodehead = document.evaluate("/html/body/center/xml/bbs/board", document, null, XPathResult.ANY_TYPE, null);
    function rs(id)
    {
        if (id == "boardid")
            return rs.node.childNodes[0].textContent;
        else if(id == "boardname")
            return rs.node.childNodes[1].textContent;
        else
            return rs.node.childNodes[2].textContent;
    }
    rs.node = nodehead.iterateNext();

    //var html_BoardTop = "<table class='outtable' cellspacing='0'><tr><td class='outtd'><table cellspacing='1' cellpadding='4' class='maintable'><colgroup><col class='listbody'><col bgcolor='#FFFFFF'><col class='listbody'></colgroup>"
    var html_BoardTop = "<table class='outtable' cellspacing='0'><tr><td class='outtd'><table cellspacing='1' cellpadding='4' class='maintable'><colgroup><col class='listbody'><col class='listbody'><col class='listbody'></colgroup>"
    var html_BoardDown = "</table></td></tr></table>"
    var HTML = ""
    var i = 0
    var iFlag = false
    while (rs.node)
    {
        if (rs("boardid") == 0)
        {
            if (iFlag)
            {
                iFlag = false
                HTML += html_BoardTop + "<tr><td class='listtitle' colspan='3'><a href='javascript:boardDisplay(8)'><font color=#FFFFFF>business</font></a></td></tr>"
                HTML += "<tbody id=boardGroup8>"
                HTML += "<td style='padding-left: 6' width='100%'>"
                
                HTML += "<table border='0' width='100%' cellspacing='6' cellpadding='0'>"
                HTML += "<tr>"
                HTML += "<td style='padding-right: 6; padding-left: 2' width='120'>"
                HTML += "<a href='http://sonicbbs.eastday.com/boarddisplay.asp?BoardID=47' target='_blank'><img src ='http://mail.sonicbbs.com/sonicchat/images/benbenlogo.jpg' width='116' height='69' border=0></a>"
                HTML += "</td>"
                HTML += "<td>"
                HTML += "<table border='0' width='100%' cellspacing='4' cellpadding='0'>"
                HTML += "<tr>"
                HTML += "<td style='font-size: 14px'>"
                HTML += "<b><a href='http://sonicbbs.eastday.com/boarddisplay.asp?BoardID=47' target='_blank'>BBZ</a></b>"
                HTML += "</td>"
                HTML += "<td align='right'>Master:"
                HTML += "<a href='http://sonicbbs.eastday.com/message/index.asp?r=FLK&i=01' target='_blank'>FLK</a> , "
                HTML += "<a href='http://sonicbbs.eastday.com/message/index.asp?r=syz2000&i=01' target='_blank'>syz2000</a> , "
                HTML += "<a href='http://sonicbbs.eastday.com/message/index.asp?r=bios45&i=01' target='_blank'>bios45</a>"
                HTML += "</td>"
                HTML += "</tr>"
                HTML += "<tr>"
                HTML += "<td colspan='2'>"
//                HTML += "本本族笔记本专卖是专门从事开发销售计算机软、硬件、网络、通讯设备的专业公司；是一定集成软硬件产品、解决方案及服务于一身的高科技企业。公司拥有一批年轻有为，朝气蓬勃的专业技术人员和管理人才。"
                HTML += "</td>"
                HTML += "</tr>"
                HTML += "</table>"
                HTML += "</td>"
                HTML += "</tr>"
                HTML += "</table>"
                
                HTML += "</td>"
                HTML += "</tbody>" + html_BoardDown				
            }
            HTML += html_BoardTop + "<tr><td class='listtitle' colspan='3'><a href='javascript:boardDisplay(" + rs("master") + ")'><font color=#FFFFFF>" + rs("boardname") + "</font></a></td></tr>"
            if (rs("boardname") == unescape("%u9ED8%u8BA4%u9690%u85CF%u677F%u5757"))
                HTML += "<tbody id=boardGroup" + rs("master") + " style='display: none'>"
            else
                HTML += "<tbody id=boardGroup" + rs("master") + ">"
            rs.node= nodehead.iterateNext();
            i = 0
        }
        if (rs("boardid") == 190)
        {
            iFlag = true					
        }
        if (i++ % 3 == 0) HTML += "<tr>"
        if (rs("boardid") == -1)
        {
            HTML += "<td style='padding-left: 6' width='33%'></td>"
        }
        else
        {
            HTML += "<td style='padding-left: 6' width='33%'><table><tr><td style='padding-right: 6'>"
            if (unsafeWindow.toDate(unsafeWindow.GetCookie("EnterTime_" + rs("boardid"))) > unsafeWindow.toDate(unsafeWindow.lastTimeArray[rs("boardid")]))
                HTML += "<img src='http://mail.sonicbbs.com/sonicchat/images/off.gif' width='18' height='18'>"
            else
                HTML += "<img src='http://mail.sonicbbs.com/sonicchat/images/on.gif' width='18' height='18'>"
            HTML += "</td><td><a href='boarddisplay.asp?BoardID=" + rs("boardid") + "'><b>"
            HTML += rs("boardname") + "</b></a><br>"
            HTML += rs("master") + "</td></tr></table></td>"
        }
        rs.node= nodehead.iterateNext();
        if (rs.node)
        {
            if (rs("boardid") == 0)
                {
                HTML += "</tbody>" + html_BoardDown
                }
        }
        if (i % 3 == 0) HTML += "</tr>"
    }
    HTML += html_BoardDown
    var content = document.getElementById("content");
    content.innerHTML = ""

    var xmlsectionResult = document.evaluate('//*[@id="xmlDoc"]', document, null, XPathResult.ANY_TYPE, null);
    var xmlsection = xmlsectionResult.iterateNext();
    xmlsection.innerHTML = HTML;

}

function ProcessTopicDisplayPage_PageProcess( Extend )
{
    GM_setValue("PageExtend" , Extend );
    var WidthText = Extend ? '85%':'760px';

//    for (var i=0; i< document.styleSheets.length;++i)
//        for (var j=0; j< document.styleSheets[i].cssRules.length; ++j)
//        {
//            with( document.styleSheets[i].cssRules[j] )
//            switch(selectorText)
//            {
//            case ".outtable":
//                style.width = WidthText;
//                break;
//            }
//        }
    document.styleSheets[0].deleteRule(9);
    document.styleSheets[0].insertRule(".outtable { background-color:#D6D6D6; width:" + WidthText +"; }",9 );
    with( ProcessTopicDisplayPage_PageProcess )
    {
        for(var i=0 ; i< TableArray.length; ++i)
            for (var j=0; j<TableArray[i].attributes.length; ++j)
                if (TableArray[i].attributes[j].nodeName == 'width')
                    TableArray[i].attributes[j].nodeValue = WidthText;
    }
}

ProcessTopicDisplayPage_PageProcess.TableArray = new Array;

function ProcessTopicDisplayPage()
{
    var ModifyTables = document.evaluate(
            "/html/body/center/table[@width=760]",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    for (var i = 0; i < ModifyTables.snapshotLength; i++) 
    {
        ProcessTopicDisplayPage_PageProcess.TableArray.push( ModifyTables.snapshotItem(i) );
    }

    GM_registerMenuCommand("\u6269\u5F20\u9875\u9762", function(){ProcessTopicDisplayPage_PageProcess(true);} );
    GM_registerMenuCommand("\u4F7F\u7528\u7F3A\u7701\u9875\u9762", function(){ProcessTopicDisplayPage_PageProcess(false);});
    ProcessTopicDisplayPage_PageProcess(GM_getValue("PageExtend" , false ))

    document.styleSheets[0].deleteRule(1);
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule("body { font-size: 12px; line-height: 150%; cursor: default; background-color: #555555; background-image: url('http://60.190.145.156/sonicchat/images/bg.gif'); margin: 0 }",0 );
    document.styleSheets[0].insertRule("table, td { font-size: 12px; line-height: 140% }",0 );

    unsafeWindow.content = document.getElementById("content");
    unsafeWindow.tdPages = document.getElementById("tdPages");
    unsafeWindow.pbar = document.getElementById("pbar");

    unsafeWindow.tdpbar = document.getElementById("tdpbar");
    unsafeWindow.spanPage = document.getElementById("spanPage");
    unsafeWindow.content.innerHTML = "";

    unsafeWindow.xmlDocUserDetail = document.implementation.createDocument("", "", null);
    unsafeWindow.xmlDocTopic = document.implementation.createDocument("", "", null);

    unsafeWindow.userIDArray = new Array();
    unsafeWindow.userIconArray = new Array();
    unsafeWindow.idiographArray = new Array();
    unsafeWindow.iUser = 0;
    unsafeWindow.numUsers =0;
    unsafeWindow.http_request = false;
//    unsafeWindow.page = 0;
    unsafeWindow.pages = 0;
//    unsafeWindow.pageSize = 0;

    var OldshowTopic = ''+unsafeWindow.showTopic;

    unsafeWindow.showTopic = function(iPage)
    {
        with(unsafeWindow)
    {
        content.innerHTML = "<br><br><center>"+ unescape("%u6B63%u5728%u52A0%u8F7D%u2026%u2026") + "</center><br><br>";
        scroll(0, 0);
        page = iPage;
        try
        {
            spanPage.innerText = page;
        }
        catch(e)
        {
        }
//        xmlDoc.XMLDocument.loadXML(xmlDocTopic.xml);
        i = 0;
//        userIDArray = new Array();
        pbarHTML = "<table border='0' width='280' cellspacing='1' cellpadding='0' style='border-style: inset; border-width: 1'><tr><td width='10%'><table id='pbar' border='0' height='11' width='0%' cellspacing='0' cellpadding='0' bgcolor='#000080'><tr><td></td></tr></table></td></tr></table>";
        try
        {
            rs = xmlDocTopic.getElementsByTagName("Reply");
            if (pageSize == 0) pageSize = 1000;
            rs.pageSize = pageSize;
            pages = Math.ceil(rs.length / pageSize);
            rs.absolutePage = page;
            rs.index = (page - 1)*pageSize;
            rs.GetText=function ( TagName )
            {
                var tag = rs[rs.index].getElementsByTagName(TagName);
                if (tag.length == 0)
                    return "";
                else
                    return tag[0].textContent;
            }
            rs.EOF = false;
            rs.moveNext = function()
            {
                ++rs.index;
                rs.EOF = (rs.index >= rs.length);
            }

            var floor;
            floor = (page - 1) * pageSize;

            HTML = "<table cellspacing=1 cellpadding=4 class=maintable style='table-layout: fixed; word-break: break-all'>";
            HTML += "<tr><td class=listtitle width=15% align=center>"+ unescape("%u53D1%u8868%u4EBA")+"</td>";
            HTML += "<td class=listtitle width=85%><table width=100% cellspacing=0 cellpadding=0><tr><td class=listtitle>   "+ unescape("%u5185%u5BB9")+"</td><td align=right id=tdPages2 style='padding-right: 10'></td></tr></table></tr>";
            Words = rs.GetText("Words");
            Words = Words.replace(/<br><br>/gi, "<br><span style='display: none'><br><a href='http://www.sonicchat.com/' target='_blank'>www.sonicbbs.com</a><br></span><br>");
            if (page == 1)
            {
                userIDArray[i++] = rs.GetText("UserID");
                HTML += "<tr><td align=center class=listbody valign=top style='padding-top: 12px; padding-bottom: 12px'><a href=userdetail.asp?UserName=" + rs.GetText("UserName") + ">" + rs.GetText("UserName") + "</a>";
                HTML += "<span id=userIcon0></span></td>";
                HTML += "<td bgcolor=#FFFFFF style='padding: 12' valign=top>";
                HTML += "<table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td width=50% align=left>"+ unescape("%u4E3B%u9898%uFF1A")+" <b>" + title + "</b></td>";
                HTML += "<td width=50% align=right><div id = 'adXml'><img src='http://mail.sonicbbs.com/sonicchat/images/ajax-loader.gif' width=16 height=16/></div></td></tr></table>";
                HTML += "<hr size=1><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td><font color=#808080> "+ unescape("%u53D1%u8868%u65F6%u95F4%uFF1A") + rs.GetText("Date") + "  <a href=topicedit.asp?TopicID=" + id + "><font color=#808080>"+ unescape("%u7F16%u8F91")+"</font></a>";
                if (!locked) HTML += "  <a href='reply.asp?topicid=" + id + "&QuoteType=1'><font color=#808080>"+ unescape("%u5F15%u7528%u56DE%u590D")+"</font></a>";
                HTML += "  <a href='/message/index.asp?r=" + rs.GetText("UserName") + "&i=01' target=_blank><font color=#808080>"+unescape("%u7559%u8A00")+"</font></a>  <a href='report.asp?topicid=" + id + "'><font color=#808080>"+unescape("%u4E3E%u62A5")+"</font></a>  <a href='/mark/mark.asp?topicid=" + id + "'><font color=#E16464>"+unescape("%u8868%u626C")+"</font></a></td><td align=right><font color=#808080>"+unescape("%u697C%u957F")+"</font></td></tr></table>";
                //------------  Update by Willim 2006-03-23 ---------------------------
                if(rs.GetText("Date") < '2006-01-01 00:00:00'){
                    Words = Words.replace(/http:\/\/images.sonicalbum.com\/upload_.{1,3}\/myphotos/gi, "http://album.xmnext.com/Album/Upload_30/OldAlbum");  //smartalbum 相册的图片
                }
                //------------  Update by Willim 2006-03-23 ---------------------------
                HTML += "<hr size=1><br>" + Words + "<br><span id=idiograph0></span></td></td></tr>";
                rs.moveNext();
                floor = floor + 1;

                //广告加入点
                //send_request("AdRequest.asp?TopicID=" + id + "&CNum=" + clickNum);
            }

            for (; i < pageSize && !rs.EOF; i++)
            {
                Words = rs.GetText("Words");
                Words = Words.replace(/<br><br>/gi, "<br><span style='display: none'><br><a href='http://www.sonicchat.com/' target='_blank'>www.SonicBBS.com</a><br></span><br>");
                userIDArray[i] = rs.GetText("UserID");
                HTML += "<tr><td align=center class=listbody valign=top style='padding-top: 12px; padding-bottom: 12px'><a href=userdetail.asp?UserName=" + rs.GetText("UserName") + ">" + rs.GetText("UserName") + "</a>";
                HTML += "<span id=userIcon" + i + "></span></td>";
                HTML += "<td bgcolor=#FFFFFF style='padding: 12' valign=top><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td><font color=#808080>"+unescape("%u53D1%u8868%u65F6%u95F4%uFF1A")+" " + rs.GetText("Date") + "  <a href=replyedit.asp?TopicID=" + id + "&ReplyID=" + rs.GetText("ReplyID") + "><font color=#808080>"+unescape("%u7F16%u8F91")+"</font></a>";
                if (!locked) HTML += "  <a href='reply.asp?topicid=" + id + "&ReplyID=" + rs.GetText("ReplyID") + "&QuoteType=2'><font color=#808080>"+unescape("%u5F15%u7528%u56DE%u590D")+"</font></a>";
                HTML += "  <a href='/message/index.asp?r=" + rs.GetText("UserName") + "&i=01' target=_blank><font color=#808080>"+unescape("%u7559%u8A00")+"</font></a>  <a href='report.asp?topicid=" + id + "&replyid=" + rs.GetText("ReplyID") + "'><font color=#808080>"+unescape("%u4E3E%u62A5")+"</font></a>  <a href='/mark/mark.asp?topicid=" + id + "&replyid=" + rs.GetText("ReplyID") + "'><font color=#E16464>"+unescape("%u8868%u626C")+"</font></a></td><td align=right>";
                var floorName;            
                floorName = "" + (floor + 1) +unescape("%20%u697C");
                if(floor==1) floorName =unescape("%u6C99%u53D1");
                if(floor==2) floorName =unescape("%u9760%u80CC%u6905");
                if(floor==3) floorName = unescape("%u677F%u51F3");

                HTML += "<font color=#808080>" + floorName + "</font></td></tr></table>";
                //------------  Update by Willim 2006-03-23 ---------------------------
                if(rs.GetText("Date") < '2006-01-01 00:00:00'){
                    Words = Words.replace(/http:\/\/images.sonicalbum.com\/upload_.{1,3}\/myphotos/gi, "http://album.xmnext.com/Album/Upload_30/OldAlbum");  //smartalbum 相册的图片
                }
                //------------  Update by Willim 2006-03-23 ---------------------------
                HTML += "<hr size=1><br>" + Words + "<br><span id=idiograph" + i + "></span></td></tr>";
                floor = floor + 1;
                rs.moveNext();
            }
        }
        catch(e)
        {
            alert( "error: " + e );
//            window.open("/rebuild.asp?topicid=" + id, "_self");
            return;
        }
        HTML += "</table>";

        // Get from the code of original showtopic function, instead of copy it.
        var HTMLReplaceArray = OldshowTopic.match(/.*\sHTML\.replace.*/g);
        for (var index in HTMLReplaceArray)
            eval(HTMLReplaceArray[index]);

        content.innerHTML = HTML;

        getTopicPages();
        if (isShowRank)
        {
            numUsers = i;
            iUser = 0;
            tdpbar.innerHTML = (numUsers >= 5) ? pbarHTML : "";
            showUserDetail();
        }
    }        
    }

    unsafeWindow.xmlDocTopiconreadystatechange = function()
    {
    with(unsafeWindow)
    {
//        if (xmlDocTopic.readyState != 4) return;
//        xmlDoc.XMLDocument.async = "false";
        showTopic(1);
    }
    }

    unsafeWindow.openXML = function()
    {
    with(unsafeWindow)
    {
        folderID = Math.floor(id / 5000) + 1;
        xmlDocTopic.async=false;
        xmlDocTopic.load("bbs_xml/" + folderID + "/" + id + ".xml?t=" + lastDate);
//        xmlDocTopic.onreadystatechange = xmlDocTopiconreadystatechange;
        xmlDocTopiconreadystatechange();
    }
    }


    unsafeWindow.getTopicPages=function ()
    {
    with(unsafeWindow)
    {
        if (pageSize == 1000 || pages == 1)
        {
            tdPages.innerHTML = "<a href=#top>"+unescape("%u9875%u9996")+"</a>";
            return
        }
        url = "javascript:showTopic(";
        returnValue = (page == 1) ? "<font color=#666666>[&lt;&lt;]</font>" : "<a href='" + url + "1)'>[&lt;&lt;]</a>";
        returnValue += (page == 1) ? "  <font color=#666666>[&lt;]</a>" : "  <a href='" + url + (page - 1) + ")'>[&lt;]</a>";
        returnValue += (page >= pages) ? "  <font color=#666666>[&gt;]</a>" : "  <a href='" + url + (page + 1) + ")'>[&gt;]</a>";
        returnValue += (page == pages) ? "  <font color=#666666>[&gt;&gt;]</a>" : "  <a href='" + url + pages + ")'>[&gt;&gt;]</a>";
        tdPages.innerHTML = returnValue;
        returnValue = (page == 1) ? "<font color=#AAAAAA>[&lt;&lt;]</font>" : "<a href='" + url + "1)' class=title>[&lt;&lt;]</a>";
        returnValue += (page == 1) ? "  <font color=#AAAAAA>[&lt;]</a>" : "  <a href='" + url + (page - 1) + ")' class=title>[&lt;]</a>";
        returnValue += (page >= pages) ? "  <font color=#AAAAAA>[&gt;]</a>" : "  <a href='" + url + (page + 1) + ")' class=title>[&gt;]</a>";
        returnValue += (page == pages) ? "  <font color=#AAAAAA>[&gt;&gt;]</a>" : "  <a href='" + url + pages + ")' class=title>[&gt;&gt;]</a>";
        unsafeWindow.tdPages2 = document.getElementById("tdPages2");
        tdPages2.innerHTML = returnValue;
    }
    }


    unsafeWindow.showUserDetail=function()
    {
    with(unsafeWindow)
    {
        i = iUser;
        folderID = Math.floor(userIDArray[i] / 5000) + 1;
        xmlDocUserDetail = document.implementation.createDocument("", "", null);
        xmlDocUserDetail.async=false;
        xmlDocUserDetail.load("member_xml/" + folderID + "/" + userIDArray[i] + ".xml");
//        xmlDocUserDetail.onreadystatechange = xmlDocUserDetailonreadystatechange;
        xmlDocUserDetailonreadystatechange();
    }
    }

    unsafeWindow.xmlDocUserDetailonreadystatechange=function()
    {
    with(unsafeWindow)
    {
//        if (xmlDocUserDetail.readyState != 4) return;
//        xmlDoc.XMLDocument.async = "false";
//        xmlDoc.XMLDocument.loadXML(xmlDocUserDetail.xml);
        i = iUser;
        medal = "";
        try
        {


            rs = xmlDocUserDetail;
            rs.GetText=function ( TagName )
            {
                var tag = rs.getElementsByTagName(TagName);
                if (tag.length == 0)
                    return "";
                else
                    return tag[0].textContent;
            }
//            rs = xmlDoc.recordset;
            rank = parseInt(rs.GetText("Level"));
            rankName = rankNameArray[rank - 1];

            //-- add by Alex Start
            objNodeList = xmlDocUserDetail.getElementsByTagName("Medal");
            if (objNodeList.length != 0)
            {
                arrMedal = rs.GetText("Medal").split(",");
                for (v = 0; v < arrMedal.length ; v++) 
                {
                    medal =  medal + " <img title='" + medalNameArray[arrMedal[v].substr(1) - 1] + "' src='http://mail.sonicbbs.com/sonicchat/images/medal/" + arrMedal[v] + ".gif'> ";
                }
            }
            //-- add by Alex End

            userIconArray[i] = "<br><br><img src='http://mail.sonicbbs.com/sonicchat/images/rank/rank" + rank + ".gif'><br>" + rankName + "[" + rank + "]<br>" + medal;
            intro = rs.GetText("Intro");
            idiographArray[i] = (intro == "") ? "" : "<br><hr size=1><font color=#808080 style='font-size: 12px;'>" + intro + "</font>";
            if (iUser++ < userIDArray.length - 1)
                showUserDetail();
            else
                showUserDetail2();
            if (numUsers >= 5) pbar.width = Math.ceil((i / numUsers) * 100) + "%";
        }
        catch(e)
        {
        }
    }
    }

    unsafeWindow.showUserDetail2=function()
    {
    with(unsafeWindow)
    {
        for (i = 0; i < userIDArray.length; i++)
        {
//            document.all["userIcon" + i].innerHTML = userIconArray[i];
//            document.all["idiograph" + i].innerHTML = idiographArray[i];
            document.getElementById("userIcon" + i).innerHTML = userIconArray[i];
            document.getElementById("idiograph" + i).innerHTML = idiographArray[i];
        }
        if (numUsers >= 5) tdpbar.innerHTML = "";
    }
    }


    unsafeWindow.openXML();

}

function ProcessReplyPage()
{
    unsafeWindow.addText = function(prefixCode, postfixCode) 
    {
        var FormWords;
        var evaRlt = document.evaluate(
                "//textarea[@name='Words']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        if (evaRlt.snapshotLength != 0)
            FormWords = evaRlt.snapshotItem(0);
        else
            return;
        var strLeft = FormWords.value.substr(0,FormWords.selectionStart);
        var strRight = FormWords.value.substr(FormWords.selectionEnd);
        var strMid = FormWords.value.substr(FormWords.selectionStart, FormWords.selectionEnd - FormWords.selectionStart);
        strMid = prefixCode + strMid + postfixCode;
        FormWords.value = strLeft + strMid +strRight;
        /*
        words = sendForm.Words;
        words.focus();
        selectedtext = document.selection.createRange().text;
        code = prefixCode + selectedtext + postfixCode;
        caretPos = document.selection.createRange().duplicate();
        chr = caretPos.text.charAt(caretPos.text.length - 1);
        if (chr == " ") {
            caretPos.text = code + " ";
        }
        else {
            caretPos.text = code;
        }
        checkWords();
        */
    }
    ProcessTopicDisplayPage()
}

function ProcessTableColorIncorrect()
{
    document.styleSheets[0].deleteRule(8);
    document.styleSheets[0].insertRule(".maintable { background-color: #FFFFFF; border: 6 solid #D6D6D6; width: 100% }",8 );
}


if (location.pathname == '/' || location.pathname.substr(0,6) == '/index')
    ProcessIndexPage();
else if (location.pathname.substr(0,13) == '/topicdisplay')
    ProcessTopicDisplayPage();
else if (location.pathname.substr(0,6) == '/reply'
    || location.pathname.substr(0,10) == '/topicedit'
    || location.pathname.substr(0,5) == '/new.'
    )
    ProcessReplyPage();
else if (location.pathname.substr(0,7) == '/search'
    || location.pathname.substr(0,17) == '/sonicchat/search'
    || location.pathname.substr(0,11) == '/userdetail'
        )
    ProcessTableColorIncorrect();

