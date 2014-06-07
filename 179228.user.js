// ==UserScript==
// @name            Hide Pantelidis
// @version         0.02
// @description     Hides facebook posts about Pantelidis. Can be extened to hide other posts as well.
// @copyright       2013+, Μουρίνιο του καναπέ www.facebook.com/mouriniotoukanape mouriniotoukanape@gmail.com license: GPL3, jquery has itw own license
// @include */*
// @require         http://code.jquery.com/jquery-latest.min.js
// @run-at          document-end
// ==/UserScript==
$( "div.timelineUnitContainer:contains('Παντελίδ')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('παντελίδ')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('παντελιδ')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('Παντελιδ')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('ΠΑΝΤΕΛΙΔ')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('Pantelid')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('pantelid')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('Pantelid')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('PANTELID')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('PADELID')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('Padelid')" ).css( "visibility", "hidden" );
$( "div.timelineUnitContainer:contains('padelid')" ).css( "visibility", "hidden" );

