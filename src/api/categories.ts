import api from "./axios";

export interface Category {
    _id: string;
    name: string;
    image?: string;
}

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await api.get("/categories");
    return data;
};