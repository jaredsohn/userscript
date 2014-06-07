// ==UserScript==
// @name       TrollBook
// @namespace  http://www.kiricon.net
// @version    3.1
// @description Use your favorite Homestuck Troll's colored text on websites such as Facebook, Google+ or Twitter!
// @match      https://*/*
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
var textcode1 ='<span style="color:';
var textcode2 ='!important; font-weight:bold!important;">';
var imagecode1 = '<img class="troll-emoticon-img troll-the-whole-web" src="';
var imagecode2 = '" width="150px" height="125" />';
var rages = {
  //Trolls
  "aradia:": textcode1+'#a10000'+textcode2, //Megido
  "Aradia:": textcode1+'#a10000'+textcode2,
  "damara:": textcode1+'#a10000'+textcode2,
  "Damara:": textcode1+'#a10000'+textcode2,
  "tavros:": textcode1+'#a15000'+textcode2, //Nitram
  "Tavros:": textcode1+'#a15000'+textcode2,
  "rufioh:": textcode1+'#a15000'+textcode2,
  "Rufioh:": textcode1+'#a15000'+textcode2,
  "sollux:": textcode1+'#a1a100'+textcode2, //Captor
  "Sollux:": textcode1+'#a1a100'+textcode2,
  "mituna:": textcode1+'#a1a100'+textcode2,
  "Mituna:": textcode1+'#a1a100'+textcode2,
  "karkat:": textcode1+'#626262'+textcode2, //Vantas
  "Karkat:": textcode1+'#626262'+textcode2,
  "kankri:": textcode1+'#FF0000'+textcode2,
  "Kankri:": textcode1+'#FF0000'+textcode2,
  "nepeta:": textcode1+'#416600'+textcode2, //Leijon
  "Nepeta:": textcode1+'#416600'+textcode2,
  "meulin:": textcode1+'#416600'+textcode2, 
  "Meulin:": textcode1+'#416600'+textcode2,
  "kanaya:": textcode1+'#008141'+textcode2, //Maryam
  "Kanaya:": textcode1+'#008141'+textcode2,
  "porrim:": textcode1+'#008141'+textcode2,
  "Porrim:": textcode1+'#008141'+textcode2,
  "terezi:": textcode1+'#008282'+textcode2, //Pyrope
  "Terezi:": textcode1+'#008282'+textcode2,
  "latula:": textcode1+'#008282'+textcode2,
  "Latula:": textcode1+'#008282'+textcode2,
  "vriska:": textcode1+'#005682'+textcode2, //Serket
  "Vriska:": textcode1+'#005682'+textcode2,
  "aranea:": textcode1+'#005682'+textcode2,
  "Aranea:": textcode1+'#005682'+textcode2,
  "equius:": textcode1+'#000056'+textcode2, //Zahhak
  "Equius:": textcode1+'#000056'+textcode2,
  "horrus:": textcode1+'#000056'+textcode2,
  "Horrus:": textcode1+'#000056'+textcode2,
  "gamzee:": textcode1+'#2b0057'+textcode2, //Makara
  "Gamzee:": textcode1+'#2b0057'+textcode2,
  "kurloz:": textcode1+'#2b0057'+textcode2,
  "Kurloz:": textcode1+'#2b0057'+textcode2,
  "eridan:": textcode1+'#6a006a'+textcode2, //Ampora
  "Eridan:": textcode1+'#6a006a'+textcode2,
  "cronus:": textcode1+'#6a006a'+textcode2,
  "Cronus:": textcode1+'#6a006a'+textcode2,
  "feferi:": textcode1+'#77003c'+textcode2, //Peixes
  "Feferi:": textcode1+'#77003c'+textcode2,
  "meenah:": textcode1+'#77003c'+textcode2,
  "Meenah:": textcode1+'#77003c'+textcode2,
  //Humans
  "dave:": textcode1+'#e00707'+textcode2, //Strider
  "Dave:": textcode1+'#e00707'+textcode2,
  "dirk:": textcode1+'#F2A400'+textcode2,
  "Dirk:": textcode1+'#F2A400'+textcode2,
  "john:": textcode1+'#0715cd'+textcode2, //Egbert
  "John:": textcode1+'#0715cd'+textcode2,
  "jane:": textcode1+'#00D5F2'+textcode2, //Crocker
  "Jane:": textcode1+'#00D5F2'+textcode2,
  "jade:": textcode1+'#4ac925'+textcode2,//Harley
  "Jade:": textcode1+'#4ac925'+textcode2,
  "jake:": textcode1+'#4ac925'+textcode2,// English
  "Jake:": textcode1+'#4ac925'+textcode2,
  "rose:": textcode1+'#b536da'+textcode2,//Lalonde
  "Rose:": textcode1+'#b536da'+textcode2,
  "roxy:": textcode1+'#FF6FF2'+textcode2,
  "Roxy:": textcode1+'#FF6FF2'+textcode2,
  //Misc
  "Doc:": textcode1+'#FFFFFF'+textcode2,
  "doc:": textcode1+'#FFFFFF'+textcode2,
  "nana:": textcode1+'#00d5f2'+textcode2,
  "Nana:": textcode1+'#00d5f2'+textcode2,
  "davesprite:": textcode1+'#f2a400'+textcode2,
  "Davesprite:": textcode1+'#f2a400'+textcode2,
  
  //IMAGES
  ":angryjohn:": imagecode1+'http://25.media.tumblr.com/c927c4a8485cbd03c577c6afd3a2b926/tumblr_mnwf3pEmB31suttato1_500.png'+imagecode2, //Section 1
  ":angrykarkat:": imagecode1+'http://25.media.tumblr.com/fd6edb9c2a8c3c2dec70480fb5cf4927/tumblr_mnwf3pEmB31suttato2_1280.gif'+imagecode2,
  ":angrynepeta:": imagecode1+'http://25.media.tumblr.com/67c8af30a2d182cc74615a0d01572599/tumblr_mnwf3pEmB31suttato3_250.gif'+imagecode2,
  ":aradia:": imagecode1+'http://25.media.tumblr.com/8b6ab2e37c08f2a9997078ab8cdf1054/tumblr_mnwf3pEmB31suttato4_500.gif'+imagecode2,
  ":awesome:": imagecode1+'http://25.media.tumblr.com/df90efdbf14e6de81c015e62164df730/tumblr_mnwf3pEmB31suttato5_250.png'+imagecode2,
  ":bluhfight:": imagecode1+'http://24.media.tumblr.com/0fb791f8676cf0c34c148c26bc905e7b/tumblr_mnwf3pEmB31suttato6_500.gif'+imagecode2,
  ":botsplode:": imagecode1+'http://24.media.tumblr.com/c2fc95a41e6c55a1e7c9f8e197e281d6/tumblr_mnwf3pEmB31suttato7_500.gif'+imagecode2,
  ":bucket:": imagecode1+'http://24.media.tumblr.com/4825943dd2ef8b3b8c7c5ffb4dd8d7be/tumblr_mnwf3pEmB31suttato8_500.gif'+imagecode2,
  ":cryingsollux:": imagecode1+'http://25.media.tumblr.com/6c9a706401c9449874611269085000f6/tumblr_mnwf3pEmB31suttato9_500.gif'+imagecode2,
  ":debunk:": imagecode1+'http://25.media.tumblr.com/7442079c79f3e6811cd27ba3144b049a/tumblr_mnwf3pEmB31suttato10_1280.gif'+imagecode2, 
  ":derp:": imagecode1+'http://24.media.tumblr.com/2c451aad5d272a4a292c3bbebc963f08/tumblr_mnwf60tP9x1suttato1_400.png'+imagecode2, //Section 2
  ":doitfaggot:": imagecode1+'http://25.media.tumblr.com/4335cc397856bca0824217c92e962a3b/tumblr_mnwf60tP9x1suttato2_500.gif'+imagecode2,
  ":dragonterezi:": imagecode1+'http://24.media.tumblr.com/bfe555e8c586c472f846b486d7abf3e3/tumblr_mnwf60tP9x1suttato3_100.png'+imagecode2,
  ":eridanbonk:": imagecode1+'http://25.media.tumblr.com/34000faad881bd03c9f7019986e7d46e/tumblr_mnwf60tP9x1suttato4_500.gif'+imagecode2,
  ":facepalmx2:": imagecode1+'http://25.media.tumblr.com/fc79b878cd965377a897360c30b9f3a2/tumblr_mnwf60tP9x1suttato5_500.gif'+imagecode2,
  ":fightingyouth:": imagecode1+'http://24.media.tumblr.com/0da1f62ddac5e2acea9608eb6cddc3cd/tumblr_mnwf60tP9x1suttato6_500.gif'+imagecode2,
  ":fistbump:": imagecode1+'http://25.media.tumblr.com/4a738717694b35de418f6b7a5b837c9d/tumblr_mnwf60tP9x1suttato7_1280.gif'+imagecode2,
  ":flail:": imagecode1+'http://24.media.tumblr.com/3193d41615ea7fbf73fcc8c1987a7cf2/tumblr_mnwf60tP9x1suttato8_400.gif'+imagecode2,
  ":foreveraloneeridan:": imagecode1+'http://24.media.tumblr.com/63cfb40706a1fbac88e975e91c205539/tumblr_mnwf60tP9x1suttato9_1280.jpg'+imagecode2,
  ":gamzeerage:": imagecode1+'http://25.media.tumblr.com/89b283bf67ba13fcf88c12c197126345/tumblr_mnwf60tP9x1suttato10_500.gif'+imagecode2,
  ":gamzeewhat:": imagecode1+'http://25.media.tumblr.com/d28dcce523ca3827c29adc7cab64ab01/tumblr_mnwf7qbpKQ1suttato1_1280.gif'+imagecode2, 
  ":happygamzee:": imagecode1+'http://25.media.tumblr.com/e3eda52172e1cfaea06cae61b331582d/tumblr_mnwf7qbpKQ1suttato2_500.gif'+imagecode2, //Section 3
  ":itoldyou:": imagecode1+'http://25.media.tumblr.com/ac2117864a6fffde47a80ee34b89791b/tumblr_mnwf7qbpKQ1suttato3_400.jpg'+imagecode2,
  ":jane:": imagecode1+'http://25.media.tumblr.com/56f0841c82754ddee9fa4326cbebc7c4/tumblr_mnwf7qbpKQ1suttato4_500.gif'+imagecode2,
  ":johnbluh:": imagecode1+'http://24.media.tumblr.com/66efc2ad5c4ca5b7b8f04f8a1d37a87b/tumblr_mnwf7qbpKQ1suttato5_1280.gif'+imagecode2,
  ":kanayawhat:": imagecode1+'http://24.media.tumblr.com/97b67ce5ef766f16c8f73ead67163fc1/tumblr_mnwf7qbpKQ1suttato6_500.png'+imagecode2,
  ":karkatbluh:": imagecode1+'http://24.media.tumblr.com/95b809a4dd4ebe38513e76a8b4f738c2/tumblr_mnwf7qbpKQ1suttato7_1280.gif'+imagecode2,
  ":karkatbonk:": imagecode1+'http://25.media.tumblr.com/8e760ef28ceaf7cf193fb40237b64356/tumblr_mnwf7qbpKQ1suttato8_500.png'+imagecode2,
  ":karkatrage:": imagecode1+'http://24.media.tumblr.com/f0488738c1b741b32b2de249b2bdf61a/tumblr_mnwf7qbpKQ1suttato9_500.gif'+imagecode2,
  ":karkatwhat:": imagecode1+'http://25.media.tumblr.com/b4ac9dbc72970aded24a1d9d6ffbc0e9/tumblr_mnwf7qbpKQ1suttato10_1280.png'+imagecode2, 
  ":kiss:": imagecode1+'http://25.media.tumblr.com/3f1687b2441e041bf3b9e8133285a987/tumblr_mnwf93bGD51suttato1_500.gif'+imagecode2, //Section 4
  ":lick:": imagecode1+'http://25.media.tumblr.com/cac04bf9cd87d3d7fc24b73ad288a5d7/tumblr_mnwf93bGD51suttato2_500.gif'+imagecode2, 
  ":love:": imagecode1+'http://25.media.tumblr.com/78bd25f266148597ef8ab80e6009e8c4/tumblr_mnwf93bGD51suttato3_500.gif'+imagecode2, 
  ":nah:": imagecode1+'http://25.media.tumblr.com/5932271e736d37955944215fac027293/tumblr_mnwf93bGD51suttato4_400.png'+imagecode2,
  ":nepetashocked:": imagecode1+'http://25.media.tumblr.com/b2392ac6045e9217714b1ad4a21ca60c/tumblr_mnwf93bGD51suttato5_400.gif'+imagecode2,
  ":nope:": imagecode1+'http://24.media.tumblr.com/622f1a790e59da596a0b2fd8e2b67eb9/tumblr_mnwf93bGD51suttato7_500.png'+imagecode2,
  ":notbad:": imagecode1+'http://24.media.tumblr.com/8245da65c1f62ca84cbdfe52840eaf31/tumblr_mnwf93bGD51suttato6_1280.png'+imagecode2,
  ":ohmy:": imagecode1+'http://25.media.tumblr.com/7ed623ed9a6277337794b33236c6bea1/tumblr_mnwf93bGD51suttato8_250.png'+imagecode2,
  ":pogohammer:": imagecode1+'http://25.media.tumblr.com/690d487110fe31b8aa4a71702d9089c5/tumblr_mnwf93bGD51suttato9_500.gif'+imagecode2,
  ":roxy:": imagecode1+'http://24.media.tumblr.com/9de96aa395ecb9a497c170e444c16e09/tumblr_mnwf93bGD51suttato10_400.png'+imagecode2,
  ":roxybluh:": imagecode1+'http://24.media.tumblr.com/7e3e0390265cd103a410392612c2c373/tumblr_mnwfc7EJRD1suttato1_1280.gif'+imagecode2, //Section 5
  ":sadterezi:": imagecode1+'http://25.media.tumblr.com/8f832985f8c020da6576e5a8f9c485c1/tumblr_mnwfc7EJRD1suttato2_500.gif'+imagecode2,
  ":sexyequius:": imagecode1+'http://24.media.tumblr.com/4fc657e9bfee6df5a136438f69ca8f32/tumblr_mnwfc7EJRD1suttato10_400.gif'+imagecode2,
  ":shockeddave:": imagecode1+'http://25.media.tumblr.com/b5edfc88a2470d6eb156283fca86405c/tumblr_mnwfc7EJRD1suttato3_1280.gif'+imagecode2,
  ":shockedkarkat:": imagecode1+'http://25.media.tumblr.com/0b8980f74323811d9f00ab5d56adb98a/tumblr_mnwfc7EJRD1suttato4_500.gif'+imagecode2,
  ":shooshpap:": imagecode1+'http://24.media.tumblr.com/5ec8e2c8301f408c690ec48eb6f1c15c/tumblr_mnwfc7EJRD1suttato6_500.gif'+imagecode2,
  ":sollux:": imagecode1+'http://25.media.tumblr.com/67cd042f01b3c42ea61c8c0c4a3fa55e/tumblr_mnwfc7EJRD1suttato5_1280.png'+imagecode2,
  ":tavrosup:": imagecode1+'http://24.media.tumblr.com/3f346f30dc2774a309f4592610514dfc/tumblr_mnwfc7EJRD1suttato7_500.gif'+imagecode2,
  ":terezislap:": imagecode1+'http://25.media.tumblr.com/3cfbe42ce04e1ead96fc9d79ad7c646f/tumblr_mnwfc7EJRD1suttato8_1280.gif'+imagecode2,
  ":thisisstupid:": imagecode1+'http://25.media.tumblr.com/d28dcce523ca3827c29adc7cab64ab01/tumblr_mnwf7qbpKQ1suttato1_1280.gif'+imagecode2,
  ":thisisstupid2:": imagecode1+'http://24.media.tumblr.com/8bbd7defcb21405e47530eaa6e6bb39c/tumblr_mnwfc7EJRD1suttato9_1280.gif'+imagecode2,
  ":thumbsup:": imagecode1+'http://25.media.tumblr.com/d28dcce523ca3827c29adc7cab64ab01/tumblr_mnwf7qbpKQ1suttato1_1280.gif'+imagecode2,//section 6
  ":umad:": imagecode1+'http://24.media.tumblr.com/c3dbdda64a65c7b0a08b389df5fb50f0/tumblr_mnwfhmXN4w1suttato10_500.gif'+imagecode2,
  ":vriska:": imagecode1+'http://25.media.tumblr.com/0689b343f0f89e0a6c73de1a94bb4a97/tumblr_mnwfjrdFV91suttato1_500.gif'+imagecode2,
  ":whatthefuck:": imagecode1+'http://25.media.tumblr.com/cb0a47c2d3930bc53f5de52c79743407/tumblr_mnwfjrdFV91suttato2_500.gif'+imagecode2,
  ":wtfgushers:": imagecode1+'http://24.media.tumblr.com/b99b0ccec6be2b8e7acb1dbabaae7ac9/tumblr_mo0iluWfT31suttato10_400.jpg'+imagecode2,
  ":youthroll:": imagecode1+'http://25.media.tumblr.com/6cd84b41cbdc8fccb93472f55f29595a/tumblr_mnwfjrdFV91suttato3_1280.gif'+imagecode2,
  ":zillyhoo:": imagecode1+'http://24.media.tumblr.com/52de40288c62a288987d510791c9e0c8/tumblr_mnyk848Z4Q1suttato1_500.gif'+imagecode2,
   //New additions
   ":thumbsdown:": imagecode1+'http://24.media.tumblr.com/aa62b7663bfed996701ffb6c59f313d3/tumblr_mo0iluWfT31suttato9_1280.jpg'+imagecode2,
   ":pounce:": imagecode1+'http://25.media.tumblr.com/8a8144df55266a8406a267d394a16127/tumblr_mo0iluWfT31suttato8_500.gif'+imagecode2,
   ":no:": imagecode1+'http://25.media.tumblr.com/02cb9584559a8e18a10bfb8d7cf0e35e/tumblr_mo0iluWfT31suttato7_1280.gif'+imagecode2,
   ":mituna:": imagecode1+'http://25.media.tumblr.com/5bb2f21dc509966b2f53e90433d7e964/tumblr_mo0iluWfT31suttato6_500.gif'+imagecode2,
   ":honk:": imagecode1+'http://25.media.tumblr.com/f25351d5462d97e12b5bf9ae3c17aa62/tumblr_mo0iluWfT31suttato5_500.gif'+imagecode2,
   ":happyjade:": imagecode1+'http://25.media.tumblr.com/7547f4f78a051c60b28091249f3234b0/tumblr_mo0iluWfT31suttato4_400.gif'+imagecode2,
   ":happymeulin:": imagecode1+'http://25.media.tumblr.com/289cd3ec192303c36b12279b895ff5bc/tumblr_mo0iluWfT31suttato3_250.gif'+imagecode2,
   ":getogreit:": imagecode1+'http://24.media.tumblr.com/d48309527820e593e097da150d7d7139/tumblr_mo0iluWfT31suttato2_500.jpg'+imagecode2,
   ":hussie:": imagecode1+'http://25.media.tumblr.com/985f68fee3ae8e3cf3b8517cbbbd099a/tumblr_mo0iluWfT31suttato1_400.gif'+imagecode2,
   ":elgasp:": imagecode1+'http://25.media.tumblr.com/8a6307ba7fabdea04458b33b2914e305/tumblr_mo0iwy2Poy1suttato1_500.jpg'+imagecode2,
   ":ewdave:": imagecode1+'http://25.media.tumblr.com/5f2069f8d701970df753493b7946fffe/tumblr_mo0iwy2Poy1suttato2_250.gif'+imagecode2,
   //Custom Colors!!
   "<:" : "<span style='color:",
   ":>" : " !important;' >"
};

