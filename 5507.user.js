// ==UserScript==
// @author   Franck Depierre
// @name   add_englishinparis_translations.user.js
// @description	Insert buttons for each blog's POST, if translations are found. When user clicks on a button, open the article he pointed out and add the collected translations.
// @namespace     
// @include          http://englishinparis.blogspirit.com*

// @version       0.9

///////////////////////////////////

// This is a Greasemonkey user script.

// To install the script, 
// 1 . Install FireFox  http://www.mozilla.org/firefox
// 2. Install the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// then restart Firefox
// 3. Open this script in firefox and click on the install button.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "add_englishinparis_translations", and click Uninstall.

///////////////////////////////////
/*
 Changelog:
 ==========
 v0.1 :  Alpha. Release
 v02  :  backgroud color yellow for test. More accurate search pattern.
 v03 : test remove all script
 v04: test remove only domain script
 v05:  add configuration menu command
 v06: sort founded translations in an Array
 v07: try to make style sheet import absolute
 v08 : force body tet style arial
 v0.9 : correct regexp construction
*/

// ==/UserScript==

// Wait the full page to loaded previous to run the parsing actions
window.addEventListener(
    'load',function(){initialization()},
    true);

/*--- Initialise global data values. ---*/

var _debug = 0;
    
/* base64 encoded icon for insertion on the blog 
This icon is a blue pensil. Common Creative Licence opencliarts.org  */ 
  var _button_img ='iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+g'+
    'vaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggEEzgPLuE1RwAAAf5J'+
    'REFUeNqt1E9Ik3EYwPGv79xGKdFL851jsYnjRdCEMdxAdgoPhYcIOlSQl4bQP4i5'+
    'DhEVIUkTgi5FdUnK8KBJBUEFkZdKHEkmbUq50Uw7CFFaTZvsfbp4ik3Y257jj9/z'+
    '4fc8v4cHKhdVFVHc7sPBpqb7Azbb42Xo6DANqeoen98/NOrzTRcslpTA9SfgsJqg'+
    'bBZd74u1tSV+qeqswKQBvXHYXl02VVOzy9naOvQiEEiL3T4jkChANGKqRE3rCgSD'+
    'Y4stLXOiKCmBKQPO9pjCPJ7o3vb2xHJz85xUVaUEkgJXbpjCvN5oZzj87k8gkNl4'+
    'WVJg8AO4txa7v2kjGxtPhl2uI8OKotpSqVUMA+CrAaMRWMwVy1FKYQ5HSHM6D45Y'+
    'rTtq5ufXWVsTYAV4OwCPJkrlKaVLjd2x2z2ufF5YWFgHfgKfv8O9c5tVVRTU9VO7'+
    'a2v9nQCZTJ5CIQf8BsYvwczSZqDl34MD+/313V3O4bamZ3XpT6tMTrs2sMRTuHy6'+
    'vB9127ad6elOTr0MicwiK88V0dT+H9B3E3bWlj0i/b37BnNpXSSLyEfEeIXcitFp'+
    'at6OR0KHviV9hmQRySJfXrM6Eiduai01ehTH2IOGpew4+TcPmbh7jQt6A07Tq+jE'+
    'Ud/tq+erL9ZrqP+9IHXflrrYMe09lQyvG61S1l/tN66SkGSxcAAAAABJRU5ErkJg'+
    'gg==';

/* Variable use to parse the blog POST */  
  /* Regular expression related to POST content */
  var _re_post_begin=/Read.*(article|lyric)/i; /* Start of POST */
  var _re_post_end=/Permalink/i; /* End of Post */
  /* Data  not to be considered while parsing */
  var _re_usefull_vocabulary=/Useful Vocabulary/i; 
  
  /* Content parsing status */
  var _deep_parsing = 6; /* how deep script should try to find POST content from POST root */
  var _parsing_status = 0; /* 0 :nothing,  1: anchor found, 2: Read the article found, 3: word found */
  var _strong_content; /* strong tag content  stored while seeking for its translation */
  var _anchor_id;
  var _insertion_location_node = null; /* Node where button has to be inserted */

  /* All xml structure found and storage in memory */
  var _xml_data_storage = new Array(); /* Array where all xml data are parsed */
  
