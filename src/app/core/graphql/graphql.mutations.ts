import { gql } from 'apollo-angular';

// ============================================
// AUTH MUTATIONS
// ============================================

/**
 * Register a new user
 */
export const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            token
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
        }
    }
`;

/**
 * Login user
 */
export const LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
        }
    }
`;

/**
 * Logout user
 */
export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout {
            message
        }
    }
`;

// ============================================
// SHOP MUTATIONS
// ============================================

/**
 * Create a new shop
 */
export const CREATE_SHOP_MUTATION = gql`
    mutation CreateShop($input: CreateShopInput!) {
        createShop(input: $input) {
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
 * Update an existing shop
 */
export const UPDATE_SHOP_MUTATION = gql`
    mutation UpdateShop($input: UpdateShopInput!) {
        updateShop(input: $input) {
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
 * Delete a shop
 */
export const DELETE_SHOP_MUTATION = gql`
    mutation DeleteShop($id: Int!) {
        deleteShop(id: $id)
    }
`;

// ============================================
// PAGE MUTATIONS
// ============================================

/**
 * Create a new page
 */
export const CREATE_PAGE_MUTATION = gql`
    mutation CreatePage($input: CreatePageInput!) {
        createPage(input: $input) {
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
            }
        }
    }
`;

/**
 * Update an existing page
 */
export const UPDATE_PAGE_MUTATION = gql`
    mutation UpdatePage($input: UpdatePageInput!) {
        updatePage(input: $input) {
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
 * Delete a page
 */
export const DELETE_PAGE_MUTATION = gql`
    mutation DeletePage($id: Int!) {
        deletePage(id: $id)
    }
`;
