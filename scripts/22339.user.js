// ==UserScript==
// @name           Class Pages by Time & Greasy Black
// @namespace      http://userstyles.org/users/3059
// @description    Add a class value, used to style the page differently at some time.  Also acts as a hook for my Greasy Black userstyles, which works to fill gaps in @-moz-document features (domain and URL exclusion, for instance).
// @include        *
// ==/UserScript==

/*
 * version 0.1.5
 */

(function() {

/* These two values begin and end your daytime.
 * The numbers are 24 hour... hour values.  ^_^
 */
var start_day = 7;
var end_day = 17;

/* A list of common class names to reuse.
 */
var class_list = new Array();

class_list['default'] = 'greasy-black';

class_list['apacheError'] = 'apacheError';
class_list['google'] = 'bigBroother';
class_list['daytime'] = 'day';


/* Include or exclude domains.
 * I'm using my own code, instead of metadata @include/exclude,
 * because these are conditional in the code, and not meta
 * to the script itself.
 *
 * A text value in do_class, with the key named for the domain, means
 * to add the text as a domain-specific class to the body of any page
 * on that domain.  So, the text string must be a valid HTML/CSS
 * class name.
 *
 * A true value in dont_class is used to exclude sub-domains of otherwise
 * included domains.  Any domain not already "included" by a 
 * less specific (root or sub-) domain, is by default, excluded.
 *
 * So, assume you just included 'google.com'.  Now, assume you 
 * don't want mail.google.com styled.  Exclude that.
 */
var do_class = new Array();
var dont_class = new Array();

// Domains or URLs that you want to include.
do_class['google.com'] = class_list['google'];


// Domains or URLs that you want to exclude.
// No wildcards here.
// For URLs, this behaves just like @-moz-document url-prefix
dont_class['mail.google.com'] = true;
dont_class['http://maps.google.'] = true;


/* End of configuration.
 *
 * NON-PROGRAMMING USERS can stop here.
 */
 
// Gonna need these.
function doOrDont(domainOrURL) {
  if (do_class[domainOrURL] || dont_class[domainOrURL]) {
    return true;
  }
}

// This domain.
var the_domain = document.domain;
var the_url = document.URL;

// Tags to mark.
var tag_html = document.getElementsByTagName("html").item(0);
var tag_body = document.getElementsByTagName("body").item(0);

// Keep existing classes.
var preserve_body_class = tag_body.getAttribute("class");

// Add the default class.
var class_html = class_list['default'];

// Is it day?
var hour = new Date().getHours();
if (hour <= 17 && hour >= 7) {
  //day
  var time_class = class_list['daytime'];
} 

// Guarantee no null.
if (!class_html) {
  var class_html = '';
}

/* Domain specific classing.
 *
 * Loop over the sub.domai.ns, looking for the longest matching key.
 * I wanted to itterate cutting off the subdomains, but prototyped it.
 * var make_domain = the_domain.replace(/^[a-zA-Z0-9]+\./, '');
 */
var parts_domain = the_domain.split('.');
var length_domain = parts_domain.length;
var make_domain, match_domain;
for (i = length_domain;i;i--) {
  if (make_domain) {
    make_domain = parts_domain[i-1]+'.'+make_domain;
    if (do_class[make_domain]) {
      match_domain = make_domain;
    }
    if (dont_class[make_domain]) {
      var match_domain = make_domain;
      break;
    }
  } else {
    // assume this is TLD.
    // further assume we don't care about these.
    make_domain = parts_domain[i-1];
  }
}

/* URL specific classing.
 *
 */
var urlParts = the_url.split('/');
var urlLength = urlParts.length;
var makeURL, matchURL, urlPartLength, urlSubPart;
for (i = 0;i < urlLength;i++) {
  if (makeURL) {
    
    // First, check without trailing slash.
    if (doOrDont(makeURL)) {
      matchURL = makeURL;
      break;
    }
    // Then with it.
    makeURL = makeURL+'/';
    if (doOrDont(makeURL)) {
      matchURL = makeURL;
      break;
    }
    
    // Grab this part of the URL...
    if (urlParts[i]) {
      urlPartLength = urlParts[i].length;
      urlSubPart = '';
      
      // Read each character, left to right.
      for (x = 0;x < urlPartLength;x++) {
        urlSubPart = urlSubPart+urlParts[i].charAt(x);
        if (doOrDont(makeURL+urlSubPart)) {
          makeURL = makeURL+urlSubPart;
          break;
        } else if (urlSubPart == urlParts[i]) {
          makeURL = makeURL+urlParts[i];
        }
      }
      
    }
    
    if (do_class[makeURL]) {
      // Most specific match assigns the class.
      matchURL = makeURL;
    }
    
    if (dont_class[makeURL]) {
      // Any match will do.
      matchURL = makeURL;
      break;
    }
    
  } else {
    // assume this is protocol.
    // further assume we don't care about these.
    makeURL = urlParts[i];
  }
}


if (!dont_class[match_domain] && !dont_class[matchURL]) {
  if (dont_class[matchURL]) {
    var class_domain = do_class[matchURL];
  } else {
    var class_domain = do_class[match_domain];
  }
}

if (class_domain) {
  var class_html = class_html+' '+class_domain;
}

if (preserve_body_class) {
  var class_body = class_body+' '+preserve_body_class;
}

if (time_class) {
  var class_html = class_html+' '+time_class;
}

// Do it.
tag_html.setAttribute("class", class_html); 
//tag_body.setAttribute("class", class_html); 


})();