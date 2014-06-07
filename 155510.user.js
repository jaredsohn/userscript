// ==UserScript==
// @name        Link Tooltips
// @namespace   Cromagnon
// @description Adds and/or modifies link and image title attributes to include more informaton
// @include     *
// @version     1.2.0202
// ==/UserScript==



//go through and add or modify each link's title
//
//  !Link.title -> Link.href
//
//  !Link.href
//
//       Link.title -> unchanged
//
//   Link.href = #
//
//       Link.title -> unchanged
//
//   Link.title -> Link.title + ( Link.href )
//
//   !Img.title
//
//       !Img.alt
//
//          Img.title -> Link.title
//
//       !Link.href
//
//          Img.title -> Img.alt
//
//        Link.href = #
//
//          Img.title -> Img.alt
//
//        Img.title -> Img.alt + ( Link.href )
//
//   !Link.href
//
//      Img.title -> unchanged
//
//    Link.href = #
//
//      Img.title -> unchanged
//
//    Img.title -> Img.title + ( Link.href )
//
//
function checkLinkTitles(e) {

  var target = (e == null) ? document : e.target;
  
  var links = target.getElementsByTagName("a");
  
  if (links.length == 0) {
  
      if (target.nodeName != "A") return;
      
      links = [];
      links.push(target);

  };
  
  for (var i = 0; link = links[i]; ++i) {
  
    //if (link.getAttribute("modified-by") == "Link Tooltips")  continue;
    
    //link.setAttribute("modified-by", "Link Tooltips");
    
    var href = link.getAttribute("href");
    var title = link.getAttribute("title");
    
    if (!title) {
    
        if (href != null) link.setAttribute("title", href);
    
    } else if ((href != null) && (href != "#")) {

        if ((title != href) && (title.indexOf("(" + href + ")") == -1))
	
	    link.setAttribute("title", title + "\n (" + href + ")");
    };


    //in the latest FireFox versions, titles on image elements override those on enclosing links
    
    var imgs = link.getElementsByTagName("img");
    
    for(var j = 0; img = imgs[j]; ++j) {
    
      var title = img.getAttribute("title");
      var alt = img.getAttribute("alt");
      
      if (!title) {
      
	if (!alt)
	
	    img.setAttribute("title", link.getAttribute("title"));
	    
	else if ((href != null) && (href != "#"))
	
	    img.setAttribute("title", alt + "\n (" + href + ")");
	    
	else img.setAttribute("title", alt);
      }
      else if ((href != null) && (href != "#")) {
      
          if ((title != href) && (title.indexOf("(" + href + ")") == -1))
      
	    img.setAttribute("title", title + "\n (" + href + ")");
      }
    }
  }
};



// Main function
//
function init() {

    checkLinkTitles();

    document.addEventListener("DOMSubtreeModified", checkLinkTitles, false);

};



// Call our main function.
//

init();

//end