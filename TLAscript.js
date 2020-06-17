// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://w20.crownofthegods.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var scoutReport;

    $(document).ready(function() {
        //create a button
        var copyReportButton = "<button class='greenb tooltip tooltipstered' style='position: absolute; top: 30px; margin-left: 20px;' id='aric_copyReport'>Copy Report</button>";
        //add it to the game
        $("#reportnextbut").after(copyReportButton);

        //make the button do something
        $('#aric_copyReport').off('click');
        $('#aric_copyReport').click(function () {
            parseScoutInfo();
        });
    });

    function parseScoutInfo() {
        scoutReport = {
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
            resources: {
                wood: document.getElementById("spiedWoodnum").innerText,
                stone: document.getElementById("spiedStonenum").innerText,
                iron: document.getElementById("spiedIronnum").innerText,
                food: document.getElementById("spiedFoodnum").innerText
            }
            buildings: {
                
            }
        }
        alert(scoutReport.attacker.name);
    }

    // Parse Scout building rebort
    function parseBuildings() {
        var buildingNames = ["Forester's Hut","Cabin","Storehouse","Stone Mine","Sentinel Post","Hideaway","Farm Estate","Guardhouse","Ranger Post","Barracks","Iron Mine","Training Arena","Forum","Villa","Snag Barricade","Sawmill","Stable","Triari Post","Mason's Hut","Sorcerer's Tower","Equine Barricade","Grain Mill","Academy","Castle","Priestess Post","Rune Barricade","Temple","Smelter","Blacksmith","Ballista Post","Veiled Barricade","Port","Shipyard"];
    
        var spyTable = document.getElementById("buildSpiedtable");
        var spyBody = spyTable.getElementsByTagName("tbody");
        var spied = [];

        for (var i = 4; i < spyBody.length - 4; i += 3) {
            if (spyTd[i].title.length > 1) {
                spied.push([spyTd[i].title, spyTd[i + 1].textContent]);
            }
        }

       return spied;
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