// ==UserScript==
// @name           Stack Overflow Tag Manager
// @namespace      http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description    Hides questions on the home page and main question list which have certain uninteresting tags, unless they also have some interesting tags
// @include        http://stackoverflow.com/
// @include        http://stackoverflow.com/?*
// @include        http://stackoverflow.com/questions
// @include        http://stackoverflow.com/questions/
// @include        http://stackoverflow.com/questions?*
// @include        http://stackoverflow.com/unanswered
// @include        http://stackoverflow.com/unanswered/
// @include        http://stackoverflow.com/unanswered?*
// @include        http://stackoverflow.com/unanswered/tagged
// @include        http://stackoverflow.com/unanswered/tagged/
// @include        http://stackoverflow.com/unanswered/tagged?*
// @include        http://stackoverflow.com/tags
// @include        http://stackoverflow.com/tags/
// @include        http://stackoverflow.com/tags?*
// ==/UserScript==

/*
CHANGELOG
---------
2011-07-13 Autocomplete function is no longer available when GM is executing -
           now registered on first focus of tag inputs.
2011-03-11 Added tag details toggle for updated tag page.
2011-02-12 Tag inputs are now trimmed.
2011-02-09 Tag inputs now leverage the site's tag autocomplete.
2011-02-07 Fixed management of Recent Tags on the front page.
2011-02-07 Display of the Ignored Tags and Interesting Tags sections can now be
           toggled; the option to hide SO's own tag manager is now exposed; add
           buttons now fit on the same line as tag inputs; tweaked whitespace
           above options.
2010-03-12 Fixed display on Questions and Unanswered pages; removed CSS fix
           which is no longer required; wildcard character is now stripped from
           tag links.
2009-03-12 Modifications to tag container class broke retrieval of tags for
           questions.
2008-10-22 New ads broke insertion of the configuration module on question list
           pages.
2008-10-22 Fixed ugly grey line on the stats box when highlighting questions.
2008-10-22 Updated generated element ids to avoid conflicts with Stack
           Overflow's newly implemented tag management. This allows you to
           continue to use this script if you want to continue to completely
           hide questions with ignored tags, by clearing tags from SO's built
           in tag manager.
2008-10-21 "Unanswered" view links also added "tagged" to the url even when not
           filtering by tag - updated @includes accordingly.
2008-10-09 Now also displays on the new "Unanswered" page.
2008-10-09 Interesting questions can now be highlighted.
2008-10-09 Updated "Recent Tags" filtering to take wildcards into account.
2008-10-09 Tags can now use "*" wildcard characters to help squash tag naming
           variants. This will match zero or more characters.
2008-10-04 A new module was added to the Questions page - updated positioning of
           the Tag Manager module so it's still second in the list.
2008-10-03 Ignored tags are now hidden in the "Recent Tags" sidebar on the front
           page.
2008-09-29 Ignored questions can now be hidden or faded.
2008-09-29 Updated @include metadata to enable script for different front page
           views.
2008-09-24 Added a checkbox to toggle display of interesting questions only.
2008-09-24 Tidied documentation and completed missing pieces.
2008-09-24 Now works on the front page as well.
2008-09-24 Initial version.
*/

/**
 * Miscellaneous utility functions.
 *
 * @namespace
 */
var Utilities =
{
    /**
     * Creates a function which, when executed, calls the given function with
     * the given context object as "this".
     *
     * @param {Function} func the function to be executed at a later time.
     * @param context the object which will be referenced by "this" during the
     *                function call.
     *
     * @return a function which will, when executed, execute <code>func</code>
     *         with <code>context</code> as "this".
     * @type Function
     */
    bind: function(func, context)
    {
        return function()
        {
            return func.apply(context, arguments);
        };
    },

    /**
     * Updates an object's properties with other objects' properties.
     *
     * @param {Object} destination the object to be updated.
     * @param {Object} [source] all further arguments will have their properties
     *                          copied to the <code>destination</code> object in
     *                          the order given.
     *
     * @return the <code>destination</code> object.
     * @type Object
     */
    extendObject: function(destination)
    {
        for (var i = 1, l = arguments.length; i < l; i++)
        {
            var source = arguments[i];
            for (var property in source)
            {
                if (source.hasOwnProperty(property))
                {
                    destination[property] = source[property];
                }
            }
        }
        return destination;
    },

    /**
     * Uses a dummy constructor to make a child constructor inherit from a
     * parent constructor.
     *
     * @param {Function} child the child constructor.
     * @param {Function} parent the parent constructor.
     */
    inheritFrom: function(child, parent)
    {
        function F() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
    },

    /**
     * Escapes special characters in the given text so it's safe for use in creating
     * a new <code>RegExp</code>.
     *
     * @param {String} text input text.
     *
     * @return the input text with any special regular expression characters escaped
     *         with backslashes.
     * @type String
     */
    regExpEscape: (function()
    {
        var sRE = /([\^.*+?|(){}[\]\\\$])/g;
        return function(text)
        {
            return text.replace(sRE, "\\$1");
        };
    })(),

    // The following functions are from http://dean.edwards.name/IE7/caveats/
    // by Dean Edwards 2004.10.24
    addClass: function(element, className)
    {
        if (!this.hasClass(element, className))
        {
            if (element.className)
            {
                element.className += " " + className;
            }
            else
            {
                element.className = className;
            }
        }
    },

    removeClass: function(element, className)
    {
        var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");
    },

    hasClass: function(element, className)
    {
        var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
        return regexp.test(element.className);
    },

    trim: function(s)
    {
        return s.replace(/^\s+|\s+$/g, "");
    }
};

