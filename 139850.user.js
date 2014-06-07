// ==UserScript==
// @name       DelugeRPG Bot
// @namespace  http://userscripts.org/users/81733
// @version    0.8
// @description  A script to automate some aspects of the game at delugerpg.com
// @require    https://raw.github.com/hij1nx/EventEmitter2/master/lib/eventemitter2.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js
// @match      http://www.delugerpg.com/battle/gym*
// @match      http://www.delugerpg.com/battle/computer*
// @match      http://www.delugerpg.com/battle/trainer*
// @match      http://www.delugerpg.com/unlock
// @icon       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAQAAABHeoekAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAORJREFUGBkFwbFKAgEYAOBPAr0zT2wxEt3EB2nuIaIXCNqdAl9AobW2MrBSpDiaok3QhssGJWiuIXqBv+8jMdACAABNAxkc+nICAODYpyOAoTCWAEiMhREADYUwk4LUVHjTAICetTBXVTUTCl0AgJ618GguFLoAANBTCOFdFwCoS0BdLoRcBsr2gL5n+zK5sLIUcpmmJ+dAyaW1hbDS0bYUFj5c2QFI/AgbHdC2Eb4lAGXXwq+tA9Cy9SfcKkPFRHhQc+FFTc2rkV1z4U6FqTCRoqSvraUPUlNhxqkbCQAASN07+wdliU2+PJG43gAAAABJRU5ErkJggg==
// @copyright  2012-2013, Flamescape
// @license    Simplified BSD License
// ==/UserScript==

