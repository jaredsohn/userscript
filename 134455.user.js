// ==UserScript==
// @name              Wykop - Autocomplete
// @namespace         http://gac3k.pl
// @description       Autocomplete
// @author            Dominik Gacek
// @version           1.0
// @include           http://*.wykop.pl/*
// ==/UserScript==

var main = function () 
{	
            /* =============================================================
             * bootstrap-typeahead.js v2.0.3
             * http://twitter.github.com/bootstrap/javascript.html#typeahead
             * =============================================================
             * Copyright 2012 Twitter, Inc.
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             * http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             * ============================================================ */
            /*
             * 
             * Modifications by Paul Warelis
             * 
             */
            !
            function ($) {
              "use strict"; // jshint ;_;
              /* TYPEAHEAD PUBLIC CLASS DEFINITION
               * ================================= */
              var Typeahead = function (element, options) {
                  this.$element = $(element)
                  this.options = $.extend({}, $.fn.typeahead.defaults, options)
                  this.matcher = this.options.matcher || this.matcher
                  this.sorter = this.options.sorter || this.sorter
                  this.highlighter = this.options.highlighter || this.highlighter
                  this.updater = this.options.updater || this.updater
                  this.$menu = $(this.options.menu).appendTo('body')
                  if (this.options.ajax) {
                    var ajax = this.options.ajax;
                    if (typeof ajax == "string") {
                      ajax = {
                        url: ajax
                      };
                    }
                    this.ajax = {
                      url: ajax.url,
                      timeout: ajax.timeout || 300,
                      method: ajax.method || "post",
                      triggerLength: ajax.triggerLength || 3,
                      loadingClass: ajax.loadingClass || null,
                      displayField: ajax.displayField || null,
                      preDispatch: ajax.preDispatch || null,
                      preProcess: ajax.preProcess || null,
                    }
                    this.query = "";
                  } else {
                    this.source = this.options.source
                  }
                  this.shown = false
                  this.delimiter = this.options.delimiter || this.delimiter
                  this.mode = this.options.mode || this.mode
                  this.selections = []
                  this.listen()
                }
              Typeahead.prototype = {
                constructor: Typeahead,
                select: function () {
                  var val = '@' + this.$menu.find('.active').attr('data-value') + ': '
                  var that = this;
                  if( this.mode === 'multiple' ) 
                  {
                    this.selections.push(val)
                    this.selections.join(this.delimiter)
                  }	
                  this.$element.val(function(i, original_val) {
                      return original_val.replace(original_val.substring(original_val.lastIndexOf('@')), '') + that.updater(val)
                  }).change().focus()
                  return this.hide()
                  
                  $('textarea.block').trigger('click');
                },
                updater: function (item) {
                  return item
                },
                show: function () {
                  var pos = $.extend({}, this.$element.offset(), {
                    height: this.$element[0].offsetHeight
                  })
                  this.$menu.css({
                    top: pos.top + pos.height,
                    left: pos.left
                  })
                  this.$menu.show()
                  this.shown = true
                  return this
                },
                hide: function () {
                  this.$menu.hide()
                  this.shown = false
                  return this
                },
                ajaxLookup: function () {
                  
                  var query = this.$element.val();
                  if (query == this.query) {
                    return this;
                  }
                  
                  if( ! query.match('@') )
                  {
                      return;
                  }
                  
                  query = query.replace('@', '').substring(query.lastIndexOf('@'))
                  
                  // Query changed
                  this.query = query
                  
                  // Cancel last timer if set
                  if (this.ajax.timerId) {
                    clearTimeout(this.ajax.timerId);
                    this.ajax.timerId = null;
                  }

                  if (!query || query.length < this.ajax.triggerLength) {
                    // cancel the ajax callback if in progress
                    if (this.ajax.xhr) {
                      this.ajax.xhr.abort();
                      this.ajax.xhr = null;
                      this.ajaxToggleLoadClass(false);
                    }
                    
                    return this.shown ? this.hide() : this
                  }

                  function execute() {
                    
                    this.ajaxToggleLoadClass(true);
                    // Cancel last call if already in progress
                    if (this.ajax.xhr) this.ajax.xhr.abort();
                    var params = this.ajax.preDispatch ? this.ajax.preDispatch(query) : {
                      query: query
                    }
                    var jAjax = (this.ajax.method == "post") ? $.post : $.get;
                    this.ajax.xhr = jAjax(this.ajax.url, params, $.proxy(this.ajaxSource, this));
                    this.ajax.timerId = null;
                  }
                  // Query is good to send, set a timer
                  this.ajax.timerId = setTimeout($.proxy(execute, this), this.ajax.timeout);
                  return this;
                },
                ajaxSource: function (data) {
                  if(typeof data == "string") {
                      data = JSON.parse(data);
                  }
                  
                  this.ajaxToggleLoadClass(false);
                  var that = this,
                    items
                  if (!this.ajax.xhr) return;
                  if (this.ajax.preProcess) {
                    data = this.ajax.preProcess(data);
                  }
                  
                  // Save for selection retreival
                  this.ajax.data = data;
                  items = $.grep(data, function (item) {
                    if (that.ajax.displayField) {
                      item = item[that.ajax.displayField]
                    }
                    if (that.matcher(item)) return item
                  })
                  
                  items = this.sorter(items)
                  if (!items.length) {
                    return this.shown ? this.hide() : this
                  }
                  this.ajax.xhr = null;
                  
                  return this.render(items.slice(0, this.options.items), data).show()
                },
                ajaxToggleLoadClass: function (enable) {
                  if (!this.ajax.loadingClass) return;
                  this.$element.toggleClass(this.ajax.loadingClass, enable);
                },
                lookup: function (event) {

                  var that = this,
                    items
                    this.query = this.$element.val()
                    if (!this.query) {
                      return this.shown ? this.hide() : this
                    }
                  items = $.grep(this.source, function (item) {
                    return that.matcher(item)
                  })
                  items = this.sorter(items)
                  if (!items.length) {
                    return this.shown ? this.hide() : this
                  }
                  return this.render(items.slice(0, this.options.items)).show()
                },
                matcher: function (item) {
                  return ~item.toLowerCase().indexOf(this.query.toLowerCase())
                },
                sorter: function (items) {
                  var beginswith = [],
                    caseSensitive = [],
                    caseInsensitive = [],
                    item
                  while (item = items.shift()) {
                    if (this.ajax.displayField) {
                      item = item[this.ajax.displayField]
                    }
                    if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
                    else if (~item.indexOf(this.query)) caseSensitive.push(item)
                    else caseInsensitive.push(item)
                  }
                  return beginswith.concat(caseSensitive, caseInsensitive)
                },
                highlighter: function (item, data) {
                  var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
                  return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                    return '<strong>' + match + '</strong>'
                  })
                },
                render: function (items, data) {
                  var that = this
                  var i;
                  
                  items = $(items).map(function (index, item) {
                    i = $(that.options.item).attr('data-value', item)
                    i.find('a').css({
                      'z-index': '999',
                      'margin-left': 0
                    }).html(that.highlighter(item, data[index]))
                    return i[0]
                  })
                  items.first().addClass('active').css('background', '#EBF4F9')
                  
                  this.$menu.css('position', 'absolute').html(items)
                  return this
                },
                next: function (event) {
                  var active = this.$menu.find('.active').removeClass('active').css('background', '#FFFFFF'),
                    next = active.next()
                    if (!next.length) {
                      next = $(this.$menu.find('li')[0])
                    }
                  next.addClass('active').css('background', '#EBF4F9')
                },
                prev: function (event) {
                  var active = this.$menu.find('.active').removeClass('active').css('background', '#FFFFFF'),
                    prev = active.prev()
                    if (!prev.length) {
                      prev = this.$menu.find('li').last()
                    }
                  prev.addClass('active').css('background', '#EBF4F9')
                },
                listen: function () {
                  this.$element.on('blur', $.proxy(this.blur, this)).on('keypress', $.proxy(this.keypress, this)).on('keyup', $.proxy(this.keyup, this))
                  // Firefox needs this too
                  this.$element.on('keydown', $.proxy(this.keypress, this))
                  this.$menu.on('click', $.proxy(this.click, this)).on('mouseenter', 'li', $.proxy(this.mouseenter, this))
                },
                keyup: function (e) {
                  switch (e.keyCode) {
                  case 40:
                    // down arrow
                  case 38:
                    // up arrow
                    break
                  case 9:
                    // tab
                  case 13:
                    // enter
                    if (!this.shown) return
                    this.select()
                    break
                  case 27:
                    // escape
                    if (!this.shown) return
                    this.hide()
                    break
                  default:
                    if (this.ajax) this.ajaxLookup()
                    else this.lookup()
                  }
                  e.stopPropagation()
                  e.preventDefault()
                },
                keypress: function (e) {
                  if (!this.shown) return
                  switch (e.keyCode) {
                  case 9:
                    // tab
                  case 13:
                    // enter
                  case 27:
                    // escape
                    e.preventDefault()
                    break
                  case 38:
                    // up arrow
                    if (e.type != 'keydown') break
                    e.preventDefault()
                    this.prev()
                    break
                  case 40:
                    // down arrow
                    if (e.type != 'keydown') break
                    e.preventDefault()
                    this.next()
                    break
                  }
                  e.stopPropagation()
                },
                blur: function (e) {
                  var that = this
                  setTimeout(function () {
                    that.hide()
                  }, 150)
                },
                click: function (e) {
                  e.stopPropagation()
                  e.preventDefault()
                  this.select()
                },
                mouseenter: function (e) {
                  this.$menu.find('.active').removeClass('active').css('background', '#FFFFFF')
                  $(e.currentTarget).addClass('active').css('background', '#EBF4F9')
                }
              }
              /* TYPEAHEAD PLUGIN DEFINITION
               * =========================== */
              $.fn.typeahead = function (option) {
                return this.each(function () {
                  var $this = $(this),
                    data = $this.data('typeahead'),
                    options = typeof option == 'object' && option
                  if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
                  if (typeof option == 'string') data[option]()
                })
              }
              $.fn.typeahead.defaults = {
                source: [],
                items: 10,
                menu: '<ul class="typeahead abs bgfff layer shadow normal fchbrnone" style="border: solid 1px #eee; border-top: 0;"></ul>',
                item: '<li class="brtope8 rel" style="min-width: 120px;"><p class="c999 margin5_0"><a class="block lheight20 boxh pding3_10 fbold" style="text-align: left;"></a></p></li>'
              }
              $.fn.typeahead.Constructor = Typeahead
              /* TYPEAHEAD DATA-API
               * ================== */
              $(function () {
                $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
                  var $this = $(this)
                  if ($this.data('typeahead')) return
                  e.preventDefault()
                  $this.typeahead($this.data())
                })
              })
            }(window.jQuery);
            
	$(document).ready(function($) 
        {
           $(document).delegate('textarea.block, #add-comment-area', 'focus', function(e) 
           {
               $(this).typeahead({
                    ajax: {
                      url: 'http://a.wykop.pl/search/profiles/appkey,hSia7CmcI5',
                      timeout: 300,
                      displayField: "login",
                      triggerLength: 2,
                      method: "post",
                      loadingClass: "loading-circle",
                      preDispatch: function (query) {
                        return {
                          q : query
                        }
                      }
                    },
                    matcher: function (item) {
                      return item;
                    },
                    highlighter  :   function(item, data)
                    {

                         var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                         var image = '<p><img alt="" src="'+ data.avatar_lo +'" class="avatar vmiddle" style="margin-right: 5px; float: left;" width="20" title="" />';

                         return image + '<span style="text-align: left; font-weight: bold;" class="color-'+ data.author_group +'">' + item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                                return match 
                         }) + '</span></p>';
                    }
            });
           });
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)