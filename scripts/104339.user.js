// ==UserScript==
// @name           Web3 Thai CA Monster Info
// @namespace      InfoExtrator
// @resource       jQuery        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @resource       jQueryUI      http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.min.js
// @include        http://web3.castleagegame.com/castle_ws/*
// @include        http://apps.facebook.com/castle_age/*
// @include        http://75.126.76.147/castle/*
// @include        http://web.castleagegame.com/castle/*
// @include        https://www.facebook.com/dialog/apprequests*
// @include        https://web3.castleagegame.com/castle_ws/*
// @include        https://apps.facebook.com/castle_age/*
// @version        1.1
// ==/UserScript==

/**
 *  Script related settings
 */
var Script = {
    num          : 104339,
    version      : '1.1',
    need_update  : false,
    updated      : false,
	
    check_update : function(callback) {
        var now = new Date();

        if((+GM_getValue("LAST_UPDATE", 0) + 3600000) < now.getTime()) {
            GM_xmlhttpRequest({
                method : 'GET',
                url    : 'http://userscripts.org/scripts/source/' + Script.num + '.meta.js',
                onload : function(response) {
                    if(/^\/\/\s+@version\s+(.*)$/m.test(response.responseText)) {
                        Script.need_update = Script.version < RegExp.$1;
                    }
                    callback();
                },
                onerror : function() {
                    callback();
                }
            });
            GM_setValue("LAST_UPDATE", now.getTime()+'');
        } else
            callback();

    },
    init : function() {
        var globalContainer = document.querySelector('#globalContainer');

        globalContainer.addEventListener('click', function(event) {
            if(Script.updated)
                window.location.href = Parser.clickUrl;

            var obj = event.target;

            while(obj && !obj.href)
                obj = obj.parentNode;

            if(obj && obj.href)
                Parser.clickUrl = obj.href;
        }, true);

        globalContainer.addEventListener('DOMNodeInserted', function(event) {
            if(event.target.id == 'main_bn' || event.target.querySelector("#main_bn")) {
                setTimeout(function() {Parser.start();}, 0);
            }

        }, true);

        GM_registerMenuCommand("Hydra Info Setting", function() {Setting.init();});
        Setting._read();

        Script.check_update(function() {
            if(!document.getElementById('jQuery-1.4.2')) {
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script'), css = document.createElement('link');
                script.type = 'text/javascript';
                script.id = 'jQuery-1.4.2';
                script.innerHTML = GM_getResourceText('jQuery') + GM_getResourceText('jQueryUI');
                head.appendChild(script);
            }

            (function GM_wait() {
                if(typeof unsafeWindow.jQuery == 'undefined')
                    unsafeWindow.setTimeout(GM_wait, 100);
                else {
                    if(typeof $j == 'undefined') {
                        $j = unsafeWindow.jQuery.noConflict();
                    }
                    $j(function() {
                            Setting.pos = $j("#globalContainer").offset();

                            if(document.querySelector("#main_bn")) {
                                Parser.start();

                            }

                    });
                }
            })();
        });
    }
},

/**
 *  UI Helper Functions
 */

