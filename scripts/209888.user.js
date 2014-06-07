// ==UserScript==
// @name        Flight Rising Enhancer
// @namespace   MercuryP
// @include     http://flightrising.com/*
// @include     https://flightrising.com/*
// @version     0.5.4
// @grant       none
// @run-at      document-start
// ==/UserScript==

// DISCLAIMER: This script totally doesn't pass lint or follow any sort of good practice or Javascript standards.
//             I'm not really sorry.
//             But I do try to avoid really bad practices by default, so there's that.

//             Comments are provided throughout the script as a general guideline for what's happening.
//             Each module is blocked out by a larger comment (/*s and all caps).

//             Use the provided documentation at http://userscripts.org/scripts/show/181552 for reference on what modules do.
//             Remember that modules can individually be enabled/disabled from the Account Settings page!

//             Enjoy, and let me know if you like this script!



/*--------------------------*/
/* REMOVE HUNGER PERCENTAGE */
/*--------------------------*/
function RemoveHungerPercentage() {
    // Just add a style to set it invisible!
    forceSelect('head', function(sel) { sel.append('<style id="RemoveHungerPercentageStyle" type="text/css">a.clue_nrg > div > span { display: none; }</style>') });
}

/*---------------*/
/* QUICK FRIENDS */
/*---------------*/
function QuickFriends() {
    // Append the friends to the end of requests people send to which one must tend (possibly from a blend of flights including Wind).    
    var appendFriends = function(friends) {
        if ($('#frenscontainer').length == 0)
        {
            $('#frenswin').append('<div id="frenscontainer" style="padding-left: 40px; padding-right: 40px;"><table id="frenstable"></table></div>');
        }
        else
        {
            $('#frenscontainer').html('<table id="frenstable"></table>');
        }
        $('#frenscontainer').append('<div style="height:25px;"></div>');

        for (var friend in friends)
        {
          $('#frenstable').append('<tr><td width="170"><a href="main.php?p=view&tab=userpage&id=' + friends[friend] + '" style="color: #76240f; font-size: 12px; font-weight: bold;">' + friend + '</a></td><td><a href="main.php?p=lair&id=' + friends[friend] + '"><img src="/images/layout/icon_wing.png"></a></td></tr>');
        }
    }

    // Claim the friends button and replicate the existing friends code.
    $("#frensm").off('click');
    $("#frensm").click(function() {
        $('body').append('<div id="frenswin" style="display:none;"></div>');
        $("#frenswin").html('<img src="/images/layout/loading.gif"> loading...');
        $('#frenswin').dialog({
            title: "",
            width: 300,
            minHeight: 25,
            maxHeight: 200,
            modal:false,
            draggable:false,
            resizable:false,
            show: 'blind',
            position: {
                my: 'right top',
                at: 'right bottom',
                of: $('#frensimg')
            },
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog).hide();
                $(".ui-dialog-titlebar", ui.dialog).hide();
            }
        });

        $('#frenswin').dialog('open');
        var data = '';
        $.ajax({
            type: "POST",
            data: data,
            url: "includes/ol/frensreq.php",
            cache:false
        }).done(function(stuff){
            var friendWindow = $("#frenswin");
            friendWindow.html(stuff);
            
            friendWindow.find('div').filter(function() {
                return $(this).css('height') == '25px';
            }).css("height", "10px");
            
            $('#frenswin').append('<div id="frenscontainer" style="padding-left: 40px; padding-right: 40px; text-align: center;"><img src="/images/layout/loading.gif"></div>');
            $('#frenscontainer').append('<div style="height:25px;"></div>');
            
            loadFriends(function(friends) { appendFriends(friends); } );
        });
    });
}

/*----------------*/
/* GEM CALCULATOR */
/*----------------*/
function GemCalculator() {
    // When someone types in the box, do the conversion based on the stored gem rate
    // If they type in something that isn't a number, just clear out the other box.
    var handleInput = function(e)
    {
        var inputBox = $(e.currentTarget);
        var value = parseFloat(inputBox.val());
        var gemRate = parseFloat(getStoredValue('gemRate', gemDefault));
        if (inputBox.is('#gemCalcTreasure'))
        {
          if (!isNaN(value))
              $('#gemCalcGems').val(Math.round(value / gemRate * 10) / 10);
          else
              $('#gemCalcGems').val('');
        }
        else
        {
          if (!isNaN(value))
              $('#gemCalcTreasure').val(gemRate * value);
          else
              $('#gemCalcTreasure').val('');
        }
    }

    gemCalculator = function()
    {
        // If the boxes aren't visible, show them (and create if necessary); if visible, hide them
        if ($('.gemCalculatorInput.on').length == 0)
        {
            $('#login_ach').parent().parent().css('display', 'none');
            $('#bstcount').css('display', 'none');
            if ($('.gemCalculatorInput').length == 0)
            {
                var topSpan = $('<span>');
                var bottomSpan = $('<span>');
                $('#usertab').append(topSpan);
                $('#usertab').append(bottomSpan);
                topSpan.css({position: 'absolute', left: 175, width: 100, top: 57, bottom: ''});
                bottomSpan.css({position: 'absolute', left: 175, width: 100, bottom: 3, top: ''});
                topSpan.html('<input type="text" id="gemCalcTreasure" class="gemCalculatorInput on">');
                bottomSpan.html('<input type="text" id="gemCalcGems" class="gemCalculatorInput on">');
                $('.gemCalculatorInput').css({width: 93, height: 14, "margin-top": 4, "margin-left": 2, background: '#F8F8F8', border: '1px solid #777', "border-radius": 3});
                $('.gemCalculatorInput').on('input', handleInput);
            }
            else
            {
                $('#gemCalcTreasure').parent().css('display', '');
                $('#gemCalcGems').parent().css('display', '');
                $('#gemCalcTreasure').addClass('on');
                $('#gemCalcGems').addClass('on');
            }
        }
        else
        {
            $('#login_ach').parent().parent().css('display', '');
            $('#bstcount').css('display', '');
            $('#gemCalcTreasure').parent().css('display', 'none');
            $('#gemCalcGems').parent().css('display', 'none');
            $('#gemCalcTreasure').removeClass('on');
            $('#gemCalcGems').removeClass('on');
        }
    }

    // Make the gem a trigger for the calculator.
    $('#user_gems').parent().attr('onclick', 'gemCalculator()');
}

/*-------------------*/
/* ATTACHMENT ACCEPT */
/*-------------------*/
function MailAttachmentAccept() { 
    // Hook up the links whenever you load a mailbox page (use ajaxStop to determine if a mailbox page is loaded).
    $(document).ajaxStop(function()
    {
        // Add the function to accept mail attachments.
        this.acceptMailAttachment = function(id)
        {
          // Find the icon element, change it to a loading spinner.  I think this is a nice touch, by the by.
          var attachmentIcon = $($('a[onclick="readpost(' + id + ')"]').parent().parent().find('.clueicon')[0]);
          $(attachmentIcon.find('img')[0]).attr('src', '/images/layout/loading.gif');
        
          // Accept the attachment.  On finish, remove the loading spinner and put in the checkbox.  Accept 'em, check 'em off and delete!
          $.ajax({
            type: "POST",
            data: {id: id, page: "1"},
            url: "includes/ol/mess_cen_take.php",
            cache:false
            }).done(function(data)
                {
                  var index = attachmentIcon.parent().parent().index() - 1;
                  $(attachmentIcon.parent().parent().find('td')[3]).find('div').append(
                    '<div style="width:20px; margin-left:auto; margin-right:auto;">' +
                    '<input type="checkbox" value="1" name="a' + index + '" id="a' + index + '">' +
                    '<input type="hidden" name="i' + index + '" value="' + id + '">' +
                    '</div>'
                  )
                  attachmentIcon.remove();
                }
            );
        }

        // Find all attachments by their icons.
        var attachmentIcons = $('#inbox .clueicon');
        // Make each attachment a link and call the accept mail function when it's clicked.
        for (var i = 0; i < attachmentIcons.length; i++)
        {
          var attachmentIcon = $(attachmentIcons[i]);
          var openMail = $(attachmentIcon.parent().parent().find('.forumlink')[0]).attr('onclick');
          var id = parseInt(/\d+/.exec(openMail)[0]);
          attachmentIcon.find('img').css('cursor', 'pointer');
          attachmentIcon.attr('onclick', 'acceptMailAttachment(' + id + ')');
        }
    });
}