/* Variable use when user fires "get article with translation" */
  var _article_content; /* article content from a GM_xmlhttpRequest to the target article url */
  //var _xml_parser = new DOMParser(); /* xml dom parser use to parse data to insert in the article page */
  //var _xml_data_doc; /* current xml data parsed */
  var _xml_http_get_status = 1; /* status set to failed if no article content is available 0 ok, 1 failed, 2 alert message has been displayed */

  /* variable to record the opened windows and wait for the content to be parsed by the DOM parser*/ 
  var _new_window;
  var _wait_for_body_intervalID;
  
  /* Do a HTTP request when the url of the pointed articles are found to have them in cache */
  var _prefetch_url = 1;
  
  /* Time out value */
  var _extra_timeout = 200; /* Delay to let the DOM parser to finish to build the tree when body has been found */
  var _looping_interval = 100; /* lnterval where to check if the body has been found by the DOM parser */
  var _http_request_timeout = 4000; /* Maximum delay to get the article using GM_xmlhttpRequest */
  var _button_reset_timeout = 3000; /* Time out to reset the button in the not fired postion */

  /* static Colors */
  var _warning_background_color = '#acf400'; /* Background color for the warning to the top the article */
	var _warning_text_size =  "8pt";
  
/*--- End of global data values initialisation ---*/  

/* user string message function */
function user_message(msg_name) {

  switch (msg_name) {
    case 'popup_not_allowed':
      message = 'Sorry, if you want to get the article with translation, \n';
      message += 'you need first to allow this web site to open pop up windows.\n\n';
      message += 'Go in the firefox toolbar, click on tools->option and select the content tab,\n';
      message += 'Click on the button named "authorised sites,"\n';
      message += 'Then, enter "englishinparis.blogspirit.com" and click on the "Authorize" button.'
    break;
    case 'error_occurs':
    message = 'Sorry, the process to fill the article with translation failed.\n';
    message += 'Try the normal link to read the article';
    break;
    case 'article_not_available':
    message = "You have requested to get the article with translation,";
    message += " but the article is not available.\n";
    message += "Sorry, try to click on the other link to display the article without translation."
    break;
    case 'icon_get_article_title':
      message = "Click here to display the article with translation";
    break;
    case 'get_article_with_translation':
      message = " with translation by clicking this button ";
    break;
    case 'article_warning':
        /*HTML content */
       message = "WARNING: On your request, translations have been inserted to this article by the Grease Monkey script. " ;
       message += "Also, page links and behaviours may have been corrupted. ";
       message += "Move the mouse over the highlighted words to display the translations."
    break;
    case 'default_backgroud_color':
       message = "English In Paris : Set translations background to yellow";
    break;
    case 'gray_backgroud_color':
       message = "English In Paris : Set translations background to gray";
    break;
    
    default:
  }
  
  return message;
}


/* Set the button style to display a clicked effect */
function set_button_img_style(img,status) {  

  if(!img) return;
  
  style_dark = "2px solid #444";
  style_ligth = "1px solid #bbb";
  
  if (status) {
    img.style.borderTop = img.style.borderLeft = style_dark;
    img.style.borderRight = img.style.borderBottom = style_ligth;  
  } else {  
    img.style.borderTop = img.style.borderLeft = style_ligth;
    img.style.borderRight = img.style.borderBottom = style_dark;  
  }
}

/* Function called on page loaded */ 
function initialization() {

  /* Set menu to configure the word  backgroud  color */ 
  GM_registerMenuCommand(user_message('default_backgroud_color') , set_highligth_background_style_default); /*  default is yellow */
  GM_registerMenuCommand(user_message('gray_backgroud_color') , set_highligth_background_style_ligth_gray);
  
  /* Call the procedure to parse the POSTs */
  tags_detection();

}

