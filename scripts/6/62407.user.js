// ==UserScript==
// @name        Cleangadget
// @description Cleans up Engadget's new style
// @include     http://www.engadget.com/
// @include     http://*.engadget.*
// @author      James
// @version		0.2
// ==/UserScript==


var init = function(){
	//First up, font and color fixes
	var css = ".post_body, .filed_under a { font-family: calibri, arial, helvetica, sans-serif }";
	css += ".post_body { font-size: 12pt; line-height: normal }";
	css += ".filed_under a { font-size: 11pt }";
	css += ".level3, #comments .comment_entry.child.level3 { background-color: #F0FFF0 }";
	css += ".level4, #comments .comment_entry.child.level4 { background-color: #E9FFE9 }";
	css += "#comments .comment_data .comment_date { font-family: calibri, arial, helvetica, sans-serif; font-style: normal }";
	css += "#comments .comment_data .comment_text, .comment_text p { font-size: 10pt; line-height: normal }";
	css += "#comments .comment_data .comment_text { padding-top: 2pt }";
	css += ".post_title, .post_title a { font-size: 23pt; line-height: 23pt; letter-spacing: -0.03em }";
	css += ".post_title a:hover { background: #F0F0F0; color: black }";
	css += "body { background-color: #F9F9F9 }";
	css += "#comments .comment_actions .comment_reply a span { text-indent: 0; font-family: calibri, arial, helvetica, sans_serif; text-align:center; font-weight: bold }";
	css += "div.comment_actions { border: 1px solid #303030; -moz-border-radius-bottomleft: 5px; -moz-border-radius-bottomright: 5px; -webkit-border-bottom-left-radius: 5px; -webkit-border-bottom-right-radius: 5px; background-color: #F9F9F9 }";
	css += "#comments .comment_actions .comment_reply a { background-image: none; color: #303030 }";
	css += "#comments .comment_actions .comment_reply { margin: 0 }";
	css += "#comments .comment_actions .comment_reply a:hover { background-color: #303030; color: #F9F9F9 }";
	css += "#addCommentButton { padding: 2px ; height: auto !important; width: auto; background: none ; background-color: #303030; border: 1px solid #303030; text-align: center; font-weight: bold; color: #F9F9F9; -moz-border-radius: 5px; -webkit-border-radius: 5px }";
	css += "#addCommentButton:hover { background-position: 0 0 ; color: #303030 ; background-color: #F9F9F9 }";
	css += "#cmtbuttons { padding-bottom: 2px }";
	
	//Now hidden sections
	//css += ".col2_featured_contributors { display: none }";
	//css += ".col2_game_changer { display: none }";
	//css += ".col2_quoted { display: none }";
	//css += ".col2_stats { display: none }";
	//css += ".col2 { display: none } "; //Uncomment this to hide the entire sidebar
	
	//Hiding these two huge sections puts the newest stories right up top
	css += ".topstories { display: none }";
	css += ".my-little-hero { display: none } .tipus_tab { top: 90px }";
	

	var heads = document.getElementsByTagName("head");
	if (heads.length > 0)
	{
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
};

init();
