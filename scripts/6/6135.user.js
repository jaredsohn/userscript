/******************************************************************************
 *
 * CoralCache Slashdot
 * version 0.9.1
 * 2005-09-07
 * Copyright (c) 2005, Gertjan Van Droogenbroeck
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 ******************************************************************************
 *
 * Everyone has heard about the slashdot effect. Some sites can't take
 * the load, this script adds a Coral Cache link after external links.
 *
 * Gertjan Van Droogenbroeck
 * gertjanvd@gmail.com
 *
 * Changelog:
 *    September 08, 2005
 *     - Instead of replacing the link add a [CC] link after the original link.
 *    September 07, 2005
 *     - Start scripting
 *
 */

// ==UserScript==
// @name          CoralCache Slashdot
// @namespace     
// @description   Adds extra links for Coral Cache
// @include       http://*slashdot.org/*
// ==/UserScript==


(function()
{  
   var links,tmp,tmp2,tmp3,newlink,newlinkelem,newlinktext,newlinkspacer;
   if(links = document.getElementsByTagName('a')){
    var linkscnt = links.length;
    for (var i = 0; i < linkscnt; i++) {
	if(links[i].href){ // no internal links with name  #top
	tmp=links[i].href;
    if(tmp.indexOf('http://')==-1){
	  // do nothing > internal slashdot link
	}else{
	  if(tmp.indexOf('slashdot.org/')>0){
	    // do nothing > internal slashdot link
	  }else{
	    if(tmp.indexOf('.nyud.net:80')>0){
		  // do nothing > already coral cached
		}
		else{
		  if(tmp.indexOf('127.0.0.1')>0||tmp.indexOf('localhost')>0) {
			// do nothing > on localhost
		  }else
		  if(tmp.indexOf('http://')==0){
	        // We have to replace the link
			tmp=tmp.substr(7);
			if(tmp.indexOf('/')){
			  tmp2=tmp.substr(0,tmp.indexOf('/'));
			  tmp3=tmp.substr(tmp.indexOf('/'));
			}else{
			  tmp2=tmp;
			  tmp3='';
			}
			
			newlink='http://'+tmp2+'.nyud.net:8090'+tmp3;
			
			newlinkelem = document.createElement('a');
			newlinkelem.href = newlink;
            		newlinktext = document.createTextNode("[CC]");
            		newlinkelem.appendChild(newlinktext);
			
			newlinkspacer = document.createTextNode(" ");
			
			links[i].parentNode.insertBefore(newlinkelem, links[i].nextSibling);
			links[i].parentNode.insertBefore(newlinkspacer, links[i].nextSibling);
	      }
	    }
	  }
        }
      }
    }
  }
}
)();

