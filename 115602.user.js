// ==UserScript==
// @name          AI-CLASS.COM VIDEO LENGTH CALCULATOR
// @author        Tristan Straub
// @namespace     http://tristanstraub.com/projects/aiclass/greasemonkey/
// @include       http://www.ai-class.com/course/*
// @include       http://www.ai-class.com/home/*
// @include       https://www.ai-class.com/home/*
// @include       https://www.ai-class.com/course/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

(function($) {
     $(function(){
           try {
               var quiz_triggers = []; // id,fn(quiz)

               var ipad2 = function(i)
               {
                   var s = i.toString();
                   if (s.length == 0) return '00';
                   if (s.length == 1) return '0' + s;
                   return s;
               };

               var seconds2text = function(seconds)
               {
                   return ipad2(Math.floor(seconds/60)) + ':' + ipad2(seconds%60);
               };

               var showVideoLength = function(el, id, add_to_total_duration, update_total) {
                   $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + id, { alt : 'json', v : 2 },
                             function(response)
                             {
                                 var seconds = response.entry['media$group']['media$content'][0].duration;
                                 add_to_total_duration(seconds);
                                 el.prev().text(seconds2text(seconds));
                                 update_total(seconds);
                             });
               };

               var sumVideoOfSection = function(section) {
                   $(section).find('a.videotrigger, a.quiztrigger').each(function() {
                                                                             $(this).before('<span style="position: absolute; left: -12ex; width:6ex; display: block;"></span>');
                                                                         });

                   var elTotal = $('<span style="position: absolute; left: -6ex; display:block; border-bottom: 2px solid black; width: 6ex;">' + seconds2text(0) + '</span>');
                   $(section).find('a.videotrigger, a.quiztrigger').first().closest('.ctree-content').prev('.ctree-header').before(elTotal);

                   var total_duration = 0;
                   var callbacks = {
                       add_to_total_duration : function(seconds)
                       {
                           total_duration += seconds;
                       },
                       update_total : function()
                       {
                           elTotal.text(seconds2text(total_duration));
                       }
                   };

                   $(section).find('a.videotrigger').each(function() {
                       var el = $(this);
                       var parts = el.attr('id').split('_');
                       var id = '';
                       if (parts.length == 3) {
                           id = parts[2];
                       } else {
                           id = parts[2] + '_' + parts[3];
                       }

                       showVideoLength(el, id, callbacks.add_to_total_duration, callbacks.update_total);
                   });

                   $(section).find('a.quiztrigger').each(function() {
                       var trigger = $(this);
                       var parts = trigger.attr('href').split('/');
                       
                       quiz_triggers.push({ id : parseInt(parts[parts.length-1]), fn : function(quiz) {
                           showVideoLength(trigger, quiz.fields.intro_video_clip.fields.youtube_id, callbacks.add_to_total_duration, callbacks.update_total);
                       }});
                   });
               };

               $('.ctree-content').each(function() { sumVideoOfSection($(this)); });

               var quizes = {};
               $.getJSON('/course/json/filter/QuizQuestion', function(response) {
                   $.each(response.data, function(i,quiz) {
                       quizes[quiz.pk] = quiz;
                   });
                   $.each(quiz_triggers, function(i, data) {
                       data.fn(quizes[data.id]);
                   });
               });
           }
           catch(e)
           {
               if (typeof console !== "undefined") {
                   console.log(e);
               }
           }
       });
 })(jQuery);
