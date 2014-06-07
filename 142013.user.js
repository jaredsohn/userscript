// ==UserScript==
// @name           Cloud Docs Viewer
// @version        4.1.1pre
// @author         Deekshith Allamaneni
// @namespace      http://www.deekshith.in/
// @description    Developer (unstable) version of Docs Online Viewer. Open documents and files directly in your browser using online services like Google Docs Viewer, Zoho Viewer, etc.
// @include        *
// @exclude        http://www.mediafire.com/*
// @copyright 2012, Deekshith Allamaneni (http://www.deekshith.in)
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @contributor Supriyo Biswas
// @contributor Cytochrome
// @contributor Mike Cupcake (http://userscripts.org/users/mikecupcake)
// ==/UserScript==+


/*

___________________________________________________________


 Author:          Deekshith Allamaneni
 Support Website: <http://www.deekshith.in>
 Support Email:   dkh dot hyd at gmail dot com
 For quick support visit: <http://www.facebook.com/deekshithallamaneni>
 Userscripts.org URL: <http://userscripts.org/scripts/show/127774>
___________________________________________________________
 
Developers and Contributors:
	1. Deekshith Allamaneni
		Author and maintainer of this project.
	2. Supriyo Biswas
		Made many tweaks to the script including New icon, replacing external icon URL with DATA URI, Improved readability ogf the script and helped remove redundancies, and many more small but significant and important usability and developer friendly changes.
		All the work of the contributors will be documented on my blog and on the discussion section of userscripts.org.
	3. Cytochrome
		Contributed code for mouse-over-panels for google docs viewer. This has improved the usability of the script.
	4. Mike Cupcake
 		Mike has re-written this script based on Docs Online Viewer 2.0.1 and improved its performance. Mike's contribution to the script not only improved its performance but also made the code easy to debug and maintain.
 		http://userscripts.org/users/mikecupcake
	5. Arpit Kumar
 		Arpit's code was the idea on which Docs Online Viewer was originally based. Although most part of the code by Arpit is now replaced with a more efficient code, his contribution to this project has helped a lot.
 		http://blog.arpitnext.com/
	6. Abkeeper
 		Abkeeper has packaged this script as an addon for Maxthon browser. http://userscripts.org/users/462160
	7. Why not you?
 		You are welcome and encourages to work on the code. It is neatly structured and open for you to hack on it. You can customize it to your needs or improve it. I will be very thankful to you if you can contribute the changes you've made to it.
___________________________________________________________
 
 Version 4.1.0 Release Notes
  1. new icon with Data URI
  2. Mouse Over Panels for google docs viewer
  3. Many other usability tweaks.

___________________________________________________________

 Docs Online Viewer - Opens all the supported files publicly available online using online services.
 
 Copyright (C) 2012 Deekshith Allamaneni
 
 This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 Icon used is from the Crystal Clear icon set <http://www.everaldo.com/crystal/>, under the GNU General Public License, as stated here <http://www.everaldo.com/crystal/?action=license>

___________________________________________________________
	
*/

var docLinks = document.links;
var fileTypes1 = ["doc","pdf","docx","xls","xlsx","ppt","pps","pptx","eps","ps","tif","tiff","ai","psd","pages","dxf","ttf","xps","odt","odp","rtf","csv","ods","wpd","sxi","sxc","sxw"];
var fileTypes2 = ["zip","rar"];
var doCheck = true;

/*
// This code is under development. It is used to block unsupported URLS.
//var block_sites = 'adf.ly,docs.google.com,viewer.zoho.com,mediafire.com,office.live.com,springerlink.com,ziddu.com,rapidshare.com,ieee.org,easy-share.com,asaha.com,issuu.com,pdfanddownload.info,downarchive.com,topsy.com,jerslater.com,4shared.com,uploading.com,filepost.com,sourceforge.net';


*/

if(!checkIfDOV()){
	checkLinks();
	setupListener();
}

function checkIfDOV(){
	var url = window.location.href;
	
	if(url.indexOf("https://docs.google.com/viewer?")==0 )
	{	// MouseoverPanels will be activated only if google docs viewer is opened through Docs Online Viewer. This avoids conflicts when you are opening directly and other cases.
		if(getVar('dov')==1)
		{
			mouseOverPanelsForGDV();
		}
		return true;
	}
	else
	{
		return false;
	}
}

