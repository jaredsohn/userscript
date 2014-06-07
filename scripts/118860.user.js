// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook - Alle Freunde in Gruppe einladen Beta
// @namespace     http://localhost/
// @description   Facebook - Alle Freunde in Gruppe einladen Beta
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


errorAlreadyInvitedCount = 0;
errorAlreadyInvitedAndDiscardedCount = 0;
successAdminHasToAccept = 0;
successAdded = 0;
unknownError = 0;


$(document).ready(function() {

function checkGroup () {

      if (window.location.href) 
      {
          testvar = window.location.href.split("/");
          
          if (testvar[3] == "groups")
          {
            if (!($("#gmInviteAllFBFriends").html()) && $("#gmInviteAllFBFriends").html() != "")
            {
              initGroup();
            }
            
          } 
          
      }
      setTimeout(function () { checkGroup(); },1000);  
    }
    
    function initGroup () {
    
      $("input[title=Freunde zur Gruppe hinzufügen]").parent().parent().parent().after('<span style="color: grey; width: 222px; margin-bottom: 10px; display: block; text-align:center;" class="inputtext textInput DOMControl_placeholder" id="gmInviteAllFBFriendsCounter"></span>');
      
      $("#gmInviteAllFBFriendsCounter").hide();
    
      $("input[title=Freunde zur Gruppe hinzufügen]").parent().parent().parent().after('<input id="gmInviteAllFBFriends" type="button" value="Alle Freunde einladen" class="uiButton uiButtonConfirm" style="color: white; width: 230px; margin-bottom: 10px;" />');  
    
      $("#gmInviteAllFBFriends").click(function () { 
          
          inviteFriends(); 
      
      });
    
    }
    
    function request (uid) {
    
      GM_xmlhttpRequest({
                		method : "POST",
                		url : "http://www.facebook.com/ajax/groups/members/add_post.php?__a=1",
                		data : "post_form_id=" + post_form_id + "&fb_dtsg=" + fb_dtsg + "&group_id="+ group_id + "&source=typeahead&members=" + uid + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id,
                		headers : {
                			"Content-Type" : "application/x-www-form-urlencoded"
                		},
                		onload : function(response) {
                      
                      k++;
                      
                      percent = Math.round(k*100/i);
                      
                      analyzeResponse(response.responseText);
                      
                      $("#gmInviteAllFBFriendsCounter").text( percent + "% (" + k + "/" + i + ")")
                      
                      if (i == k) 
                      {
                          $("#gmInviteAllFBFriendsCounter").text("Alle Freunde eingeladen");
                          
                          //console.log(errorAlreadyInvitedCount);
                          //console.log(errorAlreadyInvitedAndDiscardedCount);
                          //console.log(successAdminHasToAccept);
                          //console.log(successAdded);
                          //console.log(errorAlreadyInvitedCount + errorAlreadyInvitedAndDiscardedCount + successAdminHasToAccept + successAdded + unknownError);
                          
                          hint  = "Schon eingeladene Freunde: " + errorAlreadyInvitedCount + "\n";
                          hint += "Freunde die die Mitgliedschaft bereits abgelehnt haben: " +  errorAlreadyInvitedAndDiscardedCount + "\n";
                          hint += "Freunde dessen Einladungen vom Gruppenadmin bestätigt werden müssen: " + successAdminHasToAccept + "\n";
                          hint += "Erfolgreich eingeladene Freunde: " + successAdded + "\n";
                          hint += "Unbekannte Fehler: " + unknownError + "\n";
                          
                          alert (hint);
                          
                          errorAlreadyInvitedCount = 0;
                          errorAlreadyInvitedAndDiscardedCount = 0;
                          successAdminHasToAccept = 0;
                          successAdded = 0; 
                          unknownError = 0;
                          
                          setTimeout(function () {$("#gmInviteAllFBFriendsCounter").fadeOut();}, 2000);
                      }
        
                		}
                	});
                
                
    }
    
    function analyzeResponse (responseText) {
    
          var vars = responseText.replace("for (;;);","");
              
          var vars = eval("(" + vars + ")");
          
          if (vars.error == 1376015)
          {
              errorAlreadyInvitedCount ++;   
          }
          else if (vars.error == 1376042)
          {
              errorAlreadyInvitedAndDiscardedCount ++;
          }
          else if (vars.bootloadable)
          {
              successAdminHasToAccept ++;
          }
          else if (vars.onload)
          {
              successAdded ++;
          }
          else
          {
              unknownError ++;
          }
          
          
    
    }

    
    function inviteFriends () { 
    
        var obj = $("input[title=Freunde zur Gruppe hinzufügen]").parent().parent().parent().parent();
        
        post_form_id = $(obj).find("input[name=post_form_id]").val();
        fb_dtsg = $(obj).find("input[name=fb_dtsg]").val();
        group_id = $(obj).find("input[name=group_id]").val();
          
        user_id = $(".fbxWelcomeBoxImg").attr("src");
        
        user_id = user_id.split("/");
        
        user_id = user_id[4];
        
        user_id = user_id.split(".");
        
        user_id = user_id[0];
        
        user_id = user_id.split("_");
        
        user_id = user_id[1];
        
        
        GM_xmlhttpRequest({
        		method : "GET",
        		url : "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + user_id + "&token=v7&filter[0]=user&options[0]=friends_only&options[1]=nm&__user=" + user_id,
        		data : "",
        		headers : {
        			"Content-Type" : "application/x-www-form-urlencoded"
        		},
        		onload : function(response) {
            
              var vars = response.responseText.replace("for (;;);","");
              
              var vars = eval("(" + vars + ")");
              
              i=0;
              k=0;
              
              for (; vars.payload.entries[i]; i++)
              {
                
                setTimeout (request, i*200, vars.payload.entries[i].uid);
      
              }
              
              $("#gmInviteAllFBFriendsCounter").slideDown();
              
            }
        });
    }

    checkGroup ();

});