/**
 * Creates a setter function which sets and stores the configuration option
 * with the given name.
 */
function configSetter(name)
{
    return function(value)
    {
        this[name] = value;
        GM_setValue(name, value);
    };
}

/**
 * Handles tag configuration and determines which questions should be ignored.
 *
 * @namespace
 */
var TagConfig =
{
    HIDE: "hide",
    FADE: "fade",

    /**
     * Loads initial tag preferences.
     */
    init: function()
    {
        this.ignoredTags = this.loadTags("ignoredTags");
        this.interestingTags = this.loadTags("interestingTags");
        this.ignoreAction = GM_getValue("ignoreAction", this.HIDE);
        this.onlyShowInteresting = GM_getValue("onlyShowInteresting", false);
        this.highlightInteresting = GM_getValue("highlightInteresting", false);
        this.hideBuiltInTagManager = GM_getValue("hideBuiltInTagManager", false);
        this.showIgnoredTags = GM_getValue("showIgnoredTags", true);
        this.showInterestingTags = GM_getValue("showInterestingTags", true);
        this._updateIgnoredTagRegExp();
        this._updateInterestingTagRegExp();
    },

    /**
     * Loads a sorted list of tags from the setting with the given name, which
     * is assumed to specify tags in a comma-delimited format.
     *
     * @param {String} settingName the name of the setting under which tags are
     *                             stored.
     *
     * @return a sorted list of tags.
     * @type String[]
     */
    loadTags: function(settingName)
    {
        var tags = [];
        var storedTags = GM_getValue(settingName, "");
        if (storedTags)
        {
            tags = storedTags.split(",");
        }
        tags.sort();
        return tags;
    },

    /**
     * Saves tags to the setting with the given name, as comma-delimited text.
     *
     * @param {String} settingName the name of the setting under which tags are
     *                             to be stored.
     * @param {String[]} tags tag details to be saved.
     */
    saveTags: function(settingName, tags)
    {
        GM_setValue(settingName, tags.join(","));
    },

    /**
     * Adds an ignored tag and saves.
     *
     * @param {String} tag the tag to be ignored.
     */
    addIgnoredTag: function(tag)
    {
        this.ignoredTags.push(tag);
        this.ignoredTags.sort();
        this._updateIgnoredTagRegExp();
        this.saveTags("ignoredTags", this.ignoredTags);
    },

    /**
     * Adds an interesting tag and saves.
     *
     * @param {String} tag the tag to be marked as interesting.
     */
    addInterestingTag: function(tag)
    {
        this.interestingTags.push(tag);
        this.interestingTags.sort();
        this._updateInterestingTagRegExp();
        this.saveTags("interestingTags", this.interestingTags);
    },

    /**
     * Removes an ignored tag and saves.
     *
     * @param {String} tag the tag to be unignored.
     */
    removeIgnoredTag: function(tag)
    {
        var index = this.ignoredTags.indexOf(tag);
        if (index != -1)
        {
            this.ignoredTags.splice(index, 1);
            this._updateIgnoredTagRegExp();
            this.saveTags("ignoredTags", this.ignoredTags);
        }
    },

    /**
     * Removes an interesting tag and saves.
     *
     * @param {String} tag the tag to be unmarked as interesting.
     */
    removeInterestingTag: function(tag)
    {
        var index = this.interestingTags.indexOf(tag);
        if (index != -1)
        {
            this.interestingTags.splice(index, 1);
            this._updateInterestingTagRegExp();
            this.saveTags("interestingTags", this.interestingTags);
        }
    },

    // Configuration setters
    updateIgnoreAction: configSetter("ignoreAction"),
    updateOnlyShowInteresting: configSetter("onlyShowInteresting"),
    updateHighlightInteresting: configSetter("highlightInteresting"),
    updateHideBuiltInTagManager: configSetter("hideBuiltInTagManager"),
    updateShowIgnoredTags: configSetter("showIgnoredTags"),
    updateShowInterestingTags: configSetter("showInterestingTags"),

    /**
     * Determines if a given question is ignored or interesting based on its
     * tags and the currently configured list of ignored and interesting tags.
     * <p>
     * Interesting tags trump ignored tags.
     *
     * @param {Question} question the question whose tags will be examined.
     *
     * @return <code>Question.IGNORED</code> if the given question should be
     *         <code>Question.INTERESTING</code> if it is interesting,
     *         <code>Question.ORDINARY</code> otherwise.
     * @type String
     */
    determineQuestionType: function(question)
    {
        // Default to ignoring all questions if we should only be showing those
        // with interesting tags, otherwise default to displaying all questions.
        var type = (this.onlyShowInteresting ? Question.IGNORED
                                             : Question.ORDINARY);

        for (var i = 0, l = question.tags.length; i < l; i++)
        {
            var tag = question.tags[i];

            if (this.onlyShowInteresting)
            {
                if (this._interestingTagRegExp.test(tag))
                {
                    type = Question.INTERESTING;
                    break;
                }
            }
            else
            {
                if (this._interestingTagRegExp.test(tag))
                {
                    type = Question.INTERESTING;
                    break;
                }

                if (this._ignoredTagRegExp.test(tag))
                {
                    type = Question.IGNORED;
                }
            }
        }

        return type;
    },

    /**
     * Updates the <code>RegExp</code> which is used internally to check for
     * ignored tags.
     */
    _updateIgnoredTagRegExp: function()
    {
        this._updateTagRegExp(this.ignoredTags, "_ignoredTagRegExp");
    },

    /**
     * Updates the <code>RegExp</code> which is used internally to check for
     * interesting tags.
     */
    _updateInterestingTagRegExp: function()
    {
        this._updateTagRegExp(this.interestingTags, "_interestingTagRegExp");
    },

    /**
     * Creates a RegExp which matches any of the given tags and stores it under
     * the given property name.
     * <p>
     * Tags can include "*" characters to indicate wildcard matches.
     *
     * @param {String[]} tags a list of tags.
     * @param {String} property the property on this object which the newly
     *                          created <code>RegExp</code> should be stored
     *                          under.
     */
    _updateTagRegExp: function(tags, property)
    {
        this[property] = new RegExp(
            "^(" +
            tags.map(function(tag)
            {
                return Utilities.regExpEscape(tag);
            }).join("|").replace(/(?:\\\*)+/g, ".*") +
            ")$", "i");
    }
};

