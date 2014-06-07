// ==UserScript==
// @name            TimidScript Library
// @namespace       TimidScript
// @Description     A resource JS library file providing common useful functions to be used by other scripts  
// @version         1.0.3
// ==/UserScript==  

/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/179396

Go to the TSL object for information for what functions are available. The TSL
object is commented out. 

----------------------------------------------
    Version History
----------------------------------------------
1.0.3
 - Added NTFS illegal character replacer
 - escape regular expression function
1.0.2
 - Added scroll bar thickness
1.0.1
 - Initial Release
**********************************************************************************************/


var TimidScriptLibrary =
{
    ALTNTFSChars: [["<", "〉"], [">", "〈"], [":", "："], ['"', "‟"], ["/", "∕"], ["\\", ""], ["?", "？"], ["*", "✳"]],

    removeNode: function (node)
    {
        if (typeof node == "string") node = document.getElementById(node);
        if (node && node.parentElement) node.parentElement.removeChild(node);
    },

    addSyle: function (id, CSS)
    {
        var style = document.createElement("style");
        style.type = "text/css";
        if (id)
        {
            style.id = id;
            TimidScriptLibrary.removeNode(id);
        }

        style.innerHTML = CSS;
        document.head.appendChild(style);
    },

    paddingLeft: function (str, chr, length)
    {
        while (str.length < length)
            str = chr + str;

        return str;
    },

    paddingRight: function (str, chr, length)
    {
        while (str.length < length)
            str = str + chr;

        return str;
    },

    makeStruct: function (names)
    {
        var names = names.split(' ');
        var count = names.length;
        function constructor()
        {
            for (var i = 0; i < count; i++)
            {
                this[names[i]] = null;
            }
        }
        return constructor;
    },

    isMouseEventInClientArea: function (event, element)
    {
        var rect = element.getBoundingClientRect();
        var minX = rect.left + element.clientLeft;

        var x = event.clientX;
        if (x < minX || x >= minX + element.clientWidth) return false;
        var minY = rect.top + element.clientTop;
        var y = event.clientY;
        if (y < minY || y >= minY + element.clientHeight) return false;
        return true;
    },


    getScrollBarThickness: function ()
    {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    },

    
    escapeRegExp: function(str)
    {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },    

    replaceNTFSIllegals: function (str)
    {
        for (var i = 0; i < TimidScriptLibrary.ALTNTFSChars.length; i++)
        {            
            var rx = new RegExp(TimidScriptLibrary.escapeRegExp(TimidScriptLibrary.ALTNTFSChars[i][0]), "gi");
            str = str.replace(rx, TimidScriptLibrary.ALTNTFSChars[i][1]);
        }        

        return str;
    }
}

//#region TimidScript Library Functions
/* 
Copy and paste the commented out code underneath into your script for quick reference 
and auto-complete feature if available. 
*********************************************************************************/

//var TSL = new Object();

////Remove node from document. Accepts id or node object
//TSL.removeNode = function (node) { TimidScriptLibrary.removeNode(node); }

////Add CSS styles to document header
//TSL.addStyle = function (id, CSS) { TimidScriptLibrary.addSyle(id, CSS); }

////General Functions
//TSL.makeStruct = function (names) { return TimidScriptLibrary.makeStruct(names); }

//// Checks if mouse event is within an elements client area
//TSL.isMouseEventInClientArea = function (event, element) { return TimidScriptLibrary.isMouseEventInClientArea(event, element); };

////Returns the thickness of the scrollbar
//TSL.getScrollBarThickness = function () { return TimidScriptLibrary.getScrollBarThickness(); };

////Array containing NTFS illegal characters alternatives
//TSL.ALTNTFSChars = [["<", "〉"], [">", "〈"], [":", "："], ['"', "‟"], ["/", "∕"], ["\\", ""], ["?", ""], ["*", "✳"], ];
//TSL.replaceNTFSIllegals = function (str) { return TimidScriptLibrary.replaceNTFSIllegals(str); };

//TSL.escapeRegExp = function (str) { return TimidScriptLibrary.escapeRegExp(str);}

////String Padding
//String.prototype.lPad = function (chr, length) { return TimidScriptLibrary.paddingLeft(this, chr[0], length); }
//String.prototype.rPad = function (chr, length) { return TimidScriptLibrary.paddingRight(this, chr[0], length); }

/*
*********************************************************************************/
//#endregion



/* Functions you might want to copy completely for auto-complete on returns
*********************************************************************************
function makeStruct (names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = null;
        }
    }
    return constructor;
}
*********************************************************************************/