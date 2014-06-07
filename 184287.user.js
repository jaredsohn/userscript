// ==UserScript==
// @name        SP Better Tool
// @namespace   sp
// @include     http://www.soccerproject.com/*
// @version     1
// @grant       none
// ==/UserScript==
// ==UserScript==
// @name        Better Soccer Project
// @namespace   sp
// @description For making SP a little bit better
// @include     http://www.soccerproject.com/*
// @version     0.0.1
// @grant       none
// ==UserScript==
    //add jquery
    function includeJs(jsFilePath) {
        var js = document.createElement("script");
    
        js.type = "text/javascript";
        js.src = jsFilePath;
    
        document.body.appendChild(js);
    }
    
    includeJs("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
      
    var t=setTimeout(function(){
        //Rebind console to c
        var c = false;
        
        if(typeof console === "object" && typeof console.error === "function"){
            c = console,
                c = function (msg){"use strict"; console.info(msg);};
        }
    
        var SP = {};
    

        /*************************************
        *            FUNCTIONS               *
        **************************************/       
        function removeAllPlayers () {
            $('#formation_field select').each(function(){ //loop through selectable players.
                var me = $(this),
                options = me.find('option');
                me.find('option:selected').removeAttr('selected'); //remove all selected items    
                options.first().attr('selected','selected');
                updatePlayer(options.first().parent().get(0)); 
            });
        }
        
        function updatefitestplayers () {
            removeAllPlayers ();
            var allPlayers = [], i=0; 
            $('[id^=trPlayer]').each(function(){ //loop through all of the players
                var player = $(this).find('td');
                var fitness = player.eq(3).text().replace( /^\D+/g, '');
                var fitness = fitness.substring(0, fitness.length - 1); //get out their fitness and then remove the trailing %
                var playerID = player.eq(0).find('a').attr("onclick").replace( /^\D+/g, '');
                var playerID = playerID.slice(0,8);
                var playerID = parseInt(playerID, 10); // get out the players ID
                
                allPlayers.push([playerID,fitness]); //update array of players
            });
            
            allPlayers.sort(function(a,b){ //sort players by highest fitness
                return a[1] - b[1];
            }).reverse();
            
            allPlayers = allPlayers.slice(0,16); //remove the most unfit players
            console.info(allPlayers);
            $('#formation_field select').each(function(){ //loop through selectable players.
                var me = $(this),
                options = me.find('option');
                me.find('option:selected').removeAttr('selected'); //remove all selected items    

                options.each(function(){ //loop through and add selected if it matches
                    if($(this).val()==allPlayers[i][0]){
                        var meText = $(this).text(),
                        number = meText.substring(0,2),
                        name = meText.substring(4);
                        $(this).attr('selected','selected');
                        updatePlayer(this.parentNode.parentElement); 
                    };
                });
                i++;
            });
        }

        /*************************************
        *                Pages               *
        **************************************/
        if(document.location.pathname==="/spnewl_speler_training.php"){
            var selects = document.getElementsByTagName('select');
            Object.keys(selects).forEach(function(key) {
            var myself = selects[key][selects[key].selectedIndex];
            if(myself.className==="maxed"){
                selects[key].setAttribute("style","background: red; color: #FFF");
            }
            });
        }
    
        if(document.location.pathname==="/spnewl_game_selectie.php"){
            $('.pbutton a:first').after('<a class="button fittness" href="#">Pick Fittest Team</a>');
            $('.fittness').click(function(){
                updatefitestplayers();
            });
        }
        console.info('loaded');
    },1000)