import { useMutation, useQuery } from "@tanstack/react-query";
import { API, queryClient } from './../services/index';

export const useBuscarPedido = () => {
    return useQuery({
        queryKey: ["pedidos"],
        queryFn: async () => {
            const response = await API.get("/pedidos");
            return response.data;
        }
    });
}

export const useCriarPedido = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const response = await API.post("/pedidos", dados);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pedidos"]
            })
        }
    });
}

export const useEditarPedido = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const response = await API.put(`/pedidos/${dados.id}`, dados);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pedidos"]
            })
        }
    });
}

export const useDeletarPedido = () => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await API.delete(`/pedidos/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pedidos"]
            })
        }
    });
}