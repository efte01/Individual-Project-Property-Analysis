const deposit_input = document.getElementById('deposit_input')
const mortgage_fees_input = document.getElementById('mortgage_fees_input')
const survey_input = document.getElementById('survey_input')
const conveyancing_input = document.getElementById('conveyancing_input')
const stamp_duty_input = document.getElementById('stamp_duty_input')
const refurbishment_input = document.getElementById('refurbishment_input')
const void_costs_input = document.getElementById('void_costs_input')

const mortgage_repayments_input = document.getElementById('mortgage_repayments_input')
const building_insurance_input = document.getElementById('building_insurance_input')
const contents_insurance_input = document.getElementById('contents_insurance_input')
const maintenance_costs_input = document.getElementById('maintenance_costs_input')
const agent_fees_input = document.getElementById('agent_fees_input')
const ground_rent_input = document.getElementById('ground_rent_input')
const service_charge_input = document.getElementById('service_charge_input')
const gas_safety_certificate_input = document.getElementById('gas_safety_certificate_input')
const other_input = document.getElementById('other_input')

const monthly_rent_input = document.getElementById('monthly_rent_input')
const annual_rent_input = document.getElementById('annual_rent_input')

deposit_input.addEventListener('change', listen_for_change)
mortgage_fees_input.addEventListener('change', listen_for_change)
survey_input.addEventListener('change', listen_for_change)
conveyancing_input.addEventListener('change', listen_for_change)
stamp_duty_input.addEventListener('change', listen_for_change)
refurbishment_input.addEventListener('change', listen_for_change)
void_costs_input.addEventListener('change', listen_for_change)

mortgage_repayments_input.addEventListener('change', listen_for_change)
building_insurance_input.addEventListener('change', listen_for_change)
contents_insurance_input.addEventListener('change', listen_for_change)
maintenance_costs_input.addEventListener('change', listen_for_change)
agent_fees_input.addEventListener('change', listen_for_change)
ground_rent_input.addEventListener('change', listen_for_change)
service_charge_input.addEventListener('change', listen_for_change)
gas_safety_certificate_input.addEventListener('change', listen_for_change)
other_input.addEventListener('change', listen_for_change)

monthly_rent_input.addEventListener('change', listen_for_change)
annual_rent_input.addEventListener('change', listen_for_change)

// Create a Blank graph with default values
var ctx = document.getElementById('myChart');
var xValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
var yValues = [-62700, -58770, -54840, -50910, -46980, -43050, -39120, -35190, -31260, -27330, -23400, -19470, -15540, -11610, -7680, -3750, 180, 4110, 8040, 11970, 15900, 19830, 23760, 27690, 31620, 35550, 39480, 43410, 47340, 51270];
var html_chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: xValues,
        datasets: [
            {
                fill: false,
                backgroundColor: "rgba(255,0,0,1)",
                borderColor: "rgba(255,0,0,1)",
                pointBackgroundColor: "rgba(255,255,255,1)",
                borderWidth: 0.5,
                data: yValues
            },
            {
                fill: false,
                backgroundColor: "rgba(255,0,0,0.5)",
                borderColor: "rgba(255,0,0,0.5)",
                pointBackgroundColor: "rgba(255,255,255,1)",
                data: yValues
            },
            {
                fill: false,
                backgroundColor: "rgba(255,0,0,0.2)",
                borderColor: "rgba(255,0,0,0.2)",
                pointBackgroundColor: "rgba(255,255,255,1)",
                data: yValues
            }
        ]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [
                {ticks: {min: -62700, max:62700}}],
        }
    }
});

function listen_for_change(event) {
    event.preventDefault()

    const var_one = create_results()
    const var_two = create_data(var_one)

    addData(html_chart,var_two)
    updateRange(html_chart)
    updateLineColors(html_chart)
    removeData(html_chart)
    update_table()
}

