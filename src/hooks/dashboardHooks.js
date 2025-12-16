import { useQuery } from "@tanstack/react-query";
import { API } from "../services";

export const usePegarDados = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await API.get(`/dashboard`);
            return response.data;
        }
    });
}