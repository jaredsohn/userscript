// ==UserScript==
// @name           UF E-Learning Direct Links
// @namespace      ufl.edu
// @description    Replaces the javascript links in the University of Florida's eLearning website with direct links to the e-Learning pages so you can now open them in new tabs and use right click menus properly.
// @include        https://elearning.courses.ufl.edu/webct/*
// ==/UserScript==

var courseBits = RegExp("/urw/(lc\\d+)\.(tp\\d+)/")(location.href);
var anchors = document.getElementsByTagName("a");
var pattern1 = new RegExp(/submitLoad\('(\d+)','TOC_TYPE'/);
var pattern2 = new RegExp(/submitLoad\('(\d+)','ORGANIZER_PAGE_TYPE'/);
var pattern3 = new RegExp(/submitLoad\('(\d+)','DISCUSSION_TOPIC_TYPE'/);
var pattern4 = new RegExp(/submitLoad\('(\d+)','PAGE_TYPE'/);
var pattern5 = new RegExp(/openViewMessage\('(\d+)'/);
// var pattern6 = new RegExp(/submitFolder\('(\d+)','(\d+)'/);
var pattern7 = new RegExp(/doWindowOpen\('(\d+)','new_frame','/);
// var pattern8 = new RegExp(/go\((\d+),(\d+)/);
var pattern9 = new RegExp(/submitLoad\('(\d+)','ASSESSMENT_TYPE'/);
var pattern10 = new RegExp(/javascript:doWindowOpen\("([^"]+)",[^\)]+\)/);
var pattern11 = new RegExp(/javascript:doWindowOpen\('([^']+)',[^\)]+\)/);
var pattern12 = new RegExp(/submitLoad\('(\d+)','PROJECT_TYPE'/);

var pat = new RegExp(/\d+/);

for(x in anchors){
if (pattern1.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/studentViewtoc.dowebct?resetBreadcrumb=false&displayBCInsideFrame=true&TOCId="+tocid;
}
else if (pattern2.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/studentCourseView.dowebct?resetBreadcrumb=false&displayBCInsideFrame=true&displayinfo="+tocid+",ORGANIZER_PAGE_TYPE";
}
else if (pattern3.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/topicViewCSO.dowebct?resetBreadcrumb=false&displayBCInsideFrame=true&topicid="+tocid;
}
else if (pattern4.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/displayContentPage.dowebct?resetBreadcrumb=false&displayBCInsideFrame=true&pageID="+tocid;
}
else if (pattern5.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/mail_ActivateViewMessage.dowebct?unreadFlag=false&deletedFolder=false&receiptId="+tocid;
}
// else if (pattern6.test(anchors[x].href)){
// var tocid = pattern6.exec(anchors[x].href);
// anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/mail_SelectFolder.dowebct?folderId=" + tocid[1] + "&mailboxId=" + tocid[2];
// }
else if (pattern7.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = tocid;
}
// else if (pattern8.test(anchors[x].href)){
// var tocid = pattern8.exec(anchors[x].href);
// anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/previewtoc.dowebct?updateBreadcrumb=false&resetBreadcrumb=false&TOCId=" + tocid[2] + "&TOCLinkId=" + tocid[1] + "#" + tocid[1];
// }
else if (pattern9.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/displayAssessmentIntro.dowebct?resetBreadcrumb=false&displayBCInsideFrame=true&assessment="+tocid;
}
if (pattern10.test(anchors[x].href)){
	anchors[x].href = pattern10.exec(anchors[x].href)[1]
}
if (pattern11.test(anchors[x].href)){
	anchors[x].href = pattern11.exec(anchors[x].href)[1]
}
else if (pattern12.test(anchors[x].href)){
var tocid = pat.exec(anchors[x].href);
anchors[x].href = "https://elearning.courses.ufl.edu/webct/urw/" + courseBits[1] + "." + courseBits[2] + "/viewAssignedProject.dowebct?returnURL=/courseFS.dowebct?tab=view&teachView=false&resetBreadcrumb=false&displayBCInsideFrame=true&projectId="+tocid;

}
}