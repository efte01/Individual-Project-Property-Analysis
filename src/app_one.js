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

function listen_for_change(event) {
    event.preventDefault()

    insert_var_data()
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

function create_array() {
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

function insert_var_data() {
    try{
        var xValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
        const yValues = create_array()
        var myChart = new Chart(document.getElementById("myChart"), {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues
                }]
            },
            options: {
                legend: {display: true},
                scales: {
                    yAxes: [{ticks: {min: 6, max:16}}],
                }
            }
        })

        myChart.update()
        console.log("updating chart")
    }catch (err)
    {
        console.log(err)
    }
}

function formSubmitted(event) {
    event.preventDefault()

    getSearchResults(searchTerm)
        .then(showResults);
}// Get input value and push through to next function

function getSearchResults(searchTerm) {
    const searchTerm2 = searchTerm.replace(/ /g, '+')+"4"; // Replace all spaces in postcode with +
    return fetch(`${BASE_URL}${searchTerm2}`)
        .then(res => res.json());
}// Fetch the array from the localhost:8000/custom url

function showResults(results) {

}//

// Reads from http://localhost:8000/results, then converts it to a HTML format

