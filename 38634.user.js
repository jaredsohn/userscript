// ==UserScript==

// @name           Journal Quotes

// @namespace      jq@kwierso.com

// @description    Adds a quote button to journals

// @include        http://*.roosterteeth.com/members/journal/entry.php?id=*
// @include        http://roosterteeth.com/members/journal/entry.php?id=*

// ==/UserScript==



(function() {

var postFooter = getElementsByClass("postFooter")[0];

var selectnode = postFooter.childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[3];

var quotespan, quotelink;

var qopenbracket,qclosebracket;



qopenbracket = document.createTextNode(" [ ");

qclosebracket = document.createTextNode(" ]");



//create the quote button

        quotespan = document.createElement("span");

        quotelink = document.createElement("a");

        quotelink.id = "";

        quotelink.addEventListener("click", quotetext, true);

        quotelink.className= "small";

        quotelink.innerHTML = "<b>Quote</b>";

        

        quotespan.appendChild(qopenbracket);

        quotespan.appendChild(quotelink);

        quotespan.appendChild(qclosebracket);



insertAfter(quotespan, selectnode);

})();



function getElementsByClass(theClass)

{

    var allkeywordtags = new Array();

	//Create Array of All HTML Tags

	var allHTMLTags=document.getElementsByTagName("*");



	//Loop through all tags using a for loop

	for (i=0; i<allHTMLTags.length; i++) 

	{

		//Get all tags with the specified class name.

		if (allHTMLTags[i].className==theClass) 

		{

            allkeywordtags.push(allHTMLTags[i]);

		}

	}

    return allkeywordtags;

}



function quotetext()

{

    var jrnltxt = "";

    var holder = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    

    //var post = holder.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML;

    var post = holder.firstChild.childNodes[1];

    //for(i=4;i<post.childNodes.length;i++)

    jrnltxt = post.innerHTML;

    jrnltxt = jrnltxt.replace(post.childNodes[0].innerHTML, "");

    jrnltxt = jrnltxt.replace(post.childNodes[1].innerHTML, "");

    jrnltxt = jrnltxt.replace(post.childNodes[2].innerHTML, "");

    jrnltxt = jrnltxt.replace(post.childNodes[3].innerHTML, "");

    jrnltxt = jrnltxt.replace("<table cellpadding=\"0\" cellspacing=\"0\"></table>", "");

    jrnltxt = jrnltxt.replace("<h2></h2>", "");



    var element = document.getElementById("Post");

    if(!element)

        element = document.getElementById("Add a Comment");

    var text = element.getElementsByTagName("textarea");

    text[0].focus();

    text[0].value += "[quote]" + HTMLtoBB(jrnltxt) + "[/quote]\n\n";

}



function insertAfter(newElm,elm){

  var clone = elm.cloneNode(true);

  elm.parentNode.insertBefore(clone,elm);

  elm.parentNode.replaceChild(newElm,elm);

}



function HTMLtoBB(aText)

{

  aText = aText.replace(/<a href=".*?"><i>#([0-9]+)<\/i><\/a>/g,'#$1');



  aText = aText.replace(/\[\/(b|i|u|s|quote)\]/g,'[/[/i]$1]');

  aText = aText.replace(/\[(b|i|u|s|quote)\]/g,'[[/i]$1]');



  aText = aText.replace(/<(b|i|u)>/g,'[$1]');

  aText = aText.replace(/<\/(b|i|u)>/g,'[/$1]');

  aText = aText.replace(/<del>/g,'[s]');

  aText = aText.replace(/<\/del>/g,'[/s]');

  aText = aText.replace(/<a href="([^" \t\n<>]+)" target="_blank">/g,'[link=$1]');

  aText = aText.replace(/<a href="(\/[^" \t\n<>]+)">/g,'[link=$1]');

  aText = aText.replace(/<\/a>/g,'[/link]');

  aText = aText.replace(/<\/pre>/g,'[/code]'); 

  aText = aText.replace(/<pre>/g,'[code]');

  

  aText = aText.replace(/<img .*?src="\/(.*?)".*?>/g,'[img]http://www.roosterteeth.com/$1[/img]');

  aText = aText.replace(/<img.*? src="(.*?)".*?>/g,'[img]$1[/img]');

  aText = aText.replace(/<br><br><span class="small"(.*?)>(.*?)<\/span>/g,'');

  aText = aText.replace(/<blockquote(.*?)>(.*?)<\/blockquote>/g,'');

  aText = aText.replace(/\t/g,'');

  aText = aText.replace(/\n/g,'');

  aText = aText.replace(/<br>/g,'\n');



  aText = aText.replace(/<span style="color: (.*?);">/g,'[color=$1]');

  aText = aText.replace(/<\/span>/g,'[/color]');



  // HTML entities

  aText = aText.replace(/&amp;/g,'&');

  aText = aText.replace(/&lt;/g,'<');

  aText = aText.replace(/&gt;/g,'>');



  return aText;

}