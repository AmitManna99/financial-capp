import pandas as pd
import json

# =================inflation Calculator=================


def calculateInfulence(amount, inflation, time):
    after_inflation = amount*(1+inflation/100)**time
    return float("{:.2f}".format(after_inflation))


# =================Retirement Investment Plan=================

def revList(alist):
    i = len(alist)
    rev_list = []
    while(i > 0):
        rev_list.append(alist[i-1])
        i = i-1

    return rev_list


def calculateExpenses(params):
    yearly_expenses = []
    inflation_growth = (
        ((1+params['inflation'])**params['interval'] - 1) / (1+params['inflation'] - 1))

    for year in range(0, params['surv_year']+1, params['interval']):
        money = (params['monthly_expenses']*12 *
                 (1+params['inflation'])**year) * inflation_growth
        yearly_expenses.append(int(money))

    return yearly_expenses


def calculateInvest(params, invested_amount, yearly_expenses):
    expenses = revList(yearly_expenses)
    i = 0
    for expense in expenses:
        money = invested_amount[i]/1.13 + expense
        invested_amount.append(int(money))
        i = i+1

    invested_amount.pop()
    invested_amount = revList(invested_amount)

    return invested_amount


def retirementPlan(monthly_expenses, surv_year):
    params = {
        'inflation': 6/100,
        'interval': 1,
        'monthly_expenses': monthly_expenses,
        'surv_year': surv_year
    }

    yearly_expenses = []
    invested_amount = [0]

    yearly_expenses = calculateExpenses(params)
    invested_amount = calculateInvest(params, invested_amount, yearly_expenses)

    return yearly_expenses, invested_amount


# =================SIP Calculator=================

def systematicPlan(amount, time, rate):
    i = (rate/100)/12
    n = time*12
    future_value = amount * ((((1+i)**n) - 1) / i) * (1+i)

    return float("{:.2f}".format(future_value)), amount*n


# =================SIP Calculator=================

def goalSIP(target, time, rate):
    i = (rate/100)/12
    n = time*12
    monthly_sip = target / (((((1+i)**n) - 1) / i) * (1+i))

    return float("{:.2f}".format(monthly_sip)), float("{:.2f}".format(monthly_sip*n))
