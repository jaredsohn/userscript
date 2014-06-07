// ==UserScript==
// @name          Ebul 
// @description   Just pure ebil
// @include       http://apps.facebook.com/ability/*
// @include       http://apps.new.facebook.com/ability/*
//
// ==/UserScript==    


function my_updateStats() {
        var a6568019289_ajax = new a6568019289_Ajax();
        a6568019289_ajax.responseType = a6568019289_Ajax.JSON;
        a6568019289_ajax.ondone = function(a6568019289_data) {
	    if(a6568019289_data != null) { 
		    if(a6568019289_data.koFromId != null) {
			a6568019289_document.setLocation("http://apps.facebook.com/ability/");
			return;
		    }
		    if(a6568019289_data.wonReason != null) {
			a6568019289_wonFight(a6568019289_data.wonReason, a6568019289_data.expGained);
			return;
		    }
		    if(a6568019289_document.getElementById("hp4799950") != null) {
			a6568019289_document.getElementById("hp4799950").setTextValue(a6568019289_data.currentHP);
			a6568019289_document.getElementById("maxHP4799950").setTextValue(a6568019289_data.maxHP);
			if(a6568019289_document.getElementById("hpBg4799950") != null) {
			    a6568019289_document.getElementById("hpBg4799950").setStyle("width", a6568019289_data.hpBarWidth + "px");
			}
		    }
		    if(a6568019289_document.getElementById("ep4799950") != null) {
			a6568019289_document.getElementById("ep4799950").setTextValue(a6568019289_data.currentEP);
			a6568019289_document.getElementById("maxEP4799950").setTextValue(a6568019289_data.maxEP);
			if(a6568019289_document.getElementById("epBg4799950") != null) {
			    a6568019289_document.getElementById("epBg4799950").setStyle("width", a6568019289_data.epBarWidth + "px");
			}
		    }
		    if(a6568019289_document.getElementById("level4799950") != null) {
			a6568019289_document.getElementById("level4799950").setTextValue(a6568019289_data.level);
		    }
		    if(a6568019289_document.getElementById("levelExpBg4799950") != null) {
			a6568019289_document.getElementById("levelExpBg4799950").setStyle("width", a6568019289_data.levelExpBarWidth + "px");
		    }
		    if(a6568019289_data.fbml_feed != null) {
			a6568019289_document.getElementById("actionFeed").setInnerFBML(a6568019289_data.fbml_feed);
		    }
            } 

            a6568019289_setTimeout(function() { my_updateStats(); }, 2500);
            
        }
        a6568019289_ajax.onerror = function() {
            
            a6568019289_setTimeout(function() { my_updateStats(); }, 2500);
            
        }
        a6568019289_ajax.post("http://74.201.93.118/ability/jGetInfo", { "feedFilter" : "ACTRECV", "hideResponseLinks" : "true" });
    }
    
 function my_refreshFightBoxContent() {
        if(a6568019289_hiddenFightBox) {
            return false;
        }
        var a6568019289_ajax = new a6568019289_Ajax();
        a6568019289_ajax.responseType = a6568019289_Ajax.FBML;
        a6568019289_ajax.ondone = function(a6568019289_data) {
        a6568019289_document.getElementById("fightBoxContent").setInnerFBML(a6568019289_data);
        /*var allAnchors = a6568019289_document.getRootElement().getElementsByTagName('A');
        for (var i=0; i<allAnchors.length; i++) {
           var anchor = allAnchors[i];
           anchor.addEventListener('mouseover', function(event){ document.title=event.target.getParentNode().getHref(); }, false);
        } */
        a6568019289_setTimeout(function() { my_refreshFightBoxContent(); }, 2000);
            
        }
        a6568019289_ajax.onerror = function() {
            a6568019289_document.getElementById("fightBoxContent").setInnerFBML(a6568019289_fightFail);
        }
        a6568019289_ajax.post("http://74.201.93.118/ability/hFight", {});
    }

