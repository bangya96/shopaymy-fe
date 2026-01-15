import { gql } from 'apollo-angular';

// ============================================
// USER QUERIES
// ============================================

/**
 * Get current authenticated user
 */
export const ME_QUERY = gql`
    query Me {
        me {
            id
            name
            email
            emailVerifiedAt
            createdAt
            updatedAt
            shops {
                id
                name
                slug
                logo
            }
        }
    }
`;

// ============================================
// SHOP QUERIES
// ============================================

/**
 * Get all shops for the current user
 */
export const SHOPS_QUERY = gql`
    query Shops {
        shops {
            id
            name
            slug
            description
            logo
            banner
            isActive
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get a single shop by ID
 */
export const SHOP_QUERY = gql`
    query Shop($id: Int!) {
        shop(id: $id) {
            id
            name
            slug
            description
            logo
            banner
            isActive
            createdAt
            updatedAt
            pages {
                id
                title
                slug
                isActive
            }
        }
    }
`;

// ============================================
// PAGE QUERIES
// ============================================

/**
 * Get all pages for a specific shop
 */
export const PAGES_QUERY = gql`
    query Pages($shopId: Int!) {
        pages(shopId: $shopId) {
            id
            title
            slug
            content
            metaTitle
            metaDescription
            isActive
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get a single page by ID
 */
export const PAGE_QUERY = gql`
    query Page($id: Int!) {
        page(id: $id) {
            id
            title
            slug
            content
            metaTitle
            metaDescription
            isActive
            createdAt
            updatedAt
            shop {
                id
                name
                slug
            }
        }
    }
`;
