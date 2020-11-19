import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalState';

import Chart from '../../../../node_modules/chart.js';

export const ChartComp = ({repos}) => {

    const { incomeTransactionsChart } = useContext(GlobalContext);
    const { transactions } = useContext(GlobalContext);

    const { expenseTransactionsChart } = useContext(GlobalContext);
    //const amounts = transactions.map(transaction => transaction.amount);

    //console.log(amounts);


    //const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
 

    const [IncomeChartElement, setIncomeChartElement] = useState(document.getElementById('incomeChart'));
    const [ExpenseChartElement, setExpenseChartElement] = useState(document.getElementById('expenseChart'));
    
    useEffect(() => {
        console.log(repos);
        console.log('use effect chart');
        const ch = display_chart(transactions, 'incomeChart');
        const eh = display_chart(expenseTransactionsChart, 'expenseChart');
        setIncomeChartElement(ch);
        setExpenseChartElement(eh);
    }, [transactions, expenseTransactionsChart]);



    return (
        <div>
            <div>
                <canvas id="incomeChart" width="400" height="400"></canvas>
            </div>
            <div>
                <canvas id="expenseChart" width="400" height="400"></canvas>
            </div>
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
            labels_data.push(data1[i].cat_name)
            data_data.push(parseInt(data1[i]['amount']))
            backgroundColor_data.push(data1[i]['backgroundColor'])
            borderColor_data.push(data1[i]['borderColor'])
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

