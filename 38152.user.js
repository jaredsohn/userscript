// ==UserScript==
// @name           Reply button
// @namespace      repbutt@kwierso.com
// @include        http://*.roosterteeth.com/*forum/viewTopic.php?id=*
// @include        http://*.roosterteeth.com/*entry.php?id=*
// @include        http://*.roosterteeth.com/*image.php?id=*
// @include        http://*.roosterteeth.com/*viewEntry.php?id=*
// @include        http://*.roosterteeth.com/*viewItem.php?id=*
// @include        http://*.roosterteeth.com/*episode.php?id=*
// ==/UserScript==

(function()
{
    var replyspan, replylink;
    var quotespan, quotelink;
    var openbracket,closebracket;
    var qopenbracket,qclosebracket;
    var image, number, name;
    var divs;
    
    //get all posts on the page
    var comments = getElementsByClass("comment");
    var altcomments = getElementsByClass("comment altComment");
    var allposts = comments.concat(altcomments);
    
    for(i = 0; i < allposts.length; i++)
    {   
        
        number = allposts[i].childNodes[2].name.replace("t", "");
        name = allposts[i].childNodes[4].getElementsByTagName("span")[0].getElementsByTagName("b")[0];
        
        openbracket = document.createTextNode("[ ");
        closebracket = document.createTextNode(" ] ");
        qopenbracket = document.createTextNode(" [ ");
        qclosebracket = document.createTextNode(" ]");
        
        //create the reply button
        replyspan = document.createElement("span");
        replylink = document.createElement("a");
        replylink.id = "replybutton"+number + " " + name.innerHTML;
        replylink.addEventListener("click", replytext, true);
        replylink.className= "small";
        replylink.innerHTML = "<b>Reply</b>";
        
        replyspan.appendChild(openbracket);
        replyspan.appendChild(replylink);
        replyspan.appendChild(closebracket);
        
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
        
        //forum threads
        if(document.URL.match("http://" + document.domain + "/forum/viewTopic.php"))
        {
            divs = allposts[i].getElementsByTagName("div")[0];
            divs.replaceChild(replylink, divs.getElementsByTagName("select")[0].nextSibling.nextSibling);
            insertAfter(quotespan, allposts[i].getElementsByTagName("select")[0]);
        }
        //everything else
        else
        {
            insertAfter(replyspan, allposts[i].getElementsByTagName("select")[0]);
            insertAfter(quotespan, allposts[i].getElementsByTagName("select")[0]);
        }
    }
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

function insertAfter(newElm,elm){
  var clone = elm.cloneNode(true);
  elm.parentNode.insertBefore(clone,elm);
  elm.parentNode.replaceChild(newElm,elm);
}

function replytext()
{
    var holder = this.id;
    holder = holder.replace("replybutton", "");
    
    var number = holder.split(" ")[0];
    var name = holder.split(" ")[1];
    
    var element = document.getElementById("Post");
    if(!element)
        element = document.getElementById("Add a Comment");
    var text = element.getElementsByTagName("textarea");
    
    text[0].focus();
    text[0].value += "[i]In reply to " +name+", #" + number +":[/i]\n\n";
}

function quotetext()
{
    var holder = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var post = holder.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML;
    
    var element = document.getElementById("Post");
    if(!element)
        element = document.getElementById("Add a Comment");
    var text = element.getElementsByTagName("textarea");
    text[0].focus();
    text[0].value += "[quote]" + HTMLtoBB(post) + "[/quote]\n\n";
}

function HTMLtoBB(aText)
{
  aText = aText.replace(/<a href=".*?"><i>#([0-9]+)<\/i><\/a>/g,'#$1');

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