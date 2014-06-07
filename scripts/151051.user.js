// ==UserScript==
// @name       MakeIntranetPretty
// @namespace  http://intranet/index.html
// @version    0.8
// @description  Changes the CSS to look better
// @match      http://intranet/*
// @exclude    http://intranet/Apps/*
// @exclude    http://intranet/apps/*
// @exclude    http://intranet/News/*
// @require    http://code.jquery.com/jquery-1.8.2.js
// @require    http://intranetdev/apps/sdp/Intranet/bootstrap/js/bootstrap.js
// @require    http://code.jquery.com/ui/1.9.1/jquery-ui.js
// @copyright  2012+, Nathan Isaak, Patrick Cosyns 
// ==/UserScript==
/* Reference to the main container div for the page */
var intranetContainer = document.getElementById('Container');
var intranetContent = document.getElementById('Content');
//intranetContainer.style.backgroundColor = '#cabea9';
//Add Twitter Bootstrap CSS and JS
var bootstrapLink = document.createElement('LINK');
bootstrapLink.rel = 'stylesheet';
bootstrapLink.href = 'http://intranetdev/apps/sdp/Intranet/bootstrap/css/bootstrap.min.css';
bootstrapLink.type = 'text/css';
document.head.appendChild(bootstrapLink);
var jqueryUI = document.createElement('LINK');
jqueryUI.rel = 'stylesheet';
jqueryUI.href = 'http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css';
jqueryUI.type = 'text/css';
document.head.appendChild(jqueryUI);
var BBJS = document.createElement('script');
BBJS.src = 'http://intranetdev/apps/sdp/Intranet/betterShowHide.js';
BBJS.type = 'text/javascript';
document.head.appendChild(BBJS);
/* Override Bad CSS Style Choices */
var links = document.getElementsByTagName("link");
var index = 0;
while(index < links.length){
    if(links[index].href == "http://intranet/menu/common/intranetMenu.css"){
        links[index].href = "http://intranetdev/apps/sdp/Intranet/MakeIntranetPretty.css";
    }
    index++;
}
/* New Navigation Header */
var newHeader = document.createElement('DIV');
newHeader.className = "navbar";
var newInner = document.createElement('DIV');
newInner.className = "navbar-inner";
newInner.style.zindex = 999;
var newInnerContainer = document.createElement('DIV');
newInnerContainer.className = "container";
newInner.appendChild(newInnerContainer);
newHeader.appendChild(newInner);
intranetContainer.appendChild(newHeader);
var topList = document.createElement('ul');
topList.className = 'nav';
newInnerContainer.appendChild(topList);
var active = document.createElement('li');
active.className = '';
//Home Button
var home = document.createElement('a');
home.setAttribute('href','http://intranet');
home.innerHTML ='Intranet Home';
active.appendChild(home);
topList.appendChild(active);
//Site Map (maybe google will webcrawl this page!)
var link1List = document.createElement('li');
var link1 = document.createElement('a');
link1.setAttribute('href','http://intranet/sitemap/sitemap.html');
link1.innerHTML ='Site Map';
link1List.appendChild(link1);
topList.appendChild(link1List);
//Contact Us (completely useless)
var link2List = document.createElement('li');
var link2 = document.createElement('a');
link2.setAttribute('href','netfeedback@mpi.mb.ca');
link2.innerHTML ='Contact Us';
link2List.appendChild(link2);
topList.appendChild(link2List);
//Internet Links(completely useless)
var link3List = document.createElement('li');
var link3 = document.createElement('a');
link3.setAttribute('href','http://intranet/InternetLinks/Links.html');
link3.innerHTML ='Internet Links';
link3List.appendChild(link3);
topList.appendChild(link3List);
//Roads Link
var link4List = document.createElement('li');
var link4 = document.createElement('a');
link4.setAttribute('href','http://intranet/apps/ROADS/phonelistsearchpage.asp');
link4.innerHTML ='Roads';
link4List.appendChild(link4);
topList.appendChild(link4List);
//Search Form
var searchForm = document.createElement('form');
searchForm.setAttribute('action','../Search/results.aspx');
searchForm.setAttribute('method','post');
searchForm.className = "navbar-search pull-left";
newInnerContainer.appendChild(searchForm);
var search = document.createElement('input');
search.className = "search-query span2";
search.setAttribute('placeholder','Search');
search.setAttribute('name','SearchText');
searchForm.appendChild(search);
var sideDropDown = document.createElement('ul');
sideDropDown.className = "nav pull-right";
sideDropDown.innerHTML = '<li class="dropdown"> \
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">ACE Links<b class="caret"></b></a> \
    <ul class="dropdown-menu"> \
        <li><a href="#">Action</a></li> \
        <li><a href="#">Another action</a></li> \
        <li><a href="#">Something else here</a></li> \
        <li class="divider"></li> \
        <li><a href="#">Separated link</a></li> \
    </ul> \
  </li>'
