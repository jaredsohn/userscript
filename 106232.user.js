// ==UserScript==
// @name            D2L-9.2-MagicBar
// @namespace       Trevor Pemberton
// @description     Adds additional links/information to every org unit navbar. Uses jQuery1.3.2. In order for the bar to appear, user must be able to see the 'edit navbar' link in a course (i.e. the pencil icon)
// @require         http://code.jquery.com/jquery-1.3.2.min.js
// @include         https://courselink.uoguelph.ca/d2l/*
// @include         https://grange.uoguelph.ca/d2l/*     
// ==/UserScript==
// LAST UPDATED: June 28, 2011
var mb_ouSrc = "";
var mb_currOU = "";
var mb_frameSet = "";
var mb_INframeSet = false;
var mb_OrgId = 6605;
//locate navbar div
if( $("#d_navBar").length > 0 ){
    //check if edit navbar icon exists and get ou from link parameter. Note - 'legacy' navbars have a different link url, but shouldn't matter
    mb_ouSrc = $("#d_navBar img[title='Edit Active Navbar']").parent().attr('href');
    if ( mb_ouSrc.length > 0){
        mb_currOU = mb_gup('ou', mb_ouSrc);  
    }
    //Personal customizaion - shrink navbar middle image to make navbar shorter
    $("#d_navBar img.d_nb_mi").height('50px');
}
//if( self != top ) {  alert("NOTTOP:"+self.location.href) }else{alert("TOP:"+self.location.href)}

//navbar has been located and proper permissions exist
if (mb_currOU.length > 0){

    //-------------------CREATE MAGICBAR----------------------------------------
    $("#d_pc:first").prepend('<div id="magicBar"></div>');
    $("#magicBar").css({'padding':'3px','margin':'0px','color':'#555', 'background':'#CCC', 'border-bottom':'1px solid #000','background':'-moz-linear-gradient(top, white,#ccc)'});
    //styling to keep magicbar at top
    $("#magicBar").css({'width': '100%', 'position': 'fixed','top':'0px','z-index':'99999'});

    $("#magicBar").append('&nbsp;<a href="/d2l/lp/ouHome/defaultHome.d2l" title="My Home"><strong>My Home</strong></a>&nbsp;');
        
    if(mb_currOU > mb_OrgId){
      $("#magicBar").append('<input id="mb_getDetails" value="View Course Details" type="button" />&nbsp;');
      
      //add course tool links
      $("#magicBar").append('<select id="mb_selectCourseTools"><option value="">---Course Tools---</option></select>&nbsp;');
      $("#mb_selectCourseTools").append('<option value="/d2l/lp/ouHome/home.d2l?ou='+mb_currOU+'">Course Home</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/classlist/classlist.d2l?ou='+mb_currOU+'">Classlist</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/content/home.d2l?ou='+mb_currOU+'">Content</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/discussions/admin/forum_topics_list.d2l?ou='+mb_currOU+'">Discussions</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/dropbox/dropbox.d2l?ou='+mb_currOU+'">Dropbox</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/grades/index.d2l?ou='+mb_currOU+'">Grades</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/group/group_list.d2l?ou='+mb_currOU+'">Groups</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/quizzing/quizzing.d2l?ou='+mb_currOU+'">Quizzes</option>');
      $("#mb_selectCourseTools").append('<option value="/d2l/lms/survey/surveys.d2l?ou='+mb_currOU+'">Surveys</option>');
      
      //add course admin links
      $("#magicBar").append('<select id="mb_selectCourseAdmin"><option value="">---Course Admin---</option></select>&nbsp;');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lp/cmc/main.d2l?ou='+mb_currOU+'">Edit Course</option>');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lp/manageCourses/course_offering_info_viewedit.d2l?ou='+mb_currOU+'">Offering Info</option>');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lp/manageFiles/main.d2l?ou='+mb_currOU+'">Manage Files</option>');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lms/classlist/admin/participants/participants_add_existing.d2l?ou='+mb_currOU+'">Add Participant</option>');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lms/importExport/import_export.d2l?ou='+mb_currOU+'">Copy Components</option>');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lms/courseBuilder/welcome.d2l?ou='+mb_currOU+'">Course Builder</option>');
      $("#mb_selectCourseAdmin").append('<option value="/d2l/lms/group/section_list.d2l?ou='+mb_currOU+'">Sections</option>');
    } else {
      //at the Org Level
    } 
    
    //add org admin links
    $("#magicBar").append('<select id="mb_selectOrgAdmin"><option value="">---Org Admin---</option></select>&nbsp;');
    $("#mb_selectOrgAdmin").append('<option value="/d2l/lp/manageUsers/main.d2l?ou='+mb_OrgId+'">User Management</option>');
    $("#mb_selectOrgAdmin").append('<option value="/d2l/lp/legacy/manageCourses.d2l?ou='+mb_OrgId+'">Course Management</option>');
    $("#mb_selectOrgAdmin").append('<option value="/d2l/sisint/courseMappings.d2l?ou='+mb_OrgId+'">Course Mappings</option>');
    
    $("#magicBar").append('&nbsp;<em>MagicBar for D2Lv9.2 - Trevor Pemberton, UofG</em>')      
    //add course search elements   
    $("#magicBar").append('<form style="float:right;margin-right:5px" id="courseForm" name="courseForm" method="post" action=""> <input name="ou" value="6605" type="hidden" /> <input name="op" type="hidden" /> <input name="sortCriteria" value="1" type="hidden" /> <input name="sortOrder" type="hidden" /> <input name="pageAction" value="search" type="hidden" /> <input name="curPage" value="0" type="hidden" /> <input name="searchPerformed" value="1" type="hidden" /> <input name="pageVal" value="0" type="hidden" /> <input id="searchFor_id" maxlength="128" size="20" name="txtSearchValue" type="text" value="" /> <input id="mb_courseSearch" value="Search Courses" type="button" /><input name="viewCoursesList" value="25" type="hidden" /></form>')
    $("#mb_getDetails, #mb_courseSearch").css({'padding':'0px','margin':'0px','vertical-align':'middle','cursor':'pointer','color':'#333', 'background':'#ccc', 'border':'1px solid #000','background':'-moz-linear-gradient(bottom, #fff,#ccc)'})
    $("#magicBar #searchFor_id").css({'padding':'0px','margin':'0px','vertical-align':'middle'});
    $("#magicBar").append('<div style="display:block;clear:both;">')  
    
    //check if navbar is inside frameset (Classlist, Discussion tools...and other places)
    if( window.self != window.top ){
      //navbar is inside of a frame. Locate Frameset object
      mb_INframeSet = true;
      mb_frameSet = $(window.parent.document).find('frameset')     
      //change target on magicBar tool links if in a frame
      $("#magicBar a").each( function(){
        $(this).attr('target','_parent')
      })      
    }
    mb_resize();
    
