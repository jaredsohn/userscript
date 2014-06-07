// ==UserScript==
// @name           facebook colour changer
// @namespace      znerp
// @description    Gives the option of changing the facebook colour scheme!
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

var logo =      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAAAyCAYAAAByFRjxAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0"+
                "U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAYSSURBVHja7Jx9aFV1GMfv3d2b23KGuTAro3ctS%2F%2BxHCQ1ar3gYlJp"+
                "JdX6I3uVVpQWQSjZMAgkk8qUCqKsLCrCQQUmmSQVjF4xbWZbU1ouy81td9u9t%2B%2BPvheens4999yxtXPd88CHOuf3O7%2B3%2"+
                "B5zn7ayiqVQqYmIipcCOwMSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsSUwsTElMLElMLElMLElMLE"+
                "lMLElMJkDKRwmM9dCBaC00CMyrUFvBeSfbk1HQ%2FOAL3g2xCsqRicAM4Ge8CB0GqF%2B%2B8%2BcqQedIGEYtUwxhoNZoOdoB0M"+
                "gvUhWNPtoEWcW31IzsqTXC1FOVgNJoXY%2Bp0ELhbXiRCs6TxwQcjWNGLu43SSli6wGRwF20OypyF1nQzBmgaO5ZiiApSI62Zwv4"+
                "Vm4zv76FHXR0Z4PdFR2GN8lMcft9mH89MPM9uQUgPWgzLwKmgDjygT7lzLL%2BBz8JXH2LOZycyhJXLm%2FnfwPfgAfM1%2BlWAR"+
                "55xChT4EdoC3wG8Z1u58eRPnKQX9oIXr3a36VoNrwfnck%2Bu7F2wFH3mM7bKb68FcZjsuVmgH28A7oC%2FA2c4Ht4JBWuFvwDMu"+
                "Bwh79jHLI9vQNIA6n%2FZesAbExLgrQLfPM03sN5PRe6Z%2BraCafWsDrNVxkJlKhGtyc%2FX79H8FFIu1LwGdPv13gOns26Ta6n"+
                "i%2FEuxWbWOemYxk8Wo%2FONWnvYTW5kpe38A3uMxPZ2ny16nofVC5BWfBNrEWMBhwvVWgkf9%2BE1gBinz638L1O5kFXgCTffo7"+
                "q%2FNslmzDzXmWuH4%2BDLWeoO6jE6zl4S8U952J%2F4TFoj38gV%2FiD5bkIV%2BmNl7DAHWpmsO5gM94gJN58D%2BAGeAS0e8L"+
                "cDcj%2BqeFkp3DHyKuxj3Asfdx7nrRNpNncJt65l3uaw6VoVAoxlPgRqXMXzILc8Wpe0TKXgume6yph3MvE%2Feci30iH4tX2o0E"+
                "KQxdBOLKDJeDNnGvxef5xWrO5cqEy7alYJ66t1b0nwQ61Lwng33i3nfKTWwTbd10CW%2BLez08l0gGV3EN3WT6epD3mlW%2FJfla"+
                "vKrwcAlaTgRT2RanS0mIty3GcUrFM4eyuB0pd4EFdCtTAqwnotxOr6phlKjn%2FlLmXgewE5WVcOMdFtcdHgU%2FvYb7hIVLW8nX"+
                "8v3bh5dMoPlbRMUoyCH19UsVdfFpOvGSoizFqsIMa0mqtUbVd5Rs%2FWM57LVIKYQb68V8Ll75ifOPDwzXi%2BVQS3FxTKtHUFjA"+
                "FLMkS7UzmWWOpFpPkP65VFCdpfiQ1q6ANLIinDrWlOIqVTBaA36kK2lSP1ZcBV9%2BGYjO9d8ET%2Fr0r1XXCbXfCqWMfapPqbqu"+
                "8FhPXL35fu6i38NSbOQ%2Fr%2BY9pyA3h8WFjLT7kNH1BvrjavVmuTm7wa8sikUY5T%2FGQtQQs48ZjOpb%2BHalD78B%2FMQUOB"+
                "2fVNGlbPJISacy0j%2BO2UOVaOtiZuXigGm85%2BZdybd5rsp8DrNA16ZijCbu17nNO9X8rSqdLqBiuf1eLvb1OItkf%2BZb9qEj"+
                "%2B42ibbNqc5H9xx6f2d9g%2F2UBCkzp4lVzwIKUK3LN97gfz9C%2FkeMvDzj%2BOva%2FNGD%2FXSyMrcpQvHouw37zqngV9TCF"+
                "svASV%2BXlmsh%2FP7OXiP6vB%2Fw28yBjiSASC2gRt9KMR1hkylY02inc1vYANYUOxlkJD5eSXuPqyL%2F%2F2MYVx%2Bblm%2F"+
                "twZn%2BX2Nhe0fYpvwM8FPnn83qCBaMtNM0L6MNbRdDXQDPtikFnMrZI0kzv5zeECAPIK8AdjBmmsXqZoM%2FuZPzSyW8tL4NT6C"+
                "omiqzkCMd9n98%2BBkScsJju5ToW6crY3i4U6KjY70oW0twz53IeN8dBFuE2sCDl5Ge6wgQV%2FQ9RWHsU3MtnXVsdz3jMgs5ojv"+
                "%2FH3ah4e6NcuFcJt5I%2FujzEYhGdD2WIScoZE%2FRFMv8NQlT80EO0Tv0ZDrGY48q%2BQT5STeCzAwH7Fwur2e9xJjFxXlG2p9"+
                "TLmRLnO5hPSmEyDsT%2BmtvElMLElMLElMLElMLElMLk%2F5G%2FBRgAkYEYCh1zZUsAAAAASUVORK5CYII%3D";

var logo2 =     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAAAyCAYAAAByFRjxAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0"+
                "U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAZ4SURBVHja7FprbBRVFJ7dbXfbUqkGqKJRDKgIiII%2FUJuosdGiSWtKRK"+
                "gatf7wrRGf%2BAgNVmwwMTEqiaJETQw1gqYYg68fQESiEZMqRuVhFaktEalVHu1u2%2B16Tvw2OR5npzPLlm7xnORLd3bO3Hvuvd"+
                "%2Bc1zaUSqUcExMpISOFiZHCxEhhYqQwMVKYGClMjBQmRgoTI4WJkcLESGFipDAxUpgYKUyMFCZGCtsFEyOFiZHCxEhhYqQwMVKY"+
                "GClMRhEpziPMI5xOiBDChLWEdXmyLrbpBMIUQg%2Fh2zywKUoYTziLsJPQmbesYFIERC2hi5BUeDKLsYYDswhbCO2EfsKKPLDpFk"+
                "Kr2LfaPNkrVxQE5NAYwjLC8Xns%2FU4mXCiuk3lg0wzCuXlmU0YJSorJQFq6CG8RDhM25cmaBtT1YB7Y1DeacoqgpCglxMT1B4T7"+
                "LDU7tiQcUP%2BQuj6Q68R3GNaYGObx80EaRsJTcJx%2BGNWGlErCCkIJ4U3CHsKjyoVzaPmF8DnhK5exZ6GSmQ1PxO7%2Bd8J3hP"+
                "cJ30CvjLAAc04AofcTNhPWEH7LYDvH8ibMU0SIE1ph73alW0G4mnAO1sS6uwjrCZ%2B4jM3VzXzCHFQ7nCu0EzYQ3iX0%2BtjbSw"+
                "g3EfrhhbcRnucaICAh%2BG%2Fj0aw%2BZrpUGxr1hBqP%2Bz2E5YSIGHcx4aDHM03Qm47sPZNeG6ECulU%2BbGXsRaXiwCaeK%2B"+
                "6h%2FwYhKmy%2FgbDPQ38zYRJ0m9S9GnxfRtiu7gWpTBpccMTVRziHXmc34TSP%2BzF4m7m4vhZvcIkXZ%2BHyX1DZe78KC%2BzB"+
                "VqEX0O%2FT3nLCIny%2BjrCYUOihfyPsZ5lJeJkwzkOfvc6LQ1QbPOeZ4vqlAL2ehuEKJX7Dxz7Cc9j8eeJ7dvEb0SzaiQN%2BDQ"+
                "c2iE2%2BTC28EgnqbWoODgGfYQPHYeO%2FJ0wjXCz0viTciYz%2BWUGyqTiIhBq3E2P%2FhLlrxb3p2IOb1TMtWNdskKFAEOMZQp"+
                "0i81ZUYdycukuU7FWESS42HcLc94rvOMQ%2BlaMc4ohCiV9ScLx%2BCAclSfGpqj46ceBSLoBeeq7x6HdMFTrb8La6yUJlJx%2FY"+
                "1%2Fi8WpDCQbdQdy%2FfITwo9LmHcRKuC%2FF5itD%2FgXC9KCO5BL8Un08BpO2cN9wq5o3AA6THn6G8F78sxSC0JNYSj7woG0%2"+
                "BQNTGyKUl1SNByImEi7iUQUpJirgjGKRLP7B8i7Ei5g1CNsDLBhz2OCjs96oBi6rm%2FlLvXBzVWHSaP1y2uO1waftqGexSZ14Cw"+
                "ua4ysiJGgZM7KYb7WwBihAOUvl6lom4%2BTQLcpHCIZlVBBlsGla3SnogP%2FUiAtRYqQvBYr%2Fjc48YA5Bj28OFHOD7en20RFK"+
                "CXwnlMm0tSGEaJGRui2zk4xByDyh4%2F%2BkE6qOwpPoa3CwOL0BHO5tfJxlz3K3JJiitVw2g5YQdCSZM6rIRKvrwqEF3rv0142k"+
                "O%2FSl0n1XpLFRl7lU6Rui51sSeh3nyvcBF38RSv4u9V%2BK4aecxqJw8k1%2BFDZtcrEY8r1JvFcx4k%2FIqmmIMs%2Fwk0ogZQ"+
                "fUxDVt%2BKtyu9%2BfWEH1ECp%2FOTcoSUVS4l6URk%2BseheigX97pQWXUggXQw71K8zXNU5dONBt0elWM0Yb0cNm9X87epcjoM"+
                "YvF6LxfrakCT7M9jiRS7sYkODvUjJJDnq7cphDexWejHMsRALv8eR4dwrqgGmjPY0OLSE6hD19FtrR%2BChC3KliWAlnWoSlqQLM"+
                "o56lz0t8JbRl0S9o0o39MkOoPwCNY7ohK0eRVycYWy8ZJQ7eVK578%2Fs8eEfrNP%2Bx5ALuFHIj7Jvx5u3EGTaaim0RYRtjb56C"+
                "l0IM9KuoSUtI3LnH%2F%2Fsw03xy4abZ6C3f4XYmG7VM9iPvoZk7EZ3DBaC9dcjRjeJpK%2BerjpOrwpJUjUuuF5NkCXE8gr0A%2"+
                "BownhRzBFHCNiBv%2Fxby%2BuEUxEqxoqq5ADGfc%2F557ePPpEnLER4uQZNuhLcbxcEOizWuxSNNH7mbMzDc%2BxFE24lGlIsP8"+
                "NrJEH0P0Rf5zHC3XiW79Vgj1NZVBY5%2Be0j6L%2FjhcTbG4Lhbi3cMhy63MSoyM4HMuQkY5AT9DqZ%2FwchJA56AN4pnmEToxhX"+
                "6vr5kaoYz%2Fb51I8Krxl32ZOI2K90%2BEyplzMl9rc%2Fy0rEGQlSmPwPxEhhYqQwMVKYGClMjBQmRgqToyN%2FCzAAv%2FcWnn"+
                "YibmIAAAAASUVORK5CYII%3D";
            