/*----------------------*/
/* AUCTION HOUSE SHARED */
/*----------------------*/
function AuctionHouse() {    
    // Category dropdowns registry.  The id is the dropdown field name.
    this.auctionHouseCategories = 
    {
      food:
      {
        Category:
        {
          id: 'cat',
          All: '',
          Meat: 'meat',
          Seafood: 'seafood',
          Insects: 'insect',
          Plants: 'plant'
        }
      },
      mats:
      {
        Category:
        {
          id: 'cat',
          All: '',
          "Minerals &amp; Ores": 'minerals & ores',
          Organics: 'organics',
          Dragonmade: 'dragonmade'
        }
      },
      app:
      {
        Category:
        {
          id: 'cat',
          All: '',
          Head: 'head',
          Body: 'body',
          Wings: 'wings',
          Legs: 'legs',
          Tail: 'tail',
          "Extras & Accents": 'extras'
        }
      },
      dragons:
      {
        Breed:
        {
          id: 'breed',
          All: '',
          Fae: '1',
          Guardian: '2', 
          Mirror: '3', 
          Pearlcatcher: '4', 
          Ridgeback: '5',
          Tundra: '6',
          Spiral: '7',
          Imperial: '8',
          Snapper: '9',
          Wildclaw: '10',
          Skydancer: '13'
        },
        Gender:
        {
          id: 'gender',
          All: '',
          Male: '0',
          Female: '1'
        },
        "Primary Gene":
        {
          id: 'primegene',
          All: '',
          Basic: '0',
          Iridescent: '1',
          Tiger: '2',
          Clown: '3',
          Speckle: '4'
        },
        "Secondary Gene":
        {
          id: 'secgene',
          All: '',
          Basic: '0',
          Shimmer: '1',
          Stripes: '2',
          "Eye Spot": '3',
          Freckle: '4',
          Seraph: '5'
        },
        "Tertiary Gene":
        {
          id: 'tertgene',
          All: '',
          Basic: '0',
          Circuit: '1',
          Gembond: '4',
          Underbelly: '5'
        }
      },
      battle:
      {
        Element:
        {
          id: 'cat',
          All: '',
          "Non-Elemental": '0',
          Earth: '1',
          Fire: '11',
          Wind: '3',
          Water: '4',
          Shadow: '7',
          Light: '8',
          Lightning: '5',
          Ice: '6',
          Nature: '10',
          Plague: '2',
          Arcane: '9'
        }
      },
      skins:
      {
        Breed:
        {
          id: 'cat',
          All: '',
          Fae: '1',
          Guardian: '2', 
          Mirror: '3', 
          Pearlcatcher: '4', 
          Ridgeback: '5',
          Tundra: '6',
          Spiral: '7',
          Imperial: '8',
          Snapper: '9',
          Wildclaw: '10',
          Skydancer: '13'
        },
        Gender:
        {
          id: 'cat2',
          All: '',
          Male: '0',
          Female: '1'
        }
      },
      other:
      {
        Category:
        {
          id: 'cat',
          All: '',
          Trinkets: 'trinkets',
          "Holiday Items": 'holiday items',
          Chests: 'chests',
          "Dragon Eggs": 'dragon eggs',
          "Specialty Items": 'specialty items'
        }
      }
    }
    
    forceSelect('#super-container div', function(sel) {
        var links = $(sel[1]).find('div a');
    
        $(links[0]).attr('id', 'search_food');
        $(links[1]).attr('id', 'search_mats');
        $(links[2]).attr('id', 'search_app');
        $(links[3]).attr('id', 'search_dragons');
        $(links[4]).attr('id', 'search_fam');
        $(links[5]).attr('id', 'search_battle');
        $(links[6]).attr('id', 'search_skins');
        $(links[7]).attr('id', 'search_other');
    });
}

/*----------------*/
/* PRICE PER UNIT */
/*----------------*/
function PricePerUnit() {  
    // The PricePer function grabs all the prices and does calculations on them when Auction House pages load.
    var pricePer = function(descending)
    {
      // Get the listed sales.
      var sales = $('div[id^="sale"]');
      var isFood = $($('#search_food')[0]).attr('style').indexOf('font-weight: bold') > -1;
      
      var pricesPer = [];
      
      for (var i = 0; i < sales.length; i++)
      {
        // For each sale, get the item counts and pricing - then divide!
        var sale = $(sales[i]);
        var count = $(sale.find('div span span')[0]).text().trim();
        if (isFood)
        {
          var id = $(sales.find('div > span > span')[0]).text();
          
          var foodRate = getFoodPointsById(id);
          if (foodRate)
            count *= foodRate;
        }
        var priceEl = $(sale.find('div[id^="buy_button"]')[0]);
        var price = priceEl.text().trim();
        
        // Convert the treasure totals into friendly values (k, Mil, and various decimal counts)
        if (count > 1)
        {
            var pricePer = price/count;
            pricesPer.push(pricePer);
            
            if (pricePer > 1000000)
            {
              pricePer = Math.round(pricePer / 100000) / 10 + ' Mil';
            }
            else if (pricePer > 1000)
            {
              pricePer = Math.round(pricePer / 100) / 10 + 'k';
            }
            else if (pricePer > 10)
            {
              pricePer = Math.round(pricePer);
            }
            else if (pricePer > 3)
            {
              pricePer = Math.round((price/count) * 10) / 10;
            }
            else {
              pricePer = Math.round((price/count) * 100) / 100;
            }
            priceEl.html(priceEl.html().replace(price + '<br>', pricePer + ' <span style="color: #008000;">x' + count + (isFood ? ' pt' : '') + '</span><br>'));
        }
        else
        {
          pricesPer.push(parseInt(price));
        }
      }
      
      // Sort the listings by price per (can't sort all items at once, but no reason not to sort each page).
      // This is basically an insertion sort - I don't know if this is poor or not, but I really don't care about performance when sorting ~10 items.
      for (var i = 0; i < sales.length; i++)
      {
        for (var j = i + 1; j < sales.length; j++)
        {
          if (!descending && pricesPer[j] < pricesPer[i] || descending && pricesPer[j] > pricesPer[i])
          {
            $(sales[i]).before($(sales[j]));
            
            // Reload my query since things moved.
            sales = $('div[id^="sale"]');
            
            var pricePerToMove = pricesPer.splice(j, 1)[0];
            pricesPer.splice(i, 0, pricePerToMove);
          }
        }
      }
    }
    
    // Actually call the price per item function when the Auction House pages stop loading.
    $(document).ajaxSuccess(function(e, xhr, options) {
        if (options.url.indexOf('ah_buy_') > -1)
        {
          if (options.data.order == 'DESC')
          {
            pricePer(true);
          }
          else
          {
            pricePer(false);
          }
        }
    });
}

