// ==UserScript==
// @name          Gmail Quota Graph 2
// @namespace     http://podmap.net/gmail-quota-graph
// @description   Shows graph of used disk size and available disk size on your Gmail account. Works with both versions of Gmail.
// @include       http://mail.google.tld/*
// @include       https://mail.google.tld/*
// ==/UserScript==

// Originally written by Shinya Kasatani, http://userscripts.org/scripts/show/13173

function Graph(firstDate, style, serializedValues) {
    this.firstDate = firstDate;
    this.style = style;
    this.values = [];
    if (serializedValues) {
        var sValues = serializedValues.split(/,/);
        var lastValue = 0;
        for (var i = 0; i < sValues.length; i++) {
            if (sValues[i] == '-') {
                this.values.push(null);
            } else {
                var value = parseInt(sValues[i]);
                this.values.push(lastValue + value);
                lastValue += value;
            }
        }
    }
}

Graph.prototype = {
    getIndexFromDate: function(date) {
        var index = date.daysFrom(this.firstDate);
        if (index < 0) {
            index = 0;
        } else if (index >= this.values.length) {
            index = this.values.length - 1;
        } else {
            while (this.values[index] == null && index < this.values.length - 1) {
                index++;
            }
        }
        return index;
    },

    getValue: function(date, dateReceiver) {
        var index = this.getIndexFromDate(date);
        var value = this.values[index];
        if (dateReceiver) {
            dateReceiver(this.firstDate.addDate(index), value);
        }
        return value;
    },

    setValue: function(date, value) {
        var index = date.daysFrom(this.firstDate);
        if (index >= 0) {
            this.values[index] = value;
        }
    },

    drawable: function() {
        if (this.values.length > 1) {
            return this;
        } else {
            var values = this.values[0] + ",0";
            var graph = new Graph(this.firstDate.addDate(-1), this.style, values);
            graph.getIndexFromDate = function(date) { return 1; }
            return graph;
        }
    },

    serializeValues: function() {
        var ser = new Array(this.values.length);
        var lastValue = 0;
        for (var i = 0; i < ser.length; i++) {
            if (this.values[i] != null) {
                ser[i] = this.values[i] - lastValue;
                lastValue = this.values[i];
            } else {
                ser[i] = '-';
            }
        }
        return ser.join(",");
    },

    max: function() {
        var max = 1;
        for (var i = 0; i < this.values.length; i++) {
            if (this.values[i] != null) {
                max = Math.max(max, this.values[i]);
            }
        }
        return max;
    }
}

function SimpleDate(time) {
    this.time = time;
}

SimpleDate.parse = function(text) {
    return new SimpleDate(Date.parse(text));
}

SimpleDate.today = function() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return new SimpleDate(today.getTime());
}

SimpleDate.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

SimpleDate.prototype = {
    tostring: function() {
        var date = new Date(this.time);
        var format2 = function(n) {
            return n >= 10 ? ("" + n) : ("0" + n);
        };
        return date.getFullYear() + "/" + format2(date.getMonth() + 1) + "/" + format2(date.getDate());
    },

    displayDate: function() {
        var date = new Date(this.time);
        return SimpleDate.MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        // return (new Date(this.time)).toLocaleFormat("%b %e, %Y"); // toLocaleFormat is buggy in Windows
    },
    
    daysFrom: function(date) {
        return (this.time - date.time) / 86400000;
    },

    addDate: function(i) {
        return new SimpleDate(this.time + 86400000 * i);
    }
}

function Account(name) {
    this.prefix = name + "/";
}

Account.prototype = {
    getValue: function(key, defaultValue) {
        var val = GM_getValue(this.prefix + key);
        return val || defaultValue;
    },

    setValue: function(key, value) {
        GM_setValue(this.prefix + key, value);
    }
}

function Label(parent, style) {
    this.element = document.createElement("div");
    this.element.style.fontSize = "11px";
    this.element.style.textAlign = "right";
    this.element.style.zIndex = 200;
    this.element.style.width = style.width;
    for (var name in style) {
        this.element.style[name] = style[name];
    }
    parent.appendChild(this.element);
}

Label.prototype = {
    set: function(text) {
        this.element.innerHTML = text;
    }
}

function View(parent, scraper) {
    this.parent = parent;
    this.scraper = scraper;
    
    var canvasWidth = parent.clientWidth - 5;
    this.container = document.createElement("div");
    this.container.style.position = "relative";
    this.container.style.width = "95%";
    this.container.style.height = "112px";
    this.messageLabel = new Label(this.container, {width: (canvasWidth - 4) + "px"});
    this.dateLabel = new Label(this.container, {position: "absolute",
                                                left: 0,
                                                bottom: "2px",
                                                height: "16px",
                                                width: (canvasWidth - 4) + "px"});
    this.canvas = new GraphCanvas(canvasWidth, 100);
    
    var self = this;
    self.update();
    setInterval(function() {
            self.update();
        }, 1000 * 60 * 60 * 3);
    this.container.appendChild(this.canvas.root);    
    parent.appendChild(this.container);
}

