// ==UserScript==
// @name           Drop Down Menu Bar (dropdown.js)
// @author         Ashish Jain
// @provided by    http://www.orkut.com/Profile.aspx?uid=9231785569428894372
// @description    new features added by Ashish Jain.
// @include        *.orkut.com/Scrap.aspx*
// ==/UserScript==

function at_display(x)
{
  var win = window.open();
  for (var i in x) win.document.write(i+' = '+x[i]+'<br>');
}

// ***** Show Aux *****

function at_show_aux(parent, child)
{
  var p = document.getElementById(parent);
  var c = document.getElementById(child );

  var top  = (c["at_position"] == "y") ? p.offsetHeight+2 : 0;
  var left = (c["at_position"] == "x") ? p.offsetWidth +2 : 0;

  for (; p; p = p.offsetParent)
  {
    top  += p.offsetTop;
    left += p.offsetLeft;
  }

  c.style.position   = "absolute";
  c.style.top        = top +'px';
  c.style.left       = left+'px';
  c.style.visibility = "visible";
}

// ***** Show *****

function at_show()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);

  at_show_aux(p.id, c.id);

  clearTimeout(c["at_timeout"]);
}

// ***** Hide *****

function at_hide()
{
  var c = document.getElementById(this["at_child"]);

  c["at_timeout"] = setTimeout("document.getElementById('"+c.id+"').style.visibility = 'hidden'", 333);
}

// ***** Click *****

function at_click()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);

  if (c.style.visibility != "visible")
       at_show_aux(p.id, c.id);
  else c.style.visibility = "hidden";

  return false;
}

// ***** Attach *****

// PARAMETERS:
// parent   - id of visible html element
// child    - id of invisible html element that will be dropdowned
// showtype - "click" = you should click the parent to show/hide the child
//            "hover" = you should place the mouse over the parent to show
//                      the child
// position - "x" = the child is displayed to the right of the parent
//            "y" = the child is displayed below the parent
// cursor   - Omit to use default cursor or check any CSS manual for possible
//            values of this field

function at_attach(parent, child, showtype, position, cursor)
{
  var p = document.getElementById(parent);
  var c = document.getElementById(child);

  p["at_parent"]     = p.id;
  c["at_parent"]     = p.id;
  p["at_child"]      = c.id;
  c["at_child"]      = c.id;
  p["at_position"]   = position;
  c["at_position"]   = position;

  c.style.position   = "absolute";
  c.style.visibility = "hidden";

  if (cursor != undefined) p.style.cursor = cursor;

  switch (showtype)
  {
    case "click":
      p.onclick     = at_click;
      p.onmouseout  = at_hide;
      c.onmouseover = at_show;
      c.onmouseout  = at_hide;
      break;
    case "hover":
      p.onmouseover = at_show;
      p.onmouseout  = at_hide;
      c.onmouseover = at_show;
      c.onmouseout  = at_hide;
      break;
  }
}
