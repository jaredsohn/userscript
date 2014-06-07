// ==UserScript==
// @name           Ikariam (Super)Market
// @namespace      http://aubergineanode.com/ikariam/ikariamsupermarket
// @description    Displays buy and sell orders for each resource together and allows quickly switching between resources without reloading the page.
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php?*view=branchOffice*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
//
// @history      0.04 Added support for pagination (more than 10 offers are available).  Clicking a pagination link will reload the data in the appropriate offer section.
// @history      0.03 Added support for sorting, so any of the available sorting options can now be clicked and the page will reload with all offers sorted by that option.  (Does anyone ever actually sort by anything other than price?  I don't.)
// @history      0.02 Initial version
// ==/UserScript==

ScriptUpdater.check(67519, '0.04')

config = {
  debug: false
};

// We don't need to init IkaTools because we only need access to its "static" methods.
// This makes things a little faster, since it won't try to record city/building/military data.
  
function curry(f) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return f.apply(this, args.concat([].slice.call(arguments, 0)));
  };
}
  
function curry_scope(f, scope) {
  var args = [].slice.call(arguments, 2);
  return function () {
    return f.apply(scope, args.concat([].slice.call(arguments, 0)));
  };
}

function debug(message) {
  if (config.debug && unsafeWindow.console) {
    unsafeWindow.console.log("ISM: " + message);
  }
};

IkariamSuperMarketOffers = function(cityId, position, resource, range, orderBy, parentNode) {
  this.buyHeader = $('<h3 class="header"><span class="textLabel">Acheter</span></h3>');
  this.buyOffersDiv = $('<div class="ISM_offers_div ISM_loading content"></div>');
  this.buyFooter = $('<div class="footer"/>');
  this.sellHeader = $('<h3 class="header"><span class="textLabel">Vendre</span></h3>');
  this.sellOffersDiv = $('<div class="ISM_offers_div ISM_loading content"></div>');
  this.sellFooter = $('<div class="footer"/>');
  
  parentNode
      .append(this.buyHeader)
      .append(this.buyOffersDiv)
      .append(this.buyFooter)
      .append(this.sellHeader)
      .append(this.sellOffersDiv)
      .append(this.sellFooter);
  
  this.buyLoad = {
      url: 'view=branchOffice&id=' + cityId + '&position=' + position + (range ? ('&range=' + range) : '') + (orderBy ? ('&orderBy=' + orderBy) : '') + '&searchResource=' + resource + '&type=444',
      complete: false,
      started: false,
      timerId: 0,
      node: this.buyOffersDiv,
  };
  this.sellLoad = {
      url: 'view=branchOffice&id=' + cityId + '&position=' + position + (range ? ('&range=' + range) : '') + (orderBy && orderBy != 'portLevelAsc' && orderBy != 'portLevelDesc' ? ('&orderBy=' + orderBy) : '') + '&searchResource=' + resource + '&type=333',
      complete: false,
      started: false,
      timerId: 0,
      node: this.sellOffersDiv,
  };
};

// We delay loading initially so it looks like a human might actually be 
// quickly flipping through all the available offers.  Not that you actually 
// can do it at one a second, as GF servers are helliously slow.
IkariamSuperMarketOffers.prototype.startLoadingOffers = function(buyLoadDelay, sellLoadDelay) {
  buyLoadDelay = buyLoadDelay || 0;
  sellLoadDelay = sellLoadDelay || 0;
  this._startLoadingOffer(this.buyLoad, buyLoadDelay);
  this._startLoadingOffer(this.sellLoad, sellLoadDelay);
  debug("Starting load");
};

IkariamSuperMarketOffers.prototype._startLoadingOffer = function(loadInfo, delay) {
  if (loadInfo.complete || loadInfo.started) {
    return;
  }
  
  if (loadInfo.timerId) {
  	debug("Cancelling time: " + timerId);
    window.clearTimeout(loadInfo.timerId);
  }
  
  loadInfo.node.html('loading ...');
	loadInfo.node.addClass('ISM_loading');
  loadInfo.timerId = window.setTimeout(curry_scope(this._loadOffers, this, loadInfo), delay);
};

IkariamSuperMarketOffers.prototype._loadOffers = function(loadInfo) {
  loadInfo.started = true;
  var url = 'http://' + IkaTools.getDomain() + '/index.php?' + loadInfo.url;
  debug('Loading: ' + url);
  IkaTools.getRemoteDocument(url, curry_scope(this._offersLoaded, this, loadInfo));
};

