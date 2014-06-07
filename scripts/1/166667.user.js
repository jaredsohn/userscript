// ==UserScript==
// @name					autofight
// @namespace			localhost
// @version				0.0.1f
// @description		autofight
// @include				http://*.e-sim.org/*
// @match					http://*.e-sim.org/*
// @grant					all
// @icon					http://e-sim.home.pl/eworld/img/favicon.png
// ==/UserScript==

var main = function () {
	
	// CONSTANTS
  var URLBattle			=					"e-sim.org/battle.html?id=";
  var URLMU					=					"e-sim.org/myMilitaryUnit.html";
  var URLMUStorage	=					"e-sim.org/donateProductsToMilitaryUnit.html?id=20";
  var URLMUMoney		=					"e-sim.org/donateMoneyToMilitaryUnit.html?id=20";
  var IMGPACKAGE		=					"http://e-sim.home.pl/testura/img/package.png";
  var IMGDOLLAR			=					"http://e-sim.home.pl/testura/img/dollar.png";
  
  var localUrl = new String( window.location );
  
  // VARS
  var currentServer = null;
  
  // Auto fight
  if( localUrl.indexOf( URLBattle, 0 ) >= 0 ) {
    changeFightResponse();
  }
    
  // Global code
  if( $( "form[action='login.html']" ).length == 0 ) { 
    //addGlobalStyle();
    addFastLinks();
    changeDailyTasks();
    insertConsole();
  }
  
  function insertConsole () {
		$( "#hiddenBackground" ).closest( "body" ).prepend( "<div id='console'></div>" );
		$( "#console" ).css({ "position" : "fixed",
													"height" : "20px",
													"background-color" : "rgba(255, 255, 255, 0.9)",
													"left" : "-1px",
													"top" : "-1px",
													"border" : "1px solid rgba(0, 0, 0, 0.9)",
													"z-index" : "2000",
													"width" : "100%" });
		var halfWidth =  $( "#console" ).css( "width" );
		halfWidth = Number( halfWidth.substr( 0, halfWidth.length-2) );
		halfWidth = (halfWidth/2)-500;
		$( "#console" ).append( "<table></table>" );
		$( "#console table" ).css({ "height" : "20px", "margin-left" : "auto",  "margin-right" : "auto", "width" : "990px", "vertical-align" : "middle" });
		$( "#console table" ).append("<tr></tr>");
		$( "#console table tr" ).append("<td id='console01' style='width: 50px'><b>CurState:</b></td>");
		$( "#console table tr" ).append("<td id='console02' style='width: 150px'></td>");
		$( "#console table tr" ).append("<td id='console03' style='width: 100px'></td>");
		$( "#console table tr" ).append("<td id='console04' style='width: 100px'></td>");
		$( "#console table tr" ).append("<td></td>");
		$( "#console table tr" ).append("<td id='console99' style='width: 150px; text-align: right'>Funny Bot-Master v0.0.1f</td>");
		
  }
  
  function changeFightResponse () {
  	
  	var style = " cursor: pointer; box-shadow: none; background: rgb(50,50,50); text-shadow: none; border: 1px solid rgb(255,255,255)' type='submit' name=";
    if ( $(".countdown_row").text().indexOf( "00:00:00" ) == -1 ) {
    	if ( $( "#showTutorial" ).text().indexOf( "You can't fight in this battle" ) == -1 ) {
      	var divBattleLocation = $( ".testDivwhite" ).find( "a[href^='region']" );
        var isRW = (divBattleLocation.parent().text().indexOf( "Resistance war", 0 ) > -1);
        var isRW = (divBattleLocation.parent().text().indexOf( "Civil war", 0 ) > -1);
        if( (divBattleLocation.parent().text().indexOf( "Resistance war", 0 ) > -1) || (divBattleLocation.parent().text().indexOf( "Civil war", 0 ) > -1) ) {
        	$("#showTutorial input:eq(0)").after("<input class='fightButtonMod' style='float: left;" + style + "'defender' value='Fight (1 hit)'>");
          $("#showTutorial input:eq(0)").remove();
          $("#showTutorial input:eq(1)").after("<input class='fightButtonMod' style='float: right;" + style + "'attacker' value='Fight (1 hit)'>");
          $("#showTutorial input:eq(1)").remove();
          $("#showTutorial input:eq(2)").after("<input class='fightButtonMod' style='float: left;" + style + "'defender' value='Berserk! (5 hits)'>");
          $("#showTutorial input:eq(2)").remove();
          $("#showTutorial input:eq(3)").after("<input class='fightButtonMod' style='float: right;" + style + "'attacker' value='Berserk! (5 hits)'>");
          $("#showTutorial input:eq(3)").remove();
        } else {
          	$("#showTutorial input:eq(0)").after("<input class='fightButtonMod' style='" + style + "'side' value='Fight (1 hit)'>");
            $("#showTutorial input:eq(0)").remove();
            $("#showTutorial input:eq(1)").after("<input class='fightButtonMod' style='" + style + "'side' value='Berserk! (5 hits)'>");
            $("#showTutorial input:eq(1)").remove();
        }
        
        $( "#showTutorial" ).find( "br:eq(7)" ).remove();
        $( "#battleRoundId" ).after( "<div style='display: table-cell; vertical-align: middle' id='checkBoxMod' ></div>" );
        $( "#checkBoxMod" ).append( "<hr class='littleDashedLine'>" );
        $( "#checkBoxMod" ).append( "[Q5 Food " );
        $( "#checkBoxMod" ).append( "<input id='useQ5food' type='checkbox' style='display: table-cell; vertical-align: middle; box-shadow: none' title='use Q5 food' value='q5food' checked>" );
        $( "#checkBoxMod" ).append( "] [Q5 Gift " );
        $( "#checkBoxMod" ).append( "<input id='useQ5gift' type='checkbox' style='display: table-cell; vertical-align: middle; box-shadow: none' title='use Q5 gifts' value='q5gift'>" );
        $( "#checkBoxMod" ).append( "] [Auto fight " );
        $( "#checkBoxMod" ).append( " <input id='autofight' type='checkbox' style='display: table-cell; vertical-align: middle; box-shadow: none' title='autofight' value='autofight' checked>" );
        $( "#checkBoxMod" ).append( "]" );
        $( "#checkBoxMod" ).append( "<hr class='littleDashedLine'>" );        

      }
    }
    
    $( ".fightButtonMod" ).hover(function () {
    	$( this ).css({ "box-shadow" : "0 0 5px rgba(0,0,0, 0.6)" });
    },
    function () {
    	$( this ).css({"box-shadow" : "none"});
    });

    $( ".fightButtonMod" ).click( function () {
    	var side = $( this )[0].name;
		  var value = $( this )[0].value;
      $( ".fightButtonMod" ).css({ "border" : "1px solid rgb(255, 255, 255)", "color" : "rgb(244, 238, 238)" });
      $( this ).css({ "border" : "1px solid rgb(148,194,249)", "color" : "rgb(148, 194, 249)" });
      
      if ( $( "#autofight:checked" ).length == 1 ) {
				repeatFight (side, value);    	
      } else {
      	autoEat();
      	sendFightRequestMod(side, value);
      }
			
      return false;
		});
		
		function autoEat () {
				var eat = 0;
				var HP = $( "#healthProgress" ).attr( "title" );
				var currentHP = Number( HP.substr(0, HP.length-8) );
				if ( currentHP < 50 ) {
					if ( ( $( "#useQ5food:checked" ).length == 1 ) && ( $( "#foodLimit" ).text() != 0 ) && ( $( "#q5FoodStorage" ).text() != "Q5 Food (0 left)" ) ) {
						$( "#q5FoodStorage" ).attr( "selected", "selected" );
						$( "#eatButton" ).click();
					} else {
						if ( ( $( "#useQ5gift:checked" ).length == 1 ) && ( $( "#giftLimit" ).text() != 0 ) && ( $( "#q5GiftStorage" ).text() != "Q5 Gift (0 left)" ) ) {
							$( "#q5GiftStorage" ).attr( "selected", "selected" );
							$( "#useGiftButton" ).click();
						} else {
							eat = 1;
							$( "#console02" ).html( "No health." );
						}
					}
				}
				return eat;
		}
		
		function repeatFight (side, value) {
			if ( autoEat() == 0 ) {
				sendFightRequestMod(side, value);
				var pause = getRandomInt(2000, 5000);
				setTimeout( function () {
					repeatFight(side, value)
				}, pause);
			}            
		}
            
  }
  
  function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
  function addFastLinks () {
  	
  	var linkMU = $( "<a href='"+ getCurrentServer() + URLMU +"'>MU</a>"  );
    linkMU.css({ "padding" : "3px 3px", "background-color" : "#FFFFFF", "color" : "#000000", "text-shadow" : "1px 1px 1px #111" });
    linkMU.css({ "float" : "left", "box-shadow" : "0px 0px 2px 0px #000" });
    linkMU.bind( "mouseover", function() { $(this).css({ "background-color" : "rgba(98, 144, 199, 0.7)", "box-shadow" : "0px 0px 2px 0px #333" }); });
    linkMU.bind( "mouseout", function() { $(this).css({ "background-color" : "#FFFFFF", "box-shadow" : "0px 0px 2px 0px #000" }); });
    
    var linkMUSt = $( "<a href='"+ getCurrentServer() + URLMUStorage +"'></a>"  );
    linkMUSt.css({ "float" : "left", "padding" : "1px 2px 0px 2px", "background-color" : "#FFFFFF" });
    linkMUSt.css({ "box-shadow" : "0px 0px 2px 0px #000", "margin" : "0px 5px" });
    linkMUSt.append( "<img src='"+ IMGPACKAGE +"' style='width:19px;' />" );
    linkMUSt.bind( "mouseover", function() { $(this).css({ "background-color" : "rgba(98, 144, 199, 0.7)", "box-shadow" : "0px 0px 2px 0px #333" }); });
    linkMUSt.bind( "mouseout", function() { $(this).css({ "background-color" : "#FFFFFF", "box-shadow" : "0px 0px 2px 0px #000" }); });
    
    var linkMUMy = $( "<a href='"+ getCurrentServer() + URLMUMoney +"'></a>"  );
    linkMUMy.css({ "float" : "left", "padding" : "1px 2px 0px 2px", "background-color" : "#FFFFFF" });
    linkMUMy.css({ "box-shadow" : "0px 0px 2px 0px #000" });
    linkMUMy.append( "<img src='"+ IMGDOLLAR +"' style='width:19px;' />" );
    linkMUMy.bind( "mouseover", function() { $(this).css({ "background-color" : "rgba(98, 144, 199, 0.7)", "box-shadow" : "0px 0px 2px 0px #333" }); });
    linkMUMy.bind( "mouseout", function() { $(this).css({ "background-color" : "#FFFFFF", "box-shadow" : "0px 0px 2px 0px #000" }); });
    
    var content = $( "<div class='plate' style='display:block; font-weight:bold; height:20px;'></div>" );
    content.append( linkMU );
    content.append( linkMUSt );
    content.append( linkMUMy );
    content.insertBefore( $( "#userMenu" ).children().first() );
    
  }
  
  function changeDailyTasks () {
  	if ( $( "#showTutorialTutorial" ) ) {
  		var style = " style='width: 135px; height: 30px; margin-left: 20px; cursor: pointer; box-shadow: none; background: rgb(50, 50, 50); text-shadow: none; border: 1px solid rgb(255, 255, 255)' ";
  		$( "#showTutorialTutorial" ).find( "a" ).each( function () {
  			if( $( this ).attr( "href" ).indexOf( "train.html" ) > -1 ) {
  				$( this ).after("<input id='trainButtonMod' class='tasksMod'" + style + "type='submit' value='Train'>");
  				$( this ).remove();
  			} else {
  				if( $( this ).attr( "href" ).indexOf( "work.html" ) > -1 ) {
  					$( this ).after("<input id='workButtonMod' class='tasksMod'" + style + "type='submit' value='Work'>");
  					$( this ).remove();
  				} else {
  					if( $( this ).attr( "href" ).indexOf( "battles.html" ) > -1 ) {
  						$( this ).after("<input id='fightButtonMod' class='tasksMod'" + style + "type='submit' value='Fight'>");
  						$( this ).remove();
  					}
  				}
  			}
  		});
  		
  		$( ".tasksMod" ).hover(function () {
  			$( this ).css({ "box-shadow" : "0 0 5px rgba(0,0,0, 0.6)" });
  		},
  		function () {
  			$( this ).css({"box-shadow" : "none"});
  		});
  		
  		$( ".tasksMod" ).click( function () {
  			var btn = $( this ).attr( "id" );
  			if ( btn == "trainButtonMod" ) {
					trainMod( this );
  			} else {
  				if ( btn == "workButtonMod" ) {
  					workMod( this );
   				} else {
  					fightMod( this );
  				}
  			}
  			
  			if ( $( "#showTutorialTutorial" ).find( ".tasksMod" ).length == 0 ) {
  				$( "#showTutorialTutorial" ).closest( ".plate" ).remove();
  			}
  		});
  		
  		function trainMod (btn) {
  			var dataString = '';
  			$.ajax({
  				type: "POST",
		    	url: "train.html",
		    	data: dataString,
		    	success: function(msg) {
		    		$( "#console02" ).html( $( msg ).find( ".testDivblue" ).eq(2).find( "div" ).eq(0).text() );
		    		$( btn ).remove();
		    	}
		    });
  		}
  
  		function workMod (btn) {
  			var dataString = 'action=work';
				$.ajax({
  				type: "GET",
		    	url: "work.html",
		    	data: dataString,
		    	success: function(msg) {
		    		$( "#console02" ).css({ "width" : "500px" });
		    		if ( $( msg ).find( ".testDivred" ).eq(1).length == 1 ) {		    			
		    			$( "#console02" ).html( "<b style='color: red'>FAILED!</b>" + $( msg ).find( ".testDivred" ).eq(1).text() +"." );
		    		} else {
		    			$( "#console02" ).html( "<font style='color: green'>OK!</font> The work is done. " + $( msg ).find( ".attributesTable" ).find( "tr" ).eq(7).text() + $( msg ).find( ".attributesTable" ).find( "tr" ).eq(12).text()  );
		    			$( btn ).remove();
		    		}		    		
		    	}
		    });
  		}
  
  		function fightMod () {
  	
  		}
  		
  	}
  }
  
  function getCurrentServer( onlyhost ) {
		if( !currentServer ) {
			var localUrl = new String( window.location );
      var ini = localUrl.indexOf( "http://", 0 );
      var end = localUrl.indexOf( ".", 0 );
      currentServer = localUrl.substr( ini, end-ini+1 );
    }
    if (onlyhost) {
    	return( currentServer.split( "://" )[1].split( "." )[0] );
    } else {
      	return( currentServer );
    }
  }
  
  function sendFightRequestMod (side, val) {
  	
		var dataString = 'weaponQuality='+ $("#weaponQuality").val() + '&battleRoundId=' + $("#battleRoundId").val() + '&side='+side+'&value='+val;
		$.ajax({
			type: "POST",
		  url: "fight.html",
		  data: dataString,
		  success: function(msg) {
		  	
		  	$('#fightResponse > div').replaceWith( msg );
                
        var healthText = $("#healthUpdate").text();
        if (healthText!="") {
        	var healthUpdated = healthText.substr(0, healthText.length-3 );
          if(healthUpdated < 100) {
          	$("#healthProgress div.ui-corner-right").removeClass('ui-corner-right');
          }
          $("#healthProgress .ui-progressbar-value").animate({width: healthUpdated + "%"},{queue: false});
					$("#healthProgress").attr('title',healthUpdated+' / 100');
				}
				var rank = parseInt($("#rankUpdate").text());
				var rankNext = parseInt($("#nextLevelRankUpdate").text());
				var rankCurr = parseInt($("#currLevelRankUpdate").text());
				if(rank != null) {
					var rankWidth = Math.round((rank - rankCurr) / (rankNext - rankCurr) * 100);
					$("#rankProgress .ui-progressbar-value").animate({width: rankWidth + "%"},{queue: false});
					$("#rankProgress").attr('title',rank+' / '+rankNext);
				}
				var xp = parseInt($("#xpUpdate").text());
				var xpNext = parseInt($("#nextLevelXpUpdate").text());
				var xpCurr = parseInt($("#currLevelXpUpdate").text());
				if(xp != null) {
					var xpWidth = Math.round((xp - xpCurr) / (xpNext - xpCurr) * 100);
					$("#xpProgress .ui-progressbar-value").animate({width: xpWidth + "%"},{queue: false});
					$("#xpProgress").attr('title',xp+' / '+xpNext);
				}
				var rankText = $("#currRankText").text();
				var currRankText = $("#rankText").text();
				if(rankText != null && currRankText != null) {
					if(rankText != currRankText) {
						$("#currRankText").text(currRankText);
						var src = $("#rankImg").text();
						$("#rankImage img").attr('src', src);
					}
				}
				
				var hitType = $( "#fightResponse" ).find( "div" ).eq(1).text();
        if ( hitType.indexOf( "Hit type:" ) == -1 ) {
        	$( "#console02" ).html( "<font style='color:red'>" + hitType + "</font>" );
        } else {
        	var hitType = $( "#fightResponse" ).find( "b" ).eq(0).text();
        	var dmgCur = $( "#DamageDone" ).find( "b" ).text();
        	
					var strAbs = $( "#fightResponse" ).find( "b" ).eq(1).text();
					if ( strAbs.indexOf( "Your armor absorbs the damage" ) != -1) {
						strAbs = " (Absorbs)";
					} else { 
						strAbs = "";
					}
        	
          $( "#console02" ).html( hitType + ": " + dmgCur + strAbs );

        }
      }
    });
  }
  
};

// Inject our main script
var script = document.createElement( "script" );
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild( script );