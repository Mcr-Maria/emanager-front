/* eslint-disable react/prop-types */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraficoLinha = ({ data }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Faturamento',
            },
        },
    };
    const labels = data.datas || [];

    const dados = {
        labels,
        datasets: [
            {
                label: 'Valor',
                data: data.valores || [],
                borderColor: 'rgb(21, 93, 252)',
                backgroundColor: 'rgba(21, 93, 252, 0.5)',
                tension: 0.1
            }
        ],
    };

    return (
        <div className='p-4 border border-slate-300 rounded-xl'>
            <div className='flex justify-between items-center'>
                <div>
                    <h6 className='text-lg font-bold text-blue-600'>Faturamento</h6>
                    <h6 className='font-bold text-slate-400'><span className='text-black'>{data.quantidade || 0}</span> Pedidos realizados</h6>
                </div>
                <div className='text-right'>
                    <h6 className='text-xs font-bold uppercase text-slate-400'>total</h6>
                    <h6 className='text-3xl font-semibold text-green-400'>R$ {(data.total || 0).toFixed(2)}</h6>
                </div>
            </div>
            <Line
                options={options}
                data={dados}
            />
        </div>
    );
}

export default GraficoLinha;