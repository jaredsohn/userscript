// ==UserScript==
// @name       Oceanica Auto Play.
// @namespace  http://www.wtf.com/
// @version    1.0.1.1 beta
// @description  This version(v1.0.1) can only travel around first map('Ashmor 09')
// @match      http://www.oceanicaonline.com/main.php*
// @copyright  2012+, iamcmnut.
// ==/UserScript==

// the guts of this userscript

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
//ffff
// the guts of this userscript
function main() {
  //alert("There are " + $('td').length + " links on this page.");
    var sp = new Array();
    var location = new Array();
    var oceanicaMap = new Array();

    
    function run(){
        initializeData();
        createOceanicaBotMenu();
        refreshOceanicaBotMenu();
        setTimeout(startBot, 2000);
    }
    
    function startBot(){
        if(sessionStorage.oceanicaBot_isStart == 1)
            movingController();
    }
    // east = 0, west = 1, south = 2, north = 3
    function movingController(){
        if(sp['min']>=14){
            var allow = new Array();
            if(location['posX']<10 && (oceanicaMap[location['map']])[location['posY']][location['posX']+1]) allow[0] = true;
            if(location['posX']>1 && (oceanicaMap[location['map']])[location['posY']][location['posX']-1]) allow[1] = true;
            if(location['posY']>1 && (oceanicaMap[location['map']])[location['posY']+1][location['posX']]) allow[2] = true;
            if(location['posY']<10 && (oceanicaMap[location['map']])[location['posY']-1][location['posX']]) allow[3] = true;

            var rand = -1;
            do{
                rand = Math.floor((Math.random()*10))%4;            
            } while(!allow[rand]);
            switch(rand){
                case 0:moveToEast();break;
                case 1:moveToWest();break;
                case 2:moveToSouth();break;
                case 3:moveToNorth();break;
            }
        }
    }
    
    function moveToNorth(){
        document.location = '?move=1&dir=n';
    }
    
    function moveToEast(){
        document.location = '?move=1&dir=e';
    }
    
    function moveToWest(){
        document.location = '?move=1&dir=w';
    }
    
    function moveToSouth(){
        document.location = '?move=1&dir=s';
    }
    
    function getNorth(){
        return (oceanicaMap[location['map']])[location['posY']-1][location['posX']];
    }
    
    function getEast(){
        return (oceanicaMap[location['map']])[location['posY']][location['posX']+1];
    }
    
    function getSouth(){
        return (oceanicaMap[location['map']])[location['posY']][location['posX']-1];
    }
    
    function getWest(){
        return (oceanicaMap[location['map']])[location['posY']+1][location['posX']];
    }

    function getUserData(){
      sp['min'] = $('font').html().match(/[0-9]+/g)[0];
      sp['max'] = $('font').html().match(/[0-9]+/g)[1];
      location['map'] = $($('#sc1').find('b')[0]).html();
      location['posX'] = +($('div#sc1').find('table.normal').html().match(/[0-9]+ , [0-9]+/g)[0].match(/[0-9]+/g)[0])-1;
      location['posY'] = +($('div#sc1').find('table.normal').html().match(/[0-9]+ , [0-9]+/g)[0].match(/[0-9]+/g)[1])-1;
    }

    function createOceanicaBotMenu(){
        $('body').append("<div id=\'oceanicaBotMenu\' style=\'width=100%\'></div>");
        $('head').append("<link rel='stylesheet' href='http://code.jquery.com/ui/1.8.21/themes/base/jquery-ui.css' type='text/css' media='all' />");
        $('head').append("<link rel='stylesheet' href='http://jqueryui.com/themeroller/css/parseTheme.css.php?ctl=themeroller' type='text/css' media='all' />");
        $('head').append("<script src='http://code.jquery.com/ui/1.8.21/jquery-ui.min.js' type='text/javascript'></script>");

      
        //$('#oceanicaBotMenu').append("<span id='playerSP'></span>");
        //$('#oceanicaBotMenu').append("<select id='mapList'></select>");
        if(sessionStorage.oceanicaBot_isStart == null || sessionStorage.oceanicaBot_isStart == 0)
            $('#oceanicaBotMenu').append("<input id='playButton' value='Start Bot.' type='button'/>");
        else
            $('#oceanicaBotMenu').append("<input id='playButton' value='Stop Bot.' type='button'/>");
        
        
        
        $('#playButton').click(function(){
            if(sessionStorage.oceanicaBot_isStart == 1){
                sessionStorage.oceanicaBot_isStart = 0;
                $('#playButton').attr('value', 'Start Bot.');
            }
            else {
                sessionStorage.oceanicaBot_isStart = 1;
                $('#playButton').attr('value', 'Stop Bot.');
                startBot();
            }
                
        });
        for(key in oceanicaMap){
            $('#mapList').append("<option id='" + key + "'>" + key + "</option>");
        }
    }

    function refreshOceanicaBotMenu(){
      getUserData();
      $('#playerSP').append('Go to: ');
    }

    function initializeData(){
        
        if(sessionStorage.oceanicaBot_isStart == null)
            sessionStorage.oceanicaBot_isStart = 0;
      
        oceanicaMap['Ashmor 09'] = [[ 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                                    [ 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
                                    [ 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
                                    [ 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

        oceanicaMap['Ashmor 10'] = [[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    }

    run();
}



// load jQuery and execute the main function
addJQuery(main);