function checkLinks()
{
	var supportedFileFormat=0;
	for (var i = 0; i < docLinks.length; ++i) 
	{
		supportedFileFormat=0;
		if (docLinks[i].host != "docs.google.com" && !docLinks[i].docView){
			for (var i2 = 0; i2 < fileTypes1.length; i2++) {
				var url = stripQuery(docLinks[i]);
				if (endsWith(url, '.' + fileTypes1[i2]))
				{
				   changeLink(docLinks[i], 1, fileTypes1[i2]);
				   break;
				}
			}
			if (supportedFileFormat == 0)
			{
				for (var i2 = 0; i2 < fileTypes2.length; i2++)
				{
					var url = stripQuery(docLinks[i]);
					if (endsWith(url, '.' + fileTypes2[i2]))
					{
						changeLink(docLinks[i], 2, fileTypes2[i2]);
						break;
					}
				}
			}
       }
    // The link which is checked is flagged so that it is not repeatedly checked again.
	docLinks[i].docView=true;
   }
// console.log("...............................................................................");
}


function stripQuery(link) 
{	// remove any ?query in the URL	    
	return link.protocol + '//' + link.hostname + link.pathname; 
}


function endsWith(str, suffix) 
{  //  check if string has suffix 
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function changeLink(link, fileTypeCategory, fileExtension) { 
	var viewLink = document.createElement('a');
	if(fileTypeCategory == 1){
		viewLink.href = "https://docs.google.com/viewer?url="+encodeURI(stripQuery(link))+"&embedded=false&chrome=false&dov=1";
		/*
			Parameter description:
				embedded= <true> or <false>
					This is a standard google docs parameter
					true: It opens the document in embedded mode
					false: It opens the document in standard mode
				dov=true
					This is a custom parameter added by the script to tell that this URL is opened by Docs Online Viewer. This avoids conflicts while using any similar scripts (esp in the case of mouseover).
				mouseoverpanels = <true> or <false>
					This is a custom parameter.
					If value is true, then the script enables mouseover panels.
					This is to avoid conflicts when opening links with google docs by other scripts or directly.
					
						
			Also, some users expressed their concern that if custom parameters (dov and mouseoverpanels) are used for tracking. These parameters are used to identify if the link is opened using this script or not to avoid a few conflicts between scripts, etc. 
			But no information of any kind is collected or transmitted either by the script or the author or contributors regarding the users. It is just to improve usability.
			Any better approach than this? May be using cookies is better? Please tell me if you find a better approach than using custom parameters.
			
		*/
	}else if(fileTypeCategory == 2){
		viewLink.href = "https://docs.google.com/viewer?url="+encodeURI(stripQuery(link))+"&embedded=false&chrome=false&dov=2";
		/* 
			This seems to be a redundant category but not. Notice that "mouseoverpanels=false" is set to false.
			mover over panels are not necessary for zip or rar files. Especially because it does not have a preview pane. Also it is found to be slightly unstable for these file types.
		*/
	}
	//viewLink.docView=true; -> This line is removed in this version but still doubt if it can really be removed.
	viewLink.title="View \""+fileExtension+"\" file online\n-Docs Online Viewer";
	var ico = document.createElement("img");
	ico.src =  'data:image/png;base64,' +
		'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';
	//"data:image/png;base64,iVBORw0K...." This is a Data URI. This approach is better than using external URL.
	// Adjusts the margin of the icon to the given number of pixels (3 to 5px is advisable)
	ico.style.marginLeft = "3px";
	viewLink.appendChild(ico);
	// Sets the icon link to open in new tab
    viewLink.setAttribute("target", "_blank");    
    // Append the icon beside the link
	link.parentNode.insertBefore(viewLink , link.nextSibling);
}


function mouseOverPanelsForGDV()
{	//This function is not yet verified for stability and security
    var $, $$;
    var config = {
        sensor: { // condition to show
            menu:  function(e){ return (e.clientY < 32); },
            thumb: function(e){ return (e.clientX < 32); }
        },
        get_menu_nodes: function(){
            return ([
                $("#docs-header").parentNode,
                $("#gview-menu"),
                $("#controlbar"),
                $("#docs-menu-shield")
            ].concat($$("div.goog-menu")));
        }
    };
    
    function toArray(e){ return Array.prototype.slice.apply(e); }
    function objectOverride(){
        var ar = toArray(arguments);
        return ar.length > 0 ? (ar.reverse().reduce(function(d,s){
            for(var i in s){ d[i]=s[i]; }
            return d;
        })) : null;
    }
    function appendStyle(x){
        var S = document.createElement("style");
        S.setAttribute("type","text/css");
        S.appendChild(document.createTextNode(x));
        $("head").appendChild(S);
    }

    function arrayOfClassName(el){
        return (el.getAttribute("class") || "")
            .split(/\s+/g).filter(function(e){return e;});
    }

    function classNameAsArray(cl){
        if     ( cl.constructor == String ){ cl = [cl];  }
        else if( cl.constructor != Array ) { cl = ([]); }
        return cl;
    }

    function getElemClassMethodMod(modifier){
        var ne = function(x){ return function(e){return e!=x;}; };
        return (function(el,cl){
            var a = [],E=arrayOfClassName(el);
            classNameAsArray(cl).forEach(function(e){
                a = modifier(E,e,ne(e));
            });
            el.setAttribute("class",a.join(" "));
            return true;
        });
    }

    var addClass = getElemClassMethodMod(function(arr,target,ne){
        if( arr.every(ne) ){ arr.push(target); } return arr;
    });
    
    function hasClass(node,cls){
        return (arrayOfClassName(node)
            .some(function(e){return cls==e;}));
    }

    var removeClass = getElemClassMethodMod(function(arr,cls,ne){
        return arr.filter(ne);
    });

    var isString = function(x){ return x && x.constructor === String; };
    $ = function(x){
        return ( ( isString(x) && document.querySelector(x) ) ||
                 ( isNode(x) && x ) ||
                null );
    };
    $$ = function(x){
        if( isString(x) ){
            return toArray(document.querySelectorAll(x));
        } 
        var xx = $(x);
        return (xx && [xx]) || [];
    };
    function isNode(e){ return ( e && e.nodeName && e.nodeName.charAt(0) != "#" ); }
    function getNodeMover(f){
        return (function(){
            var es  = toArray(arguments).map($);
            var dst = ( es.length && es.pop() );
            ( dst && es.filter(isNode).forEach(function(x){f(dst,x);}) );
            return dst || null;
        });
    }
    var moveToLast  = getNodeMover(function(d,s){d.appendChild(s);});
    var moveToFirst = getNodeMover(function(d,s){
        var parent  = s.parentNode || document.body;
        if( d.hasChildNodes() ){ parent.insertBefore(s,d.firstChild); }
        else{ moveToLast(d,s);}
    });

    var getStyleTmplSetter = function(x){
        return (function(e){ objectOverride(x,e.style); return e;});};

    var styleTmpl = {
        fix0: getStyleTmplSetter({ top:"0px", left:"0px", position: "fixed" }),
        pos0: getStyleTmplSetter({ top:"0px", left:"0px"}),
        abs0: getStyleTmplSetter({ position: "absolute", top:"0px", left:"0px"}),
        fix:  getStyleTmplSetter({ position: "fixed" }),
        abs:  getStyleTmplSetter({ position: "absolute" }),
    };

    function hide(e){
        removeClass(e,"panelFadeIn");
        addClass(e,"panelFadeOut");
    }
    function show(e){
        removeClass(e,"panelFadeOut");
        addClass(e,"panelFadeIn");
    }
    
    var getLocalNode;  //   = function(e){ return nodes[e]; };
    var getStyleSetter = function(x,y){
        return (function(e){e.style[x]=y;return e;}); };

    var _exit = function(){};
    
    function _main(cf){
        
        appendStyle([
            ".panelFadeIn,",
            ".panelFadeOut {",
            "    -webkit-transition-property: opacity,visibility;",
            "    -webkit-transition-duration: .2s;",
            "}",
            ".panelFadeIn {",
            "    opacity: 1;",
            "    visibility: visible;",
            "}",
            ".panelFadeOut {",
            "    opacity: 0;",
            "    visibility: hidden;",
            "}",
            ".thumb-pane, #thumb-pane-lower, #us-menu-pane, #controlbar {",
            "    border-radius: 10px;",
            "}",
            ".thumb-pane-lower, #us-menu-pane, #controlbar {",
            "    border: 3px solid #aaa;",
            "    border-style: none solid none none;",
            "}",
            ".thumb-pane, .thumb-pane-lower {",
            "    border-radius: 0px 10px 10px 0px",
            "}",
            ".thumb-pane-lower {",
            "    border-style: none solid none none;",
            "}",
            "#us-menu-pane, #controlbar {",
            "    border-radius: 0px 0px 10px 10px;",
            "    border-style: none none solid none;",
            "}"].join("\n")
        );

        var shown = {
            menu:  false,
            thumb: false
        };
        
        var menuNodes = cf.get_menu_nodes();

        var nodes = {
            menu:  moveToLast.apply(this,menuNodes.concat([document.createElement("div")])),
            thumb: $("#thumb-pane"), // document.createElement("div"),
            thumb_low: $("#thumb-pane-lower"),
            content:   $("#content-pane")
        };

        getLocalNode = function(e){ return nodes[e]; };

        nodes.menu.style.backgroundColor =
            document.body.style.backgroundColor || "#ffffff";
        nodes.menu.setAttribute("id","us-menu-pane");
    
        var sensor = cf.sensor;
        var mouseMoveListener = function(e){
            // return if any floating element has already shown.
            for( var nd in sensor ){
                if( shown[nd] ){ return true; }
            }
            for( var nd in sensor ){
                if( nd in nodes && sensor[nd](e) ){
                    show(nodes[nd]);
                    return shown[nd] = true;
                }
            }
            return true;
        };
    
        var getMouseOut = function(e){
            if( !(e in nodes) ){ return function(){}; }
            return (function(){
                if(shown[e]){ hide(nodes[e]); shown[e]=false; }
            });
        };

        ["menu","content","thumb"]
        .map(getLocalNode)
        .map(styleTmpl.fix0);

        ["menu","thumb"]
        .map(function(e){
            $("#page-pane").addEventListener("mouseover",getMouseOut(e),true);
            return e;
        })
        .map(getLocalNode)
        .forEach(function(e){
            document.body.appendChild(e);
            hide(e);
        });
    
        $("#page-pane").addEventListener("mouseover",resizeListener,true);
        document.body.addEventListener("mousemove",mouseMoveListener,true);
        
        resizeListener();
        nodes.content.addEventListener("DOMAttrModified", function(e){
            ( e.attrName == "style" ) && resizeListener();
        }, false);
    }
    
    var resizeListener = function(){
        var B = document.body;
        var setWidth  = getStyleSetter("width", B.clientWidth +"px");
        var setHeight = getStyleSetter("height",B.clientHeight+"px");

        [ "content", "thumb", "thumb_low" ]
        .map(getLocalNode)
        .forEach(setHeight);
        
        [ "thumb", "menu", "content" ]
        .map(getLocalNode)
        .map(styleTmpl.pos0)
        .slice(1)
        .map(setWidth);

        var C = $("#controlbar");
        getLocalNode("menu").style.height =
            (C.offsetTop + C.offsetHeight)+"px";
        
        return false;
    };
    _main(config);

}


function getVar(name)
{
	get_string = document.location.search;         
	return_value = '';
	do 
	{ //This loop is made to catch all instances of any get variable.
		name_index = get_string.indexOf(name + '=');
		if(name_index != -1)
		{
			get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
			end_of_value = get_string.indexOf('&');
			if(end_of_value != -1)                
				value = get_string.substr(0, end_of_value);                
			else                
				value = get_string;                
                
			if(return_value == '' || value == '')
				return_value += value;
			else
				return_value += ', ' + value;
		}
	} while(name_index != -1);

	//Restores all the blank spaces.
	space = return_value.indexOf('+');
	while(space != -1)
	{ 
		return_value = return_value.substr(0, space) + ' ' + 
		return_value.substr(space + 1, return_value.length);
		space = return_value.indexOf('+');
	}
          
	return(return_value);        
}

function setupListener()
{
	document.addEventListener('DOMNodeInserted',function(e)
	{
		if (doCheck)
		{
			doCheck = false;
			setTimeout(function(){checkLinks();doCheck = true;}, 1000);
		} 
  },false);
}
