// ==UserScript==
// @name           Command and Conquer Tiberium Alliances - Management
// @namespace      http://nysoft.de
// @version        0.3 CCTAM-RELEASE-JOB1-17
// @description    This is a tool to better manage your command & conquer tiberium alliances account
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @require        http://sizzlemctwizzle.com/updater.php?id=136676&uso&show&days=1
// @copyright      2012+, NySoft
// @author         Manuel Richarz
// ==/UserScript==

(function(){
    
    var CCTAM = function() {
        function init() {
        	
            

/*
 * Store
 * 
 * Version: 1.0
 * 
 * This class gives you an interface to load and save data
 * from an context in HTML5 localStorage.
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
qx.Class.define("de.nysoft.CCTAM.util.Store", {
    extend: qx.core.Object,
    construct: function(storeName) {
        this.storeName = storeName;
    },
    statics: {
        hasLocalStorage: function() {
            return (typeof(Storage) !== "undefined");
        }
    },
    members: {
        storeName: null,
        set: function(data) {
            if(de.nysoft.CCTAM.util.Store.hasLocalStorage()) {
                this.debug('Save to storage: '+JSON.stringify(data));
                localStorage[this.storeName] = JSON.stringify(data);
            }
        },
        get: function() {
            if(de.nysoft.CCTAM.util.Store.hasLocalStorage() && localStorage[this.storeName] != 'undefined') {
                try {
                    this.debug('Load from storage');
                    return JSON.parse(localStorage[this.storeName]);
                } catch(e) {
                    this.error('Error in receiving JSON from localStorage. Clearing localStorage now!');
                    this.set(null);
                }
            }
            this.debug('Nothing to load from storage');
            return null;
        }
    }
});

/*
 * Scheduler
 * 
 * Version: 1.0
 * 
 * This class is an async scheduler. You can add/remove tasks with an interval and executionCount.
 * Info: maxExecutionCount = 0 = 'unlimited'
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
qx.Class.define('de.nysoft.CCTAM.util.Scheduler', {
	type : 'singleton',
	extend : qx.core.Object,
	construct: function() {
		this.start();
	},
	members: {
		tasks: [],
		sequenceInterval: 500,
		ticks: 0,
		running: false,
		addTask: function(method, context, interval, maxExecutionCount) {
			//set default executionCount
			if(maxExecutionCount == null) {
				maxExecutionCount = 1;
			}
			//set default interval
			interval = interval || 10;
			//add task
			if(method) {
				var taskId = this.tasks.push({
					method: method,
					context: context,
					interval: interval,
					maxExecutionCount: maxExecutionCount,
					executionCount: 0,
					lastTick: this.ticks
				}) - 1;
				this.debug('Adding Task to Scheduler. [TaskId: '+taskId+']');
				return taskId;
			}
		},
		removeTaskById: function(id) {
			this.debug('Removing Task by Id from Scheduler. [TaskId: '+id+']');
			this.tasks.splice(id, 1);
		},
		removeAllTasks: function() {
			this.debug('Removing all Tasks from Scheduler.');
			this.tasks = [];
		},
		getTasks: function() {
			return this.tasks;
		},
		getTaskById: function(id) {
			return this.tasks[id];
		},
		setTaskById: function(id, task) {
			this.tasks[id] = task;
		},
		start: function() {
			this.debug('Starting Scheduler...');
			this.running = true;
			this._running();
			this.debug('started!');
		},
		stop: function() {
			this.debug('Stopping Scheduler...');
			clearTimeout(this.running);
			this.running = null;
			this._resetTicks();
			this.debug('stopped!');
		},
		_running: function() {
			if(this.running) {
				this._doTick();
				this._execute();
				var self = this;
				this.running = setTimeout(function() {
					self._running();
				}, this.sequenceInterval);
			}
		},
		_doTick: function() {
			//(this.ticks%2) ? this.debug('Tick...') : this.debug('...Tack');
			this.ticks++;
		},
		_getTicks: function() {
			return this.ticks;
		},
		_resetTicks: function() {
			this.debug('Resetting Ticks!');
			this.ticks = 0;
		},
		_execute: function() {
			for(var i in this.tasks) {
				var task = this.tasks[i];
				//check for the right interval and if task is finished
				if(this._checkDoInterval(task) && !this._isTaskFinished(task)) {
					task.lastTick = this._getTicks();
					task.executionCount++;
					try {
						task.method.call(task.context);
					} catch(e) { this.info(this, e); }
				}
				//remove task if finished
				if(this._isTaskFinished(task)) {
					this.debug('Task finished! [TaskId: '+i+']');
					this.removeTaskById(i);
				}
			}
		},
		_checkDoInterval: function(task) {
			return ((this._getTicks() - task.lastTick) == task.interval);
		},
		_isTaskFinished: function(task) {
			return (task.maxExecutionCount != 0 && task.executionCount >= task.maxExecutionCount);
		},
		setSequenceInterval: function(value) {
			this.sequenceInterval = value;
		},
		getSequenceInterval: function() {
			return this.sequenceInterval;
		}
	},
	statics: {
		addTask: function(method, context, interval, maxExecutionCount) {
			return de.nysoft.CCTAM.util.Scheduler.getInstance().addTask(method, context, interval, maxExecutionCount);
		},
		removeTaskById: function(id) {
			return de.nysoft.CCTAM.util.Scheduler.getInstance().removeTaskById(id);
		},
		getTaskById: function(id) {
			return de.nysoft.CCTAM.util.Scheduler.getInstance().getTaskById(id);
		},
		setTaskById: function(id, task) {
			de.nysoft.CCTAM.util.Scheduler.getInstance().setTaskById(id, task);
		}
	}
});

/*
 * Hotkeys
 * 
 * Version: 1.0
 * 
 * This class adds a global hotkey-Listener.
 * In this class you can add HotkeyListener for specified hotkeyCode.
 * Bsp.: de.nysoft.CCTAM.util.Hotkeys.addListener('ctrl+alt+o', function(event) {alert('hi there.');}, null);
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
qx.Class.define('de.nysoft.CCTAM.util.Hotkeys', {
	type : 'singleton',
	extend : qx.core.Object,
	construct: function() {
		qx.bom.Element.addListener(document, "keyup", this.executeHotkey, this);
	},
	members: {
		registredListener: [],
		pressedKeys: [],
		sKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
		executeHotkey: function(event) {
			this.catchPressedKeys(event._native);
			for(var l in this.registredListener) {
				var listener = this.registredListener[l];
				if(this._matchKeys(listener.keys, this.pressedKeys)) {
					this.debug(this, 'Call listener.method of: '+listener.hotkeyCode);
					listener.method.call(listener.context, [event]);
				}
			}
			return true;
		},
		catchPressedKeys: function(event) {
			this.pressedKeys = [];
			if(event.altKey) {
				this.pressedKeys.push('alt');
			}
			if(event.ctrlKey) {
				this.pressedKeys.push('ctrl');
			}
			if(event.shiftKey) {
				this.pressedKeys.push('shift');
			}
			var currentKey = this.sKeys[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
			this.pressedKeys.push(currentKey);
		},
		addListener: function(hotkeyCode, method, context) {
			var keys = this._parseKeys(hotkeyCode);
			if(keys.length > 0) {
				this.registredListener.push({
					hotkeyCode: hotkeyCode,
					keys: keys,
					method: method,
					context: context
				});
				this.debug(this, 'Added listener for "'+hotkeyCode+'".');
				return true;
			}
			return false;
		},
		_matchKeys: function(needle, haystack) {
			if(needle == haystack) {
				return true;
			}
			for(var i in needle) {
				if(!this._inArray(needle[i], haystack)) {
					return false;
				}
			}
			return true;
		},
		_inArray: function(needle, haystack) {
		    for(var key in haystack) {
		        if(needle === haystack[key]) {
		            return true;
		        }
		    }

		    return false;
		},
		_parseKeys: function(hotkeyCode) {
			var keys = hotkeyCode.split('+');
			for(var i in keys) {
				keys[i] = keys[i].toLowerCase();
			}
			return keys;
		},
		removeAllListeners: function() {
			this.registredListener = [];
			this.debug(this, 'All listeners are removed!');
			return true;
		},
		removeHotkeyListeners: function(hotkeyCode) {
			var keys = this._parseKeys(hotkeyCode);
			for(var l in this.registredListener) {
				var listener = this.registredListener[l];
				if(this._matchKeys(keys, listener.keys)) {
					this.registredListener.splice(l, 1);
				}
			}
			this.debug(this, 'All listeners for "'+hotkeyCode+'" are removed!');
			return true;
		}
	},
	statics: {
		addListener: function(hotkeyCode, method, context) {
			return de.nysoft.CCTAM.util.Hotkeys.getInstance().addListener(hotkeyCode, method, context);
		},
		removeAllListeners: function() {
			return de.nysoft.CCTAM.util.Hotkeys.getInstance().removeAllListeners();
		},
		removeHotkeyListeners: function(hotkeyCode) {
			return de.nysoft.CCTAM.util.Hotkeys.getInstance().removeHotkeyListeners(hotkeyCode);
		}
	}
});

/* 
 * Against JavaScript Obfuscator (this is just a little "FUCK YOU!")
 * 
 * @ALL: Feel free to use this class in your scripts.
 * 
 * Version 1.0
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
qx.Class.define('de.nysoft.CCTAM.dev.obfuscate_scan', {
	extend : qx.core.Object,
	construct: function(object) {
		this.targetObject = object;
	},
	members: {
		targetObject:null,
		findMethodsByParameterCount: function(parameterCount) {
			var methods = [];
			for(var i in this.targetObject) {
				var item = this.targetObject[i];
				if(this.self(arguments).isFunction(item)) {
					var params = this.self(arguments).getMethodParams(item);
					if(params.length == parameterCount) {
						methods.push({
							id:i,
							item:item
						});
					}
				}
			}
			this.debug('findMethodsByParameterCount', this.self(arguments).getArrayKeys(methods));
			return methods;
		},
		findPropertiesByItemsAndMethodCount: function(itemsCount, methodsCount) {
			itemsCount = itemsCount || 0;
			methodsCount = methodsCount || 0;
			var props = [];
			for(var i in this.targetObject) {
				var item = this.targetObject[i];
				if(!this.self(arguments).isFunction(item)) {
					var counts = this.self(arguments).getCountsOfObject(item);
					if(counts.properties == itemsCount && counts.methods == methodsCount) {
						props.push({
							id:i,
							item:item
						});
					}
				}
			}
			this.debug('findPropertiesByItemsAndMethodCount', this.self(arguments).getArrayKeys(props));
			return props;
		},
		findPropertiesByContainingPropertyName: function(name) {
			var props = [];
			for(var i in this.targetObject) {
				var item = this.targetObject[i];
				if(this.self(arguments).getPropertyByNameInObject(item, name)) {
					props.push({
						id:i,
						item:item
					});
				}
			}
			this.debug('findPropertiesByContainingPropertyName', this.self(arguments).getArrayKeys(props));
			return props;
		},
		findMethodByResultTest: function(result, params) {
			var methods = [];
			for(var i in this.targetObject) {
				var item = this.targetObject[i];
				if(this.self(arguments).isFunction(item)) {
					try {
						if(item.apply(null, params) == result) {
							methods.push({
								id:i,
								item:item
							});
						}
					} catch(e) {}
				}
			}
			this.debug('findMethodByResultTest', this.self(arguments).getArrayKeys(methods));
			return methods;
		}
	},
	statics: {
		getArrayKeys: function(arr) {
			var keys = [];
			for(var i in arr) {
				keys.push(i);
			}
			return keys;
		},
		getPropertyByNameInObject: function(object, name) {
			for(var i in object) {
				if(i == name) {
					qx.log.Logger.debug(object[i], 'getPropertyByNameInObject -> name = '+name);
					return object[i];
				}
			}
			return null;
		},
		getCountsOfObject: function(object) {
			var counts = {
				methods: 0,
				properties: 0
			};
			for(var i in object) {
				if(de.nysoft.CCTAM.dev.structure_scan.isFunction(object[i])) {
					counts.methods++;
				} else {
					counts.properties++;
				}
			}
			qx.log.Logger.debug('getCountsOfObject', counts);
			return counts;
		},
		getMethodParams: function(func) {
			//Depending on: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
		    var funStr = func.toString();
		    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
		},
		isFunction: function(functionToCheck) {
			// Is the fastest depending on: http://jsperf.com/alternative-isfunction-implementations/4
			return typeof(functionToCheck) === 'function';
		},
		wrapAllMethodsWithLogging: function(object) {
			for(var i in object) {
				var item = object[i];
				if(de.nysoft.CCTAM.dev.obfuscate_scan.isFunction(item)) {
					eval('object._wrapped_'+i+' = object.'+i+';');
					object[i] = function() {
						console.log('Calling Method: '+i);
						console.log(arguments);
						eval('var result = object._wrapped_'+i+'.apply(object, arguments);');
						console.log('Method finished.');
						console.log(result);
						return result;
					};
				}
			}
		}
	}
});

/*
 * Desktop Control Widget
 * 
 * Version 1.0
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
qx.Class.define('de.nysoft.CCTAM.ext.desktop_control_widget.Main', {
	type : 'singleton',
	extend : qx.ui.container.Composite,
	construct : function() {
		this.debug('Creating loot_base_overlay...');
		this.base(arguments);
		// Create UI-Components
		this.setLayout(new qx.ui.layout.VBox());
		this.setTextColor('white');
		this.setPadding(7);
		this.setWidth(52);
		var background = new qx.ui.decoration.VBox();
		background.setBaseImage('webfrontend/ui/common/bgr_mission_tracker.png');
		this.setDecorator(background);

		this.self(arguments).addToDesktop(this, {right:0, bottom:250});
	},
	members: {
		topDecorator: null,
		createButton: function(icon, tooltip) {
			var btn = new qx.ui.form.Button(null, 'webfrontend/ui/'+icon);
			this.add(btn.set({
                toolTipText: tooltip,
                width: 50,
                height: 40,
                maxWidth: 50,
                maxHeight: 40,
                center: true
            }));
			return btn;
		},
	},
	statics:{
		createButton: function(icon, tooltip) {
			return de.nysoft.CCTAM.ext.desktop_control_widget.Main.getInstance().createButton(icon, tooltip);
		},
		addToDesktop: function(object, position) {
        	return qx.core.Init.getApplication().getDesktop().add(object, position);
        }
	}
});

//Translation
qx.locale.Manager.getInstance().addTranslation('de', {
	'Offline storage (local) not supported. You need a HTML5 Browser!': 'Lokaler Speicher nicht verfügbar. Du benötigst einen HTML 5 Browser!',
	'Here you can setup our C&C Tiberium Alliances - Management PlugIn.': 'Hier kannst du Einstellungen für das C&C Tiberium Alliances - Management PlugIn vornehmen. (Änderungen benötigen ein erneutes laden des Spiels)'
});

//Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
qx.Class.define("de.nysoft.CCTAM.ManagementOptionsPage", {
	type: 'singleton',
    extend: webfrontend.gui.options.OptionsPage,
    construct: function() {
        this.debug('Create ManagementOptionsPage');
        this.base(arguments);
        this.setLabel("Management Plugin");
        
        //Add Content
        var cnt = this.getContentContainer();
        var innerCnt = new qx.ui.container.Composite();
        innerCnt.setLayout(new qx.ui.layout.VBox());
        innerCnt.setTextColor('black');
        cnt.add(innerCnt);
        
        //Check html5 local storage available
        if (!de.nysoft.CCTAM.util.Store.hasLocalStorage()) {
            var lblError = new qx.ui.basic.Label(this.tr('Offline storage (local) not supported. You need a HTML5 Browser!'));
            innerCnt.add(lblError);
            this.debug('ManagementOptionsPage NOT created. No local storage available!');
            cnt.setEnabled(false);
            return;
        }
        
        var lblHead = new qx.ui.basic.Label(this.tr('Here you can setup our C&C Tiberium Alliances - Management PlugIn.'));
        innerCnt.add(lblHead);
        
        //Set Button events
        qx.event.Registration.getManager(this.getDefaultsButton()).deleteAllListeners();
        this.getDefaultsButton().addListener("execute", this.defaults, this);
        qx.event.Registration.getManager(this.getResetButton()).deleteAllListeners();
        this.getResetButton().addListener("execute", this.reset, this);
        qx.event.Registration.getManager(this.getSaveButton()).deleteAllListeners();
        this.getSaveButton().addListener("execute", this.save, this);
        
        this.debug('ManagementOptionsPage created.');
    },
    statics: {
        defaults: {},
        addDefault: function(key, value) {
        	de.nysoft.CCTAM.ManagementOptionsPage.defaults[key] = value;
        },
        store: new de.nysoft.CCTAM.util.Store("qx-cnc-management"),
        setOptions: function(jsonModel) {
            de.nysoft.CCTAM.ManagementOptionsPage.store.set(jsonModel);
        },
        getOptions: function() {
            //return defaults if local storage is not available
            if (!de.nysoft.CCTAM.util.Store.hasLocalStorage()) {
                return de.nysoft.CCTAM.ManagementOptionsPage.defaults;
            }
            //Create store with defaults if not exsists
            if (!de.nysoft.CCTAM.ManagementOptionsPage.store.get()) {
                de.nysoft.CCTAM.ManagementOptionsPage.setOptions(de.nysoft.CCTAM.ManagementOptionsPage.defaults);
            }
            //return store-content
            return de.nysoft.CCTAM.ManagementOptionsPage.store.get();
        },
        getOption: function(key) {
            return de.nysoft.CCTAM.ManagementOptionsPage.getOptions()[key];
        },
        setOption: function(key, value) {
            var data = de.nysoft.CCTAM.ManagementOptionsPage.getOptions();
            data[key] = value;
            de.nysoft.CCTAM.ManagementOptionsPage.setOptions(data);
        }
    },
    members: {
        fields: [],
        buttons: null,
        contentCnt: null,
        defaultsBtn: null,
        resetBtn: null,
        saveBtn: null,
        getButtons: function() {
            if(!this.buttons) {
                this.buttons = this.getChildren()[2].getChildren();
            }
            return this.buttons;
        },
        getContentContainer: function() {
            if(!this.contentCnt) {
                this.contentCnt = this.getChildren()[0].getChildren()[0];
            }
            return this.contentCnt;
        },
        getDefaultsButton: function() {
            if(!this.defaultsBtn) {
                this.defaultsBtn = this.getButtons()[0];
            }
            return this.defaultsBtn;
        },
        getResetButton: function() {
            if(!this.resetBtn) {
                this.resetBtn = this.getButtons()[2];
            }
            return this.resetBtn;
        },
        getSaveButton: function() {
            if(!this.saveBtn) {
                this.saveBtn = this.getButtons()[3];
            }
            return this.saveBtn;
        },
        addField: function(field, name) {
            this.fields[name] = field;
            this.fields[name].addListener("execute", this.activateUpdateSaveButtons, this);
            this.fields[name].addListener("changeValue", this.activateUpdateSaveButtons, this);
        },
        addComposite: function(composite) {
        	this.getContentContainer().add(composite);
        },
        save: function() {
            this.debug('save options');
            this.deactivateUpdateSaveButtons();
            var data = {};
            for(var key in this.fields) {
                var val = this.fields[key].getValue();
                data[key] = val;
                this.debug('Save option: '+key+' with value: '+val);
            }
            this.self(arguments).setOptions(data);
        },
        load: function() {
            this.deactivateUpdateSaveButtons();
            data = this.self(arguments).getOptions();
            for(var key in this.fields) {
                var value = (data[key]) ? (data[key]) : null;
                this.debug('set value "'+value+'" to field "'+key+'"');
                this.fields[key].setValue(value);
            }
        },
        reset: function() {
            this.load();
        },
        defaults: function() {
            this.debug('defaulting options');
            var data = this.self(arguments).defaults;
            this.self(arguments).setOptions(data);
            this.load();
        }
    }
});

/*
 * CCTAM Main
 * 
 * Version 1.1
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
//Translation
qx.locale.Manager.getInstance().addTranslation('de', {
	'Main PlugIn Settings': 'Globale PlugIn Einstellungen',
	'Debug Mode': 'Entwicklermodus'
});

//Extension
qx.Class.define("de.nysoft.CCTAM.Main", {
    type: "singleton",
    extend: qx.core.Object,
    construct: function() {
        this.debug('Create CCTAM...');
        this.base(arguments);
        
        //Modify OptionsWidget
        this._modifyOptionsWidget();
        
        //get debug-mode form options and set log-level
        if(de.nysoft.CCTAM.ManagementOptionsPage.getOption('debug')) {
        	this.debug('Setting LogLevel to debug.');
            qx.log.Logger.setLevel('debug');
        } else {
        	this.debug('Setting LogLevel to info.');
            qx.log.Logger.setLevel('info');
        }
        
        this._addExtensionOptions();
        
        this.debug('CCTAM created.');
    },
    statics: {
        getApplication: function() {
            return qx.core.Init.getApplication();
        },
        getVisMain: function() {
            return ClientLib.Vis.VisMain.GetInstance();
        },
        getMainData: function() {
            return ClientLib.Data.MainData.GetInstance();
        }
    },
    members: {
        optionsTabPage: null,
        _addOptionsTab: function(tabView) {
            if(!this.optionsTabPage) {
                //Create Tab
            	this.optionsTabPage = de.nysoft.CCTAM.ManagementOptionsPage.getInstance();
                //Add Tab
                tabView.add(this.optionsTabPage);
                //Load options
                this.optionsTabPage.load();
            }
        },
        _modifyOptionsWidget: function() {
            var self = this;
            webfrontend.gui.options.OptionsWidget.prototype._wrapped_show = webfrontend.gui.options.OptionsWidget.prototype.show;
            webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                //Get ClientArea of OptionsWidget
                var tabView = this.clientArea.getChildren()[0];
                
                //Add Options Tab
                self._addOptionsTab(tabView);
                
                //Show OptionsWidget
                this.debug('Trigger wrapped show()-Method');
                this._wrapped_show();
            };
        },
        _addExtensionOptions: function() {
        	var optionsPage = de.nysoft.CCTAM.ManagementOptionsPage.getInstance();
        	
        	var composite = new qx.ui.container.Composite();
        	composite.setLayout(new qx.ui.layout.VBox());
        	composite.setTextColor('black');
        	
        	var lblMainPlugin = new qx.ui.basic.Label(qx.locale.Manager.tr('Main PlugIn Settings'));
        	lblMainPlugin.setPaddingTop(10);
        	lblMainPlugin.setFont('bold');
        	composite.add(lblMainPlugin);

        	//Debug Mode
            var cbDebug = new qx.ui.form.CheckBox(qx.locale.Manager.tr('Debug Mode'));
            cbDebug.setPadding(10);
            composite.add(cbDebug);
            optionsPage.addField(cbDebug, 'debug');
            de.nysoft.CCTAM.ManagementOptionsPage.addDefault('debug', false);
            
            optionsPage.addComposite(composite);
        }
    }
});

var cctamInstance = de.nysoft.CCTAM.Main.getInstance();
qx.log.Logger.info('CCTAM loaded!');

//Translation
qx.locale.Manager.getInstance().addTranslation('de', {
	'Chat notification': 'Chat Benachrichtigung',
	'Chat notification enabled': 'Chat Benachrichtigung aktiviert',
	'Chat notify keywords': 'Chat Benachrichtigungs Schlüsselwörter',
	'Only one keyword per line!': 'Pro Zeile nur ein Schlüsselwort!'
});

//Extension Class
qx.Class.define('de.nysoft.CCTAM.ext.chat_notify.Main', {
	type : 'singleton',
	extend : qx.application.Standalone,
	construct : function() {
		if(de.nysoft.CCTAM.ManagementOptionsPage.getOption('chat_notify')) {
			var app = qx.core.Init.getApplication();
			this.chat = app.getChat();
			this.chatWidget = this.chat.getChatWidget();
			this.chatTabView = this.chatWidget.getChildren()[0];
		
			//set changeevents to all channels
			var channels = this.getChannels();
			for(var i in channels) {
				var channel = channels[i];
				var channelList = this.getListOfChannel(channel);
				channelList.addListener('changeValue', this._listenUpdateChannel, this);
			}
		
			//Load notify audio
			this.notifyAudio = this.getAudio('webfrontend/audio/combat/sfx_forgotten_pickup_att_shot_01.mp3');
			
			//Load Keywords from config
			this.keywords = de.nysoft.CCTAM.ManagementOptionsPage.getOption('chat_notify_keywords').split('\n');
		}
		
		this._addExtensionOptions();
	},
	members: {
		keywords:null,
		username: null,
		chat: null,
		chatWidget: null,
		chatTabView: null,
		notifyAudio: null,
		_send: function(msg) {
			this.chatWidget.send(msg);
		},
		getChatTabView: function() {
			return this.chatTabView;
		},
		getChannel: function(index) {
			return this.getChannels()[index];
		},
		getChannels: function() {
			return this.chatTabView.getChildren();
		},
		getCurrentChannel: function() {
			return this.chatTabView.getSelection()[0];
		},
		switchChannel: function(index) {
			//not finished and needed, yet
		},
		getInputOfChannel: function(channel) {
			return channel.getChildren()[1];
		},
		getListOfChannel: function(channel) {
			return channel.getChildren()[0].getChildren()[0].getChildren()[0];
		},
		getChannelMessages: function(channel) {
			return channel.messages;
		},
		getUsername: function() {
			if(!this.username) {
				this.username = ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
			}
			return this.username;
		},
		getLastChannelMessage: function(channel) {
			var length = channel.messages.length;
			return channel.messages[length-1];
		},
		_parseMessage: function(message) {
			var obj = qx.bom.Collection.html(message.message);
			return {
				message: obj[2].lastChild.textContent.substring(3),
				sender: obj[2].children[0].textContent
			};
		},
		getChannelFromList: function(list) {
			return list.$$parent.$$parent.$$parent.$$parent;
		},
		getAudio: function(path) {
			var realPath = qx.util.ResourceManager.getInstance().toUri(path);
			var audio = new Audio(realPath);
			audio.load();
			audio.volume = 1;
			audio.loop = false;
			return audio;
		},
		_listenUpdateChannel: function(e) {
			var channel = this.getChannelFromList(e.getTarget());
			var lastMessage = this.getLastChannelMessage(channel);
			lastMessage = this._parseMessage(lastMessage);
			if(lastMessage.sender != this.getUsername()) {
				if(this.messageHasKeyword(lastMessage.message)) {
					this.notifyAudio.play();
				}
			}
		},
		messageHasKeyword: function(message) {
			message = message.toLowerCase();
			for(var i in this.keywords) {
				if(message.indexOf(this.keywords[i].toLowerCase()) >= 0) {
					return true;
				}
			}
			return false;
		},
		_addExtensionOptions: function() {
        	var optionsPage = de.nysoft.CCTAM.ManagementOptionsPage.getInstance();
        	
        	var composite = new qx.ui.container.Composite();
        	composite.setLayout(new qx.ui.layout.VBox());
        	composite.setTextColor('black');
        	
        	var lblAutoRepair = new qx.ui.basic.Label(this.tr('Chat notification'));
        	lblAutoRepair.setPaddingTop(10);
        	lblAutoRepair.setFont('bold');
        	composite.add(lblAutoRepair);

        	//chat_notify
            var cbChatNotify = new qx.ui.form.CheckBox(this.tr('Chat notification enabled'));
            cbChatNotify.setPadding(10);
            composite.add(cbChatNotify);
            optionsPage.addField(cbChatNotify, 'chat_notify');
            de.nysoft.CCTAM.ManagementOptionsPage.addDefault('chat_notify', true);
            
            //default keywords
            var defaultKeywords = this.getUsername()+"\n@all\nhelp\nhilfe\nsos";
            
            //chat_notify keywords
            var lblChatNotifyKeywords = new qx.ui.basic.Label(this.tr('Chat notify keywords'));
            lblChatNotifyKeywords.setPaddingTop(10);
            lblChatNotifyKeywords.setFont('bold');
        	composite.add(lblChatNotifyKeywords);
            var taChatNotifyKeywords = new qx.ui.form.TextArea();
            composite.add(taChatNotifyKeywords);
            optionsPage.addField(taChatNotifyKeywords, 'chat_notify_keywords');
            de.nysoft.CCTAM.ManagementOptionsPage.addDefault('chat_notify_keywords', defaultKeywords);
            var lblChatNotifyKeywordsNote = new qx.ui.basic.Label(this.tr('Only one keyword per line!'));
            lblChatNotifyKeywordsNote.setPaddingTop(10);
            lblChatNotifyKeywordsNote.setTextColor('red');
        	composite.add(lblChatNotifyKeywordsNote);
            
            optionsPage.addComposite(composite);
        }
	}
});

//Wait for playerData fully loaded
(function wait4PlayerData() {
	var username = ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
	if(username != "") {
		var chat_notify = de.nysoft.CCTAM.ext.chat_notify.Main.getInstance();
		qx.log.Logger.info(chat_notify, 'chat_notify loaded!');
		return;
	}
	setTimeout(wait4PlayerData, 100);
})();

/*
 * Loot City Overlay
 * based on old userscript: http://userscripts.org/scripts/show/132151
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
//Translation
qx.locale.Manager.getInstance().addTranslation('de',{
	'Available resources': 'Plünderbare Rohstoffe'
});

//Extension Class
qx.Class.define('de.nysoft.CCTAM.ext.loot_base_overlay.Main', {
	type : 'singleton',
	extend : qx.ui.container.Composite,
	construct : function() {
		this.debug('Creating loot_base_overlay...');
		this.base(arguments);
		// Create UI-Components
		this.setLayout(new qx.ui.layout.Grid());
		this.setTextColor('white');

		this._tiberiumIconLabel = this.createIconLabel('icn_res_tiberium.png', 'N/A');
		this.add(this._tiberiumIconLabel, {
			row : 1,
			column : 0
		});

		this._crystalIconLabel = this.createIconLabel('icn_res_chrystal.png', 'N/A');
		this.add(this._crystalIconLabel, {
			row : 1,
			column : 1
		});

		this._creditsIconLabel = this.createIconLabel('icn_res_dollar.png', 'N/A');
		this.add(this._creditsIconLabel, {
			row : 1,
			column : 2
		});

		this._researchIconLabel = this.createIconLabel('icn_res_research_mission.png', 'N/A');
		this.add(this._researchIconLabel, {
			row : 1,
			column : 3
		});
		
		this._totalIconLabel = this.createIconLabel('icn_build_slots.png', 'N/A');
		this.add(this._totalIconLabel, {
			row : 1,
			column : 4
		});

		this._label = new qx.ui.basic.Label(this.tr('Available resources'));
		this._label.setFont('bold');
		this.add(this._label, {
			row : 0,
			column : 0,
			colSpan : 9
		});

		// Wrap onCitiesChange method
		var self = this;
		this._regionNPCCampStatusInfo.__wrapped_onCitiesChange = this._regionNPCCampStatusInfo.onCitiesChange;
		this._regionNPCCampStatusInfo.onCitiesChange = function() {
			self.updateLoot(this);
			return this.__wrapped_onCitiesChange();
		};
		this._regionNPCBaseStatusInfo.__wrapped_onCitiesChange = this._regionNPCBaseStatusInfo.onCitiesChange;
		this._regionNPCBaseStatusInfo.onCitiesChange = function() {
			self.updateLoot(this);
			return this.__wrapped_onCitiesChange();
		};

		this._regionCityStatusInfoEnemy.__wrapped_onCitiesChange = this._regionCityStatusInfoEnemy.onCitiesChange;
		this._regionCityStatusInfoEnemy.citiesChange = function() {
			self.updateLoot(this);
			return this.__wrapped_onCitiesChange();
		};

		this.debug('loot_base_overlay created!');
	},
	members : {
		_tiberiumIconLabel : null,
		_crystalIconLabel : null,
		_creditsIconLabel : null,
		_researchIconLabel : null,
		_totalIconLabel: null,
		_label : null,
		_city : null,
		_controlCount: 0,
		_regionNPCCampStatusInfo : webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance(),
		_regionNPCBaseStatusInfo : webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance(),
		_regionCityStatusInfoEnemy : webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance(),
		createIconLabel : function(imageUrl, label) {
			var icon = new qx.ui.basic.Atom(label, 'webfrontend/ui/common/' + imageUrl);
			return icon;
		},
		getBuildings: function(city) {
			var cityBuildings = city.FOI;
			if(!cityBuildings) {
				var cityScanner = new de.nysoft.CCTAM.dev.obfuscate_scan(city);
				cityBuildings = cityScanner.findPropertiesByItemsAndMethodCount(75, 0)[0].item;
			}
			if(cityBuildings) {
				var buildings = cityBuildings.ZEI;
				if(!buildings) {
					var cityBuildingsScanner = new de.nysoft.CCTAM.dev.obfuscate_scan(cityBuildings);
					buildings = cityBuildingsScanner.findPropertiesByContainingPropertyName('l')[0].item; 
				}
				return buildings;
			}
			return null;
		},
		getUnits : function(city) {
			var cityUnits = city.GOI;
			if(!cityUnits) {
				var cityScanner = new de.nysoft.CCTAM.dev.obfuscate_scan(city);
				cityUnits = cityScanner.findPropertyByItemsAndMethodCount(101, 0)[0].item;
			}
			if(cityUnits) {
				var units = cityUnits.QIG;
				if(!units) {
					var cityUnitsScanner = new de.nysoft.CCTAM.dev.obfuscate_scan(cityUnits);
					units = cityUnitsScanner.findPropertiesByContainingPropertyName('l')[1].item;
				}
			}
			return null;
		},
		getUnitLevelRequirements: function(unit) {
			var unitLevelRequirements = unit.KWG;
			if(!unitLevelRequirements) {
				var itemScanner = new de.nysoft.CCTAM.dev.obfuscate_scan(unit);
				unitLevelRequirements = itemScanner.findPropertiesByContainingPropertyName('rer')[0].item;
			}
			return unitLevelRequirements;
		},
		getHealthMultiplikator: function(item) {
			var health = item.get_Health();
			var damage = item.get_CurrentDamage();
			return health / (health + damage);
		},
		getLootFromCity : function(city) {
			try {
				// Buildings
				var buildings = this.getBuildings(city); 
				var buildingsLoot = this.getLoot(buildings);
				
				// Units
				var units = this.getUnits(city);
				var unitsLoot = this.getLoot(units);
				
				return {
					tiberium : buildingsLoot.tiberium	+ unitsLoot.tiberium,
					crystal : buildingsLoot.crystal		+ unitsLoot.crystal,
					credits : buildingsLoot.credits		+ unitsLoot.credits,
					research : buildingsLoot.research	+ unitsLoot.research
				};
			} catch(e) { this.debug(e); return {
				tiberium : 0,
				crystal : 0,
				credits : 0,
				research : 0
			}; }
		},
		getLoot : function(items) {
			var loot = {
				tiberium : 0,
				crystal : 0,
				credits : 0,
				research : 0
			}
			try {
				if (items && items.l && items.l.length > 0) {
					for (i in items.l) {
						var item = items.l[i];
						var unitLevelRequirements = this.getUnitLevelRequirements(item); 
						if (unitLevelRequirements && unitLevelRequirements.rer && unitLevelRequirements.rer.length > 0) {
							var multiplikator = this.getHealthMultiplikator(item);
							for (a in unitLevelRequirements.rer) {
								switch (unitLevelRequirements.rer[a].t) {
								case 1:
									loot.tiberium += multiplikator * unitLevelRequirements.rer[a].c;
									break;
								case 2:
									loot.crystal += multiplikator * unitLevelRequirements.rer[a].c;
									break;
								case 3:
									loot.credits += multiplikator * unitLevelRequirements.rer[a].c;
									break;
								case 6:
								case 7:
									loot.research += multiplikator * unitLevelRequirements.rer[a].c;
									break;
								}
							}
						}
					}
				}
			} catch(e) { this.debug(e); }
			return loot;
		},
		updateLoot : function(infoWindow) {
			var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(infoWindow._selectedObject.get_Id());
			if(city.m_Level == 0) {
				//city is not fully loaded. abort.
				this.resetLabels();
				infoWindow.add(this);
				return;
			}
			//Update loot only every seconds update-intervall to reduce cpu usage.
			if(this._city != city) {
				this._controlCount = 0;
				this._city = city;
			} else {
				this._controlCount++;
			}
			if(this._controlCount%2) {
				var loot = this.getLootFromCity(city);
				this.setLabels(loot);
				
				infoWindow.add(this);
			}
		},
		resetLabels: function() {
			this._tiberiumIconLabel.setLabel('?');
			this._crystalIconLabel.setLabel('?');
			this._creditsIconLabel.setLabel('?');
			this._researchIconLabel.setLabel('?');
			this._totalIconLabel.setLabel('?');
		},
		setLabels: function(loot) {
			this._tiberiumIconLabel.setLabel(this.formatNumber(loot.tiberium));
			this._crystalIconLabel.setLabel(this.formatNumber(loot.crystal));
			this._creditsIconLabel.setLabel(this.formatNumber(loot.credits));
			this._researchIconLabel.setLabel(this.formatNumber(loot.research));
			
			var sum = 0;
			for(i in loot) {
				sum += loot[i];
			}
			this._totalIconLabel.setLabel(this.formatNumber(sum));
		},
		formatNumber : function(number) {
			try {
				var normal = ClientLib.Base.Util.OT(number);
				if(!normal) {
					var uitlScan = new de.nysoft.CCTAM.dev.obfuscate_scan(ClientLib.Base.Util);
					var scanResult = uitlScan.findMethodByResultTest('482,6k', [482600]);
					if(scanResult.length > 0) {
						return scanResult[0].item(number);
					}
				}
				return normal;
			} catch(e) { this.debug(e); return 0; }
		}
	}
});

var loot_base_overlay = de.nysoft.CCTAM.ext.loot_base_overlay.Main.getInstance();
qx.log.Logger.info(loot_base_overlay, 'loot_base_overlay loaded!');

/*
 * Auto_Repair
 * 
 * Version 1.1
 * 
 * Author: Manuel Richarz - manuel.richarz@nysoft.de
 */
//Translation
qx.locale.Manager.getInstance().addTranslation('de', {
	'Auto repair': 'Automatische Reparatur (auto repair)',
	'Automated repair enabled': 'Automatische reparatur aktiviert',
	'Show "Repair all" Button': 'Zeige "Alles reparieren" Schaltfläche',
	'Repair all': 'Alles reparieren'
});

//Extension
qx.Class.define('de.nysoft.CCTAM.ext.auto_repair.Main', {
	type : 'singleton',
	extend : qx.application.Standalone,
	construct : function() {
		if(de.nysoft.CCTAM.ManagementOptionsPage.getOption('auto_repair')) {
			this.startSchedulerTask();
			this.debug('AutoRepair: ON');
		}
		if(de.nysoft.CCTAM.ManagementOptionsPage.getOption('repair_all_btn')) {
			var faction = ClientLib.Base.Util.GetFactionGuiPatchText();
			this.repairAllBtn = de.nysoft.CCTAM.ext.desktop_control_widget.Main.createButton(faction+'/icons/icon_repair_all_button.png', this.tr('Repair all'));
			this.repairAllBtn.addListener('execute', this.repairAll, this);
			this.debug('RepairAllBtn: ON');
		}
		this._addExtensionOptions();
	},
	destructor: function() {
		this.stopSchedulerTask();
	},
	members: {
		repairAllBtn: null,
		taskId: null,
		taskInterval: 50,
		repairAll: function() {
			this.debug('Repair all');
			this.debug('Current Mode: '+ClientLib.Vis.VisMain.GetInstance().get_Mode());
			var cities = this.getAllCities();
			for(var i in cities) {
				var city = cities[i];
				this.debug('Repair all in City: '+i);
				this.repairBuildings(city);
				this.repairArmyUnits(city);
				this.repairDefenseUnits(city);
			}
		},
		startSchedulerTask: function() {
			this.debug('Start Scheduler-Task of auto_repair');
			this.taskId = de.nysoft.CCTAM.util.Scheduler.addTask(function() {
				this.repairAll();
			}, this, this.taskInterval, 0);
		},
		stopSchedulerTask: function() {
			if(this.taskId) {
				this.debug('Stop Scheduler-Task of auto_repair');
				de.nysoft.CCTAM.util.Scheduler.removeTaskById(this.taskId);
			}
		},
		getAllCities: function() {
			return de.nysoft.CCTAM.Main.getMainData().get_Cities().get_AllCities().d;
		},
		getBuildingSetup: function() {
			return ClientLib.Vis.Mode.City;
		},
		getArmySetup: function() {
			return ClientLib.Vis.Mode.ArmySetup;
		},
		getDefenseSetup: function() {
			return ClientLib.Vis.Mode.DefenseSetup;
		},
		repairBuildings: function(city) {
			this.debug('Repair Buildings.');
			this.repairAllSetupItems(city, this.getBuildingSetup());
		},
		repairArmyUnits: function(city) {
			this.debug('Repair ArmyUnits.');
			this.repairAllSetupItems(city, this.getArmySetup());
		},
		repairDefenseUnits: function(city) {
			this.debug('Repair DefenseUntis.');
			this.repairAllSetupItems(city, this.getDefenseSetup());
		},
		repairAllSetupItems: function(city, setupMode) {
			if(this.isRepairable(city, setupMode)) {
				this.debug('Repairing...');
				this._repairAllSetupItems(city, setupMode)
			}
		},
		_repairAllSetupItems: function(city, setupMode) {
			var curMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
            ClientLib.Vis.VisMain.GetInstance().set_Mode(setupMode);
            city.RepairAll();
            ClientLib.Vis.VisMain.GetInstance().set_Mode(curMode);
		},
		isRepairable: function(city, setupMode) {
			var curMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
            ClientLib.Vis.VisMain.GetInstance().set_Mode(setupMode);
            var result = city.CanRepairAll();
            ClientLib.Vis.VisMain.GetInstance().set_Mode(curMode);
            return result;
		},
		_addExtensionOptions: function() {
        	var optionsPage = de.nysoft.CCTAM.ManagementOptionsPage.getInstance();
        	
        	var composite = new qx.ui.container.Composite();
        	composite.setLayout(new qx.ui.layout.VBox());
        	composite.setTextColor('black');
        	
        	var lblAutoRepair = new qx.ui.basic.Label(this.tr('Auto repair'));
        	lblAutoRepair.setPaddingTop(10);
        	lblAutoRepair.setFont('bold');
        	composite.add(lblAutoRepair);

        	//Auto_repair
            var cbAutoRepair = new qx.ui.form.CheckBox(this.tr('Automated repair enabled'));
            cbAutoRepair.setPadding(10);
            composite.add(cbAutoRepair);
            optionsPage.addField(cbAutoRepair, 'auto_repair');
            de.nysoft.CCTAM.ManagementOptionsPage.addDefault('auto_repair', true);
            
            //Repair_All button
            var cbRepairAllBtn = new qx.ui.form.CheckBox(this.tr('Show "Repair all" Button'));
            cbRepairAllBtn.setPadding(10);
            composite.add(cbRepairAllBtn);
            optionsPage.addField(cbRepairAllBtn, 'repair_all_btn');
            de.nysoft.CCTAM.ManagementOptionsPage.addDefault('repair_all_btn', true);
            
            optionsPage.addComposite(composite);
        }
	}
});

var auto_repair = de.nysoft.CCTAM.ext.auto_repair.Main.getInstance();
qx.log.Logger.info(auto_repair, 'auto_repair loaded!');
            
        };
        
        (function CCTAM_wait4readystate() {
            try {
                if(qx) {
                    app = qx.core.Init.getApplication();
                    if(app && app.initDone) {
                        init(); return;
                    }
                }
            } catch(e) {}
            setTimeout(CCTAM_wait4readystate, 1000);
        })();
    };
    
    var CCTAMTag = document.createElement("script");CCTAMTag.innerHTML = "(" + CCTAM.toString() + ")();";CCTAMTag.type = "text/javascript";
    try { document.getElementsByTagName("head")[0].appendChild(CCTAMTag); } catch(e) {};
    
})();