/**
 * Handles the configuration form which will display existing configuration
 * details and allow the user to add and remove tags.
 *
 * @namespace
 */
var ConfigurationForm =
{
    BLACK_ARROW_UP: "\u25B2",
    BLACK_ARROW_DOWN: "\u25BC",

    /**
     * Creates the configuration form.
     *
     * @param {TagManagerPage} page the page object for the current page.
     */
    init: function(page)
    {
        this.page = page;
        this.form = document.createElement("form");
        this.form.name = "tagManagerConfigurationForm";

        this.ignoredTagsSection = document.createElement("div");

        var ignoredTagsHeader = document.createElement("h4");
        ignoredTagsHeader.appendChild(document.createTextNode("Ignored Tags "));
        this.ignoredTagsToggler = document.createElement("span");
        this.ignoredTagsToggler.style.cursor = "pointer";
        this.ignoredTagsToggler.addEventListener(
            "click", Utilities.bind(this.toggleIgnoredTags, this), false);
        ignoredTagsHeader.appendChild(this.ignoredTagsToggler);
        this.updateIgnoredTagsTogglerDisplay(false); // Disable animation

        this.ignoredTags = document.createElement("div");
        this.ignoredTags.id = "ignoredTagsGM";
        this.ignoredTags.className = "tags";
        this.updateIgnoredTagDisplay();

        var ignoreTagFields = document.createElement("p");
        ignoreTagFields.style.marginBottom = "0";
        this.ignoreTagInput = document.createElement("input");
        this.ignoreTagInput.type = "text";
        this.ignoreTagInput.name = "ignoreTag";
        this.ignoreTagInput.size = 18;
        this.ignoreTagInput.addEventListener(
            "keypress", this.keyPressHandler(this.addIgnoredTag), false);
        this.ignoreTagInput.autoCompleteBound = false;
        this.ignoreTagInput.addEventListener(
            "focus", this.bindAutoComplete, false);
        var ignoreTagButton = document.createElement("input");
        ignoreTagButton.type = "button";
        ignoreTagButton.value = "Add";
        ignoreTagButton.addEventListener(
            "click", Utilities.bind(this.addIgnoredTag, this), false);
        ignoreTagFields.appendChild(this.ignoreTagInput);
        ignoreTagFields.appendChild(document.createTextNode(" "));
        ignoreTagFields.appendChild(ignoreTagButton);

        var ignoreOptions = document.createElement("p");
        var hideIgnoredLabel = document.createElement("label");
        hideIgnoredLabel.htmlFor = "hideIgnoredGM";
        this.hideIgnoredRadio = document.createElement("input");
        this.hideIgnoredRadio.type = "radio";
        this.hideIgnoredRadio.checked = (TagConfig.ignoreAction == TagConfig.HIDE);
        this.hideIgnoredRadio.id = "hideIgnoredGM";
        this.hideIgnoredRadio.name = "ignoreAction";
        this.hideIgnoredRadio.value = TagConfig.HIDE;
        this.hideIgnoredRadio.addEventListener(
            "click", Utilities.bind(this.updateIgnoreAction, this), false);
        hideIgnoredLabel.appendChild(this.hideIgnoredRadio);
        hideIgnoredLabel.appendChild(document.createTextNode(" Hide"));
        hideIgnoredLabel.style.marginRight = "10px";
        var fadeIgnoredLabel = document.createElement("label");
        fadeIgnoredLabel.htmlFor = "fadeIgnoredGM";
        this.fadeIgnoredRadio = document.createElement("input");
        this.fadeIgnoredRadio.type = "radio";
        this.fadeIgnoredRadio.checked = (TagConfig.ignoreAction == TagConfig.FADE);
        this.fadeIgnoredRadio.id = "fadeIgnoredGM";
        this.fadeIgnoredRadio.name = "ignoreAction";
        this.fadeIgnoredRadio.value = TagConfig.FADE;
        this.fadeIgnoredRadio.addEventListener(
            "click", Utilities.bind(this.updateIgnoreAction, this), false);
        fadeIgnoredLabel.appendChild(this.fadeIgnoredRadio);
        fadeIgnoredLabel.appendChild(document.createTextNode(" Fade"));
        ignoreOptions.appendChild(hideIgnoredLabel);
        ignoreOptions.appendChild(fadeIgnoredLabel);

        this.interestingTagsSection = document.createElement("div");

        var interestingTagsHeader = document.createElement("h4");
        interestingTagsHeader.appendChild(document.createTextNode("Interesting Tags "));
        this.interestingTagsToggler = document.createElement("span");
        this.interestingTagsToggler.style.cursor = "pointer";
        this.interestingTagsToggler.addEventListener(
            "click", Utilities.bind(this.toggleInterestingTags, this), false);
        interestingTagsHeader.appendChild(this.interestingTagsToggler);
        this.updateInterestingTagsTogglerDisplay(false); // Disable animation

        this.interestingTags = document.createElement("div");
        this.interestingTags.id = "interestingTagsGM";
        this.interestingTags.className = "tags";
        this.updateInterestingTagDisplay();

        var interestingTagFields = document.createElement("p");
        interestingTagFields.style.marginBottom = "0";
        this.interestingTagInput = document.createElement("input");
        this.interestingTagInput.type = "text";
        this.interestingTagInput.name = "interestingTagGM";
        this.interestingTagInput.size = 18;
        this.interestingTagInput.addEventListener(
            "keypress", this.keyPressHandler(this.addInterestingTag), false);
        this.interestingTagInput.autoCompleteBound = false;
        this.interestingTagInput.addEventListener(
            "focus", this.bindAutoComplete, false);
        var interestingTagButton = document.createElement("input");
        interestingTagButton.type = "button";
        interestingTagButton.value = "Add";
        interestingTagButton.addEventListener(
            "click", Utilities.bind(this.addInterestingTag, this), false);
        interestingTagFields.appendChild(this.interestingTagInput);
        interestingTagFields.appendChild(document.createTextNode(" "));
        interestingTagFields.appendChild(interestingTagButton);

        var interestingOptions = document.createElement("p");
        var onlyShowInterestingLabel = document.createElement("label");
        onlyShowInterestingLabel.htmlFor = "onlyShowInterestingGM";
        this.onlyShowInterestingCheckbox = document.createElement("input");
        this.onlyShowInterestingCheckbox.type = "checkbox";
        this.onlyShowInterestingCheckbox.checked = TagConfig.onlyShowInteresting;
        this.onlyShowInterestingCheckbox.id = "onlyShowInterestingGM";
        this.onlyShowInterestingCheckbox.addEventListener(
            "click", Utilities.bind(this.toggleOnlyShowInteresting, this), false);
        onlyShowInterestingLabel.appendChild(this.onlyShowInterestingCheckbox);
        onlyShowInterestingLabel.appendChild(document.createTextNode(" Only show interesting"));
        interestingOptions.appendChild(onlyShowInterestingLabel);
        interestingOptions.appendChild(document.createElement("br"));
        var highlightInterestingLabel = document.createElement("label");
        highlightInterestingLabel.htmlFor = "highlightInterestingGM";
        this.highlightInterestingCheckbox = document.createElement("input");
        this.highlightInterestingCheckbox.type = "checkbox";
        this.highlightInterestingCheckbox.checked = TagConfig.highlightInteresting;
        this.highlightInterestingCheckbox.id = "highlightInterestingGM";
        this.highlightInterestingCheckbox.addEventListener(
            "click", Utilities.bind(this.toggleHighlightInteresting, this), false);
        highlightInterestingLabel.appendChild(this.highlightInterestingCheckbox);
        highlightInterestingLabel.appendChild(document.createTextNode(" Highlight interesting"));
        interestingOptions.appendChild(highlightInterestingLabel);
        interestingOptions.appendChild(document.createElement("br"));
        var hideBuiltInLabel = document.createElement("label");
        hideBuiltInLabel.htmlFor = "hideBuiltInGM";
        this.hideBuiltInCheckbox = document.createElement("input");
        this.hideBuiltInCheckbox.type = "checkbox";
        this.hideBuiltInCheckbox.checked = TagConfig.hideBuiltInTagManager;
        this.hideBuiltInCheckbox.id = "hideBuiltInGM";
        this.hideBuiltInCheckbox.addEventListener(
            "click", Utilities.bind(this.toggleHideBuiltInTagManager, this), false);
        hideBuiltInLabel.appendChild(this.hideBuiltInCheckbox);
        hideBuiltInLabel.appendChild(document.createTextNode(" Hide built-in tag manager"));
        interestingOptions.appendChild(hideBuiltInLabel);

        this.form.appendChild(ignoredTagsHeader);
        this.ignoredTagsSection.appendChild(this.ignoredTags);
        this.ignoredTagsSection.appendChild(ignoreTagFields);
        this.ignoredTagsSection.appendChild(ignoreOptions);
        this.form.appendChild(this.ignoredTagsSection)

        this.form.appendChild(interestingTagsHeader);
        this.interestingTagsSection.appendChild(this.interestingTags);
        this.interestingTagsSection.appendChild(interestingTagFields);
        this.interestingTagsSection.appendChild(interestingOptions);
        this.form.appendChild(this.interestingTagsSection)
    },

    /**
     * Event handler for adding an ignored tag.
     */
    addIgnoredTag: function()
    {
        var tag = Utilities.trim(this.ignoreTagInput.value);
        if (!tag)
        {
            return;
        }

        if (tag.indexOf(",") != -1)
        {
            alert("No commas, please!");
            return;
        }
        else if (TagConfig.ignoredTags.indexOf(tag) != -1)
        {
            alert("You're already ignoring this tag.");
            this.ignoreTagInput.value = "";
            return;
        }
        else if (TagConfig.interestingTags.indexOf(tag) != -1)
        {
            if (confirm("This tag is currently marked as interesting - do you want to ignore it instead?"))
            {
                TagConfig.removeInterestingTag(tag);
                this.updateInterestingTagDisplay();
            }
            else
            {
                this.ignoreTagInput.value = "";
                return;
            }
        }

        TagConfig.addIgnoredTag(tag);
        this.ignoreTagInput.value = "";
        this.updateIgnoredTagDisplay();
        this.page.updateQuestionDisplay();
        this.ignoreTagInput.focus();
    },

    /**
     * Event handler for adding an interesting tag.
     */
    addInterestingTag: function()
    {
        var tag = Utilities.trim(this.interestingTagInput.value);
        if (!tag)
        {
            return;
        }

        if (tag.indexOf(",") != -1)
        {
            alert("No commas, please!");
            return;
        }
        else if (TagConfig.interestingTags.indexOf(tag) != -1)
        {
            alert("This tag is already marked as interesting.");
            this.interestingTagInput.value = "";
            return;
        }
        else if (TagConfig.ignoredTags.indexOf(tag) != -1)
        {
            if (confirm("You're currently ignoring this tag - do you want to mark it as interesting instead?"))
            {
                TagConfig.removeIgnoredTag(tag);
                this.updateIgnoredTagDisplay();
            }
            else
            {
                this.interestingTagInput.value = "";
                return;
            }
        }

        TagConfig.addInterestingTag(tag);
        this.interestingTagInput.value = "";
        this.updateInterestingTagDisplay();
        this.page.updateQuestionDisplay();
        this.interestingTagInput.focus();
    },

    /**
     * Creates an event handler which uses the given function to add a tag when
     * the user presses the return key.
     *
     * @param {Function} addTagFunc the {@link ConfigurationForm} function to be
     *                              used to add a new tag.
     *
     * @return an event handling function.
     * @type Function
     */
    keyPressHandler: function(addTagFunc)
    {
        return Utilities.bind(function(e)
        {
            if (e.which == 13)
            {
                addTagFunc.call(this);
            }
        }, this);
    },

    /**
     * Binds the OOTB autocomplete to a tag input the first time it is accessed.
     */
    bindAutoComplete: function()
    {
        if (!this.autoCompleteBound)
        {
            unsafeWindow.bindTagFilterAutoComplete(this);
            this.autoCompleteBound = true;
        }
    },

    /**
     * Event handler for removing an ignored tag.
     *
     * @param {Event} e the event being handled.
     */
    removeIgnoredTag: function(e)
    {
        this._removeTag(e,
                        TagConfig.removeIgnoredTag,
                        this.updateIgnoredTagDisplay);
    },

    /**
     * Event handler for removing an interesting tag.
     *
     * @param {Event} e the event being handled.
     */
    removeInterestingTag: function(e)
    {
        this._removeTag(e,
                        TagConfig.removeInterestingTag,
                        this.updateInterestingTagDisplay);
    },

    /**
     * Does the real work for removing tags - preventing the tag link from
     * being followed, using TagConfig to update configuration and updating
     * display of the appropriate tag configuration and questions.
     *
     * @param {Event} e the event being handled.
     * @param {Function} tagConfigFunc the {@link TagConfig} function to be used
     *                                 to update tag configuration.
     * @param {Function} updateDisplayFunc the {@link ConfigurationForm}
     *                                    function to be used to update tag
     *                                    configuration display.
     */
    _removeTag: function(e, tagConfigFunc, updateDisplayFunc)
    {
        e.preventDefault();
        e.stopPropagation();
        tagConfigFunc.call(TagConfig, e.target.textContent);
        updateDisplayFunc.call(this);
        this.page.updateQuestionDisplay();
    },

    /**
     * Event handler for updating the action taken on ignored tags.
     */
    updateIgnoreAction: function()
    {
        // First, reset all questions to their default state
        this.page.questions.map(function(question)
        {
            question.resetDisplay();
        });

        var ignoreAction;
        if (this.hideIgnoredRadio.checked)
        {
            ignoreAction = TagConfig.HIDE;
        }
        else if (this.fadeIgnoredRadio.checked)
        {
            ignoreAction = TagConfig.FADE;
        }
        TagConfig.updateIgnoreAction(ignoreAction);
        this.page.updateQuestionDisplay();
    },

    /**
     * Event handler for toggling display of interesting questions only.
     */
    toggleOnlyShowInteresting: function()
    {
        TagConfig.updateOnlyShowInteresting(this.onlyShowInterestingCheckbox.checked);
        this.page.updateQuestionDisplay();
    },

    /**
     * Event handler for toggling highlighting of interesting questions only.
     */
    toggleHighlightInteresting: function()
    {
        TagConfig.updateHighlightInteresting(this.highlightInterestingCheckbox.checked);
        this.page.updateQuestionDisplay();
    },

    /**
     * Event handler for toggling display of the built-in tag manager.
     */
    toggleHideBuiltInTagManager: function()
    {
        TagConfig.updateHideBuiltInTagManager(this.hideBuiltInCheckbox.checked);
        this.page.updateBuiltInTagManagerDisplay();
    },

    /**
     * Event handler for toggling display of the Ignored Tags section.
     */
    toggleIgnoredTags: function()
    {
        TagConfig.updateShowIgnoredTags(!TagConfig.showIgnoredTags);
        this.updateIgnoredTagsTogglerDisplay();
    },

    /**
     * Event handler for toggling display of the Interesting Tags section.
     */
    toggleInterestingTags: function()
    {
        TagConfig.updateShowInterestingTags(!TagConfig.showInterestingTags);
        this.updateInterestingTagsTogglerDisplay();
    },

    /**
     * Updates display of ignored tags.
     */
    updateIgnoredTagDisplay: function()
    {
        this._updateTagDisplay(this.ignoredTags,
                               TagConfig.ignoredTags,
                               "ignored",
                               this.removeIgnoredTag);
    },

    /**
     * Updates display of interesting tags.
     */
    updateInterestingTagDisplay: function()
    {
        this._updateTagDisplay(this.interestingTags,
                               TagConfig.interestingTags,
                               "interesting",
                               this.removeInterestingTag);
    },

    /**
     * Updates display of the ignored tag toggler and section.
     */
    updateIgnoredTagsTogglerDisplay: function(animate)
    {
        this._updateTogglerDisplay(this.ignoredTagsToggler,
                                   this.ignoredTagsSection,
                                   TagConfig.showIgnoredTags,
                                   animate);
    },

    /**
     * Updates display of the ignored tag toggler and section.
     */
    updateInterestingTagsTogglerDisplay: function(animate)
    {
        this._updateTogglerDisplay(this.interestingTagsToggler,
                                   this.interestingTagsSection,
                                   TagConfig.showInterestingTags,
                                   animate);
    },

    /**
     * Does the real work for updating display of togglers and sections.
     *
     * @param {HTMLElement} toggler the toggler to be updated.
     * @param {HTMLElement} section the section to be toggled.
     * @param {Boolean} show <code>true</code> if the section should be shown,
     *                       <code>false</code> otherwise.
     * @param {Boolean} animate if <code>false</code>, the section toggle will
     *                          not be animated.
     */
    _updateTogglerDisplay: function(toggler, section, show, animate)
    {
        toggler.innerHTML = "";
        toggler.appendChild(document.createTextNode(show ? this.BLACK_ARROW_UP : this.BLACK_ARROW_DOWN));

        if (animate === false)
        {
            section.style.display = (show ? "" : "none");
        }
        else
        {
            unsafeWindow.jQuery(section).slideToggle("fast");
        }
    },

    /**
     * Does the real work for updating display of tag configurations - creates
     * tag deletion links from scratch based on the current configuration.
     *
     * @param {HTMLElement} el the element holding tag deletion links to be
     *                         updated.
     * @param {String[]} tags the new list of tags to be displayed for deletion.
     * @param {String} type the type of tags being displayed -
     *                      <code>"ignored"</code> or
     *                      <code>"interesting"</code>.
     * @param {Function} deleteEventHandler the {@link ConfigurationForm}
     *                                      function to be registered as the
     *                                      event handler for tag deletion
     *                                      links.
     */
    _updateTagDisplay: function(el, tags, type, deleteEventHandler)
    {
        el.innerHTML = "";

        if (tags.length === 0)
        {
            return;
        }

        for (var i = 0, l = tags.length; i < l; i++)
        {
            var tag = tags[i];
            var tagLink = document.createElement("a");
            tagLink.className = "post-tag";
            tagLink.href = "/questions/tagged/" + encodeURIComponent(tag.replace(/\*/g, ""));
            tagLink.title = "delete " + type + " tag '" + tag + "'";
            tagLink.appendChild(document.createTextNode(tag));
            tagLink.addEventListener(
                "click", Utilities.bind(deleteEventHandler, this), false);
            el.appendChild(tagLink);
            if (i != l - 1)
            {
                el.appendChild(document.createTextNode(" "));
            }
        }
    }
};

