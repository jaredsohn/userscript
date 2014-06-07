// ==UserScript==
// @name           SteamGifts.com tweaks (mod)
// @version        1.1
// @description    Various tweaks for Steamgifts.com
// @include        http://*steamgifts.com/
// @include        http://*steamgifts.com/open*
// @include        http://*steamgifts.com/new*
// ==/UserScript==

(function() {
    
    function main () {
        
        if($('img.login').length == 0){
            
            var cfgSort = false;
            var cfgExcludePoints = false;
            var cfgExclude = false;
            var cfgSteamLinks = true;
            var cfgRemovePaging = true;
            var cfgLimitPages = 10;
            var cfgHideAvatar = true;
            
            //Featured
            $('.featured').hide();
            
            //Hide all extra footer stuff
            $('.ajax_gifts').next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide().next().hide();
            /*$('.recent_winners').hide();
            $('.top_contributors').hide();
            $('.footer_sales').hide();*/
            
            //Filter Giveaways
            function filterGiveaways(){
                var accPoints = ($('div#navigation ol > li:nth-child(3) > a').html());
                $.myPoints = parseInt(accPoints.substring(9,accPoints.length - 2));
                
                $('.post').each(function(){
                    if($(this).attr('class') != 'post fade'){
                        if(cfgExcludePoints && parseInt(($(this).find('.title span[class!="new"]').html()).substr(1, ($(this).find('.title span[class!="new"]').html()).length - 2)) > $.myPoints ){
                            // hide gifts with points that in account
                            $(this).css('display','none');
                        } else if($.myTitles.search('#' + $(this).find('.title a').html() + '#') != -1){
                            // hide gifts already in my account
                            $(this).remove();
                        } else if(cfgExclude && $.excludeTitles.search('#' + $(this).find('.title a').html() + '#') != -1){
                            // hide excluded titles, currently static array
                            $(this).remove();
                        } else {
                            // else, show
                            $(this).css('display','block');
                        }
                        
                        /*if (cfgHideAvatar) {
                        	$(this).find(".center").hide();
                        }*/
                    }
                });
                
                if (cfgHideAvatar) {
                    $('.center').hide();
                    $('.left').css('width', '765px');
                }
                
                // Sort results by name
                if (cfgSort) $('.post').sort(function(a,b){return $(a).find('.title a ').text() > $(b).find('.title a ').text() ? 1 : -1;}).appendTo('.ajax_gifts');
                
            }
            
            var mytime = 86400000;
            var nowDate = new Date();
            
            var excludeTitlesArr = [
                "Game 1",
                "Game 2"
            ];
            $.excludeTitles = "#" + excludeTitlesArr.join('#') + "#";

            if(localStorage.getItem('a7k_lastupdate') != null && (nowDate.getTime() - mytime) < localStorage.getItem('a7k_lastupdate')){
                console.log('Load my titles from cache');
                $.myTitles = localStorage.getItem('a7k_titles');
                filterGiveaways();
            } else {
                console.log('Update my titles');
                $.ajax({
                    type: "get",
                    url: "http://www.steamgifts.com/sync",
                    dataType: "html",
                    success: function(data){
                        $.myArr = new Array();
                        $(data).find('.code').each(function(){
                            $.myArr[$.myArr.length] = $(this).html();
                        });
                        localStorage.setItem('a7k_titles', '#' + $.myArr.join('#') + '#');
                        var myDate = new Date();
                        localStorage.setItem('a7k_lastupdate', myDate.getTime());
                        $.myTitles = localStorage.getItem('a7k_titles');
                        filterGiveaways();
                    }
                });
            }
            
            //Trusted Giveaways
            function highlightTrusted(){
                $('.post .left .description .created_by a').each(function(index){
                    var mytime = 172800000;
                    var mynow = new Date();
                    
                    if(localStorage.getItem($(this).attr('href')) != null && parseInt(((localStorage.getItem($(this).attr('href'))).split(';'))[1]) > mynow.getTime() - mytime){
                        console.log('Trusted users: from cache');
                        if(((localStorage.getItem($(this).attr('href'))).split(';'))[0] == 'true'){
                            $(this).css('color','Green').css('font-weight','bold');
                        }
                    } else {
                        console.log('Trusted users: loading');
                        $.ajax({
                            type: "get",
                            url: "http://www.steamgifts.com" + $(this).attr('href'),
                            dataType: "html",
                            success: function(data){
                                
                                var myArr = new Array();
                                var myDate = new Date();
                                
                                if($(data).find('.green .row_right strong').html() == "100%"){
                                    myArr[0] = 'true';
                                    $('a[href="/user/' + $(data).find('.heading strong').html() + '"]').css('color','Green').css('font-weight','bold');
                                } else {
                                    myArr[0] = 'false';
                                }
                                myArr[1] = myDate.getTime();
                                
                                localStorage.setItem('/user/' + $(data).find('.heading strong').html(), myArr.join(';'));
                            }
                        });
                    }
                });
            }
            
            highlightTrusted();
            
            //Add Steam Links
            function steamLinks(){
                if (!cfgSteamLinks) return;
                $('.post').each(function(index){
                    var appId = $(this).find('.title a').attr('href');
                    appId = "/steamlink" + appId.substring(appId.lastIndexOf('/'));
                    //console.log(appId);
                    
                    var steamAppID;
                    if(localStorage.getItem(appId) != null){
                        console.log('Steam Link: from cache for app ' + appId);
                        steamAppID = localStorage.getItem(appId);
                    } else {
                        console.log('Steam Link: loading for app ' + appId);
                        //console.log('Loading from url: ' + $(this).find('.title a').attr('href'));
                        $.ajax({
                            type: "get",
                            url: "http://www.steamgifts.com" + $(this).find('.title a').attr('href'),
                            dataType: "html",
                            success: function(data){
                                var steamLink = $(data).find('.steam_store a').attr('href');
                                steamAppID = steamLink.match(/(-?\d+)/)[1];
                                
                                localStorage.setItem(appId, steamAppID);
                            }
                        });
                    }
                    
                    if (steamAppID != null && !$(this).find('.steamLink').length) {
                        var steamLink = "<span class=\"steamLink\" style=\"float: right; font-size: 0.7em; margin-right: 128px;\">(<a href=\"http://store.steampowered.com/app/" + steamAppID + "/\">Steam Store</a>)</span>";
                        $(this).find('.title').append(steamLink);
                    }
                    
                    if (false && steamAppID != null) {
                        var appCat = localStorage.getItem("steamCat/" + steamAppID);
                        if (appCat == null) {
                            if (steamAppID != null && steamAppID > 0) {
                                $.ajax({
                                    type: "get",
                                    url: "http://store.steampowered.com/app/" + steamAppID + "/",
                                    dataType: "html",
                                    crossDomain: true,
                                    success: function(data){
                                        steamAppCat = $(data).find('.breadcrumbs .blockbg a:nth-child(2)').text();
                                        localStorage.setItem("steamCat/" + steamAppID, steamAppCat);
                                    }
                                });
                            }
                        } else {
                            var steamCategory = "<span style=\"float: right\">" + appCat + "</span>";
                            $(this).find('.enties').append(steamLink);
                        }
                    }                    
                    
                    $(this).find('.new').hide();
                    
                });
            }
            steamLinks();
            
            if(cfgRemovePaging && window.location.pathname == "/"){
                var pages = Math.ceil(parseInt($('.results strong:last').html())/15);
                // Load maximum 10 pages
                if (pages > cfgLimitPages) {
                    pages = cfgLimitPages;   
                }
                
                for(i = 2; i < pages+1; i++){
                    
                    $.ajax({
                        type: "get",
                        url: "http://www.steamgifts.com/" + $('.pagination:first .numbers a[class!="selected"]:first').attr('href').split('/')[1] + "/page/" + i,
                        dataType: "html",
                        success: function(data){
                            $(data).find('.post').appendTo('.ajax_gifts');
                            filterGiveaways();
                            highlightTrusted();
                            steamLinks();
                            $(".post.fade").hover(
                                function () {
                                    $(this).addClass("over");},
                                function () {
                                    $(this).removeClass("over");
                                });
                        }
                    });
                    
                }
                
                $('.pagination').remove();
            }
            
            //Update points & refiltering
            $.tmptitle = document.title;
            var accPoints = ($('div#navigation ol > li:nth-child(3) > a').html());
            document.title = "(" + accPoints.substring(9, accPoints.length - 2) + ") " + document.title;
            
            function checkPoints(){
                $.ajax({
                    type: "get",
                    url: "http://www.steamgifts.com/account",
                    dataType: "html",
                    success: function(data){
                        $(data).find('div#navigation ol > li:nth-child(3) > a').each(function(){
                            var accPoints = $(this).html();
                            accPoints = accPoints.substring(9, accPoints.length - 2);
                            document.title = "(" + accPoints + ") " + $.tmptitle;
                            $('div#navigation ol > li:nth-child(3) > a').html("Account (" + accPoints + "P)");
                            filterGiveaways();
                        });
                        
                        setTimeout(checkPoints, 60000);
                    }
                });
            }
            
            setTimeout(checkPoints, 60000);
        }
    }
    
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
    
})();




/*


                        if (steamAppID != null && steamAppID > 0) {
                            $.ajax({
                                type: "get",
                                url: "http://store.steampowered.com/app/" + steamAppID + "/",
                                dataType: "html",
                                success: function(data){
                                    steamAppCat = $(data).find('.breadcrumbs .blockbg a:nth-child(2)').text();
                                    console.log(appId + ' category is: ' + steamAppCat);
                                }
                            });
                        }


*/