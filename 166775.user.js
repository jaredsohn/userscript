// ==UserScript==
// @name    		Candy box autoplay
// @version			0.2.1
// @license			Public Domain
// @description	    automatically fights the dragon in castle's keep
// @include			http*://candies.aniwey.net/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

var w = unsafeWindow;
var $ = w.$;

function startMakingPotions(potion, min, max) {
    if (!w.objects.list.cauldron.have) { return true; }
    
    var c = w.cauldron, num = potion.nbrOwned >= min ? 0 : max - potion.nbrOwned;
    if (c.candiesInTheCauldron > 0 || c.lollipopsInTheCauldron > 0 || c.weAreBoiling || c.weAreMixing) {
        return false;
    } else if (num <= 0) {
        return true;
    }
    
    console.log('should make ' + num + ' ' + potion.buttonText);
    
    return num;
}

function delayedCauldronAction(actionTimer, func) {
    window.setTimeout(func, (actionTimer - w.cauldron.actionTimer) * 1000);
}

function finishMakingPotions() {
    w.cauldron.stopActions();
    w.cauldron.putIntoBottles();
}

function makeInvulnerabilityPotions(min, max) {
    var num = startMakingPotions(w.potions.list.invulnerability, min, max);
    if (typeof num == "boolean") { return num; }
    if (w.candies.nbrOwned < 2000 * num) {
        console.log('not enough candies to make ' + num + ' invulnerability potions');
        return false;
    }
    
    w.tabs.select(3);
    $("#cauldron_candies_quantity").val(2000 * num);
    w.cauldron.putInTheCauldron();
    w.cauldron.setWeAreMixing(true);
    delayedCauldronAction(60, finishMakingPotions);
    return false;
}

function makeSeeds(min, max) {
    var num = startMakingPotions(w.potions.list.seed, min, max);
    if (typeof num == "boolean") { return num; }
    if (w.candies.nbrOwned < 650 * num) {
        console.log('not enough candies to make ' + num + ' seeds');
        return false;
    }
    
    w.tabs.select(3);
    w.cauldron.setWeAreBoiling(true);
    delayedCauldronAction(32, function() {
        $("#cauldron_candies_quantity").val(650 * num);
        w.cauldron.putInTheCauldron();
        finishMakingPotions();
    });
    return false;
}

function makeHealthPotions(min, max) {
    var num = startMakingPotions(w.potions.list.health, min, max);
    if (typeof num == "boolean") { return num; }
    if (w.candies.nbrOwned < 100 * num || w.lollipops.nbrOwned < 100 * num) {
        console.log('not enough candies or lollipops to make ' + num + ' major health');
        return false;
    }
}

function makeMajorHealthPotions(min, max) {
    var num = startMakingPotions(w.potions.list.majorHealth, min, max);
    if (typeof num == "boolean") { return num; }
    if (w.candies.nbrOwned < 100 * num || w.lollipops.nbrOwned < 100 * num) {
        console.log('not enough candies or lollipops to make ' + num + ' major health');
        return false;
    }
    
    w.tabs.select(3);
    $("#cauldron_lollipops_quantity").val(100 * num);
    w.cauldron.putInTheCauldron();
    w.cauldron.setWeAreMixing(true);
    $("#cauldron_candies_quantity").val(100 * num);
    w.cauldron.putInTheCauldron();
    delayedCauldronAction(20, finishMakingPotions);
    return false;
}

function buyHealthPotion(min, max) {
    if ($("#products_after_swords").css('visibility') == 'none') { return true; }
    
    var potion = w.potions.list.health;
    if (potion.nbrOwned >= min) { return true; }
    
    w.tabs.select(0);
    while(potion.nbrOwned < max) {
        if (w.candies.nbrOwned < 150) { return false; }
        w.potions.buyHealth(150);
    }
    return true;
}

function buyScrolls(scroll, min, max) {
    if ($("#products_after_swords").css('visibility') == 'none') { return true; }
    if (scroll.nbrOwned >= min) { return true; }
    
    w.tabs.select(0);
    while(scroll.nbrOwned < max) {
        if (w.candies.nbrOwned < 400) { return false; }
        w.potions.buyScroll(400);
    }
    return true;
}