function my_goTo(a6568019289_locId, a6568019289_locImageId, a6568019289_noRefresh, a6568019289_travelMethod) {
        var a6568019289_ajax = new a6568019289_Ajax();
        a6568019289_ajax.responseType = a6568019289_Ajax.JSON;
        a6568019289_ajax.ondone = function(a6568019289_data) {
            if(a6568019289_data.travelNow == "true") {
                if(a6568019289_noRefresh) {
                    if(a6568019289_document.getElementById("fightBoxLoc") != null) {
                        a6568019289_document.getElementById("fightBoxLoc").setTextValue(a6568019289_data.newLoc);
                    }
                    a6568019289_document.getElementById("worldCanvas").setStyle("background", "url('http://mha.static.zynga.com/ability/image/646x700/" + a6568019289_locImageId + "') no-repeat");
                    var a6568019289_ajax = new a6568019289_Ajax();
                    a6568019289_ajax.responseType = a6568019289_Ajax.FBML;
                    a6568019289_ajax.ondone = function(a6568019289_data) {
                        var leftNavContent = a6568019289_document.getElementById("leftNavContent");
                        if(leftNavContent != null ){
                           leftNavContent.setStyle("display", "block");
                           //a6568019289_document.getElementById("leftNavLoading").setStyle("display", "none");
                           leftNavContent.setInnerFBML(a6568019289_data);
                        }
                    }
                    a6568019289_ajax.onerror = function() {
                        //a6568019289_document.getElementById("leftNavContent").setStyle("display", "block");
                        //a6568019289_document.getElementById("leftNavLoading").setStyle("display", "none");
                        //a6568019289_document.getElementById("leftNavContent").setInnerFBML(a6568019289_goFail);
                    }
                    //a6568019289_ajax.post("http://74.201.93.118/ability/hLeftNav", {});
                    if(a6568019289_data.buyItems == "true") {
                        a6568019289_openStoreBox();
                    }
                    if(a6568019289_data.goOutsideCity == "true") {
                        //a6568019289_openGoBox(true);
                    }
                } else {
                    if(a6568019289_data.flyingAbility == "true") {
                        //a6568019289_document.setLocation("http://apps.facebook.com/ability/traveling?flyingAbility=true&travelingTime=5");
                    } else if(a6568019289_data.teleportationAbility == "true") {
                        //a6568019289_document.setLocation("http://apps.facebook.com/ability/");
                    } else if(a6568019289_data.heroesAir == "true") {
                        //a6568019289_document.setLocation("http://apps.facebook.com/ability/traveling?travelingTime=15");
                    } else {
                        //a6568019289_document.setLocation("http://apps.facebook.com/ability/?showLocationBox=true");
                    }
                }
            } else if(a6568019289_data.notEnoughCR == "true") {
                a6568019289_document.getElementById("cannotGoMsg").setStyle("display", "block");
                a6568019289_document.getElementById("goMain").setStyle("display", "none");
                a6568019289_document.getElementById("cannotGoMsg").setTextValue("You do not have enough CR to travel there.");
            } else if(a6568019289_data.notEnoughEP == "true") {
                a6568019289_document.getElementById("cannotGoMsg").setStyle("display", "block");
                a6568019289_document.getElementById("goMain").setStyle("display", "none");
                a6568019289_document.getElementById("cannotGoMsg").setTextValue("You do not have enough energy to travel there.");
            } else if(a6568019289_data.minLevel > 0) {
                a6568019289_document.getElementById("cannotGoMsg").setStyle("display", "block");
                a6568019289_document.getElementById("goMain").setStyle("display", "none");
                a6568019289_document.getElementById("cannotGoMsg").setTextValue("You must be level " + a6568019289_data.minLevel + " or above to travel there.");
            } else if(a6568019289_data.fbml_cannotMove1v1Msg != null) {
                a6568019289_openGoBox(false, a6568019289_locId);
                a6568019289_document.getElementById("cannotGoMsg").setStyle("display", "block");
                a6568019289_document.getElementById("goMain").setStyle("display", "none");
                a6568019289_document.getElementById("cannotGoMsg").setInnerFBML(a6568019289_data.fbml_cannotMove1v1Msg);
            } else if(a6568019289_data.fbml_cannotMoveStatusMsg != null) {
                //a6568019289_openGoBox(false, a6568019289_locId);
                //a6568019289_document.getElementById("cannotGoMsg").setStyle("display", "block");
                //a6568019289_document.getElementById("goMain").setStyle("display", "none");
                //a6568019289_document.getElementById("cannotGoMsg").setInnerFBML(a6568019289_data.fbml_cannotMoveStatusMsg);
                a6568019289_document.title="Some jerk paralyze or stunn";
            } else if(a6568019289_data.outsideCity == "true") {
                //a6568019289_openGoBox(true, a6568019289_locId);
                a6568019289_goTo(a6568019289_locId, a6568019289_locImageId, a6568019289_noRefresh, 'useTeleportationAbility'); 
            }
            if(a6568019289_data.travelNow != "true" && a6568019289_noRefresh) {
                //a6568019289_document.getElementById("leftNavContent").setStyle("display", "block");
                //a6568019289_document.getElementById("leftNavLoading").setStyle("display", "none");
            }
        }
        a6568019289_ajax.onerror = function() {
            if(a6568019289_noRefresh) {
                //a6568019289_document.getElementById("leftNavContent").setInnerFBML(a6568019289_goFail);
            } else {
                a6568019289_openGoBox(false, a6568019289_locId);
                a6568019289_document.getElementById("cannotGoMsg").setStyle("display", "block");
                a6568019289_document.getElementById("goMain").setStyle("display", "none");
                a6568019289_document.getElementById("cannotGoMsg").setInnerFBML(a6568019289_goFail);
            }
        }
        if(a6568019289_travelMethod == null) {
            a6568019289_travelMethod = "walk";
        }
        a6568019289_ajax.post("http://74.201.93.118/ability/jGo?destLocationId=" + a6568019289_locId + "&" + a6568019289_travelMethod + "=true");
    }
    

