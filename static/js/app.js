// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Function to build the table
function buildTable(data){
    // Clear out any previous data from the table
    tbody.html("");
    
    // Loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val)=> {
            let cell = row.append("td");
            // Set the value of the key,value pair to the cell
            cell.text(val);
        });
    });
};

// Variable to hold inserted filters 
var filters = [];

// Extract inserted filters and call the filterTable function
function updateSelectedFilters(){

    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");

    filters = [];

    if (date){
        // Add filter and corresponding id to the filter list
        filters.push({id:"datetime", value:date})
    }
    if (city){
        // Add filter and corresponding id to the filter list
        filters.push({id:"city", value:city})
    }
    if (state){
        // Add filter and corresponding id to the filter list
        filters.push({id:"state", value:state})
    }
    if (country){
        // Add filter and corresponding id to the filter list
        filters.push({id:"country", value:country})
    }
    if (shape){
        // Add filter and corresponding id to the filter list
        filters.push({id:"shape", value:shape})
    }

       
    filterTable();
}

// Apply filters to the table
function filterTable(){
    let filteredData = tableData;
    // Loop through each stored filter and apply to the corresponding column
    filters.forEach((filter) => 
        filteredData = filteredData.filter(row => row[filter.id] === filter.value));
    if (filteredData.length == 0){
        d3.select("#note").text("/!\\ No data found. Try other filters");
    }else{
        d3.select("#note").text("");
    }
    buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", updateSelectedFilters);

// Build the table when the page loads
buildTable(tableData);