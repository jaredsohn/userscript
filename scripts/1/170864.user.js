// ==UserScript==
// @name       		DPStream Betaseries progress
// @namespace  		http://korri.fr/
// @version    		0.4
// @description  	Affiche sur le site DPStream la progression actuelle sur betaseries
// @match      		http://www.dpstream.net/manga-*
// @match      		http://www.dpstream.net/serie-*
// @require			http://www.myersdaily.org/joseph/javascript/md5.js
// @copyright  		2012+, Korri
// ==/UserScript==
(function() {
    var APIKEY = '93a030ace51c',
        URL = 'http://api.betaseries.com/',
        IS_MANGA = true;
    
    function betaseries(action, params, callback, error_callback) {
        params.key = APIKEY;
        
        $.ajax({
            url: URL + action + '.json',
            data: params,
            type: 'GET',
            dataType: 'jsonp',
            success: function(res) {
                if(res.root.errors.error) {
                    error_callback(res.root);
                }else {
                    callback(res.root);
                }
            }
        });
        
        
    }
    $(function(){
        GM_addStyle(".betaseries_sawn{display: inline-block; width: 16px; height: 15px; text-index: -9999px; color: transparent; background:url(http://cdn1.iconfinder.com/data/icons/fugue/icon_shadowless/eye.png)}");
        IS_MANGA = document.URL.match(/\/manga-/);
        
        $(document).ajaxStop(function(){
            if($('span#titreserie').length == 1 && $('span#titreserie .betaseries_checked').length == 0) {
                setTimeout(updateViews, 100);
            }
        });
        updateViews();
    });
    function updateViews() {
        var _title = IS_MANGA ? $('.ram2 h3.tgg') : $('h1');
        $('span#titreserie').append('<span class="betaseries_checked">');
        if(_title.length > 0) {
            var show_title = _title.text().split(' -')[0];
            show_title = show_title.split('(')[0];
            tryLogin(function(){
                checkProgress(show_title);
            });
        }
    }
    function tryLogin(callback) {
        var token = GM_getValue('token');
        
        if(token) {
            callback();
            return true;
        }
        var login = GM_getValue('login', false),
            password = GM_getValue('password', false);
        
        if(!login || !password) {
            login = prompt('Betaseries login');
            if(!login) {
                return false;
            }
            GM_setValue('login', login);
            password = prompt('Betaseries password');
            if(!password) {
                return false;
            }
            password = md5(password);
            GM_setValue('password', password);
        }
        
        betaseries('members/auth', {
            login: login,
            password: password
        }, function(res) {
            GM_setValue('token', res.member.token);
            callback();
        }, function() {
            GM_deleteValue('login');
            GM_deleteValue('password');
            tryLogin(callback); 
        });
    }
    function checkProgress(title) {
        //Do we know this show's url ?
        var show_key = 'show_' + title,
            show_url = GM_getValue(show_key, false);
        
        if(show_url) {
            load_progress(show_url);
        }else {
            betaseries('shows/search', {
                title: title,
                token: GM_getValue('token')
            }, function(res){
                if(res.shows.length == 0) {
                    var title_el;
                    if(IS_MANGA) {
                        title_el = $('.ram2 h3.tgg');
                    }else {
                        title_el = $('h1');
                    }
                    title_el.css('text-decoration', 'line-through')
                    .attr('title', 'Show introuvable sur betaseries ("' + title + '")');
                }else {
                    for(var i = 0; i < res.shows.length; i++) {
                        if(res.shows[i].is_in_account == 1) {
                            var url = res.shows[i].url;
                            GM_setValue(show_key, url);
                            load_progress(url);
                            return true;
                        }
                    }
                    return false;
                }
            });
        }
    }
    function load_progress(url) {
        betaseries('members/episodes/all', {
            token: GM_getValue('token'),
            show: url
        }, function(res){
            //We will add eyes so let's remove any remaining one
            $('.betaseries_sawn').remove();
            
            if(IS_MANGA) {
                if(res.episodes.length == 0) {
                    //mark all as sawn if in account
                    mark_sawn($('.ras5 .tggm a.b'));
                    return true;
                }
                var next = res.episodes[0].global,
                    index = false;
                
                var episode_number = prefix(next - 1, 3);
                
                //Mark episodes as sawn
                
                //try to find the episode
                var span = $('.ras5 .tggm a.b b span:contains('+episode_number+')');
                if(span.length) {
                    index = span.last().parent().parent().index();
                }
                //TODO: Maybe alternative ways
                if(index) {
                    mark_sawn($('.ras5 .tggm a.b:lt('+(index+1)+')'));
                }
            }else {
                if(res.episodes.length == 0) {
                    //mark all season as sawn
                    mark_sawn($('.ras4 > h3.tgg'));
                    return true;
                }
                var last_season = res.episodes[0].season,
                    next_episode = res.episodes[0].episode;
                //console.log('NextEpisode', next_episode, 'x', last_season);
                //Mark past seasons episodes as sawn
                //mark_sawn($('.ras5 > .tggm:lt('+(last_season-1)+') > a'));
                
                //Mark past season as sawn
                for(var s = 1; s < last_season; s++) {
                    mark_sawn($('.ras4 > h3.tgg:contains(Saison '+s+')'));
                }
                
                //Mark current seasons episode as sawn
                //Find last episode sawn
                var last_sawn = prefix(next_episode);
                if(last_sawn != '00') {
                    var link = $('.ras4 > h3.tgg:contains(Saison '+last_season+'):visible').parent().next().find('a:contains('+last_sawn+')');
                    if(link.length) {
                        mark_sawn(link.prevAll());
                    }
                }
                var ep = $('span#titreserie');
                if(ep.length) {
                    var matches = ep.text().match(/Saison ([0-9]+) - Episode ([0-9]+)/);
                    if(matches && matches.length == 3) {
                        var eps = matches[1],
                            epn = matches[2];
                        if(eps < last_season || (eps == last_season && epn < next_episode)) {
                            mark_sawn(ep);
                        }else {
                            //Episode non vu, on ajout le lien
                            $('<a/>').attr('href', '#')
                            .text(' [Marquer comme vu] ')
                            .click(function(ev){
                                ev.preventDefault();
                                var _this = $(this);
                                mark_sawn_betaseries(url, eps, epn, function(){
                                	_this.remove();
                            		mark_sawn(ep);
                                    //TODO: make something more efficient here
                                    updateViews();
                                });
                            })
                            .appendTo(ep);
                        }
                    }
                }
            }
        }, function(res){
            if(res.errors.error.code == 2001) {
                GM_deleteValue('token');
                tryLogin(function(){
                    checkProgress(title);
                });
            }
        });
    }
    function mark_sawn_betaseries(url, season, episode, callback) {
        betaseries('members/watched/' + url, {
            season: season,
            episode: episode,
            token: GM_getValue('token')
        }, callback);
    }
    function mark_sawn(els) {
        els.append('<span class="betaseries_sawn">(s)</span>');
    }
    function prefix(number, digits) {
        number = number + '';
        digis = digits || 2;
        while(number.length < digits) {
            number = '0' + number;
        }
        return number;
    }
})();