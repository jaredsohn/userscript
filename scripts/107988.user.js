// ==UserScript==
// @name           ShiftSpace
// @namespace      http://shiftspace.org/
// @description    An open source layer above any website
// @include        *
// @exclude        http://metatron.shiftspace.org/api/sandbox/*
// @exclude        http://shiftspace.org/api/sandbox/*
// @exclude        http://www.shiftspace.org/api/sandbox/*
// @exclude        http://metatron.shiftspace.org/dev/sandbox/*
// @exclude        http://shiftspace.org/dev/sandbox/*
// @exclude        http://www.shiftspace.org/dev/sandbox/*
// @require        http://shiftspace.org/api/client/Mootools.js
// @require        http://shiftspace.org/api/client/Videobox.js
// ==/UserScript==

/*

WHOA, WHAT JUST HAPPENED?

If you've just clicked a link and you're seeing this source code, wondering what
just happened, this is a Greasemonkey userscript. To use ShiftSpace you probably
need to install a Firefox extension called Greasemonkey. (Or, if you're not
running Firefox, you ought to install it first.)

For more info about Greasemonkey, go to www.greasespot.net 

- - - -

Avital says: "I will only grow vegetables if I love to grow vegetables."
Mushon says: "Make it a Dorongle!"
David says: "I am against smart!"

Script: shiftspace.user.js
    ShiftSpace: An Open Source layer above any webpage

License:
    - GNU General Public License
    - GNU Lesser General Public License
    - Mozilla Public License

Credits:
    - Created by Mushon Zer-Aviv, Dan Phiffer, Avital Oliver, David Buchbut,
      David Nolen and Joe Moore
    - Thanks to Clay Shirky, Johan Sundstrom, Eric Heitzman, Jakob Hilden,
      _why, Aaron Boodman and Nancy Hechinger

*/

// ShiftSpace is built on the Mootools framework (pre-processing required)

/*

Class: ShiftSpace
  A singleton controller object that represents ShiftSpace Core. All methods
  functions and variables are private.  Please refer to the documention on <User>,
  <ShiftSpace.Space>, <ShiftSpace.Shift>, <ShiftSpace.Plugin> to see public
  interfaces.
*/

console.log('Loading ShiftSpace!');

