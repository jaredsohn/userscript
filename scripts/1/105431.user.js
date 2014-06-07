// ==UserScript==
// @name           form fill
// @namespace      classes and careers
// @include        http://www.classesandcareers.com/schooldegrees/*
// @include        http://dev.classesandcareers.com/schooldegrees/*
// ==/UserScript==

var body = document.body;
var form = document.forms[0];
var elements = form.elements;

var fill_button = document.createElement('div');
var button_style = fill_button.style;
fill_button.innerHTML = 'Auto-Fill';
fill_button.id = 'auto_fill';
button_style.padding = '10px';
button_style.width = '50px';
button_style.backgroundColor = '#cccccc';
button_style.marginLeft = '20px';
button_style.marginBottom = '15px';
button_style.borderRadius = '4px';
button_style.cursor = 'pointer';
button_style.position = 'absolute';
button_style.top = '10px';
button_style.right = '300px';
button_style.border = '2px solid #fff';
button_style.paddingRight = '17px';

body.appendChild(fill_button);

fill_button.addEventListener('click', function fill(event) {
    
var first_name = new Array('Tom','Oprah','Tiger','Steven','Howard','Dan','Bruce','Donald','Muhammad','Paul','George','Elton','David','Phil','Brad','Peter','Jay','Celine','Kobe','Michael','Johnny','Jerry','Simon','Tom','Rush','Denzel','Jennifer','Angelina','Nicole','Rod','Shaquille','Jessica','LeBron','Neil','Alex','Will','George','Ray','Paris','Adam','Darek','Cameron');
var last_name = new Array('Cruise','Winfrey','Woods','Spielberg','Stern','Brown','Sprinsteen','Trump','Ali','McCartney','Lucas','John','Letterman','Mickelson','Rowling','Pitt','Jackson','Leno','Dion','Bryant','Jordan','Depp','Seinfeld','Cowell','Hanks','Limbaugh','Washington','Aniston','Jolie','Kidman','Stewart','O\'neal','Beckham','Simpson','James','Diamond','Rodriguez','Smith','Romano','Hilton','Sandler','Jeter','Diaz'); 

var form = document.forms[0];
var elements = form.elements;
var gaos = document.getElementById('gaos');
var poly_gaos = document.getElementsByName('gaos[]');
if(gaos){
    var gaos_random = Math.round(Math.random() * gaos.length);
}
var aos = document.getElementsByName('edu_area_of_study');
aos_select = aos[0];

    for(var i in elements){
        
        //select box
        if(elements[i].type == 'select-one'){
            var random = Math.round(Math.random() * elements[i].length);
            if(elements[i].name == 'gaos'){
                elements[i].selectedIndex = gaos_random;
                setTimeout("aoschange('"+gaos_random+"')", 10);
                setTimeout(function(){
                var aos_rand = Math.round(Math.random() * aos_select.length);
                aos_select.selectedIndex = aos_rand;
                }, 100);
                
            }else{
                elements[i].selectedIndex = random;
                if(elements[i].value == ''){
                   elements[i].selectedIndex++;    
                }   
            }
        }
        
        if(elements[i].type == 'radio'){
            elements[i].checked = true;
            if(elements[i].name == 'citizenship' && value == 'US'){
                elements[i].checked = true;
            }
        }
        
        if(elements[i].name == 'zipcode'){
            var zips = new Array('35062','99649','85013','71758','90039','80211','06360','19966','20036','32304','30103','96755','83261','60130','46075','50117','66092','40176','70437','04040','20678','01107','48076','55068','38664','63051','59256','68144','89317','03102','07077','87104','10455','27260','58078','43204','73056','97065','15060','02885','57105','37101','75143','84004','84112','05252','22102','98040','24966','53050','82604');
            var random = Math.round(Math.random() * (zips.length));
            elements[i].value = zips[random];
        }
        
        if(elements[i].name == 'email1'){
             var first = Math.round(Math.random() * (first_name.length -1));
             var last = Math.round(Math.random() * (last_name.length - 1));
             var email = first_name[first] + '@' + last_name[last] + '.com'; 
             elements[i].value = email;
        }
        
        if(elements[i].name == 'first_name'){
            var first = Math.round(Math.random() * (first_name.length -1));
            elements[i].value = first_name[first];
        }
        
        if(elements[i].name == 'last_name'){
            var last = Math.round(Math.random() * (last_name.length -1));
            elements[i].value = 'Testing';
        }
        
        if(elements[i].name == 'address_1'){
            var street_type = new Array('Ave','St','Blvd','Rd','Drive','Circle');
            var street = Math.round(Math.random() * street_type.length);
            var num = Math.round(Math.random() * 9999);
            var last = Math.round(Math.random() * (last_name.length -1));
            var name = last_name[last];
            elements[i].value = num + ' ' + name + ' ' + street_type[street];
        }
        
        if(elements[i].name == 'city'){
            var name = Math.round(Math.random() * (last_name.length));
            var city = first_name[name] + 'ville';
            elements[i].value = city;
        }
        
        if(elements[i].name == 'home_phone' || elements[i].name == 'work_phone'){
            elements[i].value = '(801) 867-5309';
        }
        
        if(elements[i].type == 'checkbox' && elements[i].name != 'gaos[]' && elements[i].name != ''){
            elements[i].checked = true;
        }
        
        if(elements[i].type == 'text' && elements[i].value == '' && elements[i].name != 'address_2'){
            var company = Math.round(Math.random() * (last_name.length -1));
            elements[i].value = last_name[company] + ' Industries';
        }
        
        if(elements[i].name == 'gaos[]'){
            var num = poly_gaos.length;
            var num_choices = Math.round(Math.random() * 5);
            if(num_choices < 2 && elements[i].id != 'idontknow'){
                elements[i].checked = true;
            }else{
                elements[i].checked = false;
            }
        }
    
    } 
    
    //setTimeout('document.forms[0].submit()', 200);   

}, true);