var downImage = "data:image/gif;base64,R0lGODlhFAARAPcAAMTCxPz%2B%2FAAAFgAAAL4AhCAAxAAAFgAAABAAACAAAAAAAAAAAAAAQAAAxB"+
                "UAFgAAABIAAQAAAAAAAAAAAAAArwIA4AAAgAAAfAAARAMA5AAAEgAAAIgAT%2BIAGhIAgAAAfOkAAOUAAIEAAHwAAAAAAAAAAAEA"+
                "AAAAgFYAAwAAAAAAAAAAAJAAAOEAABIAAAAAADEAA5cAAJIAAHwAALAAgOIAABIAAAAAABgAkO4A5JAAEnwAAHAAFAUAupEATHwA"+
                "AP8oAv8CAP8AAP8AAG0A%2FwUA%2F5EA%2F3wA%2F4UAAecAAIEAAHwAAAAATgAAehUATAAAAGAAjwMApQAATAAAANgAkMsAHxcA"+
                "OwAAADAAE28A4RUATAAAAAA0AwAAAAAAAADAAH49TgAEEACRT8B8AAAAAQAAAAAAAAAAAP%2BgAP%2FjAP8SAP8AAP9sDP%2F7AP"+
                "%2BQAP98AABxAAD7AACQAAB8AAAAAQAAAAAAAAAAAAA9AwAEABWRAAB8AMA0AOIAABIAAADAgNJ8A%2BbjAIESAHwAADBFAG8AAB"+
                "UAAAAAAEr4B%2BP3AIESAHwAAMAYAHbuAFCQAAB8ADAAIG8AeQEAUAAAAGwCAAAAAAAAAAAAAPxTAOGBABIAAAAAAADYAADjAAAS"+
                "AAAAAPiFAPcrABKDAAB8ABgAyO4AI5AAO3wAAHAAAAUAAJEAAHwAAP8AzP8Aaf8ATP8AAG0pMAW3AJGSAHx8AEo8MPQAAIDwAHwA"+
                "AAA0SABk6xWDEgB8AAD%2F%2FwD%2F%2FwD%2F%2FwD%2F%2FzAAAG8AABUAAAAAAAC8BAHj5QASEgAAAAA0vgBkOwCDTAB8AFf4"+
                "5PT35IASEnwAAOgYd%2BPuEBKQTwB8ADAAGG%2B35RWSEgB8AFH%2FNAX%2FZJH%2Fg3z%2FfHg8uBMA5RXwEgAAAG00zgVk%2F5"+
                "GD%2F3x8fwAAiADl5QASEgAAAD3nPARkAJGD8Hx8ADSINABkZACDg8B8fAABPAAAAAAA8AAAAAAxUwAAgQAAAAAAAAAkAADkAAAS"+
                "AAAAAAAg6QB5zgBQRwAAACH5BAEAAAEALAAAAAAUABEABwg0AAMIHEiwoMGDCBMqXMiwocOBAAJEnCiRIUWKDS861BgxY8WOGys%"+
                "2BFAjyIcaRJUeqXMkwIAA7";