/**
 * A question in a Stack Overflow question list page.
 *
 * @param {HTMLElement} element the HTML element representing the question.
 *
 * @constructor
 */
function Question(element)
{
    this.element = element;
    this.tags = [];
    this.ignored = false;

    var tagLinks = document.evaluate(".//a[@rel='tag']",
                                     this.element,
                                     null,
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                     null);
    for (var i = 0, l = tagLinks.snapshotLength; i < l; i++)
    {
        this.tags.push(tagLinks.snapshotItem(i).textContent);
    }
    this.tags.sort();
}

Question.ORDINARY = "ordinary";
Question.IGNORED = "ignored";
Question.INTERESTING = "interesting";

Question.prototype =
{
    /**
     * Resets the element representing the question back to its default display
     * state.
     */
    resetDisplay: function()
    {
        if (this.ignored)
        {
            this.unignore();
        }

        if (this.highlighted)
        {
            this.unhighlight();
        }
    },

    /**
     * Performs the appropriate action to ignore this question.
     */
    ignore: function()
    {
        if (this.highlighted)
        {
            this.unhighlight();
        }

        switch(TagConfig.ignoreAction)
        {
            case TagConfig.HIDE:
                this.hide();
                break;
            case TagConfig.FADE:
                this.fade();
                break;
        }
        this.ignored = true;
    },

    /**
     * Performs the appropriate action to unignore this question.
     */
    unignore: function()
    {
        switch(TagConfig.ignoreAction)
        {
            case TagConfig.HIDE:
                this.show();
                break;
            case TagConfig.FADE:
                this.brighten();
                break;
        }
        this.ignored = false;
    },

    /**
     * Hides the element representing the question.
     */
    hide: function()
    {
        this.element.style.display = "none";
    },

    /**
     * Shows the element representing the question.
     */
    show: function()
    {
        this.element.style.display = "";
    },

    /**
     * Fades the element representing the question.
     */
    fade: function()
    {
        this.element.style.opacity = "0.5";
    },

    /**
     * Brightens the element representing the question.
     */
    brighten: function()
    {
        this.element.style.opacity = "1";
    },

    /**
     * Highlights the element representing the question.
     */
    highlight: function()
    {
        if (this.ignored)
        {
            this.unignore();
        }

        Utilities.addClass(this.element, "sotm-interesting");
        this.highlighted = true;
    },

    /**
     * Unhighlights the element representing the question.
     */
    unhighlight: function()
    {
        Utilities.removeClass(this.element, "sotm-interesting");
        this.highlighted = false;
    }
};

