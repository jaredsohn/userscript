// ==UserScript==
// @name        Not sure if following...
// @namespace   http://userscripts.org/scripts/show/155951
// @description Shows who is following in your following page.
// @include     http://www.tumblr.com/following
// @include     http://www.tumblr.com/following/*
// @version     2
// ==/UserScript==
var source = 'var blogname = jQuery("#search_form").find(\'input[name="t"]\').val(); '+"\n"+
             'jQuery(\'.name a\').each(function(i, blog){ '+"\n"+
             '	jQuery.ajax({url:\'http://www.tumblr.com/svc/tumblelog/followed_by\', '+"\n"+
             '		type:\'post\','+"\n"+
             '		data:\'tumblelog=\'+blogname+\'&query=\'+jQuery(blog).html(),'+"\n"+
             '		success:function(x){ '+"\n"+
             '			bool = x[\'response\'][\'is_friend\']; '+"\n"+
             '			if(bool==1){ '+"\n"+
             '			var follows = jQuery(\'<div></div>\')'+"\n"+
             '			jQuery(follows).css({ '+"\n"+
             '				fontWeight:\'normal\', '+"\n"+
             '				fontSize:\'12px\', '+"\n"+
             '				color:\'#090\', '+"\n"+
             '				textAlign:\'right\''+"\n"+
             '			}); '+"\n"+
             '			jQuery(follows).text(\'follows you back\') '+"\n"+
             '			jQuery(blog).parent().append(follows); '+"\n"+
             '			} '+"\n"+
             '		} '+"\n"+
             '	}); '+"\n"+
             '});';
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script);