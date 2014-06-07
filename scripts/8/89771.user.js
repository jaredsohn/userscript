// ==UserScript==
// @name          مختصر العبارات المكررة
// @version       1.2.2
// @author        Renter-ناصر حمد الموسى (http://xn--ngbkm1f.com/)
// @description   مهمة هذا السكربت هو توفير وقتك الذي تقضيه في كتابة عبارات مكررة .. فيقوم بحفظ العبارات التي تكررها كثيراً "يجب أن تدخلها بنفسك" مثل عبارات الشكر وغيرها ويعطيك خيار استرجاعها في أي وقت من قائمة منسدلة تحتوي على عناوين عباراتك
// @namespace     http://xn--ngbkm1f.com/
// @homepage      http://xn--ngbkm1f.com/
// @copyright     2010-2011, Renter ناصر حمد الموسى (http://xn--ngbkm1f.com/)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.tribalwars.ae/*screen=memo*
// @include       http://*.tribalwars.ae/*answer=true*
// @include       http://*.tribalwars.ae/*edit_post_id*
// @include       http://*.tribalwars.ae/*mode=new_thread*
// @include       http://*.tribalwars.ae/*mode=new_poll*
// @include       http://*.tribalwars.ae/*screen=mail*mode=new*
// @include       http://*.tribalwars.ae/*screen=mail*mode=view*
// @include       http://*.tribalwars.ae/*screen=ally*mode=overview*
// @include       http://*.tribalwars.ae/*screen=ally*mode=properties*
// @exclude       http://forum.tribalwars.ae/*
// ==/UserScript==



/*

############## Distribution Information ##############

هذا السكربت من برمجة المبرمج C1B1.. وتعريب اخوكم Renter - ناصر حمد الموسى
إن حذف الشعار اسفل كلمة logo يمنع السكربت من العمل .. لذلك لا تقم بفعل هذا

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

اذا كان لديك أي استفسار ، تستطيع الاتصال بالمبرمج ناصر حمد الموسى عن طريق أحد العناوين التالية

         البريد الالكتروني : mr.mob7er@hotmail.com

         skype-سكايبي:Ping-SA

         موقعي : http://xn--ngbkm1f.com/

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


##################### Description ####################

@http://userscripts.org/scripts/show/40236

مهمة هذا السكربت هو توفير وقتك الذي تقضيه في كتابة عبارات مكررة .. فيقوم بحفظ العبارات التي تكررها كثيراً "يجب أن تدخلها بنفسك" مثل عبارات الشكر وغيرها ويعطيك خيار استرجاعها في أي وقت من قائمة منسدلة تحتوي على عناوين عباراتك
Screenshot: http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.GM_UserTexts_0.png

*/

const standard = new Array('مشغول;-;[b][color="red"]آسف .. لست متفرغاً حالياً ،![/color][/b]');


var kasten = getTextArea();
if(kasten !== false)
  {
  // Get Data
  var userTexts = GM_getValue('userText');
  if(!userTexts || typeof(userTexts) != 'string')
    {
    var userTexts = standard;
    }
  else
    {
    userTexts = unserialize(userTexts);
    if(!userTexts)
      {
      var userTexts = standard;
      }
    }

  var div = document.createElement("div");

  var select = document.createElement('select');
  select.setAttribute('id','userTextsSelector');

  var option = document.createElement('option');
  option.setAttribute('value','default');
  option.appendChild(document.createTextNode('عباراتي : '));
  select.appendChild(option);

  for(var i = 0; i < userTexts.length; i++)
    {
    var attribute = userTexts[i].split(';-;');
    attribute = attribute[0];
    var tmp = userTexts[i];
    var gone = tmp.substring(0,(tmp.indexOf(';-;')+3));
    tmp = tmp.replace(gone,'');

    var option = document.createElement('option');
    option.setAttribute('value',tmp);
    option.appendChild(document.createTextNode(attribute));
    select.appendChild(option);
    }

  addEvent(select,'change',function() { insert(this.options[this.selectedIndex].value,''); } );
  addEvent(select,'mouseout',function() { setSelect(this,'default'); } );

  div.appendChild(select);

  var changeButton = new Image();
  changeButton.src = 'data:image/png;base64,' +
  'iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAMAAACuAq9NAAAAYFBMVEX///+3o1UAAADEURmbm5v7' +
  '44Tp5dfo0nj234K8tJPQw46rp5e0tLQkKy7Qw4/334G0qYH334Po0nmgoKD234H334Lw2oRaWlr4' +
  '4IPw24TRw4344ILZyYetra3q1oion30N4ghpAAAAAXRSTlMAQObYZgAAAFFJREFUeF5NykUSgEAM' +
  'BdH5yRjubve/JbAIoXevqo3GbH5Z/tvSw0KU1h2YSeRKgERZNZyYPrkmtBAlfRyhcjGo7DYvWEUm' +
  '3wMOlb/eU+lJdQPaHwKa0lLiLAAAAABJRU5ErkJggg==';
  addEvent(changeButton,'click',toogleEditWindow);
  changeButton.setAttribute('align','bottom');
  changeButton.setAttribute('alt','تعديل/اضافة');
  changeButton.setAttribute('title','Edit');
  changeButton.setAttribute('style','cursor:pointer; ');
  div.appendChild(changeButton);

  kasten.parentNode.insertBefore(div,kasten);
  }