View.prototype = {
    update: function() {
        var quota = this.scraper.quota;
        var accountName = this.scraper.account;
        if (quota && accountName) {
            var account = new Account(accountName);
            if (quota.search(/(\d+)\s*(MB|Mo).*?(\d+)\s*(MB|Mo)/) >= 0) {
                var used = parseInt(RegExp.$1);
                var total = parseInt(RegExp.$3);
                if (used > total) {
                    var tmp = used;
                    used = total;
                    total = tmp;
                }                
                var today = SimpleDate.today();
                var accountsd = account.getValue("startDate", today.tostring());
                var startDate = SimpleDate.parse(accountsd);
                var usedGraph = new Graph(startDate, "#00a", account.getValue("usedGraph", ""));
                var totalGraph = new Graph(startDate, "#f00", account.getValue("totalGraph", ""));
                //this.setMessage(used + " (" + Math.round(used / total * 100) + "%) / " + total + "");
                usedGraph.setValue(today, used);
                totalGraph.setValue(today, total);
                account.setValue("startDate", startDate.tostring());
                account.setValue("usedGraph", usedGraph.serializeValues());
                account.setValue("totalGraph", totalGraph.serializeValues());
                this.showStatusAt(today, usedGraph, totalGraph);
                var self = this;
                this.canvas.draw([usedGraph, totalGraph], function(selectedDate) {
                        var adjustedDate;
                        if (selectedDate) {
                            usedGraph.getValue(selectedDate, function(d) {
                                    adjustedDate = d;
                                });
                            self.dateLabel.set(adjustedDate.displayDate());
                        } else {
                            adjustedDate = today;
                            self.dateLabel.set("");
                        }
                        self.showStatusAt(adjustedDate, usedGraph, totalGraph);
                    });
                //new Date(), [usedGraph, totalGraph], canvasWidth, 80);
                return;
            }
        }
        var errors = [];
        if (!accountName) errors.push("account name");
        if (!quota) errors.push("disk quota");
        this.messageLabel.set("Failed to parse " + errors.join(" and ") + "!");
    },

    showStatusAt: function(date, usedGraph, totalGraph) {
        var used = usedGraph.getValue(date);
        var total = totalGraph.getValue(date);
        this.messageLabel.set(//adjustedDate.displayDate() + "<br />" +
          used + " (" + Math.floor(used / total * 100) + "%) / " + total + "");
    }
}

function GraphCanvas(width, height) {
    this.root = document.createElement("div");
    this.root.style.position = "absolute";
    this.root.style.width = width + "px";
    this.root.style.height = height + "px";
    this.root.style.bottom = "0";
    this.background = document.createElement("canvas");
    this.background.style.position = "absolute";
    this.background.style.zIndex = 100;
    this.background.setAttribute("width", width);
    this.background.setAttribute("height", height);
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = 110;
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
    this.overlay = document.createElement("canvas");
    this.overlay.style.position = "absolute";
    this.overlay.style.zIndex = 210;
    this.overlay.setAttribute("width", width);
    this.overlay.setAttribute("height", height);
    this.root.appendChild(this.background);
    this.root.appendChild(this.canvas);
    this.root.appendChild(this.overlay);
    this.width = width;
    this.height = height;
    this.labels = [];
    this.top = 2.5;
    this.left = 2.5;
    this.bottom = this.height - 5.5;
    this.right = this.width - 4.5;
    this.graphHeight = this.bottom - this.top;
    this.graphWidth = this.right - this.left;

    var self = this;
    this.overlay.addEventListener("mousemove", function(event) {
            var x = 0, element = self.root;
            do { x += element.offsetLeft || 0; element = element.offsetParent; } while (element);
            self.select(event.clientX - x);
        }, true);
    this.overlay.addEventListener("mouseout", function(event) {
            self.unselect();
        }, true);
}

