// ==UserScript==
// @name           Campus-Cruiser-interface
// @namespace      http://www.siricon.co.uk
// @description    Try and get CampusCruiser to be useable enough to use it everyday.
// @include        */my.campuscruiser.com/*
// @include        */q.htm
// @include        */stub.html
// Version 0.06
// ==/UserScript==

 

function CCIGM_servletName() {
    var hrefParts=fRef.split("?")[0].split("/");
    return unescape(hrefParts[3]);
}
 
function CCIGM_removeItembyObj(Item){
    Item.parentNode.removeChild(Item);
}

function processPageHeader(){
    var realHeader = document.getElementById("ccGMenu");
    var elmBtnMenu1 = document.getElementById("ccQTool");
    var elmBtnMenu2 = document.getElementById("ccQBarIcons");
    var elmBtnMenu3 = document.getElementById("ccQMsgArea");
    var elmWelcome = document.getElementById('ccWelcome');
    var elmWelcomeMsg="Hello";
    if ( elmWelcome ) {
        elmWelcomeMsg = elmWelcome.innerHTML;
    }
    var elmHelp = document.getElementById("ccHelp");
    var elmLogout = document.getElementById("ccLogOut");
    navHeader = document.getElementById("ccNavHeader");
    if ( navHeader ) {
        navHeader.setAttribute("style","background: #ffffff;");
    }
    divItem = document.createElement("DIV");
    divItem.setAttribute("ID","CCIGM_HEADER");
    divItem.setAttribute("style","width: auto; height: 68px; overflow:none;");
    //divItem.setAttribute("style","width: auto; height: 68px; overflow:none; background: " + bgImage + ";");

    imgDiv = document.createElement("DIV");
    imgDiv.setAttribute("style","float:left; color: white; width: 268px; height: 65px; text-align: right;");
    elmImg = document.createElement("IMG");
    elmImg.setAttribute("SRC", "/ohecampus/style/22/1002/uol_new.gif");
    imgDiv.appendChild(elmImg);
    divItem.appendChild(imgDiv);
   
    navDiv = document.createElement("DIV");
    navDiv.innerHTML += "<font family=Tahoma size=0.7em>" + elmWelcomeMsg + "</font>&nbsp; | &nbsp;";
    navDiv.setAttribute("style","float:right; color:" + pColor + "; width: 350px; text-align: right; padding-top: 8px;");
    if ( elmHelp ) {
        navLink = document.createElement("A");
        navLink.href=elmHelp.href;
        navLink.innerHTML="Help";
        navLink.setAttribute("style","color: " + pColor + "; font-family: Tahoma; font-size: 0.8em; text-decoration: none;");
        navDiv.appendChild(navLink);
        navDiv.innerHTML = navDiv.innerHTML + "&nbsp; | &nbsp;";
    }
 
    if ( elmLogout ) {
        navLink2 = document.createElement("A");
        navLink2.href=elmLogout.href;
        navLink2.innerHTML="Log Out";
        navLink2.setAttribute("style","color: "+ pColor + "; font-family: Tahoma; font-size: 0.8em; text-decoration: none;");
        navDiv.appendChild(navLink2);
        navDiv.innerHTML = navDiv.innerHTML + "&nbsp; | &nbsp;";
    }
    navLink3 = document.createElement("A");
    navLink3.setAttribute("onclick", "ccCustomize();");
    navLink3.innerHTML="Customize";
    navLink3.setAttribute("style","color: "+ pColor + "; font-family: Tahoma; font-size: 0.8em; text-decoration: none;");
    navDiv.appendChild(navLink3);
    navDiv.innerHTML = navDiv.innerHTML + "&nbsp; &nbsp;";
    loginInfo = document.getElementById("ccTgNavInfo");

    if ( loginInfo ) {
        loginText = loginInfo.innerHTML;
        loginText = loginText.replace(/\<NOBR\>/ig,"");
        loginText = loginText.replace(/\<\/NOBR\>/ig,"");
        loginText = loginText.replace(/\&nbsp;/ig,"&nbsp;&nbsp;<br>");
        loginText = loginText + "&nbsp;&nbsp;";
        breadCrumb = document.getElementById("ccBread");
        if ( breadCrumb ) {
            CCIGM_removeItembyObj(breadCrumb);
            navDiv.innerHTML = navDiv.innerHTML + "<br>" + "<font family=Tahoma size=0.8em>" + loginText + "</font>";
        }
    }
   
    elmChart = document.getElementById("chart");
    if ( elmChart ) {
        navDiv.innerHTML = navDiv.innerHTML + "<div style='margin-top: 2px;'><br><font size=0.8em>" + elmChart.innerHTML; + "</font></div>&nbsp;&nbsp;";
        CCIGM_removeItembyObj(elmChart);
    }
    divItem.appendChild(navDiv);
    if ( realHeader ) {
        realHeader.parentNode.insertBefore(divItem,realHeader);
        CCIGM_removeItembyObj(realHeader);
    }
    if ( elmBtnMenu1 ) {
        elmBtnMenu1.style.visibility="hidden";
        elmBtnMenu2.style.visibility="hidden";
        elmBtnMenu3.style.visibility="hidden";
    }
}

 

