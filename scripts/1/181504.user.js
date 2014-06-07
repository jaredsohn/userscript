// ==UserScript==
// @name       OgameHelper =)
// @version    0.2.2
// @description  enter something useful
// @include    http://*.ogame.gameforge.*/game/index.php?*page=*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @copyright  2012+, Wizz_Kid
// ==/UserScript==
(function (window, undefined) { 
    var w =(typeof unsafeWindow != undefined) ? unsafeWindow :  window;
    var $ = jQuery //= w.jQuery;
    if (w.self != w.top ) { return; }
    if ( !$ ){ return; }
    
    var document = w.document;
    var localStorage = w.localStorage;
    var url = document.location.href;    
    var page = gup('page');
    var ships = {'204': [3000,1000,0],'205': [6000,4000,0],'206': [20000,7000,2000],'207': [45000,15000,0],
                 '215': [30000,40000,15000],'211': [50000,25000,15000],'213': [60000,50000,15000],'214': [5000000,4000000,1000000],
                 '202': [2000,2000,0],'203': [6000,6000,0],'208': [10000,20000,10000],'209': [10000,6000,2000],'210': [0,1000,0],'212': [0,2000,500] }
    var defense = {'401': [2000,0,0],'402': [1500,500,0],'403': [6000,2000],'404': [20000,15000,2000],'405': [2000,6000,0],'406': [50000,50000,30000],'407': [10000,10000,0],'408': [50000,50000,0],'502': [8000,0,2000],'503': [12500,2500,10000]}
    var planetid = getMetaContent('ogame-planet-id')
    var planetname = getMetaContent('ogame-planet-name');
    var planettype = getMetaContent('ogame-planet-type');
    var coords = getMetaContent('ogame-planet-coordinates');
    var currentplanet = { planetid : { 'name': planetname,'coords': coords, 'type': planettype}}
    infostr = '{"name":"' + planetname + '", "coords":"'+ coords + '", "type":"'+ planettype +'", "id":"'+ planetid +'"}'
    var planetinfo = JSON.parse( GM_getValue("planetinfo",'{}') ); 
    /*resources */
   var resource = [getResource('metal'), getResource('crystal'), getResource('deuterium')]
 
	/* Building names*/
   var Bnames = {'Buildings':{'1':'Metal Mine','2':'Crystal Mine','3':'Deuterium Synthesizer','4':'Solar Plant','22':'Metal Storage','23':'Crystal Storage','24':'Deuterium Tank','25':'Shielded Metal Den','26':'Underground Crystal Den','27':'Seabed Deuterium Den'},'Facillities':{'12':'Fusion Reactor','14':'Robotics Factory','15':'Nanite Factory','21':'Shipyard','31':'Research Lab','33':'Terraformer','34':'Alliance Depot','41':'Lunar Base','42':'Sensor Phalanx','43':'Jump Gate','44':'Missle Silo'},'Research':{'106':'Espionage Technology','108':'Computer Technology','109':'Weapons Technology','110':'Shielding Technology','111':'Amour Technology','113':'Energy Technology','114':'Hyperspace Technology','115':'Combustion Drive','117':'Impuls Drive','118':'Hyperspace Drive','120':'Laser Technology','121':'Ion Technology','122':'Plasma Technology','123':'Research Network','124':'Astrophysics','199':'Graviton Technology'},'Fleet':{'202':'Small Cargo','203':'Large Cargo','204':'Light Fighter','205':'Heavy Fighter','206':'Cruiser','207':'Battleship','208':'Colony Ship','209':'Recycler','210':'Espionage probe','211':'Bomber','212':'Solar Satellite','213':'Destroyer','214':'Deathstar','215':'Battlecruiser'},'Defence':{'502':'Anti-Ballistic Missles','503':'Interplanetary Missles','401':'Rocket Launcher','402':'Light Laser','403':'Heavy Laser','404':'Gauss Cannon','405':'Ion Cannon','406':'Plasma Turrent','407':'Small Shield Dome','408':'Large Shield Dome'}}
 
   if(GM_getValue('installed',0)!=1){
       tmp = {}
            $('.smallplanet').each(function(i){
            splanetid = $(this).attr('id').replace('planet-','')
            splanetcoord = $(this).find('.planet-koords').text()
            splanetname = $(this).find('.planet-name').text()
            tmp[i] = {"name": splanetname, "coords": splanetcoord, "type": "planet", "id": splanetid}
            
        })
     $.extend(true,planetinfo,tmp)
     console.debug(planetinfo);
     GM_setValue('installed',0)
     saveinfo(planetinfo);
   }
   
   /* Add button to menu */
    $('#menuTable li:nth-child(4)').html('<li><span class="menu_icon"><a href="javascript:void(0)" class="overlay tooltipRight js_hideTipOnMobile" target="_blank" title="" id="empire"><div class="menuImage empire"></div></a></span><a class="menubutton " href="javascript:void(0)" accesskey="" target="_self"><span class="textlabel">Empire</span></a></li>')
    $(document).ready(function () {
 
        $('#menuTable li:nth-child(4)').click(function(){
            css = '<style type="text/css">a,abbr,acronym,address,applet,big,blockquote,body,caption,cite,code,dd,del,dfn,div,dl,dt,em,fieldset,font,form,h1,h2,h3,h4,h5,h6,html,iframe,img,ins,kbd,label,legend,li,object,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,ul,var{margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit}'
            css += 'body { background: #000 url("http://gf2.geo.gfsrv.net/cdn4a/3bded776b9088c427d7d4567a3f9a6.png") no-repeat 50% 0;}'
            css += 'table { color: #fff }'
            css += '.improve { color: orange }'
            css += '.cat { background: #160F37; padding: 3px;}'
            css += '.row {padding: 3px; }'
            css += '</style>'
            html = css+'<table width="100%">'
            names = '<tr><td></td>'
            coords = '<tr><td></td>'
            planets = 1;
 		 $.each(planetinfo,function(){
                if(this.type=='planet'){
                    names += '<td>'+ this.name + '</td>'
                    coords += '<td>'+ this.coords +'</td>'
                    planets++;
               	}
            })
            names += '</tr>'
            coords += '</tr>'
            html += names+coords
            
            $.each(Bnames,function(catname,val){
                html += '<tr class="cat"><td colspan="'+ planets +'">'+ catname +'</td></tr>';
                $.each(val,function(key,val){
                var buildingid = key
                //console.debug(key);
                // console.debug(val);
                html += '<tr class="row '+ catname +'"><td>'+ val +'</td>';
                $.each(planetinfo,function(){
                     if(this.type=='planet'){
                         var level = (this[buildingid]!=undefined) ? this[buildingid] : 0;
                 		html += '<td>'+ level +'</td>'
                     }
            	})
                html +='</tr>'
                })
            })
   			var w = window.open('Empire', 'Empire', 'width=900,height=600,resizeable,scrollbars');
            $(w.document.head).append(css)
            
            w.document.write(html);
            w.document.close(); // needed for chrome and safari
    
        })
    })
    switch(page){
        case "shipyard":
            shipyardhelper();
            countlevels();
        break;
            
        case "defense":
            defencehelper();
            countlevels();
        break;
            
        case "resources":
            countlevels();
        break;
     
        case "research":
            countlevels();
        break;
            
        case "station":
            countlevels();
        break;     
    }
    function saveinfo(object){
        var string = JSON.stringify(object);
        GM_setValue("planetinfo",string)
    }
    
    function countlevels(){
        $('.level').each(function(){
          ref = $(this).parent().parent().attr('ref')
          newlevel = $(this).parent().parent().children('.eckeoben').text().match(/\d+/g)
          console.debug(newlevel)
          level = $(this).text().match(/\d+/g);
          console.debug(Bnames[ref]+': '+ level);
            if(page!='research'){
                if(newlevel){
                	level = level +' <span class="improve">(' +newlevel[0] +')</span>'
                }
                planetinfo[planetIndex()][ref] = level
            }
            else
            {
                $.each(planetinfo,function(i){
                  planetinfo[i][ref] = level  
                })
            }
        })
    	 saveinfo(planetinfo);
    }
    function defencehelper(){
        $(".detail_button").each(function(){
            
            canbuild = "on" //$(this).parent().parent().parent().attr('class')
            buildid = $(this).attr('ref');
            if(canbuild=="on"){
                var labelStyle  = "position: relative; color: #fff; float: right; top: 37px;  width: 52px; padding-right: 10px; font-size: 11px; text-align: right; background-color:rgba(18, 23, 28, 0.8);";
                var minus = []
                $.each(defense[buildid],function(i){
                  var amount = Math.floor(resource[i]/ this)
                  minus.push(amount)
                })
                var min =  Math.min.apply(null, minus)//Math.mini.apply(Math, minus);
                 $(this).append( $("<span/>").addClass("Ogamehelper").text(min).attr("style", labelStyle) );
                	
                
            }
            /* Save the amount of defence */
        })
       /* setInterval(ShipYardDetail,1500);*/
        $('.detail_button').click(function(){
          	console.debug('blaat');  
            setTimeout(ShipYardDetail,200)
        })
    
    }
    function shipyardhelper(){
        $(".detail_button").each(function(){
            canbuild = "on"// $(this).parent().parent().parent().attr('class')
            buildid = $(this).attr('ref');
            if(canbuild=="on"){
                var labelStyle  = "position: relative; color: #fff; float: right; top: 52px;  width: 52px; padding-right: 10px; font-size: 11px; text-align: right; background-color:rgba(18, 23, 28, 0.8);";
                var minus = []
                $.each(ships[buildid],function(i){
                  var amount = Math.floor(resource[i]/ this)
                  minus.push(amount)
                })
                 var min =  Math.min.apply(null, minus)
                //console.debug(min);
                 $(this).append( $("<span/>").addClass("Ogamehelper").text(min).attr("style", labelStyle) );
                	
                
            }
        })
       /* setInterval(ShipYardDetail,1500);*/
        $('.detail_button').click(function(){
          	console.debug('blaat');  
            setTimeout(ShipYardDetail,200)
        })
    
    }
    function ShipYardDetail(){
        if($('.enter').text().length > 0){
            $.extend(ships, defense);
            buildid = $("input[name='type']").val()
             var minus = []
             $.each(ships[buildid],function(i){
                 if(this != 0){
                      var amount = Math.floor(resource[i]/this)
                  	  minus.push(amount)
                 }
            })
            console.debug(minus);
            var min =  Math.min.apply(null, minus)
            $('#action').css('margin-top','12px');
            $('.enter > p').append('<a href="javascript:void(0);" onclick="javascript:document.getElementById(\'number\').value = '+ min +'" style="color: #fff;"> Max: '+min+'</a>')
           
        }
        
    }
    function gup( name )
    {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
      if( results == null )
        return "";
      else
        return results[1];
    }
    function sortObject(obj) {
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    'key': prop,
                    'value': obj[prop]
                });
            }
        }
        arr.sort(function(a, b) { return a.value - b.value; });
        //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
        return arr; // returns array
    }    
    function getMetaContent(name) { 
		var metas = document.getElementsByTagName('meta'); 
        for (var i = 0; i < metas.length; i++) { 
            if (metas[i].getAttribute("name") == name) { 
                return metas[i].getAttribute("content"); 
            } 
        } 
        return "";
    } 
    function planetIndex(){
 	   var active = $('.ago_planets_active_planet').index()
       return active
    }
    
    
    function getResource(resource){
        return $('#resources_'+resource).text().replace(/(\d+).(?=\d{3}(\D|$))/g, "$1");
    }
 /*   Array.prototype.mini = function() {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
    return min;
    }*/
})(window);