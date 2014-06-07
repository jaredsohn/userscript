// ==UserScript==
// @name        Ikariam Fluid Dock Menu
// @namespace   http://fluidapp.com
// @description Gives you right click options in your dock icon. For Fluid... User must edit script with the name of the server they are playing on.
// @include     http://*.ikariam.*/*
// @author      Kahil Young
// ==/UserScript==

var alpha = "s1.ikariam.com";
var beta = "s2.ikariam.com";
var gamma = "s3.ikariam.com";
var delta = "s4.ikariam.com";
var epsilon = "s5.ikariam.com";
var zeta = "s6.ikariam.com";
var eta = "s7.ikariam.com";
var theta = "s8.ikariam.com";
var iota = "s9.ikariam.com";
var kappa = "s10.ikariam.com";
var rho = "s17.ikariam.net";

// Replace the sections below that are in all CAPS with the server you play on.

var world = "s17.ikariam.net";


(function () {
   window.fluid.addDockMenuItem("Visit your City Advisor", function() { window.location.href = "http://" + world + "/index.php?view=tradeAdvisor&oldView=city" })
   window.fluid.addDockMenuItem("Visit your Military Advisor", function() { window.location.href = "http://" + world + "/index.php?view=militaryAdvisorMilitaryMovements&oldView=city" })
   window.fluid.addDockMenuItem("Visit your Reasearch Advisor", function() { window.location.href = "http://" + world + "/index.php?view=researchAdvisor&oldView=city" })
   window.fluid.addDockMenuItem("Visit your Diplomacy Advisor", function() { window.location.href = "http://" + world + "/index.php?view=diplomacyAdvisor&oldView=city" })
   window.fluid.addDockMenuItem(sepr8)
   window.fluid.addDockMenuItem("Transport goods to " + city1Name, function() { window.location.href = "http://" + world + "/index.php?view=transport&destinationCityId=" + city1 })
   window.fluid.addDockMenuItem("Deploy troops to " + city1Name, function() { window.location.href = "http://" + world + "/index.php?view=deployment&deploymentType=army&destinationCityId=" + city1 })
   window.fluid.addDockMenuItem("Deploy fleets to " + city1Name, function() { window.location.href = "http://" + world + "/index.php?view=deployment&deploymentType=fleet&destinationCityId=" + city1 })
   window.fluid.addDockMenuItem(sepr8)
   window.fluid.addDockMenuItem("Transport goods to " + city2Name, function() { window.location.href = "http://" + world + "/index.php?view=transport&destinationCityId=" + city2 })
   window.fluid.addDockMenuItem("Deploy troops to " + city2Name, function() { window.location.href = "http://" + world + "/index.php?view=deployment&deploymentType=army&destinationCityId=" + city2 })
   window.fluid.addDockMenuItem("Deploy fleets to " + city2Name, function() { window.location.href = "http://" + world + "/index.php?view=deployment&deploymentType=fleet&destinationCityId=" + city2 })
   window.fluid.addDockMenuItem(sepr8)
   window.fluid.addDockMenuItem("Transport goods to " + city3Name, function() { window.location.href = "http://" + world + "/index.php?view=transport&destinationCityId=" + city3 })
   window.fluid.addDockMenuItem("Deploy troops to " + city3Name, function() { window.location.href = "http://" + world + "/index.php?view=deployment&deploymentType=army&destinationCityId=" + city3 })
   window.fluid.addDockMenuItem("Deploy fleets to " + city3Name, function() { window.location.href = "http://" + world + "/index.php?view=deployment&deploymentType=fleet&destinationCityId=" + city3 })
})();