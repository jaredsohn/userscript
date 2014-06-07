// ==UserScript== 
// @name           CA Star Wars Mod
// @namespace      http://userscripts.org/scripts/edit_src/73073
// @description    Replaces images of the CA Generals with Star Wars Characters
// @include        http*://apps.*facebook.com/castle_age/*
// @require		http://cloutman.com/jquery-latest.min.js
// ==/UserScript==
$(document).ready(function() {
   parse();
   var node_trigger = null;
   $('body').bind('DOMNodeInserted', function(event){
      if (!node_trigger && ($(event.target).attr('id') === 'app46755028429_app_body_container' || $(event.target).attr('id') === 'app46755028429_globalContainer')) {
         node_trigger = window.setTimeout(function(){node_trigger=null;parse();},100);
      }
   });
});
function parse(){
   // Do everything in here
   $('[src*="/hero_chase.jpg"]').attr('src', 'http://t2.gstatic.com/images?q=tbn:88oann35zwxaoM:http://www.empireonline.com/images/features/100greatestcharacters/photos/2.jpg');
   $('[src*="/hero_mercedes.jpg"]').attr('src', 'http://eclecticaerotica.com/wp-content/uploads/2009/08/leia-princess-slave.jpg');
   $('[src*="/hero_celesta.jpg"]').attr('src', 'http://www.swg1.net/encyclo/images/adi_gallia.jpg');

   $('[src*="/hero_zarevok.jpg"]').attr('src', 'http://i99.photobucket.com/albums/l286/medvock/kitfistoep3.jpg');
   $('[src*="/hero_leon.jpg"]').attr('src', 'http://llamabutchers.mu.nu/archives/HanSolo.jpg');
   $('[src*="/hero_strider.jpg"]').attr('src', 'http://www.supershadow.com/starwars/pictures_pics/ss/obi_wan_kenobi_1.jpg');
   $('[src*="/hero_penelope.jpg"]').attr('src', 'http://www.whowouldkickass.com/_images/t_large/a349eba812d9f1d78c4288ebf6f80a7b.jpg');
   $('[src*="/hero_sophia.jpg"]').attr('src', 'http://www.freewebs.com/gabelafastoe/DarthBane-frontal.jpg');
   $('[src*="/hero_dragan.jpg"]').attr('src', 'http://www.gutenberglampoon.com/columns/eric-carroll/wp-content/uploads/2009/11/luke-skywalker2.jpg');
   $('[src*="/hero_elena.jpg"]').attr('src', 'http://application.denofgeek.com/images/m/starwarslist/010_MomawNadon.jpg');
   $('[src*="/hero_aeris.jpg"]').attr('src', 'http://images2.wikia.nocookie.net/starwars/images/thumb/0/04/Jamillia-large.jpg/548px-Jamillia-large.jpg');
   $('[src*="/hero_cid.jpg"]').attr('src', 'http://aleptu.com/images/2009/05/r2d2_robot-iphone.jpg');

   $('[src*="/hero_sano.jpg"]').attr('src', 'http://www.scifinow.co.uk/gallery/users/8/thm450/c3po.jpg');
   $('[src*="/hero_garlan.jpg"]').attr('src', 'http://www.mywickedarmor.com/img/shadow.jpg');
   $('[src*="/hero_shino.jpg"]').attr('src', 'http://application.denofgeek.com/images/m/starwarslist/001_Max_Rebo.jpg');
   $('[src*="/hero_terra.jpg"]').attr('src', 'http://4.bp.blogspot.com/_rhTQQtcMO_Q/SvMd-nnENxI/AAAAAAAAAVo/yCq9rVfA5RU/s320/ponda-baba.jpg');
   $('[src*="/hero_edea.jpg"]').attr('src', 'http://images.wikia.com/starwars/images/7/7f/Brenderlin.jpg');
   $('[src*="/hero_titania.jpg"]').attr('src', 'http://hiphopolitic.files.wordpress.com/2009/06/jar_jar_binks_large1.jpeg');
   $('[src*="/hero_morrigan.jpg"]').attr('src', 'http://www.dbtechno.com/images/BioWare_Star_Wars_KOTOR.jpg');
   $('[src*="/hero_riku.jpg"]').attr('src', 'http://gryllus.net/Blender/Project_Images/starwars.jpg');
   $('[src*="/hero_dante.jpg"]').attr('src', 'http://i791.photobucket.com/albums/yy199/stallionltd/stormtrooper-1.jpg');

   $('[src*="/hero_elizabeth.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_vanquish.jpg"]').attr('src', 'http://dyn2.media.forbiddenplanet.com/products/1913255a0.jpg.size-300_square-true.jpg');
 
   $('[src*="/hero_araxis.jpg"]').attr('src', 'http://upload.wikimedia.org/wikipedia/en/thumb/6/6f/DookuBZZZ.jpg/250px-DookuBZZZ.jpg');
   $('[src*="/hero_nautica.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_artanis.jpg"]').attr('src', 'http://application.denofgeek.com/images/m/starwarslist/002_Lobot.jpg');
   $('[src*="/stonegiant_200.jpg"]').attr('src', 'http://www.the700level.com/images/2007/08/29/mace_windu.jpg');
   $('[src*="/hero_vulcan.jpg"]').attr('src', 'http://llamabutchers.mu.nu/archives/darth%20sidious.jpg');
   $('[src*="/hero_tifanna.jpg"]').attr('src', 'http://images2.wikia.nocookie.net/starwars/images/thumb/d/d9/MonMothma2.jpg/200px-MonMothma2.jpg');
   $('[src*="/hero_huntress.jpg"]').attr('src', 'http://images2.wikia.nocookie.net/starwars/images/thumb/d/d9/MonMothma2.jpg/200px-MonMothma2.jpg');

   $('[src*="/hero_gorlak.jpg"]').attr('src', 'http://swg.stratics.com/content/lore/personas/images/jabba.gif');
   $('[src*="/hero_ogre.jpg"]').attr('src', 'http://swg.stratics.com/content/lore/personas/images/jabba.gif');

   $('[src*="/hero_lailah.jpg"]').attr('src', 'http://www.shipperland.de/sw/lexikon/chara_gangster/jango_fett01.jpg');
   $('[src*="/hero_memnon.jpg"]').attr('src', 'http://www.pointsincase.com/files/u2/lando-calrissian.jpg');
   $('[src*="/hero_wizard.jpg"]').attr('src', 'http://www.pointsincase.com/files/u2/lando-calrissian.jpg');

   $('[src*="/hero_minerva.jpg"]').attr('src', 'http://www.archives-alliance.com/images/dva0539.jpg');
   $('[src*="/hero_angelica.jpg"]').attr('src', 'http://www.starwarsdailyupdate.com/wp-content/uploads/2009/01/padme_flowered_big.jpg');
   $('[src*="/hero_fenris.jpg"]').attr('src', 'http://img.webthrowdown.com/throwdowns/anakin-skywalker-437-1.jpg');
   $('[src*="/hero_werewolf.jpg"]').attr('src', 'http://img.webthrowdown.com/throwdowns/anakin-skywalker-437-1.jpg');
   
   $('[src*="/hero_dexter.jpg"]').attr('src', 'http://batkinsdiet.com/movies/darthbaner.jpg');
   $('[src*="/hero_aria.jpg"]').attr('src', 'http://alisonvuocolo.files.wordpress.com/2008/11/boba.jpg');
   $('[src*="/hero_leon.jpg"]').attr('src', 'http://members.shaw.ca/david.p.z.888/star_wars/pics/qui-gon_jinn.jpg');
   $('[src*="/hero_slayer.jpg"]').attr('src', 'http://www.members.shaw.ca/david.p.z.888/star_wars/pics/anakin_skywalker_young.jpg');
   $('[src*="/hero_lyra.jpg"]').attr('src', 'http://swg.stratics.com/content/lore/personas/images/chewbacca.gif');
   $('[src*="/quest_mephisto.jpg"]').attr('src', 'http://www.eatsleepgeek.com/wp-content/uploads/2009/06/darth-maul.jpg');
   
   $('[src*="/hero_ophelia.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_angel.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_serra.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/darkelf_boss_200.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/orc_boss.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_percival.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_twinfire.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_helena.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/hero_twinwater.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_marina.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/hero_vorenus.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/boss_keira_framed.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_illusia.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/hero_lucius.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/boss_lotus.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/boss_skaar.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_lothar.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_savannah.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/hero_demon.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_chimerus.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/boss_malekus.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   $('[src*="/hero_underworld.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_cartigan.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');
   $('[src*="/hero_kull.jpg"]').attr('src', 'http://fruitfly.files.wordpress.com/2007/11/stormtrooper.jpg');

   
   }