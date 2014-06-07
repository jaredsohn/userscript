// ==UserScript==
// @name           	Comment Quicktags for WordPress.com
// @namespace      	torstenlandsiedel.de
// @description    	Adds comment quicktag buttons on every WordPress.com blog
// @include        	http*
// @grant       	none
// @version 		0.2.4
// @updateURL       https://userscripts.org/scripts/source/112557.meta.js
// @downloadURL     https://userscripts.org/scripts/source/112557.user.js
// ==/UserScript==

/*
  Author: Torsten Landsiedel
  Weblog: http://torstenlandsiedel.de - http://netztaucher.wordpress.com/
  Thanks: Mindset615 (http://userscripts.org/users/mindset) for this code http://userscripts.org/scripts/show/84591
*/


// Check if it is a WordPress.com-Blog
var is_wpcom = "";
var metas = document.getElementsByTagName("meta");
for (var i = 0; i < metas.length ; i++)  { 
	var wpcom = document.getElementsByTagName("meta")[i];
	if (wpcom.name=="generator") { is_wpcom=wpcom.content }; 
}


// If it is a WordPress.com-Blog and has a comment area then start the changes
if (is_wpcom=="WordPress.com" && document.getElementById('comment') ) { // start of if-then-block 

// Check width from Textarea
var comment_width = document.getElementById('comment-form-comment').offsetWidth;

/* CSS for Quicktags */

var newcss = "#quicktags input[type='button'] { \n\
border-width:1px;border-style:solid; \n\
   -moz-border-radius:4px; \n\
 -khtml-border-radius:4px; \n\
-webkit-border-radius:4px; \n\
        border-radius:4px;} \n\
\n\
#quicktags { border-bottom: 1px solid #eef0f1; padding:0; margin-bottom:0; text-align: left; } \n\
#quicktags { background-color:rgba(0, 0, 0, 0.08); border-top: 1px solid rgba(0, 0, 0, 0.07); } \n\
\n\
#quicktags #ed_em_gm     { font-style:italic; } \n\
#quicktags #ed_strong_gm { font-weight:bold; } \n\
#quicktags #ed_link_gm   { color:#00f; text-decoration:underline; } \n\
#quicktags #ed_strike_gm { text-decoration:line-through; } \n\
\n\
#ed_toolbar input        { color: #000 !important; border-color:#C3C3C3 !important; background: #eee !important; width:auto; font-family: Arial,Helvetica,Tahoma,Verdana,sans-serif !important; font-weight: normal !important; text-transform: none !important; } \n\
#ed_toolbar input:hover  { color: #000 !important; border-color:#aaa !important; background:#ddd !important;} \n\
#ed_toolbar input 		 { margin:3px 1px 4px; line-height:18px; display:inline-block; min-width:26px; padding:2px 4px; font-size:12px;} \n\
#quicktags #ed_toolbar   { padding:2px 4px 0; background: none repeat scroll 0 0 rgba(255, 255, 255, 0.7); } \n\
\n\
#quicktags { display: block; margin-left: auto; margin-right: auto; max-width: " + comment_width + "px; width: 100%; } \n\
";


// Check if it is a dark or light theme
var BodyKlassen=document.getElementsByTagName("body")[0].getAttribute("class");
darktheme = BodyKlassen.search(/dark/); 


if (darktheme != -1) { 
	
	var newcss = "#quicktags input[type='button'] { \n\
border-width:1px;border-style:solid; \n\
   -moz-border-radius:4px; \n\
 -khtml-border-radius:4px; \n\
-webkit-border-radius:4px; \n\
        border-radius:4px;} \n\
\n\
#quicktags { border-bottom: 1px solid #111; padding:0; margin-bottom:0; text-align: left; } \n\
#quicktags { background: none repeat scroll 0 0 rgba(0, 0, 0, 0.8); border-top: 1px solid rgba(255, 255, 255, 0.3); } \n\
\n\
#quicktags #ed_em_gm      { font-style:italic; } \n\
#quicktags #ed_strong_gm  { font-weight:bold; } \n\
#quicktags #ed_link_gm    { text-decoration:underline; } \n\
#quicktags #ed_strike_gm  { text-decoration:line-through; } \n\
\n\
#ed_toolbar input         { background-color: rgba(255, 255, 255, 0.55) !important; border:#666 !important; width:auto; font-family: Arial,Helvetica,Tahoma,Verdana,sans-serif !important; font-weight: normal !important; text-transform: none !important; } \n\
#ed_toolbar input:hover   { color: #000 !important; border-color:#aaa !important; background:#ccc !important;} \n\
#ed_toolbar input         { margin:3px 1px 4px; line-height:18px; display:inline-block; min-width:26px; padding:2px 4px; font-size:12px;} \n\
#quicktags #ed_toolbar    { padding:2px 4px 0; background: none repeat scroll 0 0 rgba(255, 255, 255, 0.2); } \n\
\n\
#quicktags { display: block; margin-left: auto; margin-right: auto; max-width: " + comment_width + "px; width: 100%; } \n\
";
		
	} // End dark theme


/* css function */
function addGlobalStyle(css) //add the new CSS function
{
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) { return; }
	style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}

// Add CSS to global site
addGlobalStyle(newcss);

// Find Textarea on Topic-Page
var textbox = document.getElementById("comment");


// insert html tags functions 
function format(tag) // insert format tags
{
	if (typeof textbox.selectionStart != "undefined")
	{
		var before, after, selection;
		before = textbox.value.substring(0, textbox.selectionStart);
		str = textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
		after = textbox.value.substring(textbox.selectionEnd, textbox.value.length);
		//textbox.value = String.concat(before, "<" + tag + ">", str, "</" + tag + ">", after);
		textbox.value = before + "<" + tag + ">" + str + "</" + tag + ">" + after; // concat didn't work in chrome

	}
	textbox.focus();
}

