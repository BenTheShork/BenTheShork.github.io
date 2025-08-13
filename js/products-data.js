
// Product and origin data configuration

// Product and origin data
const productData = {
    powder: {
        name: "Natural Cocoa Powder",
        translationKey: "products.cocoa_powder.title",
        origins: {
            malaysia: { 
                country: "Malaysia", 
                countryTranslationKey: "origins.malaysia.country",
                manufacturer: "Guan Chong Cocoa Manufacturer", 
                flag: "🇲🇾" 
            },
            indonesia: { 
                country: "Indonesia", 
                countryTranslationKey: "origins.indonesia.country",
                manufacturer: "PT Golden Harvest Cocoa Indonesia", 
                flag: "🇮🇩" 
            },
            peru: { 
                country: "Peru", 
                countryTranslationKey: "origins.peru.country",
                manufacturer: "Machu Picchu Foods SA", 
                flag: "🇵🇪" 
            }
        }
    },
    liquor: {
        name: "Cocoa Liquor",
        translationKey: "products.cocoa_liquor.title",
        origins: {
            ivory1: { 
                country: "Côte d'Ivoire", 
                countryTranslationKey: "origins.ivory_coast.country",
                manufacturer: "DIAKITE COCOA PRODUCTS SARL", 
                flag: "🇨🇮" 
            },
            ghana: { 
                country: "Ghana", 
                countryTranslationKey: "origins.ghana.country",
                manufacturer: "Chocomac Ghana Limited", 
                flag: "🇬🇭" 
            },
            ivory2: { 
                country: "Côte d'Ivoire", 
                countryTranslationKey: "origins.ivory_coast.country",
                manufacturer: "Citract SA", 
                flag: "🇨🇮" 
            },
            peru: { 
                country: "Peru", 
                countryTranslationKey: "origins.peru.country",
                manufacturer: "Machu Picchu Foods SA", 
                flag: "🇵🇪" 
            },
            ecuador1: {
                country: "Ecuador",
                countryTranslationKey: "origins.ecuador.country",
                manufacturer: "Chocolates Finos Nacionales Cofina S.A. ",
                flag: "🇪🇨"
            },
            ecuador2: {
                country: "Ecuador",
                countryTranslationKey: "origins.ecuador.country",
                manufacturer: "Ecuador Kakao Processing Proecuakao S.A. ",
                flag: "🇪🇨"
            }
        }
    },
    butter: {
        name: "Pure Cocoa Butter",
        translationKey: "products.cocoa_butter.title",
        origins: {
            venezuela1: { 
                country: "Venezuela", 
                countryTranslationKey: "origins.venezuela.country",
                manufacturer: "Cacaos Venezolanos de Calidad C.A.", 
                flag: "🇻🇪" 
            },
            venezuela2: { 
                country: "Venezuela", 
                countryTranslationKey: "origins.venezuela.country",
                manufacturer: "Procesadora Cacao Real", 
                flag: "🇻🇪" 
            },
            ivory: { 
                country: "Côte d'Ivoire", 
                countryTranslationKey: "origins.ivory_coast.country",
                manufacturer: "DIAKITE COCOA PRODUCTS SARL", 
                flag: "🇨🇮" 
            },
            peru: { 
                country: "Peru", 
                countryTranslationKey: "origins.peru.country",
                manufacturer: "Machu Picchu Foods SA", 
                flag: "🇵🇪" 
            },
            nigeria: { 
                country: "Nigeria", 
                countryTranslationKey: "origins.nigeria.country",
                manufacturer: "Johnwents Industries Limited", 
                flag: "🇳🇬" 
            },
            china: { 
                country: "China", 
                countryTranslationKey: "origins.china.country",
                manufacturer: "Huadong Industrial Limited", 
                flag: "🇨🇳" 
            },
            ecuador1: {
                country: "Ecuador",
                countryTranslationKey: "origins.ecuador.country",
                manufacturer: "Chocolates Finos Nacionales Cofina S.A. ",
                flag: "🇪🇨"
            },
            ecuador2: {
                country: "Ecuador",
                countryTranslationKey: "origins.ecuador.country",
                manufacturer: "Ecuador Kakao Processing Proecuakao S.A. ",
                flag: "🇪🇨"
            }
        }
    },
    cake: {
        name: "Cocoa Cake",
        translationKey: "products.cocoa_cake.title",
        origins: {
            usa: { 
                country: "USA", 
                countryTranslationKey: "origins.usa.country",
                manufacturer: "Savita Naturals LTD", 
                flag: "🇺🇸" 
            },
            venezuela: { 
                country: "Venezuela", 
                countryTranslationKey: "origins.venezuela.country",
                manufacturer: "Procesadora Cacao Real", 
                flag: "🇻🇪" 
            },
            ivory: { 
                country: "Côte d'Ivoire", 
                countryTranslationKey: "origins.ivory_coast.country",
                manufacturer: "DIAKITE COCOA PRODUCTS SARL", 
                flag: "🇨🇮" 
            },
            peru: { 
                country: "Peru", 
                countryTranslationKey: "origins.peru.country",
                manufacturer: "Machu Picchu Foods SA", 
                flag: "🇵🇪" 
            },
            nigeria: { 
                country: "Nigeria", 
                countryTranslationKey: "origins.nigeria.country",
                manufacturer: "Johnwents Industries Limited", 
                flag: "🇳🇬" 
            },
            china: { 
                country: "China", 
                countryTranslationKey: "origins.china.country",
                manufacturer: "Huadong Industrial Limited", 
                flag: "🇨🇳" 
            }
        }
    },
    bean: {
        name: "Cocoa Beans",
        translationKey: "products.cocoa_bean.title",
        origins: {
            ecuador: { 
                country: "Ecuador", 
                countryTranslationKey: "origins.ecuador.country",
                manufacturer: "ECO-KAKAO S.A.", 
                flag: "🇪🇨" 
            }
        }
    }
};

// Store selected products
let selectedProducts = {};

// Export data for global access
window.productData = productData;
window.selectedProducts = selectedProducts;