IkariamSuperMarketOffers.prototype._offersLoaded = function(loadInfo, responseDocument) {
  debug("Document loaded: " + responseDocument.title);
  var offerTable = $('.tablekontor:eq(1)', responseDocument);
  var paginationLinks = $('.paginator a', offerTable);
  var self = this;
  paginationLinks.each(function() {
  	var link = $(this);
  	var url = link.attr('href').substring(1);
  	link.attr('href', 'javascript:void(0)');
  	link.click(function() {
  		loadInfo.url = url;
  		loadInfo.complete = false;
  		loadInfo.started = false;
  		loadInfo.timerId = 0;
  		self._startLoadingOffer(loadInfo, 0);
  	});
  });
  
  loadInfo.node.html("");
  loadInfo.node.removeClass("ISM_loading");
  loadInfo.node.append(offerTable);
  
  loadInfo.completed = true;
  loadInfo.timerId = 0;
};


IkariamSuperMarket = function() {
};

IkariamSuperMarket.prototype.init = function() {
  if (IkaTools.getView() == 'branchOffice') {
    debug("Processing branch office view");
    this.addStyles();
    this.prepareScreen();
    this.startLoadingAllOffers();
  }
};

IkariamSuperMarket.prototype.addStyles = function() {
  GM_addStyle('.ISM_yui_nav { text-align: center }');
  GM_addStyle('.ISM_loading { text-align: center; font-size: 22px; }');
  GM_addStyle('.ISM_offer_display { display:none; }');
  GM_addStyle('.ISM_offer_display_visible { display:block; }');
};

