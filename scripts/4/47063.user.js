// ==UserScript==
// @name        Google Reader
// @namespace   http://fluidapp.com
// @description Reader features for Fluid
// @include     http://google.com/reader/*
// @include     http://*.google.com/reader/*
// @version		3.0
// @author      Todd Ditchendorf
// @author		Tanguy de Courson <tanguy@0x7a69.net>
// ==/UserScript==


(function() {
	
    if (!window.fluid) {
        return;
    }
    var focused = true;
	window.onfocus = function(){focused=true;};
	window.onblur = function(){focused=false;};
	
    var fluid_unread = 0;
	var old_fluid_unread = 0
    
    window.fluid.addDockMenuItem("Refresh", function() { refresh(); });
    
    function updateDockBadge() {
        var title = document.title;
        old_fluid_unread = fluid_unread || 0;

        if (title && title.length) {
            var start = title.indexOf("(");
            var end = title.indexOf(")");
            if (start > -1 && end > -1) {
                start++;
                fluid_unread = title.substring(start, end);
            } else {
                fluid_unread = 0;
            }
        }
        
        //set the dock badge
		/*
        if ((fluid_unread || 0) > 0) {
            window.fluid.setDockBadge(fluid_unread);
			
        } else {
            window.fluid.setDockBadge("");  
        }
        */
        //growl if there are more unread items than last time
        if ((fluid_unread || 0) > old_fluid_unread) 
		{
			window.fluid.setDockBadge(fluid_unread);
			if(!focused)
			{
				if(refresh())
					setTimeout(growleachnewnews, 5000);
			}
            fluid.showGrowlNotification({
                title: "Google Reader",
                description: (fluid_unread || "") + " unread item(s)",
                priority: 3,
				onclick: activate_window,
                sticky: false
            });
		
				
			
        }
		else if(fluid_unread == 0)
		{
			window.fluid.setDockBadge(""); 
		}
    }
    setInterval(function(){updateDockBadge();}, 6000);
	
	function refresh()
	{
		//alert(window.fluid.dockBadge);
		var refreshelm = document.getElementById('viewer-refresh');
		
		if(refreshelm)
		{
			var e = document.createEvent('MouseEvents');
			//e.initEvent('click', true, false);
			e.initMouseEvent("click", true, true, window,
			    0, 10, 0, 0, 0, false, false, false, false, 0, null);
			//document.getElementById('viewer-refresh').dispatchEvent(e);
			refreshelm.dispatchEvent(e);
			return true;
		}
		else
			return false;
	}
	function growleachnewnews()
	{
		
		//return;
		var news = getElementsByClassName('entry read');
		for(i=0; i < ((fluid_unread/1)-(old_fluid_unread/1)); i++)
		{
			var feed = news[i].getElementsByClassName('entry-source-title')[0].innerText;
			var preview = news[i].getElementsByClassName('entry-title')[0].innerHTML;
			//alert(i);
			
			fluid.showGrowlNotification({
				title: feed,
				description: preview,
				priority: 1,
				onclick: activate_window,
				identifier: "greader_" + i,
				sticky: false
			});
			
		}
	}
	function activate_window()
	{
		//alert('hi');
		window.fluid.activate();
		window.fluid.unhide()
		this.window.focus();
		window.focus();
		
	}
	function setfocused()
	{
		focused = true;
	}
	function notfocused()
	{
		focused = false;
	}

})();


/* === GETELEMENTSBYCLASSNAME ===
   Developed by Robert Nyman, http://www.robertnyman.com
   Code/licensing: http://code.google.com/p/getelementsbyclassname/
   ============================== */


var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace: null,
            returnElements = [],
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all) ? elm.all: elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
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

/* === //GETELEMENTSBYCLASSNAME === */
