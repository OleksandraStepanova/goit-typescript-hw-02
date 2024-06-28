export type ApiResponse = { 
    total: number;
    total_pages: number;
    results: Image[];
}

export type Image = {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string;
    user: {
        username: string;
    };
    likes?: number;
}|null