IkariamSuperMarket.prototype.prepareScreen = function() {
	// We have to get these from the form because on POST request (such as updates
	// of your own offers), IkaTools can't get these from the document url).
  var cityId = $('#finder input[name="id"]').val();
  var position = $('#finder input[name="position"]').val();
  var range = $('#finder input[name="range"] option:selected').val();
  var orderMatch = /[?&]orderBy=([^?&]+)/i.exec(document.location.href);
  var order = orderMatch ? orderMatch[1] : null;
  debug('Forms vars: cityId: ' + cityId + ' position: ' + position + ' range: ' + range + ' order: ' + order);
  
  // Remove the search form
  $('#finder').parent().remove();

  // Find and clear out the results table
  this.mainOfferTable = $('.tablekontor:eq(1)').parent().parent().parent();
  this.mainOfferTable.html("");
  this.mainOfferTable.removeClass('contentBox01h');

  // Put in new content  
  var selectorDiv = $('<div/>')
  var selectorList = $('<ul class="yui-nav ISM_yui_nav"/>');
  var selectorList2 = $('<ul class="yui-nav  ISM_yui_nav"/>');
  var navset = $('<div class="yui-navset"/>');
  var navset2 = $('<div class="yui-navset"/>');
  var contentDiv = $('<div class="contentBox01h"/>');
  
  navset.append(selectorList);
  navset2.append(selectorList2);
  selectorDiv.append(navset);
  selectorDiv.append(navset2);
  this.mainOfferTable.append(selectorDiv);
  this.mainOfferTable.append(contentDiv);
  
  var wineSelector = $('<li id="ISM_wine_selector" class="ISM_selector selected"><a title="Vin" href="javascript:void(0);"><em><img src="/skin/resources/icon_wine.gif" width="12px" height="10px"/> Vin</em></a></div>');
  var marbleSelector = $('<li id="ISM_marble_selector" class="ISM_selector"><a title="Marbre" href="javascript:void(0);"><em><img src="/skin/resources/icon_marble.gif" width="12px" height="10px"/> Marbre</em></a></div>');
  var crystalSelector = $('<li id="ISM_crystal_selector" class="ISM_selector"><a title="Cristal" href="javascript:void(0);"><em><img src="/skin/resources/icon_crystal.gif" width="12px" height="10px"/> Cristal</em></a></div>');
  var sulphurSelector = $('<li id="ISM_sulphur_selector" class="ISM_selector"><a title="Soufre" href="javascript:void(0);"><em><img src="/skin/resources/icon_sulfur.gif" width="12px" height="10px"/> Soufre</em></a></div>');
  var woodSelector = $('<li id="ISM_wood_selector" class="ISM_selector"><a title="Bois" href="javascript:void(0);"><em><img src="/skin/resources/icon_wood.gif" width="12px" height="10px"/> Bois</em></a></div>');
  
  selectorList.append(wineSelector);
  selectorList.append(marbleSelector);
  selectorList.append(crystalSelector);
  selectorList2.append(sulphurSelector);
  selectorList2.append(woodSelector);
  
  var wineOffersDiv = $('<div id="ISM_wine_display" class="ISM_offer_display ISM_offer_display_visible contentBox01h"/>');
  var marbleOffersDiv = $('<div id="ISM_marble_display" class="ISM_offer_display contentBox01h"/>');
  var crystalOffersDiv = $('<div id="ISM_crystal_display" class="ISM_offer_display contentBox01h"/>');
  var sulphurOffersDiv = $('<div id="ISM_sulphur_display" class="ISM_offer_display contentBox01h"/>');
  var woodOffersDiv = $('<div id="ISM_wood_display" class="ISM_offer_display contentBox01h"/>');
  
  contentDiv.append(wineOffersDiv)
      .append(marbleOffersDiv)
      .append(crystalOffersDiv)
      .append(sulphurOffersDiv)
      .append(woodOffersDiv);
  
  this.mainOfferTable = contentDiv;
  
  var wineOffersHandler = new IkariamSuperMarketOffers(cityId, position, 1, range, order, wineOffersDiv);
  var marbleOffersHandler = new IkariamSuperMarketOffers(cityId, position, 2, range, order, marbleOffersDiv);
  var crystalOffersHandler = new IkariamSuperMarketOffers(cityId, position, 3, range, order, crystalOffersDiv);
  var sulphurOffersHandler = new IkariamSuperMarketOffers(cityId, position, 4, range, order, sulphurOffersDiv);
  var woodOffersHandler = new IkariamSuperMarketOffers(cityId, position, 'resource', range, order, woodOffersDiv);
  
  this.wineInfo = {
      selector: wineSelector,
      offersDiv: wineOffersDiv,
      handler: wineOffersHandler,
  };
  this.marbleInfo = {
      selector: marbleSelector,
      offersDiv: marbleOffersDiv,
      handler: marbleOffersHandler,
  };
  this.crystalInfo = {
      selector: crystalSelector,
      offersDiv: crystalOffersDiv,
      handler: crystalOffersHandler,
  };
  this.sulphurInfo = {
      selector: sulphurSelector,
      offersDiv: sulphurOffersDiv,
      handler: sulphurOffersHandler,
  };
  this.woodInfo = {
      selector: woodSelector,
      offersDiv: woodOffersDiv,
      handler: woodOffersHandler,
  };
  
  wineSelector.click(curry_scope(this._switchVisibleOffers, this, this.wineInfo));
  marbleSelector.click(curry_scope(this._switchVisibleOffers, this, this.marbleInfo));
  crystalSelector.click(curry_scope(this._switchVisibleOffers, this, this.crystalInfo));
  sulphurSelector.click(curry_scope(this._switchVisibleOffers, this, this.sulphurInfo));
  woodSelector.click(curry_scope(this._switchVisibleOffers, this, this.woodInfo));
};

IkariamSuperMarket.prototype.startLoadingAllOffers = function() {
  this.wineInfo.handler.startLoadingOffers(0, 1000);
  this.marbleInfo.handler.startLoadingOffers(2000, 3000);
  this.crystalInfo.handler.startLoadingOffers(4000, 5000);
  this.sulphurInfo.handler.startLoadingOffers(6000, 7000);
  this.woodInfo.handler.startLoadingOffers(8000, 9000);
};

IkariamSuperMarket.prototype._switchVisibleOffers = function(resourceInfo) {
  this._unselect(this.wineInfo);
  this._unselect(this.marbleInfo);
  this._unselect(this.crystalInfo);
  this._unselect(this.sulphurInfo);
  this._unselect(this.woodInfo);
  
  resourceInfo.selector.addClass("selected");  
  resourceInfo.offersDiv.addClass('ISM_offer_display_visible');
  
  resourceInfo.handler.startLoadingOffers(0, 0);
}

IkariamSuperMarket.prototype._unselect = function(resourceInfo) {
  resourceInfo.selector.removeClass('selected');
  resourceInfo.offersDiv.removeClass('ISM_offer_display_visible');
};

new IkariamSuperMarket().init();