// Generate img html for each rage face.
(function(){
    var  k,
      textvalue;

  for (k in rages) {
	  textvalue = rages[k];
    rages[k] = '<span class="tooltiptrolol" data-emoticon="' + k + '">'+textvalue+'';
  }
}())



var init = function() {
  // MutationObserver is still prefixed in Chrome.
  window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  // Simple debug logging function
  var DEBUG = false;
  var log = function() {
    if (DEBUG)
      console.log.apply(console.log, arguments);
  }

  // Replaces emoticons inside text nodes with images.
  var replaceTextNode = (function() {
    // Cache our temp document and regex
    var temp = document.createElement('div'),
        re = /([a-z0-9]+:)/gi,
        rere = /(:+[a-z0-9]+:)/gi;
         

    return function(textNode) {
      var html = textNode.data,
          matches = {},
          matchesFound = 0,
          emoticon,
          img;

      // Find emoticon placeholders.
      while (match = re.exec(html)) {
        if ((emoticon = match[1]) == null)
          continue;

        // Lookup img, invalid if img is not for given emoticon.
        if ((img = rages[emoticon]) == null)
          continue;

        // Store match for replacement.
        matches[emoticon] = img;
        matchesFound += 1;
      }
      
      while (match = rere.exec(html)) {
        if ((emoticon = match[1]) == null)
          continue;

        // Lookup img, invalid if img is not for given emoticon.
        if ((img = rages[emoticon]) == null)
          continue;

        // Store match for replacement.
        matches[emoticon] = img;
        matchesFound += 1;
      }

      // Bail out if no matches found.
      if (matchesFound === 0) return;

      log('matches found with following selectors:', textNode.parentNode.className);

      // Replace each match
      for (var k in matches) {
        log(k, 'match');
        html = html.replace(new RegExp(k, 'gi'), matches[k]);
      }

      // Use temporary element to convert to html nodes.
      temp.innerHTML = html;

      // Insert new nodes.
      while (temp.firstChild != null) {
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
      }

      // Remove original text node.
      textNode.parentNode.removeChild(textNode);
    }
  }());

  // Injects emoticons into descendent text nodes
  var injectEmoticons = function(root) {
        // var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: filterNode}, false),
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false),
            nodes = [],
            node;

    log('walking', root)

    while (node = walker.nextNode()) {
      // ignore script tags
      if (node.parentNode.nodeName === 'SCRIPT') continue
      nodes.push(node);
    }

    log(nodes.length, 'descendent nodes traversed');

    for (var i=0; i<nodes.length; i++) {
      replaceTextNode(nodes[i]);
    }

  }

  // Use Mutation Observer to watch for changes.
  var watcher = function(el) {
    var observer = new MutationObserver(function(mutations) {
      var mutationsLength = mutations.length;
      for (var i=0; i<mutationsLength; i++) {
        injectEmoticons(mutations[i].target);
      }
    });

    observer.observe(el, {childList: true, subtree: true});
  };

  var lookupDomain = function(domain) {
    var domains = {};

    // Example of domain customization options:
    // var domains = {
    //   'facebook.com': {
    //
    //     // Selectors that will be used instead of document.body
    //     selectors: ['some', 'selectors'],
    //
    //     // Customized watching code.
    //     watcher: function(el) {
    //     }
    //   }
    // };

    // Strip subdomains from domain
    var parseDomain = function(hostname) {
      var match = /\w+\.\w+$/.exec(hostname);
      if (match != null) return match[0];
    }

    // Look up selectors/customizations needed for current domain
    return domains[parseDomain(domain)] || {};
  }

  // Look up any site-specific customizations.
  var domain = lookupDomain(window.location.hostname);


  // Initial replacement
  window.addEventListener('DOMContentLoaded', function() {
    // Use custom selectors if possible
    if (domain.selectors != null) {
      for (var i=0; i<domain.selectors.length; i++) {
        var elements = document.querySelectorAll(domain.selectors[i]);
        for (var j=0; j<elements.length; j++) {
          // Initial injection.
          injectEmoticons(elements[i]);

          // Watch for changes
          if (domain.watcher != null)
            domain.watcher(elements[i]);
          else
            watcher(elements[i]);
        }
      }
    } else {
      // Use document.body to do initial injection and watch document.body for changes
      injectEmoticons(document.body);

      // Watch for changes
      if (domain.watcher != null)
        domain.watcher(document.body);
      else
        watcher(document.body);
    }

    // Monkey patch history.pushState to fire custom __pushstate event whenever it's called.
    var script = document.createElement('script');
    script.innerHTML = "(function() {" +
                       "  var __pushState = window.history.pushState;" +
                       "  window.history.pushState = function(state, title, url) {" +
                       "    var event = new CustomEvent('__pushstate', {state: state, title: title, url: url});" +
                       "    window.dispatchEvent(event);" +
                       "    __pushState.apply(window.history, arguments);" +
                       "  };" +
                       "}())";

    // Inject script into tab context so we can detect history changes and call show page action again.
    document.head.appendChild(script);

    // Listen for __pushstate event and showPageAction again on url changes.
    window.addEventListener('__pushstate', function() {
     showPageAction();
    });

  });
};

// Sometimes chrome preloads pages, we want to avoid running on those pages.
if (document.webkitVisibilityState !== 'prerender') init();