function total_initial_cost() {
    return (parseInt(deposit_input.value) + parseInt(mortgage_fees_input.value) +
        parseInt(survey_input.value) + parseInt(conveyancing_input.value) + parseInt(stamp_duty_input.value) +
        parseInt(refurbishment_input.value) + parseInt(void_costs_input.value))*-1
}
function annual_cost() {
    return (parseInt(mortgage_repayments_input.value) + parseInt(building_insurance_input.value) +
        parseInt(contents_insurance_input.value) + parseInt(maintenance_costs_input.value) + parseInt(agent_fees_input.value) +
        parseInt(ground_rent_input.value) + parseInt(service_charge_input.value) + parseInt(gas_safety_certificate_input.value) + parseInt(other_input.value))*-1
}
function total_income() {
    return parseInt(annual_rent_input.value)
}

function create_results() {
    var cumalitive_array = []
    while (cumalitive_array.length > 0) {
        cumalitive_array.pop()
    }
    cumalitive_array.push(total_initial_cost())
    for (let i = 0; i < 29; i++) {
        cumalitive_array.push(cumalitive_array[i]+total_income()+annual_cost())
    }
    return cumalitive_array
}
function create_data(results) {
    return {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(255,0,0,100)",
        borderColor: "rgba(255,0,0,100)",
        data: results
    }
}
function addData(chart, data) {
    chart.data.datasets.unshift(data);
    chart.update();
}
function removeData(chart) {
    chart.data.datasets.pop()
    chart.update();
}
function updateRange(chart) {
    let largest_y_range = 0 // Settings a suitable y range
    for (let i = 0; i < 3; i++) {
        if (chart.data.datasets[i].data.length !== 0) {
            if (Math.min.apply(null, chart.data.datasets[i].data) * -1 > largest_y_range) {
                largest_y_range = Math.min.apply(null, chart.data.datasets[i].data) * -1
            }
            if (Math.max.apply(null, chart.data.datasets[i].data) > largest_y_range) {
                largest_y_range = Math.max.apply(null, chart.data.datasets[i].data)
            }
        }
    }

    chart.options = {
        legend: {display: false},
        scales: {
            yAxes: [{ticks: {min: (largest_y_range * -1), max: largest_y_range}}],
        }
    }
    chart.update();
}
function updateLineColors(chart) {
    chart.data.datasets[0].backgroundColor = "rgba(255,0,0,1)"
    chart.data.datasets[0].borderColor = "rgba(255,0,0,1)"
    chart.data.datasets[0].pointBackgroundColor= "rgba(255,255,255,1)"

    chart.data.datasets[1].backgroundColor = "rgba(255,0,0,0.5)"
    chart.data.datasets[1].borderColor = "rgba(255,0,0,0.5)"
    chart.data.datasets[1].pointBackgroundColor= "rgba(255,255,255,0.5)"

    chart.data.datasets[2].backgroundColor = "rgba(255,0,0,0.2)"
    chart.data.datasets[2].borderColor = "rgba(255,0,0,0.2)"
    chart.data.datasets[2].pointBackgroundColor= "rgba(255,255,255,0.2)"
    chart.update();
}

var div = document.createElement("div")
div.id = "container"
div.className ="d-flex justify-content-left"
document.getElementsByTagName('body')[0].appendChild(div);

// Create a table, with a 'thead', and blank 'tbody'. the loop will then create a 'tr' and then all the 'th' + 'td' attributes
var table_class = document.createElement("table")
table_class.className = "table table-active flex justify-content-center";
table_class.style = "color:white; margin: 100px 0 100px 0; width: auto;"
table_class.id = "table_id"
table_class.style.display = "block"
document.querySelector('#container').appendChild(table_class);


