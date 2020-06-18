// ==UserScript==
// @name         aricneto's Report+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds new features and calculations to CoTG scouting reports
// @author       aricneto
// @match        https://*.crownofthegods.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    $(document).ready(function() {
        //create a button
        var copyReportButton = "<button class='greenb tooltip tooltipstered' style='position: absolute; top: 30px; margin-left: 20px;' id='aric_copyReport'>Copy Report</button>";
        //add it to the game
        $("#reportnextbut").after(copyReportButton);

        //make the button do something
        $('#aric_copyReport').off('click');
        $('#aric_copyReport').click(function () {
            parseScoutInfo().toStringParsing();
        });
    });

    function parseScoutInfo() {
        let scoutReport = {
            reportSubject: document.getElementById("reportSubject").innerText,
            reportDate: document.getElementById("reportDate").innerText,
            success: { 
                units: document.getElementById("unitscoutre").innerText,
                resources: document.getElementById("resscoutre").innerText,
                buildings: document.getElementById("buildscoutre").innerText,
                fortifications: document.getElementById("battlementscoutre").innerText,
            },
            attacker: {
                name: document.getElementById("reportattackerplayer").innerText,
                city: document.getElementById("reportattackercity").innerText,
                continent: document.getElementById("reportattackercont").innerText,
                coords: document.getElementById("reportattackercoords").innerText,
            },
            defender: {
                name: document.getElementById("reportdefenderplayer").innerText,
                city: document.getElementById("reportdefendercity").innerText,
                continent: document.getElementById("reportdefendercont").innerText,
                coords: document.getElementById("reportdefendercoords").innerText,
            },
            resources: {
                wood: document.getElementById("spiedWoodnum").innerText.replace(/,/g, ""),
                stone: document.getElementById("spiedStonenum").innerText.replace(/,/g, ""),
                iron: document.getElementById("spiedIronnum").innerText.replace(/,/g, ""),
                food: document.getElementById("spiedFoodnum").innerText.replace(/,/g, "")
            },
            buildings: parseBuildings(),
            // toStringFormatted: function () {
                // var builds = [];
                // for (let i = 0; i < simpleBuildingNames.length; i++) {
                    // builds[i] = [simpleBuildingNames[i], this.buildings[i],"","",""]
                // }
                // let csvContent = "";
                // 
                // let rows = [
                    // ["subject", this.reportSubject,"","",""],
                    // ["date", this.reportDate,"","",""],
                    // ["success", "units", "resources", "buildings", "fortifications"],
                    // ["success", this.success.units, this.success.resources, this.success.buildings, this.success.fortifications],
                    // ["attacker", this.attacker.name, this.attacker.city, this.attacker.continent, this.attacker.coords],
                    // ["defender", this.defender.name, this.defender.city, this.defender.continent, this.defender.coords],
                    // ["resources", "wood", "stone", "iron", "food"],
                    // ["resources", this.resources.wood, this.resources.stone, this.resources.iron, this.resources.food],
                    // ["buildings", "total level","","",""]
                // ];
// 
                // builds.forEach(function (building) {
                    // rows.push(building);
                // });
// 
                // rows.forEach(function(rowArray) {
                    // let row = rowArray.join(",");
                    // csvContent += row + "\r\n";
                // });
// 
                // navigator.clipboard.writeText(csvContent);
            // },
            toStringParsing: function () { // unformatted string for easier parsing with excel sheets (single line)
                var builds = [];
                for (let i = 0; i < simpleBuildingNames.length; i++) {
                    var building = this.buildings[i];
                    builds[i] = [building != undefined ? building : ""];
                }
                
                let csvContent = [
                    "START",
                    this.reportDate,
                    this.success.units, this.success.resources, this.success.buildings, this.success.fortifications,
                    this.attacker.name, this.attacker.city, this.attacker.continent, this.attacker.coords,
                    this.defender.name, this.defender.city, this.defender.continent, this.defender.coords,
                    this.resources.wood, this.resources.stone, this.resources.iron, this.resources.food,
                    builds,
                    "END"
                ];

                navigator.clipboard.writeText(csvContent.join(","));
            }
        }
        return scoutReport;
    }

    var buildingNames = ["Forester\'s Hut","Cabin","Storehouse","Stone Mine","Sentinel Post","Hideaway","Farm Estate","Guard House","Ranger Post","Barracks","Iron Mine","Training Arena","Forum","Villa","Snag Barricade","Sawmill","Stable","Triari Post","Mason\'s Hut","Sorcerer\’s Tower","Equine Barricade","Grain Mill","Academy","Castle","Priestess Post","Rune Barricade","Temple","Smelter","Blacksmith","Ballista Post","Veiled Barricade","Port","Shipyard", "City Wall", "Basilica"];

    var simpleBuildingNames = ["foresterHut", "cabin", "storehouse", "stoneMine", "sentinelPost", "hideaway", "farmEstate", "guardhouse", "rangerPost", "barracks", "ironMine", "trainingArena", "forum", "villa", "snagBarricade", "sawmill", "stable", "triariPost", "masonHut", "sorcererTower", "equineBarricade", "grainMill", "academy", "castle", "priestessPost", "runeBarricade", "temple", "smelter", "blacksmith", "ballistaPost", "veiledBarricade", "port", "shipyard"];

    // Parse Scout building rebort
    function parseBuildings() {
        let buildings = [];
    
        let spyTable = document.getElementById("buildSpiedtable").getElementsByTagName("tbody");

        for (let entry of spyTable) {
            let tags = entry.getElementsByTagName("td");
            if (tags.length == 2 && tags[1].id == "buildSpiedTotLev") {
                var i = buildingNames.indexOf(tags[0].title);
                if (i != undefined) {
                    buildings[i] = tags[1].innerText;
                }
            }
        }

       return buildings;
    }

    
    // Turns array onto csv and writes it into clipboard
    function toCsv(infoArray) {
        var csvContent = "";

        infoArray.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        // Write to clipboard
        navigator.clipboard.writeText(csvContent);

        return csvContent;
    }

})();