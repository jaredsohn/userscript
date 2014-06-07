// ==UserScript==
// @name       Trello Label Legend
// @namespace  http://www.markmelville.net/
// @version    0.4
// @description  Adds a legend for a Trello board's labels to the board header.
// @include    https://trello.com/*
// @copyright  2013+, Mark Melville
// @icon       http://www.markmelville.net/userscripts/trell/icon32.ico
// @updateURL  http://userscripts.org/scripts/source/155520.meta.js
// ==/UserScript==
function exec(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  document.body.removeChild(script); // clean up
}
exec(function() {
    
    var labelColors = ['green','yellow','orange','red','purple','blue'];
  
  var messingWithLabels = false;
  function tryRenderLegend() {
      if ($('a.js-close-popover:visible').length) return; // leave if there are dialogs open
      if (messingWithLabels || !$('#board-header #legend').length) { //only render if there's not one, or the labels may have changed
          $('a.js-open-board-menu-sidebar').click();
          var labelsLink = $('a.js-labels');
          if (!labelsLink.length) return;
          labelsLink.click();
          drawLegend();
          $('a.js-close-popover').click();
      }
  }
    
  function drawLegend() {
      var labels = $("form.edit-labels > div");
      if (!labels.length) return;
      var staticLabels = labels.length == 1 && labels.hasClass('labels-static');
      if (staticLabels) {
      	labels = labels.find("p");
      }
      // add legend to the header
      var legend = $('#board-header #legend');
      if (!legend.length) {
          legend = $('<div id="legend"></div>').addClass('board-header-btn').css('float','left').appendTo(document.getElementById('board-header'));
      }
      legend.empty();
      labels.each(function(i){
          var labelDiv = $(this);
          legendItem = $('<div></div>').css({ 'float': 'left', margin: '0px 8px'}).appendTo(legend[0]);
          legendLink = $('<a href="#" class="name js-toggle-label-filter" name="' + labelColors[i] + '"></a>').appendTo(legendItem[0]);
          // add the color box
          var colorBox = staticLabels ? $("<div></div>").attr('class', labelDiv.attr('class')).text("\xa0") : labelDiv.find('div.card-label').clone().text(i+1);
          colorBox.css('float','left').appendTo(legendLink[0]);
          // add the text
          var input = labelDiv.find('input');
          var labelValue = (staticLabels ? labelDiv.text().replace(/ /g,'') : input.val()) || '(No name)';
          $('<span></span>').css('float','left').css('line-height','37px').text(labelValue).appendTo(legendLink[0])
      });
      updateFilterFromSidepanel();
      messingWithLabels = false;
  }
    // notify when user may be changing labels
    $('body').on('click', 'a.js-labels', function() {
        messingWithLabels = true;
    });
    // wireup the legend to filter by that color when clicked
    $('body').on('click', '#legend a.js-toggle-label-filter', function() {
        var clickedLabel = $(this);
        updateFilterFromSidepanel(function(filterLabels) {
        	filterLabels.find('a.js-toggle-label-filter[name="' + clickedLabel.attr('name') + '"]').click();   
        });
        /*
        $('a.js-filter-cards').click();
        var filterLabels = $('ul.pop-over-label-list');
        filterLabels.find('a.js-toggle-label-filter[name="' + clickedLabel.attr('name') + '"]').click();
        filterLabels = filterLabels.clone();
        $('a.js-close-popover').click();
        doLegendFilterIndicators(filterLabels);
        */
        return false;
    });
    
    function updateFilterFromSidepanel(actionWhileOpen) {
        $('a.js-filter-cards').click();
        var filterLabels = $('ul.pop-over-label-list');
        if (actionWhileOpen) actionWhileOpen(filterLabels);
        filterLabels = filterLabels.clone();
        $('a.js-close-popover').click();
        doLegendFilterIndicators(filterLabels);
    }
    
    function doLegendFilterIndicators(labelFilters) {
        var colorFilterMap = [];
        labelFilters.find('a.js-toggle-label-filter').each(function() {
            var labelfilter = $(this);
            if (labelfilter.parent('li').hasClass('active')) colorFilterMap.push(labelfilter.attr('name'));
        });
        if (colorFilterMap.length) {
            $('#legend a.js-toggle-label-filter').parent().css('opacity', .25);
            for(var i=0; i < colorFilterMap.length; i++)
            {
            	$('#legend a.js-toggle-label-filter[name="' + colorFilterMap[i] + '"]').parent().css('opacity', 1);
            }            
        }
        else {
        	$('#legend a.js-toggle-label-filter').parent().css('opacity', 1);
        }
    };
    
    function getFilterLabelByColor(list, color) {
        return list.find('a.js-toggle-label-filter[name="' + color + '"]')
    }
    
  var legendTimeout = setInterval(tryRenderLegend, 500);
    
    var filterPanelTimeout = setInterval(function() {
        var filterPanel = $('.js-filter-search-results:not(.wired-for-clicks)');
        if (filterPanel.length) {
            filterPanel.on('click', 'a.js-toggle-label-filter, a.js-clear-all', function () {
              setTimeout(function() { doLegendFilterIndicators($('ul.pop-over-label-list').clone()); }, 20);
            });
        	filterPanel.addClass('wired-for-clicks');   
        }
    }, 350);
});