/* Get the post part class = content in the document where POST's  are located */
function tags_detection() {

  var blog_content = document.evaluate(
  "//div[@class='content']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
 
  for (var i = 0; i < blog_content.snapshotLength; i++) {

    thisContent = blog_content.snapshotItem(i);
    
    if (thisContent.hasChildNodes) {
      get_post_content(thisContent, 0);
    }
  }
}

/* Find the translation content and the url regarding the blog's format */
function get_post_content(thisContent, deep) {
  
  /* This function should not occurs in a too deep location */
  if ((!thisContent) || (_deep_parsing < deep)) {
    return;
  }
    
  for (var j = 0; j < thisContent.childNodes.length; j++) {

  if (_debug) {
    GM_log('status: ' +
            _parsing_status +
            ' deep: '+ 
            deep +
            ' content length : ' + 
            thisContent.childNodes.length + 
            ' node name: '+
            thisContent.childNodes[j].nodeName +
            ' node content: ' + 
            thisContent.childNodes[j].nodeValue
            );
   }
    
    switch (thisContent.childNodes[j].nodeName) {
      case '#text':
        /* Check if the content has POST tag and set the related status */
        find_re_in_text(thisContent.childNodes[j]);
        
        /* we are after a strong tag so this is a translation. Add the last found word and its content to the storage */
        if ((_parsing_status == 4) && 
            (valid_content_text(thisContent.childNodes[j])) && 
            (_strong_content != thisContent.childNodes[j].nodeValue)) {
            
          add_translation_content_to_storage(_strong_content , thisContent.childNodes[j].nodeValue, _anchor_id);
          _strong_content = "";
          _parsing_status = 3;
        }
      break;
      /*@todo when EM is found something to do*/
      
      case 'A':
        /* If this is an anchor we are at the beginning of a new POST.  Record as POST reference ID*/
        anchor_id_name = thisContent.childNodes[j].id;
        if (anchor_id_name) {
          _parsing_status = 1;
          _anchor_id = anchor_id_name;
        }
        /* If Read article has been found the next <a> child is the URL*/
        if (_parsing_status == 2) {
          decoded_url = add_url_element_to_storage(thisContent.childNodes[j], _anchor_id);
          _parsing_status = 3;
          /* Prefetch the url to have it in the cache */
          if (_prefetch_url) {
              get_related_article_content(decoded_url, 0);
          }
        }
      break;
      case 'STRONG':
        /* Store strong content to record it with the translation later. Set related _parsing_status */
        strong_data  = thisContent.childNodes[j].firstChild.nodeValue;
        if ( (_parsing_status == 3) && 
             (valid_content_text(thisContent.childNodes[j].firstChild))) {
          _parsing_status = 4;
          _strong_content = strong_data;
        }
      break;
      
      default:
    }
    
    /* Also loop in its childs  */
    get_post_content(thisContent.childNodes[j], deep + 1);
  }
}

/*  Valid node text against several constraints. Return 0 if not valid  */
function valid_content_text(current_node) {

  if(!current_node) return 0;
  
  text_content = current_node.nodeValue;
  if( (!text_content) ||
      (text_content.length <= 3) ||
      (_re_usefull_vocabulary.test(text_content))) {
      return 0;
  }
  return 1;
}

/* Seek starting and ending tag in the current node. 
For starting tag initialize the storage structure 
For ending tag create a button and store the storage in the memory */
function find_re_in_text(current_node) {
  
  if(!current_node) return;
  
  text_content = current_node.nodeValue;

  /*  Find text Posted in. Create the button after the previous anchor  if somthing has been found */
  this_is_end = _re_post_end.test(text_content)

  if ((1 < _parsing_status) && this_is_end) {
    create_clickable_icon(_insertion_location_node, _anchor_id);
  }
  
  if(this_is_end) {
    _parsing_status = 0;
  }
  
  /* Detect POST data starting tag */
  if ((_parsing_status == 1) && (_re_post_begin.test(text_content))) {
    _parsing_status = 2;
    /* Record the insertion location node to add button later on */
    _insertion_location_node = current_node;
  }
}

/* Find data correponding to id in the global xml storage */
function get_xml_storage(id) {

  for (var j = 0; j < _xml_data_storage.length; j++) {
    if (_xml_data_storage[j][0] == id) {
      return _xml_data_storage[j];
    }
  }
  return null;
}

/* Add an array to the global storage one */
function add_xml_storage(id) {

  new_array = new Array(1);
  new_array[0] = id;
  _xml_data_storage.push(new_array);
  
  return new_array;
}

/* Get an array where parsed data are stored regarding the id */
function get_add_xml_storage(id) {
  array_id = get_xml_storage(id);
  if (!array_id) {
    array_id = add_xml_storage(id);
  }
  return array_id;
}

/* Get the url element of the article found in englishinparis */
function add_url_element_to_storage(url, id) {

  decoded_url = decodeURIComponent(url);
  new_url_array = new Array('location', decoded_url);
  
  array_id = get_add_xml_storage(id);
  array_id.push(new_url_array);
  
  return decoded_url;
}

/* Gete the article url from xml storage */
function get_article_url(id) {
 
  array_id = get_xml_storage(id);
  
  for (var j = 0; j < array_id.length; j++) {
    if (array_id[j][0] == 'location') {
      return array_id[j][1];
    }
  }
  
  return null;
}

/* Build regexp finding a whole word  */
function build_regex(search_text) {

   /* Remove parenthesised content */
  par_regexp = new RegExp("\\W?\\(.*\\)\\W?", 'ig');
  par_result = par_regexp.exec(search_text);
  
  if(par_result) {
    search_text = RegExp.leftContext;
    if((RegExp.rightContext) && (0 < RegExp.rightContext)) {
      search_text += " " + RegExp.rightContext;
    }
  }
    
  first_search = "";
  end_search = "";
      
  do {
    /*  Case verb start with "to"*/
    verb_regexp = new RegExp("^to ", 'ig');
    verb_result = verb_regexp.exec(search_text);
  
    if(verb_result) {
      /* Verb may be composed */
      first_search = search_text.substring(verb_result[0].length);

      vcomp_regexp = new RegExp("^(\\w*)\\W.*", 'ig');
      vcomp_result = vcomp_regexp.exec(first_search);
      
      if (vcomp_result) {
          end_search = first_search.substring(vcomp_result[1].length+1);
          first_search = vcomp_result[1];
          search_pattern = "("+first_search+"{0,2}(s|e|ing|ed)?\\W"+end_search+")";
      } else {
          search_pattern = "("+first_search+"{0,2}(s|e|ing|ed)?)";
      }
      break;
    }
  
    /* Case name */
    name_regexp = new RegExp("^(a |an )", 'ig');
    name_result = name_regexp.exec(search_text);
    if(name_result) {
      first_search = search_text.substring(name_result[0].length);
      search_pattern = "("+first_search+"?(s|es)?)";
      break;
    }
    
    /* Other cases */
    first_search = search_text;
		if(first_search.length <= 0) {
			GM_log("Strange case in regexp building. Content is empty");
		} else {
			search_pattern = "("+first_search+"?(s|es)?)";
		}
    
  } while(0);

  new_regexp = new RegExp("\\W" + search_pattern + "\\W", 'ig');

  return new_regexp;
}

/* Add the word and its translation respectively in expression and translation tag. both embedded in a content tag */
function add_translation_content_to_storage(expression, translation, id) {
 
	real_express = expression.substring(0, expression.indexOf(":"));

  new_regexp = build_regex(real_express)
  new_content_array = new Array('content', real_express, translation, new_regexp);
  
  array_id = get_add_xml_storage(id);
  array_id.push(new_content_array);
  
}

/* Create a button and add it before the appended_node with the appeneded node text + with translation */
function create_clickable_icon(appended_node, id) {

  var new_loader_icon = document.createElement('loading_icon_element');
  var new_button = create_button(
            prepare_article_context,
            user_message("icon_get_article_title"),
            20,
            20,
            'data:image/gif;base64,'+
            _button_img,
            id);
  
  new_loader_icon.appendChild(new_button);
  
  var br_node = document.createElement('br');
  new_loader_icon.appendChild(br_node);
  
  var text_node = document.createElement('p');
  text_node.innerHTML = appended_node.nodeValue + user_message("get_article_with_translation");
  text_node.appendChild(new_loader_icon);
  
  appended_node.parentNode.insertBefore(text_node, appended_node);
}

/* Create a button with a mouse event and one img. the img id is set for the event treatment later.
code has been taken from dive into greasemonkey. Thanks Mark Pilgrim  */
function create_button(func, title, width, height, src, img_id) {

    var img, button;
    img = document.createElement('img');
    img.width = width;
    img.height = height;
    /* Set the button style to not pushed */
    set_button_img_style(img,0);
    img.style.marginLeft = "2px";
    img.style.marginRight = "2px";
    img.src = src;
    img.id = img_id;
    button = document.createElement('a');
    button.title = title;
    
    button.addEventListener('click',
                            func, 
                            true);
    button.appendChild(img);
    
    return button;
}
 
/* Function called when user click on the inserted image 
Get content from article and store it in _article_content */
function prepare_article_context(event)
{
  /* init global variable */
  _article_content = null;
  
  /* Store the id tageted by the event */
  _anchor_id = event.target.id;
  
  /* Set button style to pushed */ 
  set_button_img_style(event.target,1);
  /* Set a time out to reset the button pusshed effect later on */
  setTimeout(set_button_img_style, _button_reset_timeout, event.target, 0);
  
  var article_url = get_article_url(event.target.id);
 
  if (article_url) {
    /* Reset global _parsing_status */
    _xml_http_get_status = 1;
    /* Try to get content from the article url */
    get_related_article_content(article_url, 1);
    /* Set a time out to few seconds to disply an error message box to user if nothing has been found */ 
    setTimeout(time_out_after_getting_article_content, _http_request_timeout);
  }
}

/*  Get the article_content using  GM_xmlhttpRequest function 
that seems to be threaded. Set a time out to finish the job in
one another function */
function get_related_article_content(article_url, process_content) {
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: article_url,
    
    onload: function(responseDetails) {
      /* Set a time out (just a event) to process the content and record it only if requested */
      if (process_content) {
        _article_content = new String(responseDetails.responseText);
        setTimeout(process_article_content,1);
      }
    }
  });
}