/*------------------------*/
/* AUCTION HOUSE ENHANCED */
/*------------------------*/
function AuctionHouseEnhanced() {
    // Store the top links for later reference.
    this.AHlinks = $($('#super-container').find('div')[1]).find('div a');
    var links = this.AHlinks;
    
    // Check number of links to determine if we're on the buy tab (rather than sell or my auctions).
    if (links.length > 7) {
        // This function exists solely to wipe out the search results and put in a loading spinner.  You like loading, right?
        this.searchSpinner = function(loadAll)
        {
          var elementToLoad = $($('#ah_left div')[2]);
          if (loadAll)
            elementToLoad = $('#ah_left');
            
          elementToLoad.html('<div style="width=100px; margin-left:auto; margin-right:auto; text-align:center; margin-top:200px;"><img src="/images/layout/loading.gif"></div>');
        }

        // The tab loading function.  Basically just overrides the default search function.
        this.loadTab = function(tab, page)
        {
          if (!page)
            page = 1;
          
          // Change the link styling so it looks like something happened when you change pages (it is a trick, nothing really happened).
          $('.AHlink').filter(function() {
                return $(this).text() == page;
            }).css({'font-weight': 'bold', 'color': '#000000'});
          $('.AHspan').css({'font-weight': '', 'color': '#B0734F'});
        
          // Determine if the tab changed and do special magic if it did.
          var changeTab = false;
          if (this.currentTab !== tab)
            changeTab = true;

          this.currentTab = tab;
        
          if (changeTab)
          {
              // Update the image in the top right.  These are the ones that use different identifiers.
              var imageName = tab;
              switch (tab)
              {
                case 'mats':
                  imageName = 'materials';
                  break;
                case 'app':
                  imageName = 'apparel';
                  break;
                case 'fam':
                  imageName = 'familiars';
                  break;
              }
              
              var searchImage = $('#ah_right img[src^="/images/layout/ah/"]');
              searchImage.attr('src', '/images/layout/ah/' + imageName + '_on.png');
              searchImage.parent().css('margin-bottom', 15);
              
              // Update the available search categories.  This takes a fair bit of work.
              var searchDivs = $('#searching > div');
              searchDivs.css('margin-top', '');
              
              // Clear 'em out
              for (var i = 6; i < searchDivs.length - 1; i++)
              {
                $(searchDivs[i]).remove();
              }
              
              // Look 'em up (in auctionHouseCategories)
              var categories = auctionHouseCategories[tab];
              for (var category in categories)
              {
                var catName = auctionHouseCategories[i];
                var catID = categories[category].id;
                $('#go').parent().before('<div style="text-align:left; font-size:12px; width:150px; margin-left:auto; margin-right:auto; margin-bottom:5px;">' + category + '</div>');
                $('#go').parent().before('<div id="search_cat_' + catID + '" style="margin-left:auto; margin-right:auto; margin-bottom:10px;"></div>');
                $('#search_cat_' + catID).append('<select style="width:150px; background: #F8F8F8; border-radius: 2px; border: 0px;" name="' + catID + '" class="FREcategory"></select>');
                var selectEl = $('#search_cat_' + catID + ' select');

                // Put 'em in
                for (var val in categories[category])
                {
                  if (val == 'id')
                    continue;
                    
                  selectEl.append('<option value="' + categories[category][val] + '">' + val + '</option>');
                }
              }
              
              // Update the tab styling.  It just won't do to have the links not respect where we are visually.
              this.AHlinks.css('font-weight', '');
              this.AHlinks.css('color', '#777');
              
              $('#search_' + tab).css('font-weight', 'bold');
              $('#search_' + tab).css('color', '#731D08');
          }
          
          // Here's the real heavy lifting.  Get the input values and tag them on in to the search.
          var formEl = $('#searching');
          
          var name = formEl.find('input[name="name"]').val();
          var tl = formEl.find('input[name="tl"]').val();
          var th = formEl.find('input[name="th"]').val();
          var gl = formEl.find('input[name="gl"]').val();
          var gh = formEl.find('input[name="gh"]').val();
          
          var resultsExist = $("[id^='buy_button']").length > 0;
        
          this.searchSpinner((changeTab || name) ? true : null);

          var data = {tab: tab, page: page, ordering: 'cost', direct: 'ASC'};
          
          if (!changeTab)
          {
            var categories = $('.FREcategory');
            for (var i = 0; i < categories.length; i++)
            {
              var category = $(categories[i]);
              data[category.attr('name')] = category.val();
            }
          }
          else
          {
            // If there are results, clear out the name if we switched tabs.  Otherwise, it's more likely that we were on the wrong tab, so keep it.
            if (resultsExist) {
                name = '';
                formEl.find('input[name="name"]').val('');
            }
          }
          
          if (name)
            data.name = name;
          if (tl)
            data.tl = tl;
          if (th)
            data.th = th;
          if (gl)
            data.gl = gl;
          if (gh)
            data.gh = gh;
          
          // Do the search
          $.ajax({
            type: "POST",
            data: data,
            url: "includes/ah_buy_" + tab + ".php",
            cache:false
            }).done(function(stuff){
                // Pop in the search results.  Done!
                $("#ah_left").html(stuff);
                
                $('form#searching').off('submit');
                searchAction.submit(function(e){
                e.preventDefault();
                document.loadTab(document.currentTab);
                });
            }); 
        }
    
        // The actual entry point.  Start by killing the whole "load a different page" thing on the top links and giving them ids and onclicks.
        for (var i = 0; i < 8; i++)
        {
          $(links[i]).removeAttr('href');
          $(links[i]).css('cursor', 'pointer');
        }
        
        $(links[0]).attr('onclick', 'loadTab(\'food\')');
        $(links[1]).attr('onclick', 'loadTab(\'mats\')');
        $(links[2]).attr('onclick', 'loadTab(\'app\')');
        $(links[3]).attr('onclick', 'loadTab(\'dragons\')');
        $(links[4]).attr('onclick', 'loadTab(\'fam\')');
        $(links[5]).attr('onclick', 'loadTab(\'battle\')');
        $(links[6]).attr('onclick', 'loadTab(\'skins\')');
        $(links[7]).attr('onclick', 'loadTab(\'other\')');
        
        // Make the search button use my override.
        var searchAction = $('form#searching');
        searchAction.off('submit');
        searchAction.submit(function(e){
            e.preventDefault();
            this.loadTab(this.currentTab);
        });
        
        // Bypass the initial Auction House load (loads the food page in unenhanced format - can't have that! - and I can't preempt it)
        var skipFirstLoad = function(e, xhr) {
            $(document).off('ajaxSuccess', skipFirstLoad);
        
            this.searchSpinner(true);
        };
        
        // This lovely function takes the ajax post response and injects some changes for the client.
        // Yes, all of this is solely for the navigation bars - it adds a second nav bar on top, binds the links to my search function, and tacks on some classes for jQuery purposes.
        // On a related note, you have no idea how frustrating it is to select things when none of them have ids, classes, formulaic attributes, or any defining properties.
        $.ajaxSetup({
            dataFilter: function(response, type, q) {
              if (response.indexOf('Sort By:') > -1)
              {
                var reply = $($.parseHTML(response, document, true));
                var modifiedReply = $('<div>');
                
                var navigation = $(reply[reply.length - 2]);
                
                var span = $(navigation.find('span')[0])
                span.addClass('AHspan');
                
                var currentPage = parseInt(span.text());
                
                var links = navigation.find('a');
                for (var i = 0; i < links.length; i++)
                {
                  var link = $(links[i]);
                  if (link.text())
                  {
                    link.attr('onclick', 'loadTab(\'' + document.currentTab + '\', ' + link.text() + ')');
                  }
                  else
                  {
                    if (link.find('img').attr('src').indexOf('right') > 1)
                      link.attr('onclick', 'loadTab(\'' + document.currentTab + '\', ' + (currentPage + 1) + ')');
                    else
                      link.attr('onclick', 'loadTab(\'' + document.currentTab + '\', ' + (currentPage - 1) + ')');
                  }
                  link.addClass('AHlink');
                }
                
                for (var i = 0; i < reply.length; i++)
                {
                  modifiedReply.append($(reply[i]));
                  
                  if (i == 1)
                  {
                    var navigationClone = navigation.clone();
                    navigationClone.css('position', '');
                    navigationClone.css('margin-top', '10px');
                    modifiedReply.append(navigationClone);
                    modifiedReply.append($(reply[reply.length - 1]).clone());
                  }
                }
                
                return modifiedReply.html();
              }
              else
                return response;
            }
        });
        
        $('#searching input[type="text"]').css({background: '#F8F8F8', border: '1px solid #777', "border-radius": 3});
        $('#ah_right div:contains(Search)').css('font-weight', 'bold');
        
        // Add handler to skip the first load, up the window size to account for the new bar, and put in the defaults.  Nice and easy.
        $(document).ajaxSuccess(skipFirstLoad);
        
        $('#ah_left').css('height', 950);
        $('#ah_left').parent().css('height', 975);
        
        this.currentTab = 'food';
        $('#searching').find('input[name="tl"]').val(1);
        this.loadTab('dragons');
    }
}

