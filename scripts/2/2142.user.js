// ==UserScript==
// @name          Yahoo Mail In Hebrew
// @namespace     Jillian
// @description	  Conveniently compose in Hebrew in Yahoo! Mail (v2.0)
// @include	      http://*.mail.yahoo.com/ym/Compose?*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------

function commonInit(elm, obj)
{
    obj._oldSend_Click = unsafeWindow.Send_Click;
    unsafeWindow.Send_Click = function() {obj.Send_Click(); };
    unsafeWindow.switchBodyLayout = function() {obj.switchBodyLayout(); };
    // can't directly add the html because it breaks the editing frame (in rich mode)
    var div = document.createElement("div");
    div.innerHTML =
        "<input type='checkbox' id='composeHebrew' onclick='switchBodyLayout()'>" +
        "<label for='composeHebrew'> Compose in Hebrew </label>";
    elm.appendChild(div);
}


unsafeWindow.richTextMode = {
    init : function()
    {
        var rte = document.getElementById("rteEditorComposition0");
        if (!rte)
            return false;

        this.body = rte.contentDocument.body;
        commonInit(rte.parentNode, this);

        return true;
    },

    switchBodyLayout : function()
    {
        if (document.getElementById("composeHebrew").checked) {
            this.body.dir = "RTL";
        }
        else {
            this.body.dir = "LTR";
        }
    },
    
    Send_Click : function()
    {
        if (document.getElementById("composeHebrew").checked) {
            this.body.innerHTML = "<div dir='rtl' style='font-family: Arial'>" +
                                    this.body.innerHTML + "</div>";
        }

        this._oldSend_Click();
    }
};

unsafeWindow.plainTextMode = {
    init : function()
    {
        this.body = document.getElementById("bodyfield");
        if (!this.body)
            return false;
        else if (this.body.style.display == "none") {
            // bodyfield invisible means rich edit mode, yet rTM.init failed
            alert("There was a failure in Yahoo! Mail in Hebrew GreaseMonkey script.\n" +
                   "Check http://userscripts.org/scripts/show/2142 for updates");
            return false;
        }

        unsafeWindow.setDocumentCharset = function() {};
        commonInit(this.body.parentNode, this);

        return true;
    },

    switchBodyLayout : function()
    {
        if (document.getElementById("composeHebrew").checked) {
            this.body.dir = "RTL";
            this.body.form.docCharset.value = "windows-1255"; // I'm not sure what Yahoo does with it.
            this.body.form.acceptCharset = "windows-1255";
        }
        else {
            this.body.dir = "LTR";
            this.body.form.docCharset.value = "iso-8859-1";
            this.body.form.acceptCharset = "";
        }
    },
    
    Send_Click : function()
    {
        if (document.getElementById("composeHebrew").checked) {
            var format = document.createElement("input");
            format.type = "hidden";
            format.name = "Format";
            format.checked = true;
            format.value = "html";
            this.body.form.appendChild(format);
            this.body.value = "<pre dir='rtl' style='font-family: Arial'>" +
                                this.body.value + "</pre>";
        }
    
        this._oldSend_Click();
    }
};


// try rich first then fall back to plain text
unsafeWindow.richTextMode.init() || unsafeWindow.plainTextMode.init();
