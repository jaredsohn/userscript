// ==UserScript==
// @name           XMind Share Rich Embed Code
// @namespace      http://www.xmind.net/share/
// @include        http://www.xmind.net/share/*/*/
// @reference        http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
     var _mappage_embedCode = $("#mappage_embedCode");
     var _components = $('<div><button type="button" class="min button">MIN</button> <label>Width: <input type="text" class="value width" style="width: 50px;" /></label> <label>Height: <input type="text" class="value height" style="width: 50px;" /></label> </div>').appendTo(_mappage_embedCode);
    
     var _min_button = _components.find('.min.button:first');
     var _height_input = _components.find('.value.height:first');
     var _width_input = _components.find('.value.width:first');
     var _code_input = _mappage_embedCode.find('#embedCode_input:first');
    
    
     var get_width = function(_code)
     {
          return code_substring(_code, "width");
     };

     var get_height = function(_code)
     {
          return code_substring(_code, "height");
     };


     var code_substring = function(_code, _needle)
     {
          //<iframe id='xmindshare_embedviewer' src='http://xmind.net/share/_embed/pudding/schematic-design-through-surface-manipulation/' width='900px' height='300px' frameborder='0' scrolling='no'></iframe>
         
          if (typeof(_code) == "object")
               _code = _code.val();
         
          var _needle_start = _needle + "='";
          var _needle_end = "px'";
         
          var _pos_start = _code.lastIndexOf(_needle_start) + _needle_start.length;
          var _pos_end = _code.indexOf(_needle_end, _pos_start);
         
          var _value = _code.substring(_pos_start, _pos_end);
         
          return _value;
     };

     var set_width = function(_code_input, _value)
     {
          _code_input.val(code_replace(_code_input, "width", _value));
     };

     var set_height = function(_code_input, _value)
     {
          _code_input.val(code_replace(_code_input, "height", _value));
     };

     var code_replace = function(_code, _needle, _value)
     {
          //<iframe id='xmindshare_embedviewer' src='http://xmind.net/share/_embed/pudding/schematic-design-through-surface-manipulation/' width='900px' height='300px' frameborder='0' scrolling='no'></iframe>
         
          if (typeof(_code) == "object")
               _code = _code.val();
         
          var _needle_start = _needle + "='";
          var _needle_end = "px'";
         
          var _pos_start = _code.lastIndexOf(_needle_start) + _needle_start.length;
          var _pos_end = _code.indexOf(_needle_end, _pos_start);
         
          var _head = _code.substring(0, _pos_start);
          var _foot = _code.substring(_pos_end, _code.length);
         
          _code = _head + _value + _foot;
          return _code;
     };
    
     var _code_input_highlight = function () {
          _code_input.css("background-color", "#FFFF99");
          setTimeout(function() {
               _code_input.css("background-color", "");
          }, 500);
     };
    
     _height_input.val(get_height(_code_input));
     _width_input.val(get_width(_code_input));
    
     _height_input.change(function () {
          var _value = this.value;
         
          set_height(_code_input, _value);
          _code_input_highlight();
     });
    
     _width_input.change(function () {
          var _value = this.value;
         
          set_width(_code_input, _value);
          _code_input_highlight();
     });
    
     _min_button.click(function () {
          set_width(_code_input, 470);
          set_height(_code_input, 200);
         
          _height_input.val(200);
          _width_input.val(470);
          _code_input_highlight();
     });
    
     // -------------
    
     var _left_button = _mappage_embedCode.find("#embedCode_left_button");
     var _center_button = _mappage_embedCode.find("#embedCode_center_button");
     var _right_button = _mappage_embedCode.find("#embedCode_right_button");
    
     _left_button.click(function () {
          _width_input.val(900);
          _height_input.val(300);
     });
    
     _center_button.click(function () {
          _width_input.val(750);
          _height_input.val(250);
     });
    
     _right_button.click(function () {
          _width_input.val(600);
          _height_input.val(200);
     });
}


// load jQuery and execute the main function
addJQuery(main);