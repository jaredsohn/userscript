// ==UserScript==
// @name            more relation
// @require         http://mesak-project.googlecode.com/files/jquery.142.gm.js
// @require         http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @description     auto mine more relations
// @source          http://userscripts.org/scripts/show/85439
// @identifier      http://userscripts.org/scripts/source/85439.user.js
// @version         0.1
// @date            2010-08-03
// @author          zoopigzoo
// @namespace       http://www.zoopigzoo.com
// @include         http://entitycube.research.microsoft.com/result.aspx?*
// ==/UserScript==

Array.prototype.remove = function(dx) {
    if (isNaN(dx) || dx >= this.length || dx < 0) {
        return false;
    }

    for (var i = dx; i < this.length - 1; i++) {
        this[i] = this[i + 1];
    }

    this.length -= 1
};

(function($) {
    // extend fn(prototype) with plugin
    $.fn.morerel = function(o) {
        return this.each(function() {
            new $mr(this, o);
        });
    };

    // Default configuration properties.
    // Available public
    $.fn.morerel.defaults = {
        queryEntityID: "#QueryBox",
        relatedEntityID: "div[id^='enItem']",
        ajaxPageURL: "http://msra-wdm-5:8617/morerel.aspx?",
        searchStatusID: "OnlineSearch",
        serachStatusAfterID: "EntityList_ListTitle",
        showDelay: 300
    };

    $.ExtractionQuery = function(cp, rps, lastupdate) {
        var _cp = cp;
        var _rps = rps;
        var _lastupdate = lastupdate;

        return {
            toHTMLString: function() {
                var s = "";
                s += "c=" + encodeURI(_cp) + "&r=" + encodeURI($mr.implode(_rps, ",")) + "&l=" + _lastupdate;

                return s;
            }
        };
    };
    
    $.confRelation = function(relation, conf) {
        var _rel = relation;
        var _conf = conf;
        
        return {
            getRel: function() {
               return _rel;
            },
            getConf: function() {
                return _conf;
            },
            setRel: function(v) {
                _rel = v;
            },
            setConf: function(v) {
                _conf = v;
            }
        };
    };
    
    $.relOperation = function(from,to,str) {
        var _n = name;
        var _f = from;
        var _t = to;
        var _s = str;
        
        return {
            getFrom: function() {
                return _f;
            },
            getTo: function() {
                return _t;
            },
            getStr: function() {
                return _s;
            },
            getName: function() {
                return _n;
            },
            setName: function(v) {
                _n = v;
            }
        };
    }; 

    $.relEntity = function(name,htmlId) {
        var _name = name;
        var _rel = Array();
        var _htmlId = htmlId;

        return {
            getName: function() {
                return _name;
            },
            getId: function() {
                return _htmlId;
            },
            getRel: function() {
                return _rel;
            },
            setName: function(nm) {
                _name = nm;
            },
            insertTo: function(confr,idx) {
                var old_idx = this.find(confr);
                
                //identical
                if(old_idx != -1 && idx == old_idx
                    && confr.getConf() == _rel[old_idx].getConf())
                    return null;
                    
                if(old_idx != -1) {
                    //an old one
                    _rel.remove(old_idx);
                }
                
                var newArr = Array();
                for(var i=0;i<idx;i++) {
                    newArr[i] = _rel[i];
                }
                newArr[idx] = confr;
                for(var i=idx;i<_rel.length;i++){
                    newArr[i+1] = _rel[i];
                }
                
                _rel = newArr;
                
                return new $.relOperation(old_idx,idx,confr.getRel());
            },
            insertRel: function(rel,conf) {
                var confr = new $.confRelation(rel,conf);
                var idx = this.find(confr);
                if(idx == -1) {
                    _rel.push(confr);
                }  else {
                    _rel[idx].setConf(conf);
                }
            },
            find: function(confr) {
                for(var i=0;i<_rel.length;i++){
                    if(_rel[i].getRel() == confr.getRel()){
                        return i;
                    }
                }
                return -1;
            },
            toString: function() {
                return _name + "," + _rel;
            }
        };
    };
    
    $.morerel = function(e, o) {
        this.options = $.extend({}, $.fn.morerel.defaults, o || {});

        if (!$(this.options.queryEntityID))
            return;

        $.morerel.queryEntity = "!";
        this.queryEntity = $(this.options.queryEntityID).val();

        this.relatedEntities = Array();
        var relEntities = $(this.options.relatedEntityID);
        if (relEntities == null
            || relEntities.length == 0)
            return;

        var relcount = relEntities.length;
        for (var i = 0; i < relcount; i++) {
            var thisId = $(relEntities[i]).attr("id");
            var stringRealId = thisId.substr(7);
            if (stringRealId == "")
                continue;

            if (stringRealId.length == 1)
                stringRealId = "0" + stringRealId;

            var name = $("#EntityList_ctl" + stringRealId + "_name").text();
            name = $mr.trim(name);
            name = name.toLowerCase();

            var relationship = $("#EntityList_ctl" + stringRealId + "_relation").text().trim();
            relationship = $mr.trim(relationship);
            
            $("#" + thisId + ">.relationship").html("");

            var entity = new $.relEntity(name, thisId);
            this.relatedEntities.push(entity);
        }

        this.lastUpdate = -1;
        this.operation = Array();
        
        this.makeAQuery(this.jsonReceived);
    };

    var $mr = $.morerel;

    //declare a new class named entitycube, get its own fn
    $mr.fn = $mr.prototype = {
        morerel: '0.0.1'
    };

    $mr.fn.extend = $mr.extend = $.extend;

    $mr.fn.extend({
        formatQuery: function() {
            return new $.ExtractionQuery(this.queryEntity, this.relatedNameArray(), this.lastUpdate);
        },
        relatedNameArray: function() {
            var array = Array();
            for (var i = 0; i < this.relatedEntities.length; i++) {
                array.push(this.relatedEntities[i].getName());
            }

            return array;
        },
        makeAQuery: function(dealingFunc) {
            var query = this.formatQuery();
            var paraString = query.toHTMLString();
            var requestURL = this.options.ajaxPageURL + paraString;
            
            this.finished = false;
            if(this.lastUpdate == -1)
                this.initSearchStatusBox();
            
            var object = this;
            jQuery.get(requestURL, function(data) {
                data = jQuery.parseJSON(data);
                dealingFunc(object,data);
            });
        },
        jsonReceived: function(obj,data) {
            obj.setReceivedData(data);
        },
        generateRelOperation: function() {
            //compare the prev with new extracted
            var len = this.renderData.Rel.length;
            if(len != this.relatedEntities.length)
                return;
            
            this.operation = Array();
            for(var i=0;i<len;i++){
                var storeRel = this.relatedEntities[i];
                var newRel = this.renderData.Rel[i];
                if(storeRel.getName() != newRel.Nam) {
                    continue;
                }
                
                for(var j=0;j<newRel.Rel.length;j++){
                    var confRel = new $.confRelation(newRel.Rel[j].Rel,newRel.Rel[j].Occ);
                    var ope = storeRel.insertTo(confRel,j);
                    if(ope != null) {
                        ope.setName(newRel.Nam);
                        this.operation.push(ope);
                    }
                }
            }
            
            this.opIdx = 0;
        },
        setReceivedData: function(data) {
            if (data == null || data.length == 0)
                return;
            
            //updat the last udpate
            this.renderData = data;
            this.lastUpdate = this.renderData.Upd;
            this.statusIndex = 0; 
            this.finished = data.Fin;
            
            this.generateRelOperation();
            this.startNewUpdate();            
        },
        autoQueryFinished: function() {
            $("#" + this.options.searchStatusID).text("Seach Complete!");
            this.showCompactRelation();
        },
        showCompactRelation: function() {
            for(var i=0;i<this.relatedEntities.length;i++){
                var re = this.relatedEntities[i];
                var relationNode = $("#" + re.getId() + ">.relationship:first");
                if(relationNode == null)
                    return;
                
                var aNodes = $(relationNode).children('a');
                var html = $(relationNode).html();
                if(aNodes == null || aNodes.length == 0) {
                    //add a user add node
                    html = $mr.relFadeInNode("+","fadeInNode");
                } else if(aNodes.length > 1) {
                    html = "";
                    html += $mr.relNode($(aNodes[0]).text());
                    for(var j=1;j<aNodes.length;j++) {
                        html += $mr.relFadeOutNode($(aNodes[j]).text(),"fadeOutNode");
                    }
                    html += $mr.relFadeInNode(">","fadeInNodeOperator","showAll('" + re.getId() + ">.relationship:first" + "')");
                    html += $mr.relFadeInNode("+","fadeInNode");
                }
                
                $(relationNode).html(html);
            }
            
            $(".fadeInNode").fadeIn();
            $(".fadeInNodeOperator").fadeIn();
            $(".fadeOutNode").fadeOut();
        },
        startNewUpdate: function() {
            if (this.renderData.Job == null)
                return;

            this.statusIndex = 0;
            this.statusAll = this.renderData.Job.length;
            this.continuosUpdate();
        },
        continuosUpdate: function() {
            if (this.statusIndex >= this.statusAll) {
                if(this.finished) {
                    this.autoQueryFinished();
                    return;
                } else {
                    //sending out new request
                    this.makeAQuery(this.jsonReceived);
                    return;
                }
            }

            var name = this.renderData.Job[this.statusIndex].Rel;
            var ratio = this.renderData.Job[this.statusIndex].Rat;
            var delay = this.options.showDelay;
            $mr.updateSearchBox(this.options.searchStatusID,name,ratio);
            
            if(this.opIdx < this.operation.length) {
                var perTime = Math.floor(this.operation.length / this.statusAll) + 1;
                for(var i=0;i<perTime;i++) {
                    this.updateOperation(this.opIdx);
                    this.opIdx ++;
                    if(this.opIdx >= this.operation.length)
                        break;
                }
            }
            
            this.statusIndex++;
            var obj = this;
            setTimeout(function(){ $.morerel.objEva(obj);}, delay);
        },
        updateOperation: function(idx) {
            var op = this.operation[idx];
            var opname = op.getName();
            var relEntity = this.findByName(opname);
            if(relEntity == null)
                return;
            
            var relationNode = $("#" + relEntity.getId() + ">.relationship:first");
            if(relationNode == null)
                return;
            
            var fadeOutNodeIdx = op.getFrom();
            var insertNodeIdx = op.getTo();
            var aNodes = $(relationNode).children('a');
            if(fadeOutNodeIdx == -1) {
                //only add node
                var htmlText = "";
                for(var i=0;i<insertNodeIdx;i++){
                    htmlText += $mr.relNode($(aNodes[i]).text());
                }
                htmlText += $mr.relFadeInNode(op.getStr(),"fadeInNode_" + relEntity.getId());
                for(var i=insertNodeIdx;i<aNodes.length;i++){
                    htmlText += $mr.relNode($(aNodes[i]).text());
                }
                $(relationNode).html(htmlText);
                $("." + "fadeInNode_" + relEntity.getId()).fadeIn(100);
            } else if(fadeOutNodeIdx < aNodes.length) {
                $(aNodes[fadeOutNodeIdx]).fadeOut(300,function(){ 
                    //remove the node
                    var htmlText = "";
                    for(var i=0;i<fadeOutNodeIdx;i++){
                        htmlText += $mr.relNode($(aNodes[i]).text());
                    }
                    for(var i=fadeOutNodeIdx+1;i<aNodes.length;i++){
                        htmlText += $mr.relNode($(aNodes[i]).text());
                    }
                    $(relationNode).html(htmlText);     
                    
                    //add a new node
                    //only add node
                    htmlText = "";
                    aNodes = $(relationNode).children('a');
                    for(var i=0;i<insertNodeIdx;i++){
                        htmlText += $mr.relNode($(aNodes[i]).text());
                    }
                    htmlText += $mr.relFadeInNode(op.getStr(),"fadeInNode_" + relEntity.getId());
                    for(var i=insertNodeIdx;i<aNodes.length;i++){
                        htmlText += $mr.relNode($(aNodes[i]).text());
                    }
                    $(relationNode).html(htmlText);   
                    $("." + "fadeInNode_" + relEntity.getId()).fadeIn(100);                              
                });
            }
        },
        fadeOutRelationship: function(parentNode,idx) {

        },
        findByName: function(str) {
            for(var i=0;i<this.relatedEntities.length;i++){
                if(this.relatedEntities[i].getName() == str)
                    return this.relatedEntities[i];
            }
            
            return null;
        },
        initSearchStatusBox: function() {
            $("#" + this.options.serachStatusAfterID).after("<div id=\"" + this.options.searchStatusID + "\" style=\"color:gray;background-color:#00FF22;display:none;\">...Searching Bing...</div>");
            $("#" + this.options.searchStatusID).show();
        },
    });

    $mr.extend({
        trim: function(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        implode: function(arr, splitter) {
            var s = "";
            if (arr.length == 0)
                return s;

            for (var i = 0; i < (arr.length - 1); i++) {
                s += arr[i] + splitter;
            }
            s += arr[arr.length - 1];

            return s;
        },
        relNode: function(str,func) {
            if(!func)
                return "<a style=\"text-decoration: underline; color: rgb(255, 102, 0);\">" + str + "</a> "; 
            else 
                return "<a style=\"text-decoration: underline; color: rgb(255, 102, 0);\" onclick=\"" + func +"\">" + str + "</a> "; 
        },
        relFadeInNode: function(str,showId,func) {
            if(!func)
                return "<a style=\"text-decoration: underline; color: rgb(255, 102, 0);display:none;\" class=\""+showId+"\">" + str + "</a> ";  
            else
                return "<a style=\"text-decoration: underline; color: rgb(255, 102, 0);display:none;\" class=\""+showId+"\" onclick=\"" + func +"\">" + str + "</a> ";  
        },
        relFadeOutNode: function(str,showId,func) {
            if(!func)
                return "<a style=\"text-decoration: underline; color: rgb(255, 102, 0);display:inline;\" class=\""+showId+"\">" + str + "</a> ";  
            else
                return "<a style=\"text-decoration: underline; color: rgb(255, 102, 0);display:inline;\" class=\""+showId+"\" onclick=\"" + func +"\">" + str + "</a> ";  
        },
        updateSearchBox:function(divID, name, ratio) {
            $("#" + divID).text("...Searching [" + name + "] " + ratio + "%...");
        },
        objEva:function(obj){
            obj.continuosUpdate();
        }
    });
})(jQuery);


        function showAll(id) {
            var text = $("#" + id + ">a[class=fadeInNodeOperator]:first").text();
            if (text == ">") {
                $("#" + id + ">a[class=fadeOutNode]").fadeIn();
                $("#" + id + ">a[class=fadeInNodeOperator]:first").text("<");
            } else {
                $("#" + id + ">a[class=fadeOutNode]").fadeOut();
                $("#" + id + ">a[class=fadeInNodeOperator]:first").text(">");
            }
        }

        jQuery(document).ready(function() {
            $(jQuery("#LeftPanel>div[class=panel]")[0]).morerel({
            });
        });
