// ==UserScript==
// @name           FetLife friend notes
// @namespace      kirr.fetlife
// @description    Add notes to yourself about other FetLife users.
// @include        https://fetlife.com/users/*
// @exclude        https://fetlife.com/users/*/*
// @author         Kirr (https://fetlife.com/kirr)
// @url            https://fetlife.com/users/27238/posts/498502
// ==/UserScript==

// Workaround for Chromium.
if (!this.GM_getValue || 
    (this.GM_getValue.toString && 
     this.GM_getValue.toString().indexOf("not supported")>-1))
{
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}

/* Figure out their user number from the URL.
 * The reason for the first match is to ensure that we're really at the 
 * correct URL (which *should* be ensured by the @include/@excludes, but
 * it doesn't hurt to make sure).
 */
var url=location.href.match('^https://fetlife.com/users/[0-9]+(#.*|)$')[0];
var userkey;
if(url)
{
  var usernum=url.match(/[0-9]+/)[0];
  userkey="note_"+usernum;
} else {
  userkey=null;
}

/* Standard element creation code, taken from the GreaseMonkey wiki.
 */
function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
    el = document.createTextNode(elObj);
  }
  else {
    el = document.createElement(elObj.n);
    if (elObj.a) {
      var attributes = elObj.a;
      for (var key in attributes) if (attributes.hasOwnProperty(key)) {
        if (key.charAt(0) == '@')
          el.setAttribute(key.substring(1), attributes[key]);
        else 
          el[key] = attributes[key];
      }
    }
    if (elObj.evl) {
      el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
    }
    if (elObj.c) {
      elObj.c.forEach(function (v, i, a) { createEl(v, el); });
    }
  }
  if (parent)
    parent.appendChild(el);
  return el;
}

/* Called when a user clicks on the note, to "turn it into a textbox"
 * (actually just hides the text and shows the textbox, updating the
 * contents of the box).
 */
function edit_note()
{
  var flnote_text=document.getElementById('gm_flnote_text');
  var flnote_form=document.getElementById('gm_flnote_form');
  var flnote_form_text=document.getElementById('gm_flnote_form_text');

  flnote_text.style.display='none';
  flnote_form.style.display='block';
  flnote_form_text['value']=flnote_text['textContent'];

  return false;
}

/* Handler for the "cancel" button. */
function revert_note()
{
  var flnote_text=document.getElementById('gm_flnote_text');
  var flnote_form=document.getElementById('gm_flnote_form');
  var flnote_form_text=document.getElementById('gm_flnote_form_text');

  flnote_text.style.display='block';
  flnote_form.style.display='none';
  document.getElementById('gm_flnote_form').style.display='none';

  return false;
}

/* Save the note and leave edit mode. */
function save_note()
{
  var flnote_form_text=document.getElementById('gm_flnote_form_text');
  var flnote_text=document.getElementById('gm_flnote_text');
  var note=flnote_form_text['value'];

  flnote_text['textContent']=note;
  GM_setValue(userkey,note);

  arguments[0].preventDefault();
  return revert_note();
}

/* Delete the note and leave edit mode. */
function delete_note()
{
  if(confirm("Delete the note for this person?"))
  {
    var flnote_text=document.getElementById('gm_flnote_text');

    flnote_text['textContent']='';
    GM_deleteValue(userkey);
    return revert_note();
  }
}

/* If something went wrong in determining the user's number, don't try
 * to insert the code; just leave the page as it is.
 */
if(userkey)
{
  /* Tables are only used in displaying profile fields, but things
   * like orientation are in a different table from things like
   * relationship status. The second table will always be the one we
   * want to add to.
   */
  var proptab = document.getElementsByTagName("table")[1];

  /*
   * Now that we know where to insert the note field, do it!
   */
  createEl(
    // New row in the table
    {n:'tr',c:[
       // The heading of the table, which says "notes:"
       {n:'th',
        a:{textContent:'notes:', width:'100'},
        evl: {type: 'click', f: edit_note}},
       /* The contents, which has both the text itself and the form
        * for editing it, but only one is visible at a time. Styles
        * cannot be set here, so it's hidden with code below.
        */
       {n:'td', c:[
          // The note itself.
          {n:'div',
           a:{textContent:GM_getValue(userkey,''),
              id:'gm_flnote_text'},
           evl: {type: 'click', f: edit_note}},
          // The edit box for the note, and its containing form.
          {n:'form', a:{id:'gm_flnote_form',action:'#'}, 
           evl: {type:'submit',f:save_note},
           c:[
             // The box itself.
             {n:'input', a:{type:'text',legth:300,
                            id:'gm_flnote_form_text'}},
             {n:'input', a:{type:'submit', value: 'save'}},
             " ",
             // The cancel button.
             {n:'a',a:{textContent:'cancel', href:'#', 
                       className:'quiet smallest'},
              evl: {type:'click',f:revert_note}},
             " ",
             // The delete button.
             {n:'a',a:{textContent:'delete', href:'#', 
                       className:'quiet smallest'},
              evl: {type:'click',f:delete_note}}
           ]}
        ]}
     ]},proptab);
  // Hide the edit box.
  document.getElementById('gm_flnote_form').style.display='none';
}
