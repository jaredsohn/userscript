// ==UserScript==
// @name          Mhf3 charm table translation
// @author	  Jason Marcotrigiano
// @namespace
// @description   Translates http://hore.mokoaki.net/p6 from Japanese to English
// @include       http://hore.mokoaki.net/*
// @include       http://mhp3omamori.appspot.com/*
// ==/UserScript==
// Email: jmarcotr@nyit.edu

english = ["Fate", "Backpacking", "Guard Up", "Guard", "Evade Dist", "Evasion", "Rec Speed",
    "Rec Level", "ClustS Add", "Protection", "Thundr Atk", "ThunderRes", "Huntsman", "Perception", "PierceS Up",
    "PierceSAdd", "Stun", "Whim", "PowerCAdd", "Will Recov", "Sharpness", "Gluttony", "Sense", "FatigueAtk",
    "FatigeCAdd", "Fencing", "Wide Area", "LastingPwr", "Antiseptic", "Attack", "HiSpdGathr", "SpeedSetup", "Ice Atk",
    "Ice Res", "Dungmaster", "Gathering", "PelletS Up", "PelletSAdd", "CutterSAdd", "Slam", "Eating", "Sleep",
    "SleepCAdd", "Stamina", "Precision", "ClsRngCAdd", "Psychic", "Loading", "Reload Spd", "Rapid Fire", "Elemental",
    "Blight Res", "Potential", "Cold Res", "Constitutn", "Heat Res", "Quake Res", "Mud/Snow", "Fortitude", "Health",
    "Artisan", "Expert", "FastCharge", "HearProtct", "Shot Mix", "Combo Rate", "Debilitate", "NormalS Up", "NormalSAdd",
    "Sharpener", "Poison", "Status", "PoisonCAdd", "Anti-Theft", "Sheathe", "Carving", "BombStrUp", "Crit Draw",
    "PunishDraw", "Hunger", "Recoil", "Fire Atk", "Fire Res", "WindPress", "Flute", "Defense", "Gunnery", "Rewards",
    "Awaken", "Paralysis", "ParalyCAdd", "Water Atk", "Water Res", "Dragon Atk", "Dragon Res", "Crag S Add","Carving"];

japanese = ["運気", "運搬", "ガード強化", "ガード性能", "回避距離", "回避性能", "回復速度", "回復量", "拡散弾追加", "加護",
    "雷属性攻撃", "雷耐性", "狩人", "観察眼", "貫通弾強化", "貫通弾追加", "気絶", "気まぐれ", "強撃瓶追加", "気力回復",
    "斬れ味", "食いしん坊", "気配", "減気攻撃", "減気瓶追加", "剣術", "広域", "効果持続", "抗菌", "攻撃", "高速収集",
    "高速設置", "氷属性攻撃", "氷耐性", "こやし", "採取", "散弾強化", "散弾追加", "斬裂弾追加", "重撃", "食事", "睡眠",
    "睡眠瓶追加", "スタミナ", "精密射撃", "接撃瓶追加", "千里眼", "装填数", "装填速度", "速射", "属性攻撃", "属性耐性",
    "底力", "耐寒", "体術", "耐暑", "耐震", "耐泥耐雪", "対防御DOWN", "体力", "匠", "達人", "溜め短縮", "聴覚保護",
    "調合数", "調合成功率", "痛撃", "通常弾強化", "通常弾追加", "研ぎ師", "毒", "特殊攻撃", "毒瓶追加", "盗み無効", "納刀",
    "剥ぎ取り", "爆弾強化", "抜刀会心", "抜刀減気", "腹減り", "反動", "火属性攻撃", "火耐性", "風圧", "笛", "防御", "砲術",
    "捕獲", "本気", "麻痺", "麻痺瓶追加", "水属性攻撃", "水耐性", "龍属性攻撃", "龍耐性", "榴弾追加","剥ぎとり"];

translate();

function replaceText(node, japanese, english) {
    return node.innerHTML = node.innerHTML.replace(japanese, english);
}

function getTextContent(node, attributeName) {
    try {
        return node.attributes.getNamedItem(attributeName).textContent;
    } catch(NaN) {
        return "@@@";
    }
}

