// Ravelry badges on pattern sites
// version 1.0
// 2009-07-25
// by casey
//
// ----------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ravelry badges on pattern sites", and click Uninstall.
//
// ----------------------------------------------------------------------
//
// ==UserScript==
// @name           Ravelry badges on pattern sites
// @namespace      http://www.ravelry.com
// @description    Show a small Ravelry link and project count image on pattern pages that are listed in Ravelry's pattern database.  ~140 sites that have more than 50 patterns listed on Ravelry are included.
//
// @include        http://www.abc-knitting-patterns.com/*
// @include        http://afewstitchesshort.blogspot.com/*
// @include        http://www.agoodyarn.net/*
// @include        http://anleitungen.bestrickendes.de/*
// @include        http://www.anniesattic.com/*
// @include        http://www.artesanoyarns.co.uk/*
// @include        http://www.belle-online.de/*
// @include        http://www.bergeredefrance.fr/*
// @include        http://www.bernat.com/*
// @include        http://www.berroco.com/*
// @include        http://www.bevscountrycottage.com/*
// @include        http://www.bigskyknitting.com/*
// @include        http://bingeknitter.blogspot.com/*
// @include        http://www.blackberry-ridge.com/*
// @include        http://www.blueskyalpacas.com/*
// @include        http://www.bymelissa.net/*
// @include        http://cache.lionbrand.com/*
// @include        http://www.canadianliving.com/*
// @include        http://www.caron.com/*
// @include        http://www.catirinabonetdesigns.com/*
// @include        http://cats-rockin-crochet.blogspot.com/*
// @include        http://www.classiceliteyarns.com/*
// @include        http://www.coatsandclark.com/*
// @include        http://www.cocoknits.com/*
// @include        http://www.craftbits.com/*
// @include        http://www.craftown.com/*
// @include        http://www.craftster.org/*
// @include        http://crochet-mania.blogspot.com/*
// @include        http://crochet.about.com/*
// @include        http://www.crochetgarden.com/*
// @include        http://www.crochetme.com/*
// @include        http://crochetme.com/*
// @include        http://www.crochetnbeads.com/*
// @include        http://www.crochetspot.com/*
// @include        http://www.crochetville.org/*
// @include        http://www.dawnadcock.com/*
// @include        http://www.dawnbrocco.com/*
// @include        http://designpatternpage.blogspot.com/*
// @include        http://designs-by-emily.com/*
// @include        http://www.designs-by-emily.com/*
// @include        http://digknittydesigns.blogspot.com /*
// @include        http://dishingknitout.blogspot.com/*
// @include        http://www.diynetwork.com/*
// @include        http://www.e-patternscentral.com/*
// @include        http://www.e-spot.biz/*
// @include        http://www.elann.com/*
// @include        http://elann.com/*
// @include        http://www.fibertrends.com/*
// @include        http://www.fiddlesticksknitting.com/*
// @include        http://www.freepatterns.com/*
// @include        http://freepatterns.k1p1keepingyouinstitchesstudio.com/*
// @include        http://www.freevintageknitting.com/*
// @include        http://www.freshislefibers.com/*
// @include        http://www.garnstudio.com/*
// @include        http://www.gourmetcrochet.com/*
// @include        http://harvestmoonupperroom.blogspot.com/*
// @include        http://www.heartstringsfiberarts.com/*
// @include        http://hookandneedledesigns.com/*
// @include        http://www.interweave.com/*
// @include        http://www.interweavecrochet.com/*
// @include        http://www.interweaveknits.com/*
// @include        http://www.interweavestore.com/*
// @include        http://www.jpfun.com/*
// @include        http://www.kimhargreaves.co.uk/*
// @include        http://www.kirakdesigns.com/*
// @include        http://knitalittlestore.blogspot.com/*
// @include        http://www.knitlist.com/*
// @include        http://www.knitonthenet.com/*
// @include        http://www.knitpicks.com/*
// @include        http://www.knitrowan.com/*
// @include        http://www.knitsbyrachel.com/*
// @include        http://www.knitspot.com/*
// @include        http://knitted-kitty-creations.com/*
// @include        http://knitting-and.com/*
// @include        http://www.knitting-and.com/*
// @include        http://www.knitting-crochet.com/*
// @include        http://www.knittingdaily.com/*
// @include        http://www.knittingknonsense.com/*
// @include        http://www.knittingonthenet.com/*
// @include        http://www.knittingpureandsimple.com/*
// @include        http://www.knittingzone.com/*
// @include        http://www.knitty.com/*
// @include        http://knitty.com/*
// @include        http://knitwithkt.blogspot.com/*
// @include        http://www.knotions.com/*
// @include        http://kodymayknits.blogspot.com/*
// @include        http://www.leisurearts.com/*
// @include        http://www.lionbrand.com/*
// @include        http://www.littleturtleknits.com/*
// @include        http://www.louet.com/*
// @include        http://ludysbears.tripod.com/*
// @include        http://www.maggiescrochet.com/*
// @include        http://marilynsknittingheavenonearth.blogspot.com/*
// @include        http://www.michaels.com/*
// @include        http://www.morehousefarm.com/*
// @include        http://www.nashuaknits.com/*
// @include        http://www.naturallycaron.com/*
// @include        http://naturallycaron.com/*
// @include        http://www.needlebeetle.com/*
// @include        http://novita.fi/*
// @include        http://www.novita.fi/*
// @include        http://www.p2designs.com/*
// @include        http://www.patonsyarns.com/*
// @include        http://www.patternfish.com/*
// @include        http://peaches-creme.com/*
// @include        http://www.phildar.fr/*
// @include        http://www.piece-by-piece.net/*
// @include        http://www.plymouthyarn.com/*
// @include        http://www.purlbee.com/*
// @include        http://www.rakuten.co.jp/*
// @include        http://www.rebecca-online.de/*
// @include        http://www.sandnesgarn.no/*
// @include        http://schaeferyarn.com/*
// @include        http://www.schaeferyarn.com/*
// @include        http://www.schoolhousepress.com/*
// @include        http://www.shopatron.com/*
// @include        http://simpleartsplanet.com/*
// @include        http://www.sirdar.co.uk/*
// @include        http://sockpixie.blogspot.com/*
// @include        http://www.soysilk.com/*
// @include        http://www.stitchdiva.com/*
// @include        http://www.straw.com/*
// @include        http://suzies-yarnie-stuff.blogspot.com/*
// @include        http://www.sweaterbabe.com/*
// @include        http://www.tahkistacycharles.com/*
// @include        http://www.technicalillustrator.net/*
// @include        http://www.tradewindknits.com/*
// @include        http://www.twistcollective.com/*
// @include        http://www.ullaneule.net/*
// @include        http://www.unicornbooks.com/*
// @include        http://www.verenaknitting.com/*
// @include        http://www.vermontfiberdesigns.com/*
// @include        http://violetgreen.co.uk/*
// @include        http://www.vogueknitting.com/*
// @include        http://www.von-stroh-zu-gold.de/*
// @include        http://www.whiteliesdesigns.com/*
// @include        http://woodhilldesignknits.blogspot.com/*
// @include        http://www.woollythoughts.com/*
// @include        http://www.yarn.com/*patterns/*
// ==/UserScript==


