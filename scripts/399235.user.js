// ==UserScript==
// @name        LingoVocab
// @namespace   http://xydrolase.me
// @include     https://www.duolingo.com/*
// @version     3.2
// @grant       none
// ==/UserScript==
//

(function ($) {
    /**
    * @function
    * @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
    * @param {function} handler A function to execute at the time when the element is inserted
    * @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
    * @example $(selector).waitUntilExists(function);
    */

    $.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
        var found       = 'found';
        var $this       = $(this.selector);
        var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

        if (!isChild)
        {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
            ;
        }
        else if (shouldRunHandlerOnce && $elements.length)
        {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }

        return $this;
    }
}(jQuery));

(function($) {
	duo.WordsPracticeSession.prototype.parse = function(a) {
        if (typeof this.selems == 'undefined') {
            this.selems = a.session_elements;
        	this.target_lexs = a.target_lexeme_ids;
        }
        else {
            $.merge(this.selems, a.session_elements);
            $.merge(this.target_lexs, a.target_lexeme_ids);
        }
        
        a.session_elements = this.selems;
        a.target_lexeme_ids = this.target_lexs;
		a.session_elements = new duo.SessionElementList(a.session_elements);
        
		return a;
    }
    
    duo.WordsPracticeSession.prototype.fetch_super = duo.WordsPracticeSession.prototype.fetch;
    duo.WordsPracticeSession.prototype.fetch = function(a) {
        if (a.data.lemma.indexOf(',') != -1) {
            /* mimic a skill practice */
            var sep = a.data.lemma.indexOf('+');
            this.name = a.data.lemma.substr(sep+1);
            var _lemma = a.data.lemma.substr(0, sep).split(',');
            var _pos = a.data.pos_string.split(',');
            var _callback = a.success;
            for (var i = 0; i < _lemma.length; i++) {
            	a.data.lemma = _lemma[i];
                a.data.pos_string = _pos[i];
                console.log(a.data.lemma);
                /* don't call callback for now */
                if (i < _lemma.length - 1) a.success = function() {};
                else a.success = _callback;
                this.fetch_super(a);
            }
            
            this.from_word = undefined;
            this.type = 'skill_practice';
        }
        else {
            this.fetch_super(a);
        }
    }

    if (typeof duo != 'undefined' && 
            typeof duo.SkillView != 'undefined' &&
            typeof duo.SkillView.prototype.render_super == 'undefined') {
        duo.SkillView.prototype.render_super = duo.SkillView.prototype.render;
        duo.SkillView.prototype.render = function() {
            this.render_super();

            if (!(/skill\/\w+\/[^\/]+$/.test(window.location.href))) return;
            window.skill_model = this.model;
            var mjson = this.model.toJSON();

            /* load vocabularies */
            var vocab_loader = (function(_model) {
                return function() {
                    var title = $("section.page-main h1");
                    title.html(title.text() +
                        ' &middot;&middot; <a class="btn btn-green" href="javascript:;" onclick="skill_vocab_loader();">' +
                        'Vocabulary</a> / ' + 
                        '<a class="btn btn-standard btn-outline" href="javascript:;" onclick="lesson_vocab_loader();">' +
                        '<span class="icon icon-green-check-small"></a>');

                };
            }(mjson));

            window.skill_vocab_loader = (function(_model) { 
                return function() {
                    if ($("#vocab_full").size()) {
                        $("#vocab_full").fadeToggle();
                        $("#vf_line").fadeToggle();
                        return;
                    }

                    var skill_id = _model.id;
                    var word_count = 0;

                    for (var index = 0; index < _model.num_lessons; index++) {
                        word_count += _model.path[index].words.length;
                    }

                    var _vocab = new duo.Vocab;
                    _vocab.fetch({
                        data: {
                            skill_id: skill_id,
                            per_page: word_count,
                            sort_by: 'strength'
                        },
                        success: function(m, g) {
                            var prac_group = {lexeme: [], pos: []};
                            var trs = $.map(m.toJSON().vocab, function(lex, lid) {
                                var url = "/word/" + lex.language + "/" + 
                                            lex.surface_form + "/" + lex.pos;
                                
                                if (prac_group.lexeme.length < 5) {
                                    prac_group.lexeme.push(lex.surface_form)
                                    prac_group.pos.push(lex.pos)
                                }
                                
                                var lex_trs = $.map(lex.forms_data, function(w, widx) {
                                    var str = Math.round(w.strength * 100);

                                    return '<tr style="vertical-align:top;">' + 
                                        '<td>' + 
                                        '<a href="javascript:;" onclick="window.open(\'' + 
                                        url + '\');" ' +
                                        'style="color: rgb(32, 166, 231);">' + 
                                        w.surface_form + '</a></td><td>' +
                                        w.last_practiced.replace(/\n/g, '') +
                                        '</td><td style="padding-right: 10px;">' + 
                                        '<div class="sidebar-progress-main">' +
                                        '<div class="language-progress-bar-small">' +
                                        '<div class="padder"><div class="bar" style="width: ' + str +
                                        '%; max-width: 100%;"></div></div>' +
                                        '<span class="level level-current">E</span>' +
                                        '<span class="level level-next">F</span>' +
                                        '</div></div></td></tr>';
                                });
                                return lex_trs.join("");
                            });

                            var prac_url = "/word_practice/" + m.get("language") + "/" + 
                                encodeURIComponent(prac_group.lexeme.join(',') + '+' + _model.url_title) + "/" +
                                prac_group.pos.join(',');
                            $("section.page-main div.list-lessons").before(
                                '<div id="vocab_full" class="tips-notes-panel" ' + 
                                'style="margin-top:-20px; max-height:300px; overflow-y: auto;">' +
                                '<h2>Vocabulary List &middot;&middot; <a href="' + prac_url + '" class="btn btn-primary" title="Practice the 5 weakest word">' + 
                                '<span class="strength"><span class="icon icon-practice-small-white"></span></a></h2>' +
                                '<table border="0" cellspacing="0" cellpadding="0" class="table table-bordered green-head table-striped" style="width:98%;">' +
                                '<thead align="left"><tr><th width="35%">Syllable</th>' + 
                                '<th width="30%">Last practiced</th>' + 
                                '<th width="35%">Strength</th></tr></thead><tbody>' + trs.join("") +
                                '</tbody></table></div>' + 
                                '<hr style="margin-top:40px;" id="vf_line" />'
                                );
                        }
                    });
                };
            }(mjson));

            window.lesson_vocab_loader = (function(_model) {
                return function() {
                    var skill_id = _model.id;
                    var _vocab = new duo.Vocab;
                    $.each($("div.inner p"),
                        function(index, value) {
                            var lesson = index + 1;
                            var pdom = $(this);
                            pdom.css("overflow-y", "auto");

                            if (_model.path[index].strength == 0) return;
                            _vocab.fetch({
                                data: {
                                    skill_id: skill_id,
                                    lesson: lesson
                                },
                                success: function(m, g) {
                                    pdom.empty();
                                    var spans = $.map(m.toJSON().vocab, function(lex, lid) {
                                        var url = "/word/" + lex.language + "/" + 
                                            lex.surface_form + "/" + lex.pos;
                                        var lex_trs = $.map(lex.forms_data, function(w, widx) {
                                            var last_seen = w.last_practiced.replace(
                                                /\n/g, '');
                                            return '<span title="' + last_seen + '">' +
                                                '<a href="javascript:;" onclick="window.open(\'' + url + '\');" ' +
                                                'style="color: rgb(32, 166, 231);">' + w.surface_form + '</a></span>';
                                        });
                                        return lex_trs.join(', ');
                                    });
                                    pdom.append(spans.join(', '));
                                }
                            });
                    });
                };
            }(mjson));

            $("div.list-lessons").waitUntilExists(vocab_loader, true);

            return this;
        };
        console.log("LingoVocab injected.");
    }

    var vocab_page_style = 'div.vocabulary-main {background: rgba(255, 255, 255, 0.8); padding: 40px;}';
    vocab_page_style += 'div.vocab-page { padding:0; margin:0; }' +
    	' .word-info li {float: left; margin-right: 40px;}' +
        '.word-info .word-strength li:last-child {border-right: none;}' +
    	'.translations.table tbody tr td {padding: 15px;}' +
    	'.word-info .word-strength {width: 160px; background: rgba(0, 0, 0, 0.1); height: 20px; border-radius: 10px; overflow: hidden;}' +
    	'.word-info .word-strength li {margin: 0; border-right: 2px solid white; width: 25%; height: 20px;}' +
    	'.word-info .word-strength li.filled {background: #ffc10d;}' +
        '.sidebar-left .box-practice .primary {background: #1caff6; color: #fff; border-color: #1caff6;} ' +
		'.sidebar-left .box-practice .remove {margin-top: 20px} ' +
        '.sidebar-left .image {margin: 20px 0;} .sidebar-left .image img { width: 100%;} ' +
        '.sidebar-left .image .caption { display: block; text-transform: capitalize;} ';
		'.sidebar-left .box-practice .remove .btn {background: rgba(0, 0, 0, 0.2); color: white;}';

	$('<style type="text/css">' + vocab_page_style + '</style>').appendTo("head"); 
    
    /* fix the _ttsURL issue */
    if (RegExp(window.location.hostname.replace('.', '\\.') + '/word').test(window.location.href)) {
        var _js = duo.js_version.split('-')[0];
        var cf_domain = window.location.protocol + _js.substr(0, _js.substr(2).indexOf('/')+2);
        _ttsURL = cf_domain + "/tts/";

        $.fn.tts_vis = $.fn.tts;
        $.fn.tts = function(d) {
            if (typeof d.visible != 'undefined' && !d.visible) {
                d.visible = 1;
            }
            this.each(function() {
                $(this).tts_vis(d);
            });

            return this;
        }

        if (duo && duo.WordView &&
                typeof duo.WordView.prototype.render_super == 'undefined') {
            duo.WordView.prototype.render_super = duo.WordView.prototype.render;
            duo.WordView.prototype.render = (function() {
                return function() {
                    var examples = [];
                    var lang = this.model.get('language');
                    $.each(this.model.get("lexemes_data"), function(index, lexem) {
                        if (lexem.seen && 
                                lexem.example_data !== null && 
                                lexem.example_data.has_examples) {
                            $.each(lexem.example_data.examples, function(j, ex) {
                                examples.push(ex.example);
                                if ($.isArray(ex.sentences)) {
                                    $.merge(examples, ex.sentences);
                                }
                            });
                        }
                    });

                    _.defer(function() {
                        var exid = 0;
                        $.each($("table.translations tr td:nth-child(2)"), function(index, td) {
                            var ex = examples[exid];
                            if (!$(this).text() || typeof ex.id == 'undefined') return;
                            $.when($(this).prepend('<span id="ex-' + exid + '"></span>')).then(
                                $('#ex-' + exid, this).tts({
                                    absoluteURL: _ttsURL + lang + '/sentence/' + ex.id,
                                    template: duo.templates.speaker,
                                    visible: 1,
                                    autoplay: 0,
                                    click: 1
                                })
                            );
                            ++exid;
                        });
                        
                        $("div.vocabulary-main").removeClass("vocabulary-main")
                            .addClass("page-main main-right");
                        $("div.vocabulary-sidebar").removeClass("vocabulary-sidebar")
                            .addClass("page-sidebar sidebar-left box-colored white");
                        var _children = $("#app").children();
                        $("#app").removeClass("vocab-page").append('<main class="main-right"></main>');
                        _children.detach().appendTo("main.main-right");

                    });

                    this.render_super();
                    return this;
                };
            }());
        }
    }
})(jQuery);