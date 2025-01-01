"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    'strapi-neon-tech-db-branches': {
        enabled: true,
        config: {
            neonApiKey: "rlen131bdcbnn6p68ijlh0p31wtg1tzk040w58fsok6ez9sefvoylwrjv6m3jca2",
            neonProjectName: "solveagri",
            neonRole: "neondb_owner",
        }
    },
    upload: {
        config: {
            provider: '@strapi/provider-upload-cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                upload: {
                    folder: 'solveagri',
                    use_filename: true,
                    unique_filename: true,
                    overwrite: false,
                    resource_type: "auto",
                },
                delete: {},
            },
        },
    },
});
