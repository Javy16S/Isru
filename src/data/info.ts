export interface InfoSection {
    title: { [key: string]: string };
    content: { [key: string]: string };
}

export const storeInfo = {
    shipping: {
        title: { es: 'Envíos y Entregas', en: 'Shipping & Delivery', fr: 'Livraison' },
        content: {
            es: "Realizamos envíos a toda España en 24-48h laborables. Los envíos internacionales suelen tardar entre 5 y 10 días dependiendo del destino. Todos nuestros paquetes incluyen número de seguimiento para que sepas dónde está tu pedido en todo momento.",
            en: "We ship throughout Spain in 24-48 working hours. International shipments usually take between 5 and 10 days depending on the destination. All our packages include a tracking number so you know where your order is at all times.",
            fr: "Nous expédions dans toute l'Espagne en 24-48 heures ouvrables. Les expéditions internationales prennent généralement entre 5 et 10 jours selon la destination. Tous nos colis incluent un numéro de suivi."
        }
    },
    returns: {
        title: { es: 'Política de Devoluciones', en: 'Returns Policy', fr: 'Retours' },
        content: {
            es: "Tienes 30 días desde la recepción de tu pedido para solicitar una devolución. El producto debe estar en su estado original, sin usar y con su embalaje intacto. El proceso es sencillo a través de nuestro portal de devoluciones.",
            en: "You have 30 days from receipt of your order to request a return. The product must be in its original condition, unused and with its packaging intact. The process is simple through our returns portal.",
            fr: "Vous avez 30 jours à compter de la réception de votre commande pour demander un retour. Le produit doit être dans son état d'origine, inutilisé et avec son emballage intact."
        }
    },
    warranty: {
        title: { es: 'Garantía Estándar', en: 'Standard Warranty', fr: 'Garantie Standard' },
        content: {
            es: "Todos los productos Isru Studio cuentan con 3 años de garantía en España (2 años internacional) contra defectos de fabricación. No cubre el desgaste natural por uso o accidentes externos.",
            en: "All Isru Studio products have a 3-year warranty in Spain (2 years international) against manufacturing defects. It does not cover natural wear and tear or external accidents.",
            fr: "Tous les produits Isru Studio bénéficient d'une garantie de 3 ans en Espagne (2 ans à l'international) contre les défauts de fabrication."
        }
    },
    care: {
        title: { es: 'Guía de Cuidado', en: 'Care Guide', fr: 'Guide d\'Entretien' },
        content: {
            es: "Nuestra piel vegana premium es duradera y fácil de cuidar. Simplemente limpia con un paño suave y seco para eliminar el polvo. Evita el contacto prolongado con agua, aceites o luz solar directa para mantener el color original.",
            en: "Our premium vegan leather is durable and easy to care for. Simply wipe with a soft, dry cloth to remove dust. Avoid prolonged contact with water, oils or direct sunlight to maintain original color.",
            fr: "Notre cuir végétalien haut de gamme est durable et facile à entretenir. Essuyez simplement avec un chiffon doux et sec pour enlever la poussière."
        }
    }
};
