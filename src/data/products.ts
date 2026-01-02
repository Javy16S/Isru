export interface Product {
    id: number;
    name: {
        es: string;
        en: string;
        fr: string;
        [key: string]: string;
    };
    category: string;
    price: number;
    color: string;
    front: string;
    back: string;
    description: {
        es: string;
        en: string;
        fr: string;
        [key: string]: string;
    };
}

export const products: Product[] = [
    {
        id: 1,
        name: { es: 'Cartera Slim Azul', en: 'Slim Wallet Blue', fr: 'Portefeuille Slim Bleu' },
        category: 'cartera',
        price: 29.99,
        color: 'blue',
        front: 'Cartera_Azul.webp',
        back: 'Cartera_Azul_Inside.png',
        description: {
            es: "Diseño ultra delgado para la mujer moderna. Fabricada en piel vegana de alta calidad con acabados en azul profundo. Ideal para llevar lo esencial sin abultar.",
            en: "Ultra-slim design for the modern woman. Crafted from high-quality vegan leather with deep blue finishes. Ideal for carrying essentials without bulk.",
            fr: "Design ultra-mince pour la femme moderne. Fabriqué en cuir végétalien de haute qualité avec des finitions bleu profond. Idéal pour transporter l'essentiel sans encombrement."
        }
    },
    {
        id: 2,
        name: { es: 'Bolso Tote Piel', en: 'Leather Tote Bag', fr: 'Sac Tote Cuir' },
        category: 'bolso',
        price: 89.99,
        color: 'gold', // Using gold as placeholder for 'natural/skin' color
        front: 'Bolso_Piel.webp',
        back: 'Bolso_Piel_Inside.png',
        description: {
            es: "Elegancia atemporal. Este bolso tote en tono piel combina versatilidad y sofisticación. Espacioso y estructurado para el día a día.",
            en: "Timeless elegance. This skin-tone tote bag combines versatility and sophistication. Spacious and structured for everyday use.",
            fr: "Élégance intemporelle. Ce sac fourre-tout ton chair allie polyvalence et sophistication. Spacieux et structuré pour un usage quotidien."
        }
    },
    {
        id: 3,
        name: { es: 'Bolso Tote Azul', en: 'Blue Tote Bag', fr: 'Sac Tote Bleu' },
        category: 'bolso',
        price: 89.99,
        color: 'blue',
        front: 'Bolso_Azul.webp',
        back: 'Bolso_Azul_Inside.png',
        description: {
            es: "El compañero perfecto para la oficina o el fin de semana. Acabado en azul marino premium con detalles minimalistas.",
            en: "The perfect companion for the office or the weekend. Premium navy blue finish with minimalist details.",
            fr: "Le compagnon idéal pour le bureau ou le week-end. Finition bleu marine premium avec des détails minimalistes."
        }
    }
];
