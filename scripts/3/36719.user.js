// ==UserScript==
// @name           Google Docs Comment Toggler
// @namespace      www.arthaey.com
// @description    Toggles comments (useful for word counts)
// @include        https://docs.google.com/Doc?id=*
// @include        https://docs.google.com/Doc?docid=*
// ==/UserScript==

window.addEventListener("load", function() {

    // variables that are determined by Google (and thus may need to be updated)
    var EDITOR_FRAME_ID = "wys_frame";
        var toolbar = document.getElementById("editor-toolbar");
        var wordCountMenuItem = document.getElementById("m-wcount");

    var BUTTON_CSS = "goog-toolbar-toggle-button goog-toolbar-button goog-inline-block";
    var BUTTON_OUTER_CSS = "goog-toolbar-button-outer-box goog-inline-block";
    var BUTTON_INNER_CSS = "goog-toolbar-button-inner-box goog-inline-block";

    var BUTTON_SEPARATOR_HTML = "<div id=':t' class='goog-toolbar-separator goog-inline-block' style='-moz-user-select: none;' role='separator'> </div>";

    var MENU_ITEM_CSS = "writely-menubar-item goog-menuitem";
    var MENU_CONTENT_CSS = "goog-menuitem-content";

    var COMMENTS_ONLY_XPATH = "//span[@class='writely-comment']";
    var COMMENTS_H3_XPATH   = "//span[@class='writely-comment'] | //h3 | //h4 | //h5";
    var COMMENTS_H2_XPATH   = "//span[@class='writely-comment'] | //h2 | //h3 | //h4 | //h5";

    // save references to toolbar buttons and menu items that will be created
    var BUTTONS = [];
    var MENU_ITEMS = [];

    function toggleComments(xpath, triggerElement) {
        var editorFrame = document.getElementById(EDITOR_FRAME_ID);
        if (!editorFrame)
            return;

        var editorDocument = editorFrame.contentDocument;
        if (!editorDocument)
            return;

        var comments = editorDocument.evaluate(
            xpath,
            editorDocument,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        var hidden = false;
        for (var i = 0; i < comments.snapshotLength; i++) {
            var comment = comments.snapshotItem(i);

            if (comment.innerHTML) {
                if (!comment.title) // never clobber a non-empty title!
                    comment.title = comment.innerHTML;
                comment.innerHTML = '';
                comment.style.display = "none";
                hidden = true;
            }
            else {
                comment.innerHTML = comment.title;
                comment.title = '';
                comment.style.display = "";
            }
        }

        // rename toolbar buttons
        var button;
        for (var i = 0; i < BUTTONS.length; i++ ) {
            button = BUTTONS[i];
            if (hidden) {
                button.textContent = button.textContent.replace(/Hide/, "Show");
            }
            else {
                button.textContent = button.textContent.replace(/Show/, "Hide");
            }
            button.title = button.textContent;
        }

        // rename menu items
        var menuItem;
        for (var i = 0; i < MENU_ITEMS.length; i++ ) {
            menuItem = MENU_ITEMS[i];
            if (hidden) {
                menuItem.textContent = menuItem.textContent.replace(/Hide/, "Show");
            }
            else {
                menuItem.textContent = menuItem.textContent.replace(/Show/, "Hide");
            }
        }

        // toggle font weight of element
        var fontWeight = triggerElement.style.fontWeight;
        triggerElement.style.fontWeight = (fontWeight == "bold" ? "normal" : "bold");
    }

    function insertAfter(anchorNode, newNode) {
        if (!anchorNode || !newNode) return;
        anchorNode.parentNode.insertBefore(newNode, anchorNode.nextSibling);
    }

    function addGoogleDocsToolbarButtons() {
        var toolbar = document.getElementById("editor-toolbar");
        if (!toolbar) return;

        var button   = createGoogleDocsToolbarButton("Hide Comments", "toggleComments", COMMENTS_ONLY_XPATH);
        var buttonH3 = createGoogleDocsToolbarButton("+H3", "toggleCommentsH3", COMMENTS_H3_XPATH);
        var buttonH2 = createGoogleDocsToolbarButton("+H2", "toggleCommentsH2", COMMENTS_H2_XPATH);

        insertAfter(toolbar.lastChild, button);
        insertAfter(toolbar.lastChild, buttonH3);
        insertAfter(toolbar.lastChild, buttonH2);
    }

    function addGoogleDocsMenuItems() {
        var wordCountMenuItem = document.getElementById("m-wcount");
        if (!wordCountMenuItem) return;

        var menuItem =   createGoogleDocsMenuItem("Hide Comments", "m-togglecomments", COMMENTS_ONLY_XPATH);
        var menuItemH3 = createGoogleDocsMenuItem("Hide Comments + H3", "m-togglecomments-h3", COMMENTS_H3_XPATH);
        var menuItemH2 = createGoogleDocsMenuItem("Hide Comments + H2", "m-togglecomments-h2", COMMENTS_H2_XPATH);

        MENU_ITEMS = [ menuItem, menuItemH3, menuItemH2 ];

        insertAfter(wordCountMenuItem, menuItemH2);
        insertAfter(wordCountMenuItem, menuItemH3);
        insertAfter(wordCountMenuItem, menuItem);
    }

    function createGoogleDocsToolbarButton(text, id, xpath) {
        // create all these elements DOM-wise because...
        var buttonDiv = document.createElement("div");

        buttonDiv.id = id;
        buttonDiv.title = text;
        buttonDiv.className = BUTTON_CSS;

        // attributes specific to Google Docs
        buttonDiv["aria-disabled"] = false;
        buttonDiv.role = "button";

        var outerBox = document.createElement("div");
        outerBox.className = BUTTON_OUTER_CSS;

        var innerBox = document.createElement("div");
        innerBox.className = BUTTON_INNER_CSS;

        // ...we need to call addEventListener on the innermost div element
        var toggleButton = document.createElement("div");
        toggleButton.textContent = text;
        toggleButton.addEventListener("click", function() { toggleComments(xpath, toggleButton) }, true);

        // add a separator to the end of the toolbar
        toolbar.innerHTML += BUTTON_SEPARATOR_HTML;

        // compose and add the "Toggle Comments" button
        innerBox.appendChild(toggleButton);
        outerBox.appendChild(innerBox);
        buttonDiv.appendChild(outerBox);

        BUTTONS.push(toggleButton);
        return buttonDiv;
    }

    function createGoogleDocsMenuItem(text, id, xpath) {
        var toggleMenuItem = document.createElement("div");

        toggleMenuItem.id = id;
        toggleMenuItem.className = MENU_ITEM_CSS;

        var toggleContent = document.createElement("div");
        toggleContent.className = MENU_CONTENT_CSS;

        toggleContent.appendChild(document.createTextNode(text));
        toggleMenuItem.appendChild(toggleContent);

        // attributes specific to Google Docs
        toggleMenuItem.role = "menuitem";
        toggleMenuItem["aria-pressed"] = "false";

        toggleMenuItem.addEventListener("click", function() { toggleComments(xpath, toggleContent) }, true);

        MENU_ITEMS.push(toggleContent);
        return toggleMenuItem;
    }

    function init() {
        addGoogleDocsToolbarButtons();
        addGoogleDocsMenuItems();
    }

    init();

}, true);