/*------------*/
/* SUPER SORT */
/*------------*/
function SuperSort() {
  // Firstly, kill the page navigation.  If you've got this module on, you're doing things my way >=]
  // (no but seriously i love you)
  $($('#paging span')[0]).remove();
  $('#droppable-right').remove();
  
    // Page loader function.  Loads a sorting page, parses the reply, and tags more dragons onto the sort list.
    var loadPage = function(i)
    {
      var end = false;
    
      $.ajax({

        type: "POST",
        data: {p:"lairorder", page:i},
        url: "main.php",
        cache:false
        }).done(function(data){
            // Grab the cards with dragons in them.
            var cards = $($.parseHTML(data)).find('.dragoncard').has('.clue');

            // If it's the last page it won't be full up on dragons probably.
            if (cards.length < 15)
            {
              // But if it was then don't pretend like there was another page.
              if (cards.length == 0)
              {
                return;
              }
              end = true;
            }
            
            // Append on each card as a sortable list item.
            for (var j = 0; j < cards.length; j++)
            {
              var clue = $(cards[j]).find('.clue');
              var clueHTML = clue.html();
              var clueParent = clue.parent();
              var id = parseInt(/id=(\d+)/.exec(clue.attr('rel'))[1]);
              clue.remove();
              clueParent.append(clueHTML);
              var outerHTML = $(cards[j]).clone().wrap('<p>').parent().html();
              $('#boxes').append('<li id="' + id + '" class="dragit boxes" style="display: list-item;">' + outerHTML + '</li>');
            }
            
            // Resize the container accordingly as the pages load.
            $($('#super-container > div')[0]).css('min-height', i * 620 + 200);
            
            // Style the new cards like the others.
            var items = $('#boxes li');
    
            items.css('display', '');
            items.css('cursor', 'move');
            
            if (!end)
            {
              loadPage(i + 1);
              return;
            }
        });
    }
    
    // I tried some variations of styling to put lines and space between each lair page, but dragging creates a new list item and ruins everything.
    // I need nth-of-class =( =( =(
    //$('body').append('<style id="FREstyle" type="text/css"></style>');
    //$('#FREstyle').html('#boxes li.dragit:nth-child(15n+16), #boxes li.dragit:nth-child(15n+17), #boxes li.dragit:nth-child(15n+18), #boxes li.dragit:nth-child(15n+19), #boxes li.dragit:nth-child(15n+20) { border-top: 2px dashed #000000; padding-top: 5px; margin-top: -5px; }');
    
    // We've already loaded page 1 by default, so start things off with a load of page 2!
    loadPage(2);
}

/*----------------*/
/* CROSSROADS FIX */
/*----------------*/
function CrossroadsFix()
{
    // Call on ajaxStop just to delay the initial run, then unbind - we only need to run once.
    $(document).ajaxStop(function()
    {
        $(document).off('ajaxStop');
    
        // Just find the links, annnd - yep there's an extra 'p' in there ruining everything.
        var badLinks = $('a[href^="main.php?pdragon="]');
        for (var i = 0; i < badLinks.length; i++)
        {
          var badLink = $(badLinks[i]);
          badLink.attr('href', badLink.attr('href').replace('pdragon', 'dragon'));
        }
    });
}

/*--------------------*/
/* CROSSROADS FRIENDS */
/*--------------------*/
function CrossroadsFriends()
{
    this.initiateTrade = function(e, name)
    {
        // If we didn't supply a name, the button was clicked, so grab the name out of the box if there is one.
        if (!name)
        {
            name = document.getElementById('tuser').value;
            if (!name)
            {
                return;
            }
        }
        
        // Copy the code to start a dragon trade so we can do it manually
        $('body').append('<div id="trade"></div>');
        $("#trade").html('<img src="/images/layout/loading.gif"> loading...');
        $('#trade').dialog({
            autoOpen: false,
            title: "Initiate Trade",
            width: 300,
            height: "auto",
            modal: true,
            resizable: false,
            draggable: false,
            closeOnEscape: false,
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog).hide();
            }
        });
        
        $('#trade').dialog('open');

        $.ajax({
            type: "POST",
            data: {tuser: name},
            url: "includes/ol/cross_user.php",
            cache:false
        }).done(function(stuff){
            $("#trade").html(stuff);
        });
    }

    // Callback to include the friend picker
    var setupFriendPicker = function(friends)
    {
        $('#friendpicker').html('<br>');
        for (var friend in friends)
        {
            $('#friendpicker').append('<a onclick="initiateTrade(null, \'' + friend + '\')" style="cursor: pointer; color: #76240F; font-weight: bold; font-size: 12px;">' + friend + '</a><br>');
        }
    }
    
    $('span:contains("Initiate Dragon Trade")').wrap('<a href="main.php?p=crossroads">');
    
    var picker = $($('#swap div')[0]);
    picker.css('top', 50);
    picker.html(picker.html().replace('with:', 'with, or pick from the list of your friends:'));
    $('#tuser').before('<span id="friendpicker"></span>');

    loadFriends(function(friends) { setupFriendPicker(friends); });
    
    // The html replacement shenanigans actually unbound the button, so bind it again.
    $('#btrade').click(initiateTrade);                
}

/*-----------------------*/
/* REPEAT GATHERING LIST */
/*-----------------------*/
function GatheringList()
{
    var loadTotals = function()
    {
        // Clear out the totals, sum everything and create a new totals element            
        $('#totals').html('<div style="text-align: center; font-weight: bold; padding-bottom: 3px;">TOTALS</div><div id="totalsrow" style="width:600px; margin-left:auto; margin-right:auto; padding-bottom: 5px; border-bottom: 1px dashed #000; text-align:center; position:relative; z-index:1;"></div>')
        
        var items = $('a.clue');
        var itemCounts = {};
        var numItems = 0;
        
        for (var i = 0; i < items.length; i++)
        {
            var item = $(items[i]);
            var id = parseInt(/id=(\d+)/.exec(item.attr('rel'))[1]);
            var count = parseInt(item.parent().find('div').text());
            
            if (itemCounts[id])
            {
              itemCounts[id] += count;
              $('#item_' + id + ' div').text(itemCounts[id]);
            }
            else
            {
              itemCounts[id] = count;
              numItems++;
              var totalEntry = item.parent().clone();
              totalEntry.attr('id', 'item_' + id);
              $('#totalsrow').append(totalEntry);
            }
        }
        
        $('#totals').css('height', (Math.floor((numItems - 1) / 7) + 1) * 105);
        
        // Add tooltips to any newly created elements.
        $('a.clue').cluetip({
            height:"auto",
            ajaxCache: true
        }); 
    }

    // Claim the "Repeat Gathering" button
    var repeatButton = $('.thingbutton[value^="Repeat Gathering"]');
    repeatButton.attr('type', 'button');
    
    var form = repeatButton.parent();
    var type = /action=([^&]+)/.exec(form.attr('action'))[1];
    
    // Make a better html structure so selecting with jQuery isn't a nightmare
    $('a.clue').parent().parent().wrap('<div id="gatheringList">');
    $('#gatheringList').after('<div id="totals" style="height: 105px; padding-bottom: 6px;"></div>');
    var successDiv = $('#super-container div:contains(Success!)');
    successDiv.attr('id', 'successdiv');
    
    // Move things around for better layout
    var text = $('#super-container span:contains(Hoard)').parent();
    text.css('top', 15);
    var tmpHTML1 = text.clone().wrap('<p>').parent().html();
    var tmpHTML2 = $('#gatheringList').clone().wrap('<p>').parent().html();
    text.remove();
    $('#gatheringList').remove();
    $('#super-container').append(tmpHTML1);
    $('#super-container').append(tmpHTML2);
    
    $($('#gatheringList div')[0]).prepend('<div>Turn 1</div>');
    
    loadTotals();
    
    repeatButton.click(function(e)
    {
        // Loading spinners yay and submit the gather request
        var gatherType = $('input[name="gather"]').val();
        $('#successdiv').html('<img src="/images/layout/loading.gif">');
    
        $.ajax({
        type: "POST",
        data: 'gather=' + gatherType,
        url: "main.php?p=gather&action=" + type,
        processData: false,
        cache: false
        }).done(function(reply)
        {
            // Remove the loading spinner
            $('#successdiv').html('Success!');
            
            // Decrement the turns counter (we're not reloading the page so this has to be done manually)
            var turnsElement = $('#super-container div:contains(Turns Left) div')
            var newTurnsCount = parseInt(turnsElement.text().trim()) - 1;
            
            // If we're out of turns, disable the repeat button
            if (newTurnsCount <= 0)
            {
                newTurnsCount = 0;
            
                repeatButton.off('click');
                repeatButton.removeClass('beigebutton');
                repeatButton.removeClass('thingbutton');
                repeatButton.addClass('greybutton');
                repeatButton.addClass('stopbutton');
            }
            
            turnsElement.text(newTurnsCount);

            // Append the new items to the gathering list
            var itemSet = $($.parseHTML(reply)).find('.clue').parent().parent();
            $('#gatheringList').append(itemSet.clone());
            
            var gatheringDivs = $('#gatheringList > div');
            var turnCount = gatheringDivs.length;
            $(gatheringDivs[turnCount - 1]).prepend('<div>Turn ' + turnCount + '</div>');
            
            loadTotals();
        });
    });
}

