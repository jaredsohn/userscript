// ==UserScript==
// @name           ChainReactionCycles Result Filter Enhancement
// @namespace      http://userscripts.org/users/74338
// @include        http://www.chainreactioncycles.com/SearchResults.aspx*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


try{
    var getIDs  = function(str, isBrand) {
    var idRegex = new RegExp((isBrand ? 'BrandIDs' : 'CategoryIDs') + '=(\\d+(,|$|&|#))*', 'gi');
    var match   = idRegex.exec(str);
    
    if (!match) {
      return [];
    }
    
    var matches = match[0].split(/=|,|&|#/).splice(1)
    
    while(matches.indexOf('') >= 0){
      matches.splice(matches.indexOf(''));
    }
    
    return matches;
  }

  var brands     = getIDs(window.location.href, true);
  var categories = getIDs(window.location.href, false);

  $('.FilterContent .LinkCell').click(function(event){
    var $this   = $(this);
    var $filter = $this.find('span:first');
    var isBrand = $this.prevAll('#PnlBrandFilterHeading').length == 1;
    var refIDs  = isBrand ? brands : categories;
    
    if ($filter.hasClass('SelectedText')) {
      var ids    = getIDs($this.find('a:first').attr('href'), isBrand);
      for(var i = 0; i < refIDs.length; i++) {
        if (ids.indexOf(refIDs[i]) < 0) {
          refIDs.splice(i);
          break;
        }
      }
      $filter.removeClass('SelectedText').addClass('Text');
      $this.find('img:first').attr('src', '/Interface/Icons/SearchFilterUnselectedCheckbox.gif');
    } else {
      refIDs.push($this.find('a:first').attr('href').match(/\d+$/)[0]);
      $filter.removeClass('Text').addClass('SelectedText');
      $this.find('img:first').attr('src', '/Interface/Icons/SearchFilterSelectedCheckbox.gif');
    }
    
    event.preventDefault();
  });

  $('<div class="LinkCell"><a title="Click to apply the filter" class="Link" href="#" rel="nofollow"><span class="Text">Apply Filter</span></a></div>').insertBefore('.FilterContent .Heading:first').click(function(event){
    var search = window.location.search.replace(/(CategoryIDs|BrandIDs)=(\d+(,|$|&))*/gi, '').replace(/(\?|&)$/, '');
    var href = '/SearchResults.aspx' + (search ? search + '&' : '?');
    
    if (brands.length > 0) {
      href += 'BrandIDs=' + brands.join(',') + '&';
    }
    
    if (categories.length > 0) {
      href += 'CategoryIDs=' + categories.join(',');
    }
    
    window.location.href = href + window.location.hash;
    event.preventDefault();
  });
}
catch(e)
{
  alert('ERROR:' + e);
}