// ==UserScript==
// @name       Codeskulptor Simplegui2
// @namespace  http://mcimino.reaktix.com/
// @version    0.1
// @description  Moddifies the simplegui module and saves the changes as simplegui2. Simplegui2 offers additional features over simplegui.
// @match      http://www.codeskulptor.org/*
// @copyright  2013+, Saibotshamtul
// ==/UserScript==

//CC BY-SA
//This work by Saibotshamtul is licensed under a 
//Creative Commons Attribution-ShareAlike 3.0 Unported License.

Sk.cr = String.fromCharCode(10); 
//Sk.sq = String.fromCharCode(39);
//Sk.dq = String.fromCharCode(34);

//Sk.output(Sk.cr+window.opener.location+Sk.cr);
Sk.w = window;

//Create NEW builtin javascript functions
Sk.new = {}
Sk.new.sg_console_get = function(){return new Sk.builtins.str(Sk.w.document.querySelector("#console pre").innerHTML)}
Sk.new.sg_console_clear = function(){Sk.w.document.querySelector("#console pre").innerHTML="";return ""}
Sk.new.sg_code_setTitle=function(x){Sk.w.document.title=x.v;return x.v}
Sk.new.sg_code_curLine = function(){return Sk.currLineNo}
Sk.new.sg_console_cprint = function(str,col){if (!col){col="#000000"}c = Sk.w.document.querySelector("#console pre");c.innerHTML = c.innerHTML+'<span style="color:'+col.v+';">'+str.v+'</span>'+Sk.cr;}
Sk.new.sg_console_printHTML = function(str){c = Sk.w.document.querySelector("#console pre");c.innerHTML = c.innerHTML+str.v+Sk.cr;}

