// ==UserScript==
// @name           Pardus Building Hider
// @namespace      pardus.at
// @description    Hides sets of buildings
// @author         Rhindon
// @include        http://*.pardus.at/main.php*
// @version        1.0
// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var hide_legal_buildings	= false;
var hide_mos				= false;
var hide_planets			= false;
var hide_illegal_buildings	= true;
var hide_starbases			= false;
var hide_shipwrecks			= false;
var hide_wormholes			= false;

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

function init_building_hider() {

	imgs = document.getElementsByTagName("img");
	
	for(var i = 0; i < imgs.length; i++) {
		img = imgs[i];


		if(hide_legal_buildings) {
			if(img.src.indexOf('alliance_command_station.png') >= 0) img.style.display="none";
			if(img.src.indexOf('alliance_command_station_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('asteroid_mine.png') >= 0) img.style.display="none";
			if(img.src.indexOf('asteroid_mine_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('battleweapons_factory.png') >= 0) img.style.display="none";
			if(img.src.indexOf('battleweapons_factory_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('brewery.png') >= 0) img.style.display="none";
			if(img.src.indexOf('brewery_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('chemical_laboratory.png') >= 0) img.style.display="none";
			if(img.src.indexOf('chemical_laboratory_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('clod_generator.png') >= 0) img.style.display="none";
			if(img.src.indexOf('clod_generator_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('cybernetic_station.png') >= 0) img.style.display="none";
			if(img.src.indexOf('droid_assembly_complex.png') >= 0) img.style.display="none";
			if(img.src.indexOf('droid_assembly_complex_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('electronics_facility.png') >= 0) img.style.display="none";
			if(img.src.indexOf('electronics_facility_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('energy_well.png') >= 0) img.style.display="none";
			if(img.src.indexOf('energy_well_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('exotic_crystal_source1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('exotic_crystal_source2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('exotic_crystal_source3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('fuel_collector.png') >= 0) img.style.display="none";
			if(img.src.indexOf('fuel_collector_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('gas_collector.png') >= 0) img.style.display="none";
			if(img.src.indexOf('gas_collector_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('gem_merchant.png') >= 0) img.style.display="none";
			if(img.src.indexOf('gem_merchant_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('handweapons_factory.png') >= 0) img.style.display="none";
			if(img.src.indexOf('handweapons_factory_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('leech_nursery.png') >= 0) img.style.display="none";
			if(img.src.indexOf('leech_nursery_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('lucidi_mo.png') >= 0) img.style.display="none";
			if(img.src.indexOf('lucidi_mo_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('lucidi_station1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('lucidi_station2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('medical_laboratory.png') >= 0) img.style.display="none";
			if(img.src.indexOf('medical_laboratory_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('nebula_plant.png') >= 0) img.style.display="none";
			if(img.src.indexOf('nebula_plant_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('optics_research_center.png') >= 0) img.style.display="none";
			if(img.src.indexOf('optics_research_center_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('plastics_facility.png') >= 0) img.style.display="none";
			if(img.src.indexOf('plastics_facility_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('radiation_collector.png') >= 0) img.style.display="none";
			if(img.src.indexOf('radiation_collector_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('recyclotron.png') >= 0) img.style.display="none";
			if(img.src.indexOf('recyclotron_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('research_station.png') >= 0) img.style.display="none";
			if(img.src.indexOf('robot_factory.png') >= 0) img.style.display="none";
			if(img.src.indexOf('robot_factory_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('smelting_facility.png') >= 0) img.style.display="none";
			if(img.src.indexOf('smelting_facility_federation.png') >= 0) img.style.display="none";
			if(img.src.indexOf('smelting_facility_federation_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('smelting_facility_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('space_farm.png') >= 0) img.style.display="none";
			if(img.src.indexOf('space_farm_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('trade_outpost.png') >= 0) img.style.display="none";
			if(img.src.indexOf('trade_outpost_tradeoff.png') >= 0) img.style.display="none";
		}

		if(hide_mos) {
			if(img.src.indexOf('military_outpost.png') >= 0) img.style.display="none";
			if(img.src.indexOf('military_outpost_federation.png') >= 0) img.style.display="none";
			if(img.src.indexOf('military_outpost_federation_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('military_outpost_tradeoff.png') >= 0) img.style.display="none";
		}

		if(hide_planets) {
			if(img.src.indexOf('planet_a.png') >= 0) img.style.display="none";
			if(img.src.indexOf('planet_d.png') >= 0) img.style.display="none";
			if(img.src.indexOf('planet_g.png') >= 0) img.style.display="none";
			if(img.src.indexOf('planet_i.png') >= 0) img.style.display="none";
			if(img.src.indexOf('planet_m.png') >= 0) img.style.display="none";
			if(img.src.indexOf('planet_r.png') >= 0) img.style.display="none";
		}

		if(hide_illegal_buildings) {
			if(img.src.indexOf('dark_dome.png') >= 0) img.style.display="none";
			if(img.src.indexOf('dark_dome_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('dark_harbor.png') >= 0) img.style.display="none";
			if(img.src.indexOf('drug_station.png') >= 0) img.style.display="none";
			if(img.src.indexOf('drug_station_tradeoff.png') >= 0) img.style.display="none";
			if(img.src.indexOf('hidden_laboratory.png') >= 0) img.style.display="none";
			if(img.src.indexOf('slave_camp.png') >= 0) img.style.display="none";
			if(img.src.indexOf('slave_camp_tradeoff.png') >= 0) img.style.display="none";
		}

		if(hide_starbases) {
			if(img.src.indexOf('pardus_station1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f0_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f0_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f0_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f0_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f1_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f1_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f1_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f1_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f2_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f2_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f2_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f2_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f3_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f3_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f3_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_f3_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p0_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p0_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p0_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p0_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p1_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p1_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p1_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p1_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p2_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p2_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p2_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p2_s4.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p3_s1.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p3_s2.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p3_s3.png') >= 0) img.style.display="none";
			if(img.src.indexOf('starbase_p3_s4.png') >= 0) img.style.display="none";
		}
			
		if(hide_shipwrecks) {
			if(img.src.indexOf('wreck_001.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_002.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_003.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_004.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_050.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_051.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_052.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_053.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_054.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_055.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_056.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_057.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_058.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_059.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_150.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_151.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_152.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_153.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_154.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_155.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_156.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wreck_225.png') >= 0) img.style.display="none";
		}

		if(hide_wormholes) {
			if(img.src.indexOf('wormhole.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wormholeseal_closed.png') >= 0) img.style.display="none";
			if(img.src.indexOf('wormholeseal_open.png') >= 0) img.style.display="none";
			if(img.src.indexOf('xhole.png') >= 0) img.style.display="none";
			if(img.src.indexOf('yhole.png') >= 0) img.style.display="none";
		}
	}
}


init_building_hider();