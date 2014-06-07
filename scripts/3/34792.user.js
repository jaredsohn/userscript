// ==UserScript==
// @name           Ikariam Pillage Assistant
// @namespace      overkill_gm
// @include        http://*.ikariam.org/index.php?view=plunder&*
// @version    2
//@homepage  http://userscripts.org/scripts/show/34792
// ==/UserScript==


function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);}

$ = document.getElementById;
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}
function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}
function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}
function onClick(node, fn, capture, e) {
  node.addEventListener((e||"") + "click", fn, !!capture);
}



function _handleCheckbox(){
  if (this.checked) {
    var plunderForm = { ts:Date.now() };
    var inputs = $x("//form[@id='plunderForm']/div//input[@class='textfield']");
    var j = 0;
    for (var i = 0; i<inputs.length; ++i){
      if (inputs[i].value != "0") {
        plunderForm[inputs[i].name] = inputs[i].value;
        ++j;
      }
    }
    if (j) {  // army was found
      plunders[destinationCityId] = plunderForm;
      GM_setValue('plunders',uneval(plunders));
      pillageTimer = setTimeout(pillage,1000);
      //debug(uneval(plunderForm));
    } else {
      $('overkill_memorizeThis').checked = false;
      alert("Can't memorize a non-existent army");
    }
  } else {
    clearTimeout(pillageTimer);
    $('overkill_pillageCountdown').innerHTML = "pillage halted";
    if (plunders[destinationCityId]) { delete plunders[destinationCityId]; }
    GM_setValue('plunders',uneval(plunders));
    //debug("removed: " + destinationCityId);
  }
}

function addCheckBox(){
  var cd = $('missionSummary').appendChild(node('div','',{fontSize:'16pt',textAlign:'center',width:'260px',margin:'0 auto'}));
  cd.id = "overkill_pillageCountdown";

  var cb = $('missionSummary').appendChild(node('div','',{width:'260px',margin:'0 auto'},'<input type="checkbox" id="overkill_memorizeThis"/> Memorize This Form?'));
  cb = $X("./input",cb);   // doesn't seem very elegant, but works
  onClick(cb,_handleCheckbox);

  return cb;
}

function prefillForm(){
  var plunderForm,elem;
  if (plunderForm = plunders[destinationCityId]) {
    cb.checked = true;
    var cd = $('overkill_pillageCountdown');
    for (var input in plunderForm){
      //var form = $X("//form[@id='plunderForm']");
      //if (elem = form[input]) {
      if (elem = $X("//form[@id='plunderForm']/div//input[@name='"+input+"']")) {
        elem.value = plunderForm[input];
      }
    }
    pillageTimer = setTimeout(pillage,1000);
  }
}

function pillage(){
  var cd = parseInt($('overkill_pillageCountdown').innerHTML,10);
  if (!cd) {  // cd == NaN
    $('overkill_pillageCountdown').innerHTML = 5;
    pillageTimer = setTimeout(pillage,1000);
  }
  else if (cd > 1)
  {
    $('overkill_pillageCountdown').innerHTML = cd-1;
    pillageTimer = setTimeout(pillage,1000);
  }
  if (cd == 1)
  {
    $('overkill_pillageCountdown').innerHTML = "PILLAGE!";
    clearTimeout(pillageTimer);
    var form = $X("//form[@id='plunderForm']");
    form.submit();
  }
}


// main
var pillageTimer;
var destinationCityId = $X("//form[@id='plunderForm']/input[@name='destinationCityId']").value;
var plunders = eval(GM_getValue('plunders','({})'));
var cb = addCheckBox();
prefillForm();