/*Function called on timeout from prepare_article_context*/
function time_out_after_getting_article_content() {
  /* set http request to the article content status to failure */
  if (_xml_http_get_status == 1) {
    _xml_http_get_status = 0;
    GM_log('IN time_out_after_getting_article_content. Getting the article failed');
    alert(user_message("article_not_available"));
  }
}

/* Function called when the article has been loaded */
function process_article_content() {

  if ((_article_content) && (_article_content != "") && (_xml_http_get_status == 1)) {
    /*  In case some document.* are still somewhere replace then */
    replace_document_attributs();
    /* Remove the script tags from _article_content */
    remove_script_tag_from_content();  
    
    /* Open content in a new windows */
    _new_window = open_new_windows_and_write_in();
    /* Run on Interva to wait for the DOM to fully parse the content */
    _wait_for_body_intervalID = setInterval(ensure_body_has_been_found, _looping_interval);
  } else {
     GM_log('IN process_article_content. No content available or time out already occured');
  }
}

/* Replace domain. attributes with the current on a dummy variable to avoid redirection */
function replace_document_attributs() {
  init_content = _article_content;
  
  my_domain = "document.domain = '" + document.domain + "';"
  search_text = "document.domain\\W?=\\W?'\\w{1,20}.?\\w{1,20}.?\\w{1,20}.?\\w{1,20}.?\\w{1,20}';";
  
  re_function = new RegExp(search_text,'gi');
  init_content  = init_content.replace(re_function, my_domain);
  
  domain_regexp = new RegExp("(document.location|document.cookie)(\\.\\w)?", 'ig');
  init_content  = init_content.replace(domain_regexp, "has_been_replaced");
  
  _article_content = init_content;
}


