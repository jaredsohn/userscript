// ==UserScript==
// @name           AM_Tools_Light
// @namespace      AM_Tools
// @include        http://cockpit.airlines-manager.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js
// @require        http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js
// @version        0.1.0.0
// ==/UserScript==

var ID = 'AMV2TOOLS_';
var JQUERY_UI_THEME = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/redmond/jquery-ui.css';
var FONT = 'Keania One';

var TIMEOUT_GET_PAGE = 1000;

additionalTime = {"boardingTime":1200,"landingTime":1200,"transitionTime":2400};

var am2_planes = [];
var my_lines   = [];

var planes     = [];
var lines      = [];


(function () {
    
    var REGEX_PAGE_MASK = [
        {page:'Gestion Tarif',regex:/marketing\/pricing\/[0-9]+$/,callback:displayPriceManagmentPage}
    ];
    
    String.prototype.cleanText = function(){return this.trim().replace(/[\n\r]/g,'').replace(/\s\s+/g,' ');};
    String.prototype.cleanTextForInt = function(){return this.trim().replace(/[\n\r]/g,'').replace(/\s\s+/g,' ').replace(/\$/,'').replace(/%/,'').replace(/ /g,'');};
    
    /************************/
    /***** Various Func  ****/
    /************************/
    function loadFont(font) 
    {
        var    head = document.getElementsByTagName('head')[0],link = document.createElement('link');
        
        link.rel  = 'stylesheet';
        link.href = 'http://fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
        head.appendChild(link);
    }
    
    function addStyle(style) 
    {
        var head = document.getElementsByTagName("HEAD")[0];
        var ele = head.appendChild(window.document.createElement('style'));
        ele.innerHTML = style;
        return ele;
    }
    
    /************************/
    /******** From AM  ******/
    /************************/
    function toHour(duration)
    {

        var hours = Math.floor(duration / 3600),minutes = Math.floor((duration % 3600) / 60);

        if(minutes < 10){
            minutes = '0' + minutes;
        }

        return hours + 'h' + minutes;
    }
    
    function getFormattedDuration(distance, aircraftSpeed, additionalTimeInQuarter)
    {
        // Fois 8 car on transforme des heures en quart-heure et il s'agit d'un aller retour
		var flyingTime = Math.ceil((distance / aircraftSpeed) * 8);
		flyingTime += additionalTimeInQuarter;
		return toHour(flyingTime*900);
	}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
	/***********************/
    /*****  PRICE PAGE  ****/
    /***********************/
	
	function displayPriceManagmentPageLineSetup()
    {
    	var lbl = ['Economique','Business','Première'], aaData = [];
    	if ( $('.dashMachine').length == 0 ) {
        	console.log('Sans audit le module marche moins bien');
            return;
		}
        
        if ( $('#'+ID+'lineOptimizer table').length > 0 ) {return;}
        
        var laligne;
        $.each(my_lines,function(i,n){
        	if ( n.id == document.location.href.match(/marketing\/pricing\/([0-9]*)$/)[1] ) {
            	laligne = n;
			}
        });
        
        var ca_max=0,audit = [];
        $.each(lbl,function(i,n){
        	audit.push({
            	price:parseInt($('.box1 .priceBox:eq('+i+') .price b').text().replace(/\$/,'').replace(/ /g,''),10),
                demande:parseInt($('.box1 .priceBox:eq('+i+') .demand b').text().replace(/\$/,'').replace(/ /g,''),10)
            });
            ca_max += audit[audit.length-1].price*audit[audit.length-1].demande;
        });
        
        $('#'+ID+'lineOptimizer').append('<table />');
        
        $('#'+ID+'lineOptimizer table:first').append('<tr><th colspan="2"></th><th width="50">Eco</th><th width="50">Biz</th><th width="50">First</th><th width="100">&nbsp;</th></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr id="audit_demande"><td width="150">Demande</td><td width="40"></td><td>'+audit[0].demande+'</td><td>'+audit[1].demande+'</td><td>'+audit[2].demande+'</td><td></td></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr id="audit_price"><td>Tarif </td><td></td><td>'+audit[0].price+'</td><td>'+audit[1].price+'</td><td>'+audit[2].price+'</td><td></td></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr><td>CA Max</td><td></td><td></td><td></td><td></td><td>'+ca_max.toLocaleString()+'</td></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr><td>Total sièges</td><td></td><td>'+(audit[0].demande/2)+'</td><td>'+(audit[1].demande/2)+'</td><td>'+(audit[2].demande/2)+'</td><td></td></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr><td>Nombre de rotations : </td><td><input type="text" id="'+ID+'optimLine_Flights" value="1""/></td><td colspan="4" rowspan="2"></td></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr><td>Nombre d\'avions : </td><td><input type="text" id="'+ID+'optimLine_Planes" value="1"/></td></tr>');
        $('#'+ID+'lineOptimizer table:first').append('<tr><td>Eq sièges</td><td></td><td>'+(audit[0].demande/2)+'</td><td>'+(audit[1].demande/2)+'</td><td>'+(audit[2].demande/2)+'</td><td></td></tr>');
        $('#'+ID+'lineOptimizer table:first th').css('text-align','center');
        $('#'+ID+'lineOptimizer table:first tr').css('height','25px');
        $('#'+ID+'lineOptimizer table:first td').css('vertical-align','middle');
        $('#'+ID+'optimLine_Flights,#'+ID+'optimLine_Planes').css('width','25px').spinner({stop:function(){
        	$('#'+ID+'lineOptimizer table:first tr:last')
            	.find('td:eq(2)').text(Math.ceil((audit[0].demande/2)/$('#'+ID+'optimLine_Flights').val()/$('#'+ID+'optimLine_Planes').val())).end()
                .find('td:eq(3)').text(Math.ceil((audit[1].demande/2)/$('#'+ID+'optimLine_Flights').val()/$('#'+ID+'optimLine_Planes').val())).end()
                .find('td:eq(4)').text(Math.ceil((audit[2].demande/2)/$('#'+ID+'optimLine_Flights').val()/$('#'+ID+'optimLine_Planes').val())).end();

        }});
        
        
        $('#'+ID+'lineOptimizer').append('<div><h3>Ajouter les avions</h3><table id="'+ID+'addplanes" /><div><select /><button /><br/><select ><option value="0">Avions disponibles</option><option value="1">Tous les avions</option></select></div></div>');
        $('#'+ID+'addplanes').append('<tr><th colspan="3">Demande restante : </th><th>'+audit[0].demande+'</th><th>'+audit[1].demande+'</th><th>'+audit[2].demande+'</th><th colspan="2">CA perdu:<span>'+ca_max.toLocaleString()+'</span></th></li>').find('tr').hide();
        $('#'+ID+'lineOptimizer > div:last').find('button').button({label:'Ajouter'}).click(function(){
            if ( $('#'+ID+'lineOptimizer div:last select').val() == '' ) {return false;}
            if ( $('#'+ID+'addplanes tr[class="headline"]').length == 0 ){
            	$('#'+ID+'addplanes').append('<tr class="headline"><th>Name</th><th>Nb</th><th>Rotations</th><th>Eco</th><th>Biz</th><th>First</th><th>C.A.</th><th>&nbsp;</th></tr>');
                $('#'+ID+'addplanes tr[class="headline"] th:eq(0)').css('width','155px');
                $('#'+ID+'addplanes tr[class="headline"] th:eq(6)').css('width','65px');
            }
            $('#'+ID+'addplanes tr:lt(2)').show();
            var plane = am2_planes[parseInt($('#'+ID+'lineOptimizer > div:last select').val(),10)];
        	$('#'+ID+'addplanes').append('<tr><td>'+plane.brand+' '+plane.model+'</td><td><input type="text" value="1" /></td><td><input name="rotation" value="1" /></td><td><input class="tospin" name="eco" value="0" /></td><td><input class="tospin" name="bus" value="0" /></td><td><input class="tospin" name="fst" value="0" /></td><td><span class="'+ID+'ca">0</span><input type="hidden" value="'+$('#'+ID+'lineOptimizer > div:last select').val()+'"/></td><td><button/></td></tr>');
            $('#'+ID+'addplanes tr:last button').button({label:'Enlever',text:false,icons:{primary:'ui-icon-minusthick'}}).click(function(){
				$(this).parents('tr').remove();
                displayPriceUpdate();
                if ( $('#'+ID+'addplanes tr').length == 2 ) {
                    $('#'+ID+'addplanes tr:lt(2)').hide();
                }
            });
            $('#'+ID+'addplanes tr:last input:lt(5)').css({width:'20px',textAlign:'right'}).spinner({
                spin:function(ev,ui){
                	
                    if ( !$(this).hasClass('tospin') ) {
                        if ( ui.value <= 0 ) {return false;} 
                        if ($(this).attr('name') == 'rotation') {
                            var plane=am2_planes[parseInt($(this).parents('tr').find('input:last').val(),10)];
                            var flyingTime = Math.ceil((laligne.distance / plane.speed) * 8);
                            flyingTime += Math.ceil((additionalTime.boardingTime+additionalTime.landingTime+additionalTime.transitionTime+additionalTime.boardingTime+additionalTime.landingTime)/900);
                            if ( parseInt(ui.value)*60*flyingTime/4 > 24*60 ) {console.log('Temps de vol trop long pour une journée');return false;}
                        }
                        return;}
                    if ( ui.value < 0 ) {return false;}
                    var pax_eco=0,pax_bus=0,pax_fst=0,plane=am2_planes[parseInt($(this).parents('tr').find('input:last').val(),10)];
                    
                    if ( $(this).attr('name') == 'eco' ) { pax_eco = ui.value; }
                    else {pax_eco = parseInt($(this).parents('tr').find('input[name="eco"]').val(),10);}
                    
                    if ( $(this).attr('name') == 'bus' ) { pax_bus = ui.value; }
                    else{pax_bus = parseInt($(this).parents('tr').find('input[name="bus"]').val(),10);}
                    
                    if ( $(this).attr('name') == 'fst' ) { pax_fst = ui.value; }
                    else{pax_fst = parseInt($(this).parents('tr').find('input[name="fst"]').val(),10);}

                    if ( pax_eco+(1.8*pax_bus)+(4.2*pax_fst) > plane.pass ) {return false;}                
                },	
				stop:function(ev,ui){
                	var pax_eco=0,pax_bus=0,pax_fst=0,nb_rotations=0,nb_planes=0;
                    
                    nb_planes = parseInt($(this).parents('tr').find('input:first').val(),10);
                    nb_rotations = parseInt($(this).parents('tr').find('input[name="rotation"]').val(),10);
                    pax_eco = parseInt($(this).parents('tr').find('input[name="eco"]').val(),10);
                    pax_bus = parseInt($(this).parents('tr').find('input[name="bus"]').val(),10);
                    pax_fst = parseInt($(this).parents('tr').find('input[name="fst"]').val(),10);
                    
                    if ( pax_eco*nb_rotations*nb_planes*2 >= parseInt($('#audit_demande td:eq(2)').text(),10) ) {pax_eco = Math.floor(parseInt($('#audit_demande td:eq(2)').text(),10)/(2*nb_rotations*nb_planes));}
                    if ( pax_bus*nb_rotations*nb_planes*2 >= parseInt($('#audit_demande td:eq(3)').text(),10) ) {pax_bus = Math.floor(parseInt($('#audit_demande td:eq(3)').text(),10)/(2*nb_rotations*nb_planes));}
                    if ( pax_fst*nb_rotations*nb_planes*2 >= parseInt($('#audit_demande td:eq(4)').text(),10) ) {pax_fst = Math.floor(parseInt($('#audit_demande td:eq(4)').text(),10)/(2*nb_rotations*nb_planes));}
                    console.log(pax_eco,pax_bus,pax_fst);
                    $(this).parents('tr').find('.'+ID+'ca').text((2*(pax_eco*parseInt($('#audit_price td:eq(2)').text(),10)+pax_bus*parseInt($('#audit_price td:eq(3)').text(),10)+pax_fst*parseInt($('#audit_price td:eq(4)').text(),10))*nb_rotations*nb_planes).toLocaleString());
                
    	            displayPriceUpdate();
            }});
            $('#'+ID+'addplanes .tospin').css('width','40px');
            $('#'+ID+'addplanes tr:first').css({height:'40px',verticalAlign:'top'});
            $('#'+ID+'addplanes th').css('text-align','center');
            $('#'+ID+'addplanes td').css({verticalAlign:'middle'});
            
            $('#'+ID+'lineOptimizer div:last select').val('');
        });

        
        $('#'+ID+'lineOptimizer > div:last select:first').parent().css({marginTop:'25px'}).end().append('<option />');
        $('#'+ID+'lineOptimizer > div:last select:last').css({marginLeft:'50px'}).change(function(i,n){
        	$('#'+ID+'lineOptimizer > div:last select:first option:gt(0)').remove();
            $.each(am2_planes,function(i,n){
                if ( n.range < laligne.distance ) { return; }
                
                if ( $('#'+ID+'lineOptimizer > div:last select:last').val() == 0 && n.enable == false ) { return;}
                $('#'+ID+'lineOptimizer > div:last select:first').append('<option class="'+ID+'option_'+n.type+'" value="'+i+'">'+ n.brand+' '+n.model+' ('+n.pass+' pl. / '+n.speed+' Km/h)</option>');
            });
        }).trigger('change');
   
    }

    function displayPriceUpdate()
    {
        var offre_eco=0,offre_bus=0,offre_fst=0,nb_rotation=0;
        
        $('#'+ID+'addplanes tr:gt(1)').each(function(i,n){
        	var nb_planes = parseInt($(n).find('input:first').val()), nb_rotations = 2*parseInt($(n).find('input[name="rotation"]').val());
            
            offre_eco+=nb_rotations*parseInt($(n).find('input[name="eco"]').val()*nb_planes);
            offre_bus+=nb_rotations*parseInt($(n).find('input[name="bus"]').val()*nb_planes);
            offre_fst+=nb_rotations*parseInt($(n).find('input[name="fst"]').val()*nb_planes);
        });
        
        /*Demande restante*/
        var offre_rest_eco = parseInt($('#audit_demande td:eq(2)').text())-offre_eco;
        var offre_rest_bus = parseInt($('#audit_demande td:eq(3)').text())-offre_bus;
        var offre_rest_fst = parseInt($('#audit_demande td:eq(4)').text())-offre_fst;
        
        $('#'+ID+'addplanes tr:eq(0) th').removeClass(ID+'redtxt');
        $('#'+ID+'addplanes tr:eq(0) th:eq(1)').text(offre_rest_eco.toLocaleString());
        if ( offre_rest_eco < 0 ){$('#'+ID+'addplanes tr:eq(0) th:eq(1)').addClass(ID+'redtxt');}
        $('#'+ID+'addplanes tr:eq(0) th:eq(2)').text(offre_rest_bus.toLocaleString());
        if ( offre_rest_bus < 0 ){$('#'+ID+'addplanes tr:eq(0) th:eq(2)').addClass(ID+'redtxt');}
        $('#'+ID+'addplanes tr:eq(0) th:eq(3)').text(offre_rest_fst.toLocaleString());
        if ( offre_rest_fst < 0 ){$('#'+ID+'addplanes tr:eq(0) th:eq(3)').addClass(ID+'redtxt');}
        ca_lost = ((offre_rest_eco<0?0:offre_rest_eco)*parseInt($('#audit_price td:eq(2)').text(),10))+((offre_rest_bus<0?0:offre_rest_bus)*parseInt($('#audit_price td:eq(3)').text(),10))+((offre_rest_fst<0?0:offre_rest_fst)*parseInt($('#audit_price td:eq(4)').text(),10));
        
        $('#'+ID+'addplanes tr:eq(0) th:last span').text(ca_lost.toLocaleString());
    }

    function displayPriceManagmentPage()
	{
        $('body').append('<div id="'+ID+'lineOptimizer"></div><div id="'+ID+'lineOptimizerLink">Optimiseur de ligne</div>');
        $('#'+ID+'lineOptimizerLink').click(function(i,n){
            show = true;
            if ( parseInt($('#'+ID+'lineOptimizer').css('left'))!=$('body').width() ) {
                show = false;
			}
            $('#'+ID+'lineOptimizer').animate({left:(show==false?'100%':'-=751px')},800,(show?'easeOutCubic':'easeOutBounce')).toggleClass(ID+'optiomShadow');
            $('#'+ID+'lineOptimizerLink').animate({left:(show==false?'99%':'-=750px')},800,(show?'easeOutCubic':'easeOutBounce'));
            if ( show ){
            	displayPriceManagmentPageLineSetup();
			}
        });
        
    }

	/********************************/
    /** Load Content in async mode **/
    /********************************/    
    function loadPlanes(p)
	{
        var pages = [
        	'/aircraft/buy/new/0/short',
            '/aircraft/buy/new/0/middle',
            '/aircraft/buy/new/0/long'
        ];
        console.log('Loading planes....');
        $.ajax({
        	url:pages[p],
            success:function(response){
                var source = $.parseHTML(response);
                $(source[25]).find('.aircraftPurchaseBox').each(function(i,n){
                    /*id,speed,category,range*/
                    var infos = $.parseJSON($(this).find('.aircraftJson').text());
                    var label = $(this).find('.title span:first').text().trim().replace(/[\n\r]/g,'').replace(/\s\s+/g,' ').match(/(.*) \/ (.*)/);
                    
                    am2_planes.push($.extend(infos,{
                        enable : !$(this).hasClass('disabled-research'),
                        model  : label[1],
                        brand  : label[2],
                        img    : $(this).find('.aircraftPicture img').attr('src'),
                        date   : parseInt($(this).find('.aircraftInfo ul:first li:eq(0) b').text().trim().replace(/%/,'').replace(/ /g,''),10),
                        conso  : parseFloat($(this).find('.aircraftInfo ul:first li:eq(2) b').text().trim().replace(/%/,'').replace(/ /g,'')),
                        pass   : parseInt($(this).find('.aircraftInfo ul:last li:eq(0) b').text().trim(),10),
                        price  : parseInt($(this).find('input.aircraftPrice').val(),10),
                        type   : (p==0?'CC':(p==1?'MC':'LC'))
                    }));
                    
                });
                if ( p < pages.length-1 ) {
                	loadPlanes(p+1);
				}
                else{
                    GM_setValue('am2Planes',am2_planes);
                }
            }
        });
	}
	
	function loadMyLines()
	{
        my_lines = [];
        $.ajax({
        	url:'/aircraft/buy/new/0/saab',
            success:function(response){
                var source = $.parseHTML(response);
                var am_lines = $.parseJSON($(source[25]).find('#lineListJson').text());
                $.each(am_lines,function(i,n){
                    my_lines.push($.extend(n,{fetchDate:new Date().getTime()}));
                });
                
				GM_setValue('myLines',my_lines);
            }
        });
	}

    /*******************************/
    /*** Modification des pages  ***/
    /*******************************/    
    function makePageUpgrade()
    {
        $.each(REGEX_PAGE_MASK,function(i,n){
            if ( document.location.href.match(n.regex) ) {
                console.log(n.page);
                n.callback();
                return false;
            }
        });

    }

    function addWatermark()
    {
        $('#mainProfile').append('<div id="'+ID+'watermark">Modified with AMTools</div>');
    }

    function addCss()
    {
        GM_addStyle('hr.spacer{height:1px;visibility:hidden;width:100%;clear:both;}');
        
        GM_addStyle('#'+ID+'watermark{font-family:Margarine,cursive;font-size:larger;font-style:italic;font-weight:800;color:white;text-shadow: 0.2em 0.2em 0.2em #333;top:124px;right: 469px;position:absolute}');
        
        GM_addStyle('#'+ID+'aircraftListView .BtnDetailAvion{position: relative;display: inline-block;width: 135px;height: 37.5px;background: url(\'/images/interface/bt_detail-avion.png\') 0 0 no-repeat;z-index: 1;text-decoration: none;float:right;}#'+ID+'aircraftListView .BtnDetailAvion:active{background-position: 0 -37.5px;}');
        
        GM_addStyle('.'+ID+'option_CC{background-color:rgb(123, 220, 248)}.'+ID+'option_MC{background-color:rgb(123, 178, 248)}.'+ID+'option_LC{background-color:rgb(135, 125, 250)}');
        
        GM_addStyle('#'+ID+'lineOptimizer{width:750px;min-height:500px;position:fixed;top:30%;left:100%;right:-751px;border:1px solid white;border-right:0px;background-color:rgb(202, 197, 197);z-index:50000000;border-radius: 5px 0 0 5px;}');
        GM_addStyle('#'+ID+'lineOptimizerLink{margin-top:322px;border-radius:5px 5px 0 0;cursor:pointer;width:120px;text-align:center;position:fixed;left:99%;top:30%;-webkit-transform: rotate(-90deg);-webkit-transform-origin: top left;background-color:rgb(24, 110, 189);color:white;font-family:arial, FreeSans, Helvetica, sans-serif,cursive;border:2px solid white;font-weight: bold;-webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);}');
        
        GM_addStyle('#'+ID+'priceOptimizer{width:750px;min-height:150px;position:fixed;top:30%;left:-751px;border:1px solid white;border-left:0px;background-color:rgb(202, 197, 197);z-index:50000000;border-radius: 0 5px 5px 0;}');
        GM_addStyle('#'+ID+'priceOptimizerLink{margin-top:138px;border-radius:0 0 5px 5px;cursor:pointer;width:120px;text-align:center;position:fixed;left:0;top:30%;-webkit-transform: rotate(-90deg);-webkit-transform-origin: top left;background-color:rgb(24, 110, 189);color:white;font-family:arial, FreeSans, Helvetica, sans-serif,cursive;border:2px solid white;font-weight: bold;-webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);}');
        GM_addStyle('#'+ID+'priceOptimizerEvolCa{}.'+ID+'greentxt{color:rgb(43, 139, 12);}.'+ID+'redtxt{color:rgb(226, 16, 16);}');
        GM_addStyle('.'+ID+'optiomShadow{-webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);}');
        GM_addStyle('#'+ID+'priceOptimizerActions p{float:left;width:20%;margin:2px 0 0 10px;font-weight:800;}#'+ID+'priceOptimizerActions p:last-of-type{margin-top: 6px;}');
        
        GM_addStyle('#'+ID+'lineOptimizer table:first-child{border:1px solid black;border-collapse;collapse}#'+ID+'lineOptimizer table:first-child td{border:1px solid black}');
    }

    function init()
    {
        loadFont({ family:FONT, style:['400','700'] });
        loadFont({ family:'Margarine', style:['400','700'] });
        addCss();
        addWatermark();
        
        am2_planes = GM_getValue('am2Planes',am2_planes);
        if ( am2_planes.length == 0 ) {
            loadPlanes(0);
		}
        
        my_lines = GM_getValue('myLines',my_lines);
        if ( my_lines.length == 0 || my_lines[0].fetchDate < new Date(new Date().setDate((new Date().getDate())-1)).getTime() ) {
            loadMyLines();
		}
        
        makePageUpgrade();
    }

    addStyle('@import "'+JQUERY_UI_THEME+'";');
    init();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
})();
