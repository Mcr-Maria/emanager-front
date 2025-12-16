import GraficoLinha from "../components/GraficoLinha";
import { usePegarDados } from "../hooks/dashboardHooks";


const Dashboard = () => {

    const { data: dados, isFetched: dadosOk } = usePegarDados();


    
    return (
        <div className="p-15">
            <h1 className="text-2xl font-semibold text-blue-600 mb-6">Dashboard</h1>
            <div>
                <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className="border border-slate-300 rounded p-4">
                        <h6>Total de contas:</h6>
                        <h6 className="text-2xl text-right">{dados ? dados.contas : 0}</h6>
                    </div>
                    <div className="border border-slate-300 rounded p-4">
                        <h6>Total de licenças:</h6>
                        <h6 className="text-2xl text-right">{dados ? dados.licencas : 0}</h6>
                    </div>
                    <div className="border border-slate-300 rounded p-4">
                        <h6>Licenças alugadas:</h6>
                        <h6 className="text-2xl text-right">{dados ? dados.licencasAlugadas : 0}</h6>
                    </div>
                    <div className="border border-slate-300 rounded p-4">
                        <h6>Licenças livres:</h6>
                        <h6 className="text-2xl text-right">{dados ? dados.licencasLivres : 0}</h6>
                    </div>
                    <div className="border border-slate-300 rounded p-4">
                        <h6>Taxa de ocupação:</h6>
                        <h6 className="text-2xl text-right">{dados ? dados.taxaOcupacao : 0}%</h6>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <div className="flex *:flex-1 gap-4">
                        <div>
                            <GraficoLinha data={dados || {}} />
                        </div>
                    </div>
                </div>
                <div className="w-[250px]">
                    <div className="border border-slate-300 rounded p-4">
                        <h6>Top 10 jogos mais locados</h6>
                        <div className="grid gap-3 mt-4">
                            {
                                dados && dados.top10.map((top, index) => (
                                    <div key={`top-${index}`} className="flex justify-between items-center border border-slate-200 p-3 rounded">
                                        <h6>{index+1} . {top.jogo}-{top.plataforma}</h6>
                                        <h6>{top.total}</h6>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;