// ==UserScript==
// @name           GUTEditor
// @namespace      http://talk.guardian.co.uk
// @description    Friendly editor for GUT
// @include        http://talk.guardian.co.uk/*
// ==/UserScript==

// Things you might want to tweak
var replyInBold = true;
var replyColour = "#003366";

var wordstring = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_<>.,!?";

String.prototype.trim=function(){
    return this.replace(/^(\n|\s)*|(\n|\s)*$/g,'');
}


function replyToPost(link)
{
    return (function (event)
    {
        try
        {
            var rsp = content.document.getElementsByName("newresponse")[0];

            if (rsp) 
            {
                // Get the post number.  They're one out.
                var p = link.href.lastIndexOf("/");
                var post = parseInt(link.href.substring(p+1));

                // Get the date
                var header = link.parentNode.innerHTML;
                p = header.indexOf("\n");
                p = header.indexOf("\n", p+1);
                var date = header.substring(4, p);

                // Get the poster
                var poster = "";
                var links = content.document.evaluate(
                                          "//a",
                                          content.document,
                                          null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                          null);

                for (var i = 0; i < links.snapshotLength; i++)
                {
                   thisLink = links.snapshotItem(i);

                   var p = thisLink.href.lastIndexOf("/");
                   var thisPost = parseInt(thisLink.href.substring(p+1));

                   if ((post == thisPost) && (thisLink.innerHTML.indexOf("<nobr>Help</nobr>") == -1))
                   {
                       poster = thisLink.innerHTML.replace(/<.*>/g, "").trim();
                       break;
                   }
                }

                var intro = "In #" + (post+1) + ", \nb " + poster + "\n wrote:"

                // Get the post contents
                var contents = "i " + link.parentNode.nextSibling.nextSibling.innerHTML.trim();

                // Strip other tags that appear
                contents = contents.replace(/<font.*>/g, "").trim();
                contents = contents.replace(/<\/font.*>/g, "").trim();
                contents = contents.replace(/<br .*>/g, "").trim();
                contents = contents.replace(/<blockquote>/g, "").trim();
                contents = contents.replace(/<\/blockquote>/g, "").trim();
                contents = contents.replace(/<tt>/g, "").trim();
                contents = contents.replace(/<\/tt>/g, "").trim();
                contents = contents.replace(/<\!.*>/g, "").trim();
                contents = contents.replace(/In \#.*,.*wrote\:/g, "").trim();

                // We might have text that was bold - preserve it
                contents = contents.replace(/ *<b>/g, "\nb ");
                contents = contents.replace(/<\/b>/g, "\n");

                // We assume that any text currently in italics:
                // - is quoting if following a line break
                // - isn't if it's not.
                // The former we indent to indicate double-quoting; the latter we 
                // just strip.
                contents = contents.replace(/<br><br><i>/g, "\n\n> ");
                contents = contents.replace(/<i>/g, "");
                contents = contents.replace(/<\/i>/g, "");

                // Indent quoted text.
                contents = contents.replace(/<br><br>/g, "\n\ni ");

                // Tidy up a few things.
                contents = contents.replace(/\n\n\n/g, "\n\n")
                contents = contents.replace(/\ni +/g, "\ni ");
                contents = contents.replace(/(^|\n)i i +/g, "\ni ");
                contents = contents.replace(/(^|\n)i >/g, "\n> ");
                contents = contents.replace(/\ni \n/g, "");
                contents = contents.replace(/(^|\n)i( |\n)*/g, "\ni ");
                contents = contents.replace(/(^|\n)>( |\n)*/g, "\n> ");
                contents = contents.replace(/&amp;/g, "&");
                contents = contents.replace(/&gt *;/g, ">");
                contents = contents.replace(/&lt *;/g, "<");
                contents = contents.trim() + "\n";

                // Put it in
                rsp.value = intro + "\n\n" + contents;
                rsp.focus();
            }
            else
            {
                alert("You can only reply from the most recent posts, I'm afraid.");
            }
        }
        catch (e)
        {
            alert("Sorry, reply failed with error " + e.message);
        }

        // Don't do anything else.
        event.stopPropagation();
        event.preventDefault();
        return false;
    });
}

var links = content.document.evaluate(
                          "//a",
                          content.document,
                          null,
                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                          null);

for (var i = 0; i < links.snapshotLength; i++)
{
   link = links.snapshotItem(i);

   if (link.innerHTML) 
   {
       var cnt = link.innerHTML;
       var num = parseInt(cnt);

       if (cnt.length == (num + "").length) 
       {
           // Entirely numeric

           if (link.parentNode.innerHTML.indexOf(" of ") != -1) 
           {
               // It's a post.  Add a reply link.
               var newlink = content.document.createElement("a");
               newlink.innerHTML = "Reply";
               newlink.href = link.href + "&reply";
               newlink.style.color = replyColour;
               newlink.addEventListener('click', replyToPost(link), true);

               if (replyInBold) 
               {
                   newlink.style.fontWeight = "bold";
               }

               link.parentNode.appendChild(newlink);
           }
       }
   }
}

// Insert links

var fonts = content.document.getElementsByTagName("font");
var url = content.document.URL;
var p = url.lastIndexOf("/");
var q = url.lastIndexOf("@");

if (p > q) 
{
    url = url.substring(0, p);
}

for (var i = 0; i < fonts.length; i++)
{
   font = fonts[i];

   if ((font.innerHTML) &&
       (font.innerHTML.match(".* \#[01234567890]+.*")))
   {
       font.innerHTML = font.innerHTML.replace(/(.*) \#([01234567890]+)(.*)/g, "$1 <a href=" + url + "/$2?decrement>#$2</a>$3");
   }

   var p = font.innerHTML.indexOf("?decrement");

   while (p != -1) 
   {
       var q = font.innerHTML.lastIndexOf("/", p);
       font.innerHTML = font.innerHTML.substring(0, q + 1) + (parseInt(font.innerHTML.substring(q+1)) - 1) + font.innerHTML.substring(p+10);
       p = font.innerHTML.indexOf("?decrement");
   }
}

