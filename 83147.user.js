// ==UserScript==
// @name           Pointer Gestures
// @namespace      pointer-gestures
// @description    Mouse/Pen Pointer Gestures
// @include        *
// ==/UserScript==

/**
* CONFIG
*/
minimum_displacement=50; // in pixel
maximum_tap_displacement=5; // in pixel
maximum_not_moving_displacement=maximum_tap_displacement;
diagonal_tolerance=0.5; // percent
maximum_stroke_interval=300; // ms
maximum_tap_interval=300; // ms
scroll_allowance=50; // pixel
minimum_to_hold=300;

function pen_down(e) {
  var coords={x:e.clientX,y:e.clientY}
  var gesture=[]
  pen_down_={}
  pen_move_=null
  pen_move_start_=null
  pen_down_.coords=coords;
  pen_down_.timestamp=timestamp();
  e.real_target=e.target;
  pen_down_.selected_text=get_selected_text();
  if (pen_down_.selected_text) {
    google_search_.q=pen_down_.selected_text;
    gesture.push('pendown[with-selected-text]');
  }
  else
  if (e.real_target.href===undefined) {
    for (var x=1; x<=5; x++) {
      if (e.real_target.href) {
        break;
      }
      if (e.real_target.parentNode)
        e.real_target=e.real_target.parentNode;
      else
        break;
    }
  }
  if (e.real_target.href) {
    //console.log(e.real_target.href);
    gesture.push('pendown[with-href]');
    xPreventDefault(e);
  }
  else {
    e.real_target=e.target;
  }
  gesture.push('pendown');
  new Gesture(gesture);
  pen_down_.e=e;
  pen_move=pen_move_start;
  holder.addEventListener('mousemove',try_pen_move, true);
}


function pen_move_start(e) {
  var coords={x:e.clientX,y:e.clientY}
  var displacement={};
  displacement.x=coords.x-pen_down_.coords.x
  displacement.y=coords.y-pen_down_.coords.y
  displacement.abs_x=Math.abs(displacement.x);
  displacement.abs_y=Math.abs(displacement.y);
  if (displacement.abs_x>maximum_tap_displacement || displacement.abs_y>maximum_tap_displacement) {
    pen_move_start_={};
    pen_move_start_.e=e;
    pen_move_start_.timestamp=timestamp();
    if ((pen_move_start_.timestamp-pen_down_.timestamp)>minimum_to_hold) {
      Gestures.restore();
      new Gesture('hold');
    }
    holder.removeEventListener('mousemove',try_pen_move, true);
  }
}