//Create NEW builtin functions to read/write cookies
//http://www.w3schools.com/js/js_cookies.asp
Sk.new.sg_cookie_set = function(c_name,value,exdays){if (exdays==undefined){exdays=30;}else{exdays=Sk.ffi.unwrapn(exdays);}var exdate=new Date();exdate.setDate(exdate.getDate() + exdays);var c_value=escape(Sk.builtins.str(value).v) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());Sk.w.document.cookie=Sk.builtins.str(c_name).v + "=" + c_value;}
Sk.new.sg_cookie_get = function(c_name){var c_value = Sk.w.document.cookie;var c_start = c_value.indexOf(" " + Sk.builtins.str(c_name).v + "=");if (c_start == -1){c_start = c_value.indexOf(Sk.builtins.str(c_name).v + "=");}if (c_start == -1){c_value = null;}else{c_start = c_value.indexOf("=", c_start) + 1;var c_end = c_value.indexOf(";", c_start);if (c_end == -1){c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return new Sk.builtins.str(c_value);}

if (Sk.hacked==true){
//    Sk.builtinFiles.files["src/lib/simplegui/__init__.js"] = Sk.builtinFiles.files["src/lib/simpleguiorig/__init__.js"]
    Sk.hacked=null
}

//Hack the Simplegui source, then un-import it,
//		so we can re-import the moddified/hacked code
if (Sk.hacked==null){
sg = Sk.builtinFiles.files["src/lib/simplegui/__init__.js"]

// Add bgcolor, margin size, (left,top)
sg = sg.replace("control_width) {","control_width, bgcol, margin, win_pos) {").replace("control_width) {","control_width, bgcol, margin, win_pos) {")
// Add bgcolor, margin size, (left,top) to frame.init
sg = sg.replace("self.margin = 23;","if (margin === undefined) {margin=23;} else {margin = Sk.builtin.asnum$(margin);}self.margin=margin;")
sg = sg.replace('self.background = "#000000";','self.background = "#000000";if (bgcol === undefined) {bgcol="#FFFFFF";} else {bgcol = Sk.ffi.unwrapo(bgcol);}self.bg=bgcol;')
sg = sg.replace("'<body>'","'<body bgcolor='+bgcol+'>'")
// Add bgcolor, margin size, (left,top) to create_frame
sg = sg.replace('Sk.builtin.pyCheckArgs("create_frame", arguments, 3, 4);','Sk.builtin.pyCheckArgs("create_frame", arguments, 3, 7);')
sg = sg.replace("return Sk.misceval.callsim(mod.Frame, title, canvas_width, canvas_height, control_width);","return Sk.misceval.callsim(mod.Frame, title, canvas_width, canvas_height, control_width, bgcol, margin, win_pos);")

// Add error-checking to create_frame
rx = "return Sk.misceval.callsim(mod.Frame"
ry = function(){/*
    if (!(bgcol===undefined)){
        if (!Sk.builtin.checkString(bgcol)) {
            throw new Sk.builtin.TypeError("background color must be a string");
        };
    };
    if (!(margin===undefined)){
        if (!Sk.builtin.checkNumber(margin)) {
            throw new Sk.builtin.TypeError("margin width must be a number");
        }; 
        if (Sk.builtin.asnum$(margin) < 0) {
            throw new Sk.builtin.ValueError("margin width must be >= 0");
        };
    };
    if (!(win_pos===undefined)){
        if (!checkPoint(win_pos)) {
            throw new Sk.builtin.TypeError("window position must be a 2 element sequence");
        };
    };
    */}.toString().slice(14,-3)
sg = sg.replace(rx,ry+Sk.cr+rx)

// Fix get_canvas_image
sg = sg.replace("var imagedata = self.canvas.toDataURL();","var imagedata = self.canvas.toDataURL();return imagedata;")

// Add hidden Control if NoneType width
//	stop create_frame from throwing an error if control_width==None
rx = "if (control_width !== undefined) {"
rx2 =	"            "
rx2 +=	"if (!(control_width.v==null)){"+Sk.cr
sg = sg.replace(rx,rx+Sk.cr+rx2)
rx = '"control width must be >= 0");'
sg = sg.replace(rx,rx+Sk.cr+"            "+"};")
//	catch None and replace with 0, but add css to hide
rx = "self.title = title;"
rx2 =	"if (!(control_width==undefined)&&(control_width.v==null)){"
rx2 +=	"	self.hidden_ctrl='<style>#guiframe div{display:none;}</style>';"
rx2 +=	"	control_width=0;}else{self.hidden_ctrl='';}"
sg = sg.replace(rx,rx+Sk.cr+rx2)
//  add css to hide control
sg = sg.replace("'</head>'","self.hidden_ctrl+'</head>'")

// Add Frame.set_unload_handler
rx = /(.*?loc.set_draw_handler[\s\S]*?\}\);)/m
sg_f_set_unload_handler = function(self,handler){
        Sk.builtin.pyCheckArgs("set_unload_handler", arguments, 2, 2);
        if (!Sk.builtin.checkFunction(handler)) {
            throw new Sk.builtin.TypeError("handler must be a function");
        };
        //Sk.output("sg_f_set_unload_handler "+Sk.cr);
        self.unloadhandler = handler;
        self.unload_lineno = Sk.currLineNo;
        return Sk.builtin.none.none$;
}
rx3 = rx.exec(sg)[0]+Sk.cr+
    "	$loc.set_unload_handler = new Sk.builtin.func("+
    sg_f_set_unload_handler.toString()+");"+Sk.cr
sg = sg.replace(rx,rx3);
// and modify all exit calls (except for errors) to use it
sg_f_unload = function(){/*
    //Sk.output("sg_f_unload ");
    try {
        Sk.setExecStartNow(true);
        Sk.currLineNo = self.unload_lineno;
        if (self.unloadhandler!=null){
            Sk.misceval.callsim(self.unloadhandler);
        }
    } catch (e) {
        Sk.error(e);
        Sk.simplegui.cleanup();
    }
*/}.toString().slice(14,-3)
sg = sg.replace("cancelAnimation(self);","cancelAnimation(self);"+Sk.cr+sg_f_unload)
sg = sg.replace("Key state","Key state"+Sk.cr+"self.unloadhandler=null;")

sg_new_classes = function(){/*
//Python Browser class
var browser = function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {
    });
    $loc.prefix = new Sk.builtin.func(function(){
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        z = ''
        for(var x = 0; x < vendors.length ; ++x) {
            if (window[vendors[x]+'RequestAnimationFrame']){
                z += vendors[x]};
        };
        if (z==''){z='unknown'};
        return new Sk.builtin.str(z);
    });
    $loc.userAgent = new Sk.builtin.func(function(){
        return new Sk.builtin.str(window.navigator.userAgent);
    });
    $loc.detect = new Sk.builtin.func(function(){
    //http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
        var N= navigator.appName, ua= navigator.userAgent, tem;
        var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
        M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
        return new Sk.builtin.tuple([Sk.builtin.str(M[0]),Sk.builtin.str(M[1])]);        	
    });
}
mod.Browser = Sk.misceval.buildClass(mod, browser, 'Browser', []);

// Python Console class
var console = function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {
    });
    $loc.get = Sk.new.sg_console_get;
    $loc.clear = Sk.new.sg_console_clear;
    $loc.cprint = Sk.new.sg_console_cprint;
    $loc.printHTML = Sk.new.sg_console_printHTML;
};
mod.Console = Sk.misceval.buildClass(mod, console, 'Console', []);

// Python Code class
var code = function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {
    });
    $loc.setTitle = Sk.new.sg_code_setTitle;
    $loc.curLine = Sk.new.sg_code_curLine;
};
mod.Code = Sk.misceval.buildClass(mod, code, 'Code', []);

// Python Cookie class
var cookie = function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {
    });
    $loc.get = Sk.new.sg_cookie_get;
    $loc.set = Sk.new.sg_cookie_set;
};
mod.Cookie = Sk.misceval.buildClass(mod, cookie, 'Cookie', []);
*/}.toString().slice(14,-3)
sg = sg.replace("return mod;",sg_new_classes+Sk.cr+"return mod;")

//save the moddified simplegui module as simplegui2
Sk.builtinFiles.files["src/lib/simplegui2/__init__.js"] = sg

Sk.hacked = true;
} else {
}

//Test code
Sk.builtins.jso_test = function(x){Sk.hack = x;return x;}
