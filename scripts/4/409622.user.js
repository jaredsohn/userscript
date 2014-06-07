// ==UserScript==
// @name        FXP New Design
// @namespace   http://userscripts.org/users/Crapy
// @description Changes FXP's new design to a more classic one. 
// @match       http://*.fxp.co.il/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.08
// @updateURL   https://userscripts.org/scripts/source/409622.meta.js
// @downloadURL https://userscripts.org/scripts/source/409622.user.js
// @grant       none
// ==/UserScript==

$(document).ready(function() {
	$('.greengr').css('background', '#DBF043');
	$('.toplogin').css('background', "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAcCAYAAABLam7PAAAAJklEQVQI12P8//8/AwMDAwMTAxRQi8EIxVikWGAcFpgaOjAwnQEAFG0DXcRxj+kAAAAASUVORK5CYII=') repeat-x scroll left bottom rgb(254, 254, 254)");
	$('.toplogin').css('position', "absolute");
	$('.toplogin').css('text-align', "right");
	$('.toplogin').css('left', "0px");
	$('.toplogin').css('top', "0px");
	$('.toplogin').css('border-radius', "0px");
	$('.toplogin').css('border-right', "1px solid #C8C8C8");
	$('.toplogin').css('border-left', "1px solid #C8C8C8");
	$('.toplogin').css('border-bottom', "1px solid #C8C8C8");
	$('.toplogin').css('padding', "8px");
	$('.toplogin').css('border-radius', "0px 0px 15px 15px");
	$('.bluegr').css('background', '#2D89C8');
	$('.graygr').css('background', 'none');
	$('.pagination span a').css('background', 'none');
	$('.pagination span a').css('border-radius', '0px');
	$('.thread_controls').css('background', '#F5F5F5');
	$('.titleshowt').css('background', "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAnCAIAAAApcTfNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACrSURBVFhHzc4LCoJAAAbh//5XiyijiCLKDc3STM3VXd91jBm+A4wWXsinmdf/aaHRNC00GvqFRn0306jzE428G2nk/Eij1o00qtuBRmUz0Ci3PY0yO9Agn56Vp0E+JaWjUVx4GkUfR6Mwb2l0ezc0umaWRpe0odE5dTQ6vVoaHRNLo0PS0Gj/sDTaxZZGQVTTaHf/0igwFY22pqLRJixptA4LGuTTyhQspvgB7BXeXlRnWwYAAAAASUVORK5CYII=') repeat scroll 0% 0% transparent");
	$('.titleshowt').css('border-top', "2px solid #2675AD");
	$('.titleshowt').css('border-right', "1px solid #E9E9E9");
	$('.titleshowt').css('border-left', "1px solid #E9E9E9");
	$('.titleshowt').css('border-radius', "0px");
	$('.newcontent_textcontrol').css('background', '#157CC0');
	$('.newcontent_textcontrol').hover(function(){
		$(this).css({'background':'#2EA4F3'});
	},  function(){
		$(this).css({'background':'#157CC0'});
	} );
	$('.posthead-date').css('background', "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAcCAYAAABLam7PAAAAJklEQVQI12P8//8/AwMDAwMTAxRQi8EIxVikWGAcFpgaOjAwnQEAFG0DXcRxj+kAAAAASUVORK5CYII=') repeat-x scroll left bottom #FEFEFE");
	$('.posthead-date').css('position', 'relative');
	$('.posthead-date').css('font-family', 'Arial,Calibri,Verdana,Geneva,sans-serif');
	$('.posthead-date').css('font-weight', 'bold');
	$('.posthead-date').css('font-size', '12px');
	$('.posthead-date').css('color', '#808080');
	$('.posthead-date').css('border', '1px solid #57A6E9');
	$('.posthead-date').css('height', '16px');
	$('.posthead-date').css('padding', '2px 10px 0px 0px');
	$('.posthead-date').css('margin', '0px 0px 5px 0px');
	$('.posthead-date').css('border-radius', '10px');
	$('.posthead-date a').css('color', '#808080');
	$('.userinfo_noavatar').css('border-radius', '0px');
	$('.userinfo_noavatar').css('background', "linear-gradient(#FDFDFD, #EEE) repeat scroll 0% 0% transparent");
	$('.userinfo_noavatar').css('border-width', "2px 1px 1px");
	$('.userinfo_noavatar').css('border-color', "#57A6E9 #E9E9E9 #E9E9E9");
	$('.first.barssize.bluegr').css('background', "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAhCAIAAADGT2WLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACfSURBVFhHzc5FCgIAAEXBf0ZRQcXCBjHB24mJ3dgrsbAbc+M1HswBRtNfikOTX5IDthl/ExwafeIcGr5jHBq8ohywTf8Z4VDvEeZQ9x7iUOcW5FD7GuBQ6+LnUPPs41Dj5OVQ/ejhgG1qBzeHqnsXhyo7J4fKWweHShs7h4prG4cKKyuH8ksLB2yTW5o5lF2YOJSZGzlgm/TMwEHazAx/bafKjTx67C4AAAAASUVORK5CYII=') repeat-x scroll 0px 4px #FFF");
	$('.first.barssize.bluegr').css('border-top', '1px solid #739301');
	$('.first.barssize.bluegr').css('border-bottom', '1px solid #739301');
	$('.first.barssize.bluegr').css('margin-top', '15px');
	$('.first.barssize.bluegr').css('margin-bototm', '215px');
	$('.first.barssize.bluegr li a').css('color', '#003c70');
	$('.first.barssize.bluegr li a').hover(function(){
		$(this).css({'background':'#E6FF99 none no-repeat 0 0'});
	},  function(){
		$(this).css({'background':"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAhCAIAAADGT2WLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACfSURBVFhHzc5FCgIAAEXBf0ZRQcXCBjHB24mJ3dgrsbAbc+M1HswBRtNfikOTX5IDthl/ExwafeIcGr5jHBq8ohywTf8Z4VDvEeZQ9x7iUOcW5FD7GuBQ6+LnUPPs41Dj5OVQ/ejhgG1qBzeHqnsXhyo7J4fKWweHShs7h4prG4cKKyuH8ksLB2yTW5o5lF2YOJSZGzlgm/TMwEHazAx/bafKjTx67C4AAAAASUVORK5CYII=') repeat-x scroll 0px 4px #FFF"});
	} );
	$('.blockhead').css('background', '#DBF043');
	$('.textcontrols').css('background', 'none');
	$('.threadlisthead').css('background', '#2D89C8');
	$('.postlist').css('top', "-25px");
});