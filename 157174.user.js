// ==UserScript==
// @name       ClasificadosOnline Search Helper
// @namespace  http://www.google.com/
// @version    0.6.2
// @description  This Search Helper allows you to save searches and mark specific items in list results so that you can know which ones you've already seen/review. For now it only works for the 'Articulos/Merchandise' and 'Jobs' Listings.
// @match      http://www.clasificadosonline.com/UD*
// @include        http://www.clasificadosonline.com/UD*
// @include        http://*.clasificadosonline.com/UD*
// @exclude        http://*.google.com/*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright  2013+, Abidan Rivera
// ==/UserScript==

/* LOG:
v. 01
Initial release beta.
introduced search helper bar
v. 02
Color coded legend.
popup click menu.
v. 03
color code updated.
v. 04
format the contact's phone number on the details page.
v. 05
check if url is on the approved list.
v. 06
New category supported: Jobs Listings!!!
v. 0.6.1
Bug fixes!!
v. 0.6.2
Fixes: was not working well on the 'Jobs' section. Line # 559.
*/

$(document).ready(function () {    
    //debugger;
    // Check URL Location:
    // Approved urls:
    var approved_urls = ['UDMiscListingID.asp','UDMiscDetail.asp','UDJobsListing.asp'];
    // Determine which category:
    var category = document.URL.substring(document.URL.indexOf(".com/UD")+7,document.URL.indexOf("Listing"));
    var page_location = "";
    var url_approved = false;
    // Check if URL is on the list:
    $.each(approved_urls,function(index,value){
        //check:
        if (document.URL.indexOf(value) !== -1){
            url_approved = true;
            page_location = value;
            return false;
        }
    });
    if(!url_approved){return;} // EXIT if URL is not on the approved list.
    
    
    // *** Phone number format: ***
    
    if (page_location == "UDMiscDetail.asp")
    {
        // Format the phone number:
        var number = $('.Ver12C .Ver14 strong').html();
        $('.Ver12C .Ver14 strong').html("("+number.substring(0,3)+") "+number.substring(3,6)+"-"+number.substring(6,10));
        return;
    }
            
    // VARS:::
    var current_session_search_term = "";
    var current_session_search_key_color = "";
    var current_session_items_color = new Array();
    var current_session_items_comment = new Array();
    var clicked_item_number = "";
    var resuming_search_flag = false;
    
    
    // Fix layouts:    
    $("body table").first().css("padding-top","40px");
    
    // Insert Element:
    var elementCode = '<span id="search_helper_ab"> '+
        'Search Helper:'+
        '<input type="checkbox" id="chb_activate_helper">Enable?'+
        '<span id="sh_bar_items"></span>'+'</span>';
    $('body table').first().before(elementCode);
    
    // Do css for the element:
    $('#search_helper_ab').css({
        "display":"block",
        "border":"red solid thin",
        "position":"fixed",
        "width":"100%",
        "background":"#FFF4F4",
        "padding":"5px 0 1px 3px",
        "height":"25px"
    });
    
    // code for popup menu:
    var popup_code = "<div id='popup_menu_sh'><p>Select Label:</p>"+
        "<span class='label_selected' style='color:#F3AD1A'>New</span><br>"+
    	"<span class='label_selected' style='color:black'>No-Interest</span><br>"+
        "<span class='label_selected' style='color:magenta'>Seen</span><br>"+
        "<span class='label_selected' style='color:red'>Not-Available</span><br>"+
    	"<span class='label_selected' style='color:green'>Interested</span>"+
        "<button id='close_popup_sh'>CLOSE</button></div>";    
    // Add it to the DOM:    
    $('#search_helper_ab').after(popup_code);
    // Do css for the popup menu:
    $('#popup_menu_sh').css({
        "display":"none",
        "border":"red solid thin",
        "position":"fixed",
        "background":"yellow",
        "padding":"5px",
        "top":"50px"
    });
    $('.label_selected').css({
        "display":"block",
        "border":"red solid thin",
        "padding":"1px",
        "cursor":"pointer",
    });
    // Effect:
    $('.colorLegend_cell').live("click",function(){
        clicked_item_number = $(this).attr("id");
        var popup_div = $('#popup_menu_sh');
        var obj = $(this);
        var offset = obj.offset();
        var new_top = offset.top - 30;
        var new_left= offset.left - 110;
        popup_div.css('left', new_left + 'px');
        popup_div.css('top', new_top + 'px');
        popup_div.css("position","absolute");
        popup_div.show();
    });
    // Label Action:
    $('.label_selected').live("click",function(){
        var color_to_save = "";
        switch($(this).html())
        {
            case "New":
                color_to_save = "#F3AD1A";
                break;
            case "No-Interest":
                color_to_save = "black";
                break;
            case "Seen":
                color_to_save = "magenta";
                break;
            case"Not-Available":
                color_to_save = "red";
                break;
            case "Interested":
                color_to_save = "green";
                break;
        }
        //check and save.
        if(localStorage[current_session_search_key_color])
        {
            //
            if(localStorage[current_session_search_key_color] == "")
            {
                localStorage[current_session_search_key_color] = clicked_item_number+":"+color_to_save;
            }
            else if(localStorage[current_session_search_key_color].indexOf(",") !== -1)
            {
                // Is it already saved?
                if(localStorage[current_session_search_key_color].indexOf(clicked_item_number) !== -1)
                {
                    // Found it string. Make array to find it and replace it.
                    var items_array = localStorage[current_session_search_key_color].split(",");
                    var new_items_string = "";
                    $.each(items_array,function(index,value){
                        //
                        if(value.indexOf(clicked_item_number) !== -1)
                        {
                            // replace with new data:
                            items_array[index] = clicked_item_number+":"+color_to_save;
                            if(index==0){new_items_string=clicked_item_number+":"+color_to_save;}
                            else
                            {
                                new_items_string = new_items_string +","+ clicked_item_number+":"+color_to_save;                            
                            }
                        }
                        else
                        {
                            //
                            if(index==0){new_items_string=value;}
                            else
                            {
                                new_items_string = new_items_string +","+ value;                            
                            }
                        }
                    });
                    // Store new string:
                    localStorage[current_session_search_key_color] = new_items_string;
                }
                else
                {
                    // Add to string:
                	localStorage[current_session_search_key_color] = localStorage[current_session_search_key_color] + 
                    ","+clicked_item_number+":"+color_to_save;
                }
            }
            else
            {
                //
                // Is it already saved?
                if(localStorage[current_session_search_key_color].indexOf(clicked_item_number) !== -1)
                {
                    // Found. replace:
                    localStorage[current_session_search_key_color] = clicked_item_number+":"+color_to_save;
                }
                else
                {
                    // Add to string:
                	localStorage[current_session_search_key_color] = localStorage[current_session_search_key_color] + 
                    ","+clicked_item_number+":"+color_to_save;
                }
            }
        }
        else
        {localStorage[current_session_search_key_color] = clicked_item_number+":"+color_to_save;}
        
        // Update color:
        $("#"+clicked_item_number).css("background",color_to_save);
        //Close popup:
        $("#popup_menu_sh").hide();
    });
    // close popup:
    $("#close_popup_sh").live("click",function(){$("#popup_menu_sh").hide();});
      
    
    // Action for 'enable' checkbox:
    $("#chb_activate_helper").live("click",function(){ 
        if (!this.checked)
        {
            // ASK:
            var choice = confirm("Are you sure? This will unload current session and UI enhancements.");
            if (choice)
            {
                //
                current_session_search_term = "";
                current_session_search_key_color = "";
                current_session_items_color = new Array();
                current_session_items_comment = new Array();
                clicked_item_number = "";
                resuming_search_flag = false;
                //
                localStorage.removeItem("search_helper_session_loaded");
                // Set it inactive 'empty':        
        		localStorage["search_helper_active"] = "";
                //
                $('#enabled_contents_container').remove();
                $('.helper_color_column').remove();
                $('.helper_note_column').remove();
                $('#legend_container').remove();
                return;
            }
            else
            {return false;}
            // clean up...
            return;
        }
        
        //create code:
        var bar_items_code = "<span id='enabled_contents_container'> | Saved searches:"+
            "<select id='dbx_saved_searches'>"+
            "<option value='empty'>empty</option>"+
            "</select> <button id='load_saved_search'>Load</button> "+
            "| <button id='btn_new_search'>New Search</button></span>";
        
        // insert into dom:
        $("#sh_bar_items").append(bar_items_code);
        
        // Legend code:
        var legend_code = "<span id='legend_container'> |<b> Legend: "+
            "<span style='color:#F3AD1A;font-size:12px'>NEW</span> / "+
            "<span style='color:black;font-size:12px'>NO-INTEREST</span> / "+
        	"<span style='color:magenta;font-size:12px'>SEEN</span> / "+
            "<span style='color:red;font-size:12px'>NOT_AVAILABLE</span> / "+
            "<span style='color:green;font-size:12px'>INTERESTED</span></b></span>";
        
        // insert legend into bar:
        $("#sh_bar_items").append(legend_code);
            
        // Get saved search terms in local storage:
        var search_terms = new Array();
        
        if (localStorage["saved_search_terms"])
        {
            //
            var terms = localStorage["saved_search_terms"];
            if (terms.indexOf(",") >= 0)
            {
                search_terms = terms.split(',');
            }
            else if (terms.length >= 2)
            {
                search_terms[0] = terms;
            }
        }
        
        // Populate if any data:
        if (search_terms.length > 0)
        {
            // remove the empty option:
            $("#dbx_saved_searches option").remove();
            
            // add the terms:
            $.each(search_terms,function(index,value)
                   {
                       //
                       $("#dbx_saved_searches").append("<option value='"+
                           value.substring(value.indexOf(':')+1,value.length)+"'>"+
                           value.substring(0,value.indexOf(':'))+
                           "</option>");
                   }
                  );
        }
        
        // Set it active:        
        localStorage["search_helper_active"] = "true";
    	});
    
    // ====| BTN NEW SEARCH:::
    
    $("#btn_new_search").live("click",function(){
        // vars:
        var current_search_term = "";
        
        // get URL search term:
        switch(page_location){
            case "UDMiscListingID.asp":
                // Articulos / Merchandise Listing
                current_search_term = document.URL.substring(document.URL.indexOf("&keyword=")+9,document.URL.indexOf("&Desc=")).replace("+"," ");
                break;
            case "UDJobsListing.asp":
                // Jobs Listing
                current_search_term = document.URL.substring(document.URL.indexOf("Pueblo=")+7,document.URL.indexOf("&txkey")).replace("+"," ");
                break;
            default:
                alert('Attempting to work on an unsupported section!');
                return false;
                break;
        }
        
        // 
        if(current_search_term == null || current_search_term == "")
        {
            // get the URL site category:
            current_search_term = document.URL.substring(document.URL.indexOf(".com/UD")+7,document.URL.indexOf("Listing"))+"-Global";
        }
                
        var dTime = new Date();
            var keyCode = dTime.getFullYear()+"/"+(dTime.getMonth()+1)+"/"+dTime.getDate()+"-"+dTime.getHours()+"."+
                dTime.getMinutes()+"."+dTime.getSeconds();
        
        var enter_term = prompt("Enter the search term:",current_search_term);
        
        if (enter_term != null){
            if(enter_term !== ""){
            	current_search_term = enter_term;
            }
        }
        else{return false;}
        
        if (localStorage["saved_search_terms"])
        {            
            localStorage["saved_search_terms"] = localStorage["saved_search_terms"] + 
                ","+current_search_term+":"+keyCode;
        }
        else
        {
            localStorage["saved_search_terms"] = current_search_term+":"+keyCode;
        }
        
        // Set boolean:
        localStorage["search_helper_active"] = current_search_term;
        
        // if select box is empty:
        $("#dbx_saved_searches option").filter("[value='empty']").remove();
        
        // Add to select box:
        $("#dbx_saved_searches").append("<option value='"+keyCode+"'>"+current_search_term+"</option>");
        
        // Select it:
        $('#dbx_saved_searches').val(keyCode);
        
        // Load it:
        $("#load_saved_search").click();
    }                             
    );
    
    
    //############################==> [ LOAD ]
    $("#load_saved_search").live("click",function(){
        //debugger;
        // Check Action First:
        if ($(this).html() == "Unload"){unload_current_session(false);return;}
        
        // CHECK:
        if (!resuming_search_flag)
        {
            //Check, if we have an active search-session:
            if(localStorage["search_helper_session_loaded"])
            {
                // Ask if continue or what?
                var new_session_ask = confirm("There's an active session loaded! Terminate current and proceed to load new?");
                if(new_session_ask)
                {
                    unload_current_session(true);
                    return;
                }
                else
                {return false;}
            }
        }
        
        if ($("#dbx_saved_searches").val() != "empty")
        {
            // check if selecetd item is in LocalStorage:
            if (localStorage[$("#dbx_saved_searches").val()+"_color"] != undefined) 
            {
                if (localStorage[$("#dbx_saved_searches").val()+"_color"] !== "") 
                {
                    if(localStorage[$("#dbx_saved_searches").val()+"_color"].indexOf(",") !== -1)
                    {
                        current_session_items_color = localStorage[$("#dbx_saved_searches").val()+"_color"].split(",");
                    }
                    else
                    {current_session_items_color[0] = localStorage[$("#dbx_saved_searches").val()+"_color"];}
                }
                else
                {current_session_items_color = new Array();}
            }            
            else
            {
                alert('No records found for this search term. A new one will be created.');
                // Create a record:
                localStorage[$("#dbx_saved_searches").val()+"_color"] = "";
                current_session_items_color = new Array();
            }
            // Set current session key:
            current_session_search_key_color = $("#dbx_saved_searches").val()+"_color";
            
            // SET session IS Loaded:
            localStorage["search_helper_session_loaded"] = current_session_search_key_color;
            
            // Change button text to 'unload':
            $(this).text("Unload");
        }
        else
        {
            alert('The are no saved searches! Create a "New Search" first.');
            return;
        }
        
        // Set it active session term:
        localStorage["search_helper_active"] = $("#dbx_saved_searches option:selected").text();
        
        // Update table UI:
        // Create code injection: 
        var colorLabel_cell_code = "<td height='30' valign='middle' class='Ver11C helper_color_column'>"+
                    "<span id='**replace_this**' class='colorLegend_cell' style='display:inline-block;width:10px;marging-right:5px;"+
                    "background:#F3AD1A;height:15px'></span>"+
                    "</td>";
        var commentNote_cell_code = "<span class='helper_note_column'><br>note</span>";
        //
        var url_getItem_name = "";
        switch(page_location)
        {
            case "UDMiscListingID.asp": // Articulos / Merchandise.
                // Set vars:
                url_getItem_name = "MiscIdNumber=";
                // Add class to table:
                (($('body table tbody tr[bgcolor="#ffffff"] td[class="Ver11C"]').parent()).parent()).parent().addClass("enhanced_table_poweredBy_search_helper");
                //                
                var item_href_link = "";
                var item_number = "";
                var current_row = "";
                var cell_id = "";
                $(".enhanced_table_poweredBy_search_helper tr").first().append("<td class='helper_color_column' width='25px'>[*]</td>");
                $(".enhanced_table_poweredBy_search_helper").css("border-collapse","collapse");
                $(".enhanced_table_poweredBy_search_helper tr:gt(0)").each(function(index){
                    // Avoid last row:
                    if($(this).attr("bgcolor") == "#fffFCC"){return false;}
                    
                    // enhance the row's appearence:
                    $(this).css("border","gray solid thin");
                    
                    // Add comment/node section:
                    $(this).children("td:nth-child(3)").append(commentNote_cell_code);
                    
                    // Get item number:
                    item_href_link = $(this).children("td:nth-child(3)").children("font").children("a").attr("href");
                    item_number = item_href_link.substring(item_href_link.indexOf("MiscIdNumber=")+13,item_href_link.length)
                        
                    // Check if item:color is in saved-data:
                    if(current_session_items_color.length > 0)
                    {
                        // Add new cell for color-label:
                        $(this).append(colorLabel_cell_code.replace("**replace_this**",item_number));
                        if(current_session_items_color.length == 1)
                        {
                            if(current_session_items_color[0].indexOf(item_number)!== -1)
                            {
                                //Found!
                                // Add saved color:
                                $("#"+item_number).css("background",current_session_items_color[0].substring(
                                    current_session_items_color[0].indexOf(":")+1,current_session_items_color[0].length));                                
                            }
                        }
                        else
                        {
                            // search for a match:
                            $.each(current_session_items_color,function(index,value){                                
                                //check:
                                if(value.indexOf(item_number)!== -1)
                                {
                                    //Found!                                    
                                    // Add saved color:
                                    cell_id = "#"+item_number;
                                    $("#"+item_number).css("background",value.substring(value.indexOf(":")+1,value.length));
                                    return false;
                                }
                            });
                        }
                    }
                    else
                    {
                        // Add new cell for color-label:
                        $(this).append(colorLabel_cell_code.replace("**replace_this**",item_number));
                    }
                });
                break;
            case "UDJobsListing.asp":
                //
                url_getItem_name = "JobId=";
                //
                (($('body table tbody tr[bgcolor="#ffffff"] td[class="Ver10C"]').parent()).parent()).parent().addClass("enhanced_table_poweredBy_search_helper");
                //              
                var item_href_link = "";
                var item_number = "";
                var current_row = "";
                var cell_id = "";
                $(".enhanced_table_poweredBy_search_helper tr[bgcolor='#fffFCC']").eq(1).append("<td class='helper_color_column' width='25px'>[*]</td>");
                $(".enhanced_table_poweredBy_search_helper").css("border-collapse","collapse");
                $(".enhanced_table_poweredBy_search_helper tr:gt(0)").each(function(index){
                    // Select only the specific rows:
                    if($(this).attr("bgcolor") == "#ffffff" || $(this).attr("bgcolor") == "#eFeFeF"){
                        //
                        // enhance the row's appearence:
                        $(this).css("border","gray solid thin");
                        
                        // Add comment/node section:
                        $(this).children("td:nth-child(3)").append(commentNote_cell_code);
                        
                        // Get item number:
                        //item_href_link = $(this).children("td:nth-child(3)").children("a").attr("href"); // v 0.6.1
                        item_href_link = $(this).children("td:nth-child(3)").children("font").children("a").attr("href"); // v 0.6.2
                        item_number = item_href_link.substring(item_href_link.indexOf("JobId=")+6,item_href_link.length)
                            
                        // Check if item:color is in saved-data:
                        if(current_session_items_color.length > 0)
                        {
                            // Add new cell for color-label:
                            $(this).append(colorLabel_cell_code.replace("**replace_this**",item_number));
                            if(current_session_items_color.length == 1)
                            {
                                if(current_session_items_color[0].indexOf(item_number)!== -1)
                                {
                                    //Found!
                                    // Add saved color:
                                    $("#"+item_number).css("background",current_session_items_color[0].substring(
                                        current_session_items_color[0].indexOf(":")+1,current_session_items_color[0].length));                                
                                }
                            }
                            else
                            {
                                // search for a match:
                                $.each(current_session_items_color,function(index,value){
                                    
                                    //check:
                                    if(value.indexOf(item_number)!== -1)
                                    {
                                        //Found!                                    
                                        // Add saved color:
                                        cell_id = "#"+item_number;
                                        $("#"+item_number).css("background",value.substring(value.indexOf(":")+1,value.length));
                                        return false;
                                    }
                                });
                            }
                        }
                        else
                        {
                            // Add new cell for color-label:
                            $(this).append(colorLabel_cell_code.replace("**replace_this**",item_number));
                        }
                        //
                    }
                    else
                    {
                        // Add empty cell:
                        $(this).append("<td class='helper_color_column' width='25px'> </td>");
                    }
                });
                break;
            default:
                // Debugging:
                alert('Unable to determine the listing category!');
                break;            
        }
    });
    
    function unload_current_session(option) {
        //
        current_session_search_term = "";
        current_session_search_key_color = "";
        current_session_items_color = new Array();
        current_session_items_comment = new Array();
        clicked_item_number = "";
        //
        localStorage.removeItem("search_helper_session_loaded");
        localStorage["search_helper_active"] = "true";
        //
        $('.helper_color_column').remove();
        $('.helper_note_column').remove();
        
        // Change button text to 'unload':
        $("#load_saved_search").text("Load");
        
        // Check 'option'
        if(option)
        {
            // Load 'NEW'
            $("#load_saved_search").click();
        }
    }
    
    function detect_search_term () {
        //
        var url_search_term = "";
        var message = "Can not determine search term :in func() 'detect_seaarch_term()'";
        switch(page_location){
            case "UDMiscListingID.asp":
                // Articulos
                url_search_term = document.URL.substring(document.URL.indexOf("&keyword=")+9,document.URL.indexOf("&Desc=")).replace("+"," ");
                message = "The words used for this search are different than the loaded session's words!";
                break;
            case "UDJobsListing.asp":
                //
                url_search_term = document.URL.substring(document.URL.indexOf("Pueblo=")+7,document.URL.indexOf("&txkey")).replace("+"," ");
                message = "This page job's listing is for a different town than the loaded session's town name!";
                break;
            default:
                alert('Attempting to work on an unsupported section!');
                return false;
                break;
                //
        }
        
        // Are we on active session?
        if (localStorage["search_helper_session_loaded"])
        {
            //
            if (localStorage["search_helper_active"])
            {
                //
                if(url_search_term != localStorage["search_helper_active"])
                {
                	//
                    alert(message);
                }
            }
        }
    };
        
        
    // **************************
    
    // Check if search helper table enhancements is enabled
    if (localStorage["search_helper_active"] != "")
    {
        // Check the checkbox:
        $('#chb_activate_helper').prop('checked', true);
        
        //Click.
        $("#chb_activate_helper").trigger('click');
        $('#chb_activate_helper').prop('checked', true); // re-checkit !!!
                       
        // Check if there is an active session LOADED:
        if (localStorage["search_helper_session_loaded"])
        {
            var session_loaded = localStorage["search_helper_session_loaded"].replace("_color","");
            var terms_saved = localStorage["saved_search_terms"].split(",");
            var this_search_term = "";
            $.each(terms_saved,function(index,value){
                // search:
                if(value.indexOf(session_loaded) != -1 )
                {this_search_term = value.substring(0,value.indexOf(session_loaded)-1);}
            });
            // Set term:
            localStorage["search_helper_active"] = this_search_term;
            
            // set it:
            current_session_search_term = localStorage["search_helper_active"];
            
            // set it selected:
            $('#dbx_saved_searches').val(localStorage["search_helper_active"]);
            
            // Check if search terms is the same:
            detect_search_term();
            
            // set flag:
            resuming_search_flag = true;
            
            // Select it:
        	$('#dbx_saved_searches').val(
                localStorage["search_helper_session_loaded"].substring(
                    0,localStorage["search_helper_session_loaded"].length - 6));
            
            // Load:
        	$("#load_saved_search").click();
        }
    }
});
