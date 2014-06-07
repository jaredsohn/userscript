// ==UserScript==
// @name       eDistalo
// @version    1.0
// @description  Hide red block "New" in eRepublik.
// @include http://*.erepublik.com/*
//
// ==/UserScript==


	
(function(){
    function dRate(o){
        var _self = this,
            _params = {
                cultureCoefficient  :   2.5,
                habitantsDivider    :	5,
                menu                :   ".system-menu-panel",
                map                 :   ".fn-resizable-mini-map-panel-default",
                append:{
                    button:{
                        label           :   "R",
                        id              :   "dRate",
                        toggle          :   "dRateVisible",
                        styles:{
                            position        :   "absolute",
                            display         :   "block",
                            top             :   "13px",
                            right           :   "60px",
                            "z-index"       :   "35",
                            width           :   "30px",
                            height          :   "30px",
                            padding         :   "5px",
                            cursor          :   "pointer",
                            "font-size"     :   "30px",
                            "font-weight"   :   "700",
                            "line-height"   :   "30px",
                            "text-align"    :   "center",
                            "border-radius" :   "8px",
                            "background"    :   "rgba(0,0,0,0.7)",
                            "color"         :   "#cac267"
                        }
                    },
                    container:{
                        id                  :   "dRatePre",
                        styles:{
                            position        :   "absolute",
                            display         :   "none",
                            top             :   "40px",
                            right           :   "60px",
                            width           :   "250px",
                            "background"    :   "rgba(0,0,0,0.7)",
                            "color"         :   "#eadb2d",
                            border          :   "1px solid #ccc",
                            padding         :   "20px",
                            "min-height"    :   "300px",
                            "border-radius" :   "8px",
                            "z-index"       :   "99",
                            "overflow-y"      :   "auto"
                        }
                    }
                }
            },
            rateBuildings = {},
            _actionLocked = false,
            _o = {
                button: null,
                wrapper: null
            };

        function _tab(count, tabLength){
            if(typeof(count) != "number")
                count = 1;

            if(typeof(tabLength) != "number")
                tabLength = 4;

            var result = '';

            for(var i=0; i<count*tabLength; i++)
                result +=' ';

            return result;
        }

        function _getCityBuildingsRate(data){
            var $result = {
                data: {},
                total: 0
            };

            for(var index in data)
                if(index in rateBuildings){
                    $result.data[index] = {
                        "name" : rateBuildings[index].name,
                        "count" : data[index].count,
                        "rate" : (data[index].count * rateBuildings[index].rate)
                    };
                    $result.total += $result.data[index].rate;
                }

            return $result;
        }

        function _parseCitiesRate(cities){
            var $result = {
                data: {},
                total: 0
            };

            for(var index in cities){
                var city = cities[index];

                var _city = {
                    name: city.title,
                    general: {
                        culture: city.culture_savings,
                        habitation: city.habitation
                    },
                    buildings: _getCityBuildingsRate(city.buildings),
                    total: 0
                };

                _city.total = parseInt(
                    (_city.general.culture * _params.cultureCoefficient) +
                        (_city.general.habitation / _params.habitantsDivider) +
                        (_city.buildings.total)
                );

                $result.data[city.id] = _city;

                $result.total += _city.total;
            }

            return $result;
        }

        function _getContainerHeight(){
            var $result = $$(_params.map)[0].getCoordinates().top - ($$(_params.menu)[0].getCoordinates().top + $$(_params.menu)[0].getSize().y);

            if($result < _params.append.container["min-height"])
                $result = _params.append.container["min-height"];

            return $result;
        }

        this.init = function(o){
            if(typeof(o) != "undefined")
                for(var index in o)
                    if(_params.hasOwnProperty(index))
                        _params[index] = o[index];
            return this.startup();
        };

        this.startup = function(){
            for(var index in FN.ClientData.buildingProperties){
                if(FN.ClientData.buildingProperties[index].rating_growth_increase > 0)
                    rateBuildings[index] = {
                        "name" : FN.ClientData.buildingProperties[index].codename,
                        "rate" : FN.ClientData.buildingProperties[index].rating_growth_increase
                    };
            }
            return this;
        };

        this.parseCities = function(){
            return _parseCitiesRate(this.getCities());
        };

        this.getCities = function(){
            return new Request.JSON({
                url: "/city/list",
                async: false
            }).send().response.json.cities;
        };

        this.getResearch = function(){
            return new Request.JSON({
                url: "/Research/get",
                async: false
            }).send().response.json.data.ResearchedFull;
        };

        this.getRate = function(){
            var $result = {
                cities: this.parseCities(),
                research: parseInt(this.getResearch()),
                total: 0
            };

            $result.total = parseInt($result.cities.total + $result.research);

            return $result;
        };

        this.renderRate = function(doWrap, wrapTag, wrapStyle){
            var $data = this.getRate();

            outString = "Города: \n";

            for(var index in $data.cities.data){
                var $city = $data.cities.data[index];
                outString += _tab() + "ID: " + index + " [" +$city.name + "]\n";
                outString += _tab(2) + "Культура: " + parseInt($city.general.culture) + " x" + _params.cultureCoefficient + " [+" + parseInt(_params.cultureCoefficient * $city.general.culture) + "]\n";
                outString += _tab(2) + "Население: " + parseInt($city.general.habitation) + "/" + _params.habitantsDivider + " [+" + parseInt($city.general.habitation / _params.habitantsDivider) + "]\n";
                if($city.buildings.total > 0){
                    outString += _tab(2) + "Постройки: [+" + $city.buildings.total + "]\n";
                    /**/
                    for(var $id in $city.buildings.data){
                        var $building = $city.buildings.data[$id];
                        outString += _tab(3) + "\"" + $building.name + "\" x" + $building.count + " [+" + $building.rate + "]\n";
                    }
                    /**/
                }
                outString += _tab(2) + "Суммарно: " + parseInt($city.total) + "\n";
                outString += _tab() + "---------------------------------\n";

            }
            outString += "Все города: " + $data.cities.total +"\n";
            outString += "Исследования: " + $data.research +"\n";
            outString += "-----------------------------\n";
            outString += "Общий рейтинг: " + $data.total +"";

            if(doWrap){
                var _tag = typeof(wrapTag) == "undefined"
                    ? "pre"
                    : wrapTag;

                outString = new Element(_tag, {
                    html: outString,
                    id: _params.append.container.id
                }).setStyles(_params.append.container.styles);

                if(typeof(wrapStyle) == "object")
                    outString.setStyles(wrapStyle);
            }

            return outString;
        };

        this.alertRate = function(){
            alert(this.renderRate());
        };


        this.attach = function(data){
            if(_o.button && _o.wrapper)
                return this;

            if(typeof(data) == "undefined")
                data = this.renderRate(true);
            /**
             * @todo: Если юзать textarea - прикрутить к ней scroll без фокуса
                data = this.renderRate(true, "textarea",{
                    overflow: "hidden"
                });
            */

            var $div  = new Element("div", {
                html: "<span id=\""+ _params.append.button.id +"\">R</span>"
            }).adopt(data.setStyle("height", _getContainerHeight()));

            $div.getChildren("span")[0].setStyles(_params.append.button.styles);

            $$("body").adopt($div);

            _o.button = $(_params.append.button.id);
            _o.wrapper = $(_params.append.container.id);

            _o.button.addEvents({
                "mouseover":    function(){
                    _o.wrapper.setStyle("display", "block");
                },
                "click":    function(){
                    if(!_actionLocked){
                        _actionLocked = true;
                        _o.wrapper.empty();
                        _o.wrapper.set("html", _self.renderRate());
                        _actionLocked = false;
                    }
                }
            });

            _o.wrapper.addEvent("mouseleave", function(){
                _o.wrapper.setStyle("display", "none");
            });

            return this;
        };

        return this.init(o);
    }
    this.dRate = new dRate();
})(window);

dRate.attach();