UI = {
    ca_stats_panel : function() {
        var ca_stats_panel = $j("#ca_stats_panel");
        if(!ca_stats_panel.size()) {
            var pos = Setting.stats_pos().split(',');
            ca_stats_panel = $j("<div></div>").attr({id:'ca_stats_panel'}).css({
                position:"absolute", top:pos[1]+"px", left:pos[0]+"px", float:'left', width:"200px",'font-size':'12px',
                margin:"0 auto", border:"solid 1px black", background:"white","text-align":"left",
                padding:"5px",'-moz-box-shadow':'0 0 10px #000000'}).appendTo("#globalContainer");
            ca_stats_panel.draggable({ handle: '.handler'  , stop: function(event, ui) {
                    Setting.stats_pos(ui.offset.left+','+ui.offset.top);
                }});
                ca_stats_panel.resizable();
        }
        return ca_stats_panel;
    }, ca_status : function() {
        var ca_status = $j("#ca_status");
        if(!ca_status.size()) {
            ca_status = $j("<div></div>").attr({ id:'ca_status'}).css({color:'black', height:'120px', border:'solid 1px black', padding:'5px'});
            this.ca_stats_panel().empty()
                .append($j("<div class='handler'>Castle Age Stats</div>").css({cursor:'move',border:'solid 1px black', 'border-bottom': 'none', padding:'5px', 'font-weight':'bold'}))
                .append(ca_status)
                ;

        }
        return ca_status;
    }, ca_info_panel : function () {
        var ca_info_panel = $j("#ca_info_panel");
        if(!ca_info_panel.size()) {
            var pos = Setting.info_pos().split(',');
            ca_info_panel = $j("<div></div>").attr({id:'ca_info_panel'}).css({
                position:"absolute", top:pos[1]+"px", left:pos[0]+"px",float:'left', width:"200px",'font-size':'12px',
                margin:"0 auto", border:"solid 1px black", background:"white","text-align":"left",
                padding:"5px",'-moz-box-shadow':'0 0 10px #000000'}).appendTo("#globalContainer");
            ca_info_panel.draggable({ handle: '.handler'  , stop: function(event, ui) {
                    Setting.info_pos(ui.offset.left+','+ui.offset.top);
                } } );
        }
        return ca_info_panel;
    }, ca_info : function() {
        var ca_info = $j("#ca_info");
        if(!ca_info.size()) {
            ca_info = $j("<textarea></textarea>").attr({ id:'ca_info', wrap:'off', rows : 10}).css({margin:0, padding:'5px',border:"solid 1px black", width:'188px'});
            this.ca_info_panel().empty()
                .append($j("<div class='handler'>Thai CA Monster Info "+Script.version+"</div>").css({cursor:'move',border:'solid 1px black', 'border-bottom': 'none', padding:'5px', 'font-weight':'bold'}))
                .append(ca_info);
        }
        return ca_info;
    }, ca_setting : function () {
        var ca_setting = $j("#ca_setting");
        if(!ca_setting.size()) {
            ca_setting = $j("<div></div>").attr({ id:'ca_setting'}).css({color:'black', border:'solid 1px black', padding:'5px'});
            this.ca_info_panel().empty()
                .append($j("<div class='handler'>Thai CA Monster Info "+Script.version+"</div>").css({cursor:'move',border:'solid 1px black', 'border-bottom': 'none', padding:'5px', 'font-weight':'bold'}))
                .append(ca_setting);
        }
        return ca_setting;
    }
},
Util = {
    parseQuery : function (query) {
        var arr = query.split("&"), obj = {};
        for(var i=0 ; i < arr.length ; i++) {
            var kv = arr[i].split('=');
            if(kv.length == 2)
                obj[kv[0]] = kv[1];
        }
        return obj;
    },
    group : function group(label, max) {
        return {
            'label'   : label,
            'max'     : max,
            'count'   : 0
        };
    }
},

/**
 * Info Parser for different type of battle (Monster & Raid)
 */
