// ==UserScript==
// @name         The Binding of Isaac Wikia Items Parser
// @namespace    http://bindingofisaac.wikia.com
// @version      0.8
// @description  Easyer way to find items and their use.
// @include      http://*bindingofisaac.wikia.com/wiki/*
// @copyright    07.04.2013, Lizzaran
// ==/UserScript==
/* --- Version History --- *\
v 0.1: 02.11.2012
    - First public release
	
v 0.2: 03.11.2012
    - Codecleanup
	- Edited styles to use wikia's css
	- Customizeable styles added
	- Added view/hide button to Navigation Bar "Show/Hide Overview"
	
v 0.3: 03.11.2012
	- Added recharge time for Rechargable Items
	- Added MaxWidth for all items
	
v 0.4: 05.11.2012
    - Added support for the German version of the wiki "http://de.bindingofisaac.wikia.com"
    - Fixed a problem with special Characters in the Itemname
    - Improved current Page/Language detection
	
v 0.5: 07.11.2012
    - Added Language: French "http://fr.thebindingofisaac.wikia.com/wiki/"
		* http://fr.thebindingofisaac.wikia.com/wiki/Objets
		* http://fr.thebindingofisaac.wikia.com/wiki/Objets_Wrath_of_the_Lamb
		
	- Added Language: Russian "http://ru.bindingofisaac.wikia.com/wiki/"
		* http://ru.bindingofisaac.wikia.com/wiki/%D0%9F%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%D1%8B
		* http://ru.bindingofisaac.wikia.com/wiki/%D0%9F%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%D1%8B_Wrath_of_the_Lamb
	
v 0.6: 07.11.2012
	- The script can now be implemented by simply adding:
		* <script type="text/javascript" src="http://userscripts.org/scripts/source/151530.user.js"></script>
	  to the wikia page. Must be placed after the jQuery script!

v 0.7: 21.11.2012
	- Improved Eventlistener
	- Possibility to use a Bookmark to load the Script:
		To Use this script without an extention, create a Bookmark and paste the following code in the URL field of your Bookmark.

		javascript:(function () {if ( document.getElementById('151530.user.js') == null ) {var s = document.createElement('script');s.type = 'text/javascript';s.id = '151530.user.js';s.src = 'http' + '://' + 'userscripts.org/scripts/source/' + '151530.user.js';document.getElementsByTagName('body')[0].appendChild(s);}})();

		Once you are on the Item page of the wiki, press the bookmark button and it will load the script to your current site.

		Works with IE, Firefox, Chrome, probably Opera too.

v 0.8: 07.04.2013
	Updated to work with layout changes in the english wiki
	
\* ----------------------- */

