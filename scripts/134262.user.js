// If you are reading this, you have not installed GreaseMonkey into your web browser
// This addon requires the installation of GreaseMonkey to function. Alternatively, you can simply use Chrome.
// GreaseMonkey can be installed from here: (https://addons.mozilla.org/firefox/downloads/latest/748/addon-748-latest.xpi?src=addondetail)

// ==UserScript==
// @name                Marmoset Plus
// @description	        Improve the Marmoset user experience
// @version				1.3.2
// @include		https://marmoset.student.cs.uwaterloo.ca/*
// ==/UserScript==
//

// Inject JQuery into our script in order to do magical things
// such as parse XHTML DOM from ajax web queries in all browsers!
function addJQuery(callback) 
{
	var script = document.createElement("script");
	// It's important to use the https link and not the http link for obtaining jquery
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
// Inject our JQuery
addJQuery(main);

function main()
{
	// Loading image spinner
	var loadimg = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
	// Simply changes the header
	function changeHeader()
	{
		$(".header").html("<p>Marmoset+</p>");
	}
	// Simply changes the fonts
	function changeFonts()
	{
		$("*").css("font-family", "helvetica");
	}
	// Modifies the index page to show us additional courses
	function manipulateIndexPage()
	{
		var isMainPage = window.location.href.match(/index\.jsp.*?/);
		if(!isMainPage)
			return; // We're not on the main page.

		// find courselist
		$("ul").after("<h1>Additional Courses</h1>")
			$("h1:last").after("<ul></ul>");

		// Iterate and go find courses!
		for(var i = 0; i < 31; i++)
		{
			var visitURL = '/view/course.jsp?coursePK=' + i;
			fetchPageAndUpdate($("ul:last"), visitURL, addCourse);
		}
	}

	function addCourse(listElem, responseText, url)
	{
		var coursehead = $(responseText).filter("h1").html();
		if(!coursehead)
			return;
		if(coursehead.length <= 19)
			return; // There isn't actually anything here.
		// strip tags from coursehead
		coursehead = coursehead.replace(/(<([^>]+)>)/ig,"");
		var item = '<li><a href="' + url + '">' + coursehead+ '</a></li>';

		listElem.append(item);

	}
	// Contributed by Vikstrous Valarous
	function refreshProjectPage()
	{
		var isProjectPage = window.location.href.match(/project\.jsp.*?/);
		if(!isProjectPage)
			return;
		var testing = $("td:contains('tested yet')");
		if(testing.length > 0)
		{
			testing.each(function() {
				var html = '<td colspan="4"><img src="' + loadimg + '"></td>';
				$(this).replaceWith(html);
			});
			setTimeout(function(){
				window.location.reload();
			},5000);
		}
	}
	function manipulateProjectPage()
	{

		// If this is the main course page, insert a last submission column
		var isCoursePage = window.location.href.match(/course\.jsp.*?/);
		if(!isCoursePage)
			return; // This is not the main project page.

		var submissionsColumn = $("tr > th:eq(1)");
		submissionsColumn.after("<th>Last submission</th>");


		// This expression grabs every rows third entry
		var rowSnap = $("tr > td:nth-child(2)");
		rowSnap.after("<td>Loading...</td>");

		$("tr").each(
				function(index, row)
				{
					if(index == 0) // Top row, we don't want to be here
			return;	
		link = $(this).find('a:eq(1)').attr("href"); // /view/project.jsp?projectPK=396

		fetchPageAndUpdate($(this), link, modifySub);
				}
				);
		// Contributed by Vikstrous Valarous
		// Replace the submit buttons!
		var $submits = $("a:contains('submit')");
		$submits.each(function(){
			var projectPK = $(this).attr('href').match('projectPK=([0-9]+)')[1];
			var html = '<form enctype="multipart/form-data" action="/action/SubmitProjectViaWeb" method="POST">'+
			'<input type="hidden" name="projectPK" value="' + projectPK + '" style="font-family: helvetica; ">'+
			'<input type="hidden" name="submitClientTool" value="web" style="font-family: helvetica; ">'+
			'<input type="file" name="file" size="20" style="font-family: helvetica; ">'+
			'<input type="submit" value="Submit project!" style="font-family: helvetica; ">'+
			'</form>';
		$(this).replaceWith(html);
		});
	}

	// This function takes an element to write the last submission info into
	// and the url of the question to go look at
	// This is for wrapping ajax calls
	function fetchPageAndUpdate(updateElem, pageurl, receiver)
	{
		$.ajax({
			url: pageurl,
		cache: false
		}).done(function( html ) {
			receiver(updateElem, html, pageurl);
		});
	}

	function modifySub(lastSub, responsetext, url)
	{
		var entry = lastSub.find("td:eq(2)"); // Loading...

		// if the table in has five columns, (five ths), then it only has public test scores in it.
		// if it has seven, then it also has release tests.
		//

		var columns = $(responsetext).find("th").length;
		var AllSlashes = $(responsetext).find("tr:eq(1) > td:contains('/')");
		
		entry.html("");
		var num = 0;
		var denom = 0;

		AllSlashes.each( function(index) {
					 var matches = $(this).html().match(/(\d+)\s\/\s(\d+)/);
					 num += +matches[1];
					 denom += +matches[2];
					 entry.html(num + " / " + denom);
		});
	}

	changeHeader();
	changeFonts();
	manipulateProjectPage();
	manipulateIndexPage();
	refreshProjectPage();
}

