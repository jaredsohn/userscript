// ==UserScript==
// @id             31415
// @name           Threadless Designs Only
// @version        .9
// @namespace      foo!
// @author         Ivan
// @description    Shows designs on catalog pages instead of "models"
// @include        http://www.threadless.com/catalog/*
// @run-at         document-end
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.setAttribute("src",
        "data:,"+escape("var __PAGE_SCOPE_RUN__ = true;\n" + my_src));

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

    $('.product_item').css('width', '636px');
    img_filename = "636x460design_01.jpg";
    size = {
        "width":"636",
        "height":"460",
    };
    thumb_imgs = $('img[width="144"][height="216"]');

    thumb_imgs.each(function(index) {
        var temp_array = $(this).attr("src").split("/");
        temp_array[temp_array.length-1] = img_filename;
        $(this).attr("src", temp_array.join("/"));
    });
    thumb_imgs.attr(size);