var ShiftSpace = new (function() {
    
    // The server variable determines where to look for ShiftSpace content
    // Check to see if the server URL is already stored
    // permissions problem here?
    if (typeof server == 'undefined') {
      var server = getValue('server', 'http://www.shiftspace.org/api/');
    }
    else
    {
      server = getValue('server', 'http://www.shiftspace.org/api/');
    }

    // Current ShiftSpace version
    var version = '0.17';
    
    // Logging verbosity and non-sandboxed JS visibility
    var debug = 0;
    
    // Cache loadFile data
    var cacheFiles = 0;
    
    // get Dan's input on how to set this
    if(typeof ShiftSpaceSandBoxMode != 'undefined') {
      server = window.location.href.substr(0, window.location.href.indexOf('sandbox'));
      cacheFiles = 0;
    }
    
    // The basic building blocks of ShiftSpace (private objects)
    var spaces = {};
    var shifts = {};
    var trails = {};
    var plugins = {};
    var displayList = [];
    
    // NOTE: will replace with ResourceManager in 0.5 - David
    plugins.attempt = function(options)
    {
      //console.log('attempting to call plugin');
      var args = ($type(options.args) == 'array' && options.args) || [options.args];
      
      function execute()
      {
        //console.log('executing plugin ' + options.name + ' call ' + options.method);
        //console.log('plugin installed ' + plugins[options.name]);
        if(options.method)
        {
          //console.log();
          plugins[options.name][options.method].apply(plugins[options.name], args);
          if(options.callback && $type(options.callback) == 'function') options.callback();
        }
      };

      // load then call
      if(!plugins[options.name])
      {
        //console.log('Load plugin');
        // Listen for the real load event
        SSAddEvent('onPluginLoad', function(plugin) {
          if(plugin.attributes.name == options.name) execute();
        });
        // Loading the plugin
        SSLoadPlugin(options.name, null);
      }
      else
      {
        execute();
      }
    };
    
    // event proxy object since, ShiftSpace is not a MooTools class
    var __eventProxyClass__ = new Class({});
    __eventProxyClass__.implement(new Events);
    var __eventProxy__ = new __eventProxyClass__();
    
    var __SSInvalidShiftIdError__ = "__SSInvalidShiftIdError__";
    
    // Holds the id of the currently focused shift
    var __focusedShiftId__ = null;
    var __focusedSpace__ = null;
    
    // These are for the race condition between shifts loading and console setup
    var __pendingShifts__ = -1;
    // A shift pending space load
    var __pendingShift__ = null;
    var __consoleIsWaiting__ = false;
    
    // User defaults
    var __defaultShiftStatus__ = 1;
    var __defaultEmailComments__ = 1;
    
    // Stores initial data for plugins that are needed for the console at startup
    // since the plugins won't actually be loaded until they are needed
    var __pluginsData__ = {};
    
    // Each space and a corresponding URL of its origin
    var installed = getValue('installed', {
      'Notes' : server + 'spaces/Notes/Notes.js',
      'ImageSwap': server + 'spaces/ImageSwap/ImageSwap.js',
      'Highlights': server + 'spaces/Highlights/Highlights.js',
      'SourceShift': server + 'spaces/SourceShift/SourceShift.js'
    });
    
    var spacePrefs = getValue('spacePrefs', {});
    
    // installed = {
    //   'Notes' : myFiles + 'spaces/Notes/Notes.js',
    //   'ImageSwap': myFiles + 'spaces/ImageSwap/ImageSwap.js',
    //   'Highlights': myFiles + 'spaces/Highlights/Highlights.js',
    //   'SourceShift': myFiles + 'spaces/SourceShift/SourceShift.js',
    // };

    // Each plugin and a corresponding URL of its origin
    var installedPlugins = getValue('installedPlugins', {
      'Trails': server + 'plugins/Trails/NewTrail.js',
      'Comments': server + 'plugins/Comments/Comments.js'
    });

    // installedPlugins = {
    //   'Trails' : myFiles + 'plugins/Trails/NewTrail.js'
    // };
    
    // An index of cached files, used to clear the cache when necessary
    var cache = getValue('cache', []);
    
    // Private variable and function for controlling user authentication
    var username = false;
    function setUsername(_username) {
      username = _username;
    }
    
    var alreadyCheckedForUpdate = false;
    

// Start IframeHelpers.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ==========================
// = Iframe Cover Functions =
// ==========================

// Used to cover iframes so that resize and drag operations don't get borked
var __iframeCovers__ = [];

/*
  Function: SSCheckForPageIframes
    Check for already existing iframes on the page and add covers to them.
*/
function SSCheckForPageIframes()
{
  $$('iframe').filter(SSIsNotSSElement).each(function(aFrame) {
    SSAddCover({cover:SSCreateCover(), frame:aFrame});
  });
}

/*
  Function: SSCreateCover
    Create a cover.  Should probably be refactored.
    
  Returns:
    a DOM node.
*/
function SSCreateCover()
{
  var cover = new ShiftSpace.Element('div', {
    'class': "SSIframeCover"
  });
  cover.setStyle('display', 'none');
  cover.injectInside(document.body);
  return cover;
}

/*
  Function: SSAddCover
    Add a iframe cover object to an internal array.
*/
function SSAddCover(newCover)
{
  // create covers if we haven't already
  __iframeCovers__.push(newCover);
}

/*
  Function: SSAddIframeCovers
    Add the iframe covers to the page.
*/
function SSAddIframeCovers() 
{
  __iframeCovers__.each(function(aCover) {
    aCover.cover.setStyle('display', 'block');
  });
}

/*
  Function: SSUpdateIframeCovers
    Update the position of the iframe covers.
*/
function SSUpdateIframeCovers() 
{
  __iframeCovers__.each(function(aCover) {
    var pos = aCover.frame.getPosition();
    var size = aCover.frame.getSize().size;
    aCover.cover.setStyles({
      left: pos.x,
      top: pos.y,
      width: size.x+3,
      height: size.y+3
    });
  });
}

/*
  Function: SSRemoveIframeCovers
    Remove the covers for the iframe.
*/
function SSRemoveIframeCovers() 
{
  __iframeCovers__.each(function(aCover) {
    aCover.cover.setStyle('display', 'none');
  });
}

// End IframeHelpers.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start PinHelpers.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ===================
// = Pin API Support =
// ===================

// An array of allocated Pin Widgets
var __pinWidgets__ = [];
// Exceptions
var __SSPinOpException__ = "__SSPinOpException__";
// for holding the current pin selection
var __currentPinSelection__ = null;

/*
  Function: SSCreatePinSelect
    Create the visible pin selection interface bits.
*/
function SSCreatePinSelect() 
{
  var targetBorder = new ShiftSpace.Element('div', {
    'class': "SSPinSelect SSPinSelectInset"
  });

  var insetOne = new ShiftSpace.Element('div', {
    'class': "SSPinSelectInset"
  });
  var insetTwo = new ShiftSpace.Element('div', {
    'class': "SSPinSelectInset"
  });
  insetTwo.injectInside(insetOne);
  insetOne.injectInside(targetBorder);
  
  ShiftSpace.PinSelect = targetBorder;
}

/*
  Function: SSPinMouseOverHandler
    A mouse over handler for pin events.
    
  Parameters:
    _evt - a DOM event.
*/
function SSPinMouseOverHandler (_evt) 
{
  var evt = new Event(_evt);
  var target = $(evt.target);

  if(!SSIsSSElement(target) &&
     !target.hasClass('SSPinSelect'))
  {
    __currentPinSelection__ = target;
    var pos = target.getPosition();
    var size = target.getSize().size;
  
    ShiftSpace.PinSelect.setStyles({
      left: pos.x-3,
      top: pos.y-3,
      width: size.x+3,
      height: size.y+3
    });

    ShiftSpace.PinSelect.injectInside(document.body);
  }
}

/*
  Function: SSPinMouseMoveHandler
    The pin handler that checks for mouse movement.
    
  Parameters:
    _evt - a window DOM event.
*/
function SSPinMouseMoveHandler(_evt) 
{
  if(ShiftSpace.PinSelect.getParent())
  {
    ShiftSpace.PinSelect.remove();
  }
}

/*
  Function: SSPinMouseClickHandler
    A pin handler.
    
  Parameters:
    _evt - a window event page.
*/
function SSPinMouseClickHandler(_evt) 
{
  var evt = new Event(_evt);
  evt.stop();
  if(__currentPinWidget__)
  {
    if(ShiftSpace.PinSelect.getParent()) ShiftSpace.PinSelect.remove();
    SSRemovePinEvents();
    __currentPinWidget__.userPinnedElement(__currentPinSelection__);
  }
}

/*
  Function: SSCheckPinReferences
    Check to see if there is a conflicting pin reference on the page already.
    
  Parameters:
    pinRef - a pin reference object.
*/
function SSCheckPinReferences(pinRef)
{
  var otherShifts = __allPinnedShifts__.copy().remove(pinRef.shift);
  var matchingShifts = otherShifts.filter(function(x) {
    var aPinRef = x.getPinRef();
    return ((aPinRef.relativeXPath == pinRef.relativeXPath) && 
            (aPinRef.ancestorId == pinRef.ancestorId));
  });

  // hide any shifts with matching paths
  matchingShifts.each(function(x) {
    x.hide();
  });
  
  return (matchingShifts.length > 0);
}

// stores direct references to the shift objects
var __allPinnedShifts__ = [];
/*
  Function: SSPinElement
    Pin an element to the page.
    
  Parameters:
    element - a DOM node.
    pinRef - a pin reference object.
*/
function SSPinElement(element, pinRef)
{
  ShiftSpace.pinRef = pinRef;

  // store this pinRef to ensure the same node doesn't get pinned
  if(!__allPinnedShifts__.contains(pinRef.shift)) __allPinnedShifts__.push(pinRef.shift);
  // make sure nobody else is targeting the same node
  SSCheckPinReferences(pinRef);
  
  var targetNode = $(ShiftSpace.Pin.toNode(pinRef));
  
  // pinRef has become active set targetElement and element properties
  $extend(pinRef, {
    'element': element,
    'targetElement': targetNode
  });
  
  if(!targetNode)
  {
    // throw an exception
    throw(__SSPinOpException__);
  }
  
  // store the styles
  pinRef.originalStyles = element.getStyles('float', 'width', 'height', 'position', 'display', 'top', 'left');
  pinRef.targetStyles = targetNode.getStyles('float', 'width', 'height', 'position', 'display', 'top', 'left');
  
  if(targetNode.getStyle('display') == 'inline')
  {
    var size = targetNode.getSize().size;
    pinRef.targetStyles.width = size.x;
    pinRef.targetStyles.height = size.y;
  }
  
  switch(pinRef.action)
  {
    case 'before':
      element.injectBefore(targetNode);
    break;
    
    case 'replace':
      targetNode.replaceWith(element);          
    break;
    
    case 'after':
      element.injectAfter(targetNode);
    break;
    
    case 'relative':
      var elPos = element.getPosition();
      var tgPos = targetNode.getPosition();
    
      // if no offset set it now
      if(!pinRef.offset)
      {
        var elpos = element.getPosition();
        var tpos = targetNode.getPosition();
        pinRef.offset = {x: elpos.x - tpos.x, y: elpos.y - tpos.y};
        pinRef.originalOffset = {x: elpos.x, y: elpos.y};
      }
      
      // hide the element while we do some node magic
      element.addClass('SSDisplayNone');
    
      // wrap the target node
      var wrapper = new Element('div', {
        'class': 'SSImageWrapper SSPositionRelative'
      });
      targetNode.replaceWith(wrapper);
      targetNode.injectInside(wrapper);
      
      // if the target node is an image we
      // want the wrapper node to display inline
      wrapper.setStyle('display', targetNode.getStyle('display'));

      var styles = targetNode.getStyles('width', 'height');
    
      // set the dimensions of the wrapper
      if( styles.width && styles.height != 'auto' )
      {
        wrapper.setStyle('width', styles.width);
      }
      else
      {
        wrapper.setStyle('width', targetNode.getSize().size.x);
      }
      
      if( styles.height && styles.height != 'auto' )
      {
        wrapper.setStyle('height', styles.height);
      }
      else
      {
        wrapper.setStyle('height', targetNode.getSize().size.y);
      }
    
      // override clicks in case the wrapper is inside of a link
      wrapper.addEvent('click', function(_evt) {
        var evt = new Event(_evt);
        evt.stop();
      });
      // store a reference to the wrapper
      pinRef.wrapper = wrapper;

      targetNode = wrapper;
    
      // inject it inside the parent of the target node
      element.injectInside(targetNode);
    
      // position absolute now
      if(element.getStyle('position') != 'absolute')
      {
        pinRef.cssPosition = element.getStyle('position');
        element.setStyle('position', 'absolute');
      }

      // set the position
      element.setStyles({
        left: pinRef.offset.x,
        top: pinRef.offset.y
      });
      
      // we're done show the element
      element.removeClass('SSDisplayNone');
    break;

    default:
    break;
  }
}

/*
  Function: SSUnpinElement
    Unpin an element from the page.
    
  Parameters:
    pinRef - a pin reference object.
*/
function SSUnpinElement(pinRef) 
{
  switch(pinRef.action) 
  {
    case 'relative':
      var pos = pinRef.element.getPosition();

      // get the parentElement
      var parentElement = pinRef.element.getParent();
      // take out the original node
      var targetNode = pinRef.targetElement.remove();
      // remove the pinned element from the page
      pinRef.element.remove();
      // replace the wrapper with the target
      parentElement.replaceWith(targetNode);
      
      var tpos = parentElement.getPosition();

      // restore the position of the element
      pinRef.element.setStyle('position', pinRef.cssPosition);
      
      if(pinRef.originalOffset)
      {
        var nx = pinRef.originalOffset.x;
        var ny = pinRef.originalOffset.y;
      }
      else
      {
        var nx = pos.x;
        var ny = pos.y;
      }

      pinRef.element.setStyles({
        left: nx,
        top: ny
      });

    break;

    case 'replace':
      // restore the original styles
      /*
      pinRef.element.setStyles({
        position: '',
        float: '',
        display: '',
        width: '',
        height: ''
      });
      */
    case 'before':
    case 'after':
      pinRef.element.replaceWith(pinRef.targetElement);
    break;

    default:
    break;
  }
}

/*
  Function: SSAttachPinEvents
    Attaches the mouse events to the window to handle Pin selection.
*/
function SSAttachPinEvents() 
{
  window.addEvent('mouseover', SSPinMouseOverHandler);
  window.addEvent('click', SSPinMouseClickHandler);
  ShiftSpace.PinSelect.addEvent('mousemove', SSPinMouseMoveHandler);
}

/*
  Function: SSRemovePinEvents
    Remove all pin selection listening events from the window.
*/
function SSRemovePinEvents() 
{
  window.removeEvent('mouseover', SSPinMouseOverHandler);
  window.removeEvent('click', SSPinMouseClickHandler);
  ShiftSpace.PinSelect.removeEvent('mousemove', SSPinMouseMoveHandler);
}

// hold the current active pin widget
var __currentPinWidget__ = null;
/*
  Function: SSStartPinSelection
    Start pin selection mode.
    
  Parameters:
    widget - the PinWidget object that started the pin selection operation.
*/
function SSStartPinSelection(widget) 
{
  __currentPinWidget__ = widget;
  // show the selection interface
  SSAttachPinEvents();
}

/*
  Function: SSStopPinSelection
    Stop handling pin selection.
*/
function SSStopPinSelection() 
{
  __currentPinWidget__ = null;
  if(ShiftSpace.PinSelect.getParent()) ShiftSpace.PinSelect.remove();
  SSRemovePinEvents();
}

// End PinHelpers.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


    
    /*
    
    Function: initialize
    Sets up external components and loads installed spaces.
    
    */
    this.initialize = function() {
      
      debug = 0;
      
      // look for install links
      SSCheckForInstallSpaceLinks();
      
      // Load external scripts (pre-processing required)

// Start User.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: User
    A an object wrapping the current ShiftSpace User.  Use this class to check the user's display
    name as well as checking if the user is logged in or out.
*/
var User = new Class({
  
  setUsername: function(_username)
  {
    username = _username;
  },

  /*
    Function: getUsername
      Returns the logged in user's name.
      
    Returns:
      User name as string. Returns false if there is no logged in user.
  */
  getUsername: function() 
  {
    return username;
  },
  
  
  setEmail: function(email)
  {
    this.__email__ = email;
  },
  
  
  email: function()
  {
    return this.__email__;
  },
  

  /*
    Function: isLoggedIn
      Checks whether there is a logged in user.
      
    Returns:
      A boolean.
  */
  isLoggedIn: function(showErrorAlert) 
  {
    return (username != false);
  },
  
  /*
    Function: login (private)
      Login a user. Will probably be moved into ShiftSpace.js.

    Parameters:
      credentials - object with username and password properties.
      _callback - a function to be called when login action is complete.
  */
  login: function(credentials, _callback) 
  {
    var callback = _callback;
    serverCall('user.login', credentials, function(json) {
      if (json.status) 
      {
        console.log('//////////////////////////////////////////////////////////');
        console.log(json);
        // set username
        username = credentials.username;
        // set email
        this.setEmail(json.email);
        callback(json);
        this.fireEvent('onUserLogin');
      } 
      else 
      {
        if(callback) callback(json);
      }
    }.bind(this));
  },
  
  /*
    Function: logout (private)
      Logout a user. Will probably be moved into ShiftSpace.js.
  */
  logout: function() 
  {
    username = false;
    setValue('username', '');
    serverCall('user.logout');
    this.fireEvent('onUserLogout');
  },
  
  /*
    Function: join (private)
      Join a new user.  Will probably be moved into ShiftSpace.js.
  */
  join: function(userInfo, callback) 
  {
    serverCall('user.join', userInfo, function(json) {
      if (json.status) 
      {
        username = userInfo.username;
        setValue('username', userInfo.username);
        callback(json);
      } 
      else 
      {
        callback(json);
      }
    }.bind(this));
  },
  
  /*
    Function: update
      Update a user's info.
      
    Parameters:
      info - info to be updated.
      callback - callback function to be run when update server call is complete.
  */
  update: function(info, callback) {
    serverCall('user.update', info, callback);
  },
  
  /*
    Function: resetPassword (private)
      Reset a user's password
      
    Parameters:
      info - ?
      callback - callback function to be run when resetPassword is complete.
  */
  resetPassword: function(info, callback) {
    serverCall('user.resetPassword', info, callback);
  },
  
  
  setPublishDefault: function()
  {
    
  },
  
  
  setEmailCommentsDefault: function(newValue, callback)
  {
    console.log('setEmailCommentsDefault ' + newValue);
    // setting the value, can't use zero because of PHP, GRRR - David
    SSSetDefaultEmailComments(newValue+1);
    
    serverCall('user.update', {
      email_comments: newValue
    }, function(json) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> Default changed!');
      console.log(json);
    });
  },
  
  
  getEmailCommentsDefault: function()
  {
    // setting the value, can't user zero because of PHP, GRRR - David
    return (SSGetDefaultEmailComments(true)-1);
  },
  
  
  setDefault: function(aDefault, value)
  {
    
  }

});

User.implement(new Events);
ShiftSpace.User = new User();


// End User.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



      // Set up user event handlers
      ShiftSpace.User.addEvent('onUserLogin', function() {
        SSSetDefaultShiftStatus(SSGetPref('defaultShiftStatus', 1));
        // clear out recently viewed shifts on login
        setValue(ShiftSpace.User.getUsername() + '.recentlyViewedShifts', []);
      });
      
      ShiftSpace.User.addEvent('onUserLogout', function() {
        SSFireEvent('onUserLogout');
      });
      

// Start Element.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: ShiftSpace.Element
    A wrapper around the MooTools Element class that marks each DOM node with the ShiftSpaceElement CSS
    class.  This is required for identifying which elements on the page belong to ShiftSpace.  In the case
    of iFrames this is also used to make sure that iFrame covers get generated so that drag and resize
    operations don't break.
*/
ShiftSpace.Element = new Class({
  
  /*
    Function: initialize (private)
      Initialize the element and if necessary add appropiate event handlers.
    
    Parameters:
      _el - a raw DOM node or a string representing a HTML tag type.
      props - the same list of options that would be passed to the MooTools Element class.

    Returns:
      An ShiftSpace initialized and MooTools wrapped DOM node.
  */
  initialize: function(_el, props) 
  {
    var el = new Element(_el, props);
    
    // ShiftSpaceElement style needs to be first, otherwise it overrides passed in CSS classes - David
    el.setProperty( 'class', 'ShiftSpaceElement ' + el.getProperty('class') );
    
    // remap makeResizable and makeDraggable - might want to look into this more
    var resizeFunc = el.makeResizable;
    var dragFunc = el.makeDraggable;
    
    // override the default behavior
    if(SSAddIframeCovers)
    {
      el.makeDraggable = function(options)
      {
        var dragObj;
        if(!dragFunc)
        {
          dragObj = new Drag.Move(el, options);
        }
        else
        {
          dragObj = (dragFunc.bind(el, options))();
        }

        dragObj.addEvent('onStart', function() {
          SSAddIframeCovers();
        });
        dragObj.addEvent('onDrag', SSUpdateIframeCovers);
        dragObj.addEvent('onComplete', SSRemoveIframeCovers);
      
        return dragObj;
      }
    
      // override the default behavior
      el.makeResizable = function(options)
      {
        var resizeObj;
        if(!resizeFunc)
        {
          resizeObj = new Drag.Base(el, $merge({modifiers: {x: 'width', y: 'height'}}, options));
        }
        else
        {
          resizeObj = (resizeFunc.bind(el, options))();
        }
        
        resizeObj.addEvent('onStart', SSAddIframeCovers);
        resizeObj.addEvent('onDrag', SSUpdateIframeCovers);
        resizeObj.addEvent('onComplete', SSRemoveIframeCovers);
      
        return resizeObj;
      }
    }

    return el;
  }
});

/*
  Class : ShiftSpace.Iframe
    This class allows the creation of iframes with CSS preloaded.  This will eventually
    be deprecated by the the forthcoming MooTools Iframe element which actually loads
    MooTools into the Iframe.  Inherits from <ShiftSpace.Element>.  You shouldn't instantiate
    this class directly, just use <ShiftSpace.Element>.
*/
ShiftSpace.Iframe = ShiftSpace.Element.extend({
  
  /*
    Function: initialize (private)
      Initializes the iframe.
      
    Parameters:
      props - the same properties that would be passed to a MooTools element.
      
    Returns:
      A ShiftSpace initialized and MooTools wrapped Iframe.
  */
  initialize: function(props)
  {
    // check for the css property
    this.css = props.css;
    
    // check for cover property to see if we need to add a cover to catch events
    var loadCallBack = props.onload;
    delete props.onload;
    
    // eliminate the styles, add on load event
    var finalprops = $merge(props, {
      events: 
      {
        load : function(_cb) {
          // load the css
          if(this.css) 
          {
            loadStyle(this.css, null, this.frame);
          }
          _cb();
        }.bind(this, loadCallBack)
      }
    });
    
    // store a ref for tricking
    this.frame = this.parent('iframe', finalprops);
    
    var addCover = true;
    if($type(props.addCover) != 'undefined' && props.addCover == false) addCover = false;

    if(addCover && SSAddCover)
    {
      // let ShiftSpace know about it
      SSAddCover({cover:SSCreateCover(), frame:this.frame});
    }
    else
    {
    }
    
    // return
    return this.frame;
  }
});

ShiftSpace.Input = ShiftSpace.Element.extend({
  // Create an iframe
  // Apply the styles
  // Create the requested input field
  // set the input field / textarea to be position absolute, left top right bottom all 0
  // set up event handlers so they get pass up to the developer
});

// End Element.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start Space.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: ShiftSpace.Space
    The base class for spaces.  A Space is essentially an extension to the ShiftSpace architecture.  You can think of ShiftSpace
    as a kind of simple operating system and windowing interface.  ShiftSpace doesn't actually know much about individual spaces.
    A Space is a kind of document controller, the documents being the shifts it manages. Some spaces need a cross document interface, 
    such as SourceShift, while others, such as Notes, present only the interface provided by the document itself.  The API for
    spaces can handle both types.  Refer to the source code of Notes and SourceShift to see their differences.
    
    Most of the methods here get called automatically.  For example, you should rarely if ever, call the showShift method directly.
    Users should be in control of whether a shift is visible or not.  In general the user of ShiftSpace is in control of the experience
    not the developer.  To get a better understanding of this please refer to the ShiftSpace tutorial.
*/
ShiftSpace.Space = new Class({
  attributes : {},
  
  /*
    Function : initialize (private)
      Initialize the space.  Sets internala state variables as well as calls SSRegisterSpace.  Also call the subclass
      setup method.
  */
  initialize: function( shiftClass ) 
  {
    this.shiftClass = shiftClass;
    
    // set the interface built flag
    this.__interfaceBuilt__ = false;
    this.__state__ = new Hash();
    
    this.__deferredNewShifts__= [];
    this.__deferredShifts__ = [];
    this.__deferredEdits__ = [];
    
    // if no css file, we don't need to wait for it to load
    this.setCssLoaded(!this.attributes.css);
    
    // the shifts array
    this.shifts = {};

    // is visible flag
    this.setIsVisible(false);

    var valid = true;

    if(!this.shiftClass)
    {
      valid = false;
      console.error( 'Error: You did not specify a Shift Class for this Space.' );
    }

    // Error checking for Developers, probably should just replace with defaults
    if( !this.attributes.name )
    {
      valid = false;
      console.error( 'Error: This Space does not define a name attribute.' );
    }
    if( !this.attributes.icon )
    {
      valid = false;
      console.error( 'Error: This Space does not have an icon.' );
    }

    if( valid )
    {
      if(typeof SSRegisterSpace != 'undefined') SSRegisterSpace( this, this.attributes );
    }
    else
    {
      var name = this.attributes.name || '';
      console.error( 'Error: The  ' + name + ' is not valid and will not be instantiated.' );
    }
    //console.log('/ / / / SETTING UP');
    this.setup();
    
    // check for a pending shift
    var pendingShift = SSPendingShift();
    if(pendingShift)
    {
      // clear it out
      SSSetPendingShift(null);
      // show the pending shift
      showShift(pendingShift);
    }
    
    return this;
  },
  
  /*
    Function: setup (abstract)
      To be implemented by subclasses.
  */
  setup: function() {},
  
  /*
    Function: interfaceIsBuilt
      Returns whether the interface of the space has been built yet.
  */
  interfaceIsBuilt : function()
  {
    return this.__interfaceBuilt__;
  },
  
  /*
    Function: setInterfaceIsBuilt (private)
      Set the private interface built flag.
      
    Parameters:
      val - a boolean.
  */
  setInterfaceIsBuilt : function(val)
  {
    return this.__interfaceBuilt__ = val;
  },
  
  /*
    Function: onCssLoad (private)
      Callback handler when the space's css file has loaded.  The interface is not built until after this
      function has been called.  Also any shifts that were set to creaetd/shown/edited.
  */
  onCssLoad : function()
  {
    this.setCssLoaded(true);

    if(this.__deferredContent__)
    {
      console.log('__deferredContent__');

      this.showInterface();
      this.hideInterface();

      // load any deferred shifts
      this.__deferredShifts__.each(function(aShift) {
        if(aShift.id)
        {
          showShift(aShift.id);
        }
        else
        {
          showShift(aShift);
        }
      }.bind(this));
      
      // edit any deferred shifts
      this.__deferredEdits__.each(function(aShift) {
        console.log('deferred edit');
        editShift(aShift);
      }.bind(this));

      // load any deferred just created shifts
      this.__deferredNewShifts__.each(function(aShift) {
        console.log('show deferred new shift');
        this.createShift(aShift);
        SSShowNewShift(aShift.id);
      }.bind(this));
    }
  },

  /*
    Function: addDeferredNew (private)
      Adds a deferred shift was just created.  This happens when a user create a shift
      using the Menu for a space that hasn't loaded yet.
      
    Parameters:
      shift - shift content Javascript object.
  */
  addDeferredNew: function(shift)
  {
    this.__deferredNewShifts__.push(shift);
    this.__deferredContent__ = true;
  },
  
  /*
    Function: addDeferredShift (private)
      Adds a deferred shift to be show.  This happens a user attempt to view a shift
      from <Console> for a space that hasn't loaded yet.
    
    Parameters:
      shiftId - a shift id.
  */
  addDeferredShift: function(shiftId)
  {
    this.__deferredShifts__.push(shiftId);
    this.__deferredContent__ = true;
  },
  
  /*
    Function: addDeferredEdit (private)
      Adds a deferred shift to be edited.  This happens when a user attempts to edit
      an existing shift from the <Console>.
      
    Parameters:
      shiftId - a shift id.
  */
  addDeferredEdit: function(shiftId)
  {
    this.__deferredEdits__.push(shiftId);
    this.__deferredContent__ = true;
  },
  
  /*
    Function: setCssLoaded (private)
      A setter for the internal flag tracking whether the css for this space has loaded yet.
  */
  setCssLoaded: function(val)
  {
    this.__cssLoaded__ = val;
  },
  
  /*
    Function: cssIsLoaded (private)
  */
  cssIsLoaded: function()
  {
    return this.__cssLoaded__;
  },
  
  /*
    Function: show (private)
      Show the space. Simple calls Space.showInterface
      
    See Also:
      Space.showInterface
  */
  show : function()
  {
    this.showInterface();
  },
  
  /*
    Function: hide
      Hide the space's interface is there is one.
      
    See Also:
      Space.hideInterface
  */
  hide : function()
  {
    this.hideInterface();
    
    for(var shift in this.shifts)
    {
      if(this.shifts[shift].isVisible())
      {
        this.shifts[shift].hide();
      }
    }
  },
  
  
  sleep: function()
  {
    // keep track of all the visible shifts
  },
  

  wake: function()
  {
    // restore the previously visible shifts
  },
  

  /*
    Function: setIsVisible
      Setter for internal flag about whether the Space and/or it's shifts are visible.
      
    Parameters:
      val - a boolean.
  */
  setIsVisible: function(val)
  {
    this.__isVisible__ = val;
  },
  

  /*
    Function: isVisible
      Returns value of internal flag about wheter the Space's interface or any of its shifts are visible.
      
    Returns:
      A boolean.
  */
  isVisible: function()
  {
    var visibleShifts = false;
    for(var shift in this.shifts)
    {
      if(this.shifts[shift].isVisible())
      {
        visibleShifts = true;
        continue;
      }
    }
    return this.__isVisible__ || visibleShifts;
  },
  
  /*
    Function: showInterface
      Show the space interface.  This can be overriden if necessary but you must remember to call this.parent()
      from your overriding method.
      
    Parameters:
      position (optional) - the x/y position of the mouse.
  */
  showInterface : function(position)
  {
    if(!this.interfaceIsBuilt() )
    {
      if(this.cssIsLoaded())
      {
        this.buildInterface();
        this.setInterfaceIsBuilt(true);
      }
      else
      {
        this.__deferredContent__ = true;
      }
    }
  },

  /*
    Function: hideInterface
      Hide the interface of the space.  If there are any unsaved shifts they will be destroyed. Can be overriden, remember to call
      this.parent() from your overriding method.
  */
  hideInterface : function() 
  {
    // remove any unsaved shifts
    var unsavedShifts = [];

    for(var shift in this.shifts)
    {
      if(shift.search('newShift') != -1)
      {
        unsavedShifts.push(this.shifts[shift]);
        delete this.shifts[shift];
      }
    }

    unsavedShifts.each(function(x) {
      x.destroy();
    });
  },
  
  /*
    Function: buildInterface (abstract)
      subclass should implement this if they want to present a custom interface.
      
    Example:
      (start code)
      build: function()
      {
        var this.element = new ShiftSpace.Element('div', {
          'class':'MyCSSClass'
        });
        var this.title = new ShiftSpace.Element('span', {
          'class':'MyCSSSpanClass'
        });
        this.title.setText('MyTitle');
        this.title.injectInside(this.element);
        
        this.setMainView(this.element);
      }
      (end)
  */
  buildInterface : function() {},
  
  /*
    Function: getName
      Returns the name of the shift.
      
    Returns:
      The name of the space as a string.
  */
  getName : function()
  {
    return this.attributes.name;
  },
  
  /*
    Function: addShift (private)
      Adds a shift to an internal array.  Implicity creates a new instance of a shift based on the
      contents of the passed in Object.
    
    Parameters:
      Takes a shift JSON object and creates and attaches event handlers.
      
    Returns:
      The internal shift instance.
  */
  addShift : function( aShift )
  {
    // add a backreference
    aShift.parentSpace = this;
    
    //console.log('constructing');
    //console.log(this.shiftClass);

    // create the new shift
    try
    {
      var newShift = new this.shiftClass( aShift );
    }
    catch(exc)
    {
      console.log(SSDescribeException(exc));
    }
    
    //console.log('a new shift');
    //console.log(newShift);
    
    // listen for shift updates
    newShift.addEvent('onUpdate', this.updateShift.bind(this));
    // Set up events that console will listen to
    newShift.addEvent('onShiftShow', function(shiftId) {
      this.onShiftShow(shiftId);
      this.fireEvent('onShiftShow', shiftId);
    }.bind(this));
    newShift.addEvent('onShiftHide', function(shiftId) { 
      this.onShiftHide(shiftId);
      this.fireEvent('onShiftHide', shiftId);
    }.bind(this));
    newShift.addEvent('onShiftDelete', function(shiftId) {
      this.onShiftDelete(shiftId);
      this.fireEvent('onShiftDelete');
    }.bind(this));
    newShift.addEvent('onShiftDestroy', function(shiftId) {
      this.onShiftDestroy(shiftId);
      this.fireEvent('onShiftDestroy', shiftId);
    }.bind(this));
    newShift.addEvent('onShiftFocus', function(shiftId) {
      this.onShiftFocus(shiftId);
      this.fireEvent('onShiftFocus', shiftId)
    }.bind(this));
    newShift.addEvent('onShiftBlur', function(shiftId) {
      this.onShiftBlur(shiftId);
      this.fireEvent('onShiftBlur', shiftId);
    }.bind(this));
    newShift.addEvent('onShiftSave', function(shiftId) {
      this.onShiftSave(shiftId);
      this.fireEvent('onShiftSave', shiftId);
    }.bind(this));
    
    //console.log('events added');
    
    this.shifts[newShift.getId()] = newShift;
    
    //console.log('exiting');
    
    return this.shifts[newShift.getId()];
  },
  
  /*
    Function: allocateNewShift
      Used when it necessary to kick off shift allocation from with in a Space
      and not from the ShiftMenu.  ImageSwap uses this.
  */
  allocateNewShift: function()
  {
    if(typeof initShift != 'undefined') initShift(this.getName(), {});
  },
  
  /*
    Function : createShift (private)
      Create a new shift.
      
    Parameters :
      newShiftJson - The JSON for the new shift.
      
    Returns:
      The new Shift object.
  */
  createShift : function( newShiftJson )
  {
    if(this.cssIsLoaded())
    {
      this.addShift(newShiftJson);
      console.log('added shift');
      var _newShift = this.shifts[newShiftJson.id];
      console.log('fire event');
      this.fireEvent( 'onCreateShift', { 'space' : this, 'shift' : _newShift } );
      console.log('return new baby');
      return _newShift;
    }
    else
    {
      console.log('++++++++++++++++++++++++++++ css not loaded');
      // we need to load these when the css is done
      this.addDeferredNew( newShiftJson );
    }
  },
  
  /*
    Function : deleteShift
      Delete a shift from the internal array.  Implicity calls SSDeleteShift which will remove this
      shift from the ShiftSpace DB.
      
    Parameters :
      shiftId - The id of the shift.
  */
  deleteShift : function( shiftId )
  {
    // destroy the shift
    if (this.shifts[shiftId]) 
    {
      this.shifts[shiftId].destroy();
      delete this.shifts[shiftId];
      this.fireEvent( 'onDeleteShift', shiftId );
      deleteShift.safeCall(shiftId);
    }
  },
  
  /*
    Function: editShift
      Tell the shift to go into edit mode.
      
    Parameters:
      shiftId - a shift id.
  */
  editShift : function( shiftId )
  {
    var theShift = this.shifts[shiftId];
    
    if(!theShift.isBeingEdited())
    {
      theShift.setIsBeingEdited(true);
      theShift.edit();
    }
  },

  /*
    Function: updateShift
      Update a shift.  Implicity calls the SSUpdateShift in Core to update the ShiftSpace DB.
    
    Parameters:
      aShift - The shift instance to update.
  */
  updateShift : function( aShift ) 
  {
    // notify other object such as the console
    var shiftJson = aShift.encode();

    // fix this
    shiftJson.id = aShift.getId();
    shiftJson.space = this.attributes.name;
    shiftJson.username = ShiftSpace.User.getUsername();
    
    this.fireEvent('onShiftUpdate', shiftJson);
  },
  
  
  /*
    Function: canShowShift (abstract)
      Check if the shift json can be shown.  This method returns true unless you override it.
      
    Parameters:
      shiftJson - a shift JSON object
    
    Returns:
      A boolean.
  */
  canShowShift: function(shiftJson)
  {
    return true;
  },
  
  
  /*
    Function : showShift
      Show a shift.  If a corresponding internal instance does not exist it will be created.

    Parameters :
      shiftId - The JSON representing the shift to show.
      
    Returns :
      An _ACTUAL_ Shift object, _NOT_ an id.
  */
  showShift : function( aShift ) 
  {
    if(!this.cssIsLoaded())
    {
      this.__deferredShifts__.push(aShift);
    }
    else
    {
      var cShift;
      if($type(aShift) != 'object')
      {
        cShift = this.shifts[aShift];
      }
      else
      {
        cShift = this.shifts[aShift.id];
      }
      
      if( !cShift )
      {
        // add the shift if we don't have it already
        try
        {
          this.addShift( aShift );
        }
        catch(exc)
        {
          console.log(SSDescribeException(exc));
        }
        cShift = this.shifts[aShift.id];
      }
      
      if( cShift.canShow() )
      {
        // blur the old shift
        if(this.getCurrentShift() &&
           cShift != this.getCurrentShift())
        {
          this.getCurrentShift().onBlur();
        }
      
        this.setCurrentShift(cShift);
        
        // show the new shift and focus it
        if(!cShift.isVisible())
        {
          // do some private show setup here, this way subclass don't have to call this.parent() in show
          cShift._show();
          // call the actual show method
          cShift.show();
          
          // set some state flags
          cShift.setIsVisible(true);
          cShift.setIsBeingEdited(false);
        }
      
        // focus the shift
        cShift.onFocus();
      }
    
      // set the currentShift
    
      return cShift;
    }
  },
  
  /*
    Function: hideShift
      Hides a shift.
    
    Parameters:
      shiftId - a shift id.
  */
  hideShift : function( shiftId ) 
  {
    var cShift = this.shifts[shiftId];
    
    if( cShift )
    {
      if( cShift.canHide() && cShift.isVisible() ) 
      {
        cShift._hide();
        cShift.hide();
        cShift.setIsBeingEdited(false);
        cShift.setIsVisible(false);
      }
    }
    else
    {
      console.error( "Shift " + shiftId + " does not exist in this the " + this.getName() + " space." );
    }
    
    // check to see if there are no visible shifts, if not, hide the space interface
    var visibleShifts = false;
    for(var shift in this.shifts)
    {
      if(this.shifts[shift].isVisible())
      {
        visibleShifts = true;
        continue;
      }
    }
    if(!visibleShifts) this.hideInterface();
  },
  
  /*
    Function: orderFront
      Move a shift back in the display order.  This is generally called by ShiftSpace.
    
    Parameters:
      shiftId - the id of the Shift.
      layer - not yet implemented.
  */
  orderFront : function( shiftId, layer )
  {
    var mv = this.shifts[shiftId].getMainView();
    if(mv && !mv.hasClass('SSUnordered')) 
    {
      mv.setStyle('zIndex', 10000);
    }
  },
  
  /*
    Function: orderBack
      Move a shift front in the display order.
      
    Parameters:
      shiftId - the id of the Shift.
      layer - not yet implemented.
  */
  orderBack : function( shiftId, layer )
  {
    var mv = this.shifts[shiftId].getMainView();
    if(mv && !mv.hasClass('SSUnordered'))
    {
      mv.setStyle('zIndex', 9999);
    }
  },
  
  /*
    Function: setDepth
      Not yet implemented.
  */
  setDepth: function( shiftId, depth )
  {
    var mv = this.shifts[shiftId].getMainView();
    if(mv && !mv.hasClass('SSUnordered'))
    {
      mv.setStyle('zIndex', depth);
    }
  },
  
  /*
    Function: regionIsObscured
      Not yet implemented.
  */
  regionIsObscured : function( region )
  {
    var len = this.shifts.length;
    for(var i = 0; i < len; i++ ) 
    {
      var aShift = this.shifts[i];
      
      if(aShift.mainViewIsVisible())
      {
        var sregion = aShift.getRegion();
        
        // check to see if any point of the region falls within this shift
        if ( !( sregion.left > region.right
            || sregion.right < region.left
            || sregion.top > region.bottom
            || sregion.bottom < region.top
            ) )
        {
          return true;
        }
      }
    }
    return false;
  },
  
  /*
    Function: setCurrentShift (private)
      Set the current shift object.
    
    Parameters:
      newShift - an internal shift instance.
  */
  setCurrentShift : function(newShift)
  {
    this.__currentShift__ = newShift;
  },
  
  /*
    Function: setCurrentShiftById
      Same as Space.setCurrentShift but can use an id instead.
    
    Parameters:
      shiftId - a shift id.
  */
  setCurrentShiftById: function(shiftId)
  {
    this.setCurrentShift(this.shifts[shiftId]);
  },
  
  /*
    Function: getCurrentShift
      Get the current shift.
    
    Returns:
      The current focused shift instance.
  */
  getCurrentShift : function()
  {
    return this.__currentShift__;
  },
  
  /*
    Fuction: getShift
      Returns a shift instance from the internal hash.
      
    Parameters:
      shiftId - a shift id.
  */
  getShift: function(shiftId)
  {
    return this.shifts[shiftId];
  },

  /*
    Function: focusShift
      Focus a shift.  Implicitly calls Space.setCurrentShift.
      
    Parameters:
      shiftId - a shift id.
  */
  focusShift : function(shiftId)
  {
    this.setCurrentShift(this.shifts[shiftId]);
    this.getCurrentShift().onFocus();
  },
  
  /*
    Function: blurShift
      Blur a shift. If the shift is being edited it will be taken out of editing mode.
      
    Parameters:
      shiftId - a shift id.
  */
  blurShift: function(shiftId)
  {
    var theShift = this.shifts[shiftId];
    theShift.onBlur();
    theShift.setIsBeingEdited(false);
  },
  
  /*
    Function: onShiftPrepare (abstract)
      Called before a shift will be shown.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftPrepare : function(shiftId) {},
  
  /*
    Function: onShiftCreate (abstract)
      Called after a shift has been created.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftCreate : function(shiftId) {},
  
  /*
    Function: onShiftEdit (abstract)
      Called after a shift has been edited.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftEdit: function(shiftId) {},
  
  /*
    Function: onShiftSave (abstract)
      Called after a shift has been saved.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftSave : function(shiftId) {},
  
  /*
    Function: onShiftDelete (abstract)
      Called after a shift has been deleted.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftDelete : function(shiftId) {},
  
  /*
    Function: onShiftDestroy (abstract)
      Called after a shift has been destroyed.
    
    Parameters: 
      shiftId - a shift id.
  */
  onShiftDestroy : function(shiftId) {},
  
  /*
    Function: onShiftShow (abstract)
      Called after shift has been shown.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftShow : function(shiftId) {},
  
  /*
    Function: onShiftHide (abstract)
      Called after a shift has been hidden.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftHide : function(shiftId) {},
  
  /*
    Function: onShiftFocus (abstract)
      Called after a shift has been focused.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftFocus : function(shiftId) {},
  
  /*
    Function: onShiftBlur (abstract)
      Called after a shift has been blurred.
      
    Parameters:
      shiftId - a shift id.
  */
  onShiftBlur: function(shiftId) {},
  
  /*
    Function: setValue
      Safe wrapper around GM_setValue for spaces.
      
    Parameters:
      key - a string. The actual key is "spaceName.key"
      value - a value to be set.
  */
  setValue : function(key, value)
  {
    setValue.safeCall(this.attributes.name + "." + key, value);
  },
  
  /*
    Function: getValue
      Safe wrapper around GM_getValue
      
    Parameters:
      key - returns a key. The real key is "spaceName.key".
      defaultValue - a default value is the key doesn't exist.
      callback - a callback function.
  */
  getValue : function(key, defaultValue, callback)
  {
    getValue.safeCallWithResult(this.attributes.name + '.' + key, defaultValue, callback);
  },
  
  /*
    Function: updateTitleOfShift (private)
      Update the title of a shift, if appropriate.
      
    Parameters:
      shiftId - a shift id.
      title - a new title <string>.
  */
  updateTitleOfShift: function(shiftId, title)
  {
    this.shifts[shiftId].updateTitle(title);
  },
  
  /*
    Function: mainViewForShift (private)
      Returns the main view DOM node of the shift.
      
    Parameters:
      shiftId - a shift id.
      
    Returns:
      A DOM node.
  */
  mainViewForShift: function(shiftId)
  {
    return this.shifts[shiftId].getMainView();
  },
  
  /*
    Function: saveState (private)
      Saves the state of the space. For the moment just saves the currently visible shifts.
      Normally used when a plugin takes over the entire current browser viewport.
  */
  saveState: function()
  { 
    // empty the state
    this.__state__.empty();
    
    var visibleShifts = [];
    for(var shift in this.shifts)
    {
      if(this.shifts[shift].isVisible())
      {
        visibleShifts.push(this.shifts[shift]);
      }
    }
    this.__state__.set('visibleShifts', visibleShifts);
  },
  
  /*
    Function: restoreState (private)
      Restores the state of the space. Normally used when a plugin has relinquished the
      browser's current viewport.
  */
  restoreState: function()
  {
    this.__state__.get('visibleShifts').each(function(x) { x.show(); });
  },
  
  /*
    Function: isNewShift
      Used to check whether a shift is unsaved.
      
    Parameters:
      shiftId - a shift id.
  */
  isNewShift: function(shiftId)
  {
    return SSIsNewShift(shiftId);
  },
  
  /*
    Function: xmlhttpRequest
      A safe wrapper around GM_xmlhttpRequest.
      
    Parameters:
      config - object with properties as defined by GM_xmlhttpRequest.
  */
  xmlhttpRequest: function(config)
  {
    SSXmlHttpRequest.safeCall(config);
  },
  
  /*  
    Function: setPref
      Set a space pref.
      
    Parameters:
      key - a key.
      value - a value to be set. If value is an Object make sure there aren't circular references.
  */
  setPref: function(key, value)
  {
    this.setValue(this.attributes.name+'.prefs.'+key, value);
  },
  
  /*
    Function: getPref
      Returns a space pref.
      
    Parameters:
      key - a key.
      defaultValue - a default value.
      callback - a function to be called when the value has been retrieved.
  */
  getPref: function(key, defaultValue, callback)
  {
    this.getValue(this.attributes.name+'.prefs.'+key, defaultValue, callback);
  }
  
});

ShiftSpace.Space.implement( new Options );
ShiftSpace.Space.implement( new Events );

// End Space.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start Shift.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: ShiftSpace.Shift
    The base class for shifts.  Shifts can essentially be thought of as documents.  If you consider things from the MVC perspective
    the Shift is the View, the Space is the Controller.  When the model is modified via the interface you present in your shift
    (or space), in order for these changes to take, you will need to call the save method at key points.  This will sync
    the state of the shift with to the ShiftSpace database.  The design of the the Shift class is meant to be as declarative as possible.
    The key functions such as show, edit, hide, save, setup should not be called directly by you.  You simply implement the behavior
    you want when ShiftSpace calls these methods based on user interaction with the shift menu and the shift console.
*/
ShiftSpace.Shift = new Class({
  getDefaults: function()
  {
    return {};
  }, 
  
  /*
    Function : initialize (private)
      Takes a json object and creates the shift.
      
    Parameter :
      _json - The JSON object that contains the properties the shift will have.
  */
  initialize: function(_json)
  {
    this.setOptions(this.getDefaults(), _json);
    
    // private id var
    var id = _json.id;
    // private parent shift var
    var parentSpace;

    // rename options to json
    this.defaults = this.options;
    
    // the above probably should privatized against people accidentally using the options property
    
    // These two functions prevent spoofing an id
    // The id can be set only at shift instantiation
    // and Shiftspace checks if id number is available
    // or whether or not it is already in use and if it
    // isn't it use, the json object must be equal to the
    // one in Shiftspace.
    // perhaps ID block should be part of a user session?
    
    /* ------------------- Private Getters/Setters ------------------- */
    this.setId = function( aId ) {
      if( id == null || id.substr(0, 8) == 'newShift')
      {
        id = aId;
      }
    }
    
    /*
      Function: getId
        Return the private id variable.
        
      Returns:
        the id (string).
    */
    this.getId = function() {
      return id;
    }
    
    /*
      Function: setParentSpace (private)
        Sets the private parent space var.  You should not call this directly.
    */
    this.setParentSpace = function(_parentSpace) {
      if( parentSpace == null )
      {
        parentSpace = _parentSpace;
      }
    }
    
    /*
      Function: getParentSpace
        Returns the parent space instance. Useful when a shift needs to communicate the space object, which
        of course should be rare.
    */
    this.getParentSpace = function() {
      return parentSpace;
    }
    /* ------------------- End Private Getters/Setters ----------------- */
    
    // set the id & parent space
    if( _json.id )
    {
      this.setId( _json.id );
    }
    if( this.options.parentSpace )
    {
      this.setParentSpace( this.options.parentSpace );
    }
    
    this.setTitle(_json.summary || '');
    
    // call setup
    this.setup(_json);
    
    // TODO: should pin if it's possible to pin - David

    return this;
  },
  
  /*
    Function: setup (abstract)
      To implemented by the subclass.  All initialization of your Shift instance should happen here.
      
    Parameters:
      json - an Object whose properties should be loaded by the instance.  This object contains a "location" property which is the mouse location.
      
    Example:
      (start code)
      setup: function(json)
      {
        this.build();
        this.attachEvents();
        
        var mainView = this.getMainView();
        if(json.position)
        {
          mainView.setStyles({
            left: json.position.x,
            top: json.position.y
          });
        }
        
        if(json.title)
        {
          this.setTitle(json.title);
        }
      }
      (end)
  */
  setup: function(json)
  {
  },
  
  /*
    Function: isNewShift
      Returns whether this shift is newly created or not.
      
    Returns:
      A boolean.
  */
  isNewShift: function()
  {
    return SSIsNewShift(this.getId());
  },
  
  
  userOwnsShift: function()
  {
    return SSUserOwnsShift(this.getId());
  },
  
  /*
    Function: setFocusRegions
      Takes a variable list of DOM element that will trigger this
      shift to fire an onFocus event.
  */
  setFocusRegions : function()
  {
    var args = new Array(arguments);

    for( var i = 0; i < arguments.length; i++ )
    {
      var aRegion = arguments[i];
      aRegion.addEvent('mousedown', function() {
        this.focus();
      }.bind(this));
    }
  },
  
  /*
    Function: edit
      The shift should present it's editing interface.  Puts the shift into editing mode.  Be sure to call this.parent()
      if you override this method.
  */
  edit: function() {
    this.setIsBeingEdited(true);
  },

  /*
    Function : save
      Fires the onUpdate event for anyone who is listening. Passes a ref to this object as
      the event parameter.
  */
  save : function()
  {
    // We can use events here because if we do
    // a Shift cannot save in their initialize method
    this.getParentSpace().updateShift( this );
    this.fireEvent('onShiftSave', this.getId());
  },
  
  markDirty: function()
  {
    this.dirty = true;
  },
  
  /*
    Function: refresh (abstact)
      You should always provide some kind of refresh function
      so that your shift can correct itself for resize operations,
      window size changes, showing, hiding, etc.
  */
  refresh : function() {},
  
  /*
    Function: encode (abstract)
      To be implemented by the subclass. This method should return an object whose the properties
      accurately represent the state of this shift.  When shift is instantiated this same object
      will be passed to the new instance so that you may restore the state of the shift.
      
    Returns:
      A object whose properties represent the current state of the shift instance.
      
    Example:
      (start code)
      encode: function()
      {
        return {
          name: "John Smith",
          address: "1 Park Ave"
        };
      }
      (end)
  */
  encode : function()
  {
    return {};
  },
  
  /*
    Function : canShow
      A function which determines whether the shift can be shown.
      
    Returns :
      A boolean.
  */
  canShow : function()
  {
    return true;
  },
  
  /*
    Function : canHide
      A function which determines whether the shift can be hidden.
      
    Returns :
      A boolean.
  */
  canHide : function()
  {
    return true;
  },
  
  /*
    Function : destroy
      Destroys the shift.  This will remove the shift's main view from the DOM as well as erase
      the shift from the ShiftSpace DB.
  */
  destroy : function()
  {
    if(this.getMainView() && this.getMainView().getParent())
    {
      this.getMainView().remove();
    }

    this.fireEvent('onShiftDestroy', this.getId());
  },

  _show: function()
  {
    
  },

  /*
    Function : show
      Make the shift visible.  If you want to add custom behavior by overriding this method sure to add a call to this.parent() as the first line in your new method.
  */
  show : function()
  {
    this.setIsVisible(true);
    var mainView = this.getMainView();
    
    if( mainView )
    {
      mainView.removeClass('SSDisplayNone');
    }
    
    this.refresh();
    this.fireEvent('onShiftShow', this.getId());
  },
  
  _hide : function()
  {
    
  },
  
  /*
    Function : hide
      Hide the shift.  If you want to add custom behavior by overriding this method be sure to call this.parent() as the first line in your new method.
  */
  hide : function(el)
  {
    this.setIsVisible(false);
    var mainView = this.getMainView();

    if( mainView )
    {
      mainView.addClass('SSDisplayNone');
    }
    
    this.fireEvent('onShiftHide', this.getId());
  },
  
  /*
    Function : manageElement
      Sets the main view of the shift.  This lets ShiftSpace now what the main display
      element of your Shift is.  This is required for proper display ordering.
      
    Parameters:
      el - A ShiftSpace.Element
  */
  manageElement : function( el )
  {
    if( el )
    {
      this.mainView = el;
      this.mainView.addEvent('mousedown', function() {
        this.focus();
      }.bind(this));
    }
    else
    {
      console.error('Error: Attempt to set mainView to null.');
    }
  },
  
  /*
    Function : focus
      Tell ShiftSpace we want to focus this shift.
  */
  focus : function() {
    this.fireEvent('onShiftFocus', this.getId() );
  },
  
  /*
    Function: onFocus
      Do any updating of the shift's interface for focus events here.
  */
  onFocus: function() {},
  
  /*
    Function: unfocus
      Tell ShiftSpace we want to blur this shift.
  */
  blur : function() {
    this.setIsBeingEdited(false);
    this.fireEvent('onShiftBlur', this.getId() );
  },
  
  /*
    Function: onBlur
      Do any updating of the shift's interface here.
  */
  onBlur: function() {},
  
  /*
    Function: getMainView
      Returns the main view of the shift.  Without this ShiftSpace cannot order the shift.
      
    Returns:
      <ShiftSpace.Element>
  */
  getMainView : function()
  {
    return this.mainView;
  },
  
  /*
    Function: mainViewIsVisible
      Returns whether the main view of the shift is visible or not.
      
    Returns:
      boolean
  */
  mainViewIsVisible : function()
  {
    // TODO: change for 1.2 - David
    return ( this.mainView.getStyle('display') != 'none' );
  },
  
  /*
    Function: setIsVisible (private)
     Set the internal private flag tracking whether this shift is visible or not.  You should not call this directly.
     
    Parameters:
      val - a boolean.
  */
  setIsVisible: function(val)
  {
    this.__isVisible__ = val;
  },
  
  /*
    Function: isVisible
      Returns whether this shift is visible or not.
      
    Returns:
      A boolean.
  */
  isVisible: function()
  {
    return  this.__isVisible__;
  },
  
  /*
    Function: setIsBeingEdited (private)
      Sets the internal flag that tracks whether the shift is currently being edited or not.
      
    Parameters:
      val - a boolean.
  */
  setIsBeingEdited: function(val)
  {
    this.__isBeingEdited__ = val;
  },
  
  /*
    Function: isBeingEdited
      Returns whether this shift is currently being edited or not.
      
    Returns:
      A boolean.
  */
  isBeingEdited: function(val)
  {
    return this.__isBeingEdited__;
  },
  
  getRegion : function()
  {
    var pos = this.getMainView().getPos();
    var size = this.getMainView().getSize().size;
    
    return {
      left : pos.x,
      right : pos.x + size.x,
      top : pos.y,
      bottom : pos.y + size.y
    };
  },
  
  /*
    Function: pin
      Pins an element of the shift to a node on the page.
    
    Parameters:
      element - the Element to be pinned.
      pinRef - A pinRef JSON object created by <Pin>
      
    See Also:
      <Pin>,
      <PinWidget>
      
    Example:
      (start code)
      this.pin($('cssId), ShiftSpace.Pin.toRef($('someOtherCSSId')));
      (end)
  */
  pin : function(element, pinRef)
  {
    // get the target
    var pinTarget = ShiftSpace.Pin.toNode(pinRef);

    if(pinTarget)
    {
      // valid pin ref
      this.setPinRef(pinRef);

      // store some styles from the pin target, if action is replace
      switch(pinRef.action)
      {
        case 'replace':
          // we want the width, height and flow of the original if replace
          var targetStyles = pinTarget.getStyles('width', 'height', 'float');
          this.setPinTargetStyles(targetStyles);
          element.setStyles(targetStyles);
        break;
        
        case 'relative':
        break;
        
        default:
        break;
      }
    
      // store the size before pinning
      this.setPinElementDimensions(element.getSize().size);

      // this is already pinned need to unpin first
      if(this.getPinElement())
      {
        // clears everything
        this.unpin();
      }
    
      this.setPinTarget(pinTarget);
      this.setPinElement(element);
    
      // call ShiftSpace Pin API to pin this element
      pinRef.shift = this;
      SSPinElement(element, pinRef);
    }
    else
    {
      // Should throw an Exception ? - David
    }
    
    // fire a pin event
    this.fireEvent('pin', this);
  },
  
  /*
    Function: unPin
      Unpins an element of this shift from a element on the page.
      
    See Also:
      <Pin>,
      <PinWidget>
  */
  unpin : function()
  {
    // check to make sure there is an pinned element to restore
    if(this.getPinElement())
    {
      SSUnpinElement(this.getPinRef());
      
      // clear out these vars
      this.setPinTarget(null);
      this.setPinElement(null);
    }
    
    this.fireEvent('unpin', this);
  },
  
  /*
    Function: setPinElement (private)
      Set the element of the shift that will actually be pinned.
      
    Parameters:
      newEl - The element of the shift that will be pinned.
  */
  setPinElement: function(newEl)
  {
    this.pinElement = newEl;
  },
  
  /*
    Function: getPinElement (private)
      Returns the current element that is pinned.  This will return
      null if the shift is not currently pinned.
      
    Returns:
      A DOM node.
  */
  getPinElement: function()
  {
    return this.pinElement;
  },
  
  /*
    Function: setPinRef
      Set the current pinRef object. This is normally called automatically
      you should rarely if ever call this directly.
      
    Parameters:
      pinRef - Set the current pinRef object.
  */
  setPinRef : function(pinRef)
  {
    this.pinRef = pinRef
  },
  
  /*
    Function: getPinRef
      Returns the set pinRef object (created by <Pin>) if this shift has one.
  */
  getPinRef : function()
  {
    return this.pinRef
  },
  
  /*
    Function: getEncodablePinRef
      This returns a version of the pin reference object that is encodable.  This is necessary
      because we store dom node references in the pin reference and these should not
      get encoded on Shift save. Used to remove circular references that will break Json.toString().
      
    Returns:
      And encodable Object representation of the pin reference object.
      
    Example:
      (start code)
      encode: function()
      {
        return {
          title: this.getTitle(),
          color: this.getColor(),
          position: this.element.getPosition(),
          pinRef: this.getEncodablePinRef(this.getPinRef())
        };
      }
      (end)
  */
  getEncodablePinRef: function()
  {
    var pinRef = this.getPinRef();
    var temp = {};
    
    // don't attempt to encode element, targetElement, or wrapper properties
    for(var key in pinRef)
    {
      if(!['element','targetElement', 'wrapper', 'shift', 'originalStyles', 'targetStyles'].contains(key))
      {
        temp[key] = pinRef[key];
      }
      
      if(key == 'offset' && pinRef.action == 'relative')
      {
        // we need to get the latest offset
        temp['offset'] = {x: pinRef.element.offsetLeft, y: pinRef.element.offsetTop};
      }
    }
    
    return temp;
  },
  
  /*
    Function: setPinTarget (private)
      Sets the pin target.  This is the element on the page that has been targeted
      by the user.
      
    Parameters:
      pinTarget - A DOM node.
  */
  setPinTarget: function(pinTarget)
  {
    this.pinTarget = pinTarget;
  },
  
  /*
    Function: getPinTarget (private)
      Returns the current pin target if there is one.
  */
  getPinTarget: function()
  {
    return this.pinTarget;
  },
  
  /*
    Function: setPinTargetStyles
      When replacing a target node or being inserted before or after it is important
      to pick up some of the CSS dimensions of that target node.  In the case of replacing
      these styles need to be saved before the node is replaced and removed from the
      page DOM.
      
    Parameters:
      newStyles - A JSON object of saved CSS dimension styles.
  */
  setPinTargetStyles : function(newStyles)
  {
    this.targetStyles = newStyles;
  },
  
  /*
    Function: getPinTargetStyles
      Returns the JSON object of the target nodes CSS dimension styles.
      
    Returns:
      An Object.
  */
  getPinTargetStyles : function()
  {
    return this.targetStyles;
  },
  
  setPinElementStyles : function(newStyles)
  {
    this.pinElementStyles = newStyles;
  },
  
  getPinElementStyles: function()
  {
    return this.pinElementStyles;
  },
  
  setPinElementDimensions: function(size)
  {
    this.pinElementDimensions = size;
  },
  
  getPinElementDimensions: function(size)
  {
    return this.pinElementDimensions;
  },
  
  /*
    Function: isPinned
      Returns true if this shift is currently pinned.
      
    Returns:
      A boolean.
  */
  isPinned : function()
  {
    return (this.getPinTarget() != null);
  },
  
  /*
    Function: updateTitle
      Update the title of the shift. Implictly saves the shift.
      
    Parameters:
      newTitle - a new title (string).
  */
  updateTitle: function(newTitle)
  {
    if(newTitle && newTitle != this.getTitle())
    {
      this.setTitle(newTitle);
      this.save();
    }
  },
  
  /*
    Function: setTitle
      Used to set the current title of the shift.
      
    Parameters:
      newTitle - a new title (string).
  */
  setTitle : function(newTitle)
  {
    this.__title__ = newTitle;
  },
  
  /*
    Function: getTitle
      Returns the title of the shift.
      
    Returns:
      A string.
  */
  getTitle: function()
  {
    return (this.__title__ || this.defaultTitle());
  },
  
  /*
    Function: defaultTitle (abstract)
      To be implemented by subclasses.  Returns "Untitled" otherwise.
      
    Returns:
      A String.
  */
  defaultTitle: function()
  {
    return "Untitled";
  },
  
  /*
    Function: getAuthor
      Returns the display name of the user that authored this shift.
      
    See Also:
      <SSGetAuthorForShift>
  */
  getAuthor: function()
  {
    return SSGetAuthorForShift(this.getId());
  },
  
  /*
    Function : build (abstract)
      To be implemented by the subclass. Build the DOM for the shift.
  */
  build : function()
  {
  },
  
  /*
  */
  failedView: function()
  {
    // TODO: Show the failed view, if this shift can't be shown
  },
  
  errorView: function(err)
  {
    
  },
  
  /*
    Function: xmlhttpRequest
      Safe version of GM_xmlhttpRequest for shifts.
      
    Parameters:
      config - the same type of object that should be passed to GM_xmlhttpRequest.
      
    See Also:
      <SSXmlHttpRequest>
  */
  xmlhttpRequest: function(config)
  {
    SSXmlHttpRequest.safeCall(config);
  }
});

ShiftSpace.Shift.implement( new Options );
ShiftSpace.Shift.implement( new Events );


// End Shift.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start RangeCoder.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: RangeCoder
    A convenience class to encode and decode W3C Ranges <-> opaque objects.
*/
var RangeCoder = new Class({
  /*
    Property: toRange
      Takes a reference object and returns a W3C range.  The reference object is
      JavaScript object composed of the following properties ancestorOrigTextContent,
      ancestorPosition, startContainerXPath, startContainerOffset, endContainerXPath,
      endContainerOffset, origText.

    Arguments:
      refObj

    Returns:
      W3C Range.

    Example:
      (start code)
      var userSelection = window.getSelection();
      var myRange = userSelection.getRangeAt(0);
      console.log(ShiftSpace.RangeCoder.toRef(myRange));
      (end)
  */
  toRange: function(refObj)
  {
    //console.log('toRange');
    var objAncestor = this.getRangeAncestorNode(refObj);
    //console.log(objAncestor);

    if (objAncestor)
    {
      //console.log('generating range');
      return this.generateRange(objAncestor, refObj);
    }

    //console.log('attempting to recover broken range');
    var recovered = this.recoverBrokenRange(refObj);
    if (recovered)
    {
      //console.log('recovered the node');
      return recovered;
    }

    // post an alert if we failed
    // TODO: point this at the error window
    alert('Warning: An in-page reference was not recreateable because the webpage has changed. The original referenced text was: ' + refObj.origText);

    // return null
    return null;
  },

  /*
    Property: toRef
      Given a valid W3C Range, extract relevant info and store.

    Arguments:
      range - a W3C Range.

  */
  cleanWhitespace: function(node)
  {
    node.innerHTML = node.innerHTML.replace(new RegExp("\\n","g"));
  },

  toRef: function(range)
  {
    //get the common ancestor
    var objCommonAncestor = range.commonAncestorContainer;
    var origCommonAncestor = false;

    // if the Common Ancestor is text node use the parent node as ancestore since once spliting the text node there will be no ancestor exist for text node
    if(objCommonAncestor.nodeType == 3)
    {
      origCommonAncestor = objCommonAncestor;
      objCommonAncestor = objCommonAncestor.parentNode;
    }

    var colAncestorPosition = this.getAncestorPosition(objCommonAncestor);

    // Create new object for this highlight
    var newRef =
    {
      // XXX: is this orig_html hack still relevant >=0.11 ??
      ancestorOrigTextContent: (objCommonAncestor.tagName.toLowerCase()=="body")?ShiftSpace.orig_html:objCommonAncestor.textContent,   //to avoid adding the toolbarhtml
      ancestorPosition: colAncestorPosition,
      startContainerXPath: this.generateRelativeXPath(objCommonAncestor, range.startContainer),
      startContainerOffset: range.startOffset,
      endContainerXPath: this.generateRelativeXPath(objCommonAncestor, range.endContainer),
      endContainerOffset: range.endOffset,
      origText: range.toString()
    };
    /* newRef.ancestorOrigTextContent = String.clean(newRef.ancestorOrigTextContent); */
    /* newRef.origText = String.clean(newRef.origText); */
    // Save some extra info which might be useful for recovering if load fails
    // TODO: extra data to save that might be helpful:
    //   xpath from root to common ancestor?  find it even if textcontent changes
    //   location as % within DOM / page / source.  useful to disambiguate
    newRef.startText = range.startContainer.textContent;
    newRef.endText = range.endContainer.textContent;
    newRef.startTag = range.startContainer.tagName;
    newRef.endTag = range.endContainer.tagName;

    // save original ancestor text if stored ancestor is not original
    if (newRef.origCommonAncestor)
    {
      newRef.origAncestorOrigTextContent =  (origCommonAncestor.tagName.toLowerCase()=="body")?ShiftSpace.orig_html:origCommonAncestor.textContent;   //to avoid adding the toolbarhtml
    }

    return newRef;
  },

  //returns the count of nodes that are similar to the ancestor, the index of the ancestor in this array, and the ancestore tagname
  getAncestorPosition: function(oNode)
  {
    //get the array of items with the same tag name
    var iLength,iIndex;
    var nl = document.getElementsByTagName(oNode.tagName);
    var iOccurance=0;

    for (var i=0;i<nl.length;i++)
    {
      if(nl.item(i).textContent==oNode.textContent)
      {
        iOccurance++;
        //check if this is the same Node than set the index
        if(nl.item(i)==oNode)
        iIndex = iOccurance;
      }
    }

    return {
      tagName: oNode.tagName,
      length: iOccurance,
      ancIndex: iIndex
    };
  },

  generateRelativeXPath: function(contextNode, textNode)
  {
    var saveTextNode = textNode;

    for (i = 0; textNode; )
    {
      if (textNode.nodeType == 3)
      i++;

      textNode = textNode.previousSibling;
    }

    var xpath = '/text()[' + i + ']';
    textNode = saveTextNode.parentNode;

    while (textNode != contextNode &&
           textNode != null)
    {
      var i;
      saveTextNode = textNode;

      for (i = 0; textNode; )
      {
        if (textNode.nodeType == 1)
        i++;

        textNode = textNode.previousSibling;
      }

      xpath = '/*[' + i + ']' + xpath;
      textNode = saveTextNode.parentNode;
    }

    return '.' + xpath;
  },

  // Generates a proper W3C range from some xpath elements and other
  // bits of data
  generateRange: function(ancestor, refObj)
  {
    var startContainer = document.evaluate( refObj.startContainerXPath,
                                            ancestor,
                                            null,
                                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                            null).snapshotItem(0);

    var endContainer = document.evaluate( refObj.endContainerXPath,
                                          ancestor,
                                          null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                          null).snapshotItem(0);

    var range = document.createRange();
    range.setStart(startContainer, refObj.startContainerOffset);
    range.setEnd(endContainer, refObj.endContainerOffset);

    return range;
  },


  getRangeAncestorNode: function(refObj)
  {
    //console.log('getRangeAncestorNode');
    var returnAncestor;
    var colAncestorPosition   = refObj.ancestorPosition;

    //get all the elements with the ancestor tagname
    var nl                    = document.getElementsByTagName(colAncestorPosition.tagName);
    var iIndex                = colAncestorPosition.ancIndex;
    var iOccuranceLength      = 0;
    var targetTextContent     = refObj.ancestorOrigTextContent;

    //console.log('blar');
    //check if the tag Name is the body then compare differently
    if (colAncestorPosition.tagName.toLowerCase() == "body")
    {
      //return (targetTextContent==ShiftSpace.orig_text_content)?document.getElementsByTagName('body')[0]:null;
      return document.body;
    }
    else
    {
      //check the number of occurances of the similar nodes
      //console.log('checking similar nodes ' + nl.length);
      for (var i=0;i<nl.length;i++)
      {
        //console.log(i);
        if(nl.item(i).textContent==targetTextContent)
        {
          iOccuranceLength++;
          //if this is the occurance index mark the node as the ancestor node
          if (iIndex==iOccuranceLength)
          returnAncestor = nl.item(i);
        }
      }
      //console.log('exit loop');
    }

    //validate that the page has the same number of occurances to make sure we highlight the right one
    if (iOccuranceLength == colAncestorPosition.length)
    {
      //console.log('returning ancestor');
      return returnAncestor;
    }
    else
    {
      //console.log('returning null');
      return null;
    }
  },

  // simple count of non-overlapping instances of substring within string
  countSubStrings: function(substring, string)
  {
    var offset = 0;
    var count = 0;
    
    var idx = string.indexOf(substring, offset);

    //console.log('countSubStrings idx ' + idx);
    // check for empty strings
    if(substring != '')
    {
      while (idx >= 0)
      {
        count++;
        offset = idx + substring.length;

        idx = string.indexOf(substring, offset);
        //console.log('string:' + string + ' substring:' + substring + ' offset:' + offset + ' idx:' + idx);
      }
    }
    
    //console.log('exit countSubStrings');
    
    return count;
  },


  // Count string matches within a node, or within its children if it has them.
  // Counting criteria matches the criteria used when matching range endpoints:
  // We only count matches which are intact within a child (ignore if substring
  // is broken by non-text DOM elements).
  // Don't count if it doesn't have children.  Justification: text node refs
  // are always saved relative to parent, and our recovery method only supports
  // text.  Therefore we are only interested in children.
  countStringMatchesInNodeList: function(nl, text)
  {
    var count = 0;
    for (var i = 0; i < nl.length; i++)
    {
      var element = nl.item(i);
      if (element.hasChildNodes() && 0 <= element.textContent.indexOf(text))
      {
        for (var j = 0; j < element.childNodes.length; j++)
        // make sure that text isn't an empty string
        if(text != '')
        {
          count += this.countSubStrings(text, element.childNodes[j].textContent);
        }
      }
    }
    return count;
  },

  // Given a string, make it as short as possible while keeping it
  // unique within the content of a nodelist
  shortenUniqueString: function(nl, text, shortenFromEnd)
  {
    // TODO: improve efficiency, split-the-difference rather than shrink-by-one
    var bestText = text;
    var textCount = this.countStringMatchesInNodeList(nl, bestText);
    while (text.length > 4 && textCount <= 1)
    {
      bestText = text;
      text = shortenFromEnd ? text.substring(0,text.length-2) : text = text.substring(1);
      textCount = this.countStringMatchesInNodeList(nl, text);
    }
    return bestText;
  },

  /*
   * Given pre- and post-text, find corresponding point within a list of DOM elements.
   *
   * Strategy: first minimize pre/posttext to smallest possible unique string.
   * if unique pre or posttext, match pre-then-post.  Else give up.
   */
   DOMPointerFromContext: function(nl, pretext, posttext)
   {
     //console.log('DOMPointerFromContext');
     // XXX don't use if empty/small
     //if (pretext.length < 5)
     //console.log("WARNING, pretext is too short");

     pretext = this.shortenUniqueString(nl, pretext, false);
     var pretextCount = this.countStringMatchesInNodeList(nl, pretext);
     var pretextUnique = (pretextCount == 1) ? true : false;
     posttext = this.shortenUniqueString(nl, posttext, true);
     var posttextCount = this.countStringMatchesInNodeList(nl, posttext);

     // TODO: could minimize even further, pre and post don't need to be unique as long as there is
     // a unique pre-post match.  This yields an even greater chance of matching both within
     // single children (eg not broken by other shifts)
     // console.log("pretext '" + pretext + "' posttext '" + posttext + "'");

     //check the number of occurances of the similar nodes
     //console.log('nl.length = ' + nl.length);
     for (var i = 0; i < nl.length; i++)
     {
       if(0 <= nl.item(i).textContent.indexOf(pretext))
       {
         if (nl.item(i).hasChildNodes())
         {
           var children = nl.item(i).childNodes;
           for (var j = 0; j < children.length; j++)
           {
             var idxOf =  children[j].textContent.indexOf(pretext);
             if (idxOf >= 0)
             {
               // if unique or not unique but posttext matches, we've found it
               var postIdx = children[j].textContent.substring(idxOf + pretext.length).indexOf(posttext);
               if (pretextUnique || postIdx == 0)
               return { obj: children[j], offset: idxOf + pretext.length };
             }
           }
         }
       }
     }

     // Check for posttext
     // XXX: this isn't sorted out yet... should only run if pretext is missing, short, useless
     // perhaps merged with above.  this might not even run currently.
     /*
     for (var i=0;i<nl.length;i++)
     {
       if(0 <= nl.item(i).textContent.indexOf(posttext))
       {
         var element = nl.item(i);
         if (element.hasChildNodes())
         {
           var children = element.childNodes;
           for (var j = 0; j < children.length; j++)
           {
             var idxOf =  children[j].textContent.indexOf(posttext);
             if (idxOf >= 0) return { obj: children[j], offset: idxOf};
           }
         }
       }
     }
     */
     return null;
   },

  // Given some data, attempt to return reference to corresponding point in DOM
  DOMPointerFromData: function(nl, text, offset, containerXPath, orig)
  {
    //console.log('DOMPointerFromData');
    // Handling legacy shifts (without sufficient info to always match text)
    // if the xpath is to the first text element, then we can treat parent text
    // to calculate text contect.  Empirically this is [1].
    if (text || containerXPath == "./text()[1]")
    {
      var pretext = orig.substring(0,offset);
      var posttext = orig.substring(offset);

      if (text)
      {
        pretext = text.substring(0,offset);
        posttext = text.substring(offset);
      }

      return this.DOMPointerFromContext(nl, pretext, posttext);
    }
    return null;
  },


  // Given a range, attempt to reconstruct it by examining the original context
  recoverBrokenRange: function(refObj)
  {
    //console.log('Attempting to recover the broken range.');
    try
    {
      var colAncestorPosition   = refObj.ancestorPosition;
      //get all the elements with the ancestor tagname
      var nl                    = document.getElementsByTagName(colAncestorPosition.tagName);

      // Get pointers to range start and end withing DOM
      var startRv =  this.DOMPointerFromData (nl, refObj.startText, refObj.startContainerOffset, refObj.startContainerXPath, refObj.ancestorOrigTextContent);
      
      // TODO: optimize if end == start
      var endRv =  this.DOMPointerFromData (nl, refObj.endText, refObj.endContainerOffset, refObj.endContainerXPath, refObj.ancestorOrigTextContent);

      var noPartialRange = true;
      if (noPartialRange)
      {
        // Return range only if we matched both endpoints
        if (startRv && endRv)
        {
          var range = document.createRange();
          range.setStart(startRv.obj, startRv.offset);
          range.setEnd(endRv.obj, endRv.offset);
          return range;
        }
      }
      else
      {
        // Return range.  If we only matched one endpoint,
        // return an empty range at that point.
        if (startRv || endRv)
        {
          var range = document.createRange();

          if (startRv)
          {
            range.setStart(startRv.obj, startRv.offset);
          }
          else
          {
            range.setStart(endRv.obj, endRv.offset);
          }

          if (endRv)
          {
            range.setEnd(endRv.obj, endRv.offset);
          }
          else
          {
            range.setEnd(startRv.obj, startRv.offset);
          }

          return range;
        }
      }
    }
    catch(err)
    {
      // Commonly caused by invalid offset when creating range
      //console.log ("ERROR recovering range");
    }

    return null;
  }
});
ShiftSpace.RangeCoder = new RangeCoder();


// End RangeCoder.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start Pin.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: Pin
    Convenience class for targeting nodes on a page. You can access the functionality via
    the singleton instance ShiftSpace.Pin.  It is often desirable for a shift to target a specifc node on a page
    rather than being absolute positioned.  In the case of Notes a user might want to attach that note to a specific
    node.  This is because the layout of a page is dependant on the width of the user's browser window.  In the case
    of center aligned content a note will not be in proper relation to what the shift author intended.  Pinning solves this
    issue.  In the case of ImageSwap pinning provides an high level mechanism for targeting images.  SourceShift presents
    the most complete use of the Pinning API.  SourceShift users can place arbitrary HTML before, after, relative to, or replace
    entirely any HTML element on the page.
    
    If you space requires such complex targeting it is recommended that you include a PinWidget in your interface rather than
    using the API directly.
    
  See Also:
    <PinWidget>
*/
var Pin = new Class({
  /*
    Property: toRef
      Takes a node and an action and returns a reference JSON which can be used
      to target this node later.
    
    Arguments:
      aNode - A DOM reference.
      action - a string, valid values are 'before', 'after,' 'replace', and 'relative'.
      
    Returns:
      A pin reference object.
  */
  toRef : function(aNode, action)
  {
    // find the first ancestor with an id
    var ancestor = null;
    var curNode = $(aNode);
    while(curNode != null &&
          curNode != document &&
          ancestor == null)
    {
      if(curNode.getProperty('id'))
      {
        ancestor = curNode;
      }
      else
      {
        curNode = $(curNode.getParent());
      }
    }
    
    // generate relative xpath if the ancestor and node are not the same
    var xpath = null;
    if(ancestor != aNode)
    {
      xpath = this.generateRelativeXPath(ancestor, aNode);
    }
    
    return {
      ancestorId : (ancestor && ancestor.getProperty('id')) || null,
      relativeXPath : xpath,
      action: action
    };
  },
  
  generateRelativeXPath : function(ancestor, aNode)
  {
    var xpath = '';
    while (aNode != ancestor && 
           aNode != document) 
    {
      var curNode = aNode;
      for (i = 0; curNode; )
      {
        if (curNode.nodeType == 1) i++;
        curNode = curNode.previousSibling;
      }

      xpath = '/*[' + i + ']' + xpath;
      aNode = aNode.parentNode;
    }

    return '.' + xpath;
  },
  
  /*
    Property: toNode
      Takes a pin reference JSON object and returns the targeted DOM node.
      
    Arguments:
      pinRef - a pin reference JSON object.
  */
  toNode : function(pinRef)
  {
    if(!pinRef || (pinRef.ancestorId && !pinRef.relativeXPath))
    {
      return null;
    }
    
    if(!pinRef.relativeXPath)
    {
      return $(pinRef.ancestorId);
    }
    else
    {
      var ancestor = (pinRef.ancestorId && $(pinRef.ancestorId)) || document;
      return $(document.evaluate( pinRef.relativeXPath, 
                                  ancestor, 
                                  null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                  null).snapshotItem(0));
    }
  },
  
  /*
    Property: isValidRef
      Checks to see if the pinRef object actually points to a real node.
      
    Returns:
      a boolean.
  */
  isValidRef: function(pinRef)
  {
    if(!pinRef || (!pinRef.ancestorId && !pinRef.relativeXPath)) return false;
    var node = ShiftSpace.Pin.toNode(pinRef)
    return (node != null);
  }
});
ShiftSpace.Pin = new Pin();

// End Pin.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start PinWidget.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: PinWidget
    A widget class that you can include on shift or space to allow for pinning functionality.  You should make use of this class if your shifts require complex targeting of HTML elements on the page.  If you space requires being embedded the HTML document or replacing an element HTML element in the document, PinWidget is designed for you.  You do not interact with the PinWidget directly.  You simply implement the delegate protocol defined by this class and everything happens automatically.
    The PinWidget class assumes that your delegate object has the following properties as methods.
    
    getPinRef - returns the pin reference object associated with the delegate.
    getPinWidgetButton() - returns a DOM node. This should be the DOM node where you want the PinWidget button to live.  For an example, examine the source for the Notes space.
    getPinWidgetAllowedActions() - returns an array of desired actions: before, after, replace, relative.
    onPin() - a pinEvent handler.
    
  Example:
    (start code)
    build: function()
    {
      // ... some interface building code ..
      
      var pinWidgetDiv = new ShiftSpace.Element('div', {
        'class':'MyShiftPinWidgetDiv'
      });
      
      this.pinWidget = new PinWidget(this);
    },
    
    getPinWidgetButton: function()
    {
      return this.pinWidgetDiv;
    },
    
    getPinWidgetButtonAllowedActions: function()
    {
      return ['before', 'after', 'replace];
    },
    
    onPin: function(pinRef)
    {
      if(pinRef.action == 'unpin')
      {
        this.unpin();
      }
      else
      {
        this.pin(this.element, pinRef);
      }
    }
    (end)
*/
var PinWidget = new Class({
  
  protocol: ['getPinRef', 'getPinWidgetButton', 'getPinWidgetAllowedActions', 'onPin', 'isPinned'],
  
  /*
    Function: initialize
      Takes an element that will represents the pin widget button and a callback
      function.  The callback will be made when the user has pinned a node on the
      page.  The element should be an appropriate tag with the the dimensions
      19px x 19px.
      
    Parameters:
      delegate - the delegate of this PinWidget.  Normally this either a <ShiftSpace.Space> instance or a <ShiftSpace.Shift> instance.  In either case the delegate should implement all of the methods defined in the PinWidget delegate protocol defined above.
  */
  initialize: function(delegate)
  {
    this.delegate = delegate;
    
    var message = SSImplementsProtocol(this.protocol, delegate);
    if(!message.result)
    {
      console.error('Error: delegate does not implement PinWidget protocol. Missing ' + message.missing.join(', ') + '.');
    }
    
    this.element = delegate.getPinWidgetButton();

    // check to see if the delegate has the required properties
    /*
    if(!followsProtocol(delegate, protocol))
    {
      // throw an exception, bail
      return;
    }
    */
    
    this.isPinned = false;
    
    // inser the pin widget into the element
    this.element.addClass('SSPinWidget');
    this.menuIsVisible = false;
    
    // create an image and stick in it there
    this.iconImg = new ShiftSpace.Element('img', {
      'class': 'normal',
      'src': server + 'images/ShiftMenu/blank.png'
    });
    this.iconImg.injectInside(this.element);

    this.createMenu();
    this.setMenuItems();
    
    this.element.addEvent('click', this.toggleSelection.bind(this));
    
    // check to see if the delegate is already pinned
    this.delegate.addEvent('pin', this.delegateWasPinned.bind(this));
    this.delegate.addEvent('unpin', this.delegateWasUnpinned.bind(this));
    
    __pinWidgets__.push(this);
  },
  
  /*
    Function: delegateWasPinned (private)
      Called when the delegate fires a pin event.
  */
  delegateWasPinned: function()
  {
    var pinRef = this.delegate.getPinRef();
    var targetNode = ShiftSpace.Pin.toNode(pinRef);

    if(targetNode != this.getPinnedElement())
    {
      this.setPinnedElement(targetNode);
      this.isPinned = true;
      this.updateMenu(pinRef.action)
      this.refresh();
    }
  },
  
  /*
    Function: delegateWasUnpinned (private)
      Called when the delegate fires a unpin event.
  */
  delegateWasUnpinned: function()
  {
    this.setPinnedElement(null);
    this.isPinned = false;
    this.refresh();
  },
  
  capitalize: function(str)
  {
    return str.charAt(0).toUpperCase()+str.substr(1, str.length-1);
  },
  
  /*
    Function: createMenu (private)
      Creates the pinning selection menu.
  */
  createMenu: function()
  {
    this.menu = new ShiftSpace.Element('div', {
      'class': "SSPinMenu"
    });

    // build the menu
    
    // the top item
    this.menuTopItem = new ShiftSpace.Element('div', {
      'class': "SSPinMenuTopItem item"
    });
    this.menuTopItem.setHTML("<div class='SSLeft'><div class='radio off'></div><span></span></div><div class='SSRight'></div>");
    this.menuTopItem.injectInside(this.menu);
    
    // don't add this one, we'll clone it
    this.menuItem = new ShiftSpace.Element('div', {
      'class': "SSPinMenuItem item"
    });
    this.menuItem.setHTML("<div class='SSLeft'><div class='radio off'></div><span></span></div><div class='SSRight'></div>");
    
    // add the bottom items, always unpin
    this.menuBottomItem = new ShiftSpace.Element('div', {
      'class': "SSPinMenuBottomItem item"
    });
    this.menuBottomItem.setHTML("<div class='SSLeft'><div class='radio off'></div><span>Unpin</span></div><div class='SSRight'></div>");
    this.menuBottomItem.injectInside(this.menu);    
    
    // hide the menu
    this.menu.setStyle('display', 'none');

    // add menu to the parent note of the delegate's pin widget button
    this.menu.injectInside(this.element.getParent());
    
    this.menu.addEvent('click', this.userSelectedPinAction.bind(this));
  },
  
  /*
    Function: setMenuItems (private)
      Sets the pin widgets menu items based on the allowed actions specified by the delegate.
  */
  setMenuItems: function()
  {
    var actions = this.delegate.getPinWidgetAllowedActions();
    
    // first make sure the menu is big enough
    var menuItemsToAdd = actions.length - 1;
    for(var i = 0; i < menuItemsToAdd; i++)
    {
      this.menuItem.clone(true).injectBefore(this.menuBottomItem);
    }
    
    // set the first menu item
    this.menuTopItem.addClass(actions[0]);
    this.menuTopItem.getElement('span').setText(actions[0].capitalize());
    
    // add the rest
    for(var i = 0; i < this.menu.getElements('.SSPinMenuItem').length; i++)
    {
      var item = this.menu.getElements('.SSPinMenuItem')[i];
      item.addClass(actions[i+1]);
      item.getElement('span').setText(actions[i+1].capitalize());
    }
    
    // set the last item
    this.menuBottomItem.addClass('unpin');
    this.menuBottomItem.getElement('span').setText('Unpin');
  },
  
  /*
    Function: updateMenu (private)
      Refresh the pin selection menu.
  */
  updateMenu: function(action)
  {
    var target = this.menu.getElement('.'+action);
    
    // turn off any of the other ones
    target.getParent().getElements('.radio').removeClass('on');
    target.getParent().getElements('.radio').addClass('off');
    
    // turn on the toggle
    if(action != 'unpin')
    {
      target.getElement('.radio').removeClass('off');
      target.getElement('.radio').addClass('on');
    }
  },
  
  /*
    Function: toggleSelection (private)
      Toggles the pin selection mode. There are three, a) node selection mode, b) menu selection mode, c) pinned mode.
      
    Parameters:
      _evt - a DOM event.
  */
  toggleSelection: function(_evt)
  {
    var evt = new Event(_evt);
    evt.stopPropagation();
    
    // check to see if the element is alread pinned
    if(this.isPinned)
    {
      if(this.menu.getStyle('display') == 'none')
      {
        this.showMenu();
      }
      else
      {
        this.hideMenu();
      }
    }
    else
    {
      // check to see if we are in selecting mode
      if(!this.isSelecting)
      {
        this.isSelecting = true;
        
        // start selecting
        this.iconImg.addClass('select');
        SSStartPinSelection(this);
      }
      else
      {
        this.isSelecting = false;
        
        // stop selecting
        this.iconImg.removeClass('select');
        SSStopPinSelection();
      }
    }
  },
  
  /*
    Function: showMenu (private)
      Shows the pin selection options menu.
      
    Parameters:
      _evt - a DOM event.
  */
  showMenu: function(_evt)
  { 
    var position = this.element.getPosition();
    var size = this.element.getSize().size;
    
    this.element.addClass('SSPinWidgetMenuOpen');
    
    this.menu.setStyles({
      left: this.element.offsetLeft - 12,
      top: this.element.offsetTop + size.y - 3,
      display: 'block'
    });
    
    // check for pin reference
    if(this.delegate.getPinRef() && this.delegate.isPinned())
    {
      this.updateMenu(this.delegate.getPinRef().action);
    }
  },
  
  /*
    Function: hideMenu (private)
      Hides the pin selectin option menu.
      
    Parameters:
      _evt - a DOM event.
  */
  hideMenu: function(_evt)
  {
    this.element.removeClass('SSPinWidgetActive');
    this.element.removeClass('SSPinWidgetMenuOpen');
    this.menu.setStyle('display', 'none');

    // remove styles 
    this.iconImg.removeClass('select');
    this.element.removeClass('SSPinWidgetMenuOpen');
    this.setPinnedElement(null);
  },
  
  /*
    Function: userPinnedElement (private)
      User pinned the element.  This should never be called directly, ShiftSpace Core handles this.  Implicity show the pin selection option menu.
      
    Parameters:
      element - a DOM node.
  */
  userPinnedElement: function(element)
  {
    this.setPinnedElement(element)
    this.showMenu();
  },
  
  /*
    Function: setPinnedElement (private)
      Sets an internal reference to a pinned element.
      
    Parameters:
      element - a DOM node.
  */
  setPinnedElement: function(element)
  {
    // user selected node
    this.isSelecting = false;
    this.pinnedElement = element;
  },

  /*
    Function: getPinnedElement (private)
      Returns the pinned element. You should not call this directly.
      
    Parameters:
      element - a DOM node.
  */
  getPinnedElement: function(element)
  {
    return this.pinnedElement;
  },
  
  /*
    Function: userSelectedPinAction (private)
      Event handler that called when the user selects an option from the pin selection option menu.
      
    Parameters:
      _evt - a DOM event.
  */
  userSelectedPinAction: function(_evt)
  {
    var evt = new Event(_evt);
    var target = $(evt.target);
    
    while(!target.hasClass('item'))
    {
      target = target.getParent();
    }
    
    var action = null;
    
    if(target.hasClass('before')) 
    {
      action = 'before';
    }
    if(target.hasClass('replace'))
    {
      action = 'replace'
    }
    if(target.hasClass('after'))
    {
      action = 'after';
    }
    if(target.hasClass('relative'))
    {
      action = 'relative';
    }
    if(target.hasClass('unpin'))
    {
      action = 'unpin';
    }
    
    // store this for menu display
    this.pinAction = action;
    
    // check to see if the pinned element has changed since last time
    var elementChanged = (this.lastPinned != this.pinnedElement);
    this.lastPinned = this.pinnedElement;
    
    // update the menu
    this.updateMenu(action);
    
    // this could probably be a little cleaner
    if(target.hasClass('unpin'))
    {
      this.delegate.onPin({action: 'unpin'});
      
      this.iconImg.removeClass('pinned');
      this.isPinned = false;
    }
    else
    {
      this.iconImg.removeClass('select');
      this.iconImg.addClass('pinned');
      
      // if the element didn't change use the old pin ref
      // and just change the action
      if(!elementChanged)
      {
        this.pinRef.action = action;
      }
      else
      {
        this.pinRef = ShiftSpace.Pin.toRef(this.pinnedElement, action);
      }

      // store the shift element that is pinned
      this.delegate.onPin(this.pinRef);

      this.iconImg.addClass('pinned');
      this.isPinned = true;
    }
    
    // hide the menu
    this.hideMenu();
  },
  
  /*
    Function: refresh (private)
      Called the refresh the appearance of the pin widget.
  */
  refresh: function()
  {
    if(!this.getPinnedElement())
    {
      this.menu.setStyle('display', 'none');
      this.iconImg.removeClass('select');
      this.iconImg.removeClass('pinned');
    }
    else
    {
      this.iconImg.removeClass('select');
      this.iconImg.addClass('pinned');
    }
    
    if(!this.menu.getStyle('display') == 'none') 
    {
      // update the menu spot
    }
  }
});
ShiftSpace.PinWidget = PinWidget;

// End PinWidget.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start Plugin.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: ShiftSpace.Plugin
    Abstract class interface for plugin.  Currently only used Trails.
*/
ShiftSpace.Plugin = new Class({
  
  attributes:
  {
    name: null,
    title: null,
    icon: null,
    css: null
  },
  
  /*
    Function: initialize (private)
      Initializes the plugin. Implicitly calls SSRegisterPlugin as well as subclass's setup method.
  */
  initialize: function(json)
  {
    if(ShiftSpace.Plugin.types.hasKey(this.pluginType))
    {
      switch(this.pluginType)
      {
        case 'kMenuTypePlugin':
        break;
        case 'kInterfaceTypePlugin':
        break;
      }
    }
    else
    {
      console.error('Error: Invalid plugin type. ' + this.pluginType);
      return;
    }
    
    // do some stuff
    ShiftSpace.Console.addEvent('select' + this.attributes.name, this.menuForShift.bind(this));
    ShiftSpace.Console.addEvent('closeMenu', this.closeMenu.bind(this));

    SSRegisterPlugin(this);
    this.setup();
  },
  
  /*
    Function: serverCall
      Allows a plugin to make a server call.
      
    Parameters:
      method - the method name to call.
      params - the url parameters to be passed in.
      callback - the function to called when server call is complete.
  */
  serverCall: function(method, params, callback)
  {
    serverCall.safeCall('plugins.'+this.attributes.name+'.'+method, params, callback);
  },
  
  /*
    Function: setInterfaceIsBuilt (private)
      Set the internal flag tracking whether the interface has been constructed yet.
      
    Parameters:
      val - a boolean.
  */
  setInterfaceIsBuilt: function(val)
  {
    this.__interfaceIsBuilt__ = val;
  },

  /*
    Function: interfaceIsBuilt (private)
      Returns the value of the internal flag tracking whether the plugin interface has been constructed.
    
    Returns:
      a boolean.
  */
  interfaceIsBuilt: function()
  {
    return this.__interfaceIsBuilt__;
  },
  
  /*
    Function: setup (abstract)
      To be implemented by subclasses.
  */
  setup: function(options) {},
  
  /*
    Function: showInterface (private)
      Show the plugin interface.
  */
  showInterface: function() {},
  
  /*
    Function: buildInterface (abstract)
      To be implemented by subclasses.
  */
  buildInterface: function() {},
  
  /*
    Function: menuIcon (abstract)
      Not yet implemented
  */
  menuIcon: function() {},
  
  /*
    Function: menuIconForShift (abstract)
      Returns the icon for a shift.
      
    Parameters:
      shiftId - a shift id.
  */
  menuIconForShift: function(shiftId) {},
  
  /*
    Function: menuForShift
      Return a menu for a shift.
      
    Parameters:
      shiftId - a shift id.
  */
  menuForShift: function(shiftId) {},
  
  /*
    Function: closeMenu
      Close the plugin menu.
  */
  closeMenu: function() 
  {
    ShiftSpace.Console.hidePluginMenu();
  },
  
  /*
    Function: onCssLoad
      not implemented yet.
  */
  onCssLoad: function()
  {
    this.fireEvent('load');
  },
  
  /*
    Function: enterFullScreen
      Used to put the plugin in full screen mode.
  */
  enterFullScreen: function() 
  {
    if(SSCanGoFullScreen() && !ShiftSpaceIsHidden())
    {
      ShiftSpaceHide();
      return true;
    }
    else
    {
      // can't go full screen
      return false;
    }
  },
  
  /*
    Function: exitFullScreen
      Used when the plugin should exit full screen mode.
  */
  exitFullScreen: function() 
  {
    if(SSCanExitFullScreen() && ShiftSpaceIsHidden())
    {
      ShiftSpaceShow();
      return true;
    }
    else
    {
      return false;
    }
  },
  
  /*
    Function: getShift
      Grab shift data for a shift.
      
    Parameters:
      shiftId - a shift id.
      
    Returns:
      A copy of the shift's properties.
  */
  getShift: function(shiftId)
  {
    // heh, no reason to copy now SSGetShiftData returns a copy
    var temp = SSGetShiftData(shiftId);
    var copy = {};
    
    for(var prop in temp)
    {
      copy[prop] = temp[prop];
    }
    copy.href = SSGetUrlForShift(shiftId);
    
    return copy;
  },
  
  /*
    Function: SSGetShifts
      Returns an array of shift properties
      
    Parameters:
      shiftIds - an array of ids.
      callBack - a function to be called when the shifts have been grabbed.
      errorHandler - a function to be called if the operation fails.
  */
  getShifts: function(shiftIds, callBack, errorHandler)
  {
    SSGetShifts(shiftIds, callBack, (errorHandler || this.errorHandler.bind(this)));
  },
  
  /*
    Function: errorHandler (abstract)
      Default error handler for ShiftSpace.Plugin.error.
      
    Parameters:
      error - an error Object.
  */
  errorHandler: function(error)
  {
    console.error("Error: Plugin call to getShifts failed, " + error.message);
  },
  
  /*
    Function: recentlyViewedShifts
      Returns a hash of recently viewed shifts.
    
    Parameters:
      callback - a function to be called when the recently viewed shifts has been returned.
  */
  recentlyViewedShifts: function(callback)
  {
    return SSGetRecentlyViewedShifts(callback);
  },
  
  /*
    Function: delayedMenu
      Returns whether the menu is of the delayed typed.
      
    Returns:
      A javascript object with a delayed property set to true.
  */
  delayedMenu: function()
  {
    return {'delayed': true};
  },
  
  
  loadStyle: function(filename, callback, frame)
  {
    // pass through
    loadStyle.safeCall(['plugins', this.attributes.name, filename].join('/'), callback, frame);
  },
  
});

ShiftSpace.Plugin.implement(new Events);

ShiftSpace.Plugin.types = new Hash(
{
  kMenuTypePlugin: "kMenuTypePlugin",
  kInterfaceTypePlugin: "kInterfaceTypePlugin"
});

// End Plugin.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start ShiftMenu.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: ShiftMenu
    A singleton Class that represents the ShiftMenu. It is used to create new shifts.
*/
var ShiftMenu = new Class({
  
  /*
    Function: initialize
      Initializes the shift menu.
  */
  initialize: function(options) 
  {
    this.menuVisible = false;
    this.spaces = {};
    
    // we want to know about install and uninstall events
    SSAddEvent('onSpaceInstall', this.addSpace.bind(this));
    SSAddEvent('onSpaceUninstall', this.removeSpace.bind(this));
  },
  
  /*
    Function: buildMenu
      Construct the shift menu interface.
  */
  buildMenu: function() 
  {
    this.element = new ShiftSpace.Element('div', {
      id: 'SS_ShiftMenu',
      styles: {
        display: 'none'
      }
    });
    this.element.addEvent('mouseover', function() {
      this.element.style.display = 'block';
      this.element.addClass('hover');
    }.bind(this));
    this.element.addEvent('mouseout', function() {
      this.element.removeClass('hover');
    }.bind(this));
    
    var container = new ShiftSpace.Element('div', {
      'class': 'container',
      styles: {
        width: (26 * spaces.length)
      }
    }).injectInside(this.element);
    this.element.injectInside(document.body);
    
    new ShiftSpace.Element('br', {
      styles: {
        clear: 'both'
      }
    }).injectInside(container);
    
    for (var spaceName in installed) {
      this.addSpace(spaceName);
    }
  },
  
  /*
    Function: addSpace
      Add a new space icon to the menu.
      
    Parameters:
      spaceName - the name of Space as a string.
  */
  addSpace: function(spaceName) 
  {
    // TODO: we need the icon to not be separate from the space so that we can do incremental loading.
    var spaceAttrs = ShiftSpace.info(spaceName);
    var container = this.element.firstChild;
    var clear = container.getElementsByTagName('br')[0];
    var button = new ShiftSpace.Element('div', {
      'class': 'button',
      'title': spaceAttrs.title
    });
    
    var icon = new ShiftSpace.Element('img', {
      src: spaceAttrs.icon
    });
    icon.injectInside(button);
    button.injectBefore(clear);
    this.spaces[spaceName] = button;
    
    icon.addEvent('mouseover', function() {
      button.addClass('hover');
    });
    
    icon.addEvent('mouseout', function() {
      button.removeClass('hover');
    });
    
    icon.addEvent('click', function(e) {
      if (!ShiftSpace.User.isLoggedIn()) {
        window.alert('Sorry, you must be signed in to create new shifts.');
        this.hide(true);
        return;
      }
      if (SSCheckForUpdates()) {
        return;
      }
      var event = new Event(e);
      if(!spaces[spaceName])
      {
        // we need to load the space first
        loadSpace(spaceName, null, function() {
          initShift(spaceName, {position:{x: event.page.x, y:event.page.y}});
        });
      }
      else
      {
        // just show it
        initShift(spaceName, {position:{x: event.page.x, y:event.page.y}});
      }
      this.hide(true);
    }.bind(this));
  },
  
  /*
    Function: removeSpace
      Remove a space icon from the menu.
      
    Parameters:
      spaceName - a space name as a string.
  */
  removeSpace: function(spaceName) 
  {
    this.spaces[spaceName].remove();
  },
  
  /*
    Function: show
      Show the menu.
      
    Parameters:
      x - the current x mouse location.
      y - the current y mouse location.
  */
  show: function(x, y) 
  {
    if (!this.element) 
    {
      return;
    }
    if (!this.menuVisible && !ShiftSpaceIsHidden()) 
    {
      this.menuVisible = true;
      this.element.setStyles({
        left: (x + 10) + 'px',
        top: (y - 5) + 'px',
        display: 'block'
      });
    }
  },
  
  /*
    Function: hide
      hide the menu.
      
    Parameters:
      forceHide - a boolean to force hide the menu.
  */
  hide: function(forceHide) {
    if (!this.element) {
      return;
    }
    if (forceHide || !this.element.hasClass('hover')) {
      this.menuVisible = false;
      this.element.setStyle('display', 'none');
    }
  }
  
});

ShiftSpace.ShiftMenu = new ShiftMenu();


// End ShiftMenu.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start Console.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
  Class: Console
    Singleton object representing the ShiftSpace Console.  The single can be access via ShiftSpace.Console.
*/
var Console = new Class({
  
  initialize: function(options) {
    this.shiftCount = 0;
    
    this.buildFrame();
    
    // add a window resize event, so the resizer is in the right place
    window.addEvent('resize', function() {
      // refresh if ShiftSpace isn't in fullscreen mode
      if(!ShiftSpaceIsHidden()) this.refresh();
    }.bind(this));
    
    // Attach some events that we care about
    SSAddEvent('onSpaceInstall', this.onSpaceInstall.bind(this));
    SSAddEvent('onSpaceUninstall', this.onSpaceUninstall.bind(this));
    
    SSAddEvent('onShiftEdit', this.editShift.bind(this));
    
    SSAddEvent('onUserLogin', this.handleLogin.bind(this));
    SSAddEvent('onUserLogout', this.handleLogout.bind(this));
    
    SSAddEvent('onShiftUpdate', this.updateShiftPrivacy.bind(this));
    
    SSAddEvent('onPluginStatusChange', this.updatePluginIconForShift.bind(this));

  },
  
  /*
  
  Function: buildFrame
  Build the iframe that will hold the console.
  
  */
  buildFrame: function() {
    var consoleHeight = Math.min(getValue('console.height', 150), 150);
    
    this.frameWrapper = new ShiftSpace.Element('div', {
      id: "SSConsoleFrameWrapper",
      styles:
      {
        height: 150,
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        'z-index': '1000001',
        opacity: 0.9,
        height: '150px'
      }
    });
    
    this.frame = new ShiftSpace.Iframe({
      id: 'ShiftSpaceConsole',
      addCover: false,
      src: "about:blank",
      /* set the styles here so that users doesn't see the console because of css load delay */
      styles:
      {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      },
      onload: function() 
      {
        // store a ref for convenience
        this.doc = this.frame.contentDocument;
        // create the model shift
        this.createShiftEntryModel();
        // load the style for document
        this.loadStyle();

        this.doc.addEventListener('keydown',  keyDownHandler.bind(ShiftSpace), false);
        this.doc.addEventListener('keyup',    keyUpHandler.bind(ShiftSpace), false);
        this.doc.addEventListener('keypress', keyPressHandler.bind(ShiftSpace), false);

      }.bind(this)
    });
    
    this.frameWrapper.injectInside(document.body);
    this.frame.injectInside(this.frameWrapper);

    this.resizer = new ShiftSpace.Element('div', {
      'id': 'SSConsoleResizer',
      'style': 
      {
        'bottom': consoleHeight - 5
      }
    });
    
    this.resizer.injectInside(document.body);
    
    // to prevent things from dropping into the iframe.
    this.resizeMask = new ShiftSpace.Element('div', {
      id: 'SSConsoleResizeMask'
    });

    this.resizer.makeDraggable({
      limit: 
      {
        x: [25, 25]
      },
      
      onStart: function() 
      {
        this.startDrag = this.resizer.getPosition().y;
        this.startHeight = this.getHeight();
        this.resizeMask.injectInside(document.body);
      }.bind(this),
      
      onDrag: function() 
      {
        var dy = this.resizer.getPosition().y - this.startDrag;
        this.setHeight(this.startHeight - dy);
        this.refresh();
      }.bind(this),
      
      onComplete: function() {
        this.resizeMask.remove();
        setValue('console.height', this.getHeight());
      }.bind(this)
      
    });
    
    this.resizer.setStyle('position', 'fixed');
  },
    
  buildNotifier: function() 
  {
    this.notifier = new ShiftSpace.Element('div', {
      'class': 'SSConsoleNotifier',
      styles : 
      {
        display: 'none'
      }
    });
        
    var img = new ShiftSpace.Element('img', {
      src: server + 'images/Console/notifier-icon.png',
      alt: 'ShiftSpace',
      styles: {
        cursor: 'pointer'
      }
    });
    img.injectInside(this.notifier);
    this.notifier.injectInside(document.body);
    
    img.addEvent('click', function() {
      if (!this.isVisible()) 
      {
        this.show();
      } 
      else if (this.getHeight() == 0) 
      {
        //this.frame.setStyle('height', getValue('console.height', 150));
        this.setHeight(150);
        this.refresh();
      } 
      else 
      {
        this.hide()
      }
    }.bind(this));
    
    this.notifierFx = new Fx.Style(this.notifier, 'bottom', {
      duration: 800,
      transition: Fx.Transitions.Quad.easeOut
    });
    
    // Call private console is ready function
    SSConsoleIsReady();
  },
  
  
  /*
  
  Function: buildPluginMenu
  Builds the plug-in menu for the console.
  
  */
  buildPluginMenu: function()
  {
    // the tab connecting the icon to the menu
    this.pluginMenuTab = new ShiftSpace.Element('div');
    this.pluginMenuTab.setStyle('display', 'none');
    this.pluginMenuTab.setProperty('id', "SSConsolePluginMenuTab");

    this.pluginMenuTabIcon = new ShiftSpace.Element('div');
    this.pluginMenuTabIcon.addClass('SSPluginMenuTabIcon SSUserSelectNone');
    this.pluginMenuTabIcon.injectInside(this.pluginMenuTab);
    
    this.pluginMenu = new ShiftSpace.Element('div');
    this.pluginMenu.setStyle('display', 'none');
    this.pluginMenu.setProperty('id', 'SSConsolePluginMenu');
    this.pluginMenu.addClass('SSMenu SSUserSelectNone');

    this.topItem = new ShiftSpace.Element('div');
    this.topItem.addClass('SSMenuTopItem');
    this.topItem.addClass('item');
    this.topItem.setHTML("<div class='SSLeft'><span>Top Item</span></div><div class='SSRight'></div>");
    
    this.middleItem = new ShiftSpace.Element('div');
    this.middleItem.addClass('SSMenuItem');
    this.middleItem.addClass('item');
    this.middleItem.setHTML("<div class='SSLeft'><span>Middle Item</span></div><div class='SSRight'></div>");
    
    this.menuItemModel = this.middleItem.clone(true);
    
    this.bottomItem = new ShiftSpace.Element('div');
    this.bottomItem.addClass('SSMenuBottomItem');
    this.bottomItem.addClass('item');
    this.bottomItem.setHTML("<div class='SSLeft'><span>Bottom Item</span></div><div class='SSRight'></div>");
    
    this.topItem.injectInside(this.pluginMenu);
    this.middleItem.injectInside(this.pluginMenu);
    this.bottomItem.injectInside(this.pluginMenu);
    
    this.pluginMenuTab.addClass('SSDisplayNone');
    this.pluginMenu.addClass('SSDisplayNone');

    this.pluginMenuTab.injectInside(document.body);
    this.pluginMenu.injectInside(document.body);
    
    // handle closing the plugin menu if anything else gets clicked
    $(this.doc.body).addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      var target = $(evt.target);
      
      if(!target.hasClass('plugin') &&
         !$(this.pluginMenu).hasChild(target))
      {
        this.hidePluginMenu();
      }
    }.bind(this));
    
    loadStyle('styles/ShiftSpace.css', null, this.frame );
  },
  
  /*
    Function: setPluginMenuItems
      Set the items for the plugin menu.
  */
  setPluginMenuItems: function(shiftId, _itemsAndActions)
  {
    var itemsAndActions = _itemsAndActions;
    
    if(!itemsAndActions.delayed)
    {
      // remove all the menu items
      $(this.pluginMenu).getElements('.SSMenuItem').each(function(x) {x.remove();});

      for(var i = 0; i < itemsAndActions.length; i++)
      {
        // default enabled to true
        var cia = $merge({enabled:true}, itemsAndActions[i]);
        
        var txt = cia.text;
        var cb = cia.callback;
        var enabled = cia.enabled;
      
        var span;
        if(i == 0)
        {
          span = this.pluginMenu.getElement('.SSMenuTopItem span');
          
          this.topItem.removeEvents();
          this.topItem.addEvent('click', cb.bind(null, shiftId));
        }
        else if(i == itemsAndActions.length-1)
        {
          span = this.pluginMenu.getElement('.SSMenuBottomItem span');

          this.bottomItem.removeEvents();
          this.bottomItem.addEvent('click', cb.bind(null, shiftId));
        }
        else
        {
          var newItem = this.menuItemModel.clone(true);
        
          span = newItem.getElement('span');

          newItem.removeEvents();
          newItem.addEvent('click', cb.bind(null, shiftId));
          newItem.injectBefore(this.pluginMenu.getElement('.SSMenuBottomItem'));
        }
        
        span.setText(txt);
        if(!enabled) 
        {
          span.addClass('SSDisabledMenuItem');
        }
        else
        {
          span.removeClass('SSDisabledMenuItem');
        }
      }
    }
    else
    {
      // remove all the menu items
      $(this.pluginMenu).getElements('.SSMenuItem').each(function(x) {x.remove();});
      
      // show a loading menu
      this.pluginMenu.getElement('.SSMenuTopItem span').setText("One moment");
      this.topItem.removeEvents();
      this.pluginMenu.getElement('.SSMenuBottomItem span').setText("loading...");
      this.bottomItem.removeEvents();
    }
  },
  
  pluginLoaded: function(plugin)
  {
    // better
  },
  
  plugInActionForItem: function(item)
  {
    // better
  },
  
  /*
    Function: showPluginMenu
      Show the plugin menu.
  */
  showPluginMenu: function(plugin, anchor)
  {
    var pos = $(anchor).getPosition([$(this.doc.getElementById('scroller'))]);
    //var framePos = this.frame.getPosition();
    var framePos = this.frameWrapper.getPosition();
    var size = $(anchor).getSize().size;
    
    var pluginMenu = $(this.pluginMenu);
    var pluginMenuTab = $(this.pluginMenuTab);
    var pluginMenuTabIcon = $(this.pluginMenuTabIcon)
    
    // clear out the display none styles
    pluginMenu.setStyle('display', '');
    pluginMenuTab.setStyle('display', '');
    
    pluginMenuTabIcon.addClass(plugin.menuIcon());

    pluginMenuTab.setStyles({
      left: pos.x-6,
      /*top: pos.y-3+framePos.y*/
      bottom: this.getHeight()-pos.y-19
    });
    pluginMenu.setStyles({
      left: pos.x-15, 
      bottom: this.getHeight()-pos.y+2
    });
    
    pluginMenu.removeClass('SSDisplayNone');
    pluginMenuTab.removeClass('SSDisplayNone');
  },
  
  showPluginMenuForShift: function(plugin, shiftId)
  {
    var target = _$(this.doc.getElementById(shiftId)).getElementByClassName('pg' + plugin);
    // in case it's delayed
    var cb = function(menuItems) {
      this.setPluginMenuItems(shiftId, menuItems);
    }.bind(this);
    this.setPluginMenuItems(shiftId, plugins[plugin].menuForShift(shiftId, cb));
    this.showPluginMenu(plugins[plugin], target);
  },
  
  /*
    Function: hidePluginMenu
      Hide the plugin menu.
  */
  hidePluginMenu: function()
  {
    if(this.pluginMenu) this.pluginMenu.addClass('SSDisplayNone');
    if(this.pluginMenuTab) this.pluginMenuTab.addClass('SSDisplayNone');
  },
  

  showNotifier: function() 
  {
    if(!this.isVisible())
    {
      if (this.cancelNotifier) 
      {
        this.loadShifts();
      } 
      else 
      {
        this.notifier.setStyle('display', '');
        this.notifier.removeClass('SSDisplayNone');

        this.notifierFx.start(-32, 0).chain(function() {
          this.loadShifts();
          this.hideNotifier.delay(3000, this);
        }.bind(this));
      }
      this.hideNotifier.delay(3000, this);
    }
  },
  
  
  hideNotifier: function() 
  {
    if (!this.cancelNotifier) 
    {
      this.cancelNotifier = true;
      this.notifierFx.start(0, -32);
    }
  },
  
  
  /*
    Function : loadStyle
      Load the style for console.
  */
  loadStyle: function() {
    // TODO - Fix loadStyle to accept target frame to do this crap
    /* Load console styles */
    loadStyle('styles/Console.css', function() {
      this.buildNotifier();
      this.buildContents();
      /* Load all plugin styles */
      for(var plugin in installedPlugins)
      {
        // FIXME: erg style bug - David
        //loadStyle('plugins/'+plugin+'/'+plugin+'.css', null, this.frame );
        loadStyle('plugins/'+plugin+'/Console.css', null, this.frame );
      }
      loadStyle('styles/ShiftSpace.css', this.buildPluginMenu.bind(this), this.frame );
    }.bind(this), this.frame );
  },
  
  /*
  
  Function: buildContents
  Builds the console area.
  
  */
  buildContents: function() {
    var content = $(this.doc.createElement('div'));
    content.setAttribute('id', 'console');
    content.setHTML('<div class="outer"><div class="inner">' +
                    '<div id="top"><div id="tabs" class="SSUserSelectNone">' +
                    '<div id="controls">' +
                    '<div id="loginStatus">You are not logged in</div>' +
                    '<div id="auth" class="button auth"><div class="image"></div></div>' +
                    '<div id="bugs" class="button bugs"><div class="image" title="File a bug report"></div></div>' +
                    '<div id="hide" class="button hide"><div class="image" title="Minimize console"></div></div>' +
                    '<br class="clear" />' +
                    '</div>' +
                    '<br class="clear" />' +
                    '</div></div></div></div>' +
                    '<div class="left"><div class="right">' +
                    '<div id="bottom">' +
                    '<div id="actions"></div>' +
                    '<div id="scroller"></div>' +
                    '</div></div></div>');
    content.injectInside(this.doc.body);
    
    var controls = $(this.doc.getElementById('controls'));
    
    var auth = $(this.doc.getElementById('auth'));
    auth.addEvent('mouseover', function() {
      auth.addClass('hover');
    });
    auth.addEvent('mouseout', function() {
      auth.removeClass('hover');
    });
    auth.addEvent('click', function(_evt) {
      if (ShiftSpace.User.getUsername()) 
      {
        ShiftSpace.User.logout();
      } 
      else 
      {
        this.showTab('login');
      }
      this.setupAuthControl();
    }.bind(this));
    this.setupAuthControl();
    
    var bugReport = $(this.doc.getElementById('bugs'));
    bugReport.addEvent('mouseover', function() {
      bugReport.addClass('hover');
    });
    bugReport.addEvent('mouseout', function() {
      bugReport.removeClass('hover');
    });
    bugReport.addEvent('click', function() {
      window.open('http://metatron.shiftspace.org/trac/newticket');
    });
    
    var hide = $(this.doc.getElementById('hide'));
    hide.addEvent('mouseover', function() {
      hide.addClass('hover');
    });
    hide.addEvent('mouseout', function() {
      hide.removeClass('hover');
    });
    hide.addEvent('click', function() {
      hide.removeClass('hover');
      this.hide();
    }.bind(this));
    
    this.addTab('shifts', '0 shifts');
    this.addTab('settings', 'Settings', 'icon-settings.gif');
    
    if (!ShiftSpace.User.isLoggedIn()) {
      this.addTab('login', 'Login');
    }
    
    this.buildLogin();
    this.buildSettings();
    this.showTab('shifts');
  },
  
  
  setupAuthControl: function() {
    var auth = $(this.doc.getElementById('auth'));
    if (!auth) {
      return;
    }
    var loginStatus = $(this.doc.getElementById('loginStatus'));
    if (ShiftSpace.User.isLoggedIn()) 
    {
      auth.removeClass('login');
      auth.addClass('logout');
      auth.setAttribute('title', 'Logout');
      loginStatus.setHTML('Logged in as <b>' + ShiftSpace.User.getUsername() + '</b>');
      // TODO: Bad place for this a hack - David
      this.updateDefaultShiftStatus();
    } 
    else 
    {
      auth.removeClass('logout');
      auth.addClass('login');
      auth.setAttribute('title', 'Login');
      loginStatus.setText('You are not logged in');
    }
  },
  
  
  buildSettings: function() 
  {
    var sections = this.createSubSections('settings', ['General', 'Spaces', 'Account']);
    if (!ShiftSpace.User.isLoggedIn()) {
      this.hideSubTab('settings', 2);
    }
    
    /*
      WARNING: THE USER MIGHT NOT HAVE BEEN LOGGED IN YET SO GRABBING PREFS WILL FAIL, APPROPIATE METHODS
               MUST BE CALLED FROM handleLogin - DAVID
    */
    
    var default_shift_status = SSGetDefaultShiftStatus(true);

    if (default_shift_status == 1) {
      default_shift_status = ' checked';
    } else {
      default_shift_status = '';
    }
    
    var defaultEmailComments = ShiftSpace.User.getEmailCommentsDefault();


    if (defaultEmailComments == 1) 
    {
      defaultEmailComments = ' checked';
    } 
    else 
    {
      defaultEmailComments = '';
    }
    
    $(sections[0]).setHTML('<div class="form-column">' +
                        '<div class="input"><div id="default_privacy" class="checkbox' + default_shift_status + '"></div>' +
                        '<div class="label">Set my shifts public by default</div>' +
                        '<br class="clear" /></div>' +
                        '<div class="input"><div id="default_comments" class="checkbox' + defaultEmailComments + '"></div>' +
                        '<div class="label">Email me when someone comments my shifts</div>' +
                        '<br class="clear" /></div>' +
                        '<div class="input"><label for="server-input">Server address:</label>' +
                        '<input type="text" name="server" value="' + server + '" id="server-input" size="40" class="text" />' +
                        '</div><br class="clear" />');
                        
    $(SSGetElementByClass('form-column', sections[0])).setStyle('padding-top', 20);
    
    var default_privacy = $(this.doc.getElementById('default_privacy'))

    default_privacy.addEvent('click', function(_evt) {
      var init_privacy = $(this.doc.getElementById('init_privacy'));
      if (!default_privacy.hasClass('checked')) 
      {
        default_privacy.addClass('checked');
        SSSetDefaultShiftStatus(1);
        if (init_privacy) 
        {
          init_privacy.addClass('checked');
        }
      } 
      else 
      {
        default_privacy.removeClass('checked');
        SSSetDefaultShiftStatus(2);
        if (init_privacy) 
        {
          init_privacy.removeClass('checked');
        }
      }
    }.bind(this));
    
    var defaultEmailCommentCheckBox = $(this.doc.getElementById('default_comments'));
    defaultEmailCommentCheckBox.addEvent('click', function(_evt) {
      if (!defaultEmailCommentCheckBox.hasClass('checked')) 
      {
        defaultEmailCommentCheckBox.addClass('checked');
        ShiftSpace.User.setEmailCommentsDefault(1);
      } 
      else 
      {
        defaultEmailCommentCheckBox.removeClass('checked');
        ShiftSpace.User.setEmailCommentsDefault(0);
      }
    }.bind(this));
    
    var serverInput = $(this.doc.getElementById('server-input'));
    serverInput.addEvent('change', function() {
      var newServer = serverInput.value;
      if (newServer.substr(newServer.length - 2, 1) != '/') {
        newServer = newServer + '/';
      }
      if (newServer.substr(0, 7) != 'http://' &&
          newServer.substr(0, 8) != 'https://') {
        newServer = 'http://' + newServer;
      }
      serverInput.value = newServer;
      GM_xmlhttpRequest({
        method: 'GET',
        url: serverInput.value + 'shiftspace.php?method=version',
        onload: function(rx) {
          if (rx.responseText == version) {
            setValue('server', serverInput.value);
          } else {
            alert('Sorry, that server address returned an invalid response.');
            serverInput.value = server;
          }
        }
      });
    });
    
    $(sections[1]).setHTML('<form action="' + server + 'shiftspace.php">' +
                        '<label for="install-space">Install a space</label>' +
                        '<input style="float:left" type="text" name="space" id="install-space" class="text" size="40" />' +
                        '<input style="float:right" type="submit" value="Install" class="submit" />' +
                        '</form>');
    $(sections[1]).setStyles({
      padding: '10px 20px'
    });
    var form = $(sections[1].getElementsByTagName('form')[0]);
    form.id = 'installedSpacesForm';
    
    for (var space in installed) 
    {
      var newSpace = this.installedSpace(space);
      $(newSpace).injectAfter(form);
    }
    
    form.addEvent('submit', function(e) {
      new Event(e).preventDefault();
      var spaceInput = this.doc.getElementById('install-space');
      var space = spaceInput.value;
      if (space == '') return;

      // TODO: make a private method - David
      SSInstallSpace(space);
      
    }.bind(this));
    
    $(sections[2]).setHTML(
      '<form action="' + server + 'shiftspace.php" style="padding-top: 15px;" id="settings-account">' +
        '<div class="form-column">' +
          '<label for="account-password">Change your password</label>' +
          '<input type="password" name="account-password" id="account-password" class="text" />' +
          '<label for="account-password">Type your new password again</label>' +
          '<input type="password" name="account-passwordagain" id="account-passwordagain" class="text float-left" />' +
          '<label for="account-password">Change your email</label>' +
          '<input type="text" name="account-email" id="account-email" class="text" />' +
          '<label for="account-name">Change your display name</label>' +
          '<input type="text" name="account-name" id="account-name" class="text float-left" />' +
          '<br class="clear" />' +
          '<input type="submit" value="Save" class="clear" />' +
          '<br class="clear" />' +
        '</div>' +
        '<br class="clear" />' +
        '<div id="account-response" class="response"></div>' +
      '</form>'
    );
    
    $(this.doc.getElementById('settings-account')).addEvent('submit', function(e) {
      new Event(e).preventDefault();
      
      var info = {};
      
      var password = this.doc.getElementById('account-password').value;
      var passwordAgain = this.doc.getElementById('account-passwordagain').value;
      var email = this.doc.getElementById('account-email').value;
      var username = this.doc.getElementById('account-name').value;
      
      if(password)
      {
        info.password = password;
        info.password_again = passwordAgain;
      }
      
      if(email) info.email = email;
      if(username) info.username = username;
      
      ShiftSpace.User.update(info, this.handleAccountUpdate.bind(this));
      
    }.bind(this));
  },
  
  showSubTab: function(section, num) {
    var subtab = $(this.doc.getElementById('subtab-' + section + num));
    subtab.setStyle('display', 'block');
  },
  
  hideSubTab: function(section, num) {
    var subtab = $(this.doc.getElementById('subtab-' + section + num));
    subtab.setStyle('display', 'none');
  },
  
  onSpaceInstall: function(spaceName)
  {
    var newSpace = $(this.installedSpace(spaceName));
    newSpace.injectAfter(this.doc.getElementById('installedSpacesForm'));
    var spaceInput = this.doc.getElementById('install-space');
    spaceInput.value = '';
    this.updateIconsForSpace(spaceName);
  },
  
  
  onSpaceUninstall: function(spaceName)
  {
    var spaceDiv = $(this.doc.getElementById('installed' + spaceName));
    spaceDiv.remove();
    this.updateIconsForSpace(spaceName);
  },
  
  
  updateIconsForSpace: function(spaceName)
  {
    // update any unknown shift
    var spaceShifts = $A(_$(this.doc).getElementsByClassName(spaceName));
    spaceShifts.each(function(entry) {
      var icon = ShiftSpace.info(spaceName).icon;
      $(_$(entry).getElementByClassName('spaceTitle')).setStyle('background', 'transparent url(' + icon + ') no-repeat 3px 1px');
    });    
  },
  
  
  installedSpace: function(id) 
  {
    var div = this.doc.createElement('div');
    div.setAttribute('id', 'installed' + id);
    div.setAttribute('class', 'installedSpace');

    var isChecked = (SSGetPrefForSpace(id, 'autolaunch')) ? 'checked' : '';
    div.innerHTML = '<div class="installedTitleCol"><img src="' + server + 'spaces/' + id + '/' + id + '.png" width="32" height="32" /> ' +
                '<div class="info"><a href="http://www.shiftspace.org/spaces/' + id.toLowerCase() + '" target="_blank">' + id + '</a>' +
                '</div></div>' +
                '<div class="autolaunchCol"><div class="autolaunchToggle checkbox '+ isChecked + '"></div>' +
                '<div class="label">Automatically show shifts</div></div>' +
                '<input type="button" value="Uninstall" class="submit uninstall" id="uninstall' + id + '" />' +
                '<br class="clear" /></div>';
                
    var uninstallButton = _$(div).getElementByClassName('uninstall');
    
    $(uninstallButton).addEvent('click', function() {
      if (confirm('Are you sure you want to uninstall ' + id + '?')) {
        SSUninstallSpace(id);
      }
    });

    if(!ShiftSpace.User.isLoggedIn())
    {
      $(_$(div).getElementByClassName('autolaunchCol')).addClass('SSDisplayNone');
    }

    // add events to the autolaunch feature
    var autolaunchToggle = _$(div).getElementByClassName('autolaunchToggle');
    $(autolaunchToggle).addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      var value = this.value;
      
      var spaceName = $(this).getParent().getParent().getProperty('id');
      
      if($(this).hasClass('checked'))
      {
        $(this).removeClass('checked');
        SSSetPrefForSpace(id, 'autolaunch', false);
      }
      else
      {
        $(this).addClass('checked');
        SSSetPrefForSpace(id, 'autolaunch', true);
      }
    });
    
    return div;
  },
  
  
  addTab: function(id, label, icon) {
    var br = this.doc.getElementById('tabs').getElementsByTagName('br')[1];
    var tab = $(this.doc.createElement('div'));
    tab.setAttribute('id', 'tab-' + id);
    tab.className = 'tab';
    var inner = $(this.doc.createElement('div'));
    inner.className = 'tab-inner';
    
    if (typeof icon != 'undefined') {
      var labelNode = $(this.doc.createElement('div'));
      labelNode.setHTML(label);
      labelNode.setStyles({
        background: 'transparent url(' + server + 'images/Console/' + icon + ') no-repeat 0 3px',
        padding: '0 0 0 18px'
      });
      labelNode.injectInside(inner);
    } else {
      inner.setHTML(label);
    }
    
    inner.injectInside(tab);
    tab.injectBefore(br);
    tab.addEvent('click', this.clickTab.bind(this));
    
    return this.addPane(id);
  },
  
  
  addPane: function(id) {
    if (!this.doc.getElementById(id)) {
      var content = $(this.doc.createElement('div'));
      content.setAttribute('id', id);
      content.className = 'content';
      content.injectInside(this.doc.getElementById('scroller'));
      return content;
    }
    return $(this.doc.getElementById(id));
  },
  
  
  getTab: function(tabname) {
    return $(this.doc.getElementById(tabname));
  },
  
  
  clickTab: function(e) {
    var id = e.currentTarget.getAttribute('id').substr(4);
    this.showTab(id);
  },
  
  
  showTab: function(id) {
    if(id != 'settings') this.clearAccountInfo();
    
    this.currTab = id;
    
    // close the plugin menu if open
    if(this.pluginMenu && !$(this.pluginMenu).hasClass('SSDisplayNone')) this.pluginMenu.addClass('SSDisplayNone');

    // get the current selected tab
    var lastTab = _$(this.doc.getElementById('tabs')).getElementsByClassName('active')[0];

    // if previous active tab deselect the tab and hide the tab content
    if(lastTab)
    {
      var lastTabContentId = lastTab.id.split('-').getLast();

      // deselect
      if (lastTab) 
      {
        $(lastTab).removeClass('active');
      }

      // hide the content pane
      var lastTabContent = _$(this.doc.getElementById(lastTabContentId));
      if (lastTabContent) 
      {
        $(lastTabContent).removeClass('active');
      }
    }
    
    // make the new tab and tab content active
    $(this.doc.getElementById('tab-' + id)).addClass('active');
    $(this.doc.getElementById(id)).addClass('active');
    
    if (id == 'shifts' && _$(this.doc.getElementById('shifts')).getElementsByClassName('checked').length > 0) {
      $(this.doc.getElementById('actions')).setStyle('display', 'block');
    } else {
      $(this.doc.getElementById('actions')).setStyle('display', 'none');
    }
  },
  
  
  removeTab: function(id) 
  {
    var tab = $(this.doc.getElementById('tab-' + id));
    if (tab) {
      tab.remove();
    }
  },
  
  
  buildLogin: function() 
  {
    this.addPane('login');
    var sections = this.createSubSections('login', ['Login', 'Sign up', 'Password']);
    $(sections[0]).setHTML(
      '<form id="loginForm" action="http://shiftspace.org/login" method="post" class="form-column">' +
        '<label for="username">Username</label>' +
        '<input type="text" name="username" id="username" class="text" />' +
        '<label for="password">Password</label>' +
        '<input type="password" name="password" id="password" class="text float-left" />' +
        '<input type="submit" value="Login" class="button float-left" />' +
        '<a href="#password" id="passwordResetLink" class="float-left">Forget your password?</a>' +
        '<br class="clear" />' +
        '<div id="login_response" class="response"></div>' +
      '</form>'
    );
    $(sections[0]).setStyle('padding-top', 15);
    $(this.doc.getElementById('loginForm')).addEvent('submit', function(e) {
      new Event(e).preventDefault();
      var credentials = {
        username: this.doc.getElementById('username').value,
        password: this.doc.getElementById('password').value
      };
      ShiftSpace.User.login(credentials, this.handleLogin.bind(this));
    }.bind(this));
    
    $(this.doc.getElementById('passwordResetLink')).addEvent('click', function(e) {
      new Event(e).preventDefault();
      this.showSubSection('login', 2);
    }.bind(this));
    $(sections[1]).setHTML('<form id="registerForm" action="http://shiftspace.org/join" method="post">' +
                        '<div class="form-column">' +
                        '<label for="join_username">Username</label>' +
                        '<input type="text" name="username" id="join_username" class="text" />' +
                        '<label for="email">E-mail address</label>' +
                        '<input type="text" name="email" id="email" class="text" />' +
                        '</div><div class="form-column">' +
                        '<label for="join_password">Password</label>' +
                        '<input type="password" name="password" id="join_password" class="text" />' +
                        '<label for="password_again">Password again</label>' +
                        '<input type="password" name="password_again" id="password_again" class="text float-left" />' +
                        '<input type="submit" value="Sign up" class="button float-left" />' +
                        '<br class="clear" />' +
                        '</div>' +
                        '<br class="clear" />' +
                        '<div id="join_response" class="response"></div>' +
                        '</form>');
    $(sections[1]).setStyle('padding-top', 15);
    $(this.doc.getElementById('registerForm')).addEvent('submit', function(e) {
      new Event(e).preventDefault();
      var joinInput = {
        username: this.doc.getElementById('join_username').value,
        email: this.doc.getElementById('email').value,
        password: this.doc.getElementById('join_password').value,
        password_again: this.doc.getElementById('password_again').value
      };
      ShiftSpace.User.join(joinInput, this.handleJoin.bind(this));
    }.bind(this));
    
    $(sections[2]).setHTML(
      '<form id="passwordForm" action="http://shiftspace.org/password" method="post" class="form-column">' +
        '<h2>Reset your password</h2>' +
        '<label for="password-email">Your email address</label>' +
        '<input type="text" name="password-email" id="password-email" class="text" size="25" />' +
        '<input type="submit" value="Submit" class="button" />' +
      '</form>' +
      '<br class="clear" />' +
      '<div id="password-response" class="response"></div>'
    );
    $(this.doc.getElementById('passwordForm')).addEvent('submit', function(e) {
      new Event(e).preventDefault();
      var info = {
        email: $(this.doc.getElementById('password-email')).value
      };
      ShiftSpace.User.resetPassword(info, this.handlePasswordReset.bind(this));
    }.bind(this));
  },
  
  
  buildWelcome: function() 
  {
    // add temporary welcome tab
    var pane = this.addTab('welcome', 'Welcome');
    this.setHeight(200);
    this.refresh();
    
    pane.setHTML(
      '<div class="welcome-intro">' +
        '<h2>Welcome to ShiftSpace!</h2>' +
        '<p>Please take a moment to watch a short introductory screencast and set your default privacy setting.</p>' +
        '<div class="input"><div id="init_privacy" class="checkbox checked"></div>' +
        '<div class="label">Set my shifts public by default</div>' +
        '<br class="clear" /></div>' +
        '<p><a href="http://www.shiftspace.org/about/user-manual/#managing" target="_top">Read more about content privacy</a></p>' +
      '</div>' +
      '<div class="welcome-screencast">' +
        '<a href="#screencast" id="screencast-link"><img src="' + server + 'images/Console/intro-screencast-thumb.gif" alt="Intro screencast" />' +
      '</div>' +
      '<br class="clear" />'
    );
    
    var init_privacy = $(this.doc.getElementById('init_privacy'));
    var default_privacy = $(this.doc.getElementById('default_privacy'));

    SSSetDefaultShiftStatus(1);
    
    // set default to checked
    default_privacy.addClass('checked');

    init_privacy.addEvent('click', function() {
      if (!init_privacy.hasClass('checked')) 
      {
        SSSetDefaultShiftStatus(1);
        init_privacy.addClass('checked');
        default_privacy.addClass('checked');
      } 
      else 
      {
        SSSetDefaultShiftStatus(2);
        init_privacy.removeClass('checked');
        default_privacy.removeClass('checked');
      }
    }.bind(this));
    
    loadStyle('styles/Videobox.css', function() {
      $(this.doc.getElementById('screencast-link')).addEvent('click', function(e) {
        new Event(e).preventDefault();
        ShiftSpaceHide();
        var vb = new Videobox();
        vb.addEvent('onClose', ShiftSpaceShow);
        vb.open("http://blip.tv/play/23eWlyOElCw","your caption","vidbox 624 498");
      }.bind(this));
    }.bind(this));
    
  },
  
  
  handleLogin: function(json) 
  {
    if (json.status) 
    {
      this.setupAuthControl();
      this.showTab('shifts');
      this.resetLogin();
      this.removeTab('login');
      this.updateDefaultShiftStatus();
      this.updateDefaultEmailComments();
      
      // Hide the Account subtab
      this.showSubTab('settings', 2);
      
      // update the controls
      this.updateControlsForUsersShifts();
      
      // show the autolaunch checkboxes
      $A(_$(this.doc.getElementsByClassName('autolaunchCol'))).each(function(x) {
        $(x).removeClass('SSDisplayNone');
      });
    } 
    else 
    {
      this.showResponse('login_response', json.message);
    }
  },
  
  
  updateDefaultShiftStatus: function()
  {
    var defaultPrivacy = $(this.doc.getElementById('default_privacy'));
    if(defaultPrivacy)
    {
      if(SSGetDefaultShiftStatus(true) == 2)
      {
        defaultPrivacy.removeClass('checked');
      }
      else
      {
        defaultPrivacy.addClass('checked');
      }
    }
  },
  
  
  updateDefaultEmailComments: function()
  {
    var defaultComments = $(this.doc.getElementById('default_comments'));
    if(defaultComments)
    {
      if(ShiftSpace.User.getEmailCommentsDefault() == 0)
      {
        defaultComments.removeClass('checked');
      }
      else
      {
        defaultComments.addClass('checked');
      }
    }
  },
  
  
  handleLogout: function()
  {
    this.updateControlsForUsersShifts();
    
    this.showResponse('login_response', 'You have been logged out.');
    this.addTab('login', 'Login');
    this.showTab('login');
    this.hideSubTab('settings', 2);
    this.showSubSection('settings', 0);
    
    this.removeTab('welcome');
    
    // remove the autolaunch checkboxes
    $A(_$(this.doc.getElementsByClassName('autolaunchCol'))).each(function(x) {
      $(x).addClass('SSDisplayNone');
    });
  },
  
  
  handleJoin: function(json) 
  {
    if (json.status) 
    {
      this.buildWelcome();
      this.showTab('welcome');
      this.removeTab('login');
      this.setupAuthControl();
      this.resetJoin();
      
      // Hide the Account subtab
      this.showSubTab('settings', 2);
      this.showSubSection('settings', 0);
    } 
    else 
    {
      this.showResponse('join_response', json.message);
    }
  },

  
  showAccountInfo: function()
  {
    this.doc.getElementById('account-email').value = ShiftSpace.User.email() || '';
    this.doc.getElementById('account-name').value = ShiftSpace.User.getUsername();
  },
  
  
  clearAccountInfo: function()
  {
    this.doc.getElementById('account-email').value = '';
    this.doc.getElementById('account-name').value = '';
  },

  
  handleAccountUpdate: function(json) 
  {
    this.showResponse('account-response', json.message);
    if (json.status) {
      $(this.doc.getElementById('account-password')).value = '';
      $(this.doc.getElementById('account-passwordagain')).value = '';
    }
  },
  
  
  handlePasswordReset: function(json) 
  {
    this.showResponse('password-response', json.message);
  },
  
  
  resetLogin: function() 
  {
    $(this.doc.getElementById('username')).value = '';
    $(this.doc.getElementById('password')).value = '';
    $(this.doc.getElementById('login_response')).setHTML('');
  },
  
  
  resetJoin: function() 
  {
    $(this.doc.getElementById('join_username')).value = '';
    $(this.doc.getElementById('email')).value = '';
    $(this.doc.getElementById('join_password')).value = '';
    $(this.doc.getElementById('password_again')).value = '';
    $(this.doc.getElementById('join_response')).setHTML('');
  },
  
  
  showResponse: function(target, message) 
  {
    if (this.getHeight() < 175) 
    {
      this.setHeight(175);
      this.refresh();
    }
    
    var targetNode = $(this.doc.getElementById(target));
    if(targetNode) targetNode.setHTML(message);
  },
  
  
  createSubSections: function(target, sections) {
    var tabs = '';
    var content = '';
    
    for (var i = 0; i < sections.length; i++) {
      var activeTab = (i == 0) ? ' subtab-active' : '';
      var activeSection = (i == 0) ? ' subsection-active' : '';
      tabs += '<div id="subtab-' + target + i + '" class="subtab' + activeTab + '">' + sections[i] + '</div>';
      content += '<div id="subsection-' + target + i + '" class="subsection' + activeSection + '"></div>';
    }
    
    var holder = _$(this.doc.getElementById(target));
    holder.innerHTML = '<div class="subtabs">' +
        '<div class="subtabs-inner">' + tabs + '</div>' +
        '</div>' +
        '<div class="subsections">' + content + '</div>' +
        '<br class="clear" />';
    
    $A(holder.getElementsByClassName('subtab')).each(function(subtab) {
      $(subtab).addEvent('click', function(e) {
        var id = e.target.getAttribute('id');
        var num = id.substr(7 + target.length);
        this.showSubSection(target, num);
      }.bind(this));
    }.bind(this));
    
    return holder.getElementsByClassName('subsection')
  },
  
  
  showSubSection: function(target, num) 
  {
    if(target != 'settings' && num != 2) this.clearAccountInfo();
    
    var holder = _$(this.doc.getElementById(target));
    var active = holder.getElementByClassName('subtab-active');
    if (active) {
      $(active).removeClass('subtab-active');
    }
    var above = holder.getElementByClassName('subtab-above');
    if (above) {
      $(above).removeClass('subtab-above');
    }
    var subsection = holder.getElementByClassName('subsection-active');
    if (subsection) {
      $(subsection).removeClass('subsection-active');
    }
    
    var subtab = $(this.doc.getElementById('subtab-' + target + num));
    var subsection = $(this.doc.getElementById('subsection-' + target + num));
    subtab.addClass('subtab-active');
    if (subtab.previousSibling) {
      $(subtab.previousSibling).addClass('subtab-above');
    }
    subsection.addClass('subsection-active'); 
    
    if(target == 'settings' && num == 2)
    {
      this.showAccountInfo();
    }
  },
  
  
  /*
  
  Function: refresh
  Resize the content area.
  
  */
  refresh: function() 
  {
    if (!this.doc || !this.doc.getElementById('top')) 
    {
      // Need to wait a moment longer while things are being built
      if(this.resize) setTimeout(this.resize.bind(this), 50);
    }
    else 
    {
      var top = $(this.doc.getElementById('top')).getParent();
      var bottom = $(this.doc.getElementById('bottom'));
      bottom.setStyle('height', this.getHeight() - top.getSize().size.y);
    }
    this.resizer.setStyle('width', window.getWidth() - 50);
    //this.resizer.setStyle('top', this.frame.getStyle('top'));
    this.resizer.setStyle('top', this.frameWrapper.getStyle('top'));
    
    if(this.isVisible())
    {
      if(this.getHeight() > 0)
      {
        this.notifier.setStyle('bottom', this.getHeight() - 4);      
      }
      else
      {
        this.notifier.setStyle('bottom', 150);
      }
    }

    if(this.notifierFx && this.isVisible())
    {
      this.notifierFx.stop();
      this.notifierFx.set(Math.max(0, this.getHeight() - 4));
    }
  },
  
  
  /*
  
  Function: show
  Show the console.
  
  */
  show: function() 
  {
    this.__isVisible__ = true;

    this.cancelNotifier = true;

    this.notifier.setStyle('display', '');
    this.notifier.removeClass('SSDisplayNone');
    //this.frame.setStyle('display', 'block');
    this.frameWrapper.setStyle('display', 'block');

    this.notifierFx.stop();
    this.refresh();

    this.loadShifts();
  },
  
  
  /*
  
  Function: hide
  Hide the console.
  
  */
  hide: function() 
  {
    this.__isVisible__ = false;

    this.notifier.addClass('SSDisplayNone');
    
    //this.frame.setStyle('display', 'none');
    this.frameWrapper.setStyle('display', 'none');
    this.notifierFx.set(-32);
    this.hidePluginMenu();
    
    // fire a hide event
    this.fireEvent('onHide', this);
  },
  
  
  isVisible: function() 
  {
    return this.__isVisible__;
  },
  
  
  /*
  
  Function: loadShifts
  Adds a collection of shifts to the console
      
  Parameters:
      shifts - An object containing the shifts to be added, keyed by shiftId
  
  */
  addShifts: function(shifts) {
    for (var shiftId in shifts) {
      var shift = shifts[shiftId];
      try
      {
        this.addShift(shift);
      }
      catch(exc)
      {
        console.error('Exception adding shift ' + shiftId + ' to console: ' + SSDescribeException(exc));
      }
    }
  },
  
  showShift: function(id) {
    var el = $(this.doc.getElementById(id));
    if(el)
    {
      el.addClass('active');
      el.addClass('SSUserSelectNone');
      this.hideEditTitleField(id);
    }
  },
  
  editShift: function(id) {
    var el = $(this.doc.getElementById(id));
    if(el)
    {
      this.showShift(id);
      el.removeClass('SSUserSelectNone');
      this.showEditTitleField(id);
    }
  },
  
  blurShift: function(id) {
    this.hideEditTitleField(id);
  },
  
  focusShift: function(id) {
  },

  hideShift: function(id) {
    var el = $(this.doc.getElementById(id));
    if(el)
    {
      el.removeClass('active');
      el.addClass('SSUserSelectNone');
      this.hideEditTitleField(id);
    }
  },
  
  showEditTitleField: function(id) {
    var el = _$(this.doc.getElementById(id));
    if(el)
    {
      $(el.getElementByClassName('summaryEdit')).removeClass('SSDisplayNone');
      $(el.getElementByClassName('summaryView')).addClass('SSDisplayNone');
    }
  },
  
  hideEditTitleField: function(id) {
    var el = _$(this.doc.getElementById(id));
    if(el)
    {
      $(el.getElementByClassName('summaryEdit')).addClass('SSDisplayNone');
      $(el.getElementByClassName('summaryView')).removeClass('SSDisplayNone');
    }
  },
  

  setTitleForShift: function(id, title) {
    var el = _$(this.doc.getElementById(id));
    if(el)
    {
      $(el.getElementByClassName('summaryView')).setText(title);
    }
  },
  
  
  updateShift: function(shiftJson) 
  {
    var entry = _$(this.doc.getElementById(shiftJson.id));
    
    // update the summary
    var summaryView = $(entry.getElementByClassName('summary').getElementByClassName('summaryView'));
    this.updateSummary(summaryView, shiftJson.summary);
    
    // HUH: not sure why we need to update the username - David
    $(entry.getElementByClassName('user')).getFirst().setHTML(shiftJson.username);
  },
  
  
  updateSummary: function(summaryView, summary)
  {
    var atReference = summary.match(/@[A-Za-z0-9._]*\b/);
    if(atReference && atReference.length > 0)
    {
      atReference = atReference[0];
      var username = atReference.substr(1, atReference.length-1);
      var refLink = "<a title=\"Browse "+username+"\'s shifts on the ShiftSpace Public Square\" target=\"new\" href=\"http://www.shiftspace.org/shifts/?filter=by&filterBy="+username+"\">"+atReference+"</a>";
      $(summaryView).setHTML(summary.replace(atReference, refLink));
    }
    else
    {
      $(summaryView).setText(summary);
    }
  },
  
  
  updatePluginIconForShift: function(data)
  {
    data.plugin.menuIconForShift(data.shiftId, function(icon) {
      var entry = _$(this.doc.getElementById(data.shiftId));
      var pluginName = data.plugin.attributes.name;
      var pluginIcon = $(entry.getElementByClassName('pg'+pluginName));
      var classNames = pluginIcon.getProperty('class').split(' ');
      
      // remove all other status icons
      classNames = classNames.filter(function(className) {
        return (className.search('SS'+pluginName) != -1);
      });
      classNames.each(function(x) {pluginIcon.removeClass(x);});
      
      pluginIcon.addClass(icon);
    }.bind(this));
  },
  
  
  updateShiftControl: function(shiftId, userOwnsShift)
  {
    var entry = _$(this.doc.getElementById(shiftId));
    
    if(entry)
    {
      var privacySpan = $(entry.getElementByClassName('privacySpan'));
      var editSpan = $(entry.getElementByClassName('editSpan'));
      var deleteSpan = $(entry.getElementByClassName('deleteSpan'));
      var username = $(entry.getElementByClassName('user'));
      
      if(userOwnsShift)
      {
        privacySpan.removeClass('SSDisplayNone');
        editSpan.removeClass('SSDisplayNone');
        deleteSpan.removeClass('SSDisplayNone');
        username.addClass('loggedIn');
      }
      else
      {
        privacySpan.addClass('SSDisplayNone');
        editSpan.addClass('SSDisplayNone');
        deleteSpan.addClass('SSDisplayNone');
      }
      this.updateShiftPrivacy(shiftId);
    }
  },
  
  updateShiftPrivacy: function(shiftId) {
    var entry = _$(this.doc.getElementById(shiftId));
    if(entry)
    {
      var shiftId = entry.getAttribute('id');
      var shiftStatus = parseInt(SSGetShift(shiftId).status);
      var statusIconsDiv = $(entry.getElementByClassName('statusIcons'));
      var privacyIcon = $(entry.getElementByClassName('privacyIcon'));
    
      if (shiftStatus == 1) 
      {
        if(privacyIcon) privacyIcon.addClass('SSDisplayNone');
      } 
      else 
      {
        if(privacyIcon) privacyIcon.removeClass('SSDisplayNone');
      }
    }
  },
  
  updateControlsForUsersShifts: function()
  {
    var shiftIds = SSGetPageShiftIdsForUser();
    
    // user is logged out hide all controls
    if(shiftIds.length == 0)
    {
      $A(_$(this.doc).getElementsByClassName('editSpan')).each(function(editSpan) {
        $(editSpan).addClass('SSDisplayNone');
      });
      $A(_$(this.doc).getElementsByClassName('deleteSpan')).each(function(deleteSpan) {
        $(deleteSpan).addClass('SSDisplayNone');
      });
      $A(_$(this.doc).getElementsByClassName('privacySpan')).each(function(privacySpan) {
        $(privacySpan).addClass('SSDisplayNone');
      });
      $A(_$(this.doc).getElementsByClassName('loggedIn')).each(function(x) {
        $(x).removeClass('loggedIn');
      });
      return;
    }
    
    // user has just logged in update the controls of the user's shifts
    /*shiftIds.each(function(shiftId) {
      this.updateShiftControl(shiftId, true);
    }.bind(this));*/
  },
  
  
  /*
  
  Function: addShift
  Adds a shift to the console.
  
  */
  addShift: function(aShift, options) {
    // clone a model shift
    var newEntry = _$(this.modelShiftEntry.clone(true));
    
    newEntry.className += ' ' + aShift.space;

    var icon = ShiftSpace.info(aShift.space).icon;
    var img = newEntry.getElementByClassName('expander').getElementsByTagName('img')[0];
    
    if(SSUserOwnsShift(aShift.id))
    {
      $(newEntry.getElementByClassName('user')).addClass('loggedIn');
    }
    
    newEntry.setAttribute('id', aShift.id);

    newEntry.getElementByClassName('spaceTitle').innerHTML = aShift.space;
    $(newEntry.getElementByClassName('spaceTitle')).setStyle('background', 'transparent url(' + icon + ') no-repeat 3px 1px');
    
    if(aShift.broken)
    {
      newEntry.getElementByClassName('brokenIcon').removeClass('SSDisplayNone');
    }
    
    // remove the delete and hide the edit link if necessary
    if(!SSUserCanEditShift(aShift.id))
    {
      var privacySpan = $(newEntry.getElementByClassName('privacySpan'));
      if(privacySpan) privacySpan.addClass('SSDisplayNone');
      var editSpan = $(newEntry.getElementByClassName('editSpan'));
      if(editSpan) editSpan.addClass('SSDisplayNone');
      var deleteSpan = $(newEntry.getElementByClassName('deleteSpan'));
      if(deleteSpan) deleteSpan.addClass('SSDisplayNone');
    }
    
    // grab the summary div
    var summary = newEntry.getElementByClassName('summary');
    
    // udpate the summary view
    var summaryView = summary.getElementByClassName('summaryView');
    this.updateSummary(summaryView, aShift.summary);
    
    // update the summary input fiedl
    var summaryEdit = summary.getElementByClassName('summaryEdit');
    summaryEdit.setAttribute('value', aShift.summary);
    
    // upate user name and created date
    var userLink = $(newEntry.getElementByClassName('user')).getFirst();
    userLink.setHTML(aShift.username);
    userLink.setProperty('href', 'http://www.shiftspace.org/shifts/?filter=by&filterBy='+aShift.username);
    userLink.setProperty('title', "Browse "+aShift.username+"'s shifts on the ShiftSpace Public Square");

    newEntry.getElementByClassName('posted').innerHTML = aShift.created; 
    
    // Add hover behavior, this can probably be handle via css - David
    newEntry.addEvent('mouseover', function() {
      if (!newEntry.hasClass('active') && !newEntry.hasClass('expanded')) 
      {
        newEntry.addClass('hover');
      }
    });
    
    newEntry.addEvent('mouseout', function() {
        newEntry.removeClass('hover');
    });
    
    // Show this shift on click
    newEntry.addEvent('click', function() {
      if (!newEntry.hasClass('active')) 
      {
        newEntry.addClass('active');
        
        // tell ShiftSpace to show the shift
        showShift(aShift.id);
      } 
      else 
      {
        // tell ShiftSpace to hide the shift
        newEntry.removeClass('active');
        hideShift(aShift.id);
        this.hideEditTitleField(aShift.id);
      }
    }.bind(this));
    
    var toggle = newEntry.getElementByClassName('expander');
    var checkbox = $(toggle.getElementByClassName('checkbox'));
    
    checkbox.addEvent('click', function(e) {
      var event = new Event(e);
      event.stopPropagation();
      if (!checkbox.hasClass('checked')) {
        checkbox.addClass('checked');
        ShiftSpace.Actions.select(aShift.id);
      } else {
        checkbox.removeClass('checked');
        ShiftSpace.Actions.deselect(aShift.id);
      }
    });
    
    checkbox.addEvent('mouseover', function(e) {
      if (checkbox.hasClass('checked')) {
        checkbox.addClass('checked-hover');
      } else {
        checkbox.addClass('checkbox-hover');
      }
    });
    
    checkbox.addEvent('mouseout', function(e) {
      if (checkbox.hasClass('checked')) {
        checkbox.removeClass('checked-hover');
      } else {
        checkbox.removeClass('checkbox-hover');
      }
    });
    
    // Event for the title edit input field
    $(summaryEdit).addEvent('keyup', function(_evt) {
      var evt = new Event(_evt);
      if(evt.key == 'enter')
      {
        var newTitle = $(evt.target).getProperty('value');
        $(SSGetElementByClass('summaryView', newEntry)).setHTML(newTitle);
        this.showShift(aShift.id);
        // defined in Core - David
        updateTitleOfShift(aShift.id, newTitle);
      }
    }.bind(this));
    
    $(summaryEdit).addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      evt.stop();
    });
    
    // add it
    if (options && options.isActive) 
    {
      $(newEntry).injectTop($(this.doc.getElementById('shifts')));
      $(newEntry).addClass('active');
    } 
    else 
    {
      $(newEntry).injectInside($(this.doc.getElementById('shifts')));
    }
    
    this.updateShiftPrivacy(aShift.id);
    
    this.addPluginIconForShift(aShift.id);
    var comments = newEntry.getElementByClassName('SSCommentsIcon');
    
    $(comments).addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      evt.stopPropagation();
      if($(comments).hasClass('Reply') && !ShiftSpace.User.isLoggedIn())
      {
        alert("You must be signed in to comment on a shift.");
      }
      else
      {
        this.showCommentsForShift.bindResource(this, {
          type: 'plugin',
          name: 'Comments',
          args: [aShift.id]
        })();
      }
    }.bind(this));
    
    if(SSPluginDataForShift('Comments', aShift.id))
    {
      var commentCount = SSPluginDataForShift('Comments', aShift.id).count;
      if(commentCount > 0)
      {
        comments.removeClass('Reply');
        comments.addClass('Basic');
        comments.setText(commentCount);
      }
    }
    
    this.shiftCount++;
    this.updateCount();
  },
  
  
  showCommentsForShift: function(shiftId)
  {
    SSGetPlugin('Comments').showCommentsForShift(shiftId);
  },

  
  addPluginIconForShift: function(shiftId)
  {
    for(var plugin in installedPlugins)
    {
      this.initPluginIconForShift(plugin, shiftId);
    }
  },
  
  
  initPluginIconForShift: function(plugin, shiftId)
  {
    var el = this.doc.getElementById(shiftId);
    el = _$(el);
    var pluginDiv = $(this.doc.createElement('div'));
    
    if(SSGetPluginType(plugin) == 'menu')
    {
      pluginDiv.addClass('plugin');
      pluginDiv.addClass('pg'+plugin); // tag with plugin name
      
      // if the icon isn't immediately available need to use a callback
      var icon = SSPlugInMenuIconForShift(plugin, shiftId, function(icon) {
        pluginDiv.addClass(icon);
      });
      if(icon) pluginDiv.addClass(icon);
      
      pluginDiv.addEvent('click', function(_evt) {
        var evt = new Event(_evt);
        evt.stop();

        // wacky stuff
        this.showPluginMenuForShift.bindResource(this, {
          type: 'plugin',
          name: plugin, 
          args: [plugin, shiftId] 
        })();

      }.bind(this));

      pluginDiv.inject(el.getElementByClassName('pluginIcons'));
    }
  },
  
  
  updateCount : function()
  {
    var doc = this.frame.contentDocument;
    var shiftTab = _$(doc.getElementById('tab-shifts')).getElementByClassName('tab-inner');
    shiftTab.innerHTML = this.shiftCount + " shifts";
  },
  
  removeShift: function(shiftId) {
    $(this.doc.getElementById(shiftId)).remove();
    this.shiftCount--;
    this.updateCount();
  },
  
  createShiftEntryModel: function() {
    var shiftEntry = $(this.doc.createElement('div'));
    shiftEntry.className = 'entry SSUserSelectNone';
    
    // ---------------- Expander ----------------------- //
    var expanderDiv = $(this.doc.createElement('div'));
    expanderDiv.className = 'expander column';

    var selectCheckbox = $(this.doc.createElement('div'));
    selectCheckbox.className = 'checkbox';
    selectCheckbox.injectInside(expanderDiv);
    
    // ------------------ Space ------------------------- //
    var spaceDiv = $(this.doc.createElement('div'));
    spaceDiv.className = 'space column';
    
    var spaceTitle = $(this.doc.createElement('div'));
    spaceTitle.className = 'spaceTitle';
    spaceTitle.injectInside(spaceDiv);
    
    // ------------------- Plugins ------------------------- //
    var plugins = $(this.doc.createElement('div'));
    plugins.addClass('pluginIcons');
    plugins.injectInside(spaceDiv);
    
    // ------------------- Summary ------------------------- //
    var summaryDiv = $(this.doc.createElement('div'));
    summaryDiv.className = 'summary column';

    var summaryView = $(this.doc.createElement('span'));
    summaryView.setProperty('type', 'text');
    summaryView.setProperty('class', 'summaryView');
    summaryView.injectInside(summaryDiv);

    var summaryEdit = $(this.doc.createElement('input'));
    summaryEdit.setProperty('type', 'text');
    summaryEdit.addClass('summaryEdit');
    summaryEdit.addClass('SSDisplayNone');
    summaryEdit.injectInside(summaryDiv);
    
    // ------------------- Status Icons -------------------- //
    var statusIconsDiv = $(this.doc.createElement('div'));
    statusIconsDiv.className = 'statusIcons column';
    
    var privacyIcon = $(this.doc.createElement('div'));
    privacyIcon.className = 'privacyIcon SSDisplayNone';
    privacyIcon.injectInside(statusIconsDiv);
    
    var brokenIcon = $(this.doc.createElement('div'));
    brokenIcon.className = 'brokenIcon SSDisplayNone';
    brokenIcon.injectInside(statusIconsDiv);
    
    // ------------------- User ---------------------------- //
    var userLink = $(this.doc.createElement('a'));
    userLink.setProperty('target', 'new');
    var userDiv = $(this.doc.createElement('div'));

    userDiv.className = 'user column';
    userLink.injectInside(userDiv);
    
    // ------------------- Posted -------------------------- //
    var postedDiv = $(this.doc.createElement('div'));
    postedDiv.className = 'posted column';
    postedDiv.setHTML('Just posted');
    
    // ------------------- Clear --------------------------- //
    var clear = $(this.doc.createElement('div'));
    clear.className = 'clear';
    
    // -------------------- Comments ----------------------- //
    var comments = $(this.doc.createElement('div'));
    comments.className = 'SSCommentsIcon Reply';
    comments.setProperty('title', 'Leave a comment');
    
    // -------------------- Build the entry ---------------- //
    expanderDiv.injectInside(shiftEntry);
    spaceDiv.injectInside(shiftEntry);
    summaryDiv.injectInside(shiftEntry);
    statusIconsDiv.injectInside(shiftEntry);
    userDiv.injectInside(shiftEntry);
    postedDiv.injectInside(shiftEntry);
    comments.injectInside(shiftEntry);
    clear.injectInside(shiftEntry);
    
    // store the model
    this.modelShiftEntry = shiftEntry;
  },
  

  createLogInForm : function()
  {
    
  },
  
  
  loadShifts: function()
  {
    if(!this.__shiftsLoaded__)
    {
      this.__shiftsLoaded__ = true;
      loadShifts();
    }
  },
  
  
  halfMode: function(callback)
  {
    var resizeFx = this.frameWrapper.effects({
      duration: 300,
      Transition: Fx.Transitions.Cubic.easeIn,
      onComplete: function()
      {
        if(callback && typeof callback == 'function') callback();
      }.bind(this)
    });

    resizeFx.start({
      right: [0, 365]
    });

    var innerFrameConsoleDiv = _$(this.doc.getElementById('console'));
    innerFrameConsoleDiv.getElementsByClassName('summary').each(function(x) {
      $(x).setStyle('width', '35%');
    });
  },


  fullMode: function()
  {
    var resizeFx = this.frameWrapper.effects({
      duration: 300,
      Transition: Fx.Transitions.Cubic.easeIn,
      onComplete: function()
      {
        var innerFrameConsoleDiv = _$(this.doc.getElementById('console'));
        innerFrameConsoleDiv.getElementsByClassName('summary').each(function(x) {
          $(x).setStyle('width', '45%');
        });

      }.bind(this)
    });

    resizeFx.start({
      right: [365, 0]
    });
  },
  
  
  setHeight: function(newHeight)
  {
    //this.frame.setStyle('height', newHeight);
    this.frameWrapper.setStyle('height', newHeight);
  },
  
  
  getHeight: function()
  {
    //return parseInt(this.frame.getStyle('height'));
    return parseInt(this.frameWrapper.getStyle('height'));
  },
  
  // TODO: Total hack, fix this at some point - David
  addCommentToShift: function(shiftId)
  {
    var el = _$(this.doc.getElementById(shiftId));
    var comments = $(el.getElementByClassName('SSCommentsIcon'));
    var count = 1;
    
    if(!comments.hasClass('Basic'))
    {
      comments.removeClass('Reply');
      comments.addClass('Basic');
    }
    else
    {
      count = parseInt(comments.getText()) + 1;
    }
    
    comments.setText(count);
  },
  
  
  clearSelections: function()
  {
    $A(_$(this.doc.getElementById('shifts')).getElementsByClassName('checkbox')).each(function(checkbox) {
      $(checkbox).removeClass('checked');
      $(checkbox).removeClass('checkbox-hover');
    });
  }
  
});