GraphCanvas.prototype = {
    unselect: function() {
        var ctx = this.overlay.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        this.selectionUpdater(null);
    },

    select: function(x) {
        var ctx = this.overlay.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        if (this.graphs && this.selectionUpdater) {
            var firstDate = this.graphs[0].firstDate;
            var len = this.graphs[0].values.length;
            var self = this;
            for (var g = 0; g < this.graphs.length; g++) {
                var graph = this.graphs[g];
                graph.getValue(firstDate.addDate(Math.round((x - this.left) / this.graphWidth * (len - 1))), function(date, value) {
                        var index = date.daysFrom(graph.firstDate);
                        var x = self.getX(index);
                        var y = self.getY(value);
                        ctx.strokeStyle = graph.style;
                        ctx.fillStyle = graph.style;
                        ctx.beginPath();
                        ctx.arc(x, y, 2, 0, Math.PI * 2, false);
                        ctx.stroke();
                        ctx.fill();
                        self.selectionUpdater(date);
                    });
            }
        }
    },

    draw: function(graphs, selectionUpdater) {
        this.graphs = [];
        for (var g = 0; g < graphs.length; g++) {
            this.graphs.push(graphs[g].drawable());
        }
        this.selectionUpdater = selectionUpdater;
        for (var i = 0; i < this.labels.length; i++) {
            this.root.removeChild(this.labels[i]);
        }
        this.labels = [];
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        var bctx = this.background.getContext("2d");
        bctx.clearRect(0, 0, this.width, this.height);

        var top = this.top;
        var left = this.left;
        var bottom = this.bottom;
        var right = this.right;
        var graphHeight = this.graphHeight;
        var graphWidth = this.graphWidth;

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, bottom);
        ctx.lineTo(right, bottom);
        ctx.stroke();
        var grad = ctx.createLinearGradient(0, 0, 0, graphHeight);
        grad.addColorStop(0.0, "#ffffff");
        grad.addColorStop(1.0, "#e0e0e0");
        bctx.fillStyle = grad;
        bctx.fillRect(left, top, graphWidth, graphHeight);
        
        this.max = Math.max(this.graphs[0].max(), this.graphs[1].max());
        this.dataSize = this.graphs[0].values.length;
        
        this.maxgb = Math.floor(this.max / 1024) + 2;
        var step = Math.round(this.maxgb / 4);

        for (var i = step; i <= this.maxgb; i += step) {
            var y = bottom - (i * graphHeight / this.maxgb);
            ctx.beginPath();
            ctx.moveTo(left, y);
            var color = Math.floor(180 + i * 50 / this.maxgb);
            ctx.strokeStyle = "rgba("+color+","+color+","+color+",1)";
            //ctx.strokeStyle = "rgba(0.8,0.8,0.8,1)";
            ctx.lineTo(right, y);
            ctx.stroke();
            var text = document.createElement("div");
            text.innerHTML = i + "GB";
            text.style.position = "absolute";
            text.style.left = left + 2 + "px";
            text.style.top = y + 1 + "px";
            text.style.fontSize = "9px";
            text.style.color = "#999999";
            text.style.zIndex = 105;
            this.labels.push(text);
            this.root.appendChild(text);
        }
        
        for (var g = 0; g < this.graphs.length; g++) {
            ctx.lineWidth = 2;
            var graph = this.graphs[g];
            var data = graph.values;
            ctx.beginPath();
            ctx.strokeStyle = graph.style;
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                if (i == 0) {
                    ctx.moveTo(this.getX(i), this.getY(value));
                } else {
                    if (value != null) {
                        ctx.lineTo(this.getX(i), this.getY(value));
                    }
                }
            }
            ctx.stroke();
        }
    },

    getX: function(index) {
        return this.left + index * this.graphWidth / (this.dataSize - 1);
    },

    getY: function(value) {
        return this.bottom - (value * this.graphHeight / (this.maxgb * 1024));
    }
}

window.addEventListener("load", function() {
        if (unsafeWindow.gmonkey) {
            var gmonkey = unsafeWindow.gmonkey;
            gmonkey.load("1.0", function(gmail) {
                    var win = window.top.document.getElementById('canvas_frame').contentWindow;
                    var module = gmail.addNavModule('Quota', '');
                    var acc = win.document.evaluate('//div[@id="gbar"]/following-sibling::div//b/text()', win.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    var scraper = {
                        quota: '',
                        account: acc.snapshotItem(0).nodeValue
                    };
                    var content = module.getContentElement();
                    var timer = window.setInterval(function() {
                      var foot = gmail.getFooterElement();
                      if (foot) {
                        var foothtml = foot.innerHTML;
                        window.clearInterval(timer);
                        var spot = foothtml.indexOf('You are currently');
                        scraper.quota = foothtml.slice(spot, spot+52);
                        return new View(content, scraper);
                      }
                    }, 250);
                });
        }
        else {
          var nav = document.getElementById("nav");
        if (nav) {
            new View(nav, {
                    quota: function() {
                        var fqList = document.evaluate("//div[@class='fq']",
                                                       document,
                                                       null,
                                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                                       null);
                        if (fqList.snapshotLength > 0) {
                            var fq = fqList.snapshotItem(0);
                            return fq.innerHTML;
                        } else {
                            return null;
                        }
                    },
                        
                    account: function() {
                        var guser = document.getElementById("guser");
                        if (guser) {
                            // English version
                            return guser.firstChild.firstChild.innerHTML;
                        } else {
                            // Japanese version???
                            var list = document.evaluate("//td[@class='trb']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                            if (list.snapshotLength > 0) {
                                return list.snapshotItem(0).firstChild.innerHTML;
                            } else {
                                return null;
                            }
                        }
                    }
                    
            });
        }
      }
    }, true);