function setSelect(e,value)
  {
  var type = value;
  for (i = 0; i < e[0].length; i++)
    if(e.options[i].selected == true)
      e.options[i].selected = false;
  for (i = 0; i < e.length; i++)
    if(e.options[i].value == type)
      e.options[i].selected = true;
  }


function toogleEditWindow()
  {
  if(document.getElementById('editWindow'))
    {
    if(document.getElementById('editWindow').style.display == 'none')
      document.getElementById('editWindow').style.display = 'block';
    else
      document.getElementById('editWindow').style.display = 'none';
    }
  else
    {
    var editWindow = document.createElement('div');
    editWindow.setAttribute('style','opacity:0.9; position:fixed; top:20%; left:50%; background-color:#cccccc; -moz-border-radius:10px; border:#888888 outset 2px; padding:0px; ');
    editWindow.setAttribute('id','editWindow');


    var titleBar = document.createElement('div');
    titleBar.setAttribute('style','height:20px; font-size:15px; background-color:#999999; border-bottom:1px #777777 solid; padding:0px; ');
    titleBar.setAttribute('id','titleBar');
    titleBar.appendChild(document.createTextNode('الخيارات'));
    editWindow.appendChild(titleBar);

    var a = document.createElement('a');
    a.setAttribute('href','http://xn--ngbkm1f.com/');
    a.setAttribute('style','color:#4169e1; text-align:right; font-size:x-small; margin-right:2px; display:block; ');
    a.appendChild(document.createTextNode('مع تحيات اخوكم ناصر - Renter'));
    editWindow.appendChild(a);

    editWindow.appendChild(document.createElement('br'));
    editWindow.appendChild(document.createTextNode('اضافة / تعديل العبارات :'));


    var editBox = document.createElement('div');
    editBox.setAttribute('id','editBox');
    editBox.setAttribute('style','padding:10px; ');
    editWindow.appendChild(editBox);

    document.getElementsByTagName('body')[0].appendChild(editWindow);


    var editBox = document.getElementById('editBox');
    var table = document.createElement('table');

    var i = 0;

    for(var a = 0; a < userTexts.length; a++)
      {
      var attribute = userTexts[i].split(';-;');
      attribute = attribute[0];
      var tmp = userTexts[i];
      var gone = tmp.substring(0,(tmp.indexOf(';-;')+3));
      tmp = tmp.replace(gone,'');

      var td1 = document.createElement('td');
      var td2 = document.createElement('td');

      var name = document.createElement('input');
      name.setAttribute('type','text');
      name.setAttribute('value',attribute);
      name.setAttribute('name','psut_name');

      var text = document.createElement('textarea');
      name.setAttribute('rows','3');
      text.innerHTML = tmp;
      text.setAttribute('name','psut_text');

      td1.appendChild(name);
      td2.appendChild(text);

      var tr = document.createElement('tr');

      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
      i++;
      }

    editBox.appendChild(table);

    var addButton = document.createElement('input');
    addButton.setAttribute('type','button');
    addButton.setAttribute('id','addButton');
    addButton.setAttribute('value','أضف عبارة');
    addEvent(addButton,'click',addPairTo);
    editBox.appendChild(addButton);

    var saveButton = document.createElement('input');
    saveButton.setAttribute('type','button');
    saveButton.setAttribute('value','حفظ');
    addEvent(saveButton,'click',saveToGM);
    editBox.appendChild(saveButton);

    var cancelButton = document.createElement('input');
    cancelButton.setAttribute('type','button');
    cancelButton.setAttribute('value','إلغاء الأمر');
    addEvent(cancelButton,'click',cancel);
    editBox.appendChild(cancelButton);

    var resetButton = document.createElement('input');
    resetButton.setAttribute('type','button');
    resetButton.setAttribute('value','الافتراضي');
    addEvent(resetButton,'click',resetValues);
    editBox.appendChild(resetButton);

    dragable(editWindow,22);

    }
  }

