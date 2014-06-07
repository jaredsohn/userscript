// ==UserScript==
// @name		ExplainXkcd.com on xkcd.com
// @namespace	explainxkcd
// @description	Greasemonkey script that embeds explainxkcd.com for the comic you are viewing on xkcd.com, if the explanation is avaiable.
// @include		http://xkcd.com/*
// @include		https://xkcd.com/*
// @version		1
// ==/UserScript==

window.addEventListener("load", onload(), true);

function explain()
{
	var explanation_element_exists = document.getElementById("explanation");
	if(explanation_element_exists == null)
	{
		var name_of_comic_strip = document.getElementById("ctitle").innerHTML;
		var div_container = document.getElementById("middleContainer");
		var diva = document.createElement("div");
		
		diva.setAttribute("id",	   "explanation");
		diva.setAttribute("class", "box");
		diva.setAttribute("style", "width: 80%; position:relative; left: 78px;");

		div_container.appendChild(diva);

		var return_string = "Loading...";
		diva.innerHTML = return_string + "<br/>";
		
		GM_xmlhttpRequest({
						method: "GET",
						url: "http://www.explainxkcd.com/archives/",
						onload: function(responseDetails) 
						{
							if(responseDetails.status == 200)
							{
								var archive_text = responseDetails.responseText;								
								var archive_regex = new RegExp(".*<a href='(.*)' title='(" + name_of_comic_strip + ")'.*</a>.*", "i");
								var archive_regex_result = archive_text.match(archive_regex);
								
								if(archive_regex_result != null)
								{
									var archive_regex_result_link = archive_regex_result[1]
									
									GM_xmlhttpRequest({
										method: "GET",
										url: archive_regex_result_link,
										onload: function(responseDetails_expl) 
										{
											if(responseDetails_expl.status == 200)
											{
												var expl_text = responseDetails_expl.responseText;
												var expl_regex = new RegExp("<p>Image text:(.*)<div id=\"tweetbutton.*\"", "i");
												
												var expl_regex_no_newline = new RegExp("(\r\n|\n|\r)", "gm");
												var expl_text_no_newline = expl_text.replace(expl_regex_no_newline, "");
												
												var expl_regex_result = expl_text_no_newline.match(expl_regex);
												
												
												if(expl_regex_result != null)
												{
													var expl_result = expl_regex_result[1];
													return_string = expl_result + "<br/><br/> (Source: <a href=\"http://www.explainxkcd.com/archives/\">explainxkcd.com</a>)";
													diva.innerHTML = return_string;
												}
												else
												{
													return_string = "Could not retrieve the explanation. You can try going to the site manually: <a href=\""+archive_regex_result_link+"\">"+archive_regex_result_link+"></a>";
													diva.innerHTML = return_string + "<br/>";
												}
											}
											else
											{
												return_string = "Connection to explainxkcd.com didn't return HTTP 200. Aborted.";
												diva.innerHTML = return_string + "<br/>";
											}
										}
									});
								}
								else
								{
									return_string = "Sorry, but no explanation for this strip was found on explainxkcd.com";
									diva.innerHTML = return_string + "<br/>";
								}
							}
							else
							{
								return_string = "Connection to explainxkcd.com didn't return HTTP 200. Aborted.";
								diva.innerHTML = return_string + "<br/>";
							}
						}
					});
	}
	else
	{
		window.location.href = "#explanation";
	}
}


function onload()
{
	
	var menu1 = document.getElementsByTagName("ul")[1];
	var menu2 = document.getElementsByTagName("ul")[2];
	
	var button1 = document.createElement("li");	
	var button2 = document.createElement("li");
	
	button1.innerHTML = "<li><a href=\"#explanation\">Explain</a></li>";
	button2.innerHTML = "<li><a href=\"#explanation\">Explain</a></li>";
	
	button1.addEventListener("click", explain, true);
	button2.addEventListener("click", explain, true);
	
	menu1.appendChild(button1);
	menu2.appendChild(button2);
}

