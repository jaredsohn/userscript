// ==UserScript==
// @name           Content Commander
// @namespace      666f6f
// @include        *
// ==/UserScript==

var Translator = function(){
    this.initialize();
};

Translator.prototype = {
	_debug: false,
	log: function(message){
		if (this._debug)
			console.log(message);
	},
    _name: "Translator",
    
    initialize: function(){
        this.log(this._name + ": Thank you master!");
    },
    getDiv: function(originalText){
        this._originalText = originalText;
        this.log(this._name + ": Starts working...");
        this.log(this._name + ": Loads state.");
        this._defaultLanguage = GM_getValue("contentCommander.defaultLanguage", "en");
        
        // Removes the old translation div, if any.
        
        if (typeof(this._divTranslation) != "undefined" && this._divTranslation != null) {
            this.log(this._name + ": Removes the old translation div.");
            this._divTranslation.parentNode.removeChild(this._divTranslation);
        }
        this._divTranslation = document.createElement("div");
        
        // Creates the Commands Panel.
        this.log(this._name + ": Creates the Commands Panel.");
        var divCommands = document.createElement("div");
        divCommands.setAttribute("style", "white-space: nowrap;");
        this._divTranslation.appendChild(divCommands);
        
        this._hlMoreOriginal = document.createElement("a");
        this._hlMoreOriginal.setAttribute("style", "white-space: nowrap");
        this._hlMoreOriginal.setAttribute("title", "Click to open another window with etymology information about the original word");
        divCommands.appendChild(this._hlMoreOriginal);
        
        // Add Separator.
        var lblSeparator1 = document.createElement("span");
        lblSeparator1.innerHTML = " &rarr; ";
        divCommands.appendChild(lblSeparator1);
        
        // Create the language dropdown.
        this.log(this._name + ": Creates the language dropdown.");
        this._ddlLanguages = document.createElement('select');
        this._ddlLanguages.setAttribute("style", "vertical-align: middle");
        this._ddlLanguages.setAttribute("title", "Click to select the language to translate into");
        divCommands.appendChild(this._ddlLanguages);
        
        var i = 0;
        this._ddlLanguages.options[i++] = new Option("Albanian", "sq", false, false);
        this._ddlLanguages.options[i++] = new Option("Arabic", "ar", false, false);
        this._ddlLanguages.options[i++] = new Option("Bulgarian", "bg", false, false);
        this._ddlLanguages.options[i++] = new Option("Catalan", "ca", false, false);
        this._ddlLanguages.options[i++] = new Option("Chinese (Simplified)", "zh-CN", false, false);
        this._ddlLanguages.options[i++] = new Option("Chinese (Traditional)", "zh-TW", false, false);
        this._ddlLanguages.options[i++] = new Option("Croatian", "hr", false, false);
        this._ddlLanguages.options[i++] = new Option("Czech", "cs", false, false);
        this._ddlLanguages.options[i++] = new Option("Danish", "da", false, false);
        this._ddlLanguages.options[i++] = new Option("Dutch", "nl", false, false);
        this._ddlLanguages.options[i++] = new Option("English", "en", false, false);
        this._ddlLanguages.options[i++] = new Option("Estonian", "et", false, false);
        this._ddlLanguages.options[i++] = new Option("Filipino", "tl", false, false);
        this._ddlLanguages.options[i++] = new Option("Finnish", "fi", false, false);
        this._ddlLanguages.options[i++] = new Option("French", "fr", false, false);
        this._ddlLanguages.options[i++] = new Option("Galician", "gl", false, false);
        this._ddlLanguages.options[i++] = new Option("German", "de", false, false);
        this._ddlLanguages.options[i++] = new Option("Greek", "el", false, false);
        this._ddlLanguages.options[i++] = new Option("Hebrew", "iw", false, false);
        this._ddlLanguages.options[i++] = new Option("Hindi", "hi", false, false);
        this._ddlLanguages.options[i++] = new Option("Hungarian", "hu", false, false);
        this._ddlLanguages.options[i++] = new Option("Indonesian", "id", false, false);
        this._ddlLanguages.options[i++] = new Option("Italian", "it", false, false);
        this._ddlLanguages.options[i++] = new Option("Japanese", "ja", false, false);
        this._ddlLanguages.options[i++] = new Option("Korean", "ko", false, false);
        this._ddlLanguages.options[i++] = new Option("Latvian", "lv", false, false);
        this._ddlLanguages.options[i++] = new Option("Lithuanian", "lt", false, false);
        this._ddlLanguages.options[i++] = new Option("Maltese", "mt", false, false);
        this._ddlLanguages.options[i++] = new Option("Norwegian", "no", false, false);
        this._ddlLanguages.options[i++] = new Option("Persian", "fa", false, false);
        this._ddlLanguages.options[i++] = new Option("Polish", "pl", false, false);
        this._ddlLanguages.options[i++] = new Option("Portuguese", "pt", false, false);
        this._ddlLanguages.options[i++] = new Option("Romanian", "ro", false, false);
        this._ddlLanguages.options[i++] = new Option("Russian", "ru", false, false);
        this._ddlLanguages.options[i++] = new Option("Serbian", "sr", false, false);
        this._ddlLanguages.options[i++] = new Option("Slovak", "sk", false, false);
        this._ddlLanguages.options[i++] = new Option("Slovenian", "sl", false, false);
        this._ddlLanguages.options[i++] = new Option("Spanish", "es", false, false);
        this._ddlLanguages.options[i++] = new Option("Swedish", "sv", false, false);
        this._ddlLanguages.options[i++] = new Option("Thai", "th", false, false);
        this._ddlLanguages.options[i++] = new Option("Turkish", "tr", false, false);
        this._ddlLanguages.options[i++] = new Option("Ukrainian", "uk", false, false);
        this._ddlLanguages.options[i++] = new Option("Vietnamese", "vi", false, false);
        
        // Preselects the default language.
        this.log(this._name + ": Preselects the default language.");
        var options = this._ddlLanguages.getElementsByTagName('option');
        for (i = 0; i <= options.length; i++) {
            if (options[i].value == this._defaultLanguage) {
                this._ddlLanguages.selectedIndex = i;
                break;
            }
        }
        
        // Add one more separator.
        var lblSeparator2 = document.createElement("span");
        lblSeparator2.innerHTML = " | ";
        divCommands.appendChild(lblSeparator2);
        
        // Create the etymology hyperlink.
        this._hlMoreTranslated = document.createElement("a");
        this._hlMoreTranslated.setAttribute("style", "white-space: nowrap");
        this._hlMoreTranslated.setAttribute("title", "Click to open another window with etymology information about the translated word");
        divCommands.appendChild(this._hlMoreTranslated);
        
        // Finishes with the commands panel.
        this.log(this._name + ": Finishes with the commands panel.");
        
        // Add horizontal separator.
        this._divTranslation.appendChild(document.createElement("hr"));
        
        // Creates the translation span.
        this.log(this._name + ": Creates the translation span.");
        
        this._lblTranslation = document.createElement("span");
        this._divTranslation.appendChild(this._lblTranslation);
        
        // self variable will be used in the closures bellow.
        // http://stackoverflow.com/questions/183214/javascript-callback-scope
        var self = this;
        if (!this._script) {
        
            // Include the google ajax language api script.
            unsafeWindow.doneLoadingJSAPI = function(){
                unsafeWindow.google.load('language', '1', {
                    "callback": function(){
                        self.log(self._name + ": Loaded the Google JS API.");
                        self.gapiHook.call(self);
                    }
                });
            };
            
            this._script = document.createElement('script');
            this._script.src = 'http://www.google.com/jsapi?callback=doneLoadingJSAPI';
            this._script.type = "text/javascript";
            document.getElementsByTagName('head')[0].appendChild(this._script);
        }
        else {
            this.gapiHook();
        }
        
        this.log(this._name + ": Will rest now.");
        
        return this._divTranslation;
    },
    
    gapiHook: function(){
    
        var self = this;
        
        var updateTranslation = function(resultTranslation){
            self.log(self._name + ": Found translation.");
            if (resultTranslation.translation) {
                // If translation exists, display the translation box with the translation.
                self._lblTranslation.innerHTML = resultTranslation.translation;
                
                self._hlMoreTranslated.href = "javascript:window.open('http://" + self._defaultLanguage + ".thefreedictionary.com/" + resultTranslation.translation + "', '_hlMoreTranslated', 'width=1024,height=700,menubar=0,toolbar=0,status=0,location=0,resizable=1,scrollbars=1');void(0);";
                self._hlMoreTranslated.innerHTML = "Dictionary (" + self._defaultLanguage + ")";
            }
        };
        
        var detectLanguageCallback = function(resultDetectLanguage){
            self.log(self._name + ": Detected language.");
            var resultLanguage = resultDetectLanguage.language;
            
            self._hlMoreOriginal.href = "javascript:window.open('http://" + resultLanguage + ".thefreedictionary.com/" + self._originalText + "', '_hlMoreOriginal', 'width=1024,height=700,menubar=0,toolbar=0,status=0,location=0,resizable=1,scrollbars=1');void(0);";
            self._hlMoreOriginal.innerHTML = "Dictionary (" + resultLanguage + ")";
            
            // Detect the language of the hightlighted text.
            unsafeWindow.google.language.translate(self._originalText, resultLanguage, self._defaultLanguage, updateTranslation);
        };
        
        
        this._ddlLanguages.addEventListener("change", function(e){
            self.log(self._name + ": Target language changed.");
            // Save state.
            GM_setValue("contentCommander.defaultLanguage", self._ddlLanguages.value);
            self._defaultLanguage = GM_getValue("contentCommander.defaultLanguage", "en");
            unsafeWindow.google.language.detect(self._originalText, detectLanguageCallback);
        }, false);
        
        // Define language callback function.
        unsafeWindow.google.language.detect(this._originalText, detectLanguageCallback);
    },
};