newInnerContainer.appendChild(sideDropDown);
//Move the center table up and fill the screen
intranetContent.className = "span12";
intranetContent.style.left = 175;
intranetContent.style.width = "45%";
intranetContent.style.top = 50;
//Move the side "images" section (its called logo!)
var Logo = document.getElementById('Logo');
Logo.style.position = 'absolute';
Logo.style.top = 200;
Logo.style.left = 5;
/* Remove Garbage from the Page */
var LeftPictureBanner = document.getElementById('LeftPictureBanner');
if(LeftPictureBanner != null){
    LeftPictureBanner.parentNode.removeChild(LeftPictureBanner);
}
var TopNav = document.getElementById('TopNav');
if(TopNav != null){
    TopNav.parentNode.removeChild(TopNav);
}
var TopBar = document.getElementById('TopBar');
if(TopBar != null){
    TopBar.parentNode.removeChild(TopBar);
}
var BackgroundBanner = document.getElementById('BackgroundBanner');
if(BackgroundBanner != null){
    BackgroundBanner.parentNode.removeChild(BackgroundBanner);
}
var HomeBanner = document.getElementById('HomeBanner');
if(HomeBanner != null){
    HomeBanner.parentNode.removeChild(HomeBanner);
}
var Image_1 = document.getElementById('Image_1');
if(Image_1 != null){
    Image_1.parentNode.removeChild(Image_1);
}
// Remove the Roads link
var roadsLink = document.getElementById("Roads");
if(roadsLink){
    roadsLink.parentNode.removeChild(roadsLink);
}
// Add Roads to the Main Intranet Page
if ('http://intranet/' == document.URL || 'http://intranet/#' == document.URL || 'http://intranet/index.aspx' == document.URL )
{
    
    var roadsPage = document.createElement('div');
    roadsPage.setAttribute("id", "roadsPage");
    intranetContent.appendChild(roadsPage);
    roadsPage.style.right = -270;
    roadsPage.style.top = 0;
    roadsPage.style.position = 'absolute';
    roadsPage.style.width = 438;
    $("#roadsPage").load('http://intranet/apps/Roads2006/EmployeePublicDetails.aspx', function(response, status, xhr) {
        /* Post Processing on Roads once it is loaded */
        
        $('#aspnetForm').attr('action', 'http://intranet/apps/roads2006/EmployeePublicDetails.aspx');
        $('#aspnetForm').submit(function() {
            this.target = 'formpopup';
        });
        
        $('[background="images/watermark.gif"]').addClass('hero-unit');
        $('[background="images/watermark.gif"]').removeAttr('background');
        
        $('#ctl00_MainArea_SearchTable').parent().remove('br');
        $('#ctl00_MainArea_SearchTable').parent().children().remove('br');
        var ctl00_MainArea_CriteriaTextBox = document.getElementById('ctl00_MainArea_CriteriaTextBox');
        ctl00_MainArea_CriteriaTextBox.style.width = 180;
        ctl00_MainArea_CriteriaTextBox.style.height = 35;
        
        var ctl00_MainArea_FindButton = document.getElementById('ctl00_MainArea_FindButton');
        ctl00_MainArea_FindButton.className = "FindButton btn btn-primary";
        ctl00_MainArea_FindButton.style.width = 55;
        
        var ctl00_MainArea_SearchTable = document.getElementById('ctl00_MainArea_SearchTable');
        ctl00_MainArea_SearchTable.style.width = 325;
        var ctl00_MainArea_PoweredBy = document.getElementById('ctl00_MainArea_PoweredBy');
        ctl00_MainArea_PoweredBy.parentNode.removeChild(ctl00_MainArea_PoweredBy);
        var ctl00_MainArea_SearchTipsRoads = document.getElementById('ctl00_MainArea_SearchTipsRoads');
        ctl00_MainArea_SearchTipsRoads.parentNode.removeChild(ctl00_MainArea_SearchTipsRoads);
    });
    
    // Add Bulletin Board to the Main Intranet Page
    //var tempBulletinPage = document.createElement('div');
    //tempBulletinPage.setAttribute("id", "tempBulletinPage");
    //intranetContent.appendChild(tempBulletinPage);
    var BulletinPage = document.createElement('div');
    BulletinPage.setAttribute("id", "BulletinPage");
    intranetContent.appendChild(BulletinPage);
    BulletinPage.style.right = -280;
    BulletinPage.style.top = 125;
    BulletinPage.style.position = 'absolute';
    BulletinPage.style.width = "60%";
    BulletinPage.style.height = 720;
    BulletinPage.style.overflow = "auto";
    
    $.ajax({
         url: "http://intranet/News/BBPersonal.aspx",
         dataType: 'text',
         success: function(data) {
                    
             //$('#Table2',data).addClass('table table-striped');
             $('#BulletinPage').append($('#Table2',data));
             $('#Table2').addClass('table table-bordered table-striped')
              }
         });
        
}
    var popupDialog = document.createElement('div');
    popupDialog.setAttribute("id", "popupDialog");
    
    intranetContent.appendChild(popupDialog);