function submit() {
  node = document.getElementById("znerp");
  setup = {dark:node.getElementsByTagName("input")[0].value,
           light:node.getElementsByTagName("input")[1].value,
           top:node.getElementsByTagName("input")[2].value,
           tophover:node.getElementsByTagName("input")[3].value};
  GM_setValue("setup", uneval(setup));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function cancel() {
  node = document.getElementById("znerp");
  addStyle(eval(GM_getValue("setup",'({dark:"#3b5998", light:"#6d84b4", top:"", tophover:"" })')));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function setColours() {

  var setup = eval(GM_getValue("setup",'({dark:"#3b5998", light:"#6d84b4", top:"", tophover:"" })'));



  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "znerp");
  newDiv.setAttribute("style", "position: fixed; left: "+((window.innerWidth / 2) - 290)+"px; top: "+((window.innerHeight / 2) - 200)+"px; z-index: 1337; background: #fff; border: 2px solid #000; padding: 3px; width: 577px");
  newDiv.innerHTML += "<center><b><h2>Facebook Colour Changer<h2></b></center>";
  
  table = document.createElement("table");
  
  row0 = document.createElement("tr");
  column01 = document.createElement("td");
  column02 = document.createElement("td");
  column01.innerHTML = "<center>Dark Colour</center>";
  column02.innerHTML = "<center>Light Colour</center>";
  row0.appendChild(column01);
  row0.appendChild(column02);
  table.appendChild(row0);
  
  row1 = document.createElement("tr");
  column11 = document.createElement("td");
  column12 = document.createElement("td");
  darkDiv = document.createElement("div");
  darkDiv.setAttribute("id", "dark");
  lightDiv = document.createElement("div");
  lightDiv.setAttribute("id", "light");
  light = document.createElement("input");
  light.setAttribute("type", "text");
  light.setAttribute("class", "color");
  light.setAttribute("value", setup.light);
  lightDiv.appendChild(light);
  dark = document.createElement("input");
  dark.setAttribute("type", "text");
  dark.setAttribute("class", "color");
  dark.setAttribute("value", setup.dark);
  darkDiv.appendChild(dark);
  column11.appendChild(darkDiv);
  column12.appendChild(lightDiv);
  row1.appendChild(column11);
  row1.appendChild(column12);
  table.appendChild(row1);
  
  row2 = document.createElement("tr");
  column21 = document.createElement("td");
  column22 = document.createElement("td");
  column21.innerHTML = "New top logo URL:";
  column22.innerHTML = "Top logo hover URL:";
  topimage = document.createElement("input");
  topimage.type = 'text';
  topimage.value = setup.top;
  column21.appendChild(topimage);
  topimage2 = document.createElement("input");
  topimage2.type = 'text';
  topimage2.value = setup.tophover;
  column22.appendChild(topimage2);
  row2.appendChild(column21);
  row2.appendChild(column22);
  table.appendChild(row2);

  newDiv.appendChild(table);
  
  buttonInput = document.createElement("form");
  button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("value", "Cancel");
  button.addEventListener("click", cancel, false);
  button2 = document.createElement("input");
  button2.setAttribute("type", "button");
  button2.setAttribute("value", "Set!");
  button2.addEventListener("click", submit, false);
  buttonInput.appendChild(button2);
  buttonInput.appendChild(button);
  anotherDiv = document.createElement("div");
  anotherDiv.setAttribute("style", "float: right");
  anotherDiv.appendChild(buttonInput);
  newDiv.appendChild(anotherDiv);
  
  document.body.appendChild(newDiv);
  
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  oldDark='';
  oldLight='';
  oldTop = '';
  oldHover = '';
  inter = window.setInterval(function (){
    var darkcolor = document.getElementById("znerp").getElementsByTagName("input")[0].value;
    var lightcolour = document.getElementById("znerp").getElementsByTagName("input")[1].value;
    var top = document.getElementById("znerp").getElementsByTagName("input")[2].value;
    var tophover = document.getElementById("znerp").getElementsByTagName("input")[3].value;
    if(oldDark!=darkcolor || oldLight !=lightcolour || oldTop != top || oldHover != tophover) {
      addStyle({dark:darkcolor, light:lightcolour, top:top, tophover:tophover});
    }
    oldDark = darkcolor;
    oldLight = lightcolour;
    oldTop = top;
    oldHover = tophover;
  },1000);
  
  /** The following code is taken and slightly modified from code by Bob Ippolito <bob@redivi.com>.
   ** See somewhere in the middle of this code for the original and unmodified copyright notice.
   **/
  var CROSSHAIRS_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAACVBMVEUAAPD%2F%2F%2F8AAAAXuLmo"+
     "AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfWAxYAMBoYReiIAAAAHXRFWHRD"+
     "b21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAAhSURBVAiZY2RgULvFwMBILrWK4Q8LwzXGUBD1GsajzEwAP%2FoZVv"+
     "c4N8oAAAAASUVORK5CYII%3D";
  var HUE_SLIDER_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAADICAIAAADtOM9PAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAA"+
     "CXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMXAjE1EbdXmwAAAQlJREFUeNrtmlEOgkAMRBupy%2BL97wqsgnICPtSM7uR5gZ"+
     "fHTBtKzGeIfhmjjFQNnSZywsmeRPdwYp7ICaf%2B3yMcnx7dw%2BlH87SlirQXFWmRXZ9r%2BDk5klYaAYkdgdMJaWYb0T2cmNwT"+
     "UqN7dM8%2Bpy2uqptQRgrV8X6QqqHTRE40gu7RCPYeOeFk1r3CPNE95qk%2Fp12Wk%2Br8zGgy0gKpi0Y4Os3khBNOzBPdw%2BkP"+
     "Sbp5anSP7rnndLmrSIOMpPo7bGQNP6cpyOl9UiEnnOx3hKPTzdBppHs42e%2Fyyjzx9HiP%2BN5NqPr0kUM8VBe16ng%2FSKuh00"+
     "JOH5BmGanRCLqHEyS6hxPzRE44%2BZJeueFsJ8zY3KsAAAAASUVORK5CYII%3D";
  var HUE_SLIDER_ARROWS_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAALCAQAAABfL%2FyJAAAAAmJLR0QA%2F4ePzL8AAAAJcEhZcw"+
     "AACxMAAAsTAQCanBgAAAAHdElNRQfWAxYPFQ14OfqVAAAAnElEQVQoz63Suw2EMAwGYJ9Ss0BaBkCsAYtki6uRmAM2yRwREh0Sgc"+
     "hURj%2FNne5o7oEsV3bx2bJNI7hBBrocGTcjqEW%2FcRQHc4Ew4jj2Wwu6gVDCpzWg%2BhOp1uBTCcId9KzVCCl6FD8SRfQh1Y%2"+
     "FkjSEYuH3mpYP9Qtilm9ntry2cGALBYhCZkH9AcpkGOXfSn0ZhNyqXUvkbnS8%2BAP2Frl9tNFLoAAAAAElFTkSuQmCC";
  var SAT_VAL_SQUARE_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAAAAnNCSVQICFXsRgQAAAAZdEVYdFNvZn"+
     "R3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAsAUlEQVR42u1823IkOXakA0FWVXdLM6Oe1a5GL2u2L2u2%2F%2F99jE1mBAD3cx"+
     "yISFaP9NI21qQimRcWHH47CKpgx8fjvz19v3%2F186%2F47%2FjM13%2BD%2F5LfsvwJyJ%2BA%2FAnIn4D8CYhe4QqQ8tOfWW6%"+
     "2BoiwAKeYdiv6evHQf9MnnVaGflef39vXze31%2Brx%2F18%2Bv%2B9vi%2B7T8%2B3vZv%2B%2Ff9f3782%2F6f%2B%2F%2F7gw"+
     "C5eH35KYaUe5sAZf0brH8vA1eJcBPs9F0BOWAQQD4hOH6yPa8%2Bgfj83%2FsDim3%2F9eN9%2F%2FH43z8%2Bfn8A8n%2B%2FBM"+
     "jFfi9fkKz0GuBqt17Dfi5RfLTIZ5QJICW9Q6FPKcKJ0r%2B3qwbB8b9PZtQTkMaMbf%2F2AORt%2F%2B3j%2BwOOX%2Fb%2F%2FP"+
     "j7%2Fh%2F7%2F3kBECx070VOlbjkt5d3sd%2BxWHoja0VBC4AUgavIaxSC4zmlA3JcNUAOkXoyAw8YPg5mHIB8itX7%2Fi9PQH59"+
     "APL7%2Fr%2F2%2F30JCL4gQE8WlUuGFA8IPMBl%2FQ4f9Lqp4OTFffwMV47AslQYkJ394fh%2Bfj2BGCJVniJ1cOP98d%2BnWP3y"+
     "EKv3%2FV8%2FfpyA%2FG3%2F9%2F0fC0D2l%2FX8hkEX%2FxmT1xQnQPscJg%2FIECXnAIMh9BWWC0GWDnhOLiACUjsgjRmfgGyP"+
     "r98%2BPgF5wwDklwcg%2F%2Fj46%2F73B0duA1IuTX3FiRIASI861T9lsrg8lSGAdwAnOOO5ZYA29wfkzDTkaYjTU6p2ZkY5odi6"+
     "jdfuHW8PGD4B%2BcvJkP94APL7gyMeENwOixecKDYGFJOyyhyufIVirT4BgmjJLEP0Fc4f2tITBOwWHZDmGiRVOACpZOMHIBsD8v"+
     "GObydDfnkA8pf93x4cKVchtkxTVpnLEi4dIOT72CMKZr9BMe9QvD%2FsElZzU8BgBMuRfDchlowbDQKcSeqEpXeNjbyjAfL9BOQz"+
     "8D4AeYbeXx495F%2F3vz4gyYBgIh8CVtknmo%2Bl6yBLn75TmcpkMZ9dwiYoi8rGvkDpqF2BOTF%2BKsygJDX8oj43TxMpDbinWO"+
     "HwjsM9MiDfnwz5949%2F2f%2By%2F20NSJlkLpt4sLBky6kuZ6tISuJUYuxdQZBC6xCpAhNhB0CYuUXZBxeGSDV4tmDm9QnMIVZv"+
     "T35sT4a8PQD5%2FPr%2BkKxvJyCfDPkfD0A%2BOVKSd0xFxhe4Mk9SXnDgTb2Q05TIHydHH8q4woDsboxxfEYQpQHIrhB0IFAEGE"+
     "pSEnCbZNXeOIZ7tOZxBN7AkEcP%2BY5f9r9%2F%2FLZ%2FQnIPEHgBKzu8AFmGTX1hzgKz%2B4MzjMXGpEVg0qyZFyxW3LSHfWPU"+
     "PWEIhmtk7yhn0D2%2BPuzcAPIshvix%2F%2F4A5Lc5ICVlrhR7UzNugdKmItezoYOLMgD6MBOk3Y4xfGjdba1zJa%2F%2FFzqGDk"+
     "AaBCxVI1dhBN3GjMd31MSQh4egecghWe8EyK%2F7J0dKDrEh8ew3UlIIrZcTUqTq9hEtvwTYg1SlLs2Zqf8McfxX%2BqPBxKl3r1"+
     "0DvWtUsfGazfxp5y3uHg3kwRAwQz6L4ees9wd%2B%2F%2FhlBkhJNr4aUahwmd3%2Fod5hkxPLEpIcOWYguEb%2FvcajnRecnFLJ"+
     "O0082vhe4mQKHRDykBh0t715R2lVEAzIp71%2F3xmQT4Z8ewDyt4%2FPvv7bBSBY73cNumXCKWPXe%2FIKGg6WAJf0B5QkWcW4Rg"+
     "kD8RhlAQWgg8AiBZasYiSrnh5SaUhSUNOw5H0nhnxKFhiQT4Z8fwTeX54jlBUgMPa7MPViISyGPVGGkmvwdKlDWgykRUw9dIw9l7"+
     "yQo0CeQQPzYeqHP4TmIeORBywY7nF6CN46IMc4sXtIM3U8m%2FqDG7%2BdgPx1BkiZBV1oykqZCX5%2Fd8nDfLxtmwNSj1AIiBmj"+
     "d9OiS8AdYpVntcMrCp3tHS18DNFHK9fxSB%2BSNDNvcRfEkM%2Bv6JJ1eMg5XDwA%2BfYA5JhplVT6BJDixaoNrcPpRjE%2BM8Ai"+
     "XwgFsyDNXs1V2Q0wVPNKl1AZgyDMaiXmVkpZ45o4sc%2Bbx%2FbkD02t%2BonHWQhx5Ks2MtlwNPUfrRg%2Bv%2F72rIffHy39GK"+
     "EsASmToUay8dWUyXkHjf9mQjSCwDQzQYaB4GHgUeeIIQLT55U0DcicCqFxQIIu9KzjbOjNQ%2FZKKWvDKVm9hxBDBJBvJyA%2FIi"+
     "A2JWmuQjG920xXY67afXIqPONKpxEYuYiWdXAjXxUHCMp8ZrvL7HbnE7%2B6880JvQQ%2BzbyNScZpYD%2F5AM93W8qKPaQB8usJ"+
     "yDFCmQEyFSDLmmtuYNoi5Lyu7IsExdKFLFLEE5GzC9c4PAMyFgHGnAoyHuH%2B0WNvJQ854y4IkMfVN1MMP039De9nXz8A%2BR4B"+
     "8RCY0zfXIniuBC9nplXsdvQRXhPnVEWANpwwpxiZIRxs0SNtvDmhyHVVyUIEpMfdnY%2BkJGWhnYf8%2BHg%2FAXk3gCD2bQsIxd"+
     "6RsiY%2B8aFi1F5hgy2LFCZzWeULdY0CBE7AiBM3D%2FEMeMmiY9k%2BHqnkGsND6vAQjP5xpKwMyCiGD0Ae8BwMeTZ23AEEbhQe"+
     "rBnBonPD5jqHLEp6nhE4AZuneDKF1LszIIi5qkrvyHmKYAmStVHsbUD0w9p99I9PsTpS1kOyoIBsAsjZ2PGZtiaAGE5g5g%2BWG5"+
     "jYtwGAY68cp3pxigORIFnJLeAGhl2snntfbRydE72H7GOi%2BylZlU5AWhU8vr%2FJULGdhDxNHQOQ7WTIs6%2FvDZBPhnxjQIxI"+
     "wQ474E19UvJkyGLiLaxxA25Ky%2BVvz5I1GMLeUYU3o2lw9QP6nAq5k7NkVYKngsaJ%2FfyjNfVNAXma%2BycUDw%2FBdgLyft7q"+
     "cAASGJKyElzvJsOGHf%2BBu3khCEuGoh%2BgQlJSGg4O1sAZd%2FeHfTIWaYxBlKo2NoxVUCogjGQhjhOPwGtMHdsYv%2Fc7Fh8N"+
     "5WRIA%2BS3JyCOITCtAlaUXMdwxo3UMFjIYAYiu70Jh8Yi6TxDe4hhRkHu4o0Xw8BrP4rKQLRuzpLVGnq7Ge5tH6OTfjSFkyEnIM"+
     "8jXLSDqgbIr5eA7DIONFKTjN%2Fs%2FuAZYXjO7GIWmPE50mHrnscjEnCR5lS7ubGt%2F0wmuUiS9TTuqt08eYiYuktZgyHnucjn"+
     "jdYDkHcPSJauaPEy1IBpGeYAVfgSjJrf19t4irRIN%2BogBVxpHGlatXMRTIdP%2FacDiGbnlaSrYnhIMvUxy9pPhpzF8HkrKQ7J"+
     "%2BgTkGKF83qX1fgKCRWba4%2BldONuO53VI9Q7mfFt5wyIFc5LRuIA0uw2SVYQvAlY849i5i3c7l6DL8NRT0NrpeY%2B958%2Fe"+
     "nhb%2FJieF9cmNp6mj3US64WTI2Ud%2BPPv6eaCLb3cAKaEKFmRYSkpSiS%2BIzynh9eITKxsHi1wxklUHXzAGiMlDxsCkDUsQgi"+
     "6fl2P8qU3zkPMEBAtTP2%2F%2FOXrIEX%2B%2FPx1FATmPq14BpCB1DMuFC054z%2FBdo8sbGXZoFQxTlKxeAXe%2Bd6TnKklV6G"+
     "GW%2BdK4EE5Adh24H7I2TP3zPd732ENq7yGHkzAgxy0PDwfBXLKQjkxnpo7UIiYVMKatYvkxyVMBCEiUHR5SSNa0g3dguGk0a%2B"+
     "9iFcaI1ENYsuoJj8Te08wLhqlvx4khzth7pq1v558jHI29MeR5XJUAQUpJM0CQslPnTX6FDD6gyYmKHRBahTN1GYRgIll96SETXD"+
     "AEYXCoAZd6CMLAHeGMsHnIuDEO%2FL3F3vaXIQaQ%2FROSXz4z15cBUTPnrhEYVnLADaYee3ef2qJM4CkpXUnpa4NDFD%2Bt2osx"+
     "9fZ%2FyfQqSBVLVg09pN2JFc5DMFKWA6T19XbC%2FsaAlPidx4mYhNjJ1xBwEY6XELpFZ4izcQeERForWY09lKuEEyPgXjCkS9U5"+
     "y2qSdY4Ty2njBeohb03CDg85Je1bD7%2FHyeEGvuUhMGQFyAkEwh0ghkUTH4nwjJsSgDQilFGhgDUXKWaCdo10dY4TNeYahohUtT"+
     "5SRxuJsbd%2F5ZTVTP3o7d%2BojbSZVmPIjzUg5moGCIFWbsCjO9xbenxOtu9s6kOqQIbdzwLPYNuHJZAiGE0devJRd7k7cc8e0k"+
     "y930K6aw%2FpsRetjTRAvndA5pJl%2FWHs3ZTHjIcEi0dRw4%2BPBgmLnCBwMCl%2FbkgiztHPBNuA3QqXStYARAbuwUN6D4Hc04"+
     "tw5yIUkDbTOgDZnpIVAZmbt4iLadjzirfLXSHziDvhibuKix8hmEgW4jyX%2Fybw%2FKkwpKqpt1t%2BTqk6Y696CHj8%2FgnB8Z"+
     "0AOYfwvbE%2FAfkE5pCsNw%2FI7OvCI%2BZQuCtt35qriC%2FF%2FIwe1TYOCbqQPyKAzVXUxRGbB%2FGCDm2pofem3m2cTL2dhx"+
     "zfz7%2BgOvsIAXIw5Pib3OYlXwAkghJqHkpylHTFNyVAZrdYcSI%2FWoOpG8nS5hGuKg8XIUdRx9QKEZAaRidvF6Zez5A7CuLR1B"+
     "sw54Hu1wA5FzYtbx%2BEyJRpJlLJtjX28u6HDA4xy1Whk8sA8bRx8B9pgnJUY8%2BCIdJDKsZfSY3RSfOSt2DqDEib%2Bh5fWx%2"+
     "F5to9h%2FBIQuR9kNIbRsAHZ0enKQWBsWzLTghNi6to1gCBSRf%2FuSRjUeFPD6CQwZCpZjSFn7AUB0oaLqAGY1kMyIK0efg7jtx"+
     "kgIlIo0kN6yoK0iysIQCfigUUm6HLKQmJI39NYitTJE%2B4aH%2FQ1pixQN%2B%2FAkJkjAaKxFwkQAqb1kHeqh44h2wmIgkCcaH"+
     "3kYumFN1GybNcIS36LE4MZwESsBqDDJTCOZU3QHT0kMySa%2BVSyQD1EPQQtZdUzZbXwS%2BeHNNn6FK0vAJK4FAGZxtvElA8HR4"+
     "Jgz4NDgOZVoNE6dDgCEamzECKnqilDcEOyvgBIFcl63hN%2F3Bx0B5Bh24Ebkpmyh%2FBz2K5N60CZAJQYA%2FYJXwLRl77fURI4"+
     "gQQAlBPn40vJyh5Cpr5JU3%2Ba%2BlEQQbfN7Xo6chcQ2zr6M%2BGyEy10cosUarG09JS5pPyJkCVTl8pH0ytwqkKQrCo%2FreMs"+
     "HXQ3L7yHFDTvMID0gtgkq81%2B38jcZ4DAZaaZOMkEagKBFELEya0yJApYJb9xA0QEwx5Dki5VMN2cs1aMvSc3%2BrQ3jE7qPoB5"+
     "a7cBURt5SlVIWa2HnPfCdy9pDGnmPgFkzLJk13uwCKYC2zVCIZwxZOYhaUhCECTXSHkqDUeyhyRT30YbwRjDS1PvnGiAHE2d%2Fh"+
     "xhpKzOl36XFtrU96yJp5dkQEAnGBGQmVtgJkv8M3GHDmEBcQhhLBLESQSM09Ww84%2FkGaCBe%2BQGAVC6OJ3wEC8qar%2Bh%2Bi"+
     "lcfbjYZ1mdKScgBzM6IG9P7%2Bi3POzCkFPADCDnneyu4KFPcr2puyTlxiAwDMlJaogUWJxax1BO9OaBMN8FnXUMv6Alh2EID9zJ"+
     "1Luj9Nt%2FwLOswj2ETb3Pss4T9p3%2BSBoKyBl%2FLwEZxc6mLH6UBoWYSpbLVpkhMVedzxXR0gEi8UWZcjID2jwwUlZiSEXoId"+
     "jaiSGN3Qv6n3mi3%2BTQi6HE39M7hCGHl9wBxCSpBIjad1505kv%2Fc0zER0u%2BJv4UAfEOQ8azBheAGHRjypqaOoKZ95R18sX0"+
     "kHO4mGZaz4lW9xJiSOdJT1sekGzxMiqUrLQSKfUDhEWW4WLgRBqPjKmVdA2Tq2Bibx6WNA%2BJnsLdPKYsmNg7esgiZR0wbect2M"+
     "SQY%2Bb7fPVZEAkQ1zx4%2BjRb%2BmjnzsbR77HyjEgQaAVk%2BxZuECCcsmLsHaOTQs8JKUu4II6CLaSs%2FjdT6Och0BPDrZk6"+
     "zXyf%2F5%2FlwmSLGXIXkDiDyiaeuwZmkuUZIdeh4A23IKmCmV4h2bk%2BRonKpCxiSOWmDuJL%2BxOd7iHD2slDQOciJ1Pa1Xs7"+
     "rsJIW9rbIyA5R00Aiabu4aGjKLFx2feJN5KrkBjCIoVs38M1qsReBSLGXLqWHlL3zJTmL02yhqkfTb0QBFvoIScsY%2Fb7PKaquA"+
     "Yk1bzEBWVBXGx7VVK%2BUobU%2FdLG1TUQjmcbBOwgCYqQqoQhNMtClQFKhTZ1OTFEK4abANHco9%2FykAE5haufkkRAlnOqBMhS"+
     "pJJbrAFIrqFjRBkVJm6cwIw8NVwCFohJyiIbj5JV%2B6TLSlbzkHGmTl7SiiGdH2Kcjhw18TwluQcIx965qSs8WgU9M9jUMxR11M"+
     "QERJMnx5B4RbF35CgCrRqAnGQ9T0KQeggBUsbN1sfzJWWN2HsO4%2FvtpUOy6gGI4YSWvixno28jw3QhWTcYksVJJrkIWSsE3JLT"+
     "Fe4xZOMj3A6hk6xRE%2Bs%2B0tax96mPLAB5E4aIZF0AEnZ%2FNHXXuxMXFgwZj9PhU%2BCELr2TrNkVT3uVIXylAKVC2LLXaOo6"+
     "OtEeAhkyQo6rnkCMmkiTrTUg3c7TMpvG0U4%2BUgs3AjZhzCRXSW%2F3DKHmoYN2neuiBKuPpr4JQNLUsZasdh7SYKHRCdrIscfe"+
     "kbkwTL1eApKYYgC54xq5YchrNVUxTASLDg7Tc5xYnTdOn%2FDW8GhiiJWsY6e3VlLJ3Kmpd0DaGJ5N%2FbxxzjJk9JFrQCYscLFX"+
     "4XMQIPiBADOVrHD4tKdCOGUI3c7AwmWaRhOnLFl9uCg8EQ9B4fE795Bxfkix90xgXcA2ir%2FvXcAyIGmHBxAm9j037jAUSWnLMc"+
     "R4yG4aOkwV9DYeHr3NEMpg56MIw8VxhCumXmLK6vAcdh4GKfv5527n9zUgKKmHBECQGHMhWXr%2BcQKH8efJRceKMFMr9pJzqYqw"+
     "gc46UDIHMl8gp%2BgwKWvMsk5OpB5CNTF6ySFcNIwHO8o5%2B3WAyHw3AoJ0oBRM3QtYDdXReAbyIIUaemcTM6SxITOkgZYaOntI"+
     "jr1s6uAxYr8CHVBhpC1n6jT13bmVvFPyenoJ6L5fLoY8idVzitBDjKkX8wpZbANaOGrS8gdt38KTwZ8FIKkQ5tEJokS1Z9W9cg8Z"+
     "R7gY0qWjkyZSzkNKX3ye%2Fb7vMkg5Bey8W%2Bs2IDlPwdykgFmeypI1Y0jRhdfmjUkVNLkKLE7XHjJjCMb3zpAce9ssq1k83sax"+
     "FacsErCtCdgLgHC3mOcpwwkGTSSL05YxdWZBqILQs0FmyPheDAfoSMp5iGdMj7Y0OsEi9vKoEbmxbwGQAdPx5591AQjCbW7sHtHU"+
     "nRxdSpbG3sGQMCyJYtUELJi7BSS4ha2CJmXVyBBJV6EY9u9bl7Pa4VEv6SmLezt49nves6WAlPj9GJ1wMbRcmHIiSpYx9Sr9XeVK"+
     "YRlQriWLTgP7zzIEIKMODOlsqtJKKjOkO0zwEBQCgoGh2S%2BUIX0Y37%2FfBkRZVCaLnvmiklU%2FnIk7Ux8xuO6hmV8yhMbvsb"+
     "FjImB0PSbAG4MjvJl6CIXgw%2BQHENLbh2S9BghF2yksMw9R6BjCAi9ZQ5YiF4Cq8CCN2xND%2Bpn6zENiMWxDxQAFzbLacJE8pN"+
     "K0t1C6ev7svB4jxyxZ51nJCpBQ8zhxudIHD0%2FjAssPXI6CjbjQ8z8CK8%2BxvI1DYu%2FcQ9pwcWeYsplTD5l6SDP1aO7a2zVz"+
     "nSH4ChANvMYtMBMpATJIVkHqIROGRFgiPL15eMlKsdcJWU0MobtOhDE2ZSUP6UN4NfVu7d1RCJCtheAuXWtAwjhEDqBckprnKdtD"+
     "xNQxGSCi39QDsfFbDCGwnIcMvtBPa%2F%2FpSFcnC3o7yR6ykZNEU5di2DPXe2wlERCSqglPrKl7EMagUCSrRokC5aooSyd%2Fxn"+
     "MJgtE5PCA%2B9sbRCZpdR7GqYuYqYdLUR02kITw1doFAJltj9nsa%2FuElXwfEB11o4z73N0kWM%2BYGQ4aHsKmPgXvwibH7Qbvf"+
     "c4LljEeIQ6Q2uWIPaVOsPn7vs9%2FzqjX29kcKaCJVAiDvPYHdBiTnq7qAZ%2BYoSbKYZ8KCEWmzh%2BhzbjPE5Cr1jAbFtmtTP%"+
     "2FZ7bfPddg%2B8THsXpt5nwDzZeustfgNPgh0g1kmWeUoFy8rXYE039Jlkcf4aQxJp6loM5wxRiw8egjw62eTRlLLaPb50tRFrjK"+
     "lDbg7SyZZpJS1trQDRJJVTlkZbdY1RARdMqZYhNHAH32VlYq92jQhIuHIM6VdaDIUvtVv9ELKqvb2bu9zy0KHgzCWz31uAjGGJzq"+
     "sAE1fVA5KHWCCYFZEhNN81HhJiLxBkqYqchWlv8BAzOtFiiDGMV2DOwAw5HcHWrb1%2Fl%2F4%2BmPIm8PQ7468BUQgiF0zXmLoF"+
     "QuWDjENihmrPqgkcSVl8iw8SMOYqw9S%2FJrGi8xDIiSFM7BVTb95Bf6QAuTkIb5YhK0B4MgUztZK9rf4AvV9kJVkMGjMkGbgzdf"+
     "WZnqtmgCQImC8CDYXgSgJWQ%2FaykqWTLQJGQ7Dp7TcACSxwcjSD4EKycqoyDBEPkWJIsdflKiCORaBDxs3yhXkwJGtTASORois%"+
     "2BD0Eydb71AcyQ8jIgOjoZ4hRSFtl4ELDIJRqpw5u6GPfcQ9CvJbReMMT1kC5RKfaOua8WQ5YsGaTQCfvZ20f83VrspQnw4MsrgJ"+
     "gwS48lmAwE3Dnc%2BDAyREfrgyFQMy%2FaQ%2Bg5JRl%2BACQwRH%2B6xUlX6iEiWRgWPxwlMiWGYK6JMla5BkR8QkfrCCUwPZpj"+
     "LwHxAkOsd%2Bx8awJoeRGX3sVeA0%2BY9iINFYNIudnv%2BDqY8uZHjRjSRY6yAiT5xAyCBScyEKn6iamP67pneEbjgLIACk%2F%"+
     "2BWRidxKYOdx1uJV1JFpl6SaMTuhdF%2BNKlCxqCDSDGxi0g%2BdGVhygzgkRZFsTmoR4iMK0YcukhwhCkpo4wyxpylnqI8RCMaW"+
     "8JgEQP2QYgOTNFQGbsqeFRx5c7kjVjyMxD2MBLSEuXgFgBo9HJpWQNuCr9LAMSGeIkqzhTn5n5TMAil9iikRf7iwyRlDX5WZlIlg"+
     "PCe0gYLs5MfSpZMow3HtI4UYgTGx3o0uz3BOYSkOpjL4rr5lO%2BqB9oynpeAzo4TBCod5QXGYIeYpcMuZSsIVwsUiNfVQGERo6j"+
     "lSBNtu4CogI2yVOWE1IBM1MCA8qSIfIV8%2BaBeYI6Xxlt%2B6aHIMyy5KdpstXcAjOGRIvXEPw6ICkYT3MVXpEsxxDt5uIh1M2j"+
     "jUN3%2F3UP4ZR1W7JKU%2FyQubKHlHY0S4D0ydZPAQJcG%2FcdD%2BEzDjH1Psui3Y8kR23H1x0XrqFgFTmcJXjumDqKcCLH3vI8"+
     "XioTU%2B9%2FGAr1kOEkF4D0zDXvGAsPqXPJsi5xgyGzdDUHJDkKT3ZlqnvPQyZNvZA4maYuvKnjRgjwFbeSFSCYlD7EGW1e7AxP"+
     "lKwq3oHBCb0aKSv5TGXORGAwib1WwOrEYSqqeEc%2FMQx8qSJgzfBpyBhGjnS8m2riHBCXkiYB14rU0swZgImpm5TF6Qq032Eibb"+
     "b46CEbQZemvXyTQzL3bTiL6%2B3IXvJcdLL4LmepJl4AMurisaMNILqgYXkB7d7FpCwnWVVYVB1PhofkzOXs2%2FUQcpT2rHQbED"+
     "82gi%2FF3trjgHgIwilJuznoVUCGWNVx%2B2hMUAveWA9RycqmPou2whdiSOBNKoYKiPUQTWJq8jXWRO0hqBceErzE9fZx7xbepD"+
     "Q6QHQyFZ1BoNNo20teconUP1BkwK67fvClsSebuWQvnWVdx97kEp0TKmjqHSH2HlafPYSBKAECvqrm6nVA1C0oEsfJVJhTTcycn8"+
     "2ewhZPTZ2WFcICmMWOrtOWv3rjRwrFq5Qlo5MwSMH4TimLOOH4YgGJo8IQbaGDwBsespSsYOrMEK2CKU9BZEmvZv4ikdbwJcVezH"+
     "oICRjkdIR7iJo69XeNxNRKen%2B%2FA0h6ROHxrlGoUau4Rc9QTqDv7Ro8BAjjRJIla9%2B4frQGk9%2Fouc7Uu0hZD6FRI5u6gS"+
     "fVxBUgqXdrJw%2FW7iBI4tQlLwsZD0L00dEqSHhC1yjRxvkOLK2J4dFNi%2BGYZek4EYEx3kOGqaMYc5fJ1jhNpIFjeRWQkKeQrT"+
     "p7SElGzhwA%2BcJUsjhX0fIi1DzA7%2F4yfzSkqhR7aYDS4aEgMBhkJlvJ3A9mKDzt%2Bz1AcsCFMWyxeuczAwIrWeFZJf%2FXly"+
     "4%2FI8OURUpj77bgS82xNxXCzhBoCB5jyQo6rjKmHuFhAXvDC4CYPIUyNfWw73sKIskKyamkxTYMkcVG2O%2FFiJSJvQwa23ac9t"+
     "IIUTkRhosMjzP1G4C8iYAZQAqKBSTEXhgI2MZz6YO37ThApJ8aRiB387TY0Eg7T1kyOtmycAV4OOiyhwyRiqZOM2AC5K2%2FgoHY"+
     "IiApVyGKVYi9tyEQi3%2Fhv8gFXHKiIHQMzHmzhXer574N3RwqZJU6y8ZAGg8ZKavG2S8PUjog7VN2D0QGJHMj%2Fix5CIGlklV1"+
     "ssXjkf7dL325DYGK0%2BQ5PDqhTt4ZEYthcJY%2BSMk1kb6fKWucjmAA0wPyBSDT7GQAWXsIFpJFr6HrPFonATvnu6nYXS29g4lG"+
     "J2GU0riQw29d8KVSQObvPfbidUAiENxD%2BGdYQyABN0tWNHVT%2FoBJBQyLjrzYroe42Eu7vYgMRbhsygoheKOsJd97V6GaiDFC"+
     "6RbvAAnMcI0j8aRfOw9hyRLoKo0N%2B3WYTGn%2B8eauvFEIjKmzbQfh01Asw0X%2BTjZeEYbxPWsVEqkegmNv%2F0lA5m7Bpn5h"+
     "0%2BeSCUxjoptMHXFwCA6zmKUsYUh4hROwipyvQg8JoFFvp9LIZl4nKes%2BIJyd7rkFR%2BIsUiJ5%2BkzzX5SsXBbZ4ldB1zPE"+
     "glYJtCK7naWoSxeH38CPYOoJmNBDksUzMBNAQtCNsRfZZyhXWXiMZHWJmkIQxAlmmac27k09eogCDDpTH%2FDwQVXiy8bwBgFrAF"+
     "Hs5cHjsPbbgMjejvadx%2BdlCY9IVoI2Li%2BQBiDIzmJTVmzquOEhkqt41JjTVoSA4AsCxrG3AUIWfwkIwik4XHZCkB4RqakYBc"+
     "maPGqHJQhng0Hkkj%2BklFaDS2S%2BVHmHmnrIeIeKUBODkG0iYN1ZvMUjjVUsIDElqX3nlKUewuPymWSFJQMyBBB9l8UGnHELp5"+
     "yAFdnfJTFE7kKhQQqBJTJHN9NR5uIYMCDoI3qSMTtWmQIikoPp0murMB4Slgq7kSwFQpbQiZW%2Fqk6y3HPSKyKI1YHXH60iZJVe"+
     "YQYpWhfV4um4aglICrx8cpHkjLKXW2AWDitZ4%2FWDVZqZIHsZab%2Fn55TJVeTUptCjEgeGHBUBZssDFXNV2Wfkasstvvf2eh%2"+
     "BQEHsnz%2FSArK96KMiSld3CsijudywYsq34Iq%2BpKfDSvMsCUpFOR2iZt9Dmq%2FxsDFI6ICxAziHQQ6dbXqDOPMRcmVQVfGLB"+
     "kIksAfVKnLJtJ4bUCXg1sapOr4a%2FUMoKV3KIpZOt57MmgDAnkEyZlxPRJ1zAnTAEwhXPiX5FDeZKpJDEqSxAqwHgKUNUwDQEE0"+
     "%2FGZ8pABcM1BgT1BUAST2zADUs92%2F36XPUMl6hiZirJERJfbjNkLHIN77u5qxB%2F5fwwh2BoEqv2qgvZPUC8cA1ZCjyZLLrP"+
     "T31%2FJ0aILFlHgKh%2BWUTj8YwIzJZBMw6zCcwhDPPjebIFGaEIPKmrnP%2B%2FrOeAxEW3i9zdIk%2Bvwu6n2GvZw0e4srCpVc"+
     "AuL%2Ba5ysVemJQ1Z0gCgvmQenuYbMXYO%2BBhAUst3gGSxiIX4gRZwAUEQXjQfwHo6YbvGjH2hiQ1bRwBmDp5TmKIPEeAGWMX10"+
     "pQffZieNhRgoBdAaJHSxNxwpIFQZRIhtCNWo1bMpNOcsnb3KJ7sNbPya%2BpSaxSU0923iAkww%2BxN9VE6ygMiFnsYe7SQ%2BZ%"+
     "2BEV0jccGZ93ynx708sfE4OqHsFERqHgPC%2BwlDDG9qkLUaLZ6ZYlrJKV1rQOKBat%2Bf1EPULUpYRhAL1GeqPj9kJBqxkywRQ2"+
     "K68sbt3WIuZBRPiTFRrGIYJp%2FJ0FS4fLYhHPNSNH4VEFrQMCoU%2BdBHww0LKe6W8GgJ4mICrnUEXEnW9NGaPKQmAav0DtU8ug"+
     "k8mwC8hRwW%2BfKzgHj7pkcjJyYCJu%2FDzpSTFOJ%2BD1A6hpQpQyq9zwuSJcvb9r%2FnCzf1OMv6GUC8P4h9a3935pwhCM%2Fg"+
     "XR%2B9g0Uqs0dgwlqysqkb2w4MkddsFq5s3MwGfafNRuNKUDT2fQmQiZFba5cix5IVe0eyfiNSyeI9BGVi%2BDU%2FGmUtMySejk"+
     "DnXbrkKlJRutTGvwLIDJYlXJSrUoRl66Te0bKblRy%2FvAy4hWcmZwkCXk7iD8vb8X8ZmGrkC9m3DhnH1zJyVRw8rgGpYtjaH9zS"+
     "dw%2BZ2TjD4ziwBGJu9cvn0NJvM9DuMERgYz8gyZLFF1DjeCVPhAXQBEhoHgYQyVM5V808ZLK%2FI3NWIlWDPMYFnRg2lgOVvhwT"+
     "hggXzIRrkqvkp4k3DpBKn7prnoqAVMpRDhBn2VMPyeNDF3hnPSQsOrCQLPsKXbKbpo7cSqp5xZYFbAHIYM8ApP2%2BcVgyaxUce5"+
     "2dLzmRJEtMvKQ8hMnux5IFU0CmLHIMkSUPMDm%2BVB1HtldQTI5tvmJm%2BAUWEOVL36UTLvTlnHAiP1ZMDCYQ%2B%2FJiutjxfa"+
     "xkWS9ipT%2B%2FGpN3bJpKVlvuIHlVXCc4ypcBkaVCWA51GN3DtpOnRYbs4iGTJfFnvryToBzMt8iuz5%2BxpXeXO1IExCBZKVdF"+
     "L%2FFXXwAkSU8%2B99PjprB3kZNTPgMnN3JOIn7jOOEYcgvCqWS5lGVZVBEmwdFDgtWbYcsVIBcQ6MHS5BUqP2WekTQCpCvynZUj"+
     "mOwW4alTIVsxJJm6il56TjVSR7KmFi9s0XhwDxDNNuoWxtSTh9jntKswYl91jOV%2BX10FIQtLt2BIMvkNYV4cXhG7iDSWnwAkSA"+
     "1SOoJReV78EvZgMT6jn%2B0zmHOUqUh5OTOPboFhKj2TlCWuUWnJyUPC95C5QhJbAxKXWReyLZI19ZHEdCdHt6he1hY9JHHMJykD"+
     "gQFEdn2JJTByIrLJSpaM5uN8WGqf5i1z5QHJUEAtWkeC2RHcWGS6vxH%2ByY4%2FvFQwC3pTsgKEM4ZkiRJTj5LlPSQGZZ0IB3iU"+
     "UwX7zC8iIJ4FszZepZ1Uy7T2bjC7FzeWF9cMib4wedeZjRdKUkay7LtnYNZ8qQK6ByRGWpOZ4PxBFhthJ2O6nLww8wVd7fcFIAtg"+
     "K%2F8GhhP8G9QocxY0qYn9J8qXBM8fAEgWucnCIcXL%2Fg70GRGCi6WfcGr9Ci84kSFh0rWSLMOpal5BQFq%2BbOEVCkgsdjN%2F"+
     "cLI2ax5h78IsByaydGO%2Fzxly4SFxC2zmUzo8WbLS7q8ibtv4nhiWABFgrgCJ%2FjBEKT03yVFOYFOrV6DjgtqUdYchlzBtE8mK"+
     "i60iExc7OhSJFL3bRMCuAammhdOUiZ4dihw%2FJ1bA0VHoOSUJhoM9LGTmRAe8msWty%2FeR4eKoiTmRyb%2BsujCc5Kwm2K2A%2"+
     "FQGAZJ8YXAj%2FcKR%2FuPsHw%2B3pBLdCuVreKYRZlGQHx0%2FZougZgDf5lE16zNcBMXaedZwXGwhWTf%2FU1DzCMuRFji7kIS"+
     "gvQlDNZ08Eh5YpL52RLEpSyUMCMGsBI0fp%2F0IDiLZou9gj6WQPMa4xRi8ukbkl1PdbmLoH5MVXyGKHn9bE3JTEQl8PsCdxq1Ow"+
     "VoDw3rWADMBMKnJmaWAq7C2TpStmsdMr%2BJNdnpqAtk0ZkgNukCXnISmXScoaImWCwxyQlIRwseRi6uGfhrRbYfZw3gQr%2B%2F"+
     "0yQ%2BxyFvuZji9ZsiSJGQirelQCRA6EMyDnglr3oPzjl3f4TPqnuv0dmTV5hyk8Nxly%2BWganUz5UtOj29zw8wiFYwD7VIDuCh"+
     "AvVixHdtFhrBTTBQT%2FU70cmSZzExBn6twb9N%2ByZNOMBVOpuhapnwLEdQzNZQvQ9F3M%2FuTm4eVI392NRebsGScXE0DDZxpx"+
     "CkmK42vYRPqcGrObAhLeZQGIvaLFAeICZnsE%2FDIgMEKflXzH7P5y4zmJIfPnjMwzh9TyOHgItxLimOPEFSA8LJk5ghY4ywLYfz"+
     "gwFxxcLtZU9G4udvzMapnrXrNNN0E1n1nN7%2Bzic2ZWlU29ACQ17SAbKl3CE%2FOPwFRiUjFcu4W%2Bw1yy0m87vQrvVxfvUO07"+
     "1MTKuoTQXHlAomAkQHRXcLSVX38WYctCMKygTQw%2F7c%2FLq0sP0d5tnktBQCCsZoNs4TepKBMIavpNPCCL%2FY74i1pZmnFKX1"+
     "lWnJjsd7wOCOt5ZsSUcVt2IW4l5nfeAoTyPlYILwGxIXaykHEPzpYD%2Bk8KjIiwLMXlCjSz2PrZc4bMF2niDGkT1LQJKupL8DAg"+
     "a06kfzjSHhSfMAsHzPaw8a2LhUwwGU6sN0HgsXbzCcfc8tbF6x0r6xKem4AUR%2BwkXeH1brfyabzbn3a%2FOyBeYMjkFZsP3hPw"+
     "6vIz6xRuM0N%2BHZBq8xD8viSmuL3nd3venyXvyLyQ1wK04ML6OSkz3fitN%2Ff7xKbueogMZOpLgMgvDk9l5yjhF0UOkDOG0Fh%"+
     "2FKk5u0S8B9UJG9%2FZefWa0evt71cXvVW3drMnB96lrTPdy2jnR1L2YZJGzUpiXF64T3GdI%2BozqXeySldtKGLOpO%2BmSz6jm"+
     "MxiQOC2a7r2JxHjNn0FIMeDGgvr97hfQc2qyow1HnUXP3yGIXZm7RljLzfarO4AYouPGcgAzu10xBLcW%2B4pTC9eZpazLd0%2Bg"+
     "Xb77WghfBOR6cTD5RevckSavmOr7LL3deoVjZZ28Yrb73Tbabr6iLn6vOv0MBcRF28VCzrOXlx%2BsesilNCz3%2B5wh812%2FkC"+
     "z%2FfvX2%2B20LYIOjJF2Kqr%2B7Rb%2Fee2Vu0JfLac9Q7nnIHUBWzkRBpeJLkOZes%2BRxvfh3ZUAmi35p0Qzh1eIkBb%2B3vL"+
     "jHosk%2FdVt8xtc3wfbCv3O78Rk3AUkWfb0cJgrPc1l9cfd%2FgSHL55QLaU7StV%2F%2Bzuk51T4nb3wfVJc0vQfhffJjCWm9gv"+
     "Q%2BINMWMdX3tW%2B9zsobSvQFQBSWV15x21IX%2Fwy8%2BIrt1r%2FkugndcUcF4pVXXANywwonfLncVcvl2F%2BC9GsMgTuzfP"+
     "kzzQ7f7nzmhfasAfmafNzh1LWl%2FtcAcuP9tj%2Fit7y50e4D8kLKenU5v7a8WH5KfQnCL24CvJYm%2F1mA%2FAEfewnIfz9Dvg"+
     "bI%2FrNr%2BccA8pOc%2Bqd85j8DkP2f%2F1v%2Bf2jmJBw1Fe8SAAAAAElFTkSuQmCC";
     
  // Here are some boring utility functions. The real code comes later.
  function hexToRgb(hex_string, default_){
    if (default_ == undefined)
        default_ = null;
    if (hex_string.substr(0, 1) == '#')
        hex_string = hex_string.substr(1);
    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1);
      r += r;
      g = hex_string.substr(1, 1);
      g += g;
      b = hex_string.substr(2, 1);
      b += b;
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2);
      g = hex_string.substr(2, 2);
      b = hex_string.substr(4, 2);
    } else {
      return default_;
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b))
      return default_;
    else
      return {r: r / 255, g: g / 255, b: b / 255};
  }
  
  function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined)
      includeHash = true;
    r = r.toString(16);
    if (r.length == 1)
      r = '0' + r;
    g = g.toString(16);
    if (g.length == 1)
      g = '0' + g;
    b = b.toString(16);
    if (b.length == 1)
      b = '0' + b;
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
  }
  
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  
  function fixPNG(myImage) {
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
      var node = document.createElement('span');
      node.id = myImage.id;
      node.className = myImage.className;
      node.title = myImage.title;
      node.style.cssText = myImage.style.cssText;
      node.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + myImage.src + "\', sizingMethod='scale')");
      node.style.fontSize = '0';
      node.style.width = myImage.width.toString() + 'px';
      node.style.height = myImage.height.toString() + 'px';
      node.style.display = 'inline-block';
      return node;
    } else {
      return myImage.cloneNode(false);
    }
  }
  
  function trackDrag(node, handler) {
    function fixCoords(x, y) {
      var nodePageCoords = pageCoords(node);
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
      if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
      return {x: x, y: y};
    }
    function mouseDown(ev) {
      var coords = fixCoords(ev.clientX, ev.clientY);
      var lastX = coords.x;
      var lastY = coords.y;
      handler(coords.x, coords.y);
      function moveHandler(ev) {
        var coords = fixCoords(ev.clientX, ev.clientY);
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x;
          lastY = coords.y;
          handler(coords.x, coords.y);
        }
      }
      function upHandler(ev) {
        myRemoveEventListener(document, 'mouseup', upHandler);
        myRemoveEventListener(document, 'mousemove', moveHandler);
        myAddEventListener(node, 'mousedown', mouseDown);
      }
      myAddEventListener(document, 'mouseup', upHandler);
      myAddEventListener(document, 'mousemove', moveHandler);
      myRemoveEventListener(node, 'mousedown', mouseDown);
      if (ev.preventDefault) ev.preventDefault();
    }
    myAddEventListener(node, 'mousedown', mouseDown);
    //node.onmousedown = function(e) { return false; };
    //node.onselectstart = function(e) { return false; };
    //node.ondragstart = function(e) { return false; };
  }
  
  var eventListeners = [];
  
  function findEventListener(node, event, handler) {
    var i;
    for (i in eventListeners)
      if (eventListeners[i].node == node && eventListeners[i].event == event && eventListeners[i].handler == handler)
        return i;
    return null;
  }
  
  function myAddEventListener(node, event, handler) {
    if (findEventListener(node, event, handler) != null)
      return;
    if (!node.addEventListener)
      node.attachEvent('on' + event, handler);
    else
      node.addEventListener(event, handler, false);
    eventListeners.push({node: node, event: event, handler: handler});
  }
  
  function removeEventListenerIndex(index) {
    var eventListener = eventListeners[index];
    delete eventListeners[index];
    if (!eventListener.node.removeEventListener)
      eventListener.node.detachEvent('on' + eventListener.event, eventListener.handler);
    else
      eventListener.node.removeEventListener(eventListener.event, eventListener.handler, false);
  }
  
  function myRemoveEventListener(node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler));
  }
  function cleanupEventListeners() {
    var i;
    for (i = eventListeners.length; i > 0; i--)
      if (eventListeners[i] != undefined)
        removeEventListenerIndex(i);
  }
  
  myAddEventListener(window, 'unload', cleanupEventListeners);
  
  // This copyright statement applies to the following two functions,
  // which are taken from MochiKit.
  //
  // Copyright 2005 Bob Ippolito <bob@redivi.com>
  //
  // Permission is hereby granted, free of charge, to any person obtaining
  // a copy of this software and associated documentation files (the
  // \"Software\"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to
  // permit persons to whom the Software is furnished to do so, subject
  // to the following conditions:
  //
  // The above copyright notice and this permission notice shall be
  // included in all copies or substantial portions of the Software.
  // 
  // THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,
  // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  // BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  function hsvToRgb(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
      red = 0;
      green = 0;
      blue = 0;
    } else {
      var i = Math.floor(hue * 6);
      var f = (hue * 6) - i;
      var p = value * (1 - saturation);
      var q = value * (1 - (saturation * f));
      var t = value * (1 - (saturation * (1 - f)));
      switch (i) {
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
        case 6: // fall through
        case 0: red = value; green = t; blue = p; break;
      }
    }
    return {r: red, g: green, b: blue};
  }
  
  function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = (max - min);
      saturation = delta / max;
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue /= 6;
      if (hue < 0) hue += 1;
      if (hue > 1) hue -= 1;
    }
    return {
      h: hue,
      s: saturation,
      v: value
    };
  }
  function pageCoords(node) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var parent = node.offsetParent;
    while (parent != null) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {x: x, y: y};
  }
  
  // The real code begins here.
  var huePositionImg = document.createElement('img');
  huePositionImg.galleryImg = false;
  huePositionImg.width = 35;
  huePositionImg.height = 11;
  huePositionImg.src = HUE_SLIDER_ARROWS_LOCATION;
  huePositionImg.style.position = 'absolute';
  var hueSelectorImg = document.createElement('img');
  hueSelectorImg.galleryImg = false;
  hueSelectorImg.width = 35;
  hueSelectorImg.height = 200;
  hueSelectorImg.src = HUE_SLIDER_LOCATION;
  hueSelectorImg.style.display = 'block';
  var satValImg = document.createElement('img');
  satValImg.galleryImg = false;
  satValImg.width = 200;
  satValImg.height = 200;
  satValImg.src = SAT_VAL_SQUARE_LOCATION;
  satValImg.style.display = 'block';
  var crossHairsImg = document.createElement('img');
  crossHairsImg.galleryImg = false;
  crossHairsImg.width = 21;
  crossHairsImg.height = 21;
  crossHairsImg.src = CROSSHAIRS_LOCATION;
  crossHairsImg.style.position = 'absolute';
  
  function makeColorSelector(inputBox) {
    var rgb, hsv
    function colorChanged() {
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      var hueRgb = hsvToRgb(hsv.h, 1, 1);
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
      previewDiv.style.background = hex;
      inputBox.value = hex;
      satValDiv.style.background = hueHex;
      crossHairs.style.left = ((hsv.v*199)-10).toString() + 'px';
      crossHairs.style.top = (((1-hsv.s)*199)-10).toString() + 'px';
      huePos.style.top = ((hsv.h*199)-5).toString() + 'px';
    }
    function rgbChanged() {
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      colorChanged();
    }
    function hsvChanged() {
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      colorChanged();
    }
    var colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.style.padding = '15px';
    colorSelectorDiv.style.position = 'relative';
    colorSelectorDiv.style.height = '275px';
    colorSelectorDiv.style.width = '250px';
    var satValDiv = document.createElement('div');
    satValDiv.style.position = 'relative';
    satValDiv.style.width = '200px';
    satValDiv.style.height = '200px';
    var newSatValImg = fixPNG(satValImg);
    satValDiv.appendChild(newSatValImg);
    var crossHairs = crossHairsImg.cloneNode(false);
    satValDiv.appendChild(crossHairs);
    function satValDragged(x, y) {
      hsv.s = 1-(y/199);
      hsv.v = (x/199);
      hsvChanged();
    }
    trackDrag(satValDiv, satValDragged)
    colorSelectorDiv.appendChild(satValDiv);
    var hueDiv = document.createElement('div');
    hueDiv.style.position = 'absolute';
    hueDiv.style.left = '230px';
    hueDiv.style.top = '15px';
    hueDiv.style.width = '35px';
    hueDiv.style.height = '200px';
    var huePos = fixPNG(huePositionImg);
    hueDiv.appendChild(hueSelectorImg.cloneNode(false));
    hueDiv.appendChild(huePos);
    function hueDragged(x, y) {
      hsv.h = y/199;
      hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
    colorSelectorDiv.appendChild(hueDiv);
    var previewDiv = document.createElement('div');
    previewDiv.style.height = '50px'
    previewDiv.style.width = '50px';
    previewDiv.style.position = 'absolute';
    previewDiv.style.top = '225px';
    previewDiv.style.left = '15px';
    previewDiv.style.border = '1px solid black';
    colorSelectorDiv.appendChild(previewDiv);
    function inputBoxChanged() {
      rgb = hexToRgb(inputBox.value, {r: 0, g: 0, b: 0});
      rgbChanged();
    }
    myAddEventListener(inputBox, 'change', inputBoxChanged);
    inputBox.size = 8;
    inputBox.style.position = 'absolute';
    inputBox.style.right = '15px';
    inputBox.style.top = (225 + (25 - (inputBox.offsetHeight/2))).toString() + 'px';
    colorSelectorDiv.appendChild(inputBox);
    inputBoxChanged();
    return colorSelectorDiv;
  }
  /** End of code that's not written by me. **/

  (node=document.getElementById("dark").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=document.getElementById("light").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
}

function addStyle(setup) {
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  style.innerHTML = "a{color:"+setup.dark+";}" +
                    ".status a{color:"+setup.dark+";}" +
                    ".inputbutton, .inputsubmit{background-color:"+setup.dark+";}" +
                    "#tabs{border-bottom:solid 1px "+setup.dark+";}" +
                    "#tabs .activetab a{background:"+setup.dark+";}" +
                    "#tabs .inactivetab a:hover{background:"+setup.light+";}" +
                    ".pagerpro a:hover{background:"+setup.dark+";border-color:"+setup.light+";border-bottom:1px solid "+setup.dark+";}" +
                    ".pagerpro .current a, .pagerpro .current a:hover{border-color:"+setup.dark+";border-bottom:2px solid "+setup.dark+";color:"+setup.dark+";}" +
                    ".summary_bar{border-bottom:1px solid "+setup.light+";}" +
                    ".tab_bar{border-bottom:solid 1px "+setup.dark+";}" +
                    ".footer_bar .pagerpro a:hover{border-bottom:2px solid "+setup.dark+";border-top:2px solid "+setup.dark+";}" +
                    ".footer_bar .pagerpro .current a, .footer_bar .pagerpro .current a:hover{border-top:2px solid "+setup.dark+";}" +
                    ".share_and_hide a:hover{color:#fff;border-color:"+setup.dark+";background:"+setup.dark+" url(/images/share_icon_small_hover.gif) repeat-y right center;}" +
                    ".s_and_h_big a:hover{background:"+setup.dark+" url(/images/share_icon_hover.gif) repeat-y right center;}" +
                    ".share_and_hide a.x_to_hide:hover{background:"+setup.dark+" url(/images/x_to_hide_hover.gif) no-repeat center center;}" +
                    "ul.square_bullets{color:"+setup.dark+";}" +
                    "input.request_form_submit{background:"+setup.dark+" url(/images/icons/request_button_icon.gif) no-repeat 8px 6px;}" +
                    ".flash_fallback{border:1px solid "+setup.light+";clear:both;}" +
                    ".social_ad_advert h2{color:"+setup.dark+";}" +
                    ".actionspro li{border-bottom:1px solid "+setup.light+";}" +
                    ".actionspro a:hover{background:"+setup.dark+";}" +
                    "#chat_tab_bar .tab_handle.highlight.disabled, #chat_tab_bar .tab_handle.highlight{border-color:"+setup.dark+";}" +
                    "#chat_tab_bar .tab_image{border-top:1px solid "+setup.dark+";border-left:1px solid "+setup.dark+";}" +
                    "#chat_tab_bar .chat_conv .chat_info_clear_history{color:"+setup.dark+";}" +
                    "#chat_edit_status_toggle{color:"+setup.dark+";background:"+setup.light+" url(/images/status_off.gif) no-repeat 3px 9px;}" +
                    "#chat_edit_status_select a:hover{background:"+setup.dark+";}" +
                    "#chat_availability_toggle a:hover{color:"+setup.dark+";}" +
                    "div.intl-dialog .glossary h2{color:"+setup.dark+";}" +
                    "span.intl-title{color:"+setup.dark+";}" +
                    ".native_string_tokens a{border-bottom:1px dotted "+setup.dark+";}" +
                    ".native_string_tokens a:hover{border-bottom:1px solid "+setup.dark+";}" +
                    "#intl_extra_phrases .intl_inner_frame{border-bottom:1px solid "+setup.dark+";}" +
                    ".approve_table .over-row td{background:"+setup.light+";}" +
                    "#pagefooter #locale_footer_selector_menu{border:1px solid "+setup.dark+";}" +
                    ".fb_menu_dropdown{border:1px solid "+setup.dark+";}" +
                    ".fb_menu_dropdown .fb_menu_item a:hover{border-bottom-color:"+setup.dark+";}" +
                    "#presence .big_button #presence_applications_tab{border-left:solid 1px "+setup.dark+";border-right:solid 1px "+setup.dark+";}" +
                    ".presence_menu_opts .list_select li.selected a, .presence_menu_opts .list_select li a:hover{background-color:"+setup.dark+";}" +
                    ".ubersearch .search_results{border-bottom:1px solid "+setup.light+";}" +
                    ".ubersearch .search_results .web_result .web_result_name{color:"+setup.dark+";}" +
                    ".ubersearch .footer_bar{border-bottom:1px solid "+setup.light+";}" +
                    ".ubersearch .summary .search_tabs{border-left:1px solid "+setup.light+";}" +
                    ".ubersearch .summary .search_tabs li{border-right:1px solid "+setup.light+";}" +
                    ".ubersearch .summary .search_tabs li.current a:hover{color:"+setup.dark+";}" +
                    ".ubersearch .search_results_query .inputsubmit{background:"+setup.dark+" url(/images/search_hourglass_button.gif) scroll no-repeat 5px 60%;}" +
                    ".search_requery_footer.footer_no_pager{border-top:1px solid "+setup.light+";}" +
                    ".search_extra_criteria.sans_pager{border-top:1px solid "+setup.light+";}" +
                    ".advanced_results_bar{border-bottom:1px solid "+setup.light+";}" +
                    ".uber_bar{border-bottom:1px solid "+setup.light+";}" +
                    ".typeahead_search .suggestions_bottom_border{border-bottom:solid 1px "+setup.dark+";}" +
                    "#universal_search #universal_search_submit a:active{border:1px solid "+setup.dark+";}" +
                    ".emu_ad .comment_box .wallcontent .x_to_hide:hover{background:"+setup.dark+" url(/images/x_to_hide_hover.gif) no-repeat scroll center;}" +
                    ".emu_ad .poll_action_frame .poll_result .not_lead_result{background-color:"+setup.light+";}" +
                    ".emu_ad .poll_action_frame .poll_result .lead_result{background-color:"+setup.dark+";}" +
                    ".editor #start_calendar, .editor #end_calendar{border-bottom:solid 1px "+setup.dark+";border-left:solid 1px "+setup.light+";border-right:solid 1px "+setup.light+";}" +
                    ".feed_story_wrapper{float:left;border-bottom:1px solid "+setup.light+";padding-bottom:10px;margin-left:5px;width:465px;}" +
                    ".feed_item a.inline_participants_link:hover{border-bottom:dotted 1px "+setup.dark+";}" +
                    ".bumper{color:"+setup.light+";background:"+setup.light+";}" +
                    ".one_liner .header_title_wrapper a{color:"+setup.dark+";}" +
                    ".photo_borders a:hover img{border:1px solid "+setup.dark+";}" +
                    ".newsfeed_header{border-bottom:1px solid "+setup.light+";}" +
                    ".recent_stories{border-top:1px solid "+setup.light+";}" +
                    ".wall_post.attached_info a:hover, .wall_post.attached_info a:hover span{color:"+setup.dark+";}" +
                    ".ad_capsule .photo_widget a:hover img{border:1px solid "+setup.dark+";}" +
                    ".ad_capsule .photo_widget a:hover img{border:1px solid "+setup.dark+";}" +
                    ".ad_capsule .external_link{border-bottom:1px dotted "+setup.dark+";}" +
                    "#book .ad_capsule a:hover .external_image{border:1px dotted "+setup.dark+";}" +
                    ".mobile_dash_bottom{border-top:solid "+setup.light+" 1px;}" +
                    ".mobile_dash_bottom_left .mobile_texts_address{border:solid "+setup.light+" 1px;}" +
                    ".mobile_dash_bottom_right .mobile_uploads_address{border:solid "+setup.light+" 1px;}" +
                    ".mobile_settings_inlay{border-top:solid "+setup.light+" 1px;}" +
                    ".mobile_settings h2{border-bottom:solid "+setup.light+" 1px;}" +
                    ".mobile_account_main h2,.editaccount .settings_panel .mock_h4,.editaccount .language h4,.editor_panel .notifications h4,.editaccount .action_box h4 {border-bottom:solid "+setup.light+" 1px;}" +
                    ".notifications #notification_options table th{border-color: "+setup.light+";}"+
                    ".friends_tab li.active_tab a{border-bottom:3px solid "+setup.dark+";}" +
                    ".mobile_text #phone{border-bottom:solid 2px "+setup.dark+";}" +
                    ".HomeTabs .HomeTabs_tab{background-color:"+setup.light+";}" +
                    ".HomeTabs a.HomeTabs_tab:hover{background-color:"+setup.dark+";}" +
                    ".HomeTabs .HomeTabs_has_new .HomeTabs_new_img{background:"+setup.light+" url(/images/7circle.png) no-repeat 0 0;}" +
                    ".HomeTabs .Tabset_selected, .HomeTabs a.Tabset_selected:hover{border:1px solid "+setup.light+";}" +
                    ".default-dropdown{border-bottom:1px solid "+setup.dark+";}" +
                    ".dropdown .list_element_container_selected, .default-dropdown .list_element_container_selected{background-color:"+setup.dark+";}" +
                    ".dropdown .list_element_loc_selected{color:"+setup.light+";}" +
                    ".dropdown .list_element_name .suggest, .default-dropdown .list_element_name .suggest, .dropdown .list_element_loc .suggest{background:"+setup.light+";}"+
                    "#embedded_store #store_pager #summary{color:"+setup.dark+";}" +
                    ".flex_open .box_head{border-top:solid 1px "+setup.dark+";}" +
                    ".box_head{border-top:solid 1px "+setup.dark+";background:"+setup.light+";}" +
                    ".box_head h2{color:"+setup.dark+";}" +
                    ".box_head .box_action:hover{text-decoration:none;background-color:"+setup.dark+";}" +
                    ".box_remove_selected{background-color:"+setup.dark+";}" +
                    ".profile .box_highlight_outline{border:solid 3px "+setup.dark+";}" +
                    ".remove_option{color:"+setup.dark+";}" +
                    ".profile_long_name h2{color:"+setup.dark+";}" +
                    ".profile_long_name{color:"+setup.dark+";}" +
                    ".mobile_uploads .meta{border-bottom:solid "+setup.light+" 1px;}" +
                    ".video.narrow .video_thumb a:hover{border-color:"+setup.dark+";}" +
                    ".video #latest_videos .latest_video{border-top:1px solid "+setup.light+";}" +
                    ".video #latest_videos .latest_video .video_thumbnail a:hover{border:1px solid "+setup.dark+";}" +
                    ".networks_with_friends h5{border-bottom:solid 1px "+setup.light+";}" +
                    "#profile_composer .remove_publisher_div .selected, #profile_composer .remove_publisher_div .pencil:hover{background:"+setup.dark+" url(/images/x_to_hide_hover.gif) no-repeat scroll center;}" +
                    ".profile .top_bar .status_source a{color:"+setup.dark+";}" +
                    ".profile .top_bar .mobile_status .clear_link a, .profile .top_bar .mobile_status .profile_empty_status a{color:"+setup.dark+";}" +
                    ".profile .top_bar .mobile_status small a{color:"+setup.dark+";}" +
                    ".profile .top_bar ul.tabs li{background:"+setup.light+";}" +
                    ".profile .top_bar ul.tabs li a.tab_link{border:1px solid "+setup.light+";}" +
                    ".profile .top_bar ul.tabs li a:hover.tab_link{background-color:"+setup.dark+";border-color:"+setup.dark+";}" +
                    ".profile .top_bar ul.tabs li.selected_menu_icon a.tab_link, .profile .top_bar ul.tabs li.add_tab a:hover.tab_link{background-color:"+setup.dark+";border-color:"+setup.dark+";}" +
                    ".profile .top_bar ul.tabs li.selected a:hover.tab_link{border-color:"+setup.light+";}" +
                    ".profile .top_bar ul.tabs li.profile_tab_more a:hover.tab_link, .profile .top_bar ul.tabs li.selected_tab_more a.tab_link{border-top:solid 1px "+setup.dark+";border-left:solid 1px "+setup.dark+";border-right:solid 1px "+setup.dark+";}" +
                    ".profile_actions a.profile_action{border-bottom:1px solid "+setup.light+";}" +
                    ".profile_actions .holder{border-bottom:1px solid "+setup.light+";}" +
                    ".profile_actions a:hover{background-color:"+setup.dark+";}" +
                    "div.action a:hover.remove, div.action a.hover{background:"+setup.dark+" url('/images/profile_action_icon_remove.gif') no-repeat -12px center;}" +
                    ".profile .blurb{border:1px solid "+setup.light+";color:#333333;margin-bottom:20px;}" +
                    ".profile .box_column{border-right:1px solid "+setup.light+";}" +
                    ".profile .basic_info_summary{border-right:1px solid "+setup.light+";}" +
                    ".profile .add_new_box_border table.pop_dialog_table td.pop_content{border:solid 1px "+setup.dark+";}" +
                    ".profile .add_new_box_border table.pop_dialog_table td.dialog_buttons{border:solid 1px "+setup.dark+";}" +
                    "a:hover.highlight, .inserted a:hover{border-bottom:1px solid "+setup.dark+";}" +
                    ".profile .info_tab h3 .divider{border-bottom:solid 1px "+setup.light+";}"+
                    "#chat_tab_bar .chat_header{background:"+setup.dark+";border:1px solid "+setup.dark+";border-bottom:1px solid "+setup.dark+";}" +
                    "#presence_bar .presence_menu_opts h2{background:"+setup.dark+" url(/images/chat/minimize.gif) no-repeat right top;border:1px solid "+setup.dark+";border-bottom:1px solid "+setup.dark+";}"+
                    "#fb_menubar { background:"+setup.dark+" none repeat scroll 0 0; }"+
                    "#fb_menubar_core .fb_menu .fb_menu_title .hover, #fb_menubar_core .fb_menu .fb_menu_title a:hover { background-color:"+setup.light+";}"+
                    "#fb_menubar_aux .fb_menu .fb_menu_title .hover, #fb_menubar_aux .fb_menu .fb_menu_title a:hover {background-color:"+setup.light+";}"+
                    "#universal_search #universal_search_input #q {border-color:"+setup.dark+" -moz-use-text-color "+setup.dark+" "+setup.dark+";}"+
                    ".home_main_tabs #newsfeed_more_flyout .flyout_menu_mask {background:"+setup.dark+" url(/images/white_dropdown_open.gif) no-repeat scroll 8px 9px;}"+
                    ".home_main_tabs #newsfeed_tabs_wrapper .newsfeed_plus a:hover, .home_main_tabs #newsfeed_tabs_wrapper .HomeFeed_selected a {background:"+setup.dark+" url(/images/white_dropdown_open.gif) no-repeat scroll 8px 9px;}"+
                    ".toggle_tabs li a.selected{background:"+setup.dark+";border:1px solid #898989;border-left:1px solid #898989;border-right:1px solid #898989;}"+
                    ".toggle_tabs li.last a.selected{border-left:1px solid #898989;border-right:1px solid #898989;}"+
                    ".toggle_tabs li.first a.selected{border-left:1px solid #898989;border-right:1px solid #898989;}"+
                    ".toggle_tabs li.first.last a.selected{border:1px solid #898989;}"+
                    ".fb_menu_dropdown .fb_menu_item a:hover{background-color:"+setup.light+";border-top-color:"+setup.light+";border-bottom-color:"+setup.light+";}"+
                    "#fb_menubar_core .fb_menu_count_holder span {background:"+setup.light+";}"+
                    "#fb_menubar_core .hover .fb_menu_count_holder span, #fb_menubar_core a:hover .fb_menu_count_holder span {background:"+setup.light+"}";
}

GM_registerMenuCommand("Customise facebook colours...", setColours);
addStyle(eval(GM_getValue("setup",'({dark:"#3b5998", light:"#6d84b4", top:"", tophover:"" })')));