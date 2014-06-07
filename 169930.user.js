// ==UserScript==
// @name        Neverwinter Gateway Professions
// @namespace   http://userscripts.org/users/386397
// @description Neverwinter Gateway Auto Professions Leveler
// @include     http://gateway.playneverwinter.com/#char(vortex@vrtxf)/professions*
// @grant       none
// @version     1
// ==/UserScript==

(function($){
    "use strict";

    var _private = {};
    var _public = {};

    _private.timers = {
        filler:null,
        status:null
    };

    _private.use_optional_assets = true;

    _private.locale = {
        _continue: 'Continue',
        start:'Start Task'
    };

    _private.professions = {
        to_do: ['mailsmithing', 'platesmithing'],
        tasks: {
            leadership: ['Feed the Needy', 'Protect Caravan', 'Explore Local Area', 'Compete in', 'Protect a Temple', 'Give Refugees a Home', 'Guard Duty'],
            leatherworking: ['Tough Leather Trading', 'Gather Tough Pelts', 'Tough Pelt Trading', 'Simple Leather Trading', 'Simple Pelt Trading', 'Gather Simple Pelts'],
            tailoring: ['Wool Cloth Trading', 'Cotton Scrap Trading', 'Gather Cotton Scraps', 'Wool Scraps Trading', 'Gather Wool Scraps'],
            mailsmithing: ['Steel Rings and Scales Trading', 'Gather High quality Iron Ore', 'High Quality Iron Ore Trading', 'Gather Iron Ore'],
            platesmithing: ['Steel Plate Trading', 'Gather High quality Iron Ore', 'High Quality Iron Ore Trading', 'Iron Plate Trading', 'Iron Ore Trading', 'Gather Iron Ore']
        }
    };

    _private.selectors = {
        overview: '.professions-overview:visible',
        leadership: '.professions-Leadership:visible',
        leatherworking: '.professions-Leatherworking:visible',
        tailoring: '.professions-Tailoring:visible',
        mailsmithing: '.professions-Armorsmithing_Med:visible',
        platesmithing: '.professions-Armorsmithing_Heavy:visible',
        doable_jobs: '.task-list-entry:not(.unmet):contains(' + _private.locale._continue + ')',
        job_title:'h4 span',
        reward_btn: '#modal .input-field button:visible'
    };

    _private.busy = false;

    _private.clear_timers = function() {
        clearTimeout(_private.timers.status);
        clearTimeout(_private.timers.filler);
    };

    _private.restart_timers = function() {
        if(_private.busy) {
            return;
        }

        _private.timers.status = setTimeout(_private.check_status, (75000 + (Math.random() * 75000)));
//        _private.timers.filler = setTimeout(_private.time_fillter, (20000 + (Math.random() * 5000)));
    };

    _private.check_status = function(waiting) {
        _private.clear_timers();

        if(_private.busy) return;

        if(!waiting) {
            $(_private.selectors.overview).trigger('click');
        }

        var slots = $('.task-slot-locked, .task-slot-progress, .task-slot-finished, .task-slot-open');
        if(!slots.length) {
            setTimeout(function(){
                _private.check_status(true);
            }, 3000);
            return;
        }
        slots.filter(':not(.task-slot-progress):not(.task-slot-locked)').each(function(idx, slot) {
            if(_private.busy) {
                //Stop looking at slots while we are busy DUH!!
                return;
            }
            slot = $(slot);
            var time_left = slot.find('.bar-text').text();
            var button_msg = slot.find('.input-field button').text();

            //Collection logic
            if(slot.hasClass('task-slot-finished')) {
                _private.reward.start_collection(slot);
                return;
            }
            if(slot.hasClass('task-slot-open')) {
                _private.jobs.new_job(0);
                return;
            }
        });

        _private.restart_timers();
    };

    _private.reward = {
        start_collection: function(slot) {
            _private.clear_timers();

            if(_private.busy && _private.busy !== 'reward') {
                return;
            }

            _private.busy = 'reward';
            var button = slot.find('.input-field button');
            button.trigger('click');
            setTimeout(function(){
                _private.reward.collect();
            }, (1000 + (Math.random() * 1500)));
        },
        collect: function() {
            $(_private.selectors.reward_btn).trigger('click');
            _private.busy = false;

           setTimeout(function(){_private.check_status();}, (2000 + (Math.random() * 1000)));
        }
    };

    _private.jobs = {
        new_job: function() {
            _private.clear_timers();

            if(_private.busy && _private.busy !== 'job') {
                return;
            }

            _private.busy = 'job';

            var to_do = _private.professions.to_do[((Math.random() * 10000)|0) % _private.professions.to_do.length];
            
            $(_private.selectors[to_do]).trigger('click');
            setTimeout(function() {
                _private.jobs.find_doable_job(to_do);
            }, (15000 + (Math.random() * 7000)));
        },
        find_doable_job: function(to_do) {
            var jobs = $(_private.selectors.doable_jobs);
            var next_page = $('#tasklist_next:not(.paginate_disabled_next)');
            var job_list = _private.professions.tasks[to_do];

            if(!to_do || !(job_list && job_list.length)) {
                console.error('ERROR: ', _private.professions.tasks);
                console.error('Please report this error as something is broken for you');
                return;
            }
            if(!jobs.length && next_page.length) {
                next_page.trigger('click');
                jobs = $(_private.selectors.doable_jobs);
            } else if(!jobs.length && !next_page.length) {
                _private.busy = false;
                setTimeout(function(){_private.check_status();}, (2000 + (Math.random() * 1000)));
                return;
            }

            jobs = jobs.filter(function(idx){
                var job = $(this);
                if(job.find('.task-requirements .red').length) {
                    return false;
                }
                for(var i=0; i<job_list.length; i++) {
                    var title = job_list[i];
                    if(job.find(':contains(' + title + ')').length) {
                        return true;
                    }
                }
                return false;
            });
            if(!jobs.length && !next_page.length) {
                _private.busy = false;
                setTimeout(function(){_private.check_status();}, (2000 + (Math.random() * 1000)));
                return;
            }
            if(!jobs.length) {
                next_page.trigger('click');
                setTimeout(function() {
                    _private.jobs.find_doable_job(to_do);
                }, (500 + (Math.random() * 500)));
                return;
            }

            jobs.eq(((Math.random() * 10000)|0) % jobs.length).find('.input-field button').trigger('click');
            setTimeout(function() {
                _private.jobs.assign_person();
            }, (2000 + (Math.random() * 1000)));
        },
        assign_person: function(num) {
            if(!num) num = 0;

            var assets = $('.taskdetails-assets .input-field button');
            var followup = _private.jobs.start;
            if(_private.use_optional_assets && num != (assets.length-1)) {
                followup = _private.jobs.assign_person;
            }

            assets.eq(num).trigger('click');
            _private.jobs.assign_asset(followup, num);
        },
        assign_asset: function(followup, num) {
            setTimeout(function(){
                $('.modal-item-list .icon-block').eq(0).trigger('click');

                setTimeout(function() {
                    followup(num+1);
                }, (1000 + (Math.random() * 1000)));
            },  (1500 + (Math.random() * 1000)));
        },
        start: function() {
            $('.footer-body.with-sidebar .input-field button:contains(' + _private.locale.start + ')').trigger('click');
            _private.busy = false;

           setTimeout(function(){_private.check_status();}, (2000 + (Math.random() * 1000)));
        }
    };

    _private.time_fillter = function() {
        if(_private.busy) return;

        var random_profession = _private.professions.to_do[((Math.random() * 10000)|0) % _private.professions.to_do.length]
        $(_private.selectors[random_profession]).trigger('click');

        _private.timers.filler = setTimeout(function(){
            _private.time_fillter();
        }, (20000 + (Math.random() * 5000)));
    };


    $(function(){_private.check_status();});

    _public.stop = function() {
        _private.clear_timers();
    };

    _public.start = function() {
        _private.check_status();
    }

    $.nwo = $.nwo || {}
    $.extend(true, $.nwo, {professions:_public});
}(jQuery));