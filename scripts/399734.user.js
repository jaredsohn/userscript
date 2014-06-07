// ==UserScript==
// @name       LingoBingTTS
// @namespace  http://xydrolase.me
// @version    0.1
// @description  Technical demo
// @match      https://www.duolingo.com/*
// ==/UserScript==
//

var bingAPI = "https://api.microsofttranslator.com/v2/http.svc/Speak?";

(function($) {
    if (typeof duo != 'undefined' && typeof $.tts_super == 'undefined') {
        $.fn.tts_super = $.fn.tts;
        $.fn.tts = function(d) {
            console.log(d.absoluteURL);
            if (typeof d.absoluteURL != 'undefined') {
                var aurl = d.absoluteURL;
                var regex_sen = /tts\/\w+\/sentence\/(\w+)$/;
                var _this = this;
                if (regex_sen.test(aurl)) {
                	var sen_id = regex_sen.exec(aurl)[1];
                    var sentence = new duo.Sentence({id: sen_id});
                    sentence.fetch({
                        data: {},
                        success: function(f) {
                            var s = f.toJSON();
                            var quoted_text = encodeURIComponent(s.text.replace("/", " "));
                            d.absoluteURL = bingAPI + "language=" + s.language + "&format=audio/mp3" + 
                                "&options=MaxQuality&appid=" + encodeURIComponent("Tyq2I4r-cvzb0NZomUV2vFX1iVX3oRRhJsMDqU5dcrYg*") +
                                "&text=" + quoted_text;
                            _this.each(function() {
                				$(this).tts_super(d);
            				});	
                        }
                    });
                }
                else {
                    this.each(function() {
                		$(this).tts_super(d);
            		});
                }
            }
            else {
                this.each(function() {
                	$(this).tts_super(d);
            	});
            }
                 
            return this;
        }
    }
}(jQuery));