Parser = {
    clickUrl : window.location.href,

    start : function() {
        if(Script.need_update) {
            var ok = $j("<button>OK</button>").css({width : '80px'});
            ca_info = UI.ca_setting();

            ok.click(function() {
                setTimeout(function() {window.location.href = "http://userscripts.org/scripts/source/"+Script.num+".user.js";}, 0);
                Script.updated = true;
                UI.ca_info_panel().remove();
            });
            ca_info.empty().append(Gettext[Setting.locale()].UPDATE, ok);
            return ;
        }

        this.stats();
    },
    toDateString : function(m) {
        var day = Math.floor(m / 1440),
            hour = Math.floor((m % 1440) / 60),
            minutes = Math.floor(m % 60);

        return (day > 0 ? day + ' day ' : '') + (hour > 0 ? hour + ' hr ' : '') + (minutes > 0 ? minutes : '0') + ' min';
    },
    stats : function() {

        var s = '', ca_status = UI.ca_status() ;

        if(/You need (\d+) more experience points to get to the next level/.test($j("#st_5").attr("title"))) {
            var texp    = RegExp.$1,
                e      = +($j("energy_current_value").text()),
                energy = e,
                st      = +$j("stamina_current_value").text(),
                sta    = st,
                exp_now  = energy / 6 * 8 + sta / 5 * 12,
                exp_need = texp - exp_now,
                exp_var  = energy * 1.667,
                variable = texp - exp_var - sta / 5 * 12,
                shortest = variable / 3.733 * 5,
                longest  = exp_need / 3.733 * 5,
                gettext  = Gettext[Setting.locale()]
            ;

            s += gettext.EXP_LEVEL + ': <span style="color:red">' + texp + '</span><br/>';
            s += gettext.TIME_LEVEL_S + ': ' + this.toDateString(shortest) + "<br/>";
            s += gettext.TIME_LEVEL_L + ': ' + this.toDateString(longest) + "<br/>";


            if(this.battle_monster()) {
                var user = document.querySelector("img[width='15']");
				user = user.src.replace("https://graph.facebook.com/","").replace("/picture?type=square","")
                if(user.length) {
                    dmg = $j.trim($j("div.statsT2 table table table tr td:has(a[href=keep.php?casuser="+user+"]) + td").text());
                }
            }
        }

        ca_status.empty().append(s);
    },
    get_name : function(uid) {
        return $j("img[uid="+uid+"]").attr("title");
    },

    get_boss_img : function() {
        for(var img in this.bosses) {
        
            if($j("img[src*="+img+"]").size())
                return img;
        }
        return null;
    },

    get_attackers : function(boss) {
        var group_name = '';

        $j("div.statsT2 table table table tr").each(function(idx) {
            var td = $j(this).children().eq(0);
            if(td.attr("colspan") == '2') {
                group_name = $j("b", td).text();
            } else if(!$j("br",td).size()) {
                boss.levels[group_name].count ++;
            }
        });
    },

    battle_monster : function() {

	if (/player_monster_list.php/.test(this.clickUrl)){
		clickUrl = $j("#current_pg_url").val();
	       var arrUrl = clickUrl.split('?',2), query, summoner, mpool, time, ca_info, user_locale, gettext;
	       if(!(/battle_monster.php$/.test(arrUrl[0]) && arrUrl.length == 2)){
	            UI.ca_info_panel().remove();
	            return false;
	       }
	       query = Util.parseQuery(arrUrl[1]); summoner = query.casuser;	mpool = query.mpool;
	}else{
        var arrUrl = this.clickUrl.split('?',2), query, summoner, mpool, time, ca_info, user_locale, gettext;
        if(!(/battle_monster.php$/.test(arrUrl[0]) && arrUrl.length == 2 && (query = Util.parseQuery(arrUrl[1])) && (summoner = (query.casuser || query.user)) && (mpool = query.mpool))) {
            UI.ca_info_panel().remove();
            return false;
        }
        }

        ca_info = UI.ca_info();
        time    = $j("#monsterTicker").text().split(":");
        user_locale = Setting.locale();
        gettext = Gettext[user_locale];


        if(time.length == 3) {
            var boss_img = this.get_boss_img(), boss = this.bosses[boss_img], summoner = query.casuser, name = this.get_name[summoner], attacker = '', phase;            
            if(!boss) {
                ca_info.text(gettext.NOT_SUPPORTTED);
                return ;
            }

            phase = boss.siege ? $j("div:has(img[src*="+boss_img+"]):last + div > div").size() : 0;
            this.get_attackers(boss);

            for(var p in boss.levels) {
                attacker += boss.levels[p].label + boss.levels[p].count + " / " + boss.levels[p].max + "\n";
                boss.levels[p].count = 0;
            }

	     var monster_id2 = $j("input[name=mid]"), tower = $j("input[name=tower]");
	      if (monster_id2.size()){
			var monster_ext = gettext.FESTIVAL + tower.val() + ",";
		}else{
			var monster_ext = "";
		}
		if ($j("img[src*="+boss.def_img+"]").size()){
			def_width = Math.floor($j("img[src*="+boss.def_img+"]").parent().css("width").replace(/%/,'') * (/(.*)%$/.test($j("img[src*="+boss.def_img+"]").parent().parent().css("width")) ? (outer = +(RegExp.$1)) / 100 : 1)) + '%'
		}else{
			def_width = "0%";
		}
            var hp   = Math.ceil($j("img[src*="+boss.hp_img+"]").parent().css("width").replace(/%/,''))
              , miss = /Need (\d+) more answered calls to launch/.test($j("div:contains('more answered calls to launch'):last").text()) ? RegExp.$1 : 0
              , outer = false
              , info = monster_ext + boss[user_locale] + "\n[links]\n" +
                gettext.TIME_LEFT + ": " + time[0] + " "+gettext.HOUR+" " + time[1] + " "+gettext.MINUTE+"\n" +
                gettext.HP_LEFT+": " + hp + "%" + (boss.def ? ", "+gettext.DEFENSE+": " + def_width  : '') + "\n" +
                (boss.siege ? gettext.WEAPON+": " + Math.min(phase+1, boss.siege) + " / " + boss.siege + ", " + gettext.NEED_MORE.replace("%d", miss) + "\n" : "") +
                (boss.levels[''] ? gettext.ATTACKER+": " : "") + attacker
              , short_url = URL[Setting.compress()]
            ;

            if(typeof short_url != 'function') {
                short_url = URL.tinyurl;
                Setting.compress('tinyurl');
            }
	     var monster_id = $j("input[name=mid]"), tower_id = $j("input[name=tower]");
	      if (monster_id.size()){
			monster_url = "http://apps.facebook.com/castle_age/festival_battle_monster.php?casuser=" + summoner + "&action=doObjective&mpool=" + mpool + "&mid=" + monster_id.val() + (boss.siege ? "&tower=" + tower_id.val() + "&ref=nf" : "");
                }else{
                        monster_url = "http://apps.facebook.com/castle_age/battle_monster.php?casuser=" + summoner + "&mpool=" + mpool + (boss.siege ? "&action=doObjective" : "");
		}

            short_url(monster_url, function(assist_url) {

                if(boss.army) {
                    short_url("http://www.facebook.com/profile.php?id=" + summoner, function(friend_url) {
                        short_url("http://apps.facebook.com/castle_age//index.php?tp=cht&lka=" + summoner + "&buf=1", function(army_url) {
                            ca_info.text(info.replace('[links]',
                                gettext.FACEBOOK_LINK+": " + friend_url + "\n" +
                                gettext.ARMY_LINK    +": " + army_url   + "\n" +
                                gettext.ASSIST_LINK  +": " + assist_url + "\n" ));
                        });
                    });
                } else {
                    ca_info.text(info.replace('[links]', assist_url + "\n" ));

                }
            });
        } else {
            ca_info.text(
                gettext.TIME_LEFT + ": "+gettext.ENDED+"\n"
            );
        }
        return true;
    },
    raid : function() {
    },

    bosses          : {
        '/graphics/orc_boss_large.jpg' : {
            mpool : 1, army : true , siege : 0, levels : {'' : Util.group('',10)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'อ็อคคิง', en_us : 'The Orc King'
        }, '/graphics/stone_giant_large.jpg' : {
            mpool : 1, army : true , siege : 0, levels : {'' : Util.group('',15)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'ยักษ์หิน', en_us : 'The Colossus of Terra'
        }, '/graphics/boss_sylvanus_large.jpg' : {
            mpool : 1, army : true , siege : 1, levels : {'' : Util.group('',20)},
            siege_img : '/graphics/boss_sylvanas_drain_icon.gif', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'ซิลวานัส', en_us : 'Sylvanas the Sorceress Queen'
        }, '/graphics/boss_mephistopheles_large.jpg' : {
            mpool : 1, army : true , siege : 0, levels : {'' : Util.group('',20)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'เมมฟิสโต้', en_us : 'Mephistopheles'
        }, '/graphics/boss_lotus_big.jpg' : {
            mpool : 1, army : true , siege : 0, levels : {'' : Util.group('',15)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'โลตัส', en_us : 'Lotus Ravenmoore'
        }, '/graphics/boss_keira.jpg' : {
            mpool : 1, army : true , siege : 0, levels : {'' : Util.group('',10)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'เคียร่า', en_us : 'Keira the Dread Knight'
        }, '/graphics/death_large.jpg' : {
            mpool : 1, army : false , levels : {
                'Levels 90+'   : Util.group('90+: '  ,70),
                'Levels 60-90' : Util.group('60-90: ',70),
                'Levels 30-60' : Util.group('30-60: ',50),
                'Levels 1-30'  : Util.group('01-30: ',30)
            }, siege : 5, siege_img : '/graphics/death_siege_small',
            def: true, def_img   : '/graphics/bar_dispel.gif', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'สการ์', en_us : 'Skaar Deathrune'
        }, '/graphics/nm_azriel_large2.jpg' : {
            mpool : 1, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,45),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 7, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'แอซเรียล', en_us : 'Azriel, the Angel of Wrath'
        }, '/graphics/nm_mephistopheles2_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,45),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'อัลฟาเมมฟิสโต', en_us : 'Alpha Mephistopheles'
        }, '/graphics/nm_aurelius_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,45),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 7, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'ออเรเลียส', en_us : "Aurelius, Lion's Rebellion"
        }, '/graphics/boss_corv.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,45),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'คอร์วินเทียส', en_us : 'Corvintheus'
        }, 'graphics/boss_jahanna_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,50),
                'Levels 100-149' : Util.group('100-149: ',35),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'แจฮานนา', en_us : "Jahanna, Priestess of Aurora"
        }, '/graphics/dragon_monster_green.jpg' : {
            mpool : 2, army : true , siege : 0, levels : {'' : Util.group('',50)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'มังกรมรกต', en_us : 'Emerald Dragon'
        }, '/graphics/dragon_monster_blue.jpg' : {
            mpool : 2, army : true , siege : 0, levels : {'' : Util.group('',50)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'มังกรน้ำแข็ง', en_us : 'Frost Dragon'
        }, '/graphics/dragon_monster_gold.jpg' : {
            mpool : 2, army : true , siege : 0, levels : {'' : Util.group('',50)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'มังกรทอง', en_us : 'Gold Dragon'
        }, '/graphics/dragon_monster.jpg' : {
            mpool : 2, army : true , siege : 0, levels : {'' : Util.group('',50)}, hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'มังกรแดง', en_us : 'Ancient Red Dragon'
        }, '/graphics/seamonster_green.jpg' : {
            mpool : 2, army : true , siege : 0, def: true, levels : {'' : Util.group('',50)},
            def_img   : '/graphics/seamonster_ship_health.jpg', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'งูเขียว', en_us : 'Emerald Sea Serpent'
        }, '/graphics/seamonster_blue.jpg' : {
            mpool : 2, army : true , siege : 0, def: true, levels : {'' : Util.group('',50)},
            def_img   : '/graphics/seamonster_ship_health.jpg', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'งูฟ้า', en_us : 'Sapphire Sea Serpent'
        }, '/graphics/seamonster_purple.jpg' : {
            mpool : 2, army : true , siege : 0, def: true, levels : {'' : Util.group('',50)},
            def_img   : '/graphics/seamonster_ship_health.jpg', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'งูม่วง', en_us : 'Amethyst Sea Serpent'
        }, '/graphics/seamonster_red.jpg' : {
            mpool : 2, army : true , siege : 0, def: true, levels : {'' : Util.group('',50)},
            def_img   : '/graphics/seamonster_ship_health.jpg', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'งูแดง', en_us : 'Ancient Sea Serpent'
        }, '/graphics/hydra_large.jpg' : {
            mpool : 3, army : false, siege : 6, levels : {
                'Levels 90+'   : Util.group('90+: '  ,30),
                'Levels 60-90' : Util.group('60-90: ',30),
                'Levels 30-60' : Util.group('30-60: ',30),
                'Levels 1-30'  : Util.group('01-30: ',40)
            }, siege_img : '/graphics/monster_siege_small', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'ไฮดร้า',en_us : 'Cronus, The World Hydra'
        }, '/graphics/castle_siege_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 90+'   : Util.group('90+: '  ,40),
                'Levels 60-90' : Util.group('60-90: ',30),
                'Levels 30-60' : Util.group('30-60: ',30),
                'Levels 1-30'  : Util.group('01-30: ',30)
            }, siege : 6, siege_img : '/graphics/castle_siege_small',
            def: true, def_img   : '/graphics/seamonster_ship_health.jpg', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'กองทัพมืด', en_us : 'Dark Legion'
        }, '/graphics/earth_element_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 90+'   : Util.group('90+: '  ,40),
                'Levels 60-90' : Util.group('60-90: ',30),
                'Levels 30-60' : Util.group('30-60: ',30),
                'Levels 1-30'  : Util.group('01-30: ',30)
            }, siege : 5, siege_img : '/graphics/(\w+)_siege_(\w+)',
            def: true, def_img   : '/graphics/seamonster_ship_health.jpg', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'เจนีซิซ', en_us : 'Genesis, The Earth Elemental'
        }, '/graphics/water_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 90+'   : Util.group('90+: '  ,70),
                'Levels 60-90' : Util.group('60-90: ',70),
                'Levels 30-60' : Util.group('30-60: ',50),
                'Levels 1-30'  : Util.group('01-30: ',30)
            }, siege : 5, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/bar_dispel.gif', hp_img : '/graphics/monster_health_background.jpg',
            th_th : 'แร็กน่ารอค', en_us : 'Ragnarok, The Ice Elemental'
        }, '/graphics/nm_gehenna_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,45),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 7, siege_img : '/graphics/(\w+)_siege_(\w+)',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'จีเฮนนา', en_us : 'Gehenna, The Fire Elemental'
        }, '/graphics/monster_valhalla.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,45),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : 'graphics/nm_red.jpg',
            th_th : 'วอลฮาลลา', en_us : 'Valhalla, The Air Elemental'
        }, '/graphics/nm_volcanic_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,20),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 5, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'มังกรบาฮามุท', en_us : 'Bahamut, the Volcanic Dragon'
        }, '/graphics/nm_volcanic_large_2.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,60),
                'Levels 100-149' : Util.group('100-149: ',30),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 7, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'มังกรอัลฟ่าบาฮามุท', en_us : 'Alpha Bahamut, the Volcanic Dragon'
        }, '/graphics/nm_war_large.jpg' : {
		mpool : 3, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,45),
		'Levels 100-149' : Util.group('100-149: ',30),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
		}, siege : 7, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'ราบแดง', en_us : 'War of the Red Plains'
	}, '/graphics/boss_agamemnon_large.jpg' : {
		mpool : 3, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
		}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'อกาเมมนอน', en_us : 'Agamemnon the Overseer'
	}, '/graphics/boss_aurora_large.jpg' : {
		mpool : 1, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
		}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'ออโรร่า', en_us : 'Aurora'
	}, '/graphics/monster_shardros_large.jpg' : {
		mpool : 3, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'ชาดรอส', en_us : 'Shardros,the Mountain Giant'
	}, '/graphics/monster_glacius_large.jpg' : {
		mpool : 3, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'แกลเซียส', en_us : 'Glacius,the Frost Giant'
	}, '/graphics/monster_kromash_large.jpg' : {
		mpool : 3, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'โครมาช', en_us : 'Kromash,the Storm Giant'
	}, '/graphics/monster_magmos_large.jpg' : {
		mpool : 3, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'แม๊กมอส', en_us : 'Magmos,the Lava Giant'	     
	}, '/graphics/boss_ambrosia_large.jpg' : {
		mpool : 1, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	}, siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'แอมโบรเซีย', en_us : 'Ambrosia'	     
	}, '/graphics/monster_chimera_large.jpg' : {
		mpool : 1, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	},siege : 10, siege_img : '/graphics/water_siege_small',
		def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
		th_th : 'คิเมร่า', en_us : 'Typhonus, the Chimera'	     
	}, 'graphics/boss_malekus_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,50),
                'Levels 100-149' : Util.group('100-149: ',35),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            th_th : 'มาเลคุส', en_us : 'Malekus'
        }, 'graphics/monster_alexandra_large.jpg' : {
	    mpool : 1, army : false, levels : {
		'Levels 150+'    : Util.group('150+: '   ,50),
		'Levels 100-149' : Util.group('100-149: ',35),
		'Levels 50-99'   : Util.group('50-99: '  ,30),
		'Levels 1-49'    : Util.group('01-49: '  ,30)
	    }, siege : 10, siege_img : '/graphics/water_siege_small',
	    	def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
	    	th_th : 'อเล็กซานดร้า', en_us : 'Alexandra, the Unbreakable'
        }, 'graphics/monster_kraken_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,50),
                'Levels 100-149' : Util.group('100-149: ',35),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            	def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            	th_th : 'คราเคน', en_us : 'The Kraken'
        }, 'graphics/monster_kraken_large.jpg' : {
            mpool : 3, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,50),
                'Levels 100-149' : Util.group('100-149: ',35),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            	def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            	th_th : 'อัลฟ่าคราเคน', en_us : 'Alpha Kraken'
        }, 'graphics/boss_azeron_large.jpg' : {
            mpool : 1, army : false, levels : {
                'Levels 150+'    : Util.group('150+: '   ,50),
                'Levels 100-149' : Util.group('100-149: ',35),
                'Levels 50-99'   : Util.group('50-99: '  ,30),
                'Levels 1-49'    : Util.group('01-49: '  ,30)
            }, siege : 10, siege_img : '/graphics/water_siege_small',
            	def: true, def_img   : '/graphics/nm_green.jpg', hp_img : '/graphics/nm_red.jpg',
            	th_th : 'อเซรอน', en_us : 'Azeron'
	 }
    }
},