function my_useAbilityAction(a6568019289_actionShortName, a6568019289_actionCooldownMs, a6568019289_targetId, a6568019289_usingButtons) {
        var a6568019289_ajax = new a6568019289_Ajax();
        a6568019289_ajax.responseType = a6568019289_Ajax.JSON;
        
        a6568019289_ajax.ondone = function(a6568019289_data) {
            if(a6568019289_data.koFromId != null) {
                a6568019289_document.setLocation("http://apps.facebook.com/ability/?koed=true");
                return;
            }
            if(a6568019289_data.redirectToHome != null && a6568019289_data.redirectToHome == "true") {
                a6568019289_document.setLocation("http://apps.facebook.com/ability/");
                return;
            }
            if(a6568019289_document.getElementById("useAbilityRespBox") != null) {
                a6568019289_hidingInc++;
                var a6568019289_temp = a6568019289_hidingInc;
                a6568019289_document.getElementById("useAbilityRespBox").setStyle("display", "block");
                a6568019289_setTimeout(function() { a6568019289_hideUseAbilityRespBox(a6568019289_temp); }, 1000);
            }
            if(!a6568019289_usingButtons) {
               // a6568019289_changeCooldownAllActions(a6568019289_targetId, true);
            }
            //
            //
            //
            //
            var a6568019289_p = a6568019289_document.getElementById('useAbilityResp' + a6568019289_targetId);
            a6568019289_p.setInnerFBML(a6568019289_data.fbml_useAbilityResp);
            if(!a6568019289_usingButtons) {
                
            }
            a6568019289_useAbilityCode = a6568019289_data.useAbilityCode;
            if(a6568019289_document.getElementById("hp4799950") != null) {
                a6568019289_document.getElementById("hp4799950").setTextValue(a6568019289_data.currentHP);
                a6568019289_document.getElementById("maxHP4799950").setTextValue(a6568019289_data.maxHP);
                if(a6568019289_document.getElementById("hpBg4799950") != null) {
                    a6568019289_document.getElementById("hpBg4799950").setStyle("width", a6568019289_data.hpBarWidth + "px");
                }
            }
            if(a6568019289_document.getElementById("ep4799950") != null) {
                a6568019289_document.getElementById("ep4799950").setTextValue(a6568019289_data.currentEP);
                a6568019289_document.getElementById("maxEP4799950").setTextValue(a6568019289_data.maxEP);
                if(a6568019289_document.getElementById("epBg4799950") != null) {
                    a6568019289_document.getElementById("epBg4799950").setStyle("width", a6568019289_data.epBarWidth + "px");
                }
            }
            if(a6568019289_data.targetHide == "true") {
                if(a6568019289_document.getElementById("aboutChar" + a6568019289_targetId) != null) {
                    a6568019289_document.getElementById("aboutChar" + a6568019289_targetId).setStyle("display", "none");
                }
            }
            if(a6568019289_document.getElementById("level" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("level" + a6568019289_targetId).setTextValue(a6568019289_data.targetLevel);
            }
            if(a6568019289_document.getElementById("hp" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("hp" + a6568019289_targetId).setTextValue(a6568019289_data.targetHP);
            }
            if(a6568019289_document.getElementById("maxHP" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("maxHP" + a6568019289_targetId).setTextValue(a6568019289_data.targetMaxHP);
            }
            if(a6568019289_document.getElementById("ep" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("ep" + a6568019289_targetId).setTextValue(a6568019289_data.targetEP);
            }
            if(a6568019289_document.getElementById("maxEP" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("maxEP" + a6568019289_targetId).setTextValue(a6568019289_data.targetMaxEP);
            }
            if(a6568019289_document.getElementById("hpBg" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("hpBg" + a6568019289_targetId).setStyle("width", a6568019289_data.targetHPBarWidth + "px");
            }
            if(a6568019289_document.getElementById("epBg" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("epBg" + a6568019289_targetId).setStyle("width", a6568019289_data.targetEPBarWidth + "px");
            }
            if(a6568019289_document.getElementById("level4799950") != null) {
                a6568019289_document.getElementById("level4799950").setTextValue(a6568019289_data.level);
            }
            if(a6568019289_document.getElementById("levelExpBg4799950") != null) {
                a6568019289_document.getElementById("levelExpBg4799950").setStyle("width", a6568019289_data.levelExpBarWidth + "px");
            }
            if(a6568019289_document.getElementById("personStatus" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("personStatus" + a6568019289_targetId).setInnerFBML(a6568019289_data.fbml_targetStatus);
            }
            if(a6568019289_document.getElementById("displayLoc" + a6568019289_targetId) != null) {
                a6568019289_document.getElementById("displayLoc" + a6568019289_targetId).setInnerFBML(a6568019289_data.fbml_targetDisplayLoc);
            }

            if(a6568019289_data.targetUnavailable == "true") {
                if(a6568019289_document.getElementById("charPic" + a6568019289_targetId) != null) {
                    a6568019289_document.getElementById("charPic" + a6568019289_targetId).setClassName("invalidTarget");
                }
            }
             /**/
            a6568019289_setTimeout(function() { a6568019289_clearCooldown(a6568019289_actionShortName, a6568019289_usingButtons); }, a6568019289_actionCooldownMs - 50);
        }
        a6568019289_ajax.onerror = function() {
            var a6568019289_p = a6568019289_document.getElementById('useAbilityResp' + a6568019289_targetId);
            if(a6568019289_usingButtons) {
                a6568019289_p.setInnerFBML(a6568019289_fbProblemsButtons);
            } else {
                a6568019289_p.setInnerFBML(a6568019289_fbProblems);
                
            }
            a6568019289_clearCooldown(a6568019289_actionShortName, a6568019289_usingButtons);
        }
        if(!a6568019289_usingButtons) {
            
        } else {
             a6568019289_document.getElementById("actionIconImg" + a6568019289_actionShortName).setStyle("display", "none");
             a6568019289_document.getElementById("actionIconImgCooldown" + a6568019289_actionShortName).setStyle("display", "block");
        }
        //
        //
        //
        //
        //
        a6568019289_ajax.post("http://74.201.93.118/ability/jUse", { "hideSurroundingTags" : "true", "targetUserId" : a6568019289_targetId, "selectedAction" : a6568019289_actionShortName, "notificationType" : "EMAIL", "useAbilityCode" : a6568019289_useAbilityCode,
        "fb_sig_friends" : "529434146,584870308,586779076,652508245,659675029,692574238,1008481972,1019566816,1087035650,1109144997,1568965419"});
    }


