// ==UserScript==
// @name           Scroll by moving a mouse
// @namespace      Scroll_by_moving_a_mouse
// @description    Let's user scroll webpage just by moving a mouse
// @include        *
// @version        1.1
// ==/UserScript==

/* Global variables

   When browsingX = -1 scrolling left
        browsingX =  1 scrolling right
        browsingY = -1 scrolling up
        browsingY =  1 scrolling down
        mouseDown =  scrolling slower
        scrolling =  tells we are scrolling
 */

var browsingX = 0;
var browsingY = 0;
var mouseDown = false;
var scrolling = false;

/* Mouse events script reacts */

document.addEventListener('mousemove', changeState, true);
document.addEventListener('mouseout', stopScrollingIfOutsideWindow, true);
document.addEventListener('mousedown', markMouseDown, true);
document.addEventListener('mouseup', unmarkMouseDown, true);

/* Functions */

function markMouseDown() mouseDown = true;
function unmarkMouseDown() mouseDown = false;

function scrollIfNeeded()
{
  /* If scrolling is turned off, stops loop */
  if (browsingX == 0 && browsingY == 0)
  {
    scrolling = false;
    return;
  }
  /* Scrolling speed is calculated from window's inner measures */
  var scrollYPixels = window.innerHeight*0.01;
  var scrollXPixels = window.innerWidth*0.01;

  /* Sets maximum speed */
  var maximumSpeed = 10
  if (scrollXPixels > maximumSpeed) scrollXPixels = maximumSpeed;
  if (scrollYPixels > maximumSpeed) scrollYPixels = maximumSpeed;

  /* If we are selecting text, we must scroll slower */
  if (mouseDown)
  {
    scrollYPixels /= 2;
    scrollXPixels /= 2;
  }

  /* Scrolls */
  if (browsingY == -1) window.scrollBy(0, -scrollYPixels);
  if (browsingY == 1) window.scrollBy(0, scrollYPixels);
  if (browsingX == -1) window.scrollBy(-scrollXPixels, 0);
  if (browsingX == 1) window.scrollBy(scrollXPixels, 0);

  /* Does new scrolling after 30 ms */
  setTimeout(scrollIfNeeded, 30);
}

function changeState(event)
{
  /* Window's width and window's height are divided in three areas.
     In middle area screen stays stable and on border areas it scrolls.
     Middle area is slightly bigger than border areas */
  if (event.clientY < 1*window.innerHeight/5 && browsingY != -1)
  {
    browsingY = -1;
    if (!scrolling)
    {
      scrolling = true;
      scrollIfNeeded();
    }
  }
  else if (event.clientY >= 1*window.innerHeight/5 && event.clientY <= 4*window.innerHeight/5 && browsingY != 0)
  {
    browsingY = 0;
  }
  else if (event.clientY > 4*window.innerHeight/5 && browsingY != 1)
  {
    browsingY = 1;
    if (!scrolling)
    {
      scrolling = true;
      scrollIfNeeded();
    }
  }
  if (event.clientX < 1*window.innerWidth/5 && browsingX != -1)
  {
    browsingX = -1;
    if (!scrolling)
    {
      scrolling = true;
      scrollIfNeeded();
    }
  }
  else if (event.clientX >= 1*window.innerWidth/5 && event.clientX <= 4*window.innerWidth/5 && browsingX != 0)
  {
    browsingX = 0;
  }
  else if (event.clientX > 4*window.innerWidth/5 && browsingX != 1)
  {
    browsingX = 1;
    if (!scrolling)
    {
      scrolling = true;
      scrollIfNeeded();
    }
  }
}

function stopScrollingIfOutsideWindow(event)
{
  /* If mouse goes over element that isn't undefined
     we know, that it is still in window */
  if (event.relatedTarget) return;

  /* Else stop scrolling */
  browsingY = 0;
  browsingX = 0;
}