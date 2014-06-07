// ==UserScript==
// @name        Strims - Aggregated Entries
// @namespace   gintd.userscripts.strims.aggregated_entries
// @author      gintd
// @include     *strims.pl*
// @downloadurl https://userscripts.org/scripts/source/179143.user.js
// @updateurl   https://userscripts.org/scripts/source/179143.meta.js
// @version     0.5.7
// @grant       none
// ==/UserScript==

function main()
{
  function TranslatedDate()
  {
    var date = new Date();
    
    function format()
    {
      return (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    }
    
    var months = { "stycznia": "january",
                   "lutego": "february",
                   "marca": "march",
                   "kwietnia": "april",
                   "maja": "may",
                   "czerwca": "june",
                   "lipca": "july",
                   "sierpnia": "august",
                   "września": "september",
                   "października": "october",
                   "listopada": "november",
                   "grudnia": "december"
                 };
    
    var today = format();
    date.setDate(date.getDate() - 1);
    var yesterday = format();
    
    this.parse =
      function(str)
      {
        return Date.parse(str.replace(/^(\d+ )(\D+)( .*)$/,
                                      function(m,prefix,month,postfix)
                                      {
                                        return prefix+months[month]+postfix;
                                      })
                             .replace("dzisiaj", today)
                             .replace("wczoraj", yesterday));
      };
  }
  
  function EntriesLoader(strims)
  {
    var readyEntries = {};
    var mode, weightFunction, defaultCallbacks = {};
    
    function Buffers()
    {
      var sessionRunning = false;
      var readyCount, maxCount;
      var onInit, onStep, onDone;
  
      var _buffers = strims.map(
        function(strim)
        {
          return { "strim": strim.slice(1),
                   "url": "http://strims.pl"+strim+"/wpisy"
                 };
        });
      
      this.initMode =
        function(forMode)
        {
          _buffers.forEach(function(buffer)
            {
              buffer[forMode] = { "nextPage": 1,
                                  "empty": true,
                                  "entries": [],
                                  "entriesIterator": 0,
                                  "entriesCount": 0
                                };
            });
        };
      
      function reset()
      {
        readyCount = 0;
        maxCount = 0;
        onInit = $.noop;
        onStep = $.noop;
        onDone = $.noop;
      }
  
      this.startSession = function(callbacks)
        {
          if (! sessionRunning)
          {
            reset();
            
            onInit = function()
                     {
                       if ($.isFunction(callbacks.loadingInit))
                         callbacks.loadingInit.apply(this, arguments);
                       
                       onInit = $.noop;
                     };
            
            if ($.isFunction(callbacks.loadingStep))
              onStep = callbacks.loadingStep;
            
            if ($.isFunction(callbacks.loadingDone))
              onDone = callbacks.loadingDone;
            
            sessionRunning = true;
          }
        };
  
      this.endSession = function()
        {
          sessionRunning = false;
          onDone(readyCount, maxCount);
        };
      
      function isEmpty(buffer)
      {
        return buffer[mode].empty;
      }
      
      this.isEveryEmpty = function()
        {
          return _buffers.every(isEmpty)
        };
      
      function isFillable(buffer)
      {
        return buffer[mode].nextPage !== null && buffer[mode].empty;
      }
      
      this.anyFillable = function()
        {
          return _buffers.some(isFillable);
        };

      function getFillable()
      {
        return _buffers.filter(isFillable);
      }
      
      function parseEntry(entry, buffer)
      {
        entry.find("ul.entry_info > li:first > span:first")
          .append("w <a href=\"/"+buffer.strim+"\">"+buffer.strim+"</a>");
          
        buffer[mode].entries.push({ "weight": weightFunction(entry),
                                    "entry": entry.get(0)
                                  });
      }
                    
      function parseResponse(response, buffer)
      {
        if (response.status == "OK" && response.content.entries_list != "")
        {
          var entries = $($.parseHTML(response.content.entries_list))
                          .filter("li");
          
          entries.each(function()
                       {
                         parseEntry($(this), buffer);
                       });
          
          buffer[mode].nextPage++;
          
          if (entries.length > 0)
          {
            buffer[mode].empty = false;
            buffer[mode].entriesCount += entries.length;
            
            return;
          }
        }
        buffer[mode].nextPage = null;
      }
                       
      function increment(callback)
      {
        var current = ++readyCount;
        onStep(current, maxCount);
        if (current == maxCount)
        {
          callback();
        }
      }
                   
      this.fill = function(callback)
        {
          var fillable = getFillable();
          maxCount += fillable.length;
          
          onInit(readyCount, maxCount);
          
          fillable.forEach(
            function(buffer)
            {
              buffer[mode].entries = [];
              $.getJSON(buffer.url+mode, { "strona": buffer[mode].nextPage })
                .done(function(response)
                      {
                        parseResponse(response, buffer);
                      })
                .fail(function(){ buffer[mode].nextPage = null; })
                .always(increment.bind(null, callback));
            });
        };
  
      function shiftEntry(buffer)
      {
        var entry = buffer[mode]
                      .entries[buffer[mode].entriesIterator++]
                      .entry;
        
        if (buffer[mode].entriesIterator == buffer[mode].entriesCount)
        {
          buffer[mode].empty = true;
          buffer[mode].entriesIterator = 0;
          buffer[mode].entriesCount = 0;
        }
        
        return entry;
      }
  
      function reduceToHeaviestEntry(prev, curr_, index)
      {
        var curr = curr_[mode];
        
        if (prev === null)
        {
          if (! curr.empty)
          {
            return { "weight": curr.entries[curr.entriesIterator].weight,
                     "bufferIndex": index
                   };
          } else
          {
            return null;
          }
        } else
        {
          if (! curr.empty)
          {
            if (prev.weight < curr.entries[curr.entriesIterator].weight)
            {
              return { "weight": curr.entries[curr.entriesIterator].weight,
                       "bufferIndex": index
                     };
            } else
            {
              return prev;
            }
          } else
          {
            return prev;
          }
        }
      }
  
      this.shiftHeaviestEntry = function()
        {
          var heaviest = _buffers.reduce(reduceToHeaviestEntry, null);
          if (heaviest !== null)
          {
            return shiftEntry(_buffers[heaviest.bufferIndex]);
          }
        };
      
    }
    var buffers = new Buffers();
    
    var date = new TranslatedDate();
    function getEntryDate(entry)
    {
      return date.parse($("ul.entry_info:first span[title]:first", entry)
                          .attr("title"));
    }
    
    function getEntryVoting(entry)
    {
      var voting = $("div.entry_voting:first", entry);
      var uv = $.trim($("a.like span.entry_vote_count", voting).text());
      var dv = $.trim($("a.dislike span.entry_vote_count", voting).text());
      return (uv - dv);
    }
    
    this.setMode =
      function(newMode)
      {
        mode = newMode;
        
        if (newMode == "/najnowsze")
        {
          weightFunction = getEntryDate;
        } else
        {
          weightFunction = getEntryVoting;
        }
        
        if (typeof readyEntries[mode] == "undefined")
        {
          readyEntries[mode] = [];
          buffers.initMode(mode);
        }
      };
    this.setMode("/najnowsze");
    
    function prepareEntries(count, callbacks)
    {
      buffers.startSession(callbacks);
      
      while (readyEntries[mode].length < count)
      {
        if (buffers.anyFillable())
        {
          buffers.fill(prepareEntries.bind(null, count, callbacks));
          return;
        }
        
        if (! buffers.isEveryEmpty())
        {
          readyEntries[mode].push(buffers.shiftHeaviestEntry());
        } else
        {
          break;
        }
      }
      
      buffers.endSession();
      callbacks.entriesReady();
    }
    
    this.setDefaultCallbacks =
      function(callbacks)
      {
        defaultCallbacks.loadingInit = callbacks.loadingInit;
        defaultCallbacks.loadingStep = callbacks.loadingStep;
        defaultCallbacks.loadingDone = callbacks.loadingDone;
        defaultCallbacks.entriesReady = callbacks.entriesReady;
      };
    
    this.get =
      function(firstPage, lastPage, callbacks)
      {
        var count = lastPage*30;
        var sliceStart = (firstPage-1)*30;
        var sliceEnd = lastPage*30;
        
        if (typeof callbacks == "undefined")
          callbacks = {};
        
        var wrappedCallbacks = {};
        wrappedCallbacks.loadingInit =
          callbacks.loadingInit || defaultCallbacks.loadingInit;
        wrappedCallbacks.loadingStep =
          callbacks.loadingStep || defaultCallbacks.loadingStep;
        wrappedCallbacks.loadingDone =
          callbacks.loadingDone || defaultCallbacks.loadingDone;
        wrappedCallbacks.entriesReady =
          function()
          {
            (callbacks.entriesReady || defaultCallbacks.entriesReady)(
              readyEntries[mode].slice(sliceStart, sliceEnd));
          };
        
        prepareEntries(count, wrappedCallbacks);
      };
  }
  
  
  function EntriesUi(section)
  {
    var entriesUi = this;
    
    var loggedUser;
    {
      var anchor = $("#top_user_submenu_wrapper a.user_name");
      loggedUser = { "href": anchor.attr("href"),
                     "avatar": $("img", anchor).attr("src")
                   };
    }
  
    this.getInnerColumn =
      function()
      {
        if (typeof this.innerColumn == "undefined")
        {
          this.innerColumn = $("\
<div id=\"entries_page\" class=\"page padding clear\">\
  <div class=\"column_center\">\
    <div class=\"column_inner\">\
    </div>\
  </div>\
</div>").appendTo("#content > div.template_wrapper").find("div.column_inner");
        }
        
        return this.innerColumn;
      };
      
    this.getEntriesMenu =
      function()
      {
        if (typeof this.entriesMenu == "undefined")
        {
          this.entriesMenu = $("\
<div class=\"menu_wrapper clear\">\
  <ul class=\"menu_buttons\">\
    <li>\
      <a class=\"button \"\
         href=\""+section+"/wpisy\">\
        Najnowsze\
      </a>\
    </li>\
    <li>\
      <a class=\"button \"\
         href=\""+section+"/wpisy/najlepsze\">\
        Najlepsze\
      </a>\
    </li>\
  </ul>\
</div>");
          
          var buttonNajnowsze, buttonNajlepsze;
          buttonNajnowsze = $("a:contains('Najnowsze')", this.entriesMenu);
          buttonNajlepsze = $("a:contains('Najlepsze')", this.entriesMenu);
          buttonNajnowsze.mode = "/najnowsze";
          buttonNajlepsze.mode = "/najlepsze/dzien";
          this.entriesMenu.buttons = [ buttonNajnowsze, buttonNajlepsze ];
          
          var dropdown = $("\
<div class=\"menu_dropdown\">\
  <a class=\"button mixed\">\
    <span class=\"icon icon_arrow_full big down gray\">\
    </span>\
  </a>\
  <ul class=\"no_display\">\
    <li>\
      <a href=\""+section+"/wpisy/najlepsze/kiedykolwiek\">\
        Kiedykolwiek\
      </a>\
    </li>\
    <li>\
      <a href=\""+section+"/wpisy/najlepsze/dzien\">\
        Ostatni dzień\
      </a>\
    </li>\
    <li>\
      <a href=\""+section+"/wpisy/najlepsze/tydzien\">\
        Ostatni tydzień\
      </a>\
    </li>\
    <li>\
      <a href=\""+section+"/wpisy/najlepsze/miesiac\">\
        Ostatni miesiąc\
      </a>\
    </li>\
    <li>\
      <a href=\""+section+"/wpisy/najlepsze/rok\">\
        Ostatni rok\
      </a>\
    </li>\
  </ul>\
</div>").appendTo(this.entriesMenu).hide();
        
          this.entriesMenu.dropdown = dropdown;
          
          dropdown.labelButton = $("a.button", dropdown);
          dropdown.labelButton.icon = $("span.icon", dropdown.labelButton)
                                        .clone();
          dropdown.labelButton.labels =
            { "/najlepsze/kiedykolwiek": "Kiedykolwiek",
              "/najlepsze/dzien": "Ostatni dzień",
              "/najlepsze/tydzien": "Ostatni tydzień",
              "/najlepsze/miesiac": "Ostatni miesiąc",
              "/najlepsze/rok": "Ostatni rok"
            };
          dropdown.labelButton.setLabel = function(mode)
            {
              dropdown.labelButton
                .text(dropdown.labelButton.labels[mode])
                .prepend(dropdown.labelButton.icon.clone());
            };
          
          dropdown.choices = $("ul a", dropdown).each(
            function()
            {
              var choice = $(this);
              var mode = choice.attr("href").match(/\/najlepsze\/\w+$/)[0];
              choice.click(function(event)
                {
                  event.preventDefault();
                  dropdown.labelButton.setLabel(mode);
                  buttonNajlepsze.attr("href", section+"/wpisy"+mode);
                  buttonNajlepsze.mode = mode;
                  buttonNajlepsze.click();
                });
            });
          
          buttonNajnowsze.click(function(event)
            {
              event.preventDefault();
              
              if (! buttonNajnowsze.hasClass("selected"))
              {
                buttonNajnowsze.addClass("selected");
                buttonNajlepsze.removeClass("selected");
                
                dropdown.hide();
              }
            });
          
          buttonNajlepsze.click(function(event)
            {
              event.preventDefault();
              
              if (! buttonNajlepsze.hasClass("selected"))
              {
                buttonNajlepsze.addClass("selected");
                buttonNajnowsze.removeClass("selected");
                
                dropdown.labelButton.setLabel(buttonNajlepsze.mode);
                dropdown.show();
              }
            });
          
          this.entriesMenu.link =
            function(entriesLoader, entriesPage)
            {
              function makeEventHandler(target)
              {
                return (function(event)
                  {
                    var mode = target.mode;
                    entriesPage.setMode(mode);
                    entriesLoader.setMode(mode);
                    
                    entriesUi.getEntriesList().removeEntries();
                    entriesPage.setCurrentPageUrl();
                    
                    entriesUi.getPagination().update(mode, entriesPage);
                    
                    entriesLoader.get(entriesPage.getFirstPage(),
                                      entriesPage.getLastPage());
                  });
              }

              buttonNajnowsze.click(makeEventHandler(buttonNajnowsze));
              buttonNajlepsze.click(makeEventHandler(buttonNajlepsze));
              
              var mode = entriesPage.getMode();
              if (mode == "/najnowsze")
                buttonNajnowsze.click();
              else
                dropdown.choices
                  .filter("[href$='"+mode+"']")
                  .click();
            };
        }
        
        return this.entriesMenu;
      };
      
    this.getIndicatorsWrapper =
      function()
      {
        if (typeof this.indicatorsWrapper == "undefined")
        {
          this.indicatorsWrapper =
            $("<div id=\"indicators_wrapper\"/>")
              .css({ "float": "right",
                     "height": "24px",
                     "margin-left": "5px",
                     "padding": "1px 2px"
                   });
          
          var progressbar =
            $("<div id=\"progressbar\"/>")
              .appendTo(this.indicatorsWrapper)
              .css({ "position": "relative",
                     "width": "150px",
                     "height": "22px",
                     "border": "1px solid rgba(140, 140, 140, 0.7)",
                     "border-radius": "2px",
                     "box-shadow": "0px 1px 2px -1px rgba(0, 0, 0, 0.5) inset"
                   });
              
          var progressbarBg = $("<div/>")
            .css({ "position": "absolute",
                   "top": "0px",
                   "left": "0px",
                   "width": "0%",
                   "height": "100%",
                   "background-color": "rgba(110,186,250, 0.5)"
                 });
          
          var progressbarLb = $("<span/>")
            .css({ "position": "absolute",
                   "top": "0px",
                   "left": "0px",
                   "width": "100%",
                   "height": "100%",
                   "line-height": "22px",
                   "text-align": "center",
                   "vertical-align": "middle"
                 })
            .text("Pobieranie listy strimów");
          
          progressbar
            .append(progressbarBg)
            .append(progressbarLb);
          
          progressbar.open =
            function()
            {
              progressbarBg.width("0%");
              progressbarLb.text("Pobrano");
              progressbar.show();
            };
          progressbar.close =
            function()
            {
              progressbar.hide();
            };
          progressbar.set =
            function(currentVal, maxVal)
            {
              progressbarBg.width(Math.floor(currentVal/(maxVal||1)*100)+"%");
              progressbarLb.text("Pobrano "+currentVal+"/"+maxVal);
            };
          
          this.indicatorsWrapper.progressbar = progressbar;
        }
        
        return this.indicatorsWrapper;
      };
      
    this.getEntriesMainForm =
      function()
      {
        if (typeof this.entriesMainForm == "undefined")
        {
          this.entriesMainForm = $("\
<div id=\"entries_form_main_wrapper\">\
  <form action=\"/ajax/wpisy/dodaj\" method=\"post\" accept-charset=\"utf-8\"\
        class=\"entries_form add hidden\">\
    <input name=\"token\" value=\""+page_template.token+"\" type=\"hidden\">\
    <input name=\"_external[parent]\" class=\"entries_form_parent\"\
           type=\"hidden\">\
    <a class=\"entries_form_image\" href=\""+loggedUser.href+"\">\
      <img src=\""+loggedUser.avatar+"\" alt=\"\">\
    </a>\
    <div class=\"entries_form_inner\">\
      <div class=\"form_row no_margin\">\
        <div class=\"form_input\">\
          <ul class=\"textarea_bar buttons_bar small clear\
                      entries_form_options_wrapper no_display\">\
            <li>\
              <a class=\"button small fixed bold\" href=\"#\"\
                 title=\"Tekst pogrubiony\">\
                b\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed italic\" href=\"#\"\
                 title=\"Tekst pochylony\">\
                i\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed strike\" href=\"#\"\
                 title=\"Tekst przekreślony\">\
                s\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed cite\" href=\"#\"\
                 title=\"Cytat\">\
                \"\
              </a>\
            </li>\
            <li>\
              <a class=\"button small spoiler\" href=\"#\"\
                 title=\"Spoiler\">\
                sp\
              </a>\
            </li>\
            <li>\
              <a class=\"button small code\" href=\"#\"\
                 title=\"Kod komputerowy\">\
                code\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed icon url\" href=\"#\"\
                 title=\"Link\">\
                <span class=\"icon icon_kind link\">\
                </span>\
              </a>\
            </li>\
          </ul>\
          <div style=\"position: relative;\" class=\"autoheight_wrapper\">\
            <textarea name=\"text\" cols=\"1\" rows=\"1\"\
                      style=\"overflow: hidden;\"\
                      class=\"entries_form_text input_textarea\"/>\
            <div style=\"width: 100%;\
                         word-wrap: break-word; white-space: pre-wrap;\
                         font-size: 13px; line-height: 16px;\
                         visibility: hidden; position: absolute;\
                         top: 0px; padding-right: 6px;\"\
                 class=\"input_textarea\">\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class=\"form_row small\">\
        <div class=\"form_input\">\
          <ul class=\"buttons_bar clear\">\
            <li>\
              <button type=\"submit\" class=\"entries_form_submit button\">\
                Wyślij\
              </button>\
            </li>\
            <li>\
              <a class=\"button fixed disabled\"\
                 style=\"width: 27px\"\
                 title=\"Wysyłaj wpisy Enterem\">\
                <span class=\"icon icon_enter\">\
                </span>\
              </a>\
            </li>\
            <li>\
              <a class=\"entries_form_options button fixed\"\
                 title=\"Ustawienia\" href=\"#\">\
                <span class=\"icon icon_options\">\
                </span>\
              </a>\
            </li>\
            <li class=\"entries_form_options_wrapper no_display\">\
              <label>\
                <input name=\"nsfw\" value=\"1\"\
                       class=\"entries_form_nsfw input_checkbox\"\
                       type=\"checkbox\">\
                Tylko dla dorosłych\
              </label>\
            </li>\
            <li class=\"entries_form_chars_limit no_display\">\
            </li>\
            <li>\
              <label>\
                do s/\
                <input name=\"_external[strim]\" value=\"\">\
              </label>\
            </li>\
          </ul>\
        </div>\
      </div>\
    </div>\
  </form>\
</div>");
      
        }
        
        return this.entriesMainForm;
      };
      
    this.getEntriesReplyForm =
      function()
      {
        if (typeof this.entriesReplyForm == "undefined")
        {
          this.entriesReplyForm = $("\
<li id=\"entries_form_reply_wrapper\"\
    class=\"entries_form_wrapper no_display\">\
  <form action=\"/ajax/wpisy/dodaj\" method=\"post\" accept-charset=\"utf-8\"\
        class=\"entries_form add reply\">\
    <input name=\"token\" value=\""+page_template.token+"\"\
           type=\"hidden\">\
    <input name=\"_external[parent]\" class=\"entries_form_parent\"\
           type=\"hidden\">\
    <input name=\"_external[strim]\" type=\"hidden\">\
    <a class=\"entries_form_image\" href=\""+loggedUser.href+"\">\
      <img src=\""+loggedUser.avatar+"\" alt=\"\">\
    </a>\
    <div class=\"entries_form_inner\">\
      <div class=\"form_row no_margin\">\
        <div class=\"form_input\">\
          <ul class=\"textarea_bar buttons_bar small clear\
                      entries_form_options_wrapper no_display\">\
            <li>\
              <a class=\"button small fixed bold\" href=\"#\"\
                 title=\"Tekst pogrubiony\">\
                b\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed italic\" href=\"#\"\
                 title=\"Tekst pochylony\">\
                i\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed strike\" href=\"#\"\
                 title=\"Tekst przekreślony\">\
                s\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed cite\" href=\"#\"\
                 title=\"Cytat\">\
                \"\
              </a>\
            </li>\
            <li>\
              <a class=\"button small spoiler\" href=\"#\"\
                 title=\"Spoiler\">\
                sp\
              </a>\
            </li>\
            <li>\
              <a class=\"button small code\" href=\"#\"\
                 title=\"Kod komputerowy\">\
                code\
              </a>\
            </li>\
            <li>\
              <a class=\"button small fixed icon url\" href=\"#\"\
                 title=\"Link\">\
                <span class=\"icon icon_kind link\">\
                </span>\
              </a>\
            </li>\
          </ul>\
          <div style=\"position: relative;\" class=\"autoheight_wrapper\">\
            <textarea style=\"overflow: hidden;\" name=\"text\"\
                      cols=\"1\" rows=\"1\"\
                      class=\"entries_form_text input_textarea\"/>\
            <div style=\"width: 100%; word-wrap: break-word;\
                         white-space: pre-wrap; font-size: 13px;\
                         line-height: 16px; visibility: hidden;\
                         position: absolute; top: 0px; padding-right: 6px;\"\
                 class=\"input_textarea\">\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class=\"form_row small\">\
        <div class=\"form_input\">\
          <ul class=\"buttons_bar clear\">\
            <li>\
              <button type=\"submit\" class=\"entries_form_submit button\">\
                Wyślij\
              </button>\
            </li>\
            <li>\
              <a class=\"entries_form_cancel button\" href=\"#\">\
                Anuluj\
              </a>\
            </li>\
            <li>\
              <a class=\"button fixed disabled\"\
                 style=\"width: 27px\"\
                 title=\"Wysyłaj wpisy Enterem\">\
                <span class=\"icon icon_enter\">\
                </span>\
              </a>\
            </li>\
            <li>\
              <a class=\"entries_form_options button fixed\"\
                 title=\"Ustawienia\" href=\"#\">\
                <span class=\"icon icon_options\">\
                </span>\
              </a>\
            </li>\
            <li class=\"entries_form_options_wrapper no_display\">\
              <label>\
                <input name=\"nsfw\" value=\"1\"\
                       class=\"entries_form_nsfw input_checkbox\"\
                       type=\"checkbox\">\
                Tylko dla dorosłych\
              </label>\
            </li>\
            <li class=\"entries_form_chars_limit no_display\">\
            </li>\
          </ul>\
        </div>\
      </div>\
    </div>\
  </form>\
</li>");
      
        }
        
        return this.entriesReplyForm;
      };
      
    this.getEntriesList =
      function()
      {
        if (typeof this.entriesList == "undefined")
        {
          var entriesList = $("<ul class=\"entries dynamic\"/>");
          this.entriesList = entriesList;
          
          this.entriesList.appendEntries =
            function(entries)
            {
              entriesList.append(entries);
              
              entries.length && entriesUi.getPagination().show();
            };
          
          this.entriesList.removeEntries =
            function()
            {
              entriesList
                .children("li[id!='entries_form_reply_wrapper']")
                .remove();
              
              entriesUi.getPagination().hide();
            };
        }
        
        return this.entriesList;
      };
    
    this.getPagination =
      function()
      {
        if (typeof this.pagination == "undefined")
        {
          this.pagination = $("\
<ul class=\"pagination light more buttons_bar clear\">\
  <li>\
    <a class=\"button mixed more\">\
      <span class=\"icon icon_arrow_full big down gray\">\
      </span>\
      Więcej\
    </a>\
  </li>\
  <li class=\"loader no_display\">\
    <span class=\"icon icon_loader\">\
    </span>\
  </li>\
  <li>\
    <a class=\"button mixed prev\">\
      <span class=\"icon icon_arrow_full big left gray\">\
      </span>\
      Poprzednia\
    </a>\
  </li>\
  <li>\
    <a class=\"button mixed next\">\
      Następna\
      <span class=\"icon icon_arrow_full big right gray\">\
      </span>\
    </a>\
  </li>\
</ul>").hide();
          
          var buttonMore = $("a.more", this.pagination);
          this.pagination.buttonMore = buttonMore;
          var loader = $("li.loader", this.pagination);
          this.pagination.loader = loader;
          var buttonPrevPage = $("a.prev", this.pagination);
          this.pagination.buttonPrevPage = buttonPrevPage;
          var buttonNextPage = $("a.next", this.pagination);
          this.pagination.buttonNextPage = buttonNextPage;
          
          this.pagination.update =
            function(mode, entriesPage)
            {
              buttonMore.attr(
                "href",
                entriesPage.shortenUrl(mode,
                                       entriesPage.getFirstPage(),
                                       entriesPage.getLastPage()+1));
              
              if (entriesPage.getFirstPage() == 1)
                buttonPrevPage.parent().hide();
              else
              {
                buttonPrevPage.parent().show();
                buttonPrevPage.attr(
                  "href",
                  entriesPage.shortenUrl(mode,
                                         entriesPage.getFirstPage()-1,
                                         entriesPage.getFirstPage()-1));
              }
              
              buttonNextPage.attr(
                "href",
                entriesPage.shortenUrl(mode,
                                       entriesPage.getLastPage()+1,
                                       entriesPage.getLastPage()+1));
            };
          
          this.pagination.link =
            function(entriesLoader, entriesPage)
            {
              var progressbar = entriesUi.getIndicatorsWrapper().progressbar;
              
              buttonMore.click(
                function(event)
                {
                  event.preventDefault();
                  event.stopPropagation();
                  
                  buttonMore.addClass("disabled");
                  loader.removeClass("no_display");
                  
                  entriesPage.setLastPage(entriesPage.getLastPage()+1);
                  
                  entriesPage.setCurrentPageUrl();
                  entriesUi.pagination.update(entriesPage.getMode(),
                                              entriesPage);
                  
                  entriesLoader.get(
                    entriesPage.getLastPage(), entriesPage.getLastPage(),
                    { "loadingDone": function()
                                     {
                                       buttonMore.removeClass("disabled");
                                       loader.addClass("no_display");
                                       progressbar.close()
                                     }
                    });
                });
              
              buttonNextPage.click(
                function(event)
                {
                  event.preventDefault();
                  
                  entriesPage.setLastPage(entriesPage.getLastPage()+1);
                  entriesPage.setFirstPage(entriesPage.getLastPage());
                  
                  entriesUi.getEntriesList().removeEntries();
                  $("html, body").scrollTop(0);
                  
                  entriesPage.setCurrentPageUrl();
                  entriesUi.pagination.update(entriesPage.getMode(),
                                              entriesPage);
                  
                  entriesLoader.get(
                    entriesPage.getLastPage(), entriesPage.getLastPage());
                });
              
              buttonPrevPage.click(
                function(event)
                {
                  event.preventDefault();
                  
                  entriesPage.setFirstPage(entriesPage.getFirstPage()-1);
                  entriesPage.setLastPage(entriesPage.getFirstPage());
                  
                  entriesUi.getEntriesList().removeEntries();
                  $("html, body").scrollTop(0);
                  
                  entriesPage.setCurrentPageUrl();
                  entriesUi.pagination.update(entriesPage.getMode(),
                                              entriesPage);
                  
                  entriesLoader.get(
                    entriesPage.getLastPage(), entriesPage.getLastPage());
                });
            };
        }
        
        return this.pagination;
      };
    
    this.link =
      function(strims, entriesPage)
      {
        entriesLoader = new EntriesLoader(strims);
        
        var progressbar = entriesUi.getIndicatorsWrapper().progressbar;
        entriesLoader.setDefaultCallbacks(
          { "entriesReady": entriesUi.getEntriesList().appendEntries,
            "loadingInit": progressbar.open,
            "loadingStep": progressbar.set,
            "loadingDone": progressbar.close
          });
        
        this.getEntriesMenu().link(entriesLoader, entriesPage);
        this.getPagination().link(entriesLoader, entriesPage);
      };

    this.getInnerColumn()
      .append(this.getEntriesMenu().append(this.getIndicatorsWrapper()))
      .append(this.getEntriesMainForm())
      .append(this.getEntriesList().append(this.getEntriesReplyForm()))
      .append(this.getPagination());
  }

  function EntriesPage()
  {
    var entriesPage = this;
    
    var section, mode, firstPage = {}, lastPage = {};
    
    this.setMode =
      function(newMode)
      {
        mode = newMode;
        
        if (typeof firstPage[mode] == "undefined")
          lastPage[mode] = firstPage[mode] = 1;
      };
    
    this.getMode =
      function()
      {
        return mode;
      };
    
    this.getFirstPage =
      function()
      {
        return firstPage[mode];
      };
    
    this.setFirstPage =
      function(newPage)
      {
        firstPage[mode] = newPage;
      };
    
    this.getLastPage =
      function()
      {
        return lastPage[mode];
      };
    
    this.setLastPage =
      function(newPage)
      {
        lastPage[mode] = newPage;
      };
    
    // parse url & fix page_template
    {    
      var hrefMatched = location.href.match(
        /^http:\/\/strims.pl(|\/([sg])\/([\w_]+))\/wpisy(|\/\w+(|\/\w+))\/?(|\?strona=(\d+)(|,(\d+)))$/);
                          
      if (hrefMatched[1] != "")
      {
        page_template.section_type = hrefMatched[2];
        page_template.section_name = hrefMatched[3];
        section = hrefMatched[1];
      } else
      {
        section = "/"+page_template.section_type+"/"+page_template.section_name;
      }
      page_template.section_part = "entries";
      
      if (hrefMatched[4] == "/najlepsze" && hrefMatched[5] == "")
        mode = "/najlepsze/dzien";
      else
        mode = hrefMatched[4] || "/najnowsze";
      
      if (hrefMatched[6] != "")
      {
        firstPage[mode] = Number(hrefMatched[7]);
        lastPage[mode] = Number(hrefMatched[9] || firstPage[mode]);
        if (lastPage[mode] < firstPage[mode])
          lastPage[mode] = firstPage[mode];
      } else
      {
        lastPage[mode] = firstPage[mode] = 1;
      }

    }
      
    // fix page
    {
      document.title = section.slice(1)+" - Wpisy - strims.pl";
      
      $("#top_bar_wrapper li.section"+section.replace(/\//g,"_")+" > a")
        .addClass("selected");
        
      
      $("#top_bookmarks li")
        .each(function()
              { 
                var a = $("a", this);
                a.attr("href", section+a.attr("href"));
              })
        .filter(".bookmark_contents_new")
        .each(function(){ $("a", this).text("Najnowsze"); })
        .end()
        .filter(".bookmark_contents_top")
        .after("\
<li class=\"bookmark_entries\">\
  <a href=\""+section+"/wpisy\" class=\"selected\">\
    Wpisy\
  </a>\
</li>");
      
      $("div.error_page").remove();
    }
    
    this.shortenUrl =
      function(mode, firstPage, lastPage)
      {
        var url = section+"/wpisy";
        
        url += mode.replace("/najnowsze","")
                   .replace("/najlepsze/dzien", "/najlepsze");
        
        if (firstPage != lastPage)
          url += "?strona="+firstPage+","+lastPage;
        else if (firstPage > 1)
          url += "?strona="+lastPage;
        
        return url;
      };
    
    this.setCurrentPageUrl =
      function()
      {
        var url = entriesPage.shortenUrl(mode,
                                         entriesPage.getFirstPage(),
                                         entriesPage.getLastPage());
        window.history.replaceState(null, document.title, url);
      };
    
    var entriesUi = new EntriesUi(section);
    
    $(function(){ page_entries.init(); });
  
    
    $.getJSON(
      "http://strims.pl"+page_template.url_submenu,
      { "section_type": page_template.section_type,
        "section_name": page_template.section_name
      },
      function(data)
      {
        if (data.status == "OK")
        {
          var strims = $("li a", data.content)
                         .map(function(){ return $(this).attr("href"); })
                         .toArray();
          
          entriesUi.link(strims, entriesPage);
          
        }
      });
  }
  
  
  function isSubscribedOrMainPage()
  {
    return page_template.section_type == "s" &&
           /^(Subskrybowane|Glowny)$/.test(page_template.section_name);
  }
  
  function isGroupPage()
  {
    return page_template.section_type == "g";
  }
  
  function isErrorPageForEntries()
  {
    return $("div.error_page:contains('Przejdź do strimu aby zobaczyć wpisy.')")
             .length != 0;
  }
  
  function setPageTemplateSection()
  {

  }
  
  $(document).ready(function()
  {
    if ((isSubscribedOrMainPage() || isGroupPage())
        && ! isErrorPageForEntries())
    {
      
      $("#top_bookmarks > li.bookmark_contents_top")
        .after("\
<li class=\"bookmark_entries\">\
  <a href=\"/"+page_template.section_type+"/"+page_template.section_name+"/wpisy\">\
    Wpisy\
  </a>\
</li>");

    } else if (isErrorPageForEntries())
    {
      new EntriesPage();
    }
  });
}

function addJQuery(callback)
{
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

if (document.domain == "strims.pl")
  if (typeof $ == 'undefined')
  {
    if (typeof unsafeWindow === "undefined")
    {
        unsafeWindow = (function(){
          var dummyElem = document.createElement('a');
          dummyElem.setAttribute('onclick', 'return window;');
          return dummyElem.onclick();
        })();
    }
    
    if (unsafeWindow.jQuery)
    {
      var $ = unsafeWindow.jQuery;
      main();
    } else
    {
      addJQuery(main);
    }
  } else
  {
    main();
  }
