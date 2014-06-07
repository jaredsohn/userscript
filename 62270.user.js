// ==UserScript==
// @name 	Ikariam: Light
// @author 	JohnyCage
// @version	0.0.8.0
// @description    	A script for Ikariam v0.4.2.4 that xtends the UI
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @history			0.0.9 Auto build
// @history			0.0.8.1 Fixed problem with city names
// @history			0.0.8.0 Complete rewrite. Some outdated features are gone. Some are added
// @history			0.0.7.2 Added additional keyboard shortcuts
// @history			0.0.7.1 Fixed bug with ship calculation times
// @history			0.0.7 Added links to wiki pages
// @history			0.0.6 Added split military and diplomacy advisors personality
// @history			0.0.5.2 Extended remove premium functionality to include military and diplomacy archive
// @history			0.0.5.1 Fixed a bug with premium trader and unsufficient materials for building a building
// @history			0.0.5 Added building level in city view. Added city levels and owners names in island view. Added hide premium merchant functionality
// @history			0.0.4 Added expanded ship cargo
// @history			0.0.3 Autoupdate functionality
// @history			0.0.2 Added keyboard shortcuts for fast city access
// @history			0.0.1 Initial release
// ==/UserScript==

var version = "0.0.9.0";

var lightUtils = {
    cache:{},
    getUrlParameters: function(){
        if(lightUtils.cache['urlParams']) return lightUtils.cache['urlParams'];
        var query = window.location.search.substring(1);
        var tokens = query.split('&');
        var res = lightUtils.cache['urlParams'] = {};
        for(var i = 0; i<tokens.length;i++){
            var t = tokens[i].split('=');
            res[t[0]] = t[1];
        }
        return res;
    }
}

var light = {
   
    config: {
        wikiLinks: GM_getValue("light.global.wikiLinks", true),    
        keyboardShortcuts: GM_getValue("light.global.keyboardShortcuts", true),    
        splitPersonalities: GM_getValue("light.global.splitPersonalities", true),    
        resourceLinks: GM_getValue("light.global.resourceLinks", true),    
        settings: GM_getValue("light.global.settings", true),    
        hidePremium: GM_getValue("light.global.hidePremium", true),    
        hideFacebook: GM_getValue("light.global.hideFacebook", true),    
        hideFriends: GM_getValue("light.global.hideFriends", true),    

        cityLevel: GM_getValue("light.island.cityLevel", true),
        buildingLevel: GM_getValue("light.city.buildingLevel", true),
        expandCargo: GM_getValue("light.merchant.expandCargo", true),
        autoBuild: GM_getValue("light.city.autobuild", true),
    }, 
    data : {
        current:{
            page:$(document.body).attr("id"),
            position: lightUtils.getUrlParameters()['position'],
            island: function(){
                var temp = $('li.viewIsland a').attr('href');
                var index = temp.indexOf('id=');
                return temp.substring(index+3);
            },
            city: {id: $('#citySelect').val(), name:$('#citySelect option:selected').text()},
            cities: function(){
                var res = [];
                $('#citySelect option').each(function(index, ele){
                    ele = $(ele);
                    res.push({id: ele.attr("value"), name:ele.text() , deployed: ele.hasClass('deployedCities')});
                });
                return res;
            }(),
            tradegood: function(){
                var r = 'gold';
                $('script').each(function(index, src){
                    if (src.innerHTML.indexOf('tradegoodCounter') >= 0){
                        r = src.innerHTML.split('tradegoodCounter')[1].split('value_')[1].split('"')[0];
                        return false;
                    }
                });
                return r; 
            }(),

        }
    },
    core: {
        isPage:function(){
            for(var i = 0; i<arguments.length;i++){
                if(light.data.current.page == arguments[i]) 
                    return true;
            }
            return false;
        },
        removeIfPage:function(id){
            var remove = false;
            for(var i = 1; i<arguments.length;i++){
                if(light.data.current.page == arguments[i]) 
                    remove = true;
                    break;
            }
            if(remove) 
                $(id).remove();
        },
        goWorld: function(){
            window.location.href='index.php?view=worldmap_iso';
        },
        goIsland: function(island){
            window.location.href='index.php?view=island&id=' + (island || light.data.current.island);
        },
        goCity: function(city){
            if(!city)
                return window.location.href='index.php?view=city&id=' + light.data.current.city.id;
        	$("#citySelect").val(city || light.data.current.city.id);
            $('#changeCityForm').submit();
        },
        goCityIndex:function(index){
            if(index<light.data.current.cities.length)
                return light.core.goCity(light.data.current.cities[index].id)
        },
        tradeCityIndex: function(index){
            if(index<light.data.current.cities.length)
                return window.location.href='index.php?view=transport&destinationCityId=' + light.data.current.cities[index].id;
        }

    },
    init: function(){
        for(var k in light.config) {
            if(light.config[k])
                opt[k]();
        }
        opt.smallFixes();
    }
}