/*------------*/
/* FOOD LINKS */
/*------------*/
function FoodLinks1()
{
    // Find the food bar and link things up - the elements are already anchors so it's easy.
    var foodBar = $('#food_bar');
    foodBar.find('img[src*="insect"]').parent().attr('href', 'main.php?p=hoard&tab=food&food=insect');
    foodBar.find('img[src*="meat"]').parent().attr('href', 'main.php?p=hoard&tab=food&food=meat');
    foodBar.find('img[src*="seafood"]').parent().attr('href', 'main.php?p=hoard&tab=food&food=seafood');
    foodBar.find('img[src*="plant"]').parent().attr('href', 'main.php?p=hoard&tab=food&food=plant');
}

function FoodLinks2()
{
    // Get the food type out of the url
    var foodType = /food=(.+)/.exec(window.location.href)[1];
    
    var skipFirstLoad = function(e, xhr) {
        $(document).off('ajaxSuccess', skipFirstLoad);
    
        // Load the correct food tab here
        $("#inv_main").html('<div style="width=100px; margin-left:auto; margin-right:auto; text-align:center; margin-top:200px;"><img src="/images/layout/loading.gif"></div>');
        $.ajax({
            type: "POST",
            data: {page: 1, tab: "food", food: foodType},
            url: "includes/hoard_main.php",
            cache:false
        }).done(function(stuff){
            $("#inv_main").html(stuff);
        });
    };
    
    // Skip the initial load
    $(document).ajaxSuccess(skipFirstLoad);
}


/*----------------------*/
/* BUY FROM DRAGON PAGE */
/*----------------------*/
function BuyFromDragonPage() {
  // This one's actually really simple - AH sales of dragons conveniently have the same ids as the dragons do.
  // If we're on a dragon page see if we can get at dat "for sale" icon.
  var forSale = $('.loginbar img[src="/images/icons/forsale.png"]');
  if (forSale.length > 0)
  {
    // If it's there, just do what the AH does.  Add the dialog and kick it off.
    this.buyDragon = function(id)
    {
        $('body').append('<div id="purchase"></div>');
        $("#purchase").html('<img src="/images/layout/loading.gif"> loading...');
        $('#purchase').dialog({
            autoOpen: false,
            title: "Buy Dragon",
            width: 300,
            height: "auto",
            modal: true,
            resizable: false,
            draggable: false,
            closeOnEscape: false,
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog).hide();
            }
        });
        $('#purchase').dialog('open');
        // Call the buy.  The ajax response will do the rest!  Yay!
        $.ajax({
            type: "POST",
            data: {tab: "dragons", page: "1", id: id, ver: "buy"},
            url: "includes/ol/ah_buy_dragon.php",
            cache:false
        }).done(function(stuff){
            $("#purchase").html(stuff);
        }); 
    }
    
    // Mine the dragon's id out of the url and turn the "for sale" icon into a link.
    var id = parseInt((/did=(\d+)/.exec(window.location.href) || /dragon=(\d+)/.exec(window.location.href))[1]);
  
    $(forSale[0]).css('cursor', 'pointer');
    $(forSale[0]).attr('onclick', 'buyDragon(' + id + ')');
  }
}

/*-----------------------*/
/* DRAGON PAGE TOP LINKS */
/*-----------------------*/
function DragonPageTopLinks() {
    // Select the top links, get the user name (if it's there; it's not there when looking at your own dragons), and reformat it.
    forceSelect('#super-container div', function(sel) {
        var links = $(sel[0]);

        var userName = /(\w+):/.exec(links.html())[1];
        if (userName != "color") {
            var userID = parseInt(/id=(\d+)/.exec(links.find('a:contains("Dragon Lair")').attr('href'))[1]);

            links.html(links.html().replace(userName + ':', '<a href="main.php?p=lair&tab=userpage&id=' + userID + '" style="color: #000;">' + userName + '</a> ' + String.fromCharCode(187)));
        }
    });
}

/*---------------------*/
/* LAIR PAGE TOP LINKS */
/*---------------------*/
function LairPageTopLinks() {
    // Select the top links and reformat (if there's a pipe, then it's your own pages; otherwise, someone else's; standardize it regardless)
    forceSelect('#super-container div', function(sel) {
        var links = $(sel[0]);
    
        if (links.html().indexOf('|') == -1)
        {
            var userName = /(\w+):/.exec(links.html())[1];
            if (userName != "color") {
                links.html(links.html().replace(userName + ':', '').replace('Clan Profile', userName));
            }
        } else {
            $(links.find('a')[0]).remove();
            
            links.html(links.html().replace(String.fromCharCode(187), '').replace(/\|/g, String.fromCharCode(187)));
        }
    });
}

/*-------------*/
/* SILENT EDIT */
/*-------------*/
function SilentEdit1() {
    // Check if I'm on the last page of the current thread.  If we are, grab the last post.
    var selectedPage = $($('#mb_main div div span span, #mb_main div div span strong')[0]);
    if (selectedPage.index() == selectedPage.parent().children().length - 1)
    {
        // Tack on my silent edit parameter to any edit links in this post (there will be at most one).
        var parents = $('#mb_main div[id^="parent_"]');
        var edit = $(parents[parents.length - 1]).find('a:contains("Edit")');
        edit.attr('href', edit.attr('href') + '&freSilent=1')
    }
}

function SilentEdit2() {
    // Silent edit function.  Deletes the current post and posts a new one from the text in the box.
    this.SilentEdit = function(postID, threadID)
    {
        $.ajax({
            type: "POST",
            data: {id: postID, ver: "con", pid: threadID},
            url: "includes/ol/mb_del.php",
            cache:false
            }).done(function(stuff){
            $("#delete").html(stuff);
        }).done(function()
        {
            var data = $('#mbedit').serialize();
            data = data+"&ver=rep"; 
            
            $.ajax({
                type: "POST",
                data: data,
                url: "includes/ol/mb_post.php",
                cache:false
                }).done(function(img){
                $("#editpost").html(img);
            });
        });
    }
      
    // Mine the IDs from the url.  IDs are like the iron ore of scripting.
    var postID = parseInt(/eid=(\d+)/.exec(window.location.href)[1]);
    var threadID = parseInt(/pid=(\d+)/.exec(window.location.href)[1]);
    
    // Add a checkbox for the silent edit.
    $('#message').after('<div><input id="FREsilent" type="checkbox" name="silentedit" value="1" checked>Edit silently (delete this message and repost)</div>');
    // I hereby claim this submit button as my own...
    $($('#submit')[0]).off('click');
    $($('#submit')[0]).click(function(e){
            // ...and replace it with the code that the handler would have been calling anyway
            $('body').append('<div id="editpost"></div>');
            $("#editpost").html('<img src="/images/layout/loading.gif"> loading...');
            $('#editpost').dialog({
                autoOpen: false,
                title: "Edit Post - Silent",
                width: 300,
                height: "auto",
                modal: true,
                resizable: false,
                draggable: false,
                closeOnEscape: false,
                open: function(event, ui) {
                    $(".ui-dialog-titlebar-close", ui.dialog).hide();
                }
            });
            
            $('#editpost').dialog('open'); 
          
            // Until now!  If the box is checked, do the silent edit instead.
            if ($('#silentedit:checked').length > 0)
            {
                SilentEdit(postID, threadID);
            }
            else
            {
                // If not, carry on.
                data = $('#mbedit').serialize();
                data = data+"&ver=edit&board=ibaz&eid=" + postID;
                $.ajax({
                type: "POST",
                data: data,
                url: "includes/ol/mb_post.php",
                cache:false
                }).done(function(img){
                    $("#editpost").html(img);
                }); 
            }
    });
}