function cancel()
  {
  document.getElementById('editWindow').parentNode.removeChild(document.getElementById('editWindow'));
  }

function resetValues()
  {
  var x = confirm('سأقوم الآن بإعادة السكربت كما كان فور تركيبه ، أي انني سأحذف جميع العبارات المحذوفة ، لا يوجد وسيلة لاستعادة العبارات مرة أخرى .... الا زلت متأكداً وتريد الاستمرار؟');
  if(x)
    {
    GM_setValue('userText','');
    cancel();
    alert('Diese '+String.fromCharCode('0196')+'nderungen ben'+String.fromCharCode('0246')+'tigen ein Neuladen der Seite!');
    }
  }

function addPairTo()
  {
  if(!document.getElementById('editBox'))
    return false;

  var editBox = document.getElementById('editBox');
  var table = editBox.getElementsByTagName('table')[0];

  var name = document.createElement('input');
  name.setAttribute('type','text');
  name.setAttribute('name','psut_name');

  var text = document.createElement('textarea');
  name.setAttribute('rows','3');
  text.setAttribute('name','psut_text');

  var td1 = document.createElement('td');
  var td2 = document.createElement('td');

  td1.appendChild(name);
  td2.appendChild(text);
  var tr = document.createElement('tr');

  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);

  editBox.insertBefore(div,document.getElementById('addButton'));
  }

function saveToGM()
  {
  if(!document.getElementById('editBox'))
    return false;

  var names = document.getElementsByName('psut_name');
  var texts = document.getElementsByName('psut_text');
  var userTexts = new Array();

  for(var i = 0; i < names.length; i++)
    {
    var name = names[i].value;
    var text = texts[i].value;
    userTexts[i] = name+';-;'+text;
    }
  GM_setValue('userText',serialize(userTexts));
  toogleEditWindow();
  alert('الحمدلله ، استطعت حفظ التغييرات التي أجريتها');
  }

function dragable(element,pixel)
  {
  var click_position,
  clone = false,
  active = false,
  cursor,
  ref = element,
  y = 0,
  x = 0,
  current_position = [];
  while(ref)
    x += ref.offsetLeft + ref.clientLeft,ref = ref.offsetParent;
  current_position.push(x);
  ref = element;
  while(ref)
    y += ref.offsetTop + ref.clientTop,ref = ref.offsetParent;
  current_position.push(y);
  if(element.style.position != 'absolute' && element.style.position != 'fixed') {
    var placeholder = element.parentNode.insertBefore(element.cloneNode(true),element);
    placeholder.innerHTML = '';
    placeholder.style.height = element.clientHeight+'px';
    placeholder.style.width = element.clientWidth+'px'; }
  with(element) {
    style.position = 'absolute';
    style.left = current_position[0] + 'px';
    style.top = current_position[1] + 'px';
    addEventListener('mousedown',function(e) {
      if(clone) { try {
        clone.parentNode.removeChild(clone);
        clone = false; } catch(e){} }
      current_position[0] = parseInt(this.style.left);
      current_position[1] = parseInt(this.style.top);
      click_position = [e.pageX - current_position[0],e.pageY - current_position[1]];
      if(pixel?(click_position[1] > pixel):(click_position[1] > this.clientHeight / 7))
        return;
      clone = element.cloneNode(true);
      element.parentNode.insertBefore(clone,element);
      element.style.opacity = 0.5;
      cursor = this.style.cursor?this.style.cursor:'default';
      this.style.cursor = 'move';
      active = true;
      },false);
    addEventListener('mouseup',function() {
      this.style.cursor = cursor;
      active = false;
      this.style.opacity = 1.0;
      try { clone.parentNode.removeChild(clone); clone = false; } catch(e){};
      },false);
    }
  document.addEventListener('mousemove',function(e) {
    if(active)
      with(element) {
        style.left = (e.pageX - click_position[0]) + 'px';
        style.top = (e.pageY - click_position[1]) + 'px'; }
    },false);
  }