const BUILDINGS = {
            townHall:"Town_Hall",
            palace:"Palace",
            palaceColony: "Governor's_residence",
            tavern: "Tavern",
            dump: "Dump",
            academy: "Academy",
            barracks: "Barracks",
            embassy: "Embassy",
            safehouse: "Hideout",
            museum: "Museum",
            shipyard: "Shipyard",
            temple: "Temple",
            wall: "Town_wall",
            port: "Trading_port",
            branchOffice: "Trading_post",
            warehouse: "Warehouse",
            workshop: "Workshop",
            alchemist: "Alchemist's_Tower",
            forester: "Forester's_House",
            glassblowing: "Glassblower",
            stonemason: "Stonemason",
            winegrower: "Winery",
            architect: "Architect's_Office",
            carpentering: "Carpenter",
            fireworker: "Firework_Test_Area",
            optician: "Optician",
            vineyard: "Wine_Press"
        };

var opt = {
    wikiLinks: function(){
        var wikiLinks = BUILDINGS; 
        light.data.current.wiki = wikiLinks[light.data.current.page];
        if(!light.data.current.wiki) 
            return;
        $('h1').append("<a href='http://ikariam.wikia.com/wiki/" + light.data.current.wiki + "' target='_blank'><img src='http://images.wikia.com/ikariam/images/6/64/Favicon.ico'/></a>");
    },

    keyboardShortcuts: function(){
        $(document).keydown(function(e){
            if(e.ctrlKey || e.shiftKey ) return;
            var element = $(e.target);
            if(element.is('input') || element.is('textarea')) return;
            if(e.keyCode == 87)//W
                return light.core.goWorld();
            else if (e.keyCode == 73)//I
                return light.core.goIsland();
            else if (e.keyCode == 67)//C
                return light.core.goCity();
             
            var index = e.keyCode==48?9:e.keyCode-49;
            if(e.keyCode == 109) index=10;
            if(e.altKey)
                return light.core.tradeCityIndex(index);
            else 
                return light.core.goCityIndex(index);
        });
    },

    splitPersonalities: function(){
        function splitPersonality(e, url, title){
            $(e).append("<a href='"+url+"' style='border-right:1px solid gray;width:45px; height:85px; position:absolute; background:none; top:0; left:0;' title='"+title+"'></a>");
        }
        splitPersonality("#advDiplomacy", "/index.php?view=diplomacyAdvisorAlly", "Check Alliance");
        splitPersonality("#advMilitary", "/index.php?view=militaryAdvisorCombatReports", "Battle Reports");
    },

    resourceLinks: function(){
        var vi = $('li.viewIsland');
        vi.append("<a style='padding:0px;width:24px;height:24px; position: absolute; left:1px; top:1px; display:block;background:url(skin/resources/icon_wood.gif)  no-repeat !important;' href='index.php?view=resource&type=resource&id="+light.data.current.island+"'></a>")
        vi.append("<a style='padding:0px;width:24px;height:24px; position: absolute; left:56px; top:1px; display:block;background:url(skin/resources/icon_"+light.data.current.tradegood+".gif)  no-repeat !important;}' href='index.php?view=tradegood&type=tradegood&id="+light.data.current.island+"'></a>")
        vi.append("<a style='padding:0px;width:24px;height:24px; position: absolute; left:30px; top:20px; display:block;background:none !important;' href='index.php?view=islandBoard&id="+light.data.current.island+"'><img src='skin/board/icon_forum.gif' width='24px'></a>")
    },

    hidePremium: function(){
        if(light.core.isPage('diplomacyAdvisorOutBox', 'diplomacyAdvisor'))
            $('span.costAmbrosia').parent().remove();

        light.core.removeIfPage('#assignCulturalGoods', 'culturalPossessions_assign');
        light.core.removeIfPage('#assignCulturalGoods', 'museum');
        light.core.removeIfPage('#trader', 'branchOffice');
        light.core.removeIfPage('#reportInboxLeft', 'city');
        light.core.removeIfPage('#tradeRouteBox', 'port');
        light.core.removeIfPage('#setPremiumTransports, #setPremiumJetPropulsion, #tradeRoute', 'transport');
        light.core.removeIfPage('tr.safecapacitybonus, tr.storagecapacitybonus', 'warehouse');
        light.core.removeIfPage('tr.safecapacitybonus, tr.storagecapacitybonus', 'dump');
        light.core.removeIfPage('li.order', 'townHall');
        light.core.removeIfPage('#premium_btn', 'barracks');
        light.core.removeIfPage('.premiumJet, .speed', 'merchantNavy');
            
        $('#banner_container').remove();
        $('iframe').remove();
        $('div.dynamic').each(function(index, ele){
            ele = $(ele);
            if(ele.attr('id').indexOf('Imperium')>0) 
                ele.remove();
        });

        $('a').each(function(index, a){
            a = $(a);
            var href = a.attr('href') || '';
            var remove = a.is('.plusteaser') || href.toLowerCase().indexOf('premium')>0 
            if(remove) 
                a.remove();
        });
        if(light.core.isPage('militaryAdvisorMilitaryMovements') || light.core.isPage('militaryAdvisorCombatReports'))
            $('ul.yui-nav li:last').remove();
        if(light.core.isPage('tradeAdvisor'))
            $('ul.yui-nav li:last').remove();
        if(light.core.isPage('resource') || light.core.isPage('tradegood')){
            $('.premiumOfferBox').remove();
            $('#mainview #setWorkers div.content').css('min-height', '170px')
        }

    },

    buildingLevel: function(){
        if(light.data.current.page != 'city') return;
        $('#locations li').each(function(index, ele){
            ele = $(ele);
            var title = $('a', ele).attr('title');
            if(!title) return;
            var lvl = title.replace(/[^\d-]+/g, "");
		    if (lvl.length>0) 
    			ele.append("<div style='position:absolute;z-index:1000;width:12px;height:12px;top:10px;left:40px;padding:2px;background-image:url(skin/layout/bg_contentBox01.gif);font-size:80%'>"+lvl+"</div>");
        });
    },

    settings: function(){
        if(light.data.current.page != 'options') return;
        $('#deletionMode').remove();
        $('#options_debug').remove();
        $('#vacationMode').remove();
    },

    hideFacebook: function(){
        $('#facebook_button').remove();
    },
    hideFriends: function(){
        $('#friends').remove();
    },

    cityLevel: function(){
        if(light.data.current.page != 'island') return;
        $('#cities li').each(function(index, ele){
            ele = $(ele);
            var name = $('.name', ele).clone().find('span').remove().end().text().trim();
            var owner = $('.owner', ele).clone().find('span').remove().end().text().trim();
            var text = name + "(" + owner + ")";

            var textLabel = $('a span.textLabel', ele);
            var vacation = $('span.vacation', ele);
            if(vacation.length) return vacation.html(text);
            var inactivity = $('span.inactivity', ele);
            if(inactivity.length) return inactivity.html(text);
            //normal case
            textLabel.html("<span class='before'></span>" + text + "<span class='after'></span>")
        });
    },

    expandCargo: function(){
        if(light.data.current.page!='merchantNavy') return;
        $('div.pulldown').each(function(index, ele){
            ele = $(ele);
            ele.before($('.content table',ele));
            ele.remove();
        });
    },

    smallFixes:function(){
        $('#buildingUpgrade .time').css('width', '100px');
        light.core.removeIfPage('.transportersCapacity, #missionSummary, #transportGoods hr', 'transport');
        light.core.removeIfPage('#setPremiumTransports, .transportersCapacity, #setPremiumJetPropulsion, #missionSummary, hr', 'takeOffer');
        light.core.removeIfPage('#grantedTransporters', 'merchantNavy');
        light.core.removeIfPage('li.researchPointsDiff', 'researchAdvisor');
        light.core.removeIfPage('#moveCapital', 'palaceColony');
        light.core.removeIfPage('#abandon, #notices, #finances', 'townHall');
        light.core.removeIfPage('#information', 'warehouse');
        light.core.removeIfPage('#information', 'dump');

        $('#townHall #CityOverview .stats').css('height', '130px')
        if(!$('#upgradeProgress').length)
            $('.buildingDescription').css({height:"0px", "min-height": "20px", "background": "none"});
        $('.buildingDescription p').remove();
        var upgradeBox = $('#buildingUpgrade');
        if(upgradeBox.length && !$('li.upgrade', upgradeBox).length)
            $('#information').remove();
        if(light.core.isPage('warehouse') || light.core.isPage('dump')){
            var mv = $('#mainview');
            mv.append($('.table01:first',mv));
            $('.content', mv).remove();
            $('.contentBox01h', mv).remove();
        }
    },

    autoBuild: function(){
        var autoPlayData = GM_getValue("light.data.autoPlay", {}); 
        function addDynamicBox(){
            var html="<div class='dynamic'><h3 class='header'>Light Build</h3><div class='content'>"
            for(var k in autoPlayData){
                var d = autoPlayData[k];
                hmtl+="<a href='index.php?view="+d.building.id+"&id="+d.city.id+"&position="+d.building.position+"' title='"+d.city.name + "-"+ d.building.id + "'>"+d.building.name+"</a>";
            }
            html+="</div><div class='footer'></div></div>";
            $('#container2').append(html);
        }
        
        if(!$.isEmptyObject(autoPlayData))
            addDynamicBox();

        function storeData(){
            GM_setValue("light.data.autoPlay", autoPlayData); 
        }

        if(!BUILDINGS[light.data.current.page]) return;
        var buildingId = light.data.current.city.id + "_" + light.data.current.position;

        var checkbox = $("<input type='checkbox' id='upgradeCheckbox' name='"+buildingId+"'>")
        if(autoPlayData[buildingId])
            checkbox.attr('checked','checked');
        $('#buildingUpgrade .content').append(checkbox);
        checkbox.click(function(){
            if(autoPlayData[buildingId])
                delete autoPlayData[buildingId];
            else {
                autoPlayData[buildingId] = {city:light.data.current.city, building:{position:light.data.current.position, id:light.data.current.page}};
            }
            storeData();
        });
    }
}

$(document).ready(light.init);