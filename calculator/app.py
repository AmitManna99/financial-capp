from flask import Flask, jsonify, request
import json
import finance_calculator as fc

app = Flask(__name__)


@app.route('/inflation/')
def calInfluence():
    amount, rate, time = int(request.args['amount']), float(
        request.args['rate']), int(request.args['time'])
    data = fc.calculateInfulence(amount, rate, time)
    return jsonify({'After Influence': data})


@app.route('/ripcalculator/')
def calRIP():
    yearly_expenses = []
    invested_amount = []
    monthly_expenses, surv_year = int(
        request.args['monthly_expenses']), int(request.args['surv_year'])
    yearly_expenses, invested_amount = fc.retirementPlan(
        monthly_expenses, surv_year)
    return jsonify({"Yearly Expenses": yearly_expenses, "Invest in Bank": invested_amount})


@app.route('/sipcalculator/')
def calSIP():
    amount, time, rate = int(request.args['amount']), int(
        request.args['time']), float(request.args['rate'])
    data, invest = fc.systematicPlan(amount, time, rate)
    return jsonify({'Future Value': data, 'Invested': invest})


@app.route('/goalsip/')
def goalSIP():
    target, time, rate = int(request.args['target']), int(
        request.args['time']), float(request.args['rate'])
    sip, invest = fc.goalSIP(target, time, rate)
    return jsonify({'Monthly SIP': sip, 'Invested': invest})


if __name__ == "__main__":
    app.run()