var tempJQuery = '';
if (typeof(unsafeWindow) != 'undefined') {
	tempJQuery = unsafeWindow.jQuery;
} else {
	tempJQuery = jQuery;
}
var bOnlyRunOnce = true;
(function () {
    /* --- Config --- */
    var aText = {Navigation: {en: 'Show/Hide Overview',
                              de: '&Uuml;bersicht ein/aus'
							 }
                };
    
    var oSettings = new Object();
	//        Lang    Page iTable iCol        'img|name|text|html'
	// Settings EN
	oSettings['en'] = {Pages: {Items:   {Alias: 'Page1', mHeight: 40, mWidth: 60, imageCol: 1},
							   Trinket: {Alias: 'Page2', mHeight: 60, mWidth: 65, imageCol: 0},
							   Tarot:   {Alias: 'Page3', mHeight: 100, mWidth: 70, imageCol: 0}
							  },
					   Page1: {0: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw75'},
								   2: {to: 2, type: 'html', style: 'cb'},
								   3: {to: 3, type: 'html', style: 'cbw50'}
								  },
							   1: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw75'},
								   2: {to: 2, type: 'html', style: 'cb'},
								   3: {to: 3, type: 'html', style: 'cbw50'}
								  },
							   2: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw75'},
								   2: {to: 2, type: 'html', style: 'cb'}
								  },
							   3: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw75'},
								   2: {to: 2, type: 'html', style: 'cb'}
								  }
							  },
					   Page2: {0: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'w350'},
								   2: {to: 2, type: 'html', style: ''}
								  }
							  },
					   Page3: {0: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw150'},
								   2: {to: 2, type: 'html', style: ''}
								  },
							   1: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw150'},
								   2: {to: 2, type: 'html', style: ''}
								  }
							  }
					  };
	
	// Settings DE
	oSettings['de'] = {Pages: {Items:   {Alias: 'Page1', mHeight: 30, mWidth: 50, imageCol: 0},
							   Trinket: {Alias: 'Page2', mHeight: 60, mWidth: 65, imageCol: 0},
							   Tarot:   {Alias: 'Page3', mHeight: 100, mWidth: 70, imageCol: 0}
							  },
					   Page1: {0: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cb'},
								   2: {to: 2, type: 'html', style: 'cbw350'},
								   3: {to: 3, type: 'html', style: 'cbw50'}
								  },
							   1: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cb'},
								   2: {to: 2, type: 'html', style: 'cbw350'},
								   3: {to: 3, type: 'html', style: 'cbw50'}
								  },
							   2: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cb'},
								   2: {to: 2, type: 'html', style: 'cbw350'}
								  },
							   3: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cb'},
								   2: {to: 2, type: 'html', style: 'cbw350'}
								  }
							  },
					   Page2: {0: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'w350'},
								   2: {to: 2, type: 'html', style: ''}
								  }
							  },
					   Page3: {0: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw150'},
								   2: {to: 2, type: 'html', style: 'c'}
								  },
							   1: {0: {to: 0, type: 'html', style: 'cbw150'},
								   1: {to: 1, type: 'html', style: 'cbw150'},
								   2: {to: 2, type: 'html', style: ''}
								  }
							  }
					  };
	
	// Settings FR
	oSettings['fr'] = {Pages: {Items:     {Alias: 'Page1', mHeight: 40, mWidth: 60, imageCol: 0},
							   ItemsWOTL: {Alias: 'Page2', mHeight: 40, mWidth: 60, imageCol: 0}
							  },
					   Page1: {0: {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: 'cw150'},
								   2: {to: 3, type: 'html', style: 'cw50'},
								   3: {to: 2, type: 'html', style: ''}
								  },
							   1: {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: 'cw150'},
								   2: {to: 2, type: 'html', style: ''},
								   3: {to: 3, type: 'html', style: 'cw250'}
								  },
							   2: {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: 'cw150'},
								   2: {to: 2, type: 'html', style: ''}
								  }
							  },
					   Page2: {0: {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: 'cw150'},
								   2: {to: 2, type: 'html', style: 'c'},
								   3: {to: 3, type: 'html', style: 'cw250'},
								   4: {to: 4, type: 'html', style: 'cw50'}
								  },
							   1: {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: 'cw150'},
								   2: {to: 2, type: 'html', style: 'cw150'},
								   3: {to: 3, type: 'html', style: 'c'}
								  },
							   2: {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: 'cw150'},
								   2: {to: 2, type: 'html', style: ''}
								  }
							  }
					  };
	// Settings RU
	oSettings['ru'] = new cloneObject(oSettings['fr']);
	oSettings['ru']['Page1'][2][2]['style'] = 'cw150';
	oSettings['ru']['Page1'][2][3] = {to: 3, type: 'html', style: ''};
	oSettings['ru']['Page2'][1][2]['style'] = 'c';
	oSettings['ru']['Page2'][1][3]['style'] = 'cw150';
	oSettings['ru']['Page2'][3] = {0: {to: 0, type: 'html', style: 'cw150'},
								   1: {to: 1, type: 'html', style: ''}
								  };
	
	/* -------------- */
	var $ = tempJQuery;
	var aItems = new Object();
    var sLastItem = '';
    
    var sURLRegExp = /http:\/\/(.*?)(?:\.|\.the|)bindingofisaac\.wikia\.com\/wiki\/(Items|Trinket(?:|s)|Tarot_Cards|Karten|Przedmioty|Objetos|Objets(?:\_Wrath\_of\_the\_Lamb|)|%D0%9F%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%D1%8B(?:\_Wrath\_of\_the\_Lamb|))(?:$|#|\?)/g;
    var aURL = sURLRegExp.exec(window.location.href);
    var sPage = aURL[2];
    var sLang = (aURL[1] != '') ? aURL[1] : 'en';
    
    //console.log('aURL: ' + aURL);
    
	var oCountdown = null;
    var iItemNum = 0;
    
    if (sPage == 'Trinkets') { //en
        sPage = 'Trinket';
        
    } else if (sPage == 'Tarot_Cards') { //e
        sPage = 'Tarot';
        
    } else if (sPage == 'Karten') { //de
        sPage = 'Tarot';
        
    } else if (sPage == 'Objets') { //fr
        sPage = 'Items';
        
    } else if (sPage == 'Objets_Wrath_of_the_Lamb') { //fr
        sPage = 'ItemsWOTL';
        
    } else if (sPage == '%D0%9F%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%D1%8B') { //ru
        sPage = 'Items';
        
    } else if (sPage == '%D0%9F%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%D1%8B_Wrath_of_the_Lamb') { //ru
        sPage = 'ItemsWOTL';
        
    } /*else if (sPage == 'Objetos') { //es
        sPage = 'Items';
        
    } else if (sPage == 'Przedmioty') { //pl
        sPage = 'Items';
    }*/
    
	//console.log('sPage: ' + sPage);
	
    if (to(oSettings[sLang]) && to(oSettings[sLang]['Pages'][sPage])) {
		////
        function startScript() {
            if ( bOnlyRunOnce ) {
                bOnlyRunOnce = false;
                var sSetPage = oSettings[sLang]['Pages'][sPage]['Alias'];
                if (to(oSettings[sLang][sSetPage])) { //Check if Page settings exist
                    $('.wikitable, .article-table').each(function(iTABLE) {
                        if (to(oSettings[sLang][sSetPage][iTABLE])) { //Check if Table settings exist
                            $(this).find('TR').each(function(iROW) {
                                if (iROW > 0) { //Skip Title Row
                                    sLastItem = '';
									
                                    $(this).find('th, td').each(function(iCOL) {
                                        if (iCOL == 0) {
                                            sLastItem = 'ItemNum' + (iItemNum++);
                                            
                                            aItems[sLastItem] = new Object();
                                            aItems[sLastItem]['Table'] = iTABLE;
											aItems[sLastItem]['num'] = 0;
                                        }
										
										if (iCOL == oSettings[sLang]['Pages'][sPage]['imageCol']) {
											$(this).find('a:first').each(function(iA) {
												aItems[sLastItem]['image'] = $(this).attr('HREF');
											});
										}
										
                                        var oColSet = oSettings[sLang][sSetPage][iTABLE][iCOL];
										
                                        if (to(oColSet)) { //Check if Col settings exist
                                            var sTemp = '';
											
                                            if (oColSet['type'] == 'img') {
                                                $(this).find('a:first').each(function(iA) {
                                                    sTemp = $(this).attr('HREF');
                                                });
                                                
                                            } else if (oColSet['type'] == 'name') {
                                                sTemp = $(this).text().replace(/<\/?[^>]+>/gi, '');
                                                
                                                if (sTemp == '') {
                                                    sTemp = '<3';
                                                }
                                                
                                            } else if (oColSet['type'] == 'text') {
                                                sTemp = $(this).text();
                                                
                                            } else if (oColSet['type'] == 'html') {
                                                sTemp = $(this).html();
                                            }
                                            
                                            aItems[sLastItem]['num'] = (oColSet['to'] > aItems[sLastItem]['num']) ? oColSet['to']: iCOL;
                                            aItems[sLastItem][oColSet['to']] = new Object();
                                            aItems[sLastItem][oColSet['to']]['style'] = getStyle(oColSet['style']);
											aItems[sLastItem][oColSet['to']]['type'] = oColSet['type'];
                                            aItems[sLastItem][oColSet['to']]['text'] = sTemp;
                                        }
                                    });
                                }
                            });
                        }
                    });
                    
                    sLastItem = '';
                    
                    var sTable = '<div id="WikiaPageBackground" class="WikiaPageBackground"></div><div class="WikiaPageContentWrapper" style="display: inline-block;">';
                    
                    for (sName in aItems) {
                        sTable += '<div class="wikitable" align="center" style="width: ' + oSettings[sLang]['Pages'][sPage]['mWidth'] + 'px; margin: 5px 5px 0px 0px; display: inline-block;"><img id="tt_' + sName + '" style="cursor: pointer; max-width: ' + oSettings[sLang]['Pages'][sPage]['mWidth'] + 'px; max-height: ' + oSettings[sLang]['Pages'][sPage]['mHeight'] + 'px;" src="' + aItems[sName]['image'] + '"></div>';
                    }
                    
                    sTable += '</div>';
                    sTable += '<div id="cont_info" class="WikiaMainContent grid-4" style="display: inline-block; width: 97%;"></div>';
                    
                    $('body').append('<div class="WikiaPage V2 WikiaGrid" style="width: 97%; z-index: 999; display: none; position: absolute; top: 40px; left: 10px; right: 10px;" id="overDivText">' + sTable + '</div>');
                    $('#GlobalNavigation').append('<li class="topNav imgToggle"><a id="imgToggle" href="javascript: void();">' + aText['Navigation'][(to(aText['Navigation'][sLang])) ? sLang : 'en'] + '</a>');
                    
					$('img[id^="tt_"]').on('mouseover', function(){
						myEvents(this, 'over');
					}).on('mouseout', function(){
						myEvents(this, 'out');
					}).on('click', function(){
						myEvents(this, 'click');aw
					});
					
					$('#imgToggle').on('click', function(){
						ToggleDiv();
					});
					
                    $('#overDivText').fadeIn('slow');
                }
            }
        };
		
		////
		// Eventlistener
		function myEvents(oImg, sType) {
			if (sType == 'click') {
				sLastItem = oImg;
                setItemTable(oImg);
				
			} else if (sType == 'over') {
				setItemTable(oImg);
                clearTimeout(oCountdown);
				
				//$(oImg).parent().css('border', '1px solid #ffffff');
				
			} else if (sType == 'out') {
				$(oImg).parent().css('', '');
				oCountdown = setTimeout(function() {setItemTable(sLastItem);}, 200);
			}
		}
		
		////
        function setItemTable(target) {
            var sItemName = target.id.substring(3, target.id.length);
			var sOut = '';
			
			for (var i=0; i <= aItems[sItemName]['num']; i++) {
				if (to(aItems[sItemName][i])) {
					var sText = aItems[sItemName][i]['text'];
					if (aItems[sItemName][i]['type'] == 'img') {
						sText = '<img src="' + sText + '">';
					}
					sOut += '<td style="' + aItems[sItemName][i]['style'] + '">' + sText + '</td>';
				}
			}
			
			$('#cont_info').html('<table width="100%" class="wikitable"><tr>' + sOut + '</tr></table>');
        }
		
        function getStyle(sStyle) {
			if (sStyle != '') {
				var sStyleRegExp = /(?:(c)|(b)|(?:(w)(\d+)))/ig;
				var aStyle = sStyle.match(sStyleRegExp);
				sStyle = '';
			
				for (var i = 0; i < aStyle.length; i++) {
					if (sStyle != '') {
						sStyle += ' ';
					}
					
					if (aStyle[i].toUpperCase() == 'C') {
						sStyle += 'text-align: center;';
					}
					
					if (aStyle[i].toUpperCase().substring(0, 1) == 'W') {
						sStyle += 'width: ' + aStyle[i].substring(1, aStyle[i].length) + 'px;';
					}
					
					if (aStyle[i].toUpperCase() == 'B') {
						sStyle += 'font-weight: bold;';
					}
				}
			}
            
            return sStyle;
        }
		
		function to(oInput) {
            if ( typeof(oInput) != 'undefined' ) {
                return true;
            } else {
                return false;
            }
        }
		
		function ToggleDiv() {
            if ($('#overDivText').css('display') == 'none') {
                $('#overDivText').fadeIn('fast');
                
            } else {
                $('#overDivText').fadeOut('fast');
            }
        }
		
		function cloneObject(source) {
			for (i in source) {
				if (typeof(source[i]) == 'object') {
					this[i] = new cloneObject(source[i]);
					
				} else {
					this[i] = source[i];
				}
			}
		}
        
        $(document).ready(startScript());
    }
})();