// Stolen Code:
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
function insert(aTag, eTag) {
var input=getTextArea();
input.focus();
if(typeof input.selectionStart != 'undefined')
{
// Einf&uuml;gen des Formatierungscodes //
var start = input.selectionStart;
var end = input.selectionEnd;
var insText = input.value.substring(start, end);
input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);
// Anpassen der Cursorposition //
var pos;
if (insText.length == 0) {
pos = start + aTag.length;
}
else
{
pos = start + aTag.length + insText.length + eTag.length;
}
input.selectionStart = pos;
input.selectionEnd = pos;
}
}

// Stolen Code:
// http://userscripts.org/scripts/review/24251
function getTextArea(){
if(document.getElementsByName("message")[0])
  return document.getElementsByName("message")[0];
else if(document.getElementsByName("text")[0])
  return document.getElementsByName("text")[0];
else if(document.getElementsByName("intern")[0])
  return document.getElementsByName("intern")[0];
else if(document.getElementsByName("personal_text")[0])
  return document.getElementsByName("personal_text")[0];
else if(document.getElementsByName("desc_text")[0])
  return document.getElementsByName("desc_text")[0];
else if(document.getElementsByName("memo")[0])
  return document.getElementsByName("memo")[0];
else
  return false;
}

// Stolen Code:
// Flexible Javascript Events by John Resig (ejohn.org)
// http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}