/* Remove java scripts where a redirection may occur */
function remove_script_tag_from_content () {

  var new_content = "";
  var i = 0;
  var j = 0;
  
  init_content = _article_content;
  
  while (0 < init_content.length) {
    lc_init_content = init_content.toLowerCase();
    i = lc_init_content.indexOf("<scrip");
    j = lc_init_content.indexOf("</script>") + 9;
    
    if ((i < 0) || (j <= 0) || (j < i)) {
      new_content += init_content;
      init_content = "";
    } else {
        new_content += init_content.substring(0, i);
        i = j;
        init_content = init_content.substring(j);
    }
  }
  _article_content = new_content;
}

/* open a new windows and insert the article contents in*/
function open_new_windows_and_write_in() {

  try {  
	
    _new_window = window.open("text/html");
    _new_window.document.write(_article_content);
    _new_window.document.close();
		
  } catch(e) {
  /* @todo check event property */
    /* reset the getting article process status and show on alert message box */ 
    _xml_http_get_status = 0;
    alert(user_message("popup_not_allowed"));
  }
  return _new_window;
}

/* Function called by the avent Interval call after the article content insertion into the new wondows
 Wait to have the body parsed correctly by the dom parser */
function ensure_body_has_been_found() {

  if (_new_window) {
    if(_new_window.document.body) {
      clearInterval(_wait_for_body_intervalID);
      _xml_http_get_status = 0;
      /* Set an extra timeout to make sure DOM has finished its job */
      setTimeout(finalize_article_translation_insertion, _extra_timeout);
    }
  } else if (_xml_http_get_status == 1) {
    alert(user_message("error_occurs"));
    GM_log('IN ensure_body_has_been_found _new_window not available and status 1');
    clearInterval(_wait_for_body_intervalID);
  } else {
    clearInterval(_wait_for_body_intervalID);
    GM_log('IN ensure_body_has_been_found _new_window not available');
  }
}