//-----------------------START MAGICBAR EVENT LISTENERS-------------------------
    
    //----perform Course Search   
    $("#mb_courseSearch").click(function(){        
      $(this).attr('value','loading').attr('disabled','disabled')
      
      $.post("/d2l/tools/CMS/manageCourses.asp?ou="+mb_OrgId, $("#courseForm").serialize(),function(data){          
          //window.open('/d2l/lp/legacy/manageCourses.d2l?ou='+mb_OrgId,'mb_courseSearchWindow');
          $("#mb_courseResultsWrapper").remove();
          
          $("#magicBar").append('<div id="mb_courseResultsWrapper"><div style="margin:5px"><strong>Course Search Results (top 25)</strong><input type="image" id="mb_clearSearch" value="clear" src="/d2l/img/lp/messageArea/close.gif" style="float:right"></div></div>');
          $("#mb_courseResultsWrapper").css({"border":"1px solid","float":"right","margin":"5px","background":"#ccc"});
          $("#mb_courseResultsWrapper").append('<table id="mb_courseResults" cellpadding="2" cellspacing="2"></table>');
          $("#mb_courseResults").append("<tr><th>Code</th><th>Name</th><th>Department</th></tr>")
          //$("#magicBar").append(data);
          $(data).find("input[name='course_id']").each(
              function (){
                idx = $(this).val();
                if (idx >= mb_OrgId ){
                  $("#mb_courseResults").append('<tr id="rowNum'+idx+'" ></tr>');
                  $("#rowNum"+idx).append($(this).parent().parent().children("td:gt(0):lt(3)"));
                }
              }
          );
          $("#mb_courseResults tr:even").css('background','#FFFFFF');
          $("#mb_courseResults tr:odd").css('background','#FFFFCC');
          $("#mb_courseResults th").css('background','#EEEDD7');
          $("#mb_courseSearch").attr('value','Search Courses').removeAttr('disabled');
          mb_resize();
          
        }
      )
        
    });
    
    //----get course details
    $("#mb_getDetails").click(function(){
      $(this).attr('value','loading').attr('disabled','disabled')
      //$("#mb_courseDetailsWrapper").append('<img src="/d2l/img/0/Conversion.Main.infRotatingArrows.gif" border="0">')    
      $("<div />").load('/d2l/lp/manageCourses/course_offering_info_viewedit.d2l?ou='+mb_currOU+' .d_FG', 
          function(){
            //array containing a list of all the offering info fields you want to grab. Each value must match what is displayed on the actual offering info page
            mb_orgVars = new Array();
            mb_orgVars[0] = 'Course Offering Name';
            mb_orgVars[1] = 'Course Offering Code';
            mb_orgVars[2] = 'Course Template Name';
            mb_orgVars[3] = 'Course Template Code';
            mb_orgVars[4] = 'Department';
            mb_orgVars[5] = 'Semester';
            mb_orgVars[6] = 'Active';
            mb_orgVars[7] = 'Sections';
            mb_orgVars[8] = 'Start Date';
            mb_orgVars[9] = 'End Date';
            mb_orgVars[10] = 'Course Offering Path';
            //mb_orgVars[11] = 'Course Address Book';
            
            $("#mb_courseDetailsWrapper").remove();
            $("#magicBar").append('<div id="mb_courseDetailsWrapper"><div style="margin:5px"><strong>Current Offering Details</strong><input type="image" id="mb_clearDetails" value="clear" src="/d2l/img/lp/messageArea/close.gif" style="float:right"></div></div>');
            $("#mb_courseDetailsWrapper").css({"border":"1px solid","float":"left","margin":"5px","background":"#ccc"});
            $("#mb_courseDetailsWrapper").append('<table id="mb_courseDetails" cellpadding="2" cellspacing="2"></table>')
            $("#mb_courseDetails").append("<tr><th>Property</th><th>Value</th></tr>")

            for (row = 0; row < mb_orgVars.length; row++){
              mb_currString = "";
              mb_currVal = $(this).find("span:contains('"+mb_orgVars[row]+"')");  //look for the offering info field             
              if ( mb_currVal.length > 0 ){ //offering info field item exists on page    
                mb_currString = "<tr><td><strong>"+mb_currVal.text()+ "</strong></td><td>";
                //determine if user has edit or view permissions for this field by looking for form elements
                if ( mb_currVal.parents("td").next().find("input, select").not("[type=\'hidden\']").length > 0  ){               
                  // if any input or select form elements are found, then user has permissions to edit this field. Print out form element values
                  //also ignore form elements that are hidden (d2l has extra hidden elements buried on page). This also makes start/end date data work properly
                  mb_currVal.parents("td").next().find("input, select").not("[type=\'hidden\']").each( function(){
                    //each() function will cycle though all the input/selects found for this field
                    if ( $(this).is("input[type=\'checkbox\']")){ // if checkbox input is detected, replace 0/1 value with true/false
                      if ( $(this).attr("checked") ){ 
                        mb_currString = mb_currString + "Yes&nbsp;";
                        
                      } else{ mb_currString = mb_currString + "No&nbsp;"; }
                    }         
                    else{
                      // print out value of form element
                      mb_currString = mb_currString + $(this).val() +"&nbsp;";
                    }
                  })
                   
                } 
                else {
                  // no input or select form elements found for this field, meaning user doesn't have permission to edit value. Look for value in label
                  mb_currString = mb_currString + mb_currVal.parents("td").next().find("label").text();
                }
                mb_currString = mb_currString + "</td></tr>"
                $("#mb_courseDetails").append(mb_currString);
              }
            }
            $("#mb_courseDetails tr:even").css('background','#FFFFFF');
            $("#mb_courseDetails tr:odd").css('background','#FFFFCC');
            $("#mb_courseDetails th").css('background','#EEEDD7');
            $("#mb_getDetails").attr('value','View Course Details').removeAttr('disabled');
            mb_resize();
          } 
      )    
    })   
    
    //----catch select box changes
    $("select[id^=mb_select]").change(function(){
      parent.location.replace( $(this).children(":selected").attr('value'));    
    })
    
    //----catch ajax errors on course search 
    $(document).ajaxError(function(event, request, settings){
      $("#mb_courseSearch").attr('value','Search').removeAttr('disabled');
      alert("Error requesting page for course search: "+settings.url);
    });

    //----clear course search results
    $('#mb_clearSearch').live('click', function(e) {
          e.preventDefault();
          $("#mb_courseResultsWrapper").remove();
          mb_resize();
    });
    
    //----clear course detail results
    $('#mb_clearDetails').live('click', function(e) {
          e.preventDefault();
          $("#mb_courseDetailsWrapper").remove();
          mb_resize();
    });

    //----re-adjust offset margin for magic bar when window is re-sized (magicbar content could wrap to 2+ lines)
    $(window).resize(function(){
      mb_resize() ;
    });  
    
//-----------------END MAGICBAR EVENT LISTENERS---------------------------------

}else {/*alert('ERROR - Course navbar cannot be found or user has insufficient permissions');*/}



//------------------------ADDITIONAL FUNCTIONS----------------------------------

//Regex URL query parameter function http://www.netlobo.com/url_query_string_javascript.html 
function mb_gup( name, url )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  if( results == null )
    return "";
  else
    return results[1];
}

//Resize function - set offset margin for page content so that magicbar doesn't cover anything. 
function mb_resize(){
 $("#d_pc").css('margin-top',$("#magicBar").outerHeight())
 //resize nav frame if navbar is in frameset
 if (mb_INframeSet){
    mb_frameSet.attr('rows',$("#d_pc").height()+$("#magicBar").outerHeight()+',*')
 }
}
