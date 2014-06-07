// ==UserScript==
// @name           Hoptoad Textmate Backtrace
// @namespace      hoptoad
// @description    Add textmate links to application stacktrace lines on error pages
// @include        https://*.hoptoadapp.com/errors/*
// ==/UserScript==

//update the path below to match the common parent directory of all your applications
project_parent_directory ='/Users/USERNAME/Sites/';

//update the mapping below, the left side is the name of the project in Hoptoad, the right side is the directory name of that project on your local filesystem
project_directories = {
  'Hoptoad Project1 Name': 'local_project1_name',
  'Hoptoad Project2 Name': 'local_project2_name'
};

stacktrace_elements=document.getElementById('backtrace').getElementsByTagName('p');
project_link = document.getElementById("main_sidebar").getElementsByClassName("main_top_content")[0].getElementsByTagName("h4")[0].getElementsByTagName("a")[0];
hoptoad_project_name = project_link.innerHTML;
project_directory = project_directories[hoptoad_project_name]
if (!project_directory) {
  //just take ann the non-alphanumeric chars out of the lowercase hoptoad name
  project_directory = hoptoad_project_name.toLowerCase().replace(/[^a-z]/,"")
}
for (i=0; i < stacktrace_elements.length; i++){
  elem = stacktrace_elements[i];
  //a stacktrace line that is part of the local project doesn't being with a / or a [ and is followed by alphanumerics, slashes, dots and underscores 
  //this helps ignore things like gem/vendor traces that look like: 
  //haml (2.1.0) [v] lib/haml/helpers/action_view_mods.rb:142:in `call' 
  // OR
  //passenger (2.2.2) lib/phusion_passenger/rack/request_handler.rb:81:in `process_request'
  m=elem.innerHTML.match(/^([^\[\/][a-zA-Z0-9\/\._]+):(\d+)/);
  if (m) {
    textmate_href = "txmt://open?url=file://" + project_parent_directory + project_directory + "/" + m[1] + "&amp;line=" + m[2];
    elem.innerHTML = elem.innerHTML.replace(m[0],"<a href='" + textmate_href + "'>" + m[0] + "</a>");
  }
};
