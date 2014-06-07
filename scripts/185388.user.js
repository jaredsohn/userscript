// ==UserScript==
// @name DOM
// @description working with dom
// ==/UserScript==
(function() {
    if (!window.$DOM) window.$DOM = function(selector) {
        var DOM_SELECTORS = [
            {
                description: 'id',
                regexp: /^#[a-z\d_-]+$/i,
                prepareSelector: function(sel) {
                    return sel.substr(1);
                },
                gather: function(sel, arr) {
                    var receivedHTMLElement = document.getElementById(sel);
                    if (receivedHTMLElement && arr.indexOf(receivedHTMLElement) == -1) {
                        arr.push(receivedHTMLElement);
                    }
                },
                is: function(element, sel) {
                    return element && ('#' + element.id === sel);
                }
            },
            {
                description: 'class',
                regexp: /^\.[a-z\d_-]+$/i,
                prepareSelector: function(sel) {
                    return sel.substr(1);
                },
                gather: function(sel, arr) {
                    var receivedHTMLColection = document.getElementsByClassName(sel);
                    for (var i = 0; i < receivedHTMLColection.length; i++) {
                        if (arr.indexOf(receivedHTMLColection[i]) == -1) {
                            arr.push(receivedHTMLColection[i]);
                        }
                    }
                },
                is: function(element, sel) {
                    return _hasClass(element, this.prepareSelector(sel));
                }
            },
            {
                description: 'tag',
                regexp: /^[a-z\d_-]+$/i,
                prepareSelector: function(sel) {
                    return sel;
                },
                gather: function(sel, arr) {
                    var receivedHTMLColection = document.getElementsByTagName(sel);
                    for (var i = 0; i < receivedHTMLColection.length; i++) {
                        if (arr.indexOf(receivedHTMLColection[i]) == -1) {
                            arr.push(receivedHTMLColection[i]);
                        }
                    }
                },
                is: function(element, sel) {
                    return element && element.tagName.toLowerCase() === sel.toLowerCase();
                }
            },
            {
                description: 'attr',
                regexp: /^\[([a-z\d_-]+)(=[a-z\d_-]*)?\]$/i,

                // returns { attr: ..., value: ... }
                prepareSelector: function(sel) {
                    var all, ret = {};
                    all = this.regexp.exec(sel);
                    if (all[1]) ret.attr = all[1];
                    if (all[2]) ret.value = all[2].substr(1);
                    return ret;
                },

                // @param sel { attr: ..., value: ... }
                gather: function(sel, arr) {
                    var receivedHTMLColection = document.getElementsByTagName("*"),
                        attribs;
                    for (var i = 0; i < receivedHTMLColection.length; i++) {
                        attribs = receivedHTMLColection[i].attributes;
                        if (sel.attr && attribs && attribs[sel.attr]) {
                            if (!sel.hasOwnProperty('value') || sel.value == attribs[sel.attr].value ) {
                                if (arr.indexOf(receivedHTMLColection[i]) == -1) {
                                    arr.push(receivedHTMLColection[i]);
                                }
                            }
                        }
                    }
                },
                is: function(element, sel) {
                    var AV = this.prepareSelector(sel);
                    if (AV && AV.attr) {
                        if (!AV.hasOwnProperty('value')) {
                            return !!element.getAttribute(AV.attr);
                        } else {
                            return element.getAttribute(AV.attr) && element.getAttribute(AV.attr) == AV.value;
                        }
                    } else {
                        return false;
                    }
                }
            }
        ],

        _hasClass = function(element, _class) {
            if (element && element.className && _class) {
                var classPattern = new RegExp('(\\s|^)' + _class + '(\\s|$)');
                return classPattern.test(element.className);
            } else {
                return false;
            }
        },

        _addClass = function(element, _class) {
            if (element && _class) {
                if (!_hasClass(element, _class)) {
                    if (element.className) {
                        element.className += ' ';
                    }
                    element.className += _class;
                }
            }
        },

        _removeClass = function(element, _class) {
            if (_hasClass(element, _class)) {
                var classPattern = new RegExp('(\\s|^)' + _class + '(\\s|$)');
                element.className = element.className
                    .replace(classPattern, ' ')
                    .replace(/^\s+|\s+$/g, '');
            }
        },

        _toggleClass = function(element, _class) {
            if(element && _class) {
                if (_hasClass(element, _class)) {
                    _removeClass(element, _class);
                } else {
                    _addClass(element, _class);
                }
            }
        },

        _is = function(element, sel) {
            sel = sel || '';
            if (element) {
                if (!sel) {
                    return true;
                } else {
                    for (var i = 0; i < DOM_SELECTORS.length; i++) {
                        if (DOM_SELECTORS[i].regexp.test(sel)) {
                            return DOM_SELECTORS[i].is(element, sel);
                        }
                    }
                    return false;
                }
            } else {
                return false;
            }
        },

        _parent = function(element, sel) {
            do {
                element = element && element.parentElement;
            } while ( element && !_is(element, sel));
            return element;
        },

        $Array = [];

        //for IE8
        if (!$Array.indexOf) {
            $Array.indexOf = function(item) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === item) {
                        return i;
                    }
                };
                return -1;
            }
        }

        //for IE8
        if (!$Array.forEach) {
            $Array.forEach = function(handler) {
                if (typeof handler !== 'function') {
                    return;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        handler(this[i]);
                    };
                }
            }
        }

        if (typeof selector === 'string') {
            selector = selector.replace(/\s/g, '');
            for (var i = 0; i < DOM_SELECTORS.length; i++) {
                if (DOM_SELECTORS[i].regexp.test(selector)) {
                    DOM_SELECTORS[i].gather(
                        DOM_SELECTORS[i].prepareSelector(selector),
                        $Array
                    );
                }
            }            
        } else if (selector && selector.tagName && selector.style) {
            $Array.push(selector);
        }

        $Array.hasClass = function(_class) {
            if ($Array.length > 0) {
                return _hasClass(this[0], _class);
            } else {
                return false;
            }
        };
        $Array.addClass = function(_class) {
            this.forEach(function(entire) {
                _addClass(entire, _class);
            });
            return this;
        };
        $Array.removeClass = function(_class) {
            this.forEach(function(entire){
                _removeClass(entire, _class);
            });
            return this;
        };
        $Array.toggleClass = function(_class) {
            this.forEach(function(entire){
                _toggleClass(entire, _class);
            });
            return this;
        };
        $Array.is = function(selector) {
            if ($Array.length > 0) {
                return _is(this[0], selector);
            } else {
                return false;
            }
        };
        /* TODO! */
        $Array.parent = function(selector) {
            if ($Array.length > 0) {
                var P;
                for (var i = 0; i < this.length; i++) {
                    P = _parent(this[i], selector);
                    if ( P && this.slice(0, i-1).indexOf(P) == -1 ) {
                        this[i] = P;
                    } else {
                        this.splice(i, 1);
                        i--;
                    }
                };
            }
            return this;
        };

        return $Array;
    }
})();