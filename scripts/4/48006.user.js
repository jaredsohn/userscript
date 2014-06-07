// ==UserScript==
// @name           FB Attack
// @namespace      quangntenemy
// @include        http://forumwarz.com/discussions/view/*
// @include        http://*.forumwarz.com/discussions/view/*
// ==/UserScript==
$ = unsafeWindow["window"].$;
$$ = unsafeWindow["window"].$$;
Element = unsafeWindow["window"].Element;
Effect = unsafeWindow["window"].Effect;
Insertion = unsafeWindow["window"].Insertion;
Class = unsafeWindow["window"].Class;
Object = unsafeWindow["window"].Object;

var style = document.createElement("link");
style.href = "http://www.forumwarz.com/stylesheets/battle.css";
style.type = "text/css";
style.media = "screen";
style.rel= "Stylesheet";
document.getElementsByTagName("head")[0].appendChild(style);

var Battle = {
  digit_count : 0,
  bounce_numbers: function(details) {
    var delta = details.value
    
    klass = "digit"
    prepend = ""
    if (details.colour != null) {
      klass += "_" + details.colour
      prepend = details.colour + "_"
    }
    
    var str = "" + Math.abs(delta)
    if (str.length > 5)
      str = "99999"
    
    var x = (Math.random() * (details.left - details.right)) + details.left
    var y = details.top + (Math.random() - 0.5) * 50
    
    for(var i=0; i < str.length; i++)
    {
      var value = parseInt(str.charAt(i))
      this.digit_count = this.digit_count + 1
      
      // We now create every digit
      var digit_html = "<div id='digit_" + this.digit_count + "' class='" + klass + " " + prepend + "number" + value + "' style='display:none;'></div>"
      Insertion.Top("main_area", digit_html)
      var digit = $("digit_" + this.digit_count)
      digit.setStyle({left : x + "px", top: y + "px"})
      x = x + digit.getWidth() + 2
      Effect.NumberBounce(digit)
    }

  }
}

Effect.Bounce = function (element, options) {
  //element = $(element)

  var fade = false
  if (options && options.fade)
    fade = true
    
  var sf = 1
  if (options && options.sf)
    sf = options.sf

  element.show()
  var orig_top = element.getStyle('top')
  
  return Effect.MoveBy(element,
    -50 * sf, 0, { duration: 0.2, afterFinishInternal: function(effect) {
  Effect.MoveBy(effect.element,
    50 * sf, 0, { duration: 0.2, afterFinishInternal: function(effect) {
  Effect.MoveBy(effect.element,
    -10 * sf, 0, { duration: 0.1, afterFinishInternal: function(effect) {
  Effect.MoveBy(effect.element,
    10 * sf, 0, { duration: 0.1, afterFinishInternal: function(effect) {
    element.setStyle({top:orig_top})
    if (fade)
      setTimeout(function () { Effect.Fade(element, {duration: 0.5, afterFinish: function () {
        if (options && options.kill)
          element.replace("")
      }}) }, 500)
  }}) }}) }}) }});
}

Effect.NumberBounce = function(element) {
  Effect.Bounce(element, {fade:true, kill:true})
}

Effect.ForumShake = function(element, options) {
  //element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left') 
  };
        
  return Effect.MoveBy(element, 
    0, 10, { duration: 0.05, afterFinishInternal: function(effect) {
  Effect.MoveBy(effect.element,
    0, -10, { duration: 0.1,  afterFinishInternal: function(effect) {
  Effect.MoveBy(effect.element,
    0, 10, { duration: 0.1,  afterFinishInternal: function(effect) {
  Effect.MoveBy(effect.element,
    0, -10, { duration: 0.05, afterFinishInternal: function(effect) {
      effect.element.undoPositioned();
      effect.element.setStyle(oldStyle);
      if (options.afterFinish) { options.afterFinish() }
  }}) }}) }}) }});
}

function findParentDiv(element) {
  while (element.parentNode) {
    element = element.parentNode;
    if (element.tagName.toUpperCase() == "DIV") return element;
  }
}

function findNextDivs(element) {
  element = element.parentNode;
  while (element.nextSibling) {
    element = element.nextSibling;
    if (element.tagName && element.tagName.toUpperCase() == "TD") break;
  }
  return element.getElementsByTagName("div");
}

$$("td.hiddenTd img").each(function (element) {
  element.onclick = function(e) {
    var dmg = Math.floor(Math.random() * 10000);
    Battle.bounce_numbers({"value": dmg, "left": 300, "right": 375, "top": e.clientY});
    var parent = findParentDiv(element);
    if (parent) Effect.ForumShake(parent,{afterFinish:function() { }});
    /*var next = findNextDivs(parent);
    Effect.ForumShake(next[0],{afterFinish:function() { }});
    Effect.ForumShake(next[1],{afterFinish:function() { }});*/
  };
});
