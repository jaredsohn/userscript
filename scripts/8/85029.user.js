// ==UserScript==
// @name Six Spoke Media
// @author Hamm
// @namespace http://userscripts.org/users/85029
// @homepage http://www.sixspokemedia.com
// @copyright 2010 sixspokemedia
// @version 0.0.0.111
// @browser FF3
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @include https://www.manymoon.com/users/*
// @include https://www.sixspokemedia.manymoon.com/users/*
// @include http://service.sixspokemedia.com/*
// @description Using userscripts, establishment of the projects and output Excel manymoon
// ==/UserScript==

var iFrame;

function Projects () {
	this.ProjectName = new Array();
	this.Tasks       = new Array();
	this.DueDate     = new Array();
	this.AssignTo    = new Array();
}

Projects.prototype.setProjectName = function(projectname) {
	this.ProjectName.push(projectname);
}

Projects.prototype.setTasks = function(tasks) {
	this.Tasks.push(tasks);
}

Projects.prototype.setDueDate = function(duedate) {
	this.DueDate.push(duedate);
}

Projects.prototype.setAssignTo = function(assignto) {
	this.AssignTo.push(assignto);
}

Projects.prototype.getProjectName = function(index) {
	return this.ProjectName[index];
}

Projects.prototype.getTasks = function(index) {
	return this.Tasks[index];
}

Projects.prototype.getDueDate = function(index) {
	return this.DueDate[index];
}

Projects.prototype.getAssignTo = function(index) {
	return this.AssignTo[index];
}

Projects.prototype.addSlashes = function(str) {
	// return (str + '').replace(/[\\"',]/g, '\\$&').replace(/\u0000/g, '\\0');
	return (str + '').replace(/[\\"',]/g, '\\$&');
					 // .replace(/\u0000/g, '\\0')
					 // .replace(/\&/ig, " AND ");
					 // .replace(/\#/ig, "&#35;");
	// return str + "(^)";
}

jQuery(document).ready(function(){

	iFrame = document.createElement("form");
	iFrame.id = "iServiceReceive";
	iFrame.setAttribute("action", "http://services.sixspokemedia.com/receive/submit");
	iFrame.setAttribute("method", "post");
	
	var t1 = document.createElement("textarea");
	var t2 = document.createElement("textarea");
	var t3 = document.createElement("textarea");
	var t4 = document.createElement("textarea");
	
	t1.id = "a1";
	t2.id = "a2";
	t3.id = "a3";
	t4.id = "a4";
					
	t1.name = "ProjectName";
	t2.name = "Tasks";
	t3.name = "DueDate";
	t4.name = "AssignTo";
	
	t1.style.display = 'none';
	t2.style.display = 'none';
	t3.style.display = 'none';
	t4.style.display = 'none';
	
	iFrame.appendChild(t1);
	iFrame.appendChild(t2);
	iFrame.appendChild(t3);
	iFrame.appendChild(t4);
	
	// jQuery(iFrame).css({"display" : "none"});
	jQuery("body").append(iFrame);

	jQuery("#leftActionMenu").prepend("<li id=\"toExcel\" class=\"  haMenu\">Export Tasks to Excel</li>");

	jQuery("#toExcel").click(function(){

		if (confirm("This will only work for Tasks. Do you want to proceed?")) {

			MyProjects = new Projects();

			jQuery(".myTaskQueue").children("li").each(function(index, value){
				jQuery(this).children("div").each(function(index, value){
					if (jQuery(this).attr("class") == "tgRow") {						
						MyProjects.setProjectName(
							// jQuery(this).children("a").text().replace(/\,/ig, "<<<<<<")
							MyProjects.addSlashes(jQuery(this).children().text().replace(/\,/ig, "<<<<<<"))
						);
					}

					if (jQuery(this).attr("class") == "displayTask mm_fl") {
						if (jQuery(this).children("div").attr("class") == "mmOverdue" || jQuery(this).children("div").attr("class") == "") {
							jQuery(this).children("div").each(function(){
								jQuery(this).children("span").each(function(){
									if (jQuery(this).attr("class") == "taskName mm_fl") {										
										jQuery(this).children().children().children().children().each(function(){
											if (jQuery(this).attr("class") == "twdd" || jQuery(this).attr("class") == "") {
												MyProjects.setTasks(
													MyProjects.addSlashes(
														jQuery(this).children().text().replace(/\,/ig, "<<<<<<")
														// jQuery(this).children().text()
													)
												);
											}										
										});
									}

									if (jQuery(this).attr("class") == "taskDate mm_fr") {
										jQuery(this).children("span").each(function(){
											if (jQuery(this).attr("class") == "mmImgLink") {
												MyProjects.setDueDate(jQuery(this).text());
											}
										});
									}
								});
							});

							jQuery(this).children("ul").children("li").each(function(){								
								if (jQuery(this).children("label").text() == "Creator:" || jQuery(this).children("label").text() == "Assigned to:") {									
									var members = jQuery(this).children("a").text().split(",");
									for (var i = 0; i < members.length; i++) {
										if (i > 0) {
											MyProjects.setProjectName(MyProjects.getProjectName(MyProjects.ProjectName.length - 1));
											MyProjects.setTasks(MyProjects.getTasks(MyProjects.Tasks.length - 1));
											MyProjects.setDueDate(MyProjects.getDueDate(MyProjects.DueDate.length - 1));
										}										
										MyProjects.setAssignTo(members[i]);										
									}									
								}
							});
																					
						}											
					}
				});
			});

			// jQuery(iFrame).contents().find("#ProjectName").val(MyProjects.ProjectName);
			// jQuery(iFrame).contents().find("#Tasks").val(MyProjects.Tasks);
			// jQuery(iFrame).contents().find("#DueDate").val(MyProjects.DueDate);
			// jQuery(iFrame).contents().find("#AssignTo").val(MyProjects.AssignTo);
			// jQuery(iFrame).contents().find("#ServiceReceive").submit();
			
			jQuery("#a1").val(MyProjects.ProjectName);
			jQuery("#a2").val(MyProjects.Tasks);
			jQuery("#a3").val(MyProjects.DueDate);
			jQuery("#a4").val(MyProjects.AssignTo);
	
			jQuery(iFrame).submit();

			// var POSTDATA = "";
			// POSTDATA += "a=1";
			// POSTDATA += "&ProjectName=" + MyProjects.ProjectName;
			// POSTDATA += "&Tasks="       + MyProjects.Tasks;
			// POSTDATA += "&DueDate="     + MyProjects.DueDate;
			// POSTDATA += "&AssignTo="    + MyProjects.AssignTo;

			// jQuery.ajax({
			// 	url: "http://services.sixspokemedia.com/index.php",
			// 	global: false,
			// 	type: "POST",
			// 	contentType: "UTF-8",
			// 	dataType: "text",
			// 	async: false,
			// 	cache: false,			
			// 	data: POSTDATA,
			// 	success: function (data) {
			// 	},
			// 	complete: function() {
			// 							
			// 		var currDate = new Date();
			// 		var month = currDate.getMonth() + 1;
			// 		var days = currDate.getDate();
			// 		var fileName = "";
			// 		if (month < 10) {
			// 			month = "0" + month;
			// 		}
			// 		if (days < 10) {			
			// 			days = "0" + days;
			// 		}
			// 		fileName = "Six Spoke task list " + currDate.getFullYear() + "" + month + "" + days + ".xlsx";
			// 		window.open('http://services.sixspokemedia.com/' + fileName);
			// 	},
			// 	error: function() {
			// 	}
			// });
		}	
	});

});