function format_with_title(tag) // insert format tag with title
{
	var title = prompt("Enter the title attribut","");
	if (title != null)
	{
		if (typeof textbox.selectionStart != "undefined")
		{
			var before, after, selection;
			before = textbox.value.substring(0, textbox.selectionStart);
			str = textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
			after = textbox.value.substring(textbox.selectionEnd, textbox.value.length);
			// var newstr = "<a href=\"" + link + "\">" + title + "</a>";
			// textbox.value = String.concat(before, newstr, after);
			// textbox.value = before + newstr + after; // concat didn't work in chrome
			textbox.value = before + "<" + tag + " title=\""+ title + "\">" + str + "</" + tag + ">" + after; // concat didn't work in chrome
		}
	}
	textbox.focus();
}

function insert_link() // insert a link
{
	var link = prompt("Enter your URL","http://");
	var title;
	if (link != null)
	{
		if (typeof textbox.selectionStart != "undefined")
		{
			var before, after, selection;
			before = textbox.value.substring(0, textbox.selectionStart);
			str = textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
			after = textbox.value.substring(textbox.selectionEnd, textbox.value.length);
			if (!str) // no text selected
			{
				title = prompt("Enter the webpage title","Webpage Title");
			}
			else
			{
				title = prompt("Enter the webpage title",str);
			}
			var newstr = "<a href=\"" + link + "\">" + title + "</a>";
			// textbox.value = String.concat(before, newstr, after);
			textbox.value = before + newstr + after; // concat didn't work in chrome
		}
	}
	textbox.focus();
}



// Add Quicktags function
function addQuicktagsButtons() {
	
	//create quicktags div
	var qts = document.createElement('div');
	qts.id = 'quicktags';
		
	//insert quicktags div
	var contentBox = document.getElementById('commentform'); 
	contentBox.parentNode.insertBefore(qts, contentBox);
		
	//create ed_toolbar div
	butts = document.createElement('div');
	butts.id = 'ed_toolbar';
		
	//insert ed_toolbar div
	qts.appendChild(butts);

	
	//create button bold - comment ready!
	var butt1 = document.createElement('input');
	butt1.id = 'ed_strong_gm';
	butt1.className = 'ed_button';
	butt1.setAttribute('accesskey', 'b');
	butt1.setAttribute('type', 'button');
	butt1.setAttribute('value', 'b');
	butt1.addEventListener('click', function(){format('strong')}, false);

	//create button em - comment ready!
	var butt2 = document.createElement('input');
	butt2.id = 'ed_em_gm';
	butt2.className = 'ed_button';
	butt2.setAttribute('accesskey', 'i');
	butt2.setAttribute('type', 'button');
	butt2.setAttribute('value', 'i');
	butt2.addEventListener('click', function(){format('em')}, false);

	//create button link - comment ready!
	var butt3 = document.createElement('input');
	butt3.id = 'ed_link_gm';
	butt3.className = 'ed_button';
	butt3.setAttribute('accesskey', 'a');
	butt3.setAttribute('type', 'button');
	butt3.setAttribute('value', 'link');
	butt3.addEventListener('click', insert_link, false);

	//create button block - comment ready!
	var butt4 = document.createElement('input');
	butt4.id = 'ed_block_gm';
	butt4.className = 'ed_button';
	butt4.setAttribute('accesskey', 'q');
	butt4.setAttribute('type', 'button');
	butt4.setAttribute('value', 'b-quote');
	butt4.addEventListener('click', function(){format('blockquote')}, false);

	//create button strike - new! (or better <del datetime=""> ?)
	var butt5 = document.createElement('input');
	butt5.id = 'ed_strike_gm';
	butt5.className = 'ed_button';
	butt5.setAttribute('accesskey', 's'); 
	butt5.setAttribute('type', 'button');
	butt5.setAttribute('value', 'strike');
	butt5.addEventListener('click', function(){format('strike')}, false);

	//create button pre - new! 
	var butt6 = document.createElement('input');
	butt6.id = 'ed_pre_gm';
	butt6.className = 'ed_button';
	butt6.setAttribute('accesskey', 'p'); 
	butt6.setAttribute('type', 'button');
	butt6.setAttribute('value', 'pre');
	butt6.addEventListener('click', function(){format('pre')}, false);

	//create button abbr (or acronym?) - new!
	var butt7 = document.createElement('input');
	butt7.id = 'ed_abbr_gm';
	butt7.className = 'ed_button';
	// butt7.setAttribute('accesskey', 'l');
	butt7.setAttribute('type', 'button');
	butt7.setAttribute('value', 'abbr');
	butt7.addEventListener('click', function(){format_with_title('abbr')}, false);

	//create button code - comment ready!
	var butt8 = document.createElement('input');
	butt8.id = 'ed_code_gm';
	butt8.className = 'ed_button';
	butt8.setAttribute('accesskey', 'c');
	butt8.setAttribute('type', 'button');
	butt8.setAttribute('value', 'code');
	butt8.addEventListener('click', function(){format('code')}, false);

	// insert buttons
	butts.appendChild(butt1);
	butts.appendChild(butt2);
	butts.appendChild(butt3);
	butts.appendChild(butt4);
	butts.appendChild(butt5);
	butts.appendChild(butt6);
	butts.appendChild(butt7);
	butts.appendChild(butt8);
}

//Add Quicktags buttons to topic page
addQuicktagsButtons();


} // end of if-then-block 