function pen_up(e) {
  var coords={x:e.clientX,y:e.clientY}
  var displacement={};
  if (!pen_down_)
    return true;
  displacement.timestamp=timestamp();
  displacement.x=coords.x-pen_down_.coords.x
  displacement.y=coords.y-pen_down_.coords.y
  displacement.abs_x=Math.abs(displacement.x);
  displacement.abs_y=Math.abs(displacement.y);
  displacement.hyp=Math.sqrt(Math.pow(displacement.abs_x,2)+Math.pow(displacement.abs_y,2));
  /**
  * Movement too little?
  */
  if (displacement.hyp<minimum_displacement) {
    pen_down_=null
    pen_move_start_=null
    pen_move_=null
    holder.removeEventListener('mousemove',try_pen_move, true);
    if (e.target==e.real_target && !get_selected_text()) {
      return open_tab(e.target.href);
    }
    else {
      ///**
      //* Double / Triple Tap
      //*/
      //if (last_tap && (displacement.timestamp-last_tap.timestamp)<=maximum_tap_interval && get_selected_text()!='' && (displacement.abs_x>=maximum_tap_displacement || displacement.abs_y>=maximum_tap_displacement)) {
      //  google_search();
      //}
      last_tap=displacement;
      return;
    }
  }
  /**
  * Movement too slow?
  */
  if (displacement.timestamp-pen_move_start_.timestamp>maximum_stroke_interval) {
    pen_down_=null
    pen_move_start_=null
    pen_move_=null
    holder.removeEventListener('mousemove',try_pen_move, true);
    displacement.selected_text=get_selected_text();
    last_displacement=displacement;
    return;
  }
  /**
  * HORIZONTAL
  */
  if (displacement.abs_x>displacement.abs_y && (displacement.abs_x-displacement.abs_y)>(displacement.abs_x*diagonal_tolerance)) {
    displacement.abs_direction='horizontal';
    if (displacement.x>0)
      displacement.direction='right';
    else if(displacement.x<0)
      displacement.direction='left';
  }
  /**
  * VERTICAL
  */
  else if (displacement.abs_x<displacement.abs_y && (displacement.abs_y-displacement.abs_x)>(displacement.abs_y*diagonal_tolerance)){
    displacement.abs_direction='vertical';
    if (displacement.y<0)
      displacement.direction='strokeup';
    else if(displacement.y>0)
      displacement.direction='strokedown';
  }
  /**
  * DIAGONAL
  */
  else {
    /**
    * LEFT UP
    */
    if (displacement.x<0 && displacement.y<0)
      displacement.direction='leftup';
    /**
    * LEFT DOWN
    */
    else if (displacement.x<0 && displacement.y>0)
      displacement.direction='leftdown';
    /**
    * RIGHT UP
    */
    else if (displacement.x>0 && displacement.y<0)
      displacement.direction='rightup';
    /**
    * RIGHT DOWN
    */
    else if (displacement.x>0 && displacement.y>0)
      displacement.direction='rightdown';
  }
  xPreventDefault(e);
  new Gesture(displacement.direction);
  new Gesture('penup',maximum_stroke_interval*2);
  last_displacement=displacement;
  pen_down_=null
  pen_move_start_=null
  pen_move_=null
  if (get_selected_text()!='') {
    window.getSelection().removeAllRanges();
  }
  return false;
}

function go2bottom() {
  window.scrollTo(0,document.body.offsetHeight);
}

function page_down() {
  window.scrollBy(0,window.innerHeight-scroll_allowance);
}

function history_back() {
  history.go(-1);
}

function history_forward() {
  history.go(1);
}

function go2top() {
  window.scrollTo(0,0);
}

function page_up() {
  window.scrollBy(0,-(window.innerHeight-scroll_allowance));
}

function go2pendown_href() {
  location.href=pen_down_.e.real_target.href;
}
function default_left_down() {
  pen_right_down=close_window;
  pen_left_down=go2home;
  pen_stroke_up=up1folder;
  pen_right_up=refresh;
  setTimeout(function(){
    pen_right_down=do_nothing;
    pen_left_down=default_left_down;
    pen_stroke_up=page_down;
    pen_right_up=new_tab;
  },maximum_stroke_interval*2);
}

function new_tab() {
  if (pen_down_.e.real_target.href) {
    open_tab(pen_down_.e.real_target.href)
  }
}

function refresh() {
  location.reload();
}

function up1folder() {
  location.href='../';
}

function go2home() {
  location.href='/';
}

function close_window() {
  window.close();
}


function open_tab(url) {
  //console.log(window_number);
  window.open(url,'window'+window_number++)
}
google_search_={};
function google_search() { 
  q=google_search_.q;
  open_tab('http://google.com/search?q='+escape(q));
}
function try_pen_down(e) {
  try {
    pen_down(e);
  }
  catch(e) {
    Gestures.alert('pen down error:'+e);
  }
}

function try_pen_up(e) {
  try {
    pen_up(e);
  }
  catch(e) {
    Gestures.alert('pen up error:'+e);
  }
}

function try_pen_move(e) {
  try {
    pen_move(e);
  }
  catch(e) {
    Gestures.alert('pen move error:'+e);
  }
}

function xPreventDefault(e)
{
  if (e && e.preventDefault) e.preventDefault();
  else if (window.event) window.event.returnValue = false;
}
function get_selected_text()
{
    var txt = '';
     if (window.getSelection)
    {
        txt = window.getSelection();
             }
    else if (document.getSelection)
    {
        txt = document.getSelection();
            }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
            }
    else return '';
  return txt+"";
}

function timestamp() {
  return new Date().getTime();
}
function do_nothing() {
}