// Stolen Code:
function serialize( inp ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'

    var getType = function( inp ) {
        var type = typeof inp, match;
        if(type == 'object' && !inp)
        {
            return 'null';
        }
        if (type == "object") {
            if(!inp.constructor)
            {
                return 'object';
            }
            var cons = inp.constructor.toString();
            if (match = cons.match(/(\w+)\(/)) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {
                if (cons == types[key]) {
                    type = types[key];
                    break;
                }
            }
        }
        return type;
    };

    var type = getType(inp);
    var val;
    switch (type) {
        case "undefined":
            val = "N";
            break;
        case "boolean":
            val = "b:" + (inp ? "1" : "0");
            break;
        case "number":
            val = (Math.round(inp) == inp ? "i" : "d") + ":" + inp;
            break;
        case "string":
            val = "s:" + inp.length + ":\"" + inp + "\"";
            break;
        case "array":
            val = "a";
        case "object":
            if (type == "object") {
                var objname = inp.constructor.toString().match(/(\w+)\(\)/);
                if (objname == undefined) {
                    return;
                }
                objname[1] = serialize(objname[1]);
                val = "O" + objname[1].substring(1, objname[1].length - 1);
            }
            var count = 0;
            var vals = "";
            var okey;
            for (key in inp) {
                okey = (key.match(/^[0-9]+$/) ? parseInt(key) : key);
                vals += serialize(okey) +
                        serialize(inp[key]);
                count++;
            }
            val += ":" + count + ":{" + vals + "}";
            break;
    }
    if (type != "object" && type != "array") val += ";";
    return val;
}

function unserialize ( inp ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // +   improved by: Pedro Tainha (http://www.pedrotainha.com)
    // +   bugfixed by: dptr1988
    // *     example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld']

    error = 0;
    if (inp == "" || inp.length < 2) {
        errormsg = "input is too short";
        return;
    }
    var val, kret, vret, cval;
    var type = inp.charAt(0);
    var cont = inp.substring(2);
    var size = 0, divpos = 0, endcont = 0, rest = "", next = "";

    switch (type) {
    case "N": // null
        if (inp.charAt(1) != ";") {
            errormsg = "missing ; for null";
        }
        // leave val undefined
        rest = cont;
        break;
    case "b": // boolean
        if (!/[01];/.test(cont.substring(0,2))) {
            errormsg = "value not 0 or 1, or missing ; for boolean";
        }
        val = (cont.charAt(0) == "1");
        rest = cont.substring(2);  //changed...
        break;
    case "s": // string
        val = "";
        divpos = cont.indexOf(":");
        if (divpos == -1) {
            errormsg = "missing : for string";
            break;
        }
        size = parseInt(cont.substring(0, divpos));
        if (size == 0) {
            if (cont.length - divpos < 4) {
                errormsg = "string is too short";
                break;
            }
            rest = cont.substring(divpos + 4);
            break;
        }
        if ((cont.length - divpos - size) < 4) {
            errormsg = "string is too short";
            break;
        }
        if (cont.substring(divpos + 2 + size, divpos + 4 + size) != "\";") {
            errormsg = "string is too long, or missing \";";
        }
        val = cont.substring(divpos + 2, divpos + 2 + size);
        rest = cont.substring(divpos + 4 + size);
        break;
    case "i": // integer
    case "d": // float
        var dotfound = 0;
        for (var i = 0; i < cont.length; i++) {
            cval = cont.charAt(i);
            if (isNaN(parseInt(cval)) && !(type == "d" && cval == "." && !dotfound++)) {
                endcont = i;
                break;
            }
        }
        if (!endcont || cont.charAt(endcont) != ";") {
            errormsg = "missing or invalid value, or missing ; for int/float";
        }
        val = cont.substring(0, endcont);
        val = (type == "i" ? parseInt(val) : parseFloat(val));
        rest = cont.substring(endcont + 1);
        break;
    case "a": // array
        if (cont.length < 4) {
            errormsg = "array is too short";
            return;
        }
        divpos = cont.indexOf(":", 1);
        if (divpos == -1) {
            errormsg = "missing : for array";
            return;
        }
        size = parseInt(cont.substring(1*divpos, 0));  //changed...
        cont = cont.substring(divpos + 2);
        val = new Array();
        if (cont.length < 1) {
            errormsg = "array is too short";
            return;
        }
        for (var i = 0; i + 1 < size * 2; i += 2) {
            kret = unserialize(cont, 1);
            if (error || kret[0] == undefined || kret[1] == "") {
                errormsg = "missing or invalid key, or missing value for array";
                return;
            }
            vret = unserialize(kret[1], 1);
            if (error) {
                errormsg = "invalid value for array";
                return;
            }
            val[kret[0]] = vret[0];
            cont = vret[1];
        }
        if (cont.charAt(0) != "}") {
            errormsg = "missing ending }, or too many values for array";
            return;
        }
        rest = cont.substring(1);
        break;
    case "O": // object
        divpos = cont.indexOf(":");
        if (divpos == -1) {
            errormsg = "missing : for object";
            return;
        }
        size = parseInt(cont.substring(0, divpos));
        var objname = cont.substring(divpos + 2, divpos + 2 + size);
        if (cont.substring(divpos + 2 + size, divpos + 4 + size) != "\":") {
            errormsg = "object name is too long, or missing \":";
            return;
        }
        var objprops = unserialize("a:" + cont.substring(divpos + 4 + size), 1);
        if (error) {
            errormsg = "invalid object properties";
            return;
        }
        rest = objprops[1];
        var objout = "function " + objname + "(){";
        for (key in objprops[0]) {
            objout += "this['" + key + "']=objprops[0]['" + key + "'];";
        }
        objout += "}val=new " + objname + "();";
        eval(objout);
        break;
    default:
        errormsg = "invalid input type";
    }
    return (arguments.length == 1 ? val : [val, rest]);
}