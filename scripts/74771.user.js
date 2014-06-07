// ==UserScript==
// @name           popo paffer
// @namespace      Hans Goedegebuure
// @include        http://www*.camorraworld.nl/crime/popo.php
// ==/UserScript==
var doen, popo, doen2;

container = document.getElementById("notice_container");

div = document.createElement("div");
div.innerHTML = "<div class=\"melding\">Popo rang 1: <input type=\"text\" id=\"popo1\" value=\"" + GM_getValue("popo1") + "\" /><br>Popo rang 2: <input type=\"text\" id=\"popo2\" value=\"" + GM_getValue("popo2") + "\" /><br>Popo rang 3: <input type=\"text\" id=\"popo3\" value=\"" + GM_getValue("popo3") + "\" /><br>Popo rang 4: <input type=\"text\" id=\"popo4\" value=\"" + GM_getValue("popo4") + "\" /><br>Eigen popo: &nbsp;<input type=\"text\" id=\"eigenpopo\" value=\"" + GM_getValue("eigenpopo") + "\" /><br>Laatste popo: " + GM_getValue("laatstepopo") + " (<a id=\"reset\">reset</a>)</div><div class=\"clear\"></div>";
div.className = "notice_group";

if (document.getElementById("notice0")){
    if (document.getElementById("notice0").innerHTML.search("Je moet nog wachten met Popo Paffen!") == -1){
        doen2 = true;
    }
}
if (container){
    if (container.innerHTML == ""){
        doen2 = true;
    }
}
if (container) {
    container.appendChild(div);

    popo1 = document.getElementById("popo1");
    popo2 = document.getElementById("popo2");
    popo3 = document.getElementById("popo3");
    popo4 = document.getElementById("popo4");
    eigenpopo = document.getElementById("eigenpopo");
    resetlink = document.getElementById("reset");

    popo1.addEventListener("keyup", opslaan, false);
    popo2.addEventListener("keyup", opslaan, false);
    popo3.addEventListener("keyup", opslaan, false);
    popo4.addEventListener("keyup", opslaan, false);
    eigenpopo.addEventListener("keyup", opslaan, false);
    resetlink.addEventListener("click", resetten, false);
}
if (doen2) {

    smalls = document.getElementsByTagName("small");
    i = 0;
    if (GM_getValue("gepaftepopos")) {
        gepaftepopos = GM_getValue("gepaftepopos").split(",");
    } else {
        gepaftepopos = new Array;
    }
    while (smalls[i]) {
        if (GM_getValue("laatstepopo")) {
            if (smalls[i].innerHTML == GM_getValue("laatstepopo")) {
                i = i + 2;
                doen = true;
            }
        } 
        else {
            doen = true;
        }
        if (doen == true) {
            gedaan = false;
            if (smalls[i].innerHTML == (GM_getValue("popo1")) || (smalls[i].innerHTML == GM_getValue("popo2")) || (smalls[i].innerHTML == GM_getValue("popo3")) || (smalls[i].innerHTML == GM_getValue("popo4"))) {
                j = 0;
                while (gepaftepopos[j]) {
                    if (gepaftepopos[j] == smalls[i - 1].innerHTML) {
                        gedaan = true;
                    }
                    j++;
                }
                if (!gedaan) {
                    popo = smalls[i - 1].innerHTML;
                    doen = "nee";
                    gepaftepopos[gepaftepopos.length] = popo;
                    GM_setValue("gepaftepopos", gepaftepopos.toString());
                    GM_setValue("laatstepopo", popo);
                }
            }
        }
        i++;
    }

    if (popo) {
        document.getElementsByName("badge")[0].value = popo;
        document.getElementsByName("wapen")[0].value = 6;
        document.getElementById("kogels").value = 1;
        window.location.href = "javascript:HtmlBlockShow('PafPopo');";
    }
}

function opslaan() {
    GM_setValue("popo1", popo1.value.toString());
    GM_setValue("popo2", popo2.value.toString());
    GM_setValue("popo3", popo3.value.toString());
    GM_setValue("popo4", popo4.value.toString());
    if (eigenpopo.value.length == 6) {
        GM_setValue("eigenpopo", eigenpopo.value.toString());
        gepaftepopos[gepaftepopos.length] = eigenpopo.value.toString();
        GM_setValue("gepaftepopos", gepaftepopos.toString());
        if (eigenpopo.value == popo) {
            window.location.reload(false);
            document.getElementsByName("badge")[0].value = "";
        }
    }
}

function resetten() {
    GM_deleteValue("laatstepopo");
    window.location.reload(false);
}