var ContentCommander = function(){

    this.initialize();
    
};

ContentCommander.prototype = {
	_debug: false,
	log: function(message){
		if (this._debug)
			console.log(message);
	},
    _name: "Content Commander",
    initialize: function(){
    
        this.log(this._name + ": My master ressurected me. Thank you master!");
        
        // Initialize options.
        this._requireAlt = GM_getValue("contentCommander.requireAltKey", false);
        
        // Create the main div.
        this._divMain = document.createElement("div");
        this._divMain.setAttribute("style", "position: absolute; display: none; z-index: 1000; border: solid 0.5px Blue; background-color: White; padding: 5pt; color: Black;");
        document.body.appendChild(this._divMain);
        
        // Add Separator.
        this._divMain.appendChild(document.createElement("hr"));
        
        var divOptions = document.createElement("div");
        this._divMain.appendChild(divOptions);
        
        // Create the Require checkbox and it's label.
        this._cbRequireAlt = document.createElement("input");
        this._cbRequireAlt.setAttribute("id", "contentCommander_cbRequireAlt"); // This is necessary for label bellow.
        this._cbRequireAlt.type = "checkbox";
        this._cbRequireAlt.setAttribute("style", "vertical-align: middle");
        this._cbRequireAlt.checked = this._requireAlt;
        divOptions.appendChild(this._cbRequireAlt);
        
        var lblRequireAlt = document.createElement("label");
        lblRequireAlt.setAttribute("for", "contentCommander_cbRequireAlt");
        lblRequireAlt.innerHTML = "Require Alt Key";
        lblRequireAlt.setAttribute("title", "Select to require the Alt key to be pressed for this dialog to popup");
        divOptions.appendChild(lblRequireAlt);
        
        // self will be used in closures.
        var self = this;
        this._cbRequireAlt.addEventListener("change", function(e){
            GM_setValue("contentCommander.requireAltKey", self._cbRequireAlt.checked);
            self._requireAlt = GM_getValue("contentCommander.requireAltKey", true);
            this.log(this._name + ": Saves default require Alt checkbox value.");
        }, false);
        
        // Register event listeners.
        window.addEventListener("mouseup", function(e){
            if (e.target == self._divMain) 
                return;
            
            var elms = self._divMain.getElementsByTagName('*');
            for (i = 0; i <= elms.length; i++) 
                if (e.target == elms[i]) 
                    return;
            
            self._divMain.style.display = "none";
            self._originalText = window.getSelection().toString();
            if ((!e.altKey && self._requireAlt) || self._originalText == "") 
                return;
            
            self._divMain.style.left = (e.clientX + window.scrollX + 10).toString() + "px";
            self._divMain.style.top = (e.clientY + window.scrollY + 10).toString() + "px";
            self._divMain.style.display = "inline";
            
            if (!self._translator) {
                self.log(self._name + " creates a translator.");
                self._translator = new Translator();
            }
            self._divMain.insertBefore(self._translator.getDiv(self._originalText), self._divMain.firstChild);
            
        }, false);
    },
};

var cm = new ContentCommander();