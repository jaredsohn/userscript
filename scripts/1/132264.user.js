// ==UserScript==
// @name            [LEG-X] Legio Zone
// @autor           genes
// @contact         rogelio.meza.t(at)gmail(dot)com	
// @description     Script for Ikariam. Add a letter for player's legion.
// @include         http://s2.cl.ikariam.*/index.php?view=embassy*
// @include         http://s2.cl.ikariam.*/index.php?view=diplomacyAdvisorAlly&listAllyMembers=1
// @version         1.1
// @exclude         http://board.ikariam.*/*
// @exclude         http://support*.ikariam.*/*
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


LEG_X = function(){

    this.memberList = function(){
        return members = $('#memberList').find('tbody').find('tr');
    };
    
    this.addSymbol = function(){
        var members = this.memberList();
        
        var north = ['Hermanowar', 'centauro1254', '-Escipión-', 'Wild_Heart', 'Tercetum', 'Stange', 'ovayerba', 'pepecuervo', 'JuACo', 'LESO', 'impoz', 'angelus', 'alwilda'];
        var south = ['genes', 'Ziva', 'Princess', 'Seti-Sabuji', 'Mathayus', 'Ikabod', 'Tersos', 'Orion', 'Sirk', 'romarba', 'Serghinno', 'Vikingo', 'crxzado', 'Ambroce'];
        var east = ['Melkor', 'John Deere', 'ZATO', 'miguzmi', 'betelgueus', 'Mariscal Rommel', 'BUCEFALO', 'Arkantos', 'Maldito666'];
        var west = ['Maximus Decimus', 'Basper', 'Beautiful', 'sinexar', 'NANITO', 'Witthy', 'Sandokan', 'NeGGrO', 'okruger trajano', 'Tu padre', 'LEGIONARIO', 'ss-truppen' ,'szr_53', 'angelbestial', 'mariadelmar', 'habiier', 'Iceshot', 'RonMetal', 'Baranco', 'Gardar', 'eclib', 'bilce', 'KaTo', 'Sköll'];
        
        
        $(members).each(function(){
            var playerName = $(this).find('td:nth-child(2)').text();
            
            if(jQuery.inArray(playerName, north) != -1){
                appText = ' [N]';
            }
            else if(jQuery.inArray(playerName, south) != -1){
                appText = ' [S]';
            }
            else if(jQuery.inArray(playerName, east) != -1){
                appText = ' [E]';
            }
            else if(jQuery.inArray(playerName, west) != -1){
                appText = ' [O]';
            }
            else {
                appText = ' [-]';
            }
            
            $(this).find('td:nth-child(2)').text(playerName + appText);
            
            //alert( playerName );
            
        });
    };
};

var leg = new LEG_X();
leg.addSymbol();
