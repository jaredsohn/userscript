// ==UserScript==
// @name		Daily status extension
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require		http://travel-agency.googlecode.com/svn/branches/js/jquery.ui.core.min.js
// @require		http://travel-agency.googlecode.com/svn/branches/js/jquery.ui.widget.min.js
// @require		http://travel-agency.googlecode.com/svn/branches/js/jquery.ui.datepicker.min.js
// @resource css_ui http://travel-agency.googlecode.com/svn/branches/css/jquery-ui-1.8.18.custom.css
// @resource    ui-bg_diagonals-thick_18_b81900_40x40.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_diagonals-thick_18_b81900_40x40.png
// @resource    ui-bg_glass_100_f6f6f6_1x400.png                http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_100_f6f6f6_1x400.png
// @resource    ui-bg_diagonals-thick_20_666666_40x40.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_diagonals-thick_20_666666_40x40.png
// @resource    ui-bg_glass_65_ffffff_1x400.png                 http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_65_ffffff_1x400.png
// @resource    ui-bg_gloss-wave_35_f6a828_500x100.png          http://strd6.com/stuff/jqui/theme/images/ui-bg_gloss-wave_35_f6a828_500x100.png
// @resource    ui-icons_222222_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_222222_256x240.png
// @resource    ui-bg_flat_10_000000_40x100.png                 http://strd6.com/stuff/jqui/theme/images/ui-bg_flat_10_000000_40x100.png
// @resource    ui-icons_ef8c08_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ef8c08_256x240.png
// @resource    ui-icons_ffd27a_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ffd27a_256x240.png
// @resource    ui-bg_glass_100_fdf5ce_1x400.png                http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_100_fdf5ce_1x400.png
// @resource    ui-icons_228ef1_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_228ef1_256x240.png
// @resource    ui-icons_ffffff_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ffffff_256x240.png
// @resource    ui-bg_highlight-soft_75_ffe45c_1x100.png        http://strd6.com/stuff/jqui/theme/images/ui-bg_highlight-soft_75_ffe45c_1x100.png
// @resource    ui-bg_highlight-soft_100_eeeeee_1x100.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_highlight-soft_100_eeeeee_1x100.png
// @author		Mixey
// @namespace	http://issuemanager.com/
// @include		http://issuemanager.*.com/*
// @version		1.0.0
// ==/UserScript==

var request;

function redesignPage()
{
	try{
		var resources = {
	      'ui-bg_diagonals-thick_18_b81900_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_18_b81900_40x40.png'), 
	      'ui-bg_glass_100_f6f6f6_1x400.png': GM_getResourceURL('ui-bg_glass_100_f6f6f6_1x400.png'),
	      'ui-bg_diagonals-thick_20_666666_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_20_666666_40x40.png'),
	      'ui-bg_glass_65_ffffff_1x400.png': GM_getResourceURL('ui-bg_glass_65_ffffff_1x400.png'),
	      'ui-bg_gloss-wave_35_f6a828_500x100.png': GM_getResourceURL('ui-bg_gloss-wave_35_f6a828_500x100.png'),
	      'ui-icons_222222_256x240.png': GM_getResourceURL('ui-icons_222222_256x240.png'),
	      'ui-bg_flat_10_000000_40x100.png': GM_getResourceURL('ui-bg_flat_10_000000_40x100.png'),
	      'ui-icons_ef8c08_256x240.png': GM_getResourceURL('ui-icons_ef8c08_256x240.png'),
	      'ui-icons_ffd27a_256x240.png': GM_getResourceURL('ui-icons_ffd27a_256x240.png'),
	      'ui-bg_glass_100_fdf5ce_1x400.png': GM_getResourceURL('ui-bg_glass_100_fdf5ce_1x400.png'),
	      'ui-icons_228ef1_256x240.png': GM_getResourceURL('ui-icons_228ef1_256x240.png'),
	      'ui-icons_ffffff_256x240.png': GM_getResourceURL('ui-icons_ffffff_256x240.png'),
	      'ui-bg_highlight-soft_75_ffe45c_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_ffe45c_1x100.png'),
	      'ui-bg_highlight-soft_100_eeeeee_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_100_eeeeee_1x100.png')
	    };
		
		$head_style = $('head').find('style');
		var css = GM_getResourceText ('css_ui');
	    $.each(resources, function(resourceName, resourceUrl) {
	      css = css.replace( 'images/' + resourceName, resourceUrl);
	    });
	    $head_style.append(css);
	    
		$oDiv = $(document.createElement('div'));
		$oDiv.attr({id:"datepicker", style: "{font-size: 11px;}"});
		$oDiv.datepicker({
			dateFormat: "yy-mm-dd",
			firstDay: 1,
			onSelect: function(selectedDate) {
				unsafeWindow.timesheets = {};	
				$("#celDetails").empty();
				$("#dt").val(selectedDate);
				if (request != null)
					request.abort();
				request = $.ajax({
		             type: "GET",
		             data: "cmd=addrep"
		            	 + "&mname=" + $("input[name='mname']").val()
		            	 + "&ename=" + $("input[name='ename']").val()
		            	 + "&date=" + selectedDate,
		             url: "/ds/dsr.pl",
		             cache: false,
		             success: function(html){
		            	 var tble = /(span>)(<table.*?<\/table>)/g.exec(html.replace(/\r|\n/g, ''));
		            	 if (tble && tble.length > 1)
		            		 $("#celDetails").append(tble[2]);
		            	 else
		            		 $("#celDetails").append("<span style='color:red; font-size: 24px;'>No Data</span>");
		             }
		          });
			}});

		$oTd = $("#dt").parent();
//		$oTd.empty();
		$oTd.append($oDiv);
		
		$oTble = $(document.createElement('table'));
		$oTble.append("<tr><td id='celMain' valign='top'></td><td id='celDetails' valign='top'></td></tr>");
		$("body").append($oTble);
		
		$("#celMain").append($("form"));
		
		var tble = /(span>)(<table.*?<\/table>)/g.exec($("body").html().replace(/\r|\n/g, ''));
		if (tble && tble.length > 1) {
			$("#celDetails").append(tble[2]);
			$("body > table").first().empty();
		} else {
			$("#celDetails").append("<span style='color:red; font-size: 24px;'>No Data</span>");
		}
		
		$("#project [value='2012 OTC Hub Core']").attr("selected", "selected");
		$("input[name='hours']").val("8");
		$("input[name='start']").parent().parent().hide();
		$("input[name='end']").parent().parent().hide();
		
		// fix event model for datepicker control
		setTimeout (cleanUpCrappyEventHandling, 100);
	} catch (ex) {
		alert(ex)
	}
}

function cleanUpCrappyEventHandling () {
    var nodesWithBadEvents  = $(
        "div.ui-datepicker td[onclick^='DP'], div.ui-datepicker a[onclick^='DP']"
    );
    nodesWithBadEvents.each ( function () {
        var jThis       = $(this);
        var fubarFunc   = jThis.attr ("onclick");

        fubarFunc       = fubarFunc.replace (/return\s+\w+;/i, "");

        jThis.removeAttr ("onclick");
        jThis.click ( function () {
            eval (fubarFunc);
            cleanUpCrappyEventHandling ();
        } );
    } );
}


window.main = function ()
{  
	redesignPage();		
}

main();