function omamori() {
    var node;
    var omamoriInnerHtml;
    var nodeTextContent;
    var selectNodes = document.getElementsByTagName("select");
    for (var i = 0; i < selectNodes.length; i++) {
        node = selectNodes.item(i);
        nodeTextContent = getTextContent(node, "class");
        if (node != null && nodeTextContent == "table_search_s1") {
              for (var j = 0; j < japanese.length; j++) {
                replaceText(node, japanese[j], english[j]);
            }
            omamoriInnerHtml=node.innerHTML;

        } else if (node != null && nodeTextContent == "table_search_s2") {
            node.innerHTML = omamoriInnerHtml;
        }

    }

}

function p6DivNodes() {
    var node;
    var divNodes = document.getElementsByTagName("div");
    for (var i = 0; i < divNodes.length; i++) {
        node = divNodes.item(i);
        if (node != null && getTextContent(node, "id") == "message") {
            replaceText(node, "現在のテーブルは", "You are probably on table ");
        }
    }

}

function p6TdNodes() {
    var node;
    var tdNodes = document.getElementsByTagName("td");
    for (var i = 0; i < 7; i++) {
        node = tdNodes.item(i);
        replaceText(node, "護石種類", "Charm Type");
        replaceText(node, "スキル名１", "1st Skill Name");
        replaceText(node, "スキル数１", "1st Skill Value")
        replaceText(node, "スキル名２", "2nd Skill Name");
        replaceText(node, "スキル数２", "2nd Skill Value");
        replaceText(node, "スロット数", "Slots");
        replaceText(node, "メッセージ", "Result");
    }
}


function skillSelectNodes() {
    var node;
    var skillInnerHtml;
    var nodeTextContent;
    var selectNodes = document.getElementsByTagName("select");
    for (var i = 0; i < selectNodes.length; i++) {
        node = selectNodes.item(i);
        nodeTextContent = getTextContent(node, "name");
        if (node != null && nodeTextContent == "skill_1_id") {
              for (var j = 0; j < japanese.length; j++) {
                replaceText(node, japanese[j], english[j]);
            }
            skillInnerHtml = '<option value="" selected="selected">指定なし</option>' + replaceText(node, 'selected="selected"', "");
        } else if (node != null && nodeTextContent != "skill_1_id" && nodeTextContent.match(/skill_\d_id/)) {
            node.innerHTML = skillInnerHtml;
        }

    }

}


function p6SelectNodes() {
    var node;
    var skillInnerHtml;
    var goishiInnerHtml;
    var selectNodes = document.getElementsByTagName("select");
    for (var i = 0; i < selectNodes.length; i++) {
        node = selectNodes.item(i);
        if (node != null && getTextContent(node, "name") == "goishi_id_1") {
            replaceText(node, "龍の護石", "Dragon Talisman");
            replaceText(node, "王の護石", "King Talisman");
            replaceText(node, "女王の護石", "Queen Talisman");
            replaceText(node, "城塞の護石", "Fort Talisman");
            replaceText(node, "騎士の護石", "Knight Talisman");
            replaceText(node, "闘士の護石", "Warrior Talisman");
            replaceText(node, "兵士の護石", "Soldier Talisman");
            goishiInnerHtml = node.innerHTML;
        }
        else if (node != null && (getTextContent(node, "name").match(/goishi_id_[2-6]/))) {
            node.innerHTML = goishiInnerHtml;
        }
        else if (node != null && getTextContent(node, "name") == ("skill_1_id_1" || "skill_1_id")) {
              for (var j = 0; j < japanese.length; j++) {
                replaceText(node, japanese[j], english[j]);
            }
            skillInnerHtml = node.innerHTML;
        }
        else if (node != null && getTextContent(node, "name") != "skill_1_id_1"
                && (getTextContent(node, "name").match(/skill_[1-2]_id_[1-6]/))) {
            node.innerHTML = skillInnerHtml;
        }
    }
}

function translate() {
    if (location.href.match(/http:\/\/hore.mokoaki.net\/skill*/)) {
        skillSelectNodes();
    } else if (location.href.match(/http:\/\/hore.mokoaki.net\/p6*/)){
        p6DivNodes();
        p6TdNodes();
        p6SelectNodes();
    } else if (location.href.match(/http:\/\/mhp3omamori.appspot.com\/*/)) {
        omamori();
}

}
