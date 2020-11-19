import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalState';

import Chart from '../../../../node_modules/chart.js';

export const ChartComp = ({ transactions }) => {

    const income = transactions
        .filter(item => item.expenseType == 0)
        .reduce((acc, item) => (acc += item.amount), 0)
        .toFixed(2);

    const expense = (
        transactions.filter(item => item.expenseType > 0).reduce((acc, item) => (acc += item.amount), 0)
    ).toFixed(2);


    const incomeList = transactions.filter(item => item.expenseType == 0);

    const expenseList = transactions.filter(item => item.expenseType > 0);

    const [IncomeChartElement, setIncomeChartElement] = useState(document.getElementById('incomeChart'));
    const [ExpenseChartElement, setExpenseChartElement] = useState(document.getElementById('expenseChart'));

    useEffect(() => {

        const ch = display_chart(incomeList, 'incomeChart');
        const eh = display_chart(expenseList, 'expenseChart');
        setIncomeChartElement(ch);
        setExpenseChartElement(eh);
    }, [incomeList, expenseList]);



    return (
        <div className="inc-exp-container">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <h4>Income</h4>
                                <p className="money plus">+${income}</p>
                            </div>
                            <div>
                                <canvas id="incomeChart" width="400" height="400"></canvas>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h4>Expense</h4>
                                <p className="money minus">-${expense}</p>
                            </div>
                            <div>
                                <canvas id="expenseChart" width="400" height="400"></canvas>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>


        </div>
    )
}

function display_chart(data1, id) {
    let chartelem = document.getElementById(id)
    if (data1) {

        let labels_data = []
        let datasets = [{ 'label': '# of Votes' }]
        let data_data = []
        let backgroundColor_data = []
        let borderColor_data = []
        for (let i = 0; i < data1.length; i++) {
            var index = labels_data.indexOf(data1[i].categories.name);
            if (index == -1) {
                labels_data.push(data1[i].categories.name)
                data_data.push(parseInt(data1[i]['amount']))
                backgroundColor_data.push(data1[i].categories['backgroundColor'])
                borderColor_data.push(data1[i].categories['borderColor'])
            }
            else{
                data_data[index]+=parseInt(data1[i]['amount']);
            }
        }

        if (chartelem) {
            let myChart = new Chart(
                chartelem, {
                type: 'pie',
                data: {
                    labels: labels_data,
                    datasets: [{
                        label: '# of Votes',
                        data: data_data,
                        backgroundColor: backgroundColor_data,
                        borderColor: borderColor_data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
        return chartelem

    }
}

