// ==UserScript==
// @name           Quicktags for WP-Supportforums
// @namespace      forums.wordpress.com
// @description    Adds quicktag buttons on the supportforums from wordpress.com
// @include        http://*.forums.wordpress.com/topic/*
// @include        http://*.forums.wordpress.com/edit.php?*
// @include        http://*.forums.wordpress.com/forum/*
// @include        http://*.forums.wordpress.com/?new=1
// ==/UserScript==

/*
  Author: Torsten Landsiedel
  Weblog: http://netztaucher.wordpress.com/
 Version: 0.1.1
    Todo: - Clean up Code / CSS
          - Extend functions like on post article page
  Thanks: Mindset615 (http://userscripts.org/users/mindset) for this code http://userscripts.org/scripts/show/84591
*/


/* CSS for Quicktags */

var newcss = "textarea,input[type='button'] {border-width:1px;border-style:solid;-moz-border-radius:4px;-khtml-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;} \n\
\n\
#topic-page #quicktags { margin-left:238px;  } \n\
\n\
#post_content,#quicktags{border-style:solid;border-width:1px;border-collapse:separate;-moz-border-radius:6px 6px 0 0;-webkit-border-top-right-radius:6px;-webkit-border-top-left-radius:6px;-khtml-border-top-right-radius:6px;-khtml-border-top-left-radius:6px;border-top-right-radius:6px;border-top-left-radius:6px;} \n\
\n\
#quicktags{padding:0;margin-bottom:-3px;border-bottom-width:3px;background-image:url('http://s0.wp.com/wp-admin/images/ed-bg.gif');background-position:left top;background-repeat:repeat-x;} \n\
\n\
#quicktags #ed_em_gm {font-style:italic;} \n\
#quicktags #ed_strong_gm {font-weight:bold;} \n\
#quicktags #ed_link_gm{color:#00f; text-decoration:underline;} \n\
\n\
#ed_toolbar input,#ed_reply_toolbar input{background:#fff url('http://s0.wp.com/wp-admin/images/fade-butt.png') repeat-x 0 -2px;} \n\
#ed_toolbar input{border-color:#C3C3C3;} \n\
#ed_toolbar input:hover{border-color:#aaa;background:#ddd;} \n\
#ed_toolbar input,#ed_reply_toolbar input{margin:3px 1px 4px;line-height:18px;display:inline-block;min-width:26px;padding:2px 4px;font-size:12px;} \n\
#quicktags #ed_toolbar{padding:2px 4px 0;} \n\
#quicktags {border-color:#dfdfdf;background-color:#dfdfdf;} \n\
#post_content{padding:6px;line-height:140% !important;outline:none;resize:vertical;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-khtml-box-sizing:border-box;box-sizing:border-box;} \n\
#post_content{margin:0;width:100%;color:#222;} \n\
#post_content{border-color:#dfdfdf;} \n\
div #quicktags {margin-right:20px;} \n\
";

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
var textbox = document.getElementById("post_content");


/* insert html tags functions */
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



/* Add Quicktags function */
function addQuicktagsButtons() {
	
	//create quicktags div
	var qts = document.createElement('div');
	qts.id = 'quicktags';
		
	//insert quicktags div
	var contentBox = document.getElementById('post_content').parentNode;
	contentBox.parentNode.insertBefore(qts, contentBox);
		
	//create ed_toolbar div
	butts = document.createElement('div');
	butts.id = 'ed_toolbar';
		
	//insert ed_toolbar div
	qts.appendChild(butts);

	
	//create button bold		
	var butt1 = document.createElement('input');
	butt1.id = 'ed_strong_gm';
	butt1.className = 'ed_button';
	butt1.setAttribute('accesskey', 'b');
	butt1.setAttribute('type', 'button');
	butt1.setAttribute('value', 'b');
	butt1.addEventListener('click', function(){format('strong')}, false);

	//create button em		
	var butt2 = document.createElement('input');
	butt2.id = 'ed_em_gm';
	butt2.className = 'ed_button';
	butt2.setAttribute('accesskey', 'i');
	butt2.setAttribute('type', 'button');
	butt2.setAttribute('value', 'i');
	butt2.addEventListener('click', function(){format('em')}, false);

	//create button link		
	var butt3 = document.createElement('input');
	butt3.id = 'ed_link_gm';
	butt3.className = 'ed_button';
	butt3.setAttribute('accesskey', 'a');
	butt3.setAttribute('type', 'button');
	butt3.setAttribute('value', 'link');
	butt3.addEventListener('click', insert_link, false);

	//create button block		
	var butt4 = document.createElement('input');
	butt4.id = 'ed_block_gm';
	butt4.className = 'ed_button';
	butt4.setAttribute('accesskey', 'q');
	butt4.setAttribute('type', 'button');
	butt4.setAttribute('value', 'b-quote');
	butt4.addEventListener('click', function(){format('blockquote')}, false);

	//create button ul		
	var butt5 = document.createElement('input');
	butt5.id = 'ed_ul_gm';
	butt5.className = 'ed_button';
	butt5.setAttribute('accesskey', 'u');
	butt5.setAttribute('type', 'button');
	butt5.setAttribute('value', 'ul');
	butt5.addEventListener('click', function(){format('ul')}, false);

	//create button ol		
	var butt6 = document.createElement('input');
	butt6.id = 'ed_ol_gm';
	butt6.className = 'ed_button';
	butt6.setAttribute('accesskey', 'o');
	butt6.setAttribute('type', 'button');
	butt6.setAttribute('value', 'ol');
	butt6.addEventListener('click', function(){format('ol')}, false);

	//create button li		
	var butt7 = document.createElement('input');
	butt7.id = 'ed_li_gm';
	butt7.className = 'ed_button';
	butt7.setAttribute('accesskey', 'l');
	butt7.setAttribute('type', 'button');
	butt7.setAttribute('value', 'li');
	butt7.addEventListener('click', function(){format('li')}, false);

	//create button code		
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