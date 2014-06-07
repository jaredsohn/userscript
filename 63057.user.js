//
// ==UserScript==
// @name           EverNote for Vimperator
// @namespace      http://marlonyao.blogspot.com
// @description    Make EverNote more friendly to Vimperator and keyboard, steal some idea from better EverNote
// @include        http://www.evernote.com/Home*
// ==/UserScript==
//

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;	// Use firebug's console
}

function $(id) {
    return document.getElementById(id) ;
}
var footer = $("footer") ;
var header = $("top");
var footerHeight = footer.offsetHeight;

// hide header and footer
footer.style.display = "none" ;
header.style.display = "none" ;

// press 'W' to toggle the display of header
window.addEventListener("keypress", function(e) {
    if( e.which == 119) // 'W'
        header.style.display = header.style.display == "none" ? "block" : "none" ;
}, true);

window.addEventListener("load", function() {
    addGlobalStyle(
        '#toolbar_buttons div.disabled a { color: gray!important; } '
      + '#toolbar_buttons div a { color: #000; } '
      + '#toolbar_buttons .Done:focus { border: 1px solid yellow;} '
      + '#toolbar_buttons .Done a:focus { color: #36722E; font-size: 120%;} '
    );

    //移动 【搜索】 功能到 【SAVE CHANGE 按钮】的后面
    function move_the_search_box_and_btn ()
    {
        var search_box         = $("searchbox") ;
        var search_button = $("searchbutton") ;
        var save_change_btn = $("filters_info").firstChild ;
        //移动
        insertBefore( save_change_btn , search_button ) ;
        insertBefore( save_change_btn , search_box ) ;
        save_change_btn.style.cssFloat = "left";
        search_box.style.cssFloat = "right";
    }

    function adjustHeight() {
        if (arguments.callee.adjusting)
            return;
        arguments.callee.adjusting = true;

        try {
            var adjustSize = footerHeight-5;

            var col = $("col_wrap");
            incHeight(col, adjustSize);
            var divs = xpath("//div[@id='col_wrap']//div[@style]");
            for (var i = 0; i < divs.length; i++) {
                incHeight(divs[i], adjustSize);
            }
        } finally {
            arguments.callee.adjusting = false;
        }
    }

    function incHeight(elem, size) {
        if (elem.style.height && elem.style.height.match(/.*px$/i)) {
            var h = elem.style.height;
            h = h.slice(0, h.length-2) - 0 + size;
            elem.style.height = h + "px";
        }
    }
    // add links so it is more friendly to Vimperator
    function addLinks() {
        var toolbars = xpath("//div[@id='toolbar_buttons']//div[@class='gwt-Label']");
        toolbars.push($("gwt-uid-1")); // 'sort' toolbar

        for (var i = 0; i < toolbars.length; i++) {
            toolbars[i].innerHTML = "<a href='#' onclick='return false;'>"+toolbars[i].textContent+"</a>";
        }

		var notebooksDiv = $('sn_notebooks');
		notebooksDiv.addEventListener('DOMNodeInserted', function(event) {
				var nbLIs = this.getElementsByTagName("li");
				if (nbLIs.length > 0 && nbLIs[nbLIs.length-1].className == 'edit') { // has loaded the last notebook label
					this.removeEventListener('DOMNodeInserted', arguments.callee, true);
					for (var i = 0; i < nbLIs.length; i++) {
						var nbLabel = nbLIs[i].getElementsByTagName("span")[0];
						nbLabel.innerHTML = "<a href='#' onclick='return false;' style='color:#000'>"+nbLabel.textContent+"</a>";
					}
				}
		}, true);
    }
  
    // modify tabIndex so it is more friendly to keyboard
    function fixTabIndex() {
        // remove all tabIndex under edit_view
        var editView = $('edit_view');
        var elems = xpath("//div[@id='edit_view']//*[@tabindex]")
        for (var i = 0; i < elems.length; i++) {
            elems[i].removeAttribute('tabindex');
        }

        $('edit_title').tabIndex=1;        // set title tabIndex
        var editTags = $('edit_tags');  // set tag tabIndex
        editTags.addEventListener('DOMNodeInserted', function(e) {
            var input = e.target;
            if (input && input.nodeType == 1 && input.nodeName.toUpperCase() == 'INPUT') {
                this.removeEventListener('DOMNodeInserted', arguments.callee, true);  
                input.tabIndex = 1;
            }
        }, true);
        $('edit_content_rte').tabIndex=1;    // set editor tabIndex

		editView.parentNode.addEventListener('DOMAttrModified', function(event) {
			if (event.attrName == 'style' && (!this.style.display || this.style.display == 'block')) {
                var saveTB = xpath("//div[@id='toolbar_buttons']//div[contains(@class,'Done')]")[0];
				saveTB.removeAttribute("tabindex");
                var label = saveTB.getElementsByTagName('span')[0];
                label.innerHTML = "<a href='#' onclick='return false;' tabindex='2'>"+label.textContent+"</a>";

				// focus 'edit title'
				$('edit_title').select();
				$('edit_title').focus();
			}
			event.stopPropagation();
		}, true);
    }

    move_the_search_box_and_btn();
    adjustHeight();
    addLinks();
    fixTabIndex();

    window.addEventListener("resize", function() { window.setTimeout(adjustHeight, 1000);}, true);


// ============= Utility Methods ===========================
    function xpath(query) {
        var a = [];
        var q = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < q.snapshotLength; i++) {
            a.push(q.snapshotItem(i));
        }
        return a;
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function insertBefore( where , item )
    {
        where.parentNode.insertBefore( item,where ) ;
    }
}, true);

