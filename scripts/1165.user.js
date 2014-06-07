/* 

Flickr Stream Browser
         
version: 0.2
$Id: flickrStreamBrowser.user.js

Copyright (c) 2005, Udi Falkson
Released under the BSD license
http://www.opensource.org/licenses/bsd-license.php

--------------------------------------------------------------------------

This is a Greasemonkey user script, intended for use with Firefox 1.0.2 or 
later. It may work with other versions of Firefox or Mozilla.

To use this software, you must first install the Greasemonkey extension: 

  http://greasemonkey.mozdev.org/
  
Then restart Firefox and open this script in the browser. Select the 
Firefox menu item "Tools : Install User Script". Accept the default 
configuration and install.

To uninstall, go to the menu item Tools : Manage User Scripts, select 
"Flickr Stream Browser", and click Uninstall.

TODO
1)  Does not work for streams that were closed on page load.  Find a way to hook into the "+" event.
2)  Add the ability to function correctly when at the first or last image of the stream.  Currently this does not work.  
*/

/*
VERSION HISTORY
0.2
- Pre-caching of thumbnails added.  T
- Added showing/hiding prev/next icon image when appropriate.

0.1 
- First Release
*/

// ==UserScript==
// @name      Flickr Stream Browser
// @namespace   http://breasy.com/blog/2005/06/28/improving-the-flickr-experience/
// @description   Makes the Flickr stream/set/pool thumbnail browsers more dynamic.  Click on "< prev" and "next >" underneath thumbnails to activate.
// @include     http://www.flickr.com/photos/*
// @include     http://flickr.com/photos/*
// ==/UserScript==


