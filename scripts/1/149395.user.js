// ==UserScript==
// @name        Drone.〤
// @namespace   GuessX
// @description http://mrsimy0.net/Mafia/
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @version     x.x.x
// @icon        http://tinyurl.com/9trq8yy
// ==/UserScript==



javascript: (function () {

    //Localstorage
    try {
        if (localStorage.getItem) {
            storage = localStorage;
        } else if (window.localStorage.getItem) {
            storage = window.localStorage;
        }
    } catch (failsafe) {
        //Fall safe for unkown browsers maybe save to cookie store in......
    }

    function JobEnergySelector(which, cost, tab, city, name, id, color, isUsingButton, isOldCity) {
        this.WhichJobEnergySelector = which;
        this.EnergyCosts = cost;
        this.EnergyJobTab = tab;
        this.EnergyJobCity = city;
        this.EnergyJobName = name;
        this.EnergyJobId = id;
        this.Energycolor = color;
        this.isUsingButton = isUsingButton;
        this.isOldCity = isOldCity;
    }

    JobEnergySelector.prototype = {
        doEnergyJob: function () {
            if (Drone.Check.AmAwake) {
                return;
            }
            Drone.Check.AmAwake = true;
            setTimeout(ResetR, 700);
            if (this.isUsingButton) {
                var clickMe = document.getElementById('btn_dojob_' + this.EnergyJobId);
                if (clickMe == null) {
                    setTimeout(JobTravelr, plref[Drone.StoreThis.PageRefresh]);
                    return;
                }
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                clickMe.dispatchEvent(evt);
                setTimeout(DoEnergyJob, rjref[Drone.StoreThis.RepeatJobSpeed]);
                return;
            } else if (this.isOldCity) {
                $('#city_job_' + this.EnergyJobId + ' > .job_action > a')
                    .click();
                setTimeout(DoEnergyJob, rjref[Drone.StoreThis.RepeatJobSpeed]);
                return;
            } else {
                ExpertMapController.selectNode(this.EnergyJobId);
                MapController.panelButtonDoJob(this.EnergyJobId);
                setTimeout(DoEnergyJob, rjref[Drone.StoreThis.RepeatJobSpeed]);
                return;
            }
            return;
        },

        setHTML: function (id) {
            var elem = document.getElementById(id);
            elem.innerHTML = "<span><span>" + this.EnergyJobName + "</span></span>";
            elem.setAttribute("class", "sexy_button_new short " + this.Energycolor + " sexy_energy_new");
        },
        constructor: JobEnergySelector
    };

    var JobEnergySelectorMap = { //which, cost, tab, city, name, id, color, isFobbing
        "1": new JobEnergySelector(2, 5, 3, 1, "Fight a Haitian Gang [1.60]", 17, "black", false, true),
        "2": new JobEnergySelector(3, 11, 5, 1, "Repel the Yakuza [1.81]", 29, "black", false, true),
        "3": new JobEnergySelector(4, 40, 8, 1, "Muscle in on a Triad Operation [1.95]", 65, "black", false, true),
        "4": new JobEnergySelector(5, 108, 5, 5, "Move The Take Out Of Town [1.96]", 40, "orange", false, false),
        "5": new JobEnergySelector(6, 226, 5, 5, "Stash The Take [1.99]", 44, "orange", false, false),
        "6": new JobEnergySelector(7, 86, 5, 5, "Rescue A Hotelier [1.97]", 50, "orange", false, false),
        "7": new JobEnergySelector(8, 158, 7, 5, "Nab A High Tech Prototype [2.03]", 68, "orange", false, false),
        "8": new JobEnergySelector(9, 165, 8, 5, "Dig Up Links To Halloran [2.07]", 73, "orange", false, false),
        "9": new JobEnergySelector(10, 158, 8, 5, "Verify Halloran's Arrival [2.03]", 77, "orange", false, false),
        "10": new JobEnergySelector(11, 756, 5, 7, "Give Chase to the Neo-Imperium [1.98]", 59, "green", true, false),
        "11": new JobEnergySelector(12, 648, 8, 7, "Bribe a Taubate Prison Worker [2.22]", 87, "green", true, false),
        "12": new JobEnergySelector(13, 810, 8, 7, "Assassinate the Neo-Imperium [2.19]", 95, "green", true, false),
        "13": new JobEnergySelector(14, 324, 2, 8, "Secure Hooch to Sell [2.17]", 10, "red", true, false),
        "14": new JobEnergySelector(15, 378, 2, 8, "Case Warehouses on North Side [2.14]", 12, "red", true, false),
        "15": new JobEnergySelector(16, 756, 6, 8, "Flee the Scene b4 the cops Arrive [1.96]", 48, "red", true, false),
        "16": new JobEnergySelector(17, 702, 3, 9, "Approach The Police With Leads [2.05]", 19, "white", true, false),
        "17": new JobEnergySelector(18, 1134, 4, 9, "Run The Racket [1.98]", 32, "white", true, false),
        "18": new JobEnergySelector(19, 1180, 5, 9, "Pay Off Your Debts [1.99]", 38, "white", true, false),
        "19": new JobEnergySelector(20, 1080, 5, 9, "Run Your Empire [2.24]", 39, "white", true, false),
        "20": new JobEnergySelector(21, 1240, 6, 9, "Ambush The Convoy [2.09]", 43, "white", true, false),
        "21": new JobEnergySelector(22, 1350, 6, 9, "Forge The Reports [2.18]", 45, "white", true, false),
        "22": new JobEnergySelector(23, 1188, 7, 9, "Chase Down Your Son's Kidnappers [2.23]", 52, "white", true, false),
        "23": new JobEnergySelector(24, 1026, 7, 9, "Sneak Into The Manor [2.19]", 53, "white", true, false),
        "24": new JobEnergySelector(25, 1240, 7, 9, "Retire To The Isle Of Wight [2.23]", 56, "white", true, false),
        "25": new JobEnergySelector(26, 972, 8, 9, "Investigate The Puzzle Box [2.25]", 58, "white", true, false),
        "26": new JobEnergySelector(27, 1240, 8, 9, "Steal The Puzzle Box [2.13]", 61, "white", true, false),
        "27": new JobEnergySelector(28, 1188, 8, 9, "Fight Off The Police [2.28]", 62, "white", true, false),
        /*Secret District "Decaffeination"*/"28": new JobEnergySelector(29, 540, 118, 7, "Make Deal With The Plantation Owner [2.03]", 864, "purple", true, false),
        "29": new JobEnergySelector(30, 594, 118, 7, "Start Seasoned Coffee Operation [2.23]", 865, "purple", true, false),
        "30": new JobEnergySelector(31, 702, 118, 7, "Muscle Out Your Competition [1.90]", 866, "purple", true, false),
        "31": new JobEnergySelector(32, 756, 118, 7, "Begin Smuggling The Goods [1.90]", 867, "purple", true, false),
        "32": new JobEnergySelector(33, 648, 118, 7, "Defend Truck From Kingpin Highwaymen [2.22]", 867, "purple", true, false),
        "33": new JobEnergySelector(34, 756, 118, 7, "Eliminate Highwaymen [1.73]", 869, "purple", true, false),
        "34": new JobEnergySelector(35, 648, 118, 7, "Get Offer For Buyout From Caffeine Kingpin [2.31]", 870, "purple", true, false),
        "35": new JobEnergySelector(36, 972, 118, 7, "Offer HIM A Buyout And Promise Protection [2.19]", 871, "purple", true, false),
        "36": new JobEnergySelector(1, 1020, 118, 7, "Force Him To Entrust His Property To You [2.19]", 872, "purple", true, false)
        /*End Secret District "Decaffeination"*/
        /*Secret District "Slaughterhouse"*/
        //"28": new JobEnergySelector(29, 486, 117, 8, "Break Into The Longhorn Stockades [2.13]", 855, "purple", true, false),
        //"29": new JobEnergySelector(30, 540, 117, 8, "Take Care Of Cattle Ranchers [2.13]", 856, "purple", true, false),
        //"30": new JobEnergySelector(31, 594, 117, 8, "Create A Distraction To Enter The Slaughterhouse [2.23]", 857, "purple", true, false),
        //"31": new JobEnergySelector(1, 864, 117, 8, "Clear The Slaughterhouse Of Any Bodies [2.33]", 862, "purple", true, false)
        /*End Secret District "Slaughterhouse"*/

        /*Secret District "On Your Mark"*/
        //"28": new JobEnergySelector(29, 540, 102, 9, "Arrange To Sell Juice To Athletes [2.03]", 110, "purple", true, false),
        //"29": new JobEnergySelector(30, 486, 102, 9, "Collect Your Take From Your Associate [2.25]", 111, "purple", true, false),
        //"30": new JobEnergySelector(31, 756, 102, 9, "Identify The Undercover Police Officer [2.13]", 113, "purple", true, false),
        //"31": new JobEnergySelector(1, 594, 102, 9, "Silence The Police Officer [2.23]", 114, "purple", true, false),
        //"32": new JobEnergySelector(1, 1, 1, 7, "Run a Collection Plate Con [3.00]", 9, "gold", true, false)
        /*End Secret District "On Your Mark"*/

        /*Secret District "Obelisk"*/
        //"28": new JobEnergySelector(29, 540, 116, 7, "Receive Upfront Payments [2.13]", 900, "purple", true, false),
        //"29": new JobEnergySelector(30, 702, 116, 7, "Get Intel On Your Targets [2.22]", 901, "purple", true, false),
        //"30": new JobEnergySelector(31, 648, 116, 7, "Visit The Burial Site [2.22]", 903, "purple", true, false),
        //"31": new JobEnergySelector(1, 864, 116, 7, "Set Up Position On The Obelisk [2.20]", 905, "purple", true, false)
        /*End Secret District "Obelisk"*/

        /*Secret District "Lighthouse"*/
        //"27": new JobEnergySelector(28, 540, 115, 8, "Sneak Into The Mayor's Office [2.03]", 846, "purple", true, false),
        //"28": new JobEnergySelector(29, 486, 115, 8, "Knock Out The Mayor's Guards [2.25]", 847, "purple", true, false),
        //"29": new JobEnergySelector(30, 702, 115, 8, "Make The Mayor An Offer [2.05]", 848, "purple", true, false),
        //"30": new JobEnergySelector(1, 864, 115, 8, "Lay The Trap [2.47]", 853, "purple", true, false)
        /*End Secret District "Lighthouse"*/

        /*Secret District "The Mold"*/
        //"27": new JobEnergySelector(28, 540, 101, 9, "Meet with the most wanted boss [2.13]", 101, "purple", true, false),
        //"28": new JobEnergySelector(29, 702, 101, 9, "Arrange to make a wax dummy of him [2.22]", 102, "purple", true, false),
        //"29": new JobEnergySelector(30, 648, 101, 9, "Learn about the nosey Policeman [2.22]", 104, "purple", true, false),
        //"30": new JobEnergySelector(1, 864, 101, 9, "End the investigation permanently [2.20] ", 106, "purple", true, false)
        /*End Secret District "The Mold"*/
        //"10000": new JobEnergySelector(3, 165, 8, 6, "Trap Di Rossi's Top Capo [1.8982]", 78, "white", false, false),
    };

    /*
5 colours
green
orange
purple
white
black
red

brazil green
vegas orange
chiago red
london white
ny black
secret purple
*/
    function JobStaminaSelector(which, cost, tab, city, name, id, color, isFobbing, isRobbing, isFighting, isFlFighting) {
        this.WhichJobStaminaSelector = which;
        this.StaminaCosts = cost;
        this.StaminaJobTab = tab;
        this.StaminaJobCity = city;
        this.StaminaJobName = name;
        this.StaminaJobId = id;
        this.Staminacolor = color;
        this.isFobbing = isFobbing;
        this.isRobbing = isRobbing;
        this.isFighting = isFighting;
        this.isFlFighting = isFlFighting;
    }

    JobStaminaSelector.prototype = {
        doStaminaJob: function () {
            if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFobbing == true) {
                if (bhhk == 1) {
                    var Wording = $('#side_container')
                        .text();
                    var FindItNow = /You won the fight!/g;
                    var Annnnd = FindItNow.test(Wording);
                    if (Annnnd == true) {
                        logmsg('Doing Job..', 'status');
                        logmsg('Repeating Job..', 'true_log');
                        fn();
                        setTimeout(DoStaminaJob, 1000);
                        return;
                    } else {
                        bhhk = 0;
                        bhk = 0;
                    }
                }
                if (bhk == 1) {
                    fn();
                    logmsg('Doing Job..', 'status');
                    logmsg('Repeating Job..', 'true_log');
                    bhhk = 1;
                    setTimeout(DoStaminaJob, 3000);
                    return;
                } else {
                    bhk = 0;
                }
                if (blitz == 1) {
                    var Wording = $('#side_container')
                        .text();
                    var FindItNow = /You won the fight!/g;
                    var Annnnd = FindItNow.test(Wording);
                    //alert(Annnnd);
                    if (Annnnd == true) {
                        fn();
                        logmsg('Doing Job..', 'status');
                        logmsg('Repeating Job..', 'true_log');
                        bhk = 1;
                        setTimeout(DoStaminaJob, 1000);
                        return;
                    } else {
                        blitz = 0;
                    }
                }
                targetElts = $x('.//a[contains(@onclick,"doFightJob(' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobId + '")]');
                numTargets = targetElts.length;
                if (numTargets) {
                    var OppName, OppSize, OppLevel;
                    var smallestMafia = Drone.StoreThis.opponentMafiaMax;
                    var lowestLevel = Drone.StoreThis.opponentLevelMax;
                    var foundOpp = false;
                    for (i = 0; i < numTargets; i++) {
                        targetParent = targetElts[i].parentNode.parentNode;
                        parentNoTags = targetParent.innerHTML.untag();
                        if (parentNoTags.match(/(.+?)\s+(.+?)\s+(.+?)\s+Fight/i)) {
                            OppName = RegExp.$1;
                            OppSize = parseInt(RegExp.$2);
                            OppLevel = parseInt(RegExp.$3);
                        } else {
                            OppNameElt = xpathFirst('.//dt[@class="name"]//span[@class="player_data"]', targetParent);
                            if (OppNameElt) OppName = OppNameElt.innerHTML.untag();
                            OppSizeElt = xpathFirst('.//dd[@class="group_size"]//span[@class="player_data"]', targetParent);
                            if (OppSizeElt) OppSize = parseInt(OppSizeElt.innerHTML.untag());
                            OppLevelElt = xpathFirst('.//dd[@class="level"]//span[@class="player_data"]', targetParent);
                            if (OppLevelElt) OppLevel = parseInt(OppLevelElt.innerHTML.untag());
                        }
                        if ((OppSize != 0 && OppLevel != 0) && (OppSize < smallestMafia || (OppSize == smallestMafia && OppLevel < lowestLevel))) {
                            OppTarget = targetElts[i];
                            OppTargetParent = targetParent;
                            smallestMafia = OppSize;
                            lowestLevel = OppLevel;
                            foundOpp = true;
                        } else {}
                    }
                    if (foundOpp) {
                        logmsg('Doing Job..', 'status');
                        logmsg('Repeating Job..', 'true_log');
                        /* Thanks to Midian, Lets inject the blitz hack */
                        fn = new Function(OppTarget.getAttribute('onclick'));
                        fn();
                        blitz = 1;
                        /* /Midian */
                        //var evtV = document.createEvent("MouseEvents");
                        //evtV.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        //OppTarget.dispatchEvent(evtV);  
                        setTimeout(DoStaminaJob, 2500);
                        return;
                    } else {

                        do_ajax('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobCity + '&tab=' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobTab + '');
                        setTimeout(DoStaminaJob, plref[Drone.StoreThis.PageRefresh]);
                        logmsg('No targets found refreshing tab..', 'status');
                        return;
                    }
                }

            }
            if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFighting == true) {} else { // do robbing
                if (Drone.Check.AmRobbing) {
                    return;
                }
                Drone.Check.AmRobbing = true;
                var tabtest = document.evaluate('//li[contains(@class, "tab_on")]//a[contains(., "Robbing")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                    .snapshotLength > 0;
                if (tabtest == 0) {
                    setTimeout(StaminaTravelr, plref[Drone.StoreThis.PageRefresh]);
                    Drone.Check.AmRobbing = false;
                    return;
                }
                var spreecount = parseInt($('#call_sprees_left')
                    .text());
                if (spreecount > 0 && RS[Drone.StoreThis.RobSquads] == 'true') {
                    logmsg('Robbing the board with Robsquads..', 'status');
                    logmsg('Robbing the board with Robsquads..', 'true_log');
                    document.getElementById("oneClickRobAll")
                        .click();
                    setTimeout(RefreshMe, rref[Drone.StoreThis.RobbingPageRefresh]);
                    setTimeout(ResetR, 2850);
                    return;
                }
                var slotcount = 8;
                for (var i = 8; i >= 0; i--) {
                    setTimeout("do_ajax('','remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=1&slot=" + slotcount + "', 1, 0, RobbingController.preRob(2), RobbingController.rob);", i * ris[Drone.StoreThis.RobbingSlotSpeed]);
                    slotcount--;
                }
                setTimeout(RefreshMe, rref[Drone.StoreThis.RobbingPageRefresh]);
                setTimeout(ResetR, 2850);
                logmsg('Robbing the board..', 'status');
                logmsg('Robbing the board..', 'true_log');
                return;
            }
        },

        setStaminaHTML: function (id) {
            var elem = document.getElementById(id);
            elem.innerHTML = "<span><span>" + this.StaminaJobName + "</span></span>";
            elem.setAttribute("class", "sexy_button_new short " + this.Staminacolor + " sexy_attack_new");
            if (this.isFighting && Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 1) {
                document.getElementById("FightingRow")
                    .style.display = '';
            } else if (Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector != 1) {
                document.getElementById("FightingRow")
                    .style.display = 'none';
            }
            if (this.isFighting && Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 1) {
                document.getElementById("FightingRow2")
                    .style.display = '';
            } else if (Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector != 1) {
                document.getElementById("FightingRow2")
                    .style.display = 'none';
            }
        },
        constructor: JobStaminaSelector
    };

    var JobStaminaSelectorMap = { //which, cost, tab, city, name, id, color, isFobbing
        "1": new JobStaminaSelector(2, 120, 8, 5, "Question Some Meth Heads [2.2250]", 72, "orange", true, false, false, false),
        "2": new JobStaminaSelector(3, 128, 6, 5, "Eliminate A Hill Supplier [2.2578]", 54, "orange", true, false, false, false),
        "3": new JobStaminaSelector(4, 50, 0, 0, "Robbing", 0, "white", false, true, false, false),
        "4": new JobStaminaSelector(5, 25, 0, 0, "Fight List Fighting", 0, "red", false, false, false, true),
        "5": new JobStaminaSelector(1, 25, 0, 0, "Fight Specific Opponent", 0, "red", false, false, true, false)
    };


    //scope

    var Drone = {
        Version: 'v3.12',
        iLike: '<iframe src="http://www.facebook.com/plugins/like.php?app_id=219527258096177&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGuessX-Scripts%2F131414080285469&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:20px;" allowTransparency="true"></iframe>',
        CurrentLevel: $('#user_level')
            .text(),
        PrimaryEnergyJobInfo: JobEnergySelectorMap[22], //1
        SecondryEnergyJobInfo: JobEnergySelectorMap[7], //4
        PrimaryStaminaJobInfo: JobStaminaSelectorMap[4],
        SecondryStaminaJobInfo: JobStaminaSelectorMap[1],
        //SkillPoints: {
        //Spending: 0 //WhichSkill
        //},
        JobOptions: {
            //WhoToKill: 41236137,
            Targetid: function () {
                return ("p|" + Drone.StoreThis.WhoToKill)
            },
            //opponentLevelMax: 35000,
            //opponentMafiaMax: 501,
            JobPrimaryOrSecondary: 'PrimaryEnergyJobInfo',
            StamPrimaryOrSecondary: 'PrimaryStaminaJobInfo',
            DoExtraJob: 0,
            DoExtraStam: 0,
            RatioingJob: false,
            NormalUntillJob: false,
            //RatioingJobValue: 0,
            //NormalUntillValue: 0,
            RatioStam: false,
            NormStamUntil: false
            //NormalStamUntillValue: 0,
            //RatioingStamValue: 0,
            //FightCity: 0
        },
        Images: {
            Play: 'data:image/gif;base64,R0lGODlhEAAQAMQAAP8A/2K1SIHOEXbIAIPTHZXbMIDRFnbIAXfJA33OEM/vqIbWJHrMC5HLf3jKB/D/3/X/6fn/8uz/1ej/zJjcRc7vpv3/+qHfVP///+T/xAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAVqICCOZEk2QaqmTRlUSizHVTA21LXs/H5RLUCAQCRgikib0MA0WCzNpjKQqCYiWGt1yugyIGCIlzF1mB2P9OPsmCLeCIkc/p4e7ofJBI+fDv4DGYCDSg0Ch4iJh0FCBY6PkEo3KyuMJpcjIQA7',
            Pause: 'data:image/gif;base64,R0lGODlhEAAQAOYAAP8A/zaa/3O4/xal/6jd//L6//r9/87s/8bp/+r3/+Dz/////9bv/xel/xim/xun/xyn/1zA/1a+/0q5/y6u/yWr/x6o/3nL/0S3/yGp/6fd/xqn/2fE/zmz/zmy/2jF/yKq/4rS/27H/3bK/026/zOw/zGw/z+0/1q//0i4/0O2/0m5/3HI/zax/3fK/ySq/067/1O8/1G8/1m//y2u/z20/2HC/5DU/3vM/1C7/yis/x+o/zCv/6vf/3LI/4vS/yOq/zqz/23H/z+1/z60/zuz/zWx/1i+/1vA/2LC/2rF/33N/0u6/2bE/3PJ/yyu/3jL/2nF/y+v/yms/2TD/4nR/6re/xmm/2DC/ySr/3rM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAewgACCg4SFhAIBiYqJAoUBPQSRkRoaBFYBgwI3IThaFxdQLiNLP1WNAAFOPiwLCyJCrUpRH5ioHE1UBgY2WLoRSCi1ATNHEgUFMTLHMCRMwhMrKQkJGCrTQ0Q1wkVBHQoKLUbfJjxSwhQ0TwwMUzrrFVkvwkAgGQcHOxb3EBAPwhsbriBA4MDBwAYNBtQSMKChwwYOHljIUOEUKgolPJzAMCGHhAhJamVatMiioZODAgEAOw%3D%3D',
            Stop: 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7',
            En2xp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACc0lEQVR42mL8//8/Ay6gOuPA/NsZDomaqqIcl7Y7X2ZlZWJBV7Nozd1FAAHEhMsATjVDARlzBwcuIJ0TLZ/DysCgwvD7nwIyfvro47O44pP1AAGE0xABz/gEHyEGBQGv+IQoN+lohl//GFDwzz8Pchsv5YLUAgQQC06v+CXEy7EzMFhrCRUIcjD/Z/jxB0V+2fb7y9bteXwOxAYIIKyG8NgEGuTMWS8ACq4ymdPiQAM4kOW//fjLsPHgl40LNkurMTIyMQAEECNvzvxGXmkFOWluBgYWXgEBDhUDAyagJ6NlGBS+3znBEMcyg4HnzytcDn7Qt/ZxP0AAMYJiR7JmQ394cECAiTCDAiNQhhFMMDBITxNisNdkw2lA2YrP5V1bv64CCCBGWBRz+RYGOJX19/tLMyhwsoDNYPj+8Q1cB+uZqQzx/6bADShe+aW4d9f3dSAOQAAxIqcTVkVDAa2e/ft1uL4bMLKwMjAyMTP8//+P4f+fPww1tz1+aDI/BIXNg9xV33InH/ixBaYPIIBQAvb3/fMfBGY++fLo+ycGRlY2BkZmoPS/vwwmDxYyCEl/ZmD4+/dB+qrv6TOP/dqFrA8ggFDSCYu2o8L/v/8Z/v7+A8R/Gf6y8TL8AdLdAmsY/v/6y+CzmLUG3QAQAAggFJcwG/oH/Hn/2oaRi2/Pv9cPH/2andEca8a35o8Kp7LlsyKBZ5pfRLGFMEAAMYDCBIbZuu/vZ++6vZvFvSAAxFcRZGD5Vsm6VdfKuoK9+85etp77+5HVwzBAAKFwmEr3z0fmz/dmagzXZLSA8ZnLUOVhGCCAGLAJwnCgKoMRPnkYBggwAB7mUT+/Zgm1AAAAAElFTkSuQmCC',
            Iced: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADqklEQVR42n2Ta2xTZRjH3/f0nNP2nLOWsq7rZa5sa0fZunZZN5GNKChu3IIEEyNM5QsaSVBH1KAQDXgLX7yERBYJEjMj6Lwsi9FNccwbDq24K3bdupWVsWE7Dyvtzjk9l/e1IfGDmPD/9P/wf578kuf5Q3AblW7aSyR62tHtMvBfs2zrIVjkb1oTcFnvddu4aoeF9SzjKEdW0YCcUzIYIwEDkAYEFRMEebD74nTPyCstl28uqDny07YqO3M0VG71SoggBZ7XGJOJSMs6iCgCeG00LuZIZAA4I2OUjqfE6+3fTi7wovouDLx2/v67Vlo/u5rMkKSqASDlMCUJFMsYCQOBcKnXkfWWWCiXmV4Ymc2kT3w9RhggKKqvdoLfk7nvYd2xP061BJyPUZKIBsOT2o3FLIxHZnCR2aDzldtVf1PNAkPB3GhsIdM3mLDkvYkjRX2Zz0NEee0wXP32r8f33Od5ggIIn/tmLBsen2dZPQlMJEChymLgrSpJv9cb+Ws6nrQ3hCpNqZk4tlkNOtbmghcS1zfD1W/82Na23f+mtCTjL/vG8aXJeWxmaejgIM4TKJ47lqNjp/vJ8emU1rguSPl9bnJkKolkmoOxqalGuPalT5tbNzf1XEtllDwmLS3lcIHEKzablajy2pAMoNj53SgzNBqTdFCBz7S1sh+cjaqcmdPJitwM17/8yT11gWD/n9F5XFtTAilVBV4LqQqSBravWQExxOjp9h/UcHQO+ioc5INb7iSPfPibuKrETGMduQ/uODX8pIOljquSDNYHnUBczCof916SAm4L9fyukN5IU6j5YOfSaPQKqPCWGZ7bu5H+qn9CczFAJozMR3B3Z/T0znr7Qw6OJoYTaaQqGIRjPDAzJG7xW1Q7R+OdR3ulsdg1xVNZRr6w526LXhSxmuefvSF3wWe7Jzr2rVvxiJWjQCQp4p9jvPBLZC7V4ncW6pGScxeyxte7ItrlOV59aneTye0wkXYdAoSGQMf5Ky/Cje8MbHnr0dpu1kATEELAUhDE53m+2rXcIuc0VUNYuzCbIQssBSQvyCAeS4JVdgYMzwl97V+c23bzlR9+f7h1R8hx2F5oLKVIQmdi9ASFEc6fG3B6gugaSoE4L2Kck4EoqtGB2N/7zx5Y2/ufMjkfOKgvr6mtrlrpa2istO4KlprrixgK0bSOOXRmCOL8eFYlTg6ELx6YOfm48L823qq6/R3uDY0NmyqK2eDVRSnRE574PPzq1olbc/8A2rymL02d5P0AAAAASUVORK5CYII=',
            Killed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAD/UlEQVR42mJkwAMS5NWZFjy8+Q+fGoAAYoQxmjg4GQMY/1sKWho5cSgoa3PIyKgw8wlJ/vv4meHP75+f//77/43x//+PbAz/7/z+8fX886XLt2u9+/AAIIDABtwSF/Xj0dbs4DW3VGX59o3l7d8ff/nYOZnY379lZP72l+G/jsF/Bmnpf/+42D7/+/n3459b19+/6ut48/7X76kAAQBBAL7/Ad4WFUUTNzus9uXgBPsKBQD4BwH/8w8JBQgLCwL8Cgr/GBEf9A0lKQUBISHs+8zK8eCWjgL+DAkVFTI6AAK8wsACAEEAvv8B6BYfnhdMTF70BwD+3tvL/fT28QHO8PP/EhMLAxskJPwuGCzs/wsM+fHVzfPqu7YR/wwMDvMKEAciGSICB9HQgAIAQQC+/wHWJC6WKGVlZv0HBv/YyrD05c3NC/4OEgAKDwT+ETQ5ABoYJ/HklIzp4O7oGC4jLA7e8+3/BRAZAx0FCAHyw8dKAgBBAL7/AWJrl3CbLQmN+vfx/+C7qv/i29r/CwwKAf4cHP8UJiv7DyMo/siRiATa6+r9QhsnBRctMwT0zsj+EPX3AdLm5zoCAEEAvv8BuSouRj1cW7f26OP78dXNBvn9+P/oGBT7ExUWAhIkLv4D9vn32qqiCtHf3Pj+/gABYVtrC+KelfwPBQkD+vj6RgIAQQC+/wG6LzE/MzEsv+vc0/8XKTQB+wsHAPsvLvwA9vIAFlNbAf/9//7SZlz87MjFAQwsNgQ6TFQE1nxw9w0oKwYF/P5sAgBBAL7/Aew3OmgAHhqW+gH9ABBFTQDx/ff74a2d+AwwMgUlc4MHBQsK/p5LUvX5z70AIhoiCEhvfQbhs6T9+yEh+gz9/6UCAEEAvv8B8kVKpgtnaVYCHRoC9czL/v/9+QD5x8EAAQ8R/wZOVPwCHBr/uFta+Ofg1fsyDxMEOXSEEfQLAv/7//36/t7frwIAQQC+/wHvXV+iEH1+XAAZGQAAztD/9by89u++uusNUlIT+QwK+QkiIAnRiYz9A9bL/DZmeA4DKy8E/BkUAPwC/wDkoKF5AojxkYGut8z85RsZBfiZGJiYGBh4uBm+3rj5jttIX/D/z29//v8Fgr0HWVhFJVkYXrxi+HDnAgOLvgHDv1Mn94ZcZfQDCCBwUn7laBfNEZfSwC0hLcfIxs7MKCrCxMDM+J9BXJSBgY+P6cfC+Qx/b93+/4P5PzBf/Li57gVbYdbS3h0gvQABBM9MUv5V7GpaOtrhPL9NA0X+Ronq6ZgwSoj+Y+Tk5rpUVs74lY3z55c/THPaP/CW79/Q/g2mDyCAGHFlU6PCRfIN4j899fj+69/7wvCo/LPU2tPNPrfQ1QEEGADHlqBOy+nxvAAAAABJRU5ErkJggg==',
            BGJICZCI: 'https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/crafters_choice/hellish_hydraulics/popup_bg.jpg'
        },
        Running: {
            Paused: false
            //Restart: 0 //Restarter
            //Autorun: false,
        },
        //StaminaInfo: {
        //WhichStaminaSelector: false,
        //StaminaJob: 'Robbing',
        //StaminaCosts: 50
        //},
        BankInfo: {
            cash_in_hand: 0
        },
        Switches: {
            //UseWhatFirst: 0, //SpendEnergyOrStamina
            BankBackToEnergy: false,
            BankBackToStamina: false
        },
        SpeedCFG: {
            healInterval: 0,
            startkilling: 0
            //RobbingSlotSpeed: 3, //ris
            //RobbingPageRefresh: 3, //rref
            //RepeatJobSpeed: 1, //rjref
            //PageRefresh: 3, // plref
            //AttackSpeed: 1, //aref
            //RestartIn: 3 //rres
        },
        Check: {
            StaminaTotals: 0,
            PowerAttackCost: 0,
            LevelsDone: 0,
            EnergyStamina: 0,
            CurrentEnergyRatio: 0,
            CurrentStamRatio: 0,
            CombinedRatios: 0,
            CurrentHealth: 0,
            JobsDone: 0,
            FobsDone: 0,
            BoardsCleared: 0,
            AmRobbing: false,
            AmAwake: false,
            GiveMeAPause: 0,
            BanditsBroski: 0,
            Started: TimeStampMe(),
            Finished: TimeStampOut(),
            ActiveCity: getCurrCity()
            //Health: 500
        },
        Fighterx: {
            FLInterval: 0,
            AttackInterval: 0,
            FightWatchDogTimout: 0,
            FightActionRunning: false,
            targetid: 0,
            ajax: false,
            closing: false,
            xw_user: User.id,
            newfighton: false,
            target_name: 0
        },
        StoreThis: {
            Bursts: 2, //Bcount
            BurstsOn: true,
            FightCity: 0,
            RobCity: 0,
            RobSquads: 0,
            Restart: 0, //Restarter
            UseWhatFirst: 0, //SpendEnergyOrStamina
            RobbingSlotSpeed: 0, //ris
            RobbingPageRefresh: 4, //rref
            RepeatJobSpeed: 1, //rjref
            PageRefresh: 5, // plref
            AttackSpeed: 2, //aref
            RestartIn: 3, //rres
            Health: 500,
            Spending: 0, //WhichSkill
            WhoToKill: 41236137,
            opponentLevelMax: 35000,
            opponentMafiaMax: 501,
            NormalUntillValue: 0,
            RatioingJobValue: 0,
            NormalStamUntillValue: 0,
            RatioingStamValue: 0,
            //NEW SETTINGS TO BE SAVED
            PrimaryEnergyJobInfo: 22,
            SecondryEnergyJobInfo: 7,
            PrimaryStaminaJobInfo: 4,
            SecondryStaminaJobInfo: 1,
            StaminaCheck: 0,
            JobberCheck: 0,
            LevelMeUpOi: false,
            ABank: false,
            BanditGamblerXP: false,
            BanditGamblerCSH: false,
            BanditElapsedTimerXP: 4,
            BanditElapsedTimerCash: 4,
            BanditCSHCheck: 0,
            BanditXPCheck: 0,
            xp: true,
            csh: true,
            jb: true
        }
    };

    var V = [];
    var Restarter = new Array('false', 'true');
    var SpendEnergyOrStamina = new Array('energy', 'stamina', 'toe2toe', 'jnrg', 'jstam');
    var WhichSkill = new Array('none', 'attack', 'defense', 'max_energy', 'max_stamina');
    var rref = new Array('3000', '4000', '5000', '6000', '7000', '8000');
    var rjref = new Array('800', '1000', '1500', '2000', '2500', '3000');
    var plref = new Array('2000', '3000', '4000', '5000', '6000', '7000', '8000');
    var rres = new Array('60000', '300000', '450000', '600000', '1200000');
    var ris = new Array('187', '250', '500', '750', '1000', '2000');
    var aref = new Array('500', '777', '1000', '1500', '2000');
    var fic = new Array('1', '5', '7', '8', '9');
    var ric = new Array('1', '5', '7', '8', '9');
    var RS = new Array('false', 'true');
    var Bcount = new Array('1', '2', '3');
    var HumanMinute;
    var robCiti;
    var fn;
    var blitz;
    var bhk;
    var bhhk;
    var crewposted = 0;
    var BBlock = 0;
    var Diced = 0;
    var Dkilled = 0;
    var http = 'http://';
    if (/https/.test(document.location)) {
        http = 'https://';
    }
    var preurl = http + 'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
    var mytimestampin = 0;
    var mytimestampout = 0;
    var FUUUUUUU = 0;
    var ittybitty = 0;
    //var Meep = 0; //ohhh baby baby!

    function create_div() {

        if (document.getElementById('gxDiv')) {
            document.getElementById('gxDiv')
                .innerHTML = config_html;
        } else {
            var gxDiv = document.createElement("div");
            gxDiv.id = 'gxDiv';
            content.insertBefore(gxDiv, content.firstChild);
            document.getElementById('gxDiv')
                .innerHTML = config_html;
        }
    }

    function create_runningdiv() {
        $('#gxDiv')
            .remove();
        if (document.getElementById('gxRDiv')) {
            return;
        } else {
            var gxRDiv = document.createElement("div");
            gxRDiv.id = 'gxRDiv';
            var rdiv = document.getElementById('final_wrapper');
            rdiv.insertBefore(gxRDiv, rdiv.firstChild);
            document.getElementById('gxRDiv')
                .innerHTML = configR_html;
        }
    }

    /* Chrome fix by Luke/Lucifer */
    JobberCheck = function (n) {
        //SAVE JOBBER CHECK
        if (Drone.StoreThis.JobberCheck != n) {
            Drone.StoreThis.JobberCheck = n;
            writeSettings();
            //log('JobberCheck Saved '+Drone.StoreThis.JobberCheck );
        }

        switch (parseInt(n)) {
        case 0:
            $('#RatioJobRow')
                .hide();
            $('#SecondryJobRow')
                .hide();
            $('#NormalUntillJobRow')
                .hide();
            Drone.JobOptions.RatioingJob = false;
            Drone.JobOptions.NormalUntillJob = false;
            break;
        case 1:
            $('#RatioJobRow')
                .show();
            $('#SecondryJobRow')
                .show();
            $('#NormalUntillJobRow')
                .hide();
            Drone.JobOptions.RatioingJob = true;
            Drone.JobOptions.NormalUntillJob = false;
            Drone.StoreThis.RatioingJobValue = 2.3;
            break;
        case 2:
            $('#RatioJobRow')
                .hide();
            $('#SecondryJobRow')
                .show();
            $('#NormalUntillJobRow')
                .show();
            Drone.JobOptions.RatioingJob = false;
            Drone.JobOptions.NormalUntillJob = true;
            Drone.StoreThis.NormalUntillValue = 5000;
            break;
        }
    }

    StaminaCheck = function (n) {
        //SAVE STAMINA CHECK
        if (Drone.StoreThis.StaminaCheck != n) {
            Drone.StoreThis.StaminaCheck = n
            writeSettings()
            //log('StaminaCheck Saved '+Drone.StoreThis.StaminaCheck);
        }
        switch (parseInt(n)) {
        case 0:
            $('#RatioStamRow')
                .hide();
            $('#SecondryStamRow')
                .hide();
            $('#NormalUntillStamRow')
                .hide();
            $('#FightingRow2')
                .hide();
            Drone.JobOptions.RatioStam = false;
            Drone.JobOptions.NormStamUntil = false;
            break;
        case 1:
            $('#RatioStamRow')
                .show();
            $('#SecondryStamRow')
                .show();
            $('#NormalUntillStamRow')
                .hide();
            Drone.JobOptions.RatioStam = true;
            Drone.JobOptions.NormStamUntil = false;
            Drone.StoreThis.RatioingStamValue = 2.3;
            if (Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 1) {
                $('#FightingRow2')
                    .show();
            }
            break;
        case 2:
            $('#RatioStamRow')
                .hide();
            $('#SecondryStamRow')
                .show();
            $('#NormalUntillStamRow')
                .show();
            Drone.JobOptions.RatioStam = false;
            Drone.JobOptions.NormStamUntil = true;
            Drone.StoreThis.NormalStamUntillValue = 5000;
            if (Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 1) {
                $('#FightingRow2')
                    .show();
            }
            break;
        }
    }
    /* End Chrome fix by Luke/Lucifer */

    var configR_html =
    /*'<div class="messages2" style="background: url('+Drone.Images.BGJICZCI+'); border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">'+
'<div><span style="float: left; width: 33%; text-align: left;">&nbsp;</span><span style="float: center; width: 23%; text-align: right;"><font size="5" color="yellow"></font></span><span style="float: right; width: 23%; text-align: right;"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"> <font color="gold">Drone.&#12324;</font><a id="killzdrone" href="#"><span style="display:none" href="#" id="resume"><img src="'+Drone.Images.Play+'" title="Resume"></span><span style="display: inline;" href="#" id="pause"><img src="'+Drone.Images.Pause+'" title="Pause"></span></a>&nbsp;<img id="logclose" src="'+Drone.Images.Stop+'" title="Close" width="16" height="16" style="display: inline;"/></span></div>'+
'<center></center><br><table width="100%">'+
'<tr><td width="10%" valign="top">Jobs Done&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"><span id="JobsDone">0</span></td><td align="right" style="text-align:right;">Show Popups:</td></tr>'+
'<tr><td width="10%" valign="top">In Action&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"><font color="gold"><span id="ActiRes" class="">0</span></font></td><td align="right" style="text-align:right;">Show Popups:</td></tr>'+
'<tr><td width="10%" valign="top">Robbing In&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"><span id="RobCiti" class="more_in">0</span>&nbsp;&nbsp;Boards Cleared&nbsp;:&nbsp;<span id="Bcleared">0</span></td></tr>'+
'<tr><td width="10%" valign="top">Levelups&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"> <span id="Levelscleared">0</span></td></tr>'+
'<tr><td width="10%" valign="top">Ratios&nbsp;</td>'+'<td width="1%" valign="top">:</td><td colspan="3"><img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif"><span id="nrg_ratio_reqd">0</span>&nbsp;&nbsp;<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"><span id="sta_ratio_reqd">0</span>&nbsp;&nbsp;<img src="'+Drone.Images.En2xp+'"><span id="comb_ratio_reqd" class="more_in">0</span></td></tr>'+
'<tr><td width="10%" valign="top">Fighting&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"><img src="'+Drone.Images.Iced+'" title="Iced">&nbsp;:&nbsp;<span id="icedsome">0</span>&nbsp;&nbsp;<img src="'+Drone.Images.Killed+'" title="Killed">&nbsp;:&nbsp;<span id="killedsome">0</span></td></tr>'+
'<tr><td width="10%" valign="top">Status&nbsp;</td>'+'<td width="1%" valign="top">:</td><td colspan="3"><span id="status">Drone Loaded...</span></td></tr>'+
'<tr><td width="10%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="5" class="sexy_input" style="width:16px"></input></td>' + 
'<td width="1%" valign="top">:</td>' + 
'<td id="true_log" colspan="3">Drone Loaded...</td>' + 
'</tr></table></div>';*/

    '<div class="messages2" style="background: url(' + Drone.Images.BGJICZCI + ') no-repeat; background-size: 100%; border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">' + '<div><span style="float: left; width: 33%; text-align: left;">&nbsp;</span><span style="float: center; width: 23%; text-align: right;"><font size="5" color="yellow"></font></span><span style="float: right; width: 23%; text-align: right;"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"> <font color="gold">Drone.&#12324;</font><a id="killzdrone" href="#"><span style="display:none" href="#" id="resume"><img src="' + Drone.Images.Play + '" title="Resume"></span><span style="display: inline;" href="#" id="pause"><img src="' + Drone.Images.Pause + '" title="Pause"></span></a>&nbsp;<img id="logclose" src="' + Drone.Images.Stop + '" title="Close" width="16" height="16" style="display: inline;"/></span></div>' + '<center></center><br><table>' + '<tr><td width="14%" valign="top">Jobs Done&nbsp;</td>' + '<td width="1%" valign="top">:</td>' + '<td colspan="3"><span id="JobsDone">0</span></td></tr>' + '<tr id="IRV" style="display:none"><td width="14%" valign="top">Fobs Done&nbsp;</td>' + '<td width="1%" valign="top">:</td>' + '<td colspan="3"> <span id="FobsDone">0</span></td></tr>' + '<tr><td width="14%" valign="top">In Action&nbsp;</td>' + '<td width="1%" valign="top">:</td>' + '<td colspan="3"><font color="gold"><span id="ActiRes" class="">0</span></font></td></tr>' + '<tr id="IRR" style="display:none"><td width="14%" valign="top">Robbing In&nbsp;</td>' + '<td width="1%" valign="top">:</td>' + '<td colspan="3"><span id="RobCiti" class="more_in">0</span>&nbsp;&nbsp;Boards Cleared&nbsp;:&nbsp;<span id="Bcleared">0</span></td></tr>' + '<tr>' + '<td width="14%" valign="top">Levelups&nbsp;</td>' + '<td width="1%" valign="top">:</td>' + '<td colspan="3"> <span id="Levelscleared">0</span> <span id="IRS" style="display:none">|&nbsp;Time Started:&nbsp;<span id="ClockedIn">0</span> Time Finished:&nbsp;<span id="ClockedOut"></span></span></td>' + '</tr>' + '<tr><td width="14%" valign="top">Ratios&nbsp;</td>' + '<td width="1%" valign="top">:</td><td colspan="3"><img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif"><span id="nrg_ratio_reqd">0</span>&nbsp;&nbsp;<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"><span id="sta_ratio_reqd">0</span>&nbsp;&nbsp;<img src="' + Drone.Images.En2xp + '"><span id="comb_ratio_reqd" class="more_in">0</span></td></tr>' + '<tr id="IRF" style="display:none">' + '<td width="14%" valign="top">Fighting&nbsp;</td>' + '<td width="1%" valign="top">:</td>' + '<td colspan="3"><img src="' + Drone.Images.Iced + '" title="Iced">&nbsp;:&nbsp;<span id="icedsome">0</span>&nbsp;&nbsp;<img src="' + Drone.Images.Killed + '" title="Killed">&nbsp;:&nbsp;<span id="killedsome">0</span></td></tr>' + '<tr>' + '<td width="14%" valign="top"><a href="#" id="loot_show">Loot</a></td>' + '<td width="1%" valign="top">:</td>' + '<td id="loot_log" valign="top" colspan="3">Levelup Loot Log</td>' + '</tr>' + '<tr>' + '<td width="14%" valign="top">Status&nbsp;</td>' + '<td width="1%" valign="top">:</td><td colspan="3"><span id="status">Drone Loaded...</span></td>' + '</tr>' + '<tr>' + '<td width="14%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="5" class="sexy_input" style="width:16px"></input></td>' + '<td width="1%" valign="top">:</td>' + '<td id="true_log" colspan="3">Drone Loaded...</td>' + '</tr>' + '</table></div>';

    //'<tr><td width="14%" valign="top">Fighting&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3">Wins&nbsp;:&nbsp;<span>0</span>&nbsp;<span class="more_in">[0.0%]</span>&nbsp;&nbsp;Losses&nbsp;:&nbsp;<span>0</span>&nbsp;<span class="more_in">[0.0%]</span>&nbsp;<font size="1"><span class="more_in">(Currently Disabled)</span></font><br>Total Fights&nbsp;:&nbsp;<span>0</span>&nbsp;&nbsp;<img src="'+Drone.Images.Iced+'" title="Iced">&nbsp;:&nbsp;<span id="icedsome">0</span>&nbsp;&nbsp;<img src="'+Drone.Images.Killed+'" title="Killed">&nbsp;:&nbsp;<span id="killedsome">0</span>&nbsp;<font size="1"><span class="more_in">(Currently Disabled)</span></font></td></tr>'+
    // icedsomekilledsome
    /*'<div class="messages2" style="background: url('+Drone.Images.BGJICZCI+'); border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">'+
'<div><span style="float: left; width: 33%; text-align: left;">&nbsp;</span><span style="float: center; width: 23%; text-align: right;"><font size="5" color="yellow"></font></span><span style="float: right; width: 23%; text-align: right;"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"> <font color="gold">Drone.&#12324;</font><a id="killzdrone" href="#"><span style="display:none" href="#" id="resume"><img src="'+Drone.Images.Play+'" title="Resume"></span><span style="display: inline;" href="#" id="pause"><img src="'+Drone.Images.Pause+'" title="Pause"></span></a>&nbsp;<img id="logclose" src="'+Drone.Images.Stop+'" title="Close" width="16" height="16" style="display: inline;"/></span></div>'+
'<center></center><br><table>'+
'<tr><td width="10%" valign="top">Jobs Done&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"> <span id="JobsDone">0</span></td></tr>'+
'<tr><td width="18%" valign="top">Robbing&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"> <span id="Bcleared">0</span></td></tr>'+
'<tr><td width="18%" valign="top">Levelups&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3"> <span id="Levelscleared">0</span></td></tr>'+
'<tr><td width="10%" valign="top">Ratios&nbsp;</td>'+'<td width="1%" valign="top">:</td><td colspan="3"><img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif"><span id="nrg_ratio_reqd">0</span>&nbsp;&nbsp;<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"><span id="sta_ratio_reqd">0</span>&nbsp;&nbsp;<img src="'+Drone.Images.En2xp+'"><span id="comb_ratio_reqd" class="more_in">0</span></td></tr>'+
'<tr><td width="18%" valign="top">Fighting&nbsp;</td>'+'<td width="1%" valign="top">:</td>' +'<td colspan="3">Wins&nbsp;:&nbsp;<span>0</span>&nbsp;<span class="more_in">[0.0%]</span>&nbsp;&nbsp;Losses&nbsp;:&nbsp;<span>0</span>&nbsp;<span class="more_in">[0.0%]</span>&nbsp;<font size="1"><span class="more_in">(Currently Disabled)</span></font><br>Total Fights&nbsp;:&nbsp;<span>0</span>&nbsp;&nbsp;<img src="'+Drone.Images.Iced+'" title="Iced">&nbsp;:&nbsp;<span>0</span>&nbsp;&nbsp;<img src="'+Drone.Images.Killed+'" title="Killed">&nbsp;:&nbsp;<span>0</span>&nbsp;<font size="1"><span class="more_in">(Currently Disabled)</span></font></td></tr>'+
'<tr><td width="10%" valign="top">Status&nbsp;</td>'+'<td width="1%" valign="top">:</td><td colspan="3"><span id="status">Drone Loaded...</span></td></tr>'+
'<tr><td width="10%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="5" class="sexy_input" style="width:20px"></input></td>' + 
'<td width="1%" valign="top">:</td>' + 
'<td id="true_log" colspan="3">Drone Loaded...</td>' + 
'</tr></table></div>'; */
    readSettings(); // 37 33
    var content = document.getElementById('content_row');
    var config_html = '<div class="messages" style="background: url(' + Drone.Images.BGJICZCI + '); border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">' + '<div><span style="float: left; width: 31%; text-align: left;">' + Drone.iLike + '</span><span style="float: center; width: 20%; text-align: right;"><font size="5" color="white">GuessX Drone.&#12324;</font><font size="1" color="white"></font></span><span style="float:right; width: 33%; text-align: right;">' + Drone.Version + ' - <a href="http://www.creallaborate.com/guessx/mw/donate.html" target="_blank">Donate</a> - <img width="16" height="16" title="Close" src="' + Drone.Images.Stop + '" id="close"> </span></div>' + '<div>' + //Energycolor
    '<p>Energy: <a href="#" id="PrimaryJobButton" class="sexy_button_new short ' + Drone.PrimaryEnergyJobInfo.Energycolor + ' sexy_energy_new"><span><span>' + Drone.PrimaryEnergyJobInfo.EnergyJobName + '</span></span></a>&nbsp;&nbsp;' + '<select id="ENNRN" onChange="JobberCheck(this.selectedIndex)">' + '<option value="0" href="#" id="NormJob">Normal Click</option>' + '<option value="1" href="#" id="RatioJob">Untill Ratio</option>' + '<option value="2" href="#" id="NormJobUntil">Normal Untill</option>' + '</select>&nbsp;&nbsp;' + '<span id="RatioJobRow" style="display:none">' + 'is <input style="resize:none;width:35px;" value="' + Drone.StoreThis.RatioingJobValue + '" id="postformid1">' + '</span>' + '<span id="NormalUntillJobRow" style="display:none">' + '<input style="resize:none;width:40px;" value="' + Drone.StoreThis.NormalUntillValue + '" id="postformid2"> Energy Left.' + '</span>' + '</p>' + '<span id="SecondryJobRow" style="display:none">' + '<p>Secondry: <a href="#" id="SecondryJobButton" class="sexy_button_new short ' + Drone.SecondryEnergyJobInfo.Energycolor + ' sexy_energy_new"><span><span>' + Drone.SecondryEnergyJobInfo.EnergyJobName + '</span></span></a></p>' + '</span>' + '<p>Stamina: <a href="#" id="PrimaryStamButton" class="sexy_button_new short ' + Drone.PrimaryStaminaJobInfo.Staminacolor + ' sexy_attack_new impulse_buy"><span><span>' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobName + '</span></span></a>&nbsp;&nbsp;' + '<select id="STANRN" onChange="StaminaCheck(this.selectedIndex)">' + '<option value="0" href="#" id="NormStam">Normal Click</option>' + '<option value="1" href="#" id="RatioStam">Untill Ratio</option>' + '<option value="2" href="#" id="NormStamUntil">Normal Untill</option>' + '</select>&nbsp;&nbsp;' + '<span id="RatioStamRow" style="display:none">' + 'is <input style="resize:none;width:35px;" value="' + Drone.StoreThis.RatioingStamValue + '" id="postformid3">' + '</span>' +

    '<span id="NormalUntillStamRow" style="display:none">' + '<input style="resize:none;width:40px;" value="' + Drone.StoreThis.NormalStamUntillValue + '" id="postformid4"> Stamina Left.' + '</span>' + '</p>' + '<span id="FightingRow" style="display:none">' + 'Target is p|&nbsp;<input value="' + Drone.StoreThis.WhoToKill + '" type="integer" style= "resize:none;width:65px;" id="postformid5">' + '</span>' + '<span id="SecondryStamRow" style="display:none">' + '<p>Secondry: <a href="#" id="SecondryStamButton" class="sexy_button_new short ' + Drone.SecondryStaminaJobInfo.Staminacolor + ' sexy_attack_new"><span><span>' + Drone.SecondryStaminaJobInfo.StaminaJobName + '</span></span></a></p>' + '</span>' + '<span id="FightingRow2" style="display:none">' + 'Target is p|&nbsp;<input value="' + Drone.StoreThis.WhoToKill + '" type="integer" style= "resize:none;width:65px;" id="postformid6">' + '</span>' + '<div style="text-align:right;vertical-align:top;">' + '<font size="1">*May contain errorz, if they occur please report them on my <a href="http://www.facebook.com/pages/GuessX-Scripts/131414080285469" target="_blank">page</a>. Special thanks to <a href="http://screepts.com/" target="_blank">Lucifer</a>.  </font><a class="sexy_button_new short black impulse_buy" id="dronecfg" href="#"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png"></span></span></a>' + '&nbsp;&nbsp;<a href="#" id="start" class="sexy_button_new short green"><span><span>Start</span></span></a></div>' + '</div></div>';

    /*Launches the OSD*/

    create_div();

    /*If user doesnt wish to run the drone they click the X and this removes the OSD*/
    $('#close')
        .click(function () {
        ClearIVLS();
        Drone.Running.Paused = true;
        $('#gxDiv')
            .remove();
    });

    //PRIMARY JOB
    Drone.PrimaryEnergyJobInfo = JobEnergySelectorMap[Drone.StoreThis.PrimaryEnergyJobInfo];
    Drone.PrimaryEnergyJobInfo.setHTML("PrimaryJobButton");

    //SECONDARY JOB
    Drone.SecondryEnergyJobInfo = JobEnergySelectorMap[Drone.StoreThis.SecondryEnergyJobInfo];
    Drone.SecondryEnergyJobInfo.setHTML("SecondryJobButton");

    //PRIMARY STAMINA
    Drone.PrimaryStaminaJobInfo = JobStaminaSelectorMap[Drone.StoreThis.PrimaryStaminaJobInfo];
    Drone.PrimaryStaminaJobInfo.setStaminaHTML("PrimaryStamButton");

    //SECONDARY STAMINA
    Drone.SecondryStaminaJobInfo = JobStaminaSelectorMap[Drone.StoreThis.SecondryStaminaJobInfo];
    Drone.SecondryStaminaJobInfo.setStaminaHTML("SecondryStamButton");

    //StaminaCheck && JobberCheck Load 
    $('#STANRN option:eq(' + Drone.StoreThis.StaminaCheck + ')')
        .prop('selected', true)
    StaminaCheck(Drone.StoreThis.StaminaCheck);
    $('#ENNRN option:eq(' + Drone.StoreThis.JobberCheck + ')')
        .prop('selected', true)
    JobberCheck(Drone.StoreThis.JobberCheck);

    function Settings() {
        popupTitle = 'Drone CFG';
        myPop(popupTitle);
    }

    function myPop(popupId, popupTitle, shouldClose) { // aka my settings popup!
        var myweirdstyles = '<style type="text/css" media="all">' +
        //'body {font: 0.8em arial, helvetica, sans-serif;}'+
        '#header ul {list-style: none; padding: 0.5em; margin: 0;}' +
        //'#header li {float: left; background: #c60; margin: 0 2px 0 0; -moz-border-radius-topright: 4px; border-top-right-radius: 4px;}'+
        '#header li {float: left; background: #c60; margin: 0 2px 0 0; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px;}' + '#header a {display: block; background:  top left no-repeat;color: #ffc;text-decoration: none;padding: 0.8em 1em 0.25em;}' + '#header a:hover {color: white; background: blue; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px;}' + '#header #selected {font-weight: bold;}' + '#header #selected a {color: white;}' + '#mycontents {padding: .5em;}' +
        //'#contents {clear: both; color: white; background: grey; padding: 1em; border: 1px solid grey;-moz-border-radius-topleft: 4px; border-top-left-radius: 4px; -moz-border-radius-bottomleft: 4px; border-bottom-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; -moz-border-radius-bottomright: 4px; border-bottom-right-radius: 4px;}'+
        '#contents {clear: both; color: white; padding: 1em; border: 0px solid grey;-moz-border-radius-bottomleft: 4px; border-bottom-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; -moz-border-radius-bottomright: 4px; border-bottom-right-radius: 4px;}' + 'p {margin: 0 0 1em 0;}' + '</style>';
        /*var popup = '<div id="' + popupId + '" class="pop_box" style="background: url('+Drone.Images.BGJICZCI+'); position:absolute;top:100px;left:top: 130px; left: 50px;display: block;z-index:999999;">' + '<a id="myPop_Close" href="#" class="pop_close" onclick="document.getElementById(\'popup_fodder\').removeChild(document.getElementById(this.parentNode.id))"></a>' + '<div style="z-index:99999" class="mini_EP_info_pop">' + '<span style="position:relative;top:5px"><h3 style="text-align:center;">Drone.&#12324; Config</h3><hr>'+
'<div style="padding: 0px 15px 0px 15px;">When out of resources:<select id="DSRestart"><option value="0">Let me know!</option><option value="1">Restart!</option></select>'+
'<br style="line-height: 25px;">Restart in&nbsp;<select id="DSRestartIn"><option value="0">1 Minute</option><option value="1">5 Minutes</option><option value="2">7 Minutes 30 Seconds</option><option value="3">10 Minutes</option><option value="4">20 Minutes</option></select>&nbsp;<font size="1">*Will only work if restarting is enabled above</font>'+
'<br style="line-height: 25px;">Spend:<select id="DSSpendWhich"><option value="0">Energy First</option><option value="1">Stamina First</option><option value="2">Toe to Toe</option></select>'+
'<br style="line-height: 25px;">Apply Skillpoints: <select id="DSSpendSkills"><option value="0">No!</option><option value="1">Attack</option><option value="2">Defense</option><option value="3">Energy</option><option value="4">Stamina</option></select>'+
'<br style="line-height: 25px;">Robbing Refresh Rate&nbsp;<select id="DSRRR"><option value="0">3 Seconds</option><option value="1">4 Seconds</option><option value="2">5 Seconds</option><option value="3">6 Seconds</option><option value="4">7 Seconds</option><option value="5">8 Seconds</option></select>'+
'<br style="line-height: 25px;">RepeatJob Refresh Rate&nbsp;<select id="DSRJRR"><option value="0">0.80</option><option value="1">1 Second</option><option value="2">1.5 Seconds</option><option value="3">2 Seconds</option><option value="4">2.5 Seconds</option><option value="5">3 Seconds</option></select>'+
'<br style="line-height: 25px;">Pageload Rate&nbsp;<select id="DSPR"><option value="0">2 Seconds</option><option value="1">3 Seconds</option><option value="2">4 Seconds</option><option value="3">5 Seconds</option><option value="4">6 Seconds</option><option value="5">7 Seconds</option><option value="6">8 Seconds</option></select>'+
'<br style="line-height: 25px;">Fight in&nbsp;<select id="DSFC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option></select>&nbsp;Attack Speed&nbsp;<select id="DSAS"><option value="0">Fastest</option><option value="1">Kinda Fast</option><option value="2">Medium</option><option value="3">Slow</option><option value="4">I R Snail!</option></select>&nbsp;Use Bursts&nbsp;<input type="checkbox" id="UseBursts">&nbsp;Bursts&nbsp;<select id="DSBurstCount"><option value="0">1</option><option value="1">2</option><option value="2">3 (Max)</option></select>'+
'<br style="line-height: 25px;">Rob in&nbsp;<select id="DSRC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option></select>&nbsp;Rob Individual Speed&nbsp;<select id="DSRIS"><option value="0">0.15</option><option value="1">0.25</option><option value="2">0.50</option><option value="3">0.75</option><option value="4">1.00</option><option value="5">2.00</option></select>&nbsp;Use Robsquads&nbsp;<select id="DSRS"><option value="0">No!</option><option value="1">Yes!</option></select>'+
'<br style="line-height: 25px;">Vegas Fobbing Options:&nbsp;&nbsp;Mafia Size&nbsp;<input id="DSVFMS" type="integer" value="501" style="resize:none;width:25px;">&nbsp;Mafia Level&nbsp;<input id="DSVFML" type="integer" value="35000" style="resize:none;width:40px;">'+
'<br style="line-height: 25px;">Heal Thres Hold&nbsp;<input id="DSHTH" type="integer" value="500" style="resize:none;width:35px;">&nbsp;AutoBank Above 10k&nbsp;<input type="checkbox" id="Autobank">&nbsp;(Except NY & Las Vegas)'+
'<br style="line-height: 30px;">Attempt to level account if short by just a little&nbsp;<input type="checkbox" id="LevelMeUp">'+
'<br style="line-height: 30px;">Bandits: (Boxs must be ticked if using Teh Gambler)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killxp">&nbsp;Kill XP Bandit&nbsp;| Teh Gambler: <select id="XPBanO" onChange="BanditXPCheck(this.selectedIndex)"><option value="0" href="#" id="xpcheck0">Don\'t Gamble</option><option value="1" href="#" id="xpcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="xpcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="xpcheck3">Kill with 3 minutes to go</option>'+
'</select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killcsh">&nbsp;Kill Cash Bandit&nbsp;| Teh Gambler: <select id="CSHBanO" onChange="BanditCSHCheck(this.selectedIndex)"><option value="0" href="#" id="cshcheck0">Don\'t Gamble</option><option value="1" href="#" id="cshcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="cshcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="cshcheck3">Kill with 3 minutes to go</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killjb">&nbsp;Kill Job Bandit&nbsp;'+
'<br><center><a class="sexy_button_new short red" href="#" id="resetconfig"><span><span>Reset Config</span></span></a>&nbsp;<a id="savedcfg" href="#" class="sexy_button_new short green"><span><span>SAVE</span></span></a></center></div></span>'+
        '</div>'+
        '<br />'+
        '</div></span>' + '</center>' + '</div>' + '</div>'; */
        var popup = '<div id="' + popupId + '" class="pop_box" style="background: url(' + Drone.Images.BGJICZCI + '); position:absolute;top:100px;left:top: 130px; left: 50px;display: block;z-index:999999;">' + '<a id="myPop_Close" href="#" class="pop_close" onclick="document.getElementById(\'popup_fodder\').removeChild(document.getElementById(this.parentNode.id))"></a>' + '<div style="z-index:99999" class="mini_EP_info_pop">' + '<span style="position:relative;top:5px"><h3 style="text-align:center;">Drone.&#12324; Config</h3><hr>' + '<div id="header">' +

        '<ul>' + '<li id="li__tab1" style="background: grey;"><a>Jobbing</a></li>' + '<li id="li__tab2" style="background: orange;"><a>Fighting</a></li>' + '<li id="li__tab3" style="background: orange;"><a>Robbing</a></li>' + '<li id="li__tab4" style="background: orange;"><a>Bandits</a></li>' + '<li id="li__tab5" style="background: orange;"><a>Spending</a></li>' + '<li id="li__tab6" style="background: orange;"><a>Restart</a></li>' + '<li id="li__tab7" style="background: orange;"><a>MISC</a></li>' + '</ul>' + '<br>' + '</div>' +

        '<div id="mycontents">' + '<div id="contents" style="width: 90%">' + '<div id="__tab1">' + '<p>RepeatJob Refresh Rate&nbsp;<select id="DSRJRR"><option value="0">0.80</option><option value="1">1 Second</option><option value="2">1.5 Seconds</option><option value="3">2 Seconds</option><option value="4">2.5 Seconds</option><option value="5">3 Seconds</option></select>' + '<br style="line-height: 30px;">Vegas Fobbing Options:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mafia Size&nbsp;<input id="DSVFMS" type="integer" value="501" style="resize:none;width:25px;"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mafia Level&nbsp;<input id="DSVFML" type="integer" value="35000" style="resize:none;width:40px;">' + '</p>' + '</div>' +

        '<div id="__tab2" style="display: none; ">' + '<p>Fight in&nbsp;<select id="DSFC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option></select>' + '<br style="line-height: 30px;">Attack Speed&nbsp;<select id="DSAS"><option value="0">Fastest</option><option value="1">Kinda Fast</option><option value="2">Medium</option><option value="3">Slow</option><option value="4">I R Snail!</option></select>' + '<br style="line-height: 30px;">Use Bursts&nbsp;<input type="checkbox" id="UseBursts">&nbsp;Bursts&nbsp;<select id="DSBurstCount"><option value="0">1</option><option value="1">2</option><option value="2">3 (Max)</option></select>' + '<br style="line-height: 25px;">Heal Thres Hold&nbsp;<input id="DSHTH" type="integer" value="500" style="resize:none;width:35px;">&nbsp;</p>' + '</div>' +

        '<div id="__tab3" style="display: none; ">' + '<p>Robbing Refresh Rate&nbsp;<select id="DSRRR"><option value="0">3 Seconds</option><option value="1">4 Seconds</option><option value="2">5 Seconds</option><option value="3">6 Seconds</option><option value="4">7 Seconds</option><option value="5">8 Seconds</option></select>' + '<br style="line-height: 25px;">Rob in&nbsp;<select id="DSRC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option></select>' + '<br style="line-height: 30px;">Rob Individual Speed&nbsp;<select id="DSRIS"><option value="0">0.15</option><option value="1">0.25</option><option value="2">0.50</option><option value="3">0.75</option><option value="4">1.00</option><option value="5">2.00</option></select>' + '<br style="line-height: 30px;">Use Robsquads&nbsp;<select id="DSRS"><option value="0">No!</option><option value="1">Yes!</option></select></p>' + '</div>' +

        '<div id="__tab4" style="display: none; ">' + '<p>Bandits: (Boxs must be ticked if using Teh Gambler)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killxp">&nbsp;Kill XP Bandit&nbsp;| Teh Gambler: <select id="XPBanO" onChange="BanditXPCheck(this.selectedIndex)"><option value="0" href="#" id="xpcheck0">Don\'t Gamble</option><option value="1" href="#" id="xpcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="xpcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="xpcheck3">Kill with 3 minutes to go</option>' + '</select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killcsh">&nbsp;Kill Cash Bandit&nbsp;| Teh Gambler: <select id="CSHBanO" onChange="BanditCSHCheck(this.selectedIndex)"><option value="0" href="#" id="cshcheck0">Don\'t Gamble</option><option value="1" href="#" id="cshcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="cshcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="cshcheck3">Kill with 3 minutes to go</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killjb">&nbsp;Kill Job Bandit</p>' + '</div>' +

        '<div id="__tab5" style="display: none; ">' + '<p>Spend:<select id="DSSpendWhich"><option value="0">Energy First</option><option value="1">Stamina First</option><option value="2">Toe to Toe</option><option value="3">Only Energy</option><option value="4">Only Stamina</option></select>' + '<br style="line-height: 25px;">Apply Skillpoints: <select id="DSSpendSkills"><option value="0">No!</option><option value="1">Attack</option><option value="2">Defense</option><option value="3">Energy</option><option value="4">Stamina</option></select></p>' + '</div>' +

        '<div id="__tab6" style="display: none; ">' + '<p>When out of resources:<select id="DSRestart"><option value="0">Let me know!</option><option value="1">Restart!</option></select>' + '<br style="line-height: 25px;">Restart in&nbsp;<select id="DSRestartIn"><option value="0">1 Minute</option><option value="1">5 Minutes</option><option value="2">7 Minutes 30 Seconds</option><option value="3">10 Minutes</option><option value="4">20 Minutes</option></select>&nbsp;<font size="1">*Will only work if restarting is enabled above</font></p>' + '</div>' +

        '<div id="__tab7" style="display: none; ">' + '<p>Pageload Rate&nbsp;<select id="DSPR"><option value="0">2 Seconds</option><option value="1">3 Seconds</option><option value="2">4 Seconds</option><option value="3">5 Seconds</option><option value="4">6 Seconds</option><option value="5">7 Seconds</option><option value="6">8 Seconds</option></select>' + '<br style="line-height: 30px;">AutoBank Above&nbsp;<input type="checkbox" id="Autobank">&nbsp;(Except NY & Las Vegas)<br style="line-height: 30px;">Attempt to level account if short by just a little&nbsp;<input type="checkbox" id="LevelMeUp"></p>' + '</div></div>' + '<center><a class="sexy_button_new short red" href="#" id="resetconfig"><span><span>Reset Config</span></span></a>&nbsp;<a id="savedcfg" href="#" class="sexy_button_new short green"><span><span>SAVE</span></span></a></center><br>' + '</div></div> </div>';
        //AutoBank Above&nbsp;<input id="DSABA" type="integer" value="10000" style="resize:none;width:40px;">&nbsp;(Except NY & Las Vegas) <input type="checkbox" id="Autobank">'+
        document.getElementById('popup_fodder')
            .innerHTML += myweirdstyles + popup;
        if (shouldClose) {
            setTimeout(function () {
                document.getElementById('popup_fodder')
                    .removeChild(document.getElementById(popupId))
            }, shouldClose)
        }
        document.getElementById('li__tab1')
            .addEventListener("click", function () {
            _tab("__tab1")
        }, false);
        document.getElementById('li__tab2')
            .addEventListener("click", function () {
            _tab("__tab2")
        }, false);
        document.getElementById('li__tab3')
            .addEventListener("click", function () {
            _tab("__tab3")
        }, false);
        document.getElementById('li__tab4')
            .addEventListener("click", function () {
            _tab("__tab4")
        }, false);
        document.getElementById('li__tab5')
            .addEventListener("click", function () {
            _tab("__tab5")
        }, false);
        document.getElementById('li__tab6')
            .addEventListener("click", function () {
            _tab("__tab6")
        }, false);
        document.getElementById('li__tab7')
            .addEventListener("click", function () {
            _tab("__tab7")
        }, false);
        $('#resetconfig')
            .click(function () {
            doOptReset();
        });

        $('#savedcfg')
            .click(function () {
            closeZpopup();
        });
        $('#XPBanO option:eq(' + Drone.StoreThis.BanditXPCheck + ')')
            .prop('selected', true)
        BanditXPCheck(Drone.StoreThis.BanditXPCheck);
        $('#CSHBanO option:eq(' + Drone.StoreThis.BanditCSHCheck + ')')
            .prop('selected', true)
        BanditCSHCheck(Drone.StoreThis.BanditCSHCheck);
        document.getElementById("DSRestart")
            .selectedIndex = Drone.StoreThis.Restart;
        document.getElementById("DSSpendWhich")
            .selectedIndex = Drone.StoreThis.UseWhatFirst;
        document.getElementById("DSSpendSkills")
            .selectedIndex = Drone.StoreThis.Spending;
        document.getElementById("DSRRR")
            .selectedIndex = Drone.StoreThis.RobbingPageRefresh;
        document.getElementById("DSRJRR")
            .selectedIndex = Drone.StoreThis.RepeatJobSpeed;
        document.getElementById("DSPR")
            .selectedIndex = Drone.StoreThis.PageRefresh;
        document.getElementById("DSRestartIn")
            .selectedIndex = Drone.StoreThis.RestartIn;
        document.getElementById("DSRIS")
            .selectedIndex = Drone.StoreThis.RobbingSlotSpeed;
        document.getElementById("DSAS")
            .selectedIndex = Drone.StoreThis.AttackSpeed;
        document.getElementById("DSFC")
            .selectedIndex = Drone.StoreThis.FightCity;
        document.getElementById("DSRC")
            .selectedIndex = Drone.StoreThis.RobCity;
        document.getElementById("DSRS")
            .selectedIndex = Drone.StoreThis.RobSquads;
        document.getElementById("DSVFMS")
            .value = Drone.StoreThis.opponentMafiaMax;
        document.getElementById("DSVFML")
            .value = Drone.StoreThis.opponentLevelMax;
        document.getElementById("DSHTH")
            .value = Drone.StoreThis.Health;
        document.getElementById("DSBurstCount")
            .selectedIndex = Drone.StoreThis.Bursts;



        if (Drone.StoreThis.BurstsOn) {
            document.getElementById("UseBursts")
                .checked = true;
        }
        if (Drone.StoreThis.LevelMeUpOi) {
            document.getElementById("LevelMeUp")
                .checked = true;
        }
        if (Drone.StoreThis.ABank) {
            document.getElementById("Autobank")
                .checked = true;
        }
        if (Drone.StoreThis.xp) {
            document.getElementById("killxp")
                .checked = true;
        }
        if (Drone.StoreThis.csh) {
            document.getElementById("killcsh")
                .checked = true;
        }
        if (Drone.StoreThis.jb) {
            document.getElementById("killjb")
                .checked = true;
        }

    }

    function _tab(__tab) {
        //alert('test');
        document.getElementById("__tab1")
            .style.display = 'none';
        document.getElementById("__tab2")
            .style.display = 'none';
        document.getElementById("__tab3")
            .style.display = 'none';
        document.getElementById("__tab4")
            .style.display = 'none';
        document.getElementById("__tab5")
            .style.display = 'none';
        document.getElementById("__tab6")
            .style.display = 'none';
        document.getElementById("__tab7")
            .style.display = 'none';
        document.getElementById('li__tab1')
            .setAttribute("class", "");
        document.getElementById("li__tab2")
            .setAttribute("class", "");
        document.getElementById("li__tab3")
            .setAttribute("class", "");
        document.getElementById("li__tab4")
            .setAttribute("class", "");
        document.getElementById("li__tab5")
            .setAttribute("class", "");
        document.getElementById("li__tab6")
            .setAttribute("class", "");
        document.getElementById("li__tab7")
            .setAttribute("class", "");
        document.getElementById('li__tab1')
            .setAttribute("style", "background: orange");
        document.getElementById("li__tab2")
            .setAttribute("style", "background: orange");
        document.getElementById("li__tab3")
            .setAttribute("style", "background: orange");
        document.getElementById("li__tab4")
            .setAttribute("style", "background: orange");
        document.getElementById("li__tab5")
            .setAttribute("style", "background: orange");
        document.getElementById("li__tab6")
            .setAttribute("style", "background: orange");
        document.getElementById("li__tab7")
            .setAttribute("style", "background: orange");
        document.getElementById(__tab)
            .style.display = 'block';
        document.getElementById('li' + __tab)
            .setAttribute("class", "active");
        document.getElementById('li' + __tab)
            .setAttribute("style", "background: grey;");
    }

    function doOptReset() {
        document.getElementById("DSRestart")
            .selectedIndex = 0;
        document.getElementById("DSSpendWhich")
            .selectedIndex = 0;
        document.getElementById("DSSpendSkills")
            .selectedIndex = 0;
        document.getElementById("DSRRR")
            .selectedIndex = 4;
        document.getElementById("DSRJRR")
            .selectedIndex = 1;
        document.getElementById("DSPR")
            .selectedIndex = 5;
        document.getElementById("DSRestartIn")
            .selectedIndex = 3;
        document.getElementById("DSRIS")
            .selectedIndex = 0;
        document.getElementById("DSAS")
            .selectedIndex = 2;
        document.getElementById("DSFC")
            .selectedIndex = 0;
        document.getElementById("DSRC")
            .selectedIndex = 0;
        document.getElementById("DSRS")
            .selectedIndex = 0;
        document.getElementById("DSVFMS")
            .value = 501;
        document.getElementById("DSVFML")
            .value = 35000;
        document.getElementById("DSHTH")
            .value = 500;
        document.getElementById("DSBurstCount")
            .selectedIndex = 2
        document.getElementById("UseBursts")
            .checked = true;
        document.getElementById("LevelMeUp")
            .checked = false;
        document.getElementById("Autobank")
            .checked = false;
        document.getElementById("killxp")
            .checked = true;
        document.getElementById("killcsh")
            .checked = true;
        document.getElementById("killjb")
            .checked = true;

    }
    BanditXPCheck = function (n) {
        if (Drone.StoreThis.BanditXPCheck != n) {
            Drone.StoreThis.BanditXPCheck = n
            writeSettings();
        }
        switch (parseInt(n)) {
        case 0:
            Drone.StoreThis.BanditGamblerXP = false;
            Drone.StoreThis.BanditElapsedTimerXP = 4;
            break;
        case 1:
            Drone.StoreThis.BanditGamblerXP = true;
            Drone.StoreThis.BanditElapsedTimerXP = 1;
            break;
        case 2:
            Drone.StoreThis.BanditGamblerXP = true;
            Drone.StoreThis.BanditElapsedTimerXP = 2;
            break;
        case 3:
            Drone.StoreThis.BanditGamblerXP = true;
            Drone.StoreThis.BanditElapsedTimerXP = 3;
            break;
        }
    }

    BanditCSHCheck = function (n) {
        if (Drone.StoreThis.BanditCSHCheck != n) {
            Drone.StoreThis.BanditCSHCheck = n
            writeSettings();
        }
        switch (parseInt(n)) {
        case 0:
            Drone.StoreThis.BanditGamblerCSH = false;
            Drone.StoreThis.BanditElapsedTimerCash = 4;
            break;
        case 1:
            Drone.StoreThis.BanditGamblerCSH = true;
            Drone.StoreThis.BanditElapsedTimerCash = 1;
            break;
        case 2:
            Drone.StoreThis.BanditGamblerCSH = true;
            Drone.StoreThis.BanditElapsedTimerCash = 2;
            break;
        case 3:
            Drone.StoreThis.BanditGamblerCSH = true;
            Drone.StoreThis.BanditElapsedTimerCash = 3;
            break;
        }
    }

    function closeZpopup() {
        //1 turn restart var on/off
        Drone.StoreThis.Restart = document.getElementById("DSRestart")
            .selectedIndex;

        //2 spend energy or stamina first
        Drone.StoreThis.UseWhatFirst = document.getElementById("DSSpendWhich")
            .selectedIndex;

        //3 Apply Skillpoints
        Drone.StoreThis.Spending = document.getElementById("DSSpendSkills")
            .selectedIndex;

        //4 Robbing Refresh Rate
        Drone.StoreThis.RobbingPageRefresh = document.getElementById("DSRRR")
            .selectedIndex;

        //5 RepeatJob Refresh Rate
        Drone.StoreThis.RepeatJobSpeed = document.getElementById("DSRJRR")
            .selectedIndex;

        //6 Pageload Rate
        Drone.StoreThis.PageRefresh = document.getElementById("DSPR")
            .selectedIndex;

        //7 Restart in
        Drone.StoreThis.RestartIn = document.getElementById("DSRestartIn")
            .selectedIndex;

        //8 Rob Individual Speed
        Drone.StoreThis.RobbingSlotSpeed = document.getElementById("DSRIS")
            .selectedIndex;

        //9 Attack Speed
        Drone.StoreThis.AttackSpeed = document.getElementById("DSAS")
            .selectedIndex;

        //10 Fight City
        Drone.StoreThis.FightCity = document.getElementById("DSFC")
            .selectedIndex;

        //11 Rob City
        Drone.StoreThis.RobCity = document.getElementById("DSRC")
            .selectedIndex;

        //12 RobSquads
        Drone.StoreThis.RobSquads = document.getElementById("DSRS")
            .selectedIndex;

        //13 Fobbing Mafia Size Max
        Drone.StoreThis.opponentMafiaMax = parseInt(document.getElementById("DSVFMS")
            .value);

        //14 Fobbing Level Max
        Drone.StoreThis.opponentLevelMax = parseInt(document.getElementById("DSVFML")
            .value);

        //15 Heal Thres Hold
        Drone.StoreThis.Health = parseInt(document.getElementById("DSHTH")
            .value);

        //16 Burst Counts
        Drone.StoreThis.Bursts = document.getElementById("DSBurstCount")
            .selectedIndex;

        //17 Use Bursts?
        if (document.getElementById('UseBursts')
            .checked) {
            Drone.StoreThis.BurstsOn = true;
        } else {
            Drone.StoreThis.BurstsOn = false;
        }

        //18 Levelr Up?
        if (document.getElementById('LevelMeUp')
            .checked) {
            Drone.StoreThis.LevelMeUpOi = true;
        } else {
            Drone.StoreThis.LevelMeUpOi = false;
        }

        //19 Autobanker?
        if (document.getElementById('Autobank')
            .checked) {
            Drone.StoreThis.ABank = true;
        } else {
            Drone.StoreThis.ABank = false;
        }

        //20 Bandits
        if (document.getElementById('killxp')
            .checked) {
            Drone.StoreThis.xp = true;
        } else {
            Drone.StoreThis.xp = false;
        }
        if (document.getElementById('killcsh')
            .checked) {
            Drone.StoreThis.csh = true;
        } else {
            Drone.StoreThis.csh = false;
        }
        if (document.getElementById('killjb')
            .checked) {
            Drone.StoreThis.jb = true;
        } else {
            Drone.StoreThis.jb = false;
        }


        /*Dev tool*/
        //alert(''+Restarter[Drone.StoreThis.Restart]+'\n'+SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst]+'\n'+WhichSkill[Drone.StoreThis.Spending]+'\n'+rref[Drone.StoreThis.RobbingPageRefresh]+'\n'+rjref[Drone.StoreThis.RepeatJobSpeed]+'\n'+plref[Drone.StoreThis.PageRefresh]+'\n'+rres[Drone.StoreThis.RestartIn]+'\n'+ris[Drone.StoreThis.RobbingSlotSpeed]+'\n'+aref[Drone.StoreThis.AttackSpeed]+'\n'+fic[Drone.StoreThis.FightCity]+'\n'+ric[Drone.StoreThis.RobCity]+'\n'+RS[Drone.StoreThis.RobSquads]+'\n'+Drone.StoreThis.opponentMafiaMax+'\n'+Bcount[Drone.StoreThis.Bursts]+'\n'+Drone.StoreThis.opponentLevelMax+'\n'+Drone.StoreThis.Health+'\n'+Drone.StoreThis.BurstsOn+'\n'+Drone.StoreThis.ABank+'\n'+Drone.StoreThis.LevelMeUpOi+'\n'+HumanMinute+'\n Gambler  XP on or off '+Drone.StoreThis.BanditGamblerXP+'\n Gambler  CSH on or off '+Drone.StoreThis.BanditGamblerCSH+'\n XP minute Timer '+Drone.StoreThis.BanditElapsedTimerXP+'\n CASH minute Timer '+Drone.StoreThis.BanditElapsedTimerCash+'\n cash and xp menus at'+Drone.StoreThis.BanditXPCheck+' & cash menu is '+Drone.StoreThis.BanditCSHCheck+'');
        /*End Dev tool*/
        writeSettings();

        document.getElementById('popup_fodder')
            .removeChild(document.getElementById('Drone CFG'));
        return;
    }

    document.getElementById("start")
        .onclick = GoTime;
    document.getElementById("dronecfg")
        .onclick = Settings;

    document.getElementById("PrimaryJobButton")
        .onclick = function () {
        //PRIMMARY JOB SAVE SELECTION
        if (Drone.StoreThis.PrimaryEnergyJobInfo != Drone.PrimaryEnergyJobInfo.WhichJobEnergySelector) {
            Drone.StoreThis.PrimaryEnergyJobInfo = Drone.PrimaryEnergyJobInfo.WhichJobEnergySelector
            writeSettings();
            //log('Stored Primary Job :'+Drone.StoreThis.PrimaryEnergyJobInfo);
        }
        Drone.PrimaryEnergyJobInfo = JobEnergySelectorMap[Drone.PrimaryEnergyJobInfo.WhichJobEnergySelector];
        Drone.PrimaryEnergyJobInfo.setHTML("PrimaryJobButton");
    };

    document.getElementById("SecondryJobButton")
        .onclick = function () {
        // SECONDARY SAVE SELECTION
        if (Drone.StoreThis.SecondryEnergyJobInfo != Drone.SecondryEnergyJobInfo.WhichJobEnergySelector) {
            Drone.StoreThis.SecondryEnergyJobInfo = Drone.SecondryEnergyJobInfo.WhichJobEnergySelector;
            writeSettings();
            //log('Stored Secondry Job :'+Drone.StoreThis.SecondryEnergyJobInfo);
        }
        Drone.SecondryEnergyJobInfo = JobEnergySelectorMap[Drone.SecondryEnergyJobInfo.WhichJobEnergySelector];
        Drone.SecondryEnergyJobInfo.setHTML("SecondryJobButton");
    };

    document.getElementById("PrimaryStamButton")
        .onclick = function () {
        //PRIMARY STAM SAVE SELECTION
        if (Drone.StoreThis.PrimaryStaminaJobInfo != Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector) {
            Drone.StoreThis.PrimaryStaminaJobInfo = Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector;
            writeSettings();
            //log('Stored Primary Stamina :'+Drone.StoreThis.PrimaryStaminaJobInfo);
        }
        Drone.PrimaryStaminaJobInfo = JobStaminaSelectorMap[Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector];
        Drone.PrimaryStaminaJobInfo.setStaminaHTML("PrimaryStamButton");
    };

    document.getElementById("SecondryStamButton")
        .onclick = function () {
        //SECONDARY STAM SAVE SELECTION
        if (Drone.StoreThis.SecondryStaminaJobInfo != Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector) {
            Drone.StoreThis.SecondryStaminaJobInfo = Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector;
            writeSettings();
            //log('Stored Seconary Stamina :'+Drone.StoreThis.SecondryStaminaJobInfo);
        }
        Drone.SecondryStaminaJobInfo = JobStaminaSelectorMap[Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector];
        Drone.SecondryStaminaJobInfo.setStaminaHTML("SecondryStamButton");
    };

    function GoTime() {
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        try {
            Drone.StoreThis.RatioingJobValue = parseFloat(document.getElementById("postformid1")
                .value);
            Drone.StoreThis.NormalUntillValue = parseInt(document.getElementById("postformid2")
                .value);
            Drone.StoreThis.RatioingStamValue = parseFloat(document.getElementById("postformid3")
                .value);
            Drone.StoreThis.NormalStamUntillValue = parseInt(document.getElementById("postformid4")
                .value);
            //alert(fic[Drone.StoreThis.FightCity]);
            //return;
            if (Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 1 && Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 1) {
                // two targets grrrrrrrrrrrrr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // so panic?!
                alert('Fighting two different people is disabled, please change one of the Stamina options.');
                return;
            }
            if (Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 5 && Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 5) {
                // two targets grrrrrrrrrrrrr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // so panic?!
                alert('Fighting in two different places is disabled, please change one of the Stamina options.');
                return;
            }
            Drone.StoreThis.WhoToKill = parseInt(document.getElementById("postformid5")
                .value);
            if (Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 1 && Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector != 1) {
                Drone.StoreThis.WhoToKill = parseInt(document.getElementById("postformid6")
                    .value);
            }
        } catch (err) {}
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //alert(''+Drone.StoreThis.FightCity+'\n'+Drone.StoreThis.Restart+'\n'+Drone.StoreThis.UseWhatFirst+'\n'+Drone.StoreThis.RobbingSlotSpeed+'\n'+Drone.StoreThis.RobbingPageRefresh+'\n'+Drone.StoreThis.RepeatJobSpeed+'\n'+Drone.StoreThis.PageRefresh+'\n'+Drone.StoreThis.AttackSpeed+'\n'+Drone.StoreThis.RestartIn+'\n'+Drone.StoreThis.Health+'\n'+Drone.StoreThis.Spending+'\n'+Drone.StoreThis.WhoToKill+'\n'+Drone.StoreThis.opponentLevelMax+'\n'+Drone.StoreThis.opponentMafiaMax+'\n'+Drone.StoreThis.NormalUntillValue+'\n'+Drone.StoreThis.RatioingJobValue+'\n'+Drone.StoreThis.NormalStamUntillValue+'\n'+Drone.StoreThis.RatioingStamValue+'\n'+Drone.JobOptions.DoExtraJob+'\n'+Drone.JobOptions.DoExtraStam+'\n'+Drone.JobOptions.RatioingJob+'\n'+Drone.JobOptions.NormalUntillJob+'\n'+Drone.JobOptions.RatioStam+'\n'+Drone.JobOptions.NormStamUntil+'');
        //return;
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //closeZpopup();
        writeSettings();
        //17 Human 1337 speak?
        if (rres[Drone.StoreThis.RestartIn] == 60000) {
            HumanMinute = 1;
        } else if (rres[Drone.StoreThis.RestartIn] == 300000) {
            HumanMinute = 5;
        } else if (rres[Drone.StoreThis.RestartIn] == 450000) {
            HumanMinute = 7.5;
        } else if (rres[Drone.StoreThis.RestartIn] == 600000) {
            HumanMinute = 10;
        } else if (rres[Drone.StoreThis.RestartIn] == 1200000) {
            HumanMinute = 20;
        }
        if (ric[Drone.StoreThis.RobCity] == 1) {
            robCiti = 'New York';
        } else if (ric[Drone.StoreThis.RobCity] == 5) {
            robCiti = 'Las Vegas';
        } else if (ric[Drone.StoreThis.RobCity] == 7) {
            robCiti = 'Brazil';
        } else if (ric[Drone.StoreThis.RobCity] == 8) {
            robCiti = 'Chicago';
        } else if (ric[Drone.StoreThis.RobCity] == 9) {
            robCiti = 'London';
        }
        Drone.Check.StaminaTotals = parseInt(document.getElementById("user_max_stamina")
            .innerHTML);
        if (Drone.Check.StaminaTotals < 2000 && (fic[Drone.StoreThis.FightCity] == 1 || fic[Drone.StoreThis.FightCity] == 5)) {
            Drone.Check.PowerAttackCost = 25;
        } else if (Drone.Check.StaminaTotals >= 2000 && Drone.Check.StaminaTotals <= 3999 && (fic[Drone.StoreThis.FightCity] == 1 || fic[Drone.StoreThis.FightCity] == 5)) {
            Drone.Check.PowerAttackCost = 25;
        } else if (Drone.Check.StaminaTotals >= 4000 && Drone.Check.StaminaTotals <= 5999 && (fic[Drone.StoreThis.FightCity] == 1 || fic[Drone.StoreThis.FightCity] == 5)) {
            Drone.Check.PowerAttackCost = 25;
        } else if (Drone.Check.StaminaTotals >= 6000 && Drone.Check.StaminaTotals <= 7999 && (fic[Drone.StoreThis.FightCity] == 1 || fic[Drone.StoreThis.FightCity] == 5)) {
            Drone.Check.PowerAttackCost = 25;
        } else if (Drone.Check.StaminaTotals >= 8000 && Drone.Check.StaminaTotals <= 9999 && (fic[Drone.StoreThis.FightCity] == 1 || fic[Drone.StoreThis.FightCity] == 5)) {
            Drone.Check.PowerAttackCost = 25;
        } else if (Drone.Check.StaminaTotals >= 10000 && (fic[Drone.StoreThis.FightCity] == 1 || fic[Drone.StoreThis.FightCity] == 5)) {
            Drone.Check.PowerAttackCost = 25;
        } else if (Drone.Check.StaminaTotals < 2000 && (fic[Drone.StoreThis.FightCity] == 7 || fic[Drone.StoreThis.FightCity] == 8 || fic[Drone.StoreThis.FightCity] == 9)) {
            Drone.Check.PowerAttackCost = 75;
        } else if (Drone.Check.StaminaTotals >= 2000 && Drone.Check.StaminaTotals <= 3999 && (fic[Drone.StoreThis.FightCity] == 7 || fic[Drone.StoreThis.FightCity] == 8 || fic[Drone.StoreThis.FightCity] == 9)) {
            Drone.Check.PowerAttackCost = 75;
        } else if (Drone.Check.StaminaTotals >= 4000 && Drone.Check.StaminaTotals <= 5999 && (fic[Drone.StoreThis.FightCity] == 7 || fic[Drone.StoreThis.FightCity] == 8 || fic[Drone.StoreThis.FightCity] == 9)) {
            Drone.Check.PowerAttackCost = 75;
        } else if (Drone.Check.StaminaTotals >= 6000 && Drone.Check.StaminaTotals <= 7999 && (fic[Drone.StoreThis.FightCity] == 7 || fic[Drone.StoreThis.FightCity] == 8 || fic[Drone.StoreThis.FightCity] == 9)) {
            Drone.Check.PowerAttackCost = 75;
        } else if (Drone.Check.StaminaTotals >= 8000 && Drone.Check.StaminaTotals <= 9999 && (fic[Drone.StoreThis.FightCity] == 7 || fic[Drone.StoreThis.FightCity] == 8 || fic[Drone.StoreThis.FightCity] == 9)) {
            Drone.Check.PowerAttackCost = 75;
        } else if (Drone.Check.StaminaTotals >= 10000 && (fic[Drone.StoreThis.FightCity] == 7 || fic[Drone.StoreThis.FightCity] == 8 || fic[Drone.StoreThis.FightCity] == 9)) {
            Drone.Check.PowerAttackCost = 75;
        }
        //alert(''+Drone.Check.StaminaTotals+'\n'+Drone.Check.PowerAttackCost+'');
        //return;
        //alert(''+Restarter[Drone.StoreThis.Restart]+'\n'+SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst]+'\n'+WhichSkill[Drone.StoreThis.Spending]+'\n'+rref[Drone.StoreThis.RobbingPageRefresh]+'\n'+rjref[Drone.StoreThis.RepeatJobSpeed]+'\n'+plref[Drone.StoreThis.PageRefresh]+'\n'+rres[Drone.StoreThis.RestartIn]+'\n'+ris[Drone.StoreThis.RobbingSlotSpeed]+'\n'+aref[Drone.StoreThis.AttackSpeed]+'\n'+fic[Drone.StoreThis.FightCity]+'\n'+ric[Drone.StoreThis.RobCity]+'\n'+RS[Drone.StoreThis.RobSquads]+'\n'+Drone.StoreThis.opponentMafiaMax+'\n'+Drone.StoreThis.opponentLevelMax+'\n'+Drone.StoreThis.Health+'\n'+Drone.StoreThis.LevelMeUpOi+'\n'+HumanMinute+'');
        if (DoesIHaveStamina < Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts && DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            alert('You need a minimum of ' + Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts + ' Energy or ' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts + ' Stamina to run this!');
            return;
        } else {
            setTimeout(offon, 500);
            return;
        }
        return;
    }

    function offon() {
        create_runningdiv();
        /*document.getElementById("killzdrone").onclick = function () {
if (Drone.Running.Paused) {
Drone.Running.Paused = false;
GoTime();
document.getElementById("showstatus").style.display = 'none';
} else {
clearInterval(Drone.SpeedCFG.startkilling);
clearInterval(Drone.SpeedCFG.healInterval);
//alert(''+Drone.Check.CurrentEnergyRatio+'\n'+Drone.Check.CurrentStamRatio+'');
Drone.Running.Paused = true;
logmsg('Drone Paused..', 'status');
logmsg('Drone Paused..', 'true_log');
document.getElementById("showstatus").style.display = ''
}
};*/
        document.getElementById("killzdrone")
            .onclick = function () {
            if (Drone.Running.Paused) {
                Drone.Running.Paused = false;
                GoTime();
                document.getElementById("resume")
                    .style.display = 'none';
                document.getElementById("pause")
                    .style.display = 'inline';

            } else {
                ClearIVLS();
                Drone.Running.Paused = true;
                logmsg('Drone Paused..', 'status');
                logmsg('Drone Paused..', 'true_log');
                document.getElementById("resume")
                    .style.display = 'inline';
                document.getElementById("pause")
                    .style.display = 'none';
                //document.getElementById("showstatus").style.display = ''
            }
        };

        if (Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 2 || Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 2 || Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 3 || Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 3) {
            document.getElementById("IRV")
                .style.display = '';
        } else {
            document.getElementById("IRV")
                .style.display = 'none';
        }
        if (Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 4 || Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 4) {
            document.getElementById("IRR")
                .style.display = '';
        } else {
            document.getElementById("IRR")
                .style.display = 'none';
        }
        if (Drone.PrimaryStaminaJobInfo.WhichJobStaminaSelector == 5 || Drone.SecondryStaminaJobInfo.WhichJobStaminaSelector == 5) {
            document.getElementById("IRF")
                .style.display = '';
        } else {
            document.getElementById("IRF")
                .style.display = 'none';
        }
        if (Restarter[Drone.StoreThis.Restart] == 'true') {
            document.getElementById("IRS")
                .style.display = 'none';
        } else {
            document.getElementById("IRS")
                .style.display = '';
        }

        document.getElementById("log_show")
            .onclick = function () {
            $('#true_log')
                .toggle();
            return false
        };

        document.getElementById("loot_show")
            .onclick = function () {
            $('#loot_log')
                .toggle();
            return false
        };

        $('#logclose')
            .click(function () {
            ClearIVLS();
            Drone.Running.Paused = true;
            $('#gxRDiv')
                .remove();
        });
        TimedMessage('Starting Drone', 'status', 4);
        logmsg('Drone Loaded..', 'true_log');
        document.getElementById('RobCiti')
            .innerHTML = robCiti;
        if (mytimestampin == 0) {
            mytimestampin = 1;
            document.getElementById('ClockedIn')
                .innerHTML = Drone.Check.Started;
        }
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'stamina' && DoesIHaveStamina > Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            StaminaTravelr();
            return;
        } else if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            JobTravelr();
            return;
        } else if (DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            setTimeout(StaminaTravelr, 3500);
            return;
        } else {
            setTimeout(JobTravelr, 3500);
            return;
        }
    }

    function ClearIVLS() {
        clearInterval(Drone.Fighterx.AttackInterval);
        clearInterval(Drone.Fighterx.FLInterval);
        clearInterval(Drone.SpeedCFG.healInterval);
        clearInterval(Drone.SpeedCFG.startkilling);
        clearTimeout(Drone.Fighterx.FightWatchDogTimout);
        return;
    }

    function JobTravelr() {
        if (Drone.Running.Paused) {
            return;
        }
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        if (Drone.JobOptions.DoExtraJob == 1 && Drone.JobOptions.NormalUntillJob == true) {
            if (DoesIHaveEnergy >= Drone.StoreThis.NormalUntillValue) {
                Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyJobInfo";
                Drone.JobOptions.DoExtraJob--;
            }
        } else if (Drone.JobOptions.DoExtraJob == 1 && Drone.JobOptions.RatioingJob == true) {
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingJobValue) {
                Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyJobInfo";
                Drone.JobOptions.DoExtraJob--;
            }
        }
        logmsg('Traveling..', 'status');
        logmsg('Traveling..', 'true_log');
        ClearIVLS();
        document.getElementById("ActiRes")
            .setAttribute("class", "energy");
        document.getElementById('ActiRes')
            .innerHTML = Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyJobName;
        do_ajax('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=' + Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyJobCity + '&tab=' + Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyJobTab + '');
        setTimeout(DoEnergyJob, plref[Drone.StoreThis.PageRefresh]);
        ResetR();
        CloseDoopidPopup();
        return;
    }

    function StaminaTravelr() {
        if (Drone.Running.Paused) {
            return;
        }
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                Drone.JobOptions.DoExtraStam--;
            }
        } else if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true) {
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                Drone.JobOptions.DoExtraStam--;
            }
        }
        logmsg('Traveling..', 'status');
        logmsg('Traveling..', 'true_log');
        bhhk = 0;
        ClearIVLS();
        ResetR();
        CloseDoopidPopup();
        document.getElementById("ActiRes")
            .setAttribute("class", "stamina");
        document.getElementById('ActiRes')
            .innerHTML = Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobName;
        if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFobbing == true) {
            do_ajax('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobCity + '&tab=' + Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaJobTab + '');
        } else if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFighting == true) {
            do_ajax("inner_page", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=9&destination=" + fic[Drone.StoreThis.FightCity] + "&from=stats&zone=1&user=" + Drone.JobOptions.Targetid(), 1, 1, 0, 0);
            Drone.SpeedCFG.healInterval = setInterval(DoAutoHeal, 5000);
            Drone.SpeedCFG.startkilling = setInterval(IceCheckEm, 15000);
        } else if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFlFighting == true) {
            do_ajax("mainDiv", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=9&destination=" + fic[Drone.StoreThis.FightCity] + "&from=fight");
        } else {
            do_ajax('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination=' + ric[Drone.StoreThis.RobCity] + '&from=robbing&zone=1&nextParams=&menu=travel');
        }
        setTimeout(DoStaminaJob, plref[Drone.StoreThis.PageRefresh]);
        return;
    }

    /*Teh Meep Meeeeeeeep Job Traveler*/
    function TravelMeepMeep() { // where does meep meep even come from!?
        if (Drone.Running.Paused) {
            return;
        }
        logmsg('Flying to NY!..', 'status');
        logmsg('Attempting a levelup..', 'true_log');
        do_ajax('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=1&tab=9');
        setTimeout(DoIttyBittyLevelr, plref[Drone.StoreThis.PageRefresh]);
        return;
    }

    function DoIttyBittyLevelr() { //dedication to some awesome chick lololol
        if (Drone.Running.Paused) {
            return;
        }
        if (ittybitty == 0) {
            ittybitty = 1;
            var actulevel = $('#user_level')
                .text();
            if (actulevel != Drone.CurrentLevel) {
                ittybitty = 0;
                logmsg('Levelup Attempt Successful..', 'true_log');
                setTimeout(JobTravelr, 3500);
                return;
            }
            var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
                .innerHTML);
            if (DoesIHaveEnergy <= 35) { // got stamy?
                ittybitty = 0;
                logmsg('Levelup Failed, Retrying Stamina..', 'true_log');
                setTimeout(StaminaTravelr, 3500);
                return;
            }
            logmsg('Settling a Beef... Permanently...', 'status');
            logmsg('Repeating Job.. Attempting a Levelup', 'true_log');
            $('#city_job_69 > .job_action > a')
                .click(); // do a backflip?
            setTimeout(ittyresetr, 900);
            setTimeout(DoIttyBittyLevelr, 1200);
            return;
        }
    }

    function ittyresetr() {
        ittybitty = 0;
        return;
    }

    function crewpostr() {
        try {
            var hazbeenpostedcheckr = $('#btn_crew_recruit')
                .text();
            var CheckNow = /Ask/g;
            var AndIsFeedScrewed = CheckNow.test(hazbeenpostedcheckr);
            if (!AndIsFeedScrewed) {
                crewposted = 0;
                return;
            } else if (AndIsFeedScrewed) {
                logmsg('Have hit application autoposts for the day, temporarily disabling autoposting for crew..', 'true_log');
                crewposted = 1;
                setTimeout(crewpostr, 1800000);
                return;
            }
        } catch (err) {}
    }

    function Bankrr() {
        BBlock = 0;
        return;
    }

    function DoEnergyJob() {
        try {
            var nqued = $('#btn_queue')
                .text();
            var hazbeenposted = $('#btn_crew_recruit')
                .text();
            var anqued = nqued.substring(2);
            var tellmeNow = /Ask/g;
            var Annnnd = tellmeNow.test(hazbeenposted);
            //if(Drone.StoreThis.ABank){
            if (anqued <= 31 && Annnnd == true) {
                if (crewposted == 0) {
                    crewposted = 1;
                    logmsg('Crew was under 32, so have posted for some..', 'true_log');
                    var qclickMe = document.getElementById("btn_crew_recruit");
                    var qevt = document.createEvent("MouseEvents");
                    qevt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    qclickMe.dispatchEvent(qevt);
                    setTimeout(crewpostr, 8000);
                }
            }
            //}
        } catch (err) {}
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        spendSkills();
        if (Drone.Running.Paused) {
            return;
        }
        UpdateCashInHand();
        if (Drone.StoreThis.ABank) {
            BastardTehBanker();
        }
        RatioChecker();
        if (FUUUUUUU == 1 && DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            FUBUTTON = document.getElementsByClassName("sexy_button_new sexy_button_new short red impulse_buy")[0];
            if (!FUBUTTON) {
                FUUUUUUU = 0;
                setTimeout(JobTravelr, 3000);
                return;
            }
            logmsg('Attempting to kill bandit..', 'true_log');
            logmsg('Refreshing Tab..', 'true_log');
            FUBUTTON.click();
            FUUUUUUU = 0;
            setTimeout(JobTravelr, 6000);
            return;
        }
        if (DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts && DoesIHaveStamina < Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            logmsg('Out of resources..', 'status');
            logmsg('Out of resources..', 'true_log');
            if (Drone.Check.EnergyStamina < 5) {
                setTimeout(JobTravelr, 3500);
                Drone.Check.EnergyStamina++;
                return;
            }
            if (Drone.StoreThis.LevelMeUpOi == true && DoesIHaveEnergy >= 36) {
                //if(DoesIHaveEnergy >= 36 && DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts){
                setTimeout(TravelMeepMeep, 3500);
                return;
                //}
            }
            if (Drone.StoreThis.Restart == true) {
                setTimeout(JobTravelr, rres[Drone.StoreThis.RestartIn]); //30mins
                logmsg('Out of resources..', 'status');
                logmsg('Restarting in ' + HumanMinute + ' minutes..', 'true_log');
                return;
            } else {
                if (mytimestampout == 0) {
                    mytimestampout = 1;
                    document.getElementById('ClockedOut')
                        .innerHTML = Drone.Check.Finished
                }
                document.getElementById("resume")
                    .style.display = 'inline';
                document.getElementById("pause")
                    .style.display = 'none';
                Drone.Running.Paused = true;
                logmsg('Out of resources..', 'status');
                logmsg('Out of resources..', 'true_log');
                return;
            }
        }
        if (Drone.JobOptions.DoExtraJob == 0 && Drone.JobOptions.NormalUntillJob == true) {
            if (DoesIHaveEnergy <= Drone.StoreThis.NormalUntillValue && Drone.JobOptions.NormalUntillJob == true) {
                logmsg('Switching to secondry job...', 'true_log');
                logmsg('Switching to secondry job...', 'status');
                Drone.JobOptions.JobPrimaryOrSecondary = "SecondryEnergyJobInfo";
                setTimeout(JobTravelr, 2000);
                Drone.JobOptions.DoExtraJob++;
                return;
            }
        } else if (Drone.JobOptions.DoExtraJob == 0 && Drone.JobOptions.RatioingJob == true) {
            //if (Drone.Check.CurrentEnergyRatio <= Drone.StoreThis.RatioingJobValue && Drone.JobOptions.RatioingJob == true){
            if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingJobValue && Drone.JobOptions.RatioingJob == true) {
                logmsg('Switching to secondry job...', 'true_log');
                logmsg('Switching to secondry job...', 'status');
                Drone.JobOptions.JobPrimaryOrSecondary = "SecondryEnergyJobInfo";
                setTimeout(JobTravelr, 2000);
                Drone.JobOptions.DoExtraJob++;
                return;
            }
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'jnrg' && DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            document.getElementById("resume")
                .style.display = 'inline';
            document.getElementById("pause")
                .style.display = 'none';
            Drone.Running.Paused = true;
            logmsg('Spent all energy Stopped..', 'status');
            logmsg('Spent all energy stopping..', 'true_log');
            return;
        }
        if (DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            StaminaTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'jstam' && DoesIHaveStamina > Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            StaminaTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'stamina' && DoesIHaveStamina > Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            StaminaTravelr();
            return;
        }
        /*if (document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) {
document.getElementById("resume").style.display = 'inline';
document.getElementById("pause").style.display = 'none';
Drone.Running.Paused = true;
logmsg('Short of Cash or Consumables.. Stopping..', 'status');
logmsg('Short of Cash or Consumables.. Stopping..', 'true_log');
return;
} */
        if (Drone.JobOptions.DoExtraJob == 1 && Drone.JobOptions.NormalUntillJob == true) {
            if (DoesIHaveEnergy >= Drone.StoreThis.NormalUntillValue) {
                logmsg('Switching back to primary job...', 'true_log');
                logmsg('Switching back to primary job...', 'status');
                Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyJobInfo";
                setTimeout(JobTravelr, 2000);
                Drone.JobOptions.DoExtraJob--;
                return;
            }
        } else if (Drone.JobOptions.DoExtraJob == 1 && Drone.JobOptions.RatioingJob == true) {
            //if (Drone.Check.CurrentEnergyRatio > Drone.StoreThis.RatioingJobValue){
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingJobValue) {
                logmsg('Switching back to primary job...', 'true_log');
                logmsg('Switching back to primary job...', 'status');
                Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyJobInfo";
                setTimeout(JobTravelr, 2000);
                Drone.JobOptions.DoExtraJob--;
                return;
            }
        }
        Drone.Check.EnergyStamina = 0;
        /*if(Drone.Check.BanditsBroski == 3){
Drone.Check.BanditsBroski = 0;
logmsg('Refreshing Tab..', 'true_log');
setTimeout(JobTravelr,500);
return;
}
if(document.getElementsByClassName("bandit-eliminate-btn").length > 0){
Drone.Check.BanditsBroski++;
var hazbeenposted = $('#btn_crew_recruit').text();
var tellmeNow = /Posted/g;
var Annnnd = tellmeNow.test(hazbeenposted);
if(anqued == 0 && Annnnd == false){
logmsg('Attempting to post for crew..', 'true_log');
var qclickMe = document.getElementById("btn_crew_recruit"); 
var qevt = document.createEvent("MouseEvents");
qevt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
qclickMe.dispatchEvent(qevt);
setTimeout(DoEnergyJob,2000);
return;
}else if(anqued == 0 && Annnnd == true){
TimedMessage('Got Bandits, but no crew.. Restarting', 'status', 300);
logmsg('Got Bandits, but no crew..', 'true_log');
setTimeout(JobTravelr,300000);
return;
}else{
logmsg('Attempting to kill bandit..', 'true_log');
logmsg('Refreshing Tab..', 'true_log');
document.getElementsByClassName("sexy_button_new sexy_button_new short red impulse_buy")[0].click();
setTimeout(JobTravelr,6000);
return;
}
} */
        if (document.getElementsByClassName("bandit-eliminate-btn")
            .length > 0) {
            var a = document.getElementsByClassName("sexy_button_new sexy_button_new short red impulse_buy")[0];
            if (!a) {
                setTimeout(JobTravelr, 3000);
                return;
            }
            var sillyBTimer = $(".bandit-timer")
                .text();
            var texBandit = parseInt(sillyBTimer);
            var hazbeenposted = $('#btn_crew_recruit')
                .text();
            var tellmeNow = /Posted/g;
            var Annnnd = tellmeNow.test(hazbeenposted);
            if (anqued == 0 && Annnnd == false) {
                logmsg('Attempting to post for crew..', 'true_log');
                var qclickMe = document.getElementById("btn_crew_recruit");
                var qevt = document.createEvent("MouseEvents");
                qevt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                qclickMe.dispatchEvent(qevt);
                setTimeout(DoEnergyJob, 2000);
                return;
            }
            if (anqued == 0 && Annnnd == true) {
                TimedMessage('Got Bandits, but no crew.. Restarting', 'status', 300);
                logmsg('Got Bandits, but no crew..', 'true_log');
                setTimeout(JobTravelr, 300000);
                return;
            }
            if (Drone.StoreThis.jb) {
                if ($(".bandit-desc")
                    .text() == "Job Bandit") {
                    logmsg('Attempting to kill Job Bandit..', 'true_log');
                    logmsg('Refreshing Tab..', 'true_log');
                    a.click();
                    setTimeout(JobTravelr, 6000);
                    return;
                    //alert('job');
                }
            }
            if (Drone.StoreThis.xp && Drone.StoreThis.BanditGamblerXP == true) {
                if (texBandit <= Drone.StoreThis.BanditElapsedTimerXP) {
                    if ($(".bandit-desc")
                        .text() == "XP Bandit") {
                        logmsg('Attempting to kill XP Bandit..', 'true_log');
                        logmsg('Refreshing Tab..', 'true_log');
                        a.click();
                        setTimeout(JobTravelr, 6000);
                        return;
                        //alert('xp');
                    }
                } else {
                    FUUUUUUU = 1;
                    Drone[Drone.JobOptions.JobPrimaryOrSecondary].doEnergyJob();
                    logmsg('Doing Job..', 'status');
                    logmsg('Repeating Job..', 'true_log');
                    Drone.Check.JobsDone++;
                    document.getElementById('JobsDone')
                        .innerHTML = Drone.Check.JobsDone;
                    CloseDoopidPopup();
                    return;
                }
            }
            if (Drone.StoreThis.csh && Drone.StoreThis.BanditGamblerCSH == true) {
                if (texBandit <= Drone.StoreThis.BanditElapsedTimerCash) {
                    if ($(".bandit-desc")
                        .text() == "Cash Bandit") {
                        logmsg('Attempting to kill Cash Bandit..', 'true_log');
                        logmsg('Refreshing Tab..', 'true_log');
                        a.click();
                        setTimeout(JobTravelr, 6000);
                        return;
                        //alert('cash');
                    }
                } else {
                    FUUUUUUU = 1;
                    Drone[Drone.JobOptions.JobPrimaryOrSecondary].doEnergyJob();
                    logmsg('Doing Job..', 'status');
                    logmsg('Repeating Job..', 'true_log');
                    Drone.Check.JobsDone++;
                    document.getElementById('JobsDone')
                        .innerHTML = Drone.Check.JobsDone;
                    CloseDoopidPopup();
                    return;
                }
            }
            if (Drone.StoreThis.xp) {
                if ($(".bandit-desc")
                    .text() == "XP Bandit") {
                    logmsg('Attempting to kill XP Bandit..', 'true_log');
                    logmsg('Refreshing Tab..', 'true_log');
                    a.click();
                    setTimeout(JobTravelr, 6000);
                    return;
                    //alert('xp');
                }
            }
            if (Drone.StoreThis.csh) {
                if ($(".bandit-desc")
                    .text() == "Cash Bandit") {
                    logmsg('Attempting to kill Cash Bandit..', 'true_log');
                    logmsg('Refreshing Tab..', 'true_log');
                    a.click();
                    setTimeout(JobTravelr, 6000);
                    return;
                    //alert('cash');
                }
            } else {
                TimedMessage('You\'ve chosen not to kill any bandits, Restarting', 'status', 305);
                logmsg('Waiting the Bandit out..', 'true_log');
                setTimeout(JobTravelr, 300000);
                return;
            }
        }
        //setTimeout(function(){Drone[Drone.JobOptions.JobPrimaryOrSecondary].doEnergyJob();DoEnergyJob();},rjref[Drone.StoreThis.RepeatJobSpeed]);
        Drone[Drone.JobOptions.JobPrimaryOrSecondary].doEnergyJob();
        //Drone[Drone.JobOptions.StamPrimaryOrSecondary].doStaminaJob();
        logmsg('Doing Job..', 'status');
        logmsg('Repeating Job..', 'true_log');
        Drone.Check.JobsDone++;
        document.getElementById('JobsDone')
            .innerHTML = Drone.Check.JobsDone;
        CloseDoopidPopup();
        return;
    }

    function xpathFirst(p, c) {
        return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null)
            .singleNodeValue;
    }

    function $x(p, c) {
        var i, r = [],
            x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        while ((i = x.iterateNext())) r.push(i);
        return r;
    }

    String.prototype.untag = function () {
        return this.replace(/<[^>]*>/g, '');
    };

    function DoStaminaJob() {
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        spendSkills();
        if (Drone.Running.Paused) {
            return;
        }
        UpdateCashInHand();
        if (Drone.StoreThis.ABank) {
            BastardTehBanker();
        }
        RatioChecker();
        if (DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts && DoesIHaveStamina < Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            if (Drone.StoreThis.LevelMeUpOi == true && DoesIHaveEnergy >= 36) {
                //if(DoesIHaveEnergy >= 36 && DoesIHaveEnergy < Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts){
                setTimeout(TravelMeepMeep, 3500);
                return;
                //}
            }
            if (Drone.StoreThis.Restart == true) {
                setTimeout(JobTravelr, rres[Drone.StoreThis.RestartIn]);
                logmsg('Out of resources..', 'status');
                logmsg('Restarting in ' + HumanMinute + ' minutes..', 'true_log');
                return;
            } else {
                if (mytimestampout == 0) {
                    mytimestampout = 1;
                    document.getElementById('ClockedOut')
                        .innerHTML = Drone.Check.Finished
                }
                document.getElementById("resume")
                    .style.display = 'inline';
                document.getElementById("pause")
                    .style.display = 'none';
                Drone.Running.Paused = true;
                logmsg('Out of resources..', 'status');
                logmsg('Out of resources..', 'true_log');
                return;
            }
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'jstam' && DoesIHaveStamina < Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            document.getElementById("resume")
                .style.display = 'inline';
            document.getElementById("pause")
                .style.display = 'none';
            Drone.Running.Paused = true;
            logmsg('Spent all stamina Stopped..', 'status');
            logmsg('Spent all stamina stopping..', 'true_log');
            return;
        }
        if (DoesIHaveStamina < Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts) {
            JobTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'jnrg' && DoesIHaveEnergy > Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            JobTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            JobTravelr();
            return;
        }
        /*if(Drone[Drone.JobOptions.StamPrimaryOrSecondary].isRobbing == true){
var buttonx = $('#oneClickRobAll').text();
var checkit = parseInt(buttonx.substring(9));
if(DoesIHaveStamina < checkit){
logmsg('not enough stamina to clear the board..', 'status');
return;
}
}
*/
        if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true) {
                logmsg('Switching to secondry stamina job...', 'true_log');
                logmsg('Switching to secondry stamina job...', 'status');
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
            if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true) {
                logmsg('Switching to secondry stamina job...', 'true_log');
                logmsg('Switching to secondry stamina job...', 'status');
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        }
        if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue) {
                logmsg('Switching back to primary stamina job...', 'true_log');
                logmsg('Switching back to primary stamina job...', 'status');
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio > Drone.StoreThis.RatioingStamValue){
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue) {
                logmsg('Switching back to primary stamina job...', 'true_log');
                logmsg('Switching back to primary stamina job...', 'status');
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        }
        if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFighting == true) {
            IceCheckEm();
            return;
        }
        if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFlFighting == true) {
            HitTehfLs();
            return;
        }
        Drone[Drone.JobOptions.StamPrimaryOrSecondary].doStaminaJob();
        CloseDoopidPopup();
        if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFobbing == true) {
            Drone.Check.FobsDone++;
            document.getElementById('FobsDone')
                .innerHTML = Drone.Check.FobsDone;
        }
        return;
    }

    function ResetR() {
        Drone.Check.AmAwake = false;
        Drone.Check.AmRobbing = false;
        return;
    }

    function RefreshMe() {
        try {
            var IsEveryoneDeadYet = document.evaluate("//a[@id=\"rob_refresh_cost\"]//span//span[contains(string(),'Refresh: 0')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (IsEveryoneDeadYet.snapshotLength >= 1) {
                CloseDoopidPopup();
                setTimeout(DoStaminaJob, plref[Drone.StoreThis.PageRefresh]);
                do_ajax('mainDiv', 'remote/html_server.php?xw_controller=robbing&xw_action=refresh');
                Drone.Check.BoardsCleared++;
                document.getElementById('Bcleared')
                    .innerHTML = Drone.Check.BoardsCleared;
                logmsg('Refreshing the board..', 'status');
                return;
            } else {
                DoStaminaJob();
                return;
            }
        } catch (err) {}
    }

    function CloseDoopidPopup() {
        if (Drone.Check.GiveMeAPause == 0) {
            Drone.Check.GiveMeAPause = 1;
            var actulevel = $('#user_level')
                .text();
            if (actulevel != Drone.CurrentLevel) {
                //do_ajax('','remote/html_server.php?xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city='+Drone.Check.ActiveCity+'&no_load=1');
                Drone.CurrentLevel++;
                Drone.Check.LevelsDone++;
                document.getElementById('Levelscleared')
                    .innerHTML = Drone.Check.LevelsDone;
                grab_bonus();
                //return;
            }
            if ($('.pop_bg')
                .length > 0) {
                $('.pop_bg')
                    .each(function () {
                    var id = this.id;
                    MW.Popup.hide(id.substr(id.lastIndexOf("_") + 1))
                });
            }
            Drone.Check.GiveMeAPause = 0;
            return;
        }
    }

    var loot_item = [],
        loot_count, loot_log, l_log = '';
    var loot_img;
    var total_loot = 0;

    function Add_to_loot(loot, count, img) {
        total_loot += count;
        if (loot_item.length <= 0) {
            loot_item[loot_item.length] = new Array(loot, count, img);
        } else {
            for (i = 0; i < loot_item.length; i++) {
                if (loot == loot_item[i][0]) {
                    loot_item[i][1] += count;
                    break;
                } else if (i == loot_item.length - 1) {
                    loot_item[loot_item.length] = new Array(loot, count, img);
                    break;
                }
            }
        }
        loot_item.sort();
        document.getElementById('loot_log')
            .innerHTML = '';
        loot_item.reverse();
        try {
            l_log = '';
            for (l = (loot_item.length - 1); l >= 0; l--) {
                l_log += '<span class="good">' + loot_item[l][1] + 'x</span> <img src="' + loot_item[l][2] + '" style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> ' + loot_item[l][0] + '<br>';
            }
            document.getElementById('loot_log')
                .innerHTML = l_log;
        } catch (err) {
            alert(err);
        }

    }
    //loot_item[l][2]+'" style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> '+loot_item[l][0]+'<br>';
    function grab_bonus() {
        request('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city=' + Drone.Check.ActiveCity + '&mwcom=1&no_load=1&xw_client_id=8', function (page) {
            if (page.indexOf('ERROR 500: response never closed') != -1) {
                return;
            } else {
                var data = JSON.parse(page.replace(/^(\s\d\s+)/, ''));
                temp = '';
                loot_log = [];
                temp = data.bonusName;
                temp = temp.replace(/A MYSTERY SHIPMENT CONTAINING /g, '');
                tehcount = 1;
                if (temp.match(/2 ANIMAL FEEDS/g)) {
                    tehcount = 2;
                    temp = temp.replace(/^\d+\s+/, '');
                } else if (temp.match(/5 ANIMAL FEEDS/g)) {
                    tehcount = 5;
                    temp = temp.replace(/^\d+\s+/, '');
                }
                temp = temp.replace(/A /g, '');
                temp = temp.replace(/AN /g, '');
                temp = temp.replace(/\w+/g, function (w) {
                    return w[0].toUpperCase() + w.slice(1)
                        .toLowerCase();
                });
                loot_img = data.bonusImage;
                Add_to_loot(temp, tehcount, loot_img);
                loot_log[loot_log.length] = '<img src="' + loot_img + '" style="width: 20px; height: 20px;"></img> ' + temp;
                logmsg('You Leveled to ' + Drone.CurrentLevel + ', You received: ' + temp + '', 'true_log');
            }
        }); //A MYSTERY SHIPMENT CONTAINING 
    };

    /*function grab_bonus() {
request('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city='+Drone.Check.ActiveCity+'&mwcom=1&no_load=1&xw_client_id=8',function(page){
if (page.indexOf('ERROR 500: response never closed')!=-1) {
return;
} else {
var data=JSON.parse(page.replace(/^(\s\d\s+)/,''));
logmsg('You Leveled to '+Drone.CurrentLevel+', You received: '+data.bonusName+'', 'true_log');
}
});
}; */

    function request(url, handler, errorhandler) {
        var timestamp = parseInt(new Date()
            .getTime()
            .toString()
            .substring(0, 10));
        if (url.indexOf('cb=') == -1) {
            url += '&cb=' + User.id + timestamp;
        }
        if (url.indexOf('tmp=') == -1) {
            url += '&tmp=' + timestamp;
        }
        User.clicks++;
        var params = {
            'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': User.id,
            'sf_xw_sig': local_xw_sig,
            'xw_client_id': 8,
            'skip_req_frame': 1,
            'clicks': User.clicks
        };
        $.ajax({
            type: "POST",
            url: preurl + url,
            data: params,
            cache: false,
            success: handler,
            error: errorhandler
        });
    }

    function getCurrCity() {
        var city = $('#mw_city_wrapper')
            .attr('class');
        switch (city) {
        case 'mw_city1':
            return '1';
        case 'mw_city2':
            return '2';
        case 'mw_city3':
            return '3';
        case 'mw_city4':
            return '4';
        case 'mw_city5':
            return '5';
        case 'mw_city6':
            return '6';
        case 'mw_city7':
            return '7';
        case 'mw_city8':
            return '8';
        case 'mw_city9':
            return '9';
        default:
            return 'UnknowCity';
        }
    }

    function IceCheckEm() {
        if (isFightPopOpen()) {
            return;
        }
        if (Drone.Running.Paused) {
            return;
        }
        UpdateCashInHand();
        if (Drone.StoreThis.ABank) {
            BastardTehBanker();
        }
        if (document.getElementsByClassName("impulse_buy_prompt contextual")
            .length > 0) {
            StaminaTravelr();
            return;
        }
        health = parseInt(document.getElementById("user_health")
            .innerHTML);
        if (health < Drone.StoreThis.Health) {
            return;
        }
        RatioChecker();
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true) {
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
            if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true) {
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        }
        if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio > Drone.StoreThis.RatioingStamValue){
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        }
        if (DoesIHaveStamina < (Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts || Drone.Check.PowerAttackCost)) {
            JobTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            JobTravelr();
            return;
        }
        var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
        var tabtest = document.evaluate('//div[contains(@id, "tab_container")]//a[contains(., "Profile")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
            .snapshotLength > 0;
        if (tabtest > 0) {
            logmsg('Ice Checking them..', 'status');
            var hitlist_url;
            var ATag = document.getElementsByTagName('a');

            for (var i = 0; i < ATag.length; i++) {
                if (hit = /xw_controller=hitlist&xw_action=set&xw_city=(\d+).*?tmp=([a-z0-9]+).*?cb=([a-z0-9]+).*?target_pid=(\d+).*?mwzy_token=([a-f0-9]+)/.exec(ATag[i].href)) {
                    hitlist_url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hitlist&xw_action=set&xw_city=' + hit[1] + '&tmp=' + hit[2] + '&cb=' + hit[3] + '&xw_person=' + userid.substr(2, userid.length) + '&target_pid=' + hit[4] + '&mwzy_token=' + hit[5] + '&xw_client_id=8';
                }
            }
            var params = {
                ajax: 1,
                liteload: 1,
                sf_xw_user_id: User.id,
                sf_xw_sig: local_xw_sig
            };
            $.ajax({
                type: "POST",
                url: hitlist_url,
                timeout: 30000,
                data: params,
                success: function (msg) {
                    if (/is already dead or too weak!/.test(msg)) {
                        return
                    } else {
                        if (/The action was not able to be completed/.test(msg)) {
                            return
                        } else {
                            if (/Sucker Punch/.test(document.body.innerHTML)) {
                                var elem = document.getElementById("btn_attack_" + Drone.JobOptions.Targetid()
                                    .replace("|", ""));
                                var evt = document.createEvent("MouseEvents");
                                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                elem.dispatchEvent(evt)
                                logmsg('Keeeeling them..', 'true_log');
                                kill();
                            }
                        }
                    }
                },
                error: function (req, status, err) {
                    return
                }
            })
        } else {
            StaminaTravelr();
            return;
        }
    }

    function kill() {
        var actulevel = $('#user_level')
            .text();
        if (Drone.Running.Paused) {
            return;
        }
        if (actulevel != Drone.CurrentLevel) {
            setTimeout(StaminaTravelr, 2500);
            return;
        }
        UpdateCashInHand();
        if (Drone.StoreThis.ABank) {
            BastardTehBanker();
        }
        try {
            if (document.getElementById("fv2_defender_was_iced")
                .style.display == "block") {
                setTimeout(closeFightPop, 500);
                setTimeout(IceCheckEm, 600);
                return;
            }
            if (document.getElementById("fv2_defender_overlay_stolen")
                .style.display == "block") {
                setTimeout(closeFightPop, 500);
                setTimeout(IceCheckEm, 600);
                return;
            }
            if (document.getElementById("fv2_defender_overlay_iced")
                .style.display == "block") {
                setTimeout(closeFightPop, 500);
                setTimeout(IceCheckEm, 600);
                ++Diced;
                document.getElementById('icedsome')
                    .innerHTML = Diced;
                return;
            }
            if (document.getElementById("fv2_defender_overlay_killed")
                .style.display == "block") {
                setTimeout(closeFightPop, 500);
                setTimeout(IceCheckEm, 600);
                ++Dkilled;
                document.getElementById('killedsome')
                    .innerHTML = Dkilled;
                return;
            }
        } catch (err) {}
        health = parseInt(document.getElementById("user_health")
            .innerHTML);
        DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        RatioChecker();
        if (health < Drone.StoreThis.Health) {
            setTimeout(kill, aref[Drone.StoreThis.AttackSpeed]);
            return;
        }
        if (DoesIHaveStamina < Drone.Check.PowerAttackCost) {
            setTimeout(closeFightPop, 500);
            setTimeout(IceCheckEm, 2500);
            return;
        }
        var myinfonowdammit = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper')
            .className)[1];
        if (myinfonowdammit != fic[Drone.StoreThis.FightCity]) {
            fightcitytravlr();
            return;
        }
        $("#fightv2_poweratkbtn_boost_off")
            .children("a")
            .click();
        setTimeout(kill, aref[Drone.StoreThis.AttackSpeed]);
        logmsg('Keeeeling them..', 'true_log');
        return;
    }

    function HitTehfLs() {
        if (Drone.Running.Paused) {
            return;
        }
        logmsg('Attacking the Fight List..', 'status');

        //  if (document.evaluate('//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Fighters")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
        Drone.Fighterx.FLInterval = setInterval(Fightlist, 5000);
        Drone.Fighterx.AttackInterval = setInterval(Fighter, aref[Drone.StoreThis.AttackSpeed]);
        Drone.SpeedCFG.healInterval = setInterval(DoAutoHeal, 5000);
        Fightlist();
        //     }
    }


    function fightcitytravlr() {
        logmsg('Flying to Fightcity..', 'status');
        do_ajax('mainDiv', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination=' + fic[Drone.StoreThis.FightCity] + '&from=index&nextParams=&menu=travel')
        setTimeout(StaminaTravelr, plref[Drone.StoreThis.PageRefresh]);
        return;
    }

    function isFightPopOpen() {
        if (document.getElementById("fv2_widget_wrapper")) {
            if (document.getElementById("fv2_widget_wrapper")
                .style.display != "none") {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function commonFightCheck() {
        if (Drone.Running.Paused) {
            return;
        }
        if (Drone.Fighterx.FightActionRunning || isFightPopOpen()) {
            return true;
        } else {
            return false;
        }
    }

    function Fightlist() {
        if (Drone.Running.Paused) {
            return;
        }
        RatioChecker();
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true) {
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
            if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true) {
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        }
        if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio > Drone.StoreThis.RatioingStamValue){
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        }
        if (DoesIHaveStamina < (Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts || Drone.Check.PowerAttackCost)) {
            JobTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            JobTravelr();
            return;
        }
        var i;
        if (commonFightCheck()) {
            return
        }
        if ((document.getElementsByClassName("impulse_buy_prompt contextual")
            .length > 0) || (document.evaluate('//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Fighters")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
            .snapshotLength == 0)) {
            do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&tab=0', 1, 1, 0, 0);
            return;
        }
        Drone.Fighterx.FightActionRunning = true;
        clearTimeout(Drone.Fighterx.FightWatchDogTimout);
        Drone.Fighterx.FightWatchDogTimout = setTimeout(resetfightaction, 15000);
        var fightlist = document.getElementsByClassName("action");
        var randomizer = Math.floor(Math.random() * (fightlist.length - 1)) + 1;
        for (i = fightlist.length - randomizer; i > 1; i--) {
            var iced = fightlist[i].parentNode.firstElementChild.className;
            if (iced != "fight_list_player_dead") {
                break;
            }
        }
        //if (fightlist[i].parentNode.parentNode.getElementsByTagName("td")[0].getElementsByTagName("a")[2]) {
        //Drone.Fighterx.target_name = fightlist[i].parentNode.parentNode.getElementsByTagName("td")[0].getElementsByTagName("a")[1].innerHTML + " " + fightlist[i].parentNode.parentNode.getElementsByTagName("td")[0].getElementsByTagName("a")[2].innerHTML
        //    }// else {
        //    Drone.Fighterx.target_name = fightlist[i].parentNode.parentNode.getElementsByTagName("td")[0].getElementsByTagName("a")[1].innerHTML
        //  }
        //alert(Drone.Fighterx.target_name);
        //return;
        logmsg('Attacking..', 'true_log');
        Drone.Fighterx.targetid = fightlist[i].firstElementChild.id.replace('btn_attack_p', 'p|');
        fightlist[i].firstElementChild.click();
        CloseDoopidPopup();
    }

    function resetfightaction() {
        if (Drone.Running.Paused) {
            return;
        }
        Drone.Fighterx.FightActionRunning = false;
        closeFightPop();
    }

    function closeFightPop() {
        if (Drone.Running.Paused) {
            return;
        }
        Drone.Fighterx.ajax = true;
        Drone.Fighterx.closing = false;
        CloseJS();
    }

    function Fighter() {
        if (Drone.Running.Paused) {
            return;
        }
        RatioChecker();
        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var DoesIHaveStamina = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true) {
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
            if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true) {
                Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam++;
                return;
            }
        }
        if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true) {
            if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        } else if (Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true) {
            //if (Drone.Check.CurrentStamRatio > Drone.StoreThis.RatioingStamValue){
            if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue) {
                Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
                setTimeout(StaminaTravelr, 2000);
                Drone.JobOptions.DoExtraStam--;
                return;
            }
        }
        if (DoesIHaveStamina < (Drone[Drone.JobOptions.StamPrimaryOrSecondary].StaminaCosts || Drone.Check.PowerAttackCost)) {
            JobTravelr();
            return;
        }
        if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > Drone[Drone.JobOptions.JobPrimaryOrSecondary].EnergyCosts) {
            JobTravelr();
            return;
        }
        var times;
        var i;
        var health;
        //var url;
        UpdateCashInHand();
        if (Drone.StoreThis.ABank) {
            BastardTehBanker();
        }
        if (Drone.Fighterx.newfighton) {
            if (isFightPopOpen()) {
                var elem = document.getElementById("attacker_fight_status");
                if (!/Lost/.test(elem.innerHTML)) {
                    elem = document.getElementsByClassName("sexy_button_new short red impulse_buy fightV2AttackBtn");
                    if (document.getElementsByClassName("sexy_button_new short red impulse_batch_buy fightV2AttackBtn")
                        .length > 0) {
                        elem = document.getElementsByClassName("sexy_button_new short red impulse_batch_buy fightV2AttackBtn")[1];
                    }
                    if (document.getElementById("fightv2_poweratkbtn_boost_on")
                        .style.display == 'block' || document.getElementById("fightv2_poweratkbtn_boost_off")
                        .style.display == 'block') {
                        health = parseInt(document.getElementById('user_health')
                            .innerHTML);
                        if (health < 30) {
                            //                 alert('health is to low');
                            return;
                        } // stop fighting until heal happens
                        //wins++;
                        url = elem.href.replace('remote/', '');
                        if (Drone.StoreThis.BurstsOn) {
                            url = url.replace('click_amt=1', 'click_amt=' + Bcount[Drone.StoreThis.Bursts])
                        }
                        Bursts = 2;
                        for (i = 0; i < Bursts; i++) {
                            var client = new XMLHttpRequest();
                            client.open("POST", url, true);
                            client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            client.setRequestHeader("Accept", "*/*");
                            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            client.send("ajax=1&liteload=1&sf_xw_user_id=" + Drone.Fighterx.xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
                            client.onreadystatechange = function () {
                                if (this.readyState == 4) {
                                    response = client.responseText;
                                    try {
                                        var msg = JSON.parse(response);
                                    } catch (err) {
                                        return;
                                    }

                                    if (!msg.fight_result) return;
                                    document.getElementById('user_health')
                                        .innerHTML = msg.user_fields.user_health;
                                    User.health = msg.user_fields.user_health;
                                    Drone.Check.CurrentHealth = msg.user_fields.user_health;
                                    FightV2.powerAttack(msg, this);
                                    parseNewFightResults(response);
                                    var PercentComplete = (/percent_complete":([\d]+),"/.exec(response))[1];
                                    document.getElementById("level_bar")
                                        .setAttribute('style', 'overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: ' + PercentComplete + '%;');
                                    document.getElementById("exp_to_next_level")
                                        .innerHTML = (/exp_to_next_level":([\d]+),/.exec(response))[1];
                                    document.getElementById("user_cash_nyc")
                                        .innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
                                    //document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
                                    document.getElementById("user_cash_vegas")
                                        .innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
                                    document.getElementById("user_cash_brazil")
                                        .innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
                                    document.getElementById("user_cash_london")
                                        .innerHTML = '£' + (/user_cash_london":"\\u00a3([\d,]+)"/.exec(response))[1];
                                    document.getElementById("user_cash_chicago")
                                        .innerHTML = '¢' + (/user_cash_chicago":"\\u00a2([\d,]+)"/.exec(response))[1]
                                    document.getElementById("user_stamina")
                                        .innerHTML = (/user_stamina":([\d]+)/.exec(response))[1];
                                }
                            }
                            return;
                        }
                    }
                }
                // losses++;
                Drone.Fighterx.newfighton = false;
                if (!Drone.Fighterx.closing) {
                    setTimeout(closeFightPop, 2500)
                }
                Drone.Fighterx.closing = true;
            }
        }
    }

    function parseNewFightResults(response) {
        if (Drone.Running.Paused) {
            return;
        }
        RatioChecker();
        var elem = document.getElementById("attacker_fight_status");
        if (!elem) return;
        var lost = /Lost/.test(elem.innerHTML);
        if (!lost) {
            if (!Drone.Fighterx.newfighton) {
                Drone.Fighterx.newfighton = true
            }
        } else {
            Drone.Fighterx.newfighton = false;
            if (isFightPopOpen()) {
                setTimeout(closeFightPop, 2500);
            }
        }
        if (document.getElementById("fv2_defender_overlay_iced")
            .style.display == 'block') {
            if ((/boost', 'link': '(.+?)'/.test(response))) {
                ++Diced;
                document.getElementById('icedsome')
                    .innerHTML = Diced;
                //  alert('Iced!');
                return;
            }
        }
        if (document.getElementById("fv2_defender_overlay_killed")
            .style.display == 'block') {
            if ((/boost', 'link': '(.+?)'/.test(response))) {
                ++Dkilled;
                document.getElementById('killedsome')
                    .innerHTML = Dkilled;
                //alert('Killed!!');
                return;
                //        document.getElementById("umw_ice_count").innerHTML = Drone.Fighterx.icecount;
                //        document.getElementById("umw_kill_count").innerHTML = ++Drone.Fighterx.killcount;
                //        document.getElementById("umw_total_count").innerHTML = Drone.Fighterx.icecount + Drone.Fighterx.killcount * 2;
            }
        }
    }

    function DoAutoHeal() {
        CloseDoopidPopup();
        var url = "html_server.php?xw_controller=survey&xw_action=show_nps_survey&xw_client_id=8";
        var maxHealth = parseInt(document.getElementById('user_max_health')
            .innerHTML);
        Drone.Check.CurrentHealth = parseInt(document.getElementById('user_health')
            .innerHTML);
        var client = new XMLHttpRequest();
        client.open("POST", url, true);
        client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        client.setRequestHeader("Accept", "*/*");
        client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        client.send("ajax=1&liteload=1&sf_xw_user_id=" + User.id + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
        client.onreadystatechange = function () {
            if (this.readyState == 4) {
                response = client.responseText;
                try {
                    var b = eval('(' + response + ')');
                    document.getElementById('user_health')
                        .innerHTML = b.user_fields.user_health;
                    Drone.Check.CurrentHealth = b.user_fields.user_health;
                    User.health = b.user_fields.user_health;
                } catch (err) {}
            }
        };
        if (parseInt(Drone.Check.CurrentHealth) < Drone.StoreThis.Health) {
            HealNY();
        }
    }

    function HealNY() {
        CloseDoopidPopup();
        url = 'html_server.php?xw_controller=hospital&xw_action=heal'
        url += '&xcity=1';
        send = 'ajax=1&liteload=1&sf_xw_user_id=' + User.id + '&sf_xw_sig=' + local_xw_sig;
        var client = new XMLHttpRequest();
        client.open("POST", url, true);
        client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        client.send(send);
        client.onreadystatechange = function () {
            if (this.readyState == 4) {
                response = client.responseText;
                try {
                    var b = eval('(' + response + ')');
                    document.getElementById('user_health')
                        .innerHTML = b.user_fields.user_health;
                    Drone.Check.CurrentHealth = b.user_fields.user_health;
                    User.health = b.user_fields.user_health;
                } catch (err) {}
            }
        };
    }

    function RatioChecker() {
        var CurrentNRG = parseInt(document.getElementById('user_energy')
            .innerHTML);
        var CurrentSTAM = parseInt(document.getElementById('user_stamina')
            .innerHTML);
        var CurrentXP2LVL = parseInt(document.getElementById('exp_to_next_level')
            .innerHTML);
        var NRGRATIOMATH = (CurrentXP2LVL / CurrentNRG);
        var STAMRATIOMATH = (CurrentXP2LVL / CurrentSTAM);
        var combinedEn2xp = (CurrentXP2LVL / (CurrentNRG + CurrentSTAM));
        Drone.Check.CurrentEnergyRatio = NRGRATIOMATH.toFixed(2);
        Drone.Check.CurrentStamRatio = STAMRATIOMATH.toFixed(2);
        Drone.Check.CombinedRatios = combinedEn2xp.toFixed(2);
        document.getElementById('nrg_ratio_reqd')
            .innerHTML = NRGRATIOMATH.toFixed(2);
        document.getElementById('sta_ratio_reqd')
            .innerHTML = STAMRATIOMATH.toFixed(2);
        document.getElementById('comb_ratio_reqd')
            .innerHTML = combinedEn2xp.toFixed(2);
        return;
    }


    /*function NRGRatio() { 
var CurrentNRG = parseInt(document.getElementById('user_energy').innerHTML);
var CurrentXP2LVL = parseInt(document.getElementById('exp_to_next_level').innerHTML);
var NRGRATIOMATH = (CurrentXP2LVL/CurrentNRG);
Drone.Check.CurrentEnergyRatio = NRGRATIOMATH.toFixed(2);
document.getElementById('nrg_ratio_reqd').innerHTML = NRGRATIOMATH.toFixed(2);
return;
}

function STAMRatio() { 
var CurrentSTAM = parseInt(document.getElementById('user_stamina').innerHTML);
var CurrentXP2LVL = parseInt(document.getElementById('exp_to_next_level').innerHTML);
var STAMRATIOMATH = (CurrentXP2LVL/CurrentSTAM);
Drone.Check.CurrentStamRatio = STAMRATIOMATH.toFixed(2);
document.getElementById('sta_ratio_reqd').innerHTML = STAMRATIOMATH.toFixed(2);
return;
}
*/

    function UpdateCashInHand() {
        Currcity = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper')
            .className)[1];
        switch (parseInt(Currcity)) {
        case 1:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_nyc')
                .innerHTML.replace(/,/g, '')
                .replace(/\$/g, '');
            break;
        case 2:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_cuba')
                .innerHTML.replace(/,/g, '')
                .replace(/C\$/g, '');
            break;
        case 3:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_moscow')
                .innerHTML.replace(/,/g, '')
                .replace(/R\$/g, '');
            break;
        case 4:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_bangkok')
                .innerHTML.replace(/,/g, '')
                .replace(/B\$/g, '');
            break;
        case 5:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_vegas')
                .innerHTML.replace(/,/g, '')
                .replace(/V\$/g, '');
            break;
        case 6:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_italy')
                .innerHTML.replace(/,/g, '')
                .replace(/L\$/g, '');
            break;
        case 7:
            Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_brazil')
                .innerHTML.replace(/,/g, '')
                .replace(/BRL\$/g, '');
            break
        case 8:
            ModifyChicagoSign = document.getElementById('user_cash_chicago')
                .innerHTML.replace(/,/g, '');
            Drone.BankInfo.cash_in_hand = ModifyChicagoSign.substring(1);
            break
        case 9:
            ModifyLondnSign = document.getElementById('user_cash_london')
                .innerHTML.replace(/,/g, '');
            Drone.BankInfo.cash_in_hand = ModifyLondnSign.substring(1);
            break
        }
        return;
    }

    function BastardTehBanker() {
        if (BBlock == 0) {
            BBlock = 1;
            Currcity = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper')
                .className)[1];
            if (Currcity == 1 || Currcity == 5) {
                BBlock = 0;
                return;
            }
            if (Drone.BankInfo.cash_in_hand < 10000) {
                BBlock = 0;
                return;
            }
            if (Currcity == 5) { //Vegas is speshul
                vegascash = /V\$([\d,]+)/.exec(document.getElementById("user_cash_vegas")
                    .innerHTML)[1];
                vegascash = parseInt(vegascash.replace(/\,/g, ''));
                url = 'html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&amount=' + vegascash + '&building_type=6&city=5&xw_client_id=8';
            } else {
                url = 'html_server.php?xw_controller=bank&xw_action=deposit_all&xw_city=' + Currcity + '&amount=1000000000';
            }
            var params = {
                'ajax': 1,
                'liteload': 1,
                'sf_xw_user_id': Drone.Fighterx.xw_user,
                'sf_xw_sig': local_xw_sig
            }
            $.ajax({
                type: "POST",
                url: url,
                timeout: 30000,
                data: params,
                success: function (response) {
                    if ((/user_cash_nyc":"([$\d,]+)"/.test(response))) {
                        document.getElementById("user_cash_nyc")
                            .innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
                        //  document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
                        //  document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_london")
                            .innerHTML = '£' + (/user_cash_london":"\\u00a3([\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_vegas")
                            .innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_brazil")
                            .innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_chicago")
                            .innerHTML = '¢' + (/user_cash_chicago":"\\u00a2([\d,]+)"/.exec(response))[1];
                    }
                }
            });
            logmsg('Banked Some money..', 'true_log');
            setTimeout(Bankrr, 10000);
            return;
        }
    }

    function spendSkills() {
        var IhaZskills = parseInt($('#user_skill')
            .text());
        if (IhaZskills >= 5 && Drone.StoreThis.Spending != 0) {
            do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=5&upgrade_key=' + WhichSkill[Drone.StoreThis.Spending] + '&upgrade_amt=5&no_load=1&source=level_up_popup');
            return;
        }
    }

    $("body")
        .ajaxComplete(function (e, xhr, settings) {
        if (Drone[Drone.JobOptions.StamPrimaryOrSecondary].isFlFighting == true) {
            var response = xhr.responseText;
            if (Drone.Fighterx.ajax) {
                Drone.Fighterx.ajax = false;
                return;
            }
            if (Drone.Fighterx.FightActionRunning) {
                Drone.Fighterx.FightActionRunning = false;
                clearTimeout(Drone.Fighterx.FightWatchDogTimout)
            }
            if (document.getElementById("attacker_fight_status")) {
                parseNewFightResults(response)
            }
        }
    });

    function logmsg(a, b) {
        var l = 0;
        var c = new Date()
            .getHours();
        var d = new Date()
            .getMinutes();
        var s = new Date()
            .getSeconds();
        if (b == 'status') {
            document.getElementById('status')
                .innerHTML = a
        } else if (b == 'true_log') {
            c = (c < 10 ? '0' + c : c);
            d = (d < 10 ? '0' + d : d);
            s = (s < 10 ? '0' + s : s);
            var e = '<font color=#666666>[' + c + ':' + d + ':' + s + ']</font>';
            V.splice(0, 0, ' ' + e + ' ' + a);
            l = V.length;
            var f = parseInt(document.getElementById('log_size')
                .value);
            V.length = (l < f) ? l : f;
            document.getElementById('true_log')
                .innerHTML = '';
            var g = '';
            for (l = 0; l < V.length; l++) {
                g += V[l] + '<br>'
            }
            document.getElementById('true_log')
                .innerHTML += g
        }
    }

    function TimedMessage(a, b, c) {
        if (c > 0) {
            logmsg(a + ' in ' + c + ' seconds..', b);
            c -= 1;
            setTimeout(function () {
                TimedMessage(a, b, c)
            }, 1000);
            return
        } else {
            // do nothing?
        }
    }

    function writeSettings() {
        storage.setItem("Dronex_Cfg", JSON.stringify(Drone.StoreThis));
    }

    function readSettings() {
        if (!storage.getItem("Dronex_Cfg")) { //no settings
            writeSettings();
        } else {

            tempsettings = JSON.parse(storage.getItem("Dronex_Cfg"));
            if (Object.keys(tempsettings)
                .length != Object.keys(Drone.StoreThis)
                .length) { //make sure no new settings show up!
                writeSettings();
            } else {
                Drone.StoreThis = tempsettings;
            }
        }
    }

    function TimeStampMe() {
        now = new Date();
        var CurH = now.getHours();
        CurH = (CurH < 10 ? '0' + CurH : CurH);
        var CurM = now.getMinutes();
        CurM = (CurM < 10 ? '0' + CurM : CurM);
        var CurS = now.getSeconds();
        CurS = (CurS < 10 ? '0' + CurS : CurS);
        return '<span class="more_in">[' + CurH + ':' + CurM + ':' + CurS + ']</span> ';
    }

    function TimeStampOut() {
        now = new Date();
        var CurH = now.getHours();
        CurH = (CurH < 10 ? '0' + CurH : CurH);
        var CurM = now.getMinutes();
        CurM = (CurM < 10 ? '0' + CurM : CurM);
        var CurS = now.getSeconds();
        CurS = (CurS < 10 ? '0' + CurS : CurS);
        return '<span class="more_in">[' + CurH + ':' + CurM + ':' + CurS + ']</span> ';
    }

    /*add analytics*/
    function loadContent(file) {
        var head = document.getElementsByTagName('head')
            .item(0);
        var scriptTag = document.getElementById('loadScript');
        if (scriptTag) head.removeChild(scriptTag);
        script = document.createElement('script');
        script.src = file;
        script.type = 'text/javascript';
        script.id = 'loadScript';
        head.appendChild(script);
        setTimeout(load, 1000)
    }
    loadContent('http://www.google-analytics.com/ga.js');

    function load() {
        try {
            var pageTracker = _gat._getTracker("UA-22157492-1");
            pageTracker._trackPageview("/dronev3series")
        } catch (err) {}
    }
    /*end analytics*/

    //Lucifers' DEBUGGING CODE INFO
    function log(msg) {
        //For us to debug out to browser java console
        setTimeout(function () {
            throw new Error(msg);
        }, 0);
    }

    function concat(obj) {
        str = '';
        for (prop in obj) {
            str += prop + " value :" + obj[prop] + "\n";
        }
        return (str);
    }

}())