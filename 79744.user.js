// ==UserScript==
// @name           Typepad
// @namespace      http://vivekpuri.com
// @include        http://americancopywriter.typepad.com/
// @include        *.typepad.com*
// @include        *blog.guykawasaki.com*
// @include        http://www.marginalrevolution.com/*
// @include        http://obsidianwings.blogs.com/*
// @include        http://www.env-econ.net/*
// @include        http://informationarbitrage.com/*
// @include        http://ataxingmatter.blogs.com/*
// @include        http://www.hrcapitalist.com/*
// @include        http://www.drewsmarketingminute.com/*
// @include        http://www.brandingstrategyinsider.com/*
// ==/UserScript==

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

function getHref(element){
 	var hrefText = element.getAttribute('href');
 	if(hrefText == null)
		return "";
	if (typeof hrefText == 'string') // !IE
		return hrefText;
	else  // IE
		return hrefText.href;
}

function getClass(element){
 	var classText = element.getAttribute('class');
 	if (typeof classText == 'string') // !IE
		return classText;
	else  // IE
		return element.className;
}

function get_object(id) {
    var object = null;
    if (document.layers) {
        object = document.layers[id];
    } else if (document.all) {
        object = document.all[id];
    } else if (document.getElementById) {
        object = document.getElementById(id);
    }
    return object;
}

function laloadwidget(){
    var links_set = [];
    var links = getElementsByClassName('permalink', "a");
    //alert(links.length);
    if(links.length == 0 ) {
        links = [];
        var links_all = document.getElementsByTagName('a');
        for(link in links_all) {
            if(links_all[link].innerHTML.indexOf('TrackBack') > -1) {
                links.push(links_all[link]);
            } else if (links_all[link].innerHTML.indexOf('Permalink') > -1) {
                links.push(links_all[link]);
            }
        }
    }
    //alert(links.length);
    for(link in links) {
        var node_link = links[link];
        entry_link = getHref(node_link);
        if(entry_link.indexOf("#")) {
            entry_link = entry_link.split('#')[0]
        }
        if(links_set.indexOf(entry_link) > -1) {
            continue;
        }
        links_set.push(entry_link);	
        var new_node = document.createElement("div");
        var new_node_attrib_class = document.createAttribute('class');
        new_node.value = 'linksalpha';
        new_node.innerHTML = '<div style="padding-top:10px;border:1px dotted #DCDCD8;text-align:left;"><iframe src="http://www.linksalpha.com/social?link='+escape(entry_link)+'" height="25px" width="300px" frameborder="0" scrolling="no"></iframe></div>';
        
        var node_footer = null;
        var node_content = null;
        var footer_classes = ['entry-footer', 'footer'];
        
        var node_link_parent = node_link.parentNode;
        //alert(getClass(node_link_parent));
        //if(footer_classes.indexOf(getClass(node_link_parent) > -1)) {
        if(getClass(node_link_parent) == 'entry-footer') {
            node_footer = node_link_parent;
        } else if(getClass(node_link_parent) == 'footer') {
            node_footer = node_link_parent;
        } else {
            node_content_list = getElementsByClassName("entry-content", "div", node_link_parent);
            //alert(node_content_list.length);
            if(node_content_list.length) {
                node_content = node_content_list[0];
            } else {
                node_link_parent = node_link_parent.parentNode;
                if(getClass(node_link_parent) == 'entry-footer') {
                    node_footer = node_link_parent;
                } else {
                    node_content_list = getElementsByClassName("entry-content", "div", node_link_parent);
                    //alert(node_content_list.length);
                    if(node_content_list.length) {
                        node_content = node_content_list[0];
                    }		
                }
            }
        }
        //alert(node_footer);
        if(node_footer != null && node_content == null) {
            var node_entry = node_footer.parentNode;
            var node_content_list = getElementsByClassName("entry-content", "div", node_entry);
            if(node_content_list.length) {
                node_content = node_content_list[0];
            }
        }
        //alert(node_footer);
        if(node_footer != null && node_content == null) {
            node_footer.parentNode.insertBefore(new_node, node_footer);
            continue;
        } 
        if(node_footer == null && node_content == null) {
            node_link.parentNode.insertBefore(new_node, node_link.parentNode.children[node_link.parentNode.children.length]);
            continue;
        }
        node_content.appendChild(new_node);
    }    
};
 
 
var alreadyrunflag=0 //flag to indicate whether target function has already been run
 
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", function(){alreadyrunflag=1; laloadwidget()}, false)
else if (document.all && !window.opera){
  document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>')
  var contentloadtag=document.getElementById("contentloadtag")
  contentloadtag.onreadystatechange=function(){
    if (this.readyState=="complete"){
      alreadyrunflag=1
      laloadwidget()
    }
  }
}
 
//window.onload=function(){
//  setTimeout("if (!alreadyrunflag) laloadwidget()", 0)
//}