function getMe() {
    return w.quest.things[w.quest.getCharacterIndex()];
}

function getLandIndex() {
    return w.land.getLandIndexFromName($("#quest_destination").val());
}

function tryUseItem(item, criteria) {
    if (item.nbrOwned < 1 || criteria == false) { return false; }
    
    switch (item.type) {
        case "potion":
            if (w.quest.potionUseCountdown > 0) { return false; }
            break;
        case "scroll":
            if (w.quest.scrollUseCountdown > 0) { return false; }
            break;
        case "special":
            break;
    }
    
    switch (item.buttonText) {
        case "Invulnerability potion":
            if (w.quest.invulnerabilityCountdown > 0) { return false; }
            break;
        case "Turtle potion":
            if (w.quest.turtleCountdown  > 0) { return false; }
            break;
        case "Berserk potion":
            if (w.quest.berserkCountdown  > 0) { return false; }
            break;
    }
    eval("w." + item.action);
    return true;
}

var defaultPlayer = {
    prepare: function() {
        return buyHealthPotion(2, 5);
    },
    play: function() {
        if (!w.quest.weAreQuesting) { return; }
        
        var me = getMe();
        tryUseItem(w.potions.list.health);
        
        window.setTimeout(this.play.bind(this), w.quest.speed);
    }
};

var castleKeep = {
    
    prepare: function() {
        return buyScrolls(w.potions.list.teleportScroll, 10, 50)
        && makeSeeds(10, 50)
        && makeMajorHealthPotions(10, 50)
        && makeInvulnerabilityPotions(10, 50);
    },
    
    play: function() {
        if (!w.quest.weAreQuestingRightNow) { return; }
        
        var me = getMe();
        if (w.castleKeep.roomNumber == 6) {
            this.fightDragon(me);
        } else {
            tryUseItem(w.potions.list.majorHealth, me.hp < me.max_hp / 2);
        }
        window.setTimeout(this.play.bind(this), w.quest.speed);
    },
    
    fightDragon: function(me) {
        // the dragon is dead
        if (w.quest.things[17].type == "none") { return; }
        // the character is dead
        if (me.hp == 0) { return; }
        
        var index = w.quest.getCharacterIndex(),
            atDragon = w.quest.things[index + 1].type == "mob";
        
        if (atDragon) {
            if (!tryUseItem(w.potions.list.invulnerability)) {
                tryUseItem(w.potions.list.teleportScroll, this.shouldTeleport(me));
            }
        } else if (index == 1 && w.quest.potionUseCountdown > 0) {
            tryUseItem(w.potions.list.seed);
        }
    },
    
    shouldTeleport: function(me) {
        return w.quest.potionUseCountdown > 0 && w.quest.scrollUseCountdown == 0
        && (me.hp < me.max_hp / 2 || !w.objects.list.magicalHorn.have);
    }
};