// set up namespace
if (!window.RavMonkey) {
  window.RavMonkey = {};
}

RavMonkey.patternBadger = function() {
  
  var API_BASE = "http://api.ravelry.com";
  var RAV_BASE = "http://www.ravelry.com";
  var USER_AGENT = "Mozilla/5.0 (RavMonkey.patternBadger 1.0)";
  
  return {
    run: function() {
      var location = encodeURIComponent(document.location.href);

      // Create a placeholder for the badge in the lower right corner
      var badge = document.createElement("DIV");
      badge.id = "rav_gm_badge";
      badge.style.position = "fixed";
      badge.style.right = "10px";
      badge.style.bottom = "5px";
      badge.style.display = "none"; // we'll show it when the image loads

      // just in case the site's stylesheet does weird things...
      badge.style.backgroundColor = "transparent";
      badge.style.border = "none";
      badge.style.margin = "0";
      badge.style.padding = "0";

      // Ravelry has a way to retreive a project badge image by URL
      var plainCss = "border:none; background-color: transparent; margin: 0; padding: 0;";
      var onload = "document.getElementById('rav_gm_badge').style.display = '';";
      badge.innerHTML = '<a style="' + plainCss + '" href="' + RAV_BASE + '/badges/redirect?purl=' + location + '">'
        + '<img onload="' + onload + '" style="' + plainCss + '" src="' + API_BASE + '/badges/projects?purl=' + location + '"/>'
        + '</a>';

      document.body.appendChild(badge);
    }
  }
}();

RavMonkey.patternBadger.run()