/*-------------*/
/* THREAD BUMP */
/*-------------*/
function ThreadBump() {
    // Threadfist bump function
    this.bumpThread = function(threadID, name)
    {
        // Bumping posts and deletes, so mimic delete since that's what we finish with.
        $('body').append('<div id="delete"></div>');
            $("#delete").html('<img src="/images/layout/loading.gif"> loading...');
            $('#delete').dialog({
                autoOpen: false,
                title: "Bump Thread",
                width: 300,
                height: "auto",
                modal: true,
                resizable: false,
                draggable: false,
                closeOnEscape: false,
                open: function(event, ui) {
                    $(".ui-dialog-titlebar-close", ui.dialog).hide();
                }
            });
            
        $('#delete').dialog('open');
        
        // Start with the post
        var data =
        {
          lpage: 1,
          message: 'bump',
          pid: threadID,
          topic: name,
          ver: 'rep'
        }
        
        $.ajax({
                type: "POST",
                data: data,
                url: "includes/ol/mb_post.php",
                cache:false
                }).done(function(reply)
                {
                    // Once posted, we can grab the post ID from the reply.  Great - DELETE IT >>>=D
                    var postID = /&anchor=(\d+)/.exec(reply)[1];
                    
                    $.ajax({
                    type: "POST",
                    data: {id: postID, ver: "con", pid: threadID},
                    url: "includes/ol/mb_del.php",
                    cache:false
                    }).done(function(stuff){
                    $("#delete").html(stuff);
                });
        });
    }

    // Tack on the bump link to the first post in the first page.
    var selectedPage = $($('#mb_main div div span span, #mb_main div div span strong')[0]);
    if (selectedPage.index() == 0)
    {
        var parents = $('#mb_main div[id^="parent_"]');
        var threadID = parseInt(/id=(\d+)/.exec(window.location.href)[1]);
        var name = $($(parents[0]).find('span')[0]).text().trim();
        $(parents[0]).find('a:contains("Quote")').before('<a style="cursor: pointer; color: #ccc;" onclick="bumpThread(' + threadID + ', \'' + name + '\')">Bump</a> | ');
    }
}

/*---------------------*/
/* BETTER FOOD CONVERT */
/*---------------------*/
function BetterFoodConvert() {
    // Add a handler to call when converting food
    $(document).ajaxSuccess(function(e, xhr, options) {
        if (options.url.indexOf('hoard_store') > -1)
        {
            // Grab the current food totals!
            var prevFoodTotals = $('#food_bar img').parent();
            var prevInsect = parseInt($(prevFoodTotals[0]).text());
            var prevMeat = parseInt($(prevFoodTotals[1]).text());
            var prevSeafood = parseInt($(prevFoodTotals[2]).text());
            var prevPlant = parseInt($(prevFoodTotals[3]).text());
            
            // Update the food bar immediately, get the changes, and display the results in the dialog.
            $.ajax({
                type: "POST",
                data: '',
                url: "includes/foodbar_change.php",
                cache:false
            }).done(function(img){
                $("#food_bar").html(img);
                
                var foodTotals = $('#food_bar img').parent();
                var insectChange = parseInt($(foodTotals[0]).text()) - prevInsect;
                var meatChange = parseInt($(foodTotals[1]).text()) - prevMeat;
                var seafoodChange = parseInt($(foodTotals[2]).text()) - prevSeafood;
                var plantChange = parseInt($(foodTotals[3]).text()) - prevPlant;
                
                var returnDiv = $('#ret').parent();
                returnDiv.css('margin-top', 20);
                returnDiv.before('<div id="foodtotals" style="width:285px; margin-right:auto; margin-left:auto; text-align:center; margin-top: 15px;"></div>')
                
                if (insectChange > 0)
                  $('#foodtotals').append('\n' + insectChange + ' <img style="margin-right:10px;" src="../../images/layout/icon_insect.png">');
                if (meatChange > 0)
                  $('#foodtotals').append('\n' + meatChange + ' <img style="margin-right:10px;" src="../../images/layout/icon_meat.png">');
                if (seafoodChange > 0)
                  $('#foodtotals').append('\n' + seafoodChange + ' <img style="margin-right:10px;" src="../../images/layout/icon_seafood.png">');
                if (plantChange > 0)
                  $('#foodtotals').append('\n' + plantChange + ' <img style="margin-right:10px;" src="../../images/layout/icon_plant.png">');
            });
                
            // Update the "return" button to be a little more intelligent.
            $('#ret').off('click');
            $('#ret').click(function(e){
                $('#storing').dialog('close');
                $('#storing').detach();
                
                var type = $('#food').val();
                var page = $($('#invent div span')[0]).text();
                
                $("#inv_main").html('<div style="width=100px; margin-left:auto; margin-right:auto; text-align:center; margin-top:200px;"><img src="/images/layout/loading.gif"></div>'); 
                
                // Specifically, this call doesn't need to reload your entire food hoard on page 1 when it can just reload the current page.
                $.ajax({
                    type: "POST",
                    data: {page: page, tab: "food", food: type},
                    url: "includes/hoard_main.php",
                    cache:false
                }).done(function(stuff){
                    $("#inv_main").html(stuff);
                });
            }); 
        }
    });
}

/*----------------------*/
/* FASTER DRAGON NAMING */
/*----------------------*/
function FasterDragonNaming() {
    // Hook in after the dragon name call
    $(document).ajaxSuccess(function(e, xhr, options) {
        if (options.url.indexOf('babynames') > -1)
        {
            // Get the name and id of the dragon we just named
            var name = /name=([^&]+)/.exec(options.data);
            if (name)
                name = name[1];
                
            var dragonID = /id=(\d+)/.exec(options.data);
            if (dragonID)
                dragonID = parseInt(dragonID[1]);
            
            if (name) {
                // Find and replace this dragon's name and delete the naming icon
                var dragonNameDiv = $($('.dragoncard img[class$="thmb"][src*="/' + dragonID + '.png"]').parent().parent().parent().find('div')[0]);
                dragonNameDiv.html(dragonNameDiv.html().replace('Unnamed', name));
                $(dragonNameDiv.find('img')[0]).remove();
                
                // Get rid of the page reload functionality of the button while still allowing it to close the dialog
                $('.thingbutton').attr('onclick', '');
                $('.thingbutton').click(function(e)
                    {
                        $('#naming').dialog('close');
                        $('#naming').detach();
                    });
            }
        }
    });
}

/*------------------------*/
/* STICKY APPAREL PREVIEW */
/*------------------------*/
function StickyApparelPreview() {
    // Listen for calls to the apparel preview window.
    $(document).ajaxSend(function(xhr, s, options) {
        if (options.url.indexOf('item_preview.php') > -1)
        {
          // If no breed and gender are selected, the window was just opened!
          if (options.data.indexOf('breed') == -1 && options.data.indexOf('gender') == -1)
          {
            // Get the stored breed and gender, and modify the request accordingly.
            var breed = getSessionValue('apparelPreview_Breed');
            var gender = getSessionValue('apparelPreview_Gender');
            
            if (breed)
              options.data += '&breed=' + breed;
            if (gender)
              options.data += '&gender=' + gender;
          }
        }
    });

    $(document).ajaxSuccess(function(e, xhr, options) {
        if (options.url.indexOf('item_preview.php') > -1)
        {
            // After the window loads, save the selected breed and gender values, if any.
            var breed = $('#breed').val();
            var gender = $('#gender').val();
            
            if (breed)
                setSessionValue('apparelPreview_Breed', breed);
            if (gender)
                setSessionValue('apparelPreview_Gender', gender);
        }
    });
}



