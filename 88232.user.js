// ==UserScript==
// @name PivotalTrackerAddon
// @namespace http://muantech.com/PivotalTrackerAddon
// @description PivotalTracker: Show all the stories assigned to the current user in the Dashboard
// @include http://www.pivotaltracker.com/dashboard
// @include https://www.pivotaltracker.com/dashboard
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var TOKEN;
var owner;
var bloked_label_prefix = "blk-";

var templateProject = "";
templateProject = templateProject + "<div id='my_work_project'><a class='my_work_project_title' href='/projects/VAR_ID'>VAR_NAME</a>";
templateProject = templateProject + "<span class='my_work_date'>[VAR_START_DATE - VAR_END_DATE]</span>"
templateProject = templateProject + "</div>";


var templateStory = "";
templateStory = templateStory + '<div class="my_work_item">';
//templateStory = templateStory + '      <div style="background-color: rgb(172, 205, 218);" class="bar">&nbsp;</div>';
templateStory = templateStory + '      <div class="metadata">';
//templateStory = templateStory + '        <div class="topline">';
//templateStory = templateStory + '          <span class="activity_occurred_at">about 14 hours ago</span>';
//templateStory = templateStory + '          <img src="/images/v3/icons/stories_view/chore_icon.png" alt="chore">';
//templateStory = templateStory + '        </div>';

 templateStory = templateStory + '       <div class="project_name">';
//templateStory = templateStory + '          <a href="https://www.pivotaltracker.com/projects/129300">Internal</a>';
templateStory = templateStory + '        </div>';
 templateStory = templateStory + '     </div>';

templateStory = templateStory + '     <div class="activity_feed_description">';
 templateStory = templateStory + '       <div class="my_work_story_name VAR_CLASS_BLOCKED">';
  templateStory = templateStory + '          <img class="my_work_icon" src="/images/v3/icons/stories_view/VAR_IMAGE" alt="chore">';
    templateStory = templateStory + '        VAR_ESTIMATION_IMAGE';
  templateStory = templateStory + '         <a title="VAR_NAME" href="VAR_URL">VAR_NAME</a>';
 templateStory = templateStory + '          <span class="my_work_status">VAR_STATUS</span>';
 templateStory = templateStory + '          VAR_SPAN_LABELS';
  templateStory = templateStory + '       </div>';
 templateStory = templateStory + '     </div>';
 templateStory = templateStory + '   </div>';


 
var insertStories = function() {
	insertLink();
	retrieveOwner();
	retrieveTokenAndStories();
}

var retrieveOwner = function() {
	var welcome_message = $(".welcome_message").text();
	owner = welcome_message.substring(welcome_message.indexOf(",")+1,welcome_message.length).trim();

};

var retrieveStories = function() {
	var projects = new Array(); 

	$.ajax({
	  url: "https://www.pivotaltracker.com/services/v3/projects",
	  beforeSend: addTokenHeader,
	  success: function(result){
		$(result).find("project").each(function() {
			
			var id = $(this).children("id").text();
			var name = $(this).children("name").text();
			
			
			var project = {};
			project["id"] = id;
			project["name"] = name;
			
			projects.push(project);
		});
		
		
		
		retrieveStoriesFromProjects(projects);
		
		
	  }
	});
	
}


