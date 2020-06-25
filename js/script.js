// =========== CSS Codes ===========

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
});


// =========== Inflation Calculation ===========
let calInflation = document.querySelector('#inflation-calculator');

calInflation.addEventListener('submit', function (e) {

    amount = e.target.elements[0].value;
    time = e.target.elements[1].value;
    rate = e.target.elements[2].value;

    var settings = {
        "url": "http://127.0.0.1:5000/inflation/?amount=" + amount + "&time=" + time + "&rate=" + rate,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        const data = `After Inflation : ${response['After Influence']}`;
        let InflationResult = document.getElementById('inflation-result');
        InflationResult.innerHTML = data
    });
    e.preventDefault();

});


// =========== Retirement Investment Plan ===========
let calRIP = document.querySelector('#rip-calculator');

calRIP.addEventListener('submit', function (e) {

    amount = e.target.elements[0].value;
    time = e.target.elements[1].value;

    var settings = {
        "url": "http://127.0.0.1:5000/ripcalculator/?monthly_expenses=" + amount + "&surv_year=" + time,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        const data = `<br>
                      <span class="invested-text">
                        You need Minimum <span class="loss-text">${Math.floor(response['Invest in Bank'][0]+response['Yearly Expenses'][0])}</span> Rupees for Survival at the time of Retirement.
                      </span>
                      <div>
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Yearly Expenses</th>
                                    <th>Amount in Bank</th>
                                </tr>
                            </thead>
                            <tbody id="chart-2">
                            </tbody>
                        </table>
                      </div>`;

        let RIPResult = document.getElementById('rip-result');
        RIPResult.innerHTML = data

        let chart = document.getElementById('chart-2');

        let i;
        for (i = 0; i < response["Yearly Expenses"].length; i++) {

            let tr = document.createElement('tr');

            let year = document.createElement('td');
            let expense = document.createElement('td');
            let invest = document.createElement('td');

            year.textContent = i+1;
            expense.textContent = response["Yearly Expenses"][i];
            invest.textContent = response["Invest in Bank"][i];

            tr.appendChild(year);
            tr.appendChild(expense);
            tr.appendChild(invest);

            chart.appendChild(tr);

        }
    });
    e.preventDefault();

});


// =========== Calculate Goal SIP ===========
let calGoal = document.querySelector('#goal-calculator');

calGoal.addEventListener('submit', function (e) {

    target = e.target.elements[0].value;
    time = e.target.elements[1].value;
    rate = e.target.elements[2].value;

    var settings = {
        "url": "http://127.0.0.1:5000/goalsip/?target=" + target + "&time=" + time + "&rate=" + rate,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        const data = `<br>
                      <span class="invested-text">
                        Your Inestment : ${response['Invested']}
                      </span>
                      <br>
                      <span class="profit-text"> 
                        Monthly SIP Value : ${response['Monthly SIP']}
                      </span>`;

        let GoalResult = document.getElementById('goal-result');
        GoalResult.innerHTML = data
    });
    e.preventDefault();

});


// =========== SIP Calculator ===========
let calSIP = document.querySelector('#sip-calculator');

calSIP.addEventListener('submit', function (e) {

    amount = e.target.elements[0].value;
    time = e.target.elements[1].value;
    rate = e.target.elements[2].value;

    var settings = {
        "url": "http://127.0.0.1:5000/sipcalculator/?amount=" + amount + "&time=" + time + "&rate=" + rate,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        const data = `<br>
                      <span class="invested-text">
                        Your Inestment : ${response['Invested']}
                      </span>
                      <br>
                      <span class="profit-text"> 
                        Total Gain (or Future Value of SIP) : ${response['Future Value']}
                      </span>
                      <div id="result-4">
                        <canvas id="sip-result-chart"></canvas>
                      </div>`;

        let SIPResult = document.getElementById('sip-result');
        SIPResult.innerHTML = data

        let ChartCTX = document.getElementById("sip-result-chart").getContext("2d");

        let chart = new Chart(ChartCTX, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        response['Invested'],
                        Math.floor(response['Future Value']-response['Invested']),
                    ],
                    backgroundColor: [
                        '#0074D9',
                        '#15A154'
                    ],
                    label: 'SIP Profit/Loss'
                }],
                labels: [
                    'Invested',
                    'Returns'
                ]
            },
            options: {
                responsive: true
            }
        });
    });
    e.preventDefault();

});