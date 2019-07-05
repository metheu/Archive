/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5128118678354686, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.527027027027027, 500, 1500, "dest_of_the_week-2"], "isController": false}, {"data": [0.40540540540540543, 500, 1500, "dest_of_the_week-3"], "isController": false}, {"data": [0.8918918918918919, 500, 1500, "dest_of_the_week-0"], "isController": false}, {"data": [0.9628378378378378, 500, 1500, "dest_of_the_week-1"], "isController": false}, {"data": [0.9087837837837838, 500, 1500, "purchase_flight"], "isController": false}, {"data": [0.016891891891891893, 500, 1500, "dest_of_the_week-6"], "isController": false}, {"data": [0.09797297297297297, 500, 1500, "dest_of_the_week-4"], "isController": false}, {"data": [0.5033783783783784, 500, 1500, "dest_of_the_week-5"], "isController": false}, {"data": [0.016891891891891893, 500, 1500, "dest_of_the_week"], "isController": false}, {"data": [0.7913907284768212, 500, 1500, "Find_Flights"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1483, 0, 0.0, 4499.3769386378935, 59, 55031, 15106.2, 19809.6, 44543.36000000001, 20.284780259612358, 2411.1846534369915, 13.565708608037315], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["dest_of_the_week-2", 148, 0, 0.0, 2003.797297297297, 118, 28679, 6968.399999999995, 8848.849999999997, 20914.459999999854, 2.603250545275452, 73.42234277158236, 1.0270636916907057], "isController": false}, {"data": ["dest_of_the_week-3", 148, 0, 0.0, 2876.256756756757, 176, 38003, 6927.299999999998, 9632.899999999994, 33024.109999999906, 2.5912632408299046, 98.325609515889, 1.027395386500919], "isController": false}, {"data": ["dest_of_the_week-0", 148, 0, 0.0, 299.41216216216236, 65, 4041, 835.7999999999988, 1450.2999999999965, 3423.1099999999888, 2.7265525690388905, 18.995373899246513, 1.0490837033216043], "isController": false}, {"data": ["dest_of_the_week-1", 148, 0, 0.0, 211.49999999999991, 97, 982, 426.4999999999998, 631.3999999999995, 972.6899999999998, 2.7252472057009225, 79.03483033955106, 1.1151157999889516], "isController": false}, {"data": ["purchase_flight", 148, 0, 0.0, 269.2837837837839, 66, 2379, 824.9999999999995, 1066.0499999999995, 1881.1599999999908, 2.782320982084109, 26.077943761397176, 1.8682703786212473], "isController": false}, {"data": ["dest_of_the_week-6", 148, 0, 0.0, 15764.716216216215, 1168, 54957, 25275.6, 44468.6, 52759.83999999996, 2.038567493112948, 728.3260158402204, 0.7963154269972452], "isController": false}, {"data": ["dest_of_the_week-4", 148, 0, 0.0, 4711.371621621623, 425, 41945, 9177.1, 10454.949999999999, 40939.51999999998, 2.588679773315609, 315.9028690289827, 1.0238430744070524], "isController": false}, {"data": ["dest_of_the_week-5", 148, 0, 0.0, 1945.364864864865, 59, 29886, 5254.799999999997, 7682.999999999996, 21423.209999999843, 2.4909534629302366, 9.538804121433982, 0.9900566986451232], "isController": false}, {"data": ["dest_of_the_week", 148, 0, 0.0, 16475.709459459464, 1238, 55031, 29472.699999999968, 45168.499999999985, 52844.12999999996, 2.0364637082903334, 1191.8448196164431, 5.638061145510836], "isController": false}, {"data": ["Find_Flights", 151, 0, 0.0, 517.0794701986754, 124, 4543, 1302.6000000000006, 1726.6000000000004, 3876.359999999987, 2.826339235578183, 31.024037629150598, 1.3645846006625988], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1483, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