// add events to the console
Console.implement(new Events);

ShiftSpace.Console = new Console();

// End Console.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start Actions.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Actions = new Class({
  
  initialize: function() {
    this.selected = [];
    this.menuBuilt = false;
    
    ShiftSpace.User.addEvent('onUserLogin', this.updateMenu.bind(this));
    ShiftSpace.User.addEvent('onUserLogout', this.updateMenu.bind(this));
  },
  
  buildMenu: function() {
    this.doc = ShiftSpace.Console.frame.contentWindow.document;
    this.el = $(this.doc.getElementById('actions'));
    this.el.addClass('SSUserSelectNone');
    //'<a id="SSMakeShiftPrivateButton" href="#" class="option private selected">Private</a>' +
    this.el.setHTML( 
      '<div class="group">' +
        '<a title="Permalink for selected shift" id="SSLinkToShiftButton" class="first button link"></a>' +
        '<a title="Trail selected shift" id="SSTrailShiftButton"  class="button trails"></a>' +
        '<br class="clear" />' +
      '</div>' +
      '<div class="group">' +
        '<div title="Set private/public status of selected shifts" id="privacy" class="dropdown first">' +
          '<a id="SSSetBatchPrivacy" style="padding-left:4px"  class="first option">Set privacy</a>' +
          '<a id="SSSetShiftPublicButton"  class="option public selected">Public</a>' +
          '<a id="SSSetShiftPrivateButton"  class="option private">Private</a>' +
        '</div>' +
        '<a title="Edit selected shift" id="SSEditShiftButton"  class="button edit"></a>' +
        '<a title="Delete selected shift" id="SSDeleteShiftButton"  class="button delete"></a>' +
        '<br class="clear" />' +
      '</div>' +
      '<br class="clear" />');

    //this.favoriteButton = $(this.doc.getElementById('SSFavoriteShiftButton'));
    this.linkButton = $(this.doc.getElementById('SSLinkToShiftButton'));
    this.trailButton = $(this.doc.getElementById('SSTrailShiftButton'));
    this.editButton = $(this.doc.getElementById('SSEditShiftButton'));
    this.deleteButton = $(this.doc.getElementById('SSDeleteShiftButton'));
    this.privacyButtons = $(this.doc.getElementById('privacy'));
    this.batchPrivacy = $(this.doc.getElementById('SSSetBatchPrivacy'));
    this.privateButton = $(this.doc.getElementById('SSSetShiftPrivateButton'));
    this.publicButton = $(this.doc.getElementById('SSSetShiftPublicButton'));
    
    this.dropdown = _$(this.el).getElementsByClassName('dropdown')[0];
    this.dropdown = $(this.dropdown);
    this.dropdown.addEvent('click', this.updatePrivacyMenu.bind(this, [true]));

    this.attachEvents();
  },
  
  
  attachEvents: function()
  {
    // Link
    this.linkButton.addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      if(!$(evt.target).hasClass('disabled'))
      {
        window.open(ShiftSpace.info().server + 'sandbox?id=' + this.selected[0]);
      }
      this.clearAndHide();
    }.bind(this));
    
    // Edit
    this.editButton.addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      if(!$(evt.target).hasClass('disabled'))
      {
        editShift(this.selected[0]);
      }
      this.clearAndHide();
    }.bind(this));
    
    // debug Edit button
    this.editButton.addEvent('mousedown', function(_evt) {
      var evt = new Event(_evt);
    }.bind(this));
    
    // Delete
    this.deleteButton.addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      if(!$(evt.target).hasClass('disabled'))
      {
        var str = 'this shift';
        if(this.selected.length > 1)
        {
          str = 'these shifts';
        }
        if(confirm('Are you sure want to delete ' + str + '? There is no undo'))
        {
          this.selected.each(deleteShift);
          this.selected = [];
          
          this.updateMenu();
          this.hideMenu();
        }
      }
      this.clearAndHide();
    }.bind(this));
    
    // Trail
    this.trailButton.addEvent('click', function(_evt) {
      var evt = new Event(_evt);
      
      plugins.attempt({
        name: 'Trails', 
        method: 'newTrail', 
        args: this.selected[0],
        callback: null
      });
      this.clearAndHide();
    }.bind(this));
    
    // Privacy changes
    this.privateButton.addEvent('click', this.makePrivate.bind(this));
    this.publicButton.addEvent('click', this.makePublic.bind(this));
  },
  
  
  makePrivate: function()
  {
    if(this.privacyButtons.hasClass('toggleMenu') ||
       this.privacyButtons.hasClass('batchMenu'))
    {
      // update the contents of the menu based on the current selections
      this.selected.each(function(shiftId) {
        SSSetShiftStatus(shiftId, 2);
      });
      
      this.clearAndHide();
    }
  },
  
  
  makePublic: function()
  {

    if(this.privacyButtons.hasClass('toggleMenu') ||
       this.privacyButtons.hasClass('batchMenu'))
    {
      // update the contents of the menu based on the current selections
      this.selected.each(function(shiftId) {
        SSSetShiftStatus(shiftId, 1);
      });
      
      this.clearAndHide();
    }
  },

  
  setIsVisible: function(val) {
    this.__visible__ = val;
  },
  

  isVisible: function() {
    return this.__visible__;
  },
  

  select: function(shiftId) {
    this.selected.push(shiftId);
    this.showMenu();
    this.updateMenu();
  },
  

  deselect: function(shiftId) {
    this.selected.remove(shiftId);
    if (this.selected.length == 0) 
    {
      this.hideMenu();
    }
    else
    {
      this.updateMenu();
    }
  },
  

  showMenu: function() {
    if(!this.isVisible())
    {
      this.setIsVisible(true);
      if (!this.menuBuilt) {
        this.buildMenu();
        this.menuBuilt = true;
      }
      
      var showFx = this.el.effects({
        duration: 300,
        transition: Fx.Transitions.linear,
        onStart: function()
        {
          this.el.setStyle('height', 0);
          this.el.setStyle('overflow', 'hidden');
          this.el.setStyle('display', 'block');
        }.bind(this),
        onComplete: function()
        {
          this.el.setStyle('overflow', 'visible');
        }.bind(this)
      });
      
      var consoleFx = $(this.doc.getElementById('scroller')).effects({
        duration: 300,
        transition: Fx.Transitions.linear,
        onStart: function()
        {
          $(this.doc.getElementById('scroller')).setStyle('top', 0);
          $(this.doc.getElementById('scroller')).setStyle('position', 'absolute');
        }.bind(this),
        onComplete: function()
        {
          $(this.doc.getElementById('scroller')).setStyle('position', '');
          $(this.doc.getElementById('scroller')).addClass('withActions');
        }.bind(this)
      });
      
      showFx.start({
        height: [0, 22]
      });
      consoleFx.start({
        top: [0, 23]
      });
    }
  },
  
  
  hideMenu: function() 
  {
    this.setIsVisible(false);
    this.updatePrivacyMenu();
    
    var showFx = this.el.effects({
      duration: 300,
      transition: Fx.Transitions.linear,
      onStart: function()
      {
        this.el.setStyle('overflow', 'hidden');
      }.bind(this),
      onComplete: function()
      {
        this.el.setStyle('overflow', '');
        this.el.setStyle('display', 'none');
      }.bind(this)
    });
    
    var consoleFx = $(this.doc.getElementById('scroller')).effects({
      duration: 300,
      transition: Fx.Transitions.linear,
      onComplete: function()
      {
        $(this.doc.getElementById('scroller')).removeClass('withActions');
      }.bind(this)
    });
    
    showFx.start({
      height: [22, 0]
    });
    consoleFx.start({
      top: [23, 0]
    });
  },

  
  updateMenu: function() {
    if(this.isVisible())
    {
      // update the contents of the menu based on the current selections
      var selectedShifts = SSGetPageShifts(this.selected);
      if(selectedShifts && selectedShifts.length > 0)
      {
        var notTheLoggedInUser = function(x) {
          return x.username != ShiftSpace.User.getUsername();        
        };

        var usernames = selectedShifts.filter(notTheLoggedInUser);      
        if(usernames.length > 0)
        {
          this.disablePrivelegedButton();
        }
        else
        {
          this.enablePrivelegedButtons();
        }
        
        if(selectedShifts.length > 1)
        {
          this.linkButton.addClass('disabled')
          this.trailButton.addClass('disabled');
          this.editButton.addClass('disabled');
        }
        else
        {
          this.linkButton.removeClass('disabled');
          this.trailButton.removeClass('disabled');
          if(SSUserOwnsShift(this.selected[0])) this.editButton.removeClass('disabled');
        }
        
        if(selectedShifts.length >= 1 && 
          (this.privacyButtons.hasClass('toggleMenu') ||
           this.privacyButtons.hasClass('batchMenu'))) 
           this.updatePrivacyMenu();
           
        this.updatePrivacyButtons(selectedShifts);
      }
    }
  },
  
  
  updatePrivacyButtons: function(selectedShifts)
  {
    if(selectedShifts.length == 1)
    {
      var newTopLevelButton;
      if(selectedShifts[0].status == 1)
      {
        this.publicButton.addClass('selected');
        this.publicButton.addClass('first');
        this.privateButton.removeClass('selected');
        this.privateButton.removeClass('first');
        newTopLevelButton = this.publicButton;
      }
      else
      {
        this.publicButton.removeClass('selected');
        this.publicButton.removeClass('first');
        this.privateButton.addClass('selected');
        this.privateButton.addClass('first');
        newTopLevelButton = this.privateButton;
      }
      
      this.batchPrivacy.removeClass('first');
      this.batchPrivacy.removeClass('selected');
      
      newTopLevelButton.remove();
      newTopLevelButton.injectTop(this.privacyButtons);
    }
    else if(selectedShifts.length > 1)
    {
      this.privateButton.removeClass('first');
      this.privateButton.removeClass('selected');
      this.publicButton.removeClass('first');
      this.publicButton.removeClass('selected');
      
      this.batchPrivacy.remove();
      this.batchPrivacy.injectTop(this.privacyButtons);
      this.batchPrivacy.addClass('first');
      this.batchPrivacy.addClass('selected');
    }
  },
  

  enablePrivelegedButtons: function()
  {
    this.setDisabledPrivilegedButtons(false);
  },
  
  
  disablePrivelegedButton: function()
  {
    this.setDisabledPrivilegedButtons(true);
  },
  

  setDisabledPrivilegedButtons: function(disabled)
  {
    var method = (disabled == true && 'addClass') || (disabled == false  && 'removeClass') || null;
    
    if(!method) return;
    
    // logged in and owns all the selected shifts
    this.editButton[method]('disabled');
    this.deleteButton[method]('disabled');
    this.privacyButtons[method]('disabled');
  },
  
  
  clearAndHide: function()
  {
    ShiftSpace.Console.clearSelections();
    this.selected = [];
    this.hideMenu();
  },
  

  updatePrivacyMenu: function(click) 
  {
    if(!this.privacyButtons.hasClass('disabled'))
    {
      if(this.selected.length == 1)
      {
        if(!this.privacyButtons.hasClass('toggleMenu'))
        {
          this.privacyButtons.removeClass('batchMenu');
          this.privacyButtons.addClass('toggleMenu')
        }
        else if(click)
        {
          this.privacyButtons.removeClass('toggleMenu');
        }
      }
      else if(this.selected.length > 1)
      {
        if(!this.privacyButtons.hasClass('batchMenu'))
        {
          this.privacyButtons.removeClass('toggleMenu');
          this.privacyButtons.addClass('batchMenu');
        }
        else if(click)
        {
          this.privacyButtons.removeClass('batchMenu');
        }
      }
      else
      {
        // no selections
        this.privacyButtons.removeClass('batchMenu');
        this.privacyButtons.removeClass('toggleMenu');
      }
    }
  }
  
});