do_func_={};
function do_func(name,func) {
  if (func)
    do_func_.name=func;
  else
  if (do_func_.name) {
    do_func_.name();
  }
}

try {
  window_number=window.name.match(/\d+$/)[0]*100;
}
catch(e) {
  window_number=1;
}


function Gesture(displacement,expiration) {
  try {
    var expiration;
    if (!expiration)
      expiration=maximum_stroke_interval;
    Gestures.add(displacement,expiration);
    if (Gestures.valid()) {
      Gestures.execute();
    }
    else {
      //console.log("Invalid: "+Gestures.serialize());
    }
  }
  catch(e) {
    Gestures.alert("New Gesture error: "+e);
  }
}

Gestures=new function() {
  this.sequence=[[]];
  this.funcs={}
  this.reset_timeout=null;
  this.alert_on=false;

  this.add=function(gesture,expiration) {
    if (typeof(gesture)==='string')
      gesture=[gesture];
    var orig_sequence_last_index=this.sequence.length-1;
    for (var x=1; gesture[x]; x++) {
      for (var y=0; y<=orig_sequence_last_index; y++) {
        // [pendown]
        new_sequence=this.sequence[y].slice(0);
        // [pendown,strokeup]
        new_sequence.push(gesture[x]);
        //[pendown/strokeup[with-href],pendown[with-href]/strokeup[with-href]] to [pendown/strokeup[with-href],pendown[with-href]/strokeup[with-href],[pendown,strokeup]]
        this.sequence.push(new_sequence);
      }
    }
    for (var x=0; x<=orig_sequence_last_index; x++) {
      this.sequence[x].push(gesture[0]);
    }
    if (this.reset_timeout)
      clearTimeout(this.reset_timeout);
    this.reset_timeout=setTimeout(this.reset,expiration);
  }
  this.bind=function(sequence,func) {
    var sequence,func;
    this.funcs[sequence]=func;
  }
  this.serialize=function(x){
    if (!x)
      x=0;
    if (!this.sequence[x])
      return false;
    return this.sequence[x].join('/');
  }
  this.valid_serialize=function() {
    for (var x=0; this.serialize(x); x++){
      s=this.serialize(x);
      if (this.funcs[s])
        return s;
    }
    return null;
  }
  this.valid=function() {
    return !!this.valid_serialize();
  }
  this.execute=function() {
    try {
      //console.log("Valid: "+this.serialize());
      this.funcs[this.valid_serialize()]();
      this.reset();
    }
    catch(e) {
      Gestures.alert('Gesture.execute error '+ e);
    }
  }
  this.reset=function() {
    Gestures.previous_sequence=Gestures.sequence;
    Gestures.sequence=[[]];
  }
  this.restore=function(){
    Gestures.sequence=Gestures.previous_sequence;
  }
  this.alert=function(msg) {
    if (Gestures.alert_on==true)
      alert(msg);
  }
}

pen_down_=null
pen_move_=null
pen_move_start_=null
last_tap=null
last_displacement=null

Gestures.alert=true;

Gestures.bind('pendown/strokeup/penup',page_down);
Gestures.bind('pendown/hold/strokeup/penup',go2bottom);
Gestures.bind('pendown/strokedown/penup',page_up);
Gestures.bind('pendown/hold/strokedown/penup',go2top);

Gestures.bind('pendown/left/penup',history_back);
Gestures.bind('pendown/right/penup',history_forward);

Gestures.bind('pendown[with-href]/rightup/penup',new_tab);
Gestures.bind('pendown[with-selected-text]/rightup/penup',google_search);

Gestures.bind('pendown[with-href]/leftup/penup',go2pendown_href);

Gestures.bind('pendown/leftdown/penup/pendown/rightup/penup',refresh);
Gestures.bind('pendown/leftdown/penup/pendown/leftdown/penup',go2home);
Gestures.bind('pendown/leftdown/penup/pendown/strokeup/penup',up1folder);
Gestures.bind('pendown/leftdown/penup/pendown/rightdown/penup',close_window);

if (window.document) {
  holder=window.document;
}
else
  holder=window;
holder.addEventListener('mousedown',try_pen_down, true);
holder.addEventListener('mouseup',try_pen_up, true);