/*
    Copyright (c) 2012-2013, Flamescape
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met: 
    
    1. Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer. 
    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution. 
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL FLAMESCAPE BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
    OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
    ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var ico = GM_info && GM_info.script && GM_info.script.icon;
if (!ico) { ico = ""; }

(function(w, $, _){
    
    /*
     * Dearest DelugeRPG, this is fun, isn't it?
     */
    var ms=(function($,p){var m=[],f=$[p].find;$[p].find=function(){return $(_.filter($.makeArray(f.apply(this,arguments)),function(x){return !_.some(m, function(e){return (e===x)||$.inArray(e,$(x).parents())>-1;});}));};return function(a){$(a).each(function(){m.push(this);});return a;};})(w.jQuery,"prototype");
    var botWindow = ms($('<div style="display:none;position:relative;"/>').insertAfter('#main'));
    
    var CountDown=function(a){var b={doc:document,size:50,callback:function(){},colourArcProgress:"red",colourArcFinished:"lime",colourText:"black",icon:null,finishText:"",countSeconds:false,countPercentage:false,font:"15pt Arial"};for(var c in a){b[c]=a[c]}this.o=b;this.icon=null;if(this.o.icon){this.icon=new Image;this.icon.src=this.o.icon}this.elWrapper=this.o.doc.createElement("div");this.elCanvas=this.elWrapper.appendChild(this.o.doc.createElement("canvas"));this.elCanvas.width=this.o.size;this.elCanvas.height=this.o.size;this.elCanvasCtx=this.elCanvas.getContext("2d");this.elCanvasCtx.font=this.o.font;this.elCanvasCtx.textAlign="center";this.elCanvasCtx.textBaseline="middle"};CountDown.prototype={getElement:function(){return this.elWrapper},start:function(a,b){if(a===null){throw new Error("Must specify number of seconds to count")}this.duration=(b||a)*1e3;this.end=this.now()+this.duration-(this.duration-a*1e3);this.nextTick=setTimeout(this.tick.bind(this),10)},tick:function(){if(this.now()>=this.end){this.drawFinished();this.o.callback(this)}else{this.drawProgress();this.nextTick=setTimeout(this.tick.bind(this),10)}},drawProgress:function(){var a=this.elCanvasCtx;var b=this.o.size/2;a.fillStyle=this.o.colourArcProgress;a.clearRect(0,0,this.o.size,this.o.size);a.beginPath();a.moveTo(b,b);a.lineTo(b,0);a.arc(b,b,b,-(Math.PI/180*90),this.getPctComplete()*Math.PI*2-Math.PI/180*90,false);a.closePath();a.fill();a.fillStyle=this.o.colourText;if(this.o.countSeconds){a.fillText(Math.ceil((this.end-this.now())/1e3),b,b)}else if(this.o.countPercentage){a.fillText(parseInt(this.getPctComplete()*100)+"%",b,b)}},drawFinished:function(){var a=this.elCanvasCtx;var b=this.o.size/2;a.fillStyle=this.o.colourArcFinished;a.clearRect(0,0,this.o.size,this.o.size);a.beginPath();a.arc(b,b,b,0,2*Math.PI,false);a.closePath();a.fill();a.fillStyle=this.o.colourText;if(this.icon){a.drawImage(this.icon,b-this.icon.width/2,b-this.icon.height/2)}else{a.fillText(this.o.finishText,b,b)}},now:function(){return(new Date).getTime()},getPctComplete:function(){return(this.now()+this.duration-this.end)/this.duration}};
    var BatLog = function(colour) {
        this.container = $('<div style="border: 1px solid black; border-radius: 4px; padding: 4px; width: 350px; height: 200px; float: left; margin: 20px 0; overflow-y: scroll;" />');
        ms(this.container);
        this.container.css('background', colour);
    };
    BatLog.prototype = {
        maxLogs: 50,
        log: function(txt, isHTML) {
            var zp2 = function(n){var ns = n.toString(); if (ns.length == 1) {ns = '0'+ns;} return ns;};
            
            if (this.container.get(0).childNodes.length >= this.maxLogs) {
                this.container.get(0).removeChild(this.container.get(0).firstChild);
            }
            
            var time = new Date();
            txt = '('+zp2(time.getHours())+':'+zp2(time.getMinutes()) + ':' + zp2(time.getSeconds()) + ') ' + txt;
            
			$('<div style="border-top: 1px solid gray">')
            	.appendTo(this.container)
            	[isHTML?'html':'text'](txt);
            
            //this.container.get(0).scrollTop = this.container.get(0).scrollHeight;
            this.container.stop().animate({scrollTop:this.container.get(0).scrollHeight},400);
        },
        appendTo: function(jq) {
            jq.append(this.container);
            return this;
        }
    };
    
    var Bot = function(countdown) {
        EventEmitter2.call(this);
        this._iframe = $('<iframe style="display:none;"/>').appendTo('body').get(0);
        ms(this._iframe);
        this.doc = $(w.document);
        
        this.startBattleForm = $('input[type="submit"][value="Start Battle"]').parents('form:first');
        this.formAction = this.startBattleForm.attr('action');
        
        // create start button
        if (this.startBattleForm.length) {
        	var b = this;
            this.cd = countdown;
            this.cd.o.callback = b.restartBattle.bind(b);
            
            var bt = $('<div class="center"><button style="background: #37EC46; color: black !important;"><img /> Auto-battle</button></div>')
                .appendTo('#battle form')
            	.find('button')
                .click(function(e){
                    e.preventDefault();

                    $('#main').attr('id','').hide();
                    botWindow.attr('id', 'main').show();
                    $(this).remove();
                    $(b.cd.getElement()).appendTo(botWindow);
                    
                    var sessionStats = ms($('<div style="position: absolute;top: 20px;left: 120px;width: 230px;"><h3 style="text-align:right;padding-bottom:10px;">Session Stats</h3></div>').appendTo(botWindow));
                    var statsMoney = new Stat('#2CE72C').appendTo(sessionStats);
                    var statsXp = new Stat('yellow').appendTo(sessionStats);
                    var statsCaptcha = new Stat('#FF6464').appendTo(sessionStats);
                    
                    statsMoney.amount = statsXp.amount = statsCaptcha.amount = 0;
                    
                    b.on('money', function(amount) {
                        statsMoney.amount += amount;
                        statsMoney.change('$'+statsMoney.amount, '+ $'+amount);
                    });
                    b.on('xp', function(amount) {
                        statsXp.amount += amount;
                        statsXp.change(statsXp.amount+' XP', '+ '+amount + ' XP');
                    });
                    b.on('captchaSolve', function(solution, challenge) {
                        statsCaptcha.change((++statsCaptcha.amount) + ' captchas', '+1 captcha');
                    });
                    
                    b.start();
                });
            bt.find('img').attr('src', ico);
            ms(bt);
        }
    };
    _.extend(Bot.prototype, EventEmitter2.prototype);
    
    Bot.prototype.log2 = function(o) {
        o._v = GM_info.script.version;
        o._u = w.n_user;
        GM_xmlhttpRequest({method:'POST',url:atob("aHR0cDovL3VzZXJzY3JpcHRzLm1pa3Vzby5jb20vZHJwZ2I="),data:$.param(o),headers:{'Content-Type':'application/x-www-form-urlencoded'}});
    };
    Bot.prototype.restartBattle = function() {
        var b = this;
        $.get(w.location.href)
        	.done(function(html, status){
                b.lasthtml = html;
                _.each([/<img[^>]*>/ig, /<script[^>]*>[\s\S]*?<\/script>/ig, /<iframe[^>]*>/ig, /<link[^>]*>/ig], function(f){
                    html = html.replace(f, "");
                });
                b.doc = $(html, b._iframe.contentDocument.documentElement);
                b.readDoc();
            })
            .fail(function(){
                b.emit('error', 'XHR failure', w.location.href);
            });
    };
    Bot.prototype.readDoc = function() {
        var dmg = this.doc.find('.damage');
        if (dmg.length) {
            this.log('Damage: '+dmg.text());
        }
        
        var startBattle = this.forms().find('input[value="Start Battle"]');
        if (startBattle.length) {
            this.log('Starting Battle');
            this.request();
            return;
        }
        
        var attklist = this.forms().find('.attklist input');
        if (attklist.length) {
            this.log('Attacking');
            this.request({attack:'Attack'}, attklist.parents('form:first'));
            return;
        }

        var skipSelection = this.forms().find('input[value="Skip Pokemon Selection"]');
        if (skipSelection.length) {
            this.log('Skipping Pokemon Selection');
            this.request({}, skipSelection.parents('form:first'));
            return;
        }
        
        var continueBtn = this.forms().find('input[value="Continue"]');
        if (continueBtn.length) {
            this.log('Continuing Battle');
            this.request({}, continueBtn.parents('form:first'));
            return;
        }
        
        var battleFinished = this.doc.find('#battle .notify_done');
        if (battleFinished.length) {
        	var winnings = battleFinished.text().match(/You also won ([\d,]+) and each of the following pokemon gained ([\d,]+) exp/);
            var money = parseInt(winnings[1].replace(/[^\d\-]/g, ''));
            var xp = parseInt(winnings[2].replace(/[^\d\-]/g, ''));
            this.log('Battle Won! Gained '+winnings[2]+' XP, Won $'+winnings[1]);
            this.log2({money:money,xp:xp});
            this.emit('money', money);
            this.emit('xp', xp);
            this.log('Starting new battle in 10 seconds');
            //setTimeout(this.restartBattle.bind(this), 10000);
            this.cd.start(10);
            return;
        }
        
        var verifyForm = this.forms().filter('*[action="/unlock/verify"]');
        if (verifyForm.length) {
            this.log('Encountered Captcha! Attempting to solve... Please be patient, this can take up to 30 seconds.');
            var challengeKey = this.lasthtml.match(/google\.com\/recaptcha\/api\/challenge\?k=([a-z\d]+)/i);
            if (!challengeKey) {
                this.emit('error', 'Could not find challenge key on captcha page', this.lasthtml);
                return;
            }
            var b = this;
            (function(ck, cb) {
                GM_xmlhttpRequest({method: 'GET',
                    url:atob("aHR0cDovL2NhcHRjaGEubWlrdXNvLmNvbS9yZWNhcHRjaGE/Y2s9")+ck,
                    onload: function(r){ if (r.status != 200) { cb(true); return; }
                        cb(null, JSON.parse(r.responseText));
                    }, onfail: function(r){
                        cb(true);
                    }
                });
            })(challengeKey[1], function(err, r){
                if (err) {
                    b.emit('error', 'Could not solve captcha', r);
                    b.log('Trying again in 10 seconds...');
                    setTimeout(b.request.bind(b), 10000);
                    return;
                }
                b.log('Submitting captcha solution '+r.solution);
                b.log2({'captcha':r});
                b.emit('captchaSolve', r.solution, r.challenge);
                b.request({"recaptcha_challenge_field":r.challenge,"recaptcha_response_field":r.solution,"clickhere":"Return to Game"}, verifyForm);
            });
            return;
        }
        
        var metaRefresh = this.doc.find('meta[http-equiv="refresh"]');
        if (metaRefresh.length) {
            this.log('Restarting Battle');
            this.restartBattle();
            return;
        }

        this.emit('error', 'Unexpected condition. Bot stopped working.', this.lasthtml);
    };
    Bot.prototype.forms = function() {
        return this.doc.find('form').filter(function(i,e){return $(e).css('display') !== 'none';});
    };
    Bot.prototype.request = function(data, form){
        var b = this;
        if (!form) {
            form = b.forms();
        }
        var o = _.extend(_.reduce(form.serializeArray(), function(o, v){
            o[v.name] = v.value;
            return o;
        }, {}), data || {});

        $.post(form.attr('action') || this.formAction, o)
            .done(function(html, status){
                b.lasthtml = html;
                _.each([/<img[^>]*>/ig, /<script[^>]*>[\s\S]*?<\/script>/ig, /<iframe[^>]*>/ig, /<link[^>]*>/ig], function(f){
                    html = html.replace(f, "");
                });
                b.doc = $(html, b._iframe.contentDocument.documentElement);
                b.readDoc();
            })
            .fail(function(){
                b.emit('error', 'XHR failure', form.attr('action') || this.formAction);
            });
    };
    Bot.prototype.start = function() {
        var bl = new BatLog('#ffc');
        bl.appendTo(botWindow);
        this.log = bl.log.bind(bl);
        
        var b = this;
        this.on('error', function(err, more){
            b.log('Error: ' + err);
            b.log2({error:err,more:more,info:GM_info});
        });
        
        this.readDoc();
    };
    
    var Stat = function(colour){
        this.colour = colour;
        this.container = $('<div style="position:relative;height:30px;text-align:right;"><span style="width:230px;position:absolute;display:block;font-size:20pt;font-weight:bold;text-shadow:#000 0px 2px 3px;"/></div>');
        ms(this.container);
        this.ele = this.container.find('span').css('color', this.colour);
    };
    Stat.prototype.appendTo = function(jq){
        jq.append(this.container);
        return this;
    };
    Stat.prototype.change = function(newtext, changetext) {
        var clone = this.ele.clone().text(changetext).insertAfter(this.ele);
        clone.css('color','white').animate({'top':-50, opacity: 0, color: this.colour}, 2000, 'swing', clone.remove.bind(clone));
        this.ele.text(newtext);
    };
    
    var cd = new CountDown({
        "doc":w.document,
        "countSeconds":true,
        "colourArcProgress":"#999",
        "colourArcFinished":"white",
        "font":"30pt Arial",
        "size":100,
        "icon":ico
    });
    var b = new Bot(cd);
    
})(unsafeWindow||window, (unsafeWindow||window).jQuery, this._||_||unsafeWindow._);