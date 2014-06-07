// ==UserScript==
// @name        CP SectionJump
// @namespace   http://www.nanonation.net/
// @description Section Jumper for CP
// @include     https://tools.nanonation.net/web/*
// @include     https://stage-tools.nanonation.net/web/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


GM_addStyle((<><![CDATA[
.SG{
	width:30px;
	height:30px;
	position:absolute;
	z-index: 99999;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAeCAYAAADZ7LXbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0U0REIyQzdFNEY0MTFFMTk2RjVDRTIwQTkxOEUwNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0U0REIyQzhFNEY0MTFFMTk2RjVDRTIwQTkxOEUwNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RTREQjJDNUU0RjQxMUUxOTZGNUNFMjBBOTE4RTA2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RTREQjJDNkU0RjQxMUUxOTZGNUNFMjBBOTE4RTA2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt6bJ5QAAAD4SURBVHjaYvz//z8DrQETAx3AqCWjloxaMmoJlQELHjlVID4ExNxEmhUExHtI8gkjI+OP/Pz8p8SYPmvWrJdA9Z9wKgAV9dgwFLitX7/+AZD/CRe+fPnycz4+vmy8ZhGwhEFMTKzu7t27L7FZ8Pnz5/eGhoaLYMFOtiVAwGltbb3ux48fH9AtyczMPAWUlyQYKkRYAgLy5eXl55EtWLRo0V2guCNRQU+kJSDgs3XrVnD8XL9+/QUwHgqJjl8SLGGQlpZuvXXr1ksLC4sV2JI/VSwB5RkuLq75QFqWlJTKiMtAYLrHl4H/4LIEq1mjTaJRS4a2JQABBgAAd4q0Av/H+QAAAABJRU5ErkJggg==);
	background-color:transparent;
	background-position: 2px 0;
	top: 20px;
	left: 215px;
}
.SG ul, .SG li { margin: 0; padding: 0; list-style: none;}
.SGL {visibility:hidden; width:150px;position:absolute; top:30px; left: -10px;}
.SG:hover .SGL {visibility: visible;}
.SGL {
	border-radius:5px;
	border: 1px solid #505050;
	box-shadow: 0 1px 3px rgba(0,0,0,.65) ;
}
.SGL li {
	float: none;
}
.SGL a {
	text-decoration: none;
	display:block;
	font-weight: 500;
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	color:#242424;
	border-top: 1px solid #a3a8aa; 
        background: -moz-linear-gradient(top, rgb(230,234,235) 0%, rgb(209,213,214) 100%);
	background: -webkit-linear-gradient(top,  rgb(230,234,235) 0%,rgb(209,213,214) 100%);
}
.SGL li:first-child a{border-radius: 6px 6px 0 0 ;border-top:none}
.SGL li:last-child a{border-radius: 0 0 6px 6px;}
.SGL a:hover {
	background: -moz-linear-gradient(top, rgb(222,239,255) 0%,rgb(152,190,222) 100%);
	background: -webkit-linear-gradient(top, rgb(222,239,255) 0%,rgb(152,190,222) 100%);
}
.SGL a:hover:active {
	background: rgb(154,188,224);
}
table.content_header td.section h1{margin-left:30px;}

]]></>).toString());

(function() {

	$('body').prepend('<div class="SG"><ul class="SGL"><li><a href="/web/ds21/MediaLibrary.aspx">Digital Signage</a></li><li><a href="/web/DynamicTemplates/Templates.aspx">Dynamic Templates</a></li><li><a href="/web/Administration/Terminals.aspx">Manage Company</a></li><li><a href="/web/ConsoleTermList.aspx">Monitor Terminals</a></li><li><a href="/web/Administration/UsersAndRoles/UserList.aspx">Manage Users</a></li></ul></div>');
	
})();