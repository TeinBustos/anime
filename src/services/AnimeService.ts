// src/services/AnimeService.ts
import axios, { AxiosInstance } from 'axios';

class AnimeService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.jikan.moe/v4',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    
    async getAnimes(page: number = 1, limit: number = 10) {
        try {
            const response = await this.api.get(`/anime?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching animes:', error);
            throw error;
        }
    }
}

export default new AnimeService();

