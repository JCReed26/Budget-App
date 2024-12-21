import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext';

ChartJS.register( 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Chart() {

    const {incomes, expenses} = useGlobalContext();



    const data = {
        labels: incomes.map((inc) => {
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((inc) => {
                        const {amount} = inc
                        return amount
                    })
                ],
                backgroundColor: '#F56692',
                tension: 0.5
            },
            {
                label: 'Expense',
                data: [
                    ...expenses.map((exp) => {
                        const {amount} = exp
                        return amount
                    })
                ],
                backgroundColor: '#42AD00',
                tension: 0.5
            },
        ]
    }


    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    height: 100%;
`;

export default Chart;