/* Add the translation to the article and rewrite url to absolute ones */
function finalize_article_translation_insertion() {
  
  article_url = get_article_url(_anchor_id);
	
  /* Add a worning to the top the article */
  add_warning_on_content(_new_window.document, article_url);
  /* add translation to the article */
  add_content_to_article(_new_window.document.body);  
  /* Change url to relative path */
  make_img_url_absolute(_new_window.document, article_url, window.location.href);
  make_link_url_absolute(_new_window.document, article_url, window.location.href);
  /* Make style sheet import relative to the article */
  make_style_sheet_url_absolute(_new_window.document, article_url, window.location.href);
	/*  Sometime body style is corrupted. Force it to Arial or Helvetica */
	forceBodyStyle(_new_window.document);
  
}

/* Add a warning to the top the article telling user content has been change  */
function add_warning_on_content(this_document) {

  if(!this_document) return;
  
  new_node = document.createElement('p'); 
  new_node.innerHTML = user_message('article_warning');
  new_node.style.backgroundColor = _warning_background_color;
	new_node.style.fontSize = _warning_text_size;
  
  this_document.body.insertBefore(new_node, this_document.body.firstChild);
}

/* Parse all link nodes and try to rewrite the url as an absolut one */
function make_link_url_absolute(doc_node, article_location, current_url) {

  if(!doc_node) {
    GM_log("make_link_url_absolute no document available");
    return;
  }

  /* Find all script nodes */
  link_nodes = document.evaluate(
  '//link',
  doc_node,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
  
  current_location = String(document.location);
  
  for (var i = 0; i < link_nodes.snapshotLength; i++) {
    current_node = link_nodes.snapshotItem(i);
    node_location = String(current_node.href);
    current_node.href = build_absolute_url(current_location, node_location, article_location);
  }
}

/* Parse all image nodes and try to rewrite the url as an absolut one */
function make_img_url_absolute(doc_node, article_location, current_url) {

  if(!doc_node) {
    GM_log("make_url_absolute no document available");
    return;
  }

  /* Find all script nodes */
  link_nodes = document.evaluate(
  '//img',
  doc_node,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
  
  current_location = String(document.location);
  
  for (var i = 0; i < link_nodes.snapshotLength; i++) {
    current_node = link_nodes.snapshotItem(i);
    node_location = String(current_node.src);
    
    current_node.src = build_absolute_url(current_location, node_location, article_location);
  }
}

/* Built a absolute url regarding the */
function build_absolute_url(current_location, node_location, article_location) {

  if((!current_location) || (!node_location) || (!article_location)) {
    return;
  }

  if (current_location == node_location.substring(0, current_location.length)) {
  
    new_url = article_location.substring(0, article_location.lastIndexOf("/") +1);
    new_url += node_location.substring(current_location.length);
    return new_url;  
  } else {
    return node_location;
  }
}

/* Make imported style sheet url */
function make_style_sheet_url_absolute(doc_node, article_location, current_url) {

  if(!doc_node) {
    GM_log("make_style_sheet_url_absolute no document available");
    return;
  }

  /* Find all script nodes */
  nodes = document.evaluate(
  '//style',
  doc_node,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
  
  current_location = String(document.location);
  
  for (var i = 0; i < nodes.snapshotLength; i++) {
    current_node = nodes.snapshotItem(i);
    build_import_style_url(current_node, article_location);
  }
}
/* Get domain to the url */
function get_http_domain(url) {

  end_protocole = url.indexOf("http://") + 7;
  current_domain = "http://" + url.substring(end_protocole, url.substring(end_protocole).indexOf("/") + end_protocole);

  return current_domain;
}

/*  Make inmported style sheets path absolute */
function build_import_style_url(current_node, article_location) {

  if((!current_location) || (!node_location) || (!article_location)) {
    return;
  }
	
  /* Find @import url */
  import_regexp = new RegExp("@import url\\((.*)\\);", 'ig');
  import_result = import_regexp.exec(current_node.innerHTML);
  
  if(import_result) {
    current_domain = get_http_domain(article_location);
    if(import_result[1][0] == "/") {
      /* Absolute URL */
      current_node.innerHTML = current_node.innerHTML.replace(import_result[1], current_domain + import_result[1]);
    } else {
      /* */
      current_node.innerHTML = current_node.innerHTML.replace(import_result[1], current_domain + "/" + import_result[1]);
    }
  }
}

/* Usual add style style from Grease monkey */
function addGlobalStyle(doc, css) {
	var head, style;
	head = doc.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = doc.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
/* Sometime style are corrupted by the script.  Force body style to Arial.*/
function forceBodyStyle(doc) {
	addGlobalStyle(doc, 'body { font-family: Arial, Helvetica; }');
}

/* Add the regexp result to the storage array sorting by their position */
function add_regex_result_to_array(my_array, re_result, word, translation) {

  var this_index = re_result.index;
  var this_length = re_result[1].length;
  var this_matched = re_result[1];
  var j = 0;
  
  /* Iterate in each regexp result while they are located before the current one in the text */  
  for (j = 0; j < my_array.length; j++) {
      if(this_index <= my_array[j][0]) break;
  }
      
  new_founded = new Array(this_index, this_length, this_matched, word + ": " + translation);
  my_array.splice(j, 0, new_founded);
}


/*Add the translations found in english in paris page to the article. Only add a title to the word */
function add_content_to_article(new_windows_content) {

  /* Find all nodes with a text nodes */
  text_nodes = document.evaluate(
  "//text()",
  new_windows_content,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
    
  /*Loop in each text node */
  for (var i = 0; i < text_nodes.snapshotLength; i++) {
    node = text_nodes.snapshotItem(i);
    this_data = node.data;
    attach_node = null;
    begin_content = 0;
        
    array_id = get_xml_storage(_anchor_id);
    sorted_array = new Array();
    
    /* try to find each translated word  in this node content */
    for (var j = 0; j < array_id.length; j++) {
      if ((array_id[j][0] == "content") && (this_founded = array_id[j][3].exec(this_data))) {
        add_regex_result_to_array(sorted_array, this_founded, array_id[j][1], array_id[j][2]);
      }
    }
    
    for (var j = 0; j < sorted_array.length; j++) {
   
      // Make the current tex empty and buid a tree appended to the attach_node 
      str_start = sorted_array[j][0] + 1;
      str_end = str_start + sorted_array[j][1];
  
      // Create two new nodes 
      first_node = document.createElement('font');
      second_text = document.createElement('font');
			
      // Set a darker back ground (from configuration attribut)  to the found text and set the translation to its title 
      second_text.style.backgroundColor = get_highligth_background_style();
      second_text.title = sorted_array[j][3];
      
      first_node.innerHTML = this_data.substr(begin_content, str_start - begin_content);
      second_text.innerHTML = sorted_array[j][2];
      
      node.data = "";
      begin_content = str_end;
       
      if(!attach_node) {
        attach_node = document.createElement('font');
      }
                  
      attach_node.appendChild(first_node);
      attach_node.appendChild(second_text);
        
    }
    
    /* If a tree has been built append it to its parent node */
    if(attach_node) {
      if (begin_content < this_data.length) {
        last_node = document.createElement('font');
        last_node.innerHTML = this_data.substr(str_end);
        attach_node.appendChild(last_node);
      }
      node.parentNode.insertBefore(attach_node, node);
    }
  }
}

/* Configuration parameters functions using GM get_set_value. 
Functions are called from GM menu command */
/*  get translation backgroud color  config  parameterv*/
function get_highligth_background_style() {
  return GM_getValue("gm_englishinparis_backgroud_style", 'yellow');    
}

/*  set config parameter for translation backgroud color to yellow */
function set_highligth_background_style_default() {
 GM_setValue("gm_englishinparis_backgroud_style", 'yellow');
}

/*  set config parameter for translation backgroud color to gray */
function set_highligth_background_style_ligth_gray() {
 GM_setValue("gm_englishinparis_backgroud_style", '#eeeeee');
}






