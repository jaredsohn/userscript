// ==UserScript==
// @name       Candy Box Local Autosave
// @homepage   http://natabbotts.com
// @version    1.2
// @description  Autosaves your data every minute locally - refreshing or accidentally closing can't do any harm now.
// @match      http://candies.aniwey.net/*
// @match      http://aniwey.net/candies-hardmode/*
// @copyright  2013 Nathanael Abbotts
// ==/UserScript==
var autoSave;
autoSave = {
    init: function () {
        autoSave.createStartSaveButton();
        console.log(code);
        if (autoSave.saveExists()) {
            autoSave.createLoadButton();
        }
    },
    buttonCSS: {
        'border': '1px solid #464c54',
        'margin-bottom': '2px',
        'padding': '2px'
    },
    createStartSaveButton: function () {
        $('#saveButton').after('<input type="button" id="localStartSavingButton" value="Start Autosaving"/>');
        $('#localStartSavingButton').click(autoSave.start).css(autoSave.buttonCSS);
    },
    disableStartSaveButton: function () {
        $('#localStartSavingButton').attr({
            'disabled': 'disabled',
            'value': 'Autosaving Enabled'
        });
    },
    createLoadButton: function () {
        if (!($('#localLoadSaveButton').length === 1)) {
            $('#localStartSavingButton').after('<input type="button" id="localLoadSaveButton" value="Load Local Save" />');
            $('#localLoadSaveButton').click(autoSave.load).css(autoSave.buttonCSS);
        }
    },
    save: function () {
        if (!autoSave.codeExists()) {
            save(); // save to server before saving locally
            console.log(autoSave.getCode());
        }

        if (autoSave.codeExists()) { // we saved earlier to get a code, but must ensure it was successful
            localStorage.setItem(code, autoSave.data());
            localStorage.setItem('autosave-version', '1.0');
            autoSave.createLoadButton();
            return true;
        }
        return false;

    },
    getCode: function () {
        return window.location.search.slice(6, 11);
    },
    codeExists: function () {
        return (window.location.search.length === 11 && window.location.search.slice(0, 6) === '?pass=');
    },
    saveExists: function () {
        return autoSave.codeExists() && (localStorage.getItem(autoSave.getCode()) !== null);
    },

    load: function () {
        var saveData = JSON.parse(localStorage.getItem(autoSave.getCode()));
        sword.name = saveData.swordName;
        sword.specialSword = saveData.swordSpecialSword;
        sword.specialPower = saveData.swordSpecialPower;
        candies.nbrOwned = saveData.candiesNbrOwned;
        candies.nbrThrown = saveData.candiesNbrThrown;
        candies.nbrEaten = saveData.candiesNbrEaten;
        candies.nbrTotal = saveData.candiesNbrTotal;
        candies.candiesPerSecond = saveData.candiesCandiesPerSecond;
        candiesConverter.activated = saveData.candiesConverterActivated;
        cauldron.bookPage = saveData.cauldronBookPage;
        cauldron.candiesInTheCauldron = saveData.cauldronCandies;
        cauldron.lollipopsInTheCauldron = saveData.cauldronLollipops;
        chocolateBars.nbrOwned = saveData.chocolateBarsNbrOwned;
        farm.lollipopsPlanted = saveData.farmLollipopsPlanted;
        farm.currentFlagIndex = saveData.farmCurrentFlagIndex;
        farm.plantingButtonsStep = saveData.farmPlantingButtonsStep;
        forge.step = saveData.forgeStep;
        shop.buy10LollipopsButtonShown = saveData.shopLollipopsButtonsShown;
        shop.shown = saveData.shopShown;
        shop.ticklingStep = saveData.shopTicklingStep;
        shop.clickingOnLollipopStep = saveData.shopClickingOnLollipopStep;
        hut.step = saveData.hutStep;
        hut.speech = saveData.hutSpeech;
        inventory.magicianHatLetter = saveData.inventoryMagicianHatLetter;
        lollipops.nbrOwned = saveData.lollipopsNbrOwned;
        lollipops.nbrInStock = saveData.lollipopsNbrInStock;
        lollipops.nbrBought = saveData.lollipopsNbrBought;
        main.nbrOfSecondsSinceLastMinInterval = saveData.mainNbrOfSecondsSinceLastMinInterval;
        main.nbrOfSecondsSinceLastHourInterval = saveData.mainNbrOfSecondsSinceLastHourInterval;
        main.nbrOfSecondsSinceLastDayInterval = saveData.mainNbrOfSecondsSinceLastDayInterval;
        mountGoblin.basicChestProbability = saveData.mountGoblinBasicChestProbability;
        peacefulForest.basicChestProbability = saveData.peacefulForestBasicChestProbability;
        peacefulForest.poniesEncountered = saveData.peacefulForestPoniesEncountered;
        objects.list.key.have = saveData.objectsHaveObjectKey;
        objects.list.hutMap.have = saveData.objectsHaveObjectHutMap;
        objects.list.wellMap.have = saveData.objectsHaveObjectWellMap;
        objects.list.swampMap.have = saveData.objectsHaveObjectSwampMap;
        objects.list.boots.have = saveData.objectsHaveObjectBoots;
        objects.list.magicianHat.have = saveData.objectsHaveObjectMagicianHat;
        objects.list.pinkRing.have = saveData.objectsHaveObjectPinkRing;
        objects.list.forgeMap.have = saveData.objectsHaveObjectForgeMap;
        objects.list.candiesConverter.have = saveData.objectsHaveObjectCandiesConverter;
        objects.list.plateArmour.have = saveData.objectsHaveObjectPlateArmour;
        objects.list.cauldron.have = saveData.objectsHaveObjectCauldron;
        objects.list.magicalHorn.have = saveData.objectsHaveObjectMagicalHorn;
        objects.list.hornOfPlenty.have = saveData.objectsHaveObjectHornOfPlenty;
        objects.list.oldAmulet.have = saveData.objectsHaveObjectOldAmulet;
        potions.list.health.shown = saveData.potionsShownHealth;
        potions.list.escape.shown = saveData.potionsShownEscape;
        potions.list.berserk.shown = saveData.potionsShownBerserk;
        potions.list.fireScroll.shown = saveData.potionsShownFireScroll;
        potions.list.acidRainScroll.shown = saveData.potionsShownAcidRainScroll;
        potions.list.teleportScroll.shown = saveData.potionsShownTeleportScroll;
        potions.list.earthquakeScroll.shown = saveData.potionsShownEarthquakeScroll;
        potions.list.impInvocationScroll.shown = saveData.potionsShownImpInvocationScroll;
        potions.list.majorHealth.shown = saveData.potionsShownMajorHealth;
        potions.list.invulnerability.shown = saveData.potionsShownInvulnerability;
        potions.list.turtle.shown = saveData.potionsShownTurtle;
        potions.list.jelly.shown = saveData.potionsShownJelly;
        potions.list.seed.shown = saveData.potionsShownSeed;
        potions.list.cloning.shown = saveData.potionsShownCloning;
        potions.list.superman.shown = saveData.potionsShownSuperman;
        potions.list.gmooh.shown = saveData.potionsShownGmooh;
        potions.list.health.nbrOwned = saveData.potionsNbrOwnedHealth;
        potions.list.escape.nbrOwned = saveData.potionsNbrOwnedEscape;
        potions.list.berserk.nbrOwned = saveData.potionsNbrOwnedBerserk;
        potions.list.fireScroll.nbrOwned = saveData.potionsNbrOwnedFireScroll;
        potions.list.acidRainScroll.nbrOwned = saveData.potionsNbrOwnedAcidRainScroll;
        potions.list.teleportScroll.nbrOwned = saveData.potionsNbrOwnedTeleportScroll;
        potions.list.earthquakeScroll.nbrOwned = saveData.potionsNbrOwnedEarthquakeScroll;
        potions.list.impInvocationScroll.nbrOwned = saveData.potionsNbrOwnedImpInvocationScroll;
        potions.list.majorHealth.nbrOwned = saveData.potionsNbrOwnedMajorHealth;
        potions.list.invulnerability.nbrOwned = saveData.potionsNbrOwnedInvulnerability;
        potions.list.turtle.nbrOwned = saveData.potionsNbrOwnedTurtle;
        potions.list.jelly.nbrOwned = saveData.potionsNbrOwnedJelly;
        potions.list.seed.nbrOwned = saveData.potionsNbrOwnedSeed;
        potions.list.cloning.nbrOwned = saveData.potionsNbrOwnedCloning;
        potions.list.superman.nbrOwned = saveData.potionsNbrOwnedSuperman;
        potions.list.gmooh.nbrOwned = saveData.potionsNbrOwnedGmooh;
        quest.maxLandOrder = saveData.questMaxLandOrder;
        quest.tiredTime = saveData.questTiredTime;
        spells.fasterCandiesFiboPrev = saveData.spellsFasterCandiesFibo1;
        spells.fasterCandiesFiboCurr = saveData.spellsFasterCandiesFibo2;
        swamp.step = saveData.swampStep;
        tabs.animation = saveData.tabsAnimation;
        wishingWell.speech = saveData.wishingWellSpeech;
        wishingWell.step = saveData.wishingWellStep;
        yourself.canSurpass = saveData.yourselfCanSurpass;
        developperComputer.won = saveData.developperComputerWon;
    },

    start: function () {
        autoSave.save();
        autoSave.intervalID = window.setInterval(autoSave.save, 10000);
        autoSave.disableStartSaveButton();
    },
    intervalID: null, // the autosave interval doesn't exist until it is created
    data: function () {
        return JSON.stringify({
            swordName: sword.name,
            swordSpecialSword: sword.specialSword,
            swordSpecialPower: sword.specialPower,
            candiesNbrOwned: candies.nbrOwned,
            candiesNbrThrown: candies.nbrThrown,
            candiesNbrEaten: candies.nbrEaten,
            candiesNbrTotal: candies.nbrTotal,
            candiesCandiesPerSecond: candies.candiesPerSecond,
            candiesConverterActivated: candiesConverter.activated,
            cauldronBookPage: cauldron.bookPage,
            cauldronCandies: cauldron.candiesInTheCauldron,
            cauldronLollipops: cauldron.lollipopsInTheCauldron,
            chocolateBarsNbrOwned: chocolateBars.nbrOwned,
            farmLollipopsPlanted: farm.lollipopsPlanted,
            farmCurrentFlagIndex: farm.currentFlagIndex,
            farmPlantingButtonsStep: farm.plantingButtonsStep,
            forgeStep: forge.step,
            shopLollipopsButtonsShown: shop.buy10LollipopsButtonShown,
            shopShown: shop.shown,
            shopTicklingStep: shop.ticklingStep,
            shopClickingOnLollipopStep: shop.clickingOnLollipopStep,
            hutStep: hut.step,
            hutSpeech: hut.speech,
            inventoryMagicianHatLetter: inventory.magicianHatLetter,
            lollipopsNbrOwned: lollipops.nbrOwned,
            lollipopsNbrInStock: lollipops.nbrInStock,
            lollipopsNbrBought: lollipops.nbrBought,
            mainNbrOfSecondsSinceLastMinInterval: main.nbrOfSecondsSinceLastMinInterval,
            mainNbrOfSecondsSinceLastHourInterval: main.nbrOfSecondsSinceLastHourInterval,
            mainNbrOfSecondsSinceLastDayInterval: main.nbrOfSecondsSinceLastDayInterval,
            mountGoblinBasicChestProbability: mountGoblin.basicChestProbability,
            peacefulForestBasicChestProbability: peacefulForest.basicChestProbability,
            peacefulForestPoniesEncountered: peacefulForest.poniesEncountered,
            objectsHaveObjectKey: objects.list.key.have,
            objectsHaveObjectHutMap: objects.list.hutMap.have,
            objectsHaveObjectWellMap: objects.list.wellMap.have,
            objectsHaveObjectSwampMap: objects.list.swampMap.have,
            objectsHaveObjectBoots: objects.list.boots.have,
            objectsHaveObjectMagicianHat: objects.list.magicianHat.have,
            objectsHaveObjectPinkRing: objects.list.pinkRing.have,
            objectsHaveObjectForgeMap: objects.list.forgeMap.have,
            objectsHaveObjectCandiesConverter: objects.list.candiesConverter.have,
            objectsHaveObjectPlateArmour: objects.list.plateArmour.have,
            objectsHaveObjectCauldron: objects.list.cauldron.have,
            objectsHaveObjectMagicalHorn: objects.list.magicalHorn.have,
            objectsHaveObjectHornOfPlenty: objects.list.hornOfPlenty.have,
            objectsHaveObjectOldAmulet: objects.list.oldAmulet.have,
            potionsShownHealth: potions.list.health.shown,
            potionsShownEscape: potions.list.escape.shown,
            potionsShownBerserk: potions.list.berserk.shown,
            potionsShownFireScroll: potions.list.fireScroll.shown,
            potionsShownAcidRainScroll: potions.list.acidRainScroll.shown,
            potionsShownTeleportScroll: potions.list.teleportScroll.shown,
            potionsShownEarthquakeScroll: potions.list.earthquakeScroll.shown,
            potionsShownImpInvocationScroll: potions.list.impInvocationScroll.shown,
            potionsShownMajorHealth: potions.list.majorHealth.shown,
            potionsShownInvulnerability: potions.list.invulnerability.shown,
            potionsShownTurtle: potions.list.turtle.shown,
            potionsShownJelly: potions.list.jelly.shown,
            potionsShownSeed: potions.list.seed.shown,
            potionsShownCloning: potions.list.cloning.shown,
            potionsShownSuperman: potions.list.superman.shown,
            potionsShownGmooh: potions.list.gmooh.shown,
            potionsNbrOwnedHealth: potions.list.health.nbrOwned,
            potionsNbrOwnedEscape: potions.list.escape.nbrOwned,
            potionsNbrOwnedBerserk: potions.list.berserk.nbrOwned,
            potionsNbrOwnedFireScroll: potions.list.fireScroll.nbrOwned,
            potionsNbrOwnedAcidRainScroll: potions.list.acidRainScroll.nbrOwned,
            potionsNbrOwnedTeleportScroll: potions.list.teleportScroll.nbrOwned,
            potionsNbrOwnedEarthquakeScroll: potions.list.earthquakeScroll.nbrOwned,
            potionsNbrOwnedImpInvocationScroll: potions.list.impInvocationScroll.nbrOwned,
            potionsNbrOwnedMajorHealth: potions.list.majorHealth.nbrOwned,
            potionsNbrOwnedInvulnerability: potions.list.invulnerability.nbrOwned,
            potionsNbrOwnedTurtle: potions.list.turtle.nbrOwned,
            potionsNbrOwnedJelly: potions.list.jelly.nbrOwned,
            potionsNbrOwnedSeed: potions.list.seed.nbrOwned,
            potionsNbrOwnedCloning: potions.list.cloning.nbrOwned,
            potionsNbrOwnedSuperman: potions.list.superman.nbrOwned,
            potionsNbrOwnedGmooh: potions.list.gmooh.nbrOwned,
            questMaxLandOrder: quest.maxLandOrder,
            questTiredTime: quest.tiredTime,
            spellsFasterCandiesFibo1: spells.fasterCandiesFiboPrev,
            spellsFasterCandiesFibo2: spells.fasterCandiesFiboCurr,
            swampStep: swamp.step,
            tabsAnimation: tabs.animation,
            wishingWellSpeech: wishingWell.speech,
            wishingWellStep: wishingWell.step,
            yourselfCanSurpass: yourself.canSurpass,
            developperComputerWon: developperComputer.won
        });
    },
    codeFound: function () {
        if (autoSave.codeExists()) {
            window.clearInterval(autoSave.reset);
            autoSave.init();
        }
        
    },
    clearCodeFound: function () {
        window.clearInverval(autoSave.reset);
    },
    reset: null
};
autoSave.reset = window.setInterval(autoSave.codeFound, 10);
window.setTimeout(autoSave.clearCodeFound, 60000);
main.autoSave = autoSave;