(function() {
    

    //------------------------------------------------------------------------
    // constants
    // http status constants
    var OK = 200
    
    // xmlhttprequest readystate
    var COMPLETE = 4
	
    // misc
    var API_KEY = '522026105751442e1559e61fb7760d8d';
    var DEBUG = false;
     
	 
    //-------------------------------------------------------------------------
    // utility functions
	// borrowed (and slightly altered) with love from the excellent Lickr script
	// you can get lickr at http://brevity.org/code/mozilla/greasemonkey/lickr/
	
    function xpath_single_node(context_node, xpath) {
        return  document.evaluate( 
                     xpath + '[1]',                              
                     context_node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
                ).singleNodeValue;
    }
	
    function xpath_multi_node(context_node, xpath) {
        return  document.evaluate( 
                     xpath,
                     context_node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
                );
    } 
    
    // ultimately stolen from http://persistent.info/greasemonkey/gmail.user.js
    function getObjectMethodClosure(object, method) {
        return function() {
            return object[method](); 
        }
    }

    function getObjectMethodClosure1(object, method) {
        return function(arg) {
            return object[method](arg); 
        }
    }

    // Shorthand
    var elm = getObjectMethodClosure1(document, "createElement");
    var txt = getObjectMethodClosure1(document, "createTextNode");
    
    function css( el, s ) {
        for (var attr in s) {
            el.style[attr] = s[attr];
        }
    }  

    
    // flickr api 
     
    function do_req( method, proc_request, url, referer, data ) {
        var req = new XMLHttpRequest();
        // alert(url);
        req.onreadystatechange = function() { proc_request(req) };
        req.open(method, url );

        if (referer != null) {
            req.setRequestHeader( 'Referer', referer );
        }
        
        if (data != null) {
            req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
            req.send(data);
        } else {
            req.send('');
        }
        
    }
	
    function procException(msg, req) {
        this.msg = msg
        this.req = req
    }
    
    
    // a proc just spins around waiting for the thing to succeed or fail
    // then calls a callback, if we got 200 OK message.
    function make_proc(op_name, ok_cb) {

        return function(req) { 
            
            try {
                // init progress
                document.body.style.cursor = 'progress';
                
                if (req.readyState != COMPLETE) {
                    return;
                }
                
                // if (alert_response) { alert(req.responseText); }
                 
                if( req.status != OK ) {
                    throw new procException( op_name + " request status was '" + req.status + "'", req )
                }

                ok_cb(req);
                
            } catch(e) {
                
                // clean up progress
                document.body.style.cursor = 'default';
                
                if (e instanceof procException) {
                    alert( e.msg );
                    if (DEBUG) {
                        alert(e.req.responseText);
                    }
                } else {
                    throw(e);
                }
            }

            // clean up progress

            document.body.style.cursor = 'default';
        }
    }


    // this is wraps the spinning proc like above,
    // except it parses the flickr api response a little before deciding all is well,
    // and passing control to the all-is-well callback
    function make_flickr_api_proc(op_name, ok_cb, cb_args) {

        function parse_and_ok_cb(req) {
            var rsp = req.responseXML.getElementsByTagName('rsp').item(0);
            if (rsp == null) {
                throw new procException( "Could not understand Flickr's response.", req );
            }
            
            var stat = rsp.getAttribute("stat");
            if (stat == null) {
                throw new procException( "Could not find status of Flickr request", req);
            }
  
            if (stat != 'ok') {
                if (stat == 'fail') {
                    var err_node = rsp.getElementsByTagName('err').item(0);
                    var err_msg = err_node.getAttribute("msg");
                    throw new procException( err_msg, req );
                } else {
                    throw new procException("Unknown error status: '" + stat + "'", req)
                }
            }

            ok_cb(req, rsp, cb_args);
        }

        return make_proc(op_name, parse_and_ok_cb);
    }
    
    
    // construct a flickr api request, with method and args, 
    // if that worked, call callback with request object.
    function flickr_api_call( method, args, ok_cb, cb_args ) {
        
         var url = '/services/rest/?api_key=' + API_KEY;
         url += '&method=' + encodeURIComponent(method);
         
         for (var key in args) {
             url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(args[key])
         }
         
         var proc = make_flickr_api_proc( method, ok_cb, cb_args )
         
         do_req('GET', proc, url, null, null)
    }
	
	/*
	MOVEMENT FUNCTIONS
	*/
	
	//get context function name... none, set or group
	function getContextFunc(s) {
		f = "flickr.photos.getContext";
		if(groupArr[s] != null) {
			gId = new String(groupArr[s]);
			if(gId.indexOf("@") > 0) {
				f = "flickr.groups.pools.getContext";
			} else {
				f = "flickr.photosets.getContext";
			}
		}
		return f;
	}
	
	//get the parameters for the context api call
	function getContextParams(s, ph) {
		p = { 'photo_id' : ph };
		if(groupArr[s] != null) {
			gId = new String(groupArr[s]);
			if(gId.indexOf("@") > 0) {
				p = { 'photo_id' : ph, 'group_id' : gId };
			} else {
				p = { 'photo_id' : ph, 'photoset_id' : gId };
			}
		}
		
		return p;
	}
	
	var activeStream; //placeholder for use in asynchronous response functions
	
	//If they click on a thumbnail, go to page for that thumbnail
	function showImage(img) {
		imgId = img.id;
		dir = imgId.split('_')[2];
		index = 1;
		if(dir == "next") {
			index = 2;
		}
		sIndex = imgId.split('_')[1];
		
		location.href = fsiArr[sIndex][index].href;
	}
	
	//Do we keep the prev and next icons on the screen?
	//and hide them while caching the next image
	function iconDisplay(hideMode) {
		icon = document.getElementById("stream_"+activeStream+"_prev_IconImg");
		if(icon != null) {
			if(fsiArr[activeStream][0] == null || fsiArr[activeStream][0].image == null) {
				icon.style.display = "none";
			} else {
				icon.style.display = "inline";
			}
		}
		
		icon = document.getElementById("stream_"+activeStream+"_next_IconImg");
		if(icon != null) {
			if(fsiArr[activeStream][3] == null || fsiArr[activeStream][3].image == null) {
				icon.style.display = "none";
			} else {
				icon.style.display = "inline";	
			}
		}
	}
	
	//Cache the next image in the given direction
	function cacheImage(sIndex, dir) {
		
		activeStream = sIndex;
		if(dir == "prev") {
			currFSImage = fsiArr[sIndex][1];
			fsiArr[sIndex][0] = new FSImage(0, null, null, null);
		} else {
			currFSImage = fsiArr[sIndex][2];
			fsiArr[sIndex][3] = new FSImage(3, null, null, null);
		}
		
		iconDisplay(false);
		flickr_api_call( getContextFunc(sIndex), getContextParams(sIndex, currFSImage.photoId), applyContext, dir);
	}
	
	function applyContext(req, rsp, dir) {
		var p = xpath_single_node(rsp, "//"+dir+"photo");
		newHref = p.getAttribute("url");
		newPhotoId = p.getAttribute("id");
		
		if(newPhotoId != 0) {
			flickr_api_call( "flickr.photos.getSizes", { 'photo_id' : newPhotoId }, applyImage, dir);
			currBuffer = null;
			if(dir == "prev") {
				currBuffer = fsiArr[activeStream][0];
			} else {
				currBuffer = fsiArr[activeStream][3];
			}
			currBuffer.href = newHref;
			currBuffer.photoId = newPhotoId;
		} else {
			iconDisplay(true);
		}
	}
	
	function applyImage(req, rsp, dir) {
		var thumbnail = xpath_single_node(rsp, "//size[@label='Square']");
		src = thumbnail.getAttribute('source');
		if (thumbnail != null) {
			
			tempImg = new Image();
			tempImg.src = src;
			tempImg.onclick = function() { showImage(this); return true; }
			tempImg.id = "stream_"+activeStream+"_"+dir+"_ThumbImg_buffer";
			tempImg.width = 75;
			tempImg.height = 75;
			
			if(dir == "prev") {
				currBuffer = fsiArr[activeStream][0];
			} else {
				currBuffer = fsiArr[activeStream][3];
			}
			currBuffer.src = src;
			currBuffer.image = tempImg;
			iconDisplay(false);
		}
	}
	
	//Do this when they click on the "<prev" icon below the thumbnail
	function movePrevious(icon) {
		
		iconId = icon.id;
		sIndex = iconId.split('_')[1];
		prevImg = document.getElementById(iconId.replace('Icon', 'Thumb'));
		nextImg = document.getElementById(prevImg.id.replace('prev', 'next'));
		
		fsiArr[sIndex][3] = fsiArr[sIndex][2];
		fsiArr[sIndex][2] = fsiArr[sIndex][1];
		fsiArr[sIndex][1] = fsiArr[sIndex][0];
		fsiArr[sIndex][3].index--;
		fsiArr[sIndex][2].index--;
		fsiArr[sIndex][1].index--;
		
		prevImg.src = fsiArr[sIndex][1].src;
		nextImg.src = fsiArr[sIndex][2].src;
		
		cacheImage(sIndex, "prev");
	}
	
	//Do this when they click on the "<next" icon below the thumbnail
	function moveNext(icon) {
		
		iconId = icon.id;
		sIndex = iconId.split('_')[1];
		nextImg = document.getElementById(iconId.replace('Icon', 'Thumb'));
		prevImg = document.getElementById(nextImg.id.replace('next', 'prev'));
		
		fsiArr[sIndex][0] = fsiArr[sIndex][1];
		fsiArr[sIndex][1] = fsiArr[sIndex][2];
		fsiArr[sIndex][2] = fsiArr[sIndex][3];
		fsiArr[sIndex][2].index--;
		fsiArr[sIndex][1].index--;
		fsiArr[sIndex][0].index--;
		
		prevImg.src = fsiArr[sIndex][1].src;
		nextImg.src = fsiArr[sIndex][2].src;
		
		cacheImage(sIndex, "next");
	}
	
	//Object to hold image and some metadata
	//Used for both offscreen buffer images and main images (4, indexed 0..3)
	function FSImage(index, src, href, photoId) {
		if(src != null) {
			nImg = new Image();
			nImg.src = src;
			nImg.onclick = function() { showImage(this); return true; }
			nImg.id = "stream_"+activeStream+"_"+index+"_ThumbImg";
			nImg.width = 75;
			nImg.height = 75;

			this.image = nImg;
		}
		
		this.index = index;
		this.src = src;
		this.href = href;
		this.photoId = photoId;
	}
	
	// --------------------------------------------------------------------------
	// The meat of the matter
    // --------------------------------------------------------------------------
    // Get all the stream boxes on the page.  Alter onclick events.  Populate prevArr and nextArr.
	
	current_url = new String(location.href);
	s = current_url.split('/');
	mainPhotoId = s[5];
	
	//These arrays hold information about the previous and next images
	var fsiArr = new Array();
	var groupArr = new Array(); //holds pool/set id's for use when getting context
	
    var streamBoxes = xpath_multi_node(document, "//td[@class='LilIcon']");
    if (streamBoxes == null) { return; };
    
	//Loop through the stream boxes
	streamCount = 0;
	while ( (sB = streamBoxes.snapshotItem(streamCount) ) != null){
		sB = sB.parentNode.parentNode; //tbody
		sD = sB.parentNode.parentNode; //containing div
		
		sBLinks = sB.getElementsByTagName("a");
		streamLink = sBLinks[0];
		
		fsiArr[streamCount] = new Array();
		
		if(streamLink.className == "currentContextLink") {
			
			//Get the pool or set id if there is one
			var groupId = null;
			cId = new String(sD.id);
			
			if(cId.indexOf("_set") > 0) {
				groupId = cId.substring(14, cId.length);
			}
			
			if(cId.indexOf("_pool") > 0) {
				groupId = cId.substring(15, cId.length);
			}
			
			groupArr[streamCount] = groupId;
			
			prevThumbLink = sBLinks[1];
			nextThumbLink = sBLinks[2];
			
			if(sBLinks.length > 3) { //Make sure that both thumbnails are there.  
				
				prevImages = prevThumbLink.getElementsByTagName("img");
				prevIconImg = prevImages[0];
				prevThumbImg = prevImages[1];
				
				if(prevImages.length > 0) {
					prevIconImg.id = "stream_"+streamCount+"_prev_IconImg";
					prevThumbImg.id = "stream_"+streamCount+"_prev_ThumbImg";
					
					prevPhotoId = prevThumbImg.src.split('/')[3].split('_')[0];
					prevLinkUrl = prevThumbLink.href;
					
					prevThumbImg.onclick = function() { showImage(this); return true; }
					prevIconImg.onclick = function() { movePrevious(this); return false; }
					
					fsiArr[streamCount][1] = new FSImage(1, prevThumbImg.src, prevLinkUrl, prevPhotoId);
					cacheImage(streamCount, "prev");
				}
				
				nextImages = nextThumbLink.getElementsByTagName("img");
				nextIconImg = nextImages[0];
				nextThumbImg = nextImages[1];
				
				if(nextImages.length > 0) {
					nextIconImg.id = "stream_"+streamCount+"_next_IconImg";
					nextThumbImg.id = "stream_"+streamCount+"_next_ThumbImg";
					
					nextPhotoId = nextThumbImg.src.split('/')[3].split('_')[0];
					nextLinkUrl = nextThumbLink.href;
					
					nextThumbImg.onclick = function() { showImage(this); return true; }
					nextIconImg.onclick = function() { moveNext(this); return false; }
					
					fsiArr[streamCount][2] = new FSImage(2, nextThumbImg.src, nextLinkUrl, nextPhotoId);
					cacheImage(streamCount, "next");
				}
			}
		
		}//currentContextLink
		
		streamCount++;
	  
	}

})();





