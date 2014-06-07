// ==UserScript==
// @name           Danbooru Blacklist Extension
// @description    An experimental extension to Danbooru's blacklist functionality
// @namespace      porond_robot
// @include        http://*.donmai.us/post
// @include        http://*.donmai.us/post?*
// @include        http://*.donmai.us/post/
// @include        http://*.donmai.us/post/?*
// @include        http://*.donmai.us/post/index
// @include        http://*.donmai.us/post/index?*
// ==/UserScript==


/*

To test this script, add something like this to your danbooru blacklist:
  width:..160

Then do a tag search.

An example search, searching for "width:145..185"
http://danbooru.donmai.us/post?tags=width%3A145..185

If everything went right, the sidebar should be showing the usual
"Hidden ##" caption and the new blacklist entry if there were posts to hide.

Currently implemented metatags:
  filesize, height, width
Value formats:
  100   ..100   100..   100..200

*/



//*********************************************************

//this runs the script in the scope of the page
//this method needs the whole script to be in the "else" block

if (typeof(arguments) != "undefined"
  && typeof(arguments.callee) == "function"
  //&& typeof(__PAGE_SCOPE_RUN__) == "undefined"
) {
  //var source = arguments.callee.toString();
  var source = arguments.callee
    .toString().match(/^function\s+\w*\([^\)]*\)\s*\{\s*\n([^]*)\n?\}$/)[1];
  
  document.location = "javascript:"
    //+ escape( "var __PAGE_SCOPE_RUN__ = true;\n" )
    //+ escape( "(" + source + ")()" )
    + escape( source )
    + escape( ";void 0;" );
}
else {


//*********************************************************

//danbooru's original script may have already filled the sidebar, clear it

var blacklist_count = $("blacklist-count")
if (blacklist_count) {
  blacklist_count.innerHTML = ""
};
var blacklisted_list = $("blacklisted_list")
if (blacklisted_list) {
  blacklisted_list.innerHTML = ""
};



//*********************************************************

//inject experimental stuff into "Post" object
//most of it is copied from "post.js", and were modified as needed

Object.extend(Post,
{
  blacklists: [],
  
  checkmeta_onpost: function(post) {
    return function (metatag) {
      //meta-tag matching is done here
      var result = !true;

      with (metatag) {
        switch (type) {
          case "file_size":
          case "width":
          case "height":
            if (post[type] == exact
              || ((min || 0) <= post[type] && post[type] <= (max || 999999))
            )
              return !result;
            return result;
          //case "cheese":
          //  if (cheese) return !result;
          //  return result;
          default:
            return result;
        }
      }
      return result;
    }
  }
  ,
  
  apply_blacklists: function() {	
    Post.blacklists.each(function(b) { b.hits = 0 })

    var count = 0
    Post.posts.each(function(pair) {
      var thumbs = $$("#p" + pair.key)
      if (thumbs.length == 0) return
      var post = pair.value
      var has_tag = post.match_tags.member.bind(post.match_tags)
      var checkmeta = Post.checkmeta_onpost(post)
      post.blacklisted = []
      Post.blacklists.each(function(b) {        
        if (b.meta.all(checkmeta) && b.require.all(has_tag) && !b.exclude.any(has_tag)) {
          b.hits++
          if (!b.disabled) post.blacklisted.push(b)
        }
      })
      bld = post.blacklisted.length > 0

      count += bld
      thumbs.each(function(thumb) {
        if (Post.blacklist_options.replace) {
          var img = thumb.down('img')
          if (bld) {
            img.src   = "/blacklisted-preview.png"
            img.width = img.height = 150
	  } else {
            img.src    = post.preview_url
            img.width  = post.preview_width
            img.height = post.preview_height
	  }
          thumb.removeClassName('blacklisted');
        } else {
          if (bld)
            thumb.addClassName('blacklisted');
          else
            thumb.removeClassName('blacklisted');
        }
      });
    })

    if (Post.countText)
      Post.countText.textContent = count
    return count
  }
  ,
  
  init_blacklisted: function(options) {
    Post.blacklist_options = Object.extend(Post.blacklist_options, options)
    var bl_entries = Cookie.raw_get("blacklisted_tags").split(/[&,]/)
    bl_entries.each(function(val) {
        var s = Cookie.unescape(val).replace(/(rating:[qes])\w+/, "$1")
        var tags = s.match(/\S+/g)
        if (!tags) return
        var b = { tags: tags, require: [], exclude: [], meta: [],
          disabled: false, hits: 0 }
        tags.each(function(tag) {
          var dis = tag.match(/(file_?size|height|width):(\S+)/);
            //expand above regexp for more types
          if (dis) {
            if (dis[1] == "filesize") {dis[1] = "file_size"}
              //post data has an underscore in "filesize", cheatsheet does not
            var match = dis[2].match(/^[<>]=?\d+/);//checking for comparative operator
            if (match) {
              //if matched, then ?
              //b.meta.push({ type: dis[1], compare: match[0] });
            }
            else {
              match = dis[2].match(/^(\d+)?\.\.(\d+)?$|^(\d+)$/);
              if (match) {
                //if matched, then at least one value is available
                b.meta.push({ type: dis[1], min: match[1],
                  max: match[2], exact: match[3] });
              }
              //if there were no matches until this point, the tag-value is probably useless
            }
          }
          else
          if (tag.charAt(0) == '-') b.exclude.push(tag.slice(1))
          else b.require.push(tag)
        })
        Post.blacklists.push(b)
    })

    var sidebar = $("blacklisted-sidebar")
    if (!sidebar) {
      Post.apply_blacklists();
      return;
    }
  
    var blacklist_count = $("blacklist-count")
    if (blacklist_count)
      Post.countText = blacklist_count.appendChild(document.createTextNode(""));

    if (!Post.apply_blacklists()) {
      sidebar.hide()
      return
    }

    sidebar.show()

    /* Keep focus from going to the item on click. */
    sidebar.observe("mousedown", function(event) { event.stop() })

    var list = $("blacklisted-list")
    Post.blacklists.each(function(b) {
      if (!b.hits)
        return

      var li = list.appendChild(document.createElement("li"))
      li.className = "blacklisted-tags"
      var a = li.appendChild(document.createElement("a"))
      a.href = "#"
      var expand = a.appendChild(document.createTextNode("\xBB"));

      a.observe("click", function(event) {
        b.disabled = !b.disabled
        a.className = b.disabled? "blacklisted-tags-disabled":"blacklisted-tags"
        Post.apply_blacklists()
        event.stop()
      });

      a.appendChild(document.createTextNode(" "));
      var tags = a.appendChild(document.createTextNode(b.tags.join(" ")));
      li.appendChild(document.createTextNode(" "));
      var span = li.appendChild(document.createElement("span"))
      span.className = "post-count"
      span.appendChild(document.createTextNode(b.hits));
    })
  }
});



Post.init_blacklisted();


}
//*********************************************************