/*----------------------------------*/
/* CONFIGURE FLIGHT RISING ENHANCER */
/*----------------------------------*/
function ConfigureFlightRisingEnhancer() { 
  // Append an FRE settings option to the settings page.
  var optionsDiv = $('#user_chg').parent().parent();
  var options = optionsDiv.find('div');
  console.log($('#user_chg'));
  var yPosition = parseInt(/(\d+)/.exec($(options[options.length - 1]).css('top'))[1]) + 65;
  
  optionsDiv.append('<div style="position:absolute; left:0px; top:' + yPosition + 'px;">' +
    '<div style="color:#731d08; font-weight:bold;">Configure FRE</div>' +
    '<div style="font-style:italic;">Flight Rising Enhancer modules</div>' +
    '</div><div style="position:absolute; right:0px; top:' + yPosition + 'px;">' +
    '<input type="button" value="Configure" id="fre_configure" style="height:25px; width:80px; color:#fff; border:1px solid #000; background-color:#731d08;" class="mb_button">' +
    '</div>');
    
    // Open it up on click
    $('#fre_configure').click(function(e){
        $('body').append('<div id="freConfigureWindow"></div>');
        $('#freConfigureWindow').dialog({
            autoOpen: false,
            title: "Configure Flight Rising Enhancer",
            width: 320,
            height: "auto",
            modal: true,
            resizable: false,
            draggable: false,
            closeOnEscape: false,
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog).hide();
            }
        });
        
        $('#freConfigureWindow').dialog('open');
        
        // Add config options for each module: a checkbox and the module key
        var addConfigOption = function(key)
        {
          $('#freConfigureWindow').append('<input id="' + key + '" class="freSetting" type="checkbox" name="' + key + '" value="1"' + (moduleEnabled(key) ? ' checked' : '') + '>' + moduleReference[key] + '<br>');
        }
        
        // Look through the module reference to add config options to enable/disable each module.
        for (var module in moduleReference)
        {
          addConfigOption(module);
        }

        $('#freConfigureWindow').append('Gem Rate: 1 <img width="20" border="0" height="20" align="absmiddle" style="cursor:pointer;" src="/images/layout/icon_gems.png"> =' +
        ' <input type="text" id="gemRatio" name="gemRatio" style="width: 45px; border: 1px solid #777; background: #F8F8F8; border-radius: 3px;" value="' + getStoredValue('gemRate', gemDefault) + '">' +
        '<img width="20" border="0" height="20" align="absmiddle" style="cursor:pointer;" src="/images/layout/icon_treasure.png"><br>');
        
        // Save and cancel buttons - save stores the values and then closes the window; cancel just closes the window.
        $('#freConfigureWindow').append('<div style="height: 10px"></div>');
        $('#freConfigureWindow').append('<input type="button" class="mb_button" value="Save" style="width:120px; color:#731d08; height:30px; font-size:12px; font-weight:bold; border:1px solid #000; margin-left: 25px; margin-right: 15px;" id="save">');
        $('#freConfigureWindow').append('<input type="button" class="mb_button" value="Cancel" style="width:120px; color:#731d08; height:30px; font-size:12px; font-weight:bold; border:1px solid #000;" id="cancel">');
        
        $('#cancel').click(function(e){
            $('#freConfigureWindow').dialog('close');
            $('#freConfigureWindow').detach();
        });

        // On save, store the module settings and parse the gem rate box (if it's a number, store it)
        $('#save').click(function(e){
            var settings = $('#freConfigureWindow .freSetting');
            
            for (var i = 0; i < settings.length; i++)
            {
                var name = $(settings[i]).attr('name');
                var checked = $(settings[i]).is(':checked');
                setModuleEnabled(name, checked);
            }
            
            if (!isNaN(parseFloat($('#gemRatio').val())))
                setStoredValue('gemRate', $('#gemRatio').val());
            
            $('#freConfigureWindow').dialog('close');
            $('#freConfigureWindow').detach();
        });
    }); 
}



/*----------------*/
/* SCRIPT GLOBALS */
/*----------------*/
function FlightRisingEnhancer() {
    // Select elements that may or may not be loaded yet - will keep trying until the jQuery and the elements are loaded.
    this.forceSelect = function(selector, callback, waitTime) {
        if (typeof waitTime == "undefined")
            waitTime = 0;
            
        // If we're waiting more than 30 seconds, something's probably wrong so just quit.
        if (waitTime > 30000)
            return;
    
        var selectList;
        if (typeof $ != "undefined") {
            selectList = $(selector);
        }
        
        if (selectList && selectList.length > 0) {
            callback(selectList);
        } else {
            setTimeout(function() { forceSelect(selector, callback, Math.max(1, waitTime * 2)); }, waitTime);
        }
    }

    // Define local/session storage functions to persist data.
    this.getStoredValue = function(key, def) {
        return localStorage["fre_" + key] || def;
    };
    this.setStoredValue = function(key, value) {
        return localStorage["fre_" + key] = value;
    };
    this.deleteStoredValue = function(key) {
        return delete localStorage["fre_" + key];
    };
    
    this.getSessionValue = function(key, def) {
        return sessionStorage["fre_" + key] || def;
    };
    this.setSessionValue = function(key, value) {
        return sessionStorage["fre_" + key] = value;
    };
    this.deleteSessionValue = function(key) {
        return delete sessionStorage["fre_" + key];
    };
    
    this.moduleEnabled = function(key)
    {
        return getStoredValue("modules_" + key, "true") === "true";
    }
    this.setModuleEnabled = function(key, enabled)
    {
        return setStoredValue("modules_" + key, enabled);
    }
    
    // Load friends function
    this.loadFriends = function(callback)
    {
        // If there's a set of stored friends, hit the callback immediately with it.
        var storedFriends = getStoredValue('friends');
        if (storedFriends)
        {
            callback(JSON.parse(storedFriends));
        }
        
        // Then, kick off a call to the friends page - if the saved friends list is incorrect, it'll be updated on load.
        // However, this takes a bit longer, so it's important not to have to wait on it!
        var friends = {};
        
        $.ajax({
        type: "POST",
        data: {p: 'lair', tab: 'friends'},
        url: "main.php",
        cache:false
        }).done(function(friendsReply)
            {
              var reply = $($.parseHTML(friendsReply));
              
              var friendsEl = reply.find('#friends > span > span > a');
              
              for (var i = 0; i < friendsEl.length; i++)
              {
                var friendEl = $(friendsEl[i]);
                friends[friendEl.text()] = parseInt(/(\d+)/.exec(friendEl.attr('href'))[1]);
              }
              
              // Save the loaded friends so we can use them again next time!
              setStoredValue('friends', JSON.stringify(friends));
              
              // Do the callback again now that we've reloaded the list.
              callback(friends);
            }
        );
    }
    
    // Lookup function for the food points for each item (avoids server calls to load the tooltip when I need to know what is what).  Delicious data in more ways than one.
    this.getFoodPointsById = function(id)
    {
        switch (id)
        {
          case 1: case 14: case 42: case 48: case 51: case 56: case 73: case 77: case 89: case 119: case 120: case 130: case 132: case 139: case 149: case 213:
            return 15;
          case 1006: case 1007: case 1008: case 1009: case 1022: case 1023: case 1024: case 1025: case 1060: case 1061: case 1062: case 1063: case 1108:
          case 1109: case 1110: case 1111: case 1117: case 1118: case 1119: case 1120: case 1181: case 1182: case 1183: case 1184: case 1574: case 1575:
          case 1576: case 1577:
            return 7;
          case 858: case 859: case 860: case 861: case 994: case 995: case 996: case 997: case 1002: case 1003: case 1004: case 1005: case 1010: case 1011:
          case 1012: case 1013: case 1030: case 1031: case 1032: case 1033: case 1112: case 1113: case 1114: case 1115: case 1129: case 1131: case 1132:
          case 1207: case 1208: case 1209: case 1210:
            return 6;
          case 3: case 8: case 34: case 37: case 47: case 49: case 79: case 84: case 95: case 104: case 107: case 108: case 115: case 128: case 156: case 168:
          case 736: case 737: case 794: case 795: case 796: case 797: case 808: case 809: case 810: case 811: case 812: case 813: case 826: case 827: case 828:
          case 829: case 830: case 831: case 862: case 863: case 864: case 865: case 969: case 970: case 971: case 972: case 983: case 984: case 985: case 986:
          case 990: case 991: case 992: case 993: case 998: case 999: case 1000: case 1001: case 1018: case 1019: case 1020: case 1021: case 1026: case 1027:
          case 1028: case 1029: case 1036: case 1037: case 1038: case 1039: case 1040: case 1041: case 1042: case 1043: case 1121: case 1122: case 1123:
          case 1124: case 1125: case 1126: case 1127: case 1128: case 1130: case 1133: case 1134: case 1135: case 1136: case 1177: case 1178: case 1179:
          case 1180: case 1185: case 1186: case 1187: case 1188: case 1189: case 1190: case 1191: case 1192: case 1194: case 1195: case 1196: case 1197:
          case 1198: case 1199: case 1200: case 1201: case 1203: case 1204: case 1205: case 1206: case 1211: case 1212: case 1213: case 1214:
            return 5;
          case 2: case 11: case 22: case 30: case 36: case 39: case 41: case 50: case 59: case 61: case 68: case 76: case 88: case 92: case 93: case 103:
          case 111: case 113: case 122: case 125: case 126: case 127: case 135: case 140: case 146: case 148: case 152: case 154: case 162: case 167: case 169:
          case 212: case 530: case 683: case 1754: case 1755: case 1756:
            return 4;
          case 4: case 5: case 6: case 12: case 16: case 21: case 23: case 25: case 26: case 27: case 31: case 32: case 35: case 38: case 45: case 53: case 55:
          case 58: case 72: case 74: case 78: case 81: case 82: case 83: case 86: case 94: case 97: case 98: case 101: case 102: case 106: case 117: case 118:
          case 121: case 129: case 131: case 134: case 136: case 138: case 141: case 147: case 157: case 159: case 160: case 161: case 163: case 166: case 176:
          case 528: case 759:
            return 3;
          case 7: case 9: case 10: case 13: case 15: case 17: case 18: case 19: case 20: case 24: case 28: case 29: case 33: case 40: case 43: case 44: case 46:
          case 52: case 54: case 57: case 60: case 62: case 63: case 64: case 65: case 66: case 67: case 69: case 70: case 71: case 75: case 80: case 85:
          case 87: case 90: case 91: case 96: case 99: case 100: case 105: case 109: case 110: case 112: case 114: case 116: case 123: case 124: case 133:
          case 137: case 144: case 145: case 150: case 151: case 153: case 155: case 158: case 164: case 165: case 170: case 171: case 172: case 173: case 174:
          case 175:
            return 2;
        }
        
        return 0;
    }
    
    // Default values and value lookups
    this.gemDefault = 350;
    
    // Store the module keys and their translated names here.
    this.moduleReference =
    {
      quickBuyDragons: 'Buy from Dragon Page',
      mailPlus: 'Mail Attachment Accept',
      enhancedAH: 'Enhanced Auction House',
      pricePerUnit: 'Auction House Price Per Unit',
      foodImprovements: 'Food Improvements',
      simpleFixes: 'Crossroads Fix',
      friendsBoost: 'Friends Boost',
      styleTweaks: 'Top Links',
      streamlineDialogs: 'Faster Dragon Naming',
      gemRate: 'Gem Calculator',
      removeHunger: 'Remove Hunger Percentage',
      gatheringList: 'Gathering List',
      forumActions: 'Forum Actions',
      stickySettings: 'Sticky Apparel Preview',
      superSort: 'Single Page Lair Sort'
    }
}