/**
 * Base object for objects which will handle initialisation of Tag Manager
 * functionality on various pages.
 *
 * @constructor
 */
function TagManagerPage() {};
TagManagerPage.prototype =
{
    /**
     * Kicks off processing of the current page, performing all necessary
     * setup, including initialising all other components and inserting status
     * display and configuration controls into the page.
     */
    init: function()
    {
        TagConfig.init();

        this.questions = [];

        var questionDivs = this.getQuestionDivs();
        for (var i = 0, l = questionDivs.snapshotLength; i < l; i++)
        {
            this.questions.push(new Question(questionDivs.snapshotItem(i)));
        }

        // Create module in sidebar
        var module = document.createElement("div");
        module.id = "tagManagerGM";
        module.className = "module";

        this.ignoredQuestionStatus = document.createElement("p");
        this.ignoredQuestionStatus.id = "ignoredQuestionStatusGM";
        module.appendChild(this.ignoredQuestionStatus);

        ConfigurationForm.init(this);
        module.appendChild(ConfigurationForm.form);

        this.insertModule(module);
        this.updateQuestionDisplay();
        this.updateBuiltInTagManagerDisplay();
    },

    /**
     * Retrieves elements representing questions on the current page.
     * <p>
     * This method must be implemented by objects which inherit from
     * <code>TagManagerPage</code> or an <code>Error</code> will be thrown.
     *
     * @returns the result of an XPATH lookup for elements representing
     *          questions.
     * @type XPathResult
     */
    getQuestionDivs: function()
    {
        throw new Error("getQuestionDivs must be implemented by inheritors.");
    },

    /**
     * Inserts the Tag Manager configuration module into the page.
     * <p>
     * This method must be implemented by objects which inherit from
     * <code>TagManagerPage</code> or an <code>Error</code> will be thrown.
     *
     * @param HTMLElement the Tag Manager configuration module.
     */
    insertModule: function(module)
    {
        throw new Error("insertModule must be implemented by inheritors.");
    },

    /**
     * Updates display of each question on the page based on the current
     * configuration of ignored and interesting tags.
     */
    updateQuestionDisplay: function()
    {
        var ignoredQuestions = 0;

        for (var i = 0, l = this.questions.length; i < l; i++)
        {
            var question = this.questions[i];
            var type = TagConfig.determineQuestionType(question);
            if (type == Question.IGNORED)
            {
                question.ignore();
                ignoredQuestions++;
            }
            else if (TagConfig.highlightInteresting &&
                     type == Question.INTERESTING)
            {
                question.highlight();
            }
            else
            {
                question.resetDisplay();
            }
        }

        this.updateIgnoredQuestionCount(ignoredQuestions);
    },

    /**
     * Updates display of the built-in tag manager.
     */
    updateBuiltInTagManagerDisplay: function()
    {
        document.getElementById("ignoredTags").parentNode.style.display =
            (TagConfig.hideBuiltInTagManager ? "none" : "");
    },

    /**
     * Updates details about the number of questions which are currently ignored.
     *
     * @param {Number} count the number of questions which are ignored.
     */
    updateIgnoredQuestionCount: function(count)
    {
        this.ignoredQuestionStatus.innerHTML = "";
        this.ignoredQuestionStatus.appendChild(document.createTextNode("You're ignoring "));
        var ignoredQuestionCount = document.createElement("strong");
        ignoredQuestionCount.appendChild(document.createTextNode(count));
        this.ignoredQuestionStatus.appendChild(ignoredQuestionCount);
        this.ignoredQuestionStatus.appendChild(document.createTextNode(
            " question" + (count == 1 ? "" : "s") + " based on " +
            (count == 1 ? "its" : "their") + " tags."));
    }
};

