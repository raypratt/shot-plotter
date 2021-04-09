import { getOptionsList } from "../options/options.js";
import { createDot } from "./dot.js";
import { cfg } from "./config.js";

function setUpLegend() {
    var options = getOptionsList();
    var div = d3.select("#legend").append("div");
    div.append("div")
        .attr("class", "center")
        .append("svg")
        .attr("id", "shot-type-legend");

    shotTypeLegend();

    div.append("div")
        .attr("class", "center")
        .append("svg")
        .attr("id", "team-legend");

    teamLegend();
}

function shotTypeLegend(id = "#shot-type-legend") {
    var xOffset = 2 * cfg.legendR;
    var yOffset = 2 * cfg.legendR;
    var spacing = 2 * cfg.legendR;
    var options = getOptionsList();
    var svg = d3.select(id);

    // clear svg
    svg.selectAll("*").remove();

    for (let option of options) {
        var data = {
            teamId: true,
            player: "",
            type: option,
            coords: [xOffset, 0.625 * yOffset],
            id: xOffset,
            legendBool: true,
        };
        createDot(id, data);
        xOffset += spacing;
        xOffset +=
            svg
                .append("text")
                .attr("x", xOffset)
                .attr("y", yOffset)
                .text(option)
                .node()
                .getComputedTextLength() +
            2 * spacing;
    }

    svg.attr("width", xOffset).attr("height", 2 * yOffset);
}

function teamLegend(id = "#team-legend") {
    var xOffset = 2 * cfg.legendR;
    var yOffset = 2 * cfg.legendR;
    var spacing = 2 * cfg.legendR;
    var svg = d3.select(id);

    // clear svg
    svg.selectAll("*").remove();

    for (let i of [
        ["blue-shot", d3.select("#blue-team-name").property("value")],
        ["orange-shot", d3.select("#orange-team-name").property("value")],
    ]) {
        svg.append("rect")
            .attr("x", xOffset - cfg.legendR)
            .attr("y", 0.25 * yOffset)
            .attr("width", 2 * cfg.legendR)
            .attr("height", 2 * cfg.legendR)
            .attr("class", i[0])
            .style("stroke-width", "0.02em");
        xOffset += spacing;
        xOffset +=
            svg
                .append("text")
                .attr("x", xOffset)
                .attr("y", yOffset)
                .text(i[1])
                .node()
                .getComputedTextLength() +
            2 * spacing;
    }
    svg.attr("width", xOffset).attr("height", 2 * yOffset);
}

export { setUpLegend, shotTypeLegend, teamLegend };
