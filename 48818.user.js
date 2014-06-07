// ==UserScript==
// @name           PidginSmileys Emoticons [Emoplurk Add-On]
// @namespace      http://userscripts.org/users/89517
// @description    Pidgin Smileys Set for "EMOPLURK 2.0"
// @version        1
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="PidginSmileys"href="http://img.photobucket.com/albums/v489/Fealuin/Pidgin/">act-up.png,angry.png,arrogant.png,at-wits-end.png,bashful.png,beat-up.png,beauty.png,blowkiss.png,bulgy-eyes.png,bye.png,call-me.png,clap.png,confused.png,crying.png,curl-lip.png,curse.png,cute.png,dance.png,dazed.png,desire.png,disappointed.png,disdain.png,doh.png,dont-know.png,drool.png,eat.png,embarrassed.png,excruciating.png,eyeroll.png,fingers-crossed.png,foot-in-mouth.png,freaked-out.png,free-for-chat.png,giggle.png,glasses-cool.png,glasses-nerdy.png,go-away.png,handshake.png,highfive.png,hug-left.png,hug-right.png,hypnotized.png,in-love.png,jump.png,kiss.png,kissed.png,kissing.png,lashes.png,laugh.png,loser.png,lying.png,mad-tongue.png,mean.png,meeting.png,messed.png,moneymouth.png,music.png,nailbiting.png,neutral.png,on-the-phone.png,party.png,pissed-off.png,pray.png,question.png,quiet.png,rotfl.png,sad.png,sarcastic.png,secret.png,shame.png,shock.png,shout.png,shut-mouth.png,sick.png,sidefrown.png,silly.png,sinister.png,sleepy.png,smile.png,smile-big.png,smirk.png,snicker.png,starving.png,stop.png,struggle.png,sweat.png,talktohand.png,teeth.png,terror.png,thinking.png,time-out.png,tongue.png,tremble.png,uhm-yeah.png,victory.png,waiting.png,waving.png,weep.png,wilt.png,wink.png,worship.png,yawn.png,alien.png,angel.png,bot.png,clown.png,cowboy.png,cyclops.png,devil.png,doctor.png,female-fighter.png,ghost.png,male-fighter.png,mohawk.png,pirate.png,skeleton.png,skywalker.png,snowman.png,soldier.png,vampire.png,bunny.png,cat.png,chicken.png,cow.png,dog.png,goat.png,monkey.png,pig.png,sheep.png,snail.png,turtle.png,cloudy.png,moon.png,rain.png,rainbow.png,star.png,sun.png,thunder.png,beer.png,bowl.png,cake.png,can.png,coffee.png,drink.png,liquor.png,pill.png,pizza.png,plate.png,auth.png,bad.png,boy.png,edit.png,error.png,founder.png,girl.png,good.png,half-operator.png,info.png,love.png,love-over.png,not-authorized.png,operator.png,peace.png,search.png,secure.png,unavailable.png,video.png,voice.png,yin-yang.png,airplane.png,bomb.png,camera.png,car.png,cigarette.png,clock.png,clover.png,coins.png,computer.png,console.png,film.png,game.png,hammer.png,handcuffs.png,hiptop.png,island.png,knife.png,lamp.png,mail.png,mobile.png,musical-note.png,phone.png,poop.png,present.png,pumpkin.png,rose.png,rose-dead.png,soccerball.png,tv.png,umbrella.png,watermelon.png,aim.png,bonjour.png,gadu-gadu.png,google-talk.png,icq.png,irc.png,jabber.png,meanwhile.png,msn.png,myspace.png,novell.png,qq.png,silc.png,simple.png,yahoo.png,zephyr.png</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);