/**
 * Handles initialisation of Tag Manager functionality on the front page.
 *
 * @constructor
 * @augments TagManagerPage
 */
function FrontPage() {};
Utilities.inheritFrom(FrontPage, TagManagerPage);
Utilities.extendObject(FrontPage.prototype,
{
    updateQuestionDisplay: function()
    {
        TagManagerPage.prototype.updateQuestionDisplay.call(this);
        this.updateTagCloudDisplay();
    },

    /**
     * Updates display of tags in the "Recent Tags" sidebar based on the current
     * configuration of ignored tags.
     */
    updateTagCloudDisplay: function()
    {
        var recentTagsDiv = document.getElementById("recent-tags-list");
        var tagLinks = document.evaluate(".//a[@rel='tag']",
                                         recentTagsDiv,
                                         null,
                                         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                         null);
        for (var i = 0, l = tagLinks.snapshotLength; i < l; i++)
        {
            var tagLink = tagLinks.snapshotItem(i);
            var elementToHide =
                (tagLink.parentNode == recentTagsDiv ? tagLink
                                                     : tagLink.parentNode);
            var display =  (TagConfig._ignoredTagRegExp.test(tagLink.textContent) ? "none" : "");
            // Tag
            elementToHide.style.display = display;
            // Count
            elementToHide.nextElementSibling.style.display = display;
            // <br>
            if (elementToHide.nextElementSibling.nextElementSibling)
            {
                elementToHide.nextElementSibling.nextElementSibling.style.display = display;
            }
        }
    },

    getQuestionDivs: function()
    {
        return document.evaluate(".//div[contains(@class, 'question-summary')]",
                                 document.getElementById("mainbar"),
                                 null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                 null);
    },

    insertModule: function(module)
    {
        var insertionTarget =
            document.evaluate(".//div[@class='module']",
                              document.getElementById("sidebar"),
                              null,
                              XPathResult.FIRST_ORDERED_NODE_TYPE,
                              null).singleNodeValue;
        insertionTarget.parentNode.insertBefore(module, insertionTarget);
    }
});

