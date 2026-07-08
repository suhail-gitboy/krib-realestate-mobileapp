export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area_sqft: number;
    address: number;
    city: string,
    latitude: number,
    longtitude: number,
    images: string[]
    is_featured: boolean;
    is_sold: boolean;
    created_at: String


}