ShiftSpace.Actions = new Actions();


// End Actions.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Start ConsoleExtensions.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Console.ContentView = new Class({
  initialize: function()
  {
    
  },
  
  refresh: function()
  {
    
  }
});


Console.TableView = Console.ContentView.extend({
  intiialize: function(columns)
  {
    
  },
  
  setDataSource: function(dataSource)
  {
    if(dataSource instanceof Console.DataSource)
    {
      this.dataSource = dataSource;
    }
  },
  
  updateData: function(options)
  {
    this.dataSource.update();
  },
  
  refresh: function()
  {
    // re-render the table
  }
});


Console.TabView = Console.ContentView.extend({
  initialize: function()
  {
    
  },
  
  addTab: function(tabName)
  {
    
  },
  
  selectTab: function(tabName)
  {
    
  },
  
  setContentViewForTab: function(tabName, contentView)
  {
    
  }
});


Console.SubTabView = new Class({
  initialize: function()
  {
    
  },
  
  addSubTab: function(subTabName)
  {
    
  }
});


Console.DataSource = new Class({
  
});

// End ConsoleExtensions.js - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


      
      // Load CSS styles
      loadStyle('styles/ShiftSpace.css', function() {
        // create the error window
        SSCreateErrorWindow();
      });
      loadStyle('styles/ShiftMenu.css');

      // Load all spaces and plugins immediately if in the sanbox
      if (typeof ShiftSpaceSandBoxMode != 'undefined') {
        for (var space in installed) {
          loadSpace(space);
        }
        for(var plugin in installedPlugins) {
          SSLoadPlugin(plugin);
        }
      }
      
      // If all spaces have been loaded, build the shift menu and the console
      ShiftSpace.ShiftMenu.buildMenu();
      
      // Set up event handlers
      window.addEvent('keydown', keyDownHandler.bind(this));
      window.addEvent('keyup', keyUpHandler.bind(this));
      window.addEvent('keypress', keyPressHandler.bind(this));
      window.addEvent('mousemove', mouseMoveHandler.bind(this));
      
      // hide all pinWidget menus on window click
      window.addEvent('click', function() {
        ShiftSpace.Console.hidePluginMenu.bind(ShiftSpace.Console)();
        __pinWidgets__.each(function(x){
          if(!x.isSelecting) x.hideMenu();
        });
      });
      
      // create the pin selection bounding box
      SSCreatePinSelect();
      
      // check for page iframes
      SSCheckForPageIframes();
      
      // See if there's anything on the current page
      SSCheckForContent();
    };
    
    
    function SSCheckForInstallSpaceLinks()
    {
      $$('.SSInstallFirstLink').setStyle('display', 'none');

      $$('.SSInstallSpaceLink').each(function(x) {
       x.setStyle('display', 'block');
       x.addEvent('click', SSHandleInstallSpaceLink);
      });
    }
    
    
    function SSHandleInstallSpaceLink(_evt)
    {
      var evt = new Event(_evt);
      var target = evt.target;
      var spaceName = target.getAttribute('title');

      // first check for the attributes file
      // loadFile(server + 'spaces/' + spaceName + '/attributes.js', SSInstallSpaceLinkCallback, SSInstallSpaceLinkCallback);
      SSInstallSpace(spaceName);
    }
    
    
    /*
      Function: SSAddEvent
        Adds a Mootools style custom event to the ShiftSpace object.
        
      Parameters:
        eventType - a event type as string.
        callback - a function.
    
      See also:
        SSFireEvent
    */
    function SSAddEvent(eventType, callback) {
      __eventProxy__.addEvent(eventType, callback);
    };
    
    /*
      Function: SSFireEvent
        A function to fire events.
        
      Parameters:
        eventType - event type as string.
        data - any extra event data that should be passed to the event listener.
    */
    function SSFireEvent(eventType, data) {
      __eventProxy__.fireEvent(eventType, data);
    };
    
    // ===============================
    // = Function Prototype Helpers  =
    // ===============================
    
    // bindResource - for atomic operations
    Function.prototype.bindResource = function(obj, options)
    {
      var fn = this;
      
      // check to make sure it's not already there
      if(spaces[options.name] || plugins[options.name])
      {
        var args = options.args || []
        return fn.bind(obj, args);
      }
      
      return function() {
        if(options.type == 'space')
        {
          if(!spaces[options.name])
          {
            loadSpace(options.name, null, function() {
              fn.apply(obj, args);
            });
          }
        }
        if(options.type == 'plugin')
        {
          if(!plugins[options.name])
          {
            SSLoadPlugin(options.name, function() {
              fn.apply(obj, options.args);
              
              if(options.method)
              {
                plugins[options.name][options.method].apply(plugins[options.name], options.args);
              }
            });
          }
        }
      }
      
    }
     
    // This won't work for GM_getValue of course
    Function.prototype.safeCall = function() {
      var self = this, args = [], len = arguments.length;
      for(var i = 0; i < len; i++) args.push(arguments[i]);
      setTimeout(function() {
        return self.apply(null, args);
      }, 0);
    }
    
    // Work around for GM_getValue
    Function.prototype.safeCallWithResult = function() {
      var self = this, args = [], len = arguments.length;
      for(var i = 0; i < len-1; i++) args.push(arguments[i]);
      // the last argument is the callback
      var callback = arguments[len-1];
      setTimeout(function() {
        callback(self.apply(null, args));
      }, 0);
    }
    
    /*
      Function: SSSetPref
        Set a user preference. Implicitly calls setValue which will JSON encode the value.
        
      Parameters:
        pref - the preference name as string.
        value - the value.
        
      See Also:
        setValue
    */
    function SSSetPref(pref, value)
    {
      if(ShiftSpace.User.isLoggedIn())
      {
        var key = [ShiftSpace.User.getUsername(), pref].join('.');
        setValue(key, value);
      }
    }
    
    /*
      Function: SSGetPref
        Return a user preference.  Implicity calls getValue which will JSON decode the value.
      
      Parameters:
        pref - the preference key as a string.
        defaultValue - the defaultValue if this preference does not exist.
        
      Returns:
        A JSON object.
    */
    function SSGetPref(pref, defaultValue)
    {
      if(ShiftSpace.User.isLoggedIn())
      {
        var key = [ShiftSpace.User.getUsername(), pref].join('.');
        return getValue(key, defaultValue);
      }
      return defaultValue;
    }
    
    /*
      Function: SSSetDefaultShiftStatus
        Set the default shift status, the only valid values are 1 for public, 2 for private.
      
      Parameters:
        value - the new shift status value.
    */
    function SSSetDefaultShiftStatus(value)
    {
      if(value)
      {
        __defaultShiftStatus__ = value;
        SSSetPref('defaultShiftStatus', __defaultShiftStatus__);
      }
    }

    /*
      Function: SSGetDefaultShiftStatus
        Returns the default shift status.
      
      Parameters:
        checkPref - if the value should be grabbed directly via SSGetPref.

      Returns:
        Either 1 for public or 2 for private.
    */
    function SSGetDefaultShiftStatus(checkPref)
    {
      return (checkPref && SSGetPref('defaultShiftStatus', 1)) || __defaultShiftStatus__;
    }
    
    
    function SSSetDefaultEmailComments(value)
    {
      if(value)
      {
        __defaultEmailComments__ = value;
        SSSetPref('defaultEmailComments', __defaultEmailComments__);
      }
    }
    
    function SSGetDefaultEmailComments(checkPref)
    {
      // NOTE: 2 because we can't store 0s in the DB when in the sandbox, 1 = false, 2 = true in this case - David
      return (checkPref && SSGetPref('defaultEmailComments', 2) || __defaultEmailComments__);
    }
    
    
    /*
      Function: SSSetPrefForSpace
        Set user preference for a space.  Calls setValue.  The preference
        key will be converted to username.spaceName.preferenceKey.
      
      Parameters:
        spaceName - space name as string.
        pref - string representing the preference name.
        value - the value to be set.
    */
    function SSSetPrefForSpace(spaceName, pref, value)
    {
      if(ShiftSpace.User.isLoggedIn())
      {
        var key = [ShiftSpace.User.getUsername(), spaceName, pref].join('.');
        setValue(key, value);
      }
    }
    
    
    /*
      Function: SSGetPrefForSpace
        Retrieve a preference for a space.
        
      Parameters:
        spaceName - spaceName as string.
        pref - the preference key.
    */
    function SSGetPrefForSpace(spaceName, pref)
    {
      if(ShiftSpace.User.isLoggedIn())
      {
        var key = [ShiftSpace.User.getUsername(), spaceName, pref].join('.');
        var value = getValue(key, null);
        return value;
      }
    }
    
    /*
    
    Function: info
    Provides basic information about ShiftSpace's current state.
    
    Parameters:
        spaceName - (optional) Get information about a specific installed space.
    
    Returns:
        When no parameter is specified, returns an object with the following
        variables set:
        
        - server (string), the base URL of the ShiftSpace server
        - spaces (string), a list of currently installed spaces
        - version (string), the current version of ShiftSpace
        
        If spaceName is specified, returns the following information about the
        space:
        
        - title (string), a human-readable version of the space name
        - icon (string), the URL of the Space's icon
        - version (string), the current version of the installed Space
    
    */
    this.info = function(spaceName) {
      if (typeof spaceName != 'undefined') {
        var defaults = {
          title: spaceName,
          icon: server + 'images/unknown-space.png',
          version: '1.0'
        };
        if (!installed[spaceName]) {
          defaults.unknown = true;
          return defaults;
        }
        // TODO - this must be fixed, we need to cache space attributes - David
        defaults.icon = server + 'spaces/' + spaceName + '/' + spaceName + '.png';
        //var spaceInfo = $merge(defaults, spaces[spaceName].attributes);
        var spaceInfo = $merge(defaults, {});
        delete spaceInfo.name; // No need to send this back
        spaceInfo.url = installed[spaceName];
        return spaceInfo;
      }
      var spaceIndex = [];
      for (var spaceName in installed) {
        spaceIndex.push(spaceName);
      }
      return {
        server: server,
        spaces: spaceIndex.join(', '),
        version: version
      };
    };
    
    
    function SSGetInfoForInstalledSpace(spaceName, callback)
    {
      // fetch data for the space
    }
    

    function SSGetElementByClass(searchClass, _node)
    {
      return SSGetElementsByClass(searchClass, _node)[0];
    }

    // Safari 3 and FF3 support this natively
    function SSGetElementsByClass(searchClass, _node) 
    {
      var classElements = new Array();
      var node = _node || this;
      var els = node.getElementsByTagName('*');
      var elsLen = els.length;

      var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
      for (var i = 0; i < elsLen; i++) 
      {
        if ( pattern.test(els[i].className) ) 
        {
          classElements.push(els[i]);
        }
      }
      return classElements.map(function(node) {return _$(node);});
    }

    // our special wrapper
    function _$(el)
    {
      if(!el) return null;
      
      el.getElementsByClassName = SSGetElementsByClass;
      el.getElementByClassName = function(className) {
        return this.getElementsByClassName(className)[0];
      }

      return el;
    }
    this._$ = _$; // export
    
    
    /*
      Function: SSGetShiftContent
        Returns the actual content of shift.  The content is the actual
        representation of the shift as defined by the encode method of the
        originating Shift class.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        A Javascript object with the shifts's properties.
    */
    function SSGetShiftContent(shiftId)
    {
      if(!SSIsNewShift(shiftId))
      {
        var shift = SSGetShift(shiftId);
        var content = unescape(shift.content); // MERGE: for 0.5 - David
      
        if(content)
        {
          content = content.replace(/\n/g, '\\n');
          content = content.replace(/\r/g, '\\r');
        }
        
        // legacy content, strip surrounding parens
        if(content[0] == "(")
        {
          content = content.substr(1, content.length-2);
        }
        
        if(content[0] == '"') content = content.substr(1, content.length-2);
        
        var obj = null;
        try
        {
          obj = Json.evaluate(content);
        }
        catch(err)
        {
          throw err;
        }
        
        return obj;
      }
      else
      {
        return {};
      }
    }
    
    /*
      Function: SSGetUrlForShift
        Returns the url of a shift.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        A url as a string.
    */
    function SSGetUrlForShift(shiftId)
    {
      //console.log(shifts[shiftId]);
      return SSGetShift(shiftId).href;
    }
    
    /*
      Function: SSGetRecentlyViewedShifts
        Returns a hash of recently viewed shifts.  The shifts are hashed by
        their id.  Each id points to a Javascript object that has the metadata
        for that particular shift.
        
      Parameters:
        callback - a function to be called when the operation is complete.  A callback is necessary since plugins have access.
    */
    function SSGetRecentlyViewedShifts(callback)
    {
      // array of shifts on the currently viewed url
      var localShifts = {};
      // array of shifts living on other urls
      var remoteShifts = [];

      // grab the local shifs and generate an array of remote shifts
      getValue.safeCallWithResult(ShiftSpace.User.getUsername()+'.recentlyViewedShifts', null, null, function(recentlyViewedShifts) {
        if(recentlyViewedShifts)
        {
          var len = recentlyViewedShifts.length;

          len.times(function(i) {
            var shiftId = recentlyViewedShifts[i];
            if(SSGetShift(shiftId))
            {
              localShifts[shiftId] = SSGetShiftData(shiftId);
            }
            else
            {
              remoteShifts.push(shiftId);
            }
          });
      
          if(remoteShifts.length > 0)
          {
            SSLoadShifts(remoteShifts, function(remoteShiftsArray) {
              // convert array into hash
              var theRemoteShifts = {};
              remoteShiftsArray.each(function(shift) {
                theRemoteShifts[shift.id] = shift;
              });
              // merge local and remote
              callback($merge(localShifts, theRemoteShifts));
            });
          }
          else
          {
            callback(localShifts);
          };
        }
      });
    }
    
    /*
      Function: SSSpaceForShift
        Returns the space singleton for a shift.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        The space singleton.
    */
    function SSSpaceForShift(shiftId)
    {
      //console.log('SSSpaceForShift');
      var shift = SSGetShift(shiftId);
      return spaces[shift.space];
    }
    
    /*
      Function: SSUserForShift
        Returns the username for a shift.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        The shift author's username as a string.
    */
    function SSUserForShift(shiftId)    
    {
      return shifts[shiftId].username;
    }
    
    /*
      Function: SSUserOwnsShift
        Used to check whether the currently logged in user authored a shift.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        true or false.
    */
    function SSUserOwnsShift(shiftId)
    {
      return (SSUserForShift(shiftId) == ShiftSpace.User.getUsername());
    }

    /*
      Function: SSUserCanEditShift
        Used to check whether a user has permission to edit a shift.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        true or false.
    */
    function SSUserCanEditShift(shiftId)
    {
      return (ShiftSpace.User.isLoggedIn() &&
              SSUserOwnsShift(shiftId));
    }
    
    /*
      Function: SSIsNewShift
        Used to check whether a shift is newly created and unsaved.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSIsNewShift(shiftId)
    {
      return (shiftId.search('newShift') != -1);
    }
    
    /*
      Function: SSSetShiftStatus
        Sets the shift public private status.
      
      Parameters:
        shiftId - a shift id.
        newStatus - the status.
    */
    function SSSetShiftStatus(shiftId, newStatus) {
      SSGetShift(shiftId).status = newStatus;
      var params = {
        id: shiftId,
        status: newStatus
      };
      serverCall('shift.update', params, function() {
        SSFireEvent('onShiftUpdate', shiftId);
      });
    }
    
    // ==================
    // = Plugin Support =
    // ==================
    
    /*
      Function: SSGetPlugin
        Returns a plugin object.
        
      Parameters:
        pluginName - a name representing a plugin.
        
      Returns:
        A plugin object.
    */
    function SSGetPlugin(pluginName)
    {
      return plugins[pluginName];
    }
    
    /*
      Function: SSGetPluginType
        Returns the plugin type.
        
      Parameters:
        pluginName - the plugin name as a string.
        
      See Also:
        Plugin.js
    */
    function SSGetPluginType(pluginName)
    {
      return __pluginsData__[pluginName]['type'];
    }
    
    /*
      Function: SSPlugInMenuIconForShift
        Returns the icon for a particular shift if the plugin is menu based.
        
      Parameters:
        pluginName - plugin name as string.
        shiftId - a shift id.
        callback - a function callback because the plugin may not be loaded yet.
        
      Returns:
        A CSS style with a background image style that will point to the icon image.
    */
    function SSPlugInMenuIconForShift(pluginName, shiftId, callback)
    {
      var plugin = SSGetPlugin(pluginName);
      // if the plugin isn't loaded yet, use the initial plugins data
      if(!plugin)
      {
        var shiftData = __pluginsData__[pluginName]['data'][shiftId];
        if(__pluginsData__[pluginName]['data'][shiftId])
        {
          return shiftData['icon'];
        }
        else
        {
          return __pluginsData__[pluginName]['defaultIcon'];
        }
      }
      else
      {
        plugin.menuIconForShift(shiftId, callback);
      }
    }
    
    
    function SSPluginDataForShift(pluginName, shiftId)
    {
      return __pluginsData__[pluginName]['data'][shiftId];
    }
    
    
    /*
      Function: SSImplementsProtocol
        A method to check if an object implements the required properties.
        
      Parameters:
        protocol - an array of required properties
        object - the javascript object in need of verification.
        
      Returns:
        A javascript object that contains two properties, 'result' which is a boolean and 'missing', an array of missing properties.
    */
    function SSImplementsProtocol(protocol, object)
    {
      var result = true;
      var missing = [];
      for(var i = 0; i < protocol.length; i++)
      {
        var prop = protocol[i];
        if(!object[prop])
        {
           result = false;
           missing.push(prop);
        }
      }
      return {'result': result, 'missing': missing};
    }
    
    // =============
    // = Utilities =
    // =============
    
    /*
      Function: SSIsSSElement
        Check wheter a node is a ShiftSpace Element or has a parent node that is.
        
      Parameters:
        node - a DOM node.
        
      Returns:
        true or false.
    */
    function SSIsSSElement(node)
    {
      if(node.hasClass('ShiftSpaceElement'))
      {
        return true;
      }
      
      var hasSSParent = false;
      var curNode = node;

      while(curNode.getParent() && $(curNode.getParent()).hasClass && !hasSSParent)
      {
        if($(curNode.getParent()).hasClass('ShiftSpaceElement'))
        {
          hasSSParent = true;
          continue;
        }
        curNode = curNode.getParent();
      }
      
      return hasSSParent;
    }
    this.isSSElement = SSIsSSElement;
    
    /*
      Function: SSIsNotSSElement
        Conveniece function that returns the opposite of SSIsSSElement.  Useful for node filtering.
        
      Parameters:
        node - a DOM node.
        
      Returns:
        true or false.
    */
    function SSIsNotSSElement(node)
    {
      return !SSIsSSElement(node);
    }
    
    
    function SSPendingShifts()
    {
      return __pendingShifts__;
    }
    
    
    function SSSetPendingShifts(val)
    {
      __pendingShifts__ = val;
    }
    
    /*
      Function: SSFocusedShiftId
        Returns the current focused shift's id.
      
      Returns:
        a shift id.
    */
    function SSFocusedShiftId()
    {
      return __focusedShiftId__;
    }
    
    /*
      Function: SSSetFocusedShiftId
        Should never be called.
        
      Parameters:
        newId - a shift id.
    */
    function SSSetFocusedShiftId(newId)
    {
      __focusedShiftId__ = newId;
    }
    
    /*
      Function: SSFocusedSpace
        Returns the currently focused space object.
        
      Returns:
        A space object.
    */
    function SSFocusedSpace()
    {
      return __focusedSpace__;
    }
    
    /*
      Function: SSSetFocusedSpace
        Should never be called
        
      Parameters:
        newSpace - a space object.
    */
    function SSSetFocusedSpace(newSpace)
    {
      __focusedSpace__ = newSpace;
    }

    // ======================
    // = FullScreen Support =
    // ======================
    
    var __isHidden__ = false;
    var __shiftSpaceState__ = new Hash();

    /*
      Function: SSSetHidden
        Sets the private hidden variable.
        
      Parameters:
        val - sets a boolean value.
    */
    function SSSetHidden(val)
    {
      __isHidden__ = val;
    }
    
    /*
      Function: ShiftSpaceIsHidden
        Returns whether ShiftSpace is hidden, that is in full screen mode.

      Parameters:
        return a boolean.
    */
    function ShiftSpaceIsHidden()
    {
      return __isHidden__;
    }
    
    /*
      Function: ShiftSpaceHide
        Hide ShiftSpace for fullscreen mode.
    */
    function ShiftSpaceHide()
    {
      // set the private hidden var
      // used to control the appearance of the ShiftMenu 
      SSSetHidden(true);
      
      // remove all the previous state vars
      __shiftSpaceState__.empty();
      
      __shiftSpaceState__.set('consoleVisible', ShiftSpace.Console.isVisible());
      __shiftSpaceState__.set('focusedShiftId', SSFocusedShiftId());
      
      // go through each space and close it down, and sleep it
      ShiftSpace.Console.hide();
      
      // hide the spaces
      for(var space in spaces)
      {
        spaces[space].saveState();
        
        if(spaces[space].isVisible())
        {
          spaces[space].hide();
        }
      }
    }
    
    /*
      Function: ShiftSpaceShow
        Show ShiftSpace, normally used when exiting fullscreen mode.
    */
    function ShiftSpaceShow()
    {
      // set the private hidden var
      // used to control the appearance of the ShiftMenu
      SSSetHidden(false);
      
      // restore ShiftSpace
      if(__shiftSpaceState__.get('consoleVisible'))
      {
        ShiftSpace.Console.show();
      }
      if(__shiftSpaceState__.get('focusedShiftId'))
      {
        focusShift(__shiftSpaceState__.get('focusedShiftId'));
      }

      // restore the spaces
      for(var space in spaces)
      {
        spaces[space].restoreState();
      }
    }
    
    // TODO: write some documentation here
    function SSCheckForUpdates() {
      
      // Only check once per page load
      if (alreadyCheckedForUpdate) {
        return;
      }
      alreadyCheckedForUpdate = true;
      
      var now = new Date();
      var lastUpdate = parseInt(getValue('lastCheckedForUpdate', 0));
      
      // Only check every 24 hours
      if (now.getTime() - lastUpdate > 86400) {
        setValue('lastCheckedForUpdate', now.getTime());
        GM_xmlhttpRequest({
          method: 'POST',
          url: server + 'shiftspace.php?method=version',
          onload: function(rx) {
            GM_log('Version reported by server: ' + rx.responseText);
            if (rx.responseText != version) {
              if (confirm('There is a new version of ShiftSpace available. Would you like to update now?')) {
                window.location = 'http://www.shiftspace.org/api/shiftspace.php?method=shiftspace.user.js';
              }
            }
          }
        });
        return true;
      }
      return false;
    }
    
    /*
    
    Function: SSInstallSpace
      Loads the JavaScript source of a Space, then loads the space into memory.
      The source URL is saved in the 'installed' object for future reference.
    
    Parameters:
      space - The Space name to install
      pendingShift - A shift to show upon installation
        
    */
    function SSInstallSpace(space, pendingShift) {
      if(!installed[space])
      {
        var url = server + 'spaces/' + space + '/' + space + '.js';
        installed[space] = url;
        setValue('installed', installed);
        
        // let everyone else know
        loadSpace(space, pendingShift, function() {
          alert(space + " space installed.");
          SSFireEvent('onSpaceInstall', space);
        }.bind(this));
      }
    };
    
    /*
    Function: SSUninstallSpace
      Removes a space from memory and from stored caches.
    
    Parameters:
        space - the Space name to remove
    */
    function SSUninstallSpace(spaceName) {
      var url = installed[spaceName];
      delete spaces[spaceName];
      delete installed[spaceName];
      setValue('installed', installed);
      
      SSClearCache(url);
      
      // let everyone else know
      SSFireEvent('onSpaceUninstall', spaceName);
    };

    /*
      Function: SSXmlHttpRequest
        Private version of GM_xmlHttpRequest. Implemented for public use via Space/Shift.xmlhttpRequest.
      
      Parameters:
        config - same JSON object as used by GM_xmlhttpRequest.
    */
    function SSXmlHttpRequest(config) {
      GM_xmlhttpRequest(config);
    }
    
    /*
    Function: SSClearCache
      Expunge previously stored files.
    
    Parameters:
        url - (Optional) The URL of the file to remove. If not specified, all
              files in the cache will be deleted.
    */
    function SSClearCache(url) {
      if (typeof url == 'string') {
        // Clear a specific file from the cache
        log('Clearing ' + url + ' from cache');
        setValue('cache.' + url, 0);
      } else {
        // Clear all the files from the cache
        cache.each(function(url) {
          log('Clearing ' + url + ' from cache');
          setValue('cache.' + url, 0);
        });
      }
    };
    
    
    /*
    Function: initShift
      Creates a new shift on the page.
    
    Parameters:
      space - The name of the Space the Shift belongs to.
    */
    function initShift(spaceName, options) {
      if (!installed[spaceName]) {
        return;
      }

      var tempId = 'newShift' + Math.round(Math.random(0, 1) * 1000000);
      while (shifts[tempId]) {
        tempId = 'newShift' + Math.round(Math.random(0, 1) * 1000000);
      }

      var _position = (options && options.position && { x: options.position.x, y: options.position.y }) || null;
      var shiftJson = {
        id: tempId,
        space: spaceName,
        username: ShiftSpace.User.getUsername(),
        position: _position
      };
      //console.log(shiftJson);

      shifts[tempId] = shiftJson;

      var noError = spaces[spaceName].createShift(shiftJson);
      if(noError)
      {
        //console.log('tempId:' + tempId);
        SSShowNewShift(tempId);
      }
      else
      {
        console.error("There was an error creating the shift");
      }
    }
    
    /*
      Function: SSShowNewShift
        Shows a new shift, different from showShift in that it immediately puts the shift in edit mode.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSShowNewShift(shiftId)
    {
      var space = SSSpaceForShift(shiftId);
      
      // call onShiftCreate
      showShift(shiftId); // TODO: remove - David
      space.onShiftCreate(shiftId);
      editShift(shiftId);
      focusShift(shiftId, false);
    }
    
    
    /*
    Function: focusShift
      Focuses a shift.
      
    Parameter:
      shiftId - the id of the shift.
    */
    function focusShift(shiftId)
    {
      var shift = shifts[shiftId];
      var space = SSSpaceForShift(shiftId);
      var lastFocusedShift = SSFocusedShiftId();
      
      // unfocus the last shift
      if (lastFocusedShift && 
          shifts[lastFocusedShift] &&
          lastFocusedShift != shiftId) 
      {
        var lastSpace = SSSpaceForShift(lastFocusedShift);
        if(lastSpace.getShift(lastFocusedShift))
        {
          lastSpace.getShift(lastFocusedShift).blur();
          lastSpace.orderBack(lastFocusedShift);
        }
      }
      SSSetFocusedShiftId(shift.id);
      space.orderFront(shift.id);

      // call
      space.focusShift(shiftId);
      space.onShiftFocus(shiftId);
      
      // scroll the window if necessary
      var mainView = space.mainViewForShift(shiftId);
      
      if(mainView && !SSIsNewShift(shiftId))
      {
        var pos = mainView.getPosition();
        var vsize = mainView.getSize().size;
        var viewPort = window.getSize().viewPort;
        var windowScroll = window.getSize().scroll;
        
        var leftScroll = (windowScroll.x > pos.x-25);
        var rightScroll = (windowScroll.x < pos.x-25);
        var downScroll = (windowScroll.y < pos.y-25);
        var upScroll = (windowScroll.y > pos.y-25);
        
        if(pos.x > viewPort.x+windowScroll.x ||
           pos.y > viewPort.y+windowScroll.y ||
           pos.x < windowScroll.x ||
           pos.y < windowScroll.y)
        {
          var scrollFx = new Fx.Scroll(window, {
            duration: 1000,
            transition: Fx.Transitions.Cubic.easeIn
          });
          
          var size = window.getSize();

          if(!window.webkit)
          {
            scrollFx.scrollTo(pos.x-25, pos.y-25);
          }
          else
          {
            window.scrollTo(pos.x-25, pos.y-25);
          }
        }
      }
      else
      {
        //console.log('+++++++++++++++++++++++++++++++++++++++ NO MAIN VIEW');
      }
    }
    
    /*
      Function: blurShift
        Blurs a shift.
        
      Parameters:
        shiftId - a shift id.
    */
    function blurShift(shiftId)
    {
      // create a blur event so console gets updated
      var space = SSSpaceForShift(shiftId);
      space.blurShift(shiftId);
      space.onShiftBlur(shiftId);
    }

    /*
    focusSpace
    Focuses a space.
    
    Parameter:
      space - a ShiftSpace.Space instance
    */
    function focusSpace(space, position) 
    {
      var lastFocusedSpace = SSFocusedSpace();
      
      if(lastFocusedSpace && lastFocusedSpace != space)
      {
        // check to see if focused space
        lastFocusedSpace.setIsVisible(false);
        lastFocusedSpace.hideInterface();
      }
      
      // set the focused space private var
      SSSetFocusedSpace(space);
      space.setIsVisible(true);
      space.showInterface();
    }
    
    /*
      Function: updateTitleOfShift
        Tell the space to the update the title of the shift if necessary.
      
      Parameters:
        shiftId - a shift id.
        title - the new title.
    */
    function updateTitleOfShift(shiftId, title)
    {
      SSSpaceForShift(shiftId).updateTitleOfShift(shiftId, title);
      showShift(shiftId);
    }
    
    /*
    Function: showShift
      Displays a shift on the page.
    
    Parameters:
      shiftId - The ID of the shift to display.
    */
    function showShift(shiftId) 
    {
      //console.log('showShift >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      if(!SSShiftIsLoaded(shiftId) && !SSIsNewShift(shiftId))
      {
        // first make sure that is loaded
        SSLoadShift(shiftId, showShift.bind(ShiftSpace));
        return;
      }
      else
      {
        try
        {
          // get the space and the shift
          var shift = SSGetShift(shiftId);

          // check to see if this is a known space
          if (ShiftSpace.info(shift.space).unknown) 
          {
            if (confirm('Would you like to install the space ' + shift.space + '?')) 
            {
              SSInstallSpace(shift.space, shiftId);
              return;
            }
          }

          var space = SSSpaceForShift(shiftId);

          // load the space first
          if(!space)
          {
            loadSpace(shift.space, shiftId);
            return;
          }
          
          // if the space is loaded check if this shift can be shown
          if(space)
          {
            if(!space.canShowShift(SSGetShiftContent(shiftId)))
            {
              throw new Error();
            }
          }

          // extract the shift content
          var shiftJson = SSGetShiftContent(shiftId);
          shiftJson.id = shiftId;
          
           //console.log('foo -- - - -- - - --- - - -- - -- -- - -');
           //console.log(shiftJson);
          // check to make sure the css is loaded first
          if(!space.cssIsLoaded())
          {
            //console.log('css not loaded');
            space.addDeferredShift(shiftJson);
            return;
          }

          // fix legacy content
          shiftJson.legacy = shift.legacy;

          // add to recently viewed list
          SSAddRecentlyViewedShift(shiftId);

          // wrap this in a try catch
          try
          {
            spaces[shift.space].showShift(shiftJson);
          }
          catch(err)
          {
            console.log('Exception: ' + SSDescribeException(err));
          }

          focusShift(shift.id);

          // call onShiftShow
          space.onShiftShow(shiftId);
        }
        catch(err)
        {
          var params = {id:shiftId};
          serverCall.safeCall('shift.broken', params, function(result) {
            console.log(result);
          });

          SSShowErrorWindow(shiftId);

          // probably need to do some kind of cleanup
          ShiftSpace.Console.hideShift(shiftId);
        }
      }
    }
    
    /*
      Function: SSAddRecentlyViewedShift
        Add a recently viewed shift.
        
      Parameters:
        shiftId - a shift id
    */
    function SSAddRecentlyViewedShift(shiftId)
    {
      // store a reference to this
      // TODO: only add these if the user is logged in
      if(ShiftSpace.User.isLoggedIn() && !SSIsNewShift(shiftId))
      {
        getValue.safeCallWithResult(ShiftSpace.User.getUsername()+'.recentlyViewedShifts', null, null, function(recentlyViewedShifts) {
          // simply mark the ids
          if(recentlyViewedShifts) 
          {
            recentlyViewedShifts.unshift(shiftId);
            // store the recently viewed shifts
            setValue(ShiftSpace.User.getUsername() + '.recentlyViewedShifts', recentlyViewedShifts);
          }
        });
      }
    }
    
    /*
    
    Function: hideShift
      Hides a shift from the page.
        
    Parameters:
        shiftId - The ID of the shift to hide.
    
    */
    function hideShift(shiftId) 
    {
      var shift = SSGetShift(shiftId);
      var space = SSSpaceForShift(shiftId);

      space.hideShift(shiftId);
      space.onShiftHide(shiftId);
    }
    

    /*
    Function: SSCheckForContent
      Sends a request to the server about the current page's ShiftSpace content.
    */
    function SSCheckForContent() {
      var params = {
        href: window.location.href
      };
      serverCall('query', params, function(json) {
        //console.log('++++++++++++++++++++++++++++++++++++++++++++ GOT CONTENT');
        if (!json.status) {
          console.error('Error checking for content: ' + json.message);
          return;
        }
        
        if (json.username) 
        {
          // Set private user variable
          ShiftSpace.User.setUsername(json.username);
          ShiftSpace.User.setEmail(json.email);

          // fire user login for the Console
          if (__consoleIsWaiting__)
          {
            SSFireEvent('onUserLogin', {status:1});
          }
          
          // make sure default shift status preference is set
          SSSetDefaultShiftStatus(SSGetPref('defaultShiftStatus', 1));
        }
        
        SSSetPendingShifts(json.count);
        
        if (json.count > 0 && __consoleIsWaiting__) 
        {
          //console.log('about to show notifier');
          ShiftSpace.Console.showNotifier();
        }
      });
    }
    
    /*
      Function: SSCheckForAutolaunch
        Check for Spaces which need to be auto-launched.
    */
    function SSCheckForAutolaunch()
    {
      for(space in installed)
      {
        if(SSGetPrefForSpace(space, 'autolaunch'))
        {
          var ids = SSAllShiftIdsForSpace(space);

          var spaceObject = spaces[space]
          
          // in the case of the web we need to load the space first
          if(!spaceObject)
          {
            // load the space first
            loadSpace(space, null, function() {
              ids.each(showShift);
            });
            return;
          }
          else
          {
            // otherwise just show the puppies, this works in the sandbox
            ids.each(showShift);
          }
        }
      }
    }
    
    /*
    Function: SSAllShiftIdsForSpace
      Returns all shift ids on the current url for a particular Space.
      
    Parameters:
      spaceName - the name of the Space as a string.
    */
    function SSAllShiftIdsForSpace(spaceName)
    {
      var shiftsForSpace = [];
      for(shiftId in shifts)
      {
        if(shifts[shiftId].space == spaceName)
        {
          shiftsForSpace.push(shiftId);
        }
      }
      return shiftsForSpace;
    }
    
    
    /*
    Function: SSConsoleIsReady
      Called by the Console object when it finishes initializing.
      
    Returns:
      A boolean value.
    */
    function SSConsoleIsReady() {
      if (SSPendingShifts() == -1) {
        __consoleIsWaiting__ = true;
      } else if (SSPendingShifts() > 0) {
        ShiftSpace.Console.showNotifier();
      }
    }
    
    
    /*
    Function: loadShifts
      Loads the actual shift data for the current page.
    */
    function loadShifts() {
      
      var params = {
          href: window.location.href
      };
      serverCall('shift.query', params, function(json) {
          if (!json.status) {
            console.error('Error loading shifts: ' + json.message);
            return;
          }
          
          // save the pluginsData
          for(var plugin in installedPlugins)
          {
            //console.log('++++++++++++++++++++++++++++++++++++++ CHECKING FOR ' + plugin);
            if(json[plugin]) 
            {
              __pluginsData__[plugin] = json[plugin];
            }
          }
          
          //console.log(__pluginsData__);
          
          json.shifts.each(function(shift) {
            shifts[shift.id] = shift;
            
            if(['notes', 'highlight', 'sourceshift', 'imageswap'].contains(shift.space))
            {
              shift.space = shift.space.capitalize();
              shift.legacy = true;
            }
            if(shift.space == 'Highlight')
            {
              shift.space += 's';
            }
            if(shift.space == 'Sourceshift')
            {
              shift.space = 'SourceShift';
            }
            if(shift.space == 'Imageswap')
            {
              shift.space = 'ImageSwap';
            }
          });
          
          ShiftSpace.Console.addShifts(shifts);
          
          // check for autolaunched content, better for sandbox
          // TODO: refactor
          if(ShiftSpace.User.isLoggedIn())
          {
            SSCheckForAutolaunch();
          }
      });
    }
    
    /*
      Function: SSGetShift
        Returns a shift by shift id.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSGetShift(shiftId)
    {
      var theShift = shifts[shiftId];
      
      if(theShift)
      {
        return shifts[shiftId];
      }
    }
    this.SSGetShift = SSGetShift; // temporary - David
    
    /*
      Function: SSGetAuthorForShift
        Returns the username of the Shift owner as a string.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        A user name as a string.
    */
    function SSGetAuthorForShift(shiftId)
    {
      return SSGetShift(shiftId).username;
    }
    
    /*
    Function: SSGetShiftData
      Returns a copy of the shift data.
      
    Parameters:
      shiftId - a shift id.
      
    Returns:
      An copy of the shift's properties.
    */
    function SSGetShiftData(shiftId)
    {
      var shift = SSGetShift(shiftId);
      return {
        id : shift.id,
        title : shift.summary,
        summary: shift.summary,
        space: shift.space,
        href : shift.href,
        username : shift.username
      };
    }
    
    /*
      Function: SSSetShift
        Update the shift properties of a shift.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSSetShift(shiftId, shiftData)
    {
      shifts[shiftId] = $merge(shifts[shiftId], {
        content: shiftData.content
      });
    }
    
    /*
      Function: SSLoadShift
        Load a single shift from the network.
        
      Parameters:
        shiftId - a shift id.
        callback - a callback handler.
    */
    function SSLoadShift(shiftId, callback)
    {
      // fetch a content from the network;
      
      var params = { shiftIds: shiftId };
      serverCall.safeCall('shift.get', params, function(returnArray) {
        if(returnArray && returnArray[0])
        {
          var shiftObj = returnArray[0];
          SSSetShift(shiftObj.id, shiftObj);
          
          if(callback && $type(callback) == 'function')
          {
            callback(shiftObj.id);
          }
        }
      });
    }
    
    /*
      Function: SSLoadShifts
        Same as SSLoadShift except handles an array of shift id.
        
      Parameters:
        shiftIds - an array of shift ids.
        callback - a callback handler.
    */
    function SSLoadShifts(shiftIds, callback)
    {
      // fetch a content from the network;
      var params = { shiftIds: shiftIds.join(',') };
      serverCall.safeCall('shift.get', params, function(_returnArray) {
        var returnArray = _returnArray;
        
        if(returnArray && returnArray.length > 0)
        {
          // filter out null shifts
          returnArray = returnArray.filter(function(x) { return x != null; });

          // update internal array
          returnArray.each(function (shiftObj) {
            SSSetShift(shiftObj.id, shiftObj);
          });
          
          if(callback && $type(callback) == 'function')
          {
            callback(returnArray);
          }
        }
      });
    }
    
    /*
      Function: SSShiftIsLoaded
        Check to see if the shift has it's content loaded yet.
        
      Parameters:
        shiftId - a shift id.
        
      Returns:
        a boolean value.
    */
    function SSShiftIsLoaded(shiftId)
    {
      return SSHasProperty(SSGetShift(shiftId), ('content'));
    }
    
    /*
      Function: SSHasProperty
        Convenience function to check whether an object has a property.
        
      Parameters:
        obj - an Object.
        prop - the property name as a string.
        
      Returns:
        a boolean.
    */
    function SSHasProperty(obj, prop)
    {
      return (typeof obj[prop] != 'undefined');
    }
    

    function SSSetPendingShift(shiftId)
    {
      __pendingShift__ = shiftId;
    }
    
    
    function SSPendingShift()
    {
      return __pendingShift__;
    }

    /*
      Function: SSGetShifts
        Similar to SSLoadShifts, probably should be merged.  Only used by plugins.
        
      Parameters:
        shiftIds - an array of shift ids.
        callBack - a callback function.
        errorHandler - a error handling function.
    */
    function SSGetShifts(shiftIds, callBack, errorHandler)
    {
      var newShiftIds = [];
      var finalJson = {};
      
      newShiftIds = shiftIds;

      // put these together
      var params = { shiftIds: newShiftIds.join(',') };
      
      serverCall.safeCall('shift.get', params, function(json) {
        if(json.contains(null))
        {
          if(errorHandler && $type(errorHandler) == 'function')
          {
            errorHandler({
              type: __SSInvalidShiftIdError__, 
              message: "one or more invalid shift ids to SSGetShift"
            });
          }
        }
        else
        {
          // should probably filter out any uncessary data
          json.each(function(x) {
            finalJson[x.id] = x;
          });

          if(callBack) callBack(finalJson);
        }
      });
    }
    
    function SSGetPageShifts(shiftIds)
    {
      var result = [];
      for(var i = 0; i < shiftIds.length; i++)
      {
        var cshift = SSGetShift(shiftIds[i]);
        var copy = {
          username: cshift.username,
          space: cshift.space,
          status: cshift.status
        };
        result.push(copy);
      }
      return result;
    }

    
    /*
      Function: SSGetPageShiftIdsForUser
        Gets all the shifts ids on the current page for the logged in user.
        
      Returns:
        An array of shift ids.
    */
    function SSGetPageShiftIdsForUser()
    {
      var shiftIds = [];
      
      if(ShiftSpace.User.isLoggedIn())
      {
        var username = ShiftSpace.User.getUsername();
        
        for(shiftId in shifts)
        {
          if(shifts[shiftId].username == username)
          {
            shiftIds.push(shiftId);
          }
        }
      }
      
      return shiftIds;
    }
    
    
    /*
      Function: saveShift
        Saves a shift's JSON object to the server.
        
      Parameters:
        shiftJson - a shiftJson object, delivered from Shift.encode.
        
      See Also:
        Shift.encode
    */
    function saveShift(shiftJson) {
      //console.log('saveShift');
      //console.log(shiftJson);
      
      // if new skip to saveNewShift
      if (shiftJson.id.substr(0, 8) == 'newShift') {
        saveNewShift.safeCall(shiftJson);
        return;
      }
      
      var filters = shiftJson.filters;
      delete shiftJson.filters;
      
      var space = spaces[shiftJson.space];
      var params = {
        id: shiftJson.id, // TODO: handle this in a more secure way
        summary: shiftJson.summary,
        content: Json.toString(shiftJson), // MERGE: for 0.5 - David
        version: space.attributes.version,
        username: ShiftSpace.User.getUsername(),
        filters: Json.toString(filters),
      };
      
      // if a legacy shift is getting updated, we should update the space name
      var shift = SSGetShift(shiftJson.id);
      if(shift.legacy)
      {
        params.space = space.attributes.name;
      }
      
      serverCall.safeCall('shift.update', params, function(json) {
        if (!json.status) {
          return;
        }
        ShiftSpace.Console.updateShift(shiftJson);
        // call onShiftSave
        spaces[shiftJson.space].onShiftSave(shiftJson.id);
      });
    }
    
    /*
    Function: saveNewShift
      Creates a new entry for the shift on the server.
    
    Parameters:
      shiftJson - a shift json object, delivered from Shift.encode
      
    See Also:
      Shift.encode
    */
    function saveNewShift(shiftJson) 
    {
      var space = spaces[shiftJson.space];
      
      // remove the filters from the json object
      var filters = shiftJson.filters;
      delete shiftJson.filters;
      
      var params = {
        href: window.location.href,
        space: shiftJson.space,
        summary: shiftJson.summary,
        content: Json.toString(shiftJson),  // MERGE: for 0.5 - David
        version: space.attributes.version,
        filters: Json.toString(filters),
        status: SSGetDefaultShiftStatus() // TODO: this call is in the space ecosystem
      };
      
      //console.log('saving new shift');
      //console.log(params);
      
      serverCall.safeCall('shift.create', params, function(json) {
        console.log('>>>>>>>>>>>>>>>>> SAVED new shift');
        console.log(json);
        if (!json.status) 
        {
          console.error(json.message);
          return;
        }
        
        shiftJson.username = ShiftSpace.User.getUsername();
        shiftJson.created = 'Just posted';
        shiftJson.status = SSGetDefaultShiftStatus();
        shiftJson.href = window.location.href;
        
        // with the real value
        var shiftObj = space.shifts[shiftJson.id];
        shiftObj.setId(json.id);
        
        // delete the temporary stuff from the space
        // TODO: The following is hacky, should be made cleaner
        // --------- clean up area starts here -----------------
        delete shifts[shiftJson.id];
        delete space.shifts[shiftJson.id];
        
        if (SSFocusedShiftId() == shiftJson.id) {
          SSSetFocusedShiftId(json.id);
        }
        shiftJson.id = json.id;
        shiftJson.content = Json.toString(shiftJson);
        shifts[shiftJson.id] = shiftJson;
        space.shifts[shiftJson.id] = shiftObj;
        // --------- clean up area of todo ends here --------------
        
        // add and show the shift in the Console
        ShiftSpace.Console.show();
        ShiftSpace.Console.addShift(shiftJson, {isActive:true});
        ShiftSpace.Console.showShift(shiftJson.id);
        
        // call onShiftSave
        space.onShiftSave(shiftJson.id);
      });

    }
    
    /*
    Function: editShift
      Edit a shift.
      
    Parameters:
      shiftId - a shift id.
    */
    function editShift(shiftId) 
    {
      console.log('edit shift!');
      // make sure shift content is either loaded or that it is a newly created shift (thus no content)
      if(!SSShiftIsLoaded(shiftId) && !SSIsNewShift(shiftId))
      {
        // first make sure that is loaded
        SSLoadShift(shiftId, editShift.bind(ShiftSpace));
        return;
      }
      else
      {
        var space = SSSpaceForShift(shiftId);
        var user = SSUserForShift(shiftId);
        var shift = shifts[shiftId];

        // load the space first
        if(!space)
        {
          loadSpace(shift.space, shiftId, function() {
            editShift(shiftId);
          });
          return;
        }
        
        // if the space is loaded check if this shift can be shown
        if(space)
        {
          if(!space.canShowShift(SSGetShiftContent(shiftId)))
          {
            // bail
            return;
          }
        }
        
        // add a deferred shift edit if the css is not yet loaded
        if(space && !space.cssIsLoaded())
        {
          space.addDeferredEdit(shiftId);
          return;
        }
        
        // if the user has permissions, edit the shift
        if(SSUserCanEditShift(shiftId))
        {
          var shiftJson = SSGetShiftContent(shiftId);

          // show the interface
          focusSpace(space, (shiftJson && shiftJson.position) || null);
        
          // show the shift first, this way edit and show are both atomic - David
          showShift(shiftId);

          // then edit it
          space.editShift(shiftId);
          space.onShiftEdit(shiftId);
        
          // focus the shift
          focusShift(shiftId);
          
          SSFireEvent('onShiftEdit', shiftId);
        }
        else
        {
          window.alert("You do not have permission to edit this shift.");
        }
      }
      
      console.log('shift edit mode set!');
    }
    
    /*
    Function: deleteShift
      Deletes a shift from the server.
    
    Parameters:
      shiftId - a shift id.
    */
    function deleteShift(shiftId) {
      var space = SSSpaceForShift(shiftId);
    
      // don't assume the space is loaded
      if(space) space.deleteShift(shiftId);

      if(SSFocusedShiftId() == shiftId) 
      {
        SSSetFocusedShiftId(null);
      }

      var params = {
        id: shiftId
      };

      serverCall('shift.delete', params, function(json) {
        if (!json.status) {
          console.error(json.message);
          return;
        }
        ShiftSpace.Console.removeShift(shiftId);
        // don't assume the space is loaded
        if(space) space.onShiftDelete(shiftId);
        delete shifts[shiftId];
      });
    }
    
    
    // Used by keyboard handlers to maintain state information
    var keyState = {};
    
    /*
    
    keyDownHandler
    Handles keydown events.
    
    */
    function keyDownHandler(_event) {
      var event = new Event(_event);
      var now = new Date();

      //console.log('keyDownHandler');

      // Try to prevent accidental shift+space activation by requiring a 500ms
      //   lull since the last keypress
      if (keyState.keyDownTime &&
          now.getTime() - keyState.keyDownTime < 500) 
      {
        keyState.keyDownTime = now.getTime();
        return false;
      }

      if (event.code != 16) 
      {
        // Remember when last non-shift keypress occurred
        keyState.keyDownTime = now.getTime();
      } 
      else if (!keyState.shiftPressed) 
      {
        // Remember that shift is down
        keyState.shiftPressed = true;
        // Show the menu if the user is signed in
        if (ShiftSpace.ShiftMenu) 
        {
          keyState.shiftMenuShown = true;
          ShiftSpace.ShiftMenu.show(keyState.x, keyState.y);
        }
      }

      // If shift is down and any key other than space is pressed,
      // then definately shiftspace should not be invocated
      // unless shift is let go and pressed again
      if (keyState.shiftPressed &&
        event.key != 'space' &&
        event.code != 16) 
      {
        keyState.ignoreSubsequentSpaces = true;

        if (keyState.shiftMenuShown) 
        {
          keyState.shiftMenuShown = false;
          ShiftSpace.ShiftMenu.hide();
        }
      }

      // Check for shift + space keyboard press
      if (!keyState.ignoreSubsequentSpaces &&
        event.key == 'space' &&
        event.shift) 
      {
        //console.log('space pressed');
        // Make sure a keypress event doesn't fire
        keyState.cancelKeyPress = true;

        /*
        // Blur any focused inputs
        var inputs = document.getElementsByTagName('input');
        .merge(document.getElementsByTagName('textarea'))
        .merge(document.getElementsByTagName('select'));
        inputs.each(function(input) {
          input.blur();
        });
        */

        // Toggle the console on and off
        if (keyState.consoleShown) 
        {
          keyState.consoleShown = false;
          //console.log('hide console!');
          ShiftSpace.Console.hide();
        }
        else 
        {
          // Check to see if there's a newer release available
          // There's probably a better place to put this call.
          if (SSCheckForUpdates()) {
            return;
          }
          //console.log('show console!');
          keyState.consoleShown = true;
          ShiftSpace.Console.show();
        }

      }
    }
    
    
    /*
    
    keyDownHandler
    Handles keyup events.
    
    */
    function keyUpHandler(_event) {
      var event = new Event(_event);
      // If the user is letting go of the shift key, hide the menu and reset
      if (event.code == 16) {
        keyState.shiftPressed = false;
        keyState.ignoreSubsequentSpaces = false;
        ShiftSpace.ShiftMenu.hide();
      }
    }
    
    
    /*
    
    keyPressHandler
    Handles keypress events.
    
    */
    function keyPressHandler(event) {
      // Cancel if a keydown already picked up the shift + space
      if (keyState.cancelKeyPress) {
        keyState.cancelKeyPress = false;
        event = new Event(event);
        event.stopPropagation();
        event.preventDefault();
      }
    }
    
    
    function mouseMoveHandler(e) {
      var event = new Event(e);
      keyState.x = event.page.x;
      keyState.y = event.page.y;

      if (event.shift) {
        ShiftSpace.ShiftMenu.show(keyState.x, keyState.y);
      } else if (ShiftSpace.ShiftMenu) {
        ShiftSpace.ShiftMenu.hide();
      }
    }
    
    /*
    Function: loadFile
      Loads a URL and executes a callback with the response
    
    Parameters:
      url - The URL of the target file
      callback - A function to process the file once it's loaded
    */
    function loadFile(url, callback, errCallback)
    {
      // If the URL doesn't start with "http://", assume it's on our server
      if (url.substr(0, 7) != 'http://' &&
          url.substr(0, 8) != 'https://') {
        url = server + url;
      }
      
      //console.log('loadFile:' + url);

      // Caching is implemented as a rather blunt instrument ...
      if (!cacheFiles) {
        // ... either append the current timestamp to the URL ...
        var now = new Date();
        url += (url.indexOf('?') == -1) ? '?' : '&';
        url += now.getTime();
      } else {
        // ... or use getValue to retrieve the file's contents
        var cached = getValue('cache.' + url, false, true);
        
        if (cached) {
          //console.log('Loading ' + url + ' from cache');
          if (typeof callback == 'function') {
            callback({ responseText: cached });
          }
          return true;
        }
      }

      // Load the URL then execute the callback
      //console.log('Loading ' + url + ' from network');
      GM_xmlhttpRequest({
        'method': 'GET',
        'url': url,
        'onload': function(response) {
          // Store file contents for later retrieval
          if (cacheFiles) {
            cache.push(url);
            setValue('cache', cache);
            setValue('cache.' + url, response.responseText, true);
          }
          if (typeof callback == 'function') {
            callback(response);
          }
        },
        'onerror': function(response) {
          console.error("Error: failed GM_xmlhttpRequest, " + response);
          if(errCallback && typeof errCallback == 'function') errCallback();
        }
      });

      return true;
    }
    
    /*
    Function: loadSpace
      Loads the space's source code, executes it and stores an instance of the
      space class in the 'spaces' object
    
    Parameters:
      space - the Space name to load
      pendingShift - a pending shift id, will probably become deprecaed.
      callback - a callback function to run when the space is loaded.
    */
    function loadSpace(space, pendingShift, callback) 
    {
      // set the pending shift if there is one
      SSSetPendingShift(pendingShift);
      
      if(space)
      {
        if (typeof ShiftSpaceSandBoxMode != 'undefined') 
        {
          var url = installed[space] + '?' + new Date().getTime();
          var newSpace = new Asset.javascript(url, {
            id: space
          });

          if(callback) callback();
        }
        else 
        {
          loadFile(installed[space], function(rx) {
            var err;
            //console.log(space + ' Space loaded, rx.responseText:' + rx.responseText);
            
            // TODO: for Safari the following does not work, we need a function in Space
            // that evals the actual space. - David
            try
            {
              ShiftSpace.__externals__.evaluate(rx.responseText);
            }
            catch(exc)
            {
              //throw exc;
            }
            
            if(callback) callback();
          });
        }
      }
    }
    
    /*
    Function: SSRegisterSpace
      Called by the Space class to register with ShiftSpace.
    
    Parameters:
      instance - A space object.
    */
    function SSRegisterSpace(instance) {
      //console.log("SSRegisterSpace");
      var spaceName = instance.attributes.name;
      //console.log('Register Space ===================================== ' + spaceName);
      spaces[spaceName] = instance;
      instance.addEvent('onShiftUpdate', saveShift.bind(this));

      var spaceDir = installed[spaceName].match(/(.+\/)[^\/]+\.js/)[1];
      
      instance.attributes.dir = spaceDir;

      if (!instance.attributes.icon) {
        var icon = installed[spaceName].replace('.js', '.png');
        instance.attributes.icon = icon;
      } else if (instance.attributes.icon.indexOf('/') == -1) {
        var icon = spaceDir + instance.attributes.icon;
        instance.attributes.icon = icon;
      }

      //console.log("Space icon: " + instance.attribution.icon);

      // if a css file is defined in the attributes load the style
      if (instance.attributes.css) {
        if (instance.attributes.css.indexOf('/') == -1) {
          var css = spaceDir + instance.attributes.css;
          instance.attributes.css = css;
        }
        loadStyle.safeCall(instance.attributes.css, instance.onCssLoad.bind(instance));
      }

      // This exposes each space instance to the console
      if (debug) {
        ShiftSpace[instance.attributes.name + 'Space'] = instance;
      }

      instance.addEvent('onShiftHide', ShiftSpace.Console.hideShift.bind(ShiftSpace.Console));
      instance.addEvent('onShiftShow', function(shiftId) {
        ShiftSpace.Console.showShift(shiftId);
      });
      instance.addEvent('onShiftBlur', function(shiftId) {
        blurShift(shiftId);
        ShiftSpace.Console.blurShift(shiftId);
      });
      instance.addEvent('onShiftFocus', function(shiftId) {
        focusShift(shiftId);
        ShiftSpace.Console.focusShift(shiftId);
      });
      instance.addEvent('onShiftSave', function(shiftId) {
        ShiftSpace.Console.blurShift(shiftId);
        ShiftSpace.Console.setTitleForShift(shifts[shiftId].summary);
      });
      instance.addEvent('onShiftDestroy', SSRemoveShift);
      instance.addEvent('onShiftDelete', deleteShift);
    }
    
    /*
      Function: SSRemoveShift
        Remove a shift from the internal array.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSRemoveShift(shiftId)
    {
      //delete shifts[shiftId];
    }
    
    /*
      Function: SSLoadPlugin
        Loads a plugin
        
      Parameters:
        plugin - a plugin name as a string.
        callback - a callback function.
    */
    function SSLoadPlugin(plugin, callback) 
    {
      //console.log('SSLoadPlugin ' + plugin);
      if(plugins[plugin])
      {
        if(callback) callback();
        return;
      }
      
      if (typeof ShiftSpaceSandBoxMode != 'undefined') 
      {
        var url = installedPlugins[plugin] + '?' + new Date().getTime();
        var newSpace = new Asset.javascript(url, {
          id: plugin
        });
      } 
      else 
      {
        loadFile(installedPlugins[plugin], function(rx) {
          // TODO: The following does not work we need to use the plugin eval
          try
          {
            ShiftSpace.__externals__.evaluate(rx.responseText);
          }
          catch(exc) 
          {
            console.error('Error loading ' + plugin + ' Plugin - ' + SSDescribeException(exc));
          }
          
          if(callback) callback();
        });
      }
    }
    
    /*
      Function: SSRegisterPlugin
        Register a plugin.
        
      Parameters:
        plugin - a plugin object.
    */
    function SSRegisterPlugin(plugin)
    {
      //console.log('SSRegisterPlugin ' + plugin);
      plugins[plugin.attributes.name] = plugin;
      
      var pluginDir = installedPlugins[plugin.attributes.name].match(/(.+\/)[^\/]+\.js/)[1];
      
      // if a css file is defined in the attributes load the style
      if (plugin.attributes.css)
      {
        if (plugin.attributes.css.indexOf('/') == -1) 
        {
          var css = pluginDir + plugin.attributes.css;
          plugin.attributes.css = css;
        }
        loadStyle.safeCall(plugin.attributes.css, plugin.onCssLoad.bind(plugin));
      }
      plugin.attributes.dir = pluginDir;
      
      // Load any includes
      if(plugin.attributes.includes)
      {
        if (typeof ShiftSpaceSandBoxMode != 'undefined') 
        {
          plugin.attributes.includes.each(function(include) {
            var url = plugin.attributes.dir + include + '?' + new Date().getTime();
            var newSpace = new Asset.javascript(url, {
              id: include
            });
          });
        }
        else
        {
          var includesTotal = plugin.attributes.includes.length;
          var includeLoadCount = 0;
          //console.log('Loading includes ' + plugin.attributes.includes);
          plugin.attributes.includes.each(function(include) {
            //console.log('Loading include ' + include);
            loadFile.safeCall(plugin.attributes.dir+include, function(rx) {
              includeLoadCount++;
              //console.log('includeLoadCount ' + includeLoadCount);
              try
              {
                ShiftSpace.__externals__.evaluate(rx.responseText);
              }
              catch(exc)
              {
                console.error('Error loading ' + include + ' include for ' + plugin.attributes.name + ' Plugin - ' + SSDescribeException(exc));
              }
              // Notify listeners of plugin load
              if(includeLoadCount == includesTotal) 
              {
                //console.log('onPluginLoad');
                SSFireEvent('onPluginLoad', plugin);
              }
            }, null);
          });
        }
      }
      else
      {
        // Notify listeners of plugin load
        SSFireEvent('onPluginLoad', plugin);
      }
      
      // listen for plugin status changes and pass them on
      plugin.addEvent('onPluginStatusChange', function(evt) {
        SSFireEvent('onPluginStatusChange', evt);
      });

      // This exposes each space instance to the console
      if (debug) 
      {
        ShiftSpace[plugin.attributes.name] = plugin;
      }
    }
    
    /*
    Function: serverCall
      Sends a request to the server.
    
    Parameters:
      method - Which method to call on the server (string)
      parameters - Values passed with the call (object)
      callback - (optional) A function to execute upon completion
    */
    function serverCall(method, parameters, _callback) {
      var callback = _callback;
      var url = server + 'shiftspace.php?method=' + method;
      //console.log('serverCall: ' + url);
      var data = '';
      
      for (var key in parameters) {
        if (data != '') {
          data += '&';
        }
        data += key + '=' + encodeURIComponent(parameters[key]);
      }
      
      var plugins = new Hash(installedPlugins);
      url += '&plugins=' + plugins.keys().join(',');
      
      var now = new Date();
      url += '&cache=' + now.getTime();
      
      //console.log(data);
      
      //GM_openInTab(url);
      var req = {
        method: 'POST',
        url: url,
        data: data,
        onload: function(_rx) {
          var rx = _rx;
          if (typeof callback == 'function') {
            try
            {
              var theJson = Json.evaluate(rx.responseText);
            }
            catch(exc)
            {
              console.log('Server call exception: ' + SSDescribeException(exc));
            }
            callback(theJson);
          }
          else
          {
          }
        },
        onerror: function(err) {
        }
      };
      
      // Firefox doesn't work without this
      // and the existence of this breaks Safari
      if(!window.webkit)
      {
        req.headers = {
          'Content-type': 'application/x-www-form-urlencoded'
        };
      }

      // we need to have error handling right here
      GM_xmlhttpRequest(req);
    }
    
    
    /*
    Function: setValue
      A wrapper function for GM_setValue that handles non-string data better.
    
    Parameters:
      key - A unique string identifier
      value - The value to store. This will be serialized by uneval() before
              it gets passed to GM_setValue.
    
    Returns:
        The value passed in.
    */
    function setValue(key, value, rawValue) {
      if (rawValue) {
        GM_setValue(key, value);
      } else {
        GM_setValue(key, Json.toString(value));
      }
      return value;
    }
    
    
    /*
    Function: getValue (private, except in debug mode)
      A wrapper function for GM_getValue that handles non-string data better.
    
    Parameters:
      key - A unique string identifier
      defaultValue - This value will be returned if nothing is found.
      rawValue - Doesn't use Json encoding on stored values
    
    Returns:
      Either the stored value, or defaultValue if none is found.
    */
    function getValue(key, defaultValue, rawValue) {
      if (!rawValue) {
        defaultValue = Json.toString(defaultValue);
      }
      var result = GM_getValue(key, defaultValue);
      // Fix for GreaseKit, which doesn't support default values
      if (result == null) {
        return Json.evaluate(defaultValue);
      } else if (rawValue) {
        return result;
      } else {
        return Json.evaluate(result);
      }
    }
    
    
    /*
    Function: loadStyle 
      Loads a CSS file, processes it to make URLs absolute, then appends it as a
      STYLE element in the page HEAD.
    
    Parameters:
      url - The URL of the CSS file to load
      callback - A custom function to handle css text if you don't want to use GM_addStyle
      spaceCallback - A callback function for spaces that want to use GM_addStyle but need to be notified of CSS load.
    */
    function loadStyle(url, callback, frame) {
      // TODO: check to see if the domain is different, if so don't mess with the url - David
      var dir = url.split('/');
      dir.pop();
      dir = dir.join('/');
      if (dir.substr(0, 7) != 'http://') {
        dir = server + dir;
      }
      
      loadFile(url, function(rx) {
        var css = rx.responseText;
        // this needs to be smarter, only works on directory specific urls
        css = css.replace(/url\(([^)]+)\)/g, 'url(' + dir + '/$1)');
        
        // if it's a frame load it into the frame
        if(frame)
        {
          var doc = frame.contentDocument;

          if( doc.getElementsByTagName('head').length != 0 )
          {
            var head = doc.getElementsByTagName('head')[0];
          }
          else
          {
            // In Safari iframes don't get the head element by default - David
            // Mootools-ize body
            $(doc.body);
            var head = new Element( 'head' );
            head.injectBefore( doc.body );
          }
          
          var style = doc.createElement('style');
          style.setAttribute('type', 'text/css');
          style.appendChild(doc.createTextNode(css)); // You can not use setHTML on style elements in Safari - David
          head.appendChild(style);
        }
        else
        {
          GM_addStyle(css);
        }
        
        if (typeof callback == 'function') 
        {
          callback();
        } 

      });
    }
    
    /*
    Function: log
      Logs a message to the console, but only in debug mode or when reporting
      errors.
    
    Parameters:
      msg - The message to be logged in the JavaScript console.
      verbose - Force the message to be logged when not in debug mode. 
    */
    function log(msg, verbose) {
      if (typeof verbose != 'undefined' || debug) {
        if (typeof console == 'object' && console.log) {
          console.log(msg);
        } else if (typeof GM_log != 'undefined') {
          GM_log(msg);
        } else {
          setTimeout(function() {
            throw(msg);
          }, 0);
        }
      }
    }
    
    /*
      Function: SSCanGoFullScreen
        Returns wether ShiftSpace can lose the fullscreen mode.
        
      Parameters:
        Returns a boolean.
    */
    function SSCanGoFullScreen()
    {
      return true;
    }
    
    /*
      Function: SSCanExitFullScreen
        Return whther ShiftSpace is ready to return to full screen mode.
        
      Returns:
        A boolean.
    */
    function SSCanExitFullScreen()
    {
      return true;
    }
    
    var __errorWindowShiftPropertyModel__;
    var __errorWindowMinimized__ = true;
    
    /*
      Function: SSCreateErrorWindow
        Create the error window.
    */
    function SSCreateErrorWindow()
    {
      // Create the model for the table
      __errorWindowShiftPropertyModel__ = new ShiftSpace.Element('tr');
      __errorWindowShiftPropertyModel__.setStyle('display', '');
      var propertyName = new ShiftSpace.Element('td');
      propertyName.addClass('SSErrorWindowShiftProperty');
      var propertyValue = new ShiftSpace.Element('td');
      propertyName.injectInside(__errorWindowShiftPropertyModel__);
      propertyValue.injectInside(__errorWindowShiftPropertyModel__);
      
      // the error window
      __errorWindow__ = new ShiftSpace.Element('div', {
        'class': "SSErrorWindow SSDisplayNone"
      });
      
      // error title area
      var errorWindowTitle = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowTitle"
      });
      errorWindowTitle.injectInside(__errorWindow__);
      errorWindowTitle.setText('Oops ... it seems this shift is broken');
      
      // the errow message area
      var errorWindowMessage = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowMessage"
      });
      errorWindowMessage.injectInside(__errorWindow__);
      errorWindowMessage.setHTML('Help us improve our experimental fix feature, copy and paste the shift details and <a target="new" href="http://metatron.shiftspace.org/trac/newticket">file a bug report</a>.');

      var br = new ShiftSpace.Element('br');
      br.setStyle('clear', 'both');
      br.injectInside(__errorWindow__);
      
      // add the bottom
      var errorWindowBottom = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowBottom"
      });
      errorWindowBottom.injectInside(__errorWindow__);
      
      // build the disclosure triangle and label
      var errorWindowDisclosure = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowDisclosure"
      });
      var errorWindowExpandWrapper = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowExpandWrapper SSUserSelectNone"
      });
      var errorWindowExpand = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowExpand"
      });
      errorWindowExpand.injectInside(errorWindowExpandWrapper);
      var errorWindowExpandLabel = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowExpandLabel SSDefaultCursor"
      });
      errorWindowExpandLabel.setText('view shift details');
      errorWindowExpandLabel.injectInside(errorWindowExpandWrapper);
      errorWindowExpandWrapper.injectInside(errorWindowDisclosure);
      
      errorWindowDisclosure.injectInside(errorWindowBottom);
      
      // bulid the table where the shift data will be shows
      var errorWindowShiftStatusScroll = new ShiftSpace.Element('div', {
        'class': 'SSErrorWindowShiftStatusScroll SSDisplayNone'
      });
      var errorWindowShiftStatus = new ShiftSpace.Element('table', {
        'class': "SSErrorWindowShiftStatus",
        'col' : 2
      });
      errorWindowShiftStatus.injectInside(errorWindowShiftStatusScroll);
      errorWindowShiftStatusScroll.injectInside(errorWindowDisclosure);
      
      
      // build the ok button
      var errorWindowOk = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowOk SSUserSelectNone"
      });
      errorWindowOk.setText('OK');
      errorWindowOk.injectInside(errorWindowBottom);
      
      // build the fix button
      var errorWindowFix = new ShiftSpace.Element('div', {
        'class': "SSErrorWindowFix SSErrorWindowButton SSDisplayNone"
      });
      errorWindowFix.setText('Fix');
      errorWindowFix.injectInside(errorWindowBottom);

      errorWindowOk.addEvent('click', function(_evt) {
        var evt = new Event(_evt);
        
        var fadeFx = __errorWindow__.effects({
          duration: 300,
          transition: Fx.Transitions.Cubic.easeOut,
          onComplete: function()
          {
            // reset the error window
            __errorWindow__.setStyles({
              width: 280, 
              height: 100
            });
            errorWindowExpand.removeClass('SSErrorWindowExpandOpen');
            errorWindowExpandLabel.setText('view shift details');
            errorWindowShiftStatusScroll.addClass('SSDisplayNone');
            __errorWindowMinimized__ = true;
          }
        });
        
        fadeFx.start({
          opacity: [0.95, 0]
        });
      });
      
      // add expand action
      errorWindowExpandWrapper.addEvent('click', function(_evt) {
        var evt = new Event(_evt);
        
        if(!__errorWindowMinimized__)
        {
          errorWindowExpand.removeClass('SSErrorWindowExpandOpen');
          errorWindowExpandLabel.setText('view shift details');
          errorWindowShiftStatusScroll.addClass('SSDisplayNone');
        }
        else
        {
          errorWindowExpand.addClass('SSErrorWindowExpandOpen');
          errorWindowExpandLabel.setText('hide shift details');
        }
        
        var resizeFx = __errorWindow__.effects({
          duration: 500,
          transition: Fx.Transitions.Cubic.easeOut,
          onComplete: function()
          {
            if(!__errorWindowMinimized__)
            {
              errorWindowShiftStatusScroll.removeClass('SSDisplayNone');
            }
          }
        });

        if(__errorWindowMinimized__)
        {
          resizeFx.start({
            width: [280, 340],
            height: [100, 300],
          });
        }
        else
        {
          resizeFx.start({
            width: [340, 280],
            height: [300, 100],
          });
        }
        
        __errorWindowMinimized__ = !__errorWindowMinimized__;
      });

      __errorWindow__.injectInside(document.body);
    }
    
    /*
      Function: SSShowErrorWindow
        Show the error window.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSShowErrorWindow(shiftId)
    {
      /*
      __errorWindow__.getElement('.SSErrorWindowTitle').setText(title);
      __errorWindow__.getElement('.SSErrorWindowMessage').setText(message);
      */
      
      if(shiftId) SSErrorWindowUpdateTableForShift(shiftId);
      
      // is this shift fixable, if so show the fix button
      var space = SSSpaceForShift(shiftId);
      var fixButton = __errorWindow__.getElement('.SSErrorWindowFix');

      if(space && space.fix && SSUserCanEditShift(shiftId))
      {
        fixButton.removeClass('SSDisplayNone');
        fixButton.removeEvents();
        
        fixButton.addEvent('click', function(_evt) {
          var evt = new Event(_evt);
          
          // close the error window
          SSHideErrorWindow();

          var shift = SSGetShift(shiftId);
          
          // hmm add the shift, not show it
          // load the shift
          space.addShift({
            id: shiftId,
            username: shift.username,
            summary: shift.summary
          });
          // set the current shift
          space.setCurrentShiftById(shiftId);
          // edit the shift
          space.editShift(shiftId);

          // attempt to fix it
          var err = space.fix({
            id: shiftId,
            username: shift.username,
            summary: shift.summary,
            content: unescape(shift.content) // MERGE: for 0.5 - David
          });
          
        });
      }
      else
      {
        fixButton.addClass('SSDisplayNone');
      }

      __errorWindow__.setOpacity(0);
      __errorWindow__.removeClass('SSDisplayNone');
      
      var fadeFx = __errorWindow__.effects({
        duration: 300,
        transition: Fx.Transitions.Cubic.easeOut
      });
      
      fadeFx.start({
        opacity: [0, 0.95]
      });
    }
    
    /*
      Function: SSHideErrorWindow
        Hide the error window.
    */
    function SSHideErrorWindow()
    {
      __errorWindow__.addClass('SSDisplayNone');
    }
    
    /*
      Function: SSErrorWindowUpdateTableForShift
        Update object description table for a shift.
        
      Parameters:
        shiftId - a shift id.
    */
    function SSErrorWindowUpdateTableForShift(shiftId)
    {
      var statusTable = __errorWindow__.getElement('.SSErrorWindowShiftStatus');
      // clear out the table of it's contents
      statusTable.empty();
      
      var theShift = SSGetShift(shiftId);
      var shiftContent;
      
      try
      {
        shiftContent = SSGetShiftContent(shiftId);
      }
      catch(err)
      {
        shiftContent = {
          id: theShift.id,
          content: unescape(theShift.content) // MERGE: for 0.5 - David
        };
      }
      
      for(var prop in shiftContent)
      {
        var newPair = __errorWindowShiftPropertyModel__.clone(true);
        var tds = newPair.getElements('td');

        tds[0].setText(prop);
        tds[1].setText(shiftContent[prop]);

        newPair.injectInside(statusTable);
      }
    }
    
    // In sandbox mode, expose something for easier debugging.
    if (typeof ShiftSpaceSandBoxMode != 'undefined') 
    {
      this.spaces = spaces;
      this.shifts = shifts;
      this.trails = trails;
      this.setValue = setValue;
      this.getValue = getValue;
      this.plugins = plugins;
      unsafeWindow.ShiftSpace = this;

      // for Action Menu debugging
      this.SSGetPageShifts = SSGetPageShifts;
      this.SSHideShift = hideShift;
      this.SSDeleteShift = deleteShift;
      this.SSEditShift = editShift;
      this.SSShowShift = showShift;
      this.SSUserOwnsShift = SSUserOwnsShift;
      this.SSSetShiftStatus = SSSetShiftStatus;
    }
    
    return this;
})();

// NOTE: For Safari to keep SS extensions out of private scope - David
ShiftSpace.__externals__ = {
  evaluate: function(external, object)
  {
    with(ShiftSpace.__externals__)
    {
      eval(external);
    }
  }
}

// For errors in Safari because many errors are silent in GreaseKit
function SSDescribeException(_exception)
{
  var temp = [];
  for(var prop in _exception)
  {
    temp.push(prop + ':' + _exception[prop]);
  }
  return "Exception:{ " + temp.join(', ') +" }";
}

if(self == top) 
{
  // if in sandbox mode need to wait until the window is ready to open
  if(typeof ShiftSpaceSandBoxMode != 'undefined')
  {
    window.addEvent('domready', function(){
      ShiftSpace.initialize();
    });
  }
  else
  {
    try
    {
      ShiftSpace.initialize();
    }
    catch(exc)
    {
      console.error("Unable to install ShiftSpace :(, " + SSDescribeException(exc));
    }
  }
}