Setting = {

    locale : function(value) {
        return this._set("LOCALE", "en_us", value);
    },
    compress : function(value) {
        return this._set("COMPRESS", "original", value);
    },
    info_pos : function(value) {
        return this._set("INFOPOS", this.pos.left+','+this.pos.top, value);
    },
    stats_pos : function(value) {
        return this._set("STATSPOS", (this.pos.left+220)+','+this.pos.top, value);
    },
    _data : {},
    _read : function() {
        var cks = document.cookie.split(';');
        for(var p in cks) {
            if(/^ ?thaica_monster_info=/.test(cks[p])) {
                var kv = cks[p].split('=');
                Setting._data = JSON.parse(kv[1]);
                break;
            }
        }
    },
    _write : function() {
        var date = new Date();
		date.setTime(date.getTime() + 1000*60*60*24*365);
		var expires = "; expires=" + date.toGMTString();
		document.cookie = "thaica_monster_info="+JSON.stringify(Setting._data)+expires+"; path=/";
    },
    _set : function(k, d, value) {
        if(typeof value == 'undefined') {
            var value = Setting._data[k];
            return value != null ? value : d;
        } else {
            Setting._data[k] = value;
            Setting._write();
        }
    },
    init : function() {
        var table = $j("<table>").attr("width","100%"), tr = $j("<tr>"), td = $j("<td>"),
            lang = $j("<select>").css({float:'right'}).append(
                "<option value='th_th'>ไทย</option>",
                "<option value='en_us'>English</option>").val(Setting.locale()),
            compress = $j("<select>").css({float:'right'}).append(
                "<option value='tinyurl'>tinyurl.com</option>",
                "<option value='bitly'>bit.ly</option>",
                "<option value='jmp'>j.mp</option>",
                "<option value='original'>Original Url</option>").val(Setting.compress()),
            lang_bar = tr.clone().append(td.clone().append("Language:"), td.clone().append(lang)),
            comp_bar = tr.clone().append(td.clone().append("Short Url:"), td.clone().append(compress)),
            conf_bar = tr.clone().append(td.clone(), td.clone().append($j("<button>").css({float:'right'}).append("Save").click(function() {
                Setting.locale  ($j(":selected", lang    ).attr("value"));
                Setting.compress($j(":selected", compress).attr("value"));
                Parser.start();}))),
            ca_setting = UI.ca_setting().empty().append(table.append(lang_bar, comp_bar, conf_bar));
    }

},
/**
 * Short URL services
 */
