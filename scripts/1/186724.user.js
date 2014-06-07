// ==UserScript==
// @name       Steam Cards Price
// @version    0.3.4
// @description Show minimals price steam card
// @updateURL http://userscripts.org/scripts/source/186724.user.js
// @downloadURL http://userscripts.org/scripts/source/186724.user.js
// @include    http://steamcommunity.com/id/*/badges*
// @include    http://steamcommunity.com/profiles/*/badges*
// @include    http://steamcommunity.com/market/
// @include    http://steamcommunity.com/id/*/inventory*
// @include    http://steamcommunity.com/profiles/*/inventory*
// @include    http://steamcommunity.com/id/*/gamecards*
// @include    http://steamcommunity.com/profiles/*/gamecards*
// @match    http://steamcommunity.com/id/*/badges*
// @match    http://steamcommunity.com/profiles/*/badges*
// @match    http://steamcommunity.com/market/
// @match    http://steamcommunity.com/id/*/inventory*
// @match    http://steamcommunity.com/profiles/*/inventory*
// @match    http://steamcommunity.com/id/*/gamecards*
// @match    http://steamcommunity.com/profiles/*/gamecards*
// @grant       none
// ==/UserScript==

jQuery(document).ready(function() {
  var check = window.location.pathname.match(/\/gamecards\/(\d+)/);
  if (check) {
    var steam_cart = {
      sum: {
        all: 0,
        exist: 0,
        left: 0
      },
      init: function() {
        steam_cart.obj = jQuery('.badge_title');
        steam_cart.title = steam_cart.obj.html().replace('Значок ', '');
        steam_cart.exist();
        steam_cart.left();
        return true;
      },
      exist: function() {
        jQuery('.badge_card_set_card').each(function(i, card) {
          var c = jQuery.trim(jQuery(card).children('.badge_card_set_text').children('.badge_card_set_text_qty').html());
          if (c)
            c = parseInt(c.replace('(', '').replace(')', ''));
          else
            c = 0;
          if (c > 0) {
            var obj = jQuery(card).children('.badge_card_set_text').children('.badge_card_set_text_qty'),
                    card_name = jQuery(card).children('.game_card_ctn'),
                    card_image = card_name.children('.gamecard').attr('src'),
                    card_name = card_name.attr('onclick').replace('GameCardArtDialog( "', '').split('", "')[0];
            jQuery.ajax({
              url: "http://steamcommunity.com/market/search",
              type: "GET",
              dataType: "html",
              data: {
                q: card_name
              },
              success: function(data) {
                var data = data.match(/http\:\/\/steamcommunity\.com\/market\/listings\/([^"]+)/img);
                jQuery(data).each(function(i, search_link) {
                  var search_link = search_link.replace('<a class="market_listing_row_link" href="', '').replace('">', '');
                  jQuery.ajax({
                    url: search_link,
                    type: "GET",
                    dataType: "html",
                    success: function(data) {
                      if (data.indexOf(card_image) >= 0) {
                        var price = data.match(/<span[^<>]*market_listing_price_with_fee[^<>]*>[^<>]*((\&\#\d+\;|\$)([0-9\.]+)[^<>]*)<\/span>/im)[1].trim().match(/(\&\#\d+\;|\$)([0-9\.]+)(\b.*$)/i);
                        steam_cart.sum.all += parseFloat(price[2]);
                        steam_cart.sum.exist += parseFloat(price[2]);
                        obj.html('(' + price[1] + (parseFloat(price[2]) * c).toFixed(2) + ' | ' + c + ')');
                        steam_cart.obj.html('(' + price[1] + steam_cart.sum.exist.toFixed(2) + ' / ' + steam_cart.sum.all.toFixed(2) + price[3] + ') ' + steam_cart.title);
                      }
                    }
                  });
                });
              }
            });
          }
        });
        return true;
      },
      left: function() {
        steam_cart.obj2 = jQuery('.badge_card_to_collect_header');
        steam_cart.title2 = steam_cart.obj2.html();
        jQuery('.badge_card_to_collect').each(function(card) {
          var childrbtn = jQuery(this).children('.badge_card_to_collect_info').children('.badge_card_to_collect_links').children('.btn_medium:last');
          jQuery.ajax({
            url: childrbtn.attr('href'),
            type: "GET",
            dataType: "html",
            success: function(data) {
              var price = data.match(/<span[^<>]*market_listing_price_with_fee[^<>]*>[^<>]*((\&\#\d+\;|\$)([0-9\.]+)[^<>]*)<\/span>/im)[1].trim();
              childrbtn.children('span').html(price);
              var price = price.match(/(\&\#\d+\;|\$)([0-9\.]+)(\b.*$)/i);
              steam_cart.sum.all += parseFloat(price[2]);
              steam_cart.sum.left += parseFloat(price[2]);
              steam_cart.obj2.html('(' + price[1] + steam_cart.sum.left.toFixed(2) + price[3] + ') ' + steam_cart.title2);
              steam_cart.obj.html('(' + price[1] + steam_cart.sum.exist.toFixed(2) + ' / ' + steam_cart.sum.all.toFixed(2) + price[3] + ') ' + steam_cart.title);
            }
          });
        });
        return true;
      }
    };
    steam_cart.init();
  }
  var check = window.location.pathname.match(/\/market/);
  if (check) {
    var summsvvalprice = 0;
    var summsvvalcurprice = 0;
    var sumobjtext = 'APRICE';
    var sumcurobjtext = 'PRICE';
    if (jQuery('.market_listing_table_header .market_listing_auction_price').length === 0)
      jQuery('.market_listing_table_header .market_listing_my_price').before(jQuery('.market_listing_table_header .market_listing_my_price').clone().addClass('market_listing_auction_price').html(sumobjtext)).addClass('market_listing_myset_price');
    jQuery('div[id^=mylisting_]').each(function() {
      if (jQuery(this).children('.market_listing_auction_price').length === 0)
        jQuery(this).children('.market_listing_my_price').before(jQuery(this).children('.market_listing_my_price').clone().addClass('market_listing_auction_price')).addClass('market_listing_myset_price');
      var curvalue = jQuery(this).children('.market_listing_myset_price').children('span').children('.market_listing_price').html().trim().match(/(\&\#\d+\;|\$)([0-9\.]+)(\b.*$)/i);
      summsvvalcurprice += parseFloat(curvalue[2]);
      jQuery('.market_listing_table_header .market_listing_myset_price').html(sumcurobjtext + ' (' + curvalue[1] + summsvvalcurprice.toFixed(2) + curvalue[3] + ')');
      var priceobj = jQuery(this).children('.market_listing_auction_price').children('span').children('.market_listing_price');
      var priceobjhead = jQuery('.market_listing_table_header .market_listing_auction_price');
      priceobj.html('0.00');
      var hreflink = jQuery(this).children('.market_listing_item_name_block').children('.market_listing_item_name').children('.market_listing_item_name_link').attr('href');
      jQuery.ajax({
        url: hreflink,
        type: "GET",
        dataType: "html",
        success: function(data) {
          var price = data.match(/<span[^<>]*market_listing_price_without_fee[^<>]*>[^<>]*((\&\#\d+\;|\$)([0-9\.]+)[^<>]*)<\/span>/im)[1].trim();
          priceobj.html(price);
          var price = price.match(/(\&\#\d+\;|\$)([0-9\.]+)(\b.*$)/i);
          summsvvalprice += parseFloat(price[2]);
          priceobjhead.html(sumobjtext + ' (' + price[1] + summsvvalprice.toFixed(2) + price[3] + ')');
        }
      });
    });
  }
  var check = window.location.pathname.match(/\/badges/);
  if (check) {

    var gamecards = {
      game: [],
      curgame: {},
      load: function() {
        if (jQuery('.profile_xp_block').length == 0)
          jQuery('.maincontent').prepend('<div class="profile_xp_block">dfgdf<div>');

        jQuery('.profile_xp_block').append('<div id="badgescrpits_stats"><div>');
        jQuery('.profile_xp_block').append('<div id="badgescrpits_workon"><div>');
        jQuery('.badge_row').each(function(i, badge) {
          var badge_link = jQuery(badge).children('.badge_row_overlay').attr('href'),
                  gameid = badge_link.match(/gamecards\/(\d+)/i);
          if (gameid) {
            gameid = gameid[1];
            game = {};
            game['title'] = jQuery(badge).children('.badge_row_inner').children('.badge_title_row').children('.badge_title');
            game['text'] = game['title'].html().split('&nbsp;')[0].trim();
            game['link'] = badge_link;
            game['set'] = 0;
            game['sell'] = 0;
            game['buy'] = 0;
            gamecards.game.push(game);
          }
        });
        gamecards.loadgame();
      },
      loadgame: function() {
        if (gamecards.game.length == 0) {
          gamecards.curgame = {};
          jQuery('#badgescrpits_workon').remove();
          return;
        }
        gamecards.curgame = gamecards.game.shift();
        gamecards.curgame.existcard = [];
        jQuery.ajax({
          url: gamecards.curgame.link,
          type: "GET",
          dataType: "html",
          success: function(data) {
            gamecards.curgame.notexistcard = data.match(/http\:\/\/steamcommunity\.com\/market\/listings\/[^"]+/ig);
            var data = data.match(/<div class=\"badge_card_set_card owned\">([\s\S]*?)<div class=\"badge_card_set_text_qty\">\((\d+)\)<\/div>/igm);
            jQuery(data).each(function(i, card) {
              var cardf = {};
              cardf['name'] = card.match(/"GameCardArtDialog\((.*?)\);"/im)[1].split('&quot;')[1].trim();
              cardf['image'] = card.match(/<img class="gamecard" src="([^"]+)/im)[1];
              cardf['count'] = parseInt(card.match(/<div class=\"badge_card_set_text_qty\">\((\d+)\)<\/div>/im)[1]);
              gamecards.curgame.existcard.push(cardf);
            });
            gamecards.loadcard_notexist();
          }
        });
      },
      loadcard_notexist: function() {
        if (gamecards.curgame.notexistcard == null) {
          gamecards.loadcard_exist();
          return;
        }
        if (gamecards.curgame.notexistcard.length == 0) {
          gamecards.loadcard_exist();
          return;
        }
        var card = gamecards.curgame.notexistcard.shift();
        jQuery.ajax({
          url: card,
          type: "GET",
          dataType: "html",
          success: function(data) {
            var price = parseInt(parseFloat(data.match(/<span[^<>]*market_listing_price_with_fee[^<>]*>[^<>]*((\&\#\d+\;|\$)([0-9\.]+)[^<>]*)<\/span>/im)[1].trim().match(/(\&\#\d+\;|\$)([0-9\.]+)(\b.*$)/i)[2]) * 100);
            gamecards.curgame.set += price;
            gamecards.curgame.buy += price;
            gamecards.print_curentgame();
            gamecards.loadcard_notexist();
          }
        });
      },
      loadcard_exist: function() {
        if (gamecards.curgame.existcard.length == 0) {
          gamecards.endprint_curentgame();
          gamecards.loadgame();
          return;
        }
        gamecards.curgame.curcard = gamecards.curgame.existcard.shift();
        gamecards.curgame.curcard.searched = [];
        jQuery.ajax({
          url: "http://steamcommunity.com/market/search",
          type: "GET",
          dataType: "html",
          data: {
            q: gamecards.curgame.curcard.name
          },
          success: function(data) {
            var data = data.match(/http\:\/\/steamcommunity\.com\/market\/listings\/([^"]+)/img);
            jQuery(data).each(function(i, search_link) {
              var search_link = search_link.replace('<a class="market_listing_row_link" href="', '').replace('">', '');
              gamecards.curgame.curcard.searched.push(search_link);
            });
            gamecards.loadcard_exist_searched();
          }
        });
      },
      loadcard_exist_searched: function() {
        if (gamecards.curgame.curcard.searched.length == 0) {
          gamecards.loadcard_exist();
          return;
        }
        var search_link = gamecards.curgame.curcard.searched.shift();
        jQuery.ajax({
          url: search_link,
          type: "GET",
          dataType: "html",
          success: function(data) {
            if (data.indexOf(gamecards.curgame.curcard.image) >= 0) {
              var price = parseInt(parseFloat(data.match(/<span[^<>]*market_listing_price_with_fee[^<>]*>[^<>]*((\&\#\d+\;|\$)([0-9\.]+)[^<>]*)<\/span>/im)[1].trim().match(/(\&\#\d+\;|\$)([0-9\.]+)(\b.*$)/i)[2]) * 100);
              gamecards.curgame.set += price;
              gamecards.curgame.sell += price * gamecards.curgame.curcard.count;
              gamecards.print_curentgame();
              gamecards.loadcard_exist();
            } else
              gamecards.loadcard_exist_searched();
          }
        });
      },
      print_curentgame: function() {
        jQuery(gamecards.curgame.title).html('<span style="font-size: 13px;">(Set: <span class="budget_SET">' + (gamecards.curgame.set / 100).toFixed(2) + '</span> | Sell: <span class="budget_SELL">' + (gamecards.curgame.sell / 100).toFixed(2) + '</span> | Buy: <span class="budget_BUY">' + (gamecards.curgame.buy / 100).toFixed(2) + '</span> )</span> ' + gamecards.curgame.text);
        jQuery('#badgescrpits_workon').html('(Left:' + gamecards.game.length + ') <span style="font-size: 13px;">(Set: <span class="budget_SET">' + (gamecards.curgame.set / 100).toFixed(2) + '</span> | Sell: <span class="budget_SELL">' + (gamecards.curgame.sell / 100).toFixed(2) + '</span> | Buy: <span class="budget_BUY">' + (gamecards.curgame.buy / 100).toFixed(2) + '</span> )</span> ' + gamecards.curgame.text);
      },
      endprint_curentgame: function() {
        if ((gamecards.curgame.set <= gamecards.stats.set || gamecards.stats.set == 0) && gamecards.curgame.buy > 0) {
          gamecards.stats.set = gamecards.curgame.set;
          gamecards.stats.set_text = gamecards.curgame.text;
        }
        var str = '<p>Minimal Set: ' + gamecards.stats.set_text + '( ' + (gamecards.stats.set / 100).toFixed(2) + ' )</p>';
        if ((gamecards.curgame.buy <= gamecards.stats.buy || gamecards.stats.buy == 0) && gamecards.curgame.buy > 0) {
          gamecards.stats.buy = gamecards.curgame.buy;
          gamecards.stats.buy_text = gamecards.curgame.text;
        }
        str += '<p>Minimal Buy: ' + gamecards.stats.buy_text + '( ' + (gamecards.stats.buy / 100).toFixed(2) + ' )</p>';
        if (gamecards.curgame.sell >= gamecards.stats.sell) {
          gamecards.stats.sell = gamecards.curgame.sell;
          gamecards.stats.sell_text = gamecards.curgame.text;
        }
        str += '<p>Maximum Sell: ' + gamecards.stats.sell_text + '( ' + (gamecards.stats.sell / 100).toFixed(2) + ' )</p>';
        jQuery('#badgescrpits_stats').html(str);
      },
      stats: {
        set: 0,
        set_text: '',
        buy: 0,
        buy_text: '',
        sell: 0,
        sell_text: '',
      }
    }
    gamecards.load();
  }
});