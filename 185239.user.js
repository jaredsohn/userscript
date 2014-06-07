// Date: 2014-02-23
// Copyright (c) 2013, Hugo van den Berg
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// YOU NEED TO EDIT THE VARIABLE proxyname (SEE BELOW) WITH THE DOMAIN
// FOR YOU INSTITUTIONS EZPROXY / LIBRARY PROXY ....
//
// This script is intended to redirect websites of scientific journals through a
// proxy website by appending the proxyserver address to the hostname. This will
// only work if you have access to such a proxy with the correct credentials.
// This work is very loosely based on the Library EZProxy forwarder by Andrew 
// Perry, [http://userscripts.org/scripts/review/30220]. However this takes a 
// radically different approach by modifying the current URL and leave the URL
// rewriting to the proxyserver. If your proxyserver does not do that, add your 
// proxyserver to the include-directives.
//
//
// ==UserScript==
// @name          University Library Proxy Forwarder
// @version       1.12
// @author        Hugo van den Berg
// @namespace     http://userscripts.org/users/540948
// @description   Inserts a proxy-url into all URLs, going through library proxy for full-text journal access. **** You MUST edit to add your libraries proxy, else it won't work !! ****
// @include       http://*.wiley.com/*
// @include       http://*.sciencedirect.com/*
// @include       http://*.springerlink.com/*
// @include       http://*.springer.com/*
// @include       http://*.umi.com/*
// @include       http://*.blackwell-synergy.com/*
// @include       http://*.nature.com/*
// @include       http://*.tandf.co.uk/*
// @include       http://*.portlandpress.co.uk/*
// @include       http://*.portlandpress.com/*
// @include       http://*.oxfordjournals.org/*
// @include       http://*.bmjjournals.com/*
// @include       http://scitation.aip.org/*
// @include       http://*apc.org/*
// @include       http://*.biophysj.org/*
// @include       http://*.sciencemag.org/*
// @include       http://*.ingentaconnect.com/*
// @include       http://www.ncbi.nlm.nih.gov/*
// @include       http://*.annualreviews.org/*
// @include       http://*.proteinscience.org/*
// @include       http://*.informaworld.com/*
// ==/UserScript==

// PUT YOU INSTITUTIONS PROXY DOMAIN IN HERE
// For instance, if you are at the University of Melbourne, 
// use this proxy name to forward via the Ezproxy service
//var proxyname = ".ezproxy.lib.unimelb.edu.au";
// Utrecht University, The Netherlands, uses the following proxy server:
//var proxyname = ".proxy.library.uu.nl";
var proxyname = ".proxy.library.uu.nl";


// Create a link element to easily edit the current URL
var parser = document.createElement('a');
parser.href = document.URL;
// Make sure we are not already redirected to the proxy
var regex = ".*"+proxyname.replace(/\./g, "\\.")+".*";
if (!parser.href.match(regex) && !document.referrer.match(regex)) {
  // Not redirected, append proxy to hostname and redirect
  parser.host += proxyname;
  window.location.assign(parser.href);
} else {
  // Redirected but proxy included in target websites, 
  // edit hostname where neccesary
  
  // Test once if we are on the PubMed page
  var pubmed = window.location.href.match("/^http:\/\/www\.ncbi\.nlm\.nih\.gov"+proxyname.replace(/\./g, "\\.")+"\/entrez\/query\.fcgi\?/");

  // Retreive all links on the page
  var allLinks = getElementsByTagName("a");
  for (var i = 0; i < allLinks.length; i++) {
    a = allLinks[i];
    
    // The following PubMed exception is edited from Andrew Perry's script
    if ( !pubmed ) {
        a.host += proxyname;
    } else {
      if (a.href.match(/^http:\/\/www\.ncbi\.nlm\.nih\.gov\/entrez\/utils\/lofref\.fcgi\?/) ) {
        a.host += proxyname;
      }
    }
  }
}