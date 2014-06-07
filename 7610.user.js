// ==UserScript==
// @name           RN Forums Quotes
// @author         Corsix
// @description    Adds quote buttons to RN forums posts
// @include        http://forums.relicnews.com/showthread.php*
// ==/UserScript==

window.addEventListener("load", init, false);


function init()
{
	var posts = findTag(document, "div", "posts");
	for (var o,i=0; o=posts.childNodes[i]; ++i) {
		if(o.tagName == "DIV") addQuoteBtn(o);
	}
}

function findTag(c, n, d)
{
  for (var o,i=0; o=c.getElementsByTagName(n)[i]; ++i) {
    if (o.id == d) {
      return o;
    }
  }
  return null;
}

function findTagClass(c, n, s)
{
  for (var o,i=0; o=c.getElementsByTagName(n)[i]; ++i) {
    if (o.className == s) {
      return o;
    }
  }
  return null;
}


function addQuoteBtn(o)
{
	var post_t = findTagClass(o, "table", "tborder");
	
	var a_tag_n = 0;
	var post_id = 0;
	
	while(1)
	{
		var a_tag = post_t.rows[0].cells[1].getElementsByTagName("a")[a_tag_n];
		var i_of = a_tag.href.indexOf("#post");
		if(i_of == -1)
		{
			a_tag_n += 1;
		}
		else
		{
			post_id = a_tag.href.substr(i_of + 5);
			break;
		}
	}
	
	var insert_loc = post_t.rows[2].cells[1];
	var insert_html = "";
	
	insert_html += "<a href=\"newreply.php?do=newreply&p=" + post_id + "\"><img border=\"0\" src=\"images/buttons/quote.gif\"/></a>";
	
	insert_loc.innerHTML += insert_html;
}