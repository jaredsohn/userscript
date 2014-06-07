// ==UserScript==
// @name           My developerWorks drop-down menus
// @namespace      mrscripter.com/2009/10/improving-navigation-for-ibms-my-developerworks-with-greasemonkey/webdev
// @description    This scripts adds dynamic, customized drop-down menus to IBM's myDeveloperWorks pages, which are based on Lotus Connections. These menus make it much easier to jump between sections and pages.
// @include        *ibm.com/developerworks/mydeveloperworks/*
// @exclude        *auth/login*
// @exclude        *ibm.com/blogs/roller-ui/login*
// @exclude        *ibm.com/files/login*
// @exclude        *ibm.com/wikis/login*
// @exclude        *auth/error*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var menuShowRate = 200; //The rate at which to show/hide the 2nd level menus in milliseconds.
var menuHideRate = menuShowRate;
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;  //Trying to enable for chrome bookmarklets (not working yet)

//Make sure we aren't in an inline frame or some other framed location
if(self == top){

//Start processing when jQuery thinks the document is ready. Not foolproof but works most of the time.
$(document).ready(function(){
  	/*
    * The Wikis and Files sections load their content dynamically. Need to detect when the page is truly ready
    * by listening for the inclusion of the <div id="lotusFrame"/> object.    
  	*/
  	
    if ($("#lotusApplicationLoading").length > 0) {
      $( "body" ).bind("DOMNodeInserted",
        function( objEvent ){
          //console.log("ID: " + $(objEvent.target).attr("id") + " Text: " + $(objEvent.target).text())
          if( $(objEvent.target).attr("id") == "lotusFrame"){reallyTruelyForRealsLoaded();}
        }
		  );
	}else {  
	  
    //If the application loading div doesn't exist, can safely start processing.
    //TO DO: Might need to investigate if more checks need to be done first.
		reallyTruelyForRealsLoaded();
		
	}


});

function reallyTruelyForRealsLoaded(){
  var mycommunities = '';
  var myblogs ='';
  var mywikis = '';
  var mybookmarks ='';
  var myactivities='';
  
  //Find the parent of the navigation, add a class and an ID for use in our CSS settings.
  //$("#lotusBannerHomepage").parent().attr("id","jMenu").addClass("jqueryslidemenu");
  $("#lotusBannerHomepage").parent().addClass("jqueryslidemenu");
  $("#lotusBannerHomepage")
      .append('<ul id="lotusBannerHomepageMenu" class="submenu"><li id="lotusBannerHomepageMenu_mypage"><a href="/developerworks/mydeveloperworks/homepage/web/jsp/advancedSearch.jsp">Search<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")});
  
  $("#lotusBannerProfile")
      .append('<ul id="lotusBannerProfileMenu" class="submenu"><li id="lotusBannerProfileMenu_myprofile"><a href="/developerworks/mydeveloperworks/profiles/html/myProfileView.do">My profile<\/a><\/li><li id="lotusBannerProfileMenu_editprofile"><a href="/developerworks/mydeveloperworks/profiles/html/editMyProfileView.do">Edit my profile<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})
  $("#lotusBannerCommunities")
      .append('<ul id="lotusBannerCommunitiesMenu" class="submenu"><li id="lotusBannerCommunitiesMenu_mycommunities"><a href="/developerworks/mydeveloperworks/groups/service/html/mycommunities">My groups</a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})
      //.hover(function(){$(this).find(".submenu").show(menuShowRate)},function(){$(this).find(".submenu").hide(menuHideRate)})
  
  $("#lotusBannerBlogs")
      .append('<ul id="lotusBannerBlogsMenu" class="submenu"><li id="lotusBannerBlogsMenu_myblogs"><a href="/developerworks/mydeveloperworks/blogs/roller-ui/myblogs/edit">My blogs<\/a><\/li><li id="lotusBannerBlogsMenu_myupdates"><a href="/developerworks/mydeveloperworks/blogs/roller-ui/myupdates">My updates<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})
  
  $("#lotusBannerDogear")
      .append('<ul id="lotusBannerDogearMenu" class="submenu"><li id="lotusBannerDogearMenu_popularbookmarks"><a href="/developerworks/mydeveloperworks/bookmarks/html/popular">Popular bookmarks<\/a><\/li><li id="lotusBannerDogearMenu_mybookmarks"><a href="/developerworks/mydeveloperworks/bookmarks/html/mybookmarks">My bookmarks<\/a><\/li><li id="lotusBannerDogearMenu_updatesbookmarks"><a href="/developerworks/mydeveloperworks/bookmarks/html/inbox">My updates<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})
  
  $("#lotusBannerActivities")
      .append('<ul id="lotusBannerActivitiesMenu" class="submenu"><li id="lotusBannerActivitiesMenu_myactivities"><a href="/developerworks/mydeveloperworks/activities/service/html/mainpage">My activities<\/a><\/li><li id="lotusBannerActivitiesMenu_todo"><a href="/developerworks/mydeveloperworks/activities/service/html/mainpage#todolist">To do list<\/a><\/li><li id="lotusBannerActivitiesMenu_templates"><a href="/developerworks/mydeveloperworks/activities/service/html/mainpage#dashboard,templates">Activity Templates<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})
  
  $("#lotusBannerFiles")
      .append('<ul id="lotusBannerFilesMenu" class="submenu"><li id="lotusBannerFilesMenu_myfiles"><a href="/developerworks/mydeveloperworks/files">My files<\/a><\/li><li id="lotusBannerFilesMenu_collections"><a href="/developerworks/mydeveloperworks/files/app/collections">Collections<\/a><\/li><li id="lotusBannerFilesMenu_updates"><a href="/files/app/updates">Updates<\/a><\/li><li id="lotusBannerFilesMenu_shared"><a href="/files/app?#/shares?pivot=withme">Shared with me<\/a><\/li><li id="lotusBannerFilesMenu_myshared"><a href="/developerworks/mydeveloperworks/files/app?#/shares?pivot=byme">Shared by me<\/a><\/li><li id="lotusBannerFilesMenu_public"><a href="/developerworks/mydeveloperworks/files/app/public">Public files<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})
  
  $("#lotusBannerWikis")
      .append('<ul id="lotusBannerWikiMenu" class="submenu"><li id="lotusBannerWikiMenu_mywikis"><a href="/developerworks/mydeveloperworks/wikis/home/mywikis">My wikis<\/a><\/li><\/ul>')
      .hover(function(){$(this).find(".submenu").css("visibility","visible")},function(){$(this).find(".submenu").css("visibility","hidden")})

//Calculate the position of the submenus based on their parent's position. 
 $(".jqueryslidemenu li ul").each(function(){
      $(this).css("top",$(this).parent().offset().top + $(this).parent().parent().height() + $(this).parent().css("paddingBottom") + 1+ "px");
	  $(this).css("left",$(this).parent().offset().left + "px");
	  //$(this).css("left",$(this).parent().position().left + "px");
 });

    if ($("#headerUserName") && $("#headerUserName").html() != ""){
      loadMyStuff();
    }

}//end reallyTruelyForRealsLoaded function

//Set the CSS for the menus that doesn't change by theme.
var css = ""+
  "ul.submenu, ul.submenu2, ul.submenu3 {margin: 0px;  } \n"+
  "ul.submenu { float: none; z-index: 2; display: block; visibility:hidden;} \n" +
  "ul.submenu {position: absolute; padding: 0; margin: 0;} \n"+
  "ul.submenu li,#communities-nav li .submenu li,.lotusui .lotusInlinelist li .submenu li  {display: block; float: none; min-width: 100px;} \n"+
  "ul.submenu li.dropmenu {background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAADFJREFUKFNjYBh6oKOj4z8QS5Dkcqgm0jQiaSJeI5qm/0Q5k1KbiA8MskKPKD/QRREATwQzkd2y2SAAAAAASUVORK5CYII=') no-repeat right;} \n"+
  "ul.submenu li ul.submenu2 { display: none; z-index: 2; position: absolute; top: 0;} \n"+
  "ul.submenu li ul.submenu2 li ul.submenu3 { display: none; z-index: 2; position: absolute; top: 0;} \n"+
  ".lotusBanner ul.lotusLinks>li {border: 1px solid transparent;} \n"+
  //".lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {font-weight: normal;} \n"+
  "";

//Set Theme specific menu settings. Detect from in page variable lconn_comm_global_currentTheme  

if(!is_chrome && unsafeWindow.lconn_comm_global_currentTheme == "IBMDeepBlue"){
  css += ""+
  "ul.submenu {background: #CEE1FC; border: #649DE1 solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#105CB6; font-weight: normal;} \n"+
  //"ul.submenu li ul.submenu2, ul.submenu li ul.submenu2 li ul.submenu3 { background: #CEE1FC; border: #649DE1 solid 1px;}"
  "ul.submenu li ul { background: #CEE1FC; border: #649DE1 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#105CB6; border: #649DE1 1px solid; border-bottom: 0px;} \n"+
  "";
}else if(!is_chrome && unsafeWindow.lconn_comm_global_currentTheme == "IBMBrushedMetal"){
  //#A4A8AB
  css += ""+
  "ul.submenu {background: #EFEFEF; border: #7A7E81 solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#000; font-weight: normal;} \n"+
  "ul.submenu li ul { background: #EFEFEF; border: #7A7E81 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#000; border: #7A7E81 1px solid; border-bottom: 0px;} \n"+
  "";
}else if (!is_chrome && unsafeWindow.lconn_comm_global_currentTheme == "IBMEmeraldGreen"){
  //#B9DEBB
  css += ""+
  "ul.submenu {background: #B9DEBB; border: #408253 solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#004815; font-weight: normal;} \n"+
  "ul.submenu li ul { background: #B9DEBB; border: #408253 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#004815; border: #408253 1px solid; border-bottom: 0px;} \n"+
  ""; 
}else if (!is_chrome && unsafeWindow.lconn_comm_global_currentTheme =="IBMClassicRed"){
  //#EAE1C8
  css += ""+
  "ul.submenu {background: #EAE1C8; border: #6F0207 solid 1px; border-top: 0; } \n"+
  "ul.submenu li:hover {background-color: #fcfcfc;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#4D0100; font-weight: normal;} \n"+
  "ul.submenu li ul { background: #EAE1C8; border: #6F0207 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#4D0100; border: #6F0207 1px solid; border-bottom: 0px;} \n"+
  "";
}else if (!is_chrome && unsafeWindow.lconn_comm_global_currentTheme =="IBMGoldenCoffee"){
  //#EFEBC6
  css += ""+
  "ul.submenu {background: #EFEBC6; border: #BDB684 solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#000; font-weight: normal;} \n"+
  "ul.submenu li ul { background: #EFEBC6; border: #BDB684 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#000; border: #BDB684 1px solid; border-bottom: 0px;} \n"+
  "";
}else if($("#communities-masthead").css('backgroundColor') == "rgb(0, 0, 0)"){  //external ibm.com/communities setting
css += ""+
  "ul.submenu {background: #000000; border: #ccc solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc; color: #000;} \n"+
  "ul.submenu a:hover  {color: #000;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#fff; font-weight: normal;} \n"+
  "ul.submenu li ul { background: #000000; border: #649DE1 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#fff; border: #ccc 1px solid; border-bottom: 0px;} \n"+
  "";
}else{ 
  css += ""+
  /*
  "ul.submenu {background: #CEE1FC; border: #649DE1 solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc; } \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#105CB6; font-weight: normal;} \n"+
  //"ul.submenu li ul.submenu2 { background: #CEE1FC; border: #649DE1 solid 1px;}"
  "ul.submenu li ul { background: #CEE1FC; border: #649DE1 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#105CB6; border: #649DE1 1px solid; border-bottom: 0px;} \n"+*/
  "ul.submenu {background: #000000; border: #ccc solid 1px; border-top: 0;} \n"+
  "ul.submenu li:hover {background-color: #fcfcfc; color: #000;} \n"+
  "ul.submenu a:hover  {color: #000;} \n"+
  "ul.submenu a,.lotusBanner ul.lotusLinks li.lotusSelected .submenu li a {color:#fff; font-weight: normal;} \n"+
  "ul.submenu li ul { background: #000000; border: #649DE1 solid 1px;}"
  ".lotusBanner ul.lotusLinks>li:hover {color:#fff; border: #ccc 1px solid; border-bottom: 0px;} \n"+
  "";
}
var style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.setAttribute('media', 'screen');
style.appendChild(document.createTextNode(css));
document.body.appendChild(style);
//style.innerHTML = css;
//GM_addStyle(css);
		//If we are logged in, then go ahead and put out the Ajax calls that load
		//all of the users wikis, bookmarks, communities, etc.
		

}

function loadMyStuff(){

//Get My Communities list
//console.log("attempting to get my communities");
$.get("/developerworks/mydeveloperworks/groups/service/atom/communities/my?ps=50", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    mycommunities ='<ul class="submenu2" style="left:' + $("#lotusBannerCommunitiesMenu_mycommunities").parent().width() + 'px">';
    $("entry",data.documentElement).each(function(){
      mycommunities += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    mycommunities += '</ul>';
    $("#lotusBannerCommunitiesMenu_mycommunities").append(mycommunities).addClass('dropmenu').hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});

//console.log("Attemping to get My Blogs");
//https://connections.tap.ibm.com/blogs/services/atom/  (service document)
//https://connections.tap.ibm.com/blogs/home/api/blogs
$.get("/developerworks/mydeveloperworks/blogs/home/api/blogs", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    myblogs ='<ul class="submenu2" style="left:' + $("#lotusBannerBlogsMenu_myblogs").parent().width() + 'px;">';
    $("entry",data.documentElement).each(function(){
      myblogs += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    myblogs += '</ul>';
    $("#lotusBannerBlogsMenu_myblogs").append(myblogs).addClass('dropmenu').hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});

//http://connections.tap.ibm.com/activities/service/atom2/forms/activities
// Seems like the second one works better:
//http://connections.tap.ibm.com/activities/service/atom2/activities
$.get("/developerworks/mydeveloperworks/activities/service/atom2/activities", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    myactivities ='<ul class="submenu2" style="left:' + $("#lotusBannerActivitiesMenu_myactivities").parent().width() + 'px;">';
    $("entry",data.documentElement).each(function(){
      myactivities += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" id="'+ $("snx\\:activity",this).text() +'" class="Myactivities">'+ $("title:first",this).text() + '</a></li>';
      //myactivities += '<li><a href="/activities/service/html/mainpage#activitypage,'+ $("snx\\:activity",this).text() + '" id="'+ $("snx\\:activity",this).text() +'" class="Myactivities">'+ $("title:first",this).text() + '</a></li>';
    });
    myactivities += '</ul>';
    $("#lotusBannerActivitiesMenu_myactivities").append(myactivities).addClass('dropmenu').hover(function(){
          $(this).find('ul.submenu2').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul.submenu2').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
    $(".Myactivities").each(function(){
      //thisActivity = $(this);
      
      if ($(this).attr('id') && $(this).attr('id') != ""){
        $.get("/developerworks/mydeveloperworks/activities/service/atom2/descendants?nodeUuid=" + $(this).attr('id'), function(data){
          var response = data.documentElement;
          if ($('entry',data.documentElement).length > 0){
            myactivityitems ='<ul class="submenu3">';
            myactivityid = $("snx\\:activity:first",data.documentElement).text();
            
            $("entry",data.documentElement).each(function(){
              myactivityitems += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" id="'+ $("snx\\:activity",this).text() +'" class="MyactivityItems">'+ $("title:first",this).text() + '</a></li>';
            });
            myactivityitems += '</ul>';
            //console.log(myactivityitems);
            $("#"+ myactivityid).parent().append(myactivityitems).addClass('dropmenu').hover(function(){
              if ($(this).prev().length > 0){
                $(this).find('ul.submenu3').css({"display":"block","left": $(this).parent().width() + "px","top":$(this).prev().offset().top +"px"});
              }else{
                $(this).find('ul.submenu3').css({"display":"block","left": $(this).parent().width() + "px"});
              }
              //$(this).find('ul').show(menuShowRate); //this was being buggy =(
            },function(){
              $(this).find('ul.submenu3').css("display","none");
              //$(this).find('ul').hide(menuHideRate);
            });
          }
        });
        
      }
    });
  }
});


//http://connections.tap.ibm.com/files/form/api/myuserlibrary/feed
//My Files
$.get("/developerworks/mydeveloperworks/files/form/api/myuserlibrary/feed", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    myfiles ='<ul class="submenu2" style="left:' + $("#lotusBannerFilesMenu_myfiles").parent().width() + 'px;">';
    $("entry",data.documentElement).each(function(){
      myfiles += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    myfiles += '</ul>';
    $("#lotusBannerFilesMenu_myfiles").append(myfiles).addClass('dropmenu').hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});

//http://connections.tap.ibm.com/files/form/api/myshares/feed?page=1&direction=inbound&pageSize=25&sK=published&sO=dsc
//http://connections.tap.ibm.com/files/basic/api/myshares/feed?direction=inbound
//Files shared with me
$.get("/developerworks/mydeveloperworks/files/basic/api/myshares/feed?direction=inbound", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    myshares ='<ul class="submenu2" style="left:' + $("#lotusBannerFilesMenu_shared").parent().width() + 'px; top: '+ ($("#lotusBannerFilesMenu_shared").prev().offset().top ) +'px;">';
    $("entry",data.documentElement).each(function(){
      myshares += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    myshares += '</ul>';
    $("#lotusBannerFilesMenu_shared").append(myshares).addClass('dropmenu').hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});

//http://connections.tap.ibm.com/files/form/api/myshares/feed?page=1&direction=inbound&pageSize=25&sK=published&sO=dsc
//http://connections.tap.ibm.com/files/basic/api/myshares/feed?direction=inbound
//Files shared by me
$.get("/developerworks/mydeveloperworks/files/basic/api/myshares/feed?direction=outbound", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    mysharesby ='<ul class="submenu2" style="left:' + $("#lotusBannerFilesMenu_myshared").parent().width() + 'px; top: '+ ($("#lotusBannerFilesMenu_myshared").prev().offset().top ) +'px;">';
    $("entry",data.documentElement).each(function(){
      mysharesby += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    mysharesby += '</ul>';
    $("#lotusBannerFilesMenu_myshared").append(mysharesby).addClass('dropmenu').hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});
/*
//console.log("Attemping to get My Wikis");
//http://connections.tap.ibm.com/wikis/form/api/mywikis/feed
$.get("/developerworks/mydeveloperworks/wikis/form/api/mywikis/feed", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    mywikis ='<ul class="submenu2" style="left:' + $("#lotusBannerWikiMenu_mywikis").parent().width() + 'px;">';
    $("entry",data.documentElement).each(function(){
      mywikis += '<li><a href="'+ $("link[type='text/html']",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    mywikis += '</ul>';
    $("#lotusBannerWikiMenu_mywikis").append(mywikis).addClass('dropmenu').hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});
*/
/*
//console.log("Attemping to get my bookmarks")
//https://connections.tap.ibm.com/dogear/api/app  (service document)
//http://connections.tap.ibm.com/dogear/atom/mybookmarks
$.get("/developerworks/mydeveloperworks/dogear/atom/mybookmarks", function(data){
  var response = data.documentElement;
  if ($('entry',data.documentElement).length > 0){
    mybookmarks ='<ul class="submenu2" style="left: ' + $("#lotusBannerDogearMenu_mybookmarks").parent().width() + 'px;">';
    $("entry",data.documentElement).each(function(){
      mybookmarks += '<li><a href="'+ $("link",this).attr('href') + '" title="">'+ $("title:first",this).text() + '</a></li>';
    });
    mybookmarks += '<li style="border-top: dashed #999 1px;"><a href="/dogear/html/mybookmarks?ps=50">View all of my bookmarks</a></li>';
    mybookmarks += '</ul>';
    $("#lotusBannerDogearMenu_mybookmarks")
        .append(mybookmarks)
        .addClass('dropmenu')
        .hover(function(){
          $(this).find('ul').css("display","block");
          //$(this).find('ul').show(menuShowRate); //this was being buggy =(
        },function(){
          $(this).find('ul').css("display","none");
          //$(this).find('ul').hide(menuHideRate);
        });
  }
});
*/
}
