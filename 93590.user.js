// ==UserScript==
// @name           ColorFont
// @namespace      Starrow
// @description    Set your favorite font and background color.
// @include        *
// ==/UserScript==

(function colorFont(){
    var defColor = '#333333', defBGColor = '#eeeeee';
    var ORIGINAL_STYLE = 'original_style';
    var NO_INLINE_STYLE = 'no inline style';
    
    GM_registerMenuCommand('ColorFont -> Set forecolor', function(){
        var color = GM_getValue('color', defColor);
        var msg = 'Please set your favorite forecolor.';
        color = window.prompt(msg, color);
        if (color !== null) 
            GM_setValue('color', color);
    });
    
    GM_registerMenuCommand('ColorFont -> Set background color', function(){
        var color = GM_getValue('bgColor', defBGColor);
        var msg = 'Please set your favorite background color.';
        color = window.prompt(msg, color);
        if (color !== null) 
            GM_setValue('bgColor', color);
    });
    
    GM_registerMenuCommand('ColorFont -> Apply my color', applyStyle);
    
    GM_registerMenuCommand('ColorFont -> Restore original color', function(){
        var sel = window.getSelection();
        for (var i = 0, range, container, style; i < sel.rangeCount; i++) {
            range = sel.getRangeAt(i);
            container = range.startContainer;
            container = ancestorElem(container);
            if (container.hasAttribute(ORIGINAL_STYLE)) {
                //setting style to an invalid value e.g. NO_INLINE_STYLE, equals setting it to an empty string. 
                container.setAttribute('style', container.getAttribute(ORIGINAL_STYLE));
                container.removeAttribute(ORIGINAL_STYLE);
            }
        }
    });
    
	function modifyPage(){
		var ps=document.getElementsByTagName('p');
		for (var i=0, node; i<ps.length; i++){
			node=ps[i];
			if (node.textContent.length > 45) {
				stylize(node);
			}
		}
	}
	
    function applyStyle(){
        var sel = window.getSelection();
        for (var i = 0, range, container, style; i < sel.rangeCount; i++) {
            range = sel.getRangeAt(i);
            //use startContainer instead of commonAncestorContainer to get the closest node.
            container = range.startContainer;
            container = ancestorElem(container);
            stylize(container);
        }
    }
    
    function stylize(node){
        var color = GM_getValue('color', defColor);
        var bgColor = GM_getValue('bgColor', defBGColor);
        
        if (node.hasAttribute('style')) {
            node.setAttribute(ORIGINAL_STYLE, node.getAttribute('style'));
        }
        else {
            node.setAttribute(ORIGINAL_STYLE, NO_INLINE_STYLE);
        }
        node.style.color = color;
        node.style.backgroundColor = bgColor;
        node.style.lineHeight = 2;
    }
    
    //get the closest ancestor Element.
    function ancestorElem(node){
        if (node.nodeType === 1) {
            return node;
        }
        else {
            return ancestorElem(node.parentNode);
        }
    }
	
	//GM_addStyle("body { line-height:2;color:red } ");
	modifyPage();
})();