URL = {
    tinyurl : function tinyurl(long_url, callback) {
        if(tinyurl[long_url]) {
            callback(tinyurl[long_url]);
        } else {
            $j.get('http://json-tinyurl.appspot.com/?url='+ encodeURIComponent(long_url) , function(response) {
                    var return_url = (response.ok ? response.tinyurl : long_url);
                    tinyurl[long_url] = return_url;

                    callback(return_url);
                },
                'jsonp'
            );
        }
    }, bitly : function bitly(long_url, callback) {
        if(bitly[long_url]) {
            callback(bitly[long_url]);
        } else {
            $j.ajax({
                type : 'GET',
                url    : 'http://api.bit.ly/shorten?version=2.0.1&longUrl=' + encodeURIComponent(long_url) + '&login=castleage&apiKey=R_438eea4a725a25d92661bce54b17bee1&format=json&history=1',
                success : function(response) {
                    var return_url = (response.errorCode == 0 ? response.results[long_url].shortUrl : long_url);
                    bitly[long_url] = return_url;
                    callback(return_url);
                },
                dataType : 'jsonp'
            });
        }
    }, jmp : function jmp(long_url, callback) {
        if(jmp[long_url]) {
            callback(jmp[long_url]);
        } else {
            $j.ajax({
                type : 'GET',
                url    : 'http://api.j.mp/shorten?version=2.0.1&longUrl=' + encodeURIComponent(long_url) + '&login=castleage&apiKey=R_438eea4a725a25d92661bce54b17bee1&format=json&history=1',
                success : function(response) {
                    var return_url = (response.errorCode == 0 ? response.results[long_url].shortUrl : long_url);
                    jmp[long_url] = return_url;
                    callback(return_url);
                },
                dataType : 'jsonp'
            });
        }
    }, original : function original(long_url, callback) {
        callback(long_url);
    }
},

