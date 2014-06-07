// ==UserScript==
// @name        Download Coursera Videos
// @namespace   http://userscripts.org/users/alvaromaceda
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include     https://class.coursera.org/*/lecture/index
// @include     https://class.coursera.org/*/lecture/*
// @include     https://class.coursera.org/qcomp-2012-001/lecture/index
// @version     1.0
// ==/UserScript==

//Based on the work of cnh (https://gist.github.com/2262382)

//FOR TESTING PURPOSES
function abort(){
   throw new Error('Aborting');
}

//----------------------------------------------------------------------
// main function
// Generate the download commands
//----------------------------------------------------------------------
function main(){
	/* HTML structure 
		//Lectures container
		<div class="item_list"> 

			//Header link
			<a class="list_header_link expanded">
				<h3 class="list_header">			
			
			//List of lecture's videos
			<ul class="item_section_list">
				//Lecture video
				<li class="item_row viewed">
					<a class="lecture-link">
					//Lecture resources
					<div class="item_resource">
						//Slides, subtitles in text format, subtitles in srt format and video 
						<a title="Slides" rel="twipsy">
						<a title="Subtitles (text)" rel="twipsy">
						<a title="Subtitles (srt)" rel="twipsy">
						<a title="Video (MP4)" rel="twipsy">
					</div>
	
			//Header link (again)
			<a class="list_header_link expanded">
			...
	*/
	
	//Here, we have JQuery avaliable (it has had time to load)
	
	var totalCMD = '#!/bin/sh'+'\r\n'+'\r\n'; //Generated download string commands
	
	//Generate a download command from the link data
	function generateDownloadLink(filename, directory, cookieHeader, downloadLink, subtitlesLink){
	
		var cmd = 'echo "' + filename + '" && ';
		cmd += 'mkdir -p "' + directory + '" && ';
		cmd += 'curl -L -C - ' + cookieHeader + "'" + downloadLink + "'" + ' -o "' + filename + '.mp4' + '"';
		if(subtitlesLink){
			cmd += ' && ';
			cmd += 'curl -L -C - ' + cookieHeader + "'" + subtitlesLink + "'" + ' -o "' + filename + '.srt' + '"';
			}
		cmd += ';';
		return cmd;
	}
	
	//For each lecture...
	$("h3.list_header").each(	
		function(sectionIndex){
			var sectionName = $(this).text().replace(/Chapter .+ - /,"").replace(/\:/,'-').replace(/^(V|I|X)+\. /,'');
			
			//$(this).parent() = The href containing the lecture title (<a class="list_header_link expanded">) (see HTML structure above)
			//$(this).parent().next() = List containing the videos (<ul class="item_section_list">)
			//$(this).parent().next().find("a.lecture-link") = The link from each video of the lecture (<a class="lecture-link">)			
			//For each lecture's video...
			$(this).parent().next().find("a.lecture-link").each(
				function(videoIndex){
					
					//Get video data
					var $lectureLink = $(this);
					var videoName = $.trim($lectureLink.text());
					var downloadLink = $.trim($lectureLink.attr('href').replace('view','download.mp4'));
					var cookieHeader = ' --header \"Cookie:'+ document.cookie + '\" ';			
					var directory = (sectionIndex+1) + '. ' + sectionName + '/';
					var filename = directory + (videoIndex+1) + '. ' + videoName;
					
					//Generate video download command
					var cmd = generateDownloadLink(filename, directory, cookieHeader, downloadLink, subtitlesLink);					
					
					//Get subtitle data
					var $subtitle = $lectureLink.parent().find("a[href*='format=srt']");
					var subtitlesLink = $subtitle.attr('href');
					
					//Generate subtitles download commnad
					var cmd = generateDownloadLink(filename, directory, cookieHeader, downloadLink, subtitlesLink);
					
					//Add the generated download command to the list
					totalCMD += cmd + '\r\n';
					
				}
			); //End of videos loop
		}
	); //End of lectures loop
	
	//Show the result in a new window
	GM_openInTab("data:text/plain;charset=utf-8," + encodeURIComponent(totalCMD));
}

//----------------------------------------------------------------------
// This is the code executed when the page loads.
// Its purpose is to insert a button which calls the download routine
//----------------------------------------------------------------------
(function(){

	//We'll insert a button at the top for video downloading
	var li      = document.createElement('li');

	li.setAttribute( 'class', 'coursera_top_item' );
	li.setAttribute( 'id', 'coursera-dl-container' );

	//Create download button
	var button = document.createElement('input')
	button.type = 'button';
	button.name = 'getcourselist';
	button.id = 'getcourselist';
	button.height = 20;
	button.width = 50;
	button.value = "Get course list";
	//Add event listener
	button.addEventListener('click', function() {
		main();
		}, false);

	//Add button to the list element
	li.appendChild(button);
	
	//Add list element to the upper menu. 
	//(JQuery has been included )
	$('#coursera_topbar').prepend(li);
	
})();