var autoplay = {
    
    weArePlaying: false,
    lastSave: 0,
    players: {
        0: defaultPlayer,
        1: defaultPlayer,
        2: defaultPlayer,
        3: defaultPlayer,
        4: defaultPlayer,
        5: castleKeep,
        9: defaultPlayer
    },
    
    onload: function(value) {
        $('#quest_form').append('<input type="checkbox" id="autoplayToggle" onclick="autoplay.setWeArePlaying(this.checked)">Autoplay</input>');
    },
    
    setWeArePlaying: function(value) {
        console.log('setWeArePlaying() value: ' + value);
        $('#autoplayToggle').attr('checked', value);
        this.weArePlaying = value;
        this.start();
    },
    
    start: function() {
        if (!this.weArePlaying) { return; }
        
        if (w.quest.weAreQuestingRightNow) {
            // if we're still on another quest, try later
            this.startLater(5000);
            return;
        }
        
        var player = this.players[getLandIndex()];
        if (player === undefined) {
            // we have no player for this quest
            this.setWeArePlaying(false);
            return;
        }
        
        if (!player.prepare() || w.quest.tiredTime > 0) {
            // if the player is still preparing items
            // or the character is tired
            this.startLater(Math.max(5, w.quest.tiredTime) * 1000);
            return;
        }
        
        this.silentSave();
        w.tabs.select(2);
        w.quest.begin(true);
        player.play();
        
        this.startLater(5000);
    },
    
    startLater: function(when) {
        window.setTimeout(this.start.bind(this), when);
    },
    
    silentSave: function() {
        if (new Date().getTime() - this.lastSave < 1000 * 60 * 5) { return; }
        
        $.ajax({
            type: "POST",
            url: "scripts/save.php",
            data: {
                code : ((w.code === undefined || w.code == null || w.code.length == "") ? 0 : w.code),
                swordName : w.sword.name,
                swordSpecialSword : w.sword.specialSword ? 1 : 0,
                swordSpecialPower : w.sword.specialPower,
                candiesNbrOwned : w.candies.nbrOwned,
                candiesNbrThrown : w.candies.nbrThrown,
                candiesNbrEaten : w.candies.nbrEaten,
                candiesNbrTotal : w.candies.nbrTotal,
                candiesCandiesPerSecond : w.candies.candiesPerSecond,
                candiesConverterActivated : w.candiesConverter.activated ? 1 : 0,
                cauldronBookPage : w.cauldron.bookPage,
                cauldronCandies : w.cauldron.candiesInTheCauldron,
                cauldronLollipops : w.cauldron.lollipopsInTheCauldron,
                chocolateBarsNbrOwned : w.chocolateBars.nbrOwned,
                farmLollipopsPlanted : w.farm.lollipopsPlanted,
                farmCurrentFlagIndex : w.farm.currentFlagIndex,
                farmPlantingButtonsStep : w.farm.plantingButtonsStep,
                forgeStep : w.forge.step,
                shopLollipopsButtonsShown : w.shop.buy10LollipopsButtonShown ? 1 : 0,
                shopShown : w.shop.shown ? 1 : 0,
                shopTicklingStep : w.shop.ticklingStep,
                shopClickingOnLollipopStep : w.shop.clickingOnLollipopStep,
                hutStep : w.hut.step,
                hutSpeech : w.hut.speech,
                inventoryMagicianHatLetter : w.inventory.magicianHatLetter,
                lollipopsNbrOwned : w.lollipops.nbrOwned,
                lollipopsNbrInStock : w.lollipops.nbrInStock,
                lollipopsNbrBought : w.lollipops.nbrBought,
                mainNbrOfSecondsSinceLastMinInterval : w.main.nbrOfSecondsSinceLastMinInterval,
                mainNbrOfSecondsSinceLastHourInterval : w.main.nbrOfSecondsSinceLastHourInterval,
                mainNbrOfSecondsSinceLastDayInterval : w.main.nbrOfSecondsSinceLastDayInterval,
                mountGoblinBasicChestProbability : w.mountGoblin.basicChestProbability,
                peacefulForestBasicChestProbability : w.peacefulForest.basicChestProbability,
                peacefulForestPoniesEncountered : w.peacefulForest.poniesEncountered,
                objectsHaveObjectKey : w.objects.list.key.have ? 1 : 0,
                objectsHaveObjectHutMap : w.objects.list.hutMap.have ? 1 : 0,
                objectsHaveObjectWellMap : w.objects.list.wellMap.have ? 1 : 0,
                objectsHaveObjectSwampMap : w.objects.list.swampMap.have ? 1 : 0,
                objectsHaveObjectBoots : w.objects.list.boots.have ? 1 : 0,
                objectsHaveObjectMagicianHat : w.objects.list.magicianHat.have ? 1 : 0,
                objectsHaveObjectPinkRing : w.objects.list.pinkRing.have ? 1 : 0,
                objectsHaveObjectForgeMap : w.objects.list.forgeMap.have ? 1 : 0,
                objectsHaveObjectCandiesConverter : w.objects.list.candiesConverter.have ? 1 : 0,
                objectsHaveObjectPlateArmour : w.objects.list.plateArmour.have ? 1 : 0,
                objectsHaveObjectCauldron : w.objects.list.cauldron.have ? 1 : 0,
                objectsHaveObjectMagicalHorn : w.objects.list.magicalHorn.have ? 1 : 0,
                objectsHaveObjectHornOfPlenty : w.objects.list.hornOfPlenty.have ? 1 : 0,
                objectsHaveObjectOldAmulet : w.objects.list.oldAmulet.have ? 1 : 0,
                potionsShownHealth : w.potions.list.health.shown ? 1 : 0,
                potionsShownEscape : w.potions.list.escape.shown ? 1 : 0,
                potionsShownBerserk : w.potions.list.berserk.shown ? 1 : 0,
                potionsShownFireScroll : w.potions.list.fireScroll.shown ? 1 : 0,
                potionsShownAcidRainScroll : w.potions.list.acidRainScroll.shown ? 1 : 0,
                potionsShownTeleportScroll : w.potions.list.teleportScroll.shown ? 1 : 0,
                potionsShownEarthquakeScroll : w.potions.list.earthquakeScroll.shown ? 1 : 0,
                potionsShownImpInvocationScroll : w.potions.list.impInvocationScroll.shown ? 1 : 0,
                potionsShownMajorHealth : w.potions.list.majorHealth.shown ? 1 : 0,
                potionsShownInvulnerability : w.potions.list.invulnerability.shown ? 1 : 0,
                potionsShownTurtle : w.potions.list.turtle.shown ? 1 : 0,
                potionsShownJelly : w.potions.list.jelly.shown ? 1 : 0,
                potionsShownSeed : w.potions.list.seed.shown ? 1 : 0,
                potionsShownCloning : w.potions.list.cloning.shown ? 1 : 0,
                potionsShownSuperman : w.potions.list.superman.shown ? 1 : 0,
                potionsShownGmooh : w.potions.list.gmooh.shown ? 1 : 0,
                potionsNbrOwnedHealth : w.potions.list.health.nbrOwned,
                potionsNbrOwnedEscape : w.potions.list.escape.nbrOwned,
                potionsNbrOwnedBerserk : w.potions.list.berserk.nbrOwned,
                potionsNbrOwnedFireScroll : w.potions.list.fireScroll.nbrOwned,
                potionsNbrOwnedAcidRainScroll : w.potions.list.acidRainScroll.nbrOwned,
                potionsNbrOwnedTeleportScroll : w.potions.list.teleportScroll.nbrOwned,
                potionsNbrOwnedEarthquakeScroll : w.potions.list.earthquakeScroll.nbrOwned,
                potionsNbrOwnedImpInvocationScroll : w.potions.list.impInvocationScroll.nbrOwned,
                potionsNbrOwnedMajorHealth : w.potions.list.majorHealth.nbrOwned,
                potionsNbrOwnedInvulnerability : w.potions.list.invulnerability.nbrOwned,
                potionsNbrOwnedTurtle : w.potions.list.turtle.nbrOwned,
                potionsNbrOwnedJelly : w.potions.list.jelly.nbrOwned,
                potionsNbrOwnedSeed : w.potions.list.seed.nbrOwned,
                potionsNbrOwnedCloning : w.potions.list.cloning.nbrOwned,
                potionsNbrOwnedSuperman : w.potions.list.superman.nbrOwned,
                potionsNbrOwnedGmooh : w.potions.list.gmooh.nbrOwned,
                questMaxLandOrder : w.quest.maxLandOrder,
                questTiredTime : w.quest.tiredTime,
                spellsFasterCandiesFibo1 : w.spells.fasterCandiesFiboPrev,
                spellsFasterCandiesFibo2 : w.spells.fasterCandiesFiboCurr,
                swampStep : w.swamp.step,
                tabsAnimation : w.tabs.animation,
                wishingWellSpeech : w.wishingWell.speech,
                wishingWellStep : w.wishingWell.step,
                yourselfCanSurpass : w.yourself.canSurpass ? 1 : 0,
                developperComputerWon : w.developperComputer.won ? 1 : 0
            },
            success: function(msg) {
                if(msg != "Erreur") {
                    this.lastSave = new Date().getTime();
                    console.log('Last autosaved at ' + this.lastSave);
                    if(msg.substring(0,5) != "<br /"){ 
                        w.code = msg.substring(0,5);
                    }
                }
            }
        });
    }
};

autoplay.onload();

w.autoplay = autoplay;