/**
 * Handles initialisation of Tag Manager functionality on the questions page.
 *
 * @constructor
 * @augments TagManagerPage
 */
function QuestionsPage() {};
Utilities.inheritFrom(QuestionsPage, TagManagerPage);
Utilities.extendObject(QuestionsPage.prototype,
{
    getQuestionDivs: function()
    {
        return document.evaluate(".//div[@class='question-summary']",
                                 document.getElementById("questions"),
                                 null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                 null);
    },

    insertModule: function(module)
    {
        var insertionTarget =
            document.evaluate(".//div[@class='module']",
                              document.getElementById("sidebar"),
                              null,
                              XPathResult.FIRST_ORDERED_NODE_TYPE,
                              null).singleNodeValue.nextSibling;
       insertionTarget.parentNode.insertBefore(module, insertionTarget);
    }
});

/**
 * Adds a checkbox to toggle display of additional details on the tags page.
 *
 * @constructor
 */
function TagsPage() {};
TagsPage.prototype =
{
    CONFIG_NAME: "showTagDetail",

    init: function()
    {
        // Override tag filter callback to apply display preferences on sucess
        var tagsPage = this;
        unsafeWindow.finished = function(txt)
        {
            unsafeWindow.$.ajax({
                type: "POST",
                url: "/filter/tags-for-index",
                data: {filter: txt, tab: 'count'},
                dataType: "html",
                success: function (result) {
                    var domelement = unsafeWindow.$(result);
                    unsafeWindow.$("#tags_list").html(domelement);
                    unsafeWindow.$(".pager").hide();
                    if (!tagsPage.showTagDetailConfig())
                    {
                        tagsPage.toggleDetail();
                    }
                }
            });
        }

        // Get preferences, defaulting to show details if undefined
        var config = this.showTagDetailConfig();
        if (typeof config == "undefined")
        {
            config = true;
            this.showTagDetailConfig(true);
        }

        this.insertControls();

        // Don't call the toggleDetail method if we don't have to
        if (!config)
        {
            this.toggleDetail();
        }
    },

    /**
     * Set showTagDetail setting if we were given an argument, otherwise get it.
     */
    showTagDetailConfig: function(value)
    {
        if (!arguments.length)
        {
            return GM_getValue(this.CONFIG_NAME);
        }
        GM_setValue(this.CONFIG_NAME, value);
    },

    /**
     * Insert a checkbox for tag detail preferences.
     */
    insertControls: function()
    {
        var tagsPage = this,
            target = document.getElementById("tagfilter").parentNode,
            label = document.createElement("label"),
            checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = this.showTagDetailConfig();
        checkbox.addEventListener("click", function()
        {
            tagsPage.showTagDetailConfig(this.checked);
            tagsPage.toggleDetail();
        }, false);
        label.className = "sotm-tag-detail";
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" Show tag details"));

        target.appendChild(document.createTextNode(" "));
        target.appendChild(label);
    },

    /**
     * Display or hide tag details, as appropriate.
     */
    toggleDetail: function()
    {
        var showDetail = this.showTagDetailConfig(),
            display = (showDetail ? "" : "none"),
            classFunc = Utilities.bind(
                (showDetail ? Utilities.removeClass : Utilities.addClass),
                Utilities),
            details = document.evaluate("//td[contains(@class, 'tag-cell')]/div[position()=1]",
                                        document,
                                        null,
                                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                        null);

        for (var i = 0, l = details.snapshotLength; i < l; i++)
        {
            var detail = details.snapshotItem(i);
            detail.style.display = display;
            if (detail.nextElementSibling)
            {
                detail.nextElementSibling.style.display = display;
            }
            classFunc(detail.parentNode, "sotm-tag-cell");
        }
    }
};

// Custom styles used by generated controls
GM_addStyle('.sotm-interesting { background-color: #ffb !important; }');
GM_addStyle('.sotm-tag-detail { margin-left: .5em; }');
GM_addStyle('.sotm-tag-cell { padding-top: 0 !important; padding-bottom: 0 !important; }');

// Determine which type of page we're on and create the appropriate page object
// to handle it.
var page;
if (window.location.pathname.indexOf("/tags") === 0)
{
    page = new TagsPage();
}
else if (window.location.pathname.indexOf("/questions") === 0 ||
         window.location.pathname.indexOf("/unanswered") === 0)
{
    page = new QuestionsPage();
}
else
{
    page = new FrontPage();
}
page.init();