const thead_html = `<thead><tr class="table-active"><th scope="col">DEPOSIT</th><th scope="col">MORTGAGE FEES</th><th scope="col">SURVEY</th><th scope="col">CONVEYANCING</th>
    <th scope="col">STAMP DUTY</th><th scope="col">REFURBISHMENT</th><th scope="col">VOID COSTS</th><th scope="col">MORTGAGE REPAYMENTS</th><th scope="col">BUILDING INSURANCE</th>
    <th scope="col">CONTENTS INSURANCE</th><th scope="col">MAINTENANCE COSTS</th><th scope="col">AGENT FEES</th><th scope="col">GROUND RENT</th><th scope="col">SERVICE CHARGE</th>
    <th scope="col">GAS SAFETY CERTIFICATE</th><th scope="col">OTHER</th><th scope="col">MONTHLY RENT</th><th scope="col">ANNUAL RENT</th></tr></thead>`
const table_class_id = document.querySelector('#table_id')
table_class_id.insertAdjacentHTML("beforeend",thead_html)

var tbody_class = document.createElement("tbody")
tbody_class.id = "names";
document.getElementsByTagName('table')[0].appendChild(tbody_class);
const names_id = document.querySelector('#names')

create_blank_table()

function create_blank_table() {
    const title = `
        <thead>
            <tr class="table-active">
                <th scope="col">` + deposit_input.value + `</th>
                <th scope="col">` + mortgage_fees_input.value + `</th>
                <th scope="col">` + survey_input.value + `</th>
                <th scope="col">` + conveyancing_input.value + `</th>
                <th scope="col">` + stamp_duty_input.value + `</th>
                <th scope="col">` + refurbishment_input.value + `</th>
                <th scope="col">` + void_costs_input.value + `</th>
                <th scope="col">` + mortgage_repayments_input.value + `</th>
                <th scope="col">` + building_insurance_input.value + `</th>
                <th scope="col">` + contents_insurance_input.value + `</th>
                <th scope="col">` + maintenance_costs_input.value + `</th>
                <th scope="col">` + agent_fees_input.value + `</th>
                <th scope="col">` + ground_rent_input.value + `</th>
                <th scope="col">` + service_charge_input.value + `</th>
                <th scope="col">` + gas_safety_certificate_input.value + `</th>
                <th scope="col">` + other_input.value + `</th>
                <th scope="col">` + monthly_rent_input.value + `</th>
                <th scope="col">` + annual_rent_input.value + `</th>
            </tr>
        </thead>`
    names_id.insertAdjacentHTML("beforeend",title)
    names_id.insertAdjacentHTML("beforeend",title)
    names_id.insertAdjacentHTML("beforeend",title)
}

function update_table(){
    const title = `
        <thead>
            <tr class="table-active">
                <th scope="col">` + deposit_input.value + `</th>
                <th scope="col">` + mortgage_fees_input.value + `</th>
                <th scope="col">` + survey_input.value + `</th>
                <th scope="col">` + conveyancing_input.value + `</th>
                <th scope="col">` + stamp_duty_input.value + `</th>
                <th scope="col">` + refurbishment_input.value + `</th>
                <th scope="col">` + void_costs_input.value + `</th>
                <th scope="col">` + mortgage_repayments_input.value + `</th>
                <th scope="col">` + building_insurance_input.value + `</th>
                <th scope="col">` + contents_insurance_input.value + `</th>
                <th scope="col">` + maintenance_costs_input.value + `</th>
                <th scope="col">` + agent_fees_input.value + `</th>
                <th scope="col">` + ground_rent_input.value + `</th>
                <th scope="col">` + service_charge_input.value + `</th>
                <th scope="col">` + gas_safety_certificate_input.value + `</th>
                <th scope="col">` + other_input.value + `</th>
                <th scope="col">` + monthly_rent_input.value + `</th>
                <th scope="col">` + annual_rent_input.value + `</th>
            </tr>
        </thead>`
    names_id.insertAdjacentHTML("afterbegin",title)
    names_id.removeChild(names_id.lastElementChild);
}