/* Remove Whats New On The Intranet Picture */
intranetContent.removeChild(document.getElementById('Content').childNodes[1]);
/* Change Center Table into Fancy Table */
var contentTable = document.getElementById('Content').childNodes[2];
contentTable.className = "table table-bordered";
//Move the left nav up (its positioned absolute)
var leftNav = document.getElementById('LeftNav');
leftNav.style.top = 50;
/* Remove "Wingdings" columns */
if(contentTable.rows){
    for (var i = contentTable.rows.length - 1; i >= 0; i--) {
        contentTable.rows[i].deleteCell(0);
    }
    for (var i = contentTable.rows.length - 1; i >= 0; i--) {
        if (contentTable.rows[i].cells.length > 1)
        {
            contentTable.rows[i].deleteCell(1);
        }
    }
}
/* Fancy Popups */
$('#Content').children('table').find('a').each(function(index) {$(this).attr('href', "javascript:openDialog('" + $(this).attr('href') + "', '" + $(this).html().replace("'","\\'") + "')")});
/* Last Step - Add JQuery and Bootstrap again, this time for use by the page */
var jQuery2 = document.createElement('script');
jQuery2.src = 'http://code.jquery.com/jquery-1.8.2.js';
jQuery2.type = 'text/javascript';
document.head.appendChild(jQuery2);
var bootstrap2 = document.createElement('script');
bootstrap2.src = 'http://intranetdev/apps/sdp/Intranet/bootstrap/js/bootstrap.js';
bootstrap2.type = 'text/javascript';
document.head.appendChild(bootstrap2);
var jqueryUI2 = document.createElement('script');
jqueryUI2.src = 'http://code.jquery.com/ui/1.9.1/jquery-ui.js';
jqueryUI2.type = 'text/javascript';
document.head.appendChild(jqueryUI2)
var fancyDialogs = document.createElement('script');
fancyDialogs.src = 'http://intranetdev/apps/sdp/Intranet/fancyDialogs.js';
fancyDialogs.type = 'text/javascript';
document.head.appendChild(fancyDialogs)