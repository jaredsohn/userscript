// ==UserScript==
// @name        SC3 Plugin
// @namespace   SC3
// @include     http://192.168.98.62/*
// @include     http://isc.devexpress.com/*
// @version     1.0.5
// @grant       none
// ==/UserScript==

var SC3_Plugin = {
    pageType: function () {
        if (typeof supportCenter == "undefined") return "Analytics";
        if (typeof supportCenter.model.details != "undefined" && supportCenter.model.details.OwnerInfo == null) return "New";
        if (typeof supportCenter.model.ticket != "undefined") return "Ticket";
        if (typeof supportCenter.model.list != "undefined") return "TicketList";
    },
    selectors: {
        topPanel: "#top-panel",

        questionAnswer: ".history-item",
        comment: "section.item-content",
        commentHeader: ".item-header",
        newTokens: ".new-item-states",
        existingTokens: ".post-states",

        leftSide: "#ticket-content",
        answerTokens: ".post-states",

        rightSide: "#sidebar",
        ticketInfo: ".ticket-type",
        detailsSection: "#editable-details-pane"
    },
    enabled: {
        searchPanel: true,
        colors: {
            dxOwner: true,
            license: true,
            vbUser: true,
            markedAsSolution: true,
            redUrgent: true
        },
        ui: {
            changeDefaultStyle: true,
            addViewOnWebButton: true,
            moveTicketDetailsOnTop: true,
            reorderCategories: true,
            displayFilterInTitle: true,
            enableSearchOnEnter: true,
            moveEditFromTokensUp: true
        },
        keyBindings: true,
        collapseMessages: true
    },
    init: function () {
        var self = this;
        var type = self.pageType();
        if (type == "Analytics") return;
        if (type == "Ticket") {
            self.UI.searchPanel.initSearchPanel();
            self.UI.applyDXColors();
            self.UI.change();
            self.UI.attachKeyBindings();
            self.UI.collapseLongMessages();
            return;
        }
        if (type == "New") {
            self.UI.searchPanel.initSearchPanel();
            self.UI.change();
            self.UI.attachKeyBindings();
            return;
        }
        if (type == "TicketList") {
            self.UI.searchPanel.initSearchPanel();
            if (self.enabled.ui.displayFilterInTitle) {
                //display current filter's name in the page's title
                document.title = $(".settings.info span").text();
            }

            if (self.enabled.ui.enableSearchOnEnter) {
                //start search on enter
                $("#filterString").keydown(function (e) {
                    if (e.keyCode == 13) {
                        supportCenter.viewModel.list.filterString($(this).val());
                        SubmitForm();
                    }
                });
            }
            return;
        }
    },
    get: {
        messages: function () {
            return this.questionAndAnswers().add(this.comments());
        },
        questionAndAnswers: function () {
            return $(SC3_Plugin.selectors.questionAnswer);
        },
        comments: function () {
            return $(SC3_Plugin.selectors.comment);
        },
        messageHeaders: function () {
            return this.messages().find(SC3_Plugin.selectors.commentHeader);
        },
        myInfo: function () {
            return supportCenter.model.details.SelectedAssignTo.items[0];
        },
        topPanel: function () {
            return $(SC3_Plugin.selectors.topPanel);
        },
        searchPanel: function () {
            return $("#plugin_SearchPanel");
        },
        ticketEditors: function () {
            return $(SC3_Plugin.selectors.detailsSection + " div.control-group");
        }
    },
    UI: {
        addStyle: function (css) {
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if (!head) { return; }
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        },
        searchPanel: {
            initSearchPanel: function () {
                if (!SC3_Plugin.enabled.searchPanel) return;
                $("form:first", SC3_Plugin.get.topPanel).toggle(); //hide default search to move it later to the search panel
                this.searchQueue.addCurrentTicket();
                this.attachKeys();

            },
            searchQueue: {
                queueLength: 15,
                currentArray: ko.observableArray(),
                addCurrentTicket: function () {
                    var type = SC3_Plugin.pageType();
                    if (type == "New" || type == "TicketList") return;
                    var ticketID = supportCenter.model.ticket.ArticleId;
                    this.getAll();
                    var itemIndex = this.getIndex(this.currentArray(), ticketID);
                    if (itemIndex > -1) this.currentArray.splice(itemIndex, 1); //place first if exists
                    if (this.currentArray().length >= this.queueLength) this.currentArray.pop();
                    this.currentArray.unshift(ticketID + " | " + supportCenter.model.ticket.Subject);
                    localStorage.setItem('tickets_history', JSON.stringify(this.currentArray()));
                },
                getAll: function () {
                    if (localStorage.getItem("tickets_history") === null) return;
                    var parsedJSON = JSON.parse(localStorage.getItem("tickets_history"));
                    if (parsedJSON[0] == this.currentArray()[0]) return;
                    this.currentArray(parsedJSON);
                },
                getIndex: function (array, id) {
                    if (array.length == 0) return -1;
                    for (var i = 0; i < array.length; i++) {
                        var arrayID = array[i].split('|')[0].trim();
                        if (arrayID == id) return i;
                    }
                    return -1;
                },
                processInput: function (data, event) {
                    var selectedID = data.split("|")[0].trim();
                    var $input = SC3_Plugin.get.searchPanel().find("input");
                    $input.val(selectedID).focus();
                    setTimeout(function () {
                        $("#plugin_SearchPanel").removeClass('open'); // dunno why but the class gets back without timeout
                    }, 100);
                }
            },
            create: function () {
                SC3_Plugin.UI.addStyle(
                    ".searchPanel {" +
                    "display: none;" +
                    "position: absolute;" +
                    "top: " + $(window).height() / 2 + "px;" +
                    "left: 50%;" +
                    "width: 600px;" +
                    "margin-left: -300px;" +
                    "margin-top: -100px;" +
                    "}"
                    );
                SC3_Plugin.UI.addStyle(
                    ".flashingBlue {" +
                        "background-color: rgba(82, 168, 236, 0.8) !important;" +
                    "}" +
                    ".flashingBlueTransition {" +
                        "-webkit-transition: background 0.3s ease-in-out!important;" +
                        "-moz-transition:    background 0.3s ease-in-out!important;" +
                        "-ms-transition:     background 0.3s ease-in-out!important;" +
                        "transition:         background 0.3s ease-in-out!important;" +
                    "}"
                    );
                //add elements to DOM
                var $div = $('<div id="plugin_SearchPanel"/>').addClass("searchPanel").appendTo($("body"));
                var $ul = $('<ul id="ticketList" data-bind="foreach: currentArray" class="dropdown-menu" role="menu"/>')
                     .append("<li role='menuitem'><a href='#' data-bind='text: $data, click: $parent.processInput' target='blank'/></li>")
                     .appendTo($div);
                ko.applyBindings(SC3_Plugin.UI.searchPanel.searchQueue, $ul[0]);

                var $form = $("form:first", SC3_Plugin.get.topPanel);
                $form.toggle()
                    .css("margin", "0px")
                    .removeClass("form-search navbar-form pull-right")
                    .appendTo($div);

                //handle events
                var $input = $form.find("input")
                    .attr("autocomplete","off")
                    .keydown(function (e) {
                        if (e.keyCode == 38 || e.keyCode == 40) { //move focus to dropdown on up || down
                            e.preventDefault();
                            $ul.dropdown('toggle');
                            $ul.find(e.keyCode == 40 ? "li:first > a" : "li:last > a").focus();
                        }
                        if (e.keyCode == 27) { // hide all
                            $input.blur();
                            $div.toggle();
                        }
                    })
                    .focus(function () { $(this).select(); })
                    .focusout(function () { setTimeout(function () { if (!$ul.find('a').is(":focus")) $div.css('display', 'none') }, 100); });
                return $div;
            },
            attachKeys: function () {
                var invokePanel = function (event) {
                    if (event.keyCode == 70 && event.ctrlKey) { //ctrl + f
                        event.preventDefault();
                        SC3_Plugin.UI.searchPanel.searchQueue.getAll(); //refresh list
                        var $panel = SC3_Plugin.get.searchPanel();
                        if ($panel.length == 0)
                            $panel = SC3_Plugin.UI.searchPanel.create();
                        $panel.toggle();
                        if ($panel.is(':visible')) {
                            var $input = $panel.find("input");
                            $input.focus();
                            //invoke flashing
                            $input.addClass("flashingBlue flashingBlueTransition");
                            setTimeout(function () { $input.removeClass("flashingBlue"); }, 300);
                            setTimeout(function () { $input.removeClass("flashingBlueTransition"); }, 600);
                        }
                    }
                };
                attachGlobalBindings(invokePanel);
            }
        },
        applyDXColors: function () {
            if (SC3_Plugin.enabled.colors.dxOwner) {
                //apply <color> to the DX comment / answer            
                this.addStyle(
                '.dxOwner, .dxOwner + .plugin_collapseBtn {' +
                "border-left-color: #D76A31 !important;" +
                "}");
                SC3_Plugin.get.messageHeaders().each(function () {
                    var $span = $(this).find("span:contains('DevExpress')");
                    if ($span.length > 0) {
                        $span.css("color", "#D76A31");
                        $(this).parents("section").addClass('dxOwner');
                    }
                });
            }

            if (SC3_Plugin.enabled.colors.license) {
                //apply <color> to the user info https://docs.google.com/document/d/1a9-9d5UOAeKvytX3DnBry6v9EES-weFvtQdlSWGAiAs/edit
                var greenStatus = ["Employee", "Licensed"];
                var redStatus = ["No product license", "Product not set", "Trial"];
                var userStatus = supportCenter.model.details.OwnerInfo.UserInfo;
                var $span = $("span", SC3_Plugin.selectors.ticketInfo).filter(function () { return $(this).text() == userStatus; });
                if ($.inArray(userStatus, greenStatus) > -1) $span.parent().css("color", "green");
                if ($.inArray(userStatus, redStatus) > -1) $span.parent().css("color", "red");
            }
            if (SC3_Plugin.enabled.colors.vbUser) {
                //apply red color for a user which uses VB.NET
                $("li", SC3_Plugin.selectors.ticketInfo)
                    .filter(function () { return $(this).text().indexOf("VB.NET") > -1; })
                    .css("color", "red");
            }
            if (SC3_Plugin.enabled.colors.markedAsSolution) {
                //apply the green color to marked as solution token
                var $markedAsSolutionToken = $("span[title='This answer is solution']", SC3_Plugin.selectors.answerTokens);
                if ($markedAsSolutionToken) $markedAsSolutionToken.css('background-color', '#32D15A');
            }
            if (SC3_Plugin.enabled.colors.redUrgent) {
                //make urgent element red
                if (supportCenter.model.details.Urgent.value) {
                    var $urgent = $("input[name='Urgent']", SC3_Plugin.selectors.detailsSection).parent();
                    $urgent.css('color', 'red');
                    $urgent.css('font-weight', 'bold');
                }
            }
        },
        change: function () {
            if (SC3_Plugin.enabled.ui.addViewOnWebButton) {
                //Add view on web
                var ticketID = supportCenter.model.ticket.ArticleId;
                var $span = $("span", SC3_Plugin.selectors.ticketInfo).filter(function () { return $(this).text() == ticketID; });
                var $viewOnWeb = $('<a href="http:////devexpress.com/issue=ID" target="blank">View on Web</a>'.replace(/ID/g, ticketID))
                    .appendTo($span.parent())
                    .css("padding-left", "5px");

                //select ticket id on click
                $span.click(function () {
                        var range = document.createRange();
                        range.setStartBefore(this.firstChild);
                        range.setEndAfter(this.lastChild);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    });
            }

            if (!SC3_Plugin.enabled.ui.changeDefaultStyle) return;

            this.addStyle(
             '.leftSide{' +
            "width: 71% !important;" +
             "}");
            this.addStyle(
             '.rightSide{' +
            "left: 75% !important;" +
            "width: 25% !important;" +
             "}");
            $(SC3_Plugin.selectors.rightSide).addClass("rightSide");
            $(SC3_Plugin.selectors.leftSide).addClass("leftSide");
            SC3_Plugin.get.ticketEditors().each(function () {
                $(this).find(".controls").css("width", "290px");
            });

            if (SC3_Plugin.pageType() != "New" && SC3_Plugin.enabled.ui.moveTicketDetailsOnTop) {
                //move urgent/tracked/private/corrector on top
                var $element = $(".sidebar-right-column", SC3_Plugin.selectors.detailsSection)
                    .addClass("moveDetails")
                    .appendTo($(SC3_Plugin.selectors.ticketInfo));
                var left = ($element.parent().width() - $element.width()) / $element.parent().width() * 100;
                this.addStyle(
                    ".moveDetails {" +
                    "position : absolute;" +
                    "left: " + left + "%;" +
                    "top: 0%;" +
                    "width: 150px;" +
                    "}"
                    );
            }
            if (SC3_Plugin.enabled.ui.reorderCategories) {
                //move assignToMe one up and make a small margin, make Duplicated last
                var findEditor = function (collection, name) {
                    for (var i = 0; i < collection.length; i++) {
                        if ($(collection[i]).find("div:first").text().trim() == name) return $(collection[i]);
                    }
                };
                var $editors = SC3_Plugin.get.ticketEditors();
                var $assignedTo = findEditor($editors, "Assigned");
                $assignedTo
                    .css("padding-bottom", "20px")
                    .insertBefore($assignedTo.prev());
                var $duplicated = findEditor($editors, "Duplicated In");
                $duplicated.insertAfter($duplicated.next());
            }

            //move tokens
            if (SC3_Plugin.enabled.ui.moveEditFromTokensUp) {
                var $buttons = $(".new-item a");
                $buttons.each(function () {
                    $(this).on('click', function (e) {
                        var $container = $(this).parents(".item-header");
                        var $states = $container.find(SC3_Plugin.selectors.newTokens);
                        if ($(this).data("correct") == undefined){
                            $(this).data("correct",true);
                            $states.css("padding-top", $(this).css("padding-top")).appendTo($states.prev());
                        }
                    });
                });

                var $existingTokens = $(SC3_Plugin.selectors.existingTokens);
                $existingTokens.each(function () {
                    $(this).find("ul").css("margin", "0px 0px 0px 15px");
                    $(this).css("margin-top","0px").appendTo($(this).parent().find(SC3_Plugin.selectors.commentHeader));
                });
            }
        },
        attachKeyBindings: function () {
            if (!SC3_Plugin.enabled.keyBindings) return;
            var bindings = function (event) {
                if (event.keyCode == 83 && event.ctrlKey) { //submit on ctrl + s
                    event.preventDefault();
                    if (event.shiftKey) // change status to Closed if shift is pressed as well
                        fullViewModel.issueDetails.selectedStatus.value.currentValue("Closed");
                    SubmitForm();
                }
                if (event.keyCode == 81 && event.ctrlKey) { //assign to SRQ on ctl + q
                    event.preventDefault();
                    fullViewModel.issueDetails.selectedAssignTo.value.currentValue(supportCenter.model.ticket.ProcessingQueues.ReviewedQueue);
                }
                if (event.keyCode == 77 && event.ctrlKey) { // assign to me on ctl + m
                    event.preventDefault();
                    if (event.shiftKey) // change status to Closed if shift is pressed as well
                        fullViewModel.issueDetails.selectedStatus.value.currentValue("Closed");
                    fullViewModel.issueDetails.selectedAssignTo.value.currentValue(SC3_Plugin.get.myInfo().Value);
                }
            };
            attachGlobalBindings(bindings);
        },
        collapseLongMessages: function () {
            if (!SC3_Plugin.enabled.collapseMessages) return;
            this.addStyle(
            '.plugin_collapsed{' +
             "max-height: 400px;" +
             "overflow: hidden;" +
            "}");
            this.addStyle(
            '.plugin_collapseBtn{' +
            "height: 20px;" +
            "width: 100%;" +
            "text-align: center;" +
            "color: #004488;" +
            "background-color: inherit" +
            "}");

            var AddCollapseButton = function (msg, mainElement) {
                $('<div/>', {
                    text: 'Show more'
                })
                .data({ "text-swap": "Show less", "text-original": "Show more" })
                .bind("click", function (event) {
                    var el = $(this);
                    el.text() == el.data("text-swap")
                    ? el.text(el.data("text-original"))
                    : el.text(el.data("text-swap"));
                    if (msg.hasClass("plugin_collapsed")) {
                        msg.removeClass("plugin_collapsed");
                    } else {
                        msg.addClass("plugin_collapsed");
                        $(SC3_Plugin.selectors.leftSide).scrollTo(mainElement, { offsetTop: '60' });
                    }
                })
                .addClass("plugin_collapseBtn")
                .insertAfter(msg);
            };

            SC3_Plugin.get.messages().each(function () {
                if ($(this).height() > 500) {
                    var $viewingBody = $(".item-html:first", this);
                    $viewingBody.addClass("plugin_collapsed");
                    AddCollapseButton($viewingBody, $(this));
                }
            });

        }
    }
}

function attachGlobalBindings(func) {
    $(document).keydown(func);
    setTimeout(function () {  //iframes do not exist on ready
        var $elements = $('iframe').contents();
        $elements.keydown(func);
    }, 2500);
}

function SubmitForm() {
    if (SC3_Plugin.pageType() == "TicketList") {
        supportCenter.viewModel.list.refresh();
        return;
    }
    if (supportCenter.common.changesCounter.hasChanges())
        fullViewModel.bottomPanelItems.submitButtonClick();
}

$.fn.scrollTo = function (target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) { callback = options; options = target; }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function () {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({ scrollTop: scrollY }, parseInt(settings.duration), settings.easing, function () {
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
}

$().ready(function () {
    SC3_Plugin.init();
});