function processPageMenu() {
    var divsClose=new Array("ccTabs", "ccSTabs", "ccSpecAnnTicker");
    ccNavContent = document.getElementById("ccTabs");
    divItem = document.createElement("DIV");
    divItem.setAttribute("ID","CCIGM_MENU");
    divItem.setAttribute("class", "jqueryslidemenu");
    divItem.setAttribute("style","width: 100%; height: 32px; overflow:none; background: " + bgImage + "; color: #666600; margin-bottom: 15px");
    menuUL = document.createElement("UL");
    navTabs = unsafeWindow.navTabs;
    subTabs = unsafeWindow.navSTabs;
    for(var j in navTabs) {
        obj = navTabs[j];
        lb = unsafeWindow.getNavLabelArr(obj)
        var menuItem = document.createElement("LI");
        var menuLink = document.createElement("A");
        menuLink.setAttribute("href", obj.lk);
        menuLink.innerHTML = lb;
        menuItem.appendChild(menuLink);
        if ( obj.on == 'true' ) {
            var subDiv = document.createElement("DIV");
            subDiv.setAttribute("style","float: right; margin-right:0 ; margin-left: auto; position: absolute; top: 10; visibility: show");
            var showMore = document.createElement("IMG");
            showMore.setAttribute("ID", "CCIMG_SHOWMORE");
            showMore.setAttribute("SRC", "/ico/right_white.gif");
            subDiv.appendChild(showMore);
            menuItem.appendChild(subDiv);
            var subMenu = document.createElement("UL");
            for (var i in subTabs) {
                subObj = subTabs[i];
                sublb = unsafeWindow.getNavLabelArr(subObj);
                var submenuItem = document.createElement("LI");
                var submenuLink = document.createElement("A");
                submenuLink.setAttribute("href", subObj.lk);
                submenuLink.innerHTML = sublb;
                submenuItem.appendChild(submenuLink);
                subMenu.appendChild(submenuItem);
            }
            menuItem.appendChild(subMenu);
        }
        menuUL.appendChild(menuItem);
    }
    divItem.appendChild(menuUL);
    divRight = document.createElement("DIV");
    divRight.setAttribute("style","margin-left: auto; margin-right:0; height: 30px; width: 290px; margin-top: auto; margin-bottom: auto;");
    var pApps = ['my','anns','email','calendar','tasks','address','files','bookmark','preferences'];
    var ccQApps = unsafeWindow.ccQApps;
    var qIcons = new Array();
    qIcons["my"] = "l_my.gif";
    qIcons["anns"] = "l_ann.gif";
    qIcons["email"] = "l_email.gif";
    qIcons["compose"] = "l_compose.gif";
    qIcons["calendar"] = "l_cal.gif";
    qIcons["tasks"] = "l_todo.gif";
    qIcons["address"] = "l_address.gif";
    qIcons["files"] = "l_file.gif";
    qIcons["webpages"] = "l_web.gif";
    qIcons["bookmark"] = "l_book.gif";
    qIcons["albums"] = "l_photo.gif";
    qIcons["blogs"]= "l_blog.gif";
    qIcons["preferences"]="l_profile.gif"
    for (i=0; i<pApps.length; i++) {
        var divElement = document.createElement("DIV");
        divElement.setAttribute("class","sqButton");
        var divImg = document.createElement("IMG");
        app = pApps[i];
        divImg.setAttribute("src", "/ico/" + qIcons[app]);
        divImg.setAttribute("style","border:0;margin:0;padding:0;");
        divImg.setAttribute("alt",app);
        ccLink = document.createElement("A");
        url = ccQApps[app];
        if ( url == null ) {
            url = "q?pg=papp&a=" + app + "&cx=u";
        } else {
            url = url[0];
        }
        ccLink.setAttribute("href", url);
        ccLink.appendChild(divImg);
        divElement.appendChild(ccLink);
        divRight.appendChild(divElement);
    }
    divItem.appendChild(divRight);
    ccNavContent.parentNode.insertBefore(divItem, ccNavContent);

    for (i=0; i<3; i++ ) {
        divItem = document.getElementById(divsClose[i]);
        if ( divItem ) {
            divItem.style.visibility="hidden";
            CCIGM_removeItembyObj(divItem);
        }
    }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addStyles() {
    addGlobalStyle('.sqButton {border: 1px solid white; margin-top:2px; margin-left:2px; background: ' + pColor + '; float:left; width: 28px; height:26px; text-align:center;}');
    addGlobalStyle('.sqButton img:hover {background: white;}');
    addGlobalStyle('.ccMenuHeader {background: ' + bgImage + '; height: 20px; padding-top: 2px; padding-left: 8px;}');
    addGlobalStyle('.ccChOption button {border: 1px solid black; margin: 1px;}');
    addGlobalStyle('.ccItem td {padding-left: 2px; padding-right: 10px; font-family:tahoma; font-size:0.9em;}');
    addGlobalStyle('.ccGap {font-family: verdana, tahoma; font-size:0.8em; background: #F1F1F1; Color: black;}');
    addGlobalStyle('.ccGap A {text-decoration: none;}');
   
    addGlobalStyle('.jqueryslidemenu{font: bold 12px Verdana;background: ' + bgImage + ';width: 100%;}');
    addGlobalStyle('.jqueryslidemenu ul{margin: 0;padding: 0;list-style-type: none;}');
    addGlobalStyle('.jqueryslidemenu ul li{position: relative;display: inline;float: left;}');
    addGlobalStyle('.jqueryslidemenu ul li a{display: block;background: ' + bgImage + '; color:white; padding: 8px 10px;border-right: 1px solid #000044;color: #2d2b2b; text-decoration: none;}');
    addGlobalStyle('.jqueryslidemenu ul li a:link, .jqueryslidemenu ul li a:visited{color: white;}');
    addGlobalStyle('.jqueryslidemenu ul li a:hover{background: black; color: white;}');
    addGlobalStyle('.jqueryslidemenu ul li ul{position: absolute; top: 32; display: block; left: 0; visibility: hidden;}');
    addGlobalStyle('.jqueryslidemenu ul li:hover ul{ visibility: visible; }');
    addGlobalStyle('.jqueryslidemenu ul a:hover ul{ visibility: visible; }');

    addGlobalStyle('.jqueryslidemenu ul li ul li{display: block; float: none;}');
    addGlobalStyle('.jqueryslidemenu ul li ul li ul{top: 0;}');
    addGlobalStyle('.jqueryslidemenu ul li ul li a{font: normal 13px Verdana;width: 160px; padding: 5px;margin: 0;border-top-width: 0;border-bottom: 1px solid gray;}');
    addGlobalStyle('.jqueryslidemenu ul li ul li a:hover{ background: black;color: white;}');
    addGlobalStyle('.downarrowclass{position: absolute;top: 12px;right: 7px;}');
    addGlobalStyle('.rightarrowclass{position: absolute;top: 6px;right: 5px;}');
   
    addGlobalStyle('.ccFSS { font-size: 0.7em; font-family: verdana, tahoma;}');
}

function processContent() {
    elmBody = document.getElementById("ccBody");
    elmBody.setAttribute("style", "width: 1024px; margin:0 auto;");
    bHeight=0;
    for (var i=0; i<15; i++ ) {
        divDragableBox = document.getElementById("dragableBox" + i);
        if ( divDragableBox ) {
            divDragableBox.setAttribute("style","border: 1px solid #bfbfbf; padding: 1px; margin: 5px;");
            if (( i == 1 ) || ( i == 2)) {
                divDragableBox.setAttribute("style","width: 496px; float: left; border: 1px solid #bfbfbf; padding: 1px; margin: 5px;");
            }
        }
        divDragableBoxHeader = document.getElementById("dragableBoxHeader" + i);
        if ( divDragableBoxHeader ) {
            divDragableBoxHeader.setAttribute("style","margin-bottom: 6px; background: " + bgImage + ";");
        }
        divDragableBoxContent = document.getElementById("dragableBoxContent" + i);
        if ( divDragableBoxContent ) {
            divDragableBoxContent.setAttribute("style","border: 0px; font-family: verdana; font-size: 0.8 em;");
        }
    }
}

function processEmail() {
    var mailId;
    elmtrs = document.getElementsByTagName("tr");
    bground = "background: #CCCCCC;";
    style = "font-family: verdana; font-size:0.8em; padding: 0px; background: #ffffff; padding-right: 16px; align: left;";
    addGlobalStyle(".ccTable thead tr th {" + style + bground + "}");
    mailnum=0;
    for (i=0; i < elmtrs.length; i++ ) {
        mailItem = elmtrs[i];
        mailId = mailItem.getAttribute("id");
        if (( mailId != null ) && ( mailId.substr(0,3) == "row")) {
            mailItem.setAttribute("highlight", "None");
            mailItem.setAttribute("oldstyle", style);
            mailLink = mailItem.getElementsByTagName("A");
           
            mailtds = mailItem.getElementsByTagName("td");
            if ( mailtds ) {
                for ( j=0; j < mailtds.length; j++ ) {
                    mailTD = mailtds[j];
                    mailTD.setAttribute("style", style);
                    if ( j != 0 ) {
                        mailTD.addEventListener("mouseover",CCIGM_itemHighlight,true);
                        mailTD.addEventListener("mouseout",CCIGM_itemHighlight,true);
                    }
                }
            }
        }
    }
   
}

function CCIGM_itemHighlight(e) {
    color1="#616161";
    var el=e.target;
    if ( ! el ) return;
    while ( el.nodeName != "TR" ) {
        el = el.parentNode;
    }
    tds = el.getElementsByTagName("td");
    if ( el.getAttribute("highlight") == "Some" ) {
        style = el.getAttribute("oldstyle");
        el.setAttribute("highlight", "None");
    } else {
        style = el.getAttribute("oldstyle") + "background: #f1f1f1;";
        el.setAttribute("highlight", "Some");
    }
    if ( tds ) {
        for ( j=0; j < tds.length; j++ ) {
            TD = tds[j];
            TD.setAttribute("style", style);               
        }
    }
    e.preventBubble();
}

/**
    Main Program
*/

fRef=window.location.href;
sName = CCIGM_servletName();
pColor = "#000066";
bgImage="url('http://www.siricon.co.uk/Invention/images/bg_dove.gif')";
if (( sName == "q" ) || ( sName == "PageServlet" ) || ( sName == "emPageServlet") || ( sName == "em2PageServlet") ) {
    addStyles();
    processPageHeader();
    processPageMenu();
    processContent();
} 
if ( sName == "emPageServlet" ) {
    processEmail();
}