function setUpShots() {
    d3.select("#hockey-rink")
        .select("#outside-perimeter")
        .on("click", e => {
            clickHandler(e);
        });
}

function clickHandler(e) {
    var adjustedX = (d3.pointer(e)[0] - 100).toFixed(2);
    var adjustedY = (d3.pointer(e)[1] - 42.5).toFixed(2);

    // create dot

    // https://stackoverflow.com/a/29325047
    var teamId = d3.select("input[name='home-away']:checked").property("value");
    var player = d3
        .select("#options")
        .select("#player-input")
        .property("value");

    var homeConfig = {
        name: "Home",
        color: "rgba(53, 171, 169, 0.7)",
    };
    var awayConfig = {
        name: "Away",
        color: "rgba(234, 142, 72, 0.7)",
    };

    var config = teamId === "#home-team" ? homeConfig : awayConfig;

    d3.select(teamId)
        .append("circle")
        .attr("cx", d3.pointer(e)[0])
        .attr("cy", d3.pointer(e)[1])
        .attr("r", 1.5)
        .style("fill", config.color);

    // create row
    var row = d3.select("#shot-table-body").append("tr");

    row.append("th")
        .attr("scope", "col")
        .text(
            d3
                .select("#shot-table-body")
                .selectAll("tr")
                .size()
        );
    row.append("td").text(config.name);
    row.append("td").text(player);
    row.append("td").text(adjustedX);
    row.append("td").text(adjustedY);
}

export { setUpShots };
