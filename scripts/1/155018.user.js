// ==UserScript==
// @name       G-Project
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @match https://myportal.fiu.edu/*
// @match https://my.fiu.edu/*
// @match https://psprod.fiu.edu/*
// @description For something sneaky.
// @copyright  2012+, Miguel Chateloin
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
jQuery(document).ready( function($){
    var gradeOfA = "A";
    var gradeOfB = "B";
    var gradeOfC = "C";
    var gradeOfD = "D";
    var gradeOfF = "F";
    
    
    setInterval(function() {
        $(".PSLEVEL1GRID tr:nth-child(4)").hide();
        var studentName = $("#DERIVED_SSTSNAV_PERSON_NAME");
        var programmingTwoGrade = "A";
        var calcOneGrade = "B";

        var gradeNumber = 0;
        $("#ACE_DERIVED_SSS_GRD_GROUPBOX2 .PABOLDTEXT").each(function(gradeNumber){
            console.log( "Grade: " + $(this).text() );
            switch(gradeNumber)
            {
                case 0:
                    break;
                case 1:
                    $(this).text(programmingTwoGrade);
                    break;
                case 2:
                    break;
                case 3:
                    $(this).text(calcOneGrade);
                    break;
                case 4:
                    break;
                default:
                    break;
            }
        });
        /*
        var basisNumber = 0;
        $("#ACE_DERIVED_SSS_GRD_GROUPBOX2 .PSEDITBOX_DISPONLY").each(function(basisNumber){
            if ( basisNumber == 2 || basisNumber == 6 || basisNumber == 10 || basisNumber == 14 )
            {
                $(this).text("Graded");
            }
            if ( basisNumber == 7 )
            {
                $(this).text("16.000");
            }
            if ( basisNumber == 15 )
            {
                $(this).text("4.000");
            }
            
        });
        
        var boxNumber = 0;
        $("#ACE_DERIVED_SSS_GRD_GROUPBOX4 .PSEDITBOXLABEL").each(function(boxNumber){
            if ( boxNumber == 5 || boxNumber == 7 || boxNumber == 9 )
            {
                $(this).text("3.296");
            }
            
        });
        
        var boxNumber = 0;
        $("#ACE_DERIVED_SSS_GRD_GROUPBOX4 .PSEDITBOX_DISPONLY").each(function(boxNumber){
            
            //$(this).text("#" + boxNumber );
            
            if ( boxNumber == 12 || boxNumber == 14 || boxNumber == 16 || boxNumber == 63 || boxNumber == 65 || boxNumber == 67 )
            {
                $(this).text("14.000");
            }
            if ( boxNumber == 18 || boxNumber == 20 || boxNumber == 22 )
            {
                $(this).text("11.000");
            }
            if ( boxNumber == 35 || boxNumber == 37 || boxNumber == 39 )
            {
                $(this).text("");
            }
            if ( boxNumber == 58 || boxNumber == 60 || boxNumber == 62 )
            {
                $(this).text("44.000");
            }
            
            
        });
        */
        
        
        //console.log(  $("#ACE_DERIVED_SSS_GRD_GROUPBOX2 .PSLEVEL1GRIDODDROW").text() );
        
        //geologyGrade.remove();
        //discretemathGrade.remove();
	}, 100);
    
});