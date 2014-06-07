// ==UserScript==
// @name           NYTimes Layout V10
// @namespace      http://www.userscripts.org
// @include        http://www.nytimes.com/pages/index.html*
// @include        http://www.nytimes.com/index.html*
// @include        http://www.nytimes.com/
// @include        http://www.nytimes.com//
// @include        http://www.nytimes.com/?adxnnl=*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @version        10

// ==/UserScript==

function do_platypus_script() {

// Note: This approach started with Firefox add-on "Platypus," but gained simplicity and stability by replacing raw XPaths with XPath predicates (e.g., [@id="main"] replaced "/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[3]" ).
//       I originally found Firefox add-on "View Source Chart" to be very helpful with script maintenance, but I later came to rely more on add-on "Firebug" for this purpose.

// Note: the following 2 lines of script check for updates each time this script is invoked. Thanks to Jarett at http://userscripts.org/scripts/show/20145 .
// Note: RL modified Jarett's script to force GM_setValue to store SUC_current_version as string value remote_version+' ' , then changed it back to remote_version, which can be integer or string.  Order of setValue and openInTab is reversed.
var SUC_script_num = 70128;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_setValue('SUC_current_version', remote_version);GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// Below the fold
//---------------

// Knock out remaining ad text and gray background shading at left margin (Adblock Plus does most of the work.)
// (No longer necessary.)

// Resize columns "below the fold"

    // Right side
    // Note: NYT plays a lot with the contents of this area, so I try to resize it here in a generalized way.
    // Greatly simplified from earlier versions.
yy =                             document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/descendant-or-self::*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 1; i < yy.snapshotLength; i++) 
     {if (yy.snapshotItem(i).className != "timestamp") {
       yy.snapshotItem(i).width = 220;
       yy.snapshotItem(i).setAttribute('style','width: 240px !important; font-size: 10px !important;');
       };
     };
  
yy.snapshotItem(0).setAttribute('style','width: 220px;');                                      // Apparently, parent DIV must be processed last.
try{smart_remove(window.document,document.getElementById('classifiedsWidget'),null,null,null);} catch(err){}

    // Left side and center widths
set_style_script(window.document,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="spanABBelowFold wrap"]/DIV[starts-with(@class,"abColumn")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 694px;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"background-color: white;width: 692px;",null,null);

    // 3 main columns - widths, margins and borders
for (var i = 1; i < 10; i++)
  {set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"background-color: white;width: 692px; background-image: none; margin: 0 0 0 0;border-bottom: 2px solid #DDDDDD;",null,null);
   for (var j = 1; j < 4; j++)
     {if (i == 9 && j == 3) break;
      document.evaluate                                 ('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.setAttribute('style','width: 224px;  margin: 4px 0px 0px 4px; border-right:2px solid #DDDDDD;background-color: white;');
      set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/h6', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-transform: uppercase;",null,null);
      set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-bottom: 0px !important; margin-right: 5px;",null,null);
      try{set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-bottom: 4px !important; margin-right: 5px;",null,null);} catch(error){}
      try{set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-bottom: 0px !important; margin-right: 5px;",null,null);} catch(error){}
      set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li[1]/h6', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-bottom: 4px !important; margin-right: 5px; font-weight: normal;",null,null);
     }
  }

// For each section (e.g., WORLD), move thumbnail photo outside headline 1, so if headline 1 is short, subsequent headlines can wrap.
for (var i = 1; i < 10; i++)
  {for (var j = 1; j < 4; j++)
     {if (i == 9 && j == 3) break;
      document.evaluate                                 ('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.setAttribute('class','none');
      test = document.evaluate                          ('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
      if (test == null) continue;  // Sometimes no thumbnail
      smart_remove(window.document,document.evaluate    ('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
      script_paste(window.document,document.evaluate    ('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li  ', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/li/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
      set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/ul/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-right: 10px;;",null,null);
     }
  }

// Fix "below the fold" title fonts first, because cut and paste later will change line numbers.
// (No longer necessary.)

// Cut and paste sections of text below the fold
    // Note: after "paste," subsequent DIV column indexes reflect the shift.  However, "remove" does not decrement the remaining block indexes because it hides material rather than deleting it.

var oldRow = [7,9,4,6,8,3,5,8,4,4,7,7,3,6,6,2,5,2,1,1,5,3,2,1];
var oldCol = [3,1,2,3,4,2,3,5,1,3,5,4,3,5,4,3,5,2,3,2,4,4,4,3];
var newRow = [8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,3,3,3,2,2,2,1,1,1];
var newCol = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

for (var i = 0; i < oldRow.length; i++)
  {smart_remove(window.document,document.evaluate ('//*[@id="wellRegion"]/DIV['+oldRow[i]+']/DIV['+oldCol[i]+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
   script_paste(window.document,document.evaluate ('//*[@id="wellRegion"]/DIV['+newRow[i]+']/DIV['+newCol[i]+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="wellRegion"]/DIV['+oldRow[i]+']/DIV['+oldCol[i]+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
  }

    // Add prefixes to section titles to aid navigation 
var sectionLetter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
k = -1;
for (var i = 1; i < 9; i++)
  {for (var j = 1; j < 4; j++)
     {k++;
//      document.evaluate                           ('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/h6/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML
//        = sectionLetter[k] +') '+document.evaluate('//*[@id="wellRegion"]/DIV['+i+']/DIV['+j+']/h6/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
     }
  }

    // T Mag
try{set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-left: 10px; margin-bottom: 10px;",null,null); 
    set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[2]/h6', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight: bold;",null,null); 
    smart_remove(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
    script_paste(window.document,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
    }
catch(err){}
    // Magazine
try{set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[8]/DIV[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-left: 10px; margin-bottom: 10px;",null,null); 
    set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[8]/DIV[6]/h6', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight: bold;",null,null); 
    smart_remove(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[8]/DIV[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
    script_paste(window.document,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="wellRegion"]/DIV[8]/DIV[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
   }
catch(err){}

    // The Upshot
try{set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-left: 10px; margin-bottom: 10px;",null,null); 
    set_style_script(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[3]/h6', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight: bold;",null,null); 
    smart_remove(window.document,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
    script_paste(window.document,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="wellRegion"]/DIV[9]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
    }
catch(err){}

    // Recent Blog Posts - Opinionators
try{set_style_script(window.document,document.evaluate('//*[@id="blogModule"]/DIV[3]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"display: table;",null,null);} catch(err){}

    // Recent Blog Posts -- sometimes above, sometimes below the fold.  Force below.
try{smart_remove(window.document,document.getElementById('blogModule'),null,null,null);
    script_paste(window.document,document.evaluate('//*[@id="main"]/DIV[3]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[5]'                      , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.getElementById('blogModule'),null,null);
   }
catch(err){try{smart_remove(window.document,document.getElementById('blogModule'),null,null,null);
               script_paste(window.document,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.getElementById('blogModule'),null,null);
              }
           catch(err){}
          }

    // Times Wire
zz = document.evaluate('//*/ol[@id="wireContent"]/descendant::a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < zz.snapshotLength; i++) 
  {if (zz.snapshotItem(i).width > 180) 
    {zz.snapshotItem(i).setAttribute('style','width: 180px; background-color: white;');
    }
  }
    
    
// Above the fold
//---------------

    // Nav column (leftmost)
// try{smart_remove(window.document,document.evaluate('//*[@id="HPLeftNav"]/DIV[2]/DIV[1]/ul[1]/li[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);} catch(err){}
// try{smart_remove(window.document,document.evaluate('//*[@id="HPLeftNav"]/DIV[2]/DIV[1]/ul[1]/li[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);} catch(err){}
// try{smart_remove(window.document,document.evaluate('//*[@id="HPLeftNav"]/DIV[2]/DIV[1]/ul[1]/li[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);} catch(err){}
// smart_remove(window.document,document.evaluate('//*[@id="main"]/DIV[1]/DIV[1]/DIV[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
// smart_remove(window.document,document.evaluate('//*[@id="main"]/DIV[1]/DIV[1]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
// try{smart_remove(window.document,document.evaluate('//*[@id="main"]/DIV[1]/DIV[1]/DIV[1]/DIV[3]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);} catch(err){}
// try{smart_remove(window.document,document.evaluate('//*[@id="main"]/DIV[1]/DIV[1]/DIV[1]/DIV[3]/DIV[1]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);} catch(err){}
// try{smart_remove(window.document,document.evaluate('//*[@id="main"]/descendant::DIV[@class="nav column")]'    , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);} catch(err){}

    // Opinion
try{set_style_script(window.document,document.evaluate('//*[@id="cColumnTopSpanRegion"]/DIV[1]/DIV[1]/DIV[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 225px;background-color: white;",null,null);} catch(err){}
try{set_style_script(window.document,document.evaluate('//*[@id="cColumnTopSpanRegion"]/DIV[1]/DIV[1]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 225px;background-color: white;",null,null);} catch(err){}
try{set_style_script(window.document,document.evaluate('//*[@id="cColumnTopSpanRegion"]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 225px;background-color: white; margin-left: 0;",null,null);} catch(err){}

    // Markets or In Sunday's Times, Business               
var test = document.evaluate('//*[@id="wsod-home"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
if (test != null){
set_style_script(window.document,document.getElementById('wsod-home'),"width: 225px;background-color: white;",null,null);
zz = document.evaluate('//*/DIV[@id="wsod-home"]/descendant::DIV[starts-with(@class,"marketContainer")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < zz.snapshotLength; i++) {zz.snapshotItem(i).setAttribute('style','width: 65px;background-color: white;'); }
smart_remove(window.document,document.evaluate('//*[@id="wsodFormHome"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
}

    // Most Popular -- shrink tab fonts to prevent folding
try{
set_style_script(window.document,document.evaluate('//*[@id="mostPopWidget"]/DIV[1]/UL[1]/LI[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 52px; font-size: 1.0em;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="mostPopWidget"]/DIV[1]/UL[1]/LI[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 54px; font-size: 1.0em;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="mostPopWidget"]/DIV[1]/UL[1]/LI[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 62px; font-size: 1.0em;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="mostPopWidget"]/DIV[1]/UL[1]/LI[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 47px; font-size: 1.0em;",null,null);
   }
catch(err){}

    // Whole right side above fold
zz = document.evaluate('//*[@id="main"]/descendant::DIV[starts-with(@class,"cColumn")]/descendant-or-self::*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 1; i < zz.snapshotLength; i++) 
  {if (zz.snapshotItem(i).width > 230) 
    {zz.snapshotItem(i).setAttribute('style','width: 220px; background-color: white;');
     if (zz.snapshotItem(i).height == 15) zz.snapshotItem(i).height = 11;                // Catches Sunday Review title which is an img.
    }
  }
zz.snapshotItem(0).setAttribute('style','width: 230px;background-color: white;');

    // Whole left side above fold
set_style_script(window.document,document.evaluate('//*[@id="main"]/descendant::DIV[starts-with(@class,"spanAB")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"background: url('');height:;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="main"]/descendant::DIV[starts-with(@class,"abColumn")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 690px;background-color: white;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="main"]/descendant::DIV[starts-with(@class,"wideB")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"background: url('');",null,null);

    // Left narrow column above fold (aColumn openings)
zz = document.evaluate('//*/DIV[starts-with(@class,"abColumn")]/descendant::DIV[starts-with(@class,"aColumn")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < zz.snapshotLength; i++) {zz.snapshotItem(i).setAttribute('style','width: 260px;background-color: white;'); }

    // Center wide column above fold (bColumn openings)
zz = document.evaluate('//*/DIV[starts-with(@class,"abColumn")]/descendant::DIV[starts-with(@class,"bColumn")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < zz.snapshotLength; i++) {zz.snapshotItem(i).setAttribute('style','width: 410px;background-color: white;'); }

// Cut and paste sections of text above the fold

    // Move "News from AP & Reuters" (no longer necessary) and embolden heading         
//    smart_remove(window.document,document.evaluate('//*[@id="pocketRegion"]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
//script_paste(window.document,document.evaluate('//*[@id="cColumnAboveMothRegion"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="pocketRegion"]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);

try{set_style_script(window.document,document.evaluate('//*[@id="pocketRegion"]/DIV[3]/H6[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-family:georgia;font-weight: bold;font-size: small;",null,null);}
catch(err){try{set_style_script(window.document,document.evaluate('//*[@id="pocketRegion"]/DIV[4]/H6[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-family:georgia;font-weight: bold;font-size: small;",null,null);}
           catch(err){}
          }

    // Remove Video, but preserve stories including "News from AP & Reuters"
for (i = 4; i > 0; i--)
  {test = document.evaluate('//*[@id="pocketRegion"]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   if (test == null) continue;
   set_style_script(window.document,document.evaluate('//*[@id="pocketRegion"]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 230px;background-color: white;",null,null);
   script_paste(window.document,document.evaluate('//*[@id="cColumnAboveMothRegion"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="pocketRegion"]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
  }
smart_remove(window.document,document.evaluate('//*[@id="main"]/descendant::DIV[@class="wideA"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);

    // Move daily feature section from below to above the fold
if (document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.className != "timeswireModule")
  {smart_remove(window.document,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
   script_paste(window.document,document.evaluate('//*[@id="cColumnAboveMothRegion"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[starts-with(@class,"baseLayoutBelowFold")]/descendant::DIV[@class="cColumn"]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
  }
    
    // Square-up layout  (under development)
var hAB = document.evaluate('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"abColumn")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.clientHeight;
var hC  = document.evaluate('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]' , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.clientHeight;
if (hC-hAB > 350)
  {
   for (i = 8; i > 5; i--)
     {test = document.evaluate                          ('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
      if (test == null) continue;
      document.evaluate                                 ('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.setAttribute('story','column !important');
      try{document.evaluate                             ('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']/descendant::DIV[starts-with(@class,"subColumn-2")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.setAttribute('class','subColumn-1');} catch(error) {}
      set_style_script(window.document,document.evaluate('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-right: 10px;",null,null);
      try{ww = document.evaluate                        ('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']/descendant::p[@class="summary"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
          for (var j = 0; j < ww.snapshotLength; j++) {ww.snapshotItem(j).setAttribute('style','padding-top: 10px; margin-bottom: 0px;'); }
         }
      catch(err){}
      var hD  =                        document.evaluate('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']' , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.clientHeight;
      if (hD < 50) continue;
      smart_remove(window.document,document.evaluate    ('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
      script_paste(window.document,document.evaluate('//*[@id="main"]/descendant::DIV[starts-with(@class,"wideA")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@class="baseLayout wrap"]/descendant::DIV[starts-with(@class,"spanAB")]/descendant::DIV[starts-with(@class,"cColumn")]/DIV['+i+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
      break;
     }
  } 
smart_remove(window.document,document.evaluate('//*[@id="Middle5"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);    
}; // Ends do_platypus_script

//===========================================================================
  window.addEventListener("load", function() { do_platypus_script() }, false);
//===========================================================================
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing code to implement Platypus actions.
//
//  ABRIDGED -- rl 2/27/2010
//  ========
// 
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
//.user.js