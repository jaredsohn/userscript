// ==UserScript==
// @name        Peanutsify
// @namespace   Facebook
// @author      nhatier
// @include     /https?://www.facebook.com//
// @version     2
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://code.jquery.com/jquery.min.js
// ==/UserScript==


(function() {

   var getTextNodesIn = function(el) {
       return $(el).find(":not(iframe)").andSelf().contents().filter(function() {
           return this.nodeType == 3;
       });
   };
   String.prototype.repeat = function(times) {
/*jslint arraylit: true */
      return new Array(1 + in_Times).join(this);
/*jslint arraylit: false */
   };

   var l_Img = $('<img style="float:right" height="14" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAB3RJTUUH3AoFESMn0gGVKgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAARnQU1BAACxjwv8YQUAAAMSSURBVHjaY/z//z8DPvDy5Uvx/t6eNS9ePrMB8RUUlTdYWlrPcHd334lVA8hAbHjGjBnpDx48kG9va9r9/PHN//9/fwDj+7cv/V++eN779evXR2PTx4juwo0bN/pfuHDBACguwPDvZ0FBXiaDgAA/hkM2bNzKwMjCHeDv778RWRxu4MOHD+W7OzvWuDjZaBgY6PGwsDAz/Pnzl0FCQoyBg4MDq++mz5j/xcjU0sXc3PwkTIwJRLx9+1Z4/rzZGzraakwCAnx4FBTkGGRkpBkWLFrG8OLFK6yGzZm7iOHho4c8u3fvyMEIw/j4uP2wMCKEz58+/H/zhhX/ra0swLi8tOA1MIj0YWHI5OjouB8UZgxEgg2btjK8efMOzD567ASDhrqayIYNGwLgXj5w4IDDhw8fBIg1EAZERIQZ9PV0GR48fPzBwcHhAEycBZg0FN6/fy+SkJLXExzobcHLw40SAxbmJvBI+fHjB8N/RsYHHz5+lPjw4SNHRHjwCxs75xgbG5uDGLEMAmvXrg3+8uULD7KBx48e7ImJDhOxsbZkmDBp+htHZ0+X06dP+Rw5fKAlNS3Lxtra+ihRCRuGgUFin5wY+3/+nGn/3dxc7xNSz0RseIGSUmZagsTChQvj8aklykBgTDI42NuAMMf9u3cSPn78yE+2gatXrugJCfYDsyFZ8I9DSEjIGlChQZaBX758FuHhQcRTgJ83w/nz51xAhs6dOzeZZAOfv3zFcOfOPTA7ITkLTJ84sodh/uxJNswMv+YcPHjQnqCBX79+5QYVFiAsKMDH8ubNW4YHDx4x8HBzg3MKMPkw8PBwM3i4OzNs376lAlkvCzYDu7s6lzD8/x0AiRBVhh279oLFS4pygTnjEdjwEyfPMAT4ezO8ePZcA0UzejoqKSnpvnz+2P/3rx/+7+9t/79/95b/oAL2+uVT8ALC3Mzkf3tLPVg8OjLst7293f3yspLtL168EMcoYI8ePWoNlDwC8tILYPiBvAkCL16+ZADlFrCrNbXnAEGKhDgkor98/cogIS7G8PXbzyMA0Ur0Ipv9S3oAAAAASUVORK5CYII=" />');
   l_Img.click(function() {
      var l_Img = $(this);
      var l_span = l_Img.data("psp");
      var l_parent = l_Img.data("ppa");
      var l_story = l_Img.data("story");
      var l_prevcontent = l_parent.data("prevcontent");
      if (l_prevcontent)
      {
         getTextNodesIn(l_span).each(function(i, in_Node)
         {
            in_Node.textContent = l_prevcontent[i] || "";
         });
         l_parent.removeData("prevcontent");
         delete wahStories[l_story];
      }
      else
      {
         l_prevcontent = [];
         getTextNodesIn(l_span).each(function(i, in_Node)
         {
            var l_Text = in_Node.textContent;
            l_prevcontent[i] = l_Text;
            l_Text = l_Text.split(" ");
            var l_Fm = true;
            for (var i = 0; i < l_Text.length; ++i)
            {
               var l_maj = Math.random() > 0.9;
               var l_old = l_Text[i];
               var l_len = l_old.length;
               var l_wahlen = l_old.replace(/[^a-z0-9\u0080-\uffff]|\u200e|\u200f/i).length;
               var l_wahcount = 0;
               var l_txt = "";
               for (var l = 0; l < l_len; ++l)
               {
                  var l_char = l_old.charAt(l);
                  if (/[^a-z0-9\u00C0-\uffff]|\u200e|\u200f/i.test(l_char))
                  {
                     switch (l_char)
                     {
                        case ".":case ";":case "!":case "?":case ")":case '"': l_Fm = true;
                     }
                     l_txt += l_char;
                  }
                  else if (!l_wahcount)
                  {
                     l_txt += l_Fm || l_maj ? "W" : "w"; l_Fm = false; ++l_wahcount;
                  }
                  else if (l_wahlen > 2 && l_wahcount == l_wahlen - 1)
                  {
                     l_txt += l_maj ? "H" : "h"; l_Fm = false; ++l_wahcount;
                  }
                  else
                  {
                     l_txt += l_maj ? "A" : "a"; l_Fm = false; ++l_wahcount;
                  }
                  l_Text[i] = l_txt;
               }
            }
            in_Node.textContent = l_Text.join(" ");
         });
         l_parent.data("prevcontent", l_prevcontent);
         wahStories[l_story] = 1;
      }
      GM_setValue("wahstories", JSON.stringify(wahStories));
   });

   var wahStories = JSON.parse(GM_getValue("wahstories", "{}"));

   setInterval(function()
   {
      $(".messageBody .userContent").each(function(i, in_span)
      {
         in_span = $(in_span);
         var l_parent = in_span.parent().parent();
         var l_type = l_parent.data("ft");
         var l_story = in_span.parents("li").eq(0).data("ft");
         if (typeof l_story != "object")
         {
            return;
         }
         if (typeof l_type != "object")
         {
            return;
         }
         if (l_type.peanuts) { return; }
         l_type.peanuts = true;
         l_parent.data("ft", l_type);
         l_type = l_type.type;
         l_story = l_story.mf_story_key;

         if (l_type && in_span.html().length > 20)
         {
            img = l_Img.clone(true).data("psp", in_span).data("ppa", l_parent).data("story", l_story);
            in_span.after(img);
            if (wahStories[l_story])
            {
               img.click();
            }
         }
      });
   }, 1000);

})();
