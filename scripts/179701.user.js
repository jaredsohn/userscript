// ==UserScript==
// @name           Xio's superScript
// @namespace      Virtonomics
// @version        5.2
// @include        http://*virtonomic*.*/*/*
// ==/UserScript==

var run = function(){
    
    console.log("Xio's superScript is running!");
    if (window.top !== window.self)
        return false;
    
    /*
    $("a div .c_qlt:nth-of-type(5)").each(function(){
        if(numberfy($(this).text()) > numberfy($(this).next().text()))
            $(this).css("background-color", "#E1F5E2");
        else
            $(this).css("background-color", "#F5E1F4");
    })    
    */
   
    //Usefull stuff
    function setButton(name, functionName, number){
	var container = $('#topblock');
	var button = $('<button class=funcButtons>'+name+'</button>').click(function() {            
            $(".funcButtons").attr("disabled","disabled");
            functionName(number);         
	});        
        container.append(button);
    }
    
    function giveInfo(){
        var $container = $('#topblock');
        var loadview = '<p id="loading">Starting Up</p>';
        $container.append(loadview);
        $("#loading").css("color","#AAFFAA")
                     .css("font-size",16);
        var tempPlace = "<p id='tempPlace'></table>";
        $container.append(tempPlace);
        $("#tempPlace").hide();
    }
    
    function numberfy(variable){
            variable = String(variable);
            variable = variable.replace(/[\s\$\%]/g,"");
            variable = parseFloat(variable);
            if(isNaN(variable)) variable = 0;
            return variable;
    }
    
    function trim(string){
        string = string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        return string;
    }
    
    function spaces(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    var c = 11.8321605; //The all-mighty strange constant
    
    function subdType(){
        link = $("#unitImage").find($("img")).attr('src');

        n = link.indexOf('animalfarm');
        if (n > 0) return "farm";

        n = link.indexOf('orchard');
        if (n > 0) return "plantation";

        n = link.indexOf('restaurant');
        if (n > 0) return "restaurant";

        n = link.indexOf('service_light');
        if (n > 0) return "service";

        n = link.indexOf('medicine');
        if (n > 0) return "medical";

        n = link.indexOf('fishingbase');
        if (n > 0) return "fishing";

        n = link.indexOf('lab');
        if (n > 0) return "laboratory";

        n = link.indexOf('workshop');
        if (n > 0) return "factory";

        n = link.indexOf('shop');
        if (n > 0) return "shop";

        n = link.indexOf('office');
        if (n > 0) return "office";

        n = link.indexOf('mill');
        if (n > 0) return "mill";

        n = link.indexOf('mine');
        if (n > 0) return "mine";
        
        n = link.indexOf('farm');
        if (n > 0) return "agriculture";
        
        n = link.indexOf('power');
        if (n > 0) return "power";
        
        return "unknow";
    }
      
    function subdFactor(){
        var factor = 0;
        switch(subdType()){
            case "mine":
                factor = 2;
                break;
            case "power":
                factor = 1.5;
                break;
            case "factory":
                factor = 1;
                break;
            case "agriculture":  //fall-trough
                factor = 0.4;
                break;
            case "plantation":
                factor = 0.3;
                break;
            case "medical":  //fall-trough
            case "fishing":
                factor = 0.25;
                break;
            case "farm":
                factor = 0.15;
                break;
            case "restaurant": //fall-trough
            case "shop":
            case "laboratory":
            case "mill":
                factor = 0.1;
                break;
            case "service":
                factor = 0.03;
                break;
            case "office":
                factor = 0.02;
                break;            
        }   
        return factor;
    }
    
    function calcTop1(employees, qualification, factor){
        return Math.pow(10, -qualification) * Math.pow(c, qualification - 1) * Math.sqrt(employees / factor);
    }
    
    function calcQualification(employees, manager, factor){
        var value = (Math.log(c) + Math.log(manager/Math.sqrt(employees/factor)))/Math.log(c/10);
        return Math.floor(value*100)/100;
    }
    
    function calcEmployees(qualification, manager, factor){
        var value = Math.pow(100,qualification) * Math.pow(c, 2-2*qualification) * factor * Math.pow(manager, 2);
        return Math.floor(value);
    }
    
    function calcTop3(manager){
        
        var f = subdFactor() * 100;
        
        return f * manager * manager + 3 * f * manager;;
    }
    
    function calcMaxTech(manager){
        return Math.floor(5.386*Math.pow(manager, 1/3));
    }
    
    function calcEquipment(qualification){
        return Math.floor(Math.pow(qualification, 1.5)*100)/100;
    }
    
    function calcEfficiency(employees, allEmployees, manager, factor, qualification){
        var efone = manager * calcTop3(manager) / allEmployees / calcTop1(employees, qualification, factor);
        var eftwo = 6 * manager / 5 / calcTop1(employees, qualification, factor);
        console.log(efone*100,eftwo*100);
        return (Math.round(Math.min(efone, eftwo, 1)*1000)/10).toFixed(2) + "%";
    }
    
    function placeText($place, text, value){
        $place.html($place.html()+"<br><span style='color:purple'><b>"+value+"</b>"+text+"</span>");
    }
    
    function makeRed($place, value, maxValue){
        if(value > maxValue){
            $place.css("color", "red");
        }
    }
    
    function seeTops(){
              
        var $qualRow = $("tr:contains('Qualification of employees'), tr:contains('Qualification of scientists'), \n\
                          tr:contains('Workers qualification')");
        var $levelRow = $("tr:contains('Qualification of player')");
        var $empRow = $("tr:contains('Number of employees'), tr:contains('Number of scientists'),\n\
                            tr:contains('Number of workers')");
        var $totalEmpRow = $("tr:contains('profile qualification')");
        var $techRow = $("tr:contains('Technology level')");
        var $equipRow = $("tr:contains('Equipment quality'), tr:contains('Computers quality'),\n\
             tr:contains('Livestock quality'), tr:contains('Quality of agricultural machines')");
        var $effiRow =  $("tr:contains('Top manager efficiency')");       
        
        var amount = numberfy($empRow.find("td:eq(1)").text());
        var qual = numberfy($qualRow.find("td:eq(1)").text());
        var level = numberfy($levelRow.find("td:eq(1)").text());
        var factor = subdFactor();
        var totalEmp = numberfy($totalEmpRow.find("td:eq(1)").text());
        var tech = numberfy($techRow.find("td:eq(1)").text());
        var eqQual = numberfy($equipRow.find("td:eq(1)").text());
        
        var topQual = calcQualification(amount, level, factor);
        var topEmp = spaces(calcEmployees(qual, level, factor));
        var top3 = spaces(calcTop3(level));
        var topTech = calcMaxTech(level);
        var topEqQual = calcEquipment(qual);
        var effi = calcEfficiency(amount, totalEmp, level, factor, qual);
        
        placeText($empRow.find("td:eq(1)")," (Maximum amount of employees with this employee qualification)", topEmp);       
        placeText($qualRow.find("td:eq(1)")," (Maximum employee qualification with this amount of employees)", topQual);
        placeText($totalEmpRow.find("td:eq(1)")," (Maximum amount of employees in all subdivisions)", top3);
        placeText($techRow.find("td:eq(1)")," (Maximum technology level with this top manager qualification)", topTech);
        placeText($equipRow.find("td:eq(1)")," (Maximum equipment quality with this employee qualification)", topEqQual);
        placeText($effiRow.find("td:eq(1)")," (Expected top manager efficiency with these settings)", effi);
        
        makeRed($empRow.find("td:eq(0)"), amount, topEmp);
        makeRed($qualRow.find("td:eq(0)"), qual, topQual);
        makeRed($totalEmpRow.find("td:eq(0)"), totalEmp, top3);
        makeRed($techRow.find("td:eq(0)"), tech, topTech);
        makeRed($equipRow.find("td:eq(0)"), eqQual, topEqQual);
    }
    
    //Set sale price with CTIE
    function setFactoryPrice(){
        console.log("setFactoryPrice");
        giveInfo();
        var $loading = $("#loading");
        
        //Get Profit Tax
        $loading.text("Profit Tax");
        var $location = $(".officePlace a");
        var profitLink = $location.eq(1).attr("href");
        $.get(profitLink, function(data){
            
            var region = "";
            if($location.length === 4)
                region = $location.eq(2).text();            
            else
                region = $location.eq(1).text();
            
            var profitTax = numberfy($(data).find(".grid tr:contains("+region+") td:eq(3)").text());
            console.log(profitTax);
            
            var amountOfGoods = $("td.nowrap:contains('Prime cost')").length;
            var extraRow = 0;
            if (amountOfGoods > 1)	
                extraRow = 1;

            //Get CTIE
            var save = 0;
            $loading.text("CTIE");
            var CTIElink = $(data).find(".grid tr:contains("+region+") a:eq(0)")
                                  .attr("href").replace("citylist/", "regionENVD/");            
            var picture = [];            
            for(var i=0; i<amountOfGoods; i++){

                picture[i] = $(".grid tr:nth-child("+(i+2)+") img[align='middle']").attr("src");
                console.log("picture: "+picture[i]);
                $("#tempPlace").load(CTIElink + " tr:has([src=\'"+picture[i]+"\'])", 
                function(){
                    for(var j=0; j<amountOfGoods; j++){
                        if($("#tempPlace").html().indexOf(picture[j]) >= 0){
                            var CTIE = $("#tempPlace td").eq($("#tempPlace td:has([src=\'"+picture[j]+"\'])").index()+ 2).text();
                            picture[j] = false;

                            //Set the price
                            var $input = $("table.grid tr:nth-child("+(j+2)+") input.money:eq(0)");

                            var primecost = numberfy($("tr:nth-child("+(j+2)+") td:nth-child("+(4+extraRow)+") td:eq(5)").text());

                            var newPrice = 0;
                            if (isNaN(primecost)) 
                                newPrice = Math.round(numberfy($input.val())*100)/100;
                            else
                                newPrice = Math.ceil(primecost*(1+numberfy(CTIE)/100*profitTax/100)*100)/100;
                            $input.val(newPrice);

                            break;
                        }   
                    }              
                    console.log("CTIE: "+CTIE);
                    console.log("Price: "+newPrice);
                    
                    save++;
                    console.log(save);
                    if(save === amountOfGoods){                        
                         $loading.text("Reload");
                         $("input[type:'submit'][value='Save changes']").trigger('click');
                    }                       
                });  
             }
        });      
    }
    
    //Option to set your companies transactions to never
    function setWarehouseNever(){   
        var name = $(".officePlace a:eq(0)").text();
        console.log(name);
        
        $("tr:has(a:contains('%'))").each(function(){
            if($(this).text().indexOf(name)>=0){
                $(this).find("a:contains('%')").click();
                $("#percent_sel").val(0);
                $("input[value=Set]:eq(1)").click();
                console.log("Changed a condition to never");
            }
        });
        
        $("input[type:'submit'][name='applyChanges']").trigger('click');
    }
          
    //Set the trainings
    function openTrainingWindows(){
        console.log("openTrainingWindows");

        if(!localStorage.trainingWindow || !localStorage.trainingCount){
            localStorage.trainingWindow = "false";
            localStorage.trainingCount = 0;
        }

        var amountOfRows = $("input:checkbox").length - 1;
        if(localStorage.trainingWindow === "false"){
            console.log($(".list tr:nth-child("+(2*localStorage.trainingCount+4)+") td:eq(2) a").text());
            if ($(".list tr:nth-child("+(2*localStorage.trainingCount+4)+")").has("div.sizebar").length > 0){
                    localStorage.trainingCount++;
                    openTrainingWindows();
                    return;
            }

            var cityPerc = numberfy($(".list tr:nth-child("+(2*localStorage.trainingCount+4)+") td span").text());   
            var workers = numberfy($(".list tr:nth-child("+(2*localStorage.trainingCount+4)+") [title='Employees and salary']").text());
            console.log(cityPerc, workers);

            if(cityPerc > 150 && workers > 0){			
                var link =  $(".list tr:nth-child("+(2*localStorage.trainingCount+4)+") td[style^='background-color']:eq(0) a").attr('href');
                window.open(link);
                localStorage.trainingWindow = "true";
            }                    
            localStorage.trainingCount++;						
        }

        if(localStorage.trainingWindow === "false" && localStorage.trainingCount < amountOfRows){
            setTimeout(function(){openTrainingWindows();}, 5);
       }
        else if(localStorage.trainingCount >= amountOfRows){
            localStorage.removeItem("trainingWindow");
            localStorage.removeItem("trainingCount");
            //window.location.reload(false);
        }
        else{
            setTimeout(function(){openTrainingWindows();}, 800);
        }			
    }    
    
    function setTraining(){
        $("input:eq(0)").val(4);
        localStorage.trainingWindow = "false";
        $("input:submit").trigger('click');
    }
    
    function noWorkers(){
        localStorage.trainingWindow = "false";
        window.close();
    }
    
    //Building
    function setSub(){
        console.log("setSub");              
        
        $.get($("a:contains('World map')").attr('href'), function(data){
            var $countries, $regions, $cities;
            
            function saveBuild(){
                console.log("save");
                var saves = $("#new tr[id]").length;
                var $values = $("#new tr[id]").find("[id^=select]");
                for (var i = 0; i < saves; i++){
                    localStorage[$values.eq(i).attr("id").replace("select","build")] = String($values.eq(i).val()) + (String($values.eq(i).val())? "":String($values.eq(i).text()));                  
                }
            }
            
            function loadBuild(){
                console.log("load");
                for (var i in localStorage){
                    if(i.indexOf("build") >= 0){
                        $value = $("#"+i);
                        console.log(localStorage[i]);
                        $value.val(localStorage[i]);
                        $value.trigger("blur");
                    }
                }
            }
            
            function line(name, val){
                val = trim(val);
                while(val.indexOf(";;") >= 0){
                    val = val.replace(";;",";");
                }
                var line = "<tr id=tr"+name+"><td style='width:65px'>"+name+":</td>";                     
                line += "<td><input id=build"+name+" type=text style='width:200px; display:none'></input><select id=select"+name+" style='width:200px'>";
                while(val.indexOf(";") >= 0){
                    if(val.slice(0,2) === "[]")
                        line += "<optgroup label='"+val.slice(2, val.indexOf(";"))+"'></optgroup>";
                    else
                        line += "<option>"+val.slice(0, val.indexOf(";"))+"</option>";

                    val = trim(val.replace(val.slice(0, val.indexOf(";")+1), ""));
                }
                line += "<option>"+val+"</option>";
                line += "</select></td></tr>";                                   

                return line;
            }
            
            function changeList(setType){    
                var type = trim($("[class*=selected]").text());
                if($("[class*=selected]").length > 1){                    
                    console.log("changeList aborted");
                    window.location.reload(false);
                }
                
                if(typeof(setType) !== 'undefined')
                    type = setType;

                if(type === ""){ 
                    console.log("changeList aborted");
                    return false;                    
                }      
                                
                saveBuild();
                console.log("changeList");
                
                var a = "<tr id='trBuilding'><td style='width:65px'>Type:</td><td><div id=selectBuilding style='width:200px'>"+type+"</div></td></tr>";
                var b = line("Country", locationText);
                console.log(locationText);
                var c = line("Region", regionText);
                console.log(regionText);
                var d = line('City', cityText);
                console.log(cityText);
                var e = line("District", "Fashionable district;City centre;Residential area;Outskirts;Suburb");
                var f = line("Size", "100 sq.m.;500 sq.m.;1000 sq.m.;10 000 sq.m.;100 000 sq.m.");
                var g = line("Size", "100 sq.m;500 sq.m;1000 sq.m;5000 sq.m;30 000 sq.m");
                var h = line("Size", "Bar;Cafe;Restaurant;Restaurant complex;Great Restaurant complex");
                var j = line("Size", "100 work places;200 work places;250 work places;400 work places;500 work places;\n\
                              600 work places;1000 work places;1500 work places;2000 work places;2500 work places;\n\
                              3000 work places;4000 work places;5000 work places;6000 work places;10000 work places;\n\
                              15000 work places;25000 work places");
                var k = line("Size", "10 th.sq.m.;50 th.sq.m.;100 th.sq.m.;500 th.sq.m.;1 mln.sq.m.;5 mln.sq.m.");
                var l = line("Size", "1 level;2 level;3 level;4 level;5 level;6 level");
                var m = line("Size", "Small Medical center;Medium Medical center;Large Medical center;City Medical center;Region Medical center");
                var n = line("Size", "1 building;2 buildings;3 buildings;4 buildings;5 buildings");
                var o = line("Size", "100 MW;500 MW1000 MW;2500 MW;5000 MW");
                var p = line("Size", "1 building;5 buildings;10 buildings;15 buildings;25 buildings;50 buildings");
                var q = line("Specialization", "Diagnostic Center;Health Center;Traditional Medicine;Dental clinic;Hospital");
                var r = line("Specialization", "Russian Restaurant;Beer Restaurant;Italian Restaurant;Fish Restaurant;\n\
                              Steak Restaurant;Ice cream;Cheese Restaurant;Vegetarian Restaurant;Tearoom;Coffee House;\n\
                              Oyster Restaurant");
                var s = line("Specialization", "[]Fitness center;Fitness;Yoga;Body-building;Sports Activities for all ages;\n\
                              Professional Sports;Dancing;Climbing;[]Hairdressing salon;Hairdressing salon;Beauty salon;\n\
                              SPA salon;[]Laundry;Laundry;Dry-cleaning;Launderette;");
                var t = line("Specialization", "[]Cowshed;Cowshed;Milk farm (grain);Cows breeding;[]Pig farm;Pig farm;\n\
                              Pigs breeding;Dried ham (jamón);[]Poultry farm;Poultry farm;Chicken breeding;Egg farm (grain);\n\
                              Broiler poultry farm;[]Sheep farm;Meat;Sheep farm;Sheep breeding");
                var u = line("Storage", "Petrochemical products;Ore and rock minerals;Raw materials;\n\
                              Equipment, technics, spare parts;Agricultural products;Foodstuff;Manufactured goods;\n\
                              Gold and valuable;Fish;Medical Supplies");
                var v = line("Technology", "Level 1");
                var w = line("Production", "[]Aircraft prodution;Aircraft Engine Plant;Aircraft Interior Plant;\n\
                              Aircraft assembly plant;Aircraft components Plant;Avionics Plant;Chassis Plant;\n\
                              []Chemical industry;Chemical factory;Engine Oil Plant;Household chemicals factory;Tyre factory;\n\
                              []Consumer goods;Bicycle production;Cookers Plant;Dishwashers Plant;\n\
                              Domestic equipment production;Domestic production;Kitchen Furniture Factory;\n\
                              Photo Camera production;Power tools Plant;Printing;Souvenir manufactory;\n\
                              Sports equipment production;Sports tools production;Umbrella factory;\n\
                              []Electronics and electrotechnics;Audio equipment production;Climate equipment Plant;\n\
                              Coffee machines plant;Computer factory;GPS-navigators production;Instrument factory;\n\
                              Microprocessors factory;Mobile phones production;Refrigerator factory;Video equipment production;\n\
                              Washing machines production;[]Engineering industry;Electromechanical Plant;Engineering plant;\n\
                              Machine-tool factory;Parts Plant;Tractor factory;[]Fishing industry;Fish processing plant;\n\
                              []Food industry;Bakery;Brewery;Cheesery;Chocolate factory;Citrus processing factory;\n\
                              Coffee factory;Dairy-farm;Distillery plant;Olives processing plant;Sausage factory;\n\
                              Soft drinks production;Spice-making plant;[]Glass industry;Ceramic factory;Glass-works factory;\n\
                              []Jewelry;Decor studio;Jewelry factory;Lapidary factory;Pearls studio;Watch factory;\n\
                              []Light industry;Bed-clothes factory;Clothing factory;Cotton-cleaning factory;\n\
                              Leather small wares factory;Outerwear factory;Shoe factory;Toy factory;Underwear factory;\n\
                              Weaving mill;[]Luxury;Elite interiors Factory;[]Medicine, Pharmacy and Beauty industry;\n\
                              Biofactory;Cosmetics factory;Essential oils factory;Hygiene Factory;Medical equipment Plant;\n\
                              Medical ingredients Plant;Medical instruments Plant;Perfumery factory;Pharmaceutical Plant;\n\
                              []Metallurgy;Copper Mill;Duralumin Plant;Metallurgical factory;Non-ferrous metal factory;\n\
                              Titanium smelter;[]Motor-car industry;Automobile factory;Car assembly plant;\n\
                              Motorcycles production;Water scooters production;[]Power Industry;Coal equipment plant;\n\
                              Heat exchange equipment plant;Power engineering plant;Power units installation plant;\n\
                              []Services sector;Public interiors Factory;[]Shipbuilding;Dockyard;Yacht shipyard;\n\
                              []Woodworking;Furniture factory;Pulp and paper mill");
                var x = line("Name", "Subdivision made by XioScript; "+$("#selectBuilding").text()+" "+$("#selectCity").text()+"; T"+$("#selectBuilding").text()+" "+$("#selectCity").text());            
                var y = "<tr><td colspan=2>\""+type+"\" is not supported</td></tr>";
                var z = "<tr><td colspan=2><input type=submit id=goBut value=Build! style='width:100%'></td></tr>"; 

                switch(type){                
                    case "Store":
                        $("#new").html(a+b+c+d+e+f+x+z);
                        break;
                    case "Services sector":
                        $("#new").html(a+b+c+d+e+s+g+x+z);
                        break;
                    case "Restaurant":
                        $("#new").html(a+b+c+d+e+r+h+x+z);
                        break;
                    case "Factory":
                        $("#new").html(a+b+c+d+w+j+v+x+z);
                        break; 
                    case "Mill":
                        $("#new").html(a+b+c+d+n+v+x+z);
                        break; 
                    case "Animal farm":
                        $("#new").html(a+b+c+d+t+p+v+x+z);
                        break;
                    case "Warehouse":
                        $("#new").html(a+b+c+d+u+k+x+z);
                        break;                  
                    case "Laboratory":
                        $("#new").html(a+b+c+d+l+x+z);
                        break;
                    case "Medical Center":
                        $("#new").html(a+b+c+d+q+m+x+z);
                        break;
                    case "Power Plant":
                        $("#new").html(a+b+c+d+o+v+x+z);
                        break;    
                    default:
                        $("#new").html(a+y);
                        break;
            }
                                        
            $("[id^=select]").change(function() {
                console.log("change");
                $("#"+$(this).attr("id").replace("select","build")).val($(this).val());                

                if($(this).attr("id") === "selectCountry"){
                    $.get($countries.filter(":contains("+$(this).val()+")").attr("href"), function(data2){
                        $regions = $(data2).find(".grid td:nth-child(1) a");
                        regionText = "";
                        for(var i = 0; i < $regions.length; i++){
                            regionText += $regions.eq(i).text() + ";";
                        } 
                        changeList(localStorage.buildBuilding);
                    });
                }
                else if($(this).attr("id") === "selectRegion"){
                    $.get($regions.filter(":contains("+$(this).val()+")").attr("href"), function(data2){
                        $cities = $(data2).find(".grid td:nth-child(1) a");
                        cityText = "";
                        for(var i = 0; i < $cities.length; i++){
                            cityText += $cities.eq(i).text() + ";";
                        } 
                        changeList(localStorage.buildBuilding);
                    });
                }
            })
                         .click(function(event) {
            if(event.which <= 1) {
                var offX = event.pageX - $(this).offset().left;
                var offY = event.pageY - $(this).offset().top;
                if(offX < $(this).width() - 22 && offY < $(this).height() && 0 < offY) {
                    $(this).hide();                        
                    $("#"+$(this).attr("id").replace("select","build")).show().focus();
                }
            }
        });

            $("[id^=build]").blur(function() {
            console.log("blur");
            $sel = $("#"+$(this).attr("id").replace("build","select"));
            $sel.find("option:selected").attr("selected",false);
            $sel.find("option[frominput=1]").remove();
            $sel.append($("<option />").val($(this).val()).text($(this).val()).attr("frominput", 1).attr("selected", true));
            $(this).hide();
            $sel.show();
        })
                        .each(function(){
                $select = $("#"+$(this).attr("id").replace("build","select"));
                $(this).width($select.width()).val($select.val());
            });
            
            loadBuild();  
            
            localStorage.buildBuilding = $("#selectBuilding").text();
        }
                       
            $countries = $(data).find(".grid a");
            var locationText = "";
            var regionText = "";
            var cityText = "";
            for(var i = 0; i < $countries.length; i++){
                locationText += $countries.eq(i).text() + ";";
            }          
            
            var types = $(":radio").length;
            var rows = Math.ceil(types/2);
            $(".list tr").each(function(){
                $(this).find("td:eq(3)").remove();
            });
            for(var i = 0; i<types; i+=rows){
                var wrap = $(".list tr").eq(i);
                for(var j = 1; j<rows; j++){
                    wrap = wrap.add($(".list tr").eq(i+j));
                }
                wrap.wrapAll("<td style='width:300px'></td>");
            }        

            $(".list tbody > td:eq(1)").after("<td><table width=100% id='new'></table><td>");
            $("#new").css("background-color", "rgb(255,250,205)");

            if(localStorage.buildBuilding)
                changeList(localStorage.buildBuilding);
            else
                changeList("Fishing base");

            $("body").delegate(".list", "click", function(){
                changeList();
            }); 

            $("body").delegate("#goBut", "click", function(){
                saveBuild();
                localStorage["buildStart"] = "true";
                localStorage["buildBuilding"] = $("#selectBuilding").text();
                $("input[name=next]").click();
            }); 

            if(localStorage.buildBuilding){
                $(".list tr:contains("+localStorage.buildBuilding+")").trigger('click');
                changeList(localStorage.buildBuilding); 
                loadBuild();
            }    

            if(localStorage.buildStart === "true"){
                $("#goBut").trigger("click");
            }                    
        });       
    }
    
    function buildSub(){
        console.log("buildSub");
        if(document.URL.indexOf("/step1-type-select") >= 0){
            console.log("Step 1 Type Select");
            var type = "";
            if(localStorage.buildBuilding === "Factory"){
                type = localStorage.buildProduction;
            }
            else if(localStorage.buildBuilding === "Services sector"){
                switch(localStorage.buildSpecialization){
                    case "Fitness":
                    case "Yoga":
                    case "Body-building":
                    case "Sports Activities for all ages":
                    case "Professional Sports":
                    case "Dancing":
                    case "Climbing":
                        type = "Fitness center";
                        break;
                    case "Hairdressing salon":
                    case "Beauty salon":
                    case "SPA salon": 
                        type = "Hairdressing salon";
                        break;
                    case "Laundry":
                    case "Dry-cleaning":
                    case "Launderette":  
                        type = "Laundry";
                        break;  
                    case "Cowshed":    
                    case "Milk farm (grain)":  
                    case "Cows breeding":
                        type = "Cowshed";
                        break; 
                    case "Pig farm":   
                    case "Pigs breeding":  
                    case "Dried ham (jamón)": 
                        type = "Pig farm";
                        break; 
                    case "Poultry farm":   
                    case "Chicken breeding":  
                    case "Egg farm (grain)": 
                    case "Broiler poultry farm":
                        type = "Poultry farm";
                        break; 
                    case "Meat":  
                    case "Sheep farm":   
                    case "Sheep breeding":     
                        type = "Sheep farm";
                        break;
                }
            }
            
            console.log(type);
            $(".list td:contains("+type+")").prev().prev().find("input").trigger('click');
        }               
        else if(document.URL.indexOf("/step2") >= 0){
            console.log("Step 2");
            $(".list tr:contains("+localStorage.buildCountry+") input").trigger('click');          
        }
        else if(document.URL.indexOf("/step3") >= 0){
            console.log("Step 3");
            $(".list tr:contains("+localStorage.buildRegion+") input").trigger('click');
        }
        else if(document.URL.indexOf("/step4-shop-district") >= 0){
            console.log("Step 4 Shop District");
            $(".list tr:contains("+localStorage.buildDistrict+") input").trigger('click');
        } 
        else if(document.URL.indexOf("/step4-warehouse") >= 0){
            console.log("Step 4 Warehouse");
            $(".list tr:contains("+localStorage.buildStorage+") input").trigger('click');
        }   
        else if(document.URL.indexOf("/step4") >= 0){
            console.log("Step 4");
            $(".list tr:contains("+localStorage.buildCity+") input").trigger('click');
        }
        else if(document.URL.indexOf("/step5") >= 0){
            console.log("Step 5");            
            $(".list tr:contains("+localStorage.buildSpecialization+") input").trigger('click');            
        }
        else if(document.URL.indexOf("/step6") >= 0){
            console.log("Step 6");
            //$("form").html($("form").html().replace(/sq. m./g, "sq.m"));
            $(".list tr:contains("+localStorage.buildSize+") input").trigger('click');
        }
        else if(document.URL.indexOf("/step7") >= 0){
            console.log("Step 7");
            $(".list tr:contains("+localStorage.buildTechnology+") input").eq(0).trigger('click');
        }
        else if(document.URL.indexOf("/step8") >= 0){ 
            console.log("Step 8");
            $("input:text").val(localStorage.buildName);
            localStorage.buildStart = "false";
        }         
        $("input[name=next]").click();
    }
    
    if(document.URL.indexOf("/main/company/view/") >= 0){
        if ($("a[href$=unit_list]").eq(1).text().indexOf("Operating") >= 0 && $("body").text().indexOf("N#") >= 0){
            //Company main page
            console.log("Company main page");            
        }
        else if(document.URL.indexOf("/unit_list/employee") >= 0){
            //Management employee page
            console.log("Management employee page");
            setButton("Set Trainings", openTrainingWindows);
            if(localStorage.trainingCount >= 1)
                openTrainingWindows();
        }
        else if(document.URL.indexOf("/unit_list/equipment") >= 0){
            //Management equipment page 
            console.log("Management equipment page");
        }        
    }
    else if(document.URL.indexOf("/main/unit/view/") >= 0){
        if($("body:contains('Top manager efficiency')").length){
            //Main page of any subdivision
            console.log("A main page");
            seeTops();
        }
        
        var $title = $(".tabu a").text();
        if ($title.indexOf("Store") >= 0 && $("body").text().indexOf('City district') >= 0){
            //Shop main page
            console.log("Shop main page");
        }
        else if ($title.indexOf("Store") >= 0 && $("body").text().indexOf("Occupancy") >= 0){
            //Shop trade hall page
            console.log("Shop trade hall page"); 
        }
        else if ($title.indexOf("Store") >= 0 && $(".infoblock tr").text().indexOf('Estimated cost of last week purchase:') >= 0){
            //Shop supply page
            console.log("Shop supply page");
        }
        else if ($title.indexOf("Store") >= 0 && $(".non_italic_comment").text().indexOf("Suppliers not selected") >= 0){
            //Shop supply page, but no suppliers
        }
        else if($title.indexOf("Restaurant") >= 0 && $(".infoblock tr").text().indexOf('Estimated cost of last week purchase:') >= 0){
            //Restaurant supply page
            console.log("Restaurant supply page");
        }
        else if ($title.indexOf("Factory") >= 0 && $(".infoblock tr").text().indexOf('Estimated cost of last week purchase:') >= 0){
            //Factory supply page
            console.log("Factory supply page");
        }
        else if ($title.indexOf("Factory") >= 0 && $("table:contains('Change special')").length >= 1){
            //Factory sale page
            console.log("Factory sale page");
            setButton("Set Price", setFactoryPrice);
        }
        else if ($title.indexOf("Farm") >= 0 && $(".infoblock tr").text().indexOf('Estimated cost of last week purchase:') >= 0){
            //Farm supply page
            console.log("Farm supply page");
        }
        else if ($title.indexOf("Farm") >= 0 && $("table:contains('Change special')").length >= 1){
            //Farm sale page
            console.log("Farm sale page");
            setButton("Set Price", setFactoryPrice);
        }
        else if ($title.indexOf("Mill") >= 0 && $(".infoblock tr").text().indexOf('Estimated cost of last week purchase:') >= 0){
            //Mill supply page
            console.log("Mill supply page");
        }
        else if ($title.indexOf("Mill") >= 0 && $("table:contains('select recepient')").length >= 1){
            //Mill sale page
            console.log("Mill sale page");
            setButton("Set Price", setFactoryPrice);
        }
        else if ($title.indexOf("Fishing base") >= 0 && $("table:contains('select recepient')").length >= 1){
            //Fishing base sale page
            console.log("Fishing sale page");
            setButton("Set Price", setFactoryPrice);
        }
        else if ($title.indexOf("Mine") >= 0 && $("table:contains('select recepient')").length >= 1){
            //Mine sale page
            console.log("Mine sale page");
            setButton("Set Price", setFactoryPrice);
        }
        else if ($title.indexOf("Warehouse") >= 0 && $(".infoblock").text().indexOf("Fullness percentage") >= 0){
            //Warehouse main page
            console.log("Warehouse Main Page");
        }		
        else if ($title.indexOf("Warehouse") >= 0 && $(".infoblock tr").text().indexOf('Estimated cost of last week purchase:') >= 0){
            //Warehouse supply page
            console.log("Warehouse Supply Page");            
            setButton("Set Never", setWarehouseNever);
        }
        else if ($title.indexOf("Warehouse") >= 0 && $("table:contains('Specialization')").length >= 1){
            //Warehouse sale page
            console.log("Warehouse Sale Page");
        }
    }
    else if(document.URL.indexOf("/window/unit/") >= 0){
        if($("body:contains('Training duration')").length > 0){
            //Training window
            console.log("Training window");
            if(localStorage.trainingWindow === "true")
                setTraining();
       }
        else if($("body").text().indexOf("No employees at the enterprise. No one to train.") >= 0){ 
            //Wrong screen
            console.log("training but no employees");
            noWorkers();
        }
        else if($("body:contains('Expenses for hiring')").length > 0){			
            //Employees and salary window
            console.log("Salary window");
        }
        else if($(".header_all_self h3").text().indexOf("Equipment suppliers") >= 1){
            //Equipment window
            console.log("Equipment window");
        }
        else if($(".header_all_self h3").text().indexOf("Animal suppliers") >= 1){
            //Animal window
            console.log("Animal window");
        }
        else if($(".local_header h2").text() === "Select supplier"){
            //Supply window
            console.log("Supply Window");
       }
        else if($("body:contains('The products will be delivered to')").length > 0){
            //Move to warehouse window
            console.log("Move To Warehouse Window");
        }
    }
    else if(document.URL.indexOf("/main/user/privat/") >= 0){
        if(document.URL.indexOf("/message/system") >= 0){
            //Message screen
            console.log("Message screen");
        }
        if(document.URL.indexOf("/persondata/knowledge") >= 0){
            //Qualification
            console.log("Qualification screen");
        }
    }
    else if(document.URL.indexOf("/main/unit/create/") >= 0){
        if(document.URL.indexOf("/step1") >= 0 && document.URL.indexOf("/step1-type-select") === -1 || document.URL.indexOf("/step") === -1){
            console.log("start building");
            setSub();            
        }       
        else if(localStorage.buildStart === "true"){
            console.log("building");
            buildSub();
        }
    }
    
};

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);