Gettext = {
    th_th : {
        NOT_SUPPORTTED : "ยังไม่มีรายละเอียด",
        TIME_LEFT : "เวลาที่เหลือ",
        HP_LEFT : "พลังที่เหลือ",
        HOUR : "ชั่วโมง",
        MINUTE : "นาที",
        DEFENSE : "พลังป้องกัน",
        WEAPON : "ยิงปืน",
        NEED_MORE : "ต้องการอีก %d คลิก",
        ATTACKER : "จำนวนคน",
        FACEBOOK_LINK : "คนซัมมอน",
        ARMY_LINK : "ลิ้งอาร์มี่",
        ASSIST_LINK : "ลิ้งช่วยเหลือ",
        ENDED : "ชนะเลิศ",
        UPDATE : "Thai CA Monster Info มี version ใหม่<br/>ต้องการอับเดดหรือไม่?<br/><br/>(กด OK จะอับเดดอัตโนมัติใน 3 วินาที)<br/><br/>",
        EXP_LEVEL : "อีกชาตินึงก้ออับล่ะ",
        TIME_LEVEL_S : "เวลาไวสุด",
        TIME_LEVEL_L : "เวลาช้าสุด",
        DAMAGE : "โจมตีไป",	
	FESTIVAL : "เฟสติวัล ทาวเวอร์"
    }, en_us : {
        NOT_SUPPORTTED : "Sorry, other bosses are not supported yet ...",
        TIME_LEFT : "Time left",
        HP_LEFT : "Health",
        HOUR : "hour",
        MINUTE : "min",
        DEFENSE : "Defense",
        WEAPON : "Weapon Sieged",
        NEED_MORE : "Need %d more",
        ATTACKER : "Players",
        FACEBOOK_LINK : "Summoner",
        ARMY_LINK : "Quick Army",
        ASSIST_LINK : "Assist Link",
        ENDED : "Ended",
        UPDATE : "There is a newer version of Castle Age Monster Info available.<br/>Would you like to update it now?<br/><br/>(Click OK will auto-update in 3 seconds)<br/><br/>",
        EXP_LEVEL : "Exp to level",
        TIME_LEVEL_S : "Time to level(fastest)",
        TIME_LEVEL_L : "Time to level(slowest)",
        DAMAGE : "Damage",
	FESTIVAL : "Festival tower"
    }
}
;

Script.init();