/*------------------*/
/* MAIN ENTRY POINT */
/*------------------*/

// Reference for which scripts should be associated with which pages.
// Key - the page (p=[page])
// Value - a list of objects
//       func - the function to load as a page script (star means all pages, empty string means no explicit page)
//       key - the module key
//       pageConditions - an object (key - a get variable in the url; value - its value (respects * and empty string), e.g. p=[page]&[key]=[value])
//       immediate - true if the script should run immediately (and not on DOMContentLoaded); make sure to use forceSelect to manipulate page elements!
var pageReference =
{
    "settings": [
        {func: ConfigureFlightRisingEnhancer}
    ],
    "pm": [
        {func: MailAttachmentAccept, key: "mailPlus"}
    ],
    "ah": [
        {func: AuctionHouse, immediate: true},
        {func: AuctionHouseEnhanced, key: "enhancedAH"},
        {func: PricePerUnit, key: "pricePerUnit"},
        {func: StickyApparelPreview, key: "stickySettings"}
    ],
    "lairorder": [
        {func: SuperSort, key: "superSort"}
    ],
    "crossroads": [
        {func: CrossroadsFix, key: "simpleFixes"},
        {func: CrossroadsFriends, key: "friendsBoost"}
    ],
    "gather": [
        {func: GatheringList, key: "gatheringList", pageConditions: {"action": "*"}}
    ],
    "tradepost": [
        {func: StickyApparelPreview, key: "stickySettings", pageConditions: {"lot": "swap"}}
    ],
    "hoard": [
        {func: FoodLinks2, key: "foodImprovements", pageConditions: {"food": "*"}},
        {func: BetterFoodConvert, key: "foodImprovements"},
        {func: StickyApparelPreview, key: "stickySettings"}
    ],
    "mb": [
        {func: SilentEdit1, key: "forumActions", pageConditions: {"id": "*"}},
        {func: SilentEdit2, key: "forumActions", pageConditions: {"freSilent": "1"}},
        {func: ThreadBump, key: "forumActions", pageConditions: {"id": "*"}},
        {func: StickyApparelPreview, key: "stickySettings"}
    ],
    // The lair and view pages are basically the same thing, so there's a lot of overlap here.
    "lair": [
        {func: BuyFromDragonPage, key: "quickBuyDragons", pageConditions: {"tab": "dragon"}},
        {func: DragonPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "dragon"}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": ""}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "lair"}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "userpage"}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "hatchery"}, immediate: true},
        {func: FasterDragonNaming, key: "streamlineDialogs"}
    ],
    "view": [
        {func: BuyFromDragonPage, key: "quickBuyDragons", pageConditions: {"tab": "dragon"}},
        {func: DragonPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "dragon"}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "lair"}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "userpage"}, immediate: true},
        {func: LairPageTopLinks, key: "styleTweaks", pageConditions: {"tab": "hatchery"}, immediate: true},
        {func: FasterDragonNaming, key: "streamlineDialogs", pageConditions: {"tab": "lair"}}
    ],
    "": [
        {func: BuyFromDragonPage, key: "quickBuyDragons", pageConditions: {"dragon": "*"}},
        {func: DragonPageTopLinks, key: "styleTweaks", pageConditions: {"dragon": "*"}, immediate: true}
    ],
    "*": [
        {func: RemoveHungerPercentage, key: "removeHunger", immediate: true},
        {func: QuickFriends, key: "friendsBoost"},
        {func: GemCalculator, key: "gemRate"},
        {func: FoodLinks1, key: "foodImprovements"}
    ]
}


// Script injection - adds scripts into the page context to leverage the page scope as well as jQuery.
function InjectScript(func, documentLoaded) {
    // If head isn't ready, defer execution (this is Chrome support shenanigans)
    var head = document.head || document.getElementsByTagName("head")[0];
    if (head) {
        var source = func.toString();
        var scriptEl = document.createElement('script');
        scriptEl.setAttribute("id", func.name);
        scriptEl.setAttribute("type", "text/javascript");
        if (documentLoaded) {
            source = "document.addEventListener('DOMContentLoaded', " + source + ", true);";
        } else {
            source = "(" + source + ")();";
        }
        scriptEl.innerHTML = source;
        head.appendChild(scriptEl);
    }
    else {
        setTimeout(function() { InjectScript(func, documentLoaded); }, 0);
    }
}

// Inject the globals script
InjectScript(FlightRisingEnhancer);

// Pull the get variables from the url and then use them to determine which scripts to load!
var getVariables = {},
    getVarRegEx = /([^&?]+)=([^&?]+)/g,
    matches;

while (matches = getVarRegEx.exec(window.location.href))
{
    getVariables[matches[1]] = matches[2];
}

function moduleEnabled(key) {
    return (localStorage["fre_modules_" + key] || "true") === "true";
};

// Use the module reference to determine which scripts apply to the current page.
function loadModulesByPage(page, getVariables)
{
    page = page || "";
    var modulesToLoad = pageReference[page];
    if (modulesToLoad)
    {
        for (var i = 0; i < modulesToLoad.length; i++)
        {
            var module = modulesToLoad[i];
            if (!(module.key) || moduleEnabled(module.key))
            {
                var pageConditions = module.pageConditions;
                if (pageConditions)
                {
                    var matchFail = false;
                    for (var condition in pageConditions) {                            
                        if (pageConditions[condition] != "" && !getVariables[condition]
                            || pageConditions[condition] == "" && getVariables[condition]
                            || pageConditions[condition] != "" && pageConditions[condition] != "*" && getVariables[condition] != pageConditions[condition]) {
                            matchFail = true;
                            break;
                        }
                    }
                    
                    if (matchFail) {
                        continue;
                    }
                }
                
                InjectScript(module.func, module.immediate != true);
            }
        }
    }
}

// Load modules that apply to all pages, then modules for the current page.
loadModulesByPage("*", getVariables);
loadModulesByPage(getVariables["p"], getVariables);