var retrieveStoriesFromProjects = function(projects) {

	var html = "";
	html = html+ "<style>"; 
	html = html+ ".dashboard_page #my_work_project {margin-top: 20px;}";
	html = html+ ".dashboard_page #my_work_items {margin-left: 25px;}";
	html = html+ ".dashboard_page .my_work_item:first-child {background: none repeat scroll 0 0 transparent; padding-top: 7px; padding-bottom: 7px;}";
	html = html+ ".dashboard_page .my_work_item {background: url('/images/v3/backgrounds/dotted_horizontal_border.png') repeat-x scroll left top transparent; padding-top: 7px; padding-bottom: 7px;}";
	html = html+ ".dashboard_page .my_work_project_title {font-weight: bold; margin-top: 2px; font-size: 16px}";
	html = html+ ".dashboard_page .my_work_story_name {font-weight: bold; margin-top: 2px; font-size: 12px;}";
	html = html+ ".dashboard_page .gray_background {background-color: #E8E8E8;}";
	html = html+ ".dashboard_page .my_work_date {margin-left: 8px; font-weight: bold; margin-top: 2px; font-size: 12px; vertical-align: 10%;}";
	html = html+ ".dashboard_page .my_work_icon {margin-right: 5px; vertical-align: middle;}";
	html = html+ ".dashboard_page .my_work_estimateIcon {margin-right: 5px; vertical-align: middle;}";
	html = html+ ".dashboard_page .my_work_status {margin-left: 5px;  font-size: 10px;}";
	html = html+ ".dashboard_page .my_work_labels {margin-left: 5px;  font-size: 10px; color: #BBBBBB; font-size: 0.9em;font-style: italic;}";
	html = html+ "</style>";
	
	var number_projects = projects.length;

	$(projects).each( function() {
		
		var projectId = this["id"];
		var projectName = this["name"].toUpperCase();
		
		var url = "https://www.pivotaltracker.com/services/v3/projects/"+projectId+"/iterations/current";
	
		$.ajax({
			url: url,
			beforeSend: addTokenHeader,
			success: function(result){
			
				var startDate = $(result).find("iteration > start").text();
				var endDate = $(result).find("iteration > finish").text();
				
				startDate = startDate.substring(8,10)+"/"+startDate.substring(5,7);
				endDate = endDate.substring(8,10)+"/"+endDate.substring(5,7);
			
				var projectHtml = "";

				$(result).find("story").each(function() {

					var storyName = $(this).find('name').text();
					var url = $(this).find('url:first').text();
					var type = $(this).find('story_type').text();
					var status = $(this).find('current_state').text().toUpperCase();
					var estimate = $(this).find('estimate').text();
					var labels = $(this).find('labels').text();
					var owned_by = $(this).find('owned_by').text();
					
					if(owner && owner == owned_by) {
					
						var image = "feature_icon.png";
						if(type == "chore") image = "chore_icon.png";
						if(type == "bug") image = "bug_icon.png";
						
						var estimateImage;
						if(estimate) {
							if(estimate == "-1") estimateImage = '<img width="6" src="/images/v3/icons/stories_view/estimate_unestimated_linear.gif" class="my_work_estimateIcon">';
							if(estimate != "-1") estimateImage = '<img width="6" src="/images/v3/icons/stories_view/estimate_'+estimate+'pt_linear.gif" class="my_work_estimateIcon">';
						} else {
							estimateImage = "<span style='padding-left: 6px;'/>&nbsp;</span>";
						}
						
						var spanLabels = "";
						
						var blocked = false;
						if(labels) {
							var array_labels = labels.split(",");
							jQuery.each(array_labels, function(index, value) {
								if(bloked_label_prefix.toLowerCase() == value.substring(0, bloked_label_prefix.length).toLowerCase()) {
									blocked = true;
								}
							});

							spanLabels = '<span class="my_work_labels">'+labels+'</span>';
						}
						
						var class_blocked_label = "";
						if(blocked) class_blocked_label = "gray_background";
						
						if(status == "ACCEPTED") storyName = storyName.strike();
						
						var storyHtml = templateStory.replace(/VAR_NAME/g,storyName);
						storyHtml = storyHtml.replace(/VAR_CLASS_BLOCKED/g,class_blocked_label);
						storyHtml = storyHtml.replace(/VAR_URL/g,url);
						storyHtml = storyHtml.replace(/VAR_IMAGE/g,image);
						storyHtml = storyHtml.replace(/VAR_ESTIMATION_IMAGE/g,estimateImage);
						storyHtml = storyHtml.replace(/VAR_STATUS/g,status);
						storyHtml = storyHtml.replace(/VAR_SPAN_LABELS/g,spanLabels);
						
						if(type == "-1") $(storyHtml).find(".my_work_story_name a").css("padding-left: 12px;");
						
						projectHtml = projectHtml+storyHtml;		
					}
				});
				
				if(projectHtml != "") {
					var projectHtmlPrefix = templateProject.replace(/VAR_ID/g,projectId);
					projectHtmlPrefix = projectHtmlPrefix.replace(/VAR_NAME/g,projectName);
					projectHtmlPrefix = projectHtmlPrefix.replace(/VAR_START_DATE/g,startDate);
					projectHtmlPrefix = projectHtmlPrefix.replace(/VAR_END_DATE/g,endDate);
					
					projectHtmlPrefix = projectHtmlPrefix+"<div id='my_work_items'>";
					
					projectHtml = projectHtmlPrefix + projectHtml+"</div>";
					
					html = html + projectHtml;
				}

				number_projects = number_projects -1;
				checkAndInsert(number_projects,html);
			}
		});

	});
		

}

var startsWith = function(value, prefix) {
	return (prefix.toLowerCase() == value.substring(0, prefix.length).toLowerCase()); 
};

var checkAndInsert = function(number_projects,html) {
	
	if(number_projects == 0) {
		$("#my_work_content").html(html);
	}

}
 
var addTokenHeader = function(xhr) {
	xhr.setRequestHeader("X-TrackerToken", TOKEN);
};

var insertLink = function() {
	
	$("#activity_feed").toggle();
	$("#activity_feed").removeClass("content_section");
	$("#activity_feed").before("<div id='my_work' class='right_column'> <div style='position: relative;'> <h2>My Work </h2> <div id='my_work_content' class='activity_feed_items'></div></div></div>");
	$("#my_work_content").append("<img src='/images/v3/spinner_adding.gif' class='spinner' alt='Spinner_adding'>");
	
	$(".logo_and_projects_area").append("<div id='my_work_selector' style='margin-left:3em; margin-top:5px'><a href='#'>Show Activity Feed</a></div>");
	
	$("#my_work_selector a").toggle(function() {
		$("#activity_feed").toggle();
		$("#my_work").toggle();
		$("#my_work_selector a").html("Show My Work");
	}, function() {
		$("#activity_feed").toggle();
		$("#my_work").toggle();
		$("#my_work_selector a").html("Show Activity Feed");
	});
	
}

var retrieveTokenAndStories = function() {

	// retrieve TOKEN
	$.ajax({
	  url: "https://www.pivotaltracker.com/profile",
	  success: function(result){
	    var tokenElement = $(result).find(".text_column");
		if(tokenElement.length > 0) {
			TOKEN = tokenElement.html();
			retrieveStories();
		} else {
			$("#my_work_content").html("<span>Please generate a API Token in 'My Profile'</span>");
		}

	  }
	});

}

$(document).ready(function(){

	// HACK For some reason the script keeps being fire in other no-dashboard pages :(
	var current = $(".nav_links .current").text();
	if("Dashboard" != current) return;

	insertStories();
});
