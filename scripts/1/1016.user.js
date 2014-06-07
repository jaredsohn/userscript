// By Sean Coates: sean@caedmon.net
// ==UserScript==
// @name		Planet-PHP Blog Selector
// @namespace		http://www.phpdoc.info/greasemonkey
// @description		Select which blogs you'd like to see on the planet-php front page
// @include		http://*.planet-php.*/
// @include		http://*.planet-php.*/index.php

// ==/UserScript==

(function() {
  var blogNameNodes = get_blog_name_nodes();
  make_blog_checkboxes(blogNameNodes);
  set_blog_checkboxes(blogNameNodes);
  
  get_blog_nodes();
  toggle_nodes();
  
  window.toggle_blog = function(blogName)
  {
    var newstatus = document.getElementById('gm-checkbox-' + blogName).checked;
    GM_setValue("hideblog." + blogName, !newstatus);
    toggle_nodes();
    setTimeout("document.getElementById('gm-checkbox-" + blogName + "').checked = " + newstatus, 10);
  }
  
  function xpath_to_array(expr, par)
  {
    var ret = new Array();
    var xpath_results = document.evaluate(expr, par, null, XPathResult.ANY_TYPE, null);
  
    while (this_result = xpath_results.iterateNext()) {
      ret.push(this_result);
    }
    return ret;
  }

  function get_blog_name_nodes()
  {
    return xpath_to_array("//div[3]/div[4]/fieldset/a", document);
  }

  function make_blog_checkboxes(blogNameNodes)
  {
    for (n in blogNameNodes) {
      var fixedName = blogNameNodes[n].textContent.replace(/[^a-z]/ig, '');
      var cbHTML = '<input type="checkbox" id="gm-checkbox-' + fixedName + '" '
                   + 'onClick="window.toggle_blog(\'' + fixedName + '\'); '
                   + 'return false;" />';
      blogNameNodes[n].innerHTML = cbHTML + blogNameNodes[n].innerHTML;
    }
  }
  
  function set_blog_checkboxes(blogNameNodes)
  {
    for (n in blogNameNodes) {
      var fixedBlogName = blogNameNodes[n].textContent.replace(/[^a-z]/ig, '');
      var hidden = GM_getValue("hideblog." + fixedBlogName, false);
      document.getElementById('gm-checkbox-' + fixedBlogName).checked = (hidden ? false : true);
    }
  }

  function get_blog_nodes()
  {
    window.blogNodes     = new Array();
    window.blogNodeNames = new Array();
    var xpath_results = xpath_to_array("//div[2]/div/fieldset/legend/a", document.getElementById('middlecontent'));
    for (n in xpath_results) {
      window.blogNodes[n]     = xpath_results[n].parentNode.parentNode.parentNode;
      window.blogNodeNames[n] = xpath_results[n].textContent;
    }
  }

  function toggle_nodes()
  {
    for (var i in window.blogNodes) {
      var fixedBlogName = window.blogNodeNames[i].replace(/[^a-z]/ig, '');
      var hidden = GM_getValue("hideblog." + fixedBlogName, false);
      if (hidden) {
        window.blogNodes[i].style.display='none'
      } else {
        window.blogNodes[i].style.removeProperty("display");
      }
    }
  }
  window.toggle_nodes = toggle_nodes;
})();
