// ==UserScript==
// @name        Tumblr Queue - What am I sharing?
// @namespace   http://userscripts.org/scripts/show/166028
// @description Labels queued posts to know whether sharing to Facebook and Twitter.
// @include     http://www.tumblr.com/blog/*/queue
// @version     1
// ==/UserScript==
var source = 'window.form_key = $$(\'body\')[0].readAttribute(\'data-form-key\'); '+"\n"+
             'window.read_shares = function(){ '+"\n"+
             ' $$(\'li.post\').each(function(post){ '+"\n"+
             ' if(post.select(\'span.share\').length==0 && post.readAttribute(\'id\')!=\'new_post\'){ '+"\n"+
             ' var share_box = new Element(\'span\'); '+"\n"+
             ' share_box.addClassName(\'share\'); '+"\n"+
             ' share_box.setStyle({fontSize:\'11px\',fontWeight:\'bold\',color:\'#999999\'}); '+"\n"+
             ' share_box.insert(\'Sharing: \'); '+"\n"+
             ' new Ajax.Request("http://www.tumblr.com/svc/post/fetch",{ '+"\n"+
             ' method:\'post\', '+"\n"+
             ' postBody: \'{"post_id":\'+post.readAttribute(\'data-post-id\')+\',"post_type":false,"form_key":"\'+window.form_key+\'"}\', '+"\n"+
             ' onSuccess: function(x){ '+"\n"+
             ' eval("var knot = "+x.responseText); '+"\n"+
             ' var any = 0; '+"\n"+
             ' if(knot["post"]["send_to_twitter"]==true){ '+"\n"+
             ' any++; '+"\n"+
             ' share_box.insert(\'<span style="color:#339999;">Twitter</span>,&nbsp;\'); '+"\n"+
             ' } '+"\n"+
             ' if(knot["post"]["send_to_fbog"]==true){ '+"\n"+
             ' any++; '+"\n"+
             ' share_box.insert(\'<span style="color:#0099ff;">Facebook</span>\'); '+"\n"+
             ' } '+"\n"+
             ' if(any==0){ '+"\n"+
             ' share_box.insert(\'None\'); '+"\n"+
             ' } '+"\n"+
             ' post.insert(share_box); '+"\n"+
             ' }, '+"\n"+
             ' onFailure: function(){ '+"\n"+
             ' share_box.insert(\'error\'); '+"\n"+
             ' post.insert(share_box); '+"\n"+
             ' } '+"\n"+
             ' }); '+"\n"+
             ' } '+"\n"+
             ' }); '+"\n"+
             '} '+"\n"+
             'if(typeof window.after_auto_paginate==\'function\'){ '+"\n"+
             ' window.after_auto_paginate = (function() { '+"\n"+
             ' var cached_function = window.after_auto_paginate; '+"\n"+
             ' return function(){ '+"\n"+
             ' cached_function.apply(this, arguments); '+"\n"+
             ' window.read_shares(); '+"\n"+
             ' }; '+"\n"+
             ' }()); '+"\n"+
             '}else{ '+"\n"+
             ' window.after_auto_paginate = function() { '+"\n"+
             ' window.read_shares(); '+"\n"+
             ' } '+"\n"+
             '} '+"\n"+
             'window.onload = window.read_shares;';

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script); 