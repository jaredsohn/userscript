// ==UserScript==
// @name       Responsive Stackoverflow and few other stackexchange sites
// @author Pratap Patil
// @namespace  http://www.curium.in/2013/05/wide-screen-stackoverflow.html
// @version    1.1
// @description widescreen stackoverflow.com/questions/xxxx
// @copyright   http://creativecommons.org/licenses/by-sa/3.0/deed.en_US
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include    *stackoverflow.com/questions/*
// @include    *serverfault.com/questions/*
// @include    *superuser.com/questions/*
// @include    *meta.stackoverflow.com/questions/*
// @include    *webapps.stackexchange.com/questions/*
// @include    *gaming.stackexchange.com/questions/*
// @include    *webmasters.stackexchange.com/questions/*
// @include    *cooking.stackexchange.com/questions/*
// @include    *gamedev.stackexchange.com/questions/*
// @include    *photo.stackexchange.com/questions/*
// @include    *stats.stackexchange.com/questions/*
// @include    *math.stackexchange.com/questions/*
// @include    *diy.stackexchange.com/questions/*
// @include    *gis.stackexchange.com/questions/*
// @include    *tex.stackexchange.com/questions/*
// @include    *askubuntu.com/questions/*
// @include    *money.stackexchange.com/questions/*
// @include    *english.stackexchange.com/questions/*
// @include    *stackapps.com/questions/*
// @include    *ux.stackexchange.com/questions/*
// @include    *unix.stackexchange.com/questions/*
// @include    *wordpress.stackexchange.com/questions/*
// @include    *cstheory.stackexchange.com/questions/*
// @include    *apple.stackexchange.com/questions/*
// @include    *rpg.stackexchange.com/questions/*
// @include    *bicycles.stackexchange.com/questions/*
// @include    *programmers.stackexchange.com/questions/*
// @include    *electronics.stackexchange.com/questions/*
// @include    *android.stackexchange.com/questions/*
// @include    *boardgames.stackexchange.com/questions/*
// @include    *physics.stackexchange.com/questions/*
// @include    *homebrew.stackexchange.com/questions/*
// @include    *security.stackexchange.com/questions/*
// @include    *writers.stackexchange.com/questions/*
// @include    *video.stackexchange.com/questions/*
// @include    *graphicdesign.stackexchange.com/questions/*
// @include    *dba.stackexchange.com/questions/*
// @include    *scifi.stackexchange.com/questions/*
// @include    *codereview.stackexchange.com/questions/*
// @include    *codegolf.stackexchange.com/questions/*
// @include    *quant.stackexchange.com/questions/*
// @include    *pm.stackexchange.com/questions/*
// @include    *skeptics.stackexchange.com/questions/*
// @include    *fitness.stackexchange.com/questions/*
// @include    *drupal.stackexchange.com/questions/*
// @include    *mechanics.stackexchange.com/questions/*
// @include    *parenting.stackexchange.com/questions/*
// @include    *sharepoint.stackexchange.com/questions/*
// @include    *music.stackexchange.com/questions/*
// @include    *sqa.stackexchange.com/questions/*
// @include    *judaism.stackexchange.com/questions/*
// @include    *german.stackexchange.com/questions/*
// @include    *japanese.stackexchange.com/questions/*
// @include    *philosophy.stackexchange.com/questions/*
// @include    *gardening.stackexchange.com/questions/*
// @include    *travel.stackexchange.com/questions/*
// @include    *productivity.stackexchange.com/questions/*
// @include    *crypto.stackexchange.com/questions/*
// @include    *dsp.stackexchange.com/questions/*
// @include    *french.stackexchange.com/questions/*
// @include    *christianity.stackexchange.com/questions/*
// @include    *bitcoin.stackexchange.com/questions/*
// @include    *linguistics.stackexchange.com/questions/*
// @include    *hermeneutics.stackexchange.com/questions/*
// @include    *history.stackexchange.com/questions/*
// @include    *bricks.stackexchange.com/questions/*
// @include    *spanish.stackexchange.com/questions/*
// @include    *scicomp.stackexchange.com/questions/*
// @include    *movies.stackexchange.com/questions/*
// @include    *chinese.stackexchange.com/questions/*
// @include    *biology.stackexchange.com/questions/*
// @include    *poker.stackexchange.com/questions/*
// @include    *mathematica.stackexchange.com/questions/*
// @include    *cogsci.stackexchange.com/questions/*
// @include    *outdoors.stackexchange.com/questions/*
// @include    *martialarts.stackexchange.com/questions/*
// @include    *sports.stackexchange.com/questions/*
// @include    *academia.stackexchange.com/questions/*
// @include    *cs.stackexchange.com/questions/*
// @include    *workplace.stackexchange.com/questions/*
// @include    *windowsphone.stackexchange.com/questions/*
// @include    *chemistry.stackexchange.com/questions/*
// @include    *chess.stackexchange.com/questions/*
// @include    *raspberrypi.stackexchange.com/questions/*
// @include    *russian.stackexchange.com/questions/*
// @include    *islam.stackexchange.com/questions/*
// @include    *salesforce.stackexchange.com/questions/*
// @include    *patents.stackexchange.com/questions/*
// @include    *genealogy.stackexchange.com/questions/*
// @include    *robotics.stackexchange.com/questions/*
// @include    *expressionengine.stackexchange.com/questions/*
// @include    *politics.stackexchange.com/questions/*
// @include    *anime.stackexchange.com/questions/*
// @include    *magento.stackexchange.com/questions/*
// @include    *ell.stackexchange.com/questions/*
// @include    *sustainability.stackexchange.com/questions/*
// @include    *tridion.stackexchange.com/questions/*
// @include    *reverseengineering.stackexchange.com/questions/*
// @include    *networkengineering.stackexchange.com/questions/*
// @include    *opendata.stackexchange.com/questions/*
// @include    *freelancing.stackexchange.com/questions/*
// @include    *blender.stackexchange.com/questions/*
// @include    *mathoverflow.net/questions/*
// @include    *space.stackexchange.com/questions/*
// @include    *sound.stackexchange.com/questions/*
// @include    *astronomy.stackexchange.com/questions/*
// @include    *tor.stackexchange.com/questions/*
// @include    *pets.stackexchange.com/questions/*
// @include    *ham.stackexchange.com/questions/*
// @include    *italian.stackexchange.com/questions/*
// @include    *pt.stackoverflow.com/questions/*
// @include    *aviation.stackexchange.com/questions/*
// @include    *ebooks.stackexchange.com/questions/*
// @include    *beer.stackexchange.com/questions/*
// @include    *softwarerecs.stackexchange.com/questions/*
// @include    *arduino.stackexchange.com/questions/*
// @include    *expatriates.stackexchange.com/questions/*
// @include    *matheducators.stackexchange.com/questions/*
// ==/UserScript==

/*
 * ===============================================READ ME=======================================================
 *  THE MAXIMUM WIDTH THAT USER WANTS SHOULD BE ENTERED IN THE VARIABLE 'maximumWidth' BELOW.
 *  SOMETIMES ON A VERY BIG MONITORS/SCREENS THE WEBSITE CAN EXPAND TO THE MAXIMUM WIDTH OF BROWSER TO PREVENT
 * 	THAT FROM HAPPENING, YOU CAN PROVIDE A MAXIMUM WIDTH (NUMBER ONLY, NO UNITS) IN PIXELS BEYOND WHICH THE PAGE
 *  SHOULD NOT EXPAND.
 */

var maximumWidth = 1500;

function job() {
    var mainWidth = window.innerWidth;
    mainWidth = (mainWidth > 960 ? mainWidth : 960);
    mainWidth = (mainWidth > maximumWidth ? maximumWidth : mainWidth);
    mainWidth = mainWidth - 60;
    var anotherWidth = mainWidth - 280;
    var thirdWidth = anotherWidth - 40;
    
    var mainWidthStr = mainWidth + 'px';
    var anotherWidthStr = anotherWidth + 'px';
    var thirdWidthStr = thirdWidth + 'px';
    
    mainWidth = null;
    anotherWidth = null;
    thirdWidth = null;
    
    $("#content").css('width', mainWidthStr);
    $("#question, #answers, .answer, .post-text").css('width', anotherWidthStr);
    $('.post-text, .comments, #answers-header, .fw').css('width', thirdWidthStr);
    $('#sidebar .sidebar-related .related .answer-votes').css('border', '1px solid #E2E2E2');
    $('#post-form, .bottom-notice').css('padding-left', '50px');
    $('.container').css({'margin':'0 auto','width':mainWidthStr});
}


$(document).ready(